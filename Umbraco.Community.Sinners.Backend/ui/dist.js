import { UmbElementMixin as e } from "@umbraco-cms/backoffice/element-api";
import { UMB_THEME_CONTEXT as t } from "@umbraco-cms/backoffice/themes";
import { UMB_AUTH_CONTEXT as n } from "@umbraco-cms/backoffice/auth";
//#region node_modules/@lit/reactive-element/css-tag.js
var r = globalThis, i = r.ShadowRoot && (r.ShadyCSS === void 0 || r.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, a = Symbol(), o = /* @__PURE__ */ new WeakMap(), s = class {
	constructor(e, t, n) {
		if (this._$cssResult$ = !0, n !== a) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, t = this.t;
		if (i && e === void 0) {
			let n = t !== void 0 && t.length === 1;
			n && (e = o.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && o.set(t, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, c = (e) => new s(typeof e == "string" ? e : e + "", void 0, a), l = (e, ...t) => new s(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, a), u = (e, t) => {
	if (i) e.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let n of t) {
		let t = document.createElement("style"), i = r.litNonce;
		i !== void 0 && t.setAttribute("nonce", i), t.textContent = n.cssText, e.appendChild(t);
	}
}, d = i ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return c(t);
})(e) : e, { is: ee, defineProperty: te, getOwnPropertyDescriptor: ne, getOwnPropertyNames: re, getOwnPropertySymbols: ie, getPrototypeOf: ae } = Object, f = globalThis, oe = f.trustedTypes, se = oe ? oe.emptyScript : "", ce = f.reactiveElementPolyfillSupport, p = (e, t) => e, m = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? se : null;
				break;
			case Object:
			case Array: e = e == null ? e : JSON.stringify(e);
		}
		return e;
	},
	fromAttribute(e, t) {
		let n = e;
		switch (t) {
			case Boolean:
				n = e !== null;
				break;
			case Number:
				n = e === null ? null : Number(e);
				break;
			case Object:
			case Array: try {
				n = JSON.parse(e);
			} catch {
				n = null;
			}
		}
		return n;
	}
}, le = (e, t) => !ee(e, t), ue = {
	attribute: !0,
	type: String,
	converter: m,
	reflect: !1,
	useDefault: !1,
	hasChanged: le
};
Symbol.metadata ??= Symbol("metadata"), f.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var h = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = ue) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && te(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = ne(this.prototype, e) ?? {
			get() {
				return this[t];
			},
			set(e) {
				this[t] = e;
			}
		};
		return {
			get: r,
			set(t) {
				let a = r?.call(this);
				i?.call(this, t), this.requestUpdate(e, a, n);
			},
			configurable: !0,
			enumerable: !0
		};
	}
	static getPropertyOptions(e) {
		return this.elementProperties.get(e) ?? ue;
	}
	static _$Ei() {
		if (this.hasOwnProperty(p("elementProperties"))) return;
		let e = ae(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(p("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(p("properties"))) {
			let e = this.properties, t = [...re(e), ...ie(e)];
			for (let n of t) this.createProperty(n, e[n]);
		}
		let e = this[Symbol.metadata];
		if (e !== null) {
			let t = litPropertyMetadata.get(e);
			if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
		}
		this._$Eh = /* @__PURE__ */ new Map();
		for (let [e, t] of this.elementProperties) {
			let n = this._$Eu(e, t);
			n !== void 0 && this._$Eh.set(n, e);
		}
		this.elementStyles = this.finalizeStyles(this.styles);
	}
	static finalizeStyles(e) {
		let t = [];
		if (Array.isArray(e)) {
			let n = new Set(e.flat(Infinity).reverse());
			for (let e of n) t.unshift(d(e));
		} else e !== void 0 && t.push(d(e));
		return t;
	}
	static _$Eu(e, t) {
		let n = t.attribute;
		return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
	}
	constructor() {
		super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
	}
	_$Ev() {
		this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
	}
	addController(e) {
		(this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
	}
	removeController(e) {
		this._$EO?.delete(e);
	}
	_$E_() {
		let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
		for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
		e.size > 0 && (this._$Ep = e);
	}
	createRenderRoot() {
		let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
		return u(e, this.constructor.elementStyles), e;
	}
	connectedCallback() {
		this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
	}
	enableUpdating(e) {}
	disconnectedCallback() {
		this._$EO?.forEach((e) => e.hostDisconnected?.());
	}
	attributeChangedCallback(e, t, n) {
		this._$AK(e, n);
	}
	_$ET(e, t) {
		let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
		if (r !== void 0 && !0 === n.reflect) {
			let i = (n.converter?.toAttribute === void 0 ? m : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? m : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? le)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
			this.C(e, t, n);
		}
		!1 === this.isUpdatePending && (this._$ES = this._$EP());
	}
	C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
		n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
	}
	async _$EP() {
		this.isUpdatePending = !0;
		try {
			await this._$ES;
		} catch (e) {
			Promise.reject(e);
		}
		let e = this.scheduleUpdate();
		return e != null && await e, !this.isUpdatePending;
	}
	scheduleUpdate() {
		return this.performUpdate();
	}
	performUpdate() {
		if (!this.isUpdatePending) return;
		if (!this.hasUpdated) {
			if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
				for (let [e, t] of this._$Ep) this[e] = t;
				this._$Ep = void 0;
			}
			let e = this.constructor.elementProperties;
			if (e.size > 0) for (let [t, n] of e) {
				let { wrapped: e } = n, r = this[t];
				!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
			}
		}
		let e = !1, t = this._$AL;
		try {
			e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
		} catch (t) {
			throw e = !1, this._$EM(), t;
		}
		e && this._$AE(t);
	}
	willUpdate(e) {}
	_$AE(e) {
		this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
	}
	_$EM() {
		this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
	}
	get updateComplete() {
		return this.getUpdateComplete();
	}
	getUpdateComplete() {
		return this._$ES;
	}
	shouldUpdate(e) {
		return !0;
	}
	update(e) {
		this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
	}
	updated(e) {}
	firstUpdated(e) {}
};
h.elementStyles = [], h.shadowRootOptions = { mode: "open" }, h[p("elementProperties")] = /* @__PURE__ */ new Map(), h[p("finalized")] = /* @__PURE__ */ new Map(), ce?.({ ReactiveElement: h }), (f.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var de = globalThis, fe = (e) => e, g = de.trustedTypes, pe = g ? g.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, me = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, he = "?" + _, ge = `<${he}>`, v = document, y = () => v.createComment(""), b = (e) => e === null || typeof e != "object" && typeof e != "function", _e = Array.isArray, ve = (e) => _e(e) || typeof e?.[Symbol.iterator] == "function", ye = "[ 	\n\f\r]", x = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, be = /-->/g, xe = />/g, S = RegExp(`>|${ye}(?:([^\\s"'>=/]+)(${ye}*=${ye}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), Se = /'/g, Ce = /"/g, we = /^(?:script|style|textarea|title)$/i, C = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), w = Symbol.for("lit-noChange"), T = Symbol.for("lit-nothing"), Te = /* @__PURE__ */ new WeakMap(), E = v.createTreeWalker(v, 129);
function Ee(e, t) {
	if (!_e(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return pe === void 0 ? t : pe.createHTML(t);
}
var De = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = x;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === x ? c[1] === "!--" ? o = be : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = S) : (we.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = S) : o = xe : o === S ? c[0] === ">" ? (o = i ?? x, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? S : c[3] === "\"" ? Ce : Se) : o === Ce || o === Se ? o = S : o === be || o === xe ? o = x : (o = S, i = void 0);
		let d = o === S && e[t + 1].startsWith("/>") ? " " : "";
		a += o === x ? n + ge : l >= 0 ? (r.push(s), n.slice(0, l) + me + n.slice(l) + _ + d) : n + _ + (l === -2 ? t : d);
	}
	return [Ee(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, Oe = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = De(t, n);
		if (this.el = e.createElement(l, r), E.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = E.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(me)) {
					let t = u[o++], n = i.getAttribute(e).split(_), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? je : r[1] === "?" ? Me : r[1] === "@" ? Ne : O
					}), i.removeAttribute(e);
				} else e.startsWith(_) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (we.test(i.tagName)) {
					let e = i.textContent.split(_), t = e.length - 1;
					if (t > 0) {
						i.textContent = g ? g.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], y()), E.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], y());
					}
				}
			} else if (i.nodeType === 8) if (i.data === he) c.push({
				type: 2,
				index: a
			});
			else {
				let e = -1;
				for (; (e = i.data.indexOf(_, e + 1)) !== -1;) c.push({
					type: 7,
					index: a
				}), e += _.length - 1;
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = v.createElement("template");
		return n.innerHTML = e, n;
	}
};
function D(e, t, n = e, r) {
	if (t === w) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = b(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = D(e, i._$AS(e, t.values), i, r)), t;
}
var ke = class {
	constructor(e, t) {
		this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
	}
	get parentNode() {
		return this._$AM.parentNode;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	u(e) {
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? v).importNode(t, !0);
		E.currentNode = r;
		let i = E.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new Ae(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Pe(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = E.nextNode(), a++);
		}
		return E.currentNode = v, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, Ae = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
	}
	get parentNode() {
		let e = this._$AA.parentNode, t = this._$AM;
		return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
	}
	get startNode() {
		return this._$AA;
	}
	get endNode() {
		return this._$AB;
	}
	_$AI(e, t = this) {
		e = D(this, e, t), b(e) ? e === T || e == null || e === "" ? (this._$AH !== T && this._$AR(), this._$AH = T) : e !== this._$AH && e !== w && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? ve(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== T && b(this._$AH) ? this._$AA.nextSibling.data = e : this.T(v.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = Oe.createElement(Ee(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new ke(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = Te.get(e.strings);
		return t === void 0 && Te.set(e.strings, t = new Oe(e)), t;
	}
	k(t) {
		_e(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(y()), this.O(y()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = fe(e).nextSibling;
			fe(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, O = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = T, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = T;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = D(this, e, t, 0), a = !b(e) || e !== this._$AH && e !== w, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = D(this, r[n + o], t, o), s === w && (s = this._$AH[o]), a ||= !b(s) || s !== this._$AH[o], s === T ? e = T : e !== T && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, je = class extends O {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === T ? void 0 : e;
	}
}, Me = class extends O {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== T);
	}
}, Ne = class extends O {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = D(this, e, t, 0) ?? T) === w) return;
		let n = this._$AH, r = e === T && n !== T || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== T && (n === T || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Pe = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		D(this, e);
	}
}, Fe = de.litHtmlPolyfillSupport;
Fe?.(Oe, Ae), (de.litHtmlVersions ??= []).push("3.3.2");
var Ie = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new Ae(t.insertBefore(y(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, Le = globalThis, k = class extends h {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ie(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return w;
	}
};
k._$litElement$ = !0, k.finalized = !0, Le.litElementHydrateSupport?.({ LitElement: k });
var Re = Le.litElementPolyfillSupport;
Re?.({ LitElement: k }), (Le.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/@lit/reactive-element/decorators/custom-element.js
var A = (e) => (t, n) => {
	n === void 0 ? customElements.define(e, t) : n.addInitializer(() => {
		customElements.define(e, t);
	});
}, ze = {
	attribute: !0,
	type: String,
	converter: m,
	reflect: !1,
	hasChanged: le
}, Be = (e = ze, t, n) => {
	let { kind: r, metadata: i } = n, a = globalThis.litPropertyMetadata.get(i);
	if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(n.name, e), r === "accessor") {
		let { name: r } = n;
		return {
			set(n) {
				let i = t.get.call(this);
				t.set.call(this, n), this.requestUpdate(r, i, e, !0, n);
			},
			init(t) {
				return t !== void 0 && this.C(r, void 0, e, t), t;
			}
		};
	}
	if (r === "setter") {
		let { name: r } = n;
		return function(n) {
			let i = this[r];
			t.call(this, n), this.requestUpdate(r, i, e, !0, n);
		};
	}
	throw Error("Unsupported decorator location: " + r);
};
function Ve(e) {
	return (t, n) => typeof n == "object" ? Be(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/state.js
function j(e) {
	return Ve({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region src/penance/spooky-themes.ts
function He(e, t, n) {
	if (e.length !== 7 || t.length !== 7) return e;
	let r = parseInt(e.slice(1, 3), 16), i = parseInt(e.slice(3, 5), 16), a = parseInt(e.slice(5, 7), 16), o = parseInt(t.slice(1, 3), 16), s = parseInt(t.slice(3, 5), 16), c = parseInt(t.slice(5, 7), 16);
	return `#${Math.round(r + (o - r) * n).toString(16).padStart(2, "0")}${Math.round(i + (s - i) * n).toString(16).padStart(2, "0")}${Math.round(a + (c - a) * n).toString(16).padStart(2, "0")}`;
}
var Ue = {
	"--uui-color-selected": "#316dca",
	"--uui-color-selected-emphasis": "#3e79d0",
	"--uui-color-selected-standalone": "#5b8dd7",
	"--uui-color-selected-contrast": "#eeeeef",
	"--uui-color-current": "#316dca",
	"--uui-color-current-emphasis": "#3e79d0",
	"--uui-color-current-standalone": "#5b8dd7",
	"--uui-color-current-contrast": "#eeeeef",
	"--uui-color-disabled": "#434c56",
	"--uui-color-disabled-standalone": "#545d68",
	"--uui-color-disabled-contrast": "#fcfcfc4d",
	"--uui-color-header-surface": "#21262e",
	"--uui-color-header-contrast": "#eeeeef",
	"--uui-color-header-contrast-emphasis": "#eeeeef",
	"--uui-color-focus": "#316dca",
	"--uui-color-surface": "#2d333b",
	"--uui-color-surface-alt": "#373e47",
	"--uui-color-surface-emphasis": "#333a42",
	"--uui-color-background": "#21262e",
	"--uui-color-text": "#eeeeef",
	"--uui-color-text-alt": "#eeeeef",
	"--uui-color-interactive": "#eeeeef",
	"--uui-color-interactive-emphasis": "#eeeeef",
	"--uui-color-border": "#434c56",
	"--uui-color-border-standalone": "#545d68",
	"--uui-color-border-emphasis": "#626e7b",
	"--uui-color-divider": "#373e47",
	"--uui-color-divider-standalone": "#434c56",
	"--uui-color-divider-emphasis": "#545d68",
	"--uui-color-default": "#316dca",
	"--uui-color-default-emphasis": "#5387d5",
	"--uui-color-default-standalone": "#eeeeef",
	"--uui-color-default-contrast": "#eeeeef",
	"--uui-color-warning": "#af7c12",
	"--uui-color-warning-emphasis": "#af7c12",
	"--uui-color-warning-standalone": "#af7c12",
	"--uui-color-warning-contrast": "#eeeeef",
	"--uui-color-danger": "#ca3b37",
	"--uui-color-danger-emphasis": "#ca3b37",
	"--uui-color-danger-standalone": "#ca3b37",
	"--uui-color-danger-contrast": "#eeeeef",
	"--uui-color-positive": "#347d39",
	"--uui-color-positive-emphasis": "#347d39",
	"--uui-color-positive-standalone": "#347d39",
	"--uui-color-positive-contrast": "#eeeeef"
}, We = {
	"--uui-color-selected": "#e2440c",
	"--uui-color-selected-emphasis": "#f45a14",
	"--uui-color-selected-standalone": "#ff7a22",
	"--uui-color-selected-contrast": "#fff3df",
	"--uui-color-current": "#e2440c",
	"--uui-color-current-emphasis": "#f45a14",
	"--uui-color-current-standalone": "#ff7a22",
	"--uui-color-current-contrast": "#fff3df",
	"--uui-color-disabled": "#3a1407",
	"--uui-color-disabled-standalone": "#4c1c0a",
	"--uui-color-disabled-contrast": "#fcfcfc4d",
	"--uui-color-header-surface": "#5a1302",
	"--uui-color-header-contrast": "#ffcf7a",
	"--uui-color-header-contrast-emphasis": "#fff0c2",
	"--uui-color-focus": "#ff8f1f",
	"--uui-color-surface": "#1f0904",
	"--uui-color-surface-alt": "#2d0e05",
	"--uui-color-surface-emphasis": "#280c05",
	"--uui-color-background": "#0e0402",
	"--uui-color-text": "#ffe8c6",
	"--uui-color-text-alt": "#f4a35a",
	"--uui-color-interactive": "#ffd08a",
	"--uui-color-interactive-emphasis": "#fff0c2",
	"--uui-color-border": "#6a1f06",
	"--uui-color-border-standalone": "#8a2c08",
	"--uui-color-border-emphasis": "#b8410c",
	"--uui-color-divider": "#331006",
	"--uui-color-divider-standalone": "#6a1f06",
	"--uui-color-divider-emphasis": "#8a2c08",
	"--uui-color-default": "#c8360a",
	"--uui-color-default-emphasis": "#e2440c",
	"--uui-color-default-standalone": "#ffd08a",
	"--uui-color-default-contrast": "#fff3df",
	"--uui-color-warning": "#d9a400",
	"--uui-color-warning-emphasis": "#ebb800",
	"--uui-color-warning-standalone": "#ffd23a",
	"--uui-color-warning-contrast": "#1d0d00",
	"--uui-color-danger": "#ff2a0d",
	"--uui-color-danger-emphasis": "#ff4a1c",
	"--uui-color-danger-standalone": "#ff6a3a",
	"--uui-color-danger-contrast": "#fff3df",
	"--uui-color-positive": "#8f8a12",
	"--uui-color-positive-emphasis": "#a8a21a",
	"--uui-color-positive-standalone": "#cfc83a",
	"--uui-color-positive-contrast": "#1a1500"
};
function Ge(e) {
	let t = (e - 1) / 9, n = Object.keys(Ue).map((e) => `    ${e}: ${He(Ue[e], We[e], t)};`);
	return n.push("    --uui-color-scheme: dark;"), n.push("    --sinners-action-btn-bg: #e64241;"), n.push("    --sinners-action-btn-color: #ffffff;"), `:root {\n${n.join("\n")}\n}`;
}
var Ke = (e) => `sinners-spooky-${e}`;
function qe(e) {
	for (let t = 1; t <= 10; t++) {
		let n = Ge(t);
		e.register({
			type: "theme",
			alias: Ke(t),
			name: `☠ Sinners: Abyss (Level ${t})`,
			css: () => Promise.resolve({ default: n }),
			weight: 50 - t
		});
	}
}
//#endregion
//#region src/penance/bridge.ts
function Je(e) {
	if (window.parent !== window) try {
		window.parent.postMessage({
			source: "sinners",
			...e
		}, location.origin);
	} catch {}
}
function M(e, t, n = !1) {
	console.log(`[BRIDGE] absolved commandment=${e} action=${t} pretended=${n}`), Je({
		type: "absolved",
		commandment: e,
		action: t,
		pretended: n
	});
}
function Ye() {
	Je({ type: "board" });
}
function Xe() {
	console.log("[BRIDGE] end of the script"), Je({ type: "end" });
}
//#endregion
//#region src/penance/presenter.ts
var Ze = [
	"I",
	"II",
	"III",
	"IV",
	"V",
	"VI",
	"VII",
	"VIII",
	"IX",
	"X"
], Qe = "sinners-presenter-state", $e = "sinners-forget-pretences";
function et() {
	try {
		let e = sessionStorage.getItem(Qe);
		if (e) return JSON.parse(e);
	} catch {}
	return {
		activeTab: "",
		indices: {}
	};
}
var tt = et(), nt = /* @__PURE__ */ new Map(), N = new Map(Object.entries(tt.indices ?? {})), P = new Map(Object.entries(tt.exhibits ?? {})), F = tt.activeTab, I = [], L = !1;
function rt() {
	try {
		sessionStorage.setItem(Qe, JSON.stringify({
			activeTab: F,
			indices: Object.fromEntries(N),
			exhibits: Object.fromEntries(P)
		}));
	} catch {}
}
var it = "/umbraco/section/settings/dashboard/penance", at = {
	I: ["/umbraco/section/content/workspace/document/edit/704a66de-b213-44fe-815a-f988c0707bbf/invariant/view/info/modal/umb-modal-workspace/invariant/general/document-type/edit/b871f83c-2395-4894-be0f-5422c1a71e48/tab/content"],
	II: ["/umbraco/section/settings/workspace/document-type/edit/a95360e8-ff04-40b1-8f46-7aa4b5983096/tab/content", {
		url: "/umbraco/section/settings/workspace/document-type-root",
		at: 3
	}],
	III: [
		{
			url: "/umbraco/section/settings/workspace/data-type/edit/b5922818-d8d8-43df-88ed-4582a24c0fa6",
			at: 0
		},
		{
			url: "/umbraco/section/settings/workspace/data-type-root",
			at: 1
		},
		{
			url: "/umbraco/section/translation",
			at: 1
		},
		{
			url: "/umbraco/section/translation",
			at: 2
		},
		{
			url: "/umbraco/section/media/collection",
			at: 2
		}
	],
	VII: ["/umbraco/section/settings/workspace/partial-view/edit/%2FmegaMenu%25dot%25cshtml"],
	VIII: ["/umbraco/section/content/workspace/document/edit/0d1e5e08-8a2e-4f0e-9d7b-5f0a5b5e0008"],
	IX: ["/umbraco/section/content", {
		url: "/umbraco/section/content",
		at: 1
	}]
}, ot = {
	III: [
		"data-types",
		"dictionary",
		"media"
	],
	VI: ["aliases", "keys"]
}, st = [];
function ct(e) {
	let t = e.filter((e) => e.host.isConnected);
	return (t.length ? t : e).at(-1)?.steps ?? [];
}
function lt(e) {
	let t = nt.get(e);
	return t ? (ot[e] ?? [...t.keys()]).flatMap((e) => ct(t.get(e) ?? [])) : [];
}
function ut(e) {
	return (at[e] ?? []).map((e, t) => typeof e == "string" ? {
		url: e,
		at: t
	} : e);
}
function dt() {
	return window.location.pathname.includes("/dashboard/penance");
}
var R = {
	get activeTab() {
		return F;
	},
	setActiveTab(e) {
		F = e, rt();
	},
	dot() {
		let e = window.location.pathname;
		if (dt()) {
			let e = ut(F), t = P.get(F) ?? 0, n = e.length ? e[Math.min(t, e.length - 1)].url : it;
			e.length && t < e.length && (P.set(F, t + 1), rt()), console.log(`[PRESENTER] dot() on penance tab="${F}" → ${n}`), window.location.href = n;
			return;
		}
		let t = st.find((t) => e === t.match), n = t ? t.target : it;
		console.log(`[PRESENTER] dot() elsewhere path="${e}" → ${n}`), window.location.href = n;
	},
	onNextTab(e, t) {
		I = [...I.filter((t) => t.host !== e && t.host.isConnected), {
			host: e,
			fn: t
		}];
	},
	nextTab() {
		console.log("[PRESENTER] nextTab()");
		let e = I.filter((e) => e.host.isConnected);
		(e.length ? e : I).at(-1)?.fn();
	},
	registerSteps(e, t, n, r = "main") {
		let i = nt.get(e) ?? /* @__PURE__ */ new Map(), a = (i.get(r) ?? []).filter((e) => e.host !== t && e.host.isConnected);
		i.set(r, [...a, {
			host: t,
			steps: n
		}]), nt.set(e, i);
	},
	async next() {
		if (L) return;
		let e = lt(F), t = N.get(F) ?? 0;
		if (console.log(`[PRESENTER] next() — tab="${F}" step=${t + 1}/${e.length}`), t >= e.length) {
			console.log(`[PRESENTER] no more steps on tab "${F}"`);
			return;
		}
		L = !0;
		try {
			await e[t].run();
		} finally {
			L = !1;
		}
		N.set(F, t + 1), rt(), console.log(`[PRESENTER] step ${t + 1} "${e[t].label}" done`);
	},
	async forward() {
		if (L) return;
		if (!dt()) {
			this.dot();
			return;
		}
		if (!F || !I.some((e) => e.host.isConnected)) return;
		let e = lt(F), t = Math.min(N.get(F) ?? 0, e.length), n = P.get(F) ?? 0, r = ut(F);
		if (n < r.length && r[n].at <= t) {
			this.dot();
			return;
		}
		if (t < e.length) {
			await this.next();
			return;
		}
		if (F === Ze[Ze.length - 1]) {
			console.log("[PRESENTER] forward() — all ten commandments atoned, handing the clicker back"), Xe();
			return;
		}
		this.nextTab();
	},
	reset() {
		try {
			sessionStorage.removeItem(Qe), sessionStorage.setItem($e, "1"), localStorage.removeItem("sinners-media-pretend");
		} catch {}
		window.location.href = it;
	}
};
//#endregion
//#region \0@oxc-project+runtime@0.128.0/helpers/decorate.js
function z(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region src/penance/commandments/content-not-composable.element.ts
var B = "/umbraco/management/api/v1/sinners", ft = {
	"Umbraco.BlockList": "Block List",
	"Umbraco.BlockGrid": "Block Grid",
	"Umbraco.RichText": "Rich Text"
}, V = class extends e(k) {
	constructor(...e) {
		super(...e), this._items = [], this._emptyItems = [], this._loading = !0, this._folding = /* @__PURE__ */ new Set(), this._blessing = /* @__PURE__ */ new Set(), this._deleting = /* @__PURE__ */ new Set(), this._lastResult = null;
	}
	#e;
	static {
		this.styles = l`
        .empty {
            padding: 32px;
            text-align: center;
            color: var(--uui-color-text-alt, #888);
        }

        .clean {
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--uui-color-positive-standalone, #0d7a54);
            font-weight: 600;
        }

        .composition-row {
            padding: 14px 16px;
            border-bottom: 1px solid var(--uui-color-border-standalone, #f0f0f0);
            background: var(--uui-color-surface, #fff);
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 12px;
            align-items: start;
        }

        .composition-row:last-child { border-bottom: none; }
        .composition-row:hover { background: var(--uui-color-surface-alt, #fafafa); }

        .name-block {
            display: flex;
            flex-direction: column;
            gap: 6px;
            min-width: 0;
        }

        .name {
            font-weight: 600;
            font-size: 13px;
        }

        .path {
            font-size: 11px;
            color: var(--uui-color-text-alt, #8d8d8d);
            font-family: monospace;
        }

        .props {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 4px;
        }

        .prop-chip {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 3px 8px;
            border-radius: 3px;
            font-size: 11px;
            font-weight: 600;
            background: var(--uui-color-danger-standalone, #d42054);
            color: white;
        }

        .prop-chip.blessed {
            background: var(--uui-color-positive-standalone, #0d7a54);
        }

        .prop-chip code {
            font-family: monospace;
            font-weight: 400;
            opacity: 0.75;
        }

        .fold-btn {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 2px 7px;
            border-radius: 3px;
            font-size: 10px;
            font-weight: 700;
            border: 1px solid rgba(255,255,255,0.5);
            background: rgba(0,0,0,0.15);
            color: white;
            cursor: pointer;
            white-space: nowrap;
            letter-spacing: 0.02em;
        }

        .fold-btn:hover {
            background: rgba(0,0,0,0.28);
        }

        .fold-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .used-on {
            font-size: 11px;
            color: var(--uui-color-text-alt, #888);
            margin-top: 4px;
        }

        .used-on strong {
            color: var(--uui-color-text, #333);
        }

        .count-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 24px;
            height: 24px;
            padding: 0 6px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 700;
            background: var(--uui-color-danger-standalone, #d42054);
            color: white;
            white-space: nowrap;
        }

        .count-badge.blessed {
            background: var(--uui-color-positive-standalone, #0d7a54);
        }

        .section-divider {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 16px 4px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: var(--uui-color-text-alt, #888);
            border-top: 1px solid var(--uui-color-border-standalone, #f0f0f0);
            margin-top: 4px;
        }

        .empty-comp-row {
            padding: 10px 16px;
            border-bottom: 1px solid var(--uui-color-border-standalone, #f0f0f0);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
        }

        .empty-comp-row:last-child { border-bottom: none; }
        .empty-comp-row:hover { background: var(--uui-color-surface-alt, #fafafa); }

        .delete-btn {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 3px 9px;
            border-radius: 3px;
            font-size: 11px;
            font-weight: 700;
            border: none;
            background: var(--uui-color-danger-standalone, #d42054);
            color: white;
            cursor: pointer;
            white-space: nowrap;
            flex-shrink: 0;
        }

        .delete-btn:hover { background: #b01a44; }

        .delete-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .result-banner {
            margin: 8px 16px 4px;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
        }

        .result-banner.success {
            background: var(--uui-color-positive-standalone, #0d7a54);
            color: white;
            border: 1px solid var(--uui-color-positive, #1ab873);
        }

        .result-banner.error {
            background: var(--uui-color-danger-standalone, #d42054);
            color: white;
            border: 1px solid var(--uui-color-danger, #d42054);
        }
    `;
	}
	connectedCallback() {
		super.connectedCallback(), R.registerSteps("I", this, [{
			label: "Fold In & bless everything",
			run: async () => {
				await this.#r("contentRows"), await this.#r("socialIconLinks"), await this.#i("instructionMessage"), await this.#i("successMessage"), await this.#i("errorMessage");
			}
		}]), this.consumeContext(n, (e) => {
			this.#e = e, this.#n();
		});
	}
	async #t(e, t = {}) {
		let n = await this.#e?.getLatestToken();
		return fetch(e, {
			...t,
			headers: {
				"Content-Type": "application/json",
				...n ? { Authorization: `Bearer ${n}` } : {},
				...t.headers ?? {}
			}
		});
	}
	async #n() {
		this._loading = !0;
		try {
			let [e, t] = await Promise.all([this.#t(`${B}/sinful-compositions`), this.#t(`${B}/empty-compositions`)]);
			e.ok && (this._items = await e.json()), t.ok && (this._emptyItems = await t.json());
			let n = this._items.reduce((e, t) => e + t.sinfulProperties.filter((e) => !e.isBlessed).length, 0);
			this.dispatchEvent(new CustomEvent("sinners-status", {
				bubbles: !0,
				composed: !0,
				detail: {
					issueCount: n,
					severity: n > 0 ? "error" : "ok"
				}
			}));
		} finally {
			this._loading = !1;
		}
	}
	async #r(e) {
		let t = this._items.flatMap((e) => e.sinfulProperties.map((t) => `${e.contentTypeAlias}.${t.propertyAlias}`));
		console.log(`[RULE I] foldInByAlias("${e}") — available:`, t);
		for (let t of this._items) {
			let n = t.sinfulProperties.find((t) => t.propertyAlias === e);
			if (n) {
				console.log(`[RULE I] found "${e}" on "${t.contentTypeAlias}", folding in`), await this.#a(t, n);
				return;
			}
		}
		console.warn(`[RULE I] property "${e}" not found in any sinful composition`);
	}
	async #i(e) {
		let t = this._items.flatMap((e) => e.sinfulProperties.map((t) => `${e.contentTypeAlias}.${t.propertyAlias}(blessed=${t.isBlessed})`));
		console.log(`[RULE I] blessByAlias("${e}") — available:`, t);
		for (let t of this._items) {
			let n = t.sinfulProperties.find((t) => t.propertyAlias === e && !t.isBlessed);
			if (n) {
				console.log(`[RULE I] found unblessed "${e}" on "${t.contentTypeAlias}", blessing`), await this.#c(t, n, !0);
				return;
			}
		}
		console.warn(`[RULE I] property "${e}" not found or already blessed`);
	}
	async #a(e, t) {
		let n = `${e.contentTypeAlias}:${t.propertyAlias}`;
		this._folding = new Set([...this._folding, n]), this._lastResult = null;
		try {
			let r = await (await this.#t(`${B}/fold-in`, {
				method: "POST",
				body: JSON.stringify({
					compositionAlias: e.contentTypeAlias,
					propertyAlias: t.propertyAlias
				})
			})).json();
			this._lastResult = {
				key: n,
				result: r
			}, r.success && (await this.#n(), M(1, "fold-in"));
		} catch (e) {
			this._lastResult = {
				key: n,
				result: {
					success: !1,
					message: String(e),
					affectedDocTypeCount: 0,
					affectedContentCount: 0
				}
			};
		} finally {
			this._folding = new Set([...this._folding].filter((e) => e !== n));
		}
	}
	async #o(e, t) {
		let n = `${e.contentTypeAlias}:${t.propertyAlias}`;
		if (window.confirm(`Fold "${t.propertyAlias}" from "${e.contentTypeName}" into: ${e.usedOn.join(", ")}?\n\nThis will:\n  1. Add "${t.propertyAlias}_fold_tmp" to each target doc type\n  2. Copy all content values across\n  3. Remove the property from the composition\n  4. Rename the temp property back to "${t.propertyAlias}"\n\nContent nodes will be saved as drafts. This cannot be undone.`)) {
			this._folding = new Set([...this._folding, n]), this._lastResult = null;
			try {
				let r = await (await this.#t(`${B}/fold-in`, {
					method: "POST",
					body: JSON.stringify({
						compositionAlias: e.contentTypeAlias,
						propertyAlias: t.propertyAlias
					})
				})).json();
				this._lastResult = {
					key: n,
					result: r
				}, r.success && (await this.#n(), M(1, "fold-in"));
			} catch (e) {
				this._lastResult = {
					key: n,
					result: {
						success: !1,
						message: String(e),
						affectedDocTypeCount: 0,
						affectedContentCount: 0
					}
				};
			} finally {
				this._folding = new Set([...this._folding].filter((e) => e !== n));
			}
		}
	}
	async #s(e) {
		if (window.confirm(`Delete "${e.contentTypeName}" (${e.contentTypeAlias})?\n\nThis cannot be undone.`)) {
			this._deleting = new Set([...this._deleting, e.contentTypeAlias]);
			try {
				await this.#t(`${B}/empty-compositions/${encodeURIComponent(e.contentTypeAlias)}`, { method: "DELETE" }), await this.#n();
			} finally {
				this._deleting = new Set([...this._deleting].filter((t) => t !== e.contentTypeAlias));
			}
		}
	}
	async #c(e, t, n) {
		let r = `${e.contentTypeAlias}:${t.propertyAlias}`;
		this._blessing = new Set([...this._blessing, r]);
		try {
			await this.#t(`${B}/bless`, {
				method: "POST",
				body: JSON.stringify({
					compositionAlias: e.contentTypeAlias,
					propertyAlias: t.propertyAlias,
					blessed: n
				})
			}), await this.#n(), n && M(1, "bless");
		} finally {
			this._blessing = new Set([...this._blessing].filter((e) => e !== r));
		}
	}
	#l(e) {
		return C`
            <div class="composition-row">
                <div class="name-block">
                    <span class="name">${e.contentTypeName}</span>
                    <span class="path">${e.folderPath}</span>
                    <div class="props">
                        ${e.sinfulProperties.map((t) => {
			let n = `${e.contentTypeAlias}:${t.propertyAlias}`, r = this._folding.has(n), i = this._blessing.has(n);
			return C`
                                <span class="prop-chip ${t.isBlessed ? "blessed" : ""}">
                                    ${ft[t.editorAlias] ?? t.editorAlias}
                                    <code>${t.propertyAlias}</code>
                                    <button
                                        class="fold-btn"
                                        ?disabled=${r || i}
                                        @click=${() => this.#o(e, t)}
                                        title="Move this property directly onto the doc types that compose it">
                                        ${r ? "⏳" : "↩ Fold In"}
                                    </button>
                                    <button
                                        class="fold-btn"
                                        ?disabled=${r || i}
                                        @click=${() => this.#c(e, t, !t.isBlessed)}
                                        title=${t.isBlessed ? "Remove blessing from this property" : "Mark this property as intentionally composable"}>
                                        ${i ? "⏳" : t.isBlessed ? "✕ Unbless" : "✦ Bless"}
                                    </button>
                                </span>
                            `;
		})}
                    </div>
                    <div class="used-on">
                        Composed into:
                        <strong>${e.usedOn.join(", ")}</strong>
                    </div>
                </div>
                <span class="count-badge ${e.sinfulProperties.every((e) => e.isBlessed) ? "blessed" : ""}">${e.sinfulProperties.length}</span>
            </div>
        `;
	}
	#u() {
		return this._emptyItems.length === 0 ? T : C`
            <div class="section-divider">Empty compositions</div>
            ${this._emptyItems.map((e) => C`
                <div class="empty-comp-row">
                    <div class="name-block">
                        <span class="name">${e.contentTypeName}</span>
                        <span class="path">${e.folderPath}</span>
                    </div>
                    <button
                        class="delete-btn"
                        ?disabled=${this._deleting.has(e.contentTypeAlias)}
                        @click=${() => this.#s(e)}>
                        ${this._deleting.has(e.contentTypeAlias) ? "⏳" : "⊗ Delete"}
                    </button>
                </div>
            `)}
        `;
	}
	render() {
		let e = this._lastResult;
		return C`
            <uui-box headline="I — Content is not composable">
                ${e ? C`
                          <div class="result-banner ${e.result.success ? "success" : "error"}">
                              ${e.result.message}
                          </div>
                      ` : T}
                ${this._loading ? C`<uui-loader-bar></uui-loader-bar>` : C`
                          ${this._items.length === 0 ? C`<div class="clean">✓ No compositions expose block lists, block grids, or rich text editors.</div>` : C`${this._items.map((e) => this.#l(e))}`}
                          ${this.#u()}
                      `}
            </uui-box>
        `;
	}
};
z([j()], V.prototype, "_items", void 0), z([j()], V.prototype, "_emptyItems", void 0), z([j()], V.prototype, "_loading", void 0), z([j()], V.prototype, "_folding", void 0), z([j()], V.prototype, "_blessing", void 0), z([j()], V.prototype, "_deleting", void 0), z([j()], V.prototype, "_lastResult", void 0), V = z([A("sinners-content-not-composable")], V);
//#endregion
//#region src/penance/commandments/four-sacred-types.element.ts
var pt = [
	"Page",
	"Block",
	"Data",
	"Composition"
], mt = "/umbraco/management/api/v1/sinners", H = class extends e(k) {
	constructor(...e) {
		super(...e), this._items = [], this._loading = !0, this._saving = !1, this._categorizing = !1, this._pendingChanges = /* @__PURE__ */ new Map();
	}
	#e;
	static {
		this.styles = l`
        .stats {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: var(--uui-size-space-5, 24px);
        }

        .stat-chip {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            background: var(--uui-color-surface-alt, #f4f4f4);
            color: var(--uui-color-text, #333);
        }

        .stat-chip.sinful {
            background: var(--uui-color-danger-standalone, #d42054);
            color: white;
        }

        .stat-chip.clean {
            background: var(--uui-color-positive-standalone, #0d7a54);
            color: white;
        }

        details {
            border: 1px solid var(--uui-color-border, #d8d7d9);
            border-radius: var(--uui-border-radius, 3px);
            margin-bottom: 8px;
            overflow: hidden;
        }

        summary {
            padding: 12px 16px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 600;
            font-size: 14px;
            user-select: none;
            background: var(--uui-color-surface, #fff);
            list-style: none;
        }

        summary::-webkit-details-marker { display: none; }

        summary::before {
            content: '▶';
            font-size: 10px;
            transition: transform 0.15s ease;
            color: var(--uui-color-text-alt, #888);
        }

        details[open] summary::before {
            transform: rotate(90deg);
        }

        details[open] summary {
            border-bottom: 1px solid var(--uui-color-border, #d8d7d9);
        }

        .group-count {
            font-weight: 400;
            color: var(--uui-color-text-alt, #888);
            font-size: 12px;
        }

        .sinful-label { color: var(--uui-color-danger-standalone, #d42054); }

        .item-row {
            display: grid;
            grid-template-columns: 1fr 160px 140px 200px;
            align-items: center;
            gap: 12px;
            padding: 10px 16px;
            border-bottom: 1px solid var(--uui-color-border-standalone, #f0f0f0);
            background: var(--uui-color-surface, #fff);
        }

        .item-row:last-child { border-bottom: none; }

        .item-row:hover { background: var(--uui-color-surface-alt, #fafafa); }

        .name-col {
            display: flex;
            flex-direction: column;
            gap: 2px;
            min-width: 0;
        }

        .name {
            font-weight: 500;
            font-size: 13px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .path {
            font-size: 11px;
            color: var(--uui-color-text-alt, #8d8d8d);
            font-family: monospace;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        code {
            font-family: monospace;
            background: var(--uui-color-surface-alt, #f4f4f4);
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 11px;
        }

        .badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 3px;
            font-size: 11px;
            font-weight: 600;
            background: var(--uui-color-surface-alt, #f4f4f4);
        }

        .badge.element {
            background: var(--uui-color-selected, #3544b1);
            color: white;
        }

        select {
            width: 100%;
            padding: 5px 8px;
            border: 1px solid var(--uui-color-border, #d8d7d9);
            border-radius: var(--uui-border-radius, 3px);
            background: white;
            font-size: 13px;
        }

        select.unclassified {
            border-color: var(--uui-color-warning-standalone, #f0ac00);
        }

        .suggestion {
            font-size: 10px;
            color: var(--uui-color-interactive, #3544b1);
            cursor: pointer;
            text-decoration: underline dotted;
            display: block;
            margin-top: 2px;
        }

        .empty {
            padding: 32px;
            text-align: center;
            color: var(--uui-color-text-alt, #888);
        }

        .save-bar {
            display: flex;
            justify-content: flex-end;
            padding: 12px 16px;
            border-top: 1px solid var(--uui-color-border, #d8d7d9);
            background: var(--uui-color-surface, #fff);
        }
    `;
	}
	connectedCallback() {
		super.connectedCallback(), R.registerSteps("II", this, [
			{
				label: "Autofill classifications",
				run: () => this.#o()
			},
			{
				label: "Save all",
				run: () => this.#c()
			},
			{
				label: "Auto categorize",
				run: () => this.#s()
			}
		]), this.consumeContext(n, (e) => {
			this.#e = e, this.#n();
		});
	}
	async #t(e, t = {}) {
		let n = await this.#e?.getLatestToken();
		return fetch(e, {
			...t,
			headers: {
				"Content-Type": "application/json",
				...n ? { Authorization: `Bearer ${n}` } : {},
				...t.headers ?? {}
			}
		});
	}
	async #n() {
		this._loading = !0;
		try {
			let e = await this.#t(`${mt}/content-type-classifications`);
			e.ok && (this._items = await e.json()), this.#r();
		} finally {
			this._loading = !1;
		}
	}
	#r() {
		let e = this._items.filter((e) => !e.classification).length;
		this.dispatchEvent(new CustomEvent("sinners-status", {
			bubbles: !0,
			composed: !0,
			detail: {
				issueCount: e,
				severity: e > 0 ? "error" : "ok"
			}
		}));
	}
	#i(e, t) {
		let n = new Map(this._pendingChanges);
		t ? n.set(e, t) : n.delete(e), this._pendingChanges = n;
	}
	#a(e, t) {
		let n = new Map(this._pendingChanges);
		n.set(e, t), this._pendingChanges = n;
	}
	#o() {
		let e = new Map(this._pendingChanges);
		for (let t of this._items) if (!t.classification && !e.has(t.contentTypeAlias)) if (t.suggestedClassification) e.set(t.contentTypeAlias, t.suggestedClassification), console.log(`[RULE II] suggestion → ${t.contentTypeAlias} = ${t.suggestedClassification}`);
		else {
			let n = t.folderPath ?? "";
			n.startsWith("/Elements/Setting") ? (e.set(t.contentTypeAlias, "Data"), console.log(`[RULE II] path rule (Data) → ${t.contentTypeAlias} (${n})`)) : n.startsWith("/Elements/") ? (e.set(t.contentTypeAlias, "Block"), console.log(`[RULE II] path rule (Block) → ${t.contentTypeAlias} (${n})`)) : console.warn(`[RULE II] no rule matched — ${t.contentTypeAlias} (${n}) left unclassified`);
		}
		this._pendingChanges = e, console.log(`[RULE II] autofill complete — ${e.size} pending`);
	}
	async #s() {
		this._categorizing = !0;
		try {
			(await this.#t(`${mt}/auto-categorize`, { method: "POST" })).ok && (await this.#n(), M(2, "auto-categorize"));
		} finally {
			this._categorizing = !1;
		}
	}
	async #c() {
		if (this._pendingChanges.size !== 0) {
			this._saving = !0;
			try {
				let e = 0;
				for (let [t, n] of this._pendingChanges) if ((await this.#t(`${mt}/content-type-classifications`, {
					method: "POST",
					body: JSON.stringify({
						contentTypeAlias: t,
						classification: n
					})
				})).ok) {
					e++, this._items = this._items.map((e) => e.contentTypeAlias === t ? {
						...e,
						classification: n,
						suggestedClassification: null
					} : e);
					let r = new Map(this._pendingChanges);
					r.delete(t), this._pendingChanges = r;
				}
				e > 0 && (this.#r(), M(2, "classify"));
			} finally {
				this._saving = !1;
			}
		}
	}
	#l(e) {
		return this._pendingChanges.get(e.contentTypeAlias) ?? e.classification ?? "";
	}
	#u(e) {
		let t = this.#l(e), n = this._pendingChanges.has(e.contentTypeAlias);
		return C`
            <div class="item-row">
                <div class="name-col">
                    <span class="name" title=${e.contentTypeName}>${e.contentTypeName}</span>
                    <span class="path" title=${e.folderPath}>${e.folderPath}</span>
                </div>
                <code>${e.contentTypeAlias}</code>
                <span class="badge ${e.isElement ? "element" : ""}">
                    ${e.isElement ? "Element" : "Document"}
                </span>
                <div>
                    <select
                        class=${t ? "" : "unclassified"}
                        .value=${t}
                        @change=${(t) => this.#i(e.contentTypeAlias, t.target.value)}
                    >
                        <option value="">— Unclassified —</option>
                        ${pt.map((e) => C`<option value=${e} ?selected=${t === e}>${e}</option>`)}
                    </select>
                    ${e.suggestedClassification && !n ? C`<span
                              class="suggestion"
                              @click=${() => this.#a(e.contentTypeAlias, e.suggestedClassification)}
                              >Suggest: ${e.suggestedClassification}</span
                          >` : T}
                </div>
            </div>
        `;
	}
	#d(e, t, n = !1) {
		return t.length === 0 ? T : C`
            <details ?open=${n}>
                <summary>
                    <span class=${e === "Unclassified" ? "sinful-label" : ""}>${e}</span>
                    <span class="group-count">${t.length}</span>
                </summary>
                ${t.map((e) => this.#u(e))}
            </details>
        `;
	}
	render() {
		let e = this._items.filter((e) => !e.classification), t = (e) => this._items.filter((t) => t.classification === e), n = e.length;
		return C`
            <uui-box headline="II — Four content types: Page, Block, Data, Composition">
                ${this._loading ? C`<uui-loader-bar></uui-loader-bar>` : this._items.length === 0 ? C`<div class="empty">No content types found.</div>` : C`
                            <div class="stats">
                                <uui-button
                                    look="outline"
                                    .disabled=${this._categorizing}
                                    @click=${() => void this.#s()}
                                >
                                    ${this._categorizing ? "Categorizing…" : "Auto Categorize"}
                                </uui-button>
                                ${n > 0 ? C`<span class="stat-chip sinful">⚠ ${n} unclassified</span>` : C`<span class="stat-chip clean">✓ All classified</span>`}
                                ${pt.map((e) => {
			let n = t(e).length;
			return n > 0 ? C`<span class="stat-chip">${e}: ${n}</span>` : T;
		})}
                            </div>

                            ${this.#d("Unclassified", e, !0)}
                            ${pt.map((e) => this.#d(e, t(e)))}
                            <div class="save-bar">
                                <uui-button
                                    look="primary"
                                    .disabled=${this._pendingChanges.size === 0 || this._saving}
                                    @click=${() => void this.#c()}
                                >
                                    ${this._saving ? "Saving…" : "Save"}
                                </uui-button>
                            </div>
                        `}
            </uui-box>
        `;
	}
};
z([j()], H.prototype, "_items", void 0), z([j()], H.prototype, "_loading", void 0), z([j()], H.prototype, "_saving", void 0), z([j()], H.prototype, "_categorizing", void 0), z([j()], H.prototype, "_pendingChanges", void 0), H = z([A("sinners-four-sacred-types")], H);
//#endregion
//#region src/penance/commandments/data-types-in-folders.element.ts
var ht = "/umbraco/management/api/v1/sinners", U = class extends e(k) {
	constructor(...e) {
		super(...e), this._items = [], this._loading = !0, this._organizing = !1, this._lastMessage = null;
	}
	#e;
	static {
		this.styles = l`
        .clean {
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--uui-color-positive-standalone, #0d7a54);
            font-weight: 600;
        }

        .toolbar {
            padding: 12px 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid var(--uui-color-border-standalone, #f0f0f0);
        }

        .count {
            font-size: 12px;
            color: var(--uui-color-text-alt, #888);
        }

        .organize-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 14px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 700;
            border: none;
            background: var(--sinners-action-btn-bg, #1b264f);
            color: var(--sinners-action-btn-color, white);
            cursor: pointer;
        }

        .organize-btn:hover { opacity: 0.88; }

        .organize-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .folder-group {
            border-bottom: 1px solid var(--uui-color-border-standalone, #f0f0f0);
        }

        .folder-group:last-child { border-bottom: none; }

        .folder-header {
            padding: 8px 16px;
            background: var(--uui-color-surface-alt, #fafafa);
            font-size: 11px;
            font-weight: 700;
            font-family: monospace;
            color: var(--uui-color-text-alt, #888);
            letter-spacing: 0.03em;
            border-bottom: 1px solid var(--uui-color-border-standalone, #f0f0f0);
        }

        .dt-row {
            padding: 8px 16px 8px 28px;
            display: flex;
            align-items: center;
            gap: 10px;
            border-bottom: 1px solid var(--uui-color-border-standalone, #f5f5f5);
            font-size: 12px;
        }

        .dt-row:last-child { border-bottom: none; }

        .dt-name {
            flex: 1;
            font-weight: 500;
        }

        .built-in-badge {
            font-size: 10px;
            font-weight: 700;
            padding: 1px 5px;
            border-radius: 3px;
            background: var(--uui-color-surface-emphasis, #e8e8e8);
            color: var(--uui-color-text-alt, #888);
            white-space: nowrap;
        }

        .result-banner {
            margin: 8px 16px 4px;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            color: white;
        }

        .result-banner.success {
            background: var(--uui-color-positive-standalone, #0d7a54);
        }

        .result-banner.error {
            background: var(--uui-color-danger-standalone, #d42054);
        }
    `;
	}
	connectedCallback() {
		super.connectedCallback(), R.registerSteps("III", this, [{
			label: "Organize data types",
			run: () => this.#r()
		}], "data-types"), this.consumeContext(n, (e) => {
			this.#e = e, this.#n();
		});
	}
	async #t(e, t = {}) {
		let n = await this.#e?.getLatestToken();
		return fetch(e, {
			...t,
			headers: {
				"Content-Type": "application/json",
				...n ? { Authorization: `Bearer ${n}` } : {},
				...t.headers ?? {}
			}
		});
	}
	async #n() {
		this._loading = !0;
		try {
			let e = await this.#t(`${ht}/unorganized-data-types`);
			e.ok && (this._items = await e.json());
			let t = this._items.length;
			this.dispatchEvent(new CustomEvent("sinners-status", {
				bubbles: !0,
				composed: !0,
				detail: {
					issueCount: t,
					severity: t > 0 ? "error" : "ok"
				}
			}));
		} finally {
			this._loading = !1;
		}
	}
	async #r() {
		this._organizing = !0, this._lastMessage = null;
		try {
			let e = await this.#t(`${ht}/organize-data-types`, { method: "POST" });
			if (e.ok) {
				let t = await e.json();
				this._lastMessage = {
					success: !0,
					text: `Organized ${t.organizedCount} data type(s) into folders.`
				}, await this.#n(), M(3, "organize-data-types");
			} else this._lastMessage = {
				success: !1,
				text: `Failed to organize data types (HTTP ${e.status}).`
			};
		} catch (e) {
			this._lastMessage = {
				success: !1,
				text: String(e)
			};
		} finally {
			this._organizing = !1;
		}
	}
	#i() {
		let e = /* @__PURE__ */ new Map();
		for (let t of this._items) {
			let n = e.get(t.targetFolder) ?? [];
			n.push(t), e.set(t.targetFolder, n);
		}
		return e;
	}
	render() {
		let e = this._lastMessage;
		return C`
            <uui-box headline="III — The root is bare: data types live in folders">
                ${e ? C`<div class="result-banner ${e.success ? "success" : "error"}">${e.text}</div>` : T}
                ${this._loading ? C`<uui-loader-bar></uui-loader-bar>` : this._items.length === 0 ? C`<div class="clean">✓ All data types are in folders.</div>` : C`
                            <div class="toolbar">
                                <span class="count">${this._items.length} data type(s) need organizing</span>
                                <button
                                    class="organize-btn"
                                    ?disabled=${this._organizing}
                                    @click=${this.#r}>
                                    ${this._organizing ? "⏳ Organizing…" : "⊞ Organize All"}
                                </button>
                            </div>
                            ${[...this.#i().entries()].map(([e, t]) => C`
                                <div class="folder-group">
                                    <div class="folder-header">${e}</div>
                                    ${t.map((e) => C`
                                        <div class="dt-row">
                                            <span class="dt-name">${e.name}</span>
                                            ${e.isBuiltIn ? C`<span class="built-in-badge">built-in</span>` : T}
                                        </div>
                                    `)}
                                </div>
                            `)}
                        `}
            </uui-box>
        `;
	}
};
z([j()], U.prototype, "_items", void 0), z([j()], U.prototype, "_loading", void 0), z([j()], U.prototype, "_organizing", void 0), z([j()], U.prototype, "_lastMessage", void 0), U = z([A("sinners-data-types-in-folders")], U);
//#endregion
//#region src/penance/magic.ts
var gt = !1;
function _t() {
	if (gt) return;
	let e = document.createElement("style");
	e.textContent = "\n        @keyframes sinners-magic-fade {\n            0%   { opacity: 0; }\n            20%  { opacity: 1; }\n            80%  { opacity: 1; }\n            100% { opacity: 0; }\n        }\n        .sinners-magic-overlay {\n            position: fixed !important;\n            top: 0 !important;\n            left: 0 !important;\n            width: 100vw !important;\n            height: 100vh !important;\n            z-index: 2147483647 !important;\n            background: rgba(0, 0, 0, 0.85) !important;\n            display: flex !important;\n            align-items: center !important;\n            justify-content: center !important;\n            pointer-events: none !important;\n            animation: sinners-magic-fade 1.8s ease forwards !important;\n        }\n        .sinners-magic-word {\n            font-size: 96px !important;\n            font-weight: 900 !important;\n            font-style: italic !important;\n            background: linear-gradient(90deg, #ff6b35, #f7c59f, #efefd0, #00b4d8, #9b5de5) !important;\n            -webkit-background-clip: text !important;\n            -webkit-text-fill-color: transparent !important;\n            background-clip: text !important;\n            white-space: nowrap !important;\n        }\n    ", document.head.appendChild(e), gt = !0;
}
function vt(e) {
	_t();
	let t = document.createElement("div");
	t.className = "sinners-magic-overlay";
	let n = document.createElement("span");
	n.className = "sinners-magic-word", n.textContent = "✨ Magic ✨", t.appendChild(n), document.documentElement.appendChild(t), setTimeout(() => {
		t.remove(), e();
	}, 1800);
}
//#endregion
//#region src/penance/commandments/program-cs-clean.element.ts
var yt = "/umbraco/management/api/v1/sinners", bt = "var i̸̖l̷̼l̴̮i̵̗g̸̫a̷̮l̶̼ = app.UseUmbraco();\n\ni̸̖l̷̼l̴̮i̵̗g̸̫a̷̮l̶̼.WithMiddleware(u =>\n    {\n        u.UseBackOffice();\n        u.UseWebsite();\n    })\n    .WithEndpoints(u =>\n    {\n        u.UseBackOfficeEndpoints();\n        u.UseWebsiteEndpoints();\n    });", xt = "app.UseUmbraco()\n    .WithMiddleware(u =>\n    {\n        u.UseBackOffice();\n        u.UseWebsite();\n    })\n    .WithEndpoints(u =>\n    {\n        u.UseBackOfficeEndpoints();\n        u.UseWebsiteEndpoints();\n    });\n\nawait app.RunAsync();", W = class extends e(k) {
	constructor(...e) {
		super(...e), this._result = null, this._loading = !0;
	}
	#e;
	static {
		this.styles = l`
        .clean {
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--uui-color-positive-standalone, #0d7a54);
            font-weight: 600;
        }

        .not-found {
            padding: 16px;
            color: var(--uui-color-text-alt, #888);
            font-size: 13px;
        }

        .issue-list {
            padding: 8px 0;
        }

        .issue-row {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            padding: 10px 16px;
            border-bottom: 1px solid var(--uui-color-border-standalone, #f0f0f0);
            font-size: 13px;
        }

        .issue-row:last-child { border-bottom: none; }

        .issue-icon {
            font-size: 15px;
            flex-shrink: 0;
            margin-top: 1px;
        }

        .issue-body {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        .issue-title {
            font-weight: 600;
            color: var(--uui-color-danger-standalone, #d42054);
        }

        .issue-detail {
            font-size: 11px;
            color: var(--uui-color-text-alt, #888);
            font-family: monospace;
        }

        .diff-block {
            display: flex;
            gap: 16px;
            padding: 16px;
            align-items: flex-start;
        }

        .diff-side {
            flex: 1;
            min-width: 0;
        }

        .diff-label {
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            margin-bottom: 6px;
        }

        .diff-label.before { color: var(--uui-color-danger-standalone, #d42054); }
        .diff-label.after  { color: var(--uui-color-positive-standalone, #0d7a54); }

        .diff-arrow {
            font-size: 24px;
            padding-top: 42px;
            color: var(--uui-color-text-alt, #aaa);
            flex-shrink: 0;
        }

        pre {
            margin: 0;
            padding: 12px 14px;
            border-radius: 6px;
            font-family: monospace;
            font-size: 12px;
            line-height: 1.6;
            white-space: pre;
            overflow-x: auto;
        }

        pre.before {
            background: #fff0f3;
            border: 1px solid #ffc0cb;
            color: #6b0020;
        }

        pre.after {
            background: #f0fff4;
            border: 1px solid #9ae6b4;
            color: #1a4731;
        }

        .fix-btn {
            margin: 0 16px 16px;
        }

    `;
	}
	connectedCallback() {
		super.connectedCallback(), R.registerSteps("IV", this, [{
			label: "Cleanse Program.cs",
			run: () => this.#n()
		}]), this.consumeContext(n, (e) => {
			this.#e = e, this.#t();
		});
	}
	async #t() {
		this._loading = !0;
		try {
			let e = await this.#e?.getLatestToken(), t = await fetch(`${yt}/program-cs-audit`, { headers: e ? { Authorization: `Bearer ${e}` } : {} });
			t.ok && (this._result = await t.json());
			let n = this._result ? +!!this._result.useUmbracoSavedToVariable + this._result.extraMiddleware.length + this._result.extraEndpoints.length : 0;
			this.dispatchEvent(new CustomEvent("sinners-status", {
				bubbles: !0,
				composed: !0,
				detail: {
					issueCount: n,
					severity: n > 0 ? "error" : "ok"
				}
			}));
		} finally {
			this._loading = !1;
		}
	}
	async #n() {
		let e = await this.#e?.getLatestToken();
		await fetch(`${yt}/fix-program-cs`, {
			method: "POST",
			headers: e ? { Authorization: `Bearer ${e}` } : {}
		}), vt(() => {
			M(4, "cleanse-program-cs"), this.#t();
		});
	}
	#r(e) {
		let t = [];
		for (let n of e.extraMiddleware) t.push({
			title: "Non-standard middleware registered",
			detail: `u.${n}()  — found inside .WithMiddleware(...)`
		});
		for (let n of e.extraEndpoints) t.push({
			title: "Non-standard endpoint registered",
			detail: `u.${n}()  — found inside .WithEndpoints(...)`
		});
		return C`
            ${e.useUmbracoSavedToVariable ? C`
                <div class="diff-block">
                    <div class="diff-side">
                        <div class="diff-label before">Before — thy sin</div>
                        <pre class="before">${bt}</pre>
                    </div>
                    <div class="diff-arrow">→</div>
                    <div class="diff-side">
                        <div class="diff-label after">After — absolved</div>
                        <pre class="after">${xt}</pre>
                    </div>
                </div>
                <uui-button class="fix-btn" look="secondary" @click=${() => void this.#n()}>
                    ✨ Apply the fix
                </uui-button>
            ` : ""}
            ${t.length > 0 ? C`
                <div class="issue-list">
                    ${t.map((e) => C`
                        <div class="issue-row">
                            <span class="issue-icon">✕</span>
                            <div class="issue-body">
                                <span class="issue-title">${e.title}</span>
                                <span class="issue-detail">${e.detail}</span>
                            </div>
                        </div>
                    `)}
                </div>
            ` : ""}
        `;
	}
	render() {
		let e = this._result;
		return C`
            <uui-box headline="IV — Compose in thy IComposer, not Program.cs">
                ${this._loading ? C`<uui-loader-bar></uui-loader-bar>` : !e || !e.found ? C`<div class="not-found">Program.cs not found at the application root.</div>` : e.isClean ? C`<div class="clean">✓ Program.cs looks clean.</div>` : this.#r(e)}
            </uui-box>
        `;
	}
};
z([j()], W.prototype, "_result", void 0), z([j()], W.prototype, "_loading", void 0), W = z([A("sinners-program-cs-clean")], W);
//#endregion
//#region src/penance/commandments/production-settings.element.ts
var St = "/umbraco/management/api/v1/sinners", G = class extends e(k) {
	constructor(...e) {
		super(...e), this._result = null, this._loading = !0, this._blessing = /* @__PURE__ */ new Set();
	}
	#e;
	static {
		this.styles = l`
        .clean {
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--uui-color-positive-standalone, #0d7a54);
            font-weight: 600;
        }

        .scanned {
            padding: 8px 16px 12px;
            font-size: 11px;
            color: var(--uui-color-text-alt, #888);
        }

        .warning-header {
            padding: 12px 16px 6px;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 13px;
            font-weight: 600;
            color: #92400e;
        }

        .warning-sub {
            padding: 0 16px 10px;
            font-size: 12px;
            color: var(--uui-color-text-alt, #888);
        }

        .setting-row {
            padding: 10px 16px;
            border-top: 1px solid var(--uui-color-border-standalone, #f0f0f0);
            display: grid;
            grid-template-columns: 1fr auto auto;
            gap: 12px;
            align-items: center;
            background: #fffbeb;
        }

        .setting-row.blessed {
            opacity: 0.55;
            background: var(--uui-color-surface-alt, #fafafa);
        }

        .setting-key {
            font-family: monospace;
            font-size: 12px;
            color: #1c1917;
            word-break: break-all;
        }

        .setting-value {
            font-family: monospace;
            font-size: 11px;
            font-weight: 700;
            padding: 2px 7px;
            border-radius: 3px;
            background: #fef3c7;
            color: #92400e;
            white-space: nowrap;
            border: 1px solid #fcd34d;
        }

        .setting-row.blessed .setting-value {
            background: var(--uui-color-surface-emphasis, #e8e8e8);
            color: var(--uui-color-text-alt, #888);
            border-color: var(--uui-color-border-standalone, #ccc);
        }

        .bless-btn {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 4px 10px;
            border-radius: 3px;
            font-size: 11px;
            font-weight: 700;
            border: 1px solid var(--uui-color-border-standalone, #d0d0d0);
            background: var(--uui-color-surface, #fff);
            color: var(--uui-color-text-alt, #555);
            cursor: pointer;
            white-space: nowrap;
            flex-shrink: 0;
        }

        .bless-btn:hover { background: var(--uui-color-surface-alt, #f5f5f5); }

        .bless-btn.blessed {
            border-color: var(--uui-color-positive-standalone, #0d7a54);
            color: var(--uui-color-positive-standalone, #0d7a54);
        }

        .bless-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    `;
	}
	connectedCallback() {
		super.connectedCallback(), R.registerSteps("V", this, [{
			label: "Bless all settings",
			run: () => this.#t()
		}]), this.consumeContext(n, (e) => {
			this.#e = e, this.#r();
		});
	}
	async #t() {
		for (let e = 0; e < 10; e++) {
			let e = (this._result?.missingSettings ?? []).find((e) => !e.isBlessed);
			if (!e) break;
			console.log(`[RULE V] blessing "${e.key}"`), await this.#i(e, !0);
		}
	}
	async #n(e, t = {}) {
		let n = await this.#e?.getLatestToken();
		return fetch(e, {
			...t,
			headers: {
				"Content-Type": "application/json",
				...n ? { Authorization: `Bearer ${n}` } : {},
				...t.headers ?? {}
			}
		});
	}
	async #r() {
		this._loading = !0;
		try {
			let e = await this.#n(`${St}/production-readiness`);
			e.ok && (this._result = await e.json());
			let t = this._result?.missingSettings.filter((e) => !e.isBlessed).length ?? 0;
			this.dispatchEvent(new CustomEvent("sinners-status", {
				bubbles: !0,
				composed: !0,
				detail: {
					issueCount: t,
					severity: t > 0 ? "warning" : "ok"
				}
			}));
		} finally {
			this._loading = !1;
		}
	}
	async #i(e, t) {
		this._blessing = new Set([...this._blessing, e.key]);
		try {
			await this.#n(`${St}/bless-production-setting`, {
				method: "POST",
				body: JSON.stringify({
					settingKey: e.key,
					blessed: t
				})
			}), await this.#r(), t && M(5, "bless");
		} finally {
			this._blessing = new Set([...this._blessing].filter((t) => t !== e.key));
		}
	}
	render() {
		let e = this._result, t = e ? C`<div class="scanned">Scanned: ${e.scannedFiles.join(", ")}</div>` : null;
		return C`
            <uui-box headline="V — A production site runs in production mode">
                ${this._loading ? C`<uui-loader-bar></uui-loader-bar>` : e ? e.isReady ? C`
                              <div class="clean">✓ Production settings found across your appsettings files.</div>
                              ${t}
                          ` : C`
                              <div class="warning-header">⚠ You better have a pipeline somewhere that sets these</div>
                              <div class="warning-sub">
                                  Scanned ${e.scannedFiles.join(", ")} — the following production settings were not found
                                  with valid values in any of them.
                              </div>
                              ${e.missingSettings.map((e) => {
			let t = this._blessing.has(e.key);
			return C`
                                      <div class="setting-row ${e.isBlessed ? "blessed" : ""}">
                                          <span class="setting-key">${e.key}</span>
                                          <span class="setting-value">${e.expectedValue}</span>
                                          <button
                                              class="bless-btn ${e.isBlessed ? "blessed" : ""}"
                                              ?disabled=${t}
                                              @click=${() => this.#i(e, !e.isBlessed)}
                                              title=${e.isBlessed ? "Remove blessing — surface this setting as an issue again" : "My pipeline handles this — bless it"}>
                                              ${t ? "⏳" : e.isBlessed ? "✦ Blessed" : "✦ Bless"}
                                          </button>
                                      </div>
                                  `;
		})}
                              ${t}
                          ` : null}
            </uui-box>
        `;
	}
};
z([j()], G.prototype, "_result", void 0), z([j()], G.prototype, "_loading", void 0), z([j()], G.prototype, "_blessing", void 0), G = z([A("sinners-production-settings")], G);
//#endregion
//#region src/penance/commandments/alias-audit.element.ts
var Ct = "/umbraco/management/api/v1/sinners", K = class extends e(k) {
	constructor(...e) {
		super(...e), this._items = [], this._loading = !0, this._blessing = /* @__PURE__ */ new Set();
	}
	#e;
	static {
		this.styles = l`
        .clean {
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--uui-color-positive-standalone, #0d7a54);
            font-weight: 600;
        }

        .issue-row {
            padding: 12px 16px;
            border-bottom: 1px solid var(--uui-color-border-standalone, #f0f0f0);
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 12px;
            align-items: start;
        }

        .issue-row:last-child { border-bottom: none; }
        .issue-row:hover { background: var(--uui-color-surface-alt, #fafafa); }

        .issue-row.blessed { opacity: 0.55; }

        .name-block {
            display: flex;
            flex-direction: column;
            gap: 5px;
            min-width: 0;
        }

        .name {
            font-weight: 600;
            font-size: 13px;
        }

        .alias {
            font-family: monospace;
            font-size: 12px;
            color: var(--uui-color-text-alt, #555);
        }

        .path {
            font-size: 11px;
            color: var(--uui-color-text-alt, #8d8d8d);
            font-family: monospace;
        }

        .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 3px;
        }

        .tag {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 2px 7px;
            border-radius: 3px;
            font-size: 11px;
            font-weight: 700;
            white-space: nowrap;
        }

        .tag.error {
            background: var(--uui-color-danger-standalone, #d42054);
            color: white;
        }

        .tag.warning {
            background: #f0ac00;
            color: white;
        }

        .tag code {
            font-family: monospace;
            font-weight: 400;
            opacity: 0.85;
        }

        .bless-btn {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 4px 10px;
            border-radius: 3px;
            font-size: 11px;
            font-weight: 700;
            border: 1px solid var(--uui-color-border-standalone, #d0d0d0);
            background: var(--uui-color-surface, #fff);
            color: var(--uui-color-text-alt, #555);
            cursor: pointer;
            white-space: nowrap;
            flex-shrink: 0;
        }

        .bless-btn:hover { background: var(--uui-color-surface-alt, #f5f5f5); }

        .bless-btn.blessed {
            border-color: var(--uui-color-positive-standalone, #0d7a54);
            color: var(--uui-color-positive-standalone, #0d7a54);
        }

        .bless-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    `;
	}
	connectedCallback() {
		super.connectedCallback(), R.registerSteps("VI", this, [{
			label: "Bless first alias",
			run: () => {
				let e = this._items.find((e) => !e.isBlessed);
				if (e) return this.#r(e, !0);
			}
		}], "aliases"), this.consumeContext(n, (e) => {
			this.#e = e, this.#n();
		});
	}
	async #t(e, t = {}) {
		let n = await this.#e?.getLatestToken();
		return fetch(e, {
			...t,
			headers: {
				"Content-Type": "application/json",
				...n ? { Authorization: `Bearer ${n}` } : {},
				...t.headers ?? {}
			}
		});
	}
	async #n() {
		this._loading = !0;
		try {
			let e = await this.#t(`${Ct}/alias-issues`);
			e.ok && (this._items = await e.json());
			let t = this._items.filter((e) => !e.isBlessed && !e.isCamelCase).length, n = this._items.filter((e) => !e.isBlessed && e.isCamelCase && e.unrecognizedWords.length > 0).length, r = t + n, i = t > 0 ? "error" : n > 0 ? "warning" : "ok";
			this.dispatchEvent(new CustomEvent("sinners-status", {
				bubbles: !0,
				composed: !0,
				detail: {
					issueCount: r,
					severity: i
				}
			}));
		} finally {
			this._loading = !1;
		}
	}
	async #r(e, t) {
		this._blessing = new Set([...this._blessing, e.contentTypeAlias]);
		try {
			await this.#t(`${Ct}/bless-alias`, {
				method: "POST",
				body: JSON.stringify({
					contentTypeAlias: e.contentTypeAlias,
					blessed: t
				})
			}), await this.#n(), t && M(6, "bless");
		} finally {
			this._blessing = new Set([...this._blessing].filter((t) => t !== e.contentTypeAlias));
		}
	}
	#i(e) {
		let t = this._blessing.has(e.contentTypeAlias);
		return C`
            <div class="issue-row ${e.isBlessed ? "blessed" : ""}">
                <div class="name-block">
                    <span class="name">${e.contentTypeName}</span>
                    <span class="alias">${e.contentTypeAlias}</span>
                    <span class="path">${e.folderPath}</span>
                    <div class="tags">
                        ${e.isCamelCase ? T : C`<span class="tag error">✕ Not camelCase</span>`}
                        ${e.unrecognizedWords.map((e) => C`
                            <span class="tag warning">? <code>${e}</code></span>
                        `)}
                    </div>
                </div>
                <button
                    class="bless-btn ${e.isBlessed ? "blessed" : ""}"
                    ?disabled=${t}
                    @click=${() => this.#r(e, !e.isBlessed)}
                    title=${e.isBlessed ? "Remove blessing — surface this alias as an issue again" : "Mark this alias as intentionally named"}>
                    ${t ? "⏳" : e.isBlessed ? "✦ Blessed" : "✦ Bless"}
                </button>
            </div>
        `;
	}
	render() {
		return C`
            <uui-box headline="VI — Thy names: aliases are English camelCase">
                ${this._loading ? C`<uui-loader-bar></uui-loader-bar>` : this._items.length === 0 ? C`<div class="clean">✓ All document type aliases are valid camelCase English.</div>` : C`${this._items.map((e) => this.#i(e))}`}
            </uui-box>
        `;
	}
};
z([j()], K.prototype, "_items", void 0), z([j()], K.prototype, "_loading", void 0), z([j()], K.prototype, "_blessing", void 0), K = z([A("sinners-alias-audit")], K);
//#endregion
//#region src/penance/commandments/translation-audit.element.ts
var wt = "/umbraco/management/api/v1/sinners", q = class extends e(k) {
	constructor(...e) {
		super(...e), this.mode = "naming", this._result = null, this._loading = !0, this._blessing = /* @__PURE__ */ new Set(), this._grouping = /* @__PURE__ */ new Set();
	}
	#e;
	static {
		this.styles = l`
        .clean {
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--uui-color-positive-standalone, #0d7a54);
            font-weight: 600;
        }

        .issue-row {
            padding: 12px 16px;
            border-bottom: 1px solid var(--uui-color-border-standalone, #f0f0f0);
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 12px;
            align-items: center;
        }

        .issue-row:last-child { border-bottom: none; }
        .issue-row:hover { background: var(--uui-color-surface-alt, #fafafa); }
        .issue-row.blessed { opacity: 0.55; }

        .key {
            font-family: monospace;
            font-weight: 600;
            font-size: 13px;
        }

        .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 5px;
        }

        .tag {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 2px 7px;
            border-radius: 3px;
            font-size: 11px;
            font-weight: 700;
            white-space: nowrap;
        }

        .tag.error { background: var(--uui-color-danger-standalone, #d42054); color: white; }
        .tag.warning { background: #f0ac00; color: white; }
        .tag code { font-family: monospace; font-weight: 400; opacity: 0.85; }

        .bless-btn {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 4px 10px;
            border-radius: 3px;
            font-size: 11px;
            font-weight: 700;
            border: 1px solid var(--uui-color-border-standalone, #d0d0d0);
            background: var(--uui-color-surface, #fff);
            color: var(--uui-color-text-alt, #555);
            cursor: pointer;
            white-space: nowrap;
            flex-shrink: 0;
        }

        .bless-btn:hover { background: var(--uui-color-surface-alt, #f5f5f5); }
        .bless-btn.blessed { border-color: var(--uui-color-positive-standalone, #0d7a54); color: var(--uui-color-positive-standalone, #0d7a54); }
        .bless-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .section-divider {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 16px 4px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: var(--uui-color-text-alt, #888);
            border-top: 1px solid var(--uui-color-border-standalone, #f0f0f0);
            margin-top: 4px;
        }

        .group-row {
            padding: 12px 16px;
            border-bottom: 1px solid var(--uui-color-border-standalone, #f0f0f0);
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 12px;
            align-items: start;
        }

        .group-row:last-child { border-bottom: none; }
        .group-row:hover { background: var(--uui-color-surface-alt, #fafafa); }

        .proposed-parent {
            font-family: monospace;
            font-weight: 700;
            font-size: 13px;
            color: var(--uui-color-interactive, #1b264f);
        }

        .group-children {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            margin-top: 6px;
        }

        .child-chip {
            font-family: monospace;
            font-size: 11px;
            padding: 2px 6px;
            border-radius: 3px;
            background: var(--uui-color-surface-emphasis, #e8e8e8);
            color: var(--uui-color-text-alt, #555);
        }

        .group-btn {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 5px 11px;
            border-radius: 3px;
            font-size: 11px;
            font-weight: 700;
            border: none;
            background: var(--sinners-action-btn-bg, #1b264f);
            color: var(--sinners-action-btn-color, white);
            cursor: pointer;
            white-space: nowrap;
            flex-shrink: 0;
        }

        .group-btn:hover { opacity: 0.88; }
        .group-btn:disabled { opacity: 0.5; cursor: not-allowed; }
    `;
	}
	connectedCallback() {
		super.connectedCallback(), this.mode === "grouping" && R.registerSteps("III", this, [{
			label: "Group all dictionary keys",
			run: () => this.#i()
		}], "dictionary"), this.consumeContext(n, (e) => {
			this.#e = e, this.#n();
		});
	}
	async #t(e, t = {}) {
		let n = await this.#e?.getLatestToken();
		return fetch(e, {
			...t,
			headers: {
				"Content-Type": "application/json",
				...n ? { Authorization: `Bearer ${n}` } : {},
				...t.headers ?? {}
			}
		});
	}
	async #n() {
		this._loading = !0;
		try {
			let e = await this.#t(`${wt}/translation-audit`);
			e.ok && (this._result = await e.json());
			let t = this._result, n = t?.issues.filter((e) => !e.isBlessed && !e.isPascalCase).length ?? 0, r = t?.issues.filter((e) => !e.isBlessed && e.isPascalCase && e.unrecognizedWords.length > 0).length ?? 0, i = t?.groupSuggestions.length ?? 0, a = this.mode === "grouping" ? i : n + r, o = this.mode === "grouping" ? i > 0 ? "warning" : "ok" : n > 0 ? "error" : a > 0 ? "warning" : "ok";
			this.dispatchEvent(new CustomEvent("sinners-status", {
				bubbles: !0,
				composed: !0,
				detail: {
					issueCount: a,
					severity: o
				}
			}));
		} finally {
			this._loading = !1;
		}
	}
	async #r(e, t) {
		this._blessing = new Set([...this._blessing, e.itemKey]);
		try {
			await this.#t(`${wt}/bless-translation`, {
				method: "POST",
				body: JSON.stringify({
					itemKey: e.itemKey,
					blessed: t
				})
			}), await this.#n(), t && M(6, "bless");
		} finally {
			this._blessing = new Set([...this._blessing].filter((t) => t !== e.itemKey));
		}
	}
	async #i() {
		for (let e = 0; e < 50; e++) {
			let e = this._result?.groupSuggestions[0];
			if (!e) break;
			await this.#a(e, !1);
		}
		M(3, "group-dictionary");
	}
	async #a(e, t = !0) {
		this._grouping = new Set([...this._grouping, e.proposedParentKey]);
		try {
			await this.#t(`${wt}/create-translation-group`, {
				method: "POST",
				body: JSON.stringify({
					parentKey: e.proposedParentKey,
					childIds: e.children.map((e) => e.id)
				})
			}), await this.#n(), t && M(3, "group-dictionary");
		} finally {
			this._grouping = new Set([...this._grouping].filter((t) => t !== e.proposedParentKey));
		}
	}
	#o(e) {
		return e.length === 0 ? T : C`
            ${e.map((e) => {
			let t = this._blessing.has(e.itemKey);
			return C`
                    <div class="issue-row ${e.isBlessed ? "blessed" : ""}">
                        <div>
                            <span class="key">${e.itemKey}</span>
                            <div class="tags">
                                ${e.isPascalCase ? T : C`<span class="tag error">✕ Not PascalCase</span>`}
                                ${e.unrecognizedWords.map((e) => C`
                                    <span class="tag warning">? <code>${e}</code></span>
                                `)}
                            </div>
                        </div>
                        <button
                            class="bless-btn ${e.isBlessed ? "blessed" : ""}"
                            ?disabled=${t}
                            @click=${() => this.#r(e, !e.isBlessed)}
                            title=${e.isBlessed ? "Remove blessing" : "Mark this key as intentionally named"}>
                            ${t ? "⏳" : e.isBlessed ? "✦ Blessed" : "✦ Bless"}
                        </button>
                    </div>
                `;
		})}
        `;
	}
	#s(e) {
		return e.length === 0 ? T : C`
            <div class="section-divider">Ungrouped keys</div>
            ${e.map((e) => {
			let t = this._grouping.has(e.proposedParentKey);
			return C`
                    <div class="group-row">
                        <div>
                            <span class="proposed-parent">${e.proposedParentKey}</span>
                            <div class="group-children">
                                ${e.children.map((e) => C`<span class="child-chip">${e.itemKey}</span>`)}
                            </div>
                        </div>
                        <button
                            class="group-btn"
                            ?disabled=${t}
                            @click=${() => this.#a(e)}
                            title="Create '${e.proposedParentKey}' as a parent and nest these keys under it">
                            ${t ? "⏳" : "⊞ Group"}
                        </button>
                    </div>
                `;
		})}
        `;
	}
	render() {
		let e = this._result, t = this.mode === "grouping", n = t ? (e?.groupSuggestions.length ?? 0) > 0 : (e?.issues.length ?? 0) > 0, r = t ? "III — A folder is only a folder: dotted keys nest under a parent" : "VI — Thy names: translation keys are PascalCase, dot-separated", i = t ? "✓ No dotted keys loose at the root — every group has its folder." : "✓ All translation keys are PascalCase English.";
		return C`
            <uui-box headline=${r}>
                ${this._loading ? C`<uui-loader-bar></uui-loader-bar>` : !n || !e ? C`<div class="clean">${i}</div>` : t ? this.#s(e.groupSuggestions) : this.#o(e.issues)}
            </uui-box>
        `;
	}
};
z([Ve()], q.prototype, "mode", void 0), z([j()], q.prototype, "_result", void 0), z([j()], q.prototype, "_loading", void 0), z([j()], q.prototype, "_blessing", void 0), z([j()], q.prototype, "_grouping", void 0), q = z([A("sinners-translation-audit")], q);
//#endregion
//#region src/penance/commandments/root-media.element.ts
var Tt = "/umbraco/management/api/v1/sinners", J = class extends e(k) {
	constructor(...e) {
		super(...e), this._items = [], this._loading = !0, this._pretending = !1;
	}
	#e;
	static {
		this.styles = l`
        .clean {
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--uui-color-positive-standalone, #0d7a54);
            font-weight: 600;
        }

        .info {
            padding: 10px 16px 4px;
            font-size: 12px;
            color: var(--uui-color-text-alt, #888);
            border-bottom: 1px solid var(--uui-color-border-standalone, #f0f0f0);
        }

        .item-row {
            padding: 10px 16px;
            border-bottom: 1px solid var(--uui-color-border-standalone, #f0f0f0);
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .item-row:last-child { border-bottom: none; }
        .item-row:hover { background: var(--uui-color-surface-alt, #fafafa); }

        .item-name {
            flex: 1;
            font-weight: 500;
            font-size: 13px;
        }

        .item-type {
            font-family: monospace;
            font-size: 11px;
            padding: 2px 6px;
            border-radius: 3px;
            background: var(--uui-color-surface-emphasis, #e8e8e8);
            color: var(--uui-color-text-alt, #555);
            white-space: nowrap;
        }

        .item-date {
            font-size: 11px;
            color: var(--uui-color-text-alt, #aaa);
            white-space: nowrap;
        }

        .pretend-btn {
            margin: 12px 16px;
        }
    `;
	}
	connectedCallback() {
		super.connectedCallback(), R.registerSteps("III", this, [{
			label: "Pretend to fix the media root ✨",
			run: () => this.#i()
		}], "media"), this.consumeContext(n, (e) => {
			this.#e = e, this.#n();
		});
	}
	async #t(e, t = {}) {
		let n = await this.#e?.getLatestToken();
		return fetch(e, {
			...t,
			headers: {
				...n ? { Authorization: `Bearer ${n}` } : {},
				...t.headers ?? {}
			}
		});
	}
	async #n() {
		this._loading = !0;
		try {
			let e = !1;
			try {
				e = sessionStorage.getItem($e) === "1";
			} catch {}
			if (e) {
				await this.#t(`${Tt}/forget-pretences`, { method: "POST" });
				try {
					sessionStorage.removeItem($e);
				} catch {}
			}
			let t = await this.#t(`${Tt}/root-media`);
			if (t.ok) {
				let e = await t.json();
				this._items = e.items, this._pretending = e.pretending;
			}
			this.#r();
		} finally {
			this._loading = !1;
		}
	}
	#r() {
		let e = this._pretending ? 0 : this._items.length;
		this.dispatchEvent(new CustomEvent("sinners-status", {
			bubbles: !0,
			composed: !0,
			detail: {
				issueCount: e,
				severity: e > 0 ? "error" : "ok"
			}
		}));
	}
	async #i() {
		this._items.length !== 0 && (await this.#t(`${Tt}/pretend-root-media`, { method: "POST" })).ok && vt(() => {
			this._pretending = !0, this.#r(), M(3, "pretend-media", !0);
		});
	}
	render() {
		let e = this._pretending ? [] : this._items;
		return C`
            <uui-box headline="III — The root is bare: no media at the root">
                ${this._loading ? C`<uui-loader-bar></uui-loader-bar>` : e.length === 0 ? C`<div class="clean">✓ No media items loose at root — everything is in a folder.</div>` : C`
                            <div class="info">
                                ${e.length} media item(s) are sitting directly at root.
                                Move them into a folder.
                            </div>
                            ${e.map((e) => C`
                                <div class="item-row">
                                    <span class="item-name">${e.name}</span>
                                    <span class="item-type">${e.mediaTypeAlias}</span>
                                    <span class="item-date">${new Date(e.createDate).toLocaleDateString()}</span>
                                </div>
                            `)}
                            <uui-button class="pretend-btn" look="secondary" @click=${() => this.#i()}>
                                ✨ Let's pretend it's fixed
                            </uui-button>
                        `}
            </uui-box>
        `;
	}
};
z([j()], J.prototype, "_items", void 0), z([j()], J.prototype, "_loading", void 0), z([j()], J.prototype, "_pretending", void 0), J = z([A("sinners-root-media")], J);
//#endregion
//#region src/penance/commandments/views-confession.element.ts
var Et = "/umbraco/management/api/v1/sinners", Y = class extends e(k) {
	constructor(...e) {
		super(...e), this._result = null, this._loading = !0, this._confessing = !1;
	}
	#e;
	static {
		this.styles = l`
        .clean {
            padding: 16px;
            color: var(--uui-color-positive-standalone, #0d7a54);
            font-weight: 600;
        }

        .info {
            padding: 12px 16px;
            font-size: 13px;
            color: var(--uui-color-text-alt, #666);
            line-height: 1.6;
        }

        .file-row {
            padding: 10px 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            border-top: 1px solid var(--uui-color-border-standalone, #f0f0f0);
            font-family: monospace;
            font-size: 13px;
        }

        .count {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 22px;
            height: 22px;
            padding: 0 6px;
            border-radius: 11px;
            font-family: inherit;
            font-size: 11px;
            font-weight: 700;
            color: white;
            background: var(--uui-color-danger-standalone, #d42054);
        }

        .hit {
            padding: 10px 16px;
            border-top: 1px solid var(--uui-color-border-standalone, #f0f0f0);
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 12px;
            align-items: start;
        }

        .where {
            font-family: monospace;
            font-size: 12px;
            color: var(--uui-color-text-alt, #888);
        }

        .code {
            display: block;
            margin-top: 4px;
            padding: 6px 8px;
            border-radius: 3px;
            font-family: monospace;
            font-size: 12px;
            white-space: pre-wrap;
            word-break: break-all;
            background: var(--uui-color-surface-emphasis, #f0f0f0);
        }

        .tag {
            padding: 2px 7px;
            border-radius: 3px;
            font-size: 11px;
            font-weight: 700;
            white-space: nowrap;
            color: white;
            background: var(--uui-color-danger-standalone, #d42054);
        }

        .tag.confessed {
            background: var(--uui-color-positive-standalone, #0d7a54);
        }

        .confess-btn {
            margin: 12px 16px 16px;
        }
    `;
	}
	connectedCallback() {
		super.connectedCallback(), R.registerSteps("VII", this, [{
			label: "Confess",
			run: () => this.#i()
		}]), this.consumeContext(n, (e) => {
			this.#e = e, this.#n();
		});
	}
	async #t(e, t = {}) {
		let n = await this.#e?.getLatestToken();
		return fetch(e, {
			...t,
			headers: {
				...n ? { Authorization: `Bearer ${n}` } : {},
				...t.headers ?? {}
			}
		});
	}
	async #n() {
		this._loading = !0;
		try {
			let e = await this.#t(`${Et}/views-confession`);
			e.ok && (this._result = await e.json()), this.#r();
		} finally {
			this._loading = !1;
		}
	}
	#r() {
		let e = this._result?.hits.filter((e) => !e.isConfessed).length ?? 0;
		this.dispatchEvent(new CustomEvent("sinners-status", {
			bubbles: !0,
			composed: !0,
			detail: {
				issueCount: e,
				severity: e > 0 ? "error" : "ok"
			}
		}));
	}
	async #i() {
		if (this._result?.hits.some((e) => !e.isConfessed)) {
			this._confessing = !0;
			try {
				let e = await this.#t(`${Et}/confess`, { method: "POST" });
				e.ok && (this._result = await e.json(), this.#r(), M(7, "confess"));
			} finally {
				this._confessing = !1;
			}
		}
	}
	#a(e) {
		let t = /* @__PURE__ */ new Map();
		for (let n of e) t.set(n.file, (t.get(n.file) ?? 0) + 1);
		return C`
            <div class="info">
                ${e.length} sin(s) hide in thy views: tree walks and the content service, run on every
                request. A view shall render what it is given. The code cannot be fixed from here — but it can be confessed.
            </div>
            ${[...t.entries()].map(([e, t]) => C`
                <div class="file-row"><span>${e}</span><span class="count">${t}</span></div>
            `)}
            <uui-button class="confess-btn" look="primary" color="danger"
                ?disabled=${this._confessing}
                @click=${() => void this.#i()}>
                ${this._confessing ? "⏳ Confessing…" : "🕯 Confess"}
            </uui-button>
        `;
	}
	#o(e) {
		return e.map((e) => C`
            <div class="hit">
                <div>
                    <span class="where">${e.file}:${e.line} — ${e.pattern}</span>
                    <code class="code">${e.text}</code>
                </div>
                <span class="tag ${e.isConfessed ? "confessed" : ""}">${e.isConfessed ? "✓ Confessed" : "✕ Unconfessed"}</span>
            </div>
        `);
	}
	render() {
		let e = this._result, t = e?.hits ?? [], n = t.filter((e) => !e.isConfessed);
		return C`
            <uui-box headline="VII — Views render; they don’t search">
                ${this._loading && !e ? C`<uui-loader-bar></uui-loader-bar>` : e?.viewsFound ? t.length === 0 ? C`<div class="clean">✓ No view searcheth the tree. Thy views render what they are given.</div>` : n.length > 0 && n.length === t.length ? this.#a(t) : C`
                                <div class="info">
                                    ${n.length === 0 ? C`Thou hast confessed. The code is as sinful as before; thy conscience is not.` : T}
                                </div>
                                ${this.#o(t)}
                                ${n.length > 0 ? C`<uui-button class="confess-btn" look="primary" color="danger"
                                            ?disabled=${this._confessing}
                                            @click=${() => void this.#i()}>🕯 Confess the rest</uui-button>` : T}
                            ` : C`<div class="info">No Views folder at the content root — nothing to confess.</div>`}
            </uui-box>
        `;
	}
};
z([j()], Y.prototype, "_result", void 0), z([j()], Y.prototype, "_loading", void 0), z([j()], Y.prototype, "_confessing", void 0), Y = z([A("sinners-views-confession")], Y);
//#endregion
//#region src/penance/commandments/exodus.element.ts
var Dt = "/umbraco/management/api/v1/sinners", X = class extends e(k) {
	constructor(...e) {
		super(...e), this._audit = null, this._loading = !0, this._leading = !1, this._result = null, this._error = null;
	}
	#e;
	static {
		this.styles = l`
        .clean {
            padding: 16px;
            color: var(--uui-color-positive-standalone, #0d7a54);
            font-weight: 600;
        }

        .info {
            padding: 12px 16px;
            font-size: 13px;
            color: var(--uui-color-text-alt, #666);
            line-height: 1.6;
        }

        .sinner {
            padding: 12px 16px;
            border-top: 1px solid var(--uui-color-border-standalone, #f0f0f0);
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 12px;
            align-items: center;
        }

        .name {
            font-weight: 600;
            font-size: 13px;
        }

        .detail {
            margin-top: 3px;
            font-size: 12px;
            color: var(--uui-color-text-alt, #888);
        }

        .detail code {
            font-family: monospace;
        }

        .count {
            font-size: 22px;
            font-weight: 800;
            color: var(--uui-color-danger-standalone, #d42054);
            white-space: nowrap;
        }

        .count small {
            font-size: 11px;
            font-weight: 600;
            color: var(--uui-color-text-alt, #888);
        }

        .banner {
            margin: 12px 16px 4px;
            padding: 10px 12px;
            border-radius: 4px;
            font-size: 12px;
            line-height: 1.6;
            color: white;
            background: var(--uui-color-positive-standalone, #0d7a54);
        }

        .banner.error {
            background: var(--uui-color-danger-standalone, #d42054);
        }

        .banner code {
            font-family: monospace;
        }

        .exodus-btn {
            margin: 12px 16px 16px;
        }
    `;
	}
	connectedCallback() {
		super.connectedCallback(), R.registerSteps("VIII", this, [{
			label: "Exodus",
			run: () => this.#r()
		}]), this.consumeContext(n, (e) => {
			this.#e = e, this.#n();
		});
	}
	async #t(e, t = {}) {
		let n = await this.#e?.getLatestToken();
		return fetch(e, {
			...t,
			headers: {
				...n ? { Authorization: `Bearer ${n}` } : {},
				...t.headers ?? {}
			}
		});
	}
	async #n() {
		this._loading = !0;
		try {
			let e = await this.#t(`${Dt}/exodus-audit`);
			e.ok && (this._audit = await e.json());
			let t = this._audit?.sinners.length ?? 0;
			this.dispatchEvent(new CustomEvent("sinners-status", {
				bubbles: !0,
				composed: !0,
				detail: {
					issueCount: t,
					severity: t > 0 ? "error" : "ok"
				}
			}));
		} finally {
			this._loading = !1;
		}
	}
	async #r() {
		if (this._audit?.sinners.length) {
			this._leading = !0, this._error = null;
			try {
				let e = await this.#t(`${Dt}/exodus`, { method: "POST" });
				if (!e.ok) {
					this._error = `The sea did not part (HTTP ${e.status}).`;
					return;
				}
				this._result = await e.json(), await this.#n(), M(8, "exodus");
			} catch (e) {
				this._error = String(e);
			} finally {
				this._leading = !1;
			}
		}
	}
	#i(e) {
		return C`
            <div class="sinner">
                <div>
                    <div class="name">${e.name}</div>
                    <div class="detail">
                        ${e.kind === "warehouse" ? C`${e.contentTypeName} nodes (<code>${e.contentTypeAlias}</code>) under one parent — a warehouse, not a website. Limit ${e.threshold}.` : C`${e.contentTypeName} (<code>${e.contentTypeAlias}</code>) saved again and again — a log table in disguise. Limit ${e.threshold} versions.`}
                    </div>
                </div>
                <div class="count">${e.count} <small>${e.kind === "warehouse" ? "children" : "versions"}</small></div>
            </div>
        `;
	}
	#a(e) {
		return C`
            <div class="banner">
                Let my content go. ${e.deletedNodes} node(s) left the tree and ${e.prunedVersions} version(s) were pruned,
                in ${(e.elapsedMs / 1e3).toFixed(1)} s. They dwell now in
                ${e.files.map((t, n) => C`${n > 0 ? ", " : ""}<code>${e.exportFolder}/${t.file}</code>`)} —
                put them in a real database.
            </div>
        `;
	}
	render() {
		let e = this._audit;
		return C`
            <uui-box headline="VIII — Umbraco is not thy database">
                ${this._result ? this.#a(this._result) : T}
                ${this._error ? C`<div class="banner error">${this._error}</div>` : T}
                ${this._loading && !e ? C`<uui-loader-bar></uui-loader-bar>` : !e || e.sinners.length === 0 ? C`<div class="clean">✓ No warehouses, no log tables. Thy content tree holdeth only content.</div>` : C`
                            <div class="info">
                                More than ${e.childThreshold} children of one type under one parent, or more than
                                ${e.versionThreshold} versions of one node: that is data, and data belongeth in a database.
                            </div>
                            ${e.sinners.map((e) => this.#i(e))}
                            <uui-button class="exodus-btn" look="primary" color="danger"
                                ?disabled=${this._leading}
                                @click=${() => void this.#r()}>
                                ${this._leading ? "⏳ Parting the sea…" : "🌊 Exodus: export and lead them out"}
                            </uui-button>
                        `}
            </uui-box>
        `;
	}
};
z([j()], X.prototype, "_audit", void 0), z([j()], X.prototype, "_loading", void 0), z([j()], X.prototype, "_leading", void 0), z([j()], X.prototype, "_result", void 0), z([j()], X.prototype, "_error", void 0), X = z([A("sinners-exodus")], X);
//#endregion
//#region src/penance/commandments/root-content.element.ts
var Ot = "/umbraco/management/api/v1/sinners", Z = class extends e(k) {
	constructor(...e) {
		super(...e), this._result = null, this._loading = !0, this._seeking = !1, this._sanctuaryMessage = null;
	}
	#e;
	static {
		this.styles = l`
        .clean {
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--uui-color-positive-standalone, #0d7a54);
            font-weight: 600;
        }

        .info {
            padding: 12px 16px;
            font-size: 13px;
            color: var(--uui-color-text-alt, #666);
            border-bottom: 1px solid var(--uui-color-border-standalone, #f0f0f0);
            line-height: 1.5;
        }

        .item-row {
            padding: 10px 16px;
            border-bottom: 1px solid var(--uui-color-border-standalone, #f0f0f0);
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .item-row:last-child { border-bottom: none; }
        .item-row:hover { background: var(--uui-color-surface-alt, #fafafa); }

        .item-name {
            flex: 1;
            font-weight: 500;
            font-size: 13px;
        }

        .item-type {
            font-family: monospace;
            font-size: 11px;
            padding: 2px 6px;
            border-radius: 3px;
            background: var(--uui-color-surface-emphasis, #e8e8e8);
            color: var(--uui-color-text-alt, #555);
            white-space: nowrap;
        }

        .badge {
            display: inline-flex;
            align-items: center;
            padding: 2px 8px;
            border-radius: 3px;
            font-size: 11px;
            font-weight: 700;
            white-space: nowrap;
        }

        .badge.ok {
            background: var(--uui-color-positive-standalone, #0d7a54);
            color: white;
        }

        .badge.error {
            background: var(--uui-color-danger-standalone, #d42054);
            color: white;
        }

        .action-row {
            padding: 14px 16px;
            border-top: 1px solid var(--uui-color-border-standalone, #f0f0f0);
        }

        .sanctuary-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 8px 16px;
            border-radius: 4px;
            font-size: 13px;
            font-weight: 700;
            border: none;
            background: var(--sinners-action-btn-bg, #1b264f);
            color: var(--sinners-action-btn-color, white);
            cursor: pointer;
        }

        .sanctuary-btn:hover { opacity: 0.88; }
        .sanctuary-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .sanctuary-message {
            margin: 14px 16px;
            padding: 14px 16px;
            border-radius: 4px;
            border-left: 4px solid var(--uui-color-positive-standalone, #0d7a54);
            background: var(--uui-color-surface-alt, #f7faf9);
            font-size: 13px;
            line-height: 1.6;
            color: var(--uui-color-text, #333);
        }

        .error-message {
            margin: 14px 16px;
            padding: 14px 16px;
            border-radius: 4px;
            border-left: 4px solid var(--uui-color-danger-standalone, #d42054);
            background: #fff5f7;
            font-size: 13px;
            color: var(--uui-color-danger-standalone, #d42054);
        }
    `;
	}
	connectedCallback() {
		super.connectedCallback(), R.registerSteps("IX", this, [{
			label: "Seek Root Sanctuary",
			run: () => this.#r()
		}]), this.consumeContext(n, (e) => {
			this.#e = e, this.#n();
		});
	}
	async #t(e, t = {}) {
		let n = await this.#e?.getLatestToken();
		return fetch(e, {
			...t,
			headers: {
				"Content-Type": "application/json",
				...n ? { Authorization: `Bearer ${n}` } : {},
				...t.headers ?? {}
			}
		});
	}
	async #n() {
		this._loading = !0;
		try {
			let e = await this.#t(`${Ot}/root-content-audit`);
			e.ok && (this._result = await e.json());
			let t = this._result?.rootNodes.filter((e) => e.hasTemplate).length ?? 0;
			this.dispatchEvent(new CustomEvent("sinners-status", {
				bubbles: !0,
				composed: !0,
				detail: {
					issueCount: t,
					severity: t > 0 ? "error" : "ok"
				}
			}));
		} finally {
			this._loading = !1;
		}
	}
	async #r() {
		this._seeking = !0, this._sanctuaryMessage = null;
		try {
			let e = await this.#t(`${Ot}/seek-root-sanctuary`, { method: "POST" });
			if (e.ok) {
				let t = await e.json();
				this._sanctuaryMessage = t.success ? t.message : `⚠ ${t.message}`, t.success && (await this.#n(), M(9, "root-sanctuary"));
			}
		} finally {
			this._seeking = !1;
		}
	}
	render() {
		let e = this._result, t = e?.rootNodes.filter((e) => e.hasTemplate) ?? [];
		return C`
            <uui-box headline="IX — A root node is not a rendering node">
                ${this._loading ? C`<uui-loader-bar></uui-loader-bar>` : e?.isClean ? C`
                            <div class="clean">✓ No root node beareth a template. The root is unrenderable and righteous.</div>
                            ${this._sanctuaryMessage ? C`<div class="sanctuary-message">${this._sanctuaryMessage}</div>` : ""}
                            ${e.rootNodes.map((e) => C`
                                <div class="item-row">
                                    <span class="item-name">${e.name}</span>
                                    <span class="item-type">${e.contentTypeAlias}</span>
                                    <span class="badge ok">✓ Templateless</span>
                                </div>
                            `)}` : C`
                            <div class="info">
                                ${t.length} root node(s) beareth a template. The Library now shelters thy shared
                                content — the root's only calling is to hold structure, never to render. Seek sanctuary below.
                            </div>
                            ${e?.rootNodes.map((e) => C`
                                <div class="item-row">
                                    <span class="item-name">${e.name}</span>
                                    <span class="item-type">${e.contentTypeAlias}${e.templateAlias ? ` → ${e.templateAlias}` : ""}</span>
                                    <span class="badge ${e.hasTemplate ? "error" : "ok"}">
                                        ${e.hasTemplate ? "✕ Rendereth" : "✓ Templateless"}
                                    </span>
                                </div>
                            `)}
                            ${this._sanctuaryMessage ? C`<div class="sanctuary-message">${this._sanctuaryMessage}</div>` : C`
                                    <div class="action-row">
                                        <button
                                            class="sanctuary-btn"
                                            ?disabled=${this._seeking}
                                            @click=${this.#r}>
                                            ${this._seeking ? "⏳ Building sanctuary..." : "⛪ Seek Root Sanctuary"}
                                        </button>
                                    </div>
                                `}
                        `}
            </uui-box>
        `;
	}
};
z([j()], Z.prototype, "_result", void 0), z([j()], Z.prototype, "_loading", void 0), z([j()], Z.prototype, "_seeking", void 0), z([j()], Z.prototype, "_sanctuaryMessage", void 0), Z = z([A("sinners-root-content")], Z);
//#endregion
//#region src/penance/commandments/usync-audit.element.ts
var kt = "/umbraco/management/api/v1/sinners", At = class extends e(k) {
	constructor(...e) {
		super(...e), this._result = null, this._loading = !0;
	}
	#e;
	static {
		this.styles = l`
        .clean {
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--uui-color-positive-standalone, #0d7a54);
            font-weight: 600;
        }

        .error-block {
            padding: 16px;
        }

        .error-heading {
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 700;
            font-size: 14px;
            color: var(--uui-color-danger-standalone, #d42054);
            margin-bottom: 8px;
        }

        .error-body {
            font-size: 13px;
            color: var(--uui-color-text-alt, #666);
            line-height: 1.6;
        }

        .code {
            font-family: monospace;
            background: var(--uui-color-surface-emphasis, #e8e8e8);
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 12px;
        }

        .warn-block {
            padding: 16px;
            font-size: 13px;
            color: var(--uui-color-text-alt, #888);
        }

        .pretend-btn {
            margin: 16px;
        }

    `;
	}
	connectedCallback() {
		super.connectedCallback(), R.registerSteps("X", this, [{
			label: "Pretend to uSync ✨",
			run: () => this.#n()
		}]), this.consumeContext(n, (e) => {
			this.#e = e, this.#t();
		});
	}
	async #t() {
		this._loading = !0;
		try {
			let e = await this.#e?.getLatestToken(), t = await fetch(`${kt}/usync-audit`, { headers: e ? { Authorization: `Bearer ${e}` } : {} });
			t.ok && (this._result = await t.json());
			let n = this._result, r = n?.csprojFound && !n.hasUSync && !n.hasUmbracoDeploy ? 1 : 0;
			this.dispatchEvent(new CustomEvent("sinners-status", {
				bubbles: !0,
				composed: !0,
				detail: {
					issueCount: r,
					severity: r > 0 ? "error" : "ok"
				}
			}));
		} finally {
			this._loading = !1;
		}
	}
	async #n() {
		let e = await this.#e?.getLatestToken(), t = await fetch(`${kt}/inject-usync`, {
			method: "POST",
			headers: e ? { Authorization: `Bearer ${e}` } : {}
		});
		t.ok || console.warn(`[SINNERS] inject-usync answered ${t.status}`), await new Promise((e) => vt(e)), await this.#t(), M(10, "pretend-usync", !0);
	}
	render() {
		let e = this._result;
		return C`
            <uui-box headline="X — uSync when not on Umbraco Cloud">
                ${this._loading ? C`<uui-loader-bar></uui-loader-bar>` : e?.csprojFound ? e.hasUSync ? C`<div class="clean">✓ uSync is installed in <span class="code">${e.csprojName}</span> — thy schema walketh not alone.</div>` : e.hasUmbracoDeploy ? C`<div class="clean">✓ Umbraco.Deploy is installed in <span class="code">${e.csprojName}</span> — thy schema walketh not alone.</div>` : C`
                                <div class="error-block">
                                    <div class="error-heading">✕ No schema versioning tool is installed</div>
                                    <div class="error-body">
                                        <span class="code">${e.csprojName}</span> contains no reference to
                                        <span class="code">uSync</span> or <span class="code">Umbraco.Deploy</span>.
                                        Without either, thy Document Types and Data Types exist only in the database —
                                        unversioned, undeployable, and one migration away from perdition.<br><br>
                                        Install <span class="code">uSync</span> (open-source) or
                                        <span class="code">Umbraco.Deploy</span> (commercial) and commit thy
                                        schema files to source control to be absolved.
                                    </div>
                                </div>
                                <uui-button class="pretend-btn" look="secondary" @click=${() => void this.#n()}>
                                    ✨ Let's pretend we have uSync
                                </uui-button>
                            ` : C`<div class="warn-block">No .csproj file found at the content root — unable to inspect thy project.</div>`}
            </uui-box>
        `;
	}
};
z([j()], At.prototype, "_result", void 0), z([j()], At.prototype, "_loading", void 0), At = z([A("sinners-usync-audit")], At);
//#endregion
//#region src/penance/penance-dashboard.element.ts
var Q = [
	{
		id: "I",
		label: "I — Content is not composable",
		parts: ["I"]
	},
	{
		id: "II",
		label: "II — Four content types",
		parts: ["II"]
	},
	{
		id: "III",
		label: "III — The root is bare, a folder is only a folder",
		parts: [
			"III.data-types",
			"III.dictionary",
			"III.media"
		]
	},
	{
		id: "IV",
		label: "IV — Compose in thy IComposer, not Program.cs",
		parts: ["IV"]
	},
	{
		id: "V",
		label: "V — Production runs in production mode",
		parts: ["V"]
	},
	{
		id: "VI",
		label: "VI — Thy names",
		parts: ["VI.aliases", "VI.keys"]
	},
	{
		id: "VII",
		label: "VII — Views render; they don’t search",
		parts: ["VII"]
	},
	{
		id: "VIII",
		label: "VIII — Umbraco is not thy database",
		parts: ["VIII"]
	},
	{
		id: "IX",
		label: "IX — A root node is not a rendering node",
		parts: ["IX"]
	},
	{
		id: "X",
		label: "X — uSync when not on Umbraco Cloud",
		parts: ["X"]
	}
], jt = {
	ok: 0,
	warning: 1,
	error: 2
}, Mt = Q.flatMap((e) => e.parts), Nt = {
	0: "Righteous — thy backoffice is clean",
	1: "A whisper of darkness",
	2: "The shadows stir",
	3: "Candles flicker and die",
	4: "The walls bleed slightly",
	5: "Something ancient awakens",
	6: "The abyss gazes back",
	7: "Hell hath taken notice",
	8: "The damned rejoice",
	9: "All is lost",
	10: "THOU ART BEYOND ALL REDEMPTION"
}, $ = class extends e(k) {
	constructor(...e) {
		super(...e), this.#t = new URLSearchParams(window.location.search).has("debug"), this._activeTab = "I", this._statuses = /* @__PURE__ */ new Map(), this._spookyFactor = 0, this.#n = !1;
	}
	#e;
	#t;
	#n;
	static {
		this.styles = l`
        :host {
            display: block;
            padding: var(--uui-size-space-5, 24px);
            max-width: 1200px;
        }

        .hero {
            margin-bottom: var(--uui-size-space-5, 24px);
        }

        .hero h1 {
            font-size: 2rem;
            font-weight: 700;
            margin: 0 0 var(--uui-size-space-2, 8px) 0;
        }

        .hero p {
            margin: 0;
            color: var(--uui-color-text-alt, #8d8d8d);
        }

        .verdict {
            margin: 8px 0 0 0;
            font-size: 12px;
            font-style: italic;
            color: var(--uui-color-text-alt, #8d8d8d);
            letter-spacing: 0.02em;
        }

        .layout {
            display: flex;
            gap: 0;
            align-items: flex-start;
        }

        .tab-strip {
            display: flex;
            flex-direction: column;
            width: 260px;
            flex-shrink: 0;
            border-right: 2px solid var(--uui-color-border, #d8d7d9);
        }

        .tab-btn {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            padding: 12px 16px;
            border: none;
            border-left: 3px solid transparent;
            background: none;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
            color: var(--uui-color-text-alt, #888);
            text-align: left;
            transition: color 0.12s, border-color 0.12s, background 0.12s;
        }

        .tab-btn:hover {
            background: var(--uui-color-surface-alt, #fafafa);
            color: var(--uui-color-text, #333);
        }

        .tab-btn.active {
            color: var(--uui-color-interactive, #1b264f);
            border-left-color: var(--uui-color-selected, #3544b1);
            background: var(--uui-color-surface-alt, #fafafa);
            font-weight: 600;
        }

        .status-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 20px;
            height: 20px;
            padding: 0 5px;
            border-radius: 10px;
            font-size: 11px;
            font-weight: 700;
            flex-shrink: 0;
        }

        .status-badge.pending {
            background: var(--uui-color-border-standalone, #e0e0e0);
            width: 20px;
        }

        .status-badge.ok {
            background: var(--uui-color-positive-standalone, #0d7a54);
            color: white;
        }

        .status-badge.warning {
            background: #f0ac00;
            color: white;
        }

        .status-badge.error {
            background: var(--uui-color-danger-standalone, #d42054);
            color: white;
        }

        .tab-content {
            flex: 1;
            min-width: 0;
            padding-left: 24px;
        }

        .debug-strip {
            margin-top: 32px;
            padding: 14px 16px;
            border: 1px dashed var(--uui-color-border-standalone, #ccc);
            border-radius: 4px;
            background: var(--uui-color-surface-alt, #fafafa);
            font-size: 12px;
            color: var(--uui-color-text-alt, #888);
        }

        .debug-strip label {
            display: block;
            font-weight: 700;
            margin-bottom: 4px;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            font-size: 10px;
        }

        .debug-strip .spooky-label {
            font-size: 13px;
            font-style: italic;
            margin-bottom: 8px;
            color: var(--uui-color-text, #333);
        }

        .debug-strip input[type=range] {
            width: 100%;
        }

        .pane {
            flex-direction: column;
            gap: var(--uui-size-space-5, 24px);
        }
    `;
	}
	connectedCallback() {
		super.connectedCallback();
		let e = R.activeTab;
		e && Q.some((t) => t.id === e) && (this._activeTab = e, this.#n = !0), R.setActiveTab(this._activeTab), R.onNextTab(this, () => {
			this.#n = !0;
			let e = Q.map((e) => e.id), t = e[(e.indexOf(this._activeTab) + 1) % e.length];
			this._activeTab = t, R.setActiveTab(t);
		}), this.consumeContext(t, (e) => {
			this.#e = e, this.#o();
		}), Ye();
	}
	#r(e) {
		let t = e.parts.map((e) => this._statuses.get(e));
		if (t.some((e) => !e)) return;
		let n = t;
		return {
			issueCount: n.reduce((e, t) => e + t.issueCount, 0),
			severity: n.filter((e) => e.issueCount > 0).reduce((e, t) => jt[t.severity] > jt[e] ? t.severity : e, "ok")
		};
	}
	get #i() {
		return Q.filter((e) => (this.#r(e)?.issueCount ?? 0) > 0).length;
	}
	get #a() {
		return this._spookyFactor > 0 ? this._spookyFactor : this.#i;
	}
	#o() {
		let e = this.#a;
		this.#e?.setThemeByAlias(e > 0 ? Ke(e) : "umb-light-theme");
	}
	#s(e) {
		this._spookyFactor = +e.target.value, this.#o();
	}
	#c(e, t) {
		if (this._statuses = new Map(this._statuses).set(e, t), this._spookyFactor === 0 && this.#o(), !this.#n && Mt.every((e) => this._statuses.has(e))) {
			this.#n = !0;
			let e = Q.find((e) => (this.#r(e)?.issueCount ?? 0) > 0);
			e && (this._activeTab = e.id, R.setActiveTab(e.id));
		}
	}
	#l(e) {
		let t = this.#r(e);
		return t ? t.issueCount === 0 ? C`<span class="status-badge ok">✓</span>` : C`<span class="status-badge ${t.severity}">${t.issueCount}</span>` : C`<span class="status-badge pending"></span>`;
	}
	#u(e, t) {
		return C`<div class="pane" style="display:${this._activeTab === e ? "flex" : "none"}">${t}</div>`;
	}
	#d(e) {
		return (t) => this.#c(e, t.detail);
	}
	render() {
		return C`
            <div class="hero">
                <h1>Penance Board</h1>
                <p>Confess your sins. Audit your Umbraco installation against the Ten UmbraCommandments.</p>
                ${this._statuses.size > 0 ? C`<p class="verdict">${Nt[this.#a]}</p>` : T}
            </div>

            <div class="layout">
            <div class="tab-strip">
                ${Q.map((e) => C`
                    <button
                        class="tab-btn ${this._activeTab === e.id ? "active" : ""}"
                        @click=${() => {
			this.#n = !0, this._activeTab = e.id, R.setActiveTab(e.id);
		}}>
                        ${e.label}
                        ${this.#l(e)}
                    </button>
                `)}
            </div>

            <div class="tab-content">
                ${this.#u("I", C`
                    <sinners-content-not-composable @sinners-status=${this.#d("I")}></sinners-content-not-composable>`)}
                ${this.#u("II", C`
                    <sinners-four-sacred-types @sinners-status=${this.#d("II")}></sinners-four-sacred-types>`)}
                ${this.#u("III", C`
                    <sinners-data-types-in-folders @sinners-status=${this.#d("III.data-types")}></sinners-data-types-in-folders>
                    <sinners-translation-audit mode="grouping" @sinners-status=${this.#d("III.dictionary")}></sinners-translation-audit>
                    <sinners-root-media @sinners-status=${this.#d("III.media")}></sinners-root-media>`)}
                ${this.#u("IV", C`
                    <sinners-program-cs-clean @sinners-status=${this.#d("IV")}></sinners-program-cs-clean>`)}
                ${this.#u("V", C`
                    <sinners-production-settings @sinners-status=${this.#d("V")}></sinners-production-settings>`)}
                ${this.#u("VI", C`
                    <sinners-alias-audit @sinners-status=${this.#d("VI.aliases")}></sinners-alias-audit>
                    <sinners-translation-audit mode="naming" @sinners-status=${this.#d("VI.keys")}></sinners-translation-audit>`)}
                ${this.#u("VII", C`
                    <sinners-views-confession @sinners-status=${this.#d("VII")}></sinners-views-confession>`)}
                ${this.#u("VIII", C`
                    <sinners-exodus @sinners-status=${this.#d("VIII")}></sinners-exodus>`)}
                ${this.#u("IX", C`
                    <sinners-root-content @sinners-status=${this.#d("IX")}></sinners-root-content>`)}
                ${this.#u("X", C`
                    <sinners-usync-audit @sinners-status=${this.#d("X")}></sinners-usync-audit>`)}
            </div>
            </div>

            ${this.#t ? C`
                <div class="debug-strip">
                    <label>Debug — Spooky Factor Override (auto: ${this.#i})</label>
                    <div class="spooky-label">${this.#a} — ${Nt[this.#a]}</div>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        .value=${String(this._spookyFactor)}
                        @input=${this.#s}>
                </div>` : T}
        `;
	}
};
z([j()], $.prototype, "_activeTab", void 0), z([j()], $.prototype, "_statuses", void 0), z([j()], $.prototype, "_spookyFactor", void 0), $ = z([A("sinners-penance-dashboard")], $);
//#endregion
//#region src/index.ts
var Pt = [
	"̀",
	"́",
	"̂",
	"̃",
	"̅",
	"̈",
	"̊",
	"̋",
	"̌",
	"̓",
	"̽",
	"͂",
	"͊",
	"͋",
	"ͣ",
	"ͤ",
	"ͦ",
	"ͬ",
	"ͯ"
], Ft = [
	"̖",
	"̗",
	"̘",
	"̜",
	"̝",
	"̣",
	"̤",
	"̥",
	"̦",
	"̩",
	"̬",
	"̮",
	"̰",
	"̲",
	"̳",
	"͇",
	"͈",
	"͓",
	"͚"
];
function It(e) {
	return [...e].map((e, t) => {
		if (e === " ") return e;
		let n = t * 7 + e.charCodeAt(0) * 13, r = 3 + n % 3, i = e;
		for (let e = 0; e < r; e++) i += Pt[(n + e * 3) % Pt.length], i += Ft[(n + e * 5 + 2) % Ft.length];
		return i;
	}).join("");
}
var Lt = [{
	type: "dashboard",
	alias: "Sinners.PenanceDashboard",
	name: "Penance",
	element: $,
	weight: 100,
	meta: {
		label: It("Penance"),
		pathname: "penance"
	},
	conditions: [{
		alias: "Umb.Condition.SectionAlias",
		match: "Umb.Section.Settings"
	}]
}], Rt = new Set(["PageDown", "ArrowRight"]), zt = new Set([
	"PageUp",
	"ArrowLeft",
	"Escape"
]), Bt = new Set([
	"1",
	"2",
	"3",
	"4",
	"0"
]);
function Vt() {
	window.addEventListener("keydown", (e) => {
		document.documentElement.dataset.sinnersKeys !== "off" && (!Rt.has(e.key) && !zt.has(e.key) && e.key !== "." && !Bt.has(e.key) || (e.preventDefault(), e.stopPropagation(), !e.repeat && (console.log(`[CLICKER] key="${e.key}"`), Rt.has(e.key) ? R.forward() : e.key === "." || e.key === "3" ? R.dot() : e.key === "1" ? R.next() : e.key === "2" ? R.nextTab() : e.key === "4" ? window.location.reload() : e.key === "0" && R.reset())));
	}, !0);
}
var Ht = (e, t) => {
	t.registerMany(Lt), qe(t), Vt();
};
//#endregion
export { Ht as onInit };

//# sourceMappingURL=dist.js.map