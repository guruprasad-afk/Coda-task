const axios = require('axios')
const fs = require('fs')
const request = require('request');

var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
  };

axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?sol=1000&api_key=2x3zt123jjN80SBRNfcq07I5BVMkHjQEiNg9hGIm&page=1').then(res => {
    photos = res.data.photos
    photos.forEach(element => {
        download(element.img_src, `${element.id}.jpg`, function () {
            console.log('done');
        })
    });
})