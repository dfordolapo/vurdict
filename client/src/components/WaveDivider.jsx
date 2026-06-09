export default function WaveDivider({ fill = '#172554', flip = false, className = '', noGap = false }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${className} ${flip ? 'rotate-180 -mt-1' : noGap ? '' : '-mb-px'}`}>
      <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px]">
        <path d="M0,0 Q360,200 720,0 Q1080,200 1440,0 L1440,200 L0,200 Z" fill={fill} />
      </svg>
    </div>
  );
}
