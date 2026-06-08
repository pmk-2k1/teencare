import type { SurveyStep } from "@/src/types/survey";
import Image from "next/image";
import Button from "@/src/component/Button";
import { useI18n } from "@/src/i18n/context";
import CheckCircle from "@/src/app/assets/svg/CheckCircle";
import { motion } from "framer-motion";

const Tooltip = ({ color, text, delay, className = "" }: { color: string, text: string, delay: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="flex flex-col items-center"
  >
    <div
      className={`${className} text-white text-[10px] font-bold px-[8px]! py-[10px]! rounded-sm flex-col flex items-center text-center justify-center`}
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
    <div className="relative w-full h-[360px] mt-2 mb-4">
      {/* SVG Line */}
      <svg viewBox="0 0 100 360" preserveAspectRatio="none" className="absolute inset-0 w-full h-full z-10 overflow-visible">
        <defs>
          <linearGradient id="main-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFAC08" />
            <stop offset="36.54%" stopColor="#FF0000" />
            <stop offset="68.27%" stopColor="#258DCF" />
            <stop offset="100%" stopColor="#00BF36" />
          </linearGradient>

          <mask id="path-mask">
            <motion.rect
              x="0" y="0" height="360" fill="white"
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ delay: 0.2, duration: 5.5, ease: "linear" }}
            />
          </mask>

          <marker id="arrow" markerUnits="userSpaceOnUse" viewBox="0 0 20 20" refX="13" refY="10" markerWidth="20" markerHeight="20" orient="auto-start-reverse">
            <path d="M 7 7 L 13 10 L 7 13" fill="none" stroke="#00BF36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>

        <path
          d="M 12 178 C 22 178, 26 198, 36 198 L 60 198 C 70 198, 74 148, 84 148 C 90 148, 97 138, 97 125"
          stroke="url(#main-grad)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          vectorEffect="non-scaling-stroke"
          mask="url(#path-mask)"
          markerEnd="url(#arrow)"
        />
      </svg>

      {/* Frame 1 */}
      <div className="absolute flex flex-col items-center z-20 gap-1.5" style={{ left: '12%', top: '100px', transform: 'translateX(-50%)' }}>
        <Tooltip color="#FFAC08" text="Your starting point" delay={0} className="w-[92px]!" />
        <Circle size={18} color="#FFAC08" delay={0.2} />
        <Rect height={138} color1="#FFAC08" color2="#FFFAF0" delay={0.4} />
        <Circle size={6} color="#FFAC08" delay={1.2} />
        <Label text="TODAY" color="#FFAC08" delay={1.4} />
      </div>

      {/* Frame 2 */}
      <div className="absolute flex flex-col items-center z-20 gap-1.5" style={{ left: '36%', top: '120px', transform: 'translateX(-50%)' }}>
        <Tooltip color="#FF0501" text="Build small wins" delay={1.6} className="w-[82px]!" />
        <Circle size={18} color="#FF0501" delay={1.8} />
        <Rect height={118} color1="#FF0501" color2="#FFFAF0" delay={2.0} />
        <Circle size={6} color="#FF0501" delay={2.8} />
        <Label text="MONTH 1" color="#FF0501" delay={3.0} />
      </div>

      {/* Frame 3 */}
      <div className="absolute flex flex-col items-center z-20 gap-1.5" style={{ left: '60%', top: '120px', transform: 'translateX(-50%)' }}>
        <Tooltip color="#258DCF" text="Strengthen \nconnections" delay={3.2} className="w-[92px]!" />
        <Circle size={18} color="#258DCF" delay={3.4} />
        <Rect height={118} color1="#258DCF" color2="#FFFAF0" delay={3.6} />
        <Circle size={6} color="#258DCF" delay={4.4} />
        <Label text="MONTH 2" color="#258DCF" delay={4.6} />
      </div>

      {/* Frame 4 */}
      <div className="absolute flex flex-col items-center z-20 gap-1.5" style={{ left: '84%', top: '70px', transform: 'translateX(-50%)' }}>
        <Tooltip color="#00DF56" text="Sustainable progress" delay={4.8} className="w-[92px]!" />
        <Circle size={18} color="#00DF56" delay={5.0} />
        <Rect height={168} color1="#00DF56" color2="#FFFAF0" delay={5.2} />
        <Circle size={6} color="#00DF56" delay={6.0} />
        <Label text="MONTH 3" color="#00DF56" delay={6.2} />
      </div>
    </div>
  );
};

const CustomPage37 = ({ onNext }: { onNext: () => void }) => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center justify-between pt-7.5! min-h-full! flex-1 gap-10">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-[24px] font-semibold text-[#18181B]">
            Your personalized 3-month plan{" "}
          </p>
          <p className="text-[16px] text-[#18181B]">
            Built around your kids, your schedule, your starting point.
          </p>
        </div>
        <Chart />
        <div className="flex flex-col px-5!">
          <div className="flex gap-x-10 py-4! border-b border-b-[#E4E4E7]">
            <div className="flex gap-x-2">
              <CheckCircle />
              <p className="text-[16px] font-semibold text-[#18181B]">Week 1</p>
            </div>
            <p className="text-[16px] font-semibold text-[#18181B]">You Stay Calm</p>
          </div>

          <div className="flex gap-x-10 py-4! border-b border-b-[#E4E4E7]">
            <div className="flex gap-x-2">
              <CheckCircle />
              <p className="text-[16px] font-semibold text-[#18181B]">Month 1</p>
            </div>
            <p className="text-[16px] font-semibold text-[#18181B]">You Handle the Hard Stuff</p>
          </div>
          <div className="flex gap-x-10 py-4!">
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
        className="text-[#18181B] w-full shrink-0"
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
