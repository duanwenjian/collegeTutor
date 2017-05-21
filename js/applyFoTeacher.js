/**
 * Created by Administrator on 2017/4/30.
 */
//服务器地址
function uploadFile(){
    var userID=localStorage.getItem('userID');
    var formData = new FormData();

    // 获取上传文件，放到 formData对象里面
    var pic = $("#file").get(0).files[0];
    formData.append("myfile" , pic);
    // 获取上传文件，放到 formData对象里面
    var pic2 = $("#file1").get(0).files[0];
    formData.append("myfile1" , pic2);
    formData.append("userID",userID);
    formData.append("major",TeacherInfo.info.major);
    formData.append("price",TeacherInfo.info.Price);
    formData.append("grade",TeacherInfo.info.Grade);
    formData.append("subject",TeacherInfo.info.Subject);
    formData.append("birth",TeacherInfo.info.birth);
    formData.append("sex",TeacherInfo.info.sex);
    formData.append("remarks",TeacherInfo.info.Remarks);
    formData.append("major",TeacherInfo.info.rank);
    //console.dir(formData);

    return formData;
}
$('#file-updata').click(function(){
    if($('#j-user-img').children().length==0){
        alert("请上传学生证照片");
        return;
    }
    var formData=uploadFile();
    $(this).html('正在上传资料');
    $(this).attr('disabled',true);
    $.ajax({
        type: "POST",
        url: "php/imgFile.php",
        data: formData ,　　//这里上传的数据使用了formData 对象
        processData : false,
        //必须false才会自动加上正确的Content-Type
        contentType : false ,
        dataType:'json',

        //这里我们先拿到jQuery产生的 XMLHttpRequest对象，为其增加 progress 事件绑定，然后再返回交给ajax使用
        xhr: function(){
            var xhr = $.ajaxSettings.xhr();
            if(onprogress && xhr.upload) {
                xhr.upload.addEventListener("progress" , onprogress, false);
                return xhr;
            }
        },
        success:function(data){
            if(data.retCode==1){
                $('#file-updata').html('上传成功');
                $('#file-updata').css('backgroundColor','rgb(39,174,91)');
                $('#j-user-img>li').css('borderColor','rgb(39,174,91)');
                $('#j-user-img>li>span').css('display','none');
                //TeacherInfo.info.imgSrc=data.retSrc;
                nextPageInfo.date.imgSrc=data.retSrc.split('+');
                nextPageInfo.date.textDate=TeacherInfo.info;
                nextPageInfo.date.time=data.time;
                nextPageInfo.wifi=true;
                var str="资料已经锁定,审核之前不可更改";
                freeze(str,true);
            }else{
                $('#file-updata').html('上传失败');
                $('#file-updata').attr('disabled',false);
                $('#j-user-img>li').css('borderColor','#a94442');
                $('#j-user-img>li>span').css('display','none');
            }
        }
    });
});
//冻结输入
function freeze(info,no){
    $('.user-add-info input,.user-add-info textarea,.user-add-info select').attr('disabled',no);
    $('#updata-info').html(info);
};
//上传图片提示
$('.jFiler-input-dragDrop').click(function(){
    if($('#j-user-img').children().length==2){
        alert("每个用户只能上传两张图片");
        return;
    }else if($('#j-user-img').children().length==1){
        document.getElementById('file1').click();
    }else{
        document.getElementById('file').click();
    }
});
function previewFile(i) {
    if(i==1){
        //图片预览
        var file  = document.querySelector('#file').files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            $('#j-user-img').append(`<li><img src="${reader.result}" alt=""/><span></span></li>`);
            //uploadFile(i);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
//            preview.src = "";
        }
    }else if(i==2){
        //图片预览
        var file1  = document.querySelector('#file1').files[0];
        var reader1 = new FileReader();
        reader1.onloadend = function () {
            $('#j-user-img').append(`<li><img src="${reader1.result}" alt=""/><span></span></li>`);
            uploadFile(i);
        };
        if (file1) {
            reader1.readAsDataURL(file1);
        } else {
//            preview.src = "";
        }
    }
}
function onprogress(evt){
    //进度条
    var loaded = evt.loaded;     //已经上传大小情况
    var tot = evt.total;      //附件总大小
    var per = Math.floor(100*loaded/tot);  //已经上传的百分比
    if($('#j-user-img>li').length>1) {
        if (per <= 50) {
            $('#j-user-img>li:first-child>span').css('width', per * 2 + '%');
        } else {
            $('#j-user-img>li:last-child>span').css('width', (per - 50) * 2 + '%');
        }
    }else{
        $('#j-user-img>li:first-child>span').css('width', per + '%');
    }

}

