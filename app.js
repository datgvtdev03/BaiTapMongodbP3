const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars')
const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.engine('.hbs', expressHbs.engine({ extname: "hbs", defaultLayout: 'main', layoutsDir: "views/layouts/" }));
app.set('view engine', '.hbs');
app.set('views', './views');
app.use(express.json());

const productController = require('./controllers/productControllers')

const productRoutes = require('./routes/productRoutes')


const dbConect = require('./connect')
dbConect.connect();

app.use('/product', productController)
app.use(productRoutes)

app.listen(port, () => {
  console.log("Localhost lang nghe cong " + port)
});

