import { DomSanitizer } from './chunk-C2FPMNIE.js';
import { HttpBackend, HttpClient } from './chunk-U6SD5W2O.js';
import {
  Directive,
  ElementRef,
  Inject,
  Injectable,
  Input,
  Optional,
  Renderer2,
  RendererFactory2,
  SecurityContext,
  isDevMode,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵdefineDirective,
  ɵɵdirectiveInject,
} from './chunk-NDW6FAMK.js';
import {
  DOCUMENT,
  InjectionToken,
  inject,
  makeEnvironmentProviders,
  ɵɵdefineInjectable,
  ɵɵinject,
} from './chunk-USC2B2WM.js';
import {
  Observable,
  Subject,
  catchError,
  filter,
  finalize,
  map,
  of,
  share,
  take,
  tap,
} from './chunk-PVVX4OOT.js';
import { __spreadProps, __spreadValues } from './chunk-VC57AUI7.js';

// ../../node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(o) {
  '@babel/helpers - typeof';
  return (
    (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (o2) {
            return typeof o2;
          }
        : function (o2) {
            return o2 &&
              'function' == typeof Symbol &&
              o2.constructor === Symbol &&
              o2 !== Symbol.prototype
              ? 'symbol'
              : typeof o2;
          }),
    _typeof(o)
  );
}

// ../../node_modules/@babel/runtime/helpers/esm/toPrimitive.js
function toPrimitive(t, r) {
  if ('object' != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || 'default');
    if ('object' != _typeof(i)) return i;
    throw new TypeError('@@toPrimitive must return a primitive value.');
  }
  return ('string' === r ? String : Number)(t);
}

// ../../node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function toPropertyKey(t) {
  var i = toPrimitive(t, 'string');
  return 'symbol' == _typeof(i) ? i : i + '';
}

// ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(e, r, t) {
  return (
    (r = toPropertyKey(r)) in e
      ? Object.defineProperty(e, r, {
          value: t,
          enumerable: true,
          configurable: true,
          writable: true,
        })
      : (e[r] = t),
    e
  );
}

