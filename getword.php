<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    <script type="text/javascript" src="jq.js"></script>
    <script type="text/javascript">
        setTimeout(function () {
            //window.open('about:blank', '_self').close();
        }, 500);
    </script>
</head>
<body>
<form action="./writeurl.php" method="GET" id="writeurl">
<?php

    $no = $_GET['no'];
    echo '<input type="number" class="serchno" value="'.$no.'" name="no" style="width: 3em;">';
    $se = $_GET['se'];
    echo '<input type="text" class="se" value="'.$se.'" name="se" style="width: 3em;">';
    $text = $_GET['text'];
    if($se == 'g'){
        echo '<input type="text" class="serchtext" value="https://www.google.com/search?q='.$text.'" name="text" style="width: 700px;">';
    } else {
        echo '<input type="text" class="serchtext" value="https://search.yahoo.co.jp/search?p='.$text.'" name="text" style="width: 700px;">';
    }

    if(mb_strlen($text) >= 1){
        //echo $text;
        $fp = fopen("wordfile.txt","a");
        fwrite($fp, $text."\n");
        fclose($fp);
    } else {
        echo "文字数小";exit;
    }

?>
    <input type="button" class="getajax" value="getAjax"><br>
    <textarea type="text" name="url" class="ajaxres" style="width: 700px;"></textarea>
    <input type="button" class="copy" value="copy"><input type="button" class="res" value="write">
</form>

<script type="text/javascript">
    $(function(){
      // 「Ajax通信」ボタンをクリックしたら発動
        $('.getajax').on('click',function(){
            var no = $(this).val();
            var index = $('.getajax').index(this);
            $.ajax({
                url:'./geturl.php',
                type:'GET',
                data:{
                    'url': ""  + $('.serchtext').val() + "",
                    'ajax' : "1",
                    'no' : $('.serchno').val(),
                    'se' : $('.se').val()
                }
            })
            // Ajax通信が成功したら発動
            .done( (data) => {
                console.log(data);
                $('.ajaxres').eq(index).val(data);
                navigator.clipboard.writeText(data);
                setTimeout(function () {
                    window.open('about:blank', '_self').close();
                }, 500);
            })
            // Ajax通信が失敗したら発動
            .fail( (jqXHR, textStatus, errorThrown) => {
                alert('Ajax通信に失敗しました。');
                console.log("jqXHR          : " + jqXHR.status); // HTTPステータスを表示
                console.log("textStatus     : " + textStatus);    // タイムアウト、パースエラーなどのエラー情報を表示
                console.log("errorThrown    : " + errorThrown.message); // 例外情報を表示
            })
            // Ajax通信が成功・失敗のどちらでも発動
            .always( (data) => {
            });
        });

        $('.res').on('click', function(){
            $('#writeurl').submit();
        });

        $('.copy').on('click', function(){
            var ajaxres = $('.ajaxres').val();
            navigator.clipboard.writeText(ajaxres);
        });


    });

    $(document).ready(function () {
        var no = $(this).val();
        var index = $('.getajax').index(this);
        $.ajax({
            url:'./geturl.php',
            type:'GET',
            data:{
                'url': "" + $('.serchtext').val() + "",
                'ajax' : "1",
                'no' :  $('.serchno').val(),
                'se' : $('.se').val()
            }
        })
        // Ajax通信が成功したら発動
        .done( (data) => {
            console.log(data);
            $('.ajaxres').eq(index).val(data);
            navigator.clipboard.writeText(data);
            setTimeout(function () {
                window.open('about:blank', '_self').close();
            }, 500);
        })
        // Ajax通信が失敗したら発動
        .fail( (jqXHR, textStatus, errorThrown) => {
            alert('Ajax通信に失敗しました。');
            console.log("jqXHR          : " + jqXHR.status); // HTTPステータスを表示
            console.log("textStatus     : " + textStatus);    // タイムアウト、パースエラーなどのエラー情報を表示
            console.log("errorThrown    : " + errorThrown.message); // 例外情報を表示
        })
        // Ajax通信が成功・失敗のどちらでも発動
        .always( (data) => {
        });

        $('.res').on('click', function(){
            $('#writeurl').submit();
        });
    });

</script>
</body>
