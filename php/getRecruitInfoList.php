
<?php
	header('Content-Type:application/json;charset=utf-8');
//招聘信息表

	include("connect.php");

	$pageNum=$_GET['pageNum'];

	$returnInfo=array(
	    'retCode'=>null,
	    'retMsg'=>null,
	    'time'=>$regtime,
	    'retData'=>null
	);

	// 向客户端输出的数据
	$pager=array(
		'recordCount'=>1,//总记录数
		'pageSize'=>10,//页面大小
		'pageCount'=>0,//总页数
		'pageNum'=>intval($pageNum),//当前页号
		'data'=>null//当前页的数据
	);

	// 获取总记录数
	$sql2="SELECT COUNT(*) as count FROM `ct_recruit_informs`";
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
	$sql3="SELECT * FROM `ct_recruit_informs` WHERE 1 ORDER BY ct_recruit_informs.regtime LIMIT $start,$count";

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