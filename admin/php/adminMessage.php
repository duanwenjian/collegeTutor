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

    $sql="SELECT ct_system_informs.id,ct_user.username,ct_system_informs.admin_id,ct_system_informs.type,ct_system_informs.Displaymode,ct_system_informs.content,ct_system_informs.title,ct_system_informs.ReleaseTime,ct_system_informs.regtime FROM `ct_system_informs`, ct_user_admin, ct_user WHERE ct_user_admin.id = ct_system_informs.admin_id AND ct_user.id = ct_user_admin.user_id AND ct_system_informs.status=0 ORDER BY id ASC";
    $res2=mysqli_query($linki,$sql);
    $pager['userinfo']=mysqli_fetch_all($res2,MYSQLI_ASSOC);
    $pager['retCode']=1;
    echo json_encode($pager);
?>