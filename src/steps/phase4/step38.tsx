import type { SurveyStep } from "@/src/types/survey";
import Button from "@/src/component/Button";
import { useI18n } from "@/src/i18n/context";
import CheckCircle from "@/src/app/assets/svg/CheckCircle";
import CloseCircle from "@/src/app/assets/svg/CloseCircle";
import Shield from "@/src/app/assets/svg/Shield";

const CustomPage38 = ({ onNext }: { onNext: () => void }) => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center justify-between pt-7.5! min-h-full! flex-1 gap-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <p className="text-[24px] font-semibold text-[#18181B]">
            What changes in 3 months
          </p>
          <p className="text-[16px] text-[#18181B]">
            Your kids notice before you do.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-5!">
          <div className="space-before flex flex-col gap-y-6">
            <p className="text-[20px] font-semibold text-[#18181B] text-center">
              Before
            </p>
            <div className="flex flex-col text-[12px] text-[#18181B] gap-y-4">
              <div className="flex flex-col gap-y-2 justify-center items-center">
                <CloseCircle />
                <p className="text-center">You react before you think</p>
              </div>
              <div className="flex flex-col gap-y-2 justify-center items-center">
                <CloseCircle />
                <p className="text-center">
                  Hard conversations turn into arguments
                </p>
              </div>
              <div className="flex flex-col gap-y-2 justify-center items-center">
                <CloseCircle />
                <p className="text-center">
                  Your kids shut down instead of opening up
                </p>
              </div>
            </div>
          </div>
          <div className="space-after flex flex-col gap-y-6">
            <p className="text-[20px] font-semibold text-[#18181B] text-center">
              After
            </p>
            <div className="flex flex-col text-[12px] text-[#18181B] gap-y-4">
              <div className="flex flex-col gap-y-2 justify-center items-center">
                <CheckCircle />
                <p className="text-center">
                  You respond. You don’t just react.
                </p>
              </div>
              <div className="flex flex-col gap-y-2 justify-center items-center">
                <CheckCircle />
                <p className="text-center">Tough moments bring you closer</p>
              </div>
              <div className="flex flex-col gap-y-2 justify-center items-center">
                <CheckCircle />
                <p className="text-center">Your kids actually come to you</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <div className="h-5 w-5">
            <Shield className="text-[#22C55E]" />
          </div>
          <p className="font-medium text-[12px] text-[#18181B]">
            84% of parents felt more confident in hard conversations after 10
            days of practice.
          </p>
        </div>
      </div>

      <Button
        variant="primary"
        onClick={onNext}
        id="btn-continue"
        className="text-[#18181B] w-full hover:!transform-none hover:!shadow-none"
      >
        {t("continue")}
      </Button>
    </div>
  );
};

const step38: SurveyStep = {
  id: 38,
  customPage: CustomPage38,
  showHeader: false,
};

export default step38;
