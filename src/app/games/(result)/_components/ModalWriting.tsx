import React, { useEffect, useState } from 'react';
import { GameModalProps } from '@/types/result';
import { PartialQuestion } from '@/types/writing';
import { ChevronDown, Circle, X } from 'lucide-react';
import DefaultButton from '@/components/DefaultButton';
import { Badge } from '@/components/ui/badge';

const ModalWriting = ({ game }: GameModalProps) => {
  const [result, setResult] = useState<PartialQuestion[]>([]);
  const [openResult, setOpenResult] = useState<number | null>(null);

  useEffect(() => {
    const writingResult = localStorage.getItem('writingQuizResults');
    if (writingResult) setResult(JSON.parse(writingResult));
  }, []);

  return (
    <ul className={`modal-wronganswer-list ${game.id}`}>
      {result.map((result, index) => (
        <li key={result.test}>
          <div className='modal-wronganswer-card'>
            <div className='modal-wronganswer-number text-tertiary-g-800 before:bg-tertiary-g-200'>
              {String(index + 1).padStart(2, '0')}번
            </div>
            <div className='modal-wronganswer-title'>
              <span>{result.userAnswer}</span>
              {result.isCorrect ? (
                <Circle
                  className='w-8 h-8 shrink-0 text-primary-400 ml-3 max-md:w-5 max-md:h-5 max-md:ml-1'
                  style={{ strokeWidth: '2.5' }}
                />
              ) : (
                <X
                  className='w-9 h-9 shrink-0 text-warning-400 ml-3 max-md:w-6 max-md:h-6 max-md:ml-1'
                  style={{ strokeWidth: '2.5' }}
                />
              )}
            </div>
            <div className='modal-wronganswer-detail'>
              <DefaultButton
                className='h-[3rem] px-6 text-2xl font-normal font-yangjin bg-tertiary-g-600 text-tertiary-g-50 hover:bg-tertiary-g-500 hover:text-tertiary-g-50 [&_svg]:size-8 [&_svg]:-mr-[0.375rem] [&_svg]:text-tertiary-g-200 [&_svg]:hover:text-tertiary-g-200 max-md:h-[1.75rem] max-md:px-3 max-md:text-xs max-md:[&_svg]:size-4 max-md:[&_svg]:-mr-[0.25rem]'
                onClick={() => setOpenResult(openResult === index ? null : index)}
              >
                <div className='pt-[0.125rem]'>정답 확인</div>
                <ChevronDown
                  className={`${openResult === index && 'rotate-180'}`}
                  style={{ strokeWidth: '3' }}
                />
              </DefaultButton>
            </div>
          </div>

          {/* 문제 상세 */}
          {openResult === index && (
            <div className='modal-wronganswer-content bg-tertiary-g-100'>
              <div className='modal-wronganswer-content-top border-tertiary-g-300'>
                <div className='flex'>
                  <div className='w-[7.125rem] max-md:hidden'>
                    <Badge
                      className={`h-10 px-4 text-2xl rounded-lg bg-tertiary-g-500 text-tertiary-g-800 hover:bg-tertiary-g-500 max-md:h-6 max-md:text-sm`}
                    >
                      키워드
                    </Badge>
                  </div>
                  <div className='w-[min-content] flex-auto'>
                    <div className='body-30 leading-tight text-gray-700 max-md:text-center'>{result.keyword}</div>
                  </div>
                </div>
                <div className='flex mt-4 max-md:mt-3'>
                  <div className='w-[7.125rem] max-md:hidden'>
                    <Badge
                      className={`h-10 px-4 text-2xl rounded-lg bg-tertiary-g-500 text-tertiary-g-800 hover:bg-tertiary-g-500 max-md:h-6 max-md:text-sm`}
                    >
                      예시
                    </Badge>
                  </div>
                  <div className='w-[min-content] flex-auto'>
                    <div className='body-30 leading-tight text-gray-700 max-md:text-base max-md:text-center'>
                      {result.test}
                    </div>
                    <div className='text-xl font-medium text-tertiary-g-600 mt-[0.375rem] max-md:text-sm max-md:text-center'>
                      ***{result.meaning}
                    </div>
                  </div>
                </div>
              </div>
              <div className='modal-wronganswer-content-bottom border-tertiary-g-50'>
                <div className='flex items-center'>
                  <div className='w-[7.125rem] leading-none max-md:w-14'>
                    <Badge
                      className={`h-10 px-4 text-2xl rounded-lg bg-tertiary-g-600 text-white hover:bg-tertiary-g-600 max-md:h-[1.375rem]  max-md:px-[0.625rem] max-md:rounded-sm max-md:text-xs`}
                    >
                      정답
                    </Badge>
                  </div>
                  <div className='w-[min-content] flex-auto'>
                    <div className='body-30 leading-tight text-gray-700 max-md:text-base'>{result.answer}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ModalWriting;
