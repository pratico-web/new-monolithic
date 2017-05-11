//// <reference path="./declarations/monaco.d.ts" />

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/**
 * Loads typings into monaco editor
 *
 * - https://github.com/Microsoft/monaco-editor/issues/264
 *
 *
monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES2016,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    typeRoots: ["node_modules/@types"]
});

// extra libraries
monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `export declare function next() : string`,
    'node_modules/@types/external/index.d.ts');

monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false
})

var jsCode = `import * as x from "external"
    const tt : string = x.dnext();`;

monaco.editor.create(document.getElementById("container"), {
    model: monaco.editor.createModel(jsCode,"typescript",new monaco.Uri("file:///main.tsx")),
});
 *
 * @export
 * @class MonacoTypingsLoader
 */
@Injectable()
export class MonacoTypingsLoader {
  typings: any[] = [];
  constructor(private http: Http) {
  }

  loadTypings() {
    ['common', 'platform-browser', 'platform-browser-dynamic',
      'core', 'forms', 'http', 'router',
      'compiler', 'rxjs'
    ].forEach((packageName) => {
      this.http.get(`https://unpkg.com/@pratico/angular4-typings@latest/typings/angular-${packageName}.d.ts`).subscribe((response) => {
        monaco.languages.typescript.typescriptDefaults.addExtraLib(response.text(), `node_modules/@angular/${packageName}/index.ts`);
      });
    });

    // monaco.languages.typescript.typescriptDefaults.addExtraLib(this.angularCore, '@types/angular/core/index.d.ts');
    //monaco.languages.typescript.typescriptDefaults.addExtraLib(this.packageJSON, 'node_modules/@angular/core/package.json');
    //monaco.languages.typescript.typescriptDefaults.addExtraLib(this.angularCoreDts, 'node_modules/@angular/core/core.d.ts');
  }

  get packageJSON() {
    return `
      {
  "name": "@angular/core",
  "version": "4.0.3",
  "description": "Angular - the core framework",
  "main": "./bundles/core.umd.js",
  "module": "./@angular/core.es5.js",
  "es2015": "./@angular/core.js",
  "typings": "./core.d.ts",
  "author": "angular",
  "license": "MIT",
  "peerDependencies": {
    "rxjs": "^5.0.1",
    "zone.js": "^0.8.4"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/angular/angular.git"
  }
}

      `;
  }

  get angularCoreDts() {
    return `export interface Directive {
        selector?: string;
        inputs?: string[];
        outputs?: string[];
        host?: {[key: string]: string};
        providers?: any[];
        exportAs?: string;
        queries?: {[key: string]: any};
    }

    export interface Component extends Directive {
        moduleId?: string;
        template?: string;
        templateUrl?: string;
        styles?: string[];
        styleUrls?: string[];
        changeDetection?: any;
        viewProviders?: any[];
        animations?: any[];
        encapsulation?: any;
        interpolation?: [string, string];
        entryComponents?: any[];
    }

    //Decorators
    export function Directive(settings: Directive) : any;
    export function Component(settings: Component) : any;
    export function Injectable() : any;


    export function enableProdMode(): void;
    export abstract class OnInit {
        ngOnInit(): void;
    }

    export abstract class OnDestroy {
        ngOnDestroy(): void;
    }`;
  }

  get angularCore() {
    return `
declare var module: any;

declare module "@angular/core" {

    export interface Directive {
        selector?: string;
        inputs?: string[];
        outputs?: string[];
        host?: {[key: string]: string};
        providers?: any[];
        exportAs?: string;
        queries?: {[key: string]: any};
    }

    export interface Component extends Directive {
        moduleId?: string;
        template?: string;
        templateUrl?: string;
        styles?: string[];
        styleUrls?: string[];
        changeDetection?: any;
        viewProviders?: any[];
        animations?: any[];
        encapsulation?: any;
        interpolation?: [string, string];
        entryComponents?: any[];
    }

    //Decorators
    export function Directive(settings: Directive) : any;
    export function Component(settings: Component) : any;
    export function Injectable() : any;


    export function enableProdMode(): void;
    export abstract class OnInit {
        ngOnInit(): void;
    }

    export abstract class OnDestroy {
        ngOnDestroy(): void;
    }
}`;
  }


  get angularIndex() {
    return `
    export interface Directive {
        selector?: string;
        inputs?: string[];
        outputs?: string[];
        host?: {[key: string]: string};
        providers?: any[];
        exportAs?: string;
        queries?: {[key: string]: any};
    }

    export interface Component extends Directive {
        moduleId?: string;
        template?: string;
        templateUrl?: string;
        styles?: string[];
        styleUrls?: string[];
        changeDetection?: any;
        viewProviders?: any[];
        animations?: any[];
        encapsulation?: any;
        interpolation?: [string, string];
        entryComponents?: any[];
    }

    //Decorators
    export function Directive(settings: Directive) : any;
    export function Component(settings: Component) : any;
    export function Injectable() : any;


    export function enableProdMode(): void;
    export abstract class OnInit {
        ngOnInit(): void;
    }

    export abstract class OnDestroy {
        ngOnDestroy(): void;
    }`;
  }
}
