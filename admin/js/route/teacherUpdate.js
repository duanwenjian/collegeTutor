/**
 * Created by Administrator on 2017/5/30.
 */
function getUserList(){
    $.ajax({
        url:'php/teacher.php',
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

//
$('body').on('click','.j-y',function(){
    var obj={
        'id':$(this).parents('tr').attr('data-id'),
        'status':'0',
        'text':''
    }
    $.ajax({
        url:'php/teacherN.php',
        type:'post',
        dataType:'json',
        data:obj,
        success:function(data){
            if(+data.retCode==1) {
                getUserList();
            }
        },
        error:function(){}
    });
});//
$('body').on('click','.j-n',function(){
    var obj={
        'id':$(this).parents('tr').attr('data-id'),
        'status':'1',
        'text':''
    }
    $.ajax({
        url:'php/teacherN.php',
        type:'post',
        dataType:'json',
        data:obj,
        success:function(data){
            if(+data.retCode==1) {
                getUserList();
            }
        },
        error:function(){}
    });
});//
getUserList();
var statusS={
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
function getHtml(data){
    for(var i=0;i<data.length;i++){
        if(+data[i].status==1){
            data[i].deal='<button type="button" class="btn pmd-btn-flat pmd-ripple-effect btn-info j-y"> 解冻 </button>';
        }else{
            data[i].deal='<button type="button" class="btn pmd-btn-flat pmd-ripple-effect btn-danger j-n"> 冻结 </button>';
        }
        data[i].status=statusS[data[i].status].text;
        data[i].regtime=getDate(data[i].regtime);
    }
    var tdata={
        data:data
    }
    var htmlTemplat=`<table cellspacing="0" cellpadding="0" class="table pmd-table table-hover" id="table-bootstrap">
        <thead>
            <tr>
                <th>ID</th>
                <th>专业</th>
                <th>价格</th>
                <th>授课年级</th>
                <th>科目</th>
                <th>出生日期</th>
                <th>性别</th>
                <!--<th>学生证</th>-->
                <th>备注</th>
                <th>状态</th>
                <th>设置时间</th>
                <th>状态原因</th>
                <th>等级</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
        {{#data}}
            <tr data-id="{{id}}">
                <td>{{id}}</td>
                <td>{{major}}</td>
                <td>{{Price}}</td>
                <td>{{Grade}}</td>
                <td>{{Subject}}</td>
                <td>{{birth}}</td>
                <td>{{sex}}</td>
                <!--<td>{{cardAddress}}</td>-->
                <td>{{Remarks}}</td>
                <td>{{status}}</td>
                <td>{{regtime}}</td>
                <td>{{reason}}</td>
                <td>{{rank}}</td>
                <td>{{deal}}</td>
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