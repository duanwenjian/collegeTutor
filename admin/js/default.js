/**
 * Created by Administrator on 2017/5/30.
 */
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
//getLeft();
$(document).ready(function(){
    updataUser();
    if(getCookie('Jurisdiction')==1){
        $('#show-2').hide();
        $('#show-0').hide();
    }
    if(getCookie('Jurisdiction')==2){
        $('#show-1').hide();
        $('#show-0').hide();
    }
});
//更改用户名字头像
function updataUser(){
    $('.j-username').html(getCookie('username'));
    $('.j-Headportrait').html(getCookie('Headportrait'));
}

//获取地址栏

function GetQueryString(name)
{
    var r = window.location.href;
    return r.split('#')[1];
}
//template 7

function t7(data,template) {
    var compiledTemplate = Template7.compile(template);
    return  compiledTemplate(data);
}
//动态加载js
function createJs(jsName) {
    $('#createJS').remove();
    var oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.src = 'js/route/'+jsName+'.js';
    oScript.id="createJS";
    $('#cr').after(oScript);
}
//路由模块化
$('a[data-type="urlModal"]').click(function(){
    setTimeout(function(){
        var route=GetQueryString();
        $('#other').html('');
        switch (route) {
            case "userShow":
                //userShow();
                break;
            case "userUpdate":
                //userShow();
                break;
            case "userCancel":
                createJs('userCancel');
                break;
            case "teacherUpdate":
                createJs('teacherUpdate');
                break;
            case "teacherAudit":
                createJs('teacherAudit');
                break;
            case "teacherReview":
                createJs('teacherReview');
                break;
            case "teacherCancel":
                //userShow();
                break;
            case "dealIng":
                createJs('dealIng');
                break;
            case "dealHis":
                //userShow();
                createJs('dealHis');
                break;
            case "dealNo":
                //userShow();
                break;
            case "admin":
                //userShow();
                createJs('admin');
                break;
            case "adminDelete":
                //userShow();
                createJs('adminDelete');
                break;
            case "adminMessage":
                createJs('adminMessage');
                //userShow();
                break;
            case "feedBack":
                createJs('feedBack');
                break;
            case "haveTeacher":
                createJs('haveTeacher');
                break;
        }
    },50);
});


function getLeft(){
    $.ajax({
        url:'php/left.php',
        data:{'Jurisdiction':getCookie('Jurisdiction')},
        dataType:'text',
        type:'get',
        success:function(data){
            $('aside').html(data);
            updataUser();
        },
        error:function(){}
    });
}


var goEasy;
messagehelp();
function messagehelp() {
//消息
    goEasy = new GoEasy({
        appkey: 'BC-d2d2b974b32847e3bb7bd70b76bf0837'
    });
    /*goEasy.subscribe({
        channel: 'collegeTutorAllUser',//通知用户
        onMessage: function (message) {
        }
    });*/
    goEasy.subscribe({
        channel: 'collegeTutorMessageAdmin',
        onMessage: function (message) {
            //系统消息
            //var data=JSON.parse(message.content);
            var str=`
                <li class="list-group-item unread">
							<a href="#">
								<div class="media-left">
									<span class="avatar-list-img40x40">
										<img alt="40x40" data-src="holder.js/40x40" class="img-responsive" src="themes/images/profile-4.png" data-holder-rendered="true">
									</span>
								</div>
								<div class="media-body">
									<span class="list-group-item-heading j-username"><span>系统消息</span> 您新增了一条待审批数据</span>
									<span class="list-group-item-text">1分之内</span>
								</div>
							</a>
						</li>
            `;
            $('#messageList').find('li:first-child').hide();
            $('#messageList').append(str);
            var num=parseInt($('#numMessage').attr('data-badge'))+1;
            $('#numMessage').attr('data-badge',num);
            //alertMessage(data.title,data.text);
        }
    });

}