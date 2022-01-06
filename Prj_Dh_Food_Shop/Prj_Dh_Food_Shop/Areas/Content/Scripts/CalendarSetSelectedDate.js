
function showDate(sender, args) {
    if (sender._textbox.get_element().value == "") {
        var todayDate = new Date();
        sender._selectedDate = todayDate;
    }
}
     