import type { SurveyStep } from "@/src/types/survey";
import Image from "next/image";
import Button from "@/src/component/Button";
import { useI18n } from "@/src/i18n/context";

const CustomPage7 = ({ onNext }: { onNext: () => void }) => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center justify-between pt-7.5! min-h-full! flex-1 mt-7.5! gap-10" >
      <div className="flex flex-col gap-6 justify-center justify-center">
        <div className="flex justify-center items-center w-full max-w-[500px]">
          <Image
            src="/images/step7_1.webp"
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
          <p className="text-[#18181B] text-[32px] font-semibold text-center">The setup is done.</p>
          <p className="text-[#18181B] text-[16px] text-center">Now let’s get to the part that really matters - how you parent.</p>
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

const step7: SurveyStep = {
  id: 7,
  customPage: CustomPage7,
  showHeader: false,
  wrapperClass: "step7-screen",
};

export default step7;
