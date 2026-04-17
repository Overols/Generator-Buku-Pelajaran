
import { ImagePlaceholderData } from '../types';

/**
 * Creates a formatted, detailed prompt string from structured prompt data.
 * Intelligently switches phraseology based on whether it is a photo or a diagram.
 * @param promptData The structured data for a single image placeholder.
 * @returns A single string ready to be used in an image generation model.
 */
export const createFullPromptString = (promptData: ImagePlaceholderData): string => {
  const { detailedPrompt } = promptData;
  if (!detailedPrompt) return promptData.description;

  const isDigital = /vector|illustration|infographic|digital|chart/i.test(detailedPrompt.cameraBrand + detailedPrompt.cameraType);

  if (isDigital) {
    // Format for Diagrams / Vectors
    return `${detailedPrompt.subject}, ${detailedPrompt.cameraType} style, created with ${detailedPrompt.cameraBrand}, ${detailedPrompt.atmosphere}, ${detailedPrompt.pointOfView} view --no ${detailedPrompt.negativePrompt}`;
  }

  // Format for Photography
  return `${detailedPrompt.subject}, photography, shot on ${detailedPrompt.cameraBrand} ${detailedPrompt.cameraType} with a ${detailedPrompt.lens}, ${detailedPrompt.atmosphere}, ${detailedPrompt.pointOfView} --no ${detailedPrompt.negativePrompt}`;
};
