<?php
    header('Content-Type:application/text;charset=utf-8');
//    echo "succ";
//  ��ȡҳ�洫�����û���������
    //��ȡҳ�洫��������
    include("connect.php");
    $userID=$_POST['userID'];


    $pager=array(
    		'retCode'=>0,//״̬��
    		'time'=>$regtime
    	);

    $sql="DELETE FROM `ct_user_admin` WHERE user_id=$userID";
    $res2=mysql_query($sql);
    $pager['retCode']=1;
    echo json_encode($pager);
?>