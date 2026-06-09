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
      className={`${className} text-white text-[10px] font-bold p-[8px]! rounded-sm flex-col flex items-center text-center justify-center min-h-[46px]`}
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
    <div className="relative w-full h-[250px] mt-2 mb-4">
      {/* SVG Line */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 328 100"
        fill="none"
        preserveAspectRatio="none"
        className="absolute w-full h-[100px] z-10 overflow-visible"
        style={{ top: '39px' }}
      >
        <defs>
          <linearGradient id="paint0_linear_854_1668" x1="1.5" y1="49.5141" x2="323.521" y2="49.5141" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFAC08" />
            <stop offset="0.365385" stopColor="#FF0000" />
            <stop offset="0.682692" stopColor="#258CD1" />
            <stop offset="1" stopColor="#00BF36" />
          </linearGradient>

          <mask id="path-mask">
            <motion.rect
              x="12%" y="0" height="100%" fill="white"
              initial={{ width: 0 }}
              animate={{ width: "88%" }}
              transition={{ delay: 0.2, duration: 5.5, ease: "linear" }}
            />
          </mask>
        </defs>

        <path
          d="M0.773074 74.8061C0.0484272 75.2075 -0.21356 76.1204 0.18791 76.8451C0.589381 77.5697 1.50228 77.8317 2.22693 77.4303L1.5 76.1182L0.773074 74.8061ZM39.0145 85.7842L40.0376 84.6872V84.6872L39.0145 85.7842ZM289.643 29.8589L289.382 28.3817L289.643 29.8589ZM324.992 1.20849C324.831 0.395897 324.042 -0.13217 323.229 0.0290216L309.987 2.65578C309.174 2.81698 308.646 3.60638 308.808 4.41898C308.969 5.23157 309.758 5.75964 310.571 5.59845L322.341 3.26355L324.676 15.0342C324.837 15.8468 325.627 16.3749 326.439 16.2137C327.252 16.0525 327.78 15.2631 327.619 14.4505L324.992 1.20849ZM1.5 76.1182L2.22693 77.4303C7.3087 74.6148 22.0576 72.0209 37.9915 86.8812L39.0145 85.7842L40.0376 84.6872C23.1997 68.9839 7.04607 71.3307 0.773074 74.8061L1.5 76.1182ZM39.0145 85.7842L37.9915 86.8812C48.5466 96.725 59.3598 99.3811 68.7363 98.9917C78.0494 98.6049 85.8701 95.2158 90.4917 93.136L89.8762 91.7681L89.2606 90.4003C84.6764 92.4631 77.3075 95.6331 68.6118 95.9943C59.9796 96.3528 49.9649 93.9456 40.0376 84.6872L39.0145 85.7842ZM89.8762 91.7681L90.4917 93.136C95.0663 91.0775 99.9667 88.7659 108.381 88.4049C116.852 88.0415 128.976 89.6575 147.875 95.7279L148.333 94.2997L148.792 92.8716C129.716 86.7443 117.214 85.0232 108.252 85.4077C99.233 85.7946 93.892 88.3162 89.2606 90.4003L89.8762 91.7681ZM148.333 94.2997L147.875 95.7279C167.334 101.978 183.819 98.1862 197.945 90.2569C211.999 82.3678 223.768 70.3524 233.863 60.1421L232.797 59.0874L231.73 58.0327C221.573 68.3053 210.097 79.995 196.476 87.6408C182.927 95.2463 167.307 98.8188 148.792 92.8716L148.333 94.2997ZM232.797 59.0874L233.863 60.1421C243.915 49.9767 252.121 43.8271 260.665 39.6959C269.219 35.5596 278.201 33.4012 289.904 31.336L289.643 29.8589L289.382 28.3817C277.61 30.4591 268.296 32.6735 259.359 36.9951C250.411 41.3218 241.932 47.7151 231.73 58.0327L232.797 59.0874ZM289.643 29.8589L289.904 31.336C309.43 27.8901 317.711 12.8834 324.768 2.33436L323.521 1.50035L322.274 0.666343C315.015 11.5175 307.415 25.1994 289.382 28.3817L289.643 29.8589Z"
          fill="url(#paint0_linear_854_1668)"
          mask="url(#path-mask)"
        />
      </svg>

      {/* Frame 1 */}
      <div className="absolute flex flex-col items-center z-20 gap-1.5" style={{ left: '12%', top: '50px', transform: 'translateX(-50%)' }}>
        <Tooltip color="#FFAC08" text="Your starting point" delay={0} className="w-[92px]!" />
        <Circle size={18} color="#FFAC08" delay={0.2} />
        <Rect height={85} color1="#FFAC08" color2="#FFFAF0" delay={0.4} />
        <Circle size={6} color="#FFAC08" delay={1.2} />
        <Label text="TODAY" color="#FFAC08" delay={1.4} />
      </div>

      {/* Frame 2 */}
      <div className="absolute flex flex-col items-center z-20 gap-1.5" style={{ left: '36%', top: '55px', transform: 'translateX(-50%)' }}>
        <Tooltip color="#FF0501" text="Build small wins" delay={1.6} className="w-[82px]!" />
        <Circle size={18} color="#FF0501" delay={1.8} />
        <Rect height={82} color1="#FF0501" color2="#FFFAF0" delay={2.0} />
        <Circle size={6} color="#FF0501" delay={2.8} />
        <Label text="MONTH 1" color="#FF0501" delay={3.0} />
      </div>

      {/* Frame 3 */}
      <div className="absolute flex flex-col items-center z-20 gap-1.5" style={{ left: '60%', top: '55px', transform: 'translateX(-50%)' }}>
        <Tooltip color="#258DCF" text="Strengthen \nconnections" delay={3.2} className="w-[84px]!" />
        <Circle size={18} color="#258DCF" delay={3.4} />
        <Rect height={80} color1="#258DCF" color2="#FFFAF0" delay={3.6} />
        <Circle size={6} color="#258DCF" delay={4.4} />
        <Label text="MONTH 2" color="#258DCF" delay={4.6} />
      </div>

      {/* Frame 4 */}
      <div className="absolute flex flex-col items-center z-20 gap-1.5" style={{ left: '84%', top: '1px', transform: 'translateX(-50%)' }}>
        <Tooltip color="#00DF56" text="Sustainable progress" delay={4.8} className="w-[84px]!" />
        <Circle size={18} color="#00DF56" delay={5.0} />
        <Rect height={136} color1="#00DF56" color2="#FFFAF0" delay={5.2} />
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
          <div className="flex gap-x-10 pb-4! border-b border-b-[#E4E4E7]">
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
              <p className="text-[16px] font-semibold text-[#18181B]">Month 3</p>
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
