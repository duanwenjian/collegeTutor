<?php
    header('Content-Type:application/text;charset=utf-8');
//    echo "succ";
//  获取页面传来的用户名与密码
    //获取页面传来的数据
    include("connect.php");

    $pager=array(
        		'retCode'=>0,//�
        		'userinfo'=>null,
        		'teacherInfo'=>null,
        		'adminmessage'=>null,
        		'time'=>$regtime
        	);

        $sql="SELECT `regtime`  AS 'time',`username`,`Headportrait` FROM `ct_user` ORDER BY regtime ASC";
        $res=mysqli_query($linki,$sql);
        $pager['userinfo']=mysqli_fetch_all($res,MYSQLI_ASSOC);

        $sql3="SELECT * FROM `ct_system_informs` ORDER BY regtime ASC";
                $res3=mysqli_query($linki,$sql3);
                $pager['adminmessage']=mysqli_fetch_all($res3,MYSQLI_ASSOC);

        $sql2="SELECT COUNT(*) AS 'value',Subject AS 'name' FROM `ct_user_teacher` GROUP BY Subject";
            $res2=mysqli_query($linki,$sql2);
            $pager['teacherInfo']=mysqli_fetch_all($res2,MYSQLI_ASSOC);
        $pager['retCode']=1;
        echo json_encode($pager);

?>