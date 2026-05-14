var yM=Object.defineProperty,bM=Object.defineProperties;var DM=Object.getOwnPropertyDescriptors;var Yl=Object.getOwnPropertySymbols;var Yv=Object.prototype.hasOwnProperty,Kv=Object.prototype.propertyIsEnumerable;var qv=(t,n,e)=>n in t?yM(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e,N=(t,n)=>{for(var e in n||={})Yv.call(n,e)&&qv(t,e,n[e]);if(Yl)for(var e of Yl(n))Kv.call(n,e)&&qv(t,e,n[e]);return t},De=(t,n)=>bM(t,DM(n));var lh=(t,n)=>{var e={};for(var i in t)Yv.call(t,i)&&n.indexOf(i)<0&&(e[i]=t[i]);if(t!=null&&Yl)for(var i of Yl(t))n.indexOf(i)<0&&Kv.call(t,i)&&(e[i]=t[i]);return e};var Xi=(t,n,e)=>new Promise((i,r)=>{var o=l=>{try{s(e.next(l))}catch(c){r(c)}},a=l=>{try{s(e.throw(l))}catch(c){r(c)}},s=l=>l.done?i(l.value):Promise.resolve(l.value).then(o,a);s((e=e.apply(t,n)).next())});var Ft=null,Kl=!1,ch=1,CM=null,bt=Symbol("SIGNAL");function K(t){let n=Ft;return Ft=t,n}function Jl(){return Ft}var Fr={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function Bo(t){if(Kl)throw new Error("");if(Ft===null)return;Ft.consumerOnSignalRead(t);let n=Ft.producersTail;if(n!==void 0&&n.producer===t)return;let e,i=Ft.recomputing;if(i&&(e=n!==void 0?n.nextProducer:Ft.producers,e!==void 0&&e.producer===t)){Ft.producersTail=e,e.lastReadVersion=t.version;return}let r=t.consumersTail;if(r!==void 0&&r.consumer===Ft&&(!i||EM(r,Ft)))return;let o=Ho(Ft),a={producer:t,consumer:Ft,nextProducer:e,prevConsumer:r,lastReadVersion:t.version,nextConsumer:void 0};Ft.producersTail=a,n!==void 0?n.nextProducer=a:Ft.producers=a,o&&Jv(t,a)}function Qv(){ch++}function ec(t){if(!(Ho(t)&&!t.dirty)&&!(!t.dirty&&t.lastCleanEpoch===ch)){if(!t.producerMustRecompute(t)&&!jo(t)){Xl(t);return}t.producerRecomputeValue(t),Xl(t)}}function dh(t){if(t.consumers===void 0)return;let n=Kl;Kl=!0;try{for(let e=t.consumers;e!==void 0;e=e.nextConsumer){let i=e.consumer;i.dirty||wM(i)}}finally{Kl=n}}function uh(){return Ft?.consumerAllowSignalWrites!==!1}function wM(t){t.dirty=!0,dh(t),t.consumerMarkedDirty?.(t)}function Xl(t){t.dirty=!1,t.lastCleanEpoch=ch}function Ji(t){return t&&Zv(t),K(t)}function Zv(t){t.producersTail=void 0,t.recomputing=!0}function Pr(t,n){K(n),t&&Xv(t)}function Xv(t){t.recomputing=!1;let n=t.producersTail,e=n!==void 0?n.nextProducer:t.producers;if(e!==void 0){if(Ho(t))do e=fh(e);while(e!==void 0);n!==void 0?n.nextProducer=void 0:t.producers=void 0}}function jo(t){for(let n=t.producers;n!==void 0;n=n.nextProducer){let e=n.producer,i=n.lastReadVersion;if(i!==e.version||(ec(e),i!==e.version))return!0}return!1}function er(t){if(Ho(t)){let n=t.producers;for(;n!==void 0;)n=fh(n)}t.producers=void 0,t.producersTail=void 0,t.consumers=void 0,t.consumersTail=void 0}function Jv(t,n){let e=t.consumersTail,i=Ho(t);if(e!==void 0?(n.nextConsumer=e.nextConsumer,e.nextConsumer=n):(n.nextConsumer=void 0,t.consumers=n),n.prevConsumer=e,t.consumersTail=n,!i)for(let r=t.producers;r!==void 0;r=r.nextProducer)Jv(r.producer,r)}function fh(t){let n=t.producer,e=t.nextProducer,i=t.nextConsumer,r=t.prevConsumer;if(t.nextConsumer=void 0,t.prevConsumer=void 0,i!==void 0?i.prevConsumer=r:n.consumersTail=r,r!==void 0)r.nextConsumer=i;else if(n.consumers=i,!Ho(n)){let o=n.producers;for(;o!==void 0;)o=fh(o)}return e}function Ho(t){return t.consumerIsAlwaysLive||t.consumers!==void 0}function tc(t){CM?.(t)}function EM(t,n){let e=n.producersTail;if(e!==void 0){let i=n.producers;do{if(i===t)return!0;if(i===e)break;i=i.nextProducer}while(i!==void 0)}return!1}function nc(t,n){return Object.is(t,n)}function Xa(t,n){let e=Object.create(xM);e.computation=t,n!==void 0&&(e.equal=n);let i=()=>{if(ec(e),Bo(e),e.value===Za)throw e.error;return e.value};return i[bt]=e,tc(e),i}var Ql=Symbol("UNSET"),Zl=Symbol("COMPUTING"),Za=Symbol("ERRORED"),xM=De(N({},Fr),{value:Ql,dirty:!0,error:null,equal:nc,kind:"computed",producerMustRecompute(t){return t.value===Ql||t.value===Zl},producerRecomputeValue(t){if(t.value===Zl)throw new Error("");let n=t.value;t.value=Zl;let e=Ji(t),i,r=!1;try{i=t.computation(),K(null),r=n!==Ql&&n!==Za&&i!==Za&&t.equal(n,i)}catch(o){i=Za,t.error=o}finally{Pr(t,e)}if(r){t.value=n;return}t.value=i,t.version++}});function SM(){throw new Error}var ey=SM;function ty(t){ey(t)}function hh(t){ey=t}var MM=null;function mh(t,n){let e=Object.create(ic);e.value=t,n!==void 0&&(e.equal=n);let i=()=>ny(e);return i[bt]=e,tc(e),[i,a=>Ja(e,a),a=>ph(e,a)]}function ny(t){return Bo(t),t.value}function Ja(t,n){uh()||ty(t),t.equal(t.value,n)||(t.value=n,IM(t))}function ph(t,n){uh()||ty(t),Ja(t,n(t.value))}var ic=De(N({},Fr),{equal:nc,value:void 0,kind:"signal"});function IM(t){t.version++,Qv(),dh(t),MM?.(t)}var gh=De(N({},Fr),{consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,dirty:!0,kind:"effect"});function _h(t){if(t.dirty=!1,t.version>0&&!jo(t))return;t.version++;let n=Ji(t);try{t.cleanup(),t.fn()}finally{Pr(t,n)}}function de(t){return typeof t=="function"}function rc(t){let e=t(i=>{Error.call(i),i.stack=new Error().stack});return e.prototype=Object.create(Error.prototype),e.prototype.constructor=e,e}var oc=rc(t=>function(e){t(this),this.message=e?`${e.length} errors occurred during unsubscription:
${e.map((i,r)=>`${r+1}) ${i.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=e});function Lr(t,n){if(t){let e=t.indexOf(n);0<=e&&t.splice(e,1)}}var se=class t{constructor(n){this.initialTeardown=n,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let n;if(!this.closed){this.closed=!0;let{_parentage:e}=this;if(e)if(this._parentage=null,Array.isArray(e))for(let o of e)o.remove(this);else e.remove(this);let{initialTeardown:i}=this;if(de(i))try{i()}catch(o){n=o instanceof oc?o.errors:[o]}let{_finalizers:r}=this;if(r){this._finalizers=null;for(let o of r)try{iy(o)}catch(a){n=n??[],a instanceof oc?n=[...n,...a.errors]:n.push(a)}}if(n)throw new oc(n)}}add(n){var e;if(n&&n!==this)if(this.closed)iy(n);else{if(n instanceof t){if(n.closed||n._hasParent(this))return;n._addParent(this)}(this._finalizers=(e=this._finalizers)!==null&&e!==void 0?e:[]).push(n)}}_hasParent(n){let{_parentage:e}=this;return e===n||Array.isArray(e)&&e.includes(n)}_addParent(n){let{_parentage:e}=this;this._parentage=Array.isArray(e)?(e.push(n),e):e?[e,n]:n}_removeParent(n){let{_parentage:e}=this;e===n?this._parentage=null:Array.isArray(e)&&Lr(e,n)}remove(n){let{_finalizers:e}=this;e&&Lr(e,n),n instanceof t&&n._removeParent(this)}};se.EMPTY=(()=>{let t=new se;return t.closed=!0,t})();var vh=se.EMPTY;function ac(t){return t instanceof se||t&&"closed"in t&&de(t.remove)&&de(t.add)&&de(t.unsubscribe)}function iy(t){de(t)?t():t.unsubscribe()}var jn={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var zo={setTimeout(t,n,...e){let{delegate:i}=zo;return i?.setTimeout?i.setTimeout(t,n,...e):setTimeout(t,n,...e)},clearTimeout(t){let{delegate:n}=zo;return(n?.clearTimeout||clearTimeout)(t)},delegate:void 0};function sc(t){zo.setTimeout(()=>{let{onUnhandledError:n}=jn;if(n)n(t);else throw t})}function Vr(){}var ry=yh("C",void 0,void 0);function oy(t){return yh("E",void 0,t)}function ay(t){return yh("N",t,void 0)}function yh(t,n,e){return{kind:t,value:n,error:e}}var Br=null;function Uo(t){if(jn.useDeprecatedSynchronousErrorHandling){let n=!Br;if(n&&(Br={errorThrown:!1,error:null}),t(),n){let{errorThrown:e,error:i}=Br;if(Br=null,e)throw i}}else t()}function sy(t){jn.useDeprecatedSynchronousErrorHandling&&Br&&(Br.errorThrown=!0,Br.error=t)}var jr=class extends se{constructor(n){super(),this.isStopped=!1,n?(this.destination=n,ac(n)&&n.add(this)):this.destination=AM}static create(n,e,i){return new Ai(n,e,i)}next(n){this.isStopped?Dh(ay(n),this):this._next(n)}error(n){this.isStopped?Dh(oy(n),this):(this.isStopped=!0,this._error(n))}complete(){this.isStopped?Dh(ry,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(n){this.destination.next(n)}_error(n){try{this.destination.error(n)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},kM=Function.prototype.bind;function bh(t,n){return kM.call(t,n)}var Ch=class{constructor(n){this.partialObserver=n}next(n){let{partialObserver:e}=this;if(e.next)try{e.next(n)}catch(i){lc(i)}}error(n){let{partialObserver:e}=this;if(e.error)try{e.error(n)}catch(i){lc(i)}else lc(n)}complete(){let{partialObserver:n}=this;if(n.complete)try{n.complete()}catch(e){lc(e)}}},Ai=class extends jr{constructor(n,e,i){super();let r;if(de(n)||!n)r={next:n??void 0,error:e??void 0,complete:i??void 0};else{let o;this&&jn.useDeprecatedNextContext?(o=Object.create(n),o.unsubscribe=()=>this.unsubscribe(),r={next:n.next&&bh(n.next,o),error:n.error&&bh(n.error,o),complete:n.complete&&bh(n.complete,o)}):r=n}this.destination=new Ch(r)}};function lc(t){jn.useDeprecatedSynchronousErrorHandling?sy(t):sc(t)}function TM(t){throw t}function Dh(t,n){let{onStoppedNotification:e}=jn;e&&zo.setTimeout(()=>e(t,n))}var AM={closed:!0,next:Vr,error:TM,complete:Vr};var $o=typeof Symbol=="function"&&Symbol.observable||"@@observable";function Hn(t){return t}function ly(t){return t.length===0?Hn:t.length===1?t[0]:function(e){return t.reduce((i,r)=>r(i),e)}}var ue=(()=>{class t{constructor(e){e&&(this._subscribe=e)}lift(e){let i=new t;return i.source=this,i.operator=e,i}subscribe(e,i,r){let o=NM(e)?e:new Ai(e,i,r);return Uo(()=>{let{operator:a,source:s}=this;o.add(a?a.call(o,s):s?this._subscribe(o):this._trySubscribe(o))}),o}_trySubscribe(e){try{return this._subscribe(e)}catch(i){e.error(i)}}forEach(e,i){return i=cy(i),new i((r,o)=>{let a=new Ai({next:s=>{try{e(s)}catch(l){o(l),a.unsubscribe()}},error:o,complete:r});this.subscribe(a)})}_subscribe(e){var i;return(i=this.source)===null||i===void 0?void 0:i.subscribe(e)}[$o](){return this}pipe(...e){return ly(e)(this)}toPromise(e){return e=cy(e),new e((i,r)=>{let o;this.subscribe(a=>o=a,a=>r(a),()=>i(o))})}}return t.create=n=>new t(n),t})();function cy(t){var n;return(n=t??jn.Promise)!==null&&n!==void 0?n:Promise}function RM(t){return t&&de(t.next)&&de(t.error)&&de(t.complete)}function NM(t){return t&&t instanceof jr||RM(t)&&ac(t)}function OM(t){return de(t?.lift)}function me(t){return n=>{if(OM(n))return n.lift(function(e){try{return t(e,this)}catch(i){this.error(i)}});throw new TypeError("Unable to lift unknown Observable type")}}function pe(t,n,e,i,r){return new wh(t,n,e,i,r)}var wh=class extends jr{constructor(n,e,i,r,o,a){super(n),this.onFinalize=o,this.shouldUnsubscribe=a,this._next=e?function(s){try{e(s)}catch(l){n.error(l)}}:super._next,this._error=r?function(s){try{r(s)}catch(l){n.error(l)}finally{this.unsubscribe()}}:super._error,this._complete=i?function(){try{i()}catch(s){n.error(s)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var n;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:e}=this;super.unsubscribe(),!e&&((n=this.onFinalize)===null||n===void 0||n.call(this))}}};var dy=rc(t=>function(){t(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var M=(()=>{class t extends ue{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(e){let i=new cc(this,this);return i.operator=e,i}_throwIfClosed(){if(this.closed)throw new dy}next(e){Uo(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let i of this.currentObservers)i.next(e)}})}error(e){Uo(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=e;let{observers:i}=this;for(;i.length;)i.shift().error(e)}})}complete(){Uo(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:e}=this;for(;e.length;)e.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var e;return((e=this.observers)===null||e===void 0?void 0:e.length)>0}_trySubscribe(e){return this._throwIfClosed(),super._trySubscribe(e)}_subscribe(e){return this._throwIfClosed(),this._checkFinalizedStatuses(e),this._innerSubscribe(e)}_innerSubscribe(e){let{hasError:i,isStopped:r,observers:o}=this;return i||r?vh:(this.currentObservers=null,o.push(e),new se(()=>{this.currentObservers=null,Lr(o,e)}))}_checkFinalizedStatuses(e){let{hasError:i,thrownError:r,isStopped:o}=this;i?e.error(r):o&&e.complete()}asObservable(){let e=new ue;return e.source=this,e}}return t.create=(n,e)=>new cc(n,e),t})(),cc=class extends M{constructor(n,e){super(),this.destination=n,this.source=e}next(n){var e,i;(i=(e=this.destination)===null||e===void 0?void 0:e.next)===null||i===void 0||i.call(e,n)}error(n){var e,i;(i=(e=this.destination)===null||e===void 0?void 0:e.error)===null||i===void 0||i.call(e,n)}complete(){var n,e;(e=(n=this.destination)===null||n===void 0?void 0:n.complete)===null||e===void 0||e.call(n)}_subscribe(n){var e,i;return(i=(e=this.source)===null||e===void 0?void 0:e.subscribe(n))!==null&&i!==void 0?i:vh}};var Hr=class extends M{constructor(n){super(),this._value=n}get value(){return this.getValue()}_subscribe(n){let e=super._subscribe(n);return!e.closed&&n.next(this._value),e}getValue(){let{hasError:n,thrownError:e,_value:i}=this;if(n)throw e;return this._throwIfClosed(),i}next(n){super.next(this._value=n)}};var es={now(){return(es.delegate||Date).now()},delegate:void 0};var dc=class extends M{constructor(n=1/0,e=1/0,i=es){super(),this._bufferSize=n,this._windowTime=e,this._timestampProvider=i,this._buffer=[],this._infiniteTimeWindow=!0,this._infiniteTimeWindow=e===1/0,this._bufferSize=Math.max(1,n),this._windowTime=Math.max(1,e)}next(n){let{isStopped:e,_buffer:i,_infiniteTimeWindow:r,_timestampProvider:o,_windowTime:a}=this;e||(i.push(n),!r&&i.push(o.now()+a)),this._trimBuffer(),super.next(n)}_subscribe(n){this._throwIfClosed(),this._trimBuffer();let e=this._innerSubscribe(n),{_infiniteTimeWindow:i,_buffer:r}=this,o=r.slice();for(let a=0;a<o.length&&!n.closed;a+=i?1:2)n.next(o[a]);return this._checkFinalizedStatuses(n),e}_trimBuffer(){let{_bufferSize:n,_timestampProvider:e,_buffer:i,_infiniteTimeWindow:r}=this,o=(r?1:2)*n;if(n<1/0&&o<i.length&&i.splice(0,i.length-o),!r){let a=e.now(),s=0;for(let l=1;l<i.length&&i[l]<=a;l+=2)s=l;s&&i.splice(0,s+1)}}};var uc=class extends se{constructor(n,e){super()}schedule(n,e=0){return this}};var ts={setInterval(t,n,...e){let{delegate:i}=ts;return i?.setInterval?i.setInterval(t,n,...e):setInterval(t,n,...e)},clearInterval(t){let{delegate:n}=ts;return(n?.clearInterval||clearInterval)(t)},delegate:void 0};var fc=class extends uc{constructor(n,e){super(n,e),this.scheduler=n,this.work=e,this.pending=!1}schedule(n,e=0){var i;if(this.closed)return this;this.state=n;let r=this.id,o=this.scheduler;return r!=null&&(this.id=this.recycleAsyncId(o,r,e)),this.pending=!0,this.delay=e,this.id=(i=this.id)!==null&&i!==void 0?i:this.requestAsyncId(o,this.id,e),this}requestAsyncId(n,e,i=0){return ts.setInterval(n.flush.bind(n,this),i)}recycleAsyncId(n,e,i=0){if(i!=null&&this.delay===i&&this.pending===!1)return e;e!=null&&ts.clearInterval(e)}execute(n,e){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;let i=this._execute(n,e);if(i)return i;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(n,e){let i=!1,r;try{this.work(n)}catch(o){i=!0,r=o||new Error("Scheduled action threw falsy error")}if(i)return this.unsubscribe(),r}unsubscribe(){if(!this.closed){let{id:n,scheduler:e}=this,{actions:i}=e;this.work=this.state=this.scheduler=null,this.pending=!1,Lr(i,this),n!=null&&(this.id=this.recycleAsyncId(e,n,null)),this.delay=null,super.unsubscribe()}}};var Go=class t{constructor(n,e=t.now){this.schedulerActionCtor=n,this.now=e}schedule(n,e=0,i){return new this.schedulerActionCtor(this,n).schedule(i,e)}};Go.now=es.now;var hc=class extends Go{constructor(n,e=Go.now){super(n,e),this.actions=[],this._active=!1}flush(n){let{actions:e}=this;if(this._active){e.push(n);return}let i;this._active=!0;do if(i=n.execute(n.state,n.delay))break;while(n=e.shift());if(this._active=!1,i){for(;n=e.shift();)n.unsubscribe();throw i}}};var zr=new hc(fc),uy=zr;var Ur=new ue(t=>t.complete());function mc(t){return t&&de(t.schedule)}function Eh(t){return t[t.length-1]}function pc(t){return de(Eh(t))?t.pop():void 0}function ci(t){return mc(Eh(t))?t.pop():void 0}function fy(t,n){return typeof Eh(t)=="number"?t.pop():n}function my(t,n,e,i){function r(o){return o instanceof e?o:new e(function(a){a(o)})}return new(e||(e=Promise))(function(o,a){function s(d){try{c(i.next(d))}catch(f){a(f)}}function l(d){try{c(i.throw(d))}catch(f){a(f)}}function c(d){d.done?o(d.value):r(d.value).then(s,l)}c((i=i.apply(t,n||[])).next())})}function hy(t){var n=typeof Symbol=="function"&&Symbol.iterator,e=n&&t[n],i=0;if(e)return e.call(t);if(t&&typeof t.length=="number")return{next:function(){return t&&i>=t.length&&(t=void 0),{value:t&&t[i++],done:!t}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")}function $r(t){return this instanceof $r?(this.v=t,this):new $r(t)}function py(t,n,e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=e.apply(t,n||[]),r,o=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),s("next"),s("throw"),s("return",a),r[Symbol.asyncIterator]=function(){return this},r;function a(h){return function(_){return Promise.resolve(_).then(h,f)}}function s(h,_){i[h]&&(r[h]=function(D){return new Promise(function(E,k){o.push([h,D,E,k])>1||l(h,D)})},_&&(r[h]=_(r[h])))}function l(h,_){try{c(i[h](_))}catch(D){m(o[0][3],D)}}function c(h){h.value instanceof $r?Promise.resolve(h.value.v).then(d,f):m(o[0][2],h)}function d(h){l("next",h)}function f(h){l("throw",h)}function m(h,_){h(_),o.shift(),o.length&&l(o[0][0],o[0][1])}}function gy(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n=t[Symbol.asyncIterator],e;return n?n.call(t):(t=typeof hy=="function"?hy(t):t[Symbol.iterator](),e={},i("next"),i("throw"),i("return"),e[Symbol.asyncIterator]=function(){return this},e);function i(o){e[o]=t[o]&&function(a){return new Promise(function(s,l){a=t[o](a),r(s,l,a.done,a.value)})}}function r(o,a,s,l){Promise.resolve(l).then(function(c){o({value:c,done:s})},a)}}var gc=t=>t&&typeof t.length=="number"&&typeof t!="function";function _c(t){return de(t?.then)}function vc(t){return de(t[$o])}function yc(t){return Symbol.asyncIterator&&de(t?.[Symbol.asyncIterator])}function bc(t){return new TypeError(`You provided ${t!==null&&typeof t=="object"?"an invalid object":`'${t}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function FM(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var Dc=FM();function Cc(t){return de(t?.[Dc])}function wc(t){return py(this,arguments,function*(){let e=t.getReader();try{for(;;){let{value:i,done:r}=yield $r(e.read());if(r)return yield $r(void 0);yield yield $r(i)}}finally{e.releaseLock()}})}function Ec(t){return de(t?.getReader)}function Re(t){if(t instanceof ue)return t;if(t!=null){if(vc(t))return PM(t);if(gc(t))return LM(t);if(_c(t))return VM(t);if(yc(t))return _y(t);if(Cc(t))return BM(t);if(Ec(t))return jM(t)}throw bc(t)}function PM(t){return new ue(n=>{let e=t[$o]();if(de(e.subscribe))return e.subscribe(n);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function LM(t){return new ue(n=>{for(let e=0;e<t.length&&!n.closed;e++)n.next(t[e]);n.complete()})}function VM(t){return new ue(n=>{t.then(e=>{n.closed||(n.next(e),n.complete())},e=>n.error(e)).then(null,sc)})}function BM(t){return new ue(n=>{for(let e of t)if(n.next(e),n.closed)return;n.complete()})}function _y(t){return new ue(n=>{HM(t,n).catch(e=>n.error(e))})}function jM(t){return _y(wc(t))}function HM(t,n){var e,i,r,o;return my(this,void 0,void 0,function*(){try{for(e=gy(t);i=yield e.next(),!i.done;){let a=i.value;if(n.next(a),n.closed)return}}catch(a){r={error:a}}finally{try{i&&!i.done&&(o=e.return)&&(yield o.call(e))}finally{if(r)throw r.error}}n.complete()})}function Kt(t,n,e,i=0,r=!1){let o=n.schedule(function(){e(),r?t.add(this.schedule(null,i)):this.unsubscribe()},i);if(t.add(o),!r)return o}function xc(t,n=0){return me((e,i)=>{e.subscribe(pe(i,r=>Kt(i,t,()=>i.next(r),n),()=>Kt(i,t,()=>i.complete(),n),r=>Kt(i,t,()=>i.error(r),n)))})}function Sc(t,n=0){return me((e,i)=>{i.add(t.schedule(()=>e.subscribe(i),n))})}function vy(t,n){return Re(t).pipe(Sc(n),xc(n))}function yy(t,n){return Re(t).pipe(Sc(n),xc(n))}function by(t,n){return new ue(e=>{let i=0;return n.schedule(function(){i===t.length?e.complete():(e.next(t[i++]),e.closed||this.schedule())})})}function Dy(t,n){return new ue(e=>{let i;return Kt(e,n,()=>{i=t[Dc](),Kt(e,n,()=>{let r,o;try{({value:r,done:o}=i.next())}catch(a){e.error(a);return}o?e.complete():e.next(r)},0,!0)}),()=>de(i?.return)&&i.return()})}function Mc(t,n){if(!t)throw new Error("Iterable cannot be null");return new ue(e=>{Kt(e,n,()=>{let i=t[Symbol.asyncIterator]();Kt(e,n,()=>{i.next().then(r=>{r.done?e.complete():e.next(r.value)})},0,!0)})})}function Cy(t,n){return Mc(wc(t),n)}function wy(t,n){if(t!=null){if(vc(t))return vy(t,n);if(gc(t))return by(t,n);if(_c(t))return yy(t,n);if(yc(t))return Mc(t,n);if(Cc(t))return Dy(t,n);if(Ec(t))return Cy(t,n)}throw bc(t)}function Dn(t,n){return n?wy(t,n):Re(t)}function nt(...t){let n=ci(t);return Dn(t,n)}function xh(t,n){let e=de(t)?t:()=>t,i=r=>r.error(e());return new ue(n?r=>n.schedule(i,0,r):i)}function Ey(t){return t instanceof Date&&!isNaN(t)}function Se(t,n){return me((e,i)=>{let r=0;e.subscribe(pe(i,o=>{i.next(t.call(n,o,r++))}))})}var{isArray:zM}=Array;function UM(t,n){return zM(n)?t(...n):t(n)}function Ic(t){return Se(n=>UM(t,n))}var{isArray:$M}=Array,{getPrototypeOf:GM,prototype:WM,keys:qM}=Object;function kc(t){if(t.length===1){let n=t[0];if($M(n))return{args:n,keys:null};if(YM(n)){let e=qM(n);return{args:e.map(i=>n[i]),keys:e}}}return{args:t,keys:null}}function YM(t){return t&&typeof t=="object"&&GM(t)===WM}function Tc(t,n){return t.reduce((e,i,r)=>(e[i]=n[r],e),{})}function Sh(...t){let n=ci(t),e=pc(t),{args:i,keys:r}=kc(t);if(i.length===0)return Dn([],n);let o=new ue(KM(i,n,r?a=>Tc(r,a):Hn));return e?o.pipe(Ic(e)):o}function KM(t,n,e=Hn){return i=>{xy(n,()=>{let{length:r}=t,o=new Array(r),a=r,s=r;for(let l=0;l<r;l++)xy(n,()=>{let c=Dn(t[l],n),d=!1;c.subscribe(pe(i,f=>{o[l]=f,d||(d=!0,s--),s||i.next(e(o.slice()))},()=>{--a||i.complete()}))},i)},i)}}function xy(t,n,e){t?Kt(e,t,n):n()}function Sy(t,n,e,i,r,o,a,s){let l=[],c=0,d=0,f=!1,m=()=>{f&&!l.length&&!c&&n.complete()},h=D=>c<i?_(D):l.push(D),_=D=>{o&&n.next(D),c++;let E=!1;Re(e(D,d++)).subscribe(pe(n,k=>{r?.(k),o?h(k):n.next(k)},()=>{E=!0},void 0,()=>{if(E)try{for(c--;l.length&&c<i;){let k=l.shift();a?Kt(n,a,()=>_(k)):_(k)}m()}catch(k){n.error(k)}}))};return t.subscribe(pe(n,h,()=>{f=!0,m()})),()=>{s?.()}}function tr(t,n,e=1/0){return de(n)?tr((i,r)=>Se((o,a)=>n(i,o,r,a))(Re(t(i,r))),e):(typeof n=="number"&&(e=n),me((i,r)=>Sy(i,r,t,e)))}function Ac(t=1/0){return tr(Hn,t)}function My(){return Ac(1)}function nr(...t){return My()(Dn(t,ci(t)))}function Mh(t){return new ue(n=>{Re(t()).subscribe(n)})}function ns(...t){let n=pc(t),{args:e,keys:i}=kc(t),r=new ue(o=>{let{length:a}=e;if(!a){o.complete();return}let s=new Array(a),l=a,c=a;for(let d=0;d<a;d++){let f=!1;Re(e[d]).subscribe(pe(o,m=>{f||(f=!0,c--),s[d]=m},()=>l--,void 0,()=>{(!l||!f)&&(c||o.next(i?Tc(i,s):s),o.complete())}))}});return n?r.pipe(Ic(n)):r}function Rc(t=0,n,e=uy){let i=-1;return n!=null&&(mc(n)?e=n:i=n),new ue(r=>{let o=Ey(t)?+t-e.now():t;o<0&&(o=0);let a=0;return e.schedule(function(){r.closed||(r.next(a++),0<=i?this.schedule(void 0,i):r.complete())},o)})}function an(...t){let n=ci(t),e=fy(t,1/0),i=t;return i.length?i.length===1?Re(i[0]):Ac(e)(Dn(i,n)):Ur}function He(t,n){return me((e,i)=>{let r=0;e.subscribe(pe(i,o=>t.call(n,o,r++)&&i.next(o)))})}function Iy(t){return me((n,e)=>{let i=!1,r=null,o=null,a=!1,s=()=>{if(o?.unsubscribe(),o=null,i){i=!1;let c=r;r=null,e.next(c)}a&&e.complete()},l=()=>{o=null,a&&e.complete()};n.subscribe(pe(e,c=>{i=!0,r=c,o||Re(t(c)).subscribe(o=pe(e,s,l))},()=>{a=!0,(!i||!o||o.closed)&&e.complete()}))})}function Nc(t,n=zr){return Iy(()=>Rc(t,n))}function Oc(t){return me((n,e)=>{let i=null,r=!1,o;i=n.subscribe(pe(e,void 0,void 0,a=>{o=Re(t(a,Oc(t)(n))),i?(i.unsubscribe(),i=null,o.subscribe(e)):r=!0})),r&&(i.unsubscribe(),i=null,o.subscribe(e))})}function Ih(t,n){return de(n)?tr(t,n,1):tr(t,1)}function is(t,n=zr){return me((e,i)=>{let r=null,o=null,a=null,s=()=>{if(r){r.unsubscribe(),r=null;let c=o;o=null,i.next(c)}};function l(){let c=a+t,d=n.now();if(d<c){r=this.schedule(void 0,c-d),i.add(r);return}s()}e.subscribe(pe(i,c=>{o=c,a=n.now(),r||(r=n.schedule(l,t),i.add(r))},()=>{s(),i.complete()},void 0,()=>{o=r=null}))})}function Qt(t){return t<=0?()=>Ur:me((n,e)=>{let i=0;n.subscribe(pe(e,r=>{++i<=t&&(e.next(r),t<=i&&e.complete())}))})}function ky(){return me((t,n)=>{t.subscribe(pe(n,Vr))})}function Ty(t){return Se(()=>t)}function kh(t,n){return n?e=>nr(n.pipe(Qt(1),ky()),e.pipe(kh(t))):tr((e,i)=>Re(t(e,i)).pipe(Qt(1),Ty(e)))}function rs(t,n=zr){let e=Rc(t,n);return kh(()=>e)}function Fc(t,n=Hn){return t=t??QM,me((e,i)=>{let r,o=!0;e.subscribe(pe(i,a=>{let s=n(a);(o||!t(r,s))&&(o=!1,r=s,i.next(a))}))})}function QM(t,n){return t===n}function os(t){return me((n,e)=>{try{n.subscribe(e)}finally{e.add(t)}})}function Pc(){return me((t,n)=>{let e,i=!1;t.subscribe(pe(n,r=>{let o=e;e=r,i&&n.next([o,r]),i=!0}))})}function as(t={}){let{connector:n=()=>new M,resetOnError:e=!0,resetOnComplete:i=!0,resetOnRefCountZero:r=!0}=t;return o=>{let a,s,l,c=0,d=!1,f=!1,m=()=>{s?.unsubscribe(),s=void 0},h=()=>{m(),a=l=void 0,d=f=!1},_=()=>{let D=a;h(),D?.unsubscribe()};return me((D,E)=>{c++,!f&&!d&&m();let k=l=l??n();E.add(()=>{c--,c===0&&!f&&!d&&(s=Th(_,r))}),k.subscribe(E),!a&&c>0&&(a=new Ai({next:oe=>k.next(oe),error:oe=>{f=!0,m(),s=Th(h,e,oe),k.error(oe)},complete:()=>{d=!0,m(),s=Th(h,i),k.complete()}}),Re(D).subscribe(a))})(o)}}function Th(t,n,...e){if(n===!0){t();return}if(n===!1)return;let i=new Ai({next:()=>{i.unsubscribe(),t()}});return Re(n(...e)).subscribe(i)}function Lc(t,n,e){let i,r=!1;return t&&typeof t=="object"?{bufferSize:i=1/0,windowTime:n=1/0,refCount:r=!1,scheduler:e}=t:i=t??1/0,as({connector:()=>new dc(i,n,e),resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:r})}function ss(t){return He((n,e)=>t<=e)}function sn(...t){let n=ci(t);return me((e,i)=>{(n?nr(t,e,n):nr(t,e)).subscribe(i)})}function zn(t,n){return me((e,i)=>{let r=null,o=0,a=!1,s=()=>a&&!r&&i.complete();e.subscribe(pe(i,l=>{r?.unsubscribe();let c=0,d=o++;Re(t(l,d)).subscribe(r=pe(i,f=>i.next(n?n(l,f,d,c++):f),()=>{r=null,s()}))},()=>{a=!0,s()}))})}function fe(t){return me((n,e)=>{Re(t).subscribe(pe(e,()=>e.complete(),Vr)),!e.closed&&n.subscribe(e)})}function Ah(t,n=!1){return me((e,i)=>{let r=0;e.subscribe(pe(i,o=>{let a=t(o,r++);(a||n)&&i.next(o),!a&&i.complete()}))})}function di(t,n,e){let i=de(t)||n||e?{next:t,error:n,complete:e}:t;return i?me((r,o)=>{var a;(a=i.subscribe)===null||a===void 0||a.call(i);let s=!0;r.subscribe(pe(o,l=>{var c;(c=i.next)===null||c===void 0||c.call(i,l),o.next(l)},()=>{var l;s=!1,(l=i.complete)===null||l===void 0||l.call(i),o.complete()},l=>{var c;s=!1,(c=i.error)===null||c===void 0||c.call(i,l),o.error(l)},()=>{var l,c;s&&((l=i.unsubscribe)===null||l===void 0||l.call(i)),(c=i.finalize)===null||c===void 0||c.call(i)}))}):Hn}var Rh;function Vc(){return Rh}function ui(t){let n=Rh;return Rh=t,n}var Ay=Symbol("NotFound");function Wo(t){return t===Ay||t?.name==="\u0275NotFound"}function Ry(t){let n=K(null);try{return t()}finally{K(n)}}var Gc="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",w=class extends Error{code;constructor(n,e){super(Yo(n,e)),this.code=n}};function ZM(t){return`NG0${Math.abs(t)}`}function Yo(t,n){return`${ZM(t)}${n?": "+n:""}`}var Dt=globalThis;function Ie(t){for(let n in t)if(t[n]===Ie)return n;throw Error("")}function Ly(t,n){for(let e in n)n.hasOwnProperty(e)&&!t.hasOwnProperty(e)&&(t[e]=n[e])}function ms(t){if(typeof t=="string")return t;if(Array.isArray(t))return`[${t.map(ms).join(", ")}]`;if(t==null)return""+t;let n=t.overriddenName||t.name;if(n)return`${n}`;let e=t.toString();if(e==null)return""+e;let i=e.indexOf(`
`);return i>=0?e.slice(0,i):e}function Wc(t,n){return t?n?`${t} ${n}`:t:n||""}var XM=Ie({__forward_ref__:Ie});function at(t){return t.__forward_ref__=at,t}function kt(t){return Gh(t)?t():t}function Gh(t){return typeof t=="function"&&t.hasOwnProperty(XM)&&t.__forward_ref__===at}function C(t){return{token:t.token,providedIn:t.providedIn||null,factory:t.factory,value:void 0}}function H(t){return{providers:t.providers||[],imports:t.imports||[]}}function qc(t){return JM(t,Yc)}function JM(t,n){return t.hasOwnProperty(n)&&t[n]||null}function eI(t){let n=t?.[Yc]??null;return n||null}function Oh(t){return t&&t.hasOwnProperty(jc)?t[jc]:null}var Yc=Ie({\u0275prov:Ie}),jc=Ie({\u0275inj:Ie}),b=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(n,e){this._desc=n,this.\u0275prov=void 0,typeof e=="number"?this.__NG_ELEMENT_ID__=e:e!==void 0&&(this.\u0275prov=C({token:this,providedIn:e.providedIn||"root",factory:e.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function Wh(t){return t&&!!t.\u0275providers}var qh=Ie({\u0275cmp:Ie}),Yh=Ie({\u0275dir:Ie}),Kh=Ie({\u0275pipe:Ie}),Qh=Ie({\u0275mod:Ie}),cs=Ie({\u0275fac:Ie}),Kr=Ie({__NG_ELEMENT_ID__:Ie}),Ny=Ie({__NG_ENV_ID__:Ie});function Vy(t){return Kc(t,"@NgModule"),t[Qh]||null}function ar(t){return Kc(t,"@Component"),t[qh]||null}function Zh(t){return Kc(t,"@Directive"),t[Yh]||null}function By(t){return Kc(t,"@Pipe"),t[Kh]||null}function Kc(t,n){if(t==null)throw new w(-919,!1)}function ps(t){return typeof t=="string"?t:t==null?"":String(t)}var jy=Ie({ngErrorCode:Ie}),tI=Ie({ngErrorMessage:Ie}),nI=Ie({ngTokenPath:Ie});function Xh(t,n){return Hy("",-200,n)}function Qc(t,n){throw new w(-201,!1)}function Hy(t,n,e){let i=new w(n,t);return i[jy]=n,i[tI]=t,e&&(i[nI]=e),i}function iI(t){return t[jy]}var Fh;function zy(){return Fh}function zt(t){let n=Fh;return Fh=t,n}function Jh(t,n,e){let i=qc(t);if(i&&i.providedIn=="root")return i.value===void 0?i.value=i.factory():i.value;if(e&8)return null;if(n!==void 0)return n;Qc(t,"")}var rI={},Gr=rI,oI="__NG_DI_FLAG__",Ph=class{injector;constructor(n){this.injector=n}retrieve(n,e){let i=Wr(e)||0;try{return this.injector.get(n,i&8?null:Gr,i)}catch(r){if(Wo(r))return r;throw r}}};function aI(t,n=0){let e=Vc();if(e===void 0)throw new w(-203,!1);if(e===null)return Jh(t,void 0,n);{let i=sI(n),r=e.retrieve(t,i);if(Wo(r)){if(i.optional)return null;throw r}return r}}function G(t,n=0){return(zy()||aI)(kt(t),n)}function u(t,n){return G(t,Wr(n))}function Wr(t){return typeof t>"u"||typeof t=="number"?t:0|(t.optional&&8)|(t.host&&1)|(t.self&&2)|(t.skipSelf&&4)}function sI(t){return{optional:!!(t&8),host:!!(t&1),self:!!(t&2),skipSelf:!!(t&4)}}function Lh(t){let n=[];for(let e=0;e<t.length;e++){let i=kt(t[e]);if(Array.isArray(i)){if(i.length===0)throw new w(900,!1);let r,o=0;for(let a=0;a<i.length;a++){let s=i[a],l=lI(s);typeof l=="number"?l===-1?r=s.token:o|=l:r=s}n.push(G(r,o))}else n.push(G(i))}return n}function lI(t){return t[oI]}function ir(t,n){let e=t.hasOwnProperty(cs);return e?t[cs]:null}function Uy(t,n,e){if(t.length!==n.length)return!1;for(let i=0;i<t.length;i++){let r=t[i],o=n[i];if(e&&(r=e(r),o=e(o)),o!==r)return!1}return!0}function $y(t){return t.flat(Number.POSITIVE_INFINITY)}function Zc(t,n){t.forEach(e=>Array.isArray(e)?Zc(e,n):n(e))}function em(t,n,e){n>=t.length?t.push(e):t.splice(n,0,e)}function gs(t,n){return n>=t.length-1?t.pop():t.splice(n,1)[0]}function Gy(t,n){let e=[];for(let i=0;i<t;i++)e.push(n);return e}function Wy(t,n,e,i){let r=t.length;if(r==n)t.push(e,i);else if(r===1)t.push(i,t[0]),t[0]=e;else{for(r--,t.push(t[r-1],t[r]);r>n;){let o=r-2;t[r]=t[o],r--}t[n]=e,t[n+1]=i}}function Xc(t,n,e){let i=Ko(t,n);return i>=0?t[i|1]=e:(i=~i,Wy(t,i,n,e)),i}function Jc(t,n){let e=Ko(t,n);if(e>=0)return t[e|1]}function Ko(t,n){return cI(t,n,1)}function cI(t,n,e){let i=0,r=t.length>>e;for(;r!==i;){let o=i+(r-i>>1),a=t[o<<e];if(n===a)return o<<e;a>n?r=o:i=o+1}return~(r<<e)}var sr={},Pt=[],lr=new b(""),tm=new b("",-1),nm=new b(""),ds=class{get(n,e=Gr){if(e===Gr){let r=Hy("",-201);throw r.name="\u0275NotFound",r}return e}};function _s(t){return{\u0275providers:t}}function qy(...t){return{\u0275providers:im(!0,t),\u0275fromNgModule:!0}}function im(t,...n){let e=[],i=new Set,r,o=a=>{e.push(a)};return Zc(n,a=>{let s=a;Hc(s,o,[],i)&&(r||=[],r.push(s))}),r!==void 0&&Yy(r,o),e}function Yy(t,n){for(let e=0;e<t.length;e++){let{ngModule:i,providers:r}=t[e];rm(r,o=>{n(o,i)})}}function Hc(t,n,e,i){if(t=kt(t),!t)return!1;let r=null,o=Oh(t),a=!o&&ar(t);if(!o&&!a){let l=t.ngModule;if(o=Oh(l),o)r=l;else return!1}else{if(a&&!a.standalone)return!1;r=t}let s=i.has(r);if(a){if(s)return!1;if(i.add(r),a.dependencies){let l=typeof a.dependencies=="function"?a.dependencies():a.dependencies;for(let c of l)Hc(c,n,e,i)}}else if(o){if(o.imports!=null&&!s){i.add(r);let c;Zc(o.imports,d=>{Hc(d,n,e,i)&&(c||=[],c.push(d))}),c!==void 0&&Yy(c,n)}if(!s){let c=ir(r)||(()=>new r);n({provide:r,useFactory:c,deps:Pt},r),n({provide:nm,useValue:r,multi:!0},r),n({provide:lr,useValue:()=>G(r),multi:!0},r)}let l=o.providers;if(l!=null&&!s){let c=t;rm(l,d=>{n(d,c)})}}else return!1;return r!==t&&t.providers!==void 0}function rm(t,n){for(let e of t)Wh(e)&&(e=e.\u0275providers),Array.isArray(e)?rm(e,n):n(e)}var dI=Ie({provide:String,useValue:Ie});function Ky(t){return t!==null&&typeof t=="object"&&dI in t}function uI(t){return!!(t&&t.useExisting)}function fI(t){return!!(t&&t.useFactory)}function qr(t){return typeof t=="function"}function Qy(t){return!!t.useClass}var vs=new b(""),Bc={},Oy={},Nh;function Qo(){return Nh===void 0&&(Nh=new ds),Nh}var ot=class{},Yr=class extends ot{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(n,e,i,r){super(),this.parent=e,this.source=i,this.scopes=r,Bh(n,a=>this.processProvider(a)),this.records.set(tm,qo(void 0,this)),r.has("environment")&&this.records.set(ot,qo(void 0,this));let o=this.records.get(vs);o!=null&&typeof o.value=="string"&&this.scopes.add(o.value),this.injectorDefTypes=new Set(this.get(nm,Pt,{self:!0}))}retrieve(n,e){let i=Wr(e)||0;try{return this.get(n,Gr,i)}catch(r){if(Wo(r))return r;throw r}}destroy(){ls(this),this._destroyed=!0;let n=K(null);try{for(let i of this._ngOnDestroyHooks)i.ngOnDestroy();let e=this._onDestroyHooks;this._onDestroyHooks=[];for(let i of e)i()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),K(n)}}onDestroy(n){return ls(this),this._onDestroyHooks.push(n),()=>this.removeOnDestroy(n)}runInContext(n){ls(this);let e=ui(this),i=zt(void 0),r;try{return n()}finally{ui(e),zt(i)}}get(n,e=Gr,i){if(ls(this),n.hasOwnProperty(Ny))return n[Ny](this);let r=Wr(i),o,a=ui(this),s=zt(void 0);try{if(!(r&4)){let c=this.records.get(n);if(c===void 0){let d=_I(n)&&qc(n);d&&this.injectableDefInScope(d)?c=qo(Vh(n),Bc):c=null,this.records.set(n,c)}if(c!=null)return this.hydrate(n,c,r)}let l=r&2?Qo():this.parent;return e=r&8&&e===Gr?null:e,l.get(n,e)}catch(l){let c=iI(l);throw c===-200||c===-201?new w(c,null):l}finally{zt(s),ui(a)}}resolveInjectorInitializers(){let n=K(null),e=ui(this),i=zt(void 0),r;try{let o=this.get(lr,Pt,{self:!0});for(let a of o)a()}finally{ui(e),zt(i),K(n)}}toString(){return"R3Injector[...]"}processProvider(n){n=kt(n);let e=qr(n)?n:kt(n&&n.provide),i=mI(n);if(!qr(n)&&n.multi===!0){let r=this.records.get(e);r||(r=qo(void 0,Bc,!0),r.factory=()=>Lh(r.multi),this.records.set(e,r)),e=n,r.multi.push(n)}this.records.set(e,i)}hydrate(n,e,i){let r=K(null);try{if(e.value===Oy)throw Xh("");return e.value===Bc&&(e.value=Oy,e.value=e.factory(void 0,i)),typeof e.value=="object"&&e.value&&gI(e.value)&&this._ngOnDestroyHooks.add(e.value),e.value}finally{K(r)}}injectableDefInScope(n){if(!n.providedIn)return!1;let e=kt(n.providedIn);return typeof e=="string"?e==="any"||this.scopes.has(e):this.injectorDefTypes.has(e)}removeOnDestroy(n){let e=this._onDestroyHooks.indexOf(n);e!==-1&&this._onDestroyHooks.splice(e,1)}};function Vh(t){let n=qc(t),e=n!==null?n.factory:ir(t);if(e!==null)return e;if(t instanceof b)throw new w(-204,!1);if(t instanceof Function)return hI(t);throw new w(-204,!1)}function hI(t){if(t.length>0)throw new w(-204,!1);let e=eI(t);return e!==null?()=>e.factory(t):()=>new t}function mI(t){if(Ky(t))return qo(void 0,t.useValue);{let n=om(t);return qo(n,Bc)}}function om(t,n,e){let i;if(qr(t)){let r=kt(t);return ir(r)||Vh(r)}else if(Ky(t))i=()=>kt(t.useValue);else if(fI(t))i=()=>t.useFactory(...Lh(t.deps||[]));else if(uI(t))i=(r,o)=>G(kt(t.useExisting),o!==void 0&&o&8?8:void 0);else{let r=kt(t&&(t.useClass||t.provide));if(pI(t))i=()=>new r(...Lh(t.deps));else return ir(r)||Vh(r)}return i}function ls(t){if(t.destroyed)throw new w(-205,!1)}function qo(t,n,e=!1){return{factory:t,value:n,multi:e?[]:void 0}}function pI(t){return!!t.deps}function gI(t){return t!==null&&typeof t=="object"&&typeof t.ngOnDestroy=="function"}function _I(t){return typeof t=="function"||typeof t=="object"&&t.ngMetadataName==="InjectionToken"}function Bh(t,n){for(let e of t)Array.isArray(e)?Bh(e,n):e&&Wh(e)?Bh(e.\u0275providers,n):n(e)}function Zo(t,n){let e;t instanceof Yr?(ls(t),e=t):e=new Ph(t);let i,r=ui(e),o=zt(void 0);try{return n()}finally{ui(r),zt(o)}}function am(){return zy()!==void 0||Vc()!=null}var $n=0,Q=1,te=2,pt=3,Cn=4,Ut=5,Qr=6,Xo=7,st=8,$t=9,fi=10,Ne=11,Jo=12,sm=13,Zr=14,Gt=15,cr=16,Xr=17,hi=18,mi=19,lm=20,Ri=21,ed=22,rr=23,ln=24,Jr=25,pi=26,tt=27,Zy=1,cm=6,dr=7,ys=8,eo=9,it=10;function Ni(t){return Array.isArray(t)&&typeof t[Zy]=="object"}function Gn(t){return Array.isArray(t)&&t[Zy]===!0}function dm(t){return(t.flags&4)!==0}function Oi(t){return t.componentOffset>-1}function bs(t){return(t.flags&1)===1}function gi(t){return!!t.template}function ea(t){return(t[te]&512)!==0}function to(t){return(t[te]&256)===256}var um="svg",Xy="math";function wn(t){for(;Array.isArray(t);)t=t[$n];return t}function fm(t,n){return wn(n[t])}function cn(t,n){return wn(n[t.index])}function td(t,n){return t.data[n]}function hm(t,n){return t[n]}function mm(t,n,e,i){e>=t.data.length&&(t.data[e]=null,t.blueprint[e]=null),n[e]=i}function En(t,n){let e=n[t];return Ni(e)?e:e[$n]}function Jy(t){return(t[te]&4)===4}function nd(t){return(t[te]&128)===128}function eb(t){return Gn(t[pt])}function xn(t,n){return n==null?null:t[n]}function pm(t){t[Xr]=0}function gm(t){t[te]&1024||(t[te]|=1024,nd(t)&&no(t))}function tb(t,n){for(;t>0;)n=n[Zr],t--;return n}function Ds(t){return!!(t[te]&9216||t[ln]?.dirty)}function id(t){t[fi].changeDetectionScheduler?.notify(8),t[te]&64&&(t[te]|=1024),Ds(t)&&no(t)}function no(t){t[fi].changeDetectionScheduler?.notify(0);let n=or(t);for(;n!==null&&!(n[te]&8192||(n[te]|=8192,!nd(n)));)n=or(n)}function _m(t,n){if(to(t))throw new w(911,!1);t[Ri]===null&&(t[Ri]=[]),t[Ri].push(n)}function nb(t,n){if(t[Ri]===null)return;let e=t[Ri].indexOf(n);e!==-1&&t[Ri].splice(e,1)}function or(t){let n=t[pt];return Gn(n)?n[pt]:n}function vm(t){return t[Xo]??=[]}function ym(t){return t.cleanup??=[]}function ib(t,n,e,i){let r=vm(n);r.push(e),t.firstCreatePass&&ym(t).push(i,r.length-1)}var le={lFrame:pb(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var jh=!1;function rb(){return le.lFrame.elementDepthCount}function ob(){le.lFrame.elementDepthCount++}function bm(){le.lFrame.elementDepthCount--}function Dm(){return le.bindingsEnabled}function Cm(){return le.skipHydrationRootTNode!==null}function wm(t){return le.skipHydrationRootTNode===t}function Em(){le.skipHydrationRootTNode=null}function ee(){return le.lFrame.lView}function Ye(){return le.lFrame.tView}function L(t){return le.lFrame.contextLView=t,t[st]}function V(t){return le.lFrame.contextLView=null,t}function ht(){let t=xm();for(;t!==null&&t.type===64;)t=t.parent;return t}function xm(){return le.lFrame.currentTNode}function ab(){let t=le.lFrame,n=t.currentTNode;return t.isParent?n:n.parent}function ta(t,n){let e=le.lFrame;e.currentTNode=t,e.isParent=n}function Sm(){return le.lFrame.isParent}function Mm(){le.lFrame.isParent=!1}function sb(){return le.lFrame.contextLView}function Im(){return jh}function us(t){let n=jh;return jh=t,n}function km(){let t=le.lFrame,n=t.bindingRootIndex;return n===-1&&(n=t.bindingRootIndex=t.tView.bindingStartIndex),n}function lb(){return le.lFrame.bindingIndex}function cb(t){return le.lFrame.bindingIndex=t}function ur(){return le.lFrame.bindingIndex++}function rd(t){let n=le.lFrame,e=n.bindingIndex;return n.bindingIndex=n.bindingIndex+t,e}function db(){return le.lFrame.inI18n}function ub(t,n){let e=le.lFrame;e.bindingIndex=e.bindingRootIndex=t,od(n)}function fb(){return le.lFrame.currentDirectiveIndex}function od(t){le.lFrame.currentDirectiveIndex=t}function hb(t){let n=le.lFrame.currentDirectiveIndex;return n===-1?null:t[n]}function ad(){return le.lFrame.currentQueryIndex}function Cs(t){le.lFrame.currentQueryIndex=t}function vI(t){let n=t[Q];return n.type===2?n.declTNode:n.type===1?t[Ut]:null}function Tm(t,n,e){if(e&4){let r=n,o=t;for(;r=r.parent,r===null&&!(e&1);)if(r=vI(o),r===null||(o=o[Zr],r.type&10))break;if(r===null)return!1;n=r,t=o}let i=le.lFrame=mb();return i.currentTNode=n,i.lView=t,!0}function sd(t){let n=mb(),e=t[Q];le.lFrame=n,n.currentTNode=e.firstChild,n.lView=t,n.tView=e,n.contextLView=t,n.bindingIndex=e.bindingStartIndex,n.inI18n=!1}function mb(){let t=le.lFrame,n=t===null?null:t.child;return n===null?pb(t):n}function pb(t){let n={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:t,child:null,inI18n:!1};return t!==null&&(t.child=n),n}function gb(){let t=le.lFrame;return le.lFrame=t.parent,t.currentTNode=null,t.lView=null,t}var Am=gb;function ld(){let t=gb();t.isParent=!0,t.tView=null,t.selectedIndex=-1,t.contextLView=null,t.elementDepthCount=0,t.currentDirectiveIndex=-1,t.currentNamespace=null,t.bindingRootIndex=-1,t.bindingIndex=-1,t.currentQueryIndex=0}function _b(t){return(le.lFrame.contextLView=tb(t,le.lFrame.contextLView))[st]}function _i(){return le.lFrame.selectedIndex}function fr(t){le.lFrame.selectedIndex=t}function ws(){let t=le.lFrame;return td(t.tView,t.selectedIndex)}function dn(){le.lFrame.currentNamespace=um}function io(){yI()}function yI(){le.lFrame.currentNamespace=null}function vb(){return le.lFrame.currentNamespace}var yb=!0;function cd(){return yb}function dd(t){yb=t}function Hh(t,n=null,e=null,i){let r=Rm(t,n,e,i);return r.resolveInjectorInitializers(),r}function Rm(t,n=null,e=null,i,r=new Set){let o=[e||Pt,qy(t)],a;return new Yr(o,n||Qo(),a||null,r)}var ne=class t{static THROW_IF_NOT_FOUND=Gr;static NULL=new ds;static create(n,e){if(Array.isArray(n))return Hh({name:""},e,n,"");{let i=n.name??"";return Hh({name:i},n.parent,n.providers,i)}}static \u0275prov=C({token:t,providedIn:"any",factory:()=>G(tm)});static __NG_ELEMENT_ID__=-1},W=new b(""),Wn=(()=>{class t{static __NG_ELEMENT_ID__=bI;static __NG_ENV_ID__=e=>e}return t})(),zc=class extends Wn{_lView;constructor(n){super(),this._lView=n}get destroyed(){return to(this._lView)}onDestroy(n){let e=this._lView;return _m(e,n),()=>nb(e,n)}};function bI(){return new zc(ee())}var Nm=!1,bb=new b(""),hr=(()=>{class t{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new Hr(!1);debugTaskTracker=u(bb,{optional:!0});get hasPendingTasks(){return this.destroyed?!1:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new ue(e=>{e.next(!1),e.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let e=this.taskId++;return this.pendingTasks.add(e),this.debugTaskTracker?.add(e),e}has(e){return this.pendingTasks.has(e)}remove(e){this.pendingTasks.delete(e),this.debugTaskTracker?.remove(e),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static \u0275prov=C({token:t,providedIn:"root",factory:()=>new t})}return t})(),zh=class extends M{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(n=!1){super(),this.__isAsync=n,am()&&(this.destroyRef=u(Wn,{optional:!0})??void 0,this.pendingTasks=u(hr,{optional:!0})??void 0)}emit(n){let e=K(null);try{super.next(n)}finally{K(e)}}subscribe(n,e,i){let r=n,o=e||(()=>null),a=i;if(n&&typeof n=="object"){let l=n;r=l.next?.bind(l),o=l.error?.bind(l),a=l.complete?.bind(l)}this.__isAsync&&(o=this.wrapInTimeout(o),r&&(r=this.wrapInTimeout(r)),a&&(a=this.wrapInTimeout(a)));let s=super.subscribe({next:r,error:o,complete:a});return n instanceof se&&n.add(s),s}wrapInTimeout(n){return e=>{let i=this.pendingTasks?.add();setTimeout(()=>{try{n(e)}finally{i!==void 0&&this.pendingTasks?.remove(i)}})}}},S=zh;function Uc(...t){}function Om(t){let n,e;function i(){t=Uc;try{e!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(e),n!==void 0&&clearTimeout(n)}catch(r){}}return n=setTimeout(()=>{t(),i()}),typeof requestAnimationFrame=="function"&&(e=requestAnimationFrame(()=>{t(),i()})),()=>i()}function Db(t){return queueMicrotask(()=>t()),()=>{t=Uc}}var Fm="isAngularZone",fs=Fm+"_ID",DI=0,A=class t{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new S(!1);onMicrotaskEmpty=new S(!1);onStable=new S(!1);onError=new S(!1);constructor(n){let{enableLongStackTrace:e=!1,shouldCoalesceEventChangeDetection:i=!1,shouldCoalesceRunChangeDetection:r=!1,scheduleInRootZone:o=Nm}=n;if(typeof Zone>"u")throw new w(908,!1);Zone.assertZonePatched();let a=this;a._nesting=0,a._outer=a._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(a._inner=a._inner.fork(new Zone.TaskTrackingZoneSpec)),e&&Zone.longStackTraceZoneSpec&&(a._inner=a._inner.fork(Zone.longStackTraceZoneSpec)),a.shouldCoalesceEventChangeDetection=!r&&i,a.shouldCoalesceRunChangeDetection=r,a.callbackScheduled=!1,a.scheduleInRootZone=o,EI(a)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(Fm)===!0}static assertInAngularZone(){if(!t.isInAngularZone())throw new w(909,!1)}static assertNotInAngularZone(){if(t.isInAngularZone())throw new w(909,!1)}run(n,e,i){return this._inner.run(n,e,i)}runTask(n,e,i,r){let o=this._inner,a=o.scheduleEventTask("NgZoneEvent: "+r,n,CI,Uc,Uc);try{return o.runTask(a,e,i)}finally{o.cancelTask(a)}}runGuarded(n,e,i){return this._inner.runGuarded(n,e,i)}runOutsideAngular(n){return this._outer.run(n)}},CI={};function Pm(t){if(t._nesting==0&&!t.hasPendingMicrotasks&&!t.isStable)try{t._nesting++,t.onMicrotaskEmpty.emit(null)}finally{if(t._nesting--,!t.hasPendingMicrotasks)try{t.runOutsideAngular(()=>t.onStable.emit(null))}finally{t.isStable=!0}}}function wI(t){if(t.isCheckStableRunning||t.callbackScheduled)return;t.callbackScheduled=!0;function n(){Om(()=>{t.callbackScheduled=!1,Uh(t),t.isCheckStableRunning=!0,Pm(t),t.isCheckStableRunning=!1})}t.scheduleInRootZone?Zone.root.run(()=>{n()}):t._outer.run(()=>{n()}),Uh(t)}function EI(t){let n=()=>{wI(t)},e=DI++;t._inner=t._inner.fork({name:"angular",properties:{[Fm]:!0,[fs]:e,[fs+e]:!0},onInvokeTask:(i,r,o,a,s,l)=>{if(xI(l))return i.invokeTask(o,a,s,l);try{return Fy(t),i.invokeTask(o,a,s,l)}finally{(t.shouldCoalesceEventChangeDetection&&a.type==="eventTask"||t.shouldCoalesceRunChangeDetection)&&n(),Py(t)}},onInvoke:(i,r,o,a,s,l,c)=>{try{return Fy(t),i.invoke(o,a,s,l,c)}finally{t.shouldCoalesceRunChangeDetection&&!t.callbackScheduled&&!SI(l)&&n(),Py(t)}},onHasTask:(i,r,o,a)=>{i.hasTask(o,a),r===o&&(a.change=="microTask"?(t._hasPendingMicrotasks=a.microTask,Uh(t),Pm(t)):a.change=="macroTask"&&(t.hasPendingMacrotasks=a.macroTask))},onHandleError:(i,r,o,a)=>(i.handleError(o,a),t.runOutsideAngular(()=>t.onError.emit(a)),!1)})}function Uh(t){t._hasPendingMicrotasks||(t.shouldCoalesceEventChangeDetection||t.shouldCoalesceRunChangeDetection)&&t.callbackScheduled===!0?t.hasPendingMicrotasks=!0:t.hasPendingMicrotasks=!1}function Fy(t){t._nesting++,t.isStable&&(t.isStable=!1,t.onUnstable.emit(null))}function Py(t){t._nesting--,Pm(t)}var hs=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new S;onMicrotaskEmpty=new S;onStable=new S;onError=new S;run(n,e,i){return n.apply(e,i)}runGuarded(n,e,i){return n.apply(e,i)}runOutsideAngular(n){return n()}runTask(n,e,i,r){return n.apply(e,i)}};function xI(t){return Cb(t,"__ignore_ng_zone__")}function SI(t){return Cb(t,"__scheduler_tick__")}function Cb(t,n){return!Array.isArray(t)||t.length!==1?!1:t[0]?.data?.[n]===!0}var Zt=class{_console=console;handleError(n){this._console.error("ERROR",n)}},Fi=new b("",{factory:()=>{let t=u(A),n=u(ot),e;return i=>{t.runOutsideAngular(()=>{n.destroyed&&!e?setTimeout(()=>{throw i}):(e??=n.get(Zt),e.handleError(i))})}}}),wb={provide:lr,useValue:()=>{let t=u(Zt,{optional:!0})},multi:!0};function re(t,n){let[e,i,r]=mh(t,n?.equal),o=e,a=o[bt];return o.set=i,o.update=r,o.asReadonly=Eb.bind(o),o}function Eb(){let t=this[bt];if(t.readonlyFn===void 0){let n=()=>this();n[bt]=t,t.readonlyFn=n}return t.readonlyFn}var na=(()=>{class t{view;node;constructor(e,i){this.view=e,this.node=i}static __NG_ELEMENT_ID__=MI}return t})();function MI(){return new na(ee(),ht())}var Un=class{},ia=new b("",{factory:()=>!0});var ud=new b(""),fd=(()=>{class t{internalPendingTasks=u(hr);scheduler=u(Un);errorHandler=u(Fi);add(){let e=this.internalPendingTasks.add();return()=>{this.internalPendingTasks.has(e)&&(this.scheduler.notify(11),this.internalPendingTasks.remove(e))}}run(e){let i=this.add();e().catch(this.errorHandler).finally(i)}static \u0275prov=C({token:t,providedIn:"root",factory:()=>new t})}return t})(),hd=(()=>{class t{static \u0275prov=C({token:t,providedIn:"root",factory:()=>new $h})}return t})(),$h=class{dirtyEffectCount=0;queues=new Map;add(n){this.enqueue(n),this.schedule(n)}schedule(n){n.dirty&&this.dirtyEffectCount++}remove(n){let e=n.zone,i=this.queues.get(e);i.has(n)&&(i.delete(n),n.dirty&&this.dirtyEffectCount--)}enqueue(n){let e=n.zone;this.queues.has(e)||this.queues.set(e,new Set);let i=this.queues.get(e);i.has(n)||i.add(n)}flush(){for(;this.dirtyEffectCount>0;){let n=!1;for(let[e,i]of this.queues)e===null?n||=this.flushQueue(i):n||=e.run(()=>this.flushQueue(i));n||(this.dirtyEffectCount=0)}}flushQueue(n){let e=!1;for(let i of n)i.dirty&&(this.dirtyEffectCount--,e=!0,i.run());return e}},$c=class{[bt];constructor(n){this[bt]=n}destroy(){this[bt].destroy()}};function mr(t,n){let e=n?.injector??u(ne),i=n?.manualCleanup!==!0?e.get(Wn):null,r,o=e.get(na,null,{optional:!0}),a=e.get(Un);return o!==null?(r=TI(o.view,a,t),i instanceof zc&&i._lView===o.view&&(i=null)):r=AI(t,e.get(hd),a),r.injector=e,i!==null&&(r.onDestroyFns=[i.onDestroy(()=>r.destroy())]),new $c(r)}var xb=De(N({},gh),{cleanupFns:void 0,zone:null,onDestroyFns:null,run(){let t=us(!1);try{_h(this)}finally{us(t)}},cleanup(){if(!this.cleanupFns?.length)return;let t=K(null);try{for(;this.cleanupFns.length;)this.cleanupFns.pop()()}finally{this.cleanupFns=[],K(t)}}}),II=De(N({},xb),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12)},destroy(){if(er(this),this.onDestroyFns!==null)for(let t of this.onDestroyFns)t();this.cleanup(),this.scheduler.remove(this)}}),kI=De(N({},xb),{consumerMarkedDirty(){this.view[te]|=8192,no(this.view),this.notifier.notify(13)},destroy(){if(er(this),this.onDestroyFns!==null)for(let t of this.onDestroyFns)t();this.cleanup(),this.view[rr]?.delete(this)}});function TI(t,n,e){let i=Object.create(kI);return i.view=t,i.zone=typeof Zone<"u"?Zone.current:null,i.notifier=n,i.fn=Sb(i,e),t[rr]??=new Set,t[rr].add(i),i.consumerMarkedDirty(i),i}function AI(t,n,e){let i=Object.create(II);return i.fn=Sb(i,t),i.scheduler=n,i.notifier=e,i.zone=typeof Zone<"u"?Zone.current:null,i.scheduler.add(i),i.notifier.notify(12),i}function Sb(t,n){return()=>{n(e=>(t.cleanupFns??=[]).push(e))}}function Ls(t){return{toString:t}.toString()}function cD(t){let n=Dt.ng;if(n&&n.\u0275compilerFacade)return n.\u0275compilerFacade;throw new Error("JIT compiler unavailable")}function BI(t){return typeof t=="function"}function dD(t,n,e,i){n!==null?n.applyValueToInputSignal(n,i):t[e]=i}var wd=class{previousValue;currentValue;firstChange;constructor(n,e,i){this.previousValue=n,this.currentValue=e,this.firstChange=i}isFirstChange(){return this.firstChange}},Le=(()=>{let t=()=>uD;return t.ngInherit=!0,t})();function uD(t){return t.type.prototype.ngOnChanges&&(t.setInput=HI),jI}function jI(){let t=hD(this),n=t?.current;if(n){let e=t.previous;if(e===sr)t.previous=n;else for(let i in n)e[i]=n[i];t.current=null,this.ngOnChanges(n)}}function HI(t,n,e,i,r){let o=this.declaredInputs[i],a=hD(t)||zI(t,{previous:sr,current:null}),s=a.current||(a.current={}),l=a.previous,c=l[o];s[o]=new wd(c&&c.currentValue,e,l===sr),dD(t,n,r,e)}var fD="__ngSimpleChanges__";function hD(t){return t[fD]||null}function zI(t,n){return t[fD]=n}var Mb=[];var Oe=function(t,n=null,e){for(let i=0;i<Mb.length;i++){let r=Mb[i];r(t,n,e)}},Me=(function(t){return t[t.TemplateCreateStart=0]="TemplateCreateStart",t[t.TemplateCreateEnd=1]="TemplateCreateEnd",t[t.TemplateUpdateStart=2]="TemplateUpdateStart",t[t.TemplateUpdateEnd=3]="TemplateUpdateEnd",t[t.LifecycleHookStart=4]="LifecycleHookStart",t[t.LifecycleHookEnd=5]="LifecycleHookEnd",t[t.OutputStart=6]="OutputStart",t[t.OutputEnd=7]="OutputEnd",t[t.BootstrapApplicationStart=8]="BootstrapApplicationStart",t[t.BootstrapApplicationEnd=9]="BootstrapApplicationEnd",t[t.BootstrapComponentStart=10]="BootstrapComponentStart",t[t.BootstrapComponentEnd=11]="BootstrapComponentEnd",t[t.ChangeDetectionStart=12]="ChangeDetectionStart",t[t.ChangeDetectionEnd=13]="ChangeDetectionEnd",t[t.ChangeDetectionSyncStart=14]="ChangeDetectionSyncStart",t[t.ChangeDetectionSyncEnd=15]="ChangeDetectionSyncEnd",t[t.AfterRenderHooksStart=16]="AfterRenderHooksStart",t[t.AfterRenderHooksEnd=17]="AfterRenderHooksEnd",t[t.ComponentStart=18]="ComponentStart",t[t.ComponentEnd=19]="ComponentEnd",t[t.DeferBlockStateStart=20]="DeferBlockStateStart",t[t.DeferBlockStateEnd=21]="DeferBlockStateEnd",t[t.DynamicComponentStart=22]="DynamicComponentStart",t[t.DynamicComponentEnd=23]="DynamicComponentEnd",t[t.HostBindingsUpdateStart=24]="HostBindingsUpdateStart",t[t.HostBindingsUpdateEnd=25]="HostBindingsUpdateEnd",t})(Me||{});function UI(t,n,e){let{ngOnChanges:i,ngOnInit:r,ngDoCheck:o}=n.type.prototype;if(i){let a=uD(n);(e.preOrderHooks??=[]).push(t,a),(e.preOrderCheckHooks??=[]).push(t,a)}r&&(e.preOrderHooks??=[]).push(0-t,r),o&&((e.preOrderHooks??=[]).push(t,o),(e.preOrderCheckHooks??=[]).push(t,o))}function mD(t,n){for(let e=n.directiveStart,i=n.directiveEnd;e<i;e++){let o=t.data[e].type.prototype,{ngAfterContentInit:a,ngAfterContentChecked:s,ngAfterViewInit:l,ngAfterViewChecked:c,ngOnDestroy:d}=o;a&&(t.contentHooks??=[]).push(-e,a),s&&((t.contentHooks??=[]).push(e,s),(t.contentCheckHooks??=[]).push(e,s)),l&&(t.viewHooks??=[]).push(-e,l),c&&((t.viewHooks??=[]).push(e,c),(t.viewCheckHooks??=[]).push(e,c)),d!=null&&(t.destroyHooks??=[]).push(e,d)}}function vd(t,n,e){pD(t,n,3,e)}function yd(t,n,e,i){(t[te]&3)===e&&pD(t,n,e,i)}function Lm(t,n){let e=t[te];(e&3)===n&&(e&=16383,e+=1,t[te]=e)}function pD(t,n,e,i){let r=i!==void 0?t[Xr]&65535:0,o=i??-1,a=n.length-1,s=0;for(let l=r;l<a;l++)if(typeof n[l+1]=="number"){if(s=n[l],i!=null&&s>=i)break}else n[l]<0&&(t[Xr]+=65536),(s<o||o==-1)&&($I(t,e,n,l),t[Xr]=(t[Xr]&4294901760)+l+2),l++}function Ib(t,n){Oe(Me.LifecycleHookStart,t,n);let e=K(null);try{n.call(t)}finally{K(e),Oe(Me.LifecycleHookEnd,t,n)}}function $I(t,n,e,i){let r=e[i]<0,o=e[i+1],a=r?-e[i]:e[i],s=t[a];r?t[te]>>14<t[Xr]>>16&&(t[te]&3)===n&&(t[te]+=16384,Ib(s,o)):Ib(s,o)}var oa=-1,co=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(n,e,i,r){this.factory=n,this.name=r,this.canSeeViewProviders=e,this.injectImpl=i}};function GI(t){return(t.flags&8)!==0}function WI(t){return(t.flags&16)!==0}function qI(t,n,e){let i=0;for(;i<e.length;){let r=e[i];if(typeof r=="number"){if(r!==0)break;i++;let o=e[i++],a=e[i++],s=e[i++];t.setAttribute(n,a,s,o)}else{let o=r,a=e[++i];YI(o)?t.setProperty(n,o,a):t.setAttribute(n,o,a),i++}}return i}function gD(t){return t===3||t===4||t===6}function YI(t){return t.charCodeAt(0)===64}function aa(t,n){if(!(n===null||n.length===0))if(t===null||t.length===0)t=n.slice();else{let e=-1;for(let i=0;i<n.length;i++){let r=n[i];typeof r=="number"?e=r:e===0||(e===-1||e===2?kb(t,e,r,null,n[++i]):kb(t,e,r,null,null))}}return t}function kb(t,n,e,i,r){let o=0,a=t.length;if(n===-1)a=-1;else for(;o<t.length;){let s=t[o++];if(typeof s=="number"){if(s===n){a=-1;break}else if(s>n){a=o-1;break}}}for(;o<t.length;){let s=t[o];if(typeof s=="number")break;if(s===e){r!==null&&(t[o+1]=r);return}o++,r!==null&&o++}a!==-1&&(t.splice(a,0,n),o=a+1),t.splice(o++,0,e),r!==null&&t.splice(o++,0,r)}function _D(t){return t!==oa}function Ed(t){return t&32767}function KI(t){return t>>16}function xd(t,n){let e=KI(t),i=n;for(;e>0;)i=i[Zr],e--;return i}var Ym=!0;function Sd(t){let n=Ym;return Ym=t,n}var QI=256,vD=QI-1,yD=5,ZI=0,vi={};function XI(t,n,e){let i;typeof e=="string"?i=e.charCodeAt(0)||0:e.hasOwnProperty(Kr)&&(i=e[Kr]),i==null&&(i=e[Kr]=ZI++);let r=i&vD,o=1<<r;n.data[t+(r>>yD)]|=o}function Md(t,n){let e=bD(t,n);if(e!==-1)return e;let i=n[Q];i.firstCreatePass&&(t.injectorIndex=n.length,Vm(i.data,t),Vm(n,null),Vm(i.blueprint,null));let r=Tp(t,n),o=t.injectorIndex;if(_D(r)){let a=Ed(r),s=xd(r,n),l=s[Q].data;for(let c=0;c<8;c++)n[o+c]=s[a+c]|l[a+c]}return n[o+8]=r,o}function Vm(t,n){t.push(0,0,0,0,0,0,0,0,n)}function bD(t,n){return t.injectorIndex===-1||t.parent&&t.parent.injectorIndex===t.injectorIndex||n[t.injectorIndex+8]===null?-1:t.injectorIndex}function Tp(t,n){if(t.parent&&t.parent.injectorIndex!==-1)return t.parent.injectorIndex;let e=0,i=null,r=n;for(;r!==null;){if(i=xD(r),i===null)return oa;if(e++,r=r[Zr],i.injectorIndex!==-1)return i.injectorIndex|e<<16}return oa}function Km(t,n,e){XI(t,n,e)}function JI(t,n){if(n==="class")return t.classes;if(n==="style")return t.styles;let e=t.attrs;if(e){let i=e.length,r=0;for(;r<i;){let o=e[r];if(gD(o))break;if(o===0)r=r+2;else if(typeof o=="number")for(r++;r<i&&typeof e[r]=="string";)r++;else{if(o===n)return e[r+1];r=r+2}}}return null}function DD(t,n,e){if(e&8||t!==void 0)return t;Qc(n,"NodeInjector")}function CD(t,n,e,i){if(e&8&&i===void 0&&(i=null),(e&3)===0){let r=t[$t],o=zt(void 0);try{return r?r.get(n,i,e&8):Jh(n,i,e&8)}finally{zt(o)}}return DD(i,n,e)}function wD(t,n,e,i=0,r){if(t!==null){if(n[te]&2048&&!(i&2)){let a=ik(t,n,e,i,vi);if(a!==vi)return a}let o=ED(t,n,e,i,vi);if(o!==vi)return o}return CD(n,e,i,r)}function ED(t,n,e,i,r){let o=tk(e);if(typeof o=="function"){if(!Tm(n,t,i))return i&1?DD(r,e,i):CD(n,e,i,r);try{let a;if(a=o(i),a==null&&!(i&8))Qc(e);else return a}finally{Am()}}else if(typeof o=="number"){let a=null,s=bD(t,n),l=oa,c=i&1?n[Gt][Ut]:null;for((s===-1||i&4)&&(l=s===-1?Tp(t,n):n[s+8],l===oa||!Ab(i,!1)?s=-1:(a=n[Q],s=Ed(l),n=xd(l,n)));s!==-1;){let d=n[Q];if(Tb(o,s,d.data)){let f=ek(s,n,e,a,i,c);if(f!==vi)return f}l=n[s+8],l!==oa&&Ab(i,n[Q].data[s+8]===c)&&Tb(o,s,n)?(a=d,s=Ed(l),n=xd(l,n)):s=-1}}return r}function ek(t,n,e,i,r,o){let a=n[Q],s=a.data[t+8],l=i==null?Oi(s)&&Ym:i!=a&&(s.type&3)!==0,c=r&1&&o===s,d=bd(s,a,e,l,c);return d!==null?Is(n,a,d,s,r):vi}function bd(t,n,e,i,r){let o=t.providerIndexes,a=n.data,s=o&1048575,l=t.directiveStart,c=t.directiveEnd,d=o>>20,f=i?s:s+d,m=r?s+d:c;for(let h=f;h<m;h++){let _=a[h];if(h<l&&e===_||h>=l&&_.type===e)return h}if(r){let h=a[l];if(h&&gi(h)&&h.type===e)return l}return null}function Is(t,n,e,i,r){let o=t[e],a=n.data;if(o instanceof co){let s=o;if(s.resolving)throw Xh("");let l=Sd(s.canSeeViewProviders);s.resolving=!0;let c=a[e].type||a[e],d,f=s.injectImpl?zt(s.injectImpl):null,m=Tm(t,i,0);try{o=t[e]=s.factory(void 0,r,a,t,i),n.firstCreatePass&&e>=i.directiveStart&&UI(e,a[e],n)}finally{f!==null&&zt(f),Sd(l),s.resolving=!1,Am()}}return o}function tk(t){if(typeof t=="string")return t.charCodeAt(0)||0;let n=t.hasOwnProperty(Kr)?t[Kr]:void 0;return typeof n=="number"?n>=0?n&vD:nk:n}function Tb(t,n,e){let i=1<<t;return!!(e[n+(t>>yD)]&i)}function Ab(t,n){return!(t&2)&&!(t&1&&n)}var oo=class{_tNode;_lView;constructor(n,e){this._tNode=n,this._lView=e}get(n,e,i){return wD(this._tNode,this._lView,n,Wr(i),e)}};function nk(){return new oo(ht(),ee())}function Qn(t){return Ls(()=>{let n=t.prototype.constructor,e=n[cs]||Qm(n),i=Object.prototype,r=Object.getPrototypeOf(t.prototype).constructor;for(;r&&r!==i;){let o=r[cs]||Qm(r);if(o&&o!==e)return o;r=Object.getPrototypeOf(r)}return o=>new o})}function Qm(t){return Gh(t)?()=>{let n=Qm(kt(t));return n&&n()}:ir(t)}function ik(t,n,e,i,r){let o=t,a=n;for(;o!==null&&a!==null&&a[te]&2048&&!ea(a);){let s=ED(o,a,e,i|2,vi);if(s!==vi)return s;let l=o.parent;if(!l){let c=a[lm];if(c){let d=c.get(e,vi,i&-5);if(d!==vi)return d}l=xD(a),a=a[Zr]}o=l}return r}function xD(t){let n=t[Q],e=n.type;return e===2?n.declTNode:e===1?t[Ut]:null}function Ap(t){return JI(ht(),t)}function rk(){return fa(ht(),ee())}function fa(t,n){return new P(cn(t,n))}var P=(()=>{class t{nativeElement;constructor(e){this.nativeElement=e}static __NG_ELEMENT_ID__=rk}return t})();function SD(t){return t instanceof P?t.nativeElement:t}function ok(){return this._results[Symbol.iterator]()}var uo=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new M}constructor(n=!1){this._emitDistinctChangesOnly=n}get(n){return this._results[n]}map(n){return this._results.map(n)}filter(n){return this._results.filter(n)}find(n){return this._results.find(n)}reduce(n,e){return this._results.reduce(n,e)}forEach(n){this._results.forEach(n)}some(n){return this._results.some(n)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(n,e){this.dirty=!1;let i=$y(n);(this._changesDetected=!Uy(this._results,i,e))&&(this._results=i,this.length=i.length,this.last=i[this.length-1],this.first=i[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(n){this._onDirty=n}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=ok};function MD(t){return(t.flags&128)===128}var Rp=(function(t){return t[t.OnPush=0]="OnPush",t[t.Eager=1]="Eager",t[t.Default=1]="Default",t})(Rp||{}),ID=new Map,ak=0;function sk(){return ak++}function lk(t){ID.set(t[mi],t)}function Zm(t){ID.delete(t[mi])}var Rb="__ngContext__";function sa(t,n){Ni(n)?(t[Rb]=n[mi],lk(n)):t[Rb]=n}function kD(t){return AD(t[Jo])}function TD(t){return AD(t[Cn])}function AD(t){for(;t!==null&&!Gn(t);)t=t[Cn];return t}var ck;function Np(t){ck=t}var _r=new b("",{factory:()=>dk}),dk="ng";var jd=new b(""),ho=new b("",{providedIn:"platform",factory:()=>"unknown"}),vr=new b(""),mo=new b("",{factory:()=>u(W).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var RD="r";var ND="di";var OD=!1,FD=new b("",{factory:()=>OD});var Nb=new WeakMap;function uk(t,n){if(t==null||typeof t!="object")return;let e=Nb.get(t);e||(e=new WeakSet,Nb.set(t,e)),e.add(n)}var fk=(t,n,e,i)=>{};function hk(t,n,e,i){fk(t,n,e,i)}function Hd(t){return(t.flags&32)===32}var mk=()=>null;function PD(t,n,e=!1){return mk(t,n,e)}function LD(t,n){let e=t.contentQueries;if(e!==null){let i=K(null);try{for(let r=0;r<e.length;r+=2){let o=e[r],a=e[r+1];if(a!==-1){let s=t.data[a];Cs(o),s.contentQueries(2,n[a],a)}}}finally{K(i)}}}function Xm(t,n,e){Cs(0);let i=K(null);try{n(t,e)}finally{K(i)}}function VD(t,n,e){if(dm(n)){let i=K(null);try{let r=n.directiveStart,o=n.directiveEnd;for(let a=r;a<o;a++){let s=t.data[a];if(s.contentQueries){let l=e[a];s.contentQueries(1,l,a)}}}finally{K(i)}}}var Kn=(function(t){return t[t.Emulated=0]="Emulated",t[t.None=2]="None",t[t.ShadowDom=3]="ShadowDom",t[t.ExperimentalIsolatedShadowDom=4]="ExperimentalIsolatedShadowDom",t})(Kn||{});var md;function pk(){if(md===void 0&&(md=null,Dt.trustedTypes))try{md=Dt.trustedTypes.createPolicy("angular",{createHTML:t=>t,createScript:t=>t,createScriptURL:t=>t})}catch(t){}return md}function zd(t){return pk()?.createHTML(t)||t}var Pi=class{changingThisBreaksApplicationSecurity;constructor(n){this.changingThisBreaksApplicationSecurity=n}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Gc})`}},Jm=class extends Pi{getTypeName(){return"HTML"}},ep=class extends Pi{getTypeName(){return"Style"}},tp=class extends Pi{getTypeName(){return"Script"}},np=class extends Pi{getTypeName(){return"URL"}},ip=class extends Pi{getTypeName(){return"ResourceURL"}};function Li(t){return t instanceof Pi?t.changingThisBreaksApplicationSecurity:t}function po(t,n){let e=BD(t);if(e!=null&&e!==n){if(e==="ResourceURL"&&n==="URL")return!0;throw new Error(`Required a safe ${n}, got a ${e} (see ${Gc})`)}return e===n}function BD(t){return t instanceof Pi&&t.getTypeName()||null}function Op(t){return new Jm(t)}function Fp(t){return new ep(t)}function Pp(t){return new tp(t)}function Lp(t){return new np(t)}function Vp(t){return new ip(t)}function gk(t){let n=new op(t);return _k()?new rp(n):n}var rp=class{inertDocumentHelper;constructor(n){this.inertDocumentHelper=n}getInertBodyElement(n){n="<body><remove></remove>"+n;try{let e=new window.DOMParser().parseFromString(zd(n),"text/html").body;return e===null?this.inertDocumentHelper.getInertBodyElement(n):(e.firstChild?.remove(),e)}catch(e){return null}}},op=class{defaultDoc;inertDocument;constructor(n){this.defaultDoc=n,this.inertDocument=this.defaultDoc.implementation.createHTMLDocument("sanitization-inert")}getInertBodyElement(n){let e=this.inertDocument.createElement("template");return e.innerHTML=zd(n),e}};function _k(){try{return!!new window.DOMParser().parseFromString(zd(""),"text/html")}catch(t){return!1}}var vk=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function Ud(t){return t=String(t),t.match(vk)?t:"unsafe:"+t}function Vi(t){let n={};for(let e of t.split(","))n[e]=!0;return n}function Vs(...t){let n={};for(let e of t)for(let i in e)e.hasOwnProperty(i)&&(n[i]=!0);return n}var jD=Vi("area,br,col,hr,img,wbr"),HD=Vi("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),zD=Vi("rp,rt"),yk=Vs(zD,HD),bk=Vs(HD,Vi("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),Dk=Vs(zD,Vi("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),Ob=Vs(jD,bk,Dk,yk),UD=Vi("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),Ck=Vi("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"),wk=Vi("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"),Ek=Vs(UD,Ck,wk),xk=Vi("script,style,template");var ap=class{sanitizedSomething=!1;buf=[];sanitizeChildren(n){let e=n.firstChild,i=!0,r=[];for(;e;){if(e.nodeType===Node.ELEMENT_NODE?i=this.startElement(e):e.nodeType===Node.TEXT_NODE?this.chars(e.nodeValue):this.sanitizedSomething=!0,i&&e.firstChild){r.push(e),e=Ik(e);continue}for(;e;){e.nodeType===Node.ELEMENT_NODE&&this.endElement(e);let o=Mk(e);if(o){e=o;break}e=r.pop()}}return this.buf.join("")}startElement(n){let e=Fb(n).toLowerCase();if(!Ob.hasOwnProperty(e))return this.sanitizedSomething=!0,!xk.hasOwnProperty(e);this.buf.push("<"),this.buf.push(e);let i=n.attributes;for(let r=0;r<i.length;r++){let o=i.item(r),a=o.name,s=a.toLowerCase();if(!Ek.hasOwnProperty(s)){this.sanitizedSomething=!0;continue}let l=o.value;UD[s]&&(l=Ud(l)),this.buf.push(" ",a,'="',Pb(l),'"')}return this.buf.push(">"),!0}endElement(n){let e=Fb(n).toLowerCase();Ob.hasOwnProperty(e)&&!jD.hasOwnProperty(e)&&(this.buf.push("</"),this.buf.push(e),this.buf.push(">"))}chars(n){this.buf.push(Pb(n))}};function Sk(t,n){return(t.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_CONTAINED_BY)!==Node.DOCUMENT_POSITION_CONTAINED_BY}function Mk(t){let n=t.nextSibling;if(n&&t!==n.previousSibling)throw $D(n);return n}function Ik(t){let n=t.firstChild;if(n&&Sk(t,n))throw $D(n);return n}function Fb(t){let n=t.nodeName;return typeof n=="string"?n:"FORM"}function $D(t){return new Error(`Failed to sanitize html because the element is clobbered: ${t.outerHTML}`)}var kk=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,Tk=/([^\#-~ |!])/g;function Pb(t){return t.replace(/&/g,"&amp;").replace(kk,function(n){let e=n.charCodeAt(0),i=n.charCodeAt(1);return"&#"+((e-55296)*1024+(i-56320)+65536)+";"}).replace(Tk,function(n){return"&#"+n.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}var pd;function Bp(t,n){let e=null;try{pd=pd||gk(t);let i=n?String(n):"";e=pd.getInertBodyElement(i);let r=5,o=i;do{if(r===0)throw new Error("Failed to sanitize html because the input is unstable");r--,i=o,o=e.innerHTML,e=pd.getInertBodyElement(i)}while(i!==o);let s=new ap().sanitizeChildren(Lb(e)||e);return zd(s)}finally{if(e){let i=Lb(e)||e;for(;i.firstChild;)i.firstChild.remove()}}}function Lb(t){return"content"in t&&Ak(t)?t.content:null}function Ak(t){return t.nodeType===Node.ELEMENT_NODE&&t.nodeName==="TEMPLATE"}function Rk(t,n){return t.createText(n)}function Nk(t,n,e){t.setValue(n,e)}function GD(t,n,e){return t.createElement(n,e)}function Id(t,n,e,i,r){t.insertBefore(n,e,i,r)}function WD(t,n,e){t.appendChild(n,e)}function Vb(t,n,e,i,r){i!==null?Id(t,n,e,i,r):WD(t,n,e)}function qD(t,n,e,i){t.removeChild(null,n,e,i)}function Ok(t,n,e){t.setAttribute(n,"style",e)}function Fk(t,n,e){e===""?t.removeAttribute(n,"class"):t.setAttribute(n,"class",e)}function YD(t,n,e){let{mergedAttrs:i,classes:r,styles:o}=e;i!==null&&qI(t,n,i),r!==null&&Fk(t,n,r),o!==null&&Ok(t,n,o)}var Tt=(function(t){return t[t.NONE=0]="NONE",t[t.HTML=1]="HTML",t[t.STYLE=2]="STYLE",t[t.SCRIPT=3]="SCRIPT",t[t.URL=4]="URL",t[t.RESOURCE_URL=5]="RESOURCE_URL",t})(Tt||{});function Pk(t){return t instanceof Function?t():t}function Lk(t,n,e){let i=t.length;for(;;){let r=t.indexOf(n,e);if(r===-1)return r;if(r===0||t.charCodeAt(r-1)<=32){let o=n.length;if(r+o===i||t.charCodeAt(r+o)<=32)return r}e=r+1}}var KD="ng-template";function Vk(t,n,e,i){let r=0;if(i){for(;r<n.length&&typeof n[r]=="string";r+=2)if(n[r]==="class"&&Lk(n[r+1].toLowerCase(),e,0)!==-1)return!0}else if(jp(t))return!1;if(r=n.indexOf(1,r),r>-1){let o;for(;++r<n.length&&typeof(o=n[r])=="string";)if(o.toLowerCase()===e)return!0}return!1}function jp(t){return t.type===4&&t.value!==KD}function Bk(t,n,e){let i=t.type===4&&!e?KD:t.value;return n===i}function jk(t,n,e){let i=4,r=t.attrs,o=r!==null?Uk(r):0,a=!1;for(let s=0;s<n.length;s++){let l=n[s];if(typeof l=="number"){if(!a&&!qn(i)&&!qn(l))return!1;if(a&&qn(l))continue;a=!1,i=l|i&1;continue}if(!a)if(i&4){if(i=2|i&1,l!==""&&!Bk(t,l,e)||l===""&&n.length===1){if(qn(i))return!1;a=!0}}else if(i&8){if(r===null||!Vk(t,r,l,e)){if(qn(i))return!1;a=!0}}else{let c=n[++s],d=Hk(l,r,jp(t),e);if(d===-1){if(qn(i))return!1;a=!0;continue}if(c!==""){let f;if(d>o?f="":f=r[d+1].toLowerCase(),i&2&&c!==f){if(qn(i))return!1;a=!0}}}}return qn(i)||a}function qn(t){return(t&1)===0}function Hk(t,n,e,i){if(n===null)return-1;let r=0;if(i||!e){let o=!1;for(;r<n.length;){let a=n[r];if(a===t)return r;if(a===3||a===6)o=!0;else if(a===1||a===2){let s=n[++r];for(;typeof s=="string";)s=n[++r];continue}else{if(a===4)break;if(a===0){r+=4;continue}}r+=o?1:2}return-1}else return $k(n,t)}function QD(t,n,e=!1){for(let i=0;i<n.length;i++)if(jk(t,n[i],e))return!0;return!1}function zk(t){let n=t.attrs;if(n!=null){let e=n.indexOf(5);if((e&1)===0)return n[e+1]}return null}function Uk(t){for(let n=0;n<t.length;n++){let e=t[n];if(gD(e))return n}return t.length}function $k(t,n){let e=t.indexOf(4);if(e>-1)for(e++;e<t.length;){let i=t[e];if(typeof i=="number")return-1;if(i===n)return e;e++}return-1}function Gk(t,n){e:for(let e=0;e<n.length;e++){let i=n[e];if(t.length===i.length){for(let r=0;r<t.length;r++)if(t[r]!==i[r])continue e;return!0}}return!1}function Bb(t,n){return t?":not("+n.trim()+")":n}function Wk(t){let n=t[0],e=1,i=2,r="",o=!1;for(;e<t.length;){let a=t[e];if(typeof a=="string")if(i&2){let s=t[++e];r+="["+a+(s.length>0?'="'+s+'"':"")+"]"}else i&8?r+="."+a:i&4&&(r+=" "+a);else r!==""&&!qn(a)&&(n+=Bb(o,r),r=""),i=a,o=o||!qn(i);e++}return r!==""&&(n+=Bb(o,r)),n}function qk(t){return t.map(Wk).join(",")}function Yk(t){let n=[],e=[],i=1,r=2;for(;i<t.length;){let o=t[i];if(typeof o=="string")r===2?o!==""&&n.push(o,t[++i]):r===8&&e.push(o);else{if(!qn(r))break;r=o}i++}return e.length&&n.push(1,...e),n}var Xt={};function Hp(t,n,e,i,r,o,a,s,l,c,d){let f=tt+i,m=f+r,h=Kk(f,m),_=typeof c=="function"?c():c;return h[Q]={type:t,blueprint:h,template:e,queries:null,viewQuery:s,declTNode:n,data:h.slice().fill(null,f),bindingStartIndex:f,expandoStartIndex:m,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof o=="function"?o():o,pipeRegistry:typeof a=="function"?a():a,firstChild:null,schemas:l,consts:_,incompleteFirstPass:!1,ssrId:d}}function Kk(t,n){let e=[];for(let i=0;i<n;i++)e.push(i<t?null:Xt);return e}function Qk(t){let n=t.tView;return n===null||n.incompleteFirstPass?t.tView=Hp(1,null,t.template,t.decls,t.vars,t.directiveDefs,t.pipeDefs,t.viewQuery,t.schemas,t.consts,t.id):n}function zp(t,n,e,i,r,o,a,s,l,c,d){let f=n.blueprint.slice();return f[$n]=r,f[te]=i|4|128|8|64|1024,(c!==null||t&&t[te]&2048)&&(f[te]|=2048),pm(f),f[pt]=f[Zr]=t,f[st]=e,f[fi]=a||t&&t[fi],f[Ne]=s||t&&t[Ne],f[$t]=l||t&&t[$t]||null,f[Ut]=o,f[mi]=sk(),f[Qr]=d,f[lm]=c,f[Gt]=n.type==2?t[Gt]:f,f}function Zk(t,n,e){let i=cn(n,t),r=Qk(e),o=t[fi].rendererFactory,a=Up(t,zp(t,r,null,ZD(e),i,n,null,o.createRenderer(i,e),null,null,null));return t[n.index]=a}function ZD(t){let n=16;return t.signals?n=4096:t.onPush&&(n=64),n}function XD(t,n,e,i){if(e===0)return-1;let r=n.length;for(let o=0;o<e;o++)n.push(i),t.blueprint.push(i),t.data.push(null);return r}function Up(t,n){return t[Jo]?t[sm][Cn]=n:t[Jo]=n,t[sm]=n,n}function v(t=1){JD(Ye(),ee(),_i()+t,!1)}function JD(t,n,e,i){if(!i)if((n[te]&3)===3){let o=t.preOrderCheckHooks;o!==null&&vd(n,o,e)}else{let o=t.preOrderHooks;o!==null&&yd(n,o,0,e)}fr(e)}var $d=(function(t){return t[t.None=0]="None",t[t.SignalBased=1]="SignalBased",t[t.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",t})($d||{});function sp(t,n,e,i){let r=K(null);try{let[o,a,s]=t.inputs[e],l=null;(a&$d.SignalBased)!==0&&(l=n[o][bt]),l!==null&&l.transformFn!==void 0?i=l.transformFn(i):s!==null&&(i=s.call(n,i)),t.setInput!==null?t.setInput(n,l,i,e,o):dD(n,l,o,i)}finally{K(r)}}var yi=(function(t){return t[t.Important=1]="Important",t[t.DashCase=2]="DashCase",t})(yi||{}),Xk;function $p(t,n){return Xk(t,n)}var e0=new b("",{factory:()=>!1});var Jk=!1,Bs=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";function t0(t){return t[$t].get(e0,Jk)}function eT(t,n,e){let i=la.get(t);if(i){for(let r of n)i.classList.push(r);for(let r of e)i.cleanupFns.push(r)}else la.set(t,{classList:n,cleanupFns:e})}function Gp(t){let n=la.get(t);if(n){for(let e of n.cleanupFns)e();la.delete(t)}ao.delete(t)}var la=new WeakMap,ao=new WeakMap,ks=new WeakMap,xs=new WeakSet;function jb(t,n){let e=ks.get(t);if(e&&e.length>0){let i=e.findIndex(r=>r===n);i>-1&&e.splice(i,1)}e?.length===0&&ks.delete(t)}function tT(t,n){let e=ks.get(t);if(!e||e.length===0)return;let i=n.parentNode,r=n.previousSibling;for(let o=e.length-1;o>=0;o--){let a=e[o],s=a.parentNode;a===n?(e.splice(o,1),xs.add(a),a.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}}))):(r&&a===r||s&&i&&s!==i)&&(e.splice(o,1),a.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}})),a.parentNode?.removeChild(a))}}function n0(t,n){let e=ks.get(t);e?e.includes(n)||e.push(n):ks.set(t,[n])}function Hb(t){let n=t[pi]??={};return n.enter??=new Map}function Gd(t){let n=t[pi]??={};return n.leave??=new Map}function i0(t){let n=typeof t=="function"?t():t,e=Array.isArray(n)?n:null;return typeof n=="string"&&(e=n.trim().split(/\s+/).filter(i=>i)),e}function nT(t,n){if(!Bs)return;let e=la.get(t);if(e&&e.classList.length>0&&iT(t,e.classList))for(let i of e.classList)n.removeClass(t,i);Gp(t)}function iT(t,n){for(let e of n)if(t.classList.contains(e))return!0;return!1}function Ts(t){return t.composedPath?t.composedPath()[0]:t.target}function Wp(t,n){let e=ao.get(n);return e===void 0?!0:n===Ts(t)&&(e.animationName!==void 0&&t.animationName===e.animationName||e.propertyName!==void 0&&(e.propertyName==="all"||t.propertyName===e.propertyName))}function r0(t,n,e){let i=t.get(n.index)??{animateFns:[]};i.animateFns.push(e),t.set(n.index,i)}function zb(t,n){if(t)for(let e of t)e();for(let e of n)e()}function Ub(t,n){let e=Gd(t).get(n.index);e&&(e.resolvers=void 0)}function kd(t){if(!t)return 0;let n=t.toLowerCase().indexOf("ms")>-1?1:1e3;return parseFloat(t)*n}function ro(t,n){return t.getPropertyValue(n).split(",").map(i=>i.trim())}function rT(t){let n=ro(t,"transition-property"),e=ro(t,"transition-duration"),i=ro(t,"transition-delay"),r={propertyName:"",duration:0,animationName:void 0};for(let o=0;o<n.length;o++){let a=kd(i[o])+kd(e[o]);a>r.duration&&(r.propertyName=n[o],r.duration=a)}return r}function oT(t){let n=ro(t,"animation-name"),e=ro(t,"animation-delay"),i=ro(t,"animation-duration"),r=ro(t,"animation-iteration-count"),o={animationName:"",propertyName:void 0,duration:0};for(let a=0;a<n.length;a++){let s=kd(e[a])+kd(i[a]),l=r[a];s>o.duration&&l!=="infinite"&&(o.animationName=n[a],o.duration=s)}return o}function o0(t,n){return t!==void 0&&t.duration>n.duration}function a0(t){return(t.animationName!=null||t.propertyName!=null)&&t.duration>0}function aT(t,n){let e=getComputedStyle(t),i=oT(e),r=rT(e),o=i.duration>r.duration?i:r;o0(n.get(t),o)||a0(o)&&n.set(t,o)}function s0(t,n,e){if(!e)return;let i=t.getAnimations();return i.length===0?aT(t,n):sT(t,n,i)}function sT(t,n,e){let i={animationName:void 0,propertyName:void 0,duration:0};for(let r of e){let o=r.effect?.getTiming();if(o?.iterations===1/0)continue;let a=typeof o?.duration=="number"?o.duration:0,s=(o?.delay??0)+a,l=r.playbackRate;l!==void 0&&l!==0&&l!==1&&(s/=Math.abs(l));let c,d;r.animationName?d=r.animationName:c=r.transitionProperty,s>=i.duration&&(i={animationName:d,propertyName:c,duration:s})}o0(n.get(t),i)||a0(i)&&n.set(t,i)}var pr=new Set,Wd=(function(t){return t[t.CHANGE_DETECTION=0]="CHANGE_DETECTION",t[t.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",t})(Wd||{}),Zn=new b(""),$b=new Set;function Xn(t){$b.has(t)||($b.add(t),performance?.mark?.("mark_feature_usage",{detail:{feature:t}}))}var qd=(()=>{class t{impl=null;execute(){this.impl?.execute()}static \u0275prov=C({token:t,providedIn:"root",factory:()=>new t})}return t})(),qp=[0,1,2,3],Yp=(()=>{class t{ngZone=u(A);scheduler=u(Un);errorHandler=u(Zt,{optional:!0});sequences=new Set;deferredRegistrations=new Set;executing=!1;constructor(){u(Zn,{optional:!0})}execute(){let e=this.sequences.size>0;e&&Oe(Me.AfterRenderHooksStart),this.executing=!0;for(let i of qp)for(let r of this.sequences)if(!(r.erroredOrDestroyed||!r.hooks[i]))try{r.pipelinedValue=this.ngZone.runOutsideAngular(()=>this.maybeTrace(()=>{let o=r.hooks[i];return o(r.pipelinedValue)},r.snapshot))}catch(o){r.erroredOrDestroyed=!0,this.errorHandler?.handleError(o)}this.executing=!1;for(let i of this.sequences)i.afterRun(),i.once&&(this.sequences.delete(i),i.destroy());for(let i of this.deferredRegistrations)this.sequences.add(i);this.deferredRegistrations.size>0&&this.scheduler.notify(7),this.deferredRegistrations.clear(),e&&Oe(Me.AfterRenderHooksEnd)}register(e){let{view:i}=e;i!==void 0?((i[Jr]??=[]).push(e),no(i),i[te]|=8192):this.executing?this.deferredRegistrations.add(e):this.addSequence(e)}addSequence(e){this.sequences.add(e),this.scheduler.notify(7)}unregister(e){this.executing&&this.sequences.has(e)?(e.erroredOrDestroyed=!0,e.pipelinedValue=void 0,e.once=!0):(this.sequences.delete(e),this.deferredRegistrations.delete(e))}maybeTrace(e,i){return i?i.run(Wd.AFTER_NEXT_RENDER,e):e()}static \u0275prov=C({token:t,providedIn:"root",factory:()=>new t})}return t})(),As=class{impl;hooks;view;once;snapshot;erroredOrDestroyed=!1;pipelinedValue=void 0;unregisterOnDestroy;constructor(n,e,i,r,o,a=null){this.impl=n,this.hooks=e,this.view=i,this.once=r,this.snapshot=a,this.unregisterOnDestroy=o?.onDestroy(()=>this.destroy())}afterRun(){this.erroredOrDestroyed=!1,this.pipelinedValue=void 0,this.snapshot?.dispose(),this.snapshot=null}destroy(){this.impl.unregister(this),this.unregisterOnDestroy?.();let n=this.view?.[Jr];n&&(this.view[Jr]=n.filter(e=>e!==this))}};function At(t,n){let e=n?.injector??u(ne);return Xn("NgAfterNextRender"),cT(t,e,n,!0)}function lT(t){return t instanceof Function?[void 0,void 0,t,void 0]:[t.earlyRead,t.write,t.mixedReadWrite,t.read]}function cT(t,n,e,i){let r=n.get(qd);r.impl??=n.get(Yp);let o=n.get(Zn,null,{optional:!0}),a=e?.manualCleanup!==!0?n.get(Wn):null,s=n.get(na,null,{optional:!0}),l=new As(r.impl,lT(t),s?.view,i,a,o?.snapshot(null));return r.impl.register(l),l}var Yd=new b("",{factory:()=>({queue:new Set,isScheduled:!1,scheduler:null,injector:u(ot)})});function l0(t,n,e){let i=t.get(Yd);if(Array.isArray(n))for(let r of n)i.queue.add(r),e?.detachedLeaveAnimationFns?.push(r);else i.queue.add(n),e?.detachedLeaveAnimationFns?.push(n);i.scheduler&&i.scheduler(t)}function dT(t,n){let e=t.get(Yd);if(n.detachedLeaveAnimationFns){for(let i of n.detachedLeaveAnimationFns)e.queue.delete(i);n.detachedLeaveAnimationFns=void 0}}function uT(t){let n=t.get(Yd);n.isScheduled||(At(()=>{n.isScheduled=!1;for(let e of n.queue)e();n.queue.clear()},{injector:n.injector}),n.isScheduled=!0)}function c0(t){let n=t.get(Yd);n.scheduler=uT,n.scheduler(t)}function d0(t,n){for(let[e,i]of n)l0(t,i.animateFns)}function Gb(t,n,e,i){let r=t?.[pi]?.enter;n!==null&&r&&r.has(e.index)&&d0(i,r)}function ra(t,n,e,i,r,o,a,s){if(r!=null){let l,c=!1;Gn(r)?l=r:Ni(r)&&(c=!0,r=r[$n]);let d=wn(r);t===0&&i!==null?(Gb(s,i,o,e),a==null?WD(n,i,d):Id(n,i,d,a||null,!0)):t===1&&i!==null?(Gb(s,i,o,e),Id(n,i,d,a||null,!0),tT(o,d)):t===2?(s?.[pi]?.leave?.has(o.index)&&n0(o,d),xs.delete(d),Wb(s,o,e,f=>{if(xs.has(d)){xs.delete(d);return}qD(n,d,c,f)})):t===3&&(xs.delete(d),Wb(s,o,e,()=>{n.destroyNode(d)})),l!=null&&CT(n,t,e,l,o,i,a)}}function fT(t,n){u0(t,n),n[$n]=null,n[Ut]=null}function hT(t,n,e,i,r,o){i[$n]=r,i[Ut]=n,Qd(t,i,e,1,r,o)}function u0(t,n){n[fi].changeDetectionScheduler?.notify(9),Qd(t,n,n[Ne],2,null,null)}function mT(t){let n=t[Jo];if(!n)return Bm(t[Q],t);for(;n;){let e=null;if(Ni(n))e=n[Jo];else{let i=n[it];i&&(e=i)}if(!e){for(;n&&!n[Cn]&&n!==t;)Ni(n)&&Bm(n[Q],n),n=n[pt];n===null&&(n=t),Ni(n)&&Bm(n[Q],n),e=n&&n[Cn]}n=e}}function Kp(t,n){let e=t[eo],i=e.indexOf(n);e.splice(i,1)}function Kd(t,n){if(to(n))return;let e=n[Ne];e.destroyNode&&Qd(t,n,e,3,null,null),mT(n)}function Bm(t,n){if(to(n))return;let e=K(null);try{n[te]&=-129,n[te]|=256,n[ln]&&er(n[ln]),_T(t,n),gT(t,n),n[Q].type===1&&n[Ne].destroy();let i=n[cr];if(i!==null&&Gn(n[pt])){i!==n[pt]&&Kp(i,n);let r=n[hi];r!==null&&r.detachView(t)}Zm(n)}finally{K(e)}}function Wb(t,n,e,i){let r=t?.[pi];if(r==null||r.leave==null||!r.leave.has(n.index))return i(!1);t&&pr.add(t[mi]),l0(e,()=>{if(r.leave&&r.leave.has(n.index)){let a=r.leave.get(n.index),s=[];if(a){for(let l=0;l<a.animateFns.length;l++){let c=a.animateFns[l],{promise:d}=c();s.push(d)}r.detachedLeaveAnimationFns=void 0}r.running=Promise.allSettled(s),pT(t,i)}else t&&pr.delete(t[mi]),i(!1)},r)}function pT(t,n){let e=t[pi]?.running;if(e){e.then(()=>{t[pi].running=void 0,pr.delete(t[mi]),n(!0)});return}n(!1)}function gT(t,n){let e=t.cleanup,i=n[Xo];if(e!==null)for(let a=0;a<e.length-1;a+=2)if(typeof e[a]=="string"){let s=e[a+3];s>=0?i[s]():i[-s].unsubscribe(),a+=2}else{let s=i[e[a+1]];e[a].call(s)}i!==null&&(n[Xo]=null);let r=n[Ri];if(r!==null){n[Ri]=null;for(let a=0;a<r.length;a++){let s=r[a];s()}}let o=n[rr];if(o!==null){n[rr]=null;for(let a of o)a.destroy()}}function _T(t,n){let e;if(t!=null&&(e=t.destroyHooks)!=null)for(let i=0;i<e.length;i+=2){let r=n[e[i]];if(!(r instanceof co)){let o=e[i+1];if(Array.isArray(o))for(let a=0;a<o.length;a+=2){let s=r[o[a]],l=o[a+1];Oe(Me.LifecycleHookStart,s,l);try{l.call(s)}finally{Oe(Me.LifecycleHookEnd,s,l)}}else{Oe(Me.LifecycleHookStart,r,o);try{o.call(r)}finally{Oe(Me.LifecycleHookEnd,r,o)}}}}}function f0(t,n,e){return vT(t,n.parent,e)}function vT(t,n,e){let i=n;for(;i!==null&&i.type&168;)n=i,i=n.parent;if(i===null)return e[$n];if(Oi(i)){let{encapsulation:r}=t.data[i.directiveStart+i.componentOffset];if(r===Kn.None||r===Kn.Emulated)return null}return cn(i,e)}function h0(t,n,e){return bT(t,n,e)}function yT(t,n,e){return t.type&40?cn(t,e):null}var bT=yT,qb;function Qp(t,n,e,i){let r=f0(t,i,n),o=n[Ne],a=i.parent||n[Ut],s=h0(a,i,n);if(r!=null)if(Array.isArray(e))for(let l=0;l<e.length;l++)Vb(o,r,e[l],s,!1);else Vb(o,r,e,s,!1);qb!==void 0&&qb(o,i,n,e,r)}function Ss(t,n){if(n!==null){let e=n.type;if(e&3)return cn(n,t);if(e&4)return lp(-1,t[n.index]);if(e&8){let i=n.child;if(i!==null)return Ss(t,i);{let r=t[n.index];return Gn(r)?lp(-1,r):wn(r)}}else{if(e&128)return Ss(t,n.next);if(e&32)return $p(n,t)()||wn(t[n.index]);{let i=m0(t,n);if(i!==null){if(Array.isArray(i))return i[0];let r=or(t[Gt]);return Ss(r,i)}else return Ss(t,n.next)}}}return null}function m0(t,n){if(n!==null){let i=t[Gt][Ut],r=n.projection;return i.projection[r]}return null}function lp(t,n){let e=it+t+1;if(e<n.length){let i=n[e],r=i[Q].firstChild;if(r!==null)return Ss(i,r)}return n[dr]}function Zp(t,n,e,i,r,o,a){for(;e!=null;){let s=i[$t];if(e.type===128){e=e.next;continue}let l=i[e.index],c=e.type;if(a&&n===0&&(l&&sa(wn(l),i),e.flags|=2),!Hd(e))if(c&8)Zp(t,n,e.child,i,r,o,!1),ra(n,t,s,r,l,e,o,i);else if(c&32){let d=$p(e,i),f;for(;f=d();)ra(n,t,s,r,f,e,o,i);ra(n,t,s,r,l,e,o,i)}else c&16?p0(t,n,i,e,r,o):ra(n,t,s,r,l,e,o,i);e=a?e.projectionNext:e.next}}function Qd(t,n,e,i,r,o){Zp(e,i,t.firstChild,n,r,o,!1)}function DT(t,n,e){let i=n[Ne],r=f0(t,e,n),o=e.parent||n[Ut],a=h0(o,e,n);p0(i,0,n,e,r,a)}function p0(t,n,e,i,r,o){let a=e[Gt],l=a[Ut].projection[i.projection];if(Array.isArray(l))for(let c=0;c<l.length;c++){let d=l[c];ra(n,t,e[$t],r,d,i,o,e)}else{let c=l,d=a[pt];MD(i)&&(c.flags|=128),Zp(t,n,c,d,r,o,!0)}}function CT(t,n,e,i,r,o,a){let s=i[dr],l=wn(i);s!==l&&ra(n,t,e,o,s,r,a);for(let c=it;c<i.length;c++){let d=i[c];Qd(d[Q],d,t,n,o,s)}}function wT(t,n,e,i,r){if(n)r?t.addClass(e,i):t.removeClass(e,i);else{let o=i.indexOf("-")===-1?void 0:yi.DashCase;r==null?t.removeStyle(e,i,o):(typeof r=="string"&&r.endsWith("!important")&&(r=r.slice(0,-10),o|=yi.Important),t.setStyle(e,i,r,o))}}function g0(t,n,e,i,r){let o=_i(),a=i&2;try{fr(-1),a&&n.length>tt&&JD(t,n,tt,!1);let s=a?Me.TemplateUpdateStart:Me.TemplateCreateStart;Oe(s,r,e),e(i,r)}finally{fr(o);let s=a?Me.TemplateUpdateEnd:Me.TemplateCreateEnd;Oe(s,r,e)}}function Xp(t,n,e){kT(t,n,e),(e.flags&64)===64&&TT(t,n,e)}function Zd(t,n,e=cn){let i=n.localNames;if(i!==null){let r=n.index+1;for(let o=0;o<i.length;o+=2){let a=i[o+1],s=a===-1?e(n,t):t[a];t[r++]=s}}}function ET(t,n,e,i){let o=i.get(FD,OD)||e===Kn.ShadowDom||e===Kn.ExperimentalIsolatedShadowDom,a=t.selectRootElement(n,o);return xT(a),a}function xT(t){ST(t)}var ST=()=>null;function MT(t){return t==="class"?"className":t==="for"?"htmlFor":t==="formaction"?"formAction":t==="innerHtml"?"innerHTML":t==="readonly"?"readOnly":t==="tabindex"?"tabIndex":t}function _0(t,n,e,i,r,o){let a=n[Q];if(Jp(t,a,n,e,i)){Oi(t)&&IT(n,t.index);return}t.type&3&&(e=MT(e)),v0(t,n,e,i,r,o)}function v0(t,n,e,i,r,o){if(t.type&3){let a=cn(t,n);i=o!=null?o(i,t.value||"",e):i,r.setProperty(a,e,i)}else t.type&12}function IT(t,n){let e=En(n,t);e[te]&16||(e[te]|=64)}function kT(t,n,e){let i=e.directiveStart,r=e.directiveEnd;Oi(e)&&Zk(n,e,t.data[i+e.componentOffset]),t.firstCreatePass||Md(e,n);let o=e.initialInputs;for(let a=i;a<r;a++){let s=t.data[a],l=Is(n,t,a,e);if(sa(l,n),o!==null&&OT(n,a-i,l,s,e,o),gi(s)){let c=En(e.index,n);c[st]=Is(n,t,a,e)}}}function TT(t,n,e){let i=e.directiveStart,r=e.directiveEnd,o=e.index,a=fb();try{fr(o);for(let s=i;s<r;s++){let l=t.data[s],c=n[s];od(s),(l.hostBindings!==null||l.hostVars!==0||l.hostAttrs!==null)&&AT(l,c)}}finally{fr(-1),od(a)}}function AT(t,n){t.hostBindings!==null&&t.hostBindings(1,n)}function y0(t,n){let e=t.directiveRegistry,i=null;if(e)for(let r=0;r<e.length;r++){let o=e[r];QD(n,o.selectors,!1)&&(i??=[],gi(o)?i.unshift(o):i.push(o))}return i}function RT(t,n,e,i,r,o){let a=cn(t,n);NT(n[Ne],a,o,t.value,e,i,r)}function NT(t,n,e,i,r,o,a){if(o==null)t.removeAttribute(n,r,e);else{let s=a==null?ps(o):a(o,i||"",r);t.setAttribute(n,r,s,e)}}function OT(t,n,e,i,r,o){let a=o[n];if(a!==null)for(let s=0;s<a.length;s+=2){let l=a[s],c=a[s+1];sp(i,e,l,c)}}function b0(t,n,e,i,r){let o=tt+e,a=n[Q],s=r(a,n,t,i,e);n[o]=s,ta(t,!0);let l=t.type===2;return l?(YD(n[Ne],s,t),(rb()===0||bs(t))&&sa(s,n),ob()):sa(s,n),cd()&&(!l||!Hd(t))&&Qp(a,n,s,t),t}function D0(t){let n=t;return Sm()?Mm():(n=n.parent,ta(n,!1)),n}function FT(t,n){let e=t[$t];if(!e)return;let i;try{i=e.get(Fi,null)}catch(r){i=null}i?.(n)}function Jp(t,n,e,i,r){let o=t.inputs?.[i],a=t.hostDirectiveInputs?.[i],s=!1;if(a)for(let l=0;l<a.length;l+=2){let c=a[l],d=a[l+1],f=n.data[c];sp(f,e[c],d,r),s=!0}if(o)for(let l of o){let c=e[l],d=n.data[l];sp(d,c,i,r),s=!0}return s}function PT(t,n){let e=En(n,t),i=e[Q];LT(i,e);let r=e[$n];r!==null&&e[Qr]===null&&(e[Qr]=PD(r,e[$t])),Oe(Me.ComponentStart);try{eg(i,e,e[st])}finally{Oe(Me.ComponentEnd,e[st])}}function LT(t,n){for(let e=n.length;e<t.blueprint.length;e++)n.push(t.blueprint[e])}function eg(t,n,e){sd(n);try{let i=t.viewQuery;i!==null&&Xm(1,i,e);let r=t.template;r!==null&&g0(t,n,r,1,e),t.firstCreatePass&&(t.firstCreatePass=!1),n[hi]?.finishViewCreation(t),t.staticContentQueries&&LD(t,n),t.staticViewQueries&&Xm(2,t.viewQuery,e);let o=t.components;o!==null&&VT(n,o)}catch(i){throw t.firstCreatePass&&(t.incompleteFirstPass=!0,t.firstCreatePass=!1),i}finally{n[te]&=-5,ld()}}function VT(t,n){for(let e=0;e<n.length;e++)PT(t,n[e])}function js(t,n,e,i){let r=K(null);try{let o=n.tView,s=t[te]&4096?4096:16,l=zp(t,o,e,s,null,n,null,null,i?.injector??null,i?.embeddedViewInjector??null,i?.dehydratedView??null),c=t[n.index];l[cr]=c;let d=t[hi];return d!==null&&(l[hi]=d.createEmbeddedView(o)),eg(o,l,e),l}finally{K(r)}}function ca(t,n){return!n||n.firstChild===null||MD(t)}function Rs(t,n,e,i,r=!1){for(;e!==null;){if(e.type===128){e=r?e.projectionNext:e.next;continue}let o=n[e.index];o!==null&&i.push(wn(o)),Gn(o)&&C0(o,i);let a=e.type;if(a&8)Rs(t,n,e.child,i);else if(a&32){let s=$p(e,n),l;for(;l=s();)i.push(l)}else if(a&16){let s=m0(n,e);if(Array.isArray(s))i.push(...s);else{let l=or(n[Gt]);Rs(l[Q],l,s,i,!0)}}e=r?e.projectionNext:e.next}return i}function C0(t,n){for(let e=it;e<t.length;e++){let i=t[e],r=i[Q].firstChild;r!==null&&Rs(i[Q],i,r,n)}t[dr]!==t[$n]&&n.push(t[dr])}function w0(t){if(t[Jr]!==null){for(let n of t[Jr])n.impl.addSequence(n);t[Jr].length=0}}var E0=[];function BT(t){return t[ln]??jT(t)}function jT(t){let n=E0.pop()??Object.create(zT);return n.lView=t,n}function HT(t){t.lView[ln]!==t&&(t.lView=null,E0.push(t))}var zT=De(N({},Fr),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:t=>{no(t.lView)},consumerOnSignalRead(){this.lView[ln]=this}});function UT(t){let n=t[ln]??Object.create($T);return n.lView=t,n}var $T=De(N({},Fr),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:t=>{let n=or(t.lView);for(;n&&!x0(n[Q]);)n=or(n);n&&gm(n)},consumerOnSignalRead(){this.lView[ln]=this}});function x0(t){return t.type!==2}function S0(t){if(t[rr]===null)return;let n=!0;for(;n;){let e=!1;for(let i of t[rr])i.dirty&&(e=!0,i.zone===null||Zone.current===i.zone?i.run():i.zone.run(()=>i.run()));n=e&&!!(t[te]&8192)}}var GT=100;function M0(t,n=0){let i=t[fi].rendererFactory,r=!1;r||i.begin?.();try{WT(t,n)}finally{r||i.end?.()}}function WT(t,n){let e=Im();try{us(!0),cp(t,n);let i=0;for(;Ds(t);){if(i===GT)throw new w(103,!1);i++,cp(t,1)}}finally{us(e)}}function qT(t,n,e,i){if(to(n))return;let r=n[te],o=!1,a=!1;sd(n);let s=!0,l=null,c=null;o||(x0(t)?(c=BT(n),l=Ji(c)):Jl()===null?(s=!1,c=UT(n),l=Ji(c)):n[ln]&&(er(n[ln]),n[ln]=null));try{pm(n),cb(t.bindingStartIndex),e!==null&&g0(t,n,e,2,i);let d=(r&3)===3;if(!o)if(d){let h=t.preOrderCheckHooks;h!==null&&vd(n,h,null)}else{let h=t.preOrderHooks;h!==null&&yd(n,h,0,null),Lm(n,0)}if(a||YT(n),S0(n),I0(n,0),t.contentQueries!==null&&LD(t,n),!o)if(d){let h=t.contentCheckHooks;h!==null&&vd(n,h)}else{let h=t.contentHooks;h!==null&&yd(n,h,1),Lm(n,1)}QT(t,n);let f=t.components;f!==null&&T0(n,f,0);let m=t.viewQuery;if(m!==null&&Xm(2,m,i),!o)if(d){let h=t.viewCheckHooks;h!==null&&vd(n,h)}else{let h=t.viewHooks;h!==null&&yd(n,h,2),Lm(n,2)}if(t.firstUpdatePass===!0&&(t.firstUpdatePass=!1),n[ed]){for(let h of n[ed])h();n[ed]=null}o||(w0(n),n[te]&=-73)}catch(d){throw o||no(n),d}finally{c!==null&&(Pr(c,l),s&&HT(c)),ld()}}function I0(t,n){for(let e=kD(t);e!==null;e=TD(e))for(let i=it;i<e.length;i++){let r=e[i];k0(r,n)}}function YT(t){for(let n=kD(t);n!==null;n=TD(n)){if(!(n[te]&2))continue;let e=n[eo];for(let i=0;i<e.length;i++){let r=e[i];gm(r)}}}function KT(t,n,e){Oe(Me.ComponentStart);let i=En(n,t);try{k0(i,e)}finally{Oe(Me.ComponentEnd,i[st])}}function k0(t,n){nd(t)&&cp(t,n)}function cp(t,n){let i=t[Q],r=t[te],o=t[ln],a=!!(n===0&&r&16);if(a||=!!(r&64&&n===0),a||=!!(r&1024),a||=!!(o?.dirty&&jo(o)),a||=!1,o&&(o.dirty=!1),t[te]&=-9217,a)qT(i,t,i.template,t[st]);else if(r&8192){let s=K(null);try{S0(t),I0(t,1);let l=i.components;l!==null&&T0(t,l,1),w0(t)}finally{K(s)}}}function T0(t,n,e){for(let i=0;i<n.length;i++)KT(t,n[i],e)}function QT(t,n){let e=t.hostBindingOpCodes;if(e!==null)try{for(let i=0;i<e.length;i++){let r=e[i];if(r<0)fr(~r);else{let o=r,a=e[++i],s=e[++i];ub(a,o);let l=n[o];Oe(Me.HostBindingsUpdateStart,l);try{s(2,l)}finally{Oe(Me.HostBindingsUpdateEnd,l)}}}}finally{fr(-1)}}function tg(t,n){let e=Im()?64:1088;for(t[fi].changeDetectionScheduler?.notify(n);t;){t[te]|=e;let i=or(t);if(ea(t)&&!i)return t;t=i}return null}function A0(t,n,e,i){return[t,!0,0,n,null,i,null,e,null,null]}function R0(t,n){let e=it+n;if(e<t.length)return t[e]}function Hs(t,n,e,i=!0){let r=n[Q];if(ZT(r,n,t,e),i){let a=lp(e,t),s=n[Ne],l=s.parentNode(t[dr]);l!==null&&hT(r,t[Ut],s,n,l,a)}let o=n[Qr];o!==null&&o.firstChild!==null&&(o.firstChild=null)}function N0(t,n){let e=Ns(t,n);return e!==void 0&&Kd(e[Q],e),e}function Ns(t,n){if(t.length<=it)return;let e=it+n,i=t[e];if(i){let r=i[cr];r!==null&&r!==t&&Kp(r,i),n>0&&(t[e-1][Cn]=i[Cn]);let o=gs(t,it+n);fT(i[Q],i);let a=o[hi];a!==null&&a.detachView(o[Q]),i[pt]=null,i[Cn]=null,i[te]&=-129}return i}function ZT(t,n,e,i){let r=it+i,o=e.length;i>0&&(e[r-1][Cn]=n),i<o-it?(n[Cn]=e[r],em(e,it+i,n)):(e.push(n),n[Cn]=null),n[pt]=e;let a=n[cr];a!==null&&e!==a&&O0(a,n);let s=n[hi];s!==null&&s.insertView(t),id(n),n[te]|=128}function O0(t,n){let e=t[eo],i=n[pt];if(Ni(i))t[te]|=2;else{let r=i[pt][Gt];n[Gt]!==r&&(t[te]|=2)}e===null?t[eo]=[n]:e.push(n)}var gr=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let n=this._lView,e=n[Q];return Rs(e,n,e.firstChild,[])}constructor(n,e){this._lView=n,this._cdRefInjectingView=e}get context(){return this._lView[st]}set context(n){this._lView[st]=n}get destroyed(){return to(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let n=this._lView[pt];if(Gn(n)){let e=n[ys],i=e?e.indexOf(this):-1;i>-1&&(Ns(n,i),gs(e,i))}this._attachedToViewContainer=!1}Kd(this._lView[Q],this._lView)}onDestroy(n){_m(this._lView,n)}markForCheck(){tg(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[te]&=-129}reattach(){id(this._lView),this._lView[te]|=128}detectChanges(){this._lView[te]|=1024,M0(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new w(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let n=ea(this._lView),e=this._lView[cr];e!==null&&!n&&Kp(e,this._lView),u0(this._lView[Q],this._lView)}attachToAppRef(n){if(this._attachedToViewContainer)throw new w(902,!1);this._appRef=n;let e=ea(this._lView),i=this._lView[cr];i!==null&&!e&&O0(i,this._lView),id(this._lView)}};var un=(()=>{class t{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=XT;constructor(e,i,r){this._declarationLView=e,this._declarationTContainer=i,this.elementRef=r}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(e,i){return this.createEmbeddedViewImpl(e,i)}createEmbeddedViewImpl(e,i,r){let o=js(this._declarationLView,this._declarationTContainer,e,{embeddedViewInjector:i,dehydratedView:r});return new gr(o)}}return t})();function XT(){return Xd(ht(),ee())}function Xd(t,n){return t.type&4?new un(n,t,fa(t,n)):null}function ha(t,n,e,i,r){let o=t.data[n];if(o===null)o=JT(t,n,e,i,r),db()&&(o.flags|=32);else if(o.type&64){o.type=e,o.value=i,o.attrs=r;let a=ab();o.injectorIndex=a===null?-1:a.injectorIndex}return ta(o,!0),o}function JT(t,n,e,i,r){let o=xm(),a=Sm(),s=a?o:o&&o.parent,l=t.data[n]=tA(t,s,e,n,i,r);return eA(t,l,o,a),l}function eA(t,n,e,i){t.firstChild===null&&(t.firstChild=n),e!==null&&(i?e.child==null&&n.parent!==null&&(e.child=n):e.next===null&&(e.next=n,n.prev=e))}function tA(t,n,e,i,r,o){let a=n?n.injectorIndex:-1,s=0;return Cm()&&(s|=128),{type:e,index:i,insertBeforeIndex:null,injectorIndex:a,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,controlDirectiveIndex:-1,customControlIndex:-1,propertyBindings:null,flags:s,providerIndexes:0,value:r,attrs:o,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:n,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function nA(t){let n=t[cm]??[],i=t[pt][Ne],r=[];for(let o of n)o.data[ND]!==void 0?r.push(o):iA(o,i);t[cm]=r}function iA(t,n){let e=0,i=t.firstChild;if(i){let r=t.data[RD];for(;e<r;){let o=i.nextSibling;qD(n,i,!1),i=o,e++}}}var rA=()=>null,oA=()=>null;function Td(t,n){return rA(t,n)}function F0(t,n,e){return oA(t,n,e)}var P0=class{},Jd=class{},dp=class{resolveComponentFactory(n){throw new w(917,!1)}},zs=class{static NULL=new dp},rt=class{},$e=(()=>{class t{destroyNode=null;static __NG_ELEMENT_ID__=()=>aA()}return t})();function aA(){let t=ee(),n=ht(),e=En(n.index,t);return(Ni(e)?e:t)[Ne]}var L0=(()=>{class t{static \u0275prov=C({token:t,providedIn:"root",factory:()=>null})}return t})();var Dd={},up=class{injector;parentInjector;constructor(n,e){this.injector=n,this.parentInjector=e}get(n,e,i){let r=this.injector.get(n,Dd,i);return r!==Dd||e===Dd?r:this.parentInjector.get(n,e,i)}};function Ad(t,n,e){let i=e?t.styles:null,r=e?t.classes:null,o=0;if(n!==null)for(let a=0;a<n.length;a++){let s=n[a];if(typeof s=="number")o=s;else if(o==1)r=Wc(r,s);else if(o==2){let l=s,c=n[++a];i=Wc(i,l+": "+c+";")}}e?t.styles=i:t.stylesWithoutHost=i,e?t.classes=r:t.classesWithoutHost=r}function he(t,n=0){let e=ee();if(e===null)return G(t,n);let i=ht();return wD(i,e,kt(t),n)}function ng(){let t="invalid";throw new Error(t)}function V0(t,n,e,i,r){let o=i===null?null:{"":-1},a=r(t,e);if(a!==null){let s=a,l=null,c=null;for(let d of a)if(d.resolveHostDirectives!==null){[s,l,c]=d.resolveHostDirectives(a);break}cA(t,n,e,s,o,l,c)}o!==null&&i!==null&&sA(e,i,o)}function sA(t,n,e){let i=t.localNames=[];for(let r=0;r<n.length;r+=2){let o=e[n[r+1]];if(o==null)throw new w(-301,!1);i.push(n[r],o)}}function lA(t,n,e){n.componentOffset=e,(t.components??=[]).push(n.index)}function cA(t,n,e,i,r,o,a){let s=i.length,l=null;for(let m=0;m<s;m++){let h=i[m];l===null&&gi(h)&&(l=h,lA(t,e,m)),Km(Md(e,n),t,h.type)}pA(e,t.data.length,s),l?.viewProvidersResolver&&l.viewProvidersResolver(l);for(let m=0;m<s;m++){let h=i[m];h.providersResolver&&h.providersResolver(h)}let c=!1,d=!1,f=XD(t,n,s,null);s>0&&(e.directiveToIndex=new Map);for(let m=0;m<s;m++){let h=i[m];if(e.mergedAttrs=aa(e.mergedAttrs,h.hostAttrs),uA(t,e,n,f,h),mA(f,h,r),a!==null&&a.has(h)){let[D,E]=a.get(h);e.directiveToIndex.set(h.type,[f,D+e.directiveStart,E+e.directiveStart])}else(o===null||!o.has(h))&&e.directiveToIndex.set(h.type,f);h.contentQueries!==null&&(e.flags|=4),(h.hostBindings!==null||h.hostAttrs!==null||h.hostVars!==0)&&(e.flags|=64);let _=h.type.prototype;!c&&(_.ngOnChanges||_.ngOnInit||_.ngDoCheck)&&((t.preOrderHooks??=[]).push(e.index),c=!0),!d&&(_.ngOnChanges||_.ngDoCheck)&&((t.preOrderCheckHooks??=[]).push(e.index),d=!0),f++}dA(t,e,o)}function dA(t,n,e){for(let i=n.directiveStart;i<n.directiveEnd;i++){let r=t.data[i];if(e===null||!e.has(r))Yb(0,n,r,i),Yb(1,n,r,i),Qb(n,i,!1);else{let o=e.get(r);Kb(0,n,o,i),Kb(1,n,o,i),Qb(n,i,!0)}}}function Yb(t,n,e,i){let r=t===0?e.inputs:e.outputs;for(let o in r)if(r.hasOwnProperty(o)){let a;t===0?a=n.inputs??={}:a=n.outputs??={},a[o]??=[],a[o].push(i),B0(n,o)}}function Kb(t,n,e,i){let r=t===0?e.inputs:e.outputs;for(let o in r)if(r.hasOwnProperty(o)){let a=r[o],s;t===0?s=n.hostDirectiveInputs??={}:s=n.hostDirectiveOutputs??={},s[a]??=[],s[a].push(i,o),B0(n,a)}}function B0(t,n){n==="class"?t.flags|=8:n==="style"&&(t.flags|=16)}function Qb(t,n,e){let{attrs:i,inputs:r,hostDirectiveInputs:o}=t;if(i===null||!e&&r===null||e&&o===null||jp(t)){t.initialInputs??=[],t.initialInputs.push(null);return}let a=null,s=0;for(;s<i.length;){let l=i[s];if(l===0){s+=4;continue}else if(l===5){s+=2;continue}else if(typeof l=="number")break;if(!e&&r.hasOwnProperty(l)){let c=r[l];for(let d of c)if(d===n){a??=[],a.push(l,i[s+1]);break}}else if(e&&o.hasOwnProperty(l)){let c=o[l];for(let d=0;d<c.length;d+=2)if(c[d]===n){a??=[],a.push(c[d+1],i[s+1]);break}}s+=2}t.initialInputs??=[],t.initialInputs.push(a)}function uA(t,n,e,i,r){t.data[i]=r;let o=r.factory||(r.factory=ir(r.type,!0)),a=new co(o,gi(r),he,null);t.blueprint[i]=a,e[i]=a,fA(t,n,i,XD(t,e,r.hostVars,Xt),r)}function fA(t,n,e,i,r){let o=r.hostBindings;if(o){let a=t.hostBindingOpCodes;a===null&&(a=t.hostBindingOpCodes=[]);let s=~n.index;hA(a)!=s&&a.push(s),a.push(e,i,o)}}function hA(t){let n=t.length;for(;n>0;){let e=t[--n];if(typeof e=="number"&&e<0)return e}return 0}function mA(t,n,e){if(e){if(n.exportAs)for(let i=0;i<n.exportAs.length;i++)e[n.exportAs[i]]=t;gi(n)&&(e[""]=t)}}function pA(t,n,e){t.flags|=1,t.directiveStart=n,t.directiveEnd=n+e,t.providerIndexes=n}function j0(t,n,e,i,r,o,a,s){let l=n[Q],c=l.consts,d=xn(c,a),f=ha(l,t,e,i,d);return o&&V0(l,n,f,xn(c,s),r),f.mergedAttrs=aa(f.mergedAttrs,f.attrs),f.attrs!==null&&Ad(f,f.attrs,!1),f.mergedAttrs!==null&&Ad(f,f.mergedAttrs,!0),l.queries!==null&&l.queries.elementStart(l,f),f}function H0(t,n){mD(t,n),dm(n)&&t.queries.elementEnd(n)}function gA(t,n,e,i,r,o){let a=n.consts,s=xn(a,r),l=ha(n,t,e,i,s);if(l.mergedAttrs=aa(l.mergedAttrs,l.attrs),o!=null){let c=xn(a,o);l.localNames=[];for(let d=0;d<c.length;d+=2)l.localNames.push(c[d],-1)}return l.attrs!==null&&Ad(l,l.attrs,!1),l.mergedAttrs!==null&&Ad(l,l.mergedAttrs,!0),n.queries!==null&&n.queries.elementStart(n,l),l}function z0(t,n,e){return t[n]=e}function Sn(t,n,e){if(e===Xt)return!1;let i=t[n];return Object.is(i,e)?!1:(t[n]=e,!0)}function U0(t,n,e,i){let r=Sn(t,n,e);return Sn(t,n+1,i)||r}function Cd(t,n,e){return function i(r){let o=i.__ngNativeEl__;o!==void 0&&uk(r,o);let a=Oi(t)?En(t.index,n):n;tg(a,5);let s=n[st],l=Zb(n,s,e,r),c=i.__ngNextListenerFn__;for(;c;)l=Zb(n,s,c,r)&&l,c=c.__ngNextListenerFn__;return l}}function Zb(t,n,e,i){let r=K(null);try{return Oe(Me.OutputStart,n,e),e(i)!==!1}catch(o){return FT(t,o),!1}finally{Oe(Me.OutputEnd,n,e),K(r)}}function $0(t,n,e,i,r,o,a,s){let l=bs(t),c=!1,d=null;if(!i&&l&&(d=vA(n,e,o,t.index)),d!==null){let f=d.__ngLastListenerFn__||d;f.__ngNextListenerFn__=a,d.__ngLastListenerFn__=a,c=!0}else{let f=cn(t,e),m=i?i(f):f;hk(e,m,o,s),i||(s.__ngNativeEl__=f);let h=r.listen(m,o,s);if(!_A(o)){let _=i?D=>i(wn(D[t.index])):t.index;G0(_,n,e,o,s,h,!1)}}return c}function _A(t){return t.startsWith("animation")||t.startsWith("transition")}function vA(t,n,e,i){let r=t.cleanup;if(r!=null)for(let o=0;o<r.length-1;o+=2){let a=r[o];if(a===e&&r[o+1]===i){let s=n[Xo],l=r[o+2];return s&&s.length>l?s[l]:null}typeof a=="string"&&(o+=2)}return null}function G0(t,n,e,i,r,o,a){let s=n.firstCreatePass?ym(n):null,l=vm(e),c=l.length;l.push(r,o),s&&s.push(i,t,c,(c+1)*(a?-1:1))}function Xb(t,n,e,i,r,o){let a=n[e],s=n[Q],c=s.data[e].outputs[i],f=a[c].subscribe(o);G0(t.index,s,n,r,o,f,!0)}var fp=Symbol("BINDING");function W0(t){return t.debugInfo?.className||t.type.name||null}var Rd=class extends zs{ngModule;constructor(n){super(),this.ngModule=n}resolveComponentFactory(n){let e=ar(n);return new da(e,this.ngModule)}};function yA(t){return Object.keys(t).map(n=>{let[e,i,r]=t[n],o={propName:e,templateName:n,isSignal:(i&$d.SignalBased)!==0};return r&&(o.transform=r),o})}function bA(t){return Object.keys(t).map(n=>({propName:t[n],templateName:n}))}function DA(t,n,e){let i=n instanceof ot?n:n?.injector;return i&&t.getStandaloneInjector!==null&&(i=t.getStandaloneInjector(i)||i),i?new up(e,i):e}function CA(t){let n=t.get(rt,null);if(n===null)throw new w(407,!1);let e=t.get(L0,null),i=t.get(Un,null),r=t.get(Zn,null,{optional:!0});return{rendererFactory:n,sanitizer:e,changeDetectionScheduler:i,ngReflect:!1,tracingService:r}}function wA(t,n){let e=q0(t);return GD(n,e,e==="svg"?um:e==="math"?Xy:null)}function q0(t){return(t.selectors[0][0]||"div").toLowerCase()}var da=class extends Jd{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=yA(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=bA(this.componentDef.outputs),this.cachedOutputs}constructor(n,e){super(),this.componentDef=n,this.ngModule=e,this.componentType=n.type,this.selector=qk(n.selectors),this.ngContentSelectors=n.ngContentSelectors??[],this.isBoundToModule=!!e}create(n,e,i,r,o,a){Oe(Me.DynamicComponentStart);let s=K(null);try{let l=this.componentDef,c=DA(l,r||this.ngModule,n),d=CA(c),f=d.tracingService;return f&&f.componentCreate?f.componentCreate(W0(l),()=>this.createComponentRef(d,c,e,i,o,a)):this.createComponentRef(d,c,e,i,o,a)}finally{K(s)}}createComponentRef(n,e,i,r,o,a){let s=this.componentDef,l=EA(r,s,a,o),c=n.rendererFactory.createRenderer(null,s),d=r?ET(c,r,s.encapsulation,e):wA(s,c),f=a?.some(Jb)||o?.some(_=>typeof _!="function"&&_.bindings.some(Jb)),m=zp(null,l,null,512|ZD(s),null,null,n,c,e,null,PD(d,e,!0));m[tt]=d,sd(m);let h=null;try{let _=j0(tt,m,2,"#host",()=>l.directiveRegistry,!0,0);YD(c,d,_),sa(d,m),Xp(l,m,_),VD(l,_,m),H0(l,_),i!==void 0&&SA(_,this.ngContentSelectors,i),h=En(_.index,m),m[st]=h[st],eg(l,m,null)}catch(_){throw h!==null&&Zm(h),Zm(m),_}finally{Oe(Me.DynamicComponentEnd),ld()}return new Nd(this.componentType,m,!!f)}};function EA(t,n,e,i){let r=t?["ng-version","21.2.11"]:Yk(n.selectors[0]),o=null,a=null,s=0;if(e)for(let d of e)s+=d[fp].requiredVars,d.create&&(d.targetIdx=0,(o??=[]).push(d)),d.update&&(d.targetIdx=0,(a??=[]).push(d));if(i)for(let d=0;d<i.length;d++){let f=i[d];if(typeof f!="function")for(let m of f.bindings){s+=m[fp].requiredVars;let h=d+1;m.create&&(m.targetIdx=h,(o??=[]).push(m)),m.update&&(m.targetIdx=h,(a??=[]).push(m))}}let l=[n];if(i)for(let d of i){let f=typeof d=="function"?d:d.type,m=Zh(f);l.push(m)}return Hp(0,null,xA(o,a),1,s,l,null,null,null,[r],null)}function xA(t,n){return!t&&!n?null:e=>{if(e&1&&t)for(let i of t)i.create();if(e&2&&n)for(let i of n)i.update()}}function Jb(t){let n=t[fp].kind;return n==="input"||n==="twoWay"}var Nd=class extends P0{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(n,e,i){super(),this._rootLView=e,this._hasInputBindings=i,this._tNode=td(e[Q],tt),this.location=fa(this._tNode,e),this.instance=En(this._tNode.index,e)[st],this.hostView=this.changeDetectorRef=new gr(e,void 0),this.componentType=n}setInput(n,e){this._hasInputBindings;let i=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(n)&&Object.is(this.previousInputValues.get(n),e))return;let r=this._rootLView,o=Jp(i,r[Q],r,n,e);this.previousInputValues.set(n,e);let a=En(i.index,r);tg(a,1)}get injector(){return new oo(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(n){this.hostView.onDestroy(n)}};function SA(t,n,e){let i=t.projection=[];for(let r=0;r<n.length;r++){let o=e[r];i.push(o!=null&&o.length?Array.from(o):null)}}var Ct=(()=>{class t{static __NG_ELEMENT_ID__=MA}return t})();function MA(){let t=ht();return Y0(t,ee())}var hp=class t extends Ct{_lContainer;_hostTNode;_hostLView;constructor(n,e,i){super(),this._lContainer=n,this._hostTNode=e,this._hostLView=i}get element(){return fa(this._hostTNode,this._hostLView)}get injector(){return new oo(this._hostTNode,this._hostLView)}get parentInjector(){let n=Tp(this._hostTNode,this._hostLView);if(_D(n)){let e=xd(n,this._hostLView),i=Ed(n),r=e[Q].data[i+8];return new oo(r,e)}else return new oo(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(n){let e=eD(this._lContainer);return e!==null&&e[n]||null}get length(){return this._lContainer.length-it}createEmbeddedView(n,e,i){let r,o;typeof i=="number"?r=i:i!=null&&(r=i.index,o=i.injector);let a=Td(this._lContainer,n.ssrId),s=n.createEmbeddedViewImpl(e||{},o,a);return this.insertImpl(s,r,ca(this._hostTNode,a)),s}createComponent(n,e,i,r,o,a,s){let l=n&&!BI(n),c;if(l)c=e;else{let E=e||{};c=E.index,i=E.injector,r=E.projectableNodes,o=E.environmentInjector||E.ngModuleRef,a=E.directives,s=E.bindings}let d=l?n:new da(ar(n)),f=i||this.parentInjector;if(!o&&d.ngModule==null){let k=(l?f:this.parentInjector).get(ot,null);k&&(o=k)}let m=ar(d.componentType??{}),h=Td(this._lContainer,m?.id??null),_=h?.firstChild??null,D=d.create(f,r,_,o,a,s);return this.insertImpl(D.hostView,c,ca(this._hostTNode,h)),D}insert(n,e){return this.insertImpl(n,e,!0)}insertImpl(n,e,i){let r=n._lView;if(eb(r)){let s=this.indexOf(n);if(s!==-1)this.detach(s);else{let l=r[pt],c=new t(l,l[Ut],l[pt]);c.detach(c.indexOf(n))}}let o=this._adjustIndex(e),a=this._lContainer;return Hs(a,r,o,i),n.attachToViewContainerRef(),em(jm(a),o,n),n}move(n,e){return this.insert(n,e)}indexOf(n){let e=eD(this._lContainer);return e!==null?e.indexOf(n):-1}remove(n){let e=this._adjustIndex(n,-1),i=Ns(this._lContainer,e);i&&(gs(jm(this._lContainer),e),Kd(i[Q],i))}detach(n){let e=this._adjustIndex(n,-1),i=Ns(this._lContainer,e);return i&&gs(jm(this._lContainer),e)!=null?new gr(i):null}_adjustIndex(n,e=0){return n??this.length+e}};function eD(t){return t[ys]}function jm(t){return t[ys]||(t[ys]=[])}function Y0(t,n){let e,i=n[t.index];return Gn(i)?e=i:(e=A0(i,n,null,t),n[t.index]=e,Up(n,e)),kA(e,n,t,i),new hp(e,t,n)}function IA(t,n){let e=t[Ne],i=e.createComment(""),r=cn(n,t),o=e.parentNode(r);return Id(e,o,i,e.nextSibling(r),!1),i}var kA=RA,TA=()=>!1;function AA(t,n,e){return TA(t,n,e)}function RA(t,n,e,i){if(t[dr])return;let r;e.type&8?r=wn(i):r=IA(n,e),t[dr]=r}var mp=class t{queryList;matches=null;constructor(n){this.queryList=n}clone(){return new t(this.queryList)}setDirty(){this.queryList.setDirty()}},pp=class t{queries;constructor(n=[]){this.queries=n}createEmbeddedView(n){let e=n.queries;if(e!==null){let i=n.contentQueries!==null?n.contentQueries[0]:e.length,r=[];for(let o=0;o<i;o++){let a=e.getByIndex(o),s=this.queries[a.indexInDeclarationView];r.push(s.clone())}return new t(r)}return null}insertView(n){this.dirtyQueriesWithMatches(n)}detachView(n){this.dirtyQueriesWithMatches(n)}finishViewCreation(n){this.dirtyQueriesWithMatches(n)}dirtyQueriesWithMatches(n){for(let e=0;e<this.queries.length;e++)rg(n,e).matches!==null&&this.queries[e].setDirty()}},Od=class{flags;read;predicate;constructor(n,e,i=null){this.flags=e,this.read=i,typeof n=="string"?this.predicate=LA(n):this.predicate=n}},gp=class t{queries;constructor(n=[]){this.queries=n}elementStart(n,e){for(let i=0;i<this.queries.length;i++)this.queries[i].elementStart(n,e)}elementEnd(n){for(let e=0;e<this.queries.length;e++)this.queries[e].elementEnd(n)}embeddedTView(n){let e=null;for(let i=0;i<this.length;i++){let r=e!==null?e.length:0,o=this.getByIndex(i).embeddedTView(n,r);o&&(o.indexInDeclarationView=i,e!==null?e.push(o):e=[o])}return e!==null?new t(e):null}template(n,e){for(let i=0;i<this.queries.length;i++)this.queries[i].template(n,e)}getByIndex(n){return this.queries[n]}get length(){return this.queries.length}track(n){this.queries.push(n)}},_p=class t{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(n,e=-1){this.metadata=n,this._declarationNodeIndex=e}elementStart(n,e){this.isApplyingToNode(e)&&this.matchTNode(n,e)}elementEnd(n){this._declarationNodeIndex===n.index&&(this._appliesToNextNode=!1)}template(n,e){this.elementStart(n,e)}embeddedTView(n,e){return this.isApplyingToNode(n)?(this.crossesNgTemplate=!0,this.addMatch(-n.index,e),new t(this.metadata)):null}isApplyingToNode(n){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let e=this._declarationNodeIndex,i=n.parent;for(;i!==null&&i.type&8&&i.index!==e;)i=i.parent;return e===(i!==null?i.index:-1)}return this._appliesToNextNode}matchTNode(n,e){let i=this.metadata.predicate;if(Array.isArray(i))for(let r=0;r<i.length;r++){let o=i[r];this.matchTNodeWithReadOption(n,e,NA(e,o)),this.matchTNodeWithReadOption(n,e,bd(e,n,o,!1,!1))}else i===un?e.type&4&&this.matchTNodeWithReadOption(n,e,-1):this.matchTNodeWithReadOption(n,e,bd(e,n,i,!1,!1))}matchTNodeWithReadOption(n,e,i){if(i!==null){let r=this.metadata.read;if(r!==null)if(r===P||r===Ct||r===un&&e.type&4)this.addMatch(e.index,-2);else{let o=bd(e,n,r,!1,!1);o!==null&&this.addMatch(e.index,o)}else this.addMatch(e.index,i)}}addMatch(n,e){this.matches===null?this.matches=[n,e]:this.matches.push(n,e)}};function NA(t,n){let e=t.localNames;if(e!==null){for(let i=0;i<e.length;i+=2)if(e[i]===n)return e[i+1]}return null}function OA(t,n){return t.type&11?fa(t,n):t.type&4?Xd(t,n):null}function FA(t,n,e,i){return e===-1?OA(n,t):e===-2?PA(t,n,i):Is(t,t[Q],e,n)}function PA(t,n,e){if(e===P)return fa(n,t);if(e===un)return Xd(n,t);if(e===Ct)return Y0(n,t)}function K0(t,n,e,i){let r=n[hi].queries[i];if(r.matches===null){let o=t.data,a=e.matches,s=[];for(let l=0;a!==null&&l<a.length;l+=2){let c=a[l];if(c<0)s.push(null);else{let d=o[c];s.push(FA(n,d,a[l+1],e.metadata.read))}}r.matches=s}return r.matches}function vp(t,n,e,i){let r=t.queries.getByIndex(e),o=r.matches;if(o!==null){let a=K0(t,n,r,e);for(let s=0;s<o.length;s+=2){let l=o[s];if(l>0)i.push(a[s/2]);else{let c=o[s+1],d=n[-l];for(let f=it;f<d.length;f++){let m=d[f];m[cr]===m[pt]&&vp(m[Q],m,c,i)}if(d[eo]!==null){let f=d[eo];for(let m=0;m<f.length;m++){let h=f[m];vp(h[Q],h,c,i)}}}}}return i}function ig(t,n){return t[hi].queries[n].queryList}function Q0(t,n,e){let i=new uo((e&4)===4);return ib(t,n,i,i.destroy),(n[hi]??=new pp).queries.push(new mp(i))-1}function Z0(t,n,e){let i=Ye();return i.firstCreatePass&&(J0(i,new Od(t,n,e),-1),(n&2)===2&&(i.staticViewQueries=!0)),Q0(i,ee(),n)}function X0(t,n,e,i){let r=Ye();if(r.firstCreatePass){let o=ht();J0(r,new Od(n,e,i),o.index),VA(r,t),(e&2)===2&&(r.staticContentQueries=!0)}return Q0(r,ee(),e)}function LA(t){return t.split(",").map(n=>n.trim())}function J0(t,n,e){t.queries===null&&(t.queries=new gp),t.queries.track(new _p(n,e))}function VA(t,n){let e=t.contentQueries||(t.contentQueries=[]),i=e.length?e[e.length-1]:-1;n!==i&&e.push(t.queries.length-1,n)}function rg(t,n){return t.queries.getByIndex(n)}function eC(t,n){let e=t[Q],i=rg(e,n);return i.crossesNgTemplate?vp(e,t,n,[]):K0(e,t,i,n)}function tC(t,n,e){let i,r=Xa(()=>{i._dirtyCounter();let o=BA(i,t);if(n&&o===void 0)throw new w(-951,!1);return o});return i=r[bt],i._dirtyCounter=re(0),i._flatValue=void 0,r}function og(t){return tC(!0,!1,t)}function ag(t){return tC(!0,!0,t)}function nC(t,n){let e=t[bt];e._lView=ee(),e._queryIndex=n,e._queryList=ig(e._lView,n),e._queryList.onDirty(()=>e._dirtyCounter.update(i=>i+1))}function BA(t,n){let e=t._lView,i=t._queryIndex;if(e===void 0||i===void 0||e[te]&4)return n?void 0:Pt;let r=ig(e,i),o=eC(e,i);return r.reset(o,SD),n?r.first:r._changesDetected||t._flatValue===void 0?t._flatValue=r.toArray():t._flatValue}var yp=new Map,jA=new Set;function sg(t){return Xi(this,null,function*(){let n=yp;yp=new Map;let e=new Map;function i(o){let a=e.get(o);if(a)return a;let s=t(o).then(l=>HA(o,l));return e.set(o,s),s}let r=Array.from(n).map(s=>Xi(null,[s],function*([o,a]){if(a.styleUrl&&a.styleUrls?.length)throw new Error("@Component cannot define both `styleUrl` and `styleUrls`. Use `styleUrl` if the component has one stylesheet, or `styleUrls` if it has multiple");let l=[];a.templateUrl&&l.push(i(a.templateUrl).then(m=>{a.template=m}));let c=typeof a.styles=="string"?[a.styles]:a.styles??[];a.styles=c;let{styleUrl:d,styleUrls:f}=a;if(d&&(f=[d],a.styleUrl=void 0),f?.length){let m=Promise.all(f.map(h=>i(h))).then(h=>{c.push(...h),a.styleUrls=void 0});l.push(m)}yield Promise.all(l),jA.delete(o)}));yield Promise.all(r)})}function iC(){return yp.size===0}function HA(t,n){return Xi(this,null,function*(){if(typeof n=="string")return n;if(n.status!==void 0&&n.status!==200)throw new w(918,!1);return n.text()})}var bi=class{},rC=class{};var Os=class extends bi{ngModuleType;_parent;_bootstrapComponents=[];_r3Injector;instance;destroyCbs=[];componentFactoryResolver=new Rd(this);constructor(n,e,i,r=!0){super(),this.ngModuleType=n,this._parent=e;let o=Vy(n);this._bootstrapComponents=Pk(o.bootstrap),this._r3Injector=Rm(n,e,[{provide:bi,useValue:this},{provide:zs,useValue:this.componentFactoryResolver},...i],ms(n),new Set(["environment"])),r&&this.resolveInjectorInitializers()}resolveInjectorInitializers(){this._r3Injector.resolveInjectorInitializers(),this.instance=this._r3Injector.get(this.ngModuleType)}get injector(){return this._r3Injector}destroy(){let n=this._r3Injector;!n.destroyed&&n.destroy(),this.destroyCbs.forEach(e=>e()),this.destroyCbs=null}onDestroy(n){this.destroyCbs.push(n)}},Fd=class extends rC{moduleType;constructor(n){super(),this.moduleType=n}create(n){return new Os(this.moduleType,n,[])}};function oC(t,n,e){return new Os(t,n,e,!1)}var Pd=class extends bi{injector;componentFactoryResolver=new Rd(this);instance=null;constructor(n){super();let e=new Yr([...n.providers,{provide:bi,useValue:this},{provide:zs,useValue:this.componentFactoryResolver}],n.parent||Qo(),n.debugName,new Set(["environment"]));this.injector=e,n.runEnvironmentInitializers&&e.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(n){this.injector.onDestroy(n)}};function aC(t,n,e=null){return new Pd({providers:t,parent:n,debugName:e,runEnvironmentInitializers:!0}).injector}var zA=(()=>{class t{_injector;cachedInjectors=new Map;constructor(e){this._injector=e}getOrCreateStandaloneInjector(e){if(!e.standalone)return null;if(!this.cachedInjectors.has(e)){let i=im(!1,e.type),r=i.length>0?aC([i],this._injector,""):null;this.cachedInjectors.set(e,r)}return this.cachedInjectors.get(e)}ngOnDestroy(){try{for(let e of this.cachedInjectors.values())e!==null&&e.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=C({token:t,providedIn:"environment",factory:()=>new t(G(ot))})}return t})();function I(t){return Ls(()=>{let n=sC(t),e=De(N({},n),{decls:t.decls,vars:t.vars,template:t.template,consts:t.consts||null,ngContentSelectors:t.ngContentSelectors,onPush:t.changeDetection===Rp.OnPush,directiveDefs:null,pipeDefs:null,dependencies:n.standalone&&t.dependencies||null,getStandaloneInjector:n.standalone?r=>r.get(zA).getOrCreateStandaloneInjector(e):null,getExternalStyles:null,signals:t.signals??!1,data:t.data||{},encapsulation:t.encapsulation||Kn.Emulated,styles:t.styles||Pt,_:null,schemas:t.schemas||null,tView:null,id:""});n.standalone&&Xn("NgStandalone"),lC(e);let i=t.dependencies;return e.directiveDefs=tD(i,UA),e.pipeDefs=tD(i,By),e.id=WA(e),e})}function UA(t){return ar(t)||Zh(t)}function $(t){return Ls(()=>({type:t.type,bootstrap:t.bootstrap||Pt,declarations:t.declarations||Pt,imports:t.imports||Pt,exports:t.exports||Pt,transitiveCompileScopes:null,schemas:t.schemas||null,id:t.id||null}))}function $A(t,n){if(t==null)return sr;let e={};for(let i in t)if(t.hasOwnProperty(i)){let r=t[i],o,a,s,l;Array.isArray(r)?(s=r[0],o=r[1],a=r[2]??o,l=r[3]||null):(o=r,a=r,s=$d.None,l=null),e[o]=[i,s,l],n[o]=a}return e}function GA(t){if(t==null)return sr;let n={};for(let e in t)t.hasOwnProperty(e)&&(n[t[e]]=e);return n}function z(t){return Ls(()=>{let n=sC(t);return lC(n),n})}function lg(t){return{type:t.type,name:t.name,factory:null,pure:t.pure!==!1,standalone:t.standalone??!0,onDestroy:t.type.prototype.ngOnDestroy||null}}function sC(t){let n={};return{type:t.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:t.hostBindings||null,hostVars:t.hostVars||0,hostAttrs:t.hostAttrs||null,contentQueries:t.contentQueries||null,declaredInputs:n,inputConfig:t.inputs||sr,exportAs:t.exportAs||null,standalone:t.standalone??!0,signals:t.signals===!0,selectors:t.selectors||Pt,viewQuery:t.viewQuery||null,features:t.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,controlDef:null,inputs:$A(t.inputs,n),outputs:GA(t.outputs),debugInfo:null}}function lC(t){t.features?.forEach(n=>n(t))}function tD(t,n){return t?()=>{let e=typeof t=="function"?t():t,i=[];for(let r of e){let o=n(r);o!==null&&i.push(o)}return i}:null}function WA(t){let n=0,e=typeof t.consts=="function"?"":t.consts,i=[t.selectors,t.ngContentSelectors,t.hostVars,t.hostAttrs,e,t.vars,t.decls,t.encapsulation,t.standalone,t.signals,t.exportAs,JSON.stringify(t.inputs),JSON.stringify(t.outputs),Object.getOwnPropertyNames(t.type.prototype),!!t.contentQueries,!!t.viewQuery];for(let o of i.join("|"))n=Math.imul(31,n)+o.charCodeAt(0)<<0;return n+=2147483648,"c"+n}function qA(t){return Object.getPrototypeOf(t.prototype).constructor}function Ge(t){let n=qA(t.type),e=!0,i=[t];for(;n;){let r;if(gi(t))r=n.\u0275cmp||n.\u0275dir;else{if(n.\u0275cmp)throw new w(903,!1);r=n.\u0275dir}if(r){if(e){i.push(r);let a=t;a.inputs=Hm(t.inputs),a.declaredInputs=Hm(t.declaredInputs),a.outputs=Hm(t.outputs);let s=r.hostBindings;s&&XA(t,s);let l=r.viewQuery,c=r.contentQueries;if(l&&QA(t,l),c&&ZA(t,c),YA(t,r),Ly(t.outputs,r.outputs),gi(r)&&r.data.animation){let d=t.data;d.animation=(d.animation||[]).concat(r.data.animation)}}let o=r.features;if(o)for(let a=0;a<o.length;a++){let s=o[a];s&&s.ngInherit&&s(t),s===Ge&&(e=!1)}}n=Object.getPrototypeOf(n)}KA(i)}function YA(t,n){for(let e in n.inputs){if(!n.inputs.hasOwnProperty(e)||t.inputs.hasOwnProperty(e))continue;let i=n.inputs[e];i!==void 0&&(t.inputs[e]=i,t.declaredInputs[e]=n.declaredInputs[e])}}function KA(t){let n=0,e=null;for(let i=t.length-1;i>=0;i--){let r=t[i];r.hostVars=n+=r.hostVars,r.hostAttrs=aa(r.hostAttrs,e=aa(e,r.hostAttrs))}}function Hm(t){return t===sr?{}:t===Pt?[]:t}function QA(t,n){let e=t.viewQuery;e?t.viewQuery=(i,r)=>{n(i,r),e(i,r)}:t.viewQuery=n}function ZA(t,n){let e=t.contentQueries;e?t.contentQueries=(i,r,o)=>{n(i,r,o),e(i,r,o)}:t.contentQueries=n}function XA(t,n){let e=t.hostBindings;e?t.hostBindings=(i,r)=>{n(i,r),e(i,r)}:t.hostBindings=n}function cC(t,n,e,i,r,o,a,s){if(e.firstCreatePass){t.mergedAttrs=aa(t.mergedAttrs,t.attrs);let d=t.tView=Hp(2,t,r,o,a,e.directiveRegistry,e.pipeRegistry,null,e.schemas,e.consts,null);e.queries!==null&&(e.queries.template(e,t),d.queries=e.queries.embeddedTView(t))}s&&(t.flags|=s),ta(t,!1);let l=eR(e,n,t,i);cd()&&Qp(e,n,l,t),sa(l,n);let c=A0(l,n,l,t);n[i+tt]=c,Up(n,c),AA(c,t,n)}function JA(t,n,e,i,r,o,a,s,l,c,d){let f=e+tt,m;return n.firstCreatePass?(m=ha(n,f,4,a||null,s||null),Dm()&&V0(n,t,m,xn(n.consts,c),y0),mD(n,m)):m=n.data[f],cC(m,t,n,e,i,r,o,l),bs(m)&&Xp(n,t,m),c!=null&&Zd(t,m,d),m}function Fs(t,n,e,i,r,o,a,s,l,c,d){let f=e+tt,m;if(n.firstCreatePass){if(m=ha(n,f,4,a||null,s||null),c!=null){let h=xn(n.consts,c);m.localNames=[];for(let _=0;_<h.length;_+=2)m.localNames.push(h[_],-1)}}else m=n.data[f];return cC(m,t,n,e,i,r,o,l),c!=null&&Zd(t,m,d),m}function fn(t,n,e,i,r,o,a,s){let l=ee(),c=Ye(),d=xn(c.consts,o);return JA(l,c,t,n,e,i,r,d,void 0,a,s),fn}var eR=tR;function tR(t,n,e,i){return dd(!0),n[Ne].createComment("")}function Di(t){return typeof t=="function"&&t[bt]!==void 0}function cg(t){return Di(t)&&typeof t.set=="function"}var eu=new b(""),tu=new b(""),Us=(()=>{class t{_ngZone;registry;_isZoneStable=!0;_callbacks=[];_taskTrackingZone=null;_destroyRef;constructor(e,i,r){this._ngZone=e,this.registry=i,am()&&(this._destroyRef=u(Wn,{optional:!0})??void 0),dg||(uC(r),r.addToWindow(i)),this._watchAngularEvents(),e.run(()=>{this._taskTrackingZone=typeof Zone>"u"?null:Zone.current.get("TaskTrackingZone")})}_watchAngularEvents(){let e=this._ngZone.onUnstable.subscribe({next:()=>{this._isZoneStable=!1}}),i=this._ngZone.runOutsideAngular(()=>this._ngZone.onStable.subscribe({next:()=>{A.assertNotInAngularZone(),queueMicrotask(()=>{this._isZoneStable=!0,this._runCallbacksIfReady()})}}));this._destroyRef?.onDestroy(()=>{e.unsubscribe(),i.unsubscribe()})}isStable(){return this._isZoneStable&&!this._ngZone.hasPendingMacrotasks}_runCallbacksIfReady(){if(this.isStable())queueMicrotask(()=>{for(;this._callbacks.length!==0;){let e=this._callbacks.pop();clearTimeout(e.timeoutId),e.doneCb()}});else{let e=this.getPendingTasks();this._callbacks=this._callbacks.filter(i=>i.updateCb&&i.updateCb(e)?(clearTimeout(i.timeoutId),!1):!0)}}getPendingTasks(){return this._taskTrackingZone?this._taskTrackingZone.macroTasks.map(e=>({source:e.source,creationLocation:e.creationLocation,data:e.data})):[]}addCallback(e,i,r){let o=-1;i&&i>0&&(o=setTimeout(()=>{this._callbacks=this._callbacks.filter(a=>a.timeoutId!==o),e()},i)),this._callbacks.push({doneCb:e,timeoutId:o,updateCb:r})}whenStable(e,i,r){if(r&&!this._taskTrackingZone)throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');this.addCallback(e,i,r),this._runCallbacksIfReady()}registerApplication(e){this.registry.registerApplication(e,this)}unregisterApplication(e){this.registry.unregisterApplication(e)}findProviders(e,i,r){return[]}static \u0275fac=function(i){return new(i||t)(G(A),G(dC),G(tu))};static \u0275prov=C({token:t,factory:t.\u0275fac})}return t})(),dC=(()=>{class t{_applications=new Map;registerApplication(e,i){this._applications.set(e,i)}unregisterApplication(e){this._applications.delete(e)}unregisterAllApplications(){this._applications.clear()}getTestability(e){return this._applications.get(e)||null}getAllTestabilities(){return Array.from(this._applications.values())}getAllRootElements(){return Array.from(this._applications.keys())}findTestabilityInTree(e,i=!0){return dg?.findTestabilityInTree(this,e,i)??null}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"platform"})}return t})();function uC(t){dg=t}var dg;function ma(t){return!!t&&typeof t.then=="function"}function ug(t){return!!t&&typeof t.subscribe=="function"}var fC=new b("");var fg=(()=>{class t{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((e,i)=>{this.resolve=e,this.reject=i});appInits=u(fC,{optional:!0})??[];injector=u(ne);constructor(){}runInitializers(){if(this.initialized)return;let e=[];for(let r of this.appInits){let o=Zo(this.injector,r);if(ma(o))e.push(o);else if(ug(o)){let a=new Promise((s,l)=>{o.subscribe({complete:s,error:l})});e.push(a)}}let i=()=>{this.done=!0,this.resolve()};Promise.all(e).then(()=>{i()}).catch(r=>{this.reject(r)}),e.length===0&&i(),this.initialized=!0}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),hC=new b("");function mC(){hh(()=>{let t="";throw new w(600,t)})}function pC(t){return t.isBoundToModule}var nR=10;function hg(t,n){return Array.isArray(n)?n.reduce(hg,t):N(N({},t),n)}var Jt=(()=>{class t{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=u(Fi);afterRenderManager=u(qd);zonelessEnabled=u(ia);rootEffectScheduler=u(hd);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new M;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=u(hr);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(Se(e=>!e))}constructor(){u(Zn,{optional:!0})}whenStable(){let e;return new Promise(i=>{e=this.isStable.subscribe({next:r=>{r&&i()}})}).finally(()=>{e.unsubscribe()})}_injector=u(ot);_rendererFactory=null;get injector(){return this._injector}bootstrap(e,i){return this.bootstrapImpl(e,i)}bootstrapImpl(e,i,r=ne.NULL){return this._injector.get(A).run(()=>{Oe(Me.BootstrapComponentStart);let a=e instanceof Jd;if(!this._injector.get(fg).done){let _="";throw new w(405,_)}let l;a?l=e:l=this._injector.get(zs).resolveComponentFactory(e),this.componentTypes.push(l.componentType);let c=pC(l)?void 0:this._injector.get(bi),d=i||l.selector,f=l.create(r,[],d,c),m=f.location.nativeElement,h=f.injector.get(eu,null);return h?.registerApplication(m),f.onDestroy(()=>{this.detachView(f.hostView),Ms(this.components,f),h?.unregisterApplication(m)}),this._loadComponent(f),Oe(Me.BootstrapComponentEnd,f),f})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){Oe(Me.ChangeDetectionStart),this.tracingSnapshot!==null?this.tracingSnapshot.run(Wd.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw Oe(Me.ChangeDetectionEnd),new w(101,!1);let e=K(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,K(e),this.afterTick.next(),Oe(Me.ChangeDetectionEnd)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(rt,null,{optional:!0}));let e=0;for(;this.dirtyFlags!==0&&e++<nR;){Oe(Me.ChangeDetectionSyncStart);try{this.synchronizeOnce()}finally{Oe(Me.ChangeDetectionSyncEnd)}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let e=!1;if(this.dirtyFlags&7){let i=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:r}of this.allViews){if(!i&&!Ds(r))continue;let o=i&&!this.zonelessEnabled?0:1;M0(r,o),e=!0}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}e||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:e})=>Ds(e))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(e){let i=e;this._views.push(i),i.attachToAppRef(this)}detachView(e){let i=e;Ms(this._views,i),i.detachFromAppRef()}_loadComponent(e){this.attachView(e.hostView);try{this.tick()}catch(r){this.internalErrorHandler(r)}this.components.push(e),this._injector.get(hC,[]).forEach(r=>r(e))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(e=>e()),this._views.slice().forEach(e=>e.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(e){return this._destroyListeners.push(e),()=>Ms(this._destroyListeners,e)}destroy(){if(this._destroyed)throw new w(406,!1);let e=this._injector;e.destroy&&!e.destroyed&&e.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function Ms(t,n){let e=t.indexOf(n);e>-1&&t.splice(e,1)}function gC(){let t,n;return{promise:new Promise((i,r)=>{t=i,n=r}),resolve:t,reject:n}}function ce(t,n,e,i){let r=ee(),o=ur();if(Sn(r,o,n)){let a=Ye(),s=ws();RT(s,r,t,n,e,i)}return ce}function so(t){if(Xn("NgAnimateEnter"),!Bs)return so;let n=ee();if(t0(n))return so;let e=ht(),i=n[$t].get(A);return r0(Hb(n),e,()=>iR(n,e,t,i)),c0(n[$t]),d0(n[$t],Hb(n)),so}function iR(t,n,e,i){let r=cn(n,t),o=t[Ne],a=i0(e),s=[],l=!1,c=f=>{if(Ts(f)!==r)return;let m=f instanceof AnimationEvent?"animationend":"transitionend";i.runOutsideAngular(()=>{o.listen(r,m,d)})},d=f=>{Ts(f)===r&&(Wp(f,r)&&(l=!0),rR(f,r,o))};if(a&&a.length>0){i.runOutsideAngular(()=>{s.push(o.listen(r,"animationstart",c)),s.push(o.listen(r,"transitionstart",c))}),eT(r,a,s);for(let f of a)o.addClass(r,f);i.runOutsideAngular(()=>{requestAnimationFrame(()=>{if(!l&&(s0(r,ao,Bs),!ao.has(r))){for(let f of a)o.removeClass(r,f);Gp(r)}})})}}function rR(t,n,e){let i=la.get(n);if(!(Ts(t)!==n||!i)&&Wp(t,n)){t.stopPropagation();for(let r of i.classList)e.removeClass(n,r);Gp(n)}}function lo(t){if(Xn("NgAnimateLeave"),!Bs)return lo;let n=ee();if(t0(n))return lo;let i=ht(),r=n[$t].get(A);return r0(Gd(n),i,()=>oR(n,i,t,r)),c0(n[$t]),lo}function oR(t,n,e,i){let{promise:r,resolve:o}=gC(),a=cn(n,t),s=t[Ne];pr.add(t[mi]),(Gd(t).get(n.index).resolvers??=[]).push(o);let l=i0(e);return l&&l.length>0?aR(a,n,t,l,s,i):o(),{promise:r,resolve:o}}function aR(t,n,e,i,r,o){nT(t,r);let a=[],s=Gd(e).get(n.index)?.resolvers,l,c=!1,d=f=>{if(!(Ts(f)!==t&&f.type!=="animation-fallback")&&(f.type==="animation-fallback"||Wp(f,t))){if(c=!0,l&&clearTimeout(l),f.type!=="animation-fallback"&&f.stopPropagation(),ao.delete(t),jb(n,t),Array.isArray(n.projection))for(let h of i)r.removeClass(t,h);zb(s,a),Ub(e,n)}};o.runOutsideAngular(()=>{a.push(r.listen(t,"animationend",d)),a.push(r.listen(t,"transitionend",d))}),n0(n,t);for(let f of i)r.addClass(t,f);o.runOutsideAngular(()=>{requestAnimationFrame(()=>{if(c)return;s0(t,ao,Bs);let f=ao.get(t);f?(l=setTimeout(()=>{d(new CustomEvent("animation-fallback"))},f.duration+50),a.push(()=>clearTimeout(l))):(jb(n,t),zb(s,a),Ub(e,n))})})}var bp=class{destroy(n){}updateValue(n,e){}swap(n,e){let i=Math.min(n,e),r=Math.max(n,e),o=this.detach(r);if(r-i>1){let a=this.detach(i);this.attach(i,o),this.attach(r,a)}else this.attach(i,o)}move(n,e){this.attach(e,this.detach(n))}};function zm(t,n,e,i,r){return t===e&&Object.is(n,i)?1:Object.is(r(t,n),r(e,i))?-1:0}function sR(t,n,e,i){let r,o,a=0,s=t.length-1,l=void 0;if(Array.isArray(n)){K(i);let c=n.length-1;for(K(null);a<=s&&a<=c;){let d=t.at(a),f=n[a],m=zm(a,d,a,f,e);if(m!==0){m<0&&t.updateValue(a,f),a++;continue}let h=t.at(s),_=n[c],D=zm(s,h,c,_,e);if(D!==0){D<0&&t.updateValue(s,_),s--,c--;continue}let E=e(a,d),k=e(s,h),oe=e(a,f);if(Object.is(oe,k)){let Ae=e(c,_);Object.is(Ae,E)?(t.swap(a,s),t.updateValue(s,_),c--,s--):t.move(s,a),t.updateValue(a,f),a++;continue}if(r??=new Ld,o??=iD(t,a,s,e),Dp(t,r,a,oe))t.updateValue(a,f),a++,s++;else if(o.has(oe))r.set(E,t.detach(a)),s--;else{let Ae=t.create(a,n[a]);t.attach(a,Ae),a++,s++}}for(;a<=c;)nD(t,r,e,a,n[a]),a++}else if(n!=null){K(i);let c=n[Symbol.iterator]();K(null);let d=c.next();for(;!d.done&&a<=s;){let f=t.at(a),m=d.value,h=zm(a,f,a,m,e);if(h!==0)h<0&&t.updateValue(a,m),a++,d=c.next();else{r??=new Ld,o??=iD(t,a,s,e);let _=e(a,m);if(Dp(t,r,a,_))t.updateValue(a,m),a++,s++,d=c.next();else if(!o.has(_))t.attach(a,t.create(a,m)),a++,s++,d=c.next();else{let D=e(a,f);r.set(D,t.detach(a)),s--}}}for(;!d.done;)nD(t,r,e,t.length,d.value),d=c.next()}for(;a<=s;)t.destroy(t.detach(s--));r?.forEach(c=>{t.destroy(c)})}function Dp(t,n,e,i){return n!==void 0&&n.has(i)?(t.attach(e,n.get(i)),n.delete(i),!0):!1}function nD(t,n,e,i,r){if(Dp(t,n,i,e(i,r)))t.updateValue(i,r);else{let o=t.create(i,r);t.attach(i,o)}}function iD(t,n,e,i){let r=new Set;for(let o=n;o<=e;o++)r.add(i(o,t.at(o)));return r}var Ld=class{kvMap=new Map;_vMap=void 0;has(n){return this.kvMap.has(n)}delete(n){if(!this.has(n))return!1;let e=this.kvMap.get(n);return this._vMap!==void 0&&this._vMap.has(e)?(this.kvMap.set(n,this._vMap.get(e)),this._vMap.delete(e)):this.kvMap.delete(n),!0}get(n){return this.kvMap.get(n)}set(n,e){if(this.kvMap.has(n)){let i=this.kvMap.get(n);this._vMap===void 0&&(this._vMap=new Map);let r=this._vMap;for(;r.has(i);)i=r.get(i);r.set(i,e)}else this.kvMap.set(n,e)}forEach(n){for(let[e,i]of this.kvMap)if(n(i,e),this._vMap!==void 0){let r=this._vMap;for(;r.has(i);)i=r.get(i),n(i,e)}}};function ge(t,n,e,i,r,o,a,s){Xn("NgControlFlow");let l=ee(),c=Ye(),d=xn(c.consts,o);return Fs(l,c,t,n,e,i,r,d,256,a,s),mg}function mg(t,n,e,i,r,o,a,s){Xn("NgControlFlow");let l=ee(),c=Ye(),d=xn(c.consts,o);return Fs(l,c,t,n,e,i,r,d,512,a,s),mg}function _e(t,n){Xn("NgControlFlow");let e=ee(),i=ur(),r=e[i]!==Xt?e[i]:-1,o=r!==-1?Vd(e,tt+r):void 0,a=0;if(Sn(e,i,t)){let s=K(null);try{if(o!==void 0&&N0(o,a),t!==-1){let l=tt+t,c=Vd(e,l),d=xp(e[Q],l),f=F0(c,d,e),m=js(e,d,n,{dehydratedView:f});Hs(c,m,a,ca(d,f))}}finally{K(s)}}else if(o!==void 0){let s=R0(o,a);s!==void 0&&(s[st]=n)}}var Cp=class{lContainer;$implicit;$index;constructor(n,e,i){this.lContainer=n,this.$implicit=e,this.$index=i}get $count(){return this.lContainer.length-it}};var wp=class{hasEmptyBlock;trackByFn;liveCollection;constructor(n,e,i){this.hasEmptyBlock=n,this.trackByFn=e,this.liveCollection=i}};function Jn(t,n,e,i,r,o,a,s,l,c,d,f,m){Xn("NgControlFlow");let h=ee(),_=Ye(),D=l!==void 0,E=ee(),k=s?a.bind(E[Gt][st]):a,oe=new wp(D,k);E[tt+t]=oe,Fs(h,_,t+1,n,e,i,r,xn(_.consts,o),256),D&&Fs(h,_,t+2,l,c,d,f,xn(_.consts,m),512)}var Ep=class extends bp{lContainer;hostLView;templateTNode;operationsCounter=void 0;needsIndexUpdate=!1;constructor(n,e,i){super(),this.lContainer=n,this.hostLView=e,this.templateTNode=i}get length(){return this.lContainer.length-it}at(n){return this.getLView(n)[st].$implicit}attach(n,e){let i=e[Qr];this.needsIndexUpdate||=n!==this.length,Hs(this.lContainer,e,n,ca(this.templateTNode,i)),lR(this.lContainer,n)}detach(n){return this.needsIndexUpdate||=n!==this.length-1,cR(this.lContainer,n),dR(this.lContainer,n)}create(n,e){let i=Td(this.lContainer,this.templateTNode.tView.ssrId);return js(this.hostLView,this.templateTNode,new Cp(this.lContainer,e,n),{dehydratedView:i})}destroy(n){Kd(n[Q],n)}updateValue(n,e){this.getLView(n)[st].$implicit=e}reset(){this.needsIndexUpdate=!1}updateIndexes(){if(this.needsIndexUpdate)for(let n=0;n<this.length;n++)this.getLView(n)[st].$index=n}getLView(n){return uR(this.lContainer,n)}};function ei(t){let n=K(null),e=_i();try{let i=ee(),r=i[Q],o=i[e],a=e+1,s=Vd(i,a);if(o.liveCollection===void 0){let c=xp(r,a);o.liveCollection=new Ep(s,i,c)}else o.liveCollection.reset();let l=o.liveCollection;if(sR(l,t,o.trackByFn,n),l.updateIndexes(),o.hasEmptyBlock){let c=ur(),d=l.length===0;if(Sn(i,c,d)){let f=e+2,m=Vd(i,f);if(d){let h=xp(r,f),_=F0(m,h,i),D=js(i,h,void 0,{dehydratedView:_});Hs(m,D,0,ca(h,_))}else r.firstUpdatePass&&nA(m),N0(m,0)}}}finally{K(n)}}function Vd(t,n){return t[n]}function lR(t,n){if(t.length<=it)return;let e=it+n,i=t[e],r=i?i[pi]:void 0;if(i&&r&&r.detachedLeaveAnimationFns&&r.detachedLeaveAnimationFns.length>0){let o=i[$t];dT(o,r),pr.delete(i[mi]),r.detachedLeaveAnimationFns=void 0}}function cR(t,n){if(t.length<=it)return;let e=it+n,i=t[e],r=i?i[pi]:void 0;r&&r.leave&&r.leave.size>0&&(r.detachedLeaveAnimationFns=[])}function dR(t,n){return Ns(t,n)}function uR(t,n){return R0(t,n)}function xp(t,n){return td(t,n)}function T(t,n,e){let i=ee(),r=ur();if(Sn(i,r,n)){let o=Ye(),a=ws();_0(a,i,t,n,i[Ne],e)}return T}function Sp(t,n,e,i,r){Jp(n,t,e,r?"class":"style",i)}function p(t,n,e,i){let r=ee(),o=r[Q],a=t+tt,s=o.firstCreatePass?j0(a,r,2,n,y0,Dm(),e,i):o.data[a];if(Oi(s)){let l=r[fi].tracingService;if(l&&l.componentCreate){let c=o.data[s.directiveStart+s.componentOffset];return l.componentCreate(W0(c),()=>(rD(t,n,r,s,i),p))}}return rD(t,n,r,s,i),p}function rD(t,n,e,i,r){if(b0(i,e,t,n,_C),bs(i)){let o=e[Q];Xp(o,e,i),VD(o,i,e)}r!=null&&Zd(e,i)}function g(){let t=Ye(),n=ht(),e=D0(n);return t.firstCreatePass&&H0(t,e),wm(e)&&Em(),bm(),e.classesWithoutHost!=null&&GI(e)&&Sp(t,e,ee(),e.classesWithoutHost,!0),e.stylesWithoutHost!=null&&WI(e)&&Sp(t,e,ee(),e.stylesWithoutHost,!1),g}function ie(t,n,e,i){return p(t,n,e,i),g(),ie}function We(t,n,e,i){let r=ee(),o=r[Q],a=t+tt,s=o.firstCreatePass?gA(a,o,2,n,e,i):o.data[a];return b0(s,r,t,n,_C),i!=null&&Zd(r,s),We}function Ke(){let t=ht(),n=D0(t);return wm(n)&&Em(),bm(),Ke}function wt(t,n,e,i){return We(t,n,e,i),Ke(),wt}var _C=(t,n,e,i,r)=>(dd(!0),GD(n[Ne],i,vb()));function ke(){return ee()}function gt(t,n,e){let i=ee(),r=ur();if(Sn(i,r,n)){let o=Ye(),a=ws();v0(a,i,t,n,i[Ne],e)}return gt}var Es=void 0;function fR(t){let n=Math.floor(Math.abs(t)),e=t.toString().replace(/^[^.]*\.?/,"").length;return n===1&&e===0?1:5}var hR=["en",[["a","p"],["AM","PM"]],[["AM","PM"]],[["S","M","T","W","T","F","S"],["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],["Su","Mo","Tu","We","Th","Fr","Sa"]],Es,[["J","F","M","A","M","J","J","A","S","O","N","D"],["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],["January","February","March","April","May","June","July","August","September","October","November","December"]],Es,[["B","A"],["BC","AD"],["Before Christ","Anno Domini"]],0,[6,0],["M/d/yy","MMM d, y","MMMM d, y","EEEE, MMMM d, y"],["h:mm\u202Fa","h:mm:ss\u202Fa","h:mm:ss\u202Fa z","h:mm:ss\u202Fa zzzz"],["{1}, {0}",Es,Es,Es],[".",",",";","%","+","-","E","\xD7","\u2030","\u221E","NaN",":"],["#,##0.###","#,##0%","\xA4#,##0.00","#E0"],"USD","$","US Dollar",{},"ltr",fR],Um={};function hn(t){let n=mR(t),e=oD(n);if(e)return e;let i=n.split("-")[0];if(e=oD(i),e)return e;if(i==="en")return hR;throw new w(701,!1)}function oD(t){return t in Um||(Um[t]=Dt.ng&&Dt.ng.common&&Dt.ng.common.locales&&Dt.ng.common.locales[t]),Um[t]}var lt=(function(t){return t[t.LocaleId=0]="LocaleId",t[t.DayPeriodsFormat=1]="DayPeriodsFormat",t[t.DayPeriodsStandalone=2]="DayPeriodsStandalone",t[t.DaysFormat=3]="DaysFormat",t[t.DaysStandalone=4]="DaysStandalone",t[t.MonthsFormat=5]="MonthsFormat",t[t.MonthsStandalone=6]="MonthsStandalone",t[t.Eras=7]="Eras",t[t.FirstDayOfWeek=8]="FirstDayOfWeek",t[t.WeekendRange=9]="WeekendRange",t[t.DateFormat=10]="DateFormat",t[t.TimeFormat=11]="TimeFormat",t[t.DateTimeFormat=12]="DateTimeFormat",t[t.NumberSymbols=13]="NumberSymbols",t[t.NumberFormats=14]="NumberFormats",t[t.CurrencyCode=15]="CurrencyCode",t[t.CurrencySymbol=16]="CurrencySymbol",t[t.CurrencyName=17]="CurrencyName",t[t.Currencies=18]="Currencies",t[t.Directionality=19]="Directionality",t[t.PluralCase=20]="PluralCase",t[t.ExtraData=21]="ExtraData",t})(lt||{});function mR(t){return t.toLowerCase().replace(/_/g,"-")}var $s="en-US";var pR=$s;function vC(t){typeof t=="string"&&(pR=t.toLowerCase().replace(/_/g,"-"))}function x(t,n,e){let i=ee(),r=Ye(),o=ht();return yC(r,i,i[Ne],o,t,n,e),x}function pa(t,n,e){let i=ee(),r=Ye(),o=ht();return(o.type&3||e)&&$0(o,r,i,e,i[Ne],t,n,Cd(o,i,n)),pa}function yC(t,n,e,i,r,o,a){let s=!0,l=null;if((i.type&3||a)&&(l??=Cd(i,n,o),$0(i,t,n,a,e,r,o,l)&&(s=!1)),s){let c=i.outputs?.[r],d=i.hostDirectiveOutputs?.[r];if(d&&d.length)for(let f=0;f<d.length;f+=2){let m=d[f],h=d[f+1];l??=Cd(i,n,o),Xb(i,n,m,h,r,l)}if(c&&c.length)for(let f of c)l??=Cd(i,n,o),Xb(i,n,f,r,r,l)}}function X(t=1){return _b(t)}function gR(t,n){let e=null,i=zk(t);for(let r=0;r<n.length;r++){let o=n[r];if(o==="*"){e=r;continue}if(i===null?QD(t,o,!0):Gk(i,o))return r}return e}function we(t){let n=ee()[Gt][Ut];if(!n.projection){let e=t?t.length:1,i=n.projection=Gy(e,null),r=i.slice(),o=n.child;for(;o!==null;){if(o.type!==128){let a=t?gR(o,t):0;a!==null&&(r[a]?r[a].projectionNext=o:i[a]=o,r[a]=o)}o=o.next}}}function Z(t,n=0,e,i,r,o){let a=ee(),s=Ye(),l=i?t+1:null;l!==null&&Fs(a,s,l,i,r,o,null,e);let c=ha(s,tt+t,16,null,e||null);c.projection===null&&(c.projection=n),Mm();let f=!a[Qr]||Cm();a[Gt][Ut].projection[c.projection]===null&&l!==null?_R(a,s,l):f&&!Hd(c)&&DT(s,a,c)}function _R(t,n,e){let i=tt+e,r=n.data[i],o=t[i],a=Td(o,r.tView.ssrId),s=js(t,r,void 0,{dehydratedView:a});Hs(o,s,0,ca(r,a))}function Mn(t,n,e,i){return X0(t,n,e,i),Mn}function ve(t,n,e){return Z0(t,n,e),ve}function B(t){let n=ee(),e=Ye(),i=ad();Cs(i+1);let r=rg(e,i);if(t.dirty&&Jy(n)===((r.metadata.flags&2)===2)){if(r.matches===null)t.reset([]);else{let o=eC(n,i);t.reset(o,SD),t.notifyOnChanges()}return!0}return!1}function j(){return ig(ee(),ad())}function nu(t,n,e,i,r){return nC(n,X0(t,e,i,r)),nu}function iu(t,n,e,i){return nC(t,Z0(n,e,i)),iu}function ru(t=1){Cs(ad()+t)}function Y(t){let n=sb();return hm(n,tt+t)}function gd(t,n){return t<<17|n<<2}function fo(t){return t>>17&32767}function vR(t){return(t&2)==2}function yR(t,n){return t&131071|n<<17}function Mp(t){return t|2}function ua(t){return(t&131068)>>2}function $m(t,n){return t&-131069|n<<2}function bR(t){return(t&1)===1}function Ip(t){return t|1}function DR(t,n,e,i,r,o){let a=o?n.classBindings:n.styleBindings,s=fo(a),l=ua(a);t[i]=e;let c=!1,d;if(Array.isArray(e)){let f=e;d=f[1],(d===null||Ko(f,d)>0)&&(c=!0)}else d=e;if(r)if(l!==0){let m=fo(t[s+1]);t[i+1]=gd(m,s),m!==0&&(t[m+1]=$m(t[m+1],i)),t[s+1]=yR(t[s+1],i)}else t[i+1]=gd(s,0),s!==0&&(t[s+1]=$m(t[s+1],i)),s=i;else t[i+1]=gd(l,0),s===0?s=i:t[l+1]=$m(t[l+1],i),l=i;c&&(t[i+1]=Mp(t[i+1])),aD(t,d,i,!0),aD(t,d,i,!1),CR(n,d,t,i,o),a=gd(s,l),o?n.classBindings=a:n.styleBindings=a}function CR(t,n,e,i,r){let o=r?t.residualClasses:t.residualStyles;o!=null&&typeof n=="string"&&Ko(o,n)>=0&&(e[i+1]=Ip(e[i+1]))}function aD(t,n,e,i){let r=t[e+1],o=n===null,a=i?fo(r):ua(r),s=!1;for(;a!==0&&(s===!1||o);){let l=t[a],c=t[a+1];wR(l,n)&&(s=!0,t[a+1]=i?Ip(c):Mp(c)),a=i?fo(c):ua(c)}s&&(t[e+1]=i?Mp(r):Ip(r))}function wR(t,n){return t===null||n==null||(Array.isArray(t)?t[1]:t)===n?!0:Array.isArray(t)&&typeof n=="string"?Ko(t,n)>=0:!1}var Yn={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function ER(t){return t.substring(Yn.key,Yn.keyEnd)}function xR(t){return SR(t),bC(t,DC(t,0,Yn.textEnd))}function bC(t,n){let e=Yn.textEnd;return e===n?-1:(n=Yn.keyEnd=MR(t,Yn.key=n,e),DC(t,n,e))}function SR(t){Yn.key=0,Yn.keyEnd=0,Yn.value=0,Yn.valueEnd=0,Yn.textEnd=t.length}function DC(t,n,e){for(;n<e&&t.charCodeAt(n)<=32;)n++;return n}function MR(t,n,e){for(;n<e&&t.charCodeAt(n)>32;)n++;return n}function Bi(t,n,e){return CC(t,n,e,!1),Bi}function O(t,n){return CC(t,n,null,!0),O}function _t(t){kR(FR,IR,t,!0)}function IR(t,n){for(let e=xR(n);e>=0;e=bC(n,e))Xc(t,ER(n),!0)}function CC(t,n,e,i){let r=ee(),o=Ye(),a=rd(2);if(o.firstUpdatePass&&EC(o,t,a,i),n!==Xt&&Sn(r,a,n)){let s=o.data[_i()];xC(o,s,r,r[Ne],t,r[a+1]=LR(n,e),i,a)}}function kR(t,n,e,i){let r=Ye(),o=rd(2);r.firstUpdatePass&&EC(r,null,o,i);let a=ee();if(e!==Xt&&Sn(a,o,e)){let s=r.data[_i()];if(SC(s,i)&&!wC(r,o)){let l=i?s.classesWithoutHost:s.stylesWithoutHost;l!==null&&(e=Wc(l,e||"")),Sp(r,s,a,e,i)}else PR(r,s,a,a[Ne],a[o+1],a[o+1]=OR(t,n,e),i,o)}}function wC(t,n){return n>=t.expandoStartIndex}function EC(t,n,e,i){let r=t.data;if(r[e+1]===null){let o=r[_i()],a=wC(t,e);SC(o,i)&&n===null&&!a&&(n=!1),n=TR(r,o,n,i),DR(r,o,n,e,a,i)}}function TR(t,n,e,i){let r=hb(t),o=i?n.residualClasses:n.residualStyles;if(r===null)(i?n.classBindings:n.styleBindings)===0&&(e=Gm(null,t,n,e,i),e=Ps(e,n.attrs,i),o=null);else{let a=n.directiveStylingLast;if(a===-1||t[a]!==r)if(e=Gm(r,t,n,e,i),o===null){let l=AR(t,n,i);l!==void 0&&Array.isArray(l)&&(l=Gm(null,t,n,l[1],i),l=Ps(l,n.attrs,i),RR(t,n,i,l))}else o=NR(t,n,i)}return o!==void 0&&(i?n.residualClasses=o:n.residualStyles=o),e}function AR(t,n,e){let i=e?n.classBindings:n.styleBindings;if(ua(i)!==0)return t[fo(i)]}function RR(t,n,e,i){let r=e?n.classBindings:n.styleBindings;t[fo(r)]=i}function NR(t,n,e){let i,r=n.directiveEnd;for(let o=1+n.directiveStylingLast;o<r;o++){let a=t[o].hostAttrs;i=Ps(i,a,e)}return Ps(i,n.attrs,e)}function Gm(t,n,e,i,r){let o=null,a=e.directiveEnd,s=e.directiveStylingLast;for(s===-1?s=e.directiveStart:s++;s<a&&(o=n[s],i=Ps(i,o.hostAttrs,r),o!==t);)s++;return t!==null&&(e.directiveStylingLast=s),i}function Ps(t,n,e){let i=e?1:2,r=-1;if(n!==null)for(let o=0;o<n.length;o++){let a=n[o];typeof a=="number"?r=a:r===i&&(Array.isArray(t)||(t=t===void 0?[]:["",t]),Xc(t,a,e?!0:n[++o]))}return t===void 0?null:t}function OR(t,n,e){if(e==null||e==="")return Pt;let i=[],r=Li(e);if(Array.isArray(r))for(let o=0;o<r.length;o++)t(i,r[o],!0);else if(r instanceof Set)for(let o of r)t(i,o,!0);else if(typeof r=="object")for(let o in r)r.hasOwnProperty(o)&&t(i,o,r[o]);else typeof r=="string"&&n(i,r);return i}function FR(t,n,e){let i=String(n);i!==""&&!i.includes(" ")&&Xc(t,i,e)}function PR(t,n,e,i,r,o,a,s){r===Xt&&(r=Pt);let l=0,c=0,d=0<r.length?r[0]:null,f=0<o.length?o[0]:null;for(;d!==null||f!==null;){let m=l<r.length?r[l+1]:void 0,h=c<o.length?o[c+1]:void 0,_=null,D;d===f?(l+=2,c+=2,m!==h&&(_=f,D=h)):f===null||d!==null&&d<f?(l+=2,_=d):(c+=2,_=f,D=h),_!==null&&xC(t,n,e,i,_,D,a,s),d=l<r.length?r[l]:null,f=c<o.length?o[c]:null}}function xC(t,n,e,i,r,o,a,s){if(!(n.type&3))return;let l=t.data,c=l[s+1],d=bR(c)?sD(l,n,e,r,ua(c),a):void 0;if(!Bd(d)){Bd(o)||vR(c)&&(o=sD(l,null,e,r,s,a));let f=fm(_i(),e);wT(i,a,f,r,o)}}function sD(t,n,e,i,r,o){let a=n===null,s;for(;r>0;){let l=t[r],c=Array.isArray(l),d=c?l[1]:l,f=d===null,m=e[r+1];m===Xt&&(m=f?Pt:void 0);let h=f?Jc(m,i):d===i?m:void 0;if(c&&!Bd(h)&&(h=Jc(l,i)),Bd(h)&&(s=h,a))return s;let _=t[r+1];r=a?fo(_):ua(_)}if(n!==null){let l=o?n.residualClasses:n.residualStyles;l!=null&&(s=Jc(l,i))}return s}function Bd(t){return t!==void 0}function LR(t,n){return t==null||t===""||(typeof n=="string"?t=t+n:typeof t=="object"&&(t=ms(Li(t)))),t}function SC(t,n){return(t.flags&(n?8:16))!==0}function y(t,n=""){let e=ee(),i=Ye(),r=t+tt,o=i.firstCreatePass?ha(i,r,1,n,null):i.data[r],a=VR(i,e,o,n);e[r]=a,cd()&&Qp(i,e,a,o),ta(o,!1)}var VR=(t,n,e,i)=>(dd(!0),Rk(n[Ne],i));function BR(t,n,e,i=""){return Sn(t,ur(),e)?n+ps(e)+i:Xt}function jR(t,n,e,i,r,o=""){let a=lb(),s=U0(t,a,e,r);return rd(2),s?n+ps(e)+i+ps(r)+o:Xt}function ct(t){return Qe("",t),ct}function Qe(t,n,e){let i=ee(),r=BR(i,t,n,e);return r!==Xt&&MC(i,_i(),r),Qe}function Gs(t,n,e,i,r){let o=ee(),a=jR(o,t,n,e,i,r);return a!==Xt&&MC(o,_i(),a),Gs}function MC(t,n,e){let i=fm(n,t);Nk(t[Ne],i,e)}function Ve(t,n,e){cg(n)&&(n=n());let i=ee(),r=ur();if(Sn(i,r,n)){let o=Ye(),a=ws();_0(a,i,t,n,i[Ne],e)}return Ve}function ze(t,n){let e=cg(t);return e&&t.set(n),e}function Be(t,n){let e=ee(),i=Ye(),r=ht();return yC(i,e,e[Ne],r,t,n),Be}function lD(t,n,e){let i=Ye();i.firstCreatePass&&IC(n,i.data,i.blueprint,gi(t),e)}function IC(t,n,e,i,r){if(t=kt(t),Array.isArray(t))for(let o=0;o<t.length;o++)IC(t[o],n,e,i,r);else{let o=Ye(),a=ee(),s=ht(),l=qr(t)?t:kt(t.provide),c=om(t),d=s.providerIndexes&1048575,f=s.directiveStart,m=s.providerIndexes>>20;if(qr(t)||!t.multi){let h=new co(c,r,he,null),_=qm(l,n,r?d:d+m,f);_===-1?(Km(Md(s,a),o,l),Wm(o,t,n.length),n.push(l),s.directiveStart++,s.directiveEnd++,r&&(s.providerIndexes+=1048576),e.push(h),a.push(h)):(e[_]=h,a[_]=h)}else{let h=qm(l,n,d+m,f),_=qm(l,n,d,d+m),D=h>=0&&e[h],E=_>=0&&e[_];if(r&&!E||!r&&!D){Km(Md(s,a),o,l);let k=UR(r?zR:HR,e.length,r,i,c,t);!r&&E&&(e[_].providerFactory=k),Wm(o,t,n.length,0),n.push(l),s.directiveStart++,s.directiveEnd++,r&&(s.providerIndexes+=1048576),e.push(k),a.push(k)}else{let k=kC(e[r?_:h],c,!r&&i);Wm(o,t,h>-1?h:_,k)}!r&&i&&E&&e[_].componentProviders++}}}function Wm(t,n,e,i){let r=qr(n),o=Qy(n);if(r||o){let l=(o?kt(n.useClass):n).prototype.ngOnDestroy;if(l){let c=t.destroyHooks||(t.destroyHooks=[]);if(!r&&n.multi){let d=c.indexOf(e);d===-1?c.push(e,[i,l]):c[d+1].push(i,l)}else c.push(e,l)}}}function kC(t,n,e){return e&&t.componentProviders++,t.multi.push(n)-1}function qm(t,n,e,i){for(let r=e;r<i;r++)if(n[r]===t)return r;return-1}function HR(t,n,e,i,r){return kp(this.multi,[])}function zR(t,n,e,i,r){let o=this.multi,a;if(this.providerFactory){let s=this.providerFactory.componentProviders,l=Is(i,i[Q],this.providerFactory.index,r);a=l.slice(0,s),kp(o,a);for(let c=s;c<l.length;c++)a.push(l[c])}else a=[],kp(o,a);return a}function kp(t,n){for(let e=0;e<t.length;e++){let i=t[e];n.push(i())}return n}function UR(t,n,e,i,r,o){let a=new co(t,e,he,null);return a.multi=[],a.index=n,a.componentProviders=0,kC(a,r,i&&!e),a}function xe(t,n){return e=>{e.providersResolver=(i,r)=>lD(i,r?r(t):t,!1),n&&(e.viewProvidersResolver=(i,r)=>lD(i,r?r(n):n,!0))}}function pg(t,n,e,i){return GR(ee(),km(),t,n,e,i)}function TC(t,n){let e=t[n];return e===Xt?void 0:e}function $R(t,n,e,i,r,o){let a=n+e;return Sn(t,a,r)?z0(t,a+1,o?i.call(o,r):i(r)):TC(t,a+1)}function GR(t,n,e,i,r,o,a){let s=n+e;return U0(t,s,r,o)?z0(t,s+2,a?i.call(a,r,o):i(r,o)):TC(t,s+2)}function gg(t,n){let e=Ye(),i,r=t+tt;e.firstCreatePass?(i=WR(n,e.pipeRegistry),e.data[r]=i,i.onDestroy&&(e.destroyHooks??=[]).push(r,i.onDestroy)):i=e.data[r];let o=i.factory||(i.factory=ir(i.type,!0)),a,s=zt(he);try{let l=Sd(!1),c=o();return Sd(l),mm(e,ee(),r,c),c}finally{zt(s)}}function WR(t,n){if(n)for(let e=n.length-1;e>=0;e--){let i=n[e];if(t===i.name)return i}}function _g(t,n,e){let i=t+tt,r=ee(),o=hm(r,i);return qR(r,i)?$R(r,km(),n,o.transform,e,o):o.transform(e)}function qR(t,n){return t[Q].data[n].pure}function vg(t,n){return Xd(t,n)}var _d=null;function AC(t){_d!==null&&(t.defaultEncapsulation!==_d.defaultEncapsulation||t.preserveWhitespaces!==_d.preserveWhitespaces)||(_d=t)}var RC=new b("");var NC=(()=>{class t{applicationErrorHandler=u(Fi);appRef=u(Jt);taskService=u(hr);ngZone=u(A);zonelessEnabled=u(ia);tracing=u(Zn,{optional:!0});zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new se;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(fs):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(u(ud,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let e=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(e);return}this.switchToMicrotaskScheduler(),this.taskService.remove(e)})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()}))}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let e=this.taskService.add();this.useMicrotaskScheduler=!0,queueMicrotask(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(e)})})}notify(e){if(!this.zonelessEnabled&&e===5)return;switch(e){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2;break}case 12:{this.appRef.dirtyFlags|=16;break}case 13:{this.appRef.dirtyFlags|=2;break}case 11:break;default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let i=this.useMicrotaskScheduler?Db:Om;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>i(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>i(()=>this.tick()))}shouldScheduleTick(){return!(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(fs+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let e=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(i){this.applicationErrorHandler(i)}finally{this.taskService.remove(e),this.cleanup()}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let e=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(e)}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function OC(){return[{provide:Un,useExisting:NC},{provide:A,useClass:hs},{provide:ia,useValue:!0}]}function YR(){return typeof $localize<"u"&&$localize.locale||$s}var go=new b("",{factory:()=>u(go,{optional:!0,skipSelf:!0})||YR()});function In(t){return Ry(t)}function ti(t,n){return Xa(t,n?.equal)}var en=class{attributeName;constructor(n){this.attributeName=n}__NG_ELEMENT_ID__=()=>Ap(this.attributeName);toString(){return`HostAttributeToken ${this.attributeName}`}};function FC(t,n){return og(n)}function rN(t,n){return ag(n)}var qs=(FC.required=rN,FC);function PC(t,n){return og(n)}function oN(t,n){return ag(n)}var BC=(PC.required=oN,PC);function aN(t,n,e){let i=new Fd(e);return Promise.resolve(i)}function LC(t){for(let n=t.length-1;n>=0;n--)if(t[n]!==void 0)return t[n]}var sN=(()=>{class t{zone=u(A);changeDetectionScheduler=u(Un);applicationRef=u(Jt);applicationErrorHandler=u(Fi);_onMicrotaskEmptySubscription;initialize(){this._onMicrotaskEmptySubscription||(this._onMicrotaskEmptySubscription=this.zone.onMicrotaskEmpty.subscribe({next:()=>{this.changeDetectionScheduler.runningTick||this.zone.run(()=>{try{this.applicationRef.dirtyFlags|=1,this.applicationRef._tick()}catch(e){this.applicationErrorHandler(e)}})}}))}ngOnDestroy(){this._onMicrotaskEmptySubscription?.unsubscribe()}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),lN=new b("",{factory:()=>!1});function cN({ngZoneFactory:t,scheduleInRootZone:n}){return t??=()=>new A(De(N({},jC()),{scheduleInRootZone:n})),[{provide:ia,useValue:!1},{provide:A,useFactory:t},{provide:lr,multi:!0,useFactory:()=>{let e=u(sN,{optional:!0});return()=>e.initialize()}},{provide:lr,multi:!0,useFactory:()=>{let e=u(dN);return()=>{e.initialize()}}},{provide:ud,useValue:n??Nm}]}function au(t){let n=t?.scheduleInRootZone,e=cN({ngZoneFactory:()=>{let i=jC(t);return i.scheduleInRootZone=n,i.shouldCoalesceEventChangeDetection&&Xn("NgZone_CoalesceEvent"),new A(i)},scheduleInRootZone:n});return _s([{provide:lN,useValue:!0},e])}function jC(t){return{enableLongStackTrace:!1,shouldCoalesceEventChangeDetection:t?.eventCoalescing??!1,shouldCoalesceRunChangeDetection:t?.runCoalescing??!1}}var dN=(()=>{class t{subscription=new se;initialized=!1;zone=u(A);pendingTasks=u(hr);initialize(){if(this.initialized)return;this.initialized=!0;let e=null;!this.zone.isStable&&!this.zone.hasPendingMacrotasks&&!this.zone.hasPendingMicrotasks&&(e=this.pendingTasks.add()),this.zone.runOutsideAngular(()=>{this.subscription.add(this.zone.onStable.subscribe(()=>{A.assertNotInAngularZone(),queueMicrotask(()=>{e!==null&&!this.zone.hasPendingMacrotasks&&!this.zone.hasPendingMicrotasks&&(this.pendingTasks.remove(e),e=null)})}))}),this.subscription.add(this.zone.onUnstable.subscribe(()=>{A.assertInAngularZone(),e??=this.pendingTasks.add()}))}ngOnDestroy(){this.subscription.unsubscribe()}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var ou=new b(""),uN=new b("");function Ws(t){return!t.moduleRef}function fN(t){let n=Ws(t)?t.r3Injector:t.moduleRef.injector,e=n.get(A);return e.run(()=>{Ws(t)?t.r3Injector.resolveInjectorInitializers():t.moduleRef.resolveInjectorInitializers();let i=n.get(Fi),r;if(e.runOutsideAngular(()=>{r=e.onError.subscribe({next:i})}),Ws(t)){let o=()=>n.destroy(),a=t.platformInjector.get(ou);a.add(o),n.onDestroy(()=>{r.unsubscribe(),a.delete(o)})}else{let o=()=>t.moduleRef.destroy(),a=t.platformInjector.get(ou);a.add(o),t.moduleRef.onDestroy(()=>{Ms(t.allPlatformModules,t.moduleRef),r.unsubscribe(),a.delete(o)})}return mN(i,e,()=>{let o=n.get(hr),a=o.add(),s=n.get(fg);return s.runInitializers(),s.donePromise.then(()=>{let l=n.get(go,$s);if(vC(l||$s),!n.get(uN,!0))return Ws(t)?n.get(Jt):(t.allPlatformModules.push(t.moduleRef),t.moduleRef);if(Ws(t)){let d=n.get(Jt);return t.rootComponent!==void 0&&d.bootstrap(t.rootComponent),d}else return HC?.(t.moduleRef,t.allPlatformModules),t.moduleRef}).finally(()=>{o.remove(a)})})})}var HC;function VC(){HC=hN}function hN(t,n){let e=t.injector.get(Jt);if(t._bootstrapComponents.length>0)t._bootstrapComponents.forEach(i=>e.bootstrap(i));else if(t.instance.ngDoBootstrap)t.instance.ngDoBootstrap(e);else throw new w(-403,!1);n.push(t)}function mN(t,n,e){try{let i=e();return ma(i)?i.catch(r=>{throw n.runOutsideAngular(()=>t(r)),r}):i}catch(i){throw n.runOutsideAngular(()=>t(i)),i}}var zC=(()=>{class t{_injector;_modules=[];_destroyListeners=[];_destroyed=!1;constructor(e){this._injector=e}bootstrapModuleFactory(e,i){let r=[OC(),...i?.applicationProviders??[],wb],o=oC(e.moduleType,this.injector,r);return VC(),fN({moduleRef:o,allPlatformModules:this._modules,platformInjector:this.injector})}bootstrapModule(e,i=[]){let r=hg({},i);return VC(),aN(this.injector,r,e).then(o=>this.bootstrapModuleFactory(o,r))}onDestroy(e){this._destroyListeners.push(e)}get injector(){return this._injector}destroy(){if(this._destroyed)throw new w(404,!1);this._modules.slice().forEach(i=>i.destroy()),this._destroyListeners.forEach(i=>i());let e=this._injector.get(ou,null);e&&(e.forEach(i=>i()),e.clear()),this._destroyed=!0}get destroyed(){return this._destroyed}static \u0275fac=function(i){return new(i||t)(G(ne))};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"platform"})}return t})(),Cg=null;function pN(t){if(Eg())throw new w(400,!1);mC(),Cg=t;let n=t.get(zC);return vN(t),n}function wg(t,n,e=[]){let i=`Platform: ${n}`,r=new b(i);return(o=[])=>{let a=Eg();if(!a){let s=[...e,...o,{provide:r,useValue:!0}];a=t?.(s)??pN(gN(s,i))}return _N(r)}}function gN(t=[],n){return ne.create({name:n,providers:[{provide:vs,useValue:"platform"},{provide:ou,useValue:new Set([()=>Cg=null])},...t]})}function _N(t){let n=Eg();if(!n)throw new w(-401,!1);return n}function Eg(){return Cg?.get(zC)??null}function vN(t){let n=t.get(jd,null);Zo(t,()=>{n?.forEach(e=>e())})}var yN=1e4;var Lq=yN-1e3;var Fe=(()=>{class t{static __NG_ELEMENT_ID__=bN}return t})();function bN(t){return DN(ht(),ee(),(t&16)===16)}function DN(t,n,e){if(Oi(t)&&!e){let i=En(t.index,n);return new gr(i,i)}else if(t.type&175){let i=n[Gt];return new gr(i,n)}return null}var UC=wg(null,"core",[]),$C=(()=>{class t{constructor(e){}static \u0275fac=function(i){return new(i||t)(G(Jt))};static \u0275mod=$({type:t});static \u0275inj=H({})}return t})();function F(t){return typeof t=="boolean"?t:t!=null&&t!=="false"}function kn(t,n=NaN){return!isNaN(parseFloat(t))&&!isNaN(Number(t))?Number(t):n}var yg=Symbol("NOT_SET"),GC=new Set,CN=De(N({},ic),{kind:"afterRenderEffectPhase",consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,value:yg,cleanup:null,consumerMarkedDirty(){if(this.sequence.impl.executing){if(this.sequence.lastPhase===null||this.sequence.lastPhase<this.phase)return;this.sequence.erroredOrDestroyed=!0}this.sequence.scheduler.notify(7)},phaseFn(t){if(this.sequence.lastPhase=this.phase,!this.dirty)return this.signal;if(this.dirty=!1,this.value!==yg&&!jo(this))return this.signal;try{for(let r of this.cleanup??GC)r()}finally{this.cleanup?.clear()}let n=[];t!==void 0&&n.push(t),n.push(this.registerCleanupFn);let e=Ji(this),i;try{i=this.userFn.apply(null,n)}finally{Pr(this,e)}return(this.value===yg||!this.equal(this.value,i))&&(this.value=i,this.version++),this.signal}}),bg=class extends As{scheduler;lastPhase=null;nodes=[void 0,void 0,void 0,void 0];onDestroyFns=null;constructor(n,e,i,r,o,a=null){super(n,[void 0,void 0,void 0,void 0],i,!1,o.get(Wn),a),this.scheduler=r;for(let s of qp){let l=e[s];if(l===void 0)continue;let c=Object.create(CN);c.sequence=this,c.phase=s,c.userFn=l,c.dirty=!0,c.signal=()=>(Bo(c),c.value),c.signal[bt]=c,c.registerCleanupFn=d=>(c.cleanup??=new Set).add(d),this.nodes[s]=c,this.hooks[s]=d=>c.phaseFn(d)}}afterRun(){super.afterRun(),this.lastPhase=null}destroy(){if(this.onDestroyFns!==null)for(let n of this.onDestroyFns)n();super.destroy();for(let n of this.nodes)if(n)try{for(let e of n.cleanup??GC)e()}finally{er(n)}}};function WC(t,n){let e=n?.injector??u(ne),i=e.get(Un),r=e.get(qd),o=e.get(Zn,null,{optional:!0});r.impl??=e.get(Yp);let a=t;typeof a=="function"&&(a={mixedReadWrite:t});let s=e.get(na,null,{optional:!0}),l=new bg(r.impl,[a.earlyRead,a.write,a.mixedReadWrite,a.read],s?.view,i,e,o?.snapshot(null));return r.impl.register(l),l}function su(t,n){let e=ar(t),i=n.elementInjector||Qo();return new da(e).create(i,n.projectableNodes,n.hostElement,n.environmentInjector,n.directives,n.bindings)}var qC=null;function mn(){return qC}function xg(t){qC??=t}var Ys=class{},lu=(()=>{class t{historyGo(e){throw new Error("")}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:()=>u(YC),providedIn:"platform"})}return t})();var YC=(()=>{class t extends lu{_location;_history;_doc=u(W);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return mn().getBaseHref(this._doc)}onPopState(e){let i=mn().getGlobalEventTarget(this._doc,"window");return i.addEventListener("popstate",e,!1),()=>i.removeEventListener("popstate",e)}onHashChange(e){let i=mn().getGlobalEventTarget(this._doc,"window");return i.addEventListener("hashchange",e,!1),()=>i.removeEventListener("hashchange",e)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(e){this._location.pathname=e}pushState(e,i,r){this._history.pushState(e,i,r)}replaceState(e,i,r){this._history.replaceState(e,i,r)}forward(){this._history.forward()}back(){this._history.back()}historyGo(e=0){this._history.go(e)}getState(){return this._history.state}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:()=>new t,providedIn:"platform"})}return t})();function ZC(t,n){return t?n?t.endsWith("/")?n.startsWith("/")?t+n.slice(1):t+n:n.startsWith("/")?t+n:`${t}/${n}`:t:n}function KC(t){let n=t.search(/#|\?|$/);return t[n-1]==="/"?t.slice(0,n-1)+t.slice(n):t}function yr(t){return t&&t[0]!=="?"?`?${t}`:t}var cu=(()=>{class t{historyGo(e){throw new Error("")}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:()=>u(EN),providedIn:"root"})}return t})(),wN=new b(""),EN=(()=>{class t extends cu{_platformLocation;_baseHref;_removeListenerFns=[];constructor(e,i){super(),this._platformLocation=e,this._baseHref=i??this._platformLocation.getBaseHrefFromDOM()??u(W).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(e){this._removeListenerFns.push(this._platformLocation.onPopState(e),this._platformLocation.onHashChange(e))}getBaseHref(){return this._baseHref}prepareExternalUrl(e){return ZC(this._baseHref,e)}path(e=!1){let i=this._platformLocation.pathname+yr(this._platformLocation.search),r=this._platformLocation.hash;return r&&e?`${i}${r}`:i}pushState(e,i,r,o){let a=this.prepareExternalUrl(r+yr(o));this._platformLocation.pushState(e,i,a)}replaceState(e,i,r,o){let a=this.prepareExternalUrl(r+yr(o));this._platformLocation.replaceState(e,i,a)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(e=0){this._platformLocation.historyGo?.(e)}static \u0275fac=function(i){return new(i||t)(G(lu),G(wN,8))};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var du=(()=>{class t{_subject=new M;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(e){this._locationStrategy=e;let i=this._locationStrategy.getBaseHref();this._basePath=MN(KC(QC(i))),this._locationStrategy.onPopState(r=>{this._subject.next({url:this.path(!0),pop:!0,state:r.state,type:r.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(e=!1){return this.normalize(this._locationStrategy.path(e))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(e,i=""){return this.path()==this.normalize(e+yr(i))}normalize(e){return t.stripTrailingSlash(SN(this._basePath,QC(e)))}prepareExternalUrl(e){return e&&e[0]!=="/"&&(e="/"+e),this._locationStrategy.prepareExternalUrl(e)}go(e,i="",r=null){this._locationStrategy.pushState(r,"",e,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+yr(i)),r)}replaceState(e,i="",r=null){this._locationStrategy.replaceState(r,"",e,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+yr(i)),r)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(e=0){this._locationStrategy.historyGo?.(e)}onUrlChange(e){return this._urlChangeListeners.push(e),this._urlChangeSubscription??=this.subscribe(i=>{this._notifyUrlChangeListeners(i.url,i.state)}),()=>{let i=this._urlChangeListeners.indexOf(e);this._urlChangeListeners.splice(i,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(e="",i){this._urlChangeListeners.forEach(r=>r(e,i))}subscribe(e,i,r){return this._subject.subscribe({next:e,error:i??void 0,complete:r??void 0})}static normalizeQueryParams=yr;static joinWithSlash=ZC;static stripTrailingSlash=KC;static \u0275fac=function(i){return new(i||t)(G(cu))};static \u0275prov=C({token:t,factory:()=>xN(),providedIn:"root"})}return t})();function xN(){return new du(G(cu))}function SN(t,n){if(!t||!n.startsWith(t))return n;let e=n.substring(t.length);return e===""||["/",";","?","#"].includes(e[0])?e:n}function QC(t){return t.replace(/\/index.html$/,"")}function MN(t){if(new RegExp("^(https?:)?//").test(t)){let[,e]=t.split(/\/\/[^\/]+/);return e}return t}var Lt=(function(t){return t[t.Format=0]="Format",t[t.Standalone=1]="Standalone",t})(Lt||{}),Pe=(function(t){return t[t.Narrow=0]="Narrow",t[t.Abbreviated=1]="Abbreviated",t[t.Wide=2]="Wide",t[t.Short=3]="Short",t})(Pe||{}),tn=(function(t){return t[t.Short=0]="Short",t[t.Medium=1]="Medium",t[t.Long=2]="Long",t[t.Full=3]="Full",t})(tn||{}),Hi={Decimal:0,Group:1,List:2,PercentSign:3,PlusSign:4,MinusSign:5,Exponential:6,SuperscriptingExponent:7,PerMille:8,Infinity:9,NaN:10,TimeSeparator:11,CurrencyDecimal:12,CurrencyGroup:13};function ew(t){return hn(t)[lt.LocaleId]}function tw(t,n,e){let i=hn(t),r=[i[lt.DayPeriodsFormat],i[lt.DayPeriodsStandalone]],o=Tn(r,n);return Tn(o,e)}function nw(t,n,e){let i=hn(t),r=[i[lt.DaysFormat],i[lt.DaysStandalone]],o=Tn(r,n);return Tn(o,e)}function iw(t,n,e){let i=hn(t),r=[i[lt.MonthsFormat],i[lt.MonthsStandalone]],o=Tn(r,n);return Tn(o,e)}function rw(t,n){let i=hn(t)[lt.Eras];return Tn(i,n)}function Ks(t,n){let e=hn(t);return Tn(e[lt.DateFormat],n)}function Qs(t,n){let e=hn(t);return Tn(e[lt.TimeFormat],n)}function Zs(t,n){let i=hn(t)[lt.DateTimeFormat];return Tn(i,n)}function Xs(t,n){let e=hn(t),i=e[lt.NumberSymbols][n];if(typeof i>"u"){if(n===Hi.CurrencyDecimal)return e[lt.NumberSymbols][Hi.Decimal];if(n===Hi.CurrencyGroup)return e[lt.NumberSymbols][Hi.Group]}return i}function ow(t){if(!t[lt.ExtraData])throw new w(2303,!1)}function aw(t){let n=hn(t);return ow(n),(n[lt.ExtraData][2]||[]).map(i=>typeof i=="string"?Sg(i):[Sg(i[0]),Sg(i[1])])}function sw(t,n,e){let i=hn(t);ow(i);let r=[i[lt.ExtraData][0],i[lt.ExtraData][1]],o=Tn(r,n)||[];return Tn(o,e)||[]}function Tn(t,n){for(let e=n;e>-1;e--)if(typeof t[e]<"u")return t[e];throw new w(2304,!1)}function Sg(t){let[n,e]=t.split(":");return{hours:+n,minutes:+e}}var kN=/^(\d{4,})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/,uu={},TN=/((?:[^BEGHLMOSWYZabcdhmswyz']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|Y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|c{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/;function lw(t,n,e,i){let r=BN(t);n=ji(e,n)||n;let a=[],s;for(;n;)if(s=TN.exec(n),s){a=a.concat(s.slice(1));let d=a.pop();if(!d)break;n=d}else{a.push(n);break}let l=r.getTimezoneOffset();i&&(l=dw(i,l),r=VN(r,i));let c="";return a.forEach(d=>{let f=PN(d);c+=f?f(r,e,l):d==="''"?"'":d.replace(/(^'|'$)/g,"").replace(/''/g,"'")}),c}function gu(t,n,e){let i=new Date(0);return i.setFullYear(t,n,e),i.setHours(0,0,0),i}function ji(t,n){let e=ew(t);if(uu[e]??={},uu[e][n])return uu[e][n];let i="";switch(n){case"shortDate":i=Ks(t,tn.Short);break;case"mediumDate":i=Ks(t,tn.Medium);break;case"longDate":i=Ks(t,tn.Long);break;case"fullDate":i=Ks(t,tn.Full);break;case"shortTime":i=Qs(t,tn.Short);break;case"mediumTime":i=Qs(t,tn.Medium);break;case"longTime":i=Qs(t,tn.Long);break;case"fullTime":i=Qs(t,tn.Full);break;case"short":let r=ji(t,"shortTime"),o=ji(t,"shortDate");i=fu(Zs(t,tn.Short),[r,o]);break;case"medium":let a=ji(t,"mediumTime"),s=ji(t,"mediumDate");i=fu(Zs(t,tn.Medium),[a,s]);break;case"long":let l=ji(t,"longTime"),c=ji(t,"longDate");i=fu(Zs(t,tn.Long),[l,c]);break;case"full":let d=ji(t,"fullTime"),f=ji(t,"fullDate");i=fu(Zs(t,tn.Full),[d,f]);break}return i&&(uu[e][n]=i),i}function fu(t,n){return n&&(t=t.replace(/\{([^}]+)}/g,function(e,i){return n!=null&&i in n?n[i]:e})),t}function ni(t,n,e="-",i,r){let o="";(t<0||r&&t<=0)&&(r?t=-t+1:(t=-t,o=e));let a=String(t);for(;a.length<n;)a="0"+a;return i&&(a=a.slice(a.length-n)),o+a}function AN(t,n){return ni(t,3).substring(0,n)}function mt(t,n,e=0,i=!1,r=!1){return function(o,a){let s=RN(t,o);if((e>0||s>-e)&&(s+=e),t===3)s===0&&e===-12&&(s=12);else if(t===6)return AN(s,n);let l=Xs(a,Hi.MinusSign);return ni(s,n,l,i,r)}}function RN(t,n){switch(t){case 0:return n.getFullYear();case 1:return n.getMonth();case 2:return n.getDate();case 3:return n.getHours();case 4:return n.getMinutes();case 5:return n.getSeconds();case 6:return n.getMilliseconds();case 7:return n.getDay();default:throw new w(2301,!1)}}function Ue(t,n,e=Lt.Format,i=!1){return function(r,o){return NN(r,o,t,n,e,i)}}function NN(t,n,e,i,r,o){switch(e){case 2:return iw(n,r,i)[t.getMonth()];case 1:return nw(n,r,i)[t.getDay()];case 0:let a=t.getHours(),s=t.getMinutes();if(o){let c=aw(n),d=sw(n,r,i),f=c.findIndex(m=>{if(Array.isArray(m)){let[h,_]=m,D=a>=h.hours&&s>=h.minutes,E=a<_.hours||a===_.hours&&s<_.minutes;if(h.hours<_.hours){if(D&&E)return!0}else if(D||E)return!0}else if(m.hours===a&&m.minutes===s)return!0;return!1});if(f!==-1)return d[f]}return tw(n,r,i)[a<12?0:1];case 3:return rw(n,i)[t.getFullYear()<=0?0:1];default:let l=e;throw new w(2302,!1)}}function hu(t){return function(n,e,i){let r=-1*i,o=Xs(e,Hi.MinusSign),a=r>0?Math.floor(r/60):Math.ceil(r/60);switch(t){case 0:return(r>=0?"+":"")+ni(a,2,o)+ni(Math.abs(r%60),2,o);case 1:return"GMT"+(r>=0?"+":"")+ni(a,1,o);case 2:return"GMT"+(r>=0?"+":"")+ni(a,2,o)+":"+ni(Math.abs(r%60),2,o);case 3:return i===0?"Z":(r>=0?"+":"")+ni(a,2,o)+":"+ni(Math.abs(r%60),2,o);default:throw new w(2310,!1)}}}var ON=0,pu=4;function FN(t){let n=gu(t,ON,1).getDay();return gu(t,0,1+(n<=pu?pu:pu+7)-n)}function cw(t){let n=t.getDay(),e=n===0?-3:pu-n;return gu(t.getFullYear(),t.getMonth(),t.getDate()+e)}function Mg(t,n=!1){return function(e,i){let r;if(n){let o=new Date(e.getFullYear(),e.getMonth(),1).getDay()-1,a=e.getDate();r=1+Math.floor((a+o)/7)}else{let o=cw(e),a=FN(o.getFullYear()),s=o.getTime()-a.getTime();r=1+Math.round(s/6048e5)}return ni(r,t,Xs(i,Hi.MinusSign))}}function mu(t,n=!1){return function(e,i){let o=cw(e).getFullYear();return ni(o,t,Xs(i,Hi.MinusSign),n)}}var Ig={};function PN(t){if(Ig[t])return Ig[t];let n;switch(t){case"G":case"GG":case"GGG":n=Ue(3,Pe.Abbreviated);break;case"GGGG":n=Ue(3,Pe.Wide);break;case"GGGGG":n=Ue(3,Pe.Narrow);break;case"y":n=mt(0,1,0,!1,!0);break;case"yy":n=mt(0,2,0,!0,!0);break;case"yyy":n=mt(0,3,0,!1,!0);break;case"yyyy":n=mt(0,4,0,!1,!0);break;case"Y":n=mu(1);break;case"YY":n=mu(2,!0);break;case"YYY":n=mu(3);break;case"YYYY":n=mu(4);break;case"M":case"L":n=mt(1,1,1);break;case"MM":case"LL":n=mt(1,2,1);break;case"MMM":n=Ue(2,Pe.Abbreviated);break;case"MMMM":n=Ue(2,Pe.Wide);break;case"MMMMM":n=Ue(2,Pe.Narrow);break;case"LLL":n=Ue(2,Pe.Abbreviated,Lt.Standalone);break;case"LLLL":n=Ue(2,Pe.Wide,Lt.Standalone);break;case"LLLLL":n=Ue(2,Pe.Narrow,Lt.Standalone);break;case"w":n=Mg(1);break;case"ww":n=Mg(2);break;case"W":n=Mg(1,!0);break;case"d":n=mt(2,1);break;case"dd":n=mt(2,2);break;case"c":case"cc":n=mt(7,1);break;case"ccc":n=Ue(1,Pe.Abbreviated,Lt.Standalone);break;case"cccc":n=Ue(1,Pe.Wide,Lt.Standalone);break;case"ccccc":n=Ue(1,Pe.Narrow,Lt.Standalone);break;case"cccccc":n=Ue(1,Pe.Short,Lt.Standalone);break;case"E":case"EE":case"EEE":n=Ue(1,Pe.Abbreviated);break;case"EEEE":n=Ue(1,Pe.Wide);break;case"EEEEE":n=Ue(1,Pe.Narrow);break;case"EEEEEE":n=Ue(1,Pe.Short);break;case"a":case"aa":case"aaa":n=Ue(0,Pe.Abbreviated);break;case"aaaa":n=Ue(0,Pe.Wide);break;case"aaaaa":n=Ue(0,Pe.Narrow);break;case"b":case"bb":case"bbb":n=Ue(0,Pe.Abbreviated,Lt.Standalone,!0);break;case"bbbb":n=Ue(0,Pe.Wide,Lt.Standalone,!0);break;case"bbbbb":n=Ue(0,Pe.Narrow,Lt.Standalone,!0);break;case"B":case"BB":case"BBB":n=Ue(0,Pe.Abbreviated,Lt.Format,!0);break;case"BBBB":n=Ue(0,Pe.Wide,Lt.Format,!0);break;case"BBBBB":n=Ue(0,Pe.Narrow,Lt.Format,!0);break;case"h":n=mt(3,1,-12);break;case"hh":n=mt(3,2,-12);break;case"H":n=mt(3,1);break;case"HH":n=mt(3,2);break;case"m":n=mt(4,1);break;case"mm":n=mt(4,2);break;case"s":n=mt(5,1);break;case"ss":n=mt(5,2);break;case"S":n=mt(6,1);break;case"SS":n=mt(6,2);break;case"SSS":n=mt(6,3);break;case"Z":case"ZZ":case"ZZZ":n=hu(0);break;case"ZZZZZ":n=hu(3);break;case"O":case"OO":case"OOO":case"z":case"zz":case"zzz":n=hu(1);break;case"OOOO":case"ZZZZ":case"zzzz":n=hu(2);break;default:return null}return Ig[t]=n,n}function dw(t,n){t=t.replace(/:/g,"");let e=Date.parse("Jan 01, 1970 00:00:00 "+t)/6e4;return isNaN(e)?n:e}function LN(t,n){return t=new Date(t.getTime()),t.setMinutes(t.getMinutes()+n),t}function VN(t,n,e){let r=t.getTimezoneOffset(),o=dw(n,r);return LN(t,-1*(o-r))}function BN(t){if(XC(t))return t;if(typeof t=="number"&&!isNaN(t))return new Date(t);if(typeof t=="string"){if(t=t.trim(),/^(\d{4}(-\d{1,2}(-\d{1,2})?)?)$/.test(t)){let[r,o=1,a=1]=t.split("-").map(s=>+s);return gu(r,o-1,a)}let e=parseFloat(t);if(!isNaN(t-e))return new Date(e);let i;if(i=t.match(kN))return jN(i)}let n=new Date(t);if(!XC(n))throw new w(2311,!1);return n}function jN(t){let n=new Date(0),e=0,i=0,r=t[8]?n.setUTCFullYear:n.setFullYear,o=t[8]?n.setUTCHours:n.setHours;t[9]&&(e=Number(t[9]+t[10]),i=Number(t[9]+t[11])),r.call(n,Number(t[1]),Number(t[2])-1,Number(t[3]));let a=Number(t[4]||0)-e,s=Number(t[5]||0)-i,l=Number(t[6]||0),c=Math.floor(parseFloat("0."+(t[7]||0))*1e3);return o.call(n,a,s,l,c),n}function XC(t){return t instanceof Date&&!isNaN(t.valueOf())}var kg=/\s+/,JC=[],Tg=(()=>{class t{_ngEl;_renderer;initialClasses=JC;rawClass;stateMap=new Map;constructor(e,i){this._ngEl=e,this._renderer=i}set klass(e){this.initialClasses=e!=null?e.trim().split(kg):JC}set ngClass(e){this.rawClass=typeof e=="string"?e.trim().split(kg):e}ngDoCheck(){for(let i of this.initialClasses)this._updateState(i,!0);let e=this.rawClass;if(Array.isArray(e)||e instanceof Set)for(let i of e)this._updateState(i,!0);else if(e!=null)for(let i of Object.keys(e))this._updateState(i,!!e[i]);this._applyStateDiff()}_updateState(e,i){let r=this.stateMap.get(e);r!==void 0?(r.enabled!==i&&(r.changed=!0,r.enabled=i),r.touched=!0):this.stateMap.set(e,{enabled:i,changed:!0,touched:!0})}_applyStateDiff(){for(let e of this.stateMap){let i=e[0],r=e[1];r.changed?(this._toggleClass(i,r.enabled),r.changed=!1):r.touched||(r.enabled&&this._toggleClass(i,!1),this.stateMap.delete(i)),r.touched=!1}}_toggleClass(e,i){e=e.trim(),e.length>0&&e.split(kg).forEach(r=>{i?this._renderer.addClass(this._ngEl.nativeElement,r):this._renderer.removeClass(this._ngEl.nativeElement,r)})}static \u0275fac=function(i){return new(i||t)(he(P),he($e))};static \u0275dir=z({type:t,selectors:[["","ngClass",""]],inputs:{klass:[0,"class","klass"],ngClass:"ngClass"}})}return t})();var Ag=(()=>{class t{_viewContainerRef;_viewRef=null;ngTemplateOutletContext=null;ngTemplateOutlet=null;ngTemplateOutletInjector=null;injector=u(ne);constructor(e){this._viewContainerRef=e}ngOnChanges(e){if(this._shouldRecreateView(e)){let i=this._viewContainerRef;if(this._viewRef&&i.remove(i.indexOf(this._viewRef)),!this.ngTemplateOutlet){this._viewRef=null;return}let r=this._createContextForwardProxy();this._viewRef=i.createEmbeddedView(this.ngTemplateOutlet,r,{injector:this._getInjector()})}}_getInjector(){return this.ngTemplateOutletInjector==="outlet"?this.injector:this.ngTemplateOutletInjector??void 0}_shouldRecreateView(e){return!!e.ngTemplateOutlet||!!e.ngTemplateOutletInjector}_createContextForwardProxy(){return new Proxy({},{set:(e,i,r)=>this.ngTemplateOutletContext?Reflect.set(this.ngTemplateOutletContext,i,r):!1,get:(e,i,r)=>{if(this.ngTemplateOutletContext)return Reflect.get(this.ngTemplateOutletContext,i,r)}})}static \u0275fac=function(i){return new(i||t)(he(Ct))};static \u0275dir=z({type:t,selectors:[["","ngTemplateOutlet",""]],inputs:{ngTemplateOutletContext:"ngTemplateOutletContext",ngTemplateOutlet:"ngTemplateOutlet",ngTemplateOutletInjector:"ngTemplateOutletInjector"},features:[Le]})}return t})();function HN(t,n){return new w(2100,!1)}var zN="mediumDate",uw=new b(""),fw=new b(""),Rg=(()=>{class t{locale;defaultTimezone;defaultOptions;constructor(e,i,r){this.locale=e,this.defaultTimezone=i,this.defaultOptions=r}transform(e,i,r,o){if(e==null||e===""||e!==e)return null;try{let a=i??this.defaultOptions?.dateFormat??zN,s=r??this.defaultOptions?.timezone??this.defaultTimezone??void 0;return lw(e,a,o||this.locale,s)}catch(a){throw HN(t,a.message)}}static \u0275fac=function(i){return new(i||t)(he(go,16),he(uw,24),he(fw,24))};static \u0275pipe=lg({name:"date",type:t,pure:!0})}return t})();var Wt=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=$({type:t});static \u0275inj=H({})}return t})();function _u(t,n){n=encodeURIComponent(n);for(let e of t.split(";")){let i=e.indexOf("="),[r,o]=i==-1?[e,""]:[e.slice(0,i),e.slice(i+1)];if(r.trim()===n)return decodeURIComponent(o)}return null}var _o=class{};var Ng="browser";function hw(t){return t===Ng}var Js=class{_doc;constructor(n){this._doc=n}manager},vu=(()=>{class t extends Js{constructor(e){super(e)}supports(e){return!0}addEventListener(e,i,r,o){return e.addEventListener(i,r,o),()=>this.removeEventListener(e,i,r,o)}removeEventListener(e,i,r,o){return e.removeEventListener(i,r,o)}static \u0275fac=function(i){return new(i||t)(G(W))};static \u0275prov=C({token:t,factory:t.\u0275fac})}return t})(),Du=new b(""),Lg=(()=>{class t{_zone;_plugins;_eventNameToPlugin=new Map;constructor(e,i){this._zone=i,e.forEach(a=>{a.manager=this});let r=e.filter(a=>!(a instanceof vu));this._plugins=r.slice().reverse();let o=e.find(a=>a instanceof vu);o&&this._plugins.push(o)}addEventListener(e,i,r,o){return this._findPluginFor(i).addEventListener(e,i,r,o)}getZone(){return this._zone}_findPluginFor(e){let i=this._eventNameToPlugin.get(e);if(i)return i;if(i=this._plugins.find(o=>o.supports(e)),!i)throw new w(5101,!1);return this._eventNameToPlugin.set(e,i),i}static \u0275fac=function(i){return new(i||t)(G(Du),G(A))};static \u0275prov=C({token:t,factory:t.\u0275fac})}return t})(),Og="ng-app-id";function pw(t){for(let n of t)n.remove()}function gw(t,n){let e=n.createElement("style");return e.textContent=t,e}function $N(t,n,e,i){let r=t.head?.querySelectorAll(`style[${Og}="${n}"],link[${Og}="${n}"]`);if(r)for(let o of r)o.removeAttribute(Og),o instanceof HTMLLinkElement?i.set(o.href.slice(o.href.lastIndexOf("/")+1),{usage:0,elements:[o]}):o.textContent&&e.set(o.textContent,{usage:0,elements:[o]})}function Pg(t,n){let e=n.createElement("link");return e.setAttribute("rel","stylesheet"),e.setAttribute("href",t),e}var Vg=(()=>{class t{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(e,i,r,o={}){this.doc=e,this.appId=i,this.nonce=r,$N(e,i,this.inline,this.external),this.hosts.add(e.head)}addStyles(e,i){for(let r of e)this.addUsage(r,this.inline,gw);i?.forEach(r=>this.addUsage(r,this.external,Pg))}removeStyles(e,i){for(let r of e)this.removeUsage(r,this.inline);i?.forEach(r=>this.removeUsage(r,this.external))}addUsage(e,i,r){let o=i.get(e);o?o.usage++:i.set(e,{usage:1,elements:[...this.hosts].map(a=>this.addElement(a,r(e,this.doc)))})}removeUsage(e,i){let r=i.get(e);r&&(r.usage--,r.usage<=0&&(pw(r.elements),i.delete(e)))}ngOnDestroy(){for(let[,{elements:e}]of[...this.inline,...this.external])pw(e);this.hosts.clear()}addHost(e){this.hosts.add(e);for(let[i,{elements:r}]of this.inline)r.push(this.addElement(e,gw(i,this.doc)));for(let[i,{elements:r}]of this.external)r.push(this.addElement(e,Pg(i,this.doc)))}removeHost(e){this.hosts.delete(e)}addElement(e,i){return this.nonce&&i.setAttribute("nonce",this.nonce),e.appendChild(i)}static \u0275fac=function(i){return new(i||t)(G(W),G(_r),G(mo,8),G(ho))};static \u0275prov=C({token:t,factory:t.\u0275fac})}return t})(),Fg={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},Bg=/%COMP%/g;var vw="%COMP%",GN=`_nghost-${vw}`,WN=`_ngcontent-${vw}`,qN=!0,YN=new b("",{factory:()=>qN});function KN(t){return WN.replace(Bg,t)}function QN(t){return GN.replace(Bg,t)}function yw(t,n){return n.map(e=>e.replace(Bg,t))}var nl=(()=>{class t{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;constructor(e,i,r,o,a,s,l=null,c=null){this.eventManager=e,this.sharedStylesHost=i,this.appId=r,this.removeStylesOnCompDestroy=o,this.doc=a,this.ngZone=s,this.nonce=l,this.tracingService=c,this.defaultRenderer=new el(e,a,s,this.tracingService)}createRenderer(e,i){if(!e||!i)return this.defaultRenderer;let r=this.getOrCreateRenderer(e,i);return r instanceof bu?r.applyToHost(e):r instanceof tl&&r.applyStyles(),r}getOrCreateRenderer(e,i){let r=this.rendererByCompId,o=r.get(i.id);if(!o){let a=this.doc,s=this.ngZone,l=this.eventManager,c=this.sharedStylesHost,d=this.removeStylesOnCompDestroy,f=this.tracingService;switch(i.encapsulation){case Kn.Emulated:o=new bu(l,c,i,this.appId,d,a,s,f);break;case Kn.ShadowDom:return new yu(l,e,i,a,s,this.nonce,f,c);case Kn.ExperimentalIsolatedShadowDom:return new yu(l,e,i,a,s,this.nonce,f);default:o=new tl(l,c,i,d,a,s,f);break}r.set(i.id,o)}return o}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(e){this.rendererByCompId.delete(e)}static \u0275fac=function(i){return new(i||t)(G(Lg),G(Vg),G(_r),G(YN),G(W),G(A),G(mo),G(Zn,8))};static \u0275prov=C({token:t,factory:t.\u0275fac})}return t})(),el=class{eventManager;doc;ngZone;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(n,e,i,r){this.eventManager=n,this.doc=e,this.ngZone=i,this.tracingService=r}destroy(){}destroyNode=null;createElement(n,e){return e?this.doc.createElementNS(Fg[e]||e,n):this.doc.createElement(n)}createComment(n){return this.doc.createComment(n)}createText(n){return this.doc.createTextNode(n)}appendChild(n,e){(_w(n)?n.content:n).appendChild(e)}insertBefore(n,e,i){n&&(_w(n)?n.content:n).insertBefore(e,i)}removeChild(n,e){e.remove()}selectRootElement(n,e){let i=typeof n=="string"?this.doc.querySelector(n):n;if(!i)throw new w(-5104,!1);return e||(i.textContent=""),i}parentNode(n){return n.parentNode}nextSibling(n){return n.nextSibling}setAttribute(n,e,i,r){if(r){e=r+":"+e;let o=Fg[r];o?n.setAttributeNS(o,e,i):n.setAttribute(e,i)}else n.setAttribute(e,i)}removeAttribute(n,e,i){if(i){let r=Fg[i];r?n.removeAttributeNS(r,e):n.removeAttribute(`${i}:${e}`)}else n.removeAttribute(e)}addClass(n,e){n.classList.add(e)}removeClass(n,e){n.classList.remove(e)}setStyle(n,e,i,r){r&(yi.DashCase|yi.Important)?n.style.setProperty(e,i,r&yi.Important?"important":""):n.style[e]=i}removeStyle(n,e,i){i&yi.DashCase?n.style.removeProperty(e):n.style[e]=""}setProperty(n,e,i){n!=null&&(n[e]=i)}setValue(n,e){n.nodeValue=e}listen(n,e,i,r){if(typeof n=="string"&&(n=mn().getGlobalEventTarget(this.doc,n),!n))throw new w(5102,!1);let o=this.decoratePreventDefault(i);return this.tracingService?.wrapEventListener&&(o=this.tracingService.wrapEventListener(n,e,o)),this.eventManager.addEventListener(n,e,o,r)}decoratePreventDefault(n){return e=>{if(e==="__ngUnwrap__")return n;n(e)===!1&&e.preventDefault()}}};function _w(t){return t.tagName==="TEMPLATE"&&t.content!==void 0}var yu=class extends el{hostEl;sharedStylesHost;shadowRoot;constructor(n,e,i,r,o,a,s,l){super(n,r,o,s),this.hostEl=e,this.sharedStylesHost=l,this.shadowRoot=e.attachShadow({mode:"open"}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let c=i.styles;c=yw(i.id,c);for(let f of c){let m=document.createElement("style");a&&m.setAttribute("nonce",a),m.textContent=f,this.shadowRoot.appendChild(m)}let d=i.getExternalStyles?.();if(d)for(let f of d){let m=Pg(f,r);a&&m.setAttribute("nonce",a),this.shadowRoot.appendChild(m)}}nodeOrShadowRoot(n){return n===this.hostEl?this.shadowRoot:n}appendChild(n,e){return super.appendChild(this.nodeOrShadowRoot(n),e)}insertBefore(n,e,i){return super.insertBefore(this.nodeOrShadowRoot(n),e,i)}removeChild(n,e){return super.removeChild(null,e)}parentNode(n){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(n)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot)}},tl=class extends el{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(n,e,i,r,o,a,s,l){super(n,o,a,s),this.sharedStylesHost=e,this.removeStylesOnCompDestroy=r;let c=i.styles;this.styles=l?yw(l,c):c,this.styleUrls=i.getExternalStyles?.(l)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&pr.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},bu=class extends tl{contentAttr;hostAttr;constructor(n,e,i,r,o,a,s,l){let c=r+"-"+i.id;super(n,e,i,o,a,s,l,c),this.contentAttr=KN(c),this.hostAttr=QN(c)}applyToHost(n){this.applyStyles(),this.setAttribute(n,this.hostAttr,"")}createElement(n,e){let i=super.createElement(n,e);return super.setAttribute(i,this.contentAttr,""),i}};var Cu=class t extends Ys{supportsDOMEvents=!0;static makeCurrent(){xg(new t)}onAndCancel(n,e,i,r){return n.addEventListener(e,i,r),()=>{n.removeEventListener(e,i,r)}}dispatchEvent(n,e){n.dispatchEvent(e)}remove(n){n.remove()}createElement(n,e){return e=e||this.getDefaultDocument(),e.createElement(n)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(n){return n.nodeType===Node.ELEMENT_NODE}isShadowRoot(n){return n instanceof DocumentFragment}getGlobalEventTarget(n,e){return e==="window"?window:e==="document"?n:e==="body"?n.body:null}getBaseHref(n){let e=ZN();return e==null?null:XN(e)}resetBaseElement(){il=null}getUserAgent(){return window.navigator.userAgent}getCookie(n){return _u(document.cookie,n)}},il=null;function ZN(){return il=il||document.head.querySelector("base"),il?il.getAttribute("href"):null}function XN(t){return new URL(t,document.baseURI).pathname}var wu=class{addToWindow(n){Dt.getAngularTestability=(i,r=!0)=>{let o=n.findTestabilityInTree(i,r);if(o==null)throw new w(5103,!1);return o},Dt.getAllAngularTestabilities=()=>n.getAllTestabilities(),Dt.getAllAngularRootElements=()=>n.getAllRootElements();let e=i=>{let r=Dt.getAllAngularTestabilities(),o=r.length,a=function(){o--,o==0&&i()};r.forEach(s=>{s.whenStable(a)})};Dt.frameworkStabilizers||(Dt.frameworkStabilizers=[]),Dt.frameworkStabilizers.push(e)}findTestabilityInTree(n,e,i){if(e==null)return null;let r=n.getTestability(e);return r??(i?mn().isShadowRoot(e)?this.findTestabilityInTree(n,e.host,!0):this.findTestabilityInTree(n,e.parentElement,!0):null)}},JN=(()=>{class t{build(){return new XMLHttpRequest}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac})}return t})(),bw=["alt","control","meta","shift"],eO={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},tO={alt:t=>t.altKey,control:t=>t.ctrlKey,meta:t=>t.metaKey,shift:t=>t.shiftKey},Dw=(()=>{class t extends Js{constructor(e){super(e)}supports(e){return t.parseEventName(e)!=null}addEventListener(e,i,r,o){let a=t.parseEventName(i),s=t.eventCallback(a.fullKey,r,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>mn().onAndCancel(e,a.domEventName,s,o))}static parseEventName(e){let i=e.toLowerCase().split("."),r=i.shift();if(i.length===0||!(r==="keydown"||r==="keyup"))return null;let o=t._normalizeKey(i.pop()),a="",s=i.indexOf("code");if(s>-1&&(i.splice(s,1),a="code."),bw.forEach(c=>{let d=i.indexOf(c);d>-1&&(i.splice(d,1),a+=c+".")}),a+=o,i.length!=0||o.length===0)return null;let l={};return l.domEventName=r,l.fullKey=a,l}static matchEventFullKeyCode(e,i){let r=eO[e.key]||e.key,o="";return i.indexOf("code.")>-1&&(r=e.code,o="code."),r==null||!r?!1:(r=r.toLowerCase(),r===" "?r="space":r==="."&&(r="dot"),bw.forEach(a=>{if(a!==r){let s=tO[a];s(e)&&(o+=a+".")}}),o+=r,o===i)}static eventCallback(e,i,r){return o=>{t.matchEventFullKeyCode(o,e)&&r.runGuarded(()=>i(o))}}static _normalizeKey(e){return e==="esc"?"escape":e}static \u0275fac=function(i){return new(i||t)(G(W))};static \u0275prov=C({token:t,factory:t.\u0275fac})}return t})();function nO(){Cu.makeCurrent()}function iO(){return new Zt}function rO(){return Np(document),document}var oO=[{provide:ho,useValue:Ng},{provide:jd,useValue:nO,multi:!0},{provide:W,useFactory:rO}],jg=wg(UC,"browser",oO);var aO=[{provide:tu,useClass:wu},{provide:eu,useClass:Us},{provide:Us,useClass:Us}],sO=[{provide:vs,useValue:"root"},{provide:Zt,useFactory:iO},{provide:Du,useClass:vu,multi:!0},{provide:Du,useClass:Dw,multi:!0},nl,Vg,Lg,{provide:rt,useExisting:nl},{provide:_o,useClass:JN},[]],rl=(()=>{class t{constructor(){}static \u0275fac=function(i){return new(i||t)};static \u0275mod=$({type:t});static \u0275inj=H({providers:[...sO,...aO],imports:[Wt,$C]})}return t})();var br=class t{headers;normalizedNames=new Map;lazyInit;lazyUpdate=null;constructor(n){n?typeof n=="string"?this.lazyInit=()=>{this.headers=new Map,n.split(`
`).forEach(e=>{let i=e.indexOf(":");if(i>0){let r=e.slice(0,i),o=e.slice(i+1).trim();this.addHeaderEntry(r,o)}})}:typeof Headers<"u"&&n instanceof Headers?(this.headers=new Map,n.forEach((e,i)=>{this.addHeaderEntry(i,e)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(n).forEach(([e,i])=>{this.setHeaderEntries(e,i)})}:this.headers=new Map}has(n){return this.init(),this.headers.has(n.toLowerCase())}get(n){this.init();let e=this.headers.get(n.toLowerCase());return e&&e.length>0?e[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(n){return this.init(),this.headers.get(n.toLowerCase())||null}append(n,e){return this.clone({name:n,value:e,op:"a"})}set(n,e){return this.clone({name:n,value:e,op:"s"})}delete(n,e){return this.clone({name:n,value:e,op:"d"})}maybeSetNormalizedName(n,e){this.normalizedNames.has(e)||this.normalizedNames.set(e,n)}init(){this.lazyInit&&(this.lazyInit instanceof t?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(n=>this.applyUpdate(n)),this.lazyUpdate=null))}copyFrom(n){n.init(),Array.from(n.headers.keys()).forEach(e=>{this.headers.set(e,n.headers.get(e)),this.normalizedNames.set(e,n.normalizedNames.get(e))})}clone(n){let e=new t;return e.lazyInit=this.lazyInit&&this.lazyInit instanceof t?this.lazyInit:this,e.lazyUpdate=(this.lazyUpdate||[]).concat([n]),e}applyUpdate(n){let e=n.name.toLowerCase();switch(n.op){case"a":case"s":let i=n.value;if(typeof i=="string"&&(i=[i]),i.length===0)return;this.maybeSetNormalizedName(n.name,e);let r=(n.op==="a"?this.headers.get(e):void 0)||[];r.push(...i),this.headers.set(e,r);break;case"d":let o=n.value;if(!o)this.headers.delete(e),this.normalizedNames.delete(e);else{let a=this.headers.get(e);if(!a)return;a=a.filter(s=>o.indexOf(s)===-1),a.length===0?(this.headers.delete(e),this.normalizedNames.delete(e)):this.headers.set(e,a)}break}}addHeaderEntry(n,e){let i=n.toLowerCase();this.maybeSetNormalizedName(n,i),this.headers.has(i)?this.headers.get(i).push(e):this.headers.set(i,[e])}setHeaderEntries(n,e){let i=(Array.isArray(e)?e:[e]).map(o=>o.toString()),r=n.toLowerCase();this.headers.set(r,i),this.maybeSetNormalizedName(n,r)}forEach(n){this.init(),Array.from(this.normalizedNames.keys()).forEach(e=>n(this.normalizedNames.get(e),this.headers.get(e)))}};var zg=class{map=new Map;set(n,e){return this.map.set(n,e),this}get(n){return this.map.has(n)||this.map.set(n,n.defaultValue()),this.map.get(n)}delete(n){return this.map.delete(n),this}has(n){return this.map.has(n)}keys(){return this.map.keys()}},Ug=class{encodeKey(n){return Cw(n)}encodeValue(n){return Cw(n)}decodeKey(n){return decodeURIComponent(n)}decodeValue(n){return decodeURIComponent(n)}};function lO(t,n){let e=new Map;return t.length>0&&t.replace(/^\?/,"").split("&").forEach(r=>{let o=r.indexOf("="),[a,s]=o==-1?[n.decodeKey(r),""]:[n.decodeKey(r.slice(0,o)),n.decodeValue(r.slice(o+1))],l=e.get(a)||[];l.push(s),e.set(a,l)}),e}var cO=/%(\d[a-f0-9])/gi,dO={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function Cw(t){return encodeURIComponent(t).replace(cO,(n,e)=>dO[e]??n)}function Eu(t){return`${t}`}var zi=class t{map;encoder;updates=null;cloneFrom=null;constructor(n={}){if(this.encoder=n.encoder||new Ug,n.fromString){if(n.fromObject)throw new w(2805,!1);this.map=lO(n.fromString,this.encoder)}else n.fromObject?(this.map=new Map,Object.keys(n.fromObject).forEach(e=>{let i=n.fromObject[e],r=Array.isArray(i)?i.map(Eu):[Eu(i)];this.map.set(e,r)})):this.map=null}has(n){return this.init(),this.map.has(n)}get(n){this.init();let e=this.map.get(n);return e?e[0]:null}getAll(n){return this.init(),this.map.get(n)||null}keys(){return this.init(),Array.from(this.map.keys())}append(n,e){return this.clone({param:n,value:e,op:"a"})}appendAll(n){let e=[];return Object.keys(n).forEach(i=>{let r=n[i];Array.isArray(r)?r.forEach(o=>{e.push({param:i,value:o,op:"a"})}):e.push({param:i,value:r,op:"a"})}),this.clone(e)}set(n,e){return this.clone({param:n,value:e,op:"s"})}delete(n,e){return this.clone({param:n,value:e,op:"d"})}toString(){return this.init(),this.keys().map(n=>{let e=this.encoder.encodeKey(n);return this.map.get(n).map(i=>e+"="+this.encoder.encodeValue(i)).join("&")}).filter(n=>n!=="").join("&")}clone(n){let e=new t({encoder:this.encoder});return e.cloneFrom=this.cloneFrom||this,e.updates=(this.updates||[]).concat(n),e}init(){this.map===null&&(this.map=new Map),this.cloneFrom!==null&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(n=>this.map.set(n,this.cloneFrom.map.get(n))),this.updates.forEach(n=>{switch(n.op){case"a":case"s":let e=(n.op==="a"?this.map.get(n.param):void 0)||[];e.push(Eu(n.value)),this.map.set(n.param,e);break;case"d":if(n.value!==void 0){let i=this.map.get(n.param)||[],r=i.indexOf(Eu(n.value));r!==-1&&i.splice(r,1),i.length>0?this.map.set(n.param,i):this.map.delete(n.param)}else{this.map.delete(n.param);break}}}),this.cloneFrom=this.updates=null)}};function uO(t){switch(t){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}function ww(t){return typeof ArrayBuffer<"u"&&t instanceof ArrayBuffer}function Ew(t){return typeof Blob<"u"&&t instanceof Blob}function xw(t){return typeof FormData<"u"&&t instanceof FormData}function fO(t){return typeof URLSearchParams<"u"&&t instanceof URLSearchParams}var Sw="Content-Type",Mw="Accept",Iw="text/plain",kw="application/json",hO=`${kw}, ${Iw}, */*`,ga=class t{url;body=null;headers;context;reportProgress=!1;withCredentials=!1;credentials;keepalive=!1;cache;priority;mode;redirect;referrer;integrity;referrerPolicy;responseType="json";method;params;urlWithParams;transferCache;timeout;constructor(n,e,i,r){this.url=e,this.method=n.toUpperCase();let o;if(uO(this.method)||r?(this.body=i!==void 0?i:null,o=r):o=i,o){if(this.reportProgress=!!o.reportProgress,this.withCredentials=!!o.withCredentials,this.keepalive=!!o.keepalive,o.responseType&&(this.responseType=o.responseType),o.headers&&(this.headers=o.headers),o.context&&(this.context=o.context),o.params&&(this.params=o.params),o.priority&&(this.priority=o.priority),o.cache&&(this.cache=o.cache),o.credentials&&(this.credentials=o.credentials),typeof o.timeout=="number"){if(o.timeout<1||!Number.isInteger(o.timeout))throw new w(2822,"");this.timeout=o.timeout}o.mode&&(this.mode=o.mode),o.redirect&&(this.redirect=o.redirect),o.integrity&&(this.integrity=o.integrity),o.referrer&&(this.referrer=o.referrer),o.referrerPolicy&&(this.referrerPolicy=o.referrerPolicy),this.transferCache=o.transferCache}if(this.headers??=new br,this.context??=new zg,!this.params)this.params=new zi,this.urlWithParams=e;else{let a=this.params.toString();if(a.length===0)this.urlWithParams=e;else{let s=e.indexOf("?"),l=s===-1?"?":s<e.length-1?"&":"";this.urlWithParams=e+l+a}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||ww(this.body)||Ew(this.body)||xw(this.body)||fO(this.body)?this.body:this.body instanceof zi?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||xw(this.body)?null:Ew(this.body)?this.body.type||null:ww(this.body)?null:typeof this.body=="string"?Iw:this.body instanceof zi?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?kw:null}clone(n={}){let e=n.method||this.method,i=n.url||this.url,r=n.responseType||this.responseType,o=n.keepalive??this.keepalive,a=n.priority||this.priority,s=n.cache||this.cache,l=n.mode||this.mode,c=n.redirect||this.redirect,d=n.credentials||this.credentials,f=n.referrer||this.referrer,m=n.integrity||this.integrity,h=n.referrerPolicy||this.referrerPolicy,_=n.transferCache??this.transferCache,D=n.timeout??this.timeout,E=n.body!==void 0?n.body:this.body,k=n.withCredentials??this.withCredentials,oe=n.reportProgress??this.reportProgress,Ae=n.headers||this.headers,ye=n.params||this.params,yn=n.context??this.context;return n.setHeaders!==void 0&&(Ae=Object.keys(n.setHeaders).reduce((Nt,Je)=>Nt.set(Je,n.setHeaders[Je]),Ae)),n.setParams&&(ye=Object.keys(n.setParams).reduce((Nt,Je)=>Nt.set(Je,n.setParams[Je]),ye)),new t(e,i,E,{params:ye,headers:Ae,context:yn,reportProgress:oe,responseType:r,withCredentials:k,transferCache:_,keepalive:o,cache:s,priority:a,timeout:D,mode:l,redirect:c,credentials:d,referrer:f,integrity:m,referrerPolicy:h})}},vo=(function(t){return t[t.Sent=0]="Sent",t[t.UploadProgress=1]="UploadProgress",t[t.ResponseHeader=2]="ResponseHeader",t[t.DownloadProgress=3]="DownloadProgress",t[t.Response=4]="Response",t[t.User=5]="User",t})(vo||{}),ol=class{headers;status;statusText;url;ok;type;redirected;responseType;constructor(n,e=200,i="OK"){this.headers=n.headers||new br,this.status=n.status!==void 0?n.status:e,this.statusText=n.statusText||i,this.url=n.url||null,this.redirected=n.redirected,this.responseType=n.responseType,this.ok=this.status>=200&&this.status<300}},$g=class t extends ol{constructor(n={}){super(n)}type=vo.ResponseHeader;clone(n={}){return new t({headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0})}},al=class t extends ol{body;constructor(n={}){super(n),this.body=n.body!==void 0?n.body:null}type=vo.Response;clone(n={}){return new t({body:n.body!==void 0?n.body:this.body,headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0,redirected:n.redirected??this.redirected,responseType:n.responseType??this.responseType})}},_a=class extends ol{name="HttpErrorResponse";message;error;ok=!1;constructor(n){super(n,0,"Unknown Error"),this.status>=200&&this.status<300?this.message=`Http failure during parsing for ${n.url||"(unknown url)"}`:this.message=`Http failure response for ${n.url||"(unknown url)"}: ${n.status} ${n.statusText}`,this.error=n.error||null}},mO=200,pO=204;var gO=/^\)\]\}',?\n/;var _O=(()=>{class t{xhrFactory;tracingService=u(Zn,{optional:!0});constructor(e){this.xhrFactory=e}maybePropagateTrace(e){return this.tracingService?.propagate?this.tracingService.propagate(e):e}handle(e){if(e.method==="JSONP")throw new w(-2800,!1);let i=this.xhrFactory;return nt(null).pipe(zn(()=>new ue(o=>{let a=i.build();if(a.open(e.method,e.urlWithParams),e.withCredentials&&(a.withCredentials=!0),e.headers.forEach((E,k)=>a.setRequestHeader(E,k.join(","))),e.headers.has(Mw)||a.setRequestHeader(Mw,hO),!e.headers.has(Sw)){let E=e.detectContentTypeHeader();E!==null&&a.setRequestHeader(Sw,E)}if(e.timeout&&(a.timeout=e.timeout),e.responseType){let E=e.responseType.toLowerCase();a.responseType=E!=="json"?E:"text"}let s=e.serializeBody(),l=null,c=()=>{if(l!==null)return l;let E=a.statusText||"OK",k=new br(a.getAllResponseHeaders()),oe=a.responseURL||e.url;return l=new $g({headers:k,status:a.status,statusText:E,url:oe}),l},d=this.maybePropagateTrace(()=>{let{headers:E,status:k,statusText:oe,url:Ae}=c(),ye=null;k!==pO&&(ye=typeof a.response>"u"?a.responseText:a.response),k===0&&(k=ye?mO:0);let yn=k>=200&&k<300;if(e.responseType==="json"&&typeof ye=="string"){let Nt=ye;ye=ye.replace(gO,"");try{ye=ye!==""?JSON.parse(ye):null}catch(Je){ye=Nt,yn&&(yn=!1,ye={error:Je,text:ye})}}yn?(o.next(new al({body:ye,headers:E,status:k,statusText:oe,url:Ae||void 0})),o.complete()):o.error(new _a({error:ye,headers:E,status:k,statusText:oe,url:Ae||void 0}))}),f=this.maybePropagateTrace(E=>{let{url:k}=c(),oe=new _a({error:E,status:a.status||0,statusText:a.statusText||"Unknown Error",url:k||void 0});o.error(oe)}),m=f;e.timeout&&(m=this.maybePropagateTrace(E=>{let{url:k}=c(),oe=new _a({error:new DOMException("Request timed out","TimeoutError"),status:a.status||0,statusText:a.statusText||"Request timeout",url:k||void 0});o.error(oe)}));let h=!1,_=this.maybePropagateTrace(E=>{h||(o.next(c()),h=!0);let k={type:vo.DownloadProgress,loaded:E.loaded};E.lengthComputable&&(k.total=E.total),e.responseType==="text"&&a.responseText&&(k.partialText=a.responseText),o.next(k)}),D=this.maybePropagateTrace(E=>{let k={type:vo.UploadProgress,loaded:E.loaded};E.lengthComputable&&(k.total=E.total),o.next(k)});return a.addEventListener("load",d),a.addEventListener("error",f),a.addEventListener("timeout",m),a.addEventListener("abort",f),e.reportProgress&&(a.addEventListener("progress",_),s!==null&&a.upload&&a.upload.addEventListener("progress",D)),a.send(s),o.next({type:vo.Sent}),()=>{a.removeEventListener("error",f),a.removeEventListener("abort",f),a.removeEventListener("load",d),a.removeEventListener("timeout",m),e.reportProgress&&(a.removeEventListener("progress",_),s!==null&&a.upload&&a.upload.removeEventListener("progress",D)),a.readyState!==a.DONE&&a.abort()}})))}static \u0275fac=function(i){return new(i||t)(G(_o))};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function vO(t,n){return n(t)}function yO(t,n,e){return(i,r)=>Zo(e,()=>n(i,o=>t(o,r)))}var bO=new b("",{factory:()=>[]}),Tw=new b(""),DO=new b("",{factory:()=>!0});var CO=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:function(i){let r=null;return i?r=new(i||t):r=G(_O),r},providedIn:"root"})}return t})();var wO=(()=>{class t{backend;injector;chain=null;pendingTasks=u(fd);contributeToStability=u(DO);constructor(e,i){this.backend=e,this.injector=i}handle(e){if(this.chain===null){let i=Array.from(new Set([...this.injector.get(bO),...this.injector.get(Tw,[])]));this.chain=i.reduceRight((r,o)=>yO(r,o,this.injector),vO)}if(this.contributeToStability){let i=this.pendingTasks.add();return this.chain(e,r=>this.backend.handle(r)).pipe(os(i))}else return this.chain(e,i=>this.backend.handle(i))}static \u0275fac=function(i){return new(i||t)(G(CO),G(ot))};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),EO=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:function(i){let r=null;return i?r=new(i||t):r=G(wO),r},providedIn:"root"})}return t})();function Hg(t,n){return{body:n,headers:t.headers,context:t.context,observe:t.observe,params:t.params,reportProgress:t.reportProgress,responseType:t.responseType,withCredentials:t.withCredentials,credentials:t.credentials,transferCache:t.transferCache,timeout:t.timeout,keepalive:t.keepalive,priority:t.priority,cache:t.cache,mode:t.mode,redirect:t.redirect,integrity:t.integrity,referrer:t.referrer,referrerPolicy:t.referrerPolicy}}var Gg=(()=>{class t{handler;constructor(e){this.handler=e}request(e,i,r={}){let o;if(e instanceof ga)o=e;else{let l;r.headers instanceof br?l=r.headers:l=new br(r.headers);let c;r.params&&(r.params instanceof zi?c=r.params:c=new zi({fromObject:r.params})),o=new ga(e,i,r.body!==void 0?r.body:null,{headers:l,context:r.context,params:c,reportProgress:r.reportProgress,responseType:r.responseType||"json",withCredentials:r.withCredentials,transferCache:r.transferCache,keepalive:r.keepalive,priority:r.priority,cache:r.cache,mode:r.mode,redirect:r.redirect,credentials:r.credentials,referrer:r.referrer,referrerPolicy:r.referrerPolicy,integrity:r.integrity,timeout:r.timeout})}let a=nt(o).pipe(Ih(l=>this.handler.handle(l)));if(e instanceof ga||r.observe==="events")return a;let s=a.pipe(He(l=>l instanceof al));switch(r.observe||"body"){case"body":switch(o.responseType){case"arraybuffer":return s.pipe(Se(l=>{if(l.body!==null&&!(l.body instanceof ArrayBuffer))throw new w(2806,!1);return l.body}));case"blob":return s.pipe(Se(l=>{if(l.body!==null&&!(l.body instanceof Blob))throw new w(2807,!1);return l.body}));case"text":return s.pipe(Se(l=>{if(l.body!==null&&typeof l.body!="string")throw new w(2808,!1);return l.body}));default:return s.pipe(Se(l=>l.body))}case"response":return s;default:throw new w(2809,!1)}}delete(e,i={}){return this.request("DELETE",e,i)}get(e,i={}){return this.request("GET",e,i)}head(e,i={}){return this.request("HEAD",e,i)}jsonp(e,i){return this.request("JSONP",e,{params:new zi().append(i,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(e,i={}){return this.request("OPTIONS",e,i)}patch(e,i,r={}){return this.request("PATCH",e,Hg(r,i))}post(e,i,r={}){return this.request("POST",e,Hg(r,i))}put(e,i,r={}){return this.request("PUT",e,Hg(r,i))}static \u0275fac=function(i){return new(i||t)(G(EO))};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var sl=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:function(i){let r=null;return i?r=new(i||t):r=G(SO),r},providedIn:"root"})}return t})(),SO=(()=>{class t extends sl{_doc;constructor(e){super(),this._doc=e}sanitize(e,i){if(i==null)return null;switch(e){case Tt.NONE:return i;case Tt.HTML:return po(i,"HTML")?Li(i):Bp(this._doc,String(i)).toString();case Tt.STYLE:return po(i,"Style")?Li(i):i;case Tt.SCRIPT:if(po(i,"Script"))return Li(i);throw new w(5200,!1);case Tt.URL:return po(i,"URL")?Li(i):Ud(String(i));case Tt.RESOURCE_URL:if(po(i,"ResourceURL"))return Li(i);throw new w(5201,!1);default:throw new w(5202,!1)}}bypassSecurityTrustHtml(e){return Op(e)}bypassSecurityTrustStyle(e){return Fp(e)}bypassSecurityTrustScript(e){return Pp(e)}bypassSecurityTrustUrl(e){return Lp(e)}bypassSecurityTrustResourceUrl(e){return Vp(e)}static \u0275fac=function(i){return new(i||t)(G(W))};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var ae=(function(t){return t[t.State=0]="State",t[t.Transition=1]="Transition",t[t.Sequence=2]="Sequence",t[t.Group=3]="Group",t[t.Animate=4]="Animate",t[t.Keyframes=5]="Keyframes",t[t.Style=6]="Style",t[t.Trigger=7]="Trigger",t[t.Reference=8]="Reference",t[t.AnimateChild=9]="AnimateChild",t[t.AnimateRef=10]="AnimateRef",t[t.Query=11]="Query",t[t.Stagger=12]="Stagger",t})(ae||{}),An="*";function Wg(t,n){return{type:ae.Trigger,name:t,definitions:n,options:{}}}function xu(t,n=null){return{type:ae.Animate,styles:n,timings:t}}function Rw(t,n=null){return{type:ae.Sequence,steps:t,options:n}}function wi(t){return{type:ae.Style,styles:t,offset:null}}function Su(t,n,e){return{type:ae.State,name:t,styles:n,options:e}}function Mu(t,n,e=null){return{type:ae.Transition,expr:t,animation:n,options:e}}var Ci=class{_onDoneFns=[];_onStartFns=[];_onDestroyFns=[];_originalOnDoneFns=[];_originalOnStartFns=[];_started=!1;_destroyed=!1;_finished=!1;_position=0;parentPlayer=null;totalTime;constructor(n=0,e=0){this.totalTime=n+e}_onFinish(){this._finished||(this._finished=!0,this._onDoneFns.forEach(n=>n()),this._onDoneFns=[])}onStart(n){this._originalOnStartFns.push(n),this._onStartFns.push(n)}onDone(n){this._originalOnDoneFns.push(n),this._onDoneFns.push(n)}onDestroy(n){this._onDestroyFns.push(n)}hasStarted(){return this._started}init(){}play(){this.hasStarted()||(this._onStart(),this.triggerMicrotask()),this._started=!0}triggerMicrotask(){queueMicrotask(()=>this._onFinish())}_onStart(){this._onStartFns.forEach(n=>n()),this._onStartFns=[]}pause(){}restart(){}finish(){this._onFinish()}destroy(){this._destroyed||(this._destroyed=!0,this.hasStarted()||this._onStart(),this.finish(),this._onDestroyFns.forEach(n=>n()),this._onDestroyFns=[])}reset(){this._started=!1,this._finished=!1,this._onStartFns=this._originalOnStartFns,this._onDoneFns=this._originalOnDoneFns}setPosition(n){this._position=this.totalTime?n*this.totalTime:1}getPosition(){return this.totalTime?this._position/this.totalTime:1}triggerCallback(n){let e=n=="start"?this._onStartFns:this._onDoneFns;e.forEach(i=>i()),e.length=0}},yo=class{_onDoneFns=[];_onStartFns=[];_finished=!1;_started=!1;_destroyed=!1;_onDestroyFns=[];parentPlayer=null;totalTime=0;players;constructor(n){this.players=n;let e=0,i=0,r=0,o=this.players.length;o==0?queueMicrotask(()=>this._onFinish()):this.players.forEach(a=>{a.onDone(()=>{++e==o&&this._onFinish()}),a.onDestroy(()=>{++i==o&&this._onDestroy()}),a.onStart(()=>{++r==o&&this._onStart()})}),this.totalTime=this.players.reduce((a,s)=>Math.max(a,s.totalTime),0)}_onFinish(){this._finished||(this._finished=!0,this._onDoneFns.forEach(n=>n()),this._onDoneFns=[])}init(){this.players.forEach(n=>n.init())}onStart(n){this._onStartFns.push(n)}_onStart(){this.hasStarted()||(this._started=!0,this._onStartFns.forEach(n=>n()),this._onStartFns=[])}onDone(n){this._onDoneFns.push(n)}onDestroy(n){this._onDestroyFns.push(n)}hasStarted(){return this._started}play(){this.parentPlayer||this.init(),this._onStart(),this.players.forEach(n=>n.play())}pause(){this.players.forEach(n=>n.pause())}restart(){this.players.forEach(n=>n.restart())}finish(){this._onFinish(),this.players.forEach(n=>n.finish())}destroy(){this._onDestroy()}_onDestroy(){this._destroyed||(this._destroyed=!0,this._onFinish(),this.players.forEach(n=>n.destroy()),this._onDestroyFns.forEach(n=>n()),this._onDestroyFns=[])}reset(){this.players.forEach(n=>n.reset()),this._destroyed=!1,this._finished=!1,this._started=!1}setPosition(n){let e=n*this.totalTime;this.players.forEach(i=>{let r=i.totalTime?Math.min(1,e/i.totalTime):1;i.setPosition(r)})}getPosition(){let n=this.players.reduce((e,i)=>e===null||i.totalTime>e.totalTime?i:e,null);return n!=null?n.getPosition():0}beforeDestroy(){this.players.forEach(n=>{n.beforeDestroy&&n.beforeDestroy()})}triggerCallback(n){let e=n=="start"?this._onStartFns:this._onDoneFns;e.forEach(i=>i()),e.length=0}},va="!";function Nw(t){return new w(3e3,!1)}function MO(){return new w(3100,!1)}function IO(){return new w(3101,!1)}function kO(t){return new w(3001,!1)}function TO(t){return new w(3003,!1)}function AO(t){return new w(3004,!1)}function Fw(t,n){return new w(3005,!1)}function Pw(){return new w(3006,!1)}function Lw(){return new w(3007,!1)}function Vw(t,n){return new w(3008,!1)}function Bw(t){return new w(3002,!1)}function jw(t,n,e,i,r){return new w(3010,!1)}function Hw(){return new w(3011,!1)}function zw(){return new w(3012,!1)}function Uw(){return new w(3200,!1)}function $w(){return new w(3202,!1)}function Gw(){return new w(3013,!1)}function Ww(t){return new w(3014,!1)}function qw(t){return new w(3015,!1)}function Yw(t){return new w(3016,!1)}function Kw(t,n){return new w(3404,!1)}function RO(t){return new w(3502,!1)}function Qw(t){return new w(3503,!1)}function Zw(){return new w(3300,!1)}function Xw(t){return new w(3504,!1)}function Jw(t){return new w(3301,!1)}function eE(t,n){return new w(3302,!1)}function tE(t){return new w(3303,!1)}function nE(t,n){return new w(3400,!1)}function iE(t){return new w(3401,!1)}function rE(t){return new w(3402,!1)}function oE(t,n){return new w(3505,!1)}function Ui(t){switch(t.length){case 0:return new Ci;case 1:return t[0];default:return new yo(t)}}function Qg(t,n,e=new Map,i=new Map){let r=[],o=[],a=-1,s=null;if(n.forEach(l=>{let c=l.get("offset"),d=c==a,f=d&&s||new Map;l.forEach((m,h)=>{let _=h,D=m;if(h!=="offset")switch(_=t.normalizePropertyName(_,r),D){case va:D=e.get(h);break;case An:D=i.get(h);break;default:D=t.normalizeStyleValue(h,_,D,r);break}f.set(_,D)}),d||o.push(f),s=f,a=c}),r.length)throw RO(r);return o}function Iu(t,n,e,i){switch(n){case"start":t.onStart(()=>i(e&&qg(e,"start",t)));break;case"done":t.onDone(()=>i(e&&qg(e,"done",t)));break;case"destroy":t.onDestroy(()=>i(e&&qg(e,"destroy",t)));break}}function qg(t,n,e){let i=e.totalTime,r=!!e.disabled,o=ku(t.element,t.triggerName,t.fromState,t.toState,n||t.phaseName,i??t.totalTime,r),a=t._data;return a!=null&&(o._data=a),o}function ku(t,n,e,i,r="",o=0,a){return{element:t,triggerName:n,fromState:e,toState:i,phaseName:r,totalTime:o,disabled:!!a}}function nn(t,n,e){let i=t.get(n);return i||t.set(n,i=e),i}function Zg(t){let n=t.indexOf(":"),e=t.substring(1,n),i=t.slice(n+1);return[e,i]}var NO=typeof document>"u"?null:document.documentElement;function Tu(t){let n=t.parentNode||t.host||null;return n===NO?null:n}function OO(t){return t.substring(1,6)=="ebkit"}var bo=null,Ow=!1;function aE(t){bo||(bo=FO()||{},Ow=bo.style?"WebkitAppearance"in bo.style:!1);let n=!0;return bo.style&&!OO(t)&&(n=t in bo.style,!n&&Ow&&(n="Webkit"+t.charAt(0).toUpperCase()+t.slice(1)in bo.style)),n}function FO(){return typeof document<"u"?document.body:null}function Xg(t,n){for(;n;){if(n===t)return!0;n=Tu(n)}return!1}function Jg(t,n,e){if(e)return Array.from(t.querySelectorAll(n));let i=t.querySelector(n);return i?[i]:[]}var PO=1e3,e_="{{",LO="}}",t_="ng-enter",Au="ng-leave",ll="ng-trigger",cl=".ng-trigger",n_="ng-animating",Ru=".ng-animating";function Ei(t){if(typeof t=="number")return t;let n=t.match(/^(-?[\.\d]+)(m?s)/);return!n||n.length<2?0:Yg(parseFloat(n[1]),n[2])}function Yg(t,n){return n==="s"?t*PO:t}function dl(t,n,e){return t.hasOwnProperty("duration")?t:BO(t,n,e)}var VO=/^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i;function BO(t,n,e){let i,r=0,o="";if(typeof t=="string"){let a=t.match(VO);if(a===null)return n.push(Nw(t)),{duration:0,delay:0,easing:""};i=Yg(parseFloat(a[1]),a[2]);let s=a[3];s!=null&&(r=Yg(parseFloat(s),a[4]));let l=a[5];l&&(o=l)}else i=t;if(!e){let a=!1,s=n.length;i<0&&(n.push(MO()),a=!0),r<0&&(n.push(IO()),a=!0),a&&n.splice(s,0,Nw(t))}return{duration:i,delay:r,easing:o}}function sE(t){return t.length?t[0]instanceof Map?t:t.map(n=>new Map(Object.entries(n))):[]}function ii(t,n,e){n.forEach((i,r)=>{let o=Nu(r);e&&!e.has(r)&&e.set(r,t.style[o]),t.style[o]=i})}function Dr(t,n){n.forEach((e,i)=>{let r=Nu(i);t.style[r]=""})}function ya(t){return Array.isArray(t)?t.length==1?t[0]:Rw(t):t}function lE(t,n,e){let i=n.params||{},r=i_(t);r.length&&r.forEach(o=>{i.hasOwnProperty(o)||e.push(kO(o))})}var Kg=new RegExp(`${e_}\\s*(.+?)\\s*${LO}`,"g");function i_(t){let n=[];if(typeof t=="string"){let e;for(;e=Kg.exec(t);)n.push(e[1]);Kg.lastIndex=0}return n}function ba(t,n,e){let i=`${t}`,r=i.replace(Kg,(o,a)=>{let s=n[a];return s==null&&(e.push(TO(a)),s=""),s.toString()});return r==i?t:r}var jO=/-+([a-z0-9])/g;function Nu(t){return t.replace(jO,(...n)=>n[1].toUpperCase())}function cE(t,n){return t===0||n===0}function dE(t,n,e){if(e.size&&n.length){let i=n[0],r=[];if(e.forEach((o,a)=>{i.has(a)||r.push(a),i.set(a,o)}),r.length)for(let o=1;o<n.length;o++){let a=n[o];r.forEach(s=>a.set(s,Ou(t,s)))}}return n}function rn(t,n,e){switch(n.type){case ae.Trigger:return t.visitTrigger(n,e);case ae.State:return t.visitState(n,e);case ae.Transition:return t.visitTransition(n,e);case ae.Sequence:return t.visitSequence(n,e);case ae.Group:return t.visitGroup(n,e);case ae.Animate:return t.visitAnimate(n,e);case ae.Keyframes:return t.visitKeyframes(n,e);case ae.Style:return t.visitStyle(n,e);case ae.Reference:return t.visitReference(n,e);case ae.AnimateChild:return t.visitAnimateChild(n,e);case ae.AnimateRef:return t.visitAnimateRef(n,e);case ae.Query:return t.visitQuery(n,e);case ae.Stagger:return t.visitStagger(n,e);default:throw AO(n.type)}}function Ou(t,n){return window.getComputedStyle(t)[n]}var b_=(()=>{class t{validateStyleProperty(e){return aE(e)}containsElement(e,i){return Xg(e,i)}getParentElement(e){return Tu(e)}query(e,i,r){return Jg(e,i,r)}computeStyle(e,i,r){return r||""}animate(e,i,r,o,a,s=[],l){return new Ci(r,o)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac})}return t})(),Co=class{static NOOP=new b_},wo=class{};var HO=new Set(["width","height","minWidth","minHeight","maxWidth","maxHeight","left","top","bottom","right","fontSize","outlineWidth","outlineOffset","paddingTop","paddingLeft","paddingBottom","paddingRight","marginTop","marginLeft","marginBottom","marginRight","borderRadius","borderWidth","borderTopWidth","borderLeftWidth","borderRightWidth","borderBottomWidth","textIndent","perspective"]),Bu=class extends wo{normalizePropertyName(n,e){return Nu(n)}normalizeStyleValue(n,e,i,r){let o="",a=i.toString().trim();if(HO.has(e)&&i!==0&&i!=="0")if(typeof i=="number")o="px";else{let s=i.match(/^[+-]?[\d\.]+([a-z]*)$/);s&&s[1].length==0&&r.push(Fw(n,i))}return a+o}};var ju="*";function zO(t,n){let e=[];return typeof t=="string"?t.split(/\s*,\s*/).forEach(i=>UO(i,e,n)):e.push(t),e}function UO(t,n,e){if(t[0]==":"){let l=$O(t,e);if(typeof l=="function"){n.push(l);return}t=l}let i=t.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);if(i==null||i.length<4)return e.push(qw(t)),n;let r=i[1],o=i[2],a=i[3];n.push(uE(r,a));let s=r==ju&&a==ju;o[0]=="<"&&!s&&n.push(uE(a,r))}function $O(t,n){switch(t){case":enter":return"void => *";case":leave":return"* => void";case":increment":return(e,i)=>parseFloat(i)>parseFloat(e);case":decrement":return(e,i)=>parseFloat(i)<parseFloat(e);default:return n.push(Yw(t)),"* => *"}}var Fu=new Set(["true","1"]),Pu=new Set(["false","0"]);function uE(t,n){let e=Fu.has(t)||Pu.has(t),i=Fu.has(n)||Pu.has(n);return(r,o)=>{let a=t==ju||t==r,s=n==ju||n==o;return!a&&e&&typeof r=="boolean"&&(a=r?Fu.has(t):Pu.has(t)),!s&&i&&typeof o=="boolean"&&(s=o?Fu.has(n):Pu.has(n)),a&&s}}var DE=":self",GO=new RegExp(`s*${DE}s*,?`,"g");function CE(t,n,e,i){return new c_(t).build(n,e,i)}var fE="",c_=class{_driver;constructor(n){this._driver=n}build(n,e,i){let r=new d_(e);return this._resetContextStyleTimingState(r),rn(this,ya(n),r)}_resetContextStyleTimingState(n){n.currentQuerySelector=fE,n.collectedStyles=new Map,n.collectedStyles.set(fE,new Map),n.currentTime=0}visitTrigger(n,e){let i=e.queryCount=0,r=e.depCount=0,o=[],a=[];return n.name.charAt(0)=="@"&&e.errors.push(Pw()),n.definitions.forEach(s=>{if(this._resetContextStyleTimingState(e),s.type==ae.State){let l=s,c=l.name;c.toString().split(/\s*,\s*/).forEach(d=>{l.name=d,o.push(this.visitState(l,e))}),l.name=c}else if(s.type==ae.Transition){let l=this.visitTransition(s,e);i+=l.queryCount,r+=l.depCount,a.push(l)}else e.errors.push(Lw())}),{type:ae.Trigger,name:n.name,states:o,transitions:a,queryCount:i,depCount:r,options:null}}visitState(n,e){let i=this.visitStyle(n.styles,e),r=n.options&&n.options.params||null;if(i.containsDynamicStyles){let o=new Set,a=r||{};i.styles.forEach(s=>{s instanceof Map&&s.forEach(l=>{i_(l).forEach(c=>{a.hasOwnProperty(c)||o.add(c)})})}),o.size&&e.errors.push(Vw(n.name,[...o.values()]))}return{type:ae.State,name:n.name,style:i,options:r?{params:r}:null}}visitTransition(n,e){e.queryCount=0,e.depCount=0;let i=rn(this,ya(n.animation),e),r=zO(n.expr,e.errors);return{type:ae.Transition,matchers:r,animation:i,queryCount:e.queryCount,depCount:e.depCount,options:Do(n.options)}}visitSequence(n,e){return{type:ae.Sequence,steps:n.steps.map(i=>rn(this,i,e)),options:Do(n.options)}}visitGroup(n,e){let i=e.currentTime,r=0,o=n.steps.map(a=>{e.currentTime=i;let s=rn(this,a,e);return r=Math.max(r,e.currentTime),s});return e.currentTime=r,{type:ae.Group,steps:o,options:Do(n.options)}}visitAnimate(n,e){let i=KO(n.timings,e.errors);e.currentAnimateTimings=i;let r,o=n.styles?n.styles:wi({});if(o.type==ae.Keyframes)r=this.visitKeyframes(o,e);else{let a=n.styles,s=!1;if(!a){s=!0;let c={};i.easing&&(c.easing=i.easing),a=wi(c)}e.currentTime+=i.duration+i.delay;let l=this.visitStyle(a,e);l.isEmptyStep=s,r=l}return e.currentAnimateTimings=null,{type:ae.Animate,timings:i,style:r,options:null}}visitStyle(n,e){let i=this._makeStyleAst(n,e);return this._validateStyleAst(i,e),i}_makeStyleAst(n,e){let i=[],r=Array.isArray(n.styles)?n.styles:[n.styles];for(let s of r)typeof s=="string"?s===An?i.push(s):e.errors.push(Bw(s)):i.push(new Map(Object.entries(s)));let o=!1,a=null;return i.forEach(s=>{if(s instanceof Map&&(s.has("easing")&&(a=s.get("easing"),s.delete("easing")),!o)){for(let l of s.values())if(l.toString().indexOf(e_)>=0){o=!0;break}}}),{type:ae.Style,styles:i,easing:a,offset:n.offset,containsDynamicStyles:o,options:null}}_validateStyleAst(n,e){let i=e.currentAnimateTimings,r=e.currentTime,o=e.currentTime;i&&o>0&&(o-=i.duration+i.delay),n.styles.forEach(a=>{typeof a!="string"&&a.forEach((s,l)=>{let c=e.collectedStyles.get(e.currentQuerySelector),d=c.get(l),f=!0;d&&(o!=r&&o>=d.startTime&&r<=d.endTime&&(e.errors.push(jw(l,d.startTime,d.endTime,o,r)),f=!1),o=d.startTime),f&&c.set(l,{startTime:o,endTime:r}),e.options&&lE(s,e.options,e.errors)})})}visitKeyframes(n,e){let i={type:ae.Keyframes,styles:[],options:null};if(!e.currentAnimateTimings)return e.errors.push(Hw()),i;let r=1,o=0,a=[],s=!1,l=!1,c=0,d=n.steps.map(k=>{let oe=this._makeStyleAst(k,e),Ae=oe.offset!=null?oe.offset:YO(oe.styles),ye=0;return Ae!=null&&(o++,ye=oe.offset=Ae),l=l||ye<0||ye>1,s=s||ye<c,c=ye,a.push(ye),oe});l&&e.errors.push(zw()),s&&e.errors.push(Uw());let f=n.steps.length,m=0;o>0&&o<f?e.errors.push($w()):o==0&&(m=r/(f-1));let h=f-1,_=e.currentTime,D=e.currentAnimateTimings,E=D.duration;return d.forEach((k,oe)=>{let Ae=m>0?oe==h?1:m*oe:a[oe],ye=Ae*E;e.currentTime=_+D.delay+ye,D.duration=ye,this._validateStyleAst(k,e),k.offset=Ae,i.styles.push(k)}),i}visitReference(n,e){return{type:ae.Reference,animation:rn(this,ya(n.animation),e),options:Do(n.options)}}visitAnimateChild(n,e){return e.depCount++,{type:ae.AnimateChild,options:Do(n.options)}}visitAnimateRef(n,e){return{type:ae.AnimateRef,animation:this.visitReference(n.animation,e),options:Do(n.options)}}visitQuery(n,e){let i=e.currentQuerySelector,r=n.options||{};e.queryCount++,e.currentQuery=n;let[o,a]=WO(n.selector);e.currentQuerySelector=i.length?i+" "+o:o,nn(e.collectedStyles,e.currentQuerySelector,new Map);let s=rn(this,ya(n.animation),e);return e.currentQuery=null,e.currentQuerySelector=i,{type:ae.Query,selector:o,limit:r.limit||0,optional:!!r.optional,includeSelf:a,animation:s,originalSelector:n.selector,options:Do(n.options)}}visitStagger(n,e){e.currentQuery||e.errors.push(Gw());let i=n.timings==="full"?{duration:0,delay:0,easing:"full"}:dl(n.timings,e.errors,!0);return{type:ae.Stagger,animation:rn(this,ya(n.animation),e),timings:i,options:null}}};function WO(t){let n=!!t.split(/\s*,\s*/).find(e=>e==DE);return n&&(t=t.replace(GO,"")),t=t.replace(/@\*/g,cl).replace(/@\w+/g,e=>cl+"-"+e.slice(1)).replace(/:animating/g,Ru),[t,n]}function qO(t){return t?N({},t):null}var d_=class{errors;queryCount=0;depCount=0;currentTransition=null;currentQuery=null;currentQuerySelector=null;currentAnimateTimings=null;currentTime=0;collectedStyles=new Map;options=null;unsupportedCSSPropertiesFound=new Set;constructor(n){this.errors=n}};function YO(t){if(typeof t=="string")return null;let n=null;if(Array.isArray(t))t.forEach(e=>{if(e instanceof Map&&e.has("offset")){let i=e;n=parseFloat(i.get("offset")),i.delete("offset")}});else if(t instanceof Map&&t.has("offset")){let e=t;n=parseFloat(e.get("offset")),e.delete("offset")}return n}function KO(t,n){if(t.hasOwnProperty("duration"))return t;if(typeof t=="number"){let o=dl(t,n).duration;return r_(o,0,"")}let e=t;if(e.split(/\s+/).some(o=>o.charAt(0)=="{"&&o.charAt(1)=="{")){let o=r_(0,0,"");return o.dynamic=!0,o.strValue=e,o}let r=dl(e,n);return r_(r.duration,r.delay,r.easing)}function Do(t){return t?(t=N({},t),t.params&&(t.params=qO(t.params))):t={},t}function r_(t,n,e){return{duration:t,delay:n,easing:e}}function D_(t,n,e,i,r,o,a=null,s=!1){return{type:1,element:t,keyframes:n,preStyleProps:e,postStyleProps:i,duration:r,delay:o,totalTime:r+o,easing:a,subTimeline:s}}var fl=class{_map=new Map;get(n){return this._map.get(n)||[]}append(n,e){let i=this._map.get(n);i||this._map.set(n,i=[]),i.push(...e)}has(n){return this._map.has(n)}clear(){this._map.clear()}},QO=1,ZO=":enter",XO=new RegExp(ZO,"g"),JO=":leave",eF=new RegExp(JO,"g");function wE(t,n,e,i,r,o=new Map,a=new Map,s,l,c=[]){return new u_().buildKeyframes(t,n,e,i,r,o,a,s,l,c)}var u_=class{buildKeyframes(n,e,i,r,o,a,s,l,c,d=[]){c=c||new fl;let f=new f_(n,e,c,r,o,d,[]);f.options=l;let m=l.delay?Ei(l.delay):0;f.currentTimeline.delayNextStep(m),f.currentTimeline.setStyles([a],null,f.errors,l),rn(this,i,f);let h=f.timelines.filter(_=>_.containsAnimation());if(h.length&&s.size){let _;for(let D=h.length-1;D>=0;D--){let E=h[D];if(E.element===e){_=E;break}}_&&!_.allowOnlyTimelineStyles()&&_.setStyles([s],null,f.errors,l)}return h.length?h.map(_=>_.buildKeyframes()):[D_(e,[],[],[],0,m,"",!1)]}visitTrigger(n,e){}visitState(n,e){}visitTransition(n,e){}visitAnimateChild(n,e){let i=e.subInstructions.get(e.element);if(i){let r=e.createSubContext(n.options),o=e.currentTimeline.currentTime,a=this._visitSubInstructions(i,r,r.options);o!=a&&e.transformIntoNewTimeline(a)}e.previousNode=n}visitAnimateRef(n,e){let i=e.createSubContext(n.options);i.transformIntoNewTimeline(),this._applyAnimationRefDelays([n.options,n.animation.options],e,i),this.visitReference(n.animation,i),e.transformIntoNewTimeline(i.currentTimeline.currentTime),e.previousNode=n}_applyAnimationRefDelays(n,e,i){for(let r of n){let o=r?.delay;if(o){let a=typeof o=="number"?o:Ei(ba(o,r?.params??{},e.errors));i.delayNextStep(a)}}}_visitSubInstructions(n,e,i){let o=e.currentTimeline.currentTime,a=i.duration!=null?Ei(i.duration):null,s=i.delay!=null?Ei(i.delay):null;return a!==0&&n.forEach(l=>{let c=e.appendInstructionToTimeline(l,a,s);o=Math.max(o,c.duration+c.delay)}),o}visitReference(n,e){e.updateOptions(n.options,!0),rn(this,n.animation,e),e.previousNode=n}visitSequence(n,e){let i=e.subContextCount,r=e,o=n.options;if(o&&(o.params||o.delay)&&(r=e.createSubContext(o),r.transformIntoNewTimeline(),o.delay!=null)){r.previousNode.type==ae.Style&&(r.currentTimeline.snapshotCurrentStyles(),r.previousNode=Hu);let a=Ei(o.delay);r.delayNextStep(a)}n.steps.length&&(n.steps.forEach(a=>rn(this,a,r)),r.currentTimeline.applyStylesToKeyframe(),r.subContextCount>i&&r.transformIntoNewTimeline()),e.previousNode=n}visitGroup(n,e){let i=[],r=e.currentTimeline.currentTime,o=n.options&&n.options.delay?Ei(n.options.delay):0;n.steps.forEach(a=>{let s=e.createSubContext(n.options);o&&s.delayNextStep(o),rn(this,a,s),r=Math.max(r,s.currentTimeline.currentTime),i.push(s.currentTimeline)}),i.forEach(a=>e.currentTimeline.mergeTimelineCollectedStyles(a)),e.transformIntoNewTimeline(r),e.previousNode=n}_visitTiming(n,e){if(n.dynamic){let i=n.strValue,r=e.params?ba(i,e.params,e.errors):i;return dl(r,e.errors)}else return{duration:n.duration,delay:n.delay,easing:n.easing}}visitAnimate(n,e){let i=e.currentAnimateTimings=this._visitTiming(n.timings,e),r=e.currentTimeline;i.delay&&(e.incrementTime(i.delay),r.snapshotCurrentStyles());let o=n.style;o.type==ae.Keyframes?this.visitKeyframes(o,e):(e.incrementTime(i.duration),this.visitStyle(o,e),r.applyStylesToKeyframe()),e.currentAnimateTimings=null,e.previousNode=n}visitStyle(n,e){let i=e.currentTimeline,r=e.currentAnimateTimings;!r&&i.hasCurrentStyleProperties()&&i.forwardFrame();let o=r&&r.easing||n.easing;n.isEmptyStep?i.applyEmptyStep(o):i.setStyles(n.styles,o,e.errors,e.options),e.previousNode=n}visitKeyframes(n,e){let i=e.currentAnimateTimings,r=e.currentTimeline.duration,o=i.duration,s=e.createSubContext().currentTimeline;s.easing=i.easing,n.styles.forEach(l=>{let c=l.offset||0;s.forwardTime(c*o),s.setStyles(l.styles,l.easing,e.errors,e.options),s.applyStylesToKeyframe()}),e.currentTimeline.mergeTimelineCollectedStyles(s),e.transformIntoNewTimeline(r+o),e.previousNode=n}visitQuery(n,e){let i=e.currentTimeline.currentTime,r=n.options||{},o=r.delay?Ei(r.delay):0;o&&(e.previousNode.type===ae.Style||i==0&&e.currentTimeline.hasCurrentStyleProperties())&&(e.currentTimeline.snapshotCurrentStyles(),e.previousNode=Hu);let a=i,s=e.invokeQuery(n.selector,n.originalSelector,n.limit,n.includeSelf,!!r.optional,e.errors);e.currentQueryTotal=s.length;let l=null;s.forEach((c,d)=>{e.currentQueryIndex=d;let f=e.createSubContext(n.options,c);o&&f.delayNextStep(o),c===e.element&&(l=f.currentTimeline),rn(this,n.animation,f),f.currentTimeline.applyStylesToKeyframe();let m=f.currentTimeline.currentTime;a=Math.max(a,m)}),e.currentQueryIndex=0,e.currentQueryTotal=0,e.transformIntoNewTimeline(a),l&&(e.currentTimeline.mergeTimelineCollectedStyles(l),e.currentTimeline.snapshotCurrentStyles()),e.previousNode=n}visitStagger(n,e){let i=e.parentContext,r=e.currentTimeline,o=n.timings,a=Math.abs(o.duration),s=a*(e.currentQueryTotal-1),l=a*e.currentQueryIndex;switch(o.duration<0?"reverse":o.easing){case"reverse":l=s-l;break;case"full":l=i.currentStaggerTime;break}let d=e.currentTimeline;l&&d.delayNextStep(l);let f=d.currentTime;rn(this,n.animation,e),e.previousNode=n,i.currentStaggerTime=r.currentTime-f+(r.startTime-i.currentTimeline.startTime)}},Hu={},f_=class t{_driver;element;subInstructions;_enterClassName;_leaveClassName;errors;timelines;parentContext=null;currentTimeline;currentAnimateTimings=null;previousNode=Hu;subContextCount=0;options={};currentQueryIndex=0;currentQueryTotal=0;currentStaggerTime=0;constructor(n,e,i,r,o,a,s,l){this._driver=n,this.element=e,this.subInstructions=i,this._enterClassName=r,this._leaveClassName=o,this.errors=a,this.timelines=s,this.currentTimeline=l||new zu(this._driver,e,0),s.push(this.currentTimeline)}get params(){return this.options.params}updateOptions(n,e){if(!n)return;let i=n,r=this.options;i.duration!=null&&(r.duration=Ei(i.duration)),i.delay!=null&&(r.delay=Ei(i.delay));let o=i.params;if(o){let a=r.params;a||(a=this.options.params={}),Object.keys(o).forEach(s=>{(!e||!a.hasOwnProperty(s))&&(a[s]=ba(o[s],a,this.errors))})}}_copyOptions(){let n={};if(this.options){let e=this.options.params;if(e){let i=n.params={};Object.keys(e).forEach(r=>{i[r]=e[r]})}}return n}createSubContext(n=null,e,i){let r=e||this.element,o=new t(this._driver,r,this.subInstructions,this._enterClassName,this._leaveClassName,this.errors,this.timelines,this.currentTimeline.fork(r,i||0));return o.previousNode=this.previousNode,o.currentAnimateTimings=this.currentAnimateTimings,o.options=this._copyOptions(),o.updateOptions(n),o.currentQueryIndex=this.currentQueryIndex,o.currentQueryTotal=this.currentQueryTotal,o.parentContext=this,this.subContextCount++,o}transformIntoNewTimeline(n){return this.previousNode=Hu,this.currentTimeline=this.currentTimeline.fork(this.element,n),this.timelines.push(this.currentTimeline),this.currentTimeline}appendInstructionToTimeline(n,e,i){let r={duration:e??n.duration,delay:this.currentTimeline.currentTime+(i??0)+n.delay,easing:""},o=new h_(this._driver,n.element,n.keyframes,n.preStyleProps,n.postStyleProps,r,n.stretchStartingKeyframe);return this.timelines.push(o),r}incrementTime(n){this.currentTimeline.forwardTime(this.currentTimeline.duration+n)}delayNextStep(n){n>0&&this.currentTimeline.delayNextStep(n)}invokeQuery(n,e,i,r,o,a){let s=[];if(r&&s.push(this.element),n.length>0){n=n.replace(XO,"."+this._enterClassName),n=n.replace(eF,"."+this._leaveClassName);let l=i!=1,c=this._driver.query(this.element,n,l);i!==0&&(c=i<0?c.slice(c.length+i,c.length):c.slice(0,i)),s.push(...c)}return!o&&s.length==0&&a.push(Ww(e)),s}},zu=class t{_driver;element;startTime;_elementTimelineStylesLookup;duration=0;easing=null;_previousKeyframe=new Map;_currentKeyframe=new Map;_keyframes=new Map;_styleSummary=new Map;_localTimelineStyles=new Map;_globalTimelineStyles;_pendingStyles=new Map;_backFill=new Map;_currentEmptyStepKeyframe=null;constructor(n,e,i,r){this._driver=n,this.element=e,this.startTime=i,this._elementTimelineStylesLookup=r,this._elementTimelineStylesLookup||(this._elementTimelineStylesLookup=new Map),this._globalTimelineStyles=this._elementTimelineStylesLookup.get(e),this._globalTimelineStyles||(this._globalTimelineStyles=this._localTimelineStyles,this._elementTimelineStylesLookup.set(e,this._localTimelineStyles)),this._loadKeyframe()}containsAnimation(){switch(this._keyframes.size){case 0:return!1;case 1:return this.hasCurrentStyleProperties();default:return!0}}hasCurrentStyleProperties(){return this._currentKeyframe.size>0}get currentTime(){return this.startTime+this.duration}delayNextStep(n){let e=this._keyframes.size===1&&this._pendingStyles.size;this.duration||e?(this.forwardTime(this.currentTime+n),e&&this.snapshotCurrentStyles()):this.startTime+=n}fork(n,e){return this.applyStylesToKeyframe(),new t(this._driver,n,e||this.currentTime,this._elementTimelineStylesLookup)}_loadKeyframe(){this._currentKeyframe&&(this._previousKeyframe=this._currentKeyframe),this._currentKeyframe=this._keyframes.get(this.duration),this._currentKeyframe||(this._currentKeyframe=new Map,this._keyframes.set(this.duration,this._currentKeyframe))}forwardFrame(){this.duration+=QO,this._loadKeyframe()}forwardTime(n){this.applyStylesToKeyframe(),this.duration=n,this._loadKeyframe()}_updateStyle(n,e){this._localTimelineStyles.set(n,e),this._globalTimelineStyles.set(n,e),this._styleSummary.set(n,{time:this.currentTime,value:e})}allowOnlyTimelineStyles(){return this._currentEmptyStepKeyframe!==this._currentKeyframe}applyEmptyStep(n){n&&this._previousKeyframe.set("easing",n);for(let[e,i]of this._globalTimelineStyles)this._backFill.set(e,i||An),this._currentKeyframe.set(e,An);this._currentEmptyStepKeyframe=this._currentKeyframe}setStyles(n,e,i,r){e&&this._previousKeyframe.set("easing",e);let o=r&&r.params||{},a=tF(n,this._globalTimelineStyles);for(let[s,l]of a){let c=ba(l,o,i);this._pendingStyles.set(s,c),this._localTimelineStyles.has(s)||this._backFill.set(s,this._globalTimelineStyles.get(s)??An),this._updateStyle(s,c)}}applyStylesToKeyframe(){this._pendingStyles.size!=0&&(this._pendingStyles.forEach((n,e)=>{this._currentKeyframe.set(e,n)}),this._pendingStyles.clear(),this._localTimelineStyles.forEach((n,e)=>{this._currentKeyframe.has(e)||this._currentKeyframe.set(e,n)}))}snapshotCurrentStyles(){for(let[n,e]of this._localTimelineStyles)this._pendingStyles.set(n,e),this._updateStyle(n,e)}getFinalKeyframe(){return this._keyframes.get(this.duration)}get properties(){let n=[];for(let e in this._currentKeyframe)n.push(e);return n}mergeTimelineCollectedStyles(n){n._styleSummary.forEach((e,i)=>{let r=this._styleSummary.get(i);(!r||e.time>r.time)&&this._updateStyle(i,e.value)})}buildKeyframes(){this.applyStylesToKeyframe();let n=new Set,e=new Set,i=this._keyframes.size===1&&this.duration===0,r=[];this._keyframes.forEach((s,l)=>{let c=new Map([...this._backFill,...s]);c.forEach((d,f)=>{d===va?n.add(f):d===An&&e.add(f)}),i||c.set("offset",l/this.duration),r.push(c)});let o=[...n.values()],a=[...e.values()];if(i){let s=r[0],l=new Map(s);s.set("offset",0),l.set("offset",1),r=[s,l]}return D_(this.element,r,o,a,this.duration,this.startTime,this.easing,!1)}},h_=class extends zu{keyframes;preStyleProps;postStyleProps;_stretchStartingKeyframe;timings;constructor(n,e,i,r,o,a,s=!1){super(n,e,a.delay),this.keyframes=i,this.preStyleProps=r,this.postStyleProps=o,this._stretchStartingKeyframe=s,this.timings={duration:a.duration,delay:a.delay,easing:a.easing}}containsAnimation(){return this.keyframes.length>1}buildKeyframes(){let n=this.keyframes,{delay:e,duration:i,easing:r}=this.timings;if(this._stretchStartingKeyframe&&e){let o=[],a=i+e,s=e/a,l=new Map(n[0]);l.set("offset",0),o.push(l);let c=new Map(n[0]);c.set("offset",hE(s)),o.push(c);let d=n.length-1;for(let f=1;f<=d;f++){let m=new Map(n[f]),h=m.get("offset"),_=e+h*i;m.set("offset",hE(_/a)),o.push(m)}i=a,e=0,r="",n=o}return D_(this.element,n,this.preStyleProps,this.postStyleProps,i,e,r,!0)}};function hE(t,n=3){let e=Math.pow(10,n-1);return Math.round(t*e)/e}function tF(t,n){let e=new Map,i;return t.forEach(r=>{if(r==="*"){i??=n.keys();for(let o of i)e.set(o,An)}else for(let[o,a]of r)e.set(o,a)}),e}function mE(t,n,e,i,r,o,a,s,l,c,d,f,m){return{type:0,element:t,triggerName:n,isRemovalTransition:r,fromState:e,fromStyles:o,toState:i,toStyles:a,timelines:s,queriedElements:l,preStyleProps:c,postStyleProps:d,totalTime:f,errors:m}}var o_={},Uu=class{_triggerName;ast;_stateStyles;constructor(n,e,i){this._triggerName=n,this.ast=e,this._stateStyles=i}match(n,e,i,r){return nF(this.ast.matchers,n,e,i,r)}buildStyles(n,e,i){let r=this._stateStyles.get("*");return n!==void 0&&(r=this._stateStyles.get(n?.toString())||r),r?r.buildStyles(e,i):new Map}build(n,e,i,r,o,a,s,l,c,d){let f=[],m=this.ast.options&&this.ast.options.params||o_,h=s&&s.params||o_,_=this.buildStyles(i,h,f),D=l&&l.params||o_,E=this.buildStyles(r,D,f),k=new Set,oe=new Map,Ae=new Map,ye=r==="void",yn={params:EE(D,m),delay:this.ast.options?.delay},Nt=d?[]:wE(n,e,this.ast.animation,o,a,_,E,yn,c,f),Je=0;return Nt.forEach(Yt=>{Je=Math.max(Yt.duration+Yt.delay,Je)}),f.length?mE(e,this._triggerName,i,r,ye,_,E,[],[],oe,Ae,Je,f):(Nt.forEach(Yt=>{let Rr=Yt.element,Vo=nn(oe,Rr,new Set);Yt.preStyleProps.forEach(Nr=>Vo.add(Nr));let Uv=nn(Ae,Rr,new Set);Yt.postStyleProps.forEach(Nr=>Uv.add(Nr)),Rr!==e&&k.add(Rr)}),mE(e,this._triggerName,i,r,ye,_,E,Nt,[...k.values()],oe,Ae,Je))}};function nF(t,n,e,i,r){return t.some(o=>o(n,e,i,r))}function EE(t,n){let e=N({},n);return Object.entries(t).forEach(([i,r])=>{r!=null&&(e[i]=r)}),e}var m_=class{styles;defaultParams;normalizer;constructor(n,e,i){this.styles=n,this.defaultParams=e,this.normalizer=i}buildStyles(n,e){let i=new Map,r=EE(n,this.defaultParams);return this.styles.styles.forEach(o=>{typeof o!="string"&&o.forEach((a,s)=>{a&&(a=ba(a,r,e));let l=this.normalizer.normalizePropertyName(s,e);a=this.normalizer.normalizeStyleValue(s,l,a,e),i.set(s,a)})}),i}};function iF(t,n,e){return new p_(t,n,e)}var p_=class{name;ast;_normalizer;transitionFactories=[];fallbackTransition;states=new Map;constructor(n,e,i){this.name=n,this.ast=e,this._normalizer=i,e.states.forEach(r=>{let o=r.options&&r.options.params||{};this.states.set(r.name,new m_(r.style,o,i))}),pE(this.states,"true","1"),pE(this.states,"false","0"),e.transitions.forEach(r=>{this.transitionFactories.push(new Uu(n,r,this.states))}),this.fallbackTransition=rF(n,this.states)}get containsQueries(){return this.ast.queryCount>0}matchTransition(n,e,i,r){return this.transitionFactories.find(a=>a.match(n,e,i,r))||null}matchStyles(n,e,i){return this.fallbackTransition.buildStyles(n,e,i)}};function rF(t,n,e){let i=[(a,s)=>!0],r={type:ae.Sequence,steps:[],options:null},o={type:ae.Transition,animation:r,matchers:i,options:null,queryCount:0,depCount:0};return new Uu(t,o,n)}function pE(t,n,e){t.has(n)?t.has(e)||t.set(e,t.get(n)):t.has(e)&&t.set(n,t.get(e))}var oF=new fl,g_=class{bodyNode;_driver;_normalizer;_animations=new Map;_playersById=new Map;players=[];constructor(n,e,i){this.bodyNode=n,this._driver=e,this._normalizer=i}register(n,e){let i=[],r=[],o=CE(this._driver,e,i,r);if(i.length)throw Qw(i);this._animations.set(n,o)}_buildPlayer(n,e,i){let r=n.element,o=Qg(this._normalizer,n.keyframes,e,i);return this._driver.animate(r,o,n.duration,n.delay,n.easing,[],!0)}create(n,e,i={}){let r=[],o=this._animations.get(n),a,s=new Map;if(o?(a=wE(this._driver,e,o,t_,Au,new Map,new Map,i,oF,r),a.forEach(d=>{let f=nn(s,d.element,new Map);d.postStyleProps.forEach(m=>f.set(m,null))})):(r.push(Zw()),a=[]),r.length)throw Xw(r);s.forEach((d,f)=>{d.forEach((m,h)=>{d.set(h,this._driver.computeStyle(f,h,An))})});let l=a.map(d=>{let f=s.get(d.element);return this._buildPlayer(d,new Map,f)}),c=Ui(l);return this._playersById.set(n,c),c.onDestroy(()=>this.destroy(n)),this.players.push(c),c}destroy(n){let e=this._getPlayer(n);e.destroy(),this._playersById.delete(n);let i=this.players.indexOf(e);i>=0&&this.players.splice(i,1)}_getPlayer(n){let e=this._playersById.get(n);if(!e)throw Jw(n);return e}listen(n,e,i,r){let o=ku(e,"","","");return Iu(this._getPlayer(n),i,o,r),()=>{}}command(n,e,i,r){if(i=="register"){this.register(n,r[0]);return}if(i=="create"){let a=r[0]||{};this.create(n,e,a);return}let o=this._getPlayer(n);switch(i){case"play":o.play();break;case"pause":o.pause();break;case"reset":o.reset();break;case"restart":o.restart();break;case"finish":o.finish();break;case"init":o.init();break;case"setPosition":o.setPosition(parseFloat(r[0]));break;case"destroy":this.destroy(n);break}}},gE="ng-animate-queued",aF=".ng-animate-queued",a_="ng-animate-disabled",sF=".ng-animate-disabled",lF="ng-star-inserted",cF=".ng-star-inserted",dF=[],xE={namespaceId:"",setForRemoval:!1,setForMove:!1,hasAnimation:!1,removedBeforeQueried:!1},uF={namespaceId:"",setForMove:!1,setForRemoval:!1,hasAnimation:!1,removedBeforeQueried:!0},ri="__ng_removed",hl=class{namespaceId;value;options;get params(){return this.options.params}constructor(n,e=""){this.namespaceId=e;let i=n&&n.hasOwnProperty("value"),r=i?n.value:n;if(this.value=hF(r),i){let o=n,{value:a}=o,s=lh(o,["value"]);this.options=s}else this.options={};this.options.params||(this.options.params={})}absorbOptions(n){let e=n.params;if(e){let i=this.options.params;Object.keys(e).forEach(r=>{i[r]==null&&(i[r]=e[r])})}}},ul="void",s_=new hl(ul),__=class{id;hostElement;_engine;players=[];_triggers=new Map;_queue=[];_elementListeners=new Map;_hostClassName;constructor(n,e,i){this.id=n,this.hostElement=e,this._engine=i,this._hostClassName="ng-tns-"+n,Rn(e,this._hostClassName)}listen(n,e,i,r){if(!this._triggers.has(e))throw eE(i,e);if(i==null||i.length==0)throw tE(e);if(!mF(i))throw nE(i,e);let o=nn(this._elementListeners,n,[]),a={name:e,phase:i,callback:r};o.push(a);let s=nn(this._engine.statesByElement,n,new Map);return s.has(e)||(Rn(n,ll),Rn(n,ll+"-"+e),s.set(e,s_)),()=>{this._engine.afterFlush(()=>{let l=o.indexOf(a);l>=0&&o.splice(l,1),this._triggers.has(e)||s.delete(e)})}}register(n,e){return this._triggers.has(n)?!1:(this._triggers.set(n,e),!0)}_getTrigger(n){let e=this._triggers.get(n);if(!e)throw iE(n);return e}trigger(n,e,i,r=!0){let o=this._getTrigger(e),a=new ml(this.id,e,n),s=this._engine.statesByElement.get(n);s||(Rn(n,ll),Rn(n,ll+"-"+e),this._engine.statesByElement.set(n,s=new Map));let l=s.get(e),c=new hl(i,this.id);if(!(i&&i.hasOwnProperty("value"))&&l&&c.absorbOptions(l.options),s.set(e,c),l||(l=s_),!(c.value===ul)&&l.value===c.value){if(!_F(l.params,c.params)){let D=[],E=o.matchStyles(l.value,l.params,D),k=o.matchStyles(c.value,c.params,D);D.length?this._engine.reportError(D):this._engine.afterFlush(()=>{Dr(n,E),ii(n,k)})}return}let m=nn(this._engine.playersByElement,n,[]);m.forEach(D=>{D.namespaceId==this.id&&D.triggerName==e&&D.queued&&D.destroy()});let h=o.matchTransition(l.value,c.value,n,c.params),_=!1;if(!h){if(!r)return;h=o.fallbackTransition,_=!0}return this._engine.totalQueuedPlayers++,this._queue.push({element:n,triggerName:e,transition:h,fromState:l,toState:c,player:a,isFallbackTransition:_}),_||(Rn(n,gE),a.onStart(()=>{Da(n,gE)})),a.onDone(()=>{let D=this.players.indexOf(a);D>=0&&this.players.splice(D,1);let E=this._engine.playersByElement.get(n);if(E){let k=E.indexOf(a);k>=0&&E.splice(k,1)}}),this.players.push(a),m.push(a),a}deregister(n){this._triggers.delete(n),this._engine.statesByElement.forEach(e=>e.delete(n)),this._elementListeners.forEach((e,i)=>{this._elementListeners.set(i,e.filter(r=>r.name!=n))})}clearElementCache(n){this._engine.statesByElement.delete(n),this._elementListeners.delete(n);let e=this._engine.playersByElement.get(n);e&&(e.forEach(i=>i.destroy()),this._engine.playersByElement.delete(n))}_signalRemovalForInnerTriggers(n,e){let i=this._engine.driver.query(n,cl,!0);i.forEach(r=>{if(r[ri])return;let o=this._engine.fetchNamespacesByElement(r);o.size?o.forEach(a=>a.triggerLeaveAnimation(r,e,!1,!0)):this.clearElementCache(r)}),this._engine.afterFlushAnimationsDone(()=>i.forEach(r=>this.clearElementCache(r)))}triggerLeaveAnimation(n,e,i,r){let o=this._engine.statesByElement.get(n),a=new Map;if(o){let s=[];if(o.forEach((l,c)=>{if(a.set(c,l.value),this._triggers.has(c)){let d=this.trigger(n,c,ul,r);d&&s.push(d)}}),s.length)return this._engine.markElementAsRemoved(this.id,n,!0,e,a),i&&Ui(s).onDone(()=>this._engine.processLeaveNode(n)),!0}return!1}prepareLeaveAnimationListeners(n){let e=this._elementListeners.get(n),i=this._engine.statesByElement.get(n);if(e&&i){let r=new Set;e.forEach(o=>{let a=o.name;if(r.has(a))return;r.add(a);let l=this._triggers.get(a).fallbackTransition,c=i.get(a)||s_,d=new hl(ul),f=new ml(this.id,a,n);this._engine.totalQueuedPlayers++,this._queue.push({element:n,triggerName:a,transition:l,fromState:c,toState:d,player:f,isFallbackTransition:!0})})}}removeNode(n,e){let i=this._engine;if(n.childElementCount&&this._signalRemovalForInnerTriggers(n,e),this.triggerLeaveAnimation(n,e,!0))return;let r=!1;if(i.totalAnimations){let o=i.players.length?i.playersByQueriedElement.get(n):[];if(o&&o.length)r=!0;else{let a=n;for(;a=a.parentNode;)if(i.statesByElement.get(a)){r=!0;break}}}if(this.prepareLeaveAnimationListeners(n),r)i.markElementAsRemoved(this.id,n,!1,e);else{let o=n[ri];(!o||o===xE)&&(i.afterFlush(()=>this.clearElementCache(n)),i.destroyInnerAnimations(n),i._onRemovalComplete(n,e))}}insertNode(n,e){Rn(n,this._hostClassName)}drainQueuedTransitions(n){let e=[];return this._queue.forEach(i=>{let r=i.player;if(r.destroyed)return;let o=i.element,a=this._elementListeners.get(o);a&&a.forEach(s=>{if(s.name==i.triggerName){let l=ku(o,i.triggerName,i.fromState.value,i.toState.value);l._data=n,Iu(i.player,s.phase,l,s.callback)}}),r.markedForDestroy?this._engine.afterFlush(()=>{r.destroy()}):e.push(i)}),this._queue=[],e.sort((i,r)=>{let o=i.transition.ast.depCount,a=r.transition.ast.depCount;return o==0||a==0?o-a:this._engine.driver.containsElement(i.element,r.element)?1:-1})}destroy(n){this.players.forEach(e=>e.destroy()),this._signalRemovalForInnerTriggers(this.hostElement,n)}},v_=class{bodyNode;driver;_normalizer;players=[];newHostElements=new Map;playersByElement=new Map;playersByQueriedElement=new Map;statesByElement=new Map;disabledNodes=new Set;totalAnimations=0;totalQueuedPlayers=0;_namespaceLookup={};_namespaceList=[];_flushFns=[];_whenQuietFns=[];namespacesByHostElement=new Map;collectedEnterElements=[];collectedLeaveElements=[];onRemovalComplete=(n,e)=>{};_onRemovalComplete(n,e){this.onRemovalComplete(n,e)}constructor(n,e,i){this.bodyNode=n,this.driver=e,this._normalizer=i}get queuedPlayers(){let n=[];return this._namespaceList.forEach(e=>{e.players.forEach(i=>{i.queued&&n.push(i)})}),n}createNamespace(n,e){let i=new __(n,e,this);return this.bodyNode&&this.driver.containsElement(this.bodyNode,e)?this._balanceNamespaceList(i,e):(this.newHostElements.set(e,i),this.collectEnterElement(e)),this._namespaceLookup[n]=i}_balanceNamespaceList(n,e){let i=this._namespaceList,r=this.namespacesByHostElement;if(i.length-1>=0){let a=!1,s=this.driver.getParentElement(e);for(;s;){let l=r.get(s);if(l){let c=i.indexOf(l);i.splice(c+1,0,n),a=!0;break}s=this.driver.getParentElement(s)}a||i.unshift(n)}else i.push(n);return r.set(e,n),n}register(n,e){let i=this._namespaceLookup[n];return i||(i=this.createNamespace(n,e)),i}registerTrigger(n,e,i){let r=this._namespaceLookup[n];r&&r.register(e,i)&&this.totalAnimations++}destroy(n,e){n&&(this.afterFlush(()=>{}),this.afterFlushAnimationsDone(()=>{let i=this._fetchNamespace(n);this.namespacesByHostElement.delete(i.hostElement);let r=this._namespaceList.indexOf(i);r>=0&&this._namespaceList.splice(r,1),i.destroy(e),delete this._namespaceLookup[n]}))}_fetchNamespace(n){return this._namespaceLookup[n]}fetchNamespacesByElement(n){let e=new Set,i=this.statesByElement.get(n);if(i){for(let r of i.values())if(r.namespaceId){let o=this._fetchNamespace(r.namespaceId);o&&e.add(o)}}return e}trigger(n,e,i,r){if(Lu(e)){let o=this._fetchNamespace(n);if(o)return o.trigger(e,i,r),!0}return!1}insertNode(n,e,i,r){if(!Lu(e))return;let o=e[ri];if(o&&o.setForRemoval){o.setForRemoval=!1,o.setForMove=!0;let a=this.collectedLeaveElements.indexOf(e);a>=0&&this.collectedLeaveElements.splice(a,1)}if(n){let a=this._fetchNamespace(n);a&&a.insertNode(e,i)}r&&this.collectEnterElement(e)}collectEnterElement(n){this.collectedEnterElements.push(n)}markElementAsDisabled(n,e){e?this.disabledNodes.has(n)||(this.disabledNodes.add(n),Rn(n,a_)):this.disabledNodes.has(n)&&(this.disabledNodes.delete(n),Da(n,a_))}removeNode(n,e,i){if(Lu(e)){let r=n?this._fetchNamespace(n):null;r?r.removeNode(e,i):this.markElementAsRemoved(n,e,!1,i);let o=this.namespacesByHostElement.get(e);o&&o.id!==n&&o.removeNode(e,i)}else this._onRemovalComplete(e,i)}markElementAsRemoved(n,e,i,r,o){this.collectedLeaveElements.push(e),e[ri]={namespaceId:n,setForRemoval:r,hasAnimation:i,removedBeforeQueried:!1,previousTriggersValues:o}}listen(n,e,i,r,o){return Lu(e)?this._fetchNamespace(n).listen(e,i,r,o):()=>{}}_buildInstruction(n,e,i,r,o){return n.transition.build(this.driver,n.element,n.fromState.value,n.toState.value,i,r,n.fromState.options,n.toState.options,e,o)}destroyInnerAnimations(n){let e=this.driver.query(n,cl,!0);e.forEach(i=>this.destroyActiveAnimationsForElement(i)),this.playersByQueriedElement.size!=0&&(e=this.driver.query(n,Ru,!0),e.forEach(i=>this.finishActiveQueriedAnimationOnElement(i)))}destroyActiveAnimationsForElement(n){let e=this.playersByElement.get(n);e&&e.forEach(i=>{i.queued?i.markedForDestroy=!0:i.destroy()})}finishActiveQueriedAnimationOnElement(n){let e=this.playersByQueriedElement.get(n);e&&e.forEach(i=>i.finish())}whenRenderingDone(){return new Promise(n=>{if(this.players.length)return Ui(this.players).onDone(()=>n());n()})}processLeaveNode(n){let e=n[ri];if(e&&e.setForRemoval){if(n[ri]=xE,e.namespaceId){this.destroyInnerAnimations(n);let i=this._fetchNamespace(e.namespaceId);i&&i.clearElementCache(n)}this._onRemovalComplete(n,e.setForRemoval)}n.classList?.contains(a_)&&this.markElementAsDisabled(n,!1),this.driver.query(n,sF,!0).forEach(i=>{this.markElementAsDisabled(i,!1)})}flush(n=-1){let e=[];if(this.newHostElements.size&&(this.newHostElements.forEach((i,r)=>this._balanceNamespaceList(i,r)),this.newHostElements.clear()),this.totalAnimations&&this.collectedEnterElements.length)for(let i=0;i<this.collectedEnterElements.length;i++){let r=this.collectedEnterElements[i];Rn(r,lF)}if(this._namespaceList.length&&(this.totalQueuedPlayers||this.collectedLeaveElements.length)){let i=[];try{e=this._flushAnimations(i,n)}finally{for(let r=0;r<i.length;r++)i[r]()}}else for(let i=0;i<this.collectedLeaveElements.length;i++){let r=this.collectedLeaveElements[i];this.processLeaveNode(r)}if(this.totalQueuedPlayers=0,this.collectedEnterElements.length=0,this.collectedLeaveElements.length=0,this._flushFns.forEach(i=>i()),this._flushFns=[],this._whenQuietFns.length){let i=this._whenQuietFns;this._whenQuietFns=[],e.length?Ui(e).onDone(()=>{i.forEach(r=>r())}):i.forEach(r=>r())}}reportError(n){throw rE(n)}_flushAnimations(n,e){let i=new fl,r=[],o=new Map,a=[],s=new Map,l=new Map,c=new Map,d=new Set;this.disabledNodes.forEach(U=>{d.add(U);let q=this.driver.query(U,aF,!0);for(let J=0;J<q.length;J++)d.add(q[J])});let f=this.bodyNode,m=Array.from(this.statesByElement.keys()),h=yE(m,this.collectedEnterElements),_=new Map,D=0;h.forEach((U,q)=>{let J=t_+D++;_.set(q,J),U.forEach(Ee=>Rn(Ee,J))});let E=[],k=new Set,oe=new Set;for(let U=0;U<this.collectedLeaveElements.length;U++){let q=this.collectedLeaveElements[U],J=q[ri];J&&J.setForRemoval&&(E.push(q),k.add(q),J.hasAnimation?this.driver.query(q,cF,!0).forEach(Ee=>k.add(Ee)):oe.add(q))}let Ae=new Map,ye=yE(m,Array.from(k));ye.forEach((U,q)=>{let J=Au+D++;Ae.set(q,J),U.forEach(Ee=>Rn(Ee,J))}),n.push(()=>{h.forEach((U,q)=>{let J=_.get(q);U.forEach(Ee=>Da(Ee,J))}),ye.forEach((U,q)=>{let J=Ae.get(q);U.forEach(Ee=>Da(Ee,J))}),E.forEach(U=>{this.processLeaveNode(U)})});let yn=[],Nt=[];for(let U=this._namespaceList.length-1;U>=0;U--)this._namespaceList[U].drainQueuedTransitions(e).forEach(J=>{let Ee=J.player,yt=J.element;if(yn.push(Ee),this.collectedEnterElements.length){let Ot=yt[ri];if(Ot&&Ot.setForMove){if(Ot.previousTriggersValues&&Ot.previousTriggersValues.has(J.triggerName)){let Or=Ot.previousTriggersValues.get(J.triggerName),bn=this.statesByElement.get(J.element);if(bn&&bn.has(J.triggerName)){let ql=bn.get(J.triggerName);ql.value=Or,bn.set(J.triggerName,ql)}}Ee.destroy();return}}let li=!f||!this.driver.containsElement(f,yt),on=Ae.get(yt),Zi=_.get(yt),et=this._buildInstruction(J,i,Zi,on,li);if(et.errors&&et.errors.length){Nt.push(et);return}if(li){Ee.onStart(()=>Dr(yt,et.fromStyles)),Ee.onDestroy(()=>ii(yt,et.toStyles)),r.push(Ee);return}if(J.isFallbackTransition){Ee.onStart(()=>Dr(yt,et.fromStyles)),Ee.onDestroy(()=>ii(yt,et.toStyles)),r.push(Ee);return}let Wv=[];et.timelines.forEach(Ot=>{Ot.stretchStartingKeyframe=!0,this.disabledNodes.has(Ot.element)||Wv.push(Ot)}),et.timelines=Wv,i.append(yt,et.timelines);let vM={instruction:et,player:Ee,element:yt};a.push(vM),et.queriedElements.forEach(Ot=>nn(s,Ot,[]).push(Ee)),et.preStyleProps.forEach((Ot,Or)=>{if(Ot.size){let bn=l.get(Or);bn||l.set(Or,bn=new Set),Ot.forEach((ql,sh)=>bn.add(sh))}}),et.postStyleProps.forEach((Ot,Or)=>{let bn=c.get(Or);bn||c.set(Or,bn=new Set),Ot.forEach((ql,sh)=>bn.add(sh))})});if(Nt.length){let U=[];Nt.forEach(q=>{U.push(oE(q.triggerName,q.errors))}),yn.forEach(q=>q.destroy()),this.reportError(U)}let Je=new Map,Yt=new Map;a.forEach(U=>{let q=U.element;i.has(q)&&(Yt.set(q,q),this._beforeAnimationBuild(U.player.namespaceId,U.instruction,Je))}),r.forEach(U=>{let q=U.element;this._getPreviousPlayers(q,!1,U.namespaceId,U.triggerName,null).forEach(Ee=>{nn(Je,q,[]).push(Ee),Ee.destroy()})});let Rr=E.filter(U=>bE(U,l,c)),Vo=new Map;vE(Vo,this.driver,oe,c,An).forEach(U=>{bE(U,l,c)&&Rr.push(U)});let Nr=new Map;h.forEach((U,q)=>{vE(Nr,this.driver,new Set(U),l,va)}),Rr.forEach(U=>{let q=Vo.get(U),J=Nr.get(U);Vo.set(U,new Map([...q?.entries()??[],...J?.entries()??[]]))});let ah=[],$v=[],Gv={};a.forEach(U=>{let{element:q,player:J,instruction:Ee}=U;if(i.has(q)){if(d.has(q)){J.onDestroy(()=>ii(q,Ee.toStyles)),J.disabled=!0,J.overrideTotalTime(Ee.totalTime),r.push(J);return}let yt=Gv;if(Yt.size>1){let on=q,Zi=[];for(;on=on.parentNode;){let et=Yt.get(on);if(et){yt=et;break}Zi.push(on)}Zi.forEach(et=>Yt.set(et,yt))}let li=this._buildAnimation(J.namespaceId,Ee,Je,o,Nr,Vo);if(J.setRealPlayer(li),yt===Gv)ah.push(J);else{let on=this.playersByElement.get(yt);on&&on.length&&(J.parentPlayer=Ui(on)),r.push(J)}}else Dr(q,Ee.fromStyles),J.onDestroy(()=>ii(q,Ee.toStyles)),$v.push(J),d.has(q)&&r.push(J)}),$v.forEach(U=>{let q=o.get(U.element);if(q&&q.length){let J=Ui(q);U.setRealPlayer(J)}}),r.forEach(U=>{U.parentPlayer?U.syncPlayerEvents(U.parentPlayer):U.destroy()});for(let U=0;U<E.length;U++){let q=E[U],J=q[ri];if(Da(q,Au),J&&J.hasAnimation)continue;let Ee=[];if(s.size){let li=s.get(q);li&&li.length&&Ee.push(...li);let on=this.driver.query(q,Ru,!0);for(let Zi=0;Zi<on.length;Zi++){let et=s.get(on[Zi]);et&&et.length&&Ee.push(...et)}}let yt=Ee.filter(li=>!li.destroyed);yt.length?pF(this,q,yt):this.processLeaveNode(q)}return E.length=0,ah.forEach(U=>{this.players.push(U),U.onDone(()=>{U.destroy();let q=this.players.indexOf(U);this.players.splice(q,1)}),U.play()}),ah}afterFlush(n){this._flushFns.push(n)}afterFlushAnimationsDone(n){this._whenQuietFns.push(n)}_getPreviousPlayers(n,e,i,r,o){let a=[];if(e){let s=this.playersByQueriedElement.get(n);s&&(a=s)}else{let s=this.playersByElement.get(n);if(s){let l=!o||o==ul;s.forEach(c=>{c.queued||!l&&c.triggerName!=r||a.push(c)})}}return(i||r)&&(a=a.filter(s=>!(i&&i!=s.namespaceId||r&&r!=s.triggerName))),a}_beforeAnimationBuild(n,e,i){let r=e.triggerName,o=e.element,a=e.isRemovalTransition?void 0:n,s=e.isRemovalTransition?void 0:r;for(let l of e.timelines){let c=l.element,d=c!==o,f=nn(i,c,[]);this._getPreviousPlayers(c,d,a,s,e.toState).forEach(h=>{let _=h.getRealPlayer();_.beforeDestroy&&_.beforeDestroy(),h.destroy(),f.push(h)})}Dr(o,e.fromStyles)}_buildAnimation(n,e,i,r,o,a){let s=e.triggerName,l=e.element,c=[],d=new Set,f=new Set,m=e.timelines.map(_=>{let D=_.element;d.add(D);let E=D[ri];if(E&&E.removedBeforeQueried)return new Ci(_.duration,_.delay);let k=D!==l,oe=gF((i.get(D)||dF).map(Je=>Je.getRealPlayer())).filter(Je=>{let Yt=Je;return Yt.element?Yt.element===D:!1}),Ae=o.get(D),ye=a.get(D),yn=Qg(this._normalizer,_.keyframes,Ae,ye),Nt=this._buildPlayer(_,yn,oe);if(_.subTimeline&&r&&f.add(D),k){let Je=new ml(n,s,D);Je.setRealPlayer(Nt),c.push(Je)}return Nt});c.forEach(_=>{nn(this.playersByQueriedElement,_.element,[]).push(_),_.onDone(()=>fF(this.playersByQueriedElement,_.element,_))}),d.forEach(_=>Rn(_,n_));let h=Ui(m);return h.onDestroy(()=>{d.forEach(_=>Da(_,n_)),ii(l,e.toStyles)}),f.forEach(_=>{nn(r,_,[]).push(h)}),h}_buildPlayer(n,e,i){return e.length>0?this.driver.animate(n.element,e,n.duration,n.delay,n.easing,i):new Ci(n.duration,n.delay)}},ml=class{namespaceId;triggerName;element;_player=new Ci;_containsRealPlayer=!1;_queuedCallbacks=new Map;destroyed=!1;parentPlayer=null;markedForDestroy=!1;disabled=!1;queued=!0;totalTime=0;constructor(n,e,i){this.namespaceId=n,this.triggerName=e,this.element=i}setRealPlayer(n){this._containsRealPlayer||(this._player=n,this._queuedCallbacks.forEach((e,i)=>{e.forEach(r=>Iu(n,i,void 0,r))}),this._queuedCallbacks.clear(),this._containsRealPlayer=!0,this.overrideTotalTime(n.totalTime),this.queued=!1)}getRealPlayer(){return this._player}overrideTotalTime(n){this.totalTime=n}syncPlayerEvents(n){let e=this._player;e.triggerCallback&&n.onStart(()=>e.triggerCallback("start")),n.onDone(()=>this.finish()),n.onDestroy(()=>this.destroy())}_queueEvent(n,e){nn(this._queuedCallbacks,n,[]).push(e)}onDone(n){this.queued&&this._queueEvent("done",n),this._player.onDone(n)}onStart(n){this.queued&&this._queueEvent("start",n),this._player.onStart(n)}onDestroy(n){this.queued&&this._queueEvent("destroy",n),this._player.onDestroy(n)}init(){this._player.init()}hasStarted(){return this.queued?!1:this._player.hasStarted()}play(){!this.queued&&this._player.play()}pause(){!this.queued&&this._player.pause()}restart(){!this.queued&&this._player.restart()}finish(){this._player.finish()}destroy(){this.destroyed=!0,this._player.destroy()}reset(){!this.queued&&this._player.reset()}setPosition(n){this.queued||this._player.setPosition(n)}getPosition(){return this.queued?0:this._player.getPosition()}triggerCallback(n){let e=this._player;e.triggerCallback&&e.triggerCallback(n)}};function fF(t,n,e){let i=t.get(n);if(i){if(i.length){let r=i.indexOf(e);i.splice(r,1)}i.length==0&&t.delete(n)}return i}function hF(t){return t??null}function Lu(t){return t&&t.nodeType===1}function mF(t){return t=="start"||t=="done"}function _E(t,n){let e=t.style.display;return t.style.display=n??"none",e}function vE(t,n,e,i,r){let o=[];e.forEach(l=>o.push(_E(l)));let a=[];i.forEach((l,c)=>{let d=new Map;l.forEach(f=>{let m=n.computeStyle(c,f,r);d.set(f,m),(!m||m.length==0)&&(c[ri]=uF,a.push(c))}),t.set(c,d)});let s=0;return e.forEach(l=>_E(l,o[s++])),a}function yE(t,n){let e=new Map;if(t.forEach(s=>e.set(s,[])),n.length==0)return e;let i=1,r=new Set(n),o=new Map;function a(s){if(!s)return i;let l=o.get(s);if(l)return l;let c=s.parentNode;return e.has(c)?l=c:r.has(c)?l=i:l=a(c),o.set(s,l),l}return n.forEach(s=>{let l=a(s);l!==i&&e.get(l).push(s)}),e}function Rn(t,n){t.classList?.add(n)}function Da(t,n){t.classList?.remove(n)}function pF(t,n,e){Ui(e).onDone(()=>t.processLeaveNode(n))}function gF(t){let n=[];return SE(t,n),n}function SE(t,n){for(let e=0;e<t.length;e++){let i=t[e];i instanceof yo?SE(i.players,n):n.push(i)}}function _F(t,n){let e=Object.keys(t),i=Object.keys(n);if(e.length!=i.length)return!1;for(let r=0;r<e.length;r++){let o=e[r];if(!n.hasOwnProperty(o)||t[o]!==n[o])return!1}return!0}function bE(t,n,e){let i=e.get(t);if(!i)return!1;let r=n.get(t);return r?i.forEach(o=>r.add(o)):n.set(t,i),e.delete(t),!0}var Ca=class{_driver;_normalizer;_transitionEngine;_timelineEngine;_triggerCache={};onRemovalComplete=(n,e)=>{};constructor(n,e,i){this._driver=e,this._normalizer=i,this._transitionEngine=new v_(n.body,e,i),this._timelineEngine=new g_(n.body,e,i),this._transitionEngine.onRemovalComplete=(r,o)=>this.onRemovalComplete(r,o)}registerTrigger(n,e,i,r,o){let a=n+"-"+r,s=this._triggerCache[a];if(!s){let l=[],c=[],d=CE(this._driver,o,l,c);if(l.length)throw Kw(r,l);s=iF(r,d,this._normalizer),this._triggerCache[a]=s}this._transitionEngine.registerTrigger(e,r,s)}register(n,e){this._transitionEngine.register(n,e)}destroy(n,e){this._transitionEngine.destroy(n,e)}onInsert(n,e,i,r){this._transitionEngine.insertNode(n,e,i,r)}onRemove(n,e,i){this._transitionEngine.removeNode(n,e,i)}disableAnimations(n,e){this._transitionEngine.markElementAsDisabled(n,e)}process(n,e,i,r){if(i.charAt(0)=="@"){let[o,a]=Zg(i),s=r;this._timelineEngine.command(o,e,a,s)}else this._transitionEngine.trigger(n,e,i,r)}listen(n,e,i,r,o){if(i.charAt(0)=="@"){let[a,s]=Zg(i);return this._timelineEngine.listen(a,e,s,o)}return this._transitionEngine.listen(n,e,i,r,o)}flush(n=-1){this._transitionEngine.flush(n)}get players(){return[...this._transitionEngine.players,...this._timelineEngine.players]}whenRenderingDone(){return this._transitionEngine.whenRenderingDone()}afterFlushAnimationsDone(n){this._transitionEngine.afterFlushAnimationsDone(n)}};function vF(t,n){let e=null,i=null;return Array.isArray(n)&&n.length?(e=l_(n[0]),n.length>1&&(i=l_(n[n.length-1]))):n instanceof Map&&(e=l_(n)),e||i?new yF(t,e,i):null}var yF=(()=>{class t{_element;_startStyles;_endStyles;static initialStylesByElement=new WeakMap;_state=0;_initialStyles;constructor(e,i,r){this._element=e,this._startStyles=i,this._endStyles=r;let o=t.initialStylesByElement.get(e);o||t.initialStylesByElement.set(e,o=new Map),this._initialStyles=o}start(){this._state<1&&(this._startStyles&&ii(this._element,this._startStyles,this._initialStyles),this._state=1)}finish(){this.start(),this._state<2&&(ii(this._element,this._initialStyles),this._endStyles&&(ii(this._element,this._endStyles),this._endStyles=null),this._state=1)}destroy(){this.finish(),this._state<3&&(t.initialStylesByElement.delete(this._element),this._startStyles&&(Dr(this._element,this._startStyles),this._endStyles=null),this._endStyles&&(Dr(this._element,this._endStyles),this._endStyles=null),ii(this._element,this._initialStyles),this._state=3)}}return t})();function l_(t){let n=null;return t.forEach((e,i)=>{bF(i)&&(n=n||new Map,n.set(i,e))}),n}function bF(t){return t==="display"||t==="position"}var $u=class{element;keyframes;options;_specialStyles;_onDoneFns=[];_onStartFns=[];_onDestroyFns=[];_duration;_delay;_initialized=!1;_finished=!1;_started=!1;_destroyed=!1;_finalKeyframe;_originalOnDoneFns=[];_originalOnStartFns=[];domPlayer=null;time=0;parentPlayer=null;currentSnapshot=new Map;constructor(n,e,i,r){this.element=n,this.keyframes=e,this.options=i,this._specialStyles=r,this._duration=i.duration,this._delay=i.delay||0,this.time=this._duration+this._delay}_onFinish(){this._finished||(this._finished=!0,this._onDoneFns.forEach(n=>n()),this._onDoneFns=[])}init(){this._buildPlayer()&&this._preparePlayerBeforeStart()}_buildPlayer(){if(this._initialized)return this.domPlayer;this._initialized=!0;let n=this.keyframes,e=this._triggerWebAnimation(this.element,n,this.options);if(!e)return this._onFinish(),null;this.domPlayer=e,this._finalKeyframe=n.length?n[n.length-1]:new Map;let i=()=>this._onFinish();return e.addEventListener("finish",i),this.onDestroy(()=>{e.removeEventListener("finish",i)}),e}_preparePlayerBeforeStart(){this._delay?this._resetDomPlayerState():this.domPlayer?.pause()}_convertKeyframesToObject(n){let e=[];return n.forEach(i=>{e.push(Object.fromEntries(i))}),e}_triggerWebAnimation(n,e,i){let r=this._convertKeyframesToObject(e);try{return n.animate(r,i)}catch(o){return null}}onStart(n){this._originalOnStartFns.push(n),this._onStartFns.push(n)}onDone(n){this._originalOnDoneFns.push(n),this._onDoneFns.push(n)}onDestroy(n){this._onDestroyFns.push(n)}play(){let n=this._buildPlayer();n&&(this.hasStarted()||(this._onStartFns.forEach(e=>e()),this._onStartFns=[],this._started=!0,this._specialStyles&&this._specialStyles.start()),n.play())}pause(){this.init(),this.domPlayer?.pause()}finish(){this.init(),this.domPlayer&&(this._specialStyles&&this._specialStyles.finish(),this._onFinish(),this.domPlayer.finish())}reset(){this._resetDomPlayerState(),this._destroyed=!1,this._finished=!1,this._started=!1,this._onStartFns=this._originalOnStartFns,this._onDoneFns=this._originalOnDoneFns}_resetDomPlayerState(){this.domPlayer?.cancel()}restart(){this.reset(),this.play()}hasStarted(){return this._started}destroy(){this._destroyed||(this._destroyed=!0,this._resetDomPlayerState(),this._onFinish(),this._specialStyles&&this._specialStyles.destroy(),this._onDestroyFns.forEach(n=>n()),this._onDestroyFns=[])}setPosition(n){this.domPlayer||this.init(),this.domPlayer&&(this.domPlayer.currentTime=n*this.time)}getPosition(){return this.domPlayer?+(this.domPlayer.currentTime??0)/this.time:this._initialized?1:0}get totalTime(){return this._delay+this._duration}beforeDestroy(){let n=new Map;this.hasStarted()&&this._finalKeyframe.forEach((i,r)=>{r!=="offset"&&n.set(r,this._finished?i:Ou(this.element,r))}),this.currentSnapshot=n}triggerCallback(n){let e=n==="start"?this._onStartFns:this._onDoneFns;e.forEach(i=>i()),e.length=0}},Gu=class{validateStyleProperty(n){return!0}validateAnimatableStyleProperty(n){return!0}containsElement(n,e){return Xg(n,e)}getParentElement(n){return Tu(n)}query(n,e,i){return Jg(n,e,i)}computeStyle(n,e,i){return Ou(n,e)}animate(n,e,i,r,o,a=[]){let s=r==0?"both":"forwards",l={duration:i,delay:r,fill:s};o&&(l.easing=o);let c=new Map,d=a.filter(h=>h instanceof $u);cE(i,r)&&d.forEach(h=>{h.currentSnapshot.forEach((_,D)=>c.set(D,_))});let f=sE(e).map(h=>new Map(h));f=dE(n,f,c);let m=vF(n,f);return new $u(n,f,l,m)}};var Vu="@",ME="@.disabled",Wu=class{namespaceId;delegate;engine;_onDestroy;\u0275type=0;constructor(n,e,i,r){this.namespaceId=n,this.delegate=e,this.engine=i,this._onDestroy=r}get data(){return this.delegate.data}destroyNode(n){this.delegate.destroyNode?.(n)}destroy(){this.engine.destroy(this.namespaceId,this.delegate),this.engine.afterFlushAnimationsDone(()=>{queueMicrotask(()=>{this.delegate.destroy()})}),this._onDestroy?.()}createElement(n,e){return this.delegate.createElement(n,e)}createComment(n){return this.delegate.createComment(n)}createText(n){return this.delegate.createText(n)}appendChild(n,e){this.delegate.appendChild(n,e),this.engine.onInsert(this.namespaceId,e,n,!1)}insertBefore(n,e,i,r=!0){this.delegate.insertBefore(n,e,i),this.engine.onInsert(this.namespaceId,e,n,r)}removeChild(n,e,i,r){if(r){this.delegate.removeChild(n,e,i,r);return}this.parentNode(e)&&this.engine.onRemove(this.namespaceId,e,this.delegate)}selectRootElement(n,e){return this.delegate.selectRootElement(n,e)}parentNode(n){return this.delegate.parentNode(n)}nextSibling(n){return this.delegate.nextSibling(n)}setAttribute(n,e,i,r){this.delegate.setAttribute(n,e,i,r)}removeAttribute(n,e,i){this.delegate.removeAttribute(n,e,i)}addClass(n,e){this.delegate.addClass(n,e)}removeClass(n,e){this.delegate.removeClass(n,e)}setStyle(n,e,i,r){this.delegate.setStyle(n,e,i,r)}removeStyle(n,e,i){this.delegate.removeStyle(n,e,i)}setProperty(n,e,i){e.charAt(0)==Vu&&e==ME?this.disableAnimations(n,!!i):this.delegate.setProperty(n,e,i)}setValue(n,e){this.delegate.setValue(n,e)}listen(n,e,i,r){return this.delegate.listen(n,e,i,r)}disableAnimations(n,e){this.engine.disableAnimations(n,e)}},y_=class extends Wu{factory;constructor(n,e,i,r,o){super(e,i,r,o),this.factory=n,this.namespaceId=e}setProperty(n,e,i){e.charAt(0)==Vu?e.charAt(1)=="."&&e==ME?(i=i===void 0?!0:!!i,this.disableAnimations(n,i)):this.engine.process(this.namespaceId,n,e.slice(1),i):this.delegate.setProperty(n,e,i)}listen(n,e,i,r){if(e.charAt(0)==Vu){let o=DF(n),a=e.slice(1),s="";return a.charAt(0)!=Vu&&([a,s]=CF(a)),this.engine.listen(this.namespaceId,o,a,s,l=>{let c=l._data||-1;this.factory.scheduleListenerCallback(c,i,l)})}return this.delegate.listen(n,e,i,r)}};function DF(t){switch(t){case"body":return document.body;case"document":return document;case"window":return window;default:return t}}function CF(t){let n=t.indexOf("."),e=t.substring(0,n),i=t.slice(n+1);return[e,i]}var qu=class{delegate;engine;_zone;_currentId=0;_microtaskId=1;_animationCallbacksBuffer=[];_rendererCache=new Map;_cdRecurDepth=0;constructor(n,e,i){this.delegate=n,this.engine=e,this._zone=i,e.onRemovalComplete=(r,o)=>{o?.removeChild(null,r)}}createRenderer(n,e){let r=this.delegate.createRenderer(n,e);if(!n||!e?.data?.animation){let c=this._rendererCache,d=c.get(r);if(!d){let f=()=>c.delete(r);d=new Wu("",r,this.engine,f),c.set(r,d)}return d}let o=e.id,a=e.id+"-"+this._currentId;this._currentId++,this.engine.register(a,n);let s=c=>{Array.isArray(c)?c.forEach(s):this.engine.registerTrigger(o,a,n,c.name,c)};return e.data.animation.forEach(s),new y_(this,a,r,this.engine)}begin(){this._cdRecurDepth++,this.delegate.begin&&this.delegate.begin()}_scheduleCountTask(){queueMicrotask(()=>{this._microtaskId++})}scheduleListenerCallback(n,e,i){if(n>=0&&n<this._microtaskId){this._zone.run(()=>e(i));return}let r=this._animationCallbacksBuffer;r.length==0&&queueMicrotask(()=>{this._zone.run(()=>{r.forEach(o=>{let[a,s]=o;a(s)}),this._animationCallbacksBuffer=[]})}),r.push([e,i])}end(){this._cdRecurDepth--,this._cdRecurDepth==0&&this._zone.runOutsideAngular(()=>{this._scheduleCountTask(),this.engine.flush(this._microtaskId)}),this.delegate.end&&this.delegate.end()}whenRenderingDone(){return this.engine.whenRenderingDone()}componentReplaced(n){this.engine.flush(),this.delegate.componentReplaced?.(n)}};var EF=(()=>{class t extends Ca{constructor(e,i,r){super(e,i,r)}ngOnDestroy(){this.flush()}static \u0275fac=function(i){return new(i||t)(G(W),G(Co),G(wo))};static \u0275prov=C({token:t,factory:t.\u0275fac})}return t})();function xF(){return new Bu}function SF(){return new qu(u(nl),u(Ca),u(A))}var kE=[{provide:wo,useFactory:xF},{provide:Ca,useClass:EF},{provide:rt,useFactory:SF}],MF=[{provide:Co,useClass:b_},{provide:vr,useValue:"NoopAnimations"},...kE],IE=[{provide:Co,useFactory:()=>new Gu},{provide:vr,useFactory:()=>"BrowserAnimations"},...kE],TE=(()=>{class t{static withConfig(e){return{ngModule:t,providers:e.disableAnimations?MF:IE}}static \u0275fac=function(i){return new(i||t)};static \u0275mod=$({type:t});static \u0275inj=H({providers:IE,imports:[rl]})}return t})();var IF=new b("cdk-dir-doc",{providedIn:"root",factory:()=>u(W)}),kF=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function C_(t){let n=t?.toLowerCase()||"";return n==="auto"&&typeof navigator<"u"&&navigator?.language?kF.test(navigator.language)?"rtl":"ltr":n==="rtl"?"rtl":"ltr"}var Et=(()=>{class t{get value(){return this.valueSignal()}valueSignal=re("ltr");change=new S;constructor(){let e=u(IF,{optional:!0});if(e){let i=e.body?e.body.dir:null,r=e.documentElement?e.documentElement.dir:null;this.valueSignal.set(C_(i||r||"ltr"))}}ngOnDestroy(){this.change.complete()}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var w_=(()=>{class t{_isInitialized=!1;_rawDir="";change=new S;get dir(){return this.valueSignal()}set dir(e){let i=this.valueSignal();this.valueSignal.set(C_(e)),this._rawDir=e,i!==this.valueSignal()&&this._isInitialized&&this.change.emit(this.valueSignal())}get value(){return this.dir}valueSignal=re("ltr");ngAfterContentInit(){this._isInitialized=!0}ngOnDestroy(){this.change.complete()}static \u0275fac=function(i){return new(i||t)};static \u0275dir=z({type:t,selectors:[["","dir",""]],hostVars:1,hostBindings:function(i,r){i&2&&ce("dir",r._rawDir)},inputs:{dir:"dir"},outputs:{change:"dirChange"},exportAs:["dir"],features:[xe([{provide:Et,useExisting:t}])]})}return t})(),be=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=$({type:t});static \u0275inj=H({})}return t})();var TF=["*"];var AF=new b("MAT_CARD_CONFIG"),xt=(()=>{class t{appearance;constructor(){let e=u(AF,{optional:!0});this.appearance=e?.appearance||"raised"}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["mat-card"]],hostAttrs:[1,"mat-mdc-card","mdc-card"],hostVars:8,hostBindings:function(i,r){i&2&&O("mat-mdc-card-outlined",r.appearance==="outlined")("mdc-card--outlined",r.appearance==="outlined")("mat-mdc-card-filled",r.appearance==="filled")("mdc-card--filled",r.appearance==="filled")},inputs:{appearance:"appearance"},exportAs:["matCard"],ngContentSelectors:TF,decls:1,vars:0,template:function(i,r){i&1&&(we(),Z(0))},styles:[`.mat-mdc-card {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  border-style: solid;
  border-width: 0;
  background-color: var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));
  border-color: var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));
  border-radius: var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));
  box-shadow: var(--mat-card-elevated-container-elevation, var(--mat-sys-level1));
}
.mat-mdc-card::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: solid 1px transparent;
  content: "";
  display: block;
  pointer-events: none;
  box-sizing: border-box;
  border-radius: var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));
}

.mat-mdc-card-outlined {
  background-color: var(--mat-card-outlined-container-color, var(--mat-sys-surface));
  border-radius: var(--mat-card-outlined-container-shape, var(--mat-sys-corner-medium));
  border-width: var(--mat-card-outlined-outline-width, 1px);
  border-color: var(--mat-card-outlined-outline-color, var(--mat-sys-outline-variant));
  box-shadow: var(--mat-card-outlined-container-elevation, var(--mat-sys-level0));
}
.mat-mdc-card-outlined::after {
  border: none;
}

.mat-mdc-card-filled {
  background-color: var(--mat-card-filled-container-color, var(--mat-sys-surface-container-highest));
  border-radius: var(--mat-card-filled-container-shape, var(--mat-sys-corner-medium));
  box-shadow: var(--mat-card-filled-container-elevation, var(--mat-sys-level0));
}

.mdc-card__media {
  position: relative;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.mdc-card__media::before {
  display: block;
  content: "";
}
.mdc-card__media:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}
.mdc-card__media:last-child {
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}

.mat-mdc-card-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  min-height: 52px;
  padding: 8px;
}

.mat-mdc-card-title {
  font-family: var(--mat-card-title-text-font, var(--mat-sys-title-large-font));
  line-height: var(--mat-card-title-text-line-height, var(--mat-sys-title-large-line-height));
  font-size: var(--mat-card-title-text-size, var(--mat-sys-title-large-size));
  letter-spacing: var(--mat-card-title-text-tracking, var(--mat-sys-title-large-tracking));
  font-weight: var(--mat-card-title-text-weight, var(--mat-sys-title-large-weight));
}

.mat-mdc-card-subtitle {
  color: var(--mat-card-subtitle-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-card-subtitle-text-font, var(--mat-sys-title-medium-font));
  line-height: var(--mat-card-subtitle-text-line-height, var(--mat-sys-title-medium-line-height));
  font-size: var(--mat-card-subtitle-text-size, var(--mat-sys-title-medium-size));
  letter-spacing: var(--mat-card-subtitle-text-tracking, var(--mat-sys-title-medium-tracking));
  font-weight: var(--mat-card-subtitle-text-weight, var(--mat-sys-title-medium-weight));
}

.mat-mdc-card-title,
.mat-mdc-card-subtitle {
  display: block;
  margin: 0;
}
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-title,
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-subtitle {
  padding: 16px 16px 0;
}

.mat-mdc-card-header {
  display: flex;
  padding: 16px 16px 0;
}

.mat-mdc-card-content {
  display: block;
  padding: 0 16px;
}
.mat-mdc-card-content:first-child {
  padding-top: 16px;
}
.mat-mdc-card-content:last-child {
  padding-bottom: 16px;
}

.mat-mdc-card-title-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.mat-mdc-card-avatar {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-bottom: 16px;
  object-fit: cover;
}
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-subtitle,
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-title {
  line-height: normal;
}

.mat-mdc-card-sm-image {
  width: 80px;
  height: 80px;
}

.mat-mdc-card-md-image {
  width: 112px;
  height: 112px;
}

.mat-mdc-card-lg-image {
  width: 152px;
  height: 152px;
}

.mat-mdc-card-xl-image {
  width: 240px;
  height: 240px;
}

.mat-mdc-card-subtitle ~ .mat-mdc-card-title,
.mat-mdc-card-title ~ .mat-mdc-card-subtitle,
.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-title,
.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-subtitle,
.mat-mdc-card-title-group .mat-mdc-card-title,
.mat-mdc-card-title-group .mat-mdc-card-subtitle {
  padding-top: 0;
}

.mat-mdc-card-content > :last-child:not(.mat-mdc-card-footer) {
  margin-bottom: 0;
}

.mat-mdc-card-actions-align-end {
  justify-content: flex-end;
}
`],encapsulation:2,changeDetection:0})}return t})(),St=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=z({type:t,selectors:[["mat-card-title"],["","mat-card-title",""],["","matCardTitle",""]],hostAttrs:[1,"mat-mdc-card-title"]})}return t})();var Mt=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=z({type:t,selectors:[["mat-card-content"]],hostAttrs:[1,"mat-mdc-card-content"]})}return t})();var AE=(()=>{class t{align="start";static \u0275fac=function(i){return new(i||t)};static \u0275dir=z({type:t,selectors:[["mat-card-actions"]],hostAttrs:[1,"mat-mdc-card-actions","mdc-card__actions"],hostVars:2,hostBindings:function(i,r){i&2&&O("mat-mdc-card-actions-align-end",r.align==="end")},inputs:{align:"align"},exportAs:["matCardActions"]})}return t})();var It=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=$({type:t});static \u0275inj=H({imports:[be]})}return t})();var E_;try{E_=typeof Intl<"u"&&Intl.v8BreakIterator}catch(t){E_=!1}var Ce=(()=>{class t{_platformId=u(ho);isBrowser=this._platformId?hw(this._platformId):typeof document=="object"&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||E_)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;constructor(){}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var x_;function RE(){if(x_==null){let t=typeof document<"u"?document.head:null;x_=!!(t&&(t.createShadowRoot||t.attachShadow))}return x_}function S_(t){if(RE()){let n=t.getRootNode?t.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&n instanceof ShadowRoot)return n}return null}function wa(){let t=typeof document<"u"&&document?document.activeElement:null;for(;t&&t.shadowRoot;){let n=t.shadowRoot.activeElement;if(n===t)break;t=n}return t}function Rt(t){return t.composedPath?t.composedPath()[0]:t.target}function M_(){return typeof __karma__<"u"&&!!__karma__||typeof jasmine<"u"&&!!jasmine||typeof jest<"u"&&!!jest||typeof Mocha<"u"&&!!Mocha}var Yu=new WeakMap,je=(()=>{class t{_appRef;_injector=u(ne);_environmentInjector=u(ot);load(e){let i=this._appRef=this._appRef||this._injector.get(Jt),r=Yu.get(i);r||(r={loaders:new Set,refs:[]},Yu.set(i,r),i.onDestroy(()=>{Yu.get(i)?.refs.forEach(o=>o.destroy()),Yu.delete(i)})),r.loaders.has(e)||(r.loaders.add(e),r.refs.push(su(e,{environmentInjector:this._environmentInjector})))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function dt(t){return t==null?"":typeof t=="string"?t:`${t}px`}function Ea(t){return Array.isArray(t)?t:[t]}function oi(t,n=0){return NE(t)?Number(t):arguments.length===2?n:0}function NE(t){return!isNaN(parseFloat(t))&&!isNaN(Number(t))}function pn(t){return t instanceof P?t.nativeElement:t}var Eo;function OE(){if(Eo==null){if(typeof document!="object"||!document||typeof Element!="function"||!Element)return Eo=!1,Eo;if(document.documentElement?.style&&"scrollBehavior"in document.documentElement.style)Eo=!0;else{let t=Element.prototype.scrollTo;t?Eo=!/\{\s*\[native code\]\s*\}/.test(t.toString()):Eo=!1}}return Eo}var RF=20,xa=(()=>{class t{_ngZone=u(A);_platform=u(Ce);_renderer=u(rt).createRenderer(null,null);_cleanupGlobalListener;constructor(){}_scrolled=new M;_scrolledCount=0;scrollContainers=new Map;register(e){this.scrollContainers.has(e)||this.scrollContainers.set(e,e.elementScrolled().subscribe(()=>this._scrolled.next(e)))}deregister(e){let i=this.scrollContainers.get(e);i&&(i.unsubscribe(),this.scrollContainers.delete(e))}scrolled(e=RF){return this._platform.isBrowser?new ue(i=>{this._cleanupGlobalListener||(this._cleanupGlobalListener=this._ngZone.runOutsideAngular(()=>this._renderer.listen("document","scroll",()=>this._scrolled.next())));let r=e>0?this._scrolled.pipe(Nc(e)).subscribe(i):this._scrolled.subscribe(i);return this._scrolledCount++,()=>{r.unsubscribe(),this._scrolledCount--,this._scrolledCount||(this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0)}}):nt()}ngOnDestroy(){this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0,this.scrollContainers.forEach((e,i)=>this.deregister(i)),this._scrolled.complete()}ancestorScrolled(e,i){let r=this.getAncestorScrollContainers(e);return this.scrolled(i).pipe(He(o=>!o||r.indexOf(o)>-1))}getAncestorScrollContainers(e){let i=[];return this.scrollContainers.forEach((r,o)=>{this._scrollableContainsElement(o,e)&&i.push(o)}),i}_scrollableContainsElement(e,i){let r=pn(i),o=e.getElementRef().nativeElement;do if(r==o)return!0;while(r=r.parentElement);return!1}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var NF=20,Cr=(()=>{class t{_platform=u(Ce);_listeners;_viewportSize=null;_change=new M;_document=u(W);constructor(){let e=u(A),i=u(rt).createRenderer(null,null);e.runOutsideAngular(()=>{if(this._platform.isBrowser){let r=o=>this._change.next(o);this._listeners=[i.listen("window","resize",r),i.listen("window","orientationchange",r)]}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){this._listeners?.forEach(e=>e()),this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let e={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),e}getViewportRect(){let e=this.getViewportScrollPosition(),{width:i,height:r}=this.getViewportSize();return{top:e.top,left:e.left,bottom:e.top+r,right:e.left+i,height:r,width:i}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let e=this._document,i=this._getWindow(),r=e.documentElement,o=r.getBoundingClientRect(),a=-o.top||e.body?.scrollTop||i.scrollY||r.scrollTop||0,s=-o.left||e.body?.scrollLeft||i.scrollX||r.scrollLeft||0;return{top:a,left:s}}change(e=NF){return e>0?this._change.pipe(Nc(e)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let e=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:e.innerWidth,height:e.innerHeight}:{width:0,height:0}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var xo=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=$({type:t});static \u0275inj=H({})}return t})(),I_=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=$({type:t});static \u0275inj=H({imports:[be,xo,be,xo]})}return t})();var k_={},qe=class t{_appId=u(_r);static _infix=`a${Math.floor(Math.random()*1e5).toString()}`;getId(n,e=!1){return this._appId!=="ng"&&(n+=this._appId),k_.hasOwnProperty(n)||(k_[n]=0),`${n}${e?t._infix+"-":""}${k_[n]++}`}static \u0275fac=function(e){return new(e||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})};var pl=class{_attachedHost=null;attach(n){return this._attachedHost=n,n.attach(this)}detach(){let n=this._attachedHost;n!=null&&(this._attachedHost=null,n.detach())}get isAttached(){return this._attachedHost!=null}setAttachedHost(n){this._attachedHost=n}},wr=class extends pl{component;viewContainerRef;injector;projectableNodes;bindings;constructor(n,e,i,r,o){super(),this.component=n,this.viewContainerRef=e,this.injector=i,this.projectableNodes=r,this.bindings=o||null}},Er=class extends pl{templateRef;viewContainerRef;context;injector;constructor(n,e,i,r){super(),this.templateRef=n,this.viewContainerRef=e,this.context=i,this.injector=r}get origin(){return this.templateRef.elementRef}attach(n,e=this.context){return this.context=e,super.attach(n)}detach(){return this.context=void 0,super.detach()}},T_=class extends pl{element;constructor(n){super(),this.element=n instanceof P?n.nativeElement:n}},Ku=class{_attachedPortal=null;_disposeFn=null;_isDisposed=!1;hasAttached(){return!!this._attachedPortal}attach(n){if(n instanceof wr)return this._attachedPortal=n,this.attachComponentPortal(n);if(n instanceof Er)return this._attachedPortal=n,this.attachTemplatePortal(n);if(this.attachDomPortal&&n instanceof T_)return this._attachedPortal=n,this.attachDomPortal(n)}attachDomPortal=null;detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn()}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=!0}setDisposeFn(n){this._disposeFn=n}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null)}},Qu=class extends Ku{outletElement;_appRef;_defaultInjector;constructor(n,e,i){super(),this.outletElement=n,this._appRef=e,this._defaultInjector=i}attachComponentPortal(n){let e;if(n.viewContainerRef){let i=n.injector||n.viewContainerRef.injector,r=i.get(bi,null,{optional:!0})||void 0;e=n.viewContainerRef.createComponent(n.component,{index:n.viewContainerRef.length,injector:i,ngModuleRef:r,projectableNodes:n.projectableNodes||void 0,bindings:n.bindings||void 0}),this.setDisposeFn(()=>e.destroy())}else{let i=this._appRef,r=n.injector||this._defaultInjector||ne.NULL,o=r.get(ot,i.injector);e=su(n.component,{elementInjector:r,environmentInjector:o,projectableNodes:n.projectableNodes||void 0,bindings:n.bindings||void 0}),i.attachView(e.hostView),this.setDisposeFn(()=>{i.viewCount>0&&i.detachView(e.hostView),e.destroy()})}return this.outletElement.appendChild(this._getComponentRootNode(e)),this._attachedPortal=n,e}attachTemplatePortal(n){let e=n.viewContainerRef,i=e.createEmbeddedView(n.templateRef,n.context,{injector:n.injector});return i.rootNodes.forEach(r=>this.outletElement.appendChild(r)),i.detectChanges(),this.setDisposeFn(()=>{let r=e.indexOf(i);r!==-1&&e.remove(r)}),this._attachedPortal=n,i}attachDomPortal=n=>{let e=n.element;e.parentNode;let i=this.outletElement.ownerDocument.createComment("dom-portal");e.parentNode.insertBefore(i,e),this.outletElement.appendChild(e),this._attachedPortal=n,super.setDisposeFn(()=>{i.parentNode&&i.parentNode.replaceChild(e,i)})};dispose(){super.dispose(),this.outletElement.remove()}_getComponentRootNode(n){return n.hostView.rootNodes[0]}};var A_=(()=>{class t extends Ku{_moduleRef=u(bi,{optional:!0});_document=u(W);_viewContainerRef=u(Ct);_isInitialized=!1;_attachedRef=null;constructor(){super()}get portal(){return this._attachedPortal}set portal(e){this.hasAttached()&&!e&&!this._isInitialized||(this.hasAttached()&&super.detach(),e&&super.attach(e),this._attachedPortal=e||null)}attached=new S;get attachedRef(){return this._attachedRef}ngOnInit(){this._isInitialized=!0}ngOnDestroy(){super.dispose(),this._attachedRef=this._attachedPortal=null}attachComponentPortal(e){e.setAttachedHost(this);let i=e.viewContainerRef!=null?e.viewContainerRef:this._viewContainerRef,r=i.createComponent(e.component,{index:i.length,injector:e.injector||i.injector,projectableNodes:e.projectableNodes||void 0,ngModuleRef:this._moduleRef||void 0,bindings:e.bindings||void 0});return i!==this._viewContainerRef&&this._getRootNode().appendChild(r.hostView.rootNodes[0]),super.setDisposeFn(()=>r.destroy()),this._attachedPortal=e,this._attachedRef=r,this.attached.emit(r),r}attachTemplatePortal(e){e.setAttachedHost(this);let i=this._viewContainerRef.createEmbeddedView(e.templateRef,e.context,{injector:e.injector});return super.setDisposeFn(()=>this._viewContainerRef.clear()),this._attachedPortal=e,this._attachedRef=i,this.attached.emit(i),i}attachDomPortal=e=>{let i=e.element;i.parentNode;let r=this._document.createComment("dom-portal");e.setAttachedHost(this),i.parentNode.insertBefore(r,i),this._getRootNode().appendChild(i),this._attachedPortal=e,super.setDisposeFn(()=>{r.parentNode&&r.parentNode.replaceChild(i,r)})};_getRootNode(){let e=this._viewContainerRef.element.nativeElement;return e.nodeType===e.ELEMENT_NODE?e:e.parentNode}static \u0275fac=function(i){return new(i||t)};static \u0275dir=z({type:t,selectors:[["","cdkPortalOutlet",""]],inputs:{portal:[0,"cdkPortalOutlet","portal"]},outputs:{attached:"attached"},exportAs:["cdkPortalOutlet"],features:[Ge]})}return t})(),Zu=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=$({type:t});static \u0275inj=H({})}return t})();function vt(t,...n){return n.length?n.some(e=>t[e]):t.altKey||t.shiftKey||t.ctrlKey||t.metaKey}var FE=OE();function of(t){return new Xu(t.get(Cr),t.get(W))}var Xu=class{_viewportRuler;_previousHTMLStyles={top:"",left:""};_previousScrollPosition;_isEnabled=!1;_document;constructor(n,e){this._viewportRuler=n,this._document=e}attach(){}enable(){if(this._canBeEnabled()){let n=this._document.documentElement;this._previousScrollPosition=this._viewportRuler.getViewportScrollPosition(),this._previousHTMLStyles.left=n.style.left||"",this._previousHTMLStyles.top=n.style.top||"",n.style.left=dt(-this._previousScrollPosition.left),n.style.top=dt(-this._previousScrollPosition.top),n.classList.add("cdk-global-scrollblock"),this._isEnabled=!0}}disable(){if(this._isEnabled){let n=this._document.documentElement,e=this._document.body,i=n.style,r=e.style,o=i.scrollBehavior||"",a=r.scrollBehavior||"";this._isEnabled=!1,i.left=this._previousHTMLStyles.left,i.top=this._previousHTMLStyles.top,n.classList.remove("cdk-global-scrollblock"),FE&&(i.scrollBehavior=r.scrollBehavior="auto"),window.scroll(this._previousScrollPosition.left,this._previousScrollPosition.top),FE&&(i.scrollBehavior=o,r.scrollBehavior=a)}}_canBeEnabled(){if(this._document.documentElement.classList.contains("cdk-global-scrollblock")||this._isEnabled)return!1;let e=this._document.documentElement,i=this._viewportRuler.getViewportSize();return e.scrollHeight>i.height||e.scrollWidth>i.width}};function zE(t,n){return new Ju(t.get(xa),t.get(A),t.get(Cr),n)}var Ju=class{_scrollDispatcher;_ngZone;_viewportRuler;_config;_scrollSubscription=null;_overlayRef;_initialScrollPosition;constructor(n,e,i,r){this._scrollDispatcher=n,this._ngZone=e,this._viewportRuler=i,this._config=r}attach(n){this._overlayRef,this._overlayRef=n}enable(){if(this._scrollSubscription)return;let n=this._scrollDispatcher.scrolled(0).pipe(He(e=>!e||!this._overlayRef.overlayElement.contains(e.getElementRef().nativeElement)));this._config&&this._config.threshold&&this._config.threshold>1?(this._initialScrollPosition=this._viewportRuler.getViewportScrollPosition().top,this._scrollSubscription=n.subscribe(()=>{let e=this._viewportRuler.getViewportScrollPosition().top;Math.abs(e-this._initialScrollPosition)>this._config.threshold?this._detach():this._overlayRef.updatePosition()})):this._scrollSubscription=n.subscribe(this._detach)}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}_detach=()=>{this.disable(),this._overlayRef.hasAttached()&&this._ngZone.run(()=>this._overlayRef.detach())}};var gl=class{enable(){}disable(){}attach(){}};function R_(t,n){return n.some(e=>{let i=t.bottom<e.top,r=t.top>e.bottom,o=t.right<e.left,a=t.left>e.right;return i||r||o||a})}function PE(t,n){return n.some(e=>{let i=t.top<e.top,r=t.bottom>e.bottom,o=t.left<e.left,a=t.right>e.right;return i||r||o||a})}function qi(t,n){return new ef(t.get(xa),t.get(Cr),t.get(A),n)}var ef=class{_scrollDispatcher;_viewportRuler;_ngZone;_config;_scrollSubscription=null;_overlayRef;constructor(n,e,i,r){this._scrollDispatcher=n,this._viewportRuler=e,this._ngZone=i,this._config=r}attach(n){this._overlayRef,this._overlayRef=n}enable(){if(!this._scrollSubscription){let n=this._config?this._config.scrollThrottle:0;this._scrollSubscription=this._scrollDispatcher.scrolled(n).subscribe(()=>{if(this._overlayRef.updatePosition(),this._config&&this._config.autoClose){let e=this._overlayRef.overlayElement.getBoundingClientRect(),{width:i,height:r}=this._viewportRuler.getViewportSize();R_(e,[{width:i,height:r,bottom:r,right:i,top:0,left:0}])&&(this.disable(),this._ngZone.run(()=>this._overlayRef.detach()))}})}}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}},UE=(()=>{class t{_injector=u(ne);constructor(){}noop=()=>new gl;close=e=>zE(this._injector,e);block=()=>of(this._injector);reposition=e=>qi(this._injector,e);static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Gi=class{positionStrategy;scrollStrategy=new gl;panelClass="";hasBackdrop=!1;backdropClass="cdk-overlay-dark-backdrop";disableAnimations;width;height;minWidth;minHeight;maxWidth;maxHeight;direction;disposeOnNavigation=!1;usePopover;eventPredicate;constructor(n){if(n){let e=Object.keys(n);for(let i of e)n[i]!==void 0&&(this[i]=n[i])}}},_l=class{offsetX;offsetY;panelClass;originX;originY;overlayX;overlayY;constructor(n,e,i,r,o){this.offsetX=i,this.offsetY=r,this.panelClass=o,this.originX=n.originX,this.originY=n.originY,this.overlayX=e.overlayX,this.overlayY=e.overlayY}};var tf=class{connectionPair;scrollableViewProperties;constructor(n,e){this.connectionPair=n,this.scrollableViewProperties=e}};var $E=(()=>{class t{_attachedOverlays=[];_document=u(W);_isAttached=!1;constructor(){}ngOnDestroy(){this.detach()}add(e){this.remove(e),this._attachedOverlays.push(e)}remove(e){let i=this._attachedOverlays.indexOf(e);i>-1&&this._attachedOverlays.splice(i,1),this._attachedOverlays.length===0&&this.detach()}canReceiveEvent(e,i,r){return r.observers.length<1?!1:e.eventPredicate?e.eventPredicate(i):!0}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),GE=(()=>{class t extends $E{_ngZone=u(A);_renderer=u(rt).createRenderer(null,null);_cleanupKeydown;add(e){super.add(e),this._isAttached||(this._ngZone.runOutsideAngular(()=>{this._cleanupKeydown=this._renderer.listen("body","keydown",this._keydownListener)}),this._isAttached=!0)}detach(){this._isAttached&&(this._cleanupKeydown?.(),this._isAttached=!1)}_keydownListener=e=>{let i=this._attachedOverlays;for(let r=i.length-1;r>-1;r--){let o=i[r];if(this.canReceiveEvent(o,e,o._keydownEvents)){this._ngZone.run(()=>o._keydownEvents.next(e));break}}};static \u0275fac=(()=>{let e;return function(r){return(e||(e=Qn(t)))(r||t)}})();static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),WE=(()=>{class t extends $E{_platform=u(Ce);_ngZone=u(A);_renderer=u(rt).createRenderer(null,null);_cursorOriginalValue;_cursorStyleIsSet=!1;_pointerDownEventTarget=null;_cleanups;add(e){if(super.add(e),!this._isAttached){let i=this._document.body,r={capture:!0},o=this._renderer;this._cleanups=this._ngZone.runOutsideAngular(()=>[o.listen(i,"pointerdown",this._pointerDownListener,r),o.listen(i,"click",this._clickListener,r),o.listen(i,"auxclick",this._clickListener,r),o.listen(i,"contextmenu",this._clickListener,r)]),this._platform.IOS&&!this._cursorStyleIsSet&&(this._cursorOriginalValue=i.style.cursor,i.style.cursor="pointer",this._cursorStyleIsSet=!0),this._isAttached=!0}}detach(){this._isAttached&&(this._cleanups?.forEach(e=>e()),this._cleanups=void 0,this._platform.IOS&&this._cursorStyleIsSet&&(this._document.body.style.cursor=this._cursorOriginalValue,this._cursorStyleIsSet=!1),this._isAttached=!1)}_pointerDownListener=e=>{this._pointerDownEventTarget=Rt(e)};_clickListener=e=>{let i=Rt(e),r=e.type==="click"&&this._pointerDownEventTarget?this._pointerDownEventTarget:i;this._pointerDownEventTarget=null;let o=this._attachedOverlays.slice();for(let a=o.length-1;a>-1;a--){let s=o[a],l=s._outsidePointerEvents;if(!(!s.hasAttached()||!this.canReceiveEvent(s,e,l))){if(LE(s.overlayElement,i)||LE(s.overlayElement,r))break;this._ngZone?this._ngZone.run(()=>l.next(e)):l.next(e)}}};static \u0275fac=(()=>{let e;return function(r){return(e||(e=Qn(t)))(r||t)}})();static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function LE(t,n){let e=typeof ShadowRoot<"u"&&ShadowRoot,i=n;for(;i;){if(i===t)return!0;i=e&&i instanceof ShadowRoot?i.host:i.parentNode}return!1}var qE=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["ng-component"]],hostAttrs:["cdk-overlay-style-loader",""],decls:0,vars:0,template:function(i,r){},styles:[`.cdk-overlay-container, .cdk-global-overlay-wrapper {
  pointer-events: none;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.cdk-overlay-container {
  position: fixed;
}
@layer cdk-overlay {
  .cdk-overlay-container {
    z-index: 1000;
  }
}
.cdk-overlay-container:empty {
  display: none;
}

.cdk-global-overlay-wrapper {
  display: flex;
  position: absolute;
}
@layer cdk-overlay {
  .cdk-global-overlay-wrapper {
    z-index: 1000;
  }
}

.cdk-overlay-pane {
  position: absolute;
  pointer-events: auto;
  box-sizing: border-box;
  display: flex;
  max-width: 100%;
  max-height: 100%;
}
@layer cdk-overlay {
  .cdk-overlay-pane {
    z-index: 1000;
  }
}

.cdk-overlay-backdrop {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: auto;
  -webkit-tap-highlight-color: transparent;
  opacity: 0;
  touch-action: manipulation;
}
@layer cdk-overlay {
  .cdk-overlay-backdrop {
    z-index: 1000;
    transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
  }
}
@media (prefers-reduced-motion) {
  .cdk-overlay-backdrop {
    transition-duration: 1ms;
  }
}

.cdk-overlay-backdrop-showing {
  opacity: 1;
}
@media (forced-colors: active) {
  .cdk-overlay-backdrop-showing {
    opacity: 0.6;
  }
}

@layer cdk-overlay {
  .cdk-overlay-dark-backdrop {
    background: rgba(0, 0, 0, 0.32);
  }
}

.cdk-overlay-transparent-backdrop {
  transition: visibility 1ms linear, opacity 1ms linear;
  visibility: hidden;
  opacity: 1;
}
.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing, .cdk-high-contrast-active .cdk-overlay-transparent-backdrop {
  opacity: 0;
  visibility: visible;
}

.cdk-overlay-backdrop-noop-animation {
  transition: none;
}

.cdk-overlay-connected-position-bounding-box {
  position: absolute;
  display: flex;
  flex-direction: column;
  min-width: 1px;
  min-height: 1px;
}
@layer cdk-overlay {
  .cdk-overlay-connected-position-bounding-box {
    z-index: 1000;
  }
}

.cdk-global-scrollblock {
  position: fixed;
  width: 100%;
  overflow-y: scroll;
}

.cdk-overlay-popover {
  background: none;
  border: none;
  padding: 0;
  outline: 0;
  overflow: visible;
  position: fixed;
  pointer-events: none;
  white-space: normal;
  color: inherit;
  text-decoration: none;
  width: 100%;
  height: 100%;
  inset: auto;
  top: 0;
  left: 0;
}
.cdk-overlay-popover::backdrop {
  display: none;
}
.cdk-overlay-popover .cdk-overlay-backdrop {
  position: fixed;
  z-index: auto;
}
`],encapsulation:2,changeDetection:0})}return t})(),YE=(()=>{class t{_platform=u(Ce);_containerElement;_document=u(W);_styleLoader=u(je);constructor(){}ngOnDestroy(){this._containerElement?.remove()}getContainerElement(){return this._loadStyles(),this._containerElement||this._createContainer(),this._containerElement}_createContainer(){let e="cdk-overlay-container";if(this._platform.isBrowser||M_()){let r=this._document.querySelectorAll(`.${e}[platform="server"], .${e}[platform="test"]`);for(let o=0;o<r.length;o++)r[o].remove()}let i=this._document.createElement("div");i.classList.add(e),M_()?i.setAttribute("platform","test"):this._platform.isBrowser||i.setAttribute("platform","server"),this._document.body.appendChild(i),this._containerElement=i}_loadStyles(){this._styleLoader.load(qE)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),N_=class{_renderer;_ngZone;element;_cleanupClick;_cleanupTransitionEnd;_fallbackTimeout;constructor(n,e,i,r){this._renderer=e,this._ngZone=i,this.element=n.createElement("div"),this.element.classList.add("cdk-overlay-backdrop"),this._cleanupClick=e.listen(this.element,"click",r)}detach(){this._ngZone.runOutsideAngular(()=>{let n=this.element;clearTimeout(this._fallbackTimeout),this._cleanupTransitionEnd?.(),this._cleanupTransitionEnd=this._renderer.listen(n,"transitionend",this.dispose),this._fallbackTimeout=setTimeout(this.dispose,500),n.style.pointerEvents="none",n.classList.remove("cdk-overlay-backdrop-showing")})}dispose=()=>{clearTimeout(this._fallbackTimeout),this._cleanupClick?.(),this._cleanupTransitionEnd?.(),this._cleanupClick=this._cleanupTransitionEnd=this._fallbackTimeout=void 0,this.element.remove()}};function O_(t){return t&&t.nodeType===1}var nf=class{_portalOutlet;_host;_pane;_config;_ngZone;_keyboardDispatcher;_document;_location;_outsideClickDispatcher;_animationsDisabled;_injector;_renderer;_backdropClick=new M;_attachments=new M;_detachments=new M;_positionStrategy;_scrollStrategy;_locationChanges=se.EMPTY;_backdropRef=null;_detachContentMutationObserver;_detachContentAfterRenderRef;_disposed=!1;_previousHostParent;_keydownEvents=new M;_outsidePointerEvents=new M;_afterNextRenderRef;constructor(n,e,i,r,o,a,s,l,c,d=!1,f,m){this._portalOutlet=n,this._host=e,this._pane=i,this._config=r,this._ngZone=o,this._keyboardDispatcher=a,this._document=s,this._location=l,this._outsideClickDispatcher=c,this._animationsDisabled=d,this._injector=f,this._renderer=m,r.scrollStrategy&&(this._scrollStrategy=r.scrollStrategy,this._scrollStrategy.attach(this)),this._positionStrategy=r.positionStrategy}get overlayElement(){return this._pane}get backdropElement(){return this._backdropRef?.element||null}get hostElement(){return this._host}get eventPredicate(){return this._config?.eventPredicate||null}attach(n){if(this._disposed)return null;this._attachHost();let e=this._portalOutlet.attach(n);return this._positionStrategy?.attach(this),this._updateStackingOrder(),this._updateElementSize(),this._updateElementDirection(),this._scrollStrategy&&this._scrollStrategy.enable(),this._afterNextRenderRef?.destroy(),this._afterNextRenderRef=At(()=>{this.hasAttached()&&this.updatePosition()},{injector:this._injector}),this._togglePointerEvents(!0),this._config.hasBackdrop&&this._attachBackdrop(),this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!0),this._attachments.next(),this._completeDetachContent(),this._keyboardDispatcher.add(this),this._config.disposeOnNavigation&&(this._locationChanges=this._location.subscribe(()=>this.dispose())),this._outsideClickDispatcher.add(this),typeof e?.onDestroy=="function"&&e.onDestroy(()=>{this.hasAttached()&&this._ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>this.detach()))}),e}detach(){if(!this.hasAttached())return;this.detachBackdrop(),this._togglePointerEvents(!1),this._positionStrategy&&this._positionStrategy.detach&&this._positionStrategy.detach(),this._scrollStrategy&&this._scrollStrategy.disable();let n=this._portalOutlet.detach();return this._detachments.next(),this._completeDetachContent(),this._keyboardDispatcher.remove(this),this._detachContentWhenEmpty(),this._locationChanges.unsubscribe(),this._outsideClickDispatcher.remove(this),n}dispose(){if(this._disposed)return;let n=this.hasAttached();this._positionStrategy&&this._positionStrategy.dispose(),this._disposeScrollStrategy(),this._backdropRef?.dispose(),this._locationChanges.unsubscribe(),this._keyboardDispatcher.remove(this),this._portalOutlet.dispose(),this._attachments.complete(),this._backdropClick.complete(),this._keydownEvents.complete(),this._outsidePointerEvents.complete(),this._outsideClickDispatcher.remove(this),this._host?.remove(),this._afterNextRenderRef?.destroy(),this._previousHostParent=this._pane=this._host=this._backdropRef=null,n&&this._detachments.next(),this._detachments.complete(),this._completeDetachContent(),this._disposed=!0}hasAttached(){return this._portalOutlet.hasAttached()}backdropClick(){return this._backdropClick}attachments(){return this._attachments}detachments(){return this._detachments}keydownEvents(){return this._keydownEvents}outsidePointerEvents(){return this._outsidePointerEvents}getConfig(){return this._config}updatePosition(){this._positionStrategy&&this._positionStrategy.apply()}updatePositionStrategy(n){n!==this._positionStrategy&&(this._positionStrategy&&this._positionStrategy.dispose(),this._positionStrategy=n,this.hasAttached()&&(n.attach(this),this.updatePosition()))}updateSize(n){this._config=N(N({},this._config),n),this._updateElementSize()}setDirection(n){this._config=De(N({},this._config),{direction:n}),this._updateElementDirection()}addPanelClass(n){this._pane&&this._toggleClasses(this._pane,n,!0)}removePanelClass(n){this._pane&&this._toggleClasses(this._pane,n,!1)}getDirection(){let n=this._config.direction;return n?typeof n=="string"?n:n.value:"ltr"}updateScrollStrategy(n){n!==this._scrollStrategy&&(this._disposeScrollStrategy(),this._scrollStrategy=n,this.hasAttached()&&(n.attach(this),n.enable()))}_updateElementDirection(){this._host.setAttribute("dir",this.getDirection())}_updateElementSize(){if(!this._pane)return;let n=this._pane.style;n.width=dt(this._config.width),n.height=dt(this._config.height),n.minWidth=dt(this._config.minWidth),n.minHeight=dt(this._config.minHeight),n.maxWidth=dt(this._config.maxWidth),n.maxHeight=dt(this._config.maxHeight)}_togglePointerEvents(n){this._pane.style.pointerEvents=n?"":"none"}_attachHost(){if(!this._host.parentElement){let n=this._config.usePopover?this._positionStrategy?.getPopoverInsertionPoint?.():null;O_(n)?n.after(this._host):n?.type==="parent"?n.element.appendChild(this._host):this._previousHostParent?.appendChild(this._host)}if(this._config.usePopover)try{this._host.showPopover()}catch(n){}}_attachBackdrop(){let n="cdk-overlay-backdrop-showing";this._backdropRef?.dispose(),this._backdropRef=new N_(this._document,this._renderer,this._ngZone,e=>{this._backdropClick.next(e)}),this._animationsDisabled&&this._backdropRef.element.classList.add("cdk-overlay-backdrop-noop-animation"),this._config.backdropClass&&this._toggleClasses(this._backdropRef.element,this._config.backdropClass,!0),this._config.usePopover?this._host.prepend(this._backdropRef.element):this._host.parentElement.insertBefore(this._backdropRef.element,this._host),!this._animationsDisabled&&typeof requestAnimationFrame<"u"?this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>this._backdropRef?.element.classList.add(n))}):this._backdropRef.element.classList.add(n)}_updateStackingOrder(){!this._config.usePopover&&this._host.nextSibling&&this._host.parentNode.appendChild(this._host)}detachBackdrop(){this._animationsDisabled?(this._backdropRef?.dispose(),this._backdropRef=null):this._backdropRef?.detach()}_toggleClasses(n,e,i){let r=Ea(e||[]).filter(o=>!!o);r.length&&(i?n.classList.add(...r):n.classList.remove(...r))}_detachContentWhenEmpty(){let n=!1;try{this._detachContentAfterRenderRef=At(()=>{n=!0,this._detachContent()},{injector:this._injector})}catch(e){if(n)throw e;this._detachContent()}globalThis.MutationObserver&&this._pane&&(this._detachContentMutationObserver||=new globalThis.MutationObserver(()=>{this._detachContent()}),this._detachContentMutationObserver.observe(this._pane,{childList:!0}))}_detachContent(){(!this._pane||!this._host||this._pane.children.length===0)&&(this._pane&&this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!1),this._host&&this._host.parentElement&&(this._previousHostParent=this._host.parentElement,this._host.remove()),this._completeDetachContent())}_completeDetachContent(){this._detachContentAfterRenderRef?.destroy(),this._detachContentAfterRenderRef=void 0,this._detachContentMutationObserver?.disconnect()}_disposeScrollStrategy(){let n=this._scrollStrategy;n?.disable(),n?.detach?.()}},VE="cdk-overlay-connected-position-bounding-box",OF=/([A-Za-z%]+)$/;function Mo(t,n){return new Sa(n,t.get(Cr),t.get(W),t.get(Ce),t.get(YE))}var Sa=class{_viewportRuler;_document;_platform;_overlayContainer;_overlayRef;_isInitialRender=!1;_lastBoundingBoxSize={width:0,height:0};_isPushed=!1;_canPush=!0;_growAfterOpen=!1;_hasFlexibleDimensions=!0;_positionLocked=!1;_originRect;_overlayRect;_viewportRect;_containerRect;_viewportMargin=0;_scrollables=[];_preferredPositions=[];_origin;_pane;_isDisposed=!1;_boundingBox=null;_lastPosition=null;_lastScrollVisibility=null;_positionChanges=new M;_resizeSubscription=se.EMPTY;_offsetX=0;_offsetY=0;_transformOriginSelector;_appliedPanelClasses=[];_previousPushAmount=null;_popoverLocation="global";positionChanges=this._positionChanges;get positions(){return this._preferredPositions}constructor(n,e,i,r,o){this._viewportRuler=e,this._document=i,this._platform=r,this._overlayContainer=o,this.setOrigin(n)}attach(n){this._overlayRef&&this._overlayRef,this._validatePositions(),n.hostElement.classList.add(VE),this._overlayRef=n,this._boundingBox=n.hostElement,this._pane=n.overlayElement,this._isDisposed=!1,this._isInitialRender=!0,this._lastPosition=null,this._resizeSubscription.unsubscribe(),this._resizeSubscription=this._viewportRuler.change().subscribe(()=>{this._isInitialRender=!0,this.apply()})}apply(){if(this._isDisposed||!this._platform.isBrowser)return;if(!this._isInitialRender&&this._positionLocked&&this._lastPosition){this.reapplyLastPosition();return}this._clearPanelClasses(),this._resetOverlayElementStyles(),this._resetBoundingBoxStyles(),this._viewportRect=this._getNarrowedViewportRect(),this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._containerRect=this._getContainerRect();let n=this._originRect,e=this._overlayRect,i=this._viewportRect,r=this._containerRect,o=[],a;for(let s of this._preferredPositions){let l=this._getOriginPoint(n,r,s),c=this._getOverlayPoint(l,e,s),d=this._getOverlayFit(c,e,i,s);if(d.isCompletelyWithinViewport){this._isPushed=!1,this._applyPosition(s,l);return}if(this._canFitWithFlexibleDimensions(d,c,i)){o.push({position:s,origin:l,overlayRect:e,boundingBoxRect:this._calculateBoundingBoxRect(l,s)});continue}(!a||a.overlayFit.visibleArea<d.visibleArea)&&(a={overlayFit:d,overlayPoint:c,originPoint:l,position:s,overlayRect:e})}if(o.length){let s=null,l=-1;for(let c of o){let d=c.boundingBoxRect.width*c.boundingBoxRect.height*(c.position.weight||1);d>l&&(l=d,s=c)}this._isPushed=!1,this._applyPosition(s.position,s.origin);return}if(this._canPush){this._isPushed=!0,this._applyPosition(a.position,a.originPoint);return}this._applyPosition(a.position,a.originPoint)}detach(){this._clearPanelClasses(),this._lastPosition=null,this._previousPushAmount=null,this._resizeSubscription.unsubscribe()}dispose(){this._isDisposed||(this._boundingBox&&So(this._boundingBox.style,{top:"",left:"",right:"",bottom:"",height:"",width:"",alignItems:"",justifyContent:""}),this._pane&&this._resetOverlayElementStyles(),this._overlayRef&&this._overlayRef.hostElement.classList.remove(VE),this.detach(),this._positionChanges.complete(),this._overlayRef=this._boundingBox=null,this._isDisposed=!0)}reapplyLastPosition(){if(this._isDisposed||!this._platform.isBrowser)return;let n=this._lastPosition;n?(this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._viewportRect=this._getNarrowedViewportRect(),this._containerRect=this._getContainerRect(),this._applyPosition(n,this._getOriginPoint(this._originRect,this._containerRect,n))):this.apply()}withScrollableContainers(n){return this._scrollables=n,this}withPositions(n){return this._preferredPositions=n,n.indexOf(this._lastPosition)===-1&&(this._lastPosition=null),this._validatePositions(),this}withViewportMargin(n){return this._viewportMargin=n,this}withFlexibleDimensions(n=!0){return this._hasFlexibleDimensions=n,this}withGrowAfterOpen(n=!0){return this._growAfterOpen=n,this}withPush(n=!0){return this._canPush=n,this}withLockedPosition(n=!0){return this._positionLocked=n,this}setOrigin(n){return this._origin=n,this}withDefaultOffsetX(n){return this._offsetX=n,this}withDefaultOffsetY(n){return this._offsetY=n,this}withTransformOriginOn(n){return this._transformOriginSelector=n,this}withPopoverLocation(n){return this._popoverLocation=n,this}getPopoverInsertionPoint(){return this._popoverLocation==="global"?null:this._popoverLocation!=="inline"?this._popoverLocation:this._origin instanceof P?this._origin.nativeElement:O_(this._origin)?this._origin:null}_getOriginPoint(n,e,i){let r;if(i.originX=="center")r=n.left+n.width/2;else{let a=this._isRtl()?n.right:n.left,s=this._isRtl()?n.left:n.right;r=i.originX=="start"?a:s}e.left<0&&(r-=e.left);let o;return i.originY=="center"?o=n.top+n.height/2:o=i.originY=="top"?n.top:n.bottom,e.top<0&&(o-=e.top),{x:r,y:o}}_getOverlayPoint(n,e,i){let r;i.overlayX=="center"?r=-e.width/2:i.overlayX==="start"?r=this._isRtl()?-e.width:0:r=this._isRtl()?0:-e.width;let o;return i.overlayY=="center"?o=-e.height/2:o=i.overlayY=="top"?0:-e.height,{x:n.x+r,y:n.y+o}}_getOverlayFit(n,e,i,r){let o=jE(e),{x:a,y:s}=n,l=this._getOffset(r,"x"),c=this._getOffset(r,"y");l&&(a+=l),c&&(s+=c);let d=0-a,f=a+o.width-i.width,m=0-s,h=s+o.height-i.height,_=this._subtractOverflows(o.width,d,f),D=this._subtractOverflows(o.height,m,h),E=_*D;return{visibleArea:E,isCompletelyWithinViewport:o.width*o.height===E,fitsInViewportVertically:D===o.height,fitsInViewportHorizontally:_==o.width}}_canFitWithFlexibleDimensions(n,e,i){if(this._hasFlexibleDimensions){let r=i.bottom-e.y,o=i.right-e.x,a=BE(this._overlayRef.getConfig().minHeight),s=BE(this._overlayRef.getConfig().minWidth),l=n.fitsInViewportVertically||a!=null&&a<=r,c=n.fitsInViewportHorizontally||s!=null&&s<=o;return l&&c}return!1}_pushOverlayOnScreen(n,e,i){if(this._previousPushAmount&&this._positionLocked)return{x:n.x+this._previousPushAmount.x,y:n.y+this._previousPushAmount.y};let r=jE(e),o=this._viewportRect,a=Math.max(n.x+r.width-o.width,0),s=Math.max(n.y+r.height-o.height,0),l=Math.max(o.top-i.top-n.y,0),c=Math.max(o.left-i.left-n.x,0),d=0,f=0;return r.width<=o.width?d=c||-a:d=n.x<this._getViewportMarginStart()?o.left-i.left-n.x:0,r.height<=o.height?f=l||-s:f=n.y<this._getViewportMarginTop()?o.top-i.top-n.y:0,this._previousPushAmount={x:d,y:f},{x:n.x+d,y:n.y+f}}_applyPosition(n,e){if(this._setTransformOrigin(n),this._setOverlayElementStyles(e,n),this._setBoundingBoxStyles(e,n),n.panelClass&&this._addPanelClasses(n.panelClass),this._positionChanges.observers.length){let i=this._getScrollVisibility();if(n!==this._lastPosition||!this._lastScrollVisibility||!FF(this._lastScrollVisibility,i)){let r=new tf(n,i);this._positionChanges.next(r)}this._lastScrollVisibility=i}this._lastPosition=n,this._isInitialRender=!1}_setTransformOrigin(n){if(!this._transformOriginSelector)return;let e=this._boundingBox.querySelectorAll(this._transformOriginSelector),i,r=n.overlayY;n.overlayX==="center"?i="center":this._isRtl()?i=n.overlayX==="start"?"right":"left":i=n.overlayX==="start"?"left":"right";for(let o=0;o<e.length;o++)e[o].style.transformOrigin=`${i} ${r}`}_calculateBoundingBoxRect(n,e){let i=this._viewportRect,r=this._isRtl(),o,a,s;if(e.overlayY==="top")a=n.y,o=i.height-a+this._getViewportMarginBottom();else if(e.overlayY==="bottom")s=i.height-n.y+this._getViewportMarginTop()+this._getViewportMarginBottom(),o=i.height-s+this._getViewportMarginTop();else{let h=Math.min(i.bottom-n.y+i.top,n.y),_=this._lastBoundingBoxSize.height;o=h*2,a=n.y-h,o>_&&!this._isInitialRender&&!this._growAfterOpen&&(a=n.y-_/2)}let l=e.overlayX==="start"&&!r||e.overlayX==="end"&&r,c=e.overlayX==="end"&&!r||e.overlayX==="start"&&r,d,f,m;if(c)m=i.width-n.x+this._getViewportMarginStart()+this._getViewportMarginEnd(),d=n.x-this._getViewportMarginStart();else if(l)f=n.x,d=i.right-n.x-this._getViewportMarginEnd();else{let h=Math.min(i.right-n.x+i.left,n.x),_=this._lastBoundingBoxSize.width;d=h*2,f=n.x-h,d>_&&!this._isInitialRender&&!this._growAfterOpen&&(f=n.x-_/2)}return{top:a,left:f,bottom:s,right:m,width:d,height:o}}_setBoundingBoxStyles(n,e){let i=this._calculateBoundingBoxRect(n,e);!this._isInitialRender&&!this._growAfterOpen&&(i.height=Math.min(i.height,this._lastBoundingBoxSize.height),i.width=Math.min(i.width,this._lastBoundingBoxSize.width));let r={};if(this._hasExactPosition())r.top=r.left="0",r.bottom=r.right="auto",r.maxHeight=r.maxWidth="",r.width=r.height="100%";else{let o=this._overlayRef.getConfig().maxHeight,a=this._overlayRef.getConfig().maxWidth;r.width=dt(i.width),r.height=dt(i.height),r.top=dt(i.top)||"auto",r.bottom=dt(i.bottom)||"auto",r.left=dt(i.left)||"auto",r.right=dt(i.right)||"auto",e.overlayX==="center"?r.alignItems="center":r.alignItems=e.overlayX==="end"?"flex-end":"flex-start",e.overlayY==="center"?r.justifyContent="center":r.justifyContent=e.overlayY==="bottom"?"flex-end":"flex-start",o&&(r.maxHeight=dt(o)),a&&(r.maxWidth=dt(a))}this._lastBoundingBoxSize=i,So(this._boundingBox.style,r)}_resetBoundingBoxStyles(){So(this._boundingBox.style,{top:"0",left:"0",right:"0",bottom:"0",height:"",width:"",alignItems:"",justifyContent:""})}_resetOverlayElementStyles(){So(this._pane.style,{top:"",left:"",bottom:"",right:"",position:"",transform:""})}_setOverlayElementStyles(n,e){let i={},r=this._hasExactPosition(),o=this._hasFlexibleDimensions,a=this._overlayRef.getConfig();if(r){let d=this._viewportRuler.getViewportScrollPosition();So(i,this._getExactOverlayY(e,n,d)),So(i,this._getExactOverlayX(e,n,d))}else i.position="static";let s="",l=this._getOffset(e,"x"),c=this._getOffset(e,"y");l&&(s+=`translateX(${l}px) `),c&&(s+=`translateY(${c}px)`),i.transform=s.trim(),a.maxHeight&&(r?i.maxHeight=dt(a.maxHeight):o&&(i.maxHeight="")),a.maxWidth&&(r?i.maxWidth=dt(a.maxWidth):o&&(i.maxWidth="")),So(this._pane.style,i)}_getExactOverlayY(n,e,i){let r={top:"",bottom:""},o=this._getOverlayPoint(e,this._overlayRect,n);if(this._isPushed&&(o=this._pushOverlayOnScreen(o,this._overlayRect,i)),n.overlayY==="bottom"){let a=this._document.documentElement.clientHeight;r.bottom=`${a-(o.y+this._overlayRect.height)}px`}else r.top=dt(o.y);return r}_getExactOverlayX(n,e,i){let r={left:"",right:""},o=this._getOverlayPoint(e,this._overlayRect,n);this._isPushed&&(o=this._pushOverlayOnScreen(o,this._overlayRect,i));let a;if(this._isRtl()?a=n.overlayX==="end"?"left":"right":a=n.overlayX==="end"?"right":"left",a==="right"){let s=this._document.documentElement.clientWidth;r.right=`${s-(o.x+this._overlayRect.width)}px`}else r.left=dt(o.x);return r}_getScrollVisibility(){let n=this._getOriginRect(),e=this._pane.getBoundingClientRect(),i=this._scrollables.map(r=>r.getElementRef().nativeElement.getBoundingClientRect());return{isOriginClipped:PE(n,i),isOriginOutsideView:R_(n,i),isOverlayClipped:PE(e,i),isOverlayOutsideView:R_(e,i)}}_subtractOverflows(n,...e){return e.reduce((i,r)=>i-Math.max(r,0),n)}_getNarrowedViewportRect(){let n=this._document.documentElement.clientWidth,e=this._document.documentElement.clientHeight,i=this._viewportRuler.getViewportScrollPosition();return{top:i.top+this._getViewportMarginTop(),left:i.left+this._getViewportMarginStart(),right:i.left+n-this._getViewportMarginEnd(),bottom:i.top+e-this._getViewportMarginBottom(),width:n-this._getViewportMarginStart()-this._getViewportMarginEnd(),height:e-this._getViewportMarginTop()-this._getViewportMarginBottom()}}_isRtl(){return this._overlayRef.getDirection()==="rtl"}_hasExactPosition(){return!this._hasFlexibleDimensions||this._isPushed}_getOffset(n,e){return e==="x"?n.offsetX==null?this._offsetX:n.offsetX:n.offsetY==null?this._offsetY:n.offsetY}_validatePositions(){}_addPanelClasses(n){this._pane&&Ea(n).forEach(e=>{e!==""&&this._appliedPanelClasses.indexOf(e)===-1&&(this._appliedPanelClasses.push(e),this._pane.classList.add(e))})}_clearPanelClasses(){this._pane&&(this._appliedPanelClasses.forEach(n=>{this._pane.classList.remove(n)}),this._appliedPanelClasses=[])}_getViewportMarginStart(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.start??0}_getViewportMarginEnd(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.end??0}_getViewportMarginTop(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.top??0}_getViewportMarginBottom(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.bottom??0}_getOriginRect(){let n=this._origin;if(n instanceof P)return n.nativeElement.getBoundingClientRect();if(n instanceof Element)return n.getBoundingClientRect();let e=n.width||0,i=n.height||0;return{top:n.y,bottom:n.y+i,left:n.x,right:n.x+e,height:i,width:e}}_getContainerRect(){let n=this._overlayRef.getConfig().usePopover&&this._popoverLocation!=="global",e=this._overlayContainer.getContainerElement();n&&(e.style.display="block");let i=e.getBoundingClientRect();return n&&(e.style.display=""),i}};function So(t,n){for(let e in n)n.hasOwnProperty(e)&&(t[e]=n[e]);return t}function BE(t){if(typeof t!="number"&&t!=null){let[n,e]=t.split(OF);return!e||e==="px"?parseFloat(n):null}return t||null}function jE(t){return{top:Math.floor(t.top),right:Math.floor(t.right),bottom:Math.floor(t.bottom),left:Math.floor(t.left),width:Math.floor(t.width),height:Math.floor(t.height)}}function FF(t,n){return t===n?!0:t.isOriginClipped===n.isOriginClipped&&t.isOriginOutsideView===n.isOriginOutsideView&&t.isOverlayClipped===n.isOverlayClipped&&t.isOverlayOutsideView===n.isOverlayOutsideView}var HE="cdk-global-overlay-wrapper";function af(t){return new rf}var rf=class{_overlayRef;_cssPosition="static";_topOffset="";_bottomOffset="";_alignItems="";_xPosition="";_xOffset="";_width="";_height="";_isDisposed=!1;attach(n){let e=n.getConfig();this._overlayRef=n,this._width&&!e.width&&n.updateSize({width:this._width}),this._height&&!e.height&&n.updateSize({height:this._height}),n.hostElement.classList.add(HE),this._isDisposed=!1}top(n=""){return this._bottomOffset="",this._topOffset=n,this._alignItems="flex-start",this}left(n=""){return this._xOffset=n,this._xPosition="left",this}bottom(n=""){return this._topOffset="",this._bottomOffset=n,this._alignItems="flex-end",this}right(n=""){return this._xOffset=n,this._xPosition="right",this}start(n=""){return this._xOffset=n,this._xPosition="start",this}end(n=""){return this._xOffset=n,this._xPosition="end",this}width(n=""){return this._overlayRef?this._overlayRef.updateSize({width:n}):this._width=n,this}height(n=""){return this._overlayRef?this._overlayRef.updateSize({height:n}):this._height=n,this}centerHorizontally(n=""){return this.left(n),this._xPosition="center",this}centerVertically(n=""){return this.top(n),this._alignItems="center",this}apply(){if(!this._overlayRef||!this._overlayRef.hasAttached())return;let n=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement.style,i=this._overlayRef.getConfig(),{width:r,height:o,maxWidth:a,maxHeight:s}=i,l=(r==="100%"||r==="100vw")&&(!a||a==="100%"||a==="100vw"),c=(o==="100%"||o==="100vh")&&(!s||s==="100%"||s==="100vh"),d=this._xPosition,f=this._xOffset,m=this._overlayRef.getConfig().direction==="rtl",h="",_="",D="";l?D="flex-start":d==="center"?(D="center",m?_=f:h=f):m?d==="left"||d==="end"?(D="flex-end",h=f):(d==="right"||d==="start")&&(D="flex-start",_=f):d==="left"||d==="start"?(D="flex-start",h=f):(d==="right"||d==="end")&&(D="flex-end",_=f),n.position=this._cssPosition,n.marginLeft=l?"0":h,n.marginTop=c?"0":this._topOffset,n.marginBottom=this._bottomOffset,n.marginRight=l?"0":_,e.justifyContent=D,e.alignItems=c?"flex-start":this._alignItems}dispose(){if(this._isDisposed||!this._overlayRef)return;let n=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement,i=e.style;e.classList.remove(HE),i.justifyContent=i.alignItems=n.marginTop=n.marginBottom=n.marginLeft=n.marginRight=n.position="",this._overlayRef=null,this._isDisposed=!0}},KE=(()=>{class t{_injector=u(ne);constructor(){}global(){return af()}flexibleConnectedTo(e){return Mo(this._injector,e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),vl=new b("OVERLAY_DEFAULT_CONFIG");function Io(t,n){t.get(je).load(qE);let e=t.get(YE),i=t.get(W),r=t.get(qe),o=t.get(Jt),a=t.get(Et),s=t.get($e,null,{optional:!0})||t.get(rt).createRenderer(null,null),l=new Gi(n),c=t.get(vl,null,{optional:!0})?.usePopover??!0;l.direction=l.direction||a.value,"showPopover"in i.body?l.usePopover=n?.usePopover??c:l.usePopover=!1;let d=i.createElement("div"),f=i.createElement("div");d.id=r.getId("cdk-overlay-"),d.classList.add("cdk-overlay-pane"),f.appendChild(d),l.usePopover&&(f.setAttribute("popover","manual"),f.classList.add("cdk-overlay-popover"));let m=l.usePopover?l.positionStrategy?.getPopoverInsertionPoint?.():null;return O_(m)?m.after(f):m?.type==="parent"?m.element.appendChild(f):e.getContainerElement().appendChild(f),new nf(new Qu(d,o,t),f,d,l,t.get(A),t.get(GE),i,t.get(du),t.get(WE),n?.disableAnimations??t.get(vr,null,{optional:!0})==="NoopAnimations",t.get(ot),s)}var sf=(()=>{class t{scrollStrategies=u(UE);_positionBuilder=u(KE);_injector=u(ne);constructor(){}create(e){return Io(this._injector,e)}position(){return this._positionBuilder}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),PF=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top"},{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom"},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom"},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top"}],LF=new b("cdk-connected-overlay-scroll-strategy",{providedIn:"root",factory:()=>{let t=u(ne);return()=>qi(t)}}),Ma=(()=>{class t{elementRef=u(P);constructor(){}static \u0275fac=function(i){return new(i||t)};static \u0275dir=z({type:t,selectors:[["","cdk-overlay-origin",""],["","overlay-origin",""],["","cdkOverlayOrigin",""]],exportAs:["cdkOverlayOrigin"]})}return t})(),QE=new b("cdk-connected-overlay-default-config"),lf=(()=>{class t{_dir=u(Et,{optional:!0});_injector=u(ne);_overlayRef;_templatePortal;_backdropSubscription=se.EMPTY;_attachSubscription=se.EMPTY;_detachSubscription=se.EMPTY;_positionSubscription=se.EMPTY;_offsetX;_offsetY;_position;_scrollStrategyFactory=u(LF);_ngZone=u(A);origin;positions;positionStrategy;get offsetX(){return this._offsetX}set offsetX(e){this._offsetX=e,this._position&&this._updatePositionStrategy(this._position)}get offsetY(){return this._offsetY}set offsetY(e){this._offsetY=e,this._position&&this._updatePositionStrategy(this._position)}width;height;minWidth;minHeight;backdropClass;panelClass;viewportMargin=0;scrollStrategy;open=!1;disableClose=!1;transformOriginSelector;hasBackdrop=!1;lockPosition=!1;flexibleDimensions=!1;growAfterOpen=!1;push=!1;disposeOnNavigation=!1;usePopover;matchWidth=!1;set _config(e){typeof e!="string"&&this._assignConfig(e)}backdropClick=new S;positionChange=new S;attach=new S;detach=new S;overlayKeydown=new S;overlayOutsideClick=new S;constructor(){let e=u(un),i=u(Ct),r=u(QE,{optional:!0}),o=u(vl,{optional:!0});this.usePopover=o?.usePopover===!1?null:"global",this._templatePortal=new Er(e,i),this.scrollStrategy=this._scrollStrategyFactory(),r&&this._assignConfig(r)}get overlayRef(){return this._overlayRef}get dir(){return this._dir?this._dir.value:"ltr"}ngOnDestroy(){this._attachSubscription.unsubscribe(),this._detachSubscription.unsubscribe(),this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this._overlayRef?.dispose()}ngOnChanges(e){this._position&&(this._updatePositionStrategy(this._position),this._overlayRef?.updateSize({width:this._getWidth(),minWidth:this.minWidth,height:this.height,minHeight:this.minHeight}),e.origin&&this.open&&this._position.apply()),e.open&&(this.open?this.attachOverlay():this.detachOverlay())}_createOverlay(){(!this.positions||!this.positions.length)&&(this.positions=PF);let e=this._overlayRef=Io(this._injector,this._buildConfig());this._attachSubscription=e.attachments().subscribe(()=>this.attach.emit()),this._detachSubscription=e.detachments().subscribe(()=>this.detach.emit()),e.keydownEvents().subscribe(i=>{this.overlayKeydown.next(i),i.keyCode===27&&!this.disableClose&&!vt(i)&&(i.preventDefault(),this.detachOverlay())}),this._overlayRef.outsidePointerEvents().subscribe(i=>{let r=this._getOriginElement(),o=Rt(i);(!r||r!==o&&!r.contains(o))&&this.overlayOutsideClick.next(i)})}_buildConfig(){let e=this._position=this.positionStrategy||this._createPositionStrategy(),i=new Gi({direction:this._dir||"ltr",positionStrategy:e,scrollStrategy:this.scrollStrategy,hasBackdrop:this.hasBackdrop,disposeOnNavigation:this.disposeOnNavigation,usePopover:!!this.usePopover});return(this.height||this.height===0)&&(i.height=this.height),(this.minWidth||this.minWidth===0)&&(i.minWidth=this.minWidth),(this.minHeight||this.minHeight===0)&&(i.minHeight=this.minHeight),this.backdropClass&&(i.backdropClass=this.backdropClass),this.panelClass&&(i.panelClass=this.panelClass),i}_updatePositionStrategy(e){let i=this.positions.map(r=>({originX:r.originX,originY:r.originY,overlayX:r.overlayX,overlayY:r.overlayY,offsetX:r.offsetX||this.offsetX,offsetY:r.offsetY||this.offsetY,panelClass:r.panelClass||void 0}));return e.setOrigin(this._getOrigin()).withPositions(i).withFlexibleDimensions(this.flexibleDimensions).withPush(this.push).withGrowAfterOpen(this.growAfterOpen).withViewportMargin(this.viewportMargin).withLockedPosition(this.lockPosition).withTransformOriginOn(this.transformOriginSelector).withPopoverLocation(this.usePopover===null?"global":this.usePopover)}_createPositionStrategy(){let e=Mo(this._injector,this._getOrigin());return this._updatePositionStrategy(e),e}_getOrigin(){return this.origin instanceof Ma?this.origin.elementRef:this.origin}_getOriginElement(){return this.origin instanceof Ma?this.origin.elementRef.nativeElement:this.origin instanceof P?this.origin.nativeElement:typeof Element<"u"&&this.origin instanceof Element?this.origin:null}_getWidth(){return this.width?this.width:this.matchWidth?this._getOriginElement()?.getBoundingClientRect?.().width:void 0}attachOverlay(){this._overlayRef||this._createOverlay();let e=this._overlayRef;e.getConfig().hasBackdrop=this.hasBackdrop,e.updateSize({width:this._getWidth()}),e.hasAttached()||e.attach(this._templatePortal),this.hasBackdrop?this._backdropSubscription=e.backdropClick().subscribe(i=>this.backdropClick.emit(i)):this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this.positionChange.observers.length>0&&(this._positionSubscription=this._position.positionChanges.pipe(Ah(()=>this.positionChange.observers.length>0)).subscribe(i=>{this._ngZone.run(()=>this.positionChange.emit(i)),this.positionChange.observers.length===0&&this._positionSubscription.unsubscribe()})),this.open=!0}detachOverlay(){this._overlayRef?.detach(),this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this.open=!1}_assignConfig(e){this.origin=e.origin??this.origin,this.positions=e.positions??this.positions,this.positionStrategy=e.positionStrategy??this.positionStrategy,this.offsetX=e.offsetX??this.offsetX,this.offsetY=e.offsetY??this.offsetY,this.width=e.width??this.width,this.height=e.height??this.height,this.minWidth=e.minWidth??this.minWidth,this.minHeight=e.minHeight??this.minHeight,this.backdropClass=e.backdropClass??this.backdropClass,this.panelClass=e.panelClass??this.panelClass,this.viewportMargin=e.viewportMargin??this.viewportMargin,this.scrollStrategy=e.scrollStrategy??this.scrollStrategy,this.disableClose=e.disableClose??this.disableClose,this.transformOriginSelector=e.transformOriginSelector??this.transformOriginSelector,this.hasBackdrop=e.hasBackdrop??this.hasBackdrop,this.lockPosition=e.lockPosition??this.lockPosition,this.flexibleDimensions=e.flexibleDimensions??this.flexibleDimensions,this.growAfterOpen=e.growAfterOpen??this.growAfterOpen,this.push=e.push??this.push,this.disposeOnNavigation=e.disposeOnNavigation??this.disposeOnNavigation,this.usePopover=e.usePopover??this.usePopover,this.matchWidth=e.matchWidth??this.matchWidth}static \u0275fac=function(i){return new(i||t)};static \u0275dir=z({type:t,selectors:[["","cdk-connected-overlay",""],["","connected-overlay",""],["","cdkConnectedOverlay",""]],inputs:{origin:[0,"cdkConnectedOverlayOrigin","origin"],positions:[0,"cdkConnectedOverlayPositions","positions"],positionStrategy:[0,"cdkConnectedOverlayPositionStrategy","positionStrategy"],offsetX:[0,"cdkConnectedOverlayOffsetX","offsetX"],offsetY:[0,"cdkConnectedOverlayOffsetY","offsetY"],width:[0,"cdkConnectedOverlayWidth","width"],height:[0,"cdkConnectedOverlayHeight","height"],minWidth:[0,"cdkConnectedOverlayMinWidth","minWidth"],minHeight:[0,"cdkConnectedOverlayMinHeight","minHeight"],backdropClass:[0,"cdkConnectedOverlayBackdropClass","backdropClass"],panelClass:[0,"cdkConnectedOverlayPanelClass","panelClass"],viewportMargin:[0,"cdkConnectedOverlayViewportMargin","viewportMargin"],scrollStrategy:[0,"cdkConnectedOverlayScrollStrategy","scrollStrategy"],open:[0,"cdkConnectedOverlayOpen","open"],disableClose:[0,"cdkConnectedOverlayDisableClose","disableClose"],transformOriginSelector:[0,"cdkConnectedOverlayTransformOriginOn","transformOriginSelector"],hasBackdrop:[2,"cdkConnectedOverlayHasBackdrop","hasBackdrop",F],lockPosition:[2,"cdkConnectedOverlayLockPosition","lockPosition",F],flexibleDimensions:[2,"cdkConnectedOverlayFlexibleDimensions","flexibleDimensions",F],growAfterOpen:[2,"cdkConnectedOverlayGrowAfterOpen","growAfterOpen",F],push:[2,"cdkConnectedOverlayPush","push",F],disposeOnNavigation:[2,"cdkConnectedOverlayDisposeOnNavigation","disposeOnNavigation",F],usePopover:[0,"cdkConnectedOverlayUsePopover","usePopover"],matchWidth:[2,"cdkConnectedOverlayMatchWidth","matchWidth",F],_config:[0,"cdkConnectedOverlay","_config"]},outputs:{backdropClick:"backdropClick",positionChange:"positionChange",attach:"attach",detach:"detach",overlayKeydown:"overlayKeydown",overlayOutsideClick:"overlayOutsideClick"},exportAs:["cdkConnectedOverlay"],features:[Le]})}return t})(),ko=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=$({type:t});static \u0275inj=H({providers:[sf],imports:[be,Zu,I_,I_]})}return t})();function yl(t){return t.buttons===0||t.detail===0}function bl(t){let n=t.touches&&t.touches[0]||t.changedTouches&&t.changedTouches[0];return!!n&&n.identifier===-1&&(n.radiusX==null||n.radiusX===1)&&(n.radiusY==null||n.radiusY===1)}var Dl;function ZE(){if(Dl==null&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>Dl=!0}))}finally{Dl=Dl||!1}return Dl}function Ia(t){return ZE()?t:!!t.capture}var XE=new b("cdk-input-modality-detector-options"),JE={ignoreKeys:[18,17,224,91,16]},ex=650,F_={passive:!0,capture:!0},tx=(()=>{class t{_platform=u(Ce);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new Hr(null);_options;_lastTouchMs=0;_onKeydown=e=>{this._options?.ignoreKeys?.some(i=>i===e.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=Rt(e))};_onMousedown=e=>{Date.now()-this._lastTouchMs<ex||(this._modality.next(yl(e)?"keyboard":"mouse"),this._mostRecentTarget=Rt(e))};_onTouchstart=e=>{if(bl(e)){this._modality.next("keyboard");return}this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=Rt(e)};constructor(){let e=u(A),i=u(W),r=u(XE,{optional:!0});if(this._options=N(N({},JE),r),this.modalityDetected=this._modality.pipe(ss(1)),this.modalityChanged=this.modalityDetected.pipe(Fc()),this._platform.isBrowser){let o=u(rt).createRenderer(null,null);this._listenerCleanups=e.runOutsideAngular(()=>[o.listen(i,"keydown",this._onKeydown,F_),o.listen(i,"mousedown",this._onMousedown,F_),o.listen(i,"touchstart",this._onTouchstart,F_)])}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(e=>e())}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Cl=(function(t){return t[t.IMMEDIATE=0]="IMMEDIATE",t[t.EVENTUAL=1]="EVENTUAL",t})(Cl||{}),nx=new b("cdk-focus-monitor-default-options"),cf=Ia({passive:!0,capture:!0}),xi=(()=>{class t{_ngZone=u(A);_platform=u(Ce);_inputModalityDetector=u(tx);_origin=null;_lastFocusOrigin=null;_windowFocused=!1;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=!1;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=!1)};_document=u(W);_stopInputModalityDetector=new M;constructor(){let e=u(nx,{optional:!0});this._detectionMode=e?.detectionMode||Cl.IMMEDIATE}_rootNodeFocusAndBlurListener=e=>{let i=Rt(e);for(let r=i;r;r=r.parentElement)e.type==="focus"?this._onFocus(e,r):this._onBlur(e,r)};monitor(e,i=!1){let r=pn(e);if(!this._platform.isBrowser||r.nodeType!==1)return nt();let o=S_(r)||this._document,a=this._elementInfo.get(r);if(a)return i&&(a.checkChildren=!0),a.subject;let s={checkChildren:i,subject:new M,rootNode:o};return this._elementInfo.set(r,s),this._registerGlobalListeners(s),s.subject}stopMonitoring(e){let i=pn(e),r=this._elementInfo.get(i);r&&(r.subject.complete(),this._setClasses(i),this._elementInfo.delete(i),this._removeGlobalListeners(r))}focusVia(e,i,r){let o=pn(e),a=this._document.activeElement;o===a?this._getClosestElementsInfo(o).forEach(([s,l])=>this._originChanged(s,i,l)):(this._setOrigin(i),typeof o.focus=="function"&&o.focus(r))}ngOnDestroy(){this._elementInfo.forEach((e,i)=>this.stopMonitoring(i))}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(e){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(e)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:e&&this._isLastInteractionFromInputLabel(e)?"mouse":"program"}_shouldBeAttributedToTouch(e){return this._detectionMode===Cl.EVENTUAL||!!e?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(e,i){e.classList.toggle("cdk-focused",!!i),e.classList.toggle("cdk-touch-focused",i==="touch"),e.classList.toggle("cdk-keyboard-focused",i==="keyboard"),e.classList.toggle("cdk-mouse-focused",i==="mouse"),e.classList.toggle("cdk-program-focused",i==="program")}_setOrigin(e,i=!1){this._ngZone.runOutsideAngular(()=>{if(this._origin=e,this._originFromTouchInteraction=e==="touch"&&i,this._detectionMode===Cl.IMMEDIATE){clearTimeout(this._originTimeoutId);let r=this._originFromTouchInteraction?ex:1;this._originTimeoutId=setTimeout(()=>this._origin=null,r)}})}_onFocus(e,i){let r=this._elementInfo.get(i),o=Rt(e);!r||!r.checkChildren&&i!==o||this._originChanged(i,this._getFocusOrigin(o),r)}_onBlur(e,i){let r=this._elementInfo.get(i);!r||r.checkChildren&&e.relatedTarget instanceof Node&&i.contains(e.relatedTarget)||(this._setClasses(i),this._emitOrigin(r,null))}_emitOrigin(e,i){e.subject.observers.length&&this._ngZone.run(()=>e.subject.next(i))}_registerGlobalListeners(e){if(!this._platform.isBrowser)return;let i=e.rootNode,r=this._rootNodeFocusListenerCount.get(i)||0;r||this._ngZone.runOutsideAngular(()=>{i.addEventListener("focus",this._rootNodeFocusAndBlurListener,cf),i.addEventListener("blur",this._rootNodeFocusAndBlurListener,cf)}),this._rootNodeFocusListenerCount.set(i,r+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe(fe(this._stopInputModalityDetector)).subscribe(o=>{this._setOrigin(o,!0)}))}_removeGlobalListeners(e){let i=e.rootNode;if(this._rootNodeFocusListenerCount.has(i)){let r=this._rootNodeFocusListenerCount.get(i);r>1?this._rootNodeFocusListenerCount.set(i,r-1):(i.removeEventListener("focus",this._rootNodeFocusAndBlurListener,cf),i.removeEventListener("blur",this._rootNodeFocusAndBlurListener,cf),this._rootNodeFocusListenerCount.delete(i))}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(e,i,r){this._setClasses(e,i),this._emitOrigin(r,i),this._lastFocusOrigin=i}_getClosestElementsInfo(e){let i=[];return this._elementInfo.forEach((r,o)=>{(o===e||r.checkChildren&&o.contains(e))&&i.push([o,r])}),i}_isLastInteractionFromInputLabel(e){let{_mostRecentTarget:i,mostRecentModality:r}=this._inputModalityDetector;if(r!=="mouse"||!i||i===e||e.nodeName!=="INPUT"&&e.nodeName!=="TEXTAREA"||e.disabled)return!1;let o=e.labels;if(o){for(let a=0;a<o.length;a++)if(o[a].contains(i))return!0}return!1}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),P_=(()=>{class t{_elementRef=u(P);_focusMonitor=u(xi);_monitorSubscription;_focusOrigin=null;cdkFocusChange=new S;constructor(){}get focusOrigin(){return this._focusOrigin}ngAfterViewInit(){let e=this._elementRef.nativeElement;this._monitorSubscription=this._focusMonitor.monitor(e,e.nodeType===1&&e.hasAttribute("cdkMonitorSubtreeFocus")).subscribe(i=>{this._focusOrigin=i,this.cdkFocusChange.emit(i)})}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef),this._monitorSubscription?.unsubscribe()}static \u0275fac=function(i){return new(i||t)};static \u0275dir=z({type:t,selectors:[["","cdkMonitorElementFocus",""],["","cdkMonitorSubtreeFocus",""]],outputs:{cdkFocusChange:"cdkFocusChange"},exportAs:["cdkMonitorFocus"]})}return t})();var Si=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["ng-component"]],exportAs:["cdkVisuallyHidden"],decls:0,vars:0,template:function(i,r){},styles:[`.cdk-visually-hidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
  outline: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  left: 0;
}
[dir=rtl] .cdk-visually-hidden {
  left: auto;
  right: 0;
}
`],encapsulation:2,changeDetection:0})}return t})(),df;function BF(){if(df===void 0&&(df=null,typeof window<"u")){let t=window;t.trustedTypes!==void 0&&(df=t.trustedTypes.createPolicy("angular#components",{createHTML:n=>n}))}return df}function To(t){return BF()?.createHTML(t)||t}function ix(t,n,e){let i=e.sanitize(Tt.HTML,n);t.innerHTML=To(i||"")}var rx=new Set,Ao,ka=(()=>{class t{_platform=u(Ce);_nonce=u(mo,{optional:!0});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):HF}matchMedia(e){return(this._platform.WEBKIT||this._platform.BLINK)&&jF(e,this._nonce),this._matchMedia(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function jF(t,n){if(!rx.has(t))try{Ao||(Ao=document.createElement("style"),n&&Ao.setAttribute("nonce",n),Ao.setAttribute("type","text/css"),document.head.appendChild(Ao)),Ao.sheet&&(Ao.sheet.insertRule(`@media ${t} {body{ }}`,0),rx.add(t))}catch(e){console.error(e)}}function HF(t){return{matches:t==="all"||t==="",media:t,addListener:()=>{},removeListener:()=>{}}}var L_=(()=>{class t{_mediaMatcher=u(ka);_zone=u(A);_queries=new Map;_destroySubject=new M;constructor(){}ngOnDestroy(){this._destroySubject.next(),this._destroySubject.complete()}isMatched(e){return ox(Ea(e)).some(r=>this._registerQuery(r).mql.matches)}observe(e){let r=ox(Ea(e)).map(a=>this._registerQuery(a).observable),o=Sh(r);return o=nr(o.pipe(Qt(1)),o.pipe(ss(1),is(0))),o.pipe(Se(a=>{let s={matches:!1,breakpoints:{}};return a.forEach(({matches:l,query:c})=>{s.matches=s.matches||l,s.breakpoints[c]=l}),s}))}_registerQuery(e){if(this._queries.has(e))return this._queries.get(e);let i=this._mediaMatcher.matchMedia(e),o={observable:new ue(a=>{let s=l=>this._zone.run(()=>a.next(l));return i.addListener(s),()=>{i.removeListener(s)}}).pipe(sn(i),Se(({matches:a})=>({query:e,matches:a})),fe(this._destroySubject)),mql:i};return this._queries.set(e,o),o}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function ox(t){return t.map(n=>n.split(",")).reduce((n,e)=>n.concat(e)).map(n=>n.trim())}var zF=(()=>{class t{create(e){return typeof MutationObserver>"u"?null:new MutationObserver(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var uf=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=$({type:t});static \u0275inj=H({providers:[zF]})}return t})();var B_=(()=>{class t{_platform=u(Ce);constructor(){}isDisabled(e){return e.hasAttribute("disabled")}isVisible(e){return $F(e)&&getComputedStyle(e).visibility==="visible"}isTabbable(e){if(!this._platform.isBrowser)return!1;let i=UF(XF(e));if(i&&(ax(i)===-1||!this.isVisible(i)))return!1;let r=e.nodeName.toLowerCase(),o=ax(e);return e.hasAttribute("contenteditable")?o!==-1:r==="iframe"||r==="object"||this._platform.WEBKIT&&this._platform.IOS&&!QF(e)?!1:r==="audio"?e.hasAttribute("controls")?o!==-1:!1:r==="video"?o===-1?!1:o!==null?!0:this._platform.FIREFOX||e.hasAttribute("controls"):e.tabIndex>=0}isFocusable(e,i){return ZF(e)&&!this.isDisabled(e)&&(i?.ignoreVisibility||this.isVisible(e))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function UF(t){try{return t.frameElement}catch(n){return null}}function $F(t){return!!(t.offsetWidth||t.offsetHeight||typeof t.getClientRects=="function"&&t.getClientRects().length)}function GF(t){let n=t.nodeName.toLowerCase();return n==="input"||n==="select"||n==="button"||n==="textarea"}function WF(t){return YF(t)&&t.type=="hidden"}function qF(t){return KF(t)&&t.hasAttribute("href")}function YF(t){return t.nodeName.toLowerCase()=="input"}function KF(t){return t.nodeName.toLowerCase()=="a"}function cx(t){if(!t.hasAttribute("tabindex")||t.tabIndex===void 0)return!1;let n=t.getAttribute("tabindex");return!!(n&&!isNaN(parseInt(n,10)))}function ax(t){if(!cx(t))return null;let n=parseInt(t.getAttribute("tabindex")||"",10);return isNaN(n)?-1:n}function QF(t){let n=t.nodeName.toLowerCase(),e=n==="input"&&t.type;return e==="text"||e==="password"||n==="select"||n==="textarea"}function ZF(t){return WF(t)?!1:GF(t)||qF(t)||t.hasAttribute("contenteditable")||cx(t)}function XF(t){return t.ownerDocument&&t.ownerDocument.defaultView||window}var wl=class{_element;_checker;_ngZone;_document;_injector;_startAnchor=null;_endAnchor=null;_hasAttached=!1;startAnchorListener=()=>this.focusLastTabbableElement();endAnchorListener=()=>this.focusFirstTabbableElement();get enabled(){return this._enabled}set enabled(n){this._enabled=n,this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(n,this._startAnchor),this._toggleAnchorTabIndex(n,this._endAnchor))}_enabled=!0;constructor(n,e,i,r,o=!1,a){this._element=n,this._checker=e,this._ngZone=i,this._document=r,this._injector=a,o||this.attachAnchors()}destroy(){let n=this._startAnchor,e=this._endAnchor;n&&(n.removeEventListener("focus",this.startAnchorListener),n.remove()),e&&(e.removeEventListener("focus",this.endAnchorListener),e.remove()),this._startAnchor=this._endAnchor=null,this._hasAttached=!1}attachAnchors(){return this._hasAttached?!0:(this._ngZone.runOutsideAngular(()=>{this._startAnchor||(this._startAnchor=this._createAnchor(),this._startAnchor.addEventListener("focus",this.startAnchorListener)),this._endAnchor||(this._endAnchor=this._createAnchor(),this._endAnchor.addEventListener("focus",this.endAnchorListener))}),this._element.parentNode&&(this._element.parentNode.insertBefore(this._startAnchor,this._element),this._element.parentNode.insertBefore(this._endAnchor,this._element.nextSibling),this._hasAttached=!0),this._hasAttached)}focusInitialElementWhenReady(n){return new Promise(e=>{this._executeOnStable(()=>e(this.focusInitialElement(n)))})}focusFirstTabbableElementWhenReady(n){return new Promise(e=>{this._executeOnStable(()=>e(this.focusFirstTabbableElement(n)))})}focusLastTabbableElementWhenReady(n){return new Promise(e=>{this._executeOnStable(()=>e(this.focusLastTabbableElement(n)))})}_getRegionBoundary(n){let e=this._element.querySelectorAll(`[cdk-focus-region-${n}], [cdkFocusRegion${n}], [cdk-focus-${n}]`);return n=="start"?e.length?e[0]:this._getFirstTabbableElement(this._element):e.length?e[e.length-1]:this._getLastTabbableElement(this._element)}focusInitialElement(n){let e=this._element.querySelector("[cdk-focus-initial], [cdkFocusInitial]");if(e){if(!this._checker.isFocusable(e)){let i=this._getFirstTabbableElement(e);return i?.focus(n),!!i}return e.focus(n),!0}return this.focusFirstTabbableElement(n)}focusFirstTabbableElement(n){let e=this._getRegionBoundary("start");return e&&e.focus(n),!!e}focusLastTabbableElement(n){let e=this._getRegionBoundary("end");return e&&e.focus(n),!!e}hasAttached(){return this._hasAttached}_getFirstTabbableElement(n){if(this._checker.isFocusable(n)&&this._checker.isTabbable(n))return n;let e=n.children;for(let i=0;i<e.length;i++){let r=e[i].nodeType===this._document.ELEMENT_NODE?this._getFirstTabbableElement(e[i]):null;if(r)return r}return null}_getLastTabbableElement(n){if(this._checker.isFocusable(n)&&this._checker.isTabbable(n))return n;let e=n.children;for(let i=e.length-1;i>=0;i--){let r=e[i].nodeType===this._document.ELEMENT_NODE?this._getLastTabbableElement(e[i]):null;if(r)return r}return null}_createAnchor(){let n=this._document.createElement("div");return this._toggleAnchorTabIndex(this._enabled,n),n.classList.add("cdk-visually-hidden"),n.classList.add("cdk-focus-trap-anchor"),n.setAttribute("aria-hidden","true"),n}_toggleAnchorTabIndex(n,e){n?e.setAttribute("tabindex","0"):e.removeAttribute("tabindex")}toggleAnchors(n){this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(n,this._startAnchor),this._toggleAnchorTabIndex(n,this._endAnchor))}_executeOnStable(n){this._injector?At(n,{injector:this._injector}):setTimeout(n)}},dx=(()=>{class t{_checker=u(B_);_ngZone=u(A);_document=u(W);_injector=u(ne);constructor(){u(je).load(Si)}create(e,i=!1){return new wl(e,this._checker,this._ngZone,this._document,i,this._injector)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),j_=(()=>{class t{_elementRef=u(P);_focusTrapFactory=u(dx);focusTrap=void 0;_previouslyFocusedElement=null;get enabled(){return this.focusTrap?.enabled||!1}set enabled(e){this.focusTrap&&(this.focusTrap.enabled=e)}autoCapture=!1;constructor(){u(Ce).isBrowser&&(this.focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement,!0))}ngOnDestroy(){this.focusTrap?.destroy(),this._previouslyFocusedElement&&(this._previouslyFocusedElement.focus(),this._previouslyFocusedElement=null)}ngAfterContentInit(){this.focusTrap?.attachAnchors(),this.autoCapture&&this._captureFocus()}ngDoCheck(){this.focusTrap&&!this.focusTrap.hasAttached()&&this.focusTrap.attachAnchors()}ngOnChanges(e){let i=e.autoCapture;i&&!i.firstChange&&this.autoCapture&&this.focusTrap?.hasAttached()&&this._captureFocus()}_captureFocus(){this._previouslyFocusedElement=wa(),this.focusTrap?.focusInitialElementWhenReady()}static \u0275fac=function(i){return new(i||t)};static \u0275dir=z({type:t,selectors:[["","cdkTrapFocus",""]],inputs:{enabled:[2,"cdkTrapFocus","enabled",F],autoCapture:[2,"cdkTrapFocusAutoCapture","autoCapture",F]},exportAs:["cdkTrapFocus"],features:[Le]})}return t})(),ux=new b("liveAnnouncerElement",{providedIn:"root",factory:()=>null}),fx=new b("LIVE_ANNOUNCER_DEFAULT_OPTIONS"),JF=0,H_=(()=>{class t{_ngZone=u(A);_defaultOptions=u(fx,{optional:!0});_liveElement;_document=u(W);_sanitizer=u(sl);_previousTimeout;_currentPromise;_currentResolve;constructor(){let e=u(ux,{optional:!0});this._liveElement=e||this._createLiveElement()}announce(e,...i){let r=this._defaultOptions,o,a;return i.length===1&&typeof i[0]=="number"?a=i[0]:[o,a]=i,this.clear(),clearTimeout(this._previousTimeout),o||(o=r&&r.politeness?r.politeness:"polite"),a==null&&r&&(a=r.duration),this._liveElement.setAttribute("aria-live",o),this._liveElement.id&&this._exposeAnnouncerToModals(this._liveElement.id),this._ngZone.runOutsideAngular(()=>(this._currentPromise||(this._currentPromise=new Promise(s=>this._currentResolve=s)),clearTimeout(this._previousTimeout),this._previousTimeout=setTimeout(()=>{!e||typeof e=="string"?this._liveElement.textContent=e:ix(this._liveElement,e,this._sanitizer),typeof a=="number"&&(this._previousTimeout=setTimeout(()=>this.clear(),a)),this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0},100),this._currentPromise))}clear(){this._liveElement&&(this._liveElement.textContent="")}ngOnDestroy(){clearTimeout(this._previousTimeout),this._liveElement?.remove(),this._liveElement=null,this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0}_createLiveElement(){let e="cdk-live-announcer-element",i=this._document.getElementsByClassName(e),r=this._document.createElement("div");for(let o=0;o<i.length;o++)i[o].remove();return r.classList.add(e),r.classList.add("cdk-visually-hidden"),r.setAttribute("aria-atomic","true"),r.setAttribute("aria-live","polite"),r.id=`cdk-live-announcer-${JF++}`,this._document.body.appendChild(r),r}_exposeAnnouncerToModals(e){let i=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let r=0;r<i.length;r++){let o=i[r],a=o.getAttribute("aria-owns");a?a.indexOf(e)===-1&&o.setAttribute("aria-owns",a+" "+e):o.setAttribute("aria-owns",e)}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var xr=(function(t){return t[t.NONE=0]="NONE",t[t.BLACK_ON_WHITE=1]="BLACK_ON_WHITE",t[t.WHITE_ON_BLACK=2]="WHITE_ON_BLACK",t})(xr||{}),sx="cdk-high-contrast-black-on-white",lx="cdk-high-contrast-white-on-black",V_="cdk-high-contrast-active",hx=(()=>{class t{_platform=u(Ce);_hasCheckedHighContrastMode=!1;_document=u(W);_breakpointSubscription;constructor(){this._breakpointSubscription=u(L_).observe("(forced-colors: active)").subscribe(()=>{this._hasCheckedHighContrastMode&&(this._hasCheckedHighContrastMode=!1,this._applyBodyHighContrastModeCssClasses())})}getHighContrastMode(){if(!this._platform.isBrowser)return xr.NONE;let e=this._document.createElement("div");e.style.backgroundColor="rgb(1,2,3)",e.style.position="absolute",this._document.body.appendChild(e);let i=this._document.defaultView||window,r=i&&i.getComputedStyle?i.getComputedStyle(e):null,o=(r&&r.backgroundColor||"").replace(/ /g,"");switch(e.remove(),o){case"rgb(0,0,0)":case"rgb(45,50,54)":case"rgb(32,32,32)":return xr.WHITE_ON_BLACK;case"rgb(255,255,255)":case"rgb(255,250,239)":return xr.BLACK_ON_WHITE}return xr.NONE}ngOnDestroy(){this._breakpointSubscription.unsubscribe()}_applyBodyHighContrastModeCssClasses(){if(!this._hasCheckedHighContrastMode&&this._platform.isBrowser&&this._document.body){let e=this._document.body.classList;e.remove(V_,sx,lx),this._hasCheckedHighContrastMode=!0;let i=this.getHighContrastMode();i===xr.BLACK_ON_WHITE?e.add(V_,sx):i===xr.WHITE_ON_BLACK&&e.add(V_,lx)}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),El=(()=>{class t{constructor(){u(hx)._applyBodyHighContrastModeCssClasses()}static \u0275fac=function(i){return new(i||t)};static \u0275mod=$({type:t});static \u0275inj=H({imports:[uf]})}return t})();var e1=200,ff=class{_letterKeyStream=new M;_items=[];_selectedItemIndex=-1;_pressedLetters=[];_skipPredicateFn;_selectedItem=new M;selectedItem=this._selectedItem;constructor(n,e){let i=typeof e?.debounceInterval=="number"?e.debounceInterval:e1;e?.skipPredicate&&(this._skipPredicateFn=e.skipPredicate),this.setItems(n),this._setupKeyHandler(i)}destroy(){this._pressedLetters=[],this._letterKeyStream.complete(),this._selectedItem.complete()}setCurrentSelectedItemIndex(n){this._selectedItemIndex=n}setItems(n){this._items=n}handleKey(n){let e=n.keyCode;n.key&&n.key.length===1?this._letterKeyStream.next(n.key.toLocaleUpperCase()):(e>=65&&e<=90||e>=48&&e<=57)&&this._letterKeyStream.next(String.fromCharCode(e))}isTyping(){return this._pressedLetters.length>0}reset(){this._pressedLetters=[]}_setupKeyHandler(n){this._letterKeyStream.pipe(di(e=>this._pressedLetters.push(e)),is(n),He(()=>this._pressedLetters.length>0),Se(()=>this._pressedLetters.join("").toLocaleUpperCase())).subscribe(e=>{for(let i=1;i<this._items.length+1;i++){let r=(this._selectedItemIndex+i)%this._items.length,o=this._items[r];if(!this._skipPredicateFn?.(o)&&o.getLabel?.().toLocaleUpperCase().trim().indexOf(e)===0){this._selectedItem.next(o);break}}this._pressedLetters=[]})}};var hf=class{_items;_activeItemIndex=re(-1);_activeItem=re(null);_wrap=!1;_typeaheadSubscription=se.EMPTY;_itemChangesSubscription;_vertical=!0;_horizontal=null;_allowedModifierKeys=[];_homeAndEnd=!1;_pageUpAndDown={enabled:!1,delta:10};_effectRef;_typeahead;_skipPredicateFn=n=>n.disabled;constructor(n,e){this._items=n,n instanceof uo?this._itemChangesSubscription=n.changes.subscribe(i=>this._itemsChanged(i.toArray())):Di(n)&&(this._effectRef=mr(()=>this._itemsChanged(n()),{injector:e}))}tabOut=new M;change=new M;skipPredicate(n){return this._skipPredicateFn=n,this}withWrap(n=!0){return this._wrap=n,this}withVerticalOrientation(n=!0){return this._vertical=n,this}withHorizontalOrientation(n){return this._horizontal=n,this}withAllowedModifierKeys(n){return this._allowedModifierKeys=n,this}withTypeAhead(n=200){this._typeaheadSubscription.unsubscribe();let e=this._getItemsArray();return this._typeahead=new ff(e,{debounceInterval:typeof n=="number"?n:void 0,skipPredicate:i=>this._skipPredicateFn(i)}),this._typeaheadSubscription=this._typeahead.selectedItem.subscribe(i=>{this.setActiveItem(i)}),this}cancelTypeahead(){return this._typeahead?.reset(),this}withHomeAndEnd(n=!0){return this._homeAndEnd=n,this}withPageUpDown(n=!0,e=10){return this._pageUpAndDown={enabled:n,delta:e},this}setActiveItem(n){let e=this._activeItem();this.updateActiveItem(n),this._activeItem()!==e&&this.change.next(this._activeItemIndex())}onKeydown(n){let e=n.keyCode,r=["altKey","ctrlKey","metaKey","shiftKey"].every(o=>!n[o]||this._allowedModifierKeys.indexOf(o)>-1);switch(e){case 9:this.tabOut.next();return;case 40:if(this._vertical&&r){this.setNextItemActive();break}else return;case 38:if(this._vertical&&r){this.setPreviousItemActive();break}else return;case 39:if(this._horizontal&&r){this._horizontal==="rtl"?this.setPreviousItemActive():this.setNextItemActive();break}else return;case 37:if(this._horizontal&&r){this._horizontal==="rtl"?this.setNextItemActive():this.setPreviousItemActive();break}else return;case 36:if(this._homeAndEnd&&r){this.setFirstItemActive();break}else return;case 35:if(this._homeAndEnd&&r){this.setLastItemActive();break}else return;case 33:if(this._pageUpAndDown.enabled&&r){let o=this._activeItemIndex()-this._pageUpAndDown.delta;this._setActiveItemByIndex(o>0?o:0,1);break}else return;case 34:if(this._pageUpAndDown.enabled&&r){let o=this._activeItemIndex()+this._pageUpAndDown.delta,a=this._getItemsArray().length;this._setActiveItemByIndex(o<a?o:a-1,-1);break}else return;default:(r||vt(n,"shiftKey"))&&this._typeahead?.handleKey(n);return}this._typeahead?.reset(),n.preventDefault()}get activeItemIndex(){return this._activeItemIndex()}get activeItem(){return this._activeItem()}isTyping(){return!!this._typeahead&&this._typeahead.isTyping()}setFirstItemActive(){this._setActiveItemByIndex(0,1)}setLastItemActive(){this._setActiveItemByIndex(this._getItemsArray().length-1,-1)}setNextItemActive(){this._activeItemIndex()<0?this.setFirstItemActive():this._setActiveItemByDelta(1)}setPreviousItemActive(){this._activeItemIndex()<0&&this._wrap?this.setLastItemActive():this._setActiveItemByDelta(-1)}updateActiveItem(n){let e=this._getItemsArray(),i=typeof n=="number"?n:e.indexOf(n),r=e[i];this._activeItem.set(r??null),this._activeItemIndex.set(i),this._typeahead?.setCurrentSelectedItemIndex(i)}destroy(){this._typeaheadSubscription.unsubscribe(),this._itemChangesSubscription?.unsubscribe(),this._effectRef?.destroy(),this._typeahead?.destroy(),this.tabOut.complete(),this.change.complete()}_setActiveItemByDelta(n){this._wrap?this._setActiveInWrapMode(n):this._setActiveInDefaultMode(n)}_setActiveInWrapMode(n){let e=this._getItemsArray();for(let i=1;i<=e.length;i++){let r=(this._activeItemIndex()+n*i+e.length)%e.length,o=e[r];if(!this._skipPredicateFn(o)){this.setActiveItem(r);return}}}_setActiveInDefaultMode(n){this._setActiveItemByIndex(this._activeItemIndex()+n,n)}_setActiveItemByIndex(n,e){let i=this._getItemsArray();if(i[n]){for(;this._skipPredicateFn(i[n]);)if(n+=e,!i[n])return;this.setActiveItem(n)}}_getItemsArray(){return Di(this._items)?this._items():this._items instanceof uo?this._items.toArray():this._items}_itemsChanged(n){this._typeahead?.setItems(n);let e=this._activeItem();if(e){let i=n.indexOf(e);i>-1&&i!==this._activeItemIndex()&&(this._activeItemIndex.set(i),this._typeahead?.setCurrentSelectedItemIndex(i))}}};var Ml=class extends hf{setActiveItem(n){this.activeItem&&this.activeItem.setInactiveStyles(),super.setActiveItem(n),this.activeItem&&this.activeItem.setActiveStyles()}};var gx=" ";function W_(t,n,e){let i=_f(t,n);e=e.trim(),!i.some(r=>r.trim()===e)&&(i.push(e),t.setAttribute(n,i.join(gx)))}function vf(t,n,e){let i=_f(t,n);e=e.trim();let r=i.filter(o=>o!==e);r.length?t.setAttribute(n,r.join(gx)):t.removeAttribute(n)}function _f(t,n){return t.getAttribute(n)?.match(/\S+/g)??[]}var _x="cdk-describedby-message",gf="cdk-describedby-host",U_=0,vx=(()=>{class t{_platform=u(Ce);_document=u(W);_messageRegistry=new Map;_messagesContainer=null;_id=`${U_++}`;constructor(){u(je).load(Si),this._id=u(_r)+"-"+U_++}describe(e,i,r){if(!this._canBeDescribed(e,i))return;let o=z_(i,r);typeof i!="string"?(px(i,this._id),this._messageRegistry.set(o,{messageElement:i,referenceCount:0})):this._messageRegistry.has(o)||this._createMessageElement(i,r),this._isElementDescribedByMessage(e,o)||this._addMessageReference(e,o)}removeDescription(e,i,r){if(!i||!this._isElementNode(e))return;let o=z_(i,r);if(this._isElementDescribedByMessage(e,o)&&this._removeMessageReference(e,o),typeof i=="string"){let a=this._messageRegistry.get(o);a&&a.referenceCount===0&&this._deleteMessageElement(o)}this._messagesContainer?.childNodes.length===0&&(this._messagesContainer.remove(),this._messagesContainer=null)}ngOnDestroy(){let e=this._document.querySelectorAll(`[${gf}="${this._id}"]`);for(let i=0;i<e.length;i++)this._removeCdkDescribedByReferenceIds(e[i]),e[i].removeAttribute(gf);this._messagesContainer?.remove(),this._messagesContainer=null,this._messageRegistry.clear()}_createMessageElement(e,i){let r=this._document.createElement("div");px(r,this._id),r.textContent=e,i&&r.setAttribute("role",i),this._createMessagesContainer(),this._messagesContainer.appendChild(r),this._messageRegistry.set(z_(e,i),{messageElement:r,referenceCount:0})}_deleteMessageElement(e){this._messageRegistry.get(e)?.messageElement?.remove(),this._messageRegistry.delete(e)}_createMessagesContainer(){if(this._messagesContainer)return;let e="cdk-describedby-message-container",i=this._document.querySelectorAll(`.${e}[platform="server"]`);for(let o=0;o<i.length;o++)i[o].remove();let r=this._document.createElement("div");r.style.visibility="hidden",r.classList.add(e),r.classList.add("cdk-visually-hidden"),this._platform.isBrowser||r.setAttribute("platform","server"),this._document.body.appendChild(r),this._messagesContainer=r}_removeCdkDescribedByReferenceIds(e){let i=_f(e,"aria-describedby").filter(r=>r.indexOf(_x)!=0);e.setAttribute("aria-describedby",i.join(" "))}_addMessageReference(e,i){let r=this._messageRegistry.get(i);W_(e,"aria-describedby",r.messageElement.id),e.setAttribute(gf,this._id),r.referenceCount++}_removeMessageReference(e,i){let r=this._messageRegistry.get(i);r.referenceCount--,vf(e,"aria-describedby",r.messageElement.id),e.removeAttribute(gf)}_isElementDescribedByMessage(e,i){let r=_f(e,"aria-describedby"),o=this._messageRegistry.get(i),a=o&&o.messageElement.id;return!!a&&r.indexOf(a)!=-1}_canBeDescribed(e,i){if(!this._isElementNode(e))return!1;if(i&&typeof i=="object")return!0;let r=i==null?"":`${i}`.trim(),o=e.getAttribute("aria-label");return r?!o||o.trim()!==r:!1}_isElementNode(e){return e.nodeType===this._document.ELEMENT_NODE}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function z_(t,n){return typeof t=="string"?`${n||""}/${t}`:t}function px(t,n){t.id||(t.id=`${_x}-${n}-${U_++}`)}var $_=class extends wl{_focusTrapManager;_inertStrategy;get enabled(){return this._enabled}set enabled(n){this._enabled=n,this._enabled?this._focusTrapManager.register(this):this._focusTrapManager.deregister(this)}constructor(n,e,i,r,o,a,s,l){super(n,e,i,r,s.defer,l),this._focusTrapManager=o,this._inertStrategy=a,this._focusTrapManager.register(this)}destroy(){this._focusTrapManager.deregister(this),super.destroy()}_enable(){this._inertStrategy.preventFocus(this),this.toggleAnchors(!0)}_disable(){this._inertStrategy.allowFocus(this),this.toggleAnchors(!1)}},G_=class{_listener=null;preventFocus(n){this._listener&&n._document.removeEventListener("focus",this._listener,!0),this._listener=e=>this._trapFocus(n,e),n._ngZone.runOutsideAngular(()=>{n._document.addEventListener("focus",this._listener,!0)})}allowFocus(n){this._listener&&(n._document.removeEventListener("focus",this._listener,!0),this._listener=null)}_trapFocus(n,e){let i=e.target,r=n._element;i&&!r.contains(i)&&!i.closest?.("div.cdk-overlay-pane")&&setTimeout(()=>{n.enabled&&!r.contains(n._document.activeElement)&&n.focusFirstTabbableElement()})}},t1=new b("FOCUS_TRAP_INERT_STRATEGY"),n1=(()=>{class t{_focusTrapStack=[];register(e){this._focusTrapStack=this._focusTrapStack.filter(r=>r!==e);let i=this._focusTrapStack;i.length&&i[i.length-1]._disable(),i.push(e),e._enable()}deregister(e){e._disable();let i=this._focusTrapStack,r=i.indexOf(e);r!==-1&&(i.splice(r,1),i.length&&i[i.length-1]._enable())}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),yx=(()=>{class t{_checker=u(B_);_ngZone=u(A);_focusTrapManager=u(n1);_document=u(W);_inertStrategy;_injector=u(ne);constructor(){let e=u(t1,{optional:!0});this._inertStrategy=e||new G_}create(e,i={defer:!1}){let r;return typeof i=="boolean"?r={defer:i}:r=i,new $_(e,this._checker,this._ngZone,this._document,this._focusTrapManager,this._inertStrategy,r,this._injector)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function ut(t){return t!=null&&`${t}`!="false"}function bx(t,n=/\s+/){let e=[];if(t!=null){let i=Array.isArray(t)?t:`${t}`.split(n);for(let r of i){let o=`${r}`.trim();o&&e.push(o)}}return e}var Dx=Wg("transformPopover",[Su("enter",wi({opacity:1,transform:"scale(1)"}),{params:{startAtScale:.3}}),Su("void, exit",wi({opacity:0,transform:"scale({{endAtScale}})"}),{params:{endAtScale:.5}}),Mu("* => enter",[wi({opacity:0,transform:"scale({{endAtScale}})"}),xu("{{openTransition}}",wi({opacity:1,transform:"scale(1)"}))]),Mu("* => void, * => exit",[xu("{{closeTransition}}",wi({opacity:0,transform:"scale({{endAtScale}})"}))])]);var yf=["noop","block","reposition","close"],bf=["before","start","center","end","after"],Df=["above","start","center","end","below"];function Cx(){return Error("SatPopover does not have an anchor.")}function wx(){return Error("SatPopover#anchor must be an instance of SatPopoverAnchor, ElementRef, or HTMLElement.")}function Ex(){return Error("SatPopoverAnchor#satPopoverAnchor must be an instance of SatPopover.")}function xx(){return Error('SatPopoverAnchor must be associated with a SatPopover component. Examples: <sat-popover [anchor]="satPopoverAnchorTemplateRef"> or <button satPopoverAnchor [satPopoverAnchor]="satPopoverTemplateRef">')}function Sx(t){return Error(q_("horizontalAlign/xAlign",t,bf))}function Mx(t){return Error(q_("verticalAlign/yAlign",t,Df))}function Ix(t){return Error(q_("scrollStrategy",t,yf))}function q_(t,n,e){return`Invalid ${t}: '${n}'. Valid options are ${e.map(i=>`'${i}'`).join(", ")}.`}var Cf=(()=>{class t{popoverOpened=new M;popoverClosed=new M;_overlayRef=null;_dir=u(Et,{optional:!0});_popover;_viewContainerRef;_anchor;_portal;_notificationsSubscription;_positionChangeSubscription;_popoverOpen=!1;_ngZone=u(A);_onDestroy=new M;_overlay=u(sf);ngOnDestroy(){this._destroyPopover(),this._notificationsSubscription&&this._notificationsSubscription.unsubscribe(),this._positionChangeSubscription&&this._positionChangeSubscription.unsubscribe(),this._onDestroy.next(),this._onDestroy.complete(),this.popoverOpened.complete(),this.popoverClosed.complete()}anchor(e,i,r){if(this._popover===e&&this._viewContainerRef===i&&this._overlayRef){this._anchor=r instanceof P?r.nativeElement:r,this._overlayRef.getConfig().positionStrategy.setOrigin(this._anchor),this._overlayRef.updatePosition();return}this._destroyPopover(),this._popover=e,this._viewContainerRef=i,this._anchor=r instanceof P?r.nativeElement:r}isPopoverOpen(){return this._popoverOpen}togglePopover(){return this._popoverOpen?this.closePopover():this.openPopover()}openPopover(e={}){this._popoverOpen||(this._applyOpenOptions(e),this._createOverlay(),this._subscribeToBackdrop(),this._subscribeToEscape(),this._subscribeToDetachments(),this._saveOpenedState())}closePopover(e){this._overlayRef&&(this._saveClosedState(e),this._overlayRef.detach())}repositionPopover(){this.updatePopoverConfig()}updatePopoverConfig(){this._destroyPopoverOnceClosed()}realignPopoverToAnchor(){if(!this._overlayRef)return;this._overlayRef.getConfig().positionStrategy.reapplyLastPosition()}getAnchorElement(){return this._anchor}_applyOpenOptions(e){let i=e.restoreFocus!==!1;this._popover._restoreFocusOverride=i;let r=e.autoFocus!==!1;this._popover._autoFocusOverride=r}_createOverlay(){if(!this._overlayRef){this._portal=new Er(this._popover._templateRef,this._viewContainerRef);let e={horizontalAlign:this._popover.horizontalAlign,verticalAlign:this._popover.verticalAlign,hasBackdrop:ut(this._popover.hasBackdrop),backdropClass:this._popover.backdropClass,scrollStrategy:this._popover.scrollStrategy,forceAlignment:ut(this._popover.forceAlignment),lockAlignment:ut(this._popover.lockAlignment),panelClass:this._popover.panelClass},i=this._getOverlayConfig(e,this._anchor);this._subscribeToPositionChanges(i.positionStrategy),this._overlayRef=this._overlay.create(i)}return this._overlayRef.attach(this._portal),this._overlayRef}_destroyPopover(){this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=null)}_destroyPopoverOnceClosed(){this.isPopoverOpen()&&this._overlayRef?this._overlayRef.detachments().pipe(Qt(1),fe(this._onDestroy)).subscribe(()=>this._destroyPopover()):this._destroyPopover()}_subscribeToBackdrop(){this._overlayRef&&this._overlayRef.backdropClick().pipe(di(()=>this._popover.backdropClicked.emit()),He(()=>this._popover.interactiveClose),fe(this.popoverClosed),fe(this._onDestroy)).subscribe(()=>this.closePopover())}_subscribeToEscape(){this._overlayRef&&this._overlayRef.keydownEvents().pipe(di(e=>this._popover.overlayKeydown.emit(e)),He(e=>e.keyCode===27),He(()=>this._popover.interactiveClose),fe(this.popoverClosed),fe(this._onDestroy)).subscribe(()=>this.closePopover())}_subscribeToDetachments(){this._overlayRef&&this._overlayRef.detachments().pipe(fe(this._onDestroy)).subscribe(()=>this._saveClosedState())}_saveOpenedState(){this._popoverOpen||(this._popover._state="enter",this._popover._open=this._popoverOpen=!0,this.popoverOpened.next(),this._popover.opened.emit())}_saveClosedState(e){this._popoverOpen&&(this._popover._open=this._popoverOpen=!1,this._popover._startExitAnimation(),this.popoverClosed.next(e),this._popover.closed.emit(e))}_getDirection(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_getOverlayConfig(e,i){return new Gi({positionStrategy:this._getPositionStrategy(e.horizontalAlign,e.verticalAlign,e.forceAlignment,e.lockAlignment,i),hasBackdrop:e.hasBackdrop,backdropClass:e.backdropClass||"cdk-overlay-transparent-backdrop",scrollStrategy:this._getScrollStrategyInstance(e.scrollStrategy),direction:this._getDirection(),panelClass:e.panelClass})}_subscribeToPositionChanges(e){this._positionChangeSubscription&&this._positionChangeSubscription.unsubscribe(),this._positionChangeSubscription=e.positionChanges.pipe(fe(this._onDestroy)).subscribe(i=>{this._ngZone.run(()=>{this._popover._setAlignmentClasses(i1(i.connectionPair.overlayX),r1(i.connectionPair.overlayY))})})}_getScrollStrategyInstance(e){switch(e){case"block":return this._overlay.scrollStrategies.block();case"reposition":return this._overlay.scrollStrategies.reposition();case"close":return this._overlay.scrollStrategies.close();default:return this._overlay.scrollStrategies.noop()}}_getPositionStrategy(e,i,r,o,a){let l=[kx(e,i)],c=this._overlay.position().flexibleConnectedTo(a).withFlexibleDimensions(!1).withPush(!1).withViewportMargin(0).withLockedPosition(o);if(!r){let d=this._getFallbacks(e,i);l.push(...d)}return c.withPositions(l)}_getFallbacks(e,i){let r=e!=="before"&&e!=="after",o=i!=="above"&&i!=="below",a=r?["before","start","center","end","after"]:["before","after"],s=o?["above","start","center","end","below"]:["above","below"],l=[];return Tx(e,a).forEach(c=>{Tx(i,s).forEach(d=>{l.push(kx(c,d))})}),l.slice(1,l.length)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac})}return t})();function kx(t,n){let{originX:e,overlayX:i}=o1(t),{originY:r,overlayY:o}=a1(n);return new _l({originX:e,originY:r},{overlayX:i,overlayY:o})}function i1(t){return t==="start"?"after":t==="end"?"before":"center"}function r1(t){return t==="top"?"below":t==="bottom"?"above":"center"}function o1(t){switch(t){case"before":return{originX:"start",overlayX:"end"};case"start":return{originX:"start",overlayX:"start"};case"end":return{originX:"end",overlayX:"end"};case"after":return{originX:"end",overlayX:"start"};default:return{originX:"center",overlayX:"center"}}}function a1(t){switch(t){case"above":return{originY:"top",overlayY:"bottom"};case"start":return{originY:"top",overlayY:"top"};case"end":return{originY:"bottom",overlayY:"bottom"};case"below":return{originY:"bottom",overlayY:"top"};default:return{originY:"center",overlayY:"center"}}}function Tx(t,n){let e=n.indexOf(t),i=[t],r=n.slice(0,e),o=n.slice(e+1,n.length).reverse();for(;r.length&&o.length;)i.push(o.pop()),i.push(r.pop());for(;o.length;)i.push(o.pop());for(;r.length;)i.push(r.pop());return i}var Oo=new b("DefaultTransition");var s1=["focusTrapElement"],l1=["*"],c1=(t,n)=>({value:t,params:n});function d1(t,n){if(t&1){let e=ke();p(0,"div",1,0),x("@transformPopover.done",function(r){L(e);let o=X();return V(o._onAnimationDone(r))}),Z(2),g()}if(t&2){let e=X();T("ngClass",e._classList)("@transformPopover",pg(2,c1,e.state,e.params))}}var u1=.3,f1=.5,Ze=(()=>{class t{elementRef=u(P);viewContainerRef=u(Ct);get popover(){return this._popover}set popover(e){if(e instanceof Te)e.anchor=this;else if(e!=="")throw Ex()}_popover;ngAfterViewInit(){if(!this.popover)throw xx()}static \u0275fac=function(i){return new(i||t)};static \u0275dir=z({type:t,selectors:[["","satPopoverAnchor",""]],inputs:{popover:[0,"satPopoverAnchor","popover"]},exportAs:["satPopoverAnchor"]})}return t})(),Te=(()=>{class t{get anchor(){return this._anchor}set anchor(e){if(e instanceof Ze)e._popover=this,this._anchoringService.anchor(this,e.viewContainerRef,e.elementRef),this._anchor=e;else if(e instanceof P||e instanceof HTMLElement)this._anchoringService.anchor(this,this._viewContainerRef,e),this._anchor=e;else if(e)throw wx()}_anchor;get horizontalAlign(){return this._horizontalAlign}set horizontalAlign(e){this._validateHorizontalAlign(e),this._horizontalAlign!==e&&(this._horizontalAlign=e,this._anchoringService.repositionPopover())}_horizontalAlign="center";get xAlign(){return this.horizontalAlign}set xAlign(e){this.horizontalAlign=e}get verticalAlign(){return this._verticalAlign}set verticalAlign(e){this._validateVerticalAlign(e),this._verticalAlign!==e&&(this._verticalAlign=e,this._anchoringService.repositionPopover())}_verticalAlign="center";get yAlign(){return this.verticalAlign}set yAlign(e){this.verticalAlign=e}get forceAlignment(){return this._forceAlignment}set forceAlignment(e){let i=ut(e);this._forceAlignment!==i&&(this._forceAlignment=i,this._anchoringService.repositionPopover())}_forceAlignment=!1;get lockAlignment(){return this._lockAlignment}set lockAlignment(e){let i=ut(e);this._lockAlignment!==i&&(this._lockAlignment=ut(e),this._anchoringService.repositionPopover())}_lockAlignment=!1;get autoFocus(){return this._autoFocus&&this._autoFocusOverride}set autoFocus(e){this._autoFocus=ut(e)}_autoFocus=!0;_autoFocusOverride=!0;get restoreFocus(){return this._restoreFocus&&this._restoreFocusOverride}set restoreFocus(e){this._restoreFocus=ut(e)}_restoreFocus=!0;_restoreFocusOverride=!0;get scrollStrategy(){return this._scrollStrategy}set scrollStrategy(e){this._validateScrollStrategy(e),this._scrollStrategy!==e&&(this._scrollStrategy=e,this._anchoringService.updatePopoverConfig())}_scrollStrategy="reposition";get hasBackdrop(){return this._hasBackdrop}set hasBackdrop(e){this._hasBackdrop=ut(e)}_hasBackdrop=!1;get interactiveClose(){return this._interactiveClose}set interactiveClose(e){this._interactiveClose=ut(e)}_interactiveClose=!0;get openTransition(){return this._openTransition}set openTransition(e){e&&(this._openTransition=e)}_openTransition=u(Oo);get closeTransition(){return this._closeTransition}set closeTransition(e){e&&(this._closeTransition=e)}_closeTransition=u(Oo);get openAnimationStartAtScale(){return this._openAnimationStartAtScale}set openAnimationStartAtScale(e){let i=oi(e);isNaN(i)||(this._openAnimationStartAtScale=i)}_openAnimationStartAtScale=u1;get closeAnimationEndAtScale(){return this._closeAnimationEndAtScale}set closeAnimationEndAtScale(e){let i=oi(e);isNaN(i)||(this._closeAnimationEndAtScale=i)}_closeAnimationEndAtScale=f1;backdropClass="";panelClass="";opened=new S;closed=new S;afterOpen=new S;afterClose=new S;backdropClicked=new S;overlayKeydown=new S;_templateRef;_classList={};_defaultTransition=u(Oo);_document=u(W,{optional:!0});_open=!1;_state="enter";_anchoringService=u(Cf);_focusTrapElement;_previouslyFocusedElement;_focusTrap;_focusTrapFactory=u(yx);_viewContainerRef=u(Ct);ngOnInit(){this._setAlignmentClasses()}open(e={}){if(this._anchor){this._anchoringService.openPopover(e);return}throw Cx()}close(e){this._anchoringService.closePopover(e)}toggle(){this._anchoringService.togglePopover()}realign(){this._anchoringService.realignPopoverToAnchor()}isOpen(){return this._open}setCustomAnchor(e,i){this._anchor=i,this._anchoringService.anchor(this,e,i)}get state(){return this._state}get params(){return{openTransition:this.openTransition,closeTransition:this.closeTransition,startAtScale:this.openAnimationStartAtScale,endAtScale:this.closeAnimationEndAtScale}}_onAnimationDone(e){let{toState:i}=e;if(i==="enter"){this._trapFocus(),this.afterOpen.emit();return}(i==="exit"||i==="void")&&(this._restoreFocusAndDestroyTrap(),this.afterClose.emit())}_startExitAnimation(){this._state="exit"}_setAlignmentClasses(e=this.horizontalAlign,i=this.verticalAlign){this._classList["sat-popover-before"]=e==="before"||e==="end",this._classList["sat-popover-after"]=e==="after"||e==="start",this._classList["sat-popover-above"]=i==="above"||i==="end",this._classList["sat-popover-below"]=i==="below"||i==="start",this._classList["sat-popover-center"]=e==="center"||i==="center"}_trapFocus(){this._savePreviouslyFocusedElement(),this._focusTrapElement&&(!this._focusTrap&&this._focusTrapElement&&(this._focusTrap=this._focusTrapFactory.create(this._focusTrapElement.nativeElement)),this.autoFocus&&this._focusTrap&&this._focusTrap.focusInitialElementWhenReady())}_restoreFocusAndDestroyTrap(){let e=this._previouslyFocusedElement;e&&"focus"in e&&this.restoreFocus&&e.focus(),this._previouslyFocusedElement=void 0,this._focusTrap&&(this._focusTrap.destroy(),this._focusTrap=void 0)}_savePreviouslyFocusedElement(){this._document&&(this._previouslyFocusedElement=this._document.activeElement)}_validateHorizontalAlign(e){if(bf.indexOf(e)===-1)throw Sx(e)}_validateVerticalAlign(e){if(Df.indexOf(e)===-1)throw Mx(e)}_validateScrollStrategy(e){if(yf.indexOf(e)===-1)throw Ix(e)}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["sat-popover"]],viewQuery:function(i,r){if(i&1&&ve(un,7)(s1,5),i&2){let o;B(o=j())&&(r._templateRef=o.first),B(o=j())&&(r._focusTrapElement=o.first)}},inputs:{anchor:"anchor",horizontalAlign:"horizontalAlign",xAlign:"xAlign",verticalAlign:"verticalAlign",yAlign:"yAlign",forceAlignment:"forceAlignment",lockAlignment:"lockAlignment",autoFocus:"autoFocus",restoreFocus:"restoreFocus",scrollStrategy:"scrollStrategy",hasBackdrop:"hasBackdrop",interactiveClose:"interactiveClose",openTransition:"openTransition",closeTransition:"closeTransition",openAnimationStartAtScale:"openAnimationStartAtScale",closeAnimationEndAtScale:"closeAnimationEndAtScale",backdropClass:"backdropClass",panelClass:"panelClass"},outputs:{opened:"opened",closed:"closed",afterOpen:"afterOpen",afterClose:"afterClose",backdropClicked:"backdropClicked",overlayKeydown:"overlayKeydown"},features:[xe([Cf])],ngContentSelectors:l1,decls:1,vars:0,consts:[["focusTrapElement",""],[1,"sat-popover-container",3,"ngClass"]],template:function(i,r){i&1&&(we(),fn(0,d1,3,5,"ng-template"))},dependencies:[Wt,Tg],styles:[`.cdk-overlay-container,.cdk-global-overlay-wrapper{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-overlay-container:empty{display:none}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;display:flex;max-width:100%;max-height:100%;z-index:1000}.cdk-overlay-backdrop{position:absolute;inset:0;pointer-events:auto;-webkit-tap-highlight-color:transparent;opacity:0;touch-action:manipulation;z-index:1000;transition:opacity .4s cubic-bezier(.25,.8,.25,1)}@media(prefers-reduced-motion){.cdk-overlay-backdrop{transition-duration:1ms}}.cdk-overlay-backdrop-showing{opacity:1}@media(forced-colors:active){.cdk-overlay-backdrop-showing{opacity:.6}}.cdk-overlay-dark-backdrop{background:#00000052}.cdk-overlay-transparent-backdrop{transition:visibility 1ms linear,opacity 1ms linear;visibility:hidden;opacity:1}.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing,.cdk-high-contrast-active .cdk-overlay-transparent-backdrop{opacity:0;visibility:visible}.cdk-overlay-backdrop-noop-animation{transition:none}.cdk-overlay-connected-position-bounding-box{position:absolute;display:flex;flex-direction:column;min-width:1px;min-height:1px;z-index:1000}.cdk-global-scrollblock{position:fixed;width:100%;overflow-y:scroll}.cdk-overlay-popover{background:none;border:none;padding:0;outline:0;overflow:visible;position:fixed;pointer-events:none;white-space:normal;color:inherit;text-decoration:none;width:100%;height:100%;inset:0 auto auto 0}.cdk-overlay-popover::backdrop{display:none}.cdk-overlay-popover .cdk-overlay-backdrop{position:fixed;z-index:auto}.sat-popover-container.sat-popover-before.sat-popover-above{transform-origin:right bottom}[dir=rtl] .sat-popover-container.sat-popover-before.sat-popover-above{transform-origin:left bottom}.sat-popover-container.sat-popover-before.sat-popover-center{transform-origin:right center}[dir=rtl] .sat-popover-container.sat-popover-before.sat-popover-center{transform-origin:left center}.sat-popover-container.sat-popover-before.sat-popover-below{transform-origin:right top}[dir=rtl] .sat-popover-container.sat-popover-before.sat-popover-below{transform-origin:left top}.sat-popover-container.sat-popover-center.sat-popover-above{transform-origin:center bottom}.sat-popover-container.sat-popover-center.sat-popover-below{transform-origin:center top}.sat-popover-container.sat-popover-after.sat-popover-above{transform-origin:left bottom}[dir=rtl] .sat-popover-container.sat-popover-after.sat-popover-above{transform-origin:right bottom}.sat-popover-container.sat-popover-after.sat-popover-center{transform-origin:left center}[dir=rtl] .sat-popover-container.sat-popover-after.sat-popover-center{transform-origin:right center}.sat-popover-container.sat-popover-after.sat-popover-below{transform-origin:left top}[dir=rtl] .sat-popover-container.sat-popover-after.sat-popover-below{transform-origin:right top}
`],encapsulation:2,data:{animation:[Dx]}})}return t})();var Y_=(()=>{class t{anchor=u(Ze);get satPopoverHover(){return this._satPopoverHover}set satPopoverHover(e){this._satPopoverHover=oi(e)}_satPopoverHover=0;_onDestroy=new M;_onMouseEnter=new M;_onMouseLeave=new M;ngAfterViewInit(){this._onMouseEnter.pipe(zn(()=>nt(null).pipe(rs(this._satPopoverHover||0),fe(this._onMouseLeave))),fe(this._onDestroy)).subscribe(()=>this.anchor.popover.open())}ngOnDestroy(){this._onDestroy.next(),this._onDestroy.complete()}showPopover(){this._onMouseEnter.next()}closePopover(){this._onMouseLeave.next(),this.anchor.popover.close()}static \u0275fac=function(i){return new(i||t)};static \u0275dir=z({type:t,selectors:[["","satPopoverHover",""]],hostBindings:function(i,r){i&1&&x("mouseenter",function(){return r.showPopover()})("mouseleave",function(){return r.closePopover()})},inputs:{satPopoverHover:"satPopoverHover"}})}return t})();var ft=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=$({type:t});static \u0275inj=H({providers:[{provide:Oo,useValue:"200ms cubic-bezier(0.25, 0.8, 0.25, 1)"},au()],imports:[Wt,ko,El,be,Te,be]})}return t})();var wf=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["demo-action-api"]],decls:28,vars:1,consts:[["anchor","satPopoverAnchor"],["p",""],["satPopoverAnchor","",1,"avatar"],["horizontalAlign","after","forceAlignment","",3,"anchor"],[1,"info","mat-caption"],[1,"caret"],[3,"click"]],template:function(i,r){if(i&1){let o=ke();p(0,"mat-card")(1,"mat-card-title"),y(2,"Action API"),g(),p(3,"mat-card-content")(4,"div",2,0),y(6,"W"),g(),p(7,"sat-popover",3,1)(9,"div",4),ie(10,"div",5),p(11,"div"),y(12,"Messages: 12"),g(),p(13,"div"),y(14,"Friends since: 12/21/2012"),g()()()(),p(15,"mat-card-actions")(16,"button",6),x("click",function(){L(o);let s=Y(8);return V(s.open())}),y(17,"popover#open()"),g(),p(18,"button",6),x("click",function(){L(o);let s=Y(8);return V(s.close())}),y(19,"popover#close()"),g(),p(20,"button",6),x("click",function(){L(o);let s=Y(8);return V(s.toggle())}),y(21,"popover#toggle()"),g(),p(22,"button",6),x("click",function(){L(o);let s=Y(5);return V(s.popover.open())}),y(23,"anchor#popover.open()"),g(),p(24,"button",6),x("click",function(){L(o);let s=Y(5);return V(s.popover.close())}),y(25,"anchor#popover.close()"),g(),p(26,"button",6),x("click",function(){L(o);let s=Y(5);return V(s.popover.toggle())}),y(27,"anchor#popover.toggle()"),g()()()}if(i&2){let o=Y(5);v(7),T("anchor",o)}},dependencies:[It,xt,AE,Mt,St,ft,Te,Ze],styles:["[_nghost-%COMP%]{display:block}.avatar[_ngcontent-%COMP%]{box-shadow:0 2px 1px -1px #0003,0 1px 1px #00000024,0 1px 3px #0000001f;background:#4dccffcc;color:#fff;display:inline-block;height:48px;width:48px;line-height:48px;text-align:center;border-radius:50%;font-size:20px}.info[_ngcontent-%COMP%]{box-shadow:0 2px 4px -1px #0003,0 4px 5px #00000024,0 1px 10px #0000001f;background:#535353;color:#fff;border-radius:4px;position:relative;margin-left:6px;padding:12px}.caret[_ngcontent-%COMP%]{height:8px;width:8px;position:absolute;left:-4px;top:50%;transform:translateY(-50%) rotate(45deg);background:#535353}"]})}return t})();var Bx=(()=>{class t{_renderer;_elementRef;onChange=e=>{};onTouched=()=>{};constructor(e,i){this._renderer=e,this._elementRef=i}setProperty(e,i){this._renderer.setProperty(this._elementRef.nativeElement,e,i)}registerOnTouched(e){this.onTouched=e}registerOnChange(e){this.onChange=e}setDisabledState(e){this.setProperty("disabled",e)}static \u0275fac=function(i){return new(i||t)(he($e),he(P))};static \u0275dir=z({type:t})}return t})(),jx=(()=>{class t extends Bx{static \u0275fac=(()=>{let e;return function(r){return(e||(e=Qn(t)))(r||t)}})();static \u0275dir=z({type:t,features:[Ge]})}return t})(),On=new b("");var m1={provide:On,useExisting:at(()=>Ir),multi:!0};function p1(){let t=mn()?mn().getUserAgent():"";return/android (\d+)/.test(t.toLowerCase())}var g1=new b(""),Ir=(()=>{class t extends Bx{_compositionMode;_composing=!1;constructor(e,i,r){super(e,i),this._compositionMode=r,this._compositionMode==null&&(this._compositionMode=!p1())}writeValue(e){let i=e??"";this.setProperty("value",i)}_handleInput(e){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(e)}_compositionStart(){this._composing=!0}_compositionEnd(e){this._composing=!1,this._compositionMode&&this.onChange(e)}static \u0275fac=function(i){return new(i||t)(he($e),he(P),he(g1,8))};static \u0275dir=z({type:t,selectors:[["input","formControlName","",3,"type","checkbox"],["textarea","formControlName",""],["input","formControl","",3,"type","checkbox"],["textarea","formControl",""],["input","ngModel","",3,"type","checkbox"],["textarea","ngModel",""],["","ngDefaultControl",""]],hostBindings:function(i,r){i&1&&x("input",function(a){return r._handleInput(a.target.value)})("blur",function(){return r.onTouched()})("compositionstart",function(){return r._compositionStart()})("compositionend",function(a){return r._compositionEnd(a.target.value)})},standalone:!1,features:[xe([m1]),Ge]})}return t})();function X_(t){return t==null||J_(t)===0}function J_(t){return t==null?null:Array.isArray(t)||typeof t=="string"?t.length:t instanceof Set?t.size:null}var ki=new b(""),Nf=new b(""),_1=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,Sr=class{static min(n){return v1(n)}static max(n){return y1(n)}static required(n){return b1(n)}static requiredTrue(n){return D1(n)}static email(n){return C1(n)}static minLength(n){return w1(n)}static maxLength(n){return E1(n)}static pattern(n){return x1(n)}static nullValidator(n){return Hx()}static compose(n){return qx(n)}static composeAsync(n){return Yx(n)}};function v1(t){return n=>{if(n.value==null||t==null)return null;let e=parseFloat(n.value);return!isNaN(e)&&e<t?{min:{min:t,actual:n.value}}:null}}function y1(t){return n=>{if(n.value==null||t==null)return null;let e=parseFloat(n.value);return!isNaN(e)&&e>t?{max:{max:t,actual:n.value}}:null}}function b1(t){return X_(t.value)?{required:!0}:null}function D1(t){return t.value===!0?null:{required:!0}}function C1(t){return X_(t.value)||_1.test(t.value)?null:{email:!0}}function w1(t){return n=>{let e=n.value?.length??J_(n.value);return e===null||e===0?null:e<t?{minlength:{requiredLength:t,actualLength:e}}:null}}function E1(t){return n=>{let e=n.value?.length??J_(n.value);return e!==null&&e>t?{maxlength:{requiredLength:t,actualLength:e}}:null}}function x1(t){if(!t)return Hx;let n,e;return typeof t=="string"?(e="",t.charAt(0)!=="^"&&(e+="^"),e+=t,t.charAt(t.length-1)!=="$"&&(e+="$"),n=new RegExp(e)):(e=t.toString(),n=t),i=>{if(X_(i.value))return null;let r=i.value;return n.test(r)?null:{pattern:{requiredPattern:e,actualValue:r}}}}function Hx(t){return null}function zx(t){return t!=null}function Ux(t){return ma(t)?Dn(t):t}function $x(t){let n={};return t.forEach(e=>{n=e!=null?N(N({},n),e):n}),Object.keys(n).length===0?null:n}function Gx(t,n){return n.map(e=>e(t))}function S1(t){return!t.validate}function Wx(t){return t.map(n=>S1(n)?n:e=>n.validate(e))}function qx(t){if(!t)return null;let n=t.filter(zx);return n.length==0?null:function(e){return $x(Gx(e,n))}}function ev(t){return t!=null?qx(Wx(t)):null}function Yx(t){if(!t)return null;let n=t.filter(zx);return n.length==0?null:function(e){let i=Gx(e,n).map(Ux);return ns(i).pipe(Se($x))}}function tv(t){return t!=null?Yx(Wx(t)):null}function Ax(t,n){return t===null?[n]:Array.isArray(t)?[...t,n]:[t,n]}function Kx(t){return t._rawValidators}function Qx(t){return t._rawAsyncValidators}function K_(t){return t?Array.isArray(t)?t:[t]:[]}function xf(t,n){return Array.isArray(t)?t.includes(n):t===n}function Rx(t,n){let e=K_(n);return K_(t).forEach(r=>{xf(e,r)||e.push(r)}),e}function Nx(t,n){return K_(n).filter(e=>!xf(t,e))}var Sf=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(n){this._rawValidators=n||[],this._composedValidatorFn=ev(this._rawValidators)}_setAsyncValidators(n){this._rawAsyncValidators=n||[],this._composedAsyncValidatorFn=tv(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(n){this._onDestroyCallbacks.push(n)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(n=>n()),this._onDestroyCallbacks=[]}reset(n=void 0){this.control?.reset(n)}hasError(n,e){return this.control?this.control.hasError(n,e):!1}getError(n,e){return this.control?this.control.getError(n,e):null}},Ii=class extends Sf{name;get formDirective(){return null}get path(){return null}},Nn=class extends Sf{_parent=null;name=null;valueAccessor=null},Mf=class{_cd;constructor(n){this._cd=n}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}};var Fn=(()=>{class t extends Mf{constructor(e){super(e)}static \u0275fac=function(i){return new(i||t)(he(Nn,2))};static \u0275dir=z({type:t,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(i,r){i&2&&O("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending)},standalone:!1,features:[Ge]})}return t})(),Zx=(()=>{class t extends Mf{constructor(e){super(e)}static \u0275fac=function(i){return new(i||t)(he(Ii,10))};static \u0275dir=z({type:t,selectors:[["","formGroupName",""],["","formArrayName",""],["","ngModelGroup",""],["","formGroup",""],["","formArray",""],["form",3,"ngNoForm",""],["","ngForm",""]],hostVars:16,hostBindings:function(i,r){i&2&&O("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending)("ng-submitted",r.isSubmitted)},standalone:!1,features:[Ge]})}return t})();var Il="VALID",Ef="INVALID",Ta="PENDING",kl="DISABLED",Mr=class{},If=class extends Mr{value;source;constructor(n,e){super(),this.value=n,this.source=e}},Al=class extends Mr{pristine;source;constructor(n,e){super(),this.pristine=n,this.source=e}},Rl=class extends Mr{touched;source;constructor(n,e){super(),this.touched=n,this.source=e}},Aa=class extends Mr{status;source;constructor(n,e){super(),this.status=n,this.source=e}},kf=class extends Mr{source;constructor(n){super(),this.source=n}},Ol=class extends Mr{source;constructor(n){super(),this.source=n}};function nv(t){return(Of(t)?t.validators:t)||null}function M1(t){return Array.isArray(t)?ev(t):t||null}function iv(t,n){return(Of(n)?n.asyncValidators:t)||null}function I1(t){return Array.isArray(t)?tv(t):t||null}function Of(t){return t!=null&&!Array.isArray(t)&&typeof t=="object"}function Xx(t,n,e){let i=t.controls;if(!(n?Object.keys(i):i).length)throw new w(1e3,"");if(!i[e])throw new w(1001,"")}function Jx(t,n,e){t._forEachChild((i,r)=>{if(e[r]===void 0)throw new w(-1002,"")})}var Ra=class{_pendingDirty=!1;_hasOwnPendingAsyncValidator=null;_pendingTouched=!1;_onCollectionChange=()=>{};_updateOn;_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(n,e){this._assignValidators(n),this._assignAsyncValidators(e)}get validator(){return this._composedValidatorFn}set validator(n){this._rawValidators=this._composedValidatorFn=n}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(n){this._rawAsyncValidators=this._composedAsyncValidatorFn=n}get parent(){return this._parent}get status(){return In(this.statusReactive)}set status(n){In(()=>this.statusReactive.set(n))}_status=ti(()=>this.statusReactive());statusReactive=re(void 0);get valid(){return this.status===Il}get invalid(){return this.status===Ef}get pending(){return this.status===Ta}get disabled(){return this.status===kl}get enabled(){return this.status!==kl}errors;get pristine(){return In(this.pristineReactive)}set pristine(n){In(()=>this.pristineReactive.set(n))}_pristine=ti(()=>this.pristineReactive());pristineReactive=re(!0);get dirty(){return!this.pristine}get touched(){return In(this.touchedReactive)}set touched(n){In(()=>this.touchedReactive.set(n))}_touched=ti(()=>this.touchedReactive());touchedReactive=re(!1);get untouched(){return!this.touched}_events=new M;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(n){this._assignValidators(n)}setAsyncValidators(n){this._assignAsyncValidators(n)}addValidators(n){this.setValidators(Rx(n,this._rawValidators))}addAsyncValidators(n){this.setAsyncValidators(Rx(n,this._rawAsyncValidators))}removeValidators(n){this.setValidators(Nx(n,this._rawValidators))}removeAsyncValidators(n){this.setAsyncValidators(Nx(n,this._rawAsyncValidators))}hasValidator(n){return xf(this._rawValidators,n)}hasAsyncValidator(n){return xf(this._rawAsyncValidators,n)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(n={}){let e=this.touched===!1;this.touched=!0;let i=n.sourceControl??this;n.onlySelf||this._parent?.markAsTouched(De(N({},n),{sourceControl:i})),e&&n.emitEvent!==!1&&this._events.next(new Rl(!0,i))}markAllAsDirty(n={}){this.markAsDirty({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsDirty(n))}markAllAsTouched(n={}){this.markAsTouched({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsTouched(n))}markAsUntouched(n={}){let e=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let i=n.sourceControl??this;this._forEachChild(r=>{r.markAsUntouched({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:i})}),n.onlySelf||this._parent?._updateTouched(n,i),e&&n.emitEvent!==!1&&this._events.next(new Rl(!1,i))}markAsDirty(n={}){let e=this.pristine===!0;this.pristine=!1;let i=n.sourceControl??this;n.onlySelf||this._parent?.markAsDirty(De(N({},n),{sourceControl:i})),e&&n.emitEvent!==!1&&this._events.next(new Al(!1,i))}markAsPristine(n={}){let e=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let i=n.sourceControl??this;this._forEachChild(r=>{r.markAsPristine({onlySelf:!0,emitEvent:n.emitEvent})}),n.onlySelf||this._parent?._updatePristine(n,i),e&&n.emitEvent!==!1&&this._events.next(new Al(!0,i))}markAsPending(n={}){this.status=Ta;let e=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new Aa(this.status,e)),this.statusChanges.emit(this.status)),n.onlySelf||this._parent?.markAsPending(De(N({},n),{sourceControl:e}))}disable(n={}){let e=this._parentMarkedDirty(n.onlySelf);this.status=kl,this.errors=null,this._forEachChild(r=>{r.disable(De(N({},n),{onlySelf:!0}))}),this._updateValue();let i=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new If(this.value,i)),this._events.next(new Aa(this.status,i)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(De(N({},n),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(r=>r(!0))}enable(n={}){let e=this._parentMarkedDirty(n.onlySelf);this.status=Il,this._forEachChild(i=>{i.enable(De(N({},n),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:n.emitEvent}),this._updateAncestors(De(N({},n),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(i=>i(!1))}_updateAncestors(n,e){n.onlySelf||(this._parent?.updateValueAndValidity(n),n.skipPristineCheck||this._parent?._updatePristine({},e),this._parent?._updateTouched({},e))}setParent(n){this._parent=n}getRawValue(){return this.value}updateValueAndValidity(n={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let i=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===Il||this.status===Ta)&&this._runAsyncValidator(i,n.emitEvent)}let e=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new If(this.value,e)),this._events.next(new Aa(this.status,e)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),n.onlySelf||this._parent?.updateValueAndValidity(De(N({},n),{sourceControl:e}))}_updateTreeValidity(n={emitEvent:!0}){this._forEachChild(e=>e._updateTreeValidity(n)),this.updateValueAndValidity({onlySelf:!0,emitEvent:n.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?kl:Il}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(n,e){if(this.asyncValidator){this.status=Ta,this._hasOwnPendingAsyncValidator={emitEvent:e!==!1,shouldHaveEmitted:n!==!1};let i=Ux(this.asyncValidator(this));this._asyncValidationSubscription=i.subscribe(r=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(r,{emitEvent:e,shouldHaveEmitted:n})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let n=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??!1;return this._hasOwnPendingAsyncValidator=null,n}return!1}setErrors(n,e={}){this.errors=n,this._updateControlsErrors(e.emitEvent!==!1,this,e.shouldHaveEmitted)}get(n){let e=n;return e==null||(Array.isArray(e)||(e=e.split(".")),e.length===0)?null:e.reduce((i,r)=>i&&i._find(r),this)}getError(n,e){let i=e?this.get(e):this;return i?.errors?i.errors[n]:null}hasError(n,e){return!!this.getError(n,e)}get root(){let n=this;for(;n._parent;)n=n._parent;return n}_updateControlsErrors(n,e,i){this.status=this._calculateStatus(),n&&this.statusChanges.emit(this.status),(n||i)&&this._events.next(new Aa(this.status,e)),this._parent&&this._parent._updateControlsErrors(n,e,i)}_initObservables(){this.valueChanges=new S,this.statusChanges=new S}_calculateStatus(){return this._allControlsDisabled()?kl:this.errors?Ef:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(Ta)?Ta:this._anyControlsHaveStatus(Ef)?Ef:Il}_anyControlsHaveStatus(n){return this._anyControls(e=>e.status===n)}_anyControlsDirty(){return this._anyControls(n=>n.dirty)}_anyControlsTouched(){return this._anyControls(n=>n.touched)}_updatePristine(n,e){let i=!this._anyControlsDirty(),r=this.pristine!==i;this.pristine=i,n.onlySelf||this._parent?._updatePristine(n,e),r&&this._events.next(new Al(this.pristine,e))}_updateTouched(n={},e){this.touched=this._anyControlsTouched(),this._events.next(new Rl(this.touched,e)),n.onlySelf||this._parent?._updateTouched(n,e)}_onDisabledChange=[];_registerOnCollectionChange(n){this._onCollectionChange=n}_setUpdateStrategy(n){Of(n)&&n.updateOn!=null&&(this._updateOn=n.updateOn)}_parentMarkedDirty(n){return!n&&!!this._parent?.dirty&&!this._parent._anyControlsDirty()}_find(n){return null}_assignValidators(n){this._rawValidators=Array.isArray(n)?n.slice():n,this._composedValidatorFn=M1(this._rawValidators)}_assignAsyncValidators(n){this._rawAsyncValidators=Array.isArray(n)?n.slice():n,this._composedAsyncValidatorFn=I1(this._rawAsyncValidators)}},Na=class extends Ra{constructor(n,e,i){super(nv(e),iv(i,e)),this.controls=n,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;registerControl(n,e){return this.controls[n]?this.controls[n]:(this.controls[n]=e,e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange),e)}addControl(n,e,i={}){this.registerControl(n,e),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}removeControl(n,e={}){this.controls[n]&&this.controls[n]._registerOnCollectionChange(()=>{}),delete this.controls[n],this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange()}setControl(n,e,i={}){this.controls[n]&&this.controls[n]._registerOnCollectionChange(()=>{}),delete this.controls[n],e&&this.registerControl(n,e),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}contains(n){return this.controls.hasOwnProperty(n)&&this.controls[n].enabled}setValue(n,e={}){Jx(this,!0,n),Object.keys(n).forEach(i=>{Xx(this,!0,i),this.controls[i].setValue(n[i],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)}patchValue(n,e={}){n!=null&&(Object.keys(n).forEach(i=>{let r=this.controls[i];r&&r.patchValue(n[i],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e))}reset(n={},e={}){this._forEachChild((i,r)=>{i.reset(n?n[r]:null,De(N({},e),{onlySelf:!0}))}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e),e?.emitEvent!==!1&&this._events.next(new Ol(this))}getRawValue(){return this._reduceChildren({},(n,e,i)=>(n[i]=e.getRawValue(),n))}_syncPendingControls(){let n=this._reduceChildren(!1,(e,i)=>i._syncPendingControls()?!0:e);return n&&this.updateValueAndValidity({onlySelf:!0}),n}_forEachChild(n){Object.keys(this.controls).forEach(e=>{let i=this.controls[e];i&&n(i,e)})}_setUpControls(){this._forEachChild(n=>{n.setParent(this),n._registerOnCollectionChange(this._onCollectionChange)})}_updateValue(){this.value=this._reduceValue()}_anyControls(n){for(let[e,i]of Object.entries(this.controls))if(this.contains(e)&&n(i))return!0;return!1}_reduceValue(){let n={};return this._reduceChildren(n,(e,i,r)=>((i.enabled||this.disabled)&&(e[r]=i.value),e))}_reduceChildren(n,e){let i=n;return this._forEachChild((r,o)=>{i=e(i,r,o)}),i}_allControlsDisabled(){for(let n of Object.keys(this.controls))if(this.controls[n].enabled)return!1;return Object.keys(this.controls).length>0||this.disabled}_find(n){return this.controls.hasOwnProperty(n)?this.controls[n]:null}};var Q_=class extends Na{};var Fl=new b("",{factory:()=>Ff}),Ff="always";function eS(t,n){return[...n.path,t]}function Tf(t,n,e=Ff){rv(t,n),n.valueAccessor.writeValue(t.value),(t.disabled||e==="always")&&n.valueAccessor.setDisabledState?.(t.disabled),T1(t,n),R1(t,n),A1(t,n),k1(t,n)}function Ox(t,n,e=!0){let i=()=>{};n?.valueAccessor?.registerOnChange(i),n?.valueAccessor?.registerOnTouched(i),Rf(t,n),t&&(n._invokeOnDestroyCallbacks(),t._registerOnCollectionChange(()=>{}))}function Af(t,n){t.forEach(e=>{e.registerOnValidatorChange&&e.registerOnValidatorChange(n)})}function k1(t,n){if(n.valueAccessor.setDisabledState){let e=i=>{n.valueAccessor.setDisabledState(i)};t.registerOnDisabledChange(e),n._registerOnDestroy(()=>{t._unregisterOnDisabledChange(e)})}}function rv(t,n){let e=Kx(t);n.validator!==null?t.setValidators(Ax(e,n.validator)):typeof e=="function"&&t.setValidators([e]);let i=Qx(t);n.asyncValidator!==null?t.setAsyncValidators(Ax(i,n.asyncValidator)):typeof i=="function"&&t.setAsyncValidators([i]);let r=()=>t.updateValueAndValidity();Af(n._rawValidators,r),Af(n._rawAsyncValidators,r)}function Rf(t,n){let e=!1;if(t!==null){if(n.validator!==null){let r=Kx(t);if(Array.isArray(r)&&r.length>0){let o=r.filter(a=>a!==n.validator);o.length!==r.length&&(e=!0,t.setValidators(o))}}if(n.asyncValidator!==null){let r=Qx(t);if(Array.isArray(r)&&r.length>0){let o=r.filter(a=>a!==n.asyncValidator);o.length!==r.length&&(e=!0,t.setAsyncValidators(o))}}}let i=()=>{};return Af(n._rawValidators,i),Af(n._rawAsyncValidators,i),e}function T1(t,n){n.valueAccessor.registerOnChange(e=>{t._pendingValue=e,t._pendingChange=!0,t._pendingDirty=!0,t.updateOn==="change"&&tS(t,n)})}function A1(t,n){n.valueAccessor.registerOnTouched(()=>{t._pendingTouched=!0,t.updateOn==="blur"&&t._pendingChange&&tS(t,n),t.updateOn!=="submit"&&t.markAsTouched()})}function tS(t,n){t._pendingDirty&&t.markAsDirty(),t.setValue(t._pendingValue,{emitModelToViewChange:!1}),n.viewToModelUpdate(t._pendingValue),t._pendingChange=!1}function R1(t,n){let e=(i,r)=>{n.valueAccessor.writeValue(i),r&&n.viewToModelUpdate(i)};t.registerOnChange(e),n._registerOnDestroy(()=>{t._unregisterOnChange(e)})}function nS(t,n){t==null,rv(t,n)}function N1(t,n){return Rf(t,n)}function iS(t,n){if(!t.hasOwnProperty("model"))return!1;let e=t.model;return e.isFirstChange()?!0:!Object.is(n,e.currentValue)}function O1(t){return Object.getPrototypeOf(t.constructor)===jx}function rS(t,n){t._syncPendingControls(),n.forEach(e=>{let i=e.control;i.updateOn==="submit"&&i._pendingChange&&(e.viewToModelUpdate(i._pendingValue),i._pendingChange=!1)})}function oS(t,n){if(!n)return null;Array.isArray(n);let e,i,r;return n.forEach(o=>{o.constructor===Ir?e=o:O1(o)?i=o:r=o}),r||i||e||null}function F1(t,n){let e=t.indexOf(n);e>-1&&t.splice(e,1)}var P1={provide:Ii,useExisting:at(()=>Oa)},Tl=Promise.resolve(),Oa=(()=>{class t extends Ii{callSetDisabledState;get submitted(){return In(this.submittedReactive)}_submitted=ti(()=>this.submittedReactive());submittedReactive=re(!1);_directives=new Set;form;ngSubmit=new S;options;constructor(e,i,r){super(),this.callSetDisabledState=r,this.form=new Na({},ev(e),tv(i))}ngAfterViewInit(){this._setUpdateStrategy()}get formDirective(){return this}get control(){return this.form}get path(){return[]}get controls(){return this.form.controls}addControl(e){Tl.then(()=>{let i=this._findContainer(e.path);e.control=i.registerControl(e.name,e.control),Tf(e.control,e,this.callSetDisabledState),e.control.updateValueAndValidity({emitEvent:!1}),this._directives.add(e)})}getControl(e){return this.form.get(e.path)}removeControl(e){Tl.then(()=>{this._findContainer(e.path)?.removeControl(e.name),this._directives.delete(e)})}addFormGroup(e){Tl.then(()=>{let i=this._findContainer(e.path),r=new Na({});nS(r,e),i.registerControl(e.name,r),r.updateValueAndValidity({emitEvent:!1})})}removeFormGroup(e){Tl.then(()=>{this._findContainer(e.path)?.removeControl?.(e.name)})}getFormGroup(e){return this.form.get(e.path)}updateModel(e,i){Tl.then(()=>{this.form.get(e.path).setValue(i)})}setValue(e){this.control.setValue(e)}onSubmit(e){return this.submittedReactive.set(!0),rS(this.form,this._directives),this.ngSubmit.emit(e),this.form._events.next(new kf(this.control)),e?.target?.method==="dialog"}onReset(){this.resetForm()}resetForm(e=void 0){this.form.reset(e),this.submittedReactive.set(!1)}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.form._updateOn=this.options.updateOn)}_findContainer(e){return e.pop(),e.length?this.form.get(e):this.form}static \u0275fac=function(i){return new(i||t)(he(ki,10),he(Nf,10),he(Fl,8))};static \u0275dir=z({type:t,selectors:[["form",3,"ngNoForm","",3,"formGroup","",3,"formArray",""],["ng-form"],["","ngForm",""]],hostBindings:function(i,r){i&1&&x("submit",function(a){return r.onSubmit(a)})("reset",function(){return r.onReset()})},inputs:{options:[0,"ngFormOptions","options"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[xe([P1]),Ge]})}return t})();function Fx(t,n){let e=t.indexOf(n);e>-1&&t.splice(e,1)}function Px(t){return typeof t=="object"&&t!==null&&Object.keys(t).length===2&&"value"in t&&"disabled"in t}var Nl=class extends Ra{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=!1;constructor(n=null,e,i){super(nv(e),iv(i,e)),this._applyFormState(n),this._setUpdateStrategy(e),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),Of(e)&&(e.nonNullable||e.initialValueIsDefault)&&(Px(n)?this.defaultValue=n.value:this.defaultValue=n)}setValue(n,e={}){this.value=this._pendingValue=n,this._onChange.length&&e.emitModelToViewChange!==!1&&this._onChange.forEach(i=>i(this.value,e.emitViewToModelChange!==!1)),this.updateValueAndValidity(e)}patchValue(n,e={}){this.setValue(n,e)}reset(n=this.defaultValue,e={}){this._applyFormState(n),this.markAsPristine(e),this.markAsUntouched(e),this.setValue(this.value,e),e.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=!1,e?.emitEvent!==!1&&this._events.next(new Ol(this))}_updateValue(){}_anyControls(n){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(n){this._onChange.push(n)}_unregisterOnChange(n){Fx(this._onChange,n)}registerOnDisabledChange(n){this._onDisabledChange.push(n)}_unregisterOnDisabledChange(n){Fx(this._onDisabledChange,n)}_forEachChild(n){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(n){Px(n)?(this.value=this._pendingValue=n.value,n.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=n}};var L1=t=>t instanceof Nl;var V1={provide:Nn,useExisting:at(()=>gn)},Lx=Promise.resolve(),gn=(()=>{class t extends Nn{_changeDetectorRef;callSetDisabledState;control=new Nl;static ngAcceptInputType_isDisabled;_registered=!1;viewModel;name="";isDisabled;model;options;update=new S;constructor(e,i,r,o,a,s){super(),this._changeDetectorRef=a,this.callSetDisabledState=s,this._parent=e,this._setValidators(i),this._setAsyncValidators(r),this.valueAccessor=oS(this,o)}ngOnChanges(e){if(this._checkForErrors(),!this._registered||"name"in e){if(this._registered&&(this._checkName(),this.formDirective)){let i=e.name.previousValue;this.formDirective.removeControl({name:i,path:this._getPath(i)})}this._setUpControl()}"isDisabled"in e&&this._updateDisabled(e),iS(e,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.formDirective?.removeControl(this)}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e)}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=!0}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.control._updateOn=this.options.updateOn)}_isStandalone(){return!this._parent||!!(this.options&&this.options.standalone)}_setUpStandalone(){Tf(this.control,this,this.callSetDisabledState),this.control.updateValueAndValidity({emitEvent:!1})}_checkForErrors(){this._checkName()}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),!this._isStandalone()&&this.name}_updateValue(e){Lx.then(()=>{this.control.setValue(e,{emitViewToModelChange:!1}),this._changeDetectorRef?.markForCheck()})}_updateDisabled(e){let i=e.isDisabled.currentValue,r=i!==0&&F(i);Lx.then(()=>{r&&!this.control.disabled?this.control.disable():!r&&this.control.disabled&&this.control.enable(),this._changeDetectorRef?.markForCheck()})}_getPath(e){return this._parent?eS(e,this._parent):[e]}static \u0275fac=function(i){return new(i||t)(he(Ii,9),he(ki,10),he(Nf,10),he(On,10),he(Fe,8),he(Fl,8))};static \u0275dir=z({type:t,selectors:[["","ngModel","",3,"formControlName","",3,"formControl",""]],inputs:{name:"name",isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"],options:[0,"ngModelOptions","options"]},outputs:{update:"ngModelChange"},exportAs:["ngModel"],standalone:!1,features:[xe([V1]),Ge,Le]})}return t})();var B1={provide:On,useExisting:at(()=>Pl),multi:!0},Pl=(()=>{class t extends jx{writeValue(e){let i=e??"";this.setProperty("value",i)}registerOnChange(e){this.onChange=i=>{e(i==""?null:parseFloat(i))}}static \u0275fac=(()=>{let e;return function(r){return(e||(e=Qn(t)))(r||t)}})();static \u0275dir=z({type:t,selectors:[["input","type","number","formControlName",""],["input","type","number","formControl",""],["input","type","number","ngModel",""]],hostBindings:function(i,r){i&1&&x("input",function(a){return r.onChange(a.target.value)})("blur",function(){return r.onTouched()})},standalone:!1,features:[xe([B1]),Ge]})}return t})();var Z_=class extends Ra{constructor(n,e,i){super(nv(e),iv(i,e)),this.controls=n,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;at(n){return this.controls[this._adjustIndex(n)]}push(n,e={}){Array.isArray(n)?n.forEach(i=>{this.controls.push(i),this._registerControl(i)}):(this.controls.push(n),this._registerControl(n)),this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange()}insert(n,e,i={}){this.controls.splice(n,0,e),this._registerControl(e),this.updateValueAndValidity({emitEvent:i.emitEvent})}removeAt(n,e={}){let i=this._adjustIndex(n);i<0&&(i=0),this.controls[i]&&this.controls[i]._registerOnCollectionChange(()=>{}),this.controls.splice(i,1),this.updateValueAndValidity({emitEvent:e.emitEvent})}setControl(n,e,i={}){let r=this._adjustIndex(n);r<0&&(r=0),this.controls[r]&&this.controls[r]._registerOnCollectionChange(()=>{}),this.controls.splice(r,1),e&&(this.controls.splice(r,0,e),this._registerControl(e)),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}get length(){return this.controls.length}setValue(n,e={}){Jx(this,!1,n),n.forEach((i,r)=>{Xx(this,!1,r),this.at(r).setValue(i,{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)}patchValue(n,e={}){n!=null&&(n.forEach((i,r)=>{this.at(r)&&this.at(r).patchValue(i,{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e))}reset(n=[],e={}){this._forEachChild((i,r)=>{i.reset(n[r],De(N({},e),{onlySelf:!0}))}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e),e?.emitEvent!==!1&&this._events.next(new Ol(this))}getRawValue(){return this.controls.map(n=>n.getRawValue())}clear(n={}){this.controls.length<1||(this._forEachChild(e=>e._registerOnCollectionChange(()=>{})),this.controls.splice(0),this.updateValueAndValidity({emitEvent:n.emitEvent}))}_adjustIndex(n){return n<0?n+this.length:n}_syncPendingControls(){let n=this.controls.reduce((e,i)=>i._syncPendingControls()?!0:e,!1);return n&&this.updateValueAndValidity({onlySelf:!0}),n}_forEachChild(n){this.controls.forEach((e,i)=>{n(e,i)})}_updateValue(){this.value=this.controls.filter(n=>n.enabled||this.disabled).map(n=>n.value)}_anyControls(n){return this.controls.some(e=>e.enabled&&n(e))}_setUpControls(){this._forEachChild(n=>this._registerControl(n))}_allControlsDisabled(){for(let n of this.controls)if(n.enabled)return!1;return this.controls.length>0||this.disabled}_registerControl(n){n.setParent(this),n._registerOnCollectionChange(this._onCollectionChange)}_find(n){return this.at(n)??null}};var j1=(()=>{class t extends Ii{callSetDisabledState;get submitted(){return In(this._submittedReactive)}set submitted(e){this._submittedReactive.set(e)}_submitted=ti(()=>this._submittedReactive());_submittedReactive=re(!1);_oldForm;_onCollectionChange=()=>this._updateDomValue();directives=[];constructor(e,i,r){super(),this.callSetDisabledState=r,this._setValidators(e),this._setAsyncValidators(i)}ngOnChanges(e){this.onChanges(e)}ngOnDestroy(){this.onDestroy()}onChanges(e){this._checkFormPresent(),e.hasOwnProperty("form")&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form)}onDestroy(){this.form&&(Rf(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}))}get formDirective(){return this}get path(){return[]}addControl(e){let i=this.form.get(e.path);return Tf(i,e,this.callSetDisabledState),i.updateValueAndValidity({emitEvent:!1}),this.directives.push(e),i}getControl(e){return this.form.get(e.path)}removeControl(e){Ox(e.control||null,e,!1),F1(this.directives,e)}addFormGroup(e){this._setUpFormContainer(e)}removeFormGroup(e){this._cleanUpFormContainer(e)}getFormGroup(e){return this.form.get(e.path)}getFormArray(e){return this.form.get(e.path)}addFormArray(e){this._setUpFormContainer(e)}removeFormArray(e){this._cleanUpFormContainer(e)}updateModel(e,i){this.form.get(e.path).setValue(i)}onReset(){this.resetForm()}resetForm(e=void 0,i={}){this.form.reset(e,i),this._submittedReactive.set(!1)}onSubmit(e){return this.submitted=!0,rS(this.form,this.directives),this.ngSubmit.emit(e),this.form._events.next(new kf(this.control)),e?.target?.method==="dialog"}_updateDomValue(){this.directives.forEach(e=>{let i=e.control,r=this.form.get(e.path);i!==r&&(Ox(i||null,e),L1(r)&&(Tf(r,e,this.callSetDisabledState),e.control=r))}),this.form._updateTreeValidity({emitEvent:!1})}_setUpFormContainer(e){let i=this.form.get(e.path);nS(i,e),i.updateValueAndValidity({emitEvent:!1})}_cleanUpFormContainer(e){let i=this.form?.get(e.path);i&&N1(i,e)&&i.updateValueAndValidity({emitEvent:!1})}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm?._registerOnCollectionChange(()=>{})}_updateValidators(){rv(this.form,this),this._oldForm&&Rf(this._oldForm,this)}_checkFormPresent(){this.form}static \u0275fac=function(i){return new(i||t)(he(ki,10),he(Nf,10),he(Fl,8))};static \u0275dir=z({type:t,features:[Ge,Le]})}return t})();var aS=new b("");var H1={provide:Nn,useExisting:at(()=>ov)},ov=(()=>{class t extends Nn{_ngModelWarningConfig;_added=!1;viewModel;control;name=null;set isDisabled(e){}model;update=new S;static _ngModelWarningSentOnce=!1;_ngModelWarningSent=!1;constructor(e,i,r,o,a){super(),this._ngModelWarningConfig=a,this._parent=e,this._setValidators(i),this._setAsyncValidators(r),this.valueAccessor=oS(this,o)}ngOnChanges(e){this._added||this._setUpControl(),iS(e,this.viewModel)&&(this.viewModel=this.model,this.formDirective.updateModel(this,this.model))}ngOnDestroy(){this.formDirective?.removeControl(this)}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e)}get path(){return eS(this.name==null?this.name:this.name.toString(),this._parent)}get formDirective(){return this._parent?this._parent.formDirective:null}_setUpControl(){this.control=this.formDirective.addControl(this),this._added=!0}static \u0275fac=function(i){return new(i||t)(he(Ii,13),he(ki,10),he(Nf,10),he(On,10),he(aS,8))};static \u0275dir=z({type:t,selectors:[["","formControlName",""]],inputs:{name:[0,"formControlName","name"],isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"]},outputs:{update:"ngModelChange"},standalone:!1,features:[xe([H1]),Ge,Le]})}return t})();var z1={provide:Ii,useExisting:at(()=>kr)},kr=(()=>{class t extends j1{form=null;ngSubmit=new S;get control(){return this.form}static \u0275fac=(()=>{let e;return function(r){return(e||(e=Qn(t)))(r||t)}})();static \u0275dir=z({type:t,selectors:[["","formGroup",""]],hostBindings:function(i,r){i&1&&x("submit",function(a){return r.onSubmit(a)})("reset",function(){return r.onReset()})},inputs:{form:[0,"formGroup","form"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[xe([z1]),Ge]})}return t})();var sS=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=$({type:t});static \u0275inj=H({})}return t})();function Vx(t){return!!t&&(t.asyncValidators!==void 0||t.validators!==void 0||t.updateOn!==void 0)}var Pf=(()=>{class t{useNonNullable=!1;get nonNullable(){let e=new t;return e.useNonNullable=!0,e}group(e,i=null){let r=this._reduceControls(e),o={};return Vx(i)?o=i:i!==null&&(o.validators=i.validator,o.asyncValidators=i.asyncValidator),new Na(r,o)}record(e,i=null){let r=this._reduceControls(e);return new Q_(r,i)}control(e,i,r){let o={};return this.useNonNullable?(Vx(i)?o=i:(o.validators=i,o.asyncValidators=r),new Nl(e,De(N({},o),{nonNullable:!0}))):new Nl(e,i,r)}array(e,i,r){let o=e.map(a=>this._createControl(a));return new Z_(o,i,r)}_reduceControls(e){let i={};return Object.keys(e).forEach(r=>{i[r]=this._createControl(e[r])}),i}_createControl(e){if(e instanceof Nl)return e;if(e instanceof Ra)return e;if(Array.isArray(e)){let i=e[0],r=e.length>1?e[1]:null,o=e.length>2?e[2]:null;return this.control(i,r,o)}else return this.control(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Vt=(()=>{class t{static withConfig(e){return{ngModule:t,providers:[{provide:Fl,useValue:e.callSetDisabledState??Ff}]}}static \u0275fac=function(i){return new(i||t)};static \u0275mod=$({type:t});static \u0275inj=H({imports:[sS]})}return t})(),Lf=(()=>{class t{static withConfig(e){return{ngModule:t,providers:[{provide:aS,useValue:e.warnOnNgModelWithFormControl??"always"},{provide:Fl,useValue:e.callSetDisabledState??Ff}]}}static \u0275fac=function(i){return new(i||t)};static \u0275mod=$({type:t});static \u0275inj=H({imports:[sS]})}return t})();var Pa,lS=["color","button","checkbox","date","datetime-local","email","file","hidden","image","month","number","password","radio","range","reset","search","submit","tel","text","time","url","week"];function av(){if(Pa)return Pa;if(typeof document!="object"||!document)return Pa=new Set(lS),Pa;let t=document.createElement("input");return Pa=new Set(lS.filter(n=>(t.setAttribute("type",n),t.type===n))),Pa}var U1=new b("MATERIAL_ANIMATIONS"),cS=null;function $1(){return u(U1,{optional:!0})?.animationsDisabled||u(vr,{optional:!0})==="NoopAnimations"?"di-disabled":(cS??=u(ka).matchMedia("(prefers-reduced-motion)").matches,cS?"reduced-motion":"enabled")}function Xe(){return $1()!=="enabled"}var Pn=(function(t){return t[t.FADING_IN=0]="FADING_IN",t[t.VISIBLE=1]="VISIBLE",t[t.FADING_OUT=2]="FADING_OUT",t[t.HIDDEN=3]="HIDDEN",t})(Pn||{}),sv=class{_renderer;element;config;_animationForciblyDisabledThroughCss;state=Pn.HIDDEN;constructor(n,e,i,r=!1){this._renderer=n,this.element=e,this.config=i,this._animationForciblyDisabledThroughCss=r}fadeOut(){this._renderer.fadeOutRipple(this)}},dS=Ia({passive:!0,capture:!0}),lv=class{_events=new Map;addHandler(n,e,i,r){let o=this._events.get(e);if(o){let a=o.get(i);a?a.add(r):o.set(i,new Set([r]))}else this._events.set(e,new Map([[i,new Set([r])]])),n.runOutsideAngular(()=>{document.addEventListener(e,this._delegateEventHandler,dS)})}removeHandler(n,e,i){let r=this._events.get(n);if(!r)return;let o=r.get(e);o&&(o.delete(i),o.size===0&&r.delete(e),r.size===0&&(this._events.delete(n),document.removeEventListener(n,this._delegateEventHandler,dS)))}_delegateEventHandler=n=>{let e=Rt(n);e&&this._events.get(n.type)?.forEach((i,r)=>{(r===e||r.contains(e))&&i.forEach(o=>o.handleEvent(n))})}},Ll={enterDuration:225,exitDuration:150},G1=800,uS=Ia({passive:!0,capture:!0}),fS=["mousedown","touchstart"],hS=["mouseup","mouseleave","touchend","touchcancel"],W1=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["ng-component"]],hostAttrs:["mat-ripple-style-loader",""],decls:0,vars:0,template:function(i,r){},styles:[`.mat-ripple {
  overflow: hidden;
  position: relative;
}
.mat-ripple:not(:empty) {
  transform: translateZ(0);
}

.mat-ripple.mat-ripple-unbounded {
  overflow: visible;
}

.mat-ripple-element {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: scale3d(0, 0, 0);
  background-color: var(--mat-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface) 10%, transparent));
}
@media (forced-colors: active) {
  .mat-ripple-element {
    display: none;
  }
}
.cdk-drag-preview .mat-ripple-element, .cdk-drag-placeholder .mat-ripple-element {
  display: none;
}
`],encapsulation:2,changeDetection:0})}return t})(),Vl=class t{_target;_ngZone;_platform;_containerElement;_triggerElement=null;_isPointerDown=!1;_activeRipples=new Map;_mostRecentTransientRipple=null;_lastTouchStartEvent;_pointerUpEventsRegistered=!1;_containerRect=null;static _eventManager=new lv;constructor(n,e,i,r,o){this._target=n,this._ngZone=e,this._platform=r,r.isBrowser&&(this._containerElement=pn(i)),o&&o.get(je).load(W1)}fadeInRipple(n,e,i={}){let r=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),o=N(N({},Ll),i.animation);i.centered&&(n=r.left+r.width/2,e=r.top+r.height/2);let a=i.radius||q1(n,e,r),s=n-r.left,l=e-r.top,c=o.enterDuration,d=document.createElement("div");d.classList.add("mat-ripple-element"),d.style.left=`${s-a}px`,d.style.top=`${l-a}px`,d.style.height=`${a*2}px`,d.style.width=`${a*2}px`,i.color!=null&&(d.style.backgroundColor=i.color),d.style.transitionDuration=`${c}ms`,this._containerElement.appendChild(d);let f=window.getComputedStyle(d),m=f.transitionProperty,h=f.transitionDuration,_=m==="none"||h==="0s"||h==="0s, 0s"||r.width===0&&r.height===0,D=new sv(this,d,i,_);d.style.transform="scale3d(1, 1, 1)",D.state=Pn.FADING_IN,i.persistent||(this._mostRecentTransientRipple=D);let E=null;return!_&&(c||o.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let k=()=>{E&&(E.fallbackTimer=null),clearTimeout(Ae),this._finishRippleTransition(D)},oe=()=>this._destroyRipple(D),Ae=setTimeout(oe,c+100);d.addEventListener("transitionend",k),d.addEventListener("transitioncancel",oe),E={onTransitionEnd:k,onTransitionCancel:oe,fallbackTimer:Ae}}),this._activeRipples.set(D,E),(_||!c)&&this._finishRippleTransition(D),D}fadeOutRipple(n){if(n.state===Pn.FADING_OUT||n.state===Pn.HIDDEN)return;let e=n.element,i=N(N({},Ll),n.config.animation);e.style.transitionDuration=`${i.exitDuration}ms`,e.style.opacity="0",n.state=Pn.FADING_OUT,(n._animationForciblyDisabledThroughCss||!i.exitDuration)&&this._finishRippleTransition(n)}fadeOutAll(){this._getActiveRipples().forEach(n=>n.fadeOut())}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(n=>{n.config.persistent||n.fadeOut()})}setupTriggerEvents(n){let e=pn(n);!this._platform.isBrowser||!e||e===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=e,fS.forEach(i=>{t._eventManager.addHandler(this._ngZone,i,e,this)}))}handleEvent(n){n.type==="mousedown"?this._onMousedown(n):n.type==="touchstart"?this._onTouchStart(n):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{hS.forEach(e=>{this._triggerElement.addEventListener(e,this,uS)})}),this._pointerUpEventsRegistered=!0)}_finishRippleTransition(n){n.state===Pn.FADING_IN?this._startFadeOutTransition(n):n.state===Pn.FADING_OUT&&this._destroyRipple(n)}_startFadeOutTransition(n){let e=n===this._mostRecentTransientRipple,{persistent:i}=n.config;n.state=Pn.VISIBLE,!i&&(!e||!this._isPointerDown)&&n.fadeOut()}_destroyRipple(n){let e=this._activeRipples.get(n)??null;this._activeRipples.delete(n),this._activeRipples.size||(this._containerRect=null),n===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),n.state=Pn.HIDDEN,e!==null&&(n.element.removeEventListener("transitionend",e.onTransitionEnd),n.element.removeEventListener("transitioncancel",e.onTransitionCancel),e.fallbackTimer!==null&&clearTimeout(e.fallbackTimer)),n.element.remove()}_onMousedown(n){let e=yl(n),i=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+G1;!this._target.rippleDisabled&&!e&&!i&&(this._isPointerDown=!0,this.fadeInRipple(n.clientX,n.clientY,this._target.rippleConfig))}_onTouchStart(n){if(!this._target.rippleDisabled&&!bl(n)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;let e=n.changedTouches;if(e)for(let i=0;i<e.length;i++)this.fadeInRipple(e[i].clientX,e[i].clientY,this._target.rippleConfig)}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=!1,this._getActiveRipples().forEach(n=>{let e=n.state===Pn.VISIBLE||n.config.terminateOnPointerUp&&n.state===Pn.FADING_IN;!n.config.persistent&&e&&n.fadeOut()}))}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let n=this._triggerElement;n&&(fS.forEach(e=>t._eventManager.removeHandler(e,n,this)),this._pointerUpEventsRegistered&&(hS.forEach(e=>n.removeEventListener(e,this,uS)),this._pointerUpEventsRegistered=!1))}};function q1(t,n,e){let i=Math.max(Math.abs(t-e.left),Math.abs(t-e.right)),r=Math.max(Math.abs(n-e.top),Math.abs(n-e.bottom));return Math.sqrt(i*i+r*r)}var cv=new b("mat-ripple-global-options"),Tr=(()=>{class t{_elementRef=u(P);_animationsDisabled=Xe();color;unbounded=!1;centered=!1;radius=0;animation;get disabled(){return this._disabled}set disabled(e){e&&this.fadeOutAllNonPersistent(),this._disabled=e,this._setupTriggerEventsIfEnabled()}_disabled=!1;get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(e){this._trigger=e,this._setupTriggerEventsIfEnabled()}_trigger;_rippleRenderer;_globalOptions;_isInitialized=!1;constructor(){let e=u(A),i=u(Ce),r=u(cv,{optional:!0}),o=u(ne);this._globalOptions=r||{},this._rippleRenderer=new Vl(this,e,this._elementRef,i,o)}ngOnInit(){this._isInitialized=!0,this._setupTriggerEventsIfEnabled()}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents()}fadeOutAll(){this._rippleRenderer.fadeOutAll()}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent()}get rippleConfig(){return{centered:this.centered,radius:this.radius,color:this.color,animation:N(N(N({},this._globalOptions.animation),this._animationsDisabled?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger)}launch(e,i=0,r){return typeof e=="number"?this._rippleRenderer.fadeInRipple(e,i,N(N({},this.rippleConfig),r)):this._rippleRenderer.fadeInRipple(0,0,N(N({},this.rippleConfig),e))}static \u0275fac=function(i){return new(i||t)};static \u0275dir=z({type:t,selectors:[["","mat-ripple",""],["","matRipple",""]],hostAttrs:[1,"mat-ripple"],hostVars:2,hostBindings:function(i,r){i&2&&O("mat-ripple-unbounded",r.unbounded)},inputs:{color:[0,"matRippleColor","color"],unbounded:[0,"matRippleUnbounded","unbounded"],centered:[0,"matRippleCentered","centered"],radius:[0,"matRippleRadius","radius"],animation:[0,"matRippleAnimation","animation"],disabled:[0,"matRippleDisabled","disabled"],trigger:[0,"matRippleTrigger","trigger"]},exportAs:["matRipple"]})}return t})();var Y1={capture:!0},K1=["focus","mousedown","mouseenter","touchstart"],dv="mat-ripple-loader-uninitialized",uv="mat-ripple-loader-class-name",mS="mat-ripple-loader-centered",Vf="mat-ripple-loader-disabled",pS=(()=>{class t{_document=u(W);_animationsDisabled=Xe();_globalRippleOptions=u(cv,{optional:!0});_platform=u(Ce);_ngZone=u(A);_injector=u(ne);_eventCleanups;_hosts=new Map;constructor(){let e=u(rt).createRenderer(null,null);this._eventCleanups=this._ngZone.runOutsideAngular(()=>K1.map(i=>e.listen(this._document,i,this._onInteraction,Y1)))}ngOnDestroy(){let e=this._hosts.keys();for(let i of e)this.destroyRipple(i);this._eventCleanups.forEach(i=>i())}configureRipple(e,i){e.setAttribute(dv,this._globalRippleOptions?.namespace??""),(i.className||!e.hasAttribute(uv))&&e.setAttribute(uv,i.className||""),i.centered&&e.setAttribute(mS,""),i.disabled&&e.setAttribute(Vf,"")}setDisabled(e,i){let r=this._hosts.get(e);r?(r.target.rippleDisabled=i,!i&&!r.hasSetUpEvents&&(r.hasSetUpEvents=!0,r.renderer.setupTriggerEvents(e))):i?e.setAttribute(Vf,""):e.removeAttribute(Vf)}_onInteraction=e=>{let i=Rt(e);if(i instanceof HTMLElement){let r=i.closest(`[${dv}="${this._globalRippleOptions?.namespace??""}"]`);r&&this._createRipple(r)}};_createRipple(e){if(!this._document||this._hosts.has(e))return;e.querySelector(".mat-ripple")?.remove();let i=this._document.createElement("span");i.classList.add("mat-ripple",e.getAttribute(uv)),e.append(i);let r=this._globalRippleOptions,o=this._animationsDisabled?0:r?.animation?.enterDuration??Ll.enterDuration,a=this._animationsDisabled?0:r?.animation?.exitDuration??Ll.exitDuration,s={rippleDisabled:this._animationsDisabled||r?.disabled||e.hasAttribute(Vf),rippleConfig:{centered:e.hasAttribute(mS),terminateOnPointerUp:r?.terminateOnPointerUp,animation:{enterDuration:o,exitDuration:a}}},l=new Vl(s,this._ngZone,i,this._platform,this._injector),c=!s.rippleDisabled;c&&l.setupTriggerEvents(e),this._hosts.set(e,{target:s,renderer:l,hasSetUpEvents:c}),e.removeAttribute(dv)}destroyRipple(e){let i=this._hosts.get(e);i&&(i.renderer._removeTriggerEvents(),this._hosts.delete(e))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Ln=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["structural-styles"]],decls:0,vars:0,template:function(i,r){},styles:[`.mat-focus-indicator {
  position: relative;
}
.mat-focus-indicator::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  box-sizing: border-box;
  pointer-events: none;
  display: var(--mat-focus-indicator-display, none);
  border-width: var(--mat-focus-indicator-border-width, 3px);
  border-style: var(--mat-focus-indicator-border-style, solid);
  border-color: var(--mat-focus-indicator-border-color, transparent);
  border-radius: var(--mat-focus-indicator-border-radius, 4px);
}
.mat-focus-indicator:focus-visible::before {
  content: "";
}

@media (forced-colors: active) {
  html {
    --mat-focus-indicator-display: block;
  }
}
`],encapsulation:2,changeDetection:0})}return t})();var Q1=["mat-icon-button",""],Z1=["*"],X1=new b("MAT_BUTTON_CONFIG");function gS(t){return t==null?void 0:kn(t)}var Bl=(()=>{class t{_elementRef=u(P);_ngZone=u(A);_animationsDisabled=Xe();_config=u(X1,{optional:!0});_focusMonitor=u(xi);_cleanupClick;_renderer=u($e);_rippleLoader=u(pS);_isAnchor;_isFab=!1;color;get disableRipple(){return this._disableRipple}set disableRipple(e){this._disableRipple=e,this._updateRippleDisabled()}_disableRipple=!1;get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._updateRippleDisabled()}_disabled=!1;ariaDisabled;disabledInteractive;tabIndex;set _tabindex(e){this.tabIndex=e}constructor(){u(je).load(Ln);let e=this._elementRef.nativeElement;this._isAnchor=e.tagName==="A",this.disabledInteractive=this._config?.disabledInteractive??!1,this.color=this._config?.color??null,this._rippleLoader?.configureRipple(e,{className:"mat-mdc-button-ripple"})}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0),this._isAnchor&&this._setupAsAnchor()}ngOnDestroy(){this._cleanupClick?.(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement)}focus(e="program",i){e?this._focusMonitor.focusVia(this._elementRef.nativeElement,e,i):this._elementRef.nativeElement.focus(i)}_getAriaDisabled(){return this.ariaDisabled!=null?this.ariaDisabled:this._isAnchor?this.disabled||null:this.disabled&&this.disabledInteractive?!0:null}_getDisabledAttribute(){return this.disabledInteractive||!this.disabled?null:!0}_updateRippleDisabled(){this._rippleLoader?.setDisabled(this._elementRef.nativeElement,this.disableRipple||this.disabled)}_getTabIndex(){return this._isAnchor?this.disabled&&!this.disabledInteractive?-1:this.tabIndex:this.tabIndex}_setupAsAnchor(){this._cleanupClick=this._ngZone.runOutsideAngular(()=>this._renderer.listen(this._elementRef.nativeElement,"click",e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())}))}static \u0275fac=function(i){return new(i||t)};static \u0275dir=z({type:t,hostAttrs:[1,"mat-mdc-button-base"],hostVars:13,hostBindings:function(i,r){i&2&&(ce("disabled",r._getDisabledAttribute())("aria-disabled",r._getAriaDisabled())("tabindex",r._getTabIndex()),_t(r.color?"mat-"+r.color:""),O("mat-mdc-button-disabled",r.disabled)("mat-mdc-button-disabled-interactive",r.disabledInteractive)("mat-unthemed",!r.color)("_mat-animation-noopable",r._animationsDisabled))},inputs:{color:"color",disableRipple:[2,"disableRipple","disableRipple",F],disabled:[2,"disabled","disabled",F],ariaDisabled:[2,"aria-disabled","ariaDisabled",F],disabledInteractive:[2,"disabledInteractive","disabledInteractive",F],tabIndex:[2,"tabIndex","tabIndex",gS],_tabindex:[2,"tabindex","_tabindex",gS]}})}return t})(),La=(()=>{class t extends Bl{constructor(){super(),this._rippleLoader.configureRipple(this._elementRef.nativeElement,{centered:!0})}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["button","mat-icon-button",""],["a","mat-icon-button",""],["button","matIconButton",""],["a","matIconButton",""]],hostAttrs:[1,"mdc-icon-button","mat-mdc-icon-button"],exportAs:["matButton","matAnchor"],features:[Ge],attrs:Q1,ngContentSelectors:Z1,decls:4,vars:0,consts:[[1,"mat-mdc-button-persistent-ripple","mdc-icon-button__ripple"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(i,r){i&1&&(we(),wt(0,"span",0),Z(1),wt(2,"span",1)(3,"span",2))},styles:[`.mat-mdc-icon-button {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  border: none;
  outline: none;
  background-color: transparent;
  fill: currentColor;
  text-decoration: none;
  cursor: pointer;
  z-index: 0;
  overflow: visible;
  border-radius: var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));
  flex-shrink: 0;
  text-align: center;
  width: var(--mat-icon-button-state-layer-size, 40px);
  height: var(--mat-icon-button-state-layer-size, 40px);
  padding: calc(calc(var(--mat-icon-button-state-layer-size, 40px) - var(--mat-icon-button-icon-size, 24px)) / 2);
  font-size: var(--mat-icon-button-icon-size, 24px);
  color: var(--mat-icon-button-icon-color, var(--mat-sys-on-surface-variant));
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-icon-button .mat-mdc-button-ripple,
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple,
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-icon-button .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-icon-button .mdc-button__label,
.mat-mdc-icon-button .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-icon-button .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
}
.mat-mdc-icon-button:focus-visible > .mat-focus-indicator::before {
  content: "";
  border-radius: inherit;
}
.mat-mdc-icon-button .mat-ripple-element {
  background-color: var(--mat-icon-button-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface-variant) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-icon-button-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-icon-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-icon-button-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-icon-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-icon-button-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-icon-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-icon-button-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-icon-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-icon-button-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-icon-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-icon-button-touch-target-size, 48px);
  display: var(--mat-icon-button-touch-target-display, block);
  left: 50%;
  width: var(--mat-icon-button-touch-target-size, 48px);
  transform: translate(-50%, -50%);
}
.mat-mdc-icon-button._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-icon-button[disabled], .mat-mdc-icon-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-icon-button-disabled-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-icon-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-icon-button img,
.mat-mdc-icon-button svg {
  width: var(--mat-icon-button-icon-size, 24px);
  height: var(--mat-icon-button-icon-size, 24px);
  vertical-align: baseline;
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple {
  border-radius: var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));
}
.mat-mdc-icon-button[hidden] {
  display: none;
}
.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before {
  background: transparent;
  opacity: 1;
}
`,`@media (forced-colors: active) {
  .mat-mdc-button:not(.mdc-button--outlined),
  .mat-mdc-unelevated-button:not(.mdc-button--outlined),
  .mat-mdc-raised-button:not(.mdc-button--outlined),
  .mat-mdc-outlined-button:not(.mdc-button--outlined),
  .mat-mdc-button-base.mat-tonal-button,
  .mat-mdc-icon-button.mat-mdc-icon-button,
  .mat-mdc-outlined-button .mdc-button__ripple {
    outline: solid 1px;
  }
}
`],encapsulation:2,changeDetection:0})}return t})();var Va=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=$({type:t});static \u0275inj=H({imports:[be]})}return t})();var J1=["matButton",""],fv=[[["",8,"material-icons",3,"iconPositionEnd",""],["mat-icon",3,"iconPositionEnd",""],["","matButtonIcon","",3,"iconPositionEnd",""]],"*",[["","iconPositionEnd","",8,"material-icons"],["mat-icon","iconPositionEnd",""],["","matButtonIcon","","iconPositionEnd",""]]],hv=[".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])","*",".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]"],eP=["mat-fab",""],tP=["mat-mini-fab",""],nP=`.mat-mdc-fab-base {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 56px;
  height: 56px;
  padding: 0;
  border: none;
  fill: currentColor;
  text-decoration: none;
  cursor: pointer;
  -moz-appearance: none;
  -webkit-appearance: none;
  overflow: visible;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 15ms linear 30ms, transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-fab-base .mat-mdc-button-ripple,
.mat-mdc-fab-base .mat-mdc-button-persistent-ripple,
.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-fab-base .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-fab-base .mdc-button__label,
.mat-mdc-fab-base .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-fab-base .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}
.mat-mdc-fab-base:focus-visible > .mat-focus-indicator::before {
  content: "";
}
.mat-mdc-fab-base._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-fab-base::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 1px solid transparent;
  border-radius: inherit;
  content: "";
  pointer-events: none;
}
.mat-mdc-fab-base[hidden] {
  display: none;
}
.mat-mdc-fab-base::-moz-focus-inner {
  padding: 0;
  border: 0;
}
.mat-mdc-fab-base:active, .mat-mdc-fab-base:focus {
  outline: none;
}
.mat-mdc-fab-base:hover {
  cursor: pointer;
}
.mat-mdc-fab-base > svg {
  width: 100%;
}
.mat-mdc-fab-base .mat-icon, .mat-mdc-fab-base .material-icons {
  transition: transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);
  fill: currentColor;
  will-change: transform;
}
.mat-mdc-fab-base .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);
}
.mat-mdc-fab-base[disabled], .mat-mdc-fab-base.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-fab-base[disabled], .mat-mdc-fab-base[disabled]:focus, .mat-mdc-fab-base.mat-mdc-button-disabled, .mat-mdc-fab-base.mat-mdc-button-disabled:focus {
  box-shadow: none;
}
.mat-mdc-fab-base.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-fab {
  background-color: var(--mat-fab-container-color, var(--mat-sys-primary-container));
  border-radius: var(--mat-fab-container-shape, var(--mat-sys-corner-large));
  color: var(--mat-fab-foreground-color, var(--mat-sys-on-primary-container, inherit));
  box-shadow: var(--mat-fab-container-elevation-shadow, var(--mat-sys-level3));
}
@media (hover: hover) {
  .mat-mdc-fab:hover {
    box-shadow: var(--mat-fab-hover-container-elevation-shadow, var(--mat-sys-level4));
  }
}
.mat-mdc-fab:focus {
  box-shadow: var(--mat-fab-focus-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-fab:active, .mat-mdc-fab:focus:active {
  box-shadow: var(--mat-fab-pressed-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-fab[disabled], .mat-mdc-fab.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-fab-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-fab-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-fab.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-fab .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-fab-touch-target-size, 48px);
  display: var(--mat-fab-touch-target-display, block);
  left: 50%;
  width: var(--mat-fab-touch-target-size, 48px);
  transform: translate(-50%, -50%);
}
.mat-mdc-fab .mat-ripple-element {
  background-color: var(--mat-fab-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-fab .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-fab-state-layer-color, var(--mat-sys-on-primary-container));
}
.mat-mdc-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-fab-disabled-state-layer-color);
}
.mat-mdc-fab:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-fab:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}

.mat-mdc-mini-fab {
  width: 40px;
  height: 40px;
  background-color: var(--mat-fab-small-container-color, var(--mat-sys-primary-container));
  border-radius: var(--mat-fab-small-container-shape, var(--mat-sys-corner-medium));
  color: var(--mat-fab-small-foreground-color, var(--mat-sys-on-primary-container, inherit));
  box-shadow: var(--mat-fab-small-container-elevation-shadow, var(--mat-sys-level3));
}
@media (hover: hover) {
  .mat-mdc-mini-fab:hover {
    box-shadow: var(--mat-fab-small-hover-container-elevation-shadow, var(--mat-sys-level4));
  }
}
.mat-mdc-mini-fab:focus {
  box-shadow: var(--mat-fab-small-focus-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-mini-fab:active, .mat-mdc-mini-fab:focus:active {
  box-shadow: var(--mat-fab-small-pressed-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-mini-fab[disabled], .mat-mdc-mini-fab.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-fab-small-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-fab-small-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-mini-fab.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-mini-fab .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-fab-small-touch-target-size, 48px);
  display: var(--mat-fab-small-touch-target-display);
  left: 50%;
  width: var(--mat-fab-small-touch-target-size, 48px);
  transform: translate(-50%, -50%);
}
.mat-mdc-mini-fab .mat-ripple-element {
  background-color: var(--mat-fab-small-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-fab-small-state-layer-color, var(--mat-sys-on-primary-container));
}
.mat-mdc-mini-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-fab-small-disabled-state-layer-color);
}
.mat-mdc-mini-fab:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-small-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-mini-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-small-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-mini-fab:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-small-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}

.mat-mdc-extended-fab {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  padding-left: 20px;
  padding-right: 20px;
  width: auto;
  max-width: 100%;
  line-height: normal;
  box-shadow: var(--mat-fab-extended-container-elevation-shadow, var(--mat-sys-level3));
  height: var(--mat-fab-extended-container-height, 56px);
  border-radius: var(--mat-fab-extended-container-shape, var(--mat-sys-corner-large));
  font-family: var(--mat-fab-extended-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-fab-extended-label-text-size, var(--mat-sys-label-large-size));
  font-weight: var(--mat-fab-extended-label-text-weight, var(--mat-sys-label-large-weight));
  letter-spacing: var(--mat-fab-extended-label-text-tracking, var(--mat-sys-label-large-tracking));
}
@media (hover: hover) {
  .mat-mdc-extended-fab:hover {
    box-shadow: var(--mat-fab-extended-hover-container-elevation-shadow, var(--mat-sys-level4));
  }
}
.mat-mdc-extended-fab:focus {
  box-shadow: var(--mat-fab-extended-focus-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-extended-fab:active, .mat-mdc-extended-fab:focus:active {
  box-shadow: var(--mat-fab-extended-pressed-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab[disabled]:focus, .mat-mdc-extended-fab.mat-mdc-button-disabled, .mat-mdc-extended-fab.mat-mdc-button-disabled:focus {
  box-shadow: none;
}
.mat-mdc-extended-fab.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
[dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .mat-icon, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-icons,
.mat-mdc-extended-fab > .mat-icon,
.mat-mdc-extended-fab > .material-icons {
  margin-left: -8px;
  margin-right: 12px;
}
.mat-mdc-extended-fab .mdc-button__label + .mat-icon,
.mat-mdc-extended-fab .mdc-button__label + .material-icons, [dir=rtl] .mat-mdc-extended-fab > .mat-icon, [dir=rtl] .mat-mdc-extended-fab > .material-icons {
  margin-left: 12px;
  margin-right: -8px;
}
.mat-mdc-extended-fab .mat-mdc-button-touch-target {
  width: 100%;
}
`,_S=new Map([["text",["mat-mdc-button"]],["filled",["mdc-button--unelevated","mat-mdc-unelevated-button"]],["elevated",["mdc-button--raised","mat-mdc-raised-button"]],["outlined",["mdc-button--outlined","mat-mdc-outlined-button"]],["tonal",["mat-tonal-button"]]]),_n=(()=>{class t extends Bl{get appearance(){return this._appearance}set appearance(e){this.setAppearance(e||this._config?.defaultAppearance||"text")}_appearance=null;constructor(){super();let e=iP(this._elementRef.nativeElement);e&&this.setAppearance(e)}setAppearance(e){if(e===this._appearance)return;let i=this._elementRef.nativeElement.classList,r=this._appearance?_S.get(this._appearance):null,o=_S.get(e);r&&i.remove(...r),i.add(...o),this._appearance=e}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["button","matButton",""],["a","matButton",""],["button","mat-button",""],["button","mat-raised-button",""],["button","mat-flat-button",""],["button","mat-stroked-button",""],["a","mat-button",""],["a","mat-raised-button",""],["a","mat-flat-button",""],["a","mat-stroked-button",""]],hostAttrs:[1,"mdc-button"],inputs:{appearance:[0,"matButton","appearance"]},exportAs:["matButton","matAnchor"],features:[Ge],attrs:J1,ngContentSelectors:hv,decls:7,vars:4,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(i,r){i&1&&(we(fv),wt(0,"span",0),Z(1),We(2,"span",1),Z(3,1),Ke(),Z(4,2),wt(5,"span",2)(6,"span",3)),i&2&&O("mdc-button__ripple",!r._isFab)("mdc-fab__ripple",r._isFab)},styles:[`.mat-mdc-button-base {
  text-decoration: none;
}
.mat-mdc-button-base .mat-icon {
  min-height: fit-content;
  flex-shrink: 0;
}
@media (hover: none) {
  .mat-mdc-button-base:hover > span.mat-mdc-button-persistent-ripple::before {
    opacity: 0;
  }
}

.mdc-button {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 64px;
  border: none;
  outline: none;
  line-height: inherit;
  -webkit-appearance: none;
  overflow: visible;
  vertical-align: middle;
  background: transparent;
  padding: 0 8px;
}
.mdc-button::-moz-focus-inner {
  padding: 0;
  border: 0;
}
.mdc-button:active {
  outline: none;
}
.mdc-button:hover {
  cursor: pointer;
}
.mdc-button:disabled {
  cursor: default;
  pointer-events: none;
}
.mdc-button[hidden] {
  display: none;
}
.mdc-button .mdc-button__label {
  position: relative;
}

.mat-mdc-button {
  padding: 0 var(--mat-button-text-horizontal-padding, 12px);
  height: var(--mat-button-text-container-height, 40px);
  font-family: var(--mat-button-text-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-text-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-text-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-text-label-text-transform);
  font-weight: var(--mat-button-text-label-text-weight, var(--mat-sys-label-large-weight));
}
.mat-mdc-button, .mat-mdc-button .mdc-button__ripple {
  border-radius: var(--mat-button-text-container-shape, var(--mat-sys-corner-full));
}
.mat-mdc-button:not(:disabled) {
  color: var(--mat-button-text-label-text-color, var(--mat-sys-primary));
}
.mat-mdc-button[disabled], .mat-mdc-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-text-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-button:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding: 0 var(--mat-button-text-with-icon-horizontal-padding, 16px);
}
.mat-mdc-button > .mat-icon {
  margin-right: var(--mat-button-text-icon-spacing, 8px);
  margin-left: var(--mat-button-text-icon-offset, -4px);
}
[dir=rtl] .mat-mdc-button > .mat-icon {
  margin-right: var(--mat-button-text-icon-offset, -4px);
  margin-left: var(--mat-button-text-icon-spacing, 8px);
}
.mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-text-icon-offset, -4px);
  margin-left: var(--mat-button-text-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-text-icon-spacing, 8px);
  margin-left: var(--mat-button-text-icon-offset, -4px);
}
.mat-mdc-button .mat-ripple-element {
  background-color: var(--mat-button-text-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-text-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-text-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-text-touch-target-size, 48px);
  display: var(--mat-button-text-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.mat-mdc-unelevated-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-filled-container-height, 40px);
  font-family: var(--mat-button-filled-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-filled-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-filled-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-filled-label-text-transform);
  font-weight: var(--mat-button-filled-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-filled-horizontal-padding, 24px);
}
.mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--mat-button-filled-icon-spacing, 8px);
  margin-left: var(--mat-button-filled-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--mat-button-filled-icon-offset, -8px);
  margin-left: var(--mat-button-filled-icon-spacing, 8px);
}
.mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-filled-icon-offset, -8px);
  margin-left: var(--mat-button-filled-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-filled-icon-spacing, 8px);
  margin-left: var(--mat-button-filled-icon-offset, -8px);
}
.mat-mdc-unelevated-button .mat-ripple-element {
  background-color: var(--mat-button-filled-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-filled-state-layer-color, var(--mat-sys-on-primary));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-filled-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-unelevated-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-unelevated-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-unelevated-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-unelevated-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-filled-touch-target-size, 48px);
  display: var(--mat-button-filled-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-unelevated-button:not(:disabled) {
  color: var(--mat-button-filled-label-text-color, var(--mat-sys-on-primary));
  background-color: var(--mat-button-filled-container-color, var(--mat-sys-primary));
}
.mat-mdc-unelevated-button, .mat-mdc-unelevated-button .mdc-button__ripple {
  border-radius: var(--mat-button-filled-container-shape, var(--mat-sys-corner-full));
}
.mat-mdc-unelevated-button[disabled], .mat-mdc-unelevated-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-raised-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--mat-button-protected-container-elevation-shadow, var(--mat-sys-level1));
  height: var(--mat-button-protected-container-height, 40px);
  font-family: var(--mat-button-protected-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-protected-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-protected-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-protected-label-text-transform);
  font-weight: var(--mat-button-protected-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-protected-horizontal-padding, 24px);
}
.mat-mdc-raised-button > .mat-icon {
  margin-right: var(--mat-button-protected-icon-spacing, 8px);
  margin-left: var(--mat-button-protected-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-raised-button > .mat-icon {
  margin-right: var(--mat-button-protected-icon-offset, -8px);
  margin-left: var(--mat-button-protected-icon-spacing, 8px);
}
.mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-protected-icon-offset, -8px);
  margin-left: var(--mat-button-protected-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-protected-icon-spacing, 8px);
  margin-left: var(--mat-button-protected-icon-offset, -8px);
}
.mat-mdc-raised-button .mat-ripple-element {
  background-color: var(--mat-button-protected-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-protected-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-raised-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-protected-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-raised-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-raised-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-raised-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-raised-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-protected-touch-target-size, 48px);
  display: var(--mat-button-protected-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-raised-button:not(:disabled) {
  color: var(--mat-button-protected-label-text-color, var(--mat-sys-primary));
  background-color: var(--mat-button-protected-container-color, var(--mat-sys-surface));
}
.mat-mdc-raised-button, .mat-mdc-raised-button .mdc-button__ripple {
  border-radius: var(--mat-button-protected-container-shape, var(--mat-sys-corner-full));
}
@media (hover: hover) {
  .mat-mdc-raised-button:hover {
    box-shadow: var(--mat-button-protected-hover-container-elevation-shadow, var(--mat-sys-level2));
  }
}
.mat-mdc-raised-button:focus {
  box-shadow: var(--mat-button-protected-focus-container-elevation-shadow, var(--mat-sys-level1));
}
.mat-mdc-raised-button:active, .mat-mdc-raised-button:focus:active {
  box-shadow: var(--mat-button-protected-pressed-container-elevation-shadow, var(--mat-sys-level1));
}
.mat-mdc-raised-button[disabled], .mat-mdc-raised-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-protected-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-protected-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-raised-button[disabled].mat-mdc-button-disabled, .mat-mdc-raised-button.mat-mdc-button-disabled.mat-mdc-button-disabled {
  box-shadow: var(--mat-button-protected-disabled-container-elevation-shadow, var(--mat-sys-level0));
}
.mat-mdc-raised-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-outlined-button {
  border-style: solid;
  transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-outlined-container-height, 40px);
  font-family: var(--mat-button-outlined-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-outlined-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-outlined-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-outlined-label-text-transform);
  font-weight: var(--mat-button-outlined-label-text-weight, var(--mat-sys-label-large-weight));
  border-radius: var(--mat-button-outlined-container-shape, var(--mat-sys-corner-full));
  border-width: var(--mat-button-outlined-outline-width, 1px);
  padding: 0 var(--mat-button-outlined-horizontal-padding, 24px);
}
.mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--mat-button-outlined-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--mat-button-outlined-icon-offset, -8px);
  margin-left: var(--mat-button-outlined-icon-spacing, 8px);
}
.mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-outlined-icon-offset, -8px);
  margin-left: var(--mat-button-outlined-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--mat-button-outlined-icon-offset, -8px);
}
.mat-mdc-outlined-button .mat-ripple-element {
  background-color: var(--mat-button-outlined-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-outlined-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-outlined-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-outlined-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-outlined-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-outlined-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-outlined-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-outlined-touch-target-size, 48px);
  display: var(--mat-button-outlined-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-outlined-button:not(:disabled) {
  color: var(--mat-button-outlined-label-text-color, var(--mat-sys-primary));
  border-color: var(--mat-button-outlined-outline-color, var(--mat-sys-outline));
}
.mat-mdc-outlined-button[disabled], .mat-mdc-outlined-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: var(--mat-button-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-tonal-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-tonal-container-height, 40px);
  font-family: var(--mat-button-tonal-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-tonal-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-tonal-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-tonal-label-text-transform);
  font-weight: var(--mat-button-tonal-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-tonal-horizontal-padding, 24px);
}
.mat-tonal-button:not(:disabled) {
  color: var(--mat-button-tonal-label-text-color, var(--mat-sys-on-secondary-container));
  background-color: var(--mat-button-tonal-container-color, var(--mat-sys-secondary-container));
}
.mat-tonal-button, .mat-tonal-button .mdc-button__ripple {
  border-radius: var(--mat-button-tonal-container-shape, var(--mat-sys-corner-full));
}
.mat-tonal-button[disabled], .mat-tonal-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-tonal-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-tonal-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-tonal-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-tonal-button > .mat-icon {
  margin-right: var(--mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--mat-button-tonal-icon-offset, -8px);
}
[dir=rtl] .mat-tonal-button > .mat-icon {
  margin-right: var(--mat-button-tonal-icon-offset, -8px);
  margin-left: var(--mat-button-tonal-icon-spacing, 8px);
}
.mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-tonal-icon-offset, -8px);
  margin-left: var(--mat-button-tonal-icon-spacing, 8px);
}
[dir=rtl] .mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--mat-button-tonal-icon-offset, -8px);
}
.mat-tonal-button .mat-ripple-element {
  background-color: var(--mat-button-tonal-ripple-color, color-mix(in srgb, var(--mat-sys-on-secondary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-tonal-state-layer-color, var(--mat-sys-on-secondary-container));
}
.mat-tonal-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-tonal-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-tonal-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-tonal-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-tonal-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-tonal-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-tonal-touch-target-size, 48px);
  display: var(--mat-button-tonal-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.mat-mdc-button,
.mat-mdc-unelevated-button,
.mat-mdc-raised-button,
.mat-mdc-outlined-button,
.mat-tonal-button {
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-button .mat-mdc-button-ripple,
.mat-mdc-button .mat-mdc-button-persistent-ripple,
.mat-mdc-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-unelevated-button .mat-mdc-button-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-raised-button .mat-mdc-button-ripple,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,
.mat-tonal-button .mat-mdc-button-ripple,
.mat-tonal-button .mat-mdc-button-persistent-ripple,
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-button .mat-mdc-button-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-ripple,
.mat-mdc-raised-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-tonal-button .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-button .mdc-button__label,
.mat-mdc-button .mat-icon,
.mat-mdc-unelevated-button .mdc-button__label,
.mat-mdc-unelevated-button .mat-icon,
.mat-mdc-raised-button .mdc-button__label,
.mat-mdc-raised-button .mat-icon,
.mat-mdc-outlined-button .mdc-button__label,
.mat-mdc-outlined-button .mat-icon,
.mat-tonal-button .mdc-button__label,
.mat-tonal-button .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-button .mat-focus-indicator,
.mat-mdc-unelevated-button .mat-focus-indicator,
.mat-mdc-raised-button .mat-focus-indicator,
.mat-mdc-outlined-button .mat-focus-indicator,
.mat-tonal-button .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
}
.mat-mdc-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-unelevated-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-raised-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-outlined-button:focus-visible > .mat-focus-indicator::before,
.mat-tonal-button:focus-visible > .mat-focus-indicator::before {
  content: "";
  border-radius: inherit;
}
.mat-mdc-button._mat-animation-noopable,
.mat-mdc-unelevated-button._mat-animation-noopable,
.mat-mdc-raised-button._mat-animation-noopable,
.mat-mdc-outlined-button._mat-animation-noopable,
.mat-tonal-button._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-button > .mat-icon,
.mat-mdc-unelevated-button > .mat-icon,
.mat-mdc-raised-button > .mat-icon,
.mat-mdc-outlined-button > .mat-icon,
.mat-tonal-button > .mat-icon {
  display: inline-block;
  position: relative;
  vertical-align: top;
  font-size: 1.125rem;
  height: 1.125rem;
  width: 1.125rem;
}

.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mdc-button__ripple {
  top: -1px;
  left: -1px;
  bottom: -1px;
  right: -1px;
}

.mat-mdc-unelevated-button .mat-focus-indicator::before,
.mat-tonal-button .mat-focus-indicator::before,
.mat-mdc-raised-button .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);
}

.mat-mdc-outlined-button .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 3px) * -1);
}
`,`@media (forced-colors: active) {
  .mat-mdc-button:not(.mdc-button--outlined),
  .mat-mdc-unelevated-button:not(.mdc-button--outlined),
  .mat-mdc-raised-button:not(.mdc-button--outlined),
  .mat-mdc-outlined-button:not(.mdc-button--outlined),
  .mat-mdc-button-base.mat-tonal-button,
  .mat-mdc-icon-button.mat-mdc-icon-button,
  .mat-mdc-outlined-button .mdc-button__ripple {
    outline: solid 1px;
  }
}
`],encapsulation:2,changeDetection:0})}return t})();function iP(t){return t.hasAttribute("mat-raised-button")?"elevated":t.hasAttribute("mat-stroked-button")?"outlined":t.hasAttribute("mat-flat-button")?"filled":t.hasAttribute("mat-button")?"text":null}var vS=new b("mat-mdc-fab-default-options",{providedIn:"root",factory:()=>jl}),jl={color:"accent"},yS=(()=>{class t extends Bl{_options=u(vS,{optional:!0});_isFab=!0;extended=!1;constructor(){super(),this._options=this._options||jl,this.color=this._options.color||jl.color}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["button","mat-fab",""],["a","mat-fab",""],["button","matFab",""],["a","matFab",""]],hostAttrs:[1,"mdc-fab","mat-mdc-fab-base","mat-mdc-fab"],hostVars:4,hostBindings:function(i,r){i&2&&O("mdc-fab--extended",r.extended)("mat-mdc-extended-fab",r.extended)},inputs:{extended:[2,"extended","extended",F]},exportAs:["matButton","matAnchor"],features:[Ge],attrs:eP,ngContentSelectors:hv,decls:7,vars:4,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(i,r){i&1&&(we(fv),wt(0,"span",0),Z(1),We(2,"span",1),Z(3,1),Ke(),Z(4,2),wt(5,"span",2)(6,"span",3)),i&2&&O("mdc-button__ripple",!r._isFab)("mdc-fab__ripple",r._isFab)},styles:[`.mat-mdc-fab-base {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 56px;
  height: 56px;
  padding: 0;
  border: none;
  fill: currentColor;
  text-decoration: none;
  cursor: pointer;
  -moz-appearance: none;
  -webkit-appearance: none;
  overflow: visible;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 15ms linear 30ms, transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-fab-base .mat-mdc-button-ripple,
.mat-mdc-fab-base .mat-mdc-button-persistent-ripple,
.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-fab-base .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-fab-base .mdc-button__label,
.mat-mdc-fab-base .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-fab-base .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}
.mat-mdc-fab-base:focus-visible > .mat-focus-indicator::before {
  content: "";
}
.mat-mdc-fab-base._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-fab-base::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 1px solid transparent;
  border-radius: inherit;
  content: "";
  pointer-events: none;
}
.mat-mdc-fab-base[hidden] {
  display: none;
}
.mat-mdc-fab-base::-moz-focus-inner {
  padding: 0;
  border: 0;
}
.mat-mdc-fab-base:active, .mat-mdc-fab-base:focus {
  outline: none;
}
.mat-mdc-fab-base:hover {
  cursor: pointer;
}
.mat-mdc-fab-base > svg {
  width: 100%;
}
.mat-mdc-fab-base .mat-icon, .mat-mdc-fab-base .material-icons {
  transition: transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);
  fill: currentColor;
  will-change: transform;
}
.mat-mdc-fab-base .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);
}
.mat-mdc-fab-base[disabled], .mat-mdc-fab-base.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-fab-base[disabled], .mat-mdc-fab-base[disabled]:focus, .mat-mdc-fab-base.mat-mdc-button-disabled, .mat-mdc-fab-base.mat-mdc-button-disabled:focus {
  box-shadow: none;
}
.mat-mdc-fab-base.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-fab {
  background-color: var(--mat-fab-container-color, var(--mat-sys-primary-container));
  border-radius: var(--mat-fab-container-shape, var(--mat-sys-corner-large));
  color: var(--mat-fab-foreground-color, var(--mat-sys-on-primary-container, inherit));
  box-shadow: var(--mat-fab-container-elevation-shadow, var(--mat-sys-level3));
}
@media (hover: hover) {
  .mat-mdc-fab:hover {
    box-shadow: var(--mat-fab-hover-container-elevation-shadow, var(--mat-sys-level4));
  }
}
.mat-mdc-fab:focus {
  box-shadow: var(--mat-fab-focus-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-fab:active, .mat-mdc-fab:focus:active {
  box-shadow: var(--mat-fab-pressed-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-fab[disabled], .mat-mdc-fab.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-fab-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-fab-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-fab.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-fab .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-fab-touch-target-size, 48px);
  display: var(--mat-fab-touch-target-display, block);
  left: 50%;
  width: var(--mat-fab-touch-target-size, 48px);
  transform: translate(-50%, -50%);
}
.mat-mdc-fab .mat-ripple-element {
  background-color: var(--mat-fab-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-fab .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-fab-state-layer-color, var(--mat-sys-on-primary-container));
}
.mat-mdc-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-fab-disabled-state-layer-color);
}
.mat-mdc-fab:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-fab:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}

.mat-mdc-mini-fab {
  width: 40px;
  height: 40px;
  background-color: var(--mat-fab-small-container-color, var(--mat-sys-primary-container));
  border-radius: var(--mat-fab-small-container-shape, var(--mat-sys-corner-medium));
  color: var(--mat-fab-small-foreground-color, var(--mat-sys-on-primary-container, inherit));
  box-shadow: var(--mat-fab-small-container-elevation-shadow, var(--mat-sys-level3));
}
@media (hover: hover) {
  .mat-mdc-mini-fab:hover {
    box-shadow: var(--mat-fab-small-hover-container-elevation-shadow, var(--mat-sys-level4));
  }
}
.mat-mdc-mini-fab:focus {
  box-shadow: var(--mat-fab-small-focus-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-mini-fab:active, .mat-mdc-mini-fab:focus:active {
  box-shadow: var(--mat-fab-small-pressed-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-mini-fab[disabled], .mat-mdc-mini-fab.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-fab-small-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-fab-small-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-mini-fab.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-mini-fab .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-fab-small-touch-target-size, 48px);
  display: var(--mat-fab-small-touch-target-display);
  left: 50%;
  width: var(--mat-fab-small-touch-target-size, 48px);
  transform: translate(-50%, -50%);
}
.mat-mdc-mini-fab .mat-ripple-element {
  background-color: var(--mat-fab-small-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-fab-small-state-layer-color, var(--mat-sys-on-primary-container));
}
.mat-mdc-mini-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-fab-small-disabled-state-layer-color);
}
.mat-mdc-mini-fab:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-small-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-mini-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-small-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-mini-fab:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-small-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}

.mat-mdc-extended-fab {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  padding-left: 20px;
  padding-right: 20px;
  width: auto;
  max-width: 100%;
  line-height: normal;
  box-shadow: var(--mat-fab-extended-container-elevation-shadow, var(--mat-sys-level3));
  height: var(--mat-fab-extended-container-height, 56px);
  border-radius: var(--mat-fab-extended-container-shape, var(--mat-sys-corner-large));
  font-family: var(--mat-fab-extended-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-fab-extended-label-text-size, var(--mat-sys-label-large-size));
  font-weight: var(--mat-fab-extended-label-text-weight, var(--mat-sys-label-large-weight));
  letter-spacing: var(--mat-fab-extended-label-text-tracking, var(--mat-sys-label-large-tracking));
}
@media (hover: hover) {
  .mat-mdc-extended-fab:hover {
    box-shadow: var(--mat-fab-extended-hover-container-elevation-shadow, var(--mat-sys-level4));
  }
}
.mat-mdc-extended-fab:focus {
  box-shadow: var(--mat-fab-extended-focus-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-extended-fab:active, .mat-mdc-extended-fab:focus:active {
  box-shadow: var(--mat-fab-extended-pressed-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab[disabled]:focus, .mat-mdc-extended-fab.mat-mdc-button-disabled, .mat-mdc-extended-fab.mat-mdc-button-disabled:focus {
  box-shadow: none;
}
.mat-mdc-extended-fab.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
[dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .mat-icon, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-icons,
.mat-mdc-extended-fab > .mat-icon,
.mat-mdc-extended-fab > .material-icons {
  margin-left: -8px;
  margin-right: 12px;
}
.mat-mdc-extended-fab .mdc-button__label + .mat-icon,
.mat-mdc-extended-fab .mdc-button__label + .material-icons, [dir=rtl] .mat-mdc-extended-fab > .mat-icon, [dir=rtl] .mat-mdc-extended-fab > .material-icons {
  margin-left: 12px;
  margin-right: -8px;
}
.mat-mdc-extended-fab .mat-mdc-button-touch-target {
  width: 100%;
}
`],encapsulation:2,changeDetection:0})}return t})(),bS=(()=>{class t extends Bl{_options=u(vS,{optional:!0});_isFab=!0;constructor(){super(),this._options=this._options||jl,this.color=this._options.color||jl.color}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["button","mat-mini-fab",""],["a","mat-mini-fab",""],["button","matMiniFab",""],["a","matMiniFab",""]],hostAttrs:[1,"mdc-fab","mat-mdc-fab-base","mdc-fab--mini","mat-mdc-mini-fab"],exportAs:["matButton","matAnchor"],features:[Ge],attrs:tP,ngContentSelectors:hv,decls:7,vars:4,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(i,r){i&1&&(we(fv),wt(0,"span",0),Z(1),We(2,"span",1),Z(3,1),Ke(),Z(4,2),wt(5,"span",2)(6,"span",3)),i&2&&O("mdc-button__ripple",!r._isFab)("mdc-fab__ripple",r._isFab)},styles:[nP],encapsulation:2,changeDetection:0})}return t})();var Bt=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=$({type:t});static \u0275inj=H({imports:[Va,be]})}return t})();var Hl=class{_multiple;_emitChanges;compareWith;_selection=new Set;_deselectedToEmit=[];_selectedToEmit=[];_selected=null;get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}changed=new M;constructor(n=!1,e,i=!0,r){this._multiple=n,this._emitChanges=i,this.compareWith=r,e&&e.length&&(n?e.forEach(o=>this._markSelected(o)):this._markSelected(e[0]),this._selectedToEmit.length=0)}select(...n){this._verifyValueAssignment(n),n.forEach(i=>this._markSelected(i));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}deselect(...n){this._verifyValueAssignment(n),n.forEach(i=>this._unmarkSelected(i));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}setSelection(...n){this._verifyValueAssignment(n);let e=this.selected,i=new Set(n.map(o=>this._getConcreteValue(o)));n.forEach(o=>this._markSelected(o)),e.filter(o=>!i.has(this._getConcreteValue(o,i))).forEach(o=>this._unmarkSelected(o));let r=this._hasQueuedChanges();return this._emitChangeEvent(),r}toggle(n){return this.isSelected(n)?this.deselect(n):this.select(n)}clear(n=!0){this._unmarkAll();let e=this._hasQueuedChanges();return n&&this._emitChangeEvent(),e}isSelected(n){return this._selection.has(this._getConcreteValue(n))}isEmpty(){return this._selection.size===0}hasValue(){return!this.isEmpty()}sort(n){this._multiple&&this.selected&&this._selected.sort(n)}isMultipleSelection(){return this._multiple}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(n){n=this._getConcreteValue(n),this.isSelected(n)||(this._multiple||this._unmarkAll(),this.isSelected(n)||this._selection.add(n),this._emitChanges&&this._selectedToEmit.push(n))}_unmarkSelected(n){n=this._getConcreteValue(n),this.isSelected(n)&&(this._selection.delete(n),this._emitChanges&&this._deselectedToEmit.push(n))}_unmarkAll(){this.isEmpty()||this._selection.forEach(n=>this._unmarkSelected(n))}_verifyValueAssignment(n){n.length>1&&this._multiple}_hasQueuedChanges(){return!!(this._deselectedToEmit.length||this._selectedToEmit.length)}_getConcreteValue(n,e){if(this.compareWith){e=e??this._selection;for(let i of e)if(this.compareWith(n,i))return i;return n}else return n}};var mv=(()=>{class t{_listeners=[];notify(e,i){for(let r of this._listeners)r(e,i)}listen(e){return this._listeners.push(e),()=>{this._listeners=this._listeners.filter(i=>e!==i)}}ngOnDestroy(){this._listeners=[]}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var rP=["mat-internal-form-field",""],oP=["*"],Ba=(()=>{class t{labelPosition="after";static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["div","mat-internal-form-field",""]],hostAttrs:[1,"mdc-form-field","mat-internal-form-field"],hostVars:2,hostBindings:function(i,r){i&2&&O("mdc-form-field--align-end",r.labelPosition==="before")},inputs:{labelPosition:"labelPosition"},attrs:rP,ngContentSelectors:oP,decls:1,vars:0,template:function(i,r){i&1&&(we(),Z(0))},styles:[`.mat-internal-form-field {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
}
.mat-internal-form-field > label {
  margin-left: 0;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 0;
  order: 0;
}
[dir=rtl] .mat-internal-form-field > label {
  margin-left: auto;
  margin-right: 0;
  padding-left: 0;
  padding-right: 4px;
}

.mdc-form-field--align-end > label {
  margin-left: auto;
  margin-right: 0;
  padding-left: 0;
  padding-right: 4px;
  order: -1;
}
[dir=rtl] .mdc-form-field--align-end .mdc-form-field--align-end label {
  margin-left: 0;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 0;
}
`],encapsulation:2,changeDetection:0})}return t})();var aP=["input"],sP=["formField"],lP=["*"],Bf=class{source;value;constructor(n,e){this.source=n,this.value=e}},cP={provide:On,useExisting:at(()=>pv),multi:!0},DS=new b("MatRadioGroup"),dP=new b("mat-radio-default-options",{providedIn:"root",factory:()=>({color:"accent",disabledInteractive:!1})}),pv=(()=>{class t{_changeDetector=u(Fe);_value=null;_name=u(qe).getId("mat-radio-group-");_selected=null;_isInitialized=!1;_labelPosition="after";_disabled=!1;_required=!1;_buttonChanges;_controlValueAccessorChangeFn=()=>{};onTouched=()=>{};change=new S;_radios;color;get name(){return this._name}set name(e){this._name=e,this._updateRadioButtonNames()}get labelPosition(){return this._labelPosition}set labelPosition(e){this._labelPosition=e==="before"?"before":"after",this._markRadiosForCheck()}get value(){return this._value}set value(e){this._value!==e&&(this._value=e,this._updateSelectedRadioFromValue(),this._checkSelectedRadioButton())}_checkSelectedRadioButton(){this._selected&&!this._selected.checked&&(this._selected.checked=!0)}get selected(){return this._selected}set selected(e){this._selected=e,this.value=e?e.value:null,this._checkSelectedRadioButton()}get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._markRadiosForCheck()}get required(){return this._required}set required(e){this._required=e,this._markRadiosForCheck()}get disabledInteractive(){return this._disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e,this._markRadiosForCheck()}_disabledInteractive=!1;constructor(){}ngAfterContentInit(){this._isInitialized=!0,this._buttonChanges=this._radios.changes.subscribe(()=>{this.selected&&!this._radios.find(e=>e===this.selected)&&(this._selected=null)})}ngOnDestroy(){this._buttonChanges?.unsubscribe()}_touch(){this.onTouched&&this.onTouched()}_updateRadioButtonNames(){this._radios&&this._radios.forEach(e=>{e.name=this.name,e._markForCheck()})}_updateSelectedRadioFromValue(){let e=this._selected!==null&&this._selected.value===this._value;this._radios&&!e&&(this._selected=null,this._radios.forEach(i=>{i.checked=this.value===i.value,i.checked&&(this._selected=i)}))}_emitChangeEvent(){this._isInitialized&&this.change.emit(new Bf(this._selected,this._value))}_markRadiosForCheck(){this._radios&&this._radios.forEach(e=>e._markForCheck())}writeValue(e){this.value=e,this._changeDetector.markForCheck()}registerOnChange(e){this._controlValueAccessorChangeFn=e}registerOnTouched(e){this.onTouched=e}setDisabledState(e){this.disabled=e,this._changeDetector.markForCheck()}static \u0275fac=function(i){return new(i||t)};static \u0275dir=z({type:t,selectors:[["mat-radio-group"]],contentQueries:function(i,r,o){if(i&1&&Mn(o,jf,5),i&2){let a;B(a=j())&&(r._radios=a)}},hostAttrs:["role","radiogroup",1,"mat-mdc-radio-group"],inputs:{color:"color",name:"name",labelPosition:"labelPosition",value:"value",selected:"selected",disabled:[2,"disabled","disabled",F],required:[2,"required","required",F],disabledInteractive:[2,"disabledInteractive","disabledInteractive",F]},outputs:{change:"change"},exportAs:["matRadioGroup"],features:[xe([cP,{provide:DS,useExisting:t}])]})}return t})(),jf=(()=>{class t{_elementRef=u(P);_changeDetector=u(Fe);_focusMonitor=u(xi);_radioDispatcher=u(mv);_defaultOptions=u(dP,{optional:!0});_ngZone=u(A);_renderer=u($e);_uniqueId=u(qe).getId("mat-radio-");_cleanupClick;id=this._uniqueId;name;ariaLabel;ariaLabelledby;ariaDescribedby;disableRipple=!1;tabIndex=0;get checked(){return this._checked}set checked(e){this._checked!==e&&(this._checked=e,e&&this.radioGroup&&this.radioGroup.value!==this.value?this.radioGroup.selected=this:!e&&this.radioGroup&&this.radioGroup.value===this.value&&(this.radioGroup.selected=null),e&&this._radioDispatcher.notify(this.id,this.name),this._changeDetector.markForCheck())}get value(){return this._value}set value(e){this._value!==e&&(this._value=e,this.radioGroup!==null&&(this.checked||(this.checked=this.radioGroup.value===e),this.checked&&(this.radioGroup.selected=this)))}get labelPosition(){return this._labelPosition||this.radioGroup&&this.radioGroup.labelPosition||"after"}set labelPosition(e){this._labelPosition=e}_labelPosition;get disabled(){return this._disabled||this.radioGroup!==null&&this.radioGroup.disabled}set disabled(e){this._setDisabled(e)}get required(){return this._required||this.radioGroup&&this.radioGroup.required}set required(e){e!==this._required&&this._changeDetector.markForCheck(),this._required=e}get color(){return this._color||this.radioGroup&&this.radioGroup.color||this._defaultOptions&&this._defaultOptions.color||"accent"}set color(e){this._color=e}_color;get disabledInteractive(){return this._disabledInteractive||this.radioGroup!==null&&this.radioGroup.disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e}_disabledInteractive;change=new S;radioGroup;get inputId(){return`${this.id||this._uniqueId}-input`}_checked=!1;_disabled=!1;_required=!1;_value=null;_removeUniqueSelectionListener=()=>{};_previousTabIndex;_inputElement;_rippleTrigger;_noopAnimations=Xe();_injector=u(ne);constructor(){u(je).load(Ln);let e=u(DS,{optional:!0}),i=u(new en("tabindex"),{optional:!0});this.radioGroup=e,this._disabledInteractive=this._defaultOptions?.disabledInteractive??!1,i&&(this.tabIndex=kn(i,0))}focus(e,i){i?this._focusMonitor.focusVia(this._inputElement,i,e):this._inputElement.nativeElement.focus(e)}_markForCheck(){this._changeDetector.markForCheck()}ngOnInit(){this.radioGroup&&(this.checked=this.radioGroup.value===this._value,this.checked&&(this.radioGroup.selected=this),this.name=this.radioGroup.name),this._removeUniqueSelectionListener=this._radioDispatcher.listen((e,i)=>{e!==this.id&&i===this.name&&(this.checked=!1)})}ngDoCheck(){this._updateTabIndex()}ngAfterViewInit(){this._updateTabIndex(),this._focusMonitor.monitor(this._elementRef,!0).subscribe(e=>{!e&&this.radioGroup&&this.radioGroup._touch()}),this._ngZone.runOutsideAngular(()=>{this._cleanupClick=this._renderer.listen(this._inputElement.nativeElement,"click",this._onInputClick)})}ngOnDestroy(){this._cleanupClick?.(),this._focusMonitor.stopMonitoring(this._elementRef),this._removeUniqueSelectionListener()}_emitChangeEvent(){this.change.emit(new Bf(this,this._value))}_isRippleDisabled(){return this.disableRipple||this.disabled}_onInputInteraction(e){if(e.stopPropagation(),!this.checked&&!this.disabled){let i=this.radioGroup&&this.value!==this.radioGroup.value;this.checked=!0,this._emitChangeEvent(),this.radioGroup&&(this.radioGroup._controlValueAccessorChangeFn(this.value),i&&this.radioGroup._emitChangeEvent())}}_onTouchTargetClick(e){this._onInputInteraction(e),(!this.disabled||this.disabledInteractive)&&this._inputElement?.nativeElement.focus()}_setDisabled(e){this._disabled!==e&&(this._disabled=e,this._changeDetector.markForCheck())}_onInputClick=e=>{this.disabled&&this.disabledInteractive&&e.preventDefault()};_updateTabIndex(){let e=this.radioGroup,i;if(!e||!e.selected||this.disabled?i=this.tabIndex:i=e.selected===this?this.tabIndex:-1,i!==this._previousTabIndex){let r=this._inputElement?.nativeElement;r&&(r.setAttribute("tabindex",i+""),this._previousTabIndex=i,At(()=>{queueMicrotask(()=>{e&&e.selected&&e.selected!==this&&document.activeElement===r&&(e.selected?._inputElement.nativeElement.focus(),document.activeElement===r&&this._inputElement.nativeElement.blur())})},{injector:this._injector}))}}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["mat-radio-button"]],viewQuery:function(i,r){if(i&1&&ve(aP,5)(sP,7,P),i&2){let o;B(o=j())&&(r._inputElement=o.first),B(o=j())&&(r._rippleTrigger=o.first)}},hostAttrs:[1,"mat-mdc-radio-button"],hostVars:19,hostBindings:function(i,r){i&1&&x("focus",function(){return r._inputElement.nativeElement.focus()}),i&2&&(ce("id",r.id)("tabindex",null)("aria-label",null)("aria-labelledby",null)("aria-describedby",null),O("mat-primary",r.color==="primary")("mat-accent",r.color==="accent")("mat-warn",r.color==="warn")("mat-mdc-radio-checked",r.checked)("mat-mdc-radio-disabled",r.disabled)("mat-mdc-radio-disabled-interactive",r.disabledInteractive)("_mat-animation-noopable",r._noopAnimations))},inputs:{id:"id",name:"name",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],disableRipple:[2,"disableRipple","disableRipple",F],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:kn(e)],checked:[2,"checked","checked",F],value:"value",labelPosition:"labelPosition",disabled:[2,"disabled","disabled",F],required:[2,"required","required",F],color:"color",disabledInteractive:[2,"disabledInteractive","disabledInteractive",F]},outputs:{change:"change"},exportAs:["matRadioButton"],ngContentSelectors:lP,decls:13,vars:17,consts:[["formField",""],["input",""],["mat-internal-form-field","",3,"labelPosition"],[1,"mdc-radio"],["aria-hidden","true",1,"mat-mdc-radio-touch-target",3,"click"],["type","radio","aria-invalid","false",1,"mdc-radio__native-control",3,"change","id","checked","disabled","required"],["aria-hidden","true",1,"mdc-radio__background"],[1,"mdc-radio__outer-circle"],[1,"mdc-radio__inner-circle"],["mat-ripple","","aria-hidden","true",1,"mat-radio-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mat-ripple-element","mat-radio-persistent-ripple"],[1,"mdc-label",3,"for"]],template:function(i,r){i&1&&(we(),p(0,"div",2,0)(2,"div",3)(3,"div",4),x("click",function(a){return r._onTouchTargetClick(a)}),g(),p(4,"input",5,1),x("change",function(a){return r._onInputInteraction(a)}),g(),p(6,"div",6),ie(7,"div",7)(8,"div",8),g(),p(9,"div",9),ie(10,"div",10),g()(),p(11,"label",11),Z(12),g()()),i&2&&(T("labelPosition",r.labelPosition),v(2),O("mdc-radio--disabled",r.disabled),v(2),T("id",r.inputId)("checked",r.checked)("disabled",r.disabled&&!r.disabledInteractive)("required",r.required),ce("name",r.name)("value",r.value)("aria-label",r.ariaLabel)("aria-labelledby",r.ariaLabelledby)("aria-describedby",r.ariaDescribedby)("aria-disabled",r.disabled&&r.disabledInteractive?"true":null),v(5),T("matRippleTrigger",r._rippleTrigger.nativeElement)("matRippleDisabled",r._isRippleDisabled())("matRippleCentered",!0),v(2),T("for",r.inputId))},dependencies:[Tr,Ba],styles:[`.mat-mdc-radio-button {
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-radio-button .mdc-radio {
  display: inline-block;
  position: relative;
  flex: 0 0 auto;
  box-sizing: content-box;
  width: 20px;
  height: 20px;
  cursor: pointer;
  will-change: opacity, transform, border-color, color;
  padding: calc((var(--mat-radio-state-layer-size, 40px) - 20px) / 2);
}
.mat-mdc-radio-button .mdc-radio:hover > .mdc-radio__native-control:not([disabled]):not(:focus) ~ .mdc-radio__background::before {
  opacity: 0.04;
  transform: scale(1);
}
.mat-mdc-radio-button .mdc-radio:hover > .mdc-radio__native-control:not([disabled]) ~ .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--mat-radio-unselected-hover-icon-color, var(--mat-sys-on-surface));
}
.mat-mdc-radio-button .mdc-radio:hover > .mdc-radio__native-control:enabled:checked + .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--mat-radio-selected-hover-icon-color, var(--mat-sys-primary));
}
.mat-mdc-radio-button .mdc-radio:hover > .mdc-radio__native-control:enabled:checked + .mdc-radio__background > .mdc-radio__inner-circle {
  background-color: var(--mat-radio-selected-hover-icon-color, var(--mat-sys-primary, currentColor));
}
.mat-mdc-radio-button .mdc-radio:active > .mdc-radio__native-control:enabled:not(:checked) + .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--mat-radio-unselected-pressed-icon-color, var(--mat-sys-on-surface));
}
.mat-mdc-radio-button .mdc-radio:active > .mdc-radio__native-control:enabled:checked + .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--mat-radio-selected-pressed-icon-color, var(--mat-sys-primary));
}
.mat-mdc-radio-button .mdc-radio:active > .mdc-radio__native-control:enabled:checked + .mdc-radio__background > .mdc-radio__inner-circle {
  background-color: var(--mat-radio-selected-pressed-icon-color, var(--mat-sys-primary, currentColor));
}
.mat-mdc-radio-button .mdc-radio__background {
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
}
.mat-mdc-radio-button .mdc-radio__background::before {
  position: absolute;
  transform: scale(0, 0);
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  content: "";
  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);
  width: var(--mat-radio-state-layer-size, 40px);
  height: var(--mat-radio-state-layer-size, 40px);
  top: calc(-1 * (var(--mat-radio-state-layer-size, 40px) - 20px) / 2);
  left: calc(-1 * (var(--mat-radio-state-layer-size, 40px) - 20px) / 2);
}
.mat-mdc-radio-button .mdc-radio__outer-circle {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-width: 2px;
  border-style: solid;
  border-radius: 50%;
  transition: border-color 90ms cubic-bezier(0.4, 0, 0.6, 1);
}
.mat-mdc-radio-button .mdc-radio__inner-circle {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  transform: scale(0);
  border-radius: 50%;
  transition: transform 90ms cubic-bezier(0.4, 0, 0.6, 1), background-color 90ms cubic-bezier(0.4, 0, 0.6, 1);
}
@media (forced-colors: active) {
  .mat-mdc-radio-button .mdc-radio__inner-circle {
    background-color: CanvasText !important;
  }
}
.mat-mdc-radio-button .mdc-radio__native-control {
  position: absolute;
  margin: 0;
  padding: 0;
  opacity: 0;
  top: 0;
  right: 0;
  left: 0;
  cursor: inherit;
  z-index: 1;
  width: var(--mat-radio-state-layer-size, 40px);
  height: var(--mat-radio-state-layer-size, 40px);
}
.mat-mdc-radio-button .mdc-radio__native-control:checked + .mdc-radio__background, .mat-mdc-radio-button .mdc-radio__native-control:disabled + .mdc-radio__background {
  transition: opacity 90ms cubic-bezier(0, 0, 0.2, 1), transform 90ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-radio-button .mdc-radio__native-control:checked + .mdc-radio__background > .mdc-radio__outer-circle, .mat-mdc-radio-button .mdc-radio__native-control:disabled + .mdc-radio__background > .mdc-radio__outer-circle {
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-radio-button .mdc-radio__native-control:checked + .mdc-radio__background > .mdc-radio__inner-circle, .mat-mdc-radio-button .mdc-radio__native-control:disabled + .mdc-radio__background > .mdc-radio__inner-circle {
  transition: transform 90ms cubic-bezier(0, 0, 0.2, 1), background-color 90ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-radio-button .mdc-radio__native-control:focus + .mdc-radio__background::before {
  transform: scale(1);
  opacity: 0.12;
  transition: opacity 90ms cubic-bezier(0, 0, 0.2, 1), transform 90ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-radio-button .mdc-radio__native-control:disabled:not(:checked) + .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--mat-radio-disabled-unselected-icon-color, var(--mat-sys-on-surface));
  opacity: var(--mat-radio-disabled-unselected-icon-opacity, 0.38);
}
.mat-mdc-radio-button .mdc-radio__native-control:disabled + .mdc-radio__background {
  cursor: default;
}
.mat-mdc-radio-button .mdc-radio__native-control:disabled + .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--mat-radio-disabled-selected-icon-color, var(--mat-sys-on-surface));
  opacity: var(--mat-radio-disabled-selected-icon-opacity, 0.38);
}
.mat-mdc-radio-button .mdc-radio__native-control:disabled + .mdc-radio__background > .mdc-radio__inner-circle {
  background-color: var(--mat-radio-disabled-selected-icon-color, var(--mat-sys-on-surface, currentColor));
  opacity: var(--mat-radio-disabled-selected-icon-opacity, 0.38);
}
.mat-mdc-radio-button .mdc-radio__native-control:enabled:not(:checked) + .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--mat-radio-unselected-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-radio-button .mdc-radio__native-control:enabled:checked + .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--mat-radio-selected-icon-color, var(--mat-sys-primary));
}
.mat-mdc-radio-button .mdc-radio__native-control:enabled:checked + .mdc-radio__background > .mdc-radio__inner-circle {
  background-color: var(--mat-radio-selected-icon-color, var(--mat-sys-primary, currentColor));
}
.mat-mdc-radio-button .mdc-radio__native-control:enabled:focus:checked + .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--mat-radio-selected-focus-icon-color, var(--mat-sys-primary));
}
.mat-mdc-radio-button .mdc-radio__native-control:enabled:focus:checked + .mdc-radio__background > .mdc-radio__inner-circle {
  background-color: var(--mat-radio-selected-focus-icon-color, var(--mat-sys-primary, currentColor));
}
.mat-mdc-radio-button .mdc-radio__native-control:checked + .mdc-radio__background > .mdc-radio__inner-circle {
  transform: scale(0.5);
  transition: transform 90ms cubic-bezier(0, 0, 0.2, 1), background-color 90ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled {
  pointer-events: auto;
}
.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__native-control:not(:checked) + .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--mat-radio-disabled-unselected-icon-color, var(--mat-sys-on-surface));
  opacity: var(--mat-radio-disabled-unselected-icon-opacity, 0.38);
}
.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled:hover .mdc-radio__native-control:checked + .mdc-radio__background > .mdc-radio__outer-circle,
.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__native-control:checked:focus + .mdc-radio__background > .mdc-radio__outer-circle,
.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__native-control + .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--mat-radio-disabled-selected-icon-color, var(--mat-sys-on-surface));
  opacity: var(--mat-radio-disabled-selected-icon-opacity, 0.38);
}
.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled:hover .mdc-radio__native-control:checked + .mdc-radio__background > .mdc-radio__inner-circle,
.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__native-control:checked:focus + .mdc-radio__background > .mdc-radio__inner-circle,
.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__native-control + .mdc-radio__background > .mdc-radio__inner-circle {
  background-color: var(--mat-radio-disabled-selected-icon-color, var(--mat-sys-on-surface, currentColor));
  opacity: var(--mat-radio-disabled-selected-icon-opacity, 0.38);
}
.mat-mdc-radio-button._mat-animation-noopable .mdc-radio__background::before,
.mat-mdc-radio-button._mat-animation-noopable .mdc-radio__outer-circle,
.mat-mdc-radio-button._mat-animation-noopable .mdc-radio__inner-circle {
  transition: none !important;
}
.mat-mdc-radio-button label {
  cursor: pointer;
}
.mat-mdc-radio-button label:empty {
  display: none;
}
.mat-mdc-radio-button .mdc-radio__background::before {
  background-color: var(--mat-radio-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-radio-button.mat-mdc-radio-checked .mat-ripple-element,
.mat-mdc-radio-button.mat-mdc-radio-checked .mdc-radio__background::before {
  background-color: var(--mat-radio-checked-ripple-color, var(--mat-sys-primary));
}
.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mat-ripple-element,
.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__background::before {
  background-color: var(--mat-radio-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-radio-button .mat-internal-form-field {
  color: var(--mat-radio-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-radio-label-text-font, var(--mat-sys-body-medium-font));
  line-height: var(--mat-radio-label-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-radio-label-text-size, var(--mat-sys-body-medium-size));
  letter-spacing: var(--mat-radio-label-text-tracking, var(--mat-sys-body-medium-tracking));
  font-weight: var(--mat-radio-label-text-weight, var(--mat-sys-body-medium-weight));
}
.mat-mdc-radio-button .mdc-radio--disabled + label {
  color: var(--mat-radio-disabled-label-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-radio-button .mat-radio-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
}
.mat-mdc-radio-button .mat-radio-ripple > .mat-ripple-element {
  opacity: 0.14;
}
.mat-mdc-radio-button .mat-radio-ripple::before {
  border-radius: 50%;
}
.mat-mdc-radio-button .mdc-radio > .mdc-radio__native-control:focus:enabled:not(:checked) ~ .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--mat-radio-unselected-focus-icon-color, var(--mat-sys-on-surface));
}
.mat-mdc-radio-button.cdk-focused .mat-focus-indicator::before {
  content: "";
}

.mat-mdc-radio-disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-radio-disabled.mat-mdc-radio-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-radio-touch-target {
  position: absolute;
  top: 50%;
  left: 50%;
  height: var(--mat-radio-touch-target-size, 48px);
  width: var(--mat-radio-touch-target-size, 48px);
  transform: translate(-50%, -50%);
  display: var(--mat-radio-touch-target-display, block);
}
[dir=rtl] .mat-mdc-radio-touch-target {
  left: auto;
  right: 50%;
  transform: translate(50%, -50%);
}
`],encapsulation:2,changeDetection:0})}return t})(),CS=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=$({type:t});static \u0275inj=H({imports:[Va,jf,be]})}return t})();var fP=["switch"],hP=["*"];function mP(t,n){t&1&&(p(0,"span",11),dn(),p(1,"svg",13),ie(2,"path",14),g(),p(3,"svg",15),ie(4,"path",16),g()())}var pP=new b("mat-slide-toggle-default-options",{providedIn:"root",factory:()=>({disableToggleValue:!1,hideIcon:!1,disabledInteractive:!1})}),Hf=class{source;checked;constructor(n,e){this.source=n,this.checked=e}},gv=(()=>{class t{_elementRef=u(P);_focusMonitor=u(xi);_changeDetectorRef=u(Fe);defaults=u(pP);_onChange=e=>{};_onTouched=()=>{};_validatorOnChange=()=>{};_uniqueId;_checked=!1;_createChangeEvent(e){return new Hf(this,e)}_labelId;get buttonId(){return`${this.id||this._uniqueId}-button`}_switchElement;focus(){this._switchElement.nativeElement.focus()}_noopAnimations=Xe();_focused=!1;name=null;id;labelPosition="after";ariaLabel=null;ariaLabelledby=null;ariaDescribedby;required=!1;color;disabled=!1;disableRipple=!1;tabIndex=0;get checked(){return this._checked}set checked(e){this._checked=e,this._changeDetectorRef.markForCheck()}hideIcon;disabledInteractive;change=new S;toggleChange=new S;get inputId(){return`${this.id||this._uniqueId}-input`}constructor(){u(je).load(Ln);let e=u(new en("tabindex"),{optional:!0}),i=this.defaults;this.tabIndex=e==null?0:parseInt(e)||0,this.color=i.color||"accent",this.id=this._uniqueId=u(qe).getId("mat-mdc-slide-toggle-"),this.hideIcon=i.hideIcon??!1,this.disabledInteractive=i.disabledInteractive??!1,this._labelId=this._uniqueId+"-label"}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(e=>{e==="keyboard"||e==="program"?(this._focused=!0,this._changeDetectorRef.markForCheck()):e||Promise.resolve().then(()=>{this._focused=!1,this._onTouched(),this._changeDetectorRef.markForCheck()})})}ngOnChanges(e){e.required&&this._validatorOnChange()}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}writeValue(e){this.checked=!!e}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}validate(e){return this.required&&e.value!==!0?{required:!0}:null}registerOnValidatorChange(e){this._validatorOnChange=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck()}toggle(){this.checked=!this.checked,this._onChange(this.checked)}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked))}_handleClick(){this.disabled||(this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new Hf(this,this.checked))))}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["mat-slide-toggle"]],viewQuery:function(i,r){if(i&1&&ve(fP,5),i&2){let o;B(o=j())&&(r._switchElement=o.first)}},hostAttrs:[1,"mat-mdc-slide-toggle"],hostVars:13,hostBindings:function(i,r){i&2&&(gt("id",r.id),ce("tabindex",null)("aria-label",null)("name",null)("aria-labelledby",null),_t(r.color?"mat-"+r.color:""),O("mat-mdc-slide-toggle-focused",r._focused)("mat-mdc-slide-toggle-checked",r.checked)("_mat-animation-noopable",r._noopAnimations))},inputs:{name:"name",id:"id",labelPosition:"labelPosition",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],required:[2,"required","required",F],color:"color",disabled:[2,"disabled","disabled",F],disableRipple:[2,"disableRipple","disableRipple",F],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:kn(e)],checked:[2,"checked","checked",F],hideIcon:[2,"hideIcon","hideIcon",F],disabledInteractive:[2,"disabledInteractive","disabledInteractive",F]},outputs:{change:"change",toggleChange:"toggleChange"},exportAs:["matSlideToggle"],features:[xe([{provide:On,useExisting:at(()=>t),multi:!0},{provide:ki,useExisting:t,multi:!0}]),Le],ngContentSelectors:hP,decls:14,vars:27,consts:[["switch",""],["mat-internal-form-field","",3,"labelPosition"],["role","switch","type","button",1,"mdc-switch",3,"click","tabIndex","disabled"],[1,"mat-mdc-slide-toggle-touch-target"],[1,"mdc-switch__track"],[1,"mdc-switch__handle-track"],[1,"mdc-switch__handle"],[1,"mdc-switch__shadow"],[1,"mdc-elevation-overlay"],[1,"mdc-switch__ripple"],["mat-ripple","",1,"mat-mdc-slide-toggle-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-switch__icons"],[1,"mdc-label",3,"click","for"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--on"],["d","M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--off"],["d","M20 13H4v-2h16v2z"]],template:function(i,r){if(i&1&&(we(),p(0,"div",1)(1,"button",2,0),x("click",function(){return r._handleClick()}),ie(3,"div",3)(4,"span",4),p(5,"span",5)(6,"span",6)(7,"span",7),ie(8,"span",8),g(),p(9,"span",9),ie(10,"span",10),g(),ge(11,mP,5,0,"span",11),g()()(),p(12,"label",12),x("click",function(a){return a.stopPropagation()}),Z(13),g()()),i&2){let o=Y(2);T("labelPosition",r.labelPosition),v(),O("mdc-switch--selected",r.checked)("mdc-switch--unselected",!r.checked)("mdc-switch--checked",r.checked)("mdc-switch--disabled",r.disabled)("mat-mdc-slide-toggle-disabled-interactive",r.disabledInteractive),T("tabIndex",r.disabled&&!r.disabledInteractive?-1:r.tabIndex)("disabled",r.disabled&&!r.disabledInteractive),ce("id",r.buttonId)("name",r.name)("aria-label",r.ariaLabel)("aria-labelledby",r._getAriaLabelledBy())("aria-describedby",r.ariaDescribedby)("aria-required",r.required||null)("aria-checked",r.checked)("aria-disabled",r.disabled&&r.disabledInteractive?"true":null),v(9),T("matRippleTrigger",o)("matRippleDisabled",r.disableRipple||r.disabled)("matRippleCentered",!0),v(),_e(r.hideIcon?-1:11),v(),T("for",r.buttonId),ce("id",r._labelId)}},dependencies:[Tr,Ba],styles:[`.mdc-switch {
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  margin: 0;
  outline: none;
  overflow: visible;
  padding: 0;
  position: relative;
  width: var(--mat-slide-toggle-track-width, 52px);
}
.mdc-switch.mdc-switch--disabled {
  cursor: default;
  pointer-events: none;
}
.mdc-switch.mat-mdc-slide-toggle-disabled-interactive {
  pointer-events: auto;
}

.mdc-switch__track {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: var(--mat-slide-toggle-track-height, 32px);
  border-radius: var(--mat-slide-toggle-track-shape, var(--mat-sys-corner-full));
}
.mdc-switch--disabled.mdc-switch .mdc-switch__track {
  opacity: var(--mat-slide-toggle-disabled-track-opacity, 0.12);
}
.mdc-switch__track::before, .mdc-switch__track::after {
  border: 1px solid transparent;
  border-radius: inherit;
  box-sizing: border-box;
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  width: 100%;
  border-width: var(--mat-slide-toggle-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-track-outline-color, var(--mat-sys-outline));
}
.mdc-switch--selected .mdc-switch__track::before, .mdc-switch--selected .mdc-switch__track::after {
  border-width: var(--mat-slide-toggle-selected-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-selected-track-outline-color, transparent);
}
.mdc-switch--disabled .mdc-switch__track::before, .mdc-switch--disabled .mdc-switch__track::after {
  border-width: var(--mat-slide-toggle-disabled-unselected-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-disabled-unselected-track-outline-color, var(--mat-sys-on-surface));
}
@media (forced-colors: active) {
  .mdc-switch__track {
    border-color: currentColor;
  }
}
.mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: translateX(0);
  background: var(--mat-slide-toggle-unselected-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  transform: translateX(100%);
}
[dir=rtl] .mdc-switch--selected .mdc-switch--selected .mdc-switch__track::before {
  transform: translateX(-100%);
}
.mdc-switch--selected .mdc-switch__track::before {
  opacity: var(--mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::before {
  opacity: var(--mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-hover-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-focus-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch:enabled:active .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-pressed-track-color, var(--mat-sys-surface-variant));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::before, .mdc-switch.mdc-switch--disabled .mdc-switch__track::before {
  background: var(--mat-slide-toggle-disabled-unselected-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch__track::after {
  transform: translateX(-100%);
  background: var(--mat-slide-toggle-selected-track-color, var(--mat-sys-primary));
}
[dir=rtl] .mdc-switch__track::after {
  transform: translateX(100%);
}
.mdc-switch--selected .mdc-switch__track::after {
  transform: translateX(0);
}
.mdc-switch--selected .mdc-switch__track::after {
  opacity: var(--mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::after {
  opacity: var(--mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-hover-track-color, var(--mat-sys-primary));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-focus-track-color, var(--mat-sys-primary));
}
.mdc-switch:enabled:active .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-pressed-track-color, var(--mat-sys-primary));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::after, .mdc-switch.mdc-switch--disabled .mdc-switch__track::after {
  background: var(--mat-slide-toggle-disabled-selected-track-color, var(--mat-sys-on-surface));
}

.mdc-switch__handle-track {
  height: 100%;
  pointer-events: none;
  position: absolute;
  top: 0;
  transition: transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  left: 0;
  right: auto;
  transform: translateX(0);
  width: calc(100% - var(--mat-slide-toggle-handle-width));
}
[dir=rtl] .mdc-switch__handle-track {
  left: auto;
  right: 0;
}
.mdc-switch--selected .mdc-switch__handle-track {
  transform: translateX(100%);
}
[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track {
  transform: translateX(-100%);
}

.mdc-switch__handle {
  display: flex;
  pointer-events: auto;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: auto;
  transition: width 75ms cubic-bezier(0.4, 0, 0.2, 1), height 75ms cubic-bezier(0.4, 0, 0.2, 1), margin 75ms cubic-bezier(0.4, 0, 0.2, 1);
  width: var(--mat-slide-toggle-handle-width);
  height: var(--mat-slide-toggle-handle-height);
  border-radius: var(--mat-slide-toggle-handle-shape, var(--mat-sys-corner-full));
}
[dir=rtl] .mdc-switch__handle {
  left: auto;
  right: 0;
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle {
  width: var(--mat-slide-toggle-unselected-handle-size, 16px);
  height: var(--mat-slide-toggle-unselected-handle-size, 16px);
  margin: var(--mat-slide-toggle-unselected-handle-horizontal-margin, 0 8px);
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--mat-slide-toggle-unselected-with-icon-handle-horizontal-margin, 0 4px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle {
  width: var(--mat-slide-toggle-selected-handle-size, 24px);
  height: var(--mat-slide-toggle-selected-handle-size, 24px);
  margin: var(--mat-slide-toggle-selected-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--mat-slide-toggle-selected-with-icon-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch__handle:has(.mdc-switch__icons) {
  width: var(--mat-slide-toggle-with-icon-handle-size, 24px);
  height: var(--mat-slide-toggle-with-icon-handle-size, 24px);
}
.mat-mdc-slide-toggle .mdc-switch:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  width: var(--mat-slide-toggle-pressed-handle-size, 28px);
  height: var(--mat-slide-toggle-pressed-handle-size, 28px);
}
.mat-mdc-slide-toggle .mdc-switch--selected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--mat-slide-toggle-selected-pressed-handle-horizontal-margin, 0 22px);
}
.mat-mdc-slide-toggle .mdc-switch--unselected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--mat-slide-toggle-unselected-pressed-handle-horizontal-margin, 0 2px);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__handle::after {
  opacity: var(--mat-slide-toggle-disabled-selected-handle-opacity, 1);
}
.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__handle::after {
  opacity: var(--mat-slide-toggle-disabled-unselected-handle-opacity, 0.38);
}
.mdc-switch__handle::before, .mdc-switch__handle::after {
  border: 1px solid transparent;
  border-radius: inherit;
  box-sizing: border-box;
  content: "";
  width: 100%;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transition: background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1), border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}
@media (forced-colors: active) {
  .mdc-switch__handle::before, .mdc-switch__handle::after {
    border-color: currentColor;
  }
}
.mdc-switch--selected:enabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-handle-color, var(--mat-sys-on-primary));
}
.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-hover-handle-color, var(--mat-sys-primary-container));
}
.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-focus-handle-color, var(--mat-sys-primary-container));
}
.mdc-switch--selected:enabled:active .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-pressed-handle-color, var(--mat-sys-primary-container));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:hover:not(:focus):not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:focus:not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:active .mdc-switch__handle::after, .mdc-switch--selected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-disabled-selected-handle-color, var(--mat-sys-surface));
}
.mdc-switch--unselected:enabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-handle-color, var(--mat-sys-outline));
}
.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-hover-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-focus-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected:enabled:active .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-pressed-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-disabled-unselected-handle-color, var(--mat-sys-on-surface));
}
.mdc-switch__handle::before {
  background: var(--mat-slide-toggle-handle-surface-color);
}

.mdc-switch__shadow {
  border-radius: inherit;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
.mdc-switch:enabled .mdc-switch__shadow {
  box-shadow: var(--mat-slide-toggle-handle-elevation-shadow);
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__shadow, .mdc-switch.mdc-switch--disabled .mdc-switch__shadow {
  box-shadow: var(--mat-slide-toggle-disabled-handle-elevation-shadow);
}

.mdc-switch__ripple {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  width: var(--mat-slide-toggle-state-layer-size, 40px);
  height: var(--mat-slide-toggle-state-layer-size, 40px);
}
.mdc-switch__ripple::after {
  content: "";
  opacity: 0;
}
.mdc-switch--disabled .mdc-switch__ripple::after {
  display: none;
}
.mat-mdc-slide-toggle-disabled-interactive .mdc-switch__ripple::after {
  display: block;
}
.mdc-switch:hover .mdc-switch__ripple::after {
  transition: 75ms opacity cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:focus .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:active .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:hover:not(:focus) .mdc-switch__ripple::after, .mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-focus-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-pressed-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  transition: opacity 75ms linear;
}
.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-hover-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-focus-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mdc-switch--selected:enabled:active .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-pressed-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  transition: opacity 75ms linear;
}

.mdc-switch__icons {
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 1;
  transform: translateZ(0);
}
.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__icons {
  opacity: var(--mat-slide-toggle-disabled-unselected-icon-opacity, 0.38);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__icons {
  opacity: var(--mat-slide-toggle-disabled-selected-icon-opacity, 0.38);
}

.mdc-switch__icon {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  transition: opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1);
}
.mdc-switch--unselected .mdc-switch__icon {
  width: var(--mat-slide-toggle-unselected-icon-size, 16px);
  height: var(--mat-slide-toggle-unselected-icon-size, 16px);
  fill: var(--mat-slide-toggle-unselected-icon-color, var(--mat-sys-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--mat-slide-toggle-disabled-unselected-icon-color, var(--mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__icon {
  width: var(--mat-slide-toggle-selected-icon-size, 16px);
  height: var(--mat-slide-toggle-selected-icon-size, 16px);
  fill: var(--mat-slide-toggle-selected-icon-color, var(--mat-sys-on-primary-container));
}
.mdc-switch--selected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--mat-slide-toggle-disabled-selected-icon-color, var(--mat-sys-on-surface));
}

.mdc-switch--selected .mdc-switch__icon--on,
.mdc-switch--unselected .mdc-switch__icon--off {
  opacity: 1;
  transition: opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1);
}

.mat-mdc-slide-toggle {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  -webkit-tap-highlight-color: transparent;
  outline: 0;
}
.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,
.mat-mdc-slide-toggle .mdc-switch__ripple::after {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),
.mat-mdc-slide-toggle .mdc-switch__ripple::after:not(:empty) {
  transform: translateZ(0);
}
.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mat-focus-indicator::before {
  content: "";
}
.mat-mdc-slide-toggle .mat-internal-form-field {
  color: var(--mat-slide-toggle-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-slide-toggle-label-text-font, var(--mat-sys-body-medium-font));
  line-height: var(--mat-slide-toggle-label-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-slide-toggle-label-text-size, var(--mat-sys-body-medium-size));
  letter-spacing: var(--mat-slide-toggle-label-text-tracking, var(--mat-sys-body-medium-tracking));
  font-weight: var(--mat-slide-toggle-label-text-weight, var(--mat-sys-body-medium-weight));
}
.mat-mdc-slide-toggle .mat-ripple-element {
  opacity: 0.12;
}
.mat-mdc-slide-toggle .mat-focus-indicator::before {
  border-radius: 50%;
}
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle-track,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__icon,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::before,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::after,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::before,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::after {
  transition: none;
}
.mat-mdc-slide-toggle .mdc-switch:enabled + .mdc-label {
  cursor: pointer;
}
.mat-mdc-slide-toggle .mdc-switch--disabled + label {
  color: var(--mat-slide-toggle-disabled-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-slide-toggle label:empty {
  display: none;
}

.mat-mdc-slide-toggle-touch-target {
  position: absolute;
  top: 50%;
  left: 50%;
  height: var(--mat-slide-toggle-touch-target-size, 48px);
  width: 100%;
  transform: translate(-50%, -50%);
  display: var(--mat-slide-toggle-touch-target-display, block);
}
[dir=rtl] .mat-mdc-slide-toggle-touch-target {
  left: auto;
  right: 50%;
  transform: translate(50%, -50%);
}
`],encapsulation:2,changeDetection:0})}return t})(),wS=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=$({type:t});static \u0275inj=H({imports:[gv,be]})}return t})();var _P=["a"],vP=["b"];function yP(t,n){if(t&1){let e=ke();p(0,"button",8),x("click",function(){L(e);let r=X();return V(r.getActivePopover().toggle())}),y(1," Anchor "),g()}if(t&2){let e=X();T("satPopoverAnchor",e.getActivePopover())}}var zf=(()=>{class t{aPopover;bPopover;activePopover="a";showAnchor=!1;getActivePopover(){return this.activePopover==="a"?this.aPopover:this.bPopover}ngAfterViewInit(){setTimeout(()=>{this.showAnchor=!0})}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["demo-anchor-reuse"]],viewQuery:function(i,r){if(i&1&&ve(_P,5)(vP,5),i&2){let o;B(o=j())&&(r.aPopover=o.first),B(o=j())&&(r.bPopover=o.first)}},decls:23,vars:3,consts:[["a",""],["b",""],[3,"ngModelChange","ngModel"],["value","a"],["value","b"],["mat-button","",3,"satPopoverAnchor"],["xAlign","after","hasBackdrop",""],[1,"wrapper"],["mat-button","",3,"click","satPopoverAnchor"]],template:function(i,r){if(i&1){let o=ke();p(0,"mat-card")(1,"mat-card-title"),y(2,"Anchor Reuse"),g(),p(3,"mat-card-content"),y(4," Active Popover: "),p(5,"mat-radio-group",2),Be("ngModelChange",function(s){return L(o),ze(r.activePopover,s)||(r.activePopover=s),V(s)}),p(6,"mat-radio-button",3),y(7,"A"),g(),p(8,"mat-radio-button",4),y(9,"B"),g()(),ie(10,"br"),p(11,"mat-slide-toggle",2),Be("ngModelChange",function(s){return L(o),ze(r.showAnchor,s)||(r.showAnchor=s),V(s)}),y(12,"Show Anchor"),g(),ie(13,"br"),ge(14,yP,2,1,"button",5),p(15,"sat-popover",6,0)(17,"div",7),y(18,"A"),g()(),p(19,"sat-popover",6,1)(21,"div",7),y(22,"B"),g()()()()}i&2&&(v(5),Ve("ngModel",r.activePopover),v(6),Ve("ngModel",r.showAnchor),v(3),_e(r.showAnchor?14:-1))},dependencies:[Vt,Fn,gn,Bt,_n,It,xt,Mt,St,CS,pv,jf,wS,gv,ft,Te,Ze],styles:[".wrapper[_ngcontent-%COMP%]{background:#000;color:#fff;padding:8px;font-size:16px}"]})}return t})();var bP=["input"],DP=["label"],CP=["*"],_v={color:"accent",clickAction:"check-indeterminate",disabledInteractive:!1},wP=new b("mat-checkbox-default-options",{providedIn:"root",factory:()=>_v}),jt=(function(t){return t[t.Init=0]="Init",t[t.Checked=1]="Checked",t[t.Unchecked=2]="Unchecked",t[t.Indeterminate=3]="Indeterminate",t})(jt||{}),vv=class{source;checked},Po=(()=>{class t{_elementRef=u(P);_changeDetectorRef=u(Fe);_ngZone=u(A);_animationsDisabled=Xe();_options=u(wP,{optional:!0});focus(){this._inputElement.nativeElement.focus()}_createChangeEvent(e){let i=new vv;return i.source=this,i.checked=e,i}_getAnimationTargetElement(){return this._inputElement?.nativeElement}_animationClasses={uncheckedToChecked:"mdc-checkbox--anim-unchecked-checked",uncheckedToIndeterminate:"mdc-checkbox--anim-unchecked-indeterminate",checkedToUnchecked:"mdc-checkbox--anim-checked-unchecked",checkedToIndeterminate:"mdc-checkbox--anim-checked-indeterminate",indeterminateToChecked:"mdc-checkbox--anim-indeterminate-checked",indeterminateToUnchecked:"mdc-checkbox--anim-indeterminate-unchecked"};ariaLabel="";ariaLabelledby=null;ariaDescribedby;ariaExpanded;ariaControls;ariaOwns;_uniqueId;id;get inputId(){return`${this.id||this._uniqueId}-input`}required=!1;labelPosition="after";name=null;change=new S;indeterminateChange=new S;value;disableRipple=!1;_inputElement;_labelElement;tabIndex;color;disabledInteractive;_onTouched=()=>{};_currentAnimationClass="";_currentCheckState=jt.Init;_controlValueAccessorChangeFn=()=>{};_validatorChangeFn=()=>{};constructor(){u(je).load(Ln);let e=u(new en("tabindex"),{optional:!0});this._options=this._options||_v,this.color=this._options.color||_v.color,this.tabIndex=e==null?0:parseInt(e)||0,this.id=this._uniqueId=u(qe).getId("mat-mdc-checkbox-"),this.disabledInteractive=this._options?.disabledInteractive??!1}ngOnChanges(e){e.required&&this._validatorChangeFn()}ngAfterViewInit(){this._syncIndeterminate(this.indeterminate)}get checked(){return this._checked}set checked(e){e!=this.checked&&(this._checked=e,this._changeDetectorRef.markForCheck())}_checked=!1;get disabled(){return this._disabled}set disabled(e){e!==this.disabled&&(this._disabled=e,this._changeDetectorRef.markForCheck())}_disabled=!1;get indeterminate(){return this._indeterminate()}set indeterminate(e){let i=e!=this._indeterminate();this._indeterminate.set(e),i&&(e?this._transitionCheckState(jt.Indeterminate):this._transitionCheckState(this.checked?jt.Checked:jt.Unchecked),this.indeterminateChange.emit(e)),this._syncIndeterminate(e)}_indeterminate=re(!1);_isRippleDisabled(){return this.disableRipple||this.disabled}_onLabelTextChange(){this._changeDetectorRef.detectChanges()}writeValue(e){this.checked=!!e}registerOnChange(e){this._controlValueAccessorChangeFn=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}validate(e){return this.required&&e.value!==!0?{required:!0}:null}registerOnValidatorChange(e){this._validatorChangeFn=e}_transitionCheckState(e){let i=this._currentCheckState,r=this._getAnimationTargetElement();if(!(i===e||!r)&&(this._currentAnimationClass&&r.classList.remove(this._currentAnimationClass),this._currentAnimationClass=this._getAnimationClassForCheckStateTransition(i,e),this._currentCheckState=e,this._currentAnimationClass.length>0)){r.classList.add(this._currentAnimationClass);let o=this._currentAnimationClass;this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{r.classList.remove(o)},1e3)})}}_emitChangeEvent(){this._controlValueAccessorChangeFn(this.checked),this.change.emit(this._createChangeEvent(this.checked)),this._inputElement&&(this._inputElement.nativeElement.checked=this.checked)}toggle(){this.checked=!this.checked,this._controlValueAccessorChangeFn(this.checked)}_handleInputClick(){let e=this._options?.clickAction;!this.disabled&&e!=="noop"?(this.indeterminate&&e!=="check"&&Promise.resolve().then(()=>{this._indeterminate.set(!1),this.indeterminateChange.emit(!1)}),this._checked=!this._checked,this._transitionCheckState(this._checked?jt.Checked:jt.Unchecked),this._emitChangeEvent()):(this.disabled&&this.disabledInteractive||!this.disabled&&e==="noop")&&(this._inputElement.nativeElement.checked=this.checked,this._inputElement.nativeElement.indeterminate=this.indeterminate)}_onInteractionEvent(e){e.stopPropagation()}_onBlur(){Promise.resolve().then(()=>{this._onTouched(),this._changeDetectorRef.markForCheck()})}_getAnimationClassForCheckStateTransition(e,i){if(this._animationsDisabled)return"";switch(e){case jt.Init:if(i===jt.Checked)return this._animationClasses.uncheckedToChecked;if(i==jt.Indeterminate)return this._checked?this._animationClasses.checkedToIndeterminate:this._animationClasses.uncheckedToIndeterminate;break;case jt.Unchecked:return i===jt.Checked?this._animationClasses.uncheckedToChecked:this._animationClasses.uncheckedToIndeterminate;case jt.Checked:return i===jt.Unchecked?this._animationClasses.checkedToUnchecked:this._animationClasses.checkedToIndeterminate;case jt.Indeterminate:return i===jt.Checked?this._animationClasses.indeterminateToChecked:this._animationClasses.indeterminateToUnchecked}return""}_syncIndeterminate(e){let i=this._inputElement;i&&(i.nativeElement.indeterminate=e)}_onInputClick(){this._handleInputClick()}_onTouchTargetClick(){this._handleInputClick(),this.disabled||this._inputElement.nativeElement.focus()}_preventBubblingFromLabel(e){e.target&&this._labelElement.nativeElement.contains(e.target)&&e.stopPropagation()}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["mat-checkbox"]],viewQuery:function(i,r){if(i&1&&ve(bP,5)(DP,5),i&2){let o;B(o=j())&&(r._inputElement=o.first),B(o=j())&&(r._labelElement=o.first)}},hostAttrs:[1,"mat-mdc-checkbox"],hostVars:16,hostBindings:function(i,r){i&2&&(gt("id",r.id),ce("tabindex",null)("aria-label",null)("aria-labelledby",null),_t(r.color?"mat-"+r.color:"mat-accent"),O("_mat-animation-noopable",r._animationsDisabled)("mdc-checkbox--disabled",r.disabled)("mat-mdc-checkbox-disabled",r.disabled)("mat-mdc-checkbox-checked",r.checked)("mat-mdc-checkbox-disabled-interactive",r.disabledInteractive))},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],ariaExpanded:[2,"aria-expanded","ariaExpanded",F],ariaControls:[0,"aria-controls","ariaControls"],ariaOwns:[0,"aria-owns","ariaOwns"],id:"id",required:[2,"required","required",F],labelPosition:"labelPosition",name:"name",value:"value",disableRipple:[2,"disableRipple","disableRipple",F],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?void 0:kn(e)],color:"color",disabledInteractive:[2,"disabledInteractive","disabledInteractive",F],checked:[2,"checked","checked",F],disabled:[2,"disabled","disabled",F],indeterminate:[2,"indeterminate","indeterminate",F]},outputs:{change:"change",indeterminateChange:"indeterminateChange"},exportAs:["matCheckbox"],features:[xe([{provide:On,useExisting:at(()=>t),multi:!0},{provide:ki,useExisting:t,multi:!0}]),Le],ngContentSelectors:CP,decls:15,vars:23,consts:[["checkbox",""],["input",""],["label",""],["mat-internal-form-field","",3,"click","labelPosition"],[1,"mdc-checkbox"],["aria-hidden","true",1,"mat-mdc-checkbox-touch-target",3,"click"],["type","checkbox",1,"mdc-checkbox__native-control",3,"blur","click","change","checked","indeterminate","disabled","id","required","tabIndex"],["aria-hidden","true",1,"mdc-checkbox__ripple"],["aria-hidden","true",1,"mdc-checkbox__background"],["focusable","false","viewBox","0 0 24 24",1,"mdc-checkbox__checkmark"],["fill","none","d","M1.73,12.91 8.1,19.28 22.79,4.59",1,"mdc-checkbox__checkmark-path"],[1,"mdc-checkbox__mixedmark"],["mat-ripple","","aria-hidden","true",1,"mat-mdc-checkbox-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-label",3,"for"]],template:function(i,r){if(i&1&&(we(),p(0,"div",3),x("click",function(a){return r._preventBubblingFromLabel(a)}),p(1,"div",4,0)(3,"div",5),x("click",function(){return r._onTouchTargetClick()}),g(),p(4,"input",6,1),x("blur",function(){return r._onBlur()})("click",function(){return r._onInputClick()})("change",function(a){return r._onInteractionEvent(a)}),g(),ie(6,"div",7),p(7,"div",8),dn(),p(8,"svg",9),ie(9,"path",10),g(),io(),ie(10,"div",11),g(),ie(11,"div",12),g(),p(12,"label",13,2),Z(14),g()()),i&2){let o=Y(2);T("labelPosition",r.labelPosition),v(4),O("mdc-checkbox--selected",r.checked),T("checked",r.checked)("indeterminate",r.indeterminate)("disabled",r.disabled&&!r.disabledInteractive)("id",r.inputId)("required",r.required)("tabIndex",r.disabled&&!r.disabledInteractive?-1:r.tabIndex),ce("aria-label",r.ariaLabel||null)("aria-labelledby",r.ariaLabelledby)("aria-describedby",r.ariaDescribedby)("aria-checked",r.indeterminate?"mixed":null)("aria-controls",r.ariaControls)("aria-disabled",r.disabled&&r.disabledInteractive?!0:null)("aria-expanded",r.ariaExpanded)("aria-owns",r.ariaOwns)("name",r.name)("value",r.value),v(7),T("matRippleTrigger",o)("matRippleDisabled",r.disableRipple||r.disabled)("matRippleCentered",!0),v(),T("for",r.inputId)}},dependencies:[Tr,Ba],styles:[`.mdc-checkbox {
  display: inline-block;
  position: relative;
  flex: 0 0 18px;
  box-sizing: content-box;
  width: 18px;
  height: 18px;
  line-height: 0;
  white-space: nowrap;
  cursor: pointer;
  vertical-align: bottom;
  padding: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);
  margin: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
}
.mdc-checkbox:hover > .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-unselected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox:hover > .mat-mdc-checkbox-ripple > .mat-ripple-element {
  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control:focus + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-unselected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
  background-color: var(--mat-checkbox-unselected-focus-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control:focus ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-unselected-focus-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox:active > .mdc-checkbox__native-control + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-unselected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  background-color: var(--mat-checkbox-unselected-pressed-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:active > .mdc-checkbox__native-control ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-unselected-pressed-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:hover > .mdc-checkbox__native-control:checked + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
  background-color: var(--mat-checkbox-selected-hover-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:hover > .mdc-checkbox__native-control:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-selected-hover-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox .mdc-checkbox__native-control:focus:checked + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
  background-color: var(--mat-checkbox-selected-focus-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox .mdc-checkbox__native-control:focus:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-selected-focus-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:active > .mdc-checkbox__native-control:checked + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-selected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  background-color: var(--mat-checkbox-selected-pressed-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox:active > .mdc-checkbox__native-control:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-selected-pressed-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control ~ .mat-mdc-checkbox-ripple .mat-ripple-element,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control + .mdc-checkbox__ripple {
  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control {
  position: absolute;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;
  z-index: 1;
  width: var(--mat-checkbox-state-layer-size, 40px);
  height: var(--mat-checkbox-state-layer-size, 40px);
  top: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
  right: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
  left: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
}

.mdc-checkbox--disabled {
  cursor: default;
  pointer-events: none;
}

.mdc-checkbox__background {
  display: inline-flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  border: 2px solid currentColor;
  border-radius: 2px;
  background-color: transparent;
  pointer-events: none;
  will-change: background-color, border-color;
  transition: background-color 90ms cubic-bezier(0.4, 0, 0.6, 1), border-color 90ms cubic-bezier(0.4, 0, 0.6, 1);
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
  border-color: var(--mat-checkbox-unselected-icon-color, var(--mat-sys-on-surface-variant));
  top: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);
  left: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);
}

.mdc-checkbox__native-control:enabled:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:enabled:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-selected-icon-color, var(--mat-sys-primary));
  background-color: var(--mat-checkbox-selected-icon-color, var(--mat-sys-primary));
}

.mdc-checkbox--disabled .mdc-checkbox__background {
  border-color: var(--mat-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__background {
    border-color: GrayText;
  }
}

.mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background {
  background-color: var(--mat-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: transparent;
}
@media (forced-colors: active) {
  .mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background,
  .mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background {
    border-color: GrayText;
  }
}

.mdc-checkbox:hover > .mdc-checkbox__native-control:not(:checked) ~ .mdc-checkbox__background,
.mdc-checkbox:hover > .mdc-checkbox__native-control:not(:indeterminate) ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-unselected-hover-icon-color, var(--mat-sys-on-surface));
  background-color: transparent;
}

.mdc-checkbox:hover > .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox:hover > .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-selected-hover-icon-color, var(--mat-sys-primary));
  background-color: var(--mat-checkbox-selected-hover-icon-color, var(--mat-sys-primary));
}

.mdc-checkbox__native-control:focus:focus:not(:checked) ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:focus:focus:not(:indeterminate) ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-unselected-focus-icon-color, var(--mat-sys-on-surface));
}

.mdc-checkbox__native-control:focus:focus:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:focus:focus:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-selected-focus-icon-color, var(--mat-sys-primary));
  background-color: var(--mat-checkbox-selected-focus-icon-color, var(--mat-sys-primary));
}

.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover > .mdc-checkbox__native-control ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background {
  border-color: var(--mat-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover > .mdc-checkbox__native-control ~ .mdc-checkbox__background,
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus ~ .mdc-checkbox__background,
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background {
    border-color: GrayText;
  }
}
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  background-color: var(--mat-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: transparent;
}

.mdc-checkbox__checkmark {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  transition: opacity 180ms cubic-bezier(0.4, 0, 0.6, 1);
  color: var(--mat-checkbox-selected-checkmark-color, var(--mat-sys-on-primary));
}
@media (forced-colors: active) {
  .mdc-checkbox__checkmark {
    color: CanvasText;
  }
}

.mdc-checkbox--disabled .mdc-checkbox__checkmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark {
  color: var(--mat-checkbox-disabled-selected-checkmark-color, var(--mat-sys-surface));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__checkmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark {
    color: GrayText;
  }
}

.mdc-checkbox__checkmark-path {
  transition: stroke-dashoffset 180ms cubic-bezier(0.4, 0, 0.6, 1);
  stroke: currentColor;
  stroke-width: 3.12px;
  stroke-dashoffset: 29.7833385;
  stroke-dasharray: 29.7833385;
}

.mdc-checkbox__mixedmark {
  width: 100%;
  height: 0;
  transform: scaleX(0) rotate(0deg);
  border-width: 1px;
  border-style: solid;
  opacity: 0;
  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);
  border-color: var(--mat-checkbox-selected-checkmark-color, var(--mat-sys-on-primary));
}
@media (forced-colors: active) {
  .mdc-checkbox__mixedmark {
    margin: 0 1px;
  }
}

.mdc-checkbox--disabled .mdc-checkbox__mixedmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark {
  border-color: var(--mat-checkbox-disabled-selected-checkmark-color, var(--mat-sys-surface));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__mixedmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark {
    border-color: GrayText;
  }
}

.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,
.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,
.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,
.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background {
  animation-duration: 180ms;
  animation-timing-function: linear;
}

.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path {
  animation: mdc-checkbox-unchecked-checked-checkmark-path 180ms linear;
  transition: none;
}

.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path {
  animation: mdc-checkbox-checked-unchecked-checkmark-path 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark {
  animation: mdc-checkbox-checked-indeterminate-checkmark 90ms linear;
  transition: none;
}
.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-checked-indeterminate-mixedmark 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark {
  animation: mdc-checkbox-indeterminate-checked-checkmark 500ms linear;
  transition: none;
}
.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-indeterminate-checked-mixedmark 500ms linear;
  transition: none;
}

.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear;
  transition: none;
}

.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 1), background-color 90ms cubic-bezier(0, 0, 0.2, 1);
}
.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path,
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path {
  stroke-dashoffset: 0;
}

.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__checkmark {
  transition: opacity 180ms cubic-bezier(0, 0, 0.2, 1), transform 180ms cubic-bezier(0, 0, 0.2, 1);
  opacity: 1;
}
.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transform: scaleX(1) rotate(-45deg);
}

.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__checkmark {
  transform: rotate(45deg);
  opacity: 0;
  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);
}
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transform: scaleX(1) rotate(0deg);
  opacity: 1;
}

@keyframes mdc-checkbox-unchecked-checked-checkmark-path {
  0%, 50% {
    stroke-dashoffset: 29.7833385;
  }
  50% {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark {
  0%, 68.2% {
    transform: scaleX(0);
  }
  68.2% {
    animation-timing-function: cubic-bezier(0, 0, 0, 1);
  }
  100% {
    transform: scaleX(1);
  }
}
@keyframes mdc-checkbox-checked-unchecked-checkmark-path {
  from {
    animation-timing-function: cubic-bezier(0.4, 0, 1, 1);
    opacity: 1;
    stroke-dashoffset: 0;
  }
  to {
    opacity: 0;
    stroke-dashoffset: -29.7833385;
  }
}
@keyframes mdc-checkbox-checked-indeterminate-checkmark {
  from {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transform: rotate(0deg);
    opacity: 1;
  }
  to {
    transform: rotate(45deg);
    opacity: 0;
  }
}
@keyframes mdc-checkbox-indeterminate-checked-checkmark {
  from {
    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);
    transform: rotate(45deg);
    opacity: 0;
  }
  to {
    transform: rotate(360deg);
    opacity: 1;
  }
}
@keyframes mdc-checkbox-checked-indeterminate-mixedmark {
  from {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transform: rotate(-45deg);
    opacity: 0;
  }
  to {
    transform: rotate(0deg);
    opacity: 1;
  }
}
@keyframes mdc-checkbox-indeterminate-checked-mixedmark {
  from {
    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);
    transform: rotate(0deg);
    opacity: 1;
  }
  to {
    transform: rotate(315deg);
    opacity: 0;
  }
}
@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark {
  0% {
    animation-timing-function: linear;
    transform: scaleX(1);
    opacity: 1;
  }
  32.8%, 100% {
    transform: scaleX(0);
    opacity: 0;
  }
}
.mat-mdc-checkbox {
  display: inline-block;
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mat-mdc-checkbox-touch-target,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__native-control,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__ripple,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mat-mdc-checkbox-ripple::before,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__checkmark,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-checkbox label {
  cursor: pointer;
}
.mat-mdc-checkbox .mat-internal-form-field {
  color: var(--mat-checkbox-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-checkbox-label-text-font, var(--mat-sys-body-medium-font));
  line-height: var(--mat-checkbox-label-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-checkbox-label-text-size, var(--mat-sys-body-medium-size));
  letter-spacing: var(--mat-checkbox-label-text-tracking, var(--mat-sys-body-medium-tracking));
  font-weight: var(--mat-checkbox-label-text-weight, var(--mat-sys-body-medium-weight));
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled.mat-mdc-checkbox-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled.mat-mdc-checkbox-disabled-interactive input {
  cursor: default;
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled label {
  cursor: default;
  color: var(--mat-checkbox-disabled-label-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mat-mdc-checkbox.mat-mdc-checkbox-disabled label {
    color: GrayText;
  }
}
.mat-mdc-checkbox label:empty {
  display: none;
}
.mat-mdc-checkbox .mdc-checkbox__ripple {
  opacity: 0;
}

.mat-mdc-checkbox .mat-mdc-checkbox-ripple,
.mdc-checkbox__ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.mat-mdc-checkbox .mat-mdc-checkbox-ripple:not(:empty),
.mdc-checkbox__ripple:not(:empty) {
  transform: translateZ(0);
}

.mat-mdc-checkbox-ripple .mat-ripple-element {
  opacity: 0.1;
}

.mat-mdc-checkbox-touch-target {
  position: absolute;
  top: 50%;
  left: 50%;
  height: var(--mat-checkbox-touch-target-size, 48px);
  width: var(--mat-checkbox-touch-target-size, 48px);
  transform: translate(-50%, -50%);
  display: var(--mat-checkbox-touch-target-display, block);
}

.mat-mdc-checkbox .mat-mdc-checkbox-ripple::before {
  border-radius: 50%;
}

.mdc-checkbox__native-control:focus-visible ~ .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2,changeDetection:0})}return t})(),ja=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=$({type:t});static \u0275inj=H({imports:[Po,be]})}return t})();var bv=new b("MAT_DATE_LOCALE",{providedIn:"root",factory:()=>u(go)}),Ha="Method not implemented",Ht=class{locale;_localeChanges=new M;localeChanges=this._localeChanges;setTime(n,e,i,r){throw new Error(Ha)}getHours(n){throw new Error(Ha)}getMinutes(n){throw new Error(Ha)}getSeconds(n){throw new Error(Ha)}parseTime(n,e){throw new Error(Ha)}addSeconds(n,e){throw new Error(Ha)}getValidDateOrNull(n){return this.isDateInstance(n)&&this.isValid(n)?n:null}deserialize(n){return n==null||this.isDateInstance(n)&&this.isValid(n)?n:this.invalid()}setLocale(n){this.locale=n,this._localeChanges.next()}compareDate(n,e){return this.getYear(n)-this.getYear(e)||this.getMonth(n)-this.getMonth(e)||this.getDate(n)-this.getDate(e)}compareTime(n,e){return this.getHours(n)-this.getHours(e)||this.getMinutes(n)-this.getMinutes(e)||this.getSeconds(n)-this.getSeconds(e)}sameDate(n,e){if(n&&e){let i=this.isValid(n),r=this.isValid(e);return i&&r?!this.compareDate(n,e):i==r}return n==e}sameTime(n,e){if(n&&e){let i=this.isValid(n),r=this.isValid(e);return i&&r?!this.compareTime(n,e):i==r}return n==e}clampDate(n,e,i){return e&&this.compareDate(n,e)<0?e:i&&this.compareDate(n,i)>0?i:n}},Ar=new b("mat-date-formats");var EP=["tooltip"],xP=20;var SP=new b("mat-tooltip-scroll-strategy",{providedIn:"root",factory:()=>{let t=u(ne);return()=>qi(t,{scrollThrottle:xP})}}),MP=new b("mat-tooltip-default-options",{providedIn:"root",factory:()=>({showDelay:0,hideDelay:0,touchendHideDelay:1500})});var ES="tooltip-panel",IP={passive:!0},kP=8,TP=8,AP=24,RP=200,xS=(()=>{class t{_elementRef=u(P);_ngZone=u(A);_platform=u(Ce);_ariaDescriber=u(vx);_focusMonitor=u(xi);_dir=u(Et);_injector=u(ne);_viewContainerRef=u(Ct);_mediaMatcher=u(ka);_document=u(W);_renderer=u($e);_animationsDisabled=Xe();_defaultOptions=u(MP,{optional:!0});_overlayRef=null;_tooltipInstance=null;_overlayPanelClass;_portal;_position="below";_positionAtOrigin=!1;_disabled=!1;_tooltipClass;_viewInitialized=!1;_pointerExitEventsInitialized=!1;_tooltipComponent=NP;_viewportMargin=8;_currentPosition;_cssClassPrefix="mat-mdc";_ariaDescriptionPending=!1;_dirSubscribed=!1;get position(){return this._position}set position(e){e!==this._position&&(this._position=e,this._overlayRef&&(this._updatePosition(this._overlayRef),this._tooltipInstance?.show(0),this._overlayRef.updatePosition()))}get positionAtOrigin(){return this._positionAtOrigin}set positionAtOrigin(e){this._positionAtOrigin=ut(e),this._detach(),this._overlayRef=null}get disabled(){return this._disabled}set disabled(e){let i=ut(e);this._disabled!==i&&(this._disabled=i,i?this.hide(0):this._setupPointerEnterEventsIfNeeded(),this._syncAriaDescription(this.message))}get showDelay(){return this._showDelay}set showDelay(e){this._showDelay=oi(e)}_showDelay;get hideDelay(){return this._hideDelay}set hideDelay(e){this._hideDelay=oi(e),this._tooltipInstance&&(this._tooltipInstance._mouseLeaveHideDelay=this._hideDelay)}_hideDelay;touchGestures="auto";get message(){return this._message}set message(e){let i=this._message;this._message=e!=null?String(e).trim():"",!this._message&&this._isTooltipVisible()?this.hide(0):(this._setupPointerEnterEventsIfNeeded(),this._updateTooltipMessage()),this._syncAriaDescription(i)}_message="";get tooltipClass(){return this._tooltipClass}set tooltipClass(e){this._tooltipClass=e,this._tooltipInstance&&this._setTooltipClass(this._tooltipClass)}_eventCleanups=[];_touchstartTimeout=null;_destroyed=new M;_isDestroyed=!1;constructor(){let e=this._defaultOptions;e&&(this._showDelay=e.showDelay,this._hideDelay=e.hideDelay,e.position&&(this.position=e.position),e.positionAtOrigin&&(this.positionAtOrigin=e.positionAtOrigin),e.touchGestures&&(this.touchGestures=e.touchGestures),e.tooltipClass&&(this.tooltipClass=e.tooltipClass)),this._viewportMargin=kP}ngAfterViewInit(){this._viewInitialized=!0,this._setupPointerEnterEventsIfNeeded(),this._focusMonitor.monitor(this._elementRef).pipe(fe(this._destroyed)).subscribe(e=>{e?e==="keyboard"&&this._ngZone.run(()=>this.show()):this._ngZone.run(()=>this.hide(0))})}ngOnDestroy(){let e=this._elementRef.nativeElement;this._touchstartTimeout&&clearTimeout(this._touchstartTimeout),this._overlayRef&&(this._overlayRef.dispose(),this._tooltipInstance=null),this._eventCleanups.forEach(i=>i()),this._eventCleanups.length=0,this._destroyed.next(),this._destroyed.complete(),this._isDestroyed=!0,this._ariaDescriber.removeDescription(e,this.message,"tooltip"),this._focusMonitor.stopMonitoring(e)}show(e=this.showDelay,i){if(this.disabled||!this.message||this._isTooltipVisible()){this._tooltipInstance?._cancelPendingAnimations();return}let r=this._createOverlay(i);this._detach(),this._portal=this._portal||new wr(this._tooltipComponent,this._viewContainerRef);let o=this._tooltipInstance=r.attach(this._portal).instance;o._triggerElement=this._elementRef.nativeElement,o._mouseLeaveHideDelay=this._hideDelay,o.afterHidden().pipe(fe(this._destroyed)).subscribe(()=>this._detach()),this._setTooltipClass(this._tooltipClass),this._updateTooltipMessage(),o.show(e)}hide(e=this.hideDelay){let i=this._tooltipInstance;i&&(i.isVisible()?i.hide(e):(i._cancelPendingAnimations(),this._detach()))}toggle(e){this._isTooltipVisible()?this.hide():this.show(void 0,e)}_isTooltipVisible(){return!!this._tooltipInstance&&this._tooltipInstance.isVisible()}_createOverlay(e){if(this._overlayRef){let a=this._overlayRef.getConfig().positionStrategy;if((!this.positionAtOrigin||!e)&&a._origin instanceof P)return this._overlayRef;this._detach()}let i=this._injector.get(xa).getAncestorScrollContainers(this._elementRef),r=`${this._cssClassPrefix}-${ES}`,o=Mo(this._injector,this.positionAtOrigin?e||this._elementRef:this._elementRef).withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`).withFlexibleDimensions(!1).withViewportMargin(this._viewportMargin).withScrollableContainers(i).withPopoverLocation("global");return o.positionChanges.pipe(fe(this._destroyed)).subscribe(a=>{this._updateCurrentPositionClass(a.connectionPair),this._tooltipInstance&&a.scrollableViewProperties.isOverlayClipped&&this._tooltipInstance.isVisible()&&this._ngZone.run(()=>this.hide(0))}),this._overlayRef=Io(this._injector,{direction:this._dir,positionStrategy:o,panelClass:this._overlayPanelClass?[...this._overlayPanelClass,r]:r,scrollStrategy:this._injector.get(SP)(),disableAnimations:this._animationsDisabled,eventPredicate:this._overlayEventPredicate}),this._updatePosition(this._overlayRef),this._overlayRef.detachments().pipe(fe(this._destroyed)).subscribe(()=>this._detach()),this._overlayRef.outsidePointerEvents().pipe(fe(this._destroyed)).subscribe(()=>this._tooltipInstance?._handleBodyInteraction()),this._overlayRef.keydownEvents().pipe(fe(this._destroyed)).subscribe(a=>{a.preventDefault(),a.stopPropagation(),this._ngZone.run(()=>this.hide(0))}),this._defaultOptions?.disableTooltipInteractivity&&this._overlayRef.addPanelClass(`${this._cssClassPrefix}-tooltip-panel-non-interactive`),this._dirSubscribed||(this._dirSubscribed=!0,this._dir.change.pipe(fe(this._destroyed)).subscribe(()=>{this._overlayRef&&this._updatePosition(this._overlayRef)})),this._overlayRef}_detach(){this._overlayRef&&this._overlayRef.hasAttached()&&this._overlayRef.detach(),this._tooltipInstance=null}_updatePosition(e){let i=e.getConfig().positionStrategy,r=this._getOrigin(),o=this._getOverlayPosition();i.withPositions([this._addOffset(N(N({},r.main),o.main)),this._addOffset(N(N({},r.fallback),o.fallback))])}_addOffset(e){let i=TP,r=!this._dir||this._dir.value=="ltr";return e.originY==="top"?e.offsetY=-i:e.originY==="bottom"?e.offsetY=i:e.originX==="start"?e.offsetX=r?-i:i:e.originX==="end"&&(e.offsetX=r?i:-i),e}_getOrigin(){let e=!this._dir||this._dir.value=="ltr",i=this.position,r;i=="above"||i=="below"?r={originX:"center",originY:i=="above"?"top":"bottom"}:i=="before"||i=="left"&&e||i=="right"&&!e?r={originX:"start",originY:"center"}:(i=="after"||i=="right"&&e||i=="left"&&!e)&&(r={originX:"end",originY:"center"});let{x:o,y:a}=this._invertPosition(r.originX,r.originY);return{main:r,fallback:{originX:o,originY:a}}}_getOverlayPosition(){let e=!this._dir||this._dir.value=="ltr",i=this.position,r;i=="above"?r={overlayX:"center",overlayY:"bottom"}:i=="below"?r={overlayX:"center",overlayY:"top"}:i=="before"||i=="left"&&e||i=="right"&&!e?r={overlayX:"end",overlayY:"center"}:(i=="after"||i=="right"&&e||i=="left"&&!e)&&(r={overlayX:"start",overlayY:"center"});let{x:o,y:a}=this._invertPosition(r.overlayX,r.overlayY);return{main:r,fallback:{overlayX:o,overlayY:a}}}_updateTooltipMessage(){this._tooltipInstance&&(this._tooltipInstance.message=this.message,this._tooltipInstance._markForCheck(),At(()=>{this._tooltipInstance&&this._overlayRef.updatePosition()},{injector:this._injector}))}_setTooltipClass(e){this._tooltipInstance&&(this._tooltipInstance.tooltipClass=e instanceof Set?Array.from(e):e,this._tooltipInstance._markForCheck())}_invertPosition(e,i){return this.position==="above"||this.position==="below"?i==="top"?i="bottom":i==="bottom"&&(i="top"):e==="end"?e="start":e==="start"&&(e="end"),{x:e,y:i}}_updateCurrentPositionClass(e){let{overlayY:i,originX:r,originY:o}=e,a;if(i==="center"?this._dir&&this._dir.value==="rtl"?a=r==="end"?"left":"right":a=r==="start"?"left":"right":a=i==="bottom"&&o==="top"?"above":"below",a!==this._currentPosition){let s=this._overlayRef;if(s){let l=`${this._cssClassPrefix}-${ES}-`;s.removePanelClass(l+this._currentPosition),s.addPanelClass(l+a)}this._currentPosition=a}}_setupPointerEnterEventsIfNeeded(){this._disabled||!this.message||!this._viewInitialized||this._eventCleanups.length||(this._isTouchPlatform()?this.touchGestures!=="off"&&(this._disableNativeGesturesIfNecessary(),this._addListener("touchstart",e=>{let i=e.targetTouches?.[0],r=i?{x:i.clientX,y:i.clientY}:void 0;this._setupPointerExitEventsIfNeeded(),this._touchstartTimeout&&clearTimeout(this._touchstartTimeout);let o=500;this._touchstartTimeout=setTimeout(()=>{this._touchstartTimeout=null,this.show(void 0,r)},this._defaultOptions?.touchLongPressShowDelay??o)})):this._addListener("mouseenter",e=>{this._setupPointerExitEventsIfNeeded();let i;e.x!==void 0&&e.y!==void 0&&(i=e),this.show(void 0,i)}))}_setupPointerExitEventsIfNeeded(){if(!this._pointerExitEventsInitialized){if(this._pointerExitEventsInitialized=!0,!this._isTouchPlatform())this._addListener("mouseleave",e=>{let i=e.relatedTarget;(!i||!this._overlayRef?.overlayElement.contains(i))&&this.hide()}),this._addListener("wheel",e=>{if(this._isTooltipVisible()){let i=this._document.elementFromPoint(e.clientX,e.clientY),r=this._elementRef.nativeElement;i!==r&&!r.contains(i)&&this.hide()}});else if(this.touchGestures!=="off"){this._disableNativeGesturesIfNecessary();let e=()=>{this._touchstartTimeout&&clearTimeout(this._touchstartTimeout),this.hide(this._defaultOptions?.touchendHideDelay)};this._addListener("touchend",e),this._addListener("touchcancel",e)}}}_addListener(e,i){this._eventCleanups.push(this._renderer.listen(this._elementRef.nativeElement,e,i,IP))}_isTouchPlatform(){let e=this._defaultOptions?.detectHoverCapability;return typeof e=="function"?!e():this._platform.IOS||this._platform.ANDROID?!0:this._platform.isBrowser?!!e&&this._mediaMatcher.matchMedia("(any-hover: none)").matches:!1}_disableNativeGesturesIfNecessary(){let e=this.touchGestures;if(e!=="off"){let i=this._elementRef.nativeElement,r=i.style;(e==="on"||i.nodeName!=="INPUT"&&i.nodeName!=="TEXTAREA")&&(r.userSelect=r.msUserSelect=r.webkitUserSelect=r.MozUserSelect="none"),(e==="on"||!i.draggable)&&(r.webkitUserDrag="none"),r.touchAction="none",r.webkitTapHighlightColor="transparent"}}_syncAriaDescription(e){this._ariaDescriptionPending||(this._ariaDescriptionPending=!0,this._ariaDescriber.removeDescription(this._elementRef.nativeElement,e,"tooltip"),this._isDestroyed||At({write:()=>{this._ariaDescriptionPending=!1,this.message&&!this.disabled&&this._ariaDescriber.describe(this._elementRef.nativeElement,this.message,"tooltip")}},{injector:this._injector}))}_overlayEventPredicate=e=>e.type==="keydown"?this._isTooltipVisible()&&e.keyCode===27&&!vt(e):!0;static \u0275fac=function(i){return new(i||t)};static \u0275dir=z({type:t,selectors:[["","matTooltip",""]],hostAttrs:[1,"mat-mdc-tooltip-trigger"],hostVars:2,hostBindings:function(i,r){i&2&&O("mat-mdc-tooltip-disabled",r.disabled)},inputs:{position:[0,"matTooltipPosition","position"],positionAtOrigin:[0,"matTooltipPositionAtOrigin","positionAtOrigin"],disabled:[0,"matTooltipDisabled","disabled"],showDelay:[0,"matTooltipShowDelay","showDelay"],hideDelay:[0,"matTooltipHideDelay","hideDelay"],touchGestures:[0,"matTooltipTouchGestures","touchGestures"],message:[0,"matTooltip","message"],tooltipClass:[0,"matTooltipClass","tooltipClass"]},exportAs:["matTooltip"]})}return t})(),NP=(()=>{class t{_changeDetectorRef=u(Fe);_elementRef=u(P);_isMultiline=!1;message;tooltipClass;_showTimeoutId;_hideTimeoutId;_triggerElement;_mouseLeaveHideDelay;_animationsDisabled=Xe();_tooltip;_closeOnInteraction=!1;_isVisible=!1;_onHide=new M;_showAnimation="mat-mdc-tooltip-show";_hideAnimation="mat-mdc-tooltip-hide";constructor(){}show(e){this._hideTimeoutId!=null&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=setTimeout(()=>{this._toggleVisibility(!0),this._showTimeoutId=void 0},e)}hide(e){this._showTimeoutId!=null&&clearTimeout(this._showTimeoutId),this._hideTimeoutId=setTimeout(()=>{this._toggleVisibility(!1),this._hideTimeoutId=void 0},e)}afterHidden(){return this._onHide}isVisible(){return this._isVisible}ngOnDestroy(){this._cancelPendingAnimations(),this._onHide.complete(),this._triggerElement=null}_handleBodyInteraction(){this._closeOnInteraction&&this.hide(0)}_markForCheck(){this._changeDetectorRef.markForCheck()}_handleMouseLeave({relatedTarget:e}){(!e||!this._triggerElement.contains(e))&&(this.isVisible()?this.hide(this._mouseLeaveHideDelay):this._finalizeAnimation(!1))}_onShow(){this._isMultiline=this._isTooltipMultiline(),this._markForCheck()}_isTooltipMultiline(){let e=this._elementRef.nativeElement.getBoundingClientRect();return e.height>AP&&e.width>=RP}_handleAnimationEnd({animationName:e}){(e===this._showAnimation||e===this._hideAnimation)&&this._finalizeAnimation(e===this._showAnimation)}_cancelPendingAnimations(){this._showTimeoutId!=null&&clearTimeout(this._showTimeoutId),this._hideTimeoutId!=null&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=this._hideTimeoutId=void 0}_finalizeAnimation(e){e?this._closeOnInteraction=!0:this.isVisible()||this._onHide.next()}_toggleVisibility(e){let i=this._tooltip.nativeElement,r=this._showAnimation,o=this._hideAnimation;if(i.classList.remove(e?o:r),i.classList.add(e?r:o),this._isVisible!==e&&(this._isVisible=e,this._changeDetectorRef.markForCheck()),e&&!this._animationsDisabled&&typeof getComputedStyle=="function"){let a=getComputedStyle(i);(a.getPropertyValue("animation-duration")==="0s"||a.getPropertyValue("animation-name")==="none")&&(this._animationsDisabled=!0)}e&&this._onShow(),this._animationsDisabled&&(i.classList.add("_mat-animation-noopable"),this._finalizeAnimation(e))}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["mat-tooltip-component"]],viewQuery:function(i,r){if(i&1&&ve(EP,7),i&2){let o;B(o=j())&&(r._tooltip=o.first)}},hostAttrs:["aria-hidden","true"],hostBindings:function(i,r){i&1&&x("mouseleave",function(a){return r._handleMouseLeave(a)})},decls:4,vars:5,consts:[["tooltip",""],[1,"mdc-tooltip","mat-mdc-tooltip",3,"animationend"],[1,"mat-mdc-tooltip-surface","mdc-tooltip__surface"]],template:function(i,r){i&1&&(We(0,"div",1,0),pa("animationend",function(a){return r._handleAnimationEnd(a)}),We(2,"div",2),y(3),Ke()()),i&2&&(_t(r.tooltipClass),O("mdc-tooltip--multiline",r._isMultiline),v(3),ct(r.message))},styles:[`.mat-mdc-tooltip {
  position: relative;
  transform: scale(0);
  display: inline-flex;
}
.mat-mdc-tooltip::before {
  content: "";
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  position: absolute;
}
.mat-mdc-tooltip-panel-below .mat-mdc-tooltip::before {
  top: -8px;
}
.mat-mdc-tooltip-panel-above .mat-mdc-tooltip::before {
  bottom: -8px;
}
.mat-mdc-tooltip-panel-right .mat-mdc-tooltip::before {
  left: -8px;
}
.mat-mdc-tooltip-panel-left .mat-mdc-tooltip::before {
  right: -8px;
}
.mat-mdc-tooltip._mat-animation-noopable {
  animation: none;
  transform: scale(1);
}

.mat-mdc-tooltip-surface {
  word-break: normal;
  overflow-wrap: anywhere;
  padding: 4px 8px;
  min-width: 40px;
  max-width: 200px;
  min-height: 24px;
  max-height: 40vh;
  box-sizing: border-box;
  overflow: hidden;
  text-align: center;
  will-change: transform, opacity;
  background-color: var(--mat-tooltip-container-color, var(--mat-sys-inverse-surface));
  color: var(--mat-tooltip-supporting-text-color, var(--mat-sys-inverse-on-surface));
  border-radius: var(--mat-tooltip-container-shape, var(--mat-sys-corner-extra-small));
  font-family: var(--mat-tooltip-supporting-text-font, var(--mat-sys-body-small-font));
  font-size: var(--mat-tooltip-supporting-text-size, var(--mat-sys-body-small-size));
  font-weight: var(--mat-tooltip-supporting-text-weight, var(--mat-sys-body-small-weight));
  line-height: var(--mat-tooltip-supporting-text-line-height, var(--mat-sys-body-small-line-height));
  letter-spacing: var(--mat-tooltip-supporting-text-tracking, var(--mat-sys-body-small-tracking));
}
.mat-mdc-tooltip-surface::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 1px solid transparent;
  border-radius: inherit;
  content: "";
  pointer-events: none;
}
.mdc-tooltip--multiline .mat-mdc-tooltip-surface {
  text-align: left;
}
[dir=rtl] .mdc-tooltip--multiline .mat-mdc-tooltip-surface {
  text-align: right;
}

.mat-mdc-tooltip-panel {
  line-height: normal;
}
.mat-mdc-tooltip-panel.mat-mdc-tooltip-panel-non-interactive {
  pointer-events: none;
}

@keyframes mat-mdc-tooltip-show {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes mat-mdc-tooltip-hide {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.8);
  }
}
.mat-mdc-tooltip-show {
  animation: mat-mdc-tooltip-show 150ms cubic-bezier(0, 0, 0.2, 1) forwards;
}

.mat-mdc-tooltip-hide {
  animation: mat-mdc-tooltip-hide 75ms cubic-bezier(0.4, 0, 1, 1) forwards;
}
`],encapsulation:2,changeDetection:0})}return t})();var Uf=new b("MAT_INPUT_VALUE_ACCESSOR");var Dv=class{_box;_destroyed=new M;_resizeSubject=new M;_resizeObserver;_elementObservables=new Map;constructor(n){this._box=n,typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(e=>this._resizeSubject.next(e)))}observe(n){return this._elementObservables.has(n)||this._elementObservables.set(n,new ue(e=>{let i=this._resizeSubject.subscribe(e);return this._resizeObserver?.observe(n,{box:this._box}),()=>{this._resizeObserver?.unobserve(n),i.unsubscribe(),this._elementObservables.delete(n)}}).pipe(He(e=>e.some(i=>i.target===n)),Lc({bufferSize:1,refCount:!0}),fe(this._destroyed))),this._elementObservables.get(n)}destroy(){this._destroyed.next(),this._destroyed.complete(),this._resizeSubject.complete(),this._elementObservables.clear()}},SS=(()=>{class t{_cleanupErrorListener;_observers=new Map;_ngZone=u(A);constructor(){typeof ResizeObserver<"u"}ngOnDestroy(){for(let[,e]of this._observers)e.destroy();this._observers.clear(),this._cleanupErrorListener?.()}observe(e,i){let r=i?.box||"content-box";return this._observers.has(r)||this._observers.set(r,new Dv(r)),this._observers.get(r).observe(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var OP=["notch"],FP=["matFormFieldNotchedOutline",""],PP=["*"],MS=["iconPrefixContainer"],IS=["textPrefixContainer"],kS=["iconSuffixContainer"],TS=["textSuffixContainer"],LP=["textField"],VP=["*",[["mat-label"]],[["","matPrefix",""],["","matIconPrefix",""]],[["","matTextPrefix",""]],[["","matTextSuffix",""]],[["","matSuffix",""],["","matIconSuffix",""]],[["mat-error"],["","matError",""]],[["mat-hint",3,"align","end"]],[["mat-hint","align","end"]]],BP=["*","mat-label","[matPrefix], [matIconPrefix]","[matTextPrefix]","[matTextSuffix]","[matSuffix], [matIconSuffix]","mat-error, [matError]","mat-hint:not([align='end'])","mat-hint[align='end']"];function jP(t,n){t&1&&ie(0,"span",21)}function HP(t,n){if(t&1&&(p(0,"label",20),Z(1,1),ge(2,jP,1,0,"span",21),g()),t&2){let e=X(2);T("floating",e._shouldLabelFloat())("monitorResize",e._hasOutline())("id",e._labelId),ce("for",e._control.disableAutomaticLabeling?null:e._control.id),v(2),_e(!e.hideRequiredMarker&&e._control.required?2:-1)}}function zP(t,n){if(t&1&&ge(0,HP,3,5,"label",20),t&2){let e=X();_e(e._hasFloatingLabel()?0:-1)}}function UP(t,n){t&1&&ie(0,"div",7)}function $P(t,n){}function GP(t,n){if(t&1&&fn(0,$P,0,0,"ng-template",13),t&2){X(2);let e=Y(1);T("ngTemplateOutlet",e)}}function WP(t,n){if(t&1&&(p(0,"div",9),ge(1,GP,1,1,null,13),g()),t&2){let e=X();T("matFormFieldNotchedOutlineOpen",e._shouldLabelFloat()),v(),_e(e._forceDisplayInfixLabel()?-1:1)}}function qP(t,n){t&1&&(p(0,"div",10,2),Z(2,2),g())}function YP(t,n){t&1&&(p(0,"div",11,3),Z(2,3),g())}function KP(t,n){}function QP(t,n){if(t&1&&fn(0,KP,0,0,"ng-template",13),t&2){X();let e=Y(1);T("ngTemplateOutlet",e)}}function ZP(t,n){t&1&&(p(0,"div",14,4),Z(2,4),g())}function XP(t,n){t&1&&(p(0,"div",15,5),Z(2,5),g())}function JP(t,n){t&1&&ie(0,"div",16)}function eL(t,n){t&1&&(p(0,"div",18),Z(1,6),g())}function tL(t,n){if(t&1&&(p(0,"mat-hint",22),y(1),g()),t&2){let e=X(2);T("id",e._hintLabelId),v(),ct(e.hintLabel)}}function nL(t,n){if(t&1&&(p(0,"div",19),ge(1,tL,2,2,"mat-hint",22),Z(2,7),ie(3,"div",23),Z(4,8),g()),t&2){let e=X();v(),_e(e.hintLabel?1:-1)}}var Cv=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=z({type:t,selectors:[["mat-label"]]})}return t})(),iL=new b("MatError");var zl=(()=>{class t{align="start";id=u(qe).getId("mat-mdc-hint-");static \u0275fac=function(i){return new(i||t)};static \u0275dir=z({type:t,selectors:[["mat-hint"]],hostAttrs:[1,"mat-mdc-form-field-hint","mat-mdc-form-field-bottom-align"],hostVars:4,hostBindings:function(i,r){i&2&&(gt("id",r.id),ce("align",null),O("mat-mdc-form-field-hint-end",r.align==="end"))},inputs:{align:"align",id:"id"}})}return t})(),rL=new b("MatPrefix");var LS=new b("MatSuffix"),wv=(()=>{class t{set _isTextSelector(e){this._isText=!0}_isText=!1;static \u0275fac=function(i){return new(i||t)};static \u0275dir=z({type:t,selectors:[["","matSuffix",""],["","matIconSuffix",""],["","matTextSuffix",""]],inputs:{_isTextSelector:[0,"matTextSuffix","_isTextSelector"]},features:[xe([{provide:LS,useExisting:t}])]})}return t})(),VS=new b("FloatingLabelParent"),AS=(()=>{class t{_elementRef=u(P);get floating(){return this._floating}set floating(e){this._floating=e,this.monitorResize&&this._handleResize()}_floating=!1;get monitorResize(){return this._monitorResize}set monitorResize(e){this._monitorResize=e,this._monitorResize?this._subscribeToResize():this._resizeSubscription.unsubscribe()}_monitorResize=!1;_resizeObserver=u(SS);_ngZone=u(A);_parent=u(VS);_resizeSubscription=new se;constructor(){}ngOnDestroy(){this._resizeSubscription.unsubscribe()}getWidth(){return oL(this._elementRef.nativeElement)}get element(){return this._elementRef.nativeElement}_handleResize(){setTimeout(()=>this._parent._handleLabelResized())}_subscribeToResize(){this._resizeSubscription.unsubscribe(),this._ngZone.runOutsideAngular(()=>{this._resizeSubscription=this._resizeObserver.observe(this._elementRef.nativeElement,{box:"border-box"}).subscribe(()=>this._handleResize())})}static \u0275fac=function(i){return new(i||t)};static \u0275dir=z({type:t,selectors:[["label","matFormFieldFloatingLabel",""]],hostAttrs:[1,"mdc-floating-label","mat-mdc-floating-label"],hostVars:2,hostBindings:function(i,r){i&2&&O("mdc-floating-label--float-above",r.floating)},inputs:{floating:"floating",monitorResize:"monitorResize"}})}return t})();function oL(t){let n=t;if(n.offsetParent!==null)return n.scrollWidth;let e=n.cloneNode(!0);e.style.setProperty("position","absolute"),e.style.setProperty("transform","translate(-9999px, -9999px)"),document.documentElement.appendChild(e);let i=e.scrollWidth;return e.remove(),i}var RS="mdc-line-ripple--active",$f="mdc-line-ripple--deactivating",NS=(()=>{class t{_elementRef=u(P);_cleanupTransitionEnd;constructor(){let e=u(A),i=u($e);e.runOutsideAngular(()=>{this._cleanupTransitionEnd=i.listen(this._elementRef.nativeElement,"transitionend",this._handleTransitionEnd)})}activate(){let e=this._elementRef.nativeElement.classList;e.remove($f),e.add(RS)}deactivate(){this._elementRef.nativeElement.classList.add($f)}_handleTransitionEnd=e=>{let i=this._elementRef.nativeElement.classList,r=i.contains($f);e.propertyName==="opacity"&&r&&i.remove(RS,$f)};ngOnDestroy(){this._cleanupTransitionEnd()}static \u0275fac=function(i){return new(i||t)};static \u0275dir=z({type:t,selectors:[["div","matFormFieldLineRipple",""]],hostAttrs:[1,"mdc-line-ripple"]})}return t})(),OS=(()=>{class t{_elementRef=u(P);_ngZone=u(A);open=!1;_notch;ngAfterViewInit(){let e=this._elementRef.nativeElement,i=e.querySelector(".mdc-floating-label");i?(e.classList.add("mdc-notched-outline--upgraded"),typeof requestAnimationFrame=="function"&&(i.style.transitionDuration="0s",this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>i.style.transitionDuration="")}))):e.classList.add("mdc-notched-outline--no-label")}_setNotchWidth(e){let i=this._notch.nativeElement;!this.open||!e?i.style.width="":i.style.width=`calc(${e}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + 9px)`}_setMaxWidth(e){this._notch.nativeElement.style.setProperty("--mat-form-field-notch-max-width",`calc(100% - ${e}px)`)}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["div","matFormFieldNotchedOutline",""]],viewQuery:function(i,r){if(i&1&&ve(OP,5),i&2){let o;B(o=j())&&(r._notch=o.first)}},hostAttrs:[1,"mdc-notched-outline"],hostVars:2,hostBindings:function(i,r){i&2&&O("mdc-notched-outline--notched",r.open)},inputs:{open:[0,"matFormFieldNotchedOutlineOpen","open"]},attrs:FP,ngContentSelectors:PP,decls:5,vars:0,consts:[["notch",""],[1,"mat-mdc-notch-piece","mdc-notched-outline__leading"],[1,"mat-mdc-notch-piece","mdc-notched-outline__notch"],[1,"mat-mdc-notch-piece","mdc-notched-outline__trailing"]],template:function(i,r){i&1&&(we(),wt(0,"div",1),We(1,"div",2,0),Z(3),Ke(),wt(4,"div",3))},encapsulation:2,changeDetection:0})}return t})(),za=(()=>{class t{value=null;stateChanges;id;placeholder;ngControl=null;focused=!1;empty=!1;shouldLabelFloat=!1;required=!1;disabled=!1;errorState=!1;controlType;autofilled;userAriaDescribedBy;disableAutomaticLabeling;describedByIds;static \u0275fac=function(i){return new(i||t)};static \u0275dir=z({type:t})}return t})();var Lo=new b("MatFormField"),aL=new b("MAT_FORM_FIELD_DEFAULT_OPTIONS"),FS="fill",sL="auto",PS="fixed",lL="translateY(-50%)",Vn=(()=>{class t{_elementRef=u(P);_changeDetectorRef=u(Fe);_platform=u(Ce);_idGenerator=u(qe);_ngZone=u(A);_defaults=u(aL,{optional:!0});_currentDirection;_textField;_iconPrefixContainer;_textPrefixContainer;_iconSuffixContainer;_textSuffixContainer;_floatingLabel;_notchedOutline;_lineRipple;_iconPrefixContainerSignal=qs("iconPrefixContainer");_textPrefixContainerSignal=qs("textPrefixContainer");_iconSuffixContainerSignal=qs("iconSuffixContainer");_textSuffixContainerSignal=qs("textSuffixContainer");_prefixSuffixContainers=ti(()=>[this._iconPrefixContainerSignal(),this._textPrefixContainerSignal(),this._iconSuffixContainerSignal(),this._textSuffixContainerSignal()].map(e=>e?.nativeElement).filter(e=>e!==void 0));_formFieldControl;_prefixChildren;_suffixChildren;_errorChildren;_hintChildren;_labelChild=BC(Cv);get hideRequiredMarker(){return this._hideRequiredMarker}set hideRequiredMarker(e){this._hideRequiredMarker=ut(e)}_hideRequiredMarker=!1;color="primary";get floatLabel(){return this._floatLabel||this._defaults?.floatLabel||sL}set floatLabel(e){e!==this._floatLabel&&(this._floatLabel=e,this._changeDetectorRef.markForCheck())}_floatLabel;get appearance(){return this._appearanceSignal()}set appearance(e){let i=e||this._defaults?.appearance||FS;this._appearanceSignal.set(i)}_appearanceSignal=re(FS);get subscriptSizing(){return this._subscriptSizing||this._defaults?.subscriptSizing||PS}set subscriptSizing(e){this._subscriptSizing=e||this._defaults?.subscriptSizing||PS}_subscriptSizing=null;get hintLabel(){return this._hintLabel}set hintLabel(e){this._hintLabel=e,this._processHints()}_hintLabel="";_hasIconPrefix=!1;_hasTextPrefix=!1;_hasIconSuffix=!1;_hasTextSuffix=!1;_labelId=this._idGenerator.getId("mat-mdc-form-field-label-");_hintLabelId=this._idGenerator.getId("mat-mdc-hint-");_describedByIds;get _control(){return this._explicitFormFieldControl||this._formFieldControl}set _control(e){this._explicitFormFieldControl=e}_destroyed=new M;_isFocused=null;_explicitFormFieldControl;_previousControl=null;_previousControlValidatorFn=null;_stateChanges;_valueChanges;_describedByChanges;_outlineLabelOffsetResizeObserver=null;_animationsDisabled=Xe();constructor(){let e=this._defaults,i=u(Et);e&&(e.appearance&&(this.appearance=e.appearance),this._hideRequiredMarker=!!e?.hideRequiredMarker,e.color&&(this.color=e.color)),mr(()=>this._currentDirection=i.valueSignal()),this._syncOutlineLabelOffset()}ngAfterViewInit(){this._updateFocusState(),this._animationsDisabled||this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-form-field-animations-enabled")},300)}),this._changeDetectorRef.detectChanges()}ngAfterContentInit(){this._assertFormFieldControl(),this._initializeSubscript(),this._initializePrefixAndSuffix()}ngAfterContentChecked(){this._assertFormFieldControl(),this._control!==this._previousControl&&(this._initializeControl(this._previousControl),this._control.ngControl&&this._control.ngControl.control&&(this._previousControlValidatorFn=this._control.ngControl.control.validator),this._previousControl=this._control),this._control.ngControl&&this._control.ngControl.control&&this._control.ngControl.control.validator!==this._previousControlValidatorFn&&this._changeDetectorRef.markForCheck()}ngOnDestroy(){this._outlineLabelOffsetResizeObserver?.disconnect(),this._stateChanges?.unsubscribe(),this._valueChanges?.unsubscribe(),this._describedByChanges?.unsubscribe(),this._destroyed.next(),this._destroyed.complete()}getLabelId=ti(()=>this._hasFloatingLabel()?this._labelId:null);getConnectedOverlayOrigin(){return this._textField||this._elementRef}_animateAndLockLabel(){this._hasFloatingLabel()&&(this.floatLabel="always")}_initializeControl(e){let i=this._control,r="mat-mdc-form-field-type-";e&&this._elementRef.nativeElement.classList.remove(r+e.controlType),i.controlType&&this._elementRef.nativeElement.classList.add(r+i.controlType),this._stateChanges?.unsubscribe(),this._stateChanges=i.stateChanges.subscribe(()=>{this._updateFocusState(),this._changeDetectorRef.markForCheck()}),this._describedByChanges?.unsubscribe(),this._describedByChanges=i.stateChanges.pipe(sn([void 0,void 0]),Se(()=>[i.errorState,i.userAriaDescribedBy]),Pc(),He(([[o,a],[s,l]])=>o!==s||a!==l)).subscribe(()=>this._syncDescribedByIds()),this._valueChanges?.unsubscribe(),i.ngControl&&i.ngControl.valueChanges&&(this._valueChanges=i.ngControl.valueChanges.pipe(fe(this._destroyed)).subscribe(()=>this._changeDetectorRef.markForCheck()))}_checkPrefixAndSuffixTypes(){this._hasIconPrefix=!!this._prefixChildren.find(e=>!e._isText),this._hasTextPrefix=!!this._prefixChildren.find(e=>e._isText),this._hasIconSuffix=!!this._suffixChildren.find(e=>!e._isText),this._hasTextSuffix=!!this._suffixChildren.find(e=>e._isText)}_initializePrefixAndSuffix(){this._checkPrefixAndSuffixTypes(),an(this._prefixChildren.changes,this._suffixChildren.changes).subscribe(()=>{this._checkPrefixAndSuffixTypes(),this._changeDetectorRef.markForCheck()})}_initializeSubscript(){this._hintChildren.changes.subscribe(()=>{this._processHints(),this._changeDetectorRef.markForCheck()}),this._errorChildren.changes.subscribe(()=>{this._syncDescribedByIds(),this._changeDetectorRef.markForCheck()}),this._validateHints(),this._syncDescribedByIds()}_assertFormFieldControl(){this._control}_updateFocusState(){let e=this._control.focused;e&&!this._isFocused?(this._isFocused=!0,this._lineRipple?.activate()):!e&&(this._isFocused||this._isFocused===null)&&(this._isFocused=!1,this._lineRipple?.deactivate()),this._elementRef.nativeElement.classList.toggle("mat-focused",e),this._textField?.nativeElement.classList.toggle("mdc-text-field--focused",e)}_syncOutlineLabelOffset(){WC({earlyRead:()=>{if(this._appearanceSignal()!=="outline")return this._outlineLabelOffsetResizeObserver?.disconnect(),null;if(globalThis.ResizeObserver){this._outlineLabelOffsetResizeObserver||=new globalThis.ResizeObserver(()=>{this._writeOutlinedLabelStyles(this._getOutlinedLabelOffset())});for(let e of this._prefixSuffixContainers())this._outlineLabelOffsetResizeObserver.observe(e,{box:"border-box"})}return this._getOutlinedLabelOffset()},write:e=>this._writeOutlinedLabelStyles(e())})}_shouldAlwaysFloat(){return this.floatLabel==="always"}_hasOutline(){return this.appearance==="outline"}_forceDisplayInfixLabel(){return!this._platform.isBrowser&&this._prefixChildren.length&&!this._shouldLabelFloat()}_hasFloatingLabel=ti(()=>!!this._labelChild());_shouldLabelFloat(){return this._hasFloatingLabel()?this._control.shouldLabelFloat||this._shouldAlwaysFloat():!1}_shouldForward(e){let i=this._control?this._control.ngControl:null;return i&&i[e]}_getSubscriptMessageType(){return this._errorChildren&&this._errorChildren.length>0&&this._control.errorState?"error":"hint"}_handleLabelResized(){this._refreshOutlineNotchWidth()}_refreshOutlineNotchWidth(){!this._hasOutline()||!this._floatingLabel||!this._shouldLabelFloat()?this._notchedOutline?._setNotchWidth(0):this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth())}_processHints(){this._validateHints(),this._syncDescribedByIds()}_validateHints(){this._hintChildren}_syncDescribedByIds(){if(this._control){let e=[];if(this._control.userAriaDescribedBy&&typeof this._control.userAriaDescribedBy=="string"&&e.push(...this._control.userAriaDescribedBy.split(" ")),this._getSubscriptMessageType()==="hint"){let o=this._hintChildren?this._hintChildren.find(s=>s.align==="start"):null,a=this._hintChildren?this._hintChildren.find(s=>s.align==="end"):null;o?e.push(o.id):this._hintLabel&&e.push(this._hintLabelId),a&&e.push(a.id)}else this._errorChildren&&e.push(...this._errorChildren.map(o=>o.id));let i=this._control.describedByIds,r;if(i){let o=this._describedByIds||e;r=e.concat(i.filter(a=>a&&!o.includes(a)))}else r=e;this._control.setDescribedByIds(r),this._describedByIds=e}}_getOutlinedLabelOffset(){if(!this._hasOutline()||!this._floatingLabel)return null;if(!this._iconPrefixContainer&&!this._textPrefixContainer)return["",null];if(!this._isAttachedToDom())return null;let e=this._iconPrefixContainer?.nativeElement,i=this._textPrefixContainer?.nativeElement,r=this._iconSuffixContainer?.nativeElement,o=this._textSuffixContainer?.nativeElement,a=e?.getBoundingClientRect().width??0,s=i?.getBoundingClientRect().width??0,l=r?.getBoundingClientRect().width??0,c=o?.getBoundingClientRect().width??0,d=this._currentDirection==="rtl"?"-1":"1",f=`${a+s}px`,h=`calc(${d} * (${f} + var(--mat-mdc-form-field-label-offset-x, 0px)))`,_=`var(--mat-mdc-form-field-label-transform, ${lL} translateX(${h}))`,D=a+s+l+c;return[_,D]}_writeOutlinedLabelStyles(e){if(e!==null){let[i,r]=e;this._floatingLabel&&(this._floatingLabel.element.style.transform=i),r!==null&&this._notchedOutline?._setMaxWidth(r)}}_isAttachedToDom(){let e=this._elementRef.nativeElement;if(e.getRootNode){let i=e.getRootNode();return i&&i!==e}return document.documentElement.contains(e)}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["mat-form-field"]],contentQueries:function(i,r,o){if(i&1&&(nu(o,r._labelChild,Cv,5),Mn(o,za,5)(o,rL,5)(o,LS,5)(o,iL,5)(o,zl,5)),i&2){ru();let a;B(a=j())&&(r._formFieldControl=a.first),B(a=j())&&(r._prefixChildren=a),B(a=j())&&(r._suffixChildren=a),B(a=j())&&(r._errorChildren=a),B(a=j())&&(r._hintChildren=a)}},viewQuery:function(i,r){if(i&1&&(iu(r._iconPrefixContainerSignal,MS,5)(r._textPrefixContainerSignal,IS,5)(r._iconSuffixContainerSignal,kS,5)(r._textSuffixContainerSignal,TS,5),ve(LP,5)(MS,5)(IS,5)(kS,5)(TS,5)(AS,5)(OS,5)(NS,5)),i&2){ru(4);let o;B(o=j())&&(r._textField=o.first),B(o=j())&&(r._iconPrefixContainer=o.first),B(o=j())&&(r._textPrefixContainer=o.first),B(o=j())&&(r._iconSuffixContainer=o.first),B(o=j())&&(r._textSuffixContainer=o.first),B(o=j())&&(r._floatingLabel=o.first),B(o=j())&&(r._notchedOutline=o.first),B(o=j())&&(r._lineRipple=o.first)}},hostAttrs:[1,"mat-mdc-form-field"],hostVars:38,hostBindings:function(i,r){i&2&&O("mat-mdc-form-field-label-always-float",r._shouldAlwaysFloat())("mat-mdc-form-field-has-icon-prefix",r._hasIconPrefix)("mat-mdc-form-field-has-icon-suffix",r._hasIconSuffix)("mat-form-field-invalid",r._control.errorState)("mat-form-field-disabled",r._control.disabled)("mat-form-field-autofilled",r._control.autofilled)("mat-form-field-appearance-fill",r.appearance=="fill")("mat-form-field-appearance-outline",r.appearance=="outline")("mat-form-field-hide-placeholder",r._hasFloatingLabel()&&!r._shouldLabelFloat())("mat-primary",r.color!=="accent"&&r.color!=="warn")("mat-accent",r.color==="accent")("mat-warn",r.color==="warn")("ng-untouched",r._shouldForward("untouched"))("ng-touched",r._shouldForward("touched"))("ng-pristine",r._shouldForward("pristine"))("ng-dirty",r._shouldForward("dirty"))("ng-valid",r._shouldForward("valid"))("ng-invalid",r._shouldForward("invalid"))("ng-pending",r._shouldForward("pending"))},inputs:{hideRequiredMarker:"hideRequiredMarker",color:"color",floatLabel:"floatLabel",appearance:"appearance",subscriptSizing:"subscriptSizing",hintLabel:"hintLabel"},exportAs:["matFormField"],features:[xe([{provide:Lo,useExisting:t},{provide:VS,useExisting:t}])],ngContentSelectors:BP,decls:18,vars:21,consts:[["labelTemplate",""],["textField",""],["iconPrefixContainer",""],["textPrefixContainer",""],["textSuffixContainer",""],["iconSuffixContainer",""],[1,"mat-mdc-text-field-wrapper","mdc-text-field",3,"click"],[1,"mat-mdc-form-field-focus-overlay"],[1,"mat-mdc-form-field-flex"],["matFormFieldNotchedOutline","",3,"matFormFieldNotchedOutlineOpen"],[1,"mat-mdc-form-field-icon-prefix"],[1,"mat-mdc-form-field-text-prefix"],[1,"mat-mdc-form-field-infix"],[3,"ngTemplateOutlet"],[1,"mat-mdc-form-field-text-suffix"],[1,"mat-mdc-form-field-icon-suffix"],["matFormFieldLineRipple",""],["aria-atomic","true","aria-live","polite",1,"mat-mdc-form-field-subscript-wrapper","mat-mdc-form-field-bottom-align"],[1,"mat-mdc-form-field-error-wrapper"],[1,"mat-mdc-form-field-hint-wrapper"],["matFormFieldFloatingLabel","",3,"floating","monitorResize","id"],["aria-hidden","true",1,"mat-mdc-form-field-required-marker","mdc-floating-label--required"],[3,"id"],[1,"mat-mdc-form-field-hint-spacer"]],template:function(i,r){if(i&1&&(we(VP),fn(0,zP,1,1,"ng-template",null,0,vg),p(2,"div",6,1),x("click",function(a){return r._control.onContainerClick(a)}),ge(4,UP,1,0,"div",7),p(5,"div",8),ge(6,WP,2,2,"div",9),ge(7,qP,3,0,"div",10),ge(8,YP,3,0,"div",11),p(9,"div",12),ge(10,QP,1,1,null,13),Z(11),g(),ge(12,ZP,3,0,"div",14),ge(13,XP,3,0,"div",15),g(),ge(14,JP,1,0,"div",16),g(),p(15,"div",17),ge(16,eL,2,0,"div",18)(17,nL,5,1,"div",19),g()),i&2){let o;v(2),O("mdc-text-field--filled",!r._hasOutline())("mdc-text-field--outlined",r._hasOutline())("mdc-text-field--no-label",!r._hasFloatingLabel())("mdc-text-field--disabled",r._control.disabled)("mdc-text-field--invalid",r._control.errorState),v(2),_e(!r._hasOutline()&&!r._control.disabled?4:-1),v(2),_e(r._hasOutline()?6:-1),v(),_e(r._hasIconPrefix?7:-1),v(),_e(r._hasTextPrefix?8:-1),v(2),_e(!r._hasOutline()||r._forceDisplayInfixLabel()?10:-1),v(2),_e(r._hasTextSuffix?12:-1),v(),_e(r._hasIconSuffix?13:-1),v(),_e(r._hasOutline()?-1:14),v(),O("mat-mdc-form-field-subscript-dynamic-size",r.subscriptSizing==="dynamic");let a=r._getSubscriptMessageType();v(),_e((o=a)==="error"?16:o==="hint"?17:-1)}},dependencies:[AS,OS,Ag,NS,zl],styles:[`.mdc-text-field {
  display: inline-flex;
  align-items: baseline;
  padding: 0 16px;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  will-change: opacity, transform, color;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.mdc-text-field__input {
  width: 100%;
  min-width: 0;
  border: none;
  border-radius: 0;
  background: none;
  padding: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  height: 28px;
}
.mdc-text-field__input::-webkit-calendar-picker-indicator, .mdc-text-field__input::-webkit-search-cancel-button {
  display: none;
}
.mdc-text-field__input::-ms-clear {
  display: none;
}
.mdc-text-field__input:focus {
  outline: none;
}
.mdc-text-field__input:invalid {
  box-shadow: none;
}
.mdc-text-field__input::placeholder {
  opacity: 0;
}
.mdc-text-field__input::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field__input::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field__input:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mdc-text-field--focused .mdc-text-field__input::placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  opacity: 1;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--outlined .mdc-text-field__input, .mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input {
  height: 100%;
}
.mdc-text-field--outlined .mdc-text-field__input {
  display: flex;
  border: none !important;
  background-color: transparent;
}
.mdc-text-field--disabled .mdc-text-field__input {
  pointer-events: auto;
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--mat-form-field-filled-input-text-color, var(--mat-sys-on-surface));
  caret-color: var(--mat-form-field-filled-caret-color, var(--mat-sys-primary));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--mat-form-field-outlined-input-text-color, var(--mat-sys-on-surface));
  caret-color: var(--mat-form-field-outlined-caret-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--mat-form-field-filled-error-caret-color, var(--mat-sys-error));
}
.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--mat-form-field-outlined-error-caret-color, var(--mat-sys-error));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--mat-form-field-filled-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--mat-form-field-outlined-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-text-field__input {
    background-color: Window;
  }
}

.mdc-text-field--filled {
  height: 56px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-top-left-radius: var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));
  border-top-right-radius: var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) {
  background-color: var(--mat-form-field-filled-container-color, var(--mat-sys-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled {
  background-color: var(--mat-form-field-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 4%, transparent));
}

.mdc-text-field--outlined {
  height: 56px;
  overflow: visible;
  padding-right: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
  padding-left: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);
}
[dir=rtl] .mdc-text-field--outlined {
  padding-right: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);
  padding-left: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
}

.mdc-floating-label {
  position: absolute;
  left: 0;
  transform-origin: left top;
  line-height: 1.15rem;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: text;
  overflow: hidden;
  will-change: transform;
}
[dir=rtl] .mdc-floating-label {
  right: 0;
  left: auto;
  transform-origin: right top;
  text-align: right;
}
.mdc-text-field .mdc-floating-label {
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
.mdc-notched-outline .mdc-floating-label {
  display: inline-block;
  position: relative;
  max-width: 100%;
}
.mdc-text-field--outlined .mdc-floating-label {
  left: 4px;
  right: auto;
}
[dir=rtl] .mdc-text-field--outlined .mdc-floating-label {
  left: auto;
  right: 4px;
}
.mdc-text-field--filled .mdc-floating-label {
  left: 16px;
  right: auto;
}
[dir=rtl] .mdc-text-field--filled .mdc-floating-label {
  left: auto;
  right: 16px;
}
.mdc-text-field--disabled .mdc-floating-label {
  cursor: default;
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-floating-label {
    z-index: 1;
  }
}
.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label {
  display: none;
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--mat-form-field-filled-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-filled-focus-label-text-color, var(--mat-sys-primary));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--mat-form-field-filled-hover-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label {
  color: var(--mat-form-field-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--mat-form-field-filled-error-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-filled-error-focus-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--mat-form-field-filled-error-hover-label-text-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--filled .mdc-floating-label {
  font-family: var(--mat-form-field-filled-label-text-font, var(--mat-sys-body-large-font));
  font-size: var(--mat-form-field-filled-label-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-form-field-filled-label-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-form-field-filled-label-text-tracking, var(--mat-sys-body-large-tracking));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--mat-form-field-outlined-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-outlined-focus-label-text-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--mat-form-field-outlined-hover-label-text-color, var(--mat-sys-on-surface));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label {
  color: var(--mat-form-field-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-focus-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-hover-label-text-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--outlined .mdc-floating-label {
  font-family: var(--mat-form-field-outlined-label-text-font, var(--mat-sys-body-large-font));
  font-size: var(--mat-form-field-outlined-label-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-form-field-outlined-label-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-form-field-outlined-label-text-tracking, var(--mat-sys-body-large-tracking));
}

.mdc-floating-label--float-above {
  cursor: auto;
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--filled .mdc-floating-label--float-above {
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--outlined .mdc-floating-label--float-above {
  transform: translateY(-37.25px) scale(1);
  font-size: 0.75rem;
}
.mdc-notched-outline .mdc-floating-label--float-above {
  text-overflow: clip;
}
.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: 133.3333333333%;
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  transform: translateY(-34.75px) scale(0.75);
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: 1rem;
}

.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 1px;
  margin-right: 0;
  content: "*";
}
[dir=rtl] .mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 0;
  margin-right: 1px;
}

.mdc-notched-outline {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 100%;
  text-align: left;
  pointer-events: none;
}
[dir=rtl] .mdc-notched-outline {
  text-align: right;
}
.mdc-text-field--outlined .mdc-notched-outline {
  z-index: 1;
}

.mat-mdc-notch-piece {
  box-sizing: border-box;
  height: 100%;
  pointer-events: none;
  border: none;
  border-top: 1px solid;
  border-bottom: 1px solid;
}
.mdc-text-field--focused .mat-mdc-notch-piece {
  border-width: 2px;
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-outline-color, var(--mat-sys-outline));
  border-width: var(--mat-form-field-outlined-outline-width, 1px);
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-hover-outline-color, var(--mat-sys-on-surface));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-focus-outline-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-outline-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-notched-outline .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-hover-outline-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-focus-outline-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mat-mdc-notch-piece {
  border-width: var(--mat-form-field-outlined-focus-outline-width, 2px);
}

.mdc-notched-outline__leading {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading {
  width: max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
}
[dir=rtl] .mdc-notched-outline__leading {
  border-left: none;
  border-right: 1px solid;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  border-top-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}

.mdc-notched-outline__trailing {
  flex-grow: 1;
  border-left: none;
  border-right: 1px solid;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}
[dir=rtl] .mdc-notched-outline__trailing {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}

.mdc-notched-outline__notch {
  flex: 0 0 auto;
  width: auto;
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch {
  max-width: min(var(--mat-form-field-notch-max-width, 100%), calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  max-width: min(100%, calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 1px;
}
.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 2px;
}
.mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 0;
  padding-right: 8px;
  border-top: none;
}
[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 8px;
  padding-right: 0;
}
.mdc-notched-outline--no-label .mdc-notched-outline__notch {
  display: none;
}

.mdc-line-ripple::before, .mdc-line-ripple::after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom-style: solid;
  content: "";
}
.mdc-line-ripple::before {
  z-index: 1;
  border-bottom-width: var(--mat-form-field-filled-active-indicator-height, 1px);
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-active-indicator-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-hover-active-indicator-color, var(--mat-sys-on-surface));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-disabled-active-indicator-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-error-active-indicator-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-error-hover-active-indicator-color, var(--mat-sys-on-error-container));
}
.mdc-line-ripple::after {
  transform: scaleX(0);
  opacity: 0;
  z-index: 2;
}
.mdc-text-field--filled .mdc-line-ripple::after {
  border-bottom-width: var(--mat-form-field-filled-focus-active-indicator-height, 2px);
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--mat-form-field-filled-focus-active-indicator-color, var(--mat-sys-primary));
}
.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--mat-form-field-filled-error-focus-active-indicator-color, var(--mat-sys-error));
}

.mdc-line-ripple--active::after {
  transform: scaleX(1);
  opacity: 1;
}

.mdc-line-ripple--deactivating::after {
  opacity: 0;
}

.mdc-text-field--disabled {
  pointer-events: none;
}

.mat-mdc-form-field-textarea-control {
  vertical-align: middle;
  resize: vertical;
  box-sizing: border-box;
  height: auto;
  margin: 0;
  padding: 0;
  border: none;
  overflow: auto;
}

.mat-mdc-form-field-input-control.mat-mdc-form-field-input-control {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font: inherit;
  letter-spacing: inherit;
  text-decoration: inherit;
  text-transform: inherit;
  border: none;
}

.mat-mdc-form-field .mat-mdc-floating-label.mdc-floating-label {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  line-height: normal;
  pointer-events: all;
  will-change: auto;
}

.mat-mdc-form-field:not(.mat-form-field-disabled) .mat-mdc-floating-label.mdc-floating-label {
  cursor: inherit;
}

.mdc-text-field--no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,
.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control {
  height: auto;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control.mdc-text-field__input[type=color] {
  height: 23px;
}

.mat-mdc-text-field-wrapper {
  height: auto;
  flex: auto;
  will-change: auto;
}

.mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-left: 0;
  --mat-mdc-form-field-label-offset-x: -16px;
}

.mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

[dir=rtl] .mat-mdc-text-field-wrapper {
  padding-left: 16px;
  padding-right: 16px;
}
[dir=rtl] .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-left: 0;
}
[dir=rtl] .mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

.mat-form-field-disabled .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
  opacity: 1;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mat-mdc-floating-label {
  left: auto;
  right: auto;
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input {
  display: inline-block;
}

.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch {
  padding-top: 0;
}

.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: 1px solid transparent;
}

[dir=rtl] .mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: none;
  border-right: 1px solid transparent;
}

.mat-mdc-form-field-infix {
  min-height: var(--mat-form-field-container-height, 56px);
  padding-top: var(--mat-form-field-filled-with-label-container-padding-top, 24px);
  padding-bottom: var(--mat-form-field-filled-with-label-container-padding-bottom, 8px);
}
.mdc-text-field--outlined .mat-mdc-form-field-infix, .mdc-text-field--no-label .mat-mdc-form-field-infix {
  padding-top: var(--mat-form-field-container-vertical-padding, 16px);
  padding-bottom: var(--mat-form-field-container-vertical-padding, 16px);
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label {
  top: calc(var(--mat-form-field-container-height, 56px) / 2);
}

.mdc-text-field--filled .mat-mdc-floating-label {
  display: var(--mat-form-field-filled-label-display, block);
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  --mat-mdc-form-field-label-transform: translateY(calc(calc(6.75px + var(--mat-form-field-container-height, 56px) / 2) * -1))
    scale(var(--mat-mdc-form-field-floating-label-scale, 0.75));
  transform: var(--mat-mdc-form-field-label-transform);
}

@keyframes _mat-form-field-subscript-animation {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.mat-mdc-form-field-subscript-wrapper {
  box-sizing: border-box;
  width: 100%;
  position: relative;
}

.mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-error-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 16px;
  opacity: 1;
  transform: translateY(0);
  animation: _mat-form-field-subscript-animation 0ms cubic-bezier(0.55, 0, 0.55, 0.2);
}

.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-error-wrapper {
  position: static;
}

.mat-mdc-form-field-bottom-align::before {
  content: "";
  display: inline-block;
  height: 16px;
}

.mat-mdc-form-field-bottom-align.mat-mdc-form-field-subscript-dynamic-size::before {
  content: unset;
}

.mat-mdc-form-field-hint-end {
  order: 1;
}

.mat-mdc-form-field-hint-wrapper {
  display: flex;
}

.mat-mdc-form-field-hint-spacer {
  flex: 1 0 1em;
}

.mat-mdc-form-field-error {
  display: block;
  color: var(--mat-form-field-error-text-color, var(--mat-sys-error));
}

.mat-mdc-form-field-subscript-wrapper,
.mat-mdc-form-field-bottom-align::before {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--mat-form-field-subscript-text-font, var(--mat-sys-body-small-font));
  line-height: var(--mat-form-field-subscript-text-line-height, var(--mat-sys-body-small-line-height));
  font-size: var(--mat-form-field-subscript-text-size, var(--mat-sys-body-small-size));
  letter-spacing: var(--mat-form-field-subscript-text-tracking, var(--mat-sys-body-small-tracking));
  font-weight: var(--mat-form-field-subscript-text-weight, var(--mat-sys-body-small-weight));
}

.mat-mdc-form-field-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  opacity: 0;
  pointer-events: none;
  background-color: var(--mat-form-field-state-layer-color, var(--mat-sys-on-surface));
}
.mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-focus-overlay {
  opacity: var(--mat-form-field-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay {
  opacity: var(--mat-form-field-focus-state-layer-opacity, 0);
}

select.mat-mdc-form-field-input-control {
  -moz-appearance: none;
  -webkit-appearance: none;
  background-color: transparent;
  display: inline-flex;
  box-sizing: border-box;
}
select.mat-mdc-form-field-input-control:not(:disabled) {
  cursor: pointer;
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option {
  color: var(--mat-form-field-select-option-text-color, var(--mat-sys-neutral10));
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option:disabled {
  color: var(--mat-form-field-select-disabled-option-text-color, color-mix(in srgb, var(--mat-sys-neutral10) 38%, transparent));
}

.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  content: "";
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -2.5px;
  pointer-events: none;
  color: var(--mat-form-field-enabled-select-arrow-color, var(--mat-sys-on-surface-variant));
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  right: auto;
  left: 0;
}
.mat-mdc-form-field-type-mat-native-select.mat-focused .mat-mdc-form-field-infix::after {
  color: var(--mat-form-field-focus-select-arrow-color, var(--mat-sys-primary));
}
.mat-mdc-form-field-type-mat-native-select.mat-form-field-disabled .mat-mdc-form-field-infix::after {
  color: var(--mat-form-field-disabled-select-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 15px;
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 0;
  padding-left: 15px;
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill .mat-mdc-text-field-wrapper {
    outline: solid 1px;
  }
}
@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-form-field-disabled .mat-mdc-text-field-wrapper {
    outline-color: GrayText;
  }
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-focused .mat-mdc-text-field-wrapper {
    outline: dashed 3px;
  }
}

@media (forced-colors: active) {
  .mat-mdc-form-field.mat-focused .mdc-notched-outline {
    border: dashed 3px;
  }
}

.mat-mdc-form-field-input-control[type=date], .mat-mdc-form-field-input-control[type=datetime], .mat-mdc-form-field-input-control[type=datetime-local], .mat-mdc-form-field-input-control[type=month], .mat-mdc-form-field-input-control[type=week], .mat-mdc-form-field-input-control[type=time] {
  line-height: 1;
}
.mat-mdc-form-field-input-control::-webkit-datetime-edit {
  line-height: 1;
  padding: 0;
  margin-bottom: -2px;
}

.mat-mdc-form-field {
  --mat-mdc-form-field-floating-label-scale: 0.75;
  display: inline-flex;
  flex-direction: column;
  min-width: 0;
  text-align: left;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--mat-form-field-container-text-font, var(--mat-sys-body-large-font));
  line-height: var(--mat-form-field-container-text-line-height, var(--mat-sys-body-large-line-height));
  font-size: var(--mat-form-field-container-text-size, var(--mat-sys-body-large-size));
  letter-spacing: var(--mat-form-field-container-text-tracking, var(--mat-sys-body-large-tracking));
  font-weight: var(--mat-form-field-container-text-weight, var(--mat-sys-body-large-weight));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-floating-label--float-above {
  font-size: calc(var(--mat-form-field-outlined-label-text-populated-size) * var(--mat-mdc-form-field-floating-label-scale));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: var(--mat-form-field-outlined-label-text-populated-size);
}
[dir=rtl] .mat-mdc-form-field {
  text-align: right;
}

.mat-mdc-form-field-flex {
  display: inline-flex;
  align-items: baseline;
  box-sizing: border-box;
  width: 100%;
}

.mat-mdc-text-field-wrapper {
  width: 100%;
  z-index: 0;
}

.mat-mdc-form-field-icon-prefix,
.mat-mdc-form-field-icon-suffix {
  align-self: center;
  line-height: 0;
  pointer-events: auto;
  position: relative;
  z-index: 1;
}
.mat-mdc-form-field-icon-prefix > .mat-icon,
.mat-mdc-form-field-icon-suffix > .mat-icon {
  padding: 0 12px;
  box-sizing: content-box;
}

.mat-mdc-form-field-icon-prefix {
  color: var(--mat-form-field-leading-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-prefix {
  color: var(--mat-form-field-disabled-leading-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-trailing-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-disabled-trailing-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-invalid .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-trailing-icon-color, var(--mat-sys-error));
}
.mat-form-field-invalid:not(.mat-focused):not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-hover-trailing-icon-color, var(--mat-sys-on-error-container));
}
.mat-form-field-invalid.mat-focused .mat-mdc-text-field-wrapper .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-focus-trailing-icon-color, var(--mat-sys-error));
}

.mat-mdc-form-field-icon-prefix,
[dir=rtl] .mat-mdc-form-field-icon-suffix {
  padding: 0 4px 0 0;
}

.mat-mdc-form-field-icon-suffix,
[dir=rtl] .mat-mdc-form-field-icon-prefix {
  padding: 0 0 0 4px;
}

.mat-mdc-form-field-subscript-wrapper .mat-icon,
.mat-mdc-form-field label .mat-icon {
  width: 1em;
  height: 1em;
  font-size: inherit;
}

.mat-mdc-form-field-infix {
  flex: auto;
  min-width: 0;
  width: 180px;
  position: relative;
  box-sizing: border-box;
}
.mat-mdc-form-field-infix:has(textarea[cols]) {
  width: auto;
}

.mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: -1px;
  -webkit-clip-path: inset(-9em -999em -9em 1px);
  clip-path: inset(-9em -999em -9em 1px);
}
[dir=rtl] .mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: 0;
  margin-right: -1px;
  -webkit-clip-path: inset(-9em 1px -9em -999em);
  clip-path: inset(-9em 1px -9em -999em);
}

.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-floating-label {
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input {
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-moz-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-webkit-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input:-ms-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before {
  transition-duration: 75ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-line-ripple::after {
  transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-error-wrapper {
  animation-duration: 300ms;
}

.mdc-notched-outline .mdc-floating-label {
  max-width: calc(100% + 1px);
}

.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: calc(133.3333333333% + 1px);
}
`],encapsulation:2,changeDetection:0})}return t})();var Gf=(()=>{class t{isErrorState(e,i){return!!(e&&e.invalid&&(e.touched||i&&i.submitted))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Ua=class{_defaultMatcher;ngControl;_parentFormGroup;_parentForm;_stateChanges;errorState=!1;matcher;constructor(n,e,i,r,o){this._defaultMatcher=n,this.ngControl=e,this._parentFormGroup=i,this._parentForm=r,this._stateChanges=o}updateErrorState(){let n=this.errorState,e=this._parentFormGroup||this._parentForm,i=this.matcher||this._defaultMatcher,r=this.ngControl?this.ngControl.control:null,o=i?.isErrorState(r,e)??!1;o!==n&&(this.errorState=o,this._stateChanges.next())}};var cL=["mat-calendar-body",""];function dL(t,n){return this._trackRow(n)}var GS=(t,n)=>n.id;function uL(t,n){if(t&1&&(We(0,"tr",0)(1,"td",3),y(2),Ke()()),t&2){let e=X();v(),Bi("padding-top",e._cellPadding)("padding-bottom",e._cellPadding),ce("colspan",e.numCols),v(),Qe(" ",e.label," ")}}function fL(t,n){if(t&1&&(We(0,"td",3),y(1),Ke()),t&2){let e=X(2);Bi("padding-top",e._cellPadding)("padding-bottom",e._cellPadding),ce("colspan",e._firstRowOffset),v(),Qe(" ",e._firstRowOffset>=e.labelMinRequiredCells?e.label:""," ")}}function hL(t,n){if(t&1){let e=ke();We(0,"td",6)(1,"button",7),pa("click",function(r){let o=L(e).$implicit,a=X(2);return V(a._cellClicked(o,r))})("focus",function(r){let o=L(e).$implicit,a=X(2);return V(a._emitActiveDateChange(o,r))}),We(2,"span",8),y(3),Ke(),wt(4,"span",9),Ke()()}if(t&2){let e=n.$implicit,i=n.$index,r=X().$index,o=X();Bi("width",o._cellWidth)("padding-top",o._cellPadding)("padding-bottom",o._cellPadding),ce("data-mat-row",r)("data-mat-col",i),v(),_t(e.cssClasses),O("mat-calendar-body-disabled",!e.enabled)("mat-calendar-body-active",o._isActiveCell(r,i))("mat-calendar-body-range-start",o._isRangeStart(e.compareValue))("mat-calendar-body-range-end",o._isRangeEnd(e.compareValue))("mat-calendar-body-in-range",o._isInRange(e.compareValue))("mat-calendar-body-comparison-bridge-start",o._isComparisonBridgeStart(e.compareValue,r,i))("mat-calendar-body-comparison-bridge-end",o._isComparisonBridgeEnd(e.compareValue,r,i))("mat-calendar-body-comparison-start",o._isComparisonStart(e.compareValue))("mat-calendar-body-comparison-end",o._isComparisonEnd(e.compareValue))("mat-calendar-body-in-comparison-range",o._isInComparisonRange(e.compareValue))("mat-calendar-body-preview-start",o._isPreviewStart(e.compareValue))("mat-calendar-body-preview-end",o._isPreviewEnd(e.compareValue))("mat-calendar-body-in-preview",o._isInPreview(e.compareValue)),gt("tabIndex",o._isActiveCell(r,i)?0:-1),ce("aria-label",e.ariaLabel)("aria-disabled",!e.enabled||null)("aria-pressed",o._isSelected(e.compareValue))("aria-current",o.todayValue===e.compareValue?"date":null)("aria-describedby",o._getDescribedby(e.compareValue)),v(),O("mat-calendar-body-selected",o._isSelected(e.compareValue))("mat-calendar-body-comparison-identical",o._isComparisonIdentical(e.compareValue))("mat-calendar-body-today",o.todayValue===e.compareValue),v(),Qe(" ",e.displayValue," ")}}function mL(t,n){if(t&1&&(We(0,"tr",1),ge(1,fL,2,6,"td",4),Jn(2,hL,5,49,"td",5,GS),Ke()),t&2){let e=n.$implicit,i=n.$index,r=X();v(),_e(i===0&&r._firstRowOffset?1:-1),v(),ei(e)}}function pL(t,n){if(t&1&&(p(0,"th",2)(1,"span",6),y(2),g(),p(3,"span",3),y(4),g()()),t&2){let e=n.$implicit;v(2),ct(e.long),v(2),ct(e.narrow)}}var gL=["*"];function _L(t,n){}function vL(t,n){if(t&1){let e=ke();p(0,"mat-month-view",4),Be("activeDateChange",function(r){L(e);let o=X();return ze(o.activeDate,r)||(o.activeDate=r),V(r)}),x("_userSelection",function(r){L(e);let o=X();return V(o._dateSelected(r))})("dragStarted",function(r){L(e);let o=X();return V(o._dragStarted(r))})("dragEnded",function(r){L(e);let o=X();return V(o._dragEnded(r))}),g()}if(t&2){let e=X();Ve("activeDate",e.activeDate),T("selected",e.selected)("dateFilter",e.dateFilter)("maxDate",e.maxDate)("minDate",e.minDate)("dateClass",e.dateClass)("comparisonStart",e.comparisonStart)("comparisonEnd",e.comparisonEnd)("startDateAccessibleName",e.startDateAccessibleName)("endDateAccessibleName",e.endDateAccessibleName)("activeDrag",e._activeDrag)}}function yL(t,n){if(t&1){let e=ke();p(0,"mat-year-view",5),Be("activeDateChange",function(r){L(e);let o=X();return ze(o.activeDate,r)||(o.activeDate=r),V(r)}),x("monthSelected",function(r){L(e);let o=X();return V(o._monthSelectedInYearView(r))})("selectedChange",function(r){L(e);let o=X();return V(o._goToDateInView(r,"month"))}),g()}if(t&2){let e=X();Ve("activeDate",e.activeDate),T("selected",e.selected)("dateFilter",e.dateFilter)("maxDate",e.maxDate)("minDate",e.minDate)("dateClass",e.dateClass)}}function bL(t,n){if(t&1){let e=ke();p(0,"mat-multi-year-view",6),Be("activeDateChange",function(r){L(e);let o=X();return ze(o.activeDate,r)||(o.activeDate=r),V(r)}),x("yearSelected",function(r){L(e);let o=X();return V(o._yearSelectedInMultiYearView(r))})("selectedChange",function(r){L(e);let o=X();return V(o._goToDateInView(r,"year"))}),g()}if(t&2){let e=X();Ve("activeDate",e.activeDate),T("selected",e.selected)("dateFilter",e.dateFilter)("maxDate",e.maxDate)("minDate",e.minDate)("dateClass",e.dateClass)}}function DL(t,n){}var CL=["button"],wL=[[["","matDatepickerToggleIcon",""]]],EL=["[matDatepickerToggleIcon]"];function xL(t,n){t&1&&(dn(),p(0,"svg",2),ie(1,"path",3),g())}var Wa=(()=>{class t{changes=new M;calendarLabel="Calendar";openCalendarLabel="Open calendar";closeCalendarLabel="Close calendar";prevMonthLabel="Previous month";nextMonthLabel="Next month";prevYearLabel="Previous year";nextYearLabel="Next year";prevMultiYearLabel="Previous 24 years";nextMultiYearLabel="Next 24 years";switchToMonthViewLabel="Choose date";switchToMultiYearViewLabel="Choose month and year";startDateLabel="Start date";endDateLabel="End date";comparisonDateLabel="Comparison range";formatYearRange(e,i){return`${e} \u2013 ${i}`}formatYearRangeLabel(e,i){return`${e} to ${i}`}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),SL=0,$l=class{value;displayValue;ariaLabel;enabled;compareValue;rawValue;id=SL++;cssClasses;constructor(n,e,i,r,o,a=n,s){this.value=n,this.displayValue=e,this.ariaLabel=i,this.enabled=r,this.compareValue=a,this.rawValue=s,this.cssClasses=o instanceof Set?Array.from(o):o}},ML={passive:!1,capture:!0},Wf={passive:!0,capture:!0},BS={passive:!0},Ga=(()=>{class t{_elementRef=u(P);_ngZone=u(A);_platform=u(Ce);_intl=u(Wa);_eventCleanups;_skipNextFocus=!1;_focusActiveCellAfterViewChecked=!1;label;rows;todayValue;startValue;endValue;labelMinRequiredCells;numCols=7;activeCell=0;ngAfterViewChecked(){this._focusActiveCellAfterViewChecked&&(this._focusActiveCell(),this._focusActiveCellAfterViewChecked=!1)}isRange=!1;cellAspectRatio=1;comparisonStart=null;comparisonEnd=null;previewStart=null;previewEnd=null;startDateAccessibleName=null;endDateAccessibleName=null;selectedValueChange=new S;previewChange=new S;activeDateChange=new S;dragStarted=new S;dragEnded=new S;_firstRowOffset;_cellPadding;_cellWidth;_startDateLabelId;_endDateLabelId;_comparisonStartDateLabelId;_comparisonEndDateLabelId;_didDragSinceMouseDown=!1;_injector=u(ne);comparisonDateAccessibleName=this._intl.comparisonDateLabel;_trackRow=e=>e;constructor(){let e=u($e),i=u(qe);this._startDateLabelId=i.getId("mat-calendar-body-start-"),this._endDateLabelId=i.getId("mat-calendar-body-end-"),this._comparisonStartDateLabelId=i.getId("mat-calendar-body-comparison-start-"),this._comparisonEndDateLabelId=i.getId("mat-calendar-body-comparison-end-"),u(je).load(Ln),this._ngZone.runOutsideAngular(()=>{let r=this._elementRef.nativeElement,o=[e.listen(r,"touchmove",this._touchmoveHandler,ML),e.listen(r,"mouseenter",this._enterHandler,Wf),e.listen(r,"focus",this._enterHandler,Wf),e.listen(r,"mouseleave",this._leaveHandler,Wf),e.listen(r,"blur",this._leaveHandler,Wf),e.listen(r,"mousedown",this._mousedownHandler,BS),e.listen(r,"touchstart",this._mousedownHandler,BS)];this._platform.isBrowser&&o.push(e.listen("window","mouseup",this._mouseupHandler),e.listen("window","touchend",this._touchendHandler)),this._eventCleanups=o})}_cellClicked(e,i){this._didDragSinceMouseDown||e.enabled&&this.selectedValueChange.emit({value:e.value,event:i})}_emitActiveDateChange(e,i){e.enabled&&this.activeDateChange.emit({value:e.value,event:i})}_isSelected(e){return this.startValue===e||this.endValue===e}ngOnChanges(e){let i=e.numCols,{rows:r,numCols:o}=this;(e.rows||i)&&(this._firstRowOffset=r&&r.length&&r[0].length?o-r[0].length:0),(e.cellAspectRatio||i||!this._cellPadding)&&(this._cellPadding=`${50*this.cellAspectRatio/o}%`),(i||!this._cellWidth)&&(this._cellWidth=`${100/o}%`)}ngOnDestroy(){this._eventCleanups.forEach(e=>e())}_isActiveCell(e,i){let r=e*this.numCols+i;return e&&(r-=this._firstRowOffset),r==this.activeCell}_focusActiveCell(e=!0){At(()=>{setTimeout(()=>{let i=this._elementRef.nativeElement.querySelector(".mat-calendar-body-active");i&&(e||(this._skipNextFocus=!0),i.focus())})},{injector:this._injector})}_scheduleFocusActiveCellAfterViewChecked(){this._focusActiveCellAfterViewChecked=!0}_isRangeStart(e){return Sv(e,this.startValue,this.endValue)}_isRangeEnd(e){return Mv(e,this.startValue,this.endValue)}_isInRange(e){return Iv(e,this.startValue,this.endValue,this.isRange)}_isComparisonStart(e){return Sv(e,this.comparisonStart,this.comparisonEnd)}_isComparisonBridgeStart(e,i,r){if(!this._isComparisonStart(e)||this._isRangeStart(e)||!this._isInRange(e))return!1;let o=this.rows[i][r-1];if(!o){let a=this.rows[i-1];o=a&&a[a.length-1]}return o&&!this._isRangeEnd(o.compareValue)}_isComparisonBridgeEnd(e,i,r){if(!this._isComparisonEnd(e)||this._isRangeEnd(e)||!this._isInRange(e))return!1;let o=this.rows[i][r+1];if(!o){let a=this.rows[i+1];o=a&&a[0]}return o&&!this._isRangeStart(o.compareValue)}_isComparisonEnd(e){return Mv(e,this.comparisonStart,this.comparisonEnd)}_isInComparisonRange(e){return Iv(e,this.comparisonStart,this.comparisonEnd,this.isRange)}_isComparisonIdentical(e){return this.comparisonStart===this.comparisonEnd&&e===this.comparisonStart}_isPreviewStart(e){return Sv(e,this.previewStart,this.previewEnd)}_isPreviewEnd(e){return Mv(e,this.previewStart,this.previewEnd)}_isInPreview(e){return Iv(e,this.previewStart,this.previewEnd,this.isRange)}_getDescribedby(e){if(!this.isRange)return null;if(this.startValue===e&&this.endValue===e)return`${this._startDateLabelId} ${this._endDateLabelId}`;if(this.startValue===e)return this._startDateLabelId;if(this.endValue===e)return this._endDateLabelId;if(this.comparisonStart!==null&&this.comparisonEnd!==null){if(e===this.comparisonStart&&e===this.comparisonEnd)return`${this._comparisonStartDateLabelId} ${this._comparisonEndDateLabelId}`;if(e===this.comparisonStart)return this._comparisonStartDateLabelId;if(e===this.comparisonEnd)return this._comparisonEndDateLabelId}return null}_enterHandler=e=>{if(this._skipNextFocus&&e.type==="focus"){this._skipNextFocus=!1;return}if(e.target&&this.isRange){let i=this._getCellFromElement(e.target);i&&this._ngZone.run(()=>this.previewChange.emit({value:i.enabled?i:null,event:e}))}};_touchmoveHandler=e=>{if(!this.isRange)return;let i=jS(e),r=i?this._getCellFromElement(i):null;i!==e.target&&(this._didDragSinceMouseDown=!0),xv(e.target)&&e.preventDefault(),this._ngZone.run(()=>this.previewChange.emit({value:r?.enabled?r:null,event:e}))};_leaveHandler=e=>{this.previewEnd!==null&&this.isRange&&(e.type!=="blur"&&(this._didDragSinceMouseDown=!0),e.target&&this._getCellFromElement(e.target)&&!(e.relatedTarget&&this._getCellFromElement(e.relatedTarget))&&this._ngZone.run(()=>this.previewChange.emit({value:null,event:e})))};_mousedownHandler=e=>{if(!this.isRange)return;this._didDragSinceMouseDown=!1;let i=e.target&&this._getCellFromElement(e.target);!i||!this._isInRange(i.compareValue)||this._ngZone.run(()=>{this.dragStarted.emit({value:i.rawValue,event:e})})};_mouseupHandler=e=>{if(!this.isRange)return;let i=xv(e.target);if(!i){this._ngZone.run(()=>{this.dragEnded.emit({value:null,event:e})});return}i.closest(".mat-calendar-body")===this._elementRef.nativeElement&&this._ngZone.run(()=>{let r=this._getCellFromElement(i);this.dragEnded.emit({value:r?.rawValue??null,event:e})})};_touchendHandler=e=>{let i=jS(e);i&&this._mouseupHandler({target:i})};_getCellFromElement(e){let i=xv(e);if(i){let r=i.getAttribute("data-mat-row"),o=i.getAttribute("data-mat-col");if(r&&o)return this.rows[parseInt(r)]?.[parseInt(o)]||null}return null}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["","mat-calendar-body",""]],hostAttrs:[1,"mat-calendar-body"],inputs:{label:"label",rows:"rows",todayValue:"todayValue",startValue:"startValue",endValue:"endValue",labelMinRequiredCells:"labelMinRequiredCells",numCols:"numCols",activeCell:"activeCell",isRange:"isRange",cellAspectRatio:"cellAspectRatio",comparisonStart:"comparisonStart",comparisonEnd:"comparisonEnd",previewStart:"previewStart",previewEnd:"previewEnd",startDateAccessibleName:"startDateAccessibleName",endDateAccessibleName:"endDateAccessibleName"},outputs:{selectedValueChange:"selectedValueChange",previewChange:"previewChange",activeDateChange:"activeDateChange",dragStarted:"dragStarted",dragEnded:"dragEnded"},exportAs:["matCalendarBody"],features:[Le],attrs:cL,decls:11,vars:11,consts:[["aria-hidden","true"],["role","row"],[1,"mat-calendar-body-hidden-label",3,"id"],[1,"mat-calendar-body-label"],[1,"mat-calendar-body-label",3,"paddingTop","paddingBottom"],["role","gridcell",1,"mat-calendar-body-cell-container",3,"width","paddingTop","paddingBottom"],["role","gridcell",1,"mat-calendar-body-cell-container"],["type","button",1,"mat-calendar-body-cell",3,"click","focus","tabindex"],[1,"mat-calendar-body-cell-content","mat-focus-indicator"],["aria-hidden","true",1,"mat-calendar-body-cell-preview"]],template:function(i,r){i&1&&(ge(0,uL,3,6,"tr",0),Jn(1,mL,4,1,"tr",1,dL,!0),We(3,"span",2),y(4),Ke(),We(5,"span",2),y(6),Ke(),We(7,"span",2),y(8),Ke(),We(9,"span",2),y(10),Ke()),i&2&&(_e(r._firstRowOffset<r.labelMinRequiredCells?0:-1),v(),ei(r.rows),v(2),gt("id",r._startDateLabelId),v(),Qe(" ",r.startDateAccessibleName,`
`),v(),gt("id",r._endDateLabelId),v(),Qe(" ",r.endDateAccessibleName,`
`),v(),gt("id",r._comparisonStartDateLabelId),v(),Gs(" ",r.comparisonDateAccessibleName," ",r.startDateAccessibleName,`
`),v(),gt("id",r._comparisonEndDateLabelId),v(),Gs(" ",r.comparisonDateAccessibleName," ",r.endDateAccessibleName,`
`))},styles:[`.mat-calendar-body {
  min-width: 224px;
}

.mat-calendar-body-today:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {
  border-color: var(--mat-datepicker-calendar-date-today-outline-color, var(--mat-sys-primary));
}

.mat-calendar-body-label {
  height: 0;
  line-height: 0;
  text-align: start;
  padding-left: 4.7142857143%;
  padding-right: 4.7142857143%;
  font-size: var(--mat-datepicker-calendar-body-label-text-size, var(--mat-sys-title-small-size));
  font-weight: var(--mat-datepicker-calendar-body-label-text-weight, var(--mat-sys-title-small-weight));
  color: var(--mat-datepicker-calendar-body-label-text-color, var(--mat-sys-on-surface));
}

.mat-calendar-body-hidden-label {
  display: none;
}

.mat-calendar-body-cell-container {
  position: relative;
  height: 0;
  line-height: 0;
}

.mat-calendar-body-cell {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: none;
  text-align: center;
  outline: none;
  margin: 0;
  font-family: var(--mat-datepicker-calendar-text-font, var(--mat-sys-body-medium-font));
  font-size: var(--mat-datepicker-calendar-text-size, var(--mat-sys-body-medium-size));
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  outline: none;
  border: none;
  -webkit-tap-highlight-color: transparent;
}
.mat-calendar-body-cell::-moz-focus-inner {
  border: 0;
}

.mat-calendar-body-cell::before,
.mat-calendar-body-cell::after,
.mat-calendar-body-cell-preview {
  content: "";
  position: absolute;
  top: 5%;
  left: 0;
  z-index: 0;
  box-sizing: border-box;
  display: block;
  height: 90%;
  width: 100%;
}

.mat-calendar-body-range-start:not(.mat-calendar-body-in-comparison-range)::before,
.mat-calendar-body-range-start::after,
.mat-calendar-body-comparison-start:not(.mat-calendar-body-comparison-bridge-start)::before,
.mat-calendar-body-comparison-start::after,
.mat-calendar-body-preview-start .mat-calendar-body-cell-preview {
  left: 5%;
  width: 95%;
  border-top-left-radius: 999px;
  border-bottom-left-radius: 999px;
}
[dir=rtl] .mat-calendar-body-range-start:not(.mat-calendar-body-in-comparison-range)::before,
[dir=rtl] .mat-calendar-body-range-start::after,
[dir=rtl] .mat-calendar-body-comparison-start:not(.mat-calendar-body-comparison-bridge-start)::before,
[dir=rtl] .mat-calendar-body-comparison-start::after,
[dir=rtl] .mat-calendar-body-preview-start .mat-calendar-body-cell-preview {
  left: 0;
  border-radius: 0;
  border-top-right-radius: 999px;
  border-bottom-right-radius: 999px;
}

.mat-calendar-body-range-end:not(.mat-calendar-body-in-comparison-range)::before,
.mat-calendar-body-range-end::after,
.mat-calendar-body-comparison-end:not(.mat-calendar-body-comparison-bridge-end)::before,
.mat-calendar-body-comparison-end::after,
.mat-calendar-body-preview-end .mat-calendar-body-cell-preview {
  width: 95%;
  border-top-right-radius: 999px;
  border-bottom-right-radius: 999px;
}
[dir=rtl] .mat-calendar-body-range-end:not(.mat-calendar-body-in-comparison-range)::before,
[dir=rtl] .mat-calendar-body-range-end::after,
[dir=rtl] .mat-calendar-body-comparison-end:not(.mat-calendar-body-comparison-bridge-end)::before,
[dir=rtl] .mat-calendar-body-comparison-end::after,
[dir=rtl] .mat-calendar-body-preview-end .mat-calendar-body-cell-preview {
  left: 5%;
  border-radius: 0;
  border-top-left-radius: 999px;
  border-bottom-left-radius: 999px;
}

[dir=rtl] .mat-calendar-body-comparison-bridge-start.mat-calendar-body-range-end::after,
[dir=rtl] .mat-calendar-body-comparison-bridge-end.mat-calendar-body-range-start::after {
  width: 95%;
  border-top-right-radius: 999px;
  border-bottom-right-radius: 999px;
}

.mat-calendar-body-comparison-start.mat-calendar-body-range-end::after, [dir=rtl] .mat-calendar-body-comparison-start.mat-calendar-body-range-end::after,
.mat-calendar-body-comparison-end.mat-calendar-body-range-start::after,
[dir=rtl] .mat-calendar-body-comparison-end.mat-calendar-body-range-start::after {
  width: 90%;
}

.mat-calendar-body-in-preview {
  color: var(--mat-datepicker-calendar-date-preview-state-outline-color, var(--mat-sys-primary));
}
.mat-calendar-body-in-preview .mat-calendar-body-cell-preview {
  border-top: dashed 1px;
  border-bottom: dashed 1px;
}

.mat-calendar-body-preview-start .mat-calendar-body-cell-preview {
  border-left: dashed 1px;
}
[dir=rtl] .mat-calendar-body-preview-start .mat-calendar-body-cell-preview {
  border-left: 0;
  border-right: dashed 1px;
}

.mat-calendar-body-preview-end .mat-calendar-body-cell-preview {
  border-right: dashed 1px;
}
[dir=rtl] .mat-calendar-body-preview-end .mat-calendar-body-cell-preview {
  border-right: 0;
  border-left: dashed 1px;
}

.mat-calendar-body-disabled {
  cursor: default;
}
.mat-calendar-body-disabled > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {
  color: var(--mat-datepicker-calendar-date-disabled-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-calendar-body-disabled > .mat-calendar-body-today:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {
  border-color: var(--mat-datepicker-calendar-date-today-disabled-state-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mat-calendar-body-disabled {
    opacity: 0.5;
  }
}

.mat-calendar-body-cell-content {
  top: 5%;
  left: 5%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 90%;
  height: 90%;
  line-height: 1;
  border-width: 1px;
  border-style: solid;
  border-radius: 999px;
  color: var(--mat-datepicker-calendar-date-text-color, var(--mat-sys-on-surface));
  border-color: var(--mat-datepicker-calendar-date-outline-color, transparent);
}
.mat-calendar-body-cell-content.mat-focus-indicator {
  position: absolute;
}
@media (forced-colors: active) {
  .mat-calendar-body-cell-content {
    border: none;
  }
}

.cdk-keyboard-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical), .cdk-program-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {
  background-color: var(--mat-datepicker-calendar-date-focus-state-background-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));
}

@media (hover: hover) {
  .mat-calendar-body-cell:not(.mat-calendar-body-disabled):hover > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {
    background-color: var(--mat-datepicker-calendar-date-hover-state-background-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));
  }
}
.mat-calendar-body-selected {
  background-color: var(--mat-datepicker-calendar-date-selected-state-background-color, var(--mat-sys-primary));
  color: var(--mat-datepicker-calendar-date-selected-state-text-color, var(--mat-sys-on-primary));
}
.mat-calendar-body-disabled > .mat-calendar-body-selected {
  background-color: var(--mat-datepicker-calendar-date-selected-disabled-state-background-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-calendar-body-selected.mat-calendar-body-today {
  box-shadow: inset 0 0 0 1px var(--mat-datepicker-calendar-date-today-selected-state-outline-color, var(--mat-sys-primary));
}

.mat-calendar-body-in-range::before {
  background: var(--mat-datepicker-calendar-date-in-range-state-background-color, var(--mat-sys-primary-container));
}

.mat-calendar-body-comparison-identical,
.mat-calendar-body-in-comparison-range::before {
  background: var(--mat-datepicker-calendar-date-in-comparison-range-state-background-color, var(--mat-sys-tertiary-container));
}

.mat-calendar-body-comparison-identical,
.mat-calendar-body-in-comparison-range::before {
  background: var(--mat-datepicker-calendar-date-in-comparison-range-state-background-color, var(--mat-sys-tertiary-container));
}

.mat-calendar-body-comparison-bridge-start::before,
[dir=rtl] .mat-calendar-body-comparison-bridge-end::before {
  background: linear-gradient(to right, var(--mat-datepicker-calendar-date-in-range-state-background-color, var(--mat-sys-primary-container)) 50%, var(--mat-datepicker-calendar-date-in-comparison-range-state-background-color, var(--mat-sys-tertiary-container)) 50%);
}

.mat-calendar-body-comparison-bridge-end::before,
[dir=rtl] .mat-calendar-body-comparison-bridge-start::before {
  background: linear-gradient(to left, var(--mat-datepicker-calendar-date-in-range-state-background-color, var(--mat-sys-primary-container)) 50%, var(--mat-datepicker-calendar-date-in-comparison-range-state-background-color, var(--mat-sys-tertiary-container)) 50%);
}

.mat-calendar-body-in-range > .mat-calendar-body-comparison-identical,
.mat-calendar-body-in-comparison-range.mat-calendar-body-in-range::after {
  background: var(--mat-datepicker-calendar-date-in-overlap-range-state-background-color, var(--mat-sys-secondary-container));
}

.mat-calendar-body-comparison-identical.mat-calendar-body-selected,
.mat-calendar-body-in-comparison-range > .mat-calendar-body-selected {
  background: var(--mat-datepicker-calendar-date-in-overlap-range-selected-state-background-color, var(--mat-sys-secondary));
}

@media (forced-colors: active) {
  .mat-datepicker-popup:not(:empty),
  .mat-calendar-body-cell:not(.mat-calendar-body-in-range) .mat-calendar-body-selected {
    outline: solid 1px;
  }
  .mat-calendar-body-today {
    outline: dotted 1px;
  }
  .mat-calendar-body-cell::before,
  .mat-calendar-body-cell::after,
  .mat-calendar-body-selected {
    background: none;
  }
  .mat-calendar-body-in-range::before,
  .mat-calendar-body-comparison-bridge-start::before,
  .mat-calendar-body-comparison-bridge-end::before {
    border-top: solid 1px;
    border-bottom: solid 1px;
  }
  .mat-calendar-body-range-start::before {
    border-left: solid 1px;
  }
  [dir=rtl] .mat-calendar-body-range-start::before {
    border-left: 0;
    border-right: solid 1px;
  }
  .mat-calendar-body-range-end::before {
    border-right: solid 1px;
  }
  [dir=rtl] .mat-calendar-body-range-end::before {
    border-right: 0;
    border-left: solid 1px;
  }
  .mat-calendar-body-in-comparison-range::before {
    border-top: dashed 1px;
    border-bottom: dashed 1px;
  }
  .mat-calendar-body-comparison-start::before {
    border-left: dashed 1px;
  }
  [dir=rtl] .mat-calendar-body-comparison-start::before {
    border-left: 0;
    border-right: dashed 1px;
  }
  .mat-calendar-body-comparison-end::before {
    border-right: dashed 1px;
  }
  [dir=rtl] .mat-calendar-body-comparison-end::before {
    border-right: 0;
    border-left: dashed 1px;
  }
}
`],encapsulation:2,changeDetection:0})}return t})();function Ev(t){return t?.nodeName==="TD"}function xv(t){let n;return Ev(t)?n=t:Ev(t.parentNode)?n=t.parentNode:Ev(t.parentNode?.parentNode)&&(n=t.parentNode.parentNode),n?.getAttribute("data-mat-row")!=null?n:null}function Sv(t,n,e){return e!==null&&n!==e&&t<e&&t===n}function Mv(t,n,e){return n!==null&&n!==e&&t>=n&&t===e}function Iv(t,n,e,i){return i&&n!==null&&e!==null&&n!==e&&t>=n&&t<=e}function jS(t){let n=t.changedTouches[0];return document.elementFromPoint(n.clientX,n.clientY)}var Bn=class{start;end;_disableStructuralEquivalency;constructor(n,e){this.start=n,this.end=e}},Gl=(()=>{class t{selection;_adapter;_selectionChanged=new M;selectionChanged=this._selectionChanged;constructor(e,i){this.selection=e,this._adapter=i,this.selection=e}updateSelection(e,i){let r=this.selection;this.selection=e,this._selectionChanged.next({selection:e,source:i,oldValue:r})}ngOnDestroy(){this._selectionChanged.complete()}_isValidDateInstance(e){return this._adapter.isDateInstance(e)&&this._adapter.isValid(e)}static \u0275fac=function(i){ng()};static \u0275prov=C({token:t,factory:t.\u0275fac})}return t})(),IL=(()=>{class t extends Gl{constructor(e){super(null,e)}add(e){super.updateSelection(e,this)}isValid(){return this.selection!=null&&this._isValidDateInstance(this.selection)}isComplete(){return this.selection!=null}clone(){let e=new t(this._adapter);return e.updateSelection(this.selection,this),e}static \u0275fac=function(i){return new(i||t)(G(Ht))};static \u0275prov=C({token:t,factory:t.\u0275fac})}return t})();var WS={provide:Gl,useFactory:()=>u(Gl,{optional:!0,skipSelf:!0})||new IL(u(Ht))};var qS=new b("MAT_DATE_RANGE_SELECTION_STRATEGY");var kv=7,kL=0,HS=(()=>{class t{_changeDetectorRef=u(Fe);_dateFormats=u(Ar,{optional:!0});_dateAdapter=u(Ht,{optional:!0});_dir=u(Et,{optional:!0});_rangeStrategy=u(qS,{optional:!0});_rerenderSubscription=se.EMPTY;_selectionKeyPressed=!1;get activeDate(){return this._activeDate}set activeDate(e){let i=this._activeDate,r=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))||this._dateAdapter.today();this._activeDate=this._dateAdapter.clampDate(r,this.minDate,this.maxDate),this._hasSameMonthAndYear(i,this._activeDate)||this._init()}_activeDate;get selected(){return this._selected}set selected(e){e instanceof Bn?this._selected=e:this._selected=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e)),this._setRanges(this._selected)}_selected=null;get minDate(){return this._minDate}set minDate(e){this._minDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_minDate=null;get maxDate(){return this._maxDate}set maxDate(e){this._maxDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_maxDate=null;dateFilter;dateClass;comparisonStart=null;comparisonEnd=null;startDateAccessibleName=null;endDateAccessibleName=null;activeDrag=null;selectedChange=new S;_userSelection=new S;dragStarted=new S;dragEnded=new S;activeDateChange=new S;_matCalendarBody;_monthLabel=re("");_weeks=re([]);_firstWeekOffset=re(0);_rangeStart=re(null);_rangeEnd=re(null);_comparisonRangeStart=re(null);_comparisonRangeEnd=re(null);_previewStart=re(null);_previewEnd=re(null);_isRange=re(!1);_todayDate=re(null);_weekdays=re([]);constructor(){u(je).load(Si),this._activeDate=this._dateAdapter.today()}ngAfterContentInit(){this._rerenderSubscription=this._dateAdapter.localeChanges.pipe(sn(null)).subscribe(()=>this._init())}ngOnChanges(e){let i=e.comparisonStart||e.comparisonEnd;i&&!i.firstChange&&this._setRanges(this.selected),e.activeDrag&&!this.activeDrag&&this._clearPreview()}ngOnDestroy(){this._rerenderSubscription.unsubscribe()}_dateSelected(e){let i=e.value,r=this._getDateFromDayOfMonth(i),o,a;this._selected instanceof Bn?(o=this._getDateInCurrentMonth(this._selected.start),a=this._getDateInCurrentMonth(this._selected.end)):o=a=this._getDateInCurrentMonth(this._selected),(o!==i||a!==i)&&this.selectedChange.emit(r),this._userSelection.emit({value:r,event:e.event}),this._clearPreview(),this._changeDetectorRef.markForCheck()}_updateActiveDate(e){let i=e.value,r=this._activeDate;this.activeDate=this._getDateFromDayOfMonth(i),this._dateAdapter.compareDate(r,this.activeDate)&&this.activeDateChange.emit(this._activeDate)}_handleCalendarBodyKeydown(e){let i=this._activeDate,r=this._isRtl();switch(e.keyCode){case 37:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,r?1:-1);break;case 39:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,r?-1:1);break;case 38:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,-7);break;case 40:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,7);break;case 36:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,1-this._dateAdapter.getDate(this._activeDate));break;case 35:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,this._dateAdapter.getNumDaysInMonth(this._activeDate)-this._dateAdapter.getDate(this._activeDate));break;case 33:this.activeDate=e.altKey?this._dateAdapter.addCalendarYears(this._activeDate,-1):this._dateAdapter.addCalendarMonths(this._activeDate,-1);break;case 34:this.activeDate=e.altKey?this._dateAdapter.addCalendarYears(this._activeDate,1):this._dateAdapter.addCalendarMonths(this._activeDate,1);break;case 13:case 32:this._selectionKeyPressed=!0,this._canSelect(this._activeDate)&&e.preventDefault();return;case 27:this._previewEnd()!=null&&!vt(e)&&(this._clearPreview(),this.activeDrag?this.dragEnded.emit({value:null,event:e}):(this.selectedChange.emit(null),this._userSelection.emit({value:null,event:e})),e.preventDefault(),e.stopPropagation());return;default:return}this._dateAdapter.compareDate(i,this.activeDate)&&(this.activeDateChange.emit(this.activeDate),this._focusActiveCellAfterViewChecked()),e.preventDefault()}_handleCalendarBodyKeyup(e){(e.keyCode===32||e.keyCode===13)&&(this._selectionKeyPressed&&this._canSelect(this._activeDate)&&this._dateSelected({value:this._dateAdapter.getDate(this._activeDate),event:e}),this._selectionKeyPressed=!1)}_init(){this._setRanges(this.selected),this._todayDate.set(this._getCellCompareValue(this._dateAdapter.today())),this._monthLabel.set(this._dateFormats.display.monthLabel?this._dateAdapter.format(this.activeDate,this._dateFormats.display.monthLabel):this._dateAdapter.getMonthNames("short")[this._dateAdapter.getMonth(this.activeDate)].toLocaleUpperCase());let e=this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),this._dateAdapter.getMonth(this.activeDate),1);this._firstWeekOffset.set((kv+this._dateAdapter.getDayOfWeek(e)-this._dateAdapter.getFirstDayOfWeek())%kv),this._initWeekdays(),this._createWeekCells(),this._changeDetectorRef.markForCheck()}_focusActiveCell(e){this._matCalendarBody._focusActiveCell(e)}_focusActiveCellAfterViewChecked(){this._matCalendarBody._scheduleFocusActiveCellAfterViewChecked()}_previewChanged({event:e,value:i}){if(this._rangeStrategy){let r=i?i.rawValue:null,o=this._rangeStrategy.createPreview(r,this.selected,e);if(this._previewStart.set(this._getCellCompareValue(o.start)),this._previewEnd.set(this._getCellCompareValue(o.end)),this.activeDrag&&r){let a=this._rangeStrategy.createDrag?.(this.activeDrag.value,this.selected,r,e);a&&(this._previewStart.set(this._getCellCompareValue(a.start)),this._previewEnd.set(this._getCellCompareValue(a.end)))}}}_dragEnded(e){if(this.activeDrag)if(e.value){let i=this._rangeStrategy?.createDrag?.(this.activeDrag.value,this.selected,e.value,e.event);this.dragEnded.emit({value:i??null,event:e.event})}else this.dragEnded.emit({value:null,event:e.event})}_getDateFromDayOfMonth(e){return this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),this._dateAdapter.getMonth(this.activeDate),e)}_initWeekdays(){let e=this._dateAdapter.getFirstDayOfWeek(),i=this._dateAdapter.getDayOfWeekNames("narrow"),o=this._dateAdapter.getDayOfWeekNames("long").map((a,s)=>({long:a,narrow:i[s],id:kL++}));this._weekdays.set(o.slice(e).concat(o.slice(0,e)))}_createWeekCells(){let e=this._dateAdapter.getNumDaysInMonth(this.activeDate),i=this._dateAdapter.getDateNames(),r=[[]];for(let o=0,a=this._firstWeekOffset();o<e;o++,a++){a==kv&&(r.push([]),a=0);let s=this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),this._dateAdapter.getMonth(this.activeDate),o+1),l=this._shouldEnableDate(s),c=this._dateAdapter.format(s,this._dateFormats.display.dateA11yLabel),d=this.dateClass?this.dateClass(s,"month"):void 0;r[r.length-1].push(new $l(o+1,i[o],c,l,d,this._getCellCompareValue(s),s))}this._weeks.set(r)}_shouldEnableDate(e){return!!e&&(!this.minDate||this._dateAdapter.compareDate(e,this.minDate)>=0)&&(!this.maxDate||this._dateAdapter.compareDate(e,this.maxDate)<=0)&&(!this.dateFilter||this.dateFilter(e))}_getDateInCurrentMonth(e){return e&&this._hasSameMonthAndYear(e,this.activeDate)?this._dateAdapter.getDate(e):null}_hasSameMonthAndYear(e,i){return!!(e&&i&&this._dateAdapter.getMonth(e)==this._dateAdapter.getMonth(i)&&this._dateAdapter.getYear(e)==this._dateAdapter.getYear(i))}_getCellCompareValue(e){if(e){let i=this._dateAdapter.getYear(e),r=this._dateAdapter.getMonth(e),o=this._dateAdapter.getDate(e);return new Date(i,r,o).getTime()}return null}_isRtl(){return this._dir&&this._dir.value==="rtl"}_setRanges(e){e instanceof Bn?(this._rangeStart.set(this._getCellCompareValue(e.start)),this._rangeEnd.set(this._getCellCompareValue(e.end)),this._isRange.set(!0)):(this._rangeStart.set(this._getCellCompareValue(e)),this._rangeEnd.set(this._rangeStart()),this._isRange.set(!1)),this._comparisonRangeStart.set(this._getCellCompareValue(this.comparisonStart)),this._comparisonRangeEnd.set(this._getCellCompareValue(this.comparisonEnd))}_canSelect(e){return!this.dateFilter||this.dateFilter(e)}_clearPreview(){this._previewStart.set(null),this._previewEnd.set(null)}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["mat-month-view"]],viewQuery:function(i,r){if(i&1&&ve(Ga,5),i&2){let o;B(o=j())&&(r._matCalendarBody=o.first)}},inputs:{activeDate:"activeDate",selected:"selected",minDate:"minDate",maxDate:"maxDate",dateFilter:"dateFilter",dateClass:"dateClass",comparisonStart:"comparisonStart",comparisonEnd:"comparisonEnd",startDateAccessibleName:"startDateAccessibleName",endDateAccessibleName:"endDateAccessibleName",activeDrag:"activeDrag"},outputs:{selectedChange:"selectedChange",_userSelection:"_userSelection",dragStarted:"dragStarted",dragEnded:"dragEnded",activeDateChange:"activeDateChange"},exportAs:["matMonthView"],features:[Le],decls:8,vars:14,consts:[["role","grid",1,"mat-calendar-table"],[1,"mat-calendar-table-header"],["scope","col"],["aria-hidden","true"],["colspan","7",1,"mat-calendar-table-header-divider"],["mat-calendar-body","",3,"selectedValueChange","activeDateChange","previewChange","dragStarted","dragEnded","keyup","keydown","label","rows","todayValue","startValue","endValue","comparisonStart","comparisonEnd","previewStart","previewEnd","isRange","labelMinRequiredCells","activeCell","startDateAccessibleName","endDateAccessibleName"],[1,"cdk-visually-hidden"]],template:function(i,r){i&1&&(p(0,"table",0)(1,"thead",1)(2,"tr"),Jn(3,pL,5,2,"th",2,GS),g(),p(5,"tr",3),ie(6,"th",4),g()(),p(7,"tbody",5),x("selectedValueChange",function(a){return r._dateSelected(a)})("activeDateChange",function(a){return r._updateActiveDate(a)})("previewChange",function(a){return r._previewChanged(a)})("dragStarted",function(a){return r.dragStarted.emit(a)})("dragEnded",function(a){return r._dragEnded(a)})("keyup",function(a){return r._handleCalendarBodyKeyup(a)})("keydown",function(a){return r._handleCalendarBodyKeydown(a)}),g()()),i&2&&(v(3),ei(r._weekdays()),v(4),T("label",r._monthLabel())("rows",r._weeks())("todayValue",r._todayDate())("startValue",r._rangeStart())("endValue",r._rangeEnd())("comparisonStart",r._comparisonRangeStart())("comparisonEnd",r._comparisonRangeEnd())("previewStart",r._previewStart())("previewEnd",r._previewEnd())("isRange",r._isRange())("labelMinRequiredCells",3)("activeCell",r._dateAdapter.getDate(r.activeDate)-1)("startDateAccessibleName",r.startDateAccessibleName)("endDateAccessibleName",r.endDateAccessibleName))},dependencies:[Ga],encapsulation:2,changeDetection:0})}return t})(),vn=24,Tv=4,zS=(()=>{class t{_changeDetectorRef=u(Fe);_dateAdapter=u(Ht,{optional:!0});_dir=u(Et,{optional:!0});_rerenderSubscription=se.EMPTY;_selectionKeyPressed=!1;get activeDate(){return this._activeDate}set activeDate(e){let i=this._activeDate,r=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))||this._dateAdapter.today();this._activeDate=this._dateAdapter.clampDate(r,this.minDate,this.maxDate),YS(this._dateAdapter,i,this._activeDate,this.minDate,this.maxDate)||this._init()}_activeDate;get selected(){return this._selected}set selected(e){e instanceof Bn?this._selected=e:this._selected=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e)),this._setSelectedYear(e)}_selected=null;get minDate(){return this._minDate}set minDate(e){this._minDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_minDate=null;get maxDate(){return this._maxDate}set maxDate(e){this._maxDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_maxDate=null;dateFilter;dateClass;selectedChange=new S;yearSelected=new S;activeDateChange=new S;_matCalendarBody;_years=re([]);_todayYear=re(0);_selectedYear=re(null);constructor(){this._dateAdapter,this._activeDate=this._dateAdapter.today()}ngAfterContentInit(){this._rerenderSubscription=this._dateAdapter.localeChanges.pipe(sn(null)).subscribe(()=>this._init())}ngOnDestroy(){this._rerenderSubscription.unsubscribe()}_init(){this._todayYear.set(this._dateAdapter.getYear(this._dateAdapter.today()));let i=this._dateAdapter.getYear(this._activeDate)-Ul(this._dateAdapter,this.activeDate,this.minDate,this.maxDate),r=[];for(let o=0,a=[];o<vn;o++)a.push(i+o),a.length==Tv&&(r.push(a.map(s=>this._createCellForYear(s))),a=[]);this._years.set(r),this._changeDetectorRef.markForCheck()}_yearSelected(e){let i=e.value,r=this._dateAdapter.createDate(i,0,1),o=this._getDateFromYear(i);this.yearSelected.emit(r),this.selectedChange.emit(o)}_updateActiveDate(e){let i=e.value,r=this._activeDate;this.activeDate=this._getDateFromYear(i),this._dateAdapter.compareDate(r,this.activeDate)&&this.activeDateChange.emit(this.activeDate)}_handleCalendarBodyKeydown(e){let i=this._activeDate,r=this._isRtl();switch(e.keyCode){case 37:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,r?1:-1);break;case 39:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,r?-1:1);break;case 38:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,-Tv);break;case 40:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,Tv);break;case 36:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,-Ul(this._dateAdapter,this.activeDate,this.minDate,this.maxDate));break;case 35:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,vn-Ul(this._dateAdapter,this.activeDate,this.minDate,this.maxDate)-1);break;case 33:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,e.altKey?-vn*10:-vn);break;case 34:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,e.altKey?vn*10:vn);break;case 13:case 32:this._selectionKeyPressed=!0;break;default:return}this._dateAdapter.compareDate(i,this.activeDate)&&this.activeDateChange.emit(this.activeDate),this._focusActiveCellAfterViewChecked(),e.preventDefault()}_handleCalendarBodyKeyup(e){(e.keyCode===32||e.keyCode===13)&&(this._selectionKeyPressed&&this._yearSelected({value:this._dateAdapter.getYear(this._activeDate),event:e}),this._selectionKeyPressed=!1)}_getActiveCell(){return Ul(this._dateAdapter,this.activeDate,this.minDate,this.maxDate)}_focusActiveCell(){this._matCalendarBody._focusActiveCell()}_focusActiveCellAfterViewChecked(){this._matCalendarBody._scheduleFocusActiveCellAfterViewChecked()}_getDateFromYear(e){let i=this._dateAdapter.getMonth(this.activeDate),r=this._dateAdapter.getNumDaysInMonth(this._dateAdapter.createDate(e,i,1));return this._dateAdapter.createDate(e,i,Math.min(this._dateAdapter.getDate(this.activeDate),r))}_createCellForYear(e){let i=this._dateAdapter.createDate(e,0,1),r=this._dateAdapter.getYearName(i),o=this.dateClass?this.dateClass(i,"multi-year"):void 0;return new $l(e,r,r,this._shouldEnableYear(e),o)}_shouldEnableYear(e){if(e==null||this.maxDate&&e>this._dateAdapter.getYear(this.maxDate)||this.minDate&&e<this._dateAdapter.getYear(this.minDate))return!1;if(!this.dateFilter)return!0;let i=this._dateAdapter.createDate(e,0,1);for(let r=i;this._dateAdapter.getYear(r)==e;r=this._dateAdapter.addCalendarDays(r,1))if(this.dateFilter(r))return!0;return!1}_isRtl(){return this._dir&&this._dir.value==="rtl"}_setSelectedYear(e){if(this._selectedYear.set(null),e instanceof Bn){let i=e.start||e.end;i&&this._selectedYear.set(this._dateAdapter.getYear(i))}else e&&this._selectedYear.set(this._dateAdapter.getYear(e))}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["mat-multi-year-view"]],viewQuery:function(i,r){if(i&1&&ve(Ga,5),i&2){let o;B(o=j())&&(r._matCalendarBody=o.first)}},inputs:{activeDate:"activeDate",selected:"selected",minDate:"minDate",maxDate:"maxDate",dateFilter:"dateFilter",dateClass:"dateClass"},outputs:{selectedChange:"selectedChange",yearSelected:"yearSelected",activeDateChange:"activeDateChange"},exportAs:["matMultiYearView"],decls:5,vars:7,consts:[["role","grid",1,"mat-calendar-table"],["aria-hidden","true",1,"mat-calendar-table-header"],["colspan","4",1,"mat-calendar-table-header-divider"],["mat-calendar-body","",3,"selectedValueChange","activeDateChange","keyup","keydown","rows","todayValue","startValue","endValue","numCols","cellAspectRatio","activeCell"]],template:function(i,r){i&1&&(p(0,"table",0)(1,"thead",1)(2,"tr"),ie(3,"th",2),g()(),p(4,"tbody",3),x("selectedValueChange",function(a){return r._yearSelected(a)})("activeDateChange",function(a){return r._updateActiveDate(a)})("keyup",function(a){return r._handleCalendarBodyKeyup(a)})("keydown",function(a){return r._handleCalendarBodyKeydown(a)}),g()()),i&2&&(v(4),T("rows",r._years())("todayValue",r._todayYear())("startValue",r._selectedYear())("endValue",r._selectedYear())("numCols",4)("cellAspectRatio",4/7)("activeCell",r._getActiveCell()))},dependencies:[Ga],encapsulation:2,changeDetection:0})}return t})();function YS(t,n,e,i,r){let o=t.getYear(n),a=t.getYear(e),s=KS(t,i,r);return Math.floor((o-s)/vn)===Math.floor((a-s)/vn)}function Ul(t,n,e,i){let r=t.getYear(n);return TL(r-KS(t,e,i),vn)}function KS(t,n,e){let i=0;return e?i=t.getYear(e)-vn+1:n&&(i=t.getYear(n)),i}function TL(t,n){return(t%n+n)%n}var US=(()=>{class t{_changeDetectorRef=u(Fe);_dateFormats=u(Ar,{optional:!0});_dateAdapter=u(Ht,{optional:!0});_dir=u(Et,{optional:!0});_rerenderSubscription=se.EMPTY;_selectionKeyPressed=!1;get activeDate(){return this._activeDate}set activeDate(e){let i=this._activeDate,r=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))||this._dateAdapter.today();this._activeDate=this._dateAdapter.clampDate(r,this.minDate,this.maxDate),this._dateAdapter.getYear(i)!==this._dateAdapter.getYear(this._activeDate)&&this._init()}_activeDate;get selected(){return this._selected}set selected(e){e instanceof Bn?this._selected=e:this._selected=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e)),this._setSelectedMonth(e)}_selected=null;get minDate(){return this._minDate}set minDate(e){this._minDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_minDate=null;get maxDate(){return this._maxDate}set maxDate(e){this._maxDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_maxDate=null;dateFilter;dateClass;selectedChange=new S;monthSelected=new S;activeDateChange=new S;_matCalendarBody;_months=re([]);_yearLabel=re("");_todayMonth=re(null);_selectedMonth=re(null);constructor(){this._activeDate=this._dateAdapter.today()}ngAfterContentInit(){this._rerenderSubscription=this._dateAdapter.localeChanges.pipe(sn(null)).subscribe(()=>this._init())}ngOnDestroy(){this._rerenderSubscription.unsubscribe()}_monthSelected(e){let i=e.value,r=this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),i,1);this.monthSelected.emit(r);let o=this._getDateFromMonth(i);this.selectedChange.emit(o)}_updateActiveDate(e){let i=e.value,r=this._activeDate;this.activeDate=this._getDateFromMonth(i),this._dateAdapter.compareDate(r,this.activeDate)&&this.activeDateChange.emit(this.activeDate)}_handleCalendarBodyKeydown(e){let i=this._activeDate,r=this._isRtl();switch(e.keyCode){case 37:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,r?1:-1);break;case 39:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,r?-1:1);break;case 38:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,-4);break;case 40:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,4);break;case 36:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,-this._dateAdapter.getMonth(this._activeDate));break;case 35:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,11-this._dateAdapter.getMonth(this._activeDate));break;case 33:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,e.altKey?-10:-1);break;case 34:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,e.altKey?10:1);break;case 13:case 32:this._selectionKeyPressed=!0;break;default:return}this._dateAdapter.compareDate(i,this.activeDate)&&(this.activeDateChange.emit(this.activeDate),this._focusActiveCellAfterViewChecked()),e.preventDefault()}_handleCalendarBodyKeyup(e){(e.keyCode===32||e.keyCode===13)&&(this._selectionKeyPressed&&this._monthSelected({value:this._dateAdapter.getMonth(this._activeDate),event:e}),this._selectionKeyPressed=!1)}_init(){this._setSelectedMonth(this.selected),this._todayMonth.set(this._getMonthInCurrentYear(this._dateAdapter.today())),this._yearLabel.set(this._dateAdapter.getYearName(this.activeDate));let e=this._dateAdapter.getMonthNames("short");this._months.set([[0,1,2,3],[4,5,6,7],[8,9,10,11]].map(i=>i.map(r=>this._createCellForMonth(r,e[r])))),this._changeDetectorRef.markForCheck()}_focusActiveCell(){this._matCalendarBody._focusActiveCell()}_focusActiveCellAfterViewChecked(){this._matCalendarBody._scheduleFocusActiveCellAfterViewChecked()}_getMonthInCurrentYear(e){return e&&this._dateAdapter.getYear(e)==this._dateAdapter.getYear(this.activeDate)?this._dateAdapter.getMonth(e):null}_getDateFromMonth(e){let i=this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),e,1),r=this._dateAdapter.getNumDaysInMonth(i);return this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),e,Math.min(this._dateAdapter.getDate(this.activeDate),r))}_createCellForMonth(e,i){let r=this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),e,1),o=this._dateAdapter.format(r,this._dateFormats.display.monthYearA11yLabel),a=this.dateClass?this.dateClass(r,"year"):void 0;return new $l(e,i.toLocaleUpperCase(),o,this._shouldEnableMonth(e),a)}_shouldEnableMonth(e){let i=this._dateAdapter.getYear(this.activeDate);if(e==null||this._isYearAndMonthAfterMaxDate(i,e)||this._isYearAndMonthBeforeMinDate(i,e))return!1;if(!this.dateFilter)return!0;let r=this._dateAdapter.createDate(i,e,1);for(let o=r;this._dateAdapter.getMonth(o)==e;o=this._dateAdapter.addCalendarDays(o,1))if(this.dateFilter(o))return!0;return!1}_isYearAndMonthAfterMaxDate(e,i){if(this.maxDate){let r=this._dateAdapter.getYear(this.maxDate),o=this._dateAdapter.getMonth(this.maxDate);return e>r||e===r&&i>o}return!1}_isYearAndMonthBeforeMinDate(e,i){if(this.minDate){let r=this._dateAdapter.getYear(this.minDate),o=this._dateAdapter.getMonth(this.minDate);return e<r||e===r&&i<o}return!1}_isRtl(){return this._dir&&this._dir.value==="rtl"}_setSelectedMonth(e){e instanceof Bn?this._selectedMonth.set(this._getMonthInCurrentYear(e.start)||this._getMonthInCurrentYear(e.end)):this._selectedMonth.set(this._getMonthInCurrentYear(e))}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["mat-year-view"]],viewQuery:function(i,r){if(i&1&&ve(Ga,5),i&2){let o;B(o=j())&&(r._matCalendarBody=o.first)}},inputs:{activeDate:"activeDate",selected:"selected",minDate:"minDate",maxDate:"maxDate",dateFilter:"dateFilter",dateClass:"dateClass"},outputs:{selectedChange:"selectedChange",monthSelected:"monthSelected",activeDateChange:"activeDateChange"},exportAs:["matYearView"],decls:5,vars:9,consts:[["role","grid",1,"mat-calendar-table"],["aria-hidden","true",1,"mat-calendar-table-header"],["colspan","4",1,"mat-calendar-table-header-divider"],["mat-calendar-body","",3,"selectedValueChange","activeDateChange","keyup","keydown","label","rows","todayValue","startValue","endValue","labelMinRequiredCells","numCols","cellAspectRatio","activeCell"]],template:function(i,r){i&1&&(p(0,"table",0)(1,"thead",1)(2,"tr"),ie(3,"th",2),g()(),p(4,"tbody",3),x("selectedValueChange",function(a){return r._monthSelected(a)})("activeDateChange",function(a){return r._updateActiveDate(a)})("keyup",function(a){return r._handleCalendarBodyKeyup(a)})("keydown",function(a){return r._handleCalendarBodyKeydown(a)}),g()()),i&2&&(v(4),T("label",r._yearLabel())("rows",r._months())("todayValue",r._todayMonth())("startValue",r._selectedMonth())("endValue",r._selectedMonth())("labelMinRequiredCells",2)("numCols",4)("cellAspectRatio",4/7)("activeCell",r._dateAdapter.getMonth(r.activeDate)))},dependencies:[Ga],encapsulation:2,changeDetection:0})}return t})(),QS=(()=>{class t{_intl=u(Wa);calendar=u(Av);_dateAdapter=u(Ht,{optional:!0});_dateFormats=u(Ar,{optional:!0});_periodButtonText;_periodButtonDescription;_periodButtonLabel;_prevButtonLabel;_nextButtonLabel;constructor(){u(je).load(Si);let e=u(Fe);this._updateLabels(),this.calendar.stateChanges.subscribe(()=>{this._updateLabels(),e.markForCheck()})}get periodButtonText(){return this._periodButtonText}get periodButtonDescription(){return this._periodButtonDescription}get periodButtonLabel(){return this._periodButtonLabel}get prevButtonLabel(){return this._prevButtonLabel}get nextButtonLabel(){return this._nextButtonLabel}currentPeriodClicked(){this.calendar.currentView=this.calendar.currentView=="month"?"multi-year":"month"}previousClicked(){this.previousEnabled()&&(this.calendar.activeDate=this.calendar.currentView=="month"?this._dateAdapter.addCalendarMonths(this.calendar.activeDate,-1):this._dateAdapter.addCalendarYears(this.calendar.activeDate,this.calendar.currentView=="year"?-1:-vn))}nextClicked(){this.nextEnabled()&&(this.calendar.activeDate=this.calendar.currentView=="month"?this._dateAdapter.addCalendarMonths(this.calendar.activeDate,1):this._dateAdapter.addCalendarYears(this.calendar.activeDate,this.calendar.currentView=="year"?1:vn))}previousEnabled(){return this.calendar.minDate?!this.calendar.minDate||!this._isSameView(this.calendar.activeDate,this.calendar.minDate):!0}nextEnabled(){return!this.calendar.maxDate||!this._isSameView(this.calendar.activeDate,this.calendar.maxDate)}_updateLabels(){let e=this.calendar,i=this._intl,r=this._dateAdapter;e.currentView==="month"?(this._periodButtonText=r.format(e.activeDate,this._dateFormats.display.monthYearLabel).toLocaleUpperCase(),this._periodButtonDescription=r.format(e.activeDate,this._dateFormats.display.monthYearLabel).toLocaleUpperCase(),this._periodButtonLabel=i.switchToMultiYearViewLabel,this._prevButtonLabel=i.prevMonthLabel,this._nextButtonLabel=i.nextMonthLabel):e.currentView==="year"?(this._periodButtonText=r.getYearName(e.activeDate),this._periodButtonDescription=r.getYearName(e.activeDate),this._periodButtonLabel=i.switchToMonthViewLabel,this._prevButtonLabel=i.prevYearLabel,this._nextButtonLabel=i.nextYearLabel):(this._periodButtonText=i.formatYearRange(...this._formatMinAndMaxYearLabels()),this._periodButtonDescription=i.formatYearRangeLabel(...this._formatMinAndMaxYearLabels()),this._periodButtonLabel=i.switchToMonthViewLabel,this._prevButtonLabel=i.prevMultiYearLabel,this._nextButtonLabel=i.nextMultiYearLabel)}_isSameView(e,i){return this.calendar.currentView=="month"?this._dateAdapter.getYear(e)==this._dateAdapter.getYear(i)&&this._dateAdapter.getMonth(e)==this._dateAdapter.getMonth(i):this.calendar.currentView=="year"?this._dateAdapter.getYear(e)==this._dateAdapter.getYear(i):YS(this._dateAdapter,e,i,this.calendar.minDate,this.calendar.maxDate)}_formatMinAndMaxYearLabels(){let i=this._dateAdapter.getYear(this.calendar.activeDate)-Ul(this._dateAdapter,this.calendar.activeDate,this.calendar.minDate,this.calendar.maxDate),r=i+vn-1,o=this._dateAdapter.getYearName(this._dateAdapter.createDate(i,0,1)),a=this._dateAdapter.getYearName(this._dateAdapter.createDate(r,0,1));return[o,a]}_periodButtonLabelId=u(qe).getId("mat-calendar-period-label-");static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["mat-calendar-header"]],exportAs:["matCalendarHeader"],ngContentSelectors:gL,decls:17,vars:13,consts:[[1,"mat-calendar-header"],[1,"mat-calendar-controls"],["aria-live","polite",1,"cdk-visually-hidden",3,"id"],["matButton","","type","button",1,"mat-calendar-period-button",3,"click"],["aria-hidden","true"],["viewBox","0 0 10 5","focusable","false","aria-hidden","true",1,"mat-calendar-arrow"],["points","0,0 5,5 10,0"],[1,"mat-calendar-spacer"],["matIconButton","","type","button","disabledInteractive","",1,"mat-calendar-previous-button",3,"click","disabled","matTooltip"],["viewBox","0 0 24 24","focusable","false","aria-hidden","true"],["d","M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"],["matIconButton","","type","button","disabledInteractive","",1,"mat-calendar-next-button",3,"click","disabled","matTooltip"],["d","M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"]],template:function(i,r){i&1&&(we(),p(0,"div",0)(1,"div",1)(2,"span",2),y(3),g(),p(4,"button",3),x("click",function(){return r.currentPeriodClicked()}),p(5,"span",4),y(6),g(),dn(),p(7,"svg",5),ie(8,"polygon",6),g()(),io(),ie(9,"div",7),Z(10),p(11,"button",8),x("click",function(){return r.previousClicked()}),dn(),p(12,"svg",9),ie(13,"path",10),g()(),io(),p(14,"button",11),x("click",function(){return r.nextClicked()}),dn(),p(15,"svg",9),ie(16,"path",12),g()()()()),i&2&&(v(2),T("id",r._periodButtonLabelId),v(),ct(r.periodButtonDescription),v(),ce("aria-label",r.periodButtonLabel)("aria-describedby",r._periodButtonLabelId),v(2),ct(r.periodButtonText),v(),O("mat-calendar-invert",r.calendar.currentView!=="month"),v(4),T("disabled",!r.previousEnabled())("matTooltip",r.prevButtonLabel),ce("aria-label",r.prevButtonLabel),v(3),T("disabled",!r.nextEnabled())("matTooltip",r.nextButtonLabel),ce("aria-label",r.nextButtonLabel))},dependencies:[_n,La,xS],encapsulation:2,changeDetection:0})}return t})(),Av=(()=>{class t{_dateAdapter=u(Ht,{optional:!0});_dateFormats=u(Ar,{optional:!0});_changeDetectorRef=u(Fe);_elementRef=u(P);headerComponent;_calendarHeaderPortal;_intlChanges;_moveFocusOnNextTick=!1;get startAt(){return this._startAt}set startAt(e){this._startAt=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_startAt=null;startView="month";get selected(){return this._selected}set selected(e){e instanceof Bn?this._selected=e:this._selected=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_selected=null;get minDate(){return this._minDate}set minDate(e){this._minDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_minDate=null;get maxDate(){return this._maxDate}set maxDate(e){this._maxDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_maxDate=null;dateFilter;dateClass;comparisonStart=null;comparisonEnd=null;startDateAccessibleName=null;endDateAccessibleName=null;selectedChange=new S;yearSelected=new S;monthSelected=new S;viewChanged=new S(!0);_userSelection=new S;_userDragDrop=new S;monthView;yearView;multiYearView;get activeDate(){return this._clampedActiveDate}set activeDate(e){this._clampedActiveDate=this._dateAdapter.clampDate(e,this.minDate,this.maxDate),this.stateChanges.next(),this._changeDetectorRef.markForCheck()}_clampedActiveDate;get currentView(){return this._currentView}set currentView(e){let i=this._currentView!==e?e:null;this._currentView=e,this._moveFocusOnNextTick=!0,this._changeDetectorRef.markForCheck(),i&&(this.stateChanges.next(),this.viewChanged.emit(i))}_currentView;_activeDrag=null;stateChanges=new M;constructor(){this._intlChanges=u(Wa).changes.subscribe(()=>{this._changeDetectorRef.markForCheck(),this.stateChanges.next()})}ngAfterContentInit(){this._calendarHeaderPortal=new wr(this.headerComponent||QS),this.activeDate=this.startAt||this._dateAdapter.today(),this._currentView=this.startView}ngAfterViewChecked(){this._moveFocusOnNextTick&&(this._moveFocusOnNextTick=!1,this.focusActiveCell())}ngOnDestroy(){this._intlChanges.unsubscribe(),this.stateChanges.complete()}ngOnChanges(e){let i=e.minDate&&!this._dateAdapter.sameDate(e.minDate.previousValue,e.minDate.currentValue)?e.minDate:void 0,r=e.maxDate&&!this._dateAdapter.sameDate(e.maxDate.previousValue,e.maxDate.currentValue)?e.maxDate:void 0,o=i||r||e.dateFilter;if(o&&!o.firstChange){let a=this._getCurrentViewComponent();a&&(this._elementRef.nativeElement.contains(wa())&&(this._moveFocusOnNextTick=!0),this._changeDetectorRef.detectChanges(),a._init())}this.stateChanges.next()}focusActiveCell(){this._getCurrentViewComponent()?._focusActiveCell(!1)}updateTodaysDate(){this._getCurrentViewComponent()?._init()}_dateSelected(e){let i=e.value;(this.selected instanceof Bn||i&&!this._dateAdapter.sameDate(i,this.selected))&&this.selectedChange.emit(i),this._userSelection.emit(e)}_yearSelectedInMultiYearView(e){this.yearSelected.emit(e)}_monthSelectedInYearView(e){this.monthSelected.emit(e)}_goToDateInView(e,i){this.activeDate=e,this.currentView=i}_dragStarted(e){this._activeDrag=e}_dragEnded(e){this._activeDrag&&(e.value&&this._userDragDrop.emit(e),this._activeDrag=null)}_getCurrentViewComponent(){return this.monthView||this.yearView||this.multiYearView}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["mat-calendar"]],viewQuery:function(i,r){if(i&1&&ve(HS,5)(US,5)(zS,5),i&2){let o;B(o=j())&&(r.monthView=o.first),B(o=j())&&(r.yearView=o.first),B(o=j())&&(r.multiYearView=o.first)}},hostAttrs:[1,"mat-calendar"],inputs:{headerComponent:"headerComponent",startAt:"startAt",startView:"startView",selected:"selected",minDate:"minDate",maxDate:"maxDate",dateFilter:"dateFilter",dateClass:"dateClass",comparisonStart:"comparisonStart",comparisonEnd:"comparisonEnd",startDateAccessibleName:"startDateAccessibleName",endDateAccessibleName:"endDateAccessibleName"},outputs:{selectedChange:"selectedChange",yearSelected:"yearSelected",monthSelected:"monthSelected",viewChanged:"viewChanged",_userSelection:"_userSelection",_userDragDrop:"_userDragDrop"},exportAs:["matCalendar"],features:[xe([WS]),Le],decls:5,vars:2,consts:[[3,"cdkPortalOutlet"],["cdkMonitorSubtreeFocus","","tabindex","-1",1,"mat-calendar-content"],[3,"activeDate","selected","dateFilter","maxDate","minDate","dateClass","comparisonStart","comparisonEnd","startDateAccessibleName","endDateAccessibleName","activeDrag"],[3,"activeDate","selected","dateFilter","maxDate","minDate","dateClass"],[3,"activeDateChange","_userSelection","dragStarted","dragEnded","activeDate","selected","dateFilter","maxDate","minDate","dateClass","comparisonStart","comparisonEnd","startDateAccessibleName","endDateAccessibleName","activeDrag"],[3,"activeDateChange","monthSelected","selectedChange","activeDate","selected","dateFilter","maxDate","minDate","dateClass"],[3,"activeDateChange","yearSelected","selectedChange","activeDate","selected","dateFilter","maxDate","minDate","dateClass"]],template:function(i,r){if(i&1&&(fn(0,_L,0,0,"ng-template",0),p(1,"div",1),ge(2,vL,1,11,"mat-month-view",2)(3,yL,1,6,"mat-year-view",3)(4,bL,1,6,"mat-multi-year-view",3),g()),i&2){let o;T("cdkPortalOutlet",r._calendarHeaderPortal),v(2),_e((o=r.currentView)==="month"?2:o==="year"?3:o==="multi-year"?4:-1)}},dependencies:[A_,P_,HS,US,zS],styles:[`.mat-calendar {
  display: block;
  line-height: normal;
  font-family: var(--mat-datepicker-calendar-text-font, var(--mat-sys-body-medium-font));
  font-size: var(--mat-datepicker-calendar-text-size, var(--mat-sys-body-medium-size));
}

.mat-calendar-header {
  padding: 8px 8px 0 8px;
}

.mat-calendar-content {
  padding: 0 8px 8px 8px;
  outline: none;
}

.mat-calendar-controls {
  display: flex;
  align-items: center;
  margin: 5% calc(4.7142857143% - 16px);
}

.mat-calendar-spacer {
  flex: 1 1 auto;
}

.mat-calendar-period-button {
  min-width: 0;
  margin: 0 8px;
  font-size: var(--mat-datepicker-calendar-period-button-text-size, var(--mat-sys-title-small-size));
  font-weight: var(--mat-datepicker-calendar-period-button-text-weight, var(--mat-sys-title-small-weight));
  --mat-button-text-label-text-color: var(--mat-datepicker-calendar-period-button-text-color, var(--mat-sys-on-surface-variant));
}

.mat-calendar-arrow {
  display: inline-block;
  width: 10px;
  height: 5px;
  margin: 0 0 0 5px;
  vertical-align: middle;
  fill: var(--mat-datepicker-calendar-period-button-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-calendar-arrow.mat-calendar-invert {
  transform: rotate(180deg);
}
[dir=rtl] .mat-calendar-arrow {
  margin: 0 5px 0 0;
}
@media (forced-colors: active) {
  .mat-calendar-arrow {
    fill: CanvasText;
  }
}

.mat-datepicker-content .mat-calendar-previous-button:not(.mat-mdc-button-disabled),
.mat-datepicker-content .mat-calendar-next-button:not(.mat-mdc-button-disabled) {
  color: var(--mat-datepicker-calendar-navigation-button-icon-color, var(--mat-sys-on-surface-variant));
}
[dir=rtl] .mat-calendar-previous-button,
[dir=rtl] .mat-calendar-next-button {
  transform: rotate(180deg);
}

.mat-calendar-table {
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;
}

.mat-calendar-table-header th {
  text-align: center;
  padding: 0 0 8px 0;
  color: var(--mat-datepicker-calendar-header-text-color, var(--mat-sys-on-surface-variant));
  font-size: var(--mat-datepicker-calendar-header-text-size, var(--mat-sys-title-small-size));
  font-weight: var(--mat-datepicker-calendar-header-text-weight, var(--mat-sys-title-small-weight));
}

.mat-calendar-table-header-divider {
  position: relative;
  height: 1px;
}
.mat-calendar-table-header-divider::after {
  content: "";
  position: absolute;
  top: 0;
  left: -8px;
  right: -8px;
  height: 1px;
  background: var(--mat-datepicker-calendar-header-divider-color, transparent);
}

.mat-calendar-body-cell-content::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 3px) * -1);
}

.mat-calendar-body-cell:focus-visible .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2,changeDetection:0})}return t})(),AL=new b("mat-datepicker-scroll-strategy",{providedIn:"root",factory:()=>{let t=u(ne);return()=>qi(t)}}),ZS=(()=>{class t{_elementRef=u(P);_animationsDisabled=Xe();_changeDetectorRef=u(Fe);_globalModel=u(Gl);_dateAdapter=u(Ht);_ngZone=u(A);_rangeSelectionStrategy=u(qS,{optional:!0});_stateChanges;_model;_eventCleanups;_animationFallback;_calendar;color;datepicker;comparisonStart=null;comparisonEnd=null;startDateAccessibleName=null;endDateAccessibleName=null;_isAbove=!1;_animationDone=new M;_isAnimating=!1;_closeButtonText;_closeButtonFocused=!1;_actionsPortal=null;_dialogLabelId=null;constructor(){if(u(je).load(Si),this._closeButtonText=u(Wa).closeCalendarLabel,!this._animationsDisabled){let e=this._elementRef.nativeElement,i=u($e);this._eventCleanups=this._ngZone.runOutsideAngular(()=>[i.listen(e,"animationstart",this._handleAnimationEvent),i.listen(e,"animationend",this._handleAnimationEvent),i.listen(e,"animationcancel",this._handleAnimationEvent)])}}ngAfterViewInit(){this._stateChanges=this.datepicker.stateChanges.subscribe(()=>{this._changeDetectorRef.markForCheck()}),this._calendar.focusActiveCell()}ngOnDestroy(){clearTimeout(this._animationFallback),this._eventCleanups?.forEach(e=>e()),this._stateChanges?.unsubscribe(),this._animationDone.complete()}_handleUserSelection(e){let i=this._model.selection,r=e.value,o=i instanceof Bn;if(o&&this._rangeSelectionStrategy){let a=this._rangeSelectionStrategy.selectionFinished(r,i,e.event);this._model.updateSelection(a,this)}else r&&(o||!this._dateAdapter.sameDate(r,i))&&this._model.add(r);(!this._model||this._model.isComplete())&&!this._actionsPortal&&this.datepicker.close()}_handleUserDragDrop(e){this._model.updateSelection(e.value,this)}_startExitAnimation(){this._elementRef.nativeElement.classList.add("mat-datepicker-content-exit"),this._animationsDisabled?this._animationDone.next():(clearTimeout(this._animationFallback),this._animationFallback=setTimeout(()=>{this._isAnimating||this._animationDone.next()},200))}_handleAnimationEvent=e=>{let i=this._elementRef.nativeElement;e.target!==i||!e.animationName.startsWith("_mat-datepicker-content")||(clearTimeout(this._animationFallback),this._isAnimating=e.type==="animationstart",i.classList.toggle("mat-datepicker-content-animating",this._isAnimating),this._isAnimating||this._animationDone.next())};_getSelected(){return this._model.selection}_applyPendingSelection(){this._model!==this._globalModel&&this._globalModel.updateSelection(this._model.selection,this)}_assignActions(e,i){this._model=e?this._globalModel.clone():this._globalModel,this._actionsPortal=e,i&&this._changeDetectorRef.detectChanges()}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["mat-datepicker-content"]],viewQuery:function(i,r){if(i&1&&ve(Av,5),i&2){let o;B(o=j())&&(r._calendar=o.first)}},hostAttrs:[1,"mat-datepicker-content"],hostVars:6,hostBindings:function(i,r){i&2&&(_t(r.color?"mat-"+r.color:""),O("mat-datepicker-content-touch",r.datepicker.touchUi)("mat-datepicker-content-animations-enabled",!r._animationsDisabled))},inputs:{color:"color"},exportAs:["matDatepickerContent"],decls:5,vars:26,consts:[["cdkTrapFocus","","role","dialog",1,"mat-datepicker-content-container"],[3,"yearSelected","monthSelected","viewChanged","_userSelection","_userDragDrop","id","startAt","startView","minDate","maxDate","dateFilter","headerComponent","selected","dateClass","comparisonStart","comparisonEnd","startDateAccessibleName","endDateAccessibleName"],[3,"cdkPortalOutlet"],["type","button","matButton","elevated",1,"mat-datepicker-close-button",3,"focus","blur","click","color"]],template:function(i,r){i&1&&(p(0,"div",0)(1,"mat-calendar",1),x("yearSelected",function(a){return r.datepicker._selectYear(a)})("monthSelected",function(a){return r.datepicker._selectMonth(a)})("viewChanged",function(a){return r.datepicker._viewChanged(a)})("_userSelection",function(a){return r._handleUserSelection(a)})("_userDragDrop",function(a){return r._handleUserDragDrop(a)}),g(),fn(2,DL,0,0,"ng-template",2),p(3,"button",3),x("focus",function(){return r._closeButtonFocused=!0})("blur",function(){return r._closeButtonFocused=!1})("click",function(){return r.datepicker.close()}),y(4),g()()),i&2&&(O("mat-datepicker-content-container-with-custom-header",r.datepicker.calendarHeaderComponent)("mat-datepicker-content-container-with-actions",r._actionsPortal),ce("aria-modal",!0)("aria-labelledby",r._dialogLabelId??void 0),v(),_t(r.datepicker.panelClass),T("id",r.datepicker.id)("startAt",r.datepicker.startAt)("startView",r.datepicker.startView)("minDate",r.datepicker._getMinDate())("maxDate",r.datepicker._getMaxDate())("dateFilter",r.datepicker._getDateFilter())("headerComponent",r.datepicker.calendarHeaderComponent)("selected",r._getSelected())("dateClass",r.datepicker.dateClass)("comparisonStart",r.comparisonStart)("comparisonEnd",r.comparisonEnd)("startDateAccessibleName",r.startDateAccessibleName)("endDateAccessibleName",r.endDateAccessibleName),v(),T("cdkPortalOutlet",r._actionsPortal),v(),O("cdk-visually-hidden",!r._closeButtonFocused),T("color",r.color||"primary"),v(),ct(r._closeButtonText))},dependencies:[j_,Av,A_,_n],styles:[`@keyframes _mat-datepicker-content-dropdown-enter {
  from {
    opacity: 0;
    transform: scaleY(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-datepicker-content-dialog-enter {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-datepicker-content-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-datepicker-content {
  display: block;
  background-color: var(--mat-datepicker-calendar-container-background-color, var(--mat-sys-surface-container-high));
  color: var(--mat-datepicker-calendar-container-text-color, var(--mat-sys-on-surface));
  box-shadow: var(--mat-datepicker-calendar-container-elevation-shadow, 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12));
  border-radius: var(--mat-datepicker-calendar-container-shape, var(--mat-sys-corner-large));
}
.mat-datepicker-content.mat-datepicker-content-animations-enabled {
  animation: _mat-datepicker-content-dropdown-enter 120ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-datepicker-content .mat-calendar {
  width: 296px;
  height: 354px;
}
.mat-datepicker-content .mat-datepicker-content-container-with-custom-header .mat-calendar {
  height: auto;
}
.mat-datepicker-content .mat-datepicker-close-button {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;
}
.mat-datepicker-content-animating .mat-datepicker-content .mat-datepicker-close-button {
  display: none;
}

.mat-datepicker-content-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.mat-datepicker-content-touch {
  display: block;
  max-height: 80vh;
  box-shadow: var(--mat-datepicker-calendar-container-touch-elevation-shadow, 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12));
  border-radius: var(--mat-datepicker-calendar-container-touch-shape, var(--mat-sys-corner-extra-large));
  position: relative;
  overflow: visible;
}
.mat-datepicker-content-touch.mat-datepicker-content-animations-enabled {
  animation: _mat-datepicker-content-dialog-enter 150ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-datepicker-content-touch .mat-datepicker-content-container {
  min-height: 312px;
  max-height: 788px;
  min-width: 250px;
  max-width: 750px;
}
.mat-datepicker-content-touch .mat-calendar {
  width: 100%;
  height: auto;
}

.mat-datepicker-content-exit.mat-datepicker-content-animations-enabled {
  animation: _mat-datepicker-content-exit 100ms linear;
}

@media all and (orientation: landscape) {
  .mat-datepicker-content-touch .mat-datepicker-content-container {
    width: 64vh;
    height: 80vh;
  }
}
@media all and (orientation: portrait) {
  .mat-datepicker-content-touch .mat-datepicker-content-container {
    width: 80vw;
    height: 100vw;
  }
  .mat-datepicker-content-touch .mat-datepicker-content-container-with-actions {
    height: 115vw;
  }
}
`],encapsulation:2,changeDetection:0})}return t})(),$S=(()=>{class t{_injector=u(ne);_viewContainerRef=u(Ct);_dateAdapter=u(Ht,{optional:!0});_dir=u(Et,{optional:!0});_model=u(Gl);_animationsDisabled=Xe();_scrollStrategy=u(AL);_inputStateChanges=se.EMPTY;_document=u(W);calendarHeaderComponent;get startAt(){return this._startAt||(this.datepickerInput?this.datepickerInput.getStartValue():null)}set startAt(e){this._startAt=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_startAt=null;startView="month";get color(){return this._color||(this.datepickerInput?this.datepickerInput.getThemePalette():void 0)}set color(e){this._color=e}_color;touchUi=!1;get disabled(){return this._disabled===void 0&&this.datepickerInput?this.datepickerInput.disabled:!!this._disabled}set disabled(e){e!==this._disabled&&(this._disabled=e,this.stateChanges.next(void 0))}_disabled;xPosition="start";yPosition="below";restoreFocus=!0;yearSelected=new S;monthSelected=new S;viewChanged=new S(!0);dateClass;openedStream=new S;closedStream=new S;get panelClass(){return this._panelClass}set panelClass(e){this._panelClass=bx(e)}_panelClass;get opened(){return this._opened}set opened(e){e?this.open():this.close()}_opened=!1;id=u(qe).getId("mat-datepicker-");_getMinDate(){return this.datepickerInput&&this.datepickerInput.min}_getMaxDate(){return this.datepickerInput&&this.datepickerInput.max}_getDateFilter(){return this.datepickerInput&&this.datepickerInput.dateFilter}_overlayRef=null;_componentRef=null;_focusedElementBeforeOpen=null;_backdropHarnessClass=`${this.id}-backdrop`;_actionsPortal=null;datepickerInput;stateChanges=new M;_changeDetectorRef=u(Fe);constructor(){this._dateAdapter,this._model.selectionChanged.subscribe(()=>{this._changeDetectorRef.markForCheck()})}ngOnChanges(e){let i=e.xPosition||e.yPosition;if(i&&!i.firstChange&&this._overlayRef){let r=this._overlayRef.getConfig().positionStrategy;r instanceof Sa&&(this._setConnectedPositions(r),this.opened&&this._overlayRef.updatePosition())}this.stateChanges.next(void 0)}ngOnDestroy(){this._destroyOverlay(),this.close(),this._inputStateChanges.unsubscribe(),this.stateChanges.complete()}select(e){this._model.add(e)}_selectYear(e){this.yearSelected.emit(e)}_selectMonth(e){this.monthSelected.emit(e)}_viewChanged(e){this.viewChanged.emit(e)}registerInput(e){return this.datepickerInput,this._inputStateChanges.unsubscribe(),this.datepickerInput=e,this._inputStateChanges=e.stateChanges.subscribe(()=>this.stateChanges.next(void 0)),this._model}registerActions(e){this._actionsPortal,this._actionsPortal=e,this._componentRef?.instance._assignActions(e,!0)}removeActions(e){e===this._actionsPortal&&(this._actionsPortal=null,this._componentRef?.instance._assignActions(null,!0))}open(){this._opened||this.disabled||this._componentRef?.instance._isAnimating||(this.datepickerInput,this._focusedElementBeforeOpen=wa(),this._openOverlay(),this._opened=!0,this.openedStream.emit())}close(){if(!this._opened||this._componentRef?.instance._isAnimating)return;let e=this.restoreFocus&&this._focusedElementBeforeOpen&&typeof this._focusedElementBeforeOpen.focus=="function",i=()=>{this._opened&&(this._opened=!1,this.closedStream.emit())};if(this._componentRef){let{instance:r,location:o}=this._componentRef;r._animationDone.pipe(Qt(1)).subscribe(()=>{let a=this._document.activeElement;e&&(!a||a===this._document.activeElement||o.nativeElement.contains(a))&&this._focusedElementBeforeOpen.focus(),this._focusedElementBeforeOpen=null,this._destroyOverlay()}),r._startExitAnimation()}e?setTimeout(i):i()}_applyPendingSelection(){this._componentRef?.instance?._applyPendingSelection()}_forwardContentValues(e){e.datepicker=this,e.color=this.color,e._dialogLabelId=this.datepickerInput.getOverlayLabelId(),e._assignActions(this._actionsPortal,!1)}_openOverlay(){this._destroyOverlay();let e=this.touchUi,i=new wr(ZS,this._viewContainerRef),r=this._overlayRef=Io(this._injector,new Gi({positionStrategy:e?this._getDialogStrategy():this._getDropdownStrategy(),hasBackdrop:!0,backdropClass:[e?"cdk-overlay-dark-backdrop":"mat-overlay-transparent-backdrop",this._backdropHarnessClass],direction:this._dir||"ltr",scrollStrategy:e?of(this._injector):this._scrollStrategy(),panelClass:`mat-datepicker-${e?"dialog":"popup"}`,disableAnimations:this._animationsDisabled}));this._getCloseStream(r).subscribe(o=>{o&&o.preventDefault(),this.close()}),r.keydownEvents().subscribe(o=>{let a=o.keyCode;(a===38||a===40||a===37||a===39||a===33||a===34)&&o.preventDefault()}),this._componentRef=r.attach(i),this._forwardContentValues(this._componentRef.instance),e||At(()=>{r.updatePosition()},{injector:this._injector})}_destroyOverlay(){this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=this._componentRef=null)}_getDialogStrategy(){return af(this._injector).centerHorizontally().centerVertically()}_getDropdownStrategy(){let e=Mo(this._injector,this.datepickerInput.getConnectedOverlayOrigin()).withTransformOriginOn(".mat-datepicker-content").withFlexibleDimensions(!1).withViewportMargin(8).withLockedPosition();return this._setConnectedPositions(e)}_setConnectedPositions(e){let i=this.xPosition==="end"?"end":"start",r=i==="start"?"end":"start",o=this.yPosition==="above"?"bottom":"top",a=o==="top"?"bottom":"top";return e.withPositions([{originX:i,originY:a,overlayX:i,overlayY:o},{originX:i,originY:o,overlayX:i,overlayY:a},{originX:r,originY:a,overlayX:r,overlayY:o},{originX:r,originY:o,overlayX:r,overlayY:a}])}_getCloseStream(e){let i=["ctrlKey","shiftKey","metaKey"];return an(e.backdropClick(),e.detachments(),e.keydownEvents().pipe(He(r=>r.keyCode===27&&!vt(r)||this.datepickerInput&&vt(r,"altKey")&&r.keyCode===38&&i.every(o=>!vt(r,o)))))}static \u0275fac=function(i){return new(i||t)};static \u0275dir=z({type:t,inputs:{calendarHeaderComponent:"calendarHeaderComponent",startAt:"startAt",startView:"startView",color:"color",touchUi:[2,"touchUi","touchUi",F],disabled:[2,"disabled","disabled",F],xPosition:"xPosition",yPosition:"yPosition",restoreFocus:[2,"restoreFocus","restoreFocus",F],dateClass:"dateClass",panelClass:"panelClass",opened:[2,"opened","opened",F]},outputs:{yearSelected:"yearSelected",monthSelected:"monthSelected",viewChanged:"viewChanged",openedStream:"opened",closedStream:"closed"},features:[Le]})}return t})(),XS=(()=>{class t extends $S{static \u0275fac=(()=>{let e;return function(r){return(e||(e=Qn(t)))(r||t)}})();static \u0275cmp=I({type:t,selectors:[["mat-datepicker"]],exportAs:["matDatepicker"],features:[xe([WS,{provide:$S,useExisting:t}]),Ge],decls:0,vars:0,template:function(i,r){},encapsulation:2,changeDetection:0})}return t})(),$a=class{target;targetElement;value=null;constructor(n,e){this.target=n,this.targetElement=e,this.value=this.target.value}},RL=(()=>{class t{_elementRef=u(P);_dateAdapter=u(Ht,{optional:!0});_dateFormats=u(Ar,{optional:!0});_isInitialized=!1;get value(){return this._model?this._getValueFromModel(this._model.selection):this._pendingValue}set value(e){this._assignValueProgrammatically(e,!0)}_model;get disabled(){return!!this._disabled||this._parentDisabled()}set disabled(e){let i=e,r=this._elementRef.nativeElement;this._disabled!==i&&(this._disabled=i,this.stateChanges.next(void 0)),i&&this._isInitialized&&r.blur&&r.blur()}_disabled;dateChange=new S;dateInput=new S;stateChanges=new M;_onTouched=()=>{};_validatorOnChange=()=>{};_cvaOnChange=()=>{};_valueChangesSubscription=se.EMPTY;_localeSubscription=se.EMPTY;_pendingValue=null;_parseValidator=()=>this._lastValueValid?null:{matDatepickerParse:{text:this._elementRef.nativeElement.value}};_filterValidator=e=>{let i=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e.value));return!i||this._matchesFilter(i)?null:{matDatepickerFilter:!0}};_minValidator=e=>{let i=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e.value)),r=this._getMinDate();return!r||!i||this._dateAdapter.compareDate(r,i)<=0?null:{matDatepickerMin:{min:r,actual:i}}};_maxValidator=e=>{let i=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e.value)),r=this._getMaxDate();return!r||!i||this._dateAdapter.compareDate(r,i)>=0?null:{matDatepickerMax:{max:r,actual:i}}};_getValidators(){return[this._parseValidator,this._minValidator,this._maxValidator,this._filterValidator]}_registerModel(e){this._model=e,this._valueChangesSubscription.unsubscribe(),this._pendingValue&&this._assignValue(this._pendingValue),this._valueChangesSubscription=this._model.selectionChanged.subscribe(i=>{if(this._shouldHandleChangeEvent(i)){let r=this._getValueFromModel(i.selection);this._lastValueValid=this._isValidValue(r),this._cvaOnChange(r),this._onTouched(),this._formatValue(r),this.dateInput.emit(new $a(this,this._elementRef.nativeElement)),this.dateChange.emit(new $a(this,this._elementRef.nativeElement))}})}_lastValueValid=!1;constructor(){this._localeSubscription=this._dateAdapter.localeChanges.subscribe(()=>{this._assignValueProgrammatically(this.value,!0)})}ngAfterViewInit(){this._isInitialized=!0}ngOnChanges(e){NL(e,this._dateAdapter)&&this.stateChanges.next(void 0)}ngOnDestroy(){this._valueChangesSubscription.unsubscribe(),this._localeSubscription.unsubscribe(),this.stateChanges.complete()}registerOnValidatorChange(e){this._validatorOnChange=e}validate(e){return this._validator?this._validator(e):null}writeValue(e){this._assignValueProgrammatically(e,e!==this.value)}registerOnChange(e){this._cvaOnChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}_onKeydown(e){let i=["ctrlKey","shiftKey","metaKey"];vt(e,"altKey")&&e.keyCode===40&&i.every(o=>!vt(e,o))&&!this._elementRef.nativeElement.readOnly&&(this._openPopup(),e.preventDefault())}_onInput(e){let i=e.target.value,r=this._lastValueValid,o=this._dateAdapter.parse(i,this._dateFormats.parse.dateInput);this._lastValueValid=this._isValidValue(o),o=this._dateAdapter.getValidDateOrNull(o);let a=!this._dateAdapter.sameDate(o,this.value);!o||a?this._cvaOnChange(o):(i&&!this.value&&this._cvaOnChange(o),r!==this._lastValueValid&&this._validatorOnChange()),a&&(this._assignValue(o),this.dateInput.emit(new $a(this,this._elementRef.nativeElement)))}_onChange(){this.dateChange.emit(new $a(this,this._elementRef.nativeElement))}_onBlur(){this.value&&this._formatValue(this.value),this._onTouched()}_formatValue(e){this._elementRef.nativeElement.value=e!=null?this._dateAdapter.format(e,this._dateFormats.display.dateInput):""}_assignValue(e){this._model?(this._assignValueToModel(e),this._pendingValue=null):this._pendingValue=e}_isValidValue(e){return!e||this._dateAdapter.isValid(e)}_parentDisabled(){return!1}_assignValueProgrammatically(e,i){e=this._dateAdapter.deserialize(e),this._lastValueValid=this._isValidValue(e),e=this._dateAdapter.getValidDateOrNull(e),this._assignValue(e),i&&this._formatValue(e)}_matchesFilter(e){let i=this._getDateFilter();return!i||i(e)}static \u0275fac=function(i){return new(i||t)};static \u0275dir=z({type:t,inputs:{value:"value",disabled:[2,"disabled","disabled",F]},outputs:{dateChange:"dateChange",dateInput:"dateInput"},features:[Le]})}return t})();function NL(t,n){let e=Object.keys(t);for(let i of e){let{previousValue:r,currentValue:o}=t[i];if(n.isDateInstance(r)&&n.isDateInstance(o)){if(!n.sameDate(r,o))return!0}else return!0}return!1}var OL={provide:On,useExisting:at(()=>qf),multi:!0},FL={provide:ki,useExisting:at(()=>qf),multi:!0},qf=(()=>{class t extends RL{_formField=u(Lo,{optional:!0});_closedSubscription=se.EMPTY;_openedSubscription=se.EMPTY;set matDatepicker(e){e&&(this._datepicker=e,this._ariaOwns.set(e.opened?e.id:null),this._closedSubscription=e.closedStream.subscribe(()=>{this._onTouched(),this._ariaOwns.set(null)}),this._openedSubscription=e.openedStream.subscribe(()=>{this._ariaOwns.set(e.id)}),this._registerModel(e.registerInput(this)))}_datepicker;_ariaOwns=re(null);get min(){return this._min}set min(e){let i=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e));this._dateAdapter.sameDate(i,this._min)||(this._min=i,this._validatorOnChange())}_min=null;get max(){return this._max}set max(e){let i=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e));this._dateAdapter.sameDate(i,this._max)||(this._max=i,this._validatorOnChange())}_max=null;get dateFilter(){return this._dateFilter}set dateFilter(e){let i=this._matchesFilter(this.value);this._dateFilter=e,this._matchesFilter(this.value)!==i&&this._validatorOnChange()}_dateFilter;_validator=null;constructor(){super(),this._validator=Sr.compose(super._getValidators())}getConnectedOverlayOrigin(){return this._formField?this._formField.getConnectedOverlayOrigin():this._elementRef}getOverlayLabelId(){return this._formField?this._formField.getLabelId():this._elementRef.nativeElement.getAttribute("aria-labelledby")}getThemePalette(){return this._formField?this._formField.color:void 0}getStartValue(){return this.value}ngOnDestroy(){super.ngOnDestroy(),this._closedSubscription.unsubscribe(),this._openedSubscription.unsubscribe()}_openPopup(){this._datepicker&&this._datepicker.open()}_getValueFromModel(e){return e}_assignValueToModel(e){this._model&&this._model.updateSelection(e,this)}_getMinDate(){return this._min}_getMaxDate(){return this._max}_getDateFilter(){return this._dateFilter}_shouldHandleChangeEvent(e){return e.source!==this}static \u0275fac=function(i){return new(i||t)};static \u0275dir=z({type:t,selectors:[["input","matDatepicker",""]],hostAttrs:[1,"mat-datepicker-input"],hostVars:6,hostBindings:function(i,r){i&1&&x("input",function(a){return r._onInput(a)})("change",function(){return r._onChange()})("blur",function(){return r._onBlur()})("keydown",function(a){return r._onKeydown(a)}),i&2&&(gt("disabled",r.disabled),ce("aria-haspopup",r._datepicker?"dialog":null)("aria-owns",r._ariaOwns())("min",r.min?r._dateAdapter.toIso8601(r.min):null)("max",r.max?r._dateAdapter.toIso8601(r.max):null)("data-mat-calendar",r._datepicker?r._datepicker.id:null))},inputs:{matDatepicker:"matDatepicker",min:"min",max:"max",dateFilter:[0,"matDatepickerFilter","dateFilter"]},exportAs:["matDatepickerInput"],features:[xe([OL,FL,{provide:Uf,useExisting:t}]),Ge]})}return t})(),PL=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=z({type:t,selectors:[["","matDatepickerToggleIcon",""]]})}return t})(),Rv=(()=>{class t{_intl=u(Wa);_changeDetectorRef=u(Fe);_stateChanges=se.EMPTY;datepicker;tabIndex=null;ariaLabel;get disabled(){return this._disabled===void 0&&this.datepicker?this.datepicker.disabled:!!this._disabled}set disabled(e){this._disabled=e}_disabled;disableRipple=!1;_customIcon;_button;constructor(){let e=u(new en("tabindex"),{optional:!0}),i=Number(e);this.tabIndex=i||i===0?i:null}ngOnChanges(e){e.datepicker&&this._watchStateChanges()}ngOnDestroy(){this._stateChanges.unsubscribe()}ngAfterContentInit(){this._watchStateChanges()}_open(e){this.datepicker&&!this.disabled&&(this.datepicker.open(),e.stopPropagation())}_watchStateChanges(){let e=this.datepicker?this.datepicker.stateChanges:nt(),i=this.datepicker&&this.datepicker.datepickerInput?this.datepicker.datepickerInput.stateChanges:nt(),r=this.datepicker?an(this.datepicker.openedStream,this.datepicker.closedStream):nt();this._stateChanges.unsubscribe(),this._stateChanges=an(this._intl.changes,e,i,r).subscribe(()=>this._changeDetectorRef.markForCheck())}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["mat-datepicker-toggle"]],contentQueries:function(i,r,o){if(i&1&&Mn(o,PL,5),i&2){let a;B(a=j())&&(r._customIcon=a.first)}},viewQuery:function(i,r){if(i&1&&ve(CL,5),i&2){let o;B(o=j())&&(r._button=o.first)}},hostAttrs:[1,"mat-datepicker-toggle"],hostVars:8,hostBindings:function(i,r){i&1&&x("click",function(a){return r._open(a)}),i&2&&(ce("tabindex",null)("data-mat-calendar",r.datepicker?r.datepicker.id:null),O("mat-datepicker-toggle-active",r.datepicker&&r.datepicker.opened)("mat-accent",r.datepicker&&r.datepicker.color==="accent")("mat-warn",r.datepicker&&r.datepicker.color==="warn"))},inputs:{datepicker:[0,"for","datepicker"],tabIndex:"tabIndex",ariaLabel:[0,"aria-label","ariaLabel"],disabled:[2,"disabled","disabled",F],disableRipple:"disableRipple"},exportAs:["matDatepickerToggle"],features:[Le],ngContentSelectors:EL,decls:4,vars:7,consts:[["button",""],["matIconButton","","type","button",3,"tabIndex","disabled","disableRipple"],["viewBox","0 0 24 24","width","24px","height","24px","fill","currentColor","focusable","false","aria-hidden","true",1,"mat-datepicker-toggle-default-icon"],["d","M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"]],template:function(i,r){i&1&&(we(wL),p(0,"button",1,0),ge(2,xL,2,0,":svg:svg",2),Z(3),g()),i&2&&(T("tabIndex",r.disabled?-1:r.tabIndex)("disabled",r.disabled)("disableRipple",r.disableRipple),ce("aria-haspopup",r.datepicker?"dialog":null)("aria-label",r.ariaLabel||r._intl.openCalendarLabel)("aria-expanded",r.datepicker?r.datepicker.opened:null),v(2),_e(r._customIcon?-1:2))},dependencies:[La],styles:[`.mat-datepicker-toggle {
  pointer-events: auto;
  color: var(--mat-datepicker-toggle-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-datepicker-toggle button {
  color: inherit;
}

.mat-datepicker-toggle-active {
  color: var(--mat-datepicker-toggle-active-state-icon-color, var(--mat-sys-primary));
}

@media (forced-colors: active) {
  .mat-datepicker-toggle-default-icon {
    color: CanvasText;
  }
}
`],encapsulation:2,changeDetection:0})}return t})();var JS=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=$({type:t});static \u0275inj=H({providers:[Wa],imports:[Bt,ko,El,Zu,ZS,Rv,QS,be,xo]})}return t})();var qt=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=$({type:t});static \u0275inj=H({imports:[uf,Vn,be]})}return t})();function eM(t){return Error(`Unable to find icon with the name "${t}"`)}function VL(){return Error("Could not find HttpClient for use with Angular Material icons. Please add provideHttpClient() to your providers.")}function tM(t){return Error(`The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${t}".`)}function nM(t){return Error(`The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${t}".`)}var Qi=class{url;svgText;options;svgElement=null;constructor(n,e,i){this.url=n,this.svgText=e,this.options=i}},rM=(()=>{class t{_httpClient;_sanitizer;_errorHandler;_document;_svgIconConfigs=new Map;_iconSetConfigs=new Map;_cachedIconsByUrl=new Map;_inProgressUrlFetches=new Map;_fontCssClassesByAlias=new Map;_resolvers=[];_defaultFontSetClass=["material-icons","mat-ligature-font"];constructor(e,i,r,o){this._httpClient=e,this._sanitizer=i,this._errorHandler=o,this._document=r}addSvgIcon(e,i,r){return this.addSvgIconInNamespace("",e,i,r)}addSvgIconLiteral(e,i,r){return this.addSvgIconLiteralInNamespace("",e,i,r)}addSvgIconInNamespace(e,i,r,o){return this._addSvgIconConfig(e,i,new Qi(r,null,o))}addSvgIconResolver(e){return this._resolvers.push(e),this}addSvgIconLiteralInNamespace(e,i,r,o){let a=this._sanitizer.sanitize(Tt.HTML,r);if(!a)throw nM(r);let s=To(a);return this._addSvgIconConfig(e,i,new Qi("",s,o))}addSvgIconSet(e,i){return this.addSvgIconSetInNamespace("",e,i)}addSvgIconSetLiteral(e,i){return this.addSvgIconSetLiteralInNamespace("",e,i)}addSvgIconSetInNamespace(e,i,r){return this._addSvgIconSetConfig(e,new Qi(i,null,r))}addSvgIconSetLiteralInNamespace(e,i,r){let o=this._sanitizer.sanitize(Tt.HTML,i);if(!o)throw nM(i);let a=To(o);return this._addSvgIconSetConfig(e,new Qi("",a,r))}registerFontClassAlias(e,i=e){return this._fontCssClassesByAlias.set(e,i),this}classNameForFontAlias(e){return this._fontCssClassesByAlias.get(e)||e}setDefaultFontSetClass(...e){return this._defaultFontSetClass=e,this}getDefaultFontSetClass(){return this._defaultFontSetClass}getSvgIconFromUrl(e){let i=this._sanitizer.sanitize(Tt.RESOURCE_URL,e);if(!i)throw tM(e);let r=this._cachedIconsByUrl.get(i);return r?nt(Yf(r)):this._loadSvgIconFromConfig(new Qi(e,null)).pipe(di(o=>this._cachedIconsByUrl.set(i,o)),Se(o=>Yf(o)))}getNamedSvgIcon(e,i=""){let r=iM(i,e),o=this._svgIconConfigs.get(r);if(o)return this._getSvgFromConfig(o);if(o=this._getIconConfigFromResolvers(i,e),o)return this._svgIconConfigs.set(r,o),this._getSvgFromConfig(o);let a=this._iconSetConfigs.get(i);return a?this._getSvgFromIconSetConfigs(e,a):xh(eM(r))}ngOnDestroy(){this._resolvers=[],this._svgIconConfigs.clear(),this._iconSetConfigs.clear(),this._cachedIconsByUrl.clear()}_getSvgFromConfig(e){return e.svgText?nt(Yf(this._svgElementFromConfig(e))):this._loadSvgIconFromConfig(e).pipe(Se(i=>Yf(i)))}_getSvgFromIconSetConfigs(e,i){let r=this._extractIconWithNameFromAnySet(e,i);if(r)return nt(r);let o=i.filter(a=>!a.svgText).map(a=>this._loadSvgIconSetFromConfig(a).pipe(Oc(s=>{let c=`Loading icon set URL: ${this._sanitizer.sanitize(Tt.RESOURCE_URL,a.url)} failed: ${s.message}`;return this._errorHandler.handleError(new Error(c)),nt(null)})));return ns(o).pipe(Se(()=>{let a=this._extractIconWithNameFromAnySet(e,i);if(!a)throw eM(e);return a}))}_extractIconWithNameFromAnySet(e,i){for(let r=i.length-1;r>=0;r--){let o=i[r];if(o.svgText&&o.svgText.toString().indexOf(e)>-1){let a=this._svgElementFromConfig(o),s=this._extractSvgIconFromSet(a,e,o.options);if(s)return s}}return null}_loadSvgIconFromConfig(e){return this._fetchIcon(e).pipe(di(i=>e.svgText=i),Se(()=>this._svgElementFromConfig(e)))}_loadSvgIconSetFromConfig(e){return e.svgText?nt(null):this._fetchIcon(e).pipe(di(i=>e.svgText=i))}_extractSvgIconFromSet(e,i,r){let o=e.querySelector(`[id="${i}"]`);if(!o)return null;let a=o.cloneNode(!0);if(a.removeAttribute("id"),a.nodeName.toLowerCase()==="svg")return this._setSvgAttributes(a,r);if(a.nodeName.toLowerCase()==="symbol")return this._setSvgAttributes(this._toSvgElement(a),r);let s=this._svgElementFromString(To("<svg></svg>"));return s.appendChild(a),this._setSvgAttributes(s,r)}_svgElementFromString(e){let i=this._document.createElement("DIV");i.innerHTML=e;let r=i.querySelector("svg");if(!r)throw Error("<svg> tag not found");return r}_toSvgElement(e){let i=this._svgElementFromString(To("<svg></svg>")),r=e.attributes;for(let o=0;o<r.length;o++){let{name:a,value:s}=r[o];a!=="id"&&i.setAttribute(a,s)}for(let o=0;o<e.childNodes.length;o++)e.childNodes[o].nodeType===this._document.ELEMENT_NODE&&i.appendChild(e.childNodes[o].cloneNode(!0));return i}_setSvgAttributes(e,i){return e.setAttribute("fit",""),e.setAttribute("height","100%"),e.setAttribute("width","100%"),e.setAttribute("preserveAspectRatio","xMidYMid meet"),e.setAttribute("focusable","false"),i&&i.viewBox&&e.setAttribute("viewBox",i.viewBox),e}_fetchIcon(e){let{url:i,options:r}=e,o=r?.withCredentials??!1;if(!this._httpClient)throw VL();if(i==null)throw Error(`Cannot fetch icon from URL "${i}".`);let a=this._sanitizer.sanitize(Tt.RESOURCE_URL,i);if(!a)throw tM(i);let s=this._inProgressUrlFetches.get(a);if(s)return s;let l=this._httpClient.get(a,{responseType:"text",withCredentials:o}).pipe(Se(c=>To(c)),os(()=>this._inProgressUrlFetches.delete(a)),as());return this._inProgressUrlFetches.set(a,l),l}_addSvgIconConfig(e,i,r){return this._svgIconConfigs.set(iM(e,i),r),this}_addSvgIconSetConfig(e,i){let r=this._iconSetConfigs.get(e);return r?r.push(i):this._iconSetConfigs.set(e,[i]),this}_svgElementFromConfig(e){if(!e.svgElement){let i=this._svgElementFromString(e.svgText);this._setSvgAttributes(i,e.options),e.svgElement=i}return e.svgElement}_getIconConfigFromResolvers(e,i){for(let r=0;r<this._resolvers.length;r++){let o=this._resolvers[r](i,e);if(o)return BL(o)?new Qi(o.url,null,o.options):new Qi(o,null)}}static \u0275fac=function(i){return new(i||t)(G(Gg,8),G(sl),G(W,8),G(Zt))};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function Yf(t){return t.cloneNode(!0)}function iM(t,n){return t+":"+n}function BL(t){return!!(t.url&&t.options)}var jL=["*"],HL=new b("MAT_ICON_DEFAULT_OPTIONS"),zL=new b("mat-icon-location",{providedIn:"root",factory:()=>{let t=u(W),n=t?t.location:null;return{getPathname:()=>n?n.pathname+n.search:""}}}),oM=["clip-path","color-profile","src","cursor","fill","filter","marker","marker-start","marker-mid","marker-end","mask","stroke"],UL=oM.map(t=>`[${t}]`).join(", "),$L=/^url\(['"]?#(.*?)['"]?\)$/,Kf=(()=>{class t{_elementRef=u(P);_iconRegistry=u(rM);_location=u(zL);_errorHandler=u(Zt);_defaultColor;get color(){return this._color||this._defaultColor}set color(e){this._color=e}_color;inline=!1;get svgIcon(){return this._svgIcon}set svgIcon(e){e!==this._svgIcon&&(e?this._updateSvgIcon(e):this._svgIcon&&this._clearSvgElement(),this._svgIcon=e)}_svgIcon;get fontSet(){return this._fontSet}set fontSet(e){let i=this._cleanupFontValue(e);i!==this._fontSet&&(this._fontSet=i,this._updateFontIconClasses())}_fontSet;get fontIcon(){return this._fontIcon}set fontIcon(e){let i=this._cleanupFontValue(e);i!==this._fontIcon&&(this._fontIcon=i,this._updateFontIconClasses())}_fontIcon;_previousFontSetClass=[];_previousFontIconClass;_svgName=null;_svgNamespace=null;_previousPath;_elementsWithExternalReferences;_currentIconFetch=se.EMPTY;constructor(){let e=u(new en("aria-hidden"),{optional:!0}),i=u(HL,{optional:!0});i&&(i.color&&(this.color=this._defaultColor=i.color),i.fontSet&&(this.fontSet=i.fontSet)),e||this._elementRef.nativeElement.setAttribute("aria-hidden","true")}_splitIconName(e){if(!e)return["",""];let i=e.split(":");switch(i.length){case 1:return["",i[0]];case 2:return i;default:throw Error(`Invalid icon name: "${e}"`)}}ngOnInit(){this._updateFontIconClasses()}ngAfterViewChecked(){let e=this._elementsWithExternalReferences;if(e&&e.size){let i=this._location.getPathname();i!==this._previousPath&&(this._previousPath=i,this._prependPathToReferences(i))}}ngOnDestroy(){this._currentIconFetch.unsubscribe(),this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear()}_usingFontIcon(){return!this.svgIcon}_setSvgElement(e){this._clearSvgElement();let i=this._location.getPathname();this._previousPath=i,this._cacheChildrenWithExternalReferences(e),this._prependPathToReferences(i),this._elementRef.nativeElement.appendChild(e)}_clearSvgElement(){let e=this._elementRef.nativeElement,i=e.childNodes.length;for(this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear();i--;){let r=e.childNodes[i];(r.nodeType!==1||r.nodeName.toLowerCase()==="svg")&&r.remove()}}_updateFontIconClasses(){if(!this._usingFontIcon())return;let e=this._elementRef.nativeElement,i=(this.fontSet?this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/):this._iconRegistry.getDefaultFontSetClass()).filter(r=>r.length>0);this._previousFontSetClass.forEach(r=>e.classList.remove(r)),i.forEach(r=>e.classList.add(r)),this._previousFontSetClass=i,this.fontIcon!==this._previousFontIconClass&&!i.includes("mat-ligature-font")&&(this._previousFontIconClass&&e.classList.remove(this._previousFontIconClass),this.fontIcon&&e.classList.add(this.fontIcon),this._previousFontIconClass=this.fontIcon)}_cleanupFontValue(e){return typeof e=="string"?e.trim().split(" ")[0]:e}_prependPathToReferences(e){let i=this._elementsWithExternalReferences;i&&i.forEach((r,o)=>{r.forEach(a=>{o.setAttribute(a.name,`url('${e}#${a.value}')`)})})}_cacheChildrenWithExternalReferences(e){let i=e.querySelectorAll(UL),r=this._elementsWithExternalReferences=this._elementsWithExternalReferences||new Map;for(let o=0;o<i.length;o++)oM.forEach(a=>{let s=i[o],l=s.getAttribute(a),c=l?l.match($L):null;if(c){let d=r.get(s);d||(d=[],r.set(s,d)),d.push({name:a,value:c[1]})}})}_updateSvgIcon(e){if(this._svgNamespace=null,this._svgName=null,this._currentIconFetch.unsubscribe(),e){let[i,r]=this._splitIconName(e);i&&(this._svgNamespace=i),r&&(this._svgName=r),this._currentIconFetch=this._iconRegistry.getNamedSvgIcon(r,i).pipe(Qt(1)).subscribe(o=>this._setSvgElement(o),o=>{let a=`Error retrieving icon ${i}:${r}! ${o.message}`;this._errorHandler.handleError(new Error(a))})}}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["mat-icon"]],hostAttrs:["role","img",1,"mat-icon","notranslate"],hostVars:10,hostBindings:function(i,r){i&2&&(ce("data-mat-icon-type",r._usingFontIcon()?"font":"svg")("data-mat-icon-name",r._svgName||r.fontIcon)("data-mat-icon-namespace",r._svgNamespace||r.fontSet)("fontIcon",r._usingFontIcon()?r.fontIcon:null),_t(r.color?"mat-"+r.color:""),O("mat-icon-inline",r.inline)("mat-icon-no-color",r.color!=="primary"&&r.color!=="accent"&&r.color!=="warn"))},inputs:{color:"color",inline:[2,"inline","inline",F],svgIcon:"svgIcon",fontSet:"fontSet",fontIcon:"fontIcon"},exportAs:["matIcon"],ngContentSelectors:jL,decls:1,vars:0,template:function(i,r){i&1&&(we(),Z(0))},styles:[`mat-icon, mat-icon.mat-primary, mat-icon.mat-accent, mat-icon.mat-warn {
  color: var(--mat-icon-color, inherit);
}

.mat-icon {
  -webkit-user-select: none;
  user-select: none;
  background-repeat: no-repeat;
  display: inline-block;
  fill: currentColor;
  height: 24px;
  width: 24px;
  overflow: hidden;
}
.mat-icon.mat-icon-inline {
  font-size: inherit;
  height: inherit;
  line-height: inherit;
  width: inherit;
}
.mat-icon.mat-ligature-font[fontIcon]::before {
  content: attr(fontIcon);
}

[dir=rtl] .mat-icon-rtl-mirror {
  transform: scale(-1, 1);
}

.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon {
  display: block;
}
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon {
  margin: auto;
}
`],encapsulation:2,changeDetection:0})}return t})(),Qf=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=$({type:t});static \u0275inj=H({imports:[be]})}return t})();var GL=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["ng-component"]],hostAttrs:["cdk-text-field-style-loader",""],decls:0,vars:0,template:function(i,r){},styles:[`textarea.cdk-textarea-autosize {
  resize: none;
}

textarea.cdk-textarea-autosize-measuring {
  padding: 2px 0 !important;
  box-sizing: content-box !important;
  height: auto !important;
  overflow: hidden !important;
}

textarea.cdk-textarea-autosize-measuring-firefox {
  padding: 2px 0 !important;
  box-sizing: content-box !important;
  height: 0 !important;
}

@keyframes cdk-text-field-autofill-start { /*!*/ }
@keyframes cdk-text-field-autofill-end { /*!*/ }
.cdk-text-field-autofill-monitored:-webkit-autofill {
  animation: cdk-text-field-autofill-start 0s 1ms;
}

.cdk-text-field-autofill-monitored:not(:-webkit-autofill) {
  animation: cdk-text-field-autofill-end 0s 1ms;
}
`],encapsulation:2,changeDetection:0})}return t})(),WL={passive:!0},sM=(()=>{class t{_platform=u(Ce);_ngZone=u(A);_renderer=u(rt).createRenderer(null,null);_styleLoader=u(je);_monitoredElements=new Map;constructor(){}monitor(e){if(!this._platform.isBrowser)return Ur;this._styleLoader.load(GL);let i=pn(e),r=this._monitoredElements.get(i);if(r)return r.subject;let o=new M,a="cdk-text-field-autofilled",s=c=>{c.animationName==="cdk-text-field-autofill-start"&&!i.classList.contains(a)?(i.classList.add(a),this._ngZone.run(()=>o.next({target:c.target,isAutofilled:!0}))):c.animationName==="cdk-text-field-autofill-end"&&i.classList.contains(a)&&(i.classList.remove(a),this._ngZone.run(()=>o.next({target:c.target,isAutofilled:!1})))},l=this._ngZone.runOutsideAngular(()=>(i.classList.add("cdk-text-field-autofill-monitored"),this._renderer.listen(i,"animationstart",s,WL)));return this._monitoredElements.set(i,{subject:o,unlisten:l}),o}stopMonitoring(e){let i=pn(e),r=this._monitoredElements.get(i);r&&(r.unlisten(),r.subject.complete(),i.classList.remove("cdk-text-field-autofill-monitored"),i.classList.remove("cdk-text-field-autofilled"),this._monitoredElements.delete(i))}ngOnDestroy(){this._monitoredElements.forEach((e,i)=>this.stopMonitoring(i))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var lM=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=$({type:t});static \u0275inj=H({})}return t})();var qL=["button","checkbox","file","hidden","image","radio","range","reset","submit"],YL=new b("MAT_INPUT_CONFIG"),qa=(()=>{class t{_elementRef=u(P);_platform=u(Ce);ngControl=u(Nn,{optional:!0,self:!0});_autofillMonitor=u(sM);_ngZone=u(A);_formField=u(Lo,{optional:!0});_renderer=u($e);_uid=u(qe).getId("mat-input-");_previousNativeValue;_inputValueAccessor;_signalBasedValueAccessor;_previousPlaceholder=null;_errorStateTracker;_config=u(YL,{optional:!0});_cleanupIosKeyup;_cleanupWebkitWheel;_isServer=!1;_isNativeSelect=!1;_isTextarea=!1;_isInFormField=!1;focused=!1;stateChanges=new M;controlType="mat-input";autofilled=!1;get disabled(){return this._disabled}set disabled(e){this._disabled=ut(e),this.focused&&(this.focused=!1,this.stateChanges.next())}_disabled=!1;get id(){return this._id}set id(e){this._id=e||this._uid}_id;placeholder;name;get required(){return this._required??this.ngControl?.control?.hasValidator(Sr.required)??!1}set required(e){this._required=ut(e)}_required;get type(){return this._type}set type(e){this._type=e||"text",this._validateType(),!this._isTextarea&&av().has(this._type)&&(this._elementRef.nativeElement.type=this._type)}_type="text";get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}userAriaDescribedBy;get value(){return this._signalBasedValueAccessor?this._signalBasedValueAccessor.value():this._inputValueAccessor.value}set value(e){e!==this.value&&(this._signalBasedValueAccessor?this._signalBasedValueAccessor.value.set(e):this._inputValueAccessor.value=e,this.stateChanges.next())}get readonly(){return this._readonly}set readonly(e){this._readonly=ut(e)}_readonly=!1;disabledInteractive;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}_neverEmptyInputTypes=["date","datetime","datetime-local","month","time","week"].filter(e=>av().has(e));constructor(){let e=u(Oa,{optional:!0}),i=u(kr,{optional:!0}),r=u(Gf),o=u(Uf,{optional:!0,self:!0}),a=this._elementRef.nativeElement,s=a.nodeName.toLowerCase();o?Di(o.value)?this._signalBasedValueAccessor=o:this._inputValueAccessor=o:this._inputValueAccessor=a,this._previousNativeValue=this.value,this.id=this.id,this._platform.IOS&&this._ngZone.runOutsideAngular(()=>{this._cleanupIosKeyup=this._renderer.listen(a,"keyup",this._iOSKeyupListener)}),this._errorStateTracker=new Ua(r,this.ngControl,i,e,this.stateChanges),this._isServer=!this._platform.isBrowser,this._isNativeSelect=s==="select",this._isTextarea=s==="textarea",this._isInFormField=!!this._formField,this.disabledInteractive=this._config?.disabledInteractive||!1,this._isNativeSelect&&(this.controlType=a.multiple?"mat-native-select-multiple":"mat-native-select"),this._signalBasedValueAccessor&&mr(()=>{this._signalBasedValueAccessor.value(),this.stateChanges.next()})}ngAfterViewInit(){this._platform.isBrowser&&this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(e=>{this.autofilled=e.isAutofilled,this.stateChanges.next()})}ngOnChanges(){this.stateChanges.next()}ngOnDestroy(){this.stateChanges.complete(),this._platform.isBrowser&&this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement),this._cleanupIosKeyup?.(),this._cleanupWebkitWheel?.()}ngDoCheck(){this.ngControl&&(this.updateErrorState(),this.ngControl.disabled!==null&&this.ngControl.disabled!==this.disabled&&(this.disabled=this.ngControl.disabled,this.stateChanges.next())),this._dirtyCheckNativeValue(),this._dirtyCheckPlaceholder()}focus(e){this._elementRef.nativeElement.focus(e)}updateErrorState(){this._errorStateTracker.updateErrorState()}_focusChanged(e){if(e!==this.focused){if(!this._isNativeSelect&&e&&this.disabled&&this.disabledInteractive){let i=this._elementRef.nativeElement;i.type==="number"?(i.type="text",i.setSelectionRange(0,0),i.type="number"):i.setSelectionRange(0,0)}this.focused=e,this.stateChanges.next()}}_onInput(){}_dirtyCheckNativeValue(){let e=this._elementRef.nativeElement.value;this._previousNativeValue!==e&&(this._previousNativeValue=e,this.stateChanges.next())}_dirtyCheckPlaceholder(){let e=this._getPlaceholder();if(e!==this._previousPlaceholder){let i=this._elementRef.nativeElement;this._previousPlaceholder=e,e?i.setAttribute("placeholder",e):i.removeAttribute("placeholder")}}_getPlaceholder(){return this.placeholder||null}_validateType(){qL.indexOf(this._type)>-1}_isNeverEmpty(){return this._neverEmptyInputTypes.indexOf(this._type)>-1}_isBadInput(){let e=this._elementRef.nativeElement.validity;return e&&e.badInput}get empty(){return!this._isNeverEmpty()&&!this._elementRef.nativeElement.value&&!this._isBadInput()&&!this.autofilled}get shouldLabelFloat(){if(this._isNativeSelect){let e=this._elementRef.nativeElement,i=e.options[0];return this.focused||e.multiple||!this.empty||!!(e.selectedIndex>-1&&i&&i.label)}else return this.focused&&!this.disabled||!this.empty}get describedByIds(){return this._elementRef.nativeElement.getAttribute("aria-describedby")?.split(" ")||[]}setDescribedByIds(e){let i=this._elementRef.nativeElement;e.length?i.setAttribute("aria-describedby",e.join(" ")):i.removeAttribute("aria-describedby")}onContainerClick(){this.focused||this.focus()}_isInlineSelect(){let e=this._elementRef.nativeElement;return this._isNativeSelect&&(e.multiple||e.size>1)}_iOSKeyupListener=e=>{let i=e.target;!i.value&&i.selectionStart===0&&i.selectionEnd===0&&(i.setSelectionRange(1,1),i.setSelectionRange(0,0))};_getReadonlyAttribute(){return this._isNativeSelect?null:this.readonly||this.disabled&&this.disabledInteractive?"true":null}static \u0275fac=function(i){return new(i||t)};static \u0275dir=z({type:t,selectors:[["input","matInput",""],["textarea","matInput",""],["select","matNativeControl",""],["input","matNativeControl",""],["textarea","matNativeControl",""]],hostAttrs:[1,"mat-mdc-input-element"],hostVars:21,hostBindings:function(i,r){i&1&&x("focus",function(){return r._focusChanged(!0)})("blur",function(){return r._focusChanged(!1)})("input",function(){return r._onInput()}),i&2&&(gt("id",r.id)("disabled",r.disabled&&!r.disabledInteractive)("required",r.required),ce("name",r.name||null)("readonly",r._getReadonlyAttribute())("aria-disabled",r.disabled&&r.disabledInteractive?"true":null)("aria-invalid",r.empty&&r.required?null:r.errorState)("aria-required",r.required)("id",r.id),O("mat-input-server",r._isServer)("mat-mdc-form-field-textarea-control",r._isInFormField&&r._isTextarea)("mat-mdc-form-field-input-control",r._isInFormField)("mat-mdc-input-disabled-interactive",r.disabledInteractive)("mdc-text-field__input",r._isInFormField)("mat-mdc-native-select-inline",r._isInlineSelect()))},inputs:{disabled:"disabled",id:"id",placeholder:"placeholder",name:"name",required:"required",type:"type",errorStateMatcher:"errorStateMatcher",userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],value:"value",readonly:"readonly",disabledInteractive:[2,"disabledInteractive","disabledInteractive",F]},exportAs:["matInput"],features:[xe([{provide:za,useExisting:t}]),Le]})}return t})(),Ya=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=$({type:t});static \u0275inj=H({imports:[qt,qt,lM,be]})}return t})();var cM=(()=>{class t{_animationsDisabled=Xe();state="unchecked";disabled=!1;appearance="full";constructor(){}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["mat-pseudo-checkbox"]],hostAttrs:[1,"mat-pseudo-checkbox"],hostVars:12,hostBindings:function(i,r){i&2&&O("mat-pseudo-checkbox-indeterminate",r.state==="indeterminate")("mat-pseudo-checkbox-checked",r.state==="checked")("mat-pseudo-checkbox-disabled",r.disabled)("mat-pseudo-checkbox-minimal",r.appearance==="minimal")("mat-pseudo-checkbox-full",r.appearance==="full")("_mat-animation-noopable",r._animationsDisabled)},inputs:{state:"state",disabled:"disabled",appearance:"appearance"},decls:0,vars:0,template:function(i,r){},styles:[`.mat-pseudo-checkbox {
  border-radius: 2px;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 0.1), background-color 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox::after {
  position: absolute;
  opacity: 0;
  content: "";
  border-bottom: 2px solid currentColor;
  transition: opacity 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-pseudo-checkbox._mat-animation-noopable::after {
  transition: none;
}

.mat-pseudo-checkbox-disabled {
  cursor: default;
}

.mat-pseudo-checkbox-indeterminate::after {
  left: 1px;
  opacity: 1;
  border-radius: 2px;
}

.mat-pseudo-checkbox-checked::after {
  left: 1px;
  border-left: 2px solid currentColor;
  transform: rotate(-45deg);
  opacity: 1;
  box-sizing: content-box;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  color: var(--mat-pseudo-checkbox-minimal-selected-checkmark-color, var(--mat-sys-primary));
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-pseudo-checkbox-full {
  border-color: var(--mat-pseudo-checkbox-full-unselected-icon-color, var(--mat-sys-on-surface-variant));
  border-width: 2px;
  border-style: solid;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-disabled {
  border-color: var(--mat-pseudo-checkbox-full-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate {
  background-color: var(--mat-pseudo-checkbox-full-selected-icon-color, var(--mat-sys-primary));
  border-color: transparent;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  color: var(--mat-pseudo-checkbox-full-selected-checkmark-color, var(--mat-sys-on-primary));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {
  background-color: var(--mat-pseudo-checkbox-full-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--mat-pseudo-checkbox-full-disabled-selected-checkmark-color, var(--mat-sys-surface));
}

.mat-pseudo-checkbox {
  width: 18px;
  height: 18px;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after {
  width: 14px;
  height: 6px;
  transform-origin: center;
  top: -4.2426406871px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  top: 8px;
  width: 16px;
}

.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after {
  width: 10px;
  height: 4px;
  transform-origin: center;
  top: -2.8284271247px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  top: 6px;
  width: 12px;
}
`],encapsulation:2,changeDetection:0})}return t})();var KL=["text"],QL=[[["mat-icon"]],"*"],ZL=["mat-icon","*"];function XL(t,n){if(t&1&&ie(0,"mat-pseudo-checkbox",1),t&2){let e=X();T("disabled",e.disabled)("state",e.selected?"checked":"unchecked")}}function JL(t,n){if(t&1&&ie(0,"mat-pseudo-checkbox",3),t&2){let e=X();T("disabled",e.disabled)}}function eV(t,n){if(t&1&&(p(0,"span",4),y(1),g()),t&2){let e=X();v(),Qe("(",e.group.label,")")}}var Fv=new b("MAT_OPTION_PARENT_COMPONENT"),Pv=new b("MatOptgroup");var Ov=class{source;isUserInput;constructor(n,e=!1){this.source=n,this.isUserInput=e}},Ti=(()=>{class t{_element=u(P);_changeDetectorRef=u(Fe);_parent=u(Fv,{optional:!0});group=u(Pv,{optional:!0});_signalDisableRipple=!1;_selected=!1;_active=!1;_mostRecentViewValue="";get multiple(){return this._parent&&this._parent.multiple}get selected(){return this._selected}value;id=u(qe).getId("mat-option-");get disabled(){return this.group&&this.group.disabled||this._disabled()}set disabled(e){this._disabled.set(e)}_disabled=re(!1);get disableRipple(){return this._signalDisableRipple?this._parent.disableRipple():!!this._parent?.disableRipple}get hideSingleSelectionIndicator(){return!!(this._parent&&this._parent.hideSingleSelectionIndicator)}onSelectionChange=new S;_text;_stateChanges=new M;constructor(){let e=u(je);e.load(Ln),e.load(Si),this._signalDisableRipple=!!this._parent&&Di(this._parent.disableRipple)}get active(){return this._active}get viewValue(){return(this._text?.nativeElement.textContent||"").trim()}select(e=!0){this._selected||(this._selected=!0,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}deselect(e=!0){this._selected&&(this._selected=!1,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}focus(e,i){let r=this._getHostElement();typeof r.focus=="function"&&r.focus(i)}setActiveStyles(){this._active||(this._active=!0,this._changeDetectorRef.markForCheck())}setInactiveStyles(){this._active&&(this._active=!1,this._changeDetectorRef.markForCheck())}getLabel(){return this.viewValue}_handleKeydown(e){(e.keyCode===13||e.keyCode===32)&&!vt(e)&&(this._selectViaInteraction(),e.preventDefault())}_selectViaInteraction(){this.disabled||(this._selected=this.multiple?!this._selected:!0,this._changeDetectorRef.markForCheck(),this._emitSelectionChangeEvent(!0))}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._element.nativeElement}ngAfterViewChecked(){if(this._selected){let e=this.viewValue;e!==this._mostRecentViewValue&&(this._mostRecentViewValue&&this._stateChanges.next(),this._mostRecentViewValue=e)}}ngOnDestroy(){this._stateChanges.complete()}_emitSelectionChangeEvent(e=!1){this.onSelectionChange.emit(new Ov(this,e))}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["mat-option"]],viewQuery:function(i,r){if(i&1&&ve(KL,7),i&2){let o;B(o=j())&&(r._text=o.first)}},hostAttrs:["role","option",1,"mat-mdc-option","mdc-list-item"],hostVars:11,hostBindings:function(i,r){i&1&&x("click",function(){return r._selectViaInteraction()})("keydown",function(a){return r._handleKeydown(a)}),i&2&&(gt("id",r.id),ce("aria-selected",r.selected)("aria-disabled",r.disabled.toString()),O("mdc-list-item--selected",r.selected)("mat-mdc-option-multiple",r.multiple)("mat-mdc-option-active",r.active)("mdc-list-item--disabled",r.disabled))},inputs:{value:"value",id:"id",disabled:[2,"disabled","disabled",F]},outputs:{onSelectionChange:"onSelectionChange"},exportAs:["matOption"],ngContentSelectors:ZL,decls:8,vars:5,consts:[["text",""],["aria-hidden","true",1,"mat-mdc-option-pseudo-checkbox",3,"disabled","state"],[1,"mdc-list-item__primary-text"],["state","checked","aria-hidden","true","appearance","minimal",1,"mat-mdc-option-pseudo-checkbox",3,"disabled"],[1,"cdk-visually-hidden"],["aria-hidden","true","mat-ripple","",1,"mat-mdc-option-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled"]],template:function(i,r){i&1&&(we(QL),ge(0,XL,1,2,"mat-pseudo-checkbox",1),Z(1),p(2,"span",2,0),Z(4,1),g(),ge(5,JL,1,1,"mat-pseudo-checkbox",3),ge(6,eV,2,1,"span",4),ie(7,"div",5)),i&2&&(_e(r.multiple?0:-1),v(5),_e(!r.multiple&&r.selected&&!r.hideSingleSelectionIndicator?5:-1),v(),_e(r.group&&r.group._inert?6:-1),v(),T("matRippleTrigger",r._getHostElement())("matRippleDisabled",r.disabled||r.disableRipple))},dependencies:[cM,Tr],styles:[`.mat-mdc-option {
  -webkit-user-select: none;
  user-select: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  min-height: 48px;
  padding: 0 16px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  color: var(--mat-option-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-option-label-text-font, var(--mat-sys-label-large-font));
  line-height: var(--mat-option-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-size: var(--mat-option-label-text-size, var(--mat-sys-body-large-size));
  letter-spacing: var(--mat-option-label-text-tracking, var(--mat-sys-label-large-tracking));
  font-weight: var(--mat-option-label-text-weight, var(--mat-sys-body-large-weight));
}
.mat-mdc-option:hover:not(.mdc-list-item--disabled) {
  background-color: var(--mat-option-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-option:focus.mdc-list-item, .mat-mdc-option.mat-mdc-option-active.mdc-list-item {
  background-color: var(--mat-option-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));
  outline: 0;
}
.mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) {
  background-color: var(--mat-option-selected-state-layer-color, var(--mat-sys-secondary-container));
}
.mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) .mdc-list-item__primary-text {
  color: var(--mat-option-selected-state-label-text-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-option .mat-pseudo-checkbox {
  --mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--mat-option-selected-state-label-text-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-option.mdc-list-item {
  align-items: center;
  background: transparent;
}
.mat-mdc-option.mdc-list-item--disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-option.mdc-list-item--disabled .mat-mdc-option-pseudo-checkbox, .mat-mdc-option.mdc-list-item--disabled .mdc-list-item__primary-text, .mat-mdc-option.mdc-list-item--disabled > mat-icon {
  opacity: 0.38;
}
.mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {
  padding-left: 32px;
}
[dir=rtl] .mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {
  padding-left: 16px;
  padding-right: 32px;
}
.mat-mdc-option .mat-icon,
.mat-mdc-option .mat-pseudo-checkbox-full {
  margin-right: 16px;
  flex-shrink: 0;
}
[dir=rtl] .mat-mdc-option .mat-icon,
[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-full {
  margin-right: 0;
  margin-left: 16px;
}
.mat-mdc-option .mat-pseudo-checkbox-minimal {
  margin-left: 16px;
  flex-shrink: 0;
}
[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-minimal {
  margin-right: 16px;
  margin-left: 0;
}
.mat-mdc-option .mat-mdc-option-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
.mat-mdc-option .mdc-list-item__primary-text {
  white-space: normal;
  font-size: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  font-family: inherit;
  text-decoration: inherit;
  text-transform: inherit;
  margin-right: auto;
}
[dir=rtl] .mat-mdc-option .mdc-list-item__primary-text {
  margin-right: 0;
  margin-left: auto;
}
@media (forced-colors: active) {
  .mat-mdc-option.mdc-list-item--selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    width: 10px;
    height: 0;
    border-bottom: solid 10px;
    border-radius: 10px;
  }
  [dir=rtl] .mat-mdc-option.mdc-list-item--selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {
    right: auto;
    left: 16px;
  }
}

.mat-mdc-option-multiple {
  --mat-list-list-item-selected-container-color: var(--mat-list-list-item-container-color, transparent);
}

.mat-mdc-option-active .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2,changeDetection:0})}return t})();function dM(t,n,e){if(e.length){let i=n.toArray(),r=e.toArray(),o=0;for(let a=0;a<t+1;a++)i[a].group&&i[a].group===r[o]&&o++;return o}return 0}function uM(t,n,e,i){return t<e?t:t+n>e+i?Math.max(0,t-i+n):e}var fM=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=$({type:t});static \u0275inj=H({imports:[be]})}return t})();var Lv=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=$({type:t});static \u0275inj=H({imports:[Va,fM,Ti,be]})}return t})();var tV=/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|(?:(?:\+|-)\d{2}:\d{2}))?)?$/,nV=/^(\d?\d)[:.](\d?\d)(?:[:.](\d?\d))?\s*(AM|PM)?$/i;function Vv(t,n){let e=Array(t);for(let i=0;i<t;i++)e[i]=n(i);return e}var iV=(()=>{class t extends Ht{_matDateLocale=u(bv,{optional:!0});constructor(){super();let e=u(bv,{optional:!0});e!==void 0&&(this._matDateLocale=e),super.setLocale(this._matDateLocale)}getYear(e){return e.getFullYear()}getMonth(e){return e.getMonth()}getDate(e){return e.getDate()}getDayOfWeek(e){return e.getDay()}getMonthNames(e){let i=new Intl.DateTimeFormat(this.locale,{month:e,timeZone:"utc"});return Vv(12,r=>this._format(i,new Date(2017,r,1)))}getDateNames(){let e=new Intl.DateTimeFormat(this.locale,{day:"numeric",timeZone:"utc"});return Vv(31,i=>this._format(e,new Date(2017,0,i+1)))}getDayOfWeekNames(e){let i=new Intl.DateTimeFormat(this.locale,{weekday:e,timeZone:"utc"});return Vv(7,r=>this._format(i,new Date(2017,0,r+1)))}getYearName(e){let i=new Intl.DateTimeFormat(this.locale,{year:"numeric",timeZone:"utc"});return this._format(i,e)}getFirstDayOfWeek(){if(typeof Intl<"u"&&Intl.Locale){let e=new Intl.Locale(this.locale),i=(e.getWeekInfo?.()||e.weekInfo)?.firstDay??0;return i===7?0:i}return 0}getNumDaysInMonth(e){return this.getDate(this._createDateWithOverflow(this.getYear(e),this.getMonth(e)+1,0))}clone(e){return new Date(e.getTime())}createDate(e,i,r){let o=this._createDateWithOverflow(e,i,r);return o.getMonth()!=i,o}today(){return new Date}parse(e,i){return typeof e=="number"?new Date(e):e?new Date(Date.parse(e)):null}format(e,i){if(!this.isValid(e))throw Error("NativeDateAdapter: Cannot format invalid date.");let r=new Intl.DateTimeFormat(this.locale,De(N({},i),{timeZone:"utc"}));return this._format(r,e)}addCalendarYears(e,i){return this.addCalendarMonths(e,i*12)}addCalendarMonths(e,i){let r=this._createDateWithOverflow(this.getYear(e),this.getMonth(e)+i,this.getDate(e));return this.getMonth(r)!=((this.getMonth(e)+i)%12+12)%12&&(r=this._createDateWithOverflow(this.getYear(r),this.getMonth(r),0)),r}addCalendarDays(e,i){return this._createDateWithOverflow(this.getYear(e),this.getMonth(e),this.getDate(e)+i)}toIso8601(e){return[e.getUTCFullYear(),this._2digit(e.getUTCMonth()+1),this._2digit(e.getUTCDate())].join("-")}deserialize(e){if(typeof e=="string"){if(!e)return null;if(tV.test(e)){let i=new Date(e);if(this.isValid(i))return i}}return super.deserialize(e)}isDateInstance(e){return e instanceof Date}isValid(e){return!isNaN(e.getTime())}invalid(){return new Date(NaN)}setTime(e,i,r,o){let a=this.clone(e);return a.setHours(i,r,o,0),a}getHours(e){return e.getHours()}getMinutes(e){return e.getMinutes()}getSeconds(e){return e.getSeconds()}parseTime(e,i){if(typeof e!="string")return e instanceof Date?new Date(e.getTime()):null;let r=e.trim();if(r.length===0)return null;let o=this._parseTimeString(r);if(o===null){let a=r.replace(/[^0-9:(AM|PM)]/gi,"").trim();a.length>0&&(o=this._parseTimeString(a))}return o||this.invalid()}addSeconds(e,i){return new Date(e.getTime()+i*1e3)}_createDateWithOverflow(e,i,r){let o=new Date;return o.setFullYear(e,i,r),o.setHours(0,0,0,0),o}_2digit(e){return("00"+e).slice(-2)}_format(e,i){let r=new Date;return r.setUTCFullYear(i.getFullYear(),i.getMonth(),i.getDate()),r.setUTCHours(i.getHours(),i.getMinutes(),i.getSeconds(),i.getMilliseconds()),e.format(r)}_parseTimeString(e){let i=e.toUpperCase().match(nV);if(i){let r=parseInt(i[1]),o=parseInt(i[2]),a=i[3]==null?void 0:parseInt(i[3]),s=i[4];if(r===12?r=s==="AM"?0:r:s==="PM"&&(r+=12),Bv(r,0,23)&&Bv(o,0,59)&&(a==null||Bv(a,0,59)))return this.setTime(this.today(),r,o,a||0)}return null}static \u0275fac=function(i){return new(i||t)};static \u0275prov=C({token:t,factory:t.\u0275fac})}return t})();function Bv(t,n,e){return!isNaN(t)&&t>=n&&t<=e}var rV={parse:{dateInput:null,timeInput:null},display:{dateInput:{year:"numeric",month:"numeric",day:"numeric"},timeInput:{hour:"numeric",minute:"numeric"},monthYearLabel:{year:"numeric",month:"short"},dateA11yLabel:{year:"numeric",month:"long",day:"numeric"},monthYearA11yLabel:{year:"numeric",month:"long"},timeOptionLabel:{hour:"numeric",minute:"numeric"}}};function hM(t=rV){return[{provide:Ht,useClass:iV},{provide:Ar,useValue:t}]}var Zf=(()=>{class t{popover;autoFocus=!0;restoreFocus=!0;form;constructor(e=u(Pf)){this.form=e.group({first:"Monty",last:"Python",birthDate:new Date(1969,9,5)})}closeOnEnter(e){e.code==="Enter"&&this.popover.close()}static \u0275fac=function(i){return new(i||t)(he(Pf))};static \u0275cmp=I({type:t,selectors:[["demo-focus"]],viewQuery:function(i,r){if(i&1&&ve(Te,7),i&2){let o;B(o=j())&&(r.popover=o.first)}},features:[xe([hM()])],decls:39,vars:13,consts:[["anchor","satPopoverAnchor"],["p",""],["picker",""],[1,"options"],[3,"ngModelChange","ngModel"],["satPopoverAnchor","",1,"results","mat-body-1"],["mat-icon-button","",1,"edit",3,"click"],["hasBackdrop","","horizontalAlign","after",3,"anchor","autoFocus","restoreFocus"],[1,"form",3,"formGroup"],["matInput","","formControlName","first","placeholder","First Name",3,"keydown"],["matInput","","formControlName","last","placeholder","Last Name",3,"keydown"],["matInput","","formControlName","birthDate","placeholder","Birth Date",3,"keydown","matDatepicker"],["matSuffix","",3,"for"]],template:function(i,r){if(i&1){let o=ke();p(0,"mat-card")(1,"mat-card-title"),y(2,"Focus Behavior"),g(),p(3,"mat-card-content")(4,"div",3)(5,"mat-checkbox",4),Be("ngModelChange",function(s){return L(o),ze(r.autoFocus,s)||(r.autoFocus=s),V(s)}),y(6,"Auto Focus"),g(),p(7,"mat-checkbox",4),Be("ngModelChange",function(s){return L(o),ze(r.restoreFocus,s)||(r.restoreFocus=s),V(s)}),y(8,"Restore Focus"),g()(),p(9,"div",5,0)(11,"button",6),x("click",function(){L(o);let s=Y(28);return V(s.toggle())}),p(12,"mat-icon"),y(13,"create"),g()(),p(14,"p")(15,"b"),y(16,"First Name"),g(),y(17),g(),p(18,"p")(19,"b"),y(20,"Last Name"),g(),y(21),g(),p(22,"p")(23,"b"),y(24,"Birth Date"),g(),y(25),gg(26,"date"),g()(),p(27,"sat-popover",7,1)(29,"div",8)(30,"mat-form-field")(31,"input",9),x("keydown",function(s){return r.closeOnEnter(s)}),g()(),p(32,"mat-form-field")(33,"input",10),x("keydown",function(s){return r.closeOnEnter(s)}),g()(),p(34,"mat-form-field")(35,"input",11),x("keydown",function(s){return r.closeOnEnter(s)}),g(),ie(36,"mat-datepicker-toggle",12)(37,"mat-datepicker",null,2),g()()()()()}if(i&2){let o=Y(10),a=Y(38);v(5),Ve("ngModel",r.autoFocus),v(2),Ve("ngModel",r.restoreFocus),v(10),Qe(": ",r.form.value.first),v(4),Qe(": ",r.form.value.last),v(4),Qe(": ",_g(26,11,r.form.value.birthDate)),v(2),T("anchor",o)("autoFocus",r.autoFocus)("restoreFocus",r.restoreFocus),v(2),T("formGroup",r.form),v(6),T("matDatepicker",a),v(),T("for",a)}},dependencies:[Wt,Vt,Ir,Fn,Zx,gn,Bt,La,It,xt,Mt,St,ja,Po,JS,XS,qf,Rv,qt,Vn,wv,Qf,Kf,Ya,qa,ft,Te,Ze,Lf,kr,ov,Rg],styles:["[_nghost-%COMP%]{display:block}.results[_ngcontent-%COMP%]{background:#0000000f;display:inline-block;padding:32px;position:relative}.results[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:4px 0}.edit[_ngcontent-%COMP%]{position:absolute;right:0;top:0;margin:4px;color:#0000008a}.form[_ngcontent-%COMP%]{box-shadow:0 5px 5px -3px #0003,0 8px 10px 1px #00000024,0 3px 14px 2px #0000001f;display:flex;flex-direction:column;padding:24px;background:#fff}"]})}return t})();var oV=["optionsPanel"];function aV(t,n){t&1&&(p(0,"p"),y(1," You don't necessarily need to select an option. You can press ESC or click on the backdrop to close the popover. "),g())}function sV(t,n){t&1&&(p(0,"p"),y(1," You must select one of the options in the popover. Pressing ESC or clicking outside the popover will not close it. "),g())}var Xf=(()=>{class t{popover;optionsPanel;showError=!1;interactiveClose=!1;_onDestroy=new M;ngAfterViewInit(){let e=this.popover.overlayKeydown.pipe(He(r=>r.keyCode===27)),i=this.popover.backdropClicked;an(e,i).pipe(fe(this._onDestroy)).subscribe(()=>this._showAlert())}ngOnDestroy(){this._onDestroy.next(),this._onDestroy.complete()}_showAlert(){this.showError=!0,this.optionsPanel.nativeElement.classList.add("shake"),setTimeout(()=>this.optionsPanel.nativeElement.classList.remove("shake"),300)}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["demo-interactive-close"]],viewQuery:function(i,r){if(i&1&&ve(Te,7)(oV,5),i&2){let o;B(o=j())&&(r.popover=o.first),B(o=j())&&(r.optionsPanel=o.first)}},decls:21,vars:6,consts:[["anchor","satPopoverAnchor"],["p",""],["optionsPanel",""],[3,"ngModelChange","ngModel"],["mat-raised-button","","satPopoverAnchor","","color","accent",3,"click"],["hasBackdrop","","backdropClass","demo-background-dark",3,"closed","anchor","interactiveClose"],[1,"options"],[1,"mat-body-1"],["mat-button","",3,"click"]],template:function(i,r){if(i&1){let o=ke();p(0,"mat-card")(1,"mat-card-title"),y(2,"Interactive Close Behavior"),g(),p(3,"mat-card-content")(4,"mat-checkbox",3),Be("ngModelChange",function(s){return L(o),ze(r.interactiveClose,s)||(r.interactiveClose=s),V(s)}),y(5,"Allow Interactive Closing"),g(),ge(6,aV,2,0,"p")(7,sV,2,0,"p"),p(8,"button",4,0),x("click",function(){L(o);let s=Y(12);return V(s.open())}),y(10," Open "),g()()(),p(11,"sat-popover",5,1),x("closed",function(){return r.showError=!1}),p(13,"div",6,2)(15,"p",7),y(16,"Please select one of the following:"),g(),p(17,"button",8),x("click",function(){L(o);let s=Y(12);return V(s.close(!0))}),y(18,"Agree"),g(),p(19,"button",8),x("click",function(){L(o);let s=Y(12);return V(s.close(!1))}),y(20,"Disagree"),g()()()}if(i&2){let o=Y(9);v(4),Ve("ngModel",r.interactiveClose),v(2),_e(r.interactiveClose?7:6),v(5),T("anchor",o)("interactiveClose",r.interactiveClose),v(4),O("error",r.showError)}},dependencies:[Vt,Fn,gn,Bt,_n,It,xt,Mt,St,ja,Po,ft,Te,Ze],styles:["[_nghost-%COMP%]{display:block}.options[_ngcontent-%COMP%]{box-shadow:0 5px 5px -3px #0003,0 8px 10px 1px #00000024,0 3px 14px 2px #0000001f;display:flex;flex-direction:column;padding:24px;background:#fff}.options[_ngcontent-%COMP%]   .error[_ngcontent-%COMP%]{color:#e63922}.options[_ngcontent-%COMP%]   .mat-button[_ngcontent-%COMP%]{margin-top:8px}.shake[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_shake .3s ease-in-out}@keyframes _ngcontent-%COMP%_shake{0%{transform:translate(0)}12.5%{transform:translate(-6px) rotateY(-5deg)}37.5%{transform:translate(5px) rotateY(4deg)}62.5%{transform:translate(-3px) rotateY(-2deg)}87.5%{transform:translate(2px) rotateY(1deg)}to{transform:translate(0)}}"]})}return t})();var lV=["trigger"],cV=["panel"],dV=[[["mat-select-trigger"]],"*"],uV=["mat-select-trigger","*"];function fV(t,n){if(t&1&&(p(0,"span",4),y(1),g()),t&2){let e=X();v(),ct(e.placeholder)}}function hV(t,n){t&1&&Z(0)}function mV(t,n){if(t&1&&(p(0,"span",11),y(1),g()),t&2){let e=X(2);v(),ct(e.triggerValue)}}function pV(t,n){if(t&1&&(p(0,"span",5),ge(1,hV,1,0)(2,mV,2,1,"span",11),g()),t&2){let e=X();v(),_e(e.customTrigger?1:2)}}function gV(t,n){if(t&1){let e=ke();p(0,"div",12,1),x("keydown",function(r){L(e);let o=X();return V(o._handleKeydown(r))}),Z(2,1),g()}if(t&2){let e=X();_t(e.panelClass),O("mat-select-panel-animations-enabled",!e._animationsDisabled)("mat-primary",(e._parentFormField==null?null:e._parentFormField.color)==="primary")("mat-accent",(e._parentFormField==null?null:e._parentFormField.color)==="accent")("mat-warn",(e._parentFormField==null?null:e._parentFormField.color)==="warn")("mat-undefined",!(e._parentFormField!=null&&e._parentFormField.color)),ce("id",e.id+"-panel")("aria-multiselectable",e.multiple)("aria-label",e.ariaLabel||null)("aria-labelledby",e._getPanelAriaLabelledby())}}var _V=new b("mat-select-scroll-strategy",{providedIn:"root",factory:()=>{let t=u(ne);return()=>qi(t)}}),vV=new b("MAT_SELECT_CONFIG"),yV=new b("MatSelectTrigger"),jv=class{source;value;constructor(n,e){this.source=n,this.value=e}},Ka=(()=>{class t{_viewportRuler=u(Cr);_changeDetectorRef=u(Fe);_elementRef=u(P);_dir=u(Et,{optional:!0});_idGenerator=u(qe);_renderer=u($e);_parentFormField=u(Lo,{optional:!0});ngControl=u(Nn,{self:!0,optional:!0});_liveAnnouncer=u(H_);_defaultOptions=u(vV,{optional:!0});_animationsDisabled=Xe();_popoverLocation;_initialized=new M;_cleanupDetach;options;optionGroups;customTrigger;_positions=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top"},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top"},{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"}];_scrollOptionIntoView(e){let i=this.options.toArray()[e];if(i){let r=this.panel.nativeElement,o=dM(e,this.options,this.optionGroups),a=i._getHostElement();e===0&&o===1?r.scrollTop=0:r.scrollTop=uM(a.offsetTop,a.offsetHeight,r.scrollTop,r.offsetHeight)}}_positioningSettled(){this._scrollOptionIntoView(this._keyManager.activeItemIndex||0)}_getChangeEvent(e){return new jv(this,e)}_scrollStrategyFactory=u(_V);_panelOpen=!1;_compareWith=(e,i)=>e===i;_uid=this._idGenerator.getId("mat-select-");_triggerAriaLabelledBy=null;_previousControl;_destroy=new M;_errorStateTracker;stateChanges=new M;disableAutomaticLabeling=!0;userAriaDescribedBy;_selectionModel;_keyManager;_preferredOverlayOrigin;_overlayWidth;_onChange=()=>{};_onTouched=()=>{};_valueId=this._idGenerator.getId("mat-select-value-");_scrollStrategy;_overlayPanelClass=this._defaultOptions?.overlayPanelClass||"";get focused(){return this._focused||this._panelOpen}_focused=!1;controlType="mat-select";trigger;panel;_overlayDir;panelClass;disabled=!1;get disableRipple(){return this._disableRipple()}set disableRipple(e){this._disableRipple.set(e)}_disableRipple=re(!1);tabIndex=0;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._syncParentProperties()}_hideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??!1;get placeholder(){return this._placeholder}set placeholder(e){this._placeholder=e,this.stateChanges.next()}_placeholder;get required(){return this._required??this.ngControl?.control?.hasValidator(Sr.required)??!1}set required(e){this._required=e,this.stateChanges.next()}_required;get multiple(){return this._multiple}set multiple(e){this._selectionModel,this._multiple=e}_multiple=!1;disableOptionCentering=this._defaultOptions?.disableOptionCentering??!1;get compareWith(){return this._compareWith}set compareWith(e){this._compareWith=e,this._selectionModel&&this._initializeSelection()}get value(){return this._value}set value(e){this._assignValue(e)&&this._onChange(e)}_value;ariaLabel="";ariaLabelledby;get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}typeaheadDebounceInterval;sortComparator;get id(){return this._id}set id(e){this._id=e||this._uid,this.stateChanges.next()}_id;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}panelWidth=this._defaultOptions&&typeof this._defaultOptions.panelWidth<"u"?this._defaultOptions.panelWidth:"auto";canSelectNullableOptions=this._defaultOptions?.canSelectNullableOptions??!1;optionSelectionChanges=Mh(()=>{let e=this.options;return e?e.changes.pipe(sn(e),zn(()=>an(...e.map(i=>i.onSelectionChange)))):this._initialized.pipe(zn(()=>this.optionSelectionChanges))});openedChange=new S;_openedStream=this.openedChange.pipe(He(e=>e),Se(()=>{}));_closedStream=this.openedChange.pipe(He(e=>!e),Se(()=>{}));selectionChange=new S;valueChange=new S;constructor(){let e=u(Gf),i=u(Oa,{optional:!0}),r=u(kr,{optional:!0}),o=u(new en("tabindex"),{optional:!0}),a=u(vl,{optional:!0});this.ngControl&&(this.ngControl.valueAccessor=this),this._defaultOptions?.typeaheadDebounceInterval!=null&&(this.typeaheadDebounceInterval=this._defaultOptions.typeaheadDebounceInterval),this._errorStateTracker=new Ua(e,this.ngControl,r,i,this.stateChanges),this._scrollStrategy=this._scrollStrategyFactory(),this.tabIndex=o==null?0:parseInt(o)||0,this._popoverLocation=a?.usePopover===!1?null:"inline",this.id=this.id}ngOnInit(){this._selectionModel=new Hl(this.multiple),this.stateChanges.next(),this._viewportRuler.change().pipe(fe(this._destroy)).subscribe(()=>{this.panelOpen&&(this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._changeDetectorRef.detectChanges())})}ngAfterContentInit(){this._initialized.next(),this._initialized.complete(),this._initKeyManager(),this._selectionModel.changed.pipe(fe(this._destroy)).subscribe(e=>{e.added.forEach(i=>i.select()),e.removed.forEach(i=>i.deselect())}),this.options.changes.pipe(sn(null),fe(this._destroy)).subscribe(()=>{this._resetOptions(),this._initializeSelection()})}ngDoCheck(){let e=this._getTriggerAriaLabelledby(),i=this.ngControl;if(e!==this._triggerAriaLabelledBy){let r=this._elementRef.nativeElement;this._triggerAriaLabelledBy=e,e?r.setAttribute("aria-labelledby",e):r.removeAttribute("aria-labelledby")}i&&(this._previousControl!==i.control&&(this._previousControl!==void 0&&i.disabled!==null&&i.disabled!==this.disabled&&(this.disabled=i.disabled),this._previousControl=i.control),this.updateErrorState())}ngOnChanges(e){(e.disabled||e.userAriaDescribedBy)&&this.stateChanges.next(),e.typeaheadDebounceInterval&&this._keyManager&&this._keyManager.withTypeAhead(this.typeaheadDebounceInterval),e.panelClass&&this.panelClass instanceof Set&&(this.panelClass=Array.from(this.panelClass))}ngOnDestroy(){this._cleanupDetach?.(),this._keyManager?.destroy(),this._destroy.next(),this._destroy.complete(),this.stateChanges.complete(),this._clearFromModal()}toggle(){this.panelOpen?this.close():this.open()}open(){this._canOpen()&&(this._parentFormField&&(this._preferredOverlayOrigin=this._parentFormField.getConnectedOverlayOrigin()),this._cleanupDetach?.(),this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._applyModalPanelOwnership(),this._panelOpen=!0,this._overlayDir.positionChange.pipe(Qt(1)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this._positioningSettled()}),this._overlayDir.attachOverlay(),this._keyManager.withHorizontalOrientation(null),this._highlightCorrectOption(),this._changeDetectorRef.markForCheck(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(!0)))}_trackedModal=null;_applyModalPanelOwnership(){let e=this._elementRef.nativeElement.closest('body > .cdk-overlay-container [aria-modal="true"]');if(!e)return;let i=`${this.id}-panel`;this._trackedModal&&vf(this._trackedModal,"aria-owns",i),W_(e,"aria-owns",i),this._trackedModal=e}_clearFromModal(){if(!this._trackedModal)return;let e=`${this.id}-panel`;vf(this._trackedModal,"aria-owns",e),this._trackedModal=null}close(){this._panelOpen&&(this._panelOpen=!1,this._exitAndDetach(),this._keyManager.withHorizontalOrientation(this._isRtl()?"rtl":"ltr"),this._changeDetectorRef.markForCheck(),this._onTouched(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(!1)))}_exitAndDetach(){if(this._animationsDisabled||!this.panel){this._detachOverlay();return}this._cleanupDetach?.(),this._cleanupDetach=()=>{i(),clearTimeout(r),this._cleanupDetach=void 0};let e=this.panel.nativeElement,i=this._renderer.listen(e,"animationend",o=>{o.animationName==="_mat-select-exit"&&(this._cleanupDetach?.(),this._detachOverlay())}),r=setTimeout(()=>{this._cleanupDetach?.(),this._detachOverlay()},200);e.classList.add("mat-select-panel-exit")}_detachOverlay(){this._overlayDir.detachOverlay(),this._changeDetectorRef.markForCheck()}writeValue(e){this._assignValue(e)}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck(),this.stateChanges.next()}get panelOpen(){return this._panelOpen}get selected(){return this.multiple?this._selectionModel?.selected||[]:this._selectionModel?.selected[0]}get triggerValue(){if(this.empty)return"";if(this._multiple){let e=this._selectionModel.selected.map(i=>i.viewValue);return this._isRtl()&&e.reverse(),e.join(", ")}return this._selectionModel.selected[0].viewValue}updateErrorState(){this._errorStateTracker.updateErrorState()}_isRtl(){return this._dir?this._dir.value==="rtl":!1}_handleKeydown(e){this.disabled||(this.panelOpen?this._handleOpenKeydown(e):this._handleClosedKeydown(e))}_handleClosedKeydown(e){let i=e.keyCode,r=i===40||i===38||i===37||i===39,o=i===13||i===32,a=this._keyManager;if(!a.isTyping()&&o&&!vt(e)||(this.multiple||e.altKey)&&r)e.preventDefault(),this.open();else if(!this.multiple){let s=this.selected;a.onKeydown(e);let l=this.selected;l&&s!==l&&this._liveAnnouncer.announce(l.viewValue,1e4)}}_handleOpenKeydown(e){let i=this._keyManager,r=e.keyCode,o=r===40||r===38,a=i.isTyping();if(o&&e.altKey)e.preventDefault(),this.close();else if(!a&&(r===13||r===32)&&i.activeItem&&!vt(e))e.preventDefault(),i.activeItem._selectViaInteraction();else if(!a&&this._multiple&&r===65&&e.ctrlKey){e.preventDefault();let s=this.options.some(l=>!l.disabled&&!l.selected);this.options.forEach(l=>{l.disabled||(s?l.select():l.deselect())})}else{let s=i.activeItemIndex;i.onKeydown(e),this._multiple&&o&&e.shiftKey&&i.activeItem&&i.activeItemIndex!==s&&i.activeItem._selectViaInteraction()}}_handleOverlayKeydown(e){e.keyCode===27&&!vt(e)&&(e.preventDefault(),this.close())}_onFocus(){this.disabled||(this._focused=!0,this.stateChanges.next())}_onBlur(){this._focused=!1,this._keyManager?.cancelTypeahead(),!this.disabled&&!this.panelOpen&&(this._onTouched(),this._changeDetectorRef.markForCheck(),this.stateChanges.next())}get empty(){return!this._selectionModel||this._selectionModel.isEmpty()}_initializeSelection(){Promise.resolve().then(()=>{this.ngControl&&(this._value=this.ngControl.value),this._setSelectionByValue(this._value),this.stateChanges.next()})}_setSelectionByValue(e){if(this.options.forEach(i=>i.setInactiveStyles()),this._selectionModel.clear(),this.multiple&&e)Array.isArray(e),e.forEach(i=>this._selectOptionByValue(i)),this._sortValues();else{let i=this._selectOptionByValue(e);i?this._keyManager.updateActiveItem(i):this.panelOpen||this._keyManager.updateActiveItem(-1)}this._changeDetectorRef.markForCheck()}_selectOptionByValue(e){let i=this.options.find(r=>{if(this._selectionModel.isSelected(r))return!1;try{return(r.value!=null||this.canSelectNullableOptions)&&this._compareWith(r.value,e)}catch(o){return!1}});return i&&this._selectionModel.select(i),i}_assignValue(e){return e!==this._value||this._multiple&&Array.isArray(e)?(this.options&&this._setSelectionByValue(e),this._value=e,!0):!1}_skipPredicate=e=>this.panelOpen?!1:e.disabled;_getOverlayWidth(e){return this.panelWidth==="auto"?(e instanceof Ma?e.elementRef:e||this._elementRef).nativeElement.getBoundingClientRect().width:this.panelWidth===null?"":this.panelWidth}_syncParentProperties(){if(this.options)for(let e of this.options)e._changeDetectorRef.markForCheck()}_initKeyManager(){this._keyManager=new Ml(this.options).withTypeAhead(this.typeaheadDebounceInterval).withVerticalOrientation().withHorizontalOrientation(this._isRtl()?"rtl":"ltr").withHomeAndEnd().withPageUpDown().withAllowedModifierKeys(["shiftKey"]).skipPredicate(this._skipPredicate),this._keyManager.tabOut.subscribe(()=>{this.panelOpen&&(!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction(),this.focus(),this.close())}),this._keyManager.change.subscribe(()=>{this._panelOpen&&this.panel?this._scrollOptionIntoView(this._keyManager.activeItemIndex||0):!this._panelOpen&&!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction()})}_resetOptions(){let e=an(this.options.changes,this._destroy);this.optionSelectionChanges.pipe(fe(e)).subscribe(i=>{this._onSelect(i.source,i.isUserInput),i.isUserInput&&!this.multiple&&this._panelOpen&&(this.close(),this.focus())}),an(...this.options.map(i=>i._stateChanges)).pipe(fe(e)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this.stateChanges.next()})}_onSelect(e,i){let r=this._selectionModel.isSelected(e);!this.canSelectNullableOptions&&e.value==null&&!this._multiple?(e.deselect(),this._selectionModel.clear(),this.value!=null&&this._propagateChanges(e.value)):(r!==e.selected&&(e.selected?this._selectionModel.select(e):this._selectionModel.deselect(e)),i&&this._keyManager.setActiveItem(e),this.multiple&&(this._sortValues(),i&&this.focus())),r!==this._selectionModel.isSelected(e)&&this._propagateChanges(),this.stateChanges.next()}_sortValues(){if(this.multiple){let e=this.options.toArray();this._selectionModel.sort((i,r)=>this.sortComparator?this.sortComparator(i,r,e):e.indexOf(i)-e.indexOf(r)),this.stateChanges.next()}}_propagateChanges(e){let i;this.multiple?i=this.selected.map(r=>r.value):i=this.selected?this.selected.value:e,this._value=i,this.valueChange.emit(i),this._onChange(i),this.selectionChange.emit(this._getChangeEvent(i)),this._changeDetectorRef.markForCheck()}_highlightCorrectOption(){if(this._keyManager)if(this.empty){let e=-1;for(let i=0;i<this.options.length;i++)if(!this.options.get(i).disabled){e=i;break}this._keyManager.setActiveItem(e)}else this._keyManager.setActiveItem(this._selectionModel.selected[0])}_canOpen(){return!this._panelOpen&&!this.disabled&&this.options?.length>0&&!!this._overlayDir}focus(e){this._elementRef.nativeElement.focus(e)}_getPanelAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||null,i=e?e+" ":"";return this.ariaLabelledby?i+this.ariaLabelledby:e}_getAriaActiveDescendant(){return this.panelOpen&&this._keyManager&&this._keyManager.activeItem?this._keyManager.activeItem.id:null}_getTriggerAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||"";return this.ariaLabelledby&&(e+=" "+this.ariaLabelledby),e||(e=this._valueId),e}get describedByIds(){return this._elementRef.nativeElement.getAttribute("aria-describedby")?.split(" ")||[]}setDescribedByIds(e){let i=this._elementRef.nativeElement;e.length?i.setAttribute("aria-describedby",e.join(" ")):i.removeAttribute("aria-describedby")}onContainerClick(e){let i=Rt(e);i&&(i.tagName==="MAT-OPTION"||i.classList.contains("cdk-overlay-backdrop")||i.closest(".mat-mdc-select-panel"))||(this.focus(),this.open())}get shouldLabelFloat(){return this.panelOpen||!this.empty||this.focused&&!!this.placeholder}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["mat-select"]],contentQueries:function(i,r,o){if(i&1&&Mn(o,yV,5)(o,Ti,5)(o,Pv,5),i&2){let a;B(a=j())&&(r.customTrigger=a.first),B(a=j())&&(r.options=a),B(a=j())&&(r.optionGroups=a)}},viewQuery:function(i,r){if(i&1&&ve(lV,5)(cV,5)(lf,5),i&2){let o;B(o=j())&&(r.trigger=o.first),B(o=j())&&(r.panel=o.first),B(o=j())&&(r._overlayDir=o.first)}},hostAttrs:["role","combobox","aria-haspopup","listbox",1,"mat-mdc-select"],hostVars:21,hostBindings:function(i,r){i&1&&x("keydown",function(a){return r._handleKeydown(a)})("focus",function(){return r._onFocus()})("blur",function(){return r._onBlur()}),i&2&&(ce("id",r.id)("tabindex",r.disabled?-1:r.tabIndex)("aria-controls",r.panelOpen?r.id+"-panel":null)("aria-expanded",r.panelOpen)("aria-label",r.ariaLabel||null)("aria-required",r.required.toString())("aria-disabled",r.disabled.toString())("aria-invalid",r.errorState)("aria-activedescendant",r._getAriaActiveDescendant()),O("mat-mdc-select-disabled",r.disabled)("mat-mdc-select-invalid",r.errorState)("mat-mdc-select-required",r.required)("mat-mdc-select-empty",r.empty)("mat-mdc-select-multiple",r.multiple)("mat-select-open",r.panelOpen))},inputs:{userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],panelClass:"panelClass",disabled:[2,"disabled","disabled",F],disableRipple:[2,"disableRipple","disableRipple",F],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:kn(e)],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",F],placeholder:"placeholder",required:[2,"required","required",F],multiple:[2,"multiple","multiple",F],disableOptionCentering:[2,"disableOptionCentering","disableOptionCentering",F],compareWith:"compareWith",value:"value",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],errorStateMatcher:"errorStateMatcher",typeaheadDebounceInterval:[2,"typeaheadDebounceInterval","typeaheadDebounceInterval",kn],sortComparator:"sortComparator",id:"id",panelWidth:"panelWidth",canSelectNullableOptions:[2,"canSelectNullableOptions","canSelectNullableOptions",F]},outputs:{openedChange:"openedChange",_openedStream:"opened",_closedStream:"closed",selectionChange:"selectionChange",valueChange:"valueChange"},exportAs:["matSelect"],features:[xe([{provide:za,useExisting:t},{provide:Fv,useExisting:t}]),Le],ngContentSelectors:uV,decls:11,vars:10,consts:[["fallbackOverlayOrigin","cdkOverlayOrigin","trigger",""],["panel",""],["cdk-overlay-origin","",1,"mat-mdc-select-trigger",3,"click"],[1,"mat-mdc-select-value"],[1,"mat-mdc-select-placeholder","mat-mdc-select-min-line"],[1,"mat-mdc-select-value-text"],[1,"mat-mdc-select-arrow-wrapper"],[1,"mat-mdc-select-arrow"],["viewBox","0 0 24 24","width","24px","height","24px","focusable","false","aria-hidden","true"],["d","M7 10l5 5 5-5z"],["cdk-connected-overlay","","cdkConnectedOverlayHasBackdrop","","cdkConnectedOverlayBackdropClass","cdk-overlay-transparent-backdrop",3,"detach","backdropClick","overlayKeydown","cdkConnectedOverlayDisableClose","cdkConnectedOverlayPanelClass","cdkConnectedOverlayScrollStrategy","cdkConnectedOverlayOrigin","cdkConnectedOverlayPositions","cdkConnectedOverlayWidth","cdkConnectedOverlayFlexibleDimensions","cdkConnectedOverlayUsePopover"],[1,"mat-mdc-select-min-line"],["role","listbox","tabindex","-1",1,"mat-mdc-select-panel","mdc-menu-surface","mdc-menu-surface--open",3,"keydown"]],template:function(i,r){if(i&1&&(we(dV),p(0,"div",2,0),x("click",function(){return r.open()}),p(3,"div",3),ge(4,fV,2,1,"span",4)(5,pV,3,1,"span",5),g(),p(6,"div",6)(7,"div",7),dn(),p(8,"svg",8),ie(9,"path",9),g()()()(),fn(10,gV,3,16,"ng-template",10),x("detach",function(){return r.close()})("backdropClick",function(){return r.close()})("overlayKeydown",function(a){return r._handleOverlayKeydown(a)})),i&2){let o=Y(1);v(3),ce("id",r._valueId),v(),_e(r.empty?4:5),v(6),T("cdkConnectedOverlayDisableClose",!0)("cdkConnectedOverlayPanelClass",r._overlayPanelClass)("cdkConnectedOverlayScrollStrategy",r._scrollStrategy)("cdkConnectedOverlayOrigin",r._preferredOverlayOrigin||o)("cdkConnectedOverlayPositions",r._positions)("cdkConnectedOverlayWidth",r._overlayWidth)("cdkConnectedOverlayFlexibleDimensions",!0)("cdkConnectedOverlayUsePopover",r._popoverLocation)}},dependencies:[Ma,lf],styles:[`@keyframes _mat-select-enter {
  from {
    opacity: 0;
    transform: scaleY(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-select-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-select {
  display: inline-block;
  width: 100%;
  outline: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: var(--mat-select-enabled-trigger-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-select-trigger-text-font, var(--mat-sys-body-large-font));
  line-height: var(--mat-select-trigger-text-line-height, var(--mat-sys-body-large-line-height));
  font-size: var(--mat-select-trigger-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-select-trigger-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-select-trigger-text-tracking, var(--mat-sys-body-large-tracking));
}

div.mat-mdc-select-panel {
  box-shadow: var(--mat-select-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
}

.mat-mdc-select-disabled {
  color: var(--mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-select-disabled .mat-mdc-select-placeholder {
  color: var(--mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-select-trigger {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  width: 100%;
}
.mat-mdc-select-disabled .mat-mdc-select-trigger {
  -webkit-user-select: none;
  user-select: none;
  cursor: default;
}

.mat-mdc-select-value {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mat-mdc-select-value-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mat-mdc-select-arrow-wrapper {
  height: 24px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
}
.mat-form-field-appearance-fill .mdc-text-field--no-label .mat-mdc-select-arrow-wrapper {
  transform: none;
}

.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-invalid .mat-mdc-select-arrow,
.mat-form-field-invalid:not(.mat-form-field-disabled) .mat-mdc-form-field-infix::after {
  color: var(--mat-select-invalid-arrow-color, var(--mat-sys-error));
}

.mat-mdc-select-arrow {
  width: 10px;
  height: 5px;
  position: relative;
  color: var(--mat-select-enabled-arrow-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-form-field.mat-focused .mat-mdc-select-arrow {
  color: var(--mat-select-focused-arrow-color, var(--mat-sys-primary));
}
.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-disabled .mat-mdc-select-arrow {
  color: var(--mat-select-disabled-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-select-open .mat-mdc-select-arrow {
  transform: rotate(180deg);
}
.mat-form-field-animations-enabled .mat-mdc-select-arrow {
  transition: transform 80ms linear;
}
.mat-mdc-select-arrow svg {
  fill: currentColor;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@media (forced-colors: active) {
  .mat-mdc-select-arrow svg {
    fill: CanvasText;
  }
  .mat-mdc-select-disabled .mat-mdc-select-arrow svg {
    fill: GrayText;
  }
}

div.mat-mdc-select-panel {
  width: 100%;
  max-height: 275px;
  outline: 0;
  overflow: auto;
  padding: 8px 0;
  box-sizing: border-box;
  transform-origin: top center;
  border-radius: 0 0 4px 4px;
  position: relative;
  background-color: var(--mat-select-panel-background-color, var(--mat-sys-surface-container));
}
.mat-mdc-select-panel-above div.mat-mdc-select-panel {
  border-radius: 4px 4px 0 0;
  transform-origin: bottom center;
}
@media (forced-colors: active) {
  div.mat-mdc-select-panel {
    outline: solid 1px;
  }
}

.mat-select-panel-animations-enabled {
  animation: _mat-select-enter 120ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-select-panel-animations-enabled.mat-select-panel-exit {
  animation: _mat-select-exit 100ms linear;
}

.mat-mdc-select-placeholder {
  transition: color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1);
  color: var(--mat-select-placeholder-text-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-form-field:not(.mat-form-field-animations-enabled) .mat-mdc-select-placeholder, ._mat-animation-noopable .mat-mdc-select-placeholder {
  transition: none;
}
.mat-form-field-hide-placeholder .mat-mdc-select-placeholder {
  color: transparent;
  -webkit-text-fill-color: transparent;
  transition: none;
  display: block;
}

.mat-mdc-form-field-type-mat-select:not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper {
  cursor: pointer;
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mat-mdc-floating-label {
  max-width: calc(100% - 18px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mdc-floating-label--float-above {
  max-width: calc(100% / 0.75 - 24px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-notched-outline__notch {
  max-width: calc(100% - 60px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-text-field--label-floating .mdc-notched-outline__notch {
  max-width: calc(100% - 24px);
}

.mat-mdc-select-min-line:empty::before {
  content: " ";
  white-space: pre;
  width: 1px;
  display: inline-block;
  visibility: hidden;
}

.mat-form-field-appearance-fill .mat-mdc-select-arrow-wrapper {
  transform: var(--mat-select-arrow-transform, translateY(-8px));
}
`],encapsulation:2,changeDetection:0})}return t})();var Qa=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=$({type:t});static \u0275inj=H({imports:[ko,Lv,be,xo,qt,Lv]})}return t})();var Jf=(()=>{class t{horizontalAlign="after";verticalAlign="center";margin=0;forceAlignment=!1;lockAlignment=!1;static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["demo-positioning"]],decls:46,vars:12,consts:[["anchor","satPopoverAnchor"],["p",""],[1,"config"],["placeholder","horizontalAlign",3,"ngModelChange","ngModel"],["value","before"],["value","start"],["value","center"],["value","end"],["value","after"],["value","octopus"],["placeholder","verticalAlign",3,"ngModelChange","ngModel"],["value","above"],["value","below"],["value","aardvark"],["matInput","","type","number","placeholder","anchor's margin-left (px)",3,"ngModelChange","ngModel"],[3,"ngModelChange","ngModel"],["mat-raised-button","","satPopoverAnchor","","color","accent",3,"click"],["hasBackdrop","",3,"anchor","horizontalAlign","verticalAlign","forceAlignment","lockAlignment"],[1,"popover","mat-body-2"]],template:function(i,r){if(i&1){let o=ke();p(0,"mat-card")(1,"mat-card-title"),y(2,"Positioning"),g(),p(3,"mat-card-content")(4,"div",2)(5,"mat-form-field")(6,"mat-select",3),Be("ngModelChange",function(s){return L(o),ze(r.horizontalAlign,s)||(r.horizontalAlign=s),V(s)}),p(7,"mat-option",4),y(8,"Before"),g(),p(9,"mat-option",5),y(10,"Start"),g(),p(11,"mat-option",6),y(12,"Center"),g(),p(13,"mat-option",7),y(14,"End"),g(),p(15,"mat-option",8),y(16,"After"),g(),p(17,"mat-option",9),y(18,"Octopus"),g()()(),p(19,"mat-form-field")(20,"mat-select",10),Be("ngModelChange",function(s){return L(o),ze(r.verticalAlign,s)||(r.verticalAlign=s),V(s)}),p(21,"mat-option",11),y(22,"Above"),g(),p(23,"mat-option",5),y(24,"Start"),g(),p(25,"mat-option",6),y(26,"Center"),g(),p(27,"mat-option",7),y(28,"End"),g(),p(29,"mat-option",12),y(30,"Below"),g(),p(31,"mat-option",13),y(32,"Aardvark"),g()()(),p(33,"mat-form-field")(34,"input",14),Be("ngModelChange",function(s){return L(o),ze(r.margin,s)||(r.margin=s),V(s)}),g()(),p(35,"mat-checkbox",15),Be("ngModelChange",function(s){return L(o),ze(r.forceAlignment,s)||(r.forceAlignment=s),V(s)}),y(36," forceAlignment "),g(),p(37,"mat-checkbox",15),Be("ngModelChange",function(s){return L(o),ze(r.lockAlignment,s)||(r.lockAlignment=s),V(s)}),y(38," lockAlignment "),g()(),p(39,"button",16,0),x("click",function(){L(o);let s=Y(43);return V(s.toggle())}),y(41," CLICK TO TOGGLE "),g()(),p(42,"sat-popover",17,1)(44,"div",18),y(45," Nifty "),g()()()}if(i&2){let o=Y(40);v(6),Ve("ngModel",r.horizontalAlign),v(14),Ve("ngModel",r.verticalAlign),v(14),Ve("ngModel",r.margin),v(),Ve("ngModel",r.forceAlignment),v(2),Ve("ngModel",r.lockAlignment),v(2),Bi("margin-left",r.margin+"px"),v(3),T("anchor",o)("horizontalAlign",r.horizontalAlign)("verticalAlign",r.verticalAlign)("forceAlignment",r.forceAlignment)("lockAlignment",r.lockAlignment)}},dependencies:[Wt,Vt,Ir,Pl,Fn,gn,Bt,_n,It,xt,Mt,St,ja,Po,qt,Vn,Ya,qa,Qa,Ka,Ti,ft,Te,Ze],styles:["[_nghost-%COMP%]{display:block}.config[_ngcontent-%COMP%]{margin-bottom:16px}.popover[_ngcontent-%COMP%]{background:#d3d3d3;padding:32px}"]})}return t})();var bV=(t,n)=>n.value;function DV(t,n){if(t&1&&(p(0,"mat-option",3),y(1),p(2,"code"),y(3),g(),y(4,") "),g()),t&2){let e=n.$implicit;T("value",e.value),v(),Qe(" ",e.name," ("),v(2),ct(e.value)}}var eh=(()=>{class t{strategy="reposition";scrollOptions=[{value:"noop",name:"Do nothing"},{value:"block",name:"Block scrolling"},{value:"reposition",name:"Reposition on scroll"},{value:"close",name:"Close on scroll"},{value:"rugrats",name:"Invalid option"}];static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["demo-scroll-strategies"]],decls:15,vars:3,consts:[["anchor","satPopoverAnchor"],["p",""],[3,"ngModelChange","ngModel"],[3,"value"],["mat-raised-button","","satPopoverAnchor","","color","primary",1,"anchor",3,"click"],["horizontalAlign","after","hasBackdrop","",3,"anchor","scrollStrategy"],[1,"popover","mat-body-1"]],template:function(i,r){if(i&1){let o=ke();p(0,"mat-card")(1,"mat-card-title"),y(2,"Scroll Strategies"),g(),p(3,"mat-card-content")(4,"mat-form-field")(5,"mat-select",2),Be("ngModelChange",function(s){return L(o),ze(r.strategy,s)||(r.strategy=s),V(s)}),Jn(6,DV,5,3,"mat-option",3,bV),g()(),p(8,"button",4,0),x("click",function(){L(o);let s=Y(12);return V(s.toggle())}),y(10," TOGGLE "),g(),p(11,"sat-popover",5,1)(13,"div",6),y(14,"Scroll the page to observe behavior."),g()()()()}if(i&2){let o=Y(9);v(5),Ve("ngModel",r.strategy),v(),ei(r.scrollOptions),v(5),T("anchor",o)("scrollStrategy",r.strategy)}},dependencies:[Vt,Fn,gn,Bt,_n,It,xt,Mt,St,qt,Vn,Qa,Ka,Ti,ft,Te,Ze],styles:["[_nghost-%COMP%]{display:block}.anchor[_ngcontent-%COMP%]{margin:48px}.popover[_ngcontent-%COMP%]{padding:48px;color:#fff;background:#000}"]})}return t})();var th=(()=>{class t{popover;updateSelectValue(e){e==="fancy"&&this.popover.open()}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["demo-select-trigger"]],viewQuery:function(i,r){if(i&1&&ve(Te,7),i&2){let o;B(o=j())&&(r.popover=o.first)}},decls:16,vars:3,consts:[["p",""],[3,"satPopoverAnchor"],["placeholder","Select 'Fancy'",3,"selectionChange"],["value","boring"],["value","standard"],["value","fancy"],["hasBackdrop","","backdropClass","demo-background-rainbow"],[1,"fancy-caption"]],template:function(i,r){if(i&1&&(p(0,"mat-card")(1,"mat-card-title"),y(2,"MatSelect Trigger"),g(),p(3,"mat-card-content")(4,"mat-form-field",1)(5,"mat-select",2),x("selectionChange",function(a){return r.updateSelectValue(a.value)}),p(6,"mat-option",3),y(7,"Boring"),g(),p(8,"mat-option",4),y(9,"Standard"),g(),p(10,"mat-option",5),y(11,"Fancy"),g()()()()(),p(12,"sat-popover",6,0)(14,"div",7),y(15,"\u{1F3A9}"),g()()),i&2){let o=Y(13);v(4),T("satPopoverAnchor",o),v(10),O("opened",o.isOpen())}},dependencies:[Wt,It,xt,Mt,St,qt,Vn,Qa,Ka,Ti,ft,Te,Ze],styles:["[_nghost-%COMP%]{display:block}.fancy-caption[_ngcontent-%COMP%]{background:#ff0;border:dashed 20px orange;border-radius:50%;font-size:40px;height:64px;width:64px;line-height:64px;text-align:center;transform:rotate(360deg);transition:transform .6s ease-out}.fancy-caption.opened[_ngcontent-%COMP%]{transform:rotate(0)}"]})}return t})();var CV=(t,n)=>n.name;function wV(t,n){t&1&&(p(0,"mat-icon"),lo("spin-leave"),so("spin-enter"),y(1,"close"),g())}function EV(t,n){t&1&&(p(0,"mat-icon"),lo("spin-leave"),so("spin-enter"),y(1,"edit"),g())}function xV(t,n){if(t&1){let e=ke();p(0,"button",7,2),x("mouseenter",function(){L(e);let r=Y(5);return V(r.open())})("mouseleave",function(){L(e);let r=Y(5);return V(r.close())})("click",function(){L(e),X();let r=Y(5);return V(r.close())}),p(2,"mat-icon"),y(3),g()(),p(4,"sat-popover",8,3)(6,"div",9),y(7),g()()}if(t&2){let e=n.$implicit,i=Y(1);v(3),ct(e.icon),v(),T("anchor",i),v(3),Qe(" ",e.name," ")}}var nh=(()=>{class t{actions=[{name:"Add attachment",icon:"attachment"},{name:"New folder",icon:"folder"},{name:"New shared folder",icon:"folder_shared"}];static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["demo-speed-dial"]],decls:9,vars:2,consts:[["dialAnchor","satPopoverAnchor"],["dialPopover",""],["tooltipAnchor","satPopoverAnchor"],["tooltip",""],["mat-fab","","satPopoverAnchor","","color","primary",3,"click"],["verticalAlign","above",3,"anchor"],[1,"dial"],["mat-mini-fab","","satPopoverAnchor","","color","accent",3,"mouseenter","mouseleave","click"],["horizontalAlign","before",3,"anchor"],[1,"tooltip","mat-body-1"]],template:function(i,r){if(i&1){let o=ke();p(0,"button",4,0),x("click",function(){L(o);let s=Y(5);return V(s.toggle())}),ge(2,wV,2,0,"mat-icon")(3,EV,2,0,"mat-icon"),g(),p(4,"sat-popover",5,1)(6,"div",6),Jn(7,xV,8,3,null,null,CV),g()()}if(i&2){let o=Y(1),a=Y(5);v(2),_e(a.isOpen()?2:3),v(2),T("anchor",o),v(3),ei(r.actions)}},dependencies:[Vt,Bt,bS,yS,Qf,Kf,ft,Te,Ze],styles:["[_nghost-%COMP%]{display:block;position:fixed;right:32px;bottom:32px;margin-bottom:0!important}.mat-fab[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{position:absolute;top:16px;left:16px}.dial[_ngcontent-%COMP%]{margin-bottom:8px;display:flex;flex-direction:column-reverse}.dial[_ngcontent-%COMP%]   .mat-mini-fab[_ngcontent-%COMP%]{margin:8px 0}.tooltip[_ngcontent-%COMP%]{padding:4px 8px;background:#323232e6;color:#fff;border-radius:2px;margin:8px;font-size:12px}.spin-enter[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_spin-enter .15s ease}@keyframes _ngcontent-%COMP%_spin-enter{0%{transform:rotate(-180deg);opacity:0}to{transform:rotate(0);opacity:1}}.spin-leave[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_spin-leave .15s ease}@keyframes _ngcontent-%COMP%_spin-leave{0%{transform:rotate(0);opacity:1}to{transform:rotate(180deg);opacity:0}}"]})}return t})();var SV=["poDelayed"],ih=(()=>{class t{delayed;mouseenter=new M;mouseleave=new M;ngAfterViewInit(){this.mouseenter.pipe(zn(()=>nt(null).pipe(rs(1e3),fe(this.mouseleave)))).subscribe(()=>this.delayed.open()),this.mouseleave.subscribe(()=>this.delayed.close())}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["demo-tooltip"]],viewQuery:function(i,r){if(i&1&&ve(SV,5),i&2){let o;B(o=j())&&(r.delayed=o.first)}},decls:32,vars:4,consts:[["instantAnchor","satPopoverAnchor"],["instantPopover",""],["delayedAnchor","satPopoverAnchor"],["poDelayed",""],["hoverAnchor","satPopoverAnchor"],["satPopoverAnchor","",1,"anchor",3,"mouseenter","mouseleave"],["horizontalAlign","after",3,"anchor"],[1,"tooltip-wrapper","mat-body-1"],[1,"seagreen"],["satPopoverAnchor","",1,"anchor"],[1,"hover-text",3,"satPopoverHover"]],template:function(i,r){if(i&1){let o=ke();p(0,"mat-card")(1,"mat-card-title"),y(2,"Tooltip"),g(),p(3,"mat-card-content")(4,"div",5,0),x("mouseenter",function(){L(o);let s=Y(8);return V(s.open())})("mouseleave",function(){L(o);let s=Y(8);return V(s.close())}),y(6," Hover Me (instant) "),g(),p(7,"sat-popover",6,1)(9,"div",7),y(10," Multi-line "),ie(11,"br"),p(12,"span",8),y(13,"Tooltip"),g()()(),p(14,"div",5,2),x("mouseenter",function(){return r.mouseenter.next()})("mouseleave",function(){return r.mouseleave.next()}),y(16," Hover Me (1000ms delay) "),g(),p(17,"sat-popover",6,3)(19,"div",7),y(20," A tooltip that's slow to open "),g()(),p(21,"div",9,4),y(23," Hover "),p(24,"span",10),y(25,"this text"),g(),y(26," for 500ms "),g(),p(27,"sat-popover",6)(28,"div",7),y(29," This tooltip uses the "),p(30,"code"),y(31,"SatPopoverHoverDirective"),g()()()()()}if(i&2){let o=Y(5),a=Y(15),s=Y(22);v(7),T("anchor",o),v(10),T("anchor",a),v(7),T("satPopoverHover",500),v(3),T("anchor",s)}},dependencies:[Wt,It,xt,Mt,St,ft,Te,Ze,Y_],styles:["[_nghost-%COMP%]{display:block}.mat-card-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start}.anchor[_ngcontent-%COMP%]{cursor:default;display:inline-block;background:#0000001a;padding:8px;margin:16px}.tooltip-wrapper[_ngcontent-%COMP%]{padding:8px;background:#323232e6;color:#fff;border-radius:2px;margin:8px;font-size:12px}.seagreen[_ngcontent-%COMP%]{color:#20b2aa}.hover-text[_ngcontent-%COMP%]{display:inline-block;padding:4px 8px;background:#0000001a}.hover-text[_ngcontent-%COMP%]:hover{background:#98c2df}"]})}return t})();var MV=(t,n)=>n.name;function IV(t,n){if(t&1&&(p(0,"div",10),y(1),g()),t&2){let e=n.$implicit;O("active",e.active),v(),Qe(" ",e.name," ")}}var rh=(()=>{class t{openTransition="2000ms ease";closeTransition="2000ms ease";startAtScale=.3;endAtScale=.5;callbackIndicators=[{name:"opened",active:!1},{name:"closed",active:!1},{name:"afterOpen",active:!1},{name:"afterClose",active:!1}];showCallback(e){let i=this.callbackIndicators.find(r=>r.name===e);i.active=!0,setTimeout(()=>i.active=!1,100)}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["demo-transitions"]],decls:26,vars:9,consts:[["popoverAnchor","satPopoverAnchor"],["p",""],[1,"controls"],["matInput","","type","text",3,"ngModelChange","ngModel"],["matInput","","type","number",3,"ngModelChange","ngModel"],[1,"indicators"],[1,"indicator",3,"active"],["satPopoverAnchor","","tabindex","0",1,"anchor",3,"click","keydown.enter"],["xAlign","after","yAlign","below",3,"opened","closed","afterOpen","afterClose","anchor","openTransition","closeTransition","openAnimationStartAtScale","closeAnimationEndAtScale"],[1,"popover","mat-subtitle"],[1,"indicator"]],template:function(i,r){if(i&1){let o=ke();p(0,"mat-card")(1,"mat-card-title"),y(2,"Custom Transitions"),g(),p(3,"mat-card-content")(4,"div",2)(5,"mat-form-field")(6,"input",3),Be("ngModelChange",function(s){return L(o),ze(r.openTransition,s)||(r.openTransition=s),V(s)}),g()(),p(7,"mat-form-field")(8,"input",3),Be("ngModelChange",function(s){return L(o),ze(r.closeTransition,s)||(r.closeTransition=s),V(s)}),g()(),p(9,"mat-form-field")(10,"input",4),Be("ngModelChange",function(s){return L(o),ze(r.startAtScale,s)||(r.startAtScale=s),V(s)}),g(),p(11,"mat-hint"),y(12,"Initial scale value for open animation."),g()(),p(13,"mat-form-field")(14,"input",4),Be("ngModelChange",function(s){return L(o),ze(r.endAtScale,s)||(r.endAtScale=s),V(s)}),g(),p(15,"mat-hint"),y(16,"End scale value for close animation."),g()()(),p(17,"div",5),Jn(18,IV,2,3,"div",6,MV),g(),p(20,"div",7,0),x("click",function(){L(o);let s=Y(23);return V(s.toggle())})("keydown.enter",function(){L(o);let s=Y(23);return V(s.toggle())}),g(),p(22,"sat-popover",8,1),x("opened",function(){return r.showCallback("opened")})("closed",function(){return r.showCallback("closed")})("afterOpen",function(){return r.showCallback("afterOpen")})("afterClose",function(){return r.showCallback("afterClose")}),p(24,"div",9),y(25,"Hello!"),g()()()()}if(i&2){let o=Y(21);v(6),Ve("ngModel",r.openTransition),v(2),Ve("ngModel",r.closeTransition),v(2),Ve("ngModel",r.startAtScale),v(4),Ve("ngModel",r.endAtScale),v(4),ei(r.callbackIndicators),v(4),T("anchor",o)("openTransition",r.openTransition)("closeTransition",r.closeTransition)("openAnimationStartAtScale",r.startAtScale)("closeAnimationEndAtScale",r.endAtScale)}},dependencies:[Vt,Ir,Pl,Fn,gn,It,xt,Mt,St,qt,Vn,zl,Ya,qa,ft,Te,Ze],styles:["[_nghost-%COMP%]{display:block}.indicators[_ngcontent-%COMP%]{display:flex;margin-bottom:32px}.indicator[_ngcontent-%COMP%]{margin-right:8px;padding:8px;background:pink}.indicator.active[_ngcontent-%COMP%]{background:red}.anchor[_ngcontent-%COMP%]{background:#00008b;cursor:pointer;height:48px;width:48px}.popover[_ngcontent-%COMP%]{background:#90ee90;color:#000000de;padding:24px}"]})}return t})();var kV=["*",[["mat-toolbar-row"]]],TV=["*","mat-toolbar-row"],AV=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=z({type:t,selectors:[["mat-toolbar-row"]],hostAttrs:[1,"mat-toolbar-row"],exportAs:["matToolbarRow"]})}return t})(),mM=(()=>{class t{_elementRef=u(P);_platform=u(Ce);_document=u(W);color;_toolbarRows;constructor(){}ngAfterViewInit(){this._platform.isBrowser&&(this._checkToolbarMixedModes(),this._toolbarRows.changes.subscribe(()=>this._checkToolbarMixedModes()))}_checkToolbarMixedModes(){this._toolbarRows.length}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["mat-toolbar"]],contentQueries:function(i,r,o){if(i&1&&Mn(o,AV,5),i&2){let a;B(a=j())&&(r._toolbarRows=a)}},hostAttrs:[1,"mat-toolbar"],hostVars:6,hostBindings:function(i,r){i&2&&(_t(r.color?"mat-"+r.color:""),O("mat-toolbar-multiple-rows",r._toolbarRows.length>0)("mat-toolbar-single-row",r._toolbarRows.length===0))},inputs:{color:"color"},exportAs:["matToolbar"],ngContentSelectors:TV,decls:2,vars:0,template:function(i,r){i&1&&(we(kV),Z(0),Z(1,1))},styles:[`.mat-toolbar {
  background: var(--mat-toolbar-container-background-color, var(--mat-sys-surface));
  color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));
}
.mat-toolbar, .mat-toolbar h1, .mat-toolbar h2, .mat-toolbar h3, .mat-toolbar h4, .mat-toolbar h5, .mat-toolbar h6 {
  font-family: var(--mat-toolbar-title-text-font, var(--mat-sys-title-large-font));
  font-size: var(--mat-toolbar-title-text-size, var(--mat-sys-title-large-size));
  line-height: var(--mat-toolbar-title-text-line-height, var(--mat-sys-title-large-line-height));
  font-weight: var(--mat-toolbar-title-text-weight, var(--mat-sys-title-large-weight));
  letter-spacing: var(--mat-toolbar-title-text-tracking, var(--mat-sys-title-large-tracking));
  margin: 0;
}
@media (forced-colors: active) {
  .mat-toolbar {
    outline: solid 1px;
  }
}
.mat-toolbar .mat-form-field-underline,
.mat-toolbar .mat-form-field-ripple,
.mat-toolbar .mat-focused .mat-form-field-ripple {
  background-color: currentColor;
}
.mat-toolbar .mat-form-field-label,
.mat-toolbar .mat-focused .mat-form-field-label,
.mat-toolbar .mat-select-value,
.mat-toolbar .mat-select-arrow,
.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow {
  color: inherit;
}
.mat-toolbar .mat-input-element {
  caret-color: currentColor;
}
.mat-toolbar .mat-mdc-button-base.mat-mdc-button-base.mat-unthemed {
  --mat-button-text-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));
  --mat-button-outlined-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));
}

.mat-toolbar-row, .mat-toolbar-single-row {
  display: flex;
  box-sizing: border-box;
  padding: 0 16px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  height: var(--mat-toolbar-standard-height, 64px);
}
@media (max-width: 599px) {
  .mat-toolbar-row, .mat-toolbar-single-row {
    height: var(--mat-toolbar-mobile-height, 56px);
  }
}

.mat-toolbar-multiple-rows {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
  min-height: var(--mat-toolbar-standard-height, 64px);
}
@media (max-width: 599px) {
  .mat-toolbar-multiple-rows {
    min-height: var(--mat-toolbar-mobile-height, 56px);
  }
}
`],encapsulation:2,changeDetection:0})}return t})();var pM=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=$({type:t});static \u0275inj=H({imports:[be]})}return t})();var gM="16.2.0";var oh={production:!0,version:gM};function FV(t,n){if(t&1&&(p(0,"div",5),ie(1,"demo-positioning")(2,"demo-action-api")(3,"demo-scroll-strategies")(4,"demo-select-trigger")(5,"demo-focus")(6,"demo-transitions")(7,"demo-tooltip")(8,"demo-interactive-close")(9,"demo-anchor-reuse")(10,"demo-speed-dial"),g()),t&2){let e=X();T("dir",e.direction)}}var zv=(()=>{class t{direction="ltr";showContent=!0;version=oh.version;background=!0;static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["demo-root"]],hostVars:2,hostBindings:function(i,r){i&2&&O("mat-app-background",r.background)},decls:10,vars:4,consts:[["color","primary",1,"mat-elevation-z2"],["href","https://github.com/ncstate-sat/popover",1,"repo-link","mat-title"],[1,"version","mat-body-2"],["mat-button","","title","Toggle all content",3,"click"],["mat-button","","title","Toggle between RTL and LTR",3,"click"],[1,"page-content",3,"dir"]],template:function(i,r){i&1&&(p(0,"mat-toolbar",0)(1,"a",1),y(2," @ncstate/sat-popover "),p(3,"span",2),y(4),g()(),p(5,"button",3),x("click",function(){return r.showContent=!r.showContent}),y(6),g(),p(7,"button",4),x("click",function(){return r.direction=r.direction==="rtl"?"ltr":"rtl"}),y(8),g()(),ge(9,FV,11,1,"div",5)),i&2&&(v(4),ct(r.version),v(2),Qe(" ",r.showContent?"Hide":"Show"," content "),v(2),Qe(" ",r.direction.toUpperCase()," "),v(),_e(r.showContent?9:-1))},dependencies:[wf,zf,Zf,Xf,Jf,eh,th,nh,ih,rh,Bt,w_,_n,pM,mM],styles:["[_nghost-%COMP%]{display:block;min-height:100%}.mat-toolbar[_ngcontent-%COMP%]{justify-content:space-between}.version[_ngcontent-%COMP%]{padding-left:8px}.page-content[_ngcontent-%COMP%]{padding:48px}.page-content[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{margin-bottom:32px}.repo-link[_ngcontent-%COMP%]{color:#fff;text-decoration:none;margin:0}"]})}return t})();var _M=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=$({type:t,bootstrap:[zv]});static \u0275inj=H({imports:[TE,rl,Vt,wf,zf,Zf,Xf,Jf,zv,eh,th,nh,ih,rh,Lf]})}return t})();oh.production&&void 0;jg().bootstrapModule(_M,{applicationProviders:[au()]}).catch(t=>console.log(t));
