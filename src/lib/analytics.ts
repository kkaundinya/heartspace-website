export function trackEvent(action: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", action, params ?? {});
}

export function trackWorkshopView(workshopName: string) {
  trackEvent("workshop_view", { event_category: "engagement", event_label: workshopName });
}

export function trackBeginCheckout(priceInRupees: number) {
  trackEvent("begin_checkout", { currency: "INR", value: priceInRupees });
}

export function trackAddPaymentInfo() {
  trackEvent("add_payment_info", { event_category: "ecommerce" });
}

export function trackPurchase(transactionId: string, priceInRupees: number) {
  trackEvent("purchase", {
    transaction_id: transactionId,
    value: priceInRupees,
    currency: "INR",
  });
}

export function trackPaymentFailed(orderId: string) {
  trackEvent("payment_failed", { event_category: "ecommerce", event_label: orderId });
}

// --- Meta Pixel helpers ---

function trackMetaEvent(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", event, params ?? {});
}

export function trackMetaViewContent() {
  trackMetaEvent("ViewContent", { content_name: "Heartspace Workshop", content_type: "product" });
  // Custom event for retargeting: workshop visitors who haven't checked out.
  // In Meta Ads Manager, create a Custom Audience using "WorkshopPageView"
  // and exclude anyone who triggered "InitiateCheckout" or "Purchase".
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("trackCustom", "WorkshopPageView");
  }
}

export function trackMetaInitiateCheckout(value: number) {
  trackMetaEvent("InitiateCheckout", { value, currency: "INR", num_items: 1 });
}

export function trackMetaPurchase(value: number) {
  trackMetaEvent("Purchase", { value, currency: "INR" });
}

export function trackMetaPaymentFailed() {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("trackCustom", "PaymentFailed");
}
