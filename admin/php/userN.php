<?php
    header('Content-Type:application/text;charset=utf-8');
//    echo "succ";
//  ��ȡҳ�洫�����û���������
    //��ȡҳ�洫��������
    include("connect.php");
    $status=$_POST['status'];
    $ID=$_POST['id'];


    $pager=array(
    		'retCode'=>0,//״̬��
    		'userinfo'=>null,//�û���Ϣ
    		'time'=>$regtime
    	);

    $sql="UPDATE `ct_user` SET `status`=$status WHERE id=$ID;";
    $res2=mysqli_query($linki,$sql);
    echo json_encode(array('retCode'=>1));
?>