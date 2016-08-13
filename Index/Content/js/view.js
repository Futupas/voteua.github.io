/*$(document).ready(function () {
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
    if (document.documentElement.clientWidth >= document.documentElement.clientHeight) {
        $('#playbutton')
            .css('width', ((document.documentElement.clientWidth - 15) / 4))
            .css('height', (document.documentElement.clientHeight - parseInt($('#header').css('height')) - 15));
        $('#content')
            .css('width', (document.documentElement.clientWidth - 15 - parseInt($('#playbutton').css('width'))))
            .css('height', (document.documentElement.clientHeight - parseInt($('#header').css('height')) - 15));
        $('#playbutton')
            .css('top', parseInt($('#header').css('height')) + 5)
            .css('left', parseInt($('#content').css('width')) + 5);
    } else {
        $('#playbutton')
            .css('width', (document.documentElement.clientWidth - 10))
            .css('height', 50);
        $('#content')
            .css('width', (document.documentElement.clientWidth - 10))
            .css('height', (document.documentElement.clientHeight - parseInt($('#header').css('height')) - 20 - parseInt($('#playbutton').css('height'))));
        $('#playbutton')
            .css('top', (parseInt($('#header').css('height')) + parseInt($('#content').css('height')) + 10))
            .css('left', 0);
    }
    $('#playtext')
        .css('line-height', $('#playbutton').css('height'));
}*/

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
