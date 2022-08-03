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
    const selectProvinsi = `SELECT * FROM provinsi_tb UNION SELECT * FROM kabupaten_tb`
    
    db.query(selectProvinsi, (err, result) => {
      if(err) throw err
      // console.log(result)
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

  app.get("/detail/:id", (req, res) => {
    let id = req.params.id

    const selectProvinsi = `SELECT * FROM provinsi_tb WHERE id=${id} UNION SELECT * FROM kabupaten_tb WHERE id=${id}`

    db.query(selectProvinsi, (err, result) => {
      if(err) throw err

      console.log(result)

      let data = result[0]

      data = JSON.parse(JSON.stringify(data))

      console.log(data)

      res.render("detail", {
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

  app.get("/edit/:id", (req, res) => {
    db.query(`SELECT * FROM provinsi_tb WHERE id =${req.params.id}`, (err, result) => {
      if(err) throw err

      let data = result[0]

      data = JSON.parse(JSON.stringify(data))

      console.log(data)

      res.render("edit-provinsi", {
        data: data
      })
    })
  })

  app.post("/edit/:id", upload.single("inputImageProv"), (req, res) => {
    let id = req.params.id
    let data = req.body
    let img = req.file.filename

    let updateData = `UPDATE provinsi_tb SET name='${data.inputNameProv}', diresmikan='${data.inputDiresmikanProv}', pulau='${data.inputPulauProv}', img='${img}' WHERE id=${id}`

    db.query(updateData, (err, result) => {
      if(err) throw err
      res.redirect("/")
    })
  })

  app.get("/add-kabkot", upload.single("inputImageKabKot"), (req, res) => {
    let provinsi = "SELECT name, id FROM provinsi_tb WHERE 1"

    db.query(provinsi, (err, result) => {
      if (err) throw err

      // console.log(result)

      const data = JSON.parse(JSON.stringify(result))

      console.log(data)

      res.render("add-kabkota", {
        data: data
      })
    })
  })

  app.post("/add-kabkot", upload.single("inputImageKabKot"), (req, res) => {
    let data = req.body;
    let img = req.file.filename;

    let insertKabKot = `INSERT INTO kabupaten_tb(name, diresmikan, img, provinsi_id) VALUES ('${data.inputNameKabKot}','${data.inputDiresmikanKabKot}','${img}','${data.inputProvinsiId}')`

    db.query(insertKabKot, (err, result) => {
      if(err) throw err
      console.log(result)
      res.redirect("/")
    })
  })
})

app.listen(port, () => {
  console.log(`Server on ${port}`)
})