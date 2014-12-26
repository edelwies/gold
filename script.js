function send(){
    var name = document.getElementById("name").value;
    var last_name = document.getElementById("last_name").value;
    var email = document.getElementById("email").value;
    var msg = document.getElementById("msg").value;

    window.open('mailto:mary@diamondriver.ir?subject=' + full_name + '&body=' + msg);

};
