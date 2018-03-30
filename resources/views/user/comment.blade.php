<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>头条营销平台</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://apps.bdimg.com/libs/jquery/1.8.3/jquery.js"></script>
    <script src="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <!-- Styles -->
    <style>
        #div_main_window,#div_comment_window{
            width: 300px;
            height: 500px;
            border: 1px solid #cec6c6;
            overflow: scroll;
        }
        .left_main{
            width:202px ;
            float: left;
            margin-left: 15rem;
        }
        .right_main{
            margin-top: 5rem;
            margin-left: 33rem;
        }
    </style>
</head>
<body>
<div class="left_main">
    @include('user.left')
</div>
<div class="right_main">
    <div style="display: inline-flex;">
        <div id="div_main_window">点赞控制台：<br></div>
        <div id="div_comment_window" style="margin-left: 10px;">评论控制台：<br></div>
    </div><br>
    <button class="button_login">登录</button><br>
    <input type="text" name="input_like_link" placeholder="点赞头条文章地址"/>
    <input type="text" name="input_like_link_id" placeholder="点赞头条文章Id"/>
    <input type="text" name="input_like_pageStart" placeholder="点赞开始行号"/>
    <input type="text" name="input_like_pageSize" placeholder="点赞偏移数目"/><br>
    <button class="button_like">点赞</button>
    {{--<iframe class="iframe_like" src="" style="width: 300px;height:500px;"></iframe>--}}
</div>
<script>
    $('.button_login').click(function(){
        var myWindow=window.open('https://mp.toutiao.com/profile_v2/','','width=800,height=600')
    });
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
                    for(var i=0;i<comment.length;i++){
                        setTimeout(function(){
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

                        },5000*(i+1));
                    }
                }
            },
            error:function(data){
                alert('网络错误，请稍后再试！');
            }
        });
    });

    function startLike(data,input_like_link,input_like_link_id){

    }

</script>


</body>
</html>
