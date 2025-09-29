# DocumentViewer

Проект был сгенерирован при помощи [Angular CLI](https://github.com/angular/angular-cli) версии 20.3.3. В проекте был установлен экспериментальный zoneless-режим (т.к. проект тестовый). Проблем в работе в zoneless-режиме замечено не было, приложение ведёт себя как при стратегии обнаружения изменений OnPush.

В 20-й версии ангуляра принята новая конвенция именований файлов без суффиксов, поэтому в качестве имени корневого компонента было использовано имя 'app.ts'. Считаю это нововведение не очень удобным, но решил для имён компонентов придерживаться этого правила, а прочие файлы создавать по старой схеме.

В качестве ui-фреймворка был использован Angular Material с дефолтными темами и небольшим количество переопределений.

Стили в проекте реализуются через scss. Предполагается использование scss-переменных в рамках гипотетической дизайн-системы для случаев, когда необходимые переменные не объявлены в Angular Material.

В ТЗ не указаны требования относительно браузерной поддержки, возможно в отдельных браузерах будут наблюдаться баги. Но в целом поддержка должна быть неплохой.

Загрузка данных производилась напрямую в компоненте. Добавил индикацию процесса загрузки в виде прогресс-бара, т.к. в ТЗ не было указано, в каком виде её реализовывать. Можно было бы реализовать загрузку через резолверы ангуляра, это позволило бы встроить загрузку данных в общий пайплайн загрузки компонента и централизовано обработать соответствующие события. Но резолверы предоставляют меньше гибкости в отображении индикаторов процесса загрузки. И к тому же данные в резолверах не имеют строгой типизации при передаче в компонент, что ухудшило бы поддерживаемость кода.

Также в ТЗ не было информации об обработке ошибок. Ошибку загрузки вывел в консоль. При необходимости также можно доработать централизованную обработку ошибок, например, через интерцептор.

В качестве конфигурационных данных использовался традиционный environment.ts. Best practice рекомендуют регистрировать отдельный сервис для работы с конфигурацией. Счёл эту практику излишней для данной проекта.

Для вывода данных в шаблоне предполагается использовать сигналы, async-pipes следует избегать для поддержания единообразия.

Масштабирование документа реализовал реализовал через css transorm: scale. Скролл использовал нативный со стороны браузера. Постарался сделать масштабирование максимально плавным, насколько было возможно в рамках нативного скролла. Наблюдается проблема при крайних случаях, когда нужно скроллиться за пределы отрисованной на данный момент области. Решением этой проблемы вероятно может быть реализация кастомного скролла, к чему бы прибегать не хотелось.

Масштаб можно было бы записывать дополнительно в url параметрами либо в localStorage для последующего воспроизведения. Не стал реализовывать.

Перетаскивание аннотаций реализовано в виде отдельной директивы. Внутри реализована динамическая подписка на событие 'mousemove', что должно положительно сказываться на производительности.

Ниже приведены инструкции по запуску, сгенерированные через Angular Cli.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
