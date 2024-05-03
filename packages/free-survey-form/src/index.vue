<template>
  <div class="free-survey-form">
    <div class="header">
      <div class="title">{{ survey.title }}</div>
      <div class="description">{{ survey.description }}</div>
    </div>
    <div class="content">
      <page-panel :page="currentPageObj" v-if="currentPageObj !== null" />
      <div v-if="currentPageObj === null">当前页没有内容需要填写！</div>
    </div>
    <div class="footer">
      <div class="page-indicator">{{ (currentPage ?? 0) + 1 }} / {{ totalPages }}</div>
      <div class="page-navigator">
        <t-button
          class="prev-btn"
          theme="default"
          size="large"
          :disabled="!hasPrevPage"
          v-show="hasPrevPage"
          @click="moveToPrevPage"
        >
          <template #icon>
            <ChevronLeftIcon />
          </template>
        </t-button>
        <t-button
          class="next-btn"
          :disabled="!hasNextPage"
          size="large"
          @click="moveToNextPage"
          v-show="!hasPrevPage"
        >
          <div class="btn-content">
            <span>下一页</span>
            <ChevronRightIcon />
          </div>
        </t-button>
        <t-button class="next-btn" :disabled="hasNextPage" size="large" v-show="hasPrevPage">
          <div class="btn-content">提交</div>
        </t-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, toRefs } from 'vue';
import { Survey } from 'free-survey-core';
import { usePageIndicator } from './scripts/page-indicator';
import { Button as TButton } from 'tdesign-vue-next';
import { ChevronLeftIcon, ChevronRightIcon } from 'tdesign-icons-vue-next';
import PagePanel from './components/PagePanel.vue';
const props = withDefaults(
  defineProps<{
    survey?: Survey;
  }>(),
  {
    survey: () => new Survey()
  }
);
const emits = defineEmits(['update:survey']);
const { survey } = toRefs(props);
const { totalPages, currentPage, hasPrevPage, hasNextPage, moveToPrevPage, moveToNextPage } =
  usePageIndicator(survey);
const currentPageObj = computed(() => {
  if (currentPage.value === null) {
    return null;
  }
  return survey.value.pages[currentPage.value];
});
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

  font-family: var(--font-family);
  line-height: 1.5;
  color: #484848;
  letter-spacing: 0;
  background-color: var(--background-color);
  padding: var(--space-2);
  border-radius: var(--border-radius);
  min-width: 600px;

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