$('.pager').on('click','.previous',function(){
    //上一步骤
    var $showFlow=$('.flow .flow-active');
    $(this).next().removeClass('hide');
    if($showFlow.prev().index()==0){
        $(this).addClass('hide');
    }
    $('.line-active').css('width',($showFlow.index()-1)*210);
    $('#flow > li:eq('+$showFlow.prev().index()+')').addClass('success');
    $('#flow > li:eq('+$showFlow.prev().index()+')').nextAll().removeClass('success');
    $('#flow > li:eq('+$showFlow.index()+') .npic').css('display','block');
    $('#flow > li:eq('+$showFlow.index()+') .hpic').css('display','none');
    $showFlow.prev().addClass('flow-active');
    $showFlow.removeClass('flow-active');
});
$('.pager').on('click','.next',function(){
    //下一步骤

    var $showFlow=$('.flow .flow-active');


    if($showFlow.index()==0){
        //验证是否全部填写
        var tWidth = parseFloat($('.info-number').html());
        if(tWidth!=100){
            //todo:验证是否全部填写
            alert('请正确填写所有带星的信息');
            return;
        }
    }else if($showFlow.index()==1){
        nextPageInfo.init();
    }

    $(this).prev().removeClass('hide');

    if($showFlow.next().index()==($('.flow').children().length-1)){
        $(this).addClass('hide');
    }
    $('.line-active').css('width',($showFlow.index()+1)*210);
    $('#flow > li:eq('+$showFlow.next().index()+')').addClass('success');
    setTimeout(function(){
        $('#flow > li:eq('+$showFlow.next().index()+') .npic').css('display','none');
        $('#flow > li:eq('+$showFlow.next().index()+') .hpic').css('display','block');
    },1300);
    $('#flow > li:eq('+$showFlow.next().index()+')').nextAll().removeClass('success');
    $showFlow.next().addClass('flow-active');
    $showFlow.removeClass('flow-active');
});

var TeacherInfo={
    info:{
        "sex":"男",
        "rank":1,
        "Subject":"语文教师"
    },
    init:function(){
        $('input[type="radio"]+label').click(
            function(){
                TeacherInfo.info.sex= (+$("input[name='sex']:checked").val()==0)?"男":"女";
            }
        );
        $('.user-add-info input,.user-add-info textarea,.user-add-info select').blur(function(){
            if(!TeacherInfo.info[$(this).attr('id')]){
                TeacherInfo.info[$(this).attr('id')]=this.value;
                //console.dir(TeacherInfo.info);
            }
        });
        this.inputValue();
    },
    inputValue:function() {
        $('.user-add-info input:not(input[type="radio"])').blur(function () {
            var inputs = $('.user-add-info input:not(input[type="radio"]):not(:disabled)');
            var num=0;
            for(var j=0;j<inputs.length;j++){
                if($.trim($(inputs[j]).val())!=""){
                    num++;
                }
            }
            $('.info-number').html(num * 25 + "%");
            $('#info-number').css('width', num * 25 + "%");
            TeacherInfo.textA($('.user-add-info textarea#Remarks'));
        });
        $('.user-add-info textarea#Remarks').blur(function(){
            TeacherInfo.textA($(this));
        });
    },
    textA:function(e){
        var tWidth = parseFloat($('.info-number').html());
        if($.trim($(e).val())==""&&tWidth>75){
            $('.info-number').html(tWidth - 25 + "%");
            $('#info-number').css('width', tWidth - 25 + "%");
        }else if($.trim($(e).val())!=""&&tWidth<100){
            $('.info-number').html(tWidth + 25 + "%");
            $('#info-number').css('width', tWidth + 25 + "%");
        }
    }

};
TeacherInfo.init();

