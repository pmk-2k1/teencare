import type { SurveyStep } from "@/src/types/survey";
import Image from "next/image";
import Button from "@/src/component/Button";
import { useI18n } from "@/src/i18n/context";

const CustomPage2 = ({ onNext }: { onNext: () => void }) => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center justify-between pt-7.5! min-h-full! flex-1 mt-7.5! gap-10" >
      <div className="w-full flex flex-col gap-6 justify-center">
        <div className="flex flex-col gap-1 justtify-center px-15! items-center">
          <p className="text-[32px] font-bold text-[#FFAC08] text-center leading-[1.3]">28,400+</p>
          <p className="text-[16px] text-[#18181B] text-center">parents have already changed how they show up at home</p>
        </div>
        <div className="w-full flex flex-col rounded-lg p-6! bg-[#FFFFFF]" style={{ boxShadow: "0px 2px 10px 0px rgba(255, 172, 8, 0.25)" }}>
          <p className="font-semibold text-[56px] text-[#18181B] text-center leading-[1.4]">“</p>
          <p className="font-semibold text-[24px] text-[#18181B] text-center leading-[1.3]">TeenCare helps you practice for hard parenting moments before they happen</p>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-4">
          <p className="text-[16px] text-[#18181B] text-center">Featured in:</p>
          <div className="relative w-[330px] h-[120px]">
            <Image
              src="/images/step2.png"
              alt="Survey Image"
              fill
              sizes="330px"
              className="object-contain"
              unoptimized
              priority />
          </div>
        </div>
      </div>

      <Button variant="primary" onClick={onNext} id="btn-continue" className="text-[#18181B] w-full hover:!transform-none hover:!shadow-none" >
        {t("continue")}
      </Button>
    </div>
  );
};

const step2: SurveyStep = {
  id: 2,
  customPage: CustomPage2,
  showHeader: false,
};

export default step2;
