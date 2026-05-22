import type { SurveyStep } from "@/src/types/survey";
import Image from "next/image";
import TimeIcon from "@/src/app/assets/svg/Time";
import Button from "@/src/component/Button";
import Arrow from "@/src/app/assets/svg/Arrow";
import { useI18n } from "@/src/i18n/context";

const CustomPage = ({ onNext }: { onNext: () => void }) => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center gap-y-10 pt-10">
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
          className="flex-1 flex flex-col items-center cursor-pointer group p-3! h-47 custom-page"
        >
          <div className="h-32">
            <Image
              src="/images/dad.png"
              alt="Dad"
              width={150}
              height={136}
              className="h-full w-full"
            />
          </div>
          <Button variant="primary" onClick={onNext} id="btn-dad" className="text-[#18181B] w-full" size="sm" iconRight={<Arrow />}>
            {t("dad")}
          </Button>
        </div>

        <div
          className="flex-1 flex flex-col items-center cursor-pointer group p-3! h-47 custom-page"
        >
          <div className="h-32">
            <Image
              src="/images/mom.png"
              alt="Mom"
              width={150}
              height={136}
              className="h-full w-full"
            />
          </div>
          <Button variant="primary" onClick={onNext} id="btn-mom" className="text-[#18181B] w-full" size="sm" iconRight={<Arrow />}>
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
