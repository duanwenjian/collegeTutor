<?php
    header('Content-Type:application/text;charset=utf-8');
//    echo "succ";
//  ��ȡҳ�洫�����û���������
    //��ȡҳ�洫��������
    include("connect.php");
    $id=$_POST['id'];
    $status=$_POST['status'];


    $pager=array(
    		'retCode'=>0,//״̬��
    		'userinfo'=>null,//�û���Ϣ
    		'time'=>$regtime
    	);

    $sql="UPDATE `ct_system_informs` SET `status`=$status WHERE id=$id";
    $res2=mysql_query($sql);
    $pager['retCode']=1;
    echo json_encode($pager);
?>