import {
  Directive,
  ElementRef,
  EventEmitter,
  Injectable,
  Input,
  NgModule,
  Output,
  TemplateRef,
  isDevMode,
  setClassMetadata,
  ɵɵProvidersFeature,
  ɵɵattribute,
  ɵɵdefineDirective,
  ɵɵdefineNgModule,
} from './chunk-NDW6FAMK.js';
import {
  DOCUMENT,
  InjectionToken,
  inject,
  signal,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
} from './chunk-USC2B2WM.js';
import { fromEvent, isObservable } from './chunk-HUZPAJME.js';
import { EMPTY, Observable, of } from './chunk-PVVX4OOT.js';

// ../../node_modules/@angular/cdk/fesm2022/directionality.mjs
var DIR_DOCUMENT = new InjectionToken('cdk-dir-doc', {
  providedIn: 'root',
  factory: DIR_DOCUMENT_FACTORY,
});
function DIR_DOCUMENT_FACTORY() {
  return inject(DOCUMENT);
}
var RTL_LOCALE_PATTERN =
  /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
function _resolveDirectionality(rawValue) {
  const value = rawValue?.toLowerCase() || '';
  if (value === 'auto' && typeof navigator !== 'undefined' && navigator?.language) {
    return RTL_LOCALE_PATTERN.test(navigator.language) ? 'rtl' : 'ltr';
  }
  return value === 'rtl' ? 'rtl' : 'ltr';
}
var Directionality = class _Directionality {
  /** The current 'ltr' or 'rtl' value. */
  get value() {
    return this.valueSignal();
  }
  /**
   * The current 'ltr' or 'rtl' value.
   */
  valueSignal = signal(
    'ltr',
    ...(ngDevMode
      ? [
          {
            debugName: 'valueSignal',
          },
        ]
      : []),
  );
  /** Stream that emits whenever the 'ltr' / 'rtl' state changes. */
  change = new EventEmitter();
  constructor() {
    const _document = inject(DIR_DOCUMENT, {
      optional: true,
    });
    if (_document) {
      const bodyDir = _document.body ? _document.body.dir : null;
      const htmlDir = _document.documentElement ? _document.documentElement.dir : null;
      this.valueSignal.set(_resolveDirectionality(bodyDir || htmlDir || 'ltr'));
    }
  }
  ngOnDestroy() {
    this.change.complete();
  }
  static ɵfac = function Directionality_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Directionality)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _Directionality,
    factory: _Directionality.ɵfac,
    providedIn: 'root',
  });
};
(() => {
  (typeof ngDevMode === 'undefined' || ngDevMode) &&
    setClassMetadata(
      Directionality,
      [
        {
          type: Injectable,
          args: [
            {
              providedIn: 'root',
            },
          ],
        },
      ],
      () => [],
      null,
    );
})();

