/* 处理下载函数
*  针对微信、ios、android提供不同的显示方式,微信弹框提示,android、ios提供对应链接与apple store
 */
;(function($){

	/*浏览器检测*/
	$.bw=function(){
			var bw=navigator.userAgent;
			//判断所有移动端
			function isMobile(){
				return /AppleWebKit.*Mobile/i.test(bw) || /MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/i.test(bw);
			}
			//判断是否微信
			function isWeixin(){
				return /MicroMessenger/i.test(bw);
			}

			//判断是否安卓
			function isAndroid(){
				return /Android/i.test(bw);
			}

			//判断是否苹果
			function isIOS(){
				return /iPhone|iPod|iPad/i.test(bw);
			}

			return {
					mobile:isMobile(),
					ios:isIOS(),
					android:isAndroid(),
					weChat:isWeixin()
			}

		}

	/*下载*/
	$.fn.download=function(opt){
		var defaults = {
			maskId: '#overlay', // 微信遮罩提示
			maskImgUrl : 'img/open_weixin.png' // 默认提示图片路径
		}
		opt = $.extend(defaults,opt || {});

		var bw=$.bw();
		var downBtn=$(this);
		var oMask=$(opt.maskId);

		oMask.on('touchmove',function(e){ // 满屏遮罩,并且禁止滑动
			e.preventDefault();
		});

		if(bw.weChat){//微信浏览器
			createTips();
			downBtn.attr('href','javascript:void(0);');
			downBtn.on('click',function(e){
				if(bw.weChat){
					e.preventDefault();
					showMask();
				}
			});
			oMask.on('click',hideMask);
		}
		else {
			if(bw.ios){
				downBtn.attr('href',downBtn.data('ios'));	
			}
			else if(bw.android){
				downBtn.attr('href',downBtn.data('android'));	
			}
			else {
				downBtn.attr('href',downBtn.data('android'));	
			}
		}

		function showMask(){
			oMask.show();
		}
		function hideMask(){
			oMask.hide();
		}
		function createTips(){
			var img=new Image();
			img.src=opt.maskImgUrl;
			$(img).on('load error',function(){
				oMask.append($(img));
			});
		}
	};


})(Zepto);