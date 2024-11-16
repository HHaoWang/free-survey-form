<template>
  <t-form-item :name="question.id" label-width="600">
    <template #label>
      <div class="question-title">
        <div class="idx">
          <span
            :style="{
              visibility: question.isRequired ? 'visible' : 'hidden'
            }"
            class="required-star"
            >*</span
          >{{ Number.isInteger(props.index) ? props.index! + 1 : '' }}.
        </div>
        <div class="text">{{ question.title }}</div>
      </div>
      <div class="description" v-if="question.description">{{ question.description }}</div>
    </template>
    <slot />
  </t-form-item>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import type { AbstractQuestion } from 'free-survey-core';
import { FormItem as TFormItem } from 'tdesign-vue-next';
const props = defineProps<{
  question: AbstractQuestion;
  index?: number;
}>();
const { question } = toRefs(props);
</script>

<style lang="less" scoped>
.required-star {
  color: red;
  width: 8px;
}
.question-title {
  font-size: var(--font-size-medium);
  display: flex;
  margin-left: -8px;

  .idx {
    margin-right: 4px;
  }

  .text {
    flex-grow: 1;
  }
}
.description {
  word-break: break-all;
  text-wrap: pretty;
  font-size: var(--font-size-small);
  line-height: var(--line-height-small);
  margin-bottom: var(--space-1);
}
</style>
