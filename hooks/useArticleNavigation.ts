
import { useMemo, useCallback } from 'react';
import { FinalizedData } from '../types';

export interface NavLink {
    targetId: string;
    label: string;
}

/**
 * Controller: Article Navigation
 * Responsibility: specific logic for calculating TOC and handling DOM scrolling.
 */
export const useArticleNavigation = (data: FinalizedData) => {
    const { sources, seoData, imagePlaceholders, stats } = data;

    // Logic: Determine which sections are available for navigation
    const navLinks = useMemo<NavLink[]>(() => {
        const links: NavLink[] = [];
        if (stats) links.push({ targetId: 'stats-section', label: 'Analysis' });
        if (sources?.length) links.push({ targetId: 'sources-section', label: 'Sources' });
        if (seoData) links.push({ targetId: 'seo-section', label: 'SEO' });
        if (imagePlaceholders?.length) links.push({ targetId: 'image-prompts-section', label: 'Image Prompts' });
        return links;
    }, [sources, seoData, imagePlaceholders, stats]);

    // Logic: DOM Manipulation for smooth scrolling with highlight effect
    const handleJumpTo = useCallback((targetId: string) => {
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            element.classList.add('highlight-animation');
            // Remove class after animation completes to allow re-triggering
            setTimeout(() => element.classList.remove('highlight-animation'), 2000);
        }
    }, []);

    return {
        navLinks,
        handleJumpTo
    };
};
