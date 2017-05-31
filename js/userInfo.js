/**
 * Created by Administrator on 2017/5/29.
 */
//裁剪上传头像
var files;
$('.j-updateUser').click(function(){
    document.getElementById('updateFile').click();
});
$('#updateFile').change(function(){
    $('#cut-img').modal('show');
    //document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
});
$('#clipBtn').click(function(){
    $('#updateImageFiles').show();
});
$('body').on('click','#updateImageFiles',function(){
    $.ajax({
        url:'php/base64ImgSave.php',
        type:'POST',
        dataType:'json',
        data:{"imageFile":files,'userID':localStorage.getItem('userID')},
        success:function(data){
            if(+data.retCode==0){
                $('#cut-img').modal('hide');
                localStorage.setItem('Headportrait',data.retMsg);
                $('.j-userImg').attr('src',data.retMsg);
                $('.navbar-user-avatar').attr('src',data.retMsg);
            }
        },
        error:function(){}
    });
});
$("#clipArea").photoClip({
    width: 200,
    height: 200,
    file: "#updateFile",
    view: "#view",
    ok: "#clipBtn",
    loadStart: function() {
        console.log("照片读取中");
    },
    loadComplete: function() {
        console.log("照片读取完成");
    },
    clipFinish: function(dataURL) {
//            console.log(dataURL);
        files=dataURL;
    }
});

function getWeekMonth(){
    var data=new Array(6);
    var time=new Date();
    var M=time.getMonth()+1;
    //var week = "日一二三四五六".split("")[new Date().getDay()];;
    var D=time.getDay();
    var day=time.getDate();
    var lasDay=getFirstAndLastMonthDay();
    if(D==1){
        for(var i=0;i<7;i++){
            if((day+i)>lasDay){
                data[i]=((M+1)+'-'+(day+i-lasDay));
            }else{
                data[i]=(M+'-'+(day+i));
            }
        }
        return data;
    }
    if(D==0){
        for(var i=7;i>0;i--){
            if((day-i)<0){
                data[i-1]=((M-1)+'-'+(day-i));
            }else{
                data[i-1]=(M+'-'+(day-i));
            }
        }
        data.reverse();
        return data;
    }
    if(D>0&&D<6){
        var data=new Array(D);
        for(var i=0;i<D;i++){
            if((day-i)<=0){
                data[i]=((M)+'-'+(lasDay-i));
            }else{
                data[i]=((M)+'-'+(day-i));
            }
        }
        for(var j=1;j<=(7-D);j++){
            if(lasDay<(day+j)){
                data.unshift((M+1)+'-'+(day+j-lasDay));
            }else{
                data.unshift((M)+'-'+(day+j));
            }
        }
        data.reverse();
        return data;
    }
}
//console.log(getWeekMonth(3))
//获取月份最后一天
function getFirstAndLastMonthDay(){
    var  day = new Date((new Date()).getFullYear(),(new Date()).getMonth()+1,0);
    var lastdate = day.getDate();//获取当月最后一天日期
    //给文本控件赋值。同下
    return lastdate;
}


