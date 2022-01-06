(function(e, t) {
    "use strict";
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = e.document ? t(e, true) : function(e) {
            if (!e.document) {
                throw new Error("jQuery requires a window with a document")
            }
            return t(e)
        }
    } else {
        t(e)
    }
}
)(typeof window !== "undefined" ? window : this, function(e, t) {
    "use strict";
    var i = [];
    var n = e.document;
    var r = Object.getPrototypeOf;
    var o = i.slice;
    var s = i.concat;
    var a = i.push;
    var l = i.indexOf;
    var u = {};
    var c = u.toString;
    var d = u.hasOwnProperty;
    var f = d.toString;
    var p = f.call(Object);
    var h = {};
    var g = function e(t) {
        return typeof t === "function" && typeof t.nodeType !== "number"
    };
    var m = function e(t) {
        return t != null && t === t.window
    };
    var v = {
        type: true,
        src: true,
        noModule: true
    };
    function y(e, t, i) {
        t = t || n;
        var r, o = t.createElement("script");
        o.text = e;
        if (i) {
            for (r in v) {
                if (i[r]) {
                    o[r] = i[r]
                }
            }
        }
        t.head.appendChild(o).parentNode.removeChild(o)
    }
    function b(e) {
        if (e == null) {
            return e + ""
        }
        return typeof e === "object" || typeof e === "function" ? u[c.call(e)] || "object" : typeof e
    }
    var w = "3.3.1"
      , x = function(e, t) {
        return new x.fn.init(e,t)
    }
      , T = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    x.fn = x.prototype = {
        jquery: w,
        constructor: x,
        length: 0,
        toArray: function() {
            return o.call(this)
        },
        get: function(e) {
            if (e == null) {
                return o.call(this)
            }
            return e < 0 ? this[e + this.length] : this[e]
        },
        pushStack: function(e) {
            var t = x.merge(this.constructor(), e);
            t.prevObject = this;
            return t
        },
        each: function(e) {
            return x.each(this, e)
        },
        map: function(e) {
            return this.pushStack(x.map(this, function(t, i) {
                return e.call(t, i, t)
            }))
        },
        slice: function() {
            return this.pushStack(o.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length
              , i = +e + (e < 0 ? t : 0);
            return this.pushStack(i >= 0 && i < t ? [this[i]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: a,
        sort: i.sort,
        splice: i.splice
    };
    x.extend = x.fn.extend = function() {
        var e, t, i, n, r, o, s = arguments[0] || {}, a = 1, l = arguments.length, u = false;
        if (typeof s === "boolean") {
            u = s;
            s = arguments[a] || {};
            a++
        }
        if (typeof s !== "object" && !g(s)) {
            s = {}
        }
        if (a === l) {
            s = this;
            a--
        }
        for (; a < l; a++) {
            if ((e = arguments[a]) != null) {
                for (t in e) {
                    i = s[t];
                    n = e[t];
                    if (s === n) {
                        continue
                    }
                    if (u && n && (x.isPlainObject(n) || (r = Array.isArray(n)))) {
                        if (r) {
                            r = false;
                            o = i && Array.isArray(i) ? i : []
                        } else {
                            o = i && x.isPlainObject(i) ? i : {}
                        }
                        s[t] = x.extend(u, o, n)
                    } else if (n !== undefined) {
                        s[t] = n
                    }
                }
            }
        }
        return s
    }
    ;
    x.extend({
        expando: "jQuery" + (w + Math.random()).replace(/\D/g, ""),
        isReady: true,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isPlainObject: function(e) {
            var t, i;
            if (!e || c.call(e) !== "[object Object]") {
                return false
            }
            t = r(e);
            if (!t) {
                return true
            }
            i = d.call(t, "constructor") && t.constructor;
            return typeof i === "function" && f.call(i) === p
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) {
                return false
            }
            return true
        },
        globalEval: function(e) {
            y(e)
        },
        each: function(e, t) {
            var i, n = 0;
            if (C(e)) {
                i = e.length;
                for (; n < i; n++) {
                    if (t.call(e[n], n, e[n]) === false) {
                        break
                    }
                }
            } else {
                for (n in e) {
                    if (t.call(e[n], n, e[n]) === false) {
                        break
                    }
                }
            }
            return e
        },
        trim: function(e) {
            return e == null ? "" : (e + "").replace(T, "")
        },
        makeArray: function(e, t) {
            var i = t || [];
            if (e != null) {
                if (C(Object(e))) {
                    x.merge(i, typeof e === "string" ? [e] : e)
                } else {
                    a.call(i, e)
                }
            }
            return i
        },
        inArray: function(e, t, i) {
            return t == null ? -1 : l.call(t, e, i)
        },
        merge: function(e, t) {
            var i = +t.length
              , n = 0
              , r = e.length;
            for (; n < i; n++) {
                e[r++] = t[n]
            }
            e.length = r;
            return e
        },
        grep: function(e, t, i) {
            var n, r = [], o = 0, s = e.length, a = !i;
            for (; o < s; o++) {
                n = !t(e[o], o);
                if (n !== a) {
                    r.push(e[o])
                }
            }
            return r
        },
        map: function(e, t, i) {
            var n, r, o = 0, a = [];
            if (C(e)) {
                n = e.length;
                for (; o < n; o++) {
                    r = t(e[o], o, i);
                    if (r != null) {
                        a.push(r)
                    }
                }
            } else {
                for (o in e) {
                    r = t(e[o], o, i);
                    if (r != null) {
                        a.push(r)
                    }
                }
            }
            return s.apply([], a)
        },
        guid: 1,
        support: h
    });
    if (typeof Symbol === "function") {
        x.fn[Symbol.iterator] = i[Symbol.iterator]
    }
    x.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
        u["[object " + t + "]"] = t.toLowerCase()
    });
    function C(e) {
        var t = !!e && "length"in e && e.length
          , i = b(e);
        if (g(e) || m(e)) {
            return false
        }
        return i === "array" || t === 0 || typeof t === "number" && t > 0 && t - 1 in e
    }
    var S = function(e) {
        var t, i, n, r, o, s, a, l, u, c, d, f, p, h, g, m, v, y, b, w = "sizzle" + 1 * new Date, x = e.document, T = 0, C = 0, S = se(), k = se(), $ = se(), A = function(e, t) {
            if (e === t) {
                d = true
            }
            return 0
        }, E = {}.hasOwnProperty, _ = [], D = _.pop, O = _.push, I = _.push, L = _.slice, N = function(e, t) {
            var i = 0
              , n = e.length;
            for (; i < n; i++) {
                if (e[i] === t) {
                    return i
                }
            }
            return -1
        }, j = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", P = "[\\x20\\t\\r\\n\\f]", q = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+", H = "\\[" + P + "*(" + q + ")(?:" + P + "*([*^$|!~]?=)" + P + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + q + "))|)" + P + "*\\]", M = ":(" + q + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + H + ")*)|" + ".*" + ")\\)|)", R = new RegExp(P + "+","g"), z = new RegExp("^" + P + "+|((?:^|[^\\\\])(?:\\\\.)*)" + P + "+$","g"), F = new RegExp("^" + P + "*," + P + "*"), W = new RegExp("^" + P + "*([>+~]|" + P + ")" + P + "*"), B = new RegExp("=" + P + "*([^\\]'\"]*?)" + P + "*\\]","g"), U = new RegExp(M), G = new RegExp("^" + q + "$"), V = {
            ID: new RegExp("^#(" + q + ")"),
            CLASS: new RegExp("^\\.(" + q + ")"),
            TAG: new RegExp("^(" + q + "|[*])"),
            ATTR: new RegExp("^" + H),
            PSEUDO: new RegExp("^" + M),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + P + "*(even|odd|(([+-]|)(\\d*)n|)" + P + "*(?:([+-]|)" + P + "*(\\d+)|))" + P + "*\\)|)","i"),
            bool: new RegExp("^(?:" + j + ")$","i"),
            needsContext: new RegExp("^" + P + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + P + "*((?:-\\d)?\\d*)" + P + "*\\)|)(?=[^-]|$)","i")
        }, Y = /^(?:input|select|textarea|button)$/i, X = /^h\d$/i, K = /^[^{]+\{\s*\[native \w/, Q = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, Z = /[+~]/, J = new RegExp("\\\\([\\da-f]{1,6}" + P + "?|(" + P + ")|.)","ig"), ee = function(e, t, i) {
            var n = "0x" + t - 65536;
            return n !== n || i ? t : n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, n & 1023 | 56320)
        }, te = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, ie = function(e, t) {
            if (t) {
                if (e === "\0") {
                    return "�"
                }
                return e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " "
            }
            return "\\" + e
        }, ne = function() {
            f()
        }, re = ye(function(e) {
            return e.disabled === true && ("form"in e || "label"in e)
        }, {
            dir: "parentNode",
            next: "legend"
        });
        try {
            I.apply(_ = L.call(x.childNodes), x.childNodes);
            _[x.childNodes.length].nodeType
        } catch (e) {
            I = {
                apply: _.length ? function(e, t) {
                    O.apply(e, L.call(t))
                }
                : function(e, t) {
                    var i = e.length
                      , n = 0;
                    while (e[i++] = t[n++]) {}
                    e.length = i - 1
                }
            }
        }
        function oe(e, t, n, r) {
            var o, a, u, c, d, h, v, y = t && t.ownerDocument, T = t ? t.nodeType : 9;
            n = n || [];
            if (typeof e !== "string" || !e || T !== 1 && T !== 9 && T !== 11) {
                return n
            }
            if (!r) {
                if ((t ? t.ownerDocument || t : x) !== p) {
                    f(t)
                }
                t = t || p;
                if (g) {
                    if (T !== 11 && (d = Q.exec(e))) {
                        if (o = d[1]) {
                            if (T === 9) {
                                if (u = t.getElementById(o)) {
                                    if (u.id === o) {
                                        n.push(u);
                                        return n
                                    }
                                } else {
                                    return n
                                }
                            } else {
                                if (y && (u = y.getElementById(o)) && b(t, u) && u.id === o) {
                                    n.push(u);
                                    return n
                                }
                            }
                        } else if (d[2]) {
                            I.apply(n, t.getElementsByTagName(e));
                            return n
                        } else if ((o = d[3]) && i.getElementsByClassName && t.getElementsByClassName) {
                            I.apply(n, t.getElementsByClassName(o));
                            return n
                        }
                    }
                    if (i.qsa && !$[e + " "] && (!m || !m.test(e))) {
                        if (T !== 1) {
                            y = t;
                            v = e
                        } else if (t.nodeName.toLowerCase() !== "object") {
                            if (c = t.getAttribute("id")) {
                                c = c.replace(te, ie)
                            } else {
                                t.setAttribute("id", c = w)
                            }
                            h = s(e);
                            a = h.length;
                            while (a--) {
                                h[a] = "#" + c + " " + ve(h[a])
                            }
                            v = h.join(",");
                            y = Z.test(e) && ge(t.parentNode) || t
                        }
                        if (v) {
                            try {
                                I.apply(n, y.querySelectorAll(v));
                                return n
                            } catch (e) {} finally {
                                if (c === w) {
                                    t.removeAttribute("id")
                                }
                            }
                        }
                    }
                }
            }
            return l(e.replace(z, "$1"), t, n, r)
        }
        function se() {
            var e = [];
            function t(i, r) {
                if (e.push(i + " ") > n.cacheLength) {
                    delete t[e.shift()]
                }
                return t[i + " "] = r
            }
            return t
        }
        function ae(e) {
            e[w] = true;
            return e
        }
        function le(e) {
            var t = p.createElement("fieldset");
            try {
                return !!e(t)
            } catch (e) {
                return false
            } finally {
                if (t.parentNode) {
                    t.parentNode.removeChild(t)
                }
                t = null
            }
        }
        function ue(e, t) {
            var i = e.split("|")
              , r = i.length;
            while (r--) {
                n.attrHandle[i[r]] = t
            }
        }
        function ce(e, t) {
            var i = t && e
              , n = i && e.nodeType === 1 && t.nodeType === 1 && e.sourceIndex - t.sourceIndex;
            if (n) {
                return n
            }
            if (i) {
                while (i = i.nextSibling) {
                    if (i === t) {
                        return -1
                    }
                }
            }
            return e ? 1 : -1
        }
        function de(e) {
            return function(t) {
                var i = t.nodeName.toLowerCase();
                return i === "input" && t.type === e
            }
        }
        function fe(e) {
            return function(t) {
                var i = t.nodeName.toLowerCase();
                return (i === "input" || i === "button") && t.type === e
            }
        }
        function pe(e) {
            return function(t) {
                if ("form"in t) {
                    if (t.parentNode && t.disabled === false) {
                        if ("label"in t) {
                            if ("label"in t.parentNode) {
                                return t.parentNode.disabled === e
                            } else {
                                return t.disabled === e
                            }
                        }
                        return t.isDisabled === e || t.isDisabled !== !e && re(t) === e
                    }
                    return t.disabled === e
                } else if ("label"in t) {
                    return t.disabled === e
                }
                return false
            }
        }
        function he(e) {
            return ae(function(t) {
                t = +t;
                return ae(function(i, n) {
                    var r, o = e([], i.length, t), s = o.length;
                    while (s--) {
                        if (i[r = o[s]]) {
                            i[r] = !(n[r] = i[r])
                        }
                    }
                })
            })
        }
        function ge(e) {
            return e && typeof e.getElementsByTagName !== "undefined" && e
        }
        i = oe.support = {};
        o = oe.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? t.nodeName !== "HTML" : false
        }
        ;
        f = oe.setDocument = function(e) {
            var t, r, s = e ? e.ownerDocument || e : x;
            if (s === p || s.nodeType !== 9 || !s.documentElement) {
                return p
            }
            p = s;
            h = p.documentElement;
            g = !o(p);
            if (x !== p && (r = p.defaultView) && r.top !== r) {
                if (r.addEventListener) {
                    r.addEventListener("unload", ne, false)
                } else if (r.attachEvent) {
                    r.attachEvent("onunload", ne)
                }
            }
            i.attributes = le(function(e) {
                e.className = "i";
                return !e.getAttribute("className")
            });
            i.getElementsByTagName = le(function(e) {
                e.appendChild(p.createComment(""));
                return !e.getElementsByTagName("*").length
            });
            i.getElementsByClassName = K.test(p.getElementsByClassName);
            i.getById = le(function(e) {
                h.appendChild(e).id = w;
                return !p.getElementsByName || !p.getElementsByName(w).length
            });
            if (i.getById) {
                n.filter["ID"] = function(e) {
                    var t = e.replace(J, ee);
                    return function(e) {
                        return e.getAttribute("id") === t
                    }
                }
                ;
                n.find["ID"] = function(e, t) {
                    if (typeof t.getElementById !== "undefined" && g) {
                        var i = t.getElementById(e);
                        return i ? [i] : []
                    }
                }
            } else {
                n.filter["ID"] = function(e) {
                    var t = e.replace(J, ee);
                    return function(e) {
                        var i = typeof e.getAttributeNode !== "undefined" && e.getAttributeNode("id");
                        return i && i.value === t
                    }
                }
                ;
                n.find["ID"] = function(e, t) {
                    if (typeof t.getElementById !== "undefined" && g) {
                        var i, n, r, o = t.getElementById(e);
                        if (o) {
                            i = o.getAttributeNode("id");
                            if (i && i.value === e) {
                                return [o]
                            }
                            r = t.getElementsByName(e);
                            n = 0;
                            while (o = r[n++]) {
                                i = o.getAttributeNode("id");
                                if (i && i.value === e) {
                                    return [o]
                                }
                            }
                        }
                        return []
                    }
                }
            }
            n.find["TAG"] = i.getElementsByTagName ? function(e, t) {
                if (typeof t.getElementsByTagName !== "undefined") {
                    return t.getElementsByTagName(e)
                } else if (i.qsa) {
                    return t.querySelectorAll(e)
                }
            }
            : function(e, t) {
                var i, n = [], r = 0, o = t.getElementsByTagName(e);
                if (e === "*") {
                    while (i = o[r++]) {
                        if (i.nodeType === 1) {
                            n.push(i)
                        }
                    }
                    return n
                }
                return o
            }
            ;
            n.find["CLASS"] = i.getElementsByClassName && function(e, t) {
                if (typeof t.getElementsByClassName !== "undefined" && g) {
                    return t.getElementsByClassName(e)
                }
            }
            ;
            v = [];
            m = [];
            if (i.qsa = K.test(p.querySelectorAll)) {
                le(function(e) {
                    h.appendChild(e).innerHTML = "<a id='" + w + "'></a>" + "<select id='" + w + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";
                    if (e.querySelectorAll("[msallowcapture^='']").length) {
                        m.push("[*^$]=" + P + "*(?:''|\"\")")
                    }
                    if (!e.querySelectorAll("[selected]").length) {
                        m.push("\\[" + P + "*(?:value|" + j + ")")
                    }
                    if (!e.querySelectorAll("[id~=" + w + "-]").length) {
                        m.push("~=")
                    }
                    if (!e.querySelectorAll(":checked").length) {
                        m.push(":checked")
                    }
                    if (!e.querySelectorAll("a#" + w + "+*").length) {
                        m.push(".#.+[+~]")
                    }
                });
                le(function(e) {
                    e.innerHTML = "<a href='' disabled='disabled'></a>" + "<select disabled='disabled'><option/></select>";
                    var t = p.createElement("input");
                    t.setAttribute("type", "hidden");
                    e.appendChild(t).setAttribute("name", "D");
                    if (e.querySelectorAll("[name=d]").length) {
                        m.push("name" + P + "*[*^$|!~]?=")
                    }
                    if (e.querySelectorAll(":enabled").length !== 2) {
                        m.push(":enabled", ":disabled")
                    }
                    h.appendChild(e).disabled = true;
                    if (e.querySelectorAll(":disabled").length !== 2) {
                        m.push(":enabled", ":disabled")
                    }
                    e.querySelectorAll("*,:x");
                    m.push(",.*:")
                })
            }
            if (i.matchesSelector = K.test(y = h.matches || h.webkitMatchesSelector || h.mozMatchesSelector || h.oMatchesSelector || h.msMatchesSelector)) {
                le(function(e) {
                    i.disconnectedMatch = y.call(e, "*");
                    y.call(e, "[s!='']:x");
                    v.push("!=", M)
                })
            }
            m = m.length && new RegExp(m.join("|"));
            v = v.length && new RegExp(v.join("|"));
            t = K.test(h.compareDocumentPosition);
            b = t || K.test(h.contains) ? function(e, t) {
                var i = e.nodeType === 9 ? e.documentElement : e
                  , n = t && t.parentNode;
                return e === n || !!(n && n.nodeType === 1 && (i.contains ? i.contains(n) : e.compareDocumentPosition && e.compareDocumentPosition(n) & 16))
            }
            : function(e, t) {
                if (t) {
                    while (t = t.parentNode) {
                        if (t === e) {
                            return true
                        }
                    }
                }
                return false
            }
            ;
            A = t ? function(e, t) {
                if (e === t) {
                    d = true;
                    return 0
                }
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                if (n) {
                    return n
                }
                n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1;
                if (n & 1 || !i.sortDetached && t.compareDocumentPosition(e) === n) {
                    if (e === p || e.ownerDocument === x && b(x, e)) {
                        return -1
                    }
                    if (t === p || t.ownerDocument === x && b(x, t)) {
                        return 1
                    }
                    return c ? N(c, e) - N(c, t) : 0
                }
                return n & 4 ? -1 : 1
            }
            : function(e, t) {
                if (e === t) {
                    d = true;
                    return 0
                }
                var i, n = 0, r = e.parentNode, o = t.parentNode, s = [e], a = [t];
                if (!r || !o) {
                    return e === p ? -1 : t === p ? 1 : r ? -1 : o ? 1 : c ? N(c, e) - N(c, t) : 0
                } else if (r === o) {
                    return ce(e, t)
                }
                i = e;
                while (i = i.parentNode) {
                    s.unshift(i)
                }
                i = t;
                while (i = i.parentNode) {
                    a.unshift(i)
                }
                while (s[n] === a[n]) {
                    n++
                }
                return n ? ce(s[n], a[n]) : s[n] === x ? -1 : a[n] === x ? 1 : 0
            }
            ;
            return p
        }
        ;
        oe.matches = function(e, t) {
            return oe(e, null, null, t)
        }
        ;
        oe.matchesSelector = function(e, t) {
            if ((e.ownerDocument || e) !== p) {
                f(e)
            }
            t = t.replace(B, "='$1']");
            if (i.matchesSelector && g && !$[t + " "] && (!v || !v.test(t)) && (!m || !m.test(t))) {
                try {
                    var n = y.call(e, t);
                    if (n || i.disconnectedMatch || e.document && e.document.nodeType !== 11) {
                        return n
                    }
                } catch (e) {}
            }
            return oe(t, p, null, [e]).length > 0
        }
        ;
        oe.contains = function(e, t) {
            if ((e.ownerDocument || e) !== p) {
                f(e)
            }
            return b(e, t)
        }
        ;
        oe.attr = function(e, t) {
            if ((e.ownerDocument || e) !== p) {
                f(e)
            }
            var r = n.attrHandle[t.toLowerCase()]
              , o = r && E.call(n.attrHandle, t.toLowerCase()) ? r(e, t, !g) : undefined;
            return o !== undefined ? o : i.attributes || !g ? e.getAttribute(t) : (o = e.getAttributeNode(t)) && o.specified ? o.value : null
        }
        ;
        oe.escape = function(e) {
            return (e + "").replace(te, ie)
        }
        ;
        oe.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }
        ;
        oe.uniqueSort = function(e) {
            var t, n = [], r = 0, o = 0;
            d = !i.detectDuplicates;
            c = !i.sortStable && e.slice(0);
            e.sort(A);
            if (d) {
                while (t = e[o++]) {
                    if (t === e[o]) {
                        r = n.push(o)
                    }
                }
                while (r--) {
                    e.splice(n[r], 1)
                }
            }
            c = null;
            return e
        }
        ;
        r = oe.getText = function(e) {
            var t, i = "", n = 0, o = e.nodeType;
            if (!o) {
                while (t = e[n++]) {
                    i += r(t)
                }
            } else if (o === 1 || o === 9 || o === 11) {
                if (typeof e.textContent === "string") {
                    return e.textContent
                } else {
                    for (e = e.firstChild; e; e = e.nextSibling) {
                        i += r(e)
                    }
                }
            } else if (o === 3 || o === 4) {
                return e.nodeValue
            }
            return i
        }
        ;
        n = oe.selectors = {
            cacheLength: 50,
            createPseudo: ae,
            match: V,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: true
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: true
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    e[1] = e[1].replace(J, ee);
                    e[3] = (e[3] || e[4] || e[5] || "").replace(J, ee);
                    if (e[2] === "~=") {
                        e[3] = " " + e[3] + " "
                    }
                    return e.slice(0, 4)
                },
                CHILD: function(e) {
                    e[1] = e[1].toLowerCase();
                    if (e[1].slice(0, 3) === "nth") {
                        if (!e[3]) {
                            oe.error(e[0])
                        }
                        e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * (e[3] === "even" || e[3] === "odd"));
                        e[5] = +(e[7] + e[8] || e[3] === "odd")
                    } else if (e[3]) {
                        oe.error(e[0])
                    }
                    return e
                },
                PSEUDO: function(e) {
                    var t, i = !e[6] && e[2];
                    if (V["CHILD"].test(e[0])) {
                        return null
                    }
                    if (e[3]) {
                        e[2] = e[4] || e[5] || ""
                    } else if (i && U.test(i) && (t = s(i, true)) && (t = i.indexOf(")", i.length - t) - i.length)) {
                        e[0] = e[0].slice(0, t);
                        e[2] = i.slice(0, t)
                    }
                    return e.slice(0, 3)
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(J, ee).toLowerCase();
                    return e === "*" ? function() {
                        return true
                    }
                    : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = S[e + " "];
                    return t || (t = new RegExp("(^|" + P + ")" + e + "(" + P + "|$)")) && S(e, function(e) {
                        return t.test(typeof e.className === "string" && e.className || typeof e.getAttribute !== "undefined" && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, t, i) {
                    return function(n) {
                        var r = oe.attr(n, e);
                        if (r == null) {
                            return t === "!="
                        }
                        if (!t) {
                            return true
                        }
                        r += "";
                        return t === "=" ? r === i : t === "!=" ? r !== i : t === "^=" ? i && r.indexOf(i) === 0 : t === "*=" ? i && r.indexOf(i) > -1 : t === "$=" ? i && r.slice(-i.length) === i : t === "~=" ? (" " + r.replace(R, " ") + " ").indexOf(i) > -1 : t === "|=" ? r === i || r.slice(0, i.length + 1) === i + "-" : false
                    }
                },
                CHILD: function(e, t, i, n, r) {
                    var o = e.slice(0, 3) !== "nth"
                      , s = e.slice(-4) !== "last"
                      , a = t === "of-type";
                    return n === 1 && r === 0 ? function(e) {
                        return !!e.parentNode
                    }
                    : function(t, i, l) {
                        var u, c, d, f, p, h, g = o !== s ? "nextSibling" : "previousSibling", m = t.parentNode, v = a && t.nodeName.toLowerCase(), y = !l && !a, b = false;
                        if (m) {
                            if (o) {
                                while (g) {
                                    f = t;
                                    while (f = f[g]) {
                                        if (a ? f.nodeName.toLowerCase() === v : f.nodeType === 1) {
                                            return false
                                        }
                                    }
                                    h = g = e === "only" && !h && "nextSibling"
                                }
                                return true
                            }
                            h = [s ? m.firstChild : m.lastChild];
                            if (s && y) {
                                f = m;
                                d = f[w] || (f[w] = {});
                                c = d[f.uniqueID] || (d[f.uniqueID] = {});
                                u = c[e] || [];
                                p = u[0] === T && u[1];
                                b = p && u[2];
                                f = p && m.childNodes[p];
                                while (f = ++p && f && f[g] || (b = p = 0) || h.pop()) {
                                    if (f.nodeType === 1 && ++b && f === t) {
                                        c[e] = [T, p, b];
                                        break
                                    }
                                }
                            } else {
                                if (y) {
                                    f = t;
                                    d = f[w] || (f[w] = {});
                                    c = d[f.uniqueID] || (d[f.uniqueID] = {});
                                    u = c[e] || [];
                                    p = u[0] === T && u[1];
                                    b = p
                                }
                                if (b === false) {
                                    while (f = ++p && f && f[g] || (b = p = 0) || h.pop()) {
                                        if ((a ? f.nodeName.toLowerCase() === v : f.nodeType === 1) && ++b) {
                                            if (y) {
                                                d = f[w] || (f[w] = {});
                                                c = d[f.uniqueID] || (d[f.uniqueID] = {});
                                                c[e] = [T, b]
                                            }
                                            if (f === t) {
                                                break
                                            }
                                        }
                                    }
                                }
                            }
                            b -= r;
                            return b === n || b % n === 0 && b / n >= 0
                        }
                    }
                },
                PSEUDO: function(e, t) {
                    var i, r = n.pseudos[e] || n.setFilters[e.toLowerCase()] || oe.error("unsupported pseudo: " + e);
                    if (r[w]) {
                        return r(t)
                    }
                    if (r.length > 1) {
                        i = [e, e, "", t];
                        return n.setFilters.hasOwnProperty(e.toLowerCase()) ? ae(function(e, i) {
                            var n, o = r(e, t), s = o.length;
                            while (s--) {
                                n = N(e, o[s]);
                                e[n] = !(i[n] = o[s])
                            }
                        }) : function(e) {
                            return r(e, 0, i)
                        }
                    }
                    return r
                }
            },
            pseudos: {
                not: ae(function(e) {
                    var t = []
                      , i = []
                      , n = a(e.replace(z, "$1"));
                    return n[w] ? ae(function(e, t, i, r) {
                        var o, s = n(e, null, r, []), a = e.length;
                        while (a--) {
                            if (o = s[a]) {
                                e[a] = !(t[a] = o)
                            }
                        }
                    }) : function(e, r, o) {
                        t[0] = e;
                        n(t, null, o, i);
                        t[0] = null;
                        return !i.pop()
                    }
                }),
                has: ae(function(e) {
                    return function(t) {
                        return oe(e, t).length > 0
                    }
                }),
                contains: ae(function(e) {
                    e = e.replace(J, ee);
                    return function(t) {
                        return (t.textContent || t.innerText || r(t)).indexOf(e) > -1
                    }
                }),
                lang: ae(function(e) {
                    if (!G.test(e || "")) {
                        oe.error("unsupported lang: " + e)
                    }
                    e = e.replace(J, ee).toLowerCase();
                    return function(t) {
                        var i;
                        do {
                            if (i = g ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) {
                                i = i.toLowerCase();
                                return i === e || i.indexOf(e + "-") === 0
                            }
                        } while ((t = t.parentNode) && t.nodeType === 1);return false
                    }
                }),
                target: function(t) {
                    var i = e.location && e.location.hash;
                    return i && i.slice(1) === t.id
                },
                root: function(e) {
                    return e === h
                },
                focus: function(e) {
                    return e === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: pe(false),
                disabled: pe(true),
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return t === "input" && !!e.checked || t === "option" && !!e.selected
                },
                selected: function(e) {
                    if (e.parentNode) {
                        e.parentNode.selectedIndex
                    }
                    return e.selected === true
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling) {
                        if (e.nodeType < 6) {
                            return false
                        }
                    }
                    return true
                },
                parent: function(e) {
                    return !n.pseudos["empty"](e)
                },
                header: function(e) {
                    return X.test(e.nodeName)
                },
                input: function(e) {
                    return Y.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return t === "input" && e.type === "button" || t === "button"
                },
                text: function(e) {
                    var t;
                    return e.nodeName.toLowerCase() === "input" && e.type === "text" && ((t = e.getAttribute("type")) == null || t.toLowerCase() === "text")
                },
                first: he(function() {
                    return [0]
                }),
                last: he(function(e, t) {
                    return [t - 1]
                }),
                eq: he(function(e, t, i) {
                    return [i < 0 ? i + t : i]
                }),
                even: he(function(e, t) {
                    var i = 0;
                    for (; i < t; i += 2) {
                        e.push(i)
                    }
                    return e
                }),
                odd: he(function(e, t) {
                    var i = 1;
                    for (; i < t; i += 2) {
                        e.push(i)
                    }
                    return e
                }),
                lt: he(function(e, t, i) {
                    var n = i < 0 ? i + t : i;
                    for (; --n >= 0; ) {
                        e.push(n)
                    }
                    return e
                }),
                gt: he(function(e, t, i) {
                    var n = i < 0 ? i + t : i;
                    for (; ++n < t; ) {
                        e.push(n)
                    }
                    return e
                })
            }
        };
        n.pseudos["nth"] = n.pseudos["eq"];
        for (t in {
            radio: true,
            checkbox: true,
            file: true,
            password: true,
            image: true
        }) {
            n.pseudos[t] = de(t)
        }
        for (t in {
            submit: true,
            reset: true
        }) {
            n.pseudos[t] = fe(t)
        }
        function me() {}
        me.prototype = n.filters = n.pseudos;
        n.setFilters = new me;
        s = oe.tokenize = function(e, t) {
            var i, r, o, s, a, l, u, c = k[e + " "];
            if (c) {
                return t ? 0 : c.slice(0)
            }
            a = e;
            l = [];
            u = n.preFilter;
            while (a) {
                if (!i || (r = F.exec(a))) {
                    if (r) {
                        a = a.slice(r[0].length) || a
                    }
                    l.push(o = [])
                }
                i = false;
                if (r = W.exec(a)) {
                    i = r.shift();
                    o.push({
                        value: i,
                        type: r[0].replace(z, " ")
                    });
                    a = a.slice(i.length)
                }
                for (s in n.filter) {
                    if ((r = V[s].exec(a)) && (!u[s] || (r = u[s](r)))) {
                        i = r.shift();
                        o.push({
                            value: i,
                            type: s,
                            matches: r
                        });
                        a = a.slice(i.length)
                    }
                }
                if (!i) {
                    break
                }
            }
            return t ? a.length : a ? oe.error(e) : k(e, l).slice(0)
        }
        ;
        function ve(e) {
            var t = 0
              , i = e.length
              , n = "";
            for (; t < i; t++) {
                n += e[t].value
            }
            return n
        }
        function ye(e, t, i) {
            var n = t.dir
              , r = t.next
              , o = r || n
              , s = i && o === "parentNode"
              , a = C++;
            return t.first ? function(t, i, r) {
                while (t = t[n]) {
                    if (t.nodeType === 1 || s) {
                        return e(t, i, r)
                    }
                }
                return false
            }
            : function(t, i, l) {
                var u, c, d, f = [T, a];
                if (l) {
                    while (t = t[n]) {
                        if (t.nodeType === 1 || s) {
                            if (e(t, i, l)) {
                                return true
                            }
                        }
                    }
                } else {
                    while (t = t[n]) {
                        if (t.nodeType === 1 || s) {
                            d = t[w] || (t[w] = {});
                            c = d[t.uniqueID] || (d[t.uniqueID] = {});
                            if (r && r === t.nodeName.toLowerCase()) {
                                t = t[n] || t
                            } else if ((u = c[o]) && u[0] === T && u[1] === a) {
                                return f[2] = u[2]
                            } else {
                                c[o] = f;
                                if (f[2] = e(t, i, l)) {
                                    return true
                                }
                            }
                        }
                    }
                }
                return false
            }
        }
        function be(e) {
            return e.length > 1 ? function(t, i, n) {
                var r = e.length;
                while (r--) {
                    if (!e[r](t, i, n)) {
                        return false
                    }
                }
                return true
            }
            : e[0]
        }
        function we(e, t, i) {
            var n = 0
              , r = t.length;
            for (; n < r; n++) {
                oe(e, t[n], i)
            }
            return i
        }
        function xe(e, t, i, n, r) {
            var o, s = [], a = 0, l = e.length, u = t != null;
            for (; a < l; a++) {
                if (o = e[a]) {
                    if (!i || i(o, n, r)) {
                        s.push(o);
                        if (u) {
                            t.push(a)
                        }
                    }
                }
            }
            return s
        }
        function Te(e, t, i, n, r, o) {
            if (n && !n[w]) {
                n = Te(n)
            }
            if (r && !r[w]) {
                r = Te(r, o)
            }
            return ae(function(o, s, a, l) {
                var u, c, d, f = [], p = [], h = s.length, g = o || we(t || "*", a.nodeType ? [a] : a, []), m = e && (o || !t) ? xe(g, f, e, a, l) : g, v = i ? r || (o ? e : h || n) ? [] : s : m;
                if (i) {
                    i(m, v, a, l)
                }
                if (n) {
                    u = xe(v, p);
                    n(u, [], a, l);
                    c = u.length;
                    while (c--) {
                        if (d = u[c]) {
                            v[p[c]] = !(m[p[c]] = d)
                        }
                    }
                }
                if (o) {
                    if (r || e) {
                        if (r) {
                            u = [];
                            c = v.length;
                            while (c--) {
                                if (d = v[c]) {
                                    u.push(m[c] = d)
                                }
                            }
                            r(null, v = [], u, l)
                        }
                        c = v.length;
                        while (c--) {
                            if ((d = v[c]) && (u = r ? N(o, d) : f[c]) > -1) {
                                o[u] = !(s[u] = d)
                            }
                        }
                    }
                } else {
                    v = xe(v === s ? v.splice(h, v.length) : v);
                    if (r) {
                        r(null, s, v, l)
                    } else {
                        I.apply(s, v)
                    }
                }
            })
        }
        function Ce(e) {
            var t, i, r, o = e.length, s = n.relative[e[0].type], a = s || n.relative[" "], l = s ? 1 : 0, c = ye(function(e) {
                return e === t
            }, a, true), d = ye(function(e) {
                return N(t, e) > -1
            }, a, true), f = [function(e, i, n) {
                var r = !s && (n || i !== u) || ((t = i).nodeType ? c(e, i, n) : d(e, i, n));
                t = null;
                return r
            }
            ];
            for (; l < o; l++) {
                if (i = n.relative[e[l].type]) {
                    f = [ye(be(f), i)]
                } else {
                    i = n.filter[e[l].type].apply(null, e[l].matches);
                    if (i[w]) {
                        r = ++l;
                        for (; r < o; r++) {
                            if (n.relative[e[r].type]) {
                                break
                            }
                        }
                        return Te(l > 1 && be(f), l > 1 && ve(e.slice(0, l - 1).concat({
                            value: e[l - 2].type === " " ? "*" : ""
                        })).replace(z, "$1"), i, l < r && Ce(e.slice(l, r)), r < o && Ce(e = e.slice(r)), r < o && ve(e))
                    }
                    f.push(i)
                }
            }
            return be(f)
        }
        function Se(e, t) {
            var i = t.length > 0
              , r = e.length > 0
              , o = function(o, s, a, l, c) {
                var d, h, m, v = 0, y = "0", b = o && [], w = [], x = u, C = o || r && n.find["TAG"]("*", c), S = T += x == null ? 1 : Math.random() || .1, k = C.length;
                if (c) {
                    u = s === p || s || c
                }
                for (; y !== k && (d = C[y]) != null; y++) {
                    if (r && d) {
                        h = 0;
                        if (!s && d.ownerDocument !== p) {
                            f(d);
                            a = !g
                        }
                        while (m = e[h++]) {
                            if (m(d, s || p, a)) {
                                l.push(d);
                                break
                            }
                        }
                        if (c) {
                            T = S
                        }
                    }
                    if (i) {
                        if (d = !m && d) {
                            v--
                        }
                        if (o) {
                            b.push(d)
                        }
                    }
                }
                v += y;
                if (i && y !== v) {
                    h = 0;
                    while (m = t[h++]) {
                        m(b, w, s, a)
                    }
                    if (o) {
                        if (v > 0) {
                            while (y--) {
                                if (!(b[y] || w[y])) {
                                    w[y] = D.call(l)
                                }
                            }
                        }
                        w = xe(w)
                    }
                    I.apply(l, w);
                    if (c && !o && w.length > 0 && v + t.length > 1) {
                        oe.uniqueSort(l)
                    }
                }
                if (c) {
                    T = S;
                    u = x
                }
                return b
            };
            return i ? ae(o) : o
        }
        a = oe.compile = function(e, t) {
            var i, n = [], r = [], o = $[e + " "];
            if (!o) {
                if (!t) {
                    t = s(e)
                }
                i = t.length;
                while (i--) {
                    o = Ce(t[i]);
                    if (o[w]) {
                        n.push(o)
                    } else {
                        r.push(o)
                    }
                }
                o = $(e, Se(r, n));
                o.selector = e
            }
            return o
        }
        ;
        l = oe.select = function(e, t, i, r) {
            var o, l, u, c, d, f = typeof e === "function" && e, p = !r && s(e = f.selector || e);
            i = i || [];
            if (p.length === 1) {
                l = p[0] = p[0].slice(0);
                if (l.length > 2 && (u = l[0]).type === "ID" && t.nodeType === 9 && g && n.relative[l[1].type]) {
                    t = (n.find["ID"](u.matches[0].replace(J, ee), t) || [])[0];
                    if (!t) {
                        return i
                    } else if (f) {
                        t = t.parentNode
                    }
                    e = e.slice(l.shift().value.length)
                }
                o = V["needsContext"].test(e) ? 0 : l.length;
                while (o--) {
                    u = l[o];
                    if (n.relative[c = u.type]) {
                        break
                    }
                    if (d = n.find[c]) {
                        if (r = d(u.matches[0].replace(J, ee), Z.test(l[0].type) && ge(t.parentNode) || t)) {
                            l.splice(o, 1);
                            e = r.length && ve(l);
                            if (!e) {
                                I.apply(i, r);
                                return i
                            }
                            break
                        }
                    }
                }
            }
            (f || a(e, p))(r, t, !g, i, !t || Z.test(e) && ge(t.parentNode) || t);
            return i
        }
        ;
        i.sortStable = w.split("").sort(A).join("") === w;
        i.detectDuplicates = !!d;
        f();
        i.sortDetached = le(function(e) {
            return e.compareDocumentPosition(p.createElement("fieldset")) & 1
        });
        if (!le(function(e) {
            e.innerHTML = "<a href='#'></a>";
            return e.firstChild.getAttribute("href") === "#"
        })) {
            ue("type|href|height|width", function(e, t, i) {
                if (!i) {
                    return e.getAttribute(t, t.toLowerCase() === "type" ? 1 : 2)
                }
            })
        }
        if (!i.attributes || !le(function(e) {
            e.innerHTML = "<input/>";
            e.firstChild.setAttribute("value", "");
            return e.firstChild.getAttribute("value") === ""
        })) {
            ue("value", function(e, t, i) {
                if (!i && e.nodeName.toLowerCase() === "input") {
                    return e.defaultValue
                }
            })
        }
        if (!le(function(e) {
            return e.getAttribute("disabled") == null
        })) {
            ue(j, function(e, t, i) {
                var n;
                if (!i) {
                    return e[t] === true ? t.toLowerCase() : (n = e.getAttributeNode(t)) && n.specified ? n.value : null
                }
            })
        }
        return oe
    }(e);
    x.find = S;
    x.expr = S.selectors;
    x.expr[":"] = x.expr.pseudos;
    x.uniqueSort = x.unique = S.uniqueSort;
    x.text = S.getText;
    x.isXMLDoc = S.isXML;
    x.contains = S.contains;
    x.escapeSelector = S.escape;
    var k = function(e, t, i) {
        var n = []
          , r = i !== undefined;
        while ((e = e[t]) && e.nodeType !== 9) {
            if (e.nodeType === 1) {
                if (r && x(e).is(i)) {
                    break
                }
                n.push(e)
            }
        }
        return n
    };
    var $ = function(e, t) {
        var i = [];
        for (; e; e = e.nextSibling) {
            if (e.nodeType === 1 && e !== t) {
                i.push(e)
            }
        }
        return i
    };
    var A = x.expr.match.needsContext;
    function E(e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }
    var _ = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    function D(e, t, i) {
        if (g(t)) {
            return x.grep(e, function(e, n) {
                return !!t.call(e, n, e) !== i
            })
        }
        if (t.nodeType) {
            return x.grep(e, function(e) {
                return e === t !== i
            })
        }
        if (typeof t !== "string") {
            return x.grep(e, function(e) {
                return l.call(t, e) > -1 !== i
            })
        }
        return x.filter(t, e, i)
    }
    x.filter = function(e, t, i) {
        var n = t[0];
        if (i) {
            e = ":not(" + e + ")"
        }
        if (t.length === 1 && n.nodeType === 1) {
            return x.find.matchesSelector(n, e) ? [n] : []
        }
        return x.find.matches(e, x.grep(t, function(e) {
            return e.nodeType === 1
        }))
    }
    ;
    x.fn.extend({
        find: function(e) {
            var t, i, n = this.length, r = this;
            if (typeof e !== "string") {
                return this.pushStack(x(e).filter(function() {
                    for (t = 0; t < n; t++) {
                        if (x.contains(r[t], this)) {
                            return true
                        }
                    }
                }))
            }
            i = this.pushStack([]);
            for (t = 0; t < n; t++) {
                x.find(e, r[t], i)
            }
            return n > 1 ? x.uniqueSort(i) : i
        },
        filter: function(e) {
            return this.pushStack(D(this, e || [], false))
        },
        not: function(e) {
            return this.pushStack(D(this, e || [], true))
        },
        is: function(e) {
            return !!D(this, typeof e === "string" && A.test(e) ? x(e) : e || [], false).length
        }
    });
    var O, I = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, L = x.fn.init = function(e, t, i) {
        var r, o;
        if (!e) {
            return this
        }
        i = i || O;
        if (typeof e === "string") {
            if (e[0] === "<" && e[e.length - 1] === ">" && e.length >= 3) {
                r = [null, e, null]
            } else {
                r = I.exec(e)
            }
            if (r && (r[1] || !t)) {
                if (r[1]) {
                    t = t instanceof x ? t[0] : t;
                    x.merge(this, x.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : n, true));
                    if (_.test(r[1]) && x.isPlainObject(t)) {
                        for (r in t) {
                            if (g(this[r])) {
                                this[r](t[r])
                            } else {
                                this.attr(r, t[r])
                            }
                        }
                    }
                    return this
                } else {
                    o = n.getElementById(r[2]);
                    if (o) {
                        this[0] = o;
                        this.length = 1
                    }
                    return this
                }
            } else if (!t || t.jquery) {
                return (t || i).find(e)
            } else {
                return this.constructor(t).find(e)
            }
        } else if (e.nodeType) {
            this[0] = e;
            this.length = 1;
            return this
        } else if (g(e)) {
            return i.ready !== undefined ? i.ready(e) : e(x)
        }
        return x.makeArray(e, this)
    }
    ;
    L.prototype = x.fn;
    O = x(n);
    var N = /^(?:parents|prev(?:Until|All))/
      , j = {
        children: true,
        contents: true,
        next: true,
        prev: true
    };
    x.fn.extend({
        has: function(e) {
            var t = x(e, this)
              , i = t.length;
            return this.filter(function() {
                var e = 0;
                for (; e < i; e++) {
                    if (x.contains(this, t[e])) {
                        return true
                    }
                }
            })
        },
        closest: function(e, t) {
            var i, n = 0, r = this.length, o = [], s = typeof e !== "string" && x(e);
            if (!A.test(e)) {
                for (; n < r; n++) {
                    for (i = this[n]; i && i !== t; i = i.parentNode) {
                        if (i.nodeType < 11 && (s ? s.index(i) > -1 : i.nodeType === 1 && x.find.matchesSelector(i, e))) {
                            o.push(i);
                            break
                        }
                    }
                }
            }
            return this.pushStack(o.length > 1 ? x.uniqueSort(o) : o)
        },
        index: function(e) {
            if (!e) {
                return this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            }
            if (typeof e === "string") {
                return l.call(x(e), this[0])
            }
            return l.call(this, e.jquery ? e[0] : e)
        },
        add: function(e, t) {
            return this.pushStack(x.uniqueSort(x.merge(this.get(), x(e, t))))
        },
        addBack: function(e) {
            return this.add(e == null ? this.prevObject : this.prevObject.filter(e))
        }
    });
    function P(e, t) {
        while ((e = e[t]) && e.nodeType !== 1) {}
        return e
    }
    x.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && t.nodeType !== 11 ? t : null
        },
        parents: function(e) {
            return k(e, "parentNode")
        },
        parentsUntil: function(e, t, i) {
            return k(e, "parentNode", i)
        },
        next: function(e) {
            return P(e, "nextSibling")
        },
        prev: function(e) {
            return P(e, "previousSibling")
        },
        nextAll: function(e) {
            return k(e, "nextSibling")
        },
        prevAll: function(e) {
            return k(e, "previousSibling")
        },
        nextUntil: function(e, t, i) {
            return k(e, "nextSibling", i)
        },
        prevUntil: function(e, t, i) {
            return k(e, "previousSibling", i)
        },
        siblings: function(e) {
            return $((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return $(e.firstChild)
        },
        contents: function(e) {
            if (E(e, "iframe")) {
                return e.contentDocument
            }
            if (E(e, "template")) {
                e = e.content || e
            }
            return x.merge([], e.childNodes)
        }
    }, function(e, t) {
        x.fn[e] = function(i, n) {
            var r = x.map(this, t, i);
            if (e.slice(-5) !== "Until") {
                n = i
            }
            if (n && typeof n === "string") {
                r = x.filter(n, r)
            }
            if (this.length > 1) {
                if (!j[e]) {
                    x.uniqueSort(r)
                }
                if (N.test(e)) {
                    r.reverse()
                }
            }
            return this.pushStack(r)
        }
    });
    var q = /[^\x20\t\r\n\f]+/g;
    function H(e) {
        var t = {};
        x.each(e.match(q) || [], function(e, i) {
            t[i] = true
        });
        return t
    }
    x.Callbacks = function(e) {
        e = typeof e === "string" ? H(e) : x.extend({}, e);
        var t, i, n, r, o = [], s = [], a = -1, l = function() {
            r = r || e.once;
            n = t = true;
            for (; s.length; a = -1) {
                i = s.shift();
                while (++a < o.length) {
                    if (o[a].apply(i[0], i[1]) === false && e.stopOnFalse) {
                        a = o.length;
                        i = false
                    }
                }
            }
            if (!e.memory) {
                i = false
            }
            t = false;
            if (r) {
                if (i) {
                    o = []
                } else {
                    o = ""
                }
            }
        }, u = {
            add: function() {
                if (o) {
                    if (i && !t) {
                        a = o.length - 1;
                        s.push(i)
                    }
                    (function t(i) {
                        x.each(i, function(i, n) {
                            if (g(n)) {
                                if (!e.unique || !u.has(n)) {
                                    o.push(n)
                                }
                            } else if (n && n.length && b(n) !== "string") {
                                t(n)
                            }
                        })
                    }
                    )(arguments);
                    if (i && !t) {
                        l()
                    }
                }
                return this
            },
            remove: function() {
                x.each(arguments, function(e, t) {
                    var i;
                    while ((i = x.inArray(t, o, i)) > -1) {
                        o.splice(i, 1);
                        if (i <= a) {
                            a--
                        }
                    }
                });
                return this
            },
            has: function(e) {
                return e ? x.inArray(e, o) > -1 : o.length > 0
            },
            empty: function() {
                if (o) {
                    o = []
                }
                return this
            },
            disable: function() {
                r = s = [];
                o = i = "";
                return this
            },
            disabled: function() {
                return !o
            },
            lock: function() {
                r = s = [];
                if (!i && !t) {
                    o = i = ""
                }
                return this
            },
            locked: function() {
                return !!r
            },
            fireWith: function(e, i) {
                if (!r) {
                    i = i || [];
                    i = [e, i.slice ? i.slice() : i];
                    s.push(i);
                    if (!t) {
                        l()
                    }
                }
                return this
            },
            fire: function() {
                u.fireWith(this, arguments);
                return this
            },
            fired: function() {
                return !!n
            }
        };
        return u
    }
    ;
    function M(e) {
        return e
    }
    function R(e) {
        throw e
    }
    function z(e, t, i, n) {
        var r;
        try {
            if (e && g(r = e.promise)) {
                r.call(e).done(t).fail(i)
            } else if (e && g(r = e.then)) {
                r.call(e, t, i)
            } else {
                t.apply(undefined, [e].slice(n))
            }
        } catch (e) {
            i.apply(undefined, [e])
        }
    }
    x.extend({
        Deferred: function(t) {
            var i = [["notify", "progress", x.Callbacks("memory"), x.Callbacks("memory"), 2], ["resolve", "done", x.Callbacks("once memory"), x.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", x.Callbacks("once memory"), x.Callbacks("once memory"), 1, "rejected"]]
              , n = "pending"
              , r = {
                state: function() {
                    return n
                },
                always: function() {
                    o.done(arguments).fail(arguments);
                    return this
                },
                catch: function(e) {
                    return r.then(null, e)
                },
                pipe: function() {
                    var e = arguments;
                    return x.Deferred(function(t) {
                        x.each(i, function(i, n) {
                            var r = g(e[n[4]]) && e[n[4]];
                            o[n[1]](function() {
                                var e = r && r.apply(this, arguments);
                                if (e && g(e.promise)) {
                                    e.promise().progress(t.notify).done(t.resolve).fail(t.reject)
                                } else {
                                    t[n[0] + "With"](this, r ? [e] : arguments)
                                }
                            })
                        });
                        e = null
                    }).promise()
                },
                then: function(t, n, r) {
                    var o = 0;
                    function s(t, i, n, r) {
                        return function() {
                            var a = this
                              , l = arguments
                              , u = function() {
                                var e, u;
                                if (t < o) {
                                    return
                                }
                                e = n.apply(a, l);
                                if (e === i.promise()) {
                                    throw new TypeError("Thenable self-resolution")
                                }
                                u = e && (typeof e === "object" || typeof e === "function") && e.then;
                                if (g(u)) {
                                    if (r) {
                                        u.call(e, s(o, i, M, r), s(o, i, R, r))
                                    } else {
                                        o++;
                                        u.call(e, s(o, i, M, r), s(o, i, R, r), s(o, i, M, i.notifyWith))
                                    }
                                } else {
                                    if (n !== M) {
                                        a = undefined;
                                        l = [e]
                                    }
                                    (r || i.resolveWith)(a, l)
                                }
                            }
                              , c = r ? u : function() {
                                try {
                                    u()
                                } catch (e) {
                                    if (x.Deferred.exceptionHook) {
                                        x.Deferred.exceptionHook(e, c.stackTrace)
                                    }
                                    if (t + 1 >= o) {
                                        if (n !== R) {
                                            a = undefined;
                                            l = [e]
                                        }
                                        i.rejectWith(a, l)
                                    }
                                }
                            }
                            ;
                            if (t) {
                                c()
                            } else {
                                if (x.Deferred.getStackHook) {
                                    c.stackTrace = x.Deferred.getStackHook()
                                }
                                e.setTimeout(c)
                            }
                        }
                    }
                    return x.Deferred(function(e) {
                        i[0][3].add(s(0, e, g(r) ? r : M, e.notifyWith));
                        i[1][3].add(s(0, e, g(t) ? t : M));
                        i[2][3].add(s(0, e, g(n) ? n : R))
                    }).promise()
                },
                promise: function(e) {
                    return e != null ? x.extend(e, r) : r
                }
            }
              , o = {};
            x.each(i, function(e, t) {
                var s = t[2]
                  , a = t[5];
                r[t[1]] = s.add;
                if (a) {
                    s.add(function() {
                        n = a
                    }, i[3 - e][2].disable, i[3 - e][3].disable, i[0][2].lock, i[0][3].lock)
                }
                s.add(t[3].fire);
                o[t[0]] = function() {
                    o[t[0] + "With"](this === o ? undefined : this, arguments);
                    return this
                }
                ;
                o[t[0] + "With"] = s.fireWith
            });
            r.promise(o);
            if (t) {
                t.call(o, o)
            }
            return o
        },
        when: function(e) {
            var t = arguments.length
              , i = t
              , n = Array(i)
              , r = o.call(arguments)
              , s = x.Deferred()
              , a = function(e) {
                return function(i) {
                    n[e] = this;
                    r[e] = arguments.length > 1 ? o.call(arguments) : i;
                    if (!--t) {
                        s.resolveWith(n, r)
                    }
                }
            };
            if (t <= 1) {
                z(e, s.done(a(i)).resolve, s.reject, !t);
                if (s.state() === "pending" || g(r[i] && r[i].then)) {
                    return s.then()
                }
            }
            while (i--) {
                z(r[i], a(i), s.reject)
            }
            return s.promise()
        }
    });
    var F = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    x.Deferred.exceptionHook = function(t, i) {
        if (e.console && e.console.warn && t && F.test(t.name)) {
            e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, i)
        }
    }
    ;
    x.readyException = function(t) {
        e.setTimeout(function() {
            throw t
        })
    }
    ;
    var W = x.Deferred();
    x.fn.ready = function(e) {
        W.then(e).catch(function(e) {
            x.readyException(e)
        });
        return this
    }
    ;
    x.extend({
        isReady: false,
        readyWait: 1,
        ready: function(e) {
            if (e === true ? --x.readyWait : x.isReady) {
                return
            }
            x.isReady = true;
            if (e !== true && --x.readyWait > 0) {
                return
            }
            W.resolveWith(n, [x])
        }
    });
    x.ready.then = W.then;
    function B() {
        n.removeEventListener("DOMContentLoaded", B);
        e.removeEventListener("load", B);
        x.ready()
    }
    if (n.readyState === "complete" || n.readyState !== "loading" && !n.documentElement.doScroll) {
        e.setTimeout(x.ready)
    } else {
        n.addEventListener("DOMContentLoaded", B);
        e.addEventListener("load", B)
    }
    var U = function(e, t, i, n, r, o, s) {
        var a = 0
          , l = e.length
          , u = i == null;
        if (b(i) === "object") {
            r = true;
            for (a in i) {
                U(e, t, a, i[a], true, o, s)
            }
        } else if (n !== undefined) {
            r = true;
            if (!g(n)) {
                s = true
            }
            if (u) {
                if (s) {
                    t.call(e, n);
                    t = null
                } else {
                    u = t;
                    t = function(e, t, i) {
                        return u.call(x(e), i)
                    }
                }
            }
            if (t) {
                for (; a < l; a++) {
                    t(e[a], i, s ? n : n.call(e[a], a, t(e[a], i)))
                }
            }
        }
        if (r) {
            return e
        }
        if (u) {
            return t.call(e)
        }
        return l ? t(e[0], i) : o
    };
    var G = /^-ms-/
      , V = /-([a-z])/g;
    function Y(e, t) {
        return t.toUpperCase()
    }
    function X(e) {
        return e.replace(G, "ms-").replace(V, Y)
    }
    var K = function(e) {
        return e.nodeType === 1 || e.nodeType === 9 || !+e.nodeType
    };
    function Q() {
        this.expando = x.expando + Q.uid++
    }
    Q.uid = 1;
    Q.prototype = {
        cache: function(e) {
            var t = e[this.expando];
            if (!t) {
                t = {};
                if (K(e)) {
                    if (e.nodeType) {
                        e[this.expando] = t
                    } else {
                        Object.defineProperty(e, this.expando, {
                            value: t,
                            configurable: true
                        })
                    }
                }
            }
            return t
        },
        set: function(e, t, i) {
            var n, r = this.cache(e);
            if (typeof t === "string") {
                r[X(t)] = i
            } else {
                for (n in t) {
                    r[X(n)] = t[n]
                }
            }
            return r
        },
        get: function(e, t) {
            return t === undefined ? this.cache(e) : e[this.expando] && e[this.expando][X(t)]
        },
        access: function(e, t, i) {
            if (t === undefined || t && typeof t === "string" && i === undefined) {
                return this.get(e, t)
            }
            this.set(e, t, i);
            return i !== undefined ? i : t
        },
        remove: function(e, t) {
            var i, n = e[this.expando];
            if (n === undefined) {
                return
            }
            if (t !== undefined) {
                if (Array.isArray(t)) {
                    t = t.map(X)
                } else {
                    t = X(t);
                    t = t in n ? [t] : t.match(q) || []
                }
                i = t.length;
                while (i--) {
                    delete n[t[i]]
                }
            }
            if (t === undefined || x.isEmptyObject(n)) {
                if (e.nodeType) {
                    e[this.expando] = undefined
                } else {
                    delete e[this.expando]
                }
            }
        },
        hasData: function(e) {
            var t = e[this.expando];
            return t !== undefined && !x.isEmptyObject(t)
        }
    };
    var Z = new Q;
    var J = new Q;
    var ee = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
      , te = /[A-Z]/g;
    function ie(e) {
        if (e === "true") {
            return true
        }
        if (e === "false") {
            return false
        }
        if (e === "null") {
            return null
        }
        if (e === +e + "") {
            return +e
        }
        if (ee.test(e)) {
            return JSON.parse(e)
        }
        return e
    }
    function ne(e, t, i) {
        var n;
        if (i === undefined && e.nodeType === 1) {
            n = "data-" + t.replace(te, "-$&").toLowerCase();
            i = e.getAttribute(n);
            if (typeof i === "string") {
                try {
                    i = ie(i)
                } catch (e) {}
                J.set(e, t, i)
            } else {
                i = undefined
            }
        }
        return i
    }
    x.extend({
        hasData: function(e) {
            return J.hasData(e) || Z.hasData(e)
        },
        data: function(e, t, i) {
            return J.access(e, t, i)
        },
        removeData: function(e, t) {
            J.remove(e, t)
        },
        _data: function(e, t, i) {
            return Z.access(e, t, i)
        },
        _removeData: function(e, t) {
            Z.remove(e, t)
        }
    });
    x.fn.extend({
        data: function(e, t) {
            var i, n, r, o = this[0], s = o && o.attributes;
            if (e === undefined) {
                if (this.length) {
                    r = J.get(o);
                    if (o.nodeType === 1 && !Z.get(o, "hasDataAttrs")) {
                        i = s.length;
                        while (i--) {
                            if (s[i]) {
                                n = s[i].name;
                                if (n.indexOf("data-") === 0) {
                                    n = X(n.slice(5));
                                    ne(o, n, r[n])
                                }
                            }
                        }
                        Z.set(o, "hasDataAttrs", true)
                    }
                }
                return r
            }
            if (typeof e === "object") {
                return this.each(function() {
                    J.set(this, e)
                })
            }
            return U(this, function(t) {
                var i;
                if (o && t === undefined) {
                    i = J.get(o, e);
                    if (i !== undefined) {
                        return i
                    }
                    i = ne(o, e);
                    if (i !== undefined) {
                        return i
                    }
                    return
                }
                this.each(function() {
                    J.set(this, e, t)
                })
            }, null, t, arguments.length > 1, null, true)
        },
        removeData: function(e) {
            return this.each(function() {
                J.remove(this, e)
            })
        }
    });
    x.extend({
        queue: function(e, t, i) {
            var n;
            if (e) {
                t = (t || "fx") + "queue";
                n = Z.get(e, t);
                if (i) {
                    if (!n || Array.isArray(i)) {
                        n = Z.access(e, t, x.makeArray(i))
                    } else {
                        n.push(i)
                    }
                }
                return n || []
            }
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var i = x.queue(e, t)
              , n = i.length
              , r = i.shift()
              , o = x._queueHooks(e, t)
              , s = function() {
                x.dequeue(e, t)
            };
            if (r === "inprogress") {
                r = i.shift();
                n--
            }
            if (r) {
                if (t === "fx") {
                    i.unshift("inprogress")
                }
                delete o.stop;
                r.call(e, s, o)
            }
            if (!n && o) {
                o.empty.fire()
            }
        },
        _queueHooks: function(e, t) {
            var i = t + "queueHooks";
            return Z.get(e, i) || Z.access(e, i, {
                empty: x.Callbacks("once memory").add(function() {
                    Z.remove(e, [t + "queue", i])
                })
            })
        }
    });
    x.fn.extend({
        queue: function(e, t) {
            var i = 2;
            if (typeof e !== "string") {
                t = e;
                e = "fx";
                i--
            }
            if (arguments.length < i) {
                return x.queue(this[0], e)
            }
            return t === undefined ? this : this.each(function() {
                var i = x.queue(this, e, t);
                x._queueHooks(this, e);
                if (e === "fx" && i[0] !== "inprogress") {
                    x.dequeue(this, e)
                }
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                x.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var i, n = 1, r = x.Deferred(), o = this, s = this.length, a = function() {
                if (!--n) {
                    r.resolveWith(o, [o])
                }
            };
            if (typeof e !== "string") {
                t = e;
                e = undefined
            }
            e = e || "fx";
            while (s--) {
                i = Z.get(o[s], e + "queueHooks");
                if (i && i.empty) {
                    n++;
                    i.empty.add(a)
                }
            }
            a();
            return r.promise(t)
        }
    });
    var re = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
    var oe = new RegExp("^(?:([+-])=|)(" + re + ")([a-z%]*)$","i");
    var se = ["Top", "Right", "Bottom", "Left"];
    var ae = function(e, t) {
        e = t || e;
        return e.style.display === "none" || e.style.display === "" && x.contains(e.ownerDocument, e) && x.css(e, "display") === "none"
    };
    var le = function(e, t, i, n) {
        var r, o, s = {};
        for (o in t) {
            s[o] = e.style[o];
            e.style[o] = t[o]
        }
        r = i.apply(e, n || []);
        for (o in t) {
            e.style[o] = s[o]
        }
        return r
    };
    function ue(e, t, i, n) {
        var r, o, s = 20, a = n ? function() {
            return n.cur()
        }
        : function() {
            return x.css(e, t, "")
        }
        , l = a(), u = i && i[3] || (x.cssNumber[t] ? "" : "px"), c = (x.cssNumber[t] || u !== "px" && +l) && oe.exec(x.css(e, t));
        if (c && c[3] !== u) {
            l = l / 2;
            u = u || c[3];
            c = +l || 1;
            while (s--) {
                x.style(e, t, c + u);
                if ((1 - o) * (1 - (o = a() / l || .5)) <= 0) {
                    s = 0
                }
                c = c / o
            }
            c = c * 2;
            x.style(e, t, c + u);
            i = i || []
        }
        if (i) {
            c = +c || +l || 0;
            r = i[1] ? c + (i[1] + 1) * i[2] : +i[2];
            if (n) {
                n.unit = u;
                n.start = c;
                n.end = r
            }
        }
        return r
    }
    var ce = {};
    function de(e) {
        var t, i = e.ownerDocument, n = e.nodeName, r = ce[n];
        if (r) {
            return r
        }
        t = i.body.appendChild(i.createElement(n));
        r = x.css(t, "display");
        t.parentNode.removeChild(t);
        if (r === "none") {
            r = "block"
        }
        ce[n] = r;
        return r
    }
    function fe(e, t) {
        var i, n, r = [], o = 0, s = e.length;
        for (; o < s; o++) {
            n = e[o];
            if (!n.style) {
                continue
            }
            i = n.style.display;
            if (t) {
                if (i === "none") {
                    r[o] = Z.get(n, "display") || null;
                    if (!r[o]) {
                        n.style.display = ""
                    }
                }
                if (n.style.display === "" && ae(n)) {
                    r[o] = de(n)
                }
            } else {
                if (i !== "none") {
                    r[o] = "none";
                    Z.set(n, "display", i)
                }
            }
        }
        for (o = 0; o < s; o++) {
            if (r[o] != null) {
                e[o].style.display = r[o]
            }
        }
        return e
    }
    x.fn.extend({
        show: function() {
            return fe(this, true)
        },
        hide: function() {
            return fe(this)
        },
        toggle: function(e) {
            if (typeof e === "boolean") {
                return e ? this.show() : this.hide()
            }
            return this.each(function() {
                if (ae(this)) {
                    x(this).show()
                } else {
                    x(this).hide()
                }
            })
        }
    });
    var pe = /^(?:checkbox|radio)$/i;
    var he = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i;
    var ge = /^$|^module$|\/(?:java|ecma)script/i;
    var me = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    me.optgroup = me.option;
    me.tbody = me.tfoot = me.colgroup = me.caption = me.thead;
    me.th = me.td;
    function ve(e, t) {
        var i;
        if (typeof e.getElementsByTagName !== "undefined") {
            i = e.getElementsByTagName(t || "*")
        } else if (typeof e.querySelectorAll !== "undefined") {
            i = e.querySelectorAll(t || "*")
        } else {
            i = []
        }
        if (t === undefined || t && E(e, t)) {
            return x.merge([e], i)
        }
        return i
    }
    function ye(e, t) {
        var i = 0
          , n = e.length;
        for (; i < n; i++) {
            Z.set(e[i], "globalEval", !t || Z.get(t[i], "globalEval"))
        }
    }
    var be = /<|&#?\w+;/;
    function we(e, t, i, n, r) {
        var o, s, a, l, u, c, d = t.createDocumentFragment(), f = [], p = 0, h = e.length;
        for (; p < h; p++) {
            o = e[p];
            if (o || o === 0) {
                if (b(o) === "object") {
                    x.merge(f, o.nodeType ? [o] : o)
                } else if (!be.test(o)) {
                    f.push(t.createTextNode(o))
                } else {
                    s = s || d.appendChild(t.createElement("div"));
                    a = (he.exec(o) || ["", ""])[1].toLowerCase();
                    l = me[a] || me._default;
                    s.innerHTML = l[1] + x.htmlPrefilter(o) + l[2];
                    c = l[0];
                    while (c--) {
                        s = s.lastChild
                    }
                    x.merge(f, s.childNodes);
                    s = d.firstChild;
                    s.textContent = ""
                }
            }
        }
        d.textContent = "";
        p = 0;
        while (o = f[p++]) {
            if (n && x.inArray(o, n) > -1) {
                if (r) {
                    r.push(o)
                }
                continue
            }
            u = x.contains(o.ownerDocument, o);
            s = ve(d.appendChild(o), "script");
            if (u) {
                ye(s)
            }
            if (i) {
                c = 0;
                while (o = s[c++]) {
                    if (ge.test(o.type || "")) {
                        i.push(o)
                    }
                }
            }
        }
        return d
    }
    (function() {
        var e = n.createDocumentFragment()
          , t = e.appendChild(n.createElement("div"))
          , i = n.createElement("input");
        i.setAttribute("type", "radio");
        i.setAttribute("checked", "checked");
        i.setAttribute("name", "t");
        t.appendChild(i);
        h.checkClone = t.cloneNode(true).cloneNode(true).lastChild.checked;
        t.innerHTML = "<textarea>x</textarea>";
        h.noCloneChecked = !!t.cloneNode(true).lastChild.defaultValue
    }
    )();
    var xe = n.documentElement;
    var Te = /^key/
      , Ce = /^(?:mouse|pointer|contextmenu|drag|drop)|click/
      , Se = /^([^.]*)(?:\.(.+)|)/;
    function ke() {
        return true
    }
    function $e() {
        return false
    }
    function Ae() {
        try {
            return n.activeElement
        } catch (e) {}
    }
    function Ee(e, t, i, n, r, o) {
        var s, a;
        if (typeof t === "object") {
            if (typeof i !== "string") {
                n = n || i;
                i = undefined
            }
            for (a in t) {
                Ee(e, a, i, n, t[a], o)
            }
            return e
        }
        if (n == null && r == null) {
            r = i;
            n = i = undefined
        } else if (r == null) {
            if (typeof i === "string") {
                r = n;
                n = undefined
            } else {
                r = n;
                n = i;
                i = undefined
            }
        }
        if (r === false) {
            r = $e
        } else if (!r) {
            return e
        }
        if (o === 1) {
            s = r;
            r = function(e) {
                x().off(e);
                return s.apply(this, arguments)
            }
            ;
            r.guid = s.guid || (s.guid = x.guid++)
        }
        return e.each(function() {
            x.event.add(this, t, r, n, i)
        })
    }
    x.event = {
        global: {},
        add: function(e, t, i, n, r) {
            var o, s, a, l, u, c, d, f, p, h, g, m = Z.get(e);
            if (!m) {
                return
            }
            if (i.handler) {
                o = i;
                i = o.handler;
                r = o.selector
            }
            if (r) {
                x.find.matchesSelector(xe, r)
            }
            if (!i.guid) {
                i.guid = x.guid++
            }
            if (!(l = m.events)) {
                l = m.events = {}
            }
            if (!(s = m.handle)) {
                s = m.handle = function(t) {
                    return typeof x !== "undefined" && x.event.triggered !== t.type ? x.event.dispatch.apply(e, arguments) : undefined
                }
            }
            t = (t || "").match(q) || [""];
            u = t.length;
            while (u--) {
                a = Se.exec(t[u]) || [];
                p = g = a[1];
                h = (a[2] || "").split(".").sort();
                if (!p) {
                    continue
                }
                d = x.event.special[p] || {};
                p = (r ? d.delegateType : d.bindType) || p;
                d = x.event.special[p] || {};
                c = x.extend({
                    type: p,
                    origType: g,
                    data: n,
                    handler: i,
                    guid: i.guid,
                    selector: r,
                    needsContext: r && x.expr.match.needsContext.test(r),
                    namespace: h.join(".")
                }, o);
                if (!(f = l[p])) {
                    f = l[p] = [];
                    f.delegateCount = 0;
                    if (!d.setup || d.setup.call(e, n, h, s) === false) {
                        if (e.addEventListener) {
                            e.addEventListener(p, s)
                        }
                    }
                }
                if (d.add) {
                    d.add.call(e, c);
                    if (!c.handler.guid) {
                        c.handler.guid = i.guid
                    }
                }
                if (r) {
                    f.splice(f.delegateCount++, 0, c)
                } else {
                    f.push(c)
                }
                x.event.global[p] = true
            }
        },
        remove: function(e, t, i, n, r) {
            var o, s, a, l, u, c, d, f, p, h, g, m = Z.hasData(e) && Z.get(e);
            if (!m || !(l = m.events)) {
                return
            }
            t = (t || "").match(q) || [""];
            u = t.length;
            while (u--) {
                a = Se.exec(t[u]) || [];
                p = g = a[1];
                h = (a[2] || "").split(".").sort();
                if (!p) {
                    for (p in l) {
                        x.event.remove(e, p + t[u], i, n, true)
                    }
                    continue
                }
                d = x.event.special[p] || {};
                p = (n ? d.delegateType : d.bindType) || p;
                f = l[p] || [];
                a = a[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)");
                s = o = f.length;
                while (o--) {
                    c = f[o];
                    if ((r || g === c.origType) && (!i || i.guid === c.guid) && (!a || a.test(c.namespace)) && (!n || n === c.selector || n === "**" && c.selector)) {
                        f.splice(o, 1);
                        if (c.selector) {
                            f.delegateCount--
                        }
                        if (d.remove) {
                            d.remove.call(e, c)
                        }
                    }
                }
                if (s && !f.length) {
                    if (!d.teardown || d.teardown.call(e, h, m.handle) === false) {
                        x.removeEvent(e, p, m.handle)
                    }
                    delete l[p]
                }
            }
            if (x.isEmptyObject(l)) {
                Z.remove(e, "handle events")
            }
        },
        dispatch: function(e) {
            var t = x.event.fix(e);
            var i, n, r, o, s, a, l = new Array(arguments.length), u = (Z.get(this, "events") || {})[t.type] || [], c = x.event.special[t.type] || {};
            l[0] = t;
            for (i = 1; i < arguments.length; i++) {
                l[i] = arguments[i]
            }
            t.delegateTarget = this;
            if (c.preDispatch && c.preDispatch.call(this, t) === false) {
                return
            }
            a = x.event.handlers.call(this, t, u);
            i = 0;
            while ((o = a[i++]) && !t.isPropagationStopped()) {
                t.currentTarget = o.elem;
                n = 0;
                while ((s = o.handlers[n++]) && !t.isImmediatePropagationStopped()) {
                    if (!t.rnamespace || t.rnamespace.test(s.namespace)) {
                        t.handleObj = s;
                        t.data = s.data;
                        r = ((x.event.special[s.origType] || {}).handle || s.handler).apply(o.elem, l);
                        if (r !== undefined) {
                            if ((t.result = r) === false) {
                                t.preventDefault();
                                t.stopPropagation()
                            }
                        }
                    }
                }
            }
            if (c.postDispatch) {
                c.postDispatch.call(this, t)
            }
            return t.result
        },
        handlers: function(e, t) {
            var i, n, r, o, s, a = [], l = t.delegateCount, u = e.target;
            if (l && u.nodeType && !(e.type === "click" && e.button >= 1)) {
                for (; u !== this; u = u.parentNode || this) {
                    if (u.nodeType === 1 && !(e.type === "click" && u.disabled === true)) {
                        o = [];
                        s = {};
                        for (i = 0; i < l; i++) {
                            n = t[i];
                            r = n.selector + " ";
                            if (s[r] === undefined) {
                                s[r] = n.needsContext ? x(r, this).index(u) > -1 : x.find(r, this, null, [u]).length
                            }
                            if (s[r]) {
                                o.push(n)
                            }
                        }
                        if (o.length) {
                            a.push({
                                elem: u,
                                handlers: o
                            })
                        }
                    }
                }
            }
            u = this;
            if (l < t.length) {
                a.push({
                    elem: u,
                    handlers: t.slice(l)
                })
            }
            return a
        },
        addProp: function(e, t) {
            Object.defineProperty(x.Event.prototype, e, {
                enumerable: true,
                configurable: true,
                get: g(t) ? function() {
                    if (this.originalEvent) {
                        return t(this.originalEvent)
                    }
                }
                : function() {
                    if (this.originalEvent) {
                        return this.originalEvent[e]
                    }
                }
                ,
                set: function(t) {
                    Object.defineProperty(this, e, {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: t
                    })
                }
            })
        },
        fix: function(e) {
            return e[x.expando] ? e : new x.Event(e)
        },
        special: {
            load: {
                noBubble: true
            },
            focus: {
                trigger: function() {
                    if (this !== Ae() && this.focus) {
                        this.focus();
                        return false
                    }
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === Ae() && this.blur) {
                        this.blur();
                        return false
                    }
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if (this.type === "checkbox" && this.click && E(this, "input")) {
                        this.click();
                        return false
                    }
                },
                _default: function(e) {
                    return E(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    if (e.result !== undefined && e.originalEvent) {
                        e.originalEvent.returnValue = e.result
                    }
                }
            }
        }
    };
    x.removeEvent = function(e, t, i) {
        if (e.removeEventListener) {
            e.removeEventListener(t, i)
        }
    }
    ;
    x.Event = function(e, t) {
        if (!(this instanceof x.Event)) {
            return new x.Event(e,t)
        }
        if (e && e.type) {
            this.originalEvent = e;
            this.type = e.type;
            this.isDefaultPrevented = e.defaultPrevented || e.defaultPrevented === undefined && e.returnValue === false ? ke : $e;
            this.target = e.target && e.target.nodeType === 3 ? e.target.parentNode : e.target;
            this.currentTarget = e.currentTarget;
            this.relatedTarget = e.relatedTarget
        } else {
            this.type = e
        }
        if (t) {
            x.extend(this, t)
        }
        this.timeStamp = e && e.timeStamp || Date.now();
        this[x.expando] = true
    }
    ;
    x.Event.prototype = {
        constructor: x.Event,
        isDefaultPrevented: $e,
        isPropagationStopped: $e,
        isImmediatePropagationStopped: $e,
        isSimulated: false,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = ke;
            if (e && !this.isSimulated) {
                e.preventDefault()
            }
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = ke;
            if (e && !this.isSimulated) {
                e.stopPropagation()
            }
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = ke;
            if (e && !this.isSimulated) {
                e.stopImmediatePropagation()
            }
            this.stopPropagation()
        }
    };
    x.each({
        altKey: true,
        bubbles: true,
        cancelable: true,
        changedTouches: true,
        ctrlKey: true,
        detail: true,
        eventPhase: true,
        metaKey: true,
        pageX: true,
        pageY: true,
        shiftKey: true,
        view: true,
        char: true,
        charCode: true,
        key: true,
        keyCode: true,
        button: true,
        buttons: true,
        clientX: true,
        clientY: true,
        offsetX: true,
        offsetY: true,
        pointerId: true,
        pointerType: true,
        screenX: true,
        screenY: true,
        targetTouches: true,
        toElement: true,
        touches: true,
        which: function(e) {
            var t = e.button;
            if (e.which == null && Te.test(e.type)) {
                return e.charCode != null ? e.charCode : e.keyCode
            }
            if (!e.which && t !== undefined && Ce.test(e.type)) {
                if (t & 1) {
                    return 1
                }
                if (t & 2) {
                    return 3
                }
                if (t & 4) {
                    return 2
                }
                return 0
            }
            return e.which
        }
    }, x.event.addProp);
    x.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, t) {
        x.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var i, n = this, r = e.relatedTarget, o = e.handleObj;
                if (!r || r !== n && !x.contains(n, r)) {
                    e.type = o.origType;
                    i = o.handler.apply(this, arguments);
                    e.type = t
                }
                return i
            }
        }
    });
    x.fn.extend({
        on: function(e, t, i, n) {
            return Ee(this, e, t, i, n)
        },
        one: function(e, t, i, n) {
            return Ee(this, e, t, i, n, 1)
        },
        off: function(e, t, i) {
            var n, r;
            if (e && e.preventDefault && e.handleObj) {
                n = e.handleObj;
                x(e.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler);
                return this
            }
            if (typeof e === "object") {
                for (r in e) {
                    this.off(r, t, e[r])
                }
                return this
            }
            if (t === false || typeof t === "function") {
                i = t;
                t = undefined
            }
            if (i === false) {
                i = $e
            }
            return this.each(function() {
                x.event.remove(this, e, i, t)
            })
        }
    });
    var _e = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi
      , De = /<script|<style|<link/i
      , Oe = /checked\s*(?:[^=]|=\s*.checked.)/i
      , Ie = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    function Le(e, t) {
        if (E(e, "table") && E(t.nodeType !== 11 ? t : t.firstChild, "tr")) {
            return x(e).children("tbody")[0] || e
        }
        return e
    }
    function Ne(e) {
        e.type = (e.getAttribute("type") !== null) + "/" + e.type;
        return e
    }
    function je(e) {
        if ((e.type || "").slice(0, 5) === "true/") {
            e.type = e.type.slice(5)
        } else {
            e.removeAttribute("type")
        }
        return e
    }
    function Pe(e, t) {
        var i, n, r, o, s, a, l, u;
        if (t.nodeType !== 1) {
            return
        }
        if (Z.hasData(e)) {
            o = Z.access(e);
            s = Z.set(t, o);
            u = o.events;
            if (u) {
                delete s.handle;
                s.events = {};
                for (r in u) {
                    for (i = 0,
                    n = u[r].length; i < n; i++) {
                        x.event.add(t, r, u[r][i])
                    }
                }
            }
        }
        if (J.hasData(e)) {
            a = J.access(e);
            l = x.extend({}, a);
            J.set(t, l)
        }
    }
    function qe(e, t) {
        var i = t.nodeName.toLowerCase();
        if (i === "input" && pe.test(e.type)) {
            t.checked = e.checked
        } else if (i === "input" || i === "textarea") {
            t.defaultValue = e.defaultValue
        }
    }
    function He(e, t, i, n) {
        t = s.apply([], t);
        var r, o, a, l, u, c, d = 0, f = e.length, p = f - 1, m = t[0], v = g(m);
        if (v || f > 1 && typeof m === "string" && !h.checkClone && Oe.test(m)) {
            return e.each(function(r) {
                var o = e.eq(r);
                if (v) {
                    t[0] = m.call(this, r, o.html())
                }
                He(o, t, i, n)
            })
        }
        if (f) {
            r = we(t, e[0].ownerDocument, false, e, n);
            o = r.firstChild;
            if (r.childNodes.length === 1) {
                r = o
            }
            if (o || n) {
                a = x.map(ve(r, "script"), Ne);
                l = a.length;
                for (; d < f; d++) {
                    u = r;
                    if (d !== p) {
                        u = x.clone(u, true, true);
                        if (l) {
                            x.merge(a, ve(u, "script"))
                        }
                    }
                    i.call(e[d], u, d)
                }
                if (l) {
                    c = a[a.length - 1].ownerDocument;
                    x.map(a, je);
                    for (d = 0; d < l; d++) {
                        u = a[d];
                        if (ge.test(u.type || "") && !Z.access(u, "globalEval") && x.contains(c, u)) {
                            if (u.src && (u.type || "").toLowerCase() !== "module") {
                                if (x._evalUrl) {
                                    x._evalUrl(u.src)
                                }
                            } else {
                                y(u.textContent.replace(Ie, ""), c, u)
                            }
                        }
                    }
                }
            }
        }
        return e
    }
    function Me(e, t, i) {
        var n, r = t ? x.filter(t, e) : e, o = 0;
        for (; (n = r[o]) != null; o++) {
            if (!i && n.nodeType === 1) {
                x.cleanData(ve(n))
            }
            if (n.parentNode) {
                if (i && x.contains(n.ownerDocument, n)) {
                    ye(ve(n, "script"))
                }
                n.parentNode.removeChild(n)
            }
        }
        return e
    }
    x.extend({
        htmlPrefilter: function(e) {
            return e.replace(_e, "<$1></$2>")
        },
        clone: function(e, t, i) {
            var n, r, o, s, a = e.cloneNode(true), l = x.contains(e.ownerDocument, e);
            if (!h.noCloneChecked && (e.nodeType === 1 || e.nodeType === 11) && !x.isXMLDoc(e)) {
                s = ve(a);
                o = ve(e);
                for (n = 0,
                r = o.length; n < r; n++) {
                    qe(o[n], s[n])
                }
            }
            if (t) {
                if (i) {
                    o = o || ve(e);
                    s = s || ve(a);
                    for (n = 0,
                    r = o.length; n < r; n++) {
                        Pe(o[n], s[n])
                    }
                } else {
                    Pe(e, a)
                }
            }
            s = ve(a, "script");
            if (s.length > 0) {
                ye(s, !l && ve(e, "script"))
            }
            return a
        },
        cleanData: function(e) {
            var t, i, n, r = x.event.special, o = 0;
            for (; (i = e[o]) !== undefined; o++) {
                if (K(i)) {
                    if (t = i[Z.expando]) {
                        if (t.events) {
                            for (n in t.events) {
                                if (r[n]) {
                                    x.event.remove(i, n)
                                } else {
                                    x.removeEvent(i, n, t.handle)
                                }
                            }
                        }
                        i[Z.expando] = undefined
                    }
                    if (i[J.expando]) {
                        i[J.expando] = undefined
                    }
                }
            }
        }
    });
    x.fn.extend({
        detach: function(e) {
            return Me(this, e, true)
        },
        remove: function(e) {
            return Me(this, e)
        },
        text: function(e) {
            return U(this, function(e) {
                return e === undefined ? x.text(this) : this.empty().each(function() {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        this.textContent = e
                    }
                })
            }, null, e, arguments.length)
        },
        append: function() {
            return He(this, arguments, function(e) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var t = Le(this, e);
                    t.appendChild(e)
                }
            })
        },
        prepend: function() {
            return He(this, arguments, function(e) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var t = Le(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return He(this, arguments, function(e) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(e, this)
                }
            })
        },
        after: function() {
            return He(this, arguments, function(e) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(e, this.nextSibling)
                }
            })
        },
        empty: function() {
            var e, t = 0;
            for (; (e = this[t]) != null; t++) {
                if (e.nodeType === 1) {
                    x.cleanData(ve(e, false));
                    e.textContent = ""
                }
            }
            return this
        },
        clone: function(e, t) {
            e = e == null ? false : e;
            t = t == null ? e : t;
            return this.map(function() {
                return x.clone(this, e, t)
            })
        },
        html: function(e) {
            return U(this, function(e) {
                var t = this[0] || {}
                  , i = 0
                  , n = this.length;
                if (e === undefined && t.nodeType === 1) {
                    return t.innerHTML
                }
                if (typeof e === "string" && !De.test(e) && !me[(he.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = x.htmlPrefilter(e);
                    try {
                        for (; i < n; i++) {
                            t = this[i] || {};
                            if (t.nodeType === 1) {
                                x.cleanData(ve(t, false));
                                t.innerHTML = e
                            }
                        }
                        t = 0
                    } catch (e) {}
                }
                if (t) {
                    this.empty().append(e)
                }
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = [];
            return He(this, arguments, function(t) {
                var i = this.parentNode;
                if (x.inArray(this, e) < 0) {
                    x.cleanData(ve(this));
                    if (i) {
                        i.replaceChild(t, this)
                    }
                }
            }, e)
        }
    });
    x.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        x.fn[e] = function(e) {
            var i, n = [], r = x(e), o = r.length - 1, s = 0;
            for (; s <= o; s++) {
                i = s === o ? this : this.clone(true);
                x(r[s])[t](i);
                a.apply(n, i.get())
            }
            return this.pushStack(n)
        }
    });
    var Re = new RegExp("^(" + re + ")(?!px)[a-z%]+$","i");
    var ze = function(t) {
        var i = t.ownerDocument.defaultView;
        if (!i || !i.opener) {
            i = e
        }
        return i.getComputedStyle(t)
    };
    var Fe = new RegExp(se.join("|"),"i");
    (function() {
        function t() {
            if (!c) {
                return
            }
            u.style.cssText = "position:absolute;left:-11111px;width:60px;" + "margin-top:1px;padding:0;border:0";
            c.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;" + "margin:auto;border:1px;padding:1px;" + "width:60%;top:1%";
            xe.appendChild(u).appendChild(c);
            var t = e.getComputedStyle(c);
            r = t.top !== "1%";
            l = i(t.marginLeft) === 12;
            c.style.right = "60%";
            a = i(t.right) === 36;
            o = i(t.width) === 36;
            c.style.position = "absolute";
            s = c.offsetWidth === 36 || "absolute";
            xe.removeChild(u);
            c = null
        }
        function i(e) {
            return Math.round(parseFloat(e))
        }
        var r, o, s, a, l, u = n.createElement("div"), c = n.createElement("div");
        if (!c.style) {
            return
        }
        c.style.backgroundClip = "content-box";
        c.cloneNode(true).style.backgroundClip = "";
        h.clearCloneStyle = c.style.backgroundClip === "content-box";
        x.extend(h, {
            boxSizingReliable: function() {
                t();
                return o
            },
            pixelBoxStyles: function() {
                t();
                return a
            },
            pixelPosition: function() {
                t();
                return r
            },
            reliableMarginLeft: function() {
                t();
                return l
            },
            scrollboxSize: function() {
                t();
                return s
            }
        })
    }
    )();
    function We(e, t, i) {
        var n, r, o, s, a = e.style;
        i = i || ze(e);
        if (i) {
            s = i.getPropertyValue(t) || i[t];
            if (s === "" && !x.contains(e.ownerDocument, e)) {
                s = x.style(e, t)
            }
            if (!h.pixelBoxStyles() && Re.test(s) && Fe.test(t)) {
                n = a.width;
                r = a.minWidth;
                o = a.maxWidth;
                a.minWidth = a.maxWidth = a.width = s;
                s = i.width;
                a.width = n;
                a.minWidth = r;
                a.maxWidth = o
            }
        }
        return s !== undefined ? s + "" : s
    }
    function Be(e, t) {
        return {
            get: function() {
                if (e()) {
                    delete this.get;
                    return
                }
                return (this.get = t).apply(this, arguments)
            }
        }
    }
    var Ue = /^(none|table(?!-c[ea]).+)/
      , Ge = /^--/
      , Ve = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }
      , Ye = {
        letterSpacing: "0",
        fontWeight: "400"
    }
      , Xe = ["Webkit", "Moz", "ms"]
      , Ke = n.createElement("div").style;
    function Qe(e) {
        if (e in Ke) {
            return e
        }
        var t = e[0].toUpperCase() + e.slice(1)
          , i = Xe.length;
        while (i--) {
            e = Xe[i] + t;
            if (e in Ke) {
                return e
            }
        }
    }
    function Ze(e) {
        var t = x.cssProps[e];
        if (!t) {
            t = x.cssProps[e] = Qe(e) || e
        }
        return t
    }
    function Je(e, t, i) {
        var n = oe.exec(t);
        return n ? Math.max(0, n[2] - (i || 0)) + (n[3] || "px") : t
    }
    function et(e, t, i, n, r, o) {
        var s = t === "width" ? 1 : 0
          , a = 0
          , l = 0;
        if (i === (n ? "border" : "content")) {
            return 0
        }
        for (; s < 4; s += 2) {
            if (i === "margin") {
                l += x.css(e, i + se[s], true, r)
            }
            if (!n) {
                l += x.css(e, "padding" + se[s], true, r);
                if (i !== "padding") {
                    l += x.css(e, "border" + se[s] + "Width", true, r)
                } else {
                    a += x.css(e, "border" + se[s] + "Width", true, r)
                }
            } else {
                if (i === "content") {
                    l -= x.css(e, "padding" + se[s], true, r)
                }
                if (i !== "margin") {
                    l -= x.css(e, "border" + se[s] + "Width", true, r)
                }
            }
        }
        if (!n && o >= 0) {
            l += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - l - a - .5))
        }
        return l
    }
    function tt(e, t, i) {
        var n = ze(e)
          , r = We(e, t, n)
          , o = x.css(e, "boxSizing", false, n) === "border-box"
          , s = o;
        if (Re.test(r)) {
            if (!i) {
                return r
            }
            r = "auto"
        }
        s = s && (h.boxSizingReliable() || r === e.style[t]);
        if (r === "auto" || !parseFloat(r) && x.css(e, "display", false, n) === "inline") {
            r = e["offset" + t[0].toUpperCase() + t.slice(1)];
            s = true
        }
        r = parseFloat(r) || 0;
        return r + et(e, t, i || (o ? "border" : "content"), s, n, r) + "px"
    }
    x.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var i = We(e, "opacity");
                        return i === "" ? "1" : i
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: true,
            columnCount: true,
            fillOpacity: true,
            flexGrow: true,
            flexShrink: true,
            fontWeight: true,
            lineHeight: true,
            opacity: true,
            order: true,
            orphans: true,
            widows: true,
            zIndex: true,
            zoom: true
        },
        cssProps: {},
        style: function(e, t, i, n) {
            if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style) {
                return
            }
            var r, o, s, a = X(t), l = Ge.test(t), u = e.style;
            if (!l) {
                t = Ze(a)
            }
            s = x.cssHooks[t] || x.cssHooks[a];
            if (i !== undefined) {
                o = typeof i;
                if (o === "string" && (r = oe.exec(i)) && r[1]) {
                    i = ue(e, t, r);
                    o = "number"
                }
                if (i == null || i !== i) {
                    return
                }
                if (o === "number") {
                    i += r && r[3] || (x.cssNumber[a] ? "" : "px")
                }
                if (!h.clearCloneStyle && i === "" && t.indexOf("background") === 0) {
                    u[t] = "inherit"
                }
                if (!s || !("set"in s) || (i = s.set(e, i, n)) !== undefined) {
                    if (l) {
                        u.setProperty(t, i)
                    } else {
                        u[t] = i
                    }
                }
            } else {
                if (s && "get"in s && (r = s.get(e, false, n)) !== undefined) {
                    return r
                }
                return u[t]
            }
        },
        css: function(e, t, i, n) {
            var r, o, s, a = X(t), l = Ge.test(t);
            if (!l) {
                t = Ze(a)
            }
            s = x.cssHooks[t] || x.cssHooks[a];
            if (s && "get"in s) {
                r = s.get(e, true, i)
            }
            if (r === undefined) {
                r = We(e, t, n)
            }
            if (r === "normal" && t in Ye) {
                r = Ye[t]
            }
            if (i === "" || i) {
                o = parseFloat(r);
                return i === true || isFinite(o) ? o || 0 : r
            }
            return r
        }
    });
    x.each(["height", "width"], function(e, t) {
        x.cssHooks[t] = {
            get: function(e, i, n) {
                if (i) {
                    return Ue.test(x.css(e, "display")) && (!e.getClientRects().length || !e.getBoundingClientRect().width) ? le(e, Ve, function() {
                        return tt(e, t, n)
                    }) : tt(e, t, n)
                }
            },
            set: function(e, i, n) {
                var r, o = ze(e), s = x.css(e, "boxSizing", false, o) === "border-box", a = n && et(e, t, n, s, o);
                if (s && h.scrollboxSize() === o.position) {
                    a -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(o[t]) - et(e, t, "border", false, o) - .5)
                }
                if (a && (r = oe.exec(i)) && (r[3] || "px") !== "px") {
                    e.style[t] = i;
                    i = x.css(e, t)
                }
                return Je(e, i, a)
            }
        }
    });
    x.cssHooks.marginLeft = Be(h.reliableMarginLeft, function(e, t) {
        if (t) {
            return (parseFloat(We(e, "marginLeft")) || e.getBoundingClientRect().left - le(e, {
                marginLeft: 0
            }, function() {
                return e.getBoundingClientRect().left
            })) + "px"
        }
    });
    x.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        x.cssHooks[e + t] = {
            expand: function(i) {
                var n = 0
                  , r = {}
                  , o = typeof i === "string" ? i.split(" ") : [i];
                for (; n < 4; n++) {
                    r[e + se[n] + t] = o[n] || o[n - 2] || o[0]
                }
                return r
            }
        };
        if (e !== "margin") {
            x.cssHooks[e + t].set = Je
        }
    });
    x.fn.extend({
        css: function(e, t) {
            return U(this, function(e, t, i) {
                var n, r, o = {}, s = 0;
                if (Array.isArray(t)) {
                    n = ze(e);
                    r = t.length;
                    for (; s < r; s++) {
                        o[t[s]] = x.css(e, t[s], false, n)
                    }
                    return o
                }
                return i !== undefined ? x.style(e, t, i) : x.css(e, t)
            }, e, t, arguments.length > 1)
        }
    });
    function it(e, t, i, n, r) {
        return new it.prototype.init(e,t,i,n,r)
    }
    x.Tween = it;
    it.prototype = {
        constructor: it,
        init: function(e, t, i, n, r, o) {
            this.elem = e;
            this.prop = i;
            this.easing = r || x.easing._default;
            this.options = t;
            this.start = this.now = this.cur();
            this.end = n;
            this.unit = o || (x.cssNumber[i] ? "" : "px")
        },
        cur: function() {
            var e = it.propHooks[this.prop];
            return e && e.get ? e.get(this) : it.propHooks._default.get(this)
        },
        run: function(e) {
            var t, i = it.propHooks[this.prop];
            if (this.options.duration) {
                this.pos = t = x.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration)
            } else {
                this.pos = t = e
            }
            this.now = (this.end - this.start) * t + this.start;
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this)
            }
            if (i && i.set) {
                i.set(this)
            } else {
                it.propHooks._default.set(this)
            }
            return this
        }
    };
    it.prototype.init.prototype = it.prototype;
    it.propHooks = {
        _default: {
            get: function(e) {
                var t;
                if (e.elem.nodeType !== 1 || e.elem[e.prop] != null && e.elem.style[e.prop] == null) {
                    return e.elem[e.prop]
                }
                t = x.css(e.elem, e.prop, "");
                return !t || t === "auto" ? 0 : t
            },
            set: function(e) {
                if (x.fx.step[e.prop]) {
                    x.fx.step[e.prop](e)
                } else if (e.elem.nodeType === 1 && (e.elem.style[x.cssProps[e.prop]] != null || x.cssHooks[e.prop])) {
                    x.style(e.elem, e.prop, e.now + e.unit)
                } else {
                    e.elem[e.prop] = e.now
                }
            }
        }
    };
    it.propHooks.scrollTop = it.propHooks.scrollLeft = {
        set: function(e) {
            if (e.elem.nodeType && e.elem.parentNode) {
                e.elem[e.prop] = e.now
            }
        }
    };
    x.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    };
    x.fx = it.prototype.init;
    x.fx.step = {};
    var nt, rt, ot = /^(?:toggle|show|hide)$/, st = /queueHooks$/;
    function at() {
        if (rt) {
            if (n.hidden === false && e.requestAnimationFrame) {
                e.requestAnimationFrame(at)
            } else {
                e.setTimeout(at, x.fx.interval)
            }
            x.fx.tick()
        }
    }
    function lt() {
        e.setTimeout(function() {
            nt = undefined
        });
        return nt = Date.now()
    }
    function ut(e, t) {
        var i, n = 0, r = {
            height: e
        };
        t = t ? 1 : 0;
        for (; n < 4; n += 2 - t) {
            i = se[n];
            r["margin" + i] = r["padding" + i] = e
        }
        if (t) {
            r.opacity = r.width = e
        }
        return r
    }
    function ct(e, t, i) {
        var n, r = (pt.tweeners[t] || []).concat(pt.tweeners["*"]), o = 0, s = r.length;
        for (; o < s; o++) {
            if (n = r[o].call(i, t, e)) {
                return n
            }
        }
    }
    function dt(e, t, i) {
        var n, r, o, s, a, l, u, c, d = "width"in t || "height"in t, f = this, p = {}, h = e.style, g = e.nodeType && ae(e), m = Z.get(e, "fxshow");
        if (!i.queue) {
            s = x._queueHooks(e, "fx");
            if (s.unqueued == null) {
                s.unqueued = 0;
                a = s.empty.fire;
                s.empty.fire = function() {
                    if (!s.unqueued) {
                        a()
                    }
                }
            }
            s.unqueued++;
            f.always(function() {
                f.always(function() {
                    s.unqueued--;
                    if (!x.queue(e, "fx").length) {
                        s.empty.fire()
                    }
                })
            })
        }
        for (n in t) {
            r = t[n];
            if (ot.test(r)) {
                delete t[n];
                o = o || r === "toggle";
                if (r === (g ? "hide" : "show")) {
                    if (r === "show" && m && m[n] !== undefined) {
                        g = true
                    } else {
                        continue
                    }
                }
                p[n] = m && m[n] || x.style(e, n)
            }
        }
        l = !x.isEmptyObject(t);
        if (!l && x.isEmptyObject(p)) {
            return
        }
        if (d && e.nodeType === 1) {
            i.overflow = [h.overflow, h.overflowX, h.overflowY];
            u = m && m.display;
            if (u == null) {
                u = Z.get(e, "display")
            }
            c = x.css(e, "display");
            if (c === "none") {
                if (u) {
                    c = u
                } else {
                    fe([e], true);
                    u = e.style.display || u;
                    c = x.css(e, "display");
                    fe([e])
                }
            }
            if (c === "inline" || c === "inline-block" && u != null) {
                if (x.css(e, "float") === "none") {
                    if (!l) {
                        f.done(function() {
                            h.display = u
                        });
                        if (u == null) {
                            c = h.display;
                            u = c === "none" ? "" : c
                        }
                    }
                    h.display = "inline-block"
                }
            }
        }
        if (i.overflow) {
            h.overflow = "hidden";
            f.always(function() {
                h.overflow = i.overflow[0];
                h.overflowX = i.overflow[1];
                h.overflowY = i.overflow[2]
            })
        }
        l = false;
        for (n in p) {
            if (!l) {
                if (m) {
                    if ("hidden"in m) {
                        g = m.hidden
                    }
                } else {
                    m = Z.access(e, "fxshow", {
                        display: u
                    })
                }
                if (o) {
                    m.hidden = !g
                }
                if (g) {
                    fe([e], true)
                }
                f.done(function() {
                    if (!g) {
                        fe([e])
                    }
                    Z.remove(e, "fxshow");
                    for (n in p) {
                        x.style(e, n, p[n])
                    }
                })
            }
            l = ct(g ? m[n] : 0, n, f);
            if (!(n in m)) {
                m[n] = l.start;
                if (g) {
                    l.end = l.start;
                    l.start = 0
                }
            }
        }
    }
    function ft(e, t) {
        var i, n, r, o, s;
        for (i in e) {
            n = X(i);
            r = t[n];
            o = e[i];
            if (Array.isArray(o)) {
                r = o[1];
                o = e[i] = o[0]
            }
            if (i !== n) {
                e[n] = o;
                delete e[i]
            }
            s = x.cssHooks[n];
            if (s && "expand"in s) {
                o = s.expand(o);
                delete e[n];
                for (i in o) {
                    if (!(i in e)) {
                        e[i] = o[i];
                        t[i] = r
                    }
                }
            } else {
                t[n] = r
            }
        }
    }
    function pt(e, t, i) {
        var n, r, o = 0, s = pt.prefilters.length, a = x.Deferred().always(function() {
            delete l.elem
        }), l = function() {
            if (r) {
                return false
            }
            var t = nt || lt()
              , i = Math.max(0, u.startTime + u.duration - t)
              , n = i / u.duration || 0
              , o = 1 - n
              , s = 0
              , l = u.tweens.length;
            for (; s < l; s++) {
                u.tweens[s].run(o)
            }
            a.notifyWith(e, [u, o, i]);
            if (o < 1 && l) {
                return i
            }
            if (!l) {
                a.notifyWith(e, [u, 1, 0])
            }
            a.resolveWith(e, [u]);
            return false
        }, u = a.promise({
            elem: e,
            props: x.extend({}, t),
            opts: x.extend(true, {
                specialEasing: {},
                easing: x.easing._default
            }, i),
            originalProperties: t,
            originalOptions: i,
            startTime: nt || lt(),
            duration: i.duration,
            tweens: [],
            createTween: function(t, i) {
                var n = x.Tween(e, u.opts, t, i, u.opts.specialEasing[t] || u.opts.easing);
                u.tweens.push(n);
                return n
            },
            stop: function(t) {
                var i = 0
                  , n = t ? u.tweens.length : 0;
                if (r) {
                    return this
                }
                r = true;
                for (; i < n; i++) {
                    u.tweens[i].run(1)
                }
                if (t) {
                    a.notifyWith(e, [u, 1, 0]);
                    a.resolveWith(e, [u, t])
                } else {
                    a.rejectWith(e, [u, t])
                }
                return this
            }
        }), c = u.props;
        ft(c, u.opts.specialEasing);
        for (; o < s; o++) {
            n = pt.prefilters[o].call(u, e, c, u.opts);
            if (n) {
                if (g(n.stop)) {
                    x._queueHooks(u.elem, u.opts.queue).stop = n.stop.bind(n)
                }
                return n
            }
        }
        x.map(c, ct, u);
        if (g(u.opts.start)) {
            u.opts.start.call(e, u)
        }
        u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always);
        x.fx.timer(x.extend(l, {
            elem: e,
            anim: u,
            queue: u.opts.queue
        }));
        return u
    }
    x.Animation = x.extend(pt, {
        tweeners: {
            "*": [function(e, t) {
                var i = this.createTween(e, t);
                ue(i.elem, e, oe.exec(t), i);
                return i
            }
            ]
        },
        tweener: function(e, t) {
            if (g(e)) {
                t = e;
                e = ["*"]
            } else {
                e = e.match(q)
            }
            var i, n = 0, r = e.length;
            for (; n < r; n++) {
                i = e[n];
                pt.tweeners[i] = pt.tweeners[i] || [];
                pt.tweeners[i].unshift(t)
            }
        },
        prefilters: [dt],
        prefilter: function(e, t) {
            if (t) {
                pt.prefilters.unshift(e)
            } else {
                pt.prefilters.push(e)
            }
        }
    });
    x.speed = function(e, t, i) {
        var n = e && typeof e === "object" ? x.extend({}, e) : {
            complete: i || !i && t || g(e) && e,
            duration: e,
            easing: i && t || t && !g(t) && t
        };
        if (x.fx.off) {
            n.duration = 0
        } else {
            if (typeof n.duration !== "number") {
                if (n.duration in x.fx.speeds) {
                    n.duration = x.fx.speeds[n.duration]
                } else {
                    n.duration = x.fx.speeds._default
                }
            }
        }
        if (n.queue == null || n.queue === true) {
            n.queue = "fx"
        }
        n.old = n.complete;
        n.complete = function() {
            if (g(n.old)) {
                n.old.call(this)
            }
            if (n.queue) {
                x.dequeue(this, n.queue)
            }
        }
        ;
        return n
    }
    ;
    x.fn.extend({
        fadeTo: function(e, t, i, n) {
            return this.filter(ae).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, i, n)
        },
        animate: function(e, t, i, n) {
            var r = x.isEmptyObject(e)
              , o = x.speed(t, i, n)
              , s = function() {
                var t = pt(this, x.extend({}, e), o);
                if (r || Z.get(this, "finish")) {
                    t.stop(true)
                }
            };
            s.finish = s;
            return r || o.queue === false ? this.each(s) : this.queue(o.queue, s)
        },
        stop: function(e, t, i) {
            var n = function(e) {
                var t = e.stop;
                delete e.stop;
                t(i)
            };
            if (typeof e !== "string") {
                i = t;
                t = e;
                e = undefined
            }
            if (t && e !== false) {
                this.queue(e || "fx", [])
            }
            return this.each(function() {
                var t = true
                  , r = e != null && e + "queueHooks"
                  , o = x.timers
                  , s = Z.get(this);
                if (r) {
                    if (s[r] && s[r].stop) {
                        n(s[r])
                    }
                } else {
                    for (r in s) {
                        if (s[r] && s[r].stop && st.test(r)) {
                            n(s[r])
                        }
                    }
                }
                for (r = o.length; r--; ) {
                    if (o[r].elem === this && (e == null || o[r].queue === e)) {
                        o[r].anim.stop(i);
                        t = false;
                        o.splice(r, 1)
                    }
                }
                if (t || !i) {
                    x.dequeue(this, e)
                }
            })
        },
        finish: function(e) {
            if (e !== false) {
                e = e || "fx"
            }
            return this.each(function() {
                var t, i = Z.get(this), n = i[e + "queue"], r = i[e + "queueHooks"], o = x.timers, s = n ? n.length : 0;
                i.finish = true;
                x.queue(this, e, []);
                if (r && r.stop) {
                    r.stop.call(this, true)
                }
                for (t = o.length; t--; ) {
                    if (o[t].elem === this && o[t].queue === e) {
                        o[t].anim.stop(true);
                        o.splice(t, 1)
                    }
                }
                for (t = 0; t < s; t++) {
                    if (n[t] && n[t].finish) {
                        n[t].finish.call(this)
                    }
                }
                delete i.finish
            })
        }
    });
    x.each(["toggle", "show", "hide"], function(e, t) {
        var i = x.fn[t];
        x.fn[t] = function(e, n, r) {
            return e == null || typeof e === "boolean" ? i.apply(this, arguments) : this.animate(ut(t, true), e, n, r)
        }
    });
    x.each({
        slideDown: ut("show"),
        slideUp: ut("hide"),
        slideToggle: ut("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        x.fn[e] = function(e, i, n) {
            return this.animate(t, e, i, n)
        }
    });
    x.timers = [];
    x.fx.tick = function() {
        var e, t = 0, i = x.timers;
        nt = Date.now();
        for (; t < i.length; t++) {
            e = i[t];
            if (!e() && i[t] === e) {
                i.splice(t--, 1)
            }
        }
        if (!i.length) {
            x.fx.stop()
        }
        nt = undefined
    }
    ;
    x.fx.timer = function(e) {
        x.timers.push(e);
        x.fx.start()
    }
    ;
    x.fx.interval = 13;
    x.fx.start = function() {
        if (rt) {
            return
        }
        rt = true;
        at()
    }
    ;
    x.fx.stop = function() {
        rt = null
    }
    ;
    x.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    x.fn.delay = function(t, i) {
        t = x.fx ? x.fx.speeds[t] || t : t;
        i = i || "fx";
        return this.queue(i, function(i, n) {
            var r = e.setTimeout(i, t);
            n.stop = function() {
                e.clearTimeout(r)
            }
        })
    }
    ;
    (function() {
        var e = n.createElement("input")
          , t = n.createElement("select")
          , i = t.appendChild(n.createElement("option"));
        e.type = "checkbox";
        h.checkOn = e.value !== "";
        h.optSelected = i.selected;
        e = n.createElement("input");
        e.value = "t";
        e.type = "radio";
        h.radioValue = e.value === "t"
    }
    )();
    var ht, gt = x.expr.attrHandle;
    x.fn.extend({
        attr: function(e, t) {
            return U(this, x.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                x.removeAttr(this, e)
            })
        }
    });
    x.extend({
        attr: function(e, t, i) {
            var n, r, o = e.nodeType;
            if (o === 3 || o === 8 || o === 2) {
                return
            }
            if (typeof e.getAttribute === "undefined") {
                return x.prop(e, t, i)
            }
            if (o !== 1 || !x.isXMLDoc(e)) {
                r = x.attrHooks[t.toLowerCase()] || (x.expr.match.bool.test(t) ? ht : undefined)
            }
            if (i !== undefined) {
                if (i === null) {
                    x.removeAttr(e, t);
                    return
                }
                if (r && "set"in r && (n = r.set(e, i, t)) !== undefined) {
                    return n
                }
                e.setAttribute(t, i + "");
                return i
            }
            if (r && "get"in r && (n = r.get(e, t)) !== null) {
                return n
            }
            n = x.find.attr(e, t);
            return n == null ? undefined : n
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!h.radioValue && t === "radio" && E(e, "input")) {
                        var i = e.value;
                        e.setAttribute("type", t);
                        if (i) {
                            e.value = i
                        }
                        return t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var i, n = 0, r = t && t.match(q);
            if (r && e.nodeType === 1) {
                while (i = r[n++]) {
                    e.removeAttribute(i)
                }
            }
        }
    });
    ht = {
        set: function(e, t, i) {
            if (t === false) {
                x.removeAttr(e, i)
            } else {
                e.setAttribute(i, i)
            }
            return i
        }
    };
    x.each(x.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var i = gt[t] || x.find.attr;
        gt[t] = function(e, t, n) {
            var r, o, s = t.toLowerCase();
            if (!n) {
                o = gt[s];
                gt[s] = r;
                r = i(e, t, n) != null ? s : null;
                gt[s] = o
            }
            return r
        }
    });
    var mt = /^(?:input|select|textarea|button)$/i
      , vt = /^(?:a|area)$/i;
    x.fn.extend({
        prop: function(e, t) {
            return U(this, x.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[x.propFix[e] || e]
            })
        }
    });
    x.extend({
        prop: function(e, t, i) {
            var n, r, o = e.nodeType;
            if (o === 3 || o === 8 || o === 2) {
                return
            }
            if (o !== 1 || !x.isXMLDoc(e)) {
                t = x.propFix[t] || t;
                r = x.propHooks[t]
            }
            if (i !== undefined) {
                if (r && "set"in r && (n = r.set(e, i, t)) !== undefined) {
                    return n
                }
                return e[t] = i
            }
            if (r && "get"in r && (n = r.get(e, t)) !== null) {
                return n
            }
            return e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = x.find.attr(e, "tabindex");
                    if (t) {
                        return parseInt(t, 10)
                    }
                    if (mt.test(e.nodeName) || vt.test(e.nodeName) && e.href) {
                        return 0
                    }
                    return -1
                }
            }
        },
        propFix: {
            for: "htmlFor",
            class: "className"
        }
    });
    if (!h.optSelected) {
        x.propHooks.selected = {
            get: function(e) {
                var t = e.parentNode;
                if (t && t.parentNode) {
                    t.parentNode.selectedIndex
                }
                return null
            },
            set: function(e) {
                var t = e.parentNode;
                if (t) {
                    t.selectedIndex;
                    if (t.parentNode) {
                        t.parentNode.selectedIndex
                    }
                }
            }
        }
    }
    x.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        x.propFix[this.toLowerCase()] = this
    });
    function yt(e) {
        var t = e.match(q) || [];
        return t.join(" ")
    }
    function bt(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }
    function wt(e) {
        if (Array.isArray(e)) {
            return e
        }
        if (typeof e === "string") {
            return e.match(q) || []
        }
        return []
    }
    x.fn.extend({
        addClass: function(e) {
            var t, i, n, r, o, s, a, l = 0;
            if (g(e)) {
                return this.each(function(t) {
                    x(this).addClass(e.call(this, t, bt(this)))
                })
            }
            t = wt(e);
            if (t.length) {
                while (i = this[l++]) {
                    r = bt(i);
                    n = i.nodeType === 1 && " " + yt(r) + " ";
                    if (n) {
                        s = 0;
                        while (o = t[s++]) {
                            if (n.indexOf(" " + o + " ") < 0) {
                                n += o + " "
                            }
                        }
                        a = yt(n);
                        if (r !== a) {
                            i.setAttribute("class", a)
                        }
                    }
                }
            }
            return this
        },
        removeClass: function(e) {
            var t, i, n, r, o, s, a, l = 0;
            if (g(e)) {
                return this.each(function(t) {
                    x(this).removeClass(e.call(this, t, bt(this)))
                })
            }
            if (!arguments.length) {
                return this.attr("class", "")
            }
            t = wt(e);
            if (t.length) {
                while (i = this[l++]) {
                    r = bt(i);
                    n = i.nodeType === 1 && " " + yt(r) + " ";
                    if (n) {
                        s = 0;
                        while (o = t[s++]) {
                            while (n.indexOf(" " + o + " ") > -1) {
                                n = n.replace(" " + o + " ", " ")
                            }
                        }
                        a = yt(n);
                        if (r !== a) {
                            i.setAttribute("class", a)
                        }
                    }
                }
            }
            return this
        },
        toggleClass: function(e, t) {
            var i = typeof e
              , n = i === "string" || Array.isArray(e);
            if (typeof t === "boolean" && n) {
                return t ? this.addClass(e) : this.removeClass(e)
            }
            if (g(e)) {
                return this.each(function(i) {
                    x(this).toggleClass(e.call(this, i, bt(this), t), t)
                })
            }
            return this.each(function() {
                var t, r, o, s;
                if (n) {
                    r = 0;
                    o = x(this);
                    s = wt(e);
                    while (t = s[r++]) {
                        if (o.hasClass(t)) {
                            o.removeClass(t)
                        } else {
                            o.addClass(t)
                        }
                    }
                } else if (e === undefined || i === "boolean") {
                    t = bt(this);
                    if (t) {
                        Z.set(this, "__className__", t)
                    }
                    if (this.setAttribute) {
                        this.setAttribute("class", t || e === false ? "" : Z.get(this, "__className__") || "")
                    }
                }
            })
        },
        hasClass: function(e) {
            var t, i, n = 0;
            t = " " + e + " ";
            while (i = this[n++]) {
                if (i.nodeType === 1 && (" " + yt(bt(i)) + " ").indexOf(t) > -1) {
                    return true
                }
            }
            return false
        }
    });
    var xt = /\r/g;
    x.fn.extend({
        val: function(e) {
            var t, i, n, r = this[0];
            if (!arguments.length) {
                if (r) {
                    t = x.valHooks[r.type] || x.valHooks[r.nodeName.toLowerCase()];
                    if (t && "get"in t && (i = t.get(r, "value")) !== undefined) {
                        return i
                    }
                    i = r.value;
                    if (typeof i === "string") {
                        return i.replace(xt, "")
                    }
                    return i == null ? "" : i
                }
                return
            }
            n = g(e);
            return this.each(function(i) {
                var r;
                if (this.nodeType !== 1) {
                    return
                }
                if (n) {
                    r = e.call(this, i, x(this).val())
                } else {
                    r = e
                }
                if (r == null) {
                    r = ""
                } else if (typeof r === "number") {
                    r += ""
                } else if (Array.isArray(r)) {
                    r = x.map(r, function(e) {
                        return e == null ? "" : e + ""
                    })
                }
                t = x.valHooks[this.type] || x.valHooks[this.nodeName.toLowerCase()];
                if (!t || !("set"in t) || t.set(this, r, "value") === undefined) {
                    this.value = r
                }
            })
        }
    });
    x.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = x.find.attr(e, "value");
                    return t != null ? t : yt(x.text(e))
                }
            },
            select: {
                get: function(e) {
                    var t, i, n, r = e.options, o = e.selectedIndex, s = e.type === "select-one", a = s ? null : [], l = s ? o + 1 : r.length;
                    if (o < 0) {
                        n = l
                    } else {
                        n = s ? o : 0
                    }
                    for (; n < l; n++) {
                        i = r[n];
                        if ((i.selected || n === o) && !i.disabled && (!i.parentNode.disabled || !E(i.parentNode, "optgroup"))) {
                            t = x(i).val();
                            if (s) {
                                return t
                            }
                            a.push(t)
                        }
                    }
                    return a
                },
                set: function(e, t) {
                    var i, n, r = e.options, o = x.makeArray(t), s = r.length;
                    while (s--) {
                        n = r[s];
                        if (n.selected = x.inArray(x.valHooks.option.get(n), o) > -1) {
                            i = true
                        }
                    }
                    if (!i) {
                        e.selectedIndex = -1
                    }
                    return o
                }
            }
        }
    });
    x.each(["radio", "checkbox"], function() {
        x.valHooks[this] = {
            set: function(e, t) {
                if (Array.isArray(t)) {
                    return e.checked = x.inArray(x(e).val(), t) > -1
                }
            }
        };
        if (!h.checkOn) {
            x.valHooks[this].get = function(e) {
                return e.getAttribute("value") === null ? "on" : e.value
            }
        }
    });
    h.focusin = "onfocusin"in e;
    var Tt = /^(?:focusinfocus|focusoutblur)$/
      , Ct = function(e) {
        e.stopPropagation()
    };
    x.extend(x.event, {
        trigger: function(t, i, r, o) {
            var s, a, l, u, c, f, p, h, v = [r || n], y = d.call(t, "type") ? t.type : t, b = d.call(t, "namespace") ? t.namespace.split(".") : [];
            a = h = l = r = r || n;
            if (r.nodeType === 3 || r.nodeType === 8) {
                return
            }
            if (Tt.test(y + x.event.triggered)) {
                return
            }
            if (y.indexOf(".") > -1) {
                b = y.split(".");
                y = b.shift();
                b.sort()
            }
            c = y.indexOf(":") < 0 && "on" + y;
            t = t[x.expando] ? t : new x.Event(y,typeof t === "object" && t);
            t.isTrigger = o ? 2 : 3;
            t.namespace = b.join(".");
            t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + b.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
            t.result = undefined;
            if (!t.target) {
                t.target = r
            }
            i = i == null ? [t] : x.makeArray(i, [t]);
            p = x.event.special[y] || {};
            if (!o && p.trigger && p.trigger.apply(r, i) === false) {
                return
            }
            if (!o && !p.noBubble && !m(r)) {
                u = p.delegateType || y;
                if (!Tt.test(u + y)) {
                    a = a.parentNode
                }
                for (; a; a = a.parentNode) {
                    v.push(a);
                    l = a
                }
                if (l === (r.ownerDocument || n)) {
                    v.push(l.defaultView || l.parentWindow || e)
                }
            }
            s = 0;
            while ((a = v[s++]) && !t.isPropagationStopped()) {
                h = a;
                t.type = s > 1 ? u : p.bindType || y;
                f = (Z.get(a, "events") || {})[t.type] && Z.get(a, "handle");
                if (f) {
                    f.apply(a, i)
                }
                f = c && a[c];
                if (f && f.apply && K(a)) {
                    t.result = f.apply(a, i);
                    if (t.result === false) {
                        t.preventDefault()
                    }
                }
            }
            t.type = y;
            if (!o && !t.isDefaultPrevented()) {
                if ((!p._default || p._default.apply(v.pop(), i) === false) && K(r)) {
                    if (c && g(r[y]) && !m(r)) {
                        l = r[c];
                        if (l) {
                            r[c] = null
                        }
                        x.event.triggered = y;
                        if (t.isPropagationStopped()) {
                            h.addEventListener(y, Ct)
                        }
                        r[y]();
                        if (t.isPropagationStopped()) {
                            h.removeEventListener(y, Ct)
                        }
                        x.event.triggered = undefined;
                        if (l) {
                            r[c] = l
                        }
                    }
                }
            }
            return t.result
        },
        simulate: function(e, t, i) {
            var n = x.extend(new x.Event, i, {
                type: e,
                isSimulated: true
            });
            x.event.trigger(n, null, t)
        }
    });
    x.fn.extend({
        trigger: function(e, t) {
            return this.each(function() {
                x.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var i = this[0];
            if (i) {
                return x.event.trigger(e, t, i, true)
            }
        }
    });
    if (!h.focusin) {
        x.each({
            focus: "focusin",
            blur: "focusout"
        }, function(e, t) {
            var i = function(e) {
                x.event.simulate(t, e.target, x.event.fix(e))
            };
            x.event.special[t] = {
                setup: function() {
                    var n = this.ownerDocument || this
                      , r = Z.access(n, t);
                    if (!r) {
                        n.addEventListener(e, i, true)
                    }
                    Z.access(n, t, (r || 0) + 1)
                },
                teardown: function() {
                    var n = this.ownerDocument || this
                      , r = Z.access(n, t) - 1;
                    if (!r) {
                        n.removeEventListener(e, i, true);
                        Z.remove(n, t)
                    } else {
                        Z.access(n, t, r)
                    }
                }
            }
        })
    }
    var St = e.location;
    var kt = Date.now();
    var $t = /\?/;
    x.parseXML = function(t) {
        var i;
        if (!t || typeof t !== "string") {
            return null
        }
        try {
            i = (new e.DOMParser).parseFromString(t, "text/xml")
        } catch (e) {
            i = undefined
        }
        if (!i || i.getElementsByTagName("parsererror").length) {
            x.error("Invalid XML: " + t)
        }
        return i
    }
    ;
    var At = /\[\]$/
      , Et = /\r?\n/g
      , _t = /^(?:submit|button|image|reset|file)$/i
      , Dt = /^(?:input|select|textarea|keygen)/i;
    function Ot(e, t, i, n) {
        var r;
        if (Array.isArray(t)) {
            x.each(t, function(t, r) {
                if (i || At.test(e)) {
                    n(e, r)
                } else {
                    Ot(e + "[" + (typeof r === "object" && r != null ? t : "") + "]", r, i, n)
                }
            })
        } else if (!i && b(t) === "object") {
            for (r in t) {
                Ot(e + "[" + r + "]", t[r], i, n)
            }
        } else {
            n(e, t)
        }
    }
    x.param = function(e, t) {
        var i, n = [], r = function(e, t) {
            var i = g(t) ? t() : t;
            n[n.length] = encodeURIComponent(e) + "=" + encodeURIComponent(i == null ? "" : i)
        };
        if (Array.isArray(e) || e.jquery && !x.isPlainObject(e)) {
            x.each(e, function() {
                r(this.name, this.value)
            })
        } else {
            for (i in e) {
                Ot(i, e[i], t, r)
            }
        }
        return n.join("&")
    }
    ;
    x.fn.extend({
        serialize: function() {
            return x.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = x.prop(this, "elements");
                return e ? x.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !x(this).is(":disabled") && Dt.test(this.nodeName) && !_t.test(e) && (this.checked || !pe.test(e))
            }).map(function(e, t) {
                var i = x(this).val();
                if (i == null) {
                    return null
                }
                if (Array.isArray(i)) {
                    return x.map(i, function(e) {
                        return {
                            name: t.name,
                            value: e.replace(Et, "\r\n")
                        }
                    })
                }
                return {
                    name: t.name,
                    value: i.replace(Et, "\r\n")
                }
            }).get()
        }
    });
    var It = /%20/g
      , Lt = /#.*$/
      , Nt = /([?&])_=[^&]*/
      , jt = /^(.*?):[ \t]*([^\r\n]*)$/gm
      , Pt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/
      , qt = /^(?:GET|HEAD)$/
      , Ht = /^\/\//
      , Mt = {}
      , Rt = {}
      , zt = "*/".concat("*")
      , Ft = n.createElement("a");
    Ft.href = St.href;
    function Wt(e) {
        return function(t, i) {
            if (typeof t !== "string") {
                i = t;
                t = "*"
            }
            var n, r = 0, o = t.toLowerCase().match(q) || [];
            if (g(i)) {
                while (n = o[r++]) {
                    if (n[0] === "+") {
                        n = n.slice(1) || "*";
                        (e[n] = e[n] || []).unshift(i)
                    } else {
                        (e[n] = e[n] || []).push(i)
                    }
                }
            }
        }
    }
    function Bt(e, t, i, n) {
        var r = {}
          , o = e === Rt;
        function s(a) {
            var l;
            r[a] = true;
            x.each(e[a] || [], function(e, a) {
                var u = a(t, i, n);
                if (typeof u === "string" && !o && !r[u]) {
                    t.dataTypes.unshift(u);
                    s(u);
                    return false
                } else if (o) {
                    return !(l = u)
                }
            });
            return l
        }
        return s(t.dataTypes[0]) || !r["*"] && s("*")
    }
    function Ut(e, t) {
        var i, n, r = x.ajaxSettings.flatOptions || {};
        for (i in t) {
            if (t[i] !== undefined) {
                (r[i] ? e : n || (n = {}))[i] = t[i]
            }
        }
        if (n) {
            x.extend(true, e, n)
        }
        return e
    }
    function Gt(e, t, i) {
        var n, r, o, s, a = e.contents, l = e.dataTypes;
        while (l[0] === "*") {
            l.shift();
            if (n === undefined) {
                n = e.mimeType || t.getResponseHeader("Content-Type")
            }
        }
        if (n) {
            for (r in a) {
                if (a[r] && a[r].test(n)) {
                    l.unshift(r);
                    break
                }
            }
        }
        if (l[0]in i) {
            o = l[0]
        } else {
            for (r in i) {
                if (!l[0] || e.converters[r + " " + l[0]]) {
                    o = r;
                    break
                }
                if (!s) {
                    s = r
                }
            }
            o = o || s
        }
        if (o) {
            if (o !== l[0]) {
                l.unshift(o)
            }
            return i[o]
        }
    }
    function Vt(e, t, i, n) {
        var r, o, s, a, l, u = {}, c = e.dataTypes.slice();
        if (c[1]) {
            for (s in e.converters) {
                u[s.toLowerCase()] = e.converters[s]
            }
        }
        o = c.shift();
        while (o) {
            if (e.responseFields[o]) {
                i[e.responseFields[o]] = t
            }
            if (!l && n && e.dataFilter) {
                t = e.dataFilter(t, e.dataType)
            }
            l = o;
            o = c.shift();
            if (o) {
                if (o === "*") {
                    o = l
                } else if (l !== "*" && l !== o) {
                    s = u[l + " " + o] || u["* " + o];
                    if (!s) {
                        for (r in u) {
                            a = r.split(" ");
                            if (a[1] === o) {
                                s = u[l + " " + a[0]] || u["* " + a[0]];
                                if (s) {
                                    if (s === true) {
                                        s = u[r]
                                    } else if (u[r] !== true) {
                                        o = a[0];
                                        c.unshift(a[1])
                                    }
                                    break
                                }
                            }
                        }
                    }
                    if (s !== true) {
                        if (s && e.throws) {
                            t = s(t)
                        } else {
                            try {
                                t = s(t)
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: s ? e : "No conversion from " + l + " to " + o
                                }
                            }
                        }
                    }
                }
            }
        }
        return {
            state: "success",
            data: t
        }
    }
    x.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: St.href,
            type: "GET",
            isLocal: Pt.test(St.protocol),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": zt,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": true,
                "text json": JSON.parse,
                "text xml": x.parseXML
            },
            flatOptions: {
                url: true,
                context: true
            }
        },
        ajaxSetup: function(e, t) {
            return t ? Ut(Ut(e, x.ajaxSettings), t) : Ut(x.ajaxSettings, e)
        },
        ajaxPrefilter: Wt(Mt),
        ajaxTransport: Wt(Rt),
        ajax: function(t, i) {
            if (typeof t === "object") {
                i = t;
                t = undefined
            }
            i = i || {};
            var r, o, s, a, l, u, c, d, f, p, h = x.ajaxSetup({}, i), g = h.context || h, m = h.context && (g.nodeType || g.jquery) ? x(g) : x.event, v = x.Deferred(), y = x.Callbacks("once memory"), b = h.statusCode || {}, w = {}, T = {}, C = "canceled", S = {
                readyState: 0,
                getResponseHeader: function(e) {
                    var t;
                    if (c) {
                        if (!a) {
                            a = {};
                            while (t = jt.exec(s)) {
                                a[t[1].toLowerCase()] = t[2]
                            }
                        }
                        t = a[e.toLowerCase()]
                    }
                    return t == null ? null : t
                },
                getAllResponseHeaders: function() {
                    return c ? s : null
                },
                setRequestHeader: function(e, t) {
                    if (c == null) {
                        e = T[e.toLowerCase()] = T[e.toLowerCase()] || e;
                        w[e] = t
                    }
                    return this
                },
                overrideMimeType: function(e) {
                    if (c == null) {
                        h.mimeType = e
                    }
                    return this
                },
                statusCode: function(e) {
                    var t;
                    if (e) {
                        if (c) {
                            S.always(e[S.status])
                        } else {
                            for (t in e) {
                                b[t] = [b[t], e[t]]
                            }
                        }
                    }
                    return this
                },
                abort: function(e) {
                    var t = e || C;
                    if (r) {
                        r.abort(t)
                    }
                    k(0, t);
                    return this
                }
            };
            v.promise(S);
            h.url = ((t || h.url || St.href) + "").replace(Ht, St.protocol + "//");
            h.type = i.method || i.type || h.method || h.type;
            h.dataTypes = (h.dataType || "*").toLowerCase().match(q) || [""];
            if (h.crossDomain == null) {
                u = n.createElement("a");
                try {
                    u.href = h.url;
                    u.href = u.href;
                    h.crossDomain = Ft.protocol + "//" + Ft.host !== u.protocol + "//" + u.host
                } catch (e) {
                    h.crossDomain = true
                }
            }
            if (h.data && h.processData && typeof h.data !== "string") {
                h.data = x.param(h.data, h.traditional)
            }
            Bt(Mt, h, i, S);
            if (c) {
                return S
            }
            d = x.event && h.global;
            if (d && x.active++ === 0) {
                x.event.trigger("ajaxStart")
            }
            h.type = h.type.toUpperCase();
            h.hasContent = !qt.test(h.type);
            o = h.url.replace(Lt, "");
            if (!h.hasContent) {
                p = h.url.slice(o.length);
                if (h.data && (h.processData || typeof h.data === "string")) {
                    o += ($t.test(o) ? "&" : "?") + h.data;
                    delete h.data
                }
                if (h.cache === false) {
                    o = o.replace(Nt, "$1");
                    p = ($t.test(o) ? "&" : "?") + "_=" + kt++ + p
                }
                h.url = o + p
            } else if (h.data && h.processData && (h.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
                h.data = h.data.replace(It, "+")
            }
            if (h.ifModified) {
                if (x.lastModified[o]) {
                    S.setRequestHeader("If-Modified-Since", x.lastModified[o])
                }
                if (x.etag[o]) {
                    S.setRequestHeader("If-None-Match", x.etag[o])
                }
            }
            if (h.data && h.hasContent && h.contentType !== false || i.contentType) {
                S.setRequestHeader("Content-Type", h.contentType)
            }
            S.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + (h.dataTypes[0] !== "*" ? ", " + zt + "; q=0.01" : "") : h.accepts["*"]);
            for (f in h.headers) {
                S.setRequestHeader(f, h.headers[f])
            }
            if (h.beforeSend && (h.beforeSend.call(g, S, h) === false || c)) {
                return S.abort()
            }
            C = "abort";
            y.add(h.complete);
            S.done(h.success);
            S.fail(h.error);
            r = Bt(Rt, h, i, S);
            if (!r) {
                k(-1, "No Transport")
            } else {
                S.readyState = 1;
                if (d) {
                    m.trigger("ajaxSend", [S, h])
                }
                if (c) {
                    return S
                }
                if (h.async && h.timeout > 0) {
                    l = e.setTimeout(function() {
                        S.abort("timeout")
                    }, h.timeout)
                }
                try {
                    c = false;
                    r.send(w, k)
                } catch (e) {
                    if (c) {
                        throw e
                    }
                    k(-1, e)
                }
            }
            function k(t, i, n, a) {
                var u, f, p, w, T, C = i;
                if (c) {
                    return
                }
                c = true;
                if (l) {
                    e.clearTimeout(l)
                }
                r = undefined;
                s = a || "";
                S.readyState = t > 0 ? 4 : 0;
                u = t >= 200 && t < 300 || t === 304;
                if (n) {
                    w = Gt(h, S, n)
                }
                w = Vt(h, w, S, u);
                if (u) {
                    if (h.ifModified) {
                        T = S.getResponseHeader("Last-Modified");
                        if (T) {
                            x.lastModified[o] = T
                        }
                        T = S.getResponseHeader("etag");
                        if (T) {
                            x.etag[o] = T
                        }
                    }
                    if (t === 204 || h.type === "HEAD") {
                        C = "nocontent"
                    } else if (t === 304) {
                        C = "notmodified"
                    } else {
                        C = w.state;
                        f = w.data;
                        p = w.error;
                        u = !p
                    }
                } else {
                    p = C;
                    if (t || !C) {
                        C = "error";
                        if (t < 0) {
                            t = 0
                        }
                    }
                }
                S.status = t;
                S.statusText = (i || C) + "";
                if (u) {
                    v.resolveWith(g, [f, C, S])
                } else {
                    v.rejectWith(g, [S, C, p])
                }
                S.statusCode(b);
                b = undefined;
                if (d) {
                    m.trigger(u ? "ajaxSuccess" : "ajaxError", [S, h, u ? f : p])
                }
                y.fireWith(g, [S, C]);
                if (d) {
                    m.trigger("ajaxComplete", [S, h]);
                    if (!--x.active) {
                        x.event.trigger("ajaxStop")
                    }
                }
            }
            return S
        },
        getJSON: function(e, t, i) {
            return x.get(e, t, i, "json")
        },
        getScript: function(e, t) {
            return x.get(e, undefined, t, "script")
        }
    });
    x.each(["get", "post"], function(e, t) {
        x[t] = function(e, i, n, r) {
            if (g(i)) {
                r = r || n;
                n = i;
                i = undefined
            }
            return x.ajax(x.extend({
                url: e,
                type: t,
                dataType: r,
                data: i,
                success: n
            }, x.isPlainObject(e) && e))
        }
    });
    x._evalUrl = function(e) {
        return x.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            cache: true,
            async: false,
            global: false,
            throws: true
        })
    }
    ;
    x.fn.extend({
        wrapAll: function(e) {
            var t;
            if (this[0]) {
                if (g(e)) {
                    e = e.call(this[0])
                }
                t = x(e, this[0].ownerDocument).eq(0).clone(true);
                if (this[0].parentNode) {
                    t.insertBefore(this[0])
                }
                t.map(function() {
                    var e = this;
                    while (e.firstElementChild) {
                        e = e.firstElementChild
                    }
                    return e
                }).append(this)
            }
            return this
        },
        wrapInner: function(e) {
            if (g(e)) {
                return this.each(function(t) {
                    x(this).wrapInner(e.call(this, t))
                })
            }
            return this.each(function() {
                var t = x(this)
                  , i = t.contents();
                if (i.length) {
                    i.wrapAll(e)
                } else {
                    t.append(e)
                }
            })
        },
        wrap: function(e) {
            var t = g(e);
            return this.each(function(i) {
                x(this).wrapAll(t ? e.call(this, i) : e)
            })
        },
        unwrap: function(e) {
            this.parent(e).not("body").each(function() {
                x(this).replaceWith(this.childNodes)
            });
            return this
        }
    });
    x.expr.pseudos.hidden = function(e) {
        return !x.expr.pseudos.visible(e)
    }
    ;
    x.expr.pseudos.visible = function(e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
    }
    ;
    x.ajaxSettings.xhr = function() {
        try {
            return new e.XMLHttpRequest
        } catch (e) {}
    }
    ;
    var Yt = {
        0: 200,
        1223: 204
    }
      , Xt = x.ajaxSettings.xhr();
    h.cors = !!Xt && "withCredentials"in Xt;
    h.ajax = Xt = !!Xt;
    x.ajaxTransport(function(t) {
        var i, n;
        if (h.cors || Xt && !t.crossDomain) {
            return {
                send: function(r, o) {
                    var s, a = t.xhr();
                    a.open(t.type, t.url, t.async, t.username, t.password);
                    if (t.xhrFields) {
                        for (s in t.xhrFields) {
                            a[s] = t.xhrFields[s]
                        }
                    }
                    if (t.mimeType && a.overrideMimeType) {
                        a.overrideMimeType(t.mimeType)
                    }
                    if (!t.crossDomain && !r["X-Requested-With"]) {
                        r["X-Requested-With"] = "XMLHttpRequest"
                    }
                    for (s in r) {
                        a.setRequestHeader(s, r[s])
                    }
                    i = function(e) {
                        return function() {
                            if (i) {
                                i = n = a.onload = a.onerror = a.onabort = a.ontimeout = a.onreadystatechange = null;
                                if (e === "abort") {
                                    a.abort()
                                } else if (e === "error") {
                                    if (typeof a.status !== "number") {
                                        o(0, "error")
                                    } else {
                                        o(a.status, a.statusText)
                                    }
                                } else {
                                    o(Yt[a.status] || a.status, a.statusText, (a.responseType || "text") !== "text" || typeof a.responseText !== "string" ? {
                                        binary: a.response
                                    } : {
                                        text: a.responseText
                                    }, a.getAllResponseHeaders())
                                }
                            }
                        }
                    }
                    ;
                    a.onload = i();
                    n = a.onerror = a.ontimeout = i("error");
                    if (a.onabort !== undefined) {
                        a.onabort = n
                    } else {
                        a.onreadystatechange = function() {
                            if (a.readyState === 4) {
                                e.setTimeout(function() {
                                    if (i) {
                                        n()
                                    }
                                })
                            }
                        }
                    }
                    i = i("abort");
                    try {
                        a.send(t.hasContent && t.data || null)
                    } catch (e) {
                        if (i) {
                            throw e
                        }
                    }
                },
                abort: function() {
                    if (i) {
                        i()
                    }
                }
            }
        }
    });
    x.ajaxPrefilter(function(e) {
        if (e.crossDomain) {
            e.contents.script = false
        }
    });
    x.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                x.globalEval(e);
                return e
            }
        }
    });
    x.ajaxPrefilter("script", function(e) {
        if (e.cache === undefined) {
            e.cache = false
        }
        if (e.crossDomain) {
            e.type = "GET"
        }
    });
    x.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var t, i;
            return {
                send: function(r, o) {
                    t = x("<script>").prop({
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", i = function(e) {
                        t.remove();
                        i = null;
                        if (e) {
                            o(e.type === "error" ? 404 : 200, e.type)
                        }
                    }
                    );
                    n.head.appendChild(t[0])
                },
                abort: function() {
                    if (i) {
                        i()
                    }
                }
            }
        }
    });
    var Kt = []
      , Qt = /(=)\?(?=&|$)|\?\?/;
    x.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Kt.pop() || x.expando + "_" + kt++;
            this[e] = true;
            return e
        }
    });
    x.ajaxPrefilter("json jsonp", function(t, i, n) {
        var r, o, s, a = t.jsonp !== false && (Qt.test(t.url) ? "url" : typeof t.data === "string" && (t.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && Qt.test(t.data) && "data");
        if (a || t.dataTypes[0] === "jsonp") {
            r = t.jsonpCallback = g(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback;
            if (a) {
                t[a] = t[a].replace(Qt, "$1" + r)
            } else if (t.jsonp !== false) {
                t.url += ($t.test(t.url) ? "&" : "?") + t.jsonp + "=" + r
            }
            t.converters["script json"] = function() {
                if (!s) {
                    x.error(r + " was not called")
                }
                return s[0]
            }
            ;
            t.dataTypes[0] = "json";
            o = e[r];
            e[r] = function() {
                s = arguments
            }
            ;
            n.always(function() {
                if (o === undefined) {
                    x(e).removeProp(r)
                } else {
                    e[r] = o
                }
                if (t[r]) {
                    t.jsonpCallback = i.jsonpCallback;
                    Kt.push(r)
                }
                if (s && g(o)) {
                    o(s[0])
                }
                s = o = undefined
            });
            return "script"
        }
    });
    h.createHTMLDocument = function() {
        var e = n.implementation.createHTMLDocument("").body;
        e.innerHTML = "<form></form><form></form>";
        return e.childNodes.length === 2
    }();
    x.parseHTML = function(e, t, i) {
        if (typeof e !== "string") {
            return []
        }
        if (typeof t === "boolean") {
            i = t;
            t = false
        }
        var r, o, s;
        if (!t) {
            if (h.createHTMLDocument) {
                t = n.implementation.createHTMLDocument("");
                r = t.createElement("base");
                r.href = n.location.href;
                t.head.appendChild(r)
            } else {
                t = n
            }
        }
        o = _.exec(e);
        s = !i && [];
        if (o) {
            return [t.createElement(o[1])]
        }
        o = we([e], t, s);
        if (s && s.length) {
            x(s).remove()
        }
        return x.merge([], o.childNodes)
    }
    ;
    x.fn.load = function(e, t, i) {
        var n, r, o, s = this, a = e.indexOf(" ");
        if (a > -1) {
            n = yt(e.slice(a));
            e = e.slice(0, a)
        }
        if (g(t)) {
            i = t;
            t = undefined
        } else if (t && typeof t === "object") {
            r = "POST"
        }
        if (s.length > 0) {
            x.ajax({
                url: e,
                type: r || "GET",
                dataType: "html",
                data: t
            }).done(function(e) {
                o = arguments;
                s.html(n ? x("<div>").append(x.parseHTML(e)).find(n) : e)
            }).always(i && function(e, t) {
                s.each(function() {
                    i.apply(this, o || [e.responseText, t, e])
                })
            }
            )
        }
        return this
    }
    ;
    x.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        x.fn[t] = function(e) {
            return this.on(t, e)
        }
    });
    x.expr.pseudos.animated = function(e) {
        return x.grep(x.timers, function(t) {
            return e === t.elem
        }).length
    }
    ;
    x.offset = {
        setOffset: function(e, t, i) {
            var n, r, o, s, a, l, u, c = x.css(e, "position"), d = x(e), f = {};
            if (c === "static") {
                e.style.position = "relative"
            }
            a = d.offset();
            o = x.css(e, "top");
            l = x.css(e, "left");
            u = (c === "absolute" || c === "fixed") && (o + l).indexOf("auto") > -1;
            if (u) {
                n = d.position();
                s = n.top;
                r = n.left
            } else {
                s = parseFloat(o) || 0;
                r = parseFloat(l) || 0
            }
            if (g(t)) {
                t = t.call(e, i, x.extend({}, a))
            }
            if (t.top != null) {
                f.top = t.top - a.top + s
            }
            if (t.left != null) {
                f.left = t.left - a.left + r
            }
            if ("using"in t) {
                t.using.call(e, f)
            } else {
                d.css(f)
            }
        }
    };
    x.fn.extend({
        offset: function(e) {
            if (arguments.length) {
                return e === undefined ? this : this.each(function(t) {
                    x.offset.setOffset(this, e, t)
                })
            }
            var t, i, n = this[0];
            if (!n) {
                return
            }
            if (!n.getClientRects().length) {
                return {
                    top: 0,
                    left: 0
                }
            }
            t = n.getBoundingClientRect();
            i = n.ownerDocument.defaultView;
            return {
                top: t.top + i.pageYOffset,
                left: t.left + i.pageXOffset
            }
        },
        position: function() {
            if (!this[0]) {
                return
            }
            var e, t, i, n = this[0], r = {
                top: 0,
                left: 0
            };
            if (x.css(n, "position") === "fixed") {
                t = n.getBoundingClientRect()
            } else {
                t = this.offset();
                i = n.ownerDocument;
                e = n.offsetParent || i.documentElement;
                while (e && (e === i.body || e === i.documentElement) && x.css(e, "position") === "static") {
                    e = e.parentNode
                }
                if (e && e !== n && e.nodeType === 1) {
                    r = x(e).offset();
                    r.top += x.css(e, "borderTopWidth", true);
                    r.left += x.css(e, "borderLeftWidth", true)
                }
            }
            return {
                top: t.top - r.top - x.css(n, "marginTop", true),
                left: t.left - r.left - x.css(n, "marginLeft", true)
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var e = this.offsetParent;
                while (e && x.css(e, "position") === "static") {
                    e = e.offsetParent
                }
                return e || xe
            })
        }
    });
    x.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, t) {
        var i = "pageYOffset" === t;
        x.fn[e] = function(n) {
            return U(this, function(e, n, r) {
                var o;
                if (m(e)) {
                    o = e
                } else if (e.nodeType === 9) {
                    o = e.defaultView
                }
                if (r === undefined) {
                    return o ? o[t] : e[n]
                }
                if (o) {
                    o.scrollTo(!i ? r : o.pageXOffset, i ? r : o.pageYOffset)
                } else {
                    e[n] = r
                }
            }, e, n, arguments.length)
        }
    });
    x.each(["top", "left"], function(e, t) {
        x.cssHooks[t] = Be(h.pixelPosition, function(e, i) {
            if (i) {
                i = We(e, t);
                return Re.test(i) ? x(e).position()[t] + "px" : i
            }
        })
    });
    x.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        x.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(i, n) {
            x.fn[n] = function(r, o) {
                var s = arguments.length && (i || typeof r !== "boolean")
                  , a = i || (r === true || o === true ? "margin" : "border");
                return U(this, function(t, i, r) {
                    var o;
                    if (m(t)) {
                        return n.indexOf("outer") === 0 ? t["inner" + e] : t.document.documentElement["client" + e]
                    }
                    if (t.nodeType === 9) {
                        o = t.documentElement;
                        return Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])
                    }
                    return r === undefined ? x.css(t, i, a) : x.style(t, i, r, a)
                }, t, s ? r : undefined, s)
            }
        })
    });
    x.each(("blur focus focusin focusout resize scroll click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup contextmenu").split(" "), function(e, t) {
        x.fn[t] = function(e, i) {
            return arguments.length > 0 ? this.on(t, null, e, i) : this.trigger(t)
        }
    });
    x.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    });
    x.fn.extend({
        bind: function(e, t, i) {
            return this.on(e, null, t, i)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, i, n) {
            return this.on(t, e, i, n)
        },
        undelegate: function(e, t, i) {
            return arguments.length === 1 ? this.off(e, "**") : this.off(t, e || "**", i)
        }
    });
    x.proxy = function(e, t) {
        var i, n, r;
        if (typeof t === "string") {
            i = e[t];
            t = e;
            e = i
        }
        if (!g(e)) {
            return undefined
        }
        n = o.call(arguments, 2);
        r = function() {
            return e.apply(t || this, n.concat(o.call(arguments)))
        }
        ;
        r.guid = e.guid = e.guid || x.guid++;
        return r
    }
    ;
    x.holdReady = function(e) {
        if (e) {
            x.readyWait++
        } else {
            x.ready(true)
        }
    }
    ;
    x.isArray = Array.isArray;
    x.parseJSON = JSON.parse;
    x.nodeName = E;
    x.isFunction = g;
    x.isWindow = m;
    x.camelCase = X;
    x.type = b;
    x.now = Date.now;
    x.isNumeric = function(e) {
        var t = x.type(e);
        return (t === "number" || t === "string") && !isNaN(e - parseFloat(e))
    }
    ;
    if (typeof define === "function" && define.amd) {
        define("jquery", [], function() {
            return x
        })
    }
    var Zt = e.jQuery
      , Jt = e.$;
    x.noConflict = function(t) {
        if (e.$ === x) {
            e.$ = Jt
        }
        if (t && e.jQuery === x) {
            e.jQuery = Zt
        }
        return x
    }
    ;
    if (!t) {
        e.jQuery = e.$ = x
    }
    return x
});
if (typeof jQuery === "undefined") {
    throw new Error("Bootstrap's JavaScript requires jQuery")
}
+function(e) {
    "use strict";
    var t = e.fn.jquery.split(" ")[0].split(".");
    if (t[0] < 2 && t[1] < 9 || t[0] == 1 && t[1] == 9 && t[2] < 1 || t[0] > 3) {
        throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")
    }
}(jQuery);
+function(e) {
    "use strict";
    function t() {
        var e = document.createElement("bootstrap");
        var t = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var i in t) {
            if (e.style[i] !== undefined) {
                return {
                    end: t[i]
                }
            }
        }
        return false
    }
    e.fn.emulateTransitionEnd = function(t) {
        var i = false;
        var n = this;
        e(this).one("bsTransitionEnd", function() {
            i = true
        });
        var r = function() {
            if (!i)
                e(n).trigger(e.support.transition.end)
        };
        setTimeout(r, t);
        return this
    }
    ;
    e(function() {
        e.support.transition = t();
        if (!e.support.transition)
            return;
        e.event.special.bsTransitionEnd = {
            bindType: e.support.transition.end,
            delegateType: e.support.transition.end,
            handle: function(t) {
                if (e(t.target).is(this))
                    return t.handleObj.handler.apply(this, arguments)
            }
        }
    })
}(jQuery);
+function(e) {
    "use strict";
    var t = '[data-dismiss="alert"]';
    var i = function(i) {
        e(i).on("click", t, this.close)
    };
    i.VERSION = "3.3.7";
    i.TRANSITION_DURATION = 150;
    i.prototype.close = function(t) {
        var n = e(this);
        var r = n.attr("data-target");
        if (!r) {
            r = n.attr("href");
            r = r && r.replace(/.*(?=#[^\s]*$)/, "")
        }
        var o = e(r === "#" ? [] : r);
        if (t)
            t.preventDefault();
        if (!o.length) {
            o = n.closest(".alert")
        }
        o.trigger(t = e.Event("close.bs.alert"));
        if (t.isDefaultPrevented())
            return;
        o.removeClass("in");
        function s() {
            o.detach().trigger("closed.bs.alert").remove()
        }
        e.support.transition && o.hasClass("fade") ? o.one("bsTransitionEnd", s).emulateTransitionEnd(i.TRANSITION_DURATION) : s()
    }
    ;
    function n(t) {
        return this.each(function() {
            var n = e(this);
            var r = n.data("bs.alert");
            if (!r)
                n.data("bs.alert", r = new i(this));
            if (typeof t == "string")
                r[t].call(n)
        })
    }
    var r = e.fn.alert;
    e.fn.alert = n;
    e.fn.alert.Constructor = i;
    e.fn.alert.noConflict = function() {
        e.fn.alert = r;
        return this
    }
    ;
    e(document).on("click.bs.alert.data-api", t, i.prototype.close)
}(jQuery);
+function(e) {
    "use strict";
    var t = function(i, n) {
        this.$element = e(i);
        this.options = e.extend({}, t.DEFAULTS, n);
        this.isLoading = false
    };
    t.VERSION = "3.3.7";
    t.DEFAULTS = {
        loadingText: "loading..."
    };
    t.prototype.setState = function(t) {
        var i = "disabled";
        var n = this.$element;
        var r = n.is("input") ? "val" : "html";
        var o = n.data();
        t += "Text";
        if (o.resetText == null)
            n.data("resetText", n[r]());
        setTimeout(e.proxy(function() {
            n[r](o[t] == null ? this.options[t] : o[t]);
            if (t == "loadingText") {
                this.isLoading = true;
                n.addClass(i).attr(i, i).prop(i, true)
            } else if (this.isLoading) {
                this.isLoading = false;
                n.removeClass(i).removeAttr(i).prop(i, false)
            }
        }, this), 0)
    }
    ;
    t.prototype.toggle = function() {
        var e = true;
        var t = this.$element.closest('[data-toggle="buttons"]');
        if (t.length) {
            var i = this.$element.find("input");
            if (i.prop("type") == "radio") {
                if (i.prop("checked"))
                    e = false;
                t.find(".active").removeClass("active");
                this.$element.addClass("active")
            } else if (i.prop("type") == "checkbox") {
                if (i.prop("checked") !== this.$element.hasClass("active"))
                    e = false;
                this.$element.toggleClass("active")
            }
            i.prop("checked", this.$element.hasClass("active"));
            if (e)
                i.trigger("change")
        } else {
            this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
            this.$element.toggleClass("active")
        }
    }
    ;
    function i(i) {
        return this.each(function() {
            var n = e(this);
            var r = n.data("bs.button");
            var o = typeof i == "object" && i;
            if (!r)
                n.data("bs.button", r = new t(this,o));
            if (i == "toggle")
                r.toggle();
            else if (i)
                r.setState(i)
        })
    }
    var n = e.fn.button;
    e.fn.button = i;
    e.fn.button.Constructor = t;
    e.fn.button.noConflict = function() {
        e.fn.button = n;
        return this
    }
    ;
    e(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(t) {
        var n = e(t.target).closest(".btn");
        i.call(n, "toggle");
        if (!e(t.target).is('input[type="radio"], input[type="checkbox"]')) {
            t.preventDefault();
            if (n.is("input,button"))
                n.trigger("focus");
            else
                n.find("input:visible,button:visible").first().trigger("focus")
        }
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(t) {
        e(t.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(t.type))
    })
}(jQuery);
+function(e) {
    "use strict";
    var t = function(t, i) {
        this.$element = e(t);
        this.$indicators = this.$element.find(".carousel-indicators");
        this.options = i;
        this.paused = null;
        this.sliding = null;
        this.interval = null;
        this.$active = null;
        this.$items = null;
        this.options.keyboard && this.$element.on("keydown.bs.carousel", e.proxy(this.keydown, this));
        this.options.pause == "hover" && !("ontouchstart"in document.documentElement) && this.$element.on("mouseenter.bs.carousel", e.proxy(this.pause, this)).on("mouseleave.bs.carousel", e.proxy(this.cycle, this))
    };
    t.VERSION = "3.3.7";
    t.TRANSITION_DURATION = 600;
    t.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: true,
        keyboard: true
    };
    t.prototype.keydown = function(e) {
        if (/input|textarea/i.test(e.target.tagName))
            return;
        switch (e.which) {
        case 37:
            this.prev();
            break;
        case 39:
            this.next();
            break;
        default:
            return
        }
        e.preventDefault()
    }
    ;
    t.prototype.cycle = function(t) {
        t || (this.paused = false);
        this.interval && clearInterval(this.interval);
        this.options.interval && !this.paused && (this.interval = setInterval(e.proxy(this.next, this), this.options.interval));
        return this
    }
    ;
    t.prototype.getItemIndex = function(e) {
        this.$items = e.parent().children(".item");
        return this.$items.index(e || this.$active)
    }
    ;
    t.prototype.getItemForDirection = function(e, t) {
        var i = this.getItemIndex(t);
        var n = e == "prev" && i === 0 || e == "next" && i == this.$items.length - 1;
        if (n && !this.options.wrap)
            return t;
        var r = e == "prev" ? -1 : 1;
        var o = (i + r) % this.$items.length;
        return this.$items.eq(o)
    }
    ;
    t.prototype.to = function(e) {
        var t = this;
        var i = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (e > this.$items.length - 1 || e < 0)
            return;
        if (this.sliding)
            return this.$element.one("slid.bs.carousel", function() {
                t.to(e)
            });
        if (i == e)
            return this.pause().cycle();
        return this.slide(e > i ? "next" : "prev", this.$items.eq(e))
    }
    ;
    t.prototype.pause = function(t) {
        t || (this.paused = true);
        if (this.$element.find(".next, .prev").length && e.support.transition) {
            this.$element.trigger(e.support.transition.end);
            this.cycle(true)
        }
        this.interval = clearInterval(this.interval);
        return this
    }
    ;
    t.prototype.next = function() {
        if (this.sliding)
            return;
        return this.slide("next")
    }
    ;
    t.prototype.prev = function() {
        if (this.sliding)
            return;
        return this.slide("prev")
    }
    ;
    t.prototype.slide = function(i, n) {
        var r = this.$element.find(".item.active");
        var o = n || this.getItemForDirection(i, r);
        var s = this.interval;
        var a = i == "next" ? "left" : "right";
        var l = this;
        if (o.hasClass("active"))
            return this.sliding = false;
        var u = o[0];
        var c = e.Event("slide.bs.carousel", {
            relatedTarget: u,
            direction: a
        });
        this.$element.trigger(c);
        if (c.isDefaultPrevented())
            return;
        this.sliding = true;
        s && this.pause();
        if (this.$indicators.length) {
            this.$indicators.find(".active").removeClass("active");
            var d = e(this.$indicators.children()[this.getItemIndex(o)]);
            d && d.addClass("active")
        }
        var f = e.Event("slid.bs.carousel", {
            relatedTarget: u,
            direction: a
        });
        if (e.support.transition && this.$element.hasClass("slide")) {
            o.addClass(i);
            o[0].offsetWidth;
            r.addClass(a);
            o.addClass(a);
            r.one("bsTransitionEnd", function() {
                o.removeClass([i, a].join(" ")).addClass("active");
                r.removeClass(["active", a].join(" "));
                l.sliding = false;
                setTimeout(function() {
                    l.$element.trigger(f)
                }, 0)
            }).emulateTransitionEnd(t.TRANSITION_DURATION)
        } else {
            r.removeClass("active");
            o.addClass("active");
            this.sliding = false;
            this.$element.trigger(f)
        }
        s && this.cycle();
        return this
    }
    ;
    function i(i) {
        return this.each(function() {
            var n = e(this);
            var r = n.data("bs.carousel");
            var o = e.extend({}, t.DEFAULTS, n.data(), typeof i == "object" && i);
            var s = typeof i == "string" ? i : o.slide;
            if (!r)
                n.data("bs.carousel", r = new t(this,o));
            if (typeof i == "number")
                r.to(i);
            else if (s)
                r[s]();
            else if (o.interval)
                r.pause().cycle()
        })
    }
    var n = e.fn.carousel;
    e.fn.carousel = i;
    e.fn.carousel.Constructor = t;
    e.fn.carousel.noConflict = function() {
        e.fn.carousel = n;
        return this
    }
    ;
    var r = function(t) {
        var n;
        var r = e(this);
        var o = e(r.attr("data-target") || (n = r.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, ""));
        if (!o.hasClass("carousel"))
            return;
        var s = e.extend({}, o.data(), r.data());
        var a = r.attr("data-slide-to");
        if (a)
            s.interval = false;
        i.call(o, s);
        if (a) {
            o.data("bs.carousel").to(a)
        }
        t.preventDefault()
    };
    e(document).on("click.bs.carousel.data-api", "[data-slide]", r).on("click.bs.carousel.data-api", "[data-slide-to]", r);
    e(window).on("load", function() {
        e('[data-ride="carousel"]').each(function() {
            var t = e(this);
            i.call(t, t.data())
        })
    })
}(jQuery);
+function(e) {
    "use strict";
    var t = function(i, n) {
        this.$element = e(i);
        this.options = e.extend({}, t.DEFAULTS, n);
        this.$trigger = e('[data-toggle="collapse"][href="#' + i.id + '"],' + '[data-toggle="collapse"][data-target="#' + i.id + '"]');
        this.transitioning = null;
        if (this.options.parent) {
            this.$parent = this.getParent()
        } else {
            this.addAriaAndCollapsedClass(this.$element, this.$trigger)
        }
        if (this.options.toggle)
            this.toggle()
    };
    t.VERSION = "3.3.7";
    t.TRANSITION_DURATION = 350;
    t.DEFAULTS = {
        toggle: true
    };
    t.prototype.dimension = function() {
        var e = this.$element.hasClass("width");
        return e ? "width" : "height"
    }
    ;
    t.prototype.show = function() {
        if (this.transitioning || this.$element.hasClass("in"))
            return;
        var i;
        var r = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
        if (r && r.length) {
            i = r.data("bs.collapse");
            if (i && i.transitioning)
                return
        }
        var o = e.Event("show.bs.collapse");
        this.$element.trigger(o);
        if (o.isDefaultPrevented())
            return;
        if (r && r.length) {
            n.call(r, "hide");
            i || r.data("bs.collapse", null)
        }
        var s = this.dimension();
        this.$element.removeClass("collapse").addClass("collapsing")[s](0).attr("aria-expanded", true);
        this.$trigger.removeClass("collapsed").attr("aria-expanded", true);
        this.transitioning = 1;
        var a = function() {
            this.$element.removeClass("collapsing").addClass("collapse in")[s]("");
            this.transitioning = 0;
            this.$element.trigger("shown.bs.collapse")
        };
        if (!e.support.transition)
            return a.call(this);
        var l = e.camelCase(["scroll", s].join("-"));
        this.$element.one("bsTransitionEnd", e.proxy(a, this)).emulateTransitionEnd(t.TRANSITION_DURATION)[s](this.$element[0][l])
    }
    ;
    t.prototype.hide = function() {
        if (this.transitioning || !this.$element.hasClass("in"))
            return;
        var i = e.Event("hide.bs.collapse");
        this.$element.trigger(i);
        if (i.isDefaultPrevented())
            return;
        var n = this.dimension();
        this.$element[n](this.$element[n]())[0].offsetHeight;
        this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", false);
        this.$trigger.addClass("collapsed").attr("aria-expanded", false);
        this.transitioning = 1;
        var r = function() {
            this.transitioning = 0;
            this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
        };
        if (!e.support.transition)
            return r.call(this);
        this.$element[n](0).one("bsTransitionEnd", e.proxy(r, this)).emulateTransitionEnd(t.TRANSITION_DURATION)
    }
    ;
    t.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }
    ;
    t.prototype.getParent = function() {
        return e(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(e.proxy(function(t, n) {
            var r = e(n);
            this.addAriaAndCollapsedClass(i(r), r)
        }, this)).end()
    }
    ;
    t.prototype.addAriaAndCollapsedClass = function(e, t) {
        var i = e.hasClass("in");
        e.attr("aria-expanded", i);
        t.toggleClass("collapsed", !i).attr("aria-expanded", i)
    }
    ;
    function i(t) {
        var i;
        var n = t.attr("data-target") || (i = t.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "");
        return e(n)
    }
    function n(i) {
        return this.each(function() {
            var n = e(this);
            var r = n.data("bs.collapse");
            var o = e.extend({}, t.DEFAULTS, n.data(), typeof i == "object" && i);
            if (!r && o.toggle && /show|hide/.test(i))
                o.toggle = false;
            if (!r)
                n.data("bs.collapse", r = new t(this,o));
            if (typeof i == "string")
                r[i]()
        })
    }
    var r = e.fn.collapse;
    e.fn.collapse = n;
    e.fn.collapse.Constructor = t;
    e.fn.collapse.noConflict = function() {
        e.fn.collapse = r;
        return this
    }
    ;
    e(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(t) {
        var r = e(this);
        if (!r.attr("data-target"))
            t.preventDefault();
        var o = i(r);
        var s = o.data("bs.collapse");
        var a = s ? "toggle" : r.data();
        n.call(o, a)
    })
}(jQuery);
+function(e) {
    "use strict";
    var t = ".dropdown-backdrop";
    var i = '[data-toggle="dropdown"]';
    var n = function(t) {
        e(t).on("click.bs.dropdown", this.toggle)
    };
    n.VERSION = "3.3.7";
    function r(t) {
        var i = t.attr("data-target");
        if (!i) {
            i = t.attr("href");
            i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, "")
        }
        var n = i && e(i);
        return n && n.length ? n : t.parent()
    }
    function o(n) {
        if (n && n.which === 3)
            return;
        e(t).remove();
        e(i).each(function() {
            var t = e(this);
            var i = r(t);
            var o = {
                relatedTarget: this
            };
            if (!i.hasClass("open"))
                return;
            if (n && n.type == "click" && /input|textarea/i.test(n.target.tagName) && e.contains(i[0], n.target))
                return;
            i.trigger(n = e.Event("hide.bs.dropdown", o));
            if (n.isDefaultPrevented())
                return;
            t.attr("aria-expanded", "false");
            i.removeClass("open").trigger(e.Event("hidden.bs.dropdown", o))
        })
    }
    n.prototype.toggle = function(t) {
        var i = e(this);
        if (i.is(".disabled, :disabled"))
            return;
        var n = r(i);
        var s = n.hasClass("open");
        o();
        if (!s) {
            if ("ontouchstart"in document.documentElement && !n.closest(".navbar-nav").length) {
                e(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(e(this)).on("click", o)
            }
            var a = {
                relatedTarget: this
            };
            n.trigger(t = e.Event("show.bs.dropdown", a));
            if (t.isDefaultPrevented())
                return;
            i.trigger("focus").attr("aria-expanded", "true");
            n.toggleClass("open").trigger(e.Event("shown.bs.dropdown", a))
        }
        return false
    }
    ;
    n.prototype.keydown = function(t) {
        if (!/(38|40|27|32)/.test(t.which) || /input|textarea/i.test(t.target.tagName))
            return;
        var n = e(this);
        t.preventDefault();
        t.stopPropagation();
        if (n.is(".disabled, :disabled"))
            return;
        var o = r(n);
        var s = o.hasClass("open");
        if (!s && t.which != 27 || s && t.which == 27) {
            if (t.which == 27)
                o.find(i).trigger("focus");
            return n.trigger("click")
        }
        var a = " li:not(.disabled):visible a";
        var l = o.find(".dropdown-menu" + a);
        if (!l.length)
            return;
        var u = l.index(t.target);
        if (t.which == 38 && u > 0)
            u--;
        if (t.which == 40 && u < l.length - 1)
            u++;
        if (!~u)
            u = 0;
        l.eq(u).trigger("focus")
    }
    ;
    function s(t) {
        return this.each(function() {
            var i = e(this);
            var r = i.data("bs.dropdown");
            if (!r)
                i.data("bs.dropdown", r = new n(this));
            if (typeof t == "string")
                r[t].call(i)
        })
    }
    var a = e.fn.dropdown;
    e.fn.dropdown = s;
    e.fn.dropdown.Constructor = n;
    e.fn.dropdown.noConflict = function() {
        e.fn.dropdown = a;
        return this
    }
    ;
    e(document).on("click.bs.dropdown.data-api", o).on("click.bs.dropdown.data-api", ".dropdown form", function(e) {
        e.stopPropagation()
    }).on("click.bs.dropdown.data-api", i, n.prototype.toggle).on("keydown.bs.dropdown.data-api", i, n.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", n.prototype.keydown)
}(jQuery);
+function(e) {
    "use strict";
    var t = function(t, i) {
        this.options = i;
        this.$body = e(document.body);
        this.$element = e(t);
        this.$dialog = this.$element.find(".modal-dialog");
        this.$backdrop = null;
        this.isShown = null;
        this.originalBodyPad = null;
        this.scrollbarWidth = 0;
        this.ignoreBackdropClick = false;
        if (this.options.remote) {
            this.$element.find(".modal-content").load(this.options.remote, e.proxy(function() {
                this.$element.trigger("loaded.bs.modal")
            }, this))
        }
    };
    t.VERSION = "3.3.7";
    t.TRANSITION_DURATION = 300;
    t.BACKDROP_TRANSITION_DURATION = 150;
    t.DEFAULTS = {
        backdrop: true,
        keyboard: true,
        show: true
    };
    t.prototype.toggle = function(e) {
        return this.isShown ? this.hide() : this.show(e)
    }
    ;
    t.prototype.show = function(i) {
        var n = this;
        var r = e.Event("show.bs.modal", {
            relatedTarget: i
        });
        this.$element.trigger(r);
        if (this.isShown || r.isDefaultPrevented())
            return;
        this.isShown = true;
        this.checkScrollbar();
        this.setScrollbar();
        this.$body.addClass("modal-open");
        this.escape();
        this.resize();
        this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', e.proxy(this.hide, this));
        this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            n.$element.one("mouseup.dismiss.bs.modal", function(t) {
                if (e(t.target).is(n.$element))
                    n.ignoreBackdropClick = true
            })
        });
        this.backdrop(function() {
            var r = e.support.transition && n.$element.hasClass("fade");
            if (!n.$element.parent().length) {
                n.$element.appendTo(n.$body)
            }
            n.$element.show().scrollTop(0);
            n.adjustDialog();
            if (r) {
                n.$element[0].offsetWidth
            }
            n.$element.addClass("in");
            n.enforceFocus();
            var o = e.Event("shown.bs.modal", {
                relatedTarget: i
            });
            r ? n.$dialog.one("bsTransitionEnd", function() {
                n.$element.trigger("focus").trigger(o)
            }).emulateTransitionEnd(t.TRANSITION_DURATION) : n.$element.trigger("focus").trigger(o)
        })
    }
    ;
    t.prototype.hide = function(i) {
        if (i)
            i.preventDefault();
        i = e.Event("hide.bs.modal");
        this.$element.trigger(i);
        if (!this.isShown || i.isDefaultPrevented())
            return;
        this.isShown = false;
        this.escape();
        this.resize();
        e(document).off("focusin.bs.modal");
        this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal");
        this.$dialog.off("mousedown.dismiss.bs.modal");
        e.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", e.proxy(this.hideModal, this)).emulateTransitionEnd(t.TRANSITION_DURATION) : this.hideModal()
    }
    ;
    t.prototype.enforceFocus = function() {
        e(document).off("focusin.bs.modal").on("focusin.bs.modal", e.proxy(function(e) {
            if (document !== e.target && this.$element[0] !== e.target && !this.$element.has(e.target).length) {
                this.$element.trigger("focus")
            }
        }, this))
    }
    ;
    t.prototype.escape = function() {
        if (this.isShown && this.options.keyboard) {
            this.$element.on("keydown.dismiss.bs.modal", e.proxy(function(e) {
                e.which == 27 && this.hide()
            }, this))
        } else if (!this.isShown) {
            this.$element.off("keydown.dismiss.bs.modal")
        }
    }
    ;
    t.prototype.resize = function() {
        if (this.isShown) {
            e(window).on("resize.bs.modal", e.proxy(this.handleUpdate, this))
        } else {
            e(window).off("resize.bs.modal")
        }
    }
    ;
    t.prototype.hideModal = function() {
        var e = this;
        this.$element.hide();
        this.backdrop(function() {
            e.$body.removeClass("modal-open");
            e.resetAdjustments();
            e.resetScrollbar();
            e.$element.trigger("hidden.bs.modal")
        })
    }
    ;
    t.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove();
        this.$backdrop = null
    }
    ;
    t.prototype.backdrop = function(i) {
        var n = this;
        var r = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var o = e.support.transition && r;
            this.$backdrop = e(document.createElement("div")).addClass("modal-backdrop " + r).appendTo(this.$body);
            this.$element.on("click.dismiss.bs.modal", e.proxy(function(e) {
                if (this.ignoreBackdropClick) {
                    this.ignoreBackdropClick = false;
                    return
                }
                if (e.target !== e.currentTarget)
                    return;
                this.options.backdrop == "static" ? this.$element[0].focus() : this.hide()
            }, this));
            if (o)
                this.$backdrop[0].offsetWidth;
            this.$backdrop.addClass("in");
            if (!i)
                return;
            o ? this.$backdrop.one("bsTransitionEnd", i).emulateTransitionEnd(t.BACKDROP_TRANSITION_DURATION) : i()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var s = function() {
                n.removeBackdrop();
                i && i()
            };
            e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", s).emulateTransitionEnd(t.BACKDROP_TRANSITION_DURATION) : s()
        } else if (i) {
            i()
        }
    }
    ;
    t.prototype.handleUpdate = function() {
        this.adjustDialog()
    }
    ;
    t.prototype.adjustDialog = function() {
        var e = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && e ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !e ? this.scrollbarWidth : ""
        })
    }
    ;
    t.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }
    ;
    t.prototype.checkScrollbar = function() {
        var e = window.innerWidth;
        if (!e) {
            var t = document.documentElement.getBoundingClientRect();
            e = t.right - Math.abs(t.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < e;
        this.scrollbarWidth = this.measureScrollbar()
    }
    ;
    t.prototype.setScrollbar = function() {
        var e = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "";
        if (this.bodyIsOverflowing)
            this.$body.css("padding-right", e + this.scrollbarWidth)
    }
    ;
    t.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad)
    }
    ;
    t.prototype.measureScrollbar = function() {
        var e = document.createElement("div");
        e.className = "modal-scrollbar-measure";
        this.$body.append(e);
        var t = e.offsetWidth - e.clientWidth;
        this.$body[0].removeChild(e);
        return t
    }
    ;
    function i(i, n) {
        return this.each(function() {
            var r = e(this);
            var o = r.data("bs.modal");
            var s = e.extend({}, t.DEFAULTS, r.data(), typeof i == "object" && i);
            if (!o)
                r.data("bs.modal", o = new t(this,s));
            if (typeof i == "string")
                o[i](n);
            else if (s.show)
                o.show(n)
        })
    }
    var n = e.fn.modal;
    e.fn.modal = i;
    e.fn.modal.Constructor = t;
    e.fn.modal.noConflict = function() {
        e.fn.modal = n;
        return this
    }
    ;
    e(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(t) {
        var n = e(this);
        var r = n.attr("href");
        var o = e(n.attr("data-target") || r && r.replace(/.*(?=#[^\s]+$)/, ""));
        var s = o.data("bs.modal") ? "toggle" : e.extend({
            remote: !/#/.test(r) && r
        }, o.data(), n.data());
        if (n.is("a"))
            t.preventDefault();
        o.one("show.bs.modal", function(e) {
            if (e.isDefaultPrevented())
                return;
            o.one("hidden.bs.modal", function() {
                n.is(":visible") && n.trigger("focus")
            })
        });
        i.call(o, s, this)
    })
}(jQuery);
+function(e) {
    "use strict";
    var t = function(e, t) {
        this.type = null;
        this.options = null;
        this.enabled = null;
        this.timeout = null;
        this.hoverState = null;
        this.$element = null;
        this.inState = null;
        this.init("tooltip", e, t)
    };
    t.VERSION = "3.3.7";
    t.TRANSITION_DURATION = 150;
    t.DEFAULTS = {
        animation: true,
        placement: "top",
        selector: false,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: false,
        container: false,
        viewport: {
            selector: "body",
            padding: 0
        }
    };
    t.prototype.init = function(t, i, n) {
        this.enabled = true;
        this.type = t;
        this.$element = e(i);
        this.options = this.getOptions(n);
        this.$viewport = this.options.viewport && e(e.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport);
        this.inState = {
            click: false,
            hover: false,
            focus: false
        };
        if (this.$element[0]instanceof document.constructor && !this.options.selector) {
            throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!")
        }
        var r = this.options.trigger.split(" ");
        for (var o = r.length; o--; ) {
            var s = r[o];
            if (s == "click") {
                this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this))
            } else if (s != "manual") {
                var a = s == "hover" ? "mouseenter" : "focusin";
                var l = s == "hover" ? "mouseleave" : "focusout";
                this.$element.on(a + "." + this.type, this.options.selector, e.proxy(this.enter, this));
                this.$element.on(l + "." + this.type, this.options.selector, e.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = e.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }
    ;
    t.prototype.getDefaults = function() {
        return t.DEFAULTS
    }
    ;
    t.prototype.getOptions = function(t) {
        t = e.extend({}, this.getDefaults(), this.$element.data(), t);
        if (t.delay && typeof t.delay == "number") {
            t.delay = {
                show: t.delay,
                hide: t.delay
            }
        }
        return t
    }
    ;
    t.prototype.getDelegateOptions = function() {
        var t = {};
        var i = this.getDefaults();
        this._options && e.each(this._options, function(e, n) {
            if (i[e] != n)
                t[e] = n
        });
        return t
    }
    ;
    t.prototype.enter = function(t) {
        var i = t instanceof this.constructor ? t : e(t.currentTarget).data("bs." + this.type);
        if (!i) {
            i = new this.constructor(t.currentTarget,this.getDelegateOptions());
            e(t.currentTarget).data("bs." + this.type, i)
        }
        if (t instanceof e.Event) {
            i.inState[t.type == "focusin" ? "focus" : "hover"] = true
        }
        if (i.tip().hasClass("in") || i.hoverState == "in") {
            i.hoverState = "in";
            return
        }
        clearTimeout(i.timeout);
        i.hoverState = "in";
        if (!i.options.delay || !i.options.delay.show)
            return i.show();
        i.timeout = setTimeout(function() {
            if (i.hoverState == "in")
                i.show()
        }, i.options.delay.show)
    }
    ;
    t.prototype.isInStateTrue = function() {
        for (var e in this.inState) {
            if (this.inState[e])
                return true
        }
        return false
    }
    ;
    t.prototype.leave = function(t) {
        var i = t instanceof this.constructor ? t : e(t.currentTarget).data("bs." + this.type);
        if (!i) {
            i = new this.constructor(t.currentTarget,this.getDelegateOptions());
            e(t.currentTarget).data("bs." + this.type, i)
        }
        if (t instanceof e.Event) {
            i.inState[t.type == "focusout" ? "focus" : "hover"] = false
        }
        if (i.isInStateTrue())
            return;
        clearTimeout(i.timeout);
        i.hoverState = "out";
        if (!i.options.delay || !i.options.delay.hide)
            return i.hide();
        i.timeout = setTimeout(function() {
            if (i.hoverState == "out")
                i.hide()
        }, i.options.delay.hide)
    }
    ;
    t.prototype.show = function() {
        var i = e.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(i);
            var n = e.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (i.isDefaultPrevented() || !n)
                return;
            var r = this;
            var o = this.tip();
            var s = this.getUID(this.type);
            this.setContent();
            o.attr("id", s);
            this.$element.attr("aria-describedby", s);
            if (this.options.animation)
                o.addClass("fade");
            var a = typeof this.options.placement == "function" ? this.options.placement.call(this, o[0], this.$element[0]) : this.options.placement;
            var l = /\s?auto?\s?/i;
            var u = l.test(a);
            if (u)
                a = a.replace(l, "") || "top";
            o.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(a).data("bs." + this.type, this);
            this.options.container ? o.appendTo(this.options.container) : o.insertAfter(this.$element);
            this.$element.trigger("inserted.bs." + this.type);
            var c = this.getPosition();
            var d = o[0].offsetWidth;
            var f = o[0].offsetHeight;
            if (u) {
                var p = a;
                var h = this.getPosition(this.$viewport);
                a = a == "bottom" && c.bottom + f > h.bottom ? "top" : a == "top" && c.top - f < h.top ? "bottom" : a == "right" && c.right + d > h.width ? "left" : a == "left" && c.left - d < h.left ? "right" : a;
                o.removeClass(p).addClass(a)
            }
            var g = this.getCalculatedOffset(a, c, d, f);
            this.applyPlacement(g, a);
            var m = function() {
                var e = r.hoverState;
                r.$element.trigger("shown.bs." + r.type);
                r.hoverState = null;
                if (e == "out")
                    r.leave(r)
            };
            e.support.transition && this.$tip.hasClass("fade") ? o.one("bsTransitionEnd", m).emulateTransitionEnd(t.TRANSITION_DURATION) : m()
        }
    }
    ;
    t.prototype.applyPlacement = function(t, i) {
        var n = this.tip();
        var r = n[0].offsetWidth;
        var o = n[0].offsetHeight;
        var s = parseInt(n.css("margin-top"), 10);
        var a = parseInt(n.css("margin-left"), 10);
        if (isNaN(s))
            s = 0;
        if (isNaN(a))
            a = 0;
        t.top += s;
        t.left += a;
        e.offset.setOffset(n[0], e.extend({
            using: function(e) {
                n.css({
                    top: Math.round(e.top),
                    left: Math.round(e.left)
                })
            }
        }, t), 0);
        n.addClass("in");
        var l = n[0].offsetWidth;
        var u = n[0].offsetHeight;
        if (i == "top" && u != o) {
            t.top = t.top + o - u
        }
        var c = this.getViewportAdjustedDelta(i, t, l, u);
        if (c.left)
            t.left += c.left;
        else
            t.top += c.top;
        var d = /top|bottom/.test(i);
        var f = d ? c.left * 2 - r + l : c.top * 2 - o + u;
        var p = d ? "offsetWidth" : "offsetHeight";
        n.offset(t);
        this.replaceArrow(f, n[0][p], d)
    }
    ;
    t.prototype.replaceArrow = function(e, t, i) {
        this.arrow().css(i ? "left" : "top", 50 * (1 - e / t) + "%").css(i ? "top" : "left", "")
    }
    ;
    t.prototype.setContent = function() {
        var e = this.tip();
        var t = this.getTitle();
        e.find(".tooltip-inner")[this.options.html ? "html" : "text"](t);
        e.removeClass("fade in top bottom left right")
    }
    ;
    t.prototype.hide = function(i) {
        var n = this;
        var r = e(this.$tip);
        var o = e.Event("hide.bs." + this.type);
        function s() {
            if (n.hoverState != "in")
                r.detach();
            if (n.$element) {
                n.$element.removeAttr("aria-describedby").trigger("hidden.bs." + n.type)
            }
            i && i()
        }
        this.$element.trigger(o);
        if (o.isDefaultPrevented())
            return;
        r.removeClass("in");
        e.support.transition && r.hasClass("fade") ? r.one("bsTransitionEnd", s).emulateTransitionEnd(t.TRANSITION_DURATION) : s();
        this.hoverState = null;
        return this
    }
    ;
    t.prototype.fixTitle = function() {
        var e = this.$element;
        if (e.attr("title") || typeof e.attr("data-original-title") != "string") {
            e.attr("data-original-title", e.attr("title") || "").attr("title", "")
        }
    }
    ;
    t.prototype.hasContent = function() {
        return this.getTitle()
    }
    ;
    t.prototype.getPosition = function(t) {
        t = t || this.$element;
        var i = t[0];
        var n = i.tagName == "BODY";
        var r = i.getBoundingClientRect();
        if (r.width == null) {
            r = e.extend({}, r, {
                width: r.right - r.left,
                height: r.bottom - r.top
            })
        }
        var o = window.SVGElement && i instanceof window.SVGElement;
        var s = n ? {
            top: 0,
            left: 0
        } : o ? null : t.offset();
        var a = {
            scroll: n ? document.documentElement.scrollTop || document.body.scrollTop : t.scrollTop()
        };
        var l = n ? {
            width: e(window).width(),
            height: e(window).height()
        } : null;
        return e.extend({}, r, a, l, s)
    }
    ;
    t.prototype.getCalculatedOffset = function(e, t, i, n) {
        return e == "bottom" ? {
            top: t.top + t.height,
            left: t.left + t.width / 2 - i / 2
        } : e == "top" ? {
            top: t.top - n,
            left: t.left + t.width / 2 - i / 2
        } : e == "left" ? {
            top: t.top + t.height / 2 - n / 2,
            left: t.left - i
        } : {
            top: t.top + t.height / 2 - n / 2,
            left: t.left + t.width
        }
    }
    ;
    t.prototype.getViewportAdjustedDelta = function(e, t, i, n) {
        var r = {
            top: 0,
            left: 0
        };
        if (!this.$viewport)
            return r;
        var o = this.options.viewport && this.options.viewport.padding || 0;
        var s = this.getPosition(this.$viewport);
        if (/right|left/.test(e)) {
            var a = t.top - o - s.scroll;
            var l = t.top + o - s.scroll + n;
            if (a < s.top) {
                r.top = s.top - a
            } else if (l > s.top + s.height) {
                r.top = s.top + s.height - l
            }
        } else {
            var u = t.left - o;
            var c = t.left + o + i;
            if (u < s.left) {
                r.left = s.left - u
            } else if (c > s.right) {
                r.left = s.left + s.width - c
            }
        }
        return r
    }
    ;
    t.prototype.getTitle = function() {
        var e;
        var t = this.$element;
        var i = this.options;
        e = t.attr("data-original-title") || (typeof i.title == "function" ? i.title.call(t[0]) : i.title);
        return e
    }
    ;
    t.prototype.getUID = function(e) {
        do {
            e += ~~(Math.random() * 1e6)
        } while (document.getElementById(e));return e
    }
    ;
    t.prototype.tip = function() {
        if (!this.$tip) {
            this.$tip = e(this.options.template);
            if (this.$tip.length != 1) {
                throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!")
            }
        }
        return this.$tip
    }
    ;
    t.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }
    ;
    t.prototype.enable = function() {
        this.enabled = true
    }
    ;
    t.prototype.disable = function() {
        this.enabled = false
    }
    ;
    t.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }
    ;
    t.prototype.toggle = function(t) {
        var i = this;
        if (t) {
            i = e(t.currentTarget).data("bs." + this.type);
            if (!i) {
                i = new this.constructor(t.currentTarget,this.getDelegateOptions());
                e(t.currentTarget).data("bs." + this.type, i)
            }
        }
        if (t) {
            i.inState.click = !i.inState.click;
            if (i.isInStateTrue())
                i.enter(i);
            else
                i.leave(i)
        } else {
            i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
        }
    }
    ;
    t.prototype.destroy = function() {
        var e = this;
        clearTimeout(this.timeout);
        this.hide(function() {
            e.$element.off("." + e.type).removeData("bs." + e.type);
            if (e.$tip) {
                e.$tip.detach()
            }
            e.$tip = null;
            e.$arrow = null;
            e.$viewport = null;
            e.$element = null
        })
    }
    ;
    function i(i) {
        return this.each(function() {
            var n = e(this);
            var r = n.data("bs.tooltip");
            var o = typeof i == "object" && i;
            if (!r && /destroy|hide/.test(i))
                return;
            if (!r)
                n.data("bs.tooltip", r = new t(this,o));
            if (typeof i == "string")
                r[i]()
        })
    }
    var n = e.fn.tooltip;
    e.fn.tooltip = i;
    e.fn.tooltip.Constructor = t;
    e.fn.tooltip.noConflict = function() {
        e.fn.tooltip = n;
        return this
    }
}(jQuery);
+function(e) {
    "use strict";
    var t = function(e, t) {
        this.init("popover", e, t)
    };
    if (!e.fn.tooltip)
        throw new Error("Popover requires tooltip.js");
    t.VERSION = "3.3.7";
    t.DEFAULTS = e.extend({}, e.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    });
    t.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype);
    t.prototype.constructor = t;
    t.prototype.getDefaults = function() {
        return t.DEFAULTS
    }
    ;
    t.prototype.setContent = function() {
        var e = this.tip();
        var t = this.getTitle();
        var i = this.getContent();
        e.find(".popover-title")[this.options.html ? "html" : "text"](t);
        e.find(".popover-content").children().detach().end()[this.options.html ? typeof i == "string" ? "html" : "append" : "text"](i);
        e.removeClass("fade top bottom left right in");
        if (!e.find(".popover-title").html())
            e.find(".popover-title").hide()
    }
    ;
    t.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }
    ;
    t.prototype.getContent = function() {
        var e = this.$element;
        var t = this.options;
        return e.attr("data-content") || (typeof t.content == "function" ? t.content.call(e[0]) : t.content)
    }
    ;
    t.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }
    ;
    function i(i) {
        return this.each(function() {
            var n = e(this);
            var r = n.data("bs.popover");
            var o = typeof i == "object" && i;
            if (!r && /destroy|hide/.test(i))
                return;
            if (!r)
                n.data("bs.popover", r = new t(this,o));
            if (typeof i == "string")
                r[i]()
        })
    }
    var n = e.fn.popover;
    e.fn.popover = i;
    e.fn.popover.Constructor = t;
    e.fn.popover.noConflict = function() {
        e.fn.popover = n;
        return this
    }
}(jQuery);
+function(e) {
    "use strict";
    function t(i, n) {
        this.$body = e(document.body);
        this.$scrollElement = e(i).is(document.body) ? e(window) : e(i);
        this.options = e.extend({}, t.DEFAULTS, n);
        this.selector = (this.options.target || "") + " .nav li > a";
        this.offsets = [];
        this.targets = [];
        this.activeTarget = null;
        this.scrollHeight = 0;
        this.$scrollElement.on("scroll.bs.scrollspy", e.proxy(this.process, this));
        this.refresh();
        this.process()
    }
    t.VERSION = "3.3.7";
    t.DEFAULTS = {
        offset: 10
    };
    t.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }
    ;
    t.prototype.refresh = function() {
        var t = this;
        var i = "offset";
        var n = 0;
        this.offsets = [];
        this.targets = [];
        this.scrollHeight = this.getScrollHeight();
        if (!e.isWindow(this.$scrollElement[0])) {
            i = "position";
            n = this.$scrollElement.scrollTop()
        }
        this.$body.find(this.selector).map(function() {
            var t = e(this);
            var r = t.data("target") || t.attr("href");
            var o = /^#./.test(r) && e(r);
            return o && o.length && o.is(":visible") && [[o[i]().top + n, r]] || null
        }).sort(function(e, t) {
            return e[0] - t[0]
        }).each(function() {
            t.offsets.push(this[0]);
            t.targets.push(this[1])
        })
    }
    ;
    t.prototype.process = function() {
        var e = this.$scrollElement.scrollTop() + this.options.offset;
        var t = this.getScrollHeight();
        var i = this.options.offset + t - this.$scrollElement.height();
        var n = this.offsets;
        var r = this.targets;
        var o = this.activeTarget;
        var s;
        if (this.scrollHeight != t) {
            this.refresh()
        }
        if (e >= i) {
            return o != (s = r[r.length - 1]) && this.activate(s)
        }
        if (o && e < n[0]) {
            this.activeTarget = null;
            return this.clear()
        }
        for (s = n.length; s--; ) {
            o != r[s] && e >= n[s] && (n[s + 1] === undefined || e < n[s + 1]) && this.activate(r[s])
        }
    }
    ;
    t.prototype.activate = function(t) {
        this.activeTarget = t;
        this.clear();
        var i = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]';
        var n = e(i).parents("li").addClass("active");
        if (n.parent(".dropdown-menu").length) {
            n = n.closest("li.dropdown").addClass("active")
        }
        n.trigger("activate.bs.scrollspy")
    }
    ;
    t.prototype.clear = function() {
        e(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    }
    ;
    function i(i) {
        return this.each(function() {
            var n = e(this);
            var r = n.data("bs.scrollspy");
            var o = typeof i == "object" && i;
            if (!r)
                n.data("bs.scrollspy", r = new t(this,o));
            if (typeof i == "string")
                r[i]()
        })
    }
    var n = e.fn.scrollspy;
    e.fn.scrollspy = i;
    e.fn.scrollspy.Constructor = t;
    e.fn.scrollspy.noConflict = function() {
        e.fn.scrollspy = n;
        return this
    }
    ;
    e(window).on("load.bs.scrollspy.data-api", function() {
        e('[data-spy="scroll"]').each(function() {
            var t = e(this);
            i.call(t, t.data())
        })
    })
}(jQuery);
+function(e) {
    "use strict";
    var t = function(t) {
        this.element = e(t)
    };
    t.VERSION = "3.3.7";
    t.TRANSITION_DURATION = 150;
    t.prototype.show = function() {
        var t = this.element;
        var i = t.closest("ul:not(.dropdown-menu)");
        var n = t.data("target");
        if (!n) {
            n = t.attr("href");
            n = n && n.replace(/.*(?=#[^\s]*$)/, "")
        }
        if (t.parent("li").hasClass("active"))
            return;
        var r = i.find(".active:last a");
        var o = e.Event("hide.bs.tab", {
            relatedTarget: t[0]
        });
        var s = e.Event("show.bs.tab", {
            relatedTarget: r[0]
        });
        r.trigger(o);
        t.trigger(s);
        if (s.isDefaultPrevented() || o.isDefaultPrevented())
            return;
        var a = e(n);
        this.activate(t.closest("li"), i);
        this.activate(a, a.parent(), function() {
            r.trigger({
                type: "hidden.bs.tab",
                relatedTarget: t[0]
            });
            t.trigger({
                type: "shown.bs.tab",
                relatedTarget: r[0]
            })
        })
    }
    ;
    t.prototype.activate = function(i, n, r) {
        var o = n.find("> .active");
        var s = r && e.support.transition && (o.length && o.hasClass("fade") || !!n.find("> .fade").length);
        function a() {
            o.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", false);
            i.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", true);
            if (s) {
                i[0].offsetWidth;
                i.addClass("in")
            } else {
                i.removeClass("fade")
            }
            if (i.parent(".dropdown-menu").length) {
                i.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", true)
            }
            r && r()
        }
        o.length && s ? o.one("bsTransitionEnd", a).emulateTransitionEnd(t.TRANSITION_DURATION) : a();
        o.removeClass("in")
    }
    ;
    function i(i) {
        return this.each(function() {
            var n = e(this);
            var r = n.data("bs.tab");
            if (!r)
                n.data("bs.tab", r = new t(this));
            if (typeof i == "string")
                r[i]()
        })
    }
    var n = e.fn.tab;
    e.fn.tab = i;
    e.fn.tab.Constructor = t;
    e.fn.tab.noConflict = function() {
        e.fn.tab = n;
        return this
    }
    ;
    var r = function(t) {
        t.preventDefault();
        i.call(e(this), "show")
    };
    e(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', r).on("click.bs.tab.data-api", '[data-toggle="pill"]', r)
}(jQuery);
+function(e) {
    "use strict";
    var t = function(i, n) {
        this.options = e.extend({}, t.DEFAULTS, n);
        this.$target = e(this.options.target).on("scroll.bs.affix.data-api", e.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", e.proxy(this.checkPositionWithEventLoop, this));
        this.$element = e(i);
        this.affixed = null;
        this.unpin = null;
        this.pinnedOffset = null;
        this.checkPosition()
    };
    t.VERSION = "3.3.7";
    t.RESET = "affix affix-top affix-bottom";
    t.DEFAULTS = {
        offset: 0,
        target: window
    };
    t.prototype.getState = function(e, t, i, n) {
        var r = this.$target.scrollTop();
        var o = this.$element.offset();
        var s = this.$target.height();
        if (i != null && this.affixed == "top")
            return r < i ? "top" : false;
        if (this.affixed == "bottom") {
            if (i != null)
                return r + this.unpin <= o.top ? false : "bottom";
            return r + s <= e - n ? false : "bottom"
        }
        var a = this.affixed == null;
        var l = a ? r : o.top;
        var u = a ? s : t;
        if (i != null && r <= i)
            return "top";
        if (n != null && l + u >= e - n)
            return "bottom";
        return false
    }
    ;
    t.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset)
            return this.pinnedOffset;
        this.$element.removeClass(t.RESET).addClass("affix");
        var e = this.$target.scrollTop();
        var i = this.$element.offset();
        return this.pinnedOffset = i.top - e
    }
    ;
    t.prototype.checkPositionWithEventLoop = function() {
        setTimeout(e.proxy(this.checkPosition, this), 1)
    }
    ;
    t.prototype.checkPosition = function() {
        if (!this.$element.is(":visible"))
            return;
        var i = this.$element.height();
        var n = this.options.offset;
        var r = n.top;
        var o = n.bottom;
        var s = Math.max(e(document).height(), e(document.body).height());
        if (typeof n != "object")
            o = r = n;
        if (typeof r == "function")
            r = n.top(this.$element);
        if (typeof o == "function")
            o = n.bottom(this.$element);
        var a = this.getState(s, i, r, o);
        if (this.affixed != a) {
            if (this.unpin != null)
                this.$element.css("top", "");
            var l = "affix" + (a ? "-" + a : "");
            var u = e.Event(l + ".bs.affix");
            this.$element.trigger(u);
            if (u.isDefaultPrevented())
                return;
            this.affixed = a;
            this.unpin = a == "bottom" ? this.getPinnedOffset() : null;
            this.$element.removeClass(t.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
        }
        if (a == "bottom") {
            this.$element.offset({
                top: s - i - o
            })
        }
    }
    ;
    function i(i) {
        return this.each(function() {
            var n = e(this);
            var r = n.data("bs.affix");
            var o = typeof i == "object" && i;
            if (!r)
                n.data("bs.affix", r = new t(this,o));
            if (typeof i == "string")
                r[i]()
        })
    }
    var n = e.fn.affix;
    e.fn.affix = i;
    e.fn.affix.Constructor = t;
    e.fn.affix.noConflict = function() {
        e.fn.affix = n;
        return this
    }
    ;
    e(window).on("load", function() {
        e('[data-spy="affix"]').each(function() {
            var t = e(this);
            var n = t.data();
            n.offset = n.offset || {};
            if (n.offsetBottom != null)
                n.offset.bottom = n.offsetBottom;
            if (n.offsetTop != null)
                n.offset.top = n.offsetTop;
            i.call(t, n)
        })
    })
}(jQuery);
!function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(e) {
    "use strict";
    var t = window.Slick || {};
    (t = function() {
        var t = 0;
        return function(i, n) {
            var r, o = this;
            o.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: e(i),
                appendDots: e(i),
                arrows: !1,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 2e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(t, i) {
                    return e('<button type="button" />').text(i + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            },
            o.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: !1,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                swiping: !1,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            },
            e.extend(o, o.initials),
            o.activeBreakpoint = null,
            o.animType = null,
            o.animProp = null,
            o.breakpoints = [],
            o.breakpointSettings = [],
            o.cssTransitions = !1,
            o.focussed = !1,
            o.interrupted = !1,
            o.hidden = "hidden",
            o.paused = !0,
            o.positionProp = null,
            o.respondTo = null,
            o.rowCount = 1,
            o.shouldClick = !0,
            o.$slider = e(i),
            o.$slidesCache = null,
            o.transformType = null,
            o.transitionType = null,
            o.visibilityChange = "visibilitychange",
            o.windowWidth = 0,
            o.windowTimer = null,
            r = e(i).data("slick") || {},
            o.options = e.extend({}, o.defaults, n, r),
            o.currentSlide = o.options.initialSlide,
            o.originalSettings = o.options,
            void 0 !== document.mozHidden ? (o.hidden = "mozHidden",
            o.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (o.hidden = "webkitHidden",
            o.visibilityChange = "webkitvisibilitychange"),
            o.autoPlay = e.proxy(o.autoPlay, o),
            o.autoPlayClear = e.proxy(o.autoPlayClear, o),
            o.autoPlayIterator = e.proxy(o.autoPlayIterator, o),
            o.changeSlide = e.proxy(o.changeSlide, o),
            o.clickHandler = e.proxy(o.clickHandler, o),
            o.selectHandler = e.proxy(o.selectHandler, o),
            o.setPosition = e.proxy(o.setPosition, o),
            o.swipeHandler = e.proxy(o.swipeHandler, o),
            o.dragHandler = e.proxy(o.dragHandler, o),
            o.keyHandler = e.proxy(o.keyHandler, o),
            o.instanceUid = t++,
            o.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/,
            o.registerBreakpoints(),
            o.init(!0)
        }
    }()).prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }
    ,
    t.prototype.addSlide = t.prototype.slickAdd = function(t, i, n) {
        var r = this;
        if ("boolean" == typeof i)
            n = i,
            i = null;
        else if (i < 0 || i >= r.slideCount)
            return !1;
        r.unload(),
        "number" == typeof i ? 0 === i && 0 === r.$slides.length ? e(t).appendTo(r.$slideTrack) : n ? e(t).insertBefore(r.$slides.eq(i)) : e(t).insertAfter(r.$slides.eq(i)) : !0 === n ? e(t).prependTo(r.$slideTrack) : e(t).appendTo(r.$slideTrack),
        r.$slides = r.$slideTrack.children(this.options.slide),
        r.$slideTrack.children(this.options.slide).detach(),
        r.$slideTrack.append(r.$slides),
        r.$slides.each(function(t, i) {
            e(i).attr("data-slick-index", t)
        }),
        r.$slidesCache = r.$slides,
        r.reinit()
    }
    ,
    t.prototype.animateHeight = function() {
        var e = this;
        if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
            e.$list.animate({
                height: t
            }, e.options.speed)
        }
    }
    ,
    t.prototype.animateSlide = function(t, i) {
        var n = {}
          , r = this;
        r.animateHeight(),
        !0 === r.options.rtl && !1 === r.options.vertical && (t = -t),
        !1 === r.transformsEnabled ? !1 === r.options.vertical ? r.$slideTrack.animate({
            left: t
        }, r.options.speed, r.options.easing, i) : r.$slideTrack.animate({
            top: t
        }, r.options.speed, r.options.easing, i) : !1 === r.cssTransitions ? (!0 === r.options.rtl && (r.currentLeft = -r.currentLeft),
        e({
            animStart: r.currentLeft
        }).animate({
            animStart: t
        }, {
            duration: r.options.speed,
            easing: r.options.easing,
            step: function(e) {
                e = Math.ceil(e),
                !1 === r.options.vertical ? (n[r.animType] = "translate(" + e + "px, 0px)",
                r.$slideTrack.css(n)) : (n[r.animType] = "translate(0px," + e + "px)",
                r.$slideTrack.css(n))
            },
            complete: function() {
                i && i.call()
            }
        })) : (r.applyTransition(),
        t = Math.ceil(t),
        !1 === r.options.vertical ? n[r.animType] = "translate3d(" + t + "px, 0px, 0px)" : n[r.animType] = "translate3d(0px," + t + "px, 0px)",
        r.$slideTrack.css(n),
        i && setTimeout(function() {
            r.disableTransition(),
            i.call()
        }, r.options.speed))
    }
    ,
    t.prototype.getNavTarget = function() {
        var t = this
          , i = t.options.asNavFor;
        return i && null !== i && (i = e(i).not(t.$slider)),
        i
    }
    ,
    t.prototype.asNavFor = function(t) {
        var i = this.getNavTarget();
        null !== i && "object" == typeof i && i.each(function() {
            var i = e(this).slick("getSlick");
            i.unslicked || i.slideHandler(t, !0)
        })
    }
    ,
    t.prototype.applyTransition = function(e) {
        var t = this
          , i = {};
        !1 === t.options.fade ? i[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : i[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase,
        !1 === t.options.fade ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i)
    }
    ,
    t.prototype.autoPlay = function() {
        var e = this;
        e.autoPlayClear(),
        e.slideCount > e.options.slidesToShow && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed))
    }
    ,
    t.prototype.autoPlayClear = function() {
        var e = this;
        e.autoPlayTimer && clearInterval(e.autoPlayTimer)
    }
    ,
    t.prototype.autoPlayIterator = function() {
        var e = this
          , t = e.currentSlide + e.options.slidesToScroll;
        e.paused || e.interrupted || e.focussed || (!1 === e.options.infinite && (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1 ? e.direction = 0 : 0 === e.direction && (t = e.currentSlide - e.options.slidesToScroll,
        e.currentSlide - 1 == 0 && (e.direction = 1))),
        e.slideHandler(t))
    }
    ,
    t.prototype.buildArrows = function() {
        var t = this;
        t.options.arrows = true;
        !0 === t.options.arrows && (t.$prevArrow = e(t.options.prevArrow).addClass("slick-arrow"),
        t.$nextArrow = e(t.options.nextArrow).addClass("slick-arrow"),
        t.slideCount > t.options.slidesToShow ? (t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
        t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
        t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.prependTo(t.options.appendArrows),
        t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows),
        !0 !== t.options.infinite && t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }
    ,
    t.prototype.buildDots = function() {
        var t, i, n = this;
        if (!0 === n.options.dots) {
            for (n.$slider.addClass("slick-dotted"),
            i = e("<ul />").addClass(n.options.dotsClass),
            t = 0; t <= n.getDotCount(); t += 1)
                i.append(e("<li />").append(n.options.customPaging.call(this, n, t)));
            n.$dots = i.appendTo(n.options.appendDots),
            n.$dots.find("li").first().addClass("slick-active")
        }
    }
    ,
    t.prototype.buildOut = function() {
        var t = this;
        t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide"),
        t.slideCount = t.$slides.length,
        t.$slides.each(function(t, i) {
            e(i).attr("data-slick-index", t).data("originalStyling", e(i).attr("style") || "")
        }),
        t.$slider.addClass("slick-slider"),
        t.$slideTrack = 0 === t.slideCount ? e('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent(),
        t.$list = t.$slideTrack.wrap('<div class="slick-list"/>').parent(),
        t.$slideTrack.css("opacity", 0),
        !0 !== t.options.centerMode && !0 !== t.options.swipeToSlide || (t.options.slidesToScroll = 1),
        e("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"),
        t.setupInfinite(),
        t.buildArrows(),
        t.buildDots(),
        t.updateDots(),
        t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0),
        !0 === t.options.draggable && t.$list.addClass("draggable")
    }
    ,
    t.prototype.buildRows = function() {
        var e, t, i, n, r, o, s, a = this;
        if (n = document.createDocumentFragment(),
        o = a.$slider.children(),
        a.options.rows > 1) {
            for (s = a.options.slidesPerRow * a.options.rows,
            r = Math.ceil(o.length / s),
            e = 0; e < r; e++) {
                var l = document.createElement("div");
                for (t = 0; t < a.options.rows; t++) {
                    var u = document.createElement("div");
                    for (i = 0; i < a.options.slidesPerRow; i++) {
                        var c = e * s + (t * a.options.slidesPerRow + i);
                        o.get(c) && u.appendChild(o.get(c))
                    }
                    l.appendChild(u)
                }
                n.appendChild(l)
            }
            a.$slider.empty().append(n),
            a.$slider.children().children().children().css({
                width: 100 / a.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }
    ,
    t.prototype.checkResponsive = function(t, i) {
        var n, r, o, s = this, a = !1, l = s.$slider.width(), u = window.innerWidth || e(window).width();
        if ("window" === s.respondTo ? o = u : "slider" === s.respondTo ? o = l : "min" === s.respondTo && (o = Math.min(u, l)),
        s.options.responsive && s.options.responsive.length && null !== s.options.responsive) {
            r = null;
            for (n in s.breakpoints)
                s.breakpoints.hasOwnProperty(n) && (!1 === s.originalSettings.mobileFirst ? o < s.breakpoints[n] && (r = s.breakpoints[n]) : o > s.breakpoints[n] && (r = s.breakpoints[n]));
            null !== r ? null !== s.activeBreakpoint ? (r !== s.activeBreakpoint || i) && (s.activeBreakpoint = r,
            "unslick" === s.breakpointSettings[r] ? s.unslick(r) : (s.options = e.extend({}, s.originalSettings, s.breakpointSettings[r]),
            !0 === t && (s.currentSlide = s.options.initialSlide),
            s.refresh(t)),
            a = r) : (s.activeBreakpoint = r,
            "unslick" === s.breakpointSettings[r] ? s.unslick(r) : (s.options = e.extend({}, s.originalSettings, s.breakpointSettings[r]),
            !0 === t && (s.currentSlide = s.options.initialSlide),
            s.refresh(t)),
            a = r) : null !== s.activeBreakpoint && (s.activeBreakpoint = null,
            s.options = s.originalSettings,
            !0 === t && (s.currentSlide = s.options.initialSlide),
            s.refresh(t),
            a = r),
            t || !1 === a || s.$slider.trigger("breakpoint", [s, a])
        }
    }
    ,
    t.prototype.changeSlide = function(t, i) {
        var n, r, o, s = this, a = e(t.currentTarget);
        switch (a.is("a") && t.preventDefault(),
        a.is("li") || (a = a.closest("li")),
        o = s.slideCount % s.options.slidesToScroll != 0,
        n = o ? 0 : (s.slideCount - s.currentSlide) % s.options.slidesToScroll,
        t.data.message) {
        case "previous":
            r = 0 === n ? s.options.slidesToScroll : s.options.slidesToShow - n,
            s.slideCount > s.options.slidesToShow && s.slideHandler(s.currentSlide - r, !1, i);
            break;
        case "next":
            r = 0 === n ? s.options.slidesToScroll : n,
            s.slideCount > s.options.slidesToShow && s.slideHandler(s.currentSlide + r, !1, i);
            break;
        case "index":
            var l = 0 === t.data.index ? 0 : t.data.index || a.index() * s.options.slidesToScroll;
            s.slideHandler(s.checkNavigable(l), !1, i),
            a.children().trigger("focus");
            break;
        default:
            return
        }
    }
    ,
    t.prototype.checkNavigable = function(e) {
        var t, i;
        if (t = this.getNavigableIndexes(),
        i = 0,
        e > t[t.length - 1])
            e = t[t.length - 1];
        else
            for (var n in t) {
                if (e < t[n]) {
                    e = i;
                    break
                }
                i = t[n]
            }
        return e
    }
    ,
    t.prototype.cleanUpEvents = function() {
        var t = this;
        t.options.dots && null !== t.$dots && (e("li", t.$dots).off("click.slick", t.changeSlide).off("mouseenter.slick", e.proxy(t.interrupt, t, !0)).off("mouseleave.slick", e.proxy(t.interrupt, t, !1)),
        !0 === t.options.accessibility && t.$dots.off("keydown.slick", t.keyHandler)),
        t.$slider.off("focus.slick blur.slick"),
        !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide),
        t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide),
        !0 === t.options.accessibility && (t.$prevArrow && t.$prevArrow.off("keydown.slick", t.keyHandler),
        t.$nextArrow && t.$nextArrow.off("keydown.slick", t.keyHandler))),
        t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler),
        t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler),
        t.$list.off("touchend.slick mouseup.slick", t.swipeHandler),
        t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler),
        t.$list.off("click.slick", t.clickHandler),
        e(document).off(t.visibilityChange, t.visibility),
        t.cleanUpSlideEvents(),
        !0 === t.options.accessibility && t.$list.off("keydown.slick", t.keyHandler),
        !0 === t.options.focusOnSelect && e(t.$slideTrack).children().off("click.slick", t.selectHandler),
        e(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange),
        e(window).off("resize.slick.slick-" + t.instanceUid, t.resize),
        e("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault),
        e(window).off("load.slick.slick-" + t.instanceUid, t.setPosition)
    }
    ,
    t.prototype.cleanUpSlideEvents = function() {
        var t = this;
        t.$list.off("mouseenter.slick", e.proxy(t.interrupt, t, !0)),
        t.$list.off("mouseleave.slick", e.proxy(t.interrupt, t, !1))
    }
    ,
    t.prototype.cleanUpRows = function() {
        var e, t = this;
        t.options.rows > 1 && ((e = t.$slides.children().children()).removeAttr("style"),
        t.$slider.empty().append(e))
    }
    ,
    t.prototype.clickHandler = function(e) {
        !1 === this.shouldClick && (e.stopImmediatePropagation(),
        e.stopPropagation(),
        e.preventDefault())
    }
    ,
    t.prototype.destroy = function(t) {
        var i = this;
        i.autoPlayClear(),
        i.touchObject = {},
        i.cleanUpEvents(),
        e(".slick-cloned", i.$slider).detach(),
        i.$dots && i.$dots.remove(),
        i.$prevArrow && i.$prevArrow.length && (i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
        i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()),
        i.$nextArrow && i.$nextArrow.length && (i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
        i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()),
        i.$slides && (i.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            e(this).attr("style", e(this).data("originalStyling"))
        }),
        i.$slideTrack.children(this.options.slide).detach(),
        i.$slideTrack.detach(),
        i.$list.detach(),
        i.$slider.append(i.$slides)),
        i.cleanUpRows(),
        i.$slider.removeClass("slick-slider"),
        i.$slider.removeClass("slick-initialized"),
        i.$slider.removeClass("slick-dotted"),
        i.unslicked = !0,
        t || i.$slider.trigger("destroy", [i])
    }
    ,
    t.prototype.disableTransition = function(e) {
        var t = this
          , i = {};
        i[t.transitionType] = "",
        !1 === t.options.fade ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i)
    }
    ,
    t.prototype.fadeSlide = function(e, t) {
        var i = this;
        !1 === i.cssTransitions ? (i.$slides.eq(e).css({
            zIndex: i.options.zIndex
        }),
        i.$slides.eq(e).animate({
            opacity: 1
        }, i.options.speed, i.options.easing, t)) : (i.applyTransition(e),
        i.$slides.eq(e).css({
            opacity: 1,
            zIndex: i.options.zIndex
        }),
        t && setTimeout(function() {
            i.disableTransition(e),
            t.call()
        }, i.options.speed))
    }
    ,
    t.prototype.fadeSlideOut = function(e) {
        var t = this;
        !1 === t.cssTransitions ? t.$slides.eq(e).animate({
            opacity: 0,
            zIndex: t.options.zIndex - 2
        }, t.options.speed, t.options.easing) : (t.applyTransition(e),
        t.$slides.eq(e).css({
            opacity: 0,
            zIndex: t.options.zIndex - 2
        }))
    }
    ,
    t.prototype.filterSlides = t.prototype.slickFilter = function(e) {
        var t = this;
        null !== e && (t.$slidesCache = t.$slides,
        t.unload(),
        t.$slideTrack.children(this.options.slide).detach(),
        t.$slidesCache.filter(e).appendTo(t.$slideTrack),
        t.reinit())
    }
    ,
    t.prototype.focusHandler = function() {
        var t = this;
        t.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(i) {
            i.stopImmediatePropagation();
            var n = e(this);
            setTimeout(function() {
                t.options.pauseOnFocus && (t.focussed = n.is(":focus"),
                t.autoPlay())
            }, 0)
        })
    }
    ,
    t.prototype.getCurrent = t.prototype.slickCurrentSlide = function() {
        return this.currentSlide
    }
    ,
    t.prototype.getDotCount = function() {
        var e = this
          , t = 0
          , i = 0
          , n = 0;
        if (!0 === e.options.infinite)
            if (e.slideCount <= e.options.slidesToShow)
                ++n;
            else
                for (; t < e.slideCount; )
                    ++n,
                    t = i + e.options.slidesToScroll,
                    i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        else if (!0 === e.options.centerMode)
            n = e.slideCount;
        else if (e.options.asNavFor)
            for (; t < e.slideCount; )
                ++n,
                t = i + e.options.slidesToScroll,
                i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        else
            n = 1 + Math.ceil((e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll);
        return n - 1
    }
    ,
    t.prototype.getLeft = function(e) {
        var t, i, n, r, o = this, s = 0;
        return o.slideOffset = 0,
        i = o.$slides.first().outerHeight(!0),
        !0 === o.options.infinite ? (o.slideCount > o.options.slidesToShow && (o.slideOffset = o.slideWidth * o.options.slidesToShow * -1,
        r = -1,
        !0 === o.options.vertical && !0 === o.options.centerMode && (2 === o.options.slidesToShow ? r = -1.5 : 1 === o.options.slidesToShow && (r = -2)),
        s = i * o.options.slidesToShow * r),
        o.slideCount % o.options.slidesToScroll != 0 && e + o.options.slidesToScroll > o.slideCount && o.slideCount > o.options.slidesToShow && (e > o.slideCount ? (o.slideOffset = (o.options.slidesToShow - (e - o.slideCount)) * o.slideWidth * -1,
        s = (o.options.slidesToShow - (e - o.slideCount)) * i * -1) : (o.slideOffset = o.slideCount % o.options.slidesToScroll * o.slideWidth * -1,
        s = o.slideCount % o.options.slidesToScroll * i * -1))) : e + o.options.slidesToShow > o.slideCount && (o.slideOffset = (e + o.options.slidesToShow - o.slideCount) * o.slideWidth,
        s = (e + o.options.slidesToShow - o.slideCount) * i),
        o.slideCount <= o.options.slidesToShow && (o.slideOffset = 0,
        s = 0),
        !0 === o.options.centerMode && o.slideCount <= o.options.slidesToShow ? o.slideOffset = o.slideWidth * Math.floor(o.options.slidesToShow) / 2 - o.slideWidth * o.slideCount / 2 : !0 === o.options.centerMode && !0 === o.options.infinite ? o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2) - o.slideWidth : !0 === o.options.centerMode && (o.slideOffset = 0,
        o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2)),
        t = !1 === o.options.vertical ? e * o.slideWidth * -1 + o.slideOffset : e * i * -1 + s,
        !0 === o.options.variableWidth && (n = o.slideCount <= o.options.slidesToShow || !1 === o.options.infinite ? o.$slideTrack.children(".slick-slide").eq(e) : o.$slideTrack.children(".slick-slide").eq(e + o.options.slidesToShow),
        t = !0 === o.options.rtl ? n[0] ? -1 * (o.$slideTrack.width() - n[0].offsetLeft - n.width()) : 0 : n[0] ? -1 * n[0].offsetLeft : 0,
        !0 === o.options.centerMode && (n = o.slideCount <= o.options.slidesToShow || !1 === o.options.infinite ? o.$slideTrack.children(".slick-slide").eq(e) : o.$slideTrack.children(".slick-slide").eq(e + o.options.slidesToShow + 1),
        t = !0 === o.options.rtl ? n[0] ? -1 * (o.$slideTrack.width() - n[0].offsetLeft - n.width()) : 0 : n[0] ? -1 * n[0].offsetLeft : 0,
        t += (o.$list.width() - n.outerWidth()) / 2)),
        t
    }
    ,
    t.prototype.getOption = t.prototype.slickGetOption = function(e) {
        return this.options[e]
    }
    ,
    t.prototype.getNavigableIndexes = function() {
        var e, t = this, i = 0, n = 0, r = [];
        for (!1 === t.options.infinite ? e = t.slideCount : (i = -1 * t.options.slidesToScroll,
        n = -1 * t.options.slidesToScroll,
        e = 2 * t.slideCount); i < e; )
            r.push(i),
            i = n + t.options.slidesToScroll,
            n += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
        return r
    }
    ,
    t.prototype.getSlick = function() {
        return this
    }
    ,
    t.prototype.getSlideCount = function() {
        var t, i, n = this;
        return i = !0 === n.options.centerMode ? n.slideWidth * Math.floor(n.options.slidesToShow / 2) : 0,
        !0 === n.options.swipeToSlide ? (n.$slideTrack.find(".slick-slide").each(function(r, o) {
            if (o.offsetLeft - i + e(o).outerWidth() / 2 > -1 * n.swipeLeft)
                return t = o,
                !1
        }),
        Math.abs(e(t).attr("data-slick-index") - n.currentSlide) || 1) : n.options.slidesToScroll
    }
    ,
    t.prototype.goTo = t.prototype.slickGoTo = function(e, t) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(e)
            }
        }, t)
    }
    ,
    t.prototype.init = function(t) {
        var i = this;
        e(i.$slider).hasClass("slick-initialized") || (e(i.$slider).addClass("slick-initialized"),
        i.buildRows(),
        i.buildOut(),
        i.setProps(),
        i.startLoad(),
        i.loadSlider(),
        i.initializeEvents(),
        i.updateArrows(),
        i.updateDots(),
        i.checkResponsive(!0),
        i.focusHandler()),
        t && i.$slider.trigger("init", [i]),
        !0 === i.options.accessibility && i.initADA(),
        i.options.autoplay && (i.paused = !1,
        i.autoPlay())
    }
    ,
    t.prototype.initADA = function() {
        var t = this
          , i = Math.ceil(t.slideCount / t.options.slidesToShow)
          , n = t.getNavigableIndexes().filter(function(e) {
            return e >= 0 && e < t.slideCount
        });
        t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }),
        null !== t.$dots && (t.$slides.not(t.$slideTrack.find(".slick-cloned")).each(function(i) {
            var r = n.indexOf(i);
            e(this).attr({
                role: "tabpanel",
                id: "slick-slide" + t.instanceUid + i,
                tabindex: -1
            }),
            -1 !== r && e(this).attr({
                "aria-describedby": "slick-slide-control" + t.instanceUid + r
            })
        }),
        t.$dots.attr("role", "tablist").find("li").each(function(r) {
            var o = n[r];
            e(this).attr({
                role: "presentation"
            }),
            e(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + t.instanceUid + r,
                "aria-controls": "slick-slide" + t.instanceUid + o,
                "aria-label": r + 1 + " of " + i,
                "aria-selected": null,
                tabindex: "-1"
            })
        }).eq(t.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var r = t.currentSlide, o = r + t.options.slidesToShow; r < o; r++)
            t.$slides.eq(r).attr("tabindex", 0);
        t.activateADA()
    }
    ,
    t.prototype.initArrowEvents = function() {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, e.changeSlide),
        e.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, e.changeSlide),
        !0 === e.options.accessibility && (e.$prevArrow.on("keydown.slick", e.keyHandler),
        e.$nextArrow.on("keydown.slick", e.keyHandler)))
    }
    ,
    t.prototype.initDotEvents = function() {
        var t = this;
        !0 === t.options.dots && (e("li", t.$dots).on("click.slick", {
            message: "index"
        }, t.changeSlide),
        !0 === t.options.accessibility && t.$dots.on("keydown.slick", t.keyHandler)),
        !0 === t.options.dots && !0 === t.options.pauseOnDotsHover && e("li", t.$dots).on("mouseenter.slick", e.proxy(t.interrupt, t, !0)).on("mouseleave.slick", e.proxy(t.interrupt, t, !1))
    }
    ,
    t.prototype.initSlideEvents = function() {
        var t = this;
        t.options.pauseOnHover && (t.$list.on("mouseenter.slick", e.proxy(t.interrupt, t, !0)),
        t.$list.on("mouseleave.slick", e.proxy(t.interrupt, t, !1)))
    }
    ,
    t.prototype.initializeEvents = function() {
        var t = this;
        t.initArrowEvents(),
        t.initDotEvents(),
        t.initSlideEvents(),
        t.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, t.swipeHandler),
        t.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, t.swipeHandler),
        t.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, t.swipeHandler),
        t.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, t.swipeHandler),
        t.$list.on("click.slick", t.clickHandler),
        e(document).on(t.visibilityChange, e.proxy(t.visibility, t)),
        !0 === t.options.accessibility && t.$list.on("keydown.slick", t.keyHandler),
        !0 === t.options.focusOnSelect && e(t.$slideTrack).children().on("click.slick", t.selectHandler),
        e(window).on("orientationchange.slick.slick-" + t.instanceUid, e.proxy(t.orientationChange, t)),
        e(window).on("resize.slick.slick-" + t.instanceUid, e.proxy(t.resize, t)),
        e("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault),
        e(window).on("load.slick.slick-" + t.instanceUid, t.setPosition),
        e(t.setPosition)
    }
    ,
    t.prototype.initUI = function() {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(),
        e.$nextArrow.show()),
        !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.show()
    }
    ,
    t.prototype.keyHandler = function(e) {
        var t = this;
        e.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === e.keyCode && !0 === t.options.accessibility ? t.changeSlide({
            data: {
                message: !0 === t.options.rtl ? "next" : "previous"
            }
        }) : 39 === e.keyCode && !0 === t.options.accessibility && t.changeSlide({
            data: {
                message: !0 === t.options.rtl ? "previous" : "next"
            }
        }))
    }
    ,
    t.prototype.lazyLoad = function() {
        function t(t) {
            e("img[data-lazy]", t).each(function() {
                var t = e(this)
                  , i = e(this).attr("data-lazy")
                  , n = e(this).attr("data-srcset")
                  , r = e(this).attr("data-sizes") || o.$slider.attr("data-sizes")
                  , s = document.createElement("img");
                s.onload = function() {
                    t.animate({
                        opacity: 0
                    }, 100, function() {
                        n && (t.attr("srcset", n),
                        r && t.attr("sizes", r)),
                        t.attr("src", i).animate({
                            opacity: 1
                        }, 200, function() {
                            t.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        }),
                        o.$slider.trigger("lazyLoaded", [o, t, i])
                    })
                }
                ,
                s.onerror = function() {
                    t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
                    o.$slider.trigger("lazyLoadError", [o, t, i])
                }
                ,
                s.src = i
            })
        }
        var i, n, r, o = this;
        if (!0 === o.options.centerMode ? !0 === o.options.infinite ? r = (n = o.currentSlide + (o.options.slidesToShow / 2 + 1)) + o.options.slidesToShow + 2 : (n = Math.max(0, o.currentSlide - (o.options.slidesToShow / 2 + 1)),
        r = o.options.slidesToShow / 2 + 1 + 2 + o.currentSlide) : (n = o.options.infinite ? o.options.slidesToShow + o.currentSlide : o.currentSlide,
        r = Math.ceil(n + o.options.slidesToShow),
        !0 === o.options.fade && (n > 0 && n--,
        r <= o.slideCount && r++)),
        i = o.$slider.find(".slick-slide").slice(n, r),
        "anticipated" === o.options.lazyLoad)
            for (var s = n - 1, a = r, l = o.$slider.find(".slick-slide"), u = 0; u < o.options.slidesToScroll; u++)
                s < 0 && (s = o.slideCount - 1),
                i = (i = i.add(l.eq(s))).add(l.eq(a)),
                s--,
                a++;
        t(i),
        o.slideCount <= o.options.slidesToShow ? t(o.$slider.find(".slick-slide")) : o.currentSlide >= o.slideCount - o.options.slidesToShow ? t(o.$slider.find(".slick-cloned").slice(0, o.options.slidesToShow)) : 0 === o.currentSlide && t(o.$slider.find(".slick-cloned").slice(-1 * o.options.slidesToShow))
    }
    ,
    t.prototype.loadSlider = function() {
        var e = this;
        e.setPosition(),
        e.$slideTrack.css({
            opacity: 1
        }),
        e.$slider.removeClass("slick-loading"),
        e.initUI(),
        "progressive" === e.options.lazyLoad && e.progressiveLazyLoad()
    }
    ,
    t.prototype.next = t.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        })
    }
    ,
    t.prototype.orientationChange = function() {
        var e = this;
        e.checkResponsive(),
        e.setPosition()
    }
    ,
    t.prototype.pause = t.prototype.slickPause = function() {
        var e = this;
        e.autoPlayClear(),
        e.paused = !0
    }
    ,
    t.prototype.play = t.prototype.slickPlay = function() {
        var e = this;
        e.autoPlay(),
        e.options.autoplay = !0,
        e.paused = !1,
        e.focussed = !1,
        e.interrupted = !1
    }
    ,
    t.prototype.postSlide = function(t) {
        var i = this;
        i.unslicked || (i.$slider.trigger("afterChange", [i, t]),
        i.animating = !1,
        i.slideCount > i.options.slidesToShow && i.setPosition(),
        i.swipeLeft = null,
        i.options.autoplay && i.autoPlay(),
        !0 === i.options.accessibility && (i.initADA(),
        i.options.focusOnChange && e(i.$slides.get(i.currentSlide)).attr("tabindex", 0).focus()))
    }
    ,
    t.prototype.prev = t.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        })
    }
    ,
    t.prototype.preventDefault = function(e) {
        e.preventDefault()
    }
    ,
    t.prototype.progressiveLazyLoad = function(t) {
        t = t || 1;
        var i, n, r, o, s, a = this, l = e("img[data-lazy]", a.$slider);
        l.length ? (i = l.first(),
        n = i.attr("data-lazy"),
        r = i.attr("data-srcset"),
        o = i.attr("data-sizes") || a.$slider.attr("data-sizes"),
        (s = document.createElement("img")).onload = function() {
            r && (i.attr("srcset", r),
            o && i.attr("sizes", o)),
            i.attr("src", n).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),
            !0 === a.options.adaptiveHeight && a.setPosition(),
            a.$slider.trigger("lazyLoaded", [a, i, n]),
            a.progressiveLazyLoad()
        }
        ,
        s.onerror = function() {
            t < 3 ? setTimeout(function() {
                a.progressiveLazyLoad(t + 1)
            }, 500) : (i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
            a.$slider.trigger("lazyLoadError", [a, i, n]),
            a.progressiveLazyLoad())
        }
        ,
        s.src = n) : a.$slider.trigger("allImagesLoaded", [a])
    }
    ,
    t.prototype.refresh = function(t) {
        var i, n, r = this;
        n = r.slideCount - r.options.slidesToShow,
        !r.options.infinite && r.currentSlide > n && (r.currentSlide = n),
        r.slideCount <= r.options.slidesToShow && (r.currentSlide = 0),
        i = r.currentSlide,
        r.destroy(!0),
        e.extend(r, r.initials, {
            currentSlide: i
        }),
        r.init(),
        t || r.changeSlide({
            data: {
                message: "index",
                index: i
            }
        }, !1)
    }
    ,
    t.prototype.registerBreakpoints = function() {
        var t, i, n, r = this, o = r.options.responsive || null;
        if ("array" === e.type(o) && o.length) {
            r.respondTo = r.options.respondTo || "window";
            for (t in o)
                if (n = r.breakpoints.length - 1,
                o.hasOwnProperty(t)) {
                    for (i = o[t].breakpoint; n >= 0; )
                        r.breakpoints[n] && r.breakpoints[n] === i && r.breakpoints.splice(n, 1),
                        n--;
                    r.breakpoints.push(i),
                    r.breakpointSettings[i] = o[t].settings
                }
            r.breakpoints.sort(function(e, t) {
                return r.options.mobileFirst ? e - t : t - e
            })
        }
    }
    ,
    t.prototype.reinit = function() {
        var t = this;
        t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide"),
        t.slideCount = t.$slides.length,
        t.currentSlide >= t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t.currentSlide - t.options.slidesToScroll),
        t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0),
        t.registerBreakpoints(),
        t.setProps(),
        t.setupInfinite(),
        t.buildArrows(),
        t.updateArrows(),
        t.initArrowEvents(),
        t.buildDots(),
        t.updateDots(),
        t.initDotEvents(),
        t.cleanUpSlideEvents(),
        t.initSlideEvents(),
        t.checkResponsive(!1, !0),
        !0 === t.options.focusOnSelect && e(t.$slideTrack).children().on("click.slick", t.selectHandler),
        t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0),
        t.setPosition(),
        t.focusHandler(),
        t.paused = !t.options.autoplay,
        t.autoPlay(),
        t.$slider.trigger("reInit", [t])
    }
    ,
    t.prototype.resize = function() {
        var t = this;
        e(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay),
        t.windowDelay = window.setTimeout(function() {
            t.windowWidth = e(window).width(),
            t.checkResponsive(),
            t.unslicked || t.setPosition()
        }, 50))
    }
    ,
    t.prototype.removeSlide = t.prototype.slickRemove = function(e, t, i) {
        var n = this;
        if (e = "boolean" == typeof e ? !0 === (t = e) ? 0 : n.slideCount - 1 : !0 === t ? --e : e,
        n.slideCount < 1 || e < 0 || e > n.slideCount - 1)
            return !1;
        n.unload(),
        !0 === i ? n.$slideTrack.children().remove() : n.$slideTrack.children(this.options.slide).eq(e).remove(),
        n.$slides = n.$slideTrack.children(this.options.slide),
        n.$slideTrack.children(this.options.slide).detach(),
        n.$slideTrack.append(n.$slides),
        n.$slidesCache = n.$slides,
        n.reinit()
    }
    ,
    t.prototype.setCSS = function(e) {
        var t, i, n = this, r = {};
        !0 === n.options.rtl && (e = -e),
        t = "left" == n.positionProp ? Math.ceil(e) + "px" : "0px",
        i = "top" == n.positionProp ? Math.ceil(e) + "px" : "0px",
        r[n.positionProp] = e,
        !1 === n.transformsEnabled ? n.$slideTrack.css(r) : (r = {},
        !1 === n.cssTransitions ? (r[n.animType] = "translate(" + t + ", " + i + ")",
        n.$slideTrack.css(r)) : (r[n.animType] = "translate3d(" + t + ", " + i + ", 0px)",
        n.$slideTrack.css(r)))
    }
    ,
    t.prototype.setDimensions = function() {
        var e = this;
        !1 === e.options.vertical ? !0 === e.options.centerMode && e.$list.css({
            padding: "0px " + e.options.centerPadding
        }) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow),
        !0 === e.options.centerMode && e.$list.css({
            padding: e.options.centerPadding + " 0px"
        })),
        e.listWidth = e.$list.width(),
        e.listHeight = e.$list.height(),
        !1 === e.options.vertical && !1 === e.options.variableWidth ? (e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow),
        e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length))) : !0 === e.options.variableWidth ? e.$slideTrack.width(5e3 * e.slideCount) : (e.slideWidth = Math.ceil(e.listWidth),
        e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length)));
        var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
        !1 === e.options.variableWidth && e.$slideTrack.children(".slick-slide").width(e.slideWidth - t)
    }
    ,
    t.prototype.setFade = function() {
        var t, i = this;
        i.$slides.each(function(n, r) {
            t = i.slideWidth * n * -1,
            !0 === i.options.rtl ? e(r).css({
                position: "relative",
                right: t,
                top: 0,
                zIndex: i.options.zIndex - 2,
                opacity: 0
            }) : e(r).css({
                position: "relative",
                left: t,
                top: 0,
                zIndex: i.options.zIndex - 2,
                opacity: 0
            })
        }),
        i.$slides.eq(i.currentSlide).css({
            zIndex: i.options.zIndex - 1,
            opacity: 1
        })
    }
    ,
    t.prototype.setHeight = function() {
        var e = this;
        if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
            e.$list.css("height", t)
        }
    }
    ,
    t.prototype.setOption = t.prototype.slickSetOption = function() {
        var t, i, n, r, o, s = this, a = !1;
        if ("object" === e.type(arguments[0]) ? (n = arguments[0],
        a = arguments[1],
        o = "multiple") : "string" === e.type(arguments[0]) && (n = arguments[0],
        r = arguments[1],
        a = arguments[2],
        "responsive" === arguments[0] && "array" === e.type(arguments[1]) ? o = "responsive" : void 0 !== arguments[1] && (o = "single")),
        "single" === o)
            s.options[n] = r;
        else if ("multiple" === o)
            e.each(n, function(e, t) {
                s.options[e] = t
            });
        else if ("responsive" === o)
            for (i in r)
                if ("array" !== e.type(s.options.responsive))
                    s.options.responsive = [r[i]];
                else {
                    for (t = s.options.responsive.length - 1; t >= 0; )
                        s.options.responsive[t].breakpoint === r[i].breakpoint && s.options.responsive.splice(t, 1),
                        t--;
                    s.options.responsive.push(r[i])
                }
        a && (s.unload(),
        s.reinit())
    }
    ,
    t.prototype.setPosition = function() {
        var e = this;
        e.setDimensions(),
        e.setHeight(),
        !1 === e.options.fade ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(),
        e.$slider.trigger("setPosition", [e])
    }
    ,
    t.prototype.setProps = function() {
        var e = this
          , t = document.body.style;
        e.positionProp = !0 === e.options.vertical ? "top" : "left",
        "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"),
        void 0 === t.WebkitTransition && void 0 === t.MozTransition && void 0 === t.msTransition || !0 === e.options.useCSS && (e.cssTransitions = !0),
        e.options.fade && ("number" == typeof e.options.zIndex ? e.options.zIndex < 3 && (e.options.zIndex = 3) : e.options.zIndex = e.defaults.zIndex),
        void 0 !== t.OTransform && (e.animType = "OTransform",
        e.transformType = "-o-transform",
        e.transitionType = "OTransition",
        void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)),
        void 0 !== t.MozTransform && (e.animType = "MozTransform",
        e.transformType = "-moz-transform",
        e.transitionType = "MozTransition",
        void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)),
        void 0 !== t.webkitTransform && (e.animType = "webkitTransform",
        e.transformType = "-webkit-transform",
        e.transitionType = "webkitTransition",
        void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)),
        void 0 !== t.msTransform && (e.animType = "msTransform",
        e.transformType = "-ms-transform",
        e.transitionType = "msTransition",
        void 0 === t.msTransform && (e.animType = !1)),
        void 0 !== t.transform && !1 !== e.animType && (e.animType = "transform",
        e.transformType = "transform",
        e.transitionType = "transition"),
        e.transformsEnabled = e.options.useTransform && null !== e.animType && !1 !== e.animType
    }
    ,
    t.prototype.setSlideClasses = function(e) {
        var t, i, n, r, o = this;
        if (i = o.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"),
        o.$slides.eq(e).addClass("slick-current"),
        !0 === o.options.centerMode) {
            var s = o.options.slidesToShow % 2 == 0 ? 1 : 0;
            t = Math.floor(o.options.slidesToShow / 2),
            !0 === o.options.infinite && (e >= t && e <= o.slideCount - 1 - t ? o.$slides.slice(e - t + s, e + t + 1).addClass("slick-active").attr("aria-hidden", "false") : (n = o.options.slidesToShow + e,
            i.slice(n - t + 1 + s, n + t + 2).addClass("slick-active").attr("aria-hidden", "false")),
            0 === e ? i.eq(i.length - 1 - o.options.slidesToShow).addClass("slick-center") : e === o.slideCount - 1 && i.eq(o.options.slidesToShow).addClass("slick-center")),
            o.$slides.eq(e).addClass("slick-center")
        } else
            e >= 0 && e <= o.slideCount - o.options.slidesToShow ? o.$slides.slice(e, e + o.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= o.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (r = o.slideCount % o.options.slidesToShow,
            n = !0 === o.options.infinite ? o.options.slidesToShow + e : e,
            o.options.slidesToShow == o.options.slidesToScroll && o.slideCount - e < o.options.slidesToShow ? i.slice(n - (o.options.slidesToShow - r), n + r).addClass("slick-active").attr("aria-hidden", "false") : i.slice(n, n + o.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== o.options.lazyLoad && "anticipated" !== o.options.lazyLoad || o.lazyLoad()
    }
    ,
    t.prototype.setupInfinite = function() {
        var t, i, n, r = this;
        if (!0 === r.options.fade && (r.options.centerMode = !1),
        !0 === r.options.infinite && !1 === r.options.fade && (i = null,
        r.slideCount > r.options.slidesToShow)) {
            for (n = !0 === r.options.centerMode ? r.options.slidesToShow + 1 : r.options.slidesToShow,
            t = r.slideCount; t > r.slideCount - n; t -= 1)
                i = t - 1,
                e(r.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i - r.slideCount).prependTo(r.$slideTrack).addClass("slick-cloned");
            for (t = 0; t < n + r.slideCount; t += 1)
                i = t,
                e(r.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i + r.slideCount).appendTo(r.$slideTrack).addClass("slick-cloned");
            r.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                e(this).attr("id", "")
            })
        }
    }
    ,
    t.prototype.interrupt = function(e) {
        var t = this;
        e || t.autoPlay(),
        t.interrupted = e
    }
    ,
    t.prototype.selectHandler = function(t) {
        var i = this
          , n = e(t.target).is(".slick-slide") ? e(t.target) : e(t.target).parents(".slick-slide")
          , r = parseInt(n.attr("data-slick-index"));
        r || (r = 0),
        i.slideCount <= i.options.slidesToShow ? i.slideHandler(r, !1, !0) : i.slideHandler(r)
    }
    ,
    t.prototype.slideHandler = function(e, t, i) {
        var n, r, o, s, a, l = null, u = this;
        if (t = t || !1,
        !(!0 === u.animating && !0 === u.options.waitForAnimate || !0 === u.options.fade && u.currentSlide === e))
            if (!1 === t && u.asNavFor(e),
            n = e,
            l = u.getLeft(n),
            s = u.getLeft(u.currentSlide),
            u.currentLeft = null === u.swipeLeft ? s : u.swipeLeft,
            !1 === u.options.infinite && !1 === u.options.centerMode && (e < 0 || e > u.getDotCount() * u.options.slidesToScroll))
                !1 === u.options.fade && (n = u.currentSlide,
                !0 !== i ? u.animateSlide(s, function() {
                    u.postSlide(n)
                }) : u.postSlide(n));
            else if (!1 === u.options.infinite && !0 === u.options.centerMode && (e < 0 || e > u.slideCount - u.options.slidesToScroll))
                !1 === u.options.fade && (n = u.currentSlide,
                !0 !== i ? u.animateSlide(s, function() {
                    u.postSlide(n)
                }) : u.postSlide(n));
            else {
                if (u.options.autoplay && clearInterval(u.autoPlayTimer),
                r = n < 0 ? u.slideCount % u.options.slidesToScroll != 0 ? u.slideCount - u.slideCount % u.options.slidesToScroll : u.slideCount + n : n >= u.slideCount ? u.slideCount % u.options.slidesToScroll != 0 ? 0 : n - u.slideCount : n,
                u.animating = !0,
                u.$slider.trigger("beforeChange", [u, u.currentSlide, r]),
                o = u.currentSlide,
                u.currentSlide = r,
                u.setSlideClasses(u.currentSlide),
                u.options.asNavFor && (a = (a = u.getNavTarget()).slick("getSlick")).slideCount <= a.options.slidesToShow && a.setSlideClasses(u.currentSlide),
                u.updateDots(),
                u.updateArrows(),
                !0 === u.options.fade)
                    return !0 !== i ? (u.fadeSlideOut(o),
                    u.fadeSlide(r, function() {
                        u.postSlide(r)
                    })) : u.postSlide(r),
                    void u.animateHeight();
                !0 !== i ? u.animateSlide(l, function() {
                    u.postSlide(r)
                }) : u.postSlide(r)
            }
    }
    ,
    t.prototype.startLoad = function() {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(),
        e.$nextArrow.hide()),
        !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.hide(),
        e.$slider.addClass("slick-loading")
    }
    ,
    t.prototype.swipeDirection = function() {
        var e, t, i, n, r = this;
        return e = r.touchObject.startX - r.touchObject.curX,
        t = r.touchObject.startY - r.touchObject.curY,
        i = Math.atan2(t, e),
        (n = Math.round(180 * i / Math.PI)) < 0 && (n = 360 - Math.abs(n)),
        n <= 45 && n >= 0 ? !1 === r.options.rtl ? "left" : "right" : n <= 360 && n >= 315 ? !1 === r.options.rtl ? "left" : "right" : n >= 135 && n <= 225 ? !1 === r.options.rtl ? "right" : "left" : !0 === r.options.verticalSwiping ? n >= 35 && n <= 135 ? "down" : "up" : "vertical"
    }
    ,
    t.prototype.swipeEnd = function(e) {
        var t, i, n = this;
        if (n.dragging = !1,
        n.swiping = !1,
        n.scrolling)
            return n.scrolling = !1,
            !1;
        if (n.interrupted = !1,
        n.shouldClick = !(n.touchObject.swipeLength > 10),
        void 0 === n.touchObject.curX)
            return !1;
        if (!0 === n.touchObject.edgeHit && n.$slider.trigger("edge", [n, n.swipeDirection()]),
        n.touchObject.swipeLength >= n.touchObject.minSwipe) {
            switch (i = n.swipeDirection()) {
            case "left":
            case "down":
                t = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide + n.getSlideCount()) : n.currentSlide + n.getSlideCount(),
                n.currentDirection = 0;
                break;
            case "right":
            case "up":
                t = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide - n.getSlideCount()) : n.currentSlide - n.getSlideCount(),
                n.currentDirection = 1
            }
            "vertical" != i && (n.slideHandler(t),
            n.touchObject = {},
            n.$slider.trigger("swipe", [n, i]))
        } else
            n.touchObject.startX !== n.touchObject.curX && (n.slideHandler(n.currentSlide),
            n.touchObject = {})
    }
    ,
    t.prototype.swipeHandler = function(e) {
        var t = this;
        if (!(!1 === t.options.swipe || "ontouchend"in document && !1 === t.options.swipe || !1 === t.options.draggable && -1 !== e.type.indexOf("mouse")))
            switch (t.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1,
            t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold,
            !0 === t.options.verticalSwiping && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold),
            e.data.action) {
            case "start":
                t.swipeStart(e);
                break;
            case "move":
                t.swipeMove(e);
                break;
            case "end":
                t.swipeEnd(e)
            }
    }
    ,
    t.prototype.swipeMove = function(e) {
        var t, i, n, r, o, s, a = this;
        return o = void 0 !== e.originalEvent ? e.originalEvent.touches : null,
        !(!a.dragging || a.scrolling || o && 1 !== o.length) && (t = a.getLeft(a.currentSlide),
        a.touchObject.curX = void 0 !== o ? o[0].pageX : e.clientX,
        a.touchObject.curY = void 0 !== o ? o[0].pageY : e.clientY,
        a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curX - a.touchObject.startX, 2))),
        s = Math.round(Math.sqrt(Math.pow(a.touchObject.curY - a.touchObject.startY, 2))),
        !a.options.verticalSwiping && !a.swiping && s > 4 ? (a.scrolling = !0,
        !1) : (!0 === a.options.verticalSwiping && (a.touchObject.swipeLength = s),
        i = a.swipeDirection(),
        void 0 !== e.originalEvent && a.touchObject.swipeLength > 4 && (a.swiping = !0,
        e.preventDefault()),
        r = (!1 === a.options.rtl ? 1 : -1) * (a.touchObject.curX > a.touchObject.startX ? 1 : -1),
        !0 === a.options.verticalSwiping && (r = a.touchObject.curY > a.touchObject.startY ? 1 : -1),
        n = a.touchObject.swipeLength,
        a.touchObject.edgeHit = !1,
        !1 === a.options.infinite && (0 === a.currentSlide && "right" === i || a.currentSlide >= a.getDotCount() && "left" === i) && (n = a.touchObject.swipeLength * a.options.edgeFriction,
        a.touchObject.edgeHit = !0),
        !1 === a.options.vertical ? a.swipeLeft = t + n * r : a.swipeLeft = t + n * (a.$list.height() / a.listWidth) * r,
        !0 === a.options.verticalSwiping && (a.swipeLeft = t + n * r),
        !0 !== a.options.fade && !1 !== a.options.touchMove && (!0 === a.animating ? (a.swipeLeft = null,
        !1) : void a.setCSS(a.swipeLeft))))
    }
    ,
    t.prototype.swipeStart = function(e) {
        var t, i = this;
        if (i.interrupted = !0,
        1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow)
            return i.touchObject = {},
            !1;
        void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (t = e.originalEvent.touches[0]),
        i.touchObject.startX = i.touchObject.curX = void 0 !== t ? t.pageX : e.clientX,
        i.touchObject.startY = i.touchObject.curY = void 0 !== t ? t.pageY : e.clientY,
        i.dragging = !0
    }
    ,
    t.prototype.unfilterSlides = t.prototype.slickUnfilter = function() {
        var e = this;
        null !== e.$slidesCache && (e.unload(),
        e.$slideTrack.children(this.options.slide).detach(),
        e.$slidesCache.appendTo(e.$slideTrack),
        e.reinit())
    }
    ,
    t.prototype.unload = function() {
        var t = this;
        e(".slick-cloned", t.$slider).remove(),
        t.$dots && t.$dots.remove(),
        t.$prevArrow && t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove(),
        t.$nextArrow && t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove(),
        t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }
    ,
    t.prototype.unslick = function(e) {
        var t = this;
        t.$slider.trigger("unslick", [t, e]),
        t.destroy()
    }
    ,
    t.prototype.updateArrows = function() {
        var e = this;
        Math.floor(e.options.slidesToShow / 2),
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
        e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
        0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && !1 === e.options.centerMode ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && !0 === e.options.centerMode && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }
    ,
    t.prototype.updateDots = function() {
        var e = this;
        null !== e.$dots && (e.$dots.find("li").removeClass("slick-active").end(),
        e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active"))
    }
    ,
    t.prototype.visibility = function() {
        var e = this;
        e.options.autoplay && (document[e.hidden] ? e.interrupted = !0 : e.interrupted = !1)
    }
    ,
    e.fn.slick = function() {
        var e, i, n = this, r = arguments[0], o = Array.prototype.slice.call(arguments, 1), s = n.length;
        for (e = 0; e < s; e++)
            if ("object" == typeof r || void 0 === r ? n[e].slick = new t(n[e],r) : i = n[e].slick[r].apply(n[e].slick, o),
            void 0 !== i)
                return i;
        return n
    }
});
(function() {
    var e, t, i, n, r, o = function(e, t) {
        return function() {
            return e.apply(t, arguments)
        }
    }, s = [].indexOf || function(e) {
        for (var t = 0, i = this.length; i > t; t++)
            if (t in this && this[t] === e)
                return t;
        return -1
    }
    ;
    t = function() {
        function e() {}
        return e.prototype.extend = function(e, t) {
            var i, n;
            for (i in t)
                n = t[i],
                null == e[i] && (e[i] = n);
            return e
        }
        ,
        e.prototype.isMobile = function(e) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e)
        }
        ,
        e.prototype.createEvent = function(e, t, i, n) {
            var r;
            return null == t && (t = !1),
            null == i && (i = !1),
            null == n && (n = null),
            null != document.createEvent ? (r = document.createEvent("CustomEvent"),
            r.initCustomEvent(e, t, i, n)) : null != document.createEventObject ? (r = document.createEventObject(),
            r.eventType = e) : r.eventName = e,
            r
        }
        ,
        e.prototype.emitEvent = function(e, t) {
            return null != e.dispatchEvent ? e.dispatchEvent(t) : t in (null != e) ? e[t]() : "on" + t in (null != e) ? e["on" + t]() : void 0
        }
        ,
        e.prototype.addEvent = function(e, t, i) {
            return null != e.addEventListener ? e.addEventListener(t, i, !1) : null != e.attachEvent ? e.attachEvent("on" + t, i) : e[t] = i
        }
        ,
        e.prototype.removeEvent = function(e, t, i) {
            return null != e.removeEventListener ? e.removeEventListener(t, i, !1) : null != e.detachEvent ? e.detachEvent("on" + t, i) : delete e[t]
        }
        ,
        e.prototype.innerHeight = function() {
            return "innerHeight"in window ? window.innerHeight : document.documentElement.clientHeight
        }
        ,
        e
    }(),
    i = this.WeakMap || this.MozWeakMap || (i = function() {
        function e() {
            this.keys = [],
            this.values = []
        }
        return e.prototype.get = function(e) {
            var t, i, n, r, o;
            for (o = this.keys,
            t = n = 0,
            r = o.length; r > n; t = ++n)
                if (i = o[t],
                i === e)
                    return this.values[t]
        }
        ,
        e.prototype.set = function(e, t) {
            var i, n, r, o, s;
            for (s = this.keys,
            i = r = 0,
            o = s.length; o > r; i = ++r)
                if (n = s[i],
                n === e)
                    return void (this.values[i] = t);
            return this.keys.push(e),
            this.values.push(t)
        }
        ,
        e
    }()),
    e = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (e = function() {
        function e() {
            "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."),
            "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
        }
        return e.notSupported = !0,
        e.prototype.observe = function() {}
        ,
        e
    }()),
    n = this.getComputedStyle || function(e, t) {
        return this.getPropertyValue = function(t) {
            var i;
            return "float" === t && (t = "styleFloat"),
            r.test(t) && t.replace(r, function(e, t) {
                return t.toUpperCase()
            }),
            (null != (i = e.currentStyle) ? i[t] : void 0) || null
        }
        ,
        this
    }
    ,
    r = /(\-([a-z]){1})/g,
    this.WOW = function() {
        function r(e) {
            null == e && (e = {}),
            this.scrollCallback = o(this.scrollCallback, this),
            this.scrollHandler = o(this.scrollHandler, this),
            this.resetAnimation = o(this.resetAnimation, this),
            this.start = o(this.start, this),
            this.scrolled = !0,
            this.config = this.util().extend(e, this.defaults),
            null != e.scrollContainer && (this.config.scrollContainer = document.querySelector(e.scrollContainer)),
            this.animationNameCache = new i,
            this.wowEvent = this.util().createEvent(this.config.boxClass)
        }
        return r.prototype.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0,
            live: !0,
            callback: null,
            scrollContainer: null
        },
        r.prototype.init = function() {
            var e;
            return this.element = window.document.documentElement,
            "interactive" === (e = document.readyState) || "complete" === e ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start),
            this.finished = []
        }
        ,
        r.prototype.start = function() {
            var t, i, n, r;
            if (this.stopped = !1,
            this.boxes = function() {
                var e, i, n, r;
                for (n = this.element.querySelectorAll("." + this.config.boxClass),
                r = [],
                e = 0,
                i = n.length; i > e; e++)
                    t = n[e],
                    r.push(t);
                return r
            }
            .call(this),
            this.all = function() {
                var e, i, n, r;
                for (n = this.boxes,
                r = [],
                e = 0,
                i = n.length; i > e; e++)
                    t = n[e],
                    r.push(t);
                return r
            }
            .call(this),
            this.boxes.length)
                if (this.disabled())
                    this.resetStyle();
                else
                    for (r = this.boxes,
                    i = 0,
                    n = r.length; n > i; i++)
                        t = r[i],
                        this.applyStyle(t, !0);
            return this.disabled() || (this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler),
            this.util().addEvent(window, "resize", this.scrollHandler),
            this.interval = setInterval(this.scrollCallback, 50)),
            this.config.live ? new e(function(e) {
                return function(t) {
                    var i, n, r, o, s;
                    for (s = [],
                    i = 0,
                    n = t.length; n > i; i++)
                        o = t[i],
                        s.push(function() {
                            var e, t, i, n;
                            for (i = o.addedNodes || [],
                            n = [],
                            e = 0,
                            t = i.length; t > e; e++)
                                r = i[e],
                                n.push(this.doSync(r));
                            return n
                        }
                        .call(e));
                    return s
                }
            }(this)).observe(document.body, {
                childList: !0,
                subtree: !0
            }) : void 0
        }
        ,
        r.prototype.stop = function() {
            return this.stopped = !0,
            this.util().removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler),
            this.util().removeEvent(window, "resize", this.scrollHandler),
            null != this.interval ? clearInterval(this.interval) : void 0
        }
        ,
        r.prototype.sync = function(t) {
            return e.notSupported ? this.doSync(this.element) : void 0
        }
        ,
        r.prototype.doSync = function(e) {
            var t, i, n, r, o;
            if (null == e && (e = this.element),
            1 === e.nodeType) {
                for (e = e.parentNode || e,
                r = e.querySelectorAll("." + this.config.boxClass),
                o = [],
                i = 0,
                n = r.length; n > i; i++)
                    t = r[i],
                    s.call(this.all, t) < 0 ? (this.boxes.push(t),
                    this.all.push(t),
                    this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(t, !0),
                    o.push(this.scrolled = !0)) : o.push(void 0);
                return o
            }
        }
        ,
        r.prototype.show = function(e) {
            return this.applyStyle(e),
            e.className = e.className + " " + this.config.animateClass,
            null != this.config.callback && this.config.callback(e),
            this.util().emitEvent(e, this.wowEvent),
            this.util().addEvent(e, "animationend", this.resetAnimation),
            this.util().addEvent(e, "oanimationend", this.resetAnimation),
            this.util().addEvent(e, "webkitAnimationEnd", this.resetAnimation),
            this.util().addEvent(e, "MSAnimationEnd", this.resetAnimation),
            e
        }
        ,
        r.prototype.applyStyle = function(e, t) {
            var i, n, r;
            return n = e.getAttribute("data-wow-duration"),
            i = e.getAttribute("data-wow-delay"),
            r = e.getAttribute("data-wow-iteration"),
            this.animate(function(o) {
                return function() {
                    return o.customStyle(e, t, n, i, r)
                }
            }(this))
        }
        ,
        r.prototype.animate = function() {
            return "requestAnimationFrame"in window ? function(e) {
                return window.requestAnimationFrame(e)
            }
            : function(e) {
                return e()
            }
        }(),
        r.prototype.resetStyle = function() {
            var e, t, i, n, r;
            for (n = this.boxes,
            r = [],
            t = 0,
            i = n.length; i > t; t++)
                e = n[t],
                r.push(e.style.visibility = "visible");
            return r
        }
        ,
        r.prototype.resetAnimation = function(e) {
            var t;
            return e.type.toLowerCase().indexOf("animationend") >= 0 ? (t = e.target || e.srcElement,
            t.className = t.className.replace(this.config.animateClass, "").trim()) : void 0
        }
        ,
        r.prototype.customStyle = function(e, t, i, n, r) {
            return t && this.cacheAnimationName(e),
            e.style.visibility = t ? "hidden" : "visible",
            i && this.vendorSet(e.style, {
                animationDuration: i
            }),
            n && this.vendorSet(e.style, {
                animationDelay: n
            }),
            r && this.vendorSet(e.style, {
                animationIterationCount: r
            }),
            this.vendorSet(e.style, {
                animationName: t ? "none" : this.cachedAnimationName(e)
            }),
            e
        }
        ,
        r.prototype.vendors = ["moz", "webkit"],
        r.prototype.vendorSet = function(e, t) {
            var i, n, r, o;
            n = [];
            for (i in t)
                r = t[i],
                e["" + i] = r,
                n.push(function() {
                    var t, n, s, a;
                    for (s = this.vendors,
                    a = [],
                    t = 0,
                    n = s.length; n > t; t++)
                        o = s[t],
                        a.push(e["" + o + i.charAt(0).toUpperCase() + i.substr(1)] = r);
                    return a
                }
                .call(this));
            return n
        }
        ,
        r.prototype.vendorCSS = function(e, t) {
            var i, r, o, s, a, l;
            for (a = n(e),
            s = a.getPropertyCSSValue(t),
            o = this.vendors,
            i = 0,
            r = o.length; r > i; i++)
                l = o[i],
                s = s || a.getPropertyCSSValue("-" + l + "-" + t);
            return s
        }
        ,
        r.prototype.animationName = function(e) {
            var t;
            try {
                t = this.vendorCSS(e, "animation-name").cssText
            } catch (i) {
                t = n(e).getPropertyValue("animation-name")
            }
            return "none" === t ? "" : t
        }
        ,
        r.prototype.cacheAnimationName = function(e) {
            return this.animationNameCache.set(e, this.animationName(e))
        }
        ,
        r.prototype.cachedAnimationName = function(e) {
            return this.animationNameCache.get(e)
        }
        ,
        r.prototype.scrollHandler = function() {
            return this.scrolled = !0
        }
        ,
        r.prototype.scrollCallback = function() {
            var e;
            return !this.scrolled || (this.scrolled = !1,
            this.boxes = function() {
                var t, i, n, r;
                for (n = this.boxes,
                r = [],
                t = 0,
                i = n.length; i > t; t++)
                    e = n[t],
                    e && (this.isVisible(e) ? this.show(e) : r.push(e));
                return r
            }
            .call(this),
            this.boxes.length || this.config.live) ? void 0 : this.stop()
        }
        ,
        r.prototype.offsetTop = function(e) {
            for (var t; void 0 === e.offsetTop; )
                e = e.parentNode;
            for (t = e.offsetTop; e = e.offsetParent; )
                t += e.offsetTop;
            return t
        }
        ,
        r.prototype.isVisible = function(e) {
            var t, i, n, r, o;
            return i = e.getAttribute("data-wow-offset") || this.config.offset,
            o = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset,
            r = o + Math.min(this.element.clientHeight, this.util().innerHeight()) - i,
            n = this.offsetTop(e),
            t = n + e.clientHeight,
            r >= n && t >= o
        }
        ,
        r.prototype.util = function() {
            return null != this._util ? this._util : this._util = new t
        }
        ,
        r.prototype.disabled = function() {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent)
        }
        ,
        r
    }()
}
).call(this);
!function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function(e) {
    var t, i, n, r, o, s, a = "Close", l = "BeforeClose", u = "AfterClose", c = "BeforeAppend", d = "MarkupParse", f = "Open", p = "Change", h = "mfp", g = "." + h, m = "mfp-ready", v = "mfp-removing", y = "mfp-prevent-close", b = function() {}, w = !!window.jQuery, x = e(window), T = function(e, i) {
        t.ev.on(h + e + g, i)
    }, C = function(t, i, n, r) {
        var o = document.createElement("div");
        return o.className = "mfp-" + t,
        n && (o.innerHTML = n),
        r ? i && i.appendChild(o) : (o = e(o),
        i && o.appendTo(i)),
        o
    }, S = function(i, n) {
        t.ev.triggerHandler(h + i, n),
        t.st.callbacks && (i = i.charAt(0).toLowerCase() + i.slice(1),
        t.st.callbacks[i] && t.st.callbacks[i].apply(t, e.isArray(n) ? n : [n]))
    }, k = function(i) {
        return i === s && t.currTemplate.closeBtn || (t.currTemplate.closeBtn = e(t.st.closeMarkup.replace("%title%", t.st.tClose)),
        s = i),
        t.currTemplate.closeBtn
    }, $ = function() {
        e.magnificPopup.instance || (t = new b,
        t.init(),
        e.magnificPopup.instance = t)
    }, A = function() {
        var e = document.createElement("p").style
          , t = ["ms", "O", "Moz", "Webkit"];
        if (void 0 !== e.transition)
            return !0;
        for (; t.length; )
            if (t.pop() + "Transition"in e)
                return !0;
        return !1
    };
    b.prototype = {
        constructor: b,
        init: function() {
            var i = navigator.appVersion;
            t.isLowIE = t.isIE8 = document.all && !document.addEventListener,
            t.isAndroid = /android/gi.test(i),
            t.isIOS = /iphone|ipad|ipod/gi.test(i),
            t.supportsTransition = A(),
            t.probablyMobile = t.isAndroid || t.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),
            n = e(document),
            t.popupsCache = {}
        },
        open: function(i) {
            var r;
            if (i.isObj === !1) {
                t.items = i.items.toArray(),
                t.index = 0;
                var s, a = i.items;
                for (r = 0; r < a.length; r++)
                    if (s = a[r],
                    s.parsed && (s = s.el[0]),
                    s === i.el[0]) {
                        t.index = r;
                        break
                    }
            } else
                t.items = e.isArray(i.items) ? i.items : [i.items],
                t.index = i.index || 0;
            if (t.isOpen)
                return void t.updateItemHTML();
            t.types = [],
            o = "",
            i.mainEl && i.mainEl.length ? t.ev = i.mainEl.eq(0) : t.ev = n,
            i.key ? (t.popupsCache[i.key] || (t.popupsCache[i.key] = {}),
            t.currTemplate = t.popupsCache[i.key]) : t.currTemplate = {},
            t.st = e.extend(!0, {}, e.magnificPopup.defaults, i),
            t.fixedContentPos = "auto" === t.st.fixedContentPos ? !t.probablyMobile : t.st.fixedContentPos,
            t.st.modal && (t.st.closeOnContentClick = !1,
            t.st.closeOnBgClick = !1,
            t.st.showCloseBtn = !1,
            t.st.enableEscapeKey = !1),
            t.bgOverlay || (t.bgOverlay = C("bg").on("click" + g, function() {
                t.close()
            }),
            t.wrap = C("wrap").attr("tabindex", -1).on("click" + g, function(e) {
                t._checkIfClose(e.target) && t.close()
            }),
            t.container = C("container", t.wrap)),
            t.contentContainer = C("content"),
            t.st.preloader && (t.preloader = C("preloader", t.container, t.st.tLoading));
            var l = e.magnificPopup.modules;
            for (r = 0; r < l.length; r++) {
                var u = l[r];
                u = u.charAt(0).toUpperCase() + u.slice(1),
                t["init" + u].call(t)
            }
            S("BeforeOpen"),
            t.st.showCloseBtn && (t.st.closeBtnInside ? (T(d, function(e, t, i, n) {
                i.close_replaceWith = k(n.type)
            }),
            o += " mfp-close-btn-in") : t.wrap.append(k())),
            t.st.alignTop && (o += " mfp-align-top"),
            t.fixedContentPos ? t.wrap.css({
                overflow: t.st.overflowY,
                overflowX: "hidden",
                overflowY: t.st.overflowY
            }) : t.wrap.css({
                top: x.scrollTop(),
                position: "absolute"
            }),
            (t.st.fixedBgPos === !1 || "auto" === t.st.fixedBgPos && !t.fixedContentPos) && t.bgOverlay.css({
                height: n.height(),
                position: "absolute"
            }),
            t.st.enableEscapeKey && n.on("keyup" + g, function(e) {
                27 === e.keyCode && t.close()
            }),
            x.on("resize" + g, function() {
                t.updateSize()
            }),
            t.st.closeOnContentClick || (o += " mfp-auto-cursor"),
            o && t.wrap.addClass(o);
            var c = t.wH = x.height()
              , p = {};
            if (t.fixedContentPos && t._hasScrollBar(c)) {
                var h = t._getScrollbarSize();
                h && (p.marginRight = h)
            }
            t.fixedContentPos && (t.isIE7 ? e("body, html").css("overflow", "hidden") : p.overflow = "hidden");
            var v = t.st.mainClass;
            return t.isIE7 && (v += " mfp-ie7"),
            v && t._addClassToMFP(v),
            t.updateItemHTML(),
            S("BuildControls"),
            e("html").css(p),
            t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || e(document.body)),
            t._lastFocusedEl = document.activeElement,
            setTimeout(function() {
                t.content ? (t._addClassToMFP(m),
                t._setFocus()) : t.bgOverlay.addClass(m),
                n.on("focusin" + g, t._onFocusIn)
            }, 16),
            t.isOpen = !0,
            t.updateSize(c),
            S(f),
            i
        },
        close: function() {
            t.isOpen && (S(l),
            t.isOpen = !1,
            t.st.removalDelay && !t.isLowIE && t.supportsTransition ? (t._addClassToMFP(v),
            setTimeout(function() {
                t._close()
            }, t.st.removalDelay)) : t._close())
        },
        _close: function() {
            S(a);
            var i = v + " " + m + " ";
            if (t.bgOverlay.detach(),
            t.wrap.detach(),
            t.container.empty(),
            t.st.mainClass && (i += t.st.mainClass + " "),
            t._removeClassFromMFP(i),
            t.fixedContentPos) {
                var r = {
                    marginRight: ""
                };
                t.isIE7 ? e("body, html").css("overflow", "") : r.overflow = "",
                e("html").css(r)
            }
            n.off("keyup" + g + " focusin" + g),
            t.ev.off(g),
            t.wrap.attr("class", "mfp-wrap").removeAttr("style"),
            t.bgOverlay.attr("class", "mfp-bg"),
            t.container.attr("class", "mfp-container"),
            !t.st.showCloseBtn || t.st.closeBtnInside && t.currTemplate[t.currItem.type] !== !0 || t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach(),
            t.st.autoFocusLast && t._lastFocusedEl && e(t._lastFocusedEl).focus(),
            t.currItem = null,
            t.content = null,
            t.currTemplate = null,
            t.prevHeight = 0,
            S(u)
        },
        updateSize: function(e) {
            if (t.isIOS) {
                var i = document.documentElement.clientWidth / window.innerWidth
                  , n = window.innerHeight * i;
                t.wrap.css("height", n),
                t.wH = n
            } else
                t.wH = e || x.height();
            t.fixedContentPos || t.wrap.css("height", t.wH),
            S("Resize")
        },
        updateItemHTML: function() {
            var i = t.items[t.index];
            t.contentContainer.detach(),
            t.content && t.content.detach(),
            i.parsed || (i = t.parseEl(t.index));
            var n = i.type;
            if (S("BeforeChange", [t.currItem ? t.currItem.type : "", n]),
            t.currItem = i,
            !t.currTemplate[n]) {
                var o = t.st[n] ? t.st[n].markup : !1;
                S("FirstMarkupParse", o),
                o ? t.currTemplate[n] = e(o) : t.currTemplate[n] = !0
            }
            r && r !== i.type && t.container.removeClass("mfp-" + r + "-holder");
            var s = t["get" + n.charAt(0).toUpperCase() + n.slice(1)](i, t.currTemplate[n]);
            t.appendContent(s, n),
            i.preloaded = !0,
            S(p, i),
            r = i.type,
            t.container.prepend(t.contentContainer),
            S("AfterChange")
        },
        appendContent: function(e, i) {
            t.content = e,
            e ? t.st.showCloseBtn && t.st.closeBtnInside && t.currTemplate[i] === !0 ? t.content.find(".mfp-close").length || t.content.append(k()) : t.content = e : t.content = "",
            S(c),
            t.container.addClass("mfp-" + i + "-holder"),
            t.contentContainer.append(t.content)
        },
        parseEl: function(i) {
            var n, r = t.items[i];
            if (r.tagName ? r = {
                el: e(r)
            } : (n = r.type,
            r = {
                data: r,
                src: r.src
            }),
            r.el) {
                for (var o = t.types, s = 0; s < o.length; s++)
                    if (r.el.hasClass("mfp-" + o[s])) {
                        n = o[s];
                        break
                    }
                r.src = r.el.attr("data-mfp-src"),
                r.src || (r.src = r.el.attr("href"))
            }
            return r.type = n || t.st.type || "inline",
            r.index = i,
            r.parsed = !0,
            t.items[i] = r,
            S("ElementParse", r),
            t.items[i]
        },
        addGroup: function(e, i) {
            var n = function(n) {
                n.mfpEl = this,
                t._openClick(n, e, i)
            };
            i || (i = {});
            var r = "click.magnificPopup";
            i.mainEl = e,
            i.items ? (i.isObj = !0,
            e.off(r).on(r, n)) : (i.isObj = !1,
            i.delegate ? e.off(r).on(r, i.delegate, n) : (i.items = e,
            e.off(r).on(r, n)))
        },
        _openClick: function(i, n, r) {
            var o = void 0 !== r.midClick ? r.midClick : e.magnificPopup.defaults.midClick;
            if (o || !(2 === i.which || i.ctrlKey || i.metaKey || i.altKey || i.shiftKey)) {
                var s = void 0 !== r.disableOn ? r.disableOn : e.magnificPopup.defaults.disableOn;
                if (s)
                    if (e.isFunction(s)) {
                        if (!s.call(t))
                            return !0
                    } else if (x.width() < s)
                        return !0;
                i.type && (i.preventDefault(),
                t.isOpen && i.stopPropagation()),
                r.el = e(i.mfpEl),
                r.delegate && (r.items = n.find(r.delegate)),
                t.open(r)
            }
        },
        updateStatus: function(e, n) {
            if (t.preloader) {
                i !== e && t.container.removeClass("mfp-s-" + i),
                n || "loading" !== e || (n = t.st.tLoading);
                var r = {
                    status: e,
                    text: n
                };
                S("UpdateStatus", r),
                e = r.status,
                n = r.text,
                t.preloader.html(n),
                t.preloader.find("a").on("click", function(e) {
                    e.stopImmediatePropagation()
                }),
                t.container.addClass("mfp-s-" + e),
                i = e
            }
        },
        _checkIfClose: function(i) {
            if (!e(i).hasClass(y)) {
                var n = t.st.closeOnContentClick
                  , r = t.st.closeOnBgClick;
                if (n && r)
                    return !0;
                if (!t.content || e(i).hasClass("mfp-close") || t.preloader && i === t.preloader[0])
                    return !0;
                if (i === t.content[0] || e.contains(t.content[0], i)) {
                    if (n)
                        return !0
                } else if (r && e.contains(document, i))
                    return !0;
                return !1
            }
        },
        _addClassToMFP: function(e) {
            t.bgOverlay.addClass(e),
            t.wrap.addClass(e)
        },
        _removeClassFromMFP: function(e) {
            this.bgOverlay.removeClass(e),
            t.wrap.removeClass(e)
        },
        _hasScrollBar: function(e) {
            return (t.isIE7 ? n.height() : document.body.scrollHeight) > (e || x.height())
        },
        _setFocus: function() {
            (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus()
        },
        _onFocusIn: function(i) {
            return i.target === t.wrap[0] || e.contains(t.wrap[0], i.target) ? void 0 : (t._setFocus(),
            !1)
        },
        _parseMarkup: function(t, i, n) {
            var r;
            n.data && (i = e.extend(n.data, i)),
            S(d, [t, i, n]),
            e.each(i, function(i, n) {
                if (void 0 === n || n === !1)
                    return !0;
                if (r = i.split("_"),
                r.length > 1) {
                    var o = t.find(g + "-" + r[0]);
                    if (o.length > 0) {
                        var s = r[1];
                        "replaceWith" === s ? o[0] !== n[0] && o.replaceWith(n) : "img" === s ? o.is("img") ? o.attr("src", n) : o.replaceWith(e("<img>").attr("src", n).attr("class", o.attr("class"))) : o.attr(r[1], n)
                    }
                } else
                    t.find(g + "-" + i).html(n)
            })
        },
        _getScrollbarSize: function() {
            if (void 0 === t.scrollbarSize) {
                var e = document.createElement("div");
                e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",
                document.body.appendChild(e),
                t.scrollbarSize = e.offsetWidth - e.clientWidth,
                document.body.removeChild(e)
            }
            return t.scrollbarSize
        }
    },
    e.magnificPopup = {
        instance: null,
        proto: b.prototype,
        modules: [],
        open: function(t, i) {
            return $(),
            t = t ? e.extend(!0, {}, t) : {},
            t.isObj = !0,
            t.index = i || 0,
            this.instance.open(t)
        },
        close: function() {
            return e.magnificPopup.instance && e.magnificPopup.instance.close()
        },
        registerModule: function(t, i) {
            i.options && (e.magnificPopup.defaults[t] = i.options),
            e.extend(this.proto, i.proto),
            this.modules.push(t)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    },
    e.fn.magnificPopup = function(i) {
        $();
        var n = e(this);
        if ("string" == typeof i)
            if ("open" === i) {
                var r, o = w ? n.data("magnificPopup") : n[0].magnificPopup, s = parseInt(arguments[1], 10) || 0;
                o.items ? r = o.items[s] : (r = n,
                o.delegate && (r = r.find(o.delegate)),
                r = r.eq(s)),
                t._openClick({
                    mfpEl: r
                }, n, o)
            } else
                t.isOpen && t[i].apply(t, Array.prototype.slice.call(arguments, 1));
        else
            i = e.extend(!0, {}, i),
            w ? n.data("magnificPopup", i) : n[0].magnificPopup = i,
            t.addGroup(n, i);
        return n
    }
    ;
    var E, _, D, O = "inline", I = function() {
        D && (_.after(D.addClass(E)).detach(),
        D = null)
    };
    e.magnificPopup.registerModule(O, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                t.types.push(O),
                T(a + "." + O, function() {
                    I()
                })
            },
            getInline: function(i, n) {
                if (I(),
                i.src) {
                    var r = t.st.inline
                      , o = e(i.src);
                    if (o.length) {
                        var s = o[0].parentNode;
                        s && s.tagName && (_ || (E = r.hiddenClass,
                        _ = C(E),
                        E = "mfp-" + E),
                        D = o.after(_).detach().removeClass(E)),
                        t.updateStatus("ready")
                    } else
                        t.updateStatus("error", r.tNotFound),
                        o = e("<div>");
                    return i.inlineElement = o,
                    o
                }
                return t.updateStatus("ready"),
                t._parseMarkup(n, {}, i),
                n
            }
        }
    });
    var L, N = "ajax", j = function() {
        L && e(document.body).removeClass(L)
    }, P = function() {
        j(),
        t.req && t.req.abort()
    };
    e.magnificPopup.registerModule(N, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                t.types.push(N),
                L = t.st.ajax.cursor,
                T(a + "." + N, P),
                T("BeforeChange." + N, P)
            },
            getAjax: function(i) {
                L && e(document.body).addClass(L),
                t.updateStatus("loading");
                var n = e.extend({
                    url: i.src,
                    success: function(n, r, o) {
                        var s = {
                            data: n,
                            xhr: o
                        };
                        S("ParseAjax", s),
                        t.appendContent(e(s.data), N),
                        i.finished = !0,
                        j(),
                        t._setFocus(),
                        setTimeout(function() {
                            t.wrap.addClass(m)
                        }, 16),
                        t.updateStatus("ready"),
                        S("AjaxContentAdded")
                    },
                    error: function() {
                        j(),
                        i.finished = i.loadError = !0,
                        t.updateStatus("error", t.st.ajax.tError.replace("%url%", i.src))
                    }
                }, t.st.ajax.settings);
                return t.req = e.ajax(n),
                ""
            }
        }
    });
    var q, H = function(i) {
        if (i.data && void 0 !== i.data.title)
            return i.data.title;
        var n = t.st.image.titleSrc;
        if (n) {
            if (e.isFunction(n))
                return n.call(t, i);
            if (i.el)
                return i.el.attr(n) || ""
        }
        return ""
    };
    e.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var i = t.st.image
                  , n = ".image";
                t.types.push("image"),
                T(f + n, function() {
                    "image" === t.currItem.type && i.cursor && e(document.body).addClass(i.cursor)
                }),
                T(a + n, function() {
                    i.cursor && e(document.body).removeClass(i.cursor),
                    x.off("resize" + g)
                }),
                T("Resize" + n, t.resizeImage),
                t.isLowIE && T("AfterChange", t.resizeImage)
            },
            resizeImage: function() {
                var e = t.currItem;
                if (e && e.img && t.st.image.verticalFit) {
                    var i = 0;
                    t.isLowIE && (i = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)),
                    e.img.css("max-height", t.wH - i)
                }
            },
            _onImageHasSize: function(e) {
                e.img && (e.hasSize = !0,
                q && clearInterval(q),
                e.isCheckingImgSize = !1,
                S("ImageHasSize", e),
                e.imgHidden && (t.content && t.content.removeClass("mfp-loading"),
                e.imgHidden = !1))
            },
            findImageSize: function(e) {
                var i = 0
                  , n = e.img[0]
                  , r = function(o) {
                    q && clearInterval(q),
                    q = setInterval(function() {
                        return n.naturalWidth > 0 ? void t._onImageHasSize(e) : (i > 200 && clearInterval(q),
                        i++,
                        void (3 === i ? r(10) : 40 === i ? r(50) : 100 === i && r(500)))
                    }, o)
                };
                r(1)
            },
            getImage: function(i, n) {
                var r = 0
                  , o = function() {
                    i && (i.img[0].complete ? (i.img.off(".mfploader"),
                    i === t.currItem && (t._onImageHasSize(i),
                    t.updateStatus("ready")),
                    i.hasSize = !0,
                    i.loaded = !0,
                    S("ImageLoadComplete")) : (r++,
                    200 > r ? setTimeout(o, 100) : s()))
                }
                  , s = function() {
                    i && (i.img.off(".mfploader"),
                    i === t.currItem && (t._onImageHasSize(i),
                    t.updateStatus("error", a.tError.replace("%url%", i.src))),
                    i.hasSize = !0,
                    i.loaded = !0,
                    i.loadError = !0)
                }
                  , a = t.st.image
                  , l = n.find(".mfp-img");
                if (l.length) {
                    var u = document.createElement("img");
                    u.className = "mfp-img",
                    i.el && i.el.find("img").length && (u.alt = i.el.find("img").attr("alt")),
                    i.img = e(u).on("load.mfploader", o).on("error.mfploader", s),
                    u.src = i.src,
                    l.is("img") && (i.img = i.img.clone()),
                    u = i.img[0],
                    u.naturalWidth > 0 ? i.hasSize = !0 : u.width || (i.hasSize = !1)
                }
                return t._parseMarkup(n, {
                    title: H(i),
                    img_replaceWith: i.img
                }, i),
                t.resizeImage(),
                i.hasSize ? (q && clearInterval(q),
                i.loadError ? (n.addClass("mfp-loading"),
                t.updateStatus("error", a.tError.replace("%url%", i.src))) : (n.removeClass("mfp-loading"),
                t.updateStatus("ready")),
                n) : (t.updateStatus("loading"),
                i.loading = !0,
                i.hasSize || (i.imgHidden = !0,
                n.addClass("mfp-loading"),
                t.findImageSize(i)),
                n)
            }
        }
    });
    var M, R = function() {
        return void 0 === M && (M = void 0 !== document.createElement("p").style.MozTransform),
        M
    };
    e.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(e) {
                return e.is("img") ? e : e.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var e, i = t.st.zoom, n = ".zoom";
                if (i.enabled && t.supportsTransition) {
                    var r, o, s = i.duration, u = function(e) {
                        var t = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image")
                          , n = "all " + i.duration / 1e3 + "s " + i.easing
                          , r = {
                            position: "fixed",
                            zIndex: 9999,
                            left: 0,
                            top: 0,
                            "-webkit-backface-visibility": "hidden"
                        }
                          , o = "transition";
                        return r["-webkit-" + o] = r["-moz-" + o] = r["-o-" + o] = r[o] = n,
                        t.css(r),
                        t
                    }, c = function() {
                        t.content.css("visibility", "visible")
                    };
                    T("BuildControls" + n, function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(r),
                            t.content.css("visibility", "hidden"),
                            e = t._getItemToZoom(),
                            !e)
                                return void c();
                            o = u(e),
                            o.css(t._getOffset()),
                            t.wrap.append(o),
                            r = setTimeout(function() {
                                o.css(t._getOffset(!0)),
                                r = setTimeout(function() {
                                    c(),
                                    setTimeout(function() {
                                        o.remove(),
                                        e = o = null,
                                        S("ZoomAnimationEnded")
                                    }, 16)
                                }, s)
                            }, 16)
                        }
                    }),
                    T(l + n, function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(r),
                            t.st.removalDelay = s,
                            !e) {
                                if (e = t._getItemToZoom(),
                                !e)
                                    return;
                                o = u(e)
                            }
                            o.css(t._getOffset(!0)),
                            t.wrap.append(o),
                            t.content.css("visibility", "hidden"),
                            setTimeout(function() {
                                o.css(t._getOffset())
                            }, 16)
                        }
                    }),
                    T(a + n, function() {
                        t._allowZoom() && (c(),
                        o && o.remove(),
                        e = null)
                    })
                }
            },
            _allowZoom: function() {
                return "image" === t.currItem.type
            },
            _getItemToZoom: function() {
                return t.currItem.hasSize ? t.currItem.img : !1
            },
            _getOffset: function(i) {
                var n;
                n = i ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem);
                var r = n.offset()
                  , o = parseInt(n.css("padding-top"), 10)
                  , s = parseInt(n.css("padding-bottom"), 10);
                r.top -= e(window).scrollTop() - o;
                var a = {
                    width: n.width(),
                    height: (w ? n.innerHeight() : n[0].offsetHeight) - s - o
                };
                return R() ? a["-moz-transform"] = a.transform = "translate(" + r.left + "px," + r.top + "px)" : (a.left = r.left,
                a.top = r.top),
                a
            }
        }
    });
    var z = "iframe"
      , F = "//about:blank"
      , W = function(e) {
        if (t.currTemplate[z]) {
            var i = t.currTemplate[z].find("iframe");
            i.length && (e || (i[0].src = F),
            t.isIE8 && i.css("display", e ? "block" : "none"))
        }
    };
    e.magnificPopup.registerModule(z, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                t.types.push(z),
                T("BeforeChange", function(e, t, i) {
                    t !== i && (t === z ? W() : i === z && W(!0))
                }),
                T(a + "." + z, function() {
                    W()
                })
            },
            getIframe: function(i, n) {
                var r = i.src
                  , o = t.st.iframe;
                e.each(o.patterns, function() {
                    return r.indexOf(this.index) > -1 ? (this.id && (r = "string" == typeof this.id ? r.substr(r.lastIndexOf(this.id) + this.id.length, r.length) : this.id.call(this, r)),
                    r = this.src.replace("%id%", r),
                    !1) : void 0
                });
                var s = {};
                return o.srcAction && (s[o.srcAction] = r),
                t._parseMarkup(n, s, i),
                t.updateStatus("ready"),
                n
            }
        }
    });
    var B = function(e) {
        var i = t.items.length;
        return e > i - 1 ? e - i : 0 > e ? i + e : e
    }
      , U = function(e, t, i) {
        return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, i)
    };
    e.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var i = t.st.gallery
                  , r = ".mfp-gallery";
                return t.direction = !0,
                i && i.enabled ? (o += " mfp-gallery",
                T(f + r, function() {
                    i.navigateByImgClick && t.wrap.on("click" + r, ".mfp-img", function() {
                        return t.items.length > 1 ? (t.next(),
                        !1) : void 0
                    }),
                    n.on("keydown" + r, function(e) {
                        37 === e.keyCode ? t.prev() : 39 === e.keyCode && t.next()
                    })
                }),
                T("UpdateStatus" + r, function(e, i) {
                    i.text && (i.text = U(i.text, t.currItem.index, t.items.length))
                }),
                T(d + r, function(e, n, r, o) {
                    var s = t.items.length;
                    r.counter = s > 1 ? U(i.tCounter, o.index, s) : ""
                }),
                T("BuildControls" + r, function() {
                    if (t.items.length > 1 && i.arrows && !t.arrowLeft) {
                        var n = i.arrowMarkup
                          , r = t.arrowLeft = e(n.replace(/%title%/gi, i.tPrev).replace(/%dir%/gi, "left")).addClass(y)
                          , o = t.arrowRight = e(n.replace(/%title%/gi, i.tNext).replace(/%dir%/gi, "right")).addClass(y);
                        r.click(function() {
                            t.prev()
                        }),
                        o.click(function() {
                            t.next()
                        }),
                        t.container.append(r.add(o))
                    }
                }),
                T(p + r, function() {
                    t._preloadTimeout && clearTimeout(t._preloadTimeout),
                    t._preloadTimeout = setTimeout(function() {
                        t.preloadNearbyImages(),
                        t._preloadTimeout = null
                    }, 16)
                }),
                void T(a + r, function() {
                    n.off(r),
                    t.wrap.off("click" + r),
                    t.arrowRight = t.arrowLeft = null
                })) : !1
            },
            next: function() {
                t.direction = !0,
                t.index = B(t.index + 1),
                t.updateItemHTML()
            },
            prev: function() {
                t.direction = !1,
                t.index = B(t.index - 1),
                t.updateItemHTML()
            },
            goTo: function(e) {
                t.direction = e >= t.index,
                t.index = e,
                t.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var e, i = t.st.gallery.preload, n = Math.min(i[0], t.items.length), r = Math.min(i[1], t.items.length);
                for (e = 1; e <= (t.direction ? r : n); e++)
                    t._preloadItem(t.index + e);
                for (e = 1; e <= (t.direction ? n : r); e++)
                    t._preloadItem(t.index - e)
            },
            _preloadItem: function(i) {
                if (i = B(i),
                !t.items[i].preloaded) {
                    var n = t.items[i];
                    n.parsed || (n = t.parseEl(i)),
                    S("LazyLoad", n),
                    "image" === n.type && (n.img = e('<img class="mfp-img" />').on("load.mfploader", function() {
                        n.hasSize = !0
                    }).on("error.mfploader", function() {
                        n.hasSize = !0,
                        n.loadError = !0,
                        S("LazyLoadError", n)
                    }).attr("src", n.src)),
                    n.preloaded = !0
                }
            }
        }
    });
    var G = "retina";
    e.magnificPopup.registerModule(G, {
        options: {
            replaceSrc: function(e) {
                return e.src.replace(/\.\w+$/, function(e) {
                    return "@2x" + e
                })
            },
            ratio: 1
        },
        proto: {
            initRetina: function() {
                if (window.devicePixelRatio > 1) {
                    var e = t.st.retina
                      , i = e.ratio;
                    i = isNaN(i) ? i() : i,
                    i > 1 && (T("ImageHasSize." + G, function(e, t) {
                        t.img.css({
                            "max-width": t.img[0].naturalWidth / i,
                            width: "100%"
                        })
                    }),
                    T("ElementParse." + G, function(t, n) {
                        n.src = e.replaceSrc(n, i)
                    }))
                }
            }
        }
    }),
    $()
});
(function(e) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], e)
    } else if (typeof module === "object" && module.exports) {
        module.exports = function(t, i) {
            if (i === undefined) {
                if (typeof window !== "undefined") {
                    i = require("jquery")
                } else {
                    i = require("jquery")(t)
                }
            }
            e(i);
            return i
        }
    } else {
        e(jQuery)
    }
}
)(function(e) {
    var t = function() {
        if (e && e.fn && e.fn.select2 && e.fn.select2.amd) {
            var t = e.fn.select2.amd
        }
        var t;
        (function() {
            if (!t || !t.requirejs) {
                if (!t) {
                    t = {}
                } else {
                    i = t
                }
                var e, i, n;
                (function(t) {
                    var r, o, s, a, l = {}, u = {}, c = {}, d = {}, f = Object.prototype.hasOwnProperty, p = [].slice, h = /\.js$/;
                    function g(e, t) {
                        return f.call(e, t)
                    }
                    function m(e, t) {
                        var i, n, r, o, s, a, l, u, d, f, p, g, m = t && t.split("/"), v = c.map, y = v && v["*"] || {};
                        if (e) {
                            e = e.split("/");
                            s = e.length - 1;
                            if (c.nodeIdCompat && h.test(e[s])) {
                                e[s] = e[s].replace(h, "")
                            }
                            if (e[0].charAt(0) === "." && m) {
                                g = m.slice(0, m.length - 1);
                                e = g.concat(e)
                            }
                            for (d = 0; d < e.length; d++) {
                                p = e[d];
                                if (p === ".") {
                                    e.splice(d, 1);
                                    d -= 1
                                } else if (p === "..") {
                                    if (d === 0 || d === 1 && e[2] === ".." || e[d - 1] === "..") {
                                        continue
                                    } else if (d > 0) {
                                        e.splice(d - 1, 2);
                                        d -= 2
                                    }
                                }
                            }
                            e = e.join("/")
                        }
                        if ((m || y) && v) {
                            i = e.split("/");
                            for (d = i.length; d > 0; d -= 1) {
                                n = i.slice(0, d).join("/");
                                if (m) {
                                    for (f = m.length; f > 0; f -= 1) {
                                        r = v[m.slice(0, f).join("/")];
                                        if (r) {
                                            r = r[n];
                                            if (r) {
                                                o = r;
                                                a = d;
                                                break
                                            }
                                        }
                                    }
                                }
                                if (o) {
                                    break
                                }
                                if (!l && y && y[n]) {
                                    l = y[n];
                                    u = d
                                }
                            }
                            if (!o && l) {
                                o = l;
                                a = u
                            }
                            if (o) {
                                i.splice(0, a, o);
                                e = i.join("/")
                            }
                        }
                        return e
                    }
                    function v(e, i) {
                        return function() {
                            var n = p.call(arguments, 0);
                            if (typeof n[0] !== "string" && n.length === 1) {
                                n.push(null)
                            }
                            return o.apply(t, n.concat([e, i]))
                        }
                    }
                    function y(e) {
                        return function(t) {
                            return m(t, e)
                        }
                    }
                    function b(e) {
                        return function(t) {
                            l[e] = t
                        }
                    }
                    function w(e) {
                        if (g(u, e)) {
                            var i = u[e];
                            delete u[e];
                            d[e] = true;
                            r.apply(t, i)
                        }
                        if (!g(l, e) && !g(d, e)) {
                            throw new Error("No " + e)
                        }
                        return l[e]
                    }
                    function x(e) {
                        var t, i = e ? e.indexOf("!") : -1;
                        if (i > -1) {
                            t = e.substring(0, i);
                            e = e.substring(i + 1, e.length)
                        }
                        return [t, e]
                    }
                    function T(e) {
                        return e ? x(e) : []
                    }
                    s = function(e, t) {
                        var i, n = x(e), r = n[0], o = t[1];
                        e = n[1];
                        if (r) {
                            r = m(r, o);
                            i = w(r)
                        }
                        if (r) {
                            if (i && i.normalize) {
                                e = i.normalize(e, y(o))
                            } else {
                                e = m(e, o)
                            }
                        } else {
                            e = m(e, o);
                            n = x(e);
                            r = n[0];
                            e = n[1];
                            if (r) {
                                i = w(r)
                            }
                        }
                        return {
                            f: r ? r + "!" + e : e,
                            n: e,
                            pr: r,
                            p: i
                        }
                    }
                    ;
                    function C(e) {
                        return function() {
                            return c && c.config && c.config[e] || {}
                        }
                    }
                    a = {
                        require: function(e) {
                            return v(e)
                        },
                        exports: function(e) {
                            var t = l[e];
                            if (typeof t !== "undefined") {
                                return t
                            } else {
                                return l[e] = {}
                            }
                        },
                        module: function(e) {
                            return {
                                id: e,
                                uri: "",
                                exports: l[e],
                                config: C(e)
                            }
                        }
                    };
                    r = function(e, i, n, r) {
                        var o, c, f, p, h, m, y = [], x = typeof n, C;
                        r = r || e;
                        m = T(r);
                        if (x === "undefined" || x === "function") {
                            i = !i.length && n.length ? ["require", "exports", "module"] : i;
                            for (h = 0; h < i.length; h += 1) {
                                p = s(i[h], m);
                                c = p.f;
                                if (c === "require") {
                                    y[h] = a.require(e)
                                } else if (c === "exports") {
                                    y[h] = a.exports(e);
                                    C = true
                                } else if (c === "module") {
                                    o = y[h] = a.module(e)
                                } else if (g(l, c) || g(u, c) || g(d, c)) {
                                    y[h] = w(c)
                                } else if (p.p) {
                                    p.p.load(p.n, v(r, true), b(c), {});
                                    y[h] = l[c]
                                } else {
                                    throw new Error(e + " missing " + c)
                                }
                            }
                            f = n ? n.apply(l[e], y) : undefined;
                            if (e) {
                                if (o && o.exports !== t && o.exports !== l[e]) {
                                    l[e] = o.exports
                                } else if (f !== t || !C) {
                                    l[e] = f
                                }
                            }
                        } else if (e) {
                            l[e] = n
                        }
                    }
                    ;
                    e = i = o = function(e, i, n, l, u) {
                        if (typeof e === "string") {
                            if (a[e]) {
                                return a[e](i)
                            }
                            return w(s(e, T(i)).f)
                        } else if (!e.splice) {
                            c = e;
                            if (c.deps) {
                                o(c.deps, c.callback)
                            }
                            if (!i) {
                                return
                            }
                            if (i.splice) {
                                e = i;
                                i = n;
                                n = null
                            } else {
                                e = t
                            }
                        }
                        i = i || function() {}
                        ;
                        if (typeof n === "function") {
                            n = l;
                            l = u
                        }
                        if (l) {
                            r(t, e, i, n)
                        } else {
                            setTimeout(function() {
                                r(t, e, i, n)
                            }, 4)
                        }
                        return o
                    }
                    ;
                    o.config = function(e) {
                        return o(e)
                    }
                    ;
                    e._defined = l;
                    n = function(e, t, i) {
                        if (typeof e !== "string") {
                            throw new Error("See almond README: incorrect module build, no module name")
                        }
                        if (!t.splice) {
                            i = t;
                            t = []
                        }
                        if (!g(l, e) && !g(u, e)) {
                            u[e] = [e, t, i]
                        }
                    }
                    ;
                    n.amd = {
                        jQuery: true
                    }
                }
                )();
                t.requirejs = e;
                t.require = i;
                t.define = n
            }
        }
        )();
        t.define("almond", function() {});
        t.define("jquery", [], function() {
            var t = e || $;
            if (t == null && console && console.error) {
                console.error("Select2: An instance of jQuery or a jQuery-compatible library was not " + "found. Make sure that you are including jQuery before Select2 on your " + "web page.")
            }
            return t
        });
        t.define("select2/utils", ["jquery"], function(e) {
            var t = {};
            t.Extend = function(e, t) {
                var i = {}.hasOwnProperty;
                function n() {
                    this.constructor = e
                }
                for (var r in t) {
                    if (i.call(t, r)) {
                        e[r] = t[r]
                    }
                }
                n.prototype = t.prototype;
                e.prototype = new n;
                e.__super__ = t.prototype;
                return e
            }
            ;
            function i(e) {
                var t = e.prototype;
                var i = [];
                for (var n in t) {
                    var r = t[n];
                    if (typeof r !== "function") {
                        continue
                    }
                    if (n === "constructor") {
                        continue
                    }
                    i.push(n)
                }
                return i
            }
            t.Decorate = function(e, t) {
                var n = i(t);
                var r = i(e);
                function o() {
                    var i = Array.prototype.unshift;
                    var n = t.prototype.constructor.length;
                    var r = e.prototype.constructor;
                    if (n > 0) {
                        i.call(arguments, e.prototype.constructor);
                        r = t.prototype.constructor
                    }
                    r.apply(this, arguments)
                }
                t.displayName = e.displayName;
                function s() {
                    this.constructor = o
                }
                o.prototype = new s;
                for (var a = 0; a < r.length; a++) {
                    var l = r[a];
                    o.prototype[l] = e.prototype[l]
                }
                var u = function(e) {
                    var i = function() {};
                    if (e in o.prototype) {
                        i = o.prototype[e]
                    }
                    var n = t.prototype[e];
                    return function() {
                        var e = Array.prototype.unshift;
                        e.call(arguments, i);
                        return n.apply(this, arguments)
                    }
                };
                for (var c = 0; c < n.length; c++) {
                    var d = n[c];
                    o.prototype[d] = u(d)
                }
                return o
            }
            ;
            var n = function() {
                this.listeners = {}
            };
            n.prototype.on = function(e, t) {
                this.listeners = this.listeners || {};
                if (e in this.listeners) {
                    this.listeners[e].push(t)
                } else {
                    this.listeners[e] = [t]
                }
            }
            ;
            n.prototype.trigger = function(e) {
                var t = Array.prototype.slice;
                var i = t.call(arguments, 1);
                this.listeners = this.listeners || {};
                if (i == null) {
                    i = []
                }
                if (i.length === 0) {
                    i.push({})
                }
                i[0]._type = e;
                if (e in this.listeners) {
                    this.invoke(this.listeners[e], t.call(arguments, 1))
                }
                if ("*"in this.listeners) {
                    this.invoke(this.listeners["*"], arguments)
                }
            }
            ;
            n.prototype.invoke = function(e, t) {
                for (var i = 0, n = e.length; i < n; i++) {
                    e[i].apply(this, t)
                }
            }
            ;
            t.Observable = n;
            t.generateChars = function(e) {
                var t = "";
                for (var i = 0; i < e; i++) {
                    var n = Math.floor(Math.random() * 36);
                    t += n.toString(36)
                }
                return t
            }
            ;
            t.bind = function(e, t) {
                return function() {
                    e.apply(t, arguments)
                }
            }
            ;
            t._convertData = function(e) {
                for (var t in e) {
                    var i = t.split("-");
                    var n = e;
                    if (i.length === 1) {
                        continue
                    }
                    for (var r = 0; r < i.length; r++) {
                        var o = i[r];
                        o = o.substring(0, 1).toLowerCase() + o.substring(1);
                        if (!(o in n)) {
                            n[o] = {}
                        }
                        if (r == i.length - 1) {
                            n[o] = e[t]
                        }
                        n = n[o]
                    }
                    delete e[t]
                }
                return e
            }
            ;
            t.hasScroll = function(t, i) {
                var n = e(i);
                var r = i.style.overflowX;
                var o = i.style.overflowY;
                if (r === o && (o === "hidden" || o === "visible")) {
                    return false
                }
                if (r === "scroll" || o === "scroll") {
                    return true
                }
                return n.innerHeight() < i.scrollHeight || n.innerWidth() < i.scrollWidth
            }
            ;
            t.escapeMarkup = function(e) {
                var t = {
                    "\\": "&#92;",
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;",
                    "/": "&#47;"
                };
                if (typeof e !== "string") {
                    return e
                }
                return String(e).replace(/[&<>"'\/\\]/g, function(e) {
                    return t[e]
                })
            }
            ;
            t.appendMany = function(t, i) {
                if (e.fn.jquery.substr(0, 3) === "1.7") {
                    var n = e();
                    e.map(i, function(e) {
                        n = n.add(e)
                    });
                    i = n
                }
                t.append(i)
            }
            ;
            t.__cache = {};
            var r = 0;
            t.GetUniqueElementId = function(e) {
                var t = e.getAttribute("data-select2-id");
                if (t == null) {
                    if (e.id) {
                        t = e.id;
                        e.setAttribute("data-select2-id", t)
                    } else {
                        e.setAttribute("data-select2-id", ++r);
                        t = r.toString()
                    }
                }
                return t
            }
            ;
            t.StoreData = function(e, i, n) {
                var r = t.GetUniqueElementId(e);
                if (!t.__cache[r]) {
                    t.__cache[r] = {}
                }
                t.__cache[r][i] = n
            }
            ;
            t.GetData = function(i, n) {
                var r = t.GetUniqueElementId(i);
                if (n) {
                    if (t.__cache[r]) {
                        return t.__cache[r][n] != null ? t.__cache[r][n] : e(i).data(n)
                    }
                    return e(i).data(n)
                } else {
                    return t.__cache[r]
                }
            }
            ;
            t.RemoveData = function(e) {
                var i = t.GetUniqueElementId(e);
                if (t.__cache[i] != null) {
                    delete t.__cache[i]
                }
            }
            ;
            return t
        });
        t.define("select2/results", ["jquery", "./utils"], function(e, t) {
            function i(e, t, n) {
                this.$element = e;
                this.data = n;
                this.options = t;
                i.__super__.constructor.call(this)
            }
            t.Extend(i, t.Observable);
            i.prototype.render = function() {
                var t = e('<ul class="select2-results__options" role="tree"></ul>');
                if (this.options.get("multiple")) {
                    t.attr("aria-multiselectable", "true")
                }
                this.$results = t;
                return t
            }
            ;
            i.prototype.clear = function() {
                this.$results.empty()
            }
            ;
            i.prototype.displayMessage = function(t) {
                var i = this.options.get("escapeMarkup");
                this.clear();
                this.hideLoading();
                var n = e('<li role="treeitem" aria-live="assertive"' + ' class="select2-results__option"></li>');
                var r = this.options.get("translations").get(t.message);
                n.append(i(r(t.args)));
                n[0].className += " select2-results__message";
                this.$results.append(n)
            }
            ;
            i.prototype.hideMessages = function() {
                this.$results.find(".select2-results__message").remove()
            }
            ;
            i.prototype.append = function(e) {
                this.hideLoading();
                var t = [];
                if (e.results == null || e.results.length === 0) {
                    if (this.$results.children().length === 0) {
                        this.trigger("results:message", {
                            message: "noResults"
                        })
                    }
                    return
                }
                e.results = this.sort(e.results);
                for (var i = 0; i < e.results.length; i++) {
                    var n = e.results[i];
                    var r = this.option(n);
                    t.push(r)
                }
                this.$results.append(t)
            }
            ;
            i.prototype.position = function(e, t) {
                var i = t.find(".select2-results");
                i.append(e)
            }
            ;
            i.prototype.sort = function(e) {
                var t = this.options.get("sorter");
                return t(e)
            }
            ;
            i.prototype.highlightFirstItem = function() {
                var e = this.$results.find(".select2-results__option[aria-selected]");
                var t = e.filter("[aria-selected=true]");
                if (t.length > 0) {
                    t.first().trigger("mouseenter")
                } else {
                    e.first().trigger("mouseenter")
                }
                this.ensureHighlightVisible()
            }
            ;
            i.prototype.setClasses = function() {
                var i = this;
                this.data.current(function(n) {
                    var r = e.map(n, function(e) {
                        return e.id.toString()
                    });
                    var o = i.$results.find(".select2-results__option[aria-selected]");
                    o.each(function() {
                        var i = e(this);
                        var n = t.GetData(this, "data");
                        var o = "" + n.id;
                        if (n.element != null && n.element.selected || n.element == null && e.inArray(o, r) > -1) {
                            i.attr("aria-selected", "true")
                        } else {
                            i.attr("aria-selected", "false")
                        }
                    })
                })
            }
            ;
            i.prototype.showLoading = function(e) {
                this.hideLoading();
                var t = this.options.get("translations").get("searching");
                var i = {
                    disabled: true,
                    loading: true,
                    text: t(e)
                };
                var n = this.option(i);
                n.className += " loading-results";
                this.$results.prepend(n)
            }
            ;
            i.prototype.hideLoading = function() {
                this.$results.find(".loading-results").remove()
            }
            ;
            i.prototype.option = function(i) {
                var n = document.createElement("li");
                n.className = "select2-results__option";
                var r = {
                    role: "treeitem",
                    "aria-selected": "false"
                };
                if (i.disabled) {
                    delete r["aria-selected"];
                    r["aria-disabled"] = "true"
                }
                if (i.id == null) {
                    delete r["aria-selected"]
                }
                if (i._resultId != null) {
                    n.id = i._resultId
                }
                if (i.title) {
                    n.title = i.title
                }
                if (i.children) {
                    r.role = "group";
                    r["aria-label"] = i.text;
                    delete r["aria-selected"]
                }
                for (var o in r) {
                    var s = r[o];
                    n.setAttribute(o, s)
                }
                if (i.children) {
                    var a = e(n);
                    var l = document.createElement("strong");
                    l.className = "select2-results__group";
                    var u = e(l);
                    this.template(i, l);
                    var c = [];
                    for (var d = 0; d < i.children.length; d++) {
                        var f = i.children[d];
                        var p = this.option(f);
                        c.push(p)
                    }
                    var h = e("<ul></ul>", {
                        class: "select2-results__options select2-results__options--nested"
                    });
                    h.append(c);
                    a.append(l);
                    a.append(h)
                } else {
                    this.template(i, n)
                }
                t.StoreData(n, "data", i);
                return n
            }
            ;
            i.prototype.bind = function(i, n) {
                var r = this;
                var o = i.id + "-results";
                this.$results.attr("id", o);
                i.on("results:all", function(e) {
                    r.clear();
                    r.append(e.data);
                    if (i.isOpen()) {
                        r.setClasses();
                        r.highlightFirstItem()
                    }
                });
                i.on("results:append", function(e) {
                    r.append(e.data);
                    if (i.isOpen()) {
                        r.setClasses()
                    }
                });
                i.on("query", function(e) {
                    r.hideMessages();
                    r.showLoading(e)
                });
                i.on("select", function() {
                    if (!i.isOpen()) {
                        return
                    }
                    r.setClasses();
                    r.highlightFirstItem()
                });
                i.on("unselect", function() {
                    if (!i.isOpen()) {
                        return
                    }
                    r.setClasses();
                    r.highlightFirstItem()
                });
                i.on("open", function() {
                    r.$results.attr("aria-expanded", "true");
                    r.$results.attr("aria-hidden", "false");
                    r.setClasses();
                    r.ensureHighlightVisible()
                });
                i.on("close", function() {
                    r.$results.attr("aria-expanded", "false");
                    r.$results.attr("aria-hidden", "true");
                    r.$results.removeAttr("aria-activedescendant")
                });
                i.on("results:toggle", function() {
                    var e = r.getHighlightedResults();
                    if (e.length === 0) {
                        return
                    }
                    e.trigger("mouseup")
                });
                i.on("results:select", function() {
                    var e = r.getHighlightedResults();
                    if (e.length === 0) {
                        return
                    }
                    var i = t.GetData(e[0], "data");
                    if (e.attr("aria-selected") == "true") {
                        r.trigger("close", {})
                    } else {
                        r.trigger("select", {
                            data: i
                        })
                    }
                });
                i.on("results:previous", function() {
                    var e = r.getHighlightedResults();
                    var t = r.$results.find("[aria-selected]");
                    var i = t.index(e);
                    if (i <= 0) {
                        return
                    }
                    var n = i - 1;
                    if (e.length === 0) {
                        n = 0
                    }
                    var o = t.eq(n);
                    o.trigger("mouseenter");
                    var s = r.$results.offset().top;
                    var a = o.offset().top;
                    var l = r.$results.scrollTop() + (a - s);
                    if (n === 0) {
                        r.$results.scrollTop(0)
                    } else if (a - s < 0) {
                        r.$results.scrollTop(l)
                    }
                });
                i.on("results:next", function() {
                    var e = r.getHighlightedResults();
                    var t = r.$results.find("[aria-selected]");
                    var i = t.index(e);
                    var n = i + 1;
                    if (n >= t.length) {
                        return
                    }
                    var o = t.eq(n);
                    o.trigger("mouseenter");
                    var s = r.$results.offset().top + r.$results.outerHeight(false);
                    var a = o.offset().top + o.outerHeight(false);
                    var l = r.$results.scrollTop() + a - s;
                    if (n === 0) {
                        r.$results.scrollTop(0)
                    } else if (a > s) {
                        r.$results.scrollTop(l)
                    }
                });
                i.on("results:focus", function(e) {
                    e.element.addClass("select2-results__option--highlighted")
                });
                i.on("results:message", function(e) {
                    r.displayMessage(e)
                });
                if (e.fn.mousewheel) {
                    this.$results.on("mousewheel", function(e) {
                        var t = r.$results.scrollTop();
                        var i = r.$results.get(0).scrollHeight - t + e.deltaY;
                        var n = e.deltaY > 0 && t - e.deltaY <= 0;
                        var o = e.deltaY < 0 && i <= r.$results.height();
                        if (n) {
                            r.$results.scrollTop(0);
                            e.preventDefault();
                            e.stopPropagation()
                        } else if (o) {
                            r.$results.scrollTop(r.$results.get(0).scrollHeight - r.$results.height());
                            e.preventDefault();
                            e.stopPropagation()
                        }
                    })
                }
                this.$results.on("mouseup", ".select2-results__option[aria-selected]", function(i) {
                    var n = e(this);
                    var o = t.GetData(this, "data");
                    if (n.attr("aria-selected") === "true") {
                        if (r.options.get("multiple")) {
                            r.trigger("unselect", {
                                originalEvent: i,
                                data: o
                            })
                        } else {
                            r.trigger("close", {})
                        }
                        return
                    }
                    r.trigger("select", {
                        originalEvent: i,
                        data: o
                    })
                });
                this.$results.on("mouseenter", ".select2-results__option[aria-selected]", function(i) {
                    var n = t.GetData(this, "data");
                    r.getHighlightedResults().removeClass("select2-results__option--highlighted");
                    r.trigger("results:focus", {
                        data: n,
                        element: e(this)
                    })
                })
            }
            ;
            i.prototype.getHighlightedResults = function() {
                var e = this.$results.find(".select2-results__option--highlighted");
                return e
            }
            ;
            i.prototype.destroy = function() {
                this.$results.remove()
            }
            ;
            i.prototype.ensureHighlightVisible = function() {
                var e = this.getHighlightedResults();
                if (e.length === 0) {
                    return
                }
                var t = this.$results.find("[aria-selected]");
                var i = t.index(e);
                var n = this.$results.offset().top;
                var r = e.offset().top;
                var o = this.$results.scrollTop() + (r - n);
                var s = r - n;
                o -= e.outerHeight(false) * 2;
                if (i <= 2) {
                    this.$results.scrollTop(0)
                } else if (s > this.$results.outerHeight() || s < 0) {
                    this.$results.scrollTop(o)
                }
            }
            ;
            i.prototype.template = function(t, i) {
                var n = this.options.get("templateResult");
                var r = this.options.get("escapeMarkup");
                var o = n(t, i);
                if (o == null) {
                    i.style.display = "none"
                } else if (typeof o === "string") {
                    i.innerHTML = r(o)
                } else {
                    e(i).append(o)
                }
            }
            ;
            return i
        });
        t.define("select2/keys", [], function() {
            var e = {
                BACKSPACE: 8,
                TAB: 9,
                ENTER: 13,
                SHIFT: 16,
                CTRL: 17,
                ALT: 18,
                ESC: 27,
                SPACE: 32,
                PAGE_UP: 33,
                PAGE_DOWN: 34,
                END: 35,
                HOME: 36,
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                DOWN: 40,
                DELETE: 46
            };
            return e
        });
        t.define("select2/selection/base", ["jquery", "../utils", "../keys"], function(e, t, i) {
            function n(e, t) {
                this.$element = e;
                this.options = t;
                n.__super__.constructor.call(this)
            }
            t.Extend(n, t.Observable);
            n.prototype.render = function() {
                var i = e('<span class="select2-selection" role="combobox" ' + ' aria-haspopup="true" aria-expanded="false">' + "</span>");
                this._tabindex = 0;
                if (t.GetData(this.$element[0], "old-tabindex") != null) {
                    this._tabindex = t.GetData(this.$element[0], "old-tabindex")
                } else if (this.$element.attr("tabindex") != null) {
                    this._tabindex = this.$element.attr("tabindex")
                }
                i.attr("title", this.$element.attr("title"));
                i.attr("tabindex", this._tabindex);
                this.$selection = i;
                return i
            }
            ;
            n.prototype.bind = function(e, t) {
                var n = this;
                var r = e.id + "-container";
                var o = e.id + "-results";
                this.container = e;
                this.$selection.on("focus", function(e) {
                    n.trigger("focus", e)
                });
                this.$selection.on("blur", function(e) {
                    n._handleBlur(e)
                });
                this.$selection.on("keydown", function(e) {
                    n.trigger("keypress", e);
                    if (e.which === i.SPACE) {
                        e.preventDefault()
                    }
                });
                e.on("results:focus", function(e) {
                    n.$selection.attr("aria-activedescendant", e.data._resultId)
                });
                e.on("selection:update", function(e) {
                    n.update(e.data)
                });
                e.on("open", function() {
                    n.$selection.attr("aria-expanded", "true");
                    n.$selection.attr("aria-owns", o);
                    n._attachCloseHandler(e)
                });
                e.on("close", function() {
                    n.$selection.attr("aria-expanded", "false");
                    n.$selection.removeAttr("aria-activedescendant");
                    n.$selection.removeAttr("aria-owns");
                    n.$selection.focus();
                    window.setTimeout(function() {
                        n.$selection.focus()
                    }, 0);
                    n._detachCloseHandler(e)
                });
                e.on("enable", function() {
                    n.$selection.attr("tabindex", n._tabindex)
                });
                e.on("disable", function() {
                    n.$selection.attr("tabindex", "-1")
                })
            }
            ;
            n.prototype._handleBlur = function(t) {
                var i = this;
                window.setTimeout(function() {
                    if (document.activeElement == i.$selection[0] || e.contains(i.$selection[0], document.activeElement)) {
                        return
                    }
                    i.trigger("blur", t)
                }, 1)
            }
            ;
            n.prototype._attachCloseHandler = function(i) {
                var n = this;
                e(document.body).on("mousedown.select2." + i.id, function(i) {
                    var n = e(i.target);
                    var r = n.closest(".select2");
                    var o = e(".select2.select2-container--open");
                    o.each(function() {
                        var i = e(this);
                        if (this == r[0]) {
                            return
                        }
                        var n = t.GetData(this, "element");
                        n.select2("close")
                    })
                })
            }
            ;
            n.prototype._detachCloseHandler = function(t) {
                e(document.body).off("mousedown.select2." + t.id)
            }
            ;
            n.prototype.position = function(e, t) {
                var i = t.find(".selection");
                i.append(e)
            }
            ;
            n.prototype.destroy = function() {
                this._detachCloseHandler(this.container)
            }
            ;
            n.prototype.update = function(e) {
                throw new Error("The `update` method must be defined in child classes.")
            }
            ;
            return n
        });
        t.define("select2/selection/single", ["jquery", "./base", "../utils", "../keys"], function(e, t, i, n) {
            function r() {
                r.__super__.constructor.apply(this, arguments)
            }
            i.Extend(r, t);
            r.prototype.render = function() {
                var e = r.__super__.render.call(this);
                e.addClass("select2-selection--single");
                e.html('<span class="select2-selection__rendered"></span>' + '<span class="select2-selection__arrow" role="presentation">' + '<b role="presentation"></b>' + "</span>");
                return e
            }
            ;
            r.prototype.bind = function(e, t) {
                var i = this;
                r.__super__.bind.apply(this, arguments);
                var n = e.id + "-container";
                this.$selection.find(".select2-selection__rendered").attr("id", n).attr("role", "textbox").attr("aria-readonly", "true");
                this.$selection.attr("aria-labelledby", n);
                this.$selection.on("mousedown", function(e) {
                    if (e.which !== 1) {
                        return
                    }
                    i.trigger("toggle", {
                        originalEvent: e
                    })
                });
                this.$selection.on("focus", function(e) {});
                this.$selection.on("blur", function(e) {});
                e.on("focus", function(t) {
                    if (!e.isOpen()) {
                        i.$selection.focus()
                    }
                })
            }
            ;
            r.prototype.clear = function() {
                var e = this.$selection.find(".select2-selection__rendered");
                e.empty();
                e.removeAttr("title")
            }
            ;
            r.prototype.display = function(e, t) {
                var i = this.options.get("templateSelection");
                var n = this.options.get("escapeMarkup");
                return n(i(e, t))
            }
            ;
            r.prototype.selectionContainer = function() {
                return e("<span></span>")
            }
            ;
            r.prototype.update = function(e) {
                if (e.length === 0) {
                    this.clear();
                    return
                }
                var t = e[0];
                var i = this.$selection.find(".select2-selection__rendered");
                var n = this.display(t, i);
                i.empty().append(n);
                i.attr("title", t.title || t.text)
            }
            ;
            return r
        });
        t.define("select2/selection/multiple", ["jquery", "./base", "../utils"], function(e, t, i) {
            function n(e, t) {
                n.__super__.constructor.apply(this, arguments)
            }
            i.Extend(n, t);
            n.prototype.render = function() {
                var e = n.__super__.render.call(this);
                e.addClass("select2-selection--multiple");
                e.html('<ul class="select2-selection__rendered"></ul>');
                return e
            }
            ;
            n.prototype.bind = function(t, r) {
                var o = this;
                n.__super__.bind.apply(this, arguments);
                this.$selection.on("click", function(e) {
                    o.trigger("toggle", {
                        originalEvent: e
                    })
                });
                this.$selection.on("click", ".select2-selection__choice__remove", function(t) {
                    if (o.options.get("disabled")) {
                        return
                    }
                    var n = e(this);
                    var r = n.parent();
                    var s = i.GetData(r[0], "data");
                    o.trigger("unselect", {
                        originalEvent: t,
                        data: s
                    })
                })
            }
            ;
            n.prototype.clear = function() {
                var e = this.$selection.find(".select2-selection__rendered");
                e.empty();
                e.removeAttr("title")
            }
            ;
            n.prototype.display = function(e, t) {
                var i = this.options.get("templateSelection");
                var n = this.options.get("escapeMarkup");
                return n(i(e, t))
            }
            ;
            n.prototype.selectionContainer = function() {
                var t = e('<li class="select2-selection__choice">' + '<span class="select2-selection__choice__remove" role="presentation">' + "&times;" + "</span>" + "</li>");
                return t
            }
            ;
            n.prototype.update = function(e) {
                this.clear();
                if (e.length === 0) {
                    return
                }
                var t = [];
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    var o = this.selectionContainer();
                    var s = this.display(r, o);
                    o.append(s);
                    o.attr("title", r.title || r.text);
                    i.StoreData(o[0], "data", r);
                    t.push(o)
                }
                var a = this.$selection.find(".select2-selection__rendered");
                i.appendMany(a, t)
            }
            ;
            return n
        });
        t.define("select2/selection/placeholder", ["../utils"], function(e) {
            function t(e, t, i) {
                this.placeholder = this.normalizePlaceholder(i.get("placeholder"));
                e.call(this, t, i)
            }
            t.prototype.normalizePlaceholder = function(e, t) {
                if (typeof t === "string") {
                    t = {
                        id: "",
                        text: t
                    }
                }
                return t
            }
            ;
            t.prototype.createPlaceholder = function(e, t) {
                var i = this.selectionContainer();
                i.html(this.display(t));
                i.addClass("select2-selection__placeholder").removeClass("select2-selection__choice");
                return i
            }
            ;
            t.prototype.update = function(e, t) {
                var i = t.length == 1 && t[0].id != this.placeholder.id;
                var n = t.length > 1;
                if (n || i) {
                    return e.call(this, t)
                }
                this.clear();
                var r = this.createPlaceholder(this.placeholder);
                this.$selection.find(".select2-selection__rendered").append(r)
            }
            ;
            return t
        });
        t.define("select2/selection/allowClear", ["jquery", "../keys", "../utils"], function(e, t, i) {
            function n() {}
            n.prototype.bind = function(e, t, i) {
                var n = this;
                e.call(this, t, i);
                if (this.placeholder == null) {
                    if (this.options.get("debug") && window.console && console.error) {
                        console.error("Select2: The `allowClear` option should be used in combination " + "with the `placeholder` option.")
                    }
                }
                this.$selection.on("mousedown", ".select2-selection__clear", function(e) {
                    n._handleClear(e)
                });
                t.on("keypress", function(e) {
                    n._handleKeyboardClear(e, t)
                })
            }
            ;
            n.prototype._handleClear = function(e, t) {
                if (this.options.get("disabled")) {
                    return
                }
                var n = this.$selection.find(".select2-selection__clear");
                if (n.length === 0) {
                    return
                }
                t.stopPropagation();
                var r = i.GetData(n[0], "data");
                var o = this.$element.val();
                this.$element.val(this.placeholder.id);
                var s = {
                    data: r
                };
                this.trigger("clear", s);
                if (s.prevented) {
                    this.$element.val(o);
                    return
                }
                for (var a = 0; a < r.length; a++) {
                    s = {
                        data: r[a]
                    };
                    this.trigger("unselect", s);
                    if (s.prevented) {
                        this.$element.val(o);
                        return
                    }
                }
                this.$element.trigger("change");
                this.trigger("toggle", {})
            }
            ;
            n.prototype._handleKeyboardClear = function(e, i, n) {
                if (n.isOpen()) {
                    return
                }
                if (i.which == t.DELETE || i.which == t.BACKSPACE) {
                    this._handleClear(i)
                }
            }
            ;
            n.prototype.update = function(t, n) {
                t.call(this, n);
                if (this.$selection.find(".select2-selection__placeholder").length > 0 || n.length === 0) {
                    return
                }
                var r = e('<span class="select2-selection__clear">' + "&times;" + "</span>");
                i.StoreData(r[0], "data", n);
                this.$selection.find(".select2-selection__rendered").prepend(r)
            }
            ;
            return n
        });
        t.define("select2/selection/search", ["jquery", "../utils", "../keys"], function(e, t, i) {
            function n(e, t, i) {
                e.call(this, t, i)
            }
            n.prototype.render = function(t) {
                var i = e('<li class="select2-search select2-search--inline">' + '<input class="select2-search__field" type="search" tabindex="-1"' + ' autocomplete="off" autocorrect="off" autocapitalize="none"' + ' spellcheck="false" role="textbox" aria-autocomplete="list" />' + "</li>");
                this.$searchContainer = i;
                this.$search = i.find("input");
                var n = t.call(this);
                this._transferTabIndex();
                return n
            }
            ;
            n.prototype.bind = function(e, n, r) {
                var o = this;
                e.call(this, n, r);
                n.on("open", function() {
                    o.$search.trigger("focus")
                });
                n.on("close", function() {
                    o.$search.val("");
                    o.$search.removeAttr("aria-activedescendant");
                    o.$search.trigger("focus")
                });
                n.on("enable", function() {
                    o.$search.prop("disabled", false);
                    o._transferTabIndex()
                });
                n.on("disable", function() {
                    o.$search.prop("disabled", true)
                });
                n.on("focus", function(e) {
                    o.$search.trigger("focus")
                });
                n.on("results:focus", function(e) {
                    o.$search.attr("aria-activedescendant", e.id)
                });
                this.$selection.on("focusin", ".select2-search--inline", function(e) {
                    o.trigger("focus", e)
                });
                this.$selection.on("focusout", ".select2-search--inline", function(e) {
                    o._handleBlur(e)
                });
                this.$selection.on("keydown", ".select2-search--inline", function(e) {
                    e.stopPropagation();
                    o.trigger("keypress", e);
                    o._keyUpPrevented = e.isDefaultPrevented();
                    var n = e.which;
                    if (n === i.BACKSPACE && o.$search.val() === "") {
                        var r = o.$searchContainer.prev(".select2-selection__choice");
                        if (r.length > 0) {
                            var s = t.GetData(r[0], "data");
                            o.searchRemoveChoice(s);
                            e.preventDefault()
                        }
                    }
                });
                var s = document.documentMode;
                var a = s && s <= 11;
                this.$selection.on("input.searchcheck", ".select2-search--inline", function(e) {
                    if (a) {
                        o.$selection.off("input.search input.searchcheck");
                        return
                    }
                    o.$selection.off("keyup.search")
                });
                this.$selection.on("keyup.search input.search", ".select2-search--inline", function(e) {
                    if (a && e.type === "input") {
                        o.$selection.off("input.search input.searchcheck");
                        return
                    }
                    var t = e.which;
                    if (t == i.SHIFT || t == i.CTRL || t == i.ALT) {
                        return
                    }
                    if (t == i.TAB) {
                        return
                    }
                    o.handleSearch(e)
                })
            }
            ;
            n.prototype._transferTabIndex = function(e) {
                this.$search.attr("tabindex", this.$selection.attr("tabindex"));
                this.$selection.attr("tabindex", "-1")
            }
            ;
            n.prototype.createPlaceholder = function(e, t) {
                this.$search.attr("placeholder", t.text)
            }
            ;
            n.prototype.update = function(e, t) {
                var i = this.$search[0] == document.activeElement;
                this.$search.attr("placeholder", "");
                e.call(this, t);
                this.$selection.find(".select2-selection__rendered").append(this.$searchContainer);
                this.resizeSearch();
                if (i) {
                    var n = this.$element.find("[data-select2-tag]").length;
                    if (n) {
                        this.$element.focus()
                    } else {
                        this.$search.focus()
                    }
                }
            }
            ;
            n.prototype.handleSearch = function() {
                this.resizeSearch();
                if (!this._keyUpPrevented) {
                    var e = this.$search.val();
                    this.trigger("query", {
                        term: e
                    })
                }
                this._keyUpPrevented = false
            }
            ;
            n.prototype.searchRemoveChoice = function(e, t) {
                this.trigger("unselect", {
                    data: t
                });
                this.$search.val(t.text);
                this.handleSearch()
            }
            ;
            n.prototype.resizeSearch = function() {
                this.$search.css("width", "25px");
                var e = "";
                if (this.$search.attr("placeholder") !== "") {
                    e = this.$selection.find(".select2-selection__rendered").innerWidth()
                } else {
                    var t = this.$search.val().length + 1;
                    e = t * .75 + "em"
                }
                this.$search.css("width", e)
            }
            ;
            return n
        });
        t.define("select2/selection/eventRelay", ["jquery"], function(e) {
            function t() {}
            t.prototype.bind = function(t, i, n) {
                var r = this;
                var o = ["open", "opening", "close", "closing", "select", "selecting", "unselect", "unselecting", "clear", "clearing"];
                var s = ["opening", "closing", "selecting", "unselecting", "clearing"];
                t.call(this, i, n);
                i.on("*", function(t, i) {
                    if (e.inArray(t, o) === -1) {
                        return
                    }
                    i = i || {};
                    var n = e.Event("select2:" + t, {
                        params: i
                    });
                    r.$element.trigger(n);
                    if (e.inArray(t, s) === -1) {
                        return
                    }
                    i.prevented = n.isDefaultPrevented()
                })
            }
            ;
            return t
        });
        t.define("select2/translation", ["jquery", "require"], function(e, t) {
            function i(e) {
                this.dict = e || {}
            }
            i.prototype.all = function() {
                return this.dict
            }
            ;
            i.prototype.get = function(e) {
                return this.dict[e]
            }
            ;
            i.prototype.extend = function(t) {
                this.dict = e.extend({}, t.all(), this.dict)
            }
            ;
            i._cache = {};
            i.loadPath = function(e) {
                if (!(e in i._cache)) {
                    var n = t(e);
                    i._cache[e] = n
                }
                return new i(i._cache[e])
            }
            ;
            return i
        });
        t.define("select2/diacritics", [], function() {
            var e = {
                "Ⓐ": "A",
                "Ａ": "A",
                "À": "A",
                "Á": "A",
                "Â": "A",
                "Ầ": "A",
                "Ấ": "A",
                "Ẫ": "A",
                "Ẩ": "A",
                "Ã": "A",
                "Ā": "A",
                "Ă": "A",
                "Ằ": "A",
                "Ắ": "A",
                "Ẵ": "A",
                "Ẳ": "A",
                "Ȧ": "A",
                "Ǡ": "A",
                "Ä": "A",
                "Ǟ": "A",
                "Ả": "A",
                "Å": "A",
                "Ǻ": "A",
                "Ǎ": "A",
                "Ȁ": "A",
                "Ȃ": "A",
                "Ạ": "A",
                "Ậ": "A",
                "Ặ": "A",
                "Ḁ": "A",
                "Ą": "A",
                "Ⱥ": "A",
                "Ɐ": "A",
                "Ꜳ": "AA",
                "Æ": "AE",
                "Ǽ": "AE",
                "Ǣ": "AE",
                "Ꜵ": "AO",
                "Ꜷ": "AU",
                "Ꜹ": "AV",
                "Ꜻ": "AV",
                "Ꜽ": "AY",
                "Ⓑ": "B",
                "Ｂ": "B",
                "Ḃ": "B",
                "Ḅ": "B",
                "Ḇ": "B",
                "Ƀ": "B",
                "Ƃ": "B",
                "Ɓ": "B",
                "Ⓒ": "C",
                "Ｃ": "C",
                "Ć": "C",
                "Ĉ": "C",
                "Ċ": "C",
                "Č": "C",
                "Ç": "C",
                "Ḉ": "C",
                "Ƈ": "C",
                "Ȼ": "C",
                "Ꜿ": "C",
                "Ⓓ": "D",
                "Ｄ": "D",
                "Ḋ": "D",
                "Ď": "D",
                "Ḍ": "D",
                "Ḑ": "D",
                "Ḓ": "D",
                "Ḏ": "D",
                "Đ": "D",
                "Ƌ": "D",
                "Ɗ": "D",
                "Ɖ": "D",
                "Ꝺ": "D",
                "Ǳ": "DZ",
                "Ǆ": "DZ",
                "ǲ": "Dz",
                "ǅ": "Dz",
                "Ⓔ": "E",
                "Ｅ": "E",
                "È": "E",
                "É": "E",
                "Ê": "E",
                "Ề": "E",
                "Ế": "E",
                "Ễ": "E",
                "Ể": "E",
                "Ẽ": "E",
                "Ē": "E",
                "Ḕ": "E",
                "Ḗ": "E",
                "Ĕ": "E",
                "Ė": "E",
                "Ë": "E",
                "Ẻ": "E",
                "Ě": "E",
                "Ȅ": "E",
                "Ȇ": "E",
                "Ẹ": "E",
                "Ệ": "E",
                "Ȩ": "E",
                "Ḝ": "E",
                "Ę": "E",
                "Ḙ": "E",
                "Ḛ": "E",
                "Ɛ": "E",
                "Ǝ": "E",
                "Ⓕ": "F",
                "Ｆ": "F",
                "Ḟ": "F",
                "Ƒ": "F",
                "Ꝼ": "F",
                "Ⓖ": "G",
                "Ｇ": "G",
                "Ǵ": "G",
                "Ĝ": "G",
                "Ḡ": "G",
                "Ğ": "G",
                "Ġ": "G",
                "Ǧ": "G",
                "Ģ": "G",
                "Ǥ": "G",
                "Ɠ": "G",
                "Ꞡ": "G",
                "Ᵹ": "G",
                "Ꝿ": "G",
                "Ⓗ": "H",
                "Ｈ": "H",
                "Ĥ": "H",
                "Ḣ": "H",
                "Ḧ": "H",
                "Ȟ": "H",
                "Ḥ": "H",
                "Ḩ": "H",
                "Ḫ": "H",
                "Ħ": "H",
                "Ⱨ": "H",
                "Ⱶ": "H",
                "Ɥ": "H",
                "Ⓘ": "I",
                "Ｉ": "I",
                "Ì": "I",
                "Í": "I",
                "Î": "I",
                "Ĩ": "I",
                "Ī": "I",
                "Ĭ": "I",
                "İ": "I",
                "Ï": "I",
                "Ḯ": "I",
                "Ỉ": "I",
                "Ǐ": "I",
                "Ȉ": "I",
                "Ȋ": "I",
                "Ị": "I",
                "Į": "I",
                "Ḭ": "I",
                "Ɨ": "I",
                "Ⓙ": "J",
                "Ｊ": "J",
                "Ĵ": "J",
                "Ɉ": "J",
                "Ⓚ": "K",
                "Ｋ": "K",
                "Ḱ": "K",
                "Ǩ": "K",
                "Ḳ": "K",
                "Ķ": "K",
                "Ḵ": "K",
                "Ƙ": "K",
                "Ⱪ": "K",
                "Ꝁ": "K",
                "Ꝃ": "K",
                "Ꝅ": "K",
                "Ꞣ": "K",
                "Ⓛ": "L",
                "Ｌ": "L",
                "Ŀ": "L",
                "Ĺ": "L",
                "Ľ": "L",
                "Ḷ": "L",
                "Ḹ": "L",
                "Ļ": "L",
                "Ḽ": "L",
                "Ḻ": "L",
                "Ł": "L",
                "Ƚ": "L",
                "Ɫ": "L",
                "Ⱡ": "L",
                "Ꝉ": "L",
                "Ꝇ": "L",
                "Ꞁ": "L",
                "Ǉ": "LJ",
                "ǈ": "Lj",
                "Ⓜ": "M",
                "Ｍ": "M",
                "Ḿ": "M",
                "Ṁ": "M",
                "Ṃ": "M",
                "Ɱ": "M",
                "Ɯ": "M",
                "Ⓝ": "N",
                "Ｎ": "N",
                "Ǹ": "N",
                "Ń": "N",
                "Ñ": "N",
                "Ṅ": "N",
                "Ň": "N",
                "Ṇ": "N",
                "Ņ": "N",
                "Ṋ": "N",
                "Ṉ": "N",
                "Ƞ": "N",
                "Ɲ": "N",
                "Ꞑ": "N",
                "Ꞥ": "N",
                "Ǌ": "NJ",
                "ǋ": "Nj",
                "Ⓞ": "O",
                "Ｏ": "O",
                "Ò": "O",
                "Ó": "O",
                "Ô": "O",
                "Ồ": "O",
                "Ố": "O",
                "Ỗ": "O",
                "Ổ": "O",
                "Õ": "O",
                "Ṍ": "O",
                "Ȭ": "O",
                "Ṏ": "O",
                "Ō": "O",
                "Ṑ": "O",
                "Ṓ": "O",
                "Ŏ": "O",
                "Ȯ": "O",
                "Ȱ": "O",
                "Ö": "O",
                "Ȫ": "O",
                "Ỏ": "O",
                "Ő": "O",
                "Ǒ": "O",
                "Ȍ": "O",
                "Ȏ": "O",
                "Ơ": "O",
                "Ờ": "O",
                "Ớ": "O",
                "Ỡ": "O",
                "Ở": "O",
                "Ợ": "O",
                "Ọ": "O",
                "Ộ": "O",
                "Ǫ": "O",
                "Ǭ": "O",
                "Ø": "O",
                "Ǿ": "O",
                "Ɔ": "O",
                "Ɵ": "O",
                "Ꝋ": "O",
                "Ꝍ": "O",
                "Ƣ": "OI",
                "Ꝏ": "OO",
                "Ȣ": "OU",
                "Ⓟ": "P",
                "Ｐ": "P",
                "Ṕ": "P",
                "Ṗ": "P",
                "Ƥ": "P",
                "Ᵽ": "P",
                "Ꝑ": "P",
                "Ꝓ": "P",
                "Ꝕ": "P",
                "Ⓠ": "Q",
                "Ｑ": "Q",
                "Ꝗ": "Q",
                "Ꝙ": "Q",
                "Ɋ": "Q",
                "Ⓡ": "R",
                "Ｒ": "R",
                "Ŕ": "R",
                "Ṙ": "R",
                "Ř": "R",
                "Ȑ": "R",
                "Ȓ": "R",
                "Ṛ": "R",
                "Ṝ": "R",
                "Ŗ": "R",
                "Ṟ": "R",
                "Ɍ": "R",
                "Ɽ": "R",
                "Ꝛ": "R",
                "Ꞧ": "R",
                "Ꞃ": "R",
                "Ⓢ": "S",
                "Ｓ": "S",
                "ẞ": "S",
                "Ś": "S",
                "Ṥ": "S",
                "Ŝ": "S",
                "Ṡ": "S",
                "Š": "S",
                "Ṧ": "S",
                "Ṣ": "S",
                "Ṩ": "S",
                "Ș": "S",
                "Ş": "S",
                "Ȿ": "S",
                "Ꞩ": "S",
                "Ꞅ": "S",
                "Ⓣ": "T",
                "Ｔ": "T",
                "Ṫ": "T",
                "Ť": "T",
                "Ṭ": "T",
                "Ț": "T",
                "Ţ": "T",
                "Ṱ": "T",
                "Ṯ": "T",
                "Ŧ": "T",
                "Ƭ": "T",
                "Ʈ": "T",
                "Ⱦ": "T",
                "Ꞇ": "T",
                "Ꜩ": "TZ",
                "Ⓤ": "U",
                "Ｕ": "U",
                "Ù": "U",
                "Ú": "U",
                "Û": "U",
                "Ũ": "U",
                "Ṹ": "U",
                "Ū": "U",
                "Ṻ": "U",
                "Ŭ": "U",
                "Ü": "U",
                "Ǜ": "U",
                "Ǘ": "U",
                "Ǖ": "U",
                "Ǚ": "U",
                "Ủ": "U",
                "Ů": "U",
                "Ű": "U",
                "Ǔ": "U",
                "Ȕ": "U",
                "Ȗ": "U",
                "Ư": "U",
                "Ừ": "U",
                "Ứ": "U",
                "Ữ": "U",
                "Ử": "U",
                "Ự": "U",
                "Ụ": "U",
                "Ṳ": "U",
                "Ų": "U",
                "Ṷ": "U",
                "Ṵ": "U",
                "Ʉ": "U",
                "Ⓥ": "V",
                "Ｖ": "V",
                "Ṽ": "V",
                "Ṿ": "V",
                "Ʋ": "V",
                "Ꝟ": "V",
                "Ʌ": "V",
                "Ꝡ": "VY",
                "Ⓦ": "W",
                "Ｗ": "W",
                "Ẁ": "W",
                "Ẃ": "W",
                "Ŵ": "W",
                "Ẇ": "W",
                "Ẅ": "W",
                "Ẉ": "W",
                "Ⱳ": "W",
                "Ⓧ": "X",
                "Ｘ": "X",
                "Ẋ": "X",
                "Ẍ": "X",
                "Ⓨ": "Y",
                "Ｙ": "Y",
                "Ỳ": "Y",
                "Ý": "Y",
                "Ŷ": "Y",
                "Ỹ": "Y",
                "Ȳ": "Y",
                "Ẏ": "Y",
                "Ÿ": "Y",
                "Ỷ": "Y",
                "Ỵ": "Y",
                "Ƴ": "Y",
                "Ɏ": "Y",
                "Ỿ": "Y",
                "Ⓩ": "Z",
                "Ｚ": "Z",
                "Ź": "Z",
                "Ẑ": "Z",
                "Ż": "Z",
                "Ž": "Z",
                "Ẓ": "Z",
                "Ẕ": "Z",
                "Ƶ": "Z",
                "Ȥ": "Z",
                "Ɀ": "Z",
                "Ⱬ": "Z",
                "Ꝣ": "Z",
                "ⓐ": "a",
                "ａ": "a",
                "ẚ": "a",
                "à": "a",
                "á": "a",
                "â": "a",
                "ầ": "a",
                "ấ": "a",
                "ẫ": "a",
                "ẩ": "a",
                "ã": "a",
                "ā": "a",
                "ă": "a",
                "ằ": "a",
                "ắ": "a",
                "ẵ": "a",
                "ẳ": "a",
                "ȧ": "a",
                "ǡ": "a",
                "ä": "a",
                "ǟ": "a",
                "ả": "a",
                "å": "a",
                "ǻ": "a",
                "ǎ": "a",
                "ȁ": "a",
                "ȃ": "a",
                "ạ": "a",
                "ậ": "a",
                "ặ": "a",
                "ḁ": "a",
                "ą": "a",
                "ⱥ": "a",
                "ɐ": "a",
                "ꜳ": "aa",
                "æ": "ae",
                "ǽ": "ae",
                "ǣ": "ae",
                "ꜵ": "ao",
                "ꜷ": "au",
                "ꜹ": "av",
                "ꜻ": "av",
                "ꜽ": "ay",
                "ⓑ": "b",
                "ｂ": "b",
                "ḃ": "b",
                "ḅ": "b",
                "ḇ": "b",
                "ƀ": "b",
                "ƃ": "b",
                "ɓ": "b",
                "ⓒ": "c",
                "ｃ": "c",
                "ć": "c",
                "ĉ": "c",
                "ċ": "c",
                "č": "c",
                "ç": "c",
                "ḉ": "c",
                "ƈ": "c",
                "ȼ": "c",
                "ꜿ": "c",
                "ↄ": "c",
                "ⓓ": "d",
                "ｄ": "d",
                "ḋ": "d",
                "ď": "d",
                "ḍ": "d",
                "ḑ": "d",
                "ḓ": "d",
                "ḏ": "d",
                "đ": "d",
                "ƌ": "d",
                "ɖ": "d",
                "ɗ": "d",
                "ꝺ": "d",
                "ǳ": "dz",
                "ǆ": "dz",
                "ⓔ": "e",
                "ｅ": "e",
                "è": "e",
                "é": "e",
                "ê": "e",
                "ề": "e",
                "ế": "e",
                "ễ": "e",
                "ể": "e",
                "ẽ": "e",
                "ē": "e",
                "ḕ": "e",
                "ḗ": "e",
                "ĕ": "e",
                "ė": "e",
                "ë": "e",
                "ẻ": "e",
                "ě": "e",
                "ȅ": "e",
                "ȇ": "e",
                "ẹ": "e",
                "ệ": "e",
                "ȩ": "e",
                "ḝ": "e",
                "ę": "e",
                "ḙ": "e",
                "ḛ": "e",
                "ɇ": "e",
                "ɛ": "e",
                "ǝ": "e",
                "ⓕ": "f",
                "ｆ": "f",
                "ḟ": "f",
                "ƒ": "f",
                "ꝼ": "f",
                "ⓖ": "g",
                "ｇ": "g",
                "ǵ": "g",
                "ĝ": "g",
                "ḡ": "g",
                "ğ": "g",
                "ġ": "g",
                "ǧ": "g",
                "ģ": "g",
                "ǥ": "g",
                "ɠ": "g",
                "ꞡ": "g",
                "ᵹ": "g",
                "ꝿ": "g",
                "ⓗ": "h",
                "ｈ": "h",
                "ĥ": "h",
                "ḣ": "h",
                "ḧ": "h",
                "ȟ": "h",
                "ḥ": "h",
                "ḩ": "h",
                "ḫ": "h",
                "ẖ": "h",
                "ħ": "h",
                "ⱨ": "h",
                "ⱶ": "h",
                "ɥ": "h",
                "ƕ": "hv",
                "ⓘ": "i",
                "ｉ": "i",
                "ì": "i",
                "í": "i",
                "î": "i",
                "ĩ": "i",
                "ī": "i",
                "ĭ": "i",
                "ï": "i",
                "ḯ": "i",
                "ỉ": "i",
                "ǐ": "i",
                "ȉ": "i",
                "ȋ": "i",
                "ị": "i",
                "į": "i",
                "ḭ": "i",
                "ɨ": "i",
                "ı": "i",
                "ⓙ": "j",
                "ｊ": "j",
                "ĵ": "j",
                "ǰ": "j",
                "ɉ": "j",
                "ⓚ": "k",
                "ｋ": "k",
                "ḱ": "k",
                "ǩ": "k",
                "ḳ": "k",
                "ķ": "k",
                "ḵ": "k",
                "ƙ": "k",
                "ⱪ": "k",
                "ꝁ": "k",
                "ꝃ": "k",
                "ꝅ": "k",
                "ꞣ": "k",
                "ⓛ": "l",
                "ｌ": "l",
                "ŀ": "l",
                "ĺ": "l",
                "ľ": "l",
                "ḷ": "l",
                "ḹ": "l",
                "ļ": "l",
                "ḽ": "l",
                "ḻ": "l",
                "ſ": "l",
                "ł": "l",
                "ƚ": "l",
                "ɫ": "l",
                "ⱡ": "l",
                "ꝉ": "l",
                "ꞁ": "l",
                "ꝇ": "l",
                "ǉ": "lj",
                "ⓜ": "m",
                "ｍ": "m",
                "ḿ": "m",
                "ṁ": "m",
                "ṃ": "m",
                "ɱ": "m",
                "ɯ": "m",
                "ⓝ": "n",
                "ｎ": "n",
                "ǹ": "n",
                "ń": "n",
                "ñ": "n",
                "ṅ": "n",
                "ň": "n",
                "ṇ": "n",
                "ņ": "n",
                "ṋ": "n",
                "ṉ": "n",
                "ƞ": "n",
                "ɲ": "n",
                "ŉ": "n",
                "ꞑ": "n",
                "ꞥ": "n",
                "ǌ": "nj",
                "ⓞ": "o",
                "ｏ": "o",
                "ò": "o",
                "ó": "o",
                "ô": "o",
                "ồ": "o",
                "ố": "o",
                "ỗ": "o",
                "ổ": "o",
                "õ": "o",
                "ṍ": "o",
                "ȭ": "o",
                "ṏ": "o",
                "ō": "o",
                "ṑ": "o",
                "ṓ": "o",
                "ŏ": "o",
                "ȯ": "o",
                "ȱ": "o",
                "ö": "o",
                "ȫ": "o",
                "ỏ": "o",
                "ő": "o",
                "ǒ": "o",
                "ȍ": "o",
                "ȏ": "o",
                "ơ": "o",
                "ờ": "o",
                "ớ": "o",
                "ỡ": "o",
                "ở": "o",
                "ợ": "o",
                "ọ": "o",
                "ộ": "o",
                "ǫ": "o",
                "ǭ": "o",
                "ø": "o",
                "ǿ": "o",
                "ɔ": "o",
                "ꝋ": "o",
                "ꝍ": "o",
                "ɵ": "o",
                "ƣ": "oi",
                "ȣ": "ou",
                "ꝏ": "oo",
                "ⓟ": "p",
                "ｐ": "p",
                "ṕ": "p",
                "ṗ": "p",
                "ƥ": "p",
                "ᵽ": "p",
                "ꝑ": "p",
                "ꝓ": "p",
                "ꝕ": "p",
                "ⓠ": "q",
                "ｑ": "q",
                "ɋ": "q",
                "ꝗ": "q",
                "ꝙ": "q",
                "ⓡ": "r",
                "ｒ": "r",
                "ŕ": "r",
                "ṙ": "r",
                "ř": "r",
                "ȑ": "r",
                "ȓ": "r",
                "ṛ": "r",
                "ṝ": "r",
                "ŗ": "r",
                "ṟ": "r",
                "ɍ": "r",
                "ɽ": "r",
                "ꝛ": "r",
                "ꞧ": "r",
                "ꞃ": "r",
                "ⓢ": "s",
                "ｓ": "s",
                "ß": "s",
                "ś": "s",
                "ṥ": "s",
                "ŝ": "s",
                "ṡ": "s",
                "š": "s",
                "ṧ": "s",
                "ṣ": "s",
                "ṩ": "s",
                "ș": "s",
                "ş": "s",
                "ȿ": "s",
                "ꞩ": "s",
                "ꞅ": "s",
                "ẛ": "s",
                "ⓣ": "t",
                "ｔ": "t",
                "ṫ": "t",
                "ẗ": "t",
                "ť": "t",
                "ṭ": "t",
                "ț": "t",
                "ţ": "t",
                "ṱ": "t",
                "ṯ": "t",
                "ŧ": "t",
                "ƭ": "t",
                "ʈ": "t",
                "ⱦ": "t",
                "ꞇ": "t",
                "ꜩ": "tz",
                "ⓤ": "u",
                "ｕ": "u",
                "ù": "u",
                "ú": "u",
                "û": "u",
                "ũ": "u",
                "ṹ": "u",
                "ū": "u",
                "ṻ": "u",
                "ŭ": "u",
                "ü": "u",
                "ǜ": "u",
                "ǘ": "u",
                "ǖ": "u",
                "ǚ": "u",
                "ủ": "u",
                "ů": "u",
                "ű": "u",
                "ǔ": "u",
                "ȕ": "u",
                "ȗ": "u",
                "ư": "u",
                "ừ": "u",
                "ứ": "u",
                "ữ": "u",
                "ử": "u",
                "ự": "u",
                "ụ": "u",
                "ṳ": "u",
                "ų": "u",
                "ṷ": "u",
                "ṵ": "u",
                "ʉ": "u",
                "ⓥ": "v",
                "ｖ": "v",
                "ṽ": "v",
                "ṿ": "v",
                "ʋ": "v",
                "ꝟ": "v",
                "ʌ": "v",
                "ꝡ": "vy",
                "ⓦ": "w",
                "ｗ": "w",
                "ẁ": "w",
                "ẃ": "w",
                "ŵ": "w",
                "ẇ": "w",
                "ẅ": "w",
                "ẘ": "w",
                "ẉ": "w",
                "ⱳ": "w",
                "ⓧ": "x",
                "ｘ": "x",
                "ẋ": "x",
                "ẍ": "x",
                "ⓨ": "y",
                "ｙ": "y",
                "ỳ": "y",
                "ý": "y",
                "ŷ": "y",
                "ỹ": "y",
                "ȳ": "y",
                "ẏ": "y",
                "ÿ": "y",
                "ỷ": "y",
                "ẙ": "y",
                "ỵ": "y",
                "ƴ": "y",
                "ɏ": "y",
                "ỿ": "y",
                "ⓩ": "z",
                "ｚ": "z",
                "ź": "z",
                "ẑ": "z",
                "ż": "z",
                "ž": "z",
                "ẓ": "z",
                "ẕ": "z",
                "ƶ": "z",
                "ȥ": "z",
                "ɀ": "z",
                "ⱬ": "z",
                "ꝣ": "z",
                "Ά": "Α",
                "Έ": "Ε",
                "Ή": "Η",
                "Ί": "Ι",
                "Ϊ": "Ι",
                "Ό": "Ο",
                "Ύ": "Υ",
                "Ϋ": "Υ",
                "Ώ": "Ω",
                "ά": "α",
                "έ": "ε",
                "ή": "η",
                "ί": "ι",
                "ϊ": "ι",
                "ΐ": "ι",
                "ό": "ο",
                "ύ": "υ",
                "ϋ": "υ",
                "ΰ": "υ",
                "ω": "ω",
                "ς": "σ"
            };
            return e
        });
        t.define("select2/data/base", ["../utils"], function(e) {
            function t(e, i) {
                t.__super__.constructor.call(this)
            }
            e.Extend(t, e.Observable);
            t.prototype.current = function(e) {
                throw new Error("The `current` method must be defined in child classes.")
            }
            ;
            t.prototype.query = function(e, t) {
                throw new Error("The `query` method must be defined in child classes.")
            }
            ;
            t.prototype.bind = function(e, t) {}
            ;
            t.prototype.destroy = function() {}
            ;
            t.prototype.generateResultId = function(t, i) {
                var n = t.id + "-result-";
                n += e.generateChars(4);
                if (i.id != null) {
                    n += "-" + i.id.toString()
                } else {
                    n += "-" + e.generateChars(4)
                }
                return n
            }
            ;
            return t
        });
        t.define("select2/data/select", ["./base", "../utils", "jquery"], function(e, t, i) {
            function n(e, t) {
                this.$element = e;
                this.options = t;
                n.__super__.constructor.call(this)
            }
            t.Extend(n, e);
            n.prototype.current = function(e) {
                var t = [];
                var n = this;
                this.$element.find(":selected").each(function() {
                    var e = i(this);
                    var r = n.item(e);
                    t.push(r)
                });
                e(t)
            }
            ;
            n.prototype.select = function(e) {
                var t = this;
                e.selected = true;
                if (i(e.element).is("option")) {
                    e.element.selected = true;
                    this.$element.trigger("change");
                    return
                }
                if (this.$element.prop("multiple")) {
                    this.current(function(n) {
                        var r = [];
                        e = [e];
                        e.push.apply(e, n);
                        for (var o = 0; o < e.length; o++) {
                            var s = e[o].id;
                            if (i.inArray(s, r) === -1) {
                                r.push(s)
                            }
                        }
                        t.$element.val(r);
                        t.$element.trigger("change")
                    })
                } else {
                    var n = e.id;
                    this.$element.val(n);
                    this.$element.trigger("change")
                }
            }
            ;
            n.prototype.unselect = function(e) {
                var t = this;
                if (!this.$element.prop("multiple")) {
                    return
                }
                e.selected = false;
                if (i(e.element).is("option")) {
                    e.element.selected = false;
                    this.$element.trigger("change");
                    return
                }
                this.current(function(n) {
                    var r = [];
                    for (var o = 0; o < n.length; o++) {
                        var s = n[o].id;
                        if (s !== e.id && i.inArray(s, r) === -1) {
                            r.push(s)
                        }
                    }
                    t.$element.val(r);
                    t.$element.trigger("change")
                })
            }
            ;
            n.prototype.bind = function(e, t) {
                var i = this;
                this.container = e;
                e.on("select", function(e) {
                    i.select(e.data)
                });
                e.on("unselect", function(e) {
                    i.unselect(e.data)
                })
            }
            ;
            n.prototype.destroy = function() {
                this.$element.find("*").each(function() {
                    t.RemoveData(this)
                })
            }
            ;
            n.prototype.query = function(e, t) {
                var n = [];
                var r = this;
                var o = this.$element.children();
                o.each(function() {
                    var t = i(this);
                    if (!t.is("option") && !t.is("optgroup")) {
                        return
                    }
                    var o = r.item(t);
                    var s = r.matches(e, o);
                    if (s !== null) {
                        n.push(s)
                    }
                });
                t({
                    results: n
                })
            }
            ;
            n.prototype.addOptions = function(e) {
                t.appendMany(this.$element, e)
            }
            ;
            n.prototype.option = function(e) {
                var n;
                if (e.children) {
                    n = document.createElement("optgroup");
                    n.label = e.text
                } else {
                    n = document.createElement("option");
                    if (n.textContent !== undefined) {
                        n.textContent = e.text
                    } else {
                        n.innerText = e.text
                    }
                }
                if (e.id !== undefined) {
                    n.value = e.id
                }
                if (e.disabled) {
                    n.disabled = true
                }
                if (e.selected) {
                    n.selected = true
                }
                if (e.title) {
                    n.title = e.title
                }
                var r = i(n);
                var o = this._normalizeItem(e);
                o.element = n;
                t.StoreData(n, "data", o);
                return r
            }
            ;
            n.prototype.item = function(e) {
                var n = {};
                n = t.GetData(e[0], "data");
                if (n != null) {
                    return n
                }
                if (e.is("option")) {
                    n = {
                        id: e.val(),
                        text: e.text(),
                        disabled: e.prop("disabled"),
                        selected: e.prop("selected"),
                        title: e.prop("title")
                    }
                } else if (e.is("optgroup")) {
                    n = {
                        text: e.prop("label"),
                        children: [],
                        title: e.prop("title")
                    };
                    var r = e.children("option");
                    var o = [];
                    for (var s = 0; s < r.length; s++) {
                        var a = i(r[s]);
                        var l = this.item(a);
                        o.push(l)
                    }
                    n.children = o
                }
                n = this._normalizeItem(n);
                n.element = e[0];
                t.StoreData(e[0], "data", n);
                return n
            }
            ;
            n.prototype._normalizeItem = function(e) {
                if (e !== Object(e)) {
                    e = {
                        id: e,
                        text: e
                    }
                }
                e = i.extend({}, {
                    text: ""
                }, e);
                var t = {
                    selected: false,
                    disabled: false
                };
                if (e.id != null) {
                    e.id = e.id.toString()
                }
                if (e.text != null) {
                    e.text = e.text.toString()
                }
                if (e._resultId == null && e.id && this.container != null) {
                    e._resultId = this.generateResultId(this.container, e)
                }
                return i.extend({}, t, e)
            }
            ;
            n.prototype.matches = function(e, t) {
                var i = this.options.get("matcher");
                return i(e, t)
            }
            ;
            return n
        });
        t.define("select2/data/array", ["./select", "../utils", "jquery"], function(e, t, i) {
            function n(e, t) {
                var i = t.get("data") || [];
                n.__super__.constructor.call(this, e, t);
                this.addOptions(this.convertToOptions(i))
            }
            t.Extend(n, e);
            n.prototype.select = function(e) {
                var t = this.$element.find("option").filter(function(t, i) {
                    return i.value == e.id.toString()
                });
                if (t.length === 0) {
                    t = this.option(e);
                    this.addOptions(t)
                }
                n.__super__.select.call(this, e)
            }
            ;
            n.prototype.convertToOptions = function(e) {
                var n = this;
                var r = this.$element.find("option");
                var o = r.map(function() {
                    return n.item(i(this)).id
                }).get();
                var s = [];
                function a(e) {
                    return function() {
                        return i(this).val() == e.id
                    }
                }
                for (var l = 0; l < e.length; l++) {
                    var u = this._normalizeItem(e[l]);
                    if (i.inArray(u.id, o) >= 0) {
                        var c = r.filter(a(u));
                        var d = this.item(c);
                        var f = i.extend(true, {}, u, d);
                        var p = this.option(f);
                        c.replaceWith(p);
                        continue
                    }
                    var h = this.option(u);
                    if (u.children) {
                        var g = this.convertToOptions(u.children);
                        t.appendMany(h, g)
                    }
                    s.push(h)
                }
                return s
            }
            ;
            return n
        });
        t.define("select2/data/ajax", ["./array", "../utils", "jquery"], function(e, t, i) {
            function n(e, t) {
                this.ajaxOptions = this._applyDefaults(t.get("ajax"));
                if (this.ajaxOptions.processResults != null) {
                    this.processResults = this.ajaxOptions.processResults
                }
                n.__super__.constructor.call(this, e, t)
            }
            t.Extend(n, e);
            n.prototype._applyDefaults = function(e) {
                var t = {
                    data: function(e) {
                        return i.extend({}, e, {
                            q: e.term
                        })
                    },
                    transport: function(e, t, n) {
                        var r = i.ajax(e);
                        r.then(t);
                        r.fail(n);
                        return r
                    }
                };
                return i.extend({}, t, e, true)
            }
            ;
            n.prototype.processResults = function(e) {
                return e
            }
            ;
            n.prototype.query = function(e, t) {
                var n = [];
                var r = this;
                if (this._request != null) {
                    if (i.isFunction(this._request.abort)) {
                        this._request.abort()
                    }
                    this._request = null
                }
                var o = i.extend({
                    type: "GET"
                }, this.ajaxOptions);
                if (typeof o.url === "function") {
                    o.url = o.url.call(this.$element, e)
                }
                if (typeof o.data === "function") {
                    o.data = o.data.call(this.$element, e)
                }
                function s() {
                    var n = o.transport(o, function(n) {
                        var o = r.processResults(n, e);
                        if (r.options.get("debug") && window.console && console.error) {
                            if (!o || !o.results || !i.isArray(o.results)) {
                                console.error("Select2: The AJAX results did not return an array in the " + "`results` key of the response.")
                            }
                        }
                        t(o)
                    }, function() {
                        if ("status"in n && (n.status === 0 || n.status === "0")) {
                            return
                        }
                        r.trigger("results:message", {
                            message: "errorLoading"
                        })
                    });
                    r._request = n
                }
                if (this.ajaxOptions.delay && e.term != null) {
                    if (this._queryTimeout) {
                        window.clearTimeout(this._queryTimeout)
                    }
                    this._queryTimeout = window.setTimeout(s, this.ajaxOptions.delay)
                } else {
                    s()
                }
            }
            ;
            return n
        });
        t.define("select2/data/tags", ["jquery"], function(e) {
            function t(t, i, n) {
                var r = n.get("tags");
                var o = n.get("createTag");
                if (o !== undefined) {
                    this.createTag = o
                }
                var s = n.get("insertTag");
                if (s !== undefined) {
                    this.insertTag = s
                }
                t.call(this, i, n);
                if (e.isArray(r)) {
                    for (var a = 0; a < r.length; a++) {
                        var l = r[a];
                        var u = this._normalizeItem(l);
                        var c = this.option(u);
                        this.$element.append(c)
                    }
                }
            }
            t.prototype.query = function(e, t, i) {
                var n = this;
                this._removeOldTags();
                if (t.term == null || t.page != null) {
                    e.call(this, t, i);
                    return
                }
                function r(e, o) {
                    var s = e.results;
                    for (var a = 0; a < s.length; a++) {
                        var l = s[a];
                        var u = l.children != null && !r({
                            results: l.children
                        }, true);
                        var c = (l.text || "").toUpperCase();
                        var d = (t.term || "").toUpperCase();
                        var f = c === d;
                        if (f || u) {
                            if (o) {
                                return false
                            }
                            e.data = s;
                            i(e);
                            return
                        }
                    }
                    if (o) {
                        return true
                    }
                    var p = n.createTag(t);
                    if (p != null) {
                        var h = n.option(p);
                        h.attr("data-select2-tag", true);
                        n.addOptions([h]);
                        n.insertTag(s, p)
                    }
                    e.results = s;
                    i(e)
                }
                e.call(this, t, r)
            }
            ;
            t.prototype.createTag = function(t, i) {
                var n = e.trim(i.term);
                if (n === "") {
                    return null
                }
                return {
                    id: n,
                    text: n
                }
            }
            ;
            t.prototype.insertTag = function(e, t, i) {
                t.unshift(i)
            }
            ;
            t.prototype._removeOldTags = function(t) {
                var i = this._lastTag;
                var n = this.$element.find("option[data-select2-tag]");
                n.each(function() {
                    if (this.selected) {
                        return
                    }
                    e(this).remove()
                })
            }
            ;
            return t
        });
        t.define("select2/data/tokenizer", ["jquery"], function(e) {
            function t(e, t, i) {
                var n = i.get("tokenizer");
                if (n !== undefined) {
                    this.tokenizer = n
                }
                e.call(this, t, i)
            }
            t.prototype.bind = function(e, t, i) {
                e.call(this, t, i);
                this.$search = t.dropdown.$search || t.selection.$search || i.find(".select2-search__field")
            }
            ;
            t.prototype.query = function(t, i, n) {
                var r = this;
                function o(t) {
                    var i = r._normalizeItem(t);
                    var n = r.$element.find("option").filter(function() {
                        return e(this).val() === i.id
                    });
                    if (!n.length) {
                        var o = r.option(i);
                        o.attr("data-select2-tag", true);
                        r._removeOldTags();
                        r.addOptions([o])
                    }
                    s(i)
                }
                function s(e) {
                    r.trigger("select", {
                        data: e
                    })
                }
                i.term = i.term || "";
                var a = this.tokenizer(i, this.options, o);
                if (a.term !== i.term) {
                    if (this.$search.length) {
                        this.$search.val(a.term);
                        this.$search.focus()
                    }
                    i.term = a.term
                }
                t.call(this, i, n)
            }
            ;
            t.prototype.tokenizer = function(t, i, n, r) {
                var o = n.get("tokenSeparators") || [];
                var s = i.term;
                var a = 0;
                var l = this.createTag || function(e) {
                    return {
                        id: e.term,
                        text: e.term
                    }
                }
                ;
                while (a < s.length) {
                    var u = s[a];
                    if (e.inArray(u, o) === -1) {
                        a++;
                        continue
                    }
                    var c = s.substr(0, a);
                    var d = e.extend({}, i, {
                        term: c
                    });
                    var f = l(d);
                    if (f == null) {
                        a++;
                        continue
                    }
                    r(f);
                    s = s.substr(a + 1) || "";
                    a = 0
                }
                return {
                    term: s
                }
            }
            ;
            return t
        });
        t.define("select2/data/minimumInputLength", [], function() {
            function e(e, t, i) {
                this.minimumInputLength = i.get("minimumInputLength");
                e.call(this, t, i)
            }
            e.prototype.query = function(e, t, i) {
                t.term = t.term || "";
                if (t.term.length < this.minimumInputLength) {
                    this.trigger("results:message", {
                        message: "inputTooShort",
                        args: {
                            minimum: this.minimumInputLength,
                            input: t.term,
                            params: t
                        }
                    });
                    return
                }
                e.call(this, t, i)
            }
            ;
            return e
        });
        t.define("select2/data/maximumInputLength", [], function() {
            function e(e, t, i) {
                this.maximumInputLength = i.get("maximumInputLength");
                e.call(this, t, i)
            }
            e.prototype.query = function(e, t, i) {
                t.term = t.term || "";
                if (this.maximumInputLength > 0 && t.term.length > this.maximumInputLength) {
                    this.trigger("results:message", {
                        message: "inputTooLong",
                        args: {
                            maximum: this.maximumInputLength,
                            input: t.term,
                            params: t
                        }
                    });
                    return
                }
                e.call(this, t, i)
            }
            ;
            return e
        });
        t.define("select2/data/maximumSelectionLength", [], function() {
            function e(e, t, i) {
                this.maximumSelectionLength = i.get("maximumSelectionLength");
                e.call(this, t, i)
            }
            e.prototype.query = function(e, t, i) {
                var n = this;
                this.current(function(r) {
                    var o = r != null ? r.length : 0;
                    if (n.maximumSelectionLength > 0 && o >= n.maximumSelectionLength) {
                        n.trigger("results:message", {
                            message: "maximumSelected",
                            args: {
                                maximum: n.maximumSelectionLength
                            }
                        });
                        return
                    }
                    e.call(n, t, i)
                })
            }
            ;
            return e
        });
        t.define("select2/dropdown", ["jquery", "./utils"], function(e, t) {
            function i(e, t) {
                this.$element = e;
                this.options = t;
                i.__super__.constructor.call(this)
            }
            t.Extend(i, t.Observable);
            i.prototype.render = function() {
                var t = e('<span class="select2-dropdown">' + '<span class="select2-results"></span>' + "</span>");
                t.attr("dir", this.options.get("dir"));
                this.$dropdown = t;
                return t
            }
            ;
            i.prototype.bind = function() {}
            ;
            i.prototype.position = function(e, t) {}
            ;
            i.prototype.destroy = function() {
                this.$dropdown.remove()
            }
            ;
            return i
        });
        t.define("select2/dropdown/search", ["jquery", "../utils"], function(e, t) {
            function i() {}
            i.prototype.render = function(t) {
                var i = t.call(this);
                var n = e('<span class="select2-search select2-search--dropdown">' + '<input class="select2-search__field" type="search" tabindex="-1"' + ' autocomplete="off" autocorrect="off" autocapitalize="none"' + ' spellcheck="false" role="textbox" />' + "</span>");
                this.$searchContainer = n;
                this.$search = n.find("input");
                i.prepend(n);
                return i
            }
            ;
            i.prototype.bind = function(t, i, n) {
                var r = this;
                t.call(this, i, n);
                this.$search.on("keydown", function(e) {
                    r.trigger("keypress", e);
                    r._keyUpPrevented = e.isDefaultPrevented()
                });
                this.$search.on("input", function(t) {
                    e(this).off("keyup")
                });
                this.$search.on("keyup input", function(e) {
                    r.handleSearch(e)
                });
                i.on("open", function() {
                    r.$search.attr("tabindex", 0);
                    r.$search.focus();
                    window.setTimeout(function() {
                        r.$search.focus()
                    }, 0)
                });
                i.on("close", function() {
                    r.$search.attr("tabindex", -1);
                    r.$search.val("");
                    r.$search.blur()
                });
                i.on("focus", function() {
                    if (!i.isOpen()) {
                        r.$search.focus()
                    }
                });
                i.on("results:all", function(e) {
                    if (e.query.term == null || e.query.term === "") {
                        var t = r.showSearch(e);
                        if (t) {
                            r.$searchContainer.removeClass("select2-search--hide")
                        } else {
                            r.$searchContainer.addClass("select2-search--hide")
                        }
                    }
                })
            }
            ;
            i.prototype.handleSearch = function(e) {
                if (!this._keyUpPrevented) {
                    var t = this.$search.val();
                    this.trigger("query", {
                        term: t
                    })
                }
                this._keyUpPrevented = false
            }
            ;
            i.prototype.showSearch = function(e, t) {
                return true
            }
            ;
            return i
        });
        t.define("select2/dropdown/hidePlaceholder", [], function() {
            function e(e, t, i, n) {
                this.placeholder = this.normalizePlaceholder(i.get("placeholder"));
                e.call(this, t, i, n)
            }
            e.prototype.append = function(e, t) {
                t.results = this.removePlaceholder(t.results);
                e.call(this, t)
            }
            ;
            e.prototype.normalizePlaceholder = function(e, t) {
                if (typeof t === "string") {
                    t = {
                        id: "",
                        text: t
                    }
                }
                return t
            }
            ;
            e.prototype.removePlaceholder = function(e, t) {
                var i = t.slice(0);
                for (var n = t.length - 1; n >= 0; n--) {
                    var r = t[n];
                    if (this.placeholder.id === r.id) {
                        i.splice(n, 1)
                    }
                }
                return i
            }
            ;
            return e
        });
        t.define("select2/dropdown/infiniteScroll", ["jquery"], function(e) {
            function t(e, t, i, n) {
                this.lastParams = {};
                e.call(this, t, i, n);
                this.$loadingMore = this.createLoadingMore();
                this.loading = false
            }
            t.prototype.append = function(e, t) {
                this.$loadingMore.remove();
                this.loading = false;
                e.call(this, t);
                if (this.showLoadingMore(t)) {
                    this.$results.append(this.$loadingMore)
                }
            }
            ;
            t.prototype.bind = function(t, i, n) {
                var r = this;
                t.call(this, i, n);
                i.on("query", function(e) {
                    r.lastParams = e;
                    r.loading = true
                });
                i.on("query:append", function(e) {
                    r.lastParams = e;
                    r.loading = true
                });
                this.$results.on("scroll", function() {
                    var t = e.contains(document.documentElement, r.$loadingMore[0]);
                    if (r.loading || !t) {
                        return
                    }
                    var i = r.$results.offset().top + r.$results.outerHeight(false);
                    var n = r.$loadingMore.offset().top + r.$loadingMore.outerHeight(false);
                    if (i + 50 >= n) {
                        r.loadMore()
                    }
                })
            }
            ;
            t.prototype.loadMore = function() {
                this.loading = true;
                var t = e.extend({}, {
                    page: 1
                }, this.lastParams);
                t.page++;
                this.trigger("query:append", t)
            }
            ;
            t.prototype.showLoadingMore = function(e, t) {
                return t.pagination && t.pagination.more
            }
            ;
            t.prototype.createLoadingMore = function() {
                var t = e("<li " + 'class="select2-results__option select2-results__option--load-more"' + 'role="treeitem" aria-disabled="true"></li>');
                var i = this.options.get("translations").get("loadingMore");
                t.html(i(this.lastParams));
                return t
            }
            ;
            return t
        });
        t.define("select2/dropdown/attachBody", ["jquery", "../utils"], function(e, t) {
            function i(t, i, n) {
                this.$dropdownParent = n.get("dropdownParent") || e(document.body);
                t.call(this, i, n)
            }
            i.prototype.bind = function(e, t, i) {
                var n = this;
                var r = false;
                e.call(this, t, i);
                t.on("open", function() {
                    n._showDropdown();
                    n._attachPositioningHandler(t);
                    if (!r) {
                        r = true;
                        t.on("results:all", function() {
                            n._positionDropdown();
                            n._resizeDropdown()
                        });
                        t.on("results:append", function() {
                            n._positionDropdown();
                            n._resizeDropdown()
                        })
                    }
                });
                t.on("close", function() {
                    n._hideDropdown();
                    n._detachPositioningHandler(t)
                });
                this.$dropdownContainer.on("mousedown", function(e) {
                    e.stopPropagation()
                })
            }
            ;
            i.prototype.destroy = function(e) {
                e.call(this);
                this.$dropdownContainer.remove()
            }
            ;
            i.prototype.position = function(e, t, i) {
                t.attr("class", i.attr("class"));
                t.removeClass("select2");
                t.addClass("select2-container--open");
                t.css({
                    position: "absolute",
                    top: -999999
                });
                this.$container = i
            }
            ;
            i.prototype.render = function(t) {
                var i = e("<span></span>");
                var n = t.call(this);
                i.append(n);
                this.$dropdownContainer = i;
                return i
            }
            ;
            i.prototype._hideDropdown = function(e) {
                this.$dropdownContainer.detach()
            }
            ;
            i.prototype._attachPositioningHandler = function(i, n) {
                var r = this;
                var o = "scroll.select2." + n.id;
                var s = "resize.select2." + n.id;
                var a = "orientationchange.select2." + n.id;
                var l = this.$container.parents().filter(t.hasScroll);
                l.each(function() {
                    t.StoreData(this, "select2-scroll-position", {
                        x: e(this).scrollLeft(),
                        y: e(this).scrollTop()
                    })
                });
                l.on(o, function(i) {
                    var n = t.GetData(this, "select2-scroll-position");
                    e(this).scrollTop(n.y)
                });
                e(window).on(o + " " + s + " " + a, function(e) {
                    r._positionDropdown();
                    r._resizeDropdown()
                })
            }
            ;
            i.prototype._detachPositioningHandler = function(i, n) {
                var r = "scroll.select2." + n.id;
                var o = "resize.select2." + n.id;
                var s = "orientationchange.select2." + n.id;
                var a = this.$container.parents().filter(t.hasScroll);
                a.off(r);
                e(window).off(r + " " + o + " " + s)
            }
            ;
            i.prototype._positionDropdown = function() {
                var t = e(window);
                var i = this.$dropdown.hasClass("select2-dropdown--above");
                var n = this.$dropdown.hasClass("select2-dropdown--below");
                var r = null;
                var o = this.$container.offset();
                o.bottom = o.top + this.$container.outerHeight(false);
                var s = {
                    height: this.$container.outerHeight(false)
                };
                s.top = o.top;
                s.bottom = o.top + s.height;
                var a = {
                    height: this.$dropdown.outerHeight(false)
                };
                var l = {
                    top: t.scrollTop(),
                    bottom: t.scrollTop() + t.height()
                };
                var u = l.top < o.top - a.height;
                var c = l.bottom > o.bottom + a.height;
                var d = {
                    left: o.left,
                    top: s.bottom
                };
                var f = this.$dropdownParent;
                if (f.css("position") === "static") {
                    f = f.offsetParent()
                }
                var p = f.offset();
                d.top -= p.top;
                d.left -= p.left;
                if (!i && !n) {
                    r = "below"
                }
                if (!c && u && !i) {
                    r = "above"
                } else if (!u && c && i) {
                    r = "below"
                }
                if (r == "above" || i && r !== "below") {
                    d.top = s.top - p.top - a.height
                }
                if (r != null) {
                    this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--" + r);
                    this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--" + r)
                }
                this.$dropdownContainer.css(d)
            }
            ;
            i.prototype._resizeDropdown = function() {
                var e = {
                    width: this.$container.outerWidth(false) + "px"
                };
                if (this.options.get("dropdownAutoWidth")) {
                    e.minWidth = e.width;
                    e.position = "relative";
                    e.width = "auto"
                }
                this.$dropdown.css(e)
            }
            ;
            i.prototype._showDropdown = function(e) {
                this.$dropdownContainer.appendTo(this.$dropdownParent);
                this._positionDropdown();
                this._resizeDropdown()
            }
            ;
            return i
        });
        t.define("select2/dropdown/minimumResultsForSearch", [], function() {
            function e(t) {
                var i = 0;
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    if (r.children) {
                        i += e(r.children)
                    } else {
                        i++
                    }
                }
                return i
            }
            function t(e, t, i, n) {
                this.minimumResultsForSearch = i.get("minimumResultsForSearch");
                if (this.minimumResultsForSearch < 0) {
                    this.minimumResultsForSearch = Infinity
                }
                e.call(this, t, i, n)
            }
            t.prototype.showSearch = function(t, i) {
                if (e(i.data.results) < this.minimumResultsForSearch) {
                    return false
                }
                return t.call(this, i)
            }
            ;
            return t
        });
        t.define("select2/dropdown/selectOnClose", ["../utils"], function(e) {
            function t() {}
            t.prototype.bind = function(e, t, i) {
                var n = this;
                e.call(this, t, i);
                t.on("close", function(e) {
                    n._handleSelectOnClose(e)
                })
            }
            ;
            t.prototype._handleSelectOnClose = function(t, i) {
                if (i && i.originalSelect2Event != null) {
                    var n = i.originalSelect2Event;
                    if (n._type === "select" || n._type === "unselect") {
                        return
                    }
                }
                var r = this.getHighlightedResults();
                if (r.length < 1) {
                    return
                }
                var o = e.GetData(r[0], "data");
                if (o.element != null && o.element.selected || o.element == null && o.selected) {
                    return
                }
                this.trigger("select", {
                    data: o
                })
            }
            ;
            return t
        });
        t.define("select2/dropdown/closeOnSelect", [], function() {
            function e() {}
            e.prototype.bind = function(e, t, i) {
                var n = this;
                e.call(this, t, i);
                t.on("select", function(e) {
                    n._selectTriggered(e)
                });
                t.on("unselect", function(e) {
                    n._selectTriggered(e)
                })
            }
            ;
            e.prototype._selectTriggered = function(e, t) {
                var i = t.originalEvent;
                if (i && i.ctrlKey) {
                    return
                }
                this.trigger("close", {
                    originalEvent: i,
                    originalSelect2Event: t
                })
            }
            ;
            return e
        });
        t.define("select2/i18n/en", [], function() {
            return {
                errorLoading: function() {
                    return "The results could not be loaded."
                },
                inputTooLong: function(e) {
                    var t = e.input.length - e.maximum;
                    var i = "Please delete " + t + " character";
                    if (t != 1) {
                        i += "s"
                    }
                    return i
                },
                inputTooShort: function(e) {
                    var t = e.minimum - e.input.length;
                    var i = "Please enter " + t + " or more characters";
                    return i
                },
                loadingMore: function() {
                    return "Loading more results…"
                },
                maximumSelected: function(e) {
                    var t = "You can only select " + e.maximum + " item";
                    if (e.maximum != 1) {
                        t += "s"
                    }
                    return t
                },
                noResults: function() {
                    return "No results found"
                },
                searching: function() {
                    return "Searching…"
                }
            }
        });
        t.define("select2/defaults", ["jquery", "require", "./results", "./selection/single", "./selection/multiple", "./selection/placeholder", "./selection/allowClear", "./selection/search", "./selection/eventRelay", "./utils", "./translation", "./diacritics", "./data/select", "./data/array", "./data/ajax", "./data/tags", "./data/tokenizer", "./data/minimumInputLength", "./data/maximumInputLength", "./data/maximumSelectionLength", "./dropdown", "./dropdown/search", "./dropdown/hidePlaceholder", "./dropdown/infiniteScroll", "./dropdown/attachBody", "./dropdown/minimumResultsForSearch", "./dropdown/selectOnClose", "./dropdown/closeOnSelect", "./i18n/en"], function(e, t, i, n, r, o, s, a, l, u, c, d, f, p, h, g, m, v, y, b, w, x, T, C, S, k, $, A, E) {
            function _() {
                this.reset()
            }
            _.prototype.apply = function(d) {
                d = e.extend(true, {}, this.defaults, d);
                if (d.dataAdapter == null) {
                    if (d.ajax != null) {
                        d.dataAdapter = h
                    } else if (d.data != null) {
                        d.dataAdapter = p
                    } else {
                        d.dataAdapter = f
                    }
                    if (d.minimumInputLength > 0) {
                        d.dataAdapter = u.Decorate(d.dataAdapter, v)
                    }
                    if (d.maximumInputLength > 0) {
                        d.dataAdapter = u.Decorate(d.dataAdapter, y)
                    }
                    if (d.maximumSelectionLength > 0) {
                        d.dataAdapter = u.Decorate(d.dataAdapter, b)
                    }
                    if (d.tags) {
                        d.dataAdapter = u.Decorate(d.dataAdapter, g)
                    }
                    if (d.tokenSeparators != null || d.tokenizer != null) {
                        d.dataAdapter = u.Decorate(d.dataAdapter, m)
                    }
                    if (d.query != null) {
                        var E = t(d.amdBase + "compat/query");
                        d.dataAdapter = u.Decorate(d.dataAdapter, E)
                    }
                    if (d.initSelection != null) {
                        var _ = t(d.amdBase + "compat/initSelection");
                        d.dataAdapter = u.Decorate(d.dataAdapter, _)
                    }
                }
                if (d.resultsAdapter == null) {
                    d.resultsAdapter = i;
                    if (d.ajax != null) {
                        d.resultsAdapter = u.Decorate(d.resultsAdapter, C)
                    }
                    if (d.placeholder != null) {
                        d.resultsAdapter = u.Decorate(d.resultsAdapter, T)
                    }
                    if (d.selectOnClose) {
                        d.resultsAdapter = u.Decorate(d.resultsAdapter, $)
                    }
                }
                if (d.dropdownAdapter == null) {
                    if (d.multiple) {
                        d.dropdownAdapter = w
                    } else {
                        var D = u.Decorate(w, x);
                        d.dropdownAdapter = D
                    }
                    if (d.minimumResultsForSearch !== 0) {
                        d.dropdownAdapter = u.Decorate(d.dropdownAdapter, k)
                    }
                    if (d.closeOnSelect) {
                        d.dropdownAdapter = u.Decorate(d.dropdownAdapter, A)
                    }
                    if (d.dropdownCssClass != null || d.dropdownCss != null || d.adaptDropdownCssClass != null) {
                        var O = t(d.amdBase + "compat/dropdownCss");
                        d.dropdownAdapter = u.Decorate(d.dropdownAdapter, O)
                    }
                    d.dropdownAdapter = u.Decorate(d.dropdownAdapter, S)
                }
                if (d.selectionAdapter == null) {
                    if (d.multiple) {
                        d.selectionAdapter = r
                    } else {
                        d.selectionAdapter = n
                    }
                    if (d.placeholder != null) {
                        d.selectionAdapter = u.Decorate(d.selectionAdapter, o)
                    }
                    if (d.allowClear) {
                        d.selectionAdapter = u.Decorate(d.selectionAdapter, s)
                    }
                    if (d.multiple) {
                        d.selectionAdapter = u.Decorate(d.selectionAdapter, a)
                    }
                    if (d.containerCssClass != null || d.containerCss != null || d.adaptContainerCssClass != null) {
                        var I = t(d.amdBase + "compat/containerCss");
                        d.selectionAdapter = u.Decorate(d.selectionAdapter, I)
                    }
                    d.selectionAdapter = u.Decorate(d.selectionAdapter, l)
                }
                if (typeof d.language === "string") {
                    if (d.language.indexOf("-") > 0) {
                        var L = d.language.split("-");
                        var N = L[0];
                        d.language = [d.language, N]
                    } else {
                        d.language = [d.language]
                    }
                }
                if (e.isArray(d.language)) {
                    var j = new c;
                    d.language.push("en");
                    var P = d.language;
                    for (var q = 0; q < P.length; q++) {
                        var H = P[q];
                        var M = {};
                        try {
                            M = c.loadPath(H)
                        } catch (e) {
                            try {
                                H = this.defaults.amdLanguageBase + H;
                                M = c.loadPath(H)
                            } catch (e) {
                                if (d.debug && window.console && console.warn) {
                                    console.warn('Select2: The language file for "' + H + '" could not be ' + "automatically loaded. A fallback will be used instead.")
                                }
                                continue
                            }
                        }
                        j.extend(M)
                    }
                    d.translations = j
                } else {
                    var R = c.loadPath(this.defaults.amdLanguageBase + "en");
                    var z = new c(d.language);
                    z.extend(R);
                    d.translations = z
                }
                return d
            }
            ;
            _.prototype.reset = function() {
                function t(e) {
                    function t(e) {
                        return d[e] || e
                    }
                    return e.replace(/[^\u0000-\u007E]/g, t)
                }
                function i(n, r) {
                    if (e.trim(n.term) === "") {
                        return r
                    }
                    if (r.children && r.children.length > 0) {
                        var o = e.extend(true, {}, r);
                        for (var s = r.children.length - 1; s >= 0; s--) {
                            var a = r.children[s];
                            var l = i(n, a);
                            if (l == null) {
                                o.children.splice(s, 1)
                            }
                        }
                        if (o.children.length > 0) {
                            return o
                        }
                        return i(n, o)
                    }
                    var u = t(r.text).toUpperCase();
                    var c = t(n.term).toUpperCase();
                    if (u.indexOf(c) > -1) {
                        return r
                    }
                    return null
                }
                this.defaults = {
                    amdBase: "./",
                    amdLanguageBase: "./i18n/",
                    closeOnSelect: true,
                    debug: false,
                    dropdownAutoWidth: false,
                    escapeMarkup: u.escapeMarkup,
                    language: E,
                    matcher: i,
                    minimumInputLength: 0,
                    maximumInputLength: 0,
                    maximumSelectionLength: 0,
                    minimumResultsForSearch: 0,
                    selectOnClose: false,
                    sorter: function(e) {
                        return e
                    },
                    templateResult: function(e) {
                        return e.text
                    },
                    templateSelection: function(e) {
                        return e.text
                    },
                    theme: "default",
                    width: "resolve"
                }
            }
            ;
            _.prototype.set = function(t, i) {
                var n = e.camelCase(t);
                var r = {};
                r[n] = i;
                var o = u._convertData(r);
                e.extend(true, this.defaults, o)
            }
            ;
            var D = new _;
            return D
        });
        t.define("select2/options", ["require", "jquery", "./defaults", "./utils"], function(e, t, i, n) {
            function r(t, r) {
                this.options = t;
                if (r != null) {
                    this.fromElement(r)
                }
                this.options = i.apply(this.options);
                if (r && r.is("input")) {
                    var o = e(this.get("amdBase") + "compat/inputData");
                    this.options.dataAdapter = n.Decorate(this.options.dataAdapter, o)
                }
            }
            r.prototype.fromElement = function(e) {
                var i = ["select2"];
                if (this.options.multiple == null) {
                    this.options.multiple = e.prop("multiple")
                }
                if (this.options.disabled == null) {
                    this.options.disabled = e.prop("disabled")
                }
                if (this.options.language == null) {
                    if (e.prop("lang")) {
                        this.options.language = e.prop("lang").toLowerCase()
                    } else if (e.closest("[lang]").prop("lang")) {
                        this.options.language = e.closest("[lang]").prop("lang")
                    }
                }
                if (this.options.dir == null) {
                    if (e.prop("dir")) {
                        this.options.dir = e.prop("dir")
                    } else if (e.closest("[dir]").prop("dir")) {
                        this.options.dir = e.closest("[dir]").prop("dir")
                    } else {
                        this.options.dir = "ltr"
                    }
                }
                e.prop("disabled", this.options.disabled);
                e.prop("multiple", this.options.multiple);
                if (n.GetData(e[0], "select2Tags")) {
                    if (this.options.debug && window.console && console.warn) {
                        console.warn("Select2: The `data-select2-tags` attribute has been changed to " + 'use the `data-data` and `data-tags="true"` attributes and will be ' + "removed in future versions of Select2.")
                    }
                    n.StoreData(e[0], "data", n.GetData(e[0], "select2Tags"));
                    n.StoreData(e[0], "tags", true)
                }
                if (n.GetData(e[0], "ajaxUrl")) {
                    if (this.options.debug && window.console && console.warn) {
                        console.warn("Select2: The `data-ajax-url` attribute has been changed to " + "`data-ajax--url` and support for the old attribute will be removed" + " in future versions of Select2.")
                    }
                    e.attr("ajax--url", n.GetData(e[0], "ajaxUrl"));
                    n.StoreData(e[0], "ajax-Url", n.GetData(e[0], "ajaxUrl"))
                }
                var r = {};
                if (t.fn.jquery && t.fn.jquery.substr(0, 2) == "1." && e[0].dataset) {
                    r = t.extend(true, {}, e[0].dataset, n.GetData(e[0]))
                } else {
                    r = n.GetData(e[0])
                }
                var o = t.extend(true, {}, r);
                o = n._convertData(o);
                for (var s in o) {
                    if (t.inArray(s, i) > -1) {
                        continue
                    }
                    if (t.isPlainObject(this.options[s])) {
                        t.extend(this.options[s], o[s])
                    } else {
                        this.options[s] = o[s]
                    }
                }
                return this
            }
            ;
            r.prototype.get = function(e) {
                return this.options[e]
            }
            ;
            r.prototype.set = function(e, t) {
                this.options[e] = t
            }
            ;
            return r
        });
        t.define("select2/core", ["jquery", "./options", "./utils", "./keys"], function(e, t, i, n) {
            var r = function(e, n) {
                if (i.GetData(e[0], "select2") != null) {
                    i.GetData(e[0], "select2").destroy()
                }
                this.$element = e;
                this.id = this._generateId(e);
                n = n || {};
                this.options = new t(n,e);
                r.__super__.constructor.call(this);
                var o = e.attr("tabindex") || 0;
                i.StoreData(e[0], "old-tabindex", o);
                e.attr("tabindex", "-1");
                var s = this.options.get("dataAdapter");
                this.dataAdapter = new s(e,this.options);
                var a = this.render();
                this._placeContainer(a);
                var l = this.options.get("selectionAdapter");
                this.selection = new l(e,this.options);
                this.$selection = this.selection.render();
                this.selection.position(this.$selection, a);
                var u = this.options.get("dropdownAdapter");
                this.dropdown = new u(e,this.options);
                this.$dropdown = this.dropdown.render();
                this.dropdown.position(this.$dropdown, a);
                var c = this.options.get("resultsAdapter");
                this.results = new c(e,this.options,this.dataAdapter);
                this.$results = this.results.render();
                this.results.position(this.$results, this.$dropdown);
                var d = this;
                this._bindAdapters();
                this._registerDomEvents();
                this._registerDataEvents();
                this._registerSelectionEvents();
                this._registerDropdownEvents();
                this._registerResultsEvents();
                this._registerEvents();
                this.dataAdapter.current(function(e) {
                    d.trigger("selection:update", {
                        data: e
                    })
                });
                e.addClass("select2-hidden-accessible");
                e.attr("aria-hidden", "true");
                this._syncAttributes();
                i.StoreData(e[0], "select2", this);
                e.data("select2", this)
            };
            i.Extend(r, i.Observable);
            r.prototype._generateId = function(e) {
                var t = "";
                if (e.attr("id") != null) {
                    t = e.attr("id")
                } else if (e.attr("name") != null) {
                    t = e.attr("name") + "-" + i.generateChars(2)
                } else {
                    t = i.generateChars(4)
                }
                t = t.replace(/(:|\.|\[|\]|,)/g, "");
                t = "select2-" + t;
                return t
            }
            ;
            r.prototype._placeContainer = function(e) {
                e.insertAfter(this.$element);
                var t = this._resolveWidth(this.$element, this.options.get("width"));
                if (t != null) {
                    e.css("width", t)
                }
            }
            ;
            r.prototype._resolveWidth = function(e, t) {
                var i = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;
                if (t == "resolve") {
                    var n = this._resolveWidth(e, "style");
                    if (n != null) {
                        return n
                    }
                    return this._resolveWidth(e, "element")
                }
                if (t == "element") {
                    var r = e.outerWidth(false);
                    if (r <= 0) {
                        return "auto"
                    }
                    return r + "px"
                }
                if (t == "style") {
                    var o = e.attr("style");
                    if (typeof o !== "string") {
                        return null
                    }
                    var s = o.split(";");
                    for (var a = 0, l = s.length; a < l; a = a + 1) {
                        var u = s[a].replace(/\s/g, "");
                        var c = u.match(i);
                        if (c !== null && c.length >= 1) {
                            return c[1]
                        }
                    }
                    return null
                }
                return t
            }
            ;
            r.prototype._bindAdapters = function() {
                this.dataAdapter.bind(this, this.$container);
                this.selection.bind(this, this.$container);
                this.dropdown.bind(this, this.$container);
                this.results.bind(this, this.$container)
            }
            ;
            r.prototype._registerDomEvents = function() {
                var t = this;
                this.$element.on("change.select2", function() {
                    t.dataAdapter.current(function(e) {
                        t.trigger("selection:update", {
                            data: e
                        })
                    })
                });
                this.$element.on("focus.select2", function(e) {
                    t.trigger("focus", e)
                });
                this._syncA = i.bind(this._syncAttributes, this);
                this._syncS = i.bind(this._syncSubtree, this);
                if (this.$element[0].attachEvent) {
                    this.$element[0].attachEvent("onpropertychange", this._syncA)
                }
                var n = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                if (n != null) {
                    this._observer = new n(function(i) {
                        e.each(i, t._syncA);
                        e.each(i, t._syncS)
                    }
                    );
                    this._observer.observe(this.$element[0], {
                        attributes: true,
                        childList: true,
                        subtree: false
                    })
                } else if (this.$element[0].addEventListener) {
                    this.$element[0].addEventListener("DOMAttrModified", t._syncA, false);
                    this.$element[0].addEventListener("DOMNodeInserted", t._syncS, false);
                    this.$element[0].addEventListener("DOMNodeRemoved", t._syncS, false)
                }
            }
            ;
            r.prototype._registerDataEvents = function() {
                var e = this;
                this.dataAdapter.on("*", function(t, i) {
                    e.trigger(t, i)
                })
            }
            ;
            r.prototype._registerSelectionEvents = function() {
                var t = this;
                var i = ["toggle", "focus"];
                this.selection.on("toggle", function() {
                    t.toggleDropdown()
                });
                this.selection.on("focus", function(e) {
                    t.focus(e)
                });
                this.selection.on("*", function(n, r) {
                    if (e.inArray(n, i) !== -1) {
                        return
                    }
                    t.trigger(n, r)
                })
            }
            ;
            r.prototype._registerDropdownEvents = function() {
                var e = this;
                this.dropdown.on("*", function(t, i) {
                    e.trigger(t, i)
                })
            }
            ;
            r.prototype._registerResultsEvents = function() {
                var e = this;
                this.results.on("*", function(t, i) {
                    e.trigger(t, i)
                })
            }
            ;
            r.prototype._registerEvents = function() {
                var e = this;
                this.on("open", function() {
                    e.$container.addClass("select2-container--open")
                });
                this.on("close", function() {
                    e.$container.removeClass("select2-container--open")
                });
                this.on("enable", function() {
                    e.$container.removeClass("select2-container--disabled")
                });
                this.on("disable", function() {
                    e.$container.addClass("select2-container--disabled")
                });
                this.on("blur", function() {
                    e.$container.removeClass("select2-container--focus")
                });
                this.on("query", function(t) {
                    if (!e.isOpen()) {
                        e.trigger("open", {})
                    }
                    this.dataAdapter.query(t, function(i) {
                        e.trigger("results:all", {
                            data: i,
                            query: t
                        })
                    })
                });
                this.on("query:append", function(t) {
                    this.dataAdapter.query(t, function(i) {
                        e.trigger("results:append", {
                            data: i,
                            query: t
                        })
                    })
                });
                this.on("keypress", function(t) {
                    var i = t.which;
                    if (e.isOpen()) {
                        if (i === n.ESC || i === n.TAB || i === n.UP && t.altKey) {
                            e.close();
                            t.preventDefault()
                        } else if (i === n.ENTER) {
                            e.trigger("results:select", {});
                            t.preventDefault()
                        } else if (i === n.SPACE && t.ctrlKey) {
                            e.trigger("results:toggle", {});
                            t.preventDefault()
                        } else if (i === n.UP) {
                            e.trigger("results:previous", {});
                            t.preventDefault()
                        } else if (i === n.DOWN) {
                            e.trigger("results:next", {});
                            t.preventDefault()
                        }
                    } else {
                        if (i === n.ENTER || i === n.SPACE || i === n.DOWN && t.altKey) {
                            e.open();
                            t.preventDefault()
                        }
                    }
                })
            }
            ;
            r.prototype._syncAttributes = function() {
                this.options.set("disabled", this.$element.prop("disabled"));
                if (this.options.get("disabled")) {
                    if (this.isOpen()) {
                        this.close()
                    }
                    this.trigger("disable", {})
                } else {
                    this.trigger("enable", {})
                }
            }
            ;
            r.prototype._syncSubtree = function(e, t) {
                var i = false;
                var n = this;
                if (e && e.target && (e.target.nodeName !== "OPTION" && e.target.nodeName !== "OPTGROUP")) {
                    return
                }
                if (!t) {
                    i = true
                } else if (t.addedNodes && t.addedNodes.length > 0) {
                    for (var r = 0; r < t.addedNodes.length; r++) {
                        var o = t.addedNodes[r];
                        if (o.selected) {
                            i = true
                        }
                    }
                } else if (t.removedNodes && t.removedNodes.length > 0) {
                    i = true
                }
                if (i) {
                    this.dataAdapter.current(function(e) {
                        n.trigger("selection:update", {
                            data: e
                        })
                    })
                }
            }
            ;
            r.prototype.trigger = function(e, t) {
                var i = r.__super__.trigger;
                var n = {
                    open: "opening",
                    close: "closing",
                    select: "selecting",
                    unselect: "unselecting",
                    clear: "clearing"
                };
                if (t === undefined) {
                    t = {}
                }
                if (e in n) {
                    var o = n[e];
                    var s = {
                        prevented: false,
                        name: e,
                        args: t
                    };
                    i.call(this, o, s);
                    if (s.prevented) {
                        t.prevented = true;
                        return
                    }
                }
                i.call(this, e, t)
            }
            ;
            r.prototype.toggleDropdown = function() {
                if (this.options.get("disabled")) {
                    return
                }
                if (this.isOpen()) {
                    this.close()
                } else {
                    this.open()
                }
            }
            ;
            r.prototype.open = function() {
                if (this.isOpen()) {
                    return
                }
                this.trigger("query", {})
            }
            ;
            r.prototype.close = function() {
                if (!this.isOpen()) {
                    return
                }
                this.trigger("close", {})
            }
            ;
            r.prototype.isOpen = function() {
                return this.$container.hasClass("select2-container--open")
            }
            ;
            r.prototype.hasFocus = function() {
                return this.$container.hasClass("select2-container--focus")
            }
            ;
            r.prototype.focus = function(e) {
                if (this.hasFocus()) {
                    return
                }
                this.$container.addClass("select2-container--focus");
                this.trigger("focus", {})
            }
            ;
            r.prototype.enable = function(e) {
                if (this.options.get("debug") && window.console && console.warn) {
                    console.warn('Select2: The `select2("enable")` method has been deprecated and will' + ' be removed in later Select2 versions. Use $element.prop("disabled")' + " instead.")
                }
                if (e == null || e.length === 0) {
                    e = [true]
                }
                var t = !e[0];
                this.$element.prop("disabled", t)
            }
            ;
            r.prototype.data = function() {
                if (this.options.get("debug") && arguments.length > 0 && window.console && console.warn) {
                    console.warn('Select2: Data can no longer be set using `select2("data")`. You ' + "should consider setting the value instead using `$element.val()`.")
                }
                var e = [];
                this.dataAdapter.current(function(t) {
                    e = t
                });
                return e
            }
            ;
            r.prototype.val = function(t) {
                if (this.options.get("debug") && window.console && console.warn) {
                    console.warn('Select2: The `select2("val")` method has been deprecated and will be' + " removed in later Select2 versions. Use $element.val() instead.")
                }
                if (t == null || t.length === 0) {
                    return this.$element.val()
                }
                var i = t[0];
                if (e.isArray(i)) {
                    i = e.map(i, function(e) {
                        return e.toString()
                    })
                }
                this.$element.val(i).trigger("change")
            }
            ;
            r.prototype.destroy = function() {
                this.$container.remove();
                if (this.$element[0].detachEvent) {
                    this.$element[0].detachEvent("onpropertychange", this._syncA)
                }
                if (this._observer != null) {
                    this._observer.disconnect();
                    this._observer = null
                } else if (this.$element[0].removeEventListener) {
                    this.$element[0].removeEventListener("DOMAttrModified", this._syncA, false);
                    this.$element[0].removeEventListener("DOMNodeInserted", this._syncS, false);
                    this.$element[0].removeEventListener("DOMNodeRemoved", this._syncS, false)
                }
                this._syncA = null;
                this._syncS = null;
                this.$element.off(".select2");
                this.$element.attr("tabindex", i.GetData(this.$element[0], "old-tabindex"));
                this.$element.removeClass("select2-hidden-accessible");
                this.$element.attr("aria-hidden", "false");
                i.RemoveData(this.$element[0]);
                this.$element.removeData("select2");
                this.dataAdapter.destroy();
                this.selection.destroy();
                this.dropdown.destroy();
                this.results.destroy();
                this.dataAdapter = null;
                this.selection = null;
                this.dropdown = null;
                this.results = null
            }
            ;
            r.prototype.render = function() {
                var t = e('<span class="select2 select2-container">' + '<span class="selection"></span>' + '<span class="dropdown-wrapper" aria-hidden="true"></span>' + "</span>");
                t.attr("dir", this.options.get("dir"));
                this.$container = t;
                this.$container.addClass("select2-container--" + this.options.get("theme"));
                i.StoreData(t[0], "element", this.$element);
                return t
            }
            ;
            return r
        });
        t.define("jquery-mousewheel", ["jquery"], function(e) {
            return e
        });
        t.define("jquery.select2", ["jquery", "jquery-mousewheel", "./select2/core", "./select2/defaults", "./select2/utils"], function(e, t, i, n, r) {
            if (e.fn.select2 == null) {
                var o = ["open", "close", "destroy"];
                e.fn.select2 = function(t) {
                    t = t || {};
                    if (typeof t === "object") {
                        this.each(function() {
                            var n = e.extend(true, {}, t);
                            var r = new i(e(this),n)
                        });
                        return this
                    } else if (typeof t === "string") {
                        var n;
                        var s = Array.prototype.slice.call(arguments, 1);
                        this.each(function() {
                            var e = r.GetData(this, "select2");
                            if (e == null && window.console && console.error) {
                                console.error("The select2('" + t + "') method was called on an " + "element that is not using Select2.")
                            }
                            n = e[t].apply(e, s)
                        });
                        if (e.inArray(t, o) > -1) {
                            return this
                        }
                        return n
                    } else {
                        throw new Error("Invalid arguments for Select2: " + t)
                    }
                }
            }
            if (e.fn.select2.defaults == null) {
                e.fn.select2.defaults = n
            }
            return i
        });
        return {
            define: t.define,
            require: t.require
        }
    }();
    var i = t.require("jquery.select2");
    e.fn.select2.amd = t;
    return i
});
!function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof module && module.exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(e) {
    e.extend(e.fn, {
        validate: function(t) {
            if (!this.length)
                return void (t && t.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
            var i = e.data(this[0], "validator");
            return i ? i : (this.attr("novalidate", "novalidate"),
            i = new e.validator(t,this[0]),
            e.data(this[0], "validator", i),
            i.settings.onsubmit && (this.on("click.validate", ":submit", function(t) {
                i.submitButton = t.currentTarget,
                e(this).hasClass("cancel") && (i.cancelSubmit = !0),
                void 0 !== e(this).attr("formnovalidate") && (i.cancelSubmit = !0)
            }),
            this.on("submit.validate", function(t) {
                function n() {
                    var n, r;
                    return i.submitButton && (i.settings.submitHandler || i.formSubmitted) && (n = e("<input type='hidden'/>").attr("name", i.submitButton.name).val(e(i.submitButton).val()).appendTo(i.currentForm)),
                    !i.settings.submitHandler || (r = i.settings.submitHandler.call(i, i.currentForm, t),
                    n && n.remove(),
                    void 0 !== r && r)
                }
                return i.settings.debug && t.preventDefault(),
                i.cancelSubmit ? (i.cancelSubmit = !1,
                n()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0,
                !1) : n() : (i.focusInvalid(),
                !1)
            })),
            i)
        },
        valid: function() {
            var t, i, n;
            return e(this[0]).is("form") ? t = this.validate().form() : (n = [],
            t = !0,
            i = e(this[0].form).validate(),
            this.each(function() {
                t = i.element(this) && t,
                t || (n = n.concat(i.errorList))
            }),
            i.errorList = n),
            t
        },
        rules: function(t, i) {
            var n, r, o, s, a, l, u = this[0];
            if (null != u && (!u.form && u.hasAttribute("contenteditable") && (u.form = this.closest("form")[0],
            u.name = this.attr("name")),
            null != u.form)) {
                if (t)
                    switch (n = e.data(u.form, "validator").settings,
                    r = n.rules,
                    o = e.validator.staticRules(u),
                    t) {
                    case "add":
                        e.extend(o, e.validator.normalizeRule(i)),
                        delete o.messages,
                        r[u.name] = o,
                        i.messages && (n.messages[u.name] = e.extend(n.messages[u.name], i.messages));
                        break;
                    case "remove":
                        return i ? (l = {},
                        e.each(i.split(/\s/), function(e, t) {
                            l[t] = o[t],
                            delete o[t]
                        }),
                        l) : (delete r[u.name],
                        o)
                    }
                return s = e.validator.normalizeRules(e.extend({}, e.validator.classRules(u), e.validator.attributeRules(u), e.validator.dataRules(u), e.validator.staticRules(u)), u),
                s.required && (a = s.required,
                delete s.required,
                s = e.extend({
                    required: a
                }, s)),
                s.remote && (a = s.remote,
                delete s.remote,
                s = e.extend(s, {
                    remote: a
                })),
                s
            }
        }
    }),
    e.extend(e.expr.pseudos || e.expr[":"], {
        blank: function(t) {
            return !e.trim("" + e(t).val())
        },
        filled: function(t) {
            var i = e(t).val();
            return null !== i && !!e.trim("" + i)
        },
        unchecked: function(t) {
            return !e(t).prop("checked")
        }
    }),
    e.validator = function(t, i) {
        this.settings = e.extend(!0, {}, e.validator.defaults, t),
        this.currentForm = i,
        this.init()
    }
    ,
    e.validator.format = function(t, i) {
        return 1 === arguments.length ? function() {
            var i = e.makeArray(arguments);
            return i.unshift(t),
            e.validator.format.apply(this, i)
        }
        : void 0 === i ? t : (arguments.length > 2 && i.constructor !== Array && (i = e.makeArray(arguments).slice(1)),
        i.constructor !== Array && (i = [i]),
        e.each(i, function(e, i) {
            t = t.replace(new RegExp("\\{" + e + "\\}","g"), function() {
                return i
            })
        }),
        t)
    }
    ,
    e.extend(e.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            pendingClass: "pending",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: !1,
            focusInvalid: !0,
            errorContainer: e([]),
            errorLabelContainer: e([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(e) {
                this.lastActive = e,
                this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, e, this.settings.errorClass, this.settings.validClass),
                this.hideThese(this.errorsFor(e)))
            },
            onfocusout: function(e) {
                this.checkable(e) || !(e.name in this.submitted) && this.optional(e) || this.element(e)
            },
            onkeyup: function(t, i) {
                var n = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
                9 === i.which && "" === this.elementValue(t) || e.inArray(i.keyCode, n) !== -1 || (t.name in this.submitted || t.name in this.invalid) && this.element(t)
            },
            onclick: function(e) {
                e.name in this.submitted ? this.element(e) : e.parentNode.name in this.submitted && this.element(e.parentNode)
            },
            highlight: function(t, i, n) {
                "radio" === t.type ? this.findByName(t.name).addClass(i).removeClass(n) : e(t).addClass(i).removeClass(n)
            },
            unhighlight: function(t, i, n) {
                "radio" === t.type ? this.findByName(t.name).removeClass(i).addClass(n) : e(t).removeClass(i).addClass(n)
            }
        },
        setDefaults: function(t) {
            e.extend(e.validator.defaults, t)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            equalTo: "Please enter the same value again.",
            maxlength: e.validator.format("Please enter no more than {0} characters."),
            minlength: e.validator.format("Please enter at least {0} characters."),
            rangelength: e.validator.format("Please enter a value between {0} and {1} characters long."),
            range: e.validator.format("Please enter a value between {0} and {1}."),
            max: e.validator.format("Please enter a value less than or equal to {0}."),
            min: e.validator.format("Please enter a value greater than or equal to {0}."),
            step: e.validator.format("Please enter a multiple of {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function t(t) {
                    !this.form && this.hasAttribute("contenteditable") && (this.form = e(this).closest("form")[0],
                    this.name = e(this).attr("name"));
                    var i = e.data(this.form, "validator")
                      , n = "on" + t.type.replace(/^validate/, "")
                      , r = i.settings;
                    r[n] && !e(this).is(r.ignore) && r[n].call(i, this, t)
                }
                this.labelContainer = e(this.settings.errorLabelContainer),
                this.errorContext = this.labelContainer.length && this.labelContainer || e(this.currentForm),
                this.containers = e(this.settings.errorContainer).add(this.settings.errorLabelContainer),
                this.submitted = {},
                this.valueCache = {},
                this.pendingRequest = 0,
                this.pending = {},
                this.invalid = {},
                this.reset();
                var i, n = this.groups = {};
                e.each(this.settings.groups, function(t, i) {
                    "string" == typeof i && (i = i.split(/\s/)),
                    e.each(i, function(e, i) {
                        n[i] = t
                    })
                }),
                i = this.settings.rules,
                e.each(i, function(t, n) {
                    i[t] = e.validator.normalizeRule(n)
                }),
                e(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']", t).on("click.validate", "select, option, [type='radio'], [type='checkbox']", t),
                this.settings.invalidHandler && e(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler)
            },
            form: function() {
                return this.checkForm(),
                e.extend(this.submitted, this.errorMap),
                this.invalid = e.extend({}, this.errorMap),
                this.valid() || e(this.currentForm).triggerHandler("invalid-form", [this]),
                this.showErrors(),
                this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var e = 0, t = this.currentElements = this.elements(); t[e]; e++)
                    this.check(t[e]);
                return this.valid()
            },
            element: function(t) {
                var i, n, r = this.clean(t), o = this.validationTargetFor(r), s = this, a = !0;
                return void 0 === o ? delete this.invalid[r.name] : (this.prepareElement(o),
                this.currentElements = e(o),
                n = this.groups[o.name],
                n && e.each(this.groups, function(e, t) {
                    t === n && e !== o.name && (r = s.validationTargetFor(s.clean(s.findByName(e))),
                    r && r.name in s.invalid && (s.currentElements.push(r),
                    a = s.check(r) && a))
                }),
                i = this.check(o) !== !1,
                a = a && i,
                i ? this.invalid[o.name] = !1 : this.invalid[o.name] = !0,
                this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)),
                this.showErrors(),
                e(t).attr("aria-invalid", !i)),
                a
            },
            showErrors: function(t) {
                if (t) {
                    var i = this;
                    e.extend(this.errorMap, t),
                    this.errorList = e.map(this.errorMap, function(e, t) {
                        return {
                            message: e,
                            element: i.findByName(t)[0]
                        }
                    }),
                    this.successList = e.grep(this.successList, function(e) {
                        return !(e.name in t)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                e.fn.resetForm && e(this.currentForm).resetForm(),
                this.invalid = {},
                this.submitted = {},
                this.prepareForm(),
                this.hideErrors();
                var t = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                this.resetElements(t)
            },
            resetElements: function(e) {
                var t;
                if (this.settings.unhighlight)
                    for (t = 0; e[t]; t++)
                        this.settings.unhighlight.call(this, e[t], this.settings.errorClass, ""),
                        this.findByName(e[t].name).removeClass(this.settings.validClass);
                else
                    e.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(e) {
                var t, i = 0;
                for (t in e)
                    void 0 !== e[t] && null !== e[t] && e[t] !== !1 && i++;
                return i
            },
            hideErrors: function() {
                this.hideThese(this.toHide)
            },
            hideThese: function(e) {
                e.not(this.containers).text(""),
                this.addWrapper(e).hide()
            },
            valid: function() {
                return 0 === this.size()
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid)
                    try {
                        e(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                    } catch (e) {}
            },
            findLastActive: function() {
                var t = this.lastActive;
                return t && 1 === e.grep(this.errorList, function(e) {
                    return e.element.name === t.name
                }).length && t
            },
            elements: function() {
                var t = this
                  , i = {};
                return e(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function() {
                    var n = this.name || e(this).attr("name");
                    return !n && t.settings.debug && window.console && console.error("%o has no name assigned", this),
                    this.hasAttribute("contenteditable") && (this.form = e(this).closest("form")[0],
                    this.name = n),
                    !(n in i || !t.objectLength(e(this).rules())) && (i[n] = !0,
                    !0)
                })
            },
            clean: function(t) {
                return e(t)[0]
            },
            errors: function() {
                var t = this.settings.errorClass.split(" ").join(".");
                return e(this.settings.errorElement + "." + t, this.errorContext)
            },
            resetInternals: function() {
                this.successList = [],
                this.errorList = [],
                this.errorMap = {},
                this.toShow = e([]),
                this.toHide = e([])
            },
            reset: function() {
                this.resetInternals(),
                this.currentElements = e([])
            },
            prepareForm: function() {
                this.reset(),
                this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(e) {
                this.reset(),
                this.toHide = this.errorsFor(e)
            },
            elementValue: function(t) {
                var i, n, r = e(t), o = t.type;
                return "radio" === o || "checkbox" === o ? this.findByName(t.name).filter(":checked").val() : "number" === o && "undefined" != typeof t.validity ? t.validity.badInput ? "NaN" : r.val() : (i = t.hasAttribute("contenteditable") ? r.text() : r.val(),
                "file" === o ? "C:\\fakepath\\" === i.substr(0, 12) ? i.substr(12) : (n = i.lastIndexOf("/"),
                n >= 0 ? i.substr(n + 1) : (n = i.lastIndexOf("\\"),
                n >= 0 ? i.substr(n + 1) : i)) : "string" == typeof i ? i.replace(/\r/g, "") : i)
            },
            check: function(t) {
                t = this.validationTargetFor(this.clean(t));
                var i, n, r, o, s = e(t).rules(), a = e.map(s, function(e, t) {
                    return t
                }).length, l = !1, u = this.elementValue(t);
                if ("function" == typeof s.normalizer ? o = s.normalizer : "function" == typeof this.settings.normalizer && (o = this.settings.normalizer),
                o) {
                    if (u = o.call(t, u),
                    "string" != typeof u)
                        throw new TypeError("The normalizer should return a string value.");
                    delete s.normalizer
                }
                for (n in s) {
                    r = {
                        method: n,
                        parameters: s[n]
                    };
                    try {
                        if (i = e.validator.methods[n].call(this, u, t, r.parameters),
                        "dependency-mismatch" === i && 1 === a) {
                            l = !0;
                            continue
                        }
                        if (l = !1,
                        "pending" === i)
                            return void (this.toHide = this.toHide.not(this.errorsFor(t)));
                        if (!i)
                            return this.formatAndAdd(t, r),
                            !1
                    } catch (e) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + t.id + ", check the '" + r.method + "' method.", e),
                        e instanceof TypeError && (e.message += ".  Exception occurred when checking element " + t.id + ", check the '" + r.method + "' method."),
                        e
                    }
                }
                if (!l)
                    return this.objectLength(s) && this.successList.push(t),
                    !0
            },
            customDataMessage: function(t, i) {
                return e(t).data("msg" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()) || e(t).data("msg")
            },
            customMessage: function(e, t) {
                var i = this.settings.messages[e];
                return i && (i.constructor === String ? i : i[t])
            },
            findDefined: function() {
                for (var e = 0; e < arguments.length; e++)
                    if (void 0 !== arguments[e])
                        return arguments[e]
            },
            defaultMessage: function(t, i) {
                "string" == typeof i && (i = {
                    method: i
                });
                var n = this.findDefined(this.customMessage(t.name, i.method), this.customDataMessage(t, i.method), !this.settings.ignoreTitle && t.title || void 0, e.validator.messages[i.method], "<strong>Warning: No message defined for " + t.name + "</strong>")
                  , r = /\$?\{(\d+)\}/g;
                return "function" == typeof n ? n = n.call(this, i.parameters, t) : r.test(n) && (n = e.validator.format(n.replace(r, "{$1}"), i.parameters)),
                n
            },
            formatAndAdd: function(e, t) {
                var i = this.defaultMessage(e, t);
                this.errorList.push({
                    message: i,
                    element: e,
                    method: t.method
                }),
                this.errorMap[e.name] = i,
                this.submitted[e.name] = i
            },
            addWrapper: function(e) {
                return this.settings.wrapper && (e = e.add(e.parent(this.settings.wrapper))),
                e
            },
            defaultShowErrors: function() {
                var e, t, i;
                for (e = 0; this.errorList[e]; e++)
                    i = this.errorList[e],
                    this.settings.highlight && this.settings.highlight.call(this, i.element, this.settings.errorClass, this.settings.validClass),
                    this.showLabel(i.element, i.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)),
                this.settings.success)
                    for (e = 0; this.successList[e]; e++)
                        this.showLabel(this.successList[e]);
                if (this.settings.unhighlight)
                    for (e = 0,
                    t = this.validElements(); t[e]; e++)
                        this.settings.unhighlight.call(this, t[e], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow),
                this.hideErrors(),
                this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return e(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(t, i) {
                var n, r, o, s, a = this.errorsFor(t), l = this.idOrName(t), u = e(t).attr("aria-describedby");
                a.length ? (a.removeClass(this.settings.validClass).addClass(this.settings.errorClass),
                a.html(i)) : (a = e("<" + this.settings.errorElement + ">").attr("id", l + "-error").addClass(this.settings.errorClass).html(i || ""),
                n = a,
                this.settings.wrapper && (n = a.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()),
                this.labelContainer.length ? this.labelContainer.append(n) : this.settings.errorPlacement ? this.settings.errorPlacement.call(this, n, e(t)) : n.insertAfter(t),
                a.is("label") ? a.attr("for", l) : 0 === a.parents("label[for='" + this.escapeCssMeta(l) + "']").length && (o = a.attr("id"),
                u ? u.match(new RegExp("\\b" + this.escapeCssMeta(o) + "\\b")) || (u += " " + o) : u = o,
                e(t).attr("aria-describedby", u),
                r = this.groups[t.name],
                r && (s = this,
                e.each(s.groups, function(t, i) {
                    i === r && e("[name='" + s.escapeCssMeta(t) + "']", s.currentForm).attr("aria-describedby", a.attr("id"))
                })))),
                !i && this.settings.success && (a.text(""),
                "string" == typeof this.settings.success ? a.addClass(this.settings.success) : this.settings.success(a, t)),
                this.toShow = this.toShow.add(a)
            },
            errorsFor: function(t) {
                var i = this.escapeCssMeta(this.idOrName(t))
                  , n = e(t).attr("aria-describedby")
                  , r = "label[for='" + i + "'], label[for='" + i + "'] *";
                return n && (r = r + ", #" + this.escapeCssMeta(n).replace(/\s+/g, ", #")),
                this.errors().filter(r)
            },
            escapeCssMeta: function(e) {
                return e.replace(/([\\!"#$%&'()*+,.\/:;<=>?@\[\]^`{|}~])/g, "\\$1")
            },
            idOrName: function(e) {
                return this.groups[e.name] || (this.checkable(e) ? e.name : e.id || e.name)
            },
            validationTargetFor: function(t) {
                return this.checkable(t) && (t = this.findByName(t.name)),
                e(t).not(this.settings.ignore)[0]
            },
            checkable: function(e) {
                return /radio|checkbox/i.test(e.type)
            },
            findByName: function(t) {
                return e(this.currentForm).find("[name='" + this.escapeCssMeta(t) + "']")
            },
            getLength: function(t, i) {
                switch (i.nodeName.toLowerCase()) {
                case "select":
                    return e("option:selected", i).length;
                case "input":
                    if (this.checkable(i))
                        return this.findByName(i.name).filter(":checked").length
                }
                return t.length
            },
            depend: function(e, t) {
                return !this.dependTypes[typeof e] || this.dependTypes[typeof e](e, t)
            },
            dependTypes: {
                boolean: function(e) {
                    return e
                },
                string: function(t, i) {
                    return !!e(t, i.form).length
                },
                function: function(e, t) {
                    return e(t)
                }
            },
            optional: function(t) {
                var i = this.elementValue(t);
                return !e.validator.methods.required.call(this, i, t) && "dependency-mismatch"
            },
            startRequest: function(t) {
                this.pending[t.name] || (this.pendingRequest++,
                e(t).addClass(this.settings.pendingClass),
                this.pending[t.name] = !0)
            },
            stopRequest: function(t, i) {
                this.pendingRequest--,
                this.pendingRequest < 0 && (this.pendingRequest = 0),
                delete this.pending[t.name],
                e(t).removeClass(this.settings.pendingClass),
                i && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (e(this.currentForm).submit(),
                this.submitButton && e("input:hidden[name='" + this.submitButton.name + "']", this.currentForm).remove(),
                this.formSubmitted = !1) : !i && 0 === this.pendingRequest && this.formSubmitted && (e(this.currentForm).triggerHandler("invalid-form", [this]),
                this.formSubmitted = !1)
            },
            previousValue: function(t, i) {
                return i = "string" == typeof i && i || "remote",
                e.data(t, "previousValue") || e.data(t, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(t, {
                        method: i
                    })
                })
            },
            destroy: function() {
                this.resetForm(),
                e(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur")
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function(t, i) {
            t.constructor === String ? this.classRuleSettings[t] = i : e.extend(this.classRuleSettings, t)
        },
        classRules: function(t) {
            var i = {}
              , n = e(t).attr("class");
            return n && e.each(n.split(" "), function() {
                this in e.validator.classRuleSettings && e.extend(i, e.validator.classRuleSettings[this])
            }),
            i
        },
        normalizeAttributeRule: function(e, t, i, n) {
            /min|max|step/.test(i) && (null === t || /number|range|text/.test(t)) && (n = Number(n),
            isNaN(n) && (n = void 0)),
            n || 0 === n ? e[i] = n : t === i && "range" !== t && (e[i] = !0)
        },
        attributeRules: function(t) {
            var i, n, r = {}, o = e(t), s = t.getAttribute("type");
            for (i in e.validator.methods)
                "required" === i ? (n = t.getAttribute(i),
                "" === n && (n = !0),
                n = !!n) : n = o.attr(i),
                this.normalizeAttributeRule(r, s, i, n);
            return r.maxlength && /-1|2147483647|524288/.test(r.maxlength) && delete r.maxlength,
            r
        },
        dataRules: function(t) {
            var i, n, r = {}, o = e(t), s = t.getAttribute("type");
            for (i in e.validator.methods)
                n = o.data("rule" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()),
                this.normalizeAttributeRule(r, s, i, n);
            return r
        },
        staticRules: function(t) {
            var i = {}
              , n = e.data(t.form, "validator");
            return n.settings.rules && (i = e.validator.normalizeRule(n.settings.rules[t.name]) || {}),
            i
        },
        normalizeRules: function(t, i) {
            return e.each(t, function(n, r) {
                if (r === !1)
                    return void delete t[n];
                if (r.param || r.depends) {
                    var o = !0;
                    switch (typeof r.depends) {
                    case "string":
                        o = !!e(r.depends, i.form).length;
                        break;
                    case "function":
                        o = r.depends.call(i, i)
                    }
                    o ? t[n] = void 0 === r.param || r.param : (e.data(i.form, "validator").resetElements(e(i)),
                    delete t[n])
                }
            }),
            e.each(t, function(n, r) {
                t[n] = e.isFunction(r) && "normalizer" !== n ? r(i) : r
            }),
            e.each(["minlength", "maxlength"], function() {
                t[this] && (t[this] = Number(t[this]))
            }),
            e.each(["rangelength", "range"], function() {
                var i;
                t[this] && (e.isArray(t[this]) ? t[this] = [Number(t[this][0]), Number(t[this][1])] : "string" == typeof t[this] && (i = t[this].replace(/[\[\]]/g, "").split(/[\s,]+/),
                t[this] = [Number(i[0]), Number(i[1])]))
            }),
            e.validator.autoCreateRanges && (null != t.min && null != t.max && (t.range = [t.min, t.max],
            delete t.min,
            delete t.max),
            null != t.minlength && null != t.maxlength && (t.rangelength = [t.minlength, t.maxlength],
            delete t.minlength,
            delete t.maxlength)),
            t
        },
        normalizeRule: function(t) {
            if ("string" == typeof t) {
                var i = {};
                e.each(t.split(/\s/), function() {
                    i[this] = !0
                }),
                t = i
            }
            return t
        },
        addMethod: function(t, i, n) {
            e.validator.methods[t] = i,
            e.validator.messages[t] = void 0 !== n ? n : e.validator.messages[t],
            i.length < 3 && e.validator.addClassRules(t, e.validator.normalizeRule(t))
        },
        methods: {
            required: function(t, i, n) {
                if (!this.depend(n, i))
                    return "dependency-mismatch";
                if ("select" === i.nodeName.toLowerCase()) {
                    var r = e(i).val();
                    return r && r.length > 0
                }
                return this.checkable(i) ? this.getLength(t, i) > 0 : t.length > 0
            },
            email: function(e, t) {
                return this.optional(t) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(e)
            },
            url: function(e, t) {
                return this.optional(t) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[\/?#]\S*)?$/i.test(e)
            },
            date: function(e, t) {
                return this.optional(t) || !/Invalid|NaN/.test(new Date(e).toString())
            },
            dateISO: function(e, t) {
                return this.optional(t) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(e)
            },
            number: function(e, t) {
                return this.optional(t) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e)
            },
            digits: function(e, t) {
                return this.optional(t) || /^\d+$/.test(e)
            },
            minlength: function(t, i, n) {
                var r = e.isArray(t) ? t.length : this.getLength(t, i);
                return this.optional(i) || r >= n
            },
            maxlength: function(t, i, n) {
                var r = e.isArray(t) ? t.length : this.getLength(t, i);
                return this.optional(i) || r <= n
            },
            rangelength: function(t, i, n) {
                var r = e.isArray(t) ? t.length : this.getLength(t, i);
                return this.optional(i) || r >= n[0] && r <= n[1]
            },
            min: function(e, t, i) {
                return this.optional(t) || e >= i
            },
            max: function(e, t, i) {
                return this.optional(t) || e <= i
            },
            range: function(e, t, i) {
                return this.optional(t) || e >= i[0] && e <= i[1]
            },
            step: function(t, i, n) {
                var r, o = e(i).attr("type"), s = "Step attribute on input type " + o + " is not supported.", a = ["text", "number", "range"], l = new RegExp("\\b" + o + "\\b"), u = o && !l.test(a.join()), c = function(e) {
                    var t = ("" + e).match(/(?:\.(\d+))?$/);
                    return t && t[1] ? t[1].length : 0
                }, d = function(e) {
                    return Math.round(e * Math.pow(10, r))
                }, f = !0;
                if (u)
                    throw new Error(s);
                return r = c(n),
                (c(t) > r || d(t) % d(n) !== 0) && (f = !1),
                this.optional(i) || f
            },
            equalTo: function(t, i, n) {
                var r = e(n);
                return this.settings.onfocusout && r.not(".validate-equalTo-blur").length && r.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function() {
                    e(i).valid()
                }),
                t === r.val()
            },
            remote: function(t, i, n, r) {
                if (this.optional(i))
                    return "dependency-mismatch";
                r = "string" == typeof r && r || "remote";
                var o, s, a, l = this.previousValue(i, r);
                return this.settings.messages[i.name] || (this.settings.messages[i.name] = {}),
                l.originalMessage = l.originalMessage || this.settings.messages[i.name][r],
                this.settings.messages[i.name][r] = l.message,
                n = "string" == typeof n && {
                    url: n
                } || n,
                a = e.param(e.extend({
                    data: t
                }, n.data)),
                l.old === a ? l.valid : (l.old = a,
                o = this,
                this.startRequest(i),
                s = {},
                s[i.name] = t,
                e.ajax(e.extend(!0, {
                    mode: "abort",
                    port: "validate" + i.name,
                    dataType: "json",
                    data: s,
                    context: o.currentForm,
                    success: function(e) {
                        var n, s, a, u = e === !0 || "true" === e;
                        o.settings.messages[i.name][r] = l.originalMessage,
                        u ? (a = o.formSubmitted,
                        o.resetInternals(),
                        o.toHide = o.errorsFor(i),
                        o.formSubmitted = a,
                        o.successList.push(i),
                        o.invalid[i.name] = !1,
                        o.showErrors()) : (n = {},
                        s = e || o.defaultMessage(i, {
                            method: r,
                            parameters: t
                        }),
                        n[i.name] = l.message = s,
                        o.invalid[i.name] = !0,
                        o.showErrors(n)),
                        l.valid = u,
                        o.stopRequest(i, u)
                    }
                }, n)),
                "pending")
            }
        }
    });
    var t, i = {};
    return e.ajaxPrefilter ? e.ajaxPrefilter(function(e, t, n) {
        var r = e.port;
        "abort" === e.mode && (i[r] && i[r].abort(),
        i[r] = n)
    }) : (t = e.ajax,
    e.ajax = function(n) {
        var r = ("mode"in n ? n : e.ajaxSettings).mode
          , o = ("port"in n ? n : e.ajaxSettings).port;
        return "abort" === r ? (i[o] && i[o].abort(),
        i[o] = t.apply(this, arguments),
        i[o]) : t.apply(this, arguments)
    }
    ),
    e
});
