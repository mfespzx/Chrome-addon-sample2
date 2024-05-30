<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
	<script type="text/javascript" src="jq.js"></script>
	<script type="text/javascript">
		setTimeout(function () {
			window.open('about:blank', '_self').close();
		}, 1000);
	</script>

</head>
<body>
<?php
	$url = $_GET['url'];
	echo $url;
	$fp = fopen("urlfile.txt","a");
	fwrite($fp, $url."\n");
	fclose($fp);

?>

</body>
</html>