/**
* Implementation for CatalogService defined in ./cat-service.cds
*/

const cds = require('@sap/cds')
module.exports = function (){
  // Register your event handlers in here, e.g....

  const { Books } = cds.entities('my.bookshop')
  // Reduce stock of ordered books if available stock suffices
  this.on('submitOrder', async req => {
    let id = req.data.book;
    let quantity = req.data.quantity;
     let book = await SELECT.from (Books, id, b => b.stock)

    // Validate input data
    if (!book) return req.error (404, `Book #${id} doesn't exist`)
    if (quantity < 1) return req.error (400, `quantity has to be 1 or more`)
    if (quantity > book.stock) return req.error (409, `${quantity} exceeds stock for book #${id}`)

    // Reduce stock in database and return updated stock value
    await UPDATE (Books, id) .with ({ stock: book.stock -= quantity })
    return book;
    
  })

  

this.on('placeOrder', async req => {
  const { items } = req.data; // items would be an array of { book: id, quantity }

  for (let item of items) {
      const book = await SELECT.one.from(Books).where({ ID: item.bookid });
      if (!book) return req.error(404, `Book #${id} doesn't exist`);
      if (item.quantity > book.stock) return req.error(409, `Quantity ${quantity} exceeds stock for book #${id}`);
      // Check if stock is null or insufficient
    if (book.stock === null) {
      return req.error(500, `Stock is null for book #${item.bookid}`);
    }



    const newStock = book.stock - item.quantity;
      await UPDATE(Books).set({ stock:newStock }).where({ ID: item.bookid  });
  }

  return { message: 'Order placed successfully' };
})

this.before('POST', 'Orders', req => {
  const status = req.data.status;
  if (!['P', 'C', 'S'].includes(status)) {
      req.error(400, `Invalid status: ${status}. Must be one of: P, C, S.`);
  }
})


this.on('readBooks', async (req) => {
  // Start a transaction
  const tx = cds.tx(req);

  try {
      // Run a SELECT query within the transaction
      const books = await tx.run(SELECT.from(Books));
      return books;

  } catch (error) {
      // Handle any errors
      console.error("Error executing transaction:", error);
      throw error;

  } finally {
      // Ensure transaction completion
      await tx.commit();
  }

})

// this.on('CREATE', 'Orders', async (req) => {
//   const { items, ...orderData } = req.data;

//   // Create the Order
//   const order = await cds.run(INSERT.into(Order).entries(orderData));

//   // If there are items, insert them as well
//   if (items && items.length > 0) {
//       const orderItems = items.map(item => ({
//           ...item,
//           order_ID: order.ID, // Link to the parent Order
//       }));
//       await cds.run(INSERT.into(OrderItems).entries(orderItems));
//   }

//   return order;
// });



  // Reading orders with static filter "Shipped"
  this.on ('READ','ShippedOrders', async (req)  => {
    // try {
    //   const { Orders } = cds.entities('my.bookshop');
    //   let results;
    //   // Example of custom logic: Check for a query option
    //  const statusFilter = 'Shipped';  //req.query.status; 
      
    //  results = SELECT.from(Orders).where({ status: 'Shipped' });

    //   return results; 
    // } catch (error) {
    //   // Handle any errors that occur during the read operation
    //   console.error('Error fetching orders:', error);
    //   req.error(500, 'Internal Server Error');
    // }
  })

  // After Event; Reading books reducing price if the stock is more than 100.
  // this.after ('READ','Books', each => {
  //   if (each.stock > 100) {
  //    // each.title +='---discount';
  //     each.price = each.price -10;
  //   }
  // })

// before posting the data valiation
  this.before('POST', 'Orders', req => {
    const status = req.data.status;
    if (!['P', 'C', 'S'].includes(status)) {
        req.error(400, `Invalid status: ${status}. Must be one of: P, C, S.`);
    }
  })


//   this.on('CREATE', 'Books', async (req) => {
//     const { Authors } = cds.entities('my.bookshop');
//     const { author } = req.data;
//     const authorExists = await SELECT.from(Authors).where({ ID: author.ID });
//     if (!authorExists.length) {
//         return req.reject(400, `Author with ID ${author.ID} does not exist.`);
//     }
// });


}



