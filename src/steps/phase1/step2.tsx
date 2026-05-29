import type { SurveyStep } from "@/src/types/survey";
import Image from "next/image";
import Button from "@/src/component/Button";
import { useI18n } from "@/src/i18n/context";

const CustomPage2 = ({ onNext }: { onNext: () => void }) => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center justify-between pt-10! min-h-full! flex-1 mt-10! gap-10" >
      <div className="w-full flex flex-col gap-7 justify-center">
        <div className="flex flex-col gap-1 justtify-center px-15! items-center">
          <p className="text-[32px] font-bold text-[#FFAC08] text-center leading-[1.3]">28,400+</p>
          <p className="text-[16px] text-[#18181B] text-center">parents have already changed how they show up at home</p>
        </div>
        <div className="w-full flex flex-col rounded-2xl px-10! py-7! bg-[#FFFFFF]" style={{ boxShadow: "0px 2px 10px 0px #FFAC0840" }}>
          <p className="font-semibold text-[56px] text-[#18181B] text-center leading-[1.4]">“</p>
          <p className="font-semibold text-[24px] text-[#18181B] text-center leading-[1.2]">TeenCare helps you practice for hard parenting moments before they happen</p>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-5">
          <p className="text-[16px] text-[#18181B] text-center">Featured in:</p>
          <div className="relative w-[330px] h-[120px]">
            <Image
              src="/images/step2.png"
              alt="Survey Image"
              fill
              sizes="330px"
              className="object-contain animate-bounce-in"
              unoptimized
              priority />
          </div>
        </div>
      </div>

      <Button variant="primary" onClick={onNext} id="btn-continue" className="text-[#18181B] w-full" >
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
