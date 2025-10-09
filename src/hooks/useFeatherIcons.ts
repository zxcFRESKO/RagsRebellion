import { useEffect } from 'react';

export const useFeatherIcons = (): void => {
  useEffect(() => {
    const initializeIcons = async (): Promise<void> => {
      if (typeof window !== 'undefined' && !(window as any).feather) {
        try {
          const feather = await import('feather-icons');
          feather.replace();
        } catch (error) {
          console.warn('Feather icons could not be loaded:', error);
        }
      } else if ((window as any).feather) {
        (window as any).feather.replace();
      }
    };

    initializeIcons();

    // Re-run when route changes
    const observer = new MutationObserver(() => {
      if ((window as any).feather) {
        (window as any).feather.replace();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, []);
};