// Sign_in modal window
var modal = document.getElementById('myModal');
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
// var span1 = document.getElementsByClassName("close_btn_modal")[0];
btn.onclick = function() {
    modal.style.display = "block";
}
span.onclick = function() {
    modal.style.display = "none";
    document.getElementById("alert_box1").innerHTML = "";
}
// span1.onclick = function() {
//     modal.style.display = "none";
//     document.getElementById("alert_box1").innerHTML = "";
// }


// Validating sign in form
function validateForm() {
  $('#loading').show();
  var x = document.getElementById('email1').value;
  var y = document.getElementById('password1').value;
  var atpos = x.indexOf("@");
  var dotpos = x.lastIndexOf(".");
  if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
      document.getElementById("alert_box1").innerHTML = "Please enter correct email address";
  }else if(y == 0){
    document.getElementById("alert_box1").innerHTML = "Please enter password";
  }else if (x != '' && y !=''){
            console.log(x);
          console.log(y);

      var postData = {
        'action' : 'login',
        'email' : x,
        'password' : y
        }
      console.log(postData);
      $.ajax({
        type: 'POST',
        data: postData,
        url: "/vishnu/userLogin.php",
        crossDomain: false,
        cache: false,
                  
        success : function(responseText){
          console.log(responseText);
          if(responseText== "0"){
            $('#loading').hide();
            alert('Incorrect login information');
          } else if (responseText){
            window.location="yourdrive3.html?login=true&token=" + responseText[0].auth;
            localStorage.setItem("info", JSON.stringify(responseText));
            console.log(responseText[0].userName);
            $('#loading').hide();
          } else{
            $('#loading').hide();
            alert('error in sql query \n' + responseText);
          }
        },
        error: function(e){
          $('#loading').hide();
          console.log(e);
        }
      });
    } else return false;
}

function forgot_password(){
  $("#forget_pass").css("display","block");
  modal.style.display = "none";
   $('html,body').animate({
        scrollTop: $("#reg_btn").offset().top},
        'slow');
}

function close_fpass(){
  $("#forget_pass").css("display","none");
}

// Updates the button value with dropdown value in register pane
$(".dropdown-menu li a").click(function(e){
  $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
  $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
  e.preventDefault();
});

// To check the length of password on register pane
$('#pword').on("input", function() {
  var input = this.value;
  if(input.length <= 8){
    document.getElementById('pass_suf').className = "";
    document.getElementById('pass_suf').className += 'fa fa-times-circle font_red font_size_25'
  }else{
    document.getElementById('pass_suf').className = "";
    document.getElementById('pass_suf').className += 'fa fa-check-circle font_green font_size_25'
  }
});

$('#pword2').on("input", function() {
  var input = this.value;
  if(input.length <= 8){
    document.getElementById('pass_suf1').className = "";
    document.getElementById('pass_suf1').className += 'fa fa-times-circle font_red font_size_25'
  }else{
    document.getElementById('pass_suf1').className = "";
    document.getElementById('pass_suf1').className += 'fa fa-check-circle font_green font_size_25'
  }
});

// Checking both password and confirm password are same
function match(){
  var pass = document.getElementById("pword").value;
  var cpword = document.getElementById("cpword").value;
  var pass2 = document.getElementById("pword2").value;
  var cpword1 = document.getElementById("cpword1").value;

  if(pass.length != 0 && cpword.length != 0 && pass == cpword){
    document.getElementById('suffix').className = "";
    document.getElementById('suffix').className += 'fa fa-check-circle font_green font_size_25'
  }else if(pass2.length != 0 && cpword1.length != 0 && pass2 == cpword1){
    document.getElementById('suffix1').className = "";
    document.getElementById('suffix1').className += 'fa fa-check-circle font_green font_size_25'
  // }else if(pass.length == 0 && cpword.length == 0){
  //   alert("Please enter valid password")
  // }else if(pass1.length == 0 && cpword1.length == 0){
  //   alert("Please enter valid passwordqqqqqqq")
  }else if(pass != cpword){
    document.getElementById('suffix').className = "";
    document.getElementById('suffix').className += 'fa fa-times-circle font_red font_size_25'
    // alert("Password does not match");
  }else if(pass2 != cpword1){
    document.getElementById('suffix1').className = "";
    document.getElementById('suffix1').className += 'fa fa-times-circle font_red font_size_25'
  }
  return false
}

