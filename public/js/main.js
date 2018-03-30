function getAjaxData(url,param){
    $.ajax({
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
    });
}