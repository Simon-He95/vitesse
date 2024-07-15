import { defineComponent, unref, useSSRContext } from 'vue'
import { ssrInterpolate, ssrRenderAttrs } from 'vue/server-renderer'
import { b as block0, u as useI18n } from '../main.mjs'
import '@intlify/shared'
import '@intlify/core-base'
import '@vue/devtools-api'
import 'nprogress'
import 'pinia'
import 'vite-ssg'
import 'vue-router'
import '@vueuse/head'
import '@vueuse/core'

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: '[...all]',
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n()
    return (_ctx, _push, _parent, _attrs) => {
      _push(
        `<div${ssrRenderAttrs(_attrs)}>${ssrInterpolate(
          unref(t)('not-found'),
        )}</div>`,
      )
    }
  },
})
if (typeof block0 === 'function') block0(_sfc_main)
const _sfc_setup = _sfc_main.setup
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    'src/pages/[...all].vue',
  )
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0
}
export { _sfc_main as default }
