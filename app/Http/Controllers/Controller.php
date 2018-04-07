<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * @param $header 请求头部
     * @param $data   请求主体
     * @param $url    请求地址
     * @param null $storeCookieFile  存储cookie到这个位置
     * @param null $useCookieFile    使用这个位置的cookie
     * @param null $otherUseCookieFile 其他的补充cookie
     * @return int|mixed
     */
    protected  function curl_post($header,$data,$url,$storeCookieFile=null,$useCookieFile=null,$otherUseCookieFile=null)
    {
        if(!$useCookieFile){
            $useCookieFile=dirname(__FILE__).'/maincookie.txt';
        }


        $ch = curl_init();

        if($storeCookieFile){
            //存储cookieFile
            curl_setopt($ch, CURLOPT_COOKIEJAR,  $storeCookieFile);

        }

        if($useCookieFile){
            curl_setopt($ch, CURLOPT_COOKIEFILE, $useCookieFile);
        }

        if($otherUseCookieFile){
            curl_setopt($ch, CURLOPT_COOKIEFILE, $otherUseCookieFile);
        }

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
     * @param $url  请求的url
     * @param null $header  请求的头部
     * @param null $storeCookieFile 存储cookie到这个位置
     * @param null $useCookieFile   使用这个位置的cookie
     * @return mixed
     */
    protected function curl_get($url,$header=null,$storeCookieFile=null,$useCookieFile=null)
    {
        /* if(!$useCookieFile){
             $useCookieFile=dirname(__FILE__).'/maincookie.txt';
         }*/
        $curl = curl_init(); // 启动一个CURL会话

        if($header){
            curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
        }

        if($storeCookieFile){
            //存储cookieFile
            curl_setopt($curl, CURLOPT_COOKIEJAR,  $storeCookieFile);

        }

        if($useCookieFile){
            curl_setopt($curl, CURLOPT_COOKIEFILE, $useCookieFile);
        }

        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_HEADER, 0);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE); // 跳过证书检查
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);  // 从证书中检查SSL加密算法是否存在
        $tmpInfo = curl_exec($curl);     //返回api的json对象
        curl_close($curl);
        return $tmpInfo;
    }



    /**
     * @param $cookie
     * @return string 字符串格式化为cookie字符串
     */
    protected function attayToStringCookie($cookie){
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


    /**
     * @param $data
     * @return string 数组对象格式化为字符串
     */
    protected function arrayToStringParam($data){
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
