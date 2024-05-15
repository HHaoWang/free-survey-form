<template>
  <basic-question-element :question="props.question">
    <div>不支持的问题！问题类型：{{ props.question.questionType }}</div>
  </basic-question-element>
</template>

<script lang="ts" setup>
import type { AbstractQuestion } from 'free-survey-core';
import BasicQuestionElement from '../../components/BasicQuestionElement.vue';
const props = defineProps<{
  question: AbstractQuestion;
}>();
</script>

<style lang="less" scoped></style>
