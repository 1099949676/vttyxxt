<?php


namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Symfony\Component\DomCrawler\Crawler;

class UserController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';


    private  $useragent='Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36';

    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }



    /*
     * 提交请求
    * @param $header array 需要配置的域名等header设置 array("Host: devzc.com");
    * @param $data string 需要提交的数据 'user=xxx&qq=xxx&id=xxx&post=xxx'....
    * @param $url string 要提交的url 'http://192.168.1.12/xxx/xxx/api/';
    */
    function curl_post($header,$data,$url)
    {
        $ch = curl_init();
        $res= curl_setopt ($ch, CURLOPT_URL,$url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt ($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch,CURLOPT_HTTPHEADER,$header);
        $result = curl_exec ($ch);
        curl_close($ch);
        if ($result == NULL) {
            return 0;
        }
        return $result;
    }

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
        $header = array_merge_recursive($header,array($cookie));
        $dongtai_id=number_format($input['dongtai_id'],0,'','');
        $id=number_format($input['articleId'],0,'','');
        $data="comment_id=$dongtai_id&dongtai_id=$dongtai_id&group_id=$id&item_id=$id&action=digg";
        $ret = $this->curl_post($header, $data,$url);
        echo $ret;
    }

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

    function curl_get($url)
    {
        $curl = curl_init(); // 启动一个CURL会话
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_HEADER, 0);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false); // 跳过证书检查
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);  // 从证书中检查SSL加密算法是否存在
        $tmpInfo = curl_exec($curl);     //返回api的json对象
        curl_close($curl);
        return $tmpInfo;
    }

    /**
     * 首页
     */
    public function index()
    {
        //$this->click();exit;
        return view('user/index');
    }

    /**
     * 发布头条
     */
    public function publishWeiTouTiao()
    {
        $header=array();
        $cookie="Cookie:uuid=\"w:39c570c50a904f3b8909c35bf8f8a451\"; _ga=GA1.2.994153727.1519795917; UM_distinctid=161dae559f5b8-0f27ae87081d6d-4542072c-15f900-161dae559f9359; WEATHER_CITY=%E5%8C%97%E4%BA%AC; __utma=24953151.994153727.1519795917.1519991363.1519991363.1; __utmz=24953151.1519991363.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); part=stable; cp=5A9A0B2261740E1; tt_webid=75159844822; _gid=GA1.2.1246399681.1519795917; tt_webid=75159844822; login_flag=f193c11c5017195f8177d7c27d39aa21; sid_tt=60f72758d6d2603d2d628358fd17e39a; sso_login_status=1; sid_guard=\"60f72758d6d2603d2d628358fd17e39a|1520217780|15552000|Sat\054 01-Sep-2018 02:43:00 GMT\"; sessionid=832406a591cad591b287e08835b0e334; uid_tt=ee00c2f59a85a6010cd9cdc2617aa649; CNZZDATA1259612802=1942126919-1519797072-%7C1520214279; __tasessionId=cp397gs231520217794849; utm_source=toutiao";
        $header = array_merge_recursive($header,array($cookie));
        //var_dump($header);exit;
        $url = config('tt_link.publishLink') ;
        $content="一个美好的一天";
        $data="content=$content&image_uris=";
        $ret = $this->curl_post($header, $data,$url);
        echo $ret;
    }

    public function getMyFollowing(){
        $input=request()->all();
        $url = config('tt_link.myFollow') ;
        $url=$url."?user_id=".$input['user_id']."&cursor=".$input['cursor']."&count=20&_signature=".$input['_signature'];
        $ret = $this->curl_get($url);
        echo  $ret;
    }

    /**
     * 获取用户文章
     */
    public function getUserArticle(){
        $input=request()->all();
        $url = config('tt_link.userArticle') ;
        $url.="?page_type=1&user_id=".$input['user_id']."&max_behot_time=".$input['max_behot_time']."&count=20&as=".$input['as']."&cp=".$input['cp']."&_signature=".$input['_signature']."";
        //echo $url;
        $ret = $this->curl_get($url);
        echo  $ret;
    }

    public  function commentArticle(){
        $input=request()->all();
        $data=$this->arrayToStringParam($input);
        $header=config('header.commentArticle');
        $cookie=config('cookie.cookie');
        $header=array();
        $cookie=$this->attayToStringCookie($cookie);
        //echo $cookie;exit;
        $header = array_merge_recursive($header,array($cookie));
        /*echo "<pre>";
            var_dump($header);
            echo $data;
        echo "</pre>";*/
        //$header=array();
        $url = config('tt_link.toutiaoComment') ;
        $ret = $this->curl_post($header, $data,$url);
        echo $ret;
    }

    private function attayToStringCookie($cookie){
        $count=count($cookie);
        $i=1;
        $string="Cookie:";
        foreach($cookie as $key=>$v){
            if($v){
                if($i==$count){
                    $string.=$key."=".$v;
                }else{
                    $string.=$key."=".$v."; ";
                }
            }
            $i++;
        }
        return $string;
    }

    private function arrayToStringParam($data){
        $i=0;
        $string="";
        foreach($data as $key=>$v){
            if($i==0){
                $string.=$key."=".$v;
            }else{
                $string.='&'.$key."=".$v;
            }
            $i++;
        }
        return $string;
    }

}
