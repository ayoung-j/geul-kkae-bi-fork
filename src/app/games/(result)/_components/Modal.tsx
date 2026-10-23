'use client';
import { useState } from 'react';
import ModalPortal from '@/components/ModalPortal';
import ModalSpeaking from './ModalSpeaking';
import ModalChecking from './ModalChecking';
import ModalWriting from './ModalWriting';
import { Button } from '@/components/ui/button';
import { GameModalData } from '@/types/result';
import { X } from 'lucide-react';

const GAME_MODAL_DATA: GameModalData[] = [
  {
    id: 'speaking',
    title: '나야, 발음왕',
    defaultBgColor: 'bg-secondary-200',
    primaryTextColor: 'text-secondary-600',
    secondaryTextColor: 'text-secondary-700',
    scrollColor: 'scrollbar-secondary',
    component: ModalSpeaking,
  },
  {
    id: 'checking',
    title: '틀린 말 탐정단',
    defaultBgColor: 'bg-tertiary-p-200',
    primaryTextColor: 'text-tertiary-p-400',
    secondaryTextColor: 'text-tertiary-p-600',
    scrollColor: 'scrollbar-tertiary-p',
    component: ModalChecking,
  },
  {
    id: 'writing',
    title: '빈칸 한 입',
    defaultBgColor: 'bg-tertiary-g-300',
    primaryTextColor: 'text-tertiary-g-600',
    secondaryTextColor: 'text-tertiary-g-700',
    scrollColor: 'scrollbar-tertiary-g',
    component: ModalWriting,
  },
];

const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGameType, setCurrentGameType] = useState<string | null>('speaking');
  const selectedGame = GAME_MODAL_DATA.find((game) => game.id === currentGameType);
  const ModalComponent = selectedGame?.component;

  const handleOpenModal = () => {
    const gameType = localStorage.getItem('lastGameType');
    setCurrentGameType(gameType);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <Button
        onClick={handleOpenModal}
        className='solid-light-button min-w-[6.75rem] max-md:w-full'
      >
        오답 확인
      </Button>

      <ModalPortal
        open={isModalOpen}
        onClose={handleCloseModal}
      >
        <div
          className={`relative w-screen max-w-[62.5rem] max-h-[90vh] flex flex-col justify-between rounded-[3.125rem] overflow-hidden max-md:max-w-[90vw] max-md:rounded-[1.25rem] ${selectedGame?.defaultBgColor} ${selectedGame?.scrollColor}`}
        >
          <div className='text-center pt-12 max-md:pt-[2.125rem]'>
            <h2 className={`title-40 ${selectedGame?.secondaryTextColor} max-md:title-24`}>
              <span className={`${selectedGame?.primaryTextColor}`}>{selectedGame?.title}</span> 오답공개
            </h2>
            <div className='text-2xl font-semibold mt-4 text-gray-700 max-md:text-sm max-md:mt-1'>
              {selectedGame?.id === 'speaking' ? (
                <>
                  발음 문제는 <span className={`font-extrabold ${selectedGame?.primaryTextColor}`}>30% 이하</span>{' '}
                  점수만 오답으로 책정됩니다.
                </>
              ) : (
                <>
                  오답은 <span className={`font-extrabold ${selectedGame?.primaryTextColor}`}>오답모아 페이지</span>{' '}
                  에서 다시 확인하실 수 있습니다.
                </>
              )}
            </div>
          </div>

          <button
            className='absolute top-[2.25rem] right-[2.5rem] max-md:top-4 max-md:right-4'
            onClick={handleCloseModal}
          >
            <X className={`w-12 h-12 ${selectedGame?.secondaryTextColor} max-md:w-6 max-md:h-6`} />
          </button>

          <div className='h-[35rem] mt-5 mb-[3.75rem] ml-[6.25rem] mr-[5.25rem] pr-4 overflow-x-hidden overflow-y-scroll max-md:mt-4 max-md:mb-[2.125rem] max-md:ml-5 max-md:mr-2 max-md:pr-2'>
            {selectedGame && ModalComponent && <ModalComponent game={selectedGame} />}
          </div>
        </div>
      </ModalPortal>
    </>
  );
};
export default Modal;
