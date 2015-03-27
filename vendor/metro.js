$(function() {
    $layout = $('.main-layout');
    $container = $('.main-layout .content');

    function changeLayoutMode() {
        $('.items', $layout).removeAttr('style');

        $('.items', $layout).css({
            width: $('.items', $layout).outerWidth() - 100
        }).isotope({
            itemSelector: '.box',
            layoutMode: 'masonryHorizontal',
            animationEngine: 'css'
        });
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
    var resizeTimer;
    $(window).bind('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(toggleSlideControls, 100);
    });
    $container.dragscrollable({
        dragSelector: '.items'
    });
})
