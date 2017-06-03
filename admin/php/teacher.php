<?php
    header('Content-Type:application/text;charset=utf-8');
//    echo "succ";
//  获取页面传来的用户名与密码
    //获取页面传来的数据
    include("connect.php");


    $pager=array(
    		'retCode'=>0,//状态码
    		'userinfo'=>null,//用户信息
    		'time'=>$regtime
    	);

    $sql="SELECT ct_user.username,ct_user_teacher.id,ct_user_teacher.major,ct_user_teacher.Price,ct_user_teacher.Grade,ct_user_teacher.Subject,ct_user_teacher.birth,ct_user_teacher.sex,ct_user_teacher.cardAddress,ct_user_teacher.Remarks,ct_user_teacher.status,ct_user_teacher.regtime,ct_user_teacher.reason,ct_user_teacher.rank FROM `ct_user_teacher`,ct_user WHERE ct_user.id=ct_user_teacher.user_id AND ct_user.id!=1 ORDER BY ct_user_teacher.id ASC";
    $res2=mysqli_query($linki,$sql);
    $pager['userinfo']=mysqli_fetch_all($res2,MYSQLI_ASSOC);
    $pager['retCode']=1;
    echo json_encode($pager);
?>