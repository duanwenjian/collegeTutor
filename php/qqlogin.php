<?php
  
$APPID= "1106073817";
$APPSECRET= "QrmGDfus2wY5Zgu4 ";
$code=$_GET['code'];
$token_access_url = "https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=$APPID&client_secret=$APPSECRET&redirect_uri=https://www.collegetutor.cn/qqlogin.html&code=$code;
$res = file_get_contents($token_access_url); //��ȡ�ļ����ݻ��ȡ�������������
echo $res;
//$result = json_decode($res, true); //����һ�� JSON ��ʽ���ַ������Ұ���ת��Ϊ PHP ����
//$access_token = $result['access_token'];
//echo $access_token;