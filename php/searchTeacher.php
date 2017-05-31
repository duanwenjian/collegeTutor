<?php
    header('Content-Type:application/text;charset=utf-8');
//    echo "succ";
//  获取页面传来的用户名与密码
    //获取页面传来的数据
    include("connect.php");
    $word=$_GET['word'];

    $pager=array(
        		'retCode'=>0,//�
        		'teacherInfo'=>null,
        		'time'=>$regtime
        	);

        $sql2="SELECT ct_user_teacher.id, ct_user_teacher.user_id, ct_user_teacher.major, ct_user_teacher.Price, ct_user_teacher.Grade, ct_user_teacher.Subject, ct_user_teacher.birth, ct_user_teacher.sex, ct_user_teacher.cardAddress, ct_user_teacher.Remarks, ct_user_teacher.status, ct_user_teacher.regtime, ct_user_teacher.reason, ct_user_teacher.rank, ct_user.username, ct_user.Headportrait FROM `ct_user_teacher`, ct_user WHERE ct_user_teacher.status = '0' AND ct_user.id = ct_user_teacher.user_id AND( ct_user_teacher.Subject LIKE '%$word%' OR ct_user.username LIKE '%$word%' OR ct_user_teacher.major LIKE '%$word%' OR ct_user_teacher.Price LIKE '%$word%' OR ct_user_teacher.Remarks LIKE '%$word%' OR ct_user_teacher.Grade LIKE '%$word%' ) GROUP BY ct_user_teacher.id";
        //echo $sql2;
            $res2=mysqli_query($linki,$sql2);
            $pager['teacherInfo']=mysqli_fetch_all($res2,MYSQLI_ASSOC);
        $pager['retCode']=1;
        echo json_encode($pager);
?>
