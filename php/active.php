<?php
include("connect.php");
$verify = stripslashes(trim($_GET['verify']));
$nowtime = time();
$query = mysql_query("select id,token_exptime from t_user where status='0' and `token`='$verify'");
$row = mysql_fetch_array($query);
if($row){
if($nowtime>$row['token_exptime']){ //30min
$msg = '您的激活有效期已过，请登录您的帐号重新发送激活邮件.';
}else{
mysql_query("update t_user set status=1 where id=".$row['id']);
if(mysql_affected_rows($link)!=1) die(0);
$msg = '激活成功，去登陆！';
}
}else{
$msg = 'error.';
}
echo $msg;