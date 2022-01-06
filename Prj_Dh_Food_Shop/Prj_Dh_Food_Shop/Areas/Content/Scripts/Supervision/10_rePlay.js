var startValue = 0;
var endValueReplay = 0;
var btn = document.getElementById('play-pause-button');

function btnOnClick() {
    var value = $('#play-pause-button').val() * 1;
    $('.vtmapgl-popup-anchor-bottom').remove();
    if (value == 3) {
        //stop pause lại
        hidenload = true;
        isWatching = false;
        $('#btnReview').hide();
        $('#btnReviewContinue').show();
        $('#btnReviewStop').hide();
        $('#play-pause-button').val(2);
        $('#play-pause-button').attr("class", "fa fa-play");
        $('#play-pause-button').attr("title", _review);
        PauseReview();
    }
    if (value == 2) {
        //continue xem hành trình
        hidenload = false;
        isWatching = true;
        $('#btnReview').hide();
        $('#btnReviewStop').show();
        $('#btnReviewContinue').hide();
        $('#play-pause-button').val(3);
        $('#play-pause-button').attr("class", "fa fa-pause");
        $('#play-pause-button').attr("title", _pause);
        ContinueReview();
        //inputOnclick();
    }
    if (value == 1 || value == "" || value == undefined) {
        //xem đầu tiền 
        flagReview = true; //kt chuyen giua supervice,point va review
        hidenload = false;
        isWatching = true;
        $('#btnReview').hide();
        $('#btnReviewStop').show();
        $('#btnReviewContinue').hide();
        $('#play-pause-button').val(3);
        setTimeout('LoadCarTravel()', 10);
        $('#play-pause-button').attr("class", "fa fa-pause");
        $('#play-pause-button').attr("title", _pause);
        //inputOnclick();
    }
}

function inputOnclick(element) {
    var inputValue = $('#play-range').val() * 1;
    $('.vtmapgl-popup-anchor-bottom').remove();
    $('#play-range').val(inputValue);

    if (inputValue <= endValueReplay) {
        CeatePolyline(inputValue);
        var value = $('#play-pause-button').val() * 1;
        if (value == 2 || value == "" || value == undefined) {
            PauseReview();
        } 
    }
}
