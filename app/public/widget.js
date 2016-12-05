(function () {
	/*
	# JavaScript widget with isolated Bootstrap 3 styles.
	# This example runs on the provider server (e.g. http://provider.dev:9001), you can implement it into your website.	
	
	# EXAMPLE #
	# Define a div as output section:
	<div id="SVB_UPLOAD_WIDGET" class="SVB_UPLOAD_WIDGET"><!-- JS Widgets Outputs here --></div>
	
	# And you have to load the widget like this:
	<!-- JavaScript Widget Code with configuration setting -->
    <script src="http://provider.dev:9001/widget.js"></script>
    <script>
      SVBFileUpload.Widget({
        buttonText: 'Upload'
      });
    </script>
    <!-- /JavaScript Widget Code -->	
	*/

	
	var jQuery;
	var serverFQDN = 'http://rhel01.acme.de';
	var timeoutId,
	options,
	container;

	if (!window.SVBFileUpload)
		window.SVBFileUpload = {};
    SVBFileUpload.Widget = function (opts) {
		options = opts;
		if (!options.buttonText) {
			options.buttonText = '[Configure this text.]';
		}
		container = '.widget-body'; //class for widget elements
	};

	function init() {
		if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.11.0') {
			console.log('No jQuery 1.11.10 found, will be loaded.');
			var script_tag = document.createElement('script');
			script_tag.setAttribute("type", "text/javascript");			
      	script_tag.setAttribute("src", serverFQDN + '/js/jquery-1.11.0.min.js');
			(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
			if (script_tag.attachEvent) {
				console.log('Code for IE-Browser loaded.');
				script_tag.onreadystatechange = function () { // for IE
					if (this.readyState == 'complete' || this.readyState == 'loaded') {
						this.onreadystatechange = null;
						scriptLoadHandler();
					}
				};
			} else {
				script_tag.onload = scriptLoadHandler;
			}
		} else {
			jQuery = window.jQuery;
			console.log('jQuery still exists on this page. Nothing to do.');
			main();
		}
	}

	function scriptLoadHandler() {
		jQuery = window.jQuery.noConflict();
		console.log('jQuery loaded.');
		main();
	}

	function main() {
		jQuery(document).ready(function () {
		
			jQuery('head').append('<link href="' + serverFQDN + '/css/bootstrap-svb.css" rel="stylesheet" type="text/css">');      
			//jQuery.getScript(serverFQDN + '/vendor/json2.js');
			jQuery.getScript(serverFQDN + '/js/upload_widget.js');
			
			if (jQuery(container).size() === 0) {
				jQuery('#SVB_UPLOAD_WIDGET').append('<div class="widget-body"></div>'); //DIV with widget class
			}
			jQuery(container).addClass('bootstrap-svb');

			render();
		});
	}

	function render() {
		//Widget bauen
		var markup = '';
		markup = markup + '<div class="row">';
		markup = markup + '<div class="col-lg-6 col-sm-6 col-12">';
		markup = markup + '<form id = "uploadForm" name="uploadForm">';
		markup = markup + '<h4>Upload</h4>';
		markup = markup + '<div class="input-group">';
		markup = markup + '<label class="input-group-btn">';
		markup = markup + '<span class="btn btn-primary">';
		markup = markup + 'Browse &hellip; <input type="file" name="file" style="display: none;" multiple/>';
		markup = markup + '</span>';
		markup = markup + '</label>';
		markup = markup + '<input type="text" class="form-control" readonly>';
		markup = markup + '<span class="input-group-btn">';
		markup = markup + '<button type="submit" value="Upload File" class="btn btn-default">'+ options.buttonText +'</button>';
		markup = markup + '</span>';
		markup = markup + '</div>';
		markup = markup + '<span class="help-block" id="status">';
		markup = markup + 'Select file(s) for upload.';
		markup = markup + '</span>';		
		markup = markup + '</form>';
		markup = markup + '</div>';
		markup = markup + '</div><!-- /row -->	';	
		
		jQuery(container).append(markup);
		
	}
	
	init();

})();
