function add() {
    var addMachine = new XMLHttpRequest();

    var CPU =  encodeURIComponent(document.getElementById("CPU").value).replace(/%20/g, ' ');
    var Disk =  encodeURIComponent(document.getElementById("Disk").value).replace(/%20/g, ' ');
    var Memory =  encodeURIComponent(document.getElementById("Memory").value).replace(/%20/g, ' ');
    var City =  encodeURIComponent(document.getElementById("City").value).replace(/%20/g, ' ');

    var sqlquerry = 'https://cloudviewkapi.azurewebsites.net/api/machine/add?code=mwwfKQEOMuZB9di86Ioztm8snF/OW1EplslTrBBiXLa2pDJ6z/hUMA==';
    addMachine.open('POST',
        sqlquerry,
        true);

    var body = {
        "CPU" : CPU,
        "Disk" : Disk,
        "Memory" : Memory,
        "City" : City
    }
    console.log(body.CPU);
    addMachine.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    addMachine.onreadystatechange  = function () {
        if (addMachine.status == 200) {
            var info = addMachine.responseText;
            console.log(info);
            if (info == "0")
                alert(info);
        } else {
            console.log("error");
        }

    };
    addMachine.send(JSON.stringify(body));
}

function deleteMachine() {

    var deleteMachine = new XMLHttpRequest();

    var id =  encodeURIComponent(document.getElementById("del").value).replace(/%20/g, ' ');

    var sqlquerry = 'https://cloudviewkapi.azurewebsites.net/api/machine/delete/'+id+'?code=WPwq9iDwz8uQ45aksaWawwdmQ6QMeoCjJucoDsxgLv1auOJazogmHw==';
    deleteMachine.open('DELETE',
        sqlquerry,
        true);

    deleteMachine.onreadystatechange  = function () {
        if (deleteMachine.status == 200) {
            var info = deleteMachine.responseText;
            console.log(info);
            if (info == "0")
                alert(info);
        } else {
            console.log("error");
        }

    };
    deleteMachine.send();
}

function update() {

    var updateMachine = new XMLHttpRequest();

    var id =  encodeURIComponent(document.getElementById("update").value).replace(/%20/g, ' ');
    var type = document.getElementById("updateType").value;
    var model = document.getElementById("model").value;

    var sqlquerry = 'https://cloudviewkapi.azurewebsites.net/api/machine/update?code=0S05TGtB03nbZE/RpSN7hmmSt18SNvg1XkrtyBt/Yd8bacYZiLhmpQ==';
    updateMachine.open('PUT',
        sqlquerry,
        true);


    var body = {
        "id" : id,
        "type" : type,
        "model" : model
    }
    updateMachine.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    updateMachine.onreadystatechange  = function () {
        if (updateMachine.status == 200) {
            var info = updateMachine.responseText;
            console.log(info);
            if (info == "0")
                alert(info);
        } else {
            console.log("error");
        }

    };
    updateMachine.send(JSON.stringify(body));

}