<?php
	header('Content-Type:application/json;charset=utf-8');

include("connect.php");
$email = stripslashes(trim($_GET['email']));
// 检测用户名是否存在
$query = mysql_query("select id from CT_user where email='$email'");
$num = mysql_num_rows($query);
$pager=[
		'retCode'=>null,//状态码
		'retMsg'=>null,//状态信息
		'time'=>$regtime
	];
if($num==1){
$pager['retCode']=0;
$pager['retMsg']='该邮箱已被注册';
echo json_encode($pager);
}else{
$pager['retCode']=1;
$pager['retMsg']='该邮箱可用';
echo json_encode($pager);
}