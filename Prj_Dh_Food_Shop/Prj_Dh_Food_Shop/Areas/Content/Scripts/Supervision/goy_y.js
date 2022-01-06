function validateText() {
    var txtSusggesPhone = $("#UC_Suggestion1_txtSusggesPhone").val();
    var txtSusggesEmail = $("#UC_Suggestion1_txtSusggesEmail").val();
    var cbblSuggestion = $("#UC_Suggestion1_cbblSuggestion").val();
    var txtSusggessubj = $("#UC_Suggestion1_txtSusggessubj").val();
    var txtSusggesContents = $("#UC_Suggestion1_txtSusggesContents").val();
    if ($.trim(txtSusggesPhone) == "") {
        alert("Số điện thoại không được để rỗng");
        $("#UC_Suggestion1_txtSusggesPhone").focus();
        return false;
    }
    if (txtSusggesPhone.length != 0) {
        if (!validatePhonenumber(txtSusggesPhone)) {
            alert("Số điện thoại không đúng định dạng");
            $("#UC_Suggestion1_txtSusggesPhone").focus();
            return false;
        }
    }

    if ($.trim(txtSusggesEmail) == "") {
        alert("Email không được để rỗng");
        $("#UC_Suggestion1_txtSusggesEmail").focus();
        return false;
    }

    if (!validateEmail(txtSusggesEmail)) {
        alert("Email không đúng định dạng");
        $("#UC_Suggestion1_txtSusggesEmail").focus();
        return false;
    }

    if ($.trim(cbblSuggestion) == "0") {
        alert("Bạn phải chọn chủ đề");
        $("#UC_Suggestion1_cbblSuggestion").focus();
        return false;
    }
    if ($.trim(txtSusggessubj) == "") {
        alert("Tiêu đề không được để rỗng");
        $("#UC_Suggestion1_txtSusggessubj").focus();
        return false;
    }

    if ($.trim(txtSusggesContents) == "") {
        alert("Nội dung góp ý không được để rổng");
        $("#UC_Suggestion1_txtSusggesContents").focus();
        return false;
    }
    return true;

}

function saveSusggetion() {
    if (!validateText()) {
        return;
    }
    ///alert($("#userIdSuggesstion").val());
    $.ajax({
        type: "POST",
        data: "{'phone': '" + $("#UC_Suggestion1_txtSusggesPhone").val() + "' ,'email': '" + $("#UC_Suggestion1_txtSusggesEmail").val() + "' , 'sitmapid':'" + $("#UC_Suggestion1_cbblSuggestion").val() + "' , 'Subject':'" + convertSpecialCharacter($("#UC_Suggestion1_txtSusggessubj").val()) + "', 'content':'" + convertSpecialCharacter($("#UC_Suggestion1_txtSusggesContents").val()) + "','useriD':'" + $("#UC_Suggestion1_userIdSuggesstion").val() + "','userName':'" + $("#UC_Suggestion1_txtSuggestionCode").val() + "'}",
        contentType: "application/json; charset=utf-8",
        url: "/SRC_QT01_11190_Vtracking_v1.0/ServiceFarm/Suggestion.asmx/CreateSuggestion",
        dataType: "json",
        success: function (data) {
            data = eval('(' + data.d + ')');
            //alert(data);
            if (data > 0) {
                alert("Gửi góp ý thành công");
                reSetText();
            }
            else {
                alert("Lỗi! Xin hãy thử lại");
            }
        }
    })
}
function reSetText() {
    $("#UC_Suggestion1_cbblSuggestion option[value=0]").attr("selected", "selected");
    $("#UC_Suggestion1_txtSusggessubj").val("");
    $("#UC_Suggestion1_txtSusggesContents").val("");

}