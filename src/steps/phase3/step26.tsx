import type { SurveyStep } from "@/src/types/survey";
import Image from "next/image";
import Button from "@/src/component/Button";
import { useI18n } from "@/src/i18n/context";

const CustomPage26 = ({ onNext }: { onNext: () => void }) => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center justify-between pt-7.5! min-h-full! flex-1 mt-7.5! gap-10" >
      <div className="flex flex-col gap-6 justify-center justify-center">
        <div className="px-3! flex justify-center items-center w-full max-w-[500px]">
          <Image
            src="/images/step26_1.png"
            alt="Survey Image"
            width={500}
            height={500}
            className="object-contain"
            style={{ width: "100%", height: "auto" }}
            unoptimized
            priority
          />
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <p className="text-[#18181B] text-[32px] font-semibold text-center">You parent from memory</p>
          <p className="text-[#18181B] text-[16px] text-center">This quiz helps you decide what to carry forward and what to leave behind.</p>
        </div>
      </div>

      <Button
        variant="outline"
        onClick={onNext}
        id="btn-continue"
        className="text-[#18181B] w-full"
      >
        {t("continue")}
      </Button>
    </div>
  );
};

const step26: SurveyStep = {
  id: 26,
  customPage: CustomPage26,
  showHeader: false,
  wrapperClass: "step7-screen",
};

export default step26;
