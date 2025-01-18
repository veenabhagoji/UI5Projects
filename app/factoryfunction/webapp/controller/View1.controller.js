sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/ColumnListItem",
    "sap/m/ObjectIdentifier",
    "sap/m/Text"
], function (Controller,
	JSONModel,
	ColumnListItem,
	ObjectIdentifier,
	Text) {
    "use strict";

    return Controller.extend("factoryfunction.controller.View1", {

        onInit() {
            var oModel = new JSONModel();

            oModel.loadData("./model/products.json");

            this.getView().setModel(oModel, "Products");
        },

        factoryFun: function (sId, oContext) {
            // Access data for the current context
            var oData = oContext.getObject();
            var index = oContext.getPath().split("/")[2];
            var oCells=[];
            oCells.push(new ObjectIdentifier({
                    title:"{Products>Product}",
                    text: "{Products>ProductId}"
                }));
             oCells.push(new Text({
                       text: "{Products>SupplierName}"
                    }));
                    if(index%2==0){
                        oCells.push(new Text({
                            text: "{Products>Dimensions}"
                         }));
                    }
                    else{
                        oCells.push(new sap.m.Input({
                            value: "{Products>Dimensions}",
                            editable:false
                         }));
                    }

          
            oCells.push(new Text({
                   text: "{Products>Weight}"
                 }));
            oCells.push(new Text({
                    text: "{Products>Price}"
                 }));
                
           
        return new ColumnListItem({
            cells: oCells
        });
      
            // Create a ColumnListItem for the table row
        
        }
    });
});
