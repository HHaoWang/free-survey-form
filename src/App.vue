<template>
  <div class="panel">
    <free-survey-form class="form" v-model:survey="surveyModel" />
  </div>
</template>

<script setup lang="ts">
import { Page, QuestionGroup, SingleTextQuestion, Survey } from 'free-survey-core';
import { ref } from 'vue';

const survey = new Survey();
const page1 = new Page();
const page2 = new Page();
const questionGroup1 = new QuestionGroup();
const qg2 = new QuestionGroup();
const singleText1 = new SingleTextQuestion(null, { title: 'st1', isRequired: true });
const st2 = new SingleTextQuestion(null, { title: 'st2' });
qg2.questions.push(singleText1);
page1.elements.push(questionGroup1);
page1.elements.push(qg2);
page2.elements.push(st2);
survey.pages.push(page1);
survey.pages.push(page2);
const surveyModel = ref(survey);
</script>

<style scoped>
.panel {
  display: flex;
  justify-content: center;
  background: cornflowerblue;
  padding: 16px 0;
}
.form {
  min-width: 400px;
}
</style>
