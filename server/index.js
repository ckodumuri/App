const express = require('express');
const app = express();
const port = 3000;  
const mysql = require('mysql');
const prompt = require('prompt');

let username = '';
let password = '';

const properties = [
    {
        name: 'username',
        validator: /^[a-zA-Z\s\-]+$/,
        warning: 'Username must be only letters, spaces, or dashes'
    },
    {
        name: 'password',
        hidden: true
    }
];

prompt.start();

prompt.get(properties, function (err, result) {
  if (err) { return onErr(err); }
  username =  result.username;
  password = result.password;
});


let conn = mysql.createPool({
    host: "127.0.0.1",
    user: username,
    password: password,
    database: "insurancsbuddy"
 })

// const dbQueryClass = require('./queries.js');
// const DbQueries = new dbQueryClass(conn);


app.get('/', function(req, res){
  res.send("Hello world!");
});
 
app.get('/getMedicationsByTypeAndInsurance/:type/:insurance/:plan', (req, res) => {
  let type = req.params.type;
  let insurance = req.params.insurance;
  let plan = req.params.plan;

  const sql = `SELECT m.name, m.is_generic, c.dosage
      FROM medications AS m 
          JOIN coverages AS c ON m.id = c.medication_id
          JOIN insurances AS i on i.id = c.insurance_id
      
      WHERE 
          m.type = '${type}' AND
          i.name = '${insurance}' AND 
          i.plan = '${plan}'
          `;
  
  conn.getConnection(function(err, connection){
    if (err) throw err;

    connection.query(sql, function(error, results, fields){
        let json = JSON.stringify(results, null, 2);
        //console.log(json)

        let html = json.replace(/\n/g, "<br> \n");
        console.log(html)
        res.send(html)
        connection.release()
        if (error) throw error;
    })
  })
})

app.get('/getMedicationsByInsurance/:insurance', (req, res) => {
  let insurance = req.params.insurance;

  const sql = `SELECT i.plan, m.name, m.dosage
      FROM medications AS m
        JOIN coverages AS c ON m.id = c.medication_id
        JOIN insurances AS i ON i.id = c.insurance_id
        
      WHERE
        i.name = ${insurance}`

  conn.getConnection(function(err, connection){
    if (err) throw err;

    connection.query(sql, function(error, results, fields){
      print(JSON.stringify(results, null, 2))
      res.send(JSON.stringify(results, null, 2)); 
      connection.release()
      if (error) throw error;
    })
  })
})

app.post('/updateInsurancePlan/:medication/:insurance/:plan', (req, res) => {
  let type = req.params.type;
  let insurance = req.params.insurance;
  let plan = req.params.plan
})

app.set('json spaces', 4)
app.listen(port)
