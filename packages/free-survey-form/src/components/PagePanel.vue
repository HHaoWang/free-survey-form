<template>
  <template v-for="(item, index) in page.elements" :key="item.id">
    <component
      v-if="item.type === 'question'"
      :is="ElementProvider.provide((item as AbstractQuestion).questionType)"
      :question="item"
      :index="index"
      class="page-element"
    />
    <QuestionGroupPanel
      v-if="item.type === 'questionGroup'"
      :questionGroup="item as AbstractQuestionGroup"
      :index="index"
      class="page-element"
    />
  </template>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { AbstractPage, AbstractQuestion, type AbstractQuestionGroup } from 'free-survey-core';
import { ElementProvider } from '../ElementProvider';
import QuestionGroupPanel from './QuestionGroupPanel.vue';
const props = defineProps<{
  page: AbstractPage;
}>();
const { page } = toRefs(props);
</script>

<style lang="less" scoped>
.page-element + .page-element {
  margin-top: var(--space);
}
</style>
