type IconArrowRightProps = {
  className?: string | null;
};

const IconArrowRight = ({ className }: IconArrowRightProps) => {
  return (
    <svg
      width='33'
      height='38'
      viewBox='0 0 33 38'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className || ''}
    >
      <path
        d='M31.5 15.9947C33.5 17.1494 33.5 20.0361 31.5 21.1908L4.5 36.7793C2.5 37.934 0 36.4906 0 34.1812V3.00432C0 0.694915 2.5 -0.74846 4.5 0.40624L31.5 15.9947Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default IconArrowRight;
