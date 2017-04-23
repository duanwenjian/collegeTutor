/**
 * Created by Administrator on 2017/3/11.
 */
/*===========更换背景图片=================*/
$('#change-bg img').click(function(){
    document.getElementById('bg-img').className = 'bg-img-' + $(this).attr('alt');
    localStorage.setItem('CTbg','bg-img-'+$(this).attr('alt'));
});

/*===========左侧选项栏店家切换事件=========*/
$('.user-menu').on('click','li',function(){
    $(this).addClass('active');
    $(this).siblings('li').removeClass('active');
    $("#"+$(this).attr('data-content')).addClass('active');
    $("#"+$(this).attr('data-content')).siblings('.main-content-home').removeClass('active');
});

/*===========点击出现个人中心=============*/
$('.main-user-info-btn').click(function(){
    $(this).toggleClass('B-hide');
    $('.main-user-info').toggleClass('U-active');
});

/*==============更换头像================*/
const updateHeadportrait=()=>{
    var Headportrait=localStorage.getItem('Headportrait');
    //导航栏头像
    $('.navbar-user-avatar').attr('src',Headportrait);
    $('.J-user-Headportrait').attr('src',Headportrait);
};

$(document).ready(function () {
    $('.loading').css('display','none');
    updateHeadportrait();
});
