// This file acts as a re-exporter to resolve a module resolution conflict.
// It ensures that any import pointing to this location correctly receives
// the component from its actual location in the /seo/ subdirectory.
import SeoDisplay from './seo/SeoDisplay';

export default SeoDisplay;
