<?php
$db_host="localhost";	//���ݿ�����
$db_user="root";	    //���ݿ��û���
$db_pass="";	        //���ݿ�����
$db_name="collegetutor";	//ѡ������ݿ�
$timezone="Asia/Shanghai";  //����ʱ��
@$link=mysql_connect($db_host,$db_user,$db_pass);   //�������ݿ�
mysql_select_db($db_name,$link);	                //ѡ�����ݿ�
mysql_query("SET names UTF8");	                    //�������ݿ����
header("Content-Type: text/html; charset=utf-8");	//������ҳ����
date_default_timezone_set($timezone);               //����ʱ��
$regtime =time();                                  //��ǰʱ���
//$addr="localhost";                   //�����û�����ַ
$addr="http://wwww.veneno.online"
@$linki=mysqli_connect($db_host,$db_user,$db_pass,$db_name);
mysqli_set_charset($linki,'utf8');//����musqli����
