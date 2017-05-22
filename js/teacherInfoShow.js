/**
 * Created by Administrator on 2017/5/13.
 */
$(document).ready(function(){
    loadingHide();
    maxImg();
    getDate();
});

function maxImg(){
    $('body').on('click','.j-max-img img',function(){
        $('.modal .show-img img').attr('src',$(this).attr('src'));
    });
}

$('body').on('click','#applyTeacher',function(){
});

function getDate(){
    $.ajax({
        url:'php/teacherInfoShow.php',
        type:'GET', //GET
        async:true,    //或false,是否异步
        data:{'userID':getUrlParam('userID')},
        timeout:10000,    //超时时间
        dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success:function(data,textStatus,jqXHR){
            if(+data.retCode==0){
                //查询成功
                getHtml(data);

            }else{
            }
        },
        error:function(xhr,textStatus){
            console.log("请求失败");
        }
    });
}
function getHtml(date){
    var imgs='',imgSrc=date.teacherInfo.cardAddress.split('+');
    for(var i=0;i<imgSrc.length;i++){
        imgs+=`<img src="${address}${(imgSrc[i]).replace(/\\/g,'/')}" data-toggle="modal" class="maxImg" data-target=".bs-example-modal-lg" alt=""/>`;
    }
    date.teacherInfo.cardAddress=imgs;
    for(var  i in date.teacherInfo){
        $('*[data-bind='+i+']').html(date.teacherInfo[i]);
    }
    $('#userid').attr('data-userid',date.teacherInfo.id);
    $('#userid').attr('data-username',date.teacherInfo.username);
    var htmls='';
    for(var j=0;j<date.talkInfoList.length;j++){
        htmls+=`<li class="talk-user">
                                <div class="left">
                                    <img src="${date.talkInfoList[j].Headportrait}" alt="${date.talkInfoList[j].username}"/>
                                </div>
                                <div class="right">
                                    <span class="label label-danger pull-right">${date.talkInfoList[j].talkGrade}星</span>
                                    <p>${date.talkInfoList[j].username}</p>
                                    <span>${date.talkInfoList[j].content}</span>
                                </div>
                            </li>`;
    }
    $('#teacherTalkList').html(htmls);
    var ranks=`<ul class="user-start" data-toggle="tooltip" data-placement="right" title="${date.teacherInfo.rank}星级">`;
    for(var k =0;k<date.teacherInfo.rank;k++){
        ranks+=`<li><img src="img/home/user-start/3.gif" alt="1星级"/></li>`;
    }
    ranks+='</ul>';
    $('#teacher-info').append(ranks);
}


//usertSendMessage(localStorage.getItem('userID'))

$('#applyTeacher').click(function(){
    var msg={
        'fromUserID':localStorage.getItem('userID'),
        'toUserID':$('#userid').attr('data-userid'),
        'msg':'我要聘请您',
        'type':'apply'
    };
    userSendMessage(msg,function(){
        $('.j-message').html('聘请请求已发送');
        setTimeout(function(){
            $('#message-push').modal('hide');
            $('.j-message').html('正在发送请求');
        },1000);
    });
});

$('body').on('click','#j-addTo-teacher',function(){
    getMessagePanel();
    $("#messagePanel")[0].contentWindow.username=$('#userid').attr('data-username');
    //$('#messagePanel').contents().find('#search__input').val();
});