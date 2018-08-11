var info = JSON.parse(localStorage.getItem("info"));
console.log(info[0].userName);
document.getElementById("myBtn1").innerHTML = "Hi " + info[0].userName;
$("#upload_success").hide();
// $("#action_btn").hide();
function log_out(){
  console.log('logout');
  // console.log(time);
  var postData = {
        'action' : 'logout',
        'email' : info[0].email
      }
      console.log(postData);
      $.ajax({
        type: 'POST',
        data: postData,
        url: "http://localhost/vishnu/userLogin.php",
        crossDomain: true,
        cache: false,
        success : function(responseText){
            $('#loading').hide();
          console.log(responseText);
          if (responseText == '1'){
            // alert('File uploaded successfully');
              window.location = "yourdrive2.html";
            // console.log(responseText);
          } else{
            alert(responseText);
          }
        },
        error: function(e){
            $('#loading').hide();
          console.log(e);
        }
      });
}

function previewFile() {
  document.getElementById('file_choosed').innerHTML = "";
  var preview = document.querySelector('img');
  var html = '';
  var file    = document.querySelector('input[type=file]').files;
  if(file.length > 5){
    alert("Choose a maximum of 5 files");
    document.getElementById('file').value = "";
  }else if(file.length > 1){
    var length = file.length - 1;
    console.log(length);
    for(var i=0; i<=length; i++){
      console.log(file[i].name);
      var type = file[i].type;
      console.log(file[i].type);
      if((type== "image/gif") 
        || (type == "image/jpeg") 
        || (type == "image/png")){
          html += '<div><img src="images/image.png" height="20px" width="20px">'+
        '<span class="pad_left_5 font_bold">'+ file[i].name+ '</span><div>';
      }else if((type == "application/msword") 
            || (type == "application/pdf") 
            || (type == "text/plain")
            || (type == "text/html") 
            || (type == "image/pjpeg")
            || (type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document")){
        html += '<div><img src="images/word.png" height="20px" width="20px">'+
        '<span class="pad_left_5 font_bold">'+ file[i].name+ '</span><div>';
      }else if((type == "audio/mp3")
            || (type == "audio/mpeg3")
            || (type == "audio/mpg")
            || (type == "audio/mpeg")
            || (type == "audio/x-mpeg")
            || (type == "audio/x-mpeg-3")
            || (type == "audio/x-mpegaudio")
            || (type == "audio/x-mp3")
            || (type == "audio/mpeg3")){
        html += '<div><img src="images/audio.png" height="20px" width="20px">'+
        '<span class="pad_left_5 font_bold">'+ file[i].name+ '</span><div>';
      }else if((type == "video/mpeg")
            || (type == "video/x-mpeg")
            || (type == "video/3gpp")
            || (type == "video/quicktime")
            || (type == "video/x-msvideo")
            || (type == "video/x-ms-wmv")
            || (type == "video/mp4")
            || (type == "video/x-flv")){
            html += '<div><img src="images/video.png" height="20px" width="20px">'+
        '<span class="pad_left_5 font_bold">'+ file[i].name+ '</span><div>';
      }
      
      document.getElementById('file_choosed').innerHTML = html;
    }
  }
  
}

function uploadFile(){
  $('#loading').show();
  // var reader = new FileReader();
  var file = document.getElementById("file").files;
  console.log(file);
    if (file.length > 0) {
      var length = file.length-1;
      for(var i=0; i<=length; i++){
        getBase64(file[i]);
      }
    }
}

function getBase64(file) {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
     // console.log(reader.result);
     var postData = {
        'action' : 'fileUpload',
        'id' : info[0].id,
        'file' : reader.result,
        'fileName' : file.name,
        'fileSize' : file.size,
        'fileType' : file.type,
        'path' : '',
        'dateModified' : file.lastModifiedDate
      }
      console.log(postData);
      $.ajax({
        type: 'POST',
        data: postData,
        url: "http://localhost/vishnu/upload.php",
        crossDomain: true,
        cache: false,
        success : function(responseText){
            $('#loading').hide();
          console.log(responseText);
          if(responseText== "0"){
            alert('upload failed');
          } else if (responseText == '1'){
            document.getElementById('file_choosed').innerHTML = "";
            $("#upload_success").show().delay(5000).fadeOut();
            // alert('File uploaded successfully');
            // location.reload();
            // console.log(responseText);
          } else{
            alert(responseText);
          }
        },
        error: function(e){
            $('#loading').hide();
          console.log(e);
        }
      });

   };
   reader.onerror = function (error) {
            $('#loading').hide();
     console.log('Error: ', error);
   };
}

