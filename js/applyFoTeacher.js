/**
 * Created by Administrator on 2017/4/30.
 */
function uploadFile(){

    // 获取上传文件，放到 formData对象里面
    var pic = $("#file").get(0).files[0];
    var userID=localStorage.getItem('userID');
    var formData = new FormData();
    formData.append("myfile" , pic);
    formData.append("userID",1);
    $.ajax({
        type: "POST",
        url: "php/imgFile.php",
        data: formData ,　　//这里上传的数据使用了formData 对象
        processData : false,
        //必须false才会自动加上正确的Content-Type
        contentType : false ,

        //这里我们先拿到jQuery产生的 XMLHttpRequest对象，为其增加 progress 事件绑定，然后再返回交给ajax使用
        xhr: function(){
            var xhr = $.ajaxSettings.xhr();
            if(onprogress && xhr.upload) {
                xhr.upload.addEventListener("progress" , onprogress, false);
                return xhr;
            }
        }
    });
}
function previewFile() {
    var file  = document.querySelector('#file').files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        $('#j-user-img').append(`<li><img src="${reader.result}" alt=""/><span></span></li>`);
        uploadFile();
    };
    if (file) {
        reader.readAsDataURL(file);
    } else {
//            preview.src = "";
    }
}
function onprogress(evt){
    //进度条
    var loaded = evt.loaded;     //已经上传大小情况
    var tot = evt.total;      //附件总大小
    var per = Math.floor(100*loaded/tot);  //已经上传的百分比
//        console.dir(per);
    $('#j-user-img>li:last-child>span').css('width',per+'%');
    if(per==100){
        $('#j-user-img>li:last-child').css('borderColor','rgb(39,174,91)');
        $('#j-user-img>li:last-child>span').css('display','none');
    }

}

$('.pager').on('click','.previous',function(){
    $showFlow=$('.flow .flow-active');
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
    $showFlow=$('.flow .flow-active');
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