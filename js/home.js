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
    var html=[];
    if(data.length<=0){
        $('.j-search-return').show();
    }
    for(var i=0;i<data.length;i++){
        if(push){
            TearcherList.push(data[i]);
        }
        var startNum='';
        for(var j=0;j<data[i].rank;j++){
            startNum+='<li><img src="img/home/user-start/3.gif" alt="1星级"/></li>';
        }
        /*animated
        zoomInUp
        animated
        zoomInUp
        animated
        zoomInUp
        animated
        zoomInUp
        animated
        zoomInUp*/
        html.push(`<div class="pull-left animated zoomInUp">
                   <div class="card">
                   <a href="teacherInfoShow.html?userID=${data[i].id}">
                       <div class="card-content">
                           <div class="card-start start-4"></div>
                           <div class="card-bg"></div>
                           <div class="card-img">
                               <img src="${data[i].Headportrait}" alt="${data[i].username}"/>
                           </div>
                           <ul class="card-start" data-toggle="tooltip" data-placement="right" title="${data[i].Grade}星级">
                           ${startNum}
                            </ul>
                           <h5>${data[i].username}</h5>
                           <span>${data[i].major}</span>
                           <div class="card-money">
                               <span>${data[i].Grade}</span>
                           </div>
                           <!--<a href="teacherInfoShow.html?userID=${data[i].id}" class="card-btn"><span><i class="glyphicon glyphicon-plus"></i></span>Add</a>-->
                       </div>
                       <div class="card-footer">
                       </div>
                   </a>
                   </div>
               </div>`);
    }
    $('.teacherShow-main').html('');
    var timer=setInterval(function(){
        animationHtml(html,'.teacherShow-main',timer,function(){
            $('.teacherShow-main .pull-left').removeClass('animated zoomInUp');
        },true);
    },200);
    //animationHtml(html,'.teacherShow-main',timer);
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

$('.j-start-desc').click(function(e){
    e.preventDefault();
    if($(this).find('.glyphicon-arrow-down').length==1){
        TearcherList.sort(function(a,b){return b.rank-a.rank});
        homeGetHtml(TearcherList,false);
        $(this).find('.glyphicon').removeClass('glyphicon-arrow-down').addClass('glyphicon-arrow-up');
    }else{
        TearcherList.sort(function(a,b){return a.rank-b.rank});
        homeGetHtml(TearcherList,false);
        $(this).find('.glyphicon').removeClass('glyphicon-arrow-up').addClass('glyphicon-arrow-down');
    }
});


//招聘页面信息
function getRecruitInfo(num){
    var obj={
        'pageNum':num
    }
    $.ajax({
        url:'php/getRecruitInfoList.php',
        type:'GET',
        data:obj,
        dataType:'JSON',
        success:function(data){
            if(data.retCode==0){
                getRecruitHtml(data.retData);
            }
        },
        error:function(){}
    });
}
function getRecruitHtml(data){
    var date=data.data;
    var html='';
    for(var h=0;h<date.length;h++){
        html+=`<tr>
                  <td>${date[h].major}</td>
                  <td>${date[h].Price}/小时</td>
                  <td>${date[h].Subject}</td>
                  <td>${date[h].sex}童鞋</td>
                  <td>${date[h].Remarks}</td>
               </tr>`;
    }
    $('#show-table-recruit tbody').html(html);

    var page='';
    if(data.pageNum>1) {
        page += `<li>
               <span aria-label="Previous">
                   <span aria-hidden="true">&laquo;</span>
               </span>
           </li>`
    }
    if(data.pageNum-1>0){
        page+=`<li><span class="pageNumber">${data.pageNum-1}</span></li>`
    }
    if(data.pageNum-2>0){
        page+=`<li><span class="pageNumber">${data.pageNum-2}</span></li>`
    }
    //if(data.pageNum!=data.pageCount){
        page+=`<li class="active"><span>${data.pageNum}</span></li>`;
    //}
    if(data.pageNum+1<=data.pageCount){
        page+=`<li><span class="pageNumber">${data.pageNum+1}</span></li>`
    }
    if(data.pageNum+2<=data.pageCount){
        page+=`<li><span class="pageNumber">${data.pageNum+2}</span></li>`
    }
    if(data.pageNum<data.pageCount) {
        page += `<li>
               <span aria-label="Next">
                   <span aria-hidden="true">&raquo;</span>
               </span>
           </li>`;
    }
    $('#recruit-page').html(page);
};
$('li[data-content="tutor"]').click(function(){
    getRecruitInfo(1);
});

