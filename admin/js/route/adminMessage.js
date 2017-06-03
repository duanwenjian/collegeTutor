/**
 * Created by Administrator on 2017/5/30.
 */
/**
 * Created by Administrator on 2017/5/30.
 */
function getUserList(){
    $.ajax({
        url:'php/adminMessage.php',
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
$('body').on('click','.j-d',function(){
    var obj={
        'id':$(this).parents('tr').attr('data-id'),
        'status':'1'
    }
    $.ajax({
        url:'php/deleteMessage.php',
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
    '0':'已发送'
}
var showType={
    '0':'正常显示',
    '1':'强制显示'
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
        data[i].type=statusS[data[i].type];
        data[i].regtime=getDate(data[i].regtime);
        data[i].Displaymode=showType[data[i].Displaymode];
    }
    var tdata={
        data:data
    }
    var htmlTemplat=`<table cellspacing="0" cellpadding="0" class="table pmd-table table-hover" id="table-bootstrap">
        <thead>
            <tr>
                <th>ID</th>
                <th>发布者</th>
                <th>状态 </th>
                <th>发布时间</th>
                <th>显示方式</th>
                <th>标题</th>
                <th>内容</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
        {{#data}}
            <tr data-id="{{id}}">
                <td>{{id}}</td>
                <td>{{username}}</td>
                <td>{{type}}</td>
                <td>{{regtime}}</td>
                <td>{{Displaymode}}</td>
                <td>{{title}}</td>
                <td>{{content}}</td>
                <td><i style="cursor: pointer" class="material-icons md-dark j-d pmd-sm">delete</i></td>
            </tr>
            {{/data}}
        </tbody>
    </table>`;

    $('#main').html(t7(tdata,htmlTemplat));


    var str=`
    <h2>发布新通知</h2>
        <div class="pmd-card pmd-z-depth">
				<div class="pmd-card-body">
					<form class="form-horizontal" role="form">
					<div class="form-group pmd-textfield">
							<label for="inputEmail3" class="col-sm-2 control-label">标题</label>
							<div class="col-sm-10">
								<input class="form-control input-sm" id="inputEmail3" placeholder="" type="email"><span class="pmd-textfield-focused"></span>
							</div>
						</div>
						<div class="form-group pmd-textfield">
							<label for="inputPassword3" class="col-sm-2 control-label">内容</label>
							<div class="col-sm-10">

								<div class="fg-line">
									<textarea class="form-control input-sm" id="inputPassword3"  type="password"></textarea><span class="pmd-textfield-focused"></span>
								</div>
							</div>
						</div>
						<div class="form-group">
							<div class="col-sm-offset-2 col-sm-10">
								<a class="btn btn-primary pmd-checkbox-ripple-effect" id="sendMessage">发布</a>
							</div>
						</div>
					</form>
				</div>
			</div>
    `;
    $('#other').html(str);
}

$('body').on('click','#sendMessage',function(){
    var obj={
        'text':$('#inputPassword3').val(),
        'userID':getCookie('adminid'),
        'title':$('#inputEmail3').val()
    };
    goEasy.publish({
        channel: "collegeTutorAllUser",
        message: JSON.stringify(obj)
    });
    $.ajax({
        url:'php/sendMessage.php',
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
});