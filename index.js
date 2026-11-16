
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
require('dotenv').config();

const express = require('express');
const i18next = require('i18next');
const backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');

const bookRoutes = require('./routes/books.routes');

const i18nextInitialization = i18next
  .use(backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: 'locales/{{lng}}.json',
    },
  });
app.use(middleware.handle(i18next));
app.use(express.json());
app.use('/books', bookRoutes);

app.get('/testing', (req, res) => {
  res.send(req.t('testing'))
})



// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });
// app.get('/about', (req, res) => {
//   res.send('About Page');
// });

// app.get('/contact',(req, res) =>{
//     res.send('Contact Page');
// });

const connectionString = process.env.MONGODB_URI;

async function startServer() {
  if (!connectionString) {
    throw new Error('MONGODB_URI is not set');
  }

  await i18nextInitialization;
  await mongoose.connect(connectionString);
  console.log('Connected to MongoDB');

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}

startServer().catch((error) => {
  console.error('Error starting server:', error);
  process.exitCode = 1;
});