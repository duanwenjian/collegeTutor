<?php
include("connect.php");
$verify = stripslashes(trim($_POST['verify']));
$pwd=md5($_POST['pwd']);
$email=$_POST['email'];
$nowtime = time();
$query = mysql_query("select id,token_exptime from CT_user where status='1' and `token`='$verify'");

$row = mysql_fetch_array($query);
if($row){
    if($nowtime>$row['token_exptime']){ //30min
        $msg = '您的激活有效期已过，请登录您的帐号重新发送激活邮件.';
    }else{
        mysql_query("update CT_user set password='$pwd' where email='$email'");
    if(mysql_affected_rows($link)!=1) die(0);
        $msg = array('retCode'=>1);
    }
}else{
    $msg = array('retCode'=>0);
}
echo json_encode($msg);