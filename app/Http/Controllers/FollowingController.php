<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

/** 我的关注
 * Class FollowingController
 * @package App\Http\Controllers
 */
class FollowingController extends Controller
{
    /**
     * 获取关注
     */
    public function getMyFollowing(){
        $input=request()->all();
        $url = config('tt_link.myFollow') ;
        $header=array(
            "Referer: toutiao.com",
            "User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
            "Host: www.toutiao.com",
            "Connection: keep-alive",
            "Content-Type: application/x-www-form-urlencoded",
            "X-Requested-With: XMLHttpRequest"
        );
        $url=$url."?user_id=".$input['user_id']."&cursor=".$input['cursor']."&count=20&_signature=".$input['_signature'];
        $ret = $this->curl_get($url,$header);
        echo  $ret;
    }
}
