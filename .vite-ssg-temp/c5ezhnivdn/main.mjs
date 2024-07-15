import {
  assign,
  createEmitter,
  deepCopy,
  format,
  getGlobalThis,
  hasOwn,
  inBrowser,
  incrementer,
  isArray,
  isBoolean,
  isEmptyObject,
  isFunction,
  isNumber,
  isObject,
  isPlainObject,
  isRegExp,
  isString,
  makeSymbol,
  warn,
  warnOnce,
} from '@intlify/shared'
import {
  CoreErrorCodes,
  CoreWarnCodes,
  DATETIME_FORMAT_OPTIONS_KEYS,
  DEFAULT_LOCALE,
  MISSING_RESOLVE_VALUE,
  NOT_REOSLVED,
  NUMBER_FORMAT_OPTIONS_KEYS,
  clearDateTimeFormat,
  clearNumberFormat,
  compile,
  createCompileError,
  createCoreContext,
  datetime,
  fallbackWithLocaleChain,
  getFallbackContext,
  isMessageAST,
  isMessageFunction,
  isTranslateFallbackWarn,
  isTranslateMissingWarn,
  number,
  parseDateTimeArgs,
  parseNumberArgs,
  parseTranslateArgs,
  registerLocaleFallbacker,
  registerMessageCompiler,
  registerMessageResolver,
  resolveValue,
  setAdditionalMeta,
  setDevToolsHook,
  setFallbackContext,
  translate,
  updateFallbackLocale,
} from '@intlify/core-base'
import {
  Fragment,
  Text,
  computed,
  createVNode,
  defineComponent,
  effectScope,
  getCurrentInstance,
  h,
  inject,
  isRef,
  mergeProps,
  onMounted,
  onUnmounted,
  ref,
  resolveComponent,
  shallowRef,
  unref,
  useSSRContext,
  watch,
  withCtx,
} from 'vue'
import { setupDevtoolsPlugin } from '@vue/devtools-api'
import NProgress from 'nprogress'
import { createPinia, defineStore } from 'pinia'
import { ViteSSG } from 'vite-ssg'
import { useRouter } from 'vue-router'
import {
  ssrIncludeBooleanAttr,
  ssrInterpolate,
  ssrRenderAttr,
  ssrRenderAttrs,
  ssrRenderComponent,
} from 'vue/server-renderer'
import { useHead } from '@vueuse/head'
import { useDark, usePreferredDark, useToggle } from '@vueuse/core'

const ar = {
  button: {
    about: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['حول'])
    },
    back: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['رجوع'])
    },
    go: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['تجربة'])
    },
    home: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['الرئيسية'])
    },
    toggle_dark: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['التغيير إلى الوضع المظلم'])
    },
    toggle_langs: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['تغيير اللغة'])
    },
  },
  intro: {
    desc: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['vite مثال لتطبيق'])
    },
    'dynamic-route': (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['عرض لتوجيهات ديناميكية'])
    },
    hi: (ctx) => {
      const {
        normalize: _normalize,
        interpolate: _interpolate,
        named: _named,
      } = ctx
      return _normalize(['مرحبا ', _interpolate(_named('name'))])
    },
    aka: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['معروف أيضا تحت مسمى'])
    },
    'whats-your-name': (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['ما إسمك؟'])
    },
  },
  'not-found': (ctx) => {
    const { normalize: _normalize } = ctx
    return _normalize(['صفحة غير موجودة'])
  },
}
const __vite_glob_0_0$2 = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      default: ar,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
)
const de = {
  button: {
    about: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Über'])
    },
    back: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Zurück'])
    },
    go: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Los'])
    },
    home: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Startseite'])
    },
    toggle_dark: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Dunkelmodus umschalten'])
    },
    toggle_langs: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Sprachen ändern'])
    },
  },
  intro: {
    desc: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Vite Startvorlage mit Vorlieben'])
    },
    'dynamic-route': (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Demo einer dynamischen Route'])
    },
    hi: (ctx) => {
      const {
        normalize: _normalize,
        interpolate: _interpolate,
        named: _named,
      } = ctx
      return _normalize(['Hi, ', _interpolate(_named('name')), '!'])
    },
    aka: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Auch bekannt als'])
    },
    'whats-your-name': (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Wie heißt du?'])
    },
  },
  'not-found': (ctx) => {
    const { normalize: _normalize } = ctx
    return _normalize(['Nicht gefunden'])
  },
}
const __vite_glob_0_1$2 = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      default: de,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
)
const en = {
  button: {
    about: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['About'])
    },
    back: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Back'])
    },
    go: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['GO'])
    },
    home: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Home'])
    },
    toggle_dark: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Toggle dark mode'])
    },
    toggle_langs: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Change languages'])
    },
  },
  intro: {
    desc: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Opinionated Vite Starter Template'])
    },
    'dynamic-route': (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Demo of dynamic route'])
    },
    hi: (ctx) => {
      const {
        normalize: _normalize,
        interpolate: _interpolate,
        named: _named,
      } = ctx
      return _normalize(['Hi, ', _interpolate(_named('name')), '!'])
    },
    aka: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Also known as'])
    },
    'whats-your-name': (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(["What's your name?"])
    },
  },
  'not-found': (ctx) => {
    const { normalize: _normalize } = ctx
    return _normalize(['Not found'])
  },
}
const __vite_glob_0_2$2 = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      default: en,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
)
const es = {
  button: {
    about: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Acerca de'])
    },
    back: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Atrás'])
    },
    go: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Ir'])
    },
    home: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Inicio'])
    },
    toggle_dark: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Alternar modo oscuro'])
    },
    toggle_langs: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Cambiar idiomas'])
    },
  },
  intro: {
    desc: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Plantilla de Inicio de Vite Dogmática'])
    },
    'dynamic-route': (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Demo de ruta dinámica'])
    },
    hi: (ctx) => {
      const {
        normalize: _normalize,
        interpolate: _interpolate,
        named: _named,
      } = ctx
      return _normalize(['¡Hola, ', _interpolate(_named('name')), '!'])
    },
    aka: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['También conocido como'])
    },
    'whats-your-name': (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['¿Cómo te llamas?'])
    },
  },
  'not-found': (ctx) => {
    const { normalize: _normalize } = ctx
    return _normalize(['No se ha encontrado'])
  },
}
const __vite_glob_0_3$1 = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      default: es,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
)
const fr = {
  button: {
    about: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['À propos'])
    },
    back: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Retour'])
    },
    go: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Essayer'])
    },
    home: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Accueil'])
    },
    toggle_dark: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Basculer en mode sombre'])
    },
    toggle_langs: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Changer de langue'])
    },
  },
  intro: {
    desc: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(["Exemple d'application Vite"])
    },
    'dynamic-route': (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Démo de route dynamique'])
    },
    hi: (ctx) => {
      const {
        normalize: _normalize,
        interpolate: _interpolate,
        named: _named,
      } = ctx
      return _normalize(['Salut, ', _interpolate(_named('name')), '!'])
    },
    aka: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Aussi connu sous le nom de'])
    },
    'whats-your-name': (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(["Comment t'appelles-tu ?"])
    },
  },
  'not-found': (ctx) => {
    const { normalize: _normalize } = ctx
    return _normalize(['Page non trouvée'])
  },
}
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      default: fr,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
)
const id = {
  button: {
    about: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Tentang'])
    },
    back: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Kembali'])
    },
    go: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Pergi'])
    },
    home: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Beranda'])
    },
    toggle_dark: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Ubah ke mode gelap'])
    },
    toggle_langs: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Ubah bahasa'])
    },
  },
  intro: {
    desc: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Template awal vite'])
    },
    'dynamic-route': (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Contoh rute dinamik'])
    },
    hi: (ctx) => {
      const {
        normalize: _normalize,
        interpolate: _interpolate,
        named: _named,
      } = ctx
      return _normalize(['Halo, ', _interpolate(_named('name')), '!'])
    },
    aka: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Juga diketahui sebagai'])
    },
    'whats-your-name': (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Siapa nama anda?'])
    },
  },
  'not-found': (ctx) => {
    const { normalize: _normalize } = ctx
    return _normalize(['Tidak ditemukan'])
  },
}
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      default: id,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
)
const it = {
  button: {
    about: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Su di me'])
    },
    back: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Indietro'])
    },
    go: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Vai'])
    },
    home: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Home'])
    },
    toggle_dark: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Attiva/disattiva modalità scura'])
    },
    toggle_langs: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Cambia lingua'])
    },
  },
  intro: {
    desc: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Modello per una Applicazione Vite'])
    },
    'dynamic-route': (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Demo di rotta dinamica'])
    },
    hi: (ctx) => {
      const {
        normalize: _normalize,
        interpolate: _interpolate,
        named: _named,
      } = ctx
      return _normalize(['Ciao, ', _interpolate(_named('name')), '!'])
    },
    'whats-your-name': (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Come ti chiami?'])
    },
  },
  'not-found': (ctx) => {
    const { normalize: _normalize } = ctx
    return _normalize(['Non trovato'])
  },
}
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      default: it,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
)
const ja = {
  button: {
    about: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['これは？'])
    },
    back: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['戻る'])
    },
    go: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['進む'])
    },
    home: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['ホーム'])
    },
    toggle_dark: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['ダークモード切り替え'])
    },
    toggle_langs: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['言語切り替え'])
    },
  },
  intro: {
    desc: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['固執された Vite スターターテンプレート'])
    },
    'dynamic-route': (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['動的ルートのデモ'])
    },
    hi: (ctx) => {
      const {
        normalize: _normalize,
        interpolate: _interpolate,
        named: _named,
      } = ctx
      return _normalize(['こんにちは、', _interpolate(_named('name')), '!'])
    },
    'whats-your-name': (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['君の名は。'])
    },
  },
  'not-found': (ctx) => {
    const { normalize: _normalize } = ctx
    return _normalize(['見つかりませんでした'])
  },
}
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      default: ja,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
)
const ko = {
  button: {
    about: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['소개'])
    },
    back: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['뒤로가기'])
    },
    go: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['이동'])
    },
    home: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['홈'])
    },
    toggle_dark: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['다크모드 토글'])
    },
    toggle_langs: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['언어 변경'])
    },
  },
  intro: {
    desc: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Vite 애플리케이션 템플릿'])
    },
    'dynamic-route': (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['다이나믹 라우트 데모'])
    },
    hi: (ctx) => {
      const {
        normalize: _normalize,
        interpolate: _interpolate,
        named: _named,
      } = ctx
      return _normalize(['안녕, ', _interpolate(_named('name')), '!'])
    },
    'whats-your-name': (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['이름이 뭐예요?'])
    },
  },
  'not-found': (ctx) => {
    const { normalize: _normalize } = ctx
    return _normalize(['찾을 수 없습니다'])
  },
}
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      default: ko,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
)
const pl = {
  button: {
    about: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['O nas'])
    },
    back: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Wróć'])
    },
    go: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['WEJDŹ'])
    },
    home: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Strona główna'])
    },
    toggle_dark: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Ustaw tryb nocny'])
    },
    toggle_langs: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Zmień język'])
    },
  },
  intro: {
    desc: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Opiniowany szablon startowy Vite'])
    },
    'dynamic-route': (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Demonstracja dynamicznego route'])
    },
    hi: (ctx) => {
      const {
        normalize: _normalize,
        interpolate: _interpolate,
        named: _named,
      } = ctx
      return _normalize(['Cześć, ', _interpolate(_named('name')), '!'])
    },
    aka: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Znany też jako'])
    },
    'whats-your-name': (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Jak masz na imię?'])
    },
  },
  'not-found': (ctx) => {
    const { normalize: _normalize } = ctx
    return _normalize(['Nie znaleziono'])
  },
}
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      default: pl,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
)
const ptBR = {
  button: {
    about: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Sobre'])
    },
    back: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Voltar'])
    },
    go: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Ir'])
    },
    home: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Início'])
    },
    toggle_dark: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Alternar modo escuro'])
    },
    toggle_langs: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Mudar de idioma'])
    },
  },
  intro: {
    desc: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Modelo Opinativo de Partida de Vite'])
    },
    'dynamic-route': (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Demonstração de rota dinâmica'])
    },
    hi: (ctx) => {
      const {
        normalize: _normalize,
        interpolate: _interpolate,
        named: _named,
      } = ctx
      return _normalize(['Olá, ', _interpolate(_named('name')), '!'])
    },
    aka: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Também conhecido como'])
    },
    'whats-your-name': (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Qual é o seu nome?'])
    },
  },
  'not-found': (ctx) => {
    const { normalize: _normalize } = ctx
    return _normalize(['Não encontrado'])
  },
}
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      default: ptBR,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
)
const ru = {
  button: {
    about: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['О шаблоне'])
    },
    back: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Назад'])
    },
    go: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Перейти'])
    },
    home: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Главная'])
    },
    toggle_dark: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Включить темный режим'])
    },
    toggle_langs: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Сменить язык'])
    },
  },
  intro: {
    desc: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Самостоятельный начальный шаблон Vite'])
    },
    'dynamic-route': (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Демо динамического маршрута'])
    },
    hi: (ctx) => {
      const {
        normalize: _normalize,
        interpolate: _interpolate,
        named: _named,
      } = ctx
      return _normalize(['Привет, ', _interpolate(_named('name')), '!'])
    },
    'whats-your-name': (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Как тебя зовут?'])
    },
  },
  'not-found': (ctx) => {
    const { normalize: _normalize } = ctx
    return _normalize(['Не найден'])
  },
}
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      default: ru,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
)
const tr = {
  button: {
    about: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Hakkımda'])
    },
    back: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Geri'])
    },
    go: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['İLERİ'])
    },
    home: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Anasayfa'])
    },
    toggle_dark: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Karanlık modu değiştir'])
    },
    toggle_langs: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Dilleri değiştir'])
    },
  },
  intro: {
    desc: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Görüşlü Vite Başlangıç Şablonu'])
    },
    'dynamic-route': (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Dinamik rota demosu'])
    },
    hi: (ctx) => {
      const {
        normalize: _normalize,
        interpolate: _interpolate,
        named: _named,
      } = ctx
      return _normalize(['Merhaba, ', _interpolate(_named('name')), '!'])
    },
    aka: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Ayrıca şöyle bilinir'])
    },
    'whats-your-name': (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Adınız nedir?'])
    },
  },
  'not-found': (ctx) => {
    const { normalize: _normalize } = ctx
    return _normalize(['Bulunamadı'])
  },
}
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      default: tr,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
)
const vi = {
  button: {
    about: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Về'])
    },
    back: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Quay lại'])
    },
    go: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Đi'])
    },
    home: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Khởi đầu'])
    },
    toggle_dark: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Chuyển đổi chế độ tối'])
    },
    toggle_langs: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Thay đổi ngôn ngữ'])
    },
  },
  intro: {
    desc: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Ý kiến cá nhân Vite Template để bắt đầu'])
    },
    'dynamic-route': (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Bản giới thiệu về dynamic route'])
    },
    hi: (ctx) => {
      const {
        normalize: _normalize,
        interpolate: _interpolate,
        named: _named,
      } = ctx
      return _normalize(['Hi, ', _interpolate(_named('name')), '!'])
    },
    'whats-your-name': (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['Tên bạn là gì?'])
    },
  },
  'not-found': (ctx) => {
    const { normalize: _normalize } = ctx
    return _normalize(['Không tìm thấy'])
  },
}
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      default: vi,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
)
const zhCN = {
  button: {
    about: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['关于'])
    },
    back: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['返回'])
    },
    go: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['确定'])
    },
    home: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['首页'])
    },
    toggle_dark: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['切换深色模式'])
    },
    toggle_langs: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['切换语言'])
    },
  },
  intro: {
    desc: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['固执己见的 Vite 项目模板'])
    },
    'dynamic-route': (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['动态路由演示'])
    },
    hi: (ctx) => {
      const {
        normalize: _normalize,
        interpolate: _interpolate,
        named: _named,
      } = ctx
      return _normalize(['你好，', _interpolate(_named('name'))])
    },
    aka: (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['也叫'])
    },
    'whats-your-name': (ctx) => {
      const { normalize: _normalize } = ctx
      return _normalize(['输入你的名字'])
    },
  },
  'not-found': (ctx) => {
    const { normalize: _normalize } = ctx
    return _normalize(['未找到页面'])
  },
}
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      default: zhCN,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
)
getGlobalThis().__VUE_I18N_LEGACY_API__ = false
getGlobalThis().__VUE_I18N_FULL_INSTALL__ = true
getGlobalThis().__VUE_I18N_PROD_DEVTOOLS__ = false
getGlobalThis().__VUE_PROD_DEVTOOLS__ = false
/*!
 * vue-i18n v9.13.1
 * (c) 2024 kazuya kawaguchi
 * Released under the MIT License.
 */
