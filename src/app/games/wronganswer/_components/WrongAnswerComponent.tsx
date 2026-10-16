'use client';
import React, { Suspense } from 'react';
import { WrongAnswerComponentProps } from '@/types/wronganswer';
import { Check, Loader2 } from 'lucide-react';

const WrongAnswerComponent = ({ tab }: WrongAnswerComponentProps) => {
  const SelectedComponent = tab.component;

  return (
    <div className={`wronganswer-tab-panel bg-${tab.primaryColor}`}>
      <Suspense fallback={<Loader2 className='mr-2 h-4 w-4 animate-spin' />}>
        <div className='text-center mb-6'>
          <div className='flex items-center justify-center'>
            <strong className={`text-${tab.secondaryColor} title-24 max-md:title-16`}>
              완료한 문장은 체크해서 지워주세요!
            </strong>
            <Check
              className={`text-${tab.contentPointColor} w-[2.375rem] h-[2.375rem] -mt-1 ml-1 -mr-5 max-md:w-6 max-md:h-6 max-md:-mr-3`}
              style={{ strokeWidth: '3px' }}
            />
          </div>

          {tab.id === 'speaking' && (
            <p className='text-gray-700 text-lg font-semibold mt-2 max-md:mt-3 max-md:text-sm'>
              발음 문제는 <span className='font-extrabold text-secondary-600'>30% 이하</span> 점수만 오답으로
              책정됩니다.
            </p>
          )}
        </div>

        <SelectedComponent tab={tab} />
      </Suspense>
    </div>
  );
};

export default WrongAnswerComponent;
