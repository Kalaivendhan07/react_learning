import { useMemo, useState } from 'react';
import { LangContext, WORDS } from './langContext';

export default function LangProvider({ children }) {
  const [lang, setLang] = useState('en');

  const value = useMemo(() => ({ lang, setLang, t: WORDS[lang] }), [lang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
