'use client';

import { useState } from 'react';
import { useAuth } from '@/queries/useAuth';
import { useFetchCheckingWrongAnswer } from '@/queries/checking-fetchQuestions';
import { weekNumber } from '@/utils/week/weekNumber';
import { getProcessedWrongAnswers, useWrongAnswerPagination } from '../utils/wronganswer';
import { useDeleteCheckingAnswersMutation } from '@/mutations/checking-mutation';
import { WrongAnswerComponentProps } from '@/types/wronganswer';
import WrongAnswerPrevNext from './WrongAnswerPrevNext';
import DefaultButton from '@/components/DefaultButton';
import { Badge } from '@/components/ui/badge';
import { Check, Circle, X } from 'lucide-react';

const CheckingAnswer = ({ tab }: WrongAnswerComponentProps) => {
  const { data: user } = useAuth();
  const userId = user?.id ?? null;
  const { data: wrongAnswers, isLoading, isError } = useFetchCheckingWrongAnswer(userId, weekNumber);
  const { mutate: deleteAnswers } = useDeleteCheckingAnswersMutation();
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const itemsPerPage = 2;
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
            <div className='grid grid-cols-2 gap-4 h-full text-gray-700 max-md:grid-cols-1 max-md:gap-3 max-md:h-auto'>
              {paginatedItems?.map((answer, index) => (
                <div
                  key={index}
                  className='flex flex-col bg-white rounded-2xl overflow-hidden'
                >
                  {/* 문제 및 선택지 */}
                  <div className='flex flex-col h-full pt-4 px-5 pb-4 max-md:p-4'>
                    {/* 문제 헤더 */}
                    <div className='flex justify-between items-center mb-3'>
                      <Badge
                        className={`h-[2rem] text-lg font-bold rounded-lg px-[0.875rem] py-0 ${tab.contentPrimaryBgColor} ${tab.contentPointTextColor} hover:${tab.contentPrimaryBgColor} max-md:h-6 max-md:text-sm`}
                      >
                        문제
                      </Badge>
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

                    {/* 문제 텍스트 */}
                    <p className='text-2xl font-semibold leading-[1.5] text-gray-700 mb-4 max-md:text-base max-md:mb-[0.625rem]'>
                      {answer.question}
                    </p>

                    {/* 선택지 */}
                    <div className='grid grid-cols-1 gap-[0.375rem] mt-auto'>
                      {Array.isArray(answer.correct) &&
                        answer.correct.map((option: string, index: number) => (
                          <div
                            key={index}
                            className={`flex items-center min-h-[3.25rem] px-5 py-2 rounded-lg text-gray-700 max-md:min-h-[2.25rem] max-md:py-[0.37rem] ${
                              answer.user_answer === option
                                ? 'bg-warning-50'
                                : option === answer.answer
                                  ? `${tab.contentPrimaryBgColor}`
                                  : 'bg-tertiary-p-50'
                            }`}
                          >
                            {/* 번호 표시 */}
                            <span
                              className={`flex items-center justify-center w-7 h-7 rounded-full text-[1.25rem] font-semibold mr-2 text-white ${tab.contentSecondaryBgColor} max-md:w-6 max-md:h-6 max-md:text-base`}
                            >
                              {index + 1}
                            </span>
                            {/* 옵션 텍스트 */}
                            <span className='text-2xl font-semibold max-md:text-base'>{option}</span>
                            {answer.user_answer !== option && option === answer.answer && (
                              <Circle
                                className={`w-[1.125rem] h-[1.125rem] ${tab.contentPointTextColor} ml-auto -mr-[0.125rem] max-md:w-4 max-md:h-4 max-md:-mr-1`}
                                style={{ strokeWidth: '2.5' }}
                              />
                            )}
                            {answer.user_answer === option && option !== answer.answer && (
                              <X
                                className='w-5 h-w-5 text-warning-400 ml-auto -mr-1 max-md:w-4 max-md:h-4'
                                style={{ strokeWidth: '2.5' }}
                              />
                            )}
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* 정답 해설 */}
                  <div
                    className={`w-full min-h-[7.125rem] px-5 py-[1.125rem] mt-auto ${tab.contentPrimaryBgColor} max-md:min-h-[auto] max-md:px-4 max-md:py-3`}
                  >
                    <div className='flex items-center mb-[0.625rem]'>
                      <Badge
                        className={`h-[2rem] text-lg font-bold rounded-lg px-[0.875rem] py-0 ${tab.contentSecondaryBgColor} text-white hover:${tab.contentSecondaryBgColor} max-md:h-6 max-md:text-sm`}
                      >
                        정답해설
                      </Badge>
                    </div>
                    <div className='flex items-center'>
                      {/* 정답 인덱스 */}
                      <span
                        className={`flex items-center justify-center w-7 h-7 rounded-full text-[1.25rem] font-semibold mr-2 text-white ${tab.contentSecondaryBgColor} max-md:w-[1.375rem] max-md:h-[1.375rem] max-md:text-base`}
                      >
                        {Array.isArray(answer.correct)
                          ? answer.correct.findIndex((opt: string) => opt === answer.answer) + 1
                          : '-'}
                      </span>
                      {/* 정답 */}
                      <div className='flex items-center gap-[0.375rem] max-md:gap-2'>
                        <span className={`text-2xl font-semibold line-through text-gray-700 max-md:text-base`}>
                          {answer.answer}
                        </span>
                        {/* 화살표 및 해설 */}
                        <span className={`text-2xl font-semibold ${tab.contentSecondaryTextColor} max-md:text-base`}>
                          →
                        </span>
                        <span className='text-2xl font-semibold text-tertiary-p-600 underline decoration-tertiary-p-200 decoration-[0.75rem] underline-offset-[-0.25rem] max-md:text-base'>
                          {answer.meaning}
                        </span>
                      </div>
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
              {selectedQuestions.length === 0 ? '지우기' : `${selectedQuestions.length}개 지우기`}
            </DefaultButton>
          </div>
        </>
      )}
    </>
  );
};

export default CheckingAnswer;
