<template>
  <div class="free-survey-form">
    <div class="header">
      <div class="title">{{ survey.title }}</div>
      <div class="description">{{ survey.description }}</div>
    </div>
    <div class="content">
      <t-form v-if="currentPageObj" label-align="top" ref="pageForm">
        <page-panel :page="currentPageObj" />
      </t-form>
      <div v-if="!currentPageObj">当前页没有内容需要填写！</div>
    </div>
    <div class="footer">
      <div class="page-indicator">{{ (currentPage ?? -1) + 1 }} / {{ totalPages }}</div>
      <div class="page-navigator">
        <t-button
          class="prev-btn"
          theme="default"
          size="large"
          :disabled="!hasPrevPage"
          v-show="hasPrevPage"
          @click="onMoveToPrevPage"
        >
          <template #icon>
            <ChevronLeftIcon />
          </template>
        </t-button>
        <t-button
          class="next-btn"
          :disabled="!hasNextPage"
          size="large"
          @click="onMoveToNextPage"
          v-show="hasNextPage"
        >
          <div class="btn-content">
            <span>下一页</span>
            <ChevronRightIcon />
          </div>
        </t-button>
        <t-button
          class="next-btn"
          :disabled="hasNextPage"
          size="large"
          v-show="!hasNextPage"
          @click="onSubmit"
        >
          <div class="btn-content">提交</div>
        </t-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, toRefs } from 'vue';
import { AbstractSurvey, type ValidationError } from 'free-survey-core';
import { usePageIndicator } from './scripts/page-indicator';
import {
  Button as TButton,
  Form as TForm,
  type FormInstanceFunctions,
  MessagePlugin
} from 'tdesign-vue-next';
import { ChevronLeftIcon, ChevronRightIcon } from 'tdesign-icons-vue-next';
import PagePanel from './components/PagePanel.vue';
import type { ChangeEvent } from './types/Common';
import { registerDefaultQuestion } from './scripts/registerDefaultQuestion';

const props = defineProps<{
  survey: AbstractSurvey;
}>();
const { survey } = toRefs(props);
const emits = defineEmits<{
  (e: 'onPageChange', changeEvent: ChangeEvent): void;
  (e: 'onSubmit'): void;
}>();
const pageForm = ref<FormInstanceFunctions>();
const {
  totalPages,
  currentPage,
  hasPrevPage,
  hasNextPage,
  moveToPrevPage,
  moveToNextPage,
  refreshPageIndicator
} = usePageIndicator(survey);

const checkCurrentPageAnswerIsValid = async () => {
  const result = await currentPageObj.value?.answerIsValid();
  if (result === true) {
    return true;
  }
  const messages: { [key: string]: any } = {};
  for (const validationError of result as ValidationError[]) {
    if (!messages[validationError.elementId]) {
      messages[validationError.elementId] = [];
    }
    messages[validationError.elementId].push({
      type: 'error',
      message: validationError.msg
    });
  }
  pageForm.value?.setValidateMessage(messages);
  return false;
};
const onMoveToNextPage = async () => {
  if (await checkCurrentPageAnswerIsValid()) {
    const changeEvent: ChangeEvent = {
      prevPage: currentPage.value,
      currentPage: null
    };
    moveToNextPage();
    changeEvent.currentPage = currentPage.value;
    emits('onPageChange', changeEvent);
  }
};
const onMoveToPrevPage = async () => {
  if (await checkCurrentPageAnswerIsValid()) {
    const changeEvent: ChangeEvent = {
      prevPage: currentPage.value,
      currentPage: null
    };
    moveToPrevPage();
    changeEvent.currentPage = currentPage.value;
    emits('onPageChange', changeEvent);
  }
};
const onSubmit = async () => {
  let result: boolean | ValidationError[] = await checkCurrentPageAnswerIsValid();
  if (!result) {
    return;
  }
  result = await survey.value.answerIsValid();
  if (result !== true) {
    await MessagePlugin.error('问卷填写有误！请检查您的答案！');
  }
  emits('onSubmit');
};

const currentPageObj = computed(() => {
  if (currentPage.value === null) {
    return null;
  }
  return survey.value.pages[currentPage.value];
});

const refresh = () => {
  refreshPageIndicator(survey);
};

defineExpose({
  refresh
});

registerDefaultQuestion();
</script>

<style lang="less" scoped>
.free-survey-form {
  --background-color: #f7f8fa;
  --serial-number-color: #909090;
  --space: 8px;
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --border-radius: 4px;
  --operations-bar-height: 24px;
  --font-family: Helvetica Neue, PingFang SC, Hiragino Sans GB, HeitiSC, Helvetica, Microsoft YaHei,
    WenQuanYi Micro Hei, sans-serif;
  --font-size-small: 14px;
  --font-size-smaller: 12px;
  --font-size-medium: 16px;
  --font-size-large: 20px;
  --font-size-larger: 28px;
  --font-color-secondnary: var(--td-text-color-secondary);
  --theme-primary-color: var(--td-brand-color);
  --line-height-medium: 24px;
  --line-height: var(--line-height-medium);
  --line-height-small: 20px;
  --line-height-smaller: 16px;
  --line-height-large: 28px;
  --line-height-larger: 32px;

  font-family: var(--font-family);
  line-height: 1.5;
  color: #484848;
  letter-spacing: 0;
  background-color: var(--background-color);
  padding: var(--space-2);
  border-radius: var(--border-radius);
  min-width: 600px;
  max-width: 600px;

  .header {
    cursor: default;

    .title {
      font-size: var(--font-size-larger);
      text-align: center;
    }
    .description {
      font-size: var(--font-size-medium);
      color: var(--font-color-secondnary);
    }
  }

  .content {
    min-height: 200px;
    margin: var(--space-2) 0;
  }

  .footer {
    .page-indicator {
      color: var(--font-color-secondnary);
      font-size: var(--font-size-small);
      text-align: center;
      line-height: 2em;
    }

    .page-navigator {
      display: flex;
      justify-content: space-between;
      width: 300px;
      margin: auto;
      gap: var(--space-2);

      .prev-btn {
        flex: 1;
      }

      .next-btn {
        flex: 7;

        .btn-content {
          display: flex;
          align-items: center;
        }
      }
    }
  }

  ::-webkit-scrollbar {
    width: 12px;
    background: var(--background-color);
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 6px;
    border: 2px solid transparent;
    background-clip: content-box;
    background-color: var(--td-scrollbar-color);

    &:hover {
      background-color: var(--td-scrollbar-hover-color);
    }
  }
}
</style>
