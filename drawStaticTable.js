var summaryTableSpreadsheetDataURL = "https://spreadsheets.google.com/feeds/cells/1MCJ7LtG1WKpQ7Nxx60krnsjmmdO9UC_Uhypx9w5txCs/1/public/values?alt=json-in-script&callback=summaryTableData";
var windsAloftTableSpreadsheetDataURL = "https://spreadsheets.google.com/feeds/cells/1KUH4WJ9GESajpG0gorlAsvowjwqgeQ_GbOdmsmxZYJM/1/public/values?alt=json-in-script&callback=windsAloftTableData";

function summaryTableData(json) {
            summaryTableSpreadsheetDataURL = json.feed.entry;
        }

function drawCell(tr, val) {
    var td = $("<td/>");
    tr.append(td);

    // for formula -- but no data
    if (/^=image/.test(val)) {
        var img = $('<img />');
        var src = val.replace(/"(.*)"/, '$1');
        console.log('src', src);
        img.attr('src', src);
        td.append(img);

    // for straight url
    } else if (/^http/.test(val)) {
        var img = $('<img />');
        img.attr('src', val);
        td.append(img);
    } else {
        td.append(val);
    }
    return td;
}

function drawRow(table, rowData) {
    if (rowData == null) return null;
    if (rowData.length == 0) return null;
    var tr = $("<tr/>");
    table.append(tr);
    for (var c=0; c<rowData.length; c++) {
        drawCell(tr, rowData[c]);
    }
    return tr;
}

function drawTable(parent) {
    var table = $("<table/>");
    parent.append(table);
    return table;
}

function readData(parent) {
    var data = summaryTableSpreadsheetDataURL;
    var table = drawTable(parent);
    var rowData = [];
    for (var r=0; r<data.length; r++) {
        var cell = data[r]["gs$cell"];
        var val = cell["$t"];
        if (cell.col == 1) {
            drawRow(table, rowData);
            rowData = [];
        }
        rowData.push(val);
    }
    drawRow(table, rowData);
}

$(document).ready(function(){
    readData($("#summaryTable"));
});
