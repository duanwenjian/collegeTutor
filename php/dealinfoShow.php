<?php
    header('Content-Type:application/text;charset=utf-8');
//    echo "succ";
//  获取页面传来的用户名与密码
    //获取页面传来的数据
    include("connect.php");
    $userID=$_GET['userID'];

    $pager=array(
    		'retCode'=>0,//状态码
    		'retMsg'=>'查询成功',//状态原因
    		'dealinfo'=>array(
    		    'dealhis'=>array(
                                     'todeal'=>null,
                                     'fromdeal'=>null
                                 ),
    		    'dealing'=>array(
    		        'todeal'=>null,
    		        'fromdeal'=>null
    		    ),
    		    'dealno'=>array(
                                   'todeal'=>null,//由我发起
                                   'fromdeal'=>null//由我接收
                               )
    		),//用户信息
    		'time'=>$regtime
    	);
try{
    	//有我发起尚未开始的
        $sqldealnoto="SELECT `ct_user`.id AS toUserid,ct_user.username,ct_user.Headportrait,ct_user_deal.id,ct_user_deal.startTime,ct_user_deal.endTime,ct_user_deal.dayTime,ct_user_deal.price,ct_user_deal.week,ct_user_deal.ranks,ct_user_deal.teacherType,ct_user_deal.payType,ct_user_deal.address,ct_user_deal.regtime FROM `ct_user_deal`,ct_user_relation,ct_user WHERE ct_user_relation.id=ct_user_deal.relation_id AND ct_user.id=ct_user_relation.user_id_to AND ct_user_deal.status=0 AND ct_user_relation.user_id_from=$userID";
        $resnoto=mysqli_query($linki,$sqldealnoto);
        $pager['dealinfo']['dealno']['todeal']=mysqli_fetch_all($resnoto,MYSQLI_ASSOC);
        //由我接收的
        $sqldealnofrom="SELECT `ct_user`.id AS toUserid,ct_user.username,ct_user.Headportrait,ct_user_deal.id,ct_user_deal.startTime,ct_user_deal.endTime,ct_user_deal.dayTime,ct_user_deal.price,ct_user_deal.week,ct_user_deal.ranks,ct_user_deal.teacherType,ct_user_deal.payType,ct_user_deal.address,ct_user_deal.regtime FROM `ct_user_deal`,ct_user_relation,ct_user WHERE ct_user_relation.id=ct_user_deal.relation_id AND ct_user.id=ct_user_relation.user_id_from AND ct_user_deal.status=0 AND ct_user_relation.user_id_to=$userID";
        $resnofrom=mysqli_query($linki,$sqldealnofrom);
        $pager['dealinfo']['dealno']['fromdeal']=mysqli_fetch_all($resnofrom,MYSQLI_ASSOC);

    	//有我发起开始的
        $sqldealnoto="SELECT `ct_user`.id AS toUserid,ct_user.username,ct_user.Headportrait,ct_user_deal.id,ct_user_deal.startTime,ct_user_deal.endTime,ct_user_deal.dayTime,ct_user_deal.price,ct_user_deal.week,ct_user_deal.ranks,ct_user_deal.teacherType,ct_user_deal.payType,ct_user_deal.address,ct_user_deal.regtime FROM `ct_user_deal`,ct_user_relation,ct_user WHERE ct_user_relation.id=ct_user_deal.relation_id AND ct_user.id=ct_user_relation.user_id_to AND ct_user_deal.status=1 AND ct_user_relation.user_id_from=$userID";
        $resnoto=mysqli_query($linki,$sqldealnoto);
        $pager['dealinfo']['dealing']['todeal']=mysqli_fetch_all($resnoto,MYSQLI_ASSOC);
        //由我接收的开始的
        $sqldealnofrom="SELECT `ct_user`.id AS toUserid,ct_user.username,ct_user.Headportrait,ct_user_deal.id,ct_user_deal.startTime,ct_user_deal.endTime,ct_user_deal.dayTime,ct_user_deal.price,ct_user_deal.week,ct_user_deal.ranks,ct_user_deal.teacherType,ct_user_deal.payType,ct_user_deal.address,ct_user_deal.regtime FROM `ct_user_deal`,ct_user_relation,ct_user WHERE ct_user_relation.id=ct_user_deal.relation_id AND ct_user.id=ct_user_relation.user_id_from AND ct_user_deal.status=1 AND ct_user_relation.user_id_to=$userID";
        $resnofrom=mysqli_query($linki,$sqldealnofrom);
        $pager['dealinfo']['dealing']['fromdeal']=mysqli_fetch_all($resnofrom,MYSQLI_ASSOC);


        //有我发起结束的
        $sqldealhisto="SELECT `ct_user`.id AS toUserid,ct_user.username,ct_user.Headportrait,ct_user_history.id,ct_user_history.startTime,ct_user_history.endTime,ct_user_history.dayTime,ct_user_history.price,ct_user_history.week,ct_user_history.ranks,ct_user_history.teacherType,ct_user_history.payType,ct_user_history.address,ct_user_history.regtime FROM `ct_user_history`,ct_user_relation,ct_user WHERE ct_user_relation.id=ct_user_history.relation_id AND ct_user.id=ct_user_relation.user_id_to  AND ct_user_relation.user_id_from=$userID";
        $reshisto=mysqli_query($linki,$sqldealhisto);
        $pager['dealinfo']['dealhis']['todeal']=mysqli_fetch_all($reshisto,MYSQLI_ASSOC);
        //由我接收的结束的
        $sqldealhisfrom="SELECT `ct_user`.id AS toUserid,ct_user.username,ct_user.Headportrait,ct_user_history.id,ct_user_history.startTime,ct_user_history.endTime,ct_user_history.dayTime,ct_user_history.price,ct_user_history.week,ct_user_history.ranks,ct_user_history.teacherType,ct_user_history.payType,ct_user_history.address,ct_user_history.regtime FROM `ct_user_history`,ct_user_relation,ct_user WHERE ct_user_relation.id=ct_user_history.relation_id AND ct_user.id=ct_user_relation.user_id_from  AND ct_user_relation.user_id_to=$userID";
        $reshisfrom=mysqli_query($linki,$sqldealhisfrom);
        $pager['dealinfo']['dealhis']['fromdeal']=mysqli_fetch_all($reshisfrom,MYSQLI_ASSOC);
}catch(Exception $e){
    $pager['retCode']=1;
    $pager['retMsg']='查询失败';
}

    echo json_encode($pager);
    ?>