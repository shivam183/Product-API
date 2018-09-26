var SERVER_NAME='Product-API';
var PORT=3000;
var HOST='127.0.0.1';


var sendGetCounter=0;
var sendPostCounter=0;

var restify = require('restify'),
usersave = require('save')('products'),
server=restify.createServer({name:SERVER_NAME});

server.listen(PORT,HOST,function(){
    console.log('Server is listening at http://'+HOST+':'+PORT);
    console.log('ENDPOINTS:');
    console.log('http://'+HOST+'/sendGet'+' METHOD:GET');
    console.log('http://'+HOST+'/sendPost'+' Method:POST');
})

server.use(restify.fullResponse()).use(restify.bodyParser());

//GET ALL PRODUCTS
server.get('/sendGet',(req,res,next)=>{

    console.log('SendGet: received request');
    sendGetCounter++;
    console.log('Pocessed Request Count--> SendGET:'+sendGetCounter+' ,sendPOST:'+sendPostCounter);
    usersave.find({},(error,users)=>{
        res.send(users);
    })
    console.log('SendGet: sending request');
})

//CREATE NEW PRODUCT
server.put('/sendPost',(req,res,next)=>{

    console.log('SendPost: received request');
    sendPostCounter++;
    console.log('Pocessed Request Count--> SendGET:'+sendGetCounter+' ,sendPOST:'+sendPostCounter);
    if(req.params.product === undefined){
        return next (new restify.InvalidArgumentError('Product must be Provided'));
    }
    if(req.params.price===undefined){
        return next (new restify.InvalidArgumentError('Price must be Provided'));
    }

    var newProduct={
        product:req.params.product,
        price:req.params.price
    };
    usersave.create(newProduct,(error,user)=>{
        if(error) return next(new restify.InvalidArgumentError(JSON.stringify(error.erros)));
        res.send(201,user);
    })
    console.log('SendPost: Sending Request');
})