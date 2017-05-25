<?php
  
$APPID= "1106073817";
$APPSECRET= "QrmGDfus2wY5Zgu4 ";
$code=$_GET['code'];
$token_access_url = "https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=$APPID&client_secret=$APPSECRET&redirect_uri=https://www.collegetutor.cn/qqlogin.html&code=$code;
$res = file_get_contents($token_access_url); //获取文件内容或获取网络请求的内容
echo $res;
//$result = json_decode($res, true); //接受一个 JSON 格式的字符串并且把它转换为 PHP 变量
//$access_token = $result['access_token'];
//echo $access_token;