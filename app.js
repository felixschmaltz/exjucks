const express = require('express')
const nunjucks = require('nunjucks')
const {fetchData} = require('./patients.js');

const app = express()
const port = 3000

nunjucks.configure('templates', {
    autoescape: true,
    express: app
});

//app.set('view engine', 'html')

app.use('/static', express.static('static'));

patientList = [
  {
    name: 'John Doe',
    age: 55,
    gender: 'male'
  },
  {
    name: 'Peter Pan',
    age: 11,
    gender: 'male'
  },
  {
    name: 'Lise Meitner',
    age: 44,
    gender: 'female'
  }
];

app.get('/', (req, res) => {
  // console.log(req)
  fetchData('Patient')
    .then(patientList => res.render('index.html', {patients: patientList}))
    .catch(error => res.sendStatus(503))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
