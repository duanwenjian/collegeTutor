<?php
	header('Content-Type:application/json;charset=utf-8');
	include("connect.php");
	$userID =$_GET['userID'];


	$pager=array(
			'retCode'=>null,//状态码
			'retMsg'=>null,//状态信息
			'chat'=>null,//聊天信息
			'deal'=>null,//交易信息
			'userInfo'=>null,//用户信息
			'time'=>$regtime
		);
		// 获取聊天id
		try{
		$sql_user="SELECT `username`,`email`,`Headportrait` FROM `ct_user` WHERE id=$userID";
		$res_user=mysql_query($sql_user);
        $pager['userInfo'] = mysql_fetch_array($res_user);

        $sql="SELECT ct_user.id AS 'fromUserID', ct_user.username,`ct_user`.`Headportrait`,ct_user_chat.content,`ct_user_chat`.`id` AS 'charId',`ct_user_chat`.`regtime` FROM ct_user,ct_user_relation,ct_user_chat WHERE ct_user.id=ct_user_relation.user_id_from AND ct_user_relation.id=ct_user_chat.relation_id AND ct_user_relation.user_id_to=$userID AND ct_user_chat.reads=0 ORDER BY ct_user_chat.regtime";
        $res=mysqli_query($linki,$sql);
        $pager['chat']=mysqli_fetch_all($res,MYSQLI_ASSOC);

        $sql2="SELECT ct_user.username,ct_user.Headportrait,ct_user_deal.regtime,ct_user_deal.id FROM `ct_user_relation`,`ct_user_deal`,`ct_user` WHERE ct_user_relation.user_id_to=$userID AND ct_user_relation.id=ct_user_deal.relation_id AND ct_user.id=ct_user_relation.user_id_from AND ct_user_deal.status=0 ORDER BY ct_user_deal.regtime";
        $res2=mysqli_query($linki,$sql2);
        $pager['deal']=mysqli_fetch_all($res2,MYSQLI_ASSOC);

        $sql3="UPDATE `ct_user_chat` SET `reads` = '1' WHERE `ct_user_chat`.`relation_id` IN (SELECT id FROM ct_user_relation WHERE ct_user_relation.user_id_to=$userID) AND ct_user_chat.reads=0";
        $res2=mysql_query($sql3);
        $pager['retCode']=0;
        $pager['retMsg']='查询成功';
        }catch(Exception $e){
        		$pager['retCode']=1;
                $pager['retMsg']='查询失败';
        }

        	echo json_encode($pager);
