var controller = "_Common";

function getEmployeeName(obj, label) {

    var action = "findEmployeeName";

    if (obj.length==9) {

        $.ajax({
            url: contextPath + "/" + controller + "/" + action,
            type: "GET",
            async: false,
            data: {hrCrEmpCode: obj},
            success: function (response) {
                $('#' + label).text(response);
            },
            error: function (exception) {
                $('#' + label).text(exception);
            }
        });
    } else {
        $('#' + label).text("");
    }
}

function getEmpMobNo(obj, label) {
    var action = "findEmployeeMobNo";
    if (obj) {
        $.ajax({
            url: contextPath + "/" + controller + "/" + action,
            type: "POST",
            async: false,
            data: {hrCrEmpCode: obj},
            success: function (response) {
                $('#' + label).text(response)
            },
            error: function (exception) {
                $('#' + label).text(exception)
            }
        });
    } else {
        $('#' + label).text("")
    }
}


function getApplicantName(obj, label) {
    var action = "findApplicantName";
    $.ajax({
        url: contextPath + "/" + controller + "/" + action,
        type: "POST",
        async: false,
        data: {hrIrAplcCode: obj},
        success: function (response) {
            $('#' + label).html(response);
        },
        error: function (exception) {
            $('#' + label).html(exception);
        }
    });
}

function getUserName(obj, label) {
    var action = "findUserName";
    if (obj) {
        $.ajax({
            url: contextPath + "/" + controller + "/" + action,
            type: "POST",
            async: false,
            data: {username: obj},
            success: function (response) {
                $('#' + label).text(response)
            },
            error: function (exception) {
                $('#' + label).text(exception)
            }
        });
    } else {
        $('#' + label).text("")
    }
}

function getUserNameForDetails(valu,lblUserName) {
    var userCode = valu;
    var action = "findUserName";
    //alert(lblUserName);
    $.ajax({
        url: contextPath + "/" + controller + "/" + action,
        type: "POST",
        async: false,
        data: {username: userCode},
        success: function (response) {
            $('#'+lblUserName).text(response)
        },
        error: function (exception) {
            $('#'+lblUserName).text(exception)
        }
    });
}

function clearAttachment(fid) {
    var innerHtml = "";
    $('#Div' + fid).empty();
    innerHtml += "<div class=\"file-or-hidden\">";
    innerHtml += "<input type=\"file\" name=\"" + fid + "\" onchange=\"fileExtCheck(this.value," + fid + ")\" id=\"" + fid + "\" />";
    innerHtml += "</div>";
    innerHtml += "<div class=\"attachment-link\">";
    innerHtml += "<a href=\"javascript:void(0);\" onclick=\"CallDialogBox('" + fid + "')\" class=\"dgTooltip\" title=\"Map available attachment\">Attachment</a>";
    innerHtml += "</div>";
    $('#Div' + fid).html(innerHtml);
}

function Js_MapID(mid, mname) {
    var innerHtml = "";
    var FieldId = $('#FieldId').val();
    $('#Div' + FieldId).empty();
    var divId = FieldId.split('_').pop();
    var lstchar = FieldId.substring(FieldId.length - 1, FieldId.length);

    if (parseInt(lstchar) >= 0) {
        var ary = divId.split(lstchar);
        divId = ary[0];
        divId += '.' + lstchar + '.id';
    }
    else {
        divId += '.id';
    }

    innerHtml += "<div class=\"file-or-hidden\">";
    innerHtml += mname + ' [<b>Has Mapped</b>]<input type="hidden" name="' + divId + '" id="' + divId + '" value="' + mid + '" /> ';
    innerHtml += "</div>";
    innerHtml += "<div class=\"attachment-link\">";
    innerHtml += "<a href=\"javascript:void(0);\" onclick=\"CallDialogBox('" + FieldId + "')\" class=\"dgTooltip\" title=\"Map another available attachment\">Attachment</a>";
    innerHtml += " <a href=\"javascript:void(0);\" onclick=\"clearAttachment('" + FieldId + "')\" class=\"dgTooltip\" title=\"Clear the map attachment file and upload new file.\">Clear</a>";
    innerHtml += "</div>";
    $('#Div' + FieldId).html(innerHtml);
    $('#dialog-form').dialog('close');
}

function fileExtCheck(file, fileId) {
    var fileName = file.split('.').pop().toLowerCase();
    switch (fileName) {
        case 'jpg':
        case 'jpeg':
        case 'pdf':
        case 'doc':
        case 'docx':
        case 'xls':
        case 'xlsx':
        case 'zip':
        case 'rar':
            return ture;
            break;
        default:
            alert('Unknown File Type. Please upload pdf document,word document, excel document, jpg, zip or rar file only');
            $('#' + fileId).replaceWith("<input type='file' id='" + fileId + "' name='" + fileId + "' onchange=\"fileExtCheck(this.value,'" + fileId + "')\" />");
            break;
    }
}

function picFileExtCheck(file, fileId) {
    var fileName = file.split('.').pop().toLowerCase();
    switch (fileName) {
        case 'jpg':
        case 'jpeg':
        case 'gif':
        case 'png':
            return ture;
            break;
        default:
            alert('Unknown Image Type. Please upload jpg, jpeg, gif or png file only');
            $('#' + fileId).replaceWith("<input type='file' id='" + fileId + "' name='" + fileId + "' onchange=\"fileExtCheck(this.value,'" + fileId + "')\" />");
            break;
    }
}

