const { WebSocketServer } = require('ws');
const express = require('express')
const app = express()
const http = require('http').createServer(app);
const fs = require('fs');
const {compare, applyPatch} = require('fast-json-patch')


const wss = new WebSocketServer({ port: process.env.SOCKET_PORT || 3000 });

let state = {}

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(buffer) {
    const json = buffer.toString()
    const data = JSON.parse(json)
    if(!!data?.['$patch']) {
      ws.send(json)
      console.log('sent:', JSON.stringify(data))
      state = applyPatch(state, data['$patch']).newDocument
    }
  });

  const initialPatch = JSON.stringify(compare({}, state))
  console.log('initialized:', {state: JSON.stringify(state),  initialPatch})
  if(initialPatch == null) {
    return
  }
  const initial = `{"$patch":${initialPatch}}`
  ws.send(initial);
});


const entry = `${__dirname}/dist/index.html`

app.get(/.*/, (req, res) => {
  const file = `${__dirname}/dist${req.path}`
  fs.exists(file, (exists) => res.sendFile(exists ? file : entry))
})

http.listen(process.env.STATIC_PORT || 8000, function() {
  var host = http.address().address
  var port = http.address().port
});
