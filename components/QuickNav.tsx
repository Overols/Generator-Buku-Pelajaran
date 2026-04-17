import React from 'react';

interface NavLink {
  targetId: string;
  label: string;
}

interface QuickNavProps {
  links: NavLink[];
  onJumpTo: (targetId: string) => void;
}

const QuickNav: React.FC<QuickNavProps> = React.memo(({ links, onJumpTo }) => {
  if (!links || links.length === 0) {
    return null;
  }

  return (
    <div className="my-6 p-3 bg-gray-800/50 rounded-lg flex items-center justify-center gap-4 flex-wrap">
      <span className="font-semibold text-sm text-brand-subtle">Jump to:</span>
      <div className="flex items-center gap-4 flex-wrap">
        {links.map((link, index) => (
          <button
            key={index}
            onClick={() => onJumpTo(link.targetId)}
            className="px-3 py-1 text-sm text-blue-300 bg-blue-900/50 rounded-full hover:bg-blue-900/80 transition-colors duration-200"
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
});

export default QuickNav;