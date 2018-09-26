var SERVER_NAME='Product-API';
var PORT=3000;
var HOST='127.0.0.1';

var restify = require('restify'),
usersave = require('save')('products'),
server=restify.createServer({name:SERVER_NAME});

server.listen(PORT,HOST,function(){
    console.log('Server is listening at http://'+HOST+':'+PORT);
    console.log('ENDPOINTS:');
    console.log('http://'+HOST+'/sendGet'+' METHOD:GET');
    console.log('http://'+HOST+'/sendPost'+' Method:POST');
})