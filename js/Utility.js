// Constants **********Start
var ServiceURL = "http://znodd.cloudapp.net:86/zUcmService.asmx";
//var ServiceURL = "http://localhost:81/zUcmService.asmx";
// Methods *********Start
function commonAjaxCall(methodName, input) {
    var output = "";
    try {
        jQuery.support.cors = true;
        $.ajax({
            type: "POST",
            data: input,
            contentType: "application/json; charset=utf-8",
            url: ServiceURL + "/" + methodName,
            dataType: "json",
            async: false,
            beforeSend: function (xhr) { xhr.withCredentials = true; },
            crossDomain: true,
            success: function (data) {
                if (data.d != "" && data.d != "null") {
                    output = data.d;
                    return data.d;
                }
            },
            error: function (xhr, status, err) {
                // alert("Error occured in commonAjaxCall" + xhr.responseText);   
            }
        });
        return output;
    }
    catch (ex) {
        // alert("[commonAjaxCall]" + ex);
    }
}

//Z Alert method
function zAlert(title, message) {
   // $('#zAlertMessage').text(message);
    alert(message);
}

function LoadJqueryPopup(selector, _widthparam, _titleparam, isOpen) {
    if (isOpen == undefined || isOpen == '') { isOpen = false; }
    $(selector).dialog({
        autoOpen: false,
        width: _widthparam,
        position: ['center', 'middle'],
        dialogClass: 'web_jquery_dialog',
        title: _titleparam,
        resizable: false,
        modal: true
    });
    if (isOpen) { $(selector).dialog('open'); }
    $(selector).keypress(function (e) {
        if (e.keyCode == $.ui.keyCode.ENTER) {
            return false;
        }
    });
}