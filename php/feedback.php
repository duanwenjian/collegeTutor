<?php
    header('Content-Type:application/text;charset=utf-8');
//    echo "succ";
//  获取页面传来的用户名与密码
    //获取页面传来的数据
    include("connect.php");
    $text=$_POST['text'];

    $pager=array(
        		'retCode'=>0,//�
        		'time'=>$regtime
        	);

        $sql2="INSERT INTO `ct_user_feedback`( `id`, `admin_id`, `content`, `img`, `status`, `regtime`) VALUES(null,1,'$text','',0,$regtime)";
        //echo $sql2;
            $res2=mysqli_query($linki,$sql2);

        $pager['retCode']=1;
        echo json_encode($pager);
?>
