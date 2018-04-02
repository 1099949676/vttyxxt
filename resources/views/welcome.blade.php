<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>欢迎你</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css">
        <script src="http://cdn.static.runoob.com/libs/jquery/2.1.1/jquery.min.js"></script>
        <script src="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script src="{{ asset('/js/main.js') }}"></script>
        <style>
            body{
                background-color: #f34848
            }
            .main{
                position: absolute;
                top: 20%;
                left: 40%;
                font-size: 5rem;
                color: white;
            }
            .main_sub_title{
                text-align: center;
                font-size: 2rem;
                cursor: pointer;
            }
            .main_logo{
                text-align: center;
                margin-bottom: 1rem;
            }
            .main_logo img{
                width: 10rem;
                border-radius: 70px;
            }
            .main_title{
                margin-bottom: 1rem;
            }
        </style>
    </head>
    <body >
        <div class="main">
            <div class="main_logo"><img src="{{URL::asset('/images/logo.jpg')}}"/></div>
            <div class="main_title">V头条营销平台</div>
            <div class="main_sub_title btn-primary" onclick="javascript:window.location.href='{{url('/user/index')}}';">马上进入</div>
        </div>
        <div>
            手机号:<input name="phoneNumber" /><br>
            验证码:<input name="code"><img id="imgCode" src=""><button onclick="getImgCode()">更换</button><br>
            手机验证码:<input name="phoneCode"><button onclick="getCode()">获取</button><br>
            <button onclick="quicLogin()">登录</button>
        </div>
    </body>
    <script>
        function getImgCode(){
            var inter=setInterval(function(){
                $.ajax({
                    url:"{{url('user/getImgCode')}}",
                    type:'get',
                    dataType:'json',
                    async:false,
                    success:function(data){
                        //alert(data);
                        if(data.captcha!=undefined){
                            $('#imgCode').attr('src','data:image/gif;base64,'+data.captcha);
                            clearInterval(inter);
                        }
                    }
                });
            },200)

        }

        getImgCode();




        function getCode(){

            var param={
                "mobile":$("[name=phoneNumber]").val(),
                "captcha":$("[name=code]").val(),
                "type":"24"
            };

            $.ajax({
                url:"{{url('user/getCode')}}",
                type:'get',
                dataType:'json',
                async:false,
                data:param,
                success:function(data){
                    //alert(data);
                    console.log(data);
                    if(data.captcha!=undefined){
                        $('#imgCode').attr('src','data:image/gif;base64,'+data.captcha);
                    }
                }
            });


        }


        function quicLogin(){
            var param={
                "mobile": $("[name=phoneNumber]").val(),
                "code": $("[name=phoneCode]").val(),
                 "account": $("[name=phoneNumber]").val(),
                "password": "password123456",
                "captcha": $("[name=code]").val(),
                "is_30_days_no_login": false,
                "service": "https://mp.toutiao.com/sso_confirm/?redirect_url=JTJG"
            };

            $.ajax({
                url:"{{url('user/quickLogin')}}",
                type:'get',
                dataType:'json',
                async:false,
                data:param,
                success:function(data){

                }
            });

        }

      /*  $.ajax({
            url:"{{url('user/getTouTiaoLoginIndex')}}",
            type:'get',
            dataType:'json',
            success:function(data){
                //alert(data);
                //$('#imgCode').attr('src',data.captcha);
            }
        });*/


        function hehe(){
            alert(1);
        }

    </script>
</html>
