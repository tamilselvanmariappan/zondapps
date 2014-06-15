
$(document).ready(function () {
    $("#logintab").css("display", "block"); //To show the login window on front .
    $("#username").focus();

    $("#btnSubmit").click(function () {
	alert('');
        var User = "";
        try {
            var loginId = $("#username").val();
            var pass = $("#password").val();
            if (loginId != "" && pass != "") {
                var input = "{'loginId' : '" + loginId + "', 'pass' : '" + pass + "'}";
                var methodName = "pUserAuthendicate";
                //Calling common method to get user data from database
                var result = commonAjaxCall(methodName, input);
                if (result != "") {
                    User = eval("(" + result + ")");
                    window.sessionStorage.setItem('userId', User.userId);
                    window.sessionStorage.setItem('token', User.token);
                    window.sessionStorage.setItem('lastLogin', User.lastLogin);
                    window.sessionStorage.setItem('language', User.language);
                    login.getApplicationDetails();
                    return false;
                }
                else {
                    zAlert('Alert',"Invalid username and password");
                    return false;
                }
            }
            else {
                zAlert('Alert',"Enter username and password");
                return false;
            }
        }
        catch (ex) {

            zAlert('Alert',"Login Process Failed, Contact Znod Team.");
            return false;
        }
    });
    

    $("#btnselectApp").click(function () {
        if ($('#selectapplication').val() != "") {
            window.sessionStorage.setItem('appId', $('#selectapplication').val())
            login.getCompanyDetails();
            return false;
        }
    });

    $("#btnselectComp").click(function () {
        if ($('#selectcompany').val() != "") {
            window.sessionStorage.setItem('compId', $('#selectcompany').val())
            login.getInitializeDetails();
            return false;
        }
    });

    $("#btnzAlertClose").click(function () {
        $('#zAlert').dialog('close');
    });    

    $("#btnAppBack").click(function () {
        window.sessionStorage.clear();
        $("#logintab").css("display", "block");
        $("#selectapptab").css("display", "none");
        $("#selectcompanytab").css("display", "none");
    });

    $("#btnCompBack").click(function () {
        login.getCompanyDetails();
        $("#logintab").css("display", "none");
        $("#selectapptab").css("display", "block");
        $("#selectcompanytab").css("display", "none");
    });

    var login = {
                getApplicationDetails: function () {    //Get the application details associated with the user id and token
                    var input = "{'userId' : '" + window.sessionStorage.getItem('userId') + "', 'token' : '" + window.sessionStorage.getItem('token') + "'}";
                    var applicationDetails = eval('(' + commonAjaxCall('gUserApplicationRel', input) + ')')
                    if (applicationDetails.length > 1) {
                        $("#logintab").css("display", "none");
                        $("#selectcompanytab").css("display", "none");
                        $("#selectapptab").css("display", "block");
                        $('#selectapplication').html($('<option></option').val('').html(''));
                        $.each(applicationDetails, function (i, val) {
                            $('#selectapplication').append($('<option></option').val(this.R_APP_ID).html(this.R_APP_NAME));
                        });
                    }
                    else {
                        window.sessionStorage.setItem('appId', applicationDetails[0].R_APP_ID)
                        login.getCompanyDetails();
                    }
                },
                getCompanyDetails: function () {    //Get the company deatails associated with the user and the application
                    var input = "{'userId' : '" + window.sessionStorage.getItem('userId') + "','appId' : '" + window.sessionStorage.getItem('appId') + "', 'token' : '" + window.sessionStorage.getItem('token') + "'}";
                    var companyDetails = eval('(' + commonAjaxCall('gUserCompanyRel', input) + ')');
                    if (companyDetails.length > 1) {
                        $("#logintab").css("display", "none");
                        $("#selectapptab").css("display", "none");
                        $("#selectcompanytab").css("display", "block");
                        $('#selectcompany').html($('<option></option').val('').html(''));
                        $.each(companyDetails, function (i, val) {
                            $('#selectcompany').append($('<option></option').val(this.R_COMP_ID).html(this.R_COMP_NAME));
                        });
                    }
                    else {
                        window.sessionStorage.setItem('compId', companyDetails[0].R_COMP_ID);
                        login.getInitializeDetails();
                    }
                },
                getInitializeDetails: function () {     //Get the token and navigate the user to the company in the appropriate application.
                    var input = "{'userId' : '" + window.sessionStorage.getItem('userId') + "','appId' : '" + window.sessionStorage.getItem('appId') + "','compId' : '" + window.sessionStorage.getItem('compId') + "', 'token' : '" + window.sessionStorage.getItem('token') + "'}";
                    var appUrl = eval('(' + commonAjaxCall('gAppUrlDetail', input) + ')');
                    var token=window.sessionStorage.getItem('token');
                    window.sessionStorage.clear();
                    window.location.replace(appUrl.url + "?token=" +token);
                }
            }
}); 
