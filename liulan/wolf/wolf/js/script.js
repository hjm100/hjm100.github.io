// JavaScript Document
$(function(){
	/*主页动画*/
	
	function id1Start(){
		$('.zuhe1').addClass('zuhe1a');
		$('.zuhe2').addClass('zuhe2a');
		$('.logo').addClass('showob');
		$('.wolfhead').addClass('disappear3');
		//setTimeout(function(){$('.wolfhead')({'opacity':'1'});},200);
	}
	
	function id2Start(){
		$('#'+$.getUrlParam('whichId')+'_').css({'opacity':'1','z-index':'10'});
	}
	/*横竖屏切换*/
	function roScreen(){
		var body_=document.getElementsByTagName('body')[0];
		var html_=document.getElementsByTagName('html')[0];
		var WB = document.documentElement.clientWidth,
        HB = document.documentElement.clientHeight;
		body_.style.width = (HB < WB ? WB : HB )+'px';
    	body_.style.height = (HB < WB ? HB : WB) +'px';
		/*html_.style.width = WB+'px';
    	html_.style.height = HB+'px';*/
		if(WB>HB){
			$('body').css({'transform':'rotate(0)','-webkit-transform':'rotate(0)','left':'0'});
			$('body').attr('hs','1');
		}else{
			$('body').css({'transform':'rotate(90deg)','-webkit-transform':'rotate(90deg)','left':WB+'px'});
			$('body').attr('hs','0');
		}
	}
	window.addEventListener('resize',function(){
		roScreen();
	});
	roScreen();
	/*覆盖的滚动条*/
	var barC,barL;
	barC=$('.barCover img');
	barC.addClass('nowleft1');
	/*whichId参数获取*/
	$.getUrlParam = function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return r[2];
            return null;
        }
	$("body").queryLoader2({
			barColor: "#000",
			backgroundColor: "rgba(0,0,0,0)",
			percentage: false,
			barHeight: 0,
			completeAnimation: "fade",
			minimumTime: 1000,
			onComplete: function(){
				barC.removeClass('nowleft1').addClass('nowleft2');
				setTimeout(function(){
					$('.backText').fadeOut(500);
				},500);
				
				if( $.getUrlParam('whichId')!='' && $.getUrlParam('whichId')!= null){
					setTimeout(function(){
						id2Start();
					},800);
				}else{
					setTimeout(function(){
						id1Start();
					},1500);
				}	
				roScreen();
				
			}
		});
	
	var touchsX,touchsY;
	var toucheX,toucheY;
	$('#wolfindex').bind('touchstart',touchStart);
	$('#wolfindex').bind('touchmove',touchMove);
	$('#wolfindex').bind('touchend',touchEnd);
	function touchStart(){
		event.preventDefault();
		touchsX=event.touches[0].pageX;
		touchsY=event.touches[0].pageY;
	}
	function touchMove(){
		toucheX=event.touches[0].pageX;	
		toucheY=event.touches[0].pageY;
	}
	function touchEnd(){
		if(toucheX-touchsX<-10||toucheY-touchsY<-10){
			var self_=$(this);
			self_.addClass('scale1');
			setTimeout(function(){
				self_.addClass('nowleft');
			},800);
			
			
			
			var tabc1=$('.tabc:eq(1)');
			
			/*tabc1.addClass('cur');
			tabc1.find('.tabc_div').addClass('translateX1');
			tabc1.find('.slideback').addClass('translateX2');
			tabc1.find('.wolftit1').addClass('disappear');
			tabc1.find('.btnwolf').addClass('drop');*/
			setTimeout(function(){
				self_.removeClass('cur');
				tabc1.addClass('cur');
			},1800);
			tabc1.addClass('drop2');
			tabc1.find('.btnwolf').addClass('drop_');
		
		}
	}
	/*答题页*/
	var $btnwolf=$('.btnwolf');
	var answer={} //记录答案
	$btnwolf.click(function(){
		
		var $tabc=$(this).parent().parent();
		var index=$tabc.index();
		var $tabc1=$('.tabc:eq('+(index+1)+')');
		
		var answerIndex=$(this).index()-2;
		answer[index-1]=answerIndex;
		console.log((index-1)+','+answer[index-1]);
		$tabc.removeClass('drop2');
		if(index>5){
			$(this).addClass('scale1');
			$tabc.addClass('rotate');
			$("#whichId").val(answer[1]);
			
			setTimeout(function(){
				$tabc.removeClass('cur');
				$('#'+answer[1]).removeClass('xiaoshi').addClass('show');
			},2300)
		}else{
			$(this).removeClass('drop_').addClass('scale1');
			$tabc.find('.tabc_div').removeClass('translateX1').addClass('translateX3');//大框向左滑走
			$tabc.find('.slideback').removeClass('translateY').addClass('translateY1');//背景向下滑走
			setTimeout(function(){
				$tabc.removeClass('cur');
			},2000);
			
			$tabc1.find('.startClick').addClass('disappear2_');
			$tabc1.find('.clickself').addClass('disappear2');
			$tabc1.addClass('cur');
			setTimeout(function(){$tabc1.find('.wolf1').css('opacity','1');},2400);
			setTimeout(function(){$tabc1.find('.wolf2').css('opacity','1');},2700);
			setTimeout(function(){$tabc1.find('.wolf3').css('opacity','1');},3000);
			setTimeout(function(){$tabc1.find('.wolf4').css('opacity','1');},3300);
			
			$tabc1.find('.tabc_div').addClass('translateX1');//大框从右滑过来
			$tabc1.find('.slideback').addClass('translateY');//背景从上滑下来	
		}	
	});
	$('.clickself').click(function(){
		$(this).removeClass('disappear2').addClass('xiaoshi');
		$('.startClick').removeClass('disappear2_').addClass('xiaoshi');
	});
	$('.callf').click(function(){
		
		$('.startClick1').removeClass('xiaoshi').addClass('show1');
		$('.clickh').removeClass('xiaoshi').addClass('show');
		$('.clickh1').removeClass('xiaoshi').addClass('show');
	});
	$('.again').click(function(){
		$('#4').removeClass('show').addClass('xiaoshi');
		$('.startClick1').removeClass('show1').addClass('xiaoshi');
		$('.clickh').removeClass('show').addClass('xiaoshi');
		$('.clickh1').removeClass('show').addClass('xiaoshi');
		
		$('.tabc:last').removeClass('cur rotate');
		$('.tabc:eq(2)').addClass('cur');
		
		$('.startClick').removeClass('xiaoshi'); 
		$('.clickself').removeClass('xiaoshi'); 
		$('.slideback').removeClass('translateY1'); 
		$('.tabc_div').removeClass('translateX3');
		$('.btnwolf').removeClass('scale1');
	});
	$('.fb').click(function(){
		//var parent=$(this).parent().parent().parent()

		$('#'+$.getUrlParam('whichId')+'_').css({'z-index':'-10','opacity':'0'});
		id1Start();
	});
	$('.startClick1').click(function(){
		$(this).removeClass('show1').addClass('xiaoshi');
		$('.clickh').removeClass('show').addClass('xiaoshi');
		$('.clickh1').removeClass('show').addClass('xiaoshi');
	});
})
	

