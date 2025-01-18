sap.ui.define([
    "sap/ui/core/format/DateFormat" // Required for date formatting
], function (DateFormat) {
    "use strict";

    return {
        /**
         * Formatter for button type.
         * @param {string} value - Input value to determine the button type.
         * @returns {string} - Button type based on the input value.
         */
        buttonType: function (value) {
            switch (value) {
                case "1":
                    return "Accept"; // Corresponds to Accept button type
                case "2":
                    return "Success"; // Corresponds to Success button type
                case "3":
                    return "Reject"; // Corresponds to Reject button type
                case "4":
                    return "Emphasized"; // Corresponds to Emphasized button type
                default:
                    return "Default"; // Default button type if no match
            }
        },

        /**
         * Formatter for date values.
         * @param {string|Date} value - The input date value.
         * @param {string} pattern - The desired date format pattern.
         * @returns {string} - Formatted date string.
         */
        formatDate: function (value, pattern) {
            if (!value) {
                return null;
            }

            var oDate = new Date(value);
            var oDateFormat = DateFormat.getDateInstance({ pattern: pattern });
            return oDateFormat.format(oDate);
        }
    };
});
