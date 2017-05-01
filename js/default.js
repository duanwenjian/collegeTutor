/**
 * Created by Administrator on 2017/3/12.
 */
$(document).ready(function(){
    custom.init();
});
//var address="http://localhost/dashboard/collegetutor";
var address="http://www.veneno.online";

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
