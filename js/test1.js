 /** * 閫夋嫨鍒楄〃鎻掍欢 * varstion 2.0.0 * by Houfeng * Houfeng@DCloud.io **/ 
  var isLUN = false;//判断农历
  var isHasLeapMonth; //判断是否有闰月
  var leapMonth,leapMonthDay;//闰月,天数
 ! function(e, t, i, n) {
     var a = 30,
         r = 90,
         s = 40,
         c = 10,
         l = e.rad2deg = function(e) {
             return e / (Math.PI / 180) },
         o = (e.deg2rad = function(e) {
             return e * (Math.PI / 180) },
              navigator.platform.toLowerCase()),
         d = navigator.userAgent.toLowerCase(),
         u = (d.indexOf("iphone") > -1 || d.indexOf("ipad") > -1 || d.indexOf("ipod") > -1) && (o.indexOf("iphone") > -1 || o.indexOf("ipad") > -1 || o.indexOf("ipod") > -1),
         p = e.Picker = function(e, t) {
            //e: div.mui-picker
             var i = this;
             i.holder = e;
             i.options = t || {};
             i.init(); 
             i.initInertiaParams();
             i.calcElementItemPostion(!0);
             i.bindEvent();
         };
    p.prototype.findElementItems = function() {
         var e = this;
         //对获取的元素数组化
         return e.elementItems = [].slice.call(e.holder.querySelectorAll("li")),e.elementItems;
    };
    p.prototype.init = function() {
         var e = this;
         e.list = e.holder.querySelector("ul");
         e.findElementItems(); 
         e.height = e.holder.offsetHeight;
         e.r = e.height / 2 - c;
         e.d = 2 * e.r;
         //s => 40
         e.itemHeight = e.elementItems.length > 0 ? e.elementItems[0].offsetHeight : s;
         e.itemAngle = parseInt(e.calcAngle(.8 * e.itemHeight)); 
         e.hightlightRange = e.itemAngle / 2; 
         e.visibleRange = r;
         e.beginAngle = 0; 
         e.beginExceed = e.beginAngle - a;
         e.list.angle = e.beginAngle;
         //if判断的简写： u => 条件 () => 执行
         // var a = 1&&2&&3, b = 0&&1&&2;
         u && (e.list.style.webkitTransformOrigin = "center center " + e.r + "px");
    };
    p.prototype.calcElementItemPostion = function(e) {
        var t = this;
        e && (t.items = []);
        t.elementItems.forEach(function(i) {
             var n = t.elementItems.indexOf(i);
             if (t.endAngle = t.itemAngle * n, 
                i.angle = t.endAngle, 
                i.style.webkitTransformOrigin = "center center -" + t.r + "px", 
                i.style.webkitTransform = "translateZ(" + t.r + "px) rotateX(" + -t.endAngle + "deg)", 
                e) {//这里的if判断条件 前面都是赋值，只判断最后的e
                 var a = {};
                 a.text = i.innerHTML || "", 
                 a.value = i.getAttribute("data-value") || a.text, t.items.push(a);
            } 
        });
        t.endExceed = t.endAngle + a, 
        t.calcElementItemVisibility(t.beginAngle);
    };
    p.prototype.calcAngle = function(e) {
         var t = this,
             i = b = parseFloat(t.r);
         e = Math.abs(e);
         var n = 180 * parseInt(e / t.d);
         e %= t.d;
         var a = (i * i + b * b - e * e) / (2 * i * b),
             r = n + l(Math.acos(a));
         return r; 
    }, 
    p.prototype.calcElementItemVisibility = function(e) {
        var t = this;
        t.elementItems.forEach(function(i) {
            // console.log(i);
            var n = Math.abs(i.angle - e);
            n < t.hightlightRange ? i.classList.add("highlight") : n < t.visibleRange ? (i.classList.add("visible"), 
            i.classList.remove("highlight")) : (i.classList.remove("highlight"), 
            i.classList.remove("visible"));
        }); 
    }; 
    p.prototype.setAngle = function(e) {
        var t = this;
        // console.log(t);
        t.list.angle = e;
        t.list.style.webkitTransform = "perspective(1000px) rotateY(0deg) rotateX(" + e + "deg)"; 
        t.calcElementItemVisibility(e); 
    };
    p.prototype.bindEvent = function() {
        var t = this,
            i = 0,
            n = null,
            a = !1;
            //t.holder => div.mui-picker
        t.holder.addEventListener(e.EVENT_START, function(e) { 
            a = !0;
            e.preventDefault();
            t.list.style.webkitTransition = ""; 
            n = (e.changedTouches ? e.changedTouches[0] : e).pageY; 
            i = t.list.angle; 
            t.updateInertiaParams(e, !0);
        }, !1); 
        t.holder.addEventListener(e.EVENT_END, function(e) { a = !1; e.preventDefault(); t.startInertiaScroll(e); }, !1);
        t.holder.addEventListener(e.EVENT_CANCEL, function(e) { a = !1; e.preventDefault(); t.startInertiaScroll(e); }, !1); 
        t.holder.addEventListener(e.EVENT_MOVE, function(e) {
            if (a) { 
                e.preventDefault();
                var r = (e.changedTouches ? e.changedTouches[0] : e).pageY,
                    s = r - n,
                    c = t.calcAngle(s),
                    l = s > 0 ? i - c : i + c;
                l > t.endExceed && (l = t.endExceed); 
                l < t.beginExceed && (l = t.beginExceed); 
                t.setAngle(l); 
                t.updateInertiaParams(e);
            } 
        }, !1);
        t.list.addEventListener("tap", function(e) { 
            elementItem = e.target, 
            "LI" == elementItem.tagName && t.setSelectedIndex(t.elementItems.indexOf(elementItem), 200); 
        }, !1);
    }; 
    p.prototype.initInertiaParams = function() {
        var e = this; 
        e.lastMoveTime = 0;
        e.lastMoveStart = 0; 
        e.stopInertiaMove = !1;
    };
    p.prototype.updateInertiaParams = function(e, t) {
        // console.log(t);
        var i = this,
            n = e.changedTouches ? e.changedTouches[0] : e;
        if (t) {   
            i.lastMoveStart = n.pageY;
            i.lastMoveTime = e.timeStamp || Date.now();
            i.startAngle = i.list.angle;
        } else {
            var a = e.timeStamp || Date.now();
            a - i.lastMoveTime > 300 && (i.lastMoveTime = a, i.lastMoveStart = n.pageY);
        };
         i.stopInertiaMove = !0;
    };
    p.prototype.startInertiaScroll = function(e) {
        var t = this,
             i = e.changedTouches ? e.changedTouches[0] : e,
             n = e.timeStamp || Date.now(),
             a = (i.pageY - t.lastMoveStart) / (n - t.lastMoveTime),
             r = a > 0 ? -1 : 1,
             s = 6e-4 * r * -1,
             c = Math.abs(a / s),
             l = a * c / 2,
             o = t.list.angle,
             d = t.calcAngle(l) * r,
             u = d;
        return o + d < t.beginExceed && (d = t.beginExceed - o, c = c * (d / u) * .6), o + d > t.endExceed && (d = t.endExceed - o, c = c * (d / u) * .6), 0 == d ? void t.endScroll() : void t.scrollDistAngle(n, o, d, c) 
    };
    p.prototype.scrollDistAngle = function(e, t, i, n) {
        var a = this;
        //?
        a.stopInertiaMove = !1,
        function(e, t, i, n) {
            var r = 13,
                s = n / r,
                c = 0;
            !function l() {
                if (!a.stopInertiaMove) {
                    var e = a.quartEaseOut(c, t, i, s);
                    return a.setAngle(e), c++, c > s - 1 || e < a.beginExceed || e > a.endExceed ? void a.endScroll() : void setTimeout(l, r);
                }    
            }();
         }(e, t, i, n); 
    };
    p.prototype.quartEaseOut = function(e, t, i, n) {
         return -i * ((e = e / n - 1) * e * e * e - 1) + t;
    };
    p.prototype.endScroll = function() {
         var e = this;
         if (e.list.angle < e.beginAngle) e.list.style.webkitTransition = "150ms ease-out", e.setAngle(e.beginAngle);
         else if (e.list.angle > e.endAngle) e.list.style.webkitTransition = "150ms ease-out", e.setAngle(e.endAngle);
         else {
             var t = parseInt((e.list.angle / e.itemAngle).toFixed(0));
             e.list.style.webkitTransition = "100ms ease-out", e.setAngle(e.itemAngle * t); }
         e.triggerChange();
    }; 
    p.prototype.triggerChange = function(t) {
        var i = this;
        setTimeout(function() {
            var n = i.getSelectedIndex(),
                a = i.items[n];
            !e.trigger || n == i.lastIndex && t !== !0 || e.trigger(i.holder, "change", { index: n, item: a }), 
            i.lastIndex = n, 
            "function" == typeof t && t(); 
        }, 0);
    };
    p.prototype.correctAngle = function(e) {
        var t = this;
        return e < t.beginAngle ? t.beginAngle : e > t.endAngle ? t.endAngle : e;
    };
    p.prototype.setItems = function(e) {
        var t = this;
        t.items = e || [];
        var i = [];
        //?
        t.items.forEach(function(e) { null !== e && e !== n && i.push("<li>" + (e.text || e) + "</li>")});
        t.list.innerHTML = i.join(""), 
        t.findElementItems(), 
        t.calcElementItemPostion(),
        t.setAngle(t.correctAngle(t.list.angle)), 
        t.triggerChange(!0);
    }; 
    p.prototype.getItems = function() {
        var e = this;
        return e.items;
    };
    p.prototype.getSelectedIndex = function() {
        var e = this;
        return parseInt((e.list.angle / e.itemAngle).toFixed(0));
    }; 
    p.prototype.setSelectedIndex = function(e, t, i) {
        var n = this;
        n.list.style.webkitTransition = "";
        // console.log(n);
        var a = n.correctAngle(n.itemAngle * e);
        if (t && t > 0) {
            var r = a - n.list.angle;
            n.scrollDistAngle(Date.now(), n.list.angle, r, t) } else n.setAngle(a);
        n.triggerChange(i);
    };
    p.prototype.getSelectedItem = function() {
        var e = this;
        return e.items[e.getSelectedIndex()]; 
    };
    p.prototype.getSelectedValue = function() {
        var e = this;
        return (e.items[e.getSelectedIndex()] || {}).value;
    }; 
    p.prototype.getSelectedText = function() {
        var e = this;
        return (e.items[e.getSelectedIndex()] || {}).text;
    };
    p.prototype.setSelectedValue = function(e, t, i) {
            var n = this;
            for (var a in n.items) {
                var r = n.items[a];
                if (r.value == e) return void n.setSelectedIndex(a, t, i); } 
            };
            e.fn && (e.fn.picker = function(e) {
                return this.each(function(t, i) {
                    if (!i.picker)
                        if (e) i.picker = new p(i, e)
                        else {
                            var n = i.getAttribute("data-picker-options"),
                                a = n ? JSON.parse(n) : {};
                            i.picker = new p(i, a); 
                        };
                }), 
                this[0] ? this[0].picker : null; 
            },
            e.ready(function() { e(".mui-picker").picker(); })) }(window.mui || window, window, document, void 0),
            function(e, t) { e.dom = function(i) {
                return "string" != typeof i ? i instanceof Array || i[0] && i.length ? [].slice.call(i) : [i] : (e.__create_dom_div__ || (e.__create_dom_div__ = t.createElement("div")), e.__create_dom_div__.innerHTML = i, [].slice.call(e.__create_dom_div__.childNodes));
            };
            var i = '<div class="mui-poppicker"><div class="mui-poppicker-header"><button class="mui-btn mui-poppicker-btn-cancel">取消</button>	<button class="mui-btn mui-btn-blue mui-poppicker-btn-ok">确定</button><div class="mui-poppicker-clear"></div></div><div class="mui-poppicker-body"></div></div>',
                n = '<div class="mui-picker"><div class="mui-picker-inner"><div class="mui-pciker-rule mui-pciker-rule-ft"></div><ul class="mui-pciker-list"></ul><div class="mui-pciker-rule mui-pciker-rule-bg"></div></div></div>';
            e.PopPicker = e.Class.extend({ 
                init: function(n) {
                    var a = this;
                    a.options = n || {}, 
                    a.options.buttons = a.options.buttons || ["取消", "完成"], 
                    a.panel = e.dom(i)[0], 
                    t.body.appendChild(a.panel), 
                    a.ok = a.panel.querySelector(".mui-poppicker-btn-ok"), 
                    a.cancel = a.panel.querySelector(".mui-poppicker-btn-cancel"), 
                    a.body = a.panel.querySelector(".mui-poppicker-body"), 
                    a.mask = e.createMask(), 
                    a.cancel.innerText = a.options.buttons[0], 
                    a.ok.innerText = a.options.buttons[1], 
                    a.cancel.addEventListener("tap", function(e) { a.hide() }, !1), 
                    a.ok.addEventListener("tap", function(e) {
                        if (a.callback) {
                            var t = a.callback(a.getSelectedItems());
                            t !== !1 && a.hide() 
                        } }, !1); 
                    a.mask[0].addEventListener("tap", function() { a.hide() }, !1), 
                    a._createPicker(), 
                    a.panel.addEventListener(e.EVENT_START, function(e) { e.preventDefault() }, !1), 
                    a.panel.addEventListener(e.EVENT_MOVE, function(e) { e.preventDefault() }, !1); 
                }, 
                _createPicker: function() {
                    var t = this,
                        i = t.options.layer || 1,
                        a = 100 / i + "%";
                    t.pickers = [];
                    for (var r = 1; i >= r; r++) {
                        var s = e.dom(n)[0];
                        s.style.width = a; 
                        t.body.appendChild(s);
                        var c = e(s).picker();
                        t.pickers.push(c), 
                        s.addEventListener("change", function(e) {
                            // console.log(e);
                            var t = this.nextSibling;
                            if (t && t.picker) {
                                var i = e.detail || {},
                                n = i.item || {};
                                // console.log(n);
                                t.picker.setItems(n.children);
                            }; 
                        }, !1);
                     };
                }, 
                setData: function(e) {
                    var t = this;
                    e = e || [], t.pickers[0].setItems(e);
                }, 
                getSelectedItems: function() {
                    var e = this,
                        t = [];
                    for (var i in e.pickers) {
                        var n = e.pickers[i];
                        t.push(n.getSelectedItem() || {});
                    };
                    return t;
                }, 
                show: function(i) {
                    var n = this;
                        n.callback = i, n.mask.show(), 
                        t.body.classList.add(e.className("poppicker-active-for-page")), 
                        n.panel.classList.add(e.className("active")), 
                        n.__back = e.back, 
                    e.back = function() { n.hide(); }
                }, 
                hide: function() {
                    var i = this;
                    i.disposed || (i.panel.classList.remove(e.className("active")), 
                    i.mask.close(), t.body.classList.remove(e.className("poppicker-active-for-page")), 
                    e.back = i.__back) 
                }, 
                dispose: function() {
                    var e = this;
                    e.hide(), 
                    setTimeout(function() { 
                        e.panel.parentNode.removeChild(e.panel);
                        for (var t in e) e[t] = null, delete e[t];
                        e.disposed = !0 
                    }, 300);
                } 
            });
        }(mui, document),
    function(e, t) { 
        e.dom = function(i) {
            return "string" != typeof i ? i instanceof Array || i[0] && i.length ? [].slice.call(i) : [i] : (e.__create_dom_div__ || (e.__create_dom_div__ = t.createElement("div")), e.__create_dom_div__.innerHTML = i, [].slice.call(e.__create_dom_div__.childNodes)) };
            var i = '<div class="mui-dtpicker" data-type="datetime"><div class="mui-dtpicker-header"><button data-id="btn-cancel" class="mui-btn">取消</button>	<div class="switch"><span class="active" data-id="cal">阳历</span><span data-id="lun">农历</span></div><button data-id="btn-ok" class="mui-btn mui-btn-blue">完成</button></div>	<div class="mui-dtpicker-title"><h5 data-id="title-y">骞�</h5><h5 data-id="title-m">鏈�</h5><h5 data-id="title-d">鏃�</h5><h5 data-id="title-h">鏃�</h5><h5 data-id="title-i">鍒�</h5></div>		<div class="mui-dtpicker-body"><div data-id="picker-y" class="mui-picker"><div class="mui-picker-inner"><div class="mui-pciker-rule mui-pciker-rule-ft"></div><ul class="mui-pciker-list"></ul><div class="mui-pciker-rule mui-pciker-rule-bg"></div></div></div><div data-id="picker-m" class="mui-picker"><div class="mui-picker-inner"><div class="mui-pciker-rule mui-pciker-rule-ft"></div><ul class="mui-pciker-list">					</ul>					<div class="mui-pciker-rule mui-pciker-rule-bg"></div></div></div><div data-id="picker-d" class="mui-picker"><div class="mui-picker-inner"><div class="mui-pciker-rule mui-pciker-rule-ft"></div><ul class="mui-pciker-list"></ul><div class="mui-pciker-rule mui-pciker-rule-bg"></div></div></div><div data-id="picker-h" class="mui-picker"><div class="mui-picker-inner"><div class="mui-pciker-rule mui-pciker-rule-ft"></div><ul class="mui-pciker-list"></ul><div class="mui-pciker-rule mui-pciker-rule-bg"></div></div></div><div data-id="picker-i" class="mui-picker"><div class="mui-picker-inner"><div class="mui-pciker-rule mui-pciker-rule-ft"></div><ul class="mui-pciker-list"></ul><div class="mui-pciker-rule mui-pciker-rule-bg"></div></div></div></div></div>';
            e.DtPicker = e.Class.extend({ init: function(n) {
                var a = this,
                    r = e.dom(i)[0];
                t.body.appendChild(r), e('[data-id*="picker"]', r).picker();
                var s = a.ui = { 
                    picker: r, 
                    mask: e.createMask(), 
                    ok: e('[data-id="btn-ok"]', r)[0], 
                    cancel: e('[data-id="btn-cancel"]', r)[0], 
                    cal: e('[data-id="cal"]', r)[0], 
                    lun: e('[data-id="lun"]', r)[0],
                    y: e('[data-id="picker-y"]', r)[0],
                    m: e('[data-id="picker-m"]', r)[0], 
                    d: e('[data-id="picker-d"]', r)[0], 
                    h: e('[data-id="picker-h"]', r)[0], 
                    i: e('[data-id="picker-i"]', r)[0], 
                    labels: e('[data-id*="title-"]', r) 
                };
                s.cancel.addEventListener("tap", function() { a.hide() }, !1),
                s.ok.addEventListener("tap", function() {
                    var e = a.callback(a.getSelected());
                    e !== !1 && a.hide();
                }, !1);
                 //公历按钮
                 s.cal.addEventListener("tap",function() {
                    isLUN = false;
                    // console.log(isLUN);
                    $(this).addClass('active').siblings('span').removeClass('active');
                    a._createMonth();
                 }), 
                 //农历按钮
                 s.lun.addEventListener("tap",function() {
                    isLUN = true;
                    $(this).addClass('active').siblings('span').removeClass('active');
                    a._selYearIsHasLun();
                    a._createMonth();
                 }), 
                 s.y.addEventListener("change", function(e) { 
                    if(isLUN){
                        a._selYearIsHasLun();
                        a._createMonth();
                    }else{
                        a.options.beginMonth || a.options.endMonth ? a._createMonth() : a._createDay();
                    }

                },!1), 
                 s.m.addEventListener("change", function(e) { 
                        a._createDay(); 
                 }, !1), 
                 s.d.addEventListener("change", function(e) {
                     (a.options.beginMonth || a.options.endMonth) && a._createHours() }, !1), 
                 s.h.addEventListener("change", function(e) {
                     (a.options.beginMonth || a.options.endMonth) && a._createMinutes() }, !1), 
                 s.mask[0].addEventListener("tap", function() { a.hide() }, !1), a._create(n), 
                 a.ui.picker.addEventListener(e.EVENT_START, function(e) { e.preventDefault() }, !1), 
                 a.ui.picker.addEventListener(e.EVENT_MOVE, function(e) { e.preventDefault() }, !1) }, 
             getSelected: function() {
                 var e = this,
                     t = e.ui,
                     i = e.options.type,
                 n = { type: i, 
                       y: t.y.picker.getSelectedItem(), 
                       m: t.m.picker.getSelectedItem(), 
                       d: t.d.picker.getSelectedItem(), 
                       h: t.h.picker.getSelectedItem(), 
                       i: t.i.picker.getSelectedItem(), 
                       toString: function() {
                         return this.value } };
                 switch (i) {
                     case "datetime":
                         n.value = n.y.value + "-" + n.m.value + "-" + n.d.value + " " + n.h.value + ":" + n.i.value, n.text = n.y.text + "-" + n.m.text + "-" + n.d.text + " " + n.h.text + ":" + n.i.text;
                         break;
                     case "date":
                            n.value = n.y.value + "" + n.m.value + "" + n.d.value, n.text = n.y.text + "" + n.m.text + "" + n.d.text;
                         break;
                     case "time":
                         n.value = n.h.value + ":" + n.i.value, n.text = n.h.text + ":" + n.i.text;
                         break;
                     case "month":
                         n.value = n.y.value + "-" + n.m.value, n.text = n.y.text + "-" + n.m.text;
                         break;
                     case "hour":
                         n.value = n.y.value + "-" + n.m.value + "-" + n.d.value + " " + n.h.value, n.text = n.y.text + "-" + n.m.text + "-" + n.d.text + " " + n.h.text }
                 return n 
             }, 
            setSelectedValue: function(e) {
                var t = this, 
                     i = t.ui,
                     n = t._parseValue(e);//选中的日期
                i.y.picker.setSelectedValue(n.y, 0, function() { 
                    i.m.picker.setSelectedValue(n.m, 0, function() { 
                        i.d.picker.setSelectedValue(n.d, 0, function() { 
                            i.h.picker.setSelectedValue(n.h, 0, function() { 
                                i.i.picker.setSelectedValue(n.i, 0) }) }) }) }) 
            }, 
            isLeapYear: function(e) {
                return e % 4 == 0 && e % 100 != 0 || e % 400 == 0 
            },
            _inArray: function(e, t) {//判断月份在不在数组里边，  e => 年，t => 月
                 for (var i in e) {
                     var n = e[i];
                     if (n === t) return !0 
                 }
                 return !1 
            }, 
            _selYearIsHasLun: function(){//选中的年份 是否有闰月
                var i = this;
                var selY = parseInt(this.ui.y.picker.getSelectedValue());
                // console.log('选中的年份：' + selY);
                leapMonth = calendar.leapMonth(selY);//返回闰月
                // console.log('闰月：' + leapMonth);
                leapMonthDay = calendar.leapDays(selY);//返回闰月天数
                // console.log('闰月天数：' + leapMonthDay);
                if(leapMonth){
                    isHasLeapMonth = true;
                    return leapMonth;
                }else{
                    isHasLeapMonth = false;
                    return !1;
                }
            },
            getDayNum: function(e, t) {//判断每个月天数,  e => 年，t => 月
                var i = this;
                return i._inArray([1, 3, 5, 7, 8, 10, 12], t) ? 31 : i._inArray([4, 6, 9, 11], t) ? 30 : i.isLeapYear(e) ? 29 : 28 },
                _fill: function(e) {
                // (e = 0 + e)
                return e = e.toString(), e.length < 2 && (e = e), e }, 
                _isBeginYear: function() {
                return this.options.beginYear === parseInt(this.ui.y.picker.getSelectedValue()) }, 
                _isBeginMonth: function() {
                return this.options.beginMonth && this._isBeginYear() && this.options.beginMonth === parseInt(this.ui.m.picker.getSelectedValue()) }, 
                _isBeginDay: function() {
                return this._isBeginMonth() && this.options.beginDay === parseInt(this.ui.d.picker.getSelectedValue()) }, 
                _isBeginHours: function() {
                return this._isBeginDay() && this.options.beginHours === parseInt(this.ui.h.picker.getSelectedValue()) },
                 _isEndYear: function() {
                return this.options.endYear === parseInt(this.ui.y.picker.getSelectedValue()) }, 
                _isEndMonth: function() {
                return this.options.endMonth && this._isEndYear() && this.options.endMonth === parseInt(this.ui.m.picker.getSelectedValue()) }, 
                _isEndDay: function() {
                return this._isEndMonth() && this.options.endDay === parseInt(this.ui.d.picker.getSelectedValue()) }, 
                _isEndHours: function() {
                return this._isEndDay() && this.options.endHours === parseInt(this.ui.h.picker.getSelectedValue()) }, 
                _createYear: function(e) {
                 var t = this,
                     i = t.options,
                     n = t.ui,
                     a = [];
                if (i.customData.y) a = i.customData.y;
                else
                //年
                for (var r = i.beginYear, s = i.endYear, c = r; s >= c; c++) a.push({ text: c + "年", value: c });
                 n.y.picker.setItems(a) },
            _createMonth: function(e) {
                 var t = this,
                     i = t.options,
                     n = t.ui,
                     a = [];
                     if(isLUN){
                        t._selYearIsHasLun();
                        (function(){
                            for(var monthIndex = 1; monthIndex <= 12; monthIndex++){
                                a.push({ text: calendar.toChinaMonth(monthIndex), value: monthIndex });
                            }
                            if(isHasLeapMonth){
                                a.splice(leapMonth, 0,{ text: '闰' + calendar.toChinaMonth(leapMonth), value: leapMonth + 100 });
                            }
                        })(); 
                        // console.log(a);
                     //var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
                     // if (i.customData.m) a = i.customData.m;
                     }else{
                        for (var r = i.beginMonth && t._isBeginYear() ? i.beginMonth : 1, s = i.endMonth && t._isEndYear() ? i.endMonth : 12; s >= r; r++) {
                             // console.log(r);
                             var c = t._fill(r);
                             // 月
                             a.push({ text: c + '月', value: r });
                         };
                         // console.log(a);
                    }
                    n.m.picker.setItems(a) 
            }, 
            _createDay: function(e) {
                var t = this,
                    i = t.options,
                    n = t.ui,
                    a = [];
                // if (i.customData.d) a = i.customData.d;
                if( isLUN ){
                    var currY = parseInt(this.ui.y.picker.getSelectedValue());
                    var currM = parseInt(this.ui.m.picker.getSelectedValue());
                    var dayLength;
                    // var cnDay = calendar.toChinaDay(21);
                    if( isHasLeapMonth && currM > 13){
                        dayLength = calendar.leapDays(currY);
                    }else{
                        dayLength = calendar.monthDays(currY,currM);
                    };
                    // console.log(dayLength);
                    (function(){
                        for(var r = 1; r <= dayLength; r++){
                            a.push({ text: calendar.toChinaDay(r), value: r });
                        }
                    })();
                }else{
                    for (var r = t._isBeginMonth() ? i.beginDay : 1, s = t._isEndMonth() ? i.endDay : t.getDayNum(parseInt(this.ui.y.picker.getSelectedValue()), parseInt(this.ui.m.picker.getSelectedValue())); s >= r; r++) {
                        // console.log(s);
                        var c = t._fill(r);
                     //日
                     a.push({ text: c + '日', value: c }) }

                }
                n.d.picker.setItems(a), 
                e = e || n.d.picker.getSelectedValue()
            },
            _createHours: function(e) {
                var t = this,
                     i = t.options,
                     n = t.ui,
                     a = [];
                if (i.customData.h) a = i.customData.h; 
                else
                 for (var r = t._isBeginDay() ? i.beginHours : 0, s = t._isEndDay() ? i.endHours : 23; s >= r; r++) {
                     var c = t._fill(r);
                     a.push({ text: c, value: c }) }
                n.h.picker.setItems(a) 
            }, 
            _createMinutes: function(e) {
                 var t = this,
                     i = t.options,
                     n = t.ui,
                     a = [];
                 if (i.customData.i) a = i.customData.i;
                 else
                    for (var r = t._isBeginHours() ? i.beginMinutes : 0, s = t._isEndHours() ? i.endMinutes : 59; s >= r; r++) {
                         var c = t._fill(r);
                         a.push({ text: c, value: c }) 
                    }
                 n.i.picker.setItems(a);
            }, 
            _setLabels: function() {//顶部年月日时分标签
                 var e = this,
                     t = e.options,
                     i = e.ui;
                i.labels.each(function(e, i) { i.innerText = t.labels[e] });
            }, 
            _setButtons: function() {
                 var e = this,
                     t = e.options,
                     i = e.ui;
                i.cancel.innerText = t.buttons[0], 
                i.ok.innerText = t.buttons[1] }, 
            _parseValue: function(e) {
                var t = {};
                if (e) {
                     var i = e.replace(":", "-").replace(" ", "-").split("-");
                     t.y = i[0], 
                     t.m = i[1], 
                     t.d = i[2], 
                     t.h = i[3], 
                     t.i = i[4] 
                 } else {
                     var n = new Date;
                     t.y = n.getFullYear(), 
                     t.m = n.getMonth() + 1, 
                     t.d = n.getDate(), 
                     t.h = n.getHours(), 
                     t.i = n.getMinutes() }
                 return t 
            }, 
            _create: function(e) {
                 var t = this;
                 e = e || {}, 
                 e.labels = e.labels || ["年", "月", "日", "时", "分"], 
                 e.buttons = e.buttons || ["取消", "完成"], 
                 e.type = e.type || "datetime", 
                 e.customData = e.customData || {}, 
                 t.options = e;
                 var i = new Date,
                     n = e.beginDate;
                 n instanceof Date && !isNaN(n.valueOf()) && (e.beginYear = n.getFullYear(), 
                    e.beginMonth = n.getMonth() + 1, e.beginDay = n.getDate(), e.beginHours = n.getHours(), 
                    e.beginMinutes = n.getMinutes());
                 var a = e.endDate;
                 a instanceof Date && !isNaN(a.valueOf()) && (e.endYear = a.getFullYear(), 
                    e.endMonth = a.getMonth() + 1, e.endDay = a.getDate(), 
                    e.endHours = a.getHours(), 
                    e.endMinutes = a.getMinutes()), 
                    e.beginYear = e.beginYear || i.getFullYear() - 5, 
                    e.endYear = e.endYear || i.getFullYear() + 5;
                 var r = t.ui;
                 t._setLabels(), 
                 t._setButtons(), 
                 r.picker.setAttribute("data-type", e.type), 
                 t._createYear(), 
                 t._createMonth(), 
                 t._createDay(), 
                 t._createHours(), 
                 t._createMinutes(), 
                 t.setSelectedValue(e.value) 
            }, 
            show: function(i) {
                 var n = this,
                     a = n.ui;
                 n.callback = i || e.noop, 
                 a.mask.show(), 
                 t.body.classList.add(e.className("dtpicker-active-for-page")), 
                 a.picker.classList.add(e.className("active")), 
                 n.__back = e.back, 
                 e.back = function() { n.hide() } 
            }, 
            hide: function() {
                 var i = this;
                 if (!i.disposed) {
                     var n = i.ui;
                     n.picker.classList.remove(e.className("active")), 
                     n.mask.close(), 
                     t.body.classList.remove(e.className("dtpicker-active-for-page")), 
                     e.back = i.__back } }, 
                     dispose: function() {
                 var e = this;
                 e.hide(), 
                 setTimeout(function() { e.ui.picker.parentNode.removeChild(e.ui.picker);
                     for (var t in e) e[t] = null, delete e[t];
                     e.disposed = !0 
                 }, 300);
                  
            } 
        });
}(mui, document);
