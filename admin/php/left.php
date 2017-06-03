<?php
    header('Content-Type:application/text;charset=utf-8');
//    echo "succ";
//  获取页面传来的用户名与密码
    //获取页面传来的数据
    include("connect.php");
    $Jurisdiction=$_GET['Jurisdiction'];

    $sql="SELECT  `OperationPassword` FROM `ct_user_admin` WHERE status=0 AND Jurisdiction=$Jurisdiction";
    $res=mysql_query($sql);
    $row=mysql_fetch_array($res);
    if($row['Jurisdiction']==0){
        echo '<ul class="nav pmd-sidebar-nav">'.
              	'	<li class="dropdown pmd-dropdown pmd-user-info visible-xs visible-md visible-sm visible-lg">'.
              	'		<a aria-expanded="false" data-toggle="dropdown" class="btn-user dropdown-toggle media pmd-ripple-effect" data-sidebar="true" aria-expandedhref="javascript:void(0);">'.
              	'			<div class="media-left">'.
              	'				<img src="themes/images/user-icon.png" class="j-Headportrait" alt="New User">'.
              	'			</div>'.
              	'			<div class="media-body media-middle j-username">张三</div>'.
              	'			<div class="media-right media-middle"><i class="dic-more-vert dic"></i></div>'.
              	'		</a>'.
              	'		<ul class="dropdown-menu">'.
              	'			<li><a href="login.html">'.
              	'				<i class="media-left media-middle">'.
              	'					<svg version="1.1" id="Layer_1" x="0px" y="0px" width="18px" height="18px" viewBox="288.64 337.535 18 18" enable-background="new 288.64 337.535 18 18" xml:space="preserve">'.
              	'			<path fill="#C9C8C8" d="M295.39,337.535v2.25h9v13.5h-9v2.25h11.25v-18H295.39z M297.64,342.035v3.375h-9v2.25h9v3.375l3.375-3.375'.
              	'				l1.125-1.125l-1.125-1.125L297.64,342.035z"/>'.
              	'			</svg></i>'.
              	'				<span class="media-body">退出</span></a></li>'.
              	'		</ul>'.
              	'	</li>'.
''.
              	'	'.
''.
              	'	<li class="dropdown pmd-dropdown">'.
              	'		<a aria-expanded="false" data-toggle="dropdown" class="btn-user dropdown-toggle media pmd-ripple-effect" data-sidebar="true" href="javascript:void(0);">'.
              	'			<i class="media-left media-middle material-icons md-dark pmd-sm md-light">perm_identity'.
              	'			</i>'.
              	'			<span class="media-body">用户管理</span>'.
              	'			<div class="media-right media-bottom"><i class="dic-more-vert dic"></i></div>'.
              	'		</a>'.
              	'		<ul class="dropdown-menu">'.
              	'			<li><a href="#userCancel" data-type="urlModal">用户列表</a></li>'.
              	'		</ul>'.
              	'	</li>'.
              	'	<li class="dropdown pmd-dropdown">'.
              	'		<a aria-expanded="false" data-toggle="dropdown" class="btn-user dropdown-toggle media pmd-ripple-effect" data-sidebar="true" href="javascript:void(0);">'.
              	'			<i class="media-left media-middle material-icons md-dark pmd-sm md-light">'.
              	'				domain'.
              	'			</i>'.
              	'			<span class="media-body">教师管理</span>'.
              	'			<div class="media-right media-bottom"><i class="dic-more-vert dic"></i></div>'.
              	'		</a>'.
              	'		<ul class="dropdown-menu">'.
              	'			<!--<li><a href="">新增教师查看</a></li>-->'.
              	'			<li><a href="#teacherUpdate" data-type="urlModal">教师状态修改</a></li>'.
              	'			<li><a href="#teacherAudit" data-type="urlModal">待审核<span class="badge badge-warning pull-right">100</span></a></li>'.
              	'			<li><a href="#teacherReview" data-type="urlModal">待复核<span class="badge badge-warning pull-right">300</span></a></li>'.
              	'		</ul>'.
              	'	</li>'.
              	'	<li class="dropdown pmd-dropdown">'.
              	'		<a aria-expanded="false" data-toggle="dropdown" class="btn-user dropdown-toggle media pmd-ripple-effect" data-sidebar="true" >'.
              	'			<i class="material-icons md-dark media-left pmd-sm md-light">wrap_text</i>'.
              	'			<span class="media-body">交易管理</span>'.
              	'			<div class="media-right media-bottom"><i class="dic-more-vert dic"></i></div>'.
              	'		</a>'.
              	'		<ul class="dropdown-menu">'.
              	'			<li><a href="#dealIng" data-type="urlModal">正在交易 <span class="badge badge-warning pull-right">100</span></a></li>'.
              	'			<li><a href="#dealHis" data-type="urlModal">历史交易 <span class="badge badge-success pull-right">100</span></a></li>'.
              	'			<li><a href="#dealNo" data-type="urlModal">不正常交易 <span class="badge badge-error pull-right">100</span></a></li>'.
              	'		</ul>'.
              	'	</li>'.
''.
              	'	'.
              	'	<li class="dropdown pmd-dropdown">'.
              	'		<a aria-expanded="false" data-toggle="dropdown" class="btn-user dropdown-toggle media pmd-ripple-effect" data-sidebar="true" >'.
              	'			<i class="media-left media-middle material-icons md-dark pmd-sm md-light">turned_in</i>'.
              	'			<span class="media-body">管理员</span>'.
              	'			<div class="media-right media-bottom"><i class="dic-more-vert dic"></i></div>'.
              	'		</a>'.
              	'		<ul class="dropdown-menu">'.
              	'			<li><a href="#admin" data-type="urlModal">添加管理员 <span class="badge badge-warning pull-right">100</span></a></li>'.
              	'			<li><a href="#adminDelete" data-type="urlModal">删除管理 <span class="badge badge-success pull-right">100</span></a></li>'.
              	'		</ul>'.
              	'	</li>'.
              	'	<li>'.
              	'		<a class="pmd-ripple-effect" data-type="urlModal" href="#adminMessage">'.
              	'			<i class="media-left media-middle material-icons md-dark pmd-sm md-light">mail</i>'.
              	'			<span class="media-body">系统通知</span>'.
              	'		</a>'.
              	'	</li>'.
              	'	<li class="">'.
              	'		<a class="pmd-ripple-effect" data-type="urlModal" href="#feedBack">'.
              	'			<i class="material-icons media-left md-dark pmd-ms md-light">widgets</i>'.
              	'			<span class="media-body">意见及反馈</span>'.
              	'		</a>'.
              	'	</li>'.
              	'</ul>';
    }
    if($row['Jurisdiction']==1){
        echo '1';
    }
    if($row['Jurisdiction']==2){
            echo '2';
    }
?>