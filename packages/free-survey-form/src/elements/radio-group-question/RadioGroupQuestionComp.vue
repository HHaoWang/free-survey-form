<template>
  <basic-question-element :question="question">
    <t-radio-group @change="onValueChanged" v-model="selectedItem">
      <t-radio
        v-for="option in question.choices"
        :key="option.key"
        :label="option.value"
        :value="option.key"
        :allow-uncheck="true"
      />
      <t-radio v-if="question.allowOther" :allow-uncheck="true" :key="'other'" :value="'other'">
        <div class="other">
          <span>其它</span>
          <t-input
            placeholder="请填写"
            @click="onClickOtherInput"
            @change="onOtherValueChanged"
            v-model="otherValue"
          />
        </div>
      </t-radio>
    </t-radio-group>
  </basic-question-element>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import {
  RadioGroup as TRadioGroup,
  Radio as TRadio,
  type RadioGroupProps,
  Input as TInput,
  type InputProps
} from 'tdesign-vue-next';
import { RadioGroupQuestion } from 'free-survey-core';
import BasicQuestionElement from '../../components/BasicQuestionElement.vue';
const props = defineProps<{
  question: RadioGroupQuestion;
}>();
const { question } = toRefs(props);

const selectedItem = ref('');
const onValueChanged: RadioGroupProps['onChange'] = (value) => {
  if (value === 'other') {
    question.value.answer = 'other:' + otherValue.value + '';
    return;
  }
  if (!value && value !== '0' && value !== 0) {
    question.value.answer = '';
    return;
  }
  question.value.answer = value + '';
};
const otherValue = ref('');
const onClickOtherInput: InputProps['onClick'] = (event) => {
  event.e.stopPropagation();
  selectedItem.value = 'other';
  question.value.answer = 'other:' + otherValue.value + '';
};
const onOtherValueChanged: InputProps['onChange'] = (value) => {
  question.value.answer = 'other:' + value + '';
};
</script>

<style lang="less" scoped>
.other {
  display: flex;
  align-items: center;
  gap: var(--space);
}
</style>
