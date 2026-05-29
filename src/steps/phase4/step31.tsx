import type { SurveyStep } from "@/src/types/survey";
import Image from "next/image";
import Button from "@/src/component/Button";
import { useI18n } from "@/src/i18n/context";

const CustomPage31 = ({ onNext }: { onNext: () => void }) => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center justify-between pt-10! min-h-full! flex-1 gap-10">
      <div className="flex flex-col gap-7 justify-center justify-center">
        <div className="px-3! flex justify-center items-center w-full max-w-[500px]">
          <Image
            src="/images/step31.png"
            alt="Survey Image"
            width={500}
            height={500}
            className="object-contain animate-bounce-in"
            style={{ width: "100%", height: "auto" }}
            unoptimized
            priority
          />
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <p className="text-[#18181B] text-[32px] font-semibold text-center">Your balance, their blueprint</p>
          <p className="text-[#18181B] text-[16px] text-center">Prioritizing your well-being isn't selfish. Kids learn how to handle life by watching you handle yours.</p>
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

const step31: SurveyStep = {
  id: 31,
  customPage: CustomPage31,
  showHeader: false,
  wrapperClass: "step7-screen",
};

export default step31;
