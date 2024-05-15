# Free Survey Form Builder

Free Survey Form 是一个 Free Survey Core 的问卷填写组件 Vue3 实现，提供简洁美观的问卷回答界面，采用了插件化的设计，能够轻松扩展题型。

![npm](https://img.shields.io/npm/dt/free-survey-form?label=NPM)
![GitHub License](https://img.shields.io/github/license/HHaoWang/free-survey-form) ![GitHub language count](https://img.shields.io/github/languages/top/HHaoWang/free-survey-form)
![npm](https://img.shields.io/npm/v/free-survey-form?label=Version)

## 安装

```shell
npm install free-survey-form
```

## 用法

你可选择全局引入使用或局部引入使用。全局引入后即可在任意模板中使用`free-survey-form`组件。

### 全局引入

main.ts ：

```typescript
import { createApp } from 'vue';
import App from './App.vue';

import FreeSurveyFormPlugin from 'free-survey-form';
import 'free-survey-form/style';

const app = createApp(App);
app.use(FreeSurveyFormPlugin);
app.mount('#app');
```

### 局部引入

App.vue ：

```vue
<template>
  <div class="panel">
    <free-survey-form class="form" :survey="surveyModel" ref="form" />
  </div>
</template>

<script setup lang="ts">
import { Survey } from 'free-survey-core';
import { FreeSurveyForm } from 'free-survey-form';
import { ref } from 'vue';

const surveyModel = ref(new Survey());
const form = ref<InstanceType<typeof FreeSurveyForm>>();
const importJson = () => {
  const json = getSurveyJsonFromSomewhere();
  surveyModel.value.importFromJson(json);
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
.form {
  min-width: 400px;
}
</style>
```

## 支持题型及元素

|         题型         | 是否支持 | 是否规划 |
| :------------------: | :------: | :------: |
|      页面(Page)      |    ✅    |          |
| 题组(QuestionGroup)  |    ✅    |          |
| 单项选择(RadioGroup) |    ✅    |          |
|  多项选择(CheckBox)  |    ✅    |          |
| 文本问答(SingleText) |    ✅    |          |
|  下拉选择(Dropdown)  |    ✅    |          |
|    时间选择(Time)    |    ❌    |    ✅    |
|   分割线(Splitter)   |    ✅    |          |
|      文件(File)      |    ❌    |    ✅    |

## 参与开发

Free Survey Form 基于 Vue3 开发，界面部分采用了 [Tdesign](https://github.com/Tencent/tdesign-vue-next) ，并进行了部分样式修改。代码使用 Prettier 和 TypeScript 进行格式和类型控制。

如果要参与开发，请将代码 fork 一份，并将 fork 的代码库克隆至本地，接着：

安装 npm 包

```sh
npm install
```

调试运行：

```sh
npm run dev
```

类型检查及发布：

```sh
npm run build
```

使用 [Vitest](https://vitest.dev/) 进行测试：

```sh
npm run test:unit
```

代码质量检查（采用 [ESLint](https://eslint.org/) ）：

```sh
npm run lint
```

## 反馈建议

请在 Free Survey Form 的 [Github 仓库](https://github.com/HHaoWang/free-survey-form) 提起 issue 以便进行反馈和建议。如有使用问题也可提出 issue。

## 项目未来规划

Free Survey Form 目前仍处于非常早期的版本，主要专注于基础实现，因此对于一些基础功能以外的建设目前暂不考虑，例如国际化、文档补充、测试等。如果你对这些有兴趣，欢迎你参与建设。

## 交流与沟通

如果你有沟通和交流的意愿，欢迎你发送邮件至 <work@hhao.wang>。

## 开源协议

[Apache 2.0](LICENSE) &copy; HHao
