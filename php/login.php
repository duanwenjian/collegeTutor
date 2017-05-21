<?php
    header('Content-Type:application/text;charset=utf-8');
//    echo "succ";
//  获取页面传来的用户名与密码
    //获取页面传来的数据
    include("connect.php");
    $email=$_GET['email'];
    $pwd=md5(trim($_GET['pwd']));

    $pager=array(
    		'retCode'=>null,//状态码
    		'retMsg'=>null,//状态原因
    		'userinfo'=>null,//用户信息
    		'time'=>$regtime
    	);

    $sql="select * from CT_user where email='$email' and password='$pwd'";
    $res=mysql_query($sql);
    $row=mysql_fetch_array($res);
//    sleep(5);
    if($row){
        if($row['status']==0){
            $pager['retCode']=3;
            $pager['retMsg']='该用户尚未激活,请去邮箱激活';
            $pager['userinfo']=null;
            echo json_encode($pager);
        }else{

            $userinfo=array(
                    'userID'=>$row['id'],//用户id
            		'email'=>$row['email'],//邮箱
            		'password'=>$row['password'],//密码
            		'regtime'=>$row['regtime'],//注册时间
            		'username'=>$row['username'],//用户名
            		'Headportrait'=>$row['Headportrait']//头像位置
            	);
            $pager['retCode']=1;
            $pager['retMsg']='登录成功';
            $pager['userinfo']=$userinfo;
            echo json_encode($pager);
    	}
    }else{
        $pager['retCode']=0;
        $pager['retMsg']='用户名或密码错误';
        $pager['userinfo']=null;
        echo json_encode($pager);
    }
?>