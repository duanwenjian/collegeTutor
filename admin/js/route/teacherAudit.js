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
$('body').on('click','.j-y-a',function(){
    $('#complete-dialog').attr('data-g',0);
    $('#complete-dialog').attr('data-id',$(this).parents('tr').attr('data-id'));
    $('#complete-dialog').modal('show');
    /*$.ajax({
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
     });*/
});//
$('body').on('click','.j-n-a',function(){
    /*var obj={
     'id':$(this).parents('tr').attr('data-id'),
     'status':'0'
     }*/
    $('#complete-dialog').attr('data-g',1);
    $('#complete-dialog').attr('data-id',$(this).parents('tr').attr('data-id'));
    $('#complete-dialog').modal('show');
    /*$.ajax({
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
     });*/
});//

$('#j-ok').click(function(){
    if($('#complete-dialog').attr('data-g')==1){
        var obj={
            'id':$('#complete-dialog').attr('data-id'),
            'status':'200',
            'text':$('#j-text').val()
        }
    }
    if($('#complete-dialog').attr('data-g')==0){
        var obj={
            'id':$('#complete-dialog').attr('data-id'),
            'status':'202',
            'text':$('#j-text').val()
        }
    }
    $.ajax({
        url:'php/teacherN.php',
        type:'post',
        dataType:'json',
        data:obj,
        success:function(data){
            if(+data.retCode==1) {
                $('#complete-dialog').modal('hide');
                getUserList();
            }
        },
        error:function(){}
    });
})
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
        if(+data[i].status==201){
            data[i].deal='<span  style="cursor: pointer" class="btn-block text-info j-n-a"> 审核 </span></li><span style="cursor: pointer" class="btn-block text-danger j-y-a"> 驳回 </span></li>';
        }
        data[i].status=statusS[data[i].status].text;
        data[i].regtime=getDate(data[i].regtime);
    }
    var tdata={
        data:data
    }
    var htmlTemplat=`<table cellspacing="0" cellpadding="0" class="table pmd-table table-hover " id="table-bootstrap">
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