function checkDateRange(startDate, endDate) {
    var s = document.getElementById(startDate);
    var e = document.getElementById(endDate);

    if ((s.value != null || s.value != '') && (e.value != null || e.value != '')) {
        if (s.value > e.value)
            return false;
        else return true;
    }
}

function isNumberKey(evt, labelID) {
    var txt = document.getElementById(labelID);
    var charCode = (evt.which) ? evt.which : event.keyCode

    if (charCode != 118 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        txt.style.display = "inline";
        return false;
    }
    else {
        txt.style.display = "none";
    }

    return true;
}

$(function () {
    // a workaround for a flaw in the demo system (http://dev.jqueryui.com/ticket/4375), ignore!
    $("#dialog").dialog("destroy");

    $("#dialog-form").dialog({
        autoOpen: false,
        height: 300,
        width: 475,
        close: function () {
            $('#srcName').val('');
            return false;
        }
    });

    $('#dialog-box').button().click(function () {
        $('#dialog-form').dialog('open');
    });

    $('#Search').button().click(function () {
        var srcString = $('#srcName').val();
        var _loadingDiv = $("#srcTable").empty().html('<center><img src="../images/ajax-loader.gif" /></center>');
        _loadingDiv.show();

        $.ajax({
            type: "POST",
            url: "/DGDAORS/Attachments/attachdialogbox",
            data: "srcString=" + srcString,
            success: function (response) {
                $("#srcTable").html(response);
            },
            error: function (exception) {
                alert(
                    "Sorry, an error occurred, please try again later!\n" +
                    "(common:ln-138)"
                );
            }
        });
    });
});

function CallDialogBox(fid) {
    $('#FieldId').val(fid);
    var _loadingDiv = $("#srcTable").empty().html('<center><img src="../images/ajax-loader.gif" /></center>');
    _loadingDiv.show();

    $.ajax({
        type: "POST",
        url: "/DGDAORS/attachments/attachdialogbox",
        success: function (response) {
            $("#srcTable").html(response);
        },
        error: function (exception) {
            alert(
                "Sorry, an error occurred, please try again later!\n" +
                "(common:ln-159)"
            );
        }
    });

    $('#dialog-form').dialog('open');
}

function getOrgIds(obj, txtUnitId, txtDeptId, txtSecId, txtSubSecId) {
    var allOrgId = obj;
    $('#' + txtUnitId).val('');
    $('#' + txtDeptId).val('');
    $('#' + txtSecId).val('');
    $('#' + txtSubSecId).val('');

    var controller = "_Common";
    var action = "getOrgIds";

    $.ajax({
        url: contextPath + "/" + controller + "/" + action,
        type: "POST",
        async: false,

        data: {
            allOrgId: allOrgId
        },
        success: function (response) {
            alert("unit" + response.UNIT.toString());
            alert("dept" + response.DEPT.toString());
            alert("sec" + response.SECTION.toString());
            alert("subsec" + response.SUB_SECTION.toString());
            $('#' + txtUnitId).val(response.UNIT.toString());
            $('#' + txtDeptId).val(response.DEPT.toString());
            $('#' + txtSecId).val(response.SECTION.toString());
            $('#' + txtSubSecId).val(response.SUB_SECTION.toString());
        },
        error: function (exception) {
            alert(
                "Sorry, an error occurred, please try again later!\n" +
                "(common:ln-198)"
            );
        }
    });
}

function getPositionTitle(obj, lblPositionTitle) {
    var positionId = obj;
    var action = "getPositionTitle";

    $.ajax({
        url: contextPath + "/" + controller + "/" + action,
        type: "POST",
        async: false,

        data: "positionId=" + positionId,
        success: function (response) {
            $('#' + lblPositionTitle).text(response.message)
        },
        error: function (exception) {
            $('#' + lblPositionTitle).text(exception.message)
        }
    });
}

function getEmployeeNameForDetails(valu, ids, lblEmployeeName) {
    var arrLblEmpName = lblEmployeeName.split('_');
    if (arrLblEmpName.length == 1) {
        getEmployeeName(valu, lblEmployeeName);
    }
    else {
        var ids = ids.replace(/[^\d.]/g, '');
        var hrCrEmpCode = valu;
        var controller = "_Common";
        var action = "findEmployeeName";

        $.ajax({
            url: contextPath + "/" + controller + "/" + action,
            type: "POST",
            async: false,
            data: {hrCrEmpCode: hrCrEmpCode},
            success: function (response) {
                $('#' + arrLblEmpName[0] + ids).html(response)
            },
            error: function (exception) {
                $('#' + arrLblEmpName[0] + ids).text(exception)
            }
        });
    }
}

function addDetail(divId) {
    var controller = "lcMaster";
    var action = "createDetail";

    $.ajax({
        url: contextPath + "/" + controller + "/" + action,
        type: "POST",
        async: false,
        success: function (response) {
            alert("add details..success.");
            $('#' + divId).html(response);
        },
        error: function (exception) {
            alert(
                "Sorry, an error occurred, please try again later!\n" +
                "(common:ln-382)"
            );
        }
    });
}

function addDetailData(divId) {
    $.ajax({
        type: "POST",
        url: url,
        success: function (response) {
            $('#' + divId).html(response);
        },
        error: function (exception) {
            alert(
                "Sorry, an error occurred, please try again later!\n" +
                "(common:ln-399)"
            );
        }
    });
}
