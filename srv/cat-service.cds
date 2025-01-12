using my.bookshop as my from '../db/datamodel';

service CatalogService @(path: '/browse') {

  // @readonly
  entity Books      as
    projection on my.Books {
        ID,
    title,
    descr,
    author,         // Exposing the full association
    genre,          // Exposing the full association
    stock,
    price,
    currency,
    icon1,
    Rating,
    author.name as authorname,
    genre.name as genrename

    }
  
 action readBooks() returns array of Books;

action submitOrder(book : Books:ID, quantity : Integer);



  action placeOrder(items : array of {
    bookid : Books:ID;
    quantity : Integer;
  });

  //  entity Authors as projection on my.Authors;
  entity Authors    as
    projection on my.Authors;
   //  {
      // ID,
      // name,
      // NoofBook
    // Other fields as needed
   // }

  entity Genres     as projection on my.Genres;
  entity Customers  as projection on my.Customers;
    @cds.redirection.target: true

  entity Orders     as projection on my.Orders;
 entity ShippedOrders as projection on my.Orders ;
  entity OrderItems as projection on my.OrderItems;
  


}
