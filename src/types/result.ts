export type JustEndedGameProps = {
  searchParams: { [key: string]: string | undefined };
};

export type GamesScore = {
  speakingScore: string | null;
  checkingScore: string | null;
  writingScore: string | null;
};

export type GamesArray = {
  type: string;
  score: string | null;
  name: string;
  backgroundColor: string;
  titleColor1: string;
  titleColor2: string;
  lineColor: string;
};

export type MatchedGameArray = {
  type: string;
  score: string | number | null | undefined;
  name: string;
  backgroundColor: string;
  titleColor1: string;
  titleColor2: string;
  lineColor: string;
};

export type TotalScore = {
  user_id: string;
  id: string;
  total: number;
};

export type ResultCardProps = {
  matchedGame: MatchedGameArray | undefined;
  GameScore: string | undefined;
  justEndedGame: string | undefined;
  nickname: string | undefined;
};

export type ModalProps = {
  handleCloseModal: () => void;
};

export type ResultSideProps = {
  GameScore: string | undefined;
  justEndedGame: string | undefined;
};

export type unMatchedGames = {
  type: string;
  score: number;
  name: string;
  backgroundColor: string;
  titleColor1: string;
  titleColor2: string;
  lineColor: string;
};

export type StatusCardProps = {
  unMatchedGames: unMatchedGames[] | undefined;
};
