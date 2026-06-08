import type { SurveyStep } from "@/src/types/survey";
import Image from "next/image";
import Button from "@/src/component/Button";
import { useI18n } from "@/src/i18n/context";
import Logo from "@/src/app/assets/svg/Logo";

const CustomPage36 = ({ onNext, onSkipTo }: { onNext: () => void; onSkipTo?: (stepIndex: number) => void }) => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center justify-between pt-7.5! min-h-full! flex-1 gap-10">
      <div className="flex flex-col gap-12 justify-center">
        <div className="flex items-end justify-center gap-1">
          <div className="flex mb-0.5!">
            <Logo />
          </div>

          <p className="text-[24px] font-bold text-[#292929] leading-none">
            {t("brand")}
          </p>
        </div>
        <div className="text-center font-bold text-[32px] text-[#18181B] leading-[1.3]">
          <p>Want tips that actually apply to your family?</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-8 w-full">
        <div className="flex flex-col gap-y-3 w-full">
          <Button
            variant="primary"
            onClick={onNext}
            id="btn-continue"
            className="text-[#18181B] w-full hover:!transform-none hover:!shadow-none"
          >
            Yes, count me in
          </Button>
          <Button
            variant="outline"
            onClick={() => onSkipTo ? onSkipTo(38) : onNext()}
            id="btn-continue"
            className="text-[#18181B] w-full hover:!transform-none hover:!shadow-none"
          >
            {"No, I don't need tips"}
          </Button>
        </div>
        <div className="w-full flex justify-between items-center flex-wrap text-center">
          <a href="https://www.teencare.us/termprivacy" target="_blank" className="underline text-[12px] text-[#A1A1AA]">
            Terms & Conditions
          </a>
          <a href="https://www.teencare.us/termprivacy" target="_blank" className="underline text-[12px] text-[#A1A1AA]">
            Privacy Policy
          </a>
          <a href="https://www.teencare.us/termprivacy" target="_blank" className="underline text-[12px] text-[#A1A1AA]">
            Subscription Policy
          </a>
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
