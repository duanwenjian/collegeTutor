/**
 * Created by Administrator on 2017/5/30.
 */
function getUserList(){
    $.ajax({
        url:'php/feedBackList.php',
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
    '0':'未处理',
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
        data[i].status=statusS[data[i].status];
        data[i].regtime=getDate(data[i].regtime);
        if(+data[i].status!=0){
            data[i].deal='<button type="button" class="btn pmd-btn-flat pmd-ripple-effect btn-info j-y-f"> 处理 </button>';
        }else{
            data[i].deal='';
        }
    }
    var tdata={
        data:data
    }
    var htmlTemplat=`<table cellspacing="0" cellpadding="0" class="table pmd-table table-hover" id="table-bootstrap">
        <thead>
            <tr>
                <th>ID</th>
                <th>投诉内容</th>
                <th>截图地址</th>
                <th>是否处理</th>
                <th>设置时间</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
        {{#data}}
            <tr data-id="{{id}}">
                <td>{{id}}</td>
                <td>{{content}}</td>
                <td>{{img}}</td>
                <td>{{status}}</td>
                <td>{{regtime}}</td>
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


$('body').on('click','.j-y-f',function(){
    var obj={
        'id':$(this).parents('tr').attr('data-id')
    }
    $.ajax({
        url:'php/dealfeedBack.php',
        type:'get',
        dataType:'json',
        data:obj,
        success:function(data){
            if(data.retCode==1){
                getUserList();
            }
        },
        error:function(){}
    });
});