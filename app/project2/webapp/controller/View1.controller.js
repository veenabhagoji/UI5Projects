sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "project2/utils/formatter",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/Input",
    "sap/m/SearchField",
    "sap/m/StandardListItem",
    "sap/m/ActionListItem"
], function (Controller, formatter, JSONModel, MessageToast, Input, SearchField, StandardListItem, ActionListItem) {
    "use strict";

    return Controller.extend("project2.controller.View1", {
        formatter: formatter,

        onInit: function () {
            var oData = {
                "ButtonData": [
                    { "data1": "1", "data2": "2", "data3": "3", "data4": "4" }
                ]
            };
            var oTableModel = new JSONModel({
                rows: [] // Initial empty data for the table
            });

            // Set the model to the view
            this.getView().setModel(oTableModel, "tableModel");
        


            var oModelBtn = new JSONModel(oData);
            this.getView().setModel(oModelBtn, "btndata");

            var oModel = new JSONModel();
            oModel.loadData("model/normaltext.json");
            this.getView().setModel(oModel, "normaltext");

            var oModel1 = new JSONModel();
            oModel1.loadData("model/htmltext.json");
            this.getView().setModel(oModel1, "htmltext");

            var oModel2 = new JSONModel();
            oModel2.loadData("model/listtypes.json");
            this.getView().setModel(oModel2, "listtypes");

            var oDateModel = new JSONModel({
                date1: "2025-01-15", // For DatePicker 1
                date2: "2025-01-16", // For DatePicker 2
                date3: "2025-01-17"  // For DatePicker 3
            });
            this.getView().setModel(oDateModel, "dateModel");
        },

        createListItem: function (sId, oContext) {
            // Get the sentence from the context (it is a string, not an object with a title property)
            var sentence = oContext.getProperty();
        debugger;
        var oData= oContext.sPath.split("/")[2]
        if(oData%2==0)
            return new StandardListItem({
                title: sentence
            });
            else {
                return new ActionListItem({
                    text: sentence
                });
            }
        },
        

        onDateChange: function (oEvent) {
            var oDatePicker = oEvent.getSource();
            var sNewDate = oEvent.getParameter("value");

            console.log("DatePicker ID:", oDatePicker.getId());
            console.log("New Selected Date:", sNewDate);
        },

        onSelectedKey: function (oEvent) {
            var key = oEvent.getSource().getSelectedKey();
            console.log("Selected Key: ", key);

            var createContent;
            switch (key) {
                case "standardListItem":
                    createContent = this.createListItem;
                    MessageToast.show("Standard List item is selected");
                    break;
                case "actionListItem":
                    createContent = function (sId, oContext) {
                        return new ActionListItem({
                            text: oContext.getProperty("text")  // Assuming there's a text property
                        });
                    };
                    MessageToast.show("Action List item is selected");
                    break;
                case "inputListItem":
                    MessageToast.show("Input List item is selected");
                    break;
                default:
                    MessageToast.show("No valid item selected");
                    return;
            }

            var oList = this.byId("idList");
            oList.removeAllItems();
            oList.bindAggregation("items", {
                //path: "normaltext>/regularSentences",
                factory: createContent
            });
        },

        onAfterRendering: function () {
            var oVBox = this.byId("idInpt");

            var oInput = new Input({
                placeholder: "Search...",
                width: "300px"
            });

            var oSearchField = new SearchField({
                visible: true,
                width: "150px",
                placeholder: ""
            });

            oVBox.addItem(oInput);
            oVBox.addItem(oSearchField);
        },
        addRow: function () {
            // Access the table model
            var oModel = this.getView().getModel("tableModel");

            // Get current rows
            var aRows = oModel.getProperty("/rows");

            // Add a new blank row
            aRows.push({
                column1: "", // Blank value for column 1
                column2: ""  // Blank value for column 2
            });

            // Update the model with the new rows
            oModel.setProperty("/rows", aRows);
        },
        deleteRow: function() {

            var oModel = this.getView().getModel("tableModel");

            var aRows = oModel.getProperty("/rows");

            aRows.pop({
                column1: "", // Blank value for column 1
                column2: ""  // Blank value for column 2
            });

            // Update the model with the new rows
            oModel.setProperty("/rows", aRows);
        }
    });
});
