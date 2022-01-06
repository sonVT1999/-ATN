
function convertSpecialCharacter(strTemp) {
    var temp = strTemp;
    temp = temp.replace('\"', '\\"');
    temp = temp.replace('\'', '\\\'');
    return temp;
}
function checkMaxLen(txt, maxLen) {
    try {
        if (txt.value.length > (maxLen - 1)) {
            var cont = txt.value;
            txt.value = cont.substring(0, (maxLen - 1));
            return false;
        };
    } catch (e) {
    }
}
//$(document).ready(function () {
//    $(function DatePick() {
//        $("input[id$='txtfromdate']").datepick({ dateFormat: 'dd-mm-yyyy' });
//        $("input[id$='txttodate']").datepick({ dateFormat: 'dd-mm-yyyy' });

//    })
//});
function validateTextSearch(text) {
    var pattern = /^[0-9a-zA-Z\-\.\s]*$/;
    if (!pattern.test(text.trim())) {
        return false;
    }
    return true;
}
var gridViewCtlId;
var gridViewCtl; // document.getElementById("gvRptLocationTransport");
var rCount;
var rowIdx;
var columnIdx;
function hideRow(row) {
    Row_num = row;
    rows = gridViewCtl.rows;
    if (rows[Row_num].style.display != 'none') {
        rows[Row_num].style.display = 'none';
    }
}
function showRow(row) {
    Row_num = row;
    rows = gridViewCtl.rows;
    //            if (rows[Row_num].style.display != 'block') {
    rows[Row_num].style.display = '';
    //            }             
}
function search(gridViewCtlId, txtSearch, columnIdx) {
    gridViewCtl = document.getElementById(gridViewCtlId);
    rCount = gridViewCtl.rows.length;
    rowIdx = 1;
    var rownum = 0;
    if (txtSearch == null) txtSearch = '';
    for (rowIdx; rowIdx <= rCount - 1; rowIdx++) {
        var cellvalue = getCellValue(rowIdx, columnIdx);
        cellvalue = cellvalue.toUpperCase();
        cellvalue = cellvalue.replace(/\\n/g, "");
        var i = cellvalue.search(txtSearch.toUpperCase().replace(/\./g, "\\."));
        if (i < 0) {
            hideRow(rowIdx);
        }
        else {
            showRow(rowIdx);
            rownum++;
        }
    }
    return rownum;
}
function ShowRow(row) {
    Row_num = row;
    rows = gridViewCtl.rows;
    rows[Row_num].style.display = 'block'
}
function getCellValue(rowIdx, colIdx) {
    var gridCell = getGridColumn(rowIdx, colIdx);
    if (null != gridCell) {
        return gridCell.textContent;
    }
    return null;
}
function getGridViewControl() {
    if (null == gridViewCtl) {
        gridViewCtl = document.getElementById(gridViewCtlId);
        rCount = gridViewCtl.rows.length;
    }
}

function onGridViewRowSelected(rowIdx) {
    var selRow = getSelectedRow(rowIdx);
    if (null != selRow) {
        curSelRow = selRow;
        var cellValue = getCellValue(rowIdx, 0);
        alert(cellValue);
    }
}

function getSelectedRow(rowIdx) {
    return getGridRow(rowIdx);
}

function getGridRow(rowIdx) {
    //getGridViewControl();
    if (null != gridViewCtl) {
        return gridViewCtl.rows[rowIdx];
    }
    return null;
}

function getGridColumn(rowIdx, colIdx) {
    var gridRow = getGridRow(rowIdx);
    if (null != gridRow) {
        return gridRow.cells[colIdx];
    }
    return null;
}

