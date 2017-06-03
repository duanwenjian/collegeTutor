<?php
    header('Content-Type:application/text;charset=utf-8');
    //获取页面传来的数据
    include("connect.php");
    $userID=$_POST['userID'];
    $text=$_POST['text'];
    $title=$_POST['title'];


    $pager=array(
    		'retCode'=>0,//状态码
    		'userinfo'=>null,//用户信息
    		'time'=>$regtime
    	);

    $sql="INSERT INTO `ct_system_informs`(`id`, `admin_id`, `type`, `status`, `Displaymode`, `content`, `title`, `ReleaseTime`, `regtime`) VALUES (null,$userID,'text','0',0,'$text','$title',$regtime,$regtime)";
    $res2=mysql_query($sql);
    echo json_encode(array('retCode'=>1));
?>