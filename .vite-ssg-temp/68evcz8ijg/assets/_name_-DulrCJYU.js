import { useRouter } from 'vue-router'
import {
  createTextVNode,
  defineComponent,
  resolveComponent,
  toDisplayString,
  unref,
  useSSRContext,
  watchEffect,
  withCtx,
} from 'vue'
import {
  ssrInterpolate,
  ssrRenderAttrs,
  ssrRenderComponent,
  ssrRenderList,
} from 'vue/server-renderer'
import { u as useI18n, a as useUserStore } from '../main.mjs'
import '@intlify/shared'
import '@intlify/core-base'
import '@vue/devtools-api'
import 'nprogress'
import 'pinia'
import 'vite-ssg'
import '@vueuse/head'
import '@vueuse/core'

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: '[name]',
  __ssrInlineRender: true,
  props: {
    name: {},
  },
  setup(__props) {
    const props = __props
    useRouter()
    const user = useUserStore()
    const { t } = useI18n()
    watchEffect(() => {
      user.setNewName(props.name)
    })
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent('router-link')
      _push(
        `<div${ssrRenderAttrs(
          _attrs,
        )}><div text-4xl><div i-carbon-pedestrian inline-block></div></div><p>${ssrInterpolate(
          unref(t)('intro.hi', { name: props.name }),
        )}</p><p text-sm opacity-75><em>${ssrInterpolate(
          unref(t)('intro.dynamic-route'),
        )}</em></p>`,
      )
      if (unref(user).otherNames.length) {
        _push(
          `<p text-sm mt-4><span opacity-75>${ssrInterpolate(
            unref(t)('intro.aka'),
          )}:</span><ul><!--[-->`,
        )
        ssrRenderList(unref(user).otherNames, (otherName) => {
          _push(`<li>`)
          _push(
            ssrRenderComponent(
              _component_router_link,
              {
                to: `/hi/${otherName}`,
                replace: '',
              },
              {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(otherName)}`)
                  } else {
                    return [createTextVNode(toDisplayString(otherName), 1)]
                  }
                }),
                _: 2,
              },
              _parent,
            ),
          )
          _push(`</li>`)
        })
        _push(`<!--]--></ul></p>`)
      } else {
        _push(`<!---->`)
      }
      _push(
        `<div><button btn m="3 t6" text-sm>${ssrInterpolate(
          unref(t)('button.back'),
        )}</button></div></div>`,
      )
    }
  },
})
const _sfc_setup = _sfc_main.setup
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    'src/pages/hi/[name].vue',
  )
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0
}
export { _sfc_main as default }
