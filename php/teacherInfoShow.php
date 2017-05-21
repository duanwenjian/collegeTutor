<?php
	header('Content-Type:application/json;charset=utf-8');

	include("connect.php");

	$userID=$_GET['userID'];

	$returnInfo=array(
	    'retCode'=>'',
	    'retMsg'=>'',
	    'time'=>$regtime,
	    'teacherInfo'=>null,//教师信息
	    'talkInfoList'=>null//评论列表
	);
	try{
        $sql="SELECT ct_user.id,ct_user.username,ct_user.email, ct_user_teacher.major, ct_user_teacher.Price,ct_user_teacher.rank, ct_user_teacher.Grade, ct_user_teacher.Subject, ct_user_teacher.birth, ct_user_teacher.sex, ct_user_teacher.cardAddress, ct_user_teacher.Remarks, ct_user_teacher.status, ct_user_teacher.regtime, ct_user_teacher.reason FROM `ct_user_teacher`,`ct_user` WHERE ct_user_teacher.user_id=ct_user.id AND ct_user_teacher.id='$userID'";
        $res=mysql_query($sql);
        $row=mysql_fetch_array($res);
        $returnInfo['retCode']=0;
        $returnInfo['retMsg']='查询成功';
        $returnInfo['teacherInfo']=array(
            'rank'=>$row['rank'],
            'email'=>$row['email'],
            'Grade'=>$row['Grade'],
            'Price'=>$row['Price'],
            'Remarks'=>$row['Remarks'],
            'Subject'=>$row['Subject'],
            'birth'=>$row['birth'],
            'cardAddress'=>$row['cardAddress'],
            'id'=>$row['id'],
            'major'=>$row['major'],
            'reason'=>$row['reason'],
            'regtime'=>$row['regtime'],
            'sex'=>$row['sex'],
            'status'=>$row['status'],
            'username'=>$row['username']
        );

//查询评论列表
        $sql2="SELECT ct_teacher_evaluate.content,ct_teacher_evaluate.talkGrade,ct_teacher_evaluate.talkLike,ct_teacher_evaluate.regtime ,ct_user.username,ct_user.Headportrait FROM `ct_teacher_evaluate`,`ct_user` WHERE `ct_teacher_evaluate`.`from_user_id`=`ct_user`.`id` AND ct_teacher_evaluate.to_teacher_id='$userID'";
        $res2=mysqli_query($linki,$sql2);
        $returnInfo['talkInfoList']=mysqli_fetch_all($res2,MYSQLI_ASSOC);
    }catch(Exception $e){
        $returnInfo['retCode']=1;
        $returnInfo['retMsg']='查询失败';
    }
	echo json_encode($returnInfo);
	// print_r($row);
?>