import type { App, Component, Plugin } from 'vue';
import FreeSurveyForm from './src/index.vue';

const components: { [key: string]: Component } = {
  FreeSurveyForm
};

const FreeSurveyFormPlugin: Plugin<[]> = {
  install(app: App): void {
    Object.keys(components).forEach((item: string) => {
      app.component(item, components[item]);
    });
  }
};

export default FreeSurveyFormPlugin;