// ../../node_modules/@angular/cdk/fesm2022/bidi.mjs
var Dir = class _Dir {
  /** Whether the `value` has been set to its initial value. */
  _isInitialized = false;
  /** Direction as passed in by the consumer. */
  _rawDir;
  /** Event emitted when the direction changes. */
  change = new EventEmitter();
  /** @docs-private */
  get dir() {
    return this.valueSignal();
  }
  set dir(value) {
    const previousValue = this.valueSignal();
    this.valueSignal.set(_resolveDirectionality(value));
    this._rawDir = value;
    if (previousValue !== this.valueSignal() && this._isInitialized) {
      this.change.emit(this.valueSignal());
    }
  }
  /** Current layout direction of the element. */
  get value() {
    return this.dir;
  }
  valueSignal = signal(
    'ltr',
    ...(ngDevMode
      ? [
          {
            debugName: 'valueSignal',
          },
        ]
      : []),
  );
  /** Initialize once default value has been set. */
  ngAfterContentInit() {
    this._isInitialized = true;
  }
  ngOnDestroy() {
    this.change.complete();
  }
  static ɵfac = function Dir_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Dir)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _Dir,
    selectors: [['', 'dir', '']],
    hostVars: 1,
    hostBindings: function Dir_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵattribute('dir', ctx._rawDir);
      }
    },
    inputs: {
      dir: 'dir',
    },
    outputs: {
      change: 'dirChange',
    },
    exportAs: ['dir'],
    features: [
      ɵɵProvidersFeature([
        {
          provide: Directionality,
          useExisting: _Dir,
        },
      ]),
    ],
  });
};
(() => {
  (typeof ngDevMode === 'undefined' || ngDevMode) &&
    setClassMetadata(
      Dir,
      [
        {
          type: Directive,
          args: [
            {
              selector: '[dir]',
              providers: [
                {
                  provide: Directionality,
                  useExisting: Dir,
                },
              ],
              host: {
                '[attr.dir]': '_rawDir',
              },
              exportAs: 'dir',
            },
          ],
        },
      ],
      null,
      {
        change: [
          {
            type: Output,
            args: ['dirChange'],
          },
        ],
        dir: [
          {
            type: Input,
          },
        ],
      },
    );
})();
var BidiModule = class _BidiModule {
  static ɵfac = function BidiModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BidiModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _BidiModule,
    imports: [Dir],
    exports: [Dir],
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === 'undefined' || ngDevMode) &&
    setClassMetadata(
      BidiModule,
      [
        {
          type: NgModule,
          args: [
            {
              imports: [Dir],
              exports: [Dir],
            },
          ],
        },
      ],
      null,
      null,
    );
})();

// ../../node_modules/@angular/cdk/fesm2022/element.mjs
function coerceNumberProperty(value, fallbackValue = 0) {
  if (_isNumberValue(value)) {
    return Number(value);
  }
  return arguments.length === 2 ? fallbackValue : 0;
}
function _isNumberValue(value) {
  return !isNaN(parseFloat(value)) && !isNaN(Number(value));
}
function coerceElement(elementOrRef) {
  return elementOrRef instanceof ElementRef ? elementOrRef.nativeElement : elementOrRef;
}

// ../../node_modules/@angular/cdk/fesm2022/array.mjs
function coerceArray(value) {
  return Array.isArray(value) ? value : [value];
}

// ../../node_modules/@angular/cdk/fesm2022/css-pixel-value.mjs
function coerceCssPixelValue(value) {
  if (value == null) {
    return '';
  }
  return typeof value === 'string' ? value : `${value}px`;
}

// ../../node_modules/@angular/cdk/fesm2022/coercion.mjs
function coerceBooleanProperty(value) {
  return value != null && `${value}` !== 'false';
}

// ../../node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-core-environments.mjs
var environment = {
  isTestMode: false,
};

// ../../node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-core-logger.mjs
var record = {};
var PREFIX = '[NG-ZORRO]:';
function notRecorded(...args) {
  const asRecord = args.reduce((acc, c) => acc + c.toString(), '');
  if (record[asRecord]) {
    return false;
  } else {
    record[asRecord] = true;
    return true;
  }
}
function consoleCommonBehavior(consoleFunc, ...args) {
  if (environment.isTestMode || (isDevMode() && notRecorded(...args))) {
    consoleFunc(...args);
  }
}
var warn = (...args) => consoleCommonBehavior((...arg) => console.warn(PREFIX, ...arg), ...args);