// Validating the info of new user who is registering
function register(){
  console.log("hello");
  var fname = document.getElementById("first_name").value;
  var lname = document.getElementById("last_name").value;
  var uname = document.getElementById("uname").value;
  var email = document.getElementById("email").value;
  var atpos = email.indexOf("@");
  var dotpos = email.lastIndexOf(".");
  var pass = document.getElementById("pword").value;
  var cpword = document.getElementById("cpword").value;
  var s_ques = document.getElementById("dropdownMenuQ").innerHTML.substr(0,6);
  console.log(s_ques);
  var s_ans = document.getElementById("answer").value;
  
  if(fname == 0 || uname == 0 || email == 0 || pass == 0 || cpword == 0 || s_ans == 0){
    $("#answer").css("margin-bottom","0px");
    document.getElementById("alert_box").innerHTML = "Please fill all fields containing '*'"
  }else if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length){
    $("#answer").css("margin-bottom","0px");
    document.getElementById("alert_box").innerHTML = "Please enter correct email address"
  }else if(s_ques == "Sec"){
    console.log("seci")
    $("#answer").css("margin-bottom","0px");
    document.getElementById("alert_box").innerHTML = "Please select a secret question"
  }else if(pass != cpword){
    $("#answer").css("margin-bottom","0px");
    document.getElementById("alert_box").innerHTML = "Passwords do not match"
  }else if (fname != '' && email !=''){
    document.getElementById("alert_box").innerHTML = ""
            console.log(fname);
          console.log(email);
  $('#loading').show();

          var postData = 
                {   
                    "action" : "register",
                    "firstName":fname,
                    "lastName":lname,
                    "userName":uname,
                    "email":email,
                    "password":pass,
                    "secret_q":s_ques,
                    "secret_a":s_ans,
                }

      console.log(postData);
      $.ajax({
        type: 'POST',
        data: postData,
        url: "/vishnu/addUser.php",
        crossDomain: false,
        cache: false,
        success : function(responseText){
          $('#loading').hide();
          console.log(responseText);
          if(responseText== "0"){
            // alert('Mail id is already connected with another account');
            $("#answer").css("margin-bottom","20px");
            document.getElementById("alert_box").innerHTML = "Mail id is already connected with another account. Click sign in to open account"
          } else if (responseText == "1"){
            $("#answer").css("margin-bottom","20px");
            document.getElementById("alert_box").innerHTML = ""
            alert("Registered successfully");
            location.reload();
          }
        },
        error : function(e){
          $('#loading').hide();
          console.log(e);
        }
      });
    } else return false;
}

function check_email(){
  var email = document.getElementById("email2").value;
  var atpos = email.indexOf("@");
  var dotpos = email.lastIndexOf(".");
  console.log(email);
  if(email == 0){
    $("#email2").css("margin-bottom","10px");
    document.getElementById("forgot_pass_alert").innerHTML = "Please enter email";
    $("#forgot_pass_alert").css("margin-bottom","10px");
  }else if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length){
    $("#email2").css("margin-bottom","10px");
    document.getElementById("forgot_pass_alert").innerHTML = "Please enter correct email address";
    $("#forgot_pass_alert").css("margin-bottom","10px");
  }else if (email !=''){
            // console.log(fname);
          console.log(email);
  $('#loading').show();
          
          var postData = 
                {   
                  "action":"check_email",
                  "email":email
                }

      console.log(postData);
      $.ajax({
        type: 'POST',
        data: postData,
        url: "/vishnu/resetPassword.php",
        crossDomain: false,
        cache: false,
        success : function(responseText){
          $('#loading').hide();
          console.log(responseText);
          if(responseText == 0){
            alert("Invalid Email Id");
          }else{
            document.getElementById("forgot_pass_alert").innerHTML = "";
           $("#confirm_email").css("display","none");
            $("#sec_que").css("display","block");
          if(responseText== "Mother"){
            document.getElementById("se_q").innerHTML = "What is your mother's maiden name"
          }else if(responseText== "My fat"){
            document.getElementById("se_q").innerHTML = "what is your father's pet name"
          }else if(responseText== "My fav"){
            document.getElementById("se_q").innerHTML = "What is your favourite teacher name"
          }
          }
          
        },
        error : function(e){
            $('#loading').hide();
          console.log(e);
        }
      });
    }
}

