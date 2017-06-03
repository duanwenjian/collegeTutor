<?php
    header('Content-Type:application/text;charset=utf-8');
//    echo "succ";
//  获取页面传来的用户名与密码
    //获取页面传来的数据
    include("connect.php");
    $id=$_POST['id'];
    $status=$_POST['status'];


    $pager=array(
    		'retCode'=>0,//状态码
    		'userinfo'=>null,//用户信息
    		'time'=>$regtime
    	);

    $sql="UPDATE `ct_system_informs` SET `status`=$status WHERE id=$id";
    $res2=mysql_query($sql);
    $pager['retCode']=1;
    echo json_encode($pager);
?>