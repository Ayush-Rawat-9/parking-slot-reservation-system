const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const mysql = require('mysql2');
const { v4: uuidv4 } = require('uuid');
const max_slots = 1;

app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection(
    {
        host : 'localhost',
        user : 'root',
        password : 'abc@123',
        database : 'mydb'
    }
);

db.connect(err=>{
    if(err) throw err;
    console.log(`Database connected`);
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});

app.get("/", (req, res)=>{
    res.redirect("/home");
});

app.get("/home", (req, res)=>{
    let qry = 'SELECT * FROM parking ORDER BY in_time';
    db.query(qry, (err, result)=>{
        if(err) throw err;
        res.render("index.ejs", {parking : result});
    });
});

app.get("/home/add", (req, res)=>{
    res.render("add.ejs");
});

app.post("/home", (req, res)=>{
    let id = uuidv4();
    let { vehicle_name, plate_no, in_time, out_time } = req.body;
    let cntQry = 'SELECT COUNT(*) AS count FROM parking WHERE (in_time < ? AND out_time > ?) OR (in_time = ?) OR (out_time = ?)';
    db.query(cntQry, [out_time, in_time, in_time, out_time], (err, result)=>{
        if(err) throw err;
        let count = result[0].count;
        if(count < max_slots)
        {
            let qry = 'INSERT INTO parking (id, vehicle_name, plate_no, in_time, out_time) VALUES (?, ?, ?, ?, ?)';
            db.query(qry, [id, vehicle_name, plate_no, in_time, out_time], (err, result)=>{
                if(err) throw err;
                console.log(req.body);
                res.redirect("/home");
            });
        }
        else
        {
            res.redirect(`/home?error=Slots not available for Check in time ${in_time}`);
        }
    });
});


app.delete("/home/:id", (req, res)=>{
    let {id} = req.params;
    let qry = 'DELETE FROM parking WHERE id = ?';
    db.query(qry, [id], (err, result)=>{
        if(err) throw err;
        res.redirect("/home");
        console.log(`Deleted booking id : ${id}`);
    });
});