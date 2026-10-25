import { createContext, useContext, useState } from 'react';

const TabsContext = createContext(null);

function useTabs() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs parts must be used inside <Tabs>');
  return ctx;
}

export default function Tabs({ defaultValue, children, ...rest }) {
  const [active, setActive] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div {...rest}>{children}</div>
    </TabsContext.Provider>
  );
}

function List({ children }) {
  function handleKeyDown(e) {
    const tabs = [...e.currentTarget.querySelectorAll('[role="tab"]')];
    const index = tabs.indexOf(document.activeElement);
    let next = index;
    if (e.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (e.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = tabs.length - 1;
    if (next !== index) {
      tabs[next].focus();
      tabs[next].click();
    }
  }

  return (
    <div className="tabs-list" role="tablist" onKeyDown={handleKeyDown}>
      {children}
    </div>
  );
}

function Tab({ value, children }) {
  const { active, setActive } = useTabs();
  const selected = active === value;
  return (
    <button
      role="tab"
      id={'tab-' + value}
      aria-selected={selected}
      aria-controls={'panel-' + value}
      tabIndex={selected ? 0 : -1}
      className={selected ? 'tab selected' : 'tab'}
      onClick={() => setActive(value)}
    >
      {children}
    </button>
  );
}

function Panel({ value, children }) {
  const { active } = useTabs();
  if (active !== value) return null;
  return (
    <div className="tab-panel" role="tabpanel" id={'panel-' + value} aria-labelledby={'tab-' + value}>
      {children}
    </div>
  );
}

Tabs.List = List;
Tabs.Tab = Tab;
Tabs.Panel = Panel;
