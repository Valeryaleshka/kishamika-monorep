import {
  APP_ID,
  ApplicationRef,
  Injectable,
  createComponent,
  setClassMetadata,
} from './chunk-NDW6FAMK.js';
import { EnvironmentInjector, Injector, inject, ɵɵdefineInjectable } from './chunk-USC2B2WM.js';

// ../../node_modules/@angular/cdk/fesm2022/keycodes2.mjs
var BACKSPACE = 8;
var SHIFT = 16;
var CONTROL = 17;
var ALT = 18;
var ESCAPE = 27;
var LEFT_ARROW = 37;
var RIGHT_ARROW = 39;
var ZERO = 48;
var NINE = 57;
var A = 65;
var Z = 90;
var META = 91;
var MAC_META = 224;

// ../../node_modules/@angular/cdk/fesm2022/keycodes.mjs
function hasModifierKey(event, ...modifiers) {
  if (modifiers.length) {
    return modifiers.some((modifier) => event[modifier]);
  }
  return event.altKey || event.shiftKey || event.ctrlKey || event.metaKey;
}

// ../../node_modules/@angular/cdk/fesm2022/style-loader.mjs
var appsWithLoaders = /* @__PURE__ */ new WeakMap();
var _CdkPrivateStyleLoader = class __CdkPrivateStyleLoader {
  _appRef;
  _injector = inject(Injector);
  _environmentInjector = inject(EnvironmentInjector);
  /**
   * Loads a set of styles.
   * @param loader Component which will be instantiated to load the styles.
   */
  load(loader) {
    const appRef = (this._appRef = this._appRef || this._injector.get(ApplicationRef));
    let data = appsWithLoaders.get(appRef);
    if (!data) {
      data = {
        loaders: /* @__PURE__ */ new Set(),
        refs: [],
      };
      appsWithLoaders.set(appRef, data);
      appRef.onDestroy(() => {
        appsWithLoaders.get(appRef)?.refs.forEach((ref) => ref.destroy());
        appsWithLoaders.delete(appRef);
      });
    }
    if (!data.loaders.has(loader)) {
      data.loaders.add(loader);
      data.refs.push(
        createComponent(loader, {
          environmentInjector: this._environmentInjector,
        }),
      );
    }
  }
  static ɵfac = function _CdkPrivateStyleLoader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || __CdkPrivateStyleLoader)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: __CdkPrivateStyleLoader,
    factory: __CdkPrivateStyleLoader.ɵfac,
    providedIn: 'root',
  });
};
(() => {
  (typeof ngDevMode === 'undefined' || ngDevMode) &&
    setClassMetadata(
      _CdkPrivateStyleLoader,
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
      null,
      null,
    );
})();

// ../../node_modules/@angular/cdk/fesm2022/id-generator.mjs
var counters = {};
var _IdGenerator = class __IdGenerator {
  _appId = inject(APP_ID);
  /**
   * Generates a unique ID with a specific prefix.
   * @param prefix Prefix to add to the ID.
   */
  getId(prefix) {
    if (this._appId !== 'ng') {
      prefix += this._appId;
    }
    if (!counters.hasOwnProperty(prefix)) {
      counters[prefix] = 0;
    }
    return `${prefix}${counters[prefix]++}`;
  }
  static ɵfac = function _IdGenerator_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || __IdGenerator)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: __IdGenerator,
    factory: __IdGenerator.ɵfac,
    providedIn: 'root',
  });
};
(() => {
  (typeof ngDevMode === 'undefined' || ngDevMode) &&
    setClassMetadata(
      _IdGenerator,
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
      null,
      null,
    );
})();

export {
  _CdkPrivateStyleLoader,
  _IdGenerator,
  BACKSPACE,
  SHIFT,
  CONTROL,
  ALT,
  ESCAPE,
  LEFT_ARROW,
  RIGHT_ARROW,
  ZERO,
  NINE,
  A,
  Z,
  META,
  MAC_META,
  hasModifierKey,
};
//# sourceMappingURL=chunk-MWSVZF2D.js.map
