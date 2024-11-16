<template>
  <basic-question-element :question="question">
    <t-select
      @change="onValueChanged"
      v-model="selectedItem"
      placeholder="请选择"
      class="dropdown-question"
    >
      <t-option
        v-for="option in question.choices"
        :key="option.key"
        :label="option.value"
        :value="option.key"
      />

      <template #panelBottomContent v-if="!question.isRequired">
        <t-button theme="primary" variant="text" :block="true" @click="clearAnswer"
          >清除已选</t-button
        >
      </template>
    </t-select>
  </basic-question-element>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import {
  Select as TSelect,
  Option as TOption,
  type SelectProps,
  Button as TButton
} from 'tdesign-vue-next';
import { DropdownQuestion } from 'free-survey-core';
import BasicQuestionElement from '../../components/BasicQuestionElement.vue';
const props = defineProps<{
  question: DropdownQuestion;
}>();
const { question } = toRefs(props);

const selectedItem = ref(question.value.answer || '');
const onValueChanged: SelectProps['onChange'] = (value) => {
  if (!value && value !== '0' && value !== 0) {
    question.value.answer = '';
    return;
  }
  question.value.answer = value + '';
};

const clearAnswer = () => {
  selectedItem.value = '';
  question.value.answer = '';
};
</script>

<style lang="less" scoped>
.dropdown-question{
  width: 260px;
  max-width: 100%;
}
.other {
  display: flex;
  align-items: center;
  gap: var(--space);
}
</style>
