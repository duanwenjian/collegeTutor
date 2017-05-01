<?php
    header('Content-Type:application/text;charset=utf-8');


    //获取页面传来的数据
    include("connect.php");
    $userID=$_GET['userID'];

    $pager=[
    		'retCode'=>null,//状态码
    		'retMsg'=>null,//状态原因
    		'applyForMsg'=>null,//用户信息
    		'time'=>$regtime
    	];

    $sql="SELECT ct_user_teacher.id,ct_user.username, ct_user_teacher.major, ct_user_teacher.Price, ct_user_teacher.Grade, ct_user_teacher.Subject, ct_user_teacher.birth, ct_user_teacher.sex, ct_user_teacher.cardAddress, ct_user_teacher.Remarks, ct_user_teacher.status, ct_user_teacher.regtime, ct_user_teacher.reason FROM `ct_user_teacher`,`ct_user` WHERE ct_user_teacher.user_id=ct_user.id AND ct_user.id='$userID'";
    $res=mysql_query($sql);
    $row=mysql_fetch_array($res);
//    sleep(5)
    if($row){
        $pager['retCode']=0;
        $pager['retMsg']='该用户已申请';
        $pager['applyForMsg']=[
                                'id'=>$row['id'],
                                'username'=>$row['username'],
                                'major'=>$row['major'],
                                'Price'=>$row['Price'],
                                'Grade'=>$row['Grade'],
                                'Subject'=>$row['Subject'],
                                'birth'=>$row['birth'],
                                'sex'=>$row['sex'],
                                'cardAddress'=>$row['cardAddress'],
                                'Remarks'=>$row['Remarks'],
                                'status'=>$row['status'],
                                'regtime'=>$row['regtime'],
                                'reason'=>$row['reason']
                              ];
        echo json_encode($pager);
    }else{
        $pager['retCode']=1;
        $pager['retMsg']='该用户未申请';
        $pager['applyForMsg']=null;
        echo json_encode($pager);
    }
?>