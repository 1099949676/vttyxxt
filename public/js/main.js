function getAjaxData(url,param){

    $.get(url,param,function(data){
        return data;
    });



    /*$.ajax({
        url:url,
        async:false,
        data:param,
        dataType:'json',
        type:'get',
        success:function(data){
            return data;
        },error:function(){
            return null;
        }
    });*/
}