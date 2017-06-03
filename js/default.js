/**
 * Created by Administrator on 2017/3/12.
 */
$(document).ready(function(){
    custom.init();
    updateHeadportrait();
    if(!getCookie('username')){
        alert('请先登录');
        window.location.href='./login.html';
    }
});
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return false;
}
createGoeasy();
function createGoeasy(){
    var head= document.getElementsByTagName('head')[0];
    var script= document.createElement('script');
    script.type= 'text/javascript';
    script.onload = script.onreadystatechange = function() {
        if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) {
            messagehelp();
            script.onload = script.onreadystatechange = null;
        } };
    script.src= 'https://cdn.goeasy.io/goeasy.js';
    head.appendChild(script);
}
//var address="http://localhost/dashboard/collegetutor";
var address="https://www.collegetutor.cn";
//
//定义教师状态码
const statusText={
    '0':{
        'text':'正常',
        'status':5
    },
    '1':{
        'text':'禁用',
        'status':5
    },
    '200':{
        'text':'审核通过',
        'status':3
    },
    '201':{
        'text':'审核中',
        'status':3
    },
    '202':{
        'text':'审核失败',
        'status':3
    },
    '300':{
        'text':'复核成功',
        'status':4
    },
    '301':{
        'text':'复核中',
        'status':4
    },
    '302':{
        'text':'复核失败',
        'status':4
    }
}
function loadingHide(){
    $('body >.loading').css('display','none');
}
//自定义组件
var custom={
    that:'',
    init:function(){
        this.elementHide();
        this.elementClose();
        this.elementClick();
        this.bodygetBg();
        this.elementShowInfo();
        this.elementTip();
        this.mainShow();
        this.userExit();
    },
    /*==========背景保存============*/
    bodygetBg:function(){
        if(!localStorage.getItem('CTbg')) {
        }else{
            if(!document.getElementById('bg-img'))return;
            document.getElementById('bg-img').className = localStorage.getItem('CTbg');
        }
    },
    /*=====点击影藏显示指定对象==========*/
    /*====类型data-type=" hide" data-toggle="1显示 0隐藏" data-content="隐藏对象id"==*/
    elementHide:function(){
        $('body').on('click','[data-type="hide"]',function(){
            var that=$(this).data('content');
            if ($(this).data('toggle') == '1') {
                $('#' + that).show();
                $(this).data('toggle', '0');
                if($(this).data('ico')=='1'){
                    $(this).addClass('active');
                }
            } else {
                $('#' + that).hide();
                $(this).data('toggle', '1');
                if($(this).data('ico')=='1'){
                    $(this).removeClass('active');
                }
            }
        });
    },
    /*=====关闭标签=============*/
    /*====类型data-type="关闭标签 close"==*/
    elementClose:function(){
        $('body').on('click','[data-type="close"] strong',function(){
            $(this).parent().parent().children().remove($(this).parent()[0].nodeName+':eq('+$(this).parent().index()+')');
        });
        $('body').on('dblclick','[data-type="close"] span',function(){
            $(this).parent().children().remove($(this)[0].nodeName+':eq('+$(this).index()+')');
        });
    },

    /*=======添加对象到指定区域=============*/
    /*=======类型data-type="clickTo ???????" data-to="目标区域id"=====*/
    elementClick:function(){
        $('body').on('click','[data-type="clickTo"] span',function(){
            $('#'+$(this).parent().data('to')).append('<span data-type="'+$(this).data('type')+'" class="'+$(this).attr("class")+'">'+$(this).html()+'<strong>&times;</strong></span>');
        });
    },

    /*==========教师信息介绍============*/
    /*==========类型 data-type='showInfo' data-infoContent='展示内容'==============*/
    elementShowInfo:function(){
        $('body').on('mouseover','[data-type="showInfo"]',function(){
            var x=parseFloat($(this).offset().left)+parseFloat($(this).css('width'))/2-parseFloat($('.labelInfo').css("width"))/2+"px";
            var y=parseFloat($(this).offset().top)+parseFloat($(this).css('height'))+10+"px";
            $('.labelInfo').css("left",x).css('top',y);
            $('.labelInfo-tilte span').html($(this).html());
            $('.labelInfo-content span').html($(this).data("showcontent"));
            $('.labelInfo').show();
        });
        $('body').on('mouseout','[data-type="showInfo"]',function(){
            $('.labelInfo').hide();
        });
    },

    /*===显示提示信息*/
    /*=========data-tip="提示内容"==========*/
    elementTip:function(){
        /*$('body').on('mouseover','[data-tip]',function(){
            $('.tip-center').html($(this).data('tip'));
            var x=parseFloat($(this).offset().left)-(parseFloat($(".tip").css('width'))-parseFloat($(this).css('width')))/2+"px";
            var y=parseFloat($(this).offset().top)+parseFloat($(this).css('height'))+"px";
            $('.tip').css("left",x).css('top',y);
            $('.tip').show();
        });
        $('body').on('mouseout','[data-tip]',function(){
            $('.tip').hide();
        });*/
        $('[data-toggle="tooltip"]').tooltip();
    },

    /*==========设置展示区高度==================*/
    mainShow:function(){
        if($('#bg-img').length==0)return;
        var h=$('#bg-img')[0].scrollHeight-80;
        $('.main-content-home').css('height',h);
        $('.main-user-info').css('height',h)
    },
    userExit:function(){
        //用户退出
        $('body').on('click','.user-exit',function(){
            localStorage.clear();
            window.location.href='./login.html';
        });
    }
};
/*==============更换头像================*/
const updateHeadportrait=()=>{
    var Headportrait=localStorage.getItem('Headportrait');
    var username=localStorage.getItem('username');
    //导航栏头像
    $('.navbar-user-avatar').attr('src',Headportrait);
    $('.J-user-Headportrait').attr('src',Headportrait);
    //更换用户名
    $('.j-username').html(username);
};
//获取时间
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

