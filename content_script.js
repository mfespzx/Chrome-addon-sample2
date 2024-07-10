"use strict";
window.addEventListener("load", function (event) {
    Notification.requestPermission();
    var body = document.getElementById('Content');
    if (body && location.href.includes("crowdworks.jp")) { // 一覧画面(CW)
        body.style.background = '#aaaaaa';
        if (location.href.includes("search")) {
            window.scrollTo({
                top: 500,
                behavior: 'smooth'
            });
            setTimeout(cw_job, 2000);
        }
    }
    else if (location.href.includes("lancers.jp/work/search")) { // 一覧画面(LS)
        var body2 = document.getElementsByClassName('l-wrapper');
        var back = body2[0].getElementsByClassName('p-search-job');
        var back2 = body2[0].getElementsByClassName('p-search-job__right');
        back[0].style.background = '#999999';
        back2[0].style.background = '#999999';
        if (location.href.includes("search?")) {
            var joblist = document.getElementsByClassName('p-search-job-media');
            if (Object.prototype.toString.call(joblist) === "[object HTMLCollection]") {
                for (var i = 0; i < 20; i++) {
                    if (joblist[i] !== null) {
                        var str = joblist[i].getElementsByClassName('p-search-job-media__title');
                        var delstr = str[0].getElementsByClassName("p-search-job-media__tags");
                        str[0].removeChild(delstr[0]);
                        var str_af = str[0].textContent;
                        if (str_af) {
                            str_af.replace(/\s+/g, '');
                            if (str_af.match(/スマホで/) || str_af.match(/検索/) || str_af.match(/コピペ/) || str_af.match(/学術/) || str_af.match(/心理学/) || str_af.match(/ヘッドホン/)) {
                                var workid = str[0].href;
                                var match2 = workid.match(/(.*?)\/(\d{7,})/);
                                if (match2) {
                                    workid = match2[2];
                                    var lan_url = sessionStorage.getItem('lan_url');
                                    var lan_sech = sessionStorage.getItem('lan_sech');
                                    console.log("url:" + lan_url);
                                    console.log("st:" + str_af);
                                    if (lan_url !== workid) {
                                        sessionStorage.setItem('lan_sech', str_af);
                                        sessionStorage.setItem('lan_url', workid);
                                        console.log("id:" + workid);
                                        new Notification("Lan Check!" + str_af);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            else {
                new Notification(joblist.toString());
            }
        }
    }
    function cw_job() {
        var joblist = document.getElementsByClassName('UMNkI');
        if (Object.prototype.toString.call(joblist) === "[object HTMLCollection]") {
            for (var i = 0; i < 20; i++) {
                if (joblist[i] !== null) {
                    var str = joblist[i].textContent;
                    var strUrl = joblist[i].href;
                    if (str) {
                        if (str.match(/検索/) || str.match(/コピペ/) || str.match(/心理学/) || str.match(/学術/) || str.match(/ヘッドホン/)) {
                            var crw_url = sessionStorage.getItem('crw_url');
                            var crw_sech = sessionStorage.getItem('crw_sech');
                            console.log("st:" + str);
                            console.log("url:" + crw_url);
                            if (strUrl !== crw_url) {
                                sessionStorage.setItem('crw_sech', str);
                                sessionStorage.setItem('crw_url', strUrl);
                                new Notification("Crw Check!" + str);
                            }
                            break;
                        }
                    }
                }
            }
        }
        else {
            new Notification(joblist.toString());
        }
    }
    if (location.href.includes("lancers.jp/") || location.href.includes("crowdworks.jp/") || location.href.includes("lockkanre.com/")) {
        document.body.addEventListener("selectstart", function () {
            var fn;
            var e;
            var se;
            var _a, _b;
            document.body.addEventListener("keyup", fn = function (e) {
                e.stopImmediatePropagation();
                document.body.removeEventListener("keyup", fn);
                if (e.keyCode === 0x10) {
                    var selectedText = ((_b = window.getSelection()) === null || _b === void 0 ? void 0 : _b.toString()) || '';
                    console.log(selectedText);
                    window.open("http://127.0.0.1/get/getword.php?text=".concat(selectedText), 'getword');
                }
            });
            /*
            document.body.addEventListener("keyup", fn = (e) => {
                event.stopImmediatePropagation();
                document.body.removeEventListener("keyup", fn);
                if(e.keyCode === 96 || e.keyCode === 97){
                    searchNum(e, se = 0);
                } else if (e.keyCode === 71){ // search Google
                    document.body.addEventListener("keyup", fn = (e) => {
                        event.stopImmediatePropagation();
                        document.body.removeEventListener("keyup", fn);
                        if(e.keyCode === 96 || e.keyCode === 97){
                            searchNum(e, se = "g");
                        }
                    });
                }
            });

            function searchNum(e, se){
                let fn2;
                document.body.addEventListener("keyup", fn2 = (e2) => {
                    event.stopImmediatePropagation();
                    document.body.removeEventListener("keyup", fn2);
                    if ((e2.keyCode >= 96 && e2.keyCode <= 105) && ((_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.toString())) {
                        const selectedText = ((_b = window.getSelection()) === null || _b === void 0 ? void 0 : _b.toString()) || '';
                        console.log(selectedText);
                        window.open(`http://127.0.0.1/get/getword.php?text=${selectedText}&no=${e.keyCode - 96}${e2.keyCode - 96}&se=${se}`, 'getword');
                    } else {
                        console.log('Fail');
                    }
                });
            }
            */
        });
    }
});
