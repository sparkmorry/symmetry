var jQinput=$("#name");
$("#preview").bind('click', function(){
	var name = jQinput.val();
	var id = $(this).data('id');
	if(name.length>0){
		$.post('/api/author/', {
			id: id,
			author: name
		}, function(ret){
			if(ret.code==0){
				alert("上传成功!");
				window.location.href="/play/"+ret.data+"/";
			}else{
				alert(ret.msg)
			}
		})
	}else{
		alert("请输入您的姓名或昵称")
	}
})