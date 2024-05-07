import type { AbstractSurvey } from 'free-survey-core';
import { computed, ref, type Ref } from 'vue';

export const usePageIndicator = (survey: Ref<AbstractSurvey>) => {
  const _totalPages: Ref<number> = ref(survey.value.pages.length);
  const totalPages = computed(() => _totalPages.value);
  const _currentPage: Ref<number | null> = ref(totalPages.value > 0 ? 0 : null);
  const currentPage = computed({
    get(): null | number {
      return _currentPage.value;
    },
    set(newVal) {
      if (_currentPage.value === newVal || newVal === null || !Number.isSafeInteger(newVal)) {
        return;
      }
      if (newVal < 0 || newVal >= totalPages.value) return;
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
    return currentPage.value < totalPages.value - 1;
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

  const refreshPageIndicator = (survey: Ref<AbstractSurvey>) => {
    _totalPages.value = survey.value.pages.length;
    _currentPage.value = totalPages.value > 0 ? 0 : null;
  };

  return {
    totalPages,
    currentPage,
    hasPrevPage,
    hasNextPage,
    moveToNextPage,
    moveToPrevPage,
    refreshPageIndicator
  };
};
