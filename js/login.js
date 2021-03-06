/**
 * Created by Administrator on 2017/4/9.
 */
var login={
    userInfo:{},
    getLocalStorage:false,
    init:function(){
        this.getLocalUser();
        $('#login-go').click(function(){
            if($('#login-email').val()==""){
                alert('登录用户不能为空');
                return false;
            }
            if($('#login-pwd').val()==''){
                alert('登录密码不能为空');
                return false;
            }
            $(this).val('正在登陆').disabled=true;
            $('.loading').show();
            $('.loading h2').html('正在登陆...');
            login.userInfo.email=$('#login-email').val();
            login.userInfo.pwd=(this.getLocalStorage)?$('#login-pwd').val():hex_md5($('#login-pwd').val());
            $.ajax({
                url:'php/login.php',
                type:'GET', //GET
                async:true,    //或false,是否异步
                data:login.userInfo,
                timeout:10000,    //超时时间
                dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                success:function(data,textStatus,jqXHR){
                    if(+data.retCode==1){
                        login.setLocalUser(data.userinfo);
                        window.location.href='./home.html';
                    }else{
                        alert(data.retMsg);
                        $('.loading').hide();
                    }
                    $('#login-go').val('登陆').disabled=false;
                },
                error:function(xhr,textStatus){
                    $('#login-go').val('登陆').disabled=false;
                }
            })
        });
    },
    setLocalUser:function(user){
        localStorage.setItem('username',user.username);
        localStorage.setItem('password',user.password);
        localStorage.setItem('regtime',user.regtime);
        localStorage.setItem('email',user.email);
        localStorage.setItem('Headportrait',user.Headportrait);
        localStorage.setItem('userID',user.userID);
        document.cookie='username='+user.username;
        document.cookie='Headportrait='+user.username;
    },
    getLocalUser:function(){
        let password=localStorage.getItem('password',"password");
        let email=localStorage.getItem('email','email');
        if(password&&email){
            $('#login-pwd').val(password);
            $('#login-email').val(email);
            login.getLocalStorage=true;
        }
    }
};
login.init();

$('.qq').click(function(){
    //var A=window.open("oauth/index.php","TencentLogin",
    //    "width=450,height=320,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1");

});