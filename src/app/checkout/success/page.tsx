"use client";

import { Suspense } from "react";
import CheckoutSuccessContent from "./CheckoutSuccessContent";

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="survey-container flex flex-col items-center justify-center min-h-screen p-6">
          <p className="text-[16px] text-[#52525B]">Confirming your payment...</p>
        </div>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  );
}
