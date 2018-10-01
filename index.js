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
    console.log('http://'+HOST+':'+PORT+'/products'+' METHOD:GET,POST,DELETE');
})

server.use(restify.fullResponse()).use(restify.bodyParser());

//GET ALL PRODUCTS
server.get('/products',(req,res,next)=>{

    console.log('> Get: received request');
    sendGetCounter++;
    console.log('Pocessed Request Count--> SendGET:'+sendGetCounter+' ,sendPOST:'+sendPostCounter+' ,SendDelete:'+sendDeleteCounter);
    console.log('< Get: sending request');
    productsave.find({},(error,products)=>{
        res.send(products);
    })
    
})

//CREATE NEW PRODUCT
server.post('/products',(req,res,next)=>{

    console.log('> Post: received request');
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
    console.log('< Post: Sending Request');
    productsave.create(newProduct,(error,products)=>{
        if(error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
        res.send(201,products);
    })
   
})

//DELETE ALL PRODUCTS
server.del('/products',(req,res,next)=>{

    console.log('> Delete: Request Received');
    sendDeleteCounter++;
    console.log('Pocessed Request Count--> SendGET:'+sendGetCounter+' ,sendPOST:'+sendPostCounter+' ,SendDelete:'+sendDeleteCounter);
    console.log('<Delete: Sending Request');
    productsave.deleteMany({},(error,products)=>{
        if(error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
        res.send(products);
    });
    
})