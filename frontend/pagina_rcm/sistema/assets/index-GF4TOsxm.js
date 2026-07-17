var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,a)=>(a=n==null?{}:e(i(n)),s(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=``+new URL(`logo_rcm-Du1lLDVz.png`,import.meta.url).href;function u({id:e=``,type:t=`text`,placeholder:n=``,value:r=``,disabled:i=!1,required:a=!1}){return`

        <input
            id="${e}"
            type="${t}"
            placeholder="${n}"
            value="${r}"
            ${i?`disabled`:``}
            ${a?`required`:``}
        >

    `}function d({texto:e,icono:t=``,clase:n=`btn-primary`,id:r=``,tipo:i=`button`}){return`

        <button

            type="${i}"

            id="${r}"

            class="${n}"

        >

            ${t?`<i class="${t}"></i>`:``}

            ${e}

        </button>

    `}var ee={usuarios:[{id:`TRA-001`,nombre:`Administrador`,correo:`admin@redcamino.org`,password:`12345`,rol:`administrador`},{id:`TRA-002`,nombre:`Psicólogo`,correo:`psicologo@redcamino.org`,password:`12345`,rol:`psicologo`},{id:`TRA-003`,nombre:`Profesor`,correo:`profesor@redcamino.org`,password:`12345`,rol:`profesor`},{id:`TRA-004`,nombre:`Trabajador Social`,correo:`trabajadorsocial@redcamino.org`,password:`12345`,rol:`trabajador`}],familias:[{id:`FAM-001`,responsable:`María Pérez`,documento:`1143123456`,telefono:`3001234567`,direccion:`Cra 15 #45-20`,barrio:`La Paz`,estado:`Activo`},{id:`FAM-002`,responsable:`Carlos Gómez`,documento:`1002456789`,telefono:`3019876543`,direccion:`Calle 30 #12-50`,barrio:`San José`,estado:`Activo`},{id:`FAM-003`,responsable:`Ana Rodríguez`,documento:`55221478`,telefono:`3154567890`,direccion:`Cra 8 #10-30`,barrio:`Centro`,estado:`Pendiente`}],nna:[{id:`NNA-001`,nombre:`Luis Pérez`,edad:10,documento:`1098765432`,colegio:`Institución Educativa La Paz`,grado:`5°`,eps:`Sura`,familiaId:`FAM-001`,estado:`Activo`},{id:`NNA-002`,nombre:`Valentina Gómez`,edad:7,documento:`1098765433`,colegio:`Institución Educativa San José`,grado:`2°`,eps:`Nueva EPS`,familiaId:`FAM-002`,estado:`Activo`},{id:`NNA-003`,nombre:`Santiago Rodríguez`,edad:13,documento:`1098765434`,colegio:`Institución Educativa Centro`,grado:`7°`,eps:`Sanitas`,familiaId:`FAM-003`,estado:`En proceso`}],seguimientos:[{id:`SEG-001`,nnaId:`NNA-001`,mes:6,anio:2026,estado:`Confirmado`,fecha:`2026-06-28`}]};async function f(e,t){let n=(e||``).trim().toLowerCase(),r=(t||``).trim();return(ee?.usuarios||[]).find(e=>String(e.correo||``).toLowerCase()===n&&String(e.password||``)===r)||null}function p(e){localStorage.setItem(`usuario`,JSON.stringify(e))}function te(){return JSON.parse(localStorage.getItem(`usuario`))}function ne(){localStorage.removeItem(`usuario`)}var re=c(o(((e,t)=>{(function(n,r){typeof e==`object`&&t!==void 0?t.exports=r():typeof define==`function`&&define.amd?define(r):(n=typeof globalThis<`u`?globalThis:n||self,n.Sweetalert2=r())})(e,(function(){function e(e,t,n){if(typeof e==`function`?e===t:e.has(t))return arguments.length<3?t:n;throw TypeError(`Private element is not present on this object`)}function t(e,t){if(t.has(e))throw TypeError(`Cannot initialize the same private elements twice on an object`)}function n(t,n){return t.get(e(t,n))}function r(e,n,r){t(e,n),n.set(e,r)}function i(t,n,r){return t.set(e(t,n),r),r}let a={},o=()=>{a.previousActiveElement instanceof HTMLElement?(a.previousActiveElement.focus(),a.previousActiveElement=null):document.body&&document.body.focus()},s=e=>new Promise(t=>{if(!e)return t();let n=window.scrollX,r=window.scrollY;a.restoreFocusTimeout=setTimeout(()=>{o(),t()},100),window.scrollTo(n,r)}),c=`swal2-`,l=`container.shown.height-auto.iosfix.popup.modal.no-backdrop.no-transition.toast.toast-shown.show.hide.close.title.html-container.actions.confirm.deny.cancel.footer.icon.icon-content.image.input.file.range.select.radio.checkbox.label.textarea.inputerror.input-label.validation-message.progress-steps.active-progress-step.progress-step.progress-step-line.loader.loading.styled.top.top-start.top-end.top-left.top-right.center.center-start.center-end.center-left.center-right.bottom.bottom-start.bottom-end.bottom-left.bottom-right.grow-row.grow-column.grow-fullscreen.rtl.timer-progress-bar.timer-progress-bar-container.scrollbar-measure.icon-success.icon-warning.icon-info.icon-question.icon-error.draggable.dragging`.split(`.`).reduce((e,t)=>(e[t]=c+t,e),{}),u=[`success`,`warning`,`info`,`question`,`error`].reduce((e,t)=>(e[t]=c+t,e),{}),d=`SweetAlert2:`,ee=e=>e.charAt(0).toUpperCase()+e.slice(1),f=e=>{console.warn(`${d} ${typeof e==`object`?e.join(` `):e}`)},p=e=>{console.error(`${d} ${e}`)},te=[],ne=e=>{te.includes(e)||(te.push(e),f(e))},re=(e,t=null)=>{ne(`"${e}" is deprecated and will be removed in the next major release.${t?` Use "${t}" instead.`:``}`)},m=e=>typeof e==`function`?e():e,h=e=>e&&typeof e.toPromise==`function`,g=e=>h(e)?e.toPromise():Promise.resolve(e),ie=e=>e&&Promise.resolve(e)===e,_=()=>navigator.userAgent.includes(`Firefox`),v=()=>document.body.querySelector(`.${l.container}`),y=e=>{let t=v();return t?t.querySelector(e):null},b=e=>y(`.${e}`),x=()=>b(l.popup),ae=()=>b(l.icon),oe=()=>b(l[`icon-content`]),se=()=>b(l.title),ce=()=>b(l[`html-container`]),le=()=>b(l.image),ue=()=>b(l[`progress-steps`]),de=()=>b(l[`validation-message`]),S=()=>y(`.${l.actions} .${l.confirm}`),fe=()=>y(`.${l.actions} .${l.cancel}`),pe=()=>y(`.${l.actions} .${l.deny}`),me=()=>b(l[`input-label`]),he=()=>y(`.${l.loader}`),ge=()=>b(l.actions),_e=()=>b(l.footer),ve=()=>b(l[`timer-progress-bar`]),C=()=>b(l.close),ye=()=>{let e=x();if(!e)return[];let t=e.querySelectorAll(`[tabindex]:not([tabindex="-1"]):not([tabindex="0"])`),n=Array.from(t).sort((e,t)=>{let n=parseInt(e.getAttribute(`tabindex`)||`0`),r=parseInt(t.getAttribute(`tabindex`)||`0`);return n>r?1:n<r?-1:0}),r=e.querySelectorAll(`
  a[href],
  area[href],
  input:not([disabled]),
  select:not([disabled]),
  textarea:not([disabled]),
  button:not([disabled]),
  iframe,
  object,
  embed,
  [tabindex="0"],
  [contenteditable],
  audio[controls],
  video[controls],
  summary
`),i=Array.from(r).filter(e=>e.getAttribute(`tabindex`)!==`-1`);return[...new Set(n.concat(i))].filter(e=>P(e))},be=()=>E(document.body,l.shown)&&!E(document.body,l[`toast-shown`])&&!E(document.body,l[`no-backdrop`]),w=()=>{let e=x();return e?E(e,l.toast):!1},xe=()=>{let e=x();return e?e.hasAttribute(`data-loading`):!1},T=(e,t)=>{if(e.textContent=``,t){let n=new DOMParser().parseFromString(t,`text/html`),r=n.querySelector(`head`);r&&Array.from(r.childNodes).forEach(t=>{e.appendChild(t)});let i=n.querySelector(`body`);i&&Array.from(i.childNodes).forEach(t=>{t instanceof HTMLVideoElement||t instanceof HTMLAudioElement?e.appendChild(t.cloneNode(!0)):e.appendChild(t)})}},E=(e,t)=>t?t.split(/\s+/).every(t=>e.classList.contains(t)):!1,Se=(e,t)=>{Array.from(e.classList).forEach(n=>{!Object.values(l).includes(n)&&!Object.values(u).includes(n)&&!Object.values(t.showClass||{}).includes(n)&&e.classList.remove(n)})},D=(e,t,n)=>{if(Se(e,t),!t.customClass)return;let r=t.customClass[n];if(r){if(typeof r!=`string`&&!r.forEach){f(`Invalid type of customClass.${n}! Expected string or iterable object, got "${typeof r}"`);return}k(e,r)}},Ce=(e,t)=>{if(!t)return null;switch(t){case`select`:case`textarea`:case`file`:return e.querySelector(`.${l.popup} > .${l[t]}`);case`checkbox`:return e.querySelector(`.${l.popup} > .${l.checkbox} input`);case`radio`:return e.querySelector(`.${l.popup} > .${l.radio} input:checked`)||e.querySelector(`.${l.popup} > .${l.radio} input:first-child`);case`range`:return e.querySelector(`.${l.popup} > .${l.range} input`);default:return e.querySelector(`.${l.popup} > .${l.input}`)}},we=e=>{if(e.focus(),e.type!==`file`){let t=e.value;e.value=``,e.value=t}},O=(e,t,n)=>{if(!e||!t)return;let r=typeof t==`string`?t.split(/\s+/).filter(Boolean):t;(Array.isArray(e)?e:[e]).forEach(e=>{r.forEach(t=>{n?e.classList.add(t):e.classList.remove(t)})})},k=(e,t)=>{O(e,t,!0)},A=(e,t)=>{O(e,t,!1)},j=(e,t)=>Array.from(e.children).find(e=>e instanceof HTMLElement&&E(e,t)),Te=(e,t,n)=>{n===`${parseInt(`${n}`)}`&&(n=parseInt(n)),n||n===0?e.style.setProperty(t,typeof n==`number`?`${n}px`:n):e.style.removeProperty(t)},M=(e,t=`flex`)=>{e&&(e.style.display=t)},N=e=>{e&&(e.style.display=`none`)},Ee=(e,t=`block`)=>{e&&new MutationObserver(()=>{Oe(e,e.innerHTML,t)}).observe(e,{childList:!0,subtree:!0})},De=(e,t,n,r)=>{let i=e.querySelector(t);i&&i.style.setProperty(n,r)},Oe=(e,t,n=`flex`)=>{t?M(e,n):N(e)},P=e=>!!(e&&(e.offsetWidth||e.offsetHeight||e.getClientRects().length)),F=()=>!P(S())&&!P(pe())&&!P(fe()),ke=e=>e.scrollHeight>e.clientHeight,Ae=(e,t)=>{let n=e;for(;n&&n!==t;){if(ke(n))return!0;n=n.parentElement}return!1},je=e=>{let t=window.getComputedStyle(e),n=parseFloat(t.getPropertyValue(`animation-duration`)||`0`),r=parseFloat(t.getPropertyValue(`transition-duration`)||`0`);return n>0||r>0},Me=(e,t=!1)=>{let n=ve();n&&P(n)&&(t&&(n.style.transition=`none`,n.style.width=`100%`),setTimeout(()=>{n.style.transition=`width ${e/1e3}s linear`,n.style.width=`0%`},10))},Ne=()=>{let e=ve();if(!e)return;let t=parseInt(window.getComputedStyle(e).width);e.style.removeProperty(`transition`),e.style.width=`100%`;let n=t/parseInt(window.getComputedStyle(e).width)*100;e.style.width=`${n}%`},I=()=>typeof window>`u`||typeof document>`u`,Pe=`
 <div aria-labelledby="${l.title}" aria-describedby="${l[`html-container`]}" class="${l.popup}" tabindex="-1">
   <button type="button" class="${l.close}"></button>
   <ul class="${l[`progress-steps`]}"></ul>
   <div class="${l.icon}"></div>
   <img class="${l.image}" />
   <h2 class="${l.title}" id="${l.title}"></h2>
   <div class="${l[`html-container`]}" id="${l[`html-container`]}"></div>
   <input class="${l.input}" id="${l.input}" />
   <input type="file" class="${l.file}" />
   <div class="${l.range}">
     <input type="range" />
     <output></output>
   </div>
   <select class="${l.select}" id="${l.select}"></select>
   <div class="${l.radio}"></div>
   <label class="${l.checkbox}">
     <input type="checkbox" id="${l.checkbox}" />
     <span class="${l.label}"></span>
   </label>
   <textarea class="${l.textarea}" id="${l.textarea}"></textarea>
   <div class="${l[`validation-message`]}" id="${l[`validation-message`]}"></div>
   <div class="${l.actions}">
     <div class="${l.loader}"></div>
     <button type="button" class="${l.confirm}"></button>
     <button type="button" class="${l.deny}"></button>
     <button type="button" class="${l.cancel}"></button>
   </div>
   <div class="${l.footer}"></div>
   <div class="${l[`timer-progress-bar-container`]}">
     <div class="${l[`timer-progress-bar`]}"></div>
   </div>
 </div>
`.replace(/(^|\n)\s*/g,``),Fe=()=>{let e=v();return e?(e.remove(),A([document.documentElement,document.body],[l[`no-backdrop`],l[`toast-shown`],l[`has-column`]]),!0):!1},Ie=()=>{a.currentInstance&&a.currentInstance.resetValidationMessage()},Le=()=>{let e=x();if(!e)return;let t=j(e,l.input),n=j(e,l.file),r=e.querySelector(`.${l.range} input`),i=e.querySelector(`.${l.range} output`),a=j(e,l.select),o=e.querySelector(`.${l.checkbox} input`),s=j(e,l.textarea);t&&(t.oninput=Ie),n&&(n.onchange=Ie),a&&(a.onchange=Ie),o&&(o.onchange=Ie),s&&(s.oninput=Ie),r&&i&&(r.oninput=()=>{Ie(),i.value=r.value},r.onchange=()=>{Ie(),i.value=r.value})},Re=e=>{if(typeof e==`string`){let t=document.querySelector(e);if(!t)throw Error(`Target element "${e}" not found`);return t}return e},ze=e=>{let t=x();t&&(t.setAttribute(`role`,e.toast?`alert`:`dialog`),t.setAttribute(`aria-live`,e.toast?`polite`:`assertive`),e.toast||t.setAttribute(`aria-modal`,`true`))},Be=e=>{window.getComputedStyle(e).direction===`rtl`&&(k(v(),l.rtl),a.isRTL=!0)},Ve=e=>{let t=Fe();if(I()){p(`SweetAlert2 requires document to initialize`);return}let n=document.createElement(`div`);n.className=l.container,t&&k(n,l[`no-transition`]),T(n,Pe),n.dataset.swal2Theme=e.theme;let r=Re(e.target||`body`);r.appendChild(n),e.topLayer&&(n.setAttribute(`popover`,``),n.showPopover()),ze(e),Be(r),Le()},He=(e,t)=>{e instanceof HTMLElement?t.appendChild(e):typeof e==`object`?Ue(e,t):e&&T(t,e)},Ue=(e,t)=>{`jquery`in e?We(t,e):T(t,e.toString())},We=(e,t)=>{if(e.textContent=``,0 in t)for(let n=0;n in t;n++)e.appendChild(t[n].cloneNode(!0));else e.appendChild(t.cloneNode(!0))},Ge=(e,t)=>{let n=ge(),r=he();!n||!r||(!t.showConfirmButton&&!t.showDenyButton&&!t.showCancelButton?N(n):M(n),D(n,t,`actions`),Ke(n,r,t),T(r,t.loaderHtml||``),D(r,t,`loader`))};function Ke(e,t,n){let r=S(),i=pe(),a=fe();!r||!i||!a||(Ye(r,`confirm`,n),Ye(i,`deny`,n),Ye(a,`cancel`,n),qe(r,i,a,n),n.reverseButtons&&(n.toast?(e.insertBefore(a,r),e.insertBefore(i,r)):(e.insertBefore(a,t),e.insertBefore(i,t),e.insertBefore(r,t))))}function qe(e,t,n,r){if(!r.buttonsStyling){A([e,t,n],l.styled);return}k([e,t,n],l.styled),[[e,`confirm`,r.confirmButtonColor],[t,`deny`,r.denyButtonColor],[n,`cancel`,r.cancelButtonColor]].forEach(([e,t,n])=>{n&&e.style.setProperty(`--swal2-${t}-button-background-color`,n),Je(e)})}function Je(e){let t=window.getComputedStyle(e);if(t.getPropertyValue(`--swal2-action-button-focus-box-shadow`))return;let n=t.backgroundColor.replace(/rgba?\((\d+), (\d+), (\d+).*/,`rgba($1, $2, $3, 0.5)`);e.style.setProperty(`--swal2-action-button-focus-box-shadow`,t.getPropertyValue(`--swal2-outline`).replace(/ rgba\(.*/,` ${n}`))}function Ye(e,t,n){let r=ee(t);Oe(e,n[`show${r}Button`],`inline-block`),T(e,n[`${t}ButtonText`]||``),e.setAttribute(`aria-label`,n[`${t}ButtonAriaLabel`]||``),e.className=l[t],D(e,n,`${t}Button`)}let Xe=(e,t)=>{let n=C();n&&(T(n,t.closeButtonHtml||``),D(n,t,`closeButton`),Oe(n,t.showCloseButton),n.setAttribute(`aria-label`,t.closeButtonAriaLabel||``))},L=(e,t)=>{let n=v();n&&(Ze(n,t.backdrop),Qe(n,t.position),$e(n,t.grow),D(n,t,`container`))};function Ze(e,t){typeof t==`string`?e.style.background=t:t||k([document.documentElement,document.body],l[`no-backdrop`])}function Qe(e,t){t&&(t in l?k(e,l[t]):(f(`The "position" parameter is not valid, defaulting to "center"`),k(e,l.center)))}function $e(e,t){t&&k(e,l[`grow-${t}`])}var R={innerParams:new WeakMap,domCache:new WeakMap,focusedElement:new WeakMap};let et=[`input`,`file`,`range`,`select`,`radio`,`checkbox`,`textarea`],z=(e,t)=>{let n=x();if(!n)return;let r=R.innerParams.get(e),i=!r||t.input!==r.input;et.forEach(e=>{let r=j(n,l[e]);r&&(rt(e,t.inputAttributes),r.className=l[e],i&&N(r))}),t.input&&(i&&tt(t),it(t))},tt=e=>{if(!e.input)return;if(!B[e.input]){p(`Unexpected type of input! Expected ${Object.keys(B).join(` | `)}, got "${e.input}"`);return}let t=st(e.input);if(!t)return;let n=B[e.input](t,e);M(t),e.inputAutoFocus&&setTimeout(()=>{we(n)})},nt=e=>{for(let{name:t}of Array.from(e.attributes))[`id`,`type`,`value`,`style`].includes(t)||e.removeAttribute(t)},rt=(e,t)=>{let n=x();if(!n)return;let r=Ce(n,e);if(r){nt(r);for(let e in t)r.setAttribute(e,t[e])}},it=e=>{if(!e.input)return;let t=st(e.input);t&&D(t,e,`input`)},at=(e,t)=>{!e.placeholder&&t.inputPlaceholder&&(e.placeholder=t.inputPlaceholder)},ot=(e,t,n)=>{if(n.inputLabel){let r=document.createElement(`label`),i=l[`input-label`];r.setAttribute(`for`,e.id),r.className=i,typeof n.customClass==`object`&&k(r,n.customClass.inputLabel),r.innerText=n.inputLabel,t.insertAdjacentElement(`beforebegin`,r)}},st=e=>{let t=x();if(t)return j(t,l[e]||l.input)},ct=(e,t)=>{[`string`,`number`].includes(typeof t)?e.value=`${t}`:ie(t)||f(`Unexpected type of inputValue! Expected "string", "number" or "Promise", got "${typeof t}"`)},B={};B.text=B.email=B.password=B.number=B.tel=B.url=B.search=B.date=B[`datetime-local`]=B.time=B.week=B.month=(e,t)=>{let n=e;return ct(n,t.inputValue),ot(n,n,t),at(n,t),n.type=t.input,n},B.file=(e,t)=>{let n=e;return ot(n,n,t),at(n,t),n},B.range=(e,t)=>{let n=e,r=n.querySelector(`input`),i=n.querySelector(`output`);return r&&(ct(r,t.inputValue),r.type=t.input,ot(r,e,t)),i&&ct(i,t.inputValue),e},B.select=(e,t)=>{let n=e;if(n.textContent=``,t.inputPlaceholder){let e=document.createElement(`option`);T(e,t.inputPlaceholder),e.value=``,e.disabled=!0,e.selected=!0,n.appendChild(e)}return ot(n,n,t),n},B.radio=e=>{let t=e;return t.textContent=``,e},B.checkbox=(e,t)=>{let n=x();if(!n)throw Error(`Popup not found`);let r=Ce(n,`checkbox`);if(!r)throw Error(`Checkbox input not found`);r.value=`1`,r.checked=!!t.inputValue;let i=e.querySelector(`span`);if(i){let e=t.inputPlaceholder||t.inputLabel;e&&T(i,e)}return r},B.textarea=(e,t)=>{let n=e;ct(n,t.inputValue),at(n,t),ot(n,n,t);let r=e=>parseInt(window.getComputedStyle(e).marginLeft)+parseInt(window.getComputedStyle(e).marginRight);return setTimeout(()=>{if(`MutationObserver`in window){let e=x();if(!e)return;let i=parseInt(window.getComputedStyle(e).width);new MutationObserver(()=>{if(!document.body.contains(n))return;let e=n.offsetWidth+r(n),a=x();a&&(e>i?a.style.width=`${e}px`:Te(a,`width`,t.width))}).observe(n,{attributes:!0,attributeFilter:[`style`]})}}),n};let lt=(e,t)=>{let n=ce();n&&(Ee(n),D(n,t,`htmlContainer`),t.html?(He(t.html,n),M(n,`block`)):t.text?(n.textContent=t.text,M(n,`block`)):N(n),z(e,t))},ut=(e,t)=>{let n=_e();n&&(Ee(n),Oe(n,!!t.footer,`block`),t.footer&&He(t.footer,n),D(n,t,`footer`))},dt=(e,t)=>{let n=R.innerParams.get(e),r=ae();if(r){if(n&&t.icon===n.icon){ht(r,t),ft(r,t);return}if(!t.icon&&!t.iconHtml){N(r);return}if(t.icon&&Object.keys(u).indexOf(t.icon)===-1){p(`Unknown icon! Expected "success", "error", "warning", "info" or "question", got "${t.icon}"`),N(r);return}M(r),ht(r,t),ft(r,t),k(r,t.showClass&&t.showClass.icon),window.matchMedia(`(prefers-color-scheme: dark)`).addEventListener(`change`,pt)}},ft=(e,t)=>{for(let[n,r]of Object.entries(u))t.icon!==n&&A(e,r);k(e,t.icon&&u[t.icon]),gt(e,t),pt(),D(e,t,`icon`)},pt=()=>{let e=x();if(!e)return;let t=window.getComputedStyle(e).getPropertyValue(`background-color`);e.querySelectorAll(`[class^=swal2-success-circular-line], .swal2-success-fix`).forEach(e=>{e.style.backgroundColor=t})},mt=e=>`
  ${e.animation?`<div class="swal2-success-circular-line-left"></div>`:``}
  <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>
  <div class="swal2-success-ring"></div>
  ${e.animation?`<div class="swal2-success-fix"></div>`:``}
  ${e.animation?`<div class="swal2-success-circular-line-right"></div>`:``}
`,ht=(e,t)=>{if(!t.icon&&!t.iconHtml)return;let n=e.innerHTML,r=``;t.iconHtml?r=_t(t.iconHtml):t.icon===`success`?(r=mt(t),n=n.replace(/ style=".*?"/g,``)):t.icon===`error`?r=`
  <span class="swal2-x-mark">
    <span class="swal2-x-mark-line-left"></span>
    <span class="swal2-x-mark-line-right"></span>
  </span>
`:t.icon&&(r=_t({question:`?`,warning:`!`,info:`i`}[t.icon])),n.trim()!==r.trim()&&T(e,r)},gt=(e,t)=>{if(t.iconColor){e.style.color=t.iconColor,e.style.borderColor=t.iconColor;for(let n of[`.swal2-success-line-tip`,`.swal2-success-line-long`,`.swal2-x-mark-line-left`,`.swal2-x-mark-line-right`])De(e,n,`background-color`,t.iconColor);De(e,`.swal2-success-ring`,`border-color`,t.iconColor)}},_t=e=>`<div class="${l[`icon-content`]}">${e}</div>`,V=(e,t)=>{let n=le();if(n){if(!t.imageUrl){N(n);return}M(n,``),n.setAttribute(`src`,t.imageUrl),n.setAttribute(`alt`,t.imageAlt||``),Te(n,`width`,t.imageWidth),Te(n,`height`,t.imageHeight),n.className=l.image,D(n,t,`image`)}},H=!1,U=0,vt=0,yt=0,bt=0,xt=e=>{e.addEventListener(`mousedown`,Ct),document.body.addEventListener(`mousemove`,wt),e.addEventListener(`mouseup`,W),e.addEventListener(`touchstart`,Ct),document.body.addEventListener(`touchmove`,wt),e.addEventListener(`touchend`,W)},St=e=>{e.removeEventListener(`mousedown`,Ct),document.body.removeEventListener(`mousemove`,wt),e.removeEventListener(`mouseup`,W),e.removeEventListener(`touchstart`,Ct),document.body.removeEventListener(`touchmove`,wt),e.removeEventListener(`touchend`,W)},Ct=e=>{let t=x();if(!t)return;let n=ae();if(e.target===t||n&&n.contains(e.target)){H=!0;let n=Tt(e);U=n.clientX,vt=n.clientY,yt=parseInt(t.style.insetInlineStart)||0,bt=parseInt(t.style.insetBlockStart)||0,k(t,`swal2-dragging`)}},wt=e=>{let t=x();if(t&&H){let{clientX:n,clientY:r}=Tt(e),i=n-U;t.style.insetInlineStart=`${yt+(a.isRTL?-i:i)}px`,t.style.insetBlockStart=`${bt+(r-vt)}px`}},W=()=>{let e=x();H=!1,A(e,`swal2-dragging`)},Tt=e=>{let t=e.type.startsWith(`touch`)?e.touches[0]:e;return{clientX:t.clientX,clientY:t.clientY}},Et=(e,t)=>{let n=v(),r=x();if(!(!n||!r)){if(t.toast){Te(n,`width`,t.width),r.style.width=`100%`;let e=he();e&&r.insertBefore(e,ae())}else Te(r,`width`,t.width);Te(r,`padding`,t.padding),t.color&&(r.style.color=t.color),t.background&&(r.style.background=t.background),N(de()),Dt(r,t),t.draggable&&!t.toast?(k(r,l.draggable),xt(r)):(A(r,l.draggable),St(r))}},Dt=(e,t)=>{let n=t.showClass||{};e.className=`${l.popup} ${P(e)?n.popup:``}`,t.toast?(k([document.documentElement,document.body],l[`toast-shown`]),k(e,l.toast)):k(e,l.modal),D(e,t,`popup`),typeof t.customClass==`string`&&k(e,t.customClass),t.icon&&k(e,l[`icon-${t.icon}`])},Ot=(e,t)=>{let n=ue();if(!n)return;let{progressSteps:r,currentProgressStep:i}=t;if(!r||r.length===0||i===void 0){N(n);return}M(n),n.textContent=``,i>=r.length&&f(`Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)`),r.forEach((e,a)=>{let o=kt(e);if(n.appendChild(o),a===i&&k(o,l[`active-progress-step`]),a!==r.length-1){let e=At(t);n.appendChild(e)}})},kt=e=>{let t=document.createElement(`li`);return k(t,l[`progress-step`]),T(t,e),t},At=e=>{let t=document.createElement(`li`);return k(t,l[`progress-step-line`]),e.progressStepsDistance&&Te(t,`width`,e.progressStepsDistance),t},jt=(e,t)=>{let n=se();n&&(Ee(n),Oe(n,!!(t.title||t.titleText),`block`),t.title&&He(t.title,n),t.titleText&&(n.innerText=t.titleText),D(n,t,`title`))},Mt=(e,t)=>{var n;Et(e,t),L(e,t),Ot(e,t),dt(e,t),V(e,t),jt(e,t),Xe(e,t),lt(e,t),Ge(e,t),ut(e,t);let r=x();typeof t.didRender==`function`&&r&&t.didRender(r),(n=a.eventEmitter)==null||n.emit(`didRender`,r)},Nt=()=>P(x()),Pt=()=>S()?.click(),Ft=()=>pe()?.click(),It=()=>fe()?.click(),Lt=Object.freeze({cancel:`cancel`,backdrop:`backdrop`,close:`close`,esc:`esc`,timer:`timer`}),Rt=e=>{if(e.keydownTarget&&e.keydownHandlerAdded&&e.keydownHandler){let t=e.keydownHandler;e.keydownTarget.removeEventListener(`keydown`,t,{capture:e.keydownListenerCapture}),e.keydownHandlerAdded=!1}},zt=(e,t,n)=>{if(Rt(e),!t.toast){let r=e=>Ht(t,e,n);e.keydownHandler=r;let i=t.keydownListenerCapture?window:x();if(i){e.keydownTarget=i,e.keydownListenerCapture=t.keydownListenerCapture;let n=r;e.keydownTarget.addEventListener(`keydown`,n,{capture:e.keydownListenerCapture}),e.keydownHandlerAdded=!0}}},Bt=(e,t)=>{var n;let r=ye();return r.length?(e+=t,e===-2&&(e=r.length-1),e===r.length?e=0:e===-1&&(e=r.length-1),r[e].focus(),!(_()&&r[e]instanceof HTMLIFrameElement)):((n=x())==null||n.focus(),!0)},G=[`ArrowRight`,`ArrowDown`],Vt=[`ArrowLeft`,`ArrowUp`],Ht=(e,t,n)=>{e&&(t.isComposing||t.keyCode===229||(e.stopKeydownPropagation&&t.stopPropagation(),t.key===`Enter`?Ut(t,e):t.key===`Tab`?Wt(t):[...G,...Vt].includes(t.key)?Gt(t.key):t.key===`Escape`&&Kt(t,e,n)))},Ut=(e,t)=>{if(!m(t.allowEnterKey))return;let n=x();if(!n||!t.input)return;let r=Ce(n,t.input);if(e.target&&r&&e.target instanceof HTMLElement&&e.target.outerHTML===r.outerHTML){if([`textarea`,`file`].includes(t.input))return;Pt(),e.preventDefault()}},Wt=e=>{let t=e.target,n=ye().findIndex(e=>e===t),r=!0;r=e.shiftKey?Bt(n,-1):Bt(n,1),e.stopPropagation(),r&&e.preventDefault()},Gt=e=>{let t=ge(),n=S(),r=pe(),i=fe();if(!t||!n||!r||!i)return;let a=[n,r,i];if(document.activeElement instanceof HTMLElement&&!a.includes(document.activeElement))return;let o=G.includes(e)?`nextElementSibling`:`previousElementSibling`,s=document.activeElement;if(s){for(let e=0;e<t.children.length;e++){if(s=s[o],!s)return;if(s instanceof HTMLButtonElement&&P(s))break}s instanceof HTMLButtonElement&&s.focus()}},Kt=(e,t,n)=>{e.preventDefault(),m(t.allowEscapeKey)&&n(Lt.esc)};var K={swalPromiseResolve:new WeakMap,swalPromiseReject:new WeakMap};let qt=()=>{let e=v();Array.from(document.body.children).forEach(t=>{t.contains(e)||(t.hasAttribute(`aria-hidden`)&&t.setAttribute(`data-previous-aria-hidden`,t.getAttribute(`aria-hidden`)||``),t.setAttribute(`aria-hidden`,`true`))})},Jt=()=>{Array.from(document.body.children).forEach(e=>{e.hasAttribute(`data-previous-aria-hidden`)?(e.setAttribute(`aria-hidden`,e.getAttribute(`data-previous-aria-hidden`)||``),e.removeAttribute(`data-previous-aria-hidden`)):e.removeAttribute(`aria-hidden`)})},Yt=typeof window<`u`&&!!window.GestureEvent,Xt=Yt&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream,Zt=()=>{if(Yt&&!E(document.body,l.iosfix)){let e=document.body.scrollTop;document.body.style.top=`${e*-1}px`,k(document.body,l.iosfix),Qt()}},Qt=()=>{let e=v();if(!e)return;let t;e.ontouchstart=e=>{t=$t(e)},e.ontouchmove=e=>{t&&(e.preventDefault(),e.stopPropagation())}},$t=e=>{let t=e.target,n=v(),r=ce();return!n||!r||en(e)||tn(e)?!1:t===n||!ke(n)&&t instanceof HTMLElement&&!Ae(t,r)&&t.tagName!==`INPUT`&&t.tagName!==`TEXTAREA`&&!(ke(r)&&r.contains(t))},en=e=>!!(e.touches&&e.touches.length&&e.touches[0].touchType===`stylus`),tn=e=>e.touches&&e.touches.length>1,nn=()=>{if(E(document.body,l.iosfix)){let e=parseInt(document.body.style.top,10);A(document.body,l.iosfix),document.body.style.top=``,document.body.scrollTop=e*-1}},rn=()=>{let e=document.createElement(`div`);e.className=l[`scrollbar-measure`],document.body.appendChild(e);let t=e.getBoundingClientRect().width-e.clientWidth;return document.body.removeChild(e),t},an=null,on=e=>{an===null&&(document.body.scrollHeight>window.innerHeight||e===`scroll`)&&(an=parseInt(window.getComputedStyle(document.body).getPropertyValue(`padding-right`)),document.body.style.paddingRight=`${an+rn()}px`)},sn=()=>{an!==null&&(document.body.style.paddingRight=`${an}px`,an=null)};function cn(e,t,n,r){w()?hn(e,r):(s(n).then(()=>hn(e,r)),Rt(a)),Yt?(t.setAttribute(`style`,`display:none !important`),t.removeAttribute(`class`),t.innerHTML=``):t.remove(),be()&&(sn(),nn(),Jt()),ln()}function ln(){A([document.documentElement,document.body],[l.shown,l[`height-auto`],l[`no-backdrop`],l[`toast-shown`]])}function q(e){e=J(e);let t=K.swalPromiseResolve.get(this),n=un(this);this.isAwaitingPromise?e.isDismissed||(fn(this),t(e)):n&&t(e)}let un=e=>{let t=x();if(!t)return!1;let n=R.innerParams.get(e);if(!n||E(t,n.hideClass.popup))return!1;A(t,n.showClass.popup),k(t,n.hideClass.popup);let r=v();return A(r,n.showClass.backdrop),k(r,n.hideClass.backdrop),pn(e,t,n),!0};function dn(e){let t=K.swalPromiseReject.get(this);fn(this),t&&t(e)}let fn=e=>{e.isAwaitingPromise&&(delete e.isAwaitingPromise,R.innerParams.get(e)||e._destroy())},J=e=>e===void 0?{isConfirmed:!1,isDenied:!1,isDismissed:!0}:Object.assign({isConfirmed:!1,isDenied:!1,isDismissed:!1},e),pn=(e,t,n)=>{var r;let i=v(),o=je(t);typeof n.willClose==`function`&&n.willClose(t),(r=a.eventEmitter)==null||r.emit(`willClose`,t),o&&i?mn(e,t,i,!!n.returnFocus,n.didClose):i&&cn(e,i,!!n.returnFocus,n.didClose)},mn=(e,t,n,r,i)=>{a.swalCloseEventFinishedCallback=cn.bind(null,e,n,r,i);let o=function(e){if(e.target===t){var n;(n=a.swalCloseEventFinishedCallback)==null||n.call(a),delete a.swalCloseEventFinishedCallback,t.removeEventListener(`animationend`,o),t.removeEventListener(`transitionend`,o)}};t.addEventListener(`animationend`,o),t.addEventListener(`transitionend`,o)},hn=(e,t)=>{setTimeout(()=>{var n;typeof t==`function`&&t.bind(e.params)(),(n=a.eventEmitter)==null||n.emit(`didClose`),e._destroy&&e._destroy()})},gn=e=>{let t=x();if(t||new li,t=x(),!t)return;let n=he();w()?N(ae()):_n(t,e),M(n),t.setAttribute(`data-loading`,`true`),t.setAttribute(`aria-busy`,`true`),t.focus()},_n=(e,t)=>{let n=ge(),r=he();!n||!r||(!t&&P(S())&&(t=S()),M(n),t&&(N(t),r.setAttribute(`data-button-to-replace`,t.className),n.insertBefore(r,t)),k([e,n],l.loading))},vn=(e,t)=>{t.input===`select`||t.input===`radio`?Cn(e,t):[`text`,`email`,`number`,`tel`,`textarea`].some(e=>e===t.input)&&(h(t.inputValue)||ie(t.inputValue))&&(gn(S()),wn(e,t))},yn=(e,t)=>{let n=e.getInput();if(!n)return null;switch(t.input){case`checkbox`:return bn(n);case`radio`:return xn(n);case`file`:return Sn(n);default:return t.inputAutoTrim?n.value.trim():n.value}},bn=e=>+!!e.checked,xn=e=>e.checked?e.value:null,Sn=e=>e.files&&e.files.length?e.getAttribute(`multiple`)===null?e.files[0]:e.files:null,Cn=(e,t)=>{let n=x();if(!n)return;let r=e=>{t.input===`select`?Y(n,X(e),t):t.input===`radio`&&Tn(n,X(e),t)};h(t.inputOptions)||ie(t.inputOptions)?(gn(S()),g(t.inputOptions).then(t=>{e.hideLoading(),r(t)})):typeof t.inputOptions==`object`?r(t.inputOptions):p(`Unexpected type of inputOptions! Expected object, Map or Promise, got ${typeof t.inputOptions}`)},wn=(e,t)=>{let n=e.getInput();n&&(N(n),g(t.inputValue).then(r=>{n.value=t.input===`number`?`${parseFloat(r)||0}`:`${r}`,M(n),n.focus(),e.hideLoading()}).catch(t=>{p(`Error in inputValue promise: ${t}`),n.value=``,M(n),n.focus(),e.hideLoading()}))};function Y(e,t,n){let r=j(e,l.select);if(!r)return;let i=(e,t,r)=>{let i=document.createElement(`option`);i.value=r,T(i,t),i.selected=En(r,n.inputValue),e.appendChild(i)};t.forEach(e=>{let t=e[0],n=e[1];if(Array.isArray(n)){let e=document.createElement(`optgroup`);e.label=t,e.disabled=!1,r.appendChild(e),n.forEach(t=>i(e,t[1],t[0]))}else i(r,n,t)}),r.focus()}function Tn(e,t,n){let r=j(e,l.radio);if(!r)return;t.forEach(e=>{let t=e[0],i=e[1],a=document.createElement(`input`),o=document.createElement(`label`);a.type=`radio`,a.name=l.radio,a.value=t,En(t,n.inputValue)&&(a.checked=!0);let s=document.createElement(`span`);T(s,i),s.className=l.label,o.appendChild(a),o.appendChild(s),r.appendChild(o)});let i=r.querySelectorAll(`input`);i.length&&i[0].focus()}let X=e=>(e instanceof Map?Array.from(e):Object.entries(e)).map(([e,t])=>[e,typeof t==`object`?X(t):t]),En=(e,t)=>!!t&&t!=null&&t.toString()===e.toString(),Dn=e=>{let t=R.innerParams.get(e);e.disableButtons(),t.input?An(e,`confirm`):Fn(e,!0)},On=e=>{let t=R.innerParams.get(e);e.disableButtons(),t.returnInputValueOnDeny?An(e,`deny`):Mn(e,!1)},kn=(e,t)=>{e.disableButtons(),t(Lt.cancel)},An=(e,t)=>{let n=R.innerParams.get(e);if(!n.input){p(`The "input" parameter is needed to be set when using returnInputValueOn${ee(t)}`);return}let r=e.getInput(),i=yn(e,n);n.inputValidator?jn(e,i,t):r&&!r.checkValidity()?(e.enableButtons(),e.showValidationMessage(n.validationMessage||r.validationMessage)):t===`deny`?Mn(e,i):Fn(e,i)},jn=(e,t,n)=>{let r=R.innerParams.get(e);e.disableInput(),Promise.resolve().then(()=>g(r.inputValidator(t,r.validationMessage))).then(r=>{e.enableButtons(),e.enableInput(),r?e.showValidationMessage(r):n===`deny`?Mn(e,t):Fn(e,t)})},Mn=(e,t)=>{let n=R.innerParams.get(e);n.showLoaderOnDeny&&gn(pe()),n.preDeny?(e.isAwaitingPromise=!0,Promise.resolve().then(()=>g(n.preDeny(t,n.validationMessage))).then(n=>{n===!1?(e.hideLoading(),fn(e)):e.close({isDenied:!0,value:n===void 0?t:n})}).catch(t=>Pn(e,t))):e.close({isDenied:!0,value:t})},Nn=(e,t)=>{e.close({isConfirmed:!0,value:t})},Pn=(e,t)=>{e.rejectPromise(t)},Fn=(e,t)=>{let n=R.innerParams.get(e);n.showLoaderOnConfirm&&gn(),n.preConfirm?(e.resetValidationMessage(),e.isAwaitingPromise=!0,Promise.resolve().then(()=>g(n.preConfirm(t,n.validationMessage))).then(n=>{P(de())||n===!1?(e.hideLoading(),fn(e)):Nn(e,n===void 0?t:n)}).catch(t=>Pn(e,t))):Nn(e,t)};function In(){let e=R.innerParams.get(this);if(!e)return;let t=R.domCache.get(this);N(t.loader),w()?e.icon&&M(ae()):Ln(t),A([t.popup,t.actions],l.loading),t.popup.removeAttribute(`aria-busy`),t.popup.removeAttribute(`data-loading`),this.enableButtons()}let Ln=e=>{let t=e.loader.getAttribute(`data-button-to-replace`),n=t?e.popup.getElementsByClassName(t):[];n.length?M(n[0],`inline-block`):F()&&N(e.actions)};function Rn(){let e=R.innerParams.get(this),t=R.domCache.get(this);return t?Ce(t.popup,e.input):null}function zn(e,t,n){let r=R.domCache.get(e);t.forEach(e=>{r[e].disabled=n})}function Bn(e,t){let n=x();!n||!e||(e.type===`radio`?n.querySelectorAll(`[name="${l.radio}"]`).forEach(e=>{e.disabled=t}):e.disabled=t)}function Vn(){zn(this,[`confirmButton`,`denyButton`,`cancelButton`],!1);let e=R.focusedElement.get(this);e instanceof HTMLElement&&document.activeElement===document.body&&e.focus(),R.focusedElement.delete(this)}function Hn(){R.focusedElement.set(this,document.activeElement),zn(this,[`confirmButton`,`denyButton`,`cancelButton`],!0)}function Un(){Bn(this.getInput(),!1)}function Wn(){Bn(this.getInput(),!0)}function Gn(e){let t=R.domCache.get(this),n=R.innerParams.get(this);T(t.validationMessage,e),t.validationMessage.className=l[`validation-message`],n.customClass&&n.customClass.validationMessage&&k(t.validationMessage,n.customClass.validationMessage),M(t.validationMessage);let r=this.getInput();r&&(r.setAttribute(`aria-invalid`,`true`),r.setAttribute(`aria-describedby`,l[`validation-message`]),we(r),k(r,l.inputerror))}function Kn(){let e=R.domCache.get(this);e.validationMessage&&N(e.validationMessage);let t=this.getInput();t&&(t.removeAttribute(`aria-invalid`),t.removeAttribute(`aria-describedby`),A(t,l.inputerror))}let Z={title:``,titleText:``,text:``,html:``,footer:``,icon:void 0,iconColor:void 0,iconHtml:void 0,template:void 0,toast:!1,draggable:!1,animation:!0,theme:`light`,showClass:{popup:`swal2-show`,backdrop:`swal2-backdrop-show`,icon:`swal2-icon-show`},hideClass:{popup:`swal2-hide`,backdrop:`swal2-backdrop-hide`,icon:`swal2-icon-hide`},customClass:{},target:`body`,color:void 0,backdrop:!0,heightAuto:!0,allowOutsideClick:!0,allowEscapeKey:!0,allowEnterKey:!0,stopKeydownPropagation:!0,keydownListenerCapture:!1,showConfirmButton:!0,showDenyButton:!1,showCancelButton:!1,preConfirm:void 0,preDeny:void 0,confirmButtonText:`OK`,confirmButtonAriaLabel:``,confirmButtonColor:void 0,denyButtonText:`No`,denyButtonAriaLabel:``,denyButtonColor:void 0,cancelButtonText:`Cancel`,cancelButtonAriaLabel:``,cancelButtonColor:void 0,buttonsStyling:!0,reverseButtons:!1,focusConfirm:!0,focusDeny:!1,focusCancel:!1,returnFocus:!0,showCloseButton:!1,closeButtonHtml:`&times;`,closeButtonAriaLabel:`Close this dialog`,loaderHtml:``,showLoaderOnConfirm:!1,showLoaderOnDeny:!1,imageUrl:void 0,imageWidth:void 0,imageHeight:void 0,imageAlt:``,timer:void 0,timerProgressBar:!1,width:void 0,padding:void 0,background:void 0,input:void 0,inputPlaceholder:``,inputLabel:``,inputValue:``,inputOptions:{},inputAutoFocus:!0,inputAutoTrim:!0,inputAttributes:{},inputValidator:void 0,returnInputValueOnDeny:!1,validationMessage:void 0,grow:!1,position:`center`,progressSteps:[],currentProgressStep:void 0,progressStepsDistance:void 0,willOpen:void 0,didOpen:void 0,didRender:void 0,willClose:void 0,didClose:void 0,didDestroy:void 0,scrollbarPadding:!0,topLayer:!1},qn=`allowEscapeKey.allowOutsideClick.background.buttonsStyling.cancelButtonAriaLabel.cancelButtonColor.cancelButtonText.closeButtonAriaLabel.closeButtonHtml.color.confirmButtonAriaLabel.confirmButtonColor.confirmButtonText.currentProgressStep.customClass.denyButtonAriaLabel.denyButtonColor.denyButtonText.didClose.didDestroy.draggable.footer.hideClass.html.icon.iconColor.iconHtml.imageAlt.imageHeight.imageUrl.imageWidth.preConfirm.preDeny.progressSteps.returnFocus.reverseButtons.showCancelButton.showCloseButton.showConfirmButton.showDenyButton.text.title.titleText.theme.willClose`.split(`.`),Jn={allowEnterKey:void 0},Yn=[`allowOutsideClick`,`allowEnterKey`,`backdrop`,`draggable`,`focusConfirm`,`focusDeny`,`focusCancel`,`returnFocus`,`heightAuto`,`keydownListenerCapture`],Xn=e=>Object.prototype.hasOwnProperty.call(Z,e),Zn=e=>qn.indexOf(e)!==-1,Qn=e=>Jn[e],$n=e=>{Xn(e)||f(`Unknown parameter "${e}"`)},er=e=>{Yn.includes(e)&&f(`The parameter "${e}" is incompatible with toasts`)},tr=e=>{let t=Qn(e);t&&re(e,t)},nr=e=>{e.backdrop===!1&&e.allowOutsideClick&&f('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`'),e.theme&&![`light`,`dark`,`auto`,`minimal`,`borderless`,`bootstrap-4`,`bootstrap-4-light`,`bootstrap-4-dark`,`bootstrap-5`,`bootstrap-5-light`,`bootstrap-5-dark`,`material-ui`,`material-ui-light`,`material-ui-dark`,`embed-iframe`,`bulma`,`bulma-light`,`bulma-dark`].includes(e.theme)&&f(`Invalid theme "${e.theme}"`);for(let t in e)$n(t),e.toast&&er(t),tr(t)};function rr(e){let t=v(),n=x(),r=R.innerParams.get(this);if(!n||E(n,r.hideClass.popup)){f(`You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.`);return}let i=ir(e),a=Object.assign({},r,i);nr(a),t&&(t.dataset.swal2Theme=a.theme),Mt(this,a),R.innerParams.set(this,a),Object.defineProperties(this,{params:{value:Object.assign({},this.params,e),writable:!1,enumerable:!0}})}let ir=e=>{let t={};return Object.keys(e).forEach(n=>{Zn(n)?t[n]=e[n]:f(`Invalid parameter to update: ${n}`)}),t};function ar(){var e;let t=R.domCache.get(this),n=R.innerParams.get(this);if(!n){sr(this);return}t.popup&&a.swalCloseEventFinishedCallback&&(a.swalCloseEventFinishedCallback(),delete a.swalCloseEventFinishedCallback),typeof n.didDestroy==`function`&&n.didDestroy(),(e=a.eventEmitter)==null||e.emit(`didDestroy`),or(this)}let or=e=>{sr(e),delete e.params,delete a.keydownHandler,delete a.keydownTarget,delete a.currentInstance},sr=e=>{e.isAwaitingPromise?(cr(R,e),e.isAwaitingPromise=!0):(cr(K,e),cr(R,e),delete e.isAwaitingPromise,delete e.disableButtons,delete e.enableButtons,delete e.getInput,delete e.disableInput,delete e.enableInput,delete e.hideLoading,delete e.disableLoading,delete e.showValidationMessage,delete e.resetValidationMessage,delete e.close,delete e.closePopup,delete e.closeModal,delete e.closeToast,delete e.rejectPromise,delete e.update,delete e._destroy)},cr=(e,t)=>{for(let n in e)e[n].delete(t)};var lr=Object.freeze({__proto__:null,_destroy:ar,close:q,closeModal:q,closePopup:q,closeToast:q,disableButtons:Hn,disableInput:Wn,disableLoading:In,enableButtons:Vn,enableInput:Un,getInput:Rn,handleAwaitingPromise:fn,hideLoading:In,rejectPromise:dn,resetValidationMessage:Kn,showValidationMessage:Gn,update:rr});let ur=(e,t,n)=>{e.toast?dr(e,t,n):(mr(t),hr(t),gr(e,t,n))},dr=(e,t,n)=>{t.popup.onclick=()=>{e&&(fr(e)||e.timer||e.input)||n(Lt.close)}},fr=e=>!!(e.showConfirmButton||e.showDenyButton||e.showCancelButton||e.showCloseButton),pr=!1,mr=e=>{e.popup.onmousedown=()=>{e.container.onmouseup=function(t){e.container.onmouseup=()=>{},t.target===e.container&&(pr=!0)}}},hr=e=>{e.container.onmousedown=t=>{t.target===e.container&&t.preventDefault(),e.popup.onmouseup=function(t){e.popup.onmouseup=()=>{},(t.target===e.popup||t.target instanceof HTMLElement&&e.popup.contains(t.target))&&(pr=!0)}}},gr=(e,t,n)=>{t.container.onclick=r=>{if(pr){pr=!1;return}r.target===t.container&&m(e.allowOutsideClick)&&n(Lt.backdrop)}},_r=e=>typeof e==`object`&&!!e&&`jquery`in e,vr=e=>e instanceof Element||_r(e),yr=e=>{let t={};return typeof e[0]==`object`&&!vr(e[0])?Object.assign(t,e[0]):[`title`,`html`,`icon`].forEach((n,r)=>{let i=e[r];typeof i==`string`||vr(i)?t[n]=i:i!==void 0&&p(`Unexpected type of ${n}! Expected "string" or "Element", got ${typeof i}`)}),t};function br(...e){return new this(...e)}function xr(e){class t extends this{_main(t,n){return super._main(t,Object.assign({},e,n))}}return t}let Sr=()=>a.timeout&&a.timeout.getTimerLeft(),Cr=()=>{if(a.timeout)return Ne(),a.timeout.stop()},wr=()=>{if(a.timeout){let e=a.timeout.start();return Me(e),e}},Tr=()=>{let e=a.timeout;return e&&(e.running?Cr():wr())},Er=e=>{if(a.timeout){let t=a.timeout.increase(e);return Me(t,!0),t}},Dr=()=>!!(a.timeout&&a.timeout.isRunning()),Or=!1,kr={};function Ar(e=`data-swal-template`){kr[e]=this,Or||=(document.body.addEventListener(`click`,jr),!0)}let jr=e=>{for(let t=e.target;t&&t!==document;t=t.parentNode)for(let e in kr){let n=t.getAttribute&&t.getAttribute(e);if(n){kr[e].fire({template:n});return}}};class Mr{constructor(){this.events={}}_getHandlersByEventName(e){return this.events[e]===void 0&&(this.events[e]=[]),this.events[e]}on(e,t){let n=this._getHandlersByEventName(e);n.includes(t)||n.push(t)}once(e,t){let n=(...r)=>{this.removeListener(e,n),t.apply(this,r)};this.on(e,n)}emit(e,...t){this._getHandlersByEventName(e).forEach(e=>{try{e.apply(this,t)}catch(e){console.error(e)}})}removeListener(e,t){let n=this._getHandlersByEventName(e),r=n.indexOf(t);r>-1&&n.splice(r,1)}removeAllListeners(e){this.events[e]!==void 0&&(this.events[e].length=0)}reset(){this.events={}}}a.eventEmitter=new Mr;var Nr=Object.freeze({__proto__:null,argsToParams:yr,bindClickHandler:Ar,clickCancel:It,clickConfirm:Pt,clickDeny:Ft,enableLoading:gn,fire:br,getActions:ge,getCancelButton:fe,getCloseButton:C,getConfirmButton:S,getContainer:v,getDenyButton:pe,getFocusableElements:ye,getFooter:_e,getHtmlContainer:ce,getIcon:ae,getIconContent:oe,getImage:le,getInputLabel:me,getLoader:he,getPopup:x,getProgressSteps:ue,getTimerLeft:Sr,getTimerProgressBar:ve,getTitle:se,getValidationMessage:de,increaseTimer:Er,isDeprecatedParameter:Qn,isLoading:xe,isTimerRunning:Dr,isUpdatableParameter:Zn,isValidParameter:Xn,isVisible:Nt,mixin:xr,off:(e,t)=>{if(a.eventEmitter){if(!e){a.eventEmitter.reset();return}t?a.eventEmitter.removeListener(e,t):a.eventEmitter.removeAllListeners(e)}},on:(e,t)=>{a.eventEmitter&&a.eventEmitter.on(e,t)},once:(e,t)=>{a.eventEmitter&&a.eventEmitter.once(e,t)},resumeTimer:wr,showLoading:gn,stopTimer:Cr,toggleTimer:Tr});class Pr{constructor(e,t){this.callback=e,this.remaining=t,this.running=!1,this.start()}start(){return this.running||(this.running=!0,this.started=new Date,this.id=setTimeout(this.callback,this.remaining)),this.remaining}stop(){return this.started&&this.running&&(this.running=!1,clearTimeout(this.id),this.remaining-=new Date().getTime()-this.started.getTime()),this.remaining}increase(e){let t=this.running;return t&&this.stop(),this.remaining+=e,t&&this.start(),this.remaining}getTimerLeft(){return this.running&&(this.stop(),this.start()),this.remaining}isRunning(){return this.running}}let Fr=[`swal-title`,`swal-html`,`swal-footer`],Ir=e=>{let t=typeof e.template==`string`?document.querySelector(e.template):e.template;if(!t)return{};let n=t.content;return Wr(n),Object.assign(Lr(n),Rr(n),zr(n),Br(n),Vr(n),Hr(n),Ur(n,Fr))},Lr=e=>{let t={};return Array.from(e.querySelectorAll(`swal-param`)).forEach(e=>{Gr(e,[`name`,`value`]);let n=e.getAttribute(`name`),r=e.getAttribute(`value`);!n||!r||(n in Z&&typeof Z[n]==`boolean`?t[n]=r!==`false`:n in Z&&typeof Z[n]==`object`?t[n]=JSON.parse(r):t[n]=r)}),t},Rr=e=>{let t={};return Array.from(e.querySelectorAll(`swal-function-param`)).forEach(e=>{let n=e.getAttribute(`name`),r=e.getAttribute(`value`);!n||!r||(t[n]=Function(`return ${r}`)())}),t},zr=e=>{let t={};return Array.from(e.querySelectorAll(`swal-button`)).forEach(e=>{Gr(e,[`type`,`color`,`aria-label`]);let n=e.getAttribute(`type`);if(!n||![`confirm`,`cancel`,`deny`].includes(n))return;t[`${n}ButtonText`]=e.innerHTML,t[`show${ee(n)}Button`]=!0;let r=e.getAttribute(`color`);r!==null&&(t[`${n}ButtonColor`]=r);let i=e.getAttribute(`aria-label`);i!==null&&(t[`${n}ButtonAriaLabel`]=i)}),t},Br=e=>{let t={},n=e.querySelector(`swal-image`);if(n){Gr(n,[`src`,`width`,`height`,`alt`]);let e=n.getAttribute(`src`);e!==null&&(t.imageUrl=e||void 0);let r=n.getAttribute(`width`);r!==null&&(t.imageWidth=r||void 0);let i=n.getAttribute(`height`);i!==null&&(t.imageHeight=i||void 0);let a=n.getAttribute(`alt`);a!==null&&(t.imageAlt=a||void 0)}return t},Vr=e=>{let t={},n=e.querySelector(`swal-icon`);return n&&(Gr(n,[`type`,`color`]),n.hasAttribute(`type`)&&(t.icon=n.getAttribute(`type`)),n.hasAttribute(`color`)&&(t.iconColor=n.getAttribute(`color`)),t.iconHtml=n.innerHTML),t},Hr=e=>{let t={},n=e.querySelector(`swal-input`);n&&(Gr(n,[`type`,`label`,`placeholder`,`value`]),t.input=n.getAttribute(`type`)||`text`,n.hasAttribute(`label`)&&(t.inputLabel=n.getAttribute(`label`)),n.hasAttribute(`placeholder`)&&(t.inputPlaceholder=n.getAttribute(`placeholder`)),n.hasAttribute(`value`)&&(t.inputValue=n.getAttribute(`value`)));let r=Array.from(e.querySelectorAll(`swal-input-option`));return r.length&&(t.inputOptions={},r.forEach(e=>{Gr(e,[`value`]);let n=e.getAttribute(`value`);if(!n)return;let r=e.innerHTML;t.inputOptions[n]=r})),t},Ur=(e,t)=>{let n={};for(let r in t){let i=t[r],a=e.querySelector(i);a&&(Gr(a,[]),n[i.replace(/^swal-/,``)]=a.innerHTML.trim())}return n},Wr=e=>{let t=Fr.concat([`swal-param`,`swal-function-param`,`swal-button`,`swal-image`,`swal-icon`,`swal-input`,`swal-input-option`]);Array.from(e.children).forEach(e=>{let n=e.tagName.toLowerCase();t.includes(n)||f(`Unrecognized element <${n}>`)})},Gr=(e,t)=>{Array.from(e.attributes).forEach(n=>{t.indexOf(n.name)===-1&&f([`Unrecognized attribute "${n.name}" on <${e.tagName.toLowerCase()}>.`,`${t.length?`Allowed attributes are: ${t.join(`, `)}`:`To set the value, use HTML within the element.`}`])})},Kr=e=>{var t,n;let r=v(),i=x();if(!r||!i)return;typeof e.willOpen==`function`&&e.willOpen(i),(t=a.eventEmitter)==null||t.emit(`willOpen`,i);let o=window.getComputedStyle(document.body).overflowY;if(Xr(r,i,e),setTimeout(()=>{Jr(r,i)},10),be()&&(Yr(r,e.scrollbarPadding!==void 0&&e.scrollbarPadding,o),qt()),Xt&&e.backdrop===!1&&i.scrollHeight>r.clientHeight&&(r.style.pointerEvents=`auto`),!w()&&!a.previousActiveElement&&(a.previousActiveElement=document.activeElement),typeof e.didOpen==`function`){let t=e.didOpen;setTimeout(()=>t(i))}(n=a.eventEmitter)==null||n.emit(`didOpen`,i)},qr=e=>{let t=x();if(!t||e.target!==t)return;let n=v();n&&(t.removeEventListener(`animationend`,qr),t.removeEventListener(`transitionend`,qr),n.style.overflowY=`auto`,A(n,l[`no-transition`]))},Jr=(e,t)=>{je(t)?(e.style.overflowY=`hidden`,t.addEventListener(`animationend`,qr),t.addEventListener(`transitionend`,qr)):e.style.overflowY=`auto`},Yr=(e,t,n)=>{Zt(),t&&n!==`hidden`&&on(n),setTimeout(()=>{e.scrollTop=0})},Xr=(e,t,n)=>{var r;(r=n.showClass)!=null&&r.backdrop&&k(e,n.showClass.backdrop),n.animation?(t.style.setProperty(`opacity`,`0`,`important`),M(t,`grid`),setTimeout(()=>{var e;(e=n.showClass)!=null&&e.popup&&k(t,n.showClass.popup),t.style.removeProperty(`opacity`)},10)):M(t,`grid`),k([document.documentElement,document.body],l.shown),n.heightAuto&&n.backdrop&&!n.toast&&k([document.documentElement,document.body],l[`height-auto`])};var Zr={email:(e,t)=>/^[a-zA-Z0-9.+_'-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]+$/.test(e)?Promise.resolve():Promise.resolve(t||`Invalid email address`),url:(e,t)=>/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(e)?Promise.resolve():Promise.resolve(t||`Invalid URL`)};function Qr(e){e.inputValidator||(e.input===`email`&&(e.inputValidator=Zr.email),e.input===`url`&&(e.inputValidator=Zr.url))}function $r(e){(!e.target||typeof e.target==`string`&&!document.querySelector(e.target)||typeof e.target!=`string`&&!e.target.appendChild)&&(f(`Target parameter is not valid, defaulting to "body"`),e.target=`body`)}function ei(e){Qr(e),e.showLoaderOnConfirm&&!e.preConfirm&&f(`showLoaderOnConfirm is set to true, but preConfirm is not defined.
showLoaderOnConfirm should be used together with preConfirm, see usage example:
https://sweetalert2.github.io/#ajax-request`),$r(e),typeof e.title==`string`&&(e.title=e.title.split(`
`).join(`<br />`)),Ve(e)}let Q;var ti=new WeakMap;class ${constructor(...e){if(r(this,ti,Promise.resolve({isConfirmed:!1,isDenied:!1,isDismissed:!0})),typeof window>`u`)return;Q=this;let t=Object.freeze(this.constructor.argsToParams(e));this.params=t,this.isAwaitingPromise=!1,i(ti,this,this._main(Q.params))}_main(e,t={}){if(nr(Object.assign({},t,e)),a.currentInstance){let e=K.swalPromiseResolve.get(a.currentInstance),{isAwaitingPromise:t}=a.currentInstance;a.currentInstance._destroy(),t||e({isDismissed:!0}),be()&&Jt()}a.currentInstance=Q;let n=ri(e,t);ei(n),Object.freeze(n),a.timeout&&(a.timeout.stop(),delete a.timeout),clearTimeout(a.restoreFocusTimeout);let r=ii(Q);return Mt(Q,n),R.innerParams.set(Q,n),ni(Q,r,n)}then(e){return n(ti,this).then(e)}finally(e){return n(ti,this).finally(e)}}let ni=(e,t,n)=>new Promise((r,i)=>{let o=t=>{e.close({isDismissed:!0,dismiss:t,isConfirmed:!1,isDenied:!1})};K.swalPromiseResolve.set(e,r),K.swalPromiseReject.set(e,i),t.confirmButton.onclick=()=>{Dn(e)},t.denyButton.onclick=()=>{On(e)},t.cancelButton.onclick=()=>{kn(e,o)},t.closeButton.onclick=()=>{o(Lt.close)},ur(n,t,o),zt(a,n,o),vn(e,n),Kr(n),ai(a,n,o),oi(t,n),setTimeout(()=>{t.container.scrollTop=0})}),ri=(e,t)=>{let n=Ir(e),r=Object.assign({},Z,t,n,e);return r.showClass=Object.assign({},Z.showClass,r.showClass),r.hideClass=Object.assign({},Z.hideClass,r.hideClass),r.animation===!1&&(r.showClass={backdrop:`swal2-noanimation`},r.hideClass={}),r},ii=e=>{let t={popup:x(),container:v(),actions:ge(),confirmButton:S(),denyButton:pe(),cancelButton:fe(),loader:he(),closeButton:C(),validationMessage:de(),progressSteps:ue()};return R.domCache.set(e,t),t},ai=(e,t,n)=>{let r=ve();N(r),t.timer&&(e.timeout=new Pr(()=>{n(`timer`),delete e.timeout},t.timer),t.timerProgressBar&&r&&(M(r),D(r,t,`timerProgressBar`),setTimeout(()=>{e.timeout&&e.timeout.running&&Me(t.timer)})))},oi=(e,t)=>{if(!t.toast){if(!m(t.allowEnterKey)){re(`allowEnterKey`,`preConfirm: () => false`),e.popup.focus();return}si(e)||ci(e,t)||Bt(-1,1)}},si=e=>{let t=Array.from(e.popup.querySelectorAll(`[autofocus]`));for(let e of t)if(e instanceof HTMLElement&&P(e))return e.focus(),!0;return!1},ci=(e,t)=>t.focusDeny&&P(e.denyButton)?(e.denyButton.focus(),!0):t.focusCancel&&P(e.cancelButton)?(e.cancelButton.focus(),!0):t.focusConfirm&&P(e.confirmButton)?(e.confirmButton.focus(),!0):!1;$.prototype.disableButtons=Hn,$.prototype.enableButtons=Vn,$.prototype.getInput=Rn,$.prototype.disableInput=Wn,$.prototype.enableInput=Un,$.prototype.hideLoading=In,$.prototype.disableLoading=In,$.prototype.showValidationMessage=Gn,$.prototype.resetValidationMessage=Kn,$.prototype.close=q,$.prototype.closePopup=q,$.prototype.closeModal=q,$.prototype.closeToast=q,$.prototype.rejectPromise=dn,$.prototype.update=rr,$.prototype._destroy=ar,Object.assign($,Nr),Object.keys(lr).forEach(e=>{$[e]=function(...t){if(Q&&Q[e])return Q[e](...t)}}),$.DismissReason=Lt,$.version=`11.26.25`;let li=$;return li.default=li,li})),e!==void 0&&e.Sweetalert2&&(e.swal=e.sweetAlert=e.Swal=e.SweetAlert=e.Sweetalert2),typeof document<`u`&&function(e,t){var n=e.createElement(`style`);if(e.getElementsByTagName(`head`)[0].appendChild(n),n.styleSheet)n.styleSheet.disabled||(n.styleSheet.cssText=t);else try{n.innerHTML=t}catch{n.innerText=t}}(document,`:root{--swal2-outline: 0 0 0 3px rgba(100, 150, 200, 0.5);--swal2-container-padding: 0.625em;--swal2-backdrop: rgba(0, 0, 0, 0.4);--swal2-backdrop-transition: background-color 0.15s;--swal2-width: 32em;--swal2-padding: 0 0 1.25em;--swal2-border: none;--swal2-border-radius: 0.3125rem;--swal2-background: white;--swal2-color: #545454;--swal2-show-animation: swal2-show 0.3s;--swal2-hide-animation: swal2-hide 0.15s forwards;--swal2-icon-zoom: 1;--swal2-title-padding: 0.8em 1em 0;--swal2-html-container-padding: 1em 1.6em 0.3em;--swal2-input-border: 1px solid #d9d9d9;--swal2-input-border-radius: 0.1875em;--swal2-input-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06), 0 0 0 3px transparent;--swal2-input-background: transparent;--swal2-input-transition: border-color 0.2s, box-shadow 0.2s;--swal2-input-hover-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06), 0 0 0 3px transparent;--swal2-input-focus-border: 1px solid #b4dbed;--swal2-input-focus-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06), 0 0 0 3px rgba(100, 150, 200, 0.5);--swal2-progress-step-background: #add8e6;--swal2-validation-message-background: #f0f0f0;--swal2-validation-message-color: #666;--swal2-footer-border-color: #eee;--swal2-footer-background: transparent;--swal2-footer-color: inherit;--swal2-timer-progress-bar-background: rgba(0, 0, 0, 0.3);--swal2-close-button-position: initial;--swal2-close-button-inset: auto;--swal2-close-button-font-size: 2.5em;--swal2-close-button-color: #ccc;--swal2-close-button-transition: color 0.2s, box-shadow 0.2s;--swal2-close-button-outline: initial;--swal2-close-button-box-shadow: inset 0 0 0 3px transparent;--swal2-close-button-focus-box-shadow: inset var(--swal2-outline);--swal2-close-button-hover-transform: none;--swal2-actions-justify-content: center;--swal2-actions-width: auto;--swal2-actions-margin: 1.25em auto 0;--swal2-actions-padding: 0;--swal2-actions-border-radius: 0;--swal2-actions-background: transparent;--swal2-action-button-transition: background-color 0.2s, box-shadow 0.2s;--swal2-action-button-hover: black 10%;--swal2-action-button-active: black 10%;--swal2-confirm-button-box-shadow: none;--swal2-confirm-button-border-radius: 0.25em;--swal2-confirm-button-background-color: #7066e0;--swal2-confirm-button-color: #fff;--swal2-deny-button-box-shadow: none;--swal2-deny-button-border-radius: 0.25em;--swal2-deny-button-background-color: #dc3741;--swal2-deny-button-color: #fff;--swal2-cancel-button-box-shadow: none;--swal2-cancel-button-border-radius: 0.25em;--swal2-cancel-button-background-color: #6e7881;--swal2-cancel-button-color: #fff;--swal2-toast-show-animation: swal2-toast-show 0.5s;--swal2-toast-hide-animation: swal2-toast-hide 0.1s forwards;--swal2-toast-border: none;--swal2-toast-box-shadow: 0 0 1px hsl(0deg 0% 0% / 0.075), 0 1px 2px hsl(0deg 0% 0% / 0.075), 1px 2px 4px hsl(0deg 0% 0% / 0.075), 1px 3px 8px hsl(0deg 0% 0% / 0.075), 2px 4px 16px hsl(0deg 0% 0% / 0.075)}[data-swal2-theme=dark]{--swal2-dark-theme-black: #19191a;--swal2-dark-theme-white: #e1e1e1;--swal2-background: var(--swal2-dark-theme-black);--swal2-color: var(--swal2-dark-theme-white);--swal2-footer-border-color: #555;--swal2-input-background: color-mix(in srgb, var(--swal2-dark-theme-black), var(--swal2-dark-theme-white) 10%);--swal2-validation-message-background: color-mix( in srgb, var(--swal2-dark-theme-black), var(--swal2-dark-theme-white) 10% );--swal2-validation-message-color: var(--swal2-dark-theme-white);--swal2-timer-progress-bar-background: rgba(255, 255, 255, 0.7)}@media(prefers-color-scheme: dark){[data-swal2-theme=auto]{--swal2-dark-theme-black: #19191a;--swal2-dark-theme-white: #e1e1e1;--swal2-background: var(--swal2-dark-theme-black);--swal2-color: var(--swal2-dark-theme-white);--swal2-footer-border-color: #555;--swal2-input-background: color-mix(in srgb, var(--swal2-dark-theme-black), var(--swal2-dark-theme-white) 10%);--swal2-validation-message-background: color-mix( in srgb, var(--swal2-dark-theme-black), var(--swal2-dark-theme-white) 10% );--swal2-validation-message-color: var(--swal2-dark-theme-white);--swal2-timer-progress-bar-background: rgba(255, 255, 255, 0.7)}}body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto !important}body.swal2-no-backdrop .swal2-container{background-color:rgba(0,0,0,0) !important;pointer-events:none}body.swal2-no-backdrop .swal2-container .swal2-popup{pointer-events:auto}body.swal2-no-backdrop .swal2-container .swal2-modal{box-shadow:0 0 10px var(--swal2-backdrop)}body.swal2-toast-shown .swal2-container{box-sizing:border-box;width:360px;max-width:100%;background-color:rgba(0,0,0,0);pointer-events:none}body.swal2-toast-shown .swal2-container.swal2-top{inset:0 auto auto 50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{inset:0 0 auto auto}body.swal2-toast-shown .swal2-container.swal2-top-start,body.swal2-toast-shown .swal2-container.swal2-top-left{inset:0 auto auto 0}body.swal2-toast-shown .swal2-container.swal2-center-start,body.swal2-toast-shown .swal2-container.swal2-center-left{inset:50% auto auto 0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{inset:50% auto auto 50%;transform:translate(-50%, -50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{inset:50% 0 auto auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-start,body.swal2-toast-shown .swal2-container.swal2-bottom-left{inset:auto auto 0 0}body.swal2-toast-shown .swal2-container.swal2-bottom{inset:auto auto 0 50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{inset:auto 0 0 auto}@media print{body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown){overflow-y:scroll !important}body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown) .swal2-container{position:static !important}}div:where(.swal2-container){display:grid;position:fixed;z-index:1060;inset:0;box-sizing:border-box;grid-template-areas:"top-start     top            top-end" "center-start  center         center-end" "bottom-start  bottom-center  bottom-end";grid-template-rows:minmax(min-content, auto) minmax(min-content, auto) minmax(min-content, auto);height:100%;padding:var(--swal2-container-padding);overflow-x:hidden;transition:var(--swal2-backdrop-transition);-webkit-overflow-scrolling:touch}div:where(.swal2-container).swal2-backdrop-show,div:where(.swal2-container).swal2-noanimation{background:var(--swal2-backdrop)}div:where(.swal2-container).swal2-backdrop-hide{background:rgba(0,0,0,0) !important}div:where(.swal2-container).swal2-top-start,div:where(.swal2-container).swal2-center-start,div:where(.swal2-container).swal2-bottom-start{grid-template-columns:minmax(0, 1fr) auto auto}div:where(.swal2-container).swal2-top,div:where(.swal2-container).swal2-center,div:where(.swal2-container).swal2-bottom{grid-template-columns:auto minmax(0, 1fr) auto}div:where(.swal2-container).swal2-top-end,div:where(.swal2-container).swal2-center-end,div:where(.swal2-container).swal2-bottom-end{grid-template-columns:auto auto minmax(0, 1fr)}div:where(.swal2-container).swal2-top-start>.swal2-popup{align-self:start}div:where(.swal2-container).swal2-top>.swal2-popup{grid-column:2;place-self:start center}div:where(.swal2-container).swal2-top-end>.swal2-popup,div:where(.swal2-container).swal2-top-right>.swal2-popup{grid-column:3;place-self:start end}div:where(.swal2-container).swal2-center-start>.swal2-popup,div:where(.swal2-container).swal2-center-left>.swal2-popup{grid-row:2;align-self:center}div:where(.swal2-container).swal2-center>.swal2-popup{grid-column:2;grid-row:2;place-self:center center}div:where(.swal2-container).swal2-center-end>.swal2-popup,div:where(.swal2-container).swal2-center-right>.swal2-popup{grid-column:3;grid-row:2;place-self:center end}div:where(.swal2-container).swal2-bottom-start>.swal2-popup,div:where(.swal2-container).swal2-bottom-left>.swal2-popup{grid-column:1;grid-row:3;align-self:end}div:where(.swal2-container).swal2-bottom>.swal2-popup{grid-column:2;grid-row:3;place-self:end center}div:where(.swal2-container).swal2-bottom-end>.swal2-popup,div:where(.swal2-container).swal2-bottom-right>.swal2-popup{grid-column:3;grid-row:3;place-self:end end}div:where(.swal2-container).swal2-grow-row>.swal2-popup,div:where(.swal2-container).swal2-grow-fullscreen>.swal2-popup{grid-column:1/4;width:100%}div:where(.swal2-container).swal2-grow-column>.swal2-popup,div:where(.swal2-container).swal2-grow-fullscreen>.swal2-popup{grid-row:1/4;align-self:stretch}div:where(.swal2-container).swal2-no-transition{transition:none !important}div:where(.swal2-container)[popover]{width:auto;border:0}div:where(.swal2-container) div:where(.swal2-popup){display:none;position:relative;box-sizing:border-box;grid-template-columns:minmax(0, 100%);width:var(--swal2-width);max-width:100%;padding:var(--swal2-padding);border:var(--swal2-border);border-radius:var(--swal2-border-radius);background:var(--swal2-background);color:var(--swal2-color);font-family:inherit;font-size:1rem}div:where(.swal2-container) div:where(.swal2-popup):focus{outline:none}div:where(.swal2-container) div:where(.swal2-popup).swal2-loading{overflow-y:hidden}div:where(.swal2-container) div:where(.swal2-popup).swal2-draggable{cursor:grab}div:where(.swal2-container) div:where(.swal2-popup).swal2-draggable div:where(.swal2-icon){cursor:grab}div:where(.swal2-container) div:where(.swal2-popup).swal2-dragging{cursor:grabbing}div:where(.swal2-container) div:where(.swal2-popup).swal2-dragging div:where(.swal2-icon){cursor:grabbing}div:where(.swal2-container) h2:where(.swal2-title){position:relative;max-width:100%;margin:0;padding:var(--swal2-title-padding);color:inherit;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;overflow-wrap:break-word;cursor:initial}div:where(.swal2-container) div:where(.swal2-actions){display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:var(--swal2-actions-justify-content);width:var(--swal2-actions-width);margin:var(--swal2-actions-margin);padding:var(--swal2-actions-padding);border-radius:var(--swal2-actions-border-radius);background:var(--swal2-actions-background)}div:where(.swal2-container) div:where(.swal2-loader){display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#2778c4 rgba(0,0,0,0) #2778c4 rgba(0,0,0,0)}div:where(.swal2-container) button:where(.swal2-styled){margin:.3125em;padding:.625em 1.1em;transition:var(--swal2-action-button-transition);border:none;box-shadow:0 0 0 3px rgba(0,0,0,0);font-weight:500}div:where(.swal2-container) button:where(.swal2-styled):not([disabled]){cursor:pointer}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-confirm){border-radius:var(--swal2-confirm-button-border-radius);background:initial;background-color:var(--swal2-confirm-button-background-color);box-shadow:var(--swal2-confirm-button-box-shadow);color:var(--swal2-confirm-button-color);font-size:1em}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-confirm):hover{background-color:color-mix(in srgb, var(--swal2-confirm-button-background-color), var(--swal2-action-button-hover))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-confirm):active{background-color:color-mix(in srgb, var(--swal2-confirm-button-background-color), var(--swal2-action-button-active))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-deny){border-radius:var(--swal2-deny-button-border-radius);background:initial;background-color:var(--swal2-deny-button-background-color);box-shadow:var(--swal2-deny-button-box-shadow);color:var(--swal2-deny-button-color);font-size:1em}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-deny):hover{background-color:color-mix(in srgb, var(--swal2-deny-button-background-color), var(--swal2-action-button-hover))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-deny):active{background-color:color-mix(in srgb, var(--swal2-deny-button-background-color), var(--swal2-action-button-active))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-cancel){border-radius:var(--swal2-cancel-button-border-radius);background:initial;background-color:var(--swal2-cancel-button-background-color);box-shadow:var(--swal2-cancel-button-box-shadow);color:var(--swal2-cancel-button-color);font-size:1em}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-cancel):hover{background-color:color-mix(in srgb, var(--swal2-cancel-button-background-color), var(--swal2-action-button-hover))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-cancel):active{background-color:color-mix(in srgb, var(--swal2-cancel-button-background-color), var(--swal2-action-button-active))}div:where(.swal2-container) button:where(.swal2-styled):focus-visible{outline:none;box-shadow:var(--swal2-action-button-focus-box-shadow)}div:where(.swal2-container) button:where(.swal2-styled)[disabled]:not(.swal2-loading){opacity:.4}div:where(.swal2-container) button:where(.swal2-styled)::-moz-focus-inner{border:0}div:where(.swal2-container) div:where(.swal2-footer){margin:1em 0 0;padding:1em 1em 0;border-top:1px solid var(--swal2-footer-border-color);background:var(--swal2-footer-background);color:var(--swal2-footer-color);font-size:1em;text-align:center;cursor:initial}div:where(.swal2-container) .swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;grid-column:auto !important;overflow:hidden;border-bottom-right-radius:var(--swal2-border-radius);border-bottom-left-radius:var(--swal2-border-radius)}div:where(.swal2-container) div:where(.swal2-timer-progress-bar){width:100%;height:.25em;background:var(--swal2-timer-progress-bar-background)}div:where(.swal2-container) img:where(.swal2-image){max-width:100%;margin:2em auto 1em;cursor:initial}div:where(.swal2-container) button:where(.swal2-close){position:var(--swal2-close-button-position);inset:var(--swal2-close-button-inset);z-index:2;align-items:center;justify-content:center;width:1.2em;height:1.2em;margin-top:0;margin-right:0;margin-bottom:-1.2em;padding:0;overflow:hidden;transition:var(--swal2-close-button-transition);border:none;border-radius:var(--swal2-border-radius);outline:var(--swal2-close-button-outline);background:rgba(0,0,0,0);color:var(--swal2-close-button-color);font-family:monospace;font-size:var(--swal2-close-button-font-size);cursor:pointer;justify-self:end}div:where(.swal2-container) button:where(.swal2-close):hover{transform:var(--swal2-close-button-hover-transform);background:rgba(0,0,0,0);color:#f27474}div:where(.swal2-container) button:where(.swal2-close):focus-visible{outline:none;box-shadow:var(--swal2-close-button-focus-box-shadow)}div:where(.swal2-container) button:where(.swal2-close)::-moz-focus-inner{border:0}div:where(.swal2-container) div:where(.swal2-html-container){z-index:1;justify-content:center;margin:0;padding:var(--swal2-html-container-padding);overflow:auto;color:inherit;font-size:1.125em;font-weight:normal;line-height:normal;text-align:center;overflow-wrap:break-word;word-break:break-word;cursor:initial}div:where(.swal2-container) input:where(.swal2-input),div:where(.swal2-container) input:where(.swal2-file),div:where(.swal2-container) textarea:where(.swal2-textarea),div:where(.swal2-container) select:where(.swal2-select),div:where(.swal2-container) div:where(.swal2-radio),div:where(.swal2-container) label:where(.swal2-checkbox){margin:1em 2em 3px}div:where(.swal2-container) input:where(.swal2-input),div:where(.swal2-container) input:where(.swal2-file),div:where(.swal2-container) textarea:where(.swal2-textarea){box-sizing:border-box;width:auto;transition:var(--swal2-input-transition);border:var(--swal2-input-border);border-radius:var(--swal2-input-border-radius);background:var(--swal2-input-background);box-shadow:var(--swal2-input-box-shadow);color:inherit;font-size:1.125em}div:where(.swal2-container) input:where(.swal2-input).swal2-inputerror,div:where(.swal2-container) input:where(.swal2-file).swal2-inputerror,div:where(.swal2-container) textarea:where(.swal2-textarea).swal2-inputerror{border-color:#f27474 !important;box-shadow:0 0 2px #f27474 !important}div:where(.swal2-container) input:where(.swal2-input):hover,div:where(.swal2-container) input:where(.swal2-file):hover,div:where(.swal2-container) textarea:where(.swal2-textarea):hover{box-shadow:var(--swal2-input-hover-box-shadow)}div:where(.swal2-container) input:where(.swal2-input):focus,div:where(.swal2-container) input:where(.swal2-file):focus,div:where(.swal2-container) textarea:where(.swal2-textarea):focus{border:var(--swal2-input-focus-border);outline:none;box-shadow:var(--swal2-input-focus-box-shadow)}div:where(.swal2-container) input:where(.swal2-input)::placeholder,div:where(.swal2-container) input:where(.swal2-file)::placeholder,div:where(.swal2-container) textarea:where(.swal2-textarea)::placeholder{color:#ccc}div:where(.swal2-container) .swal2-range{margin:1em 2em 3px;background:var(--swal2-background)}div:where(.swal2-container) .swal2-range input{width:80%}div:where(.swal2-container) .swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}div:where(.swal2-container) .swal2-range input,div:where(.swal2-container) .swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}div:where(.swal2-container) .swal2-input{height:2.625em;padding:0 .75em}div:where(.swal2-container) .swal2-file{width:75%;margin-right:auto;margin-left:auto;background:var(--swal2-input-background);font-size:1.125em}div:where(.swal2-container) .swal2-textarea{height:6.75em;padding:.75em}div:where(.swal2-container) .swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:var(--swal2-input-background);color:inherit;font-size:1.125em}div:where(.swal2-container) .swal2-radio,div:where(.swal2-container) .swal2-checkbox{align-items:center;justify-content:center;background:var(--swal2-background);color:inherit}div:where(.swal2-container) .swal2-radio label,div:where(.swal2-container) .swal2-checkbox label{margin:0 .6em;font-size:1.125em}div:where(.swal2-container) .swal2-radio input,div:where(.swal2-container) .swal2-checkbox input{flex-shrink:0;margin:0 .4em}div:where(.swal2-container) label:where(.swal2-input-label){display:flex;justify-content:center;margin:1em auto 0}div:where(.swal2-container) div:where(.swal2-validation-message){align-items:center;justify-content:center;margin:1em 0 0;padding:.625em;overflow:hidden;background:var(--swal2-validation-message-background);color:var(--swal2-validation-message-color);font-size:1em;font-weight:300}div:where(.swal2-container) div:where(.swal2-validation-message)::before{content:"!";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}div:where(.swal2-container) .swal2-progress-steps{flex-wrap:wrap;align-items:center;max-width:100%;margin:1.25em auto;padding:0;background:rgba(0,0,0,0);font-weight:600}div:where(.swal2-container) .swal2-progress-steps li{display:inline-block;position:relative}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:#2778c4;color:#fff;line-height:2em;text-align:center}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#2778c4}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:var(--swal2-progress-step-background);color:#fff}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:var(--swal2-progress-step-background)}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:#2778c4}div:where(.swal2-icon){position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:2.5em auto .6em;zoom:var(--swal2-icon-zoom);border:.25em solid rgba(0,0,0,0);border-radius:50%;border-color:#000;font-family:inherit;line-height:5em;cursor:default;user-select:none}div:where(.swal2-icon) .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}div:where(.swal2-icon).swal2-error{border-color:#f27474;color:#f27474}div:where(.swal2-icon).swal2-error .swal2-x-mark{position:relative;flex-grow:1}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}div:where(.swal2-icon).swal2-error.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-error.swal2-icon-show .swal2-x-mark{animation:swal2-animate-error-x-mark .5s}div:where(.swal2-icon).swal2-warning{border-color:#f8bb86;color:#f8bb86}div:where(.swal2-icon).swal2-warning.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-warning.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .5s}div:where(.swal2-icon).swal2-info{border-color:#3fc3ee;color:#3fc3ee}div:where(.swal2-icon).swal2-info.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-info.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .8s}div:where(.swal2-icon).swal2-question{border-color:#87adbd;color:#87adbd}div:where(.swal2-icon).swal2-question.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-question.swal2-icon-show .swal2-icon-content{animation:swal2-animate-question-mark .8s}div:where(.swal2-icon).swal2-success{border-color:#a5dc86;color:#a5dc86}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;border-radius:50%}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}div:where(.swal2-icon).swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-0.25em;left:-0.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}div:where(.swal2-icon).swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}div:where(.swal2-icon).swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}div:where(.swal2-icon).swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}div:where(.swal2-icon).swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-animate-success-line-tip .75s}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-animate-success-line-long .75s}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-circular-line-right{animation:swal2-rotate-success-circular-line 4.25s ease-in}[class^=swal2]{-webkit-tap-highlight-color:rgba(0,0,0,0)}.swal2-show{animation:var(--swal2-show-animation)}.swal2-hide{animation:var(--swal2-hide-animation)}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{margin-right:initial;margin-left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}.swal2-toast{box-sizing:border-box;grid-column:1/4 !important;grid-row:1/4 !important;grid-template-columns:min-content auto min-content;padding:1em;overflow-y:hidden;border:var(--swal2-toast-border);background:var(--swal2-background);box-shadow:var(--swal2-toast-box-shadow);pointer-events:auto}.swal2-toast>*{grid-column:2}.swal2-toast h2:where(.swal2-title){margin:.5em 1em;padding:0;font-size:1em;text-align:initial}.swal2-toast .swal2-loading{justify-content:center}.swal2-toast input:where(.swal2-input){height:2em;margin:.5em;font-size:1em}.swal2-toast .swal2-validation-message{font-size:1em}.swal2-toast div:where(.swal2-footer){margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-toast button:where(.swal2-close){grid-column:3/3;grid-row:1/99;align-self:center;width:.8em;height:.8em;margin:0;font-size:2em}.swal2-toast div:where(.swal2-html-container){margin:.5em 1em;padding:0;overflow:initial;font-size:1em;text-align:initial}.swal2-toast div:where(.swal2-html-container):empty{padding:0}.swal2-toast .swal2-loader{grid-column:1;grid-row:1/99;align-self:center;width:2em;height:2em;margin:.25em}.swal2-toast .swal2-icon{grid-column:1;grid-row:1/99;align-self:center;width:2em;min-width:2em;height:2em;margin:0 .5em 0 0}.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:bold}.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-toast div:where(.swal2-actions){justify-content:flex-start;height:auto;margin:0;margin-top:.5em;padding:0 .5em}.swal2-toast button:where(.swal2-styled){margin:.25em .5em;padding:.4em .6em;font-size:1em}.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;border-radius:50%}.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.8em;left:-0.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-toast-animate-success-line-tip .75s}.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-toast-animate-success-line-long .75s}.swal2-toast.swal2-show{animation:var(--swal2-toast-show-animation)}.swal2-toast.swal2-hide{animation:var(--swal2-toast-hide-animation)}@keyframes swal2-show{0%{transform:translate3d(0, -50px, 0) scale(0.9);opacity:0}100%{transform:translate3d(0, 0, 0) scale(1);opacity:1}}@keyframes swal2-hide{0%{transform:translate3d(0, 0, 0) scale(1);opacity:1}100%{transform:translate3d(0, -50px, 0) scale(0.9);opacity:0}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-0.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(0.4);opacity:0}50%{margin-top:1.625em;transform:scale(0.4);opacity:0}80%{margin-top:-0.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0deg);opacity:1}}@keyframes swal2-rotate-loading{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes swal2-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@keyframes swal2-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-toast-show{0%{transform:translateY(-0.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(0.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0deg)}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-0.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}`)}))(),1),m=re.default.mixin({toast:!0,position:`bottom-end`,showConfirmButton:!1,timer:3e3,timerProgressBar:!0,customClass:{popup:`toast-red-camino`},showClass:{popup:`animate__animated animate__fadeInUp`},hideClass:{popup:`animate__animated animate__fadeOutDown`},didOpen:e=>{e.addEventListener(`mouseenter`,re.default.stopTimer),e.addEventListener(`mouseleave`,re.default.resumeTimer)}});function h(e){m.fire({icon:`success`,title:e})}function g(e){m.fire({icon:`error`,title:e})}function ie(e){m.fire({icon:`info`,title:e})}function _(e){m.fire({icon:`warning`,title:e})}function v(){return`

        <section class="login">

            <!-- Panel izquierdo con la información principal -->
            <div class="login-left">

                <div class="login-logo">
                    <img src="${l}" alt="Logo">
                </div>

                <h1>Red Camino de María</h1>

                <p>Sistema de gestión para el seguimiento y administración de hogares beneficiarios.</p>

            </div>

            <!-- Panel derecho: tarjeta de formulario centrada -->
            <div class="login-right">

                <div class="login-right-inner">

                    <a href="../index.html" class="login-back">
                        <i class="fa-solid fa-arrow-left"></i> Volver al sitio principal
                    </a>

                    <form id="loginForm" class="login-form">

                        <h2>Iniciar sesión</h2>

                        <div class="form-group">
                            <label>Correo electrónico</label>
                            ${u({id:`loginEmail`,type:`email`,placeholder:`Ingrese su correo`})}
                        </div>

                        <div class="form-group">
                            <label>Contraseña</label>
                            ${u({id:`loginPassword`,type:`password`,placeholder:`Ingrese su contraseña`})}
                        </div>

                        <!-- Aquí se muestra el mensaje de error si las credenciales son incorrectas -->
                        <p id="loginError" class="form-error" style="display:none;"></p>

                        ${d({texto:`Ingresar`,clase:`btn-login`,tipo:`submit`})}

                    </form>

                </div>

            </div>

        </section>

    `}var y={email:``,password:``};function b(){y={email:``,password:``};let e=document.getElementById(`loginForm`);if(!e)return;let t=document.getElementById(`loginEmail`),n=document.getElementById(`loginPassword`);t.addEventListener(`input`,e=>{y.email=e.target.value}),n.addEventListener(`input`,e=>{y.password=e.target.value}),e.addEventListener(`submit`,oe)}function x(){let e=document.getElementById(`loginError`);e.style.display=`none`,e.textContent=``}function ae(e){let t=document.getElementById(`loginError`);t.textContent=e,t.style.display=`block`}async function oe(e){if(e.preventDefault(),x(),!y.email.trim()||!y.password.trim()){_(`Complete el correo y la contraseña.`);return}try{let e=await f(y.email.trim(),y.password.trim());if(!e){ae(`Correo o contraseña incorrectos.`);return}p(e),Z(`dashboard`)}catch(e){console.error(`Error al iniciar sesión:`,e),ae(`No se pudo iniciar sesión. Intente de nuevo.`)}}function se(){return te()}function ce(){return te()!==null}function le(){let e=te();return e?e.rol:null}function ue(){let e=se();return`

        <header class="navbar">

            <div class="navbar-left">

                <button id="menuBtn" class="menu-btn" type="button" aria-label="Abrir menú">

                    <i class="fa-solid fa-bars"></i>

                </button>

                <h2>

                    Red Camino de María

                </h2>

            </div>

            <div class="navbar-right">

                <div class="user-info">

                    <span>

                        ${e.nombre}

                    </span>

                    <small>

                        ${e.rol}

                    </small>

                </div>

                <button id="btnCerrarSesion" class="logout-btn" type="button">

                    <i class="fa-solid fa-right-from-bracket"></i>
                    Cerrar sesión

                </button>

            </div>

        </header>

    `}function de(){let e=document.getElementById(`menuBtn`),t=document.getElementById(`btnCerrarSesion`),n=document.querySelector(`.dashboard-container`);e&&n&&e.addEventListener(`click`,()=>{n.classList.toggle(`sidebar-collapsed`)}),t&&t.addEventListener(`click`,()=>{ne(),Z(`login`)})}var S={administrador:[`dashboard`,`familias`,`perfilFamilia`,`nna`,`perfilNna`,`seguimiento`,`reportes`,`usuarios`],psicologo:[`dashboard`,`familias`,`perfilFamilia`,`nna`,`perfilNna`,`seguimiento`,`reportes`],profesor:[`dashboard`,`familias`,`perfilFamilia`,`nna`,`perfilNna`,`seguimiento`,`reportes`],trabajador:[`dashboard`,`familias`,`perfilFamilia`,`nna`,`perfilNna`,`reportes`]};function fe(e,t){let n=S[e];return n?n.includes(t):!1}var pe={trabajador:{familias:[`editar`,`eliminar`],nna:[`editar`,`eliminar`]}};function me(e,t,n){let r=pe[e];if(!r)return!0;let i=r[t];return!i||!i.includes(n)}var he=[{ruta:`dashboard`,icono:`fa-solid fa-chart-line`,texto:`Panel de control`},{ruta:`familias`,icono:`fa-solid fa-house`,texto:`Familias`},{ruta:`nna`,icono:`fa-solid fa-child`,texto:`Niños, niñas y adolescentes`},{ruta:`seguimiento`,icono:`fa-solid fa-clipboard-check`,texto:`Seguimiento mensual`},{ruta:`reportes`,icono:`fa-solid fa-chart-pie`,texto:`Reportes`},{ruta:`usuarios`,icono:`fa-solid fa-users`,texto:`Administración`}];function ge(e){let t=S[e]||[];return he.filter(e=>t.includes(e.ruta))}function _e(e=`dashboard`){return`

        <aside class="sidebar">

            <div class="sidebar-header">

                <div class="sidebar-logo">

                    <img src="${l}" alt="Logo">

                </div>

                <h2>

                    Red Camino de María

                </h2>

            </div>

            <nav>

                ${ge(le()).map(t=>`

                    <a
                        href="#"
                        data-route="${t.ruta}"
                        class="${t.ruta===e?`active`:``}"
                    >

                        <i class="${t.icono}"></i>

                        <span>${t.texto}</span>

                    </a>

                `).join(``)}

            </nav>

        </aside>

    `}function ve(){document.querySelectorAll(`.sidebar a[data-route]`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault(),Z(e.dataset.route)})})}function C(e,t=`dashboard`){return`

        <div class="dashboard-container">

            ${_e(t)}

            <div class="dashboard-main">

                ${ue()}

                <main class="page-content">

                    ${e}

                </main>

            </div>

        </div>

    `}function ye(e=`dashboard`){de(),ve()}function be(){return C(`

        <section class="page">

            <div class="page-header">
                <div>
                    <div class="eyebrow">Vista general</div>
                    <h1>Bienvenido, ${se()?.nombre||`Usuario`}</h1>
                    <p>Indicadores clave de la fundación, calculados en tiempo real.</p>
                </div>
            </div>

            <div id="dashboardMetrics" class="kpi-grid"></div>

            <div class="grid-2">
                <div class="panel">
                    <div class="panel-title">Niños por barrio</div>
                    <div id="chartBarrio"></div>
                </div>
                <div class="panel">
                    <div class="panel-title">Distribución de estados (mes actual)</div>
                    <div id="chartEstado" class="donut-wrap"></div>
                </div>
            </div>

            <div class="page-header">
                <div>
                    <div class="eyebrow">Economía familiar</div>
                    <h2>Ingresos de las familias</h2>
                    <p>Totales y distribución de los ingresos registrados en cada hogar.</p>
                </div>
            </div>

            <div id="ingresosMetrics" class="kpi-grid"></div>

            <div class="panel">
                <div class="panel-title">Familias por rango de ingresos</div>
                <div id="chartIngresosRango"></div>
            </div>

        </section>

    `)}function w(e,t,n){return`

        <div id="${e}" class="modal-overlay">

            <div class="modal">

                <div class="modal-header">

                    <h2>

                        ${t}

                    </h2>

                    <button
                        type="button"
                        class="modal-close"
                        data-modal="${e}"
                    >

                        <i class="fa-solid fa-xmark"></i>

                    </button>

                </div>

                <div class="modal-body">

                    ${n}

                </div>

            </div>

        </div>

    `}function xe({id:e=``,label:t=``,checked:n=!1,disabled:r=!1}){return`

        <label class="checklist-item">
            <input type="checkbox" id="${e}" ${n?`checked`:``} ${r?`disabled`:``}>
            ${t}
        </label>

    `}function T(){return C(`

        <section class="page">

            <div class="page-header">

                <div>
                    <h1>Gestión de Familias</h1>
                    <p>Administra los hogares beneficiarios.</p>
                </div>

                ${d({texto:`Nueva familia`,icono:`fa-solid fa-plus`,id:`btnNuevaFamilia`})}

            </div>

            <div class="page-tools">
                <input
                    id="buscarFamilia"
                    class="search-input"
                    type="text"
                    placeholder="Buscar familia..."
                >
            </div>

            <div id="familiasGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>

        </section>

        ${w(`modalFamilia`,`<h2 id="formTituloModal">Registrar familia</h2>`,E())}

        ${w(`modalVerFamilia`,`<h2 id="verFamiliaTitulo">Detalle de la familia</h2>`,`<div id="verFamiliaContenido"></div>`)}

    `,`familias`)}function E(){return`

        <form id="formFamilia">

            <div class="form-tabs" id="pasosFamilia">
                <button type="button" class="form-tab-btn active" data-paso="1">1. Control operativo</button>
                <button type="button" class="form-tab-btn" data-paso="2">2. Composición familiar</button>
                <button type="button" class="form-tab-btn" data-paso="3">3. Vivienda</button>
                <button type="button" class="form-tab-btn" data-paso="4">4. Integrantes</button>
            </div>

            <!-- ===================== PASO 1: CONTROL OPERATIVO ===================== -->
            <div class="form-tab-panel active" data-paso-panel="1">

                <div class="form-section-title">Control operativo</div>

                <!-- Marca si el registro de esta familia queda pendiente de validación/revisión -->
                ${xe({id:`pendiente`,label:`Registro pendiente de validación/revisión`})}

                <div class="form-grid">

                    <div class="form-group">
                        <label>Código de hogar</label>
                        ${u({id:`codigoHogar`,placeholder:`Se genera automáticamente`,disabled:!0})}
                    </div>

                    <div class="form-group">
                        <label>Fecha de visita</label>
                        ${u({id:`fechaVisita`,type:`date`,required:!0})}
                    </div>

                    <div class="form-group">
                        <label>Profesional</label>
                        <input type="text" id="profesional" placeholder="Nombre del profesional">
                    </div>

                    <div class="form-group">
                        <label>Departamento</label>
                        <select id="departamento" disabled>
                            <option value="Atlántico" selected>Atlántico</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Municipio</label>
                        <select id="municipio">
                            <option value="">Seleccione...</option>
                            <option value="Barranquilla">Barranquilla</option>
                            <option value="Soledad">Soledad</option>
                            <option value="Malambo">Malambo</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Sector (opcional)</label>
                        <input type="text" id="sector" placeholder="Sector">
                    </div>

                    <div class="form-group">
                        <label>Barrio</label>
                        <input type="text" id="barrio" placeholder="Barrio">
                    </div>

                    <div class="form-group">
                        <label>Dirección</label>
                        <input type="text" id="direccion" placeholder="Dirección">
                    </div>

                    <div class="form-group">
                        <label>Referencia (opcional)</label>
                        <input type="text" id="referencia" placeholder="Punto de referencia">
                    </div>

                    <div class="form-group">
                        <label>Condición (opcional)</label>
                        <input type="text" id="condicion" placeholder="Condición de la zona/vivienda">
                    </div>

                </div>

            </div>

            <!-- ===================== PASO 2: COMPOSICIÓN FAMILIAR ===================== -->
            <div class="form-tab-panel" data-paso-panel="2">

                <div class="form-section-title">Jefe(a) de hogar</div>

                ${Se(`jh`)}

                <label class="checklist-item" style="margin: 10px 0;">
                    <input type="checkbox" id="tienePareja">
                    ¿Tiene pareja?
                </label>

                <div id="parejaContainer" class="form-conditional" hidden>

                    <div class="form-section-title">Pareja del jefe(a) de hogar</div>

                    ${Se(`pareja`,{conEmail:!1})}

                </div>

            </div>

            <!-- ===================== PASO 3: VIVIENDA ===================== -->
            <div class="form-tab-panel" data-paso-panel="3">

                <div class="form-section-title">Datos de la vivienda</div>

                <div class="form-grid">

                    <div class="form-group">
                        <label>Tiempo en la vivienda</label>
                        <select id="tiempoVivienda">
                            <option value="">Seleccione...</option>
                            <option value="0 a 6 meses">0 a 6 meses</option>
                            <option value="7 a 12 meses">7 a 12 meses</option>
                            <option value="1 a 2 años">1 a 2 años</option>
                            <option value="2 a 3 años">2 a 3 años</option>
                            <option value="3 años o más">3 años o más</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Tipo de vivienda</label>
                        <select id="tipoVivienda">
                            <option value="">Seleccione...</option>
                            <option value="Casa">Casa</option>
                            <option value="Apartamento">Apartamento</option>
                            <option value="Pieza/cuarto">Pieza/cuarto</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Material</label>
                        <select id="materialVivienda">
                            <option value="">Seleccione...</option>
                            <option value="Block/ladrillo">Block/ladrillo</option>
                            <option value="Madera/tabla">Madera/tabla</option>
                            <option value="Cartón/plástico/zinc">Cartón/plástico/zinc</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Situación</label>
                        <select id="situacionVivienda">
                            <option value="">Seleccione...</option>
                            <option value="Propia">Propia</option>
                            <option value="Arrendada">Arrendada</option>
                            <option value="Familiar">Familiar</option>
                            <option value="En posesión">En posesión</option>
                            <option value="Usufructo">Usufructo</option>
                            <option value="Invasión terreno">Invasión terreno</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Cuartos totales</label>
                        <input type="number" min="0" id="cuartosTotales">
                    </div>

                    <div class="form-group">
                        <label>Cuartos para dormir</label>
                        <input type="number" min="0" id="cuartosDormir">
                    </div>

                    <div class="form-group">
                        <label>Condición general</label>
                        <select id="condicionGeneral">
                            <option value="">Seleccione...</option>
                            <option value="Buena">Buena</option>
                            <option value="Regular">Regular</option>
                            <option value="Mala">Mala</option>
                        </select>
                    </div>

                </div>

                <div class="form-section-title">Servicios públicos</div>
                <div class="checklist-grid">
                    <label class="checklist-item"><input type="checkbox" id="servEnergia"> Energía</label>
                    <label class="checklist-item"><input type="checkbox" id="servGas"> Gas</label>
                    <label class="checklist-item"><input type="checkbox" id="servAcueducto"> Acueducto</label>
                    <label class="checklist-item"><input type="checkbox" id="servAseo"> Aseo</label>
                    <label class="checklist-item"><input type="checkbox" id="servAlcantarillado"> Alcantarillado</label>
                    <label class="checklist-item"><input type="checkbox" id="servInternet"> Internet</label>
                </div>

                <div class="form-section-title">Factores que afectan al hogar</div>
                <div class="checklist-grid">
                    <label class="checklist-item"><input type="checkbox" id="factorHumedad"> Humedad</label>
                    <label class="checklist-item"><input type="checkbox" id="factorMalosOlores"> Malos olores</label>
                    <label class="checklist-item"><input type="checkbox" id="factorPolvo"> Polvo</label>
                    <label class="checklist-item"><input type="checkbox" id="factorInsectosRoedores"> Insectos/roedores</label>
                </div>

                <div class="form-section-title">Riesgos en la vivienda</div>
                <div class="checklist-grid">
                    <label class="checklist-item"><input type="checkbox" id="riesgoInundacion"> Inundación</label>
                    <label class="checklist-item"><input type="checkbox" id="riesgoDeslizamiento"> Deslizamiento</label>
                    <label class="checklist-item"><input type="checkbox" id="riesgoHundimiento"> Hundimiento</label>
                    <label class="checklist-item"><input type="checkbox" id="riesgoIncendio"> Incendio</label>
                </div>

            </div>

            <!-- ===================== PASO 4: INTEGRANTES ADULTOS ===================== -->
            <div class="form-tab-panel" data-paso-panel="4">

                <div class="form-section-title">Integrantes de 18 años o más</div>

                ${d({texto:`Agregar integrante`,icono:`fa-solid fa-plus`,id:`btnAgregarIntegrante`,clase:`btn-secondary`})}

                <div id="integrantesAdultosContainer" style="margin-top: 12px;"></div>

            </div>

            <!-- ===================== NAVEGACIÓN ENTRE PASOS ===================== -->
            <div class="modal-actions">

                <button type="button" class="btn-secondary" id="btnPasoAnterior" hidden>
                    Anterior
                </button>

                <button type="button" class="btn-primary" id="btnPasoSiguiente">
                    Siguiente
                </button>

                <button type="submit" class="btn-primary" id="btnGuardarFamilia" hidden>
                    Guardar
                </button>

            </div>

        </form>

    `}function Se(e,{conEmail:t=!0}={}){return`

        <div class="form-grid">

            <div class="form-group">
                <label>Nombre</label>
                <input type="text" id="${e}Nombre" placeholder="Nombre completo">
            </div>

            <div class="form-group">
                <label>Tipo de documento</label>
                <select id="${e}TipoDocumento">
                    <option value="">Seleccione...</option>
                    <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
                    <option value="Permiso Por Protección Temporal">Permiso Por Protección Temporal</option>
                    <option value="Cédula de identidad venezolana">Cédula de identidad venezolana</option>
                    <option value="Pasaporte">Pasaporte</option>
                </select>
            </div>

            <div class="form-group">
                <label>Número de documento</label>
                <input type="text" id="${e}Numero" placeholder="Número de documento">
            </div>

            <div class="form-group">
                <label>Fecha de nacimiento</label>
                <input type="date" id="${e}FechaNacimiento">
            </div>

            <div class="form-group">
                <label>Sexo</label>
                <select id="${e}Sexo">
                    <option value="">Seleccione...</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                </select>
            </div>

            <div class="form-group">
                <label>Celular</label>
                <input type="text" id="${e}Celular" placeholder="Celular">
            </div>

            ${t?`
                <div class="form-group">
                    <label>Correo electrónico</label>
                    <input type="email" id="${e}Email" placeholder="correo@ejemplo.com">
                </div>
            `:``}

            <div class="form-group">
                <label>Nacionalidad</label>
                <select id="${e}Nacionalidad">
                    <option value="">Seleccione...</option>
                    <option value="Colombiana">Colombiana</option>
                    <option value="Venezolana">Venezolana</option>
                    <option value="Colombo-venezolana">Colombo-venezolana</option>
                    <option value="Otra">Otra</option>
                </select>
            </div>

            <div class="form-group">
                <label>Nivel educativo</label>
                <select id="${e}NivelEducativo">
                    <option value="">Seleccione...</option>
                    <option value="Ninguno">Ninguno</option>
                    <option value="Primaria">Primaria</option>
                    <option value="Secundaria">Secundaria</option>
                    <option value="Técnico/Tecnólogo/Universitario">Técnico/Tecnólogo/Universitario</option>
                    <option value="Otro">Otro</option>
                </select>
            </div>

            <div class="form-group">
                <label>Ocupación</label>
                <select id="${e}Ocupacion">
                    <option value="">Seleccione...</option>
                    <option value="Trabajador Informal">Trabajador Informal</option>
                    <option value="Trabajador Independiente">Trabajador Independiente</option>
                    <option value="Empleado">Empleado</option>
                    <option value="Buscando trabajo">Buscando trabajo</option>
                    <option value="Oficios del hogar">Oficios del hogar</option>
                    <option value="Otra">Otra</option>
                </select>
            </div>

            <div class="form-group">
                <label>Tipo de trabajo</label>
                <select id="${e}TipoTrabajo">
                    <option value="">Seleccione...</option>
                    <option value="Trabajo permanente">Trabajo permanente</option>
                    <option value="Trabajo ocasional">Trabajo ocasional</option>
                </select>
            </div>

            <div class="form-group">
                <label>Estado civil</label>
                <select id="${e}EstadoCivil">
                    <option value="">Seleccione...</option>
                    <option value="Casado/a">Casado/a</option>
                    <option value="Unión libre">Unión libre</option>
                    <option value="Soltero(a)">Soltero(a)</option>
                    <option value="Viudo(a)">Viudo(a)</option>
                    <option value="Separado(a)">Separado(a)</option>
                </select>
            </div>

        </div>

    `}function D(){return C(`
        <section class="page">
            <div class="page-header">
                <div>
                    <h1>Gestión de NNA</h1>
                    <p>Consulta y administra los niños, niñas y adolescentes del programa.</p>
                </div>
                ${d({texto:`Nuevo registro`,icono:`fa-solid fa-plus`,id:`btnNuevoNna`})}
            </div>

            <div class="page-tools">
                <input id="buscarNna" class="search-input" type="text" placeholder="Buscar NNA...">
            </div>

            <div id="nna-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
        </section>

        ${w(`modalNna`,`<h2 id="formTituloModalNna">Registrar NNA</h2>`,Ce())}
    `,`nna`)}function Ce(){return`
        <form id="formNna">
            <div class="form-section-title">Datos básicos</div>
            <div class="form-grid">
                <div class="form-group">
                    <label>Código NNA</label>
                    <input type="text" id="codigoNna" placeholder="Se genera al guardar" disabled>
                </div>
                <div class="form-group">
                    <label>Hogar al que pertenece</label>
                    <select id="familiaNna"><option value="">Seleccione un hogar...</option></select>
                </div>
                <div class="form-group">
                    <label>Nombre completo</label>
                    <input type="text" id="nombreNna" placeholder="Nombre completo del NNA">
                </div>
                <div class="form-group">
                    <label>Sexo</label>
                    <select id="sexoNna">
                        <option value="">Seleccione...</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Nacionalidad</label>
                    <select id="nacionalidadNna">
                        <option value="">Seleccione...</option>
                        <option value="Colombiana">Colombiana</option>
                        <option value="Venezolana">Venezolana</option>
                        <option value="Colombo-venezolana">Colombo-venezolana</option>
                        <option value="Otra">Otra</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Tipo de documento</label>
                    <select id="tipoDocumentoNna">
                        <option value="">Seleccione...</option>
                        <option value="Registro Civil">Registro Civil</option>
                        <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
                        <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
                        <option value="Permiso Por Protección Temporal">Permiso Por Protección Temporal</option>
                        <option value="Sin documento">Sin documento</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Número de documento</label>
                    <input type="text" id="documentoNna" placeholder="Número de documento">
                </div>
                <div class="form-group">
                    <label>Fecha de nacimiento</label>
                    <input type="date" id="fechaNacimientoNna">
                </div>
                <div class="form-group">
                    <label>Edad</label>
                    <input type="number" id="edadNna" placeholder="Se calcula automáticamente" readonly>
                </div>
            </div>

            <div class="form-section-title">Datos académicos</div>
            <div class="form-grid">
                <div class="form-group">
                    <label>Estado académico inicial FSCM</label>
                    <select id="estadoInicialFscm">
                        <option value="">Seleccione...</option>
                        <option value="Escolarizado">Escolarizado</option>
                        <option value="Desescolarizado">Desescolarizado</option>
                        <option value="Extraedad">Extraedad</option>
                        <option value="No aplica">No aplica</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Estado académico inicial 2026</label>
                    <select id="estadoInicial2026">
                        <option value="">Seleccione...</option>
                        <option value="Escolarizado">Escolarizado</option>
                        <option value="Desescolarizado">Desescolarizado</option>
                        <option value="Extraedad">Extraedad</option>
                        <option value="No aplica">No aplica</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Grado / metodología aspirante</label>
                    <select id="gradoAspirante">
                        <option value="">Seleccione...</option>
                        <option value="Preescolar">Preescolar</option>
                        <option value="Primaria">Primaria</option>
                        <option value="Secundaria">Secundaria</option>
                        <option value="Media">Media</option>
                        <option value="Modelo flexible">Modelo flexible (metodología)</option>
                        <option value="Validación de bachillerato">Validación de bachillerato</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Jornada</label>
                    <select id="jornadaNna">
                        <option value="">Seleccione...</option>
                        <option value="Mañana">Mañana</option>
                        <option value="Tarde">Tarde</option>
                        <option value="Única">Única</option>
                        <option value="Nocturna">Nocturna</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Año de ingreso</label>
                    <input type="number" id="anioIngreso" placeholder="Ej: 2026" min="2000">
                </div>
            </div>

            <div class="form-section-title">Datos de salud</div>
            <div class="form-grid">
                <div class="form-group">
                    <label>Discapacidad</label>
                    <select id="discapacidadNna">
                        <option value="">Seleccione...</option>
                        <option value="Ninguna">Ninguna</option>
                        <option value="Física">Física</option>
                        <option value="Visual">Visual</option>
                        <option value="Auditiva">Auditiva</option>
                        <option value="Cognitiva">Cognitiva</option>
                        <option value="Múltiple">Múltiple</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Neurodivergencia</label>
                    <input type="text" id="neurodivergenciaNna" placeholder="Ej: TDAH, autismo, dislexia...">
                </div>
                <div class="form-group">
                    <label>¿Cuenta con diagnóstico?</label>
                    <select id="tieneDiagnosticoNna">
                        <option value="">Seleccione...</option>
                        <option value="Sí">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
            </div>

            <div class="form-section-title">Contacto y clasificación</div>
            <div class="form-grid">
                <div class="form-group">
                    <label>Celular (opcional)</label>
                    <input type="text" id="celularNna" placeholder="Celular de contacto">
                </div>
                <div class="form-group">
                    <label>Dirección (opcional)</label>
                    <input type="text" id="direccionNna" placeholder="Dirección">
                </div>
                <div class="form-group">
                    <label>Barrio (opcional)</label>
                    <input type="text" id="barrioNna" placeholder="Barrio">
                </div>
                <div class="form-group">
                    <label>Grupo de validación (opcional)</label>
                    <input type="text" id="grupoValidacionNna" placeholder="Grupo de validación">
                </div>
                <div class="form-group">
                    <label>Plan padrino (opcional)</label>
                    <select id="planPadrinoNna">
                        <option value="">Seleccione...</option>
                        <option value="Sí">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Tipo de beca (opcional)</label>
                    <input type="text" id="tipoBecaNna" placeholder="Tipo de beca">
                </div>
            </div>

            <div class="form-section-title">Servicios necesarios</div>
            <div class="checklist-grid">
                <label class="checklist-item"><input type="checkbox" id="servTramiteDocumentos"> Trámite de documentos</label>
                <label class="checklist-item"><input type="checkbox" id="servActivacionRuta"> Activación de ruta</label>
                <label class="checklist-item"><input type="checkbox" id="servRefuerzo"> Refuerzo escolar</label>
                <label class="checklist-item"><input type="checkbox" id="servAcompanamiento"> Acompañamiento</label>
                <label class="checklist-item"><input type="checkbox" id="servRutaEscolar"> Ruta escolar</label>
                <label class="checklist-item"><input type="checkbox" id="servComedores"> Comedores</label>
                <label class="checklist-item"><input type="checkbox" id="servMatricula"> Matrícula</label>
            </div>

            <div class="form-section-title">Observaciones</div>
            <div class="form-group">
                <label>Observación académica</label>
                <textarea id="observacionAcademicaNna" rows="4" placeholder="Observaciones sobre el proceso académico del NNA"></textarea>
            </div>

            <div class="modal-actions">
                <button type="submit" class="btn-primary">Guardar NNA</button>
            </div>
        </form>
    `}function we(){return C(`

        <section class="page">

            <div class="page-header">

                <div>

                    <h1>Perfil de la familia</h1>

                    <p>Detalle del hogar beneficiario y su estado.</p>

                </div>

            </div>

            <div id="perfilFamiliaContenido">

                <p>Cargando información de la familia...</p>

            </div>

        </section>

    `,`familias`)}var O=`http://localhost:3000`;async function k(){let e=await fetch(`${O}/nna`);if(!e.ok)throw Error(`No se pudieron cargar los niños.`);return await e.json()}async function A(e){let t=await fetch(`${O}/nna/${e}`);if(!t.ok)throw Error(`No se pudo cargar el niño.`);return await t.json()}async function j(e){let t=await fetch(`${O}/nna`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(e)});if(!t.ok)throw Error(`No se pudo crear el registro de NNA.`);return await t.json()}async function Te(e,t){let n=await fetch(`${O}/nna/${e}`,{method:`PUT`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)});if(!n.ok)throw Error(`No se pudo actualizar el registro de NNA.`);return await n.json()}async function M(e){if(!(await fetch(`http://localhost:3000/nna/${e}`,{method:`DELETE`})).ok)throw Error(`No se pudo eliminar el registro de NNA.`);return!0}async function N(){let e=await fetch(`${O}/familias`);if(!e.ok)throw Error(`No se pudieron cargar las familias.`);return await e.json()}async function Ee(e){let t=await fetch(`${O}/familias/${e}`);if(!t.ok)throw Error(`No se pudo cargar la familia.`);return await t.json()}async function De(e){let t=await fetch(`${O}/familias`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(e)});if(!t.ok)throw Error(`No se pudo crear la familia.`);return await t.json()}async function Oe(e){if(!(await fetch(`http://localhost:3000/familias/${e}`,{method:`DELETE`})).ok)throw Error(`No se pudo eliminar la familia.`);return!0}function P(){return C(`
        <section class="page">
            <div id="perfil-nna-container" class="max-w-5xl mx-auto"></div>
        </section>
    `,`nna`)}var F=null,ke=[],Ae=`basicos`;async function je(){let e=Gn();if(!e){g(`No se encontró el NNA que desea ver.`),Z(`nna`);return}try{let[t,n]=await Promise.all([A(e),N()]);F=t,ke=n,Ae=`basicos`,Le()}catch(e){console.error(`Error al cargar el NNA:`,e),g(`No se pudo cargar la información del NNA.`)}}function Me(e,t=``){return e==null||e===``?`No registrado`:`${e}${t}`}function Ne(){let e=ke.find(e=>String(e.id)===String(F.familiaId));return e?e.responsable||e.jefeHogar?.nombre||`Hogar sin nombre`:`Sin familia`}function I(e,t){return`
        <div class="flex flex-col gap-1">
            <span class="text-xs uppercase tracking-wide text-gray-400">${e}</span>
            <span class="text-sm text-gray-800">${Me(t)}</span>
        </div>
    `}function Pe(e){let t=String(e||`Inactivo`).toLowerCase();return`<span class="text-xs font-medium px-2 py-1 rounded-full ${t===`activo`?`bg-green-100 text-green-700`:t===`inactivo`?`bg-red-100 text-red-700`:`bg-gray-100 text-gray-700`}">${e||`Inactivo`}</span>`}var Fe=[{id:`basicos`,label:`Datos básicos`},{id:`academico`,label:`Académico`},{id:`salud`,label:`Salud`},{id:`contacto`,label:`Contacto`},{id:`servicios`,label:`Servicios`},{id:`observaciones`,label:`Observaciones`}];function Ie(e){let t=F;if(e===`basicos`)return`
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${I(`Código NNA`,t.id)}
            ${I(`Nombre completo`,t.nombre)}
            ${I(`Hogar`,Ne())}
            ${I(`Sexo`,t.sexo)}
            ${I(`Nacionalidad`,t.nacionalidad)}
            ${I(`Tipo de documento`,t.tipoDocumento)}
            ${I(`Número de documento`,t.documento)}
            ${I(`Fecha de nacimiento`,t.fechaNacimiento)}
            ${I(`Edad`,t.edad)}
        </div>
    `;if(e===`academico`)return`
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${I(`Estado académico inicial FSCM`,t.academico?.estadoInicialFscm)}
            ${I(`Estado académico inicial 2026`,t.academico?.estadoInicial2026)}
            ${I(`Grado / metodología aspirante`,t.academico?.gradoAspirante||t.grado)}
            ${I(`Jornada`,t.academico?.jornada)}
            ${I(`Año de ingreso`,t.academico?.anioIngreso)}
            ${I(`Colegio actual`,t.colegio)}
        </div>
    `;if(e===`salud`)return`
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${I(`Discapacidad`,t.salud?.discapacidad)}
            ${I(`Neurodivergencia`,t.salud?.neurodivergencia)}
            ${I(`¿Cuenta con diagnóstico?`,t.salud?.tieneDiagnostico)}
            ${I(`EPS`,t.eps)}
        </div>
    `;if(e===`contacto`)return`
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${I(`Celular`,t.contacto?.celular)}
            ${I(`Dirección`,t.contacto?.direccion)}
            ${I(`Barrio`,t.contacto?.barrio)}
            ${I(`Grupo de validación`,t.contacto?.grupoValidacion)}
            ${I(`Plan padrino`,t.contacto?.planPadrino)}
            ${I(`Tipo de beca`,t.contacto?.tipoBeca)}
        </div>
    `;if(e===`servicios`){let e=t.servicios||{};return`
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                ${Object.entries({tramiteDocumentos:`Trámite de documentos`,activacionRuta:`Activación de ruta`,refuerzo:`Refuerzo escolar`,acompanamiento:`Acompañamiento`,rutaEscolar:`Ruta escolar`,comedores:`Comedores`,matricula:`Matrícula`}).map(([t,n])=>`
                    <div class="flex items-center gap-2 text-sm">
                        <i class="fa-solid ${e[t]?`fa-circle-check text-green-600`:`fa-circle-xmark text-gray-300`}"></i>
                        <span class="${e[t]?`text-gray-800`:`text-gray-400`}">${n}</span>
                    </div>
                `).join(``)}
            </div>
        `}return e===`observaciones`?`
        <p class="text-sm text-gray-700 whitespace-pre-line">${Me(t.observacionAcademica)}</p>
    `:``}function Le(){let e=document.getElementById(`perfil-nna-container`);if(!e||!F)return;let t=F;e.innerHTML=`
        <div class="flex items-center justify-between mb-4">
            <button id="btnVolverNna" class="text-sm text-gray-500 hover:text-gray-800">
                <i class="fa-solid fa-arrow-left mr-1"></i> Volver al listado
            </button>
            <div class="flex gap-2">
                <button id="btnEditarNna" class="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg">Editar</button>
                <button id="btnEliminarNna" class="bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium px-4 py-2 rounded-lg">Eliminar</button>
            </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-4 flex items-center justify-between">
            <div>
                <p class="text-xs text-gray-400 font-semibold">${t.id}</p>
                <h2 class="text-xl font-semibold text-gray-800">${t.nombre||`Sin nombre`}</h2>
                <p class="text-sm text-gray-500">Hogar: ${Ne()}</p>
            </div>
            ${Pe(t.estado)}
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200">
            <div class="flex flex-wrap border-b border-gray-200 px-2">
                ${Fe.map(e=>`
                    <button data-tab="${e.id}" class="tab-nna-btn px-4 py-3 text-sm font-medium border-b-2 ${Ae===e.id?`border-indigo-600 text-indigo-600`:`border-transparent text-gray-500 hover:text-gray-700`}">
                        ${e.label}
                    </button>
                `).join(``)}
            </div>
            <div class="p-5">
                ${Ie(Ae)}
            </div>
        </div>
    `,e.querySelectorAll(`.tab-nna-btn`).forEach(e=>{e.addEventListener(`click`,()=>{Ae=e.dataset.tab,Le()})}),document.getElementById(`btnVolverNna`).addEventListener(`click`,()=>Z(`nna`)),document.getElementById(`btnEditarNna`).addEventListener(`click`,ze),document.getElementById(`btnEliminarNna`).addEventListener(`click`,Re)}async function Re(){if(await window.confirm(`¿Desea eliminar este registro de NNA?`))try{await M(F.id),ie(`Registro de NNA eliminado correctamente.`),Z(`nna`)}catch(e){console.error(`Error al eliminar el NNA:`,e),g(`No se pudo eliminar el registro de NNA.`)}}function ze(){let e=document.getElementById(`perfil-nna-container`),t=F;e.innerHTML=`
        <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-gray-800">Editar NNA — ${t.id}</h2>
            <button id="btnCancelarEdicionNna" class="text-sm text-gray-500 hover:text-gray-800">Cancelar</button>
        </div>

        <form id="formEditarNna" class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col gap-4">
            <div class="form-section-title">Datos básicos</div>
            <div class="form-grid">
                <div class="form-group"><label>Hogar al que pertenece</label><select id="familiaNna"></select></div>
                <div class="form-group"><label>Nombre completo</label><input type="text" id="nombreNna"></div>
                <div class="form-group"><label>Sexo</label>
                    <select id="sexoNna"><option value="">Seleccione...</option><option value="Masculino">Masculino</option><option value="Femenino">Femenino</option></select>
                </div>
                <div class="form-group"><label>Nacionalidad</label>
                    <select id="nacionalidadNna">
                        <option value="">Seleccione...</option><option value="Colombiana">Colombiana</option>
                        <option value="Venezolana">Venezolana</option><option value="Colombo-venezolana">Colombo-venezolana</option>
                        <option value="Otra">Otra</option>
                    </select>
                </div>
                <div class="form-group"><label>Tipo de documento</label>
                    <select id="tipoDocumentoNna">
                        <option value="">Seleccione...</option><option value="Registro Civil">Registro Civil</option>
                        <option value="Tarjeta de Identidad">Tarjeta de Identidad</option><option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
                        <option value="Permiso Por Protección Temporal">Permiso Por Protección Temporal</option><option value="Sin documento">Sin documento</option>
                    </select>
                </div>
                <div class="form-group"><label>Número de documento</label><input type="text" id="documentoNna"></div>
                <div class="form-group"><label>Fecha de nacimiento</label><input type="date" id="fechaNacimientoNna"></div>
                <div class="form-group"><label>Edad</label><input type="number" id="edadNna" readonly></div>
            </div>

            <div class="form-section-title">Datos académicos</div>
            <div class="form-grid">
                <div class="form-group"><label>Estado académico inicial FSCM</label>
                    <select id="estadoInicialFscm"><option value="">Seleccione...</option><option value="Escolarizado">Escolarizado</option><option value="Desescolarizado">Desescolarizado</option><option value="Extraedad">Extraedad</option><option value="No aplica">No aplica</option></select>
                </div>
                <div class="form-group"><label>Estado académico inicial 2026</label>
                    <select id="estadoInicial2026"><option value="">Seleccione...</option><option value="Escolarizado">Escolarizado</option><option value="Desescolarizado">Desescolarizado</option><option value="Extraedad">Extraedad</option><option value="No aplica">No aplica</option></select>
                </div>
                <div class="form-group"><label>Grado / metodología aspirante</label>
                    <select id="gradoAspirante"><option value="">Seleccione...</option><option value="Preescolar">Preescolar</option><option value="Primaria">Primaria</option><option value="Secundaria">Secundaria</option><option value="Media">Media</option><option value="Modelo flexible">Modelo flexible (metodología)</option><option value="Validación de bachillerato">Validación de bachillerato</option></select>
                </div>
                <div class="form-group"><label>Jornada</label>
                    <select id="jornadaNna"><option value="">Seleccione...</option><option value="Mañana">Mañana</option><option value="Tarde">Tarde</option><option value="Única">Única</option><option value="Nocturna">Nocturna</option></select>
                </div>
                <div class="form-group"><label>Año de ingreso</label><input type="number" id="anioIngreso" min="2000"></div>
            </div>

            <div class="form-section-title">Datos de salud</div>
            <div class="form-grid">
                <div class="form-group"><label>Discapacidad</label>
                    <select id="discapacidadNna"><option value="">Seleccione...</option><option value="Ninguna">Ninguna</option><option value="Física">Física</option><option value="Visual">Visual</option><option value="Auditiva">Auditiva</option><option value="Cognitiva">Cognitiva</option><option value="Múltiple">Múltiple</option></select>
                </div>
                <div class="form-group"><label>Neurodivergencia</label><input type="text" id="neurodivergenciaNna"></div>
                <div class="form-group"><label>¿Cuenta con diagnóstico?</label>
                    <select id="tieneDiagnosticoNna"><option value="">Seleccione...</option><option value="Sí">Sí</option><option value="No">No</option></select>
                </div>
            </div>

            <div class="form-section-title">Contacto y clasificación</div>
            <div class="form-grid">
                <div class="form-group"><label>Celular</label><input type="text" id="celularNna"></div>
                <div class="form-group"><label>Dirección</label><input type="text" id="direccionNna"></div>
                <div class="form-group"><label>Barrio</label><input type="text" id="barrioNna"></div>
                <div class="form-group"><label>Grupo de validación</label><input type="text" id="grupoValidacionNna"></div>
                <div class="form-group"><label>Plan padrino</label>
                    <select id="planPadrinoNna"><option value="">Seleccione...</option><option value="Sí">Sí</option><option value="No">No</option></select>
                </div>
                <div class="form-group"><label>Tipo de beca</label><input type="text" id="tipoBecaNna"></div>
            </div>

            <div class="form-section-title">Servicios necesarios</div>
            <div class="checklist-grid">
                <label class="checklist-item"><input type="checkbox" id="servTramiteDocumentos"> Trámite de documentos</label>
                <label class="checklist-item"><input type="checkbox" id="servActivacionRuta"> Activación de ruta</label>
                <label class="checklist-item"><input type="checkbox" id="servRefuerzo"> Refuerzo escolar</label>
                <label class="checklist-item"><input type="checkbox" id="servAcompanamiento"> Acompañamiento</label>
                <label class="checklist-item"><input type="checkbox" id="servRutaEscolar"> Ruta escolar</label>
                <label class="checklist-item"><input type="checkbox" id="servComedores"> Comedores</label>
                <label class="checklist-item"><input type="checkbox" id="servMatricula"> Matrícula</label>
            </div>

            <div class="form-section-title">Observaciones</div>
            <div class="form-group">
                <label>Observación académica</label>
                <textarea id="observacionAcademicaNna" rows="4"></textarea>
            </div>

            <div class="modal-actions">
                <button type="submit" class="btn-primary">Guardar cambios</button>
            </div>
        </form>
    `,Be(),Ve(t),document.getElementById(`formEditarNna`).addEventListener(`submit`,Ue),document.getElementById(`fechaNacimientoNna`).addEventListener(`change`,He),document.getElementById(`btnCancelarEdicionNna`).addEventListener(`click`,Le)}function Be(){let e=document.getElementById(`familiaNna`);e.innerHTML=`<option value="">Seleccione un hogar...</option>`+ke.map(e=>`<option value="${e.id}">${e.responsable||e.jefeHogar?.nombre||`Hogar sin nombre`} (${e.id})</option>`).join(``)}function Ve(e){document.getElementById(`familiaNna`).value=e.familiaId||``,document.getElementById(`nombreNna`).value=e.nombre||``,document.getElementById(`sexoNna`).value=e.sexo||``,document.getElementById(`nacionalidadNna`).value=e.nacionalidad||``,document.getElementById(`tipoDocumentoNna`).value=e.tipoDocumento||``,document.getElementById(`documentoNna`).value=e.documento||``,document.getElementById(`fechaNacimientoNna`).value=e.fechaNacimiento||``,document.getElementById(`edadNna`).value=e.edad||``,document.getElementById(`estadoInicialFscm`).value=e.academico?.estadoInicialFscm||``,document.getElementById(`estadoInicial2026`).value=e.academico?.estadoInicial2026||``,document.getElementById(`gradoAspirante`).value=e.academico?.gradoAspirante||``,document.getElementById(`jornadaNna`).value=e.academico?.jornada||``,document.getElementById(`anioIngreso`).value=e.academico?.anioIngreso||``,document.getElementById(`discapacidadNna`).value=e.salud?.discapacidad||``,document.getElementById(`neurodivergenciaNna`).value=e.salud?.neurodivergencia||``,document.getElementById(`tieneDiagnosticoNna`).value=e.salud?.tieneDiagnostico||``,document.getElementById(`celularNna`).value=e.contacto?.celular||``,document.getElementById(`direccionNna`).value=e.contacto?.direccion||``,document.getElementById(`barrioNna`).value=e.contacto?.barrio||``,document.getElementById(`grupoValidacionNna`).value=e.contacto?.grupoValidacion||``,document.getElementById(`planPadrinoNna`).value=e.contacto?.planPadrino||``,document.getElementById(`tipoBecaNna`).value=e.contacto?.tipoBeca||``,document.getElementById(`servTramiteDocumentos`).checked=!!e.servicios?.tramiteDocumentos,document.getElementById(`servActivacionRuta`).checked=!!e.servicios?.activacionRuta,document.getElementById(`servRefuerzo`).checked=!!e.servicios?.refuerzo,document.getElementById(`servAcompanamiento`).checked=!!e.servicios?.acompanamiento,document.getElementById(`servRutaEscolar`).checked=!!e.servicios?.rutaEscolar,document.getElementById(`servComedores`).checked=!!e.servicios?.comedores,document.getElementById(`servMatricula`).checked=!!e.servicios?.matricula,document.getElementById(`observacionAcademicaNna`).value=e.observacionAcademica||``}function He(){let e=document.getElementById(`fechaNacimientoNna`),t=document.getElementById(`edadNna`);if(!e.value){t.value=``;return}let n=new Date(e.value),r=new Date,i=r.getFullYear()-n.getFullYear();(r.getMonth()<n.getMonth()||r.getMonth()===n.getMonth()&&r.getDate()<n.getDate())&&i--,t.value=i}async function Ue(e){e.preventDefault();let t=document.getElementById(`nombreNna`).value.trim(),n=document.getElementById(`documentoNna`).value.trim(),r=document.getElementById(`familiaNna`).value,i=document.getElementById(`fechaNacimientoNna`).value;if(!r){_(`Seleccione el hogar al que pertenece el NNA.`);return}if(!t||!n){_(`Complete el nombre y el número de documento del NNA.`);return}if(!i){_(`Seleccione la fecha de nacimiento del NNA.`);return}let a={...F,familiaId:r,nombre:t,sexo:document.getElementById(`sexoNna`).value,nacionalidad:document.getElementById(`nacionalidadNna`).value,tipoDocumento:document.getElementById(`tipoDocumentoNna`).value,documento:n,fechaNacimiento:i,edad:document.getElementById(`edadNna`).value,grado:document.getElementById(`gradoAspirante`).value,academico:{estadoInicialFscm:document.getElementById(`estadoInicialFscm`).value,estadoInicial2026:document.getElementById(`estadoInicial2026`).value,gradoAspirante:document.getElementById(`gradoAspirante`).value,jornada:document.getElementById(`jornadaNna`).value,anioIngreso:document.getElementById(`anioIngreso`).value},salud:{discapacidad:document.getElementById(`discapacidadNna`).value,neurodivergencia:document.getElementById(`neurodivergenciaNna`).value,tieneDiagnostico:document.getElementById(`tieneDiagnosticoNna`).value},contacto:{celular:document.getElementById(`celularNna`).value,direccion:document.getElementById(`direccionNna`).value,barrio:document.getElementById(`barrioNna`).value,grupoValidacion:document.getElementById(`grupoValidacionNna`).value,planPadrino:document.getElementById(`planPadrinoNna`).value,tipoBeca:document.getElementById(`tipoBecaNna`).value},servicios:{tramiteDocumentos:document.getElementById(`servTramiteDocumentos`).checked,activacionRuta:document.getElementById(`servActivacionRuta`).checked,refuerzo:document.getElementById(`servRefuerzo`).checked,acompanamiento:document.getElementById(`servAcompanamiento`).checked,rutaEscolar:document.getElementById(`servRutaEscolar`).checked,comedores:document.getElementById(`servComedores`).checked,matricula:document.getElementById(`servMatricula`).checked},observacionAcademica:document.getElementById(`observacionAcademicaNna`).value};try{await Te(F.id,a),h(`NNA actualizado correctamente.`),F=a,Le()}catch(e){console.error(`Error al actualizar el NNA:`,e),g(`No se pudo actualizar el registro de NNA.`)}}function We({headers:e,bodyId:t,emptyText:n=`No hay registros disponibles.`}){return`

        <div class="table-container">

            <table class="table">

                <thead>

                    <tr>

                        ${e.map(e=>`<th>${e}</th>`).join(``)}

                    </tr>

                </thead>

                <tbody id="${t}">

                    <tr>

                        <td colspan="${e.length}" class="table-empty">

                            ${n}

                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    `}function Ge(e,t=`activo`){return`

        <span class="badge badge-${t}">

            ${e}

        </span>

    `}async function Ke(){let e=await fetch(`${O}/usuarios`);if(!e.ok)throw Error(`No se pudieron cargar los usuarios.`);return await e.json()}async function qe(e){let t=await fetch(`${O}/usuarios/${e}`);if(!t.ok)throw Error(`No se pudo cargar el usuario.`);return await t.json()}async function Je(e){let t=await fetch(`${O}/usuarios`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(e)});if(!t.ok)throw Error(`No se pudo crear el usuario.`);return await t.json()}async function Ye(e,t){let n=await fetch(`${O}/usuarios/${e}`,{method:`PUT`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)});if(!n.ok)throw Error(`No se pudo actualizar el usuario.`);return await n.json()}async function Xe(e){if(!(await fetch(`http://localhost:3000/usuarios/${e}`,{method:`DELETE`})).ok)throw Error(`No se pudo eliminar el usuario.`);return!0}function L(e){let t=document.getElementById(e);t&&t.classList.add(`show`)}function Ze(e){let t=document.getElementById(e);t&&t.classList.remove(`show`)}function Qe(){document.querySelectorAll(`.modal-close`).forEach(e=>{e.addEventListener(`click`,()=>{Ze(e.dataset.modal)})})}function $e(e,t){if(!e||e.length===0)return`${t}-001`;let n=e.map(e=>{let t=String(e.id).split(`-`),n=Number(t[1]);return isNaN(n)?0:n}),r=Math.max(...n)+1;return`${t}-${String(r).padStart(3,`0`)}`}var R=[{value:`administrador`,texto:`Admin`},{value:`psicologo`,texto:`Psicólogo`},{value:`profesor`,texto:`Profesor`}];function et(){return C(`

        <section class="page">

            <div class="page-header">

                <div>
                    <h1>Gestión de usuarios</h1>
                    <p>Administra el personal y los roles del sistema.</p>
                </div>

                ${d({texto:`Nuevo usuario`,icono:`fa-solid fa-user-plus`,id:`btnNuevoUsuario`})}

            </div>

            ${We({headers:[`ID`,`Nombre completo`,`Correo`,`Rol`,`Estado`,`Acciones`],bodyId:`usuariosBody`})}

        </section>

        ${w(`modalUsuario`,`<h2 id="formTituloModalUsuario">Registrar usuario</h2>`,`
                <form id="formUsuario">

                    <div class="form-grid">

                        <div class="form-group">
                            <label>Nombres</label>
                            ${u({id:`nombresUsuario`,placeholder:`Nombres del usuario`})}
                        </div>

                        <div class="form-group">
                            <label>Apellidos</label>
                            ${u({id:`apellidosUsuario`,placeholder:`Apellidos del usuario`})}
                        </div>

                        <div class="form-group">
                            <label>Email</label>
                            ${u({id:`correoUsuario`,type:`email`,placeholder:`correo@redcamino.org`})}
                        </div>

                        <!-- La contraseña solo se pide al crear un usuario nuevo -->
                        <div class="form-group" id="grupoPasswordUsuario">
                            <label>Contraseña</label>
                            ${u({id:`passwordUsuario`,type:`password`,placeholder:`Mínimo 6 caracteres`})}
                        </div>

                        <div class="form-group">
                            <label>Teléfono (opcional)</label>
                            ${u({id:`telefonoUsuario`,placeholder:`Número de contacto`})}
                        </div>

                        <div class="form-group">
                            <label>Rol</label>
                            <select id="rolUsuario">
                                ${R.map(e=>`<option value="${e.value}">${e.texto}</option>`).join(``)}
                            </select>
                        </div>

                        <!-- El estado solo se edita para usuarios ya existentes -->
                        <div class="form-group" id="grupoEstadoUsuario" style="display:none;">
                            <label>Estado</label>
                            <select id="estadoUsuario">
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                        </div>

                    </div>

                    <div class="modal-actions">
                        <button type="submit" class="btn-primary">Guardar usuario</button>
                    </div>

                </form>
            `)}

    `,`usuarios`)}var z=[],tt=!1,nt=null;async function rt(){try{z=await Ke(),B(z),Qe(),document.getElementById(`btnNuevoUsuario`).addEventListener(`click`,()=>{at(),L(`modalUsuario`)}),document.getElementById(`formUsuario`).addEventListener(`submit`,st),document.removeEventListener(`click`,it),document.addEventListener(`click`,it)}catch(e){console.error(`Error al cargar usuarios:`,e),g(`No se pudieron cargar los usuarios.`)}}function it(e){let t=e.target.closest(`button[data-action='editar'][data-tipo='usuario']`),n=e.target.closest(`button[data-action='eliminar'][data-tipo='usuario']`);t&&ot(t.dataset.id),n&&ct(n.dataset.id)}function at(){tt=!1,nt=null,document.getElementById(`formUsuario`).reset(),document.getElementById(`grupoPasswordUsuario`).style.display=`flex`,document.getElementById(`grupoEstadoUsuario`).style.display=`none`,document.getElementById(`formTituloModalUsuario`).textContent=`Registrar usuario`}async function ot(e){try{let t=await qe(e);tt=!0,nt=e;let[n,...r]=String(t.nombre||``).split(` `);document.getElementById(`nombresUsuario`).value=t.nombres||n||``,document.getElementById(`apellidosUsuario`).value=t.apellidos||r.join(` `)||``,document.getElementById(`correoUsuario`).value=t.correo||``,document.getElementById(`telefonoUsuario`).value=t.telefono||``,document.getElementById(`rolUsuario`).value=t.rol||`profesor`,document.getElementById(`estadoUsuario`).value=t.estado||`Activo`,document.getElementById(`grupoPasswordUsuario`).style.display=`none`,document.getElementById(`grupoEstadoUsuario`).style.display=`flex`,document.getElementById(`formTituloModalUsuario`).textContent=`Editar usuario`,L(`modalUsuario`)}catch(e){console.error(`Error al cargar el usuario:`,e),g(`No se pudo cargar el usuario para editar.`)}}async function st(e){e.preventDefault();let t=document.getElementById(`nombresUsuario`).value.trim(),n=document.getElementById(`apellidosUsuario`).value.trim(),r=document.getElementById(`correoUsuario`).value.trim(),i=document.getElementById(`telefonoUsuario`).value.trim(),a=document.getElementById(`rolUsuario`).value;if(!t||!n||!r){_(`Complete los nombres, apellidos y el correo.`);return}try{if(tt&&nt){let e=document.getElementById(`estadoUsuario`).value;if(!e){_(`Seleccione el estado del usuario.`);return}let o={nombres:t,apellidos:n,nombre:`${t} ${n}`,correo:r,telefono:i,rol:a,estado:e};await Ye(nt,o),h(`Usuario actualizado correctamente.`)}else{let e=document.getElementById(`passwordUsuario`).value.trim();if(!e||e.length<6){_(`La contraseña debe tener al menos 6 caracteres.`);return}await Je({id:$e(z,`TRA`),nombres:t,apellidos:n,nombre:`${t} ${n}`,correo:r,password:e,telefono:i,rol:a,estado:`Activo`}),h(`Usuario registrado correctamente.`)}z=await Ke(),B(z),document.getElementById(`formUsuario`).reset(),Ze(`modalUsuario`)}catch(e){console.error(`Error al guardar el usuario:`,e),g(`No se pudo guardar el usuario.`)}}async function ct(e){if(await window.confirm(`¿Desea eliminar este usuario?`))try{await Xe(e),z=z.filter(t=>String(t.id)!==String(e)),B(z),ie(`Usuario eliminado correctamente.`)}catch(e){console.error(`Error al eliminar el usuario:`,e),g(`No se pudo eliminar el usuario.`)}}function B(e){let t=document.getElementById(`usuariosBody`);t&&(t.innerHTML=e.map(e=>`

        <tr>
            <td>${e.id}</td>
            <td>${e.nombre}</td>
            <td>${e.correo}</td>
            <td>${Ge(e.rol,e.rol)}</td>
            <td>${Ge(e.estado||`Activo`,(e.estado||`Activo`).toLowerCase())}</td>
            <td>
                <button class="btn-table" data-action="editar" data-tipo="usuario" data-id="${e.id}">Editar</button>
                <button class="btn-table btn-danger" data-action="eliminar" data-tipo="usuario" data-id="${e.id}">Eliminar</button>
            </td>
        </tr>

    `).join(``))}function lt({headers:e,bodyId:t}){return`

        <div class="table-container">

            <table class="table">

                <thead>

                    <tr>

                        ${e.map(e=>`

                            <th>

                                ${e}

                            </th>

                        `).join(``)}

                    </tr>

                </thead>

                <tbody id="${t}">

                </tbody>

            </table>

        </div>

    `}var ut=[`Enero`,`Febrero`,`Marzo`,`Abril`,`Mayo`,`Junio`,`Julio`,`Agosto`,`Septiembre`,`Octubre`,`Noviembre`,`Diciembre`],dt=[`Preescolar`,`1°`,`2°`,`3°`,`4°`,`5°`,`6°`,`7°`,`8°`,`9°`,`10°`,`11°`,`Validación de bachillerato`];function ft(){let e=new Date;return C(`

        <section class="page">

            <div class="page-header">
                <div>
                    <div class="eyebrow">Seguimiento</div>
                    <h1>Novedades del mes</h1>
                    <p>Marca con un check a los niños y niñas que ya asistieron/fueron atendidos este mes. Al confirmarlos pasan automáticamente a Reportes.</p>
                </div>
            </div>

            <div class="page-tools">
                <div class="filters">
                    <select class="plain" id="mesSeguimiento">
                        ${ut.map((t,n)=>`<option value="${n+1}" ${n+1===e.getMonth()+1?`selected`:``}>${t}</option>`).join(``)}
                    </select>
                    <select class="plain" id="anioSeguimiento">
                        <option ${e.getFullYear()===2026?`selected`:``}>2026</option>
                        <option ${e.getFullYear()===2025?`selected`:``}>2025</option>
                    </select>
                </div>
                <span id="pendientesInfo" class="tag tag-amber">Cargando...</span>
            </div>

            ${lt({headers:[`NNA`,`Documento`,`Familia`,`Estado`,`Confirmar mes`],bodyId:`seguimientosBody`})}

            <div class="page-header">
                <div>
                    <h2>Seguimientos registrados</h2>
                    <p>Detalle académico de cada confirmación del período: colegio, grado y estado del mes.</p>
                </div>
            </div>

            ${lt({headers:[`NNA`,`Estado del mes`,`Colegio actual`,`Grado actual`,`Asistencia`,`Acciones`],bodyId:`seguimientosRegistradosBody`})}

        </section>

        ${w(`modalSeguimiento`,`<h2 id="formTituloModalSeguimiento">Registrar seguimiento</h2>`,`
                <form id="formSeguimiento" class="form-compact">

                    <div class="form-grid">

                        <!-- ===================== CAMPOS OBLIGATORIOS ===================== -->

                        <div class="form-group">
                            <label>Año</label>
                            ${u({id:`seguimientoAnio`,type:`number`,placeholder:`Ej: ${e.getFullYear()}`,value:e.getFullYear()})}
                        </div>

                        <div class="form-group">
                            <label>Mes</label>
                            <select id="seguimientoMes">
                                <option value="">Seleccione...</option>
                                ${ut.map((e,t)=>`<option value="${t+1}">${e}</option>`).join(``)}
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Estado del mes</label>
                            <select id="seguimientoEstadoMes">
                                <option value="">Seleccione...</option>
                                <option value="Activo">Activo</option>
                                <option value="Inasistente">Inasistente</option>
                                <option value="Retirado">Retirado</option>
                                <option value="Egresado">Egresado</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Colegio actual</label>
                            ${u({id:`seguimientoColegioActual`,placeholder:`Nombre del colegio`})}
                        </div>

                        <div class="form-group">
                            <label>Institución</label>
                            ${u({id:`seguimientoInstitucion`,placeholder:`Institución educativa`})}
                        </div>

                        <div class="form-group">
                            <label>Tipo de colegio</label>
                            <select id="seguimientoTipoColegio">
                                <option value="">Seleccione...</option>
                                <option value="Oficial">Oficial</option>
                                <option value="Privado">Privado</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Grado actual</label>
                            <select id="seguimientoGradoActual">
                                <option value="">Seleccione...</option>
                                ${dt.map(e=>`<option value="${e}">${e}</option>`).join(``)}
                            </select>
                        </div>

                        <!-- ===================== CAMPOS OPCIONALES ===================== -->

                        <div class="form-group">
                            <label>Asistencia (opcional)</label>
                            ${u({id:`seguimientoAsistencia`,placeholder:`Ej: 90%`})}
                        </div>

                    </div>

                    <div class="form-group">
                        <label>Egreso o motivo (opcional)</label>
                        <textarea id="seguimientoMotivo" rows="3" placeholder="Motivo de retiro, egreso o novedad del mes"></textarea>
                    </div>

                    <div class="modal-actions">
                        ${d({texto:`Guardar seguimiento`,icono:`fa-solid fa-floppy-disk`,clase:`btn-primary`,tipo:`submit`})}
                    </div>

                </form>
            `)}

    `,`seguimiento`)}function pt(){return C(`

        <section class="page">

            <div class="page-header">
                <div>
                    <div class="eyebrow">Seguimiento confirmado</div>
                    <h1>Reportes</h1>
                    <p>Historial de los meses ya confirmados (con check) para cada niño o niña.</p>
                </div>
            </div>

            <div id="reportesKpi" class="kpi-grid"></div>

            <!-- ===== Exportación general (Tailwind) ===== -->
            <div class="bg-white rounded-xl border border-gray-200 p-4 mb-4">
                <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div>
                        <h2 class="text-base font-semibold text-gray-800">Reporte general del sistema</h2>
                        <p class="text-sm text-gray-500">Exporta NNA y familias activas a un solo archivo Excel.</p>
                    </div>
                    <button id="btnExportarExcel" class="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg px-4 py-2.5">
                        <i class="fa-solid fa-file-excel mr-2"></i>Descargar Reporte General (Excel)
                    </button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div class="bg-gray-50 rounded-lg p-3">
                        <label class="text-xs font-medium text-gray-500">Estado NNA</label>
                        <select id="filtroEstadoNna" class="w-full mt-1 rounded-md border-gray-300 text-sm">
                            <option value="">Todos</option>
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                        </select>
                    </div>
                    <div class="bg-gray-50 rounded-lg p-3">
                        <label class="text-xs font-medium text-gray-500">Colegio</label>
                        <input id="filtroColegio" type="text" placeholder="Filtrar por colegio" class="w-full mt-1 rounded-md border-gray-300 text-sm">
                    </div>
                    <div class="bg-gray-50 rounded-lg p-3">
                        <label class="text-xs font-medium text-gray-500">Código de hogar</label>
                        <input id="filtroCodigoHogar" type="text" placeholder="Ej. HOGAR-001" class="w-full mt-1 rounded-md border-gray-300 text-sm">
                    </div>
                </div>
            </div>

            ${lt({headers:[`NNA`,`Familia`,`Mes`,`Año`,`Fecha de confirmación`],bodyId:`reportesBody`})}

        </section>

    `,`reportes`)}var mt={login:v,dashboard:be,familias:T,nna:D,perfilFamilia:we,perfilNna:P,usuarios:et,seguimiento:ft,reportes:pt};function ht(e,{puedeEditar:t,puedeEliminar:n}){let{id:r,responsable:i,documento:a,barrio:o,estado:s,codigoHogar:c,paso1:l}=e,u=l?.direccion||o||`Sin dirección`;return`
        <article class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col gap-2 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
                <span class="text-xs font-semibold text-white bg-indigo-600 rounded-full px-2 py-1">${c||`Sin código`}</span>
                <span class="text-xs font-medium px-2 py-1 rounded-full ${s===`Activo`?`bg-green-100 text-green-700`:`bg-gray-100 text-gray-600`}">${s||`-`}</span>
            </div>
            <h3 class="text-base font-semibold text-gray-800 truncate">${i||`Sin nombre`}</h3>
            <p class="text-sm text-gray-500 truncate"><i class="fa-solid fa-location-dot mr-1"></i>${u}</p>
            <p class="text-xs text-gray-400">Doc. ${a||`-`}</p>
            <div class="flex flex-wrap gap-2 mt-2 pt-2 border-t border-gray-100">
                <button class="text-sm bg-indigo-600 text-white rounded-lg px-3 py-1.5 hover:bg-indigo-700" data-action="ver" data-tipo="familia" data-id="${r}">Ver Detalle</button>
                ${t?`<button class="icon-btn" title="Editar" data-action="editar" data-tipo="familia" data-id="${r}"><i class="fa-solid fa-pen"></i></button>`:``}
                ${n?`<button class="icon-btn icon-btn-danger" title="Eliminar" data-action="eliminar" data-tipo="familia" data-id="${r}"><i class="fa-solid fa-trash"></i></button>`:``}
            </div>
        </article>
    `}function gt({id:e=``,opciones:t=[],value:n=``,placeholder:r=`Seleccione...`,disabled:i=!1,dataAttrs:a={}}){let o=Object.entries(a).map(([e,t])=>`data-${e}="${t}"`).join(` `);return`

        <select ${e?`id="${e}"`:``} ${o} ${i?`disabled`:``}>

            <option value="" ${n===``?`selected`:``}>${r}</option>

            ${t.map(e=>`
                <option value="${e.value}" ${n===e.value?`selected`:``}>${e.label}</option>
            `).join(``)}

        </select>

    `}var _t=[{value:`Cónyuge`,label:`Cónyuge`},{value:`Hijo/a`,label:`Hijo/a`},{value:`Tío/a`,label:`Tío/a`},{value:`Abuelo/a`,label:`Abuelo/a`},{value:`Otro`,label:`Otro`}],V=[],H=bt(),U=1,vt=4;function yt(){let e=V.map(e=>e.paso1?.codigoHogar).filter(Boolean);if(e.length===0)return`HOGAR-001`;let t=e.map(e=>Number(e.split(`-`)[1])||0),n=Math.max(...t)+1;return`HOGAR-${String(n).padStart(3,`0`)}`}function bt(){return{paso1:{codigoHogar:yt(),pendiente:!1,fechaVisita:``,profesional:``,departamento:`Atlántico`,municipio:``,sector:``,barrio:``,direccion:``,referencia:``,condicion:``},jefeHogar:{nombre:``,tipoDocumento:``,numero:``,fechaNacimiento:``,sexo:``,celular:``,email:``,nacionalidad:``,nivelEducativo:``,ocupacion:``,tipoTrabajo:``,estadoCivil:``},tienePareja:!1,pareja:{nombre:``,tipoDocumento:``,numero:``,fechaNacimiento:``,sexo:``,celular:``,nacionalidad:``,nivelEducativo:``,ocupacion:``,tipoTrabajo:``,estadoCivil:``},vivienda:{tiempoVivienda:``,tipoVivienda:``,materialVivienda:``,situacionVivienda:``,cuartosTotales:0,cuartosDormir:0,condicionGeneral:``,servicios:{energia:!1,gas:!1,acueducto:!1,aseo:!1,alcantarillado:!1,internet:!1},factores:{humedad:!1,malosOlores:!1,polvo:!1,insectosRoedores:!1},riesgos:{inundacion:!1,deslizamiento:!1,hundimiento:!1,incendio:!1}},integrantes:[]}}var xt={pendiente:`paso1.pendiente`,fechaVisita:`paso1.fechaVisita`,profesional:`paso1.profesional`,municipio:`paso1.municipio`,sector:`paso1.sector`,barrio:`paso1.barrio`,direccion:`paso1.direccion`,referencia:`paso1.referencia`,condicion:`paso1.condicion`,jhNombre:`jefeHogar.nombre`,jhTipoDocumento:`jefeHogar.tipoDocumento`,jhNumero:`jefeHogar.numero`,jhFechaNacimiento:`jefeHogar.fechaNacimiento`,jhSexo:`jefeHogar.sexo`,jhCelular:`jefeHogar.celular`,jhEmail:`jefeHogar.email`,jhNacionalidad:`jefeHogar.nacionalidad`,jhNivelEducativo:`jefeHogar.nivelEducativo`,jhOcupacion:`jefeHogar.ocupacion`,jhTipoTrabajo:`jefeHogar.tipoTrabajo`,jhEstadoCivil:`jefeHogar.estadoCivil`,parejaNombre:`pareja.nombre`,parejaTipoDocumento:`pareja.tipoDocumento`,parejaNumero:`pareja.numero`,parejaFechaNacimiento:`pareja.fechaNacimiento`,parejaSexo:`pareja.sexo`,parejaCelular:`pareja.celular`,parejaNacionalidad:`pareja.nacionalidad`,parejaNivelEducativo:`pareja.nivelEducativo`,parejaOcupacion:`pareja.ocupacion`,parejaTipoTrabajo:`pareja.tipoTrabajo`,parejaEstadoCivil:`pareja.estadoCivil`,tiempoVivienda:`vivienda.tiempoVivienda`,tipoVivienda:`vivienda.tipoVivienda`,materialVivienda:`vivienda.materialVivienda`,situacionVivienda:`vivienda.situacionVivienda`,cuartosTotales:`vivienda.cuartosTotales`,cuartosDormir:`vivienda.cuartosDormir`,condicionGeneral:`vivienda.condicionGeneral`,servEnergia:`vivienda.servicios.energia`,servGas:`vivienda.servicios.gas`,servAcueducto:`vivienda.servicios.acueducto`,servAseo:`vivienda.servicios.aseo`,servAlcantarillado:`vivienda.servicios.alcantarillado`,servInternet:`vivienda.servicios.internet`,factorHumedad:`vivienda.factores.humedad`,factorMalosOlores:`vivienda.factores.malosOlores`,factorPolvo:`vivienda.factores.polvo`,factorInsectosRoedores:`vivienda.factores.insectosRoedores`,riesgoInundacion:`vivienda.riesgos.inundacion`,riesgoDeslizamiento:`vivienda.riesgos.deslizamiento`,riesgoHundimiento:`vivienda.riesgos.hundimiento`,riesgoIncendio:`vivienda.riesgos.incendio`};function St(e,t,n){let r=t.split(`.`),i=r.pop(),a=r.reduce((e,t)=>e[t],e);a[i]=n}async function Ct(){try{V=await N(),Rt(V),Qe();let e=document.getElementById(`btnNuevaFamilia`);e&&e.addEventListener(`click`,()=>{Pt(),L(`modalFamilia`)});let t=document.getElementById(`buscarFamilia`);t&&t.addEventListener(`input`,Ft),wt(),Et(),Ot(),document.removeEventListener(`click`,It),document.addEventListener(`click`,It)}catch(e){console.error(`Error al iniciar el módulo de familias:`,e),g(`No se pudieron cargar las familias.`)}}function wt(){let e=document.getElementById(`btnPasoAnterior`),t=document.getElementById(`btnPasoSiguiente`);document.querySelectorAll(`#pasosFamilia .form-tab-btn`).forEach(e=>{e.addEventListener(`click`,()=>W(Number(e.dataset.paso)))}),e&&e.addEventListener(`click`,()=>W(U-1)),t&&t.addEventListener(`click`,()=>{Tt(U)&&W(U+1)})}function W(e){if(e<1||e>vt)return;U=e,document.querySelectorAll(`#pasosFamilia .form-tab-btn`).forEach((e,t)=>{e.classList.toggle(`active`,t===U-1)}),document.querySelectorAll(`.form-tab-panel`).forEach(e=>{e.classList.toggle(`active`,Number(e.dataset.pasoPanel)===U)});let t=document.getElementById(`btnPasoAnterior`),n=document.getElementById(`btnPasoSiguiente`),r=document.getElementById(`btnGuardarFamilia`);t.hidden=U===1,n.hidden=U===vt,r.hidden=U!==vt}function Tt(e){return e===1&&(!H.paso1.fechaVisita||!H.paso1.municipio||!H.paso1.barrio||!H.paso1.direccion)?(_(`Complete fecha de visita, municipio, barrio y dirección antes de continuar.`),!1):e===2&&(!H.jefeHogar.nombre||!H.jefeHogar.numero)?(_(`Complete el nombre y el documento del jefe(a) de hogar.`),!1):!0}function Et(){let e=document.getElementById(`formFamilia`);if(!e)return;e.addEventListener(`input`,Dt),e.addEventListener(`change`,Dt),e.addEventListener(`submit`,Mt);let t=document.getElementById(`tienePareja`);t&&t.addEventListener(`change`,()=>{H.tienePareja=t.checked;let e=document.getElementById(`parejaContainer`);e&&(e.hidden=!t.checked)})}function Dt(e){let t=e.target,n=xt[t.id];if(!n)return;let r=t.value;t.type===`checkbox`&&(r=t.checked),t.type===`number`&&(r=t.value===``?0:Number(t.value)),St(H,n,r)}function Ot(){let e=document.getElementById(`btnAgregarIntegrante`);e&&e.addEventListener(`click`,kt);let t=document.getElementById(`integrantesAdultosContainer`);t&&(t.addEventListener(`input`,jt),t.addEventListener(`change`,jt),t.addEventListener(`click`,e=>{let t=e.target.closest(`button[data-accion='eliminar-integrante']`);if(!t)return;let n=Number(t.dataset.indice);H.integrantes.splice(n,1),At()}))}function kt(){H.integrantes.push({nombre:``,edad:``,sexo:``,parentesco:``,origen:``,educacion:``,actividad:``,aportaIngresos:!1}),At()}function At(){let e=document.getElementById(`integrantesAdultosContainer`);if(e){if(H.integrantes.length===0){e.innerHTML=`<p class="form-hint">Todavía no hay integrantes agregados.</p>`;return}e.innerHTML=H.integrantes.map((e,t)=>`

        <div class="integrante-row" data-indice="${t}">

            <div class="form-group">
                <label>Nombre</label>
                <input type="text" data-campo="nombre" data-indice="${t}" value="${e.nombre}" placeholder="Nombre completo">
            </div>

            <div class="form-group">
                <label>Edad</label>
                <input type="number" min="18" data-campo="edad" data-indice="${t}" value="${e.edad}">
            </div>

            <div class="form-group">
                <label>Sexo</label>
                <select data-campo="sexo" data-indice="${t}">
                    <option value="" ${e.sexo===``?`selected`:``}>Seleccione...</option>
                    <option value="Masculino" ${e.sexo===`Masculino`?`selected`:``}>Masculino</option>
                    <option value="Femenino" ${e.sexo===`Femenino`?`selected`:``}>Femenino</option>
                </select>
            </div>

            <div class="form-group">
                <label>Parentesco</label>
                ${gt({opciones:_t,value:e.parentesco,dataAttrs:{campo:`parentesco`,indice:t}})}
            </div>

            <div class="form-group">
                <label>Origen</label>
                <input type="text" data-campo="origen" data-indice="${t}" value="${e.origen}" placeholder="Ciudad/país de origen">
            </div>

            <div class="form-group">
                <label>Educación</label>
                <input type="text" data-campo="educacion" data-indice="${t}" value="${e.educacion}" placeholder="Nivel educativo">
            </div>

            <div class="form-group">
                <label>Actividad</label>
                <input type="text" data-campo="actividad" data-indice="${t}" value="${e.actividad}" placeholder="A qué se dedica">
            </div>

            <label class="integrante-check">
                <input type="checkbox" data-campo="aportaIngresos" data-indice="${t}" ${e.aportaIngresos?`checked`:``}>
                Aporta ingresos
            </label>

            <button type="button" class="icon-btn icon-btn-danger" data-accion="eliminar-integrante" data-indice="${t}" title="Eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>

        </div>

    `).join(``)}}function jt(e){let t=e.target,n=t.dataset.campo,r=Number(t.dataset.indice);if(!n||Number.isNaN(r))return;let i=t.value;t.type===`checkbox`&&(i=t.checked),t.type===`number`&&(i=t.value===``?``:Number(t.value)),H.integrantes[r][n]=i}async function Mt(e){if(e.preventDefault(),U===vt&&Nt())try{await De({id:$e(V,`FAM`),responsable:H.jefeHogar.nombre,documento:H.jefeHogar.numero,barrio:H.paso1.barrio,estado:`Activo`,codigoHogar:H.paso1.codigoHogar,fechaVisita:H.paso1.fechaVisita,pendiente:H.paso1.pendiente,...H}),h(`Familia registrada correctamente.`),V=await N(),Rt(V),Ze(`modalFamilia`)}catch(e){console.error(`Error al guardar la familia:`,e),g(`No se pudo guardar la familia.`)}}function Nt(){return!H.paso1.fechaVisita||!H.paso1.municipio||!H.paso1.barrio||!H.paso1.direccion?(_(`Complete fecha de visita, municipio, barrio y dirección (Paso 1).`),W(1),!1):!H.jefeHogar.nombre||!H.jefeHogar.numero?(_(`Complete el nombre y el documento del jefe(a) de hogar (Paso 2).`),W(2),!1):H.integrantes.find(e=>!e.nombre||!e.edad)?(_(`Complete nombre y edad de todos los integrantes agregados (Paso 4).`),W(4),!1):!0}function Pt(){H=bt(),U=1;let e=document.getElementById(`formFamilia`);e&&(e.reset(),document.getElementById(`formTituloModal`).textContent=`Registrar familia`),document.getElementById(`codigoHogar`).value=H.paso1.codigoHogar,document.getElementById(`parejaContainer`).hidden=!0,At(),W(1)}function Ft(e){let t=(e.target.value||``).toLowerCase();Rt(V.filter(e=>String(e.responsable||``).toLowerCase().includes(t)||String(e.documento||``).toLowerCase().includes(t)||String(e.barrio||``).toLowerCase().includes(t)))}function It(e){let t=e.target.closest(`button[data-action='ver'][data-tipo='familia']`),n=e.target.closest(`button[data-action='ver-modal'][data-tipo='familia']`),r=e.target.closest(`button[data-action='editar'][data-tipo='familia']`),i=e.target.closest(`button[data-action='eliminar'][data-tipo='familia']`);if(t&&Z(`perfilFamilia`,t.dataset.id),n&&zt(n.dataset.id),r){if(!me(le(),`familias`,`editar`)){_(`No tiene permisos para editar familias.`);return}ie(`La edición de familias con el nuevo formulario por pasos está en construcción.`)}if(i){if(!me(le(),`familias`,`eliminar`)){_(`No tiene permisos para eliminar familias.`);return}Lt(i.dataset.id)}}async function Lt(e){if(await window.confirm(`¿Desea eliminar esta familia?`))try{await Oe(e),V=V.filter(t=>String(t.id)!==String(e)),Rt(V),ie(`Familia eliminada correctamente.`)}catch(e){console.error(`Error al eliminar la familia:`,e),g(`No se pudo eliminar la familia.`)}}function Rt(e){let t=document.getElementById(`familiasGrid`);if(!t)return;let n=le(),r=me(n,`familias`,`editar`),i=me(n,`familias`,`eliminar`);t.innerHTML=e.length?e.map(e=>ht(e,{puedeEditar:r,puedeEliminar:i})).join(``):`<div class="empty-state"><p>No hay familias registradas.</p></div>`}async function zt(e){try{let t=await Ee(e),n=document.getElementById(`verFamiliaContenido`);if(!n)return;n.innerHTML=Bt(t),L(`modalVerFamilia`)}catch(e){console.error(`Error al cargar la familia:`,e),g(`No se pudo cargar la información de la familia.`)}}function Bt(e){return`
        <div class="page-header"><h2>Ubicación</h2></div>
        <p>${e.paso1?.municipio||`-`}, barrio ${e.paso1?.barrio||`-`} — ${e.paso1?.direccion||`-`}</p>

        <div class="page-header"><h2>Jefe(a) de hogar</h2></div>
        <p>${e.jefeHogar?.nombre||`-`} · Doc. ${e.jefeHogar?.numero||`-`} · ${e.jefeHogar?.celular||`Sin celular`}</p>

        ${e.tienePareja?`
            <div class="page-header"><h2>Pareja</h2></div>
            <p>${e.pareja?.nombre||`-`} · Doc. ${e.pareja?.numero||`-`}</p>
        `:``}

        <div class="page-header"><h2>Vivienda</h2></div>
        <p>${e.vivienda?.tipoVivienda||`-`} · ${e.vivienda?.situacionVivienda||`-`} · Condición: ${e.vivienda?.condicionGeneral||`-`}</p>
    `}var G=(e,t)=>`<p class="text-sm text-gray-600"><span class="font-medium text-gray-800">${e}:</span> ${t||`-`}</p>`;function Vt(e){if(!e.tienePareja)return`<div class="bg-white rounded-xl border border-gray-200 p-4"><h2 class="text-base font-semibold text-gray-800 mb-2">Cónyuge / Pareja</h2><p class="text-sm text-gray-400">Esta familia no tiene pareja registrada.</p></div>`;let t=e.pareja||{};return`
        <div class="bg-white rounded-xl border border-gray-200 p-4">
            <h2 class="text-base font-semibold text-gray-800 mb-2">Cónyuge / Pareja</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                ${G(`Nombre`,t.nombre)}
                ${G(`Documento`,`${t.tipoDocumento||`-`} ${t.numero||``}`)}
                ${G(`Fecha de nacimiento`,t.fechaNacimiento)}
                ${G(`Sexo`,t.sexo)}
                ${G(`Celular`,t.celular)}
                ${G(`Nacionalidad`,t.nacionalidad)}
                ${G(`Nivel educativo`,t.nivelEducativo)}
                ${G(`Ocupación`,t.ocupacion)}
                ${G(`Tipo de trabajo`,t.tipoTrabajo)}
                ${G(`Estado civil`,t.estadoCivil)}
            </div>
        </div>
    `}function Ht(e){let t=e.integrantes||[];return`
        <div class="bg-white rounded-xl border border-gray-200 p-4 overflow-x-auto">
            <h2 class="text-base font-semibold text-gray-800 mb-2">Integrantes del hogar (18+)</h2>
            <table class="w-full text-sm text-left">
                <thead>
                    <tr class="border-b border-gray-200 text-gray-500">
                        <th class="py-2 pr-3">Nombre</th><th class="py-2 pr-3">Edad</th><th class="py-2 pr-3">Sexo</th>
                        <th class="py-2 pr-3">Parentesco</th><th class="py-2 pr-3">Origen</th><th class="py-2 pr-3">Educación</th>
                        <th class="py-2 pr-3">Actividad</th><th class="py-2 pr-3">Aporta ingresos</th>
                    </tr>
                </thead>
                <tbody>
                    ${t.length>0?t.map(e=>`
                        <tr class="border-b border-gray-100">
                            <td class="py-2 pr-3">${e.nombre||`-`}</td><td class="py-2 pr-3">${e.edad||`-`}</td>
                            <td class="py-2 pr-3">${e.sexo||`-`}</td><td class="py-2 pr-3">${e.parentesco||`-`}</td>
                            <td class="py-2 pr-3">${e.origen||`-`}</td><td class="py-2 pr-3">${e.educacion||`-`}</td>
                            <td class="py-2 pr-3">${e.actividad||`-`}</td><td class="py-2 pr-3">${e.aportaIngresos?`Sí`:`No`}</td>
                        </tr>
                    `).join(``):`<tr><td colspan="8" class="py-3 text-gray-400">Esta familia todavía no tiene integrantes registrados.</td></tr>`}
                </tbody>
            </table>
        </div>
    `}async function Ut(){let e=Gn(),t=document.getElementById(`perfilFamiliaContenido`);if(!(!t||!e))try{let n=await Ee(e);t.innerHTML=`
            <div class="bg-white rounded-xl border border-gray-200 p-4 flex flex-wrap items-center gap-3 mb-4">
                <span class="text-sm font-semibold text-white bg-indigo-600 rounded-full px-3 py-1">${n.codigoHogar||n.paso1?.codigoHogar||`Sin código`}</span>
                <span class="text-sm text-gray-600"><i class="fa-solid fa-calendar-day mr-1"></i>Fecha de visita: ${n.fechaVisita||n.paso1?.fechaVisita||`-`}</span>
                ${n.pendiente||n.paso1?.pendiente?`<span class="text-xs font-medium px-2 py-1 rounded-full bg-amber-100 text-amber-700">Pendiente</span>`:``}
            </div>

            <div class="bg-white rounded-xl border border-gray-200 p-4 mb-4">
                ${Bt(n)}
            </div>

            <div class="mb-4">${Vt(n)}</div>

            <div class="mb-4">${Ht(n)}</div>

            <div class="modal-actions">
                <button class="btn-primary" id="btnVolverFamilias">Volver a familias</button>
            </div>
        `;let r=document.getElementById(`btnVolverFamilias`);r&&r.addEventListener(`click`,()=>Z(`familias`))}catch(e){console.error(`Error al cargar el perfil de la familia:`,e),g(`No se pudo cargar el perfil de la familia.`)}}function Wt(){return`<div class="loader">Cargando...</div>`}var Gt=[],Kt=[],K=qt();function qt(){return{familiaId:``,nombre:``,sexo:``,nacionalidad:``,tipoDocumento:``,documento:``,fechaNacimiento:``,edad:``,academico:{estadoInicialFscm:``,estadoInicial2026:``,gradoAspirante:``,jornada:``,anioIngreso:``},salud:{discapacidad:``,neurodivergencia:``,tieneDiagnostico:``},contacto:{celular:``,direccion:``,barrio:``,grupoValidacion:``,planPadrino:``,tipoBeca:``},servicios:{tramiteDocumentos:!1,activacionRuta:!1,refuerzo:!1,acompanamiento:!1,rutaEscolar:!1,comedores:!1,matricula:!1},observacionAcademica:``}}var Jt={familiaNna:`familiaId`,nombreNna:`nombre`,sexoNna:`sexo`,nacionalidadNna:`nacionalidad`,tipoDocumentoNna:`tipoDocumento`,documentoNna:`documento`,fechaNacimientoNna:`fechaNacimiento`,estadoInicialFscm:`academico.estadoInicialFscm`,estadoInicial2026:`academico.estadoInicial2026`,gradoAspirante:`academico.gradoAspirante`,jornadaNna:`academico.jornada`,anioIngreso:`academico.anioIngreso`,discapacidadNna:`salud.discapacidad`,neurodivergenciaNna:`salud.neurodivergencia`,tieneDiagnosticoNna:`salud.tieneDiagnostico`,celularNna:`contacto.celular`,direccionNna:`contacto.direccion`,barrioNna:`contacto.barrio`,grupoValidacionNna:`contacto.grupoValidacion`,planPadrinoNna:`contacto.planPadrino`,tipoBecaNna:`contacto.tipoBeca`,servTramiteDocumentos:`servicios.tramiteDocumentos`,servActivacionRuta:`servicios.activacionRuta`,servRefuerzo:`servicios.refuerzo`,servAcompanamiento:`servicios.acompanamiento`,servRutaEscolar:`servicios.rutaEscolar`,servComedores:`servicios.comedores`,servMatricula:`servicios.matricula`,observacionAcademicaNna:`observacionAcademica`};function Yt(e,t,n){let r=t.split(`.`),i=r.pop(),a=r.reduce((e,t)=>e[t],e);a[i]=n}async function Xt(){try{un(),Gt=await k(),Kt=await N(),Zt(),dn(Gt),Qe(),document.getElementById(`btnNuevoNna`)?.addEventListener(`click`,()=>{cn(),L(`modalNna`)}),document.getElementById(`buscarNna`)?.addEventListener(`input`,on),nn(),document.removeEventListener(`click`,sn),document.addEventListener(`click`,sn)}catch(e){console.error(`Error al cargar NNA:`,e),g(`No se pudieron cargar los registros de NNA.`)}}function Zt(){let e=document.getElementById(`familiaNna`);e&&(e.innerHTML=`<option value="">Seleccione un hogar...</option>`+Kt.map(e=>`<option value="${e.id}">${e.responsable||e.jefeHogar?.nombre||`Hogar sin nombre`} (${e.id})</option>`).join(``))}function Qt(e){let t=Kt.find(t=>String(t.id)===String(e));return t?t.responsable||t.jefeHogar?.nombre||`Hogar sin nombre`:`Sin familia`}function $t(e){return e.academico?.gradoAspirante||e.grado||`Sin grado registrado`}function en(e){return e.colegio||`Sin colegio registrado`}function tn(e){let t=String(e||`Inactivo`).trim().toLowerCase();return t===`activo`?`bg-green-100 text-green-700`:t===`inactivo`?`bg-red-100 text-red-700`:t.includes(`proceso`)?`bg-amber-100 text-amber-700`:`bg-gray-100 text-gray-700`}function nn(){let e=document.getElementById(`formNna`);e&&(e.addEventListener(`input`,rn),e.addEventListener(`change`,rn),e.addEventListener(`submit`,ln),document.getElementById(`fechaNacimientoNna`)?.addEventListener(`change`,an))}function rn(e){let t=e.target,n=Jt[t.id];if(!n)return;let r=t.value;t.type===`checkbox`&&(r=t.checked),Yt(K,n,r)}function an(){let e=document.getElementById(`fechaNacimientoNna`),t=document.getElementById(`edadNna`);if(!e.value){t.value=``,K.edad=``;return}let n=new Date(e.value),r=new Date,i=r.getFullYear()-n.getFullYear();(r.getMonth()<n.getMonth()||r.getMonth()===n.getMonth()&&r.getDate()<n.getDate())&&i--,t.value=i,K.edad=i}function on(e){let t=(e.target.value||``).toLowerCase();dn(Gt.filter(e=>String(e.nombre||``).toLowerCase().includes(t)||String(e.documento||``).toLowerCase().includes(t)))}function sn(e){let t=e.target.closest(`.btn-ver-perfil`);t&&Z(`perfilNna`,t.dataset.id)}function cn(){K=qt();let e=document.getElementById(`formNna`);e&&(e.reset(),document.getElementById(`formTituloModalNna`).textContent=`Registrar NNA`)}async function ln(e){if(e.preventDefault(),q())try{await j({id:$e(Gt,`NNA`),nombre:K.nombre,documento:K.documento,edad:K.edad,familiaId:K.familiaId,grado:K.academico.gradoAspirante,estado:`Activo`,...K}),h(`NNA registrado correctamente.`),Gt=await k(),dn(Gt),Ze(`modalNna`)}catch(e){console.error(`Error al guardar el NNA:`,e),g(`No se pudo guardar el registro de NNA.`)}}function q(){return K.familiaId?!K.nombre||!K.documento?(_(`Complete el nombre y el número de documento del NNA.`),!1):K.fechaNacimiento?!0:(_(`Seleccione la fecha de nacimiento del NNA.`),!1):(_(`Seleccione el hogar al que pertenece el NNA.`),!1)}function un(){let e=document.getElementById(`nna-container`);e&&(e.innerHTML=`<div class="col-span-full flex justify-center py-10">${Wt()}</div>`)}function dn(e){let t=document.getElementById(`nna-container`);if(!t)return;if(e.length===0){t.innerHTML=`<p class="col-span-full text-center text-gray-500 py-10">No hay registros de NNA que coincidan con la búsqueda.</p>`;return}let n=``;e.forEach(e=>{let t=e.estado||`Inactivo`;n+=`
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col gap-2 hover:shadow-md transition-shadow">
                <div class="flex items-start justify-between">
                    <span class="text-xs font-semibold text-gray-400">${e.id}</span>
                    <span class="text-xs font-medium px-2 py-1 rounded-full ${tn(t)}">${t}</span>
                </div>
                <h3 class="text-base font-semibold text-gray-800">${e.nombre||`Sin nombre`}</h3>
                <p class="text-sm text-gray-500">Hogar: ${Qt(e.familiaId)}</p>
                <div class="text-sm text-gray-600 flex flex-col gap-1 mt-1">
                    <span><i class="fa-solid fa-graduation-cap mr-1"></i> ${$t(e)}</span>
                    <span><i class="fa-solid fa-school mr-1"></i> ${en(e)}</span>
                </div>
                <button class="btn-ver-perfil mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 rounded-lg transition-colors" data-id="${e.id}">
                    Ver perfil
                </button>
            </div>
        `}),t.innerHTML=n}async function fn(){let[e,t,n]=await Promise.all([fetch(`${O}/familias`),fetch(`${O}/nna`),fetch(`${O}/seguimientos`)]);if(!e.ok||!t.ok||!n.ok)throw Error(`No se pudieron cargar las métricas del dashboard.`);let r=await e.json(),i=await t.json(),a=await n.json(),o=new Date,s=o.getMonth()+1,c=o.getFullYear(),l=a.filter(e=>Number(e.mes)===s&&Number(e.anio)===c).length,u=i.filter(e=>e.estado===`Activo`).length,d=[`Activo`,`Inasistente`,`Retirado`,`Egresado`].reduce((e,t)=>(e[t]=i.filter(e=>(e.estado||`Activo`)===t).length,e),{}),ee=i.filter(e=>{let t=e.salud?.discapacidad;return t&&t!==`Ninguna`}).length,f={};r.forEach(e=>{f[e.id]=e.barrio});let p={};i.forEach(e=>{let t=f[e.familiaId]||`Sin barrio`;p[t]=(p[t]||0)+1});let te=r.map(e=>Number(e.ingresos)||0),ne=te.reduce((e,t)=>e+t,0),re=te.filter(e=>e>0).length,m=re>0?ne/re:0,h=[{etiqueta:`Sin registrar`,min:-1/0,max:0},{etiqueta:`< $500.000`,min:.01,max:5e5},{etiqueta:`$500.000 - $1.000.000`,min:500000.01,max:1e6},{etiqueta:`$1.000.000 - $2.000.000`,min:1000000.01,max:2e6},{etiqueta:`> $2.000.000`,min:2000000.01,max:1/0}].map(e=>[e.etiqueta,te.filter(t=>t>=e.min&&t<=e.max).length]);return{totalFamilias:r.length,totalNna:i.length,pendientesMes:i.filter(e=>e.estado!==`Inactivo`).length-l,activos:u,inactivos:i.length-u,distribucionEstados:d,totalConDiscapacidad:ee,porBarrio:Object.entries(p).sort((e,t)=>t[1]-e[1]),totalIngresos:ne,promedioIngresos:m,rangosIngresos:h}}function J(e,t,n,r){return`

        <article class="kpi-card">

            <div class="kpi-icon" style="background:${r}">

                <i class="${n}"></i>

            </div>

            <div class="kpi-info">

                <h3>

                    ${t}

                </h3>

                <p>

                    ${e}

                </p>

            </div>

        </article>

    `}async function pn(){try{let e=await fn();mn(e),gn(`chartBarrio`,e.porBarrio),vn(e.distribucionEstados),yn(e)}catch(e){console.error(`Error al cargar el dashboard:`,e),g(`No se pudieron cargar las métricas del dashboard.`)}}function mn(e){document.getElementById(`dashboardMetrics`).innerHTML=J(`Familias registradas`,e.totalFamilias,`fa-solid fa-house`,`#25506A`)+J(`Total de niños con discapacidad`,e.totalConDiscapacidad,`fa-solid fa-hand-holding-heart`,`#3F8F5F`)+J(`NNA registrados`,e.totalNna,`fa-solid fa-child`,`#DD6B3E`)+J(`Pendientes por confirmar (mes)`,Math.max(e.pendientesMes,0),`fa-solid fa-clipboard-check`,`#C4922E`)}function hn(e){return`$${Math.round(e||0).toLocaleString(`es-CO`)}`}function gn(e,t){let n=document.getElementById(e);if(!n)return;let r=Math.max(...t.map(([,e])=>e),1);n.innerHTML=t.length?t.map(([e,t])=>`
        <div class="bar-row">
            <div class="bar-label">${e}</div>
            <div class="bar-track"><div class="bar-fill" style="width:${t/r*100}%"></div></div>
            <div class="bar-value">${t}</div>
        </div>
    `).join(``):`<p class="table-empty">Sin datos suficientes.</p>`}var _n={Activo:`var(--success)`,Inasistente:`var(--warning)`,Retirado:`var(--danger)`,Egresado:`var(--primary-light)`};function vn(e){let t=Object.entries(e),n=t.reduce((e,[,t])=>e+t,0)||1,r=0,i=t.map(([e,t])=>{let i=r/n*100;r+=t;let a=r/n*100;return`${_n[e]} ${i}% ${a}%`}),a=t.map(([e,t])=>`
        <div class="legend-item">
            <span class="legend-dot" style="background:${_n[e]}"></span>
            ${e} (${t})
        </div>
    `).join(``);document.getElementById(`chartEstado`).innerHTML=`
        <div class="donut" style="background:conic-gradient(${i.join(`, `)})"></div>
        <div class="legend">${a}</div>
    `}function yn(e){let t=document.getElementById(`ingresosMetrics`);t&&(t.innerHTML=J(`Total de ingresos`,hn(e.totalIngresos),`fa-solid fa-sack-dollar`,`#3F8F5F`)+J(`Promedio de ingresos`,hn(e.promedioIngresos),`fa-solid fa-coins`,`#25506A`)),gn(`chartIngresosRango`,e.rangosIngresos)}async function bn(){let e=await fetch(`${O}/seguimientos`);if(!e.ok)throw Error(`No se pudieron cargar los seguimientos.`);return await e.json()}async function xn(e){let t=await fetch(`${O}/seguimientos`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(e)});if(!t.ok)throw Error(`No se pudo confirmar el seguimiento.`);return await t.json()}async function Sn(e,t){let n=await fetch(`${O}/seguimientos/${e}`,{method:`PUT`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)});if(!n.ok)throw Error(`No se pudo actualizar el seguimiento.`);return await n.json()}var Cn=[],wn=[],Y=[],Tn=!1,X=null,En=null;async function Dn(){try{Cn=(await k()).filter(e=>e.estado!==`Inactivo`),wn=await N(),Y=await bn(),Mn(),Qe(),document.getElementById(`mesSeguimiento`).addEventListener(`change`,Mn),document.getElementById(`anioSeguimiento`).addEventListener(`change`,Mn);let e=document.getElementById(`formSeguimiento`);e&&e.addEventListener(`submit`,Rn),document.removeEventListener(`click`,Ln),document.addEventListener(`click`,Ln)}catch(e){console.error(`Error al cargar seguimientos:`,e),g(`No se pudieron cargar los seguimientos.`)}}function On(){return{mes:Number(document.getElementById(`mesSeguimiento`).value),anio:Number(document.getElementById(`anioSeguimiento`).value)}}function kn(e){let t=wn.find(t=>String(t.id)===String(e));return t?t.responsable:`Sin familia`}function An(e){let t=Cn.find(t=>String(t.id)===String(e));return t?t.nombre:`Sin registro`}function jn(e,t,n){return Y.some(r=>String(r.nnaId)===String(e)&&Number(r.mes)===t&&Number(r.anio)===n)}function Mn(){let{mes:e,anio:t}=On();Nn(e,t),Pn(e,t)}function Nn(e,t){let n=Cn.filter(n=>!jn(n.id,e,t)),r=document.getElementById(`seguimientosBody`),i=document.getElementById(`pendientesInfo`);if(i.textContent=n.length===0?`Todos los NNA activos ya fueron confirmados este mes`:`${n.length} pendientes por confirmar`,n.length===0){r.innerHTML=`<tr><td colspan="5" class="table-empty">No hay novedades pendientes para este mes.</td></tr>`;return}r.innerHTML=n.map(e=>`

        <tr data-id="${e.id}">
            <td><b>${e.nombre}</b></td>
            <td>${e.documento}</td>
            <td>${kn(e.familiaId)}</td>
            <td>${Ge(e.estado,e.estado.toLowerCase().replace(/\s+/g,`-`))}</td>
            <td>
                <button class="check-btn" data-action="confirmar" data-id="${e.id}" title="Confirmar mes">
                    <i class="fa-solid fa-check"></i> Confirmar
                </button>
            </td>
        </tr>

    `).join(``)}function Pn(e,t){let n=document.getElementById(`seguimientosRegistradosBody`);if(!n)return;let r=Y.filter(n=>Number(n.mes)===e&&Number(n.anio)===t);if(r.length===0){n.innerHTML=`<tr><td colspan="6" class="table-empty">Todavía no hay seguimientos registrados para este período.</td></tr>`;return}n.innerHTML=r.map(e=>`

        <tr data-id="${e.id}">
            <td><b>${An(e.nnaId)}</b></td>
            <td>${Ge(e.estadoMes||`Activo`,String(e.estadoMes||`Activo`).toLowerCase().replace(/\s+/g,`-`))}</td>
            <td>${e.colegioActual||`-`}</td>
            <td>${e.gradoActual||`-`}</td>
            <td>${e.asistencia||`-`}</td>
            <td>
                <button class="btn-table" data-action="editar-seguimiento" data-id="${e.id}">Editar</button>
            </td>
        </tr>

    `).join(``)}function Fn(e){Tn=!1,X=null,En=e;let t=document.getElementById(`formSeguimiento`);t&&t.reset();let{mes:n,anio:r}=On();document.getElementById(`seguimientoAnio`).value=r,document.getElementById(`seguimientoMes`).value=n,document.getElementById(`seguimientoEstadoMes`).value=`Activo`;let i=Cn.find(t=>String(t.id)===String(e));document.getElementById(`seguimientoColegioActual`).value=i?.colegio||``,document.getElementById(`seguimientoGradoActual`).value=i?.grado||``,document.getElementById(`formTituloModalSeguimiento`).textContent=`Registrar seguimiento`}function In(e){Tn=!0,X=e.id,En=e.nnaId,document.getElementById(`seguimientoAnio`).value=e.anio||``,document.getElementById(`seguimientoMes`).value=e.mes||``,document.getElementById(`seguimientoEstadoMes`).value=e.estadoMes||`Activo`,document.getElementById(`seguimientoColegioActual`).value=e.colegioActual||``,document.getElementById(`seguimientoInstitucion`).value=e.institucion||``,document.getElementById(`seguimientoTipoColegio`).value=e.tipoColegio||``,document.getElementById(`seguimientoGradoActual`).value=e.gradoActual||``,document.getElementById(`seguimientoAsistencia`).value=e.asistencia||``,document.getElementById(`seguimientoMotivo`).value=e.motivo||``,document.getElementById(`formTituloModalSeguimiento`).textContent=`Editar seguimiento`}async function Ln(e){let t=e.target.closest(`button[data-action='confirmar']`),n=e.target.closest(`button[data-action='editar-seguimiento']`);if(t&&(Fn(t.dataset.id),L(`modalSeguimiento`)),n){let e=Y.find(e=>String(e.id)===String(n.dataset.id));if(!e){_(`No se encontró el seguimiento seleccionado.`);return}In(e),L(`modalSeguimiento`)}}async function Rn(e){e.preventDefault();let t=document.getElementById(`seguimientoAnio`).value,n=document.getElementById(`seguimientoMes`).value,r=document.getElementById(`seguimientoEstadoMes`).value,i=document.getElementById(`seguimientoColegioActual`).value.trim(),a=document.getElementById(`seguimientoInstitucion`).value.trim(),o=document.getElementById(`seguimientoTipoColegio`).value,s=document.getElementById(`seguimientoGradoActual`).value,c=document.getElementById(`seguimientoAsistencia`).value.trim(),l=document.getElementById(`seguimientoMotivo`).value.trim();if(!t||!n){_(`Seleccione el año y el mes del seguimiento.`);return}if(!r){_(`Seleccione el estado del mes.`);return}if(!i||!a){_(`Complete el colegio actual y la institución.`);return}if(!o){_(`Seleccione el tipo de colegio.`);return}if(!s){_(`Seleccione el grado actual.`);return}try{if(Tn&&X){let e={...Y.find(e=>String(e.id)===String(X)),anio:Number(t),mes:Number(n),estadoMes:r,colegioActual:i,institucion:a,tipoColegio:o,gradoActual:s,asistencia:c,motivo:l};await Sn(X,e),Y=Y.map(t=>String(t.id)===String(X)?e:t),h(`Seguimiento actualizado correctamente.`)}else{let e={id:$e(Y,`SEG`),nnaId:En,anio:Number(t),mes:Number(n),estadoMes:r,colegioActual:i,institucion:a,tipoColegio:o,gradoActual:s,asistencia:c,motivo:l};await xn(e),Y.push(e),h(`Seguimiento registrado. El NNA ya está disponible en Reportes.`)}Mn(),document.getElementById(`formSeguimiento`).reset(),Ze(`modalSeguimiento`)}catch(e){console.error(`Error al guardar el seguimiento:`,e),g(`No se pudo guardar el seguimiento.`)}}var zn=[`Enero`,`Febrero`,`Marzo`,`Abril`,`Mayo`,`Junio`,`Julio`,`Agosto`,`Septiembre`,`Octubre`,`Noviembre`,`Diciembre`];async function Bn(){try{let[e,t,n]=await Promise.all([bn(),k(),N()]),r=e=>t.find(t=>String(t.id)===String(e))?.nombre||`—`,i=e=>{let r=t.find(t=>String(t.id)===String(e)),i=n.find(e=>String(e.id)===String(r?.familiaId));return i?i.responsable:`—`};document.getElementById(`reportesKpi`).innerHTML=J(`Confirmaciones registradas`,e.length,`fa-solid fa-clipboard-check`,`#3F8F5F`)+J(`NNA activos`,t.filter(e=>e.estado!==`Inactivo`).length,`fa-solid fa-child`,`#25506A`);let a=document.getElementById(`reportesBody`);a.innerHTML=e.length===0?`<tr><td colspan="5" class="table-empty">Todavía no hay meses confirmados.</td></tr>`:[...e].reverse().map(e=>`
                <tr>
                    <td><b>${r(e.nnaId)}</b></td>
                    <td>${i(e.nnaId)}</td>
                    <td>${zn[e.mes-1]||e.mes}</td>
                    <td>${e.anio}</td>
                    <td>${e.fecha}</td>
                </tr>
            `).join(``);let o=document.getElementById(`btnExportarExcel`);o&&(o.onclick=()=>Vn(t,n))}catch(e){console.error(`Error al cargar reportes:`,e),g(`No se pudieron cargar los reportes.`)}}function Vn(e,t){let n=document.getElementById(`filtroEstadoNna`)?.value||``,r=(document.getElementById(`filtroColegio`)?.value||``).toLowerCase(),i=(document.getElementById(`filtroCodigoHogar`)?.value||``).toLowerCase(),a=e.map(e=>{let n=t.find(t=>String(t.id)===String(e.familiaId));return{nna:e,familia:n,"Código NNA":e.id,"Nombre Completo":e.nombre||`—`,Estado:e.estado||`—`,Grado:e.grado||`—`,Colegio:e.colegio||`—`,"Código Hogar":n?.codigoHogar||n?.id||`—`}}).filter(e=>(!n||e.nna.estado===n)&&(!r||String(e.nna.colegio||``).toLowerCase().includes(r))&&(!i||String(e[`Código Hogar`]).toLowerCase().includes(i))).map(({nna:e,familia:t,...n})=>n);if(a.length===0){g(`No hay registros que coincidan con los filtros seleccionados.`);return}let o=XLSX.utils.json_to_sheet(a),s=XLSX.utils.book_new();XLSX.utils.book_append_sheet(s,o,`Reporte NNA`),XLSX.writeFile(s,`Reporte_General_Camino_Maria.xlsx`),h(`Reporte generado y descargado correctamente.`)}function Hn(){return`

        <section class="login">

            <div class="login-right" style="width:100%">

                <div class="login-form" style="text-align:center">

                    <h2>404</h2>

                    <p>La página que buscas no existe.</p>

                </div>

            </div>

        </section>

    `}var Un=document.getElementById(`app`),Wn=null;function Gn(){return Wn}function Kn(){ce()?Z(`dashboard`):Z(`login`)}function Z(e,t=null){let n=mt[e];if(!n){Un.innerHTML=Hn();return}if(e!==`login`){if(!ce()){Z(`login`);return}if(!fe(le(),e)){e!==`dashboard`&&(_(`No tiene permisos para acceder a esta sección.`),Z(`dashboard`));return}}if(Wn=t,Un.innerHTML=n(),e===`login`){b();return}ye(e),e===`dashboard`&&pn(),e===`familias`&&Ct(),e===`perfilFamilia`&&Ut(),e===`nna`&&Xt(),e===`perfilNna`&&je(),e===`usuarios`&&rt(),e===`seguimiento`&&Dn(),e===`reportes`&&Bn()}document.addEventListener(`DOMContentLoaded`,()=>{Kn()});