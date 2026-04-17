import React from 'react';

interface ImagePlaceholderButtonProps {
  index: number;
  onClick: () => void;
}

const ImagePlaceholderButton: React.FC<ImagePlaceholderButtonProps> = React.memo(({ index, onClick }) => {
  return (
    <>
      {' '}
      <button
        onClick={onClick}
        className="inline-flex items-center align-middle bg-blue-900/60 text-blue-300 text-sm font-semibold px-3 py-0.5 rounded-full border border-blue-700 hover:bg-blue-800/70 transition-all mx-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
        </svg>
        Image #{index}
      </button>
      {' '}
    </>
  );
});

export default ImagePlaceholderButton;