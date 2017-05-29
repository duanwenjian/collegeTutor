<?php
include("../connect.php");
$dealID = trim($_POST['dealID']);
$status = trim($_POST['status']);
$nowtime = time();
$query = mysql_query("UPDATE `ct_user_deal` SET `status`=2 WHERE ct_user_deal.id=$dealID");
if(mysql_affected_rows($link)!=1) die(0);
$sql2="INSERT INTO `ct_user_history`(`id`, `relation_id`, `startTime`, `endTime`, `dayTime`, `price`, `week`, `ranks`, `teacherType`, `payType`, `address`, `regtime`, `agreeTime`, `status`) SELECT 'null',`relation_id`, `startTime`, `endTime`, `dayTime`, `price`, `week`, `ranks`, `teacherType`, `payType`, `address`, `regtime`, $nowtime,$status FROM `ct_user_deal` WHERE status=2";
$query2=mysql_query($sql2);
$sql3="DELETE FROM ct_user_deal WHERE ct_user_deal.status=2";
$query3=mysql_query($sql3);
$msg = array(
    'retCode'=>'0',
    'retMsg'=>'已结束'
    );
echo json_encode($msg);