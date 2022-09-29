const request = require('request');
const readline = require('readline');
const fs = require('fs');
const argv = process.argv.slice(2);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const fetcher = function(URL, path) {
  if (!path || !URL) {
    throw new Error('Invalid path. Try again.');
  }
  if (path.substring(0, 2) !== "./") {
    throw new Error('Invalid path. Must start with "./"');
  }

  fs.access(path, err => {
    if (!err) {
      rl.question('File exists. Overwrite? y/n\n', (response) => {
        if (response === 'y') {
          fetchAndSave(URL, path);
        }
        if (response === 'n') {
          rl.close();
        }
      });
    } else {
     fetchAndSave(URL, path)
    };
  });
};

const fetchAndSave = (URL, path) => {
  request(URL, (error, response, body) => {
    if (!error) {
      console.log(response.statusCode + '\nURL Invalid.')
      return; //this error is not finished, first 2 edge cases correct!
    }
    fs.writeFile(path, body, err => {
      console.log(`Downloaded and saved ${body.length} bytes to ${path}`);
      rl.close();
    });
  });
}

fetcher(argv[0], argv[1]);







// const fetcher = function(URL, path) {

//   fs.access(path, err => {
//     if (!err) {
//       rl.question('File exists. Overwrite? y/n', (response) => {
//         response === 'y' ? 
//       });
//     }
//   });
//   request(URL, (error, response, body) => {

//     // console.log('error:', error); 
//     // console.log('statusCode:', response && response.statusCode);
//     fs.writeFile(path, body, err => {
//       // if (err) {
//       //   console.log(err);
//       // }
//       // console.log(`Downloaded and saved ######bytes to ${path}`);
//     });
//   });
// };





// fetcher(argv[0], argv[1])

