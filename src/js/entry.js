
'use strict';

var html=require('../index'),//just for the hot replace
topHtml=require('../template/top'),
workExperienceHtml=require('../template/workExperience'),
frontEndHtml=require('../template/frontEnd'),
otherSkillHtml=require('../template/otherSkill'),
projectHtml=require('../template/project'),
topcss=require('../css/resume'),
resume=require('../json/resume');


String.prototype.template = function(dom) {
	var target=this,
	wholeHtml='';
	target=target.replace(/[\r\n]/g,'');
	if(target.indexOf('lsm-repeat')>-1){
		var repeatArrString=target.match(/(lsm-repeat=)(["]|[']){1}([^\'\"]*)(["]|[']){1}/g)[0],//repeat Obj string
			repeatArr=eval(repeatArrString.substr(12).slice(0,-1)),// repeat Array
			arrNew=target.split(/[{]{2}[a-zA-Z1-9\$._#-]*[}]{2}/g),//get the string except the string in the {{}}
			data=target.match(/([{]{2})([a-zA-Z1-9\$._#-]*)([}]{2})/g),// the string in the {{}} 
			dataNew=[];//resume.skill to [resume,skill]

			repeatArr.forEach(function(val){
				dataNew=data.map(function(value){
				var value=value.substr(2).slice(0,-2),//{{resume.skill}} to resume.skill
					strArr=value.split('.'),//resume.skill to [resume,skill]
					string='',//save the obj.value
					len=strArr.length;
					if(strArr.length==1&&strArr[0]==''){
					string=val;// if the item in the arr is just a string;
				}else{
					var innerObj=val[strArr[0]];
					try{
						for(var i=1;i<len;i++){
							innerObj=innerObj[strArr[i]];
							
						};
					}catch(err){
						innerObj=undefined;
						alert('your Object has something wrong');
					}
					
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
						var inrepeat=html.split(/[<]{1}[^<]*[l]{1}[s]{1}[m]{1}[-]{1}[i]{1}.*[e]{1}[n]{1}[d]{1}[-]{1}[i]{1}[^>]*[>]{1}/g),
						inrepeatTargetStr=html.match(/[<]{1}[^<]*[l]{1}[s]{1}[m]{1}[-]{1}[i]{1}.*[e]{1}[n]{1}[d]{1}[-]{1}[i]{1}[^>]*[>]{1}/g)[0],
						inrepeatTargetArr=inrepeatTargetStr.match(/(lsm-inrepeat=)(["]|[']){1}([^\'\"]*)(["]|[']){1}/g)[0],
						inrepeatObjStr=inrepeatTargetArr.substr(14).slice(0,-1),
						inrepeatArr=inrepeatTargetStr.split(/[\[]{2}[a-zA-Z1-9\$._#-]*[\]]{2}/g),
						inrepeatString='';
						val[inrepeatObjStr].forEach(function(list){
							inrepeatString +=inrepeatArr[0]+list+inrepeatArr[1];
						})
						html=inrepeat[0]+inrepeatString+inrepeat[1];
					};
				})()
				
				wholeHtml+=html;
			});
		}else{
			var arrNew=target.split(/[{]{2}[a-zA-Z1-9\$._#-]*[}]{2}/g),
			data=target.match(/([{]{2})([a-zA-Z1-9\$._#-]*)([}]{2})/g),
			dataNew=[];
			dataNew=data.map(function(value){
				var value=value.substr(2).slice(0,-2),
				strArr=value.split('.'),
				string='',
				len=strArr.length,
				innerObj=eval(strArr[0]);
				try{
					for(var i=1;i<len;i++){
						innerObj=innerObj[strArr[i]];
					};
				}catch(err){
					innerObj=undefined;
					alert('your Object has something wrong');
				};
				
				string=innerObj;
				return string;
			});
			for(var j=0,len=dataNew.length;j<len;j++){
				wholeHtml+=arrNew[j]+dataNew[j];
			}
			wholeHtml+=arrNew[j];
		};
		
		if(dom){
			dom.innerHTML=wholeHtml;
		}else {
			return wholeHtml;
		}
	};

	topHtml.template(document.getElementById('top'));
	workExperienceHtml.template(document.getElementById('workList'));
	frontEndHtml.template(document.getElementById('frontEnd'));
	otherSkillHtml.template(document.getElementById('otherSkill'));
	projectHtml.template(document.getElementById('projectList'));

	document.getElementById('body').style.display="block";

