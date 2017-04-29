<?php
	header('Content-Type:application/json;charset=utf-8');
    include("connect.php");
    $pager=[
		'retCode'=>null,//状态码
		'retMsg'=>null,//状态信息
		'retSrc'=>null,//图片路径
		'time'=>$regtime
	];

if(isset($_FILES["myfile"])){//检查myfile的值是否为空
    $ret = array();
    //新建数组
    $uploadDir = 'UserImages'.DIRECTORY_SEPARATOR.date("Ymd").DIRECTORY_SEPARATOR;
    //images/20170131/
    $dir = dirname(dirname(__FILE__)).DIRECTORY_SEPARATOR.$uploadDir;//返回文件的路径名字/+images/20170131/
    file_exists($dir) || (mkdir($dir,0777,true) && chmod($dir,0777));
    //检查目录是否存在 不存在创建目录或者改变文件模式
    /*  mkdir(path,mode,recursive,context)
        path:必需。规定要创建的目录的名称。
        mode:必需。规定权限。默认是 0777。
        recursic:必需。规定是否设置递归模式
        context:必需。规定文件句柄的环境。Context 是可修改流的行为的一套选项。
    */
    if(!is_array($_FILES["myfile"]["name"])) //single file
    {
        $fileName = time().uniqid().'.'.pathinfo($_FILES["myfile"]["name"])['extension'];
        //时间戳 + 计算当前时间，生成一个唯一的ID + . +
        /*
         pathinfo(path,options)  函数以数组或字符串的形式返回关于文件路径的信息。
        [dirname]:返回文件路径中的目录部分
        [basename]:返回文件路径中文件名的部分
        [extension]:返回文件路径中文件的类型的部分
        */
        move_uploaded_file($_FILES["myfile"]["tmp_name"],$dir.$fileName);
        /*move_uploaded_file() 函数将上传的文件移动到新位置。*/
        $ret['file'] = DIRECTORY_SEPARATOR.$uploadDir.$fileName;
    }
    $pager['retCode']=1;
    $pager['retMsg']=$_POST['userID'];
    $pager['retSrc']=$ret;
    echo json_encode($pager);
    }else{
        echo "err";
    }
?>