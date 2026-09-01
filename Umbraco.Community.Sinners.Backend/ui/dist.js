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
})(e) : e, { is: f, defineProperty: ee, getOwnPropertyDescriptor: te, getOwnPropertyNames: ne, getOwnPropertySymbols: re, getPrototypeOf: ie } = Object, p = globalThis, ae = p.trustedTypes, oe = ae ? ae.emptyScript : "", se = p.reactiveElementPolyfillSupport, m = (e, t) => e, h = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? oe : null;
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
}, ce = (e, t) => !f(e, t), le = {
	attribute: !0,
	type: String,
	converter: h,
	reflect: !1,
	useDefault: !1,
	hasChanged: ce
};
Symbol.metadata ??= Symbol("metadata"), p.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var g = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = le) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && ee(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = te(this.prototype, e) ?? {
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
		return this.elementProperties.get(e) ?? le;
	}
	static _$Ei() {
		if (this.hasOwnProperty(m("elementProperties"))) return;
		let e = ie(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(m("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(m("properties"))) {
			let e = this.properties, t = [...ne(e), ...re(e)];
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
			let i = (n.converter?.toAttribute === void 0 ? h : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? h : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? ce)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
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
g.elementStyles = [], g.shadowRootOptions = { mode: "open" }, g[m("elementProperties")] = /* @__PURE__ */ new Map(), g[m("finalized")] = /* @__PURE__ */ new Map(), se?.({ ReactiveElement: g }), (p.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var ue = globalThis, de = (e) => e, _ = ue.trustedTypes, fe = _ ? _.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, pe = "$lit$", v = `lit$${Math.random().toFixed(9).slice(2)}$`, me = "?" + v, he = `<${me}>`, y = document, b = () => y.createComment(""), x = (e) => e === null || typeof e != "object" && typeof e != "function", ge = Array.isArray, _e = (e) => ge(e) || typeof e?.[Symbol.iterator] == "function", ve = "[ 	\n\f\r]", S = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ye = /-->/g, be = />/g, C = RegExp(`>|${ve}(?:([^\\s"'>=/]+)(${ve}*=${ve}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), xe = /'/g, Se = /"/g, Ce = /^(?:script|style|textarea|title)$/i, w = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), T = Symbol.for("lit-noChange"), E = Symbol.for("lit-nothing"), we = /* @__PURE__ */ new WeakMap(), D = y.createTreeWalker(y, 129);
function Te(e, t) {
	if (!ge(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return fe === void 0 ? t : fe.createHTML(t);
}
var Ee = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = S;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === S ? c[1] === "!--" ? o = ye : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = C) : (Ce.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = C) : o = be : o === C ? c[0] === ">" ? (o = i ?? S, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? C : c[3] === "\"" ? Se : xe) : o === Se || o === xe ? o = C : o === ye || o === be ? o = S : (o = C, i = void 0);
		let d = o === C && e[t + 1].startsWith("/>") ? " " : "";
		a += o === S ? n + he : l >= 0 ? (r.push(s), n.slice(0, l) + pe + n.slice(l) + v + d) : n + v + (l === -2 ? t : d);
	}
	return [Te(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, De = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = Ee(t, n);
		if (this.el = e.createElement(l, r), D.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = D.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(pe)) {
					let t = u[o++], n = i.getAttribute(e).split(v), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Ae : r[1] === "?" ? je : r[1] === "@" ? Me : k
					}), i.removeAttribute(e);
				} else e.startsWith(v) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (Ce.test(i.tagName)) {
					let e = i.textContent.split(v), t = e.length - 1;
					if (t > 0) {
						i.textContent = _ ? _.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], b()), D.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], b());
					}
				}
			} else if (i.nodeType === 8) if (i.data === me) c.push({
				type: 2,
				index: a
			});
			else {
				let e = -1;
				for (; (e = i.data.indexOf(v, e + 1)) !== -1;) c.push({
					type: 7,
					index: a
				}), e += v.length - 1;
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = y.createElement("template");
		return n.innerHTML = e, n;
	}
};
function O(e, t, n = e, r) {
	if (t === T) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = x(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = O(e, i._$AS(e, t.values), i, r)), t;
}
var Oe = class {
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? y).importNode(t, !0);
		D.currentNode = r;
		let i = D.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new ke(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Ne(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = D.nextNode(), a++);
		}
		return D.currentNode = y, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, ke = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
		e = O(this, e, t), x(e) ? e === E || e == null || e === "" ? (this._$AH !== E && this._$AR(), this._$AH = E) : e !== this._$AH && e !== T && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? _e(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== E && x(this._$AH) ? this._$AA.nextSibling.data = e : this.T(y.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = De.createElement(Te(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new Oe(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = we.get(e.strings);
		return t === void 0 && we.set(e.strings, t = new De(e)), t;
	}
	k(t) {
		ge(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(b()), this.O(b()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = de(e).nextSibling;
			de(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, k = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = E, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = E;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = O(this, e, t, 0), a = !x(e) || e !== this._$AH && e !== T, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = O(this, r[n + o], t, o), s === T && (s = this._$AH[o]), a ||= !x(s) || s !== this._$AH[o], s === E ? e = E : e !== E && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Ae = class extends k {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === E ? void 0 : e;
	}
}, je = class extends k {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== E);
	}
}, Me = class extends k {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = O(this, e, t, 0) ?? E) === T) return;
		let n = this._$AH, r = e === E && n !== E || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== E && (n === E || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Ne = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		O(this, e);
	}
}, Pe = ue.litHtmlPolyfillSupport;
Pe?.(De, ke), (ue.litHtmlVersions ??= []).push("3.3.2");
var Fe = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new ke(t.insertBefore(b(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, Ie = globalThis, A = class extends g {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Fe(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return T;
	}
};
A._$litElement$ = !0, A.finalized = !0, Ie.litElementHydrateSupport?.({ LitElement: A });
var Le = Ie.litElementPolyfillSupport;
Le?.({ LitElement: A }), (Ie.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/@lit/reactive-element/decorators/custom-element.js
var j = (e) => (t, n) => {
	n === void 0 ? customElements.define(e, t) : n.addInitializer(() => {
		customElements.define(e, t);
	});
}, Re = {
	attribute: !0,
	type: String,
	converter: h,
	reflect: !1,
	hasChanged: ce
}, ze = (e = Re, t, n) => {
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
function Be(e) {
	return (t, n) => typeof n == "object" ? ze(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/state.js
function M(e) {
	return Be({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region src/penance/spooky-themes.ts
function Ve(e, t, n) {
	if (e.length !== 7 || t.length !== 7) return e;
	let r = parseInt(e.slice(1, 3), 16), i = parseInt(e.slice(3, 5), 16), a = parseInt(e.slice(5, 7), 16), o = parseInt(t.slice(1, 3), 16), s = parseInt(t.slice(3, 5), 16), c = parseInt(t.slice(5, 7), 16);
	return `#${Math.round(r + (o - r) * n).toString(16).padStart(2, "0")}${Math.round(i + (s - i) * n).toString(16).padStart(2, "0")}${Math.round(a + (c - a) * n).toString(16).padStart(2, "0")}`;
}
var He = {
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
}, Ue = {
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
function We(e) {
	let t = (e - 1) / 9, n = Object.keys(He).map((e) => `    ${e}: ${Ve(He[e], Ue[e], t)};`);
	return n.push("    --uui-color-scheme: dark;"), n.push("    --sinners-action-btn-bg: #e64241;"), n.push("    --sinners-action-btn-color: #ffffff;"), `:root {\n${n.join("\n")}\n}`;
}
var Ge = (e) => `sinners-spooky-${e}`;
function Ke(e) {
	for (let t = 1; t <= 10; t++) {
		let n = We(t);
		e.register({
			type: "theme",
			alias: Ge(t),
			name: `☠ Sinners: Abyss (Level ${t})`,
			css: () => Promise.resolve({ default: n }),
			weight: 50 - t
		});
	}
}
//#endregion
//#region src/penance/presenter.ts
var qe = [
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
], Je = {
	I: "Compositions",
	II: "Sacred Types",
	III: "Data Types",
	IV: "Program.cs",
	V: "Production",
	VI: "Aliases",
	VII: "Translations",
	VIII: "Media",
	IX: "Root",
	X: "uSync"
}, Ye = "sinners-presenter-state";
function Xe() {
	try {
		let e = sessionStorage.getItem(Ye);
		if (e) return JSON.parse(e);
	} catch {}
	return {
		activeTab: "",
		indices: {}
	};
}
var Ze = Xe(), Qe = /* @__PURE__ */ new Map(), N = new Map(Object.entries(Ze.indices)), P = Ze.activeTab, $e = null, et = /* @__PURE__ */ new Set();
function tt() {
	try {
		sessionStorage.setItem(Ye, JSON.stringify({
			activeTab: P,
			indices: Object.fromEntries(N)
		}));
	} catch {}
}
function F(e) {
	et.forEach((t) => t(e));
}
var nt = "/umbraco/section/settings/dashboard/penance", rt = "sinners-bar-visible", I = (() => {
	try {
		return sessionStorage.getItem(rt) === "1";
	} catch {
		return !1;
	}
})(), it = {
	I: "/umbraco/section/content/workspace/document/edit/704a66de-b213-44fe-815a-f988c0707bbf/invariant/view/info/modal/umb-modal-workspace/invariant/general/document-type/edit/b871f83c-2395-4894-be0f-5422c1a71e48/tab/content",
	II: "/umbraco/section/settings/workspace/document-type/edit/a95360e8-ff04-40b1-8f46-7aa4b5983096/tab/content",
	III: "/umbraco/section/settings/workspace/data-type/edit/b5922818-d8d8-43df-88ed-4582a24c0fa6",
	VII: "/umbraco/section/translation",
	VIII: "/umbraco/section/media/collection",
	IX: "/umbraco/section/content"
}, at = [{
	match: "/umbraco/section/content",
	target: "/umbraco/section/settings"
}], L = {
	get activeTab() {
		return P;
	},
	get barVisible() {
		return I;
	},
	toggleBar() {
		I = !I;
		try {
			sessionStorage.setItem(rt, I ? "1" : "0");
		} catch {}
		return F("state"), I;
	},
	setActiveTab(e) {
		P = e, tt(), F("state");
	},
	subscribe(e) {
		return et.add(e), () => et.delete(e);
	},
	stepInfo() {
		let e = Qe.get(P);
		if (!e || e.length === 0) return null;
		let t = N.get(P) ?? 0;
		return t >= e.length ? {
			label: "",
			index: t,
			total: e.length
		} : {
			label: e[t].label,
			index: t,
			total: e.length
		};
	},
	nextTabId() {
		let e = qe;
		return e[(e.indexOf(P) + 1) % e.length];
	},
	dotIntent() {
		return window.location.pathname.includes("/dashboard/penance") ? it[P] ? "exhibit" : "board-reload" : "return";
	},
	dot() {
		let e = window.location.pathname, t = e.includes("/dashboard/penance");
		if (F("dot"), t) {
			let e = it[P] ?? nt;
			console.log(`[PRESENTER] dot() on penance tab="${P}" → ${e}`), window.location.href = e;
			return;
		}
		let n = at.find((t) => e === t.match), r = n ? n.target : nt;
		console.log(`[PRESENTER] dot() elsewhere path="${e}" → ${r}`), window.location.href = r;
	},
	onNextTab(e) {
		$e = e;
	},
	get canNextTab() {
		return $e !== null;
	},
	nextTab() {
		console.log("[PRESENTER] nextTab()"), $e?.(), F("nextTab");
	},
	registerSteps(e, t) {
		Qe.set(e, t);
		let n = N.get(e) ?? 0;
		N.set(e, Math.min(n, t.length)), F("state");
	},
	async next() {
		let e = Qe.get(P) ?? [], t = N.get(P) ?? 0;
		if (console.log(`[PRESENTER] next() — tab="${P}" step=${t + 1}/${e.length}`), F("next"), t >= e.length) {
			console.log(`[PRESENTER] no more steps on tab "${P}"`);
			return;
		}
		await e[t].run(), N.set(P, t + 1), tt(), F("state"), console.log(`[PRESENTER] step ${t + 1} done`);
	},
	reset() {
		try {
			sessionStorage.removeItem(Ye), sessionStorage.removeItem("sinners-voice-words"), sessionStorage.removeItem(rt), localStorage.removeItem("sinners-media-pretend");
		} catch {}
		window.location.href = nt;
	}
};
//#endregion
//#region \0@oxc-project+runtime@0.128.0/helpers/decorate.js
function R(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region src/penance/commandments/content-not-composable.element.ts
var z = "/umbraco/management/api/v1/sinners", ot = {
	"Umbraco.BlockList": "Block List",
	"Umbraco.BlockGrid": "Block Grid",
	"Umbraco.RichText": "Rich Text"
}, B = class extends e(A) {
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
		super.connectedCallback(), L.registerSteps("I", [{
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
			let [e, t] = await Promise.all([this.#t(`${z}/sinful-compositions`), this.#t(`${z}/empty-compositions`)]);
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
			let r = await (await this.#t(`${z}/fold-in`, {
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
				let r = await (await this.#t(`${z}/fold-in`, {
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
				await this.#t(`${z}/empty-compositions/${encodeURIComponent(e.contentTypeAlias)}`, { method: "DELETE" }), await this.#n();
			} finally {
				this._deleting = new Set([...this._deleting].filter((t) => t !== e.contentTypeAlias));
			}
		}
	}
	async #c(e, t, n) {
		let r = `${e.contentTypeAlias}:${t.propertyAlias}`;
		this._blessing = new Set([...this._blessing, r]);
		try {
			await this.#t(`${z}/bless`, {
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
		return w`
            <div class="composition-row">
                <div class="name-block">
                    <span class="name">${e.contentTypeName}</span>
                    <span class="path">${e.folderPath}</span>
                    <div class="props">
                        ${e.sinfulProperties.map((t) => {
			let n = `${e.contentTypeAlias}:${t.propertyAlias}`, r = this._folding.has(n), i = this._blessing.has(n);
			return w`
                                <span class="prop-chip ${t.isBlessed ? "blessed" : ""}">
                                    ${ot[t.editorAlias] ?? t.editorAlias}
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
		return this._emptyItems.length === 0 ? E : w`
            <div class="section-divider">Empty compositions</div>
            ${this._emptyItems.map((e) => w`
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
		return w`
            <uui-box headline="I — Content is not composable">
                ${e ? w`
                          <div class="result-banner ${e.result.success ? "success" : "error"}">
                              ${e.result.message}
                          </div>
                      ` : E}
                ${this._loading ? w`<uui-loader-bar></uui-loader-bar>` : w`
                          ${this._items.length === 0 ? w`<div class="clean">✓ No compositions expose block lists, block grids, or rich text editors.</div>` : w`${this._items.map((e) => this.#l(e))}`}
                          ${this.#u()}
                      `}
            </uui-box>
        `;
	}
};
R([M()], B.prototype, "_items", void 0), R([M()], B.prototype, "_emptyItems", void 0), R([M()], B.prototype, "_loading", void 0), R([M()], B.prototype, "_folding", void 0), R([M()], B.prototype, "_blessing", void 0), R([M()], B.prototype, "_deleting", void 0), R([M()], B.prototype, "_lastResult", void 0), B = R([j("sinners-content-not-composable")], B);
//#endregion
//#region src/penance/commandments/four-sacred-types.element.ts
var st = [
	"Page",
	"Block",
	"Data",
	"Composition"
], ct = "/umbraco/management/api/v1/sinners", V = class extends e(A) {
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
		super.connectedCallback(), L.registerSteps("II", [
			{
				label: "Autofill classifications",
				run: () => this.#a()
			},
			{
				label: "Save all",
				run: () => this.#s()
			},
			{
				label: "Auto categorize",
				run: () => this.#o()
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
			let e = await this.#t(`${ct}/content-type-classifications`);
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
			(await this.#t(`${ct}/auto-categorize`, { method: "POST" })).ok && await this.#n();
		} finally {
			this._categorizing = !1;
		}
	}
	async #s() {
		if (this._pendingChanges.size !== 0) {
			this._saving = !0;
			try {
				for (let [e, t] of this._pendingChanges) if ((await this.#t(`${ct}/content-type-classifications`, {
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
		return w`
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
                        ${st.map((e) => w`<option value=${e} ?selected=${t === e}>${e}</option>`)}
                    </select>
                    ${e.suggestedClassification && !n ? w`<span
                              class="suggestion"
                              @click=${() => this.#i(e.contentTypeAlias, e.suggestedClassification)}
                              >Suggest: ${e.suggestedClassification}</span
                          >` : E}
                </div>
            </div>
        `;
	}
	#u(e, t, n = !1) {
		return t.length === 0 ? E : w`
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
		return w`
            <uui-box headline="II — The Four Sacred Types">
                ${this._loading ? w`<uui-loader-bar></uui-loader-bar>` : this._items.length === 0 ? w`<div class="empty">No content types found.</div>` : w`
                            <div class="stats">
                                <uui-button
                                    look="outline"
                                    .disabled=${this._categorizing}
                                    @click=${() => void this.#o()}
                                >
                                    ${this._categorizing ? "Categorizing…" : "Auto Categorize"}
                                </uui-button>
                                ${n > 0 ? w`<span class="stat-chip sinful">⚠ ${n} unclassified</span>` : w`<span class="stat-chip clean">✓ All classified</span>`}
                                ${st.map((e) => {
			let n = t(e).length;
			return n > 0 ? w`<span class="stat-chip">${e}: ${n}</span>` : E;
		})}
                            </div>

                            ${this.#u("Unclassified", e, !0)}
                            ${st.map((e) => this.#u(e, t(e)))}
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
R([M()], V.prototype, "_items", void 0), R([M()], V.prototype, "_loading", void 0), R([M()], V.prototype, "_saving", void 0), R([M()], V.prototype, "_categorizing", void 0), R([M()], V.prototype, "_pendingChanges", void 0), V = R([j("sinners-four-sacred-types")], V);
//#endregion
//#region src/penance/commandments/data-types-in-folders.element.ts
var lt = "/umbraco/management/api/v1/sinners", H = class extends e(A) {
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
		super.connectedCallback(), L.registerSteps("III", [{
			label: "Organize data types",
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
			let e = await this.#t(`${lt}/unorganized-data-types`);
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
			let e = await this.#t(`${lt}/organize-data-types`, { method: "POST" });
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
		return w`
            <uui-box headline="III — Data types live in folders">
                ${e ? w`<div class="result-banner ${e.success ? "success" : "error"}">${e.text}</div>` : E}
                ${this._loading ? w`<uui-loader-bar></uui-loader-bar>` : this._items.length === 0 ? w`<div class="clean">✓ All data types are in folders.</div>` : w`
                            <div class="toolbar">
                                <span class="count">${this._items.length} data type(s) need organizing</span>
                                <button
                                    class="organize-btn"
                                    ?disabled=${this._organizing}
                                    @click=${this.#r}>
                                    ${this._organizing ? "⏳ Organizing…" : "⊞ Organize All"}
                                </button>
                            </div>
                            ${[...this.#i().entries()].map(([e, t]) => w`
                                <div class="folder-group">
                                    <div class="folder-header">${e}</div>
                                    ${t.map((e) => w`
                                        <div class="dt-row">
                                            <span class="dt-name">${e.name}</span>
                                            ${e.isBuiltIn ? w`<span class="built-in-badge">built-in</span>` : E}
                                        </div>
                                    `)}
                                </div>
                            `)}
                        `}
            </uui-box>
        `;
	}
};
R([M()], H.prototype, "_items", void 0), R([M()], H.prototype, "_loading", void 0), R([M()], H.prototype, "_organizing", void 0), R([M()], H.prototype, "_lastMessage", void 0), H = R([j("sinners-data-types-in-folders")], H);
//#endregion
//#region src/penance/magic.ts
var ut = !1;
function dt() {
	if (ut) return;
	let e = document.createElement("style");
	e.textContent = "\n        @keyframes sinners-magic-fade {\n            0%   { opacity: 0; }\n            20%  { opacity: 1; }\n            80%  { opacity: 1; }\n            100% { opacity: 0; }\n        }\n        .sinners-magic-overlay {\n            position: fixed !important;\n            top: 0 !important;\n            left: 0 !important;\n            width: 100vw !important;\n            height: 100vh !important;\n            z-index: 2147483647 !important;\n            background: rgba(0, 0, 0, 0.85) !important;\n            display: flex !important;\n            align-items: center !important;\n            justify-content: center !important;\n            pointer-events: none !important;\n            animation: sinners-magic-fade 1.8s ease forwards !important;\n        }\n        .sinners-magic-word {\n            font-size: 96px !important;\n            font-weight: 900 !important;\n            font-style: italic !important;\n            background: linear-gradient(90deg, #ff6b35, #f7c59f, #efefd0, #00b4d8, #9b5de5) !important;\n            -webkit-background-clip: text !important;\n            -webkit-text-fill-color: transparent !important;\n            background-clip: text !important;\n            white-space: nowrap !important;\n        }\n    ", document.head.appendChild(e), ut = !0;
}
function ft(e) {
	dt();
	let t = document.createElement("div");
	t.className = "sinners-magic-overlay";
	let n = document.createElement("span");
	n.className = "sinners-magic-word", n.textContent = "✨ Magic ✨", t.appendChild(n), document.documentElement.appendChild(t), setTimeout(() => {
		t.remove(), e();
	}, 1800);
}
//#endregion
//#region src/penance/commandments/program-cs-clean.element.ts
var pt = "/umbraco/management/api/v1/sinners", mt = "var i̸̖l̷̼l̴̮i̵̗g̸̫a̷̮l̶̼ = app.UseUmbraco();\n\ni̸̖l̷̼l̴̮i̵̗g̸̫a̷̮l̶̼.WithMiddleware(u =>\n    {\n        u.UseBackOffice();\n        u.UseWebsite();\n    })\n    .WithEndpoints(u =>\n    {\n        u.UseBackOfficeEndpoints();\n        u.UseWebsiteEndpoints();\n    });", ht = "app.UseUmbraco()\n    .WithMiddleware(u =>\n    {\n        u.UseBackOffice();\n        u.UseWebsite();\n    })\n    .WithEndpoints(u =>\n    {\n        u.UseBackOfficeEndpoints();\n        u.UseWebsiteEndpoints();\n    });\n\nawait app.RunAsync();", U = class extends e(A) {
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
		super.connectedCallback(), L.registerSteps("IV", [{
			label: "Cleanse Program.cs",
			run: () => this.#n()
		}]), this.consumeContext(n, (e) => {
			this.#e = e, this.#t();
		});
	}
	async #t() {
		this._loading = !0;
		try {
			let e = await this.#e?.getLatestToken(), t = await fetch(`${pt}/program-cs-audit`, { headers: e ? { Authorization: `Bearer ${e}` } : {} });
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
		await fetch(`${pt}/fix-program-cs`, {
			method: "POST",
			headers: e ? { Authorization: `Bearer ${e}` } : {}
		}), ft(() => void this.#t());
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
		return w`
            ${e.useUmbracoSavedToVariable ? w`
                <div class="diff-block">
                    <div class="diff-side">
                        <div class="diff-label before">Before — thy sin</div>
                        <pre class="before">${mt}</pre>
                    </div>
                    <div class="diff-arrow">→</div>
                    <div class="diff-side">
                        <div class="diff-label after">After — absolved</div>
                        <pre class="after">${ht}</pre>
                    </div>
                </div>
                <uui-button class="fix-btn" look="secondary" @click=${() => void this.#n()}>
                    ✨ Apply the fix
                </uui-button>
            ` : ""}
            ${t.length > 0 ? w`
                <div class="issue-list">
                    ${t.map((e) => w`
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
		return w`
            <uui-box headline="IV — Program.cs is clean">
                ${this._loading ? w`<uui-loader-bar></uui-loader-bar>` : !e || !e.found ? w`<div class="not-found">Program.cs not found at the application root.</div>` : e.isClean ? w`<div class="clean">✓ Program.cs looks clean.</div>` : this.#r(e)}
            </uui-box>
        `;
	}
};
R([M()], U.prototype, "_result", void 0), R([M()], U.prototype, "_loading", void 0), U = R([j("sinners-program-cs-clean")], U);
//#endregion
//#region src/penance/commandments/production-settings.element.ts
var gt = "/umbraco/management/api/v1/sinners", W = class extends e(A) {
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
		super.connectedCallback(), L.registerSteps("V", [{
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
			let e = await this.#n(`${gt}/production-readiness`);
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
			await this.#n(`${gt}/bless-production-setting`, {
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
		let e = this._result, t = e ? w`<div class="scanned">Scanned: ${e.scannedFiles.join(", ")}</div>` : null;
		return w`
            <uui-box headline="V — Live environment is production-ready">
                ${this._loading ? w`<uui-loader-bar></uui-loader-bar>` : e ? e.isReady ? w`
                              <div class="clean">✓ Production settings found across your appsettings files.</div>
                              ${t}
                          ` : w`
                              <div class="warning-header">⚠ You better have a pipeline somewhere that sets these</div>
                              <div class="warning-sub">
                                  Scanned ${e.scannedFiles.join(", ")} — the following production settings were not found
                                  with valid values in any of them.
                              </div>
                              ${e.missingSettings.map((e) => {
			let t = this._blessing.has(e.key);
			return w`
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
R([M()], W.prototype, "_result", void 0), R([M()], W.prototype, "_loading", void 0), R([M()], W.prototype, "_blessing", void 0), W = R([j("sinners-production-settings")], W);
//#endregion
//#region src/penance/commandments/alias-audit.element.ts
var _t = "/umbraco/management/api/v1/sinners", G = class extends e(A) {
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
		super.connectedCallback(), L.registerSteps("VI", [{
			label: "Bless first alias",
			run: () => {
				let e = this._items.find((e) => !e.isBlessed);
				if (e) return this.#r(e, !0);
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
			let e = await this.#t(`${_t}/alias-issues`);
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
			await this.#t(`${_t}/bless-alias`, {
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
		return w`
            <div class="issue-row ${e.isBlessed ? "blessed" : ""}">
                <div class="name-block">
                    <span class="name">${e.contentTypeName}</span>
                    <span class="alias">${e.contentTypeAlias}</span>
                    <span class="path">${e.folderPath}</span>
                    <div class="tags">
                        ${e.isCamelCase ? E : w`<span class="tag error">✕ Not camelCase</span>`}
                        ${e.unrecognizedWords.map((e) => w`
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
		return w`
            <uui-box headline="VI — Document type aliases are camelCase English">
                ${this._loading ? w`<uui-loader-bar></uui-loader-bar>` : this._items.length === 0 ? w`<div class="clean">✓ All document type aliases are valid camelCase English.</div>` : w`${this._items.map((e) => this.#i(e))}`}
            </uui-box>
        `;
	}
};
R([M()], G.prototype, "_items", void 0), R([M()], G.prototype, "_loading", void 0), R([M()], G.prototype, "_blessing", void 0), G = R([j("sinners-alias-audit")], G);
//#endregion
//#region src/penance/commandments/translation-audit.element.ts
var vt = "/umbraco/management/api/v1/sinners", K = class extends e(A) {
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
		super.connectedCallback(), L.registerSteps("VII", [
			0,
			1,
			2,
			3,
			4,
			5
		].map((e) => ({
			label: `Create group ${e + 1} of 6`,
			run: () => {
				let e = this._result?.groupSuggestions[0];
				if (e) return this.#i(e);
			}
		}))), this.consumeContext(n, (e) => {
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
			let e = await this.#t(`${vt}/translation-audit`);
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
			await this.#t(`${vt}/bless-translation`, {
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
			await this.#t(`${vt}/create-translation-group`, {
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
		return e.length === 0 ? E : w`
            ${e.map((e) => {
			let t = this._blessing.has(e.itemKey);
			return w`
                    <div class="issue-row ${e.isBlessed ? "blessed" : ""}">
                        <div>
                            <span class="key">${e.itemKey}</span>
                            <div class="tags">
                                ${e.isPascalCase ? E : w`<span class="tag error">✕ Not PascalCase</span>`}
                                ${e.unrecognizedWords.map((e) => w`
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
		return e.length === 0 ? E : w`
            <div class="section-divider">Ungrouped keys</div>
            ${e.map((e) => {
			let t = this._grouping.has(e.proposedParentKey);
			return w`
                    <div class="group-row">
                        <div>
                            <span class="proposed-parent">${e.proposedParentKey}</span>
                            <div class="group-children">
                                ${e.children.map((e) => w`<span class="child-chip">${e.itemKey}</span>`)}
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
		return w`
            <uui-box headline="VII — Translation keys are PascalCase English and nested in folders">
                ${this._loading ? w`<uui-loader-bar></uui-loader-bar>` : !t && !n ? w`<div class="clean">✓ All translation keys are valid camelCase English with no grouping suggestions.</div>` : w`
                            ${e ? this.#a(e.issues) : E}
                            ${e ? this.#o(e.groupSuggestions) : E}
                        `}
            </uui-box>
        `;
	}
};
R([M()], K.prototype, "_result", void 0), R([M()], K.prototype, "_loading", void 0), R([M()], K.prototype, "_blessing", void 0), R([M()], K.prototype, "_grouping", void 0), K = R([j("sinners-translation-audit")], K);
//#endregion
//#region src/penance/commandments/root-media.element.ts
var yt = "/umbraco/management/api/v1/sinners", q = class extends e(A) {
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
		super.connectedCallback(), L.registerSteps("VIII", [{
			label: "Pretend to fix ✨",
			run: () => this.#n()
		}]), this.consumeContext(n, (e) => {
			this.#e = e, this.#t();
		});
	}
	async #t() {
		this._loading = !0;
		try {
			let e = await this.#e?.getLatestToken(), t = await fetch(`${yt}/root-media`, { headers: e ? { Authorization: `Bearer ${e}` } : {} });
			t.ok && (this._items = await t.json());
			let n = localStorage.getItem("sinners-media-pretend");
			if (n) {
				let e = [];
				try {
					e = JSON.parse(n);
				} catch {}
				let t = this._items.map((e) => e.key).sort().join(",");
				Array.isArray(e) && e.slice().sort().join(",") === t ? this._pretending = !0 : (localStorage.removeItem("sinners-media-pretend"), this._pretending = !1);
			}
			let r = this._pretending ? 0 : this._items.length;
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
	#n() {
		ft(() => {
			this._pretending = !0, localStorage.setItem("sinners-media-pretend", JSON.stringify(this._items.map((e) => e.key))), this.dispatchEvent(new CustomEvent("sinners-status", {
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
		return w`
            <uui-box headline="VIII — No media items at root">
                ${this._loading ? w`<uui-loader-bar></uui-loader-bar>` : e.length === 0 ? w`<div class="clean">✓ No media items loose at root — everything is in a folder.</div>` : w`
                            <div class="info">
                                ${e.length} media item(s) are sitting directly at root.
                                Move them into a folder.
                            </div>
                            ${e.map((e) => w`
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
R([M()], q.prototype, "_items", void 0), R([M()], q.prototype, "_loading", void 0), R([M()], q.prototype, "_pretending", void 0), q = R([j("sinners-root-media")], q);
//#endregion
//#region src/penance/commandments/root-content.element.ts
var bt = "/umbraco/management/api/v1/sinners", J = class extends e(A) {
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
		super.connectedCallback(), L.registerSteps("IX", [{
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
			let e = await this.#t(`${bt}/root-content-audit`);
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
			let e = await this.#t(`${bt}/seek-root-sanctuary`, { method: "POST" });
			if (e.ok) {
				let t = await e.json();
				this._sanctuaryMessage = t.success ? t.message : `⚠ ${t.message}`, t.success && await this.#n();
			}
		} finally {
			this._seeking = !1;
		}
	}
	render() {
		let e = this._result, t = e?.rootNodes.filter((e) => e.hasTemplate) ?? [];
		return w`
            <uui-box headline="IX — The root shall not render">
                ${this._loading ? w`<uui-loader-bar></uui-loader-bar>` : e?.isClean ? w`<div class="clean">✓ No root node beareth a template. The root is unrenderable and righteous.</div>` : w`
                            <div class="info">
                                ${t.length} root node(s) beareth a template. The Library now shelters thy shared
                                content — the root's only calling is to hold structure, never to render. Seek sanctuary below.
                            </div>
                            ${e?.rootNodes.map((e) => w`
                                <div class="item-row">
                                    <span class="item-name">${e.name}</span>
                                    <span class="item-type">${e.contentTypeAlias}${e.templateAlias ? ` → ${e.templateAlias}` : ""}</span>
                                    <span class="badge ${e.hasTemplate ? "error" : "ok"}">
                                        ${e.hasTemplate ? "✕ Rendereth" : "✓ Templateless"}
                                    </span>
                                </div>
                            `)}
                            ${this._sanctuaryMessage ? w`<div class="sanctuary-message">${this._sanctuaryMessage}</div>` : w`
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
R([M()], J.prototype, "_result", void 0), R([M()], J.prototype, "_loading", void 0), R([M()], J.prototype, "_seeking", void 0), R([M()], J.prototype, "_sanctuaryMessage", void 0), J = R([j("sinners-root-content")], J);
//#endregion
//#region src/penance/commandments/usync-audit.element.ts
var xt = "/umbraco/management/api/v1/sinners", St = class extends e(A) {
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
		super.connectedCallback(), L.registerSteps("X", [{
			label: "Pretend to uSync ✨",
			run: () => this.#n()
		}]), this.consumeContext(n, (e) => {
			this.#e = e, this.#t();
		});
	}
	async #t() {
		this._loading = !0;
		try {
			let e = await this.#e?.getLatestToken(), t = await fetch(`${xt}/usync-audit`, { headers: e ? { Authorization: `Bearer ${e}` } : {} });
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
		await fetch(`${xt}/inject-usync`, {
			method: "POST",
			headers: e ? { Authorization: `Bearer ${e}` } : {}
		}), ft(() => void this.#t());
	}
	render() {
		let e = this._result;
		return w`
            <uui-box headline="X — uSync is installed">
                ${this._loading ? w`<uui-loader-bar></uui-loader-bar>` : e?.csprojFound ? e.hasUSync ? w`<div class="clean">✓ uSync is installed in <span class="code">${e.csprojName}</span> — thy schema walketh not alone.</div>` : e.hasUmbracoDeploy ? w`<div class="clean">✓ Umbraco.Deploy is installed in <span class="code">${e.csprojName}</span> — thy schema walketh not alone.</div>` : w`
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
                            ` : w`<div class="warn-block">No .csproj file found at the content root — unable to inspect thy project.</div>`}
            </uui-box>
        `;
	}
};
R([M()], St.prototype, "_result", void 0), R([M()], St.prototype, "_loading", void 0), St = R([j("sinners-usync-audit")], St);
//#endregion
//#region src/penance/penance-dashboard.element.ts
var Y = [
	{
		id: "I",
		label: "I — Content is not composable"
	},
	{
		id: "II",
		label: "II — The Four Sacred Types"
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
		label: "VII — Translation keys are PascalCase and nested"
	},
	{
		id: "VIII",
		label: "VIII — No media items at root"
	},
	{
		id: "IX",
		label: "IX — The root shall not render"
	},
	{
		id: "X",
		label: "X — uSync is installed"
	}
], Ct = {
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
}, X = class extends e(A) {
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
		super.connectedCallback();
		let e = L.activeTab;
		e && Y.some((t) => t.id === e) && (this._activeTab = e, this.#n = !0), L.setActiveTab(this._activeTab), L.onNextTab(() => {
			this.#n = !0;
			let e = Y.map((e) => e.id), t = e[(e.indexOf(this._activeTab) + 1) % e.length];
			this._activeTab = t, L.setActiveTab(t);
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
		this.#e?.setThemeByAlias(e > 0 ? Ge(e) : "umb-light-theme");
	}
	#o(e) {
		this._spookyFactor = +e.target.value, this.#a();
	}
	#s(e, t) {
		if (this._statuses = new Map(this._statuses).set(e, t), this._spookyFactor === 0 && this.#a(), !this.#n && this._statuses.size === Y.length) {
			this.#n = !0;
			let e = Y.find((e) => (this._statuses.get(e.id)?.issueCount ?? 0) > 0);
			e && (this._activeTab = e.id, L.setActiveTab(e.id));
		}
	}
	#c(e) {
		let t = this._statuses.get(e);
		return t ? t.issueCount === 0 ? w`<span class="status-badge ok">✓</span>` : w`<span class="status-badge ${t.severity}">${t.issueCount}</span>` : w`<span class="status-badge pending"></span>`;
	}
	render() {
		return w`
            <div class="hero">
                <h1>Penance Board</h1>
                <p>Confess your sins. Audit your Umbraco installation against the Ten UmbraCommandments.</p>
                ${this._statuses.size > 0 ? w`<p class="verdict">${Ct[this.#i]}</p>` : ""}
            </div>

            <div class="layout">
            <div class="tab-strip">
                ${Y.map((e) => w`
                    <button
                        class="tab-btn ${this._activeTab === e.id ? "active" : ""}"
                        @click=${() => {
			this.#n = !0, this._activeTab = e.id, L.setActiveTab(e.id);
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
                    <sinners-four-sacred-types
                        @sinners-status=${(e) => this.#s("II", e.detail)}>
                    </sinners-four-sacred-types>
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

            ${this.#t ? w`
                <div class="debug-strip">
                    <label>Debug — Spooky Factor Override (auto: ${this.#r})</label>
                    <div class="spooky-label">${this.#i} — ${Ct[this.#i]}</div>
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
R([M()], X.prototype, "_activeTab", void 0), R([M()], X.prototype, "_statuses", void 0), R([M()], X.prototype, "_spookyFactor", void 0), X = R([j("sinners-penance-dashboard")], X);
//#endregion
//#region src/penance/voice.ts
var Z = [
	{
		display: "pineapple",
		rx: /\bpine\s?apple\b/i
	},
	{
		display: "banana",
		rx: /\bbananas?\b/i
	},
	{
		display: "banjo",
		rx: /\bbanjo\b/i
	},
	{
		display: "tuxedo",
		rx: /\btuxedo\b/i
	},
	{
		display: "flamingo",
		rx: /\bflamingo\b/i
	},
	{
		display: "spaghetti",
		rx: /\bspaghetti\b/i
	},
	{
		display: "unicorn",
		rx: /\bunicorn\b/i
	},
	{
		display: "volcano",
		rx: /\bvolcano\b/i
	},
	{
		display: "kangaroo",
		rx: /\bkangaroo\b/i
	},
	{
		display: "bubblegum",
		rx: /\bbubble\s?gum\b/i
	},
	{
		display: "helicopter",
		rx: /\bhelicopter\b/i
	},
	{
		display: "mustache",
		rx: /\b(?:mustache|moustache)\b/i
	},
	{
		display: "penguin",
		rx: /\bpenguin\b/i
	},
	{
		display: "pickle",
		rx: /\bpickle\b/i
	},
	{
		display: "waffle",
		rx: /\bwaffle\b/i
	},
	{
		display: "zombie",
		rx: /\bzombie\b/i
	},
	{
		display: "cactus",
		rx: /\bcactus\b/i
	},
	{
		display: "marshmallow",
		rx: /\bmarsh\s?mallow\b/i
	},
	{
		display: "tornado",
		rx: /\btornado\b/i
	},
	{
		display: "octopus",
		rx: /\boctopus\b/i
	},
	{
		display: "disco",
		rx: /\bdisco\b/i
	},
	{
		display: "karate",
		rx: /\bkarate\b/i
	},
	{
		display: "mango",
		rx: /\bmango\b/i
	},
	{
		display: "iceberg",
		rx: /\bice\s?berg\b/i
	},
	{
		display: "hammock",
		rx: /\bhammock\b/i
	},
	{
		display: "yogurt",
		rx: /\b(?:yogurt|yoghurt)\b/i
	},
	{
		display: "trampoline",
		rx: /\btrampoline\b/i
	},
	{
		display: "lobster",
		rx: /\blobster\b/i
	},
	{
		display: "saxophone",
		rx: /\bsaxophone\b/i
	},
	{
		display: "tumbleweed",
		rx: /\btumble\s?weed\b/i
	},
	{
		display: "meatball",
		rx: /\bmeat\s?ball\b/i
	},
	{
		display: "giraffe",
		rx: /\bgiraffe\b/i
	},
	{
		display: "lighthouse",
		rx: /\blight\s?house\b/i
	},
	{
		display: "popcorn",
		rx: /\bpop\s?corn\b/i
	},
	{
		display: "jellyfish",
		rx: /\bjelly\s?fish\b/i
	},
	{
		display: "hedgehog",
		rx: /\bhedge\s?hog\b/i
	},
	{
		display: "lasagna",
		rx: /\b(?:lasagna|lasagne)\b/i
	},
	{
		display: "dinosaur",
		rx: /\bdinosaurs?\b/i
	},
	{
		display: "coconut",
		rx: /\bcoconut\b/i
	},
	{
		display: "submarine",
		rx: /\bsubmarine\b/i
	},
	{
		display: "avalanche",
		rx: /\bavalanche\b/i
	},
	{
		display: "butterscotch",
		rx: /\bbutter\s?scotch\b/i
	},
	{
		display: "wheelbarrow",
		rx: /\bwheel\s?barrow\b/i
	},
	{
		display: "platypus",
		rx: /\bplatypus\b/i
	},
	{
		display: "accordion",
		rx: /\baccordion\b/i
	},
	{
		display: "snorkel",
		rx: /\bsnorkel\b/i
	},
	{
		display: "bulldozer",
		rx: /\bbull\s?dozer\b/i
	},
	{
		display: "catapult",
		rx: /\bcatapult\b/i
	},
	{
		display: "ketchup",
		rx: /\bketchup\b/i
	},
	{
		display: "moonwalk",
		rx: /\bmoon\s?walk\b/i
	}
], wt = "sinners-voice-words";
function Tt() {
	try {
		let e = sessionStorage.getItem(wt);
		if (e) return JSON.parse(e);
	} catch {}
	return {
		active: [
			0,
			1,
			2,
			3
		],
		next: 4
	};
}
var Et = /\b(?:hey|hej|hay|hei|okay|ok)[,.!?\s]+(?:umbraco|umbrako|umbracco|um\s?braco|um\s?brako|umbra\s?co|umbra|umbrella|braco)\b/i, Dt = /\b(?:site|sight|side|cite|sit)[\s-]?(?:core|call|cor|corps|coal|cole|col|kor|gore|corn)s?\b|\b(?:psycho|cycle)\b/i, Ot = [
	{
		pattern: /\b(?:one|won|1|penance|confess)\b/i,
		action: 1
	},
	{
		pattern: /\b(?:two|to|too|2|next)\b/i,
		action: 2
	},
	{
		pattern: /\b(?:three|tree|free|3|exhibit|show)\b/i,
		action: 3
	},
	{
		pattern: /\b(?:four|for|fore|4|reload)\b/i,
		action: 4
	}
], kt = 6e3, At = "sinners-voice-enabled";
function jt() {
	let e = window;
	return e.SpeechRecognition ?? e.webkitSpeechRecognition ?? null;
}
var Q = new class {
	#e = jt() ? "off" : "unsupported";
	#t = "";
	#n = "";
	#r = Tt();
	#i = null;
	#a;
	#o = 0;
	#s = /* @__PURE__ */ new Set();
	#c = null;
	#l = !1;
	constructor() {
		this.#e !== "unsupported" && localStorage.getItem(At) === "1" && this.enable();
	}
	get snapshot() {
		return {
			state: this.#e,
			lastHeard: this.#t,
			detail: this.#n,
			magicWords: this.#r.active.map((e) => Z[e].display)
		};
	}
	subscribe(e) {
		return this.#s.add(e), () => this.#s.delete(e);
	}
	#u() {
		let e = this.snapshot;
		this.#s.forEach((t) => t(e));
	}
	#d(e, t = "") {
		this.#e = e, this.#n = t, this.#u();
	}
	async enable() {
		let e = jt();
		if (e) {
			localStorage.setItem(At, "1"), this.#d("starting");
			try {
				if (e.available) {
					let t = await e.available({
						langs: ["en-US"],
						processLocally: !0
					});
					t === "available" ? this.#l = !0 : t === "downloadable" && e.install && e.install({
						langs: ["en-US"],
						processLocally: !0
					});
				}
			} catch {}
			this.#f();
		}
	}
	disable() {
		localStorage.setItem(At, "0"), this.#a && clearTimeout(this.#a);
		let e = this.#i;
		this.#i = null;
		try {
			e?.abort();
		} catch {}
		this.#d("off");
	}
	#f() {
		let e = jt();
		if (!e) return;
		try {
			this.#i?.abort();
		} catch {}
		let t = new e();
		if (t.lang = "en-US", t.continuous = !0, t.interimResults = !0, t.maxAlternatives = 3, this.#l) try {
			t.processLocally = !0;
		} catch {}
		t.onresult = (e) => {
			for (let t = e.resultIndex; t < e.results.length; t++) {
				let n = e.results[t];
				for (let e = 0; e < n.length; e++) this.#m(n[e].transcript);
			}
		}, t.onerror = (e) => {
			e.error === "not-allowed" || e.error === "service-not-allowed" ? (this.#i = null, this.#d("error", "microphone blocked — allow it and re-enable")) : e.error === "network" && this.#d("error", "speech service unreachable (venue wifi?) — retrying");
		}, t.onend = () => {
			this.#i === t && setTimeout(() => {
				if (this.#i === t) try {
					t.start();
				} catch {
					this.#f();
				}
			}, 250);
		}, this.#i = t;
		try {
			t.start(), this.#d("listening");
		} catch {
			this.#d("error", "could not start recognition");
		}
	}
	simulate(e) {
		(this.#e === "off" || this.#e === "error") && this.#d("listening"), this.#m(e);
	}
	#p = "";
	#m(e) {
		let t = e.trim();
		if (!t || (t !== this.#p && (this.#p = t, console.log(`[VOICE] heard: "${t}" (state=${this.#e}, hot=[${this.#r.active.map((e) => Z[e].display).join(", ")}])`)), this.#t = t, this.#u(), Date.now() < this.#o)) return;
		if (Dt.test(t)) {
			this.#o = Date.now() + 1500;
			let e = L.toggleBar();
			console.log(`[VOICE] SUMMON — the forbidden name was spoken, bar ${e ? "manifested" : "banished"}`), e ? (this.#y(660), setTimeout(() => this.#y(990), 130)) : this.#y(330, .18);
			return;
		}
		if (!L.barVisible || this.#e === "armed" && this.#v(t) || this.#e === "listening" && this.#h(t)) return;
		let n = Et.exec(t);
		if (n && this.#e === "listening") {
			this.#_();
			let e = t.slice(n.index + n[0].length);
			e && this.#v(e);
		}
	}
	#h(e) {
		for (let t = 0; t < 4; t++) {
			let n = Z[this.#r.active[t]];
			if (n.rx.test(e)) {
				console.log(`[VOICE] magic word "${n.display}" → button ${t + 1}`), this.#o = Date.now() + 1500, this.#y(1320), this.#r.active[t] = this.#r.next, this.#r.next = (this.#r.next + 1) % Z.length;
				try {
					sessionStorage.setItem(wt, JSON.stringify(this.#r));
				} catch {}
				return this.#u(), this.#g(t + 1), !0;
			}
		}
		return !1;
	}
	#g(e) {
		e === 1 ? L.next() : e === 2 ? L.nextTab() : e === 3 ? L.dot() : window.location.reload();
	}
	#_() {
		this.#y(880), this.#d("armed"), this.#a && clearTimeout(this.#a), this.#a = window.setTimeout(() => {
			this.#e === "armed" && (this.#y(220, .2), this.#d("listening"));
		}, kt);
	}
	#v(e) {
		let t = Ot.find((t) => t.pattern.test(e));
		return t ? (this.#a && clearTimeout(this.#a), this.#o = Date.now() + 1500, this.#y(1320), this.#d("listening"), console.log(`[VOICE] command ${t.action} from "${e}"`), this.#g(t.action), !0) : !1;
	}
	#y(e, t = .12) {
		try {
			this.#c ??= new AudioContext();
			let n = this.#c, r = n.createOscillator(), i = n.createGain();
			r.frequency.value = e, r.type = "sine", i.gain.setValueAtTime(.15, n.currentTime), i.gain.exponentialRampToValueAtTime(.001, n.currentTime + t), r.connect(i).connect(n.destination), r.start(), r.stop(n.currentTime + t);
		} catch {}
	}
}();
window.sinnersVoice = Q;
var Mt = "sinners-presenter-bar-layout", $ = class extends A {
	constructor(...e) {
		super(...e), this._flash = null, this._voice = Q.snapshot, this.#r = "", this.#l = (e) => {
			[
				"1",
				"2",
				"3",
				"4",
				"5",
				"0"
			].includes(e.key) && (!L.barVisible && !["5", "0"].includes(e.key) || (e.preventDefault(), e.stopPropagation(), e.key === "1" ? L.next() : e.key === "2" ? L.nextTab() : e.key === "3" ? L.dot() : e.key === "4" ? (this.#c(4), window.location.reload()) : e.key === "5" ? L.toggleBar() : e.key === "0" && L.reset()));
		};
	}
	#e;
	#t;
	#n;
	#r;
	#i;
	static {
		this.styles = l`
        :host {
            position: fixed;
            top: 0;
            right: 0;
            left: auto;
            bottom: auto;
            margin: 0;
            padding: 0;
            border: none;
            overflow: visible;
            width: ${210}px;
            height: 100vh;
            z-index: 100000;
            display: flex;
            flex-direction: column;
            background: #12061f;
            border-left: 3px solid #d42054;
            font-family: inherit;
            transition: transform 0.35s ease;
        }

        :host(.banished) {
            transform: translateX(105%);
        }

        .title {
            padding: 10px 12px 8px;
            text-align: center;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: #b98da8;
            border-bottom: 1px solid rgba(212, 32, 84, 0.35);
            user-select: none;
        }

        .title .tab {
            display: block;
            margin-top: 4px;
            font-size: 22px;
            letter-spacing: 0.04em;
            color: #ffffff;
        }

        .btn {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 10px 12px;
            border: none;
            border-bottom: 1px solid rgba(212, 32, 84, 0.35);
            background: transparent;
            color: #fff;
            cursor: pointer;
            text-align: center;
            transition: background 0.1s;
        }

        .btn:last-of-type { border-bottom: none; }
        .btn:hover:not(:disabled) { background: rgba(212, 32, 84, 0.18); }
        .btn:active:not(:disabled) { background: rgba(212, 32, 84, 0.4); }

        .btn:disabled {
            opacity: 0.3;
            cursor: default;
        }

        .btn.flash {
            background: #d42054;
        }

        .num {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            border-radius: 10px;
            border: 2px solid #d42054;
            font-size: 26px;
            font-weight: 900;
            color: #ff5e8a;
            flex-shrink: 0;
        }

        .btn.flash .num {
            background: #fff;
            color: #d42054;
            border-color: #fff;
        }

        .verb {
            font-size: 17px;
            font-weight: 800;
            line-height: 1.2;
        }

        .detail {
            font-size: 13px;
            font-weight: 500;
            line-height: 1.3;
            color: #cdaebf;
            overflow-wrap: anywhere;
        }

        .btn.flash .detail { color: #ffd7e2; }

        .voice {
            border-top: 2px solid rgba(212, 32, 84, 0.35);
            padding: 10px 12px;
            display: flex;
            flex-direction: column;
            gap: 6px;
            align-items: center;
            text-align: center;
            min-height: 74px;
            justify-content: center;
            user-select: none;
        }

        .voice-toggle {
            border: 1px solid #d42054;
            background: transparent;
            color: #ff5e8a;
            border-radius: 6px;
            padding: 5px 10px;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
        }

        .voice-toggle:hover { background: rgba(212, 32, 84, 0.18); }

        .voice-status {
            font-size: 12px;
            font-weight: 700;
            color: #cdaebf;
            line-height: 1.3;
        }

        .voice-heard {
            font-size: 10px;
            font-style: italic;
            color: #8a6f80;
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .voice.armed {
            background: rgba(212, 32, 84, 0.28);
            animation: sinners-voice-pulse 0.9s ease-in-out infinite;
        }

        .voice.armed .voice-status {
            color: #ffffff;
            font-size: 14px;
        }

        @keyframes sinners-voice-pulse {
            0%, 100% { background: rgba(212, 32, 84, 0.28); }
            50%      { background: rgba(212, 32, 84, 0.55); }
        }

        .voice-error { color: #ffb84d; }

        .magic-word {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            margin-top: 4px;
            padding: 6px 14px;
            border-radius: 18px;
            border: 2px dashed #a86bc4;
            font-size: 18px;
            font-style: italic;
            font-weight: 800;
            color: #e2bdf5;
            letter-spacing: 0.03em;
        }

        .btn.flash .magic-word { color: #fff; border-color: #fff; }
    `;
	}
	connectedCallback() {
		super.connectedCallback(), this.#o(), this.#t = L.subscribe((e) => this.#s(e)), this.#e = Q.subscribe((e) => {
			this._voice = e;
		}), window.addEventListener("keydown", this.#l, !0);
		try {
			this.setAttribute("popover", "manual"), this.showPopover();
		} catch {}
		this.#a(), this.#r = window.location.pathname, this.#n = window.setInterval(() => {
			window.location.pathname !== this.#r && (this.#r = window.location.pathname, window.location.pathname.includes("/modal") && this.#a(), this.requestUpdate());
		}, 400);
	}
	#a() {
		for (let e of [
			300,
			1e3,
			2500,
			5e3
		]) setTimeout(() => {
			try {
				this.matches(":popover-open") && (this.hidePopover(), this.showPopover());
			} catch {}
		}, e);
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		try {
			this.hidePopover();
		} catch {}
		this.#t?.(), this.#e?.(), window.removeEventListener("keydown", this.#l, !0), this.#n && clearInterval(this.#n), document.getElementById(Mt)?.remove();
	}
	#o() {
		let e = L.barVisible, t = this.classList.contains("banished");
		this.classList.toggle("banished", !e), e && t && this.#a();
		let n = document.getElementById(Mt);
		if (e && !n) {
			let e = document.createElement("style");
			e.id = Mt, e.textContent = "\n                body { width: calc(100vw - 210px) !important; }\n                umb-app { width: calc(100vw - 210px) !important; }\n            ", document.head.appendChild(e);
		} else !e && n && n.remove();
	}
	#s(e) {
		e === "next" ? this.#c(1) : e === "nextTab" ? this.#c(2) : e === "dot" && this.#c(3), this.#o(), this.requestUpdate();
	}
	#c(e) {
		this._flash = e, this.#i && clearTimeout(this.#i), this.#i = window.setTimeout(() => {
			this._flash = null;
		}, 350);
	}
	#l;
	#u(e, t) {
		t.currentTarget.blur(), e === 1 ? L.next() : e === 2 ? L.nextTab() : e === 3 ? L.dot() : (this.#c(4), window.location.reload());
	}
	render() {
		let e = L.activeTab, t = L.stepInfo(), n = window.location.pathname.includes("/dashboard/penance"), r = "Do penance", i = "", a = !1;
		!n || !t ? (a = !0, i = n ? "no steps here" : "return to the Board first") : t.index >= t.total ? (a = !0, r = "Penance done", i = `all ${t.total} steps atoned`) : i = `${t.label} · ${t.index + 1}/${t.total}`;
		let o = L.nextTabId(), s = !n || !L.canNextTab, c = L.dotIntent(), l = c === "exhibit" ? "Exhibit the sin" : c === "return" ? "Return to Board" : "Reload the Board", u = c === "exhibit" ? Je[e] ?? "" : "", d = this._voice.state === "listening" || this._voice.state === "armed", f = (e) => d ? w`<span class="magic-word">🎤 “${this._voice.magicWords[e - 1]}”</span>` : "";
		return w`
            <div class="title">Penance<span class="tab">${n && e ? e : "—"}</span></div>
            <button class="btn ${this._flash === 1 ? "flash" : ""}" ?disabled=${a} @click=${(e) => this.#u(1, e)}>
                <span class="num">1</span>
                <span class="verb">${r}</span>
                <span class="detail">${i}</span>
                ${f(1)}
            </button>
            <button class="btn ${this._flash === 2 ? "flash" : ""}" ?disabled=${s} @click=${(e) => this.#u(2, e)}>
                <span class="num">2</span>
                <span class="verb">Next commandment</span>
                <span class="detail">${o} — ${Je[o] ?? ""}</span>
                ${f(2)}
            </button>
            <button class="btn ${this._flash === 3 ? "flash" : ""}" @click=${(e) => this.#u(3, e)}>
                <span class="num">3</span>
                <span class="verb">${l}</span>
                <span class="detail">${u}</span>
                ${f(3)}
            </button>
            <button class="btn ${this._flash === 4 ? "flash" : ""}" @click=${(e) => this.#u(4, e)}>
                <span class="num">4</span>
                <span class="verb">Reload</span>
                <span class="detail">when all else fails</span>
                ${f(4)}
            </button>
            ${this.#d()}
        `;
	}
	#d() {
		let e = this._voice;
		return e.state === "unsupported" ? w`<div class="voice"><span class="voice-heard">🎤 voice not supported here</span></div>` : e.state === "off" ? w`
                <div class="voice">
                    <button class="voice-toggle" @click=${() => void Q.enable()}>🎤 Enable voice</button>
                </div>` : e.state === "error" ? w`
                <div class="voice">
                    <span class="voice-status voice-error">⚠ ${e.detail}</span>
                    <button class="voice-toggle" @click=${() => void Q.enable()}>retry</button>
                </div>` : e.state === "armed" ? w`
                <div class="voice armed">
                    <span class="voice-status">🔴 LISTENING<br>say 1 · 2 · 3 · 4</span>
                </div>` : w`
            <div class="voice">
                <span class="voice-status">🎤 Say "Hey Umbraco"</span>
                ${e.lastHeard ? w`<span class="voice-heard" title=${e.lastHeard}>“${e.lastHeard}”</span>` : ""}
                <button class="voice-toggle" @click=${() => Q.disable()}>mute</button>
            </div>`;
	}
};
R([M()], $.prototype, "_flash", void 0), R([M()], $.prototype, "_voice", void 0), $ = R([j("sinners-presenter-bar")], $);
//#endregion
//#region src/index.ts
var Nt = [
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
], Pt = [
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
function Ft(e) {
	return [...e].map((e, t) => {
		if (e === " ") return e;
		let n = t * 7 + e.charCodeAt(0) * 13, r = 3 + n % 3, i = e;
		for (let e = 0; e < r; e++) i += Nt[(n + e * 3) % Nt.length], i += Pt[(n + e * 5 + 2) % Pt.length];
		return i;
	}).join("");
}
var It = [{
	type: "dashboard",
	alias: "Sinners.PenanceDashboard",
	name: "Penance",
	element: X,
	weight: 100,
	meta: {
		label: Ft("Penance"),
		pathname: "penance"
	},
	conditions: [{
		alias: "Umb.Condition.SectionAlias",
		match: "Umb.Section.Settings"
	}]
}], Lt = new Set([
	"PageUp",
	"PageDown",
	"Escape",
	"."
]);
function Rt() {
	window.addEventListener("keydown", (e) => {
		Lt.has(e.key) && (e.preventDefault(), e.stopPropagation(), console.log(`[POINTER] key="${e.key}"`), e.key === "PageDown" && L.next(), e.key === "PageUp" && L.nextTab(), e.key === "." && L.dot());
	}, !0);
}
function zt() {
	document.querySelector("sinners-presenter-bar") || document.body.appendChild(document.createElement("sinners-presenter-bar"));
}
var Bt = (e, t) => {
	t.registerMany(It), Ke(t), Rt(), zt();
};
//#endregion
export { Bt as onInit };

//# sourceMappingURL=dist.js.map