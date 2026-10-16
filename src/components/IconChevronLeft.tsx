type IconChevronLeftProps = {
  className?: string | null;
}

const IconChevronLeft = ({ className }: IconChevronLeftProps) => {
  return (
    <svg
      width='12'
      height='18'
      viewBox='0 0 12 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className || ''}
    >
      <path
        d='M9.75 1.75L1.75 8.75L9.75 15.75'
        stroke='currentColor'
        strokeWidth='3.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default IconChevronLeft;
