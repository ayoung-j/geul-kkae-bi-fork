export type Word = {
  channel: {
    total: number;
    num: number;
    title: string;
    start: number;
    description: string;
    link: string;
    item: WordItem[];
    lastbuilddate: string;
  };
}
export type WordItem = {
  word: string;
  sense: [
    {
      definition: string;
      link: string;
      sense_no: string;
      target_code: string;
      type: string;
      pos: string;
    },
  ];
}

export type ExtractWordListFromWord = {
  word: string;
  wordClass: string;
  definition: string;
}
