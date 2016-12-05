# File-Upload-Widget-With-Docker
JavaScript widget for file uploads. The widget will be provided by a NodeJS-Server inside a Docker container. 

## Configuration
Change the server FQDN (e.g. var serverFQDN = 'http://mydomain.dev';) for your server in following files:
- widget.js
- upload.js

## Docker
Copy all files to your Docker server (e.g. /opt/docker/file-upload).

Run the command ``docker-compose up`` to create two containers:
- Container 1: traefik (Http reverse proxy)
- Container 2: Node.js Server (provides the JavaScript widget for file uploads)

Container 1 listen on port 80 and redirects the requests to container 2.

Container 2 will mount his uploads-directory with the uploads-directory on the host (e.g. /opt/docker/file-upload/app/uploads).
The Node.js server uses CORS and enables all domains by default. This allows the use of the widget in any website on any domain.

The Node.js server uses nodemon and watch for code changes in order to reboot automatically.


## Widget implementation
To implement the widget in your websites use the following code.

### Placeholder
Set a placeholder for rendering.

````
<div id="SVB_UPLOAD_WIDGET">
  <!-- js widgets outputs here -->
</div>
````

### Load the widget
Load the widget from the providing server and configure the text of the upload button.

````
<!-- JavaScript widget code with configuration setting -->
    <script src="http://mydomain.dev/widget.js"></script>
    <script>
      SVBFileUpload.Widget({
        buttonText: 'Upload'
      });
    </script> 
    <!-- /JavaScript widget code -->
````


