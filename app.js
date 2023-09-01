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
    .then(patientList => {
      const pL = formatPatientlist(patientList);
      res.render('index.html', {patients: pL});
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(503)
    })
})

const formatPatientlist = (patientList) => {
  return patientList.map((i) => {
    return {
      name: (i.name) ?  i.name[0].given[0].charAt(0) + ' ' + i.name[0].family: '',
      age: patientAge(i),
      gender: patientGender(i)
    }
  })
}


const patientName = (patient) => {
  const officialName = jp.value(patient, '$.name[?(@.use=="official")]');
  return `${officialName.given[0].charAt(0)}. ${officialName.family}`;
};

const patientAge = (patient) => {
  if (patient.birthDate) {
    return new Date(Date.now() - new Date(patient.birthDate)).getUTCFullYear() - 1970;
  } else {
    return 0;
  }
}

const patientGender = (patient) => patient.gender;


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

