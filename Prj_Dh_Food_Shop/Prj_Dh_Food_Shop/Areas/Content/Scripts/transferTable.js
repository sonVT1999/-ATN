


function transfer(tableSource, tableDesc, propertySource, propertyDesc) {
    var assignTable = document.getElementById(tableDesc);
    var assignBody = assignTable.getElementsByTagName("tbody")[0];
    var unAssignTable = document.getElementById(tableSource);
    var unAssignBody = unAssignTable.getElementsByTagName("tbody")[0];
    var lstUnAssignRows = unAssignBody.getElementsByTagName("tr");
    var lstTDs = unAssignBody.getElementsByTagName("td");
    var lstInputs = unAssignBody.getElementsByTagName("input");
    var i = 0;
    var arrList = new Array(); // list checked of source table
    var arrList1 = new Array(); // list unchecked of srouce table
    var j = 0;
    var k = 0;
    for (i = 0; i < lstInputs.length; i++) {
        if (lstInputs[i].checked) {
            if (lstTDs[1 + i * 2] != undefined) {
                var name = jQuery.trim(lstTDs[1 + i * 2].innerHTML);
                var ob = { id: lstInputs[i].value, name: name };
                arrList[j] = ob;
                j++;
            }
        }
        else {
            if (lstTDs[1 + i * 2] != undefined) {
                var name = jQuery.trim(lstTDs[1 + i * 2].innerHTML);
                var ob = { id: lstInputs[i].value, name: name };
                arrList1[k] = ob;
                k++;
            }
        }
    }
    if (functionName == "user") functionNameVN = "người dùng";
    else if (functionName == "transport") functionNameVN = "phương tiện";
    else if (functionName == "property") functionNameVN = "thuộc tính";
    if (arrList.length == 0) {
        alert('Bạn chưa chọn ' + functionNameVN + '!');
        return false;
    }
    var arrList2 = new Array(); //list of dest table
    var lstAssignRows = assignBody.getElementsByTagName("tr");
    var lstAssignTDs = assignBody.getElementsByTagName("td");
    var lstAssignInputs = assignBody.getElementsByTagName("input");
    var l = 0;
    for (i = 0; i < lstAssignInputs.length; i++) {
        if (lstAssignTDs[1 + i * 2] != undefined) {
            var name = jQuery.trim(lstAssignTDs[1 + i * 2].innerHTML);
            var ob = { id: lstAssignInputs[i].value, name: name };
            arrList2[l] = ob;
            l++;
        }
    }
    var arrList3 = arrList.concat(arrList2); //list needs to add to dest table
    //                                var lstAssign = "";
    //                                if (arrList3.length >= 1) {
    //                                    lstAssign = arrList3[0].id;
    //                                    for (i = 1; i < arrList3.length; i++) {
    //                                        lstAssign = lstAssign + "," + arrList3[i].id;
    //                                    }
    //                                }
    //                               document.getElementById("<%=lstAssignProperty.ClientID %>").value = lstAssign;
    if (colNum == "3") {
        buildTable(arrList3, tableDesc, propertyDesc);
        buildTable(arrList1, tableSource, propertySource);
    }
    if (colNum == "1") {
        buildTable1(arrList3, tableDesc, propertyDesc);
        buildTable1(arrList1, tableSource, propertySource);
    }
}
function sendToAssign() {
    transfer("unassignTable", "assignTable", "unassign", "assign");
}
function buildTable(arrList, tableId, propertyName) {
    var assignTable = document.getElementById(tableId);
    $('#' + tableId).empty();
    var str = "";
    var newBody = document.createElement("tbody");
    for (var i = 0; i < arrList.length; i++) {
        if (i % 3 == 0) {
            var newRow = document.createElement("tr");
            str += '<tr>';
            str += '<td style="width: 30px"><label class="n-container"><input type="checkbox" id="' + propertyName + '_' + arrList[i].id + '" value="' + arrList[i].id + '" /><span class="checkmark"></span></label>';
            str += '</td>';
            str += '<td>' + arrList[i].name + '</td>';
            if (i < arrList.length - 1) {
                str += '<td style="width: 30px">';
                str += '<label class="n-container"><input type="checkbox" id="' + propertyName + '_' + arrList[i + 1].id + '" value="' + arrList[i + 1].id + '" /><span class="checkmark"></span></label>';
                str += '</td>';
                str += '<td>' + arrList[i + 1].name + '</td>';
            }
            else {
                str += '<td style="width: 5%">&nbsp;</td><td style="width: 29%">&nbsp;</td>';
            }
            if (i < arrList.length - 2) {
                str += '<td style="width: 30px">';
                str += '<label class="n-container"><input type="checkbox" id="' + propertyName + '_' + arrList[i + 2].id + '" value="' + arrList[i + 2].id + '" /><span class="checkmark"></span></label>';
                str += '</td>';
                str += '<td>' + arrList[i + 2].name + '</td>';
            }
            else {
                str += '<td style="width: 5%">&nbsp;</td><td style="width: 29%">&nbsp;</td>';
            }
            str += '</tr>';
        }
    }
    $('#' + tableId).append('<tbody></tbody>');
    $('#' + tableId + ' > tbody:last').append(str);
}
function buildTable1(arrList, tableId, propertyName) {
    var assignTable = document.getElementById(tableId);
    $('#' + tableId).empty();
    var str = "";
    var newBody = document.createElement("tbody");
    for (var i = 0; i < arrList.length; i++) {
        str += '<tr>';
        str += '<td style="width: 30px"><label class="n-container"><input type="checkbox" id="' + propertyName + '_' + arrList[i].id + '" value="' + arrList[i].id + '" /><span class="checkmark"></span></label>';
        str += '</td>';
        str += '<td>' + arrList[i].name + '</td>';
        str += '</tr>';
    }
    $('#' + tableId).append('<tbody></tbody>');
    $('#' + tableId + ' > tbody:last').append(str);
}
function sendToUnassign() {
    transfer("assignTable", "unassignTable", "assign", "unassign");
}
validateAssign = function () {
    setValue();
    return confirm('Bạn có chắc chắn muốn lưu lại?');
}
setValue = function () {
    var assignTable = document.getElementById("assignTable");
    var assignBody = assignTable.getElementsByTagName("tbody")[0];
    var lstInputs = assignBody.getElementsByTagName("input");
    var i = 0;
    var lstAssign = "";
    if (lstInputs.length >= 1) {
        lstAssign = lstInputs[0].value;
        for (i = 1; i < lstInputs.length; i++) {
            lstAssign = lstAssign + "," + lstInputs[i].value;
        }
    }
   // alert(lstAssign);
    document.getElementById(valueId).value = lstAssign;
   // alert(document.getElementById(valueId).value);
}

                
                  