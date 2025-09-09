/**
* @vue/shared v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Mu(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const vt={},os=[],Qn=()=>{},ap=()=>!1,po=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),Eu=t=>t.startsWith("onUpdate:"),Nt=Object.assign,bu=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},Bv=Object.prototype.hasOwnProperty,ut=(t,e)=>Bv.call(t,e),Ge=Array.isArray,Xs=t=>Fa(t)==="[object Map]",kv=t=>Fa(t)==="[object Set]",Ve=t=>typeof t=="function",Ot=t=>typeof t=="string",Cs=t=>typeof t=="symbol",Mt=t=>t!==null&&typeof t=="object",lp=t=>(Mt(t)||Ve(t))&&Ve(t.then)&&Ve(t.catch),Hv=Object.prototype.toString,Fa=t=>Hv.call(t),zv=t=>Fa(t).slice(8,-1),Vv=t=>Fa(t)==="[object Object]",Tu=t=>Ot(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,as=Mu(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Ba=t=>{const e=Object.create(null);return(n=>e[n]||(e[n]=t(n)))},Gv=/-\w/g,hn=Ba(t=>t.replace(Gv,e=>e.slice(1).toUpperCase())),Wv=/\B([A-Z])/g,Rr=Ba(t=>t.replace(Wv,"-$1").toLowerCase()),mo=Ba(t=>t.charAt(0).toUpperCase()+t.slice(1)),nl=Ba(t=>t?`on${mo(t)}`:""),Wi=(t,e)=>!Object.is(t,e),il=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},cp=(t,e,n,i=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:i,value:n})},Xv=t=>{const e=parseFloat(t);return isNaN(e)?t:e},$v=t=>{const e=Ot(t)?Number(t):NaN;return isNaN(e)?t:e};let Nf;const ka=()=>Nf||(Nf=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function wu(t){if(Ge(t)){const e={};for(let n=0;n<t.length;n++){const i=t[n],r=Ot(i)?Kv(i):wu(i);if(r)for(const s in r)e[s]=r[s]}return e}else if(Ot(t)||Mt(t))return t}const jv=/;(?![^(]*\))/g,qv=/:([^]+)/,Yv=/\/\*[^]*?\*\//g;function Kv(t){const e={};return t.replace(Yv,"").split(jv).forEach(n=>{if(n){const i=n.split(qv);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function Au(t){let e="";if(Ot(t))e=t;else if(Ge(t))for(let n=0;n<t.length;n++){const i=Au(t[n]);i&&(e+=i+" ")}else if(Mt(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const Zv="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Jv=Mu(Zv);function up(t){return!!t||t===""}/**
* @vue/reactivity v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Xt;class Qv{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=Xt,!e&&Xt&&(this.index=(Xt.scopes||(Xt.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].pause();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].resume();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].resume()}}run(e){if(this._active){const n=Xt;try{return Xt=this,e()}finally{Xt=n}}}on(){++this._on===1&&(this.prevScope=Xt,Xt=this)}off(){this._on>0&&--this._on===0&&(Xt=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let n,i;for(n=0,i=this.effects.length;n<i;n++)this.effects[n].stop();for(this.effects.length=0,n=0,i=this.cleanups.length;n<i;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,i=this.scopes.length;n<i;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function fp(){return Xt}function e_(t,e=!1){Xt&&Xt.cleanups.push(t)}let gt;const rl=new WeakSet;class hp{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Xt&&Xt.active&&Xt.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,rl.has(this)&&(rl.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||pp(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Of(this),mp(this);const e=gt,n=Bn;gt=this,Bn=!0;try{return this.fn()}finally{gp(this),gt=e,Bn=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Pu(e);this.deps=this.depsTail=void 0,Of(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?rl.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){ac(this)&&this.run()}get dirty(){return ac(this)}}let dp=0,$s,js;function pp(t,e=!1){if(t.flags|=8,e){t.next=js,js=t;return}t.next=$s,$s=t}function Cu(){dp++}function Ru(){if(--dp>0)return;if(js){let e=js;for(js=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;$s;){let e=$s;for($s=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(i){t||(t=i)}e=n}}if(t)throw t}function mp(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function gp(t){let e,n=t.depsTail,i=n;for(;i;){const r=i.prevDep;i.version===-1?(i===n&&(n=r),Pu(i),t_(i)):e=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=r}t.deps=e,t.depsTail=n}function ac(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(vp(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function vp(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===eo)||(t.globalVersion=eo,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!ac(t))))return;t.flags|=2;const e=t.dep,n=gt,i=Bn;gt=t,Bn=!0;try{mp(t);const r=t.fn(t._value);(e.version===0||Wi(r,t._value))&&(t.flags|=128,t._value=r,e.version++)}catch(r){throw e.version++,r}finally{gt=n,Bn=i,gp(t),t.flags&=-3}}function Pu(t,e=!1){const{dep:n,prevSub:i,nextSub:r}=t;if(i&&(i.nextSub=r,t.prevSub=void 0),r&&(r.prevSub=i,t.nextSub=void 0),n.subs===t&&(n.subs=i,!i&&n.computed)){n.computed.flags&=-5;for(let s=n.computed.deps;s;s=s.nextDep)Pu(s,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function t_(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let Bn=!0;const _p=[];function Mi(){_p.push(Bn),Bn=!1}function Ei(){const t=_p.pop();Bn=t===void 0?!0:t}function Of(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=gt;gt=void 0;try{e()}finally{gt=n}}}let eo=0;class n_{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Ha{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!gt||!Bn||gt===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==gt)n=this.activeLink=new n_(gt,this),gt.deps?(n.prevDep=gt.depsTail,gt.depsTail.nextDep=n,gt.depsTail=n):gt.deps=gt.depsTail=n,xp(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const i=n.nextDep;i.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=i),n.prevDep=gt.depsTail,n.nextDep=void 0,gt.depsTail.nextDep=n,gt.depsTail=n,gt.deps===n&&(gt.deps=i)}return n}trigger(e){this.version++,eo++,this.notify(e)}notify(e){Cu();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{Ru()}}}function xp(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let i=e.deps;i;i=i.nextDep)xp(i)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const ya=new WeakMap,xr=Symbol(""),lc=Symbol(""),to=Symbol("");function $t(t,e,n){if(Bn&&gt){let i=ya.get(t);i||ya.set(t,i=new Map);let r=i.get(n);r||(i.set(n,r=new Ha),r.map=i,r.key=n),r.track()}}function _i(t,e,n,i,r,s){const o=ya.get(t);if(!o){eo++;return}const a=l=>{l&&l.trigger()};if(Cu(),e==="clear")o.forEach(a);else{const l=Ge(t),c=l&&Tu(n);if(l&&n==="length"){const u=Number(i);o.forEach((f,h)=>{(h==="length"||h===to||!Cs(h)&&h>=u)&&a(f)})}else switch((n!==void 0||o.has(void 0))&&a(o.get(n)),c&&a(o.get(to)),e){case"add":l?c&&a(o.get("length")):(a(o.get(xr)),Xs(t)&&a(o.get(lc)));break;case"delete":l||(a(o.get(xr)),Xs(t)&&a(o.get(lc)));break;case"set":Xs(t)&&a(o.get(xr));break}}Ru()}function i_(t,e){const n=ya.get(t);return n&&n.get(e)}function Br(t){const e=et(t);return e===t?e:($t(e,"iterate",to),kn(t)?e:e.map(Qt))}function Lu(t){return $t(t=et(t),"iterate",to),t}const r_={__proto__:null,[Symbol.iterator](){return sl(this,Symbol.iterator,Qt)},concat(...t){return Br(this).concat(...t.map(e=>Ge(e)?Br(e):e))},entries(){return sl(this,"entries",t=>(t[1]=Qt(t[1]),t))},every(t,e){return si(this,"every",t,e,void 0,arguments)},filter(t,e){return si(this,"filter",t,e,n=>n.map(Qt),arguments)},find(t,e){return si(this,"find",t,e,Qt,arguments)},findIndex(t,e){return si(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return si(this,"findLast",t,e,Qt,arguments)},findLastIndex(t,e){return si(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return si(this,"forEach",t,e,void 0,arguments)},includes(...t){return ol(this,"includes",t)},indexOf(...t){return ol(this,"indexOf",t)},join(t){return Br(this).join(t)},lastIndexOf(...t){return ol(this,"lastIndexOf",t)},map(t,e){return si(this,"map",t,e,void 0,arguments)},pop(){return Us(this,"pop")},push(...t){return Us(this,"push",t)},reduce(t,...e){return Ff(this,"reduce",t,e)},reduceRight(t,...e){return Ff(this,"reduceRight",t,e)},shift(){return Us(this,"shift")},some(t,e){return si(this,"some",t,e,void 0,arguments)},splice(...t){return Us(this,"splice",t)},toReversed(){return Br(this).toReversed()},toSorted(t){return Br(this).toSorted(t)},toSpliced(...t){return Br(this).toSpliced(...t)},unshift(...t){return Us(this,"unshift",t)},values(){return sl(this,"values",Qt)}};function sl(t,e,n){const i=Lu(t),r=i[e]();return i!==t&&!kn(t)&&(r._next=r.next,r.next=()=>{const s=r._next();return s.value&&(s.value=n(s.value)),s}),r}const s_=Array.prototype;function si(t,e,n,i,r,s){const o=Lu(t),a=o!==t&&!kn(t),l=o[e];if(l!==s_[e]){const f=l.apply(t,s);return a?Qt(f):f}let c=n;o!==t&&(a?c=function(f,h){return n.call(this,Qt(f),h,t)}:n.length>2&&(c=function(f,h){return n.call(this,f,h,t)}));const u=l.call(o,c,i);return a&&r?r(u):u}function Ff(t,e,n,i){const r=Lu(t);let s=n;return r!==t&&(kn(t)?n.length>3&&(s=function(o,a,l){return n.call(this,o,a,l,t)}):s=function(o,a,l){return n.call(this,o,Qt(a),l,t)}),r[e](s,...i)}function ol(t,e,n){const i=et(t);$t(i,"iterate",to);const r=i[e](...n);return(r===-1||r===!1)&&Du(n[0])?(n[0]=et(n[0]),i[e](...n)):r}function Us(t,e,n=[]){Mi(),Cu();const i=et(t)[e].apply(t,n);return Ru(),Ei(),i}const o_=Mu("__proto__,__v_isRef,__isVue"),Sp=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(Cs));function a_(t){Cs(t)||(t=String(t));const e=et(this);return $t(e,"has",t),e.hasOwnProperty(t)}class yp{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,i){if(n==="__v_skip")return e.__v_skip;const r=this._isReadonly,s=this._isShallow;if(n==="__v_isReactive")return!r;if(n==="__v_isReadonly")return r;if(n==="__v_isShallow")return s;if(n==="__v_raw")return i===(r?s?Ap:wp:s?Tp:bp).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const o=Ge(e);if(!r){let l;if(o&&(l=r_[n]))return l;if(n==="hasOwnProperty")return a_}const a=Reflect.get(e,n,Lt(e)?e:i);return(Cs(n)?Sp.has(n):o_(n))||(r||$t(e,"get",n),s)?a:Lt(a)?o&&Tu(n)?a:a.value:Mt(a)?r?go(a):Er(a):a}}class Mp extends yp{constructor(e=!1){super(!1,e)}set(e,n,i,r){let s=e[n];if(!this._isShallow){const l=br(s);if(!kn(i)&&!br(i)&&(s=et(s),i=et(i)),!Ge(e)&&Lt(s)&&!Lt(i))return l||(s.value=i),!0}const o=Ge(e)&&Tu(n)?Number(n)<e.length:ut(e,n),a=Reflect.set(e,n,i,Lt(e)?e:r);return e===et(r)&&(o?Wi(i,s)&&_i(e,"set",n,i):_i(e,"add",n,i)),a}deleteProperty(e,n){const i=ut(e,n);e[n];const r=Reflect.deleteProperty(e,n);return r&&i&&_i(e,"delete",n,void 0),r}has(e,n){const i=Reflect.has(e,n);return(!Cs(n)||!Sp.has(n))&&$t(e,"has",n),i}ownKeys(e){return $t(e,"iterate",Ge(e)?"length":xr),Reflect.ownKeys(e)}}class Ep extends yp{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const l_=new Mp,c_=new Ep,u_=new Mp(!0),f_=new Ep(!0),cc=t=>t,Io=t=>Reflect.getPrototypeOf(t);function h_(t,e,n){return function(...i){const r=this.__v_raw,s=et(r),o=Xs(s),a=t==="entries"||t===Symbol.iterator&&o,l=t==="keys"&&o,c=r[t](...i),u=n?cc:e?uc:Qt;return!e&&$t(s,"iterate",l?lc:xr),{next(){const{value:f,done:h}=c.next();return h?{value:f,done:h}:{value:a?[u(f[0]),u(f[1])]:u(f),done:h}},[Symbol.iterator](){return this}}}}function Uo(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function d_(t,e){const n={get(r){const s=this.__v_raw,o=et(s),a=et(r);t||(Wi(r,a)&&$t(o,"get",r),$t(o,"get",a));const{has:l}=Io(o),c=e?cc:t?uc:Qt;if(l.call(o,r))return c(s.get(r));if(l.call(o,a))return c(s.get(a));s!==o&&s.get(r)},get size(){const r=this.__v_raw;return!t&&$t(et(r),"iterate",xr),r.size},has(r){const s=this.__v_raw,o=et(s),a=et(r);return t||(Wi(r,a)&&$t(o,"has",r),$t(o,"has",a)),r===a?s.has(r):s.has(r)||s.has(a)},forEach(r,s){const o=this,a=o.__v_raw,l=et(a),c=e?cc:t?uc:Qt;return!t&&$t(l,"iterate",xr),a.forEach((u,f)=>r.call(s,c(u),c(f),o))}};return Nt(n,t?{add:Uo("add"),set:Uo("set"),delete:Uo("delete"),clear:Uo("clear")}:{add(r){!e&&!kn(r)&&!br(r)&&(r=et(r));const s=et(this);return Io(s).has.call(s,r)||(s.add(r),_i(s,"add",r,r)),this},set(r,s){!e&&!kn(s)&&!br(s)&&(s=et(s));const o=et(this),{has:a,get:l}=Io(o);let c=a.call(o,r);c||(r=et(r),c=a.call(o,r));const u=l.call(o,r);return o.set(r,s),c?Wi(s,u)&&_i(o,"set",r,s):_i(o,"add",r,s),this},delete(r){const s=et(this),{has:o,get:a}=Io(s);let l=o.call(s,r);l||(r=et(r),l=o.call(s,r)),a&&a.call(s,r);const c=s.delete(r);return l&&_i(s,"delete",r,void 0),c},clear(){const r=et(this),s=r.size!==0,o=r.clear();return s&&_i(r,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(r=>{n[r]=h_(r,t,e)}),n}function za(t,e){const n=d_(t,e);return(i,r,s)=>r==="__v_isReactive"?!t:r==="__v_isReadonly"?t:r==="__v_raw"?i:Reflect.get(ut(n,r)&&r in i?n:i,r,s)}const p_={get:za(!1,!1)},m_={get:za(!1,!0)},g_={get:za(!0,!1)},v_={get:za(!0,!0)},bp=new WeakMap,Tp=new WeakMap,wp=new WeakMap,Ap=new WeakMap;function __(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function x_(t){return t.__v_skip||!Object.isExtensible(t)?0:__(zv(t))}function Er(t){return br(t)?t:Va(t,!1,l_,p_,bp)}function Cp(t){return Va(t,!1,u_,m_,Tp)}function go(t){return Va(t,!0,c_,g_,wp)}function S_(t){return Va(t,!0,f_,v_,Ap)}function Va(t,e,n,i,r){if(!Mt(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const s=x_(t);if(s===0)return t;const o=r.get(t);if(o)return o;const a=new Proxy(t,s===2?i:n);return r.set(t,a),a}function ls(t){return br(t)?ls(t.__v_raw):!!(t&&t.__v_isReactive)}function br(t){return!!(t&&t.__v_isReadonly)}function kn(t){return!!(t&&t.__v_isShallow)}function Du(t){return t?!!t.__v_raw:!1}function et(t){const e=t&&t.__v_raw;return e?et(e):t}function y_(t){return!ut(t,"__v_skip")&&Object.isExtensible(t)&&cp(t,"__v_skip",!0),t}const Qt=t=>Mt(t)?Er(t):t,uc=t=>Mt(t)?go(t):t;function Lt(t){return t?t.__v_isRef===!0:!1}function nt(t){return Rp(t,!1)}function Je(t){return Rp(t,!0)}function Rp(t,e){return Lt(t)?t:new M_(t,e)}class M_{constructor(e,n){this.dep=new Ha,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:et(e),this._value=n?e:Qt(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,i=this.__v_isShallow||kn(e)||br(e);e=i?e:et(e),Wi(e,n)&&(this._rawValue=e,this._value=i?e:Qt(e),this.dep.trigger())}}function Xi(t){return Lt(t)?t.value:t}function Ye(t){return Ve(t)?t():Xi(t)}const E_={get:(t,e,n)=>e==="__v_raw"?t:Xi(Reflect.get(t,e,n)),set:(t,e,n,i)=>{const r=t[e];return Lt(r)&&!Lt(n)?(r.value=n,!0):Reflect.set(t,e,n,i)}};function Pp(t){return ls(t)?t:new Proxy(t,E_)}class b_{constructor(e){this.__v_isRef=!0,this._value=void 0;const n=this.dep=new Ha,{get:i,set:r}=e(n.track.bind(n),n.trigger.bind(n));this._get=i,this._set=r}get value(){return this._value=this._get()}set value(e){this._set(e)}}function Lp(t){return new b_(t)}class T_{constructor(e,n,i){this._object=e,this._key=n,this._defaultValue=i,this.__v_isRef=!0,this._value=void 0}get value(){const e=this._object[this._key];return this._value=e===void 0?this._defaultValue:e}set value(e){this._object[this._key]=e}get dep(){return i_(et(this._object),this._key)}}class w_{constructor(e){this._getter=e,this.__v_isRef=!0,this.__v_isReadonly=!0,this._value=void 0}get value(){return this._value=this._getter()}}function Ga(t,e,n){return Lt(t)?t:Ve(t)?new w_(t):Mt(t)&&arguments.length>1?A_(t,e,n):nt(t)}function A_(t,e,n){const i=t[e];return Lt(i)?i:new T_(t,e,n)}class C_{constructor(e,n,i){this.fn=e,this.setter=n,this._value=void 0,this.dep=new Ha(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=eo-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&gt!==this)return pp(this,!0),!0}get value(){const e=this.dep.track();return vp(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function R_(t,e,n=!1){let i,r;return Ve(t)?i=t:(i=t.get,r=t.set),new C_(i,r,n)}const No={},Ma=new WeakMap;let fr;function P_(t,e=!1,n=fr){if(n){let i=Ma.get(n);i||Ma.set(n,i=[]),i.push(t)}}function L_(t,e,n=vt){const{immediate:i,deep:r,once:s,scheduler:o,augmentJob:a,call:l}=n,c=y=>r?y:kn(y)||r===!1||r===0?Vi(y,1):Vi(y);let u,f,h,d,g=!1,_=!1;if(Lt(t)?(f=()=>t.value,g=kn(t)):ls(t)?(f=()=>c(t),g=!0):Ge(t)?(_=!0,g=t.some(y=>ls(y)||kn(y)),f=()=>t.map(y=>{if(Lt(y))return y.value;if(ls(y))return c(y);if(Ve(y))return l?l(y,2):y()})):Ve(t)?e?f=l?()=>l(t,2):t:f=()=>{if(h){Mi();try{h()}finally{Ei()}}const y=fr;fr=u;try{return l?l(t,3,[d]):t(d)}finally{fr=y}}:f=Qn,e&&r){const y=f,C=r===!0?1/0:r;f=()=>Vi(y(),C)}const m=fp(),p=()=>{u.stop(),m&&m.active&&bu(m.effects,u)};if(s&&e){const y=e;e=(...C)=>{y(...C),p()}}let E=_?new Array(t.length).fill(No):No;const x=y=>{if(!(!(u.flags&1)||!u.dirty&&!y))if(e){const C=u.run();if(r||g||(_?C.some((R,P)=>Wi(R,E[P])):Wi(C,E))){h&&h();const R=fr;fr=u;try{const P=[C,E===No?void 0:_&&E[0]===No?[]:E,d];E=C,l?l(e,3,P):e(...P)}finally{fr=R}}}else u.run()};return a&&a(x),u=new hp(f),u.scheduler=o?()=>o(x,!1):x,d=y=>P_(y,!1,u),h=u.onStop=()=>{const y=Ma.get(u);if(y){if(l)l(y,4);else for(const C of y)C();Ma.delete(u)}},e?i?x(!0):E=u.run():o?o(x.bind(null,!0),!0):u.run(),p.pause=u.pause.bind(u),p.resume=u.resume.bind(u),p.stop=p,p}function Vi(t,e=1/0,n){if(e<=0||!Mt(t)||t.__v_skip||(n=n||new Map,(n.get(t)||0)>=e))return t;if(n.set(t,e),e--,Lt(t))Vi(t.value,e,n);else if(Ge(t))for(let i=0;i<t.length;i++)Vi(t[i],e,n);else if(kv(t)||Xs(t))t.forEach(i=>{Vi(i,e,n)});else if(Vv(t)){for(const i in t)Vi(t[i],e,n);for(const i of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,i)&&Vi(t[i],e,n)}return t}/**
* @vue/runtime-core v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function vo(t,e,n,i){try{return i?t(...i):t()}catch(r){_o(r,e,n)}}function zn(t,e,n,i){if(Ve(t)){const r=vo(t,e,n,i);return r&&lp(r)&&r.catch(s=>{_o(s,e,n)}),r}if(Ge(t)){const r=[];for(let s=0;s<t.length;s++)r.push(zn(t[s],e,n,i));return r}}function _o(t,e,n,i=!0){const r=e?e.vnode:null,{errorHandler:s,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||vt;if(e){let a=e.parent;const l=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${n}`;for(;a;){const u=a.ec;if(u){for(let f=0;f<u.length;f++)if(u[f](t,l,c)===!1)return}a=a.parent}if(s){Mi(),vo(s,null,10,[t,l,c]),Ei();return}}D_(t,n,r,i,o)}function D_(t,e,n,i=!0,r=!1){if(r)throw t;console.error(t)}const en=[];let jn=-1;const cs=[];let Bi=null,es=0;const Dp=Promise.resolve();let Ea=null;function Pr(t){const e=Ea||Dp;return t?e.then(this?t.bind(this):t):e}function I_(t){let e=jn+1,n=en.length;for(;e<n;){const i=e+n>>>1,r=en[i],s=no(r);s<t||s===t&&r.flags&2?e=i+1:n=i}return e}function Iu(t){if(!(t.flags&1)){const e=no(t),n=en[en.length-1];!n||!(t.flags&2)&&e>=no(n)?en.push(t):en.splice(I_(e),0,t),t.flags|=1,Ip()}}function Ip(){Ea||(Ea=Dp.then(Up))}function U_(t){Ge(t)?cs.push(...t):Bi&&t.id===-1?Bi.splice(es+1,0,t):t.flags&1||(cs.push(t),t.flags|=1),Ip()}function Bf(t,e,n=jn+1){for(;n<en.length;n++){const i=en[n];if(i&&i.flags&2){if(t&&i.id!==t.uid)continue;en.splice(n,1),n--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function ba(t){if(cs.length){const e=[...new Set(cs)].sort((n,i)=>no(n)-no(i));if(cs.length=0,Bi){Bi.push(...e);return}for(Bi=e,es=0;es<Bi.length;es++){const n=Bi[es];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}Bi=null,es=0}}const no=t=>t.id==null?t.flags&2?-1:1/0:t.id;function Up(t){try{for(jn=0;jn<en.length;jn++){const e=en[jn];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),vo(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;jn<en.length;jn++){const e=en[jn];e&&(e.flags&=-2)}jn=-1,en.length=0,ba(),Ea=null,(en.length||cs.length)&&Up()}}let On=null,Np=null;function Ta(t){const e=On;return On=t,Np=t&&t.type.__scopeId||null,e}function N_(t,e=On,n){if(!e||t._n)return t;const i=(...r)=>{i._d&&Ca(-1);const s=Ta(e);let o;try{o=t(...r)}finally{Ta(s),i._d&&Ca(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function qn(t,e,n,i){const r=t.dirs,s=e&&e.dirs;for(let o=0;o<r.length;o++){const a=r[o];s&&(a.oldValue=s[o].value);let l=a.dir[i];l&&(Mi(),zn(l,n,8,[t.el,a,t,e]),Ei())}}const O_=Symbol("_vte"),Op=t=>t.__isTeleport,vi=Symbol("_leaveCb"),Oo=Symbol("_enterCb");function Fp(){const t={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return Et(()=>{t.isMounted=!0}),Xp(()=>{t.isUnmounting=!0}),t}const yn=[Function,Array],Bp={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:yn,onEnter:yn,onAfterEnter:yn,onEnterCancelled:yn,onBeforeLeave:yn,onLeave:yn,onAfterLeave:yn,onLeaveCancelled:yn,onBeforeAppear:yn,onAppear:yn,onAfterAppear:yn,onAppearCancelled:yn},kp=t=>{const e=t.subTree;return e.component?kp(e.component):e},F_={name:"BaseTransition",props:Bp,setup(t,{slots:e}){const n=Zi(),i=Fp();return()=>{const r=e.default&&Uu(e.default(),!0);if(!r||!r.length)return;const s=Hp(r),o=et(t),{mode:a}=o;if(i.isLeaving)return al(s);const l=kf(s);if(!l)return al(s);let c=io(l,o,i,n,f=>c=f);l.type!==nn&&Tr(l,c);let u=n.subTree&&kf(n.subTree);if(u&&u.type!==nn&&!dr(u,l)&&kp(n).type!==nn){let f=io(u,o,i,n);if(Tr(u,f),a==="out-in"&&l.type!==nn)return i.isLeaving=!0,f.afterLeave=()=>{i.isLeaving=!1,n.job.flags&8||n.update(),delete f.afterLeave,u=void 0},al(s);a==="in-out"&&l.type!==nn?f.delayLeave=(h,d,g)=>{const _=zp(i,u);_[String(u.key)]=u,h[vi]=()=>{d(),h[vi]=void 0,delete c.delayedLeave,u=void 0},c.delayedLeave=()=>{g(),delete c.delayedLeave,u=void 0}}:u=void 0}else u&&(u=void 0);return s}}};function Hp(t){let e=t[0];if(t.length>1){for(const n of t)if(n.type!==nn){e=n;break}}return e}const B_=F_;function zp(t,e){const{leavingVNodes:n}=t;let i=n.get(e.type);return i||(i=Object.create(null),n.set(e.type,i)),i}function io(t,e,n,i,r){const{appear:s,mode:o,persisted:a=!1,onBeforeEnter:l,onEnter:c,onAfterEnter:u,onEnterCancelled:f,onBeforeLeave:h,onLeave:d,onAfterLeave:g,onLeaveCancelled:_,onBeforeAppear:m,onAppear:p,onAfterAppear:E,onAppearCancelled:x}=e,y=String(t.key),C=zp(n,t),R=(b,T)=>{b&&zn(b,i,9,T)},P=(b,T)=>{const L=T[1];R(b,T),Ge(b)?b.every(I=>I.length<=1)&&L():b.length<=1&&L()},U={mode:o,persisted:a,beforeEnter(b){let T=l;if(!n.isMounted)if(s)T=m||l;else return;b[vi]&&b[vi](!0);const L=C[y];L&&dr(t,L)&&L.el[vi]&&L.el[vi](),R(T,[b])},enter(b){let T=c,L=u,I=f;if(!n.isMounted)if(s)T=p||c,L=E||u,I=x||f;else return;let V=!1;const z=b[Oo]=j=>{V||(V=!0,j?R(I,[b]):R(L,[b]),U.delayedLeave&&U.delayedLeave(),b[Oo]=void 0)};T?P(T,[b,z]):z()},leave(b,T){const L=String(t.key);if(b[Oo]&&b[Oo](!0),n.isUnmounting)return T();R(h,[b]);let I=!1;const V=b[vi]=z=>{I||(I=!0,T(),z?R(_,[b]):R(g,[b]),b[vi]=void 0,C[L]===t&&delete C[L])};C[L]=t,d?P(d,[b,V]):V()},clone(b){const T=io(b,e,n,i,r);return r&&r(T),T}};return U}function al(t){if(xo(t))return t=qi(t),t.children=null,t}function kf(t){if(!xo(t))return Op(t.type)&&t.children?Hp(t.children):t;if(t.component)return t.component.subTree;const{shapeFlag:e,children:n}=t;if(n){if(e&16)return n[0];if(e&32&&Ve(n.default))return n.default()}}function Tr(t,e){t.shapeFlag&6&&t.component?(t.transition=e,Tr(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function Uu(t,e=!1,n){let i=[],r=0;for(let s=0;s<t.length;s++){let o=t[s];const a=n==null?o.key:String(n)+String(o.key!=null?o.key:s);o.type===cn?(o.patchFlag&128&&r++,i=i.concat(Uu(o.children,e,a))):(e||o.type!==nn)&&i.push(a!=null?qi(o,{key:a}):o)}if(r>1)for(let s=0;s<i.length;s++)i[s].patchFlag=-2;return i}function Ue(t,e){return Ve(t)?Nt({name:t.name},e,{setup:t}):t}function Nu(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}const wa=new WeakMap;function us(t,e,n,i,r=!1){if(Ge(t)){t.forEach((g,_)=>us(g,e&&(Ge(e)?e[_]:e),n,i,r));return}if(fs(i)&&!r){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&us(t,e,n,i.component.subTree);return}const s=i.shapeFlag&4?zu(i.component):i.el,o=r?null:s,{i:a,r:l}=t,c=e&&e.r,u=a.refs===vt?a.refs={}:a.refs,f=a.setupState,h=et(f),d=f===vt?ap:g=>ut(h,g);if(c!=null&&c!==l){if(Hf(e),Ot(c))u[c]=null,d(c)&&(f[c]=null);else if(Lt(c)){c.value=null;const g=e;g.k&&(u[g.k]=null)}}if(Ve(l))vo(l,a,12,[o,u]);else{const g=Ot(l),_=Lt(l);if(g||_){const m=()=>{if(t.f){const p=g?d(l)?f[l]:u[l]:l.value;if(r)Ge(p)&&bu(p,s);else if(Ge(p))p.includes(s)||p.push(s);else if(g)u[l]=[s],d(l)&&(f[l]=u[l]);else{const E=[s];l.value=E,t.k&&(u[t.k]=E)}}else g?(u[l]=o,d(l)&&(f[l]=o)):_&&(l.value=o,t.k&&(u[t.k]=o))};if(o){const p=()=>{m(),wa.delete(t)};p.id=-1,wa.set(t,p),vn(p,n)}else Hf(t),m()}}}function Hf(t){const e=wa.get(t);e&&(e.flags|=8,wa.delete(t))}let zf=!1;const kr=()=>{zf||(console.error("Hydration completed but contains mismatches."),zf=!0)},k_=t=>t.namespaceURI.includes("svg")&&t.tagName!=="foreignObject",H_=t=>t.namespaceURI.includes("MathML"),Fo=t=>{if(t.nodeType===1){if(k_(t))return"svg";if(H_(t))return"mathml"}},is=t=>t.nodeType===8;function z_(t){const{mt:e,p:n,o:{patchProp:i,createText:r,nextSibling:s,parentNode:o,remove:a,insert:l,createComment:c}}=t,u=(x,y)=>{if(!y.hasChildNodes()){n(null,x,y),ba(),y._vnode=x;return}f(y.firstChild,x,null,null,null),ba(),y._vnode=x},f=(x,y,C,R,P,U=!1)=>{U=U||!!y.dynamicChildren;const b=is(x)&&x.data==="[",T=()=>_(x,y,C,R,P,b),{type:L,ref:I,shapeFlag:V,patchFlag:z}=y;let j=x.nodeType;y.el=x,z===-2&&(U=!1,y.dynamicChildren=null);let B=null;switch(L){case yr:j!==3?y.children===""?(l(y.el=r(""),o(x),x),B=x):B=T():(x.data!==y.children&&(kr(),x.data=y.children),B=s(x));break;case nn:E(x)?(B=s(x),p(y.el=x.content.firstChild,x,C)):j!==8||b?B=T():B=s(x);break;case Ys:if(b&&(x=s(x),j=x.nodeType),j===1||j===3){B=x;const ne=!y.children.length;for(let k=0;k<y.staticCount;k++)ne&&(y.children+=B.nodeType===1?B.outerHTML:B.data),k===y.staticCount-1&&(y.anchor=B),B=s(B);return b?s(B):B}else T();break;case cn:b?B=g(x,y,C,R,P,U):B=T();break;default:if(V&1)(j!==1||y.type.toLowerCase()!==x.tagName.toLowerCase())&&!E(x)?B=T():B=h(x,y,C,R,P,U);else if(V&6){y.slotScopeIds=P;const ne=o(x);if(b?B=m(x):is(x)&&x.data==="teleport start"?B=m(x,x.data,"teleport end"):B=s(x),e(y,ne,null,C,R,Fo(ne),U),fs(y)&&!y.type.__asyncResolved){let k;b?(k=jt(cn),k.anchor=B?B.previousSibling:ne.lastChild):k=x.nodeType===3?pm(""):jt("div"),k.el=x,y.component.subTree=k}}else V&64?j!==8?B=T():B=y.type.hydrate(x,y,C,R,P,U,t,d):V&128&&(B=y.type.hydrate(x,y,C,R,Fo(o(x)),P,U,t,f))}return I!=null&&us(I,null,R,y),B},h=(x,y,C,R,P,U)=>{U=U||!!y.dynamicChildren;const{type:b,props:T,patchFlag:L,shapeFlag:I,dirs:V,transition:z}=y,j=b==="input"||b==="option";if(j||L!==-1){V&&qn(y,null,C,"created");let B=!1;if(E(x)){B=rm(null,z)&&C&&C.vnode.props&&C.vnode.props.appear;const k=x.content.firstChild;if(B){const fe=k.getAttribute("class");fe&&(k.$cls=fe),z.beforeEnter(k)}p(k,x,C),y.el=x=k}if(I&16&&!(T&&(T.innerHTML||T.textContent))){let k=d(x.firstChild,y,x,C,R,P,U);for(;k;){Bo(x,1)||kr();const fe=k;k=k.nextSibling,a(fe)}}else if(I&8){let k=y.children;k[0]===`
`&&(x.tagName==="PRE"||x.tagName==="TEXTAREA")&&(k=k.slice(1)),x.textContent!==k&&(Bo(x,0)||kr(),x.textContent=y.children)}if(T){if(j||!U||L&48){const k=x.tagName.includes("-");for(const fe in T)(j&&(fe.endsWith("value")||fe==="indeterminate")||po(fe)&&!as(fe)||fe[0]==="."||k)&&i(x,fe,null,T[fe],void 0,C)}else if(T.onClick)i(x,"onClick",null,T.onClick,void 0,C);else if(L&4&&ls(T.style))for(const k in T.style)T.style[k]}let ne;(ne=T&&T.onVnodeBeforeMount)&&En(ne,C,y),V&&qn(y,null,C,"beforeMount"),((ne=T&&T.onVnodeMounted)||V||B)&&fm(()=>{ne&&En(ne,C,y),B&&z.enter(x),V&&qn(y,null,C,"mounted")},R)}return x.nextSibling},d=(x,y,C,R,P,U,b)=>{b=b||!!y.dynamicChildren;const T=y.children,L=T.length;for(let I=0;I<L;I++){const V=b?T[I]:T[I]=Tn(T[I]),z=V.type===yr;x?(z&&!b&&I+1<L&&Tn(T[I+1]).type===yr&&(l(r(x.data.slice(V.children.length)),C,s(x)),x.data=V.children),x=f(x,V,R,P,U,b)):z&&!V.children?l(V.el=r(""),C):(Bo(C,1)||kr(),n(null,V,C,null,R,P,Fo(C),U))}return x},g=(x,y,C,R,P,U)=>{const{slotScopeIds:b}=y;b&&(P=P?P.concat(b):b);const T=o(x),L=d(s(x),y,T,C,R,P,U);return L&&is(L)&&L.data==="]"?s(y.anchor=L):(kr(),l(y.anchor=c("]"),T,L),L)},_=(x,y,C,R,P,U)=>{if(Bo(x.parentElement,1)||kr(),y.el=null,U){const L=m(x);for(;;){const I=s(x);if(I&&I!==L)a(I);else break}}const b=s(x),T=o(x);return a(x),n(null,y,T,b,C,R,Fo(T),P),C&&(C.vnode.el=y.el,cm(C,y.el)),b},m=(x,y="[",C="]")=>{let R=0;for(;x;)if(x=s(x),x&&is(x)&&(x.data===y&&R++,x.data===C)){if(R===0)return s(x);R--}return x},p=(x,y,C)=>{const R=y.parentNode;R&&R.replaceChild(x,y);let P=C;for(;P;)P.vnode.el===y&&(P.vnode.el=P.subTree.el=x),P=P.parent},E=x=>x.nodeType===1&&x.tagName==="TEMPLATE";return[u,f]}const Vf="data-allow-mismatch",V_={0:"text",1:"children",2:"class",3:"style",4:"attribute"};function Bo(t,e){if(e===0||e===1)for(;t&&!t.hasAttribute(Vf);)t=t.parentElement;const n=t&&t.getAttribute(Vf);if(n==null)return!1;if(n==="")return!0;{const i=n.split(",");return e===0&&i.includes("children")?!0:i.includes(V_[e])}}ka().requestIdleCallback;ka().cancelIdleCallback;function G_(t,e){if(is(t)&&t.data==="["){let n=1,i=t.nextSibling;for(;i;){if(i.nodeType===1){if(e(i)===!1)break}else if(is(i))if(i.data==="]"){if(--n===0)break}else i.data==="["&&n++;i=i.nextSibling}}else e(t)}const fs=t=>!!t.type.__asyncLoader;function Vp(t){Ve(t)&&(t={loader:t});const{loader:e,loadingComponent:n,errorComponent:i,delay:r=200,hydrate:s,timeout:o,suspensible:a=!0,onError:l}=t;let c=null,u,f=0;const h=()=>(f++,c=null,d()),d=()=>{let g;return c||(g=c=e().catch(_=>{if(_=_ instanceof Error?_:new Error(String(_)),l)return new Promise((m,p)=>{l(_,()=>m(h()),()=>p(_),f+1)});throw _}).then(_=>g!==c&&c?c:(_&&(_.__esModule||_[Symbol.toStringTag]==="Module")&&(_=_.default),u=_,_)))};return Ue({name:"AsyncComponentWrapper",__asyncLoader:d,__asyncHydrate(g,_,m){let p=!1;(_.bu||(_.bu=[])).push(()=>p=!0);const E=()=>{p||m()},x=s?()=>{const y=s(E,C=>G_(g,C));y&&(_.bum||(_.bum=[])).push(y)}:E;u?x():d().then(()=>!_.isUnmounted&&x())},get __asyncResolved(){return u},setup(){const g=Ht;if(Nu(g),u)return()=>ll(u,g);const _=x=>{c=null,_o(x,g,13,!i)};if(a&&g.suspense||_s)return d().then(x=>()=>ll(x,g)).catch(x=>(_(x),()=>i?jt(i,{error:x}):null));const m=nt(!1),p=nt(),E=nt(!!r);return r&&setTimeout(()=>{E.value=!1},r),o!=null&&setTimeout(()=>{if(!m.value&&!p.value){const x=new Error(`Async component timed out after ${o}ms.`);_(x),p.value=x}},o),d().then(()=>{m.value=!0,g.parent&&xo(g.parent.vnode)&&g.parent.update()}).catch(x=>{_(x),p.value=x}),()=>{if(m.value&&u)return ll(u,g);if(p.value&&i)return jt(i,{error:p.value});if(n&&!E.value)return jt(n)}}})}function ll(t,e){const{ref:n,props:i,children:r,ce:s}=e.vnode,o=jt(t,i,r);return o.ref=n,o.ce=s,delete e.vnode.ce,o}const xo=t=>t.type.__isKeepAlive;function W_(t,e){Gp(t,"a",e)}function X_(t,e){Gp(t,"da",e)}function Gp(t,e,n=Ht){const i=t.__wdc||(t.__wdc=()=>{let r=n;for(;r;){if(r.isDeactivated)return;r=r.parent}return t()});if(Wa(e,i,n),n){let r=n.parent;for(;r&&r.parent;)xo(r.parent.vnode)&&$_(i,e,n,r),r=r.parent}}function $_(t,e,n,i){const r=Wa(e,t,i,!0);ii(()=>{bu(i[e],r)},n)}function Wa(t,e,n=Ht,i=!1){if(n){const r=n[t]||(n[t]=[]),s=e.__weh||(e.__weh=(...o)=>{Mi();const a=So(n),l=zn(e,n,t,o);return a(),Ei(),l});return i?r.unshift(s):r.push(s),s}}const wi=t=>(e,n=Ht)=>{(!_s||t==="sp")&&Wa(t,(...i)=>e(...i),n)},j_=wi("bm"),Et=wi("m"),q_=wi("bu"),Wp=wi("u"),Xp=wi("bum"),ii=wi("um"),Y_=wi("sp"),K_=wi("rtg"),Z_=wi("rtc");function J_(t,e=Ht){Wa("ec",t,e)}const Q_="components";function Ct(t,e){return t0(Q_,t,!0,e)||t}const e0=Symbol.for("v-ndc");function t0(t,e,n=!0,i=!1){const r=On||Ht;if(r){const s=r.type;{const a=V0(s,!1);if(a&&(a===e||a===hn(e)||a===mo(hn(e))))return s}const o=Gf(r[t]||s[t],e)||Gf(r.appContext[t],e);return!o&&i?s:o}}function Gf(t,e){return t&&(t[e]||t[hn(e)]||t[mo(hn(e))])}const fc=t=>t?mm(t)?zu(t):fc(t.parent):null,qs=Nt(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>fc(t.parent),$root:t=>fc(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>jp(t),$forceUpdate:t=>t.f||(t.f=()=>{Iu(t.update)}),$nextTick:t=>t.n||(t.n=Pr.bind(t.proxy)),$watch:t=>y0.bind(t)}),cl=(t,e)=>t!==vt&&!t.__isScriptSetup&&ut(t,e),n0={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:i,data:r,props:s,accessCache:o,type:a,appContext:l}=t;let c;if(e[0]!=="$"){const d=o[e];if(d!==void 0)switch(d){case 1:return i[e];case 2:return r[e];case 4:return n[e];case 3:return s[e]}else{if(cl(i,e))return o[e]=1,i[e];if(r!==vt&&ut(r,e))return o[e]=2,r[e];if((c=t.propsOptions[0])&&ut(c,e))return o[e]=3,s[e];if(n!==vt&&ut(n,e))return o[e]=4,n[e];hc&&(o[e]=0)}}const u=qs[e];let f,h;if(u)return e==="$attrs"&&$t(t.attrs,"get",""),u(t);if((f=a.__cssModules)&&(f=f[e]))return f;if(n!==vt&&ut(n,e))return o[e]=4,n[e];if(h=l.config.globalProperties,ut(h,e))return h[e]},set({_:t},e,n){const{data:i,setupState:r,ctx:s}=t;return cl(r,e)?(r[e]=n,!0):i!==vt&&ut(i,e)?(i[e]=n,!0):ut(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(s[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:i,appContext:r,propsOptions:s,type:o}},a){let l,c;return!!(n[a]||t!==vt&&a[0]!=="$"&&ut(t,a)||cl(e,a)||(l=s[0])&&ut(l,a)||ut(i,a)||ut(qs,a)||ut(r.config.globalProperties,a)||(c=o.__cssModules)&&c[a])},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:ut(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function Wf(t){return Ge(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let hc=!0;function i0(t){const e=jp(t),n=t.proxy,i=t.ctx;hc=!1,e.beforeCreate&&Xf(e.beforeCreate,t,"bc");const{data:r,computed:s,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:f,mounted:h,beforeUpdate:d,updated:g,activated:_,deactivated:m,beforeDestroy:p,beforeUnmount:E,destroyed:x,unmounted:y,render:C,renderTracked:R,renderTriggered:P,errorCaptured:U,serverPrefetch:b,expose:T,inheritAttrs:L,components:I,directives:V,filters:z}=e;if(c&&r0(c,i,null),o)for(const ne in o){const k=o[ne];Ve(k)&&(i[ne]=k.bind(n))}if(r){const ne=r.call(n,n);Mt(ne)&&(t.data=Er(ne))}if(hc=!0,s)for(const ne in s){const k=s[ne],fe=Ve(k)?k.bind(n,n):Ve(k.get)?k.get.bind(n,n):Qn,ye=!Ve(k)&&Ve(k.set)?k.set.bind(n):Qn,Ce=te({get:fe,set:ye});Object.defineProperty(i,ne,{enumerable:!0,configurable:!0,get:()=>Ce.value,set:Oe=>Ce.value=Oe})}if(a)for(const ne in a)$p(a[ne],i,n,ne);if(l){const ne=Ve(l)?l.call(n):l;Reflect.ownKeys(ne).forEach(k=>{hs(k,ne[k])})}u&&Xf(u,t,"c");function B(ne,k){Ge(k)?k.forEach(fe=>ne(fe.bind(n))):k&&ne(k.bind(n))}if(B(j_,f),B(Et,h),B(q_,d),B(Wp,g),B(W_,_),B(X_,m),B(J_,U),B(Z_,R),B(K_,P),B(Xp,E),B(ii,y),B(Y_,b),Ge(T))if(T.length){const ne=t.exposed||(t.exposed={});T.forEach(k=>{Object.defineProperty(ne,k,{get:()=>n[k],set:fe=>n[k]=fe,enumerable:!0})})}else t.exposed||(t.exposed={});C&&t.render===Qn&&(t.render=C),L!=null&&(t.inheritAttrs=L),I&&(t.components=I),V&&(t.directives=V),b&&Nu(t)}function r0(t,e,n=Qn){Ge(t)&&(t=dc(t));for(const i in t){const r=t[i];let s;Mt(r)?"default"in r?s=Dt(r.from||i,r.default,!0):s=Dt(r.from||i):s=Dt(r),Lt(s)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>s.value,set:o=>s.value=o}):e[i]=s}}function Xf(t,e,n){zn(Ge(t)?t.map(i=>i.bind(e.proxy)):t.bind(e.proxy),e,n)}function $p(t,e,n,i){let r=i.includes(".")?am(n,i):()=>n[i];if(Ot(t)){const s=e[t];Ve(s)&&Rt(r,s)}else if(Ve(t))Rt(r,t.bind(n));else if(Mt(t))if(Ge(t))t.forEach(s=>$p(s,e,n,i));else{const s=Ve(t.handler)?t.handler.bind(n):e[t.handler];Ve(s)&&Rt(r,s,t)}}function jp(t){const e=t.type,{mixins:n,extends:i}=e,{mixins:r,optionsCache:s,config:{optionMergeStrategies:o}}=t.appContext,a=s.get(e);let l;return a?l=a:!r.length&&!n&&!i?l=e:(l={},r.length&&r.forEach(c=>Aa(l,c,o,!0)),Aa(l,e,o)),Mt(e)&&s.set(e,l),l}function Aa(t,e,n,i=!1){const{mixins:r,extends:s}=e;s&&Aa(t,s,n,!0),r&&r.forEach(o=>Aa(t,o,n,!0));for(const o in e)if(!(i&&o==="expose")){const a=s0[o]||n&&n[o];t[o]=a?a(t[o],e[o]):e[o]}return t}const s0={data:$f,props:jf,emits:jf,methods:Vs,computed:Vs,beforeCreate:Zt,created:Zt,beforeMount:Zt,mounted:Zt,beforeUpdate:Zt,updated:Zt,beforeDestroy:Zt,beforeUnmount:Zt,destroyed:Zt,unmounted:Zt,activated:Zt,deactivated:Zt,errorCaptured:Zt,serverPrefetch:Zt,components:Vs,directives:Vs,watch:a0,provide:$f,inject:o0};function $f(t,e){return e?t?function(){return Nt(Ve(t)?t.call(this,this):t,Ve(e)?e.call(this,this):e)}:e:t}function o0(t,e){return Vs(dc(t),dc(e))}function dc(t){if(Ge(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function Zt(t,e){return t?[...new Set([].concat(t,e))]:e}function Vs(t,e){return t?Nt(Object.create(null),t,e):e}function jf(t,e){return t?Ge(t)&&Ge(e)?[...new Set([...t,...e])]:Nt(Object.create(null),Wf(t),Wf(e??{})):e}function a0(t,e){if(!t)return e;if(!e)return t;const n=Nt(Object.create(null),t);for(const i in e)n[i]=Zt(t[i],e[i]);return n}function qp(){return{app:null,config:{isNativeTag:ap,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let l0=0;function c0(t,e){return function(i,r=null){Ve(i)||(i=Nt({},i)),r!=null&&!Mt(r)&&(r=null);const s=qp(),o=new WeakSet,a=[];let l=!1;const c=s.app={_uid:l0++,_component:i,_props:r,_container:null,_context:s,_instance:null,version:W0,get config(){return s.config},set config(u){},use(u,...f){return o.has(u)||(u&&Ve(u.install)?(o.add(u),u.install(c,...f)):Ve(u)&&(o.add(u),u(c,...f))),c},mixin(u){return s.mixins.includes(u)||s.mixins.push(u),c},component(u,f){return f?(s.components[u]=f,c):s.components[u]},directive(u,f){return f?(s.directives[u]=f,c):s.directives[u]},mount(u,f,h){if(!l){const d=c._ceVNode||jt(i,r);return d.appContext=s,h===!0?h="svg":h===!1&&(h=void 0),f&&e?e(d,u):t(d,u,h),l=!0,c._container=u,u.__vue_app__=c,zu(d.component)}},onUnmount(u){a.push(u)},unmount(){l&&(zn(a,c._instance,16),t(null,c._container),delete c._container.__vue_app__)},provide(u,f){return s.provides[u]=f,c},runWithContext(u){const f=Sr;Sr=c;try{return u()}finally{Sr=f}}};return c}}let Sr=null;function hs(t,e){if(Ht){let n=Ht.provides;const i=Ht.parent&&Ht.parent.provides;i===n&&(n=Ht.provides=Object.create(i)),n[t]=e}}function Dt(t,e,n=!1){const i=Zi();if(i||Sr){let r=Sr?Sr._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(r&&t in r)return r[t];if(arguments.length>1)return n&&Ve(e)?e.call(i&&i.proxy):e}}function Yp(){return!!(Zi()||Sr)}const Kp={},Zp=()=>Object.create(Kp),Jp=t=>Object.getPrototypeOf(t)===Kp;function u0(t,e,n,i=!1){const r={},s=Zp();t.propsDefaults=Object.create(null),Qp(t,e,r,s);for(const o in t.propsOptions[0])o in r||(r[o]=void 0);n?t.props=i?r:Cp(r):t.type.props?t.props=r:t.props=s,t.attrs=s}function f0(t,e,n,i){const{props:r,attrs:s,vnode:{patchFlag:o}}=t,a=et(r),[l]=t.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const u=t.vnode.dynamicProps;for(let f=0;f<u.length;f++){let h=u[f];if(Xa(t.emitsOptions,h))continue;const d=e[h];if(l)if(ut(s,h))d!==s[h]&&(s[h]=d,c=!0);else{const g=hn(h);r[g]=pc(l,a,g,d,t,!1)}else d!==s[h]&&(s[h]=d,c=!0)}}}else{Qp(t,e,r,s)&&(c=!0);let u;for(const f in a)(!e||!ut(e,f)&&((u=Rr(f))===f||!ut(e,u)))&&(l?n&&(n[f]!==void 0||n[u]!==void 0)&&(r[f]=pc(l,a,f,void 0,t,!0)):delete r[f]);if(s!==a)for(const f in s)(!e||!ut(e,f))&&(delete s[f],c=!0)}c&&_i(t.attrs,"set","")}function Qp(t,e,n,i){const[r,s]=t.propsOptions;let o=!1,a;if(e)for(let l in e){if(as(l))continue;const c=e[l];let u;r&&ut(r,u=hn(l))?!s||!s.includes(u)?n[u]=c:(a||(a={}))[u]=c:Xa(t.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,o=!0)}if(s){const l=et(n),c=a||vt;for(let u=0;u<s.length;u++){const f=s[u];n[f]=pc(r,l,f,c[f],t,!ut(c,f))}}return o}function pc(t,e,n,i,r,s){const o=t[n];if(o!=null){const a=ut(o,"default");if(a&&i===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&Ve(l)){const{propsDefaults:c}=r;if(n in c)i=c[n];else{const u=So(r);i=c[n]=l.call(null,e),u()}}else i=l;r.ce&&r.ce._setProp(n,i)}o[0]&&(s&&!a?i=!1:o[1]&&(i===""||i===Rr(n))&&(i=!0))}return i}const h0=new WeakMap;function em(t,e,n=!1){const i=n?h0:e.propsCache,r=i.get(t);if(r)return r;const s=t.props,o={},a=[];let l=!1;if(!Ve(t)){const u=f=>{l=!0;const[h,d]=em(f,e,!0);Nt(o,h),d&&a.push(...d)};!n&&e.mixins.length&&e.mixins.forEach(u),t.extends&&u(t.extends),t.mixins&&t.mixins.forEach(u)}if(!s&&!l)return Mt(t)&&i.set(t,os),os;if(Ge(s))for(let u=0;u<s.length;u++){const f=hn(s[u]);qf(f)&&(o[f]=vt)}else if(s)for(const u in s){const f=hn(u);if(qf(f)){const h=s[u],d=o[f]=Ge(h)||Ve(h)?{type:h}:Nt({},h),g=d.type;let _=!1,m=!0;if(Ge(g))for(let p=0;p<g.length;++p){const E=g[p],x=Ve(E)&&E.name;if(x==="Boolean"){_=!0;break}else x==="String"&&(m=!1)}else _=Ve(g)&&g.name==="Boolean";d[0]=_,d[1]=m,(_||ut(d,"default"))&&a.push(f)}}const c=[o,a];return Mt(t)&&i.set(t,c),c}function qf(t){return t[0]!=="$"&&!as(t)}const Ou=t=>t==="_"||t==="_ctx"||t==="$stable",Fu=t=>Ge(t)?t.map(Tn):[Tn(t)],d0=(t,e,n)=>{if(e._n)return e;const i=N_((...r)=>Fu(e(...r)),n);return i._c=!1,i},tm=(t,e,n)=>{const i=t._ctx;for(const r in t){if(Ou(r))continue;const s=t[r];if(Ve(s))e[r]=d0(r,s,i);else if(s!=null){const o=Fu(s);e[r]=()=>o}}},nm=(t,e)=>{const n=Fu(e);t.slots.default=()=>n},im=(t,e,n)=>{for(const i in e)(n||!Ou(i))&&(t[i]=e[i])},p0=(t,e,n)=>{const i=t.slots=Zp();if(t.vnode.shapeFlag&32){const r=e._;r?(im(i,e,n),n&&cp(i,"_",r,!0)):tm(e,i)}else e&&nm(t,e)},m0=(t,e,n)=>{const{vnode:i,slots:r}=t;let s=!0,o=vt;if(i.shapeFlag&32){const a=e._;a?n&&a===1?s=!1:im(r,e,n):(s=!e.$stable,tm(e,r)),o=e}else e&&(nm(t,e),o={default:1});if(s)for(const a in r)!Ou(a)&&o[a]==null&&delete r[a]},vn=fm;function g0(t){return v0(t,z_)}function v0(t,e){const n=ka();n.__VUE__=!0;const{insert:i,remove:r,patchProp:s,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:f,nextSibling:h,setScopeId:d=Qn,insertStaticContent:g}=t,_=(v,D,H,K=null,G=null,se=null,Q=void 0,oe=null,de=!!D.dynamicChildren)=>{if(v===D)return;v&&!dr(v,D)&&(K=O(v),Oe(v,G,se,!0),v=null),D.patchFlag===-2&&(de=!1,D.dynamicChildren=null);const{type:ce,ref:A,shapeFlag:M}=D;switch(ce){case yr:m(v,D,H,K);break;case nn:p(v,D,H,K);break;case Ys:v==null&&E(D,H,K,Q);break;case cn:I(v,D,H,K,G,se,Q,oe,de);break;default:M&1?C(v,D,H,K,G,se,Q,oe,de):M&6?V(v,D,H,K,G,se,Q,oe,de):(M&64||M&128)&&ce.process(v,D,H,K,G,se,Q,oe,de,le)}A!=null&&G?us(A,v&&v.ref,se,D||v,!D):A==null&&v&&v.ref!=null&&us(v.ref,null,se,v,!0)},m=(v,D,H,K)=>{if(v==null)i(D.el=a(D.children),H,K);else{const G=D.el=v.el;D.children!==v.children&&c(G,D.children)}},p=(v,D,H,K)=>{v==null?i(D.el=l(D.children||""),H,K):D.el=v.el},E=(v,D,H,K)=>{[v.el,v.anchor]=g(v.children,D,H,K,v.el,v.anchor)},x=({el:v,anchor:D},H,K)=>{let G;for(;v&&v!==D;)G=h(v),i(v,H,K),v=G;i(D,H,K)},y=({el:v,anchor:D})=>{let H;for(;v&&v!==D;)H=h(v),r(v),v=H;r(D)},C=(v,D,H,K,G,se,Q,oe,de)=>{D.type==="svg"?Q="svg":D.type==="math"&&(Q="mathml"),v==null?R(D,H,K,G,se,Q,oe,de):b(v,D,G,se,Q,oe,de)},R=(v,D,H,K,G,se,Q,oe)=>{let de,ce;const{props:A,shapeFlag:M,transition:N,dirs:$}=v;if(de=v.el=o(v.type,se,A&&A.is,A),M&8?u(de,v.children):M&16&&U(v.children,de,null,K,G,ul(v,se),Q,oe),$&&qn(v,null,K,"created"),P(de,v,v.scopeId,Q,K),A){for(const Y in A)Y!=="value"&&!as(Y)&&s(de,Y,null,A[Y],se,K);"value"in A&&s(de,"value",null,A.value,se),(ce=A.onVnodeBeforeMount)&&En(ce,K,v)}$&&qn(v,null,K,"beforeMount");const ee=rm(G,N);ee&&N.beforeEnter(de),i(de,D,H),((ce=A&&A.onVnodeMounted)||ee||$)&&vn(()=>{ce&&En(ce,K,v),ee&&N.enter(de),$&&qn(v,null,K,"mounted")},G)},P=(v,D,H,K,G)=>{if(H&&d(v,H),K)for(let se=0;se<K.length;se++)d(v,K[se]);if(G){let se=G.subTree;if(D===se||um(se.type)&&(se.ssContent===D||se.ssFallback===D)){const Q=G.vnode;P(v,Q,Q.scopeId,Q.slotScopeIds,G.parent)}}},U=(v,D,H,K,G,se,Q,oe,de=0)=>{for(let ce=de;ce<v.length;ce++){const A=v[ce]=oe?ki(v[ce]):Tn(v[ce]);_(null,A,D,H,K,G,se,Q,oe)}},b=(v,D,H,K,G,se,Q)=>{const oe=D.el=v.el;let{patchFlag:de,dynamicChildren:ce,dirs:A}=D;de|=v.patchFlag&16;const M=v.props||vt,N=D.props||vt;let $;if(H&&nr(H,!1),($=N.onVnodeBeforeUpdate)&&En($,H,D,v),A&&qn(D,v,H,"beforeUpdate"),H&&nr(H,!0),(M.innerHTML&&N.innerHTML==null||M.textContent&&N.textContent==null)&&u(oe,""),ce?T(v.dynamicChildren,ce,oe,H,K,ul(D,G),se):Q||k(v,D,oe,null,H,K,ul(D,G),se,!1),de>0){if(de&16)L(oe,M,N,H,G);else if(de&2&&M.class!==N.class&&s(oe,"class",null,N.class,G),de&4&&s(oe,"style",M.style,N.style,G),de&8){const ee=D.dynamicProps;for(let Y=0;Y<ee.length;Y++){const _e=ee[Y],pe=M[_e],Ee=N[_e];(Ee!==pe||_e==="value")&&s(oe,_e,pe,Ee,G,H)}}de&1&&v.children!==D.children&&u(oe,D.children)}else!Q&&ce==null&&L(oe,M,N,H,G);(($=N.onVnodeUpdated)||A)&&vn(()=>{$&&En($,H,D,v),A&&qn(D,v,H,"updated")},K)},T=(v,D,H,K,G,se,Q)=>{for(let oe=0;oe<D.length;oe++){const de=v[oe],ce=D[oe],A=de.el&&(de.type===cn||!dr(de,ce)||de.shapeFlag&198)?f(de.el):H;_(de,ce,A,null,K,G,se,Q,!0)}},L=(v,D,H,K,G)=>{if(D!==H){if(D!==vt)for(const se in D)!as(se)&&!(se in H)&&s(v,se,D[se],null,G,K);for(const se in H){if(as(se))continue;const Q=H[se],oe=D[se];Q!==oe&&se!=="value"&&s(v,se,oe,Q,G,K)}"value"in H&&s(v,"value",D.value,H.value,G)}},I=(v,D,H,K,G,se,Q,oe,de)=>{const ce=D.el=v?v.el:a(""),A=D.anchor=v?v.anchor:a("");let{patchFlag:M,dynamicChildren:N,slotScopeIds:$}=D;$&&(oe=oe?oe.concat($):$),v==null?(i(ce,H,K),i(A,H,K),U(D.children||[],H,A,G,se,Q,oe,de)):M>0&&M&64&&N&&v.dynamicChildren?(T(v.dynamicChildren,N,H,G,se,Q,oe),(D.key!=null||G&&D===G.subTree)&&sm(v,D,!0)):k(v,D,H,A,G,se,Q,oe,de)},V=(v,D,H,K,G,se,Q,oe,de)=>{D.slotScopeIds=oe,v==null?D.shapeFlag&512?G.ctx.activate(D,H,K,Q,de):z(D,H,K,G,se,Q,de):j(v,D,de)},z=(v,D,H,K,G,se,Q)=>{const oe=v.component=F0(v,K,G);if(xo(v)&&(oe.ctx.renderer=le),B0(oe,!1,Q),oe.asyncDep){if(G&&G.registerDep(oe,B,Q),!v.el){const de=oe.subTree=jt(nn);p(null,de,D,H),v.placeholder=de.el}}else B(oe,v,D,H,G,se,Q)},j=(v,D,H)=>{const K=D.component=v.component;if(A0(v,D,H))if(K.asyncDep&&!K.asyncResolved){ne(K,D,H);return}else K.next=D,K.update();else D.el=v.el,K.vnode=D},B=(v,D,H,K,G,se,Q)=>{const oe=()=>{if(v.isMounted){let{next:M,bu:N,u:$,parent:ee,vnode:Y}=v;{const he=om(v);if(he){M&&(M.el=Y.el,ne(v,M,Q)),he.asyncDep.then(()=>{v.isUnmounted||oe()});return}}let _e=M,pe;nr(v,!1),M?(M.el=Y.el,ne(v,M,Q)):M=Y,N&&il(N),(pe=M.props&&M.props.onVnodeBeforeUpdate)&&En(pe,ee,M,Y),nr(v,!0);const Ee=fl(v),Ae=v.subTree;v.subTree=Ee,_(Ae,Ee,f(Ae.el),O(Ae),v,G,se),M.el=Ee.el,_e===null&&cm(v,Ee.el),$&&vn($,G),(pe=M.props&&M.props.onVnodeUpdated)&&vn(()=>En(pe,ee,M,Y),G)}else{let M;const{el:N,props:$}=D,{bm:ee,m:Y,parent:_e,root:pe,type:Ee}=v,Ae=fs(D);if(nr(v,!1),ee&&il(ee),!Ae&&(M=$&&$.onVnodeBeforeMount)&&En(M,_e,D),nr(v,!0),N&&$e){const he=()=>{v.subTree=fl(v),$e(N,v.subTree,v,G,null)};Ae&&Ee.__asyncHydrate?Ee.__asyncHydrate(N,v,he):he()}else{pe.ce&&pe.ce._def.shadowRoot!==!1&&pe.ce._injectChildStyle(Ee);const he=v.subTree=fl(v);_(null,he,H,K,v,G,se),D.el=he.el}if(Y&&vn(Y,G),!Ae&&(M=$&&$.onVnodeMounted)){const he=D;vn(()=>En(M,_e,he),G)}(D.shapeFlag&256||_e&&fs(_e.vnode)&&_e.vnode.shapeFlag&256)&&v.a&&vn(v.a,G),v.isMounted=!0,D=H=K=null}};v.scope.on();const de=v.effect=new hp(oe);v.scope.off();const ce=v.update=de.run.bind(de),A=v.job=de.runIfDirty.bind(de);A.i=v,A.id=v.uid,de.scheduler=()=>Iu(A),nr(v,!0),ce()},ne=(v,D,H)=>{D.component=v;const K=v.vnode.props;v.vnode=D,v.next=null,f0(v,D.props,K,H),m0(v,D.children,H),Mi(),Bf(v),Ei()},k=(v,D,H,K,G,se,Q,oe,de=!1)=>{const ce=v&&v.children,A=v?v.shapeFlag:0,M=D.children,{patchFlag:N,shapeFlag:$}=D;if(N>0){if(N&128){ye(ce,M,H,K,G,se,Q,oe,de);return}else if(N&256){fe(ce,M,H,K,G,se,Q,oe,de);return}}$&8?(A&16&&re(ce,G,se),M!==ce&&u(H,M)):A&16?$&16?ye(ce,M,H,K,G,se,Q,oe,de):re(ce,G,se,!0):(A&8&&u(H,""),$&16&&U(M,H,K,G,se,Q,oe,de))},fe=(v,D,H,K,G,se,Q,oe,de)=>{v=v||os,D=D||os;const ce=v.length,A=D.length,M=Math.min(ce,A);let N;for(N=0;N<M;N++){const $=D[N]=de?ki(D[N]):Tn(D[N]);_(v[N],$,H,null,G,se,Q,oe,de)}ce>A?re(v,G,se,!0,!1,M):U(D,H,K,G,se,Q,oe,de,M)},ye=(v,D,H,K,G,se,Q,oe,de)=>{let ce=0;const A=D.length;let M=v.length-1,N=A-1;for(;ce<=M&&ce<=N;){const $=v[ce],ee=D[ce]=de?ki(D[ce]):Tn(D[ce]);if(dr($,ee))_($,ee,H,null,G,se,Q,oe,de);else break;ce++}for(;ce<=M&&ce<=N;){const $=v[M],ee=D[N]=de?ki(D[N]):Tn(D[N]);if(dr($,ee))_($,ee,H,null,G,se,Q,oe,de);else break;M--,N--}if(ce>M){if(ce<=N){const $=N+1,ee=$<A?D[$].el:K;for(;ce<=N;)_(null,D[ce]=de?ki(D[ce]):Tn(D[ce]),H,ee,G,se,Q,oe,de),ce++}}else if(ce>N)for(;ce<=M;)Oe(v[ce],G,se,!0),ce++;else{const $=ce,ee=ce,Y=new Map;for(ce=ee;ce<=N;ce++){const we=D[ce]=de?ki(D[ce]):Tn(D[ce]);we.key!=null&&Y.set(we.key,ce)}let _e,pe=0;const Ee=N-ee+1;let Ae=!1,he=0;const Me=new Array(Ee);for(ce=0;ce<Ee;ce++)Me[ce]=0;for(ce=$;ce<=M;ce++){const we=v[ce];if(pe>=Ee){Oe(we,G,se,!0);continue}let xe;if(we.key!=null)xe=Y.get(we.key);else for(_e=ee;_e<=N;_e++)if(Me[_e-ee]===0&&dr(we,D[_e])){xe=_e;break}xe===void 0?Oe(we,G,se,!0):(Me[xe-ee]=ce+1,xe>=he?he=xe:Ae=!0,_(we,D[xe],H,null,G,se,Q,oe,de),pe++)}const Fe=Ae?_0(Me):os;for(_e=Fe.length-1,ce=Ee-1;ce>=0;ce--){const we=ee+ce,xe=D[we],ze=D[we+1],F=we+1<A?ze.el||ze.placeholder:K;Me[ce]===0?_(null,xe,H,F,G,se,Q,oe,de):Ae&&(_e<0||ce!==Fe[_e]?Ce(xe,H,F,2):_e--)}}},Ce=(v,D,H,K,G=null)=>{const{el:se,type:Q,transition:oe,children:de,shapeFlag:ce}=v;if(ce&6){Ce(v.component.subTree,D,H,K);return}if(ce&128){v.suspense.move(D,H,K);return}if(ce&64){Q.move(v,D,H,le);return}if(Q===cn){i(se,D,H);for(let M=0;M<de.length;M++)Ce(de[M],D,H,K);i(v.anchor,D,H);return}if(Q===Ys){x(v,D,H);return}if(K!==2&&ce&1&&oe)if(K===0)oe.beforeEnter(se),i(se,D,H),vn(()=>oe.enter(se),G);else{const{leave:M,delayLeave:N,afterLeave:$}=oe,ee=()=>{v.ctx.isUnmounted?r(se):i(se,D,H)},Y=()=>{se._isLeaving&&se[vi](!0),M(se,()=>{ee(),$&&$()})};N?N(se,ee,Y):Y()}else i(se,D,H)},Oe=(v,D,H,K=!1,G=!1)=>{const{type:se,props:Q,ref:oe,children:de,dynamicChildren:ce,shapeFlag:A,patchFlag:M,dirs:N,cacheIndex:$}=v;if(M===-2&&(G=!1),oe!=null&&(Mi(),us(oe,null,H,v,!0),Ei()),$!=null&&(D.renderCache[$]=void 0),A&256){D.ctx.deactivate(v);return}const ee=A&1&&N,Y=!fs(v);let _e;if(Y&&(_e=Q&&Q.onVnodeBeforeUnmount)&&En(_e,D,v),A&6)Qe(v.component,H,K);else{if(A&128){v.suspense.unmount(H,K);return}ee&&qn(v,null,D,"beforeUnmount"),A&64?v.type.remove(v,D,H,le,K):ce&&!ce.hasOnce&&(se!==cn||M>0&&M&64)?re(ce,D,H,!1,!0):(se===cn&&M&384||!G&&A&16)&&re(de,D,H),K&&tt(v)}(Y&&(_e=Q&&Q.onVnodeUnmounted)||ee)&&vn(()=>{_e&&En(_e,D,v),ee&&qn(v,null,D,"unmounted")},H)},tt=v=>{const{type:D,el:H,anchor:K,transition:G}=v;if(D===cn){at(H,K);return}if(D===Ys){y(v);return}const se=()=>{r(H),G&&!G.persisted&&G.afterLeave&&G.afterLeave()};if(v.shapeFlag&1&&G&&!G.persisted){const{leave:Q,delayLeave:oe}=G,de=()=>Q(H,se);oe?oe(v.el,se,de):de()}else se()},at=(v,D)=>{let H;for(;v!==D;)H=h(v),r(v),v=H;r(D)},Qe=(v,D,H)=>{const{bum:K,scope:G,job:se,subTree:Q,um:oe,m:de,a:ce}=v;Yf(de),Yf(ce),K&&il(K),G.stop(),se&&(se.flags|=8,Oe(Q,v,D,H)),oe&&vn(oe,D),vn(()=>{v.isUnmounted=!0},D)},re=(v,D,H,K=!1,G=!1,se=0)=>{for(let Q=se;Q<v.length;Q++)Oe(v[Q],D,H,K,G)},O=v=>{if(v.shapeFlag&6)return O(v.component.subTree);if(v.shapeFlag&128)return v.suspense.next();const D=h(v.anchor||v.el),H=D&&D[O_];return H?h(H):D};let ie=!1;const ae=(v,D,H)=>{v==null?D._vnode&&Oe(D._vnode,null,null,!0):_(D._vnode||null,v,D,null,null,null,H),D._vnode=v,ie||(ie=!0,Bf(),ba(),ie=!1)},le={p:_,um:Oe,m:Ce,r:tt,mt:z,mc:U,pc:k,pbc:T,n:O,o:t};let Re,$e;return e&&([Re,$e]=e(le)),{render:ae,hydrate:Re,createApp:c0(ae,Re)}}function ul({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function nr({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function rm(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function sm(t,e,n=!1){const i=t.children,r=e.children;if(Ge(i)&&Ge(r))for(let s=0;s<i.length;s++){const o=i[s];let a=r[s];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=r[s]=ki(r[s]),a.el=o.el),!n&&a.patchFlag!==-2&&sm(o,a)),a.type===yr&&a.patchFlag!==-1&&(a.el=o.el),a.type===nn&&!a.el&&(a.el=o.el)}}function _0(t){const e=t.slice(),n=[0];let i,r,s,o,a;const l=t.length;for(i=0;i<l;i++){const c=t[i];if(c!==0){if(r=n[n.length-1],t[r]<c){e[i]=r,n.push(i);continue}for(s=0,o=n.length-1;s<o;)a=s+o>>1,t[n[a]]<c?s=a+1:o=a;c<t[n[s]]&&(s>0&&(e[i]=n[s-1]),n[s]=i)}}for(s=n.length,o=n[s-1];s-- >0;)n[s]=o,o=e[o];return n}function om(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:om(e)}function Yf(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}const x0=Symbol.for("v-scx"),S0=()=>Dt(x0);function Bu(t,e){return ku(t,null,e)}function Rt(t,e,n){return ku(t,e,n)}function ku(t,e,n=vt){const{immediate:i,deep:r,flush:s,once:o}=n,a=Nt({},n),l=e&&i||!e&&s!=="post";let c;if(_s){if(s==="sync"){const d=S0();c=d.__watcherHandles||(d.__watcherHandles=[])}else if(!l){const d=()=>{};return d.stop=Qn,d.resume=Qn,d.pause=Qn,d}}const u=Ht;a.call=(d,g,_)=>zn(d,u,g,_);let f=!1;s==="post"?a.scheduler=d=>{vn(d,u&&u.suspense)}:s!=="sync"&&(f=!0,a.scheduler=(d,g)=>{g?d():Iu(d)}),a.augmentJob=d=>{e&&(d.flags|=4),f&&(d.flags|=2,u&&(d.id=u.uid,d.i=u))};const h=L_(t,e,a);return _s&&(c?c.push(h):l&&h()),h}function y0(t,e,n){const i=this.proxy,r=Ot(t)?t.includes(".")?am(i,t):()=>i[t]:t.bind(i,i);let s;Ve(e)?s=e:(s=e.handler,n=e);const o=So(this),a=ku(r,s.bind(i),n);return o(),a}function am(t,e){const n=e.split(".");return()=>{let i=t;for(let r=0;r<n.length&&i;r++)i=i[n[r]];return i}}const M0=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${hn(e)}Modifiers`]||t[`${Rr(e)}Modifiers`];function E0(t,e,...n){if(t.isUnmounted)return;const i=t.vnode.props||vt;let r=n;const s=e.startsWith("update:"),o=s&&M0(i,e.slice(7));o&&(o.trim&&(r=n.map(u=>Ot(u)?u.trim():u)),o.number&&(r=n.map(Xv)));let a,l=i[a=nl(e)]||i[a=nl(hn(e))];!l&&s&&(l=i[a=nl(Rr(e))]),l&&zn(l,t,6,r);const c=i[a+"Once"];if(c){if(!t.emitted)t.emitted={};else if(t.emitted[a])return;t.emitted[a]=!0,zn(c,t,6,r)}}const b0=new WeakMap;function lm(t,e,n=!1){const i=n?b0:e.emitsCache,r=i.get(t);if(r!==void 0)return r;const s=t.emits;let o={},a=!1;if(!Ve(t)){const l=c=>{const u=lm(c,e,!0);u&&(a=!0,Nt(o,u))};!n&&e.mixins.length&&e.mixins.forEach(l),t.extends&&l(t.extends),t.mixins&&t.mixins.forEach(l)}return!s&&!a?(Mt(t)&&i.set(t,null),null):(Ge(s)?s.forEach(l=>o[l]=null):Nt(o,s),Mt(t)&&i.set(t,o),o)}function Xa(t,e){return!t||!po(e)?!1:(e=e.slice(2).replace(/Once$/,""),ut(t,e[0].toLowerCase()+e.slice(1))||ut(t,Rr(e))||ut(t,e))}function fl(t){const{type:e,vnode:n,proxy:i,withProxy:r,propsOptions:[s],slots:o,attrs:a,emit:l,render:c,renderCache:u,props:f,data:h,setupState:d,ctx:g,inheritAttrs:_}=t,m=Ta(t);let p,E;try{if(n.shapeFlag&4){const y=r||i,C=y;p=Tn(c.call(C,y,u,f,d,h,g)),E=a}else{const y=e;p=Tn(y.length>1?y(f,{attrs:a,slots:o,emit:l}):y(f,null)),E=e.props?a:T0(a)}}catch(y){Ks.length=0,_o(y,t,1),p=jt(nn)}let x=p;if(E&&_!==!1){const y=Object.keys(E),{shapeFlag:C}=x;y.length&&C&7&&(s&&y.some(Eu)&&(E=w0(E,s)),x=qi(x,E,!1,!0))}return n.dirs&&(x=qi(x,null,!1,!0),x.dirs=x.dirs?x.dirs.concat(n.dirs):n.dirs),n.transition&&Tr(x,n.transition),p=x,Ta(m),p}const T0=t=>{let e;for(const n in t)(n==="class"||n==="style"||po(n))&&((e||(e={}))[n]=t[n]);return e},w0=(t,e)=>{const n={};for(const i in t)(!Eu(i)||!(i.slice(9)in e))&&(n[i]=t[i]);return n};function A0(t,e,n){const{props:i,children:r,component:s}=t,{props:o,children:a,patchFlag:l}=e,c=s.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return i?Kf(i,o,c):!!o;if(l&8){const u=e.dynamicProps;for(let f=0;f<u.length;f++){const h=u[f];if(o[h]!==i[h]&&!Xa(c,h))return!0}}}else return(r||a)&&(!a||!a.$stable)?!0:i===o?!1:i?o?Kf(i,o,c):!0:!!o;return!1}function Kf(t,e,n){const i=Object.keys(e);if(i.length!==Object.keys(t).length)return!0;for(let r=0;r<i.length;r++){const s=i[r];if(e[s]!==t[s]&&!Xa(n,s))return!0}return!1}function cm({vnode:t,parent:e},n){for(;e;){const i=e.subTree;if(i.suspense&&i.suspense.activeBranch===t&&(i.el=t.el),i===t)(t=e.vnode).el=n,e=e.parent;else break}}const um=t=>t.__isSuspense;function fm(t,e){e&&e.pendingBranch?Ge(t)?e.effects.push(...t):e.effects.push(t):U_(t)}const cn=Symbol.for("v-fgt"),yr=Symbol.for("v-txt"),nn=Symbol.for("v-cmt"),Ys=Symbol.for("v-stc"),Ks=[];let _n=null;function C0(t=!1){Ks.push(_n=t?null:[])}function R0(){Ks.pop(),_n=Ks[Ks.length-1]||null}let ro=1;function Ca(t,e=!1){ro+=t,t<0&&_n&&e&&(_n.hasOnce=!0)}function P0(t){return t.dynamicChildren=ro>0?_n||os:null,R0(),ro>0&&_n&&_n.push(t),t}function L0(t,e,n,i,r,s){return P0(dm(t,e,n,i,r,s,!0))}function Ra(t){return t?t.__v_isVNode===!0:!1}function dr(t,e){return t.type===e.type&&t.key===e.key}const hm=({key:t})=>t??null,ha=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?Ot(t)||Lt(t)||Ve(t)?{i:On,r:t,k:e,f:!!n}:t:null);function dm(t,e=null,n=null,i=0,r=null,s=t===cn?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&hm(e),ref:e&&ha(e),scopeId:Np,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:i,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:On};return a?(Hu(l,n),s&128&&t.normalize(l)):n&&(l.shapeFlag|=Ot(n)?8:16),ro>0&&!o&&_n&&(l.patchFlag>0||s&6)&&l.patchFlag!==32&&_n.push(l),l}const jt=D0;function D0(t,e=null,n=null,i=0,r=null,s=!1){if((!t||t===e0)&&(t=nn),Ra(t)){const a=qi(t,e,!0);return n&&Hu(a,n),ro>0&&!s&&_n&&(a.shapeFlag&6?_n[_n.indexOf(t)]=a:_n.push(a)),a.patchFlag=-2,a}if(G0(t)&&(t=t.__vccOpts),e){e=I0(e);let{class:a,style:l}=e;a&&!Ot(a)&&(e.class=Au(a)),Mt(l)&&(Du(l)&&!Ge(l)&&(l=Nt({},l)),e.style=wu(l))}const o=Ot(t)?1:um(t)?128:Op(t)?64:Mt(t)?4:Ve(t)?2:0;return dm(t,e,n,i,r,o,s,!0)}function I0(t){return t?Du(t)||Jp(t)?Nt({},t):t:null}function qi(t,e,n=!1,i=!1){const{props:r,ref:s,patchFlag:o,children:a,transition:l}=t,c=e?U0(r||{},e):r,u={__v_isVNode:!0,__v_skip:!0,type:t.type,props:c,key:c&&hm(c),ref:e&&e.ref?n&&s?Ge(s)?s.concat(ha(e)):[s,ha(e)]:ha(e):s,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:a,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==cn?o===-1?16:o|16:o,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:l,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&qi(t.ssContent),ssFallback:t.ssFallback&&qi(t.ssFallback),placeholder:t.placeholder,el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return l&&i&&Tr(u,l.clone(u)),u}function pm(t=" ",e=0){return jt(yr,null,t,e)}function YC(t,e){const n=jt(Ys,null,t);return n.staticCount=e,n}function Tn(t){return t==null||typeof t=="boolean"?jt(nn):Ge(t)?jt(cn,null,t.slice()):Ra(t)?ki(t):jt(yr,null,String(t))}function ki(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:qi(t)}function Hu(t,e){let n=0;const{shapeFlag:i}=t;if(e==null)e=null;else if(Ge(e))n=16;else if(typeof e=="object")if(i&65){const r=e.default;r&&(r._c&&(r._d=!1),Hu(t,r()),r._c&&(r._d=!0));return}else{n=32;const r=e._;!r&&!Jp(e)?e._ctx=On:r===3&&On&&(On.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else Ve(e)?(e={default:e,_ctx:On},n=32):(e=String(e),i&64?(n=16,e=[pm(e)]):n=8);t.children=e,t.shapeFlag|=n}function U0(...t){const e={};for(let n=0;n<t.length;n++){const i=t[n];for(const r in i)if(r==="class")e.class!==i.class&&(e.class=Au([e.class,i.class]));else if(r==="style")e.style=wu([e.style,i.style]);else if(po(r)){const s=e[r],o=i[r];o&&s!==o&&!(Ge(s)&&s.includes(o))&&(e[r]=s?[].concat(s,o):o)}else r!==""&&(e[r]=i[r])}return e}function En(t,e,n,i=null){zn(t,e,7,[n,i])}const N0=qp();let O0=0;function F0(t,e,n){const i=t.type,r=(e?e.appContext:t.appContext)||N0,s={uid:O0++,vnode:t,type:i,parent:e,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Qv(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(r.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:em(i,r),emitsOptions:lm(i,r),emit:null,emitted:null,propsDefaults:vt,inheritAttrs:i.inheritAttrs,ctx:vt,data:vt,props:vt,attrs:vt,slots:vt,refs:vt,setupState:vt,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=e?e.root:s,s.emit=E0.bind(null,s),t.ce&&t.ce(s),s}let Ht=null;const Zi=()=>Ht||On;let Pa,mc;{const t=ka(),e=(n,i)=>{let r;return(r=t[n])||(r=t[n]=[]),r.push(i),s=>{r.length>1?r.forEach(o=>o(s)):r[0](s)}};Pa=e("__VUE_INSTANCE_SETTERS__",n=>Ht=n),mc=e("__VUE_SSR_SETTERS__",n=>_s=n)}const So=t=>{const e=Ht;return Pa(t),t.scope.on(),()=>{t.scope.off(),Pa(e)}},Zf=()=>{Ht&&Ht.scope.off(),Pa(null)};function mm(t){return t.vnode.shapeFlag&4}let _s=!1;function B0(t,e=!1,n=!1){e&&mc(e);const{props:i,children:r}=t.vnode,s=mm(t);u0(t,i,s,e),p0(t,r,n||e);const o=s?k0(t,e):void 0;return e&&mc(!1),o}function k0(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,n0);const{setup:i}=n;if(i){Mi();const r=t.setupContext=i.length>1?z0(t):null,s=So(t),o=vo(i,t,0,[t.props,r]),a=lp(o);if(Ei(),s(),(a||t.sp)&&!fs(t)&&Nu(t),a){if(o.then(Zf,Zf),e)return o.then(l=>{Jf(t,l)}).catch(l=>{_o(l,t,0)});t.asyncDep=o}else Jf(t,o)}else gm(t)}function Jf(t,e,n){Ve(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:Mt(e)&&(t.setupState=Pp(e)),gm(t)}function gm(t,e,n){const i=t.type;t.render||(t.render=i.render||Qn);{const r=So(t);Mi();try{i0(t)}finally{Ei(),r()}}}const H0={get(t,e){return $t(t,"get",""),t[e]}};function z0(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,H0),slots:t.slots,emit:t.emit,expose:e}}function zu(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(Pp(y_(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in qs)return qs[n](t)},has(e,n){return n in e||n in qs}})):t.proxy}function V0(t,e=!0){return Ve(t)?t.displayName||t.name:t.name||e&&t.__name}function G0(t){return Ve(t)&&"__vccOpts"in t}const te=(t,e)=>R_(t,e,_s);function S(t,e,n){const i=(s,o,a)=>{Ca(-1);try{return jt(s,o,a)}finally{Ca(1)}},r=arguments.length;return r===2?Mt(e)&&!Ge(e)?Ra(e)?i(t,null,[e]):i(t,e):i(t,null,e):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&Ra(n)&&(n=[n]),i(t,e,n))}const W0="3.5.21";/**
* @vue/runtime-dom v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let gc;const Qf=typeof window<"u"&&window.trustedTypes;if(Qf)try{gc=Qf.createPolicy("vue",{createHTML:t=>t})}catch{}const vm=gc?t=>gc.createHTML(t):t=>t,X0="http://www.w3.org/2000/svg",$0="http://www.w3.org/1998/Math/MathML",mi=typeof document<"u"?document:null,eh=mi&&mi.createElement("template"),j0={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,i)=>{const r=e==="svg"?mi.createElementNS(X0,t):e==="mathml"?mi.createElementNS($0,t):n?mi.createElement(t,{is:n}):mi.createElement(t);return t==="select"&&i&&i.multiple!=null&&r.setAttribute("multiple",i.multiple),r},createText:t=>mi.createTextNode(t),createComment:t=>mi.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>mi.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,i,r,s){const o=n?n.previousSibling:e.lastChild;if(r&&(r===s||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),n),!(r===s||!(r=r.nextSibling)););else{eh.innerHTML=vm(i==="svg"?`<svg>${t}</svg>`:i==="mathml"?`<math>${t}</math>`:t);const a=eh.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}e.insertBefore(a,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},Pi="transition",Ns="animation",xs=Symbol("_vtc"),_m={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},xm=Nt({},Bp,_m),q0=t=>(t.displayName="Transition",t.props=xm,t),Ss=q0((t,{slots:e})=>S(B_,Sm(t),e)),ir=(t,e=[])=>{Ge(t)?t.forEach(n=>n(...e)):t&&t(...e)},th=t=>t?Ge(t)?t.some(e=>e.length>1):t.length>1:!1;function Sm(t){const e={};for(const I in t)I in _m||(e[I]=t[I]);if(t.css===!1)return e;const{name:n="v",type:i,duration:r,enterFromClass:s=`${n}-enter-from`,enterActiveClass:o=`${n}-enter-active`,enterToClass:a=`${n}-enter-to`,appearFromClass:l=s,appearActiveClass:c=o,appearToClass:u=a,leaveFromClass:f=`${n}-leave-from`,leaveActiveClass:h=`${n}-leave-active`,leaveToClass:d=`${n}-leave-to`}=t,g=Y0(r),_=g&&g[0],m=g&&g[1],{onBeforeEnter:p,onEnter:E,onEnterCancelled:x,onLeave:y,onLeaveCancelled:C,onBeforeAppear:R=p,onAppear:P=E,onAppearCancelled:U=x}=e,b=(I,V,z,j)=>{I._enterCancelled=j,Fi(I,V?u:a),Fi(I,V?c:o),z&&z()},T=(I,V)=>{I._isLeaving=!1,Fi(I,f),Fi(I,d),Fi(I,h),V&&V()},L=I=>(V,z)=>{const j=I?P:E,B=()=>b(V,I,z);ir(j,[V,B]),nh(()=>{Fi(V,I?l:s),$n(V,I?u:a),th(j)||ih(V,i,_,B)})};return Nt(e,{onBeforeEnter(I){ir(p,[I]),$n(I,s),$n(I,o)},onBeforeAppear(I){ir(R,[I]),$n(I,l),$n(I,c)},onEnter:L(!1),onAppear:L(!0),onLeave(I,V){I._isLeaving=!0;const z=()=>T(I,V);$n(I,f),I._enterCancelled?($n(I,h),vc()):(vc(),$n(I,h)),nh(()=>{I._isLeaving&&(Fi(I,f),$n(I,d),th(y)||ih(I,i,m,z))}),ir(y,[I,z])},onEnterCancelled(I){b(I,!1,void 0,!0),ir(x,[I])},onAppearCancelled(I){b(I,!0,void 0,!0),ir(U,[I])},onLeaveCancelled(I){T(I),ir(C,[I])}})}function Y0(t){if(t==null)return null;if(Mt(t))return[hl(t.enter),hl(t.leave)];{const e=hl(t);return[e,e]}}function hl(t){return $v(t)}function $n(t,e){e.split(/\s+/).forEach(n=>n&&t.classList.add(n)),(t[xs]||(t[xs]=new Set)).add(e)}function Fi(t,e){e.split(/\s+/).forEach(i=>i&&t.classList.remove(i));const n=t[xs];n&&(n.delete(e),n.size||(t[xs]=void 0))}function nh(t){requestAnimationFrame(()=>{requestAnimationFrame(t)})}let K0=0;function ih(t,e,n,i){const r=t._endId=++K0,s=()=>{r===t._endId&&i()};if(n!=null)return setTimeout(s,n);const{type:o,timeout:a,propCount:l}=ym(t,e);if(!o)return i();const c=o+"end";let u=0;const f=()=>{t.removeEventListener(c,h),s()},h=d=>{d.target===t&&++u>=l&&f()};setTimeout(()=>{u<l&&f()},a+1),t.addEventListener(c,h)}function ym(t,e){const n=window.getComputedStyle(t),i=g=>(n[g]||"").split(", "),r=i(`${Pi}Delay`),s=i(`${Pi}Duration`),o=rh(r,s),a=i(`${Ns}Delay`),l=i(`${Ns}Duration`),c=rh(a,l);let u=null,f=0,h=0;e===Pi?o>0&&(u=Pi,f=o,h=s.length):e===Ns?c>0&&(u=Ns,f=c,h=l.length):(f=Math.max(o,c),u=f>0?o>c?Pi:Ns:null,h=u?u===Pi?s.length:l.length:0);const d=u===Pi&&/\b(?:transform|all)(?:,|$)/.test(i(`${Pi}Property`).toString());return{type:u,timeout:f,propCount:h,hasTransform:d}}function rh(t,e){for(;t.length<e.length;)t=t.concat(t);return Math.max(...e.map((n,i)=>sh(n)+sh(t[i])))}function sh(t){return t==="auto"?0:Number(t.slice(0,-1).replace(",","."))*1e3}function vc(){return document.body.offsetHeight}function Z0(t,e,n){const i=t[xs];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const oh=Symbol("_vod"),J0=Symbol("_vsh"),Q0=Symbol(""),ex=/(?:^|;)\s*display\s*:/;function tx(t,e,n){const i=t.style,r=Ot(n);let s=!1;if(n&&!r){if(e)if(Ot(e))for(const o of e.split(";")){const a=o.slice(0,o.indexOf(":")).trim();n[a]==null&&da(i,a,"")}else for(const o in e)n[o]==null&&da(i,o,"");for(const o in n)o==="display"&&(s=!0),da(i,o,n[o])}else if(r){if(e!==n){const o=i[Q0];o&&(n+=";"+o),i.cssText=n,s=ex.test(n)}}else e&&t.removeAttribute("style");oh in t&&(t[oh]=s?i.display:"",t[J0]&&(i.display="none"))}const ah=/\s*!important$/;function da(t,e,n){if(Ge(n))n.forEach(i=>da(t,e,i));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const i=nx(t,e);ah.test(n)?t.setProperty(Rr(i),n.replace(ah,""),"important"):t[i]=n}}const lh=["Webkit","Moz","ms"],dl={};function nx(t,e){const n=dl[e];if(n)return n;let i=hn(e);if(i!=="filter"&&i in t)return dl[e]=i;i=mo(i);for(let r=0;r<lh.length;r++){const s=lh[r]+i;if(s in t)return dl[e]=s}return e}const ch="http://www.w3.org/1999/xlink";function uh(t,e,n,i,r,s=Jv(e)){i&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(ch,e.slice(6,e.length)):t.setAttributeNS(ch,e,n):n==null||s&&!up(n)?t.removeAttribute(e):t.setAttribute(e,s?"":Cs(n)?String(n):n)}function fh(t,e,n,i,r){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?vm(n):n);return}const s=t.tagName;if(e==="value"&&s!=="PROGRESS"&&!s.includes("-")){const a=s==="OPTION"?t.getAttribute("value")||"":t.value,l=n==null?t.type==="checkbox"?"on":"":String(n);(a!==l||!("_value"in t))&&(t.value=l),n==null&&t.removeAttribute(e),t._value=n;return}let o=!1;if(n===""||n==null){const a=typeof t[e];a==="boolean"?n=up(n):n==null&&a==="string"?(n="",o=!0):a==="number"&&(n=0,o=!0)}try{t[e]=n}catch{}o&&t.removeAttribute(r||e)}function ix(t,e,n,i){t.addEventListener(e,n,i)}function rx(t,e,n,i){t.removeEventListener(e,n,i)}const hh=Symbol("_vei");function sx(t,e,n,i,r=null){const s=t[hh]||(t[hh]={}),o=s[e];if(i&&o)o.value=i;else{const[a,l]=ox(e);if(i){const c=s[e]=cx(i,r);ix(t,a,c,l)}else o&&(rx(t,a,o,l),s[e]=void 0)}}const dh=/(?:Once|Passive|Capture)$/;function ox(t){let e;if(dh.test(t)){e={};let i;for(;i=t.match(dh);)t=t.slice(0,t.length-i[0].length),e[i[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):Rr(t.slice(2)),e]}let pl=0;const ax=Promise.resolve(),lx=()=>pl||(ax.then(()=>pl=0),pl=Date.now());function cx(t,e){const n=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=n.attached)return;zn(ux(i,n.value),e,5,[i])};return n.value=t,n.attached=lx(),n}function ux(t,e){if(Ge(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(i=>r=>!r._stopped&&i&&i(r))}else return e}const ph=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,fx=(t,e,n,i,r,s)=>{const o=r==="svg";e==="class"?Z0(t,i,o):e==="style"?tx(t,n,i):po(e)?Eu(e)||sx(t,e,n,i,s):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):hx(t,e,i,o))?(fh(t,e,i),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&uh(t,e,i,o,s,e!=="value")):t._isVueCE&&(/[A-Z]/.test(e)||!Ot(i))?fh(t,hn(e),i,s,e):(e==="true-value"?t._trueValue=i:e==="false-value"&&(t._falseValue=i),uh(t,e,i,o))};function hx(t,e,n,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in t&&ph(e)&&Ve(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const r=t.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return ph(e)&&Ot(n)?!1:e in t}const Mm=new WeakMap,Em=new WeakMap,La=Symbol("_moveCb"),mh=Symbol("_enterCb"),dx=t=>(delete t.props.mode,t),px=dx({name:"TransitionGroup",props:Nt({},xm,{tag:String,moveClass:String}),setup(t,{slots:e}){const n=Zi(),i=Fp();let r,s;return Wp(()=>{if(!r.length)return;const o=t.moveClass||`${t.name||"v"}-move`;if(!xx(r[0].el,n.vnode.el,o)){r=[];return}r.forEach(gx),r.forEach(vx);const a=r.filter(_x);vc(),a.forEach(l=>{const c=l.el,u=c.style;$n(c,o),u.transform=u.webkitTransform=u.transitionDuration="";const f=c[La]=h=>{h&&h.target!==c||(!h||h.propertyName.endsWith("transform"))&&(c.removeEventListener("transitionend",f),c[La]=null,Fi(c,o))};c.addEventListener("transitionend",f)}),r=[]}),()=>{const o=et(t),a=Sm(o);let l=o.tag||cn;if(r=[],s)for(let c=0;c<s.length;c++){const u=s[c];u.el&&u.el instanceof Element&&(r.push(u),Tr(u,io(u,a,i,n)),Mm.set(u,u.el.getBoundingClientRect()))}s=e.default?Uu(e.default()):[];for(let c=0;c<s.length;c++){const u=s[c];u.key!=null&&Tr(u,io(u,a,i,n))}return jt(l,null,s)}}}),mx=px;function gx(t){const e=t.el;e[La]&&e[La](),e[mh]&&e[mh]()}function vx(t){Em.set(t,t.el.getBoundingClientRect())}function _x(t){const e=Mm.get(t),n=Em.get(t),i=e.left-n.left,r=e.top-n.top;if(i||r){const s=t.el.style;return s.transform=s.webkitTransform=`translate(${i}px,${r}px)`,s.transitionDuration="0s",t}}function xx(t,e,n){const i=t.cloneNode(),r=t[xs];r&&r.forEach(a=>{a.split(/\s+/).forEach(l=>l&&i.classList.remove(l))}),n.split(/\s+/).forEach(a=>a&&i.classList.add(a)),i.style.display="none";const s=e.nodeType===1?e:e.parentNode;s.appendChild(i);const{hasTransform:o}=ym(i);return s.removeChild(i),o}const Sx=Nt({patchProp:fx},j0);let ml,gh=!1;function yx(){return ml=gh?ml:g0(Sx),gh=!0,ml}const Mx=((...t)=>{const e=yx().createApp(...t),{mount:n}=e;return e.mount=i=>{const r=bx(i);if(r)return n(r,!0,Ex(r))},e});function Ex(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function bx(t){return Ot(t)?document.querySelector(t):t}var yo=t=>/^[a-z][a-z0-9+.-]*:/.test(t)||t.startsWith("//"),Tx=/.md((\?|#).*)?$/,Vu=(t,e="/")=>yo(t)||t.startsWith("/")&&!t.startsWith(e)&&!Tx.test(t),Mo=t=>/^(https?:)?\/\//.test(t),vh=t=>{if(!t||t.endsWith("/"))return t;let e=t.replace(/(^|\/)README.md$/i,"$1index.html");return e.endsWith(".md")?e=`${e.substring(0,e.length-3)}.html`:e.endsWith(".html")||(e=`${e}.html`),e.endsWith("/index.html")&&(e=e.substring(0,e.length-10)),e},wx="http://.",Ax=(t,e)=>{if(!t.startsWith("/")&&e){const n=e.slice(0,e.lastIndexOf("/"));return vh(new URL(`${n}/${t}`,wx).pathname)}return vh(t)},Cx=(t,e)=>{const n=Object.keys(t).sort((i,r)=>{const s=r.split("/").length-i.split("/").length;return s!==0?s:r.length-i.length});for(const i of n)if(e.startsWith(i))return i;return"/"},Rx=/(#|\?)/,bm=t=>{const[e,...n]=t.split(Rx);return{pathname:e,hashAndQueries:n.join("")}},Px=["link","meta","script","style","noscript","template"],Lx=["title","base"],Dx=([t,e,n])=>Lx.includes(t)?t:Px.includes(t)?t==="meta"&&e.name?`${t}.${e.name}`:t==="template"&&e.id?`${t}.${e.id}`:JSON.stringify([t,Object.entries(e).map(([i,r])=>typeof r=="boolean"?r?[i,""]:null:[i,r]).filter(i=>i!=null).sort(([i],[r])=>i.localeCompare(r)),n]):null,Ix=t=>{const e=new Set,n=[];return t.forEach(i=>{const r=Dx(i);r&&!e.has(r)&&(e.add(r),n.push(i))}),n},Ux=t=>t.endsWith("/")||t.endsWith(".html")?t:`${t}/`,Gu=t=>t.endsWith("/")?t.slice(0,-1):t,Tm=t=>t.startsWith("/")?t.slice(1):t,Eo=t=>Object.prototype.toString.call(t)==="[object Object]",xt=t=>typeof t=="string";const Nx="modulepreload",Ox=function(t){return"/"+t},_h={},gi=function(e,n,i){let r=Promise.resolve();if(n&&n.length>0){let l=function(c){return Promise.all(c.map(u=>Promise.resolve(u).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=o?.nonce||o?.getAttribute("nonce");r=l(n.map(c=>{if(c=Ox(c),c in _h)return;_h[c]=!0;const u=c.endsWith(".css"),f=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${f}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":Nx,u||(h.as="script"),h.crossOrigin="",h.href=c,a&&h.setAttribute("nonce",a),document.head.appendChild(h),u)return new Promise((d,g)=>{h.addEventListener("load",d),h.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${c}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return r.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return e().catch(s)})},Fx=JSON.parse("{}"),Bx=Object.fromEntries([["/",{loader:()=>gi(()=>import("./index.html-CMnbR8iw.js"),[]),meta:{title:"Home",icon:"home"}}],["/logo-demo.html",{loader:()=>gi(()=>import("./logo-demo.html-BJN1rWhO.js"),[]),meta:{title:"APM 3D Logo Demo",icon:"cube",index:!1}}],["/development-guide/",{loader:()=>gi(()=>import("./index.html-Bq_gh1P7.js"),[]),meta:{title:"Development Guide",icon:"code"}}],["/user-guide/",{loader:()=>gi(()=>import("./index.html-2xdEeijb.js"),[]),meta:{title:"User Guide",icon:"circle-info"}}],["/user-guide/getting-started/",{loader:()=>gi(()=>import("./index.html-MeXqGMlx.js"),[]),meta:{title:"Getting Started",icon:"lightbulb",order:10}}],["/user-guide/getting-started/install.html",{loader:()=>gi(()=>import("./install.html-CKEYfY9N.js"),[]),meta:{title:"Installation",order:10}}],["/404.html",{loader:()=>gi(()=>import("./404.html-BJQDb-uk.js"),[]),meta:{title:""}}]]);/*!
  * vue-router v4.5.1
  * (c) 2025 Eduardo San Martin Morote
  * @license MIT
  */const ts=typeof document<"u";function wm(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function kx(t){return t.__esModule||t[Symbol.toStringTag]==="Module"||t.default&&wm(t.default)}const ct=Object.assign;function gl(t,e){const n={};for(const i in e){const r=e[i];n[i]=Vn(r)?r.map(t):t(r)}return n}const Zs=()=>{},Vn=Array.isArray,Am=/#/g,Hx=/&/g,zx=/\//g,Vx=/=/g,Gx=/\?/g,Cm=/\+/g,Wx=/%5B/g,Xx=/%5D/g,Rm=/%5E/g,$x=/%60/g,Pm=/%7B/g,jx=/%7C/g,Lm=/%7D/g,qx=/%20/g;function Wu(t){return encodeURI(""+t).replace(jx,"|").replace(Wx,"[").replace(Xx,"]")}function Yx(t){return Wu(t).replace(Pm,"{").replace(Lm,"}").replace(Rm,"^")}function _c(t){return Wu(t).replace(Cm,"%2B").replace(qx,"+").replace(Am,"%23").replace(Hx,"%26").replace($x,"`").replace(Pm,"{").replace(Lm,"}").replace(Rm,"^")}function Kx(t){return _c(t).replace(Vx,"%3D")}function Zx(t){return Wu(t).replace(Am,"%23").replace(Gx,"%3F")}function Jx(t){return t==null?"":Zx(t).replace(zx,"%2F")}function so(t){try{return decodeURIComponent(""+t)}catch{}return""+t}const Qx=/\/$/,eS=t=>t.replace(Qx,"");function vl(t,e,n="/"){let i,r={},s="",o="";const a=e.indexOf("#");let l=e.indexOf("?");return a<l&&a>=0&&(l=-1),l>-1&&(i=e.slice(0,l),s=e.slice(l+1,a>-1?a:e.length),r=t(s)),a>-1&&(i=i||e.slice(0,a),o=e.slice(a,e.length)),i=rS(i??e,n),{fullPath:i+(s&&"?")+s+o,path:i,query:r,hash:so(o)}}function tS(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function xh(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function nS(t,e,n){const i=e.matched.length-1,r=n.matched.length-1;return i>-1&&i===r&&ys(e.matched[i],n.matched[r])&&Dm(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function ys(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function Dm(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(const n in t)if(!iS(t[n],e[n]))return!1;return!0}function iS(t,e){return Vn(t)?Sh(t,e):Vn(e)?Sh(e,t):t===e}function Sh(t,e){return Vn(e)?t.length===e.length&&t.every((n,i)=>n===e[i]):t.length===1&&t[0]===e}function rS(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),i=t.split("/"),r=i[i.length-1];(r===".."||r===".")&&i.push("");let s=n.length-1,o,a;for(o=0;o<i.length;o++)if(a=i[o],a!==".")if(a==="..")s>1&&s--;else break;return n.slice(0,s).join("/")+"/"+i.slice(o).join("/")}const di={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};var oo;(function(t){t.pop="pop",t.push="push"})(oo||(oo={}));var Js;(function(t){t.back="back",t.forward="forward",t.unknown=""})(Js||(Js={}));function sS(t){if(!t)if(ts){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),eS(t)}const oS=/^[^#]+#/;function aS(t,e){return t.replace(oS,"#")+e}function lS(t,e){const n=document.documentElement.getBoundingClientRect(),i=t.getBoundingClientRect();return{behavior:e.behavior,left:i.left-n.left-(e.left||0),top:i.top-n.top-(e.top||0)}}const $a=()=>({left:window.scrollX,top:window.scrollY});function cS(t){let e;if("el"in t){const n=t.el,i=typeof n=="string"&&n.startsWith("#"),r=typeof n=="string"?i?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!r)return;e=lS(r,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function yh(t,e){return(history.state?history.state.position-e:-1)+t}const xc=new Map;function uS(t,e){xc.set(t,e)}function fS(t){const e=xc.get(t);return xc.delete(t),e}let hS=()=>location.protocol+"//"+location.host;function Im(t,e){const{pathname:n,search:i,hash:r}=e,s=t.indexOf("#");if(s>-1){let a=r.includes(t.slice(s))?t.slice(s).length:1,l=r.slice(a);return l[0]!=="/"&&(l="/"+l),xh(l,"")}return xh(n,t)+i+r}function dS(t,e,n,i){let r=[],s=[],o=null;const a=({state:h})=>{const d=Im(t,location),g=n.value,_=e.value;let m=0;if(h){if(n.value=d,e.value=h,o&&o===g){o=null;return}m=_?h.position-_.position:0}else i(d);r.forEach(p=>{p(n.value,g,{delta:m,type:oo.pop,direction:m?m>0?Js.forward:Js.back:Js.unknown})})};function l(){o=n.value}function c(h){r.push(h);const d=()=>{const g=r.indexOf(h);g>-1&&r.splice(g,1)};return s.push(d),d}function u(){const{history:h}=window;h.state&&h.replaceState(ct({},h.state,{scroll:$a()}),"")}function f(){for(const h of s)h();s=[],window.removeEventListener("popstate",a),window.removeEventListener("beforeunload",u)}return window.addEventListener("popstate",a),window.addEventListener("beforeunload",u,{passive:!0}),{pauseListeners:l,listen:c,destroy:f}}function Mh(t,e,n,i=!1,r=!1){return{back:t,current:e,forward:n,replaced:i,position:window.history.length,scroll:r?$a():null}}function pS(t){const{history:e,location:n}=window,i={value:Im(t,n)},r={value:e.state};r.value||s(i.value,{back:null,current:i.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function s(l,c,u){const f=t.indexOf("#"),h=f>-1?(n.host&&document.querySelector("base")?t:t.slice(f))+l:hS()+t+l;try{e[u?"replaceState":"pushState"](c,"",h),r.value=c}catch(d){console.error(d),n[u?"replace":"assign"](h)}}function o(l,c){const u=ct({},e.state,Mh(r.value.back,l,r.value.forward,!0),c,{position:r.value.position});s(l,u,!0),i.value=l}function a(l,c){const u=ct({},r.value,e.state,{forward:l,scroll:$a()});s(u.current,u,!0);const f=ct({},Mh(i.value,l,null),{position:u.position+1},c);s(l,f,!1),i.value=l}return{location:i,state:r,push:a,replace:o}}function mS(t){t=sS(t);const e=pS(t),n=dS(t,e.state,e.location,e.replace);function i(s,o=!0){o||n.pauseListeners(),history.go(s)}const r=ct({location:"",base:t,go:i,createHref:aS.bind(null,t)},e,n);return Object.defineProperty(r,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(r,"state",{enumerable:!0,get:()=>e.state.value}),r}function gS(t){return typeof t=="string"||t&&typeof t=="object"}function Um(t){return typeof t=="string"||typeof t=="symbol"}const Nm=Symbol("");var Eh;(function(t){t[t.aborted=4]="aborted",t[t.cancelled=8]="cancelled",t[t.duplicated=16]="duplicated"})(Eh||(Eh={}));function Ms(t,e){return ct(new Error,{type:t,[Nm]:!0},e)}function oi(t,e){return t instanceof Error&&Nm in t&&(e==null||!!(t.type&e))}const bh="[^/]+?",vS={sensitive:!1,strict:!1,start:!0,end:!0},_S=/[.+*?^${}()[\]/\\]/g;function xS(t,e){const n=ct({},vS,e),i=[];let r=n.start?"^":"";const s=[];for(const c of t){const u=c.length?[]:[90];n.strict&&!c.length&&(r+="/");for(let f=0;f<c.length;f++){const h=c[f];let d=40+(n.sensitive?.25:0);if(h.type===0)f||(r+="/"),r+=h.value.replace(_S,"\\$&"),d+=40;else if(h.type===1){const{value:g,repeatable:_,optional:m,regexp:p}=h;s.push({name:g,repeatable:_,optional:m});const E=p||bh;if(E!==bh){d+=10;try{new RegExp(`(${E})`)}catch(y){throw new Error(`Invalid custom RegExp for param "${g}" (${E}): `+y.message)}}let x=_?`((?:${E})(?:/(?:${E}))*)`:`(${E})`;f||(x=m&&c.length<2?`(?:/${x})`:"/"+x),m&&(x+="?"),r+=x,d+=20,m&&(d+=-8),_&&(d+=-20),E===".*"&&(d+=-50)}u.push(d)}i.push(u)}if(n.strict&&n.end){const c=i.length-1;i[c][i[c].length-1]+=.7000000000000001}n.strict||(r+="/?"),n.end?r+="$":n.strict&&!r.endsWith("/")&&(r+="(?:/|$)");const o=new RegExp(r,n.sensitive?"":"i");function a(c){const u=c.match(o),f={};if(!u)return null;for(let h=1;h<u.length;h++){const d=u[h]||"",g=s[h-1];f[g.name]=d&&g.repeatable?d.split("/"):d}return f}function l(c){let u="",f=!1;for(const h of t){(!f||!u.endsWith("/"))&&(u+="/"),f=!1;for(const d of h)if(d.type===0)u+=d.value;else if(d.type===1){const{value:g,repeatable:_,optional:m}=d,p=g in c?c[g]:"";if(Vn(p)&&!_)throw new Error(`Provided param "${g}" is an array but it is not repeatable (* or + modifiers)`);const E=Vn(p)?p.join("/"):p;if(!E)if(m)h.length<2&&(u.endsWith("/")?u=u.slice(0,-1):f=!0);else throw new Error(`Missing required param "${g}"`);u+=E}}return u||"/"}return{re:o,score:i,keys:s,parse:a,stringify:l}}function SS(t,e){let n=0;for(;n<t.length&&n<e.length;){const i=e[n]-t[n];if(i)return i;n++}return t.length<e.length?t.length===1&&t[0]===80?-1:1:t.length>e.length?e.length===1&&e[0]===80?1:-1:0}function Om(t,e){let n=0;const i=t.score,r=e.score;for(;n<i.length&&n<r.length;){const s=SS(i[n],r[n]);if(s)return s;n++}if(Math.abs(r.length-i.length)===1){if(Th(i))return 1;if(Th(r))return-1}return r.length-i.length}function Th(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const yS={type:0,value:""},MS=/[a-zA-Z0-9_]/;function ES(t){if(!t)return[[]];if(t==="/")return[[yS]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(d){throw new Error(`ERR (${n})/"${c}": ${d}`)}let n=0,i=n;const r=[];let s;function o(){s&&r.push(s),s=[]}let a=0,l,c="",u="";function f(){c&&(n===0?s.push({type:0,value:c}):n===1||n===2||n===3?(s.length>1&&(l==="*"||l==="+")&&e(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),s.push({type:1,value:c,regexp:u,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):e("Invalid state to consume buffer"),c="")}function h(){c+=l}for(;a<t.length;){if(l=t[a++],l==="\\"&&n!==2){i=n,n=4;continue}switch(n){case 0:l==="/"?(c&&f(),o()):l===":"?(f(),n=1):h();break;case 4:h(),n=i;break;case 1:l==="("?n=2:MS.test(l)?h():(f(),n=0,l!=="*"&&l!=="?"&&l!=="+"&&a--);break;case 2:l===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+l:n=3:u+=l;break;case 3:f(),n=0,l!=="*"&&l!=="?"&&l!=="+"&&a--,u="";break;default:e("Unknown state");break}}return n===2&&e(`Unfinished custom RegExp for param "${c}"`),f(),o(),r}function bS(t,e,n){const i=xS(ES(t.path),n),r=ct(i,{record:t,parent:e,children:[],alias:[]});return e&&!r.record.aliasOf==!e.record.aliasOf&&e.children.push(r),r}function TS(t,e){const n=[],i=new Map;e=Rh({strict:!1,end:!0,sensitive:!1},e);function r(f){return i.get(f)}function s(f,h,d){const g=!d,_=Ah(f);_.aliasOf=d&&d.record;const m=Rh(e,f),p=[_];if("alias"in f){const y=typeof f.alias=="string"?[f.alias]:f.alias;for(const C of y)p.push(Ah(ct({},_,{components:d?d.record.components:_.components,path:C,aliasOf:d?d.record:_})))}let E,x;for(const y of p){const{path:C}=y;if(h&&C[0]!=="/"){const R=h.record.path,P=R[R.length-1]==="/"?"":"/";y.path=h.record.path+(C&&P+C)}if(E=bS(y,h,m),d?d.alias.push(E):(x=x||E,x!==E&&x.alias.push(E),g&&f.name&&!Ch(E)&&o(f.name)),Fm(E)&&l(E),_.children){const R=_.children;for(let P=0;P<R.length;P++)s(R[P],E,d&&d.children[P])}d=d||E}return x?()=>{o(x)}:Zs}function o(f){if(Um(f)){const h=i.get(f);h&&(i.delete(f),n.splice(n.indexOf(h),1),h.children.forEach(o),h.alias.forEach(o))}else{const h=n.indexOf(f);h>-1&&(n.splice(h,1),f.record.name&&i.delete(f.record.name),f.children.forEach(o),f.alias.forEach(o))}}function a(){return n}function l(f){const h=CS(f,n);n.splice(h,0,f),f.record.name&&!Ch(f)&&i.set(f.record.name,f)}function c(f,h){let d,g={},_,m;if("name"in f&&f.name){if(d=i.get(f.name),!d)throw Ms(1,{location:f});m=d.record.name,g=ct(wh(h.params,d.keys.filter(x=>!x.optional).concat(d.parent?d.parent.keys.filter(x=>x.optional):[]).map(x=>x.name)),f.params&&wh(f.params,d.keys.map(x=>x.name))),_=d.stringify(g)}else if(f.path!=null)_=f.path,d=n.find(x=>x.re.test(_)),d&&(g=d.parse(_),m=d.record.name);else{if(d=h.name?i.get(h.name):n.find(x=>x.re.test(h.path)),!d)throw Ms(1,{location:f,currentLocation:h});m=d.record.name,g=ct({},h.params,f.params),_=d.stringify(g)}const p=[];let E=d;for(;E;)p.unshift(E.record),E=E.parent;return{name:m,path:_,params:g,matched:p,meta:AS(p)}}t.forEach(f=>s(f));function u(){n.length=0,i.clear()}return{addRoute:s,resolve:c,removeRoute:o,clearRoutes:u,getRoutes:a,getRecordMatcher:r}}function wh(t,e){const n={};for(const i of e)i in t&&(n[i]=t[i]);return n}function Ah(t){const e={path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:t.aliasOf,beforeEnter:t.beforeEnter,props:wS(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function wS(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const i in t.components)e[i]=typeof n=="object"?n[i]:n;return e}function Ch(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function AS(t){return t.reduce((e,n)=>ct(e,n.meta),{})}function Rh(t,e){const n={};for(const i in t)n[i]=i in e?e[i]:t[i];return n}function CS(t,e){let n=0,i=e.length;for(;n!==i;){const s=n+i>>1;Om(t,e[s])<0?i=s:n=s+1}const r=RS(t);return r&&(i=e.lastIndexOf(r,i-1)),i}function RS(t){let e=t;for(;e=e.parent;)if(Fm(e)&&Om(t,e)===0)return e}function Fm({record:t}){return!!(t.name||t.components&&Object.keys(t.components).length||t.redirect)}function PS(t){const e={};if(t===""||t==="?")return e;const i=(t[0]==="?"?t.slice(1):t).split("&");for(let r=0;r<i.length;++r){const s=i[r].replace(Cm," "),o=s.indexOf("="),a=so(o<0?s:s.slice(0,o)),l=o<0?null:so(s.slice(o+1));if(a in e){let c=e[a];Vn(c)||(c=e[a]=[c]),c.push(l)}else e[a]=l}return e}function Ph(t){let e="";for(let n in t){const i=t[n];if(n=Kx(n),i==null){i!==void 0&&(e+=(e.length?"&":"")+n);continue}(Vn(i)?i.map(s=>s&&_c(s)):[i&&_c(i)]).forEach(s=>{s!==void 0&&(e+=(e.length?"&":"")+n,s!=null&&(e+="="+s))})}return e}function LS(t){const e={};for(const n in t){const i=t[n];i!==void 0&&(e[n]=Vn(i)?i.map(r=>r==null?null:""+r):i==null?i:""+i)}return e}const DS=Symbol(""),Lh=Symbol(""),ja=Symbol(""),Xu=Symbol(""),Sc=Symbol("");function Os(){let t=[];function e(i){return t.push(i),()=>{const r=t.indexOf(i);r>-1&&t.splice(r,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function Hi(t,e,n,i,r,s=o=>o()){const o=i&&(i.enterCallbacks[r]=i.enterCallbacks[r]||[]);return()=>new Promise((a,l)=>{const c=h=>{h===!1?l(Ms(4,{from:n,to:e})):h instanceof Error?l(h):gS(h)?l(Ms(2,{from:e,to:h})):(o&&i.enterCallbacks[r]===o&&typeof h=="function"&&o.push(h),a())},u=s(()=>t.call(i&&i.instances[r],e,n,c));let f=Promise.resolve(u);t.length<3&&(f=f.then(c)),f.catch(h=>l(h))})}function _l(t,e,n,i,r=s=>s()){const s=[];for(const o of t)for(const a in o.components){let l=o.components[a];if(!(e!=="beforeRouteEnter"&&!o.instances[a]))if(wm(l)){const u=(l.__vccOpts||l)[e];u&&s.push(Hi(u,n,i,o,a,r))}else{let c=l();s.push(()=>c.then(u=>{if(!u)throw new Error(`Couldn't resolve component "${a}" at "${o.path}"`);const f=kx(u)?u.default:u;o.mods[a]=u,o.components[a]=f;const d=(f.__vccOpts||f)[e];return d&&Hi(d,n,i,o,a,r)()}))}}return s}function Dh(t){const e=Dt(ja),n=Dt(Xu),i=te(()=>{const l=Xi(t.to);return e.resolve(l)}),r=te(()=>{const{matched:l}=i.value,{length:c}=l,u=l[c-1],f=n.matched;if(!u||!f.length)return-1;const h=f.findIndex(ys.bind(null,u));if(h>-1)return h;const d=Ih(l[c-2]);return c>1&&Ih(u)===d&&f[f.length-1].path!==d?f.findIndex(ys.bind(null,l[c-2])):h}),s=te(()=>r.value>-1&&FS(n.params,i.value.params)),o=te(()=>r.value>-1&&r.value===n.matched.length-1&&Dm(n.params,i.value.params));function a(l={}){if(OS(l)){const c=e[Xi(t.replace)?"replace":"push"](Xi(t.to)).catch(Zs);return t.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>c),c}return Promise.resolve()}return{route:i,href:te(()=>i.value.href),isActive:s,isExactActive:o,navigate:a}}function IS(t){return t.length===1?t[0]:t}const US=Ue({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:Dh,setup(t,{slots:e}){const n=Er(Dh(t)),{options:i}=Dt(ja),r=te(()=>({[Uh(t.activeClass,i.linkActiveClass,"router-link-active")]:n.isActive,[Uh(t.exactActiveClass,i.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const s=e.default&&IS(e.default(n));return t.custom?s:S("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:r.value},s)}}}),NS=US;function OS(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function FS(t,e){for(const n in e){const i=e[n],r=t[n];if(typeof i=="string"){if(i!==r)return!1}else if(!Vn(r)||r.length!==i.length||i.some((s,o)=>s!==r[o]))return!1}return!0}function Ih(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const Uh=(t,e,n)=>t??e??n,BS=Ue({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const i=Dt(Sc),r=te(()=>t.route||i.value),s=Dt(Lh,0),o=te(()=>{let c=Xi(s);const{matched:u}=r.value;let f;for(;(f=u[c])&&!f.components;)c++;return c}),a=te(()=>r.value.matched[o.value]);hs(Lh,te(()=>o.value+1)),hs(DS,a),hs(Sc,r);const l=nt();return Rt(()=>[l.value,a.value,t.name],([c,u,f],[h,d,g])=>{u&&(u.instances[f]=c,d&&d!==u&&c&&c===h&&(u.leaveGuards.size||(u.leaveGuards=d.leaveGuards),u.updateGuards.size||(u.updateGuards=d.updateGuards))),c&&u&&(!d||!ys(u,d)||!h)&&(u.enterCallbacks[f]||[]).forEach(_=>_(c))},{flush:"post"}),()=>{const c=r.value,u=t.name,f=a.value,h=f&&f.components[u];if(!h)return Nh(n.default,{Component:h,route:c});const d=f.props[u],g=d?d===!0?c.params:typeof d=="function"?d(c):d:null,m=S(h,ct({},g,e,{onVnodeUnmounted:p=>{p.component.isUnmounted&&(f.instances[u]=null)},ref:l}));return Nh(n.default,{Component:m,route:c})||m}}});function Nh(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const kS=BS;function HS(t){const e=TS(t.routes,t),n=t.parseQuery||PS,i=t.stringifyQuery||Ph,r=t.history,s=Os(),o=Os(),a=Os(),l=Je(di);let c=di;ts&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=gl.bind(null,O=>""+O),f=gl.bind(null,Jx),h=gl.bind(null,so);function d(O,ie){let ae,le;return Um(O)?(ae=e.getRecordMatcher(O),le=ie):le=O,e.addRoute(le,ae)}function g(O){const ie=e.getRecordMatcher(O);ie&&e.removeRoute(ie)}function _(){return e.getRoutes().map(O=>O.record)}function m(O){return!!e.getRecordMatcher(O)}function p(O,ie){if(ie=ct({},ie||l.value),typeof O=="string"){const D=vl(n,O,ie.path),H=e.resolve({path:D.path},ie),K=r.createHref(D.fullPath);return ct(D,H,{params:h(H.params),hash:so(D.hash),redirectedFrom:void 0,href:K})}let ae;if(O.path!=null)ae=ct({},O,{path:vl(n,O.path,ie.path).path});else{const D=ct({},O.params);for(const H in D)D[H]==null&&delete D[H];ae=ct({},O,{params:f(D)}),ie.params=f(ie.params)}const le=e.resolve(ae,ie),Re=O.hash||"";le.params=u(h(le.params));const $e=tS(i,ct({},O,{hash:Yx(Re),path:le.path})),v=r.createHref($e);return ct({fullPath:$e,hash:Re,query:i===Ph?LS(O.query):O.query||{}},le,{redirectedFrom:void 0,href:v})}function E(O){return typeof O=="string"?vl(n,O,l.value.path):ct({},O)}function x(O,ie){if(c!==O)return Ms(8,{from:ie,to:O})}function y(O){return P(O)}function C(O){return y(ct(E(O),{replace:!0}))}function R(O){const ie=O.matched[O.matched.length-1];if(ie&&ie.redirect){const{redirect:ae}=ie;let le=typeof ae=="function"?ae(O):ae;return typeof le=="string"&&(le=le.includes("?")||le.includes("#")?le=E(le):{path:le},le.params={}),ct({query:O.query,hash:O.hash,params:le.path!=null?{}:O.params},le)}}function P(O,ie){const ae=c=p(O),le=l.value,Re=O.state,$e=O.force,v=O.replace===!0,D=R(ae);if(D)return P(ct(E(D),{state:typeof D=="object"?ct({},Re,D.state):Re,force:$e,replace:v}),ie||ae);const H=ae;H.redirectedFrom=ie;let K;return!$e&&nS(i,le,ae)&&(K=Ms(16,{to:H,from:le}),Ce(le,le,!0,!1)),(K?Promise.resolve(K):T(H,le)).catch(G=>oi(G)?oi(G,2)?G:ye(G):k(G,H,le)).then(G=>{if(G){if(oi(G,2))return P(ct({replace:v},E(G.to),{state:typeof G.to=="object"?ct({},Re,G.to.state):Re,force:$e}),ie||H)}else G=I(H,le,!0,v,Re);return L(H,le,G),G})}function U(O,ie){const ae=x(O,ie);return ae?Promise.reject(ae):Promise.resolve()}function b(O){const ie=at.values().next().value;return ie&&typeof ie.runWithContext=="function"?ie.runWithContext(O):O()}function T(O,ie){let ae;const[le,Re,$e]=zS(O,ie);ae=_l(le.reverse(),"beforeRouteLeave",O,ie);for(const D of le)D.leaveGuards.forEach(H=>{ae.push(Hi(H,O,ie))});const v=U.bind(null,O,ie);return ae.push(v),re(ae).then(()=>{ae=[];for(const D of s.list())ae.push(Hi(D,O,ie));return ae.push(v),re(ae)}).then(()=>{ae=_l(Re,"beforeRouteUpdate",O,ie);for(const D of Re)D.updateGuards.forEach(H=>{ae.push(Hi(H,O,ie))});return ae.push(v),re(ae)}).then(()=>{ae=[];for(const D of $e)if(D.beforeEnter)if(Vn(D.beforeEnter))for(const H of D.beforeEnter)ae.push(Hi(H,O,ie));else ae.push(Hi(D.beforeEnter,O,ie));return ae.push(v),re(ae)}).then(()=>(O.matched.forEach(D=>D.enterCallbacks={}),ae=_l($e,"beforeRouteEnter",O,ie,b),ae.push(v),re(ae))).then(()=>{ae=[];for(const D of o.list())ae.push(Hi(D,O,ie));return ae.push(v),re(ae)}).catch(D=>oi(D,8)?D:Promise.reject(D))}function L(O,ie,ae){a.list().forEach(le=>b(()=>le(O,ie,ae)))}function I(O,ie,ae,le,Re){const $e=x(O,ie);if($e)return $e;const v=ie===di,D=ts?history.state:{};ae&&(le||v?r.replace(O.fullPath,ct({scroll:v&&D&&D.scroll},Re)):r.push(O.fullPath,Re)),l.value=O,Ce(O,ie,ae,v),ye()}let V;function z(){V||(V=r.listen((O,ie,ae)=>{if(!Qe.listening)return;const le=p(O),Re=R(le);if(Re){P(ct(Re,{replace:!0,force:!0}),le).catch(Zs);return}c=le;const $e=l.value;ts&&uS(yh($e.fullPath,ae.delta),$a()),T(le,$e).catch(v=>oi(v,12)?v:oi(v,2)?(P(ct(E(v.to),{force:!0}),le).then(D=>{oi(D,20)&&!ae.delta&&ae.type===oo.pop&&r.go(-1,!1)}).catch(Zs),Promise.reject()):(ae.delta&&r.go(-ae.delta,!1),k(v,le,$e))).then(v=>{v=v||I(le,$e,!1),v&&(ae.delta&&!oi(v,8)?r.go(-ae.delta,!1):ae.type===oo.pop&&oi(v,20)&&r.go(-1,!1)),L(le,$e,v)}).catch(Zs)}))}let j=Os(),B=Os(),ne;function k(O,ie,ae){ye(O);const le=B.list();return le.length?le.forEach(Re=>Re(O,ie,ae)):console.error(O),Promise.reject(O)}function fe(){return ne&&l.value!==di?Promise.resolve():new Promise((O,ie)=>{j.add([O,ie])})}function ye(O){return ne||(ne=!O,z(),j.list().forEach(([ie,ae])=>O?ae(O):ie()),j.reset()),O}function Ce(O,ie,ae,le){const{scrollBehavior:Re}=t;if(!ts||!Re)return Promise.resolve();const $e=!ae&&fS(yh(O.fullPath,0))||(le||!ae)&&history.state&&history.state.scroll||null;return Pr().then(()=>Re(O,ie,$e)).then(v=>v&&cS(v)).catch(v=>k(v,O,ie))}const Oe=O=>r.go(O);let tt;const at=new Set,Qe={currentRoute:l,listening:!0,addRoute:d,removeRoute:g,clearRoutes:e.clearRoutes,hasRoute:m,getRoutes:_,resolve:p,options:t,push:y,replace:C,go:Oe,back:()=>Oe(-1),forward:()=>Oe(1),beforeEach:s.add,beforeResolve:o.add,afterEach:a.add,onError:B.add,isReady:fe,install(O){const ie=this;O.component("RouterLink",NS),O.component("RouterView",kS),O.config.globalProperties.$router=ie,Object.defineProperty(O.config.globalProperties,"$route",{enumerable:!0,get:()=>Xi(l)}),ts&&!tt&&l.value===di&&(tt=!0,y(r.location).catch(Re=>{}));const ae={};for(const Re in di)Object.defineProperty(ae,Re,{get:()=>l.value[Re],enumerable:!0});O.provide(ja,ie),O.provide(Xu,Cp(ae)),O.provide(Sc,l);const le=O.unmount;at.add(O),O.unmount=function(){at.delete(O),at.size<1&&(c=di,V&&V(),V=null,l.value=di,tt=!1,ne=!1),le()}}};function re(O){return O.reduce((ie,ae)=>ie.then(()=>b(ae)),Promise.resolve())}return Qe}function zS(t,e){const n=[],i=[],r=[],s=Math.max(e.matched.length,t.matched.length);for(let o=0;o<s;o++){const a=e.matched[o];a&&(t.matched.find(c=>ys(c,a))?i.push(a):n.push(a));const l=t.matched[o];l&&(e.matched.find(c=>ys(c,l))||r.push(l))}return[n,i,r]}function bo(){return Dt(ja)}function Ai(t){return Dt(Xu)}var $u=Symbol(""),Gn=()=>{const t=Dt($u);if(!t)throw new Error("useClientData() is called without provider.");return t},VS=()=>Gn().pageComponent,GS=()=>Gn().pageData,Bm=()=>Gn().pageFrontmatter,WS=()=>Gn().pageHead,km=()=>Gn().pageLang,XS=()=>Gn().pageLayout,Hm=()=>Gn().routeLocale,$S=()=>Gn().routePath,jS=()=>Gn().siteData,qS=()=>Gn().siteLocaleData,qa=Gn,Ji=Bm,YS=km,KS=GS,ZS=qS,yc=new Set,Ci=t=>{yc.add(t),ii(()=>{yc.delete(t)})},JS=Symbol(""),Mc=Je(Fx),ds=Je(Bx),zm=(t,e)=>{const n=Ax(t,e);if(ds.value[n])return n;const i=encodeURI(n);if(ds.value[i])return i;const r=Mc.value[n]||Mc.value[i];return r||n},bi=(t,e)=>{const{pathname:n,hashAndQueries:i}=bm(t),r=zm(n,e),s=r+i;return ds.value[r]?{...ds.value[r],path:s,notFound:!1}:{...ds.value["/404.html"],path:s,notFound:!0}},QS=(t,e)=>{const{pathname:n,hashAndQueries:i}=bm(t);return zm(n,e)+i},ey=t=>{if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)&&!(t.currentTarget&&t.currentTarget.getAttribute("target")?.match(/\b_blank\b/i)))return t.preventDefault(),!0},Lr=Ue({name:"RouteLink",props:{to:{type:String,required:!0},active:Boolean,activeClass:{type:String,default:"route-link-active"}},slots:Object,setup(t,{slots:e}){const n=bo(),i=Ai(),r=te(()=>t.to.startsWith("#")||t.to.startsWith("?")?t.to:`/${QS(t.to,i.path).substring(1)}`);return()=>S("a",{class:["route-link",{[t.activeClass]:t.active}],href:r.value,onClick:(s={})=>{ey(s)&&n.push(t.to).catch()}},e.default())}}),ty=Ue({name:"AutoLink",props:{config:{type:Object,required:!0}},slots:Object,setup(t,{slots:e}){const n=Ga(t,"config"),i=Ai(),r=jS(),s=te(()=>yo(n.value.link)),o=te(()=>n.value.target||(s.value?"_blank":void 0)),a=te(()=>o.value==="_blank"),l=te(()=>!s.value&&!a.value),c=te(()=>n.value.rel||(a.value?"noopener noreferrer":null)),u=te(()=>n.value.ariaLabel??n.value.text),f=te(()=>{if(n.value.exact)return!1;const d=Object.keys(r.value.locales);return d.length?d.every(g=>g!==n.value.link):n.value.link!=="/"}),h=te(()=>l.value?n.value.activeMatch?(n.value.activeMatch instanceof RegExp?n.value.activeMatch:new RegExp(n.value.activeMatch,"u")).test(i.path):f.value?i.path.startsWith(n.value.link):i.path===n.value.link:!1);return()=>{const{before:d,after:g,default:_}=e,m=_?.(n.value)??[d?.(n.value),n.value.text,g?.(n.value)];return l.value?S(Lr,{class:"auto-link",to:n.value.link,active:h.value,"aria-label":u.value},()=>m):S("a",{class:"auto-link external-link",href:n.value.link,"aria-label":u.value,rel:c.value,target:o.value},m)}}}),ju=Ue({name:"ClientOnly",setup(t,e){const n=nt(!1);return Et(()=>{n.value=!0}),()=>n.value?e.slots.default?.():null}}),ko=t=>{yc.forEach(e=>e(t))},Vm=Ue({name:"Content",props:{path:{type:String,required:!1,default:""}},setup(t){const e=VS(),n=te(()=>{if(!t.path)return e.value;const r=bi(t.path);return Vp(async()=>r.loader().then(({comp:s})=>s))}),i=Bm();return Rt(i,()=>{ko("updated")},{deep:!0,flush:"post"}),()=>S(n.value,{onVnodeMounted:()=>{ko("mounted")},onVnodeUpdated:()=>{ko("updated")},onVnodeBeforeUnmount:()=>{ko("beforeUnmount")}})}}),ny="Layout",iy="en-US",rr=Er({resolveLayouts:t=>t.reduce((e,n)=>({...e,...n.layouts}),{}),resolvePageHead:(t,e,n)=>{const i=xt(e.description)?e.description:n.description,r=[...Array.isArray(e.head)?e.head:[],...n.head,["title",{},t],["meta",{name:"description",content:i}]];return Ix(r)},resolvePageHeadTitle:(t,e)=>[t.title,e.title].filter(n=>!!n).join(" | "),resolvePageLang:(t,e)=>t.lang||e.lang||iy,resolvePageLayout:(t,e)=>{const n=xt(t.frontmatter.layout)?t.frontmatter.layout:ny;if(!e[n])throw new Error(`[vuepress] Cannot resolve layout: ${n}`);return e[n]},resolveRouteLocale:(t,e)=>Cx(t,decodeURI(e)),resolveSiteLocaleData:({base:t,locales:e,...n},i)=>({...n,...e[i],head:[...e[i]?.head??[],...n.head]})}),Wn=(t={})=>t,zt=t=>Mo(t)?t:`/${Tm(t)}`,ry=Object.defineProperty,sy=(t,e)=>{for(var n in e)ry(t,n,{get:e[n],enumerable:!0})},oy={};sy(oy,{COMPONENT_STATE_TYPE:()=>ay,INSPECTOR_ID:()=>ly,INSPECTOR_LABEL:()=>cy,INSPECTOR_NODES:()=>uy,INSPECTOR_STATE_SECTION_NAME:()=>fy,PLUGIN_ID:()=>Gm,PLUGIN_LABEL:()=>qu});var Gm="org.vuejs.vuepress",qu="VuePress",ay=qu,ly=Gm,cy=qu,Oh={id:"INTERNAL",label:"Internal",keys:["layouts","routes","redirects"]},Fh={id:"SITE",label:"Site",keys:["siteData","siteLocaleData"]},Bh={id:"ROUTE",label:"Route",keys:["routePath","routeLocale"]},kh={id:"PAGE",label:"Page",keys:["pageData","pageFrontmatter","pageLang","pageHead","pageHeadTitle","pageLayout","pageComponent"]},uy={[Oh.id]:Oh,[Fh.id]:Fh,[Bh.id]:Bh,[kh.id]:kh},fy="State";const Yu=(t,{slots:e})=>e.default(),hy=t=>[/\((ipad);[-\w),; ]+apple/i,/applecoremedia\/[\w.]+ \((ipad)/i,/\b(ipad)\d\d?,\d\d?[;\]].+ios/i].some(e=>e.test(t)),dy=t=>[/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,/cfnetwork\/.+darwin/i].some(e=>e.test(t)),py=t=>[/(mac os x) ?([\w. ]*)/i,/(macintosh|mac_powerpc\b)(?!.+haiku)/i].some(e=>e.test(t)),Wm=[...new Array(6)].map((t,e)=>`[vp-content] h${e+1}`).join(","),my=(t,e=2)=>{if(e===!1)return[];const[n,i]=typeof e=="number"?[e,e]:e==="deep"?[2,6]:e,r=t.filter(o=>o.level>=n&&o.level<=i),s=[];e:for(let o=0;o<r.length;o++){const a=r[o];if(o===0)s.push(a);else{for(let l=o-1;l>=0;l--){const c=r[l];if(c.level<a.level){c.children.push(a);continue e}}s.push(a)}}return s},gy=(t,e=[])=>{let n;if(e.length){const i=t.cloneNode(!0);i.querySelectorAll(e.join(",")).forEach(r=>{r.remove()}),n=i.textContent||""}else n=t.textContent||"";return n.trim()},vy=(t=Wm,e=[])=>Array.from(document.querySelectorAll(t)).filter(n=>n.id&&n.hasChildNodes()).map(n=>({element:n,title:gy(n,e),link:`#${n.id}`,slug:n.id,level:Number(n.tagName[1]),children:[]})),_y=({selector:t=Wm,levels:e=2,ignore:n=[]}={})=>my(vy(t,n),e),xy=t=>t instanceof Element?document.activeElement===t&&(["TEXTAREA","SELECT","INPUT"].includes(t.tagName)||t.hasAttribute("contenteditable")):!1,Xm=t=>typeof t<"u",Sy=t=>typeof t=="number",{isArray:Ti}=Array,Ku=(t,e)=>xt(t)&&t.startsWith(e),{keys:$m}=Object,{values:yy}=Object,My=t=>{if(t){if(typeof t=="number")return new Date(t);const e=Date.parse(t.toString());if(!Number.isNaN(e))return new Date(e)}return null},Zu=t=>Ku(t,"/")&&t[1]!=="/",jm=t=>t.every(e=>e.type===nn?!0:e.type===cn?e.children==null||Ti(e.children)&&jm(e.children):!1),ps=t=>t==null?!0:Ti(t)?jm(t):!1,Ey=(t,e)=>e.some(n=>{if(xt(n))return n===t.key;const{key:i,ctrl:r=!1,shift:s=!1,alt:o=!1}=n;return i===t.key&&r===t.ctrlKey&&s===t.shiftKey&&o===t.altKey}),Cn=(t,e)=>{const n=Zi()?.appContext.components;return n?t in n||hn(t)in n||mo(hn(t))in n:!1},by=(t={})=>{const e=nt([]);return Ci(n=>{e.value=n==="beforeUnmount"?[]:_y(Ye(t))}),e},Ty=t=>{const e=Hm();return te(()=>Ye(t)[e.value]??{})},Ri=Ty;function Dr(t){return fp()?(e_(t),!0):!1}const xl=new WeakMap,wy=(...t)=>{var e;const n=t[0],i=(e=Zi())==null?void 0:e.proxy;if(i==null&&!Yp())throw new Error("injectLocal must be called in setup");return i&&xl.has(i)&&n in xl.get(i)?xl.get(i)[n]:Dt(...t)},To=typeof window<"u"&&typeof document<"u";typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;const Ay=t=>t!=null,Cy=Object.prototype.toString,Ry=t=>Cy.call(t)==="[object Object]",tn=()=>{},Ec=Py();function Py(){var t,e;return To&&((t=window?.navigator)==null?void 0:t.userAgent)&&(/iP(?:ad|hone|od)/.test(window.navigator.userAgent)||((e=window?.navigator)==null?void 0:e.maxTouchPoints)>2&&/iPad|Macintosh/.test(window?.navigator.userAgent))}function qm(...t){if(t.length!==1)return Ga(...t);const e=t[0];return typeof e=="function"?go(Lp(()=>({get:e,set:tn}))):nt(e)}function Ju(t,e){function n(...i){return new Promise((r,s)=>{Promise.resolve(t(()=>e.apply(this,i),{fn:e,thisArg:this,args:i})).then(r).catch(s)})}return n}const Ym=t=>t();function Ly(t,e={}){let n,i,r=tn;const s=l=>{clearTimeout(l),r(),r=tn};let o;return l=>{const c=Ye(t),u=Ye(e.maxWait);return n&&s(n),c<=0||u!==void 0&&u<=0?(i&&(s(i),i=void 0),Promise.resolve(l())):new Promise((f,h)=>{r=e.rejectOnCancel?h:f,o=l,u&&!i&&(i=setTimeout(()=>{n&&s(n),i=void 0,f(o())},u)),n=setTimeout(()=>{i&&s(i),i=void 0,f(l())},c)})}}function Dy(...t){let e=0,n,i=!0,r=tn,s,o,a,l,c;!Lt(t[0])&&typeof t[0]=="object"?{delay:o,trailing:a=!0,leading:l=!0,rejectOnCancel:c=!1}=t[0]:[o,a=!0,l=!0,c=!1]=t;const u=()=>{n&&(clearTimeout(n),n=void 0,r(),r=tn)};return h=>{const d=Ye(o),g=Date.now()-e,_=()=>s=h();return u(),d<=0?(e=Date.now(),_()):(g>d&&(l||!i)?(e=Date.now(),_()):a&&(s=new Promise((m,p)=>{r=c?p:m,n=setTimeout(()=>{e=Date.now(),i=!0,m(_()),u()},Math.max(0,d-g))})),!l&&!n&&(n=setTimeout(()=>i=!0,d)),i=!1,s)}}function Iy(t=Ym,e={}){const{initialState:n="active"}=e,i=qm(n==="active");function r(){i.value=!1}function s(){i.value=!0}const o=(...a)=>{i.value&&t(...a)};return{isActive:go(i),pause:r,resume:s,eventFilter:o}}function Uy(t){let e;function n(){return e||(e=t()),e}return n.reset=async()=>{const i=e;e=void 0,i&&await i},n}function Hh(t){return t.endsWith("rem")?Number.parseFloat(t)*16:Number.parseFloat(t)}function Qs(t){return Array.isArray(t)?t:[t]}function Km(t){return Zi()}function Qu(t,e=200,n={}){return Ju(Ly(e,n),t)}function Zm(t,e=200,n=!1,i=!0,r=!1){return Ju(Dy(e,n,i,r),t)}function Ny(t,e,n={}){const{eventFilter:i=Ym,...r}=n;return Rt(t,Ju(i,e),r)}function Oy(t,e,n={}){const{eventFilter:i,initialState:r="active",...s}=n,{eventFilter:o,pause:a,resume:l,isActive:c}=Iy(i,{initialState:r});return{stop:Ny(t,e,{...s,eventFilter:o}),pause:a,resume:l,isActive:c}}function Rs(t,e=!0,n){Km()?Et(t,n):e?t():Pr(t)}function Fy(t,e){Km()&&ii(t,e)}function By(t,e,n={}){const{immediate:i=!0,immediateCallback:r=!1}=n,s=Je(!1);let o;function a(){o&&(clearTimeout(o),o=void 0)}function l(){s.value=!1,a()}function c(...u){r&&t(),a(),s.value=!0,o=setTimeout(()=>{s.value=!1,o=void 0,t(...u)},Ye(e))}return i&&(s.value=!0,To&&c()),Dr(l),{isPending:S_(s),start:c,stop:l}}function Da(t=!1,e={}){const{truthyValue:n=!0,falsyValue:i=!1}=e,r=Lt(t),s=Je(t);function o(a){if(arguments.length)return s.value=a,s.value;{const l=Ye(n);return s.value=s.value===l?Ye(i):l,s.value}}return r?o:[s,o]}function Rn(t,e,n){return Rt(t,e,{...n,immediate:!0})}const sn=To?window:void 0,Jm=To?window.document:void 0,Qm=To?window.navigator:void 0;function Vt(t){var e;const n=Ye(t);return(e=n?.$el)!=null?e:n}function it(...t){const e=[],n=()=>{e.forEach(a=>a()),e.length=0},i=(a,l,c,u)=>(a.addEventListener(l,c,u),()=>a.removeEventListener(l,c,u)),r=te(()=>{const a=Qs(Ye(t[0])).filter(l=>l!=null);return a.every(l=>typeof l!="string")?a:void 0}),s=Rn(()=>{var a,l;return[(l=(a=r.value)==null?void 0:a.map(c=>Vt(c)))!=null?l:[sn].filter(c=>c!=null),Qs(Ye(r.value?t[1]:t[0])),Qs(Xi(r.value?t[2]:t[1])),Ye(r.value?t[3]:t[2])]},([a,l,c,u])=>{if(n(),!a?.length||!l?.length||!c?.length)return;const f=Ry(u)?{...u}:u;e.push(...a.flatMap(h=>l.flatMap(d=>c.map(g=>i(h,d,g,f)))))},{flush:"post"}),o=()=>{s(),n()};return Dr(n),o}let zh=!1;function ky(t,e,n={}){const{window:i=sn,ignore:r=[],capture:s=!0,detectIframe:o=!1,controls:a=!1}=n;if(!i)return a?{stop:tn,cancel:tn,trigger:tn}:tn;if(Ec&&!zh){zh=!0;const m={passive:!0};Array.from(i.document.body.children).forEach(p=>p.addEventListener("click",tn,m)),i.document.documentElement.addEventListener("click",tn,m)}let l=!0;const c=m=>Ye(r).some(p=>{if(typeof p=="string")return Array.from(i.document.querySelectorAll(p)).some(E=>E===m.target||m.composedPath().includes(E));{const E=Vt(p);return E&&(m.target===E||m.composedPath().includes(E))}});function u(m){const p=Ye(m);return p&&p.$.subTree.shapeFlag===16}function f(m,p){const E=Ye(m),x=E.$.subTree&&E.$.subTree.children;return x==null||!Array.isArray(x)?!1:x.some(y=>y.el===p.target||p.composedPath().includes(y.el))}const h=m=>{const p=Vt(t);if(m.target!=null&&!(!(p instanceof Element)&&u(t)&&f(t,m))&&!(!p||p===m.target||m.composedPath().includes(p))){if("detail"in m&&m.detail===0&&(l=!c(m)),!l){l=!0;return}e(m)}};let d=!1;const g=[it(i,"click",m=>{d||(d=!0,setTimeout(()=>{d=!1},0),h(m))},{passive:!0,capture:s}),it(i,"pointerdown",m=>{const p=Vt(t);l=!c(m)&&!!(p&&!m.composedPath().includes(p))},{passive:!0}),o&&it(i,"blur",m=>{setTimeout(()=>{var p;const E=Vt(t);((p=i.document.activeElement)==null?void 0:p.tagName)==="IFRAME"&&!E?.contains(i.document.activeElement)&&e(m)},0)},{passive:!0})].filter(Boolean),_=()=>g.forEach(m=>m());return a?{stop:_,cancel:()=>{l=!1},trigger:m=>{l=!0,h(m),l=!1}}:_}function Hy(){const t=Je(!1),e=Zi();return e&&Et(()=>{t.value=!0},e),t}function Ir(t){const e=Hy();return te(()=>(e.value,!!t()))}function eg(t,e,n={}){const{window:i=sn,...r}=n;let s;const o=Ir(()=>i&&"MutationObserver"in i),a=()=>{s&&(s.disconnect(),s=void 0)},l=te(()=>{const h=Ye(t),d=Qs(h).map(Vt).filter(Ay);return new Set(d)}),c=Rt(l,h=>{a(),o.value&&h.size&&(s=new MutationObserver(e),h.forEach(d=>s.observe(d,r)))},{immediate:!0,flush:"post"}),u=()=>s?.takeRecords(),f=()=>{c(),a()};return Dr(f),{isSupported:o,stop:f,takeRecords:u}}function zy(t,e,n={}){const{window:i=sn,document:r=i?.document,flush:s="sync"}=n;if(!i||!r)return tn;let o;const a=u=>{o?.(),o=u},l=Bu(()=>{const u=Vt(t);if(u){const{stop:f}=eg(r,h=>{h.map(g=>[...g.removedNodes]).flat().some(g=>g===u||g.contains(u))&&e(h)},{window:i,childList:!0,subtree:!0});a(f)}},{flush:s}),c=()=>{l(),a()};return Dr(c),c}const Vy=Symbol("vueuse-ssr-width");function Gy(){const t=Yp()?wy(Vy,null):null;return typeof t=="number"?t:void 0}function ef(t,e={}){const{window:n=sn,ssrWidth:i=Gy()}=e,r=Ir(()=>n&&"matchMedia"in n&&typeof n.matchMedia=="function"),s=Je(typeof i=="number"),o=Je(),a=Je(!1),l=c=>{a.value=c.matches};return Bu(()=>{if(s.value){s.value=!r.value;const c=Ye(t).split(",");a.value=c.some(u=>{const f=u.includes("not all"),h=u.match(/\(\s*min-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/),d=u.match(/\(\s*max-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);let g=!!(h||d);return h&&g&&(g=i>=Hh(h[1])),d&&g&&(g=i<=Hh(d[1])),f?!g:g});return}r.value&&(o.value=n.matchMedia(Ye(t)),a.value=o.value.matches)}),it(o,"change",l,{passive:!0}),te(()=>a.value)}function Vh(t,e={}){const{controls:n=!1,navigator:i=Qm}=e,r=Ir(()=>i&&"permissions"in i),s=Je(),o=typeof t=="string"?{name:t}:t,a=Je(),l=()=>{var u,f;a.value=(f=(u=s.value)==null?void 0:u.state)!=null?f:"prompt"};it(s,"change",l,{passive:!0});const c=Uy(async()=>{if(r.value){if(!s.value)try{s.value=await i.permissions.query(o)}catch{s.value=void 0}finally{l()}if(n)return et(s.value)}});return c(),n?{state:a,isSupported:r,query:c}:a}function Wy(t={}){const{navigator:e=Qm,read:n=!1,source:i,copiedDuring:r=1500,legacy:s=!1}=t,o=Ir(()=>e&&"clipboard"in e),a=Vh("clipboard-read"),l=Vh("clipboard-write"),c=te(()=>o.value||s),u=Je(""),f=Je(!1),h=By(()=>f.value=!1,r,{immediate:!1});async function d(){let E=!(o.value&&p(a.value));if(!E)try{u.value=await e.clipboard.readText()}catch{E=!0}E&&(u.value=m())}c.value&&n&&it(["copy","cut"],d,{passive:!0});async function g(E=Ye(i)){if(c.value&&E!=null){let x=!(o.value&&p(l.value));if(!x)try{await e.clipboard.writeText(E)}catch{x=!0}x&&_(E),u.value=E,f.value=!0,h.start()}}function _(E){const x=document.createElement("textarea");x.value=E??"",x.style.position="absolute",x.style.opacity="0",document.body.appendChild(x),x.select(),document.execCommand("copy"),x.remove()}function m(){var E,x,y;return(y=(x=(E=document?.getSelection)==null?void 0:E.call(document))==null?void 0:x.toString())!=null?y:""}function p(E){return E==="granted"||E==="prompt"}return{isSupported:c,text:u,copied:f,copy:g}}const Ho=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},zo="__vueuse_ssr_handlers__",Xy=$y();function $y(){return zo in Ho||(Ho[zo]=Ho[zo]||{}),Ho[zo]}function jy(t,e){return Xy[t]||e}function qy(t){return ef("(prefers-color-scheme: dark)",t)}function Yy(t){return t==null?"any":t instanceof Set?"set":t instanceof Map?"map":t instanceof Date?"date":typeof t=="boolean"?"boolean":typeof t=="string"?"string":typeof t=="object"?"object":Number.isNaN(t)?"any":"number"}const Ky={boolean:{read:t=>t==="true",write:t=>String(t)},object:{read:t=>JSON.parse(t),write:t=>JSON.stringify(t)},number:{read:t=>Number.parseFloat(t),write:t=>String(t)},any:{read:t=>t,write:t=>String(t)},string:{read:t=>t,write:t=>String(t)},map:{read:t=>new Map(JSON.parse(t)),write:t=>JSON.stringify(Array.from(t.entries()))},set:{read:t=>new Set(JSON.parse(t)),write:t=>JSON.stringify(Array.from(t))},date:{read:t=>new Date(t),write:t=>t.toISOString()}},Gh="vueuse-storage";function tf(t,e,n,i={}){var r;const{flush:s="pre",deep:o=!0,listenToStorageChanges:a=!0,writeDefaults:l=!0,mergeDefaults:c=!1,shallow:u,window:f=sn,eventFilter:h,onError:d=z=>{console.error(z)},initOnMounted:g}=i,_=(u?Je:nt)(typeof e=="function"?e():e),m=te(()=>Ye(t));if(!n)try{n=jy("getDefaultStorage",()=>{var z;return(z=sn)==null?void 0:z.localStorage})()}catch(z){d(z)}if(!n)return _;const p=Ye(e),E=Yy(p),x=(r=i.serializer)!=null?r:Ky[E],{pause:y,resume:C}=Oy(_,z=>T(z),{flush:s,deep:o,eventFilter:h});Rt(m,()=>I(),{flush:s});let R=!1;const P=z=>{g&&!R||I(z)},U=z=>{g&&!R||V(z)};f&&a&&(n instanceof Storage?it(f,"storage",P,{passive:!0}):it(f,Gh,U)),g?Rs(()=>{R=!0,I()}):I();function b(z,j){if(f){const B={key:m.value,oldValue:z,newValue:j,storageArea:n};f.dispatchEvent(n instanceof Storage?new StorageEvent("storage",B):new CustomEvent(Gh,{detail:B}))}}function T(z){try{const j=n.getItem(m.value);if(z==null)b(j,null),n.removeItem(m.value);else{const B=x.write(z);j!==B&&(n.setItem(m.value,B),b(j,B))}}catch(j){d(j)}}function L(z){const j=z?z.newValue:n.getItem(m.value);if(j==null)return l&&p!=null&&n.setItem(m.value,x.write(p)),p;if(!z&&c){const B=x.read(j);return typeof c=="function"?c(B,p):E==="object"&&!Array.isArray(B)?{...p,...B}:B}else return typeof j!="string"?j:x.read(j)}function I(z){if(!(z&&z.storageArea!==n)){if(z&&z.key==null){_.value=p;return}if(!(z&&z.key!==m.value)){y();try{const j=x.write(_.value);(z===void 0||z?.newValue!==j)&&(_.value=L(z))}catch(j){d(j)}finally{z?Pr(C):C()}}}}function V(z){I(z.detail)}return _}function Zy(t,e,n={}){const{window:i=sn,...r}=n;let s;const o=Ir(()=>i&&"ResizeObserver"in i),a=()=>{s&&(s.disconnect(),s=void 0)},l=te(()=>{const f=Ye(t);return Array.isArray(f)?f.map(h=>Vt(h)):[Vt(f)]}),c=Rt(l,f=>{if(a(),o.value&&i){s=new ResizeObserver(e);for(const h of f)h&&s.observe(h,r)}},{immediate:!0,flush:"post"}),u=()=>{a(),c()};return Dr(u),{isSupported:o,stop:u}}function Jy(t,e={}){const{delayEnter:n=0,delayLeave:i=0,triggerOnRemoval:r=!1,window:s=sn}=e,o=Je(!1);let a;const l=c=>{const u=c?n:i;a&&(clearTimeout(a),a=void 0),u?a=setTimeout(()=>o.value=c,u):o.value=c};return s&&(it(t,"mouseenter",()=>l(!0),{passive:!0}),it(t,"mouseleave",()=>l(!1),{passive:!0}),r&&zy(te(()=>Vt(t)),()=>l(!1))),o}function Qy(t,e={width:0,height:0},n={}){const{window:i=sn,box:r="content-box"}=n,s=te(()=>{var f,h;return(h=(f=Vt(t))==null?void 0:f.namespaceURI)==null?void 0:h.includes("svg")}),o=Je(e.width),a=Je(e.height),{stop:l}=Zy(t,([f])=>{const h=r==="border-box"?f.borderBoxSize:r==="content-box"?f.contentBoxSize:f.devicePixelContentBoxSize;if(i&&s.value){const d=Vt(t);if(d){const g=d.getBoundingClientRect();o.value=g.width,a.value=g.height}}else if(h){const d=Qs(h);o.value=d.reduce((g,{inlineSize:_})=>g+_,0),a.value=d.reduce((g,{blockSize:_})=>g+_,0)}else o.value=f.contentRect.width,a.value=f.contentRect.height},n);Rs(()=>{const f=Vt(t);f&&(o.value="offsetWidth"in f?f.offsetWidth:e.width,a.value="offsetHeight"in f?f.offsetHeight:e.height)});const c=Rt(()=>Vt(t),f=>{o.value=f?e.width:0,a.value=f?e.height:0});function u(){l(),c()}return{width:o,height:a,stop:u}}const Wh=["fullscreenchange","webkitfullscreenchange","webkitendfullscreen","mozfullscreenchange","MSFullscreenChange"];function Ya(t,e={}){const{document:n=Jm,autoExit:i=!1}=e,r=te(()=>{var E;return(E=Vt(t))!=null?E:n?.documentElement}),s=Je(!1),o=te(()=>["requestFullscreen","webkitRequestFullscreen","webkitEnterFullscreen","webkitEnterFullScreen","webkitRequestFullScreen","mozRequestFullScreen","msRequestFullscreen"].find(E=>n&&E in n||r.value&&E in r.value)),a=te(()=>["exitFullscreen","webkitExitFullscreen","webkitExitFullScreen","webkitCancelFullScreen","mozCancelFullScreen","msExitFullscreen"].find(E=>n&&E in n||r.value&&E in r.value)),l=te(()=>["fullScreen","webkitIsFullScreen","webkitDisplayingFullscreen","mozFullScreen","msFullscreenElement"].find(E=>n&&E in n||r.value&&E in r.value)),c=["fullscreenElement","webkitFullscreenElement","mozFullScreenElement","msFullscreenElement"].find(E=>n&&E in n),u=Ir(()=>r.value&&n&&o.value!==void 0&&a.value!==void 0&&l.value!==void 0),f=()=>c?n?.[c]===r.value:!1,h=()=>{if(l.value){if(n&&n[l.value]!=null)return n[l.value];{const E=r.value;if(E?.[l.value]!=null)return!!E[l.value]}}return!1};async function d(){if(!(!u.value||!s.value)){if(a.value)if(n?.[a.value]!=null)await n[a.value]();else{const E=r.value;E?.[a.value]!=null&&await E[a.value]()}s.value=!1}}async function g(){if(!u.value||s.value)return;h()&&await d();const E=r.value;o.value&&E?.[o.value]!=null&&(await E[o.value](),s.value=!0)}async function _(){await(s.value?d():g())}const m=()=>{const E=h();(!E||E&&f())&&(s.value=E)},p={capture:!1,passive:!0};return it(n,Wh,m,p),it(()=>Vt(r),Wh,m,p),Rs(m,!1),i&&Dr(d),{isSupported:u,isFullscreen:s,enter:g,exit:d,toggle:_}}function Sl(t){return typeof Window<"u"&&t instanceof Window?t.document.documentElement:typeof Document<"u"&&t instanceof Document?t.documentElement:t}const Xh=1;function e1(t,e={}){const{throttle:n=0,idle:i=200,onStop:r=tn,onScroll:s=tn,offset:o={left:0,right:0,top:0,bottom:0},observe:a={mutation:!1},eventListenerOptions:l={capture:!1,passive:!0},behavior:c="auto",window:u=sn,onError:f=b=>{console.error(b)}}=e,h=typeof a=="boolean"?{mutation:a}:a,d=Je(0),g=Je(0),_=te({get(){return d.value},set(b){p(b,void 0)}}),m=te({get(){return g.value},set(b){p(void 0,b)}});function p(b,T){var L,I,V,z;if(!u)return;const j=Ye(t);if(!j)return;(V=j instanceof Document?u.document.body:j)==null||V.scrollTo({top:(L=Ye(T))!=null?L:m.value,left:(I=Ye(b))!=null?I:_.value,behavior:Ye(c)});const B=((z=j?.document)==null?void 0:z.documentElement)||j?.documentElement||j;_!=null&&(d.value=B.scrollLeft),m!=null&&(g.value=B.scrollTop)}const E=Je(!1),x=Er({left:!0,right:!1,top:!0,bottom:!1}),y=Er({left:!1,right:!1,top:!1,bottom:!1}),C=b=>{E.value&&(E.value=!1,y.left=!1,y.right=!1,y.top=!1,y.bottom=!1,r(b))},R=Qu(C,n+i),P=b=>{var T;if(!u)return;const L=((T=b?.document)==null?void 0:T.documentElement)||b?.documentElement||Vt(b),{display:I,flexDirection:V,direction:z}=getComputedStyle(L),j=z==="rtl"?-1:1,B=L.scrollLeft;y.left=B<d.value,y.right=B>d.value;const ne=Math.abs(B*j)<=(o.left||0),k=Math.abs(B*j)+L.clientWidth>=L.scrollWidth-(o.right||0)-Xh;I==="flex"&&V==="row-reverse"?(x.left=k,x.right=ne):(x.left=ne,x.right=k),d.value=B;let fe=L.scrollTop;b===u.document&&!fe&&(fe=u.document.body.scrollTop),y.top=fe<g.value,y.bottom=fe>g.value;const ye=Math.abs(fe)<=(o.top||0),Ce=Math.abs(fe)+L.clientHeight>=L.scrollHeight-(o.bottom||0)-Xh;I==="flex"&&V==="column-reverse"?(x.top=Ce,x.bottom=ye):(x.top=ye,x.bottom=Ce),g.value=fe},U=b=>{var T;if(!u)return;const L=(T=b.target.documentElement)!=null?T:b.target;P(L),E.value=!0,R(b),s(b)};return it(t,"scroll",n?Zm(U,n,!0,!1):U,l),Rs(()=>{try{const b=Ye(t);if(!b)return;P(b)}catch(b){f(b)}}),h?.mutation&&t!=null&&t!==u&&t!==document&&eg(t,()=>{const b=Ye(t);b&&P(b)},{attributes:!0,childList:!0,subtree:!0}),it(t,"scrollend",C,l),{x:_,y:m,isScrolling:E,arrivedState:x,directions:y,measure(){const b=Ye(t);u&&b&&P(b)}}}function t1(t,e,n={}){const{window:i=sn}=n;return tf(t,e,i?.localStorage,n)}function n1(t,e=tn,n={}){const{immediate:i=!0,manual:r=!1,type:s="text/javascript",async:o=!0,crossOrigin:a,referrerPolicy:l,noModule:c,defer:u,document:f=Jm,attrs:h={},nonce:d=void 0}=n,g=Je(null);let _=null;const m=x=>new Promise((y,C)=>{const R=T=>(g.value=T,y(T),T);if(!f){y(!1);return}let P=!1,U=f.querySelector(`script[src="${Ye(t)}"]`);U?U.hasAttribute("data-loaded")&&R(U):(U=f.createElement("script"),U.type=s,U.async=o,U.src=Ye(t),u&&(U.defer=u),a&&(U.crossOrigin=a),c&&(U.noModule=c),l&&(U.referrerPolicy=l),d&&(U.nonce=d),Object.entries(h).forEach(([T,L])=>U?.setAttribute(T,L)),P=!0);const b={passive:!0};it(U,"error",T=>C(T),b),it(U,"abort",T=>C(T),b),it(U,"load",()=>{U.setAttribute("data-loaded","true"),e(U),R(U)},b),P&&(U=f.head.appendChild(U)),x||R(U)}),p=(x=!0)=>(_||(_=m(x)),_),E=()=>{if(!f)return;_=null,g.value&&(g.value=null);const x=f.querySelector(`script[src="${Ye(t)}"]`);x&&f.head.removeChild(x)};return i&&!r&&Rs(p),r||Fy(E),{scriptTag:g,load:p,unload:E}}function tg(t){const e=window.getComputedStyle(t);if(e.overflowX==="scroll"||e.overflowY==="scroll"||e.overflowX==="auto"&&t.clientWidth<t.scrollWidth||e.overflowY==="auto"&&t.clientHeight<t.scrollHeight)return!0;{const n=t.parentNode;return!n||n.tagName==="BODY"?!1:tg(n)}}function i1(t){const e=t||window.event,n=e.target;return tg(n)?!1:e.touches.length>1?!0:(e.preventDefault&&e.preventDefault(),!1)}const yl=new WeakMap;function nf(t,e=!1){const n=Je(e);let i=null,r="";Rt(qm(t),a=>{const l=Sl(Ye(a));if(l){const c=l;if(yl.get(c)||yl.set(c,c.style.overflow),c.style.overflow!=="hidden"&&(r=c.style.overflow),c.style.overflow==="hidden")return n.value=!0;if(n.value)return c.style.overflow="hidden"}},{immediate:!0});const s=()=>{const a=Sl(Ye(t));!a||n.value||(Ec&&(i=it(a,"touchmove",l=>{i1(l)},{passive:!1})),a.style.overflow="hidden",n.value=!0)},o=()=>{const a=Sl(Ye(t));!a||!n.value||(Ec&&i?.(),a.style.overflow=r,yl.delete(a),n.value=!1)};return Dr(o),te({get(){return n.value},set(a){a?s():o()}})}function r1(t,e,n={}){const{window:i=sn}=n;return tf(t,e,i?.sessionStorage,n)}function s1(t={}){const{window:e=sn,...n}=t;return e1(e,n)}function o1(t={}){const{window:e=sn,initialWidth:n=Number.POSITIVE_INFINITY,initialHeight:i=Number.POSITIVE_INFINITY,listenOrientation:r=!0,includeScrollbar:s=!0,type:o="inner"}=t,a=Je(n),l=Je(i),c=()=>{if(e)if(o==="outer")a.value=e.outerWidth,l.value=e.outerHeight;else if(o==="visual"&&e.visualViewport){const{width:f,height:h,scale:d}=e.visualViewport;a.value=Math.round(f*d),l.value=Math.round(h*d)}else s?(a.value=e.innerWidth,l.value=e.innerHeight):(a.value=e.document.documentElement.clientWidth,l.value=e.document.documentElement.clientHeight)};c(),Rs(c);const u={passive:!0};if(it("resize",c,u),e&&o==="visual"&&e.visualViewport&&it(e.visualViewport,"resize",c,u),r){const f=ef("(orientation: portrait)");Rt(f,()=>c())}return{width:a,height:l}}const a1=(t,e)=>{it("keydown",i=>{const r=Ye(t);r?.length&&Ey(i,r)&&!xy(i.target)&&(i.preventDefault(),e())})},ng=(t=!0)=>{const{frontmatter:e,page:n}=qa();return te(()=>e.value.contributors===!1||!Ye(t)?[]:n.value.git.contributors??[])};var $h={"/":{contributors:"Contributors",changelog:"Changelog",timeOn:"on",viewChangelog:"View All Changelog",latestUpdateAt:"Last Updated"}};const l1=typeof $h>"u"?{}:$h,ig=()=>Ri(l1),c1=(t=!0)=>{const{lang:e,page:n}=qa(),i=ig();return te(()=>{if(!Ye(t))return null;const r=n.value.git?.updatedTime??n.value.git?.changelog?.[0].time;if(!r)return null;const s=new Date(r),o=new Intl.DateTimeFormat(e.value,{dateStyle:"short",timeStyle:"short"}).format(r);return{date:s,text:o,iso:s.toISOString(),locale:i.value.latestUpdateAt}})},u1=({level:t=2,text:e,anchor:n})=>S(`h${t||2}`,{id:n,tabindex:"-1"},S("a",{href:`#${n}`,class:"header-anchor"},S("span",e))),f1=({name:t,url:e,avatar:n})=>S(e?"a":"span",{href:e,target:"_blank",rel:"noreferrer",class:"vp-contributor"},[n?S("img",{src:n,alt:"",class:"vp-contributor-avatar"}):null,S("span",{class:"vp-contributor-name"},t)]),h1=Ue({name:"GitContributors",props:{title:String,headerLevel:{type:Number,default:2}},setup(t){const e=ng(),n=ig();return()=>e.value.length?[S(u1,{level:t.headerLevel,anchor:"doc-contributors",text:t.title||n.value.contributors}),S("div",{class:"vp-contributors"},e.value.map(i=>S(f1,i)))]:null}}),d1={enhance:({app:t})=>{t.component("GitContributors",h1)}},p1=Object.freeze(Object.defineProperty({__proto__:null,default:d1},Symbol.toStringTag,{value:"Module"})),m1=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"})),g1=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"})),v1=Wn({enhance:({app:t})=>{}}),_1=Object.freeze(Object.defineProperty({__proto__:null,default:v1},Symbol.toStringTag,{value:"Module"})),x1=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"})),S1=Wn({setup(){it("beforeprint",()=>{document.querySelectorAll("details").forEach(t=>{t.open=!0})},{passive:!0})}}),y1=Object.freeze(Object.defineProperty({__proto__:null,default:S1},Symbol.toStringTag,{value:"Module"})),M1=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"})),E1=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"})),b1=JSON.parse(`{"encrypt":{},"author":{"name":"apm","url":"https://abappm.com"},"repo":"https://github.com/abapPM/docs.abappm.com","docsDir":"src","editLink":true,"logo":"/logo.svg","logoDark":"/logo-dark.svg","footer":"","copyright":"Copyright 2025 apm.to Inc.","displayFooter":true,"locales":{"/":{"lang":"en-US","navbarLocales":{"langName":"English","selectLangAriaLabel":"Select language"},"metaLocales":{"author":"Author","date":"Writing Date","origin":"Original","views":"Page views","category":"Category","tag":"Tag","readingTime":"Reading Time","words":"Words","toc":"On This Page","prev":"Prev","next":"Next","contributors":"Contributors","editLink":"Edit this page","print":"Print"},"outlookLocales":{"themeColor":"Theme Color","darkmode":"Theme Mode","fullscreen":"Full Screen"},"routerLocales":{"skipToContent":"Skip to main content","notFoundTitle":"Page not found","notFoundMsg":["There’s nothing here.","How did we get here?","That’s a Four-Oh-Four.","Looks like we've got some broken links."],"back":"Go back","home":"Take me home"},"navbar":[{"text":"Home","icon":"house","link":"/"},{"text":"User Guide","icon":"circle-info","link":"/user-guide/"},{"text":"Development Guide","icon":"code","link":"/development-guide/"}],"sidebar":{"/user-guide":"structure","/development-guide":"structure"}}}}`),T1=nt(b1),rg=()=>T1,sg=Symbol(""),w1=()=>{const t=Dt(sg);if(!t)throw new Error("useThemeLocaleData() is called without provider.");return t},A1=(t,e)=>{const{locales:n,...i}=t;return{...i,...n?.[e]}},C1=Wn({enhance({app:t}){const e=rg(),n=t._context.provides[$u],i=te(()=>A1(e.value,n.routeLocale.value));t.provide(sg,i),Object.defineProperties(t.config.globalProperties,{$theme:{get(){return e.value}},$themeLocale:{get(){return i.value}}})}}),R1=Object.freeze(Object.defineProperty({__proto__:null,default:C1},Symbol.toStringTag,{value:"Module"}));var P1={"/":{backToTop:"Back to top"}};const L1=Ue({name:"BackToTop",setup(){const t=Ji(),e=Ri(P1),n=Je(),{height:i}=Qy(n),{height:r}=o1(),{y:s}=s1(),o=te(()=>(t.value.backToTop??!0)&&s.value>100),a=te(()=>s.value/(i.value-r.value)*100);return Et(()=>{n.value=document.body}),()=>S(Ss,{name:"fade-in"},()=>o.value?S("button",{type:"button",class:"vp-back-to-top-button","aria-label":e.value.backToTop,onClick:()=>{window.scrollTo({top:0,behavior:"smooth"})}},[S("span",{class:"vp-scroll-progress",role:"progressbar","aria-labelledby":"loadinglabel","aria-valuenow":a.value},S("svg",S("circle",{cx:"26",cy:"26",r:"24",fill:"none",stroke:"currentColor","stroke-width":"4","stroke-dasharray":`${Math.PI*a.value*.48} ${Math.PI*(100-a.value)*.48}`}))),S("div",{class:"back-to-top-icon"})]):null)}}),D1=Wn({rootComponents:[L1]}),I1=Object.freeze(Object.defineProperty({__proto__:null,default:D1},Symbol.toStringTag,{value:"Module"})),U1=/language-(shellscript|shell|bash|sh|zsh)/,N1=({selector:t,ignoreSelector:e,inlineSelector:n,duration:i=2e3,locales:r,showInMobile:s,transform:o})=>{const a=ef("(max-width: 419px)"),l=te(()=>!a.value||s),c=Ri(r),u=_=>{if(_.hasAttribute("copy-code"))return;const m=document.createElement("button");m.type="button",m.classList.add("vp-copy-code-button"),m.setAttribute("aria-label",c.value.copy),m.setAttribute("data-copied",c.value.copied),_.parentElement?.insertBefore(m,_),_.setAttribute("copy-code","")},f=()=>{document.body.classList.toggle("no-copy-code",!l.value),l.value&&document.querySelectorAll(t).forEach(u)};Rn(l,()=>Pr(f),{flush:"post"}),Ci(_=>{_!=="beforeUnmount"&&f()});const{copy:h}=Wy({legacy:!0}),d=new WeakMap,g=async(_,m,p)=>{const E=m.cloneNode(!0);o&&o(E);let x=E.textContent||"";if(U1.test(_.className)&&(x=x.replace(/^ *(\$|>) /gm,"")),await h(x),i<=0)return;p.classList.add("copied"),clearTimeout(d.get(p));const y=setTimeout(()=>{p.classList.remove("copied"),p.blur(),d.delete(p)},i);d.set(p,y)};it("click",_=>{const m=_.target;if(l.value&&m.matches('div[class*="language-"] > button.vp-copy-code-button')){const p=m.parentElement,E=m.nextElementSibling;if(!p||!E)return;g(p,E,m)}},{passive:!0})};var O1={"/":{copy:"Copy code",copied:"Copied"}};const F1=Wn({setup:()=>{N1({selector:'[vp-content] div[class*="language-"] pre',ignoreSelector:"",inlineSelector:"",locales:O1,duration:2e3,showInMobile:!1})}}),B1=Object.freeze(Object.defineProperty({__proto__:null,default:F1},Symbol.toStringTag,{value:"Module"})),k1=Ue({name:"VPIcon",props:{type:{type:String,default:"unknown"},prefix:String,icon:String,color:String,size:[String,Number],verticalAlign:String,sizing:{type:String,default:"height"}},setup(t){const e=te(()=>t.icon?Mo(t.icon)?t.icon:Zu(t.icon)?zt(t.icon):null:null),n=te(()=>{const r={},{type:s,verticalAlign:o,size:a,sizing:l}=t,c={sizing:l};return t.color&&(r.color=t.color),a&&(r["--icon-size"]=Number.isNaN(Number(a))?a:`${a}px`),o&&(r["--icon-vertical-align"]=o),s==="iconify"&&(l!=="height"&&(c.width=t.size||"1em"),l!=="width"&&(c.height=t.size||"1em")),$m(r).length&&(c.style=r),c}),i=r=>r.includes("fa-")||/^fa.$/.test(r)?r:`fa-${r}`;return()=>{const{type:r,icon:s,prefix:o="",sizing:a}=t;if(!s)return null;if(e.value)return S("img",{class:"vp-icon",src:e.value,alt:"","aria-hidden":"","no-view":"",...n.value});if(r==="iconify")return S("iconify-icon",{key:s,class:"vp-icon",icon:s.includes(":")?s:`${o}${s}`,...n.value});if(r==="fontawesome"){const[l,c]=s.includes(":")?s.split(":",2):["fas",s];return S("i",{key:s,class:["vp-icon",l.length===1?`fa${l}`:i(l),...c.split(" ").map(i),a==="height"?"":"fa-fw"],...n.value})}return S("i",{key:s,class:["vp-icon",s.includes(" ")?s:`${o}${s}`],...n.value})}}}),H1={enhance:({app:t})=>{Cn("VPIcon")||t.component("VPIcon",e=>S(k1,{type:"fontawesome",prefix:"",...e}))},setup:()=>{n1("https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/js/all.min.js",()=>{},{attrs:{"data-auto-replace-svg":"nest"}})}},z1=Object.freeze(Object.defineProperty({__proto__:null,default:H1},Symbol.toStringTag,{value:"Module"})),V1=nt({}),og=Symbol(""),G1=()=>Dt(og),W1=t=>{t.provide(og,V1)},ag=t=>new Promise((e,n)=>{t.complete?e({type:"image",element:t,src:t.src,width:t.naturalWidth,height:t.naturalHeight,alt:t.alt,msrc:t.src}):(t.onload=()=>{e(ag(t))},t.onerror=()=>{n()})}),X1='<div class="photo-swipe-loading"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" preserveAspectRatio="xMidYMid" viewBox="25 25 50 50"><animateTransform attributeName="transform" type="rotate" dur="2s" keyTimes="0;1" repeatCount="indefinite" values="0;360"></animateTransform><circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"><animate attributeName="stroke-dasharray" dur="1.5s" keyTimes="0;0.5;1" repeatCount="indefinite" values="1,200;90,200;1,200"></animate><animate attributeName="stroke-dashoffset" dur="1.5s" keyTimes="0;0.5;1" repeatCount="indefinite" values="0;-35px;-125px"></animate></circle></svg></div>',$1=(t,{download:e=!0,fullscreen:n=!0}={})=>{t.on("uiRegister",()=>{if(t.ui.registerElement({name:"bulletsIndicator",className:"photo-swipe-bullets-indicator",appendTo:"wrapper",onInit:i=>{const r=[];let s=-1;for(let o=0;o<t.getNumItems();o++){const a=document.createElement("div");a.className="photo-swipe-bullet",a.onclick=l=>{t.goTo(r.indexOf(l.target))},r.push(a),i.appendChild(a)}t.on("change",()=>{s>=0&&r[s].classList.remove("active"),r[t.currIndex].classList.add("active"),s=t.currIndex})}}),n){const{isSupported:i,toggle:r}=Ya();i.value&&t.ui.registerElement({name:"fullscreen",order:7,isButton:!0,html:'<svg class="pswp__icn" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M249.5 270.833H437v-75H212a37.5 37.5 0 0 0-37.5 37.5v225h75v-187.5zm-37.5 600h225v-75H249.5v-187.5h-75v225a37.5 37.5 0 0 0 37.5 37.5zm637.5-37.5v-225h-75v187.5H587v75h225a37.5 37.5 0 0 0 37.5-37.5zM587 270.833h187.5v187.5h75v-225a37.5 37.5 0 0 0-37.5-37.5H587v75z"/></svg>',onClick:()=>{r()}})}e&&t.ui.registerElement({name:"download",order:8,isButton:!0,tagName:"a",html:{isCustomSVG:!0,inner:'<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1-1.5-1.6ZM23 23H9v2h14" id="pswp__icn-download"/>',outlineID:"pswp__icn-download"},onInit:i=>{i.setAttribute("download",""),i.setAttribute("target","_blank"),i.setAttribute("rel","noopener"),t.on("change",()=>{i.setAttribute("href",t.currSlide.data.src)})}})})},j1=({selector:t,locales:e,download:n=!0,fullscreen:i=!0,scrollToClose:r=!0})=>{const s=G1(),o=Ri(e),a=Ji(),l=te(()=>{const{photoSwipe:d}=a.value;return d===!1?null:xt(d)?d:Ti(t)?t.join(", "):t}),c=te(()=>({...s.value,...o.value,download:n,fullscreen:i,scrollToClose:r}));let u=null,f=0,h=null;it("click",async d=>{const g=d.target;if(!l.value||!u||!g.matches(l.value))return;f!==0&&h.destroy();const _=Date.now(),m=await u,p=Array.from(document.querySelectorAll(l.value)),E=p.map(y=>({html:X1,element:y,msrc:y.src})),x=p.findIndex(y=>y===g);h=new m({preloaderDelay:0,showHideAnimationType:"zoom",...c.value,dataSource:E,index:x,...r?{closeOnVerticalDrag:!0,wheelToZoom:!1}:{}}),f=_,$1(h,{download:n,fullscreen:i}),h.init(),h.on("destroy",()=>{h=null,f=0}),p.map((y,C)=>ag(y).then(R=>{f===_&&(E.splice(C,1,R),h?.refreshSlideContent(C))}))},{passive:!0}),it("wheel",()=>{c.value.scrollToClose&&h?.close()}),Et(()=>{("requestIdleCallback"in window?window.requestIdleCallback:setTimeout)(()=>{u=gi(async()=>{const{default:d}=await import("./photoswipe.esm-CKV1Bsxh.js");return{default:d}},[]).then(({default:d})=>d)})}),ii(()=>{h?.destroy()})};var q1={"/":{closeTitle:"Close",downloadTitle:"Download Image",fullscreenTitle:"Switch to fullscreen",zoomTitle:"Zoom in/out",arrowPrevTitle:"Prev (Arrow Left)",arrowNextTitle:"Next (Arrow Right)"}};const Y1="[vp-content] :not(a) > img:not([no-view])",K1=q1,Z1=!0,J1=!0,Q1=!0;var eM=Wn({enhance:({app:t})=>{W1(t)},setup:()=>{j1({selector:Y1,locales:K1,download:Z1,fullscreen:J1,scrollToClose:Q1})}});const tM=Object.freeze(Object.defineProperty({__proto__:null,default:eM},Symbol.toStringTag,{value:"Module"})),lg=({type:t="info",text:e="",vertical:n,color:i,bgColor:r},{slots:s})=>S("span",{class:["vp-badge",t,{diy:!!(i||r)}],style:{backgroundColor:r??!1,color:i??!1,verticalAlign:n??!1}},s.default?.()??e);lg.displayName="Badge";const nM={enhance:({app:t})=>{Cn("Badge")||t.component("Badge",lg)},setup:()=>{},rootComponents:[]},iM=Object.freeze(Object.defineProperty({__proto__:null,default:nM},Symbol.toStringTag,{value:"Module"})),jh=async(t,e)=>{const{path:n,query:i}=t.currentRoute.value,{scrollBehavior:r}=t.options;t.options.scrollBehavior=void 0,await t.replace({path:n,query:i,hash:e}),t.options.scrollBehavior=r},rM=({headerLinkSelector:t,headerAnchorSelector:e,delay:n,offset:i=5})=>{const r=bo();it("scroll",Qu(()=>{const o=Math.max(window.scrollY,document.documentElement.scrollTop,document.body.scrollTop);if(Math.abs(o)<i){jh(r,"");return}const l=window.innerHeight+o,c=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight),u=Math.abs(c-l)<i,f=Array.from(document.querySelectorAll(t)),d=Array.from(document.querySelectorAll(e)).filter(g=>f.some(_=>_.hash===g.hash));for(let g=0;g<d.length;g++){const _=d[g],m=d[g+1],p=o>=(_.parentElement?.offsetTop??0)-i,E=!m||o<(m.parentElement?.offsetTop??0)-i;if(!(p&&E))continue;const y=decodeURIComponent(r.currentRoute.value.hash),C=decodeURIComponent(_.hash);if(y===C)return;if(u){for(let R=g+1;R<d.length;R++)if(y===decodeURIComponent(d[R].hash))return}jh(r,C);return}},n))},sM=".vp-sidebar-link, .vp-toc-link",oM=".header-anchor",aM=200,lM=5,cM=Wn({setup(){rM({headerLinkSelector:sM,headerAnchorSelector:oM,delay:aM,offset:lM})}}),uM=Object.freeze(Object.defineProperty({__proto__:null,default:cM},Symbol.toStringTag,{value:"Module"}));/**
 * NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT
 */const qh=(t,e)=>{t.classList.add(e)},Yh=(t,e)=>{t.classList.remove(e)},fM=t=>{t?.parentNode?.removeChild(t)},Ml=(t,e,n)=>t<e?e:t>n?n:t,Kh=t=>(-1+t)*100,hM=(()=>{const t=[],e=()=>{const n=t.shift();n&&n(e)};return n=>{t.push(n),t.length===1&&e()}})(),dM=t=>t.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi,(e,n)=>n.toUpperCase()),Vo=(()=>{const t=["Webkit","O","Moz","ms"],e={},n=s=>{const{style:o}=document.body;if(s in o)return s;const a=s.charAt(0).toUpperCase()+s.slice(1);let l=t.length;for(;l--;){const c=`${t[l]}${a}`;if(c in o)return c}return s},i=s=>{const o=dM(s);return e[o]??=n(o)},r=(s,o,a)=>{s.style[i(o)]=a};return(s,o)=>{for(const a in o){const l=o[a];Object.hasOwn(o,a)&&Xm(l)&&r(s,a,l)}}})(),ai={minimum:.08,easing:"ease",speed:200,trickleRate:.02,trickleSpeed:800,barSelector:'[role="bar"]',parent:"body",template:'<div class="bar" role="bar"></div>'},Tt={percent:null,isRendered:()=>!!document.getElementById("nprogress"),set:t=>{const{speed:e,easing:n}=ai,i=Tt.isStarted(),r=Ml(t,ai.minimum,1);Tt.percent=r===1?null:r;const s=Tt.render(!i),o=s.querySelector(ai.barSelector);return s.offsetWidth,hM(a=>{Vo(o,{transform:`translate3d(${Kh(r)}%,0,0)`,transition:`all ${e}ms ${n}`}),r===1?(Vo(s,{transition:"none",opacity:"1"}),s.offsetWidth,setTimeout(()=>{Vo(s,{transition:`all ${e}ms linear`,opacity:"0"}),setTimeout(()=>{Tt.remove(),a()},e)},e)):setTimeout(()=>{a()},e)}),Tt},isStarted:()=>typeof Tt.percent=="number",start:()=>{Tt.percent||Tt.set(0);const t=()=>{setTimeout(()=>{Tt.percent&&(Tt.trickle(),t())},ai.trickleSpeed)};return t(),Tt},done:t=>!t&&!Tt.percent?Tt:Tt.increase(.3+.5*Math.random()).set(1),increase:t=>{let{percent:e}=Tt;return e?(e=Ml(e+(typeof t=="number"?t:(1-e)*Ml(Math.random()*e,.1,.95)),0,.994),Tt.set(e)):Tt.start()},trickle:()=>Tt.increase(Math.random()*ai.trickleRate),render:t=>{if(Tt.isRendered())return document.getElementById("nprogress");qh(document.documentElement,"nprogress-busy");const e=document.createElement("div");e.id="nprogress",e.innerHTML=ai.template;const n=e.querySelector(ai.barSelector),i=document.querySelector(ai.parent),r=t?"-100":Kh(Tt.percent??0);return Vo(n,{transition:"all 0 linear",transform:`translate3d(${r}%,0,0)`}),i&&(i!==document.body&&qh(i,"nprogress-custom-parent"),i.appendChild(e)),e},remove:()=>{Yh(document.documentElement,"nprogress-busy"),Yh(document.querySelector(ai.parent),"nprogress-custom-parent"),fM(document.getElementById("nprogress"))}},pM=()=>{Et(()=>{const t=bo(),e=new Set;e.add(t.currentRoute.value.path),t.beforeEach(n=>{e.has(n.path)||Tt.start()}),t.afterEach(n=>{e.add(n.path),Tt.done()})})},mM=Wn({setup(){pM()}}),gM=Object.freeze(Object.defineProperty({__proto__:null,default:mM},Symbol.toStringTag,{value:"Module"}));var vM={0:"Category: $content",1:"Tag: $content"},_M={"/":{cancel:"Cancel",placeholder:"Search",search:"Search",clear:"Clear search query",remove:"Delete current item",searching:"Searching",defaultTitle:"Documentation",select:"to select",navigate:"to navigate",autocomplete:"to autocomplete",exit:"to exit",queryHistory:"Search History",resultHistory:"Result History",emptyHistory:"Empty Search History",emptyResult:"No results found",loading:"Loading search indexes..."}},xM={searchDelay:150,suggestDelay:0,queryHistoryCount:5,resultHistoryCount:5,hotKeys:[{key:"k",ctrl:!0},{key:"/",ctrl:!0}],worker:"slimsearch.worker.js"};const KC=vM,ao=xM,Ka=_M,El="Canceled because of new search request.",SM=()=>{const t=new Worker(`/${ao.worker}`,{}),e={suggest:null,search:null,all:null};return t.addEventListener("message",({data:n})=>{const[i,r,s]=n,o=e[i];o?.id===r&&o.resolve(s)}),t.addEventListener("error",n=>{console.warn("Search Worker error:",n)}),{suggest:(n,i,r)=>new Promise((s,o)=>{e.suggest?.reject(new Error(El));const a=Date.now();t.postMessage({type:"suggest",id:a,query:n,locale:i,options:r}),e.suggest={id:a,resolve:s,reject:o}}),search:(n,i,r)=>new Promise((s,o)=>{e.search?.reject(new Error(El));const a=Date.now();t.postMessage({type:"search",id:a,query:n,locale:i,options:r}),e.search={id:a,resolve:s,reject:o}}),all:(n,i,r)=>new Promise((s,o)=>{e.all?.reject(new Error(El));const a=Date.now();t.postMessage({type:"all",id:a,query:n,locale:i,options:r}),e.all={id:a,resolve:s,reject:o}}),terminate:()=>{t.terminate(),yy(e).forEach(n=>{n?.reject(new Error("Worker has been terminated."))})}}},yM=nt({}),cg=Symbol(""),ug=()=>{const t=Hm(),e=Dt(cg);return te(()=>{const{locales:n={},...i}=e.value;return{...i,...n[t.value]}})},MM=t=>{t.provide(cg,go(yM))},EM='<svg width="20" height="20" viewBox="0 0 20 20"><path d="M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',fg=({class:t,hint:e})=>S("div",{class:[t,"loading"]},[S("svg",{xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",preserveAspectRatio:"xMidYMid",viewBox:"0 0 100 100"},[S("circle",{cx:"28",cy:"75",r:"11",fill:"currentColor"},S("animate",{attributeName:"fill-opacity",begin:"0s",dur:"1s",keyTimes:"0;0.2;1",repeatCount:"indefinite",values:"0;1;1"})),S("path",{fill:"none",stroke:"#88baf0","stroke-width":"10",d:"M28 47a28 28 0 0 1 28 28"},S("animate",{attributeName:"stroke-opacity",begin:"0.1s",dur:"1s",keyTimes:"0;0.2;1",repeatCount:"indefinite",values:"0;1;1"})),S("path",{fill:"none",stroke:"#88baf0","stroke-width":"10",d:"M28 25a50 50 0 0 1 50 50"},S("animate",{attributeName:"stroke-opacity",begin:"0.2s",dur:"1s",keyTimes:"0;0.2;1",repeatCount:"indefinite",values:"0;1;1"}))]),e]);fg.displayName="SearchLoading";const Ps=({name:t="",color:e="currentColor"},{slots:n})=>S("svg",{xmlns:"http://www.w3.org/2000/svg",class:["icon",`${t}-icon`],viewBox:"0 0 1024 1024",fill:e,"aria-label":`${t} icon`},n.default());Ps.displayName="SVGWrapper";const bM=()=>S(Ps,{name:"heading"},()=>S("path",{d:"M250.4 704.6H64V595.4h202.4l26.2-166.6H94V319.6h214.4L352 64h127.8l-43.6 255.4h211.2L691 64h126.2l-43.6 255.4H960v109.2H756.2l-24.6 166.6H930v109.2H717L672 960H545.8l43.6-255.4H376.6L333 960H206.8l43.6-255.4zm168.4-276L394 595.4h211.2l24.6-166.6h-211z"}));bM.displayName="HeadingIcon";const TM=()=>S(Ps,{name:"heart"},()=>S("path",{d:"M1024 358.156C1024 195.698 892.3 64 729.844 64c-86.362 0-164.03 37.218-217.844 96.49C458.186 101.218 380.518 64 294.156 64 131.698 64 0 195.698 0 358.156 0 444.518 37.218 522.186 96.49 576H96l320 320c32 32 64 64 96 64s64-32 96-64l320-320h-.49c59.272-53.814 96.49-131.482 96.49-217.844zM841.468 481.232 517.49 805.49a2981.962 2981.962 0 0 1-5.49 5.48c-1.96-1.95-3.814-3.802-5.49-5.48L182.532 481.234C147.366 449.306 128 405.596 128 358.156 128 266.538 202.538 192 294.156 192c47.44 0 91.15 19.366 123.076 54.532L512 350.912l94.768-104.378C638.696 211.366 682.404 192 729.844 192 821.462 192 896 266.538 896 358.156c0 47.44-19.368 91.15-54.532 123.076z"}));TM.displayName="HeartIcon";const wM=()=>S(Ps,{name:"history"},()=>S("path",{d:"M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512zm0-896a384 384 0 1 0 384 384 384 384 0 0 0-384-384zm192 448H512a64 64 0 0 1-64-64V320a64 64 0 0 1 128 0v128h128a64 64 0 0 1 0 128z"}));wM.displayName="HistoryIcon";const AM=()=>S(Ps,{name:"title"},()=>S("path",{d:"M512 256c70.656 0 134.656 28.672 180.992 75.008A254.933 254.933 0 0 1 768 512c0 83.968-41.024 157.888-103.488 204.48C688.96 748.736 704 788.48 704 832c0 105.984-86.016 192-192 192-106.048 0-192-86.016-192-192h128a64 64 0 1 0 128 0 64 64 0 0 0-64-64 255.19 255.19 0 0 1-181.056-75.008A255.403 255.403 0 0 1 256 512c0-83.968 41.024-157.824 103.488-204.544C335.04 275.264 320 235.584 320 192A192 192 0 0 1 512 0c105.984 0 192 85.952 192 192H576a64.021 64.021 0 0 0-128 0c0 35.328 28.672 64 64 64zM384 512c0 70.656 57.344 128 128 128s128-57.344 128-128-57.344-128-128-128-128 57.344-128 128z"}));AM.displayName="TitleIcon";const rf=()=>S(Ps,{name:"search"},()=>S("path",{d:"M192 480a256 256 0 1 1 512 0 256 256 0 0 1-512 0m631.776 362.496-143.2-143.168A318.464 318.464 0 0 0 768 480c0-176.736-143.264-320-320-320S128 303.264 128 480s143.264 320 320 320a318.016 318.016 0 0 0 184.16-58.592l146.336 146.368c12.512 12.48 32.768 12.48 45.28 0 12.48-12.512 12.48-32.768 0-45.28"}));rf.displayName="SearchIcon";let CM=null;const hg=()=>CM??=Da(),RM=(t,e=!1)=>{const n=nt(0),i=te(()=>t.value[n.value]),r=()=>{n.value=n.value>0?n.value-1:t.value.length-1},s=()=>{n.value=n.value<t.value.length-1?n.value+1:0};return Rt(t,()=>{e||(n.value=0)}),{index:n,item:i,prev:r,next:s}},PM=()=>{const t=Ir(()=>typeof window<"u"&&"userAgent"in window.navigator);return te(()=>t.value&&/\b(?:Android|iPhone)/i.test(navigator.userAgent))},LM=/[\u4e00-\u9fff\u3400-\u4dbf\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]/,DM=(t="")=>t.split(/\s+/).map(e=>{if(e.length>3){const n=e.split("");if(n.every(i=>LM.test(i)))return n}return e}).flat(),IM=t=>{const e=nt([]);{const{page:n,routeLocale:i}=qa(),r=ug();Et(()=>{const{suggest:s,terminate:o}=SM(),a=l=>{const{resultsFilter:c,querySplitter:u,suggestionsFilter:f=d=>d,...h}=r.value;l.length>=3?s(l,i.value,h).then(d=>f(d,l,i.value,n.value)).then(d=>{e.value=d.length?Ku(d[0],l)&&!d[0].slice(l.length).includes(" ")?d:[l,...d]:[]}).catch(d=>{console.error(d)}):e.value=[]};Rn([t,i],([l])=>{a(l.join(" "))}),ii(()=>{o()})})}return{enabled:!0,suggestions:e}},UM='<svg width="15" height="15" aria-label="Enter key" role="img"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3"></path></g></svg>',NM='<svg width="15" height="15" aria-label="Arrow down" role="img"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M7.5 3.5v8M10.5 8.5l-3 3-3-3"></path></g></svg>',OM='<svg width="15" height="15" aria-label="Arrow up" role="img"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M7.5 11.5v-8M10.5 6.5l-3-3-3 3"></path></g></svg>',FM='<svg width="15" height="15" aria-label="Escape key" role="img"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956"></path></g></svg>',bl=ao.hotKeys[0];var BM=Ue({name:"SearchBox",setup(){const t=Ri(Ka),[e,n]=hg(),i=nt(!1);a1(ao.hotKeys,()=>{e.value||n()});const r=te(()=>bl?[...(i.value?["⌃","⇧","⌥","⌘"]:["Ctrl","Shift","Alt","Win"]).filter((s,o)=>bl[["ctrl","shift","alt","meta"][o]]),bl.key.toUpperCase()]:null);return Et(()=>{const{userAgent:s}=navigator;i.value=py(s)||dy(s)||hy(s)}),()=>[S("button",{type:"button",class:"slimsearch-button","aria-label":t.value.search,onClick:()=>{n(!0)}},[S(rf),S("div",{class:"slimsearch-placeholder"},t.value.search),r.value?S("div",{class:"slimsearch-key-hints"},r.value.map(s=>S("kbd",{class:"slimsearch-key"},s))):null])]}}),kM=Ue({name:"SearchKeyHints",setup(){const t=Ri(Ka),e=PM();return()=>e.value?null:S("div",{class:"slimsearch-hints"},[S("span",{class:"slimsearch-hint"},[S("kbd",{innerHTML:UM}),t.value.select]),S("span",{class:"slimsearch-hint"},[S("kbd",{innerHTML:OM}),S("kbd",{innerHTML:NM}),t.value.navigate]),S("span",{class:"slimsearch-hint"},[S("kbd",{innerHTML:FM}),t.value.exit])])}});const HM=Vp({loader:()=>gi(()=>import("./SearchResult-B6TxCAfR.js"),[]),loadingComponent:()=>{const t=Ri(Ka);return S(fg,{class:"slimsearch-result-wrapper",hint:t.value.loading})}}),zM=["ArrowDown","ArrowUp","Escape","Tab","Enter"];var VM=Ue({name:"SearchModal",setup(){const t=Ri(Ka),e=ZS(),n=ug(),[i,r]=hg(),s=nt(""),o=nt([]),{suggestions:a}=IM(o),l=nt(!1),{index:c,prev:u,next:f}=RM(a),h=Je(),d=Je(),g=Je(),_=nf(g.value),m=te(()=>l.value&&a.value.length),p=(E=c.value)=>{s.value=a.value[E],l.value=!1};return it("keydown",E=>{m.value?E.key==="ArrowUp"?u():E.key==="ArrowDown"?f():E.key==="Tab"?p():(E.key==="Enter"||E.key==="Escape")&&(l.value=!1):E.key==="Escape"&&r(!1)},{passive:!0}),ky(d,()=>{l.value=!1}),Rn(s,Qu(()=>(n.value.querySplitter?.(s.value)??Promise.resolve(DM(s.value))).then(E=>{o.value=E.filter(x=>x.length)}),Math.min(ao.searchDelay,ao.suggestDelay))),Et(()=>{g.value=document.body,Rt(i,E=>{E&&h.value?.focus()},{flush:"post"})}),ii(()=>{_.value=!1}),()=>i.value?S("div",{class:"slimsearch-modal-wrapper"},[S("div",{class:"slimsearch-mask",onClick:()=>{r(!1),s.value=""}}),S("div",{class:"slimsearch-modal"},[S("div",{class:"slimsearch-box"},[S("form",[S("label",{id:"slimsearch-label",for:"slimsearch-input","aria-label":t.value.search},S(rf)),S("input",{ref:h,type:"search",class:"slimsearch-input",id:"slimsearch-input",placeholder:t.value.placeholder,spellcheck:"false",autocapitalize:"off",autocomplete:"off",autocorrect:"off",name:`${e.value.title}-search`,value:s.value,"aria-controls":"slimsearch-results",onKeydown:E=>{m.value&&zM.includes(E.key)&&E.preventDefault()},onInput:({target:E})=>{s.value=E.value,l.value=!0,c.value=0}}),s.value?S("button",{type:"reset",class:"slimsearch-clear-button",title:t.value.clear,"aria-label":t.value.clear,innerHTML:EM,onClick:()=>{s.value=""}}):null,m.value?S("ul",{class:"slimsearch-suggestions",ref:d},a.value.map((E,x)=>S("li",{class:["slimsearch-suggestion",{active:x===c.value}],onClick:()=>{p(x)}},[S("kbd",{class:"slimsearch-auto-complete",title:`Tab ${t.value.autocomplete}`},"Tab"),E]))):null]),S("button",{type:"button",class:"slimsearch-close-button",onClick:()=>{r(!1),s.value=""}},t.value.cancel)]),S(HM,{queries:o.value,isFocusing:!m.value,onClose:()=>{r(!1)},onUpdateQuery:E=>{s.value=E}}),S(kM)])]):null}}),GM=Wn({enhance({app:t}){MM(t),t.component("SearchBox",BM)},rootComponents:[VM]});const WM=Object.freeze(Object.defineProperty({__proto__:null,default:GM},Symbol.toStringTag,{value:"Module"})),pa=()=>null,dg="VUEPRESS_REDIRECT_STATUS";t1(dg,{});r1(dg,{});var XM={config:{"/":["en-US"]},autoLocale:!1,defaultLocale:"/",localeFallback:!0,defaultBehavior:"defaultLocale"};const $M=XM;var jM=Wn({setup(){}});const qM=Object.freeze(Object.defineProperty({__proto__:null,config:$M,default:jM},Symbol.toStringTag,{value:"Module"}));var Zh={"/":{word:"About $word words",less1Minute:"Less than 1 minute",time:"About $time min"}};const pg=()=>{const t=KS();return te(()=>t.value.readingTime??null)},YM=(t,e)=>{const{minutes:n,words:i}=t,{less1Minute:r,word:s,time:o}=e;return{time:n<1?r:o.replace("$time",Math.round(n).toString()),words:s.replace("$word",i.toString())}},Jh={words:"",time:""},bc=typeof Zh>"u"?null:Zh,KM=()=>bc?Ri(bc):te(()=>null),ZM=()=>{if(bc===null)return te(()=>Jh);const t=pg(),e=KM();return te(()=>t.value&&e.value?YM(t.value,e.value):Jh)},It=({name:t="",color:e="currentColor",ariaLabel:n},{attrs:i,slots:r})=>S("svg",{xmlns:"http://www.w3.org/2000/svg",class:["icon",`${t}-icon`],viewBox:"0 0 1024 1024",fill:e,"aria-label":n??`${t} icon`,...i},r.default());It.displayName="IconBase";const JM=t=>Mo(t)?t:`https://github.com/${t}`,sf=(t="")=>!Mo(t)||t.includes("github.com")?"GitHub":t.includes("bitbucket.org")?"Bitbucket":t.includes("gitlab.com")?"GitLab":t.includes("gitee.com")?"Gitee":null,mg=()=>S(It,{name:"github"},()=>S("path",{d:"M511.957 21.333C241.024 21.333 21.333 240.981 21.333 512c0 216.832 140.544 400.725 335.574 465.664 24.49 4.395 32.256-10.07 32.256-23.083 0-11.69.256-44.245 0-85.205-136.448 29.61-164.736-64.64-164.736-64.64-22.315-56.704-54.4-71.765-54.4-71.765-44.587-30.464 3.285-29.824 3.285-29.824 49.195 3.413 75.179 50.517 75.179 50.517 43.776 75.008 114.816 53.333 142.762 40.79 4.523-31.66 17.152-53.377 31.19-65.537-108.971-12.458-223.488-54.485-223.488-242.602 0-53.547 19.114-97.323 50.517-131.67-5.035-12.33-21.93-62.293 4.779-129.834 0 0 41.258-13.184 134.912 50.346a469.803 469.803 0 0 1 122.88-16.554c41.642.213 83.626 5.632 122.88 16.554 93.653-63.488 134.784-50.346 134.784-50.346 26.752 67.541 9.898 117.504 4.864 129.834 31.402 34.347 50.474 78.123 50.474 131.67 0 188.586-114.73 230.016-224.042 242.09 17.578 15.232 33.578 44.672 33.578 90.454v135.85c0 13.142 7.936 27.606 32.854 22.87C862.25 912.597 1002.667 728.747 1002.667 512c0-271.019-219.648-490.667-490.71-490.667z"}));mg.displayName="GitHubIcon";const gg=()=>S(It,{name:"gitee"},()=>S("path",{d:"M512 992C246.92 992 32 777.08 32 512S246.92 32 512 32s480 214.92 480 480-214.92 480-480 480zm242.97-533.34H482.39a23.7 23.7 0 0 0-23.7 23.7l-.03 59.28c0 13.08 10.59 23.7 23.7 23.7h165.96a23.7 23.7 0 0 1 23.7 23.7v11.85a71.1 71.1 0 0 1-71.1 71.1H375.71a23.7 23.7 0 0 1-23.7-23.7V423.11a71.1 71.1 0 0 1 71.1-71.1h331.8a23.7 23.7 0 0 0 23.7-23.7l.06-59.25a23.73 23.73 0 0 0-23.7-23.73H423.11a177.78 177.78 0 0 0-177.78 177.75v331.83c0 13.08 10.62 23.7 23.7 23.7h349.62a159.99 159.99 0 0 0 159.99-159.99V482.33a23.7 23.7 0 0 0-23.7-23.7z"}));gg.displayName="GiteeIcon";const vg=()=>S(It,{name:"bitbucket"},()=>S("path",{d:"M575.256 490.862c6.29 47.981-52.005 85.723-92.563 61.147-45.714-20.004-45.714-92.562-1.133-113.152 38.29-23.442 93.696 7.424 93.696 52.005zm63.451-11.996c-10.276-81.152-102.29-134.839-177.152-101.156-47.433 21.138-79.433 71.424-77.129 124.562 2.853 69.705 69.157 126.866 138.862 120.576S647.3 548.571 638.708 478.83zm136.558-309.723c-25.161-33.134-67.986-38.839-105.728-45.13-106.862-17.151-216.576-17.7-323.438 1.134-35.438 5.706-75.447 11.996-97.719 43.996 36.572 34.304 88.576 39.424 135.424 45.129 84.553 10.862 171.447 11.447 256 .585 47.433-5.705 99.987-10.276 135.424-45.714zm32.585 591.433c-16.018 55.99-6.839 131.438-66.304 163.986-102.29 56.576-226.304 62.867-338.87 42.862-59.43-10.862-129.135-29.696-161.72-85.723-14.3-54.858-23.442-110.848-32.585-166.84l3.438-9.142 10.276-5.157c170.277 112.567 408.576 112.567 579.438 0 26.844 8.01 6.84 40.558 6.29 60.014zm103.424-549.157c-19.42 125.148-41.728 249.71-63.415 374.272-6.29 36.572-41.728 57.162-71.424 72.558-106.862 53.724-231.424 62.866-348.562 50.286-79.433-8.558-160.585-29.696-225.134-79.433-30.28-23.443-30.28-63.415-35.986-97.134-20.005-117.138-42.862-234.277-57.161-352.585 6.839-51.42 64.585-73.728 107.447-89.71 57.16-21.138 118.272-30.866 178.87-36.571 129.134-12.58 261.157-8.01 386.304 28.562 44.581 13.13 92.563 31.415 122.844 69.705 13.714 17.7 9.143 40.01 6.29 60.014z"}));vg.displayName="BitbucketIcon";const _g=()=>S(It,{name:"source"},()=>S("path",{d:"M601.92 475.2c0 76.428-8.91 83.754-28.512 99.594-14.652 11.88-43.956 14.058-78.012 16.434-18.81 1.386-40.392 2.97-62.172 6.534-18.612 2.97-36.432 9.306-53.064 17.424V299.772c37.818-21.978 63.36-62.766 63.36-109.692 0-69.894-56.826-126.72-126.72-126.72S190.08 120.186 190.08 190.08c0 46.926 25.542 87.714 63.36 109.692v414.216c-37.818 21.978-63.36 62.766-63.36 109.692 0 69.894 56.826 126.72 126.72 126.72s126.72-56.826 126.72-126.72c0-31.086-11.286-59.598-29.7-81.576 13.266-9.504 27.522-17.226 39.996-19.206 16.038-2.574 32.868-3.762 50.688-5.148 48.312-3.366 103.158-7.326 148.896-44.55 61.182-49.698 74.25-103.158 75.24-187.902V475.2h-126.72zM316.8 126.72c34.848 0 63.36 28.512 63.36 63.36s-28.512 63.36-63.36 63.36-63.36-28.512-63.36-63.36 28.512-63.36 63.36-63.36zm0 760.32c-34.848 0-63.36-28.512-63.36-63.36s28.512-63.36 63.36-63.36 63.36 28.512 63.36 63.36-28.512 63.36-63.36 63.36zM823.68 158.4h-95.04V63.36h-126.72v95.04h-95.04v126.72h95.04v95.04h126.72v-95.04h95.04z"}));_g.displayName="SourceIcon";const QM=({link:t,type:e=sf(t??"")})=>{if(!e)return null;const n=e.toLowerCase();return S(n==="bitbucket"?vg:n==="github"?mg:n==="gitlab"?"GitLab":n==="gitee"?gg:_g)},eE=(t,e=0)=>{let n=3735928559^e,i=1103547991^e;for(let r=0,s;r<t.length;r++)s=t.charCodeAt(r),n=Math.imul(n^s,2654435761),i=Math.imul(i^s,1597334677);return n=Math.imul(n^n>>>16,2246822507),n^=Math.imul(i^i>>>13,3266489909),i=Math.imul(i^i>>>16,2246822507),i^=Math.imul(n^n>>>13,3266489909),4294967296*(2097151&i)+(n>>>0)},xg=(t,e)=>eE(t)%e,Sg=/#.*$/u,tE=t=>{const e=Sg.exec(t);return e?e[0]:""},Qh=t=>decodeURI(t).replace(Sg,"").replace(/\/index\.html$/iu,"/").replace(/\/(README|index)\.md$/iu,"/").replace(/\.(?:html|md)$/iu,""),yg=(t,e)=>{if(!Xm(e))return!1;const n=Qh(t.path),i=Qh(e),r=tE(e);return r?r===t.hash&&(!i||n===i):n===i},nE="719px",iE="1440px",rE="9",of={mobileBreakPoint:nE,pcBreakPoint:iE,colorNumber:rE},Ur=()=>rg(),Qi=()=>w1(),Yt=()=>({...qa(),theme:Ur(),themeLocale:Qi()}),Pn=()=>{const t=Ur();return te(()=>!!t.value.pure)},Mg=()=>{const t=Qi();return te(()=>t.value.author)},ed=t=>Eo(t)&&xt(t.name),td=(t,e=!1)=>t?Ti(t)?t.map(n=>xt(n)?{name:n}:ed(n)?n:null).filter(n=>n!==null):xt(t)?[{name:t}]:ed(t)?[t]:(console.error(`Expect "author" to be \`AuthorInfo[] | AuthorInfo | string[] | string ${e?"":"| false"} | undefined\`, but got`,t),[]):[],Eg=(t,e)=>{if(t){if(Ti(t)&&t.every(xt))return t;if(xt(t))return[t];console.error(`Expect ${e} to be \`string[] | string | undefined\`, but got`,t)}return[]},sE=t=>Eg(t,"category"),oE=t=>Eg(t,"tag"),bg=()=>{const t=Ji(),e=Mg();return te(()=>{const{author:n}=t.value;return n?td(n):n===!1?[]:td(e.value,!1)})},aE=()=>{const t=Ji(),e=Dt(Symbol.for("categoryMap"),null);return te(()=>sE(t.value.category??t.value.categories).map(n=>({name:n,path:e?.value.map[n]?.path??""})))},lE=()=>{const t=Ji(),e=Dt(Symbol.for("tagMap"),null);return te(()=>oE(t.value.tag??t.value.tags).map(n=>({name:n,path:e?.value.map[n]?.path??""})))},cE=()=>{const{frontmatter:t,page:e}=Yt();return te(()=>{const n=My(t.value.date);if(n)return n;const{createdTime:i}=e.value.git??{};return i?new Date(i):null})},uE=()=>{const{frontmatter:t,themeLocale:e}=Yt(),n=bg(),i=aE(),r=lE(),s=cE(),o=pg(),a=ZM(),l=te(()=>({author:n.value,category:i.value,date:s.value,tag:r.value,isOriginal:t.value.isOriginal??!1,readingTime:o.value,readingTimeLocale:a.value,pageview:t.value.pageview??!0})),c=te(()=>t.value.pageInfo??e.value.pageInfo??null);return{info:l,items:c}},Ln=()=>{const t=Qi();return te(()=>t.value.metaLocales)},fE="http://.",af=()=>{const t=bo(),e=Ai();return n=>{if(!n)return;if(yo(n))return window.open(n);if(Zu(n))return e.fullPath===n?void 0:void t.push(n);const i=e.path.slice(0,e.path.lastIndexOf("/"));return void t.push(new URL(`${i}/${encodeURI(n)}`,fE).pathname)}},Tg=()=>S(It,{name:"author"},()=>S("path",{d:"M649.6 633.6c86.4-48 147.2-144 147.2-249.6 0-160-128-288-288-288s-288 128-288 288c0 108.8 57.6 201.6 147.2 249.6-121.6 48-214.4 153.6-240 288-3.2 9.6 0 19.2 6.4 25.6 3.2 9.6 12.8 12.8 22.4 12.8h704c9.6 0 19.2-3.2 25.6-12.8 6.4-6.4 9.6-16 6.4-25.6-25.6-134.4-121.6-240-243.2-288z"}));Tg.displayName="AuthorIcon";const wg=()=>S(It,{name:"calendar"},()=>S("path",{d:"M716.4 110.137c0-18.753-14.72-33.473-33.472-33.473-18.753 0-33.473 14.72-33.473 33.473v33.473h66.993v-33.473zm-334.87 0c0-18.753-14.72-33.473-33.473-33.473s-33.52 14.72-33.52 33.473v33.473h66.993v-33.473zm468.81 33.52H716.4v100.465c0 18.753-14.72 33.473-33.472 33.473a33.145 33.145 0 01-33.473-33.473V143.657H381.53v100.465c0 18.753-14.72 33.473-33.473 33.473a33.145 33.145 0 01-33.473-33.473V143.657H180.6A134.314 134.314 0 0046.66 277.595v535.756A134.314 134.314 0 00180.6 947.289h669.74a134.36 134.36 0 00133.94-133.938V277.595a134.314 134.314 0 00-133.94-133.938zm33.473 267.877H147.126a33.145 33.145 0 01-33.473-33.473c0-18.752 14.72-33.473 33.473-33.473h736.687c18.752 0 33.472 14.72 33.472 33.473a33.145 33.145 0 01-33.472 33.473z"}));wg.displayName="CalendarIcon";const Ag=()=>S(It,{name:"category"},()=>S("path",{d:"M148.41 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H148.41c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.311-40.31zM147.556 553.478H429.73c22.263 0 40.311 18.048 40.311 40.31v282.176c0 22.263-18.048 40.312-40.31 40.312H147.555c-22.263 0-40.311-18.049-40.311-40.312V593.79c0-22.263 18.048-40.311 40.31-40.311zM593.927 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H593.927c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.31-40.31zM730.22 920.502H623.926c-40.925 0-74.22-33.388-74.22-74.425V623.992c0-41.038 33.387-74.424 74.425-74.424h222.085c41.038 0 74.424 33.226 74.424 74.067v114.233c0 10.244-8.304 18.548-18.547 18.548s-18.548-8.304-18.548-18.548V623.635c0-20.388-16.746-36.974-37.33-36.974H624.13c-20.585 0-37.331 16.747-37.331 37.33v222.086c0 20.585 16.654 37.331 37.126 37.331H730.22c10.243 0 18.547 8.304 18.547 18.547 0 10.244-8.304 18.547-18.547 18.547z"}));Ag.displayName="CategoryIcon";const Cg=()=>S(It,{name:"print"},()=>S("path",{d:"M819.2 364.8h-44.8V128c0-17.067-14.933-32-32-32H281.6c-17.067 0-32 14.933-32 32v236.8h-44.8C145.067 364.8 96 413.867 96 473.6v192c0 59.733 49.067 108.8 108.8 108.8h44.8V896c0 17.067 14.933 32 32 32h460.8c17.067 0 32-14.933 32-32V774.4h44.8c59.733 0 108.8-49.067 108.8-108.8v-192c0-59.733-49.067-108.8-108.8-108.8zM313.6 160h396.8v204.8H313.6V160zm396.8 704H313.6V620.8h396.8V864zM864 665.6c0 25.6-19.2 44.8-44.8 44.8h-44.8V588.8c0-17.067-14.933-32-32-32H281.6c-17.067 0-32 14.933-32 32v121.6h-44.8c-25.6 0-44.8-19.2-44.8-44.8v-192c0-25.6 19.2-44.8 44.8-44.8h614.4c25.6 0 44.8 19.2 44.8 44.8v192z"}));Cg.displayName="PrintIcon";const Rg=()=>S(It,{name:"tag"},()=>S("path",{d:"M939.902 458.563L910.17 144.567c-1.507-16.272-14.465-29.13-30.737-30.737L565.438 84.098h-.402c-3.215 0-5.726 1.005-7.634 2.913l-470.39 470.39a10.004 10.004 0 000 14.164l365.423 365.424c1.909 1.908 4.42 2.913 7.132 2.913s5.223-1.005 7.132-2.913l470.39-470.39c2.01-2.11 3.014-5.023 2.813-8.036zm-240.067-72.121c-35.458 0-64.286-28.828-64.286-64.286s28.828-64.285 64.286-64.285 64.286 28.828 64.286 64.285-28.829 64.286-64.286 64.286z"}));Rg.displayName="TagIcon";const Pg=()=>S(It,{name:"timer"},()=>S("path",{d:"M799.387 122.15c4.402-2.978 7.38-7.897 7.38-13.463v-1.165c0-8.933-7.38-16.312-16.312-16.312H256.33c-8.933 0-16.311 7.38-16.311 16.312v1.165c0 5.825 2.977 10.874 7.637 13.592 4.143 194.44 97.22 354.963 220.201 392.763-122.204 37.542-214.893 196.511-220.2 389.397-4.661 5.049-7.638 11.651-7.638 19.03v5.825h566.49v-5.825c0-7.379-2.849-13.981-7.509-18.9-5.049-193.016-97.867-351.985-220.2-389.527 123.24-37.67 216.446-198.453 220.588-392.892zM531.16 450.445v352.632c117.674 1.553 211.787 40.778 211.787 88.676H304.097c0-48.286 95.149-87.382 213.728-88.676V450.445c-93.077-3.107-167.901-81.297-167.901-177.093 0-8.803 6.99-15.793 15.793-15.793 8.803 0 15.794 6.99 15.794 15.793 0 80.261 63.69 145.635 142.01 145.635s142.011-65.374 142.011-145.635c0-8.803 6.99-15.793 15.794-15.793s15.793 6.99 15.793 15.793c0 95.019-73.789 172.82-165.96 177.093z"}));Pg.displayName="TimerIcon";const Lg=()=>S(It,{name:"word"},()=>[S("path",{d:"M518.217 432.64V73.143A73.143 73.143 0 01603.43 1.097a512 512 0 01419.474 419.474 73.143 73.143 0 01-72.046 85.212H591.36a73.143 73.143 0 01-73.143-73.143z"}),S("path",{d:"M493.714 566.857h340.297a73.143 73.143 0 0173.143 85.577A457.143 457.143 0 11371.566 117.76a73.143 73.143 0 0185.577 73.143v339.383a36.571 36.571 0 0036.571 36.571z"})]);Lg.displayName="WordIcon";var hE=Ue({name:"AuthorInfo",inheritAttrs:!1,props:{author:{type:Array,required:!0}},setup(t){const e=Ln(),n=Pn();return()=>t.author.length?S("span",{class:"page-author-info","aria-label":`${e.value.author}${n.value?"":"🖊"}`,...n.value?{}:{"data-balloon-pos":"up"}},[S(Tg),S("span",t.author.map(i=>i.url?S("a",{class:"page-author-item",href:i.url,target:"_blank",rel:"noopener noreferrer"},i.name):S("span",{class:"page-author-item"},i.name))),S("span",{property:"author",content:t.author.map(i=>i.name).join(", ")})]):null}}),dE=Ue({name:"CategoryInfo",inheritAttrs:!1,props:{category:{type:Array,required:!0}},setup(t){const e=Ln(),n=af(),i=Pn();return()=>t.category.length?S("span",{class:"page-category-info","aria-label":`${e.value.category}${i.value?"":"🌈"}`,...i.value?{}:{"data-balloon-pos":"up"}},[S(Ag),t.category.map(({name:r,path:s})=>S("span",{class:["page-category-item",{[`color${xg(r,Number(of.colorNumber))}`]:!i.value,clickable:s}],role:s?"navigation":"",onClick:()=>{s&&n(s)}},r)),S("meta",{property:"articleSection",content:t.category.map(({name:r})=>r).join(",")})]):null}}),pE=Ue({name:"DateInfo",inheritAttrs:!1,props:{date:Object},setup(t){const e=YS(),n=Ln(),i=Pn(),r=te(()=>new Intl.DateTimeFormat(e.value,{dateStyle:"short"})),s=te(()=>t.date?r.value.format(t.date):null);return()=>t.date?S("span",{class:"page-date-info","aria-label":`${n.value.date}${i.value?"":"📅"}`,...i.value?{}:{"data-balloon-pos":"up"}},[S(wg),S("span",{"data-allow-mismatch":"text"},s.value),S("meta",{property:"datePublished",content:t.date.toISOString()||""})]):null}}),mE=Ue({name:"OriginalInfo",inheritAttrs:!1,props:{isOriginal:Boolean},setup(t){const e=Ln();return()=>t.isOriginal?S("span",{class:"page-original-info"},e.value.origin):null}}),gE=Ue({name:"ReadingTimeInfo",inheritAttrs:!1,props:{readingTime:Object,readingTimeLocale:Object},setup(t){const e=Ln(),n=Pn(),i=te(()=>{if(!t.readingTime)return null;const{minutes:r}=t.readingTime;return r<1?"PT1M":`PT${Math.round(r)}M`});return()=>t.readingTimeLocale?.time?S("span",{class:"page-reading-time-info","aria-label":`${e.value.readingTime}${n.value?"":"⌛"}`,...n.value?{}:{"data-balloon-pos":"up"}},[S(Pg),S("span",t.readingTimeLocale.time),S("meta",{property:"timeRequired",content:i.value})]):null}}),vE=Ue({name:"TagInfo",inheritAttrs:!1,props:{tag:Array},setup(t){const e=Ln(),n=af(),i=Pn();return()=>t.tag?.length?S("span",{class:"page-tag-info","aria-label":`${e.value.tag}${i.value?"":"🏷"}`,...i.value?{}:{"data-balloon-pos":"up"}},[S(Rg),t.tag.map(({name:r,path:s})=>S("span",{class:["page-tag-item",{[`color${xg(r,Number(of.colorNumber))}`]:!i.value,clickable:s}],role:s?"navigation":"",onClick:()=>{s&&n(s)}},r)),S("meta",{property:"keywords",content:t.tag.map(({name:r})=>r).join(",")})]):null}}),_E=Ue({name:"ReadTimeInfo",inheritAttrs:!1,props:{readingTime:Object,readingTimeLocale:Object},setup(t){const e=Ln(),n=Pn();return()=>t.readingTimeLocale?.words?S("span",{class:"page-word-info","aria-label":`${e.value.words}${n.value?"":"🔠"}`,...n.value?{}:{"data-balloon-pos":"up"}},[S(Lg),S("span",t.readingTimeLocale.words),S("meta",{property:"wordCount",content:t.readingTime?.words})]):null}}),xE=Ue({name:"PageInfo",components:{AuthorInfo:hE,CategoryInfo:dE,DateInfo:pE,OriginalInfo:mE,PageViewInfo:pa,ReadingTimeInfo:gE,TagInfo:vE,WordInfo:_E},props:{items:[Boolean,Array],info:{type:Object,required:!0}},setup(t){const e=Pn();return()=>{const n=t.items??["Author","Original","Date","PageView","ReadingTime","Category","Tag"];return n?S("div",{class:"page-info"},n.map(i=>S(Ct(`${i}Info`),{...t.info,isPure:e.value}))):null}}});const lf={"/user-guide":[{text:"Getting Started",prefix:"getting-started/",collapsible:!0,icon:"lightbulb",children:["install"]}],"/development-guide":[]},Dg=Symbol(""),wo=()=>{const t=Dt(Dg);if(!t)throw new Error("useDarkMode() is called without provider.");return t},SE=t=>{const e=qy(),n=Ur(),i=te(()=>n.value.darkmode??"switch"),r=tf("vuepress-theme-hope-scheme","auto"),s=te(()=>{const a=i.value;return a==="disable"?!1:a==="enable"?!0:a==="auto"?e.value:a==="toggle"?r.value==="dark":r.value==="dark"||r.value==="auto"&&e.value}),o=te(()=>{const a=i.value;return a==="switch"||a==="toggle"});t.provide(Dg,{canToggle:o,config:i,isDarkMode:s,status:r}),Object.defineProperties(t.config.globalProperties,{$isDarkMode:{get:()=>s.value}})},yE=()=>{const{config:t,isDarkMode:e,status:n}=wo();Bu(()=>{t.value==="disable"?n.value="light":t.value==="enable"?n.value="dark":t.value==="toggle"&&n.value==="auto"&&(n.value="light")}),it("beforeprint",()=>{e.value&&document.documentElement.setAttribute("data-theme","light")}),it("afterprint",()=>{e.value&&document.documentElement.setAttribute("data-theme","dark")}),Et(()=>{Rn(e,i=>{document.documentElement.setAttribute("data-theme",i?"dark":"light")})})},Tc=t=>!yo(t)&&!Vu(t),Ia=(t,e=!1,n)=>{const{meta:i,path:r,notFound:s}=bi(t,n);return s?{text:r,link:r}:{text:!e&&i.shortTitle?i.shortTitle:i.title||r,link:r,icon:i.icon}},gr=(t="",e="")=>yo(e)||Zu(e)?e:`${Ux(t)}${e}`,Ig=(t,e)=>{const n=xt(t)?Ia(gr(e,t)):xt(t.link)?{...t,link:Tc(t.link)?bi(gr(e,t.link)).path:t.link}:t;if("children"in n){const i=gr(e,n.prefix),r=n.children==="structure"?lf[i]:n.children;return{...n,prefix:i,children:r.map(s=>Ig(s,i))}}return{...n}},wc=({config:t,prefix:e=""})=>t.map(n=>Ig(n,e)),ME=({config:t,routePath:e})=>{const n=$m(t).sort((i,r)=>r.length-i.length);for(const i of n)if(Ku(decodeURI(e),i)){const r=t[i];return wc({config:r==="structure"?lf[i]:r||[],prefix:i})}return console.warn(`${decodeURI(e)} is missing it's sidebar config.`),[]},EE=({config:t,routeLocale:e,routePath:n})=>t==="structure"?wc({config:lf[e],prefix:e}):Ti(t)?wc({config:t}):Eo(t)?ME({config:t,routePath:n}):[],Ug=Symbol(""),bE=()=>{const{frontmatter:t,routeLocale:e,routePath:n,themeLocale:i}=Yt(),r=te(()=>t.value.home?!1:t.value.sidebar??i.value.sidebar??"structure"),s=te(()=>EE({config:r.value,routeLocale:e.value,routePath:n.value}));hs(Ug,s)},cf=()=>{const t=Dt(Ug);if(!t)throw new Error("useSidebarItems() is called without provider.");return t};var TE=Ue({name:"PageFooter",setup(){const{frontmatter:t,theme:e,themeLocale:n}=Yt(),i=bg(),r=te(()=>{const{copyright:c,footer:u}=t.value;return u!==!1&&!!(c||u||n.value.displayFooter)}),s=te(()=>{const{footer:c}=t.value;return xt(c)?c:n.value.footer??""}),o=te(()=>i.value.map(({name:c})=>c).join(", ")),a=c=>`Copyright © ${new Date().getFullYear()} ${o.value} ${c?`${c} Licensed`:""}`,l=te(()=>{const{copyright:c,license:u=""}=t.value,{license:f}=e.value,{copyright:h}=n.value;return c??(u?a(u):h??(o.value||f?a(f):!1))});return()=>r.value?S("footer",{class:"vp-footer-wrapper","vp-footer":""},[s.value?S("div",{class:"vp-footer",innerHTML:s.value}):null,l.value?S("div",{class:"vp-copyright",innerHTML:l.value}):null]):null}});const Ng=()=>S(It,{name:"outlook"},()=>[S("path",{d:"M224 800c0 9.6 3.2 44.8 6.4 54.4 6.4 48-48 76.8-48 76.8s80 41.6 147.2 0 134.4-134.4 38.4-195.2c-22.4-12.8-41.6-19.2-57.6-19.2C259.2 716.8 227.2 761.6 224 800zM560 675.2l-32 51.2c-51.2 51.2-83.2 32-83.2 32 25.6 67.2 0 112-12.8 128 25.6 6.4 51.2 9.6 80 9.6 54.4 0 102.4-9.6 150.4-32l0 0c3.2 0 3.2-3.2 3.2-3.2 22.4-16 12.8-35.2 6.4-44.8-9.6-12.8-12.8-25.6-12.8-41.6 0-54.4 60.8-99.2 137.6-99.2 6.4 0 12.8 0 22.4 0 12.8 0 38.4 9.6 48-25.6 0-3.2 0-3.2 3.2-6.4 0-3.2 3.2-6.4 3.2-6.4 6.4-16 6.4-16 6.4-19.2 9.6-35.2 16-73.6 16-115.2 0-105.6-41.6-198.4-108.8-268.8C704 396.8 560 675.2 560 675.2zM224 419.2c0-28.8 22.4-51.2 51.2-51.2 28.8 0 51.2 22.4 51.2 51.2 0 28.8-22.4 51.2-51.2 51.2C246.4 470.4 224 448 224 419.2zM320 284.8c0-22.4 19.2-41.6 41.6-41.6 22.4 0 41.6 19.2 41.6 41.6 0 22.4-19.2 41.6-41.6 41.6C339.2 326.4 320 307.2 320 284.8zM457.6 208c0-12.8 12.8-25.6 25.6-25.6 12.8 0 25.6 12.8 25.6 25.6 0 12.8-12.8 25.6-25.6 25.6C470.4 233.6 457.6 220.8 457.6 208zM128 505.6C128 592 153.6 672 201.6 736c28.8-60.8 112-60.8 124.8-60.8-16-51.2 16-99.2 16-99.2l316.8-422.4c-48-19.2-99.2-32-150.4-32C297.6 118.4 128 291.2 128 505.6zM764.8 86.4c-22.4 19.2-390.4 518.4-390.4 518.4-22.4 28.8-12.8 76.8 22.4 99.2l9.6 6.4c35.2 22.4 80 12.8 99.2-25.6 0 0 6.4-12.8 9.6-19.2 54.4-105.6 275.2-524.8 288-553.6 6.4-19.2-3.2-32-19.2-32C777.6 76.8 771.2 80 764.8 86.4z"})]);Ng.displayName="AppearanceIcon";const Og=()=>S(It,{name:"auto"},()=>S("path",{d:"M512 992C246.92 992 32 777.08 32 512S246.92 32 512 32s480 214.92 480 480-214.92 480-480 480zm0-840c-198.78 0-360 161.22-360 360 0 198.84 161.22 360 360 360s360-161.16 360-360c0-198.78-161.22-360-360-360zm0 660V212c165.72 0 300 134.34 300 300 0 165.72-134.28 300-300 300z"}));Og.displayName="AutoColorModeIcon";const Fg=()=>S(It,{name:"light"},()=>S("path",{d:"M952 552h-80a40 40 0 0 1 0-80h80a40 40 0 0 1 0 80zM801.88 280.08a41 41 0 0 1-57.96-57.96l57.96-58a41.04 41.04 0 0 1 58 58l-58 57.96zM512 752a240 240 0 1 1 0-480 240 240 0 0 1 0 480zm0-560a40 40 0 0 1-40-40V72a40 40 0 0 1 80 0v80a40 40 0 0 1-40 40zm-289.88 88.08-58-57.96a41.04 41.04 0 0 1 58-58l57.96 58a41 41 0 0 1-57.96 57.96zM192 512a40 40 0 0 1-40 40H72a40 40 0 0 1 0-80h80a40 40 0 0 1 40 40zm30.12 231.92a41 41 0 0 1 57.96 57.96l-57.96 58a41.04 41.04 0 0 1-58-58l58-57.96zM512 832a40 40 0 0 1 40 40v80a40 40 0 0 1-80 0v-80a40 40 0 0 1 40-40zm289.88-88.08 58 57.96a41.04 41.04 0 0 1-58 58l-57.96-58a41 41 0 0 1 57.96-57.96z"}));Fg.displayName="LightColorModeIcon";const Bg=()=>S(It,{name:"dark"},()=>S("path",{d:"M524.8 938.667h-4.267a439.893 439.893 0 0 1-313.173-134.4 446.293 446.293 0 0 1-11.093-597.334A432.213 432.213 0 0 1 366.933 90.027a42.667 42.667 0 0 1 45.227 9.386 42.667 42.667 0 0 1 10.24 42.667 358.4 358.4 0 0 0 82.773 375.893 361.387 361.387 0 0 0 376.747 82.774 42.667 42.667 0 0 1 54.187 55.04 433.493 433.493 0 0 1-99.84 154.88 438.613 438.613 0 0 1-311.467 128z"}));Bg.displayName="DarkColorModeIcon";var kg=Ue({name:"ColorModeSwitch",setup(){const{config:t,isDarkMode:e,status:n}=wo(),i=Pn(),r=()=>{t.value==="switch"?n.value={light:"dark",dark:"auto",auto:"light"}[n.value]:n.value=n.value==="light"?"dark":"light"},s=async o=>{if(!(document.startViewTransition&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&!i.value)){r();return}const a=o.clientX,l=o.clientY,c=Math.hypot(Math.max(a,innerWidth-a),Math.max(l,innerHeight-l)),u=e.value;await document.startViewTransition(async()=>{r(),await Pr()}).ready,e.value!==u&&document.documentElement.animate({clipPath:e.value?[`circle(${c}px at ${a}px ${l}px)`,`circle(0px at ${a}px ${l}px)`]:[`circle(0px at ${a}px ${l}px)`,`circle(${c}px at ${a}px ${l}px)`]},{duration:400,pseudoElement:e.value?"::view-transition-old(root)":"::view-transition-new(root)"})};return()=>S("button",{type:"button",class:"vp-color-mode-switch",id:"color-mode-switch",onClick:s},[S(Og,{style:{display:n.value==="auto"?"block":"none"}}),S(Bg,{style:{display:n.value==="dark"?"block":"none"}}),S(Fg,{style:{display:n.value==="light"?"block":"none"}})])}});const Hg=()=>{const t=Qi();return te(()=>t.value.outlookLocales)};var wE=Ue({name:"ColorMode",setup(){const t=Hg(),{canToggle:e}=wo();return()=>e.value?S("div",{class:"vp-color-mode"},[S("label",{class:"vp-color-mode-title",for:"color-mode-switch"},t.value.darkmode),S(kg)]):null}});const zg=()=>S(It,{name:"cancel-fullscreen"},()=>S("path",{d:"M778.468 78.62H247.922c-102.514 0-186.027 83.513-186.027 186.027V795.08c0 102.514 83.513 186.027 186.027 186.027h530.432c102.514 0 186.71-83.513 186.026-186.027V264.647C964.494 162.02 880.981 78.62 778.468 78.62zM250.88 574.35h171.122c23.324 0 43.122 19.115 43.804 43.805v171.121c0 24.008-19.114 43.122-43.122 43.122-12.06 0-22.641-5.006-30.378-12.743s-12.743-19.115-12.743-30.379V722.83L224.597 877.91c-16.953 16.952-44.6 16.952-61.553 0-16.953-16.954-16.953-44.602 0-61.554L318.009 661.39h-66.446c-24.007 0-43.122-19.114-43.122-43.122 0-24.12 18.432-43.918 42.439-43.918zm521.899-98.873H601.657c-23.325 0-43.122-19.114-43.805-43.804V260.55c0-24.007 19.115-43.122 43.122-43.122 12.06 0 22.642 5.007 30.379 12.743s12.743 19.115 12.743 30.38v66.445l154.965-154.965c16.953-16.953 44.601-16.953 61.554 0 16.953 16.953 16.953 44.6 0 61.554L705.536 388.55h66.446c24.007 0 43.122 19.115 43.122 43.122.114 24.007-18.318 43.804-42.325 43.804z"}));zg.displayName="CancelFullScreenIcon";const Vg=()=>S(It,{name:"enter-fullscreen"},()=>S("path",{d:"M762.773 90.24h-497.28c-96.106 0-174.4 78.293-174.4 174.4v497.28c0 96.107 78.294 174.4 174.4 174.4h497.28c96.107 0 175.04-78.293 174.4-174.4V264.64c0-96.213-78.186-174.4-174.4-174.4zm-387.2 761.173H215.04c-21.867 0-40.427-17.92-41.067-41.066V649.92c0-22.507 17.92-40.427 40.427-40.427 11.307 0 21.227 4.694 28.48 11.947 7.253 7.253 11.947 17.92 11.947 28.48v62.293l145.28-145.28c15.893-15.893 41.813-15.893 57.706 0 15.894 15.894 15.894 41.814 0 57.707l-145.28 145.28h62.294c22.506 0 40.426 17.92 40.426 40.427s-17.173 41.066-39.68 41.066zM650.24 165.76h160.427c21.866 0 40.426 17.92 41.066 41.067v160.426c0 22.507-17.92 40.427-40.426 40.427-11.307 0-21.227-4.693-28.48-11.947-7.254-7.253-11.947-17.92-11.947-28.48v-62.186L625.6 450.347c-15.893 15.893-41.813 15.893-57.707 0-15.893-15.894-15.893-41.814 0-57.707l145.28-145.28H650.88c-22.507 0-40.427-17.92-40.427-40.427s17.174-41.173 39.787-41.173z"}));Vg.displayName="EnterFullScreenIcon";var Gg=Ue({name:"ToggleFullScreenButton",setup(){const{isSupported:t,isFullscreen:e,toggle:n}=Ya();return()=>t.value?S("button",{type:"button",id:"full-screen-switch",class:"full-screen",ariaPressed:e.value,onClick:()=>n()},e.value?S(zg):S(Vg)):null}}),AE=Ue({name:"ToggleFullScreenButton",setup(){const t=Hg(),{isSupported:e}=Ya();return()=>e.value?S("div",{class:"full-screen-wrapper"},[S("label",{class:"full-screen-title",for:"full-screen-switch"},t.value.fullscreen),S(Gg)]):null}}),Wg=Ue({name:"AppearanceSettings",setup(){const t=Ur(),e=Pn(),n=te(()=>!e.value&&t.value.fullscreen);return()=>S(ju,()=>[null,S(wE),n.value?S(AE):null])}}),CE=Ue({name:"AppearanceButton",setup(){const t=Ur(),{canToggle:e}=wo(),{isSupported:n}=Ya(),i=Pn(),r=nt(!1),s=te(()=>!i.value&&t.value.fullscreen&&n),o=te(()=>e.value||s.value);return Ci(()=>{r.value=!1}),()=>o.value?S("div",{class:"vp-nav-item hide-in-mobile"},e.value&&!s.value?S(kg):s.value&&!e.value?S(Gg):S("button",{type:"button",class:["vp-appearance-button",{open:r.value}],tabindex:"-1","aria-hidden":!0},[S(Ng),S("div",{class:"vp-appearance-dropdown"},S(Wg))])):null}});const rn=({config:t,iconSizing:e="both"},{emit:n,slots:i})=>{const{icon:r}=t;return S(ty,{config:t,onFocusout:()=>{n("focusout")}},{...i,before:i.before??(r?()=>S(Ct("VPIcon"),{icon:r,sizing:e}):null)})};rn.displayName="AutoLink";var RE=Ue({name:"NavbarDropdown",props:{config:{type:Object,required:!0}},slots:Object,setup(t,{slots:e}){const n=Ga(t,"config"),i=te(()=>n.value.ariaLabel??n.value.text),r=nt(!1),s=o=>{o.detail===0&&(r.value=!r.value)};return Ci(()=>{r.value=!1}),()=>S("div",{class:["vp-dropdown-wrapper",{open:r.value}]},[S("button",{type:"button",class:"vp-dropdown-title","aria-label":i.value,onClick:s},[e.title?.()??[S(Ct("VPIcon"),{icon:n.value.icon}),t.config.text],S("span",{class:"arrow"}),S("ul",{class:"vp-dropdown"},n.value.children.map((o,a)=>{const l=a===n.value.children.length-1;return S("li",{class:"vp-dropdown-item"},"children"in o?[S("h4",{class:"vp-dropdown-subtitle"},o.link?S(rn,{config:o,onFocusout:()=>{o.children.length===0&&l&&(r.value=!1)}}):o.text),S("ul",{class:"vp-dropdown-subitems"},o.children.map((c,u)=>S("li",{class:"vp-dropdown-subitem"},S(rn,{config:c,onFocusout:()=>{u===o.children.length-1&&l&&(r.value=!1)}}))))]:S(rn,{config:o,onFocusout:()=>{l&&(r.value=!1)}}))}))])])}}),PE=Ue({name:"NavScreenMenu",props:{config:{type:Object,required:!0}},setup(t){const e=Ga(t,"config"),n=Ai(),i=te(()=>e.value.ariaLabel??e.value.text),r=nt(!1),s=(o,a)=>a[a.length-1]===o;return Ci(()=>{r.value=!1}),Rt(()=>n.fullPath,()=>{r.value=!1}),()=>[S("button",{type:"button",class:["vp-nav-screen-menu-title",{active:r.value}],"aria-label":i.value,onClick:()=>{r.value=!r.value}},[S("span",{class:"text"},[S(Ct("VPIcon"),{icon:e.value.icon,sizing:"both"}),t.config.text]),S("span",{class:["arrow",r.value?"down":"end"]})]),S("ul",{class:["vp-nav-screen-menu",{hide:!r.value}]},e.value.children.map(o=>S("li",{class:"vp-nav-screen-menu-item"},"children"in o?[S("h4",{class:"vp-nav-screen-menu-subtitle"},o.link?S(rn,{config:o,onFocusout:()=>{s(o,e.value.children)&&o.children.length===0&&(r.value=!1)}}):o.text),S("ul",{class:"vp-nav-screen-menu-subitems"},o.children.map(a=>S("li",{class:"vp-nav-screen-menu-subitem"},S(rn,{config:a,onFocusout:()=>{s(a,o.children)&&s(o,e.value.children)&&(r.value=!1)}}))))]:S(rn,{config:o,onFocusout:()=>{s(o,e.value.children)&&(r.value=!1)}}))))]}});const Xg=(t,e="")=>xt(t)?Ia(gr(e,t)):"children"in t?{...t,...t.link&&Tc(t.link)?{link:bi(gr(e,t.link)).path}:{},children:t.children.map(n=>Xg(n,gr(e,t.prefix)))}:{...t,link:Tc(t.link)?bi(gr(e,t.link)).path:t.link},$g=()=>{const t=Qi();return te(()=>(t.value.navbar||[]).map(e=>Xg(e)))};var LE=Ue({name:"NavScreenLinks",setup(){const t=$g();return()=>t.value.length?S("nav",{class:"nav-screen-links"},t.value.map(e=>S("div",{class:"navbar-links-item"},"children"in e?S(PE,{config:e}):S(rn,{config:e})))):null}});const{mobileBreakPoint:DE,pcBreakPoint:IE}=of,nd=t=>t.endsWith("px")?Number(t.slice(0,-2)):null,uf=()=>{const t=nt(!1),e=nt(!1),n=()=>{t.value=window.innerWidth<=(nd(DE)??719),e.value=window.innerWidth>=(nd(IE)??1440)};return it("resize",n,!1),it("orientationchange",n,!1),Et(()=>{n()}),{isMobile:t,isPC:e}};var UE=Ue({name:"NavScreen",props:{show:Boolean},slots:Object,setup(t,{slots:e}){const{isMobile:n}=uf(),i=Je(),r=nf(i);return Ci(()=>{r.value=!1}),Rt(n,s=>{!s&&t.show&&(r.value=!1)}),Et(()=>{i.value=document.body}),ii(()=>{r.value=!1}),()=>S(Ss,{name:"fade-in-down",onEnter:()=>{r.value=!0},onAfterLeave:()=>{r.value=!1}},()=>t.show?S("div",{id:"nav-screen",class:"vp-nav-screen"},S("div",{class:"vp-nav-screen-container"},[e.navScreenTop?.(),S(LE),S("div",{class:"vp-appearance-wrapper"},S(Wg)),e.navScreenBottom?.()])):null)}}),NE=Ue({name:"NavbarBrand",setup(){const{routeLocale:t,siteLocale:e,themeLocale:n}=Yt(),i=te(()=>n.value.home??t.value),r=te(()=>e.value.title),s=te(()=>n.value.navbarTitle??r.value),o=te(()=>n.value.logo?zt(n.value.logo):null),a=te(()=>n.value.logoDark?zt(n.value.logoDark):null);return()=>S(Lr,{to:i.value,class:"vp-brand","aria-label":n.value.routerLocales.home},()=>[o.value?S("img",{class:["vp-nav-logo",{light:!!a.value}],src:o.value,alt:""}):null,a.value?S("img",{class:["vp-nav-logo dark"],src:a.value,alt:""}):null,s.value?S("span",{class:["vp-site-name",{"hide-in-pad":o.value&&(n.value.hideSiteNameOnMobile??!0)}]},s.value):null])}}),OE=Ue({name:"NavbarLinks",setup(){const t=$g();return()=>t.value.length?S("nav",{class:"vp-nav-links"},t.value.map(e=>S("div",{class:"vp-nav-item hide-in-mobile"},"children"in e?S(RE,{config:e}):S(rn,{config:e,iconSizing:"height"})))):null}});const FE=()=>{const t=Qi(),e=te(()=>t.value.repo),n=te(()=>e.value?JM(e.value):null),i=te(()=>e.value?sf(e.value):null),r=te(()=>n.value?t.value.repoLabel??i.value??"Source":null);return te(()=>!n.value||!r.value||t.value.repoDisplay===!1?null:{type:i.value??"Source",label:r.value,link:n.value})};var BE=Ue({name:"RepoLink",setup(){const t=FE();return()=>t.value?S("div",{class:"vp-nav-item vp-action"},S("a",{class:"vp-action-link",href:t.value.link,target:"_blank",rel:"noopener noreferrer","aria-label":t.value.label},S(QM,{type:t.value.type,style:{width:"1.25rem",height:"1.25rem",verticalAlign:"middle"}}))):null}});const jg=({active:t=!1},{emit:e})=>S("button",{type:"button",class:["vp-toggle-navbar-button",{"is-active":t}],"aria-label":"Toggle Navbar","aria-expanded":t,"aria-controls":"nav-screen",onClick:()=>{e("toggle")}},S("span",[S("span",{class:"vp-top"}),S("span",{class:"vp-middle"}),S("span",{class:"vp-bottom"})]));jg.displayName="ToggleNavbarButton";const Ac=(t,{emit:e})=>S("button",{type:"button",class:"vp-toggle-sidebar-button",title:"Toggle Sidebar",onClick:()=>{e("toggle")}},S("span",{class:"icon"}));Ac.displayName="ToggleSidebarButton",Ac.emits=["toggle"];var kE=Ue({name:"NavBar",emits:["toggleSidebar"],slots:Object,setup(t,{emit:e,slots:n}){const i=Qi(),{isMobile:r}=uf(),s=nt(!1),o=te(()=>{const{navbarAutoHide:u="mobile"}=i.value;return u!=="none"&&(u==="always"||r.value)}),a=te(()=>i.value.navbarLayout??{start:["Brand"],center:["Links"],end:["Language","Repo","Outlook","Search"]}),l={Brand:NE,Language:pa,Links:OE,Repo:BE,Outlook:CE,Search:Cn("SearchBox")?Ct("SearchBox"):pa},c=u=>l[u]??(Cn(u)?Ct(u):pa);return Ci(()=>{s.value=!1}),Rt(r,u=>{u||(s.value=!1)}),()=>[S("header",{key:"navbar",id:"navbar",class:["vp-navbar",{"auto-hide":o.value}],"vp-navbar":""},[S("div",{class:"vp-navbar-start"},[S(Ac,{onToggle:()=>{s.value&&(s.value=!1),e("toggleSidebar")}}),a.value.start?.map(u=>S(c(u)))]),S("div",{class:"vp-navbar-center"},[a.value.center?.map(u=>S(c(u)))]),S("div",{class:"vp-navbar-end"},[a.value.end?.map(u=>S(c(u))),S(jg,{active:s.value,onToggle:()=>{s.value=!s.value}})])]),S(UE,{show:s.value},n)]}});const ff=(t,e)=>e.activeMatch?new RegExp(e.activeMatch,"u").test(t.path):yg(t,e.link);var HE=Ue({name:"SidebarChild",props:{config:{type:Object,required:!0}},setup(t){const e=Ai();return()=>xt(t.config.link)?S(rn,{class:["vp-sidebar-link",{active:ff(e,t.config)}],config:{...t.config,exact:!0}}):S("p",t,[S(Ct("VPIcon"),{icon:t.config.icon,sizing:"both"}),t.config.text])}});const hf=(t,e)=>"children"in e?!!e.prefix&&yg(t,e.prefix)||e.children.some(n=>hf(t,n)):ff(t,e);var zE=Ue({name:"SidebarGroup",props:{config:{type:Object,required:!0},open:{type:Boolean,required:!0}},emits:["toggle"],setup(t,{emit:e}){const n=Ai(),i=nt(!1),r=te(()=>hf(n,t.config)),s=te(()=>ff(n,t.config)),o=te(()=>t.open||t.config.expanded&&!i.value);return()=>{const{collapsible:a,children:l=[],icon:c,prefix:u,link:f,text:h}=t.config;return S("section",{class:"vp-sidebar-group"},[S(a?"button":"p",{class:["vp-sidebar-header",{clickable:a||f,exact:s.value,active:r.value}],...a?{type:"button",onClick:()=>{i.value=!0,e("toggle")}}:{}},[S(Ct("VPIcon"),{icon:c,sizing:"both"}),f?S(rn,{class:"vp-sidebar-title no-external-link-icon",config:{text:h,link:f}}):S("span",{class:"vp-sidebar-title"},h),a?S("span",{class:["vp-arrow",o.value?"down":"end"]}):null]),o.value||!a?S(qg,{key:u,config:l}):null])}}}),qg=Ue({name:"SidebarLinks",props:{config:{type:Array,required:!0}},setup(t){const e=Ai(),n=$S(),i=nt(-1),r=s=>{i.value=s===i.value?-1:s};return Rn(n,()=>{const s=t.config.findIndex(o=>hf(e,o));i.value=s},{flush:"post"}),()=>S("ul",{class:"vp-sidebar-links"},t.config.map((s,o)=>S("li","children"in s?S(zE,{config:s,open:o===i.value,onToggle:()=>{r(o)}}):S(HE,{config:s}))))}}),VE=Ue({name:"SideBar",slots:Object,setup(t,{slots:e}){const n=Ai(),i=cf(),r=Je();return Et(()=>{Rn(()=>n.hash,s=>{const o=document.querySelector(`.vp-sidebar a.vp-sidebar-link[href="${n.path}${s}"]`);if(!o)return;const{top:a,height:l}=r.value.getBoundingClientRect(),{top:c,height:u}=o.getBoundingClientRect();c<a?o.scrollIntoView(!0):c+u>a+l&&o.scrollIntoView(!1)})}),()=>S("aside",{ref:r,key:"sidebar",id:"sidebar",class:"vp-sidebar","vp-sidebar":""},[e.sidebarTop?.(),e.sidebarItems?.(i.value)??S(qg,{config:i.value}),e.sidebarBottom?.()])}}),Yg=Ue({name:"MainLayout",props:{containerClass:String,noNavbar:Boolean,noSidebar:Boolean,noToc:Boolean},slots:Object,setup(t,{slots:e}){const{frontmatter:n,theme:i,themeLocale:r}=Yt(),{isMobile:s,isPC:o}=uf(),a=Pn(),[l,c]=Da(!1),[u,f]=Da(!1),h=cf(),d=Je(),g=nf(d),_=nt(!1),m=te(()=>t.noNavbar||n.value.navbar===!1||r.value.navbar===!1?!1:!!(r.value.logo??r.value.repo??r.value.navbar)),p=te(()=>n.value.externalLinkIcon??i.value.externalLinkIcon??!0),E=te(()=>!t.noToc&&!n.value.home&&!!(n.value.toc??r.value.toc??!0)),x={x:0,y:0},y=P=>{x.x=P.changedTouches[0].clientX,x.y=P.changedTouches[0].clientY},C=P=>{const U=P.changedTouches[0].clientX-x.x,b=P.changedTouches[0].clientY-x.y;Math.abs(U)>Math.abs(b)*1.5&&Math.abs(U)>40&&(U>0&&x.x<=80?c(!0):c(!1))};let R=0;return it("scroll",Zm(()=>{const P=window.scrollY;P<=58||P<R?_.value=!1:R+200<P&&!l.value&&(_.value=!0),R=P},300,!0)),Rt(s,P=>{P||c(!1)}),Rt(l,P=>{g.value=P}),Ci(()=>{c(!1)}),Et(()=>{d.value=document.body}),ii(()=>{g.value=!1}),()=>{const P=e.sidebarTop?.(),U=e.sidebarItems?.(h.value),b=e.sidebarBottom?.(),T=ps(P)&&ps(U)&&ps(b),L=t.noSidebar||n.value.sidebar===!1||(n.value.home||h.value.length===0)&&T;return S(Cn("GlobalEncrypt")?Ct("GlobalEncrypt"):Yu,()=>S("div",{class:["theme-container",{"hide-navbar":_.value,"no-navbar":!m.value,"sidebar-collapsed":!s.value&&!o.value&&u.value,"sidebar-open":s.value&&l.value,"no-sidebar":L,"external-link-icon":p.value,pure:a.value,"has-toc":E.value},t.containerClass??"",n.value.containerClass??""],"vp-container":"",onTouchStart:y,onTouchEnd:C},[m.value?S(kE,{onToggleSidebar:()=>c()},e):null,S(Ss,{name:"fade-in"},()=>l.value?S("div",{class:"vp-sidebar-mask",onClick:()=>c(!1)}):null),S(Ss,{name:"fade-in"},()=>s.value?null:S("div",{class:"toggle-sidebar-wrapper",onClick:()=>f()},S("span",{class:["arrow",u.value?"end":"start"]}))),L?null:S(VE,null,e),e.default(),S(TE)]))}}});const Kg=()=>{const{frontmatter:t,themeLocale:e}=Yt(),n=te(()=>t.value.changelog??((e.value.changelog??!1)&&!t.value.home)),i=te(()=>{const{contributors:s,home:o}=t.value;return Ti(s)?o?!1:e.value.contributors??!0:s??(o?!1:e.value.contributors??!0)}),r=te(()=>t.value.lastUpdated??e.value.lastUpdated??!0);return{changelog:n,contributors:i,lastUpdated:r}};var df=Ue({name:"MarkdownContent",props:{custom:Boolean},slots:Object,setup(t,{slots:e}){const n=Ur(),{changelog:i,contributors:r}=Kg(),s=nt(),o=Jy(s,{delayEnter:Sy(n.value.focus)?n.value.focus:1500,delayLeave:0}),a=te(()=>!!(n.value.focus??n.value.pure)&&o.value);return Et(()=>{const l=document.documentElement;Rn(a,c=>{c?l.classList.add("is-focusing"):l.classList.remove("is-focusing")})}),()=>S("div",{class:{custom:t.custom},"vp-content":""},[e.contentBefore?.(),S(Vm,{ref:s,id:"markdown-content"}),e.contentAfter?.(),i.value&&Cn("GitChangelog")?S(Ct("GitChangelog")):null,r.value==="content"&&Cn("GitContributors")?S(Ct("GitContributors")):null])}}),Zg=Ue({name:"SkipLink",props:{content:{type:String,default:"main-content"}},setup(t){const e=Qi(),n=Je(),i=({target:r})=>{const s=document.querySelector(r.hash);if(s){const o=()=>{s.removeAttribute("tabindex"),s.removeEventListener("blur",o)};s.setAttribute("tabindex","-1"),s.addEventListener("blur",o),s.focus(),window.scrollTo(0,0)}};return Ci(()=>{n.value?.focus()}),()=>[S("span",{ref:n,tabindex:"-1"}),S("a",{href:`#${t.content}`,class:"vp-skip-link sr-only",onClick:i},e.value.routerLocales.skipToContent)]}});const Cc=()=>S(It,{name:"slide-down"},()=>S("path",{d:"M108.775 312.23c13.553 0 27.106 3.734 39.153 11.806l375.205 250.338 363.641-252.808c32.587-21.624 76.499-12.83 98.123 19.757 21.685 32.467 12.95 76.56-19.576 98.184l-402.854 278.89c-23.733 15.901-54.694 15.962-78.547.12L69.501 442.097c-32.647-21.685-41.441-65.777-19.817-98.304 13.734-20.54 36.201-31.563 59.09-31.563Z"}));Cc.displayName="SlideDownIcon";const Jg=(t,{emit:e})=>S("button",{type:"button",class:"vp-hero-slide-down-button",onClick:()=>e("click")},[S(Cc),S(Cc)]);Jg.displayName="HeroSlideDownButton";var An=Ue({name:"DropTransition",props:{delay:{type:Number,default:0},duration:{type:Number,default:.25},group:Boolean,appear:Boolean},slots:Object,setup(t,{slots:e}){const n=r=>{r.style.transition=`transform ${t.duration}s ease-in-out ${t.delay}s, opacity ${t.duration}s ease-in-out ${t.delay}s`,r.style.transform="translateY(-20px)",r.style.opacity="0"},i=r=>{r.style.transform="translateY(0)",r.style.opacity="1"};return()=>{const r={name:"drop",appear:t.appear,onAppear:n,onAfterAppear:i,onEnter:n,onAfterEnter:i,onBeforeLeave:n};return t.group?S(mx,r,e.default):S(Ss,r,e.default)}}});let Tl=null,wl=null;const Rc={wait:()=>Tl,pending:()=>{Tl=new Promise(t=>{wl=t})},resolve:()=>{wl?.(),Tl=null,wl=null}};var GE=Ue({name:"MainFadeInUpTransition",slots:Object,setup(t,{slots:e}){const n=Pn();return()=>n.value?S(Yu,e.default):S(Ss,{name:"fade-in-up",mode:"out-in",onBeforeEnter:Rc.resolve,onBeforeLeave:Rc.pending},e.default)}}),WE=Ue({name:"PageTitle",setup(){const{frontmatter:t,page:e,themeLocale:n}=Yt(),{info:i,items:r}=uE();return()=>S("div",{class:"vp-page-title"},[S("h1",[n.value.titleIcon===!1?null:S(Ct("VPIcon"),{icon:t.value.icon}),e.value.title]),S(xE,{info:i.value,items:r.value}),S("hr")])}});const XE=(t,e)=>{const n=t.replace(e,"/").split("/"),i=[];let r=Gu(e);return n.forEach((s,o)=>{o!==n.length-1?(r+=`${s}/`,i.push({link:r,name:s||"Home"})):s!==""&&(r+=s,i.push({link:r,name:s}))}),i};var $E=Ue({name:"BreadCrumb",setup(){const{frontmatter:t,page:e,routeLocale:n,routePath:i,themeLocale:r}=Yt(),s=Je([]),o=te(()=>(t.value.breadcrumb??r.value.breadcrumb??!0)&&s.value.length>1),a=te(()=>t.value.breadcrumbIcon??r.value.breadcrumbIcon??!0),l=()=>{const c=XE(e.value.path,n.value).map(({link:u,name:f})=>{const{path:h,meta:d,notFound:g}=bi(u);return g||d.breadcrumbExclude?null:{title:d.shortTitle||d.title||f,icon:d.icon,path:h}}).filter(u=>u!==null);c.length>1&&(s.value=c)};return Et(()=>{Rn(i,l)}),()=>S("nav",{class:["vp-breadcrumb",{disable:!o.value}]},o.value?S("ol",{vocab:"https://schema.org/",typeof:"BreadcrumbList"},s.value.map((c,u)=>S("li",{class:{"is-active":s.value.length-1===u},property:"itemListElement",typeof:"ListItem"},[S(Lr,{to:c.path,property:"item",typeof:"WebPage"},()=>[a.value?S(Ct("VPIcon"),{icon:c.icon}):null,S("span",{property:"name"},c.title||"Unknown")]),S("meta",{property:"position",content:u+1})]))):[])}});const id=(t,e)=>t===!1?t:Eo(t)?{...t,link:Ia(t.link,!0,e).link}:xt(t)?Ia(t,!0,e):null,Pc=(t,e,n)=>{const i=t.findIndex(s=>s.link===e);if(i!==-1){if(!t[i+n])return null;const s=t[i+n];return s.link?s:"prefix"in s&&!bi(s.prefix).notFound?{...s,link:s.prefix}:null}for(const s of t)if("children"in s){const o=Pc(s.children,e,n);if(o)return o}const r=t.findIndex(s=>"prefix"in s&&s.prefix===e);if(r!==-1){if(!t[r+n])return null;const s=t[r+n];return s.link?s:"prefix"in s&&!bi(s.prefix).notFound?{...s,link:s.prefix}:null}return null},jE=()=>{const{frontmatter:t,routePath:e,themeLocale:n}=Yt(),i=cf(),r=te(()=>{const o=id(t.value.prev,e.value);return o===!1?null:o??(n.value.prevLink===!1?null:Pc(i.value,e.value,-1))}),s=te(()=>{const o=id(t.value.next,e.value);return o===!1?null:o??(n.value.nextLink===!1?null:Pc(i.value,e.value,1))});return{prevLink:r,nextLink:s}};var qE=Ue({name:"PageNav",setup(){const t=Ln(),e=af(),{prevLink:n,nextLink:i}=jE();return it("keydown",r=>{r.altKey&&(r.key==="ArrowRight"?i.value&&(e(i.value.link),r.preventDefault()):r.key==="ArrowLeft"&&n.value&&(e(n.value.link),r.preventDefault()))}),()=>n.value||i.value?S("nav",{class:"vp-page-nav"},[n.value?S(rn,{class:"prev",config:n.value},()=>[S("div",{class:"hint"},[S("span",{class:"arrow start"}),t.value.prev]),S("div",{class:"link"},[S(Ct("VPIcon"),{icon:n.value?.icon}),n.value?.text])]):null,i.value?S(rn,{class:"next",config:i.value},()=>[S("div",{class:"hint"},[t.value.next,S("span",{class:"arrow end"})]),S("div",{class:"link"},[i.value?.text,S(Ct("VPIcon"),{icon:i.value?.icon})])]):null]):null}}),YE=Ue({name:"PrintButton",setup(){const t=Ln(),e=Ur();return()=>e.value.print===!1?null:S("button",{type:"button",class:"print-button",title:t.value.print,onClick:()=>{window.print()}},S(Cg))}});const rd={selector:[...Array.from({length:6}).map((t,e)=>`#markdown-content > h${e+1}`),"[vp-content] > h2"].join(", "),levels:"deep",ignore:[".vp-badge",".vp-icon"]};var KE=Ue({name:"TOC",props:{items:Array},slots:Object,setup(t,{slots:e}){const{frontmatter:n,themeLocale:i}=Yt(),r=te(()=>{const m=n.value.toc??i.value.toc;return Eo(m)?{...rd,...m}:m??!0?rd:void 0}),s=by(r),o=Ai(),a=Ln(),[l,c]=Da(),u=Je(),f=nt("-2rem"),h=m=>{u.value?.scrollTo({top:m,behavior:"smooth"})},d=()=>{if(u.value){const m=document.querySelector(".vp-toc-item.active");m?f.value=`${m.getBoundingClientRect().top-u.value.getBoundingClientRect().top+u.value.scrollTop}px`:f.value="-2rem"}else f.value="-2rem"};Et(()=>{Rn(()=>o.hash,m=>{if(u.value){const p=document.querySelector(`#toc a.vp-toc-link[href$="${m}"]`);if(!p)return;const{top:E,height:x}=u.value.getBoundingClientRect(),{top:y,height:C}=p.getBoundingClientRect();y<E?h(u.value.scrollTop+y-E):y+C>E+x&&h(u.value.scrollTop+y+C-E-x)}},{flush:"post"}),Rn(()=>o.fullPath,d,{flush:"post"})});const g=({title:m,level:p,slug:E})=>S(Lr,{to:`#${E}`,class:["vp-toc-link",`level${p}`],onClick:()=>{c()}},()=>m),_=m=>m.length?S("ul",{class:"vp-toc-list"},m.map(p=>{const E=_(p.children);return[S("li",{class:["vp-toc-item",{active:o.hash===`#${p.slug}`}]},g(p)),E?S("li",E):null]})):null;return()=>r.value||t.items?.length?S(ju,()=>{const m=t.items?.length?_(t.items):_(s.value),p=e.toc?.(s.value)??(m?[S("div",{class:"vp-toc-header",onClick:()=>{c()}},[a.value.toc,S(YE),S("div",{class:["arrow",l.value?"down":"end"]})]),S("div",{class:["vp-toc-wrapper",l.value?"open":""],ref:u},[m,S("div",{class:"vp-toc-marker",style:{top:f.value}})])]:null),E=e.tocBefore?.(),x=e.tocAfter?.();return ps(p)&&ps(E)&&ps(x)?null:S("div",{class:"vp-toc-placeholder"},[S("aside",{id:"toc","vp-toc":""},[E,p,x])])}):null}});const Qg=()=>S(It,{name:"edit"},()=>[S("path",{d:"M430.818 653.65a60.46 60.46 0 0 1-50.96-93.281l71.69-114.012 7.773-10.365L816.038 80.138A60.46 60.46 0 0 1 859.225 62a60.46 60.46 0 0 1 43.186 18.138l43.186 43.186a60.46 60.46 0 0 1 0 86.373L588.879 565.55l-8.637 8.637-117.466 68.234a60.46 60.46 0 0 1-31.958 11.229z"}),S("path",{d:"M728.802 962H252.891A190.883 190.883 0 0 1 62.008 771.98V296.934a190.883 190.883 0 0 1 190.883-192.61h267.754a60.46 60.46 0 0 1 0 120.92H252.891a69.962 69.962 0 0 0-69.098 69.099V771.98a69.962 69.962 0 0 0 69.098 69.098h475.911A69.962 69.962 0 0 0 797.9 771.98V503.363a60.46 60.46 0 1 1 120.922 0V771.98A190.883 190.883 0 0 1 728.802 962z"})]);Qg.displayName="EditIcon";const ZE={GitHub:":repo/edit/:branch/:path",GitLab:":repo/-/edit/:branch/:path",Gitee:":repo/edit/:branch/:path",Bitbucket:":repo/src/:branch/:path?mode=edit&spa=0&at=:branch&fileviewer=file-view-default"},JE=({docsRepo:t,docsBranch:e,docsDir:n,filePathRelative:i,editLinkPattern:r})=>{if(!i)return null;const s=sf(t);let o;return r?o=r:s!==null&&(o=ZE[s]),o?o.replace(/:repo/u,Mo(t)?t:`https://github.com/${t}`).replace(/:branch/u,e).replace(/:path/u,Tm(`${Gu(n)}/${i}`)):null},QE=()=>{const{frontmatter:t,page:e,themeLocale:n}=Yt(),i=Ln();return te(()=>{const{repo:r,docsRepo:s=r,docsBranch:o="main",docsDir:a="",editLink:l,editLinkPattern:c=""}=n.value;if(!(t.value.editLink??l??!0)||!s)return null;const u=JE({docsRepo:s,docsBranch:o,docsDir:a,editLinkPattern:c,filePathRelative:e.value.filePathRelative});return u?{text:i.value.editLink,link:u}:null})};var eb=Ue({name:"PageMeta",setup(){const t=Kg(),e=ng(),n=QE(),i=c1(t.lastUpdated),r=Ln();return()=>S("footer",{class:"vp-page-meta"},[n.value?S("div",{class:"vp-meta-item edit-link"},S(rn,{class:"vp-meta-label",config:n.value},{before:()=>S(Qg)})):null,S("div",{class:"vp-meta-item git-info"},[(!t.changelog.value||!Cn("GitChangelog"))&&i.value?S("div",{class:"update-time"},[S("span",{class:"vp-meta-label"},i.value.locale),S("time",{class:"vp-meta-info",datetime:i.value.iso,"data-allow-mismatch":""},i.value.text)]):null,t.contributors.value&&t.contributors.value!=="content"&&e.value.length?S("div",{class:"contributors"},[S("span",{class:"vp-meta-label"},`${r.value.contributors}: `),e.value.map(({email:s,name:o},a,l)=>[S("span",{class:"vp-meta-info",title:`email: ${s}`},o),a!==l.length-1?",":""])]):null])])}}),tb=Ue({name:"PageContent",slots:Object,setup(t,{slots:e}){const{frontmatter:n}=Yt(),{isDarkMode:i}=wo();return()=>S("main",{id:"main-content",class:"vp-page"},S(Cn("LocalEncrypt")?Ct("LocalEncrypt"):Yu,()=>[e.pageTop?.(),n.value.cover?S("div",{class:"page-cover"},S("img",{src:zt(n.value.cover),alt:"","no-view":""})):null,S($E),S(WE),S(KE,null,e),e.content?.()??S(df,null,e),S(eb),S(qE),Cn("CommentService")?S(Ct("CommentService"),{darkmode:i.value}):null,e.pageBottom?.()]))}});const Lc=(t,{slots:e})=>{const{bgImage:n,bgImageDark:i,bgImageStyle:r,color:s,description:o,image:a,imageDark:l,header:c,features:u=[]}=t;return S("div",{class:"vp-feature-wrapper"},[n?S("div",{class:["vp-feature-bg",{light:i}],style:[{"background-image":`url(${n})`},r]}):null,i?S("div",{class:"vp-feature-bg dark",style:[{"background-image":`url(${i})`},r]}):null,S("div",{class:"vp-feature",style:s?{color:s}:{}},[e.image?.(t)??[a?S("img",{class:["vp-feature-image",{light:l}],src:zt(a),alt:""}):null,l?S("img",{class:"vp-feature-image dark",src:zt(l),alt:""}):null],e.info?.(t)??[c?S("h2",{class:"vp-feature-header"},c):null,o?S("div",{class:"vp-feature-description",innerHTML:o}):null],u.length?S("div",{class:"vp-features"},u.map(({icon:f,title:h,details:d,link:g})=>{const _=[S("h3",{class:"vp-feature-title"},[S(Ct("VPIcon"),{icon:f}),S("span",{innerHTML:h})]),S("div",{class:"vp-feature-details",innerHTML:d})];return g?Vu(g)?S("a",{class:"vp-feature-item link",href:g,"aria-label":h,target:"_blank"},_):S(Lr,{class:"vp-feature-item link",to:g,"aria-label":h},()=>_):S("div",{class:"vp-feature-item"},_)})):null])])};Lc.displayName="FeaturePanel";var nb=Ue({name:"HeroInfo",slots:Object,setup(t,{slots:e}){const{frontmatter:n,siteLocale:i}=Yt(),r=te(()=>{const{heroText:l,tagline:c,heroStyle:u,heroFullScreen:f=!1}=n.value;return{text:l??(i.value.title||"Hello"),tagline:c??i.value.description,style:u??null,isFullScreen:f}}),s=te(()=>{const{heroImage:l,heroImageDark:c,heroAlt:u,heroImageStyle:f}=n.value;return{image:l?zt(l):null,imageDark:c?zt(c):null,style:f??null,alt:u??""}}),o=te(()=>{const{bgImage:l,bgImageDark:c,bgImageStyle:u}=n.value;return{image:xt(l)?zt(l):null,imageDark:xt(c)?zt(c):null,style:u??null}}),a=te(()=>n.value.actions??[]);return()=>S("header",{class:["vp-hero-info-wrapper",{"hero-fullscreen":r.value.isFullScreen}],style:r.value.style},[e.heroBg?.(o.value)??[o.value.image?S("div",{class:["vp-hero-mask",{light:o.value.imageDark}],style:[{"background-image":`url(${o.value.image})`},o.value.style]}):null,o.value.imageDark?S("div",{class:"vp-hero-mask dark",style:[{"background-image":`url(${o.value.imageDark})`},o.value.style]}):null],S("div",{class:"vp-hero-info"},[e.heroLogo?.(s.value)??S(An,{appear:!0,group:!0},()=>{const{image:l,imageDark:c,style:u,alt:f}=s.value;return[l?S("img",{key:"light",class:["vp-hero-image",{light:c}],style:u,src:l,alt:f}):null,c?S("img",{key:"dark",class:"vp-hero-image dark",style:u,src:c,alt:f}):null]}),e.heroInfo?.(r.value)??S("div",{class:"vp-hero-infos"},[r.value.text?S(An,{appear:!0,delay:.04},()=>S("h1",{id:"main-title",class:"vp-hero-title"},r.value.text)):null,r.value.tagline?S(An,{appear:!0,delay:.08},()=>S("div",{id:"main-description",innerHTML:r.value.tagline})):null,a.value.length?S(An,{appear:!0,delay:.12},()=>S("p",{class:"vp-hero-actions"},a.value.map(l=>S(rn,{class:["vp-hero-action",l.type??"default","no-external-link-icon"],config:l})))):null])]),r.value.isFullScreen?S(Jg,{onClick:()=>window.scrollTo({top:window.innerHeight-(document.querySelector("[vp-navbar]")?.clientHeight??0),behavior:"smooth"})}):null])}});const ev=(t,{slots:e})=>{const{bgImage:n,bgImageDark:i,bgImageStyle:r,color:s,description:o,image:a,imageDark:l,header:c,highlights:u=[],type:f="un-order"}=t;return S("div",{class:"vp-highlight-wrapper",style:s?{color:s}:{}},[n?S("div",{class:["vp-highlight-bg",{light:i}],style:[{"background-image":`url(${n})`},r]}):null,i?S("div",{class:"vp-highlight-bg dark",style:[{"background-image":`url(${i})`},r]}):null,S("div",{class:"vp-highlight"},[e.image?.(t)??[a?S("img",{class:["vp-highlight-image",{light:l}],src:zt(a),alt:""}):null,l?S("img",{class:"vp-highlight-image dark",src:zt(l),alt:""}):null],e.info?.(t)??[S("div",{class:"vp-highlight-info-wrapper"},S("div",{class:"vp-highlight-info"},[c?S("h2",{class:"vp-highlight-header",innerHTML:c}):null,o?S("div",{class:"vp-highlight-description",innerHTML:o}):null,e.highlights?.(u)??S(f==="order"?"ol":f==="no-order"?"dl":"ul",{class:"vp-highlights"},u.map(({icon:h,title:d,details:g,link:_})=>{const m=[S(f==="no-order"?"dt":"h3",{class:"vp-highlight-title"},[h?S(Ct("VPIcon"),{class:"vp-highlight-icon",icon:h}):null,S("span",{innerHTML:d})]),g?S(f==="no-order"?"dd":"div",{class:"vp-highlight-details",innerHTML:g}):null];return S(f==="no-order"?"div":"li",{class:["vp-highlight-item-wrapper",{link:_}]},_?Vu(_)?S("a",{class:"vp-highlight-item link",href:_,"aria-label":d,target:"_blank"},m):S(Lr,{class:"vp-highlight-item link",to:_,"aria-label":d},()=>m):S("div",{class:"vp-highlight-item"},m))}))]))]])])};ev.displayName="HighlightSection";var ib=Ue({name:"HomePage",slots:Object,setup(t,{slots:e}){const n=Ji();return()=>{const{features:i,highlights:r}=n.value;return S("main",{id:"main-content",class:"vp-page vp-project-home","aria-labelledby":n.value.heroText===""?"":"main-title"},[e.heroBefore?.(),S(nb,null,e),e.heroAfter?.(),Ti(r)?r.map(s=>"features"in s?S(Lc,s):S(ev,s)):Ti(i)?S(An,{appear:!0,delay:.24},()=>S(Lc,{features:i})):null,e.content?.()??S(An,{appear:!0,delay:.32},()=>S(df,null,e))])}}}),rb=Ue({name:"PortfolioHero",slots:Object,setup(t,{slots:e}){const n=Mg(),i=Ji(),r=nt(0),s=te(()=>i.value.titles?.[r.value]??""),o=nt(""),a=te(()=>{const{name:h,avatar:d,avatarDark:g,avatarAlt:_,avatarStyle:m}=i.value;return{name:h??n.value.name,avatar:d?zt(d):null,avatarDark:g?zt(g):null,alt:(_||h)??"",style:m??null}}),l=te(()=>{const{bgImage:h,bgImageDark:d,bgImageStyle:g}=i.value;return{image:xt(h)?zt(h):null,imageDark:xt(d)?zt(d):null,style:g??null}}),c=te(()=>{const{welcome:h,name:d,titles:g=[],medias:_}=i.value;return{name:d??n.value.name,welcome:h??"👋 Hi There, I'm",title:o.value,titles:g,medias:_??null}}),u=()=>{o.value="";let h=0,d=!1;const g=async()=>{if(!d)if(o.value+=s.value[h],h+=1,await Pr(),h<s.value.length)setTimeout(()=>{g()},150);else{const _=c.value.titles.length;setTimeout(()=>{r.value=_<=1||r.value===c.value.titles.length-1?0:r.value+1},1e3)}};return g(),()=>{d=!0}};let f;return Et(()=>{Rn(s,()=>{f?.(),f=u()})}),()=>S("section",{id:"portfolio",class:["vp-portfolio",{bg:l.value.image}]},[e.portfolioBg?.(l.value)??[l.value.image?S("div",{class:["vp-portfolio-mask",{light:l.value.imageDark}],style:[{background:`url(${l.value.image}) center/cover no-repeat`},l.value.style]}):null,l.value.imageDark?S("div",{class:"vp-portfolio-mask dark",style:[{background:`url(${l.value.imageDark}) center/cover no-repeat`},l.value.style]}):null],e.portfolioAvatar?.(a.value)??S("div",{class:"vp-portfolio-avatar"},[S(An,{delay:.04},()=>{const{avatar:h,avatarDark:d,name:g,alt:_,style:m}=a.value;return[h?S("img",{key:"light",class:{light:d},src:h,title:g,alt:_,style:m}):null,d?S("img",{key:"dark",class:"dark",src:d,title:g,alt:_,style:m}):null]})]),S("div",{class:"vp-portfolio-container"},e.portfolioInfo?.(c.value)??S("div",{class:"vp-portfolio-info"},[S(An,{appear:!0,delay:.08},()=>S("h6",{class:"vp-portfolio-welcome"},c.value.welcome)),S(An,{appear:!0,delay:.12},()=>S("h1",{class:"vp-portfolio-name",id:"main-title"},c.value.name)),S(An,{appear:!0,delay:.16},()=>S("h2",{class:"vp-portfolio-title"},o.value)),S(An,{appear:!0,delay:.2},()=>c.value.medias?S("div",{class:"vp-portfolio-medias"},c.value.medias.map(({name:h,url:d,icon:g})=>S("a",{class:"vp-portfolio-media",href:d,rel:"noopener noreferrer",target:"_blank",title:h},S(Ct("VPIcon"),{icon:g,sizing:"both"})))):Cn("SocialMedias")?S(Ct("SocialMedias")):null)]))])}}),sb=Ue({name:"PortfolioHome",slots:Object,setup(t,{slots:e}){const n=Ji();return()=>{const i=n.value.content??"portfolio";return S("main",{id:"main-content",class:"vp-page vp-portfolio-home","aria-labelledby":"main-title"},[S(rb,null,e),i==="none"?null:e.content?.()??S("div",S(An,{appear:!0,delay:.24},()=>S(df,{class:{"vp-portfolio-content":i==="portfolio"}},e)))])}}}),ob=Ue({name:"Layout",slots:Object,setup(t,{slots:e}){const{frontmatter:n,page:i}=Yt();return()=>[S(Zg),S(Yg,null,{...e,default:e.default??(()=>n.value.portfolio?S(sb,null,e):n.value.home?S(ib,null,e):S(GE,()=>S(tb,{key:i.value.path},e))),navScreenBottom:e.navScreenBottom??(Cn("BloggerInfo")?()=>S(Ct("BloggerInfo")):null)})]}}),ab=Ue({name:"NotFound",slots:Object,setup(t,{slots:e}){const{routeLocale:n,theme:i,themeLocale:r}=Yt(),s=bo(),o=nt(!1),a=te(()=>i.value.locales[o.value?n.value:"/"].routerLocales),l=()=>{if(!o.value)return a.value.notFoundMsg[0];const c=a.value.notFoundMsg;return c[Math.floor(Math.random()*c.length)]};return Et(()=>{o.value=!0}),()=>[S(Zg),S(Yg,{noSidebar:!0},{...e,default:()=>S("main",{id:"main-content",class:"vp-page not-found"},e.default?.()??[S("div",{class:"not-found-hint"},[S("p",{class:"error-code"},"404"),S("h1",{class:"error-title"},a.value.notFoundTitle),S("p",{class:"error-hint"},l())]),S("div",{class:"actions"},[S("button",{type:"button",class:"action-button",onClick:()=>{window.history.go(-1)}},a.value.back),S("button",{type:"button",class:"action-button",onClick:()=>{s.push(r.value.home??n.value)}},a.value.home)])])})]}});const lb={enhance:({app:t,router:e})=>{const{scrollBehavior:n}=e.options;e.options.scrollBehavior=async(...i)=>(await Rc.wait(),n(...i)),SE(t)},setup:()=>{yE(),bE()},layouts:{Layout:ob,NotFound:ab}},cb=Object.freeze(Object.defineProperty({__proto__:null,default:lb},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const pf="180",ms={ROTATE:0,DOLLY:1,PAN:2},rs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},ub=0,sd=1,fb=2,tv=1,hb=2,pi=3,Yi=0,un=1,xi=2,$i=0,gs=1,od=2,ad=3,ld=4,db=5,pr=100,pb=101,mb=102,gb=103,vb=104,_b=200,xb=201,Sb=202,yb=203,Dc=204,Ic=205,Mb=206,Eb=207,bb=208,Tb=209,wb=210,Ab=211,Cb=212,Rb=213,Pb=214,Uc=0,Nc=1,Oc=2,Es=3,Fc=4,Bc=5,kc=6,Hc=7,mf=0,Lb=1,Db=2,ji=0,Ib=1,Ub=2,Nb=3,Ob=4,Fb=5,Bb=6,kb=7,nv=300,bs=301,Ts=302,zc=303,Vc=304,Za=306,Gc=1e3,vr=1001,Wc=1002,Hn=1003,Hb=1004,Go=1005,Kn=1006,Al=1007,_r=1008,ti=1009,iv=1010,rv=1011,lo=1012,gf=1013,wr=1014,Si=1015,Ao=1016,vf=1017,_f=1018,co=1020,sv=35902,ov=35899,av=1021,lv=1022,Fn=1023,uo=1026,fo=1027,cv=1028,xf=1029,uv=1030,Sf=1031,yf=1033,ma=33776,ga=33777,va=33778,_a=33779,Xc=35840,$c=35841,jc=35842,qc=35843,Yc=36196,Kc=37492,Zc=37496,Jc=37808,Qc=37809,eu=37810,tu=37811,nu=37812,iu=37813,ru=37814,su=37815,ou=37816,au=37817,lu=37818,cu=37819,uu=37820,fu=37821,hu=36492,du=36494,pu=36495,mu=36283,gu=36284,vu=36285,_u=36286,zb=3200,Vb=3201,fv=0,Gb=1,Gi="",bn="srgb",ws="srgb-linear",Ua="linear",ht="srgb",Hr=7680,cd=519,Wb=512,Xb=513,$b=514,hv=515,jb=516,qb=517,Yb=518,Kb=519,ud=35044,fd="300 es",Zn=2e3,Na=2001;class Nr{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Gt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],xa=Math.PI/180,xu=180/Math.PI;function Co(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Gt[t&255]+Gt[t>>8&255]+Gt[t>>16&255]+Gt[t>>24&255]+"-"+Gt[e&255]+Gt[e>>8&255]+"-"+Gt[e>>16&15|64]+Gt[e>>24&255]+"-"+Gt[n&63|128]+Gt[n>>8&255]+"-"+Gt[n>>16&255]+Gt[n>>24&255]+Gt[i&255]+Gt[i>>8&255]+Gt[i>>16&255]+Gt[i>>24&255]).toLowerCase()}function Ke(t,e,n){return Math.max(e,Math.min(n,t))}function Zb(t,e){return(t%e+e)%e}function Cl(t,e,n){return(1-n)*t+n*e}function Fs(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function an(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}const Jb={DEG2RAD:xa};class Xe{constructor(e=0,n=0){Xe.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Ke(this.x,e.x,n.x),this.y=Ke(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=Ke(this.x,e,n),this.y=Ke(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ar{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],f=i[r+3];const h=s[o+0],d=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[n+0]=l,e[n+1]=c,e[n+2]=u,e[n+3]=f;return}if(a===1){e[n+0]=h,e[n+1]=d,e[n+2]=g,e[n+3]=_;return}if(f!==_||l!==h||c!==d||u!==g){let m=1-a;const p=l*h+c*d+u*g+f*_,E=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const C=Math.sqrt(x),R=Math.atan2(C,p*E);m=Math.sin(m*R)/C,a=Math.sin(a*R)/C}const y=a*E;if(l=l*m+h*y,c=c*m+d*y,u=u*m+g*y,f=f*m+_*y,m===1-a){const C=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=C,c*=C,u*=C,f*=C}}e[n]=l,e[n+1]=c,e[n+2]=u,e[n+3]=f}static multiplyQuaternionsFlat(e,n,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],f=s[o],h=s[o+1],d=s[o+2],g=s[o+3];return e[n]=a*g+u*f+l*d-c*h,e[n+1]=l*g+u*h+c*f-a*d,e[n+2]=c*g+u*d+a*h-l*f,e[n+3]=u*g-a*f-l*h-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),f=a(s/2),h=l(i/2),d=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=h*u*f+c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f-h*d*g;break;case"YXZ":this._x=h*u*f+c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f+h*d*g;break;case"ZXY":this._x=h*u*f-c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f-h*d*g;break;case"ZYX":this._x=h*u*f-c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f+h*d*g;break;case"YZX":this._x=h*u*f+c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f-h*d*g;break;case"XZY":this._x=h*u*f-c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f+h*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],l=n[9],c=n[2],u=n[6],f=n[10],h=i+a+f;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(o-r)*d}else if(i>a&&i>f){const d=2*Math.sqrt(1+i-a-f);this._w=(u-l)/d,this._x=.25*d,this._y=(r+o)/d,this._z=(s+c)/d}else if(a>f){const d=2*Math.sqrt(1+a-i-f);this._w=(s-c)/d,this._x=(r+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+f-i-a);this._w=(o-r)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ke(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,o=e._w,a=n._x,l=n._y,c=n._z,u=n._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-n;return this._w=d*o+n*this._w,this._x=d*i+n*this._x,this._y=d*r+n*this._y,this._z=d*s+n*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),f=Math.sin((1-n)*u)/c,h=Math.sin(n*u)/c;return this._w=o*f+this._w*h,this._x=i*f+this._x*h,this._y=r*f+this._y*h,this._z=s*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class q{constructor(e=0,n=0,i=0){q.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(hd.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(hd.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*n-s*r),f=2*(s*i-o*n);return this.x=n+l*c+o*f-a*u,this.y=i+l*u+a*c-s*f,this.z=r+l*f+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Ke(this.x,e.x,n.x),this.y=Ke(this.y,e.y,n.y),this.z=Ke(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=Ke(this.x,e,n),this.y=Ke(this.y,e,n),this.z=Ke(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,o=n.x,a=n.y,l=n.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Rl.copy(this).projectOnVector(e),this.sub(Rl)}reflect(e){return this.sub(Rl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Rl=new q,hd=new Ar;class je{constructor(e,n,i,r,s,o,a,l,c){je.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c)}set(e,n,i,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=n,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],f=i[7],h=i[2],d=i[5],g=i[8],_=r[0],m=r[3],p=r[6],E=r[1],x=r[4],y=r[7],C=r[2],R=r[5],P=r[8];return s[0]=o*_+a*E+l*C,s[3]=o*m+a*x+l*R,s[6]=o*p+a*y+l*P,s[1]=c*_+u*E+f*C,s[4]=c*m+u*x+f*R,s[7]=c*p+u*y+f*P,s[2]=h*_+d*E+g*C,s[5]=h*m+d*x+g*R,s[8]=h*p+d*y+g*P,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return n*o*u-n*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=u*o-a*c,h=a*l-u*s,d=c*s-o*l,g=n*f+i*h+r*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=f*_,e[1]=(r*c-u*i)*_,e[2]=(a*i-r*o)*_,e[3]=h*_,e[4]=(u*n-r*l)*_,e[5]=(r*s-a*n)*_,e[6]=d*_,e[7]=(i*l-c*n)*_,e[8]=(o*n-i*s)*_,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+n,0,0,1),this}scale(e,n){return this.premultiply(Pl.makeScale(e,n)),this}rotate(e){return this.premultiply(Pl.makeRotation(-e)),this}translate(e,n){return this.premultiply(Pl.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Pl=new je;function dv(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function Oa(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function Qb(){const t=Oa("canvas");return t.style.display="block",t}const dd={};function ho(t){t in dd||(dd[t]=!0,console.warn(t))}function eT(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const pd=new je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),md=new je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function tT(){const t={enabled:!0,workingColorSpace:ws,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===ht&&(r.r=yi(r.r),r.g=yi(r.g),r.b=yi(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ht&&(r.r=vs(r.r),r.g=vs(r.g),r.b=vs(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Gi?Ua:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return ho("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return ho("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[ws]:{primaries:e,whitePoint:i,transfer:Ua,toXYZ:pd,fromXYZ:md,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:bn},outputColorSpaceConfig:{drawingBufferColorSpace:bn}},[bn]:{primaries:e,whitePoint:i,transfer:ht,toXYZ:pd,fromXYZ:md,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:bn}}}),t}const st=tT();function yi(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function vs(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let zr;class nT{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{zr===void 0&&(zr=Oa("canvas")),zr.width=e.width,zr.height=e.height;const r=zr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=zr}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Oa("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=yi(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(yi(n[i]/255)*255):n[i]=yi(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let iT=0;class Mf{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:iT++}),this.uuid=Co(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):n instanceof VideoFrame?e.set(n.displayHeight,n.displayWidth,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Ll(r[o].image)):s.push(Ll(r[o]))}else s=Ll(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function Ll(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?nT.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let rT=0;const Dl=new q;class fn extends Nr{constructor(e=fn.DEFAULT_IMAGE,n=fn.DEFAULT_MAPPING,i=vr,r=vr,s=Kn,o=_r,a=Fn,l=ti,c=fn.DEFAULT_ANISOTROPY,u=Gi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:rT++}),this.uuid=Co(),this.name="",this.source=new Mf(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Xe(0,0),this.repeat=new Xe(1,1),this.center=new Xe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Dl).x}get height(){return this.source.getSize(Dl).y}get depth(){return this.source.getSize(Dl).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${n}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==nv)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Gc:e.x=e.x-Math.floor(e.x);break;case vr:e.x=e.x<0?0:1;break;case Wc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Gc:e.y=e.y-Math.floor(e.y);break;case vr:e.y=e.y<0?0:1;break;case Wc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}fn.DEFAULT_IMAGE=null;fn.DEFAULT_MAPPING=nv;fn.DEFAULT_ANISOTROPY=1;class wt{constructor(e=0,n=0,i=0,r=1){wt.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],u=l[4],f=l[8],h=l[1],d=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const x=(c+1)/2,y=(d+1)/2,C=(p+1)/2,R=(u+h)/4,P=(f+_)/4,U=(g+m)/4;return x>y&&x>C?x<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(x),r=R/i,s=P/i):y>C?y<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),i=R/r,s=U/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=P/s,r=U/s),this.set(i,r,s,n),this}let E=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(h-u)*(h-u));return Math.abs(E)<.001&&(E=1),this.x=(m-g)/E,this.y=(f-_)/E,this.z=(h-u)/E,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Ke(this.x,e.x,n.x),this.y=Ke(this.y,e.y,n.y),this.z=Ke(this.z,e.z,n.z),this.w=Ke(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=Ke(this.x,e,n),this.y=Ke(this.y,e,n),this.z=Ke(this.z,e,n),this.w=Ke(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class sT extends Nr{constructor(e=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Kn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth,this.scissor=new wt(0,0,e,n),this.scissorTest=!1,this.viewport=new wt(0,0,e,n);const r={width:e,height:n,depth:i.depth},s=new fn(r);this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const n={minFilter:Kn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const r=Object.assign({},e.textures[n].image);this.textures[n].source=new Mf(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Cr extends sT{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class pv extends fn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Hn,this.minFilter=Hn,this.wrapR=vr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class oT extends fn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Hn,this.minFilter=Hn,this.wrapR=vr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ro{constructor(e=new q(1/0,1/0,1/0),n=new q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Dn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Dn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Dn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Dn):Dn.fromBufferAttribute(s,o),Dn.applyMatrix4(e.matrixWorld),this.expandByPoint(Dn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Wo.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Wo.copy(i.boundingBox)),Wo.applyMatrix4(e.matrixWorld),this.union(Wo)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Dn),Dn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Bs),Xo.subVectors(this.max,Bs),Vr.subVectors(e.a,Bs),Gr.subVectors(e.b,Bs),Wr.subVectors(e.c,Bs),Li.subVectors(Gr,Vr),Di.subVectors(Wr,Gr),sr.subVectors(Vr,Wr);let n=[0,-Li.z,Li.y,0,-Di.z,Di.y,0,-sr.z,sr.y,Li.z,0,-Li.x,Di.z,0,-Di.x,sr.z,0,-sr.x,-Li.y,Li.x,0,-Di.y,Di.x,0,-sr.y,sr.x,0];return!Il(n,Vr,Gr,Wr,Xo)||(n=[1,0,0,0,1,0,0,0,1],!Il(n,Vr,Gr,Wr,Xo))?!1:($o.crossVectors(Li,Di),n=[$o.x,$o.y,$o.z],Il(n,Vr,Gr,Wr,Xo))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Dn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Dn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(li[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),li[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),li[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),li[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),li[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),li[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),li[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),li[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(li),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const li=[new q,new q,new q,new q,new q,new q,new q,new q],Dn=new q,Wo=new Ro,Vr=new q,Gr=new q,Wr=new q,Li=new q,Di=new q,sr=new q,Bs=new q,Xo=new q,$o=new q,or=new q;function Il(t,e,n,i,r){for(let s=0,o=t.length-3;s<=o;s+=3){or.fromArray(t,s);const a=r.x*Math.abs(or.x)+r.y*Math.abs(or.y)+r.z*Math.abs(or.z),l=e.dot(or),c=n.dot(or),u=i.dot(or);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const aT=new Ro,ks=new q,Ul=new q;class Ef{constructor(e=new q,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):aT.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ks.subVectors(e,this.center);const n=ks.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(ks,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ul.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ks.copy(e.center).add(Ul)),this.expandByPoint(ks.copy(e.center).sub(Ul))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const ci=new q,Nl=new q,jo=new q,Ii=new q,Ol=new q,qo=new q,Fl=new q;class bf{constructor(e=new q,n=new q(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ci)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=ci.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(ci.copy(this.origin).addScaledVector(this.direction,n),ci.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Nl.copy(e).add(n).multiplyScalar(.5),jo.copy(n).sub(e).normalize(),Ii.copy(this.origin).sub(Nl);const s=e.distanceTo(n)*.5,o=-this.direction.dot(jo),a=Ii.dot(this.direction),l=-Ii.dot(jo),c=Ii.lengthSq(),u=Math.abs(1-o*o);let f,h,d,g;if(u>0)if(f=o*l-a,h=o*a-l,g=s*u,f>=0)if(h>=-g)if(h<=g){const _=1/u;f*=_,h*=_,d=f*(f+o*h+2*a)+h*(o*f+h+2*l)+c}else h=s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;else h<=-g?(f=Math.max(0,-(-o*s+a)),h=f>0?-s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c):h<=g?(f=0,h=Math.min(Math.max(-s,-l),s),d=h*(h+2*l)+c):(f=Math.max(0,-(o*s+a)),h=f>0?s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c);else h=o>0?-s:s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Nl).addScaledVector(jo,h),d}intersectSphere(e,n){ci.subVectors(e.center,this.origin);const i=ci.dot(this.direction),r=ci.dot(ci)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,n):this.at(a,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(a=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,ci)!==null}intersectTriangle(e,n,i,r,s){Ol.subVectors(n,e),qo.subVectors(i,e),Fl.crossVectors(Ol,qo);let o=this.direction.dot(Fl),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ii.subVectors(this.origin,e);const l=a*this.direction.dot(qo.crossVectors(Ii,qo));if(l<0)return null;const c=a*this.direction.dot(Ol.cross(Ii));if(c<0||l+c>o)return null;const u=-a*Ii.dot(Fl);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class At{constructor(e,n,i,r,s,o,a,l,c,u,f,h,d,g,_,m){At.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c,u,f,h,d,g,_,m)}set(e,n,i,r,s,o,a,l,c,u,f,h,d,g,_,m){const p=this.elements;return p[0]=e,p[4]=n,p[8]=i,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=f,p[14]=h,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new At().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/Xr.setFromMatrixColumn(e,0).length(),s=1/Xr.setFromMatrixColumn(e,1).length(),o=1/Xr.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const h=o*u,d=o*f,g=a*u,_=a*f;n[0]=l*u,n[4]=-l*f,n[8]=c,n[1]=d+g*c,n[5]=h-_*c,n[9]=-a*l,n[2]=_-h*c,n[6]=g+d*c,n[10]=o*l}else if(e.order==="YXZ"){const h=l*u,d=l*f,g=c*u,_=c*f;n[0]=h+_*a,n[4]=g*a-d,n[8]=o*c,n[1]=o*f,n[5]=o*u,n[9]=-a,n[2]=d*a-g,n[6]=_+h*a,n[10]=o*l}else if(e.order==="ZXY"){const h=l*u,d=l*f,g=c*u,_=c*f;n[0]=h-_*a,n[4]=-o*f,n[8]=g+d*a,n[1]=d+g*a,n[5]=o*u,n[9]=_-h*a,n[2]=-o*c,n[6]=a,n[10]=o*l}else if(e.order==="ZYX"){const h=o*u,d=o*f,g=a*u,_=a*f;n[0]=l*u,n[4]=g*c-d,n[8]=h*c+_,n[1]=l*f,n[5]=_*c+h,n[9]=d*c-g,n[2]=-c,n[6]=a*l,n[10]=o*l}else if(e.order==="YZX"){const h=o*l,d=o*c,g=a*l,_=a*c;n[0]=l*u,n[4]=_-h*f,n[8]=g*f+d,n[1]=f,n[5]=o*u,n[9]=-a*u,n[2]=-c*u,n[6]=d*f+g,n[10]=h-_*f}else if(e.order==="XZY"){const h=o*l,d=o*c,g=a*l,_=a*c;n[0]=l*u,n[4]=-f,n[8]=c*u,n[1]=h*f+_,n[5]=o*u,n[9]=d*f-g,n[2]=g*f-d,n[6]=a*u,n[10]=_*f+h}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(lT,e,cT)}lookAt(e,n,i){const r=this.elements;return mn.subVectors(e,n),mn.lengthSq()===0&&(mn.z=1),mn.normalize(),Ui.crossVectors(i,mn),Ui.lengthSq()===0&&(Math.abs(i.z)===1?mn.x+=1e-4:mn.z+=1e-4,mn.normalize(),Ui.crossVectors(i,mn)),Ui.normalize(),Yo.crossVectors(mn,Ui),r[0]=Ui.x,r[4]=Yo.x,r[8]=mn.x,r[1]=Ui.y,r[5]=Yo.y,r[9]=mn.y,r[2]=Ui.z,r[6]=Yo.z,r[10]=mn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],f=i[5],h=i[9],d=i[13],g=i[2],_=i[6],m=i[10],p=i[14],E=i[3],x=i[7],y=i[11],C=i[15],R=r[0],P=r[4],U=r[8],b=r[12],T=r[1],L=r[5],I=r[9],V=r[13],z=r[2],j=r[6],B=r[10],ne=r[14],k=r[3],fe=r[7],ye=r[11],Ce=r[15];return s[0]=o*R+a*T+l*z+c*k,s[4]=o*P+a*L+l*j+c*fe,s[8]=o*U+a*I+l*B+c*ye,s[12]=o*b+a*V+l*ne+c*Ce,s[1]=u*R+f*T+h*z+d*k,s[5]=u*P+f*L+h*j+d*fe,s[9]=u*U+f*I+h*B+d*ye,s[13]=u*b+f*V+h*ne+d*Ce,s[2]=g*R+_*T+m*z+p*k,s[6]=g*P+_*L+m*j+p*fe,s[10]=g*U+_*I+m*B+p*ye,s[14]=g*b+_*V+m*ne+p*Ce,s[3]=E*R+x*T+y*z+C*k,s[7]=E*P+x*L+y*j+C*fe,s[11]=E*U+x*I+y*B+C*ye,s[15]=E*b+x*V+y*ne+C*Ce,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],f=e[6],h=e[10],d=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+s*l*f-r*c*f-s*a*h+i*c*h+r*a*d-i*l*d)+_*(+n*l*d-n*c*h+s*o*h-r*o*d+r*c*u-s*l*u)+m*(+n*c*f-n*a*d-s*o*f+i*o*d+s*a*u-i*c*u)+p*(-r*a*u-n*l*f+n*a*h+r*o*f-i*o*h+i*l*u)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=e[9],h=e[10],d=e[11],g=e[12],_=e[13],m=e[14],p=e[15],E=f*m*c-_*h*c+_*l*d-a*m*d-f*l*p+a*h*p,x=g*h*c-u*m*c-g*l*d+o*m*d+u*l*p-o*h*p,y=u*_*c-g*f*c+g*a*d-o*_*d-u*a*p+o*f*p,C=g*f*l-u*_*l-g*a*h+o*_*h+u*a*m-o*f*m,R=n*E+i*x+r*y+s*C;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/R;return e[0]=E*P,e[1]=(_*h*s-f*m*s-_*r*d+i*m*d+f*r*p-i*h*p)*P,e[2]=(a*m*s-_*l*s+_*r*c-i*m*c-a*r*p+i*l*p)*P,e[3]=(f*l*s-a*h*s-f*r*c+i*h*c+a*r*d-i*l*d)*P,e[4]=x*P,e[5]=(u*m*s-g*h*s+g*r*d-n*m*d-u*r*p+n*h*p)*P,e[6]=(g*l*s-o*m*s-g*r*c+n*m*c+o*r*p-n*l*p)*P,e[7]=(o*h*s-u*l*s+u*r*c-n*h*c-o*r*d+n*l*d)*P,e[8]=y*P,e[9]=(g*f*s-u*_*s-g*i*d+n*_*d+u*i*p-n*f*p)*P,e[10]=(o*_*s-g*a*s+g*i*c-n*_*c-o*i*p+n*a*p)*P,e[11]=(u*a*s-o*f*s-u*i*c+n*f*c+o*i*d-n*a*d)*P,e[12]=C*P,e[13]=(u*_*r-g*f*r+g*i*h-n*_*h-u*i*m+n*f*m)*P,e[14]=(g*a*r-o*_*r-g*i*l+n*_*l+o*i*m-n*a*m)*P,e[15]=(o*f*r-u*a*r+u*i*l-n*f*l-o*i*h+n*a*h)*P,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,l=n._w,c=s+s,u=o+o,f=a+a,h=s*c,d=s*u,g=s*f,_=o*u,m=o*f,p=a*f,E=l*c,x=l*u,y=l*f,C=i.x,R=i.y,P=i.z;return r[0]=(1-(_+p))*C,r[1]=(d+y)*C,r[2]=(g-x)*C,r[3]=0,r[4]=(d-y)*R,r[5]=(1-(h+p))*R,r[6]=(m+E)*R,r[7]=0,r[8]=(g+x)*P,r[9]=(m-E)*P,r[10]=(1-(h+_))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=Xr.set(r[0],r[1],r[2]).length();const o=Xr.set(r[4],r[5],r[6]).length(),a=Xr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],In.copy(this);const c=1/s,u=1/o,f=1/a;return In.elements[0]*=c,In.elements[1]*=c,In.elements[2]*=c,In.elements[4]*=u,In.elements[5]*=u,In.elements[6]*=u,In.elements[8]*=f,In.elements[9]*=f,In.elements[10]*=f,n.setFromRotationMatrix(In),i.x=s,i.y=o,i.z=a,this}makePerspective(e,n,i,r,s,o,a=Zn,l=!1){const c=this.elements,u=2*s/(n-e),f=2*s/(i-r),h=(n+e)/(n-e),d=(i+r)/(i-r);let g,_;if(l)g=s/(o-s),_=o*s/(o-s);else if(a===Zn)g=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===Na)g=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,n,i,r,s,o,a=Zn,l=!1){const c=this.elements,u=2/(n-e),f=2/(i-r),h=-(n+e)/(n-e),d=-(i+r)/(i-r);let g,_;if(l)g=1/(o-s),_=o/(o-s);else if(a===Zn)g=-2/(o-s),_=-(o+s)/(o-s);else if(a===Na)g=-1/(o-s),_=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=f,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const Xr=new q,In=new At,lT=new q(0,0,0),cT=new q(1,1,1),Ui=new q,Yo=new q,mn=new q,gd=new At,vd=new Ar;class ni{constructor(e=0,n=0,i=0,r=ni.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],f=r[2],h=r[6],d=r[10];switch(n){case"XYZ":this._y=Math.asin(Ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ke(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ke(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ke(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return gd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(gd,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return vd.setFromEuler(this),this.setFromQuaternion(vd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ni.DEFAULT_ORDER="XYZ";class Tf{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let uT=0;const _d=new q,$r=new Ar,ui=new At,Ko=new q,Hs=new q,fT=new q,hT=new Ar,xd=new q(1,0,0),Sd=new q(0,1,0),yd=new q(0,0,1),Md={type:"added"},dT={type:"removed"},jr={type:"childadded",child:null},Bl={type:"childremoved",child:null};class qt extends Nr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:uT++}),this.uuid=Co(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=qt.DEFAULT_UP.clone();const e=new q,n=new ni,i=new Ar,r=new q(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new At},normalMatrix:{value:new je}}),this.matrix=new At,this.matrixWorld=new At,this.matrixAutoUpdate=qt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=qt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Tf,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return $r.setFromAxisAngle(e,n),this.quaternion.multiply($r),this}rotateOnWorldAxis(e,n){return $r.setFromAxisAngle(e,n),this.quaternion.premultiply($r),this}rotateX(e){return this.rotateOnAxis(xd,e)}rotateY(e){return this.rotateOnAxis(Sd,e)}rotateZ(e){return this.rotateOnAxis(yd,e)}translateOnAxis(e,n){return _d.copy(e).applyQuaternion(this.quaternion),this.position.add(_d.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(xd,e)}translateY(e){return this.translateOnAxis(Sd,e)}translateZ(e){return this.translateOnAxis(yd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ui.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Ko.copy(e):Ko.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Hs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ui.lookAt(Hs,Ko,this.up):ui.lookAt(Ko,Hs,this.up),this.quaternion.setFromRotationMatrix(ui),r&&(ui.extractRotation(r.matrixWorld),$r.setFromRotationMatrix(ui),this.quaternion.premultiply($r.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Md),jr.child=e,this.dispatchEvent(jr),jr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(dT),Bl.child=e,this.dispatchEvent(Bl),Bl.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ui.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ui.multiply(e.parent.matrixWorld)),e.applyMatrix4(ui),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Md),jr.child=e,this.dispatchEvent(jr),jr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hs,e,fT),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hs,hT,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(n){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),f=o(e.shapes),h=o(e.skeletons),d=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}qt.DEFAULT_UP=new q(0,1,0);qt.DEFAULT_MATRIX_AUTO_UPDATE=!0;qt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Un=new q,fi=new q,kl=new q,hi=new q,qr=new q,Yr=new q,Ed=new q,Hl=new q,zl=new q,Vl=new q,Gl=new wt,Wl=new wt,Xl=new wt;class Nn{constructor(e=new q,n=new q,i=new q){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Un.subVectors(e,n),r.cross(Un);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){Un.subVectors(r,n),fi.subVectors(i,n),kl.subVectors(e,n);const o=Un.dot(Un),a=Un.dot(fi),l=Un.dot(kl),c=fi.dot(fi),u=fi.dot(kl),f=o*c-a*a;if(f===0)return s.set(0,0,0),null;const h=1/f,d=(c*l-a*u)*h,g=(o*u-a*l)*h;return s.set(1-d-g,g,d)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,hi)===null?!1:hi.x>=0&&hi.y>=0&&hi.x+hi.y<=1}static getInterpolation(e,n,i,r,s,o,a,l){return this.getBarycoord(e,n,i,r,hi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,hi.x),l.addScaledVector(o,hi.y),l.addScaledVector(a,hi.z),l)}static getInterpolatedAttribute(e,n,i,r,s,o){return Gl.setScalar(0),Wl.setScalar(0),Xl.setScalar(0),Gl.fromBufferAttribute(e,n),Wl.fromBufferAttribute(e,i),Xl.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Gl,s.x),o.addScaledVector(Wl,s.y),o.addScaledVector(Xl,s.z),o}static isFrontFacing(e,n,i,r){return Un.subVectors(i,n),fi.subVectors(e,n),Un.cross(fi).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Un.subVectors(this.c,this.b),fi.subVectors(this.a,this.b),Un.cross(fi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Nn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Nn.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return Nn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return Nn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Nn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let o,a;qr.subVectors(r,i),Yr.subVectors(s,i),Hl.subVectors(e,i);const l=qr.dot(Hl),c=Yr.dot(Hl);if(l<=0&&c<=0)return n.copy(i);zl.subVectors(e,r);const u=qr.dot(zl),f=Yr.dot(zl);if(u>=0&&f<=u)return n.copy(r);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),n.copy(i).addScaledVector(qr,o);Vl.subVectors(e,s);const d=qr.dot(Vl),g=Yr.dot(Vl);if(g>=0&&d<=g)return n.copy(s);const _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),n.copy(i).addScaledVector(Yr,a);const m=u*g-d*f;if(m<=0&&f-u>=0&&d-g>=0)return Ed.subVectors(s,r),a=(f-u)/(f-u+(d-g)),n.copy(r).addScaledVector(Ed,a);const p=1/(m+_+h);return o=_*p,a=h*p,n.copy(i).addScaledVector(qr,o).addScaledVector(Yr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const mv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ni={h:0,s:0,l:0},Zo={h:0,s:0,l:0};function $l(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class ot{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=bn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,st.colorSpaceToWorking(this,n),this}setRGB(e,n,i,r=st.workingColorSpace){return this.r=e,this.g=n,this.b=i,st.colorSpaceToWorking(this,r),this}setHSL(e,n,i,r=st.workingColorSpace){if(e=Zb(e,1),n=Ke(n,0,1),i=Ke(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=$l(o,s,e+1/3),this.g=$l(o,s,e),this.b=$l(o,s,e-1/3)}return st.colorSpaceToWorking(this,r),this}setStyle(e,n=bn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=bn){const i=mv[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=yi(e.r),this.g=yi(e.g),this.b=yi(e.b),this}copyLinearToSRGB(e){return this.r=vs(e.r),this.g=vs(e.g),this.b=vs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=bn){return st.workingToColorSpace(Wt.copy(this),e),Math.round(Ke(Wt.r*255,0,255))*65536+Math.round(Ke(Wt.g*255,0,255))*256+Math.round(Ke(Wt.b*255,0,255))}getHexString(e=bn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=st.workingColorSpace){st.workingToColorSpace(Wt.copy(this),n);const i=Wt.r,r=Wt.g,s=Wt.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const f=o-a;switch(c=u<=.5?f/(o+a):f/(2-o-a),o){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,n=st.workingColorSpace){return st.workingToColorSpace(Wt.copy(this),n),e.r=Wt.r,e.g=Wt.g,e.b=Wt.b,e}getStyle(e=bn){st.workingToColorSpace(Wt.copy(this),e);const n=Wt.r,i=Wt.g,r=Wt.b;return e!==bn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Ni),this.setHSL(Ni.h+e,Ni.s+n,Ni.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Ni),e.getHSL(Zo);const i=Cl(Ni.h,Zo.h,n),r=Cl(Ni.s,Zo.s,n),s=Cl(Ni.l,Zo.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Wt=new ot;ot.NAMES=mv;let pT=0;class Po extends Nr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:pT++}),this.uuid=Co(),this.name="",this.type="Material",this.blending=gs,this.side=Yi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Dc,this.blendDst=Ic,this.blendEquation=pr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ot(0,0,0),this.blendAlpha=0,this.depthFunc=Es,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=cd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Hr,this.stencilZFail=Hr,this.stencilZPass=Hr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==gs&&(i.blending=this.blending),this.side!==Yi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Dc&&(i.blendSrc=this.blendSrc),this.blendDst!==Ic&&(i.blendDst=this.blendDst),this.blendEquation!==pr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Es&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==cd&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Hr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Hr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Hr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(n){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class gv extends Po{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ni,this.combine=mf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Pt=new q,Jo=new Xe;let mT=0;class ei{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:mT++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=ud,this.updateRanges=[],this.gpuType=Si,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Jo.fromBufferAttribute(this,n),Jo.applyMatrix3(e),this.setXY(n,Jo.x,Jo.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Pt.fromBufferAttribute(this,n),Pt.applyMatrix3(e),this.setXYZ(n,Pt.x,Pt.y,Pt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Pt.fromBufferAttribute(this,n),Pt.applyMatrix4(e),this.setXYZ(n,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Pt.fromBufferAttribute(this,n),Pt.applyNormalMatrix(e),this.setXYZ(n,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Pt.fromBufferAttribute(this,n),Pt.transformDirection(e),this.setXYZ(n,Pt.x,Pt.y,Pt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=Fs(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=an(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Fs(n,this.array)),n}setX(e,n){return this.normalized&&(n=an(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Fs(n,this.array)),n}setY(e,n){return this.normalized&&(n=an(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Fs(n,this.array)),n}setZ(e,n){return this.normalized&&(n=an(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Fs(n,this.array)),n}setW(e,n){return this.normalized&&(n=an(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=an(n,this.array),i=an(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=an(n,this.array),i=an(i,this.array),r=an(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=an(n,this.array),i=an(i,this.array),r=an(r,this.array),s=an(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ud&&(e.usage=this.usage),e}}class vv extends ei{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class _v extends ei{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class Mr extends ei{constructor(e,n,i){super(new Float32Array(e),n,i)}}let gT=0;const Mn=new At,jl=new qt,Kr=new q,gn=new Ro,zs=new Ro,kt=new q;class Or extends Nr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gT++}),this.uuid=Co(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(dv(e)?_v:vv)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new je().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Mn.makeRotationFromQuaternion(e),this.applyMatrix4(Mn),this}rotateX(e){return Mn.makeRotationX(e),this.applyMatrix4(Mn),this}rotateY(e){return Mn.makeRotationY(e),this.applyMatrix4(Mn),this}rotateZ(e){return Mn.makeRotationZ(e),this.applyMatrix4(Mn),this}translate(e,n,i){return Mn.makeTranslation(e,n,i),this.applyMatrix4(Mn),this}scale(e,n,i){return Mn.makeScale(e,n,i),this.applyMatrix4(Mn),this}lookAt(e){return jl.lookAt(e),jl.updateMatrix(),this.applyMatrix4(jl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Kr).negate(),this.translate(Kr.x,Kr.y,Kr.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Mr(i,3))}else{const i=Math.min(e.length,n.count);for(let r=0;r<i;r++){const s=e[r];n.setXYZ(r,s.x,s.y,s.z||0)}e.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ro);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new q(-1/0,-1/0,-1/0),new q(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];gn.setFromBufferAttribute(s),this.morphTargetsRelative?(kt.addVectors(this.boundingBox.min,gn.min),this.boundingBox.expandByPoint(kt),kt.addVectors(this.boundingBox.max,gn.max),this.boundingBox.expandByPoint(kt)):(this.boundingBox.expandByPoint(gn.min),this.boundingBox.expandByPoint(gn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ef);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new q,1/0);return}if(e){const i=this.boundingSphere.center;if(gn.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];zs.setFromBufferAttribute(a),this.morphTargetsRelative?(kt.addVectors(gn.min,zs.min),gn.expandByPoint(kt),kt.addVectors(gn.max,zs.max),gn.expandByPoint(kt)):(gn.expandByPoint(zs.min),gn.expandByPoint(zs.max))}gn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)kt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(kt));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)kt.fromBufferAttribute(a,c),l&&(Kr.fromBufferAttribute(e,c),kt.add(Kr)),r=Math.max(r,i.distanceToSquared(kt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ei(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let U=0;U<i.count;U++)a[U]=new q,l[U]=new q;const c=new q,u=new q,f=new q,h=new Xe,d=new Xe,g=new Xe,_=new q,m=new q;function p(U,b,T){c.fromBufferAttribute(i,U),u.fromBufferAttribute(i,b),f.fromBufferAttribute(i,T),h.fromBufferAttribute(s,U),d.fromBufferAttribute(s,b),g.fromBufferAttribute(s,T),u.sub(c),f.sub(c),d.sub(h),g.sub(h);const L=1/(d.x*g.y-g.x*d.y);isFinite(L)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(L),m.copy(f).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(L),a[U].add(_),a[b].add(_),a[T].add(_),l[U].add(m),l[b].add(m),l[T].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let U=0,b=E.length;U<b;++U){const T=E[U],L=T.start,I=T.count;for(let V=L,z=L+I;V<z;V+=3)p(e.getX(V+0),e.getX(V+1),e.getX(V+2))}const x=new q,y=new q,C=new q,R=new q;function P(U){C.fromBufferAttribute(r,U),R.copy(C);const b=a[U];x.copy(b),x.sub(C.multiplyScalar(C.dot(b))).normalize(),y.crossVectors(R,b);const L=y.dot(l[U])<0?-1:1;o.setXYZW(U,x.x,x.y,x.z,L)}for(let U=0,b=E.length;U<b;++U){const T=E[U],L=T.start,I=T.count;for(let V=L,z=L+I;V<z;V+=3)P(e.getX(V+0)),P(e.getX(V+1)),P(e.getX(V+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new ei(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let h=0,d=i.count;h<d;h++)i.setXYZ(h,0,0,0);const r=new q,s=new q,o=new q,a=new q,l=new q,c=new q,u=new q,f=new q;if(e)for(let h=0,d=e.count;h<d;h+=3){const g=e.getX(h+0),_=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(n,g),s.fromBufferAttribute(n,_),o.fromBufferAttribute(n,m),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,d=n.count;h<d;h+=3)r.fromBufferAttribute(n,h+0),s.fromBufferAttribute(n,h+1),o.fromBufferAttribute(n,h+2),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)kt.fromBufferAttribute(e,n),kt.normalize(),e.setXYZ(n,kt.x,kt.y,kt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,f=a.normalized,h=new c.constructor(l.length*u);let d=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*u;for(let p=0;p<u;p++)h[g++]=c[d++]}return new ei(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Or,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);n.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,f=c.length;u<f;u++){const h=c[u],d=e(h,i);l.push(d)}n.morphAttributes[a]=l}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const d=c[f];u.push(d.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(n))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(n));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const bd=new At,ar=new bf,Qo=new Ef,Td=new q,ea=new q,ta=new q,na=new q,ql=new q,ia=new q,wd=new q,ra=new q;class Jn extends qt{constructor(e=new Or,n=new gv){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){ia.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],f=s[l];u!==0&&(ql.fromBufferAttribute(f,e),o?ia.addScaledVector(ql,u):ia.addScaledVector(ql.sub(n),u))}n.add(ia)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Qo.copy(i.boundingSphere),Qo.applyMatrix4(s),ar.copy(e.ray).recast(e.near),!(Qo.containsPoint(ar.origin)===!1&&(ar.intersectSphere(Qo,Td)===null||ar.origin.distanceToSquared(Td)>(e.far-e.near)**2))&&(bd.copy(s).invert(),ar.copy(e.ray).applyMatrix4(bd),!(i.boundingBox!==null&&ar.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,ar)))}_computeIntersections(e,n,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=o[m.materialIndex],E=Math.max(m.start,d.start),x=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let y=E,C=x;y<C;y+=3){const R=a.getX(y),P=a.getX(y+1),U=a.getX(y+2);r=sa(this,p,e,i,c,u,f,R,P,U),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const E=a.getX(m),x=a.getX(m+1),y=a.getX(m+2);r=sa(this,o,e,i,c,u,f,E,x,y),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=o[m.materialIndex],E=Math.max(m.start,d.start),x=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let y=E,C=x;y<C;y+=3){const R=y,P=y+1,U=y+2;r=sa(this,p,e,i,c,u,f,R,P,U),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const E=m,x=m+1,y=m+2;r=sa(this,o,e,i,c,u,f,E,x,y),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}}}function vT(t,e,n,i,r,s,o,a){let l;if(e.side===un?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Yi,a),l===null)return null;ra.copy(a),ra.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(ra);return c<n.near||c>n.far?null:{distance:c,point:ra.clone(),object:t}}function sa(t,e,n,i,r,s,o,a,l,c){t.getVertexPosition(a,ea),t.getVertexPosition(l,ta),t.getVertexPosition(c,na);const u=vT(t,e,n,i,ea,ta,na,wd);if(u){const f=new q;Nn.getBarycoord(wd,ea,ta,na,f),r&&(u.uv=Nn.getInterpolatedAttribute(r,a,l,c,f,new Xe)),s&&(u.uv1=Nn.getInterpolatedAttribute(s,a,l,c,f,new Xe)),o&&(u.normal=Nn.getInterpolatedAttribute(o,a,l,c,f,new q),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new q,materialIndex:0};Nn.getNormal(ea,ta,na,h.normal),u.face=h,u.barycoord=f}return u}class Ls extends Or{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],f=[];let h=0,d=0;g("z","y","x",-1,-1,i,n,e,o,s,0),g("z","y","x",1,-1,i,n,-e,o,s,1),g("x","z","y",1,1,e,i,n,r,o,2),g("x","z","y",1,-1,e,i,-n,r,o,3),g("x","y","z",1,-1,e,n,i,r,s,4),g("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Mr(c,3)),this.setAttribute("normal",new Mr(u,3)),this.setAttribute("uv",new Mr(f,2));function g(_,m,p,E,x,y,C,R,P,U,b){const T=y/P,L=C/U,I=y/2,V=C/2,z=R/2,j=P+1,B=U+1;let ne=0,k=0;const fe=new q;for(let ye=0;ye<B;ye++){const Ce=ye*L-V;for(let Oe=0;Oe<j;Oe++){const tt=Oe*T-I;fe[_]=tt*E,fe[m]=Ce*x,fe[p]=z,c.push(fe.x,fe.y,fe.z),fe[_]=0,fe[m]=0,fe[p]=R>0?1:-1,u.push(fe.x,fe.y,fe.z),f.push(Oe/P),f.push(1-ye/U),ne+=1}}for(let ye=0;ye<U;ye++)for(let Ce=0;Ce<P;Ce++){const Oe=h+Ce+j*ye,tt=h+Ce+j*(ye+1),at=h+(Ce+1)+j*(ye+1),Qe=h+(Ce+1)+j*ye;l.push(Oe,tt,Qe),l.push(tt,at,Qe),k+=6}a.addGroup(d,k,b),d+=k,h+=ne}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ls(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function As(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function Jt(t){const e={};for(let n=0;n<t.length;n++){const i=As(t[n]);for(const r in i)e[r]=i[r]}return e}function _T(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function xv(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:st.workingColorSpace}const xT={clone:As,merge:Jt};var ST=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,yT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ki extends Po{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ST,this.fragmentShader=yT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=As(e.uniforms),this.uniformsGroups=_T(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class Sv extends qt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new At,this.projectionMatrix=new At,this.projectionMatrixInverse=new At,this.coordinateSystem=Zn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Oi=new q,Ad=new Xe,Cd=new Xe;class wn extends Sv{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=xu*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(xa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return xu*2*Math.atan(Math.tan(xa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Oi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Oi.x,Oi.y).multiplyScalar(-e/Oi.z),Oi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Oi.x,Oi.y).multiplyScalar(-e/Oi.z)}getViewSize(e,n){return this.getViewBounds(e,Ad,Cd),n.subVectors(Cd,Ad)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(xa*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,n-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Zr=-90,Jr=1;class MT extends qt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new wn(Zr,Jr,e,n);r.layers=this.layers,this.add(r);const s=new wn(Zr,Jr,e,n);s.layers=this.layers,this.add(s);const o=new wn(Zr,Jr,e,n);o.layers=this.layers,this.add(o);const a=new wn(Zr,Jr,e,n);a.layers=this.layers,this.add(a);const l=new wn(Zr,Jr,e,n);l.layers=this.layers,this.add(l);const c=new wn(Zr,Jr,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,l]=n;for(const c of n)this.remove(c);if(e===Zn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Na)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,o),e.setRenderTarget(i,2,r),e.render(n,a),e.setRenderTarget(i,3,r),e.render(n,l),e.setRenderTarget(i,4,r),e.render(n,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),e.render(n,u),e.setRenderTarget(f,h,d),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class yv extends fn{constructor(e=[],n=bs,i,r,s,o,a,l,c,u){super(e,n,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ET extends Cr{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new yv(r),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ls(5,5,5),s=new Ki({name:"CubemapFromEquirect",uniforms:As(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:un,blending:$i});s.uniforms.tEquirect.value=n;const o=new Jn(r,s),a=n.minFilter;return n.minFilter===_r&&(n.minFilter=Kn),new MT(1,10,this).update(e,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,n=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}}class Gs extends qt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const bT={type:"move"};class Yl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Gs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Gs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Gs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new q),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=n.getJointPose(_,i),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,g=.005;c.inputState.pinching&&h>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(bT)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Gs;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}class TT extends qt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ni,this.environmentIntensity=1,this.environmentRotation=new ni,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Kl=new q,wT=new q,AT=new je;class zi{constructor(e=new q(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=Kl.subVectors(i,n).cross(wT.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(Kl),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||AT.getNormalMatrix(e),r=this.coplanarPoint(Kl).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const lr=new Ef,CT=new Xe(.5,.5),oa=new q;class wf{constructor(e=new zi,n=new zi,i=new zi,r=new zi,s=new zi,o=new zi){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=Zn,i=!1){const r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],f=s[5],h=s[6],d=s[7],g=s[8],_=s[9],m=s[10],p=s[11],E=s[12],x=s[13],y=s[14],C=s[15];if(r[0].setComponents(c-o,d-u,p-g,C-E).normalize(),r[1].setComponents(c+o,d+u,p+g,C+E).normalize(),r[2].setComponents(c+a,d+f,p+_,C+x).normalize(),r[3].setComponents(c-a,d-f,p-_,C-x).normalize(),i)r[4].setComponents(l,h,m,y).normalize(),r[5].setComponents(c-l,d-h,p-m,C-y).normalize();else if(r[4].setComponents(c-l,d-h,p-m,C-y).normalize(),n===Zn)r[5].setComponents(c+l,d+h,p+m,C+y).normalize();else if(n===Na)r[5].setComponents(l,h,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),lr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),lr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(lr)}intersectsSprite(e){lr.center.set(0,0,0);const n=CT.distanceTo(e.center);return lr.radius=.7071067811865476+n,lr.applyMatrix4(e.matrixWorld),this.intersectsSphere(lr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(oa.x=r.normal.x>0?e.max.x:e.min.x,oa.y=r.normal.y>0?e.max.y:e.min.y,oa.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(oa)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Mv extends fn{constructor(e,n,i=wr,r,s,o,a=Hn,l=Hn,c,u=uo,f=1){if(u!==uo&&u!==fo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:n,depth:f};super(h,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Mf(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class Ev extends fn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ja extends Or{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,o=n/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,f=e/a,h=n/l,d=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const E=p*h-o;for(let x=0;x<c;x++){const y=x*f-s;g.push(y,-E,0),_.push(0,0,1),m.push(x/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let E=0;E<a;E++){const x=E+c*p,y=E+c*(p+1),C=E+1+c*(p+1),R=E+1+c*p;d.push(x,y,R),d.push(y,C,R)}this.setIndex(d),this.setAttribute("position",new Mr(g,3)),this.setAttribute("normal",new Mr(_,3)),this.setAttribute("uv",new Mr(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ja(e.width,e.height,e.widthSegments,e.heightSegments)}}class Zl extends Po{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new ot(16777215),this.specular=new ot(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fv,this.normalScale=new Xe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ni,this.combine=mf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class RT extends Po{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=zb,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class PT extends Po{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class bv extends qt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new ot(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}}const Jl=new At,Rd=new q,Pd=new q;class LT{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Xe(512,512),this.mapType=ti,this.map=null,this.mapPass=null,this.matrix=new At,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new wf,this._frameExtents=new Xe(1,1),this._viewportCount=1,this._viewports=[new wt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;Rd.setFromMatrixPosition(e.matrixWorld),n.position.copy(Rd),Pd.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(Pd),n.updateMatrixWorld(),Jl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Jl,n.coordinateSystem,n.reversedDepth),n.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Jl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Tv extends Sv{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class DT extends LT{constructor(){super(new Tv(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ql extends bv{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(qt.DEFAULT_UP),this.updateMatrix(),this.target=new qt,this.shadow=new DT}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class IT extends bv{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}class UT extends wn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Ld=new At;class NT{constructor(e,n,i=0,r=1/0){this.ray=new bf(e,n),this.near=i,this.far=r,this.camera=null,this.layers=new Tf,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,n){this.ray.set(e,n)}setFromCamera(e,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(n.near+n.far)/(n.near-n.far)).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):console.error("THREE.Raycaster: Unsupported camera type: "+n.type)}setFromXRController(e){return Ld.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ld),this}intersectObject(e,n=!0,i=[]){return Su(e,this,i,n),i.sort(Dd),i}intersectObjects(e,n=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Su(e[r],this,i,n);return i.sort(Dd),i}}function Dd(t,e){return t.distance-e.distance}function Su(t,e,n,i){let r=!0;if(t.layers.test(e.layers)&&t.raycast(e,n)===!1&&(r=!1),r===!0&&i===!0){const s=t.children;for(let o=0,a=s.length;o<a;o++)Su(s[o],e,n,!0)}}class Id{constructor(e=1,n=0,i=0){this.radius=e,this.phi=n,this.theta=i}set(e,n,i){return this.radius=e,this.phi=n,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ke(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,n,i){return this.radius=Math.sqrt(e*e+n*n+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Ke(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class OT extends Nr{constructor(e,n=null){super(),this.object=e,this.domElement=n,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Ud(t,e,n,i){const r=FT(i);switch(n){case av:return t*e;case cv:return t*e/r.components*r.byteLength;case xf:return t*e/r.components*r.byteLength;case uv:return t*e*2/r.components*r.byteLength;case Sf:return t*e*2/r.components*r.byteLength;case lv:return t*e*3/r.components*r.byteLength;case Fn:return t*e*4/r.components*r.byteLength;case yf:return t*e*4/r.components*r.byteLength;case ma:case ga:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case va:case _a:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case $c:case qc:return Math.max(t,16)*Math.max(e,8)/4;case Xc:case jc:return Math.max(t,8)*Math.max(e,8)/2;case Yc:case Kc:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Zc:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Jc:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Qc:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case eu:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case tu:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case nu:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case iu:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case ru:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case su:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case ou:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case au:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case lu:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case cu:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case uu:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case fu:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case hu:case du:case pu:return Math.ceil(t/4)*Math.ceil(e/4)*16;case mu:case gu:return Math.ceil(t/4)*Math.ceil(e/4)*8;case vu:case _u:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function FT(t){switch(t){case ti:case iv:return{byteLength:1,components:1};case lo:case rv:case Ao:return{byteLength:2,components:1};case vf:case _f:return{byteLength:2,components:4};case wr:case gf:case Si:return{byteLength:4,components:1};case sv:case ov:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:pf}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=pf);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function wv(){let t=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function BT(t){const e=new WeakMap;function n(a,l){const c=a.array,u=a.usage,f=c.byteLength,h=t.createBuffer();t.bindBuffer(l,h),t.bufferData(l,c,u),a.onUploadCallback();let d;if(c instanceof Float32Array)d=t.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=t.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=t.HALF_FLOAT:d=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=t.SHORT;else if(c instanceof Uint32Array)d=t.UNSIGNED_INT;else if(c instanceof Int32Array)d=t.INT;else if(c instanceof Int8Array)d=t.BYTE;else if(c instanceof Uint8Array)d=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,l,c){const u=l.array,f=l.updateRanges;if(t.bindBuffer(c,a),f.length===0)t.bufferSubData(c,0,u);else{f.sort((d,g)=>d.start-g.start);let h=0;for(let d=1;d<f.length;d++){const g=f[h],_=f[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,f[h]=_)}f.length=h+1;for(let d=0,g=f.length;d<g;d++){const _=f[d];t.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(t.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,n(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var kT=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,HT=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,zT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,VT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,GT=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,WT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,XT=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,$T=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,jT=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,qT=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,YT=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,KT=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ZT=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,JT=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,QT=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,e2=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,t2=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,n2=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,i2=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,r2=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,s2=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,o2=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,a2=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,l2=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,c2=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,u2=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,f2=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,h2=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,d2=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,p2=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,m2="gl_FragColor = linearToOutputTexel( gl_FragColor );",g2=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,v2=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,_2=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,x2=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,S2=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,y2=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,M2=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,E2=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,b2=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,T2=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,w2=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,A2=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,C2=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,R2=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,P2=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,L2=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,D2=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,I2=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,U2=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,N2=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,O2=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,F2=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,B2=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,k2=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,H2=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,z2=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,V2=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,G2=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,W2=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,X2=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,$2=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,j2=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,q2=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Y2=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,K2=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Z2=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,J2=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Q2=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ew=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,tw=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,nw=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,iw=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,rw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ow=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,aw=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,lw=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,cw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,uw=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,fw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,hw=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,dw=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,pw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,mw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,gw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,vw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,_w=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,xw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Sw=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,yw=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Mw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Ew=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,bw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Tw=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ww=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Aw=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Cw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Rw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Pw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Lw=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Dw=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Iw=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Uw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Nw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ow=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Fw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Bw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,kw=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zw=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ww=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Xw=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,$w=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,jw=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,qw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Yw=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kw=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Zw=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Jw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Qw=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,eA=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tA=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nA=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,iA=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rA=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,sA=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,oA=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,aA=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lA=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,cA=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uA=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fA=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hA=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,dA=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,pA=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mA=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,gA=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,vA=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,qe={alphahash_fragment:kT,alphahash_pars_fragment:HT,alphamap_fragment:zT,alphamap_pars_fragment:VT,alphatest_fragment:GT,alphatest_pars_fragment:WT,aomap_fragment:XT,aomap_pars_fragment:$T,batching_pars_vertex:jT,batching_vertex:qT,begin_vertex:YT,beginnormal_vertex:KT,bsdfs:ZT,iridescence_fragment:JT,bumpmap_pars_fragment:QT,clipping_planes_fragment:e2,clipping_planes_pars_fragment:t2,clipping_planes_pars_vertex:n2,clipping_planes_vertex:i2,color_fragment:r2,color_pars_fragment:s2,color_pars_vertex:o2,color_vertex:a2,common:l2,cube_uv_reflection_fragment:c2,defaultnormal_vertex:u2,displacementmap_pars_vertex:f2,displacementmap_vertex:h2,emissivemap_fragment:d2,emissivemap_pars_fragment:p2,colorspace_fragment:m2,colorspace_pars_fragment:g2,envmap_fragment:v2,envmap_common_pars_fragment:_2,envmap_pars_fragment:x2,envmap_pars_vertex:S2,envmap_physical_pars_fragment:L2,envmap_vertex:y2,fog_vertex:M2,fog_pars_vertex:E2,fog_fragment:b2,fog_pars_fragment:T2,gradientmap_pars_fragment:w2,lightmap_pars_fragment:A2,lights_lambert_fragment:C2,lights_lambert_pars_fragment:R2,lights_pars_begin:P2,lights_toon_fragment:D2,lights_toon_pars_fragment:I2,lights_phong_fragment:U2,lights_phong_pars_fragment:N2,lights_physical_fragment:O2,lights_physical_pars_fragment:F2,lights_fragment_begin:B2,lights_fragment_maps:k2,lights_fragment_end:H2,logdepthbuf_fragment:z2,logdepthbuf_pars_fragment:V2,logdepthbuf_pars_vertex:G2,logdepthbuf_vertex:W2,map_fragment:X2,map_pars_fragment:$2,map_particle_fragment:j2,map_particle_pars_fragment:q2,metalnessmap_fragment:Y2,metalnessmap_pars_fragment:K2,morphinstance_vertex:Z2,morphcolor_vertex:J2,morphnormal_vertex:Q2,morphtarget_pars_vertex:ew,morphtarget_vertex:tw,normal_fragment_begin:nw,normal_fragment_maps:iw,normal_pars_fragment:rw,normal_pars_vertex:sw,normal_vertex:ow,normalmap_pars_fragment:aw,clearcoat_normal_fragment_begin:lw,clearcoat_normal_fragment_maps:cw,clearcoat_pars_fragment:uw,iridescence_pars_fragment:fw,opaque_fragment:hw,packing:dw,premultiplied_alpha_fragment:pw,project_vertex:mw,dithering_fragment:gw,dithering_pars_fragment:vw,roughnessmap_fragment:_w,roughnessmap_pars_fragment:xw,shadowmap_pars_fragment:Sw,shadowmap_pars_vertex:yw,shadowmap_vertex:Mw,shadowmask_pars_fragment:Ew,skinbase_vertex:bw,skinning_pars_vertex:Tw,skinning_vertex:ww,skinnormal_vertex:Aw,specularmap_fragment:Cw,specularmap_pars_fragment:Rw,tonemapping_fragment:Pw,tonemapping_pars_fragment:Lw,transmission_fragment:Dw,transmission_pars_fragment:Iw,uv_pars_fragment:Uw,uv_pars_vertex:Nw,uv_vertex:Ow,worldpos_vertex:Fw,background_vert:Bw,background_frag:kw,backgroundCube_vert:Hw,backgroundCube_frag:zw,cube_vert:Vw,cube_frag:Gw,depth_vert:Ww,depth_frag:Xw,distanceRGBA_vert:$w,distanceRGBA_frag:jw,equirect_vert:qw,equirect_frag:Yw,linedashed_vert:Kw,linedashed_frag:Zw,meshbasic_vert:Jw,meshbasic_frag:Qw,meshlambert_vert:eA,meshlambert_frag:tA,meshmatcap_vert:nA,meshmatcap_frag:iA,meshnormal_vert:rA,meshnormal_frag:sA,meshphong_vert:oA,meshphong_frag:aA,meshphysical_vert:lA,meshphysical_frag:cA,meshtoon_vert:uA,meshtoon_frag:fA,points_vert:hA,points_frag:dA,shadow_vert:pA,shadow_frag:mA,sprite_vert:gA,sprite_frag:vA},be={common:{diffuse:{value:new ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},envMapRotation:{value:new je},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new Xe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new ot(16777215)},opacity:{value:1},center:{value:new Xe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},Yn={basic:{uniforms:Jt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.fog]),vertexShader:qe.meshbasic_vert,fragmentShader:qe.meshbasic_frag},lambert:{uniforms:Jt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new ot(0)}}]),vertexShader:qe.meshlambert_vert,fragmentShader:qe.meshlambert_frag},phong:{uniforms:Jt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new ot(0)},specular:{value:new ot(1118481)},shininess:{value:30}}]),vertexShader:qe.meshphong_vert,fragmentShader:qe.meshphong_frag},standard:{uniforms:Jt([be.common,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.roughnessmap,be.metalnessmap,be.fog,be.lights,{emissive:{value:new ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag},toon:{uniforms:Jt([be.common,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.gradientmap,be.fog,be.lights,{emissive:{value:new ot(0)}}]),vertexShader:qe.meshtoon_vert,fragmentShader:qe.meshtoon_frag},matcap:{uniforms:Jt([be.common,be.bumpmap,be.normalmap,be.displacementmap,be.fog,{matcap:{value:null}}]),vertexShader:qe.meshmatcap_vert,fragmentShader:qe.meshmatcap_frag},points:{uniforms:Jt([be.points,be.fog]),vertexShader:qe.points_vert,fragmentShader:qe.points_frag},dashed:{uniforms:Jt([be.common,be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qe.linedashed_vert,fragmentShader:qe.linedashed_frag},depth:{uniforms:Jt([be.common,be.displacementmap]),vertexShader:qe.depth_vert,fragmentShader:qe.depth_frag},normal:{uniforms:Jt([be.common,be.bumpmap,be.normalmap,be.displacementmap,{opacity:{value:1}}]),vertexShader:qe.meshnormal_vert,fragmentShader:qe.meshnormal_frag},sprite:{uniforms:Jt([be.sprite,be.fog]),vertexShader:qe.sprite_vert,fragmentShader:qe.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qe.background_vert,fragmentShader:qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new je}},vertexShader:qe.backgroundCube_vert,fragmentShader:qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qe.cube_vert,fragmentShader:qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qe.equirect_vert,fragmentShader:qe.equirect_frag},distanceRGBA:{uniforms:Jt([be.common,be.displacementmap,{referencePosition:{value:new q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qe.distanceRGBA_vert,fragmentShader:qe.distanceRGBA_frag},shadow:{uniforms:Jt([be.lights,be.fog,{color:{value:new ot(0)},opacity:{value:1}}]),vertexShader:qe.shadow_vert,fragmentShader:qe.shadow_frag}};Yn.physical={uniforms:Jt([Yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new Xe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new Xe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new ot(0)},specularColor:{value:new ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new Xe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag};const aa={r:0,b:0,g:0},cr=new ni,_A=new At;function xA(t,e,n,i,r,s,o){const a=new ot(0);let l=s===!0?0:1,c,u,f=null,h=0,d=null;function g(x){let y=x.isScene===!0?x.background:null;return y&&y.isTexture&&(y=(x.backgroundBlurriness>0?n:e).get(y)),y}function _(x){let y=!1;const C=g(x);C===null?p(a,l):C&&C.isColor&&(p(C,1),y=!0);const R=t.xr.getEnvironmentBlendMode();R==="additive"?i.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(t.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function m(x,y){const C=g(y);C&&(C.isCubeTexture||C.mapping===Za)?(u===void 0&&(u=new Jn(new Ls(1,1,1),new Ki({name:"BackgroundCubeMaterial",uniforms:As(Yn.backgroundCube.uniforms),vertexShader:Yn.backgroundCube.vertexShader,fragmentShader:Yn.backgroundCube.fragmentShader,side:un,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,P,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),cr.copy(y.backgroundRotation),cr.x*=-1,cr.y*=-1,cr.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(cr.y*=-1,cr.z*=-1),u.material.uniforms.envMap.value=C,u.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(_A.makeRotationFromEuler(cr)),u.material.toneMapped=st.getTransfer(C.colorSpace)!==ht,(f!==C||h!==C.version||d!==t.toneMapping)&&(u.material.needsUpdate=!0,f=C,h=C.version,d=t.toneMapping),u.layers.enableAll(),x.unshift(u,u.geometry,u.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new Jn(new Ja(2,2),new Ki({name:"BackgroundMaterial",uniforms:As(Yn.background.uniforms),vertexShader:Yn.background.vertexShader,fragmentShader:Yn.background.fragmentShader,side:Yi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=st.getTransfer(C.colorSpace)!==ht,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(f!==C||h!==C.version||d!==t.toneMapping)&&(c.material.needsUpdate=!0,f=C,h=C.version,d=t.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function p(x,y){x.getRGB(aa,xv(t)),i.buffers.color.setClear(aa.r,aa.g,aa.b,y,o)}function E(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,y=1){a.set(x),l=y,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,p(a,l)},render:_,addToRenderList:m,dispose:E}}function SA(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,o=!1;function a(T,L,I,V,z){let j=!1;const B=f(V,I,L);s!==B&&(s=B,c(s.object)),j=d(T,V,I,z),j&&g(T,V,I,z),z!==null&&e.update(z,t.ELEMENT_ARRAY_BUFFER),(j||o)&&(o=!1,y(T,L,I,V),z!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function l(){return t.createVertexArray()}function c(T){return t.bindVertexArray(T)}function u(T){return t.deleteVertexArray(T)}function f(T,L,I){const V=I.wireframe===!0;let z=i[T.id];z===void 0&&(z={},i[T.id]=z);let j=z[L.id];j===void 0&&(j={},z[L.id]=j);let B=j[V];return B===void 0&&(B=h(l()),j[V]=B),B}function h(T){const L=[],I=[],V=[];for(let z=0;z<n;z++)L[z]=0,I[z]=0,V[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:I,attributeDivisors:V,object:T,attributes:{},index:null}}function d(T,L,I,V){const z=s.attributes,j=L.attributes;let B=0;const ne=I.getAttributes();for(const k in ne)if(ne[k].location>=0){const ye=z[k];let Ce=j[k];if(Ce===void 0&&(k==="instanceMatrix"&&T.instanceMatrix&&(Ce=T.instanceMatrix),k==="instanceColor"&&T.instanceColor&&(Ce=T.instanceColor)),ye===void 0||ye.attribute!==Ce||Ce&&ye.data!==Ce.data)return!0;B++}return s.attributesNum!==B||s.index!==V}function g(T,L,I,V){const z={},j=L.attributes;let B=0;const ne=I.getAttributes();for(const k in ne)if(ne[k].location>=0){let ye=j[k];ye===void 0&&(k==="instanceMatrix"&&T.instanceMatrix&&(ye=T.instanceMatrix),k==="instanceColor"&&T.instanceColor&&(ye=T.instanceColor));const Ce={};Ce.attribute=ye,ye&&ye.data&&(Ce.data=ye.data),z[k]=Ce,B++}s.attributes=z,s.attributesNum=B,s.index=V}function _(){const T=s.newAttributes;for(let L=0,I=T.length;L<I;L++)T[L]=0}function m(T){p(T,0)}function p(T,L){const I=s.newAttributes,V=s.enabledAttributes,z=s.attributeDivisors;I[T]=1,V[T]===0&&(t.enableVertexAttribArray(T),V[T]=1),z[T]!==L&&(t.vertexAttribDivisor(T,L),z[T]=L)}function E(){const T=s.newAttributes,L=s.enabledAttributes;for(let I=0,V=L.length;I<V;I++)L[I]!==T[I]&&(t.disableVertexAttribArray(I),L[I]=0)}function x(T,L,I,V,z,j,B){B===!0?t.vertexAttribIPointer(T,L,I,z,j):t.vertexAttribPointer(T,L,I,V,z,j)}function y(T,L,I,V){_();const z=V.attributes,j=I.getAttributes(),B=L.defaultAttributeValues;for(const ne in j){const k=j[ne];if(k.location>=0){let fe=z[ne];if(fe===void 0&&(ne==="instanceMatrix"&&T.instanceMatrix&&(fe=T.instanceMatrix),ne==="instanceColor"&&T.instanceColor&&(fe=T.instanceColor)),fe!==void 0){const ye=fe.normalized,Ce=fe.itemSize,Oe=e.get(fe);if(Oe===void 0)continue;const tt=Oe.buffer,at=Oe.type,Qe=Oe.bytesPerElement,re=at===t.INT||at===t.UNSIGNED_INT||fe.gpuType===gf;if(fe.isInterleavedBufferAttribute){const O=fe.data,ie=O.stride,ae=fe.offset;if(O.isInstancedInterleavedBuffer){for(let le=0;le<k.locationSize;le++)p(k.location+le,O.meshPerAttribute);T.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=O.meshPerAttribute*O.count)}else for(let le=0;le<k.locationSize;le++)m(k.location+le);t.bindBuffer(t.ARRAY_BUFFER,tt);for(let le=0;le<k.locationSize;le++)x(k.location+le,Ce/k.locationSize,at,ye,ie*Qe,(ae+Ce/k.locationSize*le)*Qe,re)}else{if(fe.isInstancedBufferAttribute){for(let O=0;O<k.locationSize;O++)p(k.location+O,fe.meshPerAttribute);T.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let O=0;O<k.locationSize;O++)m(k.location+O);t.bindBuffer(t.ARRAY_BUFFER,tt);for(let O=0;O<k.locationSize;O++)x(k.location+O,Ce/k.locationSize,at,ye,Ce*Qe,Ce/k.locationSize*O*Qe,re)}}else if(B!==void 0){const ye=B[ne];if(ye!==void 0)switch(ye.length){case 2:t.vertexAttrib2fv(k.location,ye);break;case 3:t.vertexAttrib3fv(k.location,ye);break;case 4:t.vertexAttrib4fv(k.location,ye);break;default:t.vertexAttrib1fv(k.location,ye)}}}}E()}function C(){U();for(const T in i){const L=i[T];for(const I in L){const V=L[I];for(const z in V)u(V[z].object),delete V[z];delete L[I]}delete i[T]}}function R(T){if(i[T.id]===void 0)return;const L=i[T.id];for(const I in L){const V=L[I];for(const z in V)u(V[z].object),delete V[z];delete L[I]}delete i[T.id]}function P(T){for(const L in i){const I=i[L];if(I[T.id]===void 0)continue;const V=I[T.id];for(const z in V)u(V[z].object),delete V[z];delete I[T.id]}}function U(){b(),o=!0,s!==r&&(s=r,c(s.object))}function b(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:U,resetDefaultState:b,dispose:C,releaseStatesOfGeometry:R,releaseStatesOfProgram:P,initAttributes:_,enableAttribute:m,disableUnusedAttributes:E}}function yA(t,e,n){let i;function r(c){i=c}function s(c,u){t.drawArrays(i,c,u),n.update(u,i,1)}function o(c,u,f){f!==0&&(t.drawArraysInstanced(i,c,u,f),n.update(u,i,f))}function a(c,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,f);let d=0;for(let g=0;g<f;g++)d+=u[g];n.update(d,i,1)}function l(c,u,f,h){if(f===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)o(c[g],u[g],h[g]);else{d.multiDrawArraysInstancedWEBGL(i,c,0,u,0,h,0,f);let g=0;for(let _=0;_<f;_++)g+=u[_]*h[_];n.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function MA(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(P){return!(P!==Fn&&i.convert(P)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(P){const U=P===Ao&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==ti&&i.convert(P)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==Si&&!U)}function l(P){if(P==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=n.logarithmicDepthBuffer===!0,h=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),g=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=t.getParameter(t.MAX_TEXTURE_SIZE),m=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),p=t.getParameter(t.MAX_VERTEX_ATTRIBS),E=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),x=t.getParameter(t.MAX_VARYING_VECTORS),y=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,R=t.getParameter(t.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:E,maxVaryings:x,maxFragmentUniforms:y,vertexTextures:C,maxSamples:R}}function EA(t){const e=this;let n=null,i=0,r=!1,s=!1;const o=new zi,a=new je,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const d=f.length!==0||h||i!==0||r;return r=h,i=f.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){n=u(f,h,0)},this.setState=function(f,h,d){const g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,p=t.get(f);if(!r||g===null||g.length===0||s&&!m)s?u(null):c();else{const E=s?0:i,x=E*4;let y=p.clippingState||null;l.value=y,y=u(g,h,x,d);for(let C=0;C!==x;++C)y[C]=n[C];p.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,h,d,g){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=d+_*4,E=h.matrixWorldInverse;a.getNormalMatrix(E),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,y=d;x!==_;++x,y+=4)o.copy(f[x]).applyMatrix4(E,a),o.normal.toArray(m,y),m[y+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function bA(t){let e=new WeakMap;function n(o,a){return a===zc?o.mapping=bs:a===Vc&&(o.mapping=Ts),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===zc||a===Vc)if(e.has(o)){const l=e.get(o).texture;return n(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new ET(l.height);return c.fromEquirectangularTexture(t,o),e.set(o,c),o.addEventListener("dispose",r),n(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}const ss=4,Nd=[.125,.215,.35,.446,.526,.582],mr=20,ec=new Tv,Od=new ot;let tc=null,nc=0,ic=0,rc=!1;const hr=(1+Math.sqrt(5))/2,Qr=1/hr,Fd=[new q(-hr,Qr,0),new q(hr,Qr,0),new q(-Qr,0,hr),new q(Qr,0,hr),new q(0,hr,-Qr),new q(0,hr,Qr),new q(-1,1,-1),new q(1,1,-1),new q(-1,1,1),new q(1,1,1)],TA=new q;class Bd{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100,s={}){const{size:o=256,position:a=TA}=s;tc=this._renderer.getRenderTarget(),nc=this._renderer.getActiveCubeFace(),ic=this._renderer.getActiveMipmapLevel(),rc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,a),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=zd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Hd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(tc,nc,ic),this._renderer.xr.enabled=rc,e.scissorTest=!1,la(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===bs||e.mapping===Ts?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),tc=this._renderer.getRenderTarget(),nc=this._renderer.getActiveCubeFace(),ic=this._renderer.getActiveMipmapLevel(),rc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Kn,minFilter:Kn,generateMipmaps:!1,type:Ao,format:Fn,colorSpace:ws,depthBuffer:!1},r=kd(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=kd(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=wA(s)),this._blurMaterial=AA(s,e,n)}return r}_compileMaterial(e){const n=new Jn(this._lodPlanes[0],e);this._renderer.compile(n,ec)}_sceneToCubeUV(e,n,i,r,s){const l=new wn(90,1,n,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,d=f.toneMapping;f.getClearColor(Od),f.toneMapping=ji,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null));const _=new gv({name:"PMREM.Background",side:un,depthWrite:!1,depthTest:!1}),m=new Jn(new Ls,_);let p=!1;const E=e.background;E?E.isColor&&(_.color.copy(E),e.background=null,p=!0):(_.color.copy(Od),p=!0);for(let x=0;x<6;x++){const y=x%3;y===0?(l.up.set(0,c[x],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[x],s.y,s.z)):y===1?(l.up.set(0,0,c[x]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[x],s.z)):(l.up.set(0,c[x],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[x]));const C=this._cubeSize;la(r,y*C,x>2?C:0,C,C),f.setRenderTarget(r),p&&f.render(m,l),f.render(e,l)}m.geometry.dispose(),m.material.dispose(),f.toneMapping=d,f.autoClear=h,e.background=E}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===bs||e.mapping===Ts;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=zd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Hd());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Jn(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;la(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,ec)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Fd[(r-s-1)%Fd.length];this._blur(e,s-1,s,o,a)}n.autoClear=i}_blur(e,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new Jn(this._lodPlanes[r],c),h=c.uniforms,d=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*mr-1),_=s/g,m=isFinite(s)?1+Math.floor(u*_):mr;m>mr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${mr}`);const p=[];let E=0;for(let P=0;P<mr;++P){const U=P/_,b=Math.exp(-U*U/2);p.push(b),P===0?E+=b:P<m&&(E+=2*b)}for(let P=0;P<p.length;P++)p[P]=p[P]/E;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:x}=this;h.dTheta.value=g,h.mipInt.value=x-i;const y=this._sizeLods[r],C=3*y*(r>x-ss?r-x+ss:0),R=4*(this._cubeSize-y);la(n,C,R,3*y,2*y),l.setRenderTarget(n),l.render(f,ec)}}function wA(t){const e=[],n=[],i=[];let r=t;const s=t-ss+1+Nd.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);n.push(a);let l=1/a;o>t-ss?l=Nd[o-t+ss-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,g=6,_=3,m=2,p=1,E=new Float32Array(_*g*d),x=new Float32Array(m*g*d),y=new Float32Array(p*g*d);for(let R=0;R<d;R++){const P=R%3*2/3-1,U=R>2?0:-1,b=[P,U,0,P+2/3,U,0,P+2/3,U+1,0,P,U,0,P+2/3,U+1,0,P,U+1,0];E.set(b,_*g*R),x.set(h,m*g*R);const T=[R,R,R,R,R,R];y.set(T,p*g*R)}const C=new Or;C.setAttribute("position",new ei(E,_)),C.setAttribute("uv",new ei(x,m)),C.setAttribute("faceIndex",new ei(y,p)),e.push(C),r>ss&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function kd(t,e,n){const i=new Cr(t,e,n);return i.texture.mapping=Za,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function la(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function AA(t,e,n){const i=new Float32Array(mr),r=new q(0,1,0);return new Ki({name:"SphericalGaussianBlur",defines:{n:mr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Af(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:$i,depthTest:!1,depthWrite:!1})}function Hd(){return new Ki({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Af(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:$i,depthTest:!1,depthWrite:!1})}function zd(){return new Ki({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Af(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$i,depthTest:!1,depthWrite:!1})}function Af(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function CA(t){let e=new WeakMap,n=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===zc||l===Vc,u=l===bs||l===Ts;if(c||u){let f=e.get(a);const h=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return n===null&&(n=new Bd(t)),f=c?n.fromEquirectangular(a,f):n.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),f.texture;if(f!==void 0)return f.texture;{const d=a.image;return c&&d&&d.height>0||u&&d&&r(d)?(n===null&&(n=new Bd(t)),f=c?n.fromEquirectangular(a):n.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),a.addEventListener("dispose",s),f.texture):null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function RA(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&ho("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function PA(t,e,n,i){const r={},s=new WeakMap;function o(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",o),delete r[h.id];const d=s.get(h);d&&(e.remove(d),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,n.memory.geometries--}function a(f,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,n.memory.geometries++),h}function l(f){const h=f.attributes;for(const d in h)e.update(h[d],t.ARRAY_BUFFER)}function c(f){const h=[],d=f.index,g=f.attributes.position;let _=0;if(d!==null){const E=d.array;_=d.version;for(let x=0,y=E.length;x<y;x+=3){const C=E[x+0],R=E[x+1],P=E[x+2];h.push(C,R,R,P,P,C)}}else if(g!==void 0){const E=g.array;_=g.version;for(let x=0,y=E.length/3-1;x<y;x+=3){const C=x+0,R=x+1,P=x+2;h.push(C,R,R,P,P,C)}}else return;const m=new(dv(h)?_v:vv)(h,1);m.version=_;const p=s.get(f);p&&e.remove(p),s.set(f,m)}function u(f){const h=s.get(f);if(h){const d=f.index;d!==null&&h.version<d.version&&c(f)}else c(f);return s.get(f)}return{get:a,update:l,getWireframeAttribute:u}}function LA(t,e,n){let i;function r(h){i=h}let s,o;function a(h){s=h.type,o=h.bytesPerElement}function l(h,d){t.drawElements(i,d,s,h*o),n.update(d,i,1)}function c(h,d,g){g!==0&&(t.drawElementsInstanced(i,d,s,h*o,g),n.update(d,i,g))}function u(h,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,h,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];n.update(m,i,1)}function f(h,d,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)c(h[p]/o,d[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(i,d,0,s,h,0,_,0,g);let p=0;for(let E=0;E<g;E++)p+=d[E]*_[E];n.update(p,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function DA(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=a*(s/3);break;case t.LINES:n.lines+=a*(s/2);break;case t.LINE_STRIP:n.lines+=a*(s-1);break;case t.LINE_LOOP:n.lines+=a*s;break;case t.POINTS:n.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function IA(t,e,n){const i=new WeakMap,r=new wt;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0;let h=i.get(a);if(h===void 0||h.count!==f){let b=function(){P.dispose(),i.delete(a),a.removeEventListener("dispose",b)};h!==void 0&&h.texture.dispose();const d=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],E=a.morphAttributes.color||[];let x=0;d===!0&&(x=1),g===!0&&(x=2),_===!0&&(x=3);let y=a.attributes.position.count*x,C=1;y>e.maxTextureSize&&(C=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const R=new Float32Array(y*C*4*f),P=new pv(R,y,C,f);P.type=Si,P.needsUpdate=!0;const U=x*4;for(let T=0;T<f;T++){const L=m[T],I=p[T],V=E[T],z=y*C*4*T;for(let j=0;j<L.count;j++){const B=j*U;d===!0&&(r.fromBufferAttribute(L,j),R[z+B+0]=r.x,R[z+B+1]=r.y,R[z+B+2]=r.z,R[z+B+3]=0),g===!0&&(r.fromBufferAttribute(I,j),R[z+B+4]=r.x,R[z+B+5]=r.y,R[z+B+6]=r.z,R[z+B+7]=0),_===!0&&(r.fromBufferAttribute(V,j),R[z+B+8]=r.x,R[z+B+9]=r.y,R[z+B+10]=r.z,R[z+B+11]=V.itemSize===4?r.w:1)}}h={count:f,texture:P,size:new Xe(y,C)},i.set(a,h),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",o.morphTexture,n);else{let d=0;for(let _=0;_<c.length;_++)d+=c[_];const g=a.morphTargetsRelative?1:1-d;l.getUniforms().setValue(t,"morphTargetBaseInfluence",g),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",h.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",h.size)}return{update:s}}function UA(t,e,n,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,f=e.get(l,u);if(r.get(f)!==c&&(e.update(f),r.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return f}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:s,dispose:o}}const Av=new fn,Vd=new Mv(1,1),Cv=new pv,Rv=new oT,Pv=new yv,Gd=[],Wd=[],Xd=new Float32Array(16),$d=new Float32Array(9),jd=new Float32Array(4);function Ds(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=Gd[r];if(s===void 0&&(s=new Float32Array(r),Gd[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=n,t[o].toArray(s,a)}return s}function Ft(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Bt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Qa(t,e){let n=Wd[e];n===void 0&&(n=new Int32Array(e),Wd[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function NA(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function OA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ft(n,e))return;t.uniform2fv(this.addr,e),Bt(n,e)}}function FA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Ft(n,e))return;t.uniform3fv(this.addr,e),Bt(n,e)}}function BA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ft(n,e))return;t.uniform4fv(this.addr,e),Bt(n,e)}}function kA(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ft(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Bt(n,e)}else{if(Ft(n,i))return;jd.set(i),t.uniformMatrix2fv(this.addr,!1,jd),Bt(n,i)}}function HA(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ft(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Bt(n,e)}else{if(Ft(n,i))return;$d.set(i),t.uniformMatrix3fv(this.addr,!1,$d),Bt(n,i)}}function zA(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ft(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Bt(n,e)}else{if(Ft(n,i))return;Xd.set(i),t.uniformMatrix4fv(this.addr,!1,Xd),Bt(n,i)}}function VA(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function GA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ft(n,e))return;t.uniform2iv(this.addr,e),Bt(n,e)}}function WA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ft(n,e))return;t.uniform3iv(this.addr,e),Bt(n,e)}}function XA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ft(n,e))return;t.uniform4iv(this.addr,e),Bt(n,e)}}function $A(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function jA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ft(n,e))return;t.uniform2uiv(this.addr,e),Bt(n,e)}}function qA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ft(n,e))return;t.uniform3uiv(this.addr,e),Bt(n,e)}}function YA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ft(n,e))return;t.uniform4uiv(this.addr,e),Bt(n,e)}}function KA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(Vd.compareFunction=hv,s=Vd):s=Av,n.setTexture2D(e||s,r)}function ZA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||Rv,r)}function JA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||Pv,r)}function QA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||Cv,r)}function e3(t){switch(t){case 5126:return NA;case 35664:return OA;case 35665:return FA;case 35666:return BA;case 35674:return kA;case 35675:return HA;case 35676:return zA;case 5124:case 35670:return VA;case 35667:case 35671:return GA;case 35668:case 35672:return WA;case 35669:case 35673:return XA;case 5125:return $A;case 36294:return jA;case 36295:return qA;case 36296:return YA;case 35678:case 36198:case 36298:case 36306:case 35682:return KA;case 35679:case 36299:case 36307:return ZA;case 35680:case 36300:case 36308:case 36293:return JA;case 36289:case 36303:case 36311:case 36292:return QA}}function t3(t,e){t.uniform1fv(this.addr,e)}function n3(t,e){const n=Ds(e,this.size,2);t.uniform2fv(this.addr,n)}function i3(t,e){const n=Ds(e,this.size,3);t.uniform3fv(this.addr,n)}function r3(t,e){const n=Ds(e,this.size,4);t.uniform4fv(this.addr,n)}function s3(t,e){const n=Ds(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function o3(t,e){const n=Ds(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function a3(t,e){const n=Ds(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function l3(t,e){t.uniform1iv(this.addr,e)}function c3(t,e){t.uniform2iv(this.addr,e)}function u3(t,e){t.uniform3iv(this.addr,e)}function f3(t,e){t.uniform4iv(this.addr,e)}function h3(t,e){t.uniform1uiv(this.addr,e)}function d3(t,e){t.uniform2uiv(this.addr,e)}function p3(t,e){t.uniform3uiv(this.addr,e)}function m3(t,e){t.uniform4uiv(this.addr,e)}function g3(t,e,n){const i=this.cache,r=e.length,s=Qa(n,r);Ft(i,s)||(t.uniform1iv(this.addr,s),Bt(i,s));for(let o=0;o!==r;++o)n.setTexture2D(e[o]||Av,s[o])}function v3(t,e,n){const i=this.cache,r=e.length,s=Qa(n,r);Ft(i,s)||(t.uniform1iv(this.addr,s),Bt(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||Rv,s[o])}function _3(t,e,n){const i=this.cache,r=e.length,s=Qa(n,r);Ft(i,s)||(t.uniform1iv(this.addr,s),Bt(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||Pv,s[o])}function x3(t,e,n){const i=this.cache,r=e.length,s=Qa(n,r);Ft(i,s)||(t.uniform1iv(this.addr,s),Bt(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||Cv,s[o])}function S3(t){switch(t){case 5126:return t3;case 35664:return n3;case 35665:return i3;case 35666:return r3;case 35674:return s3;case 35675:return o3;case 35676:return a3;case 5124:case 35670:return l3;case 35667:case 35671:return c3;case 35668:case 35672:return u3;case 35669:case 35673:return f3;case 5125:return h3;case 36294:return d3;case 36295:return p3;case 36296:return m3;case 35678:case 36198:case 36298:case 36306:case 35682:return g3;case 35679:case 36299:case 36307:return v3;case 35680:case 36300:case 36308:case 36293:return _3;case 36289:case 36303:case 36311:case 36292:return x3}}class y3{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=e3(n.type)}}class M3{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=S3(n.type)}}class E3{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,n[a.id],i)}}}const sc=/(\w+)(\])?(\[|\.)?/g;function qd(t,e){t.seq.push(e),t.map[e.id]=e}function b3(t,e,n){const i=t.name,r=i.length;for(sc.lastIndex=0;;){const s=sc.exec(i),o=sc.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){qd(n,c===void 0?new y3(a,t,e):new M3(a,t,e));break}else{let f=n.map[a];f===void 0&&(f=new E3(a),qd(n,f)),n=f}}}class Sa{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),o=e.getUniformLocation(n,s.name);b3(s,o,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function Yd(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const T3=37297;let w3=0;function A3(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}const Kd=new je;function C3(t){st._getMatrix(Kd,st.workingColorSpace,t);const e=`mat3( ${Kd.elements.map(n=>n.toFixed(4))} )`;switch(st.getTransfer(t)){case Ua:return[e,"LinearTransferOETF"];case ht:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function Zd(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),s=(t.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return n.toUpperCase()+`

`+s+`

`+A3(t.getShaderSource(e),a)}else return s}function R3(t,e){const n=C3(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function P3(t,e){let n;switch(e){case Ib:n="Linear";break;case Ub:n="Reinhard";break;case Nb:n="Cineon";break;case Ob:n="ACESFilmic";break;case Bb:n="AgX";break;case kb:n="Neutral";break;case Fb:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const ca=new q;function L3(){st.getLuminanceCoefficients(ca);const t=ca.x.toFixed(4),e=ca.y.toFixed(4),n=ca.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function D3(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ws).join(`
`)}function I3(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function U3(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),o=s.name;let a=1;s.type===t.FLOAT_MAT2&&(a=2),s.type===t.FLOAT_MAT3&&(a=3),s.type===t.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:t.getAttribLocation(e,o),locationSize:a}}return n}function Ws(t){return t!==""}function Jd(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Qd(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const N3=/^[ \t]*#include +<([\w\d./]+)>/gm;function yu(t){return t.replace(N3,F3)}const O3=new Map;function F3(t,e){let n=qe[e];if(n===void 0){const i=O3.get(e);if(i!==void 0)n=qe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return yu(n)}const B3=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ep(t){return t.replace(B3,k3)}function k3(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function tp(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function H3(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===tv?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===hb?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===pi&&(e="SHADOWMAP_TYPE_VSM"),e}function z3(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case bs:case Ts:e="ENVMAP_TYPE_CUBE";break;case Za:e="ENVMAP_TYPE_CUBE_UV";break}return e}function V3(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case Ts:e="ENVMAP_MODE_REFRACTION";break}return e}function G3(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case mf:e="ENVMAP_BLENDING_MULTIPLY";break;case Lb:e="ENVMAP_BLENDING_MIX";break;case Db:e="ENVMAP_BLENDING_ADD";break}return e}function W3(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:i,maxMip:n}}function X3(t,e,n,i){const r=t.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const l=H3(n),c=z3(n),u=V3(n),f=G3(n),h=W3(n),d=D3(n),g=I3(s),_=r.createProgram();let m,p,E=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(Ws).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(Ws).join(`
`),p.length>0&&(p+=`
`)):(m=[tp(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ws).join(`
`),p=[tp(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+u:"",n.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==ji?"#define TONE_MAPPING":"",n.toneMapping!==ji?qe.tonemapping_pars_fragment:"",n.toneMapping!==ji?P3("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",qe.colorspace_pars_fragment,R3("linearToOutputTexel",n.outputColorSpace),L3(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Ws).join(`
`)),o=yu(o),o=Jd(o,n),o=Qd(o,n),a=yu(a),a=Jd(a,n),a=Qd(a,n),o=ep(o),a=ep(a),n.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",n.glslVersion===fd?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===fd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=E+m+o,y=E+p+a,C=Yd(r,r.VERTEX_SHADER,x),R=Yd(r,r.FRAGMENT_SHADER,y);r.attachShader(_,C),r.attachShader(_,R),n.index0AttributeName!==void 0?r.bindAttribLocation(_,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function P(L){if(t.debug.checkShaderErrors){const I=r.getProgramInfoLog(_)||"",V=r.getShaderInfoLog(C)||"",z=r.getShaderInfoLog(R)||"",j=I.trim(),B=V.trim(),ne=z.trim();let k=!0,fe=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(k=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,_,C,R);else{const ye=Zd(r,C,"vertex"),Ce=Zd(r,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+j+`
`+ye+`
`+Ce)}else j!==""?console.warn("THREE.WebGLProgram: Program Info Log:",j):(B===""||ne==="")&&(fe=!1);fe&&(L.diagnostics={runnable:k,programLog:j,vertexShader:{log:B,prefix:m},fragmentShader:{log:ne,prefix:p}})}r.deleteShader(C),r.deleteShader(R),U=new Sa(r,_),b=U3(r,_)}let U;this.getUniforms=function(){return U===void 0&&P(this),U};let b;this.getAttributes=function(){return b===void 0&&P(this),b};let T=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=r.getProgramParameter(_,T3)),T},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=w3++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=R,this}let $3=0;class j3{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new q3(e),n.set(e,i)),i}}class q3{constructor(e){this.id=$3++,this.code=e,this.usedTimes=0}}function Y3(t,e,n,i,r,s,o){const a=new Tf,l=new j3,c=new Set,u=[],f=r.logarithmicDepthBuffer,h=r.vertexTextures;let d=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,T,L,I,V){const z=I.fog,j=V.geometry,B=b.isMeshStandardMaterial?I.environment:null,ne=(b.isMeshStandardMaterial?n:e).get(b.envMap||B),k=ne&&ne.mapping===Za?ne.image.height:null,fe=g[b.type];b.precision!==null&&(d=r.getMaxPrecision(b.precision),d!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));const ye=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,Ce=ye!==void 0?ye.length:0;let Oe=0;j.morphAttributes.position!==void 0&&(Oe=1),j.morphAttributes.normal!==void 0&&(Oe=2),j.morphAttributes.color!==void 0&&(Oe=3);let tt,at,Qe,re;if(fe){const lt=Yn[fe];tt=lt.vertexShader,at=lt.fragmentShader}else tt=b.vertexShader,at=b.fragmentShader,l.update(b),Qe=l.getVertexShaderID(b),re=l.getFragmentShaderID(b);const O=t.getRenderTarget(),ie=t.state.buffers.depth.getReversed(),ae=V.isInstancedMesh===!0,le=V.isBatchedMesh===!0,Re=!!b.map,$e=!!b.matcap,v=!!ne,D=!!b.aoMap,H=!!b.lightMap,K=!!b.bumpMap,G=!!b.normalMap,se=!!b.displacementMap,Q=!!b.emissiveMap,oe=!!b.metalnessMap,de=!!b.roughnessMap,ce=b.anisotropy>0,A=b.clearcoat>0,M=b.dispersion>0,N=b.iridescence>0,$=b.sheen>0,ee=b.transmission>0,Y=ce&&!!b.anisotropyMap,_e=A&&!!b.clearcoatMap,pe=A&&!!b.clearcoatNormalMap,Ee=A&&!!b.clearcoatRoughnessMap,Ae=N&&!!b.iridescenceMap,he=N&&!!b.iridescenceThicknessMap,Me=$&&!!b.sheenColorMap,Fe=$&&!!b.sheenRoughnessMap,we=!!b.specularMap,xe=!!b.specularColorMap,ze=!!b.specularIntensityMap,F=ee&&!!b.transmissionMap,ve=ee&&!!b.thicknessMap,Se=!!b.gradientMap,Le=!!b.alphaMap,me=b.alphaTest>0,ue=!!b.alphaHash,Ie=!!b.extensions;let We=ji;b.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(We=t.toneMapping);const mt={shaderID:fe,shaderType:b.type,shaderName:b.name,vertexShader:tt,fragmentShader:at,defines:b.defines,customVertexShaderID:Qe,customFragmentShaderID:re,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:le,batchingColor:le&&V._colorsTexture!==null,instancing:ae,instancingColor:ae&&V.instanceColor!==null,instancingMorph:ae&&V.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:O===null?t.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:ws,alphaToCoverage:!!b.alphaToCoverage,map:Re,matcap:$e,envMap:v,envMapMode:v&&ne.mapping,envMapCubeUVHeight:k,aoMap:D,lightMap:H,bumpMap:K,normalMap:G,displacementMap:h&&se,emissiveMap:Q,normalMapObjectSpace:G&&b.normalMapType===Gb,normalMapTangentSpace:G&&b.normalMapType===fv,metalnessMap:oe,roughnessMap:de,anisotropy:ce,anisotropyMap:Y,clearcoat:A,clearcoatMap:_e,clearcoatNormalMap:pe,clearcoatRoughnessMap:Ee,dispersion:M,iridescence:N,iridescenceMap:Ae,iridescenceThicknessMap:he,sheen:$,sheenColorMap:Me,sheenRoughnessMap:Fe,specularMap:we,specularColorMap:xe,specularIntensityMap:ze,transmission:ee,transmissionMap:F,thicknessMap:ve,gradientMap:Se,opaque:b.transparent===!1&&b.blending===gs&&b.alphaToCoverage===!1,alphaMap:Le,alphaTest:me,alphaHash:ue,combine:b.combine,mapUv:Re&&_(b.map.channel),aoMapUv:D&&_(b.aoMap.channel),lightMapUv:H&&_(b.lightMap.channel),bumpMapUv:K&&_(b.bumpMap.channel),normalMapUv:G&&_(b.normalMap.channel),displacementMapUv:se&&_(b.displacementMap.channel),emissiveMapUv:Q&&_(b.emissiveMap.channel),metalnessMapUv:oe&&_(b.metalnessMap.channel),roughnessMapUv:de&&_(b.roughnessMap.channel),anisotropyMapUv:Y&&_(b.anisotropyMap.channel),clearcoatMapUv:_e&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:pe&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ee&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Ae&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:he&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:Me&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:Fe&&_(b.sheenRoughnessMap.channel),specularMapUv:we&&_(b.specularMap.channel),specularColorMapUv:xe&&_(b.specularColorMap.channel),specularIntensityMapUv:ze&&_(b.specularIntensityMap.channel),transmissionMapUv:F&&_(b.transmissionMap.channel),thicknessMapUv:ve&&_(b.thicknessMap.channel),alphaMapUv:Le&&_(b.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(G||ce),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!j.attributes.uv&&(Re||Le),fog:!!z,useFog:b.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:ie,skinning:V.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:Ce,morphTextureStride:Oe,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:t.shadowMap.enabled&&L.length>0,shadowMapType:t.shadowMap.type,toneMapping:We,decodeVideoTexture:Re&&b.map.isVideoTexture===!0&&st.getTransfer(b.map.colorSpace)===ht,decodeVideoTextureEmissive:Q&&b.emissiveMap.isVideoTexture===!0&&st.getTransfer(b.emissiveMap.colorSpace)===ht,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===xi,flipSided:b.side===un,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Ie&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ie&&b.extensions.multiDraw===!0||le)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return mt.vertexUv1s=c.has(1),mt.vertexUv2s=c.has(2),mt.vertexUv3s=c.has(3),c.clear(),mt}function p(b){const T=[];if(b.shaderID?T.push(b.shaderID):(T.push(b.customVertexShaderID),T.push(b.customFragmentShaderID)),b.defines!==void 0)for(const L in b.defines)T.push(L),T.push(b.defines[L]);return b.isRawShaderMaterial===!1&&(E(T,b),x(T,b),T.push(t.outputColorSpace)),T.push(b.customProgramCacheKey),T.join()}function E(b,T){b.push(T.precision),b.push(T.outputColorSpace),b.push(T.envMapMode),b.push(T.envMapCubeUVHeight),b.push(T.mapUv),b.push(T.alphaMapUv),b.push(T.lightMapUv),b.push(T.aoMapUv),b.push(T.bumpMapUv),b.push(T.normalMapUv),b.push(T.displacementMapUv),b.push(T.emissiveMapUv),b.push(T.metalnessMapUv),b.push(T.roughnessMapUv),b.push(T.anisotropyMapUv),b.push(T.clearcoatMapUv),b.push(T.clearcoatNormalMapUv),b.push(T.clearcoatRoughnessMapUv),b.push(T.iridescenceMapUv),b.push(T.iridescenceThicknessMapUv),b.push(T.sheenColorMapUv),b.push(T.sheenRoughnessMapUv),b.push(T.specularMapUv),b.push(T.specularColorMapUv),b.push(T.specularIntensityMapUv),b.push(T.transmissionMapUv),b.push(T.thicknessMapUv),b.push(T.combine),b.push(T.fogExp2),b.push(T.sizeAttenuation),b.push(T.morphTargetsCount),b.push(T.morphAttributeCount),b.push(T.numDirLights),b.push(T.numPointLights),b.push(T.numSpotLights),b.push(T.numSpotLightMaps),b.push(T.numHemiLights),b.push(T.numRectAreaLights),b.push(T.numDirLightShadows),b.push(T.numPointLightShadows),b.push(T.numSpotLightShadows),b.push(T.numSpotLightShadowsWithMaps),b.push(T.numLightProbes),b.push(T.shadowMapType),b.push(T.toneMapping),b.push(T.numClippingPlanes),b.push(T.numClipIntersection),b.push(T.depthPacking)}function x(b,T){a.disableAll(),T.supportsVertexTextures&&a.enable(0),T.instancing&&a.enable(1),T.instancingColor&&a.enable(2),T.instancingMorph&&a.enable(3),T.matcap&&a.enable(4),T.envMap&&a.enable(5),T.normalMapObjectSpace&&a.enable(6),T.normalMapTangentSpace&&a.enable(7),T.clearcoat&&a.enable(8),T.iridescence&&a.enable(9),T.alphaTest&&a.enable(10),T.vertexColors&&a.enable(11),T.vertexAlphas&&a.enable(12),T.vertexUv1s&&a.enable(13),T.vertexUv2s&&a.enable(14),T.vertexUv3s&&a.enable(15),T.vertexTangents&&a.enable(16),T.anisotropy&&a.enable(17),T.alphaHash&&a.enable(18),T.batching&&a.enable(19),T.dispersion&&a.enable(20),T.batchingColor&&a.enable(21),T.gradientMap&&a.enable(22),b.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),b.push(a.mask)}function y(b){const T=g[b.type];let L;if(T){const I=Yn[T];L=xT.clone(I.uniforms)}else L=b.uniforms;return L}function C(b,T){let L;for(let I=0,V=u.length;I<V;I++){const z=u[I];if(z.cacheKey===T){L=z,++L.usedTimes;break}}return L===void 0&&(L=new X3(t,T,b,s),u.push(L)),L}function R(b){if(--b.usedTimes===0){const T=u.indexOf(b);u[T]=u[u.length-1],u.pop(),b.destroy()}}function P(b){l.remove(b)}function U(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:y,acquireProgram:C,releaseProgram:R,releaseShaderCache:P,programs:u,dispose:U}}function K3(){let t=new WeakMap;function e(o){return t.has(o)}function n(o){let a=t.get(o);return a===void 0&&(a={},t.set(o,a)),a}function i(o){t.delete(o)}function r(o,a,l){t.get(o)[a]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function Z3(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function np(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function ip(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(f,h,d,g,_,m){let p=t[e];return p===void 0?(p={id:f.id,object:f,geometry:h,material:d,groupOrder:g,renderOrder:f.renderOrder,z:_,group:m},t[e]=p):(p.id=f.id,p.object=f,p.geometry=h,p.material=d,p.groupOrder=g,p.renderOrder=f.renderOrder,p.z=_,p.group=m),e++,p}function a(f,h,d,g,_,m){const p=o(f,h,d,g,_,m);d.transmission>0?i.push(p):d.transparent===!0?r.push(p):n.push(p)}function l(f,h,d,g,_,m){const p=o(f,h,d,g,_,m);d.transmission>0?i.unshift(p):d.transparent===!0?r.unshift(p):n.unshift(p)}function c(f,h){n.length>1&&n.sort(f||Z3),i.length>1&&i.sort(h||np),r.length>1&&r.sort(h||np)}function u(){for(let f=e,h=t.length;f<h;f++){const d=t[f];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function J3(){let t=new WeakMap;function e(i,r){const s=t.get(i);let o;return s===void 0?(o=new ip,t.set(i,[o])):r>=s.length?(o=new ip,s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function Q3(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new q,color:new ot};break;case"SpotLight":n={position:new q,direction:new q,color:new ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new q,color:new ot,distance:0,decay:0};break;case"HemisphereLight":n={direction:new q,skyColor:new ot,groundColor:new ot};break;case"RectAreaLight":n={color:new ot,position:new q,halfWidth:new q,halfHeight:new q};break}return t[e.id]=n,n}}}function eC(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let tC=0;function nC(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function iC(t){const e=new Q3,n=eC(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new q);const r=new q,s=new At,o=new At;function a(c){let u=0,f=0,h=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,E=0,x=0,y=0,C=0,R=0,P=0;c.sort(nC);for(let b=0,T=c.length;b<T;b++){const L=c[b],I=L.color,V=L.intensity,z=L.distance,j=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=I.r*V,f+=I.g*V,h+=I.b*V;else if(L.isLightProbe){for(let B=0;B<9;B++)i.probe[B].addScaledVector(L.sh.coefficients[B],V);P++}else if(L.isDirectionalLight){const B=e.get(L);if(B.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const ne=L.shadow,k=n.get(L);k.shadowIntensity=ne.intensity,k.shadowBias=ne.bias,k.shadowNormalBias=ne.normalBias,k.shadowRadius=ne.radius,k.shadowMapSize=ne.mapSize,i.directionalShadow[d]=k,i.directionalShadowMap[d]=j,i.directionalShadowMatrix[d]=L.shadow.matrix,E++}i.directional[d]=B,d++}else if(L.isSpotLight){const B=e.get(L);B.position.setFromMatrixPosition(L.matrixWorld),B.color.copy(I).multiplyScalar(V),B.distance=z,B.coneCos=Math.cos(L.angle),B.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),B.decay=L.decay,i.spot[_]=B;const ne=L.shadow;if(L.map&&(i.spotLightMap[C]=L.map,C++,ne.updateMatrices(L),L.castShadow&&R++),i.spotLightMatrix[_]=ne.matrix,L.castShadow){const k=n.get(L);k.shadowIntensity=ne.intensity,k.shadowBias=ne.bias,k.shadowNormalBias=ne.normalBias,k.shadowRadius=ne.radius,k.shadowMapSize=ne.mapSize,i.spotShadow[_]=k,i.spotShadowMap[_]=j,y++}_++}else if(L.isRectAreaLight){const B=e.get(L);B.color.copy(I).multiplyScalar(V),B.halfWidth.set(L.width*.5,0,0),B.halfHeight.set(0,L.height*.5,0),i.rectArea[m]=B,m++}else if(L.isPointLight){const B=e.get(L);if(B.color.copy(L.color).multiplyScalar(L.intensity),B.distance=L.distance,B.decay=L.decay,L.castShadow){const ne=L.shadow,k=n.get(L);k.shadowIntensity=ne.intensity,k.shadowBias=ne.bias,k.shadowNormalBias=ne.normalBias,k.shadowRadius=ne.radius,k.shadowMapSize=ne.mapSize,k.shadowCameraNear=ne.camera.near,k.shadowCameraFar=ne.camera.far,i.pointShadow[g]=k,i.pointShadowMap[g]=j,i.pointShadowMatrix[g]=L.shadow.matrix,x++}i.point[g]=B,g++}else if(L.isHemisphereLight){const B=e.get(L);B.skyColor.copy(L.color).multiplyScalar(V),B.groundColor.copy(L.groundColor).multiplyScalar(V),i.hemi[p]=B,p++}}m>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=be.LTC_FLOAT_1,i.rectAreaLTC2=be.LTC_FLOAT_2):(i.rectAreaLTC1=be.LTC_HALF_1,i.rectAreaLTC2=be.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;const U=i.hash;(U.directionalLength!==d||U.pointLength!==g||U.spotLength!==_||U.rectAreaLength!==m||U.hemiLength!==p||U.numDirectionalShadows!==E||U.numPointShadows!==x||U.numSpotShadows!==y||U.numSpotMaps!==C||U.numLightProbes!==P)&&(i.directional.length=d,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=E,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=y+C-R,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=P,U.directionalLength=d,U.pointLength=g,U.spotLength=_,U.rectAreaLength=m,U.hemiLength=p,U.numDirectionalShadows=E,U.numPointShadows=x,U.numSpotShadows=y,U.numSpotMaps=C,U.numLightProbes=P,i.version=tC++)}function l(c,u){let f=0,h=0,d=0,g=0,_=0;const m=u.matrixWorldInverse;for(let p=0,E=c.length;p<E;p++){const x=c[p];if(x.isDirectionalLight){const y=i.directional[f];y.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),f++}else if(x.isSpotLight){const y=i.spot[d];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),d++}else if(x.isRectAreaLight){const y=i.rectArea[g];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(m),o.identity(),s.copy(x.matrixWorld),s.premultiply(m),o.extractRotation(s),y.halfWidth.set(x.width*.5,0,0),y.halfHeight.set(0,x.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),g++}else if(x.isPointLight){const y=i.point[h];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(m),h++}else if(x.isHemisphereLight){const y=i.hemi[_];y.direction.setFromMatrixPosition(x.matrixWorld),y.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:i}}function rp(t){const e=new iC(t),n=[],i=[];function r(u){c.camera=u,n.length=0,i.length=0}function s(u){n.push(u)}function o(u){i.push(u)}function a(){e.setup(n)}function l(u){e.setupView(n,u)}const c={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function rC(t){let e=new WeakMap;function n(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new rp(t),e.set(r,[a])):s>=o.length?(a=new rp(t),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:n,dispose:i}}const sC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,oC=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function aC(t,e,n){let i=new wf;const r=new Xe,s=new Xe,o=new wt,a=new RT({depthPacking:Vb}),l=new PT,c={},u=n.maxTextureSize,f={[Yi]:un,[un]:Yi,[xi]:xi},h=new Ki({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Xe},radius:{value:4}},vertexShader:sC,fragmentShader:oC}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const g=new Or;g.setAttribute("position",new ei(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Jn(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=tv;let p=this.type;this.render=function(R,P,U){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const b=t.getRenderTarget(),T=t.getActiveCubeFace(),L=t.getActiveMipmapLevel(),I=t.state;I.setBlending($i),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const V=p!==pi&&this.type===pi,z=p===pi&&this.type!==pi;for(let j=0,B=R.length;j<B;j++){const ne=R[j],k=ne.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",ne,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;r.copy(k.mapSize);const fe=k.getFrameExtents();if(r.multiply(fe),s.copy(k.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/fe.x),r.x=s.x*fe.x,k.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/fe.y),r.y=s.y*fe.y,k.mapSize.y=s.y)),k.map===null||V===!0||z===!0){const Ce=this.type!==pi?{minFilter:Hn,magFilter:Hn}:{};k.map!==null&&k.map.dispose(),k.map=new Cr(r.x,r.y,Ce),k.map.texture.name=ne.name+".shadowMap",k.camera.updateProjectionMatrix()}t.setRenderTarget(k.map),t.clear();const ye=k.getViewportCount();for(let Ce=0;Ce<ye;Ce++){const Oe=k.getViewport(Ce);o.set(s.x*Oe.x,s.y*Oe.y,s.x*Oe.z,s.y*Oe.w),I.viewport(o),k.updateMatrices(ne,Ce),i=k.getFrustum(),y(P,U,k.camera,ne,this.type)}k.isPointLightShadow!==!0&&this.type===pi&&E(k,U),k.needsUpdate=!1}p=this.type,m.needsUpdate=!1,t.setRenderTarget(b,T,L)};function E(R,P){const U=e.update(_);h.defines.VSM_SAMPLES!==R.blurSamples&&(h.defines.VSM_SAMPLES=R.blurSamples,d.defines.VSM_SAMPLES=R.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Cr(r.x,r.y)),h.uniforms.shadow_pass.value=R.map.texture,h.uniforms.resolution.value=R.mapSize,h.uniforms.radius.value=R.radius,t.setRenderTarget(R.mapPass),t.clear(),t.renderBufferDirect(P,null,U,h,_,null),d.uniforms.shadow_pass.value=R.mapPass.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,t.setRenderTarget(R.map),t.clear(),t.renderBufferDirect(P,null,U,d,_,null)}function x(R,P,U,b){let T=null;const L=U.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(L!==void 0)T=L;else if(T=U.isPointLight===!0?l:a,t.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const I=T.uuid,V=P.uuid;let z=c[I];z===void 0&&(z={},c[I]=z);let j=z[V];j===void 0&&(j=T.clone(),z[V]=j,P.addEventListener("dispose",C)),T=j}if(T.visible=P.visible,T.wireframe=P.wireframe,b===pi?T.side=P.shadowSide!==null?P.shadowSide:P.side:T.side=P.shadowSide!==null?P.shadowSide:f[P.side],T.alphaMap=P.alphaMap,T.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,T.map=P.map,T.clipShadows=P.clipShadows,T.clippingPlanes=P.clippingPlanes,T.clipIntersection=P.clipIntersection,T.displacementMap=P.displacementMap,T.displacementScale=P.displacementScale,T.displacementBias=P.displacementBias,T.wireframeLinewidth=P.wireframeLinewidth,T.linewidth=P.linewidth,U.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const I=t.properties.get(T);I.light=U}return T}function y(R,P,U,b,T){if(R.visible===!1)return;if(R.layers.test(P.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&T===pi)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,R.matrixWorld);const V=e.update(R),z=R.material;if(Array.isArray(z)){const j=V.groups;for(let B=0,ne=j.length;B<ne;B++){const k=j[B],fe=z[k.materialIndex];if(fe&&fe.visible){const ye=x(R,fe,b,T);R.onBeforeShadow(t,R,P,U,V,ye,k),t.renderBufferDirect(U,null,V,ye,R,k),R.onAfterShadow(t,R,P,U,V,ye,k)}}}else if(z.visible){const j=x(R,z,b,T);R.onBeforeShadow(t,R,P,U,V,j,null),t.renderBufferDirect(U,null,V,j,R,null),R.onAfterShadow(t,R,P,U,V,j,null)}}const I=R.children;for(let V=0,z=I.length;V<z;V++)y(I[V],P,U,b,T)}function C(R){R.target.removeEventListener("dispose",C);for(const U in c){const b=c[U],T=R.target.uuid;T in b&&(b[T].dispose(),delete b[T])}}}const lC={[Uc]:Nc,[Oc]:kc,[Fc]:Hc,[Es]:Bc,[Nc]:Uc,[kc]:Oc,[Hc]:Fc,[Bc]:Es};function cC(t,e){function n(){let F=!1;const ve=new wt;let Se=null;const Le=new wt(0,0,0,0);return{setMask:function(me){Se!==me&&!F&&(t.colorMask(me,me,me,me),Se=me)},setLocked:function(me){F=me},setClear:function(me,ue,Ie,We,mt){mt===!0&&(me*=We,ue*=We,Ie*=We),ve.set(me,ue,Ie,We),Le.equals(ve)===!1&&(t.clearColor(me,ue,Ie,We),Le.copy(ve))},reset:function(){F=!1,Se=null,Le.set(-1,0,0,0)}}}function i(){let F=!1,ve=!1,Se=null,Le=null,me=null;return{setReversed:function(ue){if(ve!==ue){const Ie=e.get("EXT_clip_control");ue?Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.ZERO_TO_ONE_EXT):Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.NEGATIVE_ONE_TO_ONE_EXT),ve=ue;const We=me;me=null,this.setClear(We)}},getReversed:function(){return ve},setTest:function(ue){ue?O(t.DEPTH_TEST):ie(t.DEPTH_TEST)},setMask:function(ue){Se!==ue&&!F&&(t.depthMask(ue),Se=ue)},setFunc:function(ue){if(ve&&(ue=lC[ue]),Le!==ue){switch(ue){case Uc:t.depthFunc(t.NEVER);break;case Nc:t.depthFunc(t.ALWAYS);break;case Oc:t.depthFunc(t.LESS);break;case Es:t.depthFunc(t.LEQUAL);break;case Fc:t.depthFunc(t.EQUAL);break;case Bc:t.depthFunc(t.GEQUAL);break;case kc:t.depthFunc(t.GREATER);break;case Hc:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}Le=ue}},setLocked:function(ue){F=ue},setClear:function(ue){me!==ue&&(ve&&(ue=1-ue),t.clearDepth(ue),me=ue)},reset:function(){F=!1,Se=null,Le=null,me=null,ve=!1}}}function r(){let F=!1,ve=null,Se=null,Le=null,me=null,ue=null,Ie=null,We=null,mt=null;return{setTest:function(lt){F||(lt?O(t.STENCIL_TEST):ie(t.STENCIL_TEST))},setMask:function(lt){ve!==lt&&!F&&(t.stencilMask(lt),ve=lt)},setFunc:function(lt,ri,Xn){(Se!==lt||Le!==ri||me!==Xn)&&(t.stencilFunc(lt,ri,Xn),Se=lt,Le=ri,me=Xn)},setOp:function(lt,ri,Xn){(ue!==lt||Ie!==ri||We!==Xn)&&(t.stencilOp(lt,ri,Xn),ue=lt,Ie=ri,We=Xn)},setLocked:function(lt){F=lt},setClear:function(lt){mt!==lt&&(t.clearStencil(lt),mt=lt)},reset:function(){F=!1,ve=null,Se=null,Le=null,me=null,ue=null,Ie=null,We=null,mt=null}}}const s=new n,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let u={},f={},h=new WeakMap,d=[],g=null,_=!1,m=null,p=null,E=null,x=null,y=null,C=null,R=null,P=new ot(0,0,0),U=0,b=!1,T=null,L=null,I=null,V=null,z=null;const j=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,ne=0;const k=t.getParameter(t.VERSION);k.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(k)[1]),B=ne>=1):k.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),B=ne>=2);let fe=null,ye={};const Ce=t.getParameter(t.SCISSOR_BOX),Oe=t.getParameter(t.VIEWPORT),tt=new wt().fromArray(Ce),at=new wt().fromArray(Oe);function Qe(F,ve,Se,Le){const me=new Uint8Array(4),ue=t.createTexture();t.bindTexture(F,ue),t.texParameteri(F,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(F,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Ie=0;Ie<Se;Ie++)F===t.TEXTURE_3D||F===t.TEXTURE_2D_ARRAY?t.texImage3D(ve,0,t.RGBA,1,1,Le,0,t.RGBA,t.UNSIGNED_BYTE,me):t.texImage2D(ve+Ie,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,me);return ue}const re={};re[t.TEXTURE_2D]=Qe(t.TEXTURE_2D,t.TEXTURE_2D,1),re[t.TEXTURE_CUBE_MAP]=Qe(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),re[t.TEXTURE_2D_ARRAY]=Qe(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),re[t.TEXTURE_3D]=Qe(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),O(t.DEPTH_TEST),o.setFunc(Es),K(!1),G(sd),O(t.CULL_FACE),D($i);function O(F){u[F]!==!0&&(t.enable(F),u[F]=!0)}function ie(F){u[F]!==!1&&(t.disable(F),u[F]=!1)}function ae(F,ve){return f[F]!==ve?(t.bindFramebuffer(F,ve),f[F]=ve,F===t.DRAW_FRAMEBUFFER&&(f[t.FRAMEBUFFER]=ve),F===t.FRAMEBUFFER&&(f[t.DRAW_FRAMEBUFFER]=ve),!0):!1}function le(F,ve){let Se=d,Le=!1;if(F){Se=h.get(ve),Se===void 0&&(Se=[],h.set(ve,Se));const me=F.textures;if(Se.length!==me.length||Se[0]!==t.COLOR_ATTACHMENT0){for(let ue=0,Ie=me.length;ue<Ie;ue++)Se[ue]=t.COLOR_ATTACHMENT0+ue;Se.length=me.length,Le=!0}}else Se[0]!==t.BACK&&(Se[0]=t.BACK,Le=!0);Le&&t.drawBuffers(Se)}function Re(F){return g!==F?(t.useProgram(F),g=F,!0):!1}const $e={[pr]:t.FUNC_ADD,[pb]:t.FUNC_SUBTRACT,[mb]:t.FUNC_REVERSE_SUBTRACT};$e[gb]=t.MIN,$e[vb]=t.MAX;const v={[_b]:t.ZERO,[xb]:t.ONE,[Sb]:t.SRC_COLOR,[Dc]:t.SRC_ALPHA,[wb]:t.SRC_ALPHA_SATURATE,[bb]:t.DST_COLOR,[Mb]:t.DST_ALPHA,[yb]:t.ONE_MINUS_SRC_COLOR,[Ic]:t.ONE_MINUS_SRC_ALPHA,[Tb]:t.ONE_MINUS_DST_COLOR,[Eb]:t.ONE_MINUS_DST_ALPHA,[Ab]:t.CONSTANT_COLOR,[Cb]:t.ONE_MINUS_CONSTANT_COLOR,[Rb]:t.CONSTANT_ALPHA,[Pb]:t.ONE_MINUS_CONSTANT_ALPHA};function D(F,ve,Se,Le,me,ue,Ie,We,mt,lt){if(F===$i){_===!0&&(ie(t.BLEND),_=!1);return}if(_===!1&&(O(t.BLEND),_=!0),F!==db){if(F!==m||lt!==b){if((p!==pr||y!==pr)&&(t.blendEquation(t.FUNC_ADD),p=pr,y=pr),lt)switch(F){case gs:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case od:t.blendFunc(t.ONE,t.ONE);break;case ad:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case ld:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case gs:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case od:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case ad:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ld:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}E=null,x=null,C=null,R=null,P.set(0,0,0),U=0,m=F,b=lt}return}me=me||ve,ue=ue||Se,Ie=Ie||Le,(ve!==p||me!==y)&&(t.blendEquationSeparate($e[ve],$e[me]),p=ve,y=me),(Se!==E||Le!==x||ue!==C||Ie!==R)&&(t.blendFuncSeparate(v[Se],v[Le],v[ue],v[Ie]),E=Se,x=Le,C=ue,R=Ie),(We.equals(P)===!1||mt!==U)&&(t.blendColor(We.r,We.g,We.b,mt),P.copy(We),U=mt),m=F,b=!1}function H(F,ve){F.side===xi?ie(t.CULL_FACE):O(t.CULL_FACE);let Se=F.side===un;ve&&(Se=!Se),K(Se),F.blending===gs&&F.transparent===!1?D($i):D(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),s.setMask(F.colorWrite);const Le=F.stencilWrite;a.setTest(Le),Le&&(a.setMask(F.stencilWriteMask),a.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),a.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Q(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?O(t.SAMPLE_ALPHA_TO_COVERAGE):ie(t.SAMPLE_ALPHA_TO_COVERAGE)}function K(F){T!==F&&(F?t.frontFace(t.CW):t.frontFace(t.CCW),T=F)}function G(F){F!==ub?(O(t.CULL_FACE),F!==L&&(F===sd?t.cullFace(t.BACK):F===fb?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):ie(t.CULL_FACE),L=F}function se(F){F!==I&&(B&&t.lineWidth(F),I=F)}function Q(F,ve,Se){F?(O(t.POLYGON_OFFSET_FILL),(V!==ve||z!==Se)&&(t.polygonOffset(ve,Se),V=ve,z=Se)):ie(t.POLYGON_OFFSET_FILL)}function oe(F){F?O(t.SCISSOR_TEST):ie(t.SCISSOR_TEST)}function de(F){F===void 0&&(F=t.TEXTURE0+j-1),fe!==F&&(t.activeTexture(F),fe=F)}function ce(F,ve,Se){Se===void 0&&(fe===null?Se=t.TEXTURE0+j-1:Se=fe);let Le=ye[Se];Le===void 0&&(Le={type:void 0,texture:void 0},ye[Se]=Le),(Le.type!==F||Le.texture!==ve)&&(fe!==Se&&(t.activeTexture(Se),fe=Se),t.bindTexture(F,ve||re[F]),Le.type=F,Le.texture=ve)}function A(){const F=ye[fe];F!==void 0&&F.type!==void 0&&(t.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function M(){try{t.compressedTexImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function N(){try{t.compressedTexImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function $(){try{t.texSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ee(){try{t.texSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Y(){try{t.compressedTexSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function _e(){try{t.compressedTexSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function pe(){try{t.texStorage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ee(){try{t.texStorage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ae(){try{t.texImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function he(){try{t.texImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Me(F){tt.equals(F)===!1&&(t.scissor(F.x,F.y,F.z,F.w),tt.copy(F))}function Fe(F){at.equals(F)===!1&&(t.viewport(F.x,F.y,F.z,F.w),at.copy(F))}function we(F,ve){let Se=c.get(ve);Se===void 0&&(Se=new WeakMap,c.set(ve,Se));let Le=Se.get(F);Le===void 0&&(Le=t.getUniformBlockIndex(ve,F.name),Se.set(F,Le))}function xe(F,ve){const Le=c.get(ve).get(F);l.get(ve)!==Le&&(t.uniformBlockBinding(ve,Le,F.__bindingPointIndex),l.set(ve,Le))}function ze(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),o.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),u={},fe=null,ye={},f={},h=new WeakMap,d=[],g=null,_=!1,m=null,p=null,E=null,x=null,y=null,C=null,R=null,P=new ot(0,0,0),U=0,b=!1,T=null,L=null,I=null,V=null,z=null,tt.set(0,0,t.canvas.width,t.canvas.height),at.set(0,0,t.canvas.width,t.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:O,disable:ie,bindFramebuffer:ae,drawBuffers:le,useProgram:Re,setBlending:D,setMaterial:H,setFlipSided:K,setCullFace:G,setLineWidth:se,setPolygonOffset:Q,setScissorTest:oe,activeTexture:de,bindTexture:ce,unbindTexture:A,compressedTexImage2D:M,compressedTexImage3D:N,texImage2D:Ae,texImage3D:he,updateUBOMapping:we,uniformBlockBinding:xe,texStorage2D:pe,texStorage3D:Ee,texSubImage2D:$,texSubImage3D:ee,compressedTexSubImage2D:Y,compressedTexSubImage3D:_e,scissor:Me,viewport:Fe,reset:ze}}function uC(t,e,n,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Xe,u=new WeakMap;let f;const h=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,M){return d?new OffscreenCanvas(A,M):Oa("canvas")}function _(A,M,N){let $=1;const ee=ce(A);if((ee.width>N||ee.height>N)&&($=N/Math.max(ee.width,ee.height)),$<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const Y=Math.floor($*ee.width),_e=Math.floor($*ee.height);f===void 0&&(f=g(Y,_e));const pe=M?g(Y,_e):f;return pe.width=Y,pe.height=_e,pe.getContext("2d").drawImage(A,0,0,Y,_e),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+Y+"x"+_e+")."),pe}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),A;return A}function m(A){return A.generateMipmaps}function p(A){t.generateMipmap(A)}function E(A){return A.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?t.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function x(A,M,N,$,ee=!1){if(A!==null){if(t[A]!==void 0)return t[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let Y=M;if(M===t.RED&&(N===t.FLOAT&&(Y=t.R32F),N===t.HALF_FLOAT&&(Y=t.R16F),N===t.UNSIGNED_BYTE&&(Y=t.R8)),M===t.RED_INTEGER&&(N===t.UNSIGNED_BYTE&&(Y=t.R8UI),N===t.UNSIGNED_SHORT&&(Y=t.R16UI),N===t.UNSIGNED_INT&&(Y=t.R32UI),N===t.BYTE&&(Y=t.R8I),N===t.SHORT&&(Y=t.R16I),N===t.INT&&(Y=t.R32I)),M===t.RG&&(N===t.FLOAT&&(Y=t.RG32F),N===t.HALF_FLOAT&&(Y=t.RG16F),N===t.UNSIGNED_BYTE&&(Y=t.RG8)),M===t.RG_INTEGER&&(N===t.UNSIGNED_BYTE&&(Y=t.RG8UI),N===t.UNSIGNED_SHORT&&(Y=t.RG16UI),N===t.UNSIGNED_INT&&(Y=t.RG32UI),N===t.BYTE&&(Y=t.RG8I),N===t.SHORT&&(Y=t.RG16I),N===t.INT&&(Y=t.RG32I)),M===t.RGB_INTEGER&&(N===t.UNSIGNED_BYTE&&(Y=t.RGB8UI),N===t.UNSIGNED_SHORT&&(Y=t.RGB16UI),N===t.UNSIGNED_INT&&(Y=t.RGB32UI),N===t.BYTE&&(Y=t.RGB8I),N===t.SHORT&&(Y=t.RGB16I),N===t.INT&&(Y=t.RGB32I)),M===t.RGBA_INTEGER&&(N===t.UNSIGNED_BYTE&&(Y=t.RGBA8UI),N===t.UNSIGNED_SHORT&&(Y=t.RGBA16UI),N===t.UNSIGNED_INT&&(Y=t.RGBA32UI),N===t.BYTE&&(Y=t.RGBA8I),N===t.SHORT&&(Y=t.RGBA16I),N===t.INT&&(Y=t.RGBA32I)),M===t.RGB&&(N===t.UNSIGNED_INT_5_9_9_9_REV&&(Y=t.RGB9_E5),N===t.UNSIGNED_INT_10F_11F_11F_REV&&(Y=t.R11F_G11F_B10F)),M===t.RGBA){const _e=ee?Ua:st.getTransfer($);N===t.FLOAT&&(Y=t.RGBA32F),N===t.HALF_FLOAT&&(Y=t.RGBA16F),N===t.UNSIGNED_BYTE&&(Y=_e===ht?t.SRGB8_ALPHA8:t.RGBA8),N===t.UNSIGNED_SHORT_4_4_4_4&&(Y=t.RGBA4),N===t.UNSIGNED_SHORT_5_5_5_1&&(Y=t.RGB5_A1)}return(Y===t.R16F||Y===t.R32F||Y===t.RG16F||Y===t.RG32F||Y===t.RGBA16F||Y===t.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function y(A,M){let N;return A?M===null||M===wr||M===co?N=t.DEPTH24_STENCIL8:M===Si?N=t.DEPTH32F_STENCIL8:M===lo&&(N=t.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===wr||M===co?N=t.DEPTH_COMPONENT24:M===Si?N=t.DEPTH_COMPONENT32F:M===lo&&(N=t.DEPTH_COMPONENT16),N}function C(A,M){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==Hn&&A.minFilter!==Kn?Math.log2(Math.max(M.width,M.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?M.mipmaps.length:1}function R(A){const M=A.target;M.removeEventListener("dispose",R),U(M),M.isVideoTexture&&u.delete(M)}function P(A){const M=A.target;M.removeEventListener("dispose",P),T(M)}function U(A){const M=i.get(A);if(M.__webglInit===void 0)return;const N=A.source,$=h.get(N);if($){const ee=$[M.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&b(A),Object.keys($).length===0&&h.delete(N)}i.remove(A)}function b(A){const M=i.get(A);t.deleteTexture(M.__webglTexture);const N=A.source,$=h.get(N);delete $[M.__cacheKey],o.memory.textures--}function T(A){const M=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(M.__webglFramebuffer[$]))for(let ee=0;ee<M.__webglFramebuffer[$].length;ee++)t.deleteFramebuffer(M.__webglFramebuffer[$][ee]);else t.deleteFramebuffer(M.__webglFramebuffer[$]);M.__webglDepthbuffer&&t.deleteRenderbuffer(M.__webglDepthbuffer[$])}else{if(Array.isArray(M.__webglFramebuffer))for(let $=0;$<M.__webglFramebuffer.length;$++)t.deleteFramebuffer(M.__webglFramebuffer[$]);else t.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&t.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&t.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let $=0;$<M.__webglColorRenderbuffer.length;$++)M.__webglColorRenderbuffer[$]&&t.deleteRenderbuffer(M.__webglColorRenderbuffer[$]);M.__webglDepthRenderbuffer&&t.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const N=A.textures;for(let $=0,ee=N.length;$<ee;$++){const Y=i.get(N[$]);Y.__webglTexture&&(t.deleteTexture(Y.__webglTexture),o.memory.textures--),i.remove(N[$])}i.remove(A)}let L=0;function I(){L=0}function V(){const A=L;return A>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),L+=1,A}function z(A){const M=[];return M.push(A.wrapS),M.push(A.wrapT),M.push(A.wrapR||0),M.push(A.magFilter),M.push(A.minFilter),M.push(A.anisotropy),M.push(A.internalFormat),M.push(A.format),M.push(A.type),M.push(A.generateMipmaps),M.push(A.premultiplyAlpha),M.push(A.flipY),M.push(A.unpackAlignment),M.push(A.colorSpace),M.join()}function j(A,M){const N=i.get(A);if(A.isVideoTexture&&oe(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&N.__version!==A.version){const $=A.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{re(N,A,M);return}}else A.isExternalTexture&&(N.__webglTexture=A.sourceTexture?A.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,N.__webglTexture,t.TEXTURE0+M)}function B(A,M){const N=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&N.__version!==A.version){re(N,A,M);return}n.bindTexture(t.TEXTURE_2D_ARRAY,N.__webglTexture,t.TEXTURE0+M)}function ne(A,M){const N=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&N.__version!==A.version){re(N,A,M);return}n.bindTexture(t.TEXTURE_3D,N.__webglTexture,t.TEXTURE0+M)}function k(A,M){const N=i.get(A);if(A.version>0&&N.__version!==A.version){O(N,A,M);return}n.bindTexture(t.TEXTURE_CUBE_MAP,N.__webglTexture,t.TEXTURE0+M)}const fe={[Gc]:t.REPEAT,[vr]:t.CLAMP_TO_EDGE,[Wc]:t.MIRRORED_REPEAT},ye={[Hn]:t.NEAREST,[Hb]:t.NEAREST_MIPMAP_NEAREST,[Go]:t.NEAREST_MIPMAP_LINEAR,[Kn]:t.LINEAR,[Al]:t.LINEAR_MIPMAP_NEAREST,[_r]:t.LINEAR_MIPMAP_LINEAR},Ce={[Wb]:t.NEVER,[Kb]:t.ALWAYS,[Xb]:t.LESS,[hv]:t.LEQUAL,[$b]:t.EQUAL,[Yb]:t.GEQUAL,[jb]:t.GREATER,[qb]:t.NOTEQUAL};function Oe(A,M){if(M.type===Si&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Kn||M.magFilter===Al||M.magFilter===Go||M.magFilter===_r||M.minFilter===Kn||M.minFilter===Al||M.minFilter===Go||M.minFilter===_r)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(A,t.TEXTURE_WRAP_S,fe[M.wrapS]),t.texParameteri(A,t.TEXTURE_WRAP_T,fe[M.wrapT]),(A===t.TEXTURE_3D||A===t.TEXTURE_2D_ARRAY)&&t.texParameteri(A,t.TEXTURE_WRAP_R,fe[M.wrapR]),t.texParameteri(A,t.TEXTURE_MAG_FILTER,ye[M.magFilter]),t.texParameteri(A,t.TEXTURE_MIN_FILTER,ye[M.minFilter]),M.compareFunction&&(t.texParameteri(A,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(A,t.TEXTURE_COMPARE_FUNC,Ce[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Hn||M.minFilter!==Go&&M.minFilter!==_r||M.type===Si&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const N=e.get("EXT_texture_filter_anisotropic");t.texParameterf(A,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function tt(A,M){let N=!1;A.__webglInit===void 0&&(A.__webglInit=!0,M.addEventListener("dispose",R));const $=M.source;let ee=h.get($);ee===void 0&&(ee={},h.set($,ee));const Y=z(M);if(Y!==A.__cacheKey){ee[Y]===void 0&&(ee[Y]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,N=!0),ee[Y].usedTimes++;const _e=ee[A.__cacheKey];_e!==void 0&&(ee[A.__cacheKey].usedTimes--,_e.usedTimes===0&&b(M)),A.__cacheKey=Y,A.__webglTexture=ee[Y].texture}return N}function at(A,M,N){return Math.floor(Math.floor(A/N)/M)}function Qe(A,M,N,$){const Y=A.updateRanges;if(Y.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,M.width,M.height,N,$,M.data);else{Y.sort((he,Me)=>he.start-Me.start);let _e=0;for(let he=1;he<Y.length;he++){const Me=Y[_e],Fe=Y[he],we=Me.start+Me.count,xe=at(Fe.start,M.width,4),ze=at(Me.start,M.width,4);Fe.start<=we+1&&xe===ze&&at(Fe.start+Fe.count-1,M.width,4)===xe?Me.count=Math.max(Me.count,Fe.start+Fe.count-Me.start):(++_e,Y[_e]=Fe)}Y.length=_e+1;const pe=t.getParameter(t.UNPACK_ROW_LENGTH),Ee=t.getParameter(t.UNPACK_SKIP_PIXELS),Ae=t.getParameter(t.UNPACK_SKIP_ROWS);t.pixelStorei(t.UNPACK_ROW_LENGTH,M.width);for(let he=0,Me=Y.length;he<Me;he++){const Fe=Y[he],we=Math.floor(Fe.start/4),xe=Math.ceil(Fe.count/4),ze=we%M.width,F=Math.floor(we/M.width),ve=xe,Se=1;t.pixelStorei(t.UNPACK_SKIP_PIXELS,ze),t.pixelStorei(t.UNPACK_SKIP_ROWS,F),n.texSubImage2D(t.TEXTURE_2D,0,ze,F,ve,Se,N,$,M.data)}A.clearUpdateRanges(),t.pixelStorei(t.UNPACK_ROW_LENGTH,pe),t.pixelStorei(t.UNPACK_SKIP_PIXELS,Ee),t.pixelStorei(t.UNPACK_SKIP_ROWS,Ae)}}function re(A,M,N){let $=t.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&($=t.TEXTURE_2D_ARRAY),M.isData3DTexture&&($=t.TEXTURE_3D);const ee=tt(A,M),Y=M.source;n.bindTexture($,A.__webglTexture,t.TEXTURE0+N);const _e=i.get(Y);if(Y.version!==_e.__version||ee===!0){n.activeTexture(t.TEXTURE0+N);const pe=st.getPrimaries(st.workingColorSpace),Ee=M.colorSpace===Gi?null:st.getPrimaries(M.colorSpace),Ae=M.colorSpace===Gi||pe===Ee?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);let he=_(M.image,!1,r.maxTextureSize);he=de(M,he);const Me=s.convert(M.format,M.colorSpace),Fe=s.convert(M.type);let we=x(M.internalFormat,Me,Fe,M.colorSpace,M.isVideoTexture);Oe($,M);let xe;const ze=M.mipmaps,F=M.isVideoTexture!==!0,ve=_e.__version===void 0||ee===!0,Se=Y.dataReady,Le=C(M,he);if(M.isDepthTexture)we=y(M.format===fo,M.type),ve&&(F?n.texStorage2D(t.TEXTURE_2D,1,we,he.width,he.height):n.texImage2D(t.TEXTURE_2D,0,we,he.width,he.height,0,Me,Fe,null));else if(M.isDataTexture)if(ze.length>0){F&&ve&&n.texStorage2D(t.TEXTURE_2D,Le,we,ze[0].width,ze[0].height);for(let me=0,ue=ze.length;me<ue;me++)xe=ze[me],F?Se&&n.texSubImage2D(t.TEXTURE_2D,me,0,0,xe.width,xe.height,Me,Fe,xe.data):n.texImage2D(t.TEXTURE_2D,me,we,xe.width,xe.height,0,Me,Fe,xe.data);M.generateMipmaps=!1}else F?(ve&&n.texStorage2D(t.TEXTURE_2D,Le,we,he.width,he.height),Se&&Qe(M,he,Me,Fe)):n.texImage2D(t.TEXTURE_2D,0,we,he.width,he.height,0,Me,Fe,he.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){F&&ve&&n.texStorage3D(t.TEXTURE_2D_ARRAY,Le,we,ze[0].width,ze[0].height,he.depth);for(let me=0,ue=ze.length;me<ue;me++)if(xe=ze[me],M.format!==Fn)if(Me!==null)if(F){if(Se)if(M.layerUpdates.size>0){const Ie=Ud(xe.width,xe.height,M.format,M.type);for(const We of M.layerUpdates){const mt=xe.data.subarray(We*Ie/xe.data.BYTES_PER_ELEMENT,(We+1)*Ie/xe.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,me,0,0,We,xe.width,xe.height,1,Me,mt)}M.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,me,0,0,0,xe.width,xe.height,he.depth,Me,xe.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,me,we,xe.width,xe.height,he.depth,0,xe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else F?Se&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,me,0,0,0,xe.width,xe.height,he.depth,Me,Fe,xe.data):n.texImage3D(t.TEXTURE_2D_ARRAY,me,we,xe.width,xe.height,he.depth,0,Me,Fe,xe.data)}else{F&&ve&&n.texStorage2D(t.TEXTURE_2D,Le,we,ze[0].width,ze[0].height);for(let me=0,ue=ze.length;me<ue;me++)xe=ze[me],M.format!==Fn?Me!==null?F?Se&&n.compressedTexSubImage2D(t.TEXTURE_2D,me,0,0,xe.width,xe.height,Me,xe.data):n.compressedTexImage2D(t.TEXTURE_2D,me,we,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):F?Se&&n.texSubImage2D(t.TEXTURE_2D,me,0,0,xe.width,xe.height,Me,Fe,xe.data):n.texImage2D(t.TEXTURE_2D,me,we,xe.width,xe.height,0,Me,Fe,xe.data)}else if(M.isDataArrayTexture)if(F){if(ve&&n.texStorage3D(t.TEXTURE_2D_ARRAY,Le,we,he.width,he.height,he.depth),Se)if(M.layerUpdates.size>0){const me=Ud(he.width,he.height,M.format,M.type);for(const ue of M.layerUpdates){const Ie=he.data.subarray(ue*me/he.data.BYTES_PER_ELEMENT,(ue+1)*me/he.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,ue,he.width,he.height,1,Me,Fe,Ie)}M.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,he.width,he.height,he.depth,Me,Fe,he.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,we,he.width,he.height,he.depth,0,Me,Fe,he.data);else if(M.isData3DTexture)F?(ve&&n.texStorage3D(t.TEXTURE_3D,Le,we,he.width,he.height,he.depth),Se&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,he.width,he.height,he.depth,Me,Fe,he.data)):n.texImage3D(t.TEXTURE_3D,0,we,he.width,he.height,he.depth,0,Me,Fe,he.data);else if(M.isFramebufferTexture){if(ve)if(F)n.texStorage2D(t.TEXTURE_2D,Le,we,he.width,he.height);else{let me=he.width,ue=he.height;for(let Ie=0;Ie<Le;Ie++)n.texImage2D(t.TEXTURE_2D,Ie,we,me,ue,0,Me,Fe,null),me>>=1,ue>>=1}}else if(ze.length>0){if(F&&ve){const me=ce(ze[0]);n.texStorage2D(t.TEXTURE_2D,Le,we,me.width,me.height)}for(let me=0,ue=ze.length;me<ue;me++)xe=ze[me],F?Se&&n.texSubImage2D(t.TEXTURE_2D,me,0,0,Me,Fe,xe):n.texImage2D(t.TEXTURE_2D,me,we,Me,Fe,xe);M.generateMipmaps=!1}else if(F){if(ve){const me=ce(he);n.texStorage2D(t.TEXTURE_2D,Le,we,me.width,me.height)}Se&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,Me,Fe,he)}else n.texImage2D(t.TEXTURE_2D,0,we,Me,Fe,he);m(M)&&p($),_e.__version=Y.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function O(A,M,N){if(M.image.length!==6)return;const $=tt(A,M),ee=M.source;n.bindTexture(t.TEXTURE_CUBE_MAP,A.__webglTexture,t.TEXTURE0+N);const Y=i.get(ee);if(ee.version!==Y.__version||$===!0){n.activeTexture(t.TEXTURE0+N);const _e=st.getPrimaries(st.workingColorSpace),pe=M.colorSpace===Gi?null:st.getPrimaries(M.colorSpace),Ee=M.colorSpace===Gi||_e===pe?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);const Ae=M.isCompressedTexture||M.image[0].isCompressedTexture,he=M.image[0]&&M.image[0].isDataTexture,Me=[];for(let ue=0;ue<6;ue++)!Ae&&!he?Me[ue]=_(M.image[ue],!0,r.maxCubemapSize):Me[ue]=he?M.image[ue].image:M.image[ue],Me[ue]=de(M,Me[ue]);const Fe=Me[0],we=s.convert(M.format,M.colorSpace),xe=s.convert(M.type),ze=x(M.internalFormat,we,xe,M.colorSpace),F=M.isVideoTexture!==!0,ve=Y.__version===void 0||$===!0,Se=ee.dataReady;let Le=C(M,Fe);Oe(t.TEXTURE_CUBE_MAP,M);let me;if(Ae){F&&ve&&n.texStorage2D(t.TEXTURE_CUBE_MAP,Le,ze,Fe.width,Fe.height);for(let ue=0;ue<6;ue++){me=Me[ue].mipmaps;for(let Ie=0;Ie<me.length;Ie++){const We=me[Ie];M.format!==Fn?we!==null?F?Se&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ie,0,0,We.width,We.height,we,We.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ie,ze,We.width,We.height,0,We.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?Se&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ie,0,0,We.width,We.height,we,xe,We.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ie,ze,We.width,We.height,0,we,xe,We.data)}}}else{if(me=M.mipmaps,F&&ve){me.length>0&&Le++;const ue=ce(Me[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,Le,ze,ue.width,ue.height)}for(let ue=0;ue<6;ue++)if(he){F?Se&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,0,0,Me[ue].width,Me[ue].height,we,xe,Me[ue].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,ze,Me[ue].width,Me[ue].height,0,we,xe,Me[ue].data);for(let Ie=0;Ie<me.length;Ie++){const mt=me[Ie].image[ue].image;F?Se&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ie+1,0,0,mt.width,mt.height,we,xe,mt.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ie+1,ze,mt.width,mt.height,0,we,xe,mt.data)}}else{F?Se&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,0,0,we,xe,Me[ue]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,ze,we,xe,Me[ue]);for(let Ie=0;Ie<me.length;Ie++){const We=me[Ie];F?Se&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ie+1,0,0,we,xe,We.image[ue]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ie+1,ze,we,xe,We.image[ue])}}}m(M)&&p(t.TEXTURE_CUBE_MAP),Y.__version=ee.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function ie(A,M,N,$,ee,Y){const _e=s.convert(N.format,N.colorSpace),pe=s.convert(N.type),Ee=x(N.internalFormat,_e,pe,N.colorSpace),Ae=i.get(M),he=i.get(N);if(he.__renderTarget=M,!Ae.__hasExternalTextures){const Me=Math.max(1,M.width>>Y),Fe=Math.max(1,M.height>>Y);ee===t.TEXTURE_3D||ee===t.TEXTURE_2D_ARRAY?n.texImage3D(ee,Y,Ee,Me,Fe,M.depth,0,_e,pe,null):n.texImage2D(ee,Y,Ee,Me,Fe,0,_e,pe,null)}n.bindFramebuffer(t.FRAMEBUFFER,A),Q(M)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,$,ee,he.__webglTexture,0,se(M)):(ee===t.TEXTURE_2D||ee>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,$,ee,he.__webglTexture,Y),n.bindFramebuffer(t.FRAMEBUFFER,null)}function ae(A,M,N){if(t.bindRenderbuffer(t.RENDERBUFFER,A),M.depthBuffer){const $=M.depthTexture,ee=$&&$.isDepthTexture?$.type:null,Y=y(M.stencilBuffer,ee),_e=M.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,pe=se(M);Q(M)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,pe,Y,M.width,M.height):N?t.renderbufferStorageMultisample(t.RENDERBUFFER,pe,Y,M.width,M.height):t.renderbufferStorage(t.RENDERBUFFER,Y,M.width,M.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,_e,t.RENDERBUFFER,A)}else{const $=M.textures;for(let ee=0;ee<$.length;ee++){const Y=$[ee],_e=s.convert(Y.format,Y.colorSpace),pe=s.convert(Y.type),Ee=x(Y.internalFormat,_e,pe,Y.colorSpace),Ae=se(M);N&&Q(M)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,Ae,Ee,M.width,M.height):Q(M)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Ae,Ee,M.width,M.height):t.renderbufferStorage(t.RENDERBUFFER,Ee,M.width,M.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function le(A,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,A),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const $=i.get(M.depthTexture);$.__renderTarget=M,(!$.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),j(M.depthTexture,0);const ee=$.__webglTexture,Y=se(M);if(M.depthTexture.format===uo)Q(M)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ee,0,Y):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ee,0);else if(M.depthTexture.format===fo)Q(M)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ee,0,Y):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function Re(A){const M=i.get(A),N=A.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==A.depthTexture){const $=A.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),$){const ee=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,$.removeEventListener("dispose",ee)};$.addEventListener("dispose",ee),M.__depthDisposeCallback=ee}M.__boundDepthTexture=$}if(A.depthTexture&&!M.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");const $=A.texture.mipmaps;$&&$.length>0?le(M.__webglFramebuffer[0],A):le(M.__webglFramebuffer,A)}else if(N){M.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(n.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer[$]),M.__webglDepthbuffer[$]===void 0)M.__webglDepthbuffer[$]=t.createRenderbuffer(),ae(M.__webglDepthbuffer[$],A,!1);else{const ee=A.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Y=M.__webglDepthbuffer[$];t.bindRenderbuffer(t.RENDERBUFFER,Y),t.framebufferRenderbuffer(t.FRAMEBUFFER,ee,t.RENDERBUFFER,Y)}}else{const $=A.texture.mipmaps;if($&&$.length>0?n.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=t.createRenderbuffer(),ae(M.__webglDepthbuffer,A,!1);else{const ee=A.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Y=M.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,Y),t.framebufferRenderbuffer(t.FRAMEBUFFER,ee,t.RENDERBUFFER,Y)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function $e(A,M,N){const $=i.get(A);M!==void 0&&ie($.__webglFramebuffer,A,A.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),N!==void 0&&Re(A)}function v(A){const M=A.texture,N=i.get(A),$=i.get(M);A.addEventListener("dispose",P);const ee=A.textures,Y=A.isWebGLCubeRenderTarget===!0,_e=ee.length>1;if(_e||($.__webglTexture===void 0&&($.__webglTexture=t.createTexture()),$.__version=M.version,o.memory.textures++),Y){N.__webglFramebuffer=[];for(let pe=0;pe<6;pe++)if(M.mipmaps&&M.mipmaps.length>0){N.__webglFramebuffer[pe]=[];for(let Ee=0;Ee<M.mipmaps.length;Ee++)N.__webglFramebuffer[pe][Ee]=t.createFramebuffer()}else N.__webglFramebuffer[pe]=t.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){N.__webglFramebuffer=[];for(let pe=0;pe<M.mipmaps.length;pe++)N.__webglFramebuffer[pe]=t.createFramebuffer()}else N.__webglFramebuffer=t.createFramebuffer();if(_e)for(let pe=0,Ee=ee.length;pe<Ee;pe++){const Ae=i.get(ee[pe]);Ae.__webglTexture===void 0&&(Ae.__webglTexture=t.createTexture(),o.memory.textures++)}if(A.samples>0&&Q(A)===!1){N.__webglMultisampledFramebuffer=t.createFramebuffer(),N.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let pe=0;pe<ee.length;pe++){const Ee=ee[pe];N.__webglColorRenderbuffer[pe]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,N.__webglColorRenderbuffer[pe]);const Ae=s.convert(Ee.format,Ee.colorSpace),he=s.convert(Ee.type),Me=x(Ee.internalFormat,Ae,he,Ee.colorSpace,A.isXRRenderTarget===!0),Fe=se(A);t.renderbufferStorageMultisample(t.RENDERBUFFER,Fe,Me,A.width,A.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+pe,t.RENDERBUFFER,N.__webglColorRenderbuffer[pe])}t.bindRenderbuffer(t.RENDERBUFFER,null),A.depthBuffer&&(N.__webglDepthRenderbuffer=t.createRenderbuffer(),ae(N.__webglDepthRenderbuffer,A,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(Y){n.bindTexture(t.TEXTURE_CUBE_MAP,$.__webglTexture),Oe(t.TEXTURE_CUBE_MAP,M);for(let pe=0;pe<6;pe++)if(M.mipmaps&&M.mipmaps.length>0)for(let Ee=0;Ee<M.mipmaps.length;Ee++)ie(N.__webglFramebuffer[pe][Ee],A,M,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ee);else ie(N.__webglFramebuffer[pe],A,M,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0);m(M)&&p(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(_e){for(let pe=0,Ee=ee.length;pe<Ee;pe++){const Ae=ee[pe],he=i.get(Ae);let Me=t.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Me=A.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(Me,he.__webglTexture),Oe(Me,Ae),ie(N.__webglFramebuffer,A,Ae,t.COLOR_ATTACHMENT0+pe,Me,0),m(Ae)&&p(Me)}n.unbindTexture()}else{let pe=t.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(pe=A.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(pe,$.__webglTexture),Oe(pe,M),M.mipmaps&&M.mipmaps.length>0)for(let Ee=0;Ee<M.mipmaps.length;Ee++)ie(N.__webglFramebuffer[Ee],A,M,t.COLOR_ATTACHMENT0,pe,Ee);else ie(N.__webglFramebuffer,A,M,t.COLOR_ATTACHMENT0,pe,0);m(M)&&p(pe),n.unbindTexture()}A.depthBuffer&&Re(A)}function D(A){const M=A.textures;for(let N=0,$=M.length;N<$;N++){const ee=M[N];if(m(ee)){const Y=E(A),_e=i.get(ee).__webglTexture;n.bindTexture(Y,_e),p(Y),n.unbindTexture()}}}const H=[],K=[];function G(A){if(A.samples>0){if(Q(A)===!1){const M=A.textures,N=A.width,$=A.height;let ee=t.COLOR_BUFFER_BIT;const Y=A.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,_e=i.get(A),pe=M.length>1;if(pe)for(let Ae=0;Ae<M.length;Ae++)n.bindFramebuffer(t.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ae,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,_e.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ae,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,_e.__webglMultisampledFramebuffer);const Ee=A.texture.mipmaps;Ee&&Ee.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,_e.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,_e.__webglFramebuffer);for(let Ae=0;Ae<M.length;Ae++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(ee|=t.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(ee|=t.STENCIL_BUFFER_BIT)),pe){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,_e.__webglColorRenderbuffer[Ae]);const he=i.get(M[Ae]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,he,0)}t.blitFramebuffer(0,0,N,$,0,0,N,$,ee,t.NEAREST),l===!0&&(H.length=0,K.length=0,H.push(t.COLOR_ATTACHMENT0+Ae),A.depthBuffer&&A.resolveDepthBuffer===!1&&(H.push(Y),K.push(Y),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,K)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,H))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),pe)for(let Ae=0;Ae<M.length;Ae++){n.bindFramebuffer(t.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ae,t.RENDERBUFFER,_e.__webglColorRenderbuffer[Ae]);const he=i.get(M[Ae]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,_e.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ae,t.TEXTURE_2D,he,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,_e.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const M=A.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[M])}}}function se(A){return Math.min(r.maxSamples,A.samples)}function Q(A){const M=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function oe(A){const M=o.render.frame;u.get(A)!==M&&(u.set(A,M),A.update())}function de(A,M){const N=A.colorSpace,$=A.format,ee=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||N!==ws&&N!==Gi&&(st.getTransfer(N)===ht?($!==Fn||ee!==ti)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),M}function ce(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=I,this.setTexture2D=j,this.setTexture2DArray=B,this.setTexture3D=ne,this.setTextureCube=k,this.rebindTextures=$e,this.setupRenderTarget=v,this.updateRenderTargetMipmap=D,this.updateMultisampleRenderTarget=G,this.setupDepthRenderbuffer=Re,this.setupFrameBufferTexture=ie,this.useMultisampledRTT=Q}function fC(t,e){function n(i,r=Gi){let s;const o=st.getTransfer(r);if(i===ti)return t.UNSIGNED_BYTE;if(i===vf)return t.UNSIGNED_SHORT_4_4_4_4;if(i===_f)return t.UNSIGNED_SHORT_5_5_5_1;if(i===sv)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===ov)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===iv)return t.BYTE;if(i===rv)return t.SHORT;if(i===lo)return t.UNSIGNED_SHORT;if(i===gf)return t.INT;if(i===wr)return t.UNSIGNED_INT;if(i===Si)return t.FLOAT;if(i===Ao)return t.HALF_FLOAT;if(i===av)return t.ALPHA;if(i===lv)return t.RGB;if(i===Fn)return t.RGBA;if(i===uo)return t.DEPTH_COMPONENT;if(i===fo)return t.DEPTH_STENCIL;if(i===cv)return t.RED;if(i===xf)return t.RED_INTEGER;if(i===uv)return t.RG;if(i===Sf)return t.RG_INTEGER;if(i===yf)return t.RGBA_INTEGER;if(i===ma||i===ga||i===va||i===_a)if(o===ht)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===ma)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ga)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===va)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===_a)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===ma)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ga)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===va)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===_a)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Xc||i===$c||i===jc||i===qc)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Xc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===$c)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===jc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===qc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Yc||i===Kc||i===Zc)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Yc||i===Kc)return o===ht?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Zc)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Jc||i===Qc||i===eu||i===tu||i===nu||i===iu||i===ru||i===su||i===ou||i===au||i===lu||i===cu||i===uu||i===fu)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Jc)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Qc)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===eu)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===tu)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===nu)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===iu)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ru)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===su)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ou)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===au)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===lu)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===cu)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===uu)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===fu)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===hu||i===du||i===pu)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===hu)return o===ht?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===du)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===pu)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===mu||i===gu||i===vu||i===_u)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===mu)return s.COMPRESSED_RED_RGTC1_EXT;if(i===gu)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===vu)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===_u)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===co?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const hC=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,dC=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class pC{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const i=new Ev(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new Ki({vertexShader:hC,fragmentShader:dC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Jn(new Ja(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class mC extends Nr{constructor(e,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,f=null,h=null,d=null,g=null;const _=typeof XRWebGLBinding<"u",m=new pC,p={},E=n.getContextAttributes();let x=null,y=null;const C=[],R=[],P=new Xe;let U=null;const b=new wn;b.viewport=new wt;const T=new wn;T.viewport=new wt;const L=[b,T],I=new UT;let V=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(re){let O=C[re];return O===void 0&&(O=new Yl,C[re]=O),O.getTargetRaySpace()},this.getControllerGrip=function(re){let O=C[re];return O===void 0&&(O=new Yl,C[re]=O),O.getGripSpace()},this.getHand=function(re){let O=C[re];return O===void 0&&(O=new Yl,C[re]=O),O.getHandSpace()};function j(re){const O=R.indexOf(re.inputSource);if(O===-1)return;const ie=C[O];ie!==void 0&&(ie.update(re.inputSource,re.frame,c||o),ie.dispatchEvent({type:re.type,data:re.inputSource}))}function B(){r.removeEventListener("select",j),r.removeEventListener("selectstart",j),r.removeEventListener("selectend",j),r.removeEventListener("squeeze",j),r.removeEventListener("squeezestart",j),r.removeEventListener("squeezeend",j),r.removeEventListener("end",B),r.removeEventListener("inputsourceschange",ne);for(let re=0;re<C.length;re++){const O=R[re];O!==null&&(R[re]=null,C[re].disconnect(O))}V=null,z=null,m.reset();for(const re in p)delete p[re];e.setRenderTarget(x),d=null,h=null,f=null,r=null,y=null,Qe.stop(),i.isPresenting=!1,e.setPixelRatio(U),e.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(re){s=re,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(re){a=re,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(re){c=re},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f===null&&_&&(f=new XRWebGLBinding(r,n)),f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(re){if(r=re,r!==null){if(x=e.getRenderTarget(),r.addEventListener("select",j),r.addEventListener("selectstart",j),r.addEventListener("selectend",j),r.addEventListener("squeeze",j),r.addEventListener("squeezestart",j),r.addEventListener("squeezeend",j),r.addEventListener("end",B),r.addEventListener("inputsourceschange",ne),E.xrCompatible!==!0&&await n.makeXRCompatible(),U=e.getPixelRatio(),e.getSize(P),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ie=null,ae=null,le=null;E.depth&&(le=E.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ie=E.stencil?fo:uo,ae=E.stencil?co:wr);const Re={colorFormat:n.RGBA8,depthFormat:le,scaleFactor:s};f=this.getBinding(),h=f.createProjectionLayer(Re),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),y=new Cr(h.textureWidth,h.textureHeight,{format:Fn,type:ti,depthTexture:new Mv(h.textureWidth,h.textureHeight,ae,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const ie={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,n,ie),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new Cr(d.framebufferWidth,d.framebufferHeight,{format:Fn,type:ti,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),Qe.setContext(r),Qe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ne(re){for(let O=0;O<re.removed.length;O++){const ie=re.removed[O],ae=R.indexOf(ie);ae>=0&&(R[ae]=null,C[ae].disconnect(ie))}for(let O=0;O<re.added.length;O++){const ie=re.added[O];let ae=R.indexOf(ie);if(ae===-1){for(let Re=0;Re<C.length;Re++)if(Re>=R.length){R.push(ie),ae=Re;break}else if(R[Re]===null){R[Re]=ie,ae=Re;break}if(ae===-1)break}const le=C[ae];le&&le.connect(ie)}}const k=new q,fe=new q;function ye(re,O,ie){k.setFromMatrixPosition(O.matrixWorld),fe.setFromMatrixPosition(ie.matrixWorld);const ae=k.distanceTo(fe),le=O.projectionMatrix.elements,Re=ie.projectionMatrix.elements,$e=le[14]/(le[10]-1),v=le[14]/(le[10]+1),D=(le[9]+1)/le[5],H=(le[9]-1)/le[5],K=(le[8]-1)/le[0],G=(Re[8]+1)/Re[0],se=$e*K,Q=$e*G,oe=ae/(-K+G),de=oe*-K;if(O.matrixWorld.decompose(re.position,re.quaternion,re.scale),re.translateX(de),re.translateZ(oe),re.matrixWorld.compose(re.position,re.quaternion,re.scale),re.matrixWorldInverse.copy(re.matrixWorld).invert(),le[10]===-1)re.projectionMatrix.copy(O.projectionMatrix),re.projectionMatrixInverse.copy(O.projectionMatrixInverse);else{const ce=$e+oe,A=v+oe,M=se-de,N=Q+(ae-de),$=D*v/A*ce,ee=H*v/A*ce;re.projectionMatrix.makePerspective(M,N,$,ee,ce,A),re.projectionMatrixInverse.copy(re.projectionMatrix).invert()}}function Ce(re,O){O===null?re.matrixWorld.copy(re.matrix):re.matrixWorld.multiplyMatrices(O.matrixWorld,re.matrix),re.matrixWorldInverse.copy(re.matrixWorld).invert()}this.updateCamera=function(re){if(r===null)return;let O=re.near,ie=re.far;m.texture!==null&&(m.depthNear>0&&(O=m.depthNear),m.depthFar>0&&(ie=m.depthFar)),I.near=T.near=b.near=O,I.far=T.far=b.far=ie,(V!==I.near||z!==I.far)&&(r.updateRenderState({depthNear:I.near,depthFar:I.far}),V=I.near,z=I.far),I.layers.mask=re.layers.mask|6,b.layers.mask=I.layers.mask&3,T.layers.mask=I.layers.mask&5;const ae=re.parent,le=I.cameras;Ce(I,ae);for(let Re=0;Re<le.length;Re++)Ce(le[Re],ae);le.length===2?ye(I,b,T):I.projectionMatrix.copy(b.projectionMatrix),Oe(re,I,ae)};function Oe(re,O,ie){ie===null?re.matrix.copy(O.matrixWorld):(re.matrix.copy(ie.matrixWorld),re.matrix.invert(),re.matrix.multiply(O.matrixWorld)),re.matrix.decompose(re.position,re.quaternion,re.scale),re.updateMatrixWorld(!0),re.projectionMatrix.copy(O.projectionMatrix),re.projectionMatrixInverse.copy(O.projectionMatrixInverse),re.isPerspectiveCamera&&(re.fov=xu*2*Math.atan(1/re.projectionMatrix.elements[5]),re.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(h===null&&d===null))return l},this.setFoveation=function(re){l=re,h!==null&&(h.fixedFoveation=re),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=re)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(I)},this.getCameraTexture=function(re){return p[re]};let tt=null;function at(re,O){if(u=O.getViewerPose(c||o),g=O,u!==null){const ie=u.views;d!==null&&(e.setRenderTargetFramebuffer(y,d.framebuffer),e.setRenderTarget(y));let ae=!1;ie.length!==I.cameras.length&&(I.cameras.length=0,ae=!0);for(let v=0;v<ie.length;v++){const D=ie[v];let H=null;if(d!==null)H=d.getViewport(D);else{const G=f.getViewSubImage(h,D);H=G.viewport,v===0&&(e.setRenderTargetTextures(y,G.colorTexture,G.depthStencilTexture),e.setRenderTarget(y))}let K=L[v];K===void 0&&(K=new wn,K.layers.enable(v),K.viewport=new wt,L[v]=K),K.matrix.fromArray(D.transform.matrix),K.matrix.decompose(K.position,K.quaternion,K.scale),K.projectionMatrix.fromArray(D.projectionMatrix),K.projectionMatrixInverse.copy(K.projectionMatrix).invert(),K.viewport.set(H.x,H.y,H.width,H.height),v===0&&(I.matrix.copy(K.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),ae===!0&&I.cameras.push(K)}const le=r.enabledFeatures;if(le&&le.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){f=i.getBinding();const v=f.getDepthInformation(ie[0]);v&&v.isValid&&v.texture&&m.init(v,r.renderState)}if(le&&le.includes("camera-access")&&_){e.state.unbindTexture(),f=i.getBinding();for(let v=0;v<ie.length;v++){const D=ie[v].camera;if(D){let H=p[D];H||(H=new Ev,p[D]=H);const K=f.getCameraImage(D);H.sourceTexture=K}}}}for(let ie=0;ie<C.length;ie++){const ae=R[ie],le=C[ie];ae!==null&&le!==void 0&&le.update(ae,O,c||o)}tt&&tt(re,O),O.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:O}),g=null}const Qe=new wv;Qe.setAnimationLoop(at),this.setAnimationLoop=function(re){tt=re},this.dispose=function(){}}}const ur=new ni,gC=new At;function vC(t,e){function n(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,xv(t)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,E,x,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),f(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),h(m,p),p.isMeshPhysicalMaterial&&d(m,p,y)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,E,x):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,n(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,n(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,n(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===un&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,n(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===un&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,n(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,n(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,n(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const E=e.get(p),x=E.envMap,y=E.envMapRotation;x&&(m.envMap.value=x,ur.copy(y),ur.x*=-1,ur.y*=-1,ur.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(ur.y*=-1,ur.z*=-1),m.envMapRotation.value.setFromMatrix4(gC.makeRotationFromEuler(ur)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,n(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,n(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,n(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,E,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*E,m.scale.value=x*.5,p.map&&(m.map.value=p.map,n(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,n(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,n(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,n(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,n(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,n(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,E){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,n(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,n(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,n(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,n(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,n(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===un&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,n(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,n(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,n(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,n(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,n(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,n(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,n(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const E=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function _C(t,e,n,i){let r={},s={},o=[];const a=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,x){const y=x.program;i.uniformBlockBinding(E,y)}function c(E,x){let y=r[E.id];y===void 0&&(g(E),y=u(E),r[E.id]=y,E.addEventListener("dispose",m));const C=x.program;i.updateUBOMapping(E,C);const R=e.render.frame;s[E.id]!==R&&(h(E),s[E.id]=R)}function u(E){const x=f();E.__bindingPointIndex=x;const y=t.createBuffer(),C=E.__size,R=E.usage;return t.bindBuffer(t.UNIFORM_BUFFER,y),t.bufferData(t.UNIFORM_BUFFER,C,R),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,x,y),y}function f(){for(let E=0;E<a;E++)if(o.indexOf(E)===-1)return o.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(E){const x=r[E.id],y=E.uniforms,C=E.__cache;t.bindBuffer(t.UNIFORM_BUFFER,x);for(let R=0,P=y.length;R<P;R++){const U=Array.isArray(y[R])?y[R]:[y[R]];for(let b=0,T=U.length;b<T;b++){const L=U[b];if(d(L,R,b,C)===!0){const I=L.__offset,V=Array.isArray(L.value)?L.value:[L.value];let z=0;for(let j=0;j<V.length;j++){const B=V[j],ne=_(B);typeof B=="number"||typeof B=="boolean"?(L.__data[0]=B,t.bufferSubData(t.UNIFORM_BUFFER,I+z,L.__data)):B.isMatrix3?(L.__data[0]=B.elements[0],L.__data[1]=B.elements[1],L.__data[2]=B.elements[2],L.__data[3]=0,L.__data[4]=B.elements[3],L.__data[5]=B.elements[4],L.__data[6]=B.elements[5],L.__data[7]=0,L.__data[8]=B.elements[6],L.__data[9]=B.elements[7],L.__data[10]=B.elements[8],L.__data[11]=0):(B.toArray(L.__data,z),z+=ne.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,I,L.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function d(E,x,y,C){const R=E.value,P=x+"_"+y;if(C[P]===void 0)return typeof R=="number"||typeof R=="boolean"?C[P]=R:C[P]=R.clone(),!0;{const U=C[P];if(typeof R=="number"||typeof R=="boolean"){if(U!==R)return C[P]=R,!0}else if(U.equals(R)===!1)return U.copy(R),!0}return!1}function g(E){const x=E.uniforms;let y=0;const C=16;for(let P=0,U=x.length;P<U;P++){const b=Array.isArray(x[P])?x[P]:[x[P]];for(let T=0,L=b.length;T<L;T++){const I=b[T],V=Array.isArray(I.value)?I.value:[I.value];for(let z=0,j=V.length;z<j;z++){const B=V[z],ne=_(B),k=y%C,fe=k%ne.boundary,ye=k+fe;y+=fe,ye!==0&&C-ye<ne.storage&&(y+=C-ye),I.__data=new Float32Array(ne.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=y,y+=ne.storage}}}const R=y%C;return R>0&&(y+=C-R),E.__size=y,E.__cache={},this}function _(E){const x={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(x.boundary=4,x.storage=4):E.isVector2?(x.boundary=8,x.storage=8):E.isVector3||E.isColor?(x.boundary=16,x.storage=12):E.isVector4?(x.boundary=16,x.storage=16):E.isMatrix3?(x.boundary=48,x.storage=48):E.isMatrix4?(x.boundary=64,x.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),x}function m(E){const x=E.target;x.removeEventListener("dispose",m);const y=o.indexOf(x.__bindingPointIndex);o.splice(y,1),t.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function p(){for(const E in r)t.deleteBuffer(r[E]);o=[],r={},s={}}return{bind:l,update:c,dispose:p}}class xC{constructor(e={}){const{canvas:n=Qb(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const E=[],x=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ji,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const y=this;let C=!1;this._outputColorSpace=bn;let R=0,P=0,U=null,b=-1,T=null;const L=new wt,I=new wt;let V=null;const z=new ot(0);let j=0,B=n.width,ne=n.height,k=1,fe=null,ye=null;const Ce=new wt(0,0,B,ne),Oe=new wt(0,0,B,ne);let tt=!1;const at=new wf;let Qe=!1,re=!1;const O=new At,ie=new q,ae=new wt,le={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Re=!1;function $e(){return U===null?k:1}let v=i;function D(w,W){return n.getContext(w,W)}try{const w={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${pf}`),n.addEventListener("webglcontextlost",Se,!1),n.addEventListener("webglcontextrestored",Le,!1),n.addEventListener("webglcontextcreationerror",me,!1),v===null){const W="webgl2";if(v=D(W,w),v===null)throw D(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let H,K,G,se,Q,oe,de,ce,A,M,N,$,ee,Y,_e,pe,Ee,Ae,he,Me,Fe,we,xe,ze;function F(){H=new RA(v),H.init(),we=new fC(v,H),K=new MA(v,H,e,we),G=new cC(v,H),K.reversedDepthBuffer&&h&&G.buffers.depth.setReversed(!0),se=new DA(v),Q=new K3,oe=new uC(v,H,G,Q,K,we,se),de=new bA(y),ce=new CA(y),A=new BT(v),xe=new SA(v,A),M=new PA(v,A,se,xe),N=new UA(v,M,A,se),he=new IA(v,K,oe),pe=new EA(Q),$=new Y3(y,de,ce,H,K,xe,pe),ee=new vC(y,Q),Y=new J3,_e=new rC(H),Ae=new xA(y,de,ce,G,N,d,l),Ee=new aC(y,N,K),ze=new _C(v,se,K,G),Me=new yA(v,H,se),Fe=new LA(v,H,se),se.programs=$.programs,y.capabilities=K,y.extensions=H,y.properties=Q,y.renderLists=Y,y.shadowMap=Ee,y.state=G,y.info=se}F();const ve=new mC(y,v);this.xr=ve,this.getContext=function(){return v},this.getContextAttributes=function(){return v.getContextAttributes()},this.forceContextLoss=function(){const w=H.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=H.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(w){w!==void 0&&(k=w,this.setSize(B,ne,!1))},this.getSize=function(w){return w.set(B,ne)},this.setSize=function(w,W,Z=!0){if(ve.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=w,ne=W,n.width=Math.floor(w*k),n.height=Math.floor(W*k),Z===!0&&(n.style.width=w+"px",n.style.height=W+"px"),this.setViewport(0,0,w,W)},this.getDrawingBufferSize=function(w){return w.set(B*k,ne*k).floor()},this.setDrawingBufferSize=function(w,W,Z){B=w,ne=W,k=Z,n.width=Math.floor(w*Z),n.height=Math.floor(W*Z),this.setViewport(0,0,w,W)},this.getCurrentViewport=function(w){return w.copy(L)},this.getViewport=function(w){return w.copy(Ce)},this.setViewport=function(w,W,Z,J){w.isVector4?Ce.set(w.x,w.y,w.z,w.w):Ce.set(w,W,Z,J),G.viewport(L.copy(Ce).multiplyScalar(k).round())},this.getScissor=function(w){return w.copy(Oe)},this.setScissor=function(w,W,Z,J){w.isVector4?Oe.set(w.x,w.y,w.z,w.w):Oe.set(w,W,Z,J),G.scissor(I.copy(Oe).multiplyScalar(k).round())},this.getScissorTest=function(){return tt},this.setScissorTest=function(w){G.setScissorTest(tt=w)},this.setOpaqueSort=function(w){fe=w},this.setTransparentSort=function(w){ye=w},this.getClearColor=function(w){return w.copy(Ae.getClearColor())},this.setClearColor=function(){Ae.setClearColor(...arguments)},this.getClearAlpha=function(){return Ae.getClearAlpha()},this.setClearAlpha=function(){Ae.setClearAlpha(...arguments)},this.clear=function(w=!0,W=!0,Z=!0){let J=0;if(w){let X=!1;if(U!==null){const ge=U.texture.format;X=ge===yf||ge===Sf||ge===xf}if(X){const ge=U.texture.type,Te=ge===ti||ge===wr||ge===lo||ge===co||ge===vf||ge===_f,De=Ae.getClearColor(),Pe=Ae.getClearAlpha(),ke=De.r,He=De.g,Ne=De.b;Te?(g[0]=ke,g[1]=He,g[2]=Ne,g[3]=Pe,v.clearBufferuiv(v.COLOR,0,g)):(_[0]=ke,_[1]=He,_[2]=Ne,_[3]=Pe,v.clearBufferiv(v.COLOR,0,_))}else J|=v.COLOR_BUFFER_BIT}W&&(J|=v.DEPTH_BUFFER_BIT),Z&&(J|=v.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),v.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",Se,!1),n.removeEventListener("webglcontextrestored",Le,!1),n.removeEventListener("webglcontextcreationerror",me,!1),Ae.dispose(),Y.dispose(),_e.dispose(),Q.dispose(),de.dispose(),ce.dispose(),N.dispose(),xe.dispose(),ze.dispose(),$.dispose(),ve.dispose(),ve.removeEventListener("sessionstart",Xn),ve.removeEventListener("sessionend",Rf),er.stop()};function Se(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function Le(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const w=se.autoReset,W=Ee.enabled,Z=Ee.autoUpdate,J=Ee.needsUpdate,X=Ee.type;F(),se.autoReset=w,Ee.enabled=W,Ee.autoUpdate=Z,Ee.needsUpdate=J,Ee.type=X}function me(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function ue(w){const W=w.target;W.removeEventListener("dispose",ue),Ie(W)}function Ie(w){We(w),Q.remove(w)}function We(w){const W=Q.get(w).programs;W!==void 0&&(W.forEach(function(Z){$.releaseProgram(Z)}),w.isShaderMaterial&&$.releaseShaderCache(w))}this.renderBufferDirect=function(w,W,Z,J,X,ge){W===null&&(W=le);const Te=X.isMesh&&X.matrixWorld.determinant()<0,De=Dv(w,W,Z,J,X);G.setMaterial(J,Te);let Pe=Z.index,ke=1;if(J.wireframe===!0){if(Pe=M.getWireframeAttribute(Z),Pe===void 0)return;ke=2}const He=Z.drawRange,Ne=Z.attributes.position;let Ze=He.start*ke,ft=(He.start+He.count)*ke;ge!==null&&(Ze=Math.max(Ze,ge.start*ke),ft=Math.min(ft,(ge.start+ge.count)*ke)),Pe!==null?(Ze=Math.max(Ze,0),ft=Math.min(ft,Pe.count)):Ne!=null&&(Ze=Math.max(Ze,0),ft=Math.min(ft,Ne.count));const bt=ft-Ze;if(bt<0||bt===1/0)return;xe.setup(X,J,De,Z,Pe);let _t,pt=Me;if(Pe!==null&&(_t=A.get(Pe),pt=Fe,pt.setIndex(_t)),X.isMesh)J.wireframe===!0?(G.setLineWidth(J.wireframeLinewidth*$e()),pt.setMode(v.LINES)):pt.setMode(v.TRIANGLES);else if(X.isLine){let Be=J.linewidth;Be===void 0&&(Be=1),G.setLineWidth(Be*$e()),X.isLineSegments?pt.setMode(v.LINES):X.isLineLoop?pt.setMode(v.LINE_LOOP):pt.setMode(v.LINE_STRIP)}else X.isPoints?pt.setMode(v.POINTS):X.isSprite&&pt.setMode(v.TRIANGLES);if(X.isBatchedMesh)if(X._multiDrawInstances!==null)ho("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),pt.renderMultiDrawInstances(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount,X._multiDrawInstances);else if(H.get("WEBGL_multi_draw"))pt.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const Be=X._multiDrawStarts,St=X._multiDrawCounts,rt=X._multiDrawCount,dn=Pe?A.get(Pe).bytesPerElement:1,Fr=Q.get(J).currentProgram.getUniforms();for(let pn=0;pn<rt;pn++)Fr.setValue(v,"_gl_DrawID",pn),pt.render(Be[pn]/dn,St[pn])}else if(X.isInstancedMesh)pt.renderInstances(Ze,bt,X.count);else if(Z.isInstancedBufferGeometry){const Be=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,St=Math.min(Z.instanceCount,Be);pt.renderInstances(Ze,bt,St)}else pt.render(Ze,bt)};function mt(w,W,Z){w.transparent===!0&&w.side===xi&&w.forceSinglePass===!1?(w.side=un,w.needsUpdate=!0,Do(w,W,Z),w.side=Yi,w.needsUpdate=!0,Do(w,W,Z),w.side=xi):Do(w,W,Z)}this.compile=function(w,W,Z=null){Z===null&&(Z=w),p=_e.get(Z),p.init(W),x.push(p),Z.traverseVisible(function(X){X.isLight&&X.layers.test(W.layers)&&(p.pushLight(X),X.castShadow&&p.pushShadow(X))}),w!==Z&&w.traverseVisible(function(X){X.isLight&&X.layers.test(W.layers)&&(p.pushLight(X),X.castShadow&&p.pushShadow(X))}),p.setupLights();const J=new Set;return w.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const ge=X.material;if(ge)if(Array.isArray(ge))for(let Te=0;Te<ge.length;Te++){const De=ge[Te];mt(De,Z,X),J.add(De)}else mt(ge,Z,X),J.add(ge)}),p=x.pop(),J},this.compileAsync=function(w,W,Z=null){const J=this.compile(w,W,Z);return new Promise(X=>{function ge(){if(J.forEach(function(Te){Q.get(Te).currentProgram.isReady()&&J.delete(Te)}),J.size===0){X(w);return}setTimeout(ge,10)}H.get("KHR_parallel_shader_compile")!==null?ge():setTimeout(ge,10)})};let lt=null;function ri(w){lt&&lt(w)}function Xn(){er.stop()}function Rf(){er.start()}const er=new wv;er.setAnimationLoop(ri),typeof self<"u"&&er.setContext(self),this.setAnimationLoop=function(w){lt=w,ve.setAnimationLoop(w),w===null?er.stop():er.start()},ve.addEventListener("sessionstart",Xn),ve.addEventListener("sessionend",Rf),this.render=function(w,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),ve.enabled===!0&&ve.isPresenting===!0&&(ve.cameraAutoUpdate===!0&&ve.updateCamera(W),W=ve.getCamera()),w.isScene===!0&&w.onBeforeRender(y,w,W,U),p=_e.get(w,x.length),p.init(W),x.push(p),O.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),at.setFromProjectionMatrix(O,Zn,W.reversedDepth),re=this.localClippingEnabled,Qe=pe.init(this.clippingPlanes,re),m=Y.get(w,E.length),m.init(),E.push(m),ve.enabled===!0&&ve.isPresenting===!0){const ge=y.xr.getDepthSensingMesh();ge!==null&&el(ge,W,-1/0,y.sortObjects)}el(w,W,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(fe,ye),Re=ve.enabled===!1||ve.isPresenting===!1||ve.hasDepthSensing()===!1,Re&&Ae.addToRenderList(m,w),this.info.render.frame++,Qe===!0&&pe.beginShadows();const Z=p.state.shadowsArray;Ee.render(Z,w,W),Qe===!0&&pe.endShadows(),this.info.autoReset===!0&&this.info.reset();const J=m.opaque,X=m.transmissive;if(p.setupLights(),W.isArrayCamera){const ge=W.cameras;if(X.length>0)for(let Te=0,De=ge.length;Te<De;Te++){const Pe=ge[Te];Lf(J,X,w,Pe)}Re&&Ae.render(w);for(let Te=0,De=ge.length;Te<De;Te++){const Pe=ge[Te];Pf(m,w,Pe,Pe.viewport)}}else X.length>0&&Lf(J,X,w,W),Re&&Ae.render(w),Pf(m,w,W);U!==null&&P===0&&(oe.updateMultisampleRenderTarget(U),oe.updateRenderTargetMipmap(U)),w.isScene===!0&&w.onAfterRender(y,w,W),xe.resetDefaultState(),b=-1,T=null,x.pop(),x.length>0?(p=x[x.length-1],Qe===!0&&pe.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,E.pop(),E.length>0?m=E[E.length-1]:m=null};function el(w,W,Z,J){if(w.visible===!1)return;if(w.layers.test(W.layers)){if(w.isGroup)Z=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(W);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||at.intersectsSprite(w)){J&&ae.setFromMatrixPosition(w.matrixWorld).applyMatrix4(O);const Te=N.update(w),De=w.material;De.visible&&m.push(w,Te,De,Z,ae.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||at.intersectsObject(w))){const Te=N.update(w),De=w.material;if(J&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),ae.copy(w.boundingSphere.center)):(Te.boundingSphere===null&&Te.computeBoundingSphere(),ae.copy(Te.boundingSphere.center)),ae.applyMatrix4(w.matrixWorld).applyMatrix4(O)),Array.isArray(De)){const Pe=Te.groups;for(let ke=0,He=Pe.length;ke<He;ke++){const Ne=Pe[ke],Ze=De[Ne.materialIndex];Ze&&Ze.visible&&m.push(w,Te,Ze,Z,ae.z,Ne)}}else De.visible&&m.push(w,Te,De,Z,ae.z,null)}}const ge=w.children;for(let Te=0,De=ge.length;Te<De;Te++)el(ge[Te],W,Z,J)}function Pf(w,W,Z,J){const X=w.opaque,ge=w.transmissive,Te=w.transparent;p.setupLightsView(Z),Qe===!0&&pe.setGlobalState(y.clippingPlanes,Z),J&&G.viewport(L.copy(J)),X.length>0&&Lo(X,W,Z),ge.length>0&&Lo(ge,W,Z),Te.length>0&&Lo(Te,W,Z),G.buffers.depth.setTest(!0),G.buffers.depth.setMask(!0),G.buffers.color.setMask(!0),G.setPolygonOffset(!1)}function Lf(w,W,Z,J){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[J.id]===void 0&&(p.state.transmissionRenderTarget[J.id]=new Cr(1,1,{generateMipmaps:!0,type:H.has("EXT_color_buffer_half_float")||H.has("EXT_color_buffer_float")?Ao:ti,minFilter:_r,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:st.workingColorSpace}));const ge=p.state.transmissionRenderTarget[J.id],Te=J.viewport||L;ge.setSize(Te.z*y.transmissionResolutionScale,Te.w*y.transmissionResolutionScale);const De=y.getRenderTarget(),Pe=y.getActiveCubeFace(),ke=y.getActiveMipmapLevel();y.setRenderTarget(ge),y.getClearColor(z),j=y.getClearAlpha(),j<1&&y.setClearColor(16777215,.5),y.clear(),Re&&Ae.render(Z);const He=y.toneMapping;y.toneMapping=ji;const Ne=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),p.setupLightsView(J),Qe===!0&&pe.setGlobalState(y.clippingPlanes,J),Lo(w,Z,J),oe.updateMultisampleRenderTarget(ge),oe.updateRenderTargetMipmap(ge),H.has("WEBGL_multisampled_render_to_texture")===!1){let Ze=!1;for(let ft=0,bt=W.length;ft<bt;ft++){const _t=W[ft],pt=_t.object,Be=_t.geometry,St=_t.material,rt=_t.group;if(St.side===xi&&pt.layers.test(J.layers)){const dn=St.side;St.side=un,St.needsUpdate=!0,Df(pt,Z,J,Be,St,rt),St.side=dn,St.needsUpdate=!0,Ze=!0}}Ze===!0&&(oe.updateMultisampleRenderTarget(ge),oe.updateRenderTargetMipmap(ge))}y.setRenderTarget(De,Pe,ke),y.setClearColor(z,j),Ne!==void 0&&(J.viewport=Ne),y.toneMapping=He}function Lo(w,W,Z){const J=W.isScene===!0?W.overrideMaterial:null;for(let X=0,ge=w.length;X<ge;X++){const Te=w[X],De=Te.object,Pe=Te.geometry,ke=Te.group;let He=Te.material;He.allowOverride===!0&&J!==null&&(He=J),De.layers.test(Z.layers)&&Df(De,W,Z,Pe,He,ke)}}function Df(w,W,Z,J,X,ge){w.onBeforeRender(y,W,Z,J,X,ge),w.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),X.onBeforeRender(y,W,Z,J,w,ge),X.transparent===!0&&X.side===xi&&X.forceSinglePass===!1?(X.side=un,X.needsUpdate=!0,y.renderBufferDirect(Z,W,J,X,w,ge),X.side=Yi,X.needsUpdate=!0,y.renderBufferDirect(Z,W,J,X,w,ge),X.side=xi):y.renderBufferDirect(Z,W,J,X,w,ge),w.onAfterRender(y,W,Z,J,X,ge)}function Do(w,W,Z){W.isScene!==!0&&(W=le);const J=Q.get(w),X=p.state.lights,ge=p.state.shadowsArray,Te=X.state.version,De=$.getParameters(w,X.state,ge,W,Z),Pe=$.getProgramCacheKey(De);let ke=J.programs;J.environment=w.isMeshStandardMaterial?W.environment:null,J.fog=W.fog,J.envMap=(w.isMeshStandardMaterial?ce:de).get(w.envMap||J.environment),J.envMapRotation=J.environment!==null&&w.envMap===null?W.environmentRotation:w.envMapRotation,ke===void 0&&(w.addEventListener("dispose",ue),ke=new Map,J.programs=ke);let He=ke.get(Pe);if(He!==void 0){if(J.currentProgram===He&&J.lightsStateVersion===Te)return Uf(w,De),He}else De.uniforms=$.getUniforms(w),w.onBeforeCompile(De,y),He=$.acquireProgram(De,Pe),ke.set(Pe,He),J.uniforms=De.uniforms;const Ne=J.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Ne.clippingPlanes=pe.uniform),Uf(w,De),J.needsLights=Uv(w),J.lightsStateVersion=Te,J.needsLights&&(Ne.ambientLightColor.value=X.state.ambient,Ne.lightProbe.value=X.state.probe,Ne.directionalLights.value=X.state.directional,Ne.directionalLightShadows.value=X.state.directionalShadow,Ne.spotLights.value=X.state.spot,Ne.spotLightShadows.value=X.state.spotShadow,Ne.rectAreaLights.value=X.state.rectArea,Ne.ltc_1.value=X.state.rectAreaLTC1,Ne.ltc_2.value=X.state.rectAreaLTC2,Ne.pointLights.value=X.state.point,Ne.pointLightShadows.value=X.state.pointShadow,Ne.hemisphereLights.value=X.state.hemi,Ne.directionalShadowMap.value=X.state.directionalShadowMap,Ne.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Ne.spotShadowMap.value=X.state.spotShadowMap,Ne.spotLightMatrix.value=X.state.spotLightMatrix,Ne.spotLightMap.value=X.state.spotLightMap,Ne.pointShadowMap.value=X.state.pointShadowMap,Ne.pointShadowMatrix.value=X.state.pointShadowMatrix),J.currentProgram=He,J.uniformsList=null,He}function If(w){if(w.uniformsList===null){const W=w.currentProgram.getUniforms();w.uniformsList=Sa.seqWithValue(W.seq,w.uniforms)}return w.uniformsList}function Uf(w,W){const Z=Q.get(w);Z.outputColorSpace=W.outputColorSpace,Z.batching=W.batching,Z.batchingColor=W.batchingColor,Z.instancing=W.instancing,Z.instancingColor=W.instancingColor,Z.instancingMorph=W.instancingMorph,Z.skinning=W.skinning,Z.morphTargets=W.morphTargets,Z.morphNormals=W.morphNormals,Z.morphColors=W.morphColors,Z.morphTargetsCount=W.morphTargetsCount,Z.numClippingPlanes=W.numClippingPlanes,Z.numIntersection=W.numClipIntersection,Z.vertexAlphas=W.vertexAlphas,Z.vertexTangents=W.vertexTangents,Z.toneMapping=W.toneMapping}function Dv(w,W,Z,J,X){W.isScene!==!0&&(W=le),oe.resetTextureUnits();const ge=W.fog,Te=J.isMeshStandardMaterial?W.environment:null,De=U===null?y.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:ws,Pe=(J.isMeshStandardMaterial?ce:de).get(J.envMap||Te),ke=J.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,He=!!Z.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),Ne=!!Z.morphAttributes.position,Ze=!!Z.morphAttributes.normal,ft=!!Z.morphAttributes.color;let bt=ji;J.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(bt=y.toneMapping);const _t=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,pt=_t!==void 0?_t.length:0,Be=Q.get(J),St=p.state.lights;if(Qe===!0&&(re===!0||w!==T)){const Kt=w===T&&J.id===b;pe.setState(J,w,Kt)}let rt=!1;J.version===Be.__version?(Be.needsLights&&Be.lightsStateVersion!==St.state.version||Be.outputColorSpace!==De||X.isBatchedMesh&&Be.batching===!1||!X.isBatchedMesh&&Be.batching===!0||X.isBatchedMesh&&Be.batchingColor===!0&&X.colorTexture===null||X.isBatchedMesh&&Be.batchingColor===!1&&X.colorTexture!==null||X.isInstancedMesh&&Be.instancing===!1||!X.isInstancedMesh&&Be.instancing===!0||X.isSkinnedMesh&&Be.skinning===!1||!X.isSkinnedMesh&&Be.skinning===!0||X.isInstancedMesh&&Be.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Be.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Be.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Be.instancingMorph===!1&&X.morphTexture!==null||Be.envMap!==Pe||J.fog===!0&&Be.fog!==ge||Be.numClippingPlanes!==void 0&&(Be.numClippingPlanes!==pe.numPlanes||Be.numIntersection!==pe.numIntersection)||Be.vertexAlphas!==ke||Be.vertexTangents!==He||Be.morphTargets!==Ne||Be.morphNormals!==Ze||Be.morphColors!==ft||Be.toneMapping!==bt||Be.morphTargetsCount!==pt)&&(rt=!0):(rt=!0,Be.__version=J.version);let dn=Be.currentProgram;rt===!0&&(dn=Do(J,W,X));let Fr=!1,pn=!1,Is=!1;const yt=dn.getUniforms(),xn=Be.uniforms;if(G.useProgram(dn.program)&&(Fr=!0,pn=!0,Is=!0),J.id!==b&&(b=J.id,pn=!0),Fr||T!==w){G.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),yt.setValue(v,"projectionMatrix",w.projectionMatrix),yt.setValue(v,"viewMatrix",w.matrixWorldInverse);const on=yt.map.cameraPosition;on!==void 0&&on.setValue(v,ie.setFromMatrixPosition(w.matrixWorld)),K.logarithmicDepthBuffer&&yt.setValue(v,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&yt.setValue(v,"isOrthographic",w.isOrthographicCamera===!0),T!==w&&(T=w,pn=!0,Is=!0)}if(X.isSkinnedMesh){yt.setOptional(v,X,"bindMatrix"),yt.setOptional(v,X,"bindMatrixInverse");const Kt=X.skeleton;Kt&&(Kt.boneTexture===null&&Kt.computeBoneTexture(),yt.setValue(v,"boneTexture",Kt.boneTexture,oe))}X.isBatchedMesh&&(yt.setOptional(v,X,"batchingTexture"),yt.setValue(v,"batchingTexture",X._matricesTexture,oe),yt.setOptional(v,X,"batchingIdTexture"),yt.setValue(v,"batchingIdTexture",X._indirectTexture,oe),yt.setOptional(v,X,"batchingColorTexture"),X._colorsTexture!==null&&yt.setValue(v,"batchingColorTexture",X._colorsTexture,oe));const Sn=Z.morphAttributes;if((Sn.position!==void 0||Sn.normal!==void 0||Sn.color!==void 0)&&he.update(X,Z,dn),(pn||Be.receiveShadow!==X.receiveShadow)&&(Be.receiveShadow=X.receiveShadow,yt.setValue(v,"receiveShadow",X.receiveShadow)),J.isMeshGouraudMaterial&&J.envMap!==null&&(xn.envMap.value=Pe,xn.flipEnvMap.value=Pe.isCubeTexture&&Pe.isRenderTargetTexture===!1?-1:1),J.isMeshStandardMaterial&&J.envMap===null&&W.environment!==null&&(xn.envMapIntensity.value=W.environmentIntensity),pn&&(yt.setValue(v,"toneMappingExposure",y.toneMappingExposure),Be.needsLights&&Iv(xn,Is),ge&&J.fog===!0&&ee.refreshFogUniforms(xn,ge),ee.refreshMaterialUniforms(xn,J,k,ne,p.state.transmissionRenderTarget[w.id]),Sa.upload(v,If(Be),xn,oe)),J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(Sa.upload(v,If(Be),xn,oe),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&yt.setValue(v,"center",X.center),yt.setValue(v,"modelViewMatrix",X.modelViewMatrix),yt.setValue(v,"normalMatrix",X.normalMatrix),yt.setValue(v,"modelMatrix",X.matrixWorld),J.isShaderMaterial||J.isRawShaderMaterial){const Kt=J.uniformsGroups;for(let on=0,tl=Kt.length;on<tl;on++){const tr=Kt[on];ze.update(tr,dn),ze.bind(tr,dn)}}return dn}function Iv(w,W){w.ambientLightColor.needsUpdate=W,w.lightProbe.needsUpdate=W,w.directionalLights.needsUpdate=W,w.directionalLightShadows.needsUpdate=W,w.pointLights.needsUpdate=W,w.pointLightShadows.needsUpdate=W,w.spotLights.needsUpdate=W,w.spotLightShadows.needsUpdate=W,w.rectAreaLights.needsUpdate=W,w.hemisphereLights.needsUpdate=W}function Uv(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(w,W,Z){const J=Q.get(w);J.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,J.__autoAllocateDepthBuffer===!1&&(J.__useRenderToTexture=!1),Q.get(w.texture).__webglTexture=W,Q.get(w.depthTexture).__webglTexture=J.__autoAllocateDepthBuffer?void 0:Z,J.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,W){const Z=Q.get(w);Z.__webglFramebuffer=W,Z.__useDefaultFramebuffer=W===void 0};const Nv=v.createFramebuffer();this.setRenderTarget=function(w,W=0,Z=0){U=w,R=W,P=Z;let J=!0,X=null,ge=!1,Te=!1;if(w){const Pe=Q.get(w);if(Pe.__useDefaultFramebuffer!==void 0)G.bindFramebuffer(v.FRAMEBUFFER,null),J=!1;else if(Pe.__webglFramebuffer===void 0)oe.setupRenderTarget(w);else if(Pe.__hasExternalTextures)oe.rebindTextures(w,Q.get(w.texture).__webglTexture,Q.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Ne=w.depthTexture;if(Pe.__boundDepthTexture!==Ne){if(Ne!==null&&Q.has(Ne)&&(w.width!==Ne.image.width||w.height!==Ne.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");oe.setupDepthRenderbuffer(w)}}const ke=w.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(Te=!0);const He=Q.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(He[W])?X=He[W][Z]:X=He[W],ge=!0):w.samples>0&&oe.useMultisampledRTT(w)===!1?X=Q.get(w).__webglMultisampledFramebuffer:Array.isArray(He)?X=He[Z]:X=He,L.copy(w.viewport),I.copy(w.scissor),V=w.scissorTest}else L.copy(Ce).multiplyScalar(k).floor(),I.copy(Oe).multiplyScalar(k).floor(),V=tt;if(Z!==0&&(X=Nv),G.bindFramebuffer(v.FRAMEBUFFER,X)&&J&&G.drawBuffers(w,X),G.viewport(L),G.scissor(I),G.setScissorTest(V),ge){const Pe=Q.get(w.texture);v.framebufferTexture2D(v.FRAMEBUFFER,v.COLOR_ATTACHMENT0,v.TEXTURE_CUBE_MAP_POSITIVE_X+W,Pe.__webglTexture,Z)}else if(Te){const Pe=W;for(let ke=0;ke<w.textures.length;ke++){const He=Q.get(w.textures[ke]);v.framebufferTextureLayer(v.FRAMEBUFFER,v.COLOR_ATTACHMENT0+ke,He.__webglTexture,Z,Pe)}}else if(w!==null&&Z!==0){const Pe=Q.get(w.texture);v.framebufferTexture2D(v.FRAMEBUFFER,v.COLOR_ATTACHMENT0,v.TEXTURE_2D,Pe.__webglTexture,Z)}b=-1},this.readRenderTargetPixels=function(w,W,Z,J,X,ge,Te,De=0){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pe=Q.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Te!==void 0&&(Pe=Pe[Te]),Pe){G.bindFramebuffer(v.FRAMEBUFFER,Pe);try{const ke=w.textures[De],He=ke.format,Ne=ke.type;if(!K.textureFormatReadable(He)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!K.textureTypeReadable(Ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=w.width-J&&Z>=0&&Z<=w.height-X&&(w.textures.length>1&&v.readBuffer(v.COLOR_ATTACHMENT0+De),v.readPixels(W,Z,J,X,we.convert(He),we.convert(Ne),ge))}finally{const ke=U!==null?Q.get(U).__webglFramebuffer:null;G.bindFramebuffer(v.FRAMEBUFFER,ke)}}},this.readRenderTargetPixelsAsync=async function(w,W,Z,J,X,ge,Te,De=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pe=Q.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Te!==void 0&&(Pe=Pe[Te]),Pe)if(W>=0&&W<=w.width-J&&Z>=0&&Z<=w.height-X){G.bindFramebuffer(v.FRAMEBUFFER,Pe);const ke=w.textures[De],He=ke.format,Ne=ke.type;if(!K.textureFormatReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!K.textureTypeReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ze=v.createBuffer();v.bindBuffer(v.PIXEL_PACK_BUFFER,Ze),v.bufferData(v.PIXEL_PACK_BUFFER,ge.byteLength,v.STREAM_READ),w.textures.length>1&&v.readBuffer(v.COLOR_ATTACHMENT0+De),v.readPixels(W,Z,J,X,we.convert(He),we.convert(Ne),0);const ft=U!==null?Q.get(U).__webglFramebuffer:null;G.bindFramebuffer(v.FRAMEBUFFER,ft);const bt=v.fenceSync(v.SYNC_GPU_COMMANDS_COMPLETE,0);return v.flush(),await eT(v,bt,4),v.bindBuffer(v.PIXEL_PACK_BUFFER,Ze),v.getBufferSubData(v.PIXEL_PACK_BUFFER,0,ge),v.deleteBuffer(Ze),v.deleteSync(bt),ge}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,W=null,Z=0){const J=Math.pow(2,-Z),X=Math.floor(w.image.width*J),ge=Math.floor(w.image.height*J),Te=W!==null?W.x:0,De=W!==null?W.y:0;oe.setTexture2D(w,0),v.copyTexSubImage2D(v.TEXTURE_2D,Z,0,0,Te,De,X,ge),G.unbindTexture()};const Ov=v.createFramebuffer(),Fv=v.createFramebuffer();this.copyTextureToTexture=function(w,W,Z=null,J=null,X=0,ge=null){ge===null&&(X!==0?(ho("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ge=X,X=0):ge=0);let Te,De,Pe,ke,He,Ne,Ze,ft,bt;const _t=w.isCompressedTexture?w.mipmaps[ge]:w.image;if(Z!==null)Te=Z.max.x-Z.min.x,De=Z.max.y-Z.min.y,Pe=Z.isBox3?Z.max.z-Z.min.z:1,ke=Z.min.x,He=Z.min.y,Ne=Z.isBox3?Z.min.z:0;else{const Sn=Math.pow(2,-X);Te=Math.floor(_t.width*Sn),De=Math.floor(_t.height*Sn),w.isDataArrayTexture?Pe=_t.depth:w.isData3DTexture?Pe=Math.floor(_t.depth*Sn):Pe=1,ke=0,He=0,Ne=0}J!==null?(Ze=J.x,ft=J.y,bt=J.z):(Ze=0,ft=0,bt=0);const pt=we.convert(W.format),Be=we.convert(W.type);let St;W.isData3DTexture?(oe.setTexture3D(W,0),St=v.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(oe.setTexture2DArray(W,0),St=v.TEXTURE_2D_ARRAY):(oe.setTexture2D(W,0),St=v.TEXTURE_2D),v.pixelStorei(v.UNPACK_FLIP_Y_WEBGL,W.flipY),v.pixelStorei(v.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),v.pixelStorei(v.UNPACK_ALIGNMENT,W.unpackAlignment);const rt=v.getParameter(v.UNPACK_ROW_LENGTH),dn=v.getParameter(v.UNPACK_IMAGE_HEIGHT),Fr=v.getParameter(v.UNPACK_SKIP_PIXELS),pn=v.getParameter(v.UNPACK_SKIP_ROWS),Is=v.getParameter(v.UNPACK_SKIP_IMAGES);v.pixelStorei(v.UNPACK_ROW_LENGTH,_t.width),v.pixelStorei(v.UNPACK_IMAGE_HEIGHT,_t.height),v.pixelStorei(v.UNPACK_SKIP_PIXELS,ke),v.pixelStorei(v.UNPACK_SKIP_ROWS,He),v.pixelStorei(v.UNPACK_SKIP_IMAGES,Ne);const yt=w.isDataArrayTexture||w.isData3DTexture,xn=W.isDataArrayTexture||W.isData3DTexture;if(w.isDepthTexture){const Sn=Q.get(w),Kt=Q.get(W),on=Q.get(Sn.__renderTarget),tl=Q.get(Kt.__renderTarget);G.bindFramebuffer(v.READ_FRAMEBUFFER,on.__webglFramebuffer),G.bindFramebuffer(v.DRAW_FRAMEBUFFER,tl.__webglFramebuffer);for(let tr=0;tr<Pe;tr++)yt&&(v.framebufferTextureLayer(v.READ_FRAMEBUFFER,v.COLOR_ATTACHMENT0,Q.get(w).__webglTexture,X,Ne+tr),v.framebufferTextureLayer(v.DRAW_FRAMEBUFFER,v.COLOR_ATTACHMENT0,Q.get(W).__webglTexture,ge,bt+tr)),v.blitFramebuffer(ke,He,Te,De,Ze,ft,Te,De,v.DEPTH_BUFFER_BIT,v.NEAREST);G.bindFramebuffer(v.READ_FRAMEBUFFER,null),G.bindFramebuffer(v.DRAW_FRAMEBUFFER,null)}else if(X!==0||w.isRenderTargetTexture||Q.has(w)){const Sn=Q.get(w),Kt=Q.get(W);G.bindFramebuffer(v.READ_FRAMEBUFFER,Ov),G.bindFramebuffer(v.DRAW_FRAMEBUFFER,Fv);for(let on=0;on<Pe;on++)yt?v.framebufferTextureLayer(v.READ_FRAMEBUFFER,v.COLOR_ATTACHMENT0,Sn.__webglTexture,X,Ne+on):v.framebufferTexture2D(v.READ_FRAMEBUFFER,v.COLOR_ATTACHMENT0,v.TEXTURE_2D,Sn.__webglTexture,X),xn?v.framebufferTextureLayer(v.DRAW_FRAMEBUFFER,v.COLOR_ATTACHMENT0,Kt.__webglTexture,ge,bt+on):v.framebufferTexture2D(v.DRAW_FRAMEBUFFER,v.COLOR_ATTACHMENT0,v.TEXTURE_2D,Kt.__webglTexture,ge),X!==0?v.blitFramebuffer(ke,He,Te,De,Ze,ft,Te,De,v.COLOR_BUFFER_BIT,v.NEAREST):xn?v.copyTexSubImage3D(St,ge,Ze,ft,bt+on,ke,He,Te,De):v.copyTexSubImage2D(St,ge,Ze,ft,ke,He,Te,De);G.bindFramebuffer(v.READ_FRAMEBUFFER,null),G.bindFramebuffer(v.DRAW_FRAMEBUFFER,null)}else xn?w.isDataTexture||w.isData3DTexture?v.texSubImage3D(St,ge,Ze,ft,bt,Te,De,Pe,pt,Be,_t.data):W.isCompressedArrayTexture?v.compressedTexSubImage3D(St,ge,Ze,ft,bt,Te,De,Pe,pt,_t.data):v.texSubImage3D(St,ge,Ze,ft,bt,Te,De,Pe,pt,Be,_t):w.isDataTexture?v.texSubImage2D(v.TEXTURE_2D,ge,Ze,ft,Te,De,pt,Be,_t.data):w.isCompressedTexture?v.compressedTexSubImage2D(v.TEXTURE_2D,ge,Ze,ft,_t.width,_t.height,pt,_t.data):v.texSubImage2D(v.TEXTURE_2D,ge,Ze,ft,Te,De,pt,Be,_t);v.pixelStorei(v.UNPACK_ROW_LENGTH,rt),v.pixelStorei(v.UNPACK_IMAGE_HEIGHT,dn),v.pixelStorei(v.UNPACK_SKIP_PIXELS,Fr),v.pixelStorei(v.UNPACK_SKIP_ROWS,pn),v.pixelStorei(v.UNPACK_SKIP_IMAGES,Is),ge===0&&W.generateMipmaps&&v.generateMipmap(St),G.unbindTexture()},this.initRenderTarget=function(w){Q.get(w).__webglFramebuffer===void 0&&oe.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?oe.setTextureCube(w,0):w.isData3DTexture?oe.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?oe.setTexture2DArray(w,0):oe.setTexture2D(w,0),G.unbindTexture()},this.resetState=function(){R=0,P=0,U=null,G.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=st._getDrawingBufferColorSpace(e),n.unpackColorSpace=st._getUnpackColorSpace()}}const sp={type:"change"},Cf={type:"start"},Lv={type:"end"},ua=new bf,op=new zi,SC=Math.cos(70*Jb.DEG2RAD),Ut=new q,ln=2*Math.PI,dt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},oc=1e-6;class yC extends OT{constructor(e,n=null){super(e,n),this.state=dt.NONE,this.target=new q,this.cursor=new q,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ms.ROTATE,MIDDLE:ms.DOLLY,RIGHT:ms.PAN},this.touches={ONE:rs.ROTATE,TWO:rs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new q,this._lastQuaternion=new Ar,this._lastTargetPosition=new q,this._quat=new Ar().setFromUnitVectors(e.up,new q(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Id,this._sphericalDelta=new Id,this._scale=1,this._panOffset=new q,this._rotateStart=new Xe,this._rotateEnd=new Xe,this._rotateDelta=new Xe,this._panStart=new Xe,this._panEnd=new Xe,this._panDelta=new Xe,this._dollyStart=new Xe,this._dollyEnd=new Xe,this._dollyDelta=new Xe,this._dollyDirection=new q,this._mouse=new Xe,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=EC.bind(this),this._onPointerDown=MC.bind(this),this._onPointerUp=bC.bind(this),this._onContextMenu=LC.bind(this),this._onMouseWheel=AC.bind(this),this._onKeyDown=CC.bind(this),this._onTouchStart=RC.bind(this),this._onTouchMove=PC.bind(this),this._onMouseDown=TC.bind(this),this._onMouseMove=wC.bind(this),this._interceptControlDown=DC.bind(this),this._interceptControlUp=IC.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(sp),this.update(),this.state=dt.NONE}update(e=null){const n=this.object.position;Ut.copy(n).sub(this.target),Ut.applyQuaternion(this._quat),this._spherical.setFromVector3(Ut),this.autoRotate&&this.state===dt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=ln:i>Math.PI&&(i-=ln),r<-Math.PI?r+=ln:r>Math.PI&&(r-=ln),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(Ut.setFromSpherical(this._spherical),Ut.applyQuaternion(this._quatInverse),n.copy(this.target).add(Ut),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Ut.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const a=new q(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new q(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Ut.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(ua.origin.copy(this.object.position),ua.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ua.direction))<SC?this.object.lookAt(this.target):(op.setFromNormalAndCoplanarPoint(this.object.up,this.target),ua.intersectPlane(op,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>oc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>oc||this._lastTargetPosition.distanceToSquared(this.target)>oc?(this.dispatchEvent(sp),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?ln/60*this.autoRotateSpeed*e:ln/60/60*this.autoRotateSpeed}_getZoomScale(e){const n=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,n){Ut.setFromMatrixColumn(n,0),Ut.multiplyScalar(-e),this._panOffset.add(Ut)}_panUp(e,n){this.screenSpacePanning===!0?Ut.setFromMatrixColumn(n,1):(Ut.setFromMatrixColumn(n,0),Ut.crossVectors(this.object.up,Ut)),Ut.multiplyScalar(e),this._panOffset.add(Ut)}_pan(e,n){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;Ut.copy(r).sub(this.target);let s=Ut.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*n*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=e-i.left,s=n-i.top,o=i.width,a=i.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(ln*this._rotateDelta.x/n.clientHeight),this._rotateUp(ln*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let n=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,r=e.pageY-n.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(ln*this._rotateDelta.x/n.clientHeight),this._rotateUp(ln*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,r=e.pageY-n.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+n.x)*.5,a=(e.pageY+n.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(e){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId)return!0;return!1}_trackPointer(e){let n=this._pointerPositions[e.pointerId];n===void 0&&(n=new Xe,this._pointerPositions[e.pointerId]=n),n.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const n=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(e){const n=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(n){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function MC(t){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(t.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(t)&&(this._addPointer(t),t.pointerType==="touch"?this._onTouchStart(t):this._onMouseDown(t)))}function EC(t){this.enabled!==!1&&(t.pointerType==="touch"?this._onTouchMove(t):this._onMouseMove(t))}function bC(t){switch(this._removePointer(t),this._pointers.length){case 0:this.domElement.releasePointerCapture(t.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Lv),this.state=dt.NONE;break;case 1:const e=this._pointers[0],n=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:n.x,pageY:n.y});break}}function TC(t){let e;switch(t.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ms.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(t),this.state=dt.DOLLY;break;case ms.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=dt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=dt.ROTATE}break;case ms.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=dt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=dt.PAN}break;default:this.state=dt.NONE}this.state!==dt.NONE&&this.dispatchEvent(Cf)}function wC(t){switch(this.state){case dt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(t);break;case dt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(t);break;case dt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(t);break}}function AC(t){this.enabled===!1||this.enableZoom===!1||this.state!==dt.NONE||(t.preventDefault(),this.dispatchEvent(Cf),this._handleMouseWheel(this._customWheelEvent(t)),this.dispatchEvent(Lv))}function CC(t){this.enabled!==!1&&this._handleKeyDown(t)}function RC(t){switch(this._trackPointer(t),this._pointers.length){case 1:switch(this.touches.ONE){case rs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(t),this.state=dt.TOUCH_ROTATE;break;case rs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(t),this.state=dt.TOUCH_PAN;break;default:this.state=dt.NONE}break;case 2:switch(this.touches.TWO){case rs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(t),this.state=dt.TOUCH_DOLLY_PAN;break;case rs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(t),this.state=dt.TOUCH_DOLLY_ROTATE;break;default:this.state=dt.NONE}break;default:this.state=dt.NONE}this.state!==dt.NONE&&this.dispatchEvent(Cf)}function PC(t){switch(this._trackPointer(t),this.state){case dt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(t),this.update();break;case dt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(t),this.update();break;case dt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(t),this.update();break;case dt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(t),this.update();break;default:this.state=dt.NONE}}function LC(t){this.enabled!==!1&&t.preventDefault()}function DC(t){t.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function IC(t){t.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const UC=Ue({__name:"ApmLogo3D",setup(t){const e=nt();let n,i,r,s,o,a=0,l=!0,c=!1,u,f,h;const d={x:1,y:0,z:-1},g=()=>{if(!e.value)return;n=new TT,n.background=null,i=new wn(75,e.value.clientWidth/e.value.clientHeight,.1,1e3),i.position.set(-4,3,4),r=new xC({antialias:!0,alpha:!0}),r.setClearColor(0,0),r.setSize(e.value.clientWidth,e.value.clientHeight),r.shadowMap.enabled=!1,e.value.appendChild(r.domElement),s=new yC(i,r.domElement),s.enableDamping=!0,s.dampingFactor=.05,s.target.set(0,0,0),u=new NT,f=new Xe;const E=new IT(16777215,.8);n.add(E);const x=new Ql(16777215,.8);x.position.set(5,5,5),n.add(x);const y=new Ql(16777215,.4);y.position.set(-5,3,-3),n.add(y);const C=new Ql(16777215,.3);C.position.set(0,-5,0),n.add(C),o=new Gs,o.position.set(0,0,0),n.add(o);const R=new Zl({color:8421504,shininess:30}),P=new Zl({color:0,shininess:30}),U=new Zl({color:16777215,shininess:30}),b=()=>{const z=new Ls(2,2,2),j=[P,P,R,R,U,U];return new Jn(z,j)},T=b();T.position.set(0+d.x,1+d.y,0+d.z),o.add(T);const L=b();L.position.set(-2+d.x,-1+d.y,0+d.z),o.add(L);const I=b();I.position.set(0+d.x,-1+d.y,2+d.z),o.add(I);const V=b();V.position.set(0+d.x,-1+d.y,0+d.z),o.add(V),i.lookAt(0,0,0),s.update(),r.domElement.addEventListener("click",_,!1),window.addEventListener("resize",m,!1)},_=E=>{if(!e.value)return;E.preventDefault(),f.x=E.clientX/e.value.clientWidth*2-1,f.y=-(E.clientY/e.value.clientHeight)*2+1,u.setFromCamera(f,i),u.intersectObjects(o.children).length>0&&(c?(c=!1,l=!0):(l=!1,c=!0))},m=()=>{e.value&&(i.aspect=e.value.clientWidth/e.value.clientHeight,i.updateProjectionMatrix(),r.setSize(e.value.clientWidth,e.value.clientHeight))},p=()=>{if(h=requestAnimationFrame(p),a+=.01,c){const E=Math.sin(a*.3)*.5+1,x=Math.cos(a*.7)*.3+1,y=Math.sin(a*.5)*.4+1;o.rotation.x=Math.sin(a*E*.8)*.5,o.rotation.y=a*x*.6,o.rotation.z=Math.cos(a*y*.4)*.3,o.position.x=Math.sin(a*.9)*.15,o.position.y=Math.sin(a*1.1)*.2+Math.cos(a*.6)*.1,o.position.z=Math.cos(a*.8)*.15}else l&&(o.rotation.x=0,o.rotation.y=a*.8,o.rotation.z=0,o.position.y=Math.sin(a*2)*.1,o.position.x=0,o.position.z=0);s.update(),r.render(n,i)};return Et(()=>{g(),p()}),ii(()=>{h&&cancelAnimationFrame(h),r&&r.dispose(),window.removeEventListener("resize",m)}),(E,x)=>(C0(),L0("div",{ref_key:"threeContainer",ref:e,class:"apm-logo-container"},null,512))}}),NC=(t,e)=>{const n=t.__vccOpts||t;for(const[i,r]of e)n[i]=r;return n},OC=NC(UC,[["__scopeId","data-v-06a6b034"]]),FC=Wn({enhance({app:t,router:e,siteData:n}){t.component("ApmLogo3D",OC)}}),BC=Object.freeze(Object.defineProperty({__proto__:null,default:FC},Symbol.toStringTag,{value:"Module"})),fa=[p1,m1,g1,_1,x1,y1,M1,E1,R1,I1,B1,z1,tM,iM,uM,gM,WM,qM,cb,BC].map(t=>t.default).filter(Boolean),kC=JSON.parse('{"base":"/","lang":"en-US","title":"","description":"","head":[["link",{"rel":"icon","href":"/favicon.svg"}]],"locales":{"/":{"lang":"en-US","title":"apm Docs","description":"apm is a Package Manager 📦, a Website 🌐, and a Registry 📑 for ABAP"}}}');var ns=Je(kC),HC=mS,zC=()=>{const t=HS({history:HC(Gu("/")),routes:[{name:"vuepress-route",path:"/:catchAll(.*)",components:{}}],scrollBehavior:(e,n,i)=>i||(e.hash?{el:e.hash}:{top:0})});return t.beforeResolve(async(e,n)=>{if(e.path!==n.path||n===di){const i=bi(e.fullPath);if(i.path!==e.fullPath)return i.path;const r=await i.loader();e.meta={...i.meta,_pageChunk:r}}else e.path===n.path&&(e.meta=n.meta)}),t},VC=t=>{t.component("ClientOnly",ju),t.component("Content",Vm),t.component("RouteLink",Lr)},GC=(t,e,n)=>{const i=te(()=>e.currentRoute.value.path),r=Lp((m,p)=>({get(){return m(),e.currentRoute.value.meta._pageChunk},set(E){e.currentRoute.value.meta._pageChunk=E,p()}})),s=te(()=>rr.resolveLayouts(n)),o=te(()=>rr.resolveRouteLocale(ns.value.locales,i.value)),a=te(()=>rr.resolveSiteLocaleData(ns.value,o.value)),l=te(()=>r.value.comp),c=te(()=>r.value.data),u=te(()=>c.value.frontmatter),f=te(()=>rr.resolvePageHeadTitle(c.value,a.value)),h=te(()=>rr.resolvePageHead(f.value,u.value,a.value)),d=te(()=>rr.resolvePageLang(c.value,a.value)),g=te(()=>rr.resolvePageLayout(c.value,s.value)),_={layouts:s,pageData:c,pageComponent:l,pageFrontmatter:u,pageHead:h,pageHeadTitle:f,pageLang:d,pageLayout:g,redirects:Mc,routeLocale:o,routePath:i,routes:ds,siteData:ns,siteLocaleData:a,frontmatter:u,head:h,headTitle:f,lang:d,page:c,site:ns,siteLocale:a};return t.provide($u,_),Object.defineProperties(t.config.globalProperties,{$pageFrontmatter:{get:()=>u.value},$pageHead:{get:()=>h.value},$pageHeadTitle:{get:()=>f.value},$pageLang:{get:()=>d.value},$pageData:{get:()=>c.value},$routeLocale:{get:()=>o.value},$withBase:{get:()=>zt},$frontmatter:{get:()=>u.value},$head:{get:()=>h.value},$headTitle:{get:()=>f.value},$lang:{get:()=>d.value},$page:{get:()=>c.value},$site:{get:()=>ns.value},$siteLocale:{get:()=>a.value}}),_},WC=([t,e,n=""])=>{const i=Object.entries(e).map(([a,l])=>xt(l)?`[${a}=${JSON.stringify(l)}]`:l?`[${a}]`:"").join(""),r=`head > ${t}${i}`;return Array.from(document.querySelectorAll(r)).find(a=>a.innerText===n)??null},XC=([t,e,n])=>{if(!xt(t))return null;const i=document.createElement(t);return Eo(e)&&Object.entries(e).forEach(([r,s])=>{xt(s)?i.setAttribute(r,s):s&&i.setAttribute(r,"")}),xt(n)&&i.appendChild(document.createTextNode(n)),i},$C=()=>{const t=WS(),e=km();let n=[];const i=()=>{t.value.forEach(o=>{const a=WC(o);a&&n.push(a)})},r=()=>{const o=[];return t.value.forEach(a=>{const l=XC(a);l&&o.push(l)}),o},s=()=>{document.documentElement.lang=e.value;const o=r();n.forEach((a,l)=>{const c=o.findIndex(u=>a.isEqualNode(u));c===-1?(a.remove(),delete n[l]):o.splice(c,1)}),o.forEach(a=>document.head.appendChild(a)),n=[...n.filter(a=>!!a),...o]};hs(JS,s),Et(()=>{i(),Rt(t,s,{immediate:!1})})},jC=Mx,qC=async()=>{const t=jC({name:"Vuepress",setup(){$C();for(const r of fa)r.setup?.();const n=fa.flatMap(({rootComponents:r=[]})=>r.map(s=>S(s))),i=XS();return()=>[S(i.value),n]}}),e=zC();VC(t),GC(t,e,fa);for(const n of fa)await n.enhance?.({app:t,router:e,siteData:ns});return t.use(e),{app:t,router:e}};qC().then(({app:t,router:e})=>{e.isReady().then(()=>{t.mount("#app")})});export{wM as A,EM as B,qa as C,ug as D,Je as E,Et as F,Rn as G,Qu as H,ii as I,t1 as J,xt as K,SM as L,ao as M,Lr as R,NC as _,dm as a,pm as b,L0 as c,qC as createVueApp,jt as d,YC as e,Ue as f,Hm as g,Ri as h,Er as i,Ka as j,nt as k,te as l,S as m,it as n,C0 as o,Rt as p,AM as q,Ct as r,fg as s,Ga as t,bo as u,bM as v,N_ as w,TM as x,KC as y,Eo as z};
