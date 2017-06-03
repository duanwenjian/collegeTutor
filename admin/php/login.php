<?php
    header('Content-Type:application/text;charset=utf-8');
//    echo "succ";
//  获取页面传来的用户名与密码
    //获取页面传来的数据
    include("connect.php");
    $email=$_GET['email'];
    $pwd=md5(trim($_GET['pwd']));

    $pager=array(
    		'retCode'=>0,//状态码
    		'userinfo'=>null,//用户信息
    		'time'=>$regtime
    	);

    $sql="SELECT ct_user.username,ct_user.Headportrait,ct_user.email,ct_user_admin.Jurisdiction,ct_user_admin.id FROM CT_user, ct_user_admin WHERE ct_user.id = ct_user_admin.user_id AND email = '$email' AND PASSWORD = '$pwd' AND ct_user_admin.status=0";
    $res=mysql_query($sql);
    $row=mysql_fetch_array($res);
    if($row){
         $pager['retCode']=0;
        $pager['userinfo']=$row;
    }else{
        $pager['retCode']=1;
    }
    echo json_encode($pager);
?>