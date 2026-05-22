import type { SurveyStep } from "@/src/types/survey";
import Image from "next/image";
import Button from "@/src/component/Button";
import { useI18n } from "@/src/i18n/context";

const CustomPage14 = ({ onNext }: { onNext: () => void }) => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center justify-between pt-10! min-h-full! flex-1">
      <Image
        src="/images/step14-image.png"
        alt="Survey Image"
        width={500}
        height={500}
        className="w-full h-auto object-contain animate-bounce-in"
      />

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

const step14: SurveyStep = {
  id: 14,
  customPage: CustomPage14,
  showHeader: false,
};

export default step14;
