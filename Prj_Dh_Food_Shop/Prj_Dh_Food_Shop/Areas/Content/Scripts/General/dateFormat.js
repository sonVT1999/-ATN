function tctChangeDateFormat(data) {
    var day;
    var month;
    var year;
    var convertedData = "";

    /** dinh dang ddmmyyyy  */
    var regex1 = /^\d{8}$/;
    /** dinh dang ddmmyy  */
    var regex2 = /^\d{6}$/;
    /* dinh dang dd-mm-yyyy */
    var regex3 = /^\d{2}-\d{2}-\d{4}$/
    /* dinh dang dd/mm/yyyy */
    var regex4 = /^\d{2}\/\d{2}\/\d{4}$/

    if (regex1.test(data)) {
        day = data.substring(0, 2);
        month = data.substring(2, 4);
        year = data.substring(4, 8);
        convertedData = day + "/" + month + "/" + year;
    } else if (regex2.test(data)) {
        day = data.substring(0, 2);
        month = data.substring(2, 4);
        year = data.substring(4, 6);
        convertedData = day + "/" + month + "/" + "20" + year;
    } else if (regex3.test(data)) {
        day = data.substring(0, 2);
        month = data.substring(3, 5);
        year = data.substring(6, 10);
        convertedData = day + "/" + month + "/" + year;
    } else if (regex4.test(data)) {
        convertedData = data;
    }
    return convertedData;
}