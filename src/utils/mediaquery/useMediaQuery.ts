import { useMediaQuery } from 'use-media-query-react';

export const useIsMobile = () => {
  return useMediaQuery('(max-width: 768px)');
};

