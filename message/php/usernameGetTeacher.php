<?php
	header('Content-Type:application/json;charset=utf-8');
	include("connect.php");
	$username = $_GET['username'];
	$userID=$_GET['id'];
	$pager=array(
			'retCode'=>null,//状态码
			'retMsg'=>null,//状态信息
			'teacherList'=>null,//教师列表
			'time'=>$regtime
		);
		// 检测用户名是否存在
		$sql="SELECT id,username,Headportrait FROM ct_user WHERE username LIKE '%$username%' AND id !=$userID";
        	$res2=mysqli_query($linki,$sql);
        	$pager['teacherList'] = mysqli_fetch_all($res2,MYSQLI_ASSOC);
        	$regtime = time();
	$pager['retCode']=0;
	$pager['retMsg']='查询成功';
	echo json_encode($pager);
