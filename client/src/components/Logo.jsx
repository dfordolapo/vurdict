import React from 'react';

function Logo({ size = 'normal', onClick }) {
  const dim = size === 'normal' ? 120 : 105;

  return (
    <div
      className="cursor-pointer select-none"
      onClick={onClick}
      role="img"
      aria-label="Vurdict logo"
    >
      <img
        src="/assets/vurdict-logo.webp"
        alt="Vurdict"
        width={dim}
        height={dim}
        className="object-contain"
        loading="eager"
      />
    </div>
  );
}

export default Logo;
