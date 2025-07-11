import { useCallback } from 'react';

export const useSectionTypeManagement = (setSectionTypes) => {
  const handleSectionTypeChange = useCallback((idx, type) => {
    if (typeof setSectionTypes === 'function') {
      setSectionTypes(prev => {
        const newTypes = [...prev];
        newTypes[idx] = type;
        return newTypes;
      });
    }
  }, [setSectionTypes]);

  return { handleSectionTypeChange };
};