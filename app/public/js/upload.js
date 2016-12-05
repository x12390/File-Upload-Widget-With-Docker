jQuery(function () {
	var serverFQDN = 'http://provider.dev:9001';

	// Attach the 'fileselect' event to all file inputs on the page
	jQuery(document).on('change', ':file', function () {
		var input = jQuery(this),
		numFiles = input.get(0).files ? input.get(0).files.length : 1,
		label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
		input.trigger('fileselect', [numFiles, label]);
	});

	// Watch for the custom 'fileselect' event
	jQuery(':file').on('fileselect', function (event, numFiles, label) {
		var input = jQuery(this).parents('.input-group').find(':text'),
		log = numFiles > 1 ? numFiles + ' files selected' : label;

		if (input.length) {
			input.val(log);
		} else {
			if (log)
				alert(log);
		}
	});

	//submit form
	jQuery('form#uploadForm').submit(function (event) {
		// Disable the default form submission
		event.preventDefault();
		console.log("FORM SUBMIT EVENT.");
		jQuery("#status").empty().text("File is uploading...");
		// Gat all form data
		var formData = new FormData(jQuery(this)[0]);
		jQuery('input').each(function () {
			formData.append(jQuery(this).attr('id'), jQuery(this).val());
		});
		// Submit form to Domino server using specified form
		jQuery.ajax({
			url : serverFQDN + '/api/file',
			type : 'POST',
			data : formData,
			async : false,
			cache : false,
			contentType : false, // Important!
			processData : false, // Important!
			success : function (returndata) {

				jQuery("#status").empty().text("File successfully uploaded.");
				console.log(returndata);
			}
		});
		return false;
	});

}); // END JQUERY BLOCK