// ../../node_modules/@ant-design/fast-color/es/FastColor.js
var round = Math.round;
function splitColorStr(str, parseNum) {
  const match =
    str
      .replace(/^[^(]*\((.*)/, '$1')
      .replace(/\).*/, '')
      .match(/\d*\.?\d+%?/g) || [];
  const numList = match.map((item) => parseFloat(item));
  for (let i = 0; i < 3; i += 1) {
    numList[i] = parseNum(numList[i] || 0, match[i] || '', i);
  }
  if (match[3]) {
    numList[3] = match[3].includes('%') ? numList[3] / 100 : numList[3];
  } else {
    numList[3] = 1;
  }
  return numList;
}
var parseHSVorHSL = (num, _, index) => (index === 0 ? num : num / 100);
function limitRange(value, max) {
  const mergedMax = max || 255;
  if (value > mergedMax) {
    return mergedMax;
  }
  if (value < 0) {
    return 0;
  }
  return value;
}
var FastColor = class _FastColor {
  constructor(input) {
    _defineProperty(this, 'isValid', true);
    _defineProperty(this, 'r', 0);
    _defineProperty(this, 'g', 0);
    _defineProperty(this, 'b', 0);
    _defineProperty(this, 'a', 1);
    _defineProperty(this, '_h', void 0);
    _defineProperty(this, '_s', void 0);
    _defineProperty(this, '_l', void 0);
    _defineProperty(this, '_v', void 0);
    _defineProperty(this, '_max', void 0);
    _defineProperty(this, '_min', void 0);
    _defineProperty(this, '_brightness', void 0);
    function matchFormat(str) {
      return str[0] in input && str[1] in input && str[2] in input;
    }
    if (!input) {
    } else if (typeof input === 'string') {
      let matchPrefix = function (prefix) {
        return trimStr.startsWith(prefix);
      };
      const trimStr = input.trim();
      if (/^#?[A-F\d]{3,8}$/i.test(trimStr)) {
        this.fromHexString(trimStr);
      } else if (matchPrefix('rgb')) {
        this.fromRgbString(trimStr);
      } else if (matchPrefix('hsl')) {
        this.fromHslString(trimStr);
      } else if (matchPrefix('hsv') || matchPrefix('hsb')) {
        this.fromHsvString(trimStr);
      }
    } else if (input instanceof _FastColor) {
      this.r = input.r;
      this.g = input.g;
      this.b = input.b;
      this.a = input.a;
      this._h = input._h;
      this._s = input._s;
      this._l = input._l;
      this._v = input._v;
    } else if (matchFormat('rgb')) {
      this.r = limitRange(input.r);
      this.g = limitRange(input.g);
      this.b = limitRange(input.b);
      this.a = typeof input.a === 'number' ? limitRange(input.a, 1) : 1;
    } else if (matchFormat('hsl')) {
      this.fromHsl(input);
    } else if (matchFormat('hsv')) {
      this.fromHsv(input);
    } else {
      throw new Error('@ant-design/fast-color: unsupported input ' + JSON.stringify(input));
    }
  }
  // ======================= Setter =======================
  setR(value) {
    return this._sc('r', value);
  }
  setG(value) {
    return this._sc('g', value);
  }
  setB(value) {
    return this._sc('b', value);
  }
  setA(value) {
    return this._sc('a', value, 1);
  }
  setHue(value) {
    const hsv = this.toHsv();
    hsv.h = value;
    return this._c(hsv);
  }
  // ======================= Getter =======================
  /**
   * Returns the perceived luminance of a color, from 0-1.
   * @see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
   */
  getLuminance() {
    function adjustGamma(raw) {
      const val = raw / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    }
    const R = adjustGamma(this.r);
    const G = adjustGamma(this.g);
    const B = adjustGamma(this.b);
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  }
  getHue() {
    if (typeof this._h === 'undefined') {
      const delta = this.getMax() - this.getMin();
      if (delta === 0) {
        this._h = 0;
      } else {
        this._h = round(
          60 *
            (this.r === this.getMax()
              ? (this.g - this.b) / delta + (this.g < this.b ? 6 : 0)
              : this.g === this.getMax()
                ? (this.b - this.r) / delta + 2
                : (this.r - this.g) / delta + 4),
        );
      }
    }
    return this._h;
  }
  getSaturation() {
    if (typeof this._s === 'undefined') {
      const delta = this.getMax() - this.getMin();
      if (delta === 0) {
        this._s = 0;
      } else {
        this._s = delta / this.getMax();
      }
    }
    return this._s;
  }
  getLightness() {
    if (typeof this._l === 'undefined') {
      this._l = (this.getMax() + this.getMin()) / 510;
    }
    return this._l;
  }
  getValue() {
    if (typeof this._v === 'undefined') {
      this._v = this.getMax() / 255;
    }
    return this._v;
  }
  /**
   * Returns the perceived brightness of the color, from 0-255.
   * Note: this is not the b of HSB
   * @see http://www.w3.org/TR/AERT#color-contrast
   */
  getBrightness() {
    if (typeof this._brightness === 'undefined') {
      this._brightness = (this.r * 299 + this.g * 587 + this.b * 114) / 1e3;
    }
    return this._brightness;
  }
  // ======================== Func ========================
  darken(amount = 10) {
    const h = this.getHue();
    const s = this.getSaturation();
    let l = this.getLightness() - amount / 100;
    if (l < 0) {
      l = 0;
    }
    return this._c({
      h,
      s,
      l,
      a: this.a,
    });
  }
  lighten(amount = 10) {
    const h = this.getHue();
    const s = this.getSaturation();
    let l = this.getLightness() + amount / 100;
    if (l > 1) {
      l = 1;
    }
    return this._c({
      h,
      s,
      l,
      a: this.a,
    });
  }
  /**
   * Mix the current color a given amount with another color, from 0 to 100.
   * 0 means no mixing (return current color).
   */
  mix(input, amount = 50) {
    const color = this._c(input);
    const p = amount / 100;
    const calc = (key) => (color[key] - this[key]) * p + this[key];
    const rgba = {
      r: round(calc('r')),
      g: round(calc('g')),
      b: round(calc('b')),
      a: round(calc('a') * 100) / 100,
    };
    return this._c(rgba);
  }
  /**
   * Mix the color with pure white, from 0 to 100.
   * Providing 0 will do nothing, providing 100 will always return white.
   */
  tint(amount = 10) {
    return this.mix(
      {
        r: 255,
        g: 255,
        b: 255,
        a: 1,
      },
      amount,
    );
  }
  /**
   * Mix the color with pure black, from 0 to 100.
   * Providing 0 will do nothing, providing 100 will always return black.
   */
  shade(amount = 10) {
    return this.mix(
      {
        r: 0,
        g: 0,
        b: 0,
        a: 1,
      },
      amount,
    );
  }
  onBackground(background) {
    const bg = this._c(background);
    const alpha = this.a + bg.a * (1 - this.a);
    const calc = (key) => {
      return round((this[key] * this.a + bg[key] * bg.a * (1 - this.a)) / alpha);
    };
    return this._c({
      r: calc('r'),
      g: calc('g'),
      b: calc('b'),
      a: alpha,
    });
  }
  // ======================= Status =======================
  isDark() {
    return this.getBrightness() < 128;
  }
  isLight() {
    return this.getBrightness() >= 128;
  }
  // ======================== MISC ========================
  equals(other) {
    return this.r === other.r && this.g === other.g && this.b === other.b && this.a === other.a;
  }
  clone() {
    return this._c(this);
  }
  // ======================= Format =======================
  toHexString() {
    let hex = '#';
    const rHex = (this.r || 0).toString(16);
    hex += rHex.length === 2 ? rHex : '0' + rHex;
    const gHex = (this.g || 0).toString(16);
    hex += gHex.length === 2 ? gHex : '0' + gHex;
    const bHex = (this.b || 0).toString(16);
    hex += bHex.length === 2 ? bHex : '0' + bHex;
    if (typeof this.a === 'number' && this.a >= 0 && this.a < 1) {
      const aHex = round(this.a * 255).toString(16);
      hex += aHex.length === 2 ? aHex : '0' + aHex;
    }
    return hex;
  }
  /** CSS support color pattern */
  toHsl() {
    return {
      h: this.getHue(),
      s: this.getSaturation(),
      l: this.getLightness(),
      a: this.a,
    };
  }
  /** CSS support color pattern */
  toHslString() {
    const h = this.getHue();
    const s = round(this.getSaturation() * 100);
    const l = round(this.getLightness() * 100);
    return this.a !== 1 ? `hsla(${h},${s}%,${l}%,${this.a})` : `hsl(${h},${s}%,${l}%)`;
  }
  /** Same as toHsb */
  toHsv() {
    return {
      h: this.getHue(),
      s: this.getSaturation(),
      v: this.getValue(),
      a: this.a,
    };
  }
  toRgb() {
    return {
      r: this.r,
      g: this.g,
      b: this.b,
      a: this.a,
    };
  }
  toRgbString() {
    return this.a !== 1
      ? `rgba(${this.r},${this.g},${this.b},${this.a})`
      : `rgb(${this.r},${this.g},${this.b})`;
  }
  toString() {
    return this.toRgbString();
  }
  // ====================== Privates ======================
  /** Return a new FastColor object with one channel changed */
  _sc(rgb, value, max) {
    const clone = this.clone();
    clone[rgb] = limitRange(value, max);
    return clone;
  }
  _c(input) {
    return new this.constructor(input);
  }
  getMax() {
    if (typeof this._max === 'undefined') {
      this._max = Math.max(this.r, this.g, this.b);
    }
    return this._max;
  }
  getMin() {
    if (typeof this._min === 'undefined') {
      this._min = Math.min(this.r, this.g, this.b);
    }
    return this._min;
  }
  fromHexString(trimStr) {
    const withoutPrefix = trimStr.replace('#', '');
    function connectNum(index1, index2) {
      return parseInt(withoutPrefix[index1] + withoutPrefix[index2 || index1], 16);
    }
    if (withoutPrefix.length < 6) {
      this.r = connectNum(0);
      this.g = connectNum(1);
      this.b = connectNum(2);
      this.a = withoutPrefix[3] ? connectNum(3) / 255 : 1;
    } else {
      this.r = connectNum(0, 1);
      this.g = connectNum(2, 3);
      this.b = connectNum(4, 5);
      this.a = withoutPrefix[6] ? connectNum(6, 7) / 255 : 1;
    }
  }
  fromHsl({ h, s, l, a }) {
    this._h = h % 360;
    this._s = s;
    this._l = l;
    this.a = typeof a === 'number' ? a : 1;
    if (s <= 0) {
      const rgb = round(l * 255);
      this.r = rgb;
      this.g = rgb;
      this.b = rgb;
    }
    let r = 0,
      g = 0,
      b = 0;
    const huePrime = h / 60;
    const chroma = (1 - Math.abs(2 * l - 1)) * s;
    const secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1));
    if (huePrime >= 0 && huePrime < 1) {
      r = chroma;
      g = secondComponent;
    } else if (huePrime >= 1 && huePrime < 2) {
      r = secondComponent;
      g = chroma;
    } else if (huePrime >= 2 && huePrime < 3) {
      g = chroma;
      b = secondComponent;
    } else if (huePrime >= 3 && huePrime < 4) {
      g = secondComponent;
      b = chroma;
    } else if (huePrime >= 4 && huePrime < 5) {
      r = secondComponent;
      b = chroma;
    } else if (huePrime >= 5 && huePrime < 6) {
      r = chroma;
      b = secondComponent;
    }
    const lightnessModification = l - chroma / 2;
    this.r = round((r + lightnessModification) * 255);
    this.g = round((g + lightnessModification) * 255);
    this.b = round((b + lightnessModification) * 255);
  }
  fromHsv({ h, s, v, a }) {
    this._h = h % 360;
    this._s = s;
    this._v = v;
    this.a = typeof a === 'number' ? a : 1;
    const vv = round(v * 255);
    this.r = vv;
    this.g = vv;
    this.b = vv;
    if (s <= 0) {
      return;
    }
    const hh = h / 60;
    const i = Math.floor(hh);
    const ff = hh - i;
    const p = round(v * (1 - s) * 255);
    const q = round(v * (1 - s * ff) * 255);
    const t = round(v * (1 - s * (1 - ff)) * 255);
    switch (i) {
      case 0:
        this.g = t;
        this.b = p;
        break;
      case 1:
        this.r = q;
        this.b = p;
        break;
      case 2:
        this.r = p;
        this.b = t;
        break;
      case 3:
        this.r = p;
        this.g = q;
        break;
      case 4:
        this.r = t;
        this.g = p;
        break;
      case 5:
      default:
        this.g = p;
        this.b = q;
        break;
    }
  }
  fromHsvString(trimStr) {
    const cells = splitColorStr(trimStr, parseHSVorHSL);
    this.fromHsv({
      h: cells[0],
      s: cells[1],
      v: cells[2],
      a: cells[3],
    });
  }
  fromHslString(trimStr) {
    const cells = splitColorStr(trimStr, parseHSVorHSL);
    this.fromHsl({
      h: cells[0],
      s: cells[1],
      l: cells[2],
      a: cells[3],
    });
  }
  fromRgbString(trimStr) {
    const cells = splitColorStr(trimStr, (num, txt) =>
      // Convert percentage to number. e.g. 50% -> 128
      txt.includes('%') ? round((num / 100) * 255) : num,
    );
    this.r = cells[0];
    this.g = cells[1];
    this.b = cells[2];
    this.a = cells[3];
  }
};

