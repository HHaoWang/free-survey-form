import type { Survey } from 'free-survey-core';
import { computed, ref, type Ref } from 'vue';

export const usePageIndicator = (survey: Ref<Survey>) => {
  const totalPages: number = survey.value.pages.length;
  const _currentPage: Ref<number | null> = ref(totalPages > 0 ? 0 : null);
  const currentPage = computed({
    get(): null | number {
      return _currentPage.value;
    },
    set(newVal) {
      if (_currentPage.value === newVal || newVal === null || !Number.isSafeInteger(newVal)) {
        return;
      }
      if (newVal < 0 || newVal >= totalPages) return;
      _currentPage.value = newVal;
    }
  });
  const hasPrevPage = computed(() => {
    if (currentPage.value === null) {
      return false;
    }
    return currentPage.value > 0;
  });
  const hasNextPage = computed(() => {
    if (currentPage.value === null) {
      return false;
    }
    return currentPage.value < totalPages - 1;
  });

  const moveToNextPage = () => {
    if (hasNextPage.value && currentPage.value !== null) {
      currentPage.value = currentPage.value + 1;
    }
  };

  const moveToPrevPage = () => {
    if (hasPrevPage.value && currentPage.value !== null) {
      currentPage.value = currentPage.value - 1;
    }
  };

  return { totalPages, currentPage, hasPrevPage, hasNextPage, moveToNextPage, moveToPrevPage };
};
