'use strict';

const AV = require('leanengine');
const express = require('express');

AV.init({
  appId: process.env.LEANCLOUD_APP_ID,
  appKey: process.env.LEANCLOUD_APP_KEY,
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY
});

AV.Cloud.beforeUpdate('Counter', (request) => {
  var query = new AV.Query('Counter');
  if (request.object.updatedKeys.indexOf('time') !== -1) {
    return query.get(request.object.id).then(function (obj) {
      if (obj.get('time') > request.object.get('time')) {
        throw new AV.Cloud.Error('Invalid update!');
      } 
      return request.object.save();
    });
  }
});


const app = express();

app.use(AV.express());

const PORT = parseInt(process.env.LEANCLOUD_APP_PORT || process.env.PORT || 3000);

app.listen(PORT, () => {
  console.log("hookguard deployed");
});
