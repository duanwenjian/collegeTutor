-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-05-21 17:43:57
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
-- 表的结构 `ct_recruit_informs`
--

CREATE TABLE `ct_recruit_informs` (
  `id` int(11) NOT NULL COMMENT '唯一id',
  `user_id` int(11) NOT NULL COMMENT '用户表外键id',
  `major` varchar(32) DEFAULT NULL COMMENT '专业',
  `Price` int(10) NOT NULL COMMENT '价格,每小时',
  `Subject` varchar(32) NOT NULL COMMENT '科目',
  `birth` varchar(32) DEFAULT NULL COMMENT '出生日期',
  `sex` varchar(5) NOT NULL COMMENT '性别',
  `Remarks` text COMMENT '备注',
  `regtime` int(10) NOT NULL COMMENT '设置时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `ct_system_informs`
--

CREATE TABLE `ct_system_informs` (
  `id` int(11) NOT NULL COMMENT '唯一id',
  `admin_id` int(11) NOT NULL COMMENT '管理员表外键id',
  `OperationPassword` varchar(32) NOT NULL COMMENT '管理员操作密码',
  `type` tinyint(1) NOT NULL COMMENT '权限,0-通知,1-处理',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '状态,0-发布,1-未发布',
  `Displaymode` tinyint(1) NOT NULL DEFAULT '0' COMMENT '显示方式,0-强制显示,1-非强制',
  `content` text NOT NULL COMMENT '内容',
  `title` varchar(64) NOT NULL COMMENT '标题',
  `ReleaseTime` int(10) NOT NULL COMMENT '发布时间',
  `regtime` int(10) NOT NULL COMMENT '设置时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `ct_teacher_evaluate`
--

CREATE TABLE `ct_teacher_evaluate` (
  `id` int(11) NOT NULL COMMENT '唯一id',
  `from_user_id` int(11) NOT NULL COMMENT '评论人外键id',
  `to_teacher_id` int(11) NOT NULL COMMENT '被评论教师外键id',
  `content` text NOT NULL COMMENT '评论内容',
  `talkGrade` int(2) NOT NULL COMMENT '被评论教师外键id',
  `talkLike` int(11) NOT NULL COMMENT '点赞数量',
  `regtime` int(10) NOT NULL COMMENT '评论时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `ct_teacher_evaluate`
--

INSERT INTO `ct_teacher_evaluate` (`id`, `from_user_id`, `to_teacher_id`, `content`, `talkGrade`, `talkLike`, `regtime`) VALUES
(1, 3, 50, '很有才华', 5, 10, 1952887415);

-- --------------------------------------------------------

--
-- 表的结构 `ct_user`
--

CREATE TABLE `ct_user` (
  `id` int(11) NOT NULL COMMENT '唯一id',
  `username` varchar(30) NOT NULL COMMENT '用户名',
  `password` varchar(32) NOT NULL COMMENT '密码',
  `email` varchar(30) NOT NULL COMMENT '邮箱',
  `token` varchar(50) NOT NULL COMMENT '帐号激活码',
  `token_exptime` int(10) NOT NULL COMMENT '激活码有效期',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '状态,0-未激活,1-已激活',
  `regtime` int(10) NOT NULL COMMENT '注册时间',
  `Headportrait` varchar(64) NOT NULL DEFAULT 'img/home/photo.png' COMMENT '头像位置'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `ct_user`
--

INSERT INTO `ct_user` (`id`, `username`, `password`, `email`, `token`, `token_exptime`, `status`, `regtime`, `Headportrait`) VALUES
(1, '我是好学生', '460f4ecb0ecc28b25cf04f8a22b6a71c', 'dwjwenjian228@qq.com', 'ad11199dba6d55fc087ddb6c4f70ca8b', 1493550595, 1, 1493464195, 'img/home/photo.png'),
(4, '用户三', '460f4ecb0ecc28b25cf04f8a22b6a71c', 'collegetutor@126.com', '72771293f2aa02f1843d9377c11d0a03', 1493711390, 1, 1493624990, 'img/home/photo.png'),
(3, '花若开', '460f4ecb0ecc28b25cf04f8a22b6a71c', '15732632785@163.com', '184b26e7a5f6ce979a4ed59e41b370ff', 1493710083, 1, 1493623683, 'img/home/photo.png'),
(5, '用户四', '460f4ecb0ecc28b25cf04f8a22b6a71c', '193113800@qq.com', 'a73bc12fadbc54ae3db4e5e731a841ae', 1493711413, 1, 1493625013, 'img/home/photo.png'),
(6, '我是小小的', '460f4ecb0ecc28b25cf04f8a22b6a71c', '2788069766@qq.com', '1da09910f1f4e69cf01b19e11542cb06', 1493714484, 1, 1493628084, 'img/home/photo.png');

-- --------------------------------------------------------

--
-- 表的结构 `ct_user_admin`
--

CREATE TABLE `ct_user_admin` (
  `id` int(11) NOT NULL COMMENT '唯一id',
  `user_id` int(11) NOT NULL COMMENT '用户表外键id',
  `OperationPassword` varchar(32) NOT NULL COMMENT '管理员操作密码',
  `Jurisdiction` tinyint(1) NOT NULL COMMENT '权限,0-超级权限（可设置管理员）,1-审批权限,2-复核权限',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '状态,0-激活,1-禁用',
  `regtime` int(10) NOT NULL COMMENT '设置时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `ct_user_chat`
--

CREATE TABLE `ct_user_chat` (
  `id` int(11) NOT NULL COMMENT '唯一id',
  `relation_id` int(11) NOT NULL COMMENT '好友关系表外键id',
  `content` text NOT NULL COMMENT '聊天内容',
  `reads` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否已读,0-未读,1-已读',
  `regtime` int(10) NOT NULL COMMENT '发送时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `ct_user_chat`
--

INSERT INTO `ct_user_chat` (`id`, `relation_id`, `content`, `reads`, `regtime`) VALUES
(2, 2, '吃饭了么', 1, 1495354462),
(3, 2, '吃饭了么', 1, 1495355333),
(4, 3, '吃饭了么', 1, 1495355561),
(5, 4, '吃饭了么', 1, 1495355611),
(6, 4, '吃饭了么', 1, 1495355673),
(7, 4, '吃饭了么', 1, 1495355738),
(8, 4, '吃饭了么', 1, 1495355742),
(9, 4, '吃饭了么', 1, 1495355745),
(10, 5, '吃饭了么', 1, 1495355759),
(11, 0, '吃饭了么', 1, 1495355923),
(12, 0, '吃饭了么', 1, 1495355948),
(13, 0, '吃饭了么', 1, 1495355980),
(14, 2, '吃饭了么', 1, 1495356012),
(15, 4, '吃饭了么', 1, 1495356022),
(16, 6, '吃饭了么', 1, 1495372148);

-- --------------------------------------------------------

--
-- 表的结构 `ct_user_deal`
--

CREATE TABLE `ct_user_deal` (
  `id` int(11) NOT NULL COMMENT '唯一id',
  `relation_id` int(11) NOT NULL COMMENT '好友关系表外键id',
  `regtime` int(10) NOT NULL COMMENT '发起时间',
  `status` int(2) NOT NULL DEFAULT '0' COMMENT '交易状态 0：尚未开始交易 1：正在交易'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `ct_user_deal`
--

INSERT INTO `ct_user_deal` (`id`, `relation_id`, `regtime`, `status`) VALUES
(1, 2, 1495354523, 0),
(2, 2, 1495355012, 0),
(3, 2, 1495355088, 0),
(4, 2, 1495355113, 0),
(5, 2, 1495355254, 0),
(6, 2, 1495355283, 0);

-- --------------------------------------------------------

--
-- 表的结构 `ct_user_feedback`
--

CREATE TABLE `ct_user_feedback` (
  `id` int(11) NOT NULL COMMENT '唯一id',
  `user_id` int(11) NOT NULL COMMENT '用户表表外键id',
  `admin_id` int(11) NOT NULL COMMENT '管理员表外键id',
  `content` text NOT NULL COMMENT '投诉内容',
  `img` text COMMENT '截图地址',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否处理,0-未处理，1-处理',
  `regtime` int(10) NOT NULL COMMENT '设置时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `ct_user_relation`
--

CREATE TABLE `ct_user_relation` (
  `id` int(11) NOT NULL COMMENT '唯一id',
  `user_id_from` int(11) NOT NULL COMMENT '发起者用户表外键id',
  `user_id_to` int(11) NOT NULL COMMENT '收到者用户表外键id',
  `regtime` int(10) NOT NULL COMMENT '设置时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `ct_user_relation`
--

INSERT INTO `ct_user_relation` (`id`, `user_id_from`, `user_id_to`, `regtime`) VALUES
(2, 3, 4, 1495353732),
(3, 4, 4, 1495355561),
(4, 4, 3, 1495355611),
(5, 3, 3, 1495355759),
(6, 4, 6, 1495372148);

-- --------------------------------------------------------

--
-- 表的结构 `ct_user_student`
--

CREATE TABLE `ct_user_student` (
  `id` int(11) NOT NULL COMMENT '唯一id',
  `user_id` int(11) NOT NULL COMMENT '用户表外键id',
  `major` varchar(32) DEFAULT NULL COMMENT '专业',
  `Subject` varchar(32) NOT NULL COMMENT '科目',
  `birth` varchar(32) DEFAULT NULL COMMENT '出生日期',
  `sex` varchar(5) NOT NULL COMMENT '性别',
  `grade` varchar(32) NOT NULL COMMENT '年级',
  `Remarks` text COMMENT '备注',
  `regtime` int(10) NOT NULL COMMENT '设置时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `ct_user_teacher`
--

CREATE TABLE `ct_user_teacher` (
  `id` int(11) NOT NULL COMMENT '唯一id',
  `user_id` int(11) NOT NULL COMMENT '用户表外键id',
  `major` varchar(32) NOT NULL COMMENT '专业',
  `Price` int(10) NOT NULL COMMENT '价格,每小时',
  `Grade` varchar(32) NOT NULL COMMENT '授课年级',
  `Subject` varchar(32) NOT NULL COMMENT '科目',
  `birth` varchar(32) DEFAULT NULL COMMENT '出生日期',
  `sex` varchar(5) NOT NULL COMMENT '性别',
  `cardAddress` varchar(200) NOT NULL COMMENT '学生证照片地址',
  `Remarks` text COMMENT '备注',
  `status` int(5) NOT NULL DEFAULT '201' COMMENT '状态,0-激活（审核，复核通过）,1-禁用,200-审核通过,201-审核中,202-审核失败,300-复核成功,301-复核中,302-复核失败',
  `regtime` int(10) NOT NULL COMMENT '设置时间',
  `reason` varchar(200) DEFAULT '无' COMMENT '状态原因',
  `rank` int(2) NOT NULL DEFAULT '1' COMMENT '等级'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `ct_user_teacher`
--

INSERT INTO `ct_user_teacher` (`id`, `user_id`, `major`, `Price`, `Grade`, `Subject`, `birth`, `sex`, `cardAddress`, `Remarks`, `status`, `regtime`, `reason`, `rank`) VALUES
(51, 6, '信息科学与技术', 150, '初中二年级', '语文教师', '2017-01-09', '男', '\\UserImages\\20170501\\14936282755906f573debb9.jpg', '我是计算机', 0, 1493628275, '无', 1),
(49, 4, '财务管理', 300, '初中二年级', '语文教师', '2017-01-10', '男', '\\UserImages\\20170501\\14936251505906e93edf81e.jpg', '我会数钱', 0, 1493625150, '无', 1),
(50, 5, '网络工程', 100, '初中二年级', '语文教师', '2017-01-24', '男', '\\UserImages\\20170501\\14936252135906e97dd8548.jpg', '我会拉网线', 0, 1493625213, '无', 1),
(47, 1, '软件工程', 100, '初中二年级', '语文教师', '1995-06-30', '男', '\\UserImages\\20170501\\14936104435906afcb0f4e1.jpg+\\UserImages\\20170501\\14936104435906afcb0fcb1.jpg', '做教师是我的梦想', 0, 1493610443, '无', 1),
(53, 3, '计算机', 2000, '高中二年级', '语文教师', '2017-05-10', '男', '\\UserImages\\20170521\\14953432295921207d1b8d9.jpg', '撒大声地撒', 0, 1495343229, '无', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ct_recruit_informs`
--
ALTER TABLE `ct_recruit_informs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `ct_system_informs`
--
ALTER TABLE `ct_system_informs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `ct_teacher_evaluate`
--
ALTER TABLE `ct_teacher_evaluate`
  ADD PRIMARY KEY (`id`),
  ADD KEY `from_user_id` (`from_user_id`),
  ADD KEY `to_teacher_id` (`to_teacher_id`);

--
-- Indexes for table `ct_user`
--
ALTER TABLE `ct_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ct_user_admin`
--
ALTER TABLE `ct_user_admin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `ct_user_chat`
--
ALTER TABLE `ct_user_chat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `relation_id` (`relation_id`);

--
-- Indexes for table `ct_user_deal`
--
ALTER TABLE `ct_user_deal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `relation_id` (`relation_id`);

--
-- Indexes for table `ct_user_feedback`
--
ALTER TABLE `ct_user_feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `ct_user_relation`
--
ALTER TABLE `ct_user_relation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id_from` (`user_id_from`),
  ADD KEY `user_id_to` (`user_id_to`);

--
-- Indexes for table `ct_user_student`
--
ALTER TABLE `ct_user_student`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `ct_user_teacher`
--
ALTER TABLE `ct_user_teacher`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `ct_recruit_informs`
--
ALTER TABLE `ct_recruit_informs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一id';
--
-- 使用表AUTO_INCREMENT `ct_system_informs`
--
ALTER TABLE `ct_system_informs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一id';
--
-- 使用表AUTO_INCREMENT `ct_teacher_evaluate`
--
ALTER TABLE `ct_teacher_evaluate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一id', AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `ct_user`
--
ALTER TABLE `ct_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一id', AUTO_INCREMENT=7;
--
-- 使用表AUTO_INCREMENT `ct_user_admin`
--
ALTER TABLE `ct_user_admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一id';
--
-- 使用表AUTO_INCREMENT `ct_user_chat`
--
ALTER TABLE `ct_user_chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一id', AUTO_INCREMENT=17;
--
-- 使用表AUTO_INCREMENT `ct_user_deal`
--
ALTER TABLE `ct_user_deal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一id', AUTO_INCREMENT=7;
--
-- 使用表AUTO_INCREMENT `ct_user_feedback`
--
ALTER TABLE `ct_user_feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一id';
--
-- 使用表AUTO_INCREMENT `ct_user_relation`
--
ALTER TABLE `ct_user_relation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一id', AUTO_INCREMENT=7;
--
-- 使用表AUTO_INCREMENT `ct_user_student`
--
ALTER TABLE `ct_user_student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一id';
--
-- 使用表AUTO_INCREMENT `ct_user_teacher`
--
ALTER TABLE `ct_user_teacher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一id', AUTO_INCREMENT=54;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
