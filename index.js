const express = require('express');
const mysql = require('mysql');
const connection = require('./database');
const routes = require('./Routes/route');
var bodyParser = require('body-parser')

var cors = require('cors')

const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

//app.use('/use',routes);

//get all users
app.get('/users', function (req, res) {
    let sql = "SELECT * FROM test_table";
    connection.query(sql, function(err, result){
        if(err) throw err;
        res.send(result);

    });
  })


  //get users by id

  app.get('/users/:id',(req, res)=>{
      let qrId = req.params.id;
      let qr = `SELECT * FROM test_table where id = ${qrId}`;
      connection.query(qr, function(err, result){
        if(err) throw err;
        if(result.length>0){
        res.send(result);}else{
            res.send({
                message:"Data not found"
            })
        }
  });
})


// post data
app.post('/users', (req, res)=>{
    let full_Name = req.body.full_Name;
    let job_Title = req.body.job_Title;

    let qr = `INSERT INTO test_table (full_Name, job_Title)
    value('${full_Name}','${job_Title}')`;
    connection.query(qr, function(err, result){
        if(err) throw err;
        // res.send({
        //     message:"Data added Successfully"
            
        // })
        res.send(result);

})
})

app.post('/submit', (req, res)=>{
    console.log(req.body.full_Name);
    console.log(req.body.job_Title);

    connection.connect(function(err) {
  if (err) throw  err;
  console.log("connected");
  var sql = "INSERT INTO `test_table`(`full_Name`,`job_Title`) VALUES ('"+req.body.full_Name+"','"+req.body.job_Title+"')";
  connection.query(sql, function(err, result)  {
   if(err) throw err;
   console.log("table created");
  });
});
})


//Update data
app.put('/users/:id', (req,res)=>{
    let uID= req.params.id;
    let full_Name = req.body.full_Name;
    let job_Title = req.body.job_Title;

    let qr = `UPDATE test_table set full_Name = '${full_Name}', job_Title = '${job_Title}' where id = ${uID}`;
    connection.query(qr, function(err, result){
        if(err) throw err;
        res.send({
            message:"Data updated Successfully"
            
        })
   //     res.send(result);

})

})


// delete data
app.delete('/users/:id', (req,res)=>{
    let uID= req.params.id;
   let qr = `Delete from test_table where id = '${uID}'`;
   connection.query(qr, function(err, result){
    if(err) throw err;
    res.send({
        message:"Data deleted Successfully"
        
    })
})
})


  const port = process.env.PORT || 3000;
  app.listen(port, () =>{
      console.log(`Listening on port ${port}..`);
      connection.connect(function(err){
          if(err) throw err;
          console.log("Database Connected!");
      })
  });