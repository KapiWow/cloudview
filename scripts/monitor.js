function createInfoElem(parent, name, param) {
    var row = document.createElement('div');
    row.className = "w3-row w3-margin";
    var firstCol = document.createElement('div'),
        secondCol = document.createElement('div');
    firstCol.className = "w3-col";
    firstCol.style = "width:20%";
    firstCol.innerHTML = name;
    secondCol.className = "w3-col";
    secondCol.style = "width:50%";
    secondCol.innerHTML = param;
    row.appendChild(firstCol);
    row.appendChild(secondCol);
    parent.appendChild(row);
}

function createSection(name, elemParams) {
    var section = document.createElement('div');
    section.className = "w3-container w3-border";
    section.id = name;
    section.innerHTML = "<h3>" + name + "</h3>";
    for (var i = 0; i < elemParams.length; i++)
        createInfoElem(section, elemParams[i][0], elemParams[i][1]);
    document.getElementById('info').appendChild(section);
}

function createInfoHTML(params) {
    document.getElementById('info').innerHTML = "";
    createSection('CPU', [
        ["Model name", params.modelname_cpu],
        ["Number of cores", params.cores_cpu],
        ["Manufacturer", params.manufacturer_cpu],
        ["Frequency", params.frequency_cpu + "Ghz"]]);

    createSection('Disk', [
        ["Model name", params.modelname_disk],
        ["Volume", params.volume_disk + "Gb"],
        ["Type", params.type_disk]]);

    createSection('Memory', [
        ["Model name", params.modelname_memory],
        ["Volume", params.volume_memory + "Gb"],
        ["Frequency", params.frequency_memory]]);

    createSection('Region', [
        ["Continent", params.continent],
        ["Country", params.country],
        ["City", params.city]]);
}

function getInfo() {

    var getCurrentUsage = new XMLHttpRequest();

    var params = encodeURIComponent(document.getElementById("idInput").value);

    getCurrentUsage.open('GET',
        'https://cloudviewkapi.azurewebsites.net/api/statistic/getCurrentUsage/'+params+'?code=aljX02ilPeWUo87i6IfHY975tm9ThHVaXdj9NQagNkrIQeIIoWaFKw==',
        true);

    getCurrentUsage.onreadystatechange = function () {
        if (getCurrentUsage.status == 200) {
            var info = JSON.parse(getCurrentUsage.responseText, function (key, value) {
                if (key == 'datatime') return new Date(value);
                return value;
            });
            changeUsage("cpuUsage", info.cpu);
            changeUsage("memoryUsage", info.memory);
            changeUsage("diskUsage", info.disk);
        } else {
            console.log("error");
        }

    };

    function changeUsage(id, data) {
        var usage = document.getElementById(id);
        usage.innerHTML = data + '%';
        usage.style = 'width:' + data + '%';
    }

    getCurrentUsage.send();

    var getMachineInfo = new XMLHttpRequest();

    var params =  encodeURIComponent(document.getElementById("idInput").value);

    getMachineInfo.open('GET',
        'https://cloudviewkapi.azurewebsites.net/api/machine/'+params+'?name=2345&code=3BYxXhfxZDiaVCZCXlIaLw9uQIkzarF/wwcDidN74AI/aAtzrIvJBQ==',
        true);

    getMachineInfo.onreadystatechange  = function () {
        if (getMachineInfo.status == 200) {
            var info = JSON.parse(getMachineInfo.responseText, function (key, value) {
                if (key == 'datatime') return new Date(value);
                return value;
            });
            createInfoHTML(info);
        } else {
            console.log("error");
        }

    };

    getMachineInfo.send();
}