// ../../node_modules/@ant-design/colors/es/generate.js
var hueStep = 2;
var saturationStep = 0.16;
var saturationStep2 = 0.05;
var brightnessStep1 = 0.05;
var brightnessStep2 = 0.15;
var lightColorCount = 5;
var darkColorCount = 4;
var darkColorMap = [
  {
    index: 7,
    amount: 15,
  },
  {
    index: 6,
    amount: 25,
  },
  {
    index: 5,
    amount: 30,
  },
  {
    index: 5,
    amount: 45,
  },
  {
    index: 5,
    amount: 65,
  },
  {
    index: 5,
    amount: 85,
  },
  {
    index: 4,
    amount: 90,
  },
  {
    index: 3,
    amount: 95,
  },
  {
    index: 2,
    amount: 97,
  },
  {
    index: 1,
    amount: 98,
  },
];
function getHue(hsv, i, light) {
  var hue;
  if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
    hue = light ? Math.round(hsv.h) - hueStep * i : Math.round(hsv.h) + hueStep * i;
  } else {
    hue = light ? Math.round(hsv.h) + hueStep * i : Math.round(hsv.h) - hueStep * i;
  }
  if (hue < 0) {
    hue += 360;
  } else if (hue >= 360) {
    hue -= 360;
  }
  return hue;
}
function getSaturation(hsv, i, light) {
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s;
  }
  var saturation;
  if (light) {
    saturation = hsv.s - saturationStep * i;
  } else if (i === darkColorCount) {
    saturation = hsv.s + saturationStep;
  } else {
    saturation = hsv.s + saturationStep2 * i;
  }
  if (saturation > 1) {
    saturation = 1;
  }
  if (light && i === lightColorCount && saturation > 0.1) {
    saturation = 0.1;
  }
  if (saturation < 0.06) {
    saturation = 0.06;
  }
  return Math.round(saturation * 100) / 100;
}
function getValue(hsv, i, light) {
  var value;
  if (light) {
    value = hsv.v + brightnessStep1 * i;
  } else {
    value = hsv.v - brightnessStep2 * i;
  }
  value = Math.max(0, Math.min(1, value));
  return Math.round(value * 100) / 100;
}
function generate(color) {
  var opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var patterns = [];
  var pColor = new FastColor(color);
  var hsv = pColor.toHsv();
  for (var i = lightColorCount; i > 0; i -= 1) {
    var c = new FastColor({
      h: getHue(hsv, i, true),
      s: getSaturation(hsv, i, true),
      v: getValue(hsv, i, true),
    });
    patterns.push(c);
  }
  patterns.push(pColor);
  for (var _i = 1; _i <= darkColorCount; _i += 1) {
    var _c = new FastColor({
      h: getHue(hsv, _i),
      s: getSaturation(hsv, _i),
      v: getValue(hsv, _i),
    });
    patterns.push(_c);
  }
  if (opts.theme === 'dark') {
    return darkColorMap.map(function (_ref) {
      var index = _ref.index,
        amount = _ref.amount;
      return new FastColor(opts.backgroundColor || '#141414')
        .mix(patterns[index], amount)
        .toHexString();
    });
  }
  return patterns.map(function (c2) {
    return c2.toHexString();
  });
}

