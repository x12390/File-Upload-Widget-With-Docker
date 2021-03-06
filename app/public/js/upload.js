$(function () {
	// Attach the 'fileselect' event to all file inputs on the page
	$(document).on('change', ':file', function () {
		var input = $(this),
		numFiles = input.get(0).files ? input.get(0).files.length : 1,
		label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
		input.trigger('fileselect', [numFiles, label]);
	});

	// Watch for the custom 'fileselect' event
	$(':file').on('fileselect', function (event, numFiles, label) {
		var input = $(this).parents('.input-group').find(':text'),
		log = numFiles > 1 ? numFiles + ' files selected' : label;

		if (input.length) {
			input.val(log);
		} else {
			if (log)
				alert(log);
		}
	});

	//submit form
	$('form#uploadForm').submit(function (event) {
		// Disable the default form submission
		event.preventDefault();
		console.log("FORM SUBMIT EVENT.");
		$("#status").empty().text("File is uploading...");
		// Gat all form data
		var formData = new FormData($(this)[0]);
		$('input').each(function () {
			formData.append($(this).attr('id'), $(this).val());
		});
		// Submit form to Domino server using specified form
		$.ajax({
			url : '/api/file',
			type : 'POST',
			data : formData,
			async : false,
			cache : false,
			contentType : false, // Important!
			processData : false, // Important!
			success : function (returndata) {

				$("#status").empty().text("File successfully uploaded.");
				console.log(returndata);
			}
		});
		return false;
	});

}); // END JQUERY BLOCK