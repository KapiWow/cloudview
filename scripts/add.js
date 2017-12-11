function add() {
    var getMachineInfo = new XMLHttpRequest();

    var CPU =  encodeURIComponent(document.getElementById("CPU").value).replace(/%20/g, ' ');
    var Disk =  encodeURIComponent(document.getElementById("Disk").value).replace(/%20/g, ' ');
    var Memory =  encodeURIComponent(document.getElementById("Memory").value).replace(/%20/g, ' ');
    var City =  encodeURIComponent(document.getElementById("City").value).replace(/%20/g, ' ');

    var sqlquerry = 'https://cloudviewkapi.azurewebsites.net/api/machine/add?code=mwwfKQEOMuZB9di86Ioztm8snF/OW1EplslTrBBiXLa2pDJ6z/hUMA==';
    getMachineInfo.open('POST',
        sqlquerry,
        true);

    var body = {
        "CPU" : CPU,
        "Disk" : Disk,
        "Memory" : Memory,
        "City" : City
    }
    console.log(body.CPU);
    getMachineInfo.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    getMachineInfo.onreadystatechange  = function () {
        if (getMachineInfo.status == 200) {
            var info = getMachineInfo.responseText;
            console.log(info);
        } else {
            console.log("error");
        }

    };
    getMachineInfo.send(JSON.stringify(body));
}

function deleteMachine() {

    var getMachineInfo = new XMLHttpRequest();

    var id =  encodeURIComponent(document.getElementById("del").value).replace(/%20/g, ' ');

    var sqlquerry = 'https://cloudviewkapi.azurewebsites.net/api/machine/delete/'+id+'?code=WPwq9iDwz8uQ45aksaWawwdmQ6QMeoCjJucoDsxgLv1auOJazogmHw==';
    getMachineInfo.open('DELETE',
        sqlquerry,
        true);

    getMachineInfo.onreadystatechange  = function () {
        if (getMachineInfo.status == 200) {
            var info = getMachineInfo.responseText;
        } else {
            console.log("error");
        }

    };
    getMachineInfo.send();
}