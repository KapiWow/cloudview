window.addEventListener('load', function () {

    var locationChart = new XMLHttpRequest();

    locationChart.open('GET',
        'https://cloudviewkapi.azurewebsites.net/api/statistic/getCharts/location?code=w7sR6u/N/nqSM3foecfC8gJxyPdaabRk2Hvlq0FY8SPF6J0wtG7CCQ==',
        true);


    locationChart.onreadystatechange = function () {

    };

    locationChart.send();

    var webAuth = new auth0.WebAuth({
        domain: 'kapiwow.eu.auth0.com',
        clientID: 'siHY5FdUCzyQqExU2CXS4D6jtonsfnNy',
        responseType: 'token id_token',
        audience: 'https://kapiwow.eu.auth0.com/userinfo',
        scope: 'openid',
        redirectUri: window.location.href
    });

    var loginBtn = document.getElementById('btn-login');

    loginBtn.addEventListener('click', function (e) {
        e.preventDefault();
        webAuth.authorize();
    });

    // buttons and event listeners
    var loginBtn = document.getElementById('btn-login');
    var logoutBtn = document.getElementById('btn-logout');

    logoutBtn.addEventListener('click', logout);

    function handleAuthentication() {
        webAuth.parseHash(function (err, authResult) {
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                setSession(authResult);
                loginBtn.style.display = 'none';
            } else if (err) {
                console.log(err);
                alert(
                    'Error: ' + err.error + '. Check the console for further details.'
                );
            }
            displayButtons();
        });
    }

    function setSession(authResult) {
        // Set the time that the access token will expire at
        var expiresAt = JSON.stringify(
            authResult.expiresIn * 1000 + new Date().getTime()
        );
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    }

    function logout() {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        displayButtons();
    }

    function isAuthenticated() {
        // Check whether the current time is past the
        // access token's expiry time
        var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    function displayButtons() {
        if (isAuthenticated()) {
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'inline-block';
        } else {
            loginBtn.style.display = 'inline-block';
            logoutBtn.style.display = 'none';
        }
    }

    handleAuthentication();
});