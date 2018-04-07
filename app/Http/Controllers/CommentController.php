<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * 获取文章的评论
     */
    function getArticleComments()
    {
        $input=request()->all();
        $articleId=$input['input_like_link_id'];
        $pageStart=$input['input_like_pageStart'];
        $pageSize=$input['input_like_pageSize'];
        $url="https://www.toutiao.com/api/comment/list/?group_id=".$articleId."&item_id=".$articleId."&offset=$pageStart&count=$pageSize";
        $ret = $this->curl_get($url);
        echo $ret;
    }
}
