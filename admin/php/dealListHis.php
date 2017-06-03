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

    $sql="SELECT * FROM `ct_user_history`";
    $res2=mysqli_query($linki,$sql);
        $pager['userinfo']=mysqli_fetch_all($res2,MYSQLI_ASSOC);
        $pager['retCode']=1;
        echo json_encode($pager);
?>