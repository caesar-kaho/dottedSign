$(document).ready(function() {
	// swich the background
	$('#menu-tab .nav-item').click(function() {
		$('body').removeClass();
		var newClass = $(this).attr('tab-name');
		$('body').toggleClass(newClass);
	});
	$('.tool button').click(function() {
		$('.tool button').removeClass();
		$(this).addClass('tool-active');
	});
	//select color
	$('#selectColor').click(function() {
		$('#changeColor').click();
		$("input[type=color]").change(function(e){ alert(e.target.value); });
	});
    var dragUpload = function() {
    	//drag image and update
    	$('#select-file-text').click(function(e) {
    	    //$('#get_file').click();
    	    $('input#get_file').change(function(e){
    	        var imgName = e.target.files[0].name;
    	        $("#update-name-img").append("<img src='img/icon-img.svg' alt='img'> <b>已選擇圖片</b>"
    	        	+ imgName + "<button id='upload-submit' title='上傳檔案'><img src='img/icon-upload.svg' alt='upload'></button>");
    	    });
    	});
    	$('#select-pdf-text').click(function(e) {
    	    //$('#get_pdf').click();
    	    $('input#get_pdf').change(function(e){
    	        var pdfName = e.target.files[0].name;
    	        $("#update-name-pdf").append("<img src='img/icon-pdf.svg' alt='pdf'> <b>已選擇檔案</b>"
    	        	+ pdfName + "<button id='upload-submit' title='上傳檔案'><img src='img/icon-upload.svg' alt='upload'></button>");
    	    });
    	});

    	$("#drag-update").on('dragenter', function(ev) {
    	      // Entering drop area. Highlight area
    	      $("#drag-update").addClass("dragging");
    	  });
    	  
    	  $("#drag-update").on('dragleave', function(ev) {
    	    // Going out of drop area. Remove Highlight
    	    $("#drag-update").removeClass("dragging");
    	  });
    	  
    	  $("#drag-update").on('drop', function(ev) {
    	    // Dropping files
    	    ev.preventDefault();
    	    ev.stopPropagation();
    	    // Clear previous messages
    	    $("#update-name-img").empty();
    	    $("#update-name-pdf").empty();
    	    if(ev.originalEvent.dataTransfer){
    	      if(ev.originalEvent.dataTransfer.files.length) {
    	        var droppedFiles = ev.originalEvent.dataTransfer.files;
    	        for(var i = 0; i < droppedFiles.length; i++)
    	        {
    	        	var filesType = droppedFiles[i].type.substring(12);
    	          	console.log(droppedFiles[i]);
    	          	console.log(filesType);	          	
    	          	if (droppedFiles[i].type.search("pdf")){
    	          		$("#update-name-pdf").append("<img src='img/icon-pdf.svg' alt='pdf'> <b>已選擇檔案</b>"
    	          			+ droppedFiles[i].name+
    	          			"<button id='upload-submit' title='上傳檔案'><img src='img/icon-upload.svg' alt='upload'></button>");
    	          		// Upload droppedFiles[i] to server
    	          	} else {
    	          		$("#update-name-img").append("<img src='img/icon-img.svg' alt='img'><b>已選擇圖片</b>"
    	          			+ droppedFiles[i].name+
    	          			"<button id='upload-submit' title='上傳檔案'><img src='img/icon-upload.svg' alt='upload'></button>");
    	          	}
    	          	
    	          	
    	        }
    	      }
    	    }

    	    $("#drag-update").removeClass("dragging");
    	    return false;
    	  });
    	  
    	  $("#drag-update").on('dragover', function(ev) {
    	      ev.preventDefault();
    	  });
    }
    dragUpload()

});
