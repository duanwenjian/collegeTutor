/**
 * Created by Administrator on 2017/5/31.
 */
/**
 * Created by Administrator on 2017/5/30.
 */
function getUserList(){
    $.ajax({
        url:'php/dealListHis.php',
        type:'get',
        dataType:'json',
        data:{},
        success:function(data){
            if(data.retCode==1){
                getHtml(data.userinfo);
            }
        },
        error:function(){}
    });
}//

getUserList();
var statusS={
    '1':'正常',
    '0':'未激活',
    '2':'冻结'
}
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
function getDates(n){
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
function getHtml(data){
    for(var i=0;i<data.length;i++){
        data[i].status=statusS[data[i].status];
        data[i].regtime=getDate(data[i].regtime);
        data[i].startTime=getDates(data[i].startTime);
        data[i].endTime=getDates(data[i].endTime);
    }
    var tdata={
        data:data
    }
    var htmlTemplat=`<table cellspacing="0" cellpadding="0" class="table pmd-table table-hover" id="table-bootstrap">
        <thead>
            <tr>
                <th>ID</th>
                <th>开始时间</th>
                <th>结束时间</th>
                <th>每天上课时间</th>
                <th>课时费</th>
                <th>每周上课时间</th>
                <th>备注</th>
                <th>教学方式</th>
                <th>付款方式</th>
                <th>上门辅导地址</th>
                <th>发起时间</th>
            </tr>
        </thead>
        <tbody>
        {{#data}}
            <tr data-id="{{id}}">
                <td>{{id}}</td>
                <td>{{startTime}}</td>
                <td>{{endTime}}</td>
                <td>{{dayTime}}</td>
                <td>{{price}}</td>
                <td>{{week}}</td>
                <td>{{ranks}}</td>
                <td>{{teacherType}}</td>
                <td>{{payType}}</td>
                <td>{{address}}</td>
                <td>{{regtime}}</td>
            </tr>
            {{/data}}
        </tbody>
    </table>`;

    $('#main').html(t7(tdata,htmlTemplat));
}
/*var  a="{{a}}";
 var data={
 "a":"dwj"
 }*/
//console.log(t7(data,a));