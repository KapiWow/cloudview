function generateList(info) {
    var list = document.getElementById('list');
    list.innerHTML = "";

    var table = document.createElement("tr");
    var col = document.createElement("th");
    col.innerHTML = "MachineId";
    table.appendChild(col);
    col = document.createElement("th");
    col.innerHTML = "CPU";
    table.appendChild(col);
    col = document.createElement("th");
    col.innerHTML = "disk";
    table.appendChild(col);
    col = document.createElement("th");
    col.innerHTML = "location";
    table.appendChild(col);
    list.appendChild(table);

    for (var i = 0; i < info.length; i++) {
        table = document.createElement("tr");
        col = document.createElement("td");
        col.innerHTML = info[i].machineid;
        table.appendChild(col);
        col = document.createElement("td");
        col.innerHTML = info[i].modelname_cpu;
        table.appendChild(col);
        col = document.createElement("td");
        col.innerHTML = info[i].modelname_disk;
        table.appendChild(col);
        col = document.createElement("td");
        col.innerHTML = info[i].continent;
        table.appendChild(col);
        list.appendChild(table);
    }
}

function findMachine() {
    var getMachineInfo = new XMLHttpRequest();

    var cores =  encodeURIComponent(document.getElementById("cores").options[document.getElementById("cores").selectedIndex].text);
    var manufacturer =  encodeURIComponent(document.getElementById("manufacturer").options[document.getElementById("manufacturer").selectedIndex].text);
    var region =  encodeURIComponent(document.getElementById("region").options[document.getElementById("region").selectedIndex].text);
    var diskMin =  encodeURIComponent(document.getElementById("diskMin").value);
    var diskMax =  encodeURIComponent(document.getElementById("diskMax").value);

    var sqlquerry = 'https://cloudviewkapi.azurewebsites.net/api/machine/findByInfo?cores='+cores+
        '&manufacturer='+manufacturer+'&region='+region+'&diskMin='+diskMin+'&diskMax='+diskMax+'&code=nXQS8h5PRqe/JqBuzWqU1JTSgil0cIRWG1GmDig0nosHCPKLWM20jw==';
    console.log(sqlquerry);
    getMachineInfo.open('GET',
        sqlquerry,
        true);

    getMachineInfo.onreadystatechange  = function () {
        if (getMachineInfo.status == 200) {
            var info = JSON.parse(getMachineInfo.responseText, function (key, value) {
                if (key == 'datatime') return new Date(value);
                return value;
            });
            generateList(info);
            console.log(info);
        } else {
            console.log("error");
        }

    };
    console.log("123");
    getMachineInfo.send();
}