$('#recruit-page').on('click','span.pageNumber',function(){
    getRecruitInfo($(this).text());
});
$('#recruit-page').on('click','span[aria-label="Next"]',function(){
    getRecruitInfo(parseFloat($('#recruit-page li.active span').text())+1);
});
$('#recruit-page').on('click','span[aria-label="Previous"]',function(){
    getRecruitInfo(parseFloat($('#recruit-page li.active span').text())-1);
});


function echer3(d) {
//好评标
    var teacherfeed = echarts.init(document.getElementById('content-teacher'), 'wonderland');
    var data=d;
    option3 = {
        title : {
            text: '教师科目分布统计',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            x : 'center',
            y : 'bottom',
            data:echer3Title(d)
        },
        toolbox: {
            show : true,
            feature : {
                /*mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {
                    show: true,
                    type: ['pie', 'funnel']
                },
                restore : {show: true},*/
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        series : [
            {
                name:'所占全部评论比例',
                type:'pie',
                radius : [30, 110],
                center : ['50%', '50%'],
                roseType : 'area',
                data:data
            }
        ]
    };
    teacherfeed.setOption(option3);
}

function echer2(d){

    var userfeed = echarts.init(document.getElementById('content-user'), 'wonderland');

    var dataGZ = echer2data(d);

    var itemStyle = {
        /*normal: {
            opacity: 1,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'rgba(0, 0, 0, 0.1)'
        }*/
    };
    /*var schema = [
        {name: 'date', index: 0, text: '用户名'},
        {name: 'AQIindex', index: 1, text: '注册时间'}
    ];*/
    option = {


        legend: {
            y: 'top',
            data: [ '用户注册量'],
            textStyle: {
                color: '#404a59',
                fontSize: 16
            }
        },
        grid: {
            x: '5%',
            x2: '10%',
            y: '10%',
            y2: '5%'
        },

        xAxis: {
            type: 'value',
            name: '日期',
            nameGap: 16,
            nameTextStyle: {
                //color: '#404a59',
                fontSize: 14
            },
            max: 31,
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    //color: '#404a59'
                }
            }
        },
        tooltip: {
            padding: 10,
            formatter: function (obj) {
                var value = obj.value;
                return '<p style="text-align: center;margin: 0 0 3px 0"><img src="'+value[3]+'" style="width: 40px;height: 40px;border-radius: 50%" alt="veneno"/></p>'+
                     '<p style="font-size: 12px;text-align: center;margin: 0">'+value[2] + '</p>';
            }
        },
        yAxis: {
            type: 'value',
            name: '时间',
            nameLocation: 'end',
            nameGap: 20,
            nameTextStyle: {
                //color: '#404a59',
                fontSize: 16
            },
            axisLine: {
                lineStyle: {
                    //color: '#404a59'
                }
            },
            splitLine: {
                show: false
            }
        },
        visualMap: [

        ],
        series: [

            {
                name: '用户注册量',
                type: 'scatter',
                itemStyle: itemStyle,
                data: dataGZ
            }
        ]
    };
    userfeed.setOption(option);
}

getFunctionInfo();
function getFunctionInfo(){
    var obj={};
    $.ajax({
        url:'php/getFunctionInfo.php',
        type:'GET',
        data:obj,
        dataType:'JSON',
        success:function(data){
            if(data.retCode==1){
                //getRecruitHtml(data.retData);
                echer3(data.teacherInfo);
                echer2(data.userinfo);
            }
        },
        error:function(){}
    });
}

function echer3Title(data){
    var arr=[];
    for(var i=0;i<data.length;i++){
        arr.push(data[i].name);
    }
    return arr;
}

function echer2data(data){
    var arr=[];
    for(var i=0;i<data.length;i++){
        arr.push(getDayAndTime(data[i].time,[data[i].username,data[i].Headportrait]));
    }
    return arr;
}

function getDayAndTime(t,other){
    var time=new Date(parseInt(t)*1000);
    var d=time.getDate();
    var m=time.getMinutes();
    var h=time.getHours()/time.getHours()+Math.random()*24;
    return [d,h].concat(other);
}


function searchTeacher(word){
    var obj={
        'word':word
    };
    $('.teacherShow-main').html('');
    $('.j-search-load').show();
    $.ajax({
        url:'php/searchTeacher.php',
        type:'GET',
        data:obj,
        dataType:'JSON',
        success:function(data){
            if(data.retCode==1){
                $('.j-search-load').hide();
                homeGetHtml(data.teacherInfo,false);
            }
        },
        error:function(){}
    });
}

$('body').on('click','#searchTeacher',function(){
    searchTeacher($.trim($('#keyword').val()));
});