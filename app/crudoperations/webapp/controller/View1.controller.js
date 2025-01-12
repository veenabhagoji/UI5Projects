sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("crudoperations.controller.View1", {
        onInit() {
           // this.onReadFilters();
           const oRouter = this.getOwnerComponent().getRouter();
           oRouter.getRoute("RouteAuthor").attachPatternMatched(this.onAuthorButtonPress, this);
        },
        onAuthorButtonPress: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            console.log(oRouter);
            oRouter.navTo("RouteAuthor");
        },
        

         onReadAll: function() {
            var that=this;
            var oModel=this.getOwnerComponent().getModel();
           

            oModel.read("/Books", {
                
                success: function(odata) {
                    sap.m.MessageToast.show(`No of Books ${odata.results.length}`);
                  
                    // var jModel = new sap.ui.model.json.JSONModel(odata);
                    // that.getView().byId("idBooksTable").setModel(jModel);
                },
                error: function(oError) {
                    console.log(oError);
                }

            });

         },

        //  onReadFilters: function() {
        //    var that=this;
        //  var oModel=this.getOwnerComponent().getModel();

           
        //   var oTable = this.getView().byId("idBooksTable"); // Replace with your table's ID
        //        var oBinding = oTable.getBinding("items"); // Use "rows" for analytical tables
            
    //             // Create a filter for Author_Name equal to "Emily Brontë"
    //                         // Apply the filter
    //             var oFilter =new sap.ui.model.Filter({
    //                 path: 'ID',
    //                 operator: sap.ui.model.FilterOperator.EQ,
    //                 value1: 'a9b2c3d4-e5f6-4g7h-8i9j-k10l11m12n13'
    //             });
  
//     var aFilters =[
//         new sap.ui.model.Filter("author_ID", sap.ui.model.FilterOperator.EQ, "g7h8i9j1-k2l3-4m4n-o5p6-q17r18s19t20")
//     ];
//     oBinding.filter(aFilters);
// },
    //            let aFilters = []
    //            aFilters.push(oFilter);
    //             // Apply the filter to the aggregation binding
    //             oBinding.filter(aFilters);
            
            
    //     //     var oFilter = new sap.ui.model.Filter("ID", "EQ", "a9b2c3d4-e5f6-4g7h-8i9j-k10l11m12n13");
         
    //     //  oModel.read("/Books", {
    //     //     filters: [oFilter],
    //     //     success: function(odata) {
    //     //         console.log(odata.result);
    //     //         // var jModel = new sap.ui.model.json.JSONModel(odata);
    //     //         // that.getView().byId("idBooksTable").setModel(jModel);
    //     //     },
    //     //     error: function(oError) {
    //     //         console.log(oError);
    //     //     }

    //     // });
    // }
       onCreate: function() {
        var oNewItem = {
            author_ID:"g7h8i9j1-k2l3-4m4n-o5p6-q17r18s19t20",
            descr:"my book"
            
        };
        var that=this;
        var oModel=this.getOwnerComponent().getModel();
    
        oModel.create("/Books", oNewItem, {
            success: function(oData) {
                console.log("Book is created");
                oModel.refresh(true);
            },
            error: function(oError) {
                console.log("failed");
            }

        });
       },
       onUpdate: function() {
        var oUpdateItem = {
            title:"Veenu loves Mayu",
             descr:"my first book Version-"+ Math.random(),
             author_ID:"g7h8i9j1-k2l3-4m4n-o5p6-q17r18s19t20"

        };
        var that=this;
        var oModel=this.getOwnerComponent().getModel();
    
        oModel.update("/Books('a9b2c3d4-e5f6-4g7h-8i9j-k10l11m12n13')", oUpdateItem, {
            success: function(oData) {
                console.log("Book descr is updated");
                oModel.refresh(true);
            },
            error: function(oError) {
                console.log("failed");
            }

        });

        }

       
       
     


    });
});