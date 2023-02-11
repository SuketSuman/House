var Themify;((d,m,g,$,p)=>{'use strict';const i=(e,s,i,a,l)=>{for(let t=(i='string'==typeof i?i.split(' '):i).length-1;-1<t;--t)!0===e?s.addEventListener(i[t],a,l):s.removeEventListener(i[t],a,l);return s};Node.prototype.tfClass=function(t){return this.getElementsByClassName(t)},Node.prototype.tfTag=function(t){return this.getElementsByTagName(t)},Node.prototype.tfId=function(t){return this.getElementById(t)},EventTarget.prototype.tfOn=function(t,e,s){return i(!0,this,t,e,s)},EventTarget.prototype.tfOff=function(t,e,s){return i(null,this,t,e,s)},(Themify={events:new Map,cssLazy:new Map,jsLazy:new Map,fontsQueue:new Set,device:'desktop',lazyScrolling:null,observer:null,triggerEvent(t,e,s,i){let a;return!0===i||'click'===e||'submit'===e||'input'===e||'resize'===e||'change'===e&&!s||0===e.indexOf('pointer')||0===e.indexOf('touch')||0===e.indexOf('mouse')?((s=s||{}).bubbles===g&&(s.bubbles=!0),s.cancelable===g&&(s.cancelable=!0),a=new('click'===e&&d.PointerEvent||0===e.indexOf('pointer')?PointerEvent:'click'===e||0===e.indexOf('mouse')?MouseEvent:Event)(e,s),Object.defineProperty(a,'target',{value:s.target||t,enumerable:!0})):a=new d.CustomEvent(e,{detail:s}),t.dispatchEvent(a),this},on(s,i,a,t){if(!0!==t||(i(),!0!==a)){const l=(s=s.split(' ')).length;for(let e=l-1;-1<e;--e){let t=this.events.get(s[e])||new Map;t.set(i,!!a),this.events.set(s[e],t)}}return this},off(t,e){const s=this.events.get(t);return s===g||e&&(s.delete(e),0!==s.size)||this.events.delete(t),this},trigger(t,s){const i=this.events.get(t),a=[];if(i!==g){s===g||Array.isArray(s)||(s=[s]);for(let[e,t]of i){try{let t=e.apply(null,s);t!==g&&t instanceof Promise&&a.push(t)}catch(t){console.error(t)}!0===t&&i.delete(e)}0===i.size&&this.events.delete(t)}return 0===a.length&&s!==g&&a.push(Promise.resolve(s)),Promise.all(a)},requestIdleCallback(t,e,s){d.requestIdleCallback?d.requestIdleCallback(t,{timeout:e}):(e=0<s?s:e<0?2500:e,setTimeout(t,e))},parseVideo(t){const e=t.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?\/?([A-Za-z0-9._%-]*)(\&\S+)?/i),s={type:null!==e&&(-1<e[3].indexOf('youtu')?'youtube':-1<e[3].indexOf('vimeo')&&'vimeo'),id:null!==e&&e[6]};return'vimeo'===s.type&&e[8]&&(s.h=e[8]),s},hash(e){let s=0;for(let t=e.length-1;-1<t;--t)s=(s<<5)-s+e.charCodeAt(t),s&=s;return s},scrollTo(t,e,s,i){e=e||800,t=t||0;const a=$('html,body'),l='smooth'===a.css('scroll-behavior');l&&a.css('scroll-behavior','auto'),a.stop().animate({scrollTop:t},{progress:i,duration:e,done(){l&&a.css('scroll-behavior',''),s&&s()}})},imagesLoad(s){return new Promise(t=>{if(null!==s){const i=[];for(let t=(s=s.length===g?[s]:s).length-1;-1<t;--t){let e='IMG'===s[t].tagName?[s[t]]:s[t].tfTag('img');for(let t=e.legnth-1;-1<t;--t)if(!e[t].complete){let s=e[t];i.push(new Promise((t,e)=>{s.onload=t,s.onerror=e,s=null}))}}Promise.all(i).finally(()=>{t(s[0])})}else t()})},updateQueryString(t,e,s){s=s||d.location.href;const i=new URL(s,d.location),a=i.searchParams;null===e?a.delete(t):a.set(t,e);let l=a.toString();return''!==l&&(l='?'+l),s.split('?')[0]+l+i.hash},selectWithParent(t,e){let s=null;const i=-1===t.indexOf('.')&&-1===t.indexOf('['),a=1==i&&('video'===t||'audio'===t||'img'===t);return(e=e&&e[0]!==g?e[0]:e)?(s=0==i?e.querySelectorAll(t):1==a?e.tfTag(t):e.tfClass(t),(1==i&&e.classList.contains(t)||0==i&&e.matches(t)||1==a&&e.tagName.toLowerCase()===t)&&(s=this.convert(s,e))):s=0==i?m.querySelectorAll(t):1==a?m.tfTag(t):m.tfClass(t),s},convert(t,e){let s=t.length;const i=new Array(s);for(;s--;)i[s]=t[s];return e&&i.push(e),i},init(){this.is_builder_active=m.body.classList.contains('themify_builder_active'),this.body=$('body');const t=()=>{if(this.w=d.innerWidth,this.h=d.innerHeight,this.isRTL=m.body.classList.contains('rtl'),this.isTouch=!!('ontouchstart'in d||0<navigator.msMaxTouchPoints),this.lazyDisable=!0===this.is_builder_active||m.body.classList.contains('tf_lazy_disable'),this.click=this.isTouch?'pointerdown':'click',this.isTouch){const t=screen.orientation!==g&&screen.orientation.angle!==g?screen.orientation.angle:d.orientation,e=90===t||-90===t?this.h:this.w;e<769&&(this.device=e<681?'mobile':'tablet')}requestAnimationFrame(()=>{if(null!==this.urlArgs&&(this.urlArgs='&'+new URLSearchParams({media:this.urlArgs}).toString()),this.cssUrl=this.url+'css/modules/',this.builder_url=p.theme_v?this.url+'themify-builder/':this.url.substring(0,this.url.slice(0,-1).lastIndexOf('/')+1),p.done!==g&&(this.cssLazy=new Map(Object.entries(p.done))),this.requestIdleCallback(()=>{this.mobileMenu()},40),this.trigger('tf_init'),d.loaded=!0,!p.is_admin){if(p.theme_v&&(p.theme_url=this.url.split('/').slice(0,-2).join('/'),this.loadJs(p.theme_url+'/js/themify.script',null,p.theme_v)),!1===this.is_builder_active){const t=d.tbLocalScript&&m.tfClass('module_row')[0]?this.loadJs(this.builder_url+'js/themify.builder.script'):Promise.resolve();t.then(()=>{this.lazyLoading()}),this.requestIdleCallback(()=>{this.commonJs()},-1),this.requestIdleCallback(()=>{this.tooltips()},110)}this.requestIdleCallback(()=>{this.wc()},50),this.requestIdleCallback(()=>{this.touchDropDown()},60),setTimeout(()=>{this.requestIdleCallback(()=>{this.gallery()},100),this.googleAnalytics()},800)}this.requestIdleCallback(()=>{this.resizer()},-1,2e3)})},e=m.currentScript,s=new URL(e.src,d.location.origin);this.is_min=-1!==s.href.indexOf('.min.js'),this.v=s.searchParams.get('ver')||e.dataset.v,this.urlArgs=s.searchParams.get('media')||null,this.urlHost=s.hostname,this.url=s.href.split('js/main.')[0].trim(),this.cdnPlugin=e.dataset.pl.split('?')[0].replace('/fake.css',''),'complete'===m.readyState||!0===this.is_builder_active?this.requestIdleCallback(t,50):d.tfOn('load',t,{once:!0,passive:!0}),d.self!==d.top&&typeof d.wp?.customize===g&&(m.body.className+=' lightboxed')},async initComponents(s,i){if(!0!==i||'IMG'!==s.tagName){let e;const a={VIDEO:'video',AUDIO:'audio',auto_tiles:'autoTiles',tf_carousel:'carousel',themify_map:'map','[data-lax]':'lax',masonry:'isotop',tf_search_form:'ajaxSearch',tf_sticky_form_wrap:'stickyBuy'},l=[];for(let t in a)!(e=null)===i?'tf_sticky_form_wrap'===t?s.id===t&&(e=[s]):'[data-lax]'===t?s.hasAttribute('data-lax')&&(e=[s]):(s.tagName===t||s.classList.contains(t)||'tf_search_form'===t&&s.classList.contains('tf_search_icon'))&&(e=[s]):e=this.selectWithParent(t.toLowerCase(),s),null!==e&&0<e.length&&l.push(this[a[t]](e));return!(e=null)===i?s.classList.contains('wp-embedded-content')?e=[s]:l.push(this.wpEmbed(s.tfClass('wp-embedded-content'))):e=this.selectWithParent('wp-embedded-content',s),null!==e&&0<e.length&&l.push(this.wpEmbed(e)),e=null,this.largeImages(s),Promise.all(l)}},fixedHeader(s){if(!this.is_builder_active)return new Promise((t,e)=>{this.loadJs('fixedheader').then(()=>{this.requestIdleCallback(()=>{this.trigger('tf_fixed_header_init',s),t()},50)}).catch(e)})},async lax(t,e){(!0===e||!this.is_builder_active)&&0<t.length&&(await this.loadJs('lax'),this.trigger('tf_lax_init',[t]))},async video(i){if(i&&0<i.length){for(let s=i.length-1;-1<s;--s){let e=i[s].dataset.poster;if(e){let t=new Image;t.src=e,t.decode().catch(()=>{}).finally(()=>{i[s].poster=e}),i[s].removeAttribute('data-poster')}}await this.loadJs('video-player'),this.trigger('tf_video_init',[i])}},async audio(t,e){t&&0<t.length&&(await Promise.all([this.loadCss('audio','tf_audio'),this.loadJs('audio-player')]),this.trigger('tf_audio_init',[t,e]))},async sideMenu(t,e){t&&(0<t.length||t.length===g)&&(await this.loadJs('themify.sidemenu'),this.trigger('tf_sidemenu_init',[t,e]))},async edgeMenu(t){m.tfClass('sub-menu')[0]!==g&&(await this.loadJs('edge.Menu'),this.trigger('tf_edge_init',t))},async sharer(t,e,s){await this.loadJs('sharer'),this.trigger('tf_sharer_init',[t,e,s])},async autoTiles(t){await this.loadJs('autoTiles'),this.trigger('tf_autotiles_init',[t])},async map(t){await this.loadJs('map'),this.trigger('tf_map_init',[t])},async carousel(t,e){t&&(await this.loadJs('themify.carousel'),this.trigger('tf_carousel_init',[t,e]))},async infinity(t,e){!t||0===t.length||!0===this.is_builder_active||!e.button&&e.hasOwnProperty('button')||e.path&&'string'==typeof e.path&&null===m.querySelector(e.path)||(e.append&&null===m.querySelector(e.append)?e.button&&(e.button.style.display='block'):(await this.loadJs('infinite'),this.trigger('tf_infinite_init',[t,e])))},async isotop(s,t){const i=[];for(let e=(s=s.length===g?[s]:s).length-1;-1<e;--e){let t=s[e].classList;t.contains('masonry-done')||t.contains('auto_tiles')&&t.contains('list-post')&&s[e].previousElementSibling&&!s[e].previousElementSibling.classList.contains('post-filter')||i.push(s[e])}0<i.length&&(await Promise.all([this.loadJs('jquery.isotope.min',void 0!==$.fn.packery,'3.0.6'),this.loadJs('isotop')]),this.trigger('tf_isotop_init',[i,t]))},fonts(o){return new Promise((t,e)=>{o?'string'==typeof o?o=[o]:Array.isArray(o)||(o instanceof jQuery&&(o=o[0]),o=this.selectWithParent('tf_fa',o)):o=m.tfClass('tf_fa');const s=new Set,i=[],a=[],c=m.tfId('tf_svg').firstChild,l=c.tfTag('symbol');for(let t=l.length-1;-1<t;--t)s.add(l[t].id),s.add(l[t].id.replace('tf-',''));for(let e=o.length-1;-1<e;--e)if(o[e].tagName===g||'svg'===o[e].tagName){let t=o[e].classList?o[e].classList[1]:o[e];if(t&&!s.has(t)){if(!this.fontsQueue.has(t)){this.fontsQueue.add(t);let e=t.replace('tf-',''),s=e.split('-');if('fas'===s[0]||'far'===s[0]||'fab'===s[0]){let t=s[0];s.shift(),e=t+' '+s.join('-')}i.push(e)}if(o[e].classList){let t=o[e].parentNode;t.classList.add('tf_lazy'),a.push(t)}}}if(0<i.length){const n=this.is_builder_active?5:2e3;setTimeout(()=>{this.fetch({action:'tf_load_icons',icons:JSON.stringify(i)},null,{credentials:'omit'}).then(l=>{const n=m.createDocumentFragment(),o='http://www.w3.org/2000/svg',r=[];for(let a in l){let t=m.createElementNS(o,'symbol'),e=m.createElementNS(o,'path'),s='tf-'+a.replace(' ','-'),i;i="0 0 "+(l[a].vw!==g&&''!==l[a].vw?l[a].vw:'32')+' '+(l[a].vh!==g&&''!==l[a].vh?l[a].vh:'32'),t.id=s,t.setAttributeNS(null,'viewBox',i),e.setAttributeNS(null,'d',l[a].p),t.appendChild(e),n.appendChild(t),l[a].w&&r.push('.tf_fa.'+s+'{width:'+l[a].w+'em}')}if(c.appendChild(n),0<r.length){let t=m.tfId('tf_fonts_style');null===t&&((t=m.createElement('style')).id='tf_fonts_style',c.appendChild(t)),t.textContent+=r.join('')}this.fontsQueue.clear();for(let t=a.length-1;-1<t;--t)a[t]&&a[t].classList.remove('tf_lazy');t()}).catch(e)},n)}else t()})},commonJs(){return new Promise((t,e)=>{m.tfTag('tf-lottie')[0]&&this.loadJs('https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.10.0/lottie_light.min.js',!!d.lottie,!1),this.requestIdleCallback(()=>{this.fonts().then(t).catch(e)},200),p.commentUrl&&this.requestIdleCallback(()=>{!d.addComment&&p.commentUrl&&m.tfId('cancel-comment-reply-link')&&this.loadJs('comments')},-1,3e3),p.wp_emoji&&this.requestIdleCallback(()=>{const t=m.createElement('script');t.text=p.wp_emoji,requestAnimationFrame(()=>{m.head.appendChild(t),d._wpemojiSettings.DOMReady=!0}),p.wp_emoji=null},-1,4e3)})},loadJs(a,l,n,o){const t=a;let e=this.jsLazy.get(t);return e===g&&(e=new Promise((e,t)=>{if(!0===l)requestAnimationFrame(e);else{const s=-1!==(a=p.plugin_url!==this.cdnPlugin&&0===a.indexOf(p.plugin_url)?a.replace(p.plugin_url,this.cdnPlugin):a).indexOf(this.urlHost),i=m.createElement('script');(1==s||-1===a.indexOf('http')&&0!==a.indexOf('//'))&&(-1===a.indexOf('.js')&&(a+='.js'),!1!==n)&&(0==s&&(a=this.url+'js/modules/'+a),-1===(a=!0===this.is_min&&-1===a.indexOf('.min.js')?a.replace('.js','.min.js'):a).indexOf('ver=')&&(n=n||this.v,a+='?ver='+n),null!==this.urlArgs)&&(a+=this.urlArgs),i.async=!1!==o,i.tfOn('load',t=>{requestAnimationFrame(e)},{passive:!0,once:!0}).tfOn('error',t,{passive:!0,once:!0}),i.src=a,requestAnimationFrame(()=>{m.head.appendChild(i)})}}),this.jsLazy.set(t,e)),e},loadCss(o,r,c,h,d){r=r||'tf_'+this.hash(o);let t=this.cssLazy.get(r);if(t===g)t=new Promise((a,t)=>{const e=h?h.getRootNode():m,s=e.tfId(r);if(null!==s&&'print'!==s.media)a();else{p.plugin_url!==this.cdnPlugin&&0===o.indexOf(p.plugin_url)&&(o=o.replace(p.plugin_url,this.cdnPlugin));const i=m.createElement('link'),l=function(){d=d||'all',this.media=d;const i=this.id,t=()=>{const e=this.getRootNode().styleSheets;let s=!1;for(let t=e.length-1;-1<t;--t)if(null!==e[t].ownerNode&&e[t].ownerNode.id===i){s=!0;break}!0===s?a():requestAnimationFrame(()=>{t()})};requestAnimationFrame(()=>{t()})},n=-1!==o.indexOf(this.urlHost);(1==n||-1===o.indexOf('http')&&0!==o.indexOf('//'))&&(-1===o.indexOf('.css')&&(o+='.css'),!1!==c)&&(0==n&&(o=this.url+'css/modules/'+o),-1===(o=!0===this.is_min&&-1===o.indexOf('.min.css')?o.replace('.css','.min.css'):o).indexOf('ver=')&&(c=c||this.v,o+='?ver='+c),null!==this.urlArgs)&&(o+=this.urlArgs),i.rel='stylesheet',i.media='print',i.id=r,i.href=o,i.setAttribute('fetchpriority','low'),'isApplicationInstalled'in navigator?i.onloadcssdefined(l):i.tfOn('load',l,{passive:!0,once:!0}),i.tfOn('error',t,{passive:!0,once:!0});let e=h;requestAnimationFrame(()=>{if(!e||!e.parentNode){const t=m.tfId('tf_lazy_common');e=t?t.nextSibling:m.head.firstElementChild}e.parentNode.insertBefore(i,h?e:e.nextSibling)})}}),this.cssLazy.set(r,t);else if(!0===t)t=Promise.resolve(),this.cssLazy.set(r,t);else if(h){const e=h.getRootNode().tfId(r);if(null===e)return this.cssLazy.delete(r),this.loadCss(o,r,c,h,d)}return t},gallery(){const t=!(!1!==this.is_builder_active||!p.lightbox)&&p.lightbox;if(!1!==t&&!1!==t.lightboxOn&&!this.jsLazy.has('tf_gal')){this.jsLazy.set('tf_gal',!0);const n=this,e=d.location.hash.replace('#',''),o={extraLightboxArgs:p.extraLightboxArgs,lightboxSelector:t.lightboxSelector||'.themify_lightbox',gallerySelector:t.gallerySelector||'.gallery-item a',contentImagesAreas:t.contentImagesAreas,i18n:t.i18n||[],disableSharing:t.disable_sharing};let l=!1;const r=t=>t?t.match(/\.(gif|jpg|jpeg|tiff|png|webp|apng)(\?fit=\d+(,|%2C)\d+)?(\&ssl=\d+)?$/i):null,c=t=>{if(!0!==l){m.tfOff('click',h),l=!0;const e=t.getAttribute('href'),s=m.createElement('div'),i=m.createElement('div');if(s.className='tf_lazy_lightbox tf_w tf_h',r(e)){s.textContent='Loading...';const a=new Image;a.decoding='async',a.src=e,a.decode()}else i.className='tf_lazy tf_w tf_h',s.appendChild(i);m.body.appendChild(s),Promise.all([n.loadCss('lightbox','tf_lightbox'),n.loadJs('lightbox.min',void 0!==$.fn.magnificPopup),n.loadJs('themify.gallery')]).then(()=>{n.trigger('tf_gallery_init',o),t.click()}).finally(()=>{s.remove()})}},h=t=>{const e=t.target?t.target.closest('a'):null;if(e){const s=o.gallerySelector,i=o.contentImagesAreas,a=o.lightboxSelector;(e.closest(a)||r(e.getAttribute('href'))&&(i&&e.closest(i)||s&&(e.matches(s)||e.closest(s))&&!e.closest('.module-gallery')))&&(t.preventDefault(),t.stopImmediatePropagation(),c(e))}};if(m.tfOn('click',h),e&&'#'!==e){const s=decodeURI(e);let t=m.querySelector('img[alt="'+s+'"],img[title="'+s+'"]');(t=t&&t.closest('.themify_lightbox'))&&c(t)}}},lazyLoading(t){if(!0!==this.lazyDisable){const o=(t=t||m)instanceof HTMLDocument||t instanceof HTMLElement?t.querySelectorAll('[data-lazy]'):t,r=o.length;if(0<r){const c=(e,s,i)=>{for(let t=e.length-1;-1<t;--t)null===this.lazyScrolling&&!0===e[t].isIntersecting&&(s.unobserve(e[t].target),requestAnimationFrame(()=>{this.lazyScroll([e[t].target],i)}))};let e;if(e=null===this.observer?new IntersectionObserver((t,e)=>{c(t,e,!0),e.disconnect();let s=!1;const i=this.isTouch?'touchstart':'mousemove',n=()=>{s&&s.disconnect(),s=null,d.tfOff('scroll '+i,n,{once:!0,passive:!0}),this.observer=new IntersectionObserver((t,e)=>{c(t,e)},{rootMargin:'300px 0px'});let a=0;const l=new Set;for(let i=0;i<r;++i)if(o[i].hasAttribute('data-lazy')&&!o[i].hasAttribute('data-tf-not-load')&&(this.observer.observe(o[i]),a<10)&&o[i].hasAttribute('data-tf-src')&&o[i].hasAttribute('data-lazy')){let s=o[i].getAttribute('data-tf-src');if(s&&!l.has(s)){l.add(s);let t=new Image,e=o[i].getAttribute('data-tf-srcset');t.decoding='async',e&&(t.srcset=e),t.src=s,t.decode(),++a}}m.tfClass('wow')[0]&&this.requestIdleCallback(()=>{this.wow()},1500),l.clear()};d.tfOn('beforeprint',()=>{this.lazyScroll(m.querySelectorAll('[data-lazy]'),!0)},{passive:!0}).tfOn('scroll '+i,n,{once:!0,passive:!0}),setTimeout(()=>{if(!1===s){s=new IntersectionObserver((t,e)=>{null!==s&&c(t,e,!0),e.disconnect()});const e=15<r?15:r;for(let t=0;t<e;++t)o[t]&&o[t].hasAttribute('data-lazy')&&!o[t].hasAttribute('data-tf-not-load')&&s.observe(o[t])}},1600)}):this.observer)for(let t=0;t<r;++t)o[t].hasAttribute('data-tf-not-load')||e.observe(o[t])}}},async lazyScroll(s,i){let t=0;if(s)if((t=s.length)===g)s=[s],t=1;else if(0===t)return;const o=function(){this.classList.remove('tf_svg_lazy_loaded','tf_svg_lazy')},r=[];for(let e=t-1;-1<e;--e){let n=s[e],t=n.tagName;if(n&&n.hasAttribute('data-lazy'))if(n.removeAttribute('data-lazy'),'IMG'===t||'DIV'!==t&&n.hasAttribute('data-tf-src')){if('svg'!==t){let e=n.getAttribute('data-tf-src'),a=n.getAttribute('data-tf-srcset'),l=a?n.getAttribute('data-tf-sizes'):null;if(e||a)if('IMG'===t){let s=new Image,i=n.attributes;for(let e=i.length-1;-1<e;--e){let t=i[e].name;'src'!==t&&'srcset'!==t&&'sizes'!==t&&'loading'!==t&&-1===t.indexOf('data-tf')&&s.setAttribute(t,i[e].value)}s.decoding='async',a&&(l&&s.setAttribute('sizes',l),s.srcset=a),e&&(s.src=e);let t=new Promise(t=>{s.decode().catch(()=>{}).finally(()=>{requestAnimationFrame(()=>{n.replaceWith(s),s.classList.contains('tf_svg_lazy')&&(s.tfOn('transitionend',o,{once:!0,passive:!0}),requestAnimationFrame(()=>{s.classList.add('tf_svg_lazy_loaded')})),t()})})});r.push(t)}else{if(e&&(n.src=e,n.removeAttribute('data-tf-src')),n.removeAttribute('loading'),!0!==i&&n.parentNode!==m.body){n.parentNode.classList.add('tf_lazy');let t=this.imagesLoad(n).then(t=>{t.parentNode.classList.remove('tf_lazy')});r.push(t)}this.largeImages()}}}else try{n.classList.remove('tf_lazy'),r.push(this.reRun(n,!0)),r.push(this.trigger('tf_lazy',n))}catch(t){console.log(t)}else n&&n.removeAttribute('data-lazy');null!==this.observer&&n&&this.observer.unobserve(n)}return Promise.all(r).catch(t=>{})},async reRun(t,e){if(!0!==e&&this.commonJs(),p&&!p.is_admin){const s=!0===this.is_builder_loaded||'undefined'!=typeof ThemifyBuilderModuleJs,i=[];return(1==s||d.tbLocalScript&&m.tfClass('module_row')[0]!==g)&&(0==s&&await this.loadJs(this.builder_url+'js/themify.builder.script','undefined'!=typeof ThemifyBuilderModuleJs),i.push(ThemifyBuilderModuleJs.loadModules(t,e))),i.push(this.initComponents(t,e)),Promise.all(i)}},animateCss(){return this.loadCss('animate.min','animate')},wow(){return Promise.all([this.animateCss(),this.loadJs('tf_wow')])},async dropDown(t,e){if(t&&0<t.length){const s=[];!1!==e&&s.push(this.loadCss('dropdown','tf_dropdown')),s.push(this.loadJs('themify.dropdown')),await Promise.all(s),this.trigger('tf_dropdown_init',[t])}},resizer(){let s=!1,i,a;const t='onorientationchange'in d?'orientationchange':'resize';d.tfOn(t,()=>{s||(s=!0,i&&clearTimeout(i),i=setTimeout(()=>{a&&cancelAnimationFrame(a),a=requestAnimationFrame(()=>{const t=d.innerWidth,e=d.innerHeight;e===this.h&&t===this.w||(this.trigger('tfsmartresize',{w:t,h:e}),this.w=t,this.h=e),s=!1,a=i=null})},150))},{passive:!0})},mobileMenu(){if(p.menu_point){const s=parseInt(p.menu_point),t=t=>{const e=m.body.classList;!t&&this.w<=s||t&&t.w<=s?e.add('mobile_menu_active'):t!==g&&e.remove('mobile_menu_active')};t(),this.on('tfsmartresize',t)}},async wc(t){p.wc_js&&(p.wc_js_normal||setTimeout(()=>{m.tfOn(this.isTouch?'touchstart':'mousemove',()=>{const i=m.createDocumentFragment();for(let s in p.wc_js){let t=m.createElement('link'),e=p.wc_js[s];-1===e.indexOf('ver',12)&&(e+='?ver='+p.wc_version),t.as='script',t.rel='prefetch',t.href=e,i.appendChild(t)}m.head.appendChild(i)},{once:!0,passive:!0})},1800),await this.loadJs('wc'),this.trigger('tf_wc_init',t))},megaMenu(t){if(t&&!t.dataset.init){t.dataset.init=!0;const h=this,d=+p.menu_point+1,u=function(t){const e=t instanceof jQuery?t:this,s=(t instanceof jQuery?h:t).w;s>d?e.css('display',''):h.on('tfsmartresize',u.bind(e),!0)},f=function(t){const e=t instanceof jQuery?t:this;t.target&&!e[0].parentNode.contains(t.target)?e.css('display','')[0].parentNode.classList.remove('toggle-on'):m.tfOn('touchstart',f.bind(e),{once:!0})};this.isTouch||(this.cssLazy.has('tf_megamenu')&&t.tfClass('mega-link')[0]?Promise.all([this.loadCss(this.url+'megamenu/css/megamenu','tf_megamenu',null,null,'screen and (min-width:'+d+'px)'),this.loadJs(this.url+'megamenu/js/themify.mega-menu')]).then(()=>{this.trigger('tf_mega_menu',[t,d])}):this.requestIdleCallback(()=>{this.edgeMenu()},-1,2e3)),t.tfOn('click',function(i){const t=i.target;if(!t.closest('.with-sub-arrow')&&(t.classList.contains('child-arrow')||'A'===t.tagName&&(!t.href||'#'===t.getAttribute('href')||t.parentNode.classList.contains('themify_toggle_dropdown')))){let t=$(i.target);if('A'===t[0].tagName){if(!t.find('.child-arrow')[0])return}else t=t.parent();i.preventDefault(),i.stopPropagation();const a=t.parent();let e=null,s=g!==p.m_m_toggle&&!a.hasClass('toggle-on')&&h.w<d;if(s&&(e=a.siblings('.toggle-on'),s=0<e.length),h.w<d||i.target.classList.contains('child-arrow')||0<t.find('.child-arrow:visible').length){const l=t.next('div, ul'),n=l[0].style,o=m.tfId('headerwrap');if(h.w<d&&(null===n||''===n)&&u(l),h.isTouch&&!a.hasClass('toggle-on')&&!m.body.classList.contains('mobile-menu-visible')&&(null===o||400<o.offsetWidth)&&(f(l),a.siblings('.toggle-on').removeClass('toggle-on')),l.toggle('fast'),s){const r=e.find('>div,>ul'),c=r[0].style;h.w<d&&(null===c||''===c)&&u(r),r.toggle('fast')}}s&&e.removeClass('toggle-on'),a.toggleClass('toggle-on')}})}},touchDropDown(){const i=m.querySelectorAll('ul:not(.sub-menu)>.menu-item:first-child');for(let s=i.length-1;-1<s;--s){let t=i[s].parentNode,e=t.parentNode;'LI'===e.tagName||e.classList.contains('sub-menu')||this.megaMenu(t)}},ajaxSearch(l){if(!1===this.is_builder_active){const n=t=>{const e=t.currentTarget,s='click'===t.type,i=s?'overlay':'dropdown',a=['search_form','search_form_ajax','search_form_'+i],l=(s&&(t.preventDefault(),t.stopImmediatePropagation()),s&&e.classList.contains('tf_search_icon')&&a.push('searchform_overlay'),[this.loadJs('ajax-search')]);for(let s=a.length-1;-1<s;--s){let t='',e=null;'searchform_overlay'===a[s]&&(e=p.theme_v,t=p.theme_url+'/styles/modules/'),l.push(this.loadCss(t+a[s].replaceAll('_','-'),null,e))}Promise.all(l).finally(()=>{this.trigger('themify_overlay_search_init',[e]),this.triggerEvent(e,t.type)})};for(let a=l.length-1;-1<a;--a)if(!l[a].hasAttribute('data-ajax')||''!==l[a].dataset.ajax){let t=l[a].classList.contains('tf_search_icon'),e=t||l[a].classList.contains('tf_search_overlay'),s,i;!1===e?(i='focus',(s=l[a].querySelector('input[name="s"]')).autocomplete='off'):(i='click',s=t?l[a]:l[a].tfClass('tf_search_icon')[0]),s&&s.tfOn(i,n,{once:!0,passive:!e})}}},async stickyBuy(t){await Promise.all([this.loadCss('sticky-buy'),this.loadJs('sticky-buy')]),this.trigger('tf_sticky_buy_init',t)},async wpEmbed(e){if((e=e.length===g?[e]:e)[0]!==g){const s=[];for(let t=e.length-1;-1<t;--t)'IFRAME'!==e[t].tagName||e[t].dataset.done||(e[t].dataset.done=1,s.push(e[t]));if(s[0]!==g){await this.loadJs(p.includesURL+'js/wp-embed.min.js',void 0!==d.wp&&void 0!==d.wp.receiveEmbedMessage,p.wp);for(let e=s.length-1;-1<e;--e){let t=s[e].getAttribute('data-secret');t||(t=Math.random().toString(36).substr(2,10),s[e].setAttribute('data-secret',t)),s[e].hasAttribute('src')||(s[e].src=s[e].getAttribute('data-tf-src')),d.wp.receiveEmbedMessage({data:{message:'height',value:this.h,secret:t},source:s[e].contentWindow})}}}},largeImages(e){return new Promise(t=>{p.lgi===g&&!0!==this.is_builder_active||!m.querySelector('.tf_large_img:not(.tf_large_img_done)')?t():this.requestIdleCallback(async()=>{await this.loadJs('large-image-alert.min'),this.trigger('tf_large_images_init',e),t()},-1,1e3)})},async googleAnalytics(){if(p.g_m_id!==g){const e=()=>{d.dataLayer.push(arguments)},t=p.g_m_id;await this.loadJs('https://www.googletagmanager.com/gtag/js?id='+t,!!d.google_tag_manager,!1),d.dataLayer=d.dataLayer||[],e(new Date),e(),e(),delete p.g_m_id,d.tfOn('pageshow',t=>{!0===t.persisted&&e()},{passive:!0})}},async tooltips(){return p.menu_tooltips.length||p.builder_tooltips?this.loadJs('tooltip'):1},fetch(s,i,t,a){if(a=a||p.ajax_url,(t=Object.assign({credentials:'same-origin',method:'POST',headers:{}},t)).mode===g&&-1===a.indexOf(location.origin)?t.mode='cors':'cors'!==t.mode&&(t.headers['X-Requested-With']='XMLHttpRequest'),'json'===(i=i||'json')&&(t.headers.accept='application/json, text/javascript, */*; q=0.01'),s){let e;if(s instanceof FormData)e=s;else{e=new FormData;for(let t in s)'object'!=typeof s[t]||s[t]instanceof Blob?e.set(t,s[t]):e.set(t,JSON.stringify(s[t]))}if('POST'===t.method)'application/x-www-form-urlencoded'===t.headers['Content-type']&&(e=new URLSearchParams(e)),t.body=e;else{a=new URL(a,d.location);for(let t of e.entries())a.searchParams.set(t[0],t[1])}}return fetch(a,t).then(t=>{if(t.ok)return'json'===i?t.json():'blob'===i?t.blob():t.text();throw t}).then(t=>{if(t&&('html'===i||'text'===i)&&(t=t.trim(),'html'===i)&&t){const e=m.createElement('template');e.innerHTML=t,t=e.content}return t})}}).init()})(window,document,void 0,jQuery,themify_vars);