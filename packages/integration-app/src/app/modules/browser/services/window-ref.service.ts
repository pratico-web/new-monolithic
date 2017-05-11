import { Injectable, EventEmitter } from '@angular/core';
import { ScrollPosition } from '../models/scroll-position';

@Injectable()
export class WindowRef {

  titleChanged: EventEmitter<string> = new EventEmitter<string>();
  scrollChanged: EventEmitter<ScrollPosition> = new EventEmitter<ScrollPosition>();

  private _window: any;
  constructor() {

  }

  private get window(): Window {
    return this._window;
  }

  get title() {
    return (this.window && this.window.document) ? this.window.document.title : '';
  }

  set title(value: string) {
    if (this.window && this.window.document) {
      this.window.document.title = value;
      this.notifyTitleChanged(value);
    }
  }

  scrollTo(x: number, y: number) {
    this.window.scrollTo(x, y);
  }

  get nativeWindow(): any {
    return this._window;
  }


  protected notifyTitleChanged(value: string) {
    this.titleChanged.emit(value);
  }

  protected notifyScrollChanged(x: number, y: number) {
    this.scrollChanged.emit({
      x: x,
      y: y
    });
  }

  setCustomData(key: string, data: any) {
    if (!this.nativeWindow['pratico-custom-data']) {
      this.nativeWindow['pratico-custom-data'] = {};
    }
    this.nativeWindow['pratico-custom-data'][key] = data;
  }

  getCustomData<T>(key: string): T {
    return this.nativeWindow['pratico-custom-data'] ? this.nativeWindow['pratico-custom-data'][key] : null;
  }

}
