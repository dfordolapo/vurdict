import React from 'react';

function Logo({ size = 'normal', onClick }) {
  const dim = size === 'normal' ? 140 : 105;

  return (
    <div
      className="cursor-pointer select-none"
      onClick={onClick}
      role="img"
      aria-label="Vurdict logo"
    >
      <img
        src="/assets/vurdict-logo.png"
        alt="Vurdict"
        width={dim}
        height={dim}
        className="object-contain"
      />
    </div>
  );
}

export default Logo;
