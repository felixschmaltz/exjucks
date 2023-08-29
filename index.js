const express = require('express')
const nunjucks = require('nunjucks')

const app = express()
const port = 3000

nunjucks.configure('templates', {
    autoescape: true,
    express: app
});

//app.set('view engine', 'html')

app.get('/', (req, res) => {
    res.render('index.html')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
