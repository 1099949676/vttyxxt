<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * 获取用户文章
     */
    public function getUserArticle(){
        $input=request()->all();
        $url = config('tt_link.userArticle') ;
        $url.="?page_type=1&user_id=".$input['user_id']."&max_behot_time=".$input['max_behot_time']."&count=20&as=".$input['as']."&cp=".$input['cp']."&_signature=".$input['_signature']."";
        $header=array(
            "Referer: toutiao.com",
            "User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
            "Host: www.toutiao.com",
            "Connection: keep-alive",
            "Content-Type: application/x-www-form-urlencoded",
            "X-Requested-With: XMLHttpRequest"
        );
        $ret = $this->curl_get($url,$header);
        echo  $ret;
    }

    /**
     * 评论文章
     */
    public  function commentArticle(){
        $input=request()->all();
        $display_url=$input['display_url'];
        unset($input['display_url']);
        $cookie_file = dirname(__FILE__).'/lookArticelcookie.txt';
        $this->curl_get("https://".$display_url,null,$cookie_file);
        $data=$this->arrayToStringParam($input);
        $header=config('header.commentArticle');
        $url = config('tt_link.toutiaoComment') ;
        $ret = $this->curl_post($header, $data,$url,null,null,$cookie_file);
        echo $ret;
    }


}
