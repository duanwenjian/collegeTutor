<?php
include("../connect.php");
$dealID = trim($_POST['dealID']);
$nowtime = time();
$query = mysql_query("UPDATE `ct_user_deal` SET `status`=1,`agreeTime`=$nowtime WHERE ct_user_deal.id=$dealID");

if(mysql_affected_rows($link)!=1) die(0);
$msg = array(
    'retCode'=>'0',
    'retMsg'=>'已同意'
    );
echo json_encode($msg);