$(document).ready(function(){

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

    //progressbar
    if ( $('.progress-group').length ) { 
        var waypoint = new Waypoint({ element: $('.progress-group'),
            handler: function(direction) { animate_progress_bar(); }, offset: '100%' }); 
    }

    //footer
    $('footer').before('<div class="footer_height"></div>');
    $('.footer_height').css('height',$('footer').outerHeight());    

    //skill list
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

    animate_bg_init(); //animated background effect
    scrollIndicator(); //scroll indicator

});

// resize
$(window).resize(function () {
    
    scrollIndicator(); //scroll indicator

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