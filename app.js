const express = require('express')
const  bodyParser  = require ('body-parser') 
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

require('dotenv').config()

const port = process.env.PORT || 3000

//conexion a base de datos
const mongoose = require('mongoose')

const uri = `mongodb+srv://enamorarte:O7IsbkYFUX19snBb@cluster0.z9vwg.mongodb.net/enamorarte?retryWrites=true&w=majority`

mongoose.connect(uri, 
    {useNewUrlParser: true, useUnifiedTopology: true})

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log("panfleto") 
    });

// motor de plantillas
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(express.static(__dirname + "/public"))

//Rutas web
app.use('/', require('./router/RutasWeb'))
app.use('/pedidos', require('./router/Pedidos'))

app.use((req, res, next) => {
    res.status(404).render("404", {
        titulo: "404",
        descripcion: "Título del sitio web"
    })
})

app.listen(port, () => {
    console.log('servidor a su servicio en el puerto', port)
})