const express = require('express')
const mysql = require('mysql2')
const dotenv = require('dotenv')

const app = express()
dotenv.config()

// create and test the conection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

// test
db.connect((err) => {
  // connection not successful
  if (err) {
    return console.log("Error connecting to MySQL", err)
  }
  console.log("MySQL connection successful")
  // connection successful
})

// Question 1 goes here
// retrieve all patients
app.get('/patients', (req, res) => {
  // define the query
  const fetchPatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients"
  // run the query and get the patients
  db.query(fetchPatients, (err, results) => {
    // error
    if (err) {
      return res.status(500).json("Failed to fetch patient data")
    }
    // get back the data
    res.status(200).send(results)
  })

});

// Question 2 goes here
// retrieve all providers
app.get('/providers', (req, res) => {
  // define the query
  const fetchProviders = "SELECT first_name, last_name, provider_specialty FROM providers"
  // run the query and get the patients
  db.query(fetchProviders, (err, results) => {
    // error
    if (err) {
      return res.status(500).json("Failed to fetch provider data")
    }
    // get back the data
    res.status(200).send(results)
  })

});


// Question 3 goes here
// retrieve all patients, order by first_name
app.get('/patient-name', (req, res) => {
  // define the query
  const fetchPatientsName = "SELECT * FROM patients order by first_name"
  // run the query and get the patients
  db.query(fetchPatientsName, (err, results) => {
    // error
    if (err) {
      return res.status(500).json("Failed to fetch patient data")
    }
    // get back the data
    res.status(200).send(results)
  })

});


// Question 4 goes here
app.get('/provider-specialty', (req, res) => {
  // define the query
  const fetchProviderSpecialty = "SELECT * FROM providers order by provider_specialty"
  // run the query and get the patients
  db.query(fetchProviderSpecialty, (err, results) => {
    // error
    if (err) {
      return res.status(500).json("Failed to fetch provider data")
    }
    // get back the data
    res.status(200).send(results)
  })

});



// listen to the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})