$(document).ready(function(){
    getUserInfoDate();
    $('.j-userImg').attr('src',localStorage.getItem('Headportrait'));
    $('.j-username').html(localStorage.getItem('username'));

});
var userInfo={};
function getUserInfoDate(){
    $.ajax({
        url:'php/getUserInfo.php',
        type:'GET',
        data:{'userID':localStorage.getItem('userID')},
        dataType:'json',
        success:function(data){
            if(data.retCode==0){
                userInfo.dealInfo=data.dealInfo;
                echer1(userInfo.dealInfo);
                echer2(userInfo.dealInfo);
                echer3(data.teacherFeedBack);
            }
        },
        error:function(){}
    })
}
//获取日程表信息
var getDeal1={
    data:null,//数据
    weekDay:null,//当前周日期
    weekArr:null,//用户周曲线
    series:[],//绘图数据
    minTime:null,//最大时间
    maxTime:null,//最小时间
    titleArr:[],//日程安排标题
    ProgressArr:[],//交易进度
    talkList:null,//评论表
    talkPie:null,//评论图表数据
    init:function(data){
        this.data=data;
        this.weekDay=getWeekMonth();
    },
    dealTitle:function(data) {
        this.init(data);
        this.titleArr=[];
        for (var i = 0; i < this.data.length; i++) {
            this.titleArr.push(this.data[i].username);
        }
        return this.titleArr;
    },
    dealList:function(data){
        this.init(data);
        var y=(new Date()).getFullYear();
        this.maxTime=(new Date(y+"-"+getWeekMonth()[6]+" 08:00:00")).getTime();//6-7
        this.minTime=(new Date(y+"-"+getWeekMonth()[0]+" 08:00:00")).getTime();//6-1
        //5-12 6-14
        for(var i=0;i<this.data.length;i++){
            this.weekArr=[,,,,,,,];
            if(+this.data[i].startTime<this.minTime){//开始时间在本周一之前
                var length;
                if(+this.data[i].endTime>=this.maxTime){//结束时间在本周之后
                    length=this.weekArr.length;
                }else{//结束时间在本周之前
                    length=7-this.getTimeDay(parseInt(this.data[i].endTime),this.maxTime);
                }
                for(var j=0;j<length;j++){
                    if(this.getUserWeekDay(this.data[i].week,y+"-"+getWeekMonth()[j]+" 08:00:00")!=-1) {
                        this.weekArr[j] = parseInt(this.data[i].price);
                    }
                }
            }
            if(+this.data[i].startTime>this.minTime){//开始时间在本周一之后
                var days='',length;
                days=this.getTimeDay(this.minTime,this.data[i].startTime);
                if(+this.data[i].endTime>=this.maxTime){//结束时间在本周之后
                    length=this.weekArr.length;
                }else{//结束时间在本周之前
                    length=7-this.getTimeDay(parseInt(this.data[i].endTime),this.maxTime);
                }
                for(var j=days;j<length;j++){
                    if(this.getUserWeekDay(this.data[i].week,y+"-"+getWeekMonth()[j]+" 08:00:00")!=-1) {
                        this.weekArr[j] = parseInt(this.data[i].price);
                    }
                }
            }
            var obj={//定义返回当前对象
                name: getDeal1.data[i].username,
                type: 'line',
                step: 'start',
                data: getDeal1.weekArr
            }
            this.series.push(obj);
        }
        return this.series;
    },
    getTimeDay:function(startDate,endDate){
        //获取两个时间的间隔日期
        var dates = Math.abs((parseInt(endDate) - parseInt(startDate)))/(1000*60*60*24);
        return  dates;
    },
    getUserWeekDay:function(str,s){
        return str.indexOf('日一二三四五六'.split('')[(new Date(s)).getDay()]);
    },
    dealProgress:function(data){
        this.data=data;
        var data1=[],data2=[];
        for(var i=0;i<this.data.length;i++){
            var time=new Date();
            var nowDate=(new Date(time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()+' 08:00:00')).getTime();
            var lengthDay=this.getTimeDay(this.data[i].startTime,this.data[i].endTime);
            var nowDay=this.getTimeDay(this.data[i].startTime,nowDate);
            data1.push(nowDay);
            data2.push(lengthDay);
        }
        var obj1={
            type: 'bar',
            barWidth: '30%',
            z: 10,
            data: data1,
            coordinateSystem: 'polar',
            name: '现阶段完成时间'
        };
        this.ProgressArr.push(obj1);
        var obj2={
            type: 'bar',
            itemStyle: {
                normal: {
                    color: '#ddd'
                }
            },
            silent: true,
            barWidth: '30%',
            barGap: '-100%', // Make series be overlap
            data: data2,
            coordinateSystem: 'polar',
            name: '总时间'
        };
        this.ProgressArr.push(obj2);
        return this.ProgressArr;
    },
    getTalk:function(d){
        this.talkList=d;
        this.talkPie=[
            {value: 0},
            {value: 0},
            {value: 0},
            {value: 0},
            {value: 0}
        ];
        for(var i=0;i<this.talkList.length;i++){
            this.talkPie[parseInt(this.talkList[i].talkGrade)-1].value++;
        }
        return this.talkPie;
    }
}

// 日程表
// 基于准备好的dom，初始化echarts实例
function echer1(d) {
    var myChart = echarts.init(document.getElementById('teacherTime'), 'wonderland');
    var data = getWeekMonth();
    option1 = {
        title: {
            text: '授课日程安排',
            left: 'center',
            show: false
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            show: false
        },
        grid: {
            left: '8%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            data: data,
            name: '上课时间',
            nameLocation: 'start'
        },
        yAxis: {
            type: 'value',
            name: '价格',
            nameLocation: 'end'
        },
        series: getDeal1.dealList(d)/*[
            {
                name: '花若开',
                type: 'line',
                step: 'start',
                data: [100, 100, , 100, 100, 100,]
            },
            {
                name: '用户二',
                type: 'line',
                step: 'middle',
                data: [, , 200, , , , 200]
            },
            {
                name: '用户三',
                type: 'line',
                step: 'end',
                data: [350, 350, 350, 350, 350, 350, 350]
            }
        ]*/,
        legend: {
            data: getDeal1.dealTitle(d)
        }
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option1);
}

function echer2(d) {
//进度表
    var dealInfo = echarts.init(document.getElementById('dealInfo'), 'wonderland');
    option2 = {
        title: {
            text: '',
            left: 'center',
            show: false
        },

        tooltip: {
            trigger: 'axis'
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        angleAxis: {
            show:false
        },
        radiusAxis: {
            type: 'category',
            data: getDeal1.dealTitle(d),
            z: 10
        },
        polar: {},
        series: getDeal1.dealProgress(d),
        legend: {
            show: true,
            data: ['交易完成情况']
        }
    };
    dealInfo.setOption(option2);
}
function echer3(d) {
//好评标
    var teacherfeed = echarts.init(document.getElementById('teacherfeed'), 'wonderland');
    var data=getDeal1.getTalk(d);
    option3 = {
        title : {
            text: '评价表',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            x : 'center',
            y : 'bottom',
            data:['1星','2星','3星','4星','5星']
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {
                    show: true,
                    type: ['pie', 'funnel']
                },
                restore : {show: true},
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
                data:[
                    {value:data[0].value, name:'1星'},
                    {value:data[1].value, name:'2星'},
                    {value:data[2].value, name:'3星'},
                    {value:data[3].value, name:'4星'},
                    {value:data[4].value, name:'5星'}
                ]
            }
        ]
    };
    teacherfeed.setOption(option3);
}
