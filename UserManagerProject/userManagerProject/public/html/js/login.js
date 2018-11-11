var login = function() {
    var userName = document.getElementById("userName").value;
    var password = document.getElementById("password").value;
    if (!userName || !password) {
        return;
    }
    $.post('http://localhost:8888/checkUser', {
        userName: userName,
        password: password
    }, function(result) {
        if (result.errorStr) {
            alert(result.errorStr);
            return;
        }
        if (result.ret !== 1) {
            return;
        }
        localStorage.setItem('userType', result.userType);
        switch (result.userType) {
            case 1:
                window.location.href = 'html_1.html';
                break;
            case 2:
                window.location.href = 'html_1.html';
                break;
            case 3:
                break;
        }
    }, "json");
};

(function() {

})();