function check_det(){
  var email = document.getElementById("email2").value;
  var atpos = email.indexOf("@");
  var dotpos = email.lastIndexOf(".");
  var answer = document.getElementById("answer1").value;
  if(email == 0){
    $("#answer1").css("margin-bottom","10px");
    document.getElementById("forgot_pass_alert1").innerHTML = "Please enter email";
    $("#forgot_pass_alert1").css("margin-bottom","10px");
  }else if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length){
    $("#answer1").css("margin-bottom","10px");
    document.getElementById("forgot_pass_alert1").innerHTML = "Please enter correct email address";
    $("#forgot_pass_alert1").css("margin-bottom","10px");
  }else if(answer == 0){
    $("#answer1").css("margin-bottom","10px");
    document.getElementById("forgot_pass_alert1").innerHTML = "Please enter answer";
    $("#forgot_pass_alert1").css("margin-bottom","10px");
  }else if (email !='' && answer !=''){
            console.log(answer);
          console.log(email);
  $('#loading').show();

          var postData = 
                { "action":"check_det",
                  "email":email,
                  "answer":answer
                }

      console.log(postData);
      $.ajax({
        type: 'POST',
        data: postData,
        url: "/vishnu/resetPassword.php",
        crossDomain: false,
        cache: false,
        success : function(responseText){
          $('#loading').hide();
          console.log(responseText);
          if(responseText == 1){
            document.getElementById("forgot_pass_alert1").innerHTML = "";
           $("#confirm_email").css("display","none");
            $("#sec_que").css("display","none");
            $("#change_password").css("display","block");
          }else{
            alert('Wrong answer');
          }
            
        },
        error : function(e){
          $('#loading').hide();
          console.log(e);
        }
      });
    }
}

function change_pword(){
  var email = document.getElementById("email2").value;
  var atpos = email.indexOf("@");
  var dotpos = email.lastIndexOf(".");
  var password = document.getElementById("pword2").value;
  var cpword = document.getElementById("cpword1").value;

  if(email == 0){
    $("#cpword1").css("margin-bottom","0px");
    document.getElementById("forgot_pass_alert2").innerHTML = "Please enter email"
  }else if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length){
    $("#cpword1").css("margin-bottom","0px");
    document.getElementById("forgot_pass_alert2").innerHTML = "Please enter correct email address"
  }else if(password != cpword){
    $("#cpword1").css("margin-bottom","0px");
    document.getElementById("forgot_pass_alert2").innerHTML = "Passwords do not match"
  }else if (email !=''){
            console.log(password);
          console.log(email);
  $('#loading').show();

          var postData = 
                {   "action":"change_pword",
                  "email":email,
                  "password":password
                }

      console.log(postData);
      $.ajax({
        type: 'POST',
        data: postData,
        url: "/vishnu/resetPassword.php",
        crossDomain: false,
        cache: false,
        success : function(responseText){
          $('#loading').hide();
          console.log(responseText);
            $("#forget_pass").css("display","none");
          alert("Password Changed")
        },
        error : function(e){
          $('#loading').hide();
          console.log(e);
        }
      });
    }
}
// function $id(id) {
//   return document.getElementById(id);
// }

// //
// // output information
// function Output(msg) {
//   var m = $id("messages");
//   m.innerHTML = msg + m.innerHTML;
// }

// // call initialization file
// if (window.File && window.FileList && window.FileReader) {
//   Init();
// }

// //
// // initialize
// function Init() {

//   var fileselect = $id("fileselect"),
//     filedrag = $id("filedrag"),
//     submitbutton = $id("submitbutton");

//   // file select
//   fileselect.addEventListener("change", FileSelectHandler, false);

//   // is XHR2 available?
//   var xhr = new XMLHttpRequest();
//   if (xhr.upload) {
  
//     // file drop
//     filedrag.addEventListener("dragover", FileDragHover, false);
//     filedrag.addEventListener("dragleave", FileDragHover, false);
//     filedrag.addEventListener("drop", FileSelectHandler, false);
//     filedrag.style.display = "block";
    
//     // remove submit button
//     submitbutton.style.display = "none";
//   }

// }

// function FileDragHover(e) {
//   e.stopPropagation();
//   e.preventDefault();
//   e.target.className = (e.type == "dragover" ? "hover" : "");
// }

// // file selection
// function FileSelectHandler(e) {

//   // cancel event and hover styling
//   FileDragHover(e);

//   // fetch FileList object
//   var files = e.target.files || e.dataTransfer.files;

//   // process all File objects
//   for (var i = 0, f; f = files[i]; i++) {
//     ParseFile(f);
//   }

// }

// function ParseFile(file) {

//   Output(
//     "<p>File information: <strong>" + file.name +
//     "</strong> type: <strong>" + file.type +
//     "</strong> size: <strong>" + file.size +
//     "</strong> bytes</p>"
//   );
  
// }


