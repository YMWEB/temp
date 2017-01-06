requirejs(['jquery'],function($){
	var imgWidth,bannerHeight,img,host = location.host,server;
	if(host.indexOf('-stg')>0){
		 server = '/pf-stg/'
	}else{
		server = '/pf/'
	}
	var localhost = 'http://'+host + server;
	var mediahost = localhost +'pub/media/wysiwyg/Home/';
	var size = mediahost+'P1_banner_black';
	var gifbanner =mediahost+'gif_banner.gif';
	var sessionAva = false;

	function goldSiverClick(img,imgWidth,host){
		img.addEventListener('click',function(e){
			var event = e?e:window.event;
			var x= event.clientX;
			var goldhtml =localhost+"wechat/gold.html";
			var silverhtml =localhost + "wechat/silver.html";
			if(x<imgWidth/2){
				window.location.replace(goldhtml)
			}else{
				window.location.replace(silverhtml)
			}
		})
	}

/*	function showWelcome(){
		var welcomePos = $('.bannerimg').height();
		var offsetPos ='-'+ welcomePos/100 *8 +'px';
		$('.welcome').css({
			top:offsetPos
		})
		$('.welcome').show();
	}	

	function mediaQuery(obj){
		if(screen.width < 400){
			return obj + '_640.jpg'
		}else if(screen.width<750){
			return obj + '_750.jpg'
		}else{
			return obj +'_1080.jpg'
		}
	}	*/
	function calcHeight(obj){
		return $(obj).height();
	}

	function showGif(bannerHeight){
		var gifbannerPtg = bannerHeight*0.33
		$('.gifbanner').css('top',gifbannerPtg)	
		$('.gifbanner').show()
	}
    /** Banner is too big **/
	function showBanner(){
			bannerHeight = calcHeight($('.banner').find('img'))
			while(!bannerHeight>0){
				bannerHeight = calcHeight($('.banner').find('img'))
			}
			var timestamp = new Date().valueOf()

			if(sessionAva==='true'){
				gifbanner = gifbanner+'?'+timestamp;
			}
			$('.gifbanner').attr('src',gifbanner)
			showGif(bannerHeight)		
	}

	function showDetailinit(){
		var _viewportHeight = window.innerHeight;
		$("#godetail").on('click',function(){
			if($("#detail").hasClass('displaynone')){
					$("#detail").removeClass('displaynone');
					var imgs = $("#detail").find("img.detail");
					$.each(imgs,function(i,item){
						$(item).attr("src",$(item).attr('data-ori'))
					})
					window.scrollTo(0,_viewportHeight+100)				
					var img = document.getElementById("goldsilver");
					var imgWidth=img.width;
					goldSiverClick(img,imgWidth,host)
				}
		})
	}

	function detectOritation(){
		window.addEventListener('resize',function(){
			img = document.getElementById("goldsilver");
			imgWidth = img.width;
			goldSiverClick(img,imgWidth,host)
			bannerHeight = calcHeight($('.banner').find('img'))
			showGif(bannerHeight)
		})
	}

	 $(document).ready(function(){

	 	if(typeof(Storage)=="undefined"){
	 		sessionAva = 'true'; 
	 	}else if(sessionStorage.getItem('sessionAva')!==null){
	 		sessionAva = 'false';
	 	}else{
	 		sessionStorage.setItem('sessionAva','true')
	 		sessionAva = 'true'
	 	}	
        showBanner();
	 	detectOritation();
	  	showDetailinit();	  		
	})
})
