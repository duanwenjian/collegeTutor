<?php
	header('Content-Type:application/json;charset=utf-8');

include("connect.php");
$regtime = time();
$pager=[
		'retCode'=>null,//总记录数
		'retMsg'=>null,//页面大小
		'time'=>$regtime
	];
$username = stripslashes(trim($_POST['username']));
$password = md5(trim($_POST['pwd']));
$email = trim($_POST['email']);
$token = md5($username.$password.$regtime); //创建用于激活识别码
$token_exptime = time()+60*60*24;//过期时间为24小时后
$sql = "insert into `t_user` (`username`,`password`,`email`,`token`,`token_exptime`,`regtime`) values ('$username','$password','$email','$token','$token_exptime','$regtime')";
mysql_query($sql);
if(mysql_insert_id()){//写入数据库成功，发邮件
    //echo "ok";
    include 'smtp.class.php';

    $mailto=$email; 	 //收件人
    $subject="大学生家教网注册验证"; 			 //邮件主题
    $body="亲爱的<span style='color:#e41;font-weight: bold;'>".$username."</span>：<br/>感谢您在我站注册了新帐号。<br/>请点击链接激活您的帐号。<br/><a href='http://localhost/dashboard/collegetutor/php/active.php?verify=".$token."' target='_blank'>http://www.veneno.online/dashboard/collegetutor/php/active.php?verify=".$token."</a><br/>如果以上链接无法点击，请将它复制到你的浏览器地址栏中进入访问，该链接24小时内有效。<br/>如果此次激活请求非你本人所发，请忽略本邮件。<br/><p style='text-align:right'>-------- 百度经验 敬上</p>";  //邮件内容

     function sendmailto($mailto, $mailsub, $mailbd, $debug=false) {
        	$smtpserver 	= "smtp.163.com";                //SMTP服务器
        	$smtpserverport = 25;                           //SMTP服务器端口
        	$smtpusermail   = "15732632785@163.com";   //SMTP服务器的用户邮箱
        	$smtpemailto 	= $mailto;							//收件人
        	$smtpuser       = "15732632785@163.com";           //SMTP服务器的用户帐号
        	$smtppass       = "Dwj123456";            //SMTP服务器的用户密码
        	$mailsubject    = $mailsub;                      //邮件主题
        	$mailsubject    = "=?UTF-8?B?" . base64_encode($mailsubject) . "?="; //防止乱码
        	$mailbody       = $mailbd;                       //邮件内容
        	// $mailbody = "=?UTF-8?B?".base64_encode($mailbody)."?="; //防止乱码
        	$mailtype       = "HTML";                        //邮件格式（HTML/TXT）,TXT为文本邮件. 139邮箱的短信提醒要设置为HTML才正常

        	/***
        		创建stmp对象
        		参数一是：SMTP服务器
        		参数二是：SMTP服务器端口
        		参数三是：SMTP服务器的用户帐号
        		参数四是：SMTP服务器的用户密码
        		参数五是：这里面的一个true是表示使用身份验证,否则不使用身份验证.
        	**/
        	$smtp           = new smtp($smtpserver, $smtpserverport, $smtpuser, $smtppass, true); //这里面的一个true是表示使用身份验证,否则不使用身份验证.
        	$smtp->debug    = $debug; //是否显示发送的调试信息

        	/***
        		调用stmp类里面的sendmail方法
        		参数一是：收件人邮箱帐号
        		参数二是：SMTP服务器的用户邮箱（发件人邮箱帐号）
        		参数三是：邮件主题（邮件标题）
        		参数四是：邮件内容
        		参数五是：邮件格式（HTML/TXT）,TXT为文本邮件. 139邮箱的短信提醒要设置为HTML才正常
        	***/
        	return $smtp->sendmail($smtpemailto, $smtpusermail, $mailsubject, $mailbody, $mailtype);
        }

    $em = sendmailto($mailto,$subject,$body);
    if($em) {
		$pager['retCode']=1;
		$pager['retMsg']='激活邮件发送成功，请登录邮箱激活';
		echo json_encode($pager);
    }else {
		$pager['retCode']=0;
		$pager['retMsg']='激活邮件发送失败';
		echo json_encode($pager);
    }
}