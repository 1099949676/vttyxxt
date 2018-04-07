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
    return view('home');
});

Route::get('/intro', function(){
    return view('welcome');
});


Route::get('/user/login', function(){
    return view('login/index');
});

//首页
Route::get('/user/index', function(){ return view('user/index');});

//点赞
Route::get('/user/like', function(){$data['tabName']='like';return view('user/like',$data);});

//左边导航
Route::get('/user/left', function(){return view('user/left');});

//我的关注列表
Route::get('/user/following', function(){$data['tabName']='following';return view('user/following',$data);});

//我的微头条


Route::get('/welcome', function () {return view('welcome');});

Route::post('/user/getArticleComments','CommentController@getArticleComments');

Route::get('/user/getArticleComments','CommentController@getArticleComments');

Route::get('/user', 'UserController@index');

Route::get('/click', 'UserController@click');

Route::get('/user/startLike', 'LikeController@startLike');

Route::get('/user/publishWeiTouTiao', 'WArticleController@publishWeiTouTiao');

Route::get('/user/crawler', 'UserController@crawler');

Route::get('/user/getMyFollowing', 'FollowingController@getMyFollowing');

Route::get('/user/getUserArticle', 'ArticleController@getUserArticle');

Route::get('/user/commentArticle', 'ArticleController@commentArticle');

Route::get('/user/getImgCode', 'LoginController@getImgCode');

Route::get('/user/getTouTiaoLoginIndex', 'LoginController@getTouTiaoLoginIndex');

Route::get('/user/getCode', 'LoginController@getCode');


Route::get('/user/quickLogin', 'LoginController@quickLogin');


Route::get('/cookie', function(){
    return view('cookie');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
