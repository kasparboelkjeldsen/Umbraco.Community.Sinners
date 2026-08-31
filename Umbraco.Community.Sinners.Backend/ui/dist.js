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
var de = globalThis, fe = (e) => e, g = de.trustedTypes, pe = g ? g.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, me = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, he = "?" + _, ge = `<${he}>`, v = document, y = () => v.createComment(""), b = (e) => e === null || typeof e != "object" && typeof e != "function", x = Array.isArray, _e = (e) => x(e) || typeof e?.[Symbol.iterator] == "function", S = "[ 	\n\f\r]", C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ve = /-->/g, ye = />/g, w = RegExp(`>|${S}(?:([^\\s"'>=/]+)(${S}*=${S}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), be = /'/g, xe = /"/g, Se = /^(?:script|style|textarea|title)$/i, T = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), E = Symbol.for("lit-noChange"), D = Symbol.for("lit-nothing"), Ce = /* @__PURE__ */ new WeakMap(), O = v.createTreeWalker(v, 129);
function we(e, t) {
	if (!x(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return pe === void 0 ? t : pe.createHTML(t);
}
var Te = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = C;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === C ? c[1] === "!--" ? o = ve : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = w) : (Se.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = w) : o = ye : o === w ? c[0] === ">" ? (o = i ?? C, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? w : c[3] === "\"" ? xe : be) : o === xe || o === be ? o = w : o === ve || o === ye ? o = C : (o = w, i = void 0);
		let d = o === w && e[t + 1].startsWith("/>") ? " " : "";
		a += o === C ? n + ge : l >= 0 ? (r.push(s), n.slice(0, l) + me + n.slice(l) + _ + d) : n + _ + (l === -2 ? t : d);
	}
	return [we(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, k = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = Te(t, n);
		if (this.el = e.createElement(l, r), O.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = O.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(me)) {
					let t = u[o++], n = i.getAttribute(e).split(_), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? De : r[1] === "?" ? Oe : r[1] === "@" ? ke : M
					}), i.removeAttribute(e);
				} else e.startsWith(_) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (Se.test(i.tagName)) {
					let e = i.textContent.split(_), t = e.length - 1;
					if (t > 0) {
						i.textContent = g ? g.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], y()), O.nextNode(), c.push({
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
function A(e, t, n = e, r) {
	if (t === E) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = b(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = A(e, i._$AS(e, t.values), i, r)), t;
}
var Ee = class {
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
		O.currentNode = r;
		let i = O.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new j(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Ae(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = O.nextNode(), a++);
		}
		return O.currentNode = v, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, j = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = D, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
		e = A(this, e, t), b(e) ? e === D || e == null || e === "" ? (this._$AH !== D && this._$AR(), this._$AH = D) : e !== this._$AH && e !== E && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? _e(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== D && b(this._$AH) ? this._$AA.nextSibling.data = e : this.T(v.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = k.createElement(we(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new Ee(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = Ce.get(e.strings);
		return t === void 0 && Ce.set(e.strings, t = new k(e)), t;
	}
	k(t) {
		x(this._$AH) || (this._$AH = [], this._$AR());
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
}, M = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = D, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = D;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = A(this, e, t, 0), a = !b(e) || e !== this._$AH && e !== E, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = A(this, r[n + o], t, o), s === E && (s = this._$AH[o]), a ||= !b(s) || s !== this._$AH[o], s === D ? e = D : e !== D && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === D ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, De = class extends M {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === D ? void 0 : e;
	}
}, Oe = class extends M {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== D);
	}
}, ke = class extends M {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = A(this, e, t, 0) ?? D) === E) return;
		let n = this._$AH, r = e === D && n !== D || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== D && (n === D || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Ae = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		A(this, e);
	}
}, je = de.litHtmlPolyfillSupport;
je?.(k, j), (de.litHtmlVersions ??= []).push("3.3.2");
var Me = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new j(t.insertBefore(y(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, N = globalThis, P = class extends h {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Me(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return E;
	}
};
P._$litElement$ = !0, P.finalized = !0, N.litElementHydrateSupport?.({ LitElement: P });
var Ne = N.litElementPolyfillSupport;
Ne?.({ LitElement: P }), (N.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/@lit/reactive-element/decorators/custom-element.js
var F = (e) => (t, n) => {
	n === void 0 ? customElements.define(e, t) : n.addInitializer(() => {
		customElements.define(e, t);
	});
}, Pe = {
	attribute: !0,
	type: String,
	converter: m,
	reflect: !1,
	hasChanged: le
}, Fe = (e = Pe, t, n) => {
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
function Ie(e) {
	return (t, n) => typeof n == "object" ? Fe(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/state.js
function I(e) {
	return Ie({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region src/penance/spooky-themes.ts
function Le(e, t, n) {
	if (e.length !== 7 || t.length !== 7) return e;
	let r = parseInt(e.slice(1, 3), 16), i = parseInt(e.slice(3, 5), 16), a = parseInt(e.slice(5, 7), 16), o = parseInt(t.slice(1, 3), 16), s = parseInt(t.slice(3, 5), 16), c = parseInt(t.slice(5, 7), 16);
	return `#${Math.round(r + (o - r) * n).toString(16).padStart(2, "0")}${Math.round(i + (s - i) * n).toString(16).padStart(2, "0")}${Math.round(a + (c - a) * n).toString(16).padStart(2, "0")}`;
}
var Re = {
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
}, ze = {
	"--uui-color-selected": "#8b1a1a",
	"--uui-color-selected-emphasis": "#a52020",
	"--uui-color-selected-standalone": "#c84040",
	"--uui-color-selected-contrast": "#f0e8e8",
	"--uui-color-current": "#8b1a1a",
	"--uui-color-current-emphasis": "#a52020",
	"--uui-color-current-standalone": "#c84040",
	"--uui-color-current-contrast": "#f0e8e8",
	"--uui-color-disabled": "#2e1a1a",
	"--uui-color-disabled-standalone": "#3e2a2a",
	"--uui-color-disabled-contrast": "#fcfcfc4d",
	"--uui-color-header-surface": "#0d0606",
	"--uui-color-header-contrast": "#c8b8b8",
	"--uui-color-header-contrast-emphasis": "#e8d8d8",
	"--uui-color-focus": "#8b1a1a",
	"--uui-color-surface": "#1c0c0c",
	"--uui-color-surface-alt": "#251414",
	"--uui-color-surface-emphasis": "#200f0f",
	"--uui-color-background": "#110808",
	"--uui-color-text": "#e0d0d0",
	"--uui-color-text-alt": "#a89090",
	"--uui-color-interactive": "#e0d0d0",
	"--uui-color-interactive-emphasis": "#f0e0e0",
	"--uui-color-border": "#3a1a1a",
	"--uui-color-border-standalone": "#4e2828",
	"--uui-color-border-emphasis": "#623a3a",
	"--uui-color-divider": "#1e1010",
	"--uui-color-divider-standalone": "#3a1a1a",
	"--uui-color-divider-emphasis": "#4e2828",
	"--uui-color-default": "#8b1a1a",
	"--uui-color-default-emphasis": "#a02020",
	"--uui-color-default-standalone": "#e0d0d0",
	"--uui-color-default-contrast": "#f0e0e0",
	"--uui-color-warning": "#8f5000",
	"--uui-color-warning-emphasis": "#a06000",
	"--uui-color-warning-standalone": "#c07000",
	"--uui-color-warning-contrast": "#f0e0e0",
	"--uui-color-danger": "#cc1a1a",
	"--uui-color-danger-emphasis": "#dd2222",
	"--uui-color-danger-standalone": "#ee4444",
	"--uui-color-danger-contrast": "#f0e0e0",
	"--uui-color-positive": "#1a5220",
	"--uui-color-positive-emphasis": "#1f6226",
	"--uui-color-positive-standalone": "#2d8c36",
	"--uui-color-positive-contrast": "#f0e0e0"
};
function Be(e) {
	let t = (e - 1) / 9, n = Object.keys(Re).map((e) => `    ${e}: ${Le(Re[e], ze[e], t)};`);
	return n.push("    --uui-color-scheme: dark;"), n.push("    --sinners-action-btn-bg: #e64241;"), n.push("    --sinners-action-btn-color: #ffffff;"), `:root {\n${n.join("\n")}\n}`;
}
var Ve = (e) => `sinners-spooky-${e}`;
function He(e) {
	for (let t = 1; t <= 10; t++) {
		let n = Be(t);
		e.register({
			type: "theme",
			alias: Ve(t),
			name: `☠ Sinners: Abyss (Level ${t})`,
			css: () => Promise.resolve({ default: n }),
			weight: 50 - t
		});
	}
}
//#endregion
//#region src/penance/presenter.ts
var Ue = /* @__PURE__ */ new Map(), L = /* @__PURE__ */ new Map(), R = "", We = null, Ge = "/umbraco/section/settings/dashboard/penance", Ke = {
	I: "/umbraco/section/content/workspace/document/edit/704a66de-b213-44fe-815a-f988c0707bbf/invariant/view/info/modal/umb-modal-workspace/invariant/general/document-type/edit/b871f83c-2395-4894-be0f-5422c1a71e48/tab/content",
	II: "/umbraco/section/settings/workspace/document-type/edit/a95360e8-ff04-40b1-8f46-7aa4b5983096/tab/content",
	III: "/umbraco/section/settings/workspace/data-type/edit/b5922818-d8d8-43df-88ed-4582a24c0fa6",
	VII: "/umbraco/section/translation",
	VIII: "/umbraco/section/media/collection",
	IX: "/umbraco/section/content"
}, qe = [{
	match: "/umbraco/section/content",
	target: "/umbraco/section/settings"
}], z = {
	setActiveTab(e) {
		R = e;
	},
	dot() {
		let e = window.location.pathname;
		if (e.includes("/dashboard/penance")) {
			let e = Ke[R] ?? Ge;
			console.log(`[PRESENTER] dot() on penance tab="${R}" → ${e}`), window.location.href = e;
			return;
		}
		let t = qe.find((t) => e === t.match), n = t ? t.target : Ge;
		console.log(`[PRESENTER] dot() elsewhere path="${e}" → ${n}`), window.location.href = n;
	},
	onNextTab(e) {
		We = e;
	},
	nextTab() {
		console.log("[PRESENTER] nextTab()"), We?.();
	},
	registerSteps(e, t) {
		Ue.set(e, t), L.set(e, 0);
	},
	async next() {
		let e = Ue.get(R) ?? [], t = L.get(R) ?? 0;
		if (console.log(`[PRESENTER] next() — tab="${R}" step=${t + 1}/${e.length}`), t >= e.length) {
			console.log(`[PRESENTER] no more steps on tab "${R}"`);
			return;
		}
		await e[t](), L.set(R, t + 1), console.log(`[PRESENTER] step ${t + 1} done`);
	}
};
//#endregion
//#region \0@oxc-project+runtime@0.128.0/helpers/decorate.js
function B(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region src/penance/commandments/content-not-composable.element.ts
var V = "/umbraco/management/api/v1/sinners", Je = {
	"Umbraco.BlockList": "Block List",
	"Umbraco.BlockGrid": "Block Grid",
	"Umbraco.RichText": "Rich Text"
}, H = class extends e(P) {
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
		super.connectedCallback(), z.registerSteps("I", [
			() => this.#r("contentRows"),
			() => this.#r("socialIconLinks"),
			() => this.#i("instructionMessage"),
			() => this.#i("successMessage"),
			() => this.#i("errorMessage")
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
			let [e, t] = await Promise.all([this.#t(`${V}/sinful-compositions`), this.#t(`${V}/empty-compositions`)]);
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
			let r = await (await this.#t(`${V}/fold-in`, {
				method: "POST",
				body: JSON.stringify({
					compositionAlias: e.contentTypeAlias,
					propertyAlias: t.propertyAlias
				})
			})).json();
			this._lastResult = {
				key: n,
				result: r
			}, r.success && await this.#n();
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
				let r = await (await this.#t(`${V}/fold-in`, {
					method: "POST",
					body: JSON.stringify({
						compositionAlias: e.contentTypeAlias,
						propertyAlias: t.propertyAlias
					})
				})).json();
				this._lastResult = {
					key: n,
					result: r
				}, r.success && await this.#n();
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
				await this.#t(`${V}/empty-compositions/${encodeURIComponent(e.contentTypeAlias)}`, { method: "DELETE" }), await this.#n();
			} finally {
				this._deleting = new Set([...this._deleting].filter((t) => t !== e.contentTypeAlias));
			}
		}
	}
	async #c(e, t, n) {
		let r = `${e.contentTypeAlias}:${t.propertyAlias}`;
		this._blessing = new Set([...this._blessing, r]);
		try {
			await this.#t(`${V}/bless`, {
				method: "POST",
				body: JSON.stringify({
					compositionAlias: e.contentTypeAlias,
					propertyAlias: t.propertyAlias,
					blessed: n
				})
			}), await this.#n();
		} finally {
			this._blessing = new Set([...this._blessing].filter((e) => e !== r));
		}
	}
	#l(e) {
		return T`
            <div class="composition-row">
                <div class="name-block">
                    <span class="name">${e.contentTypeName}</span>
                    <span class="path">${e.folderPath}</span>
                    <div class="props">
                        ${e.sinfulProperties.map((t) => {
			let n = `${e.contentTypeAlias}:${t.propertyAlias}`, r = this._folding.has(n), i = this._blessing.has(n);
			return T`
                                <span class="prop-chip ${t.isBlessed ? "blessed" : ""}">
                                    ${Je[t.editorAlias] ?? t.editorAlias}
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
		return this._emptyItems.length === 0 ? D : T`
            <div class="section-divider">Empty compositions</div>
            ${this._emptyItems.map((e) => T`
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
		return T`
            <uui-box headline="I — Content is not composable">
                ${e ? T`
                          <div class="result-banner ${e.result.success ? "success" : "error"}">
                              ${e.result.message}
                          </div>
                      ` : D}
                ${this._loading ? T`<uui-loader-bar></uui-loader-bar>` : T`
                          ${this._items.length === 0 ? T`<div class="clean">✓ No compositions expose block lists, block grids, or rich text editors.</div>` : T`${this._items.map((e) => this.#l(e))}`}
                          ${this.#u()}
                      `}
            </uui-box>
        `;
	}
};
B([I()], H.prototype, "_items", void 0), B([I()], H.prototype, "_emptyItems", void 0), B([I()], H.prototype, "_loading", void 0), B([I()], H.prototype, "_folding", void 0), B([I()], H.prototype, "_blessing", void 0), B([I()], H.prototype, "_deleting", void 0), B([I()], H.prototype, "_lastResult", void 0), H = B([F("sinners-content-not-composable")], H);
//#endregion
//#region src/penance/commandments/six-sacred-types.element.ts
var Ye = [
	"Page",
	"Block",
	"Data",
	"Composition",
	"Repository",
	"RepositoryItem"
], Xe = "/umbraco/management/api/v1/sinners", U = class extends e(P) {
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
		super.connectedCallback(), z.registerSteps("II", [
			() => this.#a(),
			() => this.#s(),
			() => this.#o()
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
			let e = await this.#t(`${Xe}/content-type-classifications`);
			e.ok && (this._items = await e.json());
			let t = this._items.filter((e) => !e.classification).length;
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
	#r(e, t) {
		let n = new Map(this._pendingChanges);
		t ? n.set(e, t) : n.delete(e), this._pendingChanges = n;
	}
	#i(e, t) {
		let n = new Map(this._pendingChanges);
		n.set(e, t), this._pendingChanges = n;
	}
	#a() {
		let e = new Map(this._pendingChanges);
		for (let t of this._items) if (!t.classification && !e.has(t.contentTypeAlias)) if (t.suggestedClassification) e.set(t.contentTypeAlias, t.suggestedClassification), console.log(`[RULE II] suggestion → ${t.contentTypeAlias} = ${t.suggestedClassification}`);
		else {
			let n = t.folderPath ?? "";
			n.startsWith("/Elements/Setting") ? (e.set(t.contentTypeAlias, "Data"), console.log(`[RULE II] path rule (Data) → ${t.contentTypeAlias} (${n})`)) : n.startsWith("/Elements/") ? (e.set(t.contentTypeAlias, "Block"), console.log(`[RULE II] path rule (Block) → ${t.contentTypeAlias} (${n})`)) : console.warn(`[RULE II] no rule matched — ${t.contentTypeAlias} (${n}) left unclassified`);
		}
		this._pendingChanges = e, console.log(`[RULE II] autofill complete — ${e.size} pending`);
	}
	async #o() {
		this._categorizing = !0;
		try {
			(await this.#t(`${Xe}/auto-categorize`, { method: "POST" })).ok && await this.#n();
		} finally {
			this._categorizing = !1;
		}
	}
	async #s() {
		if (this._pendingChanges.size !== 0) {
			this._saving = !0;
			try {
				for (let [e, t] of this._pendingChanges) if ((await this.#t(`${Xe}/content-type-classifications`, {
					method: "POST",
					body: JSON.stringify({
						contentTypeAlias: e,
						classification: t
					})
				})).ok) {
					this._items = this._items.map((n) => n.contentTypeAlias === e ? {
						...n,
						classification: t,
						suggestedClassification: null
					} : n);
					let n = new Map(this._pendingChanges);
					n.delete(e), this._pendingChanges = n;
				}
			} finally {
				this._saving = !1;
			}
		}
	}
	#c(e) {
		return this._pendingChanges.get(e.contentTypeAlias) ?? e.classification ?? "";
	}
	#l(e) {
		let t = this.#c(e), n = this._pendingChanges.has(e.contentTypeAlias);
		return T`
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
                        @change=${(t) => this.#r(e.contentTypeAlias, t.target.value)}
                    >
                        <option value="">— Unclassified —</option>
                        ${Ye.map((e) => T`<option value=${e} ?selected=${t === e}>${e}</option>`)}
                    </select>
                    ${e.suggestedClassification && !n ? T`<span
                              class="suggestion"
                              @click=${() => this.#i(e.contentTypeAlias, e.suggestedClassification)}
                              >Suggest: ${e.suggestedClassification}</span
                          >` : D}
                </div>
            </div>
        `;
	}
	#u(e, t, n = !1) {
		return t.length === 0 ? D : T`
            <details ?open=${n}>
                <summary>
                    <span class=${e === "Unclassified" ? "sinful-label" : ""}>${e}</span>
                    <span class="group-count">${t.length}</span>
                </summary>
                ${t.map((e) => this.#l(e))}
            </details>
        `;
	}
	render() {
		let e = this._items.filter((e) => !e.classification), t = (e) => this._items.filter((t) => t.classification === e), n = e.length;
		return T`
            <uui-box headline="II — The Six Sacred Types">
                ${this._loading ? T`<uui-loader-bar></uui-loader-bar>` : this._items.length === 0 ? T`<div class="empty">No content types found.</div>` : T`
                            <div class="stats">
                                <uui-button
                                    look="outline"
                                    .disabled=${this._categorizing}
                                    @click=${() => void this.#o()}
                                >
                                    ${this._categorizing ? "Categorizing…" : "Auto Categorize"}
                                </uui-button>
                                ${n > 0 ? T`<span class="stat-chip sinful">⚠ ${n} unclassified</span>` : T`<span class="stat-chip clean">✓ All classified</span>`}
                                ${Ye.map((e) => {
			let n = t(e).length;
			return n > 0 ? T`<span class="stat-chip">${e}: ${n}</span>` : D;
		})}
                            </div>

                            ${this.#u("Unclassified", e, !0)}
                            ${Ye.map((e) => this.#u(e, t(e)))}
                            <div class="save-bar">
                                <uui-button
                                    look="primary"
                                    .disabled=${this._pendingChanges.size === 0 || this._saving}
                                    @click=${() => void this.#s()}
                                >
                                    ${this._saving ? "Saving…" : "Save"}
                                </uui-button>
                            </div>
                        `}
            </uui-box>
        `;
	}
};
B([I()], U.prototype, "_items", void 0), B([I()], U.prototype, "_loading", void 0), B([I()], U.prototype, "_saving", void 0), B([I()], U.prototype, "_categorizing", void 0), B([I()], U.prototype, "_pendingChanges", void 0), U = B([F("sinners-six-sacred-types")], U);
//#endregion
//#region src/penance/commandments/data-types-in-folders.element.ts
var Ze = "/umbraco/management/api/v1/sinners", W = class extends e(P) {
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
		super.connectedCallback(), z.registerSteps("III", [() => this.#r()]), this.consumeContext(n, (e) => {
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
			let e = await this.#t(`${Ze}/unorganized-data-types`);
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
			let e = await this.#t(`${Ze}/organize-data-types`, { method: "POST" });
			if (e.ok) {
				let t = await e.json();
				this._lastMessage = {
					success: !0,
					text: `Organized ${t.organizedCount} data type(s) into folders.`
				}, await this.#n();
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
		return T`
            <uui-box headline="III — Data types live in folders">
                ${e ? T`<div class="result-banner ${e.success ? "success" : "error"}">${e.text}</div>` : D}
                ${this._loading ? T`<uui-loader-bar></uui-loader-bar>` : this._items.length === 0 ? T`<div class="clean">✓ All data types are in folders.</div>` : T`
                            <div class="toolbar">
                                <span class="count">${this._items.length} data type(s) need organizing</span>
                                <button
                                    class="organize-btn"
                                    ?disabled=${this._organizing}
                                    @click=${this.#r}>
                                    ${this._organizing ? "⏳ Organizing…" : "⊞ Organize All"}
                                </button>
                            </div>
                            ${[...this.#i().entries()].map(([e, t]) => T`
                                <div class="folder-group">
                                    <div class="folder-header">${e}</div>
                                    ${t.map((e) => T`
                                        <div class="dt-row">
                                            <span class="dt-name">${e.name}</span>
                                            ${e.isBuiltIn ? T`<span class="built-in-badge">built-in</span>` : D}
                                        </div>
                                    `)}
                                </div>
                            `)}
                        `}
            </uui-box>
        `;
	}
};
B([I()], W.prototype, "_items", void 0), B([I()], W.prototype, "_loading", void 0), B([I()], W.prototype, "_organizing", void 0), B([I()], W.prototype, "_lastMessage", void 0), W = B([F("sinners-data-types-in-folders")], W);
//#endregion
//#region src/penance/magic.ts
var Qe = !1;
function $e() {
	if (Qe) return;
	let e = document.createElement("style");
	e.textContent = "\n        @keyframes sinners-magic-fade {\n            0%   { opacity: 0; }\n            20%  { opacity: 1; }\n            80%  { opacity: 1; }\n            100% { opacity: 0; }\n        }\n        .sinners-magic-overlay {\n            position: fixed !important;\n            top: 0 !important;\n            left: 0 !important;\n            width: 100vw !important;\n            height: 100vh !important;\n            z-index: 2147483647 !important;\n            background: rgba(0, 0, 0, 0.85) !important;\n            display: flex !important;\n            align-items: center !important;\n            justify-content: center !important;\n            pointer-events: none !important;\n            animation: sinners-magic-fade 1.8s ease forwards !important;\n        }\n        .sinners-magic-word {\n            font-size: 96px !important;\n            font-weight: 900 !important;\n            font-style: italic !important;\n            background: linear-gradient(90deg, #ff6b35, #f7c59f, #efefd0, #00b4d8, #9b5de5) !important;\n            -webkit-background-clip: text !important;\n            -webkit-text-fill-color: transparent !important;\n            background-clip: text !important;\n            white-space: nowrap !important;\n        }\n    ", document.head.appendChild(e), Qe = !0;
}
function et(e) {
	$e();
	let t = document.createElement("div");
	t.className = "sinners-magic-overlay";
	let n = document.createElement("span");
	n.className = "sinners-magic-word", n.textContent = "✨ Magic ✨", t.appendChild(n), document.documentElement.appendChild(t), setTimeout(() => {
		t.remove(), e();
	}, 1800);
}
//#endregion
//#region src/penance/commandments/program-cs-clean.element.ts
var tt = "/umbraco/management/api/v1/sinners", nt = "var i̸̖l̷̼l̴̮i̵̗g̸̫a̷̮l̶̼ = app.UseUmbraco();\n\ni̸̖l̷̼l̴̮i̵̗g̸̫a̷̮l̶̼.WithMiddleware(u =>\n    {\n        u.UseBackOffice();\n        u.UseWebsite();\n    })\n    .WithEndpoints(u =>\n    {\n        u.UseBackOfficeEndpoints();\n        u.UseWebsiteEndpoints();\n    });", rt = "app.UseUmbraco()\n    .WithMiddleware(u =>\n    {\n        u.UseBackOffice();\n        u.UseWebsite();\n    })\n    .WithEndpoints(u =>\n    {\n        u.UseBackOfficeEndpoints();\n        u.UseWebsiteEndpoints();\n    });\n\nawait app.RunAsync();", G = class extends e(P) {
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
		super.connectedCallback(), z.registerSteps("IV", [() => this.#n()]), this.consumeContext(n, (e) => {
			this.#e = e, this.#t();
		});
	}
	async #t() {
		this._loading = !0;
		try {
			let e = await this.#e?.getLatestToken(), t = await fetch(`${tt}/program-cs-audit`, { headers: e ? { Authorization: `Bearer ${e}` } : {} });
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
		await fetch(`${tt}/fix-program-cs`, {
			method: "POST",
			headers: e ? { Authorization: `Bearer ${e}` } : {}
		}), et(() => void this.#t());
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
		return T`
            ${e.useUmbracoSavedToVariable ? T`
                <div class="diff-block">
                    <div class="diff-side">
                        <div class="diff-label before">Before — thy sin</div>
                        <pre class="before">${nt}</pre>
                    </div>
                    <div class="diff-arrow">→</div>
                    <div class="diff-side">
                        <div class="diff-label after">After — absolved</div>
                        <pre class="after">${rt}</pre>
                    </div>
                </div>
                <uui-button class="fix-btn" look="secondary" @click=${() => void this.#n()}>
                    ✨ Apply the fix
                </uui-button>
            ` : ""}
            ${t.length > 0 ? T`
                <div class="issue-list">
                    ${t.map((e) => T`
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
		return T`
            <uui-box headline="IV — Program.cs is clean">
                ${this._loading ? T`<uui-loader-bar></uui-loader-bar>` : !e || !e.found ? T`<div class="not-found">Program.cs not found at the application root.</div>` : e.isClean ? T`<div class="clean">✓ Program.cs looks clean.</div>` : this.#r(e)}
            </uui-box>
        `;
	}
};
B([I()], G.prototype, "_result", void 0), B([I()], G.prototype, "_loading", void 0), G = B([F("sinners-program-cs-clean")], G);
//#endregion
//#region src/penance/commandments/production-settings.element.ts
var it = "/umbraco/management/api/v1/sinners", K = class extends e(P) {
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
		super.connectedCallback(), z.registerSteps("V", [
			0,
			1,
			2,
			3,
			4
		].map((e) => () => this.#t(e))), this.consumeContext(n, (e) => {
			this.#e = e, this.#r();
		});
	}
	async #t(e) {
		let t = (this._result?.missingSettings ?? []).filter((e) => !e.isBlessed)[0];
		if (!t) {
			console.warn(`[RULE V] no unblessed setting at index ${e}`);
			return;
		}
		console.log(`[RULE V] blessing "${t.key}"`), await this.#i(t, !0);
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
			let e = await this.#n(`${it}/production-readiness`);
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
			await this.#n(`${it}/bless-production-setting`, {
				method: "POST",
				body: JSON.stringify({
					settingKey: e.key,
					blessed: t
				})
			}), await this.#r();
		} finally {
			this._blessing = new Set([...this._blessing].filter((t) => t !== e.key));
		}
	}
	render() {
		let e = this._result, t = e ? T`<div class="scanned">Scanned: ${e.scannedFiles.join(", ")}</div>` : null;
		return T`
            <uui-box headline="V — Live environment is production-ready">
                ${this._loading ? T`<uui-loader-bar></uui-loader-bar>` : e ? e.isReady ? T`
                              <div class="clean">✓ Production settings found across your appsettings files.</div>
                              ${t}
                          ` : T`
                              <div class="warning-header">⚠ You better have a pipeline somewhere that sets these</div>
                              <div class="warning-sub">
                                  Scanned ${e.scannedFiles.join(", ")} — the following production settings were not found
                                  with valid values in any of them.
                              </div>
                              ${e.missingSettings.map((e) => {
			let t = this._blessing.has(e.key);
			return T`
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
B([I()], K.prototype, "_result", void 0), B([I()], K.prototype, "_loading", void 0), B([I()], K.prototype, "_blessing", void 0), K = B([F("sinners-production-settings")], K);
//#endregion
//#region src/penance/commandments/alias-audit.element.ts
var at = "/umbraco/management/api/v1/sinners", q = class extends e(P) {
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
		super.connectedCallback(), z.registerSteps("VI", [() => {
			let e = this._items.find((e) => !e.isBlessed);
			if (e) return this.#r(e, !0);
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
			let e = await this.#t(`${at}/alias-issues`);
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
			await this.#t(`${at}/bless-alias`, {
				method: "POST",
				body: JSON.stringify({
					contentTypeAlias: e.contentTypeAlias,
					blessed: t
				})
			}), await this.#n();
		} finally {
			this._blessing = new Set([...this._blessing].filter((t) => t !== e.contentTypeAlias));
		}
	}
	#i(e) {
		let t = this._blessing.has(e.contentTypeAlias);
		return T`
            <div class="issue-row ${e.isBlessed ? "blessed" : ""}">
                <div class="name-block">
                    <span class="name">${e.contentTypeName}</span>
                    <span class="alias">${e.contentTypeAlias}</span>
                    <span class="path">${e.folderPath}</span>
                    <div class="tags">
                        ${e.isCamelCase ? D : T`<span class="tag error">✕ Not camelCase</span>`}
                        ${e.unrecognizedWords.map((e) => T`
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
		return T`
            <uui-box headline="VI — Document type aliases are camelCase English">
                ${this._loading ? T`<uui-loader-bar></uui-loader-bar>` : this._items.length === 0 ? T`<div class="clean">✓ All document type aliases are valid camelCase English.</div>` : T`${this._items.map((e) => this.#i(e))}`}
            </uui-box>
        `;
	}
};
B([I()], q.prototype, "_items", void 0), B([I()], q.prototype, "_loading", void 0), B([I()], q.prototype, "_blessing", void 0), q = B([F("sinners-alias-audit")], q);
//#endregion
//#region src/penance/commandments/translation-audit.element.ts
var ot = "/umbraco/management/api/v1/sinners", J = class extends e(P) {
	constructor(...e) {
		super(...e), this._result = null, this._loading = !0, this._blessing = /* @__PURE__ */ new Set(), this._grouping = /* @__PURE__ */ new Set();
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
		super.connectedCallback(), z.registerSteps("VII", [
			0,
			1,
			2,
			3,
			4,
			5
		].map(() => () => {
			let e = this._result?.groupSuggestions[0];
			if (e) return this.#i(e);
		})), this.consumeContext(n, (e) => {
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
			let e = await this.#t(`${ot}/translation-audit`);
			e.ok && (this._result = await e.json());
			let t = this._result, n = t?.issues.filter((e) => !e.isBlessed && !e.isPascalCase).length ?? 0, r = t?.issues.filter((e) => !e.isBlessed && e.isPascalCase && e.unrecognizedWords.length > 0).length ?? 0, i = t?.groupSuggestions.length ?? 0, a = n + r + i, o = n > 0 ? "error" : a > 0 ? "warning" : "ok";
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
			await this.#t(`${ot}/bless-translation`, {
				method: "POST",
				body: JSON.stringify({
					itemKey: e.itemKey,
					blessed: t
				})
			}), await this.#n();
		} finally {
			this._blessing = new Set([...this._blessing].filter((t) => t !== e.itemKey));
		}
	}
	async #i(e) {
		this._grouping = new Set([...this._grouping, e.proposedParentKey]);
		try {
			await this.#t(`${ot}/create-translation-group`, {
				method: "POST",
				body: JSON.stringify({
					parentKey: e.proposedParentKey,
					childIds: e.children.map((e) => e.id)
				})
			}), await this.#n();
		} finally {
			this._grouping = new Set([...this._grouping].filter((t) => t !== e.proposedParentKey));
		}
	}
	#a(e) {
		return e.length === 0 ? D : T`
            ${e.map((e) => {
			let t = this._blessing.has(e.itemKey);
			return T`
                    <div class="issue-row ${e.isBlessed ? "blessed" : ""}">
                        <div>
                            <span class="key">${e.itemKey}</span>
                            <div class="tags">
                                ${e.isPascalCase ? D : T`<span class="tag error">✕ Not PascalCase</span>`}
                                ${e.unrecognizedWords.map((e) => T`
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
	#o(e) {
		return e.length === 0 ? D : T`
            <div class="section-divider">Ungrouped keys</div>
            ${e.map((e) => {
			let t = this._grouping.has(e.proposedParentKey);
			return T`
                    <div class="group-row">
                        <div>
                            <span class="proposed-parent">${e.proposedParentKey}</span>
                            <div class="group-children">
                                ${e.children.map((e) => T`<span class="child-chip">${e.itemKey}</span>`)}
                            </div>
                        </div>
                        <button
                            class="group-btn"
                            ?disabled=${t}
                            @click=${() => this.#i(e)}
                            title="Create '${e.proposedParentKey}' as a parent and nest these keys under it">
                            ${t ? "⏳" : "⊞ Group"}
                        </button>
                    </div>
                `;
		})}
        `;
	}
	render() {
		let e = this._result, t = (e?.issues.length ?? 0) > 0, n = (e?.groupSuggestions.length ?? 0) > 0;
		return T`
            <uui-box headline="VII — Translation keys are PascalCase English">
                ${this._loading ? T`<uui-loader-bar></uui-loader-bar>` : !t && !n ? T`<div class="clean">✓ All translation keys are valid camelCase English with no grouping suggestions.</div>` : T`
                            ${e ? this.#a(e.issues) : D}
                            ${e ? this.#o(e.groupSuggestions) : D}
                        `}
            </uui-box>
        `;
	}
};
B([I()], J.prototype, "_result", void 0), B([I()], J.prototype, "_loading", void 0), B([I()], J.prototype, "_blessing", void 0), B([I()], J.prototype, "_grouping", void 0), J = B([F("sinners-translation-audit")], J);
//#endregion
//#region src/penance/commandments/root-media.element.ts
var st = "/umbraco/management/api/v1/sinners", Y = class extends e(P) {
	constructor(...e) {
		super(...e), this._items = [], this._loading = !0, this._pretending = localStorage.getItem("sinners-media-pretend") === "1";
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
		super.connectedCallback(), z.registerSteps("VIII", [() => this.#n()]), this.consumeContext(n, (e) => {
			this.#e = e, this.#t();
		});
	}
	async #t() {
		this._loading = !0;
		try {
			let e = await this.#e?.getLatestToken(), t = await fetch(`${st}/root-media`, { headers: e ? { Authorization: `Bearer ${e}` } : {} });
			t.ok && (this._items = await t.json());
			let n = this._pretending ? 0 : this._items.length;
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
	#n() {
		et(() => {
			this._pretending = !0, localStorage.setItem("sinners-media-pretend", "1"), this.dispatchEvent(new CustomEvent("sinners-status", {
				bubbles: !0,
				composed: !0,
				detail: {
					issueCount: 0,
					severity: "ok"
				}
			}));
		});
	}
	render() {
		let e = this._pretending ? [] : this._items;
		return T`
            <uui-box headline="VIII — No media items at root">
                ${this._loading ? T`<uui-loader-bar></uui-loader-bar>` : e.length === 0 ? T`<div class="clean">✓ No media items loose at root — everything is in a folder.</div>` : T`
                            <div class="info">
                                ${e.length} media item(s) are sitting directly at root.
                                Move them into a folder.
                            </div>
                            ${e.map((e) => T`
                                <div class="item-row">
                                    <span class="item-name">${e.name}</span>
                                    <span class="item-type">${e.mediaTypeAlias}</span>
                                    <span class="item-date">${new Date(e.createDate).toLocaleDateString()}</span>
                                </div>
                            `)}
                            <uui-button class="pretend-btn" look="secondary" @click=${() => this.#n()}>
                                ✨ Let's pretend it's fixed
                            </uui-button>
                        `}
            </uui-box>
        `;
	}
};
B([I()], Y.prototype, "_items", void 0), B([I()], Y.prototype, "_loading", void 0), B([I()], Y.prototype, "_pretending", void 0), Y = B([F("sinners-root-media")], Y);
//#endregion
//#region src/penance/commandments/root-content.element.ts
var ct = "/umbraco/management/api/v1/sinners", X = class extends e(P) {
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
		super.connectedCallback(), z.registerSteps("IX", [() => this.#r()]), this.consumeContext(n, (e) => {
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
			let e = await this.#t(`${ct}/root-content-audit`);
			e.ok && (this._result = await e.json());
			let t = this._result?.rootNodes.filter((e) => !e.isRepository).length ?? 0;
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
			let e = await this.#t(`${ct}/seek-repository-sanctuary`, { method: "POST" });
			if (e.ok) {
				let t = await e.json();
				this._sanctuaryMessage = t.success ? t.message : `⚠ ${t.message}`, t.success && await this.#n();
			}
		} finally {
			this._seeking = !1;
		}
	}
	render() {
		let e = this._result, t = e?.rootNodes.filter((e) => !e.isRepository) ?? [];
		return T`
            <uui-box headline="IX — Root nodes are Repositories">
                ${this._loading ? T`<uui-loader-bar></uui-loader-bar>` : e?.isClean ? T`<div class="clean">✓ All root content nodes dwell within a Repository. The structure is righteous.</div>` : T`
                            <div class="info">
                                ${t.length} root node(s) exist outside a Repository. A site without a Repository at its root
                                cannot serve multiple masters. Seek sanctuary below.
                            </div>
                            ${e?.rootNodes.map((e) => T`
                                <div class="item-row">
                                    <span class="item-name">${e.name}</span>
                                    <span class="item-type">${e.contentTypeAlias}</span>
                                    <span class="badge ${e.isRepository ? "ok" : "error"}">
                                        ${e.isRepository ? "✓ Repository" : "✕ Sinner"}
                                    </span>
                                </div>
                            `)}
                            ${this._sanctuaryMessage ? T`<div class="sanctuary-message">${this._sanctuaryMessage}</div>` : T`
                                    <div class="action-row">
                                        <button
                                            class="sanctuary-btn"
                                            ?disabled=${this._seeking}
                                            @click=${this.#r}>
                                            ${this._seeking ? "⏳ Building sanctuary..." : "⛪ Seek Repository Sanctuary"}
                                        </button>
                                    </div>
                                `}
                        `}
            </uui-box>
        `;
	}
};
B([I()], X.prototype, "_result", void 0), B([I()], X.prototype, "_loading", void 0), B([I()], X.prototype, "_seeking", void 0), B([I()], X.prototype, "_sanctuaryMessage", void 0), X = B([F("sinners-root-content")], X);
//#endregion
//#region src/penance/commandments/usync-audit.element.ts
var lt = "/umbraco/management/api/v1/sinners", Z = class extends e(P) {
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
		super.connectedCallback(), z.registerSteps("X", [() => this.#n()]), this.consumeContext(n, (e) => {
			this.#e = e, this.#t();
		});
	}
	async #t() {
		this._loading = !0;
		try {
			let e = await this.#e?.getLatestToken(), t = await fetch(`${lt}/usync-audit`, { headers: e ? { Authorization: `Bearer ${e}` } : {} });
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
		let e = await this.#e?.getLatestToken();
		await fetch(`${lt}/inject-usync`, {
			method: "POST",
			headers: e ? { Authorization: `Bearer ${e}` } : {}
		}), et(() => void this.#t());
	}
	render() {
		let e = this._result;
		return T`
            <uui-box headline="X — uSync is installed">
                ${this._loading ? T`<uui-loader-bar></uui-loader-bar>` : e?.csprojFound ? e.hasUSync ? T`<div class="clean">✓ uSync is installed in <span class="code">${e.csprojName}</span> — thy schema walketh not alone.</div>` : e.hasUmbracoDeploy ? T`<div class="clean">✓ Umbraco.Deploy is installed in <span class="code">${e.csprojName}</span> — thy schema walketh not alone.</div>` : T`
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
                            ` : T`<div class="warn-block">No .csproj file found at the content root — unable to inspect thy project.</div>`}
            </uui-box>
        `;
	}
};
B([I()], Z.prototype, "_result", void 0), B([I()], Z.prototype, "_loading", void 0), Z = B([F("sinners-usync-audit")], Z);
//#endregion
//#region src/penance/penance-dashboard.element.ts
var Q = [
	{
		id: "I",
		label: "I — Content is not composable"
	},
	{
		id: "II",
		label: "II — The Six Sacred Types"
	},
	{
		id: "III",
		label: "III — Data types live in folders"
	},
	{
		id: "IV",
		label: "IV — Program.cs is clean"
	},
	{
		id: "V",
		label: "V — Live environment is production-ready"
	},
	{
		id: "VI",
		label: "VI — Aliases are camelCase English"
	},
	{
		id: "VII",
		label: "VII — Translation keys are PascalCase"
	},
	{
		id: "VIII",
		label: "VIII — No media items at root"
	},
	{
		id: "IX",
		label: "IX — Root nodes are Repositories"
	},
	{
		id: "X",
		label: "X — uSync is installed"
	}
], ut = {
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
}, $ = class extends e(P) {
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
    `;
	}
	connectedCallback() {
		super.connectedCallback(), z.setActiveTab(this._activeTab), z.onNextTab(() => {
			this.#n = !0;
			let e = Q.map((e) => e.id), t = e[(e.indexOf(this._activeTab) + 1) % e.length];
			this._activeTab = t, z.setActiveTab(t);
		}), this.consumeContext(t, (e) => {
			this.#e = e, this.#a();
		});
	}
	get #r() {
		let e = 0;
		return this._statuses.forEach((t) => {
			t.issueCount > 0 && e++;
		}), e;
	}
	get #i() {
		return this._spookyFactor > 0 ? this._spookyFactor : this.#r;
	}
	#a() {
		let e = this.#i;
		this.#e?.setThemeByAlias(e > 0 ? Ve(e) : "umb-light-theme");
	}
	#o(e) {
		this._spookyFactor = +e.target.value, this.#a();
	}
	#s(e, t) {
		if (this._statuses = new Map(this._statuses).set(e, t), this._spookyFactor === 0 && this.#a(), !this.#n && this._statuses.size === Q.length) {
			this.#n = !0;
			let e = Q.find((e) => (this._statuses.get(e.id)?.issueCount ?? 0) > 0);
			e && (this._activeTab = e.id, z.setActiveTab(e.id));
		}
	}
	#c(e) {
		let t = this._statuses.get(e);
		return t ? t.issueCount === 0 ? T`<span class="status-badge ok">✓</span>` : T`<span class="status-badge ${t.severity}">${t.issueCount}</span>` : T`<span class="status-badge pending"></span>`;
	}
	render() {
		return T`
            <div class="hero">
                <h1>Penance Board</h1>
                <p>Confess your sins. Audit your Umbraco installation against the Ten UmbraCommandments.</p>
                ${this._statuses.size > 0 ? T`<p class="verdict">${ut[this.#i]}</p>` : ""}
            </div>

            <div class="layout">
            <div class="tab-strip">
                ${Q.map((e) => T`
                    <button
                        class="tab-btn ${this._activeTab === e.id ? "active" : ""}"
                        @click=${() => {
			this.#n = !0, this._activeTab = e.id, z.setActiveTab(e.id);
		}}>
                        ${e.label}
                        ${this.#c(e.id)}
                    </button>
                `)}
            </div>

            <div class="tab-content">
                <div style="display:${this._activeTab === "I" ? "block" : "none"}">
                    <sinners-content-not-composable
                        @sinners-status=${(e) => this.#s("I", e.detail)}>
                    </sinners-content-not-composable>
                </div>
                <div style="display:${this._activeTab === "II" ? "block" : "none"}">
                    <sinners-six-sacred-types
                        @sinners-status=${(e) => this.#s("II", e.detail)}>
                    </sinners-six-sacred-types>
                </div>
                <div style="display:${this._activeTab === "III" ? "block" : "none"}">
                    <sinners-data-types-in-folders
                        @sinners-status=${(e) => this.#s("III", e.detail)}>
                    </sinners-data-types-in-folders>
                </div>
                <div style="display:${this._activeTab === "IV" ? "block" : "none"}">
                    <sinners-program-cs-clean
                        @sinners-status=${(e) => this.#s("IV", e.detail)}>
                    </sinners-program-cs-clean>
                </div>
                <div style="display:${this._activeTab === "V" ? "block" : "none"}">
                    <sinners-production-settings
                        @sinners-status=${(e) => this.#s("V", e.detail)}>
                    </sinners-production-settings>
                </div>
                <div style="display:${this._activeTab === "VI" ? "block" : "none"}">
                    <sinners-alias-audit
                        @sinners-status=${(e) => this.#s("VI", e.detail)}>
                    </sinners-alias-audit>
                </div>
                <div style="display:${this._activeTab === "VII" ? "block" : "none"}">
                    <sinners-translation-audit
                        @sinners-status=${(e) => this.#s("VII", e.detail)}>
                    </sinners-translation-audit>
                </div>
                <div style="display:${this._activeTab === "VIII" ? "block" : "none"}">
                    <sinners-root-media
                        @sinners-status=${(e) => this.#s("VIII", e.detail)}>
                    </sinners-root-media>
                </div>
                <div style="display:${this._activeTab === "IX" ? "block" : "none"}">
                    <sinners-root-content
                        @sinners-status=${(e) => this.#s("IX", e.detail)}>
                    </sinners-root-content>
                </div>
                <div style="display:${this._activeTab === "X" ? "block" : "none"}">
                    <sinners-usync-audit
                        @sinners-status=${(e) => this.#s("X", e.detail)}>
                    </sinners-usync-audit>
                </div>
            </div>
            </div>

            ${this.#t ? T`
                <div class="debug-strip">
                    <label>Debug — Spooky Factor Override (auto: ${this.#r})</label>
                    <div class="spooky-label">${this.#i} — ${ut[this.#i]}</div>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        .value=${String(this._spookyFactor)}
                        @input=${this.#o}>
                </div>` : ""}
        `;
	}
};
B([I()], $.prototype, "_activeTab", void 0), B([I()], $.prototype, "_statuses", void 0), B([I()], $.prototype, "_spookyFactor", void 0), $ = B([F("sinners-penance-dashboard")], $);
//#endregion
//#region src/index.ts
var dt = [
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
], ft = [
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
function pt(e) {
	return [...e].map((e, t) => {
		if (e === " ") return e;
		let n = t * 7 + e.charCodeAt(0) * 13, r = 3 + n % 3, i = e;
		for (let e = 0; e < r; e++) i += dt[(n + e * 3) % dt.length], i += ft[(n + e * 5 + 2) % ft.length];
		return i;
	}).join("");
}
var mt = [{
	type: "dashboard",
	alias: "Sinners.PenanceDashboard",
	name: "Penance",
	element: $,
	weight: 100,
	meta: {
		label: pt("Penance"),
		pathname: "penance"
	},
	conditions: [{
		alias: "Umb.Condition.SectionAlias",
		match: "Umb.Section.Settings"
	}]
}], ht = new Set([
	"PageUp",
	"PageDown",
	"Escape",
	"."
]);
function gt() {
	window.addEventListener("keydown", (e) => {
		ht.has(e.key) && (e.preventDefault(), e.stopPropagation(), console.log(`[POINTER] key="${e.key}"`), e.key === "PageDown" && z.next(), e.key === "PageUp" && z.nextTab(), e.key === "." && z.dot());
	}, !0);
}
var _t = (e, t) => {
	t.registerMany(mt), He(t), gt();
};
//#endregion
export { _t as onInit };

//# sourceMappingURL=dist.js.map