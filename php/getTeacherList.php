<?php
	header('Content-Type:application/json;charset=utf-8');

	include("connect.php");

	$pageNum=$_GET['pageNum'];

	$returnInfo=[
	    'retCode'=>null,
	    'retMsg'=>null,
	    'time'=>$regtime,
	    'retData'=>null
	];

	// 向客户端输出的数据
	$pager=[
		'recordCount'=>0,//总记录数
		'pageSize'=>15,//页面大小
		'pageCount'=>0,//总页数
		'pageNum'=>intval($pageNum),//当前页号
		'data'=>null//当前页的数据
	];

	// 获取总记录数
	$sql2="SELECT COUNT(*) as count FROM `ct_user_teacher` WHERE status=0";
	$res=mysql_query($sql2);
	$row=mysql_fetch_assoc($res);
	mysql_close();
	//字符串转为整数
	$pager['recordCount']=intval($row['count']);

	//总页数
	$pager['pageCount']=ceil(($pager['recordCount'])/($pager['pageSize']));

	//获取当前制定页中的数据
	$start=($pager['pageNum']-1)*$pager['pageSize'];
	$count=$pager['pageSize'];
	// echo $start;
	// echo $count;
	//当前页的数据
	$sql3="SELECT ct_user_teacher.id,ct_user.username,ct_user.id, ct_user_teacher.major, ct_user_teacher.Price, ct_user_teacher.Grade, ct_user_teacher.Subject, ct_user_teacher.birth, ct_user_teacher.sex, ct_user_teacher.regtime, ct_user_teacher.Remarks,ct_user.Headportrait FROM `ct_user_teacher` ,`ct_user` WHERE ct_user_teacher.user_id=ct_user.id AND ct_user_teacher.status=0  ORDER BY ct_user_teacher.id LIMIT $start,$count";

	$res3=mysqli_query($linki,$sql3);



	$pager['data']=mysqli_fetch_all($res3,MYSQLI_ASSOC);
//    $pager['data']=mysql_fetch_assoc($res3);
	//模拟网络环境
	$returnInfo['retCode']=0;
	$returnInfo['retMsg']="查询成功";
	$returnInfo['retData']=$pager;
//	sleep(5);
	// 编码输出
	echo json_encode($returnInfo);
	// print_r($row);
?>