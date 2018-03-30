riot.tag("weather", '<div class="w-header"> <span class="y-icon icon-location" onclick="{changeLocation}" ga_event="mh_change_city">&nbsp;{options.city}</span> <span class="wind">{options.wind}</span> <span class="air" riot-style="background: {options.level}">{options.air}</span> </div> <ul class="y-box days-weather {show: options.weather_show}"> <li class="y-left day"> <span class="title">今天</span> <div title="{options.weather.current_condition}" class="weather-icon weather-icon-{options.weather.weather_icon_id}"></div> <span class="temperature"> <em>{options.weather.low_temperature}</em>&#176; &#47; <em>{options.weather.high_temperature}</em>&#176; </span> </li> <li class="y-left day"> <span class="title">明天</span> <div title="{options.weather.tomorrow_condition}" class="weather-icon weather-icon-{options.weather.tomorrow_weather_icon_id}"></div> <span class="temperature"> <em>{options.weather.tomorrow_low_temperature}</em>&#176; &#47; <em>{options.weather.tomorrow_high_temperature}</em>&#176; </span> </li> <li class="y-left day"> <span class="title">后天</span> <div title="{options.weather.dat_condition}" class="weather-icon weather-icon-{options.weather.dat_weather_icon_id}"></div> <span class="temperature"> <em>{options.weather.dat_low_temperature}</em>&#176; &#47; <em>{options.weather.dat_high_temperature}</em>&#176; </span> </li> </ul> <div class="y-box city-select {show: !options.weather_show}"> <div class="y-box"> <div class="y-left select-style"> <p class="y-box"> <span class="y-left name">{options.current_province}</span> <span class="y-right y-icon icon-more" onclick="{showProvinces}"></span> </p> <div class="y-box province-list {show: options.province_show}"> <a class="y-left item" href="javascript:;" each="{item, i in options.locations}" onclick="{changeProvince}"> {item} </a> </div> </div> <div class="y-right select-style"> <p class="y-box"> <span class="y-left name">{options.current_city}</span> <span class="y-right y-icon icon-more" onclick="{showCities}"></span> </p> <div class="y-box city-list {show: options.city_show}"> <a class="y-left item" href="javascript:;" each="{item, i in options.cities}" onclick="{changeCity}"> {item} </a> </div> </div> </div> <div class="y-box action"> <a href="javascript:;" class="y-left ok-btn" onclick="{onSubmitClick}">确定</a> <a href="javascript:;" class="y-right cancel-btn" onclick="{onCancelClick}">取消</a> </div> </div>', 'class="y-weather"', function() {
    function t(t) {
        var i = !0;
        return t >= 0 && 50 >= t ? {
            c: i ? "#5cbf4c" : "#5c8828",
            t: "优"
        } : t >= 51 && 100 >= t ? {
            c: i ? "#5cbf4c" : "#5c8828",
            t: "良"
        } : t >= 101 && 150 >= t ? {
            c: i ? "#ff9f2d" : "#c58120",
            t: "轻度污染"
        } : t >= 151 && 200 >= t ? {
            c: i ? "#ff9f2d" : "#c58120",
            t: "中度污染"
        } : t >= 201 && 300 >= t ? {
            c: i ? "#ff5f5f" : "#cf3d3d",
            t: "重度污染"
        } : t >= 301 ? {
            c: i ? "#ff5f5f" : "#cf3d3d",
            t: "严重污染"
        } : {
            c: "rgba( 214, 117, 3, 0.8 )",
            t: "其他"
        }
    }
    this.options = {
        current_province: "北京",
        current_city: "北京",
        province_show: !1,
        city_show: !1,
        weather_show: !0
    },
        riot.observable(this),
        this.on("weatherChange", function(t) {
            this._renderWeather(t)
        }),
        this.init = function() {
            this._getCities()
        }
            .bind(this),
        this.showProvinces = function() {
            this.options.city_show = !1,
                this.options.province_show = !this.options.province_show
        }
            .bind(this),
        this.showCities = function() {
            this.options.province_show = !1,
                this.options.city_show = !this.options.city_show
        }
            .bind(this),
        this.changeLocation = function() {
            this.options.weather_show = !1
        }
            .bind(this),
        this.changeProvince = function(t) {
            this.options.city_show = !1,
                this.options.province_show = !1,
                this.options.current_province = t.item.item,
                this._renderCities(t.item.item)
        }
            .bind(this),
        this.changeCity = function(t) {
            this.options.city_show = !1,
                this.options.province_show = !1,
                this.options.current_city = t.item.item
        }
            .bind(this),
        this.onSubmitClick = function() {
            var t = this;
            this.options.weather_show = !0,
                this._getWeather({
                    city: t.options.current_city
                })
        }
            .bind(this),
        this.onCancelClick = function() {
            this.options.weather_show = !0
        }
            .bind(this),
        this._getWeather = function(t) {
            var i = this;
            http({
                url: "/stream/widget/local_weather/data/",
                method: "GET",
                data: t,
                success: function(t) {
                    t = t || {},
                    "success" === t.message && (i._renderWeather(t.data.weather),
                        Cookies.set("WEATHER_CITY", t.data.city, {
                            expires: 100
                        }),
                    i.parent && i.parent.trigger("weatherChange", t.data.weather))
                }
            })
        }
            .bind(this),
        this._renderWeather = function(i) {
            this.options.weather = i,
                this.options.city = i.city_name,
                this.options.wind = i.wind_direction + i.wind_level + "级",
                this.options.air = i.quality_level + " " + i.aqi,
                this.options.level = t(i.aqi).c,
                this.update()
        }
            .bind(this),
        this._getCities = function() {
            var t = this;
            http({
                url: "/stream/widget/local_weather/city/",
                method: "GET",
                success: function(i) {
                    i = i || {},
                    "success" === i.message && (t.options.locations = i.data,
                        t._renderCities(t.options.current_province))
                }
            })
        }
            .bind(this),
        this._renderCities = function(t) {
            this.options.cities = this.options.locations[t];
            for (var i in this.options.cities) {
                this.options.current_city = i;
                break
            }
            this.update()
        }
            .bind(this),
        this.on("mount", function() {
            this.init()
        })
}),
riot.tag("nav", '<div class="nav"> <ul class="y-box nav-list" ga_event="mh_channel"> <li each="{options.navItem}" class="y-left nav-item"> <a class="nav-link {active: location.pathname == url}" href="{url}" target="_blank" ga_event="mh_channel_{en}">{name}</a> </li> <li class="y-left nav-item nav-more"> <a class="nav-link" href="javascript:;"> 更多<i class="y-icon icon-more"></i> </a> <div class="nav-layer"> <ul class="nav-more-list"> <li each="{options.navMore}" class="nav-more-item"> <a href="{url}" target="_blank" ga_event="mh_channel_{en}">{name}</a> </li> </ul> </div> </li> </ul> </div>', function() {
    this.options = {
        navItem: [{
            name: "推荐",
            url: "/",
            en: "recommend"
        }, {
            name: "热点",
            url: "/ch/news_hot/",
            en: "hot"
        }, {
            name: "视频",
            url: "/ch/video/",
            en: "video"
        }, {
            name: "图片",
            url: "/ch/news_image/",
            en: "image"
        }, {
            name: "段子",
            url: "/ch/essay_joke/",
            en: "essay"
        }, {
            name: "娱乐",
            url: "/ch/news_entertainment/",
            en: "entertainment"
        }, {
            name: "科技",
            url: "/ch/news_tech/",
            en: "tech"
        }, {
            name: "汽车",
            url: "/ch/news_car/",
            en: "car"
        }, {
            name: "体育",
            url: "/ch/news_sports/",
            en: "sports"
        }, {
            name: "财经",
            url: "/ch/news_finance/",
            en: "finance"
        }, {
            name: "军事",
            url: "/ch/news_military/",
            en: "military"
        }, {
            name: "国际",
            url: "/ch/news_world/",
            en: "world"
        }, {
            name: "时尚",
            url: "/ch/news_fashion/",
            en: "fashion"
        }, {
            name: "旅游",
            url: "/ch/news_travel/",
            en: "travel"
        }],
        navMore: [{
            name: "探索",
            url: "/ch/news_discovery/",
            en: "discovery"
        }, {
            name: "育儿",
            url: "/ch/news_baby/",
            en: "baby"
        }, {
            name: "养生",
            url: "/ch/news_regimen/",
            en: "regimen"
        }, {
            name: "美文",
            url: "/ch/news_essay/",
            en: "essay"
        }, {
            name: "游戏",
            url: "/ch/news_game/",
            en: "game"
        }, {
            name: "历史",
            url: "/ch/news_history/",
            en: "history"
        }, {
            name: "美食",
            url: "/ch/news_food/",
            en: "food"
        }]
    }
}),
riot.tag("wsearch", '<div name="searchBox" class="wsearch"> <form name="searchForm" action="/search/" method="get" target="_blank" onsubmit="{onSearchClick}"> <div name="inputbox" class="y-box input-group"> <input class="y-left input-text" name="keyword" value="{options.keyword}" autocomplete="off" ga_event="mh_search" type="text" placeholder="请输入关键字" onkeyup="{onKeyup}" onfocus="{onFocus}" onblur="{onBlur}"> <div class="y-right btn-submit"> <button type="submit" href="javascript:;"> <i class="y-icon icon-search" ga_event="mh_search"></i> </button> </div> </div> </form> <div class="layer {layer-show: options.layershow}" if="{options.suggestList.length > 0}"> <ul ga_event="mh_search"> <li each="{item, i in options.suggestList}" class="search-item" onclick="{onSearchItemClick}"> <a href="javascript:;"> <i if="{options.isHotwords}" class="search-no search-no-{i+1}">{i + 1}</i> <i if="{!options.isHotwords}" class="search-sug"></i> <span class="search-txt">{item}</span> </a> </li> </ul> </div> </div>', function(t) {
    function i(t) {
        (t >= 65 && 90 >= t || t >= 48 && 57 >= t || t >= 96 && 111 >= t || t >= 186 && 222 >= t || 8 == t || 46 == t || 32 == t || 13 == t) && (clearTimeout(n),
            n = setTimeout(function() {
                n = null,
                    e(),
                    s.update()
            }, 200)),
            s.update()
    }
    function e() {
        var t = s.keyword.value;
        "" != t.trim() && http({
            url: "/search/sug/",
            data: {
                keyword: t
            },
            method: "get",
            success: function(t) {
                "success" == t.message ? (s.options.suggestList = t.data,
                    s.options.layershow = !0) : s.options.suggestList = [],
                    s.options.isHotwords = !1,
                    s.update()
            }
        })
    }
    var s = this
        , o = [];
    this.options = {
        suggestList: [],
        keyword: "",
        searchTip: "大家都在搜：",
        layershow: !1,
        isHotwords: !1
    },
        this.on("mount", function() {
            this.init()
        }),
        this.init = function() {
            !t.noHot && this._getHotWords()
        }
            .bind(this),
        this._getHotWords = function() {
            http({
                url: "/hot_words/",
                method: "GET",
                success: function(t) {
                    t = t.hot_words || t || [],
                    _.isArray(t) && 0 !== t.length && (s.options.suggestList = o = t,
                        s.options.isHotwords = !0,
                        s.options.keyword = s.options.searchTip + t[0],
                        s.update())
                }
            })
        }
            .bind(this),
        this.onKeyup = function(t) {
            "" == this.keyword.value.trim() ? (this.options.isHotwords = !0,
                this.options.suggestList = o) : i(t.keyCode)
        }
            .bind(this),
        this.onFocus = function() {
            this.inputbox.style["border-color"] = "#ed4040",
                this.options.keyword = "",
                this.options.layershow = !0
        }
            .bind(this),
        this.onBlur = function() {
            this.inputbox.style["border-color"] = "#e8e8e8",
                this.options.layershow = !1
        }
            .bind(this),
        this.onSearchClick = function() {
            var t, i = this.keyword.value;
            return i ? (t = i.slice(0, 6),
                t !== this.options.searchTip || (this.options.keyword = i.slice(6),
                    this.options.keyword) ? !0 : (this.keyword.focus(),
                    !1)) : (this.keyword.focus(),
                !1)
        }
            .bind(this),
        this.onSearchItemClick = function(t) {
            this.options.keyword = t.item.item,
                this.update(),
                this.searchForm.submit()
        }
            .bind(this);
    var n = null
}),
    riot.tag("wtopbar", '<div class="y-box wtopbar"> <ul class="y-left" if="{opts.home}"> <li class="tb-item"> <a class="tb-link" href="http://app.toutiao.com/news_article/" target="_blank" ga_event="mh_nav_others">下载APP</a> </li> <li class="tb-item weather" if="{opts.home}"> <a class="tb-link" href="javascript:;"> <span>&nbsp;{ options.city }</span> <span class="city_state">{ options.state }</span> <span class="city_temperature"> <em>{options.low}</em>&#176; &nbsp;&#47;&nbsp; <em>{options.top}</em>&#176; </span> <i class="y-icon icon-more"></i> </a> <div class="weather-box"> <div riot-tag="weather"></div> </div> </li> </ul> <div class="y-left y-nav-topbar" riot-tag="nav" if="{!opts.home}"></div> <ul class="y-right"> <li class="tb-item userbox"> <div riot-tag="wuserbox" userinfo="{opts.userInfo}" abtype="{opts.abType}" pageid="{opts.pageId}"></div> </li> <li class="tb-item"> <a onclick="{feedbackClick}" class="tb-link" href="javascript:void(0)">反馈</a> </li> <li class="tb-item"> <a class="tb-link" href="https://mp.toutiao.com/profile_introduction/infringement/complain" ga_event="mh_nav_complain" target="_blank">投诉侵权</a> </li> <li class="tb-item more"> <a class="tb-link" href="/about/">头条产品</a> <div class="layer"> <ul> <li> <a href="https://www.wukong.com" class="layer-item" ga_event="mh_nav_others" target="_blank">问答</a> </li> <li> <a href="https://mp.toutiao.com/" class="layer-item" target="_blank" ga_event="mh_nav_others">头条号</a> </li> <li> <a href="https://tuchong.com/" class="layer-item" target="_blank" ga_event="mh_nav_others">图虫</a> </li> <li> <a href="https://stock.tuchong.com/?source=ttweb" target="_blank" ga_event="mh_nav_others" class="layer-item">正版图库</a> </li> <li> <a href="https://ad.toutiao.com/promotion/?source2=pchometop" class="layer-item" target="_blank" ga_event="mh_nav_ad">广告投放</a> </li> </ul> </div> </li> </ul> <div id="J_userFeedback"></div> </div>', function(t) {
        this.options = {
            city: "",
            state: "",
            top: 0,
            low: 0,
            userInfo: t.userInfo
        };
        var i = this.tags.weather;
        this.tags.userFeedback,
            this.init = function() {
                if (this.opts.home) {
                    var t = Cookies.get("WEATHER_CITY") || "";
                    this._getWeather({
                        city: t
                    })
                }
            }
                .bind(this),
            this._getWeather = function(t) {
                var e = this;
                http({
                    url: "/stream/widget/local_weather/data/",
                    method: "GET",
                    data: t,
                    success: function(t) {
                        t = t || {},
                        "success" === t.message && (e._renderWeather(t.data.weather),
                        i && i.trigger("weatherChange", t.data.weather))
                    }
                })
            }
                .bind(this),
            this._renderWeather = function(t) {
                this.options.weather = t,
                    this.options.city = t.city_name,
                    this.options.state = t.current_condition,
                    this.options.top = t.high_temperature,
                    this.options.low = t.low_temperature,
                    this.update()
            }
                .bind(this),
            this.init(),
            this.on("weatherChange", function(t) {
                this._renderWeather(t)
            }),
            this.on("mount", function() {
                var t = utils.getHashValue("#userFeedback");
                1 == t && riot.mount(".wtopbar #J_userFeedback", "userFeedback", {})
            }),
            this.feedbackClick = function() {
                riot.mount(".wtopbar #J_userFeedback", "userFeedback", {})
            }
                .bind(this)
    }),
    riot.tag("wuserbox", '<div class="y-box wuserbox"> <a if="{options.id && options.isPgc}" class="y-left new-article" href="http://mp.toutiao.com/new_article/" ga_event="mh_write">发文</a> <div if="{options.id}" class="y-right username"> <a ga_event="mh_nav_user" class="user-head" href="//www.toutiao.com/c/user/{options.id}/" target="_blank" rel="nofollow"> <div class="user-image"> <img onload="this.style.opacity=1;" riot-src="{options.avatarUrl}"> </div> <span>{options.name}</span> </a> <div class="user-layer"> <ul ga_event="mh_nav_user"> <li><a href="//www.toutiao.com/c/user/{options.id}/?tab=favourite" class="layer-item" target="_blank" rel="nofollow">我的收藏</a></li> <li><a href="//www.toutiao.com/c/user/relation/{options.id}/?tab=following" class="layer-item" target="_blank" rel="nofollow">我的关注</a></li> <li><a href="//www.toutiao.com/c/user/relation/{options.id}/?tab=followed" class="layer-item" target="_blank" rel="nofollow">我的粉丝</a></li> <li> <a href="https://sso.toutiao.com/logout/" class="layer-item" rel="nofollow">退出</a> </li> </ul> </div> </div> <div if="{!options.id}" class="nav-login"> <a ga_event="nav_login" href="javascript:;" onclick="{onLoginClick}"> <span>登录</span> </a> <div if="{options.alertMsg}" class="y-box login-layer"> <div class="y-left login-alert-icon"></div> <div class="y-right"> <p>手机号登录上线啦！！！</p> <p>登录同步头条App阅读兴趣，推荐更精准！</p> </div> <span onclick="{msgCloseClick}"> <i class="y-icon icon-dislikenewfeed"></i> </span> </div> </div> </div>', function(t) {
        var i = this;
        t.pageid,
            t.abtype,
            this.options = {
                id: t.userinfo.id,
                name: t.userinfo.name,
                avatarUrl: t.userinfo.avatarUrl,
                isPgc: t.userinfo.isPgc || !1,
                alertMsg: !1
            },
            this.onLoginClick = function() {
                window.location.href = "https://sso.toutiao.com/login/"
            }
                .bind(this),
            window.on("userChange", function(t) {
                t && (i.options.id = t.user_id,
                    i.options.name = t.name,
                    i.options.avatarUrl = t.avatar_url,
                    i._isPgc(),
                    i.update())
            }),
            this._isPgc = function() {
                var t = this;
                http({
                    url: "/user/pgc_info/",
                    method: "get",
                    cache: !1,
                    success: function(i) {
                        i = i || {},
                        "success" === i.message && i.data.is_pgc_author && (t.options.isPgc = !0,
                            t.update())
                    }
                })
            }
                .bind(this)
    }),
    riot.tag("login", '<div class="login-dialog {hide: options.hide}"> <a class="btn" href="javascript:;" onclick="{hide}"> <i class="icon icon-close"></i> </a> <div class="login-dialog-header"> <h3>邮箱登录</h3> </div> <div class="login-dialog-inner" data-node="inner"> <div class="login-pannel bottom-line"> <form action="/auth/login/" method="POST" onsubmit="{onFormSubmit}"> <ul> <li> <div class="input-group"> <div class="input"> <label>邮箱</label> <input class="name" name="name_or_email" type="text" placeholder="请使用您的注册邮箱" autocomplete="off" spellcheck="false"> </div> </div> </li> <li> <div class="input-group"> <div class="input"> <label>密码</label> <input class="password" name="password" type="password" data-node="password" placeholder="密码" autocomplete="off" spellcheck="false"> </div> </div> </li> <li class="captcha-box {show: options.captchaImg}"> <div class="input-group"> <div class="input"> <input class="password" name="captcha" type="text" data-node="captcha" placeholder="验证码" autocomplete="off" spellcheck="false"> <img name="captchaImg" riot-src="{options.captchaImg}"> </div> </div> </li> <li> <div class="input-group"> <input type="checkbox" name="remember_me" checked="" style="vertical-align:top"> <label for="remember_me" class="label">记住账号</label> </div> </li> <li> <div class="input-group" style="text-align: center;"> <input type="submit" class="submit-btn" value="登录"> <p class="{error: options.errorMsg}">{options.errorMsg}</p> </div> </li> </ul> </form> </div> <div class="login-dialog-header"> <h3>合作网站帐号登录</h3> </div> <div class=""> <ul class="y-box sns_login_list" onclick="{onSnsLoginClick}"> <li class="sinaweibo"> <a href="javascript:;" data-pid="sina_weibo" ga_event="login_sina_weibo"> <i class="icon"></i> 新浪微博 </a> </li> <li class="qqweibo"> <a href="javascript:;" data-pid="qq_weibo" ga_event="login_tencnet_weibo"> <i class="icon"></i> 腾讯微博 </a> </li> <li class="qzone"> <a href="javascript:;" data-pid="qzone_sns" ga_event="login_qqzone"> <i class="icon"></i> QQ空间 </a> </li> <li class="renren"> <a href="javascript:;" data-pid="renren_sns" ga_event="login_renren"> <i class="icon"></i> 人人网 </a> </li> <li class="weixin"> <a href="javascript:;" style="margin-right:0;" data-pid="weixin" ga_event="login_wechat"> <i class="icon"></i> 微信 </a> </li> </ul> </div> </div> </div> <div class="mask {hide: options.hide}"></div>', function(t) {
        var i = this;
        riot.observable(this),
            this.options = {
                hide: !0,
                errorMsg: "",
                captchaImg: ""
            },
            this.curSpec = {
                successCb: t.successCb || function() {}
                ,
                errorCb: t.errorCb || function() {}
            },
            this.hide = function() {
                this.options.hide = !0,
                    this.update()
            }
                .bind(this),
            this.onFormSubmit = function(t) {
                t.preventDefault();
                var i = this
                    , e = http.serialize(t.currentTarget);
                user.loginByLoc({
                    data: e,
                    successCb: function(t) {
                        "function" == typeof i.curSpec.successCb && i.curSpec.successCb(t),
                            i.hide()
                    },
                    errorCb: function(t) {
                        i.password.value = "",
                            t = t || {};
                        var e = t.data || {};
                        i.options.errorMsg = e.description || "登录失败",
                            e.captcha ? (i.captcha.value = "",
                                i.options.captchaImg = "data:image/gif;base64," + e.captcha) : (i.captcha.value = "",
                                i.options.captchaImg = ""),
                        "function" == typeof i.curSpec.errorCb && i.curSpec.errorCb(t),
                            i.update()
                    }
                })
            }
                .bind(this),
            this.onSnsLoginClick = function(t) {
                var i = utils.getTarget(t)
                    , e = utils.getAttribute(i, "data-pid") || utils.getAttribute(i.parentNode, "data-pid");
                this.hide(),
                    user.loginByOther(e, this.curSpec)
            }
                .bind(this),
            window.on("login", function(t) {
                i.options.hide = !1,
                    t = t || {},
                    i.curSpec = {
                        successCb: t.successCb || function() {}
                        ,
                        errorCb: t.errorCb || function() {}
                    },
                    i.update()
            })
    }),
    riot.tag("userFeedback", '<div class="feedback_dialog"> <div class="dialog-header"> <h3>意见反馈</h3> </div> <div class="dialog-inner"> <div class="feedback_panel"> <form onsubmit="{onFormSubmit}"> <p class="label">联系方式（必填）</p> <div class="input-group"> <input class="email" placeholder="您的邮箱/QQ号" type="text" name="feedback-email"> </div> <p class="label">您的意见（必填）</p> <div class="input-group"> <textarea style="height:100px;" name="feedback-content" class="content" maxlength="140" placeholder="请填写您的意见，不超过140字"></textarea> </div> <div class="input-group"> <input type="submit" class="{submit-btn:true,disabled:disabled}" value="提交" __disabled="{disabled}"> <span class="error">{msg}</span> <a class="close" href="javascript:void(0);" onclick="{hide}">[关闭]</a> </div> </form> </div> </div> </div>', 'class="userFeedback"', function() {
        this.message = {
            success: "已提交,感谢您的意见",
            fail: "提交错误,请稍后重试",
            mail_error: "请输入正确的联系方式",
            content_error: "请输入您的意见",
            content_length_error: "意见长度超出限制"
        };
        var t = this;
        this.msg = "",
            this.disabled = !1,
            this.showMessage = function(t) {
                this.msg = this.message[t],
                    this.update()
            }
                .bind(this),
            this.hide = function() {
                this.unmount(!0)
            }
                .bind(this),
            this.onFormSubmit = function() {
                var i = this["feedback-email"]
                    , e = this["feedback-content"];
                return i.value.length < 5 ? (i.focus(),
                    this.showMessage("mail_error")) : "" === e.value ? (e.focus(),
                    this.showMessage("content_error")) : (this.msg = "",
                    this.disabled = !0,
                    this.update(),
                    void http({
                        headers: {
                            "X-CSRFToken": Cookies.get("csrftoken")
                        },
                        url: "/post_message/",
                        method: "post",
                        data: {
                            appkey: "web",
                            uuid: i.value,
                            content: "[" + window.location.host + "]" + e.value
                        },
                        success: function(s) {
                            return "success" !== s.message ? t.showMessage("fail") : (i.value = "",
                                e.value = "",
                                t.disabled = !1,
                                t.showMessage("success"),
                                void setTimeout(function() {
                                    t.hide()
                                }, 1e3))
                        },
                        error: function() {
                            t.disabled = !1,
                                t.update(),
                                t.showMessage("fail")
                        }
                    }))
            }
                .bind(this)
    }),
    riot.tag("toast", '<div name="toast" class="toast-inner" style="opacity: 10; filter:alpha(opacity=1000);"> <span>{opts.msg}</span> </div>', 'class="toast"', function() {
        var t = this;
        this.on("mount", function() {
            var i = this.toast
                , e = i.clientWidth
                , s = i.clientHeight
                , o = new TAnimation;
            i.style.cssText += "margin-top:-" + s / 2 + "px;margin-left:-" + e / 2 + "px",
                o.animate({
                    el: i,
                    prop: "opacity",
                    to: 0,
                    transitionDuration: 2e3
                }, function() {
                    t.unmount(!0)
                })
        })
    }),
    riot.tag("raw", "", function(t) {
        this.root.innerHTML = t.content
    }),
    !function(t) {
        var i = {};
        i.getHoney = function() {
            var t = Math.floor((new Date).getTime() / 1e3)
                , i = t.toString(16).toUpperCase()
                , e = md5(t).toString().toUpperCase();
            if (8 != i.length)
                return {
                    as: "479BB4B7254C150",
                    cp: "7E0AC8874BB0985"
                };
            for (var s = e.slice(0, 5), o = e.slice(-5), n = "", a = 0; 5 > a; a++)
                n += s[a] + i[a];
            for (var l = "", r = 0; 5 > r; r++)
                l += i[r + 3] + o[r];
            return {
                as: "A1" + n + i.slice(-3),
                cp: i.slice(0, 3) + l + "E1"
            }
        }
            ,
            t.ascp = i
    }(window, document),
    riot.tag("loading", '<div if="{options.cssAnimation}" class="loading ball-pulse"> <div></div> <div></div> <div></div> <span>{options.msg}&sdot;&sdot;&sdot;</span> </div> <div if="{!options.cssAnimation}" class="loading loading-normal"> <img src="//s3b.pstatp.com/toutiao/resource/toutiao_web/static/style/image/loading_50c5e3e.gif" alt=""> <span>{options.msg}&sdot;&sdot;&sdot;</span> </div>', function(t) {
        var i = utils.cssAnimationSupport();
        this.options = {
            cssAnimation: i,
            msg: t.msg || "推荐中"
        }
    }),
    riot.tag("media", '<ul class="media"> <li each="{item in opts.list}"> <dl class="media-list"> <dd class="avatar-wrap"> <a href="{item.open_url}" target="_blank" ga_event="{parent.opts.ga_event_click}"><img riot-src="{item.url}" alt=""></a> </dd> <dd> <a href="{item.open_url}" target="_blank" ga_event="{parent.opts.ga_event_click}"> <h3>{item.title} <i if="{item.user_verified}" class="y-icon dv"></i><em if="{item.is_pgc}" class="tth"></em></h3> </a> <a href="{item.open_url}" target="_blank" ga_event="{parent.opts.ga_event_click}"> <p>{item.des}</p> </a> <a href="{item.open_url}" target="_blank" ga_event="{parent.opts.ga_event_click}"> <p if="{item.cf_count>0}">共同好友@{item.cf_info}<span if="{item.cf_count>1}">等{item.cf_count}位</span></p> </a> </dd> <dd class="relation" if="{!item.is_self}"> <div ga_event="user_list_follow" riot-tag="attention" media_id="{item.media_id}" like="{item.is_following}" liked="{item.is_followed}" txt="关注" activetxt="已关注" friendedtxt="互相关注" from="{parent.opts.from}"></div> </dd> </dl> </li> </ul>', function() {}),
    riot.tag("number", '<em class="y-number"><i>{value}</i>{flag}{opts.unit}</em>', function(t) {
        var i = this
            , e = t.number
            , s = (t.all,
                t.unit,
                Math.pow(10, 9))
            , o = Math.pow(10, 8)
            , n = Math.pow(10, 7)
            , a = Math.pow(10, 5)
            , l = Math.pow(10, 4)
            , r = Math.pow(10, 3);
        return i.flag = "",
            i.value = "",
            t.all && "true" == t.all ? (i.flag = "",
                void (i.value = t.number)) : void (e - s >= 0 ? (i.flag = "亿",
                i.value = Math.floor(e / o)) : e - o >= 0 ? (i.flag = "亿",
                i.value = (Number(Math.floor(e / n) / 10).toFixed(1) + "").replace(/\.0$/, "")) : e - a > 0 ? (i.flag = "万",
                i.value = Math.floor(e / l)) : e - l >= 0 ? (i.flag = "万",
                i.value = (Number(Math.floor(e / r) / 10).toFixed(1) + "").replace(/\.0$/, "")) : i.value = t.number)
    }),
    riot.tag("yheader", '<a href="{opts.home_url}"><img class="bg-header" riot-src="{bg_img}" alt="头像"></a> <div> <a href="{opts.home_url}" ga_event="user_head_click"><img riot-src="{avtar_img}" alt="作者头像" class="avatar"></a> <ul> <li class="title"> <a href="{opts.home_url}" ga_event="user_head_click"> <span class="name">{opts.name}</span> <span class="y-icon dv" if="{opts.dv}"></span> <span class="tth" if="{opts.pgc_icon}"></span> </a> </li> <li class="des"><a href="{opts.home_url}" ga_event="user_head_click">{abstract}</a></li> </ul> <div if="{!opts.isSelf}" ga_event="user_head_follow" riot-tag="attention" media_id="{opts.media_id}" like="{opts.like}" liked="{opts.liked}" txt="关注" activetxt="已关注" friendedtxt="互相关注"></div> <span if="{opts.isSelf && opts.ugcUser && opts.supportPublish}" ga_event="user_ugc_publish" class="btn-publish {hangup: hangup}" onclick="{showPublishPop}"> <span class=" y-icon icon-answer_small_wenda"></span> <span>发布微头条</span> <i>1</i> <b> <span>{popupStatus}</span> </b> </span> </div>', 'class="yheader"', function(t) {
        function i() {
            var t = document.title
                , i = "视频转码已完成，请查看 - 今日头条(www.toutiao.com)"
                , s = !0;
            e.timer = setInterval(function() {
                s ? (document.title = i,
                    s = !1) : (document.title = t,
                    s = !0)
            }, 1e3)
        }
        var e = this
            , s = {
                pending: "您有一个进行中的任务",
                done: "视频转码完成，请查看"
            };
        this.bg_img = t.bg_img,
            this.avtar_img = t.avtar_img,
            this.abstract = t.abstract,
            this.popupStatus = s.pending,
            this.timer = null,
        "2" == t.right_knight_sign_status && (this.abstract += "2" == t.kbanquan_sign_status ? "（本头条号已经与维权骑士、快版权签约）" : "（本头条号已经与维权骑士签约）"),
            this.hangup = !1,
            window.on("uploadReady", function(t) {
                t.ready === !0 && "video" === t.type && (e.popupStatus = s.done,
                    e.update(),
                    i())
            }),
            this.showPublishPop = function() {
                this.hangup ? window.trigger("uploadShow", {
                    type: e.type
                }) : riot.mount("ugcBox", {
                    isShowImgTab: t.ugcContentUser
                })
            }
                .bind(this),
            window.on("uploadHide", function(t) {
                e.hangup = !0,
                    e.type = t.type,
                    e.update()
            }),
            window.on("uploadClose", function() {
                e.hangup = !1,
                    e.popupStatus = s.pending,
                    e.update(),
                    clearInterval(e.timer),
                    document.title = "今日头条(www.toutiao.com)"
            });
        var o = utils.getSearchParams("publish");
        o.publish && e.showPublishPop()
    }),
    riot.tag("tab", '<ul class="tab tab-{opts.idx}" onclick="{click}"> <li each="{item,idx in opts.tabs}" class="{active:idx==parent.opts.idx}" code="{item.code}" idx="{idx}">{item.text}</li> </ul>', function(t) {
        this.click = function(i) {
            t.click && t.click instanceof Function && t.click.call(this, i)
        }
            .bind(this)
    }),
    riot.tag("relatedFeed", '<div class="relatedFeed"> <ul> <li class="item {item-hidden: item.honey} {J_add: item.ad_id}" each="{item, i in opts.list}" ga_event="feed_item_click" ad_id="{item.ad_id}" ad_track="{item.ad_track_url}" onclick="{onItemClick}"> <span id="ad_extra" style="display:none;">{item.log_extra}</span> <div if="{!item.feedMsg && !isWeiToutiao}" class="item-inner y-box"> <div class="normal {rbox: item.single_mode && item.image_url} {no-image: !item.single_mode&&!item.has_gallery}"> <div class="rbox-inner"> <div class="title-box" ga_event="{item.article_genre}_title_click"> <a class="link title" href="{item.source_url}" target="_blank">{item.title}</a> </div> <div if="{item.has_gallery}" class="img-list y-box" ga_event="{item.article_genre}_img_click"> <a each="{imgItem, j in item.image_list}" class="img-wrap" href="{item.source_url}" target="_blank"> <img riot-src="{imgItem.url}" alt=""> </a> <a if="{item.image_list.length < 4}" class="img-wrap" href="{item.source_url}" target="_blank"> <span class="add-info">查看详情&nbsp;<i class="y-icon icon-next-page"></i></span> </a> <span if="{!item.ad_id}" class="img-num">{item.gallary_image_count}图</span> </div> <div class="y-box footer"> <div class="y-left"> <span if="{item.is_top_article}" class="lbtn ltop">置顶</span> <a if="{item.article_genre!=\'video\'}" class="lbtn" ga_event="{item.article_genre}_read_count" href="{item.source_url}" target="_blank">{item.go_detail_count}阅读&nbsp;&sdot;</a> <a if="{item.article_genre==\'video\'}" class="lbtn" ga_event="{item.article_genre}_play_count" href="{item.source_url}" target="_blank">{item.detail_play_effective_count}播放&nbsp;&sdot;</a> <a class="lbtn comment" ga_event="{item.article_genre}_comment_click" href="{item.source_url}/#comment_area" target="_blank">&nbsp;{item.comments_count}评论&nbsp;</a> <span if="{item.formattedDateTime}" class="lbtn">&sdot;&nbsp;{item.formattedDateTime}</span> <span if="{item.is_related}" class="lbtn recommend">相关</span> <span if="{item.hot}" class="lbtn tag-hot">热</span> <span if="{item.ad_id}" class="lbtn recommend">{item.ad_label}</span> </div> <div class="y-right"> <span if="{isFavourite}" class="dislike" data-groupid="{item.group_id}" ga_event="{item.article_genre}_dislike_click" onclick="{onDislikeClick}"> 取消收藏 </span> <span if="{!isFavourite && item.is_ugc_item && isSelf}" class="trash" onclick="{deleteUgcVideo}"> <span class="y-icon icon-trash"></span> <span>删除</span> </span> </div> </div> </div> </div> <div if="{item.single_mode && item.image_url}" class="lbox" ga_event="{item.article_genre}_img_click"> <a class="img-wrap" href="{item.source_url}" target="_blank"> <img riot-src="{item.image_url}" alt=""> <i if="{item.has_video && item.video_duration_str}" class="ftype video"> <span>{item.video_duration_str}</span> </i> </a> </div> </div> <div if="{isWeiToutiao}" class="item-inner y-box ugc-item"> <div class="normal {rbox: item.ugc_images.length} {no-image: !item.ugc_images.length}"> <div class="rbox-inner"> <div if="{isWeiToutiao}" class="ugc-box"> <div class="ugc-user"> <img riot-src="{item.ugc_user.avatar_url}" alt="作者头像" class="avatar"> <span class="name">{item.ugc_user.name}</span> <span class="y-icon dv" if="{item.ugc_user.user_verified}"></span> </div> <div class="ugc-content"> <a href="{item.open_url}" target="_blank" ga_event="ugc_read_count"> <div riot-tag="raw" content="{item.rich_content}"></div> </a> </div> </div> <div class="y-box footer"> <div class="y-left"> <a class="lbtn" ga_event="ugc_read_count" href="{item.open_url}" target="_blank">{item.read_count}阅读</a> <a class="lbtn" ga_event="ugc_digg_count" href="{item.open_url}" target="_blank">&nbsp;&sdot;&nbsp;{item.digg_count}赞</a> <a class="lbtn" ga_event="ugc_comment_count" href="{item.open_url}" target="_blank">&nbsp;&sdot;&nbsp;{item.comment_count}评论</a> <span if="{item.formattedDateTime}" class="lbtn">&nbsp;&sdot;&nbsp;{item.formattedDateTime}</span> </div> <div class="y-right"> <span if="{isSelf}" class="trash" onclick="{deleteUgcItem}"> <span class="y-icon icon-trash"></span> <span>删除</span> </span> </div> </div> </div> </div> <div if="{item.ugc_images.length}" class="lbox" ga_event="ugc_img_click"> <a class="img-wrap" href="{item.open_url}" target="_blank"> <img riot-src="{item.ugc_images[0]}" alt=""> <i class="ftype" if="{item.ugc_images.length > 1}"> <span>{item.ugc_images.length}图</span> </i> </a> </div> </div> </li> <li if="{opts.ban}" class="empty ban">该帐号已被封禁，内容无法查看</li> <li if="{opts.empty && !opts.ban}" class="empty">暂无内容</li> </ul> </div>', function(t) {
        var i = this
            , e = (t.abtype,
            {});
        i.page_type = "0",
            i.isSelf = userInfo.isOwner,
            i.on("update", function() {
                i.isArticle = "1" == t.page_type,
                    i.isVideo = "0" == t.page_type,
                    i.isFavourite = "2" == t.page_type,
                    i.isWeiToutiao = "3" == t.page_type
            }),
            this.onDislikeClick = function(t) {
                user.checkLogin({
                    successCb: function() {
                        i._dislike(t.item)
                    },
                    errorCb: function() {
                        window.trigger("login", {
                            successCb: function(e) {
                                window.trigger("userChange", e),
                                    i._dislike(t.item)
                            }
                        })
                    }
                })
            }
                .bind(this),
            this._dislike = function(e) {
                http({
                    url: "/group/unrepin/",
                    headers: {
                        "X-CSRFToken": Cookies.get("csrftoken")
                    },
                    data: {
                        group_id: e.item.group_id,
                        item_id: e.item.item_id
                    },
                    method: "get",
                    success: function(s) {
                        "success" === s.message && (t.list.splice(e.i, 1),
                            i.update(),
                            riot.mount("#toast", "toast", {
                                msg: "已取消收藏"
                            }))
                    },
                    error: function() {
                        riot.mount("#toast", "toast", {
                            msg: "网络错误，请重试"
                        })
                    }
                })
            }
                .bind(this),
            this.onItemClick = function(t) {
                var i = t.item.item;
                return i.is_diversion_page && taAnalysis && taAnalysis.send("event", {
                    ev: "diversion_page_click"
                }),
                    !0
            }
                .bind(this),
            this.sourceFlag = function(t, i) {
                return (t = t.replace(/\s*/gi, "")) ? (void 0 === e[t] && (e[t] = i % 6),
                    e[t]) : 0
            }
                .bind(this),
            this.sourceHandle = function(t) {
                return t = t.replace(/\s*/gi, ""),
                    t ? t.slice(0, 1) : ""
            }
                .bind(this),
            this.deleteUgcVideo = function(t) {
                user.checkLogin({
                    successCb: function() {
                        window.confirm("确定要删除吗？") && i._removeVideo(t.item)
                    },
                    errorCb: function() {
                        window.trigger("login", {
                            successCb: function(e) {
                                window.trigger("userChange", e),
                                    i._removeVideo(t.item)
                            }
                        })
                    }
                })
            }
                .bind(this),
            this._removeVideo = function(e) {
                http({
                    url: "/c/ugc/video/delete/",
                    headers: {
                        "X-CSRFToken": Cookies.get("csrftoken")
                    },
                    data: {
                        item_id: e.item.item_id
                    },
                    method: "get",
                    success: function(s) {
                        "success" === s.message ? (t.list.splice(e.i, 1),
                            i.update(),
                            riot.mount("#toast", "toast", {
                                msg: "已删除"
                            })) : riot.mount("#toast", "toast", {
                            msg: "删除失败"
                        })
                    },
                    error: function() {
                        riot.mount("#toast", "toast", {
                            msg: "网络错误，请重试"
                        })
                    }
                })
            }
                .bind(this),
            this.deleteUgcItem = function(t) {
                user.checkLogin({
                    successCb: function() {
                        window.confirm("确定要删除吗？") && i._removeUgcItem(t.item)
                    },
                    errorCb: function() {
                        window.trigger("login", {
                            successCb: function(e) {
                                window.trigger("userChange", e),
                                    i._removeUgcItem(t.item)
                            }
                        })
                    }
                })
            }
                .bind(this),
            this._removeUgcItem = function(e) {
                http({
                    url: "/c/ugc/content/delete/",
                    headers: {
                        "X-CSRFToken": Cookies.get("csrftoken")
                    },
                    data: {
                        thread_id: e.item.thread_id
                    },
                    method: "POST",
                    success: function(s) {
                        "success" === s.message ? (t.list.splice(e.i, 1),
                            i.update(),
                            riot.mount("#toast", "toast", {
                                msg: "已删除"
                            })) : riot.mount("#toast", "toast", {
                            msg: "删除失败"
                        })
                    },
                    error: function() {
                        riot.mount("#toast", "toast", {
                            msg: "网络错误，请重试"
                        })
                    }
                })
            }
                .bind(this)
    }),
    riot.tag("raw", "", function(t) {
        this.root.innerHTML = t.content
    }),
    riot.tag("feedBox", '<div class="feedBox" name="feedbox"> <div class="tt-declare">以下内容由今日头条提供</div> <div class="tt-related-title">相关推荐</div> <div if="{options.isRefresh}" riot-tag="loading" msg="加载中"></div> <div riot-tag="relatedFeed" list="{list}" empty="{empty}" page_type="{params.page_type}" ban="{opts.isBanned}"></div> <div if="{options.isLoadmore}" riot-tag="loading" msg="加载中"></div>  </div>', function(t) {
        function i() {
            c.loadMoreClick()
        }
        function e(i, e) {
            if (!t.isBanned && !u) {
                u = !0;
                var s = o();
                http({
                    url: d,
                    method: "get",
                    data: s,
                    type: h,
                    success: function(t) {
                        "success" === t.message && ("refresh" === i && (c.list = []),
                        f == t.page_type && (c.list = c.list.concat(n(t.data)),
                            m[1 * f] = !!t.has_more,
                            a(),
                            c.params.max_behot_time = t.next && t.next.max_behot_time || 0))
                    },
                    complete: function() {
                        c.empty = 0 === c.list.length,
                            u = !1,
                        e && e(),
                            c.update()
                    }
                })
            }
        }
        function s(t) {
            if (!u) {
                u = !0;
                var i = o();
                i.max_repin_time = g,
                    http({
                        url: p,
                        method: "get",
                        data: i,
                        type: h,
                        success: function(t) {
                            "success" === t.message && (0 == g && (c.list = []),
                                c.list = c.list.concat(n(t.data)),
                                m[1 * f] = !!t.has_more,
                                a(),
                                g = t.max_repin_time || 0)
                        },
                        complete: function() {
                            u = !1,
                            t && t(),
                                c.empty = 0 == c.list.length,
                                c.update()
                        }
                    })
            }
        }
        function o() {
            var t, i = ascp.getHoney(), e = "";
            return window.TAC && (e = TAC.sign(userInfo.id + "" + c.params.max_behot_time)),
                t = _.extend({}, c.params, {
                    as: i.as,
                    cp: i.cp,
                    _signature: e
                })
        }
        function n(t) {
            return _.map(t, function(t) {
                return t && t.go_detail_count && (t.go_detail_count = utils.numFormat(t.go_detail_count, 1)),
                t && t.detail_play_effective_count && (t.detail_play_effective_count = utils.numFormat(t.detail_play_effective_count, 1)),
                    t
            })
        }
        function a() {
            for (var t, i, e = 0; e < c.list.length; e++)
                t = c.list[e],
                    i = new Date(1e3 * t.behot_time),
                    t.formattedDateTime = i.getFullYear() + "-" + l(i.getMonth() + 1) + "-" + l(i.getDate()) + " " + l(i.getHours()) + ":" + l(i.getMinutes())
        }
        function l(t) {
            return 10 > t ? "0" + t : t
        }
        function r(t) {
            if (!u) {
                u = !0;
                var i = {};
                0 !== v && (i = {
                    max_time: v
                }),
                    http({
                        url: "/c/ugc/content/list/" + userInfo.id + "/",
                        method: "get",
                        type: "json",
                        data: i,
                        success: function(t) {
                            if ("success" === t.message) {
                                for (var i, e, s = t.data.list, o = 0; o < s.length; o++)
                                    i = s[o],
                                        e = new Date(1e3 * i.create_time),
                                        i.formattedDateTime = e.getFullYear() + "-" + l(e.getMonth() + 1) + "-" + l(e.getDate()) + " " + l(e.getHours()) + ":" + l(e.getMinutes()),
                                    i.read_count && (i.read_count = utils.numFormat(i.read_count, 1)),
                                        v = i.create_time;
                                c.list = c.list.concat(s),
                                    m[1 * f] = !!t.data.has_more
                            }
                        },
                        complete: function() {
                            u = !1,
                            t && t(),
                                c.empty = 0 == c.list.length,
                                c.update()
                        }
                    })
            }
        }
        riot.observable(this);
        var c = this
            , u = !1
            , d = "/c/user/article/"
            , p = "/c/user/favourite/"
            , h = "json"
            , m = [!0, !0, !0, !0]
            , g = 0
            , f = "1"
            , v = 0;
        c.list = [],
            c.empty = !1,
            this.options = {
                isRefresh: !1,
                isLoadmore: !1
            },
            this.params = {
                page_type: "1",
                user_id: userInfo.id,
                max_behot_time: 0,
                count: 20
            },
            this.on("mount", function() {
                window.trigger("tabChange", t.code),
                !t.group_id && utils.on(window, "scroll", _.throttle(function() {
                    var i = utils.scrollTop()
                        , e = c.feedbox.clientHeight
                        , s = utils.offset(c.feedbox).top
                        , o = window.screen.height;
                    600 > e + s - i - o && (!m[1 * f] || c.empty || t.isBanned || c.loadMoreClick())
                }, 350))
            }),
            window.on("tabChange", function(s) {
                var o = "0";
                "a" == s && (o = "1"),
                "b" == s && (o = "0"),
                "c" == s && (o = "2"),
                "d" == s && (o = "3"),
                    f = o,
                    c.list = [],
                    c.empty = !1,
                    c.options.isRefresh = !1,
                    c.options.isLoadmore = !1,
                    c.params.page_type = o,
                    c.params.max_behot_time = 0,
                    v = 0,
                    c.update(),
                t.isBanned || ("a" === s || "d" === s ? i() : "c" == s ? (g = 0,
                    c.loadMoreClick()) : "b" == s && (c.options.isLoadmore = !0,
                    c.update(),
                    e("refresh", function() {
                        c.options.isLoadmore = !1
                    })))
            }),
            this.loadMoreClick = function() {
                c.options.isLoadmore = !0,
                    c.update(),
                    "0" == f || "1" == f ? e("loadmore", function() {
                        c.options.isLoadmore = !1
                    }) : "2" == f ? s(function() {
                        c.options.isLoadmore = !1
                    }) : "3" == f && r(function() {
                        c.options.isLoadmore = !1
                    })
            }
                .bind(this)
    }),
    riot.tag("attention", '<span class="btn-attention {following: following, each: each}" onclick="{getInfo}"><em class="text">{text}</em></span>', function(t) {
        var i = this;
        this.text = t.txt,
            i.media_id = t.media_id;
        var e = t.like;
        this._updateStatus = function(e, s) {
            i.following = e && !s,
                i.each = e && s,
            i.following && (i.text = t.activetxt),
            i.each && (i.text = t.friendedtxt),
            !i.following && !i.each && (i.text = t.txt)
        }
            .bind(this),
            this._updateStatus(t.like, t.liked),
            this.getInfo = function() {
                var s = e ? "unfollow" : "follow"
                    , o = "/c/user/" + s + "/"
                    , n = "";
                window.TAC && (n = TAC.sign(i.media_id));
                var a = function() {
                    http({
                        headers: {
                            "X-CSRFToken": Cookies.get("csrftoken")
                        },
                        url: o,
                        method: "get",
                        data: {
                            user_id: i.media_id,
                            _signature: n
                        },
                        success: function(o) {
                            return "success" !== o.message ? void riot.mount("#toast", "toast", {
                                msg: o.message
                            }) : (e = !e,
                                "follow" == s ? (i._updateStatus(!0, t.liked),
                                "list" == t.from && window.trigger("attentionChange", i.media_id, !0)) : (i._updateStatus(!1, t.liked),
                                "list" == t.from && window.trigger("attentionChange", i.media_id, !1)),
                                void i.update())
                        }
                    })
                };
                user.checkLogin({
                    successCb: function() {
                        a()
                    },
                    errorCb: function() {
                        window.trigger("login", {
                            successCb: function(t) {
                                window.trigger("userChange", t),
                                    a()
                            }
                        })
                    }
                })
            }
                .bind(this)
    }),
    riot.tag("statistics", '<dl class="statistics"> <dt> <a href="{opts.base_url}?tab=following" ga_event="nav_user_list"> <h3 riot-tag="number" number="{opts.guanzhu}"></h3> <p>关注</p> </a> </dt> <dd> <a href="{opts.base_url}?tab=followed" ga_event="nav_user_list"> <h3 riot-tag="number" number="{opts.fensi}"></h3> <p>粉丝</p> </a> </dd> </dl>', function() {}),
    riot.tag("recent", '<div class="recent" if="{show}"> <h2>近期最佳文章</h2> <div riot-tag="articles" class="articles"></div> </div>', function(t) {
        function i() {
            http({
                url: o,
                method: "get",
                data: {
                    media_id: s
                },
                success: function(t) {
                    "success" === t.message && (e.list = _.map(t.data.hot_articles, function(t) {
                        return t && t.go_detail_count && (t.go_detail_count = utils.numFormat(t.go_detail_count, 1)),
                            t
                    }))
                },
                complete: function() {
                    e.show = e.list.length > 0,
                        e.update(),
                    e.show && riot.mount(".articles", {
                        list: e.list
                    })
                }
            })
        }
        var e = this
            , s = t.mediaId
            , o = "/api/pc/media_hot/";
        e.show = !1,
            e.list = [],
        t.isBanned || i()
    }),
    riot.tag("articles", '<ul> <li each="{item in opts.list}"> <div class="line {image: item.image_url}"> <a if="{item.image_url}" class="lbox" href="{item.url}" target="_blank"> <img riot-src="{item.image_url}" alt=""> <span if="{item.video_duration_str}" class="duration">{item.video_duration_str}</span> <span if="{item.gallery_image_count}" class="count">{item.gallery_image_count}图</span> </a> <div class="rbox"> <div class="rbox-inner"> <a title="{item.title}" href="{item.url}" target="_blank">{item.title}</a> <span if="{!item.video_duration_str}">{item.go_detail_count}阅读</span> <span if="{item.video_duration_str}">{item.go_detail_count}播放</span> </div> </div> </div> </li> </ul>', function() {}),
    riot.tag("top", '<span class="top" onclick="{go}" if="{is_go}" riot-style="left:{left}px"></span>', function() {
        this.is_go = !1;
        var t = this
            , i = document.querySelector(".right")
            , e = i.getBoundingClientRect();
        e = e.left + e.width + 30,
            t.left = e;
        var s = window.onscroll;
        window.onscroll = _.throttle(function() {
            s && s instanceof Function && s();
            var i = document.body.scrollTop || document.documentElement.scrollTop;
            t.is_go = i > 0 ? !0 : !1,
                t.update()
        }, 100),
            this.go = function() {
                window.scroll(0, 0)
            }
                .bind(this)
    }),
    riot.tag("subscribe", '<div class="subscribe" ga_event="follow_pgc"> <div if="{opts.like == true}" class="article-subscribe left-arrow" onclick="{subscribe}"> <i class="y-icon icon-check"></i><span>已关注</span> </div> <div if="{opts.like == false}" class="article-unsubscribe left-arrow" onclick="{unsubscribe}"> <i class="y-icon icon-add"></i><span>关注</span> </div> </div>', function(t) {
        this.sendRequest = function(i) {
            var e = this
                , s = t.user_id
                , o = "/c/user/" + i + "/"
                , n = function() {
                    http({
                        headers: {
                            "X-CSRFToken": Cookies.get("csrftoken")
                        },
                        url: o,
                        method: "post",
                        data: {
                            user_id: s
                        },
                        success: function(s) {
                            "success" === s.message && (t.like = "follow" == i ? !0 : !1,
                                e.update())
                        }
                    })
                };
            user.checkLogin({
                successCb: function() {
                    n()
                },
                errorCb: function() {
                    window.trigger("login", {
                        successCb: function(t) {
                            window.trigger("userChange", t),
                                n()
                        }
                    })
                }
            })
        }
            .bind(this),
            this.subscribe = function() {
                this.sendRequest("unfollow")
            }
                .bind(this),
            this.unsubscribe = function() {
                this.sendRequest("follow")
            }
                .bind(this)
    }),
    !function(t) {
        var i = {
            isOnline: function() {
                return window.navigator.onLine
            },
            isHTML5: function() {
                return !(!window.FormData || !File)
            },
            extend: function(t) {
                var i = arguments.length;
                if (2 > i || null == t)
                    return t;
                for (var e = 1; i > e; e++) {
                    var s = arguments[e];
                    for (var o in s)
                        Object.prototype.hasOwnProperty.call(s, o) && (t[o] = s[o])
                }
                return t
            },
            isFile: function(t) {
                return !!(t instanceof File && (t.size >= 0 || t.type))
            },
            isFileList: function(t) {
                return t instanceof FileList
            },
            isArray: function(t) {
                return "[object Array]" === Object.prototype.toString.call(t)
            },
            isEmptyObject: function(t) {
                if (this.isObject(t)) {
                    var i = null;
                    for (i in t)
                        if (i)
                            return !1
                }
                return !0
            },
            isObject: function(t) {
                return null !== t && "object" == typeof t
            },
            toArray: function(t) {
                if (!t || 0 === t.length)
                    return [];
                if (!t.length)
                    return t;
                try {
                    return [].slice.call(t)
                } catch (i) {
                    for (var e = 0, s = t.length, o = []; s > e; e++)
                        o.push(t[e]);
                    return o
                }
            }
        };
        t.uploadUtils = i
    }(window, document),
    !function(t) {
        function i(t, i, e) {
            this.uploader = t,
                this.file = i,
                this.status = 0,
                this.progress = 0,
                this.uploadedBytes = 0,
                this.useChunk = e.useChunk || !1,
                this.chunkSize = e.chunkSize || 0,
                uploadUtils.isFile(i) ? this._createFile(i) : this._createFileFromInput(i.value),
                this.useChunk = this.useChunk && this.size > this.chunkSize
        }
        var e = 1
            , s = 2
            , o = 3
            , n = 4
            , a = 5;
        i.prototype._createFileFromInput = function(t) {
            this.lastModifiedDate = null,
                this.size = null,
                this.type = "file/" + t.slice(t.lastIndexOf(".") + 1).toLowerCase(),
                this.name = t.slice(t.lastIndexOf("/") + t.lastIndexOf("\\") + 2)
        }
            ,
            i.prototype._createFile = function(t) {
                this.lastModifiedDate = t.lastModifiedDate,
                    this.size = t.size,
                    this.type = t.type,
                    this.name = t.name
            }
            ,
            i.prototype._slice = function(t, i) {
                var e = this.file.slice || this.file.mozSlice || this.file.webkitSlice;
                return e ? e.call(this.file, t, i, this.type) : this.file
            }
            ,
            i.prototype.getChunkFile = function() {
                var t = this.uploadedBytes
                    , i = t + this.chunkSize;
                return i > this.size && (i = this.size,
                    this.chunkSize = i - this.uploadedBytes),
                {
                    start: t,
                    end: i,
                    file: this._slice(t, i)
                }
            }
            ,
            i.prototype.upload = function() {
                try {
                    this.uploader.uploadItem(this)
                } catch (t) {
                    throw t
                }
            }
            ,
            i.prototype.cancel = function() {
                this.uploader.abortItem(this)
            }
            ,
            i.prototype.onPrepareUpload = function() {
                this.status = e
            }
            ,
            i.prototype.onBeforeUpload = function() {
                this.status = s
            }
            ,
            i.prototype.onProgress = function(t, i) {
                this.status === s && (this.progress = Math.round(this.useChunk ? (this.uploadedBytes + t) / this.size * 100 : t / i * 100))
            }
            ,
            i.prototype.onAbort = function() {
                this.status = o
            }
            ,
            i.prototype.onSuccess = function() {
                this.useChunk ? (this.uploadedBytes += this.chunkSize,
                this.uploadedBytes === this.size && (this.status = n)) : this.status = n
            }
            ,
            i.prototype.onError = function() {
                this.status = a
            }
            ,
            t.FileItem = i
    }(window, document),
    function(t) {
        function i(t) {
            var i = this;
            this.fileQueue = [],
                this.isUploading = !1,
                this.options = {
                    autoUpload: !1,
                    maxNum: 10,
                    filters: [],
                    formdata: {},
                    headers: {},
                    url: "",
                    method: "POST",
                    responseType: "json",
                    withCredentials: !1,
                    progressCbk: null,
                    completeCbk: null,
                    errorCbk: null,
                    useChunk: !0,
                    chunkSize: 10485760
                },
                uploadUtils.extend(this.options, t),
                this.options.filters.push({
                    name: "maxLimit",
                    fn: function() {
                        return i.getAll().length <= i.options.maxNum
                    }
                })
        }
        i.prototype.getAll = function() {
            return this.fileQueue
        }
            ,
            i.prototype.clearAll = function() {
                this.fileQueue = []
            }
            ,
            i.prototype.addToQueue = function(t) {
                for (var t = uploadUtils.isFileList(t) ? uploadUtils.toArray(t) : [t], i = 0, e = t.length; e > i; i++) {
                    var s = t[i]
                        , o = new FileItem(this,s,{
                            useChunk: this.options.useChunk,
                            chunkSize: this.options.chunkSize
                        });
                    if (!this._filePreHandle(o, this.options.filters))
                        return !1;
                    this.fileQueue.push(o)
                }
                return this.options.autoUpload,
                    !0
            }
            ,
            i.prototype.uploadAll = function() {
                if (this.fileQueue.length) {
                    var t = this._getNotUploadedItems();
                    t.forEach(function(t) {
                        t.onPrepareUpload()
                    }),
                    t.length && t[0].upload()
                }
            }
            ,
            i.prototype.uploadItem = function(t) {
                if (!this.isUploading) {
                    var i = uploadUtils.isHTML5() ? "_xhrPost" : "_iframePost"
                        , t = t || this._getNotUploadedItems()[0];
                    t && (this.isUploading = !0,
                        t.onPrepareUpload(),
                        this[i](t))
                }
            }
            ,
            i.prototype.abortItem = function(t) {
                var i = uploadUtils.isHTML5() ? "_xhr" : "_form";
                t && 2 === t.status && t[i].abort()
            }
            ,
            i.prototype.uploadContinue = function(t) {
                uploadUtils.isOnline() && this.uploadItem(t)
            }
            ,
            i.prototype._onCompleteUpload = function(t) {
                if (this.isUploading = !1,
                    t.useChunk && 2 === t.status)
                    return void this._xhrPost(t);
                this.options.completeCbk && this.options.completeCbk(t),
                5 === t.status && this.options.errorCbk && this.options.errorCbk(t);
                var i = this._getReadyItems()[0];
                uploadUtils.isObject(i) && i.upload()
            }
            ,
            i.prototype._onAbortUpload = function(t) {
                t.onAbort()
            }
            ,
            i.prototype._onSuccessUpload = function(t) {
                t.onSuccess()
            }
            ,
            i.prototype._onErrorUpload = function(t) {
                t.onError()
            }
            ,
            i.prototype._filePreHandle = function(t, i) {
                if (!i.length)
                    return !0;
                for (var e = 0, s = i.length; s > e; e++) {
                    var o = i[e];
                    if (!o.fn.call(this, t))
                        return o.fail && o.fail.call(this),
                            !1
                }
                return !0
            }
            ,
            i.prototype._getNotUploadedItems = function() {
                return this.fileQueue.filter(function(t) {
                    return 0 === t.status
                })
            }
            ,
            i.prototype._getReadyItems = function() {
                return this.fileQueue.filter(function(t) {
                    return 1 === t.status
                })
            }
            ,
            i.prototype._parseHeaders = function(t) {
                var i = {};
                return uploadUtils.isObject(t) ? null : (t.split("\n").forEach(function(t) {
                    var e = t.indexOf(":");
                    if (e > -1) {
                        var s = t.slice(0, e).trim()
                            , o = t.slice(e + 1).trim();
                        i[s] = i[s] ? i[s] + "," + o : o
                    }
                }),
                    i)
            }
            ,
            i.prototype._xhrPost = function(t) {
                var i = this
                    , e = t._xhr = new XMLHttpRequest
                    , s = new FormData;
                if (t.onBeforeUpload(),
                        !uploadUtils.isEmptyObject(this.options.formData))
                    for (var o in this.options.formData)
                        s.append(o, this.options.formData[o]);
                if (e.open(this.options.method, this.options.url, !0),
                        e.responseType = this.options.responseType,
                        e.withCredentials = this.options.withCredentials,
                        !uploadUtils.isEmptyObject(this.options.headers))
                    for (var o in this.options.headers)
                        e.setRequestHeader(o, this.options.headers[o]);
                if (t.useChunk) {
                    var n = t.getChunkFile();
                    s.append("file", n.file, t.name),
                        e.setRequestHeader("Content-Range", "bytes " + n.start + "-" + (n.end - 1) + "/" + t.size)
                } else
                    s.append("file", t.file, t.name),
                        e.setRequestHeader("Content-Range", "bytes 0-" + (t.size - 1) + "/" + t.size);
                e.upload.onprogress = function(e) {
                    var s = e.lengthComputable ? e.loaded : 0
                        , o = e.lengthComputable ? e.total : -1;
                    t.onProgress(s, o),
                    i.options.progressCbk && i.options.progressCbk(t)
                }
                    ,
                    e.onload = function() {
                        var s = e.response
                            , o = 200 == e.status ? "Success" : "Error"
                            , n = "_on" + o + "Upload";
                        "Success" === o && (t.responseItem = s),
                            i[n](t),
                            i._onCompleteUpload(t)
                    }
                    ,
                    e.onerror = function() {
                        i._onErrorUpload(t),
                            i._onCompleteUpload(t)
                    }
                    ,
                    e.onabort = function() {
                        i._onAbortUpload(t),
                            i._onCompleteUpload(t)
                    }
                    ,
                    e.send(s)
            }
            ,
            i.prototype._iframePost = function() {}
            ,
            t.FileUpload = i
    }(window, document),
    riot.tag("ugcBox", '<div class="ugcBox" show="{options.isShow}"> <div class="ugcBox-inner"> <ul class="y-box ugc-tab-list"> <li class="y-left ugc-tab-item {current: options.type === 1}" onclick="{changeType}" data-type="1" if="{opts.isShowImgTab}">发布图文</li> <li class="y-left ugc-tab-item {current: options.type === 2}" onclick="{changeType}" data-type="2">发布视频</li> </ul> <span class="ugc-close" onclick="{closeUploadClick}"> <span><i class="y-icon icon-dislikenewfeed"></i></span> </span> <div class="ugc-content"> <div if="{options.type === 1}" riot-tag="imgBox"></div> <div if="{options.type === 2}" riot-tag="videoBox"></div> </div> </div> </div>', function(t) {
        var i = this;
        this.options = {
            isShow: !0,
            isPending: !1,
            type: t.isShowImgTab ? 1 : 2
        },
            this.changeType = function(t) {
                var i = 1 === this.options.type ? "图文" : "视频"
                    , e = 1 === this.options.type ? "video_tab_click" : "img_tab_click";
                return this.options.isPending && !window.confirm("是否放弃" + i + "发布？") ? !1 : (this.options.isPending = !1,
                    this.options.type = +t.target.dataset.type || 1,
                    this.update(),
                    void (window.taAnalysis && taAnalysis.send("event", {
                        ev: e
                    })))
            }
                .bind(this),
            window.on("uploadPending", function() {
                i.options.isPending = !0
            }),
            window.on("publishSuccess", function() {
                i.options.isPending = !1
            }),
            this.closeUploadClick = function() {
                return this.options.isPending && !window.confirm("确认取消上传？") ? !1 : (this.options.isPending = !1,
                    this.unmount(!0),
                    void window.trigger("uploadClose"))
            }
                .bind(this),
            window.on("uploadHide", function() {
                i.options.isShow = !1,
                    i.update()
            }),
            window.on("uploadShow", function(t) {
                i.options.isShow = !0,
                    i.options.type = t.type,
                    i.update()
            }),
            window.onbeforeunload = function() {
                return i.options.isPending ? "您有一个未完成的任务，关闭或刷新页面会导致数据丢失" : void 0
            }
    }),
    riot.tag("videoBox", '<div class="videoBox"> <input class="title-input {warning: inputInvalid}" type="text" name="title" value="" placeholder="请输入标题(30字以内)" onkeyup="{inputKeyup}"> <p class="too-long {out: tooLong}">标题过长</p> <div riot-tag="videoUploadBox" autoupload="{options.autoUpload}"></div> <div class="y-box upload-footer">  <div class="y-right upload-action"> <a href="#" class="upload-backend" onclick="{backendUpload}">后台上传</a> <a href="#" class="upload-publish {active: options.uploadReady}" onclick="{publishVideo}">发布</a> </div> </div> </div>', function() {
        var t = this
            , i = !1
            , e = !1
            , s = 0
            , o = {
                video_id: "",
                title: "",
                thumb_uri: "",
                thumb_source: 1
            };
        this.inputInvalid = !1,
            this.tooLong = !1,
            this.options = {
                autoUpload: !1,
                uploadReady: !1
            };
        var n = this.title
            , a = !1;
        n.addEventListener("compositionstart", function() {
            a = !0
        }),
            n.addEventListener("compositionend", function() {
                a = !1
            }),
            this.inputKeyup = function() {
                s = t.title.value.trim(),
                    s = s.length,
                    s > 30 && !a ? (this.inputInvalid = !0,
                        this.tooLong = !0,
                        this.update()) : (this.inputInvalid = !1,
                        this.tooLong = !1,
                        this.update()),
                    this.options.uploadReady = "" != t.title.value.trim() && i && !this.inputInvalid
            }
                .bind(this),
            this.autoCheck = function() {
                this.options.autoUpload = !this.options.autoUpload
            }
                .bind(this),
            this.backendUpload = function() {
                window.trigger("uploadHide", {
                    type: 2
                })
            }
                .bind(this),
            this.publishVideo = function() {
                return "" == this.title.value.trim() ? (this.inputInvalid = !0,
                    !1) : void (this.options.uploadReady && !e && (e = !0,
                    o.title = t.title.value.trim(),
                    http({
                        url: "//www.toutiao.com/c/ugc/video/publish/",
                        method: "post",
                        data: o,
                        success: function(t) {
                            "success" == t.message ? (window.trigger("publishSuccess"),
                                riot.mount("#toast", "toast", {
                                    msg: "发布成功，页面将在 3 秒后自动刷新"
                                }),
                                setTimeout(function() {
                                    window.location.href = location.origin + location.pathname + "?tab=video"
                                }, 3e3)) : "error" == t.message && (riot.mount("#toast", "toast", {
                                msg: t.data || "发布失败，请重试"
                            }),
                                e = !1)
                        },
                        error: function(t) {
                            riot.mount("#toast", "toast", {
                                msg: t.data || "服务器开了点小差，请稍后再试"
                            }),
                                e = !1
                        }
                    }),
                window.taAnalysis && taAnalysis.send("event", {
                    ev: "user_ugc_video_submit"
                })))
            }
                .bind(this),
            window.on("uploadReady", function(e) {
                i = e.ready,
                    o.video_id = e.video_id,
                    o.thumb_uri = e.thumb_uri,
                    t.options.uploadReady = "" != t.title.value.trim() && i && !t.inputInvalid,
                    t.update()
            })
    }),
    riot.tag("videoUploadBox", '<div class="videoUploadBox"> <div class="y-box upload-box" if="{options.isInitShow}"> <form name="fileElemHolder" style="display: none;"> <input id="fileElem" name="fileElem" type="file" onchange="{handleFile}" accept="video/mp4,video/x-m4v,video/*"> </form> <div class="y-left upload-cover upload-cover-add" onclick="{uploadActionClick}" ga_event="user_ugc_upload"></div> <div class="y-right upload-warning"> <span>支持绝大多数的视频格式，大小不超过250M，请勿上传反动色情等违法视频。</span> </div> </div> <div class="y-box upload-box" if="{!options.isInitShow}"> <div class="y-left upload-cover upload-cover-loading"> <img if="{options.poster}" riot-src="{options.poster}" alt=""> </div> <div class="y-right upload-info"> <h3>{options.title}</h3> <div style="font-size: 0px;"> <span if="{options.isTranscoding}" class="upload-status">转码中...</span> <span if="{!options.isTranscoding}" class="upload-status">{options.statusMsg}</span> <span if="{!options.isTranscoding}" class="upload-ctr" onclick="{onCtrClick}">{options.ctrMsg}</span> </div> <div class="progress"> <div class="progress-rate" riot-style="width: {options.progress}%;"></div> </div> </div> </div> <p class="upload-msg">{options.sugMsg}</p> </div>', function() {
        function t() {
            http({
                url: "//www.toutiao.com/c/ugc/video/upload/",
                method: "get",
                success: function(t) {
                    if ("success" === t.message) {
                        var e = t.data;
                        r = e.upload_id,
                            i({
                                url: e.upload_url,
                                chunkSize: e.chunk_size
                            })
                    }
                }
            })
        }
        function i(t) {
            l = new FileUpload({
                url: t.url,
                chunk_size: t.chunk_size,
                filters: [{
                    name: "acceptType",
                    fn: function(t) {
                        var i = /video/;
                        return i.test(t.type)
                    },
                    fail: function() {
                        riot.mount("#toast", "toast", {
                            msg: "文件类型错误"
                        })
                    }
                }, {
                    name: "size",
                    fn: function(t) {
                        var i = t.size / 1048576;
                        return 250 > i
                    },
                    fail: function() {
                        riot.mount("#toast", "toast", {
                            msg: "文件过大"
                        })
                    }
                }],
                progressCbk: function(t) {
                    e(2),
                        n.options.progress = t.progress,
                        n.update()
                },
                completeCbk: function(t) {
                    t.responseItem && (c = t.responseItem.poster_uri || "",
                        n.options.poster = t.responseItem.poster_url || ""),
                        console.log(t.status),
                        e(t.status)
                }
            });
            var i = l.addToQueue(a);
            i ? (l.uploadAll(),
                n.update()) : (n.fileElemHolder.reset(),
                n.options.isInitShow = !0,
                n.update())
        }
        function e(t) {
            u = t,
                s(t),
                o(t),
                n.update()
        }
        function s(t) {
            n.options.statusMsg = d[t],
                n.options.ctrMsg = p[t],
                n.options.sugMsg = h[t]
        }
        function o(t) {
            4 === t && (n.update(),
                window.trigger("uploadReady", {
                    ready: !0,
                    type: "video",
                    video_id: r,
                    thumb_uri: c
                }))
        }
        var n = this
            , a = []
            , l = null
            , r = 0
            , c = ""
            , u = 0
            , d = {
                1: "准备中...",
                2: "上传中",
                3: "上传取消",
                4: "上传成功",
                5: "上传失败"
            }
            , p = {
                1: "",
                2: "取消上传",
                3: "",
                4: "重新上传",
                5: "继续上传"
            }
            , h = {
                1: "",
                2: "当前状态点击后台运行，将在上传成功后提示发布视频",
                3: "",
                4: "发布后视频将出现在个人主页",
                5: "视频无法上传，请检查网络环境"
            };
        this.options = {
            isInitShow: !0,
            title: "",
            statusMsg: "准备中...",
            ctrMsg: "",
            sugMsg: "",
            progress: 0,
            isTranscoding: !1,
            poster: "",
            posters: [],
            activePoster: -1
        },
            this.on("unmount", function() {
                var t = l && l.getAll()[0];
                t && t.cancel()
            }),
            this.uploadActionClick = function() {
                this.fileElem.click()
            }
                .bind(this),
            this.handleFile = function() {
                this.options.isInitShow = !1,
                    this.update(),
                    a = this.fileElem.files,
                a.length && (this.options.title = a[0].name,
                    window.trigger("uploadReady", {
                        ready: !1,
                        type: "video"
                    }),
                    this.options.poster = "",
                    this.options.posters = [],
                    window.trigger("uploadPending"),
                    t())
            }
                .bind(this),
            this.onCtrClick = function() {
                var t = l.getAll()[0];
                t && (2 === u ? window.confirm("确定取消咩") && (t.cancel(),
                    this.fileElemHolder.reset(),
                    this.options.isInitShow = !0,
                    this.update()) : 4 === u ? (this.fileElemHolder.reset(),
                    this.fileElem.click()) : 5 === u && l.uploadContinue(t))
            }
                .bind(this),
            this.coverPickClick = function(t) {
                this.options.activePoster = t.item.i,
                    this.options.poster = t.item.item,
                    window.trigger("uploadThumb", {
                        thumb_uri: t.item.item
                    })
            }
                .bind(this),
            this.on("updated", function() {})
    }),
    riot.tag("imgBox", '<div class="imgBox"> <textarea class="title-input {warning: inputInvalid}" name="title" value="" placeholder="请输入内容" onkeyup="{inputKeyup}"></textarea> <p class="too-long {out: tooLong}">内容过长</p> <div riot-tag="imgUploadBox" autoupload="{options.autoUpload}"></div> <div class="y-box upload-footer">  <div class="y-right upload-action"> <a href="#" class="upload-backend" onclick="{backendUpload}">后台上传</a> <a href="#" class="upload-publish {active: options.uploadReady}" onclick="{publishImg}">发布</a> </div> </div> </div>', function() {
        var t = this
            , i = !1
            , e = !1
            , s = 0
            , o = []
            , n = {
                content: "",
                image_uris: ""
            };
        this.inputInvalid = !1,
            this.tooLong = !1,
            this.options = {
                autoUpload: !1,
                uploadReady: !1
            };
        var a = this.title
            , l = !1;
        a.addEventListener("compositionstart", function() {
            l = !0
        }),
            a.addEventListener("compositionend", function() {
                l = !1
            }),
            this.inputKeyup = function() {
                s = t.title.value.trim(),
                    s = s.length,
                    s > 2e3 && !l ? (this.inputInvalid = !0,
                        this.tooLong = !0,
                        this.update()) : (this.inputInvalid = !1,
                        this.tooLong = !1,
                        this.update()),
                    this.options.uploadReady = "" != t.title.value.trim() && i && !this.inputInvalid
            }
                .bind(this),
            this.autoCheck = function() {
                this.options.autoUpload = !this.options.autoUpload
            }
                .bind(this),
            this.backendUpload = function() {
                window.trigger("uploadHide", {
                    type: 1
                })
            }
                .bind(this),
            this.publishImg = function() {
                if ("" == this.title.value.trim())
                    return this.inputInvalid = !0,
                        !1;
                if (this.options.uploadReady && !e) {
                    if (o.length > 9)
                        return riot.mount("#toast", "toast", {
                            msg: "图片不能多于 9 张"
                        }),
                            !1;
                    e = !0,
                        n.content = t.title.value.trim(),
                        n.image_uris = o.join(","),
                        http({
                            url: "/c/ugc/content/publish/",
                            method: "post",
                            data: n,
                            success: function(t) {
                                "success" == t.message ? (window.trigger("publishSuccess"),
                                    riot.mount("#toast", "toast", {
                                        msg: "发布成功，页面将自动刷新"
                                    }),
                                    setTimeout(function() {
                                        window.location.href = location.origin + location.pathname + "?tab=weitoutiao"
                                    }, 1e3)) : "error" == t.message && (riot.mount("#toast", "toast", {
                                    msg: t.data || "发布失败，请重试"
                                }),
                                    e = !1)
                            },
                            error: function(t) {
                                riot.mount("#toast", "toast", {
                                    msg: t.data || "服务器开了点小差，请稍后再试"
                                }),
                                    e = !1
                            }
                        }),
                    window.taAnalysis && taAnalysis.send("event", {
                        ev: "user_ugc_img_submit"
                    })
                }
            }
                .bind(this),
            window.on("removeImg", function(t) {
                o.splice(t.i, 1)
            }),
            window.on("uploadReady", function(e) {
                i = e.ready,
                e.uri && o.push(e.uri),
                    t.options.uploadReady = "" != t.title.value.trim() && i && !t.inputInvalid,
                    t.update()
            })
    }),
    riot.tag("imgUploadBox", '<div class="imgUploadBox"> <div class="y-box upload-box"> <form name="fileElemHolder" style="display: none;"> <input id="fileElem" name="fileElem" type="file" onchange="{handleFile}" accept="image/*" multiple="multiple"> </form> <ul class="upload-img-list"> <li class="upload-img-item" each="{url,i in options.imgList}"> <div class="img-wrap"> <img riot-src="{url}" alt=""> </div> <i class="y-icon icon-dislikenewfeed" onclick="{removeImg}"></i> </li> <li class="upload-img-item upload-img-loading" each="{i in options.loadingList}"> <img src="http://s3b.pstatp.com/toutiao/resource/toutiao_web/static/style/image/loading_50c5e3e.gif" alt="上传中"> </li> <li class="upload-img-item upload-img-add" onclick="{uploadActionClick}" ga_event="user_ugc_upload" if="{options.imgList.length < 9}"> </li> <li class="upload-tips" if="{options.imgList.length < 1 && options.loadingList.length < 1}">支持绝大多数的图片格式，单张图片大小不超过10M，请勿上传反动色情等违法图片。</li> </ul> </div> <p class="upload-msg">{options.sugMsg}</p> </div>', function() {
        function t() {
            s = new FileUpload({
                url: "/c/ugc/image/upload/",
                filters: [{
                    name: "acceptType",
                    fn: function(t) {
                        var i = /image/;
                        return i.test(t.type)
                    },
                    fail: function() {
                        riot.mount("#toast", "toast", {
                            msg: "文件类型错误"
                        })
                    }
                }, {
                    name: "size",
                    fn: function(t) {
                        var i = t.size / 1048576;
                        return 10 > i
                    },
                    fail: function() {
                        riot.mount("#toast", "toast", {
                            msg: "图片大小超过10M，请更换图片"
                        })
                    }
                }],
                progressCbk: function() {},
                completeCbk: function(t) {
                    i.options.loadingList.pop(),
                    t && t.responseItem && t.responseItem.data && t.responseItem.data.url_list && (i.options.imgList.push(t.responseItem.data.url_list[0].url),
                        i.update(),
                        window.trigger("uploadReady", {
                            ready: !0,
                            type: "img",
                            uri: t.responseItem.data.web_uri
                        }))
                },
                errorCbk: function() {
                    riot.mount("#toast", "toast", {
                        msg: "上传失败，请更换图片再试试"
                    }),
                        window.trigger("uploadReady", {
                            ready: !0,
                            type: "img"
                        })
                }
            });
            var t = s.addToQueue(e);
            t ? (s.uploadAll(),
                i.update()) : (i.fileElemHolder.reset(),
                i.update())
        }
        var i = this
            , e = []
            , s = null;
        this.options = {
            statusMsg: "",
            ctrMsg: "",
            sugMsg: "",
            isTranscoding: !1,
            imgList: [],
            loadingList: []
        },
            this.on("unmount", function() {
                var t = s && s.getAll()[0];
                t && t.cancel()
            }),
            this.removeImg = function(t) {
                window.trigger("removeImg", {
                    i: t.item.i
                }),
                    this.options.imgList = _.without(this.options.imgList, t.item.url),
                    this.update()
            }
                .bind(this),
            this.uploadActionClick = function() {
                this.fileElem.click()
            }
                .bind(this),
            this.handleFile = function() {
                if (this.update(),
                        e = this.fileElem.files,
                        e.length) {
                    window.trigger("uploadReady", {
                        ready: !1,
                        type: "img"
                    }),
                        window.trigger("uploadPending");
                    for (var i = e.length - 1; i >= 0; i--)
                        this.options.loadingList.push(i);
                    t()
                }
            }
                .bind(this)
    }),
    Function(function(t) {
        return 'e(e,a,r){(b[e]||(b[e]=t("x,y","x "+e+" y")(r,a)}a(e,a,r){(k[r]||(k[r]=t("x,y","new x[y]("+Array(r+1).join(",x[y]")(1)+")")(e,a)}r(e,a,r){n,t,s={},b=s.d=r?r.d+1:0;for(s["$"+b]=s,t=0;t<b;t)s[n="$"+t]=r[n];for(t=0,b=s=a;t<b;t)s[t]=a[t];c(e,0,s)}c(t,b,k){u(e){v[x]=e}f{g=,ting(bg)}l{try{y=c(t,b,k)}catch(e){h=e,y=l}}for(h,y,d,g,v=[],x=0;;)switch(g=){case 1:u(!)4:f5:u((e){a=0,r=e;{c=a<r;c&&u(e[a]),c}}(6:y=,u((y8:if(g=,lg,g=,y===c)b+=g;else if(y!==l)y9:c10:u(s(11:y=,u(+y)12:for(y=f,d=[],g=0;g<y;g)d[g]=y.charCodeAt(g)^g+y;u(String.fromCharCode.apply(null,d13:y=,h=delete [y]14:59:u((g=)?(y=x,v.slice(x-=g,y:[])61:u([])62:g=,k[0]=65599*k[0]+k[1].charCodeAt(g)>>>065:h=,y=,[y]=h66:u(e(t[b],,67:y=,d=,u((g=).x===c?r(g.y,y,k):g.apply(d,y68:u(e((g=t[b])<"<"?(b--,f):g+g,,70:u(!1)71:n72:+f73:u(parseInt(f,3675:if(){bcase 74:g=<<16>>16g76:u(k[])77:y=,u([y])78:g=,u(a(v,x-=g+1,g79:g=,u(k["$"+g])81:h=,[f]=h82:u([f])83:h=,k[]=h84:!085:void 086:u(v[x-1])88:h=,y=,h,y89:u({e{r(e.y,arguments,k)}e.y=f,e.x=c,e})90:null91:h93:h=0:;default:u((g<<16>>16)-16)}}n=this,t=n.Function,s=Object.keys||(e){a={},r=0;for(c in e)a[r]=c;a=r,a},b={},k={};r'.replace(/[-]/g, function(i) {
            return t[15 & i.charCodeAt(0)]
        })
    }("v[x++]=v[--x]t.charCodeAt(b++)-32function return ))++.substrvar .length(),b+=;break;case ;break}".split("")))()('gr$Daten Иb/s!l y͒yĹg,(lfi~ah`{mv,-n|jqewVxp{rvmmx,&effkx[!cs"l".Pq%widthl"@q&heightl"vr*getContextx$"2d[!cs#l#,*;?|u.|uc{uq$fontl#vr(fillTextx$$龘ฑภ경2<[#c}l#2q*shadowBlurl#1q-shadowOffsetXl#$$limeq+shadowColorl#vr#arcx88802[%c}l#vr&strokex[ c}l"v,)}eOmyoZB]mx[ cs!0s$l$Pb<k7l l!r&lengthb%^l$1+s$jl  s#i$1ek1s$gr#tack4)zgr#tac$! +0o![#cj?o ]!l$b%s"o ]!l"l$b*b^0d#>>>s!0s%yA0s"l"l!r&lengthb<k+l"^l"1+s"jl  s&l&z0l!$ +["cs\'(0l#i\'1ps9wxb&s() &{s)/s(gr&Stringr,fromCharCodes)0s*yWl ._b&s o!])l l Jb<k$.aj;l .Tb<k$.gj/l .^b<k&i"-4j!+& s+yPo!]+s!l!l Hd>&l!l Bd>&+l!l <d>&+l!l 6d>&+l!l &+ s,y=o!o!]/q"13o!l q"10o!],l 2d>& s.{s-yMo!o!]0q"13o!]*Ld<l 4d#>>>b|s!o!l q"10o!],l!& s/yIo!o!].q"13o!],o!]*Jd<l 6d#>>>b|&o!]+l &+ s0l-l!&l-l!i\'1z141z4b/@d<l"b|&+l-l(l!b^&+l-l&zl\'g,)gk}ejo{cm,)|yn~Lij~em["cl$b%@d<l&zl\'l $ +["cl$b%b|&+l-l%8d<@b|l!b^&+ q$sign ', [TAC = {}]);
