'use client';
import React, { useEffect, useState } from 'react';
import { GameModalProps } from '@/types/result';
import { CheckingResult } from '@/types/checking';
import { ChevronDown, Circle, X } from 'lucide-react';
import DefaultButton from '@/components/DefaultButton';
import { Badge } from '@/components/ui/badge';

const ModalChecking = ({ game }: GameModalProps) => {
  const [result, setResult] = useState<CheckingResult[]>([]);
  const [openResult, setOpenResult] = useState<number | null>(null);

  useEffect(() => {
    const checkingResult = localStorage.getItem('checkingQuizResults');
    if (checkingResult) setResult(JSON.parse(checkingResult));
  }, []);

  return (
    <ul className={`modal-wronganswer-list ${game.id}`}>
      {result.map((result, index) => (
        <li key={result.test}>
          <div className='modal-wronganswer-card'>
            <div className='modal-wronganswer-number text-tertiary-p-600 before:bg-tertiary-p-200'>
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
                className='h-[3rem] px-6 text-2xl font-normal font-yangjin bg-tertiary-p-300 text-tertiary-p-50 hover:bg-tertiary-p-400 hover:text-tertiary-p-50 [&_svg]:size-8 [&_svg]:-mr-[0.375rem] [&_svg]:text-tertiary-p-100 [&_svg]:hover:text-tertiary-p-100 max-md:h-[1.75rem] max-md:px-3 max-md:text-xs max-md:[&_svg]:size-4 max-md:[&_svg]:-mr-[0.25rem]'
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
            <div className='modal-wronganswer-content bg-tertiary-p-100'>
              <div className='modal-wronganswer-content-top border-tertiary-p-200'>
                <div className='flex'>
                  <div className='w-[5.875rem] max-md:hidden'>
                    <Badge
                      className={`h-10 px-4 text-2xl rounded-lg bg-tertiary-p-200 text-tertiary-p-500 hover:bg-tertiary-p-200 max-md:h-6 max-md:text-sm`}
                    >
                      문제
                    </Badge>
                  </div>
                  <div className='w-[min-content] flex-auto'>
                    <div className='body-30 leading-tight text-gray-700 max-md:text-base'>{result.test}</div>
                    <div className='grid grid-cols-2 gap-[0.875rem] mt-5 max-md:mt-[0.875rem] max-md:gap-[0.625rem]'>
                      {result.option.map((item, optIndex) => (
                        <div
                          key={item}
                          className='flex items-center'
                        >
                          <span className='flex items-center justify-center w-7 h-7 rounded-full text-xl font-semibold mr-2 text-white bg-tertiary-p-300 max-md:w-5 max-md:h-5 max-md:text-xs max-md:mr-1'>
                            {optIndex + 1}
                          </span>
                          <span className='body-24 text-gray-700 max-md:text-sm'>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className='modal-wronganswer-content-bottom border-tertiary-p-50'>
                <div className='flex items-center'>
                  <div className='w-[5.875rem] leading-none max-md:w-14'>
                    <Badge
                      className={`h-10 px-4 text-2xl rounded-lg bg-tertiary-p-600 text-white hover:bg-tertiary-p-600 max-md:h-[1.375rem]  max-md:px-[0.625rem] max-md:rounded-sm max-md:text-xs max-md:bg-tertiary-p-400 max-md:hover:bg-tertiary-p-400`}
                    >
                      정답
                    </Badge>
                  </div>
                  <div className='w-[min-content] flex-auto'>
                    <div className='flex items-center'>
                      <span className='flex items-center justify-center w-9 h-9 rounded-full text-2xl font-semibold mr-2 text-white bg-tertiary-p-300 max-md:w-5 max-md:h-5 max-md:text-xs max-md:mr-1'>
                        {Array.isArray(result.option)
                          ? result.option.findIndex((opt: string) => opt === result.answer) + 1
                          : '-'}
                      </span>
                      <div className='flex items-center gap-3 max-md:gap-2'>
                        <span className={`text-3xl font-semibold line-through text-gray-700 max-md:text-sm`}>
                          {result.answer}
                        </span>
                        <span className={`text-3xl font-semibold text-tertiary-p-300 max-md:text-base`}>→</span>
                        <span className='text-3xl font-semibold text-tertiary-p-600 underline decoration-tertiary-p-200 decoration-[0.75rem] underline-offset-[-0.25rem] max-md:text-sm'>
                          {result.right}
                        </span>
                      </div>
                    </div>
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

export default ModalChecking;
