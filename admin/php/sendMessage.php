<?php
    header('Content-Type:application/text;charset=utf-8');
    //��ȡҳ�洫��������
    include("connect.php");
    $userID=$_POST['userID'];
    $text=$_POST['text'];
    $title=$_POST['title'];


    $pager=array(
    		'retCode'=>0,//״̬��
    		'userinfo'=>null,//�û���Ϣ
    		'time'=>$regtime
    	);

    $sql="INSERT INTO `ct_system_informs`(`id`, `admin_id`, `type`, `status`, `Displaymode`, `content`, `title`, `ReleaseTime`, `regtime`) VALUES (null,$userID,'text','0',0,'$text','$title',$regtime,$regtime)";
    $res2=mysql_query($sql);
    echo json_encode(array('retCode'=>1));
?>