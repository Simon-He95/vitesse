import { mergeProps, useSSRContext } from 'vue'
import { ssrRenderAttrs, ssrRenderStyle } from 'vue/server-renderer'
import { useHead } from '@unhead/vue'
const meta = []
const _sfc_main = {
  __name: 'README',
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const frontmatter = { meta: [] }
    __expose({ frontmatter })
    const head = { meta: [] }
    useHead(head)
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(
        mergeProps({ class: 'prose prose-sm m-auto text-left' }, _attrs),
      )}><h2>File-based Routing</h2><p>Routes will be auto-generated for Vue files in this dir with the same file structure. Check out <a href="https://github.com/hannoeru/vite-plugin-pages" target="_blank" rel="noopener"><code>vite-plugin-pages</code></a> for more details.</p><h3>Path Aliasing</h3><p><code>~/</code> is aliased to <code>./src/</code> folder.</p><p>For example, instead of having</p><pre><code class="language-ts"><div class="shiki-container"><pre class="shiki shiki-dark" style="${ssrRenderStyle(
        { 'background-color': '#121212' },
      )}"><code v-pre><span class="line"><span style="${ssrRenderStyle({
        color: '#4D9375',
      })}">import</span><span style="${ssrRenderStyle({
        color: '#DBD7CA',
      })}"> </span><span style="${ssrRenderStyle({
        color: '#858585',
      })}">{</span><span style="${ssrRenderStyle({
        color: '#DBD7CA',
      })}"> </span><span style="${ssrRenderStyle({
        color: '#B8A965',
      })}">isDark</span><span style="${ssrRenderStyle({
        color: '#DBD7CA',
      })}"> </span><span style="${ssrRenderStyle({
        color: '#858585',
      })}">}</span><span style="${ssrRenderStyle({
        color: '#DBD7CA',
      })}"> </span><span style="${ssrRenderStyle({
        color: '#4D9375',
      })}">from</span><span style="${ssrRenderStyle({
        color: '#DBD7CA',
      })}"> </span><span style="${ssrRenderStyle({
        color: '#C98A7D',
      })}">&#39;../../../../composables&#39;</span></span>
<span class="line"></span></code></pre><pre class="shiki shiki-light" style="${ssrRenderStyle(
        { 'background-color': '#ffffff' },
      )}"><code v-pre><span class="line"><span style="${ssrRenderStyle({
        color: '#1C6B48',
      })}">import</span><span style="${ssrRenderStyle({
        color: '#393A34',
      })}"> </span><span style="${ssrRenderStyle({
        color: '#8E8F8B',
      })}">{</span><span style="${ssrRenderStyle({
        color: '#393A34',
      })}"> </span><span style="${ssrRenderStyle({
        color: '#8C862B',
      })}">isDark</span><span style="${ssrRenderStyle({
        color: '#393A34',
      })}"> </span><span style="${ssrRenderStyle({
        color: '#8E8F8B',
      })}">}</span><span style="${ssrRenderStyle({
        color: '#393A34',
      })}"> </span><span style="${ssrRenderStyle({
        color: '#1C6B48',
      })}">from</span><span style="${ssrRenderStyle({
        color: '#393A34',
      })}"> </span><span style="${ssrRenderStyle({
        color: '#B56959',
      })}">&#39;../../../../composables&#39;</span></span>
<span class="line"></span></code></pre></div></code></pre><p>now, you can use</p><pre><code class="language-ts"><div class="shiki-container"><pre class="shiki shiki-dark" style="${ssrRenderStyle(
        { 'background-color': '#121212' },
      )}"><code v-pre><span class="line"><span style="${ssrRenderStyle({
        color: '#4D9375',
      })}">import</span><span style="${ssrRenderStyle({
        color: '#DBD7CA',
      })}"> </span><span style="${ssrRenderStyle({
        color: '#858585',
      })}">{</span><span style="${ssrRenderStyle({
        color: '#DBD7CA',
      })}"> </span><span style="${ssrRenderStyle({
        color: '#B8A965',
      })}">isDark</span><span style="${ssrRenderStyle({
        color: '#DBD7CA',
      })}"> </span><span style="${ssrRenderStyle({
        color: '#858585',
      })}">}</span><span style="${ssrRenderStyle({
        color: '#DBD7CA',
      })}"> </span><span style="${ssrRenderStyle({
        color: '#4D9375',
      })}">from</span><span style="${ssrRenderStyle({
        color: '#DBD7CA',
      })}"> </span><span style="${ssrRenderStyle({
        color: '#C98A7D',
      })}">&#39;~/composables&#39;</span></span>
<span class="line"></span></code></pre><pre class="shiki shiki-light" style="${ssrRenderStyle(
        { 'background-color': '#ffffff' },
      )}"><code v-pre><span class="line"><span style="${ssrRenderStyle({
        color: '#1C6B48',
      })}">import</span><span style="${ssrRenderStyle({
        color: '#393A34',
      })}"> </span><span style="${ssrRenderStyle({
        color: '#8E8F8B',
      })}">{</span><span style="${ssrRenderStyle({
        color: '#393A34',
      })}"> </span><span style="${ssrRenderStyle({
        color: '#8C862B',
      })}">isDark</span><span style="${ssrRenderStyle({
        color: '#393A34',
      })}"> </span><span style="${ssrRenderStyle({
        color: '#8E8F8B',
      })}">}</span><span style="${ssrRenderStyle({
        color: '#393A34',
      })}"> </span><span style="${ssrRenderStyle({
        color: '#1C6B48',
      })}">from</span><span style="${ssrRenderStyle({
        color: '#393A34',
      })}"> </span><span style="${ssrRenderStyle({
        color: '#B56959',
      })}">&#39;~/composables&#39;</span></span>
<span class="line"></span></code></pre></div></code></pre></div>`)
    }
  },
}
const _sfc_setup = _sfc_main.setup
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    'src/pages/README.md',
  )
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0
}
export { _sfc_main as default, meta }
