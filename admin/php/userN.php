<?php
    header('Content-Type:application/text;charset=utf-8');
//    echo "succ";
//  获取页面传来的用户名与密码
    //获取页面传来的数据
    include("connect.php");
    $status=$_POST['status'];
    $ID=$_POST['id'];


    $pager=array(
    		'retCode'=>0,//状态码
    		'userinfo'=>null,//用户信息
    		'time'=>$regtime
    	);

    $sql="UPDATE `ct_user` SET `status`=$status WHERE id=$ID;";
    $res2=mysqli_query($linki,$sql);
    echo json_encode(array('retCode'=>1));
?>