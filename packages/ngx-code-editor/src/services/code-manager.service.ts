import { Injectable } from '@angular/core';


export const TEMPLATE_SCRIPT = `let a = 1;
let p = new Promise((resolve, reject) => {
  setTimeout(() => resolve(), 3000);
});

import { Directive, Component, Injectable } from '@angular/core';


@Injectable()
export class SomePraticoService {
  doesSomething() {
    console.log('Does something...');
  }
}
@Component({
  selector: 'app-comp',
  template: \`<h1>{{title}}</h1>\`
})
export class MyComponent {
  title = 'My Main Page!';
}

@Directive({
  selector: 'ngxTranslate'
})
export class TranslateDirective {
  constructor() {

  }
}
`;
/**
 * Provides access to source code to be displayed on CodeEditor
 *
 * @export
 * @class PraticoCodeManager
 */
@Injectable()
export class CodeManager {
  getCode(path: string) {
    return TEMPLATE_SCRIPT;
  }
}
