/**
 * Created by Administrator on 2017/5/30.
 */
function getUserList(){
    $.ajax({
        url:'php/Admin.php',
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
$('body').on('click','.j-n',function(){
    var obj={
        'userID':$(this).parents('tr').attr('data-id'),
        'status':1
    }
    $.ajax({
        url:'php/userAdmin.php',
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
$('body').on('click','.j-y',function(){
    var obj={
        'userID':$(this).parents('tr').attr('data-id'),
        'status':2
    }
    $.ajax({
        url:'php/userAdmin.php',
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
function getHtml(data){
    for(var i=0;i<data.length;i++){
        data[i].deal='<button type="button" class="btn pmd-btn-flat pmd-ripple-effect btn-info j-n"> 设为审批 </button><button type="button" class="btn pmd-btn-flat pmd-ripple-effect btn-info j-y"> 设为复核 </button>';
        data[i].status=statusS[data[i].status];
        data[i].regtime=getDate(data[i].regtime);
    }
    var tdata={
        data:data
    }
    var htmlTemplat=`<table cellspacing="0" cellpadding="0" class="table pmd-table table-hover" id="table-bootstrap">
        <thead>
            <tr>
                <th>ID</th>
                <th>用户名</th>
                <th>状态 </th>
                <th>注册时间</th>
                <th>头像</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
        {{#data}}
            <tr data-id="{{id}}">
                <td>{{id}}</td>
                <td>{{username}}</td>
                <td>{{status}}</td>
                <td>{{regtime}}</td>
                <td>{{Headportrait}}</td>
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