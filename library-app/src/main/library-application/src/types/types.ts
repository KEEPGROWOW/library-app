interface IBookClassificaton {
  [key: string]: {
    label: string;
  };
}

export const BookClassification: IBookClassificaton = {
  SCIENCE: { label: '과학' },
  COMPUTER: { label: '컴퓨터' },
  SOCIETY: { label: '사회' },
  ECONOMY: { label: '경제' },
  LANGUAGE: { label: '언어' }
};

export const AlignType = 'left' || 'center' || 'right';
