<?php
require_once './vendor/autoload.php';

class MyClient extends \Goutte\Client
{
    /**
     * @var array $ua  ユーザーエージェントのリスト
     */
    protected $ua = [
        'pc.chrome' => 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.110 Safari/537.36',
        'sp.safari' => 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
        'bot.google' => 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    ];

    /**
     * ユーザーエージェントを切り替える
     *
     * @param  string  $platform
     * @return MyClient
     */
    public function setUserAgent(string $platform)
    {
        $this->setServerParameters(['HTTP_USER_AGENT' => $this->ua[$platform]]);
        return $this;
    }
}
    $s_url = $_GET['url'];
    $se = $_GET['se'];

    if(isset($_GET['no'])){
        $no = $_GET['no'];
        //$no = $no - 1;
        if($se != "g"){
            $s_url = $s_url. "&b=" .$no;
        }
    } else { 
        $no = 0;
    }

    $client = new MyClient();
    $crawler = $client->setUserAgent('sp.safari')->request('GET', $s_url);
// 旧$url = $crawler->filter('a.sw-Card__space')->eq($no)->attr('href');
/*
$check = $crawler->filter('.sw-CardBase')->text();
if(preg_match('/(.*)他の人は(.*)/', $check)){
echo "test";exit;
}
*/
//print_r($crawler->filter('body')->html());exit;
    if($se != "g"){
        $url = $crawler->filter('.sw-CardBase .Algo section a')->attr('href');
    } else { // google
        $no = ltrim($no, "0") - 1;
        $url = $crawler->filter('.egMi0 a')->eq($no)->attr('href');
        preg_match("/^\/url\?q=(.*)&sa(.*)/", $url, $match);
        $url = $match[1];
    }
    if(isset($_GET['ajax'])){ 
        echo( $url );exit;
    } else {
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    <script type="text/javascript" src="jq.js"></script>
    <script type="text/javascript">
    /*    setTimeout(function () {
            window.open('about:blank', '_self').close();
        }, 500);
    */
    </script>
</head>
<body>
<ol>
<?php
        echo $url;
    }

    if(!preg_match("/javascript(.*)/", $url) && !preg_match("|(.*)auctions.yahoo.co.jp(.*)|", $url) && !preg_match("|(.*)/amp(.*)|", $url) && !preg_match("|(.*)/rd\.(.*)|", $url)){
        $fp = fopen("urlfile.txt","a");
        fwrite($fp, $url."\n");
        fclose($fp);
?>
    <script type="text/javascript">
        setTimeout(function () {
            window.open('about:blank', '_self').close();
        }, 300);
<?php
    } else {
?>
    <script type="text/javascript">
        location.href = "<?php echo $s_url;?>";
<?php
    }
?>
    </script>
</body>
</html>
