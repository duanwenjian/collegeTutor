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
            $('#register-pwd').bind('input propertychange',function(){
                register.userInfo.pwd=$.trim($(this).val());
                if(register.userInfo.pwd.toString().length>16){
                    $(this).parent().removeClass('info-ok').addClass('info-error');
                    $(this).parent().find('.r-info').html('密码太长').css('opacity',1);
                    $(this).parent().find('.glyphicon').removeClass('glyphicon-ok text-success').addClass('glyphicon-remove text-danger');
                    return false;
                }else if(register.userInfo.pwd.toString().length==0){
                    $(this).parent().removeClass('info-ok').addClass('info-error');
                    $(this).parent().find('.r-info').html('密码不能为空').css('opacity',1);
                    $(this).parent().find('.glyphicon').removeClass('glyphicon-ok text-success').addClass('glyphicon-remove text-danger');
                    return false;
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
                //register.pwdTest();
                if(register.userInfo.value<6){
                    alert("请正确填写注册信息");
                    return;
                }else{
                    $(this).val('正在注册').disabled=true;
                    $('.loading').show();
                    $('#register-return-ok').addClass('swal2-in');
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
                                $('.loading').hide();
                                register.reginsterOK();
                            }else{
                                register.reginsterREEOR();
                            }
                            $('#register-btn').val('注册').disabled=false;
                        },
                        error:function(xhr,textStatus){
                            $('#register-btn').val('注册').disabled=false;
                        }
                    })
                }
            });
        },
        reginsterOK:function(){
            $('#register-return-ok').children().html('' +
            '<div class="swal2-icon swal2-success" style="display: block;" id="animate-ok"> ' +
            '<span class="line tip " id="animate-ok1"></span> ' +
            '<span class="line long" id="animate-ok2"></span> ' +
            '<div class="placeholder"></div> ' +
            '<div class="fix"></div> </div> ' +
            '<h2>注册成功</h2> <!--<p>您是第 <span class="text-danger">378</span> 位用户</p>--> ' +
             '<h3>请登录邮箱激活账号，便可登陆</h3>'+
            '<a type="button" href="login.html" class="btn btn-sm btn-info" style="margin-top: 20px">登陆</a>'
            );
            setTimeout(function(){
                $('#register-return-ok').children().addClass('alert-style').removeClass('swal2-hide').addClass('swal2-show');
                $('#animate-ok').addClass('animate');
                $('#animate-ok1').addClass('animate-success-tip');
                $('#animate-ok2').addClass('animate-success-long');
            },200);
        },
        reginsterREEOR:function(){
            $('#register-return-ok').on('click','#error',function(){
                $('#register-return-ok').removeClass('swal2-in');
                $('#register-return-ok').children().removeClass('alert-style').addClass('swal2-hide').removeClass('swal2-show');
            });
            $('#register-return-ok').children().html('<div class="swal2-icon swal2-warning pulse-warning" style="display: block;">!</div>' +
            '<h2>注册失败</h2> <!--<p>您是第 <span class="text-danger">378</span> 位用户</p>--> '
            +'<a type="button" id="error" class="btn btn-sm btn-info" style="margin-top: 20px">重新注册</a>');
            setTimeout(function(){
                $('#register-return-ok').children().addClass('alert-style').removeClass('swal2-hide').addClass('swal2-show');
            },200);
        }
    };
$(function(){
    register.init();
});