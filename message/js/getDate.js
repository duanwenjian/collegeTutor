/**
 * Created by Administrator on 2017/5/22.
 */
$(document).ready(function(){
    getUserMessage();
    if(window.username){
        $('#search__input').val(window.username);
    }
});
function getDate(n){
    var time;
    if(!n) {
        time = new Date();
    }else{
        time = new Date();
        time.setTime(parseInt(n) * 1000);
    }
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var M = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + ((m < 10) ? ('0' + m) : m) + '-' + ((d < 10) ? ('0' + d) : d) + ' ' + h + ':' + ((M < 10) ? ('0' + M) : M) + ':' + ((s < 10) ? ('0' + s) : s);
}
function JSgetDate(n){
    var time;
    if(!n) {
        time = new Date();
    }else{
        time = new Date();
        time.setTime(parseInt(n));
    }
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var M = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + ((m < 10) ? ('0' + m) : m) + '-' + ((d < 10) ? ('0' + d) : d) + ' ' + h + ':' + ((M < 10) ? ('0' + M) : M) + ':' + ((s < 10) ? ('0' + s) : s);
}
function getUserMessage(){
    var userInfo={
        'userID':localStorage.getItem('userID')
    };
    $.ajax({
        url:'php/getUserMessage.php',
        type:'GET',
        data:userInfo,
        dataType:'JSON',
        success:function(data){
            //var data=JSON.parse(data);
            if(data.retCode==0){
                getUserMessageHtml(data);
            }else{
                //getUserMessageError();
            }
        },
        error:function(){
            //getUserMessageError();
        }
    });
};
var chat=null,dealList=[];
function getUserMessageHtml(data){
    $('.user-name').html(data.userInfo.username);
    $('.user-email').html(data.userInfo.email);
    $('.user-Headportrait').attr('src','../'+data.userInfo.Headportrait);
    var chatList={};
    for(var i=0;i<data.chat.length;i++){
        data.chat[i]['regtime']=getDate(data.chat[i]['regtime']);
        if(chatList[data.chat[i].fromUserID]){
            chatList[data.chat[i].fromUserID]['username']=data.chat[i]['username'];
            chatList[data.chat[i].fromUserID]['Headportrait']=data.chat[i]['Headportrait'];
            chatList[data.chat[i].fromUserID]['chatArr'].push(data.chat[i]);
        }else{
            chatList[data.chat[i].fromUserID]={
                'username':null,
                'Headportrait':null,
                'chatArr':[]
            };
            chatList[data.chat[i].fromUserID]['username']=data.chat[i]['username'];
            chatList[data.chat[i].fromUserID]['Headportrait']=data.chat[i]['Headportrait'];
            chatList[data.chat[i].fromUserID]['chatArr'].push(data.chat[i]);
        }
    }
    for(var s=0;s<data.deal.length;s++){
        dealList.push(data.deal[s]);
    }
    chat=chatList;
    getUserMessageSuccess(chatList);
};
function getUserMessageSuccess(data){
    var html='';
    for(var j in data){
        html+=`<div class="contact" data-noMessage="0" data-userId="${j}">
						<img src="../${data[j].Headportrait}" alt="" class="contact__photo" />
						<span class="contact__name">${data[j].username}</span>
						<span class="contact__status online"></span>
					</div>`;
    };
    $('.user-list').html(html);
};
var adminshow=0;
$('body').on('click','.chat_admin',function(){
    getUserAdminMessage(dealList);
    adminshow=1;
});
function getUserAdminMessage(data){
    var html='';
    for(var k=0;k<data.length;k++){
        html+=`<div class="admin-message">
						<div class="admin-card">
							<div class="admin-header">系统消息</div>
							<div class="admin-content">
								<p>您有一条待处理聘请，请尽快处理!</p>
							</div>
							<div class="admin-footer">
								<p><a href="#" class="j-main-localtion" data-href="../dealSelect.html" data-argument='dealId=${data[k].id}'>查看详情</a></p>
							</div>
						</div>
					</div>`;
    }
    $('.chat__messages').html(html);
}
$('body').on('click','.user-list .contact',function(){
    if(+$(this).attr('data-noMessage')==0) {
        var data = chat[$(this).attr('data-userid')].chatArr,html='';
        for (var k = 0; k < data.length; k++) {
            html += `<div class="chat__msgRow">
			        <div class="chat__message mine"><p>${data[k].content}</p><span class="chat-time">${data[k].regtime}</span></div>
			      </div>`;
        }
        $(this).find('.contact__status').removeClass('online');
        $('.chat__messages').html(html);
    }else{
        $(this).find('.contact__status').removeClass('online');
        getMessageHtml($(this).attr('data-userid'));
    }
    $('.send-btn').attr('data-userid',$(this).attr('data-userid'));
});