const nextPageInfo={
    wifi:false,
    date:{
        'imgSrc':null,
        'textDate':null,
        'time':null
    },
    init:function(){
        if(nextPageInfo.wifi){
            var imgs='';
            for(var i=0;i<this.date.imgSrc.length;i++){
                imgs+=`<img src="${address}${(this.date.imgSrc[i]).replace(/\\\\/g,'/')}" data-toggle="modal" class="maxImg" data-target=".bs-example-modal-lg" alt=""/>`;
            }
            var html=`<div class="row">
                                <div class="col-sm-6">
                                    <p><span>申请人：</span><span class="text-danger">${localStorage.getItem('username')}</span></p>
                                </div>
                                <div class="col-sm-6">
                                    <p><span>申请时间：</span><span>${getDate(this.date.time)}</span></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6"><p><span>专业：</span><span>${this.date.textDate.major}</span></p></div>
                                <div class="col-sm-6"><p><span>授课对象：</span><span>${this.date.textDate.Grade}</span></p></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6"><p><span>科目：</span><span>${this.date.textDate.Subject}</span></p></div>
                                <div class="col-sm-6"><p><span>出生日期：</span><span>${this.date.textDate.birth}</span></p></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6"><p><span>价格：</span><span>${this.date.textDate.Price}</span></p></div>
                                <div class="col-sm-6"><p><span>性别：</span><span>${this.date.textDate.sex}</span></p></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12"><p><span>备注：</span><span class="beizhu">${this.date.textDate.Remarks}</span></p></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="show-img">
                                        <p>
                                            <span>学生证照片：</span>
                                            ${imgs}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6">
                                    <p><span>状态：</span><span class="text-info">审核中</span></p>
                                </div>
                                <div class="col-sm-6">
                                    <p><span>原因：</span><span class="text-danger">无</span></p>
                                </div>
                            </div>
                            <div class="admin-request">
                                <div class="request-wraing"></div>
                                <!--<div class="request-ok"></div>-->
                                <!--<div class="request-no"></div>-->
                            </div>`;
            $('.show-add-info').html(html);
        }
    }
};
//查看大图
function maxImg(){
    $('.show-add-info').on('click','.maxImg',function(){
        $('.modal .show-img img').attr('src',$(this).attr('src'));
    });
}
//判断是否申请
function applyForTrue(){
    var userID=localStorage.getItem('userID');
    $.ajax({
        url:'php/applyForTrue.php',
        type:'GET', //GET
        async:true,    //或false,是否异步
        data:{'userID':userID},
        timeout:10000,    //超时时间
        dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success:function(data,textStatus,jqXHR){
            if(+data.retCode==0){
                //查询成功
                updateHtml(data.applyForMsg);
                loadingHide();
            }else{
                loadingHide();
                //alert(data.retMsg);
            }
        },
        error:function(xhr,textStatus){
            console.log("请求失败");
        }
    })
};
function goStatus(n){
    $('.line-active').css('width',(n-1)*210);
    $('#flow > li:lt('+n+')').addClass('success');
    //$('#flow > li:lt('+n+')').removeClass('success');
    $('#flow > li:lt('+n+') .npic').css('display','none');
    $('#flow > li:lt('+n+') .hpic').css('display','block');
    $('.flow >div:eq('+(n-1)+')').addClass('flow-active');
    $('.flow >div:eq('+(n-1)+')').siblings().removeClass('flow-active');

    $('.main-footer').hide();
}
function updateHtml(data){
    var imgs='',imgSrc=data.cardAddress.split('+');
    for(var i=0;i<imgSrc.length;i++){
        imgs+=`<img src="${address}${(imgSrc[i]).replace(/\\/g,'/')}" data-toggle="modal" class="maxImg" data-target=".bs-example-modal-lg" alt=""/>`;
    }
    var html=`<div class="row">
                                <div class="col-sm-6">
                                    <p><span>申请人：</span><span class="text-danger">${data.username}</span></p>
                                </div>
                                <div class="col-sm-6">
                                    <p><span>申请时间：</span><span>${getDate(data.regtime)}</span></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6"><p><span>专业：</span><span>${data.major}</span></p></div>
                                <div class="col-sm-6"><p><span>授课年级：</span><span>${data.Grade}</span></p></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6"><p><span>科目：</span><span>${data.Subject}</span></p></div>
                                <div class="col-sm-6"><p><span>出生日期：</span><span>${data.birth}</span></p></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6"><p><span>价格：</span><span>${data.Price}</span></p></div>
                                <div class="col-sm-6"><p><span>性别：</span><span>${data.sex}</span></p></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12"><p><span>备注：</span><span class="beizhu">${data.Remarks}</span></p></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="show-img">
                                        <p>
                                            <span>学生证照片：</span>
                                            ${imgs}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6">
                                    <p><span>状态：</span><span class="text-info">${statusText[data.status]['text']}</span></p>
                                </div>
                                <div class="col-sm-6">
                                    <p><span>原因：</span><span class="text-danger">${data.reason}</span></p>
                                </div>
                            </div>
                            <div class="admin-request">
                                <div class="request-wraing"></div>
                                <!--<div class="request-ok"></div>-->
                                <!--<div class="request-no"></div>-->
                            </div>`;
    $('.show-add-info').html(html);
    goStatus(statusText[data.status]['status']);
}


$(document).ready(function(){
    applyForTrue();
    maxImg();
});
