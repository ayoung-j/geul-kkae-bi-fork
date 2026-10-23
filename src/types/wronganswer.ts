import { ComponentType } from 'react';

export type AnswerData = {
  answer: string;
  created_at: string;
  score: number;
  question: string;
  meaning: string;
  user_answer: string | null;
  correct: string[];
  consonant: string;
};

export type WrongAnswerTabData = {
  id: string;
  title: string;
  primaryTextColor: string;
  primaryBgColor: string;
  primaryLightTextColor: string;
  secondaryTextColor: string;
  secondaryLightTextColor: string;
  contentPointTextColor: string;
  contentPrimaryBgColor: string;
  contentPrimaryBorderColor: string;
  contentSecondaryTextColor: string;
  contentSecondaryBgColor: string;
  iconButtonColor: string;
  iconButtonDisabledColor: string;
  buttonColor: string;
  buttonDisabledColor: string;
  checkboxInputColor: string;
  checkboxLabelColor: string;
  component: ComponentType<{ tab: WrongAnswerTabData }>;
};

export type WrongAnswerTabProps = {
  tab: WrongAnswerTabData;
  selectedTab: string | null;
  onClick: () => void;
};

export type WrongAnswerComponentProps = {
  tab: WrongAnswerTabData;
};

export type WrongAnswerPrevNextProps = {
  tab: WrongAnswerTabData;
  currentPage: number;
  totalItems: number | undefined;
  itemsPerPage: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
};
