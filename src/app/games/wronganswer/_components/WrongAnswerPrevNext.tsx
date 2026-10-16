'use client';

import IconChevronLeft from '@/components/IconChevronLeft';
import IconChevronRight from '@/components/IconChevronRight';
import { Button } from '@/components/ui/button';
import { WrongAnswerPrevNextProps } from '@/types/wronganswer';

const WrongAnswerPrevNext = ({
  tab,
  currentPage,
  totalItems,
  itemsPerPage,
  handlePrevPage,
  handleNextPage,
}: WrongAnswerPrevNextProps) => {
  const totalPage = Math.ceil((totalItems ?? 0) / itemsPerPage);

  return (
    <div className='wronganswer-prev-next'>
      <Button
        size='icon'
        disabled={currentPage === 1}
        className={`wronganswer-prev transition-colors ${tab.iconButtonColor} ${tab.iconButtonDisabledColor}`}
        onClick={handlePrevPage}
      >
        <IconChevronLeft className={`!w-[1.25rem] !h-[1.875rem] -ml-1`} />
      </Button>
      <Button
        disabled={currentPage === totalPage || totalPage === 0}
        className={`wronganswer-next transition-colors ${tab.iconButtonColor} ${tab.iconButtonDisabledColor}`}
        onClick={handleNextPage}
      >
        <IconChevronRight className={`!w-[1.25rem] !h-[1.875rem] -mr-1`} />
      </Button>
    </div>
  );
};

export default WrongAnswerPrevNext;
