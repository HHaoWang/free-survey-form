<template>
  <basic-question-element :question="question">
    <t-checkbox-group @change="onValueChanged" v-model="selectedItems">
      <t-checkbox key="all" :check-all="true" label="全选" />
      <t-checkbox
        v-for="option in question.choices"
        :key="option.key"
        :label="option.value"
        :value="option.key"
      />
    </t-checkbox-group>
  </basic-question-element>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import {
  Checkbox as TCheckbox,
  CheckboxGroup as TCheckboxGroup,
  type CheckboxGroupProps
} from 'tdesign-vue-next';
import { CheckBoxQuestion } from 'free-survey-core';
import BasicQuestionElement from '../../components/BasicQuestionElement.vue';
const props = defineProps<{
  question: CheckBoxQuestion;
}>();
const { question } = toRefs(props);

const selectedItems = ref(question.value.answer || []);
const onValueChanged: CheckboxGroupProps['onChange'] = (value) => {
  if (!value || value.length === 0) {
    question.value.answer = [];
    return;
  }
  question.value.answer = value as string[];
};
if (question.value.answer) {
  selectedItems.value = question.value.answer;
}
</script>

<style lang="less" scoped></style>
