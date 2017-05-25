-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-04-23 11:44:34
-- 服务器版本： 10.1.13-MariaDB
-- PHP Version: 5.6.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `collegetutor`
--

-- --------------------------------------------------------

--
-- 表的结构 `t_user`
--

--用户表
CREATE TABLE `CT_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '唯一id',
  `username` varchar(30) NOT NULL COMMENT '用户名',
  `password` varchar(32) NOT NULL COMMENT '密码',
  `email` varchar(30) NOT NULL COMMENT '邮箱',
  `token` varchar(50) NOT NULL COMMENT '帐号激活码',
  `token_exptime` int(10) NOT NULL COMMENT '激活码有效期',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '状态,0-未激活,1-已激活',
  `regtime` int(10) NOT NULL COMMENT '注册时间',
  `Headportrait` varchar(64) NOT NULL DEFAULT 'img/home/photo.png' COMMENT '头像位置'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


--管理员表
CREATE TABLE `CT_user_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '唯一id',
  `user_id` int(11) NOT NULL COMMENT '用户表外键id',
  `OperationPassword` varchar(32) NOT NULL COMMENT '管理员操作密码',
  `Jurisdiction` tinyint(1) NOT NULL COMMENT '权限,0-超级权限（可设置管理员）,1-审批权限,2-复核权限',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '状态,0-激活,1-禁用',
  `regtime` int(10) NOT NULL COMMENT '设置时间',

  --设置外键
  foreign key(user_id) references CT_user(id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


--系统通知存储（管理员操作）
CREATE TABLE `CT_system_informs` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '唯一id',
  `admin_id` int(11) NOT NULL COMMENT '管理员表外键id',
  `OperationPassword` varchar(32) NOT NULL COMMENT '管理员操作密码',
  `type` tinyint(1) NOT NULL COMMENT '权限,0-通知,1-处理',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '状态,0-发布,1-未发布',
  `Displaymode` tinyint(1) NOT NULL DEFAULT '0' COMMENT '显示方式,0-强制显示,1-非强制',
  `content` TEXT NOT NULL COMMENT '内容',
  `title` varchar(64) NOT NULL COMMENT '标题',
  `ReleaseTime` int(10) NOT NULL COMMENT '发布时间',
  `regtime` int(10) NOT NULL COMMENT '设置时间',

  --设置外键
  foreign key(admin_id) references CT_user_admin(id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--教师表
CREATE TABLE `CT_user_teacher` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '唯一id',
  `user_id` int(11) NOT NULL COMMENT '用户表外键id',
  `major` varchar(32) NOT NULL COMMENT '专业',
  `Price` int(10) NOT NULL COMMENT '价格,每小时',
  `Grade` int(2) NOT NULL COMMENT '等级',
  `Subject` varchar(32) NOT NULL COMMENT '科目',
  `birth` varchar(32) COMMENT '出生日期',
  `sex` varchar(5) NOT NULL COMMENT '性别',
  `cardAddress` varchar(64) NOT NULL COMMENT '学生证照片地址',
  `Remarks` TEXT COMMENT '备注',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '状态,0-激活,1-禁用',
  `regtime` int(10) NOT NULL COMMENT '设置时间',

  --设置外键
  foreign key(user_id) references CT_user(id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--招聘教师表
CREATE TABLE `CT_recruit_informs` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '唯一id',
  `user_id` int(11) NOT NULL COMMENT '用户表外键id',
  `major` varchar(32) COMMENT '专业',
  `Price` int(10) NOT NULL COMMENT '价格,每小时',
  `Subject` varchar(32) NOT NULL COMMENT '科目',
  `birth` varchar(32) COMMENT '出生日期',
  `sex` varchar(5) NOT NULL COMMENT '性别',
  `Remarks` TEXT COMMENT '备注',

  `regtime` int(10) NOT NULL COMMENT '设置时间',

  --设置外键
  foreign key(user_id) references CT_user(id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--学生表
CREATE TABLE `CT_user_student` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '唯一id',
  `user_id` int(11) NOT NULL COMMENT '用户表外键id',
  `major` varchar(32) COMMENT '专业',
  `Subject` varchar(32) NOT NULL COMMENT '科目',
  `birth` varchar(32) COMMENT '出生日期',
  `sex` varchar(5) NOT NULL COMMENT '性别',
  `grade` varchar(32) NOT NULL COMMENT '年级',
  `Remarks` TEXT COMMENT '备注',

  `regtime` int(10) NOT NULL COMMENT '设置时间',

  --设置外键
  foreign key(user_id) references CT_user(id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--好友关系表
CREATE TABLE `CT_user_relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '唯一id',
  `user_id_from` int(11) NOT NULL COMMENT '发起者用户表外键id',
  `user_id_to` int(11) NOT NULL COMMENT '收到者用户表外键id',

  `regtime` int(10) NOT NULL COMMENT '设置时间',

  --设置外键
  foreign key(user_id_from) references CT_user(id),
  foreign key(user_id_to) references CT_user(id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--聊天内容表
CREATE TABLE `CT_user_chat` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '唯一id',
  `relation_id` int(11) NOT NULL COMMENT '好友关系表外键id',
  `content` TEXT NOT NULL COMMENT '聊天内容',
  `reads` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否已读,0-未读,1-已读',

  `regtime` int(10) NOT NULL COMMENT '发送时间',

  --设置外键
  foreign key(relation_id) references CT_user_relation(id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--正在交易表
CREATE TABLE `CT_user_deal` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '唯一id',
  `relation_id` int(11) NOT NULL COMMENT '好友关系表外键id',
  `startTime` int(11) NOT NULL COMMENT '开始时间',
  `endTime` int(11) NOT NULL COMMENT '结束时间',
  `dayTime` int(4) NOT NULL COMMENT '每天上课时间',
  `price` int(10) NOT NULL COMMENT '课时费',
  `week` varchar(32) NOT NULL COMMENT '每周上课时间',
  `ranks` text NOT NULL COMMENT '备注',
  `teacherType` varchar(32) NOT NULL COMMENT '教学方式',
  `payType` varchar(32) NOT NULL COMMENT '付款方式',
  `address` text NOT NULL COMMENT '上门辅导地址',
  `regtime` int(10) NOT NULL COMMENT '发起时间',
  `status` int(2) NOT NULL COMMENT '交易状态 0：尚未开始交易 1：正在交易',

  --设置外键
  foreign key(relation_id) references CT_user_relation(id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--投诉建议表
CREATE TABLE `CT_user_feedback` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '唯一id',
  `user_id` int(11) NOT NULL COMMENT '用户表表外键id',
  `admin_id` int(11) NOT NULL COMMENT '管理员表外键id',
  `content` TEXT NOT NULL COMMENT '投诉内容',
  `img` TEXT NULL COMMENT '截图地址',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否处理,0-未处理，1-处理',

  `regtime` int(10) NOT NULL COMMENT '设置时间',

  --设置外键
  foreign key(user_id) references CT_user(id),
  foreign key(admin_id) references CT_user_admin(id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
--
-- Indexes for dumped tables
--
--教师评价表
CREATE TABLE `CT_teacher_evaluate` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '唯一id',
  `from_user_id` int(11) NOT NULL COMMENT '评论人外键id',
  `to_teacher_id` int(11) NOT NULL COMMENT '被评论教师外键id',
  `content` TEXT NOT NULL COMMENT '评论内容',
  `talkGrade` int(2) NOT NULL COMMENT '被评论教师外键id',
  `talkLike` int(11) NOT NULL COMMENT '点赞数量',

  `regtime` int(10) NOT NULL COMMENT '评论时间',

  --设置外键
  foreign key(from_user_id) references CT_user(id),
  foreign key(to_teacher_id) references ct_user_teacher(id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
--
-- Indexes for table `t_user`
--
ALTER TABLE `t_user`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `t_user`
--
ALTER TABLE `t_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
