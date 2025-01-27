import { useState } from 'react';

import { BottomSidebar } from './BottomSidebar';
import { MenuSidebar } from './MenuSidebar';
import { TopSidebar } from './TopSidebar';

export const Sidebar = () => {
  const [isExpand, setIsExpand] = useState(true);

  return (
    <div
      className={`h-screen bg-white shadow-sidebar py-6 flex flex-col items-start gap-20 overflow-y-auto ${
        isExpand ? 'w-[272px]' : 'w-[80px]'
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <TopSidebar isExpand={isExpand} setIsExpand={setIsExpand} />
      <MenuSidebar isExpand={isExpand} />
      <BottomSidebar isExpand={isExpand} />
    </div>
  );
};
