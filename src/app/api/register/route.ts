import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@/lib/db";
import { createCashfreeOrder } from "@/lib/cashfree";

const registrationSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^\+?[0-9]{10,13}$/, "Invalid phone number (10-13 digits)"),
  workshop_id: z.number().int().positive(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = registrationSchema.parse(body);

    // Fetch the active workshop
    const workshops = await sql`
      SELECT id, name, regular_price, discounted_price, is_active
      FROM workshops
      WHERE id = ${validated.workshop_id} AND is_active = true
    `;

    if (workshops.length === 0) {
      return NextResponse.json(
        { error: "Workshop not found or inactive" },
        { status: 404 }
      );
    }

    const workshop = workshops[0];
    // Amount in paise — use discounted price if set, else regular
    // Amount in rupees — use discounted price if set, else regular
    const amountInRupees: number =
      workshop.discounted_price ?? workshop.regular_price;

    // Generate unique order ID (max 50 chars for Cashfree)
    const orderId = `hs_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 8)}`;

    // Insert registration with pending status
    const registrations = await sql`
      INSERT INTO registrations
        (workshop_id, full_name, email, phone, payment_status, cashfree_order_id, amount_paid)
      VALUES
        (${validated.workshop_id}, ${validated.full_name}, ${validated.email},
         ${validated.phone}, 'pending', ${orderId}, ${amountInRupees})
      RETURNING id
    `;

    const registrationId = registrations[0].id;

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ?? "https://heart-spaces.com";

    // Create Cashfree order
    const cashfreeOrder = await createCashfreeOrder({
      order_id: orderId,
      order_amount: amountInRupees,
      order_currency: "INR",
      customer_details: {
        customer_id: `reg_${registrationId}`,
        customer_name: validated.full_name,
        customer_email: validated.email,
        customer_phone: validated.phone.replace(/^\+91/, "").replace(/\D/g, "").slice(-10),
      },
      order_meta: {
        return_url: `${appUrl}/thank-you?order_id=${orderId}`,
        notify_url: `${appUrl}/api/payment/webhook`,
      },
    });

    return NextResponse.json({
      payment_session_id: cashfreeOrder.payment_session_id,
      order_id: orderId,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
