'use client';
import React from 'react';
import { WrongAnswerTabProps } from '@/types/wronganswer';

const WrongAnswerTab = ({ tab, selectedTab, onClick }: Partial<WrongAnswerTabProps>) => {
  return (
    <button
      key={tab?.id}
      className={`relative flex justify-center items-center w-[11.375rem] h-[3.875rem] text-center font-yangjin max-md:w-full max-md:max-w-[8.125rem] max-md:h-[2.75rem] ${
        selectedTab === tab?.id
          ? `z-10 title-24 text-${tab?.primaryColor} max-md:text-base`
          : `top-[10px] title-20 text-${tab?.primaryLightColor} max-md:text-xs`
      }`}
      onClick={onClick}
    >
      <svg
        viewBox='0 0 182 62'
        width='100%'
        height='100%'
        xmlns='http://www.w3.org/2000/svg'
        className='absolute top-0 left-0'
      >
        <path
          d='M167.936 7.50122C166.796 3.08544 162.813 0 158.253 0H20C8.9543 0 2.44379e-06 8.9543 2.44379e-06 20V62H182L167.936 7.50122Z'
          fill='currentColor'
        />
      </svg>

      <p
        className={`relative ml-[-2px] ${selectedTab === tab?.id ? `text-${tab?.secondaryColor}` : `text-${tab?.secondaryLightColor} mt-[-10px]`}`}
      >
        {tab?.title}
      </p>
    </button>
  );
};

export default WrongAnswerTab;
