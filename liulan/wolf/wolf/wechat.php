<?php
//文件路径
$file = 'js/token.txt';
//文件修改时间
$up_time=filemtime($file);
//时间差   7200
$timec=time()-$up_time;

//微信appid
$appid = "xxxxxxxxxxx";
$secret = "xxxxxxxxxxxxxxxxx";

if (file_exists($file) && $timec <= 7200) {
	$token = file_get_contents($file);
}else{
	if ($_POST['url']) {
		$url = $_POST['url'];
		//判断
		$content = json_decode(file_get_contents("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$appid&secret=$secret"),true);
	    $token = $content['access_token'];
	}else{
		$result = "{\"signature\":\"" . '' . "\",\"timestamp\":\"" . '' . "\",\"noncestr\":\"" . '' . "\"}";
		die($result);
	}
}
$qm = json_decode(file_get_contents("https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=".$token."&type=jsapi"),true);
$noncestr = "Wm3WZYTPz0wzccnd";
$jsapi_ticket = $qm['ticket'];
$timestamp = time();
$string = sha1("jsapi_ticket=$jsapi_ticket&noncestr=$noncestr&timestamp=$timestamp&url=$url");
$result = "{\"access_token\":\"" . $token . "\" , \"signature\":\"" . $string . "\" , \"timestamp\":\"" . $timestamp . "\" , \"noncestr\":\"" . $noncestr . "\"}";
die($result);