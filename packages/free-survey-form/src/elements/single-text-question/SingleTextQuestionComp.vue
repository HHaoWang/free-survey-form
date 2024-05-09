<template>
  <basic-question-element :question="question">
    <t-input v-model="question.answer" :placeholder="question.placeholder" />
  </basic-question-element>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import type { SingleTextQuestion } from 'free-survey-core';
import { Input as TInput } from 'tdesign-vue-next';
import BasicQuestionElement from '../../components/BasicQuestionElement.vue';

const props = defineProps<{
  question: SingleTextQuestion;
}>();
const { question } = toRefs(props);
</script>

<style lang="less" scoped></style>
