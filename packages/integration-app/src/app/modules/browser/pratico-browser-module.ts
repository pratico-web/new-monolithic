import { NgModule, ModuleWithProviders } from '@angular/core';
import { WindowRef } from './services/window-ref.service';
import { UUIDGenerator } from './services/uuid-generator.service';


export const defaultWindow = window;

export function buildWindowProvider() {
  const windowRef = new WindowRef();
  windowRef['_window'] = defaultWindow;
  return windowRef;
}

export const PRATICO_BROWSER_MODULE_PROVIDERS = [
  {
    provide: WindowRef,
    useFactory: buildWindowProvider
  },
  UUIDGenerator
];



@NgModule({
  providers: [
    PRATICO_BROWSER_MODULE_PROVIDERS
  ]
})
export class PraticoBrowserModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PraticoBrowserModule,
      providers: PRATICO_BROWSER_MODULE_PROVIDERS
    };

  }
}
