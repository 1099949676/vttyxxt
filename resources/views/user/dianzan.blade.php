<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{config('app.appName')}}</title>
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="http://cdn.static.runoob.com/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <!-- Styles -->
    <link href="{{ asset('/css/main.css') }}" rel="stylesheet" type="text/css">
</head>
<body>
@include('user.top')
<div class="left_right_main">
    <div class="left_main">
        @include('user.left')
    </div>

    <div class="right_main">
        <div style="display: inline-flex;">
            <div id="div_main_window">点赞控制台：<br></div>
        </div>
        <div class="right_main_form">
            <p><input type="text" name="input_like_link" placeholder="点赞头条文章地址"/></p>
            <p><input type="text" name="input_like_link_id" placeholder="点赞头条文章Id"/></p>
            <p><input type="number" name="input_like_pageStart" placeholder="点赞开始行号"/></p>
            <p><input type="number" name="input_like_pageSize" placeholder="点赞偏移数目"/></p>
            <p><button class="button_like">点赞</button>&nbsp;&nbsp;<button class="button_stop_like">停止点赞</button></p>
        </div>
        {{--<iframe class="iframe_like" src="" style="width: 300px;height:500px;"></iframe>--}}
    </div>
</div>
<script>

    document.domain = 'toutiao.com';
    console.log(document.cookie);

    var interval;
    var j=0;
    $('.button_like').click(function(){
        var input_like_link=$('[name=input_like_link]').val();
        var input_like_link_id=$('[name=input_like_link_id]').val();
        var input_like_pageStart=$('[name=input_like_pageStart]').val();
        var input_like_pageSize=$('[name=input_like_pageSize]').val();
        j=0;
        var dataComments=[];
        $.ajax({
            data:{
                'input_like_link':input_like_link,
                'input_like_link_id':input_like_link_id,
                'input_like_pageStart':input_like_pageStart,
                'input_like_pageSize':input_like_pageSize
            },
            type:'get',
            dataType:'json',
            url:"{{ url('/user/getArticleComments')}}",
            success:function(data){
                if(data.message=='success'){
                    var comment=data.data.comments;
                    dataComments=comment;
                    interval=setInterval(function(){
                        if(j==dataComments.length-1){
                            clearInterval(interval);
                        }
                        var data=dataComments[j];
                        j++;
                        $('#div_main_window').append("开始点赞->"+data.text+"<br>");
                        $.ajax({
                            data:{
                                'input_like_link':input_like_link,
                                'dongtai_id':data.dongtai_id,
                                'articleId':input_like_link_id
                            },
                            type:'get',
                            dataType:'json',
                            url:"{{ url('/user/startLike')}}",
                            success:function(data){
                                if(data.message=='success'){
                                    $('#div_main_window').append("点赞成功！"+"<br>");
                                }
                            },
                            error:function(data){
                                alert('网络错误，请稍后再试！');
                            }
                        });
                    },5000);
                }
            },
            error:function(data){
                alert('网络错误，请稍后再试！');
            }
        });
    });




    $('.button_stop_like').click(function(){
        $('#div_main_window').append("用户停止点赞"+"<br>");
        clearInterval(interval);
    });
</script>


</body>
</html>