function Paging(gridViewCtlId, pagesize, pagidx) {
    gridViewCtl = document.getElementById(gridViewCtlId);
    rCount = gridViewCtl.rows.length;
    rowIdx = 1;
    rowpagding = 10;
    rowDisplay = 0;
    for (rowIdx; rowIdx <= rCount - 1; rowIdx++) {
        if (rows[rowIdx].style.display == '' || rows[rowIdx].style.display == 'block' || rows[rowIdx].style.display == null) {
            rowDisplay = rowDisplay + 1;
            if ((rowDisplay > (pagidx * pagesize)) && (rowDisplay <= ((pagidx + 1) * pagesize))) {
                showRow(rowIdx);
            }
            else {
                hideRow(rowIdx);
            }
        }
    }
}
function PagingSearch(gridViewCtlId, txtSearch, idxColumn) {
    PagingSearchForDiv(gridViewCtlId, txtSearch, idxColumn, "#divPaging");
}
function PagingSearchForDiv(gridViewCtlId, txtSearch, idxColumn, divPaging) {
    var pagsize = 10;
    var total = search(gridViewCtlId, txtSearch, idxColumn);
    Paging(gridViewCtlId, pagsize, 0);
    CreateNavigator1(total, pagsize, 0, gridViewCtlId, txtSearch, idxColumn, divPaging)
}

function ChangePageSearch(gridViewCtlId, txtSearch, idxColumn, divPaging, pagidx) {
    var pagsize = 10;
    var total = search(gridViewCtlId, txtSearch, idxColumn);
    Paging(gridViewCtlId, pagsize, pagidx);
    CreateNavigator1(total, pagsize, pagidx, gridViewCtlId, txtSearch, idxColumn, divPaging)
}
String.format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
}
function CreateNavigator1(total, pageSize, pageIndex, gridViewCtlId, txtSearch, idxColumn, divPaging) {
    var pagecount = 0;
    if (total % pageSize > 0) pagecount = parseInt(total / pageSize) + 1;
    else pagecount = parseInt(total / pageSize);
    //var tmp = "<div class='paging-div'></div>";
    var tmp = "";
    if (pageIndex == 0) {
        tmp += "<div class='paging-div'><a class='nav'>{1}</a>"
        tmp += "<a class='nav'>{3}</a>"
    } else {
        tmp += "<div class='paging-div'><a class='nav1' onclick=\"ChangePageSearch({9},{10},{11},{12},{0})\">{1}</a>"
        tmp += "<a class='nav1' onclick=\"ChangePageSearch({9},{10},{11},{12},{2})\">{3}</a>"
    }
    tmp += "{4}"
    if (pageIndex == pagecount - 1) {
        tmp += "<a class='nav'>{6}</a>";
        tmp += "<a class='nav'>{8}</a></div>";
    } else {
        tmp += "<a class='nav1' onclick=\"ChangePageSearch({9},{10},{11},{12},{5})\">{6}</a>";
        tmp += "<a class='nav1' onclick=\"ChangePageSearch({9},{10},{11},{12},{7})\">{8}</a></div>";
    }
    var nextpage = pageIndex + 1 > pagecount ? pageIndex : pageIndex + 1;
    var prevpage = pageIndex - 1 < 0 ? 0 : pageIndex - 1;

    var first = _pagingFirstText;
    if (pageIndex > 0) first = "<span>" + _pagingFirstText + " </span>";
    var prev = _pagingPrevText;
    if (pageIndex > 0) prev = "<span>" + _pagingPrevText + " </span>";
    var next = _pagingNextText;
    if (pageIndex < pagecount - 1) next = "<span> " + _pagingNextText + "</span>";
    var last = _pagingLastText;
    if (pageIndex < pagecount - 1) last = "<span> " + _pagingLastText + "</span";

    var from = (total > 0) ? parseInt(pageIndex * pageSize + 1) : 0;
    var to = parseInt(pageIndex * pageSize + pageSize) > total ? total : parseInt(pageIndex * pageSize + pageSize);
    var middle = '<span> ' + from + ' - ' + to + ' / ' + total + ' <span>';
    if (txtSearch == null) txtSearch = "''";
    else txtSearch = "'" + txtSearch + "'";
    var v_gridViewCtlId = "'" + gridViewCtlId + "'";
    var v_divPaging = "'" + divPaging + "'";
    $(divPaging).empty().append(String.format(tmp, 0, first, prevpage, prev, middle, nextpage, next, pagecount - 1, last, v_gridViewCtlId, txtSearch, idxColumn, v_divPaging));
}