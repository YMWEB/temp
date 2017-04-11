/**
 * load jquery validation plugin first
 */
(function($) {
    "use strict";
    /**
     * add the validation rules
     */
    var cciRules = {
        "cci-email": [
            function(value,element) {
                return this.optional(element) || /^([a-z0-9,!\#\$%&'\*\+\/=\?\^_`\{\|\}~-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z0-9,!\#\$%&'\*\+\/=\?\^_`\{\|\}~-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*@([a-z0-9-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z0-9-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*\.(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]){2,})$/i.test(value);
            },
            'please write the correct emails'
        ],
        "letters-only": [
            function(value, element) {
                return this.optional(element) || /^[a-z]+$/i.test(value);
            },
            'Letters only please'
        ],
        "no-whitespace": [
            function(value, element) {
                return this.optional(element) || /^\S+$/i.test(value);
            },
            'No white space please'
        ],
        "zip-CHN": [
            function(value, element) {
                return this.optional(element) || /^[1-9]\d{5}(?!\d)/.test(value);
            },
            'Your zip code should be six digital'
        ],
        "cellphone-CHN": [
            function(value, element) {
                var check = false;
                if ($.trim(value) !== "" && value.length === "11") {
                    check = true;
                }
                return this.optional(element) || check;
            },
            'Please enter the valid cellphone number'
        ],
        "cci-password": [
            function(value, element) {
                return this.optional(element) || "^(?=.*?[0-9])(?=.*?[A-Za-z])[A-Za-z0-9~!@#$%^&-_+]*$".test(value);
            },
            'Password should contain at least one letter and one number'
        ]

    };

    $.each(cciRules, function(i, rule) {
        rule.unshift(i);
        $.validator.addMethod.apply($.validator, rule);
    });

    /**
     * add/override attribute class rules
     */
    $.validator.addClassRules({
        "cci-email": {
            "cci-email": true
        },
        "cci-required": {
          "required": true
        },
        "zip-CHN": {
          "zip-CHN": true
        },
        "cci-password": {
          "cci-password": true
        },
        "cellphone-CHN": {
          "cellphone-CHN": true
        }
    });

    /**
      * change error placement
    */

$.extend($.validator.defaults, {
    errorElement:"div",
    errorPlacement: function(place,element) {
      place.insertBefore(element);
    }
})
    /**
     *Get localize message
     */
    var addLocalizeData = function(data) {
        $.each(data, function(i, item) {
            var rulejson = {};
            rulejson[i] = item.msg;
            $.validator.messages = $.extend($.validator.messages,
                rulejson);
        });
    };

    var getLocalJson = function(path) {
        $.getJSON(path, function(data) {
            addLocalizeData(data);
        });
    };

    getLocalJson("/js_validation/lib/localization/cci-message.json");
})(jQuery)
