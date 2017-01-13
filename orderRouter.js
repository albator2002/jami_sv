/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Router

module.exports = function(app) {
    
var cors = require('cors');
var mongoose = require('mongoose');
var model = require('./model');

var orderModel = model.loadOrderModel();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, UserToken");
  next();
});

//Get filtered order list
    app.get( '[/api/orders?$filter=]+[\\s\\S]', function( request, response ) {
        return orderModel.find(request.params.$filter,function( err, requests ) {
            if( !err ) {
                return response.send( requests );
            } else {
                console.log( err );
                return response.send('ERROR');
            }
        });
    });

//Get a list of all requests
app.get( '/api/orders', function( request, response ) {
    return orderModel.find(function( err, requests ) {
        if( !err ) {
            return response.send( requests );
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});



//Insert a new order
app.post( '/api/order',cors(), function( request, response ) {
    var orderDTO = new orderModel();
    orderDTO.data = request.body.data;    
    orderDTO.save( function( err ) {
        if( !err ) {  
            console.log( 'order inserted' );
            return response.send( orderDTO );
        } else {  
            console.log( err );
            return response.send('ERROR');
        }
    });
});
//Get a single order by id
app.get( '/api/orders/:id', function( request, response ) {
    return orderModel.findById( request.params.id, function( err, orderDTO ) {
        if( !err ) {
            return response.send( orderDTO );
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});
//Update a order
app.put( '/api/orders/:id', function( request, response ) {
    return orderModel.findById( request.params.id, function( err, orderDTO ) {
      
        orderDTO.data = request.body.data;
       
        return orderDTO.save( function( err ) {
            if( !err ) {
                console.log( 'order updated' );
                return response.send( orderDTO );
            } else {
                console.log( err );
                return response.send('ERROR');
            }
        });
    });
});
//Delete a book
app.delete( '/api/orders/:id', function( request, response ) {
    orderModel.findById( request.params.id, function( err, orderDTO ) {
        return orderDTO.remove( function( err ) {
            if( !err ) {
                console.log( 'order removed' );
                return response.send( '' );
            } else {
                console.log( err );
                return response.send('ERROR');
            }
        });
    });
});


};
