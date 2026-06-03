import type { SurveyStep } from "@/src/types/survey";
import type { SurveyCustomPageProps } from "@/src/lib/survey/customPageTypes";
import en from "@/src/i18n/locales/en";
import Image from "next/image";
import TimeIcon from "@/src/app/assets/svg/Time";
import Button from "@/src/component/Button";
import Arrow from "@/src/app/assets/svg/Arrow";
import { useI18n } from "@/src/i18n/context";
import Logo from "@/src/app/assets/svg/Logo";

const CustomPage = ({ onNext, onSaveAnswer }: SurveyCustomPageProps) => {
  const { t } = useI18n();

  const handleDad = () => {
    onSaveAnswer?.([en.dad]);
    onNext();
  };

  const handleMom = () => {
    onSaveAnswer?.([en.mom]);
    onNext();
  };

  return (
    <div className="flex flex-col items-center gap-y-10 pt-10 mt-10!">
      <div className="flex items-end justify-center gap-1">
        <div className="flex mb-0.5!">
          <Logo />
        </div>

        <p className="text-[24px] font-bold text-[#292929] leading-none">
          {t("brand")}
        </p>
      </div>

      <div className="mx-3! flex flex-col items-center justify-center gap-y-4">
        <p className="text-[32px] font-bold text-[#292929] text-center leading-[1.3]">
          {t("title")}
        </p>
        <div className="flex items-center justify-center gap-1.5">
          <TimeIcon className="w-5 h-5 shrink-0" />

          <p className="text-[16px] text-[#18181B] mt-0.5!">
            {t("time")}
          </p>
        </div>
      </div>

      <div className="flex w-full px-6 gap-6 mt-2">
        <div
          className="flex-1 flex flex-col items-center cursor-pointer group p-3! h-47 custom-page bg-[#FFFFFF]"
        >
          <div className="relative h-32 w-full pointer-events-none">
            <Image
              src="/images/step1Dad.png"
              alt="Dad"
              fill
              className="object-contain"
              unoptimized
              priority
            />
          </div>
          <Button variant="primary" onClick={handleDad} id="btn-dad" className="text-[#18181B] w-full" size="sm" iconRight={<Arrow />}>
            {t("dad")}
          </Button>
        </div>

        <div
          className="flex-1 flex flex-col items-center cursor-pointer group p-3! h-47 custom-page bg-[#FFFFFF]"
        >
          <div className="relative h-32 w-full pointer-events-none">
            <Image
              src="/images/step1Mom.png"
              alt="Mom"
              fill
              className="object-contain"
              unoptimized
              priority
            />
          </div>
          <Button variant="primary" onClick={handleMom} id="btn-mom" className="text-[#18181B] w-full" size="sm" iconRight={<Arrow />}>
            {t("mom")}
          </Button>
        </div>
      </div>
    </div>
  );
};

const step1: SurveyStep = {
  id: 1,
  customPage: CustomPage,
  showHeader: false,
};

export default step1;
