'use client';
import React, { useState } from 'react';
import CheckingAnswer from './_components/CheckingAnswer';
import WritingAnswer from './_components/WritingAnswer';
import SpeakAnswer from './_components/SpeakAnswer';
import WrongAnswerTab from './_components/WrongAnswerTab';
import WrongAnswerComponent from './_components/WrongAnswerComponent';
import { WrongAnswerTabData } from '@/types/wronganswer';
import './style.css';

const WRONGANSWER_TAB_DATA: WrongAnswerTabData[] = [
  {
    id: 'speaking',
    title: '나야, 발음왕',
    primaryTextColor: 'text-secondary-300',
    primaryBgColor: 'bg-secondary-300',
    primaryLightTextColor: 'text-secondary-200',
    secondaryTextColor: 'text-secondary-700',
    secondaryLightTextColor: 'text-secondary-500',
    contentPointTextColor: 'text-secondary-500',
    contentPrimaryBgColor: 'bg-secondary-200',
    contentPrimaryBorderColor: 'border-secondary-200',
    contentSecondaryTextColor: 'text-secondary-500',
    contentSecondaryBgColor: 'bg-secondary-500',
    iconButtonColor: 'bg-secondary-400 hover:bg-secondary500 text-secondary-50',
    iconButtonDisabledColor: 'disabled:bg-secondary-400 disabled:text-secondary-300',
    buttonColor: 'bg-secondary-500 text-secondary-100 hover:bg-secondary-600 hover:text-secondary-100',
    buttonDisabledColor: 'disabled:bg-secondary-200 disabled:text-secondary-400',
    checkboxInputColor: 'bg-secondary-200 checked:bg-secondary-500',
    checkboxLabelColor: 'text-secondary-200 checked:text-secondary-100',
    component: SpeakAnswer,
  },
  {
    id: 'checking',
    title: '틀린 말 탐정단',
    primaryTextColor: 'text-tertiary-p-200',
    primaryBgColor: 'bg-tertiary-p-200',
    primaryLightTextColor: 'text-tertiary-p-100',
    secondaryTextColor: 'text-tertiary-p-600',
    secondaryLightTextColor: 'text-tertiary-p-300',
    contentPointTextColor: 'text-tertiary-p-400',
    contentPrimaryBgColor: 'bg-tertiary-p-100',
    contentPrimaryBorderColor: 'border-tertiary-p-100',
    contentSecondaryTextColor: 'text-tertiary-p-300',
    contentSecondaryBgColor: 'bg-tertiary-p-300',
    iconButtonColor: 'bg-tertiary-p-300 hover:bg-tertiary-p-400 text-tertiary-p-50',
    iconButtonDisabledColor: 'disabled:bg-tertiary-p-300 disabled:text-tertiary-p-200',
    buttonColor: 'bg-tertiary-p-400 text-tertiary-p-50 hover:bg-tertiary-p-500 hover:text-tertiary-p-50',
    buttonDisabledColor: 'disabled:bg-tertiary-p-100 disabled:text-tertiary-p-200',
    checkboxInputColor: 'bg-tertiary-p-100 checked:bg-tertiary-p-500',
    checkboxLabelColor: 'text-tertiary-p-50',
    component: CheckingAnswer,
  },
  {
    id: 'writing',
    title: '빈칸 한 입',
    primaryTextColor: 'text-tertiary-g-300',
    primaryBgColor: 'bg-tertiary-g-300',
    primaryLightTextColor: 'text-tertiary-g-200',
    secondaryTextColor: 'text-tertiary-g-800',
    secondaryLightTextColor: 'text-tertiary-g-500',
    contentPointTextColor: 'text-tertiary-g-600',
    contentPrimaryBgColor: 'bg-tertiary-g-100',
    contentPrimaryBorderColor: 'border-tertiary-g-100',
    contentSecondaryTextColor: 'text-tertiary-g-300',
    contentSecondaryBgColor: 'bg-tertiary-g-300',
    iconButtonColor: 'bg-tertiary-g-400 text-tertiary-g-50 hover:bg-tertiary-g-500',
    iconButtonDisabledColor: 'disabled:bg-tertiary-g-400 disabled:text-tertiary-g-300',
    buttonColor: 'bg-tertiary-g-700 text-tertiary-g-50 hover:bg-tertiary-g-800 hover:text-tertiary-g-50',
    buttonDisabledColor: 'disabled:bg-tertiary-g-500 disabled:text-tertiary-g-200',
    checkboxInputColor: 'bg-tertiary-g-200 checked:bg-tertiary-g-700',
    checkboxLabelColor: 'text-tertiary-g-50',
    component: WritingAnswer,
  },
];

const WrongAnswerPage = () => {
  const [selectedTab, setSelectedTab] = useState<string | null>('speaking');
  const selectedTabData = WRONGANSWER_TAB_DATA.find((tab) => tab.id === selectedTab);

  return (
    <div className='container py-10 max-lg:px-0 max-lg:pb-0 max-md:pt-4'>
      <div className='relative'>
        <div className='flex justify-start items-end -mb-[1px] max-md:pr-5 max-md:-mb-[4px]'>
          {WRONGANSWER_TAB_DATA.map((tab) => (
            <WrongAnswerTab
              key={tab.id}
              tab={tab}
              selectedTab={selectedTab}
              onClick={() => setSelectedTab(tab.id)}
            />
          ))}
        </div>
      </div>

      {selectedTabData && <WrongAnswerComponent tab={selectedTabData} />}
    </div>
  );
};
export default WrongAnswerPage;
