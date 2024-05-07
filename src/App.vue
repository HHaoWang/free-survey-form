<template>
  <div class="panel">
    <free-survey-form class="form" :survey="surveyModel" ref="form" />
  </div>
  <div class="operations">
    <div class="left">
      <div class="buttons">
        <t-button @click="importJson">导入</t-button>
      </div>
      <div class="json">
        <textarea v-model="json" />
      </div>
    </div>
    <div class="right">
      <pre>{{ surveyModel.getAnswerFlattened() }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Page, QuestionGroup, SingleTextQuestion, Survey } from 'free-survey-core';
import { Button as TButton } from 'tdesign-vue-next';
import { ref } from 'vue';
import { FreeSurveyForm } from '../packages';
const survey = new Survey();
const page1 = new Page();
const page2 = new Page();
const questionGroup1 = new QuestionGroup();
const qg2 = new QuestionGroup();
const singleText1 = new SingleTextQuestion(null, { title: 'st1', isRequired: true });
const st2 = new SingleTextQuestion(null, { title: 'st2', placeholder: 'hello' });
qg2.questions.push(singleText1);
page1.elements.push(questionGroup1);
page1.elements.push(qg2);
page2.elements.push(st2);
survey.pages.push(page1);
survey.pages.push(page2);
const surveyModel = ref(survey);

const json = ref('');
const form = ref<InstanceType<typeof FreeSurveyForm>>();
const importJson = () => {
  surveyModel.value.importFromJson(json.value);
  form.value?.refresh();
};
</script>

<style scoped>
.panel {
  display: flex;
  justify-content: center;
  background: cornflowerblue;
  padding: 16px 0;
}
.operations {
  display: flex;
  gap: 16px;

  .left {
    flex: 1;

    .buttons {
      margin: 8px;
    }

    .json textarea {
      width: 100%;
      margin: 8px;
    }
  }

  .right {
    flex: 1;
  }
}
</style>
