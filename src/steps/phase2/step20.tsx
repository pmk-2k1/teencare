import type { SurveyStep } from "@/src/types/survey";
import Image from "next/image";
import Button from "@/src/component/Button";
import { useI18n } from "@/src/i18n/context";

const CustomPage20 = ({ onNext }: { onNext: () => void }) => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center justify-between pt-10! min-h-full! flex-1">
      <div className="flex flex-col gap-7 justify-center justify-center">
        <div className="px-3! flex justify-center items-center">
          <Image
            src="/images/step20Image.png"
            alt="Survey Image"
            width={500}
            height={500}
            className="w-full h-auto object-contain animate-bounce-in" />
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <p className="text-[#18181B] text-[32px] font-semibold text-center">Words become walls</p>
          <p className="text-[#18181B] text-[16px] text-center">How you talk to your kids becomes the voice inside their head.</p>
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

const step20: SurveyStep = {
  id: 20,
  customPage: CustomPage20,
  showHeader: false,
  wrapperClass: "step7-screen",
};

export default step20;
