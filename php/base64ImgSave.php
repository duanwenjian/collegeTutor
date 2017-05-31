<?php
header('Content-type:text/html;charset=utf-8');
include("connect.php");
$returnInfo=array(
         'retCode'=>null,
         'retMsg'=>null
        );
$base64_image_content = $_POST['imageFile'];
$userID=$_POST['userID'];
//匹配出图片的格式
if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64_image_content, $result)){
    $type = $result[2];
    $new_file = "../userHeadImgs/";
    $sql_file="userHeadImgs/";
    if(!file_exists($new_file))
    {
    //检查是否有该文件夹，如果没有就创建，并给予最高权限
    mkdir($new_file, 0700);
    }
    $time=time();
    $new_file = $new_file.$time.".{$type}";
    $new_sql_fil=$sql_file.$time.".{$type}";
    if (file_put_contents($new_file, base64_decode(str_replace($result[1], '', $base64_image_content)))){
        $returnInfo['retCode']=0;
        $returnInfo['retMsg']=$new_sql_fil;

        $sql="UPDATE `ct_user` SET `Headportrait`='$new_sql_fil' WHERE id=$userID";
        $res=mysql_query($sql);

        echo json_encode($returnInfo);
    }else{
        $returnInfo['retCode']=1;
        $returnInfo['retMsg']='NO';
        echo json_encode($returnInfo);
    }
}
?>
