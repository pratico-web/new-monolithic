//// <reference path="../declarations/monaco.d.ts" />
import { Input, Component, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnInit, HostBinding } from '@angular/core';
import { CodeManager } from '../services/code-manager.service';
import { WindowRef } from '@pratico/ngx-browser';
import * as _ from 'lodash';
import { UUIDGenerator } from '@pratico/ngx-browser';

// fp-ngx -> fast and pratico angular
@Component({
  selector: 'pratico-code-editor',
  template: `<div id='editor' #editor class="monaco-editor" style="width:800px;height:600px;" ></div>`
})
export class CodeEditorComponent implements OnInit, AfterViewInit {

  @Input() id: String;

  @ViewChild('editor') editorContent: ElementRef;

  @Input() fileName: string;
  @Input() language = 'typescript';

  @Output() load: EventEmitter<void> = new EventEmitter<void>();
  @Output() save: EventEmitter<void> = new EventEmitter<void>();
  @Output() changed: EventEmitter<string> = new EventEmitter<string>();

  private _defaultWidth = '800px';
  private _width: string = null;

  private _defaultHeight = '600px';
  private _height: string = null;

  private _defaultPosition = 'relative';
  private _position: string = null;

  private _defaultBorder = '1px solid gray';
  private _border: string = null;

  constructor(protected codeManager: CodeManager,
   protected windowRef: WindowRef,
   protected uuidGenerator: UUIDGenerator
   ) {
     this.id = this.uuidGenerator.generate();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initMonaco();
  }

  // Will be called once monaco library is available
  initMonaco() {
    const myDiv: HTMLDivElement = this.editorContent.nativeElement;


    const monacoEditor = monaco.editor.create(myDiv, {
      model: monaco.editor.createModel(this.codeManager.getCode(this.fileName), this.language, monaco.Uri.parse('file:///script.ts'))
    });

    this.windowRef.setCustomData(`monacoEditor-${this.id}`, monacoEditor);

    // this.typingsLoader.loadTypings();

  }


  afterLoad() {
    this.load.emit();
  }

  afterSave() {
    this.save.emit();
  }

  @Input()
  @HostBinding('style.width')
  get width(): string {
    return this.getWidth();
  }

  set width(value: string) {
    this._width = value;
  }

  getWidth(): string {
    if (this._width == null || _.isEmpty(this._width)) {
      return this._defaultWidth;
    } else {
      return this._width;
    }
  }

  @Input()
  @HostBinding('style.height')
  get height(): string {
    return this.getHeight();
  }

  set height(value: string) {
    this._height = value;
  }

  getHeight(): string {
    if (this._height == null || _.isEmpty(this._height)) {
      return this._defaultHeight;
    } else {
      return this._height;
    }
  }


  @Input()
  @HostBinding('style.position')
  get position(): string {
    return this.getPosition();
  }

  set position(value: string) {
    this._position = value;
  }

  getPosition(): string {
    if (this._position == null || _.isEmpty(this._position)) {
      return this._defaultPosition;
    } else {
      return this._position;
    }
  }


  @Input()
  @HostBinding('style.border')
  get border(): string {
    return this.getBorder();
  }

  set border(value: string) {
    this._border = value;
  }

  getBorder(): string {
    if (this._border == null || _.isEmpty(this._border)) {
      return this._defaultBorder;
    } else {
      return this._border;
    }
  }
}


/*
## R
*/
