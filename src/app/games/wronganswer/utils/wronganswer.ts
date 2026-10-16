'use client';

import { useState } from 'react';
import { useIsMobile } from '@/utils/mediaquery/useMediaQuery';
import { AnswerData } from '@/types/wronganswer';

// 중복제거, 날짜순정렬
export const getProcessedWrongAnswers = (answers: AnswerData[]) => {
  return [...answers]
    .filter((item, index, array) => array.findIndex((obj) => obj.answer === item.answer) === index) // 중복제거
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()); // 날짜순정렬
};

// 오답 페이지네이션
export const useWrongAnswerPagination = (items: AnswerData[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useIsMobile();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedItems = isMobile ? items : items.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => {
      const hasNextPage = prev * itemsPerPage < items.length;

      return hasNextPage ? prev + 1 : prev;
    });
  };

  return {
    currentPage,
    paginatedItems,
    handlePrevPage,
    handleNextPage,
  };
};
