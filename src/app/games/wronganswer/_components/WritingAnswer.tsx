'use client';

import { useState } from 'react';
import { useAuth } from '@/queries/useAuth';
import { useFetchWritingWrongAnswer } from '@/queries/writing-fetchQuestions';
import { weekNumber } from '@/utils/week/weekNumber';
import { getProcessedWrongAnswers, useWrongAnswerPagination } from '../utils/wronganswer';
import { useDeleteWritingAnswersMutation } from '@/mutations/writing-mutation';
import { WrongAnswerComponentProps } from '@/types/wronganswer';
import WrongAnswerPrevNext from './WrongAnswerPrevNext';
import DefaultButton from '@/components/DefaultButton';
import { Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const WritingAnswer = ({ tab }: WrongAnswerComponentProps) => {
  const { data: user } = useAuth();
  const userId = user?.id ?? null;
  const { data: wrongAnswers, isLoading, isError } = useFetchWritingWrongAnswer(userId, weekNumber);
  const { mutate: deleteAnswers } = useDeleteWritingAnswersMutation();
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const itemsPerPage = 4;
  const wrongAnswersData = getProcessedWrongAnswers(wrongAnswers ?? []);
  const { currentPage, paginatedItems, handlePrevPage, handleNextPage } = useWrongAnswerPagination(
    wrongAnswersData,
    itemsPerPage,
  );

  const handleSelect = (question: string) => {
    setSelectedQuestions((prev) =>
      prev.includes(question) ? prev.filter((q) => q !== question) : [...prev, question],
    );
  };

  const handleDelete = () => {
    if (!userId) {
      alert('유저 정보가 없습니다. 다시 로그인해주세요.');
      return;
    }

    deleteAnswers({ questions: selectedQuestions, userId });
    setSelectedQuestions([]);
  };

  if (isLoading) return <div className='title-24 text-center text-gray-600 pt-6'>로딩중</div>;
  if (isError) return <div className='title-24 text-center text-gray-700 pt-6'>Error</div>;

  return (
    <>
      {!wrongAnswersData || wrongAnswersData.length === 0 ? (
        <div className='wronganswer-empty-text'>
          <p className={`title-34 ${tab.secondaryLightTextColor} max-md:title-24`}>오답이 아직 모이지 않았어요!</p>
        </div>
      ) : (
        <>
          {/* 콘텐츠 영역 */}
          <div className='wronganswer-tab-content'>
            <div className='grid grid-cols-2 grid-rows-2 gap-x-4 gap-y-3 h-[32.313rem] text-gray-700 max-md:grid-cols-1 max-md:gap-3 max-md:h-auto'>
              {paginatedItems?.map((answer, index) => (
                <div
                  key={index}
                  className='flex flex-col justify-between bg-white rounded-2xl overflow-hidden'
                >
                  <div className={`min-h-[3.5rem] border-b-[0.188rem] ${tab.contentPrimaryBorderColor}`}>
                    <div className='flex justify-between items-center h-full px-4 py-1 border-b-[0.188rem] border-tertiary-g-200'>
                      <div className='flex items-center gap-[0.625rem]'>
                        <Badge
                          className={`h-[2rem] text-lg font-bold rounded-lg px-[0.875rem] py-0 bg-warning-50 text-warning-300 hover:bg-warning-50 max-md:h-8 max-md:text-base`}
                        >
                          <X
                            className='w-6 h-6 -ml-1 mr-[0.125rem]'
                            style={{ strokeWidth: '2.5' }}
                          />
                          내 오답
                        </Badge>
                        <p className='text-[1.375rem] font-bold leading-tight text-warning-300 max-md:text-base'>
                          {answer.user_answer}
                        </p>
                      </div>
                      <div className='relative'>
                        <input
                          type='checkbox'
                          id={`checkbox-${answer.question}`}
                          className={`w-8 h-8 flex items-center justify-center ${tab.checkboxInputColor} rounded-lg appearance-none cursor-pointer max-md:w-6 max-md:h-6 max-md:rounded-sm`}
                          checked={selectedQuestions.includes(answer.question)}
                          onChange={() => handleSelect(answer.question)}
                        />
                        <label
                          htmlFor={`checkbox-${answer.question}`}
                          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${tab.checkboxLabelColor} cursor-pointer`}
                        >
                          <Check
                            className='w-7 h-7 max-md:w-5 h-w-5'
                            style={{ strokeWidth: '3px' }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-center items-center gap-9 px-4 py-3 max-md:gap-6'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                      <Badge
                        className={`h-[2rem] text-lg font-bold rounded-lg px-[0.875rem] py-0 ${tab.contentSecondaryBgColor} text-tertiary-g-800 hover:${tab.contentSecondaryBgColor} max-md:h-7 max-md:text-base`}
                      >
                        키워드
                      </Badge>
                      <p className='text-2xl font-bold max-md:text-xl'>{answer.consonant}</p>
                    </div>
                    <div className='flex justify-center items-center gap-[0.375rem]'>
                      {answer.answer?.split('').map((char: string, index: number) => (
                        <span
                          key={index}
                          className={`flex items-center justify-center w-16 h-16 text-4xl font-bold ${tab.contentPrimaryBgColor} rounded-lg max-md:w-12 max-md:h-12 max-md:text-2xl`}
                        >
                          {char}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div
                    className={`flex flex-col justify-center items-center gap-2 px-4 py-3 ${tab.contentPrimaryBgColor}`}
                  >
                    <p className='text-xl font-bold text-center leading-tight max-md:text-base'>{answer.question}</p>
                    <p className={`text-base font-medium leading-tight ${tab.contentPointTextColor} max-md:text-sm`}>
                      ***{answer.meaning}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 이전, 다음 버튼 */}
          <WrongAnswerPrevNext
            tab={tab}
            currentPage={currentPage}
            totalItems={wrongAnswersData.length}
            itemsPerPage={itemsPerPage}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
          />

          {/* 삭제 버튼 */}
          <div className={`wronganswer-delete-wrap ${tab.primaryBgColor}`}>
            <DefaultButton
              disabled={selectedQuestions.length === 0}
              className={`w-full max-w-[21.875rem] text-lg font-bold max-md:max-w-none ${tab.buttonColor} ${tab.buttonDisabledColor}`}
              onClick={handleDelete}
            >
              {selectedQuestions.length === 0 ? '지우기' : `${selectedQuestions.length}개 지우기`}
            </DefaultButton>
          </div>
        </>
      )}
    </>
  );
};

export default WritingAnswer;
