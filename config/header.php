<?php

return [
    'header'=> array("Accept:text/javascript, text/html, application/xml, text/xml, */*",
        /*            "Accept-Encoding:gzip, deflate, br,identity，*",*/
        "Accept-Language:zh-CN,zh;q=0.9",
        "Connection:keep-alive",
        "Content-Length:124",
        "Content-Type:application/x-www-form-urlencoded",
        "Host:www.toutiao.com",
        "Origin:https://www.toutiao.com",
        "User-Agent:Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36",
        "X-CSRFToken:undefined",
        "X-Requested-With:XMLHttpRequest"
    ),

    'weitoutiao'=>array(":authority:www.toutiao.com",
        ":method:POST",
        ":path:/c/ugc/content/publish/",
        ":scheme:https",
        "accept:text/javascript, text/html, application/xml, text/xml, */*",
        "accept-language:zh-CN,zh;q=0.9",
        "content-length:92",
        "content-type:application/x-www-form-urlencoded",
        "origin:https://www.toutiao.com",
        "referer:https://www.toutiao.com/",
        "user-agent:Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36",
        "x-requested-with:XMLHttpRequest"
    ),

    'commentArticle'=>array(":authority:www.toutiao.com",
        ":method:POST",
        ":path: /api/comment/post_comment/",
        ":scheme:https",
        "accept:text/javascript, text/html, application/xml, text/xml, */*",
        "accept-language:zh-CN,zh;q=0.9",
        "content-length:151",
        "content-type:application/x-www-form-urlencoded",
        "origin:https://www.toutiao.com",
        "referer:https://www.toutiao.com/",
        "user-agent:Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36",
        "x-requested-with:XMLHttpRequest"

    ),
];
