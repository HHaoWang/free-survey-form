import type { Component } from 'vue';
import type { QuestionType } from 'free-survey-core';

export class ElementProvider {
  private static elementBlockMap: Map<QuestionType, Component> = new Map<QuestionType, Component>();

  public static registerDefaultQuestion(questionType: QuestionType, component: Component) {
    ElementProvider.elementBlockMap.set(questionType, component);
  }

  public static provide(element: QuestionType): null | Component {
    if (!ElementProvider.elementBlockMap.has(element)) {
      return null;
    }
    return ElementProvider.elementBlockMap.get(element) as Component;
  }
}
