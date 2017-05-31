/**
 * Created by Administrator on 2017/5/26.
 */
/*var picker = new Pikaday(
 {
 field: document.getElementById('startTime'),
 firstDay: 1,
 minDate: new Date('1900-01-01'),
 maxDate: new Date(),
 yearRange: [1900,2020]
 });
 var pickerend = new Pikaday(
 {
 field: document.getElementById('endTime'),
 firstDay: 1,
 minDate: new Date('1900-01-01'),
 maxDate: new Date(),
 yearRange: [1900,2020]
 });*/
$(document).ready(function(){
    $('#teachername').html(getUrlParam('teacherName'));
    var h=$('#bg-img')[0].scrollHeight-70;
    $('.main-tab').css('height',h);
    getDealDate();
});


$('.main-left-tab li').click(function(){
    $(this).addClass('tab-active');
    $(this).siblings().removeClass('tab-active');
    $($(this).attr('data-tabTo')).addClass('main-active');
    $($(this).attr('data-tabTo')).siblings().removeClass('main-active');
    $($(this).attr('data-tabTo')).siblings().find('ul>div').hide();
    getDealDate();
});
/*var data=[
    `<li class="animated fadeInUp">
            <div>
                <p>编号：<span>123456789</span></p>
                <p>开始时间：<span class="padding-right-left">2017-06-30</span>  结束时间：<span>201-06-30</span></p>
                <p>课时费：<span>100</span>元</p>
            </div>
            <div class="right">
                <!--<a href="#" class="deal-btn deal-success">同意</a>-->
                <a href="#" class="deal-btn deal-danger">取消</a>
            </div>
        </li>
        <div class="deal-info-d">
            <p><span id="teachername">用户三</span>老师，您好！</p>
            <div>
                <div style="padding-left: 24px">
                    <p>经过我认真的筛选，我将诚挚聘请您为我的孩子做家教辅导！</p>
                    <p>辅导时间为： <span class="text-danger" data-bind="startTime">2017-05-02</span> 开始至 <span class="text-danger" data-bind="endTime">2017-05-11</span> 结束 。上课方式为每周 <span class="text-danger j-daytime"> </span> 。每天 <span class="text-danger" data-bind="daytime"></span> 小时 。</p>
                    <p>课时费：每小时人民币 <span class="text-danger" data-bind="Price"> </span>元 。</p>
                    <p>辅导方式为： <span class="text-danger" data-bind="teacherType">教师上门</span><span style="margin-left: 50px">结算时间： <span class="text-danger" data-bind="Subject"></span></span></p>
                    <p class="j-address">地址： <span class="text-danger" data-bind="address"> </span></p>
                    <p>备注： <span data-bind="Remarks"></span></p>
                </div>
            </div>
        </div>`
];*/

/*var timer=setInterval(function(){
    animationHtml(data,'#deal-waring',timer,function(){});
},300);*/


$('.main').on('click','li',function(e){
    if($(this).next().length>=1&&$(this).next()[0].nodeName=='DIV'){
//            $(this).parents('ul').children('div').hide();
        if($(this).next().css('display')=='none') {
            $(this).next().show();
        }else{
            $(this).next().hide();
        }
    }
});

var  serverData;
function getDealDate(){
    $.ajax({
        url:'php/dealinfoShow.php',
        type:'GET',
        data:{'userID':localStorage.getItem('userID')},
        dataType:'json',
        success:function(data){
            if(data.retCode==0){
                getHtml(data.dealinfo);
                serverData=data.dealinfo;
            }
        },
        error: function () {
        }
    });
}
function str(s,n){
    if(s.length<n){
        var l=n-s.length;
        for(var i=0;i<l;i++) {
            s = '0' + s;
        }
    }
    return s;
}

function getHtml(data){
    var dealhisAll=data.dealhis.fromdeal.concat(data.dealhis.todeal);
    getOneHtml(dealhisAll,'','#deal-his-ok','all');
    var dealingaAll=data.dealing.fromdeal.concat(data.dealing.todeal);
    getOneHtml(dealingaAll,'','#deal-waring','all');
    var dealnoAll=data.dealno.todeal.concat(data.dealno.fromdeal);
    getOneHtml(dealnoAll,'','#deal-ok','all');
}