$(".search__input").bind("keydown",function(e){
    // 兼容FF和IE和Opera
    var theEvent = e || window.event;
    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    if (code == 13) {
        //回车执行查询
        if($(this).val()==''){
            return;
        }
        usernameGerTeacher($(this).val());
    }
});

function usernameGerTeacher(name){
    $.ajax({
        url:'php/usernameGetTeacher.php',
        type:'GET',
        data:{'username':name,'id':localStorage.getItem('userID')},
        dataType:'JSON',
        success:function(data){
            //var data=JSON.parse(data);
            if(data.retCode==0){
                var html='';
                for(var j in data.teacherList){
                    html+=`<div class="contact animated fadeInUp" data-noMessage="1" data-userid="${data.teacherList[j].id}">
						<img src="../${data.teacherList[j].Headportrait}" alt="" class="contact__photo" />
						<span class="contact__name">${data.teacherList[j].username}</span>
						<span class="contact__status online"></span>
					</div>`;
                };
                $('.user-list').html(html);
            }else{
            }
        },
        error:function(){
        }
    });
};
var goEasy = new GoEasy({
    appkey: "BC-d2d2b974b32847e3bb7bd70b76bf0837"
});
//聊天
//接受消息
goEasy.subscribe({
    channel: "collegeTutor"+localStorage.getItem('userID'),
    onMessage: function (message) {
        var e=JSON.parse(message.content);
        if(e.type=='text'){
            GetMsg(JSON.parse(message.content));
        }
        if(e.type=='apply'){
            dealList.push(e);
            if(adminshow==1){
                $('.chat__messages').append(`<div class="admin-message">
						<div class="admin-card">
							<div class="admin-header">系统消息</div>
							<div class="admin-content">
								<p>您有一条待处理聘请，请尽快处理!</p>
							</div>
							<div class="admin-footer">
								<p><a href="#" class="j-main-localtion" data-href="dealinfo.html" data-argument='dealId=${e.messageID}'>查看详情</a></p>
							</div>
						</div>
					</div>`);
            }
        }
    },
    onSuccess: function () {
        //alert("Channel订阅成功。");
    },
    onFailed: function (error) {
        //alert("Channel订阅失败, 错误编码：" + error.code + " 错误信息：" + error.content)
    }
});
//发送消息
function userSendMessage(data,callback){
    $.ajax({
        type: 'POST',
        url: '../php/sendMessage.php',
        data: data,
        dataType: 'json',
        success: function(data){
            if(data.code==200){
                (typeof callback==='function')?callback():"";
            }
        },
        error:function(){
            console.log('message send error');
        }
    });
}

$('.send-btn').click(function(){
    var msg={
        'fromUserID':localStorage.getItem('userID'),
        'toUserID':$(this).attr('data-userid'),
        'msg':$(this).prev().val(),
        'type':'text'
    };
    userSendMessage(msg,sendMsg());
});
function sendMsg(){
    $('.chat__messages').append(`<div class="chat__msgRow">
			        <div class="chat__message notMine"><p>${$('.send-btn').prev().val()}</p><span class="chat-time">${JSgetDate((new Date()).getTime())} </span></div>
			      </div>`);
    $('.send-btn').prev().val('');
}
var messageArr={};
function GetMsg(data){
    if(messageArr[data.toUserId]){
        messageArr[data.toUserId].push(data);
    }else{
        messageArr[data.toUserId]=[];
        messageArr[data.toUserId].push(data);
    }
    getUserList(messageArr);
    if($('.send-btn').attr('data-userid')==data.toUserId){
        $('.chat__messages').append(`<div class="chat__msgRow">
			        <div class="chat__message mine"><p>${data.msg}</p><span class="chat-time">${getDate(data.rettime)}</span></div>
			      </div>`);
    }
}
function getUserList(data){
    var html='';
    for(var s in data){
        html+=`<div class="contact" data-noMessage="1" data-userid="${data[s][0].toUserId}">
						<img src="../${data[s][0].fromUserHeadportrait}" alt="" class="contact__photo"  />
						<span class="contact__name">${data[s][0].fromUserName}</span>
						<span class="contact__status"></span>
					</div>`;
    }
    $('.user-list').html(html);
}
function getMessageHtml(id){
    if(!messageArr[id])return;
    var html='';
    for (var i = 0; i < messageArr[id].length; i++) {
        html+=`<div class="chat__msgRow">
			        <div class="chat__message mine"><p>${messageArr[id][i].msg}</p><span class="chat-time">${getDate(messageArr[id][i].rettime)}</span></div>
			      </div>`;
    }
    $('.chat__messages').html(html);
}


