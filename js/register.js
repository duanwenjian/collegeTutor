/**
 * Created by Administrator on 2017/4/8.
 */
    /**===用户注册*/
var register={
        userInfo:{
            value:0
        },
        init:function(){
            this.emailTest();
            this.pwdTest();
            this.usernameTest();
            this.registerBtn();
        },
        emailTest:function(){
            /*邮箱格式验证*/
            $('#register-email').blur(function(){
                var reg=/^([\w]+)(.[\w]+)*@([\w-]+\.){1,5}([A-Za-z]){2,4}$/;
                register.userInfo.email=$.trim($(this).val());
                if(!reg.test(register.userInfo.email)){
                    $(this).parent().removeClass('info-ok').addClass('info-error');
                    $(this).parent().find('.r-info').html('邮箱格式不合格').css('opacity',1);
                    $(this).parent().find('.glyphicon').removeClass('glyphicon-ok text-success').addClass('glyphicon-remove text-danger');
                }else{
                    var that=$(this);
                    $.ajax({
                        url:'php/email.php',
                        type:'GET', //GET
                        async:true,    //或false,是否异步
                        data:{email:register.userInfo.email},
                        timeout:10000,    //超时时间
                        dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                        success:function(e,textStatus,jqXHR){
                            if(+e.retCode==1){
                                that.parent().removeClass('info-error').addClass('info-ok');
                                that.parent().find('.r-info').html('').css('opacity',0);
                                that.parent().find('.glyphicon').removeClass('glyphicon-remove text-danger').addClass('glyphicon-ok text-success');
                                register.userInfo.value+=1;
                            }else{
                                that.parent().removeClass('info-ok').addClass('info-error');
                                that.parent().find('.r-info').html('邮箱已被占用').css('opacity',1);
                                that.parent().find('.glyphicon').removeClass('glyphicon-ok text-success').addClass('glyphicon-remove text-danger');
                            }
                        },
                        error:function(xhr,textStatus){
                        }
                    });
                }
            });
        },
        pwdTest:function(){
            /*密码格式验证*/
            $('#register-pwd').blur(function(){
                register.userInfo.pwd=$.trim($(this).val());
                if(register.userInfo.pwd.toString().length>16){
                    $(this).parent().removeClass('info-ok').addClass('info-error');
                    $(this).parent().find('.r-info').html('密码太长').css('opacity',1);
                    $(this).parent().find('.glyphicon').removeClass('glyphicon-ok text-success').addClass('glyphicon-remove text-danger');
                }else if(register.userInfo.pwd.toString().length==0){
                    $(this).parent().removeClass('info-ok').addClass('info-error');
                    $(this).parent().find('.r-info').html('密码不能为空').css('opacity',1);
                    $(this).parent().find('.glyphicon').removeClass('glyphicon-ok text-success').addClass('glyphicon-remove text-danger');
                }else{
                    $(this).parent().removeClass('info-error').addClass('info-ok');
                    $(this).parent().find('.r-info').html('').css('opacity',0);
                    $(this).parent().find('.glyphicon').removeClass('glyphicon-remove text-danger').addClass('glyphicon-ok text-success');
                    register.userInfo.value+=2;
                }
            });
        },
        usernameTest:function(){
            /*用户名格式验证*/
            $('#register-username').blur(function(){
                register.userInfo.username=$.trim($(this).val());
                if(register.userInfo.username.toString().length>10){
                    $(this).parent().removeClass('info-ok').addClass('info-error');
                    $(this).parent().find('.r-info').html('用户名太长').css('opacity',1);
                    $(this).parent().find('.glyphicon').removeClass('glyphicon-ok text-success').addClass('glyphicon-remove text-danger');
                }else if(register.userInfo.username.toString().length==0){
                    $(this).parent().removeClass('info-ok').addClass('info-error');
                    $(this).parent().find('.r-info').html('用户名不能为空').css('opacity',1);
                    $(this).parent().find('.glyphicon').removeClass('glyphicon-ok text-success').addClass('glyphicon-remove text-danger');
                }else{

                    var that=$(this);
                    $.ajax({
                        url:'php/usertest.php',
                        type:'GET', //GET
                        async:true,    //或false,是否异步
                        data:{username:register.userInfo.username},
                        timeout:10000,    //超时时间
                        dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                        success:function(e,textStatus,jqXHR){
                            if(+e.retCode==1){
                                that.parent().removeClass('info-error').addClass('info-ok');
                                that.parent().find('.r-info').html('').css('opacity',0);
                                that.parent().find('.glyphicon').removeClass('glyphicon-remove text-danger').addClass('glyphicon-ok text-success');
                                register.userInfo.value+=3;
                            }else{
                                that.parent().removeClass('info-ok').addClass('info-error');
                                that.parent().find('.r-info').html('用户名已被占用').css('opacity',1);
                                that.parent().find('.glyphicon').removeClass('glyphicon-ok text-success').addClass('glyphicon-remove text-danger');
                            }
                        },
                        error:function(xhr,textStatus){
                        }
                    });
                }
            })
        },
        registerBtn:function(){
            $('#register-btn').click(function(){
                if(register.userInfo.value!=6){
                    alert("请正确填写注册信息");
                    return;
                }else{
                    register.userInfo.pwd=hex_md5(register.userInfo.pwd);
                    $.ajax({
                        url:'php/register.php',
                        type:'POST', //GET
                        async:true,    //或false,是否异步
                        data:register.userInfo,
                        timeout:10000,    //超时时间
                        dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                        success:function(data,textStatus,jqXHR){
                            if(+data.retCode==1){

                            }
                        },
                        error:function(xhr,textStatus){
                        }
                    })
                }
            });
        }
    };
$(function(){
    register.init();
});