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

    $sql="SELECT * FROM `ct_user_history`";
    $res2=mysqli_query($linki,$sql);
        $pager['userinfo']=mysqli_fetch_all($res2,MYSQLI_ASSOC);
        $pager['retCode']=1;
        echo json_encode($pager);
?>