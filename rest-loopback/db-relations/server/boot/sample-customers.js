'use strict';

module.exports = function(app) {
  var client = app.models.client;
  var Order = app.models.order;

    // define a custom scope
  client.scope('youngFolks', {where: {age: {lte: 22}}});
  app.dataSources.db_rel_ds.automigrate('client', function(err) {
    if (err) throw err;

    var customers = [
        {name: 'Customer A', age: 21},
        {name: 'Customer B', age: 22},
        {name: 'Customer C', age: 23},
        {name: 'Customer D', age: 24},
        {age: 25},
    ];
    var orders = [
      {
        description: 'First order by Customer A',
        date: '01-01-2015',
      },
      {
        description: 'Second order by Customer A',
        date: '02-01-2015',
      },
      {
        description: 'Order by Customer B',
        date: '03-01-2015',
      },
      {
        description: 'Order by Customer C',
        date: '04-01-2015',
      },
      {
        description: 'Order by Anonymous',
        date: '05-01-2015',
      },
    ];

      // Create customers and orders
    client.create(customers[0], function(err, instance) {
      if (err) return console.error(err);
      console.log('Customer created: ', instance);
      orders[0].clientId = instance.id;
      orders[1].clientId = instance.id;
      Order.create(orders[0], function(err, instance) {
        if (err) return console.error(err);
        console.log('Order created: ', instance);
      });
      Order.create(orders[1], function(err, instance) {
        if (err) return console.error(err);
        console.log('Order created: ', instance);
      });
    });
    client.create(customers[1], function(err, instance) {
      if (err) return console.error(err);
      console.log('Customer created: ', instance);
      orders[2].clientId = instance.id;
      Order.create(orders[2], function(err, instance) {
        if (err) return console.error(err);
        console.log('Order created: ', instance);
      });
    });
    client.create(customers[2], function(err, instance) {
      if (err) return console.error(err);
      console.log('Customer created: ', instance);
      orders[3].clientId = instance.id;
      Order.create(orders[3], function(err, instance) {
        if (err) return console.error(err);
        console.log('Order created: ', instance);
      });
    });
    client.create(customers[3], function(err, instance) {
      if (err) return console.error(err);
      console.log('Customer created: ', instance);
      instance.orders.create(orders[4], function(err, instance) {
        if (err) return console.error(err);
        console.log('Order created: ', instance);
      });
    });
  });
};
