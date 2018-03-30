<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function(){
    return view('welcome');
});

//首页
Route::get('/user/index', function(){
    return view('user/index');
});

//点赞
Route::get('/user/dianzan', function(){
    $data['tabName']='dianzan';
    return view('user/dianzan',$data);
});

//左边导航
Route::get('/user/left', function(){
    return view('user/left');
});


Route::get('/welcome', function () {
    return view('welcome');
});

Route::post('/user/getArticleComments','UserController@getArticleComments');

Route::get('/user/getArticleComments','UserController@getArticleComments');

Route::get('/user', 'UserController@index');

Route::get('/click', 'UserController@click');

Route::get('/user/startLike', 'UserController@startLike');

Route::get('/user/publishWeiTouTiao', 'UserController@publishWeiTouTiao');

Route::get('/user/crawler', 'UserController@crawler');

Route::get('/user/guanzhu', function(){
    $data['tabName']='guanzhu';
    return view('user/following',$data);
});

Route::get('/user/getMyFollowing', 'UserController@getMyFollowing');

Route::get('/user/getUserArticle', 'UserController@getUserArticle');

Route::get('/user/commentArticle', 'UserController@commentArticle');


Route::get('/cookie', function(){
    return view('cookie');
});


