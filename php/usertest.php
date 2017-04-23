<?php
	header('Content-Type:application/json;charset=utf-8');
	include("connect.php");
	$username = stripslashes(trim($_GET['username']));
	// 检测用户名是否存在
	$query = mysql_query("select id from CT_user where username='$username'");
	$num = mysql_num_rows($query);
	$regtime = time();
	$pager=[
			'retCode'=>null,//状态码
			'retMsg'=>null,//状态信息
			'time'=>$regtime
		];
	if($num==1){
	$pager['retCode']=0;
	$pager['retMsg']='该用户名已存在';
	echo json_encode($pager);
	}else{
	$pager['retCode']=1;
	$pager['retMsg']='该用户名可用';
	echo json_encode($pager);
}
