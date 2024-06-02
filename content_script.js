"use strict";
window.addEventListener("load", (event) => {
    document.body.addEventListener("selectstart", () => {
        document.body.addEventListener("keyup", (e) => {
            var _a, _b;
            event.stopImmediatePropagation();
			if(e.keyCode === 49 || e.keyCode === 48){
                document.body.addEventListener("keyup", (e2) => {
                    event.stopImmediatePropagation();
		            if ((e2.keyCode >= 49 && e2.keyCode <= 57) && ((_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.toString())) {
		                const selectedText = ((_b = window.getSelection()) === null || _b === void 0 ? void 0 : _b.toString()) || '';
		                console.log(selectedText);
		                window.open(`http://127.0.0.1/get/getword.php?text=${selectedText}&no=${e.keyCode - 48}${e2.keyCode - 48}`, 'getword');
		            } else {
                        console.log('Fail');
		            }
                });
            }
        });
    });
});
