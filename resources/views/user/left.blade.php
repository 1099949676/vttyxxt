<div class="nav_main">
    <div id="index">主页</div>
    <div id="login" class="button_login">登录</div>
    <div id="followed">粉丝数量</div>
    <div id="admin">进入后台</div>
    <div id="like">点赞</div>
    <div id="comment">评论</div>
    <div id="following">关注</div>
    <div id="wArticle">微头条</div>
    <div id="statistics">统计</div>
    <div id="myCenter">我的账号</div>
    <div id="qita1">其他1</div>
    <div id="qita2">其他2</div>
</div>
<script>
    //点击登录
    $('.button_login').click(function(){
        var myWindow=window.open("{{config('tt_link.toutiaoLogin')}}",'','width=800,height=600');
    });

    $(document).ready(function(){
        //设置tab的颜色
        $("#{{$tabName}}").css('background','rgba(232, 32, 12, 0.71)');
        $("#{{$tabName}}").css('color','white');
        //设置主体居中
        var wWidth=$(window).width();
        var marginWidth=(wWidth-($('.left_main').width()+$('.right_main').width()))/2;
        $('.left_main').css('margin-left',marginWidth+"px");
    })

    $('.nav_main div').click(function(){
        var id=$(this).attr('id');
        if(id!='denglu'){
            window.location.href="{{url('/user/')}}/"+id;
        }
    });
</script>