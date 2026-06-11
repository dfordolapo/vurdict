export default function WaveDivider({ fill = '#172554', flip = false, className = '', noGap = false, small = false }) {
  const h = small ? 'h-[30px] md:h-[50px]' : 'h-[60px] md:h-[100px]';
  const vb = small ? '0 0 1440 100' : '0 0 1440 200';
  const d = small ? 'M0,0 Q360,100 720,0 Q1080,100 1440,0 L1440,100 L0,100 Z' : 'M0,0 Q360,200 720,0 Q1080,200 1440,0 L1440,200 L0,200 Z';
  return (
    <div className={`w-full overflow-hidden leading-none ${className} ${flip ? 'rotate-180 -mt-1' : noGap ? '' : '-mb-px'}`}>
      <svg viewBox={vb} preserveAspectRatio="none" className={`relative block w-full ${h}`}>
        <path d={d} fill={fill} />
      </svg>
    </div>
  );
}
