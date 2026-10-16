'use client';
import React, { useState } from 'react';
import CheckingAnswer from './_components/CheckingAnswer';
import WritingAnswer from './_components/WritingAnswer';
import SpeakAnswer from './_components/SpeakAnswer';
import WrongAnswerTab from './_components/WrongAnswerTab';
import WrongAnswerComponent from './_components/WrongAnswerComponent';
import { WrongAnswerTabData } from '@/types/wronganswer';
import './style.css';

const WrongAnswer_TAB_DATA: WrongAnswerTabData[] = [
  {
    id: 'speaking',
    title: '나야, 발음왕',
    primaryColor: 'secondary-300',
    primaryLightColor: 'secondary-200',
    secondaryColor: 'secondary-700',
    secondaryLightColor: 'secondary-500',
    contentPointColor: 'secondary-500',
    contentPrimaryColor: 'secondary-200',
    contentSecondaryColor: 'secondary-500',
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
    primaryColor: 'tertiary-p-200',
    primaryLightColor: 'tertiary-p-100',
    secondaryColor: 'tertiary-p-600',
    secondaryLightColor: 'tertiary-p-300',
    contentPointColor: 'tertiary-p-400',
    contentPrimaryColor: 'tertiary-p-100',
    contentSecondaryColor: 'tertiary-p-300',
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
    primaryColor: 'tertiary-g-300',
    primaryLightColor: 'tertiary-g-200',
    secondaryColor: 'tertiary-g-800',
    secondaryLightColor: 'tertiary-g-500',
    contentPointColor: 'tertiary-g-600',
    contentPrimaryColor: 'tertiary-g-100',
    contentSecondaryColor: 'tertiary-g-300',
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
  const selectedTabData = WrongAnswer_TAB_DATA.find((tab) => tab.id === selectedTab);

  return (
    <div className='container py-10 max-lg:px-0 max-lg:pb-0 max-md:pt-4'>
      <div className='relative'>
        <div className='flex justify-start items-end -mb-[1px] max-md:pr-5 max-md:-mb-[4px]'>
          {WrongAnswer_TAB_DATA.map((tab) => (
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
