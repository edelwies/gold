function send(){
    var name = document.getElementById("name").value;
    var last_name = document.getElementById("last_name").value;
    var email = document.getElementById("email").value;
    var msg = document.getElementById("msg").value;

    alert('I will send a message to "mary@diamondrive.ir" using: (from:'+ email + ') \nMessage: ' + msg);
};
