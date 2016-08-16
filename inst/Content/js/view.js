$(document).ready(function () {
    SetContentCss();
    $('#content').niceScroll({
        cursorcolor: '#000000',
        cursorwidth: '6px',
        cursorborder: '0px',
        cursorborderradius: '3px'
    });
});
$(window).resize(function () {
    SetContentCss();
});

function SetContentCss() {
    $('#header')
        .css('width', (document.documentElement.clientWidth - 10))
        .css('height', 50);
    $('#content')
        .css('width', (document.documentElement.clientWidth - 10))
        .css('height', (document.documentElement.clientHeight - parseInt($('#header').css('height')) - 15));
}