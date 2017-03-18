String.prototype.template = function(dom) {
	var target=this;
	//target=target.replace(/\s/g,'');
	target=target.replace(/[\r\n]/g,'');
	/*if(target.indexOf('lsm-repeat')>-1){
		var repeatArrString=target.match(/(lsm-repeat=)(["]|[']){1}([^\'\"]*)(["]|[']){1}/g)[0];
		var repeatArrStr=eval(repeatArrString.substr(12).slice(0,-1));
		var arrNew=target.split(/[{]{2}[a-zA-Z1-9\$._#-]*[}]{2}/g);
		var data=target.match(/([{]{2})([a-zA-Z1-9\$._#-]*)([}]{2})/g);
		var dataNew=[],startIndex,endIndex;
		arrNew.forEach(function(value,index){
			if(value.indexOf('lsm-repeat')>-1){
				startIndex=index;
			}else if(value.indexOf('lsm-end')>-1){
				endIndex=index;
			}
		});
		console.log(startIndex,endIndex);return;

		dataNew=data.map(function(value,index){
			var value=value.substr(2).slice(0,-2);
			var strArr=value.split('.');
			var string='';
			var len=strArr.length;
			if(index==startIndex||((endIndex-index)==1)){
				var innerObj=repeatArrStr,repeatStr='';
				innerObj.forEach(function(val,i){
					for(var i=0;i<len;i++){
						if(val[strArr[i]]==undefined)return;
						val=val[strArr[i]];
					};
					repeatStr=val;
				})
				return;
			}else{
				var innerObj=eval(strArr[0]);
				for(var i=1;i<len;i++){
					if(innerObj[strArr[i]]==undefined)return;
					innerObj=innerObj[strArr[i]];
				};
				string=innerObj;
				return string;
				}
			
		});


		return;
	}*/
	if(target.indexOf('lsm-repeat')>-1){
		var repeatArrString=target.match(/(lsm-repeat=)(["]|[']){1}([^\'\"]*)(["]|[']){1}/g)[0];
		var repeatArr=eval(repeatArrString.substr(12).slice(0,-1));
		var wholeHtml="";
		repeatArr.forEach(function(val){
			var arrNew=target.split(/[{]{2}[a-zA-Z1-9\$._#-]*[}]{2}/g);
			var data=target.match(/([{]{2})([a-zA-Z1-9\$._#-]*)([}]{2})/g)
			var dataNew=[];
			dataNew=data.map(function(value){

				var value=value.substr(2).slice(0,-2);
				var strArr=value.split('.');
				var string='';
				var len=strArr.length;
				if(strArr.length==1&&strArr[0]==''){
					string=val;
				}else{
					var innerObj=val[strArr[0]];
					for(var i=1;i<len;i++){
						//if(innerObj[strArr[i]]==undefined)return;
						innerObj=innerObj[strArr[i]];
						
					};
					string=innerObj;
				};
				return string;
			});
			var html='';
				len=dataNew.length;
			for(var j=0;j<len;j++){
				html+=arrNew[j]+dataNew[j];
			}
			html+=arrNew[j];
			;(function(){
				if(html.indexOf('lsm-inrepeat')>-1){
				var inrepeat=html.split(/[<]{1}[^<]*[l]{1}[s]{1}[m]{1}[-]{1}[i]{1}.*[e]{1}[n]{1}[d]{1}[-]{1}[i]{1}[^>]*[>]{1}/g);
				var inrepeatTargetStr=html.match(/[<]{1}[^<]*[l]{1}[s]{1}[m]{1}[-]{1}[i]{1}.*[e]{1}[n]{1}[d]{1}[-]{1}[i]{1}[^>]*[>]{1}/g)[0];
				var inrepeatTargetArr=inrepeatTargetStr.match(/(lsm-inrepeat=)(["]|[']){1}([^\'\"]*)(["]|[']){1}/g)[0];
				var inrepeatObjStr=inrepeatTargetArr.substr(14).slice(0,-1);
				var inrepeatArr=inrepeatTargetStr.split(/[\[]{2}[a-zA-Z1-9\$._#-]*[\]]{2}/g);
				var inrepeatString='';
				val[inrepeatObjStr].forEach(function(list){
					inrepeatString +=inrepeatArr[0]+list+inrepeatArr[1];
				})
				html=inrepeat[0]+inrepeatString+inrepeat[1];
			};
			})()
			
			wholeHtml+=html;
		});

		
		if(dom){
			dom.innerHTML=wholeHtml;
		}else {
			return wholeHtml;
		}

		return;
}
	var arrNew=target.split(/[{]{2}[a-zA-Z1-9\$._#-]*[}]{2}/g);
	var data=target.match(/([{]{2})([a-zA-Z1-9\$._#-]*)([}]{2})/g)
	var dataNew=[];
	dataNew=data.map(function(value){
		var value=value.substr(2).slice(0,-2);
		var strArr=value.split('.');
		var string='';
		var len=strArr.length;
		var innerObj=eval(strArr[0]);
		for(var i=1;i<len;i++){
			if(innerObj[strArr[i]]==undefined)return;
			innerObj=innerObj[strArr[i]];
		};
		string=innerObj;
		return string;
	});
	var html='',
		len=dataNew.length;
	for(var j=0;j<len;j++){
		html+=arrNew[j]+dataNew[j];
	}
	html+=arrNew[j];
	if(dom){
		dom.innerHTML=html;
	}else {
		return html;
	}
};