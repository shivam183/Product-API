var SERVER_NAME='Product-API';
var PORT=3000;
var HOST='127.0.0.1';


var sendGetCounter=0;
var sendPostCounter=0;
var sendDeleteCounter=0;

var restify = require('restify'),
productsave = require('save')('products'),
server=restify.createServer({name:SERVER_NAME});

server.listen(PORT,HOST,function(){
    console.log('Server is listening at http://'+HOST+':'+PORT);
    console.log('ENDPOINTS:');
    console.log('http://'+HOST+':'+PORT+'/sendGet'+' METHOD:GET');
    console.log('http://'+HOST+':'+PORT+'/sendPost'+' Method:POST');
    console.log('http://'+HOST+':'+PORT+'/sendDelete'+' Method:DELETE');
})

server.use(restify.fullResponse()).use(restify.bodyParser());

//GET ALL PRODUCTS
server.get('/sendGet',(req,res,next)=>{

    console.log('SendGet: received request');
    sendGetCounter++;
    console.log('Pocessed Request Count--> SendGET:'+sendGetCounter+' ,sendPOST:'+sendPostCounter+' ,SendDelete:'+sendDeleteCounter);
    productsave.find({},(error,users)=>{
        res.send(users);
    })
    console.log('SendGet: sending request');
})

//CREATE NEW PRODUCT
server.post('/sendPost',(req,res,next)=>{

    console.log('SendPost: received request');
    sendPostCounter++;
    console.log('Pocessed Request Count--> SendGET:'+sendGetCounter+' ,sendPOST:'+sendPostCounter+' ,SendDelete:'+sendDeleteCounter);
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
    productsave.create(newProduct,(error,user)=>{
        if(error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
        res.send(201,user);
    })
    console.log('SendPost: Sending Request');
})

//DELETE ALL PRODUCTS
server.del('/sendDelete',(req,res,next)=>{

    console.log('Delete: Request Received');
    sendDeleteCounter++;
    console.log('Pocessed Request Count--> SendGET:'+sendGetCounter+' ,sendPOST:'+sendPostCounter+' ,SendDelete:'+sendDeleteCounter);
    productsave.deleteMany({},(error,user)=>{
        if(error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
        res.send(user);
    });
    console.log('Delete: Sending Request');
})