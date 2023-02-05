const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload');
const ejs = require('ejs');
const photoController = require('./controllers/photoController');
const pageController = require('./controllers/pageController');

const app = express();

//Connect to DB
mongoose.set('strictQuery', true);
mongoose
  .connect(
    'mongodb+srv://Sezer:UFk0H2CAqwC6syUX@cluster0.nceqmxg.mongodb.net/pcat-db?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('DB CONNECTED');
  })
  .catch((err) => {
    console.log(err);
  });

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//ROUTES
app.get('/', photoController.getAllPhotos);
app.post('/photos', photoController.createPhoto);
app.get('/photos/:id', photoController.getPhoto);
app.put('/photos/:id', photoController.uptadePhoto);
app.delete('/photos/:id', photoController.deletePhoto);

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
