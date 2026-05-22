import type { SurveyStep } from "@/src/types/survey";
import Image from "next/image";
import Button from "@/src/component/Button";
import { useI18n } from "@/src/i18n/context";

const CustomPage36 = ({ onNext }: { onNext: () => void }) => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center justify-between pt-10! min-h-full! flex-1">
      <div className="flex flex-col gap-10 justify-center">
        <div className="flex items-end justify-center gap-1">
          <div className="h-7.5 w-12">
            <Image
              src="/images/logo.png"
              alt="TeenCare"
              width={48}
              height={30}
              className="h-full w-full"
            />
          </div>

          <p className="text-[24px] font-bold text-[#292929] leading-none">
            {t("brand")}
          </p>
        </div>
        <div className="text-center font-bold text-[32px] text-[#18181B] leading-[1.3]">
          <p>Want tips that actually apply to your family?</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-5 w-full">
        <div className="flex flex-col gap-y-3 w-full">
          <Button
            variant="primary"
            onClick={onNext}
            id="btn-continue"
            className="text-[#18181B] w-full"
          >
            Yes, count me in
          </Button>
          <Button
            variant="outline"
            onClick={onNext}
            id="btn-continue"
            className="text-[#18181B] w-full"
          >
            {"No, I don't need tips"}
          </Button>
        </div>
        <div className="w-full flex justify-between items-center flex-wrap text-center">
          <p className="underline text-[12px] text-[#6B6B6B]">
            Terms & Conditions
          </p>
          <p className="underline text-[12px] text-[#6B6B6B]">Privacy Policy</p>
          <p className="underline text-[12px] text-[#6B6B6B]">
            Subscription Policy
          </p>
        </div>
      </div>
    </div>
  );
};

const step36: SurveyStep = {
  id: 36,
  customPage: CustomPage36,
  showHeader: false,
};

export default step36;
