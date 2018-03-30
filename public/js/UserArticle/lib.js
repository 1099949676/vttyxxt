!function(e, t) {
    "use strict";
    function n(e) {
        var t = W(0)
            , n = e.trim().slice(t.length).match(/^\s*(\S+?)\s*(?:,\s*(\S+))?\s+in\s+(.+)$/);
        return n ? {
            key: n[1],
            pos: n[2],
            val: t + n[3]
        } : {
            val: e
        }
    }
    function r(e, t, n) {
        var r = {};
        return r[e.key] = t,
        e.pos && (r[e.pos] = n),
            r
    }
    function o(e, t, o) {
        d(e, "each");
        var i, u = v(e), s = e.outerHTML, c = !!Q[u], l = Q[u] || {
                tmpl: s
            }, f = e.parentNode, p = document.createComment("riot placeholder"), m = [], g = h(e);
        f.insertBefore(p, e),
            o = n(o),
            t.one("premount", function() {
                f.stub && (f = t.root),
                    e.parentNode.removeChild(e)
            }).on("update", function() {
                var n = V(o.val, t);
                U(n) || (i = n ? JSON.stringify(n) : "",
                    n = n ? Object.keys(n).map(function(e) {
                        return r(o, e, n[e])
                    }) : []);
                for (var s = document.createDocumentFragment(), d = m.length, h = n.length; d > h; )
                    m[--d].unmount(),
                        m.splice(d, 1);
                for (d = 0; h > d; ++d) {
                    var v = !i && o.key ? r(o, n[d], d) : n[d];
                    m[d] ? m[d].update(v) : ((m[d] = new a(l,{
                        parent: t,
                        isLoop: !0,
                        hasImpl: c,
                        root: B.test(u) ? f : e.cloneNode(),
                        item: v
                    },e.innerHTML)).mount(),
                        s.appendChild(m[d].root)),
                        m[d]._item = v
                }
                f.insertBefore(s, p),
                g && (t.tags[u] = m)
            }).one("updated", function() {
                var e = Object.keys(t);
                x(f, function(n) {
                    1 != n.nodeType || n.isLoop || n._looped || (n._visited = !1,
                        n._looped = !0,
                        T(n, t, e))
                })
            })
    }
    function i(e, t, n) {
        x(e, function(e) {
            if (1 == e.nodeType) {
                e.isLoop = e.isLoop || e.parentNode && e.parentNode.isLoop || e.getAttribute("each") ? 1 : 0;
                var r = h(e);
                r && !e.isLoop && n.push(m(r, e, t)),
                e.isLoop || T(e, t, [])
            }
        })
    }
    function u(e, t, n) {
        function r(e, t, r) {
            if (t.indexOf(W(0)) >= 0) {
                var o = {
                    dom: e,
                    expr: t
                };
                n.push(y(o, r))
            }
        }
        x(e, function(e) {
            var n = e.nodeType;
            if (3 == n && "STYLE" != e.parentNode.tagName && r(e, e.nodeValue),
                1 == n) {
                var i = e.getAttribute("each");
                return i ? (o(e, t, i),
                    !1) : (f(e.attributes, function(t) {
                    var n = t.name
                        , o = n.split("__")[1];
                    return r(e, t.value, {
                        attr: o || n,
                        bool: o
                    }),
                        o ? (d(e, n),
                            !1) : void 0
                }),
                    h(e) ? !1 : void 0)
            }
        })
    }
    function a(e, n, r) {
        function o() {
            var e = C && x ? d : v || d;
            f(A.attributes, function(t) {
                h[t.name] = V(t.value, e)
            }),
                f(Object.keys(q), function(t) {
                    h[t] = V(q[t], e)
                })
        }
        function a(e) {
            for (var t in j)
                typeof d[t] !== L && (d[t] = e[t])
        }
        function s() {
            d.parent && x && f(Object.keys(d.parent), function(e) {
                var t = !~$.indexOf(e) && ~I.indexOf(e);
                (typeof d[e] === L || t) && (t || I.push(e),
                    d[e] = d.parent[e])
            })
        }
        function c(e) {
            if (f(T, function(t) {
                    t[e ? "mount" : "unmount"]()
                }),
                    v) {
                var t = e ? "on" : "off";
                x ? v[t]("unmount", d.unmount) : v[t]("update", d.update)[t]("unmount", d.unmount)
            }
        }
        var d = N.observable(this)
            , h = E(n.opts) || {}
            , m = X(e.tmpl)
            , v = n.parent
            , x = n.isLoop
            , C = n.hasImpl
            , j = b(n.item)
            , k = []
            , T = []
            , A = n.root
            , O = e.fn
            , M = A.tagName.toLowerCase()
            , q = {}
            , I = [];
        O && A._tag && A._tag.unmount(!0),
            this.isMounted = !1,
            A.isLoop = x,
            A._tag = this,
            this._id = R++,
            y(this, {
                parent: v,
                root: A,
                opts: h,
                tags: {}
            }, j),
            f(A.attributes, function(e) {
                var t = e.value;
                W(/{.*}/).test(t) && (q[e.name] = t)
            }),
        m.innerHTML && !/^(select|optgroup|table|tbody|tr|col(?:group)?)$/.test(M) && (m.innerHTML = S(m.innerHTML, r)),
            this.update = function(e) {
                e = b(e),
                    s(),
                e && typeof j === H && (a(e),
                    j = e),
                    y(d, e),
                    o(),
                    d.trigger("update", e),
                    l(k, d),
                    d.trigger("updated")
            }
            ,
            this.mixin = function() {
                f(arguments, function(e) {
                    e = typeof e === F ? N.mixin(e) : e,
                        f(Object.keys(e), function(t) {
                            "init" != t && (d[t] = p(e[t]) ? e[t].bind(d) : e[t])
                        }),
                    e.init && e.init.bind(d)()
                })
            }
            ,
            this.mount = function() {
                if (o(),
                    O && O.call(d, h),
                        u(m, d, k),
                        c(!0),
                    (e.attrs || C) && (w(e.attrs, function(e, t) {
                        A.setAttribute(e, t)
                    }),
                        u(d.root, d, k)),
                    (!d.parent || x) && d.update(j),
                        d.trigger("premount"),
                    x && !C)
                    d.root = A = m.firstChild;
                else {
                    for (; m.firstChild; )
                        A.appendChild(m.firstChild);
                    A.stub && (d.root = A = v.root)
                }
                !d.parent || d.parent.isMounted ? (d.isMounted = !0,
                    d.trigger("mount")) : d.parent.one("mount", function() {
                    _(d.root) || (d.parent.isMounted = d.isMounted = !0,
                        d.trigger("mount"))
                })
            }
            ,
            this.unmount = function(e) {
                var n, r = A, o = r.parentNode;
                if (o) {
                    if (v)
                        n = g(v),
                            U(n.tags[M]) ? f(n.tags[M], function(e, t) {
                                e._id == d._id && n.tags[M].splice(t, 1)
                            }) : n.tags[M] = t;
                    else
                        for (; r.firstChild; )
                            r.removeChild(r.firstChild);
                    e ? o.removeAttribute("riot-tag") : o.removeChild(r)
                }
                d.trigger("unmount"),
                    c(),
                    d.off("*"),
                    A._tag = null
            }
            ,
            i(m, this, T)
    }
    function s(t, n, r, o) {
        r[t] = function(t) {
            var i, u = o._item, a = o.parent;
            if (!u)
                for (; a && !u; )
                    u = a._item,
                        a = a.parent;
            t = t || e.event;
            try {
                t.currentTarget = r,
                t.target || (t.target = t.srcElement),
                t.which || (t.which = t.charCode || t.keyCode)
            } catch (s) {}
            t.item = u,
            n.call(o, t) === !0 || /radio|check/.test(r.type) || (t.preventDefault && t.preventDefault(),
                t.returnValue = !1),
            t.preventUpdate || (i = u ? g(a) : o,
                i.update())
        }
    }
    function c(e, t, n) {
        e && (e.insertBefore(n, t),
            e.removeChild(t))
    }
    function l(e, t) {
        f(e, function(e) {
            var n = e.dom
                , r = e.attr
                , o = V(e.expr, t)
                , i = e.dom.parentNode;
            if (e.bool ? o = o ? r : !1 : null == o && (o = ""),
                i && "TEXTAREA" == i.tagName && (o = ("" + o).replace(/riot-/g, "")),
                e.value !== o) {
                if (e.value = o,
                        !r)
                    return void (n.nodeValue = "" + o);
                if (d(n, r),
                        p(o))
                    s(r, o, n, t);
                else if ("if" == r) {
                    var u = e.stub
                        , a = function() {
                            c(u.parentNode, u, n)
                        }
                        , l = function() {
                            c(n.parentNode, n, u)
                        };
                    o ? u && (a(),
                        n.inStub = !1,
                    _(n) || x(n, function(e) {
                        e._tag && !e._tag.isMounted && (e._tag.isMounted = !!e._tag.trigger("mount"))
                    })) : (u = e.stub = u || document.createTextNode(""),
                        n.parentNode ? l() : (t.parent || t).one("updated", l),
                        n.inStub = !0)
                } else if (/^(show|hide)$/.test(r))
                    "hide" == r && (o = !o),
                        n.style.display = o ? "" : "none";
                else if ("value" == r)
                    n.value = o;
                else if (A(r, q) && r != I)
                    o && n.setAttribute(r.slice(q.length), o);
                else {
                    if (e.bool && (n[r] = o,
                            !o))
                        return;
                    typeof o !== H && n.setAttribute(r, o)
                }
            }
        })
    }
    function f(e, t) {
        for (var n, r = 0, o = (e || []).length; o > r; r++)
            n = e[r],
            null != n && t(n, r) === !1 && r--;
        return e
    }
    function p(e) {
        return typeof e === P || !1
    }
    function d(e, t) {
        e.removeAttribute(t)
    }
    function h(e) {
        return e.tagName && Q[e.getAttribute(I) || e.tagName.toLowerCase()]
    }
    function m(e, t, n) {
        var r, o = new a(e,{
            root: t,
            parent: n
        },t.innerHTML), i = v(t), u = g(n);
        return o.parent = u,
            r = u.tags[i],
            r ? (U(r) || (u.tags[i] = [r]),
            ~u.tags[i].indexOf(o) || u.tags[i].push(o)) : u.tags[i] = o,
            t.innerHTML = "",
            o
    }
    function g(e) {
        for (var t = e; !h(t.root) && t.parent; )
            t = t.parent;
        return t
    }
    function v(e) {
        var t = h(e)
            , n = e.getAttribute("name")
            , r = n && n.indexOf(W(0)) < 0 ? n : t ? t.name : e.tagName.toLowerCase();
        return r
    }
    function y(e) {
        for (var t, n = arguments, r = 1; r < n.length; ++r)
            if (t = n[r])
                for (var o in t)
                    e[o] = t[o];
        return e
    }
    function b(e) {
        if (!(e instanceof a || e && typeof e.trigger == P))
            return e;
        var t = {};
        for (var n in e)
            ~$.indexOf(n) || (t[n] = e[n]);
        return t
    }
    function x(e, t) {
        if (e) {
            if (t(e) === !1)
                return;
            for (e = e.firstChild; e; )
                x(e, t),
                    e = e.nextSibling
        }
    }
    function w(e, t) {
        for (var n, r = /([-\w]+) ?= ?(?:"([^"]*)|'([^']*)|({[^}]*}))/g; n = r.exec(e); )
            t(n[1].toLowerCase(), n[2] || n[3] || n[4])
    }
    function _(e) {
        for (; e; ) {
            if (e.inStub)
                return !0;
            e = e.parentNode
        }
        return !1
    }
    function C(e) {
        return document.createElement(e)
    }
    function S(e, t) {
        return e.replace(/<(yield)\/?>(<\/\1>)?/gi, t || "")
    }
    function j(e, t) {
        return (t || document).querySelectorAll(e)
    }
    function k(e, t) {
        return (t || document).querySelector(e)
    }
    function E(e) {
        function t() {}
        return t.prototype = e,
            new t
    }
    function T(e, t, n) {
        if (!e._visited) {
            var r, o = e.getAttribute("id") || e.getAttribute("name");
            o && (n.indexOf(o) < 0 && (r = t[o],
                r ? U(r) ? r.push(e) : t[o] = [r, e] : t[o] = e),
                e._visited = !0)
        }
    }
    function A(e, t) {
        return e.slice(0, t.length) === t
    }
    function O(e) {
        if (!N.render) {
            z || (z = C("style"),
                z.setAttribute("type", "text/css"));
            var t = document.head || document.getElementsByTagName("head")[0];
            if (z.styleSheet ? z.styleSheet.cssText += e : z.innerHTML += e,
                    !z._rendered)
                if (z.styleSheet)
                    document.body.appendChild(z);
                else {
                    var n = k("style[type=riot]");
                    n ? (n.parentNode.insertBefore(z, n),
                        n.parentNode.removeChild(n)) : t.appendChild(z)
                }
            z._rendered = !0
        }
    }
    function M(e, t, n) {
        var r = Q[t]
            , o = e._innerHTML = e._innerHTML || e.innerHTML;
        return e.innerHTML = "",
        r && e && (r = new a(r,{
            root: e,
            opts: n
        },o)),
            r && r.mount ? (r.mount(),
                J.push(r),
                r.on("unmount", function() {
                    J.splice(J.indexOf(r), 1)
                })) : void 0
    }
    var N = {
            version: "v2.2.4",
            settings: {}
        }
        , R = 0
        , q = "riot-"
        , I = q + "tag"
        , F = "string"
        , H = "object"
        , L = "undefined"
        , P = "function"
        , B = /^(?:opt(ion|group)|tbody|col|t[rhd])$/
        , $ = ["_item", "_id", "update", "root", "mount", "unmount", "mixin", "isMounted", "isLoop", "tags", "parent", "opts", "trigger", "on", "off", "one"]
        , D = 0 | (e && e.document || {}).documentMode
        , U = Array.isArray;
    N.observable = function(e) {
        e = e || {};
        var t = {}
            , n = 0;
        return e.on = function(r, o) {
            return p(o) && (typeof o.id === L && (o._id = n++),
                r.replace(/\S+/g, function(e, n) {
                    (t[e] = t[e] || []).push(o),
                        o.typed = n > 0
                })),
                e
        }
            ,
            e.off = function(n, r) {
                return "*" == n ? t = {} : n.replace(/\S+/g, function(e) {
                    if (r)
                        for (var n, o = t[e], i = 0; n = o && o[i]; ++i)
                            n._id == r._id && o.splice(i--, 1);
                    else
                        t[e] = []
                }),
                    e
            }
            ,
            e.one = function(t, n) {
                function r() {
                    e.off(t, r),
                        n.apply(e, arguments)
                }
                return e.on(t, r)
            }
            ,
            e.trigger = function(n) {
                for (var r, o = [].slice.call(arguments, 1), i = t[n] || [], u = 0; r = i[u]; ++u)
                    r.busy || (r.busy = 1,
                        r.apply(e, r.typed ? [n].concat(o) : o),
                    i[u] !== r && u--,
                        r.busy = 0);
                return t.all && "all" != n && e.trigger.apply(e, ["all", n].concat(o)),
                    e
            }
            ,
            e
    }
        ,
        N.mixin = function() {
            var e = {};
            return function(t, n) {
                return n ? void (e[t] = n) : e[t]
            }
        }(),
        function(e, t, n) {
            function r() {
                return a.href.split("#")[1] || ""
            }
            function o(e) {
                return e.split("/")
            }
            function i(e) {
                e.type && (e = r()),
                e != u && (s.trigger.apply(null, ["H"].concat(o(e))),
                    u = e)
            }
            if (n) {
                var u, a = n.location, s = e.observable(), c = !1, l = e.route = function(e) {
                        e[0] ? (a.hash = e,
                            i(e)) : s.on("H", e)
                    }
                    ;
                l.exec = function(e) {
                    e.apply(null, o(r()))
                }
                    ,
                    l.parser = function(e) {
                        o = e
                    }
                    ,
                    l.stop = function() {
                        c && (n.removeEventListener ? n.removeEventListener(t, i, !1) : n.detachEvent("on" + t, i),
                            s.off("*"),
                            c = !1)
                    }
                    ,
                    l.start = function() {
                        c || (n.addEventListener ? n.addEventListener(t, i, !1) : n.attachEvent("on" + t, i),
                            c = !0)
                    }
                    ,
                    l.start()
            }
        }(N, "hashchange", e);
    var z, W = function(e) {
        var t, n, r, o = /[{}]/g;
        return function(i) {
            var u = N.settings.brackets || e;
            return t !== u && (t = u,
                r = u.split(" "),
                n = r.map(function(e) {
                    return e.replace(/(?=.)/g, "\\")
                })),
                i instanceof RegExp ? u === e ? i : new RegExp(i.source.replace(o, function(e) {
                    return n[~~("}" === e)]
                }),i.global ? "g" : "") : r[i]
        }
    }("{ }"), V = function() {
        function t(e, t) {
            return e.indexOf(W(0)) < 0 ? (e = e.replace(/\n|\r\n?/g, "\n"),
                function() {
                    return e
                }
            ) : (e = e.replace(W(/\\{/g), "￰").replace(W(/\\}/g), "￱"),
                t = o(e, i(e, W(/{/), W(/}/))),
                e = 2 !== t.length || t[0] ? "[" + t.map(function(e, t) {
                    return t % 2 ? n(e, !0) : '"' + e.replace(/\n|\r\n?/g, "\\n").replace(/"/g, '\\"') + '"'
                }).join(",") + '].join("")' : n(t[1]),
                new Function("d","return " + e.replace(/\uFFF0/g, W(0)).replace(/\uFFF1/g, W(1)) + ";"))
        }
        function n(e, t) {
            return e = e.replace(/\n|\r\n?/g, " ").replace(W(/^[{ ]+|[ }]+$|\/\*.+?\*\//g), ""),
                /^\s*[\w- "']+ *:/.test(e) ? "[" + i(e, /["' ]*[\w- ]+["' ]*:/, /,(?=["' ]*[\w- ]+["' ]*:)|}|$/).map(function(e) {
                    return e.replace(/^[ "']*(.+?)[ "']*: *(.+?),? *$/, function(e, t, n) {
                        return n.replace(/[^&|=!><]+/g, r) + '?"' + t + '":"",'
                    })
                }).join("") + '].join(" ").trim()' : r(e, t)
        }
        function r(e, t) {
            return e = e.trim(),
                e ? "(function(v){try{v=" + e.replace(s, function(e, t, n) {
                    return n ? '(("' + n + a + n + ")" : e
                }) + "}catch(e){}return " + (t === !0 ? '!v&&v!==0?"":v' : "v") + "}).call(d)" : ""
        }
        function o(e, t) {
            var n = [];
            return t.map(function(t, r) {
                r = e.indexOf(t),
                    n.push(e.slice(0, r), t),
                    e = e.slice(r + t.length)
            }),
            e && n.push(e),
                n
        }
        function i(e, t, n) {
            var r, o = 0, i = [], u = new RegExp("(" + t.source + ")|(" + n.source + ")","g");
            return e.replace(u, function(t, n, u, a) {
                !o && n && (r = a),
                    o += n ? 1 : -1,
                o || null == u || i.push(e.slice(r, a + u.length))
            }),
                i
        }
        var u = {}
            , a = '"in d?d:' + (e ? "window)." : "global).")
            , s = /(['"\/])(?:[^\\]*?|\\.|.)*?\1|\.\w*|\w*:|\b(?:(?:new|typeof|in|instanceof) |(?:this|true|false|null|undefined)\b|function\s*\()|([A-Za-z_$]\w*)/g;
        return function(e, n) {
            return e && (u[e] || (u[e] = t(e)))(n)
        }
    }(), X = function(e) {
        function t(t) {
            var i = t && t.match(/^\s*<([-\w]+)/)
                , u = i && i[1].toLowerCase()
                , a = r[u] || o
                , s = C(a);
            return s.stub = !0,
                e && u && (i = u.match(B)) ? n(s, t, u, !!i[1]) : s.innerHTML = t,
                s
        }
        function n(e, t, n, r) {
            var i, u = C(o), a = r ? "select>" : "table>";
            u.innerHTML = "<" + a + t + "</" + a,
                i = u.getElementsByTagName(n)[0],
            i && e.appendChild(i)
        }
        var r = {
                tr: "tbody",
                th: "tr",
                td: "tr",
                tbody: "table",
                col: "colgroup"
            }
            , o = "div";
        return e = e && 10 > e,
            t
    }(D), J = [], Q = {};
    N.tag = function(e, t, n, r, o) {
        return p(r) && (o = r,
            /^[\w\-]+\s?=/.test(n) ? (r = n,
                n = "") : r = ""),
        n && (p(n) ? o = n : O(n)),
            Q[e] = {
                name: e,
                tmpl: t,
                attrs: r,
                fn: o
            },
            e
    }
        ,
        N.mount = function(e, t, n) {
            function r(e) {
                var t = "";
                return f(e, function(e) {
                    t += ", *[" + I + '="' + e.trim() + '"]'
                }),
                    t
            }
            function o() {
                var e = Object.keys(Q);
                return e + r(e)
            }
            function i(e) {
                var r;
                if (e.tagName) {
                    !t || (r = e.getAttribute(I)) && r == t || e.setAttribute(I, t);
                    var o = M(e, t || e.getAttribute(I) || e.tagName.toLowerCase(), n);
                    o && s.push(o)
                } else
                    e.length && f(e, i)
            }
            var u, a, s = [];
            if (typeof t === H && (n = t,
                    t = 0),
                    typeof e === F ? ("*" === e ? e = a = o() : e += r(e.split(",")),
                        u = j(e)) : u = e,
                "*" === t) {
                if (t = a || o(),
                        u.tagName)
                    u = j(t, u);
                else {
                    var c = [];
                    f(u, function(e) {
                        c.push(j(t, e))
                    }),
                        u = c
                }
                t = 0
            }
            return u.tagName ? i(u) : f(u, i),
                s
        }
        ,
        N.update = function() {
            return f(J, function(e) {
                e.update()
            })
        }
        ,
        N.mountTo = N.mount,
        N.util = {
            brackets: W,
            tmpl: V
        },
        typeof exports === H ? module.exports = N : "function" == typeof define && define.amd ? define("static/js/lib/riot", ["require"], function() {
            return e.riot = N
        }) : e.riot = N
}("undefined" != typeof window ? window : void 0),
    !function(e, t, n) {
        "undefined" != typeof module && module.exports ? module.exports = n() : "function" == typeof define && define.amd ? define("static/js/lib/http", [], n) : t[e] = n()
    }("http", this, function() {
        function succeed(e) {
            var t = protocolRe.exec(e.url);
            return t = t && t[1] || context.location.protocol,
                httpsRe.test(t) ? twoHundo.test(e.request.status) : !!e.request.response
        }
        function handleReadyState(e, t, n) {
            return function() {
                return e._aborted ? n(e.request) : e._timedOut ? n(e.request, "Request is aborted: timeout") : void (e.request && 4 == e.request[readyState] && (e.request.onreadystatechange = noop,
                    succeed(e) ? t(e.request) : n(e.request)))
            }
        }
        function setHeaders(e, t) {
            var n, r = t.headers || {};
            r.Accept = r.Accept || defaultHeaders.accept[t.type] || defaultHeaders.accept["*"];
            var o = "undefined" != typeof FormData && t.data instanceof FormData;
            t.crossOrigin || r[requestedWith] || (r[requestedWith] = defaultHeaders.requestedWith),
            r[contentType] || o || (r[contentType] = t.contentType || defaultHeaders.contentType);
            for (n in r)
                r.hasOwnProperty(n) && "setRequestHeader"in e && e.setRequestHeader(n, r[n])
        }
        function setCredentials(e, t) {
            "undefined" != typeof t.withCredentials && "undefined" != typeof e.withCredentials && (e.withCredentials = !!t.withCredentials)
        }
        function generalCallback(e) {
            lastValue = e
        }
        function urlappend(e, t) {
            return e + (/\?/.test(e) ? "&" : "?") + t
        }
        function handleJsonp(e, t, n, r) {
            var o = uniqid++
                , i = e.jsonpCallback || "callback"
                , u = e.jsonpCallbackName || reqwest.getcallbackPrefix(o)
                , a = new RegExp("((^|\\?|&)" + i + ")=([^&]+)")
                , s = r.match(a)
                , c = doc.createElement("script")
                , l = 0
                , f = -1 !== navigator.userAgent.indexOf("MSIE 10.0");
            return s ? "?" === s[3] ? r = r.replace(a, "$1=" + u) : u = s[3] : r = urlappend(r, i + "=" + u),
                context[u] = generalCallback,
                c.type = "text/javascript",
                c.src = r,
                c.async = !0,
            "undefined" == typeof c.onreadystatechange || f || (c.htmlFor = c.id = "_reqwest_" + o),
                c.onload = c.onreadystatechange = function() {
                    return c[readyState] && "complete" !== c[readyState] && "loaded" !== c[readyState] || l ? !1 : (c.onload = c.onreadystatechange = null,
                    c.onclick && c.onclick(),
                        t(lastValue),
                        lastValue = void 0,
                        head.removeChild(c),
                        void (l = 1))
                }
                ,
                head.appendChild(c),
            {
                abort: function() {
                    c.onload = c.onreadystatechange = null,
                        n({}, "Request is aborted: timeout", {}),
                        lastValue = void 0,
                        head.removeChild(c),
                        l = 1
                }
            }
        }
        function getRequest(e, t) {
            var n, r = this.o, o = (r.method || "GET").toUpperCase(), i = "string" == typeof r ? r : r.url, u = r.processData !== !1 && r.data && "string" != typeof r.data ? reqwest.toQueryString(r.data) : r.data || null, a = !1;
            return "jsonp" != r.type && "GET" != o || !u || (i = urlappend(i, u),
                u = null),
                "jsonp" == r.type ? handleJsonp(r, e, t, i) : (n = r.xhr && r.xhr(r) || xhr(r),
                    n.open(o, i, r.async === !1 ? !1 : !0),
                    setHeaders(n, r),
                    setCredentials(n, r),
                    context[xDomainRequest] && n instanceof context[xDomainRequest] ? (n.onload = e,
                        n.onerror = t,
                        n.onprogress = function() {}
                        ,
                        a = !0) : n.onreadystatechange = handleReadyState(this, e, t),
                r.before && r.before(n),
                    a ? setTimeout(function() {
                        n.send(u)
                    }, 200) : n.send(u),
                    n)
        }
        function Reqwest(e, t) {
            this.o = e,
                this.fn = t,
                init.apply(this, arguments)
        }
        function setType(e) {
            return null === e ? void 0 : e.match("json") ? "json" : e.match("javascript") ? "js" : e.match("text") ? "html" : e.match("xml") ? "xml" : void 0
        }
        function init(o, fn) {
            function complete(e) {
                for (o.timeout && clearTimeout(self.timeout),
                         self.timeout = null; self._completeHandlers.length > 0; )
                    self._completeHandlers.shift()(e)
            }
            function success(resp) {
                var type = o.type || resp && setType(resp.getResponseHeader("Content-Type"));
                resp = "jsonp" !== type ? self.request : resp;
                var filteredResponse = globalSetupOptions.dataFilter(resp.responseText, type)
                    , r = filteredResponse;
                try {
                    resp.responseText = r
                } catch (e) {}
                if (r)
                    switch (type) {
                        case "json":
                            try {
                                resp = context.JSON ? context.JSON.parse(r) : eval("(" + r + ")")
                            } catch (err) {
                                return error(resp, "Could not parse JSON in response", err)
                            }
                            break;
                        case "js":
                            resp = eval(r);
                            break;
                        case "html":
                            resp = r;
                            break;
                        case "xml":
                            resp = resp.responseXML && resp.responseXML.parseError && resp.responseXML.parseError.errorCode && resp.responseXML.parseError.reason ? null : resp.responseXML
                    }
                for (self._responseArgs.resp = resp,
                         self._fulfilled = !0,
                         fn(resp),
                         self._successHandler(resp); self._fulfillmentHandlers.length > 0; )
                    resp = self._fulfillmentHandlers.shift()(resp);
                complete(resp)
            }
            function timedOut() {
                self._timedOut = !0,
                    self.request.abort()
            }
            function error(e, t, n) {
                for (e = self.request,
                         self._responseArgs.resp = e,
                         self._responseArgs.msg = t,
                         self._responseArgs.t = n,
                         self._erred = !0; self._errorHandlers.length > 0; )
                    self._errorHandlers.shift()(e, t, n);
                complete(e)
            }
            this.url = "string" == typeof o ? o : o.url,
                this.timeout = null,
                this._fulfilled = !1,
                this._successHandler = function() {}
                ,
                this._fulfillmentHandlers = [],
                this._errorHandlers = [],
                this._completeHandlers = [],
                this._erred = !1,
                this._responseArgs = {};
            var self = this;
            fn = fn || function() {}
                ,
            o.timeout && (this.timeout = setTimeout(function() {
                timedOut()
            }, o.timeout)),
            o.success && (this._successHandler = function() {
                o.success.apply(o, arguments)
            }
            ),
            o.error && this._errorHandlers.push(function() {
                o.error.apply(o, arguments)
            }),
            o.complete && this._completeHandlers.push(function() {
                o.complete.apply(o, arguments)
            }),
                this.request = getRequest.call(this, success, error)
        }
        function reqwest(e, t) {
            return new Reqwest(e,t)
        }
        function normalize(e) {
            return e ? e.replace(/\r?\n/g, "\r\n") : ""
        }
        function serial(e, t) {
            var n, r, o, i, u = e.name, a = e.tagName.toLowerCase(), s = function(e) {
                e && !e.disabled && t(u, normalize(e.attributes.value && e.attributes.value.specified ? e.value : e.text))
            };
            if (!e.disabled && u)
                switch (a) {
                    case "input":
                        /reset|button|image|file/i.test(e.type) || (n = /checkbox/i.test(e.type),
                            r = /radio/i.test(e.type),
                            o = e.value,
                        (!(n || r) || e.checked) && t(u, normalize(n && "" === o ? "on" : o)));
                        break;
                    case "textarea":
                        t(u, normalize(e.value));
                        break;
                    case "select":
                        if ("select-one" === e.type.toLowerCase())
                            s(e.selectedIndex >= 0 ? e.options[e.selectedIndex] : null);
                        else
                            for (i = 0; e.length && i < e.length; i++)
                                e.options[i].selected && s(e.options[i])
                }
        }
        function eachFormElement() {
            var e, t, n = this, r = function(e, t) {
                var r, o, i;
                for (r = 0; r < t.length; r++)
                    for (i = e[byTag](t[r]),
                             o = 0; o < i.length; o++)
                        serial(i[o], n)
            };
            for (t = 0; t < arguments.length; t++)
                e = arguments[t],
                /input|select|textarea/i.test(e.tagName) && serial(e, n),
                    r(e, ["input", "select", "textarea"])
        }
        function serializeQueryString() {
            return reqwest.toQueryString(reqwest.serializeArray.apply(null, arguments))
        }
        function serializeHash() {
            var e = {};
            return eachFormElement.apply(function(t, n) {
                t in e ? (e[t] && !isArray(e[t]) && (e[t] = [e[t]]),
                    e[t].push(n)) : e[t] = n
            }, arguments),
                e
        }
        function buildParams(e, t, n, r) {
            var o, i, u, a = /\[\]$/;
            if (isArray(t))
                for (i = 0; t && i < t.length; i++)
                    u = t[i],
                        n || a.test(e) ? r(e, u) : buildParams(e + "[" + ("object" == typeof u ? i : "") + "]", u, n, r);
            else if (t && "[object Object]" === t.toString())
                for (o in t)
                    buildParams(e + "[" + o + "]", t[o], n, r);
            else
                r(e, t)
        }
        var context = this;
        if ("window"in context)
            var doc = document
                , byTag = "getElementsByTagName"
                , head = doc[byTag]("head")[0];
        else {
            var XHR2;
            try {
                XHR2 = require("xhr2")
            } catch (ex) {
                throw new Error("Peer dependency `xhr2` required! Please npm install xhr2")
            }
        }
        var httpsRe = /^http/, protocolRe = /(^\w+):\/\//, twoHundo = /^(20\d|1223)$/, readyState = "readyState", contentType = "Content-Type", requestedWith = "X-Requested-With", uniqid = 0, callbackPrefix = "reqwest_" + +new Date, lastValue, xmlHttpRequest = "XMLHttpRequest", xDomainRequest = "XDomainRequest", noop = function() {}, isArray = "function" == typeof Array.isArray ? Array.isArray : function(e) {
                return e instanceof Array
            }
            , defaultHeaders = {
                contentType: "application/x-www-form-urlencoded",
                requestedWith: xmlHttpRequest,
                accept: {
                    "*": "text/javascript, text/html, application/xml, text/xml, */*",
                    xml: "application/xml, text/xml",
                    html: "text/html",
                    text: "text/plain",
                    json: "application/json, text/javascript",
                    js: "application/javascript, text/javascript"
                }
            }, xhr = function(e) {
                if (e.crossOrigin === !0) {
                    var t = context[xmlHttpRequest] ? new XMLHttpRequest : null;
                    if (t && "withCredentials"in t)
                        return t;
                    if (context[xDomainRequest])
                        return new XDomainRequest;
                    throw new Error("Browser does not support cross-origin requests")
                }
                return context[xmlHttpRequest] ? new XMLHttpRequest : XHR2 ? new XHR2 : new ActiveXObject("Microsoft.XMLHTTP")
            }, globalSetupOptions = {
                dataFilter: function(e) {
                    return e
                }
            };
        return Reqwest.prototype = {
            abort: function() {
                this._aborted = !0,
                    this.request.abort()
            },
            retry: function() {
                init.call(this, this.o, this.fn)
            },
            then: function(e, t) {
                return e = e || function() {}
                    ,
                    t = t || function() {}
                    ,
                    this._fulfilled ? this._responseArgs.resp = e(this._responseArgs.resp) : this._erred ? t(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t) : (this._fulfillmentHandlers.push(e),
                        this._errorHandlers.push(t)),
                    this
            },
            always: function(e) {
                return this._fulfilled || this._erred ? e(this._responseArgs.resp) : this._completeHandlers.push(e),
                    this
            },
            fail: function(e) {
                return this._erred ? e(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t) : this._errorHandlers.push(e),
                    this
            },
            "catch": function(e) {
                return this.fail(e)
            }
        },
            reqwest.serializeArray = function() {
                var e = [];
                return eachFormElement.apply(function(t, n) {
                    e.push({
                        name: t,
                        value: n
                    })
                }, arguments),
                    e
            }
            ,
            reqwest.serialize = function() {
                if (0 === arguments.length)
                    return "";
                var e, t, n = Array.prototype.slice.call(arguments, 0);
                return e = n.pop(),
                e && e.nodeType && n.push(e) && (e = null),
                e && (e = e.type),
                    t = "map" == e ? serializeHash : "array" == e ? reqwest.serializeArray : serializeQueryString,
                    t.apply(null, n)
            }
            ,
            reqwest.toQueryString = function(e, t) {
                var n, r, o = t || !1, i = [], u = encodeURIComponent, a = function(e, t) {
                    t = "function" == typeof t ? t() : null == t ? "" : t,
                        i[i.length] = u(e) + "=" + u(t)
                };
                if (isArray(e))
                    for (r = 0; e && r < e.length; r++)
                        a(e[r].name, e[r].value);
                else
                    for (n in e)
                        e.hasOwnProperty(n) && buildParams(n, e[n], o, a);
                return i.join("&").replace(/%20/g, "+")
            }
            ,
            reqwest.getcallbackPrefix = function() {
                return callbackPrefix
            }
            ,
            reqwest.compat = function(e, t) {
                return e && (e.type && (e.method = e.type) && delete e.type,
                e.dataType && (e.type = e.dataType),
                e.jsonpCallback && (e.jsonpCallbackName = e.jsonpCallback) && delete e.jsonpCallback,
                e.jsonp && (e.jsonpCallback = e.jsonp)),
                    new Reqwest(e,t)
            }
            ,
            reqwest.ajaxSetup = function(e) {
                e = e || {};
                for (var t in e)
                    globalSetupOptions[t] = e[t]
            }
            ,
            reqwest
    }),
    !function() {
        var e = "object" == typeof self && self.self === self && self || "object" == typeof global && global.global === global && global || this
            , t = e._
            , n = Array.prototype
            , r = Object.prototype
            , o = "undefined" != typeof Symbol ? Symbol.prototype : null
            , i = n.push
            , u = n.slice
            , a = r.toString
            , s = r.hasOwnProperty
            , c = Array.isArray
            , l = Object.keys
            , f = Object.create
            , p = function() {}
            , d = function(e) {
                return e instanceof d ? e : this instanceof d ? void (this._wrapped = e) : new d(e)
            };
        "undefined" == typeof exports || exports.nodeType ? e._ = d : ("undefined" != typeof module && !module.nodeType && module.exports && (exports = module.exports = d),
            exports._ = d),
            d.VERSION = "1.8.3";
        var h, m = function(e, t, n) {
            if (void 0 === t)
                return e;
            switch (null == n ? 3 : n) {
                case 1:
                    return function(n) {
                        return e.call(t, n)
                    }
                        ;
                case 3:
                    return function(n, r, o) {
                        return e.call(t, n, r, o)
                    }
                        ;
                case 4:
                    return function(n, r, o, i) {
                        return e.call(t, n, r, o, i)
                    }
            }
            return function() {
                return e.apply(t, arguments)
            }
        }, g = function(e, t, n) {
            return d.iteratee !== h ? d.iteratee(e, t) : null == e ? d.identity : d.isFunction(e) ? m(e, t, n) : d.isObject(e) ? d.matcher(e) : d.property(e)
        };
        d.iteratee = h = function(e, t) {
            return g(e, t, 1 / 0)
        }
        ;
        var v = function(e, t) {
                return t = null == t ? e.length - 1 : +t,
                    function() {
                        for (var n = Math.max(arguments.length - t, 0), r = Array(n), o = 0; n > o; o++)
                            r[o] = arguments[o + t];
                        switch (t) {
                            case 0:
                                return e.call(this, r);
                            case 1:
                                return e.call(this, arguments[0], r);
                            case 2:
                                return e.call(this, arguments[0], arguments[1], r)
                        }
                        var i = Array(t + 1);
                        for (o = 0; t > o; o++)
                            i[o] = arguments[o];
                        return i[t] = r,
                            e.apply(this, i)
                    }
            }
            , y = function(e) {
                if (!d.isObject(e))
                    return {};
                if (f)
                    return f(e);
                p.prototype = e;
                var t = new p;
                return p.prototype = null,
                    t
            }
            , b = function(e) {
                return function(t) {
                    return null == t ? void 0 : t[e]
                }
            }
            , x = Math.pow(2, 53) - 1
            , w = b("length")
            , _ = function(e) {
                var t = w(e);
                return "number" == typeof t && t >= 0 && x >= t
            };
        d.each = d.forEach = function(e, t, n) {
            t = m(t, n);
            var r, o;
            if (_(e))
                for (r = 0,
                         o = e.length; o > r; r++)
                    t(e[r], r, e);
            else {
                var i = d.keys(e);
                for (r = 0,
                         o = i.length; o > r; r++)
                    t(e[i[r]], i[r], e)
            }
            return e
        }
            ,
            d.map = d.collect = function(e, t, n) {
                t = g(t, n);
                for (var r = !_(e) && d.keys(e), o = (r || e).length, i = Array(o), u = 0; o > u; u++) {
                    var a = r ? r[u] : u;
                    i[u] = t(e[a], a, e)
                }
                return i
            }
        ;
        var C = function(e) {
            var t = function(t, n, r, o) {
                var i = !_(t) && d.keys(t)
                    , u = (i || t).length
                    , a = e > 0 ? 0 : u - 1;
                for (o || (r = t[i ? i[a] : a],
                    a += e); a >= 0 && u > a; a += e) {
                    var s = i ? i[a] : a;
                    r = n(r, t[s], s, t)
                }
                return r
            };
            return function(e, n, r, o) {
                var i = arguments.length >= 3;
                return t(e, m(n, o, 4), r, i)
            }
        };
        d.reduce = d.foldl = d.inject = C(1),
            d.reduceRight = d.foldr = C(-1),
            d.find = d.detect = function(e, t, n) {
                var r = _(e) ? d.findIndex : d.findKey
                    , o = r(e, t, n);
                return void 0 !== o && -1 !== o ? e[o] : void 0
            }
            ,
            d.filter = d.select = function(e, t, n) {
                var r = [];
                return t = g(t, n),
                    d.each(e, function(e, n, o) {
                        t(e, n, o) && r.push(e)
                    }),
                    r
            }
            ,
            d.reject = function(e, t, n) {
                return d.filter(e, d.negate(g(t)), n)
            }
            ,
            d.every = d.all = function(e, t, n) {
                t = g(t, n);
                for (var r = !_(e) && d.keys(e), o = (r || e).length, i = 0; o > i; i++) {
                    var u = r ? r[i] : i;
                    if (!t(e[u], u, e))
                        return !1
                }
                return !0
            }
            ,
            d.some = d.any = function(e, t, n) {
                t = g(t, n);
                for (var r = !_(e) && d.keys(e), o = (r || e).length, i = 0; o > i; i++) {
                    var u = r ? r[i] : i;
                    if (t(e[u], u, e))
                        return !0
                }
                return !1
            }
            ,
            d.contains = d.includes = d.include = function(e, t, n, r) {
                return _(e) || (e = d.values(e)),
                ("number" != typeof n || r) && (n = 0),
                d.indexOf(e, t, n) >= 0
            }
            ,
            d.invoke = v(function(e, t, n) {
                var r = d.isFunction(t);
                return d.map(e, function(e) {
                    var o = r ? t : e[t];
                    return null == o ? o : o.apply(e, n)
                })
            }),
            d.pluck = function(e, t) {
                return d.map(e, d.property(t))
            }
            ,
            d.where = function(e, t) {
                return d.filter(e, d.matcher(t))
            }
            ,
            d.findWhere = function(e, t) {
                return d.find(e, d.matcher(t))
            }
            ,
            d.max = function(e, t, n) {
                var r, o, i = -1 / 0, u = -1 / 0;
                if (null == t || "number" == typeof t && "object" != typeof e[0] && null != e) {
                    e = _(e) ? e : d.values(e);
                    for (var a = 0, s = e.length; s > a; a++)
                        r = e[a],
                        null != r && r > i && (i = r)
                } else
                    t = g(t, n),
                        d.each(e, function(e, n, r) {
                            o = t(e, n, r),
                            (o > u || o === -1 / 0 && i === -1 / 0) && (i = e,
                                u = o)
                        });
                return i
            }
            ,
            d.min = function(e, t, n) {
                var r, o, i = 1 / 0, u = 1 / 0;
                if (null == t || "number" == typeof t && "object" != typeof e[0] && null != e) {
                    e = _(e) ? e : d.values(e);
                    for (var a = 0, s = e.length; s > a; a++)
                        r = e[a],
                        null != r && i > r && (i = r)
                } else
                    t = g(t, n),
                        d.each(e, function(e, n, r) {
                            o = t(e, n, r),
                            (u > o || 1 / 0 === o && 1 / 0 === i) && (i = e,
                                u = o)
                        });
                return i
            }
            ,
            d.shuffle = function(e) {
                return d.sample(e, 1 / 0)
            }
            ,
            d.sample = function(e, t, n) {
                if (null == t || n)
                    return _(e) || (e = d.values(e)),
                        e[d.random(e.length - 1)];
                var r = _(e) ? d.clone(e) : d.values(e)
                    , o = w(r);
                t = Math.max(Math.min(t, o), 0);
                for (var i = o - 1, u = 0; t > u; u++) {
                    var a = d.random(u, i)
                        , s = r[u];
                    r[u] = r[a],
                        r[a] = s
                }
                return r.slice(0, t)
            }
            ,
            d.sortBy = function(e, t, n) {
                var r = 0;
                return t = g(t, n),
                    d.pluck(d.map(e, function(e, n, o) {
                        return {
                            value: e,
                            index: r++,
                            criteria: t(e, n, o)
                        }
                    }).sort(function(e, t) {
                        var n = e.criteria
                            , r = t.criteria;
                        if (n !== r) {
                            if (n > r || void 0 === n)
                                return 1;
                            if (r > n || void 0 === r)
                                return -1
                        }
                        return e.index - t.index
                    }), "value")
            }
        ;
        var S = function(e, t) {
            return function(n, r, o) {
                var i = t ? [[], []] : {};
                return r = g(r, o),
                    d.each(n, function(t, o) {
                        var u = r(t, o, n);
                        e(i, t, u)
                    }),
                    i
            }
        };
        d.groupBy = S(function(e, t, n) {
            d.has(e, n) ? e[n].push(t) : e[n] = [t]
        }),
            d.indexBy = S(function(e, t, n) {
                e[n] = t
            }),
            d.countBy = S(function(e, t, n) {
                d.has(e, n) ? e[n]++ : e[n] = 1
            });
        var j = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
        d.toArray = function(e) {
            return e ? d.isArray(e) ? u.call(e) : d.isString(e) ? e.match(j) : _(e) ? d.map(e, d.identity) : d.values(e) : []
        }
            ,
            d.size = function(e) {
                return null == e ? 0 : _(e) ? e.length : d.keys(e).length
            }
            ,
            d.partition = S(function(e, t, n) {
                e[n ? 0 : 1].push(t)
            }, !0),
            d.first = d.head = d.take = function(e, t, n) {
                return null == e || e.length < 1 ? void 0 : null == t || n ? e[0] : d.initial(e, e.length - t)
            }
            ,
            d.initial = function(e, t, n) {
                return u.call(e, 0, Math.max(0, e.length - (null == t || n ? 1 : t)))
            }
            ,
            d.last = function(e, t, n) {
                return null == e || e.length < 1 ? void 0 : null == t || n ? e[e.length - 1] : d.rest(e, Math.max(0, e.length - t))
            }
            ,
            d.rest = d.tail = d.drop = function(e, t, n) {
                return u.call(e, null == t || n ? 1 : t)
            }
            ,
            d.compact = function(e) {
                return d.filter(e, Boolean)
            }
        ;
        var k = function(e, t, n, r) {
            r = r || [];
            for (var o = r.length, i = 0, u = w(e); u > i; i++) {
                var a = e[i];
                if (_(a) && (d.isArray(a) || d.isArguments(a)))
                    if (t)
                        for (var s = 0, c = a.length; c > s; )
                            r[o++] = a[s++];
                    else
                        k(a, t, n, r),
                            o = r.length;
                else
                    n || (r[o++] = a)
            }
            return r
        };
        d.flatten = function(e, t) {
            return k(e, t, !1)
        }
            ,
            d.without = v(function(e, t) {
                return d.difference(e, t)
            }),
            d.uniq = d.unique = function(e, t, n, r) {
                d.isBoolean(t) || (r = n,
                    n = t,
                    t = !1),
                null != n && (n = g(n, r));
                for (var o = [], i = [], u = 0, a = w(e); a > u; u++) {
                    var s = e[u]
                        , c = n ? n(s, u, e) : s;
                    t ? (u && i === c || o.push(s),
                        i = c) : n ? d.contains(i, c) || (i.push(c),
                        o.push(s)) : d.contains(o, s) || o.push(s)
                }
                return o
            }
            ,
            d.union = v(function(e) {
                return d.uniq(k(e, !0, !0))
            }),
            d.intersection = function(e) {
                for (var t = [], n = arguments.length, r = 0, o = w(e); o > r; r++) {
                    var i = e[r];
                    if (!d.contains(t, i)) {
                        var u;
                        for (u = 1; n > u && d.contains(arguments[u], i); u++)
                            ;
                        u === n && t.push(i)
                    }
                }
                return t
            }
            ,
            d.difference = v(function(e, t) {
                return t = k(t, !0, !0),
                    d.filter(e, function(e) {
                        return !d.contains(t, e)
                    })
            }),
            d.unzip = function(e) {
                for (var t = e && d.max(e, w).length || 0, n = Array(t), r = 0; t > r; r++)
                    n[r] = d.pluck(e, r);
                return n
            }
            ,
            d.zip = v(d.unzip),
            d.object = function(e, t) {
                for (var n = {}, r = 0, o = w(e); o > r; r++)
                    t ? n[e[r]] = t[r] : n[e[r][0]] = e[r][1];
                return n
            }
        ;
        var E = function(e) {
            return function(t, n, r) {
                n = g(n, r);
                for (var o = w(t), i = e > 0 ? 0 : o - 1; i >= 0 && o > i; i += e)
                    if (n(t[i], i, t))
                        return i;
                return -1
            }
        };
        d.findIndex = E(1),
            d.findLastIndex = E(-1),
            d.sortedIndex = function(e, t, n, r) {
                n = g(n, r, 1);
                for (var o = n(t), i = 0, u = w(e); u > i; ) {
                    var a = Math.floor((i + u) / 2);
                    n(e[a]) < o ? i = a + 1 : u = a
                }
                return i
            }
        ;
        var T = function(e, t, n) {
            return function(r, o, i) {
                var a = 0
                    , s = w(r);
                if ("number" == typeof i)
                    e > 0 ? a = i >= 0 ? i : Math.max(i + s, a) : s = i >= 0 ? Math.min(i + 1, s) : i + s + 1;
                else if (n && i && s)
                    return i = n(r, o),
                        r[i] === o ? i : -1;
                if (o !== o)
                    return i = t(u.call(r, a, s), d.isNaN),
                        i >= 0 ? i + a : -1;
                for (i = e > 0 ? a : s - 1; i >= 0 && s > i; i += e)
                    if (r[i] === o)
                        return i;
                return -1
            }
        };
        d.indexOf = T(1, d.findIndex, d.sortedIndex),
            d.lastIndexOf = T(-1, d.findLastIndex),
            d.range = function(e, t, n) {
                null == t && (t = e || 0,
                    e = 0),
                n || (n = e > t ? -1 : 1);
                for (var r = Math.max(Math.ceil((t - e) / n), 0), o = Array(r), i = 0; r > i; i++,
                    e += n)
                    o[i] = e;
                return o
            }
            ,
            d.chunk = function(e, t) {
                if (null == t || 1 > t)
                    return [];
                for (var n = [], r = 0, o = e.length; o > r; )
                    n.push(u.call(e, r, r += t));
                return n
            }
        ;
        var A = function(e, t, n, r, o) {
            if (!(r instanceof t))
                return e.apply(n, o);
            var i = y(e.prototype)
                , u = e.apply(i, o);
            return d.isObject(u) ? u : i
        };
        d.bind = v(function(e, t, n) {
            if (!d.isFunction(e))
                throw new TypeError("Bind must be called on a function");
            var r = v(function(o) {
                return A(e, r, t, this, n.concat(o))
            });
            return r
        }),
            d.partial = v(function(e, t) {
                var n = d.partial.placeholder
                    , r = function() {
                        for (var o = 0, i = t.length, u = Array(i), a = 0; i > a; a++)
                            u[a] = t[a] === n ? arguments[o++] : t[a];
                        for (; o < arguments.length; )
                            u.push(arguments[o++]);
                        return A(e, r, this, this, u)
                    };
                return r
            }),
            d.partial.placeholder = d,
            d.bindAll = v(function(e, t) {
                t = k(t, !1, !1);
                var n = t.length;
                if (1 > n)
                    throw new Error("bindAll must be passed function names");
                for (; n--; ) {
                    var r = t[n];
                    e[r] = d.bind(e[r], e)
                }
            }),
            d.memoize = function(e, t) {
                var n = function(r) {
                    var o = n.cache
                        , i = "" + (t ? t.apply(this, arguments) : r);
                    return d.has(o, i) || (o[i] = e.apply(this, arguments)),
                        o[i]
                };
                return n.cache = {},
                    n
            }
            ,
            d.delay = v(function(e, t, n) {
                return setTimeout(function() {
                    return e.apply(null, n)
                }, t)
            }),
            d.defer = d.partial(d.delay, d, 1),
            d.throttle = function(e, t, n) {
                var r, o, i, u, a = 0;
                n || (n = {});
                var s = function() {
                        a = n.leading === !1 ? 0 : d.now(),
                            r = null,
                            u = e.apply(o, i),
                        r || (o = i = null)
                    }
                    , c = function() {
                        var c = d.now();
                        a || n.leading !== !1 || (a = c);
                        var l = t - (c - a);
                        return o = this,
                            i = arguments,
                            0 >= l || l > t ? (r && (clearTimeout(r),
                                r = null),
                                a = c,
                                u = e.apply(o, i),
                            r || (o = i = null)) : r || n.trailing === !1 || (r = setTimeout(s, l)),
                            u
                    };
                return c.cancel = function() {
                    clearTimeout(r),
                        a = 0,
                        r = o = i = null
                }
                    ,
                    c
            }
            ,
            d.debounce = function(e, t, n) {
                var r, o, i = function(t, n) {
                    r = null,
                    n && (o = e.apply(t, n))
                }, u = v(function(u) {
                    if (r && clearTimeout(r),
                            n) {
                        var a = !r;
                        r = setTimeout(i, t),
                        a && (o = e.apply(this, u))
                    } else
                        r = d.delay(i, t, this, u);
                    return o
                });
                return u.cancel = function() {
                    clearTimeout(r),
                        r = null
                }
                    ,
                    u
            }
            ,
            d.wrap = function(e, t) {
                return d.partial(t, e)
            }
            ,
            d.negate = function(e) {
                return function() {
                    return !e.apply(this, arguments)
                }
            }
            ,
            d.compose = function() {
                var e = arguments
                    , t = e.length - 1;
                return function() {
                    for (var n = t, r = e[t].apply(this, arguments); n--; )
                        r = e[n].call(this, r);
                    return r
                }
            }
            ,
            d.after = function(e, t) {
                return function() {
                    return --e < 1 ? t.apply(this, arguments) : void 0
                }
            }
            ,
            d.before = function(e, t) {
                var n;
                return function() {
                    return --e > 0 && (n = t.apply(this, arguments)),
                    1 >= e && (t = null),
                        n
                }
            }
            ,
            d.once = d.partial(d.before, 2),
            d.restArgs = v;
        var O = !{
                toString: null
            }.propertyIsEnumerable("toString")
            , M = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"]
            , N = function(e, t) {
                var n = M.length
                    , o = e.constructor
                    , i = d.isFunction(o) && o.prototype || r
                    , u = "constructor";
                for (d.has(e, u) && !d.contains(t, u) && t.push(u); n--; )
                    u = M[n],
                    u in e && e[u] !== i[u] && !d.contains(t, u) && t.push(u)
            };
        d.keys = function(e) {
            if (!d.isObject(e))
                return [];
            if (l)
                return l(e);
            var t = [];
            for (var n in e)
                d.has(e, n) && t.push(n);
            return O && N(e, t),
                t
        }
            ,
            d.allKeys = function(e) {
                if (!d.isObject(e))
                    return [];
                var t = [];
                for (var n in e)
                    t.push(n);
                return O && N(e, t),
                    t
            }
            ,
            d.values = function(e) {
                for (var t = d.keys(e), n = t.length, r = Array(n), o = 0; n > o; o++)
                    r[o] = e[t[o]];
                return r
            }
            ,
            d.mapObject = function(e, t, n) {
                t = g(t, n);
                for (var r = d.keys(e), o = r.length, i = {}, u = 0; o > u; u++) {
                    var a = r[u];
                    i[a] = t(e[a], a, e)
                }
                return i
            }
            ,
            d.pairs = function(e) {
                for (var t = d.keys(e), n = t.length, r = Array(n), o = 0; n > o; o++)
                    r[o] = [t[o], e[t[o]]];
                return r
            }
            ,
            d.invert = function(e) {
                for (var t = {}, n = d.keys(e), r = 0, o = n.length; o > r; r++)
                    t[e[n[r]]] = n[r];
                return t
            }
            ,
            d.functions = d.methods = function(e) {
                var t = [];
                for (var n in e)
                    d.isFunction(e[n]) && t.push(n);
                return t.sort()
            }
        ;
        var R = function(e, t) {
            return function(n) {
                var r = arguments.length;
                if (t && (n = Object(n)),
                    2 > r || null == n)
                    return n;
                for (var o = 1; r > o; o++)
                    for (var i = arguments[o], u = e(i), a = u.length, s = 0; a > s; s++) {
                        var c = u[s];
                        t && void 0 !== n[c] || (n[c] = i[c])
                    }
                return n
            }
        };
        d.extend = R(d.allKeys),
            d.extendOwn = d.assign = R(d.keys),
            d.findKey = function(e, t, n) {
                t = g(t, n);
                for (var r, o = d.keys(e), i = 0, u = o.length; u > i; i++)
                    if (r = o[i],
                            t(e[r], r, e))
                        return r
            }
        ;
        var q = function(e, t, n) {
            return t in n
        };
        d.pick = v(function(e, t) {
            var n = {}
                , r = t[0];
            if (null == e)
                return n;
            d.isFunction(r) ? (t.length > 1 && (r = m(r, t[1])),
                t = d.allKeys(e)) : (r = q,
                t = k(t, !1, !1),
                e = Object(e));
            for (var o = 0, i = t.length; i > o; o++) {
                var u = t[o]
                    , a = e[u];
                r(a, u, e) && (n[u] = a)
            }
            return n
        }),
            d.omit = v(function(e, t) {
                var n, r = t[0];
                return d.isFunction(r) ? (r = d.negate(r),
                t.length > 1 && (n = t[1])) : (t = d.map(k(t, !1, !1), String),
                    r = function(e, n) {
                        return !d.contains(t, n)
                    }
                ),
                    d.pick(e, r, n)
            }),
            d.defaults = R(d.allKeys, !0),
            d.create = function(e, t) {
                var n = y(e);
                return t && d.extendOwn(n, t),
                    n
            }
            ,
            d.clone = function(e) {
                return d.isObject(e) ? d.isArray(e) ? e.slice() : d.extend({}, e) : e
            }
            ,
            d.tap = function(e, t) {
                return t(e),
                    e
            }
            ,
            d.isMatch = function(e, t) {
                var n = d.keys(t)
                    , r = n.length;
                if (null == e)
                    return !r;
                for (var o = Object(e), i = 0; r > i; i++) {
                    var u = n[i];
                    if (t[u] !== o[u] || !(u in o))
                        return !1
                }
                return !0
            }
        ;
        var I, F;
        I = function(e, t, n, r) {
            if (e === t)
                return 0 !== e || 1 / e === 1 / t;
            if (null == e || null == t)
                return e === t;
            if (e !== e)
                return t !== t;
            var o = typeof e;
            return "function" !== o && "object" !== o && "object" != typeof t ? !1 : F(e, t, n, r)
        }
            ,
            F = function(e, t, n, r) {
                e instanceof d && (e = e._wrapped),
                t instanceof d && (t = t._wrapped);
                var i = a.call(e);
                if (i !== a.call(t))
                    return !1;
                switch (i) {
                    case "[object RegExp]":
                    case "[object String]":
                        return "" + e == "" + t;
                    case "[object Number]":
                        return +e !== +e ? +t !== +t : 0 === +e ? 1 / +e === 1 / t : +e === +t;
                    case "[object Date]":
                    case "[object Boolean]":
                        return +e === +t;
                    case "[object Symbol]":
                        return o.valueOf.call(e) === o.valueOf.call(t)
                }
                var u = "[object Array]" === i;
                if (!u) {
                    if ("object" != typeof e || "object" != typeof t)
                        return !1;
                    var s = e.constructor
                        , c = t.constructor;
                    if (s !== c && !(d.isFunction(s) && s instanceof s && d.isFunction(c) && c instanceof c) && "constructor"in e && "constructor"in t)
                        return !1
                }
                n = n || [],
                    r = r || [];
                for (var l = n.length; l--; )
                    if (n[l] === e)
                        return r[l] === t;
                if (n.push(e),
                        r.push(t),
                        u) {
                    if (l = e.length,
                        l !== t.length)
                        return !1;
                    for (; l--; )
                        if (!I(e[l], t[l], n, r))
                            return !1
                } else {
                    var f, p = d.keys(e);
                    if (l = p.length,
                        d.keys(t).length !== l)
                        return !1;
                    for (; l--; )
                        if (f = p[l],
                            !d.has(t, f) || !I(e[f], t[f], n, r))
                            return !1
                }
                return n.pop(),
                    r.pop(),
                    !0
            }
            ,
            d.isEqual = function(e, t) {
                return I(e, t)
            }
            ,
            d.isEmpty = function(e) {
                return null == e ? !0 : _(e) && (d.isArray(e) || d.isString(e) || d.isArguments(e)) ? 0 === e.length : 0 === d.keys(e).length
            }
            ,
            d.isElement = function(e) {
                return !(!e || 1 !== e.nodeType)
            }
            ,
            d.isArray = c || function(e) {
                return "[object Array]" === a.call(e)
            }
            ,
            d.isObject = function(e) {
                var t = typeof e;
                return "function" === t || "object" === t && !!e
            }
            ,
            d.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error", "Symbol", "Map", "WeakMap", "Set", "WeakSet"], function(e) {
                d["is" + e] = function(t) {
                    return a.call(t) === "[object " + e + "]"
                }
            }),
        d.isArguments(arguments) || (d.isArguments = function(e) {
            return d.has(e, "callee")
        }
        );
        var H = e.document && e.document.childNodes;
        "function" != typeof /./ && "object" != typeof Int8Array && "function" != typeof H && (d.isFunction = function(e) {
            return "function" == typeof e || !1
        }
        ),
            d.isFinite = function(e) {
                return !d.isSymbol(e) && isFinite(e) && !isNaN(parseFloat(e))
            }
            ,
            d.isNaN = function(e) {
                return d.isNumber(e) && isNaN(e)
            }
            ,
            d.isBoolean = function(e) {
                return e === !0 || e === !1 || "[object Boolean]" === a.call(e)
            }
            ,
            d.isNull = function(e) {
                return null === e
            }
            ,
            d.isUndefined = function(e) {
                return void 0 === e
            }
            ,
            d.has = function(e, t) {
                return null != e && s.call(e, t)
            }
            ,
            d.noConflict = function() {
                return e._ = t,
                    this
            }
            ,
            d.identity = function(e) {
                return e
            }
            ,
            d.constant = function(e) {
                return function() {
                    return e
                }
            }
            ,
            d.noop = function() {}
            ,
            d.property = b,
            d.propertyOf = function(e) {
                return null == e ? function() {}
                    : function(t) {
                    return e[t]
                }
            }
            ,
            d.matcher = d.matches = function(e) {
                return e = d.extendOwn({}, e),
                    function(t) {
                        return d.isMatch(t, e)
                    }
            }
            ,
            d.times = function(e, t, n) {
                var r = Array(Math.max(0, e));
                t = m(t, n, 1);
                for (var o = 0; e > o; o++)
                    r[o] = t(o);
                return r
            }
            ,
            d.random = function(e, t) {
                return null == t && (t = e,
                    e = 0),
                e + Math.floor(Math.random() * (t - e + 1))
            }
            ,
            d.now = Date.now || function() {
                return (new Date).getTime()
            }
        ;
        var L = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "'": "&#39;",
                "`": "&#x60;"
            }
            , P = d.invert(L)
            , B = function(e) {
                var t = function(t) {
                        return e[t]
                    }
                    , n = "(?:" + d.keys(e).join("|") + ")"
                    , r = RegExp(n)
                    , o = RegExp(n, "g");
                return function(e) {
                    return e = null == e ? "" : "" + e,
                        r.test(e) ? e.replace(o, t) : e
                }
            };
        d.escape = B(L),
            d.unescape = B(P),
            d.result = function(e, t, n) {
                var r = null == e ? void 0 : e[t];
                return void 0 === r && (r = n),
                    d.isFunction(r) ? r.call(e) : r
            }
        ;
        var $ = 0;
        d.uniqueId = function(e) {
            var t = ++$ + "";
            return e ? e + t : t
        }
            ,
            d.templateSettings = {
                evaluate: /<%([\s\S]+?)%>/g,
                interpolate: /<%=([\s\S]+?)%>/g,
                escape: /<%-([\s\S]+?)%>/g
            };
        var D = /(.)^/
            , U = {
                "'": "'",
                "\\": "\\",
                "\r": "r",
                "\n": "n",
                "\u2028": "u2028",
                "\u2029": "u2029"
            }
            , z = /\\|'|\r|\n|\u2028|\u2029/g
            , W = function(e) {
                return "\\" + U[e]
            };
        d.template = function(e, t, n) {
            !t && n && (t = n),
                t = d.defaults({}, t, d.templateSettings);
            var r = RegExp([(t.escape || D).source, (t.interpolate || D).source, (t.evaluate || D).source].join("|") + "|$", "g")
                , o = 0
                , i = "__p+='";
            e.replace(r, function(t, n, r, u, a) {
                return i += e.slice(o, a).replace(z, W),
                    o = a + t.length,
                    n ? i += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : r ? i += "'+\n((__t=(" + r + "))==null?'':__t)+\n'" : u && (i += "';\n" + u + "\n__p+='"),
                    t
            }),
                i += "';\n",
            t.variable || (i = "with(obj||{}){\n" + i + "}\n"),
                i = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + i + "return __p;\n";
            var u;
            try {
                u = new Function(t.variable || "obj","_",i)
            } catch (a) {
                throw a.source = i,
                    a
            }
            var s = function(e) {
                    return u.call(this, e, d)
                }
                , c = t.variable || "obj";
            return s.source = "function(" + c + "){\n" + i + "}",
                s
        }
            ,
            d.chain = function(e) {
                var t = d(e);
                return t._chain = !0,
                    t
            }
        ;
        var V = function(e, t) {
            return e._chain ? d(t).chain() : t
        };
        d.mixin = function(e) {
            return d.each(d.functions(e), function(t) {
                var n = d[t] = e[t];
                d.prototype[t] = function() {
                    var e = [this._wrapped];
                    return i.apply(e, arguments),
                        V(this, n.apply(d, e))
                }
            }),
                d
        }
            ,
            d.mixin(d),
            d.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e) {
                var t = n[e];
                d.prototype[e] = function() {
                    var n = this._wrapped;
                    return t.apply(n, arguments),
                    "shift" !== e && "splice" !== e || 0 !== n.length || delete n[0],
                        V(this, n)
                }
            }),
            d.each(["concat", "join", "slice"], function(e) {
                var t = n[e];
                d.prototype[e] = function() {
                    return V(this, t.apply(this._wrapped, arguments))
                }
            }),
            d.prototype.value = function() {
                return this._wrapped
            }
            ,
            d.prototype.valueOf = d.prototype.toJSON = d.prototype.value,
            d.prototype.toString = function() {
                return String(this._wrapped)
            }
            ,
        "function" == typeof define && define.amd && define("static/js/lib/underscore", ["require"], function() {
            return d
        })
    }(),
    !function(e) {
        if ("function" == typeof define && define.amd)
            define("static/js/lib/cookie", [], e);
        else if ("object" == typeof exports)
            module.exports = e();
        else {
            var t = window.Cookies
                , n = window.Cookies = e();
            n.noConflict = function() {
                return window.Cookies = t,
                    n
            }
        }
    }(function() {
        function e() {
            for (var e = 0, t = {}; e < arguments.length; e++) {
                var n = arguments[e];
                for (var r in n)
                    t[r] = n[r]
            }
            return t
        }
        function t(n) {
            function r(t, o, i) {
                var u;
                if ("undefined" != typeof document) {
                    if (arguments.length > 1) {
                        if (i = e({
                                path: "/"
                            }, r.defaults, i),
                            "number" == typeof i.expires) {
                            var a = new Date;
                            a.setMilliseconds(a.getMilliseconds() + 864e5 * i.expires),
                                i.expires = a
                        }
                        try {
                            u = JSON.stringify(o),
                            /^[\{\[]/.test(u) && (o = u)
                        } catch (s) {}
                        return o = n.write ? n.write(o, t) : encodeURIComponent(String(o)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent),
                            t = encodeURIComponent(String(t)),
                            t = t.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent),
                            t = t.replace(/[\(\)]/g, escape),
                            document.cookie = [t, "=", o, i.expires && "; expires=" + i.expires.toUTCString(), i.path && "; path=" + i.path, i.domain && "; domain=" + i.domain, i.secure ? "; secure" : ""].join("")
                    }
                    t || (u = {});
                    for (var c = document.cookie ? document.cookie.split("; ") : [], l = /(%[0-9A-Z]{2})+/g, f = 0; f < c.length; f++) {
                        var p = c[f].split("=")
                            , d = p[0].replace(l, decodeURIComponent)
                            , h = p.slice(1).join("=");
                        '"' === h.charAt(0) && (h = h.slice(1, -1));
                        try {
                            if (h = n.read ? n.read(h, d) : n(h, d) || h.replace(l, decodeURIComponent),
                                    this.json)
                                try {
                                    h = JSON.parse(h)
                                } catch (s) {}
                            if (t === d) {
                                u = h;
                                break
                            }
                            t || (u[d] = h)
                        } catch (s) {}
                    }
                    return u
                }
            }
            return r.set = r,
                r.get = function(e) {
                    return r(e)
                }
                ,
                r.getJSON = function() {
                    return r.apply({
                        json: !0
                    }, [].slice.call(arguments))
                }
                ,
                r.defaults = {},
                r.remove = function(t, n) {
                    r(t, "", e(n, {
                        expires: -1
                    }))
                }
                ,
                r.withConverter = t,
                r
        }
        return t(function() {})
    }),
    !function(e) {
        "use strict";
        function t(e, t) {
            var n = (65535 & e) + (65535 & t)
                , r = (e >> 16) + (t >> 16) + (n >> 16);
            return r << 16 | 65535 & n
        }
        function n(e, t) {
            return e << t | e >>> 32 - t
        }
        function r(e, r, o, i, u, a) {
            return t(n(t(t(r, e), t(i, a)), u), o)
        }
        function o(e, t, n, o, i, u, a) {
            return r(t & n | ~t & o, e, t, i, u, a)
        }
        function i(e, t, n, o, i, u, a) {
            return r(t & o | n & ~o, e, t, i, u, a)
        }
        function u(e, t, n, o, i, u, a) {
            return r(t ^ n ^ o, e, t, i, u, a)
        }
        function a(e, t, n, o, i, u, a) {
            return r(n ^ (t | ~o), e, t, i, u, a)
        }
        function s(e, n) {
            e[n >> 5] |= 128 << n % 32,
                e[(n + 64 >>> 9 << 4) + 14] = n;
            var r, s, c, l, f, p = 1732584193, d = -271733879, h = -1732584194, m = 271733878;
            for (r = 0; r < e.length; r += 16)
                s = p,
                    c = d,
                    l = h,
                    f = m,
                    p = o(p, d, h, m, e[r], 7, -680876936),
                    m = o(m, p, d, h, e[r + 1], 12, -389564586),
                    h = o(h, m, p, d, e[r + 2], 17, 606105819),
                    d = o(d, h, m, p, e[r + 3], 22, -1044525330),
                    p = o(p, d, h, m, e[r + 4], 7, -176418897),
                    m = o(m, p, d, h, e[r + 5], 12, 1200080426),
                    h = o(h, m, p, d, e[r + 6], 17, -1473231341),
                    d = o(d, h, m, p, e[r + 7], 22, -45705983),
                    p = o(p, d, h, m, e[r + 8], 7, 1770035416),
                    m = o(m, p, d, h, e[r + 9], 12, -1958414417),
                    h = o(h, m, p, d, e[r + 10], 17, -42063),
                    d = o(d, h, m, p, e[r + 11], 22, -1990404162),
                    p = o(p, d, h, m, e[r + 12], 7, 1804603682),
                    m = o(m, p, d, h, e[r + 13], 12, -40341101),
                    h = o(h, m, p, d, e[r + 14], 17, -1502002290),
                    d = o(d, h, m, p, e[r + 15], 22, 1236535329),
                    p = i(p, d, h, m, e[r + 1], 5, -165796510),
                    m = i(m, p, d, h, e[r + 6], 9, -1069501632),
                    h = i(h, m, p, d, e[r + 11], 14, 643717713),
                    d = i(d, h, m, p, e[r], 20, -373897302),
                    p = i(p, d, h, m, e[r + 5], 5, -701558691),
                    m = i(m, p, d, h, e[r + 10], 9, 38016083),
                    h = i(h, m, p, d, e[r + 15], 14, -660478335),
                    d = i(d, h, m, p, e[r + 4], 20, -405537848),
                    p = i(p, d, h, m, e[r + 9], 5, 568446438),
                    m = i(m, p, d, h, e[r + 14], 9, -1019803690),
                    h = i(h, m, p, d, e[r + 3], 14, -187363961),
                    d = i(d, h, m, p, e[r + 8], 20, 1163531501),
                    p = i(p, d, h, m, e[r + 13], 5, -1444681467),
                    m = i(m, p, d, h, e[r + 2], 9, -51403784),
                    h = i(h, m, p, d, e[r + 7], 14, 1735328473),
                    d = i(d, h, m, p, e[r + 12], 20, -1926607734),
                    p = u(p, d, h, m, e[r + 5], 4, -378558),
                    m = u(m, p, d, h, e[r + 8], 11, -2022574463),
                    h = u(h, m, p, d, e[r + 11], 16, 1839030562),
                    d = u(d, h, m, p, e[r + 14], 23, -35309556),
                    p = u(p, d, h, m, e[r + 1], 4, -1530992060),
                    m = u(m, p, d, h, e[r + 4], 11, 1272893353),
                    h = u(h, m, p, d, e[r + 7], 16, -155497632),
                    d = u(d, h, m, p, e[r + 10], 23, -1094730640),
                    p = u(p, d, h, m, e[r + 13], 4, 681279174),
                    m = u(m, p, d, h, e[r], 11, -358537222),
                    h = u(h, m, p, d, e[r + 3], 16, -722521979),
                    d = u(d, h, m, p, e[r + 6], 23, 76029189),
                    p = u(p, d, h, m, e[r + 9], 4, -640364487),
                    m = u(m, p, d, h, e[r + 12], 11, -421815835),
                    h = u(h, m, p, d, e[r + 15], 16, 530742520),
                    d = u(d, h, m, p, e[r + 2], 23, -995338651),
                    p = a(p, d, h, m, e[r], 6, -198630844),
                    m = a(m, p, d, h, e[r + 7], 10, 1126891415),
                    h = a(h, m, p, d, e[r + 14], 15, -1416354905),
                    d = a(d, h, m, p, e[r + 5], 21, -57434055),
                    p = a(p, d, h, m, e[r + 12], 6, 1700485571),
                    m = a(m, p, d, h, e[r + 3], 10, -1894986606),
                    h = a(h, m, p, d, e[r + 10], 15, -1051523),
                    d = a(d, h, m, p, e[r + 1], 21, -2054922799),
                    p = a(p, d, h, m, e[r + 8], 6, 1873313359),
                    m = a(m, p, d, h, e[r + 15], 10, -30611744),
                    h = a(h, m, p, d, e[r + 6], 15, -1560198380),
                    d = a(d, h, m, p, e[r + 13], 21, 1309151649),
                    p = a(p, d, h, m, e[r + 4], 6, -145523070),
                    m = a(m, p, d, h, e[r + 11], 10, -1120210379),
                    h = a(h, m, p, d, e[r + 2], 15, 718787259),
                    d = a(d, h, m, p, e[r + 9], 21, -343485551),
                    p = t(p, s),
                    d = t(d, c),
                    h = t(h, l),
                    m = t(m, f);
            return [p, d, h, m]
        }
        function c(e) {
            var t, n = "";
            for (t = 0; t < 32 * e.length; t += 8)
                n += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
            return n
        }
        function l(e) {
            var t, n = [];
            for (n[(e.length >> 2) - 1] = void 0,
                     t = 0; t < n.length; t += 1)
                n[t] = 0;
            for (t = 0; t < 8 * e.length; t += 8)
                n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
            return n
        }
        function f(e) {
            return c(s(l(e), 8 * e.length))
        }
        function p(e, t) {
            var n, r, o = l(e), i = [], u = [];
            for (i[15] = u[15] = void 0,
                 o.length > 16 && (o = s(o, 8 * e.length)),
                     n = 0; 16 > n; n += 1)
                i[n] = 909522486 ^ o[n],
                    u[n] = 1549556828 ^ o[n];
            return r = s(i.concat(l(t)), 512 + 8 * t.length),
                c(s(u.concat(r), 640))
        }
        function d(e) {
            var t, n, r = "0123456789abcdef", o = "";
            for (n = 0; n < e.length; n += 1)
                t = e.charCodeAt(n),
                    o += r.charAt(t >>> 4 & 15) + r.charAt(15 & t);
            return o
        }
        function h(e) {
            return unescape(encodeURIComponent(e))
        }
        function m(e) {
            return f(h(e))
        }
        function g(e) {
            return d(m(e))
        }
        function v(e, t) {
            return p(h(e), h(t))
        }
        function y(e, t) {
            return d(v(e, t))
        }
        function b(e, t, n) {
            return t ? n ? v(t, e) : y(t, e) : n ? m(e) : g(e)
        }
        "function" == typeof define && define.amd ? define("static/js/lib/md5", ["require"], function() {
            return b
        }) : "object" == typeof module && module.exports ? module.exports = b : e.md5 = b
    }(this),
    !function(e, t, n) {
        "function" == typeof define && define.amd ? define("static/js/lib/user", [], n) : "object" == typeof exports ? module.exports = n() : t[e] = n()
    }("user", this, function() {
        function e() {}
        var t = "/auth/login/"
            , n = "/user/info/"
            , r = "/auth/connect/?type=toutiao&platform="
            , o = null
            , i = !1
            , u = ""
            , a = function(t, n) {
                var r = !0;
                try {
                    r = t.closed
                } catch (o) {}
                r ? (clearTimeout(arguments.callee.timer),
                    e.checkLogin(n)) : u = setTimeout(function() {
                    a(t, n)
                }, 1e3)
            };
        return e.loginByLoc = function(e) {
            if (e = e || {},
                    !i) {
                i = !0;
                var n = e.successCb || function() {}
                    , r = e.errorCb || function() {}
                    ;
                http({
                    url: t,
                    method: "POST",
                    data: e.data,
                    headers: {
                        "X-CSRFToken": Cookies.get("csrftoken")
                    },
                    success: function(e) {
                        return i = !1,
                            e = e || {},
                            "success" !== e.message ? r(e) : (o = e.user,
                                void n(o))
                    },
                    error: function() {
                        i = !1,
                            r({})
                    }
                })
            }
        }
            ,
            e.loginByOther = function(e, t) {
                var n = 610
                    , o = 505
                    , i = r + e
                    , u = Math.max((window.screen.width - n) / 2, 0)
                    , s = Math.max((window.screen.height - o) / 2, 0)
                    , c = "location=0,toolbar=0,status=0,resizable=0,scrollbars=1,width=610,height=505,top=" + s + ",left=" + u
                    , l = window.open(i, "login", c);
                try {
                    l.focus()
                } catch (f) {}
                a(l, t)
            }
            ,
            e.checkLogin = function(t) {
                t = t || {};
                var n = t.successCb || function() {}
                    ;
                t.errorCb = function() {
                    window.location.href = "https://sso.toutiao.com/login/"
                }
                    ,
                    o ? n(o) : e.getUserInfo(t)
            }
            ,
            e.getUserInfo = function(e) {
                e = e || {};
                var t = e.successCb || function() {}
                    , r = e.errorCb || function() {}
                    ;
                http({
                    url: n,
                    method: "get",
                    cache: !1,
                    success: function(e) {
                        return e = e || {},
                            "error" === e.message ? r(e) : (o = e,
                                void t(o))
                    },
                    error: function() {
                        r({})
                    }
                })
            }
            ,
            e
    });
var utils = {
    getEvent: function(e) {
        return e || window.event
    },
    getTarget: function(e) {
        return e.target || e.srcElement
    },
    getAttribute: function(e, t) {
        if (!e)
            return "";
        var n = e.getAttribute(t);
        return n ? n : ""
    },
    setAttribute: function(e, t, n) {
        e && e.setAttribute(t, n)
    },
    on: function(e, t, n) {
        if (e.addEventListener)
            return e.addEventListener(t, n, !1),
                n;
        if (e.attachEvent) {
            var r = function() {
                var t = window.event;
                t.target = t.srcElement,
                    n.call(e, t)
            };
            return e.attachEvent("on" + t, r),
                r
        }
    },
    off: function(e, t, n) {
        e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent && e.detachEvent("on" + t, n)
    },
    preventDefault: function(e) {
        e.preventDefault ? e.preventDefault() : "returnValue"in e && (e.returnValue = !1)
    },
    stopPropagation: function(e) {
        e.stopPropagation ? e.stopPropagation() : "cancelBubble"in e && (e.cancelBubble = !0)
    },
    getChar: function(e) {
        return null == e.which ? String.fromCharCode(e.keyCode) : 0 != e.which && 0 != e.charCode ? String.fromCharCode(e.which) : null
    },
    getKeyCode: function(e) {
        return e.which || e.keyCode
    },
    offset: function(e) {
        for (var t = 0, n = 0, r = e; null != r && r != document.body; )
            t += r.offsetLeft,
                n += r.offsetTop,
                r = r.offsetParent;
        return {
            left: t,
            top: n
        }
    },
    scrollTop: function() {
        return "undefined" != typeof window.pageYOffset ? window.pageYOffset : document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ? document.body.scrollTop : 0
    },
    setStyle: function(e, t, n) {
        e.style.cssText += ";" + (t + ":" + n)
    },
    getElementsByClassName: function(e, t) {
        if (document.getElementsByClassName)
            return document.getElementsByClassName(t);
        for (var n = [], r = new RegExp("(^| )" + t + "( |$)"), o = e.getElementsByTagName("*"), i = 0, u = o.length; u > i; i++)
            r.test(o[i].className) && n.push(o[i]);
        return n
    },
    hasClass: function(e, t) {
        return t = t || "",
            0 == t.replace(/\s/g, "").length ? !1 : new RegExp(" " + t + " ").test(" " + e.className + " ")
    },
    addClass: function(e, t) {
        this.hasClass(e, t) || (e.className = "" == e.className ? t : e.className + " " + t)
    },
    removeClass: function(e, t) {
        if (this.hasClass(e, t)) {
            for (var n = " " + e.className.replace(/[\t\r\n]/g, "") + " "; n.indexOf(" " + t + " ") >= 0; )
                n = n.replace(" " + t + " ", " ");
            e.className = n.replace(/^\s+|\s+$/g, "")
        }
    },
    toggleClass: function(e, t) {
        this.hasClass(e, t) ? this.removeClass(e, t) : this.addClass(e, t)
    },
    getWinSize: function() {
        return window.innerHeight && window.innerWidth ? {
            winWidth: window.innerWidth,
            winHeight: window.innerHeight
        } : document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth ? {
            winWidth: document.documentElement.clientWidth,
            winHeight: document.documentElement.clientHeight
        } : void 0
    },
    isAllInView: function(e) {
        var t = e.getBoundingClientRect()
            , n = this.getWinSize();
        return t.top >= 0 && t.left >= 0 && t.bottom <= n.winHeight && t.right <= n.winWidth
    },
    isContentInView: function(e, t) {
        var n = e.getBoundingClientRect()
            , r = this.getWinSize()
            , t = t || 0;
        return n.top + t < r.winHeight && n.bottom > t
    },
    some: function(e, t) {
        for (var n = 0, r = e.length; r > n; n++)
            if (t(e[n], n))
                return !0;
        return !1
    },
    hasProp: function(e) {
        var t = document.createElement("div");
        return this.some(e, function(e) {
            return void 0 !== t.style[e]
        })
    },
    cssAnimationSupport: function() {
        var e = this.hasProp(["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"])
            , t = this.hasProp(["transformProperty", "WebkitTransform", "MozTransform", "OTransform", "msTransform"])
            , n = this.hasProp(["transitionProperty", "WebkitTransitionProperty", "MozTransitionProperty", "OTransitionProperty", "msTransitionProperty"]);
        return (e || t) && n
    },
    isIE: function() {
        var e = document.createElement("b");
        return e.innerHTML = "<!--[if IE]><i></i><![endif]-->",
        1 === e.getElementsByTagName("i").length
    },
    isFileSupport: function() {
        return !(!window.FormData || !File)
    },
    timeAgo: function(e) {
        "object" != typeof e && (e = new Date(1e3 * e));
        var t, n = Math.floor((new Date - e) / 1e3), r = Math.floor(n / 31536e3);
        return r >= 1 ? t = "年" : (r = Math.floor(n / 2592e3),
            r >= 1 ? t = "月" : (r = Math.floor(n / 86400),
                r >= 1 ? t = "天" : (r = Math.floor(n / 3600),
                    r >= 1 ? t = "小时" : (r = Math.floor(n / 60),
                        r >= 1 ? t = "分钟" : (r = n,
                            t = "秒"))))),
            "秒" === t ? "刚刚" : r + t + "前"
    },
    numFormat: function(e, t, n) {
        var e = +e
            , t = void 0 === t ? 0 : t
            , n = "en" === n ? "w" : "万";
        return "[object Number]" === Object.prototype.toString.call(e) ? 1e4 > e ? e : (e / 1e4).toFixed(t) + n : 0
    },
    numCutByComma: function(e) {
        return "[object Number]" === Object.prototype.toString.call(+e) ? (e + "").split("").reverse().join("").replace(/(\d{3})(?=[^$])/g, "$1,").split("").reverse().join("") : void 0
    },
    getSearchParams: function() {
        for (var e = location.search.slice(1), t = {}, n = e.split("&"), r = 0, o = n.length; o > r; r++) {
            var i, u = n[r];
            "" !== u.replace(/^\s+|\s+$/g, "") && (i = u.split("="),
                t[i[0]] = i[1])
        }
        return t
    },
    getHashValue: function(e) {
        var t, n = window.location.hash;
        return n ? (t = n.split("="),
            t[0] == e ? t[1] : "") : ""
    },
    generateRandomAlphaNum: function(e) {
        for (var t = ""; t.length < e; t += Math.random().toString(36).substr(2))
            ;
        return t.substr(0, e)
    },
    highlightText: function(e, t) {
        for (var n, r, o = t && t.length || 0; o && (n = t[--o],
            !(r && r[0] <= n[0] + n[1] - 1)); )
            r = n,
                e = e.slice(0, n[0]) + '<em class="highlight">' + e.slice(n[0], n[0] + n[1]) + "</em>" + e.slice(n[0] + n[1]);
        return e || ""
    },
    loadScript: function(e, t, n) {
        var r = document.createElement("script");
        r.src = e,
            r.crossOrigin = "anonymous",
            r.onload = function() {
                t && t.call()
            }
            ,
            r.onerror = function() {
                n && n.call()
            }
            ,
            document.body.appendChild(r)
    }
};
!function() {
    "use strict";
    var e = {
            ads: {},
            loaded: function() {
                var t = [].slice.call(arguments, 0)
                    , n = t[0]
                    , r = t[1]
                    , o = t[2];
                n && e.ads[n] && (e.sendToGA(["ad", n, r, o].join("_")),
                e.ads[n].installed || (e.ads[n].installed = !0,
                    e.sendToGA(["ad", n, "installed"].join("_"))))
            }
        }
        , t = function(t, n) {
            var r = document.createElement("script")
                , o = document.getElementsByTagName("head")[0]
                , i = [].concat(t.url.match(/[a-zA-Z0-9]+(?=\.js$)/g))[0];
            return r.async = !0,
                r.type = "text/javascript",
                r.charset = t.charset || "utf8",
                r.id = t.id || "",
                r.onload = function() {
                    e.loaded.call(e.ads, n, "success", i)
                }
                ,
                r.onerror = function() {
                    e.loaded.call(e.ads, n, "error", i)
                }
                ,
                t.url ? (r.src = t.url,
                o && o.insertBefore(r, o.firstChild),
                    r) : !1
        };
    e.addScript = function(n) {
        var r = e.ads[n];
        if (r) {
            var o = r.scripts
                , i = r.before;
            i && "function" == typeof i && i.call(r);
            for (var u = 0, a = o.length; a > u; u++)
                t(o[u], n)
        }
    }
        ,
        e.sendToGA = function(e) {
            var t = window.ga
                , n = window._czc
                , r = document.location.pathname;
            t && t("send", "event", r, e, "", {
                nonInteraction: !0
            }),
            n && n.push(["_trackEvent", e, "广告", "加载", 1, ""])
        }
        ,
        e.insertAd = function(t) {
            e.ads[t.name] = {
                name: t.name,
                scripts: t.scripts,
                before: t.beforeFun,
                installed: !1
            }
        }
        ,
        e.start = function(t, n) {
            setTimeout(function() {
                e.addScript(t)
            }, n || 0)
        }
        ,
        e.transfer = function() {
            var e, t = function() {
                for (var e, t = Array.prototype.slice.call(arguments, 0), n = 0, r = 0, o = t.length; o > r; r++)
                    e = 1 * t[r],
                    e && (n += e);
                return n
            }, n = function() {
                var n = 1 * ("" + [].concat(document.cookie.match(/tt_webid\=\ds+/g))[0]).split("=")[1];
                return n = n ? t(n) : Math.floor(100 * Math.random()),
                    n %= 100,
                    25 >= n ? e = "tb" : 45 > n ? e = "bd" : 75 > n && (e = "hz"),
                    e
            };
            return n()
        }
        ,
        (window.tt_ddap = window.tt_ddap || {}).Q = e
}(window),
    !function(e, t) {
        function n(e) {
            var t = i("__tasessionId");
            return t ? t && e && (u("__tasessionId", t, {
                expires: 1800
            }),
                l = !1) : (c = (new Date).getTime(),
                t = "" + r(9) + (new Date).getTime(),
                u("__tasessionId", t, {
                    expires: 1800
                }),
                l = !0),
                t
        }
        function r(e) {
            for (var t = ""; t.length < e; t += Math.random().toString(36).substr(2))
                ;
            return t.substr(0, e)
        }
        function o(e) {
            for (var t, n, r = 1, o = arguments.length; o > r; r++) {
                t = arguments[r];
                for (n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            return e
        }
        function i(e) {
            var n, r = new RegExp("(^| )" + e + "=([^;]*)(;|$)");
            return (n = t.cookie.match(r)) ? unescape(n[2]) : null
        }
        function u(e, n, r) {
            var i, u = {
                path: "/"
            };
            o(u, r),
            u.expires && (i = new Date,
                i.setTime(i.getTime() + 1e3 * r.expires)),
                t.cookie = [e, "=", escape(n), u.expires ? "; expires=" + i.toUTCString() : "", u.path ? "; path=" + u.path : "", u.domain ? "; domain=" + u.domain : "", u.secure ? "; secure" : ""].join("")
        }
        var a = {}
            , s = {}
            , c = (new Date).getTime()
            , l = !1;
        a.setup = function(e) {
            o(s, e)
        }
            ,
            a.send = function(t, r) {
                var i = "//www.toutiao.com/api/article/user_log/?"
                    , u = []
                    , a = {};
                if (o(a, s, r, {
                        sid: n("event" === t),
                        type: t
                    }),
                    "close" !== t || (a.st = (new Date).getTime() - c,
                        !l)) {
                    for (k in a)
                        u.push(k + "=" + a[k]);
                    u.push("t=" + (new Date).getTime()),
                        e._ta_log_img_ = new Image,
                        e._ta_log_img_.src = i + u.join("&")
                }
            }
            ,
            e.onbeforeunload = function() {
                a.send("close", {})
            }
            ,
            e.taAnalysis = a
    }(window, document, void 0),
    !function(e) {
        function t() {
            this.cache = e.localStorage
        }
        t.prototype = {
            exist: function() {
                return !(!this.cache || !this.cache.getItem)
            },
            encode: function(e) {
                return JSON.stringify(e)
            },
            decode: function(e) {
                return JSON.parse(e)
            },
            get: function(e) {
                var t;
                try {
                    t = this.cache.getItem(e)
                } catch (n) {}
                return t
            },
            set: function(e, t) {
                try {
                    this.cache.setItem(e, t)
                } catch (n) {}
            },
            del: function(e) {
                try {
                    this.cache.removeItem(e)
                } catch (t) {}
            },
            clear: function() {
                try {
                    this.cache.clear()
                } catch (e) {}
            }
        },
            e.tStorage = new t
    }(window, document),
    !function(e, t, n) {
        "function" == typeof define && define.amd ? define("static/js/lib/tAnimation", [], n) : "object" == typeof exports ? module.exports = n() : t[e] = n()
    }("TAnimation", this, function() {
        function e(e) {
            return "[object Function]" === Object.prototype.toString.call(e)
        }
        !function() {
            for (var e = 0, t = ["ms", "moz", "webkit", "o"], n = 0; n < t.length && !window.requestAnimationFrame; ++n)
                window.requestAnimationFrame = window[t[n] + "RequestAnimationFrame"],
                    window.cancelAnimationFrame = window[t[n] + "CancelAnimationFrame"] || window[t[n] + "CancelRequestAnimationFrame"];
            window.requestAnimationFrame || (window.requestAnimationFrame = function(t) {
                var n = (new Date).getTime()
                    , r = Math.max(0, 16 - (n - e))
                    , o = window.setTimeout(function() {
                        t(n + r)
                    }, r);
                return e = n + r,
                    o
            }
            ),
            window.cancelAnimationFrame || (window.cancelAnimationFrame = function(e) {
                clearTimeout(e)
            }
            )
        }();
        var t = function() {
                if (document.documentMode)
                    return document.documentMode;
                for (var e = 7; e > 0; e--) {
                    var t = document.createElement("div");
                    if (t.innerHTML = "<!--[if IE " + e + "]><span></span><![endif]-->",
                            t.getElementsByTagName("span").length)
                        return t = null,
                            e;
                    t = null
                }
                return void 0
            }()
            , n = {
                easeNone: function(e) {
                    return e
                },
                easeIn: function(e) {
                    return e * e
                },
                easeOut: function(e) {
                    return e * (2 - e)
                },
                easeBoth: function(e) {
                    return (e /= .5) < 1 ? .5 * e * e : -.5 * (--e * (e - 2) - 1)
                },
                easeInStrong: function(e) {
                    return e * e * e * e
                },
                easeOutStrong: function(e) {
                    return -((e -= 1) * e * e * e - 1)
                },
                easeBothStrong: function(e) {
                    return (e /= .5) < 1 ? .5 * e * e * e * e : -.5 * ((e -= 2) * e * e * e - 2)
                },
                elasticIn: function(e) {
                    if (0 == e)
                        return 0;
                    if (1 == e)
                        return 1;
                    var t = .3
                        , n = t / 4;
                    return -(Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e - n) * Math.PI / t))
                },
                elasticOut: function(e) {
                    if (0 == e)
                        return 0;
                    if (1 == e)
                        return 1;
                    var t = .3
                        , n = t / 4;
                    return Math.pow(2, -10 * e) * Math.sin(2 * (e - n) * Math.PI / t) + 1
                },
                elasticBoth: function(e) {
                    if (0 == e)
                        return 0;
                    if (2 == (e /= .5))
                        return 1;
                    var t = .3 * 1.5
                        , n = t / 4;
                    return 1 > e ? -.5 * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e - n) * Math.PI / t) : Math.pow(2, -10 * (e -= 1)) * Math.sin(2 * (e - n) * Math.PI / t) * .5 + 1
                },
                backIn: function(e) {
                    var t = 1.70158;
                    return e * e * ((t + 1) * e - t)
                },
                backOut: function(e) {
                    var t = 1.70158;
                    return (e -= 1) * e * ((t + 1) * e + t) + 1
                },
                backBoth: function(e) {
                    var t = 1.70158;
                    return (e /= .5) < 1 ? .5 * e * e * (((t *= 1.525) + 1) * e - t) : .5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2)
                },
                bounceIn: function(e) {
                    return 1 - n.bounceOut(1 - e)
                },
                bounceOut: function(e) {
                    return 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
                },
                bounceBoth: function(e) {
                    return .5 > e ? .5 * n.bounceIn(2 * e) : .5 * n.bounceOut(2 * e - 1) + .5
                }
            }
            , r = function() {
                this._timerId = null
            };
        return r.prototype = {
            _getValue: function(e, n) {
                if (8 >= t && "opacity" === n) {
                    var r = e.style.filter.toString().match(/alpha\(opacity=(.*)\)/i);
                    return r[1] / 100
                }
                return parseInt(e.style[n], 10)
            },
            _setValue: function(e, n, r) {
                8 >= t && "opacity" === n ? e.style.filter = "alpha(opacity=" + parseInt(100 * parseFloat(r), 10) + ")" : (r = "opacity" === n ? r : r + "px",
                    e.style[n] = r)
            },
            animate: function(t, r) {
                var o = this
                    , i = t.el
                    , u = t.prop
                    , a = t.to
                    , s = t.transitionDuration || 400
                    , c = t.animationFun || "easeNone"
                    , l = +new Date
                    , f = this._getValue(i, u)
                    , p = parseInt(s, 10)
                    , d = function(e, t) {
                        var r = e /= t;
                        return n[c] ? n[c](r) : n.easeNone(r)
                    };
                this._timerId && cancelAnimationFrame(this._timerId),
                    this._timerId = requestAnimationFrame(function h() {
                        var t, n, s = new Date - l, c = !0;
                        s >= p ? (cancelAnimationFrame(o._timerId),
                            o._timerId = null,
                            n = a,
                        e(r) && r(),
                            c = !1) : (t = d(s, p),
                            n = t * (a - f) + f),
                            o._setValue(i, u, n),
                        c && (o._timerId = requestAnimationFrame(h))
                    })
            }
        },
            r
    }),
    !function(e, t) {
        "use strict";
        function n() {
            return "undefined" == typeof document ? "" : document.location.href
        }
        function r(e, t) {
            var n, r;
            if (U) {
                t = t || {},
                    e = "raven" + e.substr(0, 1).toUpperCase() + e.substr(1),
                    document.createEvent ? (n = document.createEvent("HTMLEvents"),
                        n.initEvent(e, !0, !0)) : (n = document.createEventObject(),
                        n.eventType = e);
                for (r in t)
                    p(t, r) && (n[r] = t[r]);
                if (document.createEvent)
                    document.dispatchEvent(n);
                else
                    try {
                        document.fireEvent("on" + n.eventType.toLowerCase(), n)
                    } catch (o) {}
            }
        }
        function o(e) {
            this.name = "RavenConfigError",
                this.message = e
        }
        function i(e) {
            var t = tt.exec(e)
                , n = {}
                , r = 7;
            try {
                for (; r--; )
                    n[et[r]] = t[r] || ""
            } catch (i) {
                throw new o("Invalid DSN: " + e)
            }
            if (n.pass)
                throw new o("Do not specify your private key in the DSN!");
            return n
        }
        function u(e) {
            return void 0 === e
        }
        function a(e) {
            return "function" == typeof e
        }
        function s(e) {
            return "[object String]" === X.toString.call(e)
        }
        function c(e) {
            return "object" == typeof e && null !== e
        }
        function l(e) {
            for (var t in e)
                return !1;
            return !0
        }
        function f(e) {
            return c(e) && "[object Error]" === X.toString.call(e) || e instanceof Error
        }
        function p(e, t) {
            return X.hasOwnProperty.call(e, t)
        }
        function d(e, t) {
            var n, r;
            if (u(e.length))
                for (n in e)
                    p(e, n) && t.call(null, n, e[n]);
            else if (r = e.length)
                for (n = 0; r > n; n++)
                    t.call(null, n, e[n])
        }
        function h(e, t) {
            var n = [];
            e.stack && e.stack.length && d(e.stack, function(e, t) {
                var r = m(t);
                r && n.push(r)
            }),
                r("handle", {
                    stackInfo: e,
                    options: t
                }),
                v(e.name, e.message, e.url, e.lineno, n, t)
        }
        function m(e) {
            if (e.url) {
                var t, n = {
                    filename: e.url,
                    lineno: e.line,
                    colno: e.column,
                    "function": e.func || "?"
                }, r = g(e);
                if (r) {
                    var o = ["pre_context", "context_line", "post_context"];
                    for (t = 3; t--; )
                        n[o[t]] = r[t]
                }
                return n.in_app = !(W.includePaths.test && !W.includePaths.test(n.filename) || /(Raven|TraceKit)\./.test(n["function"]) || /raven\.(min\.)?js$/.test(n.filename)),
                    n
            }
        }
        function g(e) {
            if (e.context && W.fetchContext) {
                for (var t = e.context, n = ~~(t.length / 2), r = t.length, o = !1; r--; )
                    if (t[r].length > 300) {
                        o = !0;
                        break
                    }
                if (o) {
                    if (u(e.column))
                        return;
                    return [[], t[n].substr(e.column, 50), []]
                }
                return [t.slice(0, n), t[n], t.slice(n + 1)]
            }
        }
        function v(e, t, n, r, o, i) {
            var u, a;
            W.ignoreErrors.test && W.ignoreErrors.test(t) || (t += "",
                a = e + ": " + t,
                o && o.length ? (n = o[0].filename || n,
                    o.reverse(),
                    u = {
                        frames: o
                    }) : n && (u = {
                    frames: [{
                        filename: n,
                        lineno: r,
                        in_app: !0
                    }]
                }),
            W.ignoreUrls.test && W.ignoreUrls.test(n) || (!W.whitelistUrls.test || W.whitelistUrls.test(n)) && C(y({
                exception: {
                    values: [{
                        type: [e, n, W.whitelistUrls.toString(), W.whitelistUrls.test(n)].join("_"),
                        value: t,
                        stacktrace: u
                    }]
                },
                culprit: n,
                message: a
            }, i)))
        }
        function y(e, t) {
            return t ? (d(t, function(t, n) {
                e[t] = n
            }),
                e) : e
        }
        function b(e, t) {
            return e.length <= t ? e : e.substr(0, t) + "…"
        }
        function x(e) {
            var t = W.maxMessageLength;
            if (e.message = b(e.message, t),
                    e.exception) {
                var n = e.exception.values[0];
                n.value = b(n.value, t)
            }
            return e
        }
        function w() {
            return +new Date
        }
        function _() {
            if (U && document.location && document.location.href) {
                var e = {
                    headers: {
                        "User-Agent": navigator.userAgent
                    }
                };
                return e.url = document.location.href,
                document.referrer && (e.headers.Referer = document.referrer),
                    e
            }
        }
        function C(e) {
            var t = {
                    project: B,
                    logger: W.logger,
                    platform: "javascript"
                }
                , n = _();
            n && (t.request = n),
                e = y(t, e),
                e.tags = y(y({}, z.tags), e.tags),
                e.extra = y(y({}, z.extra), e.extra),
                e.extra["session:duration"] = w() - G,
            l(e.tags) && delete e.tags,
            z.user && (e.user = z.user),
            W.release && (e.release = W.release),
            W.serverName && (e.server_name = W.serverName),
            a(W.dataCallback) && (e = W.dataCallback(e) || e),
            e && !l(e) && (!a(W.shouldSendCallback) || W.shouldSendCallback(e)) && (H = e.event_id || (e.event_id = T()),
                e = x(e),
                A("debug", "Raven about to send:", e),
            k() && (W.transport || S)({
                url: L,
                auth: {
                    sentry_version: "7",
                    sentry_client: "raven-js/" + Y.VERSION,
                    sentry_key: P
                },
                data: e,
                options: W,
                onSuccess: function() {
                    r("success", {
                        data: e,
                        src: L
                    })
                },
                onError: function() {
                    r("failure", {
                        data: e,
                        src: L
                    })
                }
            }))
        }
        function S(e) {
            e.auth.sentry_data = JSON.stringify(e.data);
            var t = j()
                , n = e.url + "?" + M(e.auth)
                , r = e.options.crossOrigin;
            (r || "" === r) && (t.crossOrigin = r),
                t.onload = e.onSuccess,
                t.onerror = t.onabort = e.onError,
                t.src = n
        }
        function j() {
            return document.createElement("img")
        }
        function k() {
            return D ? L ? !0 : (nt || A("error", "Error: Raven has not been configured."),
                nt = !0,
                !1) : !1
        }
        function E(e) {
            for (var t, n = [], r = 0, o = e.length; o > r; r++)
                t = e[r],
                    s(t) ? n.push(t.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")) : t && t.source && n.push(t.source);
            return new RegExp(n.join("|"),"i")
        }
        function T() {
            var t = e.crypto || e.msCrypto;
            if (!u(t) && t.getRandomValues) {
                var n = new Uint16Array(8);
                t.getRandomValues(n),
                    n[3] = 4095 & n[3] | 16384,
                    n[4] = 16383 & n[4] | 32768;
                var r = function(e) {
                    for (var t = e.toString(16); t.length < 4; )
                        t = "0" + t;
                    return t
                };
                return r(n[0]) + r(n[1]) + r(n[2]) + r(n[3]) + r(n[4]) + r(n[5]) + r(n[6]) + r(n[7])
            }
            return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(e) {
                var t = 16 * Math.random() | 0
                    , n = "x" == e ? t : 3 & t | 8;
                return n.toString(16)
            })
        }
        function A(e) {
            Q[e] && Y.debug && Q[e].apply(J, q.call(arguments, 1))
        }
        function O() {
            var t = e.RavenConfig;
            t && Y.config(t.dsn, t.config).install()
        }
        function M(e) {
            var t = [];
            return d(e, function(e, n) {
                t.push(encodeURIComponent(e) + "=" + encodeURIComponent(n))
            }),
                t.join("&")
        }
        function N(e, t) {
            u(t) ? delete z[e] : z[e] = y(z[e] || {}, t)
        }
        var R = {
                remoteFetching: !1,
                collectWindowErrors: !0,
                linesOfContext: 7,
                debug: !1
            }
            , q = [].slice
            , I = "?";
        R.report = function() {
            function r(e) {
                s(),
                    m.push(e)
            }
            function o(e) {
                for (var t = m.length - 1; t >= 0; --t)
                    m[t] === e && m.splice(t, 1)
            }
            function i() {
                c(),
                    m = []
            }
            function u(e, t) {
                var n = null;
                if (!t || R.collectWindowErrors) {
                    for (var r in m)
                        if (p(m, r))
                            try {
                                m[r].apply(null, [e].concat(q.call(arguments, 2)))
                            } catch (o) {
                                n = o
                            }
                    if (n)
                        throw n
                }
            }
            function a(e, t, r, o, i) {
                var a = null;
                if (y)
                    R.computeStackTrace.augmentStackTraceWithInitialElement(y, t, r, e),
                        l();
                else if (i)
                    a = R.computeStackTrace(i),
                        u(a, !0);
                else {
                    var s = {
                        url: t,
                        line: r,
                        column: o
                    };
                    s.func = R.computeStackTrace.guessFunctionName(s.url, s.line),
                        s.context = R.computeStackTrace.gatherContext(s.url, s.line),
                        a = {
                            message: e,
                            url: n(),
                            stack: [s]
                        },
                        u(a, !0)
                }
                return d ? d.apply(this, arguments) : !1
            }
            function s() {
                h || (d = e.onerror,
                    e.onerror = a,
                    h = !0)
            }
            function c() {
                h && (e.onerror = d,
                    h = !1,
                    d = t)
            }
            function l() {
                var e = y
                    , t = g;
                g = null,
                    y = null,
                    v = null,
                    u.apply(null, [e, !1].concat(t))
            }
            function f(t, n) {
                var r = q.call(arguments, 1);
                if (y) {
                    if (v === t)
                        return;
                    l()
                }
                var o = R.computeStackTrace(t);
                if (y = o,
                        v = t,
                        g = r,
                        e.setTimeout(function() {
                            v === t && l()
                        }, o.incomplete ? 2e3 : 0),
                    n !== !1)
                    throw t
            }
            var d, h, m = [], g = null, v = null, y = null;
            return f.subscribe = r,
                f.unsubscribe = o,
                f.uninstall = i,
                f
        }(),
            R.computeStackTrace = function() {
                function t(t) {
                    if (!R.remoteFetching)
                        return "";
                    try {
                        var n = function() {
                                try {
                                    return new e.XMLHttpRequest
                                } catch (t) {
                                    return new e.ActiveXObject("Microsoft.XMLHTTP")
                                }
                            }
                            , r = n();
                        return r.open("GET", t, !1),
                            r.send(""),
                            r.responseText
                    } catch (o) {
                        return ""
                    }
                }
                function r(e) {
                    if (!s(e))
                        return [];
                    if (!p(x, e)) {
                        var n = ""
                            , r = "";
                        try {
                            r = document.domain
                        } catch (o) {}
                        -1 !== e.indexOf(r) && (n = t(e)),
                            x[e] = n ? n.split("\n") : []
                    }
                    return x[e]
                }
                function o(e, t) {
                    var n, o = /function ([^(]*)\(([^)]*)\)/, i = /['"]?([0-9A-Za-z$_]+)['"]?\s*[:=]\s*(function|eval|new Function)/, a = "", s = 10, c = r(e);
                    if (!c.length)
                        return I;
                    for (var l = 0; s > l; ++l)
                        if (a = c[t - l] + a,
                                !u(a)) {
                            if (n = i.exec(a))
                                return n[1];
                            if (n = o.exec(a))
                                return n[1]
                        }
                    return I
                }
                function i(e, t) {
                    var n = r(e);
                    if (!n.length)
                        return null;
                    var o = []
                        , i = Math.floor(R.linesOfContext / 2)
                        , a = i + R.linesOfContext % 2
                        , s = Math.max(0, t - i - 1)
                        , c = Math.min(n.length, t + a - 1);
                    t -= 1;
                    for (var l = s; c > l; ++l)
                        u(n[l]) || o.push(n[l]);
                    return o.length > 0 ? o : null
                }
                function a(e) {
                    return e.replace(/[\-\[\]{}()*+?.,\\\^$|#]/g, "\\$&")
                }
                function c(e) {
                    return a(e).replace("<", "(?:<|&lt;)").replace(">", "(?:>|&gt;)").replace("&", "(?:&|&amp;)").replace('"', '(?:"|&quot;)').replace(/\s+/g, "\\s+")
                }
                function l(e, t) {
                    for (var n, o, i = 0, u = t.length; u > i; ++i)
                        if ((n = r(t[i])).length && (n = n.join("\n"),
                                o = e.exec(n)))
                            return {
                                url: t[i],
                                line: n.substring(0, o.index).split("\n").length,
                                column: o.index - n.lastIndexOf("\n", o.index) - 1
                            };
                    return null
                }
                function f(e, t, n) {
                    var o, i = r(t), u = new RegExp("\\b" + a(e) + "\\b");
                    return n -= 1,
                        i && i.length > n && (o = u.exec(i[n])) ? o.index : null
                }
                function d(t) {
                    if ("undefined" != typeof document) {
                        for (var n, r, o, i, u = [e.location.href], s = document.getElementsByTagName("script"), f = "" + t, p = /^function(?:\s+([\w$]+))?\s*\(([\w\s,]*)\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/, d = /^function on([\w$]+)\s*\(event\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/, h = 0; h < s.length; ++h) {
                            var m = s[h];
                            m.src && u.push(m.src)
                        }
                        if (o = p.exec(f)) {
                            var g = o[1] ? "\\s+" + o[1] : ""
                                , v = o[2].split(",").join("\\s*,\\s*");
                            n = a(o[3]).replace(/;$/, ";?"),
                                r = new RegExp("function" + g + "\\s*\\(\\s*" + v + "\\s*\\)\\s*{\\s*" + n + "\\s*}")
                        } else
                            r = new RegExp(a(f).replace(/\s+/g, "\\s+"));
                        if (i = l(r, u))
                            return i;
                        if (o = d.exec(f)) {
                            var y = o[1];
                            if (n = c(o[2]),
                                    r = new RegExp("on" + y + "=[\\'\"]\\s*" + n + "\\s*[\\'\"]","i"),
                                    i = l(r, u[0]))
                                return i;
                            if (r = new RegExp(n),
                                    i = l(r, u))
                                return i
                        }
                        return null
                    }
                }
                function h(e) {
                    if (!u(e.stack) && e.stack) {
                        for (var t, r, a = /^\s*at (.*?) ?\(?((?:(?:file|https?|chrome-extension):.*?)|<anonymous>):(\d+)(?::(\d+))?\)?\s*$/i, s = /^\s*(.*?)(?:\((.*?)\))?@((?:file|https?|chrome).*?):(\d+)(?::(\d+))?\s*$/i, c = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:ms-appx|http|https):.*?):(\d+)(?::(\d+))?\)?\s*$/i, l = e.stack.split("\n"), p = [], d = /^(.*) is undefined$/.exec(e.message), h = 0, m = l.length; m > h; ++h) {
                            if (t = s.exec(l[h]))
                                r = {
                                    url: t[3],
                                    func: t[1] || I,
                                    args: t[2] ? t[2].split(",") : "",
                                    line: +t[4],
                                    column: t[5] ? +t[5] : null
                                };
                            else if (t = a.exec(l[h]))
                                r = {
                                    url: t[2],
                                    func: t[1] || I,
                                    line: +t[3],
                                    column: t[4] ? +t[4] : null
                                };
                            else {
                                if (!(t = c.exec(l[h])))
                                    continue;
                                r = {
                                    url: t[2],
                                    func: t[1] || I,
                                    line: +t[3],
                                    column: t[4] ? +t[4] : null
                                }
                            }
                            !r.func && r.line && (r.func = o(r.url, r.line)),
                            r.line && (r.context = i(r.url, r.line)),
                                p.push(r)
                        }
                        return p.length ? (p[0].line && !p[0].column && d ? p[0].column = f(d[1], p[0].url, p[0].line) : p[0].column || u(e.columnNumber) || (p[0].column = e.columnNumber + 1),
                        {
                            name: e.name,
                            message: e.message,
                            url: n(),
                            stack: p
                        }) : null
                    }
                }
                function m(e) {
                    var t = e.stacktrace;
                    if (!u(e.stacktrace) && e.stacktrace) {
                        for (var r, a = / line (\d+), column (\d+) in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\) in (.*):\s*$/i, s = t.split("\n"), c = [], l = 0, f = s.length; f > l; l += 2)
                            if (r = a.exec(s[l])) {
                                var p = {
                                    line: +r[1],
                                    column: +r[2],
                                    func: r[3] || r[4],
                                    args: r[5] ? r[5].split(",") : [],
                                    url: r[6]
                                };
                                if (!p.func && p.line && (p.func = o(p.url, p.line)),
                                        p.line)
                                    try {
                                        p.context = i(p.url, p.line)
                                    } catch (d) {}
                                p.context || (p.context = [s[l + 1]]),
                                    c.push(p)
                            }
                        return c.length ? {
                            name: e.name,
                            message: e.message,
                            url: n(),
                            stack: c
                        } : null
                    }
                }
                function g(t) {
                    var u = t.message.split("\n");
                    if (u.length < 4)
                        return null;
                    var a, s, f, d, h = /^\s*Line (\d+) of linked script ((?:file|https?)\S+)(?:: in function (\S+))?\s*$/i, m = /^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?)\S+)(?:: in function (\S+))?\s*$/i, g = /^\s*Line (\d+) of function script\s*$/i, v = [], y = document.getElementsByTagName("script"), b = [];
                    for (s in y)
                        p(y, s) && !y[s].src && b.push(y[s]);
                    for (s = 2,
                             f = u.length; f > s; s += 2) {
                        var x = null;
                        if (a = h.exec(u[s]))
                            x = {
                                url: a[2],
                                func: a[3],
                                line: +a[1]
                            };
                        else if (a = m.exec(u[s])) {
                            x = {
                                url: a[3],
                                func: a[4]
                            };
                            var w = +a[1]
                                , _ = b[a[2] - 1];
                            if (_ && (d = r(x.url))) {
                                d = d.join("\n");
                                var C = d.indexOf(_.innerText);
                                C >= 0 && (x.line = w + d.substring(0, C).split("\n").length)
                            }
                        } else if (a = g.exec(u[s])) {
                            var S = e.location.href.replace(/#.*$/, "")
                                , j = a[1]
                                , k = new RegExp(c(u[s + 1]));
                            d = l(k, [S]),
                                x = {
                                    url: S,
                                    line: d ? d.line : j,
                                    func: ""
                                }
                        }
                        if (x) {
                            x.func || (x.func = o(x.url, x.line));
                            var E = i(x.url, x.line)
                                , T = E ? E[Math.floor(E.length / 2)] : null;
                            x.context = E && T.replace(/^\s*/, "") === u[s + 1].replace(/^\s*/, "") ? E : [u[s + 1]],
                                v.push(x)
                        }
                    }
                    return v.length ? {
                        name: t.name,
                        message: u[0],
                        url: n(),
                        stack: v
                    } : null
                }
                function v(e, t, n, r) {
                    var u = {
                        url: t,
                        line: n
                    };
                    if (u.url && u.line) {
                        e.incomplete = !1,
                        u.func || (u.func = o(u.url, u.line)),
                        u.context || (u.context = i(u.url, u.line));
                        var a = / '([^']+)' /.exec(r);
                        if (a && (u.column = f(a[1], u.url, u.line)),
                            e.stack.length > 0 && e.stack[0].url === u.url) {
                            if (e.stack[0].line === u.line)
                                return !1;
                            if (!e.stack[0].line && e.stack[0].func === u.func)
                                return e.stack[0].line = u.line,
                                    e.stack[0].context = u.context,
                                    !1
                        }
                        return e.stack.unshift(u),
                            e.partial = !0,
                            !0
                    }
                    return e.incomplete = !0,
                        !1
                }
                function y(e, t) {
                    for (var r, i, u, a = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i, s = [], c = {}, l = !1, p = y.caller; p && !l; p = p.caller)
                        if (p !== b && p !== R.report) {
                            if (i = {
                                    url: null,
                                    func: I,
                                    line: null,
                                    column: null
                                },
                                    p.name ? i.func = p.name : (r = a.exec(p.toString())) && (i.func = r[1]),
                                "undefined" == typeof i.func)
                                try {
                                    i.func = r.input.substring(0, r.input.indexOf("{"))
                                } catch (h) {}
                            if (u = d(p)) {
                                i.url = u.url,
                                    i.line = u.line,
                                i.func === I && (i.func = o(i.url, i.line));
                                var m = / '([^']+)' /.exec(e.message || e.description);
                                m && (i.column = f(m[1], u.url, u.line))
                            }
                            c["" + p] ? l = !0 : c["" + p] = !0,
                                s.push(i)
                        }
                    t && s.splice(0, t);
                    var g = {
                        name: e.name,
                        message: e.message,
                        url: n(),
                        stack: s
                    };
                    return v(g, e.sourceURL || e.fileName, e.line || e.lineNumber, e.message || e.description),
                        g
                }
                function b(e, t) {
                    var r = null;
                    t = null == t ? 0 : +t;
                    try {
                        if (r = m(e))
                            return r
                    } catch (o) {
                        if (R.debug)
                            throw o
                    }
                    try {
                        if (r = h(e))
                            return r
                    } catch (o) {
                        if (R.debug)
                            throw o
                    }
                    try {
                        if (r = g(e))
                            return r
                    } catch (o) {
                        if (R.debug)
                            throw o
                    }
                    try {
                        if (r = y(e, t + 1))
                            return r
                    } catch (o) {
                        if (R.debug)
                            throw o
                    }
                    return {
                        name: e.name,
                        message: e.message,
                        url: n()
                    }
                }
                var x = {};
                return b.augmentStackTraceWithInitialElement = v,
                    b.computeStackTraceFromStackProp = h,
                    b.guessFunctionName = o,
                    b.gatherContext = i,
                    b
            }();
        var F, H, L, P, B, $ = e.Raven, D = !("object" != typeof JSON || !JSON.stringify), U = "undefined" != typeof document, z = {}, W = {
            logger: "javascript",
            ignoreErrors: [],
            ignoreUrls: [],
            whitelistUrls: [],
            includePaths: [],
            crossOrigin: "anonymous",
            collectWindowErrors: !0,
            maxMessageLength: 100
        }, V = !1, X = Object.prototype, J = e.console || {}, Q = {}, K = [], G = w();
        for (var Z in J)
            Q[Z] = J[Z];
        var Y = {
            VERSION: "1.3.0",
            debug: !1,
            noConflict: function() {
                return e.Raven = $,
                    Y
            },
            config: function(e, t) {
                if (L)
                    return A("error", "Error: Raven has already been configured"),
                        Y;
                if (!e)
                    return Y;
                var n = i(e)
                    , r = n.path.lastIndexOf("/")
                    , o = n.path.substr(1, r);
                return t && d(t, function(e, t) {
                    "tags" == e || "extra" == e ? z[e] = t : W[e] = t
                }),
                    W.ignoreErrors.push(/^Script error\.?$/),
                    W.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/),
                    W.ignoreErrors = E(W.ignoreErrors),
                    W.ignoreUrls = W.ignoreUrls.length ? E(W.ignoreUrls) : !1,
                    W.whitelistUrls = W.whitelistUrls.length ? E(W.whitelistUrls) : !1,
                    W.includePaths = E(W.includePaths),
                    P = n.user,
                    B = n.path.substr(r + 1),
                    L = "//" + n.host + (n.port ? ":" + n.port : "") + "/" + o + "api/" + B + "/store/",
                n.protocol && (L = n.protocol + ":" + L),
                W.fetchContext && (R.remoteFetching = !0),
                W.linesOfContext && (R.linesOfContext = W.linesOfContext),
                    R.collectWindowErrors = !!W.collectWindowErrors,
                    Y
            },
            install: function() {
                return k() && !V && (R.report.subscribe(h),
                    d(K, function(e, t) {
                        t()
                    }),
                    V = !0),
                    Y
            },
            context: function(e, n, r) {
                return a(e) && (r = n || [],
                    n = e,
                    e = t),
                    Y.wrap(e, n).apply(this, r)
            },
            wrap: function(e, n) {
                function r() {
                    for (var t = [], r = arguments.length, o = !e || e && e.deep !== !1; r--; )
                        t[r] = o ? Y.wrap(e, arguments[r]) : arguments[r];
                    try {
                        return n.apply(this, t)
                    } catch (i) {
                        throw Y.captureException(i, e),
                            i
                    }
                }
                if (u(n) && !a(e))
                    return e;
                if (a(e) && (n = e,
                        e = t),
                        !a(n))
                    return n;
                if (n.__raven__)
                    return n;
                for (var o in n)
                    p(n, o) && (r[o] = n[o]);
                return r.prototype = n.prototype,
                    r.__raven__ = !0,
                    r.__inner__ = n,
                    r
            },
            uninstall: function() {
                return R.report.uninstall(),
                    V = !1,
                    Y
            },
            captureException: function(e, t) {
                if (!f(e))
                    return Y.captureMessage(e, t);
                F = e;
                try {
                    var n = R.computeStackTrace(e);
                    h(n, t)
                } catch (r) {
                    if (e !== r)
                        throw r
                }
                return Y
            },
            captureMessage: function(e, t) {
                return W.ignoreErrors.test && W.ignoreErrors.test(e) ? void 0 : (C(y({
                    message: e + ""
                }, t)),
                    Y)
            },
            addPlugin: function(e) {
                return K.push(e),
                V && e(),
                    Y
            },
            setUserContext: function(e) {
                return z.user = e,
                    Y
            },
            setExtraContext: function(e) {
                return N("extra", e),
                    Y
            },
            setTagsContext: function(e) {
                return N("tags", e),
                    Y
            },
            clearContext: function() {
                return z = {},
                    Y
            },
            getContext: function() {
                return JSON.parse(JSON.stringify(z))
            },
            setRelease: function(e) {
                return W.release = e,
                    Y
            },
            setDataCallback: function(e) {
                return W.dataCallback = e,
                    Y
            },
            setShouldSendCallback: function(e) {
                return W.shouldSendCallback = e,
                    Y
            },
            setTransport: function(e) {
                return W.transport = e,
                    Y
            },
            lastException: function() {
                return F
            },
            lastEventId: function() {
                return H
            },
            isSetup: function() {
                return k()
            }
        };
        Y.setUser = Y.setUserContext,
            Y.setReleaseContext = Y.setRelease;
        var et = "source protocol user pass host port path".split(" ")
            , tt = /^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/;
        o.prototype = new Error,
            o.prototype.constructor = o;
        var nt;
        O(),
            e.Raven = Y,
            "function" == typeof define && define.amd ? define("static/js/lib/raven", ["require"], function() {
                return Y
            }) : "object" == typeof module ? module.exports = Y : "object" == typeof exports && (exports = Y)
    }("undefined" != typeof window ? window : this),
    !function(e) {
        var t = e.navigator.userAgent.toLowerCase()
            , n = {
                isIE: function() {
                    return t && /msie|trident/.test(t)
                },
                isEdge: function() {
                    return t && t.indexOf("edge/") > 0
                },
                isChrome: function() {
                    return t && /chrome\/\d+/.test(t) && !this.isEdge()
                },
                isFirefox: function() {
                    return t && /firefox\/\d+/.test(t)
                },
                isSafari: function() {
                    return t && /applewebkit(?!.*chrome).*safari/.test(t)
                },
                isOpera: function() {
                    return t && /opr\/\d+/.test(t)
                },
                is2345: function() {
                    return this.isChrome() && /2345explorer\/\d+/.test(t)
                },
                isUC: function() {
                    return this.isChrome() && /ubrowser\/\d+/.test(t)
                },
                isQQB: function() {
                    return this.isChrome() && /qqbrowser\/\d+/.test(t)
                },
                isSogou: function() {
                    return this.isChrome() && /metasr/.test(t)
                },
                isMaxthon: function() {
                    return this.isChrome() && /maxthon\/\d+/.test(t)
                },
                isLiebao: function() {
                    if (!this.isChrome())
                        return !1;
                    if (t && t.indexOf("lbbrowser") > -1)
                        return !0;
                    for (var n in e.external)
                        if (n.toLowerCase().indexOf("liebao") > -1)
                            return !0;
                    return !1
                },
                is360se: function() {
                    if (this.isIE() || this.is2345() || this.isUC() || this.isQQB() || this.isSogou() || this.isMaxthon() || this.isLiebao())
                        return !1;
                    if (this.isChrome()) {
                        var t = e.navigator.plugins;
                        for (var n in t)
                            if (t[n].filename && "npaxlogin.dll" === t[n].filename)
                                return !0
                    }
                    return !1
                }
            };
        e.uaCheck = n
    }(window);