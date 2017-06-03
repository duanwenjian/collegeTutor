<?php
    header('Content-Type:application/text;charset=utf-8');
    //获取页面传来的数据
    include("connect.php");
    $status=$_POST['status'];
    $ID=$_POST['id'];
    $text=$_POST['text'];


    $pager=array(
    		'retCode'=>0,//状态码
    		'userinfo'=>null,//用户信息
    		'time'=>$regtime
    	);

    $sql="UPDATE `ct_user_teacher` SET `status`=$status,`reason`='$text' WHERE id=$ID;";
    $res2=mysqli_query($linki,$sql);
    echo json_encode(array('retCode'=>1));
?>