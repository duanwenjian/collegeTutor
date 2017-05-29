/**
 * Created by Administrator on 2017/5/24.
 */
$('#endTime').blur(function(){
//    document.getElementById('endTime').oninput=function(){
    var startTime=(new Date($('#startTime').val())).getTime();
    var endTime=(new Date($(this).val())).getTime();
    if(endTime<startTime){
        alert('开始时间不能小于结束时间');
        $(this).val('');
    }
});
$('#startTime').blur(function(){
//    document.getElementById('endTime').oninput=function(){
    var start=(new Date($(this).val())).getTime();
    var now=(new Date()).getTime();
    if(now>start){
        alert('开始时间不能小于当前时间');
        $(this).val('');
        return false;
    }
});

$('body').on('blur','input[type!="checkbox"],select,textarea',function(){
    $('span[data-bind="'+$(this).attr('id')+'"]').html($(this).val());
});

//显示教方式
$('select#teacherType').change(function(){
    if($(this).val()==1){
        $('.j-address').show();
    }else{
        $('.j-address').hide();
    }
});

//显示百度地图
$('#address').focus(function(){
    $('.baidu-content').show();
});

$('#address').blur(function(){
    $('.baidu-content').hide();
});

$('input[name="week"]').click(function(){
    var dayarr=$('input[name="week"]:checked'),html='';
    for(var s=0;s<dayarr.length;s++){
        html+=$(dayarr[s]).val()+'、';
    }
    html=html.slice(0,-1);
    //html.toString().subStr(html.length-1,1)
    $('.j-daytime').html(html);
});

$('#readed').click(function(){
    $('#sendMsg').show();

});

$('body').on('click','#sendMsg',function(){
    var obj={
        'startTime':(new Date($('#startTime').val())).getTime(),
        'endTime':(new Date($('#endTime').val())).getTime(),
        'dayTime':$('#daytime').val(),
        'price':$('#Price').val(),
        'week':$('.j-daytime').html(),
        'ranks':$('#Remarks').val(),
        'teacherType':$('#teacherType option:checked').val(),
        'payType':$('#Subject option:checked').val(),
        'address':$('#address').val(),

        'type':'apply',
        'msg':null,
        'toUserID':getUrlParam('userid'),
        'fromUserID':localStorage.getItem('userID')
    };
    if(!inputValue()){
        alert('请正确填写全部信息');
        return false;
    }
    $.ajax({
        url:'php/applyTeacher.php',
        type:'POST', //GET
        data:obj,
        timeout:10000,    //超时时间
        dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success:function(data,textStatus,jqXHR){
            if(+data.retCode==0){
                //查询成功
                //getHtml(data);
                alertMessage('系统消息',data.retMsg);
                $('#sendMsg').hide();
                $('input,select,textarea').attr('disabled',true);
            }
            if(+data.code==200){
                alertMessage('系统消息','发送成功');
                $('#sendMsg').hide();
            }
        },
        error:function(xhr,textStatus){
            console.log("请求失败");
        }
    });
});
function inputValue(){
    var itxt =$(".form-horizontal input[type='text']");
    for (h = 0; h < itxt.length; h++) {
        if (itxt[h].value=="") {
            return false;
        }

    }
    return true;
}
/*
// 百度地图API功能
function G(id) {
    return document.getElementById(id);
}

var map = new BMap.Map("baidu-addr");
map.centerAndZoom("北京",12);                   // 初始化地图,设置城市和地图级别。

var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
    {"input" : "address"
        ,"location" : map
    });

ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
    var str = "";
    var _value = e.fromitem.value;
    var value = "";
    if (e.fromitem.index > -1) {
        value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
    }
    str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

    value = "";
    if (e.toitem.index > -1) {
        _value = e.toitem.value;
        value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
    }
    str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
    G("searchResultPanel").innerHTML = str;
});

var myValue;
ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
    var _value = e.item.value;
    myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
    G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

    setPlace();
});

function setPlace(){
    map.clearOverlays();    //清除地图上所有覆盖物
    function myFun(){
        var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
        map.centerAndZoom(pp, 18);
        map.addOverlay(new BMap.Marker(pp));    //添加标注
    }
    var local = new BMap.LocalSearch(map, { //智能搜索
        onSearchComplete: myFun
    });
    local.search(myValue);
}*/


//加载完成查询是否有未完成交易
function getDealSelect(){
    var obj={
        'fromId':localStorage.getItem('userID'),
        'toId':getUrlParam('userid')
    };
    if(obj.fromId==obj.toId){
        return false;
    }
    $.ajax({
        url:'php/dealSelect.php',
        type:'GET', //GET
        data:obj,
        timeout:10000,    //超时时间
        dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success:function(data,textStatus,jqXHR){
            if(+data.retCode==0){
                $('.main-content').html(`
                <div class="text-center" style="margin-top: 100px">
                    <a href="dealSelect.html?dealId=${data.dealId}">和当前教师存在未完成交易，可到交易列表查看</a>
                </div>`);
            }
        },
        error:function(xhr,textStatus){
            console.log("请求失败");
        }
    });
}

$(document).ready(function(){
    getDealSelect();
});