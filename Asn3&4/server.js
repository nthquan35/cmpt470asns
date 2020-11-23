const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());
app.use(cors());


var con = mysql.createConnection({
  host: "10.128.0.6",
  user: "root",
  password: "Bolshevik35+",
  database: "cmpt470"
});

con.connect(function(err) {
	if (err) {
		return console.error('error: ' + err.message);
	}
	console.log("Connected!");
});

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: "index.html"
}

app.use('/', express.static('./frontend', options));

app.use('/', function(req,res,next){
  console.log(req.method, 'request:', req.url, JSON.stringify(req.body));
  next();
});

app.post('/add', function(req,res){
  	const {w, h, c }= req.body;
  	// console.log(w,h,c);
  	const query = "INSERT INTO Rectangle (width, height, color) VALUES ?";
  	const values = [[w,h,c]];
	con.query(query,[values], function (err, result) {
	    if (err){
	    	return console.error('error: ' + err.message);
	    }
	});
	res.status(200).json('Success');
});

app.get('/displayRectangles', function(req, res){
	const query = "SELECT * FROM Rectangle";
	con.query(query, function(err, result){
		if (err){
	    	return console.error('error: ' + err.message);
	    }
	    // console.log(result);
		res.status(200).json(result);
	});
	// res.status(200).json(result);
});

app.delete('/display', function(req,res){
	// console.log(JSON.stringify(req.body));
	const {id} = req.body;
	// console.log(id);
	const query = "DELETE FROM Rectangle WHERE id = ?";
	const value = [[id]];
	con.query(query,[value], function (err, result) {
	    if (err){
	    	return console.error('error: ' + err.message);
	    }
	    if (result.affectedRows == 1){
	    	res.status(200).json("Deleted");
	    } else {
	    	res.status(200).json("Not Found");
	    }
	    // console.log(res);
	});

})

app.post('/edit', function(req, res){
	// console.log(JSON.stringify(req.body));
	let {id, width, height, color} =  req.body;
	const findQuery = "SELECT width, height, color FROM Rectangle WHERE id = ?"
	const value = [[id]];
	var returnFind;
	con.query(findQuery, [value], function(err, result){
	    if (err){
	    	return console.error('error: ' + err.message);
	    }
	    if (result.length == 0){
	    	res.status(200).json("ID not found");
	    }
	    else{
	    	if (width.length == 0){
	    		width = result[0].width;
	    	}
	    	if (height.length == 0){
	    		height = result[0].height;
	    	}
	    	if (color.length == 0){
	    		color = result[0].color;
	    	}
			const setKeys = ["width = " + width, "height = " + height, "color = \""+ color + "\""];
			let query = "UPDATE Rectangle SET ";
			const setId = [" WHERE id = " + id];
			query += setKeys;
			query += setId;
			// console.log(query);
			con.query(query, function(err, result){
			    if (err){
			    	return console.error('error: ' + err.message);
			    }
			    res.status(200).json("Changed");
			})
	    }
	})
	

	
	// console.log(query);
	// con.query(query, function(err, result){
	//     if (err){
	//     	return console.error('error: ' + err.message);
	//     }
	//     if (result.affectedRows == 1){
	//     	res.status(200).json("Deleted");
	//     } else {
	//     	res.status(200).json("Not Found");
	//     }
	// })
	// console.log(height);
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});