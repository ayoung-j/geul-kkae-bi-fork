'use client';

import { useState } from 'react';
import { useAuth } from '@/queries/useAuth';
import { useGetWrongAnswer } from '@/queries/useGetWrongAnswer';
import { weekNumber } from '@/utils/week/weekNumber';
import { getProcessedWrongAnswers, useWrongAnswerPagination } from '../utils/wronganswer';
import { useDeleteSpeakAnswersMutation } from '@/mutations/speak-mutation';
import { WrongAnswerComponentProps } from '@/types/wronganswer';
import WrongAnswerPrevNext from './WrongAnswerPrevNext';
import DefaultButton from '@/components/DefaultButton';
import { Check } from 'lucide-react';

const SpeakAnswer = ({ tab }: WrongAnswerComponentProps) => {
  const { data: user } = useAuth();
  const userId = user?.id ?? null;
  const { data: wrongAnswers, isLoading, isError } = useGetWrongAnswer(userId, weekNumber);
  const { mutate: deleteAnswers } = useDeleteSpeakAnswersMutation();
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const itemsPerPage = 5;
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

    deleteAnswers({ answer: selectedQuestions, userId });
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
            <div className='grid grid-cols-1 gap-[0.875rem] max-md:gap-3'>
              {paginatedItems?.map((answer, index) => (
                <div
                  key={index}
                  className={`${
                    selectedQuestions.includes(answer.answer) ? `${tab.contentPrimaryBgColor}` : ''
                  } flex items-center h-[5.25rem] px-8 py-4 rounded-lg bg-[#FEF2E0] max-md:h-auto max-md:px-3 max-md:py-[0.438rem]`}
                >
                  <p
                    className={`relative w-[6.25rem] title-40 text-center ${tab.contentSecondaryTextColor} pt-1 pr-6 leading-none before:content-[''] before:absolute before:top-1/2 before:right-0 before:translate-y-[-50%] before:w-[0.25rem] before:h-[3.125rem] before:bg-[#FFB440] max-md:w-[3.125rem] max-md:title-20 max-md:pt-[0.125rem] max-md:pr-[0.625rem] max-md:before:w-[0.125rem] max-md:before:h-[2.125rem]`}
                  >
                    <span>{answer.score}</span>
                    <span className='text-2xl max-md:text-xs'>%</span>
                  </p>
                  <p className='w-[min-content] flex-auto body-24 !leading-tight px-[1.563rem] max-md:caption-14 max-md:px-[0.625rem]'>
                    {answer.answer}
                  </p>
                  <div className='ml-auto flex items-center'>
                    <div className='relative'>
                      <input
                        type='checkbox'
                        id={`checkbox-${answer.answer}`}
                        className={`w-[3.125rem] h-[3.125rem] flex items-center justify-center ${tab.checkboxInputColor} rounded-xl appearance-none cursor-pointer max-md:w-6 max-md:h-6 max-md:rounded-sm`}
                        checked={selectedQuestions.includes(answer.answer)}
                        onChange={() => handleSelect(answer.answer)}
                      />
                      <label
                        htmlFor={`checkbox-${answer.answer}`}
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${tab.checkboxLabelColor} cursor-pointer`}
                      >
                        <Check
                          className='w-[2.375rem] h-[2.375rem] max-md:w-5 h-w-5'
                          style={{ strokeWidth: '3px' }}
                        />
                      </label>
                    </div>
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
              {selectedQuestions.length === 0 ? null : <span>{selectedQuestions.length}개 </span>}지우기
            </DefaultButton>
          </div>
        </>
      )}
    </>
  );
};

export default SpeakAnswer;
