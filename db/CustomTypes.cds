
namespace my.bookshop;

//using { Currency, managed, sap } from '@sap/cds/common';

type OrderStatus : String enum {
    Pending = 'P';
    Completed = 'C';
    Shipped = 'S';
}
