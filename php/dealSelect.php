<?php
	header('Content-Type:application/json;charset=utf-8');
	include("connect.php");
	$fromId=$_GET['fromId'];
	$toId=$_GET['toId'];

	$regtime = time();
            $pager=array(
                    'retCode'=>null,//状态码
                    'retMsg'=>null,//状态信息
                    'dealId'=>null,//交易id
                    'time'=>$regtime
                );
	$query = mysql_query("SELECT * FROM `ct_user_relation` WHERE ct_user_relation.user_id_from=$fromId AND user_id_to=$toId");
	$nums = mysql_num_rows($query);
	if($nums==1){
        $rows=mysql_fetch_array($query);
        $id=$rows['id'];
        $query2 = mysql_query("SELECT * FROM `ct_user_deal` WHERE relation_id=$id");
        $num = mysql_num_rows($query2);
        $row2=mysql_fetch_array($query2);
        if($num==1){
            $pager['retCode']=0;
            $pager['retMsg']='和当前教师存在交易';
            $pager['dealId']=$row2['id'];
        }else{
            $pager['retCode']=1;
            $pager['retMsg']='可以交易';
        }
    }
        echo json_encode($pager);
