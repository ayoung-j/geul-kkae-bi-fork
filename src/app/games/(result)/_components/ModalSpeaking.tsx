'use client';
import React, { useEffect, useState } from 'react';
import { GameModalProps } from '@/types/result';
import { SpeakResult } from '@/types/speaking';

const ModalSpeaking = ({ game }: GameModalProps) => {
  const [result, setResult] = useState<SpeakResult[]>([]);

  useEffect(() => {
    const speakingScore = localStorage.getItem('speakingResult');
    if (speakingScore) setResult(JSON.parse(speakingScore));
  }, []);

  return (
    <ul className={`modal-wronganswer-list ${game.id}`}>
      {result.map((item, index) => {
        return (
          <li key={item.text}>
            <div className='modal-wronganswer-card max-md:min-h-[5.125rem] max-md:flex-wrap max-md:items-start max-md:px-2'>
              <div className='modal-wronganswer-number text-secondary-700 before:bg-secondary-300 max-md:pt-0'>
                {String(index + 1).padStart(2, '0')}번
              </div>
              <div className='modal-wronganswer-title body-24 max-md:w-full max-md:order-last max-md:pt-3 max-md:px-0'>
                {item.text}
              </div>
              <div className='modal-wronganswer-detail text-secondary-500 title-40 text-right max-md:text-base'>
                <span>{item.score}</span>
                <span className='text-2xl max-md:text-xs'>%</span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ModalSpeaking;
