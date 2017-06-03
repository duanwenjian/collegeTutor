/**
 * Created by Administrator on 2017/5/31.
 */
/**
 * Created by Administrator on 2017/5/31.
 */
/**
 * Created by Administrator on 2017/5/30.
 */
function getUserList(){
    $.ajax({
        url:'php/haveTeacher.php',
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
        data[i].birth=getDates(data[i].birth);
        data[i].regtime=getDates(data[i].regtime);
    }
    var tdata={
        data:data
    }
    var htmlTemplat=`<table cellspacing="0" cellpadding="0" class="table pmd-table table-hover" id="table-bootstrap">
        <thead>
            <tr>
                <th>ID</th>
                <th>专业</th>
                <th>价格,每小时</th>
                <th>科目</th>
                <!--<th>出生日期</th>-->
                <th>性别</th>
                <th>备注</th>
                <th>设置时间</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
        {{#data}}
            <tr data-id="{{id}}">
                <td>{{id}}</td>
                <td>{{major}}</td>
                <td>{{Price}}</td>
                <td>{{Subject}}</td>
                <!--<td>{{birth}}以后</td>-->
                <td>{{sex}}</td>
                <td>{{Remarks}}</td>
                <td>{{regtime}}</td>
                <td><i style="cursor: pointer" class="material-icons md-dark j-d-d pmd-sm">delete</i></td>
            </tr>
            {{/data}}
        </tbody>
    </table>`;

    $('#main').html(t7(tdata,htmlTemplat));
}
var str=`
    <h2>发布新招聘</h2>
        <div class="pmd-card pmd-z-depth">
				<div class="pmd-card-body">
					<form class="form-horizontal" role="form">
					<div class="form-group pmd-textfield">
							<label for="i1" class="col-sm-2 control-label">专业</label>
							<div class="col-sm-8">
								<input class="form-control input-sm" id="i1" placeholder="" type="text"><span class="pmd-textfield-focused"></span>
							</div>
						</div>
						<div class="form-group pmd-textfield">
							<label for="i2" class="col-sm-2 control-label">价格</label>
							<div class="col-sm-8">
								<input class="form-control input-sm" id="i2" placeholder="" type="text"><span class="pmd-textfield-focused"></span>
							</div>
						</div>
						<div class="form-group pmd-textfield">
							<label for="i3" class="col-sm-2 control-label">科目</label>
							<div class="col-sm-8">
								<input class="form-control input-sm" id="i3" placeholder="" type="text"><span class="pmd-textfield-focused"></span>
							</div>
						</div>
						<div class="form-group pmd-textfield">
							<label for="i4" class="col-sm-2 control-label">性别</label>
							<div class="col-sm-8">
								<input class="form-control input-sm" id="i4" placeholder="" type="text"><span class="pmd-textfield-focused"></span>
							</div>
						</div>
						<div class="form-group pmd-textfield">
							<label for="i5" class="col-sm-2 control-label">备注</label>
							<div class="col-sm-8">
								<input class="form-control input-sm" id="i5" placeholder="" type="text"><span class="pmd-textfield-focused"></span>
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


$('body').on('click','#sendMessage',function(){
    var obj={
        'userid':getCookie('adminid'),
        'i1':$('#i1').val(),
        'i2':$('#i2').val(),
        'i3':$('#i3').val(),
        'i4':$('#i4').val(),
        'i5':$('#i5').val()
    };
    for(var j in obj){
        if(obj[j]==''){
            alert('不能填空内容');
        }
    }

    $.ajax({
        url:'php/addhaveTeacher.php',
        type:'post',
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

$('body').on('click','.j-d-d',function(){
    var obj={
        'id':$(this).parents('tr').attr('data-id')
    };
    $.ajax({
        url:'php/deleteHaveTeacher.php',
        type:'post',
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