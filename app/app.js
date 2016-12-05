/*Define dependencies.*/

var express=require("express");
var multer  = require('multer');
var app=express();
var done=false;
var execFile = require('child_process').execFile;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
  if (req.method === 'OPTIONS') {
    return res.send(200);
  } else {
    return next();
  }
});

app.use(express.static(__dirname + '/public'));
//app.use('/static', express.static(__dirname + '/public'));

/* Express Timeout Setting 10 minutes */
app.use(function(req,res,next){
	res.setTimeout(600000, function(){
		console.log('Request has timed out.');
		res.send(408);	
	});	
	
	next();
});

/*Configure the multer.*/
app.use(multer({ dest: './uploads/',


 rename: function (fieldname, filename) {
    return filename+"_"+Date.now();
  },
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path)
  done=true;
}
}));



/*Handling routes.*/

app.get('/',function(req,res){
      res.sendfile("index.html");
});

app.post('/api/file',function(req,res){
  console.log("/api/file called.");
  if(done==true){
    console.log(req.files);
	execFile('find', [ 'uploads/' ], function(err, stdout, stderr) {
	var file_list = stdout;
		console.log("File uploaded into dirctory " + file_list);		
		res.json({success: true, files: file_list});

	});
    
  }
});

/*Run the server.*/
app.listen(9001,"0.0.0.0", function(){	
    console.log("Working on port 9001");
});