function getNowDate(n){
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
$('.selete-btn').on('click','span',function(){
    $(this).addClass('active');
    $(this).siblings().removeClass('active');

    var typeP=$(this).parent().attr('data-type');
    var thisType=$(this).attr('data-type');
    if(typeP=='dealing'){
        if(thisType=='all'){
            var data=serverData[typeP]['todeal'].concat(serverData[typeP]['fromdeal']);
        }else {
            var data = serverData[typeP][thisType];
        }
        getOneHtml(data,'<a href="#" class="deal-btn deal-danger j-over-server">结束</a>','#deal-waring',thisType);
    }
    if(typeP=='dealno'){
        if(thisType=='all'){
            var data=serverData[typeP]['todeal'].concat(serverData[typeP]['fromdeal']);
            getOneHtml(data,'','#deal-ok',thisType)
        }else {
            var data = serverData[typeP][thisType];
            if(thisType=='todeal'){
                getOneHtml(data,'<a href="#" class="deal-btn deal-danger">取消</a>','#deal-ok',thisType)
            }else{
                getOneHtml(data,'<a href="#" class="deal-btn deal-success j-agree-server">同意</a> <a href="#" class="deal-btn deal-danger j-dis-go">驳回</a>','#deal-ok',thisType)
            }
        }
    }
    if(typeP=='dealhis'){
        if(thisType=='all'){
            var data=serverData[typeP]['todeal'].concat(serverData[typeP]['fromdeal']);
        }else {
            var data = serverData[typeP][thisType];
        }
        getOneHtml(data,'','#deal-his-ok',thisType);
    }
});


function getOneHtml(data,deal,p,type){//数据 操作 父元素
    $(p).html('');
    var html=[];
    for(var k=0;k<data.length;k++){
        if(type=='fromdeal') {
            html.push(
                    `<li data-id="${data[k].id}" data-toTeacherid="${data[k].toUserid}" class="animated fadeInUp" data-type="${type}">
                <div>
                    <p>编号：<span>${str(data[k].id, 5)}</span></p>
                    <p>开始时间：<span class="padding-right-left">${getNowDate(data[k].startTime)}</span>  结束时间：<span class="j-endTime">${getNowDate(data[k].endTime)}</span></p>
                    <p>课时费：<span>${data[k].price}</span>元</p>
                </div>
                <div class="right">
                    ${deal}
                </div>
            </li>
            <div class="deal-info-d">
                <p><span id="teachername">${localStorage.getItem('username')}</span>老师，您好！</p>
                <div>
                    <div style="padding-left: 24px">
                        <p>经过我认真的筛选，我将诚挚聘请您为我的孩子做家教辅导！</p>
                        <p>辅导时间为： <span class="text-danger" data-bind="startTime">${getNowDate(data[k].startTime)}</span> 开始至 <span class="text-danger" data-bind="endTime">${getNowDate(data[k].endTime)}</span> 结束 。上课方式为每周 <span class="text-danger j-daytime">${data[k].week} </span> 。每天 <span class="text-danger" data-bind="daytime">${data[k].dayTime}</span> 小时 。</p>
                        <p>课时费：每小时人民币 <span class="text-danger" data-bind="Price">${data[k].price} </span>元 。</p>
                        <p>辅导方式为： <span class="text-danger" data-bind="teacherType">${data[k].teacherType}</span><span style="margin-left: 50px">结算时间： <span class="text-danger" data-bind="Subject">${data[k].payType}</span></span></p>
                        <p class="j-address">地址： <span class="text-danger" data-bind="address">${data[k].address} </span></p>
                        <p>备注： <span data-bind="Remarks">${data[k].ranks}</span></p>
                        <p class="text-right">发起人：<span>${data[k].username}</span></p>
                    </div>
                </div>
            </div>`
            );
        }
        if(type=='todeal'){
            html.push(
                `<li data-id="${data[k].id}" class="animated fadeInUp" data-toTeacherid="${data[k].toUserid}" data-type="${type}">
                <div>
                    <p>编号：<span>${str(data[k].id, 5)}</span></p>
                    <p>开始时间：<span class="padding-right-left">${getNowDate(data[k].startTime)}</span>  结束时间：<span class="j-endTime">${getNowDate(data[k].endTime)}</span></p>
                    <p>课时费：<span>${data[k].price}</span>元</p>
                </div>
                <div class="right">
                    ${deal}
                </div>
            </li>
            <div class="deal-info-d">
                <p><span id="teachername">${data[k].username}</span>老师，您好！</p>
                <div>
                    <div style="padding-left: 24px">
                        <p>经过我认真的筛选，我将诚挚聘请您为我的孩子做家教辅导！</p>
                        <p>辅导时间为： <span class="text-danger" data-bind="startTime">${getNowDate(data[k].startTime)}</span> 开始至 <span class="text-danger" data-bind="endTime">${getNowDate(data[k].endTime)}</span> 结束 。上课方式为每周 <span class="text-danger j-daytime">${data[k].week} </span> 。每天 <span class="text-danger" data-bind="daytime">${data[k].dayTime}</span> 小时 。</p>
                        <p>课时费：每小时人民币 <span class="text-danger" data-bind="Price">${data[k].price} </span>元 。</p>
                        <p>辅导方式为： <span class="text-danger" data-bind="teacherType">${data[k].teacherType}</span><span style="margin-left: 50px">结算时间： <span class="text-danger" data-bind="Subject">${data[k].payType}</span></span></p>
                        <p class="j-address">地址： <span class="text-danger" data-bind="address">${data[k].address} </span></p>
                        <p>备注： <span data-bind="Remarks">${data[k].ranks}</span></p>
                        <p class="text-right">发起人：<span>${localStorage.getItem('username')}</span></p>
                    </div>
                </div>
            </div>`
            );
        }
        if(type=='all'){
            html.push(
                `<li data-id="${data[k].id}" class="animated fadeInUp">
                <div>
                    <p>编号：<span>${str(data[k].id, 5)}</span></p>
                    <p>开始时间：<span class="padding-right-left">${getNowDate(data[k].startTime)}</span>  结束时间：<span class="j-endTime">${getNowDate(data[k].endTime)}</span></p>
                    <p>课时费：<span>${data[k].price}</span>元</p>
                </div>
                <div class="right">
                </div>
            </li>`
            );
        }
    };
    var timer3=setInterval(function(){
        animationHtml(html,p,timer3,function(){});
    },300);
}


$('body').on('click','a.j-agree-server',function(e){
    e.stopPropagation();
    var id=$(this).parents('li');
    var obj={
        'dealID':id.attr('data-id')
    }
    $.ajax({
        url:'php/deal/dealAgree.php',
        type:'POST',
        data:obj,
        dataType:'json',
        success:function(data){
            if(data.retCode==0){
                $(id).next().remove();
                $(id).remove();
                alertMessage('系统消息',data.retMsg);
            }
        },
        error: function () {
        }
    });
});

//.j-dis-go  .j-over-server

$('body').on('click','a.j-over-server',function(e){
    e.stopPropagation();
    if($(this).parents('li').attr('data-type')=="todeal"){
        $('#message-push').modal('show');
        $('#message-push').attr('data-talkid',$(this).parents('li').index());
        $('#message-push').attr('data-toteacherid',$(this).parents('li').attr('data-toteacherid'));
    }else{
        var id=$(this).parents('li');
        var obj={
            'dealID':id.attr('data-id'),
            'status':0
        }
        if((new Date($(id).find('.j-endTime').text())).getTime()>(new Date().getTime())){
            obj.status='1'
            alert('还没到结束时间，您确认要结束吗？')
        };
        if((new Date($(id).find('.j-endTime').text())).getTime()<=(new Date().getTime())){
            obj.status='2'
        }
        $.ajax({
            url:'php/deal/dealDis.php',
            type:'POST',
            data:obj,
            dataType:'json',
            success:function(data){
                if(data.retCode==0){
                    $(id).next().remove();
                    $(id).remove();
                    alertMessage('系统消息',data.retMsg);
                }
            },
            error: function () {
            }
        });
    }

});

$('body').on('click','a.j-dis-go',function(e){
    e.stopPropagation();
    var id=$(this).parents('li');
    var obj={
        'dealID':id.attr('data-id'),
        'status':3
    }
    $.ajax({
        url:'php/deal/dealDis.php',
        type:'POST',
        data:obj,
        dataType:'json',
        success:function(data){
            if(data.retCode==0){
                $(id).next().remove();
                $(id).remove();
                alertMessage('系统消息',data.retMsg);
            }
        },
        error: function () {
        }
    });
});

var show=true;
$('.talk-start span').mouseover(function(){
    var spans=$('.talk-start span');
    var thisI=$(this).index();
    for(var i=0;i<spans.length;i++){
        if($(spans[i]).index()<=thisI){
            $(spans[i]).addClass('hover');
        }
    }
});
$('.talk-start span').mouseout(function(){
    if(show) {
        $('.talk-start span').removeClass('hover');
    }
});
$('.talk-start span').click(function(){
    if(show) {
        show = false;
    }else{
        show=true;
    }
});

$('#talk').click(function(){
    if($('#inputPassword3').val()==''){
        alert('评论内容不能为空');
    }
    var id=$('#deal-waring li:eq('+$(this).parents("#message-push").attr("data-talkid")+')');
    var obj={
        'dealID':id.attr('data-id'),
        'status':0
    }
    var obj2={
        'text':$('#inputPassword3').val(),
        'start':$('.talk-start span.hover').length,
        'userid':localStorage.getItem('userID'),
        'teacherid':$('#message-push').attr('data-toteacherid')
    }
    if((new Date($(id).find('.j-endTime').text())).getTime()>(new Date().getTime())){
        obj.status='1'
        alert('还没到结束时间，您确认要结束吗？')
    };
    if((new Date($(id).find('.j-endTime').text())).getTime()<=(new Date().getTime())){
        obj.status='2'
    }
    $.ajax({
        url:'php/deal/dealDis.php',
        type:'POST',
        data:obj,
        dataType:'json',
        success:function(data){
            if(data.retCode==0){
                $(id).next().remove();
                $(id).remove();
                alertMessage('系统消息',data.retMsg);
            }
        },
        error: function () {
        }
    });
    $.ajax({
        url:'php/deal/talkMsg.php',
        type:'POST',
        data:obj2,
        dataType:'json',
        success:function(data){
            if(data.retCode==1){
                $('#message-push').modal('hide');
            }
        },
        error: function () {
        }
    });
});