// ../../node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-core-util.mjs
function isNotNil(value) {
  return typeof value !== 'undefined' && value !== null;
}
function isTemplateRef(value) {
  return value instanceof TemplateRef;
}
function toBoolean(value) {
  return coerceBooleanProperty(value);
}
function toCssPixel(value) {
  return coerceCssPixelValue(value);
}
function isTouchEvent(event) {
  return event.type.startsWith('touch');
}
function getEventPosition(event) {
  return isTouchEvent(event) ? event.touches[0] || event.changedTouches[0] : event;
}
function isPromise(obj) {
  return !!obj && typeof obj.then === 'function' && typeof obj.catch === 'function';
}
var isBrowser = typeof window !== 'undefined';
var isFirefox = isBrowser && window.mozInnerScreenX != null;
function wrapIntoObservable(value) {
  if (isObservable(value)) {
    return value;
  }
  if (isPromise(value)) {
    return new Observable((subscriber) => {
      Promise.resolve(value)
        .then((result) => {
          subscriber.next(result);
          subscriber.complete();
        })
        .catch((error) => subscriber.error(error));
    });
  }
  return of(value);
}
function canUseDom() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}
var MARK_KEY = `rc-util-key`;
function getMark({ mark } = {}) {
  if (mark) {
    return mark.startsWith('data-') ? mark : `data-${mark}`;
  }
  return MARK_KEY;
}
function getContainer(option) {
  if (option.attachTo) {
    return option.attachTo;
  }
  const head = document.querySelector('head');
  return head || document.body;
}
function injectCSS(css, options = {}) {
  if (!canUseDom()) {
    return null;
  }
  const styleNode = document.createElement('style');
  if (options.cspNonce) {
    styleNode.nonce = options.cspNonce;
  }
  styleNode.innerHTML = css;
  const container = getContainer(options);
  const { firstChild } = container;
  if (options.prepend && container.prepend) {
    container.prepend(styleNode);
  } else if (options.prepend && firstChild) {
    container.insertBefore(styleNode, firstChild);
  } else {
    container.appendChild(styleNode);
  }
  return styleNode;
}
var containerCache = /* @__PURE__ */ new Map();
function findExistNode(key, option = {}) {
  const container = getContainer(option);
  return Array.from(containerCache.get(container)?.children || []).find(
    (node) => node.tagName === 'STYLE' && node.getAttribute(getMark(option)) === key,
  );
}
function updateCSS(css, key, options = {}) {
  const container = getContainer(options);
  if (!containerCache.has(container)) {
    const placeholderStyle = injectCSS('', options);
    const { parentNode } = placeholderStyle;
    containerCache.set(container, parentNode);
    parentNode.removeChild(placeholderStyle);
  }
  const existNode = findExistNode(key, options);
  if (existNode) {
    if (options.cspNonce && existNode.nonce !== options.cspNonce) {
      existNode.nonce = options.cspNonce;
    }
    if (existNode.innerHTML !== css) {
      existNode.innerHTML = css;
    }
    return existNode;
  }
  const newNode = injectCSS(css, options);
  newNode?.setAttribute(getMark(options), key);
  return newNode;
}
function getStatusClassNames(prefixCls, status, hasFeedback) {
  return {
    [`${prefixCls}-status-success`]: status === 'success',
    [`${prefixCls}-status-warning`]: status === 'warning',
    [`${prefixCls}-status-error`]: status === 'error',
    [`${prefixCls}-status-validating`]: status === 'validating',
    [`${prefixCls}-has-feedback`]: hasFeedback,
  };
}
function runOutsideAngular(fn) {
  return typeof Zone !== 'undefined' ? Zone.root.run(fn) : fn();
}
function fromEventOutsideAngular(target, name, options) {
  if (!target) {
    return EMPTY;
  }
  return new Observable((subscriber) => {
    return runOutsideAngular(() =>
      // Casting because the inferred overload is incorrect :(
      fromEvent(target, name, options).subscribe(subscriber),
    );
  });
}

export {
  Directionality,
  BidiModule,
  environment,
  warn,
  coerceNumberProperty,
  coerceElement,
  coerceArray,
  coerceCssPixelValue,
  isNotNil,
  isTemplateRef,
  toBoolean,
  toCssPixel,
  isTouchEvent,
  getEventPosition,
  wrapIntoObservable,
  canUseDom,
  updateCSS,
  getStatusClassNames,
  fromEventOutsideAngular,
};
//# sourceMappingURL=chunk-U7XIMOED.js.map