const VERSION = '9.13.1'
function initFeatureFlags() {
  if (typeof __INTLIFY_JIT_COMPILATION__ !== 'boolean') {
    getGlobalThis().__INTLIFY_JIT_COMPILATION__ = false
  }
  if (typeof __INTLIFY_DROP_MESSAGE_COMPILER__ !== 'boolean') {
    getGlobalThis().__INTLIFY_DROP_MESSAGE_COMPILER__ = false
  }
  if (typeof __INTLIFY_PROD_DEVTOOLS__ !== 'boolean') {
    getGlobalThis().__INTLIFY_PROD_DEVTOOLS__ = false
  }
}
const code$1 = CoreWarnCodes.__EXTEND_POINT__
const inc$1 = incrementer(code$1)
const I18nWarnCodes = {
  FALLBACK_TO_ROOT: code$1,
  // 9
  NOT_SUPPORTED_PRESERVE: inc$1(),
  // 10
  NOT_SUPPORTED_FORMATTER: inc$1(),
  // 11
  NOT_SUPPORTED_PRESERVE_DIRECTIVE: inc$1(),
  // 12
  NOT_SUPPORTED_GET_CHOICE_INDEX: inc$1(),
  // 13
  COMPONENT_NAME_LEGACY_COMPATIBLE: inc$1(),
  // 14
  NOT_FOUND_PARENT_SCOPE: inc$1(),
  // 15
  IGNORE_OBJ_FLATTEN: inc$1(),
  // 16
  NOTICE_DROP_ALLOW_COMPOSITION: inc$1(),
  // 17
  NOTICE_DROP_TRANSLATE_EXIST_COMPATIBLE_FLAG: inc$1(),
  // 18
}
const warnMessages = {
  [I18nWarnCodes.FALLBACK_TO_ROOT]: `Fall back to {type} '{key}' with root locale.`,
  [I18nWarnCodes.NOT_SUPPORTED_PRESERVE]: `Not supported 'preserve'.`,
  [I18nWarnCodes.NOT_SUPPORTED_FORMATTER]: `Not supported 'formatter'.`,
  [I18nWarnCodes.NOT_SUPPORTED_PRESERVE_DIRECTIVE]: `Not supported 'preserveDirectiveContent'.`,
  [I18nWarnCodes.NOT_SUPPORTED_GET_CHOICE_INDEX]: `Not supported 'getChoiceIndex'.`,
  [I18nWarnCodes.COMPONENT_NAME_LEGACY_COMPATIBLE]: `Component name legacy compatible: '{name}' -> 'i18n'`,
  [I18nWarnCodes.NOT_FOUND_PARENT_SCOPE]: `Not found parent scope. use the global scope.`,
  [I18nWarnCodes.IGNORE_OBJ_FLATTEN]: `Ignore object flatten: '{key}' key has an string value`,
  [I18nWarnCodes.NOTICE_DROP_ALLOW_COMPOSITION]: `'allowComposition' option will be dropped in the next major version. For more information, please see 👉 https://tinyurl.com/2p97mcze`,
  [I18nWarnCodes.NOTICE_DROP_TRANSLATE_EXIST_COMPATIBLE_FLAG]: `'translateExistCompatible' option will be dropped in the next major version.`,
}
function getWarnMessage(code2, ...args) {
  return format(warnMessages[code2], ...args)
}
const code = CoreErrorCodes.__EXTEND_POINT__
const inc = incrementer(code)
const I18nErrorCodes = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: code,
  // 24
  // legacy module errors
  INVALID_ARGUMENT: inc(),
  // 25
  // i18n module errors
  MUST_BE_CALL_SETUP_TOP: inc(),
  // 26
  NOT_INSTALLED: inc(),
  // 27
  NOT_AVAILABLE_IN_LEGACY_MODE: inc(),
  // 28
  // directive module errors
  REQUIRED_VALUE: inc(),
  // 29
  INVALID_VALUE: inc(),
  // 30
  // vue-devtools errors
  CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: inc(),
  // 31
  NOT_INSTALLED_WITH_PROVIDE: inc(),
  // 32
  // unexpected error
  UNEXPECTED_ERROR: inc(),
  // 33
  // not compatible legacy vue-i18n constructor
  NOT_COMPATIBLE_LEGACY_VUE_I18N: inc(),
  // 34
  // bridge support vue 2.x only
  BRIDGE_SUPPORT_VUE_2_ONLY: inc(),
  // 35
  // need to define `i18n` option in `allowComposition: true` and `useScope: 'local' at `useI18n``
  MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: inc(),
  // 36
  // Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly
  NOT_AVAILABLE_COMPOSITION_IN_LEGACY: inc(),
  // 37
  // for enhancement
  __EXTEND_POINT__: inc(),
  // 38
}
function createI18nError(code2, ...args) {
  return createCompileError(
    code2,
    null,
    process.env.NODE_ENV !== 'production'
      ? { messages: errorMessages, args }
      : void 0,
  )
}
const errorMessages = {
  [I18nErrorCodes.UNEXPECTED_RETURN_TYPE]: 'Unexpected return type in composer',
  [I18nErrorCodes.INVALID_ARGUMENT]: 'Invalid argument',
  [I18nErrorCodes.MUST_BE_CALL_SETUP_TOP]:
    'Must be called at the top of a `setup` function',
  [I18nErrorCodes.NOT_INSTALLED]: 'Need to install with `app.use` function',
  [I18nErrorCodes.UNEXPECTED_ERROR]: 'Unexpected error',
  [I18nErrorCodes.NOT_AVAILABLE_IN_LEGACY_MODE]: 'Not available in legacy mode',
  [I18nErrorCodes.REQUIRED_VALUE]: `Required in value: {0}`,
  [I18nErrorCodes.INVALID_VALUE]: `Invalid value`,
  [I18nErrorCodes.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN]: `Cannot setup vue-devtools plugin`,
  [I18nErrorCodes.NOT_INSTALLED_WITH_PROVIDE]:
    'Need to install with `provide` function',
  [I18nErrorCodes.NOT_COMPATIBLE_LEGACY_VUE_I18N]:
    'Not compatible legacy VueI18n.',
  [I18nErrorCodes.BRIDGE_SUPPORT_VUE_2_ONLY]:
    'vue-i18n-bridge support Vue 2.x only',
  [I18nErrorCodes.MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION]:
    'Must define ‘i18n’ option or custom block in Composition API with using local scope in Legacy API mode',
  [I18nErrorCodes.NOT_AVAILABLE_COMPOSITION_IN_LEGACY]:
    'Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly',
}
const TranslateVNodeSymbol = /* @__PURE__ */ makeSymbol('__translateVNode')
const DatetimePartsSymbol = /* @__PURE__ */ makeSymbol('__datetimeParts')
const NumberPartsSymbol = /* @__PURE__ */ makeSymbol('__numberParts')
const EnableEmitter = /* @__PURE__ */ makeSymbol('__enableEmitter')
const DisableEmitter = /* @__PURE__ */ makeSymbol('__disableEmitter')
const SetPluralRulesSymbol = makeSymbol('__setPluralRules')
makeSymbol('__intlifyMeta')
const InejctWithOptionSymbol = /* @__PURE__ */ makeSymbol('__injectWithOption')
const DisposeSymbol = /* @__PURE__ */ makeSymbol('__dispose')
function handleFlatJson(obj) {
  if (!isObject(obj)) {
    return obj
  }
  for (const key in obj) {
    if (!hasOwn(obj, key)) {
      continue
    }
    if (!key.includes('.')) {
      if (isObject(obj[key])) {
        handleFlatJson(obj[key])
      }
    } else {
      const subKeys = key.split('.')
      const lastIndex = subKeys.length - 1
      let currentObj = obj
      let hasStringValue = false
      for (let i = 0; i < lastIndex; i++) {
        if (!(subKeys[i] in currentObj)) {
          currentObj[subKeys[i]] = {}
        }
        if (!isObject(currentObj[subKeys[i]])) {
          process.env.NODE_ENV !== 'production' &&
            warn(
              getWarnMessage(I18nWarnCodes.IGNORE_OBJ_FLATTEN, {
                key: subKeys[i],
              }),
            )
          hasStringValue = true
          break
        }
        currentObj = currentObj[subKeys[i]]
      }
      if (!hasStringValue) {
        currentObj[subKeys[lastIndex]] = obj[key]
        delete obj[key]
      }
      if (isObject(currentObj[subKeys[lastIndex]])) {
        handleFlatJson(currentObj[subKeys[lastIndex]])
      }
    }
  }
  return obj
}
function getLocaleMessages(locale, options) {
  const { messages: messages2, __i18n, messageResolver, flatJson } = options
  const ret = isPlainObject(messages2)
    ? messages2
    : isArray(__i18n)
    ? {}
    : { [locale]: {} }
  if (isArray(__i18n)) {
    __i18n.forEach((custom) => {
      if ('locale' in custom && 'resource' in custom) {
        const { locale: locale2, resource } = custom
        if (locale2) {
          ret[locale2] = ret[locale2] || {}
          deepCopy(resource, ret[locale2])
        } else {
          deepCopy(resource, ret)
        }
      } else {
        isString(custom) && deepCopy(JSON.parse(custom), ret)
      }
    })
  }
  if (messageResolver == null && flatJson) {
    for (const key in ret) {
      if (hasOwn(ret, key)) {
        handleFlatJson(ret[key])
      }
    }
  }
  return ret
}
function getComponentOptions(instance) {
  return instance.type
}
function adjustI18nResources(gl, options, componentOptions) {
  let messages2 = isObject(options.messages) ? options.messages : {}
  if ('__i18nGlobal' in componentOptions) {
    messages2 = getLocaleMessages(gl.locale.value, {
      messages: messages2,
      __i18n: componentOptions.__i18nGlobal,
    })
  }
  const locales = Object.keys(messages2)
  if (locales.length) {
    locales.forEach((locale) => {
      gl.mergeLocaleMessage(locale, messages2[locale])
    })
  }
  {
    if (isObject(options.datetimeFormats)) {
      const locales2 = Object.keys(options.datetimeFormats)
      if (locales2.length) {
        locales2.forEach((locale) => {
          gl.mergeDateTimeFormat(locale, options.datetimeFormats[locale])
        })
      }
    }
    if (isObject(options.numberFormats)) {
      const locales2 = Object.keys(options.numberFormats)
      if (locales2.length) {
        locales2.forEach((locale) => {
          gl.mergeNumberFormat(locale, options.numberFormats[locale])
        })
      }
    }
  }
}
function createTextNode(key) {
  return createVNode(Text, null, key, 0)
}
const DEVTOOLS_META = '__INTLIFY_META__'
const NOOP_RETURN_ARRAY = () => []
const NOOP_RETURN_FALSE = () => false
let composerID = 0
function defineCoreMissingHandler(missing) {
  return (ctx, locale, key, type) => {
    return missing(locale, key, getCurrentInstance() || void 0, type)
  }
}
function getMetaInfo() {
  const instance = getCurrentInstance()
  let meta = null
  return instance && (meta = getComponentOptions(instance)[DEVTOOLS_META])
    ? { [DEVTOOLS_META]: meta }
    : null
}
function createComposer(options = {}, VueI18nLegacy) {
  const { __root, __injectWithOption } = options
  const _isGlobal = __root === void 0
  const flatJson = options.flatJson
  const _ref = inBrowser ? ref : shallowRef
  const translateExistCompatible = !!options.translateExistCompatible
  if (process.env.NODE_ENV !== 'production') {
    if (translateExistCompatible && true) {
      warnOnce(
        getWarnMessage(
          I18nWarnCodes.NOTICE_DROP_TRANSLATE_EXIST_COMPATIBLE_FLAG,
        ),
      )
    }
  }
  let _inheritLocale = isBoolean(options.inheritLocale)
    ? options.inheritLocale
    : true
  const _locale = _ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.locale.value : isString(options.locale) ? options.locale : DEFAULT_LOCALE,
  )
  const _fallbackLocale = _ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.fallbackLocale.value : isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value,
  )
  const _messages = _ref(getLocaleMessages(_locale.value, options))
  const _datetimeFormats = _ref(
    isPlainObject(options.datetimeFormats)
      ? options.datetimeFormats
      : { [_locale.value]: {} },
  )
  const _numberFormats = _ref(
    isPlainObject(options.numberFormats)
      ? options.numberFormats
      : { [_locale.value]: {} },
  )
  let _missingWarn = __root
    ? __root.missingWarn
    : isBoolean(options.missingWarn) || isRegExp(options.missingWarn)
    ? options.missingWarn
    : true
  let _fallbackWarn = __root
    ? __root.fallbackWarn
    : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn)
    ? options.fallbackWarn
    : true
  let _fallbackRoot = __root
    ? __root.fallbackRoot
    : isBoolean(options.fallbackRoot)
    ? options.fallbackRoot
    : true
  let _fallbackFormat = !!options.fallbackFormat
  let _missing = isFunction(options.missing) ? options.missing : null
  let _runtimeMissing = isFunction(options.missing)
    ? defineCoreMissingHandler(options.missing)
    : null
  let _postTranslation = isFunction(options.postTranslation)
    ? options.postTranslation
    : null
  let _warnHtmlMessage = __root
    ? __root.warnHtmlMessage
    : isBoolean(options.warnHtmlMessage)
    ? options.warnHtmlMessage
    : true
  let _escapeParameter = !!options.escapeParameter
  const _modifiers = __root
    ? __root.modifiers
    : isPlainObject(options.modifiers)
    ? options.modifiers
    : {}
  let _pluralRules = options.pluralRules || (__root && __root.pluralRules)
  let _context
  const getCoreContext = () => {
    _isGlobal && setFallbackContext(null)
    const ctxOptions = {
      version: VERSION,
      locale: _locale.value,
      fallbackLocale: _fallbackLocale.value,
      messages: _messages.value,
      modifiers: _modifiers,
      pluralRules: _pluralRules,
      missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
      missingWarn: _missingWarn,
      fallbackWarn: _fallbackWarn,
      fallbackFormat: _fallbackFormat,
      unresolving: true,
      postTranslation: _postTranslation === null ? void 0 : _postTranslation,
      warnHtmlMessage: _warnHtmlMessage,
      escapeParameter: _escapeParameter,
      messageResolver: options.messageResolver,
      messageCompiler: options.messageCompiler,
      __meta: { framework: 'vue' },
    }
    {
      ctxOptions.datetimeFormats = _datetimeFormats.value
      ctxOptions.numberFormats = _numberFormats.value
      ctxOptions.__datetimeFormatters = isPlainObject(_context)
        ? _context.__datetimeFormatters
        : void 0
      ctxOptions.__numberFormatters = isPlainObject(_context)
        ? _context.__numberFormatters
        : void 0
    }
    if (process.env.NODE_ENV !== 'production') {
      ctxOptions.__v_emitter = isPlainObject(_context)
        ? _context.__v_emitter
        : void 0
    }
    const ctx = createCoreContext(ctxOptions)
    _isGlobal && setFallbackContext(ctx)
    return ctx
  }
  _context = getCoreContext()
  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value)
  function trackReactivityValues() {
    return [
      _locale.value,
      _fallbackLocale.value,
      _messages.value,
      _datetimeFormats.value,
      _numberFormats.value,
    ]
  }
  const locale = computed({
    get: () => _locale.value,
    set: (val) => {
      _locale.value = val
      _context.locale = _locale.value
    },
  })
  const fallbackLocale = computed({
    get: () => _fallbackLocale.value,
    set: (val) => {
      _fallbackLocale.value = val
      _context.fallbackLocale = _fallbackLocale.value
      updateFallbackLocale(_context, _locale.value, val)
    },
  })
  const messages2 = computed(() => _messages.value)
  const datetimeFormats = /* @__PURE__ */ computed(() => _datetimeFormats.value)
  const numberFormats = /* @__PURE__ */ computed(() => _numberFormats.value)
  function getPostTranslationHandler() {
    return isFunction(_postTranslation) ? _postTranslation : null
  }
  function setPostTranslationHandler(handler) {
    _postTranslation = handler
    _context.postTranslation = handler
  }
  function getMissingHandler() {
    return _missing
  }
  function setMissingHandler(handler) {
    if (handler !== null) {
      _runtimeMissing = defineCoreMissingHandler(handler)
    }
    _missing = handler
    _context.missing = _runtimeMissing
  }
  function isResolvedTranslateMessage(type, arg) {
    return type !== 'translate' || !arg.resolvedMessage
  }
  const wrapWithDeps = (
    fn,
    argumentParser,
    warnType,
    fallbackSuccess,
    fallbackFail,
    successCondition,
  ) => {
    trackReactivityValues()
    let ret
    try {
      if (process.env.NODE_ENV !== 'production' || __INTLIFY_PROD_DEVTOOLS__) {
        setAdditionalMeta(/* @__PURE__ */ getMetaInfo())
      }
      if (!_isGlobal) {
        _context.fallbackContext = __root ? getFallbackContext() : void 0
      }
      ret = fn(_context)
    } finally {
      if (process.env.NODE_ENV !== 'production' || __INTLIFY_PROD_DEVTOOLS__) {
        setAdditionalMeta(null)
      }
      if (!_isGlobal) {
        _context.fallbackContext = void 0
      }
    }
    if (
      (warnType !== 'translate exists' && // for not `te` (e.g `t`)
        isNumber(ret) &&
        ret === NOT_REOSLVED) ||
      (warnType === 'translate exists' && !ret)
    ) {
      const [key, arg2] = argumentParser()
      if (
        process.env.NODE_ENV !== 'production' &&
        __root &&
        isString(key) &&
        isResolvedTranslateMessage(warnType, arg2)
      ) {
        if (
          _fallbackRoot &&
          (isTranslateFallbackWarn(_fallbackWarn, key) ||
            isTranslateMissingWarn(_missingWarn, key))
        ) {
          warn(
            getWarnMessage(I18nWarnCodes.FALLBACK_TO_ROOT, {
              key,
              type: warnType,
            }),
          )
        }
        if (process.env.NODE_ENV !== 'production') {
          const { __v_emitter: emitter } = _context
          if (emitter && _fallbackRoot) {
            emitter.emit('fallback', {
              type: warnType,
              key,
              to: 'global',
              groupId: `${warnType}:${key}`,
            })
          }
        }
      }
      return __root && _fallbackRoot
        ? fallbackSuccess(__root)
        : fallbackFail(key)
    } else if (successCondition(ret)) {
      return ret
    } else {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_RETURN_TYPE)
    }
  }
  function t(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(translate, null, [context, ...args]),
      () => parseTranslateArgs(...args),
      'translate',
      (root) => Reflect.apply(root.t, root, [...args]),
      (key) => key,
      (val) => isString(val),
    )
  }
  function rt(...args) {
    const [arg1, arg2, arg3] = args
    if (arg3 && !isObject(arg3)) {
      throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT)
    }
    return t(...[arg1, arg2, assign({ resolvedMessage: true }, arg3 || {})])
  }
  function d(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(datetime, null, [context, ...args]),
      () => parseDateTimeArgs(...args),
      'datetime format',
      (root) => Reflect.apply(root.d, root, [...args]),
      () => MISSING_RESOLVE_VALUE,
      (val) => isString(val),
    )
  }
  function n(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(number, null, [context, ...args]),
      () => parseNumberArgs(...args),
      'number format',
      (root) => Reflect.apply(root.n, root, [...args]),
      () => MISSING_RESOLVE_VALUE,
      (val) => isString(val),
    )
  }
  function normalize(values) {
    return values.map((val) =>
      isString(val) || isNumber(val) || isBoolean(val)
        ? createTextNode(String(val))
        : val,
    )
  }
  const interpolate = (val) => val
  const processor = {
    normalize,
    interpolate,
    type: 'vnode',
  }
  function translateVNode(...args) {
    return wrapWithDeps(
      (context) => {
        let ret
        const _context2 = context
        try {
          _context2.processor = processor
          ret = Reflect.apply(translate, null, [_context2, ...args])
        } finally {
          _context2.processor = null
        }
        return ret
      },
      () => parseTranslateArgs(...args),
      'translate',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root) => root[TranslateVNodeSymbol](...args),
      (key) => [createTextNode(key)],
      (val) => isArray(val),
    )
  }
  function numberParts(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(number, null, [context, ...args]),
      () => parseNumberArgs(...args),
      'number format',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root) => root[NumberPartsSymbol](...args),
      NOOP_RETURN_ARRAY,
      (val) => isString(val) || isArray(val),
    )
  }
  function datetimeParts(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(datetime, null, [context, ...args]),
      () => parseDateTimeArgs(...args),
      'datetime format',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root) => root[DatetimePartsSymbol](...args),
      NOOP_RETURN_ARRAY,
      (val) => isString(val) || isArray(val),
    )
  }
  function setPluralRules(rules) {
    _pluralRules = rules
    _context.pluralRules = _pluralRules
  }
  function te(key, locale2) {
    return wrapWithDeps(
      () => {
        if (!key) {
          return false
        }
        const targetLocale = isString(locale2) ? locale2 : _locale.value
        const message = getLocaleMessage(targetLocale)
        const resolved = _context.messageResolver(message, key)
        return !translateExistCompatible
          ? isMessageAST(resolved) ||
              isMessageFunction(resolved) ||
              isString(resolved)
          : resolved != null
      },
      () => [key],
      'translate exists',
      (root) => {
        return Reflect.apply(root.te, root, [key, locale2])
      },
      NOOP_RETURN_FALSE,
      (val) => isBoolean(val),
    )
  }
  function resolveMessages(key) {
    let messages22 = null
    const locales = fallbackWithLocaleChain(
      _context,
      _fallbackLocale.value,
      _locale.value,
    )
    for (let i = 0; i < locales.length; i++) {
      const targetLocaleMessages = _messages.value[locales[i]] || {}
      const messageValue = _context.messageResolver(targetLocaleMessages, key)
      if (messageValue != null) {
        messages22 = messageValue
        break
      }
    }
    return messages22
  }
  function tm(key) {
    const messages22 = resolveMessages(key)
    return messages22 != null ? messages22 : __root ? __root.tm(key) || {} : {}
  }
  function getLocaleMessage(locale2) {
    return _messages.value[locale2] || {}
  }
  function setLocaleMessage(locale2, message) {
    if (flatJson) {
      const _message = { [locale2]: message }
      for (const key in _message) {
        if (hasOwn(_message, key)) {
          handleFlatJson(_message[key])
        }
      }
      message = _message[locale2]
    }
    _messages.value[locale2] = message
    _context.messages = _messages.value
  }
  function mergeLocaleMessage(locale2, message) {
    _messages.value[locale2] = _messages.value[locale2] || {}
    const _message = { [locale2]: message }
    if (flatJson) {
      for (const key in _message) {
        if (hasOwn(_message, key)) {
          handleFlatJson(_message[key])
        }
      }
    }
    message = _message[locale2]
    deepCopy(message, _messages.value[locale2])
    _context.messages = _messages.value
  }
  function getDateTimeFormat(locale2) {
    return _datetimeFormats.value[locale2] || {}
  }
  function setDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = format2
    _context.datetimeFormats = _datetimeFormats.value
    clearDateTimeFormat(_context, locale2, format2)
  }
  function mergeDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = assign(
      _datetimeFormats.value[locale2] || {},
      format2,
    )
    _context.datetimeFormats = _datetimeFormats.value
    clearDateTimeFormat(_context, locale2, format2)
  }
  function getNumberFormat(locale2) {
    return _numberFormats.value[locale2] || {}
  }
  function setNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = format2
    _context.numberFormats = _numberFormats.value
    clearNumberFormat(_context, locale2, format2)
  }
  function mergeNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = assign(
      _numberFormats.value[locale2] || {},
      format2,
    )
    _context.numberFormats = _numberFormats.value
    clearNumberFormat(_context, locale2, format2)
  }
  composerID++
  if (__root && inBrowser) {
    watch(__root.locale, (val) => {
      if (_inheritLocale) {
        _locale.value = val
        _context.locale = val
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value)
      }
    })
    watch(__root.fallbackLocale, (val) => {
      if (_inheritLocale) {
        _fallbackLocale.value = val
        _context.fallbackLocale = val
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value)
      }
    })
  }
  const composer = {
    id: composerID,
    locale,
    fallbackLocale,
    get inheritLocale() {
      return _inheritLocale
    },
    set inheritLocale(val) {
      _inheritLocale = val
      if (val && __root) {
        _locale.value = __root.locale.value
        _fallbackLocale.value = __root.fallbackLocale.value
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value)
      }
    },
    get availableLocales() {
      return Object.keys(_messages.value).sort()
    },
    messages: messages2,
    get modifiers() {
      return _modifiers
    },
    get pluralRules() {
      return _pluralRules || {}
    },
    get isGlobal() {
      return _isGlobal
    },
    get missingWarn() {
      return _missingWarn
    },
    set missingWarn(val) {
      _missingWarn = val
      _context.missingWarn = _missingWarn
    },
    get fallbackWarn() {
      return _fallbackWarn
    },
    set fallbackWarn(val) {
      _fallbackWarn = val
      _context.fallbackWarn = _fallbackWarn
    },
    get fallbackRoot() {
      return _fallbackRoot
    },
    set fallbackRoot(val) {
      _fallbackRoot = val
    },
    get fallbackFormat() {
      return _fallbackFormat
    },
    set fallbackFormat(val) {
      _fallbackFormat = val
      _context.fallbackFormat = _fallbackFormat
    },
    get warnHtmlMessage() {
      return _warnHtmlMessage
    },
    set warnHtmlMessage(val) {
      _warnHtmlMessage = val
      _context.warnHtmlMessage = val
    },
    get escapeParameter() {
      return _escapeParameter
    },
    set escapeParameter(val) {
      _escapeParameter = val
      _context.escapeParameter = val
    },
    t,
    getLocaleMessage,
    setLocaleMessage,
    mergeLocaleMessage,
    getPostTranslationHandler,
    setPostTranslationHandler,
    getMissingHandler,
    setMissingHandler,
    [SetPluralRulesSymbol]: setPluralRules,
  }
  {
    composer.datetimeFormats = datetimeFormats
    composer.numberFormats = numberFormats
    composer.rt = rt
    composer.te = te
    composer.tm = tm
    composer.d = d
    composer.n = n
    composer.getDateTimeFormat = getDateTimeFormat
    composer.setDateTimeFormat = setDateTimeFormat
    composer.mergeDateTimeFormat = mergeDateTimeFormat
    composer.getNumberFormat = getNumberFormat
    composer.setNumberFormat = setNumberFormat
    composer.mergeNumberFormat = mergeNumberFormat
    composer[InejctWithOptionSymbol] = __injectWithOption
    composer[TranslateVNodeSymbol] = translateVNode
    composer[DatetimePartsSymbol] = datetimeParts
    composer[NumberPartsSymbol] = numberParts
  }
  if (process.env.NODE_ENV !== 'production') {
    composer[EnableEmitter] = (emitter) => {
      _context.__v_emitter = emitter
    }
    composer[DisableEmitter] = () => {
      _context.__v_emitter = void 0
    }
  }
  return composer
}
const baseFormatProps = {
  tag: {
    type: [String, Object],
  },
  locale: {
    type: String,
  },
  scope: {
    type: String,
    // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
    validator: (val) => val === 'parent' || val === 'global',
    default: 'parent',
    /* ComponentI18nScope */
  },
  i18n: {
    type: Object,
  },
}
function getInterpolateArg({ slots }, keys) {
  if (keys.length === 1 && keys[0] === 'default') {
    const ret = slots.default ? slots.default() : []
    return ret.reduce((slot, current) => {
      return [
        ...slot,
        // prettier-ignore
        ...current.type === Fragment ? current.children : [current],
      ]
    }, [])
  } else {
    return keys.reduce((arg, key) => {
      const slot = slots[key]
      if (slot) {
        arg[key] = slot()
      }
      return arg
    }, {})
  }
}
function getFragmentableTag(tag) {
  return Fragment
}
const TranslationImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: 'i18n-t',
  props: assign(
    {
      keypath: {
        type: String,
        required: true,
      },
      plural: {
        type: [Number, String],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validator: (val) => isNumber(val) || !isNaN(val),
      },
    },
    baseFormatProps,
  ),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const { slots, attrs } = context
    const i18n =
      props.i18n ||
      useI18n({
        useScope: props.scope,
        __useComponent: true,
      })
    return () => {
      const keys = Object.keys(slots).filter((key) => key !== '_')
      const options = {}
      if (props.locale) {
        options.locale = props.locale
      }
      if (props.plural !== void 0) {
        options.plural = isString(props.plural) ? +props.plural : props.plural
      }
      const arg = getInterpolateArg(context, keys)
      const children = i18n[TranslateVNodeSymbol](props.keypath, arg, options)
      const assignedAttrs = assign({}, attrs)
      const tag =
        isString(props.tag) || isObject(props.tag)
          ? props.tag
          : getFragmentableTag()
      return h(tag, assignedAttrs, children)
    }
  },
})
const Translation = TranslationImpl
function isVNode(target) {
  return isArray(target) && !isString(target[0])
}
function renderFormatter(props, context, slotKeys, partFormatter) {
  const { slots, attrs } = context
  return () => {
    const options = { part: true }
    let overrides = {}
    if (props.locale) {
      options.locale = props.locale
    }
    if (isString(props.format)) {
      options.key = props.format
    } else if (isObject(props.format)) {
      if (isString(props.format.key)) {
        options.key = props.format.key
      }
      overrides = Object.keys(props.format).reduce((options2, prop) => {
        return slotKeys.includes(prop)
          ? assign({}, options2, { [prop]: props.format[prop] })
          : options2
      }, {})
    }
    const parts = partFormatter(...[props.value, options, overrides])
    let children = [options.key]
    if (isArray(parts)) {
      children = parts.map((part, index) => {
        const slot = slots[part.type]
        const node = slot
          ? slot({ [part.type]: part.value, index, parts })
          : [part.value]
        if (isVNode(node)) {
          node[0].key = `${part.type}-${index}`
        }
        return node
      })
    } else if (isString(parts)) {
      children = [parts]
    }
    const assignedAttrs = assign({}, attrs)
    const tag =
      isString(props.tag) || isObject(props.tag)
        ? props.tag
        : getFragmentableTag()
    return h(tag, assignedAttrs, children)
  }
}
const NumberFormatImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: 'i18n-n',
  props: assign(
    {
      value: {
        type: Number,
        required: true,
      },
      format: {
        type: [String, Object],
      },
    },
    baseFormatProps,
  ),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const i18n =
      props.i18n ||
      useI18n({
        useScope: props.scope,
        __useComponent: true,
      })
    return renderFormatter(
      props,
      context,
      NUMBER_FORMAT_OPTIONS_KEYS,
      (...args) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        i18n[NumberPartsSymbol](...args),
    )
  },
})
const NumberFormat = NumberFormatImpl
const DatetimeFormatImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: 'i18n-d',
  props: assign(
    {
      value: {
        type: [Number, Date],
        required: true,
      },
      format: {
        type: [String, Object],
      },
    },
    baseFormatProps,
  ),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const i18n =
      props.i18n ||
      useI18n({
        useScope: props.scope,
        __useComponent: true,
      })
    return renderFormatter(
      props,
      context,
      DATETIME_FORMAT_OPTIONS_KEYS,
      (...args) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        i18n[DatetimePartsSymbol](...args),
    )
  },
})
const DatetimeFormat = DatetimeFormatImpl
function getComposer$2(i18n, instance) {
  const i18nInternal = i18n
  if (i18n.mode === 'composition') {
    return i18nInternal.__getInstance(instance) || i18n.global
  } else {
    const vueI18n = i18nInternal.__getInstance(instance)
    return vueI18n != null ? vueI18n.__composer : i18n.global.__composer
  }
}
function vTDirective(i18n) {
  const _process = (binding) => {
    const { instance, modifiers, value } = binding
    if (!instance || !instance.$) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR)
    }
    const composer = getComposer$2(i18n, instance.$)
    if (process.env.NODE_ENV !== 'production' && modifiers.preserve) {
      warn(getWarnMessage(I18nWarnCodes.NOT_SUPPORTED_PRESERVE))
    }
    const parsedValue = parseValue(value)
    return [
      Reflect.apply(composer.t, composer, [...makeParams(parsedValue)]),
      composer,
    ]
  }
  const register = (el, binding) => {
    const [textContent, composer] = _process(binding)
    if (inBrowser && i18n.global === composer) {
      el.__i18nWatcher = watch(composer.locale, () => {
        binding.instance && binding.instance.$forceUpdate()
      })
    }
    el.__composer = composer
    el.textContent = textContent
  }
  const unregister = (el) => {
    if (inBrowser && el.__i18nWatcher) {
      el.__i18nWatcher()
      el.__i18nWatcher = void 0
      delete el.__i18nWatcher
    }
    if (el.__composer) {
      el.__composer = void 0
      delete el.__composer
    }
  }
  const update = (el, { value }) => {
    if (el.__composer) {
      const composer = el.__composer
      const parsedValue = parseValue(value)
      el.textContent = Reflect.apply(composer.t, composer, [
        ...makeParams(parsedValue),
      ])
    }
  }
  const getSSRProps = (binding) => {
    const [textContent] = _process(binding)
    return { textContent }
  }
  return {
    created: register,
    unmounted: unregister,
    beforeUpdate: update,
    getSSRProps,
  }
}
function parseValue(value) {
  if (isString(value)) {
    return { path: value }
  } else if (isPlainObject(value)) {
    if (!('path' in value)) {
      throw createI18nError(I18nErrorCodes.REQUIRED_VALUE, 'path')
    }
    return value
  } else {
    throw createI18nError(I18nErrorCodes.INVALID_VALUE)
  }
}
function makeParams(value) {
  const { path, locale, args, choice, plural } = value
  const options = {}
  const named = args || {}
  if (isString(locale)) {
    options.locale = locale
  }
  if (isNumber(choice)) {
    options.plural = choice
  }
  if (isNumber(plural)) {
    options.plural = plural
  }
  return [path, named, options]
}
function apply(app, i18n, ...options) {
  const pluginOptions = isPlainObject(options[0]) ? options[0] : {}
  const useI18nComponentName = !!pluginOptions.useI18nComponentName
  const globalInstall = isBoolean(pluginOptions.globalInstall)
    ? pluginOptions.globalInstall
    : true
  if (
    process.env.NODE_ENV !== 'production' &&
    globalInstall &&
    useI18nComponentName
  ) {
    warn(
      getWarnMessage(I18nWarnCodes.COMPONENT_NAME_LEGACY_COMPATIBLE, {
        name: Translation.name,
      }),
    )
  }
  if (globalInstall) {
    ;[!useI18nComponentName ? Translation.name : 'i18n', 'I18nT'].forEach(
      (name) => app.component(name, Translation),
    )
    ;[NumberFormat.name, 'I18nN'].forEach((name) =>
      app.component(name, NumberFormat),
    )
    ;[DatetimeFormat.name, 'I18nD'].forEach((name) =>
      app.component(name, DatetimeFormat),
    )
  }
  {
    app.directive('t', vTDirective(i18n))
  }
}
const VueDevToolsLabels = {
  ['vue-devtools-plugin-vue-i18n']:
    /* VueDevToolsIDs.PLUGIN */
    'Vue I18n devtools',
  ['vue-i18n-resource-inspector']:
    /* VueDevToolsIDs.CUSTOM_INSPECTOR */
    'I18n Resources',
  ['vue-i18n-timeline']:
    /* VueDevToolsIDs.TIMELINE */
    'Vue I18n',
}
const VueDevToolsPlaceholders = {
  ['vue-i18n-resource-inspector']:
    /* VueDevToolsIDs.CUSTOM_INSPECTOR */
    'Search for scopes ...',
}
const VueDevToolsTimelineColors = {
  ['vue-i18n-timeline']:
    /* VueDevToolsIDs.TIMELINE */
    16764185,
}
const VUE_I18N_COMPONENT_TYPES = 'vue-i18n: composer properties'
let devtoolsApi
async function enableDevTools(app, i18n) {
  return new Promise((resolve, reject) => {
    try {
      setupDevtoolsPlugin(
        {
          id: 'vue-devtools-plugin-vue-i18n',
          label:
            VueDevToolsLabels[
              'vue-devtools-plugin-vue-i18n'
              /* VueDevToolsIDs.PLUGIN */
            ],
          packageName: 'vue-i18n',
          homepage: 'https://vue-i18n.intlify.dev',
          logo: 'https://vue-i18n.intlify.dev/vue-i18n-devtools-logo.png',
          componentStateTypes: [VUE_I18N_COMPONENT_TYPES],
          app,
          // eslint-disable-line @typescript-eslint/no-explicit-any
        },
        (api) => {
          devtoolsApi = api
          api.on.visitComponentTree(({ componentInstance, treeNode }) => {
            updateComponentTreeTags(componentInstance, treeNode, i18n)
          })
          api.on.inspectComponent(({ componentInstance, instanceData }) => {
            if (
              componentInstance.vnode.el &&
              componentInstance.vnode.el.__VUE_I18N__ &&
              instanceData
            ) {
              if (i18n.mode === 'legacy') {
                if (
                  componentInstance.vnode.el.__VUE_I18N__ !==
                  i18n.global.__composer
                ) {
                  inspectComposer(
                    instanceData,
                    componentInstance.vnode.el.__VUE_I18N__,
                  )
                }
              } else {
                inspectComposer(
                  instanceData,
                  componentInstance.vnode.el.__VUE_I18N__,
                )
              }
            }
          })
          api.addInspector({
            id: 'vue-i18n-resource-inspector',
            label:
              VueDevToolsLabels[
                'vue-i18n-resource-inspector'
                /* VueDevToolsIDs.CUSTOM_INSPECTOR */
              ],
            icon: 'language',
            treeFilterPlaceholder:
              VueDevToolsPlaceholders[
                'vue-i18n-resource-inspector'
                /* VueDevToolsIDs.CUSTOM_INSPECTOR */
              ],
          })
          api.on.getInspectorTree((payload) => {
            if (
              payload.app === app &&
              payload.inspectorId === 'vue-i18n-resource-inspector'
            ) {
              registerScope(payload, i18n)
            }
          })
          const roots = /* @__PURE__ */ new Map()
          api.on.getInspectorState(async (payload) => {
            if (
              payload.app === app &&
              payload.inspectorId === 'vue-i18n-resource-inspector'
            ) {
              api.unhighlightElement()
              inspectScope(payload, i18n)
              if (payload.nodeId === 'global') {
                if (!roots.has(payload.app)) {
                  const [root] = await api.getComponentInstances(payload.app)
                  roots.set(payload.app, root)
                }
                api.highlightElement(roots.get(payload.app))
              } else {
                const instance = getComponentInstance(payload.nodeId, i18n)
                instance && api.highlightElement(instance)
              }
            }
          })
          api.on.editInspectorState((payload) => {
            if (
              payload.app === app &&
              payload.inspectorId === 'vue-i18n-resource-inspector'
            ) {
              editScope(payload, i18n)
            }
          })
          api.addTimelineLayer({
            id: 'vue-i18n-timeline',
            label:
              VueDevToolsLabels[
                'vue-i18n-timeline'
                /* VueDevToolsIDs.TIMELINE */
              ],
            color:
              VueDevToolsTimelineColors[
                'vue-i18n-timeline'
                /* VueDevToolsIDs.TIMELINE */
              ],
          })
          resolve(true)
        },
      )
    } catch (e) {
      console.error(e)
      reject(false)
    }
  })
}
function getI18nScopeLable(instance) {
  return (
    instance.type.name ||
    instance.type.displayName ||
    instance.type.__file ||
    'Anonymous'
  )
}
function updateComponentTreeTags(instance, treeNode, i18n) {
  const global =
    i18n.mode === 'composition' ? i18n.global : i18n.global.__composer
  if (instance && instance.vnode.el && instance.vnode.el.__VUE_I18N__) {
    if (instance.vnode.el.__VUE_I18N__ !== global) {
      const tag = {
        label: `i18n (${getI18nScopeLable(instance)} Scope)`,
        textColor: 0,
        backgroundColor: 16764185,
      }
      treeNode.tags.push(tag)
    }
  }
}
function inspectComposer(instanceData, composer) {
  const type = VUE_I18N_COMPONENT_TYPES
  instanceData.state.push({
    type,
    key: 'locale',
    editable: true,
    value: composer.locale.value,
  })
  instanceData.state.push({
    type,
    key: 'availableLocales',
    editable: false,
    value: composer.availableLocales,
  })
  instanceData.state.push({
    type,
    key: 'fallbackLocale',
    editable: true,
    value: composer.fallbackLocale.value,
  })
  instanceData.state.push({
    type,
    key: 'inheritLocale',
    editable: true,
    value: composer.inheritLocale,
  })
  instanceData.state.push({
    type,
    key: 'messages',
    editable: false,
    value: getLocaleMessageValue(composer.messages.value),
  })
  {
    instanceData.state.push({
      type,
      key: 'datetimeFormats',
      editable: false,
      value: composer.datetimeFormats.value,
    })
    instanceData.state.push({
      type,
      key: 'numberFormats',
      editable: false,
      value: composer.numberFormats.value,
    })
  }
}
function getLocaleMessageValue(messages2) {
  const value = {}
  Object.keys(messages2).forEach((key) => {
    const v = messages2[key]
    if (isFunction(v) && 'source' in v) {
      value[key] = getMessageFunctionDetails(v)
    } else if (isMessageAST(v) && v.loc && v.loc.source) {
      value[key] = v.loc.source
    } else if (isObject(v)) {
      value[key] = getLocaleMessageValue(v)
    } else {
      value[key] = v
    }
  })
  return value
}
const ESC = {
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '&': '&amp;',
}
function escape(s) {
  return s.replace(/[<>"&]/g, escapeChar)
}
function escapeChar(a) {
  return ESC[a] || a
}
function getMessageFunctionDetails(func) {
  const argString = func.source ? `("${escape(func.source)}")` : `(?)`
  return {
    _custom: {
      type: 'function',
      display: `<span>ƒ</span> ${argString}`,
    },
  }
}
function registerScope(payload, i18n) {
  payload.rootNodes.push({
    id: 'global',
    label: 'Global Scope',
  })
  const global =
    i18n.mode === 'composition' ? i18n.global : i18n.global.__composer
  for (const [keyInstance, instance] of i18n.__instances) {
    const composer =
      i18n.mode === 'composition' ? instance : instance.__composer
    if (global === composer) {
      continue
    }
    payload.rootNodes.push({
      id: composer.id.toString(),
      label: `${getI18nScopeLable(keyInstance)} Scope`,
    })
  }
}
function getComponentInstance(nodeId, i18n) {
  let instance = null
  if (nodeId !== 'global') {
    for (const [component, composer] of i18n.__instances.entries()) {
      if (composer.id.toString() === nodeId) {
        instance = component
        break
      }
    }
  }
  return instance
}
function getComposer$1(nodeId, i18n) {
  if (nodeId === 'global') {
    return i18n.mode === 'composition' ? i18n.global : i18n.global.__composer
  } else {
    const instance = Array.from(i18n.__instances.values()).find(
      (item) => item.id.toString() === nodeId,
    )
    if (instance) {
      return i18n.mode === 'composition' ? instance : instance.__composer
    } else {
      return null
    }
  }
}
function inspectScope(payload, i18n) {
  const composer = getComposer$1(payload.nodeId, i18n)
  if (composer) {
    payload.state = makeScopeInspectState(composer)
  }
  return null
}
function makeScopeInspectState(composer) {
  const state = {}
  const localeType = 'Locale related info'
  const localeStates = [
    {
      type: localeType,
      key: 'locale',
      editable: true,
      value: composer.locale.value,
    },
    {
      type: localeType,
      key: 'fallbackLocale',
      editable: true,
      value: composer.fallbackLocale.value,
    },
    {
      type: localeType,
      key: 'availableLocales',
      editable: false,
      value: composer.availableLocales,
    },
    {
      type: localeType,
      key: 'inheritLocale',
      editable: true,
      value: composer.inheritLocale,
    },
  ]
  state[localeType] = localeStates
  const localeMessagesType = 'Locale messages info'
  const localeMessagesStates = [
    {
      type: localeMessagesType,
      key: 'messages',
      editable: false,
      value: getLocaleMessageValue(composer.messages.value),
    },
  ]
  state[localeMessagesType] = localeMessagesStates
  {
    const datetimeFormatsType = 'Datetime formats info'
    const datetimeFormatsStates = [
      {
        type: datetimeFormatsType,
        key: 'datetimeFormats',
        editable: false,
        value: composer.datetimeFormats.value,
      },
    ]
    state[datetimeFormatsType] = datetimeFormatsStates
    const numberFormatsType = 'Datetime formats info'
    const numberFormatsStates = [
      {
        type: numberFormatsType,
        key: 'numberFormats',
        editable: false,
        value: composer.numberFormats.value,
      },
    ]
    state[numberFormatsType] = numberFormatsStates
  }
  return state
}
function addTimelineEvent(event, payload) {
  if (devtoolsApi) {
    let groupId
    if (payload && 'groupId' in payload) {
      groupId = payload.groupId
      delete payload.groupId
    }
    devtoolsApi.addTimelineEvent({
      layerId: 'vue-i18n-timeline',
      event: {
        title: event,
        groupId,
        time: Date.now(),
        meta: {},
        data: payload || {},
        logType:
          event === 'compile-error'
            ? 'error'
            : event === 'fallback' || event === 'missing'
            ? 'warning'
            : 'default',
      },
    })
  }
}
function editScope(payload, i18n) {
  const composer = getComposer$1(payload.nodeId, i18n)
  if (composer) {
    const [field] = payload.path
    if (field === 'locale' && isString(payload.state.value)) {
      composer.locale.value = payload.state.value
    } else if (
      field === 'fallbackLocale' &&
      (isString(payload.state.value) ||
        isArray(payload.state.value) ||
        isObject(payload.state.value))
    ) {
      composer.fallbackLocale.value = payload.state.value
    } else if (field === 'inheritLocale' && isBoolean(payload.state.value)) {
      composer.inheritLocale = payload.state.value
    }
  }
}
const I18nInjectionKey = /* @__PURE__ */ makeSymbol('global-vue-i18n')
function createI18n(options = {}, VueI18nLegacy) {
  const __globalInjection = isBoolean(options.globalInjection)
    ? options.globalInjection
    : true
  const __allowComposition = true
  const __instances = /* @__PURE__ */ new Map()
  const [globalScope, __global] = createGlobal(options)
  const symbol = /* @__PURE__ */ makeSymbol(
    process.env.NODE_ENV !== 'production' ? 'vue-i18n' : '',
  )
  if (process.env.NODE_ENV !== 'production');
  function __getInstance(component) {
    return __instances.get(component) || null
  }
  function __setInstance(component, instance) {
    __instances.set(component, instance)
  }
  function __deleteInstance(component) {
    __instances.delete(component)
  }
  {
    const i18n = {
      // mode
      get mode() {
        return 'composition'
      },
      // allowComposition
      get allowComposition() {
        return __allowComposition
      },
      // install plugin
      async install(app, ...options2) {
        if ((process.env.NODE_ENV !== 'production' || false) && true) {
          app.__VUE_I18N__ = i18n
        }
        app.__VUE_I18N_SYMBOL__ = symbol
        app.provide(app.__VUE_I18N_SYMBOL__, i18n)
        if (isPlainObject(options2[0])) {
          const opts = options2[0]
          i18n.__composerExtend = opts.__composerExtend
          i18n.__vueI18nExtend = opts.__vueI18nExtend
        }
        let globalReleaseHandler = null
        if (__globalInjection) {
          globalReleaseHandler = injectGlobalFields(app, i18n.global)
        }
        {
          apply(app, i18n, ...options2)
        }
        const unmountApp = app.unmount
        app.unmount = () => {
          globalReleaseHandler && globalReleaseHandler()
          i18n.dispose()
          unmountApp()
        }
        if ((process.env.NODE_ENV !== 'production' || false) && true) {
          const ret = await enableDevTools(app, i18n)
          if (!ret) {
            throw createI18nError(
              I18nErrorCodes.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN,
            )
          }
          const emitter = createEmitter()
          {
            const _composer = __global
            _composer[EnableEmitter] && _composer[EnableEmitter](emitter)
          }
          emitter.on('*', addTimelineEvent)
        }
      },
      // global accessor
      get global() {
        return __global
      },
      dispose() {
        globalScope.stop()
      },
      // @internal
      __instances,
      // @internal
      __getInstance,
      // @internal
      __setInstance,
      // @internal
      __deleteInstance,
    }
    return i18n
  }
}
function useI18n(options = {}) {
  const instance = getCurrentInstance()
  if (instance == null) {
    throw createI18nError(I18nErrorCodes.MUST_BE_CALL_SETUP_TOP)
  }
  if (
    !instance.isCE &&
    instance.appContext.app != null &&
    !instance.appContext.app.__VUE_I18N_SYMBOL__
  ) {
    throw createI18nError(I18nErrorCodes.NOT_INSTALLED)
  }
  const i18n = getI18nInstance(instance)
  const gl = getGlobalComposer(i18n)
  const componentOptions = getComponentOptions(instance)
  const scope = getScope(options, componentOptions)
  if (scope === 'global') {
    adjustI18nResources(gl, options, componentOptions)
    return gl
  }
  if (scope === 'parent') {
    let composer2 = getComposer(i18n, instance, options.__useComponent)
    if (composer2 == null) {
      if (process.env.NODE_ENV !== 'production') {
        warn(getWarnMessage(I18nWarnCodes.NOT_FOUND_PARENT_SCOPE))
      }
      composer2 = gl
    }
    return composer2
  }
  const i18nInternal = i18n
  let composer = i18nInternal.__getInstance(instance)
  if (composer == null) {
    const composerOptions = assign({}, options)
    if ('__i18n' in componentOptions) {
      composerOptions.__i18n = componentOptions.__i18n
    }
    if (gl) {
      composerOptions.__root = gl
    }
    composer = createComposer(composerOptions)
    if (i18nInternal.__composerExtend) {
      composer[DisposeSymbol] = i18nInternal.__composerExtend(composer)
    }
    setupLifeCycle(i18nInternal, instance, composer)
    i18nInternal.__setInstance(instance, composer)
  }
  return composer
}
function createGlobal(options, legacyMode, VueI18nLegacy) {
  const scope = effectScope()
  {
    const obj = scope.run(() => createComposer(options))
    if (obj == null) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR)
    }
    return [scope, obj]
  }
}
function getI18nInstance(instance) {
  {
    const i18n = inject(
      !instance.isCE
        ? instance.appContext.app.__VUE_I18N_SYMBOL__
        : I18nInjectionKey,
    )
    if (!i18n) {
      throw createI18nError(
        !instance.isCE
          ? I18nErrorCodes.UNEXPECTED_ERROR
          : I18nErrorCodes.NOT_INSTALLED_WITH_PROVIDE,
      )
    }
    return i18n
  }
}
function getScope(options, componentOptions) {
  return isEmptyObject(options)
    ? '__i18n' in componentOptions
      ? 'local'
      : 'global'
    : !options.useScope
    ? 'local'
    : options.useScope
}
function getGlobalComposer(i18n) {
  return i18n.mode === 'composition' ? i18n.global : i18n.global.__composer
}
function getComposer(i18n, target, useComponent = false) {
  let composer = null
  const root = target.root
  let current = getParentComponentInstance(target, useComponent)
  while (current != null) {
    const i18nInternal = i18n
    if (i18n.mode === 'composition') {
      composer = i18nInternal.__getInstance(current)
    }
    if (composer != null) {
      break
    }
    if (root === current) {
      break
    }
    current = current.parent
  }
  return composer
}
function getParentComponentInstance(target, useComponent = false) {
  if (target == null) {
    return null
  }
  {
    return !useComponent ? target.parent : target.vnode.ctx || target.parent
  }
}
function setupLifeCycle(i18n, target, composer) {
  let emitter = null
  {
    onMounted(() => {
      if (
        (process.env.NODE_ENV !== 'production' || false) &&
        true &&
        target.vnode.el
      ) {
        target.vnode.el.__VUE_I18N__ = composer
        emitter = createEmitter()
        const _composer = composer
        _composer[EnableEmitter] && _composer[EnableEmitter](emitter)
        emitter.on('*', addTimelineEvent)
      }
    }, target)
    onUnmounted(() => {
      const _composer = composer
      if (
        (process.env.NODE_ENV !== 'production' || false) &&
        true &&
        target.vnode.el &&
        target.vnode.el.__VUE_I18N__
      ) {
        emitter && emitter.off('*', addTimelineEvent)
        _composer[DisableEmitter] && _composer[DisableEmitter]()
        delete target.vnode.el.__VUE_I18N__
      }
      i18n.__deleteInstance(target)
      const dispose = _composer[DisposeSymbol]
      if (dispose) {
        dispose()
        delete _composer[DisposeSymbol]
      }
    }, target)
  }
}
const globalExportProps = ['locale', 'fallbackLocale', 'availableLocales']
const globalExportMethods = ['t', 'rt', 'd', 'n', 'tm', 'te']
function injectGlobalFields(app, composer) {
  const i18n = /* @__PURE__ */ Object.create(null)
  globalExportProps.forEach((prop) => {
    const desc = Object.getOwnPropertyDescriptor(composer, prop)
    if (!desc) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR)
    }
    const wrap = isRef(desc.value)
      ? {
          get() {
            return desc.value.value
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          set(val) {
            desc.value.value = val
          },
        }
      : {
          get() {
            return desc.get && desc.get()
          },
        }
    Object.defineProperty(i18n, prop, wrap)
  })
  app.config.globalProperties.$i18n = i18n
  globalExportMethods.forEach((method) => {
    const desc = Object.getOwnPropertyDescriptor(composer, method)
    if (!desc || !desc.value) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR)
    }
    Object.defineProperty(app.config.globalProperties, `$${method}`, desc)
  })
  const dispose = () => {
    delete app.config.globalProperties.$i18n
    globalExportMethods.forEach((method) => {
      delete app.config.globalProperties[`$${method}`]
    })
  }
  return dispose
}
{
  initFeatureFlags()
}
if (__INTLIFY_JIT_COMPILATION__) {
  registerMessageCompiler(compile)
}
registerMessageResolver(resolveValue)
registerLocaleFallbacker(fallbackWithLocaleChain)
if (process.env.NODE_ENV !== 'production' || __INTLIFY_PROD_DEVTOOLS__) {
  const target = getGlobalThis()
  target.__INTLIFY__ = true
  setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__)
}
if (process.env.NODE_ENV !== 'production');
const messages = Object.fromEntries(
  Object.entries(
    /* @__PURE__ */ Object.assign({
      '../../locales/ar.yml': __vite_glob_0_0$2,
      '../../locales/de.yml': __vite_glob_0_1$2,
      '../../locales/en.yml': __vite_glob_0_2$2,
      '../../locales/es.yml': __vite_glob_0_3$1,
      '../../locales/fr.yml': __vite_glob_0_4,
      '../../locales/id.yml': __vite_glob_0_5,
      '../../locales/it.yml': __vite_glob_0_6,
      '../../locales/ja.yml': __vite_glob_0_7,
      '../../locales/ko.yml': __vite_glob_0_8,
      '../../locales/pl.yml': __vite_glob_0_9,
      '../../locales/pt-BR.yml': __vite_glob_0_10,
      '../../locales/ru.yml': __vite_glob_0_11,
      '../../locales/tr.yml': __vite_glob_0_12,
      '../../locales/vi.yml': __vite_glob_0_13,
      '../../locales/zh-CN.yml': __vite_glob_0_14,
    }),
  ).map(([key, value]) => {
    const yaml = key.endsWith('.yaml')
    return [key.slice(14, yaml ? -5 : -4), value.default]
  }),
)
function install$3({ app }) {
  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages,
  })
  app.use(i18n)
}
const __vite_glob_0_0$1 = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      install: install$3,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
)
function install$2({ isClient, router }) {
  if (isClient) {
    router.beforeEach((to, from) => {
      if (to.path !== from.path) NProgress.start()
    })
    router.afterEach(() => {
      NProgress.done()
    })
  }
}
const __vite_glob_0_1$1 = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      install: install$2,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
)
function install$1({ isClient, initialState, app }) {
  const pinia = createPinia()
  app.use(pinia)
  if (isClient) pinia.state.value = initialState.pinia || {}
  else initialState.pinia = pinia.state.value
}
const __vite_glob_0_2$1 = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      install: install$1,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
)
function install({ isClient, router }) {
  if (!isClient) return
  router.isReady().then(async () => {
    const { registerSW } = await import(
      './assets/virtual_pwa-register-BxF9dUh_.js'
    )
    registerSW({ immediate: true })
  })
}
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      install,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
)
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: '404',
  __ssrInlineRender: true,
  setup(__props) {
    useRouter()
    const { t } = useI18n()
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouterView = resolveComponent('RouterView')
      _push(
        `<main${ssrRenderAttrs(
          mergeProps(
            {
              p: 'x4 y10',
              text: 'center teal-700 dark:gray-200',
            },
            _attrs,
          ),
        )}><div text-4xl><div i-carbon-warning inline-block></div></div>`,
      )
      _push(ssrRenderComponent(_component_RouterView, null, null, _parent))
      _push(
        `<div><button btn text-sm m="3 t8">${ssrInterpolate(
          unref(t)('button.back'),
        )}</button></div></main>`,
      )
    }
  },
})
const _sfc_setup$5 = _sfc_main$5.setup
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    'src/layouts/404.vue',
  )
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      default: _sfc_main$5,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
)
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: 'Footer',
  __ssrInlineRender: true,
  setup(__props) {
    const { t, availableLocales, locale } = useI18n()
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouterLink = resolveComponent('RouterLink')
      _push(
        `<nav${ssrRenderAttrs(
          mergeProps(
            {
              'text-xl': '',
              'mt-6': '',
            },
            _attrs,
          ),
        )}>`,
      )
      _push(
        ssrRenderComponent(
          _component_RouterLink,
          {
            class: 'icon-btn mx-2',
            to: '/',
            title: unref(t)('button.home'),
          },
          {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div i-carbon-campsite${_scopeId}></div>`)
              } else {
                return [createVNode('div', { 'i-carbon-campsite': '' })]
              }
            }),
            _: 1,
          },
          _parent,
        ),
      )
      _push(
        `<button class="icon-btn mx-2 !outline-none"${ssrRenderAttr(
          'title',
          unref(t)('button.toggle_dark'),
        )}><div i="carbon-sun dark:carbon-moon"></div></button><a class="icon-btn mx-2"${ssrRenderAttr(
          'title',
          unref(t)('button.toggle_langs'),
        )}><div i-carbon-language></div></a>`,
      )
      _push(
        ssrRenderComponent(
          _component_RouterLink,
          {
            class: 'icon-btn mx-2',
            to: '/about',
            title: unref(t)('button.about'),
          },
          {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div i-carbon-dicom-overlay${_scopeId}></div>`)
              } else {
                return [createVNode('div', { 'i-carbon-dicom-overlay': '' })]
              }
            }),
            _: 1,
          },
          _parent,
        ),
      )
      _push(
        `<a class="icon-btn mx-2" rel="noreferrer" href="https://github.com/Simon-He95/vitesse" target="_blank" title="GitHub"><div i-carbon-logo-github></div></a></nav>`,
      )
    }
  },
})
const _sfc_setup$4 = _sfc_main$4.setup
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    'src/components/Footer.vue',
  )
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0
}
function _export_sfc(sfc, props) {
  const target = sfc.__vccOpts || sfc
  for (const [key, val] of props) {
    target[key] = val
  }
  return target
}
const _sfc_main$3 = {}
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_RouterView = resolveComponent('RouterView')
  const _component_Footer = _sfc_main$4
  _push(
    `<main${ssrRenderAttrs(
      mergeProps(
        { class: 'px-4 py-10 text-center text-gray-700 dark:text-gray-200' },
        _attrs,
      ),
    )}>`,
  )
  _push(ssrRenderComponent(_component_RouterView, null, null, _parent))
  _push(ssrRenderComponent(_component_Footer, null, null, _parent))
  _push(
    `<div class="mt-5 mx-auto text-center opacity-75 dark:opacity-50 text-sm"> [Default Layout] </div></main>`,
  )
}
const _sfc_setup$3 = _sfc_main$3.setup
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    'src/layouts/default.vue',
  )
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0
}
const _default = /* @__PURE__ */ _export_sfc(_sfc_main$3, [
  ['ssrRender', _sfc_ssrRender$1],
])
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      default: _default,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
)
const _sfc_main$2 = {}
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_RouterView = resolveComponent('RouterView')
  const _component_Footer = _sfc_main$4
  _push(
    `<main${ssrRenderAttrs(
      mergeProps(
        { class: 'px-4 py-10 text-center text-gray-700 dark:text-gray-200' },
        _attrs,
      ),
    )}>`,
  )
  _push(ssrRenderComponent(_component_RouterView, null, null, _parent))
  _push(ssrRenderComponent(_component_Footer, null, null, _parent))
  _push(
    `<div class="mt-5 mx-auto text-center opacity-75 dark:opacity-50 text-sm"> [Home Layout] </div></main>`,
  )
}
const _sfc_setup$2 = _sfc_main$2.setup
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    'src/layouts/home.vue',
  )
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0
}
const home = /* @__PURE__ */ _export_sfc(_sfc_main$2, [
  ['ssrRender', _sfc_ssrRender],
])
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      default: home,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
)
function setupLayouts(routes2) {
  const layouts = {}
  const modules = /* @__PURE__ */ Object.assign({
    '/src/layouts/404.vue': __vite_glob_0_0,
    '/src/layouts/default.vue': __vite_glob_0_1,
    '/src/layouts/home.vue': __vite_glob_0_2,
  })
  Object.entries(modules).forEach(([name, module]) => {
    const key = name.replace('/src/layouts/', '').replace('.vue', '')
    layouts[key] = module.default
  })
  function deepSetupLayout(routes3, top = true) {
    return routes3.map((route) => {
      let _a, _b, _c, _d, _e, _f
      if (((_a = route.children) == null ? void 0 : _a.length) > 0) {
        route.children = deepSetupLayout(route.children, false)
      }
      if (top) {
        const skipLayout =
          !route.component &&
          ((_b = route.children) == null
            ? void 0
            : _b.find((r) => {
                let _a2
                return (
                  (r.path === '' || r.path === '/') &&
                  ((_a2 = r.meta) == null ? void 0 : _a2.isLayout)
                )
              }))
        if (skipLayout) {
          return route
        }
        if (((_c = route.meta) == null ? void 0 : _c.layout) !== false) {
          return {
            path: route.path,
            component:
              layouts[
                ((_d = route.meta) == null ? void 0 : _d.layout) || 'default'
              ],
            children: route.path === '/' ? [route] : [{ ...route, path: '' }],
            meta: {
              isLayout: true,
            },
          }
        }
      }
      if ((_e = route.meta) == null ? void 0 : _e.layout) {
        return {
          path: route.path,
          component: layouts[(_f = route.meta) == null ? void 0 : _f.layout],
          children: [{ ...route, path: '' }],
          meta: {
            isLayout: true,
          },
        }
      }
      return route
    })
  }
  return deepSetupLayout(routes2)
}
const isDark = useDark()
useToggle(isDark)
const preferredDark = usePreferredDark()
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: 'App',
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: 'Vitesse',
      meta: [
        { name: 'description', content: 'Opinionated Vite Starter Template' },
        {
          name: 'theme-color',
          content: computed(() => (isDark.value ? '#00aba9' : '#ffffff')),
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: computed(() =>
            preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg',
          ),
        },
      ],
    })
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouterView = resolveComponent('RouterView')
      _push(ssrRenderComponent(_component_RouterView, _attrs, null, _parent))
    }
  },
})
const _sfc_setup$1 = _sfc_main$1.setup
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    'src/App.vue',
  )
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0
}
const useUserStore = defineStore('user', () => {
  const savedName = ref('')
  const previousNames = ref(/* @__PURE__ */ new Set())
  const usedNames = computed(() => Array.from(previousNames.value))
  const otherNames = computed(() =>
    usedNames.value.filter((name) => name !== savedName.value),
  )
  function setNewName(name) {
    if (savedName.value) previousNames.value.add(savedName.value)
    savedName.value = name
  }
  return {
    setNewName,
    otherNames,
    savedName,
  }
})
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'index',
  __ssrInlineRender: true,
  setup(__props) {
    const user = useUserStore()
    const name = ref(user.savedName)
    useRouter()
    const { t } = useI18n()
    return (_ctx, _push, _parent, _attrs) => {
      _push(
        `<div${ssrRenderAttrs(
          _attrs,
        )}><div text-4xl><div i-carbon-campsite inline-block></div></div><p><a rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank"> Vitesse </a></p><p><em text-sm opacity-75>${ssrInterpolate(
          unref(t)('intro.desc'),
        )}</em></p><div py-4></div><input id="input"${ssrRenderAttr(
          'value',
          unref(name),
        )}${ssrRenderAttr(
          'placeholder',
          unref(t)('intro.whats-your-name'),
        )}${ssrRenderAttr(
          'aria-label',
          unref(t)('intro.whats-your-name'),
        )} type="text" autocomplete="false" p="x4 y2" w="250px" text="center" bg="transparent" border="~ rounded gray-200 dark:gray-700" outline="none active:none"><label class="hidden" for="input">${ssrInterpolate(
          unref(t)('intro.whats-your-name'),
        )}</label><div><button btn m-3 text-sm${
          ssrIncludeBooleanAttr(!unref(name)) ? ' disabled' : ''
        }>${ssrInterpolate(unref(t)('button.go'))}</button></div></div>`,
      )
    }
  },
})
const block0 = {}
if (typeof block0 === 'function') block0(_sfc_main)
const _sfc_setup = _sfc_main.setup
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    'src/pages/index.vue',
  )
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0
}
const __pages_import_1__ = () => import('./assets/about-1M0CTAyS.js')
const __pages_import_2__ = () => import('./assets/README-YjY7NVuZ.js')
const __pages_import_3__ = () => import('./assets/_...all_-DE1pDQIS.js')
const __pages_import_4__ = () => import('./assets/_name_-DulrCJYU.js')
const routes$1 = [
  {
    name: 'index',
    path: '/',
    component: _sfc_main,
    props: true,
    meta: { layout: 'home' },
  },
  { name: 'about', path: '/about', component: __pages_import_1__, props: true },
  {
    name: 'README',
    path: '/readme',
    component: __pages_import_2__,
    props: true,
  },
  {
    name: 'all',
    path: '/:all(.*)*',
    component: __pages_import_3__,
    props: true,
    meta: { layout: 404 },
  },
  {
    name: 'hi-name',
    path: '/hi/:name',
    component: __pages_import_4__,
    props: true,
  },
]
const routes = setupLayouts(routes$1)
const createApp = ViteSSG(_sfc_main$1, { routes, base: '/' }, (ctx) => {
  Object.values(
    /* @__PURE__ */ Object.assign({
      './modules/i18n.ts': __vite_glob_0_0$1,
      './modules/nprogress.ts': __vite_glob_0_1$1,
      './modules/pinia.ts': __vite_glob_0_2$1,
      './modules/pwa.ts': __vite_glob_0_3,
    }),
  ).forEach((i) => {
    let _a
    return (_a = i.install) == null ? void 0 : _a.call(i, ctx)
  })
})
export { useUserStore as a, block0 as b, createApp, useI18n as u }
