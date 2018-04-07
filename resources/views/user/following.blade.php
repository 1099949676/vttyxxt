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
    <script src="{{ asset('/js/UserArticle/core.js') }}"></script>
    <script src="{{ asset('/js/UserArticle/lib.js') }}"></script>
    <script src="{{ asset('/js/UserArticle/index.js') }}"></script>
    <script src="{{ asset('/js/main.js') }}"></script>
</head>
<body>
@include('user.top')
<div class="left_right_main">
    <div class="left_main">
        @include('user.left')
    </div>

    <div class="right_main">
        <div style="display: inline-flex;">
            <div class="div_main_window_follow">关注列表：<br>
                <ul class="following_ul">

                </ul>
            </div>
            <div>
                <button class="nextPage">下一页</button>
            </div>
        </div>
    </div>
    <div class="div-article">
        <div class="div-article_close">关闭</div>
        <div class="div-article_body">
            <ul>
            </ul>
        </div>
    </div>
</div>
<script>

    $('.div-article_close').click(function(){
        $('.div-article').hide();
    });

    var pageSize=0;
    /**
     * 核心算法1 获得as,cp
     */
    function getAsCp(){
        var t = 1521897255
                , i = t.toString(16).toUpperCase()
                , e = md5(t).toString().toUpperCase();
        if (8 != i.length)
            return {
                as: "479BB4B7254C150",
                cp: "7E0AC8874BB0985"
            };
        for (var s = e.slice(0, 5), o = e.slice(-5), n = "", a = 0; 5 > a; a++)
            n += s[a] + i[a];
        for (var l = "", r = 0; 5 > r; r++)
            l += i[r + 3] + o[r];
        return {
            as: "A1" + n + i.slice(-3),
            cp: i.slice(0, 3) + l + "E1"
        }
    }

    var params={
        'max_behot_time':0
    };

    var cursor=0;

    /**
     * 核心算法2，获得签名
     */
    function getSignature(userId){
        var userInfoId=userId;
        return TAC.sign( userInfoId+ "" + params.max_behot_time);
    }

    function getGuanzZhuSignature(cursor){
        var userInfoId='50078120404'
        return TAC.sign( userInfoId+ "" + cursor);
    }

    $('.nextPage').click(function(){
        pageSize++;
        getUserFolloing();
    });


    //console.log(getAsCp());

    $(document).ready(function(){
        getUserFolloing();
    });

    function getUserFolloing(){

        $('.div_main_window_follow')
        var baseUrl="{{config('tt_link/userBaseLink')}}";
        var _signature=getGuanzZhuSignature(cursor);
        $.ajax({
            type:'get',
            data:{
                user_id:'50078120404',
                _signature:_signature,
                cursor:cursor
            },
            dataType:'json',
            url:"{{ url('/user/getMyFollowing')}}",
            success:function(data){
                if(data.message=='success'){
                    cursor=data.cursor;
                    data=data.data;
                    for(var i=0;i<data.length;i++){
                        $('.following_ul').append('<li data-id='+data[i].user_id+'>'
                                +'<img  onclick=openUserZone('+data[i].user_id+') src="'+baseUrl+data[i].avatar_url+'" /><br>'
                                +'<span>'+data[i].name +'</span>'
                                +'</li>'
                        );
                    }

                    $('.following_ul>li').mouseover(function(){
                        if($(this).find('.extraInfo').size()==0){
                            $(this).append('<div class="extraInfo"><a onclick="openUserToutiaoIndex(this)">进入</a>&nbsp;&nbsp;<a onclick="openUserZone(this)">评论</a></div>');
                        }
                        $(this).find('.extraInfo').show();
                    });

                    $('.following_ul>li').mouseout(function(){
                        $(this).find('.extraInfo').hide();
                    });
                    setTimeout(function(){
                        $('.nextPage').css('margin-top',$('.div_main_window_follow').height()+"px");
                    },700);
                }else{
                    alert('网络错误，请稍后再试！');
                }
            },
            error:function(data){
                alert('网络错误，请稍后再试！');
            }
        });
    }

    $('.following_ul>li').mouseover(function(){
        if($(this).find('.extraInfo').size()==0){
            $(this).append('<div class="extraInfo"><a onclick="openUserToutiaoIndex(this)">进入</a>&nbsp;&nbsp;<a>评论</a></div>');
        }
        $(this).find('.extraInfo').show();
    });

    function openUserToutiaoIndex(obj){
        window.open("{{config('tt_link.userToutiaoIndexLink')}}"+$(obj).parent().parent().attr('data-id')+"/",'_blank');
    }


    $('.following_ul>li').mouseout(function(){
        $(this).find('.extraInfo').hide();
    });

    var beforeUserId;

    function openUserZone(obj){
        //return;
        var user_id=$(obj).parent().parent().attr('data-id');
        if(beforeUserId&&beforeUserId!=user_id){
            params['max_behot_time']=0;
        }
        params['max_behot_time']=0;
        beforeUserId=user_id;
        $('#following_user_info').show();
        var cpas=getAsCp();
        $.ajax({
            type:'get',
            data:{
                _signature:getSignature(user_id),
                user_id:user_id,
                cp:cpas['cp'],
                as:cpas['as'],
                max_behot_time:params['max_behot_time']
            },
            dataType:'json',
            url:"{{ url('/user/getUserArticle')}}",
            success:function(data){
                if(data.message=='success'){
                    params['max_behot_time']=data.next.max_behot_time;
                    data=data.data;
                    $('.div-article_body>ul').html('');
                    for(var i=0;i<data.length;i++){
                        var title=data[i].title?data[i].title:'视频内容';
                        $('.div-article_body>ul').append('<li>'
                                        +title
                                        +"<br>"
                                        +'<input type="text"/><br>'
                                        +'<a onclick="commentArticle(this,\''+data[i].item_id+'\',\''+data[i].display_url+'\')">回复</a>&nbsp;&nbsp;<a onclick="showArticle(\''+data[i].display_url+'\')">查看文章</a><br><br>'
                                +'</li>'
                        )
                    }
                    $('.div-article').show();
                }else{
                    alert('网络错误，请稍后再试！');
                }
            },
            error:function(data){
                alert('网络错误，请稍后再试！');
            }
        });
    }

    function commentArticle(obj,id,url){
        var commentContent=$(obj).parent().find('input').val();
        if(!commentContent){
            alert("内容不能为空！");
            return;
        }
        var param={
            'status':commentContent,
            'content':commentContent,
            'group_id':id,
            'item_id':id,
            'id':0,
            'format':'json',
            'aid':24,
            'display_url':url
        };
        var url="{{ url('/user/commentArticle')}}";
        $.getJSON(url,param,function(data){
            if(data!=null&data.message=='success'){
                alert("评论成功！");
            }else{
                alert("评论失败！")
            }
        });
    }

    function showArticle(url){
        window.open(url,'_bliank');
    }
</script>

<div id="following_user_info">

</div>
</body>
</html>
