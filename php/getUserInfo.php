<?php
	header('Content-Type:application/json;charset=utf-8');
	include("connect.php");
	$userID=$_GET['userID'];

	$regtime = time();
            $pager=array(
                    'retCode'=>0,//状态码
                    'retMsg'=>'查询成功',//状态信息
                    'dealInfo'=>null,//交易
                    'teacherFeedBack'=>null,//教师评价
                    'time'=>$regtime
                );
    $sql1="SELECT * FROM `ct_user_teacher` WHERE ct_user_teacher.user_id=$userID";
    $res=mysql_query($sql1);
    $row=mysql_fetch_array($res);
    if($row){
        $sql2 ="SELECT ct_user.username,ct_user.id,ct_user_deal.startTime,ct_user_deal.endTime,ct_user_deal.week,ct_user_deal.price FROM `ct_user_deal`,ct_user_relation,ct_user WHERE ct_user.id=ct_user_relation.user_id_from AND ct_user_relation.id=ct_user_deal.relation_id AND ct_user_relation.user_id_to=$userID";
        $res2=mysqli_query($linki,$sql2);
        $pager['dealInfo']=mysqli_fetch_all($res2,MYSQLI_ASSOC);

        $sql3 = "SELECT ct_teacher_evaluate.talkGrade FROM `ct_teacher_evaluate` WHERE ct_teacher_evaluate.to_teacher_id=$userID";
        $res3=mysqli_query($linki,$sql3);
        $pager['teacherFeedBack']=mysqli_fetch_all($res3,MYSQLI_ASSOC);
    }else{
        $sql2 ="SELECT ct_user.username,ct_user.id,ct_user_deal.startTime,ct_user_deal.endTime,ct_user_deal.week,ct_user_deal.price FROM `ct_user_deal`,ct_user_relation,ct_user WHERE ct_user.id=ct_user_relation.user_id_to AND ct_user_relation.id=ct_user_deal.relation_id AND ct_user_relation.user_id_from=$userID";
        $res2=mysqli_query($linki,$sql2);
        $pager['dealInfo']=mysqli_fetch_all($res2,MYSQLI_ASSOC);

        $sql3 = "SELECT ct_teacher_evaluate.talkGrade FROM `ct_teacher_evaluate`,ct_user_teacher,ct_user WHERE ct_user_teacher.user_id=ct_user.id AND ct_user_teacher.id = ct_teacher_evaluate.from_user_id AND ct_user.id=$userID";
        $res3=mysqli_query($linki,$sql3);
        $pager['teacherFeedBack']=mysqli_fetch_all($res3,MYSQLI_ASSOC);
    }

    echo json_encode($pager);
