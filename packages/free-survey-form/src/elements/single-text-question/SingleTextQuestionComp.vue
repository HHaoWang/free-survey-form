<template>
  <div>
    <div><span v-if="question.isRequired" class="required-star">*</span>{{ question.title }}</div>
    <t-input v-model="question.answer" :placeholder="question.placeholder" />
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import type { SingleTextQuestion } from 'free-survey-core';
import { Input as TInput } from 'tdesign-vue-next';

const props = defineProps<{
  question: SingleTextQuestion;
}>();
const { question } = toRefs(props);
</script>

<style lang="less" scoped>
.required-star {
  color: red;
}
</style>
