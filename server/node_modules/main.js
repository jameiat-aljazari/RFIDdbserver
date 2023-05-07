const port = 3080;
const ini  = require('ini');
const fs   = require('fs');

const bodyParser = require('body-parser')
const serial = require('serialport');
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
let sql;

const config = ini.parse(fs.readFileSync('./config.ini','utf-8'))
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const db = new sqlite3.Database('./test.db',sqlite3.OPEN_READWRITE,(err) => {
	if (err) return console.error(err.message);
})

//check if exist else create a table
sql = 'SELECT count(*) FROM sqlite_schema WHERE type = ? AND name = ? '
db.all(sql,['table','users'],(err,count)=>{
	if (err) return console.error(err.message);
	 //console.log(count[0]['count(*)']);
	if (count[0]['count(*)'] == 0 ){
		sql = 'CREATE TABLE users(id INTEGER PRIMARY KEY,first_name,last_name,abbreviation,RFID,creation_date,last_seen)'
		db.run(sql);
	}
	
});
////
app.get('/',(req,res)=>{
		res.send("Hello World!");
		console.log(req.ip)

});

app.post('/api/login',(req,res)=>{
		//res.set('Access-Control-Allow-Origin', '*');
		console.log("API CALL");
		res.setHeader("Content-Type", "text/html")
		console.log( config.core.username , config.core.password);
		console.log( req.body.username , req.body.password);
		console.log(config.core.username.localeCompare(req.body.username)  , config.core.password.localeCompare(req.body.password)  );
		if(config.core.username.localeCompare(req.body.username) == 0  && config.core.password.localeCompare(req.body.password) == 0){
			console.log("correct");
			res.json({msg:"correct"});
		}
		else{
			console.log("incorrect");
			res.json({msg:"incorrect"});
			
		}
		console.log(req.body);
		


});
app.get('/api/personnel-get',(req,res)=>{
		console.log("API personnel get CALL");
		console.log(req.ip);
		console.log(req.query.ID,req.query.Room);
		sql = 'SELECT EXISTS(SELECT 1 FROM users WHERE RFID = ?)'
		db.all(sql,[req.query.ID],(err,row)=>{
		if (err) return console.error(err.message);
			let found = row[0]["EXISTS(SELECT 1 FROM users WHERE RFID = ?)"]
			if (found == 1) {
				res.send("Found");
				console.log("Found");
			}
			else{
				res.send("NotFound");
			console.log("NotFound");
			}
		});
});

// date and time format = YYYY-MM-DDThh:mm:ssTZD
//db.run('DROP TABLE users');
