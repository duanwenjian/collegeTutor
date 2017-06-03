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

    $sql="SELECT `id`, `username`, `status`, `regtime`, `Headportrait` FROM `ct_user` WHERE id IN (SELECT ct_user_admin.user_id FROM ct_user_admin WHERE id!=1) AND status=1 ORDER BY id ASC";
    $res2=mysqli_query($linki,$sql);
    $pager['userinfo']=mysqli_fetch_all($res2,MYSQLI_ASSOC);
    $pager['retCode']=1;
    echo json_encode($pager);
?>