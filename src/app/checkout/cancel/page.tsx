"use client";

import Button from "@/src/component/Button";

export default function CheckoutCancelPage() {
  return (
    <div className="survey-container flex flex-col items-center justify-center min-h-screen p-6 gap-6 text-center">
      <h1 className="text-[28px] font-bold text-[#18181B]">Payment cancelled</h1>
      <p className="text-[16px] text-[#52525B] max-w-md">
        No charge was made. You can return to the survey and try again when you are ready.
      </p>
      <Button variant="primary" onClick={() => { window.location.href = "/"; }}>
        Back to survey
      </Button>
    </div>
  );
}
