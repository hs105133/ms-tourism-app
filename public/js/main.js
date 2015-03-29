(function($) {
    var $layout = $('.main-layout'),
        $container = $('.main-layout .content'),
        $slideBox = $(".slideBox"),
        $verticalMenu = $('.vertical-menu'),
        $settings = $(".settings"),
        $status = $(".status");

    function adjustSlideWidth() {
        var slideWidth = $(".box").eq(1).css('transform').split(',')[4].trim() - 20;
        $slideBox.width(slideWidth);
        $(".slideContent").width(slideWidth - $(".slideBoxImage").width());
    }

    function changeLayoutMode() {
        $('.items', $layout).removeAttr('style');

        $('.items', $layout).css({
            width: $('.items', $layout).outerWidth() - 60
        }).isotope({
            itemSelector: '.box',
            layoutMode: 'masonryHorizontal',
            animationEngine: 'css'
        });

        adjustSlideWidth();
    }
    changeLayoutMode();

    $('.next', $layout).click(function(ev) {
        ev.preventDefault();
        $container.stop().animate({
            scrollLeft: '+=' + ($('body').innerWidth() / 1.8)
        }, 400);
    });
    $('.prev', $layout).click(function(ev) {
        ev.preventDefault();
        $container.stop().animate({
            scrollLeft: '-=' + ($('body').innerWidth() / 1.8)
        }, 400);
    });

    $('.items', $layout).bind('mousewheel', function(ev, delta, deltaX, deltaY) {
        if (delta) {
            ev.preventDefault();
            $container.stop().animate({
                scrollLeft: '-=' + ($('body').innerWidth() / 4 * delta)
            }, 10);

            console.log(delta, deltaX, deltaY);
        }
    });

    $container.dragscrollable({
        dragSelector: '.items'
    });

    function open_menu($elm) {
        if ($elm.hasClass('close')) {
            $elm.removeClass('close');
        }
    }

    function close_menu($elm) {
        $elm.addClass('close');
    }


    $verticalMenu.hover(
        function() {
            open_menu($verticalMenu);
        },
        function() {
            close_menu($verticalMenu);
        });

    $("#flyoutMenu").on("click", "li", function(e) {
        var $this = $(this);

        if ($this.hasClass("openSettings")) {
            close_menu($verticalMenu);
            open_menu($settings);
        }
    });

    $("#backToFlyoutMenu").on("click", function() {
        close_menu($settings);
    });


window.addEventListener('load', function(e) {
  if (navigator.onLine) {
    $status.removeClass("offline");
  } else {
    $status.addClass("offline");
  }
}, false);

window.addEventListener('online', function(e) {
  $status.removeClass("offline");
}, false);

window.addEventListener('offline', function(e) {
    $status.addClass("offline");
}, false);


})(jQuery);
