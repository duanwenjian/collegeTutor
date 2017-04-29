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
    $("#"+$(this).attr('data-content')).addClass('home-active');
    $("#"+$(this).attr('data-content')).siblings('.main-content-home').removeClass('home-active');
});

/*===========点击出现个人中心=============*/
$('.main-user-info-btn').click(function(){
    $(this).toggleClass('B-hide');
    $('.main-user-info').toggleClass('U-active');
});

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
/*==============表格列显示隐藏==================*/
const tableShow=()=>{
    $('#table-show input').click(function(){
        var check=$(this).attr('checked');
        var colls=$(this).val();
        if(check){
            $(this).attr('checked',false);
            showColl(colls,'hide');
        }else{
            $(this).attr('checked',true);
            showColl(colls,'show');
        }
    });
};

const  showColl=(index,css)=>{
    if(css=='hide') {
        $('#show-table-recruit tr').find('th:eq(' + index + ')').hide();
        $('#show-table-recruit tr').find('td:eq(' + index + ')').hide();
    }else {
        $('#show-table-recruit tr').find('th:eq(' + index + ')').show();
        $('#show-table-recruit tr').find('td:eq(' + index + ')').show();
    }
};
$(document).ready(function () {
    $('.loading').css('display','none');
    updateHeadportrait();
    tableShow();
});
