using { Currency, managed, sap } from '@sap/cds/common';
using my.bookshop as CustomTypes from './CustomTypes';

namespace my.bookshop;

entity Books : managed {
  key ID          : UUID;
  title  :  String(30);
  descr  :  String(100);
  author : Association to Authors;
  genre  : Association to Genres;
  stock  : Integer;
  price  : Decimal(9,2);
  currency : Currency;
  icon1: String(50);
  Rating: String(1)
}

entity Authors : managed {
  key ID : UUID;
  name   : String(111);
  NoofBook: Integer;
 // books  : Association to many Books on books.author = $self;
  books  : Composition of many Books on books.author = $self; // Composition (one-to-many)
}

/** Hierarchically organized Code List for Genres */
entity Genres : sap.common.CodeList {
  key ID   : Integer;
  name   : String(10);
  books   : Composition of many Books on books.genre = $self;
}



entity Orders : managed {
   key ID          : UUID;
   customer        : Association to Customers;
   orderDate       : DateTime;
   totalAmount     : Decimal(10, 2);
   status          : CustomTypes.OrderStatus; // e.g., Pending, Completed, Shipped
    items           : Composition of many OrderItems on items.order = $self;
}

entity OrderItems : managed {
   key ID          : UUID;
   order           : Association to Orders;
  book            : Association  to Books ;
   quantity        : Integer;
   unitPrice       : Decimal(10, 2);
   totalPrice      : Decimal(10, 2);
}

// Customer Data
entity Customers : managed {
   key ID          : UUID;
   key name            : String(100);
   email           : String(100);
   phone           : String(20);
   address         : String(255);
}



