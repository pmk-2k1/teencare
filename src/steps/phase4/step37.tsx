import type { SurveyStep } from "@/src/types/survey";
import Image from "next/image";
import Button from "@/src/component/Button";
import { useI18n } from "@/src/i18n/context";
import CheckCircle from "@/src/app/assets/svg/CheckCircle";

const CustomPage37 = ({ onNext }: { onNext: () => void }) => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center justify-between pt-10! min-h-full! flex-1">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <p className="text-[24px] font-semibold text-[#18181B]">
            Your personalized 3-month plan{" "}
          </p>
          <p className="text-[16px] text-[#18181B]">
            Built around your kids, your schedule, your starting point.
          </p>
        </div>
        <Image
          src="/images/step37-image.png"
          alt="Survey Image"
          width={500}
          height={500}
          className="w-full h-auto object-contain animate-bounce-in"
        />
        <div className="flex flex-col px-5!">
          <div className="flex gap-x-10 py-5! border-b border-b-[#E4E4E7]">
            <div className="flex gap-x-2">
              <CheckCircle />
              <p className="text-[16px] font-semibold text-[#18181B]">Week 1</p>
            </div>
            <p className="text-[16px] font-semibold text-[#18181B]">You Stay Calm</p>
          </div>

          <div className="flex gap-x-10 py-5! border-b border-b-[#E4E4E7]">
            <div className="flex gap-x-2">
              <CheckCircle />
              <p className="text-[16px] font-semibold text-[#18181B]">Month 1</p>
            </div>
            <p className="text-[16px] font-semibold text-[#18181B]">You Handle the Hard Stuff</p>
          </div>
          <div className="flex gap-x-10 py-5!">
            <div className="flex gap-x-2">
              <CheckCircle />
              <p className="text-[16px] font-semibold text-[#18181B]">Month 1</p>
            </div>
            <p className="text-[16px] font-semibold text-[#18181B]">You Actually Connect</p>
          </div>
        </div>
      </div>

      <Button
        variant="primary"
        onClick={onNext}
        id="btn-continue"
        className="text-[#18181B] w-full"
      >
        {t("continue")}
      </Button>
    </div>
  );
};

const step37: SurveyStep = {
  id: 37,
  customPage: CustomPage37,
  showHeader: false,
};

export default step37;
