sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
], function (Controller, Fragment) {
    "use strict";

    return Controller.extend("resume.controller.View1", {

        onInit: function () {
            // Check if fragment is loaded
            if (!this.byId("summaryId")) {
                Fragment.load({
                    id: this.createId("summaryId"),
                    name: "resume.Fragments.Summary",
                    controller: this
                }).then(function (oFragment) {
                    this.getView().byId("content").addItem(oFragment);
                }.bind(this));
            }
        }
    });
});