function files(type){
  // $('#choose_file').css('display','none');
  $('#docs').css('display','block');
    // $('#up_back').css('display','block');
$('#loading').show();
console.log(type);
  var postData = {
     'action' : type,
     'id' : info[0].id
      }
      console.log(postData);
      $.ajax({
        type: 'POST',
        data: postData,
        url: "http://localhost/vishnu/getUserDoc.php",
        crossDomain: true,
        cache: false,
        success : function(responseText){
            $('#loading').hide();
          console.log(responseText);
          if (responseText){
            $('#action_btn').show();
            table(responseText);
          } else{
            alert('error in sql query \n' + responseText);
          }
        },
        error: function(e){
            $('#loading').hide();
          console.log(e.statusText);
          $('#files').empty();
          if(e.statusText === "error"){
            console.log('sadadsa');
            alert('Not connected to the server');
            $('#error').css('display','block');
          }else{
            $('#no_files').css('display','block');
            $('#action_btn').hide();
          }
          
        }
      });

}

function table(responseText){
  $('#no_files').css('display','none');
  // $('#action_btn').show();
  $('#files').empty();
  var table = $('<div></div>');
        for(i=0; i<responseText.length; i++){
          var ind = responseText[i].name.indexOf('.');
            var dateInd = responseText[i].dateUploaded.indexOf(' ');
            var lastInd = responseText[i].name.lastIndexOf('.');
            var sizeOfFile = (responseText[i].size / 1024).toFixed(2);
            var cbox = $('<div></div>').addClass('col-xs-1 col-sm-1 col-md-1 col-lg-1 display_cell pad_1p pad_bottom_13 pad_top_10 border_right_3px border_bottom_1px cursor_pointer font_0294ce').prepend(jQuery('<input type="checkbox" class="checkbox checkbox1"/>')
                        .attr({'value':responseText[i].file, 'name':responseText[i].name, 'date':responseText[i].dateUploaded}));
            var name = $('<div></div>').addClass('col-xs-4 col-sm-4 col-md-4 col-lg-4 display_cell pad_10 border_right_3px border_bottom_1px cursor_pointer font_0294ce overflow_hidden').prepend(jQuery('<span/>').attr({'onclick':"download(this,'name')",'value':responseText[i].file})
                        .text(responseText[i].name.substr(0,ind)));
            var size = $('<div></div>').addClass('col-xs-3 col-sm-2 col-md-2 col-lg-2 display_cell border_bottom_1px border_right_3px size_pad').text(sizeOfFile + " KB");
            var type = $('<div></div>').addClass('col-sm-1 col-md-1 col-lg-1 mob_dis border_bottom_1px').text(responseText[i].name.substr(lastInd+1));
            var date = $('<div></div>').addClass('col-xs-4 col-sm-2 col-md-2 col-lg-2 display_cell pad_10 border_bottom_1px date_border').text(responseText[i].dateUploaded.substr(0,dateInd));
            var download = $('<div></div>').addClass('col-sm-1 col-md-1 col-lg-1 action_cell').prepend(jQuery('<span/>').attr({'onclick':"download(this,'download')", 'value':responseText[i].file, 'name':responseText[i].name})
                           .text('Download'));
            var deleteFile = $('<div></div>').addClass('col-sm-1 col-md-1 col-lg-1 action_cell').prepend(jQuery('<span/>').attr({'onclick':"delete_file(this, 'single')", 'value':responseText[i].file, 'date':responseText[i].dateUploaded})
                              .text('Delete'));
            // var row = $('<div></div>').addClass('col-md-12 display_table row_full').attr('id','num_'+i);
            // var ind = responseText[i].name.indexOf('.');
            // var dateInd = responseText[i].dateUploaded.indexOf(' ');
            // var lastInd = responseText[i].name.lastIndexOf('.');
            // var sizeOfFile = (responseText[i].size / 1024).toFixed(2);
            // var cbox = $('<div></div>').addClass('col-md-1 col-xs-1 display_cell width_5p pad_10 pad_bottom_13 border_right_3px border_bottom_1px cursor_pointer font_0294ce').prepend(jQuery('<input type="checkbox" class="checkbox checkbox1"/>')
            //             .attr({'value':responseText[i].file, 'name':responseText[i].name, 'date':responseText[i].dateUploaded}));
            // var name = $('<div></div>').addClass('col-md-4 col-xs-4 display_cell pad_10 border_right_3px border_bottom_1px cursor_pointer font_0294ce').prepend(jQuery('<span/>').attr({'onclick':"download(this,'name')",'value':responseText[i].file})
            //             .text(responseText[i].name.substr(0,ind)));
            // var size = $('<div></div>').addClass('col-md-2 col-xs-2 display_cell pad_10 border_bottom_1px border_right_3px').text(sizeOfFile + " KB");
            // var type = $('<div></div>').addClass('col-md-1 col-xs-1 display_cell pad_10 border_bottom_1px border_right_3px').text(responseText[i].name.substr(lastInd+1));
            // var date = $('<div></div>').addClass('col-md-2 col-xs-2 display_cell pad_10 border_bottom_1px border_right_3px').text(responseText[i].dateUploaded.substr(0,dateInd));
            // var download = $('<div></div>').addClass('col-md-1 col-xs-1 display_cell width_10p font_0294ce pad_10 border_bottom_1px cursor_pointer').prepend(jQuery('<span/>').attr({'onclick':"download(this,'download')", 'value':responseText[i].file, 'name':responseText[i].name})
            //                .text('Download'));
            // var deleteFile = $('<div></div>').addClass('col-md-1 col-xs-1 display_cell width_10p font_0294ce pad_10 border_bottom_1px cursor_pointer').prepend(jQuery('<span/>').attr({'onclick':"delete_file(this, 'single')", 'value':responseText[i].file, 'date':responseText[i].dateUploaded})
            //                   .text('Delete'));
            table.append(cbox);
            table.append(name);
            table.append(size);
            table.append(type);
            table.append(date);
            table.append(download);
            table.append(deleteFile); 
      $('#files').append(table);
    }
}

