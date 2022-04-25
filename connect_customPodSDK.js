var ConnectCustomSDK = function(e) {
    var t = {};

    function n(i) {
        if (t[i]) return t[i].exports;
        var r = t[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return e[i].call(r.exports, r, r.exports, n), r.l = !0, r.exports
    }
    return n.m = e, n.c = t, n.d = function(e, t, i) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: i
        })
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function(e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var i = Object.create(null);
        if (n.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var r in e) n.d(i, r, function(t) {
                return e[t]
            }.bind(null, r));
        return i
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 0)
}([function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.SyncConnector = void 0;
    var i, r = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
            }
            return e
        },
        s = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n), i && e(t, i), t
            }
        }(),
        o = n(1),
        a = (i = o) && i.__esModule ? i : {
            default: i
        };
    var u = function(e) {
        function t() {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, t);
            var e = function(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
            e.knownCallbacks = ["init", "config", "update", "caughtUp", "playStateChanged", "podStateChanged", "podClosed", "podTitleChanged", "pointerToggle", "whiteBoardToggle", "roleChanged", "sizeChanged", "syncMessageReceived", "syncModeChanged", "userDetailsChanged", "userJoined", "userLeft", "userStatusChanged"];
            window.parent.document.getElementById("htmlObjectId");
            return e.sc = window.parent[window.frameElement.name], e
        }
        return function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(t, a.default), s(t, [{
            key: "init",
            value: function(e, t, n) {
                var i = !0;
                (void 0 === t || t.length <= 0) && (i = !1), (void 0 === n || n.length < 6) && (i = !1), i ? (this.registerCallback("config", e), this.communicateToParent("init", {
                    customPodID: t,
                    customPodVersion: n
                })) : console.log("customPodID and customPodVersion are required parameters for init()")
            }
        }, {
            key: "communicateToParent",
            value: function(e, t) {
                this.sc.fire(new CustomEvent(e), {
                    detail: t
                })
            }
        }, {
            key: "processCallback",
            value: function(e, t) {
                this.fire(new CustomEvent(e, {
                    detail: t
                }))
            }
        }, {
            key: "invoke",
            value: function(e, t) {
                var n = t;
                try {
                    this[e](n || null)
                } catch (t) {
                    console.log("Error invoking method " + e + " --\x3e " + t + " " + t.stack)
                }
            }
        }, {
            key: "getConfig",
            value: function() {
                return {
                    accountId: this.sc._accountID,
                    archiveDuration: this.sc._archiveDuration,
                    isAddin: !1,
                    isArchive: this.sc._isArchive,
                    isBreakOutSession: this.sc._isBreakoutSession,
                    isCaughtUp: this.sc._isCaughtUp,
                    isPointerOn: this.sc._isPointerOn,
                    isSecure: this.sc._isSecure,
                    isWhiteBoardOn: this.sc._isWhiteBoardOn,
                    language: this.sc._language,
                    playState: this.sc._playState,
                    podTitle: this.sc._podTitle,
                    role: this.sc._role,
                    roomSCOID: this.sc._roomSCOID,
                    url: this.sc._url,
                    userID: this.sc._userID,
                    userName: this.sc._userName
                }
            }
        }, {
            key: "config",
            value: function() {
                this.processCallback("config"), this.processCallback("syncModeChanged", this.isSynced)
            }
        }, {
            key: "findIndexInUserList",
            value: function(e) {
                var t = -1;
                if (void 0 !== e && void 0 !== this.sc._userList)
                    for (var n = 0; n < this.sc._userList.length; n++)
                        if (this.sc._userList[n] && this.sc._userList[n].id === e) {
                            t = n;
                            break
                        } return t
            }
        }, {
            key: "getUserDetails",
            value: function(e) {
                return this.sc._isArchive ? {
                    messsage: "Access Denied",
                    data: {}
                } : {
                    message: "Success",
                    data: this.sc.getUserDetails(e)
                }
            }
        }, {
            key: "getMeetingInfo",
            value: function() {
                return {
                    accountId: this.sc._accountID,
                    scoId: this.sc._roomSCOID,
                    lang: this.sc._language,
                    url: this.sc._url
                }
            }
        }, {
            key: "getPodInfo",
            value: function() {
                return {
                    podTitle: this.sc._podTitle,
                    isWhiteBoardOn: this.sc._isWhiteBoardOn
                }
            }
        }, {
            key: "getMyUserDetails",
            value: function() {
                if (this.sc._isArchive) {
                    var e = {
                        message: "Access Denied",
                        data: {}
                    };
                    return e
                }
                var t = this.findIndexInUserList(this.sc._userID);
                return {
                    message: "Success",
                    data: this.sc._userList[t]
                }
            }
        }, {
            key: "getUserList",
            value: function() {
                var e = this,
                    t = {},
                    n = [];
                return t.message = "Success", Object.keys(this.sc._userList).map(function(t) {
                    n.push(e.sc._userList[t].id)
                }), t.data = n, t
            }
        }, {
            key: "isBreakOutSessionOn",
            value: function() {
                return this.sc._isBreakoutSession
            }
        }, {
            key: "isWhiteBoardOn",
            value: function() {
                return this.sc._isWhiteBoardOn
            }
        }, {
            key: "maximize",
            value: function(e) {
                var t = !0 === e || "true" === e;
                this.sc.fire(new CustomEvent("maximize", {
                    detail: {
                        show: t
                    }
                }))
            }
        }, {
            key: "setMenuBarControlsVisibility",
            value: function(e) {
                var t = !0 === e || "true" === e;
                this.sc.fire(new CustomEvent("appBarControlsVisibility", {
                    detail: {
                        show: t
                    }
                }))
            }
        }, {
            key: "setPodControlsVisibility",
            value: function(e) {
                var t = !0 === e || "true" === e;
                this.sc.fire(new CustomEvent("podControlsVisibility", {
                    detail: {
                        show: t
                    }
                }))
            }
        }, {
            key: "setMyStatus",
            value: function(e) {
                this.sc.fire(new CustomEvent("changeMyStatus", {
                    detail: {
                        statusValue: e
                    }
                }))
            }
        }, {
            key: "allowParticipantPublish",
            value: function(e, t) {
                var n = !0 === t || "true" === t;
                this.sc.fire(new CustomEvent("participantAllowed", {
                    detail: {
                        msgNm: e,
                        allow: n
                    }
                }))
            }
        }, {
            key: "update",
            value: function(e) {
                this.fire(r({}, e, {
                    type: "update"
                }))
            }
        }, {
            key: "caughtUp",
            value: function() {
                this.processCallback("caughtUp", {
                    isCaughtUp: !0
                })
            }
        }, {
            key: "userJoined",
            value: function(e) {
                this.fire(e)
            }
        }, {
            key: "userLeft",
            value: function(e) {
                this.fire(e)
            }
        }, {
            key: "userStatusChanged",
            value: function(e) {
                this.fire(e)
            }
        }, {
            key: "syncMessageReceived",
            value: function(e) {
                this.fire(e)
            }
        }, {
            key: "syncModeChanged",
            value: function(e) {
                this.fire(r({}, e, {
                    type: "syncModeChanged"
                }))
            }
        }, {
            key: "userDetailsChanged",
            value: function(e) {
                this.fire(e)
            }
        }, {
            key: "podTitleChanged",
            value: function(e) {
                this.fire(r({}, e, {
                    type: "podTitleChanged"
                }))
            }
        }, {
            key: "pointerToggle",
            value: function(e) {
                this.fire(r({}, e, {
                    type: "pointerToggle"
                }))
            }
        }, {
            key: "whiteBoardToggle",
            value: function(e) {
                this.fire(e)
            }
        }, {
            key: "roleChanged",
            value: function(e) {
                this.fire(e)
            }
        }, {
            key: "playStateChanged",
            value: function(e) {
                this.fire(e)
            }
        }, {
            key: "info",
            value: function(e) {
                console.log(e)
            }
        }, {
            key: "dispatch",
            value: function(e, t, n) {
                var i = {
                    method: e,
                    args: t,
                    cb: n
                };
                this.sc.fire(new CustomEvent("syncEvent", {
                    detail: i
                }))
            }
        }, {
            key: "dispatchSyncMessage",
            value: function(e, t, n, i) {
                i = void 0 !== i && i, this.dispatch("dispatchSyncMessage", {
                    msgNm: e,
                    msgVal: t,
                    isDelta: n,
                    _echo: i
                })
            }
        }, {
            key: "podVisible",
            set: function(e) {
                var t = !0 === e || "true" === e;
                this.sc.fire(new CustomEvent("togglePodVisibility", {
                    detail: {
                        show: t
                    }
                }))
            }
        }, {
            key: "podHeight",
            get: function() {
                return this.sc._podHeight
            }
        }, {
            key: "podWidth",
            get: function() {
                return this.sc._podWidth
            }
        }, {
            key: "podMinWidth",
            get: function() {
                return this.sc._podMinWidth
            }
        }, {
            key: "podMinHeight",
            get: function() {
                return this.sc._podMinHeight
            }
        }, {
            key: "isSynced",
            get: function() {
                return this.sc._isSynced
            }
        }, {
            key: "connectVersion",
            get: function() {
                return this.sc._connectVersion
            }
        }, {
            key: "archiveDuration",
            get: function() {
                return this.sc._archiveDuration
            }
        }, {
            key: "playState",
            get: function() {
                return this.sc._playState
            }
        }]), t
    }();
    t.SyncConnector = new u
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
            }
        }
        return function(t, n, i) {
            return n && e(t.prototype, n), i && e(t, i), t
        }
    }();
    var r = function() {
        function e() {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.listenerMap = new Map
        }
        return i(e, [{
            key: "registerCallback",
            value: function(e, t, n) {
                if (s(t)) {
                    var i = this.listenerMap.get(e);
                    i || (i = {
                        eventTypeListeners: [],
                        objectIdListeners: new Map
                    }, this.listenerMap.set(e, i));
                    var r = function(e) {
                        return e === t
                    };
                    if (n) {
                        var o = -1;
                        !0 !== i.objectIdListeners.has(n) ? i.objectIdListeners.set(n, []) : o = i.objectIdListeners.get(n).findIndex(r), -1 === o && i.objectIdListeners.get(n).push(t)
                    } else {
                        -1 === i.eventTypeListeners.findIndex(r) && i.eventTypeListeners.push(t)
                    }
                    return !0
                }
                return !1
            }
        }, {
            key: "unregisterCallbacks",
            value: function(e, t, n) {
                var i = !1,
                    r = this.listenerMap.get(e);
                if (r) {
                    var s = o(t, r.eventTypeListeners);
                    if (s && (r.eventTypeListeners = s, i = !0), n) a(n, t, r) && (i = !0);
                    else {
                        var u = !0,
                            c = !1,
                            l = void 0;
                        try {
                            for (var f, h = r.objectIdListeners.keys()[Symbol.iterator](); !(u = (f = h.next()).done); u = !0) {
                                a(f.value, t, r) && (i = !0)
                            }
                        } catch (e) {
                            c = !0, l = e
                        } finally {
                            try {
                                !u && h.return && h.return()
                            } finally {
                                if (c) throw l
                            }
                        }
                    }
                    i && 0 === r.eventTypeListeners.length && 0 === r.objectIdListeners.size && this.listenerMap.delete(e)
                }
                return i
            }
        }, {
            key: "fire",
            value: function(e, t) {
                performance && performance.now();
                var n = !1;
                void 0 !== e.target && null !== e.target || (e.mytarget = this);
                var i = this.listenerMap.get(e.type);
                return i && (u(e, i.eventTypeListeners) && (n = !0), t && u(e, i.objectIdListeners.get(t)) && (n = !0)), performance && performance.now(), n
            }
        }]), e
    }();

    function s(e) {
        return "function" == typeof e || !1
    }

    function o(e, t) {
        var n = t.filter(function(t) {
            return t !== e
        });
        if (n.length !== t.length) return n
    }

    function a(e, t, n) {
        var i = o(t, n.objectIdListeners.get(e));
        return !!i && (n.objectIdListeners.set(e, i), !0)
    }

    function u(e, t) {
        return !(!t || !t.length) && (t.forEach(function(t) {
            if (t && s(t)) {
                performance && performance.now(), t(e), performance && performance.now()
            }
        }), !0)
    }
    t.default = r
}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Db25uZWN0Q3VzdG9tU0RLL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0Nvbm5lY3RDdXN0b21TREsvLi9zcmMvQ29ubmVjdEN1c3RvbVBvZFNESy5qcyIsIndlYnBhY2s6Ly9Db25uZWN0Q3VzdG9tU0RLLy4vc3JjL0V2ZW50RGlzcGF0Y2hlci5qcyJdLCJuYW1lcyI6WyJpbnN0YWxsZWRNb2R1bGVzIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwiZXhwb3J0cyIsIm1vZHVsZSIsImkiLCJsIiwibW9kdWxlcyIsImNhbGwiLCJtIiwiYyIsImQiLCJuYW1lIiwiZ2V0dGVyIiwibyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImdldCIsInIiLCJTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsInZhbHVlIiwidCIsIm1vZGUiLCJfX2VzTW9kdWxlIiwibnMiLCJjcmVhdGUiLCJrZXkiLCJiaW5kIiwibiIsIm9iamVjdCIsInByb3BlcnR5IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJwIiwicyIsIl9FdmVudERpc3BhdGNoZXIyIiwiQ29ubmVjdEN1c3RvbVBvZFNESyIsIl9jbGFzc0NhbGxDaGVjayIsInRoaXMiLCJfdGhpcyIsIl9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuIiwiX19wcm90b19fIiwiZ2V0UHJvdG90eXBlT2YiLCJrbm93bkNhbGxiYWNrcyIsIndpbmRvdyIsInBhcmVudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJzYyIsImZyYW1lRWxlbWVudCIsIkV2ZW50RGlzcGF0Y2hlciIsImNvbmZpZ0NhbGxiYWNrIiwiY3VzdG9tUG9kSUQiLCJjdXN0b21Qb2RWZXJzaW9uIiwiX3ZhbGlkQXJncyIsInVuZGVmaW5lZCIsImxlbmd0aCIsInJlZ2lzdGVyQ2FsbGJhY2siLCJjb21tdW5pY2F0ZVRvUGFyZW50IiwiY29uc29sZSIsImxvZyIsImV2dCIsImRhdGEiLCJmaXJlIiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJtZXRob2QiLCJhcmdzIiwianNvbiIsImUiLCJzdGFjayIsImFjY291bnRJZCIsIl9hY2NvdW50SUQiLCJhcmNoaXZlRHVyYXRpb24iLCJfYXJjaGl2ZUR1cmF0aW9uIiwiaXNBZGRpbiIsImlzQXJjaGl2ZSIsIl9pc0FyY2hpdmUiLCJpc0JyZWFrT3V0U2Vzc2lvbiIsIl9pc0JyZWFrb3V0U2Vzc2lvbiIsImlzQ2F1Z2h0VXAiLCJfaXNDYXVnaHRVcCIsImlzUG9pbnRlck9uIiwiX2lzUG9pbnRlck9uIiwiaXNTZWN1cmUiLCJfaXNTZWN1cmUiLCJpc1doaXRlQm9hcmRPbiIsIl9pc1doaXRlQm9hcmRPbiIsImxhbmd1YWdlIiwiX2xhbmd1YWdlIiwicGxheVN0YXRlIiwiX3BsYXlTdGF0ZSIsInBvZFRpdGxlIiwiX3BvZFRpdGxlIiwicm9sZSIsIl9yb2xlIiwicm9vbVNDT0lEIiwiX3Jvb21TQ09JRCIsInVybCIsIl91cmwiLCJ1c2VySUQiLCJfdXNlcklEIiwidXNlck5hbWUiLCJfdXNlck5hbWUiLCJwcm9jZXNzQ2FsbGJhY2siLCJpc1N5bmNlZCIsInJldFZhbCIsIl91c2VyTGlzdCIsImlkIiwibWVzc3NhZ2UiLCJtZXNzYWdlIiwiZ2V0VXNlckRldGFpbHMiLCJzY29JZCIsImxhbmciLCJyZXNwb25zZSIsImlkeCIsImZpbmRJbmRleEluVXNlckxpc3QiLCJfdGhpczIiLCJ1c2VyTGlzdCIsImtleXMiLCJtYXAiLCJwdXNoIiwic2hvdyIsImZsYWciLCJzaG93RmxhZyIsInN0YXR1cyIsInN0YXR1c1ZhbHVlIiwibXNnTmFtZSIsImFsbG93RmxhZyIsInBfYWxsb3ciLCJtc2dObSIsImFsbG93Iiwic2NBcmdzIiwiX2V4dGVuZHMiLCJ0eXBlIiwiZXZlbnQiLCJtc2ciLCJtZXRob2ROYW1lIiwiY2IiLCJtc2dWYWx1ZSIsImlzRGVsdGEiLCJlY2hvQmFjayIsImRpc3BhdGNoIiwibXNnVmFsIiwiX2VjaG8iLCJfcG9kSGVpZ2h0IiwiX3BvZFdpZHRoIiwiX3BvZE1pbldpZHRoIiwiX3BvZE1pbkhlaWdodCIsIl9pc1N5bmNlZCIsIl9jb25uZWN0VmVyc2lvbiIsIlN5bmNDb25uZWN0b3IiLCJsaXN0ZW5lck1hcCIsIk1hcCIsImV2ZW50TmFtZSIsImNhbGxiYWNrIiwib2JqZWN0SWQiLCJpc0Z1bmN0aW9uIiwibGlzdGVuZXJPYmoiLCJldmVudFR5cGVMaXN0ZW5lcnMiLCJvYmplY3RJZExpc3RlbmVycyIsInNldCIsIm1hdGNoZXIiLCJlbGVtZW50IiwiY2FsbEJhY2tJbmRleCIsImhhcyIsImZpbmRJbmRleCIsInJlbW92ZWQiLCJsaXN0ZW5lcnMiLCJfcmVtb3ZlQ2FsbGJhY2tGcm9tQXJyYXkiLCJfcmVtb3ZlQ2FsbGJhY2tGb3JPYmplY3RJZCIsIl9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24iLCJfZGlkSXRlcmF0b3JFcnJvciIsIl9pdGVyYXRvckVycm9yIiwiX3N0ZXAiLCJfaXRlcmF0b3IiLCJpdGVyYXRvciIsIm5leHQiLCJkb25lIiwiZXJyIiwicmV0dXJuIiwic2l6ZSIsImRlbGV0ZSIsImV2ZW50T2JqZWN0IiwicGVyZm9ybWFuY2UiLCJub3ciLCJmaXJlZCIsInRhcmdldCIsIm15dGFyZ2V0IiwiX2ZpcmVFdmVudEZvckxpc3RlbmVyc0FycmF5Iiwib2JqIiwiY2FsbGJhY2tBcnJheSIsIm5ld0NhbGxiYWNrQXJyYXkiLCJmaWx0ZXIiLCJmb3JFYWNoIiwibGlzdGVuZXIiXSwibWFwcGluZ3MiOiJpQ0FDQSxJQUFBQSxFQUFBLEdBR0EsU0FBQUMsRUFBQUMsR0FHQSxHQUFBRixFQUFBRSxHQUNBLE9BQUFGLEVBQUFFLEdBQUFDLFFBR0EsSUFBQUMsRUFBQUosRUFBQUUsR0FBQSxDQUNBRyxFQUFBSCxFQUNBSSxHQUFBLEVBQ0FILFFBQUEsSUFVQSxPQU5BSSxFQUFBTCxHQUFBTSxLQUFBSixFQUFBRCxRQUFBQyxJQUFBRCxRQUFBRixHQUdBRyxFQUFBRSxHQUFBLEVBR0FGLEVBQUFELFFBMERBLE9BckRBRixFQUFB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RThCLEdBQVEsSUFJakJGLGFBQ01BLFlBQVlDLE1BRWRDLFdBT2YsU0FBUzdCLEVBQVdpQyxHQUNoQixNQUF1QixtQkFBUkEsSUFBc0IsRUFHekMsU0FBU3JCLEVBQXlCZCxFQUFVb0MsR0FDeEMsSUFBSUMsRUFBbUJELEVBQWNFLE9BQU8sU0FBQXpMLEdBQUEsT0FBS0EsSUFBTW1KLElBQ3ZELEdBQUlxQyxFQUFpQnhJLFNBQVd1SSxFQUFjdkksT0FDMUMsT0FBT3dJLEVBSWYsU0FBU3RCLEVBQTJCZCxFQUFVRCxFQUFVRyxHQUNwRCxJQUFJVSxFQUFZQyxFQUF5QmQsRUFBVUcsRUFBWUUsa0JBQWtCaEosSUFBSTRJLElBQ3JGLFFBQUlZLElBQ0FWLEVBQVlFLGtCQUFrQkMsSUFBSUwsRUFBVVksSUFDckMsR0FLZixTQUFTcUIsRUFBNEJOLEVBQWFmLEdBQzlDLFNBQUlBLElBQWFBLEVBQVVoSCxVQUN2QmdILEVBQVUwQixRQUFRLFNBQUNDLEdBQ2YsR0FBSUEsR0FBWXRDLEVBQVdzQyxHQUFXLENBRS9CWCxhQUNNQSxZQUFZQyxNQUVyQlUsRUFBU1osR0FDTkMsYUFDTUEsWUFBWUMsVUFJdEIsYUFySU12SSIsImZpbGUiOiJjb25uZWN0X2N1c3RvbVBvZFNESy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIi8qKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKiBBRE9CRSBDT05GSURFTlRJQUxcclxuICogX19fX19fX19fX19fX19fX19fX1xyXG4gKlxyXG4gKiAgQ29weXJpZ2h0IDIwMTUgQWRvYmUgU3lzdGVtcyBJbmNvcnBvcmF0ZWRcclxuICogIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIE5PVElDRTogIEFsbCBpbmZvcm1hdGlvbiBjb250YWluZWQgaGVyZWluIGlzLCBhbmQgcmVtYWluc1xyXG4gKiB0aGUgcHJvcGVydHkgb2YgQWRvYmUgU3lzdGVtcyBJbmNvcnBvcmF0ZWQgYW5kIGl0cyBzdXBwbGllcnMsXHJcbiAqIGlmIGFueS4gIFRoZSBpbnRlbGxlY3R1YWwgYW5kIHRlY2huaWNhbCBjb25jZXB0cyBjb250YWluZWRcclxuICogaGVyZWluIGFyZSBwcm9wcmlldGFyeSB0byBBZG9iZSBTeXN0ZW1zIEluY29ycG9yYXRlZCBhbmQgaXRzXHJcbiAqIHN1cHBsaWVycyBhbmQgYXJlIHByb3RlY3RlZCBieSBhbGwgYXBwbGljYWJsZSBpbnRlbGxlY3R1YWwgcHJvcGVydHlcclxuICogbGF3cywgaW5jbHVkaW5nIHRyYWRlIHNlY3JldCBhbmQgY29weXJpZ2h0IGxhd3MuXHJcbiAqIERpc3NlbWluYXRpb24gb2YgdGhpcyBpbmZvcm1hdGlvbiBvciByZXByb2R1Y3Rpb24gb2YgdGhpcyBtYXRlcmlhbFxyXG4gKiBpcyBzdHJpY3RseSBmb3JiaWRkZW4gdW5sZXNzIHByaW9yIHdyaXR0ZW4gcGVybWlzc2lvbiBpcyBvYnRhaW5lZFxyXG4gKiBmcm9tIEFkb2JlIFN5c3RlbXMgSW5jb3Jwb3JhdGVkLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG5cclxuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tIFwiLi9FdmVudERpc3BhdGNoZXJcIjtcclxuXHJcbmNvbnN0IEVycm9yX01lc3NhZ2UgPSBcIkFjY2VzcyBEZW5pZWRcIjtcclxuY29uc3QgT0tfTWVzc2FnZSA9IFwiU3VjY2Vzc1wiO1xyXG5cclxuY2xhc3MgQ29ubmVjdEN1c3RvbVBvZFNESyBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlciB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy5rbm93bkNhbGxiYWNrcyA9IFtcImluaXRcIixcclxuXHRcdFx0XCJjb25maWdcIixcclxuXHRcdFx0XCJ1cGRhdGVcIixcclxuXHRcdFx0XCJjYXVnaHRVcFwiLFxyXG5cdFx0XHRcInBsYXlTdGF0ZUNoYW5nZWRcIixcclxuXHRcdFx0XCJwb2RTdGF0ZUNoYW5nZWRcIixcclxuXHRcdFx0XCJwb2RDbG9zZWRcIixcclxuXHRcdFx0XCJwb2RUaXRsZUNoYW5nZWRcIixcclxuXHRcdFx0XCJwb2ludGVyVG9nZ2xlXCIsXHJcblx0XHRcdFwid2hpdGVCb2FyZFRvZ2dsZVwiLFxyXG5cdFx0XHRcInJvbGVDaGFuZ2VkXCIsXHJcblx0XHRcdFwic2l6ZUNoYW5nZWRcIixcclxuXHRcdFx0XCJzeW5jTWVzc2FnZVJlY2VpdmVkXCIsXHJcblx0XHRcdFwic3luY01vZGVDaGFuZ2VkXCIsXHJcblx0XHRcdFwidXNlckRldGFpbHNDaGFuZ2VkXCIsXHJcblx0XHRcdFwidXNlckpvaW5lZFwiLFxyXG5cdFx0XHRcInVzZXJMZWZ0XCIsXHJcblx0XHRcdFwidXNlclN0YXR1c0NoYW5nZWRcIl07XHJcblxyXG5cdFx0dmFyIGlGcmFtZU9iamVjdCA9IHdpbmRvdy5wYXJlbnQuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJodG1sT2JqZWN0SWRcIik7XHJcblx0XHR0aGlzLnNjID0gd2luZG93LnBhcmVudFt3aW5kb3cuZnJhbWVFbGVtZW50Lm5hbWVdO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRW50cnkgcG9pbnQgZm9yIHRoZSBBZG9iZSBDb25uZWN0IEhUTUwgQ29sbGFib3JhdGlvbiBTREsuICBDYWxsIHRoaXMgbWV0aG9kIGltbWVkaWF0ZWx5IChhbmQgbW9zdCBjZXJ0YWlubHkgYmVmb3JlIHlvdSBpbml0aWFsaXplIHlvdXIgZnJhbWV3b3JrIG9yIGFwcGxpY2F0aW9uKS4gIElmIHlvdSBkb24ndCBwcm92aWRlIGEgY29uZmlnIGNhbGxiYWNrIGhhbmRsZXIsIHRoZSBDb25uZWN0Q3VzdG9tU0RLIHdvbid0IGNvbm5lY3QgdG8gdGhlIENvbm5lY3Qgc2Vzc2lvbi4gIEluIHRoYXQgY2FsbGJhY2sgaGFuZGxlciwgeW91IHdhbnQgdG8gbWFrZSBzdXJlIHRvIGluaXRpYWxpemUgeW91ciBhcHBsaWNhdGlvbi9mcmFtZXdvcmsgYW5kIHJlZ2lzdGVyIGZvciBvdGhlciBjYWxsYmFja3Mgb2YgaW50ZXJlc3QgKG5vdCB0aGUgbGVhc3Qgb2Ygd2hpY2ggaXMgJ2NhdWdodFVwJykuXHJcblx0IFxyXG5cdCAqIEJ5IGRlZmF1bHQsIHRoZSBleHBlY3RhdGlvbiBpcyB0aGF0IHRoZXJlIHdpbGwgYmUgYSB0b3AtbGV2ZWwgSFRNTCBlbGVtZW50IGluIHRoZSBib2R5IHRhZyBjYWxsZWQgJ2xvYWRpbmcnLiAgVGhlIENvbGxhYm9yYXRpb24gU0RLIG5lZWRzIGFuIGluamVjdGlvbiBwb2ludCBmb3IgaXRzIEhUTUwgb2JqZWN0cyAtLSBzbyBpZiBnZXQgcmlkIG9mIHRoZSBsb2FkaW5nIHRhZywgeW91IHdvdWxkIHN1cHBseSB0aGUgbmFtZSBvZiBhbm90aGVyIHRhZyB3aGljaCBjb3VsZCB0aGV5IGJlIHVzZWQgYXMgYW4gYW5jaG9yLlxyXG5cdCAqXHJcblx0ICogQG1ldGhvZCBpbml0XHJcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gY29uZmlnQ2FsbGJhY2sgY2FsbGJhY2sgaGFuZGxlciB0aGF0IGdldHMgY2FsbGVkIG9uY2UgdGhlIENvbm5lY3RDdXN0b21TREsgaGFzIGluaXRpYWxpemVkLlxyXG5cdCAqIEByZXF1aXJlZFxyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBjdXN0b21Qb2RJRCB1bmlxdWUgaWRlbnRpZmllciBvZiB0aGlzIGN1c3RvbSBwb2Q6IGUuZy4gY29tLmVzeW5jdHJhaW5pbmcuYW5vbnltb3VzY2hhdFxyXG5cdCAqIEByZXF1aXJlZFxyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBjdXN0b21Qb2RWZXJzaW9uIHZlcnNpb24gbnVtYmVyIG9mIHRoZSBjdXN0b20gcG9kIHgueC54eHhcclxuXHQgKiBAcmVxdWlyZWRcclxuXHQgKiBAb3B0aW9uYWxcclxuXHQqL1xyXG5cclxuXHRpbml0KGNvbmZpZ0NhbGxiYWNrLCBjdXN0b21Qb2RJRCwgY3VzdG9tUG9kVmVyc2lvbikge1xyXG5cdFx0dmFyIF92YWxpZEFyZ3MgPSB0cnVlO1xyXG5cclxuXHRcdGlmIChjdXN0b21Qb2RJRCA9PT0gdW5kZWZpbmVkIHx8IGN1c3RvbVBvZElELmxlbmd0aCA8PSAwKSB7XHJcblx0XHRcdF92YWxpZEFyZ3MgPSBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoY3VzdG9tUG9kVmVyc2lvbiA9PT0gdW5kZWZpbmVkIHx8IGN1c3RvbVBvZFZlcnNpb24ubGVuZ3RoIDwgNikge1xyXG5cdFx0XHRfdmFsaWRBcmdzID0gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCFfdmFsaWRBcmdzKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiY3VzdG9tUG9kSUQgYW5kIGN1c3RvbVBvZFZlcnNpb24gYXJlIHJlcXVpcmVkIHBhcmFtZXRlcnMgZm9yIGluaXQoKVwiKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMucmVnaXN0ZXJDYWxsYmFjayhcImNvbmZpZ1wiLCBjb25maWdDYWxsYmFjayk7XHJcblx0XHR0aGlzLmNvbW11bmljYXRlVG9QYXJlbnQoXCJpbml0XCIsIHsgY3VzdG9tUG9kSUQ6IGN1c3RvbVBvZElELCBjdXN0b21Qb2RWZXJzaW9uOiBjdXN0b21Qb2RWZXJzaW9uIH0pO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdFRvIHBhc3MgdGhlIGV2ZW50IHRvIHBhcmVudCBvYmplY3RcclxuXHQqL1xyXG5cdGNvbW11bmljYXRlVG9QYXJlbnQoZXZ0LCBkYXRhKSB7XHJcblx0XHR0aGlzLnNjLmZpcmUobmV3IEN1c3RvbUV2ZW50KGV2dCksIHsgZGV0YWlsOiBkYXRhIH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0VG8gaW52b2tlIHRoZSBjYWxsYmFjayBmdW5jdGlvblxyXG5cdCovXHJcblx0cHJvY2Vzc0NhbGxiYWNrKGV2dCwgZGF0YSkge1xyXG5cdFx0dGhpcy5maXJlKG5ldyBDdXN0b21FdmVudChldnQsIHsgZGV0YWlsOiBkYXRhIH0pKTtcclxuXHR9XHJcblxyXG5cclxuXHJcblx0aW52b2tlKG1ldGhvZCwgYXJncykge1xyXG5cdFx0bGV0IGpzb24gPSBhcmdzO1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0dGhpc1ttZXRob2RdKGpzb24gPyBqc29uIDogbnVsbCk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiRXJyb3IgaW52b2tpbmcgbWV0aG9kIFwiICsgbWV0aG9kICsgJyAtLT4gJyArIGUgKyAnICcgKyBlLnN0YWNrKTtcclxuXHRcdH1cclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcbmBcdCogZ2V0IHRoZSBjdXJyZW50IGNvbmZpZ3VyYXRpb25cclxuXHQgKlxyXG5cdCAqIEBtZXRob2QgZ2V0Q29uZmlnXHJcblx0ICogQHJldHVybnMge29iamVjdH0gY29uZmlndXJhdGlvbiBcclxuXHQgKi9cclxuXHRnZXRDb25maWcoKSB7XHJcblx0XHR2YXIgYyA9XHJcblx0XHR7XHJcblx0XHRcdGFjY291bnRJZDogdGhpcy5zYy5fYWNjb3VudElELFxyXG5cdFx0ICAgIGFyY2hpdmVEdXJhdGlvbjp0aGlzLnNjLl9hcmNoaXZlRHVyYXRpb24sXHJcblx0XHRcdGlzQWRkaW46IGZhbHNlLFxyXG5cdFx0XHRpc0FyY2hpdmU6IHRoaXMuc2MuX2lzQXJjaGl2ZSxcclxuXHRcdFx0aXNCcmVha091dFNlc3Npb246IHRoaXMuc2MuX2lzQnJlYWtvdXRTZXNzaW9uLFxyXG5cdFx0XHRpc0NhdWdodFVwOiB0aGlzLnNjLl9pc0NhdWdodFVwLFxyXG5cdFx0XHRpc1BvaW50ZXJPbjogdGhpcy5zYy5faXNQb2ludGVyT24sXHJcblx0XHRcdGlzU2VjdXJlOiB0aGlzLnNjLl9pc1NlY3VyZSxcclxuXHRcdFx0aXNXaGl0ZUJvYXJkT246IHRoaXMuc2MuX2lzV2hpdGVCb2FyZE9uLFxyXG5cdFx0XHRsYW5ndWFnZTogdGhpcy5zYy5fbGFuZ3VhZ2UsXHJcblx0XHQgICAgcGxheVN0YXRlOiB0aGlzLnNjLl9wbGF5U3RhdGUsXHJcblx0XHRcdHBvZFRpdGxlOiB0aGlzLnNjLl9wb2RUaXRsZSxcclxuXHRcdFx0cm9sZTogdGhpcy5zYy5fcm9sZSxcclxuXHRcdFx0cm9vbVNDT0lEOiB0aGlzLnNjLl9yb29tU0NPSUQsXHJcblx0XHRcdHVybDogdGhpcy5zYy5fdXJsLFxyXG5cdFx0XHR1c2VySUQ6IHRoaXMuc2MuX3VzZXJJRCxcclxuXHRcdFx0dXNlck5hbWU6IHRoaXMuc2MuX3VzZXJOYW1lXHJcblx0XHR9O1xyXG5cclxuXHRcdHJldHVybiBjO1xyXG5cdH1cclxuXHJcblx0Y29uZmlnKCkge1xyXG5cdFx0dGhpcy5wcm9jZXNzQ2FsbGJhY2soJ2NvbmZpZycpO1xyXG5cdFx0dGhpcy5wcm9jZXNzQ2FsbGJhY2soXCJzeW5jTW9kZUNoYW5nZWRcIiwgdGhpcy5pc1N5bmNlZCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiByZXR1cm4gdGhlIHVzZXIgaW5kZXggaWYgYSB2YWxpZCB1c2VySUQgaXMgcGFzc2VkIGluXHJcblx0ICpcclxuXHQgKiBAbWV0aG9kIGZpbmRJbmRleEluVXNlckxpc3RcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSB1c2VySURcclxuXHQgKiBAcmVxdWlyZWRcclxuXHQgKiBAcmV0dXJuIHtOdW1iZXJ9IGluZGV4XHJcblx0ICovXHJcblxyXG5cdGZpbmRJbmRleEluVXNlckxpc3QodXNlcklEKSB7XHJcblx0XHRsZXQgcmV0VmFsID0gLTE7XHJcblx0XHRpZiAodXNlcklEICE9PSB1bmRlZmluZWQgJiYgdGhpcy5zYy5fdXNlckxpc3QgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2MuX3VzZXJMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0aWYgKHRoaXMuc2MuX3VzZXJMaXN0W2ldICYmIHRoaXMuc2MuX3VzZXJMaXN0W2ldLmlkID09PSB1c2VySUQpIHtcclxuXHRcdFx0XHRcdHJldFZhbCA9IGk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcmV0VmFsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gYSB1c2VyIGRhdGEgb2JqZWN0LCBhc3N1bWluZyB0aGF0IHRoZSB1c2VyIGlzIGEgaG9zdCBhbmQgdGhhdCBhIHZhbGlkIFVzZXJJRCBpcyBwcm92aWRlZFxyXG5cdCAqXHJcblx0ICogQG1ldGhvZCBnZXRVc2VyRGV0YWlsc1xyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySUQgSUQgb2YgdGhlIHVzZXJcclxuXHQgKiBAcmV0dXJuIHtPYmplY3R9IHVzZXIgZGF0YSBvYmplY3RcclxuXHQgKi9cclxuXHRnZXRVc2VyRGV0YWlscyh1c2VySUQpIHtcclxuXHJcblx0XHRpZih0aGlzLnNjLl9pc0FyY2hpdmUpe1xyXG5cdFx0XHRsZXQgcmVzcG9uc2UgPSB7bWVzc3NhZ2U6IEVycm9yX01lc3NhZ2UsIGRhdGE6IHt9fTtcclxuXHRcdFx0cmV0dXJuIHJlc3BvbnNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGVsc2V7XHJcblx0XHRcdGxldCByZXNwb25zZSA9IHttZXNzYWdlOiBPS19NZXNzYWdlLCBkYXRhOiB0aGlzLnNjLmdldFVzZXJEZXRhaWxzKHVzZXJJRCl9O1xyXG5cdFx0XHRyZXR1cm4gcmVzcG9uc2U7XHJcblx0XHR9XHJcblx0XHRcclxuXHR9XHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBUaGlzIG1ldGhvZCB3aWxsIHJldHVybiBhIG1lZXRpbmcgaW5mbyBvYmplY3RcclxuXHQgKlxyXG5cdCAqIEBtZXRob2QgZ2V0TWVldGluZ0luZm9cclxuXHQgKiBAcmV0dXJuIHtPYmplY3R9IGFjY291bnRJZCwgc2NvSWQsIGxhbmcsIHVybFxyXG5cdCAqL1xyXG5cdGdldE1lZXRpbmdJbmZvKCkge1xyXG5cdFx0bGV0IG9iaiA9IHtcclxuXHRcdFx0YWNjb3VudElkOiB0aGlzLnNjLl9hY2NvdW50SUQsXHJcblx0XHRcdHNjb0lkOiB0aGlzLnNjLl9yb29tU0NPSUQsXHJcblx0XHRcdGxhbmc6IHRoaXMuc2MuX2xhbmd1YWdlLFxyXG5cdFx0XHR1cmw6IHRoaXMuc2MuX3VybCxcclxuXHRcdH07XHJcblx0XHRyZXR1cm4gb2JqO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gYSBwb2QgaW5mbyBvYmplY3RcclxuXHQgKlxyXG5cdCAqIEBtZXRob2QgZ2V0UG9kSW5mb1xyXG5cdCAqIEByZXR1cm4ge09iamVjdH0gX3BvZFRpdGxlLCBzY29JZCwgbGFuZywgdXJsXHJcblx0ICovXHJcblx0Z2V0UG9kSW5mbygpIHtcclxuXHRcdGxldCBvYmogPSB7XHJcblx0XHRcdHBvZFRpdGxlOiB0aGlzLnNjLl9wb2RUaXRsZSxcclxuXHRcdFx0aXNXaGl0ZUJvYXJkT24gOiB0aGlzLnNjLl9pc1doaXRlQm9hcmRPbixcclxuXHRcdH07XHJcblx0XHRyZXR1cm4gb2JqO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gYSB1c2VyIGRhdGEgb2JqZWN0IGZvciB0aGUgY3VycmVudCB1c2VyXHJcblx0ICogQG1ldGhvZCBnZXRNeVVzZXJEZXRhaWxzXHJcblx0ICogQHJldHVybiB7T2JqZWN0fSB1c2VyIGRhdGEgb2JqZWN0XHJcblx0ICovXHJcblx0Z2V0TXlVc2VyRGV0YWlscygpIHtcclxuXHJcblx0XHRpZiAodGhpcy5zYy5faXNBcmNoaXZlKSB7XHJcblx0XHRcdGxldCByZXNwb25zZSA9IHt9O1xyXG5cdFx0XHRyZXNwb25zZVsnbWVzc2FnZSddID0gRXJyb3JfTWVzc2FnZTtcclxuXHRcdFx0cmVzcG9uc2VbJ2RhdGEnXSA9IHt9O1xyXG5cdFx0XHRyZXR1cm4gcmVzcG9uc2U7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHJcblx0XHRcdGxldCBpZHggPSB0aGlzLmZpbmRJbmRleEluVXNlckxpc3QodGhpcy5zYy5fdXNlcklEKTtcclxuXHRcdFx0bGV0IHJlc3BvbnNlID0ge21lc3NhZ2U6IE9LX01lc3NhZ2UsIGRhdGE6IHRoaXMuc2MuX3VzZXJMaXN0W2lkeF19O1xyXG5cdFx0XHRyZXR1cm4gcmVzcG9uc2U7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdGdldFVzZXJMaXN0KCkge1xyXG5cdFx0LyoqICBpZigkLnVzZXJJRD09dW5kZWZpbmVkKSB0aHJvdyhcInVzZXJJRCBpcyB1bmRlZmluZWQsIGRhdGEgYWNjZXNzIGlzc3VlP1wiKTtcclxuXHRcdFx0dmFyIGlkeCA9IGZpbmRJbmRleEluVXNlckxpc3QoJC51c2VySUQpO1xyXG5cdFx0XHRyZXR1cm4gKGlkeCA+PSAwID8gX3VzZXJMaXN0W2lkeF0gOiBudWxsKTsgKi9cclxuXHJcblxyXG5cdFx0bGV0IHJlc3BvbnNlID0ge307XHJcblx0XHRsZXQgdXNlckxpc3QgPSBbXTtcclxuXHRcdHJlc3BvbnNlWydtZXNzYWdlJ10gPSBPS19NZXNzYWdlO1xyXG5cdFx0T2JqZWN0LmtleXModGhpcy5zYy5fdXNlckxpc3QpLm1hcCgobmFtZSkgPT4ge1xyXG5cdFx0XHR1c2VyTGlzdC5wdXNoKHRoaXMuc2MuX3VzZXJMaXN0W25hbWVdLmlkKVxyXG5cdFx0fSlcclxuXHRcdHJlc3BvbnNlWydkYXRhJ10gPSB1c2VyTGlzdDtcclxuXHRcdHJldHVybiByZXNwb25zZTtcclxuXHR9XHJcblxyXG5cdGlzQnJlYWtPdXRTZXNzaW9uT24oKSB7XHJcbiAgICAgICAgLyoqICBpZigkLnVzZXJJRD09dW5kZWZpbmVkKSB0aHJvdyhcInVzZXJJRCBpcyB1bmRlZmluZWQsIGRhdGEgYWNjZXNzIGlzc3VlP1wiKTtcclxuXHRcdHZhciBpZHggPSBmaW5kSW5kZXhJblVzZXJMaXN0KCQudXNlcklEKTtcclxuXHRcdHJldHVybiAoaWR4ID49IDAgPyBfdXNlckxpc3RbaWR4XSA6IG51bGwpOyAqL1xyXG5cdFx0cmV0dXJuIHRoaXMuc2MuX2lzQnJlYWtvdXRTZXNzaW9uO1xyXG5cdH1cclxuXHJcblx0aXNXaGl0ZUJvYXJkT24oKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5zYy5faXNXaGl0ZUJvYXJkT247XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQqIFRoaXMgbWV0aG9kIHdpbGwgc3dpdGNoIEN1c3RvbSBQb2QgYi93IG1heGltaXplIGFuZCBtaW5pbWl6ZVxyXG5cdCpcclxuXHQqIEBtZXRob2QgbWF4aW1pemVcclxuXHQqIEByZXR1cm4ge09iamVjdH0gX3BvZFRpdGxlLCBzY29JZCwgbGFuZywgdXJsXHJcblx0Ki9cclxuXHRtYXhpbWl6ZShzaG93KSB7XHJcblx0XHRsZXQgZmxhZyA9IChzaG93ID09PSB0cnVlKSB8fCAoc2hvdyA9PT0gJ3RydWUnICk7XHJcblx0XHR0aGlzLnNjLmZpcmUobmV3IEN1c3RvbUV2ZW50KFwibWF4aW1pemVcIiwgeyBkZXRhaWw6IHtzaG93OmZsYWd9IH0pKTtcclxuXHR9XHJcblxyXG5cdCAvKipcclxuXHQgKiBUaGlzIG1ldGhvZCB3aWxsIHNob3cvaGlkZSB0aGUgYXBwIGJhciBpdGVtc1xyXG5cdCAqXHJcblx0ICogQG1ldGhvZCBzZXRNZW51QmFyQ29udHJvbHNWaXNpYmlsaXR5XHJcblx0ICogQHJldHVybiB7T2JqZWN0fSBfcG9kVGl0bGUsIHNjb0lkLCBsYW5nLCB1cmxcclxuXHQgKi9cclxuXHRzZXRNZW51QmFyQ29udHJvbHNWaXNpYmlsaXR5KHNob3dGbGFnKSB7XHJcblx0XHRsZXQgZmxhZyA9IChzaG93RmxhZyA9PT0gdHJ1ZSkgfHwgKHNob3dGbGFnID09PSAndHJ1ZScgKTtcclxuXHRcdHRoaXMuc2MuZmlyZShuZXcgQ3VzdG9tRXZlbnQoXCJhcHBCYXJDb250cm9sc1Zpc2liaWxpdHlcIiwgeyBkZXRhaWw6IHtzaG93OmZsYWd9IH0pKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCogVGhpcyBtZXRob2Qgd2lsbCBzaG93L2hpZGUgdGhlIHBvZCBtZW51IEl0ZW1zXHJcblx0KlxyXG5cdCogQG1ldGhvZCBzZXRQb2RDb250cm9sc1Zpc2liaWxpdHlcclxuXHQqIEByZXR1cm4ge09iamVjdH0gX3BvZFRpdGxlLCBzY29JZCwgbGFuZywgdXJsXHJcblx0Ki9cclxuXHRzZXRQb2RDb250cm9sc1Zpc2liaWxpdHkoc2hvd0ZsYWcpIHtcclxuXHRcdGxldCBmbGFnID0gKHNob3dGbGFnID09PSB0cnVlKSB8fCAoc2hvd0ZsYWcgPT09ICd0cnVlJyApO1xyXG5cdFx0dGhpcy5zYy5maXJlKG5ldyBDdXN0b21FdmVudChcInBvZENvbnRyb2xzVmlzaWJpbGl0eVwiLCB7IGRldGFpbDoge3Nob3c6ZmxhZ30gfSkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0KiBUaGlzIG1ldGhvZCB3aWxsIHNob3cvaGlkZSB0aGUgc2hhcmVQb2RcclxuXHQqXHJcblx0KiBAbWV0aG9kIHBvZFZpc2libGVcclxuXHQqIEByZXR1cm4ge09iamVjdH0gX3BvZFRpdGxlLCBzY29JZCwgbGFuZywgdXJsXHJcblx0Ki9cclxuXHRzZXQgcG9kVmlzaWJsZShzaG93KSB7XHJcblx0XHRsZXQgZmxhZyA9IChzaG93ID09PSB0cnVlKSB8fCAoc2hvdyA9PT0gJ3RydWUnICk7XHJcblx0XHR0aGlzLnNjLmZpcmUobmV3IEN1c3RvbUV2ZW50KFwidG9nZ2xlUG9kVmlzaWJpbGl0eVwiLCB7IGRldGFpbDoge3Nob3c6ZmxhZ30gfSkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogIEFsbG93cyB1c2VyIHRvIHNldCBoaXMgb3duIHN0YXR1cy5cclxuXHQgKiBcdDxici8+PGJyLz5cclxuXHQgKiAgQWNjZXB0ZWQgU3RhdHVzIFZhbHVlcyBhcmUgOlxyXG5cdCAqICA8dWw+XHJcblx0ICogXHRcdDxsaT48Y29kZT5zcGVlY2hRdWVzdGlvbjwvY29kZT4gOiBSYWlzZSBIYW5kPC9saT5cclxuXHQgKiBcdFx0PGxpPjxjb2RlPnNwZWVjaFF1ZXN0aW9uTG93ZXI8L2NvZGU+IDogTG93ZXIgUmFpc2VkIEhhbmQ8L2xpPlxyXG5cdCAqIFx0XHQ8bGk+PGNvZGU+c3BlZWNoQWdyZWU8L2NvZGU+IDogQWdyZWU8L2xpPlxyXG5cdCAqIFx0XHQ8bGk+PGNvZGU+c3BlZWNoRGlzYWdyZWU8L2NvZGU+IDogRGlzYWdyZWU8L2xpPlxyXG5cdCAqIFx0XHQ8bGk+PGNvZGU+c3BlZWNoQWdyZWVDbGVhcjwvY29kZT4gOiBDbGVhciBBZ3JlZSBvciBEaXNhZ3JlZTwvbGk+XHJcblx0ICogXHRcdDxsaT48Y29kZT5zdGVwcGVkQXdheTwvY29kZT4gOiBTdGVwIEF3YXk8L2xpPlxyXG5cdCAqIFx0XHQ8bGk+PGNvZGU+c3RlcEluPC9jb2RlPiA6IFN0ZXAgSW48L2xpPlxyXG5cdCAqIFx0XHQ8bGk+PGNvZGU+c3BlZWNoTG91ZGVyPC9jb2RlPiA6IFNwZWFrIExvdWRlcjwvbGk+XHJcblx0ICogXHRcdDxsaT48Y29kZT5zcGVlY2hRdWlldGVyPC9jb2RlPiA6IFNwZWFrIFNvZnRlcjwvbGk+XHJcblx0ICogXHRcdDxsaT48Y29kZT5zcGVlY2hGYXN0ZXI8L2NvZGU+IDogU3BlZWQgVXA8L2xpPlxyXG5cdCAqIFx0XHQ8bGk+PGNvZGU+c3BlZWNoU2xvd2VyPC9jb2RlPiA6IFNsb3cgRG93bjwvbGk+XHJcblx0ICogXHRcdDxsaT48Y29kZT5zcGVlY2hMYXVnaHRlcjwvY29kZT4gOiBMYXVnaHRlcjwvbGk+XHJcblx0ICogXHRcdDxsaT48Y29kZT5zcGVlY2hBcHBsYXVzZTwvY29kZT4gOiBBcHBsYXVzZTwvbGk+XHJcblx0ICogXHRcdDxsaT48Y29kZT5jbGVhclN0YXR1czwvY29kZT4gOiBDbGVhciBTdGF0dXM8L2xpPlxyXG5cdCAqICA8L3VsPlxyXG5cdCAqL1xyXG5cdHNldE15U3RhdHVzKHN0YXR1cylcclxuXHR7XHJcblx0XHR0aGlzLnNjLmZpcmUobmV3IEN1c3RvbUV2ZW50KFwiY2hhbmdlTXlTdGF0dXNcIiwgeyBkZXRhaWw6IHtzdGF0dXNWYWx1ZTpzdGF0dXN9IH0pKTtcclxuXHR9XHJcblxyXG5cclxuXHQvKipcclxuICAgICogVGhpcyBtZXRob2Qgd2lsbCBzaG93L2hpZGUgdGhlIHNoYXJlUG9kXHJcbiAgICAqXHJcbiAgICAqIEBtZXRob2QgYWxsb3dQYXJ0aWNpcGFudFB1Ymxpc2hcclxuICAgICogQHJldHVybiB7T2JqZWN0fSBfcG9kVGl0bGUsIHNjb0lkLCBsYW5nLCB1cmxcclxuICAgICovXHJcblx0YWxsb3dQYXJ0aWNpcGFudFB1Ymxpc2gobXNnTmFtZSwgYWxsb3dGbGFnKSB7XHJcblx0XHRsZXQgcF9hbGxvdyA9IChhbGxvd0ZsYWcgPT09IHRydWUpIHx8IChhbGxvd0ZsYWcgPT09ICd0cnVlJyApO1xyXG5cdFx0dGhpcy5zYy5maXJlKG5ldyBDdXN0b21FdmVudChcInBhcnRpY2lwYW50QWxsb3dlZFwiLCB7IGRldGFpbDoge21zZ05tOm1zZ05hbWUsIGFsbG93OiBwX2FsbG93fSB9KSk7XHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlIHRoaXMgY2xpZW50J3MgY29uZmlndXJhdGlvbiwgb3ZlcnJpZGluZyB0aGVtIGlmIGEgY29tcGFyYWJsZSBrZXkgaXMgcGFzc2VkIGluIHNjQXJnc1xyXG5cdCAqIEBtZXRob2QgdXBkYXRlXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gc2NBcmdzXHJcbiBcdCovXHJcblx0dXBkYXRlKHNjQXJncykge1xyXG5cdFx0dGhpcy5maXJlKHsgLi4uc2NBcmdzLCB0eXBlOiBcInVwZGF0ZVwiIH0pO1xyXG5cdH1cclxuXHJcblx0Ly8gZXZlbnQgbGlzdGVuZXJzXHJcblxyXG5cdC8qKlxyXG5cdCAqIEJyaWRnZSBtZXRob2QgdGhhdCBpbmRpY2F0ZXMgdGhhdCB0aGUgY2F1Z2h0VXAgcGhhc2UgaXMgY29tcGxldGUsIGJ1dCBhbHNvIGlzIGFuIGluZGljYXRpb24gdGhhdCBpdCBpcyBub3cgc2FmZSB0byBzZW5kIG1lc3NhZ2VzIG1vcmUgZnJlZWx5IHRvIHRoZSBDb25uZWN0IGFwcGxpY2F0aW9uLiAgWW91IHNob3VsZCBub3QgY2FsbCB0aGlzIG1ldGhvZCBkaXJlY3RseS5cclxuXHQgKlxyXG5cdCAqIEBtZXRob2QgY2F1Z2h0VXBcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdGNhdWdodFVwKCkge1xyXG5cdFx0dGhpcy5wcm9jZXNzQ2FsbGJhY2soJ2NhdWdodFVwJywgeyBpc0NhdWdodFVwOiB0cnVlIH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogd2hlbiB1c2VyIGpvaW5zIHRoZSBtZWV0aW5nXHJcblx0ICpcclxuXHQgKiBAbWV0aG9kIHVzZXJKb2luZWRcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxyXG5cdCAqL1xyXG5cdHVzZXJKb2luZWQoZXZlbnQpIHtcclxuXHRcdHRoaXMuZmlyZShldmVudCk7XHJcblx0fVxyXG5cclxuXHJcbiAgICAvKipcclxuXHQgKiB3aGVuIHVzZXIgam9pbnMgdGhlIG1lZXRpbmdcclxuXHQgKlxyXG5cdCAqIEBtZXRob2QgdXNlckxlZnRcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxyXG4gXHQqL1xyXG5cdHVzZXJMZWZ0KGV2ZW50KSB7XHJcblx0XHR0aGlzLmZpcmUoZXZlbnQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogd2hlbiB1c2VyIHN0YXR1cyBnZXRzIGNoYW5nZWRcclxuXHQgKlxyXG5cdCAqIEBtZXRob2QgdXNlclN0YXR1c0NoYW5nZWRcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxyXG5cdCAqL1xyXG5cdHVzZXJTdGF0dXNDaGFuZ2VkKGV2ZW50KSB7XHJcblx0XHR0aGlzLmZpcmUoZXZlbnQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogd2hlbiBzeW5jIG1lc3NhZ2VzIGFyZSByZWNlaXZlZFxyXG5cdCAqXHJcblx0ICogQG1ldGhvZCBzeW5jTWVzc2FnZVJlY2VpdmVkXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcclxuXHQgKi9cclxuXHRzeW5jTWVzc2FnZVJlY2VpdmVkKGV2ZW50KSB7XHJcblx0XHR0aGlzLmZpcmUoZXZlbnQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogV2hlbiBTeW5jIE1vZGUgaXMgY2hhbmdlZFxyXG5cdCAqXHJcblx0ICogQG1ldGhvZCBzeW5jTW9kZUNoYW5nZWRcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxyXG5cdCAqL1xyXG5cdHN5bmNNb2RlQ2hhbmdlZChldmVudCkge1xyXG5cdFx0dGhpcy5maXJlKHsgLi4uZXZlbnQsIHR5cGU6IFwic3luY01vZGVDaGFuZ2VkXCIgfSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBXaGVuIHVzZXIgZGV0YWlscyBnZXQgY2hhbmdlZFxyXG5cdCAqXHJcblx0ICogQG1ldGhvZCB1c2VyRGV0YWlsc0NoYW5nZWRcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxyXG5cdCAqL1xyXG5cdHVzZXJEZXRhaWxzQ2hhbmdlZChldmVudCkge1xyXG5cdFx0dGhpcy5maXJlKGV2ZW50KTtcclxuXHR9XHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBCcmlkZ2UgbWV0aG9kIHRoYXQgbm90aWZpZXMgdGhhdCB0aGUgdGV4dCBpbiB0aGUgdGl0bGUgYmFyIG9mIHRoaXMgcG9kIGhhcyBjaGFuZ2VkXHJcblx0ICpcclxuXHQgKiBAbWV0aG9kIHBvZFRpdGxlQ2hhbmdlZFxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XHJcblx0ICogQHJlcXVpcmVkXHJcblx0ICovXHJcblx0cG9kVGl0bGVDaGFuZ2VkKGV2ZW50KSB7XHJcblx0XHR0aGlzLmZpcmUoeyAuLi5ldmVudCwgdHlwZTogXCJwb2RUaXRsZUNoYW5nZWRcIiB9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJyaWRnZSBtZXRob2QgdGhhdCBpbmRpY2F0ZXMgd2hldGhlciBvciBub3QgdGhlIHBvaW50ZXIgaXMgb25cclxuXHQgKlxyXG5cdCAqIEBtZXRob2QgcG9pbnRlclRvZ2dsZVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XHJcblx0ICogQHJlcXVpcmVkXHJcblx0ICovXHJcblx0cG9pbnRlclRvZ2dsZShldmVudCkge1xyXG5cdFx0dGhpcy5maXJlKHsgLi4uZXZlbnQsIHR5cGU6IFwicG9pbnRlclRvZ2dsZVwiIH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQnJpZGdlIG1ldGhvZCB0aGF0IGluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCB0aGUgcG9pbnRlciBpcyBvblxyXG5cdCAqXHJcblx0ICogQG1ldGhvZCB3aGl0ZUJvYXJkVG9nZ2xlXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcclxuXHQgKiBAcmVxdWlyZWRcclxuIFx0Ki9cclxuXHR3aGl0ZUJvYXJkVG9nZ2xlKGV2ZW50KSB7XHJcblx0XHR0aGlzLmZpcmUoZXZlbnQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQnJpZGdlIG1ldGhvZCB0byBub3RpZnkgdGhhdCBhIHVzZXIncyByb2xlIGhhcyBjaGFuZ2VkXHJcblx0ICpcclxuXHQgKiBAbWV0aG9kIHJvbGVDaGFuZ2VkXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcclxuXHQgKiBAcmVxdXJpZWRcclxuXHQgKi9cclxuXHRyb2xlQ2hhbmdlZChldmVudCkge1xyXG5cdFx0dGhpcy5maXJlKGV2ZW50KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJyaWRnZSBtZXRob2QgdGhhdCBpbmRpY2F0ZXMgcGxheVN0YXRlQ2hhbmdlZCBmb3IgcmVjb3JkaW5nXHJcblx0ICpcclxuXHQgKiBAbWV0aG9kIHBsYXlTdGF0ZUNoYW5nZWRcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxyXG5cdCAqIEByZXF1aXJlZFxyXG4gXHQqL1xyXG5cdCBwbGF5U3RhdGVDaGFuZ2VkKGV2ZW50KSB7XHJcblx0XHR0aGlzLmZpcmUoZXZlbnQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0dG8gbG9nIHRoZSBtZXNzYWdlXHJcblx0Ki9cclxuXHRpbmZvKG1zZykge1xyXG5cdFx0Y29uc29sZS5sb2cobXNnKTtcclxuXHR9XHJcblxyXG5cclxuXHQvKipcclxuXHQgKkhpZ2gtbGV2ZWwgbWV0aG9kIHRvIHNlbmQgYSBzeW5jIG1lc3NhZ2UgdG8gdGhlIENvbm5lY3QgYXBwbGljYXRpb24uXHJcblx0ICpcclxuXHQgKiBAbWV0aG9kIGRpc3BhdGNoXHJcblx0ICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZE5hbWUgYSBuYW1lIHRoYXQgc2hvdWxkIGJlIGFscmVhZHkga25vd24gdG8gdGhlIENvbm5lY3QgTW9iaWxlIEFwcGxpY2F0aW9uIChzdWNoIGFzICdsb2cnKVxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBhcmdzXHJcblx0ICogQHJlcXVpcmVkXHJcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgY2FsbGJhY2sgaGFuZGxlciBvbmNlIHRoaXMgZGlzcGF0Y2ggaGFzIGJlZW4gc2VudFxyXG5cdCAqIEBvcHRpb25hbFxyXG5cdCAqL1xyXG5cdGRpc3BhdGNoKG1ldGhvZE5hbWUsIGFyZ3MsIGNiKSB7XHJcblx0XHR2YXIgZGF0YSA9IHsgXCJtZXRob2RcIjogbWV0aG9kTmFtZSwgXCJhcmdzXCI6IGFyZ3MsIFwiY2JcIjogY2IgfTtcclxuXHRcdHRoaXMuc2MuZmlyZShuZXcgQ3VzdG9tRXZlbnQoXCJzeW5jRXZlbnRcIiwgeyBkZXRhaWw6IGRhdGEgfSkpO1xyXG5cdH1cclxuXHJcblxyXG5cclxuXHQvKipcclxuXHQqIE1ldGhvZCB0byBzZW5kIGEgc3luYyBtZXNzYWdlIHRvIG90aGVyIHBhcnRpY2lwYW50c1xyXG5cdCogSU1QT1JUQU5UOiB0aGVyZSBpcyBhIGJ1ZyBpbiB0aGUgY3VycmVudCBpbXBsZW1lbnRhdGlvbi4gIEFzIG9mIENvbm5lY3QgbW9iaWxlIDIuNC4xMCwgc3luYyBtZXNzYWdlcyB3aWxsIG5vdCBiZSBkaXNwYXRjaGVkIHVudGlsIHBfbXNnTmFtZSBhbmQgcF9tc2dWYWx1ZSBhcmUgdGhlIHByb3BlcnR5IG5hbWVzIHVzZWQuICBBZnRlciB0aGlzIHZlcnNpb24sIHN5bmMgbWVzc2FnZXMgd2lsbCBhbHNvIGJlIHNlbnQgaWYgcF9tc2dObSBhbmQgcF9tc2dWYWwgYXJlIHVzZWQuICBUaGUgcmVhc29uIHdoeSBpcyB0aGF0IGRlc2t0b3AgY3VzdG9tIHBvZHMgYXJlIGV4cGVjdGluZyBwX21zZ05tIGFuZCBwX21zZ1ZhbC4gIFNvIGlmIHlvdSB3YW50IHRoZSBkaXNwYXRjaCBtZXNzYWdlcyB0byBiZSBzZW50LCBhbmQgeW91IGFyZSBjb25jZXJuZWQgdGhhdCB0aGUgdXNlciBtaWdodCBub3QgaGF2ZSBhIG1vcmUgY3VycmVudCB2ZXJzaW9uLCB0aGVuIGNhbGwgQ29ubmVjdEN1c3RvbVNESy5TeW5jQ29ubmVjdG9yLnVzZUFsdGVybmF0ZURpc3BhdGNoU2NoZW1lKHRydWUpO1xyXG5cdCpcclxuXHQqIEBtZXRob2QgZGlzcGF0Y2hTeW5jTWVzc2FnZVxyXG5cdCogQHBhcmFtIHtTdHJpbmd9IG1zZ05hbWUgbmFtZSBvZiB0aGUgbWVzc2FnZSB0byBiZSBzZW50IC0tIHNob3VsZCBiZSBtZWFuaW5nZnVsIHRvIHRoZSBwb2QgcnVubmluZyBvbiBvdGhlciBwYXJ0aWNpcGFudCdzIG1hY2hpbmVzXHJcblx0KiBAcGFyYW0ge09iamVjdH0gbXNnVmFsdWUgdGhlIGNvbnRlbnRzIG9mIHRoZSBtZXNzYWdlIHRvIGJlIHNlbnQsIHRoZSBmb3JtYXQgdG8gYmUgZGV0ZXJtaW5lZCBieSB5b3VyIG93biBjdXN0b20gcG9kXHJcblx0KiBAcGFyYW0ge0Jvb2xlYW59IGlzRGVsdGEgaWYgdHJ1ZSwgdGhlbiBhbGwgb2YgdGhlIGV2ZW50cyBtYXRjaGluZyB0aGlzIG1lc3NhZ2UgbmFtZSB3aWxsIGJlIHNlbnQgdG8gbmV3IHBhcnRpY3BhbnRzLiBJZiBmYWxzZSwgdGhlbiBvbmx5IHRoZSBsYXN0IGtub3duIGV2ZW50IHdpbGwgYmUgc2VudC5cclxuXHQqIEBwYXJhbSB7Qm9vbGVhbn0gZWNob0JhY2sgaWYgdHJ1ZSwgdGhlbiB0aGlzIGluc3RhbmNlIG9mIHRoZSBjdXN0b20gcG9kIHdpbGwgcmVjZWl2ZSBhIGNvcnJlc3BvbmRpbmcgc3luYyBtZXNzYWdlIGJhY2ssIG90aGVyd2lzZSBvbmx5IHRoZSBvdGhlciBwYXJ0aWNpcGFudHMgd2lsbCByZWNlaXZlIHRoaXMgbWVzc2FnZS5cclxuXHQqL1xyXG5cdGRpc3BhdGNoU3luY01lc3NhZ2UobXNnTmFtZSwgbXNnVmFsdWUsIGlzRGVsdGEsIGVjaG9CYWNrKSB7XHJcblx0XHRlY2hvQmFjayA9IHR5cGVvZiBlY2hvQmFjayA9PT0gJ3VuZGVmaW5lZCcgPyBmYWxzZSA6IGVjaG9CYWNrO1xyXG5cdFx0dGhpcy5kaXNwYXRjaChcImRpc3BhdGNoU3luY01lc3NhZ2VcIiwgeyBcIm1zZ05tXCI6IG1zZ05hbWUsIFwibXNnVmFsXCI6IG1zZ1ZhbHVlLCBcImlzRGVsdGFcIjogaXNEZWx0YSwgXCJfZWNob1wiOiBlY2hvQmFjayB9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgbnVtYmVyIHRoYXQgc3BlY2lmaWVzIHRoZSBoZWlnaHQgb2YgdGhlIHBvZCBjb250YWluaW5nIHRoZSBhcHBsaWNhdGlvbi4gXHJcblx0ICovXHJcblx0Z2V0IHBvZEhlaWdodCgpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuc2MuX3BvZEhlaWdodDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCogQSBudW1iZXIgdGhhdCBzcGVjaWZpZXMgdGhlIHdpZHRoIG9mIHRoZSBwb2QgY29udGFpbmluZyB0aGUgYXBwbGljYXRpb24uXHJcblx0ICovXHJcblx0Z2V0IHBvZFdpZHRoKClcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5zYy5fcG9kV2lkdGg7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQqIEEgbnVtYmVyIHRoYXQgc3BlY2lmaWVzIHRoZSBtaW5pbXVtIHdpZHRoIG9mIHRoZSBwb2QgY29udGFpbmluZyB0aGUgYXBwbGljYXRpb24uIFxyXG5cdCovXHJcbiAgICBnZXQgcG9kTWluV2lkdGgoKVxyXG4gICAge1xyXG4gICAgXHRyZXR1cm4gdGhpcy5zYy5fcG9kTWluV2lkdGg7XHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG5cdCogQSBudW1iZXIgdGhhdCBzcGVjaWZpZXMgdGhlIG1pbmltdW0gaGVpZ2h0IG9mIHRoZSBwb2QgY29udGFpbmluZyB0aGUgYXBwbGljYXRpb24uIFxyXG5cdCovXHJcbiAgICBnZXQgcG9kTWluSGVpZ2h0KClcclxuICAgIHtcclxuICAgIFx0cmV0dXJuIHRoaXMuc2MuX3BvZE1pbkhlaWdodDtcclxuICAgIH1cclxuXHJcblx0LyoqXHJcblx0KiBBIGJvb2xlYW4gdGhhdCB0ZWxscyB3aGV0aGVyIHBvZCBpcyBTeW5jZWQgb3Igbm90IFxyXG5cdCovXHJcblx0Z2V0IGlzU3luY2VkKClcclxuICAgIHtcclxuICAgIFx0cmV0dXJuIHRoaXMuc2MuX2lzU3luY2VkO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0KiBBIGJvb2xlYW4gdGhhdCB0ZWxscyB3aGV0aGVyIHBvZCBpcyBTeW5jZWQgb3Igbm90IFxyXG5cdCovXHJcblx0Z2V0IGlzU3luY2VkKClcclxuICAgIHtcclxuICAgIFx0cmV0dXJuIHRoaXMuc2MuX2lzU3luY2VkO1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQqIEEgYm9vbGVhbiB0aGF0IHRlbGxzIHdoZXRoZXIgcG9kIGlzIFN5bmNlZCBvciBub3QgXHJcblx0Ki9cclxuXHRnZXQgY29ubmVjdFZlcnNpb24oKVxyXG4gICAge1xyXG4gICAgXHRyZXR1cm4gdGhpcy5zYy5fY29ubmVjdFZlcnNpb247XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCogQSBTdHJpbmcgdGhhdCBzcGVjaWZpZXMgdGhlIGR1cmF0aW9uIG9mIHRoZSByZWNvcmRpbmcgXHJcblx0Ki9cclxuICAgIGdldCBhcmNoaXZlRHVyYXRpb24oKVxyXG4gICAge1xyXG4gICAgXHRyZXR1cm4gdGhpcy5zYy5fYXJjaGl2ZUR1cmF0aW9uO1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQqIEEgU3RyaW5nIHRoYXQgc3BlY2lmaWVzIHRoZSBwbGF5U3RhdGUgb2YgdGhlIHJlY29yZGluZyBcclxuXHQqL1xyXG4gICAgZ2V0IHBsYXlTdGF0ZSgpXHJcbiAgICB7XHJcbiAgICBcdHJldHVybiB0aGlzLnNjLl9wbGF5U3RhdGU7XHJcbiAgICB9XHJcblx0XHJcblxyXG5cclxuXHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgU3luY0Nvbm5lY3RvciA9IG5ldyBDb25uZWN0Q3VzdG9tUG9kU0RLKCk7XHJcbiIsIi8qKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKiBBRE9CRSBDT05GSURFTlRJQUxcclxuICogX19fX19fX19fX19fX19fX19fX1xyXG4gKlxyXG4gKiAgQ29weXJpZ2h0IDIwMTUgQWRvYmUgU3lzdGVtcyBJbmNvcnBvcmF0ZWRcclxuICogIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIE5PVElDRTogIEFsbCBpbmZvcm1hdGlvbiBjb250YWluZWQgaGVyZWluIGlzLCBhbmQgcmVtYWluc1xyXG4gKiB0aGUgcHJvcGVydHkgb2YgQWRvYmUgU3lzdGVtcyBJbmNvcnBvcmF0ZWQgYW5kIGl0cyBzdXBwbGllcnMsXHJcbiAqIGlmIGFueS4gIFRoZSBpbnRlbGxlY3R1YWwgYW5kIHRlY2huaWNhbCBjb25jZXB0cyBjb250YWluZWRcclxuICogaGVyZWluIGFyZSBwcm9wcmlldGFyeSB0byBBZG9iZSBTeXN0ZW1zIEluY29ycG9yYXRlZCBhbmQgaXRzXHJcbiAqIHN1cHBsaWVycyBhbmQgYXJlIHByb3RlY3RlZCBieSBhbGwgYXBwbGljYWJsZSBpbnRlbGxlY3R1YWwgcHJvcGVydHlcclxuICogbGF3cywgaW5jbHVkaW5nIHRyYWRlIHNlY3JldCBhbmQgY29weXJpZ2h0IGxhd3MuXHJcbiAqIERpc3NlbWluYXRpb24gb2YgdGhpcyBpbmZvcm1hdGlvbiBvciByZXByb2R1Y3Rpb24gb2YgdGhpcyBtYXRlcmlhbFxyXG4gKiBpcyBzdHJpY3RseSBmb3JiaWRkZW4gdW5sZXNzIHByaW9yIHdyaXR0ZW4gcGVybWlzc2lvbiBpcyBvYnRhaW5lZFxyXG4gKiBmcm9tIEFkb2JlIFN5c3RlbXMgSW5jb3Jwb3JhdGVkLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50RGlzcGF0Y2hlciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lck1hcCA9IG5ldyBNYXAoKTsgLy8ga2V5IC0+IHtldmVudFR5cGVMaXN0ZW5lcnM6IFtDYWxsYmFja10sIG9iamVjdElkTGlzdGVuZXJzIC0+IE1hcCAob2JqZWN0SWQgLT4gQ2FsbGJhY2spfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIE9iamVjdElkIGlzIG9wdGlvbmFsIGFyZ3VtZW50XHJcbiAgICByZWdpc3RlckNhbGxiYWNrKGV2ZW50TmFtZSwgY2FsbGJhY2ssIG9iamVjdElkKSB7XHJcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24oY2FsbGJhY2spKSB7XHJcbiAgICAgICAgbGV0IGxpc3RlbmVyT2JqID0gdGhpcy5saXN0ZW5lck1hcC5nZXQoZXZlbnROYW1lKTtcclxuICAgICAgICBpZiAoIWxpc3RlbmVyT2JqKSB7XHJcbiAgICAgICAgICAgIC8vIE5ldyBldmVudCBuYW1lIGVudHJ5XHJcbiAgICAgICAgICAgIGxpc3RlbmVyT2JqID0ge2V2ZW50VHlwZUxpc3RlbmVyczogW10sIG9iamVjdElkTGlzdGVuZXJzOiBuZXcgTWFwKCl9O1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyTWFwLnNldChldmVudE5hbWUsIGxpc3RlbmVyT2JqKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBtYXRjaGVyID0gKGVsZW1lbnQpID0+IGVsZW1lbnQgPT09IGNhbGxiYWNrO1xyXG4gICAgICAgIGlmICghb2JqZWN0SWQpIHtcclxuICAgICAgICAgICAgLy8gVGFyZ2V0IGlkIG5vdCBzcGVjaWZpZWQuIEFkZCBldmVudCB0byBldmVudFR5cGVMaXN0ZW5lcnMgYXJyYXlcclxuICAgICAgICAgICAgLy8gaWYgZXhpc3RzIHRoZW4gZG8gbm90IGFkZFxyXG4gICAgICAgICAgICBjb25zdCBjYWxsQmFja0luZGV4ID0gbGlzdGVuZXJPYmouZXZlbnRUeXBlTGlzdGVuZXJzLmZpbmRJbmRleChtYXRjaGVyKTtcclxuICAgICAgICAgICAgaWYoY2FsbEJhY2tJbmRleCA9PT0gLTEpXHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lck9iai5ldmVudFR5cGVMaXN0ZW5lcnMucHVzaChjYWxsYmFjayk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gVGFyZ2V0IGlkIHNwZWNpZmllZC4gQWRkIGV2ZW50IHRvIG9iamVjdElkTGlzdGVuZXJzIG1hcFxyXG4gICAgICAgICAgICBsZXQgY2FsbEJhY2tJbmRleCA9IC0xO1xyXG4gICAgICAgICAgICBpZiAobGlzdGVuZXJPYmoub2JqZWN0SWRMaXN0ZW5lcnMuaGFzKG9iamVjdElkKSAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgbGlzdGVuZXJPYmoub2JqZWN0SWRMaXN0ZW5lcnMuc2V0KG9iamVjdElkLCBbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgY2FsbEJhY2tJbmRleCA9IGxpc3RlbmVyT2JqLm9iamVjdElkTGlzdGVuZXJzLmdldChvYmplY3RJZCkuZmluZEluZGV4KG1hdGNoZXIpO1xyXG4gICAgICAgICAgICBpZihjYWxsQmFja0luZGV4ID09PSAtMSlcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyT2JqLm9iamVjdElkTGlzdGVuZXJzLmdldChvYmplY3RJZCkucHVzaChjYWxsYmFjaylcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE9iamVjdCBJZCBpcyBvcHRpb25hbCwgZXZlbiBpZiBsaXN0ZW5lciBpcyByZWdpc3RlcmVkIHdpdGggb2JqZWN0IGlkXHJcbiAgICB1bnJlZ2lzdGVyQ2FsbGJhY2tzKGV2ZW50TmFtZSwgY2FsbGJhY2ssIG9iamVjdElkKSB7XHJcbiAgICAgICAgbGV0IHJlbW92ZWQgPSBmYWxzZTtcclxuICAgICAgICBsZXQgbGlzdGVuZXJPYmogPSB0aGlzLmxpc3RlbmVyTWFwLmdldChldmVudE5hbWUpO1xyXG4gICAgICAgIGlmIChsaXN0ZW5lck9iaikge1xyXG4gICAgICAgICAgICAvLyBSZW1vdmUgbGlzdGVuZXJzIGZyb20gZXZlbnRUeXBlTGlzdGVuZXJzXHJcbiAgICAgICAgICAgIGxldCBsaXN0ZW5lcnMgPSBfcmVtb3ZlQ2FsbGJhY2tGcm9tQXJyYXkoY2FsbGJhY2ssIGxpc3RlbmVyT2JqLmV2ZW50VHlwZUxpc3RlbmVycyk7XHJcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lcnMpIHtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyT2JqLmV2ZW50VHlwZUxpc3RlbmVycyA9IGxpc3RlbmVycztcclxuICAgICAgICAgICAgICAgIHJlbW92ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSBsaXN0ZW5lcnMgZnJvbSBvYmplY3RJZExpc3RlbmVycy4gSWYgb2JqZWN0IGlkIGlzIHNwZWNpZmllZCB0aGVuIGRvbid0IGxvb2sgaW50byBjb21wbGV0ZSBvYmplY3RJZExpc3RlbmVycyBtYXAuXHJcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSBpdGVyYXRlIGZ1bGwgbWFwIGFuZCBzZWFyY2ggaW5zdGFuY2VzIG9mIHRoaXMgY2FsbGJhY2suXHJcbiAgICAgICAgICAgIGlmIChvYmplY3RJZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKF9yZW1vdmVDYWxsYmFja0Zvck9iamVjdElkKG9iamVjdElkLCBjYWxsYmFjaywgbGlzdGVuZXJPYmopKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJdGVyYXRlIGZ1bGwgbWFwIGFuZCBzZWFyY2ggaW5zdGFuY2VzIG9mIHRoaXMgY2FsbGJhY2suXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBvYmplY3RJZCBvZiBsaXN0ZW5lck9iai5vYmplY3RJZExpc3RlbmVycy5rZXlzKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3JlbW92ZUNhbGxiYWNrRm9yT2JqZWN0SWQob2JqZWN0SWQsIGNhbGxiYWNrLCBsaXN0ZW5lck9iaikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyZW1vdmVkICYmIGxpc3RlbmVyT2JqLmV2ZW50VHlwZUxpc3RlbmVycy5sZW5ndGggPT09IDAgJiYgbGlzdGVuZXJPYmoub2JqZWN0SWRMaXN0ZW5lcnMuc2l6ZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lck1hcC5kZWxldGUoZXZlbnROYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVtb3ZlZDtcclxuICAgIH1cclxuXHJcbiAgICBmaXJlKGV2ZW50T2JqZWN0LCBvYmplY3RJZCkge1xyXG4gICAgICAgIGxldCB0cywgdGU7XHJcbiAgICAgICAgaWYocGVyZm9ybWFuY2UpIHtcclxuICAgICAgICAgICAgdHMgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGZpcmVkID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKGV2ZW50T2JqZWN0LnRhcmdldCA9PT0gdW5kZWZpbmVkIHx8IGV2ZW50T2JqZWN0LnRhcmdldCA9PT0gbnVsbClcclxuICAgICAgICAgICAgZXZlbnRPYmplY3QubXl0YXJnZXQgPSB0aGlzO1xyXG4gICAgICAgIGxldCBsaXN0ZW5lck9iaiA9IHRoaXMubGlzdGVuZXJNYXAuZ2V0KGV2ZW50T2JqZWN0LnR5cGUpO1xyXG4gICAgICAgIGlmIChsaXN0ZW5lck9iaikge1xyXG4gICAgICAgICAgICBpZiAoX2ZpcmVFdmVudEZvckxpc3RlbmVyc0FycmF5KGV2ZW50T2JqZWN0LCBsaXN0ZW5lck9iai5ldmVudFR5cGVMaXN0ZW5lcnMpKSB7XHJcbiAgICAgICAgICAgICAgICBmaXJlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG9iamVjdElkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoX2ZpcmVFdmVudEZvckxpc3RlbmVyc0FycmF5KGV2ZW50T2JqZWN0LCBsaXN0ZW5lck9iai5vYmplY3RJZExpc3RlbmVycy5nZXQob2JqZWN0SWQpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihwZXJmb3JtYW5jZSkge1xyXG4gICAgICAgICAgICB0ZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmlyZWQ7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG4vLyBQcml2YXRlIG1ldGhvZHNcclxuXHJcbmZ1bmN0aW9uIGlzRnVuY3Rpb24ob2JqKSB7XHJcbiAgICByZXR1cm4gKHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicgfHwgZmFsc2UpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9yZW1vdmVDYWxsYmFja0Zyb21BcnJheShjYWxsYmFjaywgY2FsbGJhY2tBcnJheSkge1xyXG4gICAgbGV0IG5ld0NhbGxiYWNrQXJyYXkgPSBjYWxsYmFja0FycmF5LmZpbHRlcihjID0+IGMgIT09IGNhbGxiYWNrKTtcclxuICAgIGlmIChuZXdDYWxsYmFja0FycmF5Lmxlbmd0aCAhPT0gY2FsbGJhY2tBcnJheS5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gbmV3Q2FsbGJhY2tBcnJheTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gX3JlbW92ZUNhbGxiYWNrRm9yT2JqZWN0SWQob2JqZWN0SWQsIGNhbGxiYWNrLCBsaXN0ZW5lck9iaikge1xyXG4gICAgbGV0IGxpc3RlbmVycyA9IF9yZW1vdmVDYWxsYmFja0Zyb21BcnJheShjYWxsYmFjaywgbGlzdGVuZXJPYmoub2JqZWN0SWRMaXN0ZW5lcnMuZ2V0KG9iamVjdElkKSk7XHJcbiAgICBpZiAobGlzdGVuZXJzKSB7XHJcbiAgICAgICAgbGlzdGVuZXJPYmoub2JqZWN0SWRMaXN0ZW5lcnMuc2V0KG9iamVjdElkLCBsaXN0ZW5lcnMpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBfZmlyZUV2ZW50Rm9yTGlzdGVuZXJzQXJyYXkoZXZlbnRPYmplY3QsIGxpc3RlbmVycykge1xyXG4gICAgaWYgKGxpc3RlbmVycyAmJiBsaXN0ZW5lcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgbGlzdGVuZXJzLmZvckVhY2goKGxpc3RlbmVyKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lciAmJiBpc0Z1bmN0aW9uKGxpc3RlbmVyKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRzLCB0ZTtcclxuICAgICAgICAgICAgICAgIGlmKHBlcmZvcm1hbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHMgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyKGV2ZW50T2JqZWN0KTtcclxuICAgICAgICAgICAgICAgIGlmKHBlcmZvcm1hbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGUgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==