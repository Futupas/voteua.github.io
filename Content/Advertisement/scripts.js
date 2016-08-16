var a = false;

$('#body').mouseenter(function () {
    $('#modal').modal({
        keyboard: false,
        backdrop: false,
        show: true
    });
    a = true;
});

$('#body').mouseleave(function () {
    $('#modal').modal('hide');
    a = false;
});

$('#body').click(function () {
    a = !a;
    if (a) {
        $('#modal').modal({
                keyboard: false,
                backdrop: false,
                show: true
            });
    } else {
        $('#modal').modal('hide');
    }
});
