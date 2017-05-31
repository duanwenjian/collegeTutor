<?php
    header('Content-Type:application/text;charset=utf-8');
//    echo "succ";
//  获取页面传来的用户名与密码
    //获取页面传来的数据
    include("../connect.php");
    $text=$_POST['text'];
    $teacherid=$_POST['teacherid'];
    $userid=$_POST['userid'];
    $start=$_POST['start'];

    $pager=array(
        		'retCode'=>0,//�
        		'time'=>$regtime
        	);

        $sql2="INSERT INTO `ct_teacher_evaluate`(`id`,`from_user_id`,`to_teacher_id`,`content`,`talkGrade`,`talkLike`,`regtime`) VALUES(null,$userid,$teacherid,'$text',$start,1,$regtime)";
        //echo $sql2;
            $res2=mysqli_query($linki,$sql2);

        $pager['retCode']=1;
        echo json_encode($pager);
?>
