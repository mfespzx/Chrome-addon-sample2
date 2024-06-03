"use strict";
window.addEventListener("load", (event) => {
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