$('#checkbox').click(function() {
  console.log('what');
   if(this.checked) {
       $(':checkbox').each(function() {
           this.checked = true;                        
       });
   } else {
      $(':checkbox').each(function() {
           this.checked = false;                        
       });
   } 
});

// function checkB(){
//   console.log('what2');
//   var ch = document.getElementsByClassName("checkbox1");
//   console.log(ch.length);
//   for(i=0; i<=ch.length; i++){
//       console.log(i);
//       if(ch[i].checked == true) {
//       console.log('what21');
//          $("#action_btn").show();
//          break;
//      }else {
//     console.log('i');
//       $("#action_btn").hide();
//       // break;
//    }
//   }
   
// }
// $('#checkB').click(function() {
//   console.log('what2');
//    if(this.checked) {
//        $("#action_btn").show();
//    } else {
//       $("#action_btn").hide();
//    } 
// }); 

function Del_all(){
  var result = confirm("Want to delete?");
  if (result) {
    downDel_all('delete');
  }
}

function downDel_all(select){
  var checkedValue = null; 
  var file_arr = new Array();
var inputElements = document.getElementsByClassName('checkbox1');
// console.log(inputElements.checked)
  for(var i=0; inputElements[i]; ++i){
        if(inputElements[i].checked){
         checkedValue = inputElements[i];
         console.log(checkedValue);
         var file = $(checkedValue).attr("value");
          var date = $(checkedValue).attr("date"); 
          file_arr.push({
            file : file,
            date : date
          })
          if(select == 'download'){
            download(checkedValue, 'download');
          }
         
        }
        // else 
  } 
        console.log(file_arr);
        if(select == 'delete'){
              delete_file(file_arr, 'many');
          }

}
//   var file = $("input[type='checkbox']:checked").val()
//   console.log(file);
// }
// function back_to_upload(){
//   $('#choose_file').css('display','block');  
//   $('#up_back').css('display','none');
//   $('#docs').css('display','none');
// }
function download(strBase64, select) {
  // console.log(strBase64);
  console.log(select);
  var x = strBase64;
    var file = $(x).attr("value");
    var filename = $(x).attr("name");
    // console.log(file);
    console.log(filename);
    var tmp = file.split(',');
    var prefix = tmp[0];
    var contentType = prefix.split(/[:;]+/)[1];
    var byteCharacters = atob(tmp[1]);

    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
         byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    var blob = new Blob([byteArray], {type: contentType});
    var blobUrl = URL.createObjectURL(blob);
    if(select === 'name'){
    // var tmp = x.split(",");
    
    window.open(blobUrl, "popup","width=1000,height=500,scrollbars=1,resizable=no," +
    "toolbar=no,directories=no,location=no,menubar=no,status=no,left=0,top=0");
  }else if(select === 'download'){
    console.log('hiya');
    saveAs(blob, filename);
  }
}

