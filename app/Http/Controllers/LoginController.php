<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController extends Controller
{
    /**
     * 获取图片验证码
     */
    public function getImgCode(){
        $url=config("tt_link.refreshCaptcha");
        $header=array(
            "Referer: https://sso.toutiao.com/login/?service=https://mp.toutiao.com/sso_confirm/?redirect_url=JTJG",
            "User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
            "Host: sso.toutiao.com",
            "Connection: keep-alive",
            "Content-Type: application/x-www-form-urlencoded",
            "X-Requested-With: XMLHttpRequest"
        );
        $cookie_file = dirname(__FILE__).'/cookie.txt';
        echo $this->curl_get($url,$header,$cookie_file,null);
    }


    /**
     * 获取短信验证码
     */
    public function getCode(){
        $url=config("tt_link.sendActivationCode");
        $input=request()->all();
        $data=$this->arrayToStringParam($input);
        $url=$url."?".$data;
        $header=array(
            "Referer: https://sso.toutiao.com/login/?service=https://mp.toutiao.com/sso_confirm/?redirect_url=JTJG",
            "User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
            "Host: sso.toutiao.com",
            "Connection: keep-alive",
            "Content-Type: application/x-www-form-urlencoded",
            "X-Requested-With: XMLHttpRequest"
        );
        $cookie_file = dirname(__FILE__).'/cookie.txt';
        echo $this->curl_get($url,$header,null,$cookie_file);

    }


    /**
     * 模拟登陆方法
     */
    public function quickLogin(){
        $url=config("tt_link.quickLogin");
        $input=request()->all();
        $data=$this->arrayToStringParam($input);
        $header=array(
            "Referer: https://sso.toutiao.com/login/?service=https://mp.toutiao.com/sso_confirm/?redirect_url=JTJG",
            "User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
            "Host: sso.toutiao.com",
            "Connection: keep-alive",
            "Content-Type: application/x-www-form-urlencoded",
            "X-Requested-With: XMLHttpRequest"
        );

        $storeCookie = dirname(__FILE__).'/maincookie.txt';
        $useCookie = dirname(__FILE__).'/cookie.txt';
        $result=$this->curl_post($header,$data,$url,$storeCookie,$useCookie);

        $resultJson=json_decode($result,true);

        if($resultJson['error_code']==0){
            $this->curl_get($resultJson['redirect_url'],null,$storeCookie,null);
        }

        /*$result=$this->curl_get("https://mp.toutiao.com/profile_v3/index",null,$storeCookie,null);*/

        /* $result=$this->curl_get("https://w.toutiao.com/profile_v3/index",$header,$storeCookie,null);*/


        echo  $result;

    }


    /**
     * 获取头条号后台登录html
     */
    public function getTouTiaoLoginIndex(){
        $url=config("tt_link.toutiaoLoginIndex");
        echo $this->curl_get($url);
    }

}
