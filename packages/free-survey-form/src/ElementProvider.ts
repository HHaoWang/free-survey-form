import type { Component } from 'vue';
import type { QuestionType } from 'free-survey-core';
import SingleTextQuestion from './elements/single-text-question/SingleTextQuestionComp.vue';

export class ElementProvider {
  private static elementBlockMap: Map<QuestionType, Component> = new Map<QuestionType, Component>();

  static {
    ElementProvider.elementBlockMap.set('singleText', SingleTextQuestion);
  }

  public static provide(element: QuestionType): null | Component {
    if (!ElementProvider.elementBlockMap.has(element)) {
      return null;
    }
    return ElementProvider.elementBlockMap.get(element) as Component;
  }
}