function delete_file(val, type){
//   var result = confirm("Want to delete?");
// if (result) {
  $('#loading').show();
  
  // var data = JSON.stringify(val);
  console.log("delete");
  if(type == 'many'){
    var postData = {
     'action' : 'deleteFile',
     'id' : info[0].id,
     'data' : val
      }
    }else if(type == 'single'){
       var result = confirm("Want to delete?");
      if (result) {
      var file_arr = new Array();
      // var x = ;
      var file = $(val).attr("value");
      var date = $(val).attr("date");
      file_arr.push({
            file : file,
            date : date
          })
      var postData = {
      'action' : 'deleteFile',
      'id' : info[0].id,
      'data' : file_arr
      }
    }
  }
  
      console.log(postData);
      $.ajax({
        type: 'POST',
        data: postData,
        url: "http://localhost/vishnu/deleteUserFiles.php",
        crossDomain: true,
        cache: false,
        success : function(responseText){
        $('#loading').hide();
          console.log(responseText);
          if(responseText== "0"){
            alert('Incorrect login information');
          } else if (responseText == 1){
            console.log('ok');
            console.log(responseText);
            location.reload();
          } else{
            alert('error in sql query \n' + responseText);
          }
        },
        error: function(e){
          $('#loading').hide();
          console.log(e);
        }
      });
    // }
}

function folderview(){
   window.location="folderview.html?login=true&token=" + info[0].auth;
}




// function folder(){
//   var postData = {
//      'action' : 'folderView'
//       }
//       console.log(postData);
//       $.ajax({
//         type: 'POST',
//         data: postData,
//         url: "http://localhost/vishnu/openDirectory.php",
//         crossDomain: true,
//         cache: false,
//         success : function(responseText){
//         $('#loading').hide();
//           console.log(responseText);
          
//         },error : function(e){
//           console.log(e);
//         }
// })
// }



// function auds(){
//   console.log('auds');
//   window.location.assign('http://localhost/vishnu/uploads/CYMERA_20161031_194653.jpg');
// }

// $(function() {
//     // setTimeout() function will be fired after page is loaded
//     // it will wait for 5 sec. and then will fire
//     // $("#successMessage").hide() function
//     setTimeout(function() {
//         $("#upload_success").hide('blind', {}, 500)
//     }, 5000);
// });

function changeBg(color) {
    document.body.style.backgroundColor = color;
}