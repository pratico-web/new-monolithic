import 'declarations/monaco.d.ts';

import { NgModule, ModuleWithProviders, forwardRef, APP_INITIALIZER, InjectionToken } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CodeEditorComponent } from './components/code-editor.component';
import { CodeManager } from './services/code-manager.service';
import { PraticoBrowserModule, WindowRef } from '@pratico/ngx-browser';
import { CodeEditorConfig } from './services/code-editor-config.service';
import { MonacoTypingsLoader } from './services/monaco-typings-loader.service';
import { monacoInitializerFactory } from './services/monaco-initializer.service';

export * from './components/code-editor.component';
export * from './services/code-manager.service';
export * from './services/code-editor-config.service';
export * from './services/monaco-initializer.service';
/**
 * Inspired on:
 * - https://www.npmjs.com/package/ng2-monaco-editor / https://github.com/0plus1/ng2-monaco-editor
 * - https://gist.github.com/chrisber/ef567098216319784c0596c5dac8e3aa
//  */

export const INITIALIZER_TOKEN: InjectionToken<(() => void)[]> = APP_INITIALIZER;

export function forwardRefFunctionForWindowRef() {
  return WindowRef;
}

export function forwardRefFunctionForCodeEditorConfig() {
  return CodeEditorConfig;
}

export function forwardRefFunctionForMonacoTypingsLoader() {
  return MonacoTypingsLoader;
}

export const PRATICO_CODE_EDITOR_PROVIDERS = [
  CodeManager,
  CodeEditorConfig,
  MonacoTypingsLoader,
  {
    provide: INITIALIZER_TOKEN,
    useFactory: monacoInitializerFactory,
    deps: <any[]>[
      forwardRef(forwardRefFunctionForWindowRef),
      forwardRef(forwardRefFunctionForCodeEditorConfig),
      forwardRef(forwardRefFunctionForMonacoTypingsLoader)
    ],
    multi: true
  }
];
@NgModule({
  declarations: [CodeEditorComponent],
  entryComponents: [CodeEditorComponent],
  exports: [CodeEditorComponent],
  imports: [
    HttpModule,
    PraticoBrowserModule
  ]
})
export class PraticoCodeEditorModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PraticoCodeEditorModule,
      providers: PRATICO_CODE_EDITOR_PROVIDERS
    };
  }

}
