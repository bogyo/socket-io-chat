const express = require('express');
const cors = require('cors');
const fs = require('fs');
const request = require('request');
const path = require('path');
const uuidV4 = require('uuid/v4');

const app = express();
const http = require('http').Server(app);

const io = require('socket.io')(http);

app.use(express.static('static'));


const host = 'http://lorempixel.com';

const onError = (err, done) => {
  if (done) {
    return done(err)
  }
  throw err
}

const download = ({ url, dest, done }) => {
  if (!url) {
    throw new Error('The option url is required')
  }

  if (!dest) {
    throw new Error('The option dest is required')
  }

  request({ url: url, encoding: null }, (err, res, body) => {
    if (err) {
      return onError(err, done)
    }

    if (body && res.statusCode === 200) {
      if (!path.extname(dest)) {
        dest = path.join(dest, path.basename(url))
      }

      fs.writeFile(dest, body, 'binary', (err) => {
        if (err) {
          return onError(err, done)
        }
        done && done(false, dest, body)
      })
    } else {
      if (!body) {
        return onError(new Error('Image loading error - empty body. URL: ' + url), done)
      }
      onError(new Error('Image loading error - ' + res.statusCode + '. URL: ' + url), done)
    }
  })
}

download.image = ({ url, dest }) => new Promise((resolve, reject) => {
  download({
    url,
    dest,
    done: (err, dest, body) => {
      if (err) {
        return reject(err)
      }

      resolve({ filename: dest, image: body })
    }
  })
})
      //  console.log(fakeImgUrl, 'fakeImgUrl');
  app.get('/getphoto', cors(), function (req, res, next) {
  const fakeImgUuid = uuidV4();
  const fakeLocation = 'static/';
  const fakeImgPrefix =  'test_';
  const fakeImgFileType = '.png';

  const url = host + '/' + req.query.width + '/' + req.query.height;

  console.log(url);
  const imgUrl = fakeLocation + fakeImgPrefix + fakeImgUuid + fakeImgFileType;
  const fakeImgUrl = fakeImgPrefix + fakeImgUuid + fakeImgFileType;

  const  options = {
    url: url,
    dest: imgUrl      // Save to /path/to/dest/photo.jpg
  }

  download.image(options)
    .then(({ filename, image }) => {
      console.log('File saved to', filename);
      res.send(fakeImgUrl);
    }).catch((err) => {
      throw err
    })
  });

 //app.get('/chat', function (req, res) {
  //res.sendfile(__dirname + '/index.html');
//});

//io.path('/chat');
  let clientNumber = 0;

io.on('connection', function(client) {
  console.log('Client connected...');

    client.on('join', function(data) {
      clientNumber += 1;

    // TODO more appropriate number here!!!
    const zeroFilled = ('000' + clientNumber).substr(-3);
    // give a nice username to the client
    //  if(!data.user) {
        const yourUniqueName  = 'Guest' + zeroFilled;
        client.emit('setUserMame', yourUniqueName);
    //  }

      //  client.emit('messages', 'Hello from server');
    });

    client.on('message', function(data) {
      console.log(data );
          client.emit('message', data);
          client.broadcast.emit('message',data);
   });

   client.on('disconnect', () => {
    console.log('user disconnected');
  });

});




http.listen(8081, function () {
  console.log('listening on *:8081');
});
