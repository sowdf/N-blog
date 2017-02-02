(function(){
    var $uplaod = $('#j-uploadImage');
    var file = '';
    $uplaod.on('click',function(){
        //页面层-自定义
        layer.open({
            type: 1,
            skin: 'layui-layer-rim', //加上边框
            area: ['420px', '240px'], //宽高
            content: '<div class="ibox-content text-center"><input type="file" name="file" id="j-uploadFile"><button class="btn btn-w-m btn-primary" id="j-uploadImage">提交</button><div class=""ibox-content "><span>url:</span><input type="text" class="form-control" id="j-imageUrl"></div></div>'
        });

  /*      $(document).on('change','#j-uploadFile',function(e){
            file = $(this).get(0).files[0];
            console.log($(this).get(0).files);
        });
        $(document).on('click','#j-uploadImage',function(){
            $.ajax({
                url : '/api/upload/post',
                type : 'post',
                dataType : 'JSON',
                data : {
                    file : file
                },
                success : function(res){
                    console.log(res);
                }
            })
        });*/

    });
    $(document).on('click','#j-uploadImage',function(){
        uploadFile();
    });
    function uploadFile(){
        var file = document.getElementById("j-uploadFile");
        var formData = new FormData();
        formData.append('file',file.files[0]);
        $.ajax({
            url: '/api/upload/post',
            type: 'POST',
            data: formData,
            // async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function(data){
                layer.msg(data.message);
                if(!data.code){
                    $('#j-imageUrl').val(data.url);
                }
            }
        });
    }

    /*function postPage() {
        var upload = document.getElementById('j-uploadImage');
        upload.addEventListener("click",uploadFile,false);
    }*/

})();