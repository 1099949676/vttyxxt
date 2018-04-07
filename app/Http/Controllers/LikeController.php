<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LikeController extends Controller
{
    /**
     * 开始点赞的方法
     */
    function startLike()
    {
        $input=request()->all();
        //$articleLink=config('tt_link.articleDetailLink').'a6518557293812908552';
        $articleLink=$input['input_like_link'];
        $url = config('tt_link.diggLink') ;
        $cookie="Cookie:uuid=\"w:39c570c50a904f3b8909c35bf8f8a451\"; _ga=GA1.2.994153727.1519795917; UM_distinctid=161dae559f5b8-0f27ae87081d6d-4542072c-15f900-161dae559f9359; WEATHER_CITY=%E5%8C%97%E4%BA%AC; __utma=24953151.994153727.1519795917.1519991363.1519991363.1; __utmz=24953151.1519991363.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); part=stable; cp=5A9A0B2261740E1; tt_webid=75159844822; _gid=GA1.2.1246399681.1519795917; tt_webid=75159844822; login_flag=f193c11c5017195f8177d7c27d39aa21; sid_tt=60f72758d6d2603d2d628358fd17e39a; sso_login_status=1; sid_guard=\"60f72758d6d2603d2d628358fd17e39a|1520217780|15552000|Sat\054 01-Sep-2018 02:43:00 GMT\"; sessionid=832406a591cad591b287e08835b0e334; uid_tt=ee00c2f59a85a6010cd9cdc2617aa649; CNZZDATA1259612802=1942126919-1519797072-%7C1520214279; __tasessionId=cp397gs231520217794849; utm_source=toutiao";
        $header=config('header.header');
        $header = array_merge_recursive($header,array("Referer:".$articleLink));
        /*$header = array_merge_recursive($header,array($cookie));*/
        $dongtai_id=number_format($input['dongtai_id'],0,'','');
        $id=number_format($input['articleId'],0,'','');
        $data="comment_id=$dongtai_id&dongtai_id=$dongtai_id&group_id=$id&item_id=$id&action=digg";
        $ret = $this->curl_post($header, $data,$url);
        echo $ret;
    }
}
