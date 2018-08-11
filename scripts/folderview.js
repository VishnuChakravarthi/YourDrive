var info = JSON.parse(localStorage.getItem("info"));

document.getElementById("myBtn1").innerHTML = "Hi " + info[0].userName;
localStorage.setItem("path","uploads/"+info[0].id+"/")

window.onload = function() {
  var path = localStorage.getItem("path");
  folderview(path);
};

function userarea(){
   window.location="yourdrive3.html?login=true&token=" + info[0].auth;
}

var path = localStorage.getItem("path");

function folderview(path){
  $('#loading').show();
  $('#fol_view').show();
  // $('#sep_view').hide();
  var postData = {
     'action' : 'folderview',
     'id' : info[0].id,
     'path' : path
      }
      localStorage.setItem("path",path);
      console.log(postData);
      $.ajax({
        type: 'POST',
        data: postData,
        url: "http://localhost/vishnu/folderview.php",
        crossDomain: true,
        cache: false,
        success : function(responseText){
            $('#loading').hide();
            var folFile = JSON.parse(responseText);
          console.log(folFile[2]);
          folderTable(folFile[0], folFile[1]);
          if(folFile[0].length == 0 && folFile[1].length == 0){
            $('#no_files').show();
          }
        },
        error: function(e){
          $('#loading').hide();
          console.log(e);
        }
      });
}

function folderTable(responseText1, responseText2){
  $('#no_files').css('display','none');
  // $('#action_btn').show();
  $('#folder_alone').empty();
  $('#file_alone').empty();

  var table_folder = $('<div></div>');
        for(i=0; i<responseText1.length; i++){
          console.log(responseText1[i]);
          var row = $('<div></div>').addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12 pad_0');
            var cbox = $('<div></div>').prepend('<i/>').attr({'onclick':"download(this,'name')", 'class':"col-xs-1 col-sm-1 col-md-1 col-lg-1 display_cell pad_1p pad_top_15 cursor_pointer font_ffd700 fa fa-folder-open font_size_30"});
            var name = $('<div></div>').addClass('col-xs-10 col-sm-10 col-md-10 col-lg-10 display_cell pad_10 cursor_pointer font_size_24 overflow_hidden')
                        .attr({'onclick':"go_to_folder(this.innerHTML)"}).text(responseText1[i]); 

            // var download = $('<div></div>').addClass('col-sm-1 col-md-1 col-lg-1 action_cell').prepend(jQuery('<span/>').attr({'onclick':"download(this,'download')", 'value':responseText[i].file, 'name':responseText[i].name})
            //                .text('Download'));
            var deleteFolder = $('<div></div>').addClass('col-sm-1 col-md-1 col-lg-1')
                              .prepend(jQuery('<span/>').attr({'onclick':"delete_file(this, 'single')", 'value':responseText2[i], 'class':"pad_1p pad_bottom_13 pad_top_10 cursor_pointer font_05FCF0 fa fa-trash font_size_30"}));
            table_folder.append(row);
            table_folder.append(cbox);
            table_folder.append(name);
            // table_folder.append(download);
            table_folder.append(deleteFolder); 
      $('#folder_alone').append(table_folder);
    }
    var table_file = $('<div></div>').addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12 pad_0');
        for(i=0; i<responseText2.length; i++){
          console.log(responseText2[i]);
          var row = $('<div></div>').addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12 pad_0');
            var cbox = $('<div></div>').prepend('<i/>').attr({'onclick':"download(this,'name')", 'class':" col-xs-1 col-sm-1 col-md-1 col-lg-1 display_cell pad_1p pad_bottom_13 pad_top_10 cursor_pointer font_e15720 fa fa-file font_size_30"});
            var name = $('<div></div>').addClass('col-xs-9 col-sm-9 col-md-9 col-lg-9 display_cell pad_10 cursor_pointer font_size_24 overflow_hidden')
                        .text(responseText2[i]); 
            var download = $('<div></div>').addClass('col-sm-1 col-md-1 col-lg-1 display_cell')
                            .prepend(jQuery('<span/>').attr({'onclick':"downloadF(this)", 'name':responseText2[i], 'class':"pad_1p pad_bottom_13 pad_top_10 cursor_pointer font_05FCF0 fa fa-download font_size_30"}));
            var deleteFile = $('<div></div>').addClass('col-sm-1 col-md-1 col-lg-1')
                              .prepend(jQuery('<span/>').attr({'onclick':"delete_fileF(this)", 'name':responseText2[i], 'class':"pad_1p pad_bottom_13 pad_top_10 cursor_pointer font_05FCF0 fa fa-trash font_size_30"}));
            table_file.append(row);
            table_file.append(cbox);
            table_file.append(name);
            table_file.append(download);
            table_file.append(deleteFile); 
      $('#file_alone').append(table_file);

    }
}

