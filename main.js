
const baseURL = "https://ci-swapi.herokuapp.com/api/";

function getData(type, cb) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", baseURL + type + "/"); // this will append baseURL with the type that we're parsing in
    xhr.send();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}

function getTableHeaders(obj) {
    var tableHeaders = [];

    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`);
    });

    return `<tr>${tableHeaders}</tr>`;
    
}


function writeToDocument(type) {

    var tableRows = [];
    var el = document.getElementById("data");
    el.innerHTML = "";

    getData(type, function(data) {
        data = data.results; // Array of 10 objects

        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item) {
            var dataRow = []; // Empty Array for each individual row

            Object.keys(item).forEach(function(key) {
                // item and pass in [key] as the index, which actually get us the data that's in each individual key,
                // rather than just the key name itself, we'll get the value.
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0, 15);

                dataRow.push(`<td>${truncatedData}</td>`);  
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
        });

        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>`;
    });
}

