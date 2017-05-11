//// <reference path="../declarations/monaco.d.ts" />

import { WindowRef } from '@pratico/ngx-browser';
import { CodeEditorConfig } from './code-editor-config.service';
import { MonacoTypingsLoader } from './monaco-typings-loader.service';


export function monacoInitializerFactory(windowRef: WindowRef, config: CodeEditorConfig, typingsLoader: MonacoTypingsLoader) {
  return function () {
    const monacoInitializer = new MonacoInitializer(windowRef, config, typingsLoader);
    return monacoInitializer.init();
  };
}

export class MonacoInitializer {

  private resolve: Function;
  private reject: Function;

  constructor(private windowRef: WindowRef, private config: CodeEditorConfig, private typingsLoader: MonacoTypingsLoader) {
  }

  init(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;

      const onGotAmdLoader = () => {
        // Load monaco
        this.windowRef.nativeWindow.require.config({ paths: { 'vs': this.config.monacoPath } });
        this.windowRef.nativeWindow.require(['vs/editor/editor.main'], () => {
          this.configureTypescript();
        });
      };

      // Load AMD loader if necessary
      if (!this.windowRef.nativeWindow.require) {
        const loaderScript = document.createElement('script');
        loaderScript.type = 'text/javascript';
        loaderScript.src = 'assets/monaco/vs/loader.js';
        loaderScript.addEventListener('load', onGotAmdLoader);
        document.body.appendChild(loaderScript);
      } else {
        onGotAmdLoader();
      }
    });
  }

  private configureTypescript() {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2016,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      allowSyntheticDefaultImports: true,
      emitDecoratorMetadata: true,
      experimentalDecorators: true,
      typeRoots: [
        'node_modules/@types'
      ]
    });
    this.typingsLoader.loadTypings();
    this.resolve();
  }
}
