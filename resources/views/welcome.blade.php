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
            <div class="main_sub_title btn-primary" data-toggle="modal" data-target="#loginDialog">马上登录</div>
        </div>
   {{--     <div style="display: none;" class="loginDialog">
            手机号:<input name="phoneNumber" /><br>
            验证码:<input name="code"><img id="imgCode" src=""><button onclick="getImgCode()">更换</button><br>
            手机验证码:<input name="phoneCode"><button onclick="getCode()">获取</button><br>
            <button onclick="quicLogin()">登录</button>
        </div>--}}


        <div class="modal fade" id="loginDialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">登录头条号</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label for="firstname" class="col-sm-2 control-label">手机号</label>
                                <div class="col-sm-10">
                                    <input name="phoneNumber" class="form-control" placeholder="请输入手机号" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="lastname" class="col-sm-2 control-label">验证码</label>
                                <div class="col-sm-5">
                                    <input name="code" class="form-control">
                                </div>
                                <div class="col-sm-5">
                                    <img id="imgCode" src=""><button  class="btn btn-default" type="button" onclick="getImgCode()">更换</button>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="lastname" class="col-sm-2 control-label">手机验证码</label>
                                <div class="col-sm-5">
                                    <input name="phoneCode" class="form-control" >
                                </div>
                                <div class="col-sm-5">
                                    <button  type="button" class="btn btn-default" onclick="getCode()">获取</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" onclick="quicLogin()">登录</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>
    </body>
    <script>

        function  showLoginDialog(){
            $('#loginDialog').show();
        }

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
            var mobile=$("[name=phoneNumber]").val();
            var code=$("[name=code]").val();
            if(!mobile||!code){
                alert("手机号和图片验证码不能为空！");
                return;
            }
            var param={
                "mobile":mobile,
                "captcha":code,
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
                    if(data.error_code&&data.error_code==0){
                        window.location.href="{{url('user/following')}}";
                    }
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
