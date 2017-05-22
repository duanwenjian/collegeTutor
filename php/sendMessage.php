

<?php
/**
 * 发送post请求
 * @param string $url 请求地址
 * @param array $post_data post键值对数据
 * @return string
 */
 include("connect.php");
function send_post($url, $post_data) {

  $postdata = http_build_query($post_data);
  $options = array(
    'http' => array(
      'method' => 'POST',
      'header' => 'Content-type:application/x-www-form-urlencoded',
      'content' => $postdata,
      'timeout' => 15 * 60 // 超时时间（单位:s）
    )
  );
  $context = stream_context_create($options);
  $result = file_get_contents($url, false, $context);

  return $result;
}
$msg=$_POST['msg'];
$toUserID=$_POST['toUserID'];
$fromUserID=$_POST['fromUserID'];
$type=$_POST['type'];

$sqluser="SELECT * FROM `ct_user` WHERE ct_user.id=$fromUserID";
  $queryuser=mysql_query($sqluser);
  $rowuser=mysql_fetch_array($queryuser);
//使用方法
$content=array(
    'msg'=>$msg,
    'type'=>$type,
    'toUserId'=>$fromUserID,
    'fromUserName'=>$rowuser['username'],
    'fromUserHeadportrait'=>$rowuser['Headportrait'],
    'messageID'=>null,//消息ID
    'rettime'=>$regtime
    );
  $sql="SELECT * FROM `ct_user_relation` WHERE ct_user_relation.user_id_from=$fromUserID AND ct_user_relation.user_id_to=$toUserID";
  $query=mysql_query($sql);
  $num = mysql_num_rows($query);
if($num==1){
  $row=mysql_fetch_array($query);
  $id=$row['id'];
}else{
      $sql1="INSERT INTO `ct_user_relation`(`id`, `user_id_from`, `user_id_to`, `regtime`) VALUES (null,$fromUserID,$toUserID,$regtime)";
      $query=mysql_query($sql1);
      $id=mysql_insert_id();
}
if($type=='text'){
    $sql2="INSERT INTO `ct_user_chat`(`id`, `relation_id`, `content`, `reads`, `regtime`) VALUES (null,'$id','$msg',0,$regtime)";
     $query2=mysql_query($sql2);
     $content['messageID']=mysql_insert_id();
     //echo $content['messageID'];
     $post_data = array(
       'appkey' => 'BC-d2d2b974b32847e3bb7bd70b76bf0837',
       'channel' => 'collegeTutor'.$toUserID,
       'content'=>json_encode($content)
     );
     echo send_post('https://goeasy.io/goeasy/publish', $post_data);
}else{
    $sql4="SELECT * FROM `ct_user_deal` WHERE ct_user_deal.relation_id=$id";
    $query4=mysql_query($sql4);
    $row4=mysql_num_rows($query4);
    if($row4==1){
    echo json_encode(array("retCode"=>0,"retMsg"=>"交易已发起，等待老师同意"));
    }else{
      $sql3="INSERT INTO `ct_user_deal`(`id`, `relation_id`, `regtime`, `status`) VALUES (null,$id,$regtime,0)";
      $query3=mysql_query($sql3);
      $content['messageID']=mysql_insert_id();
      $post_data = array(
        'appkey' => 'BC-d2d2b974b32847e3bb7bd70b76bf0837',
        'channel' => 'collegeTutor'.$toUserID,
        'content'=>json_encode($content)
      );
      echo send_post('https://goeasy.io/goeasy/publish', $post_data);
  }
}
