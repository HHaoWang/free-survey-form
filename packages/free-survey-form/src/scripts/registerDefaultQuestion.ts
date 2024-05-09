import { ElementProvider } from '../ElementProvider';
import RadioGroupQuestionComp from '../elements/radio-group-question/RadioGroupQuestionComp.vue';
import SingleTextQuestionComp from '../elements/single-text-question/SingleTextQuestionComp.vue';

export function registerDefaultQuestion() {
  ElementProvider.registerDefaultQuestion('singleText', SingleTextQuestionComp);
  ElementProvider.registerDefaultQuestion('radioGroup', RadioGroupQuestionComp);
}
