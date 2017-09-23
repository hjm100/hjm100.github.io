$(function(){
    //头部导航js部分
    //送货至
    $('.f1').hover(function(){
        $('.f1 ul').show()
        $('.f1').css('background','#fff')
    },function(){
        $('.f1 ul').hide()
        $('.f1').css('background','#eee')
    })
    $('.f1 ul li a').click(function(){
        $('.f1-text').text($(this).text())
        $('.f1-text-sun li a').removeClass('flist')
        $(this).addClass('flist')
    })
    //我的京东
    $('#ttbar-myjd').hover(function(){
        $('#ttbar-myjd .dt a').css('color','#b61d1d')
        $('#ttbar-myjd .dt').css('background','#fff')
        $('#ttbar-myjd .dd').show()
    },function(){
         $('#ttbar-myjd .dt a').css('color','#666')
         $('#ttbar-myjd .dt').css('background','#eee')
         $('#ttbar-myjd .dd').hide()
    })
    //手机京东
    $('#ttbar-apps').hover(function(){
        $('#ttbar-apps .dt a').css('color','#b61d1d')
        $('#ttbar-apps .dt').css('background','#fff')
        $('#ttbar-apps .dd').show()
    },function(){
         $('#ttbar-apps .dt a').css('color','#666')
         $('#ttbar-apps .dt').css('background','#eee')
         $('#ttbar-apps .dd').hide()
    })
    //关注京东
    $('#ttbar-atte').hover(function(){
        $('#ttbar-atte .dt a').css('color','#b61d1d')
        $('#ttbar-atte .dt').css('background','#fff')
        $('#ttbar-atte .dd').show()
    },function(){
         $('#ttbar-atte .dt a').css('color','#666')
         $('#ttbar-atte .dt').css('background','#eee')
         $('#ttbar-atte .dd').hide()
    })
    //客服服务
    $('#ttbar-serv').hover(function(){
        $('#ttbar-serv .dt a').css('color','#b61d1d')
        $('#ttbar-serv .dt').css('background','#fff')
        $('#ttbar-serv .dd').show()
    },function(){
         $('#ttbar-serv .dt a').css('color','#666')
         $('#ttbar-serv .dt').css('background','#eee')
         $('#ttbar-serv .dd').hide()
    })
    //网站导航
        $('#ttbar-navs').hover(function(){
        $('#ttbar-navs .dt a').css('color','#b61d1d')
        $('#ttbar-navs .dt').css('background','#fff')
        $('#ttbar-navs .dd').show()
    },function(){
         $('#ttbar-navs .dt a').css('color','#666')
         $('#ttbar-navs .dt').css('background','#eee')
         $('#ttbar-navs .dd').hide()
    })

    //头部banner图隐藏
    $('.header-img a span').click(function(){
        $('.header-img').hide()
    })

//导航部分
// for(var j=0;j<$('#categorys .dd .item').length();j++){
//     $index=$(this).index
//     $($index).hover(function(){
//         $(this).eq(i).className('item')
//         $(this).className('item corrent')
//         for(var i=0;i<$('#categorys .dorpdown-layer .item-sub').length();i++){
//             $('#categorys .dorpdown-layer .item-sub')[j].css('display','none')
//         }
//          $('#categorys .dorpdown-layer .item-sub')[$(this).index].css('display','block')
//     })
// }

//隐藏的子导航
$('#categorys .dd .item').hover(function(){
		$index = $(this).index()
        $(this).addClass('corrent').siblings().removeClass('corrent')
		$('#categorys .dorpdown-layer .item-sub').eq($index).css('display','block')
	},function(){
		$('#categorys .dorpdown-layer .item-sub').eq($index).css('display','none')
	})
    
	$('#categorys .dorpdown-layer .item-sub').hover(function(){
		$index = $(this).index()
		$('#categorys .dorpdown-layer .item-sub').eq($index).css('display','block')
	},function(){ 
        $('#categorys .dd .item').eq($index).removeClass('corrent')
		$('#categorys .dorpdown-layer .item-sub').eq($index).css('display','none')
	})



//轮播图
	var i = 0
	var timer
	function autoPlay(index){
		if(index==0) i=0
		i = index || i
		$('#banner .slider-panel').eq(i).fadeIn().siblings().hide()
		$('#banner .slider-nav li').eq(i).addClass('on').siblings().removeClass('on')
		i++
		if(i >= $('#banner .slider-panel').length) i=0
	}
	function play(){
		timer = setInterval(autoPlay,3000)
	}
	$('#banner').hover(function(){
		clearInterval(timer)
		$('#banner .slider-prev').css('display','block')
		$('#banner .slider-next').css('display','block')
	},function(){
		play()
		$('#banner .slider-prev').css('display','none')
		$('#banner .slider-next').css('display','none')
	})
	$('#banner .slider-nav li').hover(function(){
		$index = $(this).index()
		autoPlay($index)
	})
	$('#banner .slider-prev').click(function(e){
		i--
		if(i < 0) i = $('#banner .slider-panel').length-1
		$('#banner .inner').eq(i).fadeIn().siblings().hide()
		$('#banner .slider-nav li').eq(i).addClass('background','#B61D1D').siblings().removeClass('background','#666')
	})
	$('#banner .slider-next').click(function(e){
		if(i == $('#banner .slider-panel').length) i = 0 
		autoPlay(i)
	})


//无缝轮播
     var k=0
	$('#todays .slider-prev').click(function(){
        if( k == -3000){
             k=0
             $('#todays .slider-main').css('left',k+'px')
        }else{
            k-=1000
             $('#todays .slider-main').css('left',k+'px')
        }
	})
	$('#todays .slider-next').click(function(){
        if( k == 0){
            k=-3000
             $('#todays .slider-main').css('left',k+'px')
        }else{
             k+=1000
             $('#todays .slider-main').css('left',k+'px')
        }
	})


//今日推荐

$('#guessyou').hover(function(){
    $('#guessyou .mc .spacer i').css({
        'width':'0px',
        'right': '1210px',
        'top': '-2px'
    })
    $('#guessyou .mc .spacer i').animate({
        width:'365px',
        right: '-1px',
        top: '-2px'
    },1000)
},function(){
    $('#guessyou .mc .spacer i').css({
        'width':'365px',
        'right': '-1px',
        'top': '-2px'
    })
})



//服装鞋包
$('.floor .banner').hover(function(){
    $('.floor .side-inner .banner i').animate({
        left: '420px',
        top: '5px'
    },1000)
},function(){
        $('.floor .side-inner .banner i').css({
        left: '-160px',
        top: '0px'
    })
})



$('.tab-item').hover(function(){
		$index = $(this).index()
        $(this).addClass('tab-js').siblings().removeClass('tab-js')
		$('.floor .mc .floor-main').eq($index).css('display','block')
	},function(){
		$('.floor .mc .floor-main').eq($index).css('display','none')
	})
    
	$('.floor .mc .floor-main').hover(function(){
		$index = $(this).index()
		$('.floor .mc .floor-main').eq($index).css('display','block')
	},function(){ 
        $('.tab-item').eq($index).removeClass('corrent')
		$('.floor .mc .floor-main').eq($index).css('display','none')
	})
// 楼层轮播


$('.jd-trigger').hover(function(){
    $index = $(this).index()
    $(this).addClass('jd-hover').siblings().removeClass('jd-hover')
},function(){
    $(this).removeClass('jd-hover')
})

$('.jd-left .jd-trigger').click(function(e){ 
    e = e || window.e
    e.stopPropagation(e)
    $(this).animate({
        right: '0px'
    },function(){
    })
    $('.jd-wrap').animate({
        right: '270px'
    })
})
$('#jd-glbal').click(function(e){
    $('.jd-wrap').animate({
        right: '0px'
    })
})

//返回顶端

	$('.foot-top').click(function(){
		$(document).scrollTop(0)
	})

})