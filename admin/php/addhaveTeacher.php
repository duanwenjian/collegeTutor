<?php
    header('Content-Type:application/text;charset=utf-8');
    //获取页面传来的数据
    include("connect.php");
    $userid=$_POST['userid'];
    $i1=$_POST['i1'];
    $i2=$_POST['i2'];
    $i3=$_POST['i3'];
    $i4=$_POST['i4'];
    $i5=$_POST['i5'];



    $pager=array(
    		'retCode'=>0,//状态码
    		'userinfo'=>null,//用户信息
    		'time'=>$regtime
    	);

    $sql="INSERT INTO `ct_recruit_informs`(`id`,`user_id`,`major`,`Price`,`Subject`,`birth`,`sex`,`Remarks`,`regtime`) VALUES(null,$userid,'$i1','$i2','$i3',1234567895,'$i4','$i5',$regtime)";
    $res2=mysql_query($sql);
    echo json_encode(array('retCode'=>1));
?>