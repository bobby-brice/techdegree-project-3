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

        $('.activities input').each(function (i, input) {
            const currentCheckbox = $(this);
            
            if ( activityChecked === currentCheckbox.attr('data-day-and-time') && clicked.attr('name') !== currentCheckbox.attr('name')) {

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

// REGEX CONSTANTS
    const emailValid = /[^@]+@[^\.]+\..+/g;
    const creditCardValid = /^(?:[0-9]{13,16})?$/;
    const zipValid = /^\d{5}$/;
    const cvvValid = /^\d{3}$/;
    const nameValid = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
    
//NAME VALIDATION
    const nameInput = $('#name');
    const errorSpan = $("<span></span>").text("Please enter your name").css("color", "red");
    nameInput.after(errorSpan);
    errorSpan.hide();

    nameInput.on('focusout', function () {
        
        function validateName() {

            if (nameInput.val() === '' || nameValid.test(nameInput.val())) {
                
                errorSpan.show();
                $('#name').focusout();
                return false;
            } else {
                errorSpan.hide();
                return true;
            }
        }
        validateName();
    });

    const emailInput = $('#mail');
    const errorMail = $("<span></span>").text("Please enter a valid email").css("color", "red");
    emailInput.after(errorMail);
    errorMail.hide();

    emailInput.on('focusout', function () {

        function validateEmail() {

            if (emailInput.val() === '') {

                errorMail.show();
                $('#mail').focusout();
                return false;
            }

            if (!emailValid.test(emailInput.val())) {

            errorMail.show();
            $('#mail').focusout();
            return false;

            } else {
                errorMail.hide();
                return true;
            }
        }
        validateEmail();
    });
    


    //conditional function to validate the entire form
    function validateForm () {
        if ( validateName() && validateEmail() ) { //add each validation function to an && condition to test if true
            return true;
        } else {
            return false;
        }
    }

    //submit listener to prevent default if the entire form is not valid
    $('form').on('submit', function (e) {
        e.preventDefault();
        if (validateForm) {
            return true;
        } else {
            e.preventDefault();
        }
    });    

}) //end of document ready