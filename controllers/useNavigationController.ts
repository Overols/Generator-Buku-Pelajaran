
import { useMemo, useCallback } from 'react';
import { FinalizedData } from '../types';
import { NavLink } from '../models/PresentationTypes';

/**
 * NavigationController
 * Responsibility: Calculates Table of Contents logic and handles DOM scrolling.
 */
export const useNavigationController = (data: FinalizedData) => {
    const { sources, seoData, imagePlaceholders, stats } = data;

    // Logic: Determine which sections exist to build the TOC
    const navLinks = useMemo<NavLink[]>(() => {
        const links: NavLink[] = [];
        if (stats) links.push({ targetId: 'stats-section', label: 'Analysis' });
        if (sources?.length) links.push({ targetId: 'sources-section', label: 'Sources' });
        if (seoData) links.push({ targetId: 'seo-section', label: 'SEO' });
        if (imagePlaceholders?.length) links.push({ targetId: 'image-prompts-section', label: 'Image Prompts' });
        return links;
    }, [sources, seoData, imagePlaceholders, stats]);

    // Logic: DOM Manipulation for smooth scrolling + Highlight effect
    const handleJumpTo = useCallback((targetId: string) => {
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            element.classList.add('highlight-animation');
            setTimeout(() => element.classList.remove('highlight-animation'), 2000);
        }
    }, []);

    return {
        navLinks,
        handleJumpTo
    };
};