//获取地址栏参数
function getUrlParam(name)
{
    /*var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r!=null) return unescape(r[2]); return null; //返回参数值*/
    var url = window.location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            //就是这句的问题
            theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
            //之前用了unescape()
            //才会出现乱码
        }
    }
    return theRequest[name];
}

//发送消息
function userSendMessage(data,callback){
    $.ajax({
        type: 'POST',
        url: 'php/sendMessage.php',
        data: data,
        dataType: 'json',
        success: function(data){
            if(data.code==200){
                (typeof callback==='function')?callback():"";
            }
            if(data.retCode==0){
                $('#message-push').modal('hide');
                $('.j-message').html('正在发送请求');
                (typeof callback==='function')?callback():"";
                /*var meg=`<div class="alert alert-default alert-dismissible" role="alert">
                        <p class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></p>
                        <strong>系统消息</strong> ${data.retMsg}
                    </div>`;
                $('.newMessage').append(meg);
                messageClose();*/
                alertMessage('系统消息',data.retMsg);
            }
        },
        error:function(){
            console.log('message send error');
        }
    });
}

//弹出信息
function alertMessage(title,info){
    if($('.newMessage').length>0){
        var html = `<div class="alert alert-default alert-dismissible" role="alert">
                        <p class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></p>
                        <strong>${title}</strong> ${info}
                    </div>`;
        $('.newMessage').append(html);
    }else {
        var div = document.createElement('div');
        div.className = 'newMessage';
        document.body.appendChild(div);
        var html = `<div class="alert alert-default alert-dismissible" role="alert">
                        <p class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></p>
                        <strong>${title}</strong> ${info}
                    </div>`;
        $('.newMessage').append(html);
    }
    messageClose();
}
var goEasy;
function messagehelp() {
//消息
    goEasy = new GoEasy({
        appkey: 'BC-d2d2b974b32847e3bb7bd70b76bf0837'
    });
    goEasy.subscribe({
        channel: 'collegeTutor' + localStorage.getItem('userID'),
        onMessage: function (message) {
            var data = JSON.parse(message.content);
            //console.dir(data);
            if (data.type == 'text') {
                var meg = `<div class="alert alert-default alert-dismissible" role="alert">
                        <p class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></p>
                        <strong>${data.fromUserName}</strong> ${data.msg}
                    </div>`;
                $('.newMessage').append(meg);
                messageClose();
            }
            if (data.type == 'apply') {
            }
        }
    });

    goEasy.subscribe({
        channel: 'collegeTutorAllUser',
        onMessage: function (message) {
            //系统消息
            var data=JSON.parse(message.content);
            alertMessage('系统消息',data.text);
            //alertMessage(data.title,data.text);
        }
    });
}
var timer;
function messageClose(){
    if(timer)clearInterval(timer);
    timer=setInterval(function(){
        $('.newMessage').find('div.hide-alert').remove();
        if($('.newMessage').find('div.alert:nth-child(1)').length==0){
            clearInterval(timer);
            timer=null;
            return;
        }
        $('.newMessage').find('div.alert:nth-child(1)').addClass('hide-alert');
    },2500);
}
function userGetMessage(userID,callback){
}


//呼出消息界面

function getMessagePanel(){
    if($('.messagePanel').length>=1){
        messagePanelOut();
    }
    var messagePanel=document.createElement('div');
    messagePanel.className='messagePanel animated zoomInUp';
    try{
        var iframe = document.createElement('<iframe scrolling="no" id="messagePanel" name="messageIframe" src="message/index.html"></iframe>');
    }catch(e){
        var iframe = document.createElement('iframe');
        iframe.src = 'message/index.html';
        iframe.name="messageIframe";
        iframe.id='messagePanel';
        iframe.scrolling='no';
    }
    messagePanel.appendChild(iframe);
    document.body.appendChild(messagePanel);
}

function messagePanelOut(){
    $('.messagePanel').addClass('zoomOutDown');//messagePanelOut
    setTimeout(function(){
        try {
            $('.messagePanel').remove();
        }catch(e){
            $('.messagePanel').css('display','none');
        }
    },1000);
};

$('.messagePanelIn').click(function(){
    getMessagePanel();
});

function localtionUrl(e,n){//e 地址 n 参数
    window.location.href=e+'?'+n;
}

//动态显示

function animationHtml(data,parent,timer,callback){//数据层 父元素 定时器 回调函数 是否清空父元素
    var last=data.pop();
    if(last) {
        $(parent).append(last);
    }else{
        clearInterval(timer);
        if(typeof callback==='function'){
            //setTimeout(callback(),1000);
        }
    }
}