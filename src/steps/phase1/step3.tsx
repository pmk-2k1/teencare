import type { SurveyStep } from "@/src/types/survey";
import Image from "next/image";
import Button from "@/src/component/Button";
import { useI18n } from "@/src/i18n/context";

const CustomPage3 = ({ onNext }: { onNext: () => void }) => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center justify-between pt-7.5! min-h-full! flex-1 mt-7.5! gap-10" >
      <div className="flex flex-col gap-6 justify-center justify-center">
        <div className="px-3! flex justify-center items-center w-full max-w-[500px]">
          <Image
            src="/images/step3_1.webp"
            alt="Survey Image"
            width={500}
            height={500}
            className="object-contain"
            style={{ width: "100%", height: "auto" }}
            unoptimized
            priority
          />
        </div>
        <div className="flex flex-col gap-3 justify-center items-center">
          <p className="text-[#18181B] text-[32px] font-semibold text-center">Become the parent you want to be</p>
          <p className="text-[#18181B] text-[16px] text-center">You already know what kind of parent you want to be. Let’s figure out what’s getting in the way.</p>
        </div>
      </div>

      <Button variant="primary" onClick={onNext} id="btn-continue" className="text-[#18181B] w-full" >
        {t("continue")}
      </Button>
    </div>
  );
};

const step3: SurveyStep = {
  id: 3,
  customPage: CustomPage3,
  showHeader: false,
};

export default step3;
