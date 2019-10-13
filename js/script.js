    $(document).ready(function () {

    //global variables
    let totalCostContainer = "<span></span>";
    $('.activities').append(totalCostContainer);
    let totalActivityCost = 0;
        
    //apply focus to the name field on page load
    $('#name').focus();

    //JOB ROLE SECTION

    //hides the 'Other Job' text input by default
    $('#other-title').hide();

    //change listener to show the other job input when other is selected
    $('#title').change(function () {
        if ($('#title').val() === 'other') {
            $('#other-title').show();
        } else {
            $('#other-title').hide();
        }
    });

    // T-SHIRT SECTION

    //create a new element for the color options to select a t shirt
    const themeSelect = '<option selected="selected" id="themeSelect">Please select a T-shirt theme</option>';
    //hide the select theme option
    $('option[value="Select Theme"]').attr("hidden", "hidden");
    //when the design option is set to Select Theme, display the new themeSelect option and assign it an attribute of disabled until the value is changed in the event listener
    if ( $('#design option:selected').text() === 'Select Theme') {
         $('#color').prepend(themeSelect).attr('disabled', 'disabled');
    }

    //hides color options
    $('#colors-js-puns').hide();

    //change listener to watch for changes to the theme and reveal the color options list
    $('#design').on('change', function(e) {
        if ( $(e.target).val() !== "") { //if the selection is not empty show the color options
            $('#colors-js-puns').show();
        }

        $('#themeSelect').remove(); //removes the "please select..." option
        $('#color').removeAttr('disabled'); //removes the disbaled color field
  
        if ($(this).val() === 'js puns') {
            $('#color option[value="cornflowerblue"]').show().attr('selected', 'selected');
            $('#color option[value="darkslategrey"]').show();
            $('#color option[value="gold"]').show();
            $('option[value="tomato"]').hide();
            $('option[value="steelblue"]').hide();
            $('option[value="dimgrey"]').hide();

        } else if ($(this).val() === 'heart js') {
            $('#color option[value="tomato"]').show().attr('selected', 'selected');
            $('#color option[value="steelblue"]').show();
            $('#color option[value="dimgrey"]').show();
            $('option[value="cornflowerblue"]').hide();
            $('option[value="darkslategrey"]').hide();
            $('option[value="gold"]').hide();

        } else {
            $('#color').prepend(themeSelect).attr('disabled', 'disabled');
        }

    });

    //ACTIVITY SECTION

    //create an element to display the total cost - assigned to global above
    //add a change event listener to the activity section
    $('.activities').on('change', function(e) {
        //variable to reference the DOM input element clicked
        const clicked = $(e.target);
        //get the 'data-cost' attr of the clicked var and store it in a new variable so it can be added to the the totalActivityCost
        let activityCost = clicked.attr('data-cost');
        //remove the $ from the data attribute because the string returns NaN
        let removeDollarSign = activityCost.slice(1);
        let convertCost = parseInt(removeDollarSign);
        //if/else statement to check if the clicked input is checked or unchecked. If checked add the current clicked activity else - subtract.
        if ($(clicked).is(':checked')) {
            totalActivityCost += convertCost;
        } else {
            totalActivityCost -= convertCost;
        }

       $('.activities span').text('Total: $' + totalActivityCost); //update the span with total cost

        //DISABLE CONFLICTING ACTIVITIES
        const activityChecked = clicked.attr('data-day-and-time');

        $('.activities input').each(function (i, input) { //iterate over each activity checkbox
            const currentCheckbox = $(this);
            
            if ( activityChecked === currentCheckbox.attr('data-day-and-time') && clicked.attr('name') !== currentCheckbox.attr('name')) { //if the activity selected is equal to the date/time of another activity AND the name isn't the same - disable that activity
                if ($(clicked).is(':checked')) {
                    $(input).prop("disabled", true);   
                } else {
                    $(input).prop("disabled", false);
                }
            }       
        })
    });

    //PAYMENT SECTION

    //hide the select payment method from the dropdown

    $('option[value="select method"]').attr("hidden", "hidden");

    //initally credit card should be selected and displayed only

    $('option[value="Credit Card"]').attr("selected", "selected");
    const creditDiv = $('#credit-card');
    const bitcoinDiv = $('#bitcoin').hide();
    const paypalDiv = $('#paypal').hide();

    //change event listener to get the value of the payment select element and if equal to selected, show and hide other payment method

    $('#payment').on('change', function (e) {
        const selected = $(e.target);
        
        if (selected.val() === "Credit Card") {
            creditDiv.show();
            bitcoinDiv.hide();
            paypalDiv.hide();
        } else if (selected.val() === "PayPal") {
            paypalDiv.show();
            creditDiv.hide();
            bitcoinDiv.hide();    
        } else if (selected.val() === "Bitcoin") {
            bitcoinDiv.show();
            creditDiv.hide();
            paypalDiv.hide();
        }

    });

//FORM VALIDATION AND VALIDATION MESSAGES 
    //NAME VALIDATION
    
    function validateName() {
        const nameInput = $('#name');
        const nameValid = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;

        if (!(nameValid.test($("#name").val()))) {
            
            nameInput.css('border-color', 'red');
            $('[for="name"] span').remove(); //
            $('[for="name"]').append('<span> Please enter a valid name.</span>').css('color', 'red');
            return false;
        } else {
            nameInput.css('border-color', '#6F9DDC'); //resets input border color, removes the span
            $('[for="name"] span').remove(); 
            $('[for="name"]').css('color', '#000');
            return true;
        }
    }

    //EVENT LISTENER TO SHOW NAME ERROR
    $('#name').on('focusout', function () {
        validateName();
    });

    //EMAIL VALIDATION
    function validateEmail() {
        const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (!(validEmail.test($("#mail").val()))) {
            $('#mail').css('border-color', 'red');
            $('[for="mail"] span').remove();
            $('[for="mail"]').append('<span> Please enter a valid email.</span>').css('color', 'red');
            return false;
        } else {
            $('#mail').css('border-color', '#6F9DDC');
            $('[for="mail"] span').remove();
            $('[for="mail"]').css('color', '#000');
            return true;
        }
    }

    //EVENT LISTENER TO SHOW EMAIL ERROR
    $('#mail').on('focusout', function () {
        validateEmail();
    });


    //ACTIVITIES VALIDATION - at least one activity must be checked
    function validateActivities () {
        if($('input[type="checkbox"]').is(':checked')) {
            $('.activities legend span').remove();
            return true;
        } else {
            $('.activities legend span').remove();
            $('.activities legend').append('<span>: Please select an activity.</span>').css('color', 'red');
        return false;
        }

    }
    

    //EVENT LISTENER TO SHOW activities ERROR
    $('.activities').on('click', function () {
        validateActivities();
    });
    

    // CREDIT CARD # VALIDATION
    function validateCardNum () {
        const creditCardValid = /^(?:[0-9]{13,16})?$/;

        if ($('#cc-num').val().length < 13) {
            $('#cc-num').css('border-color', 'red');
            $('[for="cc-num"] span').remove();
            $('[for="cc-num"]').append('<span> Credit card number must be at least 13 digits long.</span>').css('color', 'red');
            return false;
        } else if ($('#cc-num').val().length > 16) {
            $('#cc-num').css('border-color', 'red');
            $('[for="cc-num"] span').remove();
            $('[for="cc-num"]').append('<span> Credit card number must not exceed 16 digits.</span>').css('color', 'red');
            return false;
        }
        else {
            if (creditCardValid.test($('#cc-num').val())) { //if the test value is true else = throw error
            $('#cc-num').css('border-color', '#6F9DDC');
            $('[for="cc-num"] span').remove();
            $('[for="cc-num"]').css('color', '#000');
            return true;
        } else {
            $('#cc-num').css('border-color', 'red');
            $('[for="cc-num"] span').remove();
            $('[for="cc-num"]').append('<span> Credit card number must be between 13 - 16 digits.</span>').css('color', 'red');
           return false;
            }
        }
    }

    //EVENT LISTENER TO SHOW Credit Card ERROR
    $('#cc-num').on('focusout', function () {
        validateCardNum();
    });


    // Zip Code Validation
    function validateZip() {
        const zipValid = /^[0][1-9]\d{4}$|^[1-9]\d{4}$/;

        if (!(zipValid.test($('#zip').val()))) { //if the zip testing the value of the input is false
            $('#zip').css('border-color', 'red');
            $('[for="zip"] span').remove();
            $('[for="zip"]').append('<span> Please enter a valid zip code.</span>').css('color', 'red');
            return false;
        } else {
            $('#zip').css('border-color', '#6F9DDC');
            $('[for="zip"] span').remove();
            $('[for="zip"]').css('color', '#000');
            return true;
        }
    }

    //EVENT LISTENER TO SHOW ZIP ERROR
    $('#zip').on('focusout', function () {
        validateZip();
    });


    //CVV Validation
    function validateCvv() {
        const cvvValid = /^[0][1-9]\d{2}$|^[1-9]\d{2}$/;

        if (!(cvvValid.test($('#cvv').val()))) { //if the cvv testing the value of the input is false
            $('#cvv').css('border-color', 'red');
            $('[for="cvv"] span').remove();
            $('[for="cvv"]').append('<span> Please enter a valid CVV.</span>').css('color', 'red');
            return false;
        } else {
            $('#zip').css('border-color', '#6F9DDC');
            $('[for="cvv"] span').remove();
            $('[for="cvv"]').css('color', '#000');
            return true;
        }
    }

    //EVENT LISTENER TO SHOW CVV ERROR
    $('#cvv').on('focusout', function () {
        validateCvv();
    })

//END FORM VALIDATION AND MESSAGES

    //CONDITIONAL FUNCTION TO VALIDATE FORM SUBMIT
    const validateForm = $('form');

    validateForm.on('submit', function(e){

        if (validateName() === false) { //add each validation function to test if true or prevent default
            e.preventDefault();
        } 
        
        if (validateEmail() === false) {
            e.preventDefault();
        }

        if (validateActivities() === false) {
            e.preventDefault();
        }

        if ($('[value="Credit Card"]').is(':selected')) { //if CC is selected an any of the 3 conditions is false, prevent default and throw error
            if (validateCardNum() === false) {
                e.preventDefault();
            }
            if (validateZip() === false) {
                e.preventDefault();
            }
            if (validateCvv() === false) {
                e.preventDefault();
            }
        }

    });   

}) //end of document ready