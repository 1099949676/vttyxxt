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
    </body>
    <script>

    </script>
</html>
