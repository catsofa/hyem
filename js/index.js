$(document).ready(function(){

    $('.slick').slick({

        dots : true, //페이지 네비게이션
        arrows : true, // next, prev 이동 버튼
        autoplay : false, // 자동 넘김 여부
        infinite : true, //반복설정
        speed: 1000, //슬라이드 속도
        autoplaySpeed : 3000, // 자동 넘김시 슬라이드 시간
        pauseOnHover : true,// 마우스 hover시 슬라이드 멈춤
        /*
        vertical : false, // 세로 방향 슬라이드 옵션
        prevArrow : "<button type='button' class='slick-prev'>Previous</button>",
        nextArrow : "<button type='button' class='slick-next'>Next</button>", //화살표 커스텀
        slidesToShow: 4, //보여질 슬라이드 수
        slidesToScroll: 4, //넘겨질 슬라이드 수
        responsive: [ // -> 반응형 옵션
            {
                breakpoint: 1024, // 반응형 ~ 1024
                settings: { 
                    slidesToShow: 3, 
                    slidesToScroll: 3, 
                    infinite: true, 
                    dots: true 
                } 
            }, { 
                breakpoint: 600,// 반응형 ~ 600
                settings: { 
                    slidesToShow: 2, 
                    slidesToScroll: 2
                }
            }, { 
                breakpoint: 480,// 반응형 ~ 480 
                settings: { 
                    slidesToShow: 1, 
                    slidesToScroll: 1 
                } 
            } 
        ] 
        */
    });

    //nav - side
    $('.btn_nav').on('click',function(){
        if( $('nav.side').hasClass('on') ){
        }else{
            $('nav.side').addClass('on');
        }        
    });

    $('nav.side .btn_close').on('click',function(){
        $('nav.side').removeClass('on');
    });

    //nav - click
    $('.gnb li > a').on('click',function(){
        $('html,body').animate({scrollTop:$(this.hash).offset().top - 100}, 500);
    });

    //nav - side - click
    $('.side li > a').on('click',function(){
        $('html,body').animate({scrollTop:$(this.hash).offset().top - 100}, 500);
        //setTimeout(function(){
            $('nav.side').removeClass('on');
        //},0);
        
    });

    // main skills progressbar
    if ( $('.progress-group').length ) { 
        var waypoint = new Waypoint({ element: $('.progress-group'),
            handler: function(direction) { animate_progress_bar(); }, offset: '100%' }); 
    }

    //footer
    $('footer').before('<div class="footer_height"></div>');
    $('.footer_height').css('height',$('footer').outerHeight());    

    //var tfAction = true;

    $('.skill_list > li').each(function(i){   
        var $this = $(this);
        $(window).on('scroll',function(){
            if( $(window).scrollTop() > $this.offset().top - $(window).outerHeight()*1.3 ){
                $this.addClass('go');
            }else{                
                $this.removeClass('go');
            }
        });
    });

    

    

});

var tfAction = true;

// scroll
$(window).on('scroll',function(){

    //nav - side
    if( $(this).scrollTop() > 0 ){
        $('nav.gnb').addClass('on');
    }else{
        $('nav.gnb').removeClass('on');
    }

    //scroll-go
    function scrollGo(e){
        if( $(this).scrollTop() > e.offset().top - $(window).outerHeight()*1.5 ){
            e.addClass('go');
        }else{
            e.removeClass('go');
        }
    }

    //probar
    if( $(this).scrollTop() > $('section').offset().top - $(window).outerHeight() + 200 ){
        if(tfAction == true){            
            scrollProBar(0, 78, 2); //eq, percent, duration
            scrollProBar(1, 56, 3); //eq, percent, duration
            tfAction = false;
        }
    }

    //scrollGo($('.move_img'));
    //scrollGo($('.skill_list > li'));
    

    animate_bg_init();

    //scroll indicator
    scrollIndicator();

});

// resize
$(window).resize(function () {

    //scroll indicator
    scrollIndicator();

});

// scroll indicator
function scrollIndicator() {
    if ($('.scroll_indicator').length) {
        var articleHeight = $('.footer_height').offset().top - $('section').offset().top - window.innerHeight;
        var articleStart = $(window).scrollTop() - $('section').offset().top;
        if (articleStart > 0 && $(window).scrollTop() > $('section').offset().top ) {
            var percentage = (articleStart / articleHeight) * 100;
            percentage = percentage > 100 ? 100 : percentage;
            $('.scroll_indicator span').css('width', Math.floor(percentage) + '%');
            $('.scroll_indicator').removeClass('hide');
        } else {
            $('.scroll_indicator span').css('width', '0%');
            $('.scroll_indicator').addClass('hide');
        }
    }
}

// animated background effect
function animate_bg_init() { 
    var $elem = $('.animated-bg');
    $elem.length && $elem.each(function() {
        var $this = $(this),
        $size = $this.outerHeight(),
        $pos = $this.offset().top,
        $calc = $size + $pos,
        $scrollTop = $(window).scrollTop(),
        $winHeight = $(window).outerHeight(),
        $areaStart = $pos - $winHeight,
        $areaEnd = $calc - $size / 2 - $winHeight / 2,
        $factor = 0;
            
        if ( $scrollTop >= $areaStart && $scrollTop <= $areaEnd ) {
            var $scale = ($scrollTop - $areaStart) / ($areaEnd - $areaStart);
            $factor = 0.7 + 0.3 * $scale,
            $factor >= 0.98 ? $factor = 1 : $factor < 0.4 && ($factor = 0.3),
            $this.css({ transform: 'matrix(' + $factor + ', 0, 0, 1, 0, 0)' });
        } 
    }); 
}    

//probar
function proBar(i, k, $this){
    var memberCountConTxt = i;
    $this.find('.bar').width(memberCountConTxt + '%');
    $({ val : 0 }).animate({ val : memberCountConTxt }, {
        duration: k * 1000,
        step: function() {
        var num = numberWithCommas(Math.floor(this.val));
        // var num = numberWithCommas(this.val.toFixed(1)); //소숫점 자리수 표현 지정
        $this.find('.text').text(num).css('left', i + '%');
    },
    complete: function() {
        var num = numberWithCommas(Math.floor(this.val));
        $this.find('.text').text(num).css('left', i + '%');
        }
    });
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    $this.find('.bar, .text').css('transition-duration', k + 's');    
}

function scrollProBar(e, a, b){
    if( $(window).scrollTop() > $('.item_box').eq(e).offset().top - $(window).outerHeight() ){
        $('.item_box').eq(e).find('.probar_wrap').each(function(){
            $(this).append('<div class="percent"><div class="bar"></div><div class="text"></div></div>');
            proBar(a, b, $(this)); //percent, duration, this
        });
        return false;
    }
}

// main skills progressbar
function animate_progress_bar() { 
    $('.progress-group').each(function() { 
        var $percentage = $(this).data('percentage'); 
        var $beforeCount = ($(this).find('.text').text() == '') ? 0 : $(this).find('.text').text(); 
        $(this).addClass('active');
        $(this).find('.percent-text').each(function() { 
            var $this = $(this); 
            $({Counter: $beforeCount}).animate({Counter: $percentage}, { 
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.ceil(this.Counter));
                }
            });
        });
        $(this).find('.percent').stop().animate({left: $percentage + '%'}, 2000); 
        $(this).find('.progress-wrap .bar').stop().animate({width: $percentage + '%'}, 2000);
    }); 
}