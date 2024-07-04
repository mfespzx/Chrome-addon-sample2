a"use strict";
window.addEventListener("load", (event) => {
    Notification.requestPermission();
    let body = document.getElementById('Content');
    if(body){
        body.style.background = '#cccccc';
        if(location.href.includes("search")){
            window.scrollTo({ 
                top: 500, 
                behavior: 'smooth' 
            });
        }
        let joblist = document.getElementsByClassName('UMNkI');
            if(joblist){
                for(var i = 0; i < 10; i++){
                    const str = joblist[i].textContent;
                    if(str.match(/検索/) || str.match(/コピペ/))){
                        var cookie = document.cookie;
                        if(cookie.match(/crw_sech\=(.*?)\;/)){
                            const match = cookie.match(/crw_sech\=(.*?)\;/);
                            cookie = match[1];
                        } else {
                            cookie = null;
                        }
                        if(cookie != str){
                           document.cookie = "crw_sech=" + str;
                            console.log(workid);
                            const notification = new Notification("Crw Check!");
                        }
                        break;
                    }
                }
            }
    } else {
        if(location.href.includes("search?")){
            let joblist = document.getElementsByClassName('p-search-job-media');
            if(joblist){
                for(var i = 0; i < 10; i++){
                    const str = joblist[i].getElementsByClassName('p-search-job-media__title');
                    let delstr = str[0].getElementsByClassName("p-search-job-media__tags");
                    str[0].removeChild(delstr[0]);
                    const str_af = str[0].textContent;
                    if(str_af.match(/検索/)){
                        var cookie = document.cookie;
                        if(cookie.match(/lan_sech\=(\d{7,})\;/)){
                            const match = cookie.match(/lan_sech\=(\d{7,})\;/);
                            cookie = match[1];
                        } else {
                            cookie = null;
                        }
                        var workid = str[0].href;
                        const match2 = workid.match(/(.*?)\/(\d{7,})/);
                        workid = match2[2];
                        if(cookie != workid){
                            document.cookie = "lan_sech=" + workid;
                            console.log(workid);
                            const notification = new Notification("Lan Check!");
                        }
                        break;
                    }
                }
            }
        }
    }


   document.body.addEventListener("selectstart", () => {
        let fn;
        let e;
        let se;
        var _a, _b;
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

    });
});

