
import React from 'react';
import { ImagePlaceholderData } from '../types';
import CopyButton from './seo/CopyButton';
import { createFullPromptString } from '../utils/promptUtils';

interface ImagePromptsDisplayProps {
    imagePlaceholders: ImagePlaceholderData[] | null;
}

const ImagePromptsDisplay: React.FC<ImagePromptsDisplayProps> = React.memo(({ imagePlaceholders }) => {
  if (!imagePlaceholders || imagePlaceholders.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {imagePlaceholders.map((placeholder, index) => {
        const { description, detailedPrompt } = placeholder;

        if (!detailedPrompt) {
          return (
            <div key={index} id={`image-prompt-${index + 1}`} className="p-4 bg-red-900/20 border border-red-800 rounded-lg scroll-mt-24">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-semibold text-red-300">
                    Failed to generate prompt for Image {index + 1}
                  </h3>
                  <p className="text-sm text-red-400 italic">"{description}"</p>
                </div>
              </div>
              <p className="text-xs text-red-500 mt-2">The API may have returned an invalid response for this item.</p>
            </div>
          );
        }

        return (
          <div key={index} id={`image-prompt-${index + 1}`} className="p-4 bg-gray-800 rounded-lg scroll-mt-24">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="font-semibold text-green-300">
                  Prompt for Image {index + 1}
                </h3>
                <p className="text-sm text-gray-400 italic">"{description}"</p>
              </div>
              <div className="flex-shrink-0">
                <CopyButton textToCopy={createFullPromptString(placeholder)} />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 text-sm">
              <div><strong className="text-brand-subtle font-medium">Subject:</strong><span className="text-gray-400 ml-2">{detailedPrompt.subject}</span></div>
              <div><strong className="text-brand-subtle font-medium">Camera:</strong><span className="text-gray-400 ml-2">{detailedPrompt.cameraBrand} {detailedPrompt.cameraType}</span></div>
              <div><strong className="text-brand-subtle font-medium">Lens:</strong><span className="text-gray-400 ml-2">{detailedPrompt.lens}</span></div>
              <div><strong className="text-brand-subtle font-medium">Atmosphere:</strong><span className="text-gray-400 ml-2">{detailedPrompt.atmosphere}</span></div>
              <div><strong className="text-brand-subtle font-medium">View:</strong><span className="text-gray-400 ml-2">{detailedPrompt.pointOfView}</span></div>
              <div><strong className="text-brand-subtle font-medium">Negative:</strong><span className="text-gray-400 ml-2">{detailedPrompt.negativePrompt}</span></div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default ImagePromptsDisplay;