function go_to_folder(folder){
  var path = localStorage.getItem("path");
  console.log(folder);
  var newpath = path + folder+'/';
   console.log(newpath);
   folderview(newpath);
}

  console.log(path);

function up_one_folder(){
  // var stop_path = "uploads/"+info[0].id+"/";
  var path = localStorage.getItem("path");
  path = path.substr(0, path.lastIndexOf("/"));
  path = path.substr(0, path.lastIndexOf("/"));
  console.log(path+'/');
  // console.log(stop_path);
  localStorage.setItem("path",path+'/');
  var newpath = localStorage.getItem("path");
  console.log(newpath);
  if(newpath == "uploads/"){
    localStorage.setItem("path","uploads/"+info[0].id+"/");
    console.log(localStorage.getItem("path"));
    // localStorage.setItem("path",path+'/');
    return;
  }else{
    folderview(newpath);
  }
}

function create_folder(){
  var name = document.getElementById("folder_name").value;
  var path = localStorage.getItem("path");
  console.log(name);
$('#loading').show();
  var postData = {
     'action' : 'create_folder',
     'id' : info[0].id,
     'folder_name' : name,
     'path' : path
      }
      // localStorage.setItem("path",path);
      console.log(postData);
      $.ajax({
        type: 'POST',
        data: postData,
        url: "http://localhost/vishnu/createFolder.php",
        crossDomain: true,
        cache: false,
        success : function(responseText){
            $('#loading').hide();
            console.log(responseText);
            if(responseText == 1){
              alert("Folder created successfully");
              $('#create_folder_modal').modal('hide');
              location.reload();
            }else if(responseText == 0){
              alert("Folder already exixts");
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

function upload(){
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
  var path = localStorage.getItem("path");
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
        'path' : path,
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
            // $("#upload_success").show().delay(5000).fadeOut();
            // alert('File uploaded successfully');
            // location.reload();
            console.log(responseText);
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

function downloadF(filename){
  var name = $(filename).attr("name");
  var path = localStorage.getItem("path");
  console.log(name);
$('#loading').show();
  var postData = {
     'action' : 'download_file',
     'id' : info[0].id,
     'file_name' : name,
     'path' : path
      }
      // localStorage.setItem("path",path);
      console.log(postData);
      $.ajax({
        type: 'POST',
        data: postData,
        url: "http://localhost/vishnu/downDelFolView.php",
        crossDomain: true,
        cache: false,
        success : function(responseText){
            $('#loading').hide();
            console.log(responseText);
            var tmp = responseText.split(',');
            var prefix = tmp[0];
            var contentType = prefix.split(/[:;]+/)[1];
            var byteCharacters = atob(tmp[1]);

            var byteNumbers = new Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
                 byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            var blob = new Blob([byteArray], {type: contentType});
            // var blobUrl = URL.createObjectURL(blob);
          //   if(select === 'name'){
          //   // var tmp = x.split(",");
            
          //   window.open(blobUrl, "popup","width=1000,height=500,scrollbars=1,resizable=no," +
          //   "toolbar=no,directories=no,location=no,menubar=no,status=no,left=0,top=0");
          // }else if(select === 'download'){
          //   console.log('hiya');
            saveAs(blob, name);
          // }
        },
        error: function(e){
          $('#loading').hide();
          console.log(e);
        }
      });
}