import type { SurveyStep } from "@/src/types/survey";
import Button from "@/src/component/Button";
import { useI18n } from "@/src/i18n/context";
import { motion } from "framer-motion";

const Tooltip = ({ color, text, delay, className = "" }: { color: string, text: string, delay: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="flex flex-col items-center"
  >
    <div
      className={`${className} text-white text-[10px] font-bold p-[8px]! rounded-sm flex-col flex items-center text-center justify-center`}
      style={{ backgroundColor: color }}
    >
      {text.split(/\\n|\n/).map((line, index) => (
        <span key={index}>{line}</span>
      ))}
    </div>
    <div
      style={{
        width: 0,
        height: 0,
        borderLeft: '8px solid transparent',
        borderRight: '8px solid transparent',
        borderTop: `12px solid ${color}`,
      }}
    />
  </motion.div>
);

const Circle = ({ size, color, delay }: { size: number, color: string, delay: number }) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay, duration: 0.4, type: "spring" }}
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      borderRadius: '50%',
      flexShrink: 0,
      zIndex: 10
    }}
  />
);

const Rect = ({ height, color1, color2, delay }: { height: number, color1: string, color2: string, delay: number }) => (
  <motion.div
    initial={{ height: 0 }}
    animate={{ height }}
    transition={{ delay, duration: 0.8, ease: "easeOut" }}
    style={{
      width: '3px',
      background: `linear-gradient(180deg, ${color1} 0%, ${color2} 100%)`,
      borderRadius: '2px'
    }}
  />
);

const Label = ({ text, color, delay }: { text: string, color: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.4 }}
    className="text-[10px] font-semibold flex items-center text-center justify-center mt-1"
    style={{ color: color }}
  >
    {text}
  </motion.div>
);

const Chart = () => {
  return (
    <div className="relative w-full h-[330px] mt-2">
      {/* Background horizontal lines */}
      <div className="absolute inset-0 z-0">
        {[70, 110, 150, 190, 230, 270, 310].map((y, i) => (
          <div key={i} className="absolute w-full border-b border-[#E4E4E7]" style={{ top: y }} />
        ))}
      </div>

      {/* SVG Lines */}
      <svg viewBox="0 0 100 330" preserveAspectRatio="none" className="absolute inset-0 w-full h-full z-10 overflow-visible">
        <defs>
          <linearGradient id="line1-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="34.38%" stopColor="#FFAC08" />
            <stop offset="111.2%" stopColor="#00BF36" />
          </linearGradient>
          <linearGradient id="line2-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="17.33%" stopColor="#FFAC08" />
            <stop offset="101.49%" stopColor="#FF0000" />
          </linearGradient>

          <mask id="mask1">
            <motion.rect
              x="13" y="0" height="330" fill="white"
              initial={{ width: 0 }}
              animate={{ width: 70 }}
              transition={{ delay: 1.8, duration: 1.5, ease: "easeInOut" }}
            />
          </mask>

          <mask id="mask2">
            <motion.rect
              x="13" y="0" height="330" fill="white"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ delay: 4.5, duration: 1.0, ease: "easeInOut" }}
            />
          </mask>
        </defs>

        <path
          d="M13 208 C13.94 206.61, 17.78 210.42, 22.35 200.97 C27.28 190.76, 28.78 169.68, 37.07 169.68 C45.36 169.68, 48.23 184.05, 56.03 146.70 C61.76 119.24, 67.66 119.87, 70.39 115.08 C75.11 106.81, 75.42 81.88, 83.00 79.00"
          stroke="url(#line1-grad)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          vectorEffect="non-scaling-stroke"
          mask="url(#mask1)"
        />

        <path
          d="M13 208 C14.34 207.0, 18.06 208.51, 22.29 222.73 C27.57 240.50, 30.96 207.50, 36.20 235.17 C38.25 245.70, 41.48 244.81, 47.33 239.99 C53.17 235.17, 52.14 256.75, 61.00 258.02"
          stroke="url(#line2-grad)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          vectorEffect="non-scaling-stroke"
          mask="url(#mask2)"
        />
      </svg>

      {/* Frame 1 */}
      <div className="absolute flex flex-col items-center z-20 gap-1.5" style={{ left: '10%', top: '135px', transform: 'translateX(-50%)' }}>
        <Tooltip color="#FFAC08" text="Start with knowledge" delay={0} className="w-[78px]!" />
        <Circle size={18} color="#FFAC08" delay={0.2} />
        <Rect height={70} color1="#FFAC08" color2="#FFFAF0" delay={0.4} />
        <Circle size={6} color="#FFAC08" delay={1.2} />
        <Label text="TODAY" color="#FFAC08" delay={1.4} />
      </div>

      {/* Frame 3 */}
      <div className="absolute flex flex-col items-center z-20 gap-2" style={{ left: '87%', top: '0px', transform: 'translateX(-50%)' }}>
        <Tooltip color="#00BF36" text="Knowledge \n+ Daily practice" delay={2.9} className="w-[100px]!" />
        <Circle size={18} color="#00BF36" delay={2.8} />
        <Rect height={200} color1="#00BF36" color2="#FFFAF0" delay={3.0} />
        <Circle size={6} color="#00DF56" delay={3.8} />
        <Label text="IN 30 DAYS" color="#00DF56" delay={4.0} />
      </div>

      {/* Frame 2 */}
      <div className="absolute flex flex-col items-center z-20 gap-2" style={{ left: '65%', top: '180px', transform: 'translateX(-50%)' }}>
        <Tooltip color="#FF0501" text="Knowledge Only" delay={5.6} className="w-[92px]!" />
        <Circle size={18} color="#FF0501" delay={5.5} />
      </div>
    </div>
  );
};

const CustomPage14 = ({ onNext }: { onNext: () => void }) => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center justify-between pt-7.5! min-h-full! flex-1 mt-7.5! gap-10" >
      <div className="flex flex-col justify-center items-center w-full gap-y-6">
        <div className="flex flex-col gap-1">
          <p className="text-[#18181B] text-[24px] font-semibold text-center">Reading gives you knowledge.</p>
          <p className="text-[#FFAC08] text-[24px] font-semibold text-center">Practice makes it stick.</p>
        </div>
        <Chart />
        <p className="text-[#18181B] text-[16px] font-semibold text-center">PARENTING SKILL GROWTH</p>
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

const step14: SurveyStep = {
  id: 14,
  customPage: CustomPage14,
  showHeader: false,
};

export default step14;
