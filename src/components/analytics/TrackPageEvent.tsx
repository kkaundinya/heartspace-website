"use client";

import { useEffect } from "react";
import {
  trackPurchase,
  trackPaymentFailed,
  trackMetaPurchase,
  trackMetaPaymentFailed,
} from "@/lib/analytics";

export function TrackPurchase({ orderId, amount }: { orderId: string; amount: number }) {
  useEffect(() => {
    trackPurchase(orderId, amount);
    trackMetaPurchase(amount);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

export function TrackPaymentFailed({ orderId }: { orderId: string }) {
  useEffect(() => {
    trackPaymentFailed(orderId);
    trackMetaPaymentFailed();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}
