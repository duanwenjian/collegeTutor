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
});

/*===========点击出现个人中心=============*/
$('.main-user-info-btn').click(function(){
    $(this).addClass('B-hide');
    $('.main-user-info').removeClass('U-active');
});
