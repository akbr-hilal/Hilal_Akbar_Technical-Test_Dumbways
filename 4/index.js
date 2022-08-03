const express = require('express')
const mysql = require("mysql")

const upload = require("./middlewares/fileUpload")

const app = express()
const port = 8000

const db = mysql.createConnection({
  host: "localhost",
  database: "db_daerah",
  user: "root",
  password: "",
})

app.set("view engine", "hbs")
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(express.urlencoded({ extended: false }))
// --------------------------------------------------------------------------------------------------------
db.connect((err) => {
  if(err) throw err
  console.log("Database connected.....")

  app.get("/", (req, res) => {
    const selectProvinsi = `SELECT * FROM provinsi_tb`
    
    db.query(selectProvinsi, (err, result) => {
      if(err) throw err
      console.log(result)
      const data = JSON.parse(JSON.stringify(result))
      console.log(data)

      res.render("index", {
        data: data
      })
    })
  })

  app.get("/add-provinsi", (req, res) => {
    res.render("add-provinsi")
  })

  app.post("/add-provinsi", upload.single("inputImageProv") ,(req, res) => {
    let data = req.body
    let img = req.file.filename

    let query =`INSERT INTO provinsi_tb( name, diresmikan, img, pulau) VALUES ('${data.inputNameProv}','${data.inputDiresmikanProv}','${img}','${data.inputPulauProv}')`

    db.query(query, (err, result) =>{
      if(err) throw err
      res.redirect("/")
    })
  })

  app.get("/detail-provinsi/:id", (req, res) => {
    let id = req.params.id

    db.query(`SELECT * FROM provinsi_tb WHERE id=${id}`, (err, result) => {
      if(err) throw err

      console.log(result)

      let data = result[0]

      data = JSON.parse(JSON.stringify(data))

      console.log(data)

      res.render("detail-provinsi", {
        data: data
      })
    })
  })

  app.get("/delete/:id", (req, res) => {
    let deleteQuery = `DELETE FROM provinsi_tb WHERE id = ${req.params.id}`

    db.query(deleteQuery, (err, result) => {
      if(err) throw err
      
      res.redirect("/")
    })
  })
})





app.listen(port, () => {
  console.log(`Server on ${port}`)
})