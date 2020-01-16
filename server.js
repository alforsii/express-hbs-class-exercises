const myExpress = require('express');
const hbs = require('hbs');

require('dotenv').config();

const app = myExpress();
app.use(myExpress.static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

//import fake-data
const theData = require('./fake-data');

//1. All requests in one.
app.get('/:id', (req, res) => {
  console.log(req.params);
  //switch..case
  switch (req.params.id) {
    case 'home':
      res.sendFile(__dirname + '/views/index.html');
      break;
    case 'about':
      res.sendFile(__dirname + '/views/about.html');
      break;
    case 'students':
      const justNames = theData.map(student => student.firstName);
      res.render('hbs-files/students.hbs', {
        studentNames: justNames,
      });

      break;
    case 'random':
      const randomIndex = Math.floor(Math.random() * theData.length);
      const dataToSend = {
        randomStudent: theData[randomIndex],
      };
      res.render('hbs-files/random-students.hbs', dataToSend);
      break;
    case 'iron':
      let data = {
        name: 'Ironhacker',
        bootcamp: 'Ironhack Web Dev',
      };
      res.render('hbs-files/test.hbs', data);
      break;
    default:
      res.send('404 page not found');
      break;
  }
  //with if...else
  //   if (req.params.id === 'students') {
  //     const justNames = theData.map(student => student.firstName);
  //     //   console.log(justNames);
  //     res.render('hbs-files/students.hbs', { studentNames: justNames });
  //   } else if (req.params.id === 'random') {
  //     const randomIndex = Math.floor(Math.random() * theData.length);
  //     const dataToSend = {
  //       randomStudent: theData[randomIndex],
  //     };
  //     //   console.log( dataToSend.randomStudent);
  //     res.render('hbs-files/random-students.hbs', dataToSend);
  //   } else if (req.params.id === 'home') {
  //     res.sendFile(__dirname + '/views/index.html');
  //   } else if (req.params.id === 'about') {
  //     res.sendFile(__dirname + '/views/about.html');
  //   } else {
  //     res.send('404 page not found');
  //   }
});

//2.All requests in separate files
// app.get('/students', (req, res) => {
//   const justNames = theData.map(student => student.firstName);
//   //   console.log(justNames);
//   res.render('hbs-files/students.hbs', { studentNames: justNames });
// });
// app.get('/random', (req, res) => {
//   const randomIndex = Math.floor(Math.random() * theData.length);
//   const dataToSend = {
//     randomStudent: theData[randomIndex],
//   };
//   //   console.log( dataToSend.randomStudent);
//   res.render('hbs-files/random-students.hbs', dataToSend);
// });

// // Routes
// //1.Everything in one, request with file name like /index.html
// app.get('/:id', (req, res) => {
//   console.log('req.params.id', req.params.id);
//   let filePath =
//     req.params.id === 'home'
//       ? '/views/index.html'
//       : req.params.id === 'about'
//       ? '/views/about.html'
//       : res.send('404 Not found');

//   res.sendFile(__dirname + filePath);
// });
// //***************************** */
//2.Separate routes, request with the name we pass in .get('/')
// app.get('/', (req, res) => {
//   console.log(req);
//   //   res.send(`Welcome`);//works only sends a string
//   res.sendFile(__dirname + '/views/index.html');
// });
// app.get('/about', (req, res) => {
//   console.log(req);
//   //   res.send(`Welcome`);//works only sends a string
//   res.sendFile(__dirname + '/views/about.html');
// });

app.listen(process.env.PORT, () =>
  console.log(`running on ${process.env.PORT}`)
);