// ../../node_modules/@ant-design/colors/es/presets.js
var red = [
  '#fff1f0',
  '#ffccc7',
  '#ffa39e',
  '#ff7875',
  '#ff4d4f',
  '#f5222d',
  '#cf1322',
  '#a8071a',
  '#820014',
  '#5c0011',
];
red.primary = red[5];
var volcano = [
  '#fff2e8',
  '#ffd8bf',
  '#ffbb96',
  '#ff9c6e',
  '#ff7a45',
  '#fa541c',
  '#d4380d',
  '#ad2102',
  '#871400',
  '#610b00',
];
volcano.primary = volcano[5];
var orange = [
  '#fff7e6',
  '#ffe7ba',
  '#ffd591',
  '#ffc069',
  '#ffa940',
  '#fa8c16',
  '#d46b08',
  '#ad4e00',
  '#873800',
  '#612500',
];
orange.primary = orange[5];
var gold = [
  '#fffbe6',
  '#fff1b8',
  '#ffe58f',
  '#ffd666',
  '#ffc53d',
  '#faad14',
  '#d48806',
  '#ad6800',
  '#874d00',
  '#613400',
];
gold.primary = gold[5];
var yellow = [
  '#feffe6',
  '#ffffb8',
  '#fffb8f',
  '#fff566',
  '#ffec3d',
  '#fadb14',
  '#d4b106',
  '#ad8b00',
  '#876800',
  '#614700',
];
yellow.primary = yellow[5];
var lime = [
  '#fcffe6',
  '#f4ffb8',
  '#eaff8f',
  '#d3f261',
  '#bae637',
  '#a0d911',
  '#7cb305',
  '#5b8c00',
  '#3f6600',
  '#254000',
];
lime.primary = lime[5];
var green = [
  '#f6ffed',
  '#d9f7be',
  '#b7eb8f',
  '#95de64',
  '#73d13d',
  '#52c41a',
  '#389e0d',
  '#237804',
  '#135200',
  '#092b00',
];
green.primary = green[5];
var cyan = [
  '#e6fffb',
  '#b5f5ec',
  '#87e8de',
  '#5cdbd3',
  '#36cfc9',
  '#13c2c2',
  '#08979c',
  '#006d75',
  '#00474f',
  '#002329',
];
cyan.primary = cyan[5];
var blue = [
  '#e6f4ff',
  '#bae0ff',
  '#91caff',
  '#69b1ff',
  '#4096ff',
  '#1677ff',
  '#0958d9',
  '#003eb3',
  '#002c8c',
  '#001d66',
];
blue.primary = blue[5];
var geekblue = [
  '#f0f5ff',
  '#d6e4ff',
  '#adc6ff',
  '#85a5ff',
  '#597ef7',
  '#2f54eb',
  '#1d39c4',
  '#10239e',
  '#061178',
  '#030852',
];
geekblue.primary = geekblue[5];
var purple = [
  '#f9f0ff',
  '#efdbff',
  '#d3adf7',
  '#b37feb',
  '#9254de',
  '#722ed1',
  '#531dab',
  '#391085',
  '#22075e',
  '#120338',
];
purple.primary = purple[5];
var magenta = [
  '#fff0f6',
  '#ffd6e7',
  '#ffadd2',
  '#ff85c0',
  '#f759ab',
  '#eb2f96',
  '#c41d7f',
  '#9e1068',
  '#780650',
  '#520339',
];
magenta.primary = magenta[5];
var grey = [
  '#a6a6a6',
  '#999999',
  '#8c8c8c',
  '#808080',
  '#737373',
  '#666666',
  '#404040',
  '#1a1a1a',
  '#000000',
  '#000000',
];
grey.primary = grey[5];
var redDark = [
  '#2a1215',
  '#431418',
  '#58181c',
  '#791a1f',
  '#a61d24',
  '#d32029',
  '#e84749',
  '#f37370',
  '#f89f9a',
  '#fac8c3',
];
redDark.primary = redDark[5];
var volcanoDark = [
  '#2b1611',
  '#441d12',
  '#592716',
  '#7c3118',
  '#aa3e19',
  '#d84a1b',
  '#e87040',
  '#f3956a',
  '#f8b692',
  '#fad4bc',
];
volcanoDark.primary = volcanoDark[5];
var orangeDark = [
  '#2b1d11',
  '#442a11',
  '#593815',
  '#7c4a15',
  '#aa6215',
  '#d87a16',
  '#e89a3c',
  '#f3b765',
  '#f8cf8d',
  '#fae3b7',
];
orangeDark.primary = orangeDark[5];
var goldDark = [
  '#2b2111',
  '#443111',
  '#594214',
  '#7c5914',
  '#aa7714',
  '#d89614',
  '#e8b339',
  '#f3cc62',
  '#f8df8b',
  '#faedb5',
];
goldDark.primary = goldDark[5];
var yellowDark = [
  '#2b2611',
  '#443b11',
  '#595014',
  '#7c6e14',
  '#aa9514',
  '#d8bd14',
  '#e8d639',
  '#f3ea62',
  '#f8f48b',
  '#fafab5',
];
yellowDark.primary = yellowDark[5];
var limeDark = [
  '#1f2611',
  '#2e3c10',
  '#3e4f13',
  '#536d13',
  '#6f9412',
  '#8bbb11',
  '#a9d134',
  '#c9e75d',
  '#e4f88b',
  '#f0fab5',
];
limeDark.primary = limeDark[5];
var greenDark = [
  '#162312',
  '#1d3712',
  '#274916',
  '#306317',
  '#3c8618',
  '#49aa19',
  '#6abe39',
  '#8fd460',
  '#b2e58b',
  '#d5f2bb',
];
greenDark.primary = greenDark[5];
var cyanDark = [
  '#112123',
  '#113536',
  '#144848',
  '#146262',
  '#138585',
  '#13a8a8',
  '#33bcb7',
  '#58d1c9',
  '#84e2d8',
  '#b2f1e8',
];
cyanDark.primary = cyanDark[5];
var blueDark = [
  '#111a2c',
  '#112545',
  '#15325b',
  '#15417e',
  '#1554ad',
  '#1668dc',
  '#3c89e8',
  '#65a9f3',
  '#8dc5f8',
  '#b7dcfa',
];
blueDark.primary = blueDark[5];
var geekblueDark = [
  '#131629',
  '#161d40',
  '#1c2755',
  '#203175',
  '#263ea0',
  '#2b4acb',
  '#5273e0',
  '#7f9ef3',
  '#a8c1f8',
  '#d2e0fa',
];
geekblueDark.primary = geekblueDark[5];
var purpleDark = [
  '#1a1325',
  '#24163a',
  '#301c4d',
  '#3e2069',
  '#51258f',
  '#642ab5',
  '#854eca',
  '#ab7ae0',
  '#cda8f0',
  '#ebd7fa',
];
purpleDark.primary = purpleDark[5];
var magentaDark = [
  '#291321',
  '#40162f',
  '#551c3b',
  '#75204f',
  '#a02669',
  '#cb2b83',
  '#e0529c',
  '#f37fb7',
  '#f8a8cc',
  '#fad2e3',
];
magentaDark.primary = magentaDark[5];
var greyDark = [
  '#151515',
  '#1f1f1f',
  '#2d2d2d',
  '#393939',
  '#494949',
  '#5a5a5a',
  '#6a6a6a',
  '#7b7b7b',
  '#888888',
  '#969696',
];
greyDark.primary = greyDark[5];

