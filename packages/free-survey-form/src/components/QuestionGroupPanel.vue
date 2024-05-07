<template>
  <div class="question-group-panel">
    <div class="header">
      <div class="title">{{ questionGroup.title }}</div>
      <div class="description">{{ questionGroup.description }}</div>
    </div>
    <component
      v-for="item in questionGroup.questions"
      :key="item.id"
      :is="ElementProvider.provide((item as AbstractQuestion).questionType)"
      :question="item"
    />
    <div v-if="questionGroup.questions.length === 0" class="empty-tip">
      本题组中没有需要填写的问题！
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { AbstractQuestion, AbstractQuestionGroup } from 'free-survey-core';
import { ElementProvider } from '../ElementProvider';
const props = defineProps<{
  questionGroup: AbstractQuestionGroup;
}>();
const { questionGroup } = toRefs(props);
</script>

<style lang="less" scoped>
.question-group-panel {
  min-height: 64px;
  outline: dashed 1px #d6d6d6;
  padding: var(--space);
  border-radius: var(--border-radius);
  padding-bottom: calc(var(--space) + var(--td-line-height-body-small));

  .header {
    cursor: default;
    margin-bottom: var(--space);

    .title {
      font-size: var(--font-size-small);
    }
    .description {
      font-size: var(--font-size-smaller);
      color: var(--font-color-secondnary);
    }
  }

  .empty-tip {
    cursor: default;
  }
}
</style>
