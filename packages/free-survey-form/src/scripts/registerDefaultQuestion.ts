import { ElementProvider } from '../ElementProvider';
import RadioGroupQuestionComp from '../elements/radio-group-question/RadioGroupQuestionComp.vue';
import SingleTextQuestionComp from '../elements/single-text-question/SingleTextQuestionComp.vue';
import DropdownQuestionComp from '../elements/dropdown-question/DropdownQuestionComp.vue';
import CheckBoxQuestionComp from '../elements/check-box-question/CheckBoxQuestionComp.vue';
import SplitterComp from '../elements/splitter/SplitterComp.vue';

export function registerDefaultQuestion() {
  ElementProvider.registerDefaultQuestion('singleText', SingleTextQuestionComp);
  ElementProvider.registerDefaultQuestion('radioGroup', RadioGroupQuestionComp);
  ElementProvider.registerDefaultQuestion('dropdown', DropdownQuestionComp);
  ElementProvider.registerDefaultQuestion('checkbox', CheckBoxQuestionComp);

  ElementProvider.registerDefaultQuestion('splitter', SplitterComp);
}