// ../../node_modules/@ant-design/icons-angular/fesm2022/ant-design-icons-angular.mjs
var ANT_ICON_ANGULAR_CONSOLE_PREFIX = '[@ant-design/icons-angular]:';
function error(message) {
  console.error(`${ANT_ICON_ANGULAR_CONSOLE_PREFIX} ${message}.`);
}
function warn(message) {
  if (isDevMode()) {
    console.warn(`${ANT_ICON_ANGULAR_CONSOLE_PREFIX} ${message}.`);
  }
}
function getSecondaryColor(primaryColor) {
  return generate(primaryColor)[0];
}
function withSuffix(name2, theme) {
  switch (theme) {
    case 'fill':
      return `${name2}-fill`;
    case 'outline':
      return `${name2}-o`;
    case 'twotone':
      return `${name2}-twotone`;
    case void 0:
      return name2;
    default:
      throw new Error(
        `${ANT_ICON_ANGULAR_CONSOLE_PREFIX}Theme "${theme}" is not a recognized theme!`,
      );
  }
}
function withSuffixAndColor(name2, theme, pri, sec) {
  return `${withSuffix(name2, theme)}-${pri}-${sec}`;
}
function mapAbbrToTheme(abbr) {
  return abbr === 'o' ? 'outline' : abbr;
}
function alreadyHasAThemeSuffix(name2) {
  return name2.endsWith('-fill') || name2.endsWith('-o') || name2.endsWith('-twotone');
}
function isIconDefinition(target) {
  return (
    typeof target === 'object' &&
    typeof target.name === 'string' &&
    (typeof target.theme === 'string' || target.theme === void 0) &&
    typeof target.icon === 'string'
  );
}
function getIconDefinitionFromAbbr(str) {
  const arr = str.split('-');
  const theme = mapAbbrToTheme(arr.splice(arr.length - 1, 1)[0]);
  const name2 = arr.join('-');
  return {
    name: name2,
    theme,
    icon: '',
  };
}
function cloneSVG(svg) {
  return svg.cloneNode(true);
}
function replaceFillColor(raw) {
  return raw
    .replace(/['"]#333['"]/g, '"primaryColor"')
    .replace(/['"]#E6E6E6['"]/g, '"secondaryColor"')
    .replace(/['"]#D9D9D9['"]/g, '"secondaryColor"')
    .replace(/['"]#D8D8D8['"]/g, '"secondaryColor"');
}
function getNameAndNamespace(type) {
  const split = type.split(':');
  switch (split.length) {
    case 1:
      return [type, ''];
    case 2:
      return [split[1], split[0]];
    default:
      throw new Error(`${ANT_ICON_ANGULAR_CONSOLE_PREFIX}The icon type ${type} is not valid!`);
  }
}
function hasNamespace(type) {
  return getNameAndNamespace(type)[1] !== '';
}
function NameSpaceIsNotSpecifyError() {
  return new Error(
    `${ANT_ICON_ANGULAR_CONSOLE_PREFIX}Type should have a namespace. Try "namespace:${name}".`,
  );
}
function IconNotFoundError(icon) {
  return new Error(
    `${ANT_ICON_ANGULAR_CONSOLE_PREFIX}the icon ${icon} does not exist or is not registered.`,
  );
}
function HttpModuleNotImport() {
  error(`you need to import "HttpClientModule" to use dynamic importing.`);
  return null;
}
function UrlNotSafeError(url) {
  return new Error(`${ANT_ICON_ANGULAR_CONSOLE_PREFIX}The url "${url}" is unsafe.`);
}
function SVGTagNotFoundError() {
  return new Error(`${ANT_ICON_ANGULAR_CONSOLE_PREFIX}<svg> tag not found.`);
}
function DynamicLoadingTimeoutError() {
  return new Error(`${ANT_ICON_ANGULAR_CONSOLE_PREFIX}Importing timeout error.`);
}
var JSONP_HANDLER_NAME = '__ant_icon_load';
var ANT_ICONS = new InjectionToken('ant_icons');
var _IconService = class _IconService {
  set twoToneColor({ primaryColor, secondaryColor }) {
    this._twoToneColorPalette.primaryColor = primaryColor;
    this._twoToneColorPalette.secondaryColor = secondaryColor || getSecondaryColor(primaryColor);
  }
  get twoToneColor() {
    return __spreadValues({}, this._twoToneColorPalette);
  }
  /**
   * Disable dynamic loading (support static loading only).
   */
  get _disableDynamicLoading() {
    return false;
  }
  constructor(_antIcons) {
    this._antIcons = _antIcons;
    this.defaultTheme = 'outline';
    this._svgDefinitions = /* @__PURE__ */ new Map();
    this._svgRenderedDefinitions = /* @__PURE__ */ new Map();
    this._inProgressFetches = /* @__PURE__ */ new Map();
    this._assetsUrlRoot = '';
    this._twoToneColorPalette = {
      primaryColor: '#333333',
      secondaryColor: '#E6E6E6',
    };
    this._enableJsonpLoading = false;
    this._jsonpIconLoad$ = new Subject();
    this._rendererFactory = inject(RendererFactory2);
    this._handler = inject(HttpBackend, {
      optional: true,
    });
    this._document = inject(DOCUMENT);
    this.sanitizer = inject(DomSanitizer);
    this._renderer = this._rendererFactory.createRenderer(null, null);
    if (this._handler) {
      this._http = new HttpClient(this._handler);
    }
    if (this._antIcons) {
      this.addIcon(...this._antIcons);
    }
  }
  /**
   * Call this method to switch to jsonp like loading.
   */
  useJsonpLoading() {
    if (!this._enableJsonpLoading) {
      this._enableJsonpLoading = true;
      window[JSONP_HANDLER_NAME] = (icon) => {
        this._jsonpIconLoad$.next(icon);
      };
    } else {
      warn('You are already using jsonp loading.');
    }
  }
  /**
   * Change the prefix of the inline svg resources, so they could be deployed elsewhere, like CDN.
   * @param prefix
   */
  changeAssetsSource(prefix) {
    this._assetsUrlRoot = prefix.endsWith('/') ? prefix : prefix + '/';
  }
  /**
   * Add icons provided by ant design.
   * @param icons
   */
  addIcon(...icons) {
    icons.forEach((icon) => {
      this._svgDefinitions.set(withSuffix(icon.name, icon.theme), icon);
    });
  }
  /**
   * Register an icon. Namespace is required.
   * @param type
   * @param literal
   */
  addIconLiteral(type, literal) {
    const [_, namespace] = getNameAndNamespace(type);
    if (!namespace) {
      throw NameSpaceIsNotSpecifyError();
    }
    this.addIcon({
      name: type,
      icon: literal,
    });
  }
  /**
   * Remove all cache.
   */
  clear() {
    this._svgDefinitions.clear();
    this._svgRenderedDefinitions.clear();
  }
  /**
   * Get a rendered `SVGElement`.
   * @param icon
   * @param twoToneColor
   */
  getRenderedContent(icon, twoToneColor) {
    const definition = isIconDefinition(icon) ? icon : this._svgDefinitions.get(icon) || null;
    if (!definition && this._disableDynamicLoading) {
      throw IconNotFoundError(icon);
    }
    const $iconDefinition = definition ? of(definition) : this._loadIconDynamically(icon);
    return $iconDefinition.pipe(
      map((i) => {
        if (!i) {
          throw IconNotFoundError(icon);
        }
        return this._loadSVGFromCacheOrCreateNew(i, twoToneColor);
      }),
    );
  }
  getCachedIcons() {
    return this._svgDefinitions;
  }
  /**
   * Get raw svg and assemble a `IconDefinition` object.
   * @param type
   */
  _loadIconDynamically(type) {
    if (!this._http && !this._enableJsonpLoading) {
      return of(HttpModuleNotImport());
    }
    let inProgress = this._inProgressFetches.get(type);
    if (!inProgress) {
      const [name2, namespace] = getNameAndNamespace(type);
      const icon = namespace
        ? {
            name: type,
            icon: '',
          }
        : getIconDefinitionFromAbbr(name2);
      const suffix = this._enableJsonpLoading ? '.js' : '.svg';
      const url =
        (namespace
          ? `${this._assetsUrlRoot}assets/${namespace}/${name2}`
          : `${this._assetsUrlRoot}assets/${icon.theme}/${icon.name}`) + suffix;
      const safeUrl = this.sanitizer.sanitize(SecurityContext.URL, url);
      if (!safeUrl) {
        throw UrlNotSafeError(url);
      }
      const source = !this._enableJsonpLoading
        ? this._http
            .get(safeUrl, {
              responseType: 'text',
            })
            .pipe(
              map((literal) =>
                __spreadProps(__spreadValues({}, icon), {
                  icon: literal,
                }),
              ),
            )
        : this._loadIconDynamicallyWithJsonp(icon, safeUrl);
      inProgress = source.pipe(
        tap((definition) => this.addIcon(definition)),
        finalize(() => this._inProgressFetches.delete(type)),
        catchError(() => of(null)),
        share(),
      );
      this._inProgressFetches.set(type, inProgress);
    }
    return inProgress;
  }
  _loadIconDynamicallyWithJsonp(icon, url) {
    return new Observable((subscriber) => {
      const loader = this._document.createElement('script');
      const timer = setTimeout(() => {
        clean();
        subscriber.error(DynamicLoadingTimeoutError());
      }, 6e3);
      loader.src = url;
      function clean() {
        loader.parentNode.removeChild(loader);
        clearTimeout(timer);
      }
      this._document.body.appendChild(loader);
      this._jsonpIconLoad$
        .pipe(
          filter((i) => i.name === icon.name && i.theme === icon.theme),
          take(1),
        )
        .subscribe((i) => {
          subscriber.next(i);
          clean();
        });
    });
  }
  /**
   * Render a new `SVGElement` for a given `IconDefinition`, or make a copy from cache.
   * @param icon
   * @param twoToneColor
   */
  _loadSVGFromCacheOrCreateNew(icon, twoToneColor) {
    let svg;
    const pri = twoToneColor || this._twoToneColorPalette.primaryColor;
    const sec = getSecondaryColor(pri) || this._twoToneColorPalette.secondaryColor;
    const key =
      icon.theme === 'twotone'
        ? withSuffixAndColor(icon.name, icon.theme, pri, sec)
        : icon.theme === void 0
          ? icon.name
          : withSuffix(icon.name, icon.theme);
    const cached = this._svgRenderedDefinitions.get(key);
    if (cached) {
      svg = cached.icon;
    } else {
      svg = this._setSVGAttribute(
        this._colorizeSVGIcon(
          // Icons provided by ant design should be refined to remove preset colors.
          this._createSVGElementFromString(
            hasNamespace(icon.name) ? icon.icon : replaceFillColor(icon.icon),
          ),
          icon.theme === 'twotone',
          pri,
          sec,
        ),
      );
      this._svgRenderedDefinitions.set(
        key,
        __spreadProps(__spreadValues({}, icon), {
          icon: svg,
        }),
      );
    }
    return cloneSVG(svg);
  }
  _createSVGElementFromString(str) {
    const div = this._document.createElement('div');
    div.innerHTML = str;
    const svg = div.querySelector('svg');
    if (!svg) {
      throw SVGTagNotFoundError;
    }
    return svg;
  }
  _setSVGAttribute(svg) {
    this._renderer.setAttribute(svg, 'width', '1em');
    this._renderer.setAttribute(svg, 'height', '1em');
    return svg;
  }
  _colorizeSVGIcon(svg, twotone, pri, sec) {
    if (twotone) {
      const children = svg.childNodes;
      const length = children.length;
      for (let i = 0; i < length; i++) {
        const child = children[i];
        if (child.getAttribute('fill') === 'secondaryColor') {
          this._renderer.setAttribute(child, 'fill', sec);
        } else {
          this._renderer.setAttribute(child, 'fill', pri);
        }
      }
    }
    this._renderer.setAttribute(svg, 'fill', 'currentColor');
    return svg;
  }
};
_IconService.ɵfac = function IconService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _IconService)(ɵɵinject(ANT_ICONS, 8));
};
_IconService.ɵprov = ɵɵdefineInjectable({
  token: _IconService,
  factory: _IconService.ɵfac,
  providedIn: 'root',
});
var IconService = _IconService;
(() => {
  (typeof ngDevMode === 'undefined' || ngDevMode) &&
    setClassMetadata(
      IconService,
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
      () => [
        {
          type: void 0,
          decorators: [
            {
              type: Optional,
            },
            {
              type: Inject,
              args: [ANT_ICONS],
            },
          ],
        },
      ],
      null,
    );
})();
function checkMeta(prev, after) {
  return (
    prev.type === after.type &&
    prev.theme === after.theme &&
    prev.twoToneColor === after.twoToneColor
  );
}
var _IconDirective = class _IconDirective {
  constructor(_iconService) {
    this._iconService = _iconService;
    this._elementRef = inject(ElementRef);
    this._renderer = inject(Renderer2);
  }
  ngOnChanges(changes) {
    if (changes.type || changes.theme || changes.twoToneColor) {
      this._changeIcon();
    }
  }
  /**
   * Render a new icon in the current element. Remove the icon when `type` is falsy.
   */
  _changeIcon() {
    return new Promise((resolve) => {
      if (!this.type) {
        this._clearSVGElement();
        resolve(null);
        return;
      }
      const beforeMeta = this._getSelfRenderMeta();
      this._iconService
        .getRenderedContent(this._parseIconType(this.type, this.theme), this.twoToneColor)
        .subscribe((svg) => {
          const afterMeta = this._getSelfRenderMeta();
          if (checkMeta(beforeMeta, afterMeta)) {
            this._setSVGElement(svg);
            resolve(svg);
          } else {
            resolve(null);
          }
        });
    });
  }
  _getSelfRenderMeta() {
    return {
      type: this.type,
      theme: this.theme,
      twoToneColor: this.twoToneColor,
    };
  }
  /**
   * Parse a icon to the standard form, an `IconDefinition` or a string like 'account-book-fill` (with a theme suffixed).
   * If namespace is specified, ignore theme because it meaningless for users' icons.
   *
   * @param type
   * @param theme
   */
  _parseIconType(type, theme) {
    if (isIconDefinition(type)) {
      return type;
    } else {
      const [name2, namespace] = getNameAndNamespace(type);
      if (namespace) {
        return type;
      }
      if (alreadyHasAThemeSuffix(name2)) {
        if (theme) {
          warn(`'type' ${name2} already gets a theme inside so 'theme' ${theme} would be ignored`);
        }
        return name2;
      } else {
        return withSuffix(name2, theme || this._iconService.defaultTheme);
      }
    }
  }
  _setSVGElement(svg) {
    this._clearSVGElement();
    this._renderer.appendChild(this._elementRef.nativeElement, svg);
  }
  _clearSVGElement() {
    const el = this._elementRef.nativeElement;
    const children = el.childNodes;
    const length = children.length;
    for (let i = length - 1; i >= 0; i--) {
      const child = children[i];
      if (child.tagName?.toLowerCase() === 'svg') {
        this._renderer.removeChild(el, child);
      }
    }
  }
};
_IconDirective.ɵfac = function IconDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _IconDirective)(ɵɵdirectiveInject(IconService));
};
_IconDirective.ɵdir = ɵɵdefineDirective({
  type: _IconDirective,
  selectors: [['', 'antIcon', '']],
  inputs: {
    type: 'type',
    theme: 'theme',
    twoToneColor: 'twoToneColor',
  },
  features: [ɵɵNgOnChangesFeature],
});
var IconDirective = _IconDirective;
(() => {
  (typeof ngDevMode === 'undefined' || ngDevMode) &&
    setClassMetadata(
      IconDirective,
      [
        {
          type: Directive,
          args: [
            {
              selector: '[antIcon]',
            },
          ],
        },
      ],
      () => [
        {
          type: IconService,
        },
      ],
      {
        type: [
          {
            type: Input,
          },
        ],
        theme: [
          {
            type: Input,
          },
        ],
        twoToneColor: [
          {
            type: Input,
          },
        ],
      },
    );
})();
function provideAntIcons(icons) {
  return makeEnvironmentProviders([
    {
      provide: ANT_ICONS,
      useValue: icons,
    },
  ]);
}
var manifest = {
  fill: [
    'account-book',
    'alert',
    'aliwangwang',
    'alipay-square',
    'alipay-circle',
    'amazon-circle',
    'api',
    'appstore',
    'apple',
    'audio',
    'backward',
    'android',
    'amazon-square',
    'bank',
    'bell',
    'behance-circle',
    'behance-square',
    'bilibili',
    'book',
    'box-plot',
    'build',
    'calculator',
    'bulb',
    'calendar',
    'bug',
    'car',
    'caret-down',
    'camera',
    'caret-right',
    'caret-left',
    'caret-up',
    'check-circle',
    'check-square',
    'ci-circle',
    'chrome',
    'carry-out',
    'clock-circle',
    'close-circle',
    'close-square',
    'cloud',
    'code',
    'codepen-square',
    'code-sandbox-square',
    'codepen-circle',
    'control',
    'contacts',
    'copyright-circle',
    'copy',
    'credit-card',
    'crown',
    'customer-service',
    'database',
    'delete',
    'compass',
    'diff',
    'dingtalk-square',
    'dingtalk-circle',
    'discord',
    'dislike',
    'dollar-circle',
    'container',
    'down-circle',
    'down-square',
    'dribbble-circle',
    'dribbble-square',
    'dropbox-square',
    'edit',
    'environment',
    'euro-circle',
    'dashboard',
    'exclamation-circle',
    'experiment',
    'eye',
    'fast-backward',
    'facebook',
    'eye-invisible',
    'file-add',
    'file-excel',
    'file-exclamation',
    'file',
    'dropbox-circle',
    'file-image',
    'file-markdown',
    'file-pdf',
    'file-ppt',
    'file-unknown',
    'file-word',
    'file-zip',
    'fast-forward',
    'code-sandbox-circle',
    'fire',
    'folder-add',
    'folder',
    'filter',
    'file-text',
    'format-painter',
    'frown',
    'forward',
    'folder-open',
    'gift',
    'gitlab',
    'funnel-plot',
    'gold',
    'google-circle',
    'google-plus-circle',
    'google-plus-square',
    'google-square',
    'hdd',
    'heart',
    'highlight',
    'home',
    'hourglass',
    'html5',
    'idcard',
    'fund',
    'ie-circle',
    'golden',
    'flag',
    'ie-square',
    'insurance',
    'instagram',
    'layout',
    'interaction',
    'left-circle',
    'like',
    'info-circle',
    'lock',
    'linkedin',
    'mail',
    'mac-command',
    'medicine-box',
    'medium-square',
    'left-square',
    'medium-circle',
    'merge',
    'message',
    'minus-circle',
    'minus-square',
    'money-collect',
    'mobile',
    'moon',
    'notification',
    'github',
    'pause-circle',
    'pay-circle',
    'muted',
    'phone',
    'picture',
    'pinterest',
    'pie-chart',
    'play-square',
    'play-circle',
    'plus-circle',
    'plus-square',
    'pound-circle',
    'meh',
    'product',
    'profile',
    'property-safety',
    'open-a-i',
    'pushpin',
    'printer',
    'qq-circle',
    'question-circle',
    'qq-square',
    'read',
    'reconciliation',
    'reddit-square',
    'red-envelope',
    'rest',
    'project',
    'robot',
    'rocket',
    'safety-certificate',
    'save',
    'schedule',
    'setting',
    'right-circle',
    'shop',
    'shopping',
    'signal',
    'sketch-circle',
    'sketch-square',
    'skin',
    'skype',
    'slack-square',
    'signature',
    'sliders',
    'slack-circle',
    'smile',
    'snippets',
    'sound',
    'spotify',
    'star',
    'step-backward',
    'step-forward',
    'right-square',
    'stop',
    'sun',
    'reddit-circle',
    'tablet',
    'tags',
    'tag',
    'taobao-square',
    'taobao-circle',
    'thunderbolt',
    'tik-tok',
    'tool',
    'trademark-circle',
    'truck',
    'trophy',
    'twitter-circle',
    'twitter-square',
    'twitch',
    'up-circle',
    'up-square',
    'unlock',
    'usb',
    'video-camera',
    'wallet',
    'warning',
    'weibo-circle',
    'wechat-work',
    'windows',
    'yuque',
    'x',
    'yahoo',
    'weibo-square',
    'zhihu-circle',
    'zhihu-square',
    'switcher',
    'wechat',
    'security-scan',
    'youtube',
  ],
  outline: [
    'align-center',
    'alert',
    'alipay-circle',
    'aim',
    'alipay',
    'aliwangwang',
    'amazon',
    'apartment',
    'ant-cloud',
    'ant-design',
    'apple',
    'api',
    'align-left',
    'arrow-up',
    'area-chart',
    'appstore-add',
    'arrow-down',
    'align-right',
    'arrow-right',
    'audio-muted',
    'audio',
    'backward',
    'bank',
    'bars',
    'barcode',
    'arrow-left',
    'behance',
    'bar-chart',
    'aliyun',
    'appstore',
    'bg-colors',
    'bell',
    'bilibili',
    'block',
    'border-bottom',
    'border',
    'border-outer',
    'baidu',
    'border-horizontal',
    'border-verticle',
    'border-left',
    'behance-square',
    'border-top',
    'border-right',
    'book',
    'branches',
    'box-plot',
    'borderless-table',
    'bug',
    'build',
    'bulb',
    'calculator',
    'camera',
    'car',
    'account-book',
    'caret-down',
    'android',
    'caret-right',
    'audit',
    'caret-up',
    'carry-out',
    'check-circle',
    'check',
    'caret-left',
    'calendar',
    'ci-circle',
    'ci',
    'clock-circle',
    'alibaba',
    'close',
    'close-circle',
    'check-square',
    'cloud-download',
    'border-inner',
    'chrome',
    'cloud-server',
    'arrows-alt',
    'cloud-upload',
    'cluster',
    'cloud-sync',
    'code-sandbox',
    'clear',
    'codepen',
    'coffee',
    'codepen-circle',
    'column-width',
    'cloud',
    'column-height',
    'compass',
    'contacts',
    'close-square',
    'compress',
    'copy',
    'copyright-circle',
    'container',
    'bold',
    'control',
    'customer-service',
    'dash',
    'crown',
    'copyright',
    'database',
    'dashboard',
    'delete-column',
    'deployment-unit',
    'delete',
    'delivered-procedure',
    'desktop',
    'diff',
    'dingding',
    'discord',
    'dingtalk',
    'dislike',
    'disconnect',
    'docker',
    'dollar-circle',
    'dollar',
    'double-left',
    'delete-row',
    'down-circle',
    'double-right',
    'down',
    'dot-net',
    'down-square',
    'dribbble',
    'drag',
    'download',
    'dropbox',
    'credit-card',
    'console-sql',
    'edit',
    'enter',
    'environment',
    'euro-circle',
    'euro',
    'ellipsis',
    'exclamation',
    'code',
    'exclamation-circle',
    'dribbble-square',
    'export',
    'eye',
    'experiment',
    'eye-invisible',
    'fall',
    'fast-backward',
    'fast-forward',
    'facebook',
    'exception',
    'field-binary',
    'field-string',
    'field-time',
    'comment',
    'file-done',
    'field-number',
    'file-excel',
    'file-gif',
    'expand',
    'file-markdown',
    'file-image',
    'file',
    'file-exclamation',
    'file-protect',
    'file-search',
    'expand-alt',
    'file-text',
    'file-jpg',
    'file-unknown',
    'file-word',
    'file-zip',
    'filter',
    'file-add',
    'flag',
    'folder-add',
    'folder',
    'file-pdf',
    'folder-view',
    'font-colors',
    'fork',
    'font-size',
    'forward',
    'form',
    'dot-chart',
    'frown',
    'fullscreen',
    'folder-open',
    'fullscreen-exit',
    'function',
    'fund',
    'format-painter',
    'fund-projection-screen',
    'funnel-plot',
    'file-sync',
    'fund-view',
    'gif',
    'gift',
    'gateway',
    'file-ppt',
    'global',
    'github',
    'google-plus',
    'google',
    'group',
    'hdd',
    'harmony-o-s',
    'heart',
    'holder',
    'history',
    'gitlab',
    'highlight',
    'home',
    'hourglass',
    'heat-map',
    'gold',
    'ie',
    'html5',
    'import',
    'insert-row-above',
    'info',
    'inbox',
    'insert-row-below',
    'instagram',
    'insurance',
    'insert-row-right',
    'interaction',
    'issues-close',
    'java-script',
    'idcard',
    'kubernetes',
    'key',
    'laptop',
    'insert-row-left',
    'left-circle',
    'java',
    'left',
    'like',
    'line',
    'info-circle',
    'link',
    'loading-3-quarters',
    'line-chart',
    'linux',
    'linkedin',
    'loading',
    'logout',
    'lock',
    'mail',
    'login',
    'medicine-box',
    'mac-command',
    'layout',
    'medium',
    'meh',
    'medium-workmark',
    'menu-unfold',
    'merge-cells',
    'merge',
    'menu',
    'message',
    'menu-fold',
    'minus-circle',
    'minus-square',
    'minus',
    'moon',
    'money-collect',
    'mobile',
    'man',
    'monitor',
    'muted',
    'node-expand',
    'node-index',
    'italic',
    'node-collapse',
    'ordered-list',
    'more',
    'paper-clip',
    'open-a-i',
    'number',
    'one-to-one',
    'partition',
    'pause',
    'pause-circle',
    'pay-circle',
    'pic-center',
    'pic-right',
    'pic-left',
    'percentage',
    'pie-chart',
    'pinterest',
    'plus-circle',
    'play-circle',
    'play-square',
    'plus',
    'pound-circle',
    'plus-square',
    'picture',
    'fire',
    'left-square',
    'poweroff',
    'phone',
    'product',
    'notification',
    'profile',
    'project',
    'property-safety',
    'pound',
    'pushpin',
    'pull-request',
    'qrcode',
    'qq',
    'question-circle',
    'python',
    'radar-chart',
    'radius-bottomright',
    'question',
    'radius-upright',
    'radius-upleft',
    'radius-bottomleft',
    'line-height',
    'reconciliation',
    'radius-setting',
    'red-envelope',
    'redo',
    'rest',
    'reload',
    'read',
    'retweet',
    'right-square',
    'right',
    'rise',
    'robot',
    'rotate-left',
    'safety',
    'rotate-right',
    'safety-certificate',
    'rollback',
    'reddit',
    'ruby',
    'save',
    'scan',
    'schedule',
    'scissor',
    'security-scan',
    'rocket',
    'search',
    'send',
    'right-circle',
    'setting',
    'shake',
    'shopping',
    'shopping-cart',
    'select',
    'shrink',
    'signature',
    'sketch',
    'skin',
    'slack',
    'skype',
    'small-dash',
    'slack-square',
    'sliders',
    'sort-ascending',
    'smile',
    'snippets',
    'sort-descending',
    'solution',
    'split-cells',
    'spotify',
    'share-alt',
    'star',
    'step-forward',
    'stock',
    'stop',
    'strikethrough',
    'sound',
    'swap-left',
    'sun',
    'swap',
    'sync',
    'swap-right',
    'table',
    'tablet',
    'switcher',
    'tag',
    'step-backward',
    'tags',
    'taobao-circle',
    'team',
    'taobao',
    'thunderbolt',
    'tik-tok',
    'printer',
    'to-top',
    'trademark',
    'translation',
    'tool',
    'trophy',
    'truck',
    'twitch',
    'twitter',
    'undo',
    'underline',
    'trademark-circle',
    'unlock',
    'ungroup',
    'unordered-list',
    'up',
    'transaction',
    'upload',
    'up-square',
    'usb',
    'user',
    'user-switch',
    'usergroup-add',
    'user-add',
    'vertical-align-bottom',
    'vertical-align-middle',
    'usergroup-delete',
    'verified',
    'vertical-left',
    'vertical-right',
    'video-camera-add',
    'video-camera',
    'user-delete',
    'wallet',
    'warning',
    'up-circle',
    'subnode',
    'weibo',
    'weibo-square',
    'wifi',
    'weibo-circle',
    'wechat',
    'vertical-align-top',
    'windows',
    'yahoo',
    'woman',
    'x',
    'yuque',
    'shop',
    'zhihu',
    'zoom-in',
    'youtube',
    'wechat-work',
    'zoom-out',
    'whats-app',
    'sisternode',
  ],
  twotone: [
    'alert',
    'api',
    'appstore',
    'audio',
    'bank',
    'bell',
    'account-book',
    'book',
    'bug',
    'box-plot',
    'bulb',
    'build',
    'camera',
    'car',
    'carry-out',
    'calculator',
    'check-circle',
    'ci',
    'ci-circle',
    'clock-circle',
    'close-circle',
    'check-square',
    'calendar',
    'code',
    'cloud',
    'compass',
    'contacts',
    'container',
    'copy',
    'control',
    'copyright-circle',
    'copyright',
    'credit-card',
    'crown',
    'customer-service',
    'dashboard',
    'database',
    'close-square',
    'diff',
    'dislike',
    'dollar-circle',
    'down-circle',
    'down-square',
    'delete',
    'environment',
    'edit',
    'euro-circle',
    'experiment',
    'exclamation-circle',
    'eye-invisible',
    'file-add',
    'eye',
    'euro',
    'file-excel',
    'file-exclamation',
    'file-image',
    'file-markdown',
    'file-ppt',
    'file-text',
    'file',
    'file-pdf',
    'file-unknown',
    'file-word',
    'filter',
    'file-zip',
    'dollar',
    'flag',
    'folder-open',
    'folder-add',
    'frown',
    'funnel-plot',
    'folder',
    'fire',
    'gold',
    'gift',
    'heart',
    'highlight',
    'hourglass',
    'home',
    'html5',
    'idcard',
    'info-circle',
    'insurance',
    'interaction',
    'fund',
    'left-circle',
    'left-square',
    'like',
    'lock',
    'mail',
    'layout',
    'medicine-box',
    'message',
    'minus-circle',
    'minus-square',
    'mobile',
    'meh',
    'hdd',
    'notification',
    'pause-circle',
    'phone',
    'picture',
    'pie-chart',
    'play-circle',
    'plus-circle',
    'plus-square',
    'play-square',
    'profile',
    'printer',
    'property-safety',
    'project',
    'pushpin',
    'question-circle',
    'rest',
    'pound-circle',
    'money-collect',
    'reconciliation',
    'rocket',
    'right-circle',
    'safety-certificate',
    'save',
    'schedule',
    'security-scan',
    'right-square',
    'shop',
    'shopping',
    'red-envelope',
    'skin',
    'smile',
    'snippets',
    'sound',
    'star',
    'stop',
    'switcher',
    'tablet',
    'tag',
    'thunderbolt',
    'tool',
    'setting',
    'trademark-circle',
    'trophy',
    'sliders',
    'unlock',
    'up-circle',
    'usb',
    'wallet',
    'up-square',
    'warning',
    'video-camera',
    'tags',
  ],
};

export {
  _typeof,
  toPropertyKey,
  _defineProperty,
  ANT_ICON_ANGULAR_CONSOLE_PREFIX,
  error,
  warn,
  getSecondaryColor,
  withSuffix,
  withSuffixAndColor,
  mapAbbrToTheme,
  alreadyHasAThemeSuffix,
  isIconDefinition,
  getIconDefinitionFromAbbr,
  cloneSVG,
  replaceFillColor,
  getNameAndNamespace,
  hasNamespace,
  NameSpaceIsNotSpecifyError,
  IconNotFoundError,
  HttpModuleNotImport,
  UrlNotSafeError,
  SVGTagNotFoundError,
  DynamicLoadingTimeoutError,
  ANT_ICONS,
  IconService,
  IconDirective,
  provideAntIcons,
  manifest,
};
//# sourceMappingURL=chunk-NHMQZRFA.js.map
