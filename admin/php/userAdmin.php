<?php
    header('Content-Type:application/text;charset=utf-8');
//    echo "succ";
//  获取页面传来的用户名与密码
    //获取页面传来的数据
    include("connect.php");
    $userID=$_POST['userID'];
    $status=$_POST['status'];


    $pager=array(
    		'retCode'=>0,//状态码
    		'time'=>$regtime
    	);

    $sql="INSERT INTO `ct_user_admin`(`id`, `user_id`, `OperationPassword`, `Jurisdiction`, `status`, `regtime`) VALUES (null,$userID,123456,$status,0,$regtime)";
    $res2=mysqli_query($linki,$sql);
    $pager['retCode']=1;
    echo json_encode($pager);
?>