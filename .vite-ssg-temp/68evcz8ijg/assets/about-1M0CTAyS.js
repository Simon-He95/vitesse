import { mergeProps, useSSRContext } from 'vue'
import { ssrRenderAttrs, ssrRenderStyle } from 'vue/server-renderer'
import { useHead } from '@unhead/vue'

const title = 'About'
const meta = [
  { property: 'og:title', content: 'About' },
  { name: 'twitter:title', content: 'About' },
]
const _sfc_main = {
  __name: 'about',
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const frontmatter = {
      title: 'About',
      meta: [
        { property: 'og:title', content: 'About' },
        { name: 'twitter:title', content: 'About' },
      ],
    }
    __expose({ frontmatter })
    const head = {
      title: 'About',
      meta: [
        { property: 'og:title', content: 'About' },
        { name: 'twitter:title', content: 'About' },
      ],
    }
    useHead(head)
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(
        mergeProps({ class: 'prose prose-sm m-auto text-left' }, _attrs),
      )}><div class="text-center"><div i-carbon-dicom-overlay class="text-4xl -mb-6 m-auto"></div><h3>About</h3></div><p><a href="https://github.com/antfu/vitesse" target="_blank" rel="noopener">Vitesse</a> is an opinionated <a href="https://github.com/vitejs/vite" target="_blank" rel="noopener">Vite</a> starter template made by <a href="https://github.com/antfu" target="_blank" rel="noopener">@antfu</a> for mocking apps swiftly. With <strong>file-based routing</strong>, <strong>components auto importing</strong>, <strong>markdown support</strong>, I18n, PWA and uses <strong>UnoCSS</strong> for styling and icons.</p><pre><code class="language-js"><div class="shiki-container"><pre class="shiki shiki-dark" style="${ssrRenderStyle(
        { 'background-color': '#121212' },
      )}"><code v-pre><span class="line"><span style="${ssrRenderStyle({
        color: '#758575',
      })}">// syntax highlighting example</span></span>
<span class="line"><span style="${ssrRenderStyle({
        color: '#CB7676',
      })}">function</span><span style="${ssrRenderStyle({
        color: '#DBD7CA',
      })}"> </span><span style="${ssrRenderStyle({
        color: '#A1B567',
      })}">vitesse</span><span style="${ssrRenderStyle({
        color: '#858585',
      })}">()</span><span style="${ssrRenderStyle({
        color: '#DBD7CA',
      })}"> </span><span style="${ssrRenderStyle({
        color: '#858585',
      })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({
        color: '#DBD7CA',
      })}">  </span><span style="${ssrRenderStyle({
        color: '#CB7676',
      })}">const</span><span style="${ssrRenderStyle({
        color: '#DBD7CA',
      })}"> </span><span style="${ssrRenderStyle({
        color: '#D4976C',
      })}">foo</span><span style="${ssrRenderStyle({
        color: '#DBD7CA',
      })}"> </span><span style="${ssrRenderStyle({
        color: '#CB7676',
      })}">=</span><span style="${ssrRenderStyle({
        color: '#DBD7CA',
      })}"> </span><span style="${ssrRenderStyle({
        color: '#C98A7D',
      })}">&#39;bar&#39;</span></span>
<span class="line"><span style="${ssrRenderStyle({
        color: '#DBD7CA',
      })}">  </span><span style="${ssrRenderStyle({
        color: '#B8A965',
      })}">console</span><span style="${ssrRenderStyle({
        color: '#858585',
      })}">.</span><span style="${ssrRenderStyle({
        color: '#A1B567',
      })}">log</span><span style="${ssrRenderStyle({
        color: '#858585',
      })}">(</span><span style="${ssrRenderStyle({
        color: '#B8A965',
      })}">foo</span><span style="${ssrRenderStyle({
        color: '#858585',
      })}">)</span></span>
<span class="line"><span style="${ssrRenderStyle({
        color: '#858585',
      })}">}</span></span>
<span class="line"></span></code></pre><pre class="shiki shiki-light" style="${ssrRenderStyle(
        { 'background-color': '#ffffff' },
      )}"><code v-pre><span class="line"><span style="${ssrRenderStyle({
        color: '#A0ADA0',
      })}">// syntax highlighting example</span></span>
<span class="line"><span style="${ssrRenderStyle({
        color: '#AB5959',
      })}">function</span><span style="${ssrRenderStyle({
        color: '#393A34',
      })}"> </span><span style="${ssrRenderStyle({
        color: '#6C7834',
      })}">vitesse</span><span style="${ssrRenderStyle({
        color: '#8E8F8B',
      })}">()</span><span style="${ssrRenderStyle({
        color: '#393A34',
      })}"> </span><span style="${ssrRenderStyle({
        color: '#8E8F8B',
      })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({
        color: '#393A34',
      })}">  </span><span style="${ssrRenderStyle({
        color: '#AB5959',
      })}">const</span><span style="${ssrRenderStyle({
        color: '#393A34',
      })}"> </span><span style="${ssrRenderStyle({
        color: '#A65E2B',
      })}">foo</span><span style="${ssrRenderStyle({
        color: '#393A34',
      })}"> </span><span style="${ssrRenderStyle({
        color: '#AB5959',
      })}">=</span><span style="${ssrRenderStyle({
        color: '#393A34',
      })}"> </span><span style="${ssrRenderStyle({
        color: '#B56959',
      })}">&#39;bar&#39;</span></span>
<span class="line"><span style="${ssrRenderStyle({
        color: '#393A34',
      })}">  </span><span style="${ssrRenderStyle({
        color: '#8C862B',
      })}">console</span><span style="${ssrRenderStyle({
        color: '#8E8F8B',
      })}">.</span><span style="${ssrRenderStyle({
        color: '#6C7834',
      })}">log</span><span style="${ssrRenderStyle({
        color: '#8E8F8B',
      })}">(</span><span style="${ssrRenderStyle({
        color: '#8C862B',
      })}">foo</span><span style="${ssrRenderStyle({
        color: '#8E8F8B',
      })}">)</span></span>
<span class="line"><span style="${ssrRenderStyle({
        color: '#8E8F8B',
      })}">}</span></span>
<span class="line"></span></code></pre></div></code></pre><p>Check out the <a href="https://github.com/antfu/vitesse" target="_blank" rel="noopener">GitHub repo</a> for more details.</p></div>`)
    }
  },
}
const _sfc_setup = _sfc_main.setup
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    'src/pages/about.md',
  )
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0
}
export { _sfc_main as default, meta, title }
