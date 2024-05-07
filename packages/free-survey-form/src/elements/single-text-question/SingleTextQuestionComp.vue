<template>
  <t-form-item :name="question.id" label-width="600">
    <template #label>
      <div class="question-title">
        <span v-if="question.isRequired" class="required-star">*</span>{{ question.title }}
      </div>
      <div class="description">{{ question.description }}</div>
    </template>
    <t-input v-model="question.answer" :placeholder="question.placeholder" />
  </t-form-item>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import type { SingleTextQuestion } from 'free-survey-core';
import { Input as TInput, FormItem as TFormItem } from 'tdesign-vue-next';

const props = defineProps<{
  question: SingleTextQuestion;
}>();
const { question } = toRefs(props);
</script>

<style lang="less" scoped>
.required-star {
  color: red;
}
.question-title {
  font-size: var(--font-size-medium);
}
.description {
  word-break: break-all;
  text-wrap: pretty;
  font-size: var(--font-size-small);
  line-height: var(--line-height-small);
}
</style>
