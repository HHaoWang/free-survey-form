<template>
  <div>
    <template v-for="item in page.elements" :key="item.id">
      <component
        v-if="item.type === 'question'"
        :is="ElementProvider.provide((item as AbstractQuestion).questionType)"
        :question="item"
        class="page-element"
      />
      <QuestionGroupPanel
        v-if="item.type === 'questionGroup'"
        :questionGroup="item as AbstractQuestionGroup"
        class="page-element"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import {
  AbstractPage,
  AbstractQuestion,
  type AbstractQuestionGroup,
  type Page
} from 'free-survey-core';
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
