"use strict";
window.addEventListener("load", (event) => {
    document.body.addEventListener("selectstart", () => {
        document.body.addEventListener("keyup", (e) => {
            var _a, _b;
            event.stopImmediatePropagation();
            if ((e.keyCode >= 49 && e.keyCode <= 57) && ((_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.toString())) {
                const selectedText = ((_b = window.getSelection()) === null || _b === void 0 ? void 0 : _b.toString()) || '';
                console.log(selectedText);
                window.open(`http://127.0.0.1/get/getword.php?text=${selectedText}&no=${e.keyCode - 48}`, 'getword');
            }
            else {
                console.log('Fail');
            }
            /*
            $.ajax({
                url:'http://127.0.0.1/get/getword.php',
                type:'GET',
                data:{
                    'text' : selectedText
                }
            })
            // Ajax通信が成功したら発動
            .done( (data) => {
                console.log(data);
            })
            // Ajax通信が失敗したら発動
            .fail( (jqXHR, textStatus, errorThrown) => {
                //alert('Ajax通信に失敗しました。');
                console.log("jqXHR          : " + jqXHR.status); // HTTPステータスを表示
                console.log("textStatus     : " + textStatus);    // タイムアウト、パースエラーなどのエラー情報を表示
                console.log("errorThrown    : " + errorThrown.message); // 例外情報を表示
            })
            // Ajax通信が成功・失敗のどちらでも発動
            .always( (data) => {
            });
            */
        });
    });
});
