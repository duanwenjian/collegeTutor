<?php
    header('Content-Type:application/text;charset=utf-8');
//    echo "succ";
//  ��ȡҳ�洫�����û���������
    //��ȡҳ�洫��������
    include("connect.php");


    $pager=array(
    		'retCode'=>0,//״̬��
    		'userinfo'=>null,//�û���Ϣ
    		'time'=>$regtime
    	);

    $sql="SELECT `id`, `username`, `status`, `regtime`, `Headportrait` FROM `ct_user` WHERE id IN (SELECT ct_user_admin.user_id FROM ct_user_admin WHERE id!=1) AND status=1 ORDER BY id ASC";
    $res2=mysqli_query($linki,$sql);
    $pager['userinfo']=mysqli_fetch_all($res2,MYSQLI_ASSOC);
    $pager['retCode']=1;
    echo json_encode($pager);
?>