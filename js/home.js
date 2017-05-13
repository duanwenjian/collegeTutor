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
const TearcherList=[];
//todo:保存当前显示教师
$(document).ready(function () {
    //updateHeadportrait();
    tableShow();
    getTeacherList(1);
});

function getTeacherList(page){
    $.ajax({
        url:'php/getTeacherList.php',
        type:'GET', //GET
        async:true,    //或false,是否异步
        data:{'pageNum':page},
        timeout:10000,    //超时时间
        dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success:function(data,textStatus,jqXHR){
            if(+data.retCode==0){
                //查询成功
                loadingHide();
                homeGetHtml(data.retData.data,true);
            }else{
                loadingHide();
                alert(data.retMsg);
            }
        },
        error:function(xhr,textStatus){
            console.log("请求失败");
        }
    })
}

function homeGetHtml(data,push){
    var html='';
    for(var i=0;i<data.length;i++){
        if(push){
            TearcherList.push(data[i]);
        }
        html+=`<div class="pull-left">
                   <div class="card">
                       <div class="card-content">
                           <div class="card-start start-4"></div>
                           <div class="card-bg"></div>
                           <div class="card-img">
                               <img src="${data[i].Headportrait}" alt=""/>
                           </div>
                           <h5>${data[i].username}</h5>
                           <span>${data[i].major}</span>
                           <div class="card-money">
                               <span>￥${data[i].Price}</span>
                           </div>
                           <a href="#" class="card-btn"><span><i class="glyphicon glyphicon-plus"></i></span>Add</a>
                       </div>
                   </div>
               </div>`;
    }
    $('.teacherShow-main').html(html);
}


$('.j-prace-desc').click(function(e){
    e.preventDefault();
    if($(this).find('.glyphicon-arrow-down').length==1){
        TearcherList.sort(function(a,b){return b.Price-a.Price});
        homeGetHtml(TearcherList,false);
        $(this).find('.glyphicon').removeClass('glyphicon-arrow-down').addClass('glyphicon-arrow-up');
    }else{
        TearcherList.sort(function(a,b){return a.Price-b.Price});
        homeGetHtml(TearcherList,false);
        $(this).find('.glyphicon').removeClass('glyphicon-arrow-up').addClass('glyphicon-arrow-down');
    }
});