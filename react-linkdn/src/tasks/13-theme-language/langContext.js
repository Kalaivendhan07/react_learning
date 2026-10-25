import { createContext, useContext } from 'react';

export const LangContext = createContext(null);

export const WORDS = {
  en: { title: 'Sales dashboard', open: 'Open deals', won: 'Won this month', revenue: 'Revenue', theme: 'Theme' },
  ta: { title: 'விற்பனை டாஷ்போர்டு', open: 'திறந்த டீல்கள்', won: 'இந்த மாதம் வென்றவை', revenue: 'வருவாய்', theme: 'தீம்' },
};

export function useLang() {
  const value = useContext(LangContext);
  if (!value) throw new Error('useLang must be used inside LangProvider');
  return value;
}
