var ThemeID = "rule34",
    ImgCDN = "https://fastly.jsdelivr.net/gh/journey-ad/Moe-counter/assets/theme/",
    /* 這是我博客内的東西, 你要自己去Config啦, 當然我是建議你自己加到你的footer或者什麽地方，實在是搞不掂在用Inject. :D */
    HTML2Inject =
        `<main class="φm">`+
        `<is-i class="φce" id="busuanzi_container_site_pv" style="display: none;">` +
        `<div class="φch" style="text-align: center;">` +
        `<h3 class="φcl" style="padding: 1.5rem">` +
        `Total Hits` +
        `</h3>` +
        `<div id="busuanzi_value_site_pv"></div>` +
        `<h3 class="φcl" style="padding: 1.5rem">` +
        `Total Viewers` +
        `</h3>` +
        `<div id="busuanzi_value_site_uv"></div>` +
        `<h6 style="padding: 1.5rem 0;margin: 0;">Powered by <a target="_blank" href="//busuanzi.ibruce.info/">Busuanzi</a>, but <a target="_blank" href="//github.com/kobe-koto/L-Scripts/tree/main/GenCounter">hooked by kobe-koto</a>.</h6>`+
        `</div>` +
        `</is-i>`+
        `</main>`,
    Element2Inject = "document.getElementsByClassName('φn')[0]",

    /*
     * 這個東西用於決定你的busuanzi加載完成之後給你的container修改到的Display樣式。
     * busuanzi 官方給到的是inline。
     */
    DisplayStyle = "block",
    InjectSpan = document.createElement("span")
;
InjectSpan.innerHTML = HTML2Inject;

var bszCaller, bszTag;
function GenCounter (Content,ThemeID,MinLength) {
    /* Content     必須為純數字!
     * ThemeID     選取詳見 GitHub/journey-ad/Moe-counter 。
     * MinLength   為位數，自動補0，設定為false不啓用(NaN的話也不會啓用)。
     */
    if (isNaN(Content)) {
        throw ("Not a Number, task terminated. Content is: " + Content)
    }
    let ReturnValue = "";
    for (let i=0;
         i<Content.toString().split("").length;
         i++
    ){
        ReturnValue +=
            "<img alt=\"\" src=\"" + ImgCDN + ThemeID+ "/" +
            Content.toString().split("")[i] +
            ".gif\">"
    }
    if (MinLength && !isNaN(MinLength)) {
        if (ReturnValue.length<MinLength) {
            let ValueToFill = MinLength - ReturnValue.length;
            ReturnValue =
                (function () {
                    let value = "";
                    for (let i=0;i<ValueToFill;i++) {
                        value +=
                            "<img alt=\"\" src=\""+ImgCDN+
                            ThemeID+
                            "/0.gif\">"
                    }
                    return value;
                })()
                + ReturnValue;
        }
    }
    return ReturnValue;
}
! function() {
    var c, d, e, a = !1,
        b = [];
    ready = function(c) {
        return a || "complete" === document.readyState ? c.call(document) : b.push(function() {
            return c.call(this)
        }), this
    }, d = function() {
        for (var a = 0, c = b.length; c > a; a++) b[a].apply(document);
        b = []
    }, e = function() {
        a || (a = !0, d.call(window), document.removeEventListener ? document.removeEventListener("DOMContentLoaded", e, !1) : document.attachEvent && (document.detachEvent("onreadystatechange", e), window == window.top && (clearInterval(c), c = null)))
    }, document.addEventListener ? document.addEventListener("DOMContentLoaded", e, !1) : document.attachEvent && (document.attachEvent("onreadystatechange", function() {
        /loaded|complete/.test(document.readyState) && e()
    }), window == window.top && (c = setInterval(function() {
        try {
            a || document.documentElement.doScroll("left")
        } catch (b) {
            return
        }
        e()
    }, 5)))
}(), bszCaller = {
    fetch: function(a, b) {
        var c = "BusuanziCallback_" + Math.floor(1099511627776 * Math.random());
        window[c] = this.evalCall(b), a = a.replace("=BusuanziCallback", "=" + c), scriptTag = document.createElement("SCRIPT"), scriptTag.type = "text/javascript", scriptTag.defer = !0, scriptTag.src = a, scriptTag.referrerPolicy = "no-referrer-when-downgrade", document.getElementsByTagName("HEAD")[0].appendChild(scriptTag)
    },
    evalCall: function(a) {
        return function(b) {
            ready(function() {
                try {
                    a(b), scriptTag.parentElement.removeChild(scriptTag)
                } catch (c) {
                    bszTag.hides()
                }
            })
        }
    }
}, bszCaller.fetch("//busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback", function(a) {
    bszTag.Inject(), bszTag.texts(a), bszTag.shows()
}), bszTag = {
    bszs: ["site_pv", "page_pv", "site_uv"],
    texts: function(a) {
        this.bszs.map(function(b) {
            try {
                window.BusuanziMoeCounter["busuanzi_value_" + b] = {};
                window.BusuanziMoeCounter["busuanzi_value_" + b].id = "busuanzi_value_" + b;
                window.BusuanziMoeCounter["busuanzi_value_" + b].content = + a[b];
            } catch (e) {}
        })
    },
    Inject: function () {
        try {
            Function(Element2Inject + ".appendChild(InjectSpan)")();
        } catch (e) {}
        window.BusuanziMoeCounter = [];
    },
    hides: function() {
        this.bszs.map(function(a) {
            var b = document.getElementById("busuanzi_container_" + a);
            b && (b.style.display = "none")
        })
    },
    shows: function() {

        for (var b in window.BusuanziMoeCounter) {
            try {
                document.getElementById(window.BusuanziMoeCounter[b].id).innerHTML =
                    GenCounter(
                        window.BusuanziMoeCounter[b].content,
                        ThemeID,
                        window.BusuanziMoeCounter["busuanzi_value_site_pv"].content.toString().length
                    );
            } catch (e) {}
        }

        this.bszs.map(function(a,) {
            var b = document.getElementById("busuanzi_container_" + a);
            b && (b.style.display = DisplayStyle)
        })

    }

};
