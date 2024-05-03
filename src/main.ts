import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import FreeSurveyFormPlugin from '../packages/free-survey-form';

import '@/assets/main.css';
import 'tdesign-vue-next/es/style/index.css';

const app = createApp(App);

app.use(createPinia());
app.use(FreeSurveyFormPlugin);
app.mount('#app');
