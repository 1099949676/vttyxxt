<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WArticleController extends Controller
{

    /**
     * 发布头条
     */
    public function publishWeiTouTiao()
    {
        $header=array();
        //var_dump($header);exit;
        $url = config('tt_link.publishLink') ;
        $content="一个美好的一天";
        $data="content=$content&image_uris=";
        $ret = $this->curl_post($header, $data,$url);
        echo $ret;
    }

}
