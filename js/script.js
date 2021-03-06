$(document).ready(function() {
    /****************************************************************
     * SIMON SAYS
       - Un alert() espone 5 numeri generati casualmente.
       - Da li parte un timer di 30 secondi.
       - Dopo 30 secondi l'utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite il prompt().
       - Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.
    ****************************************************************/
   //VARIABLES
    var numOfNumbers = 5;
    var numbers = [];
    var speed = 30000;
    var seconds = (speed / 1000) - 1;

    //Generate random numbers
    fillArray(numbers, numOfNumbers);
    
    // REFERENCES
    var box = $('.box');
    var btn = $('.btn-got');
    var user = $('.user-num');
    var btnUser = $('.btn-user');
    var btnRef = $('.btn-refresh');
    var timer = $('.timer');
    var input = $('.input-field');
    var cong = $('.cong');

    // Refresh page
    btnRef.click(function() {
        location.reload();
    });

    //Print random numbers
    for(var i = 0; i < numbers.length; i++){
        box.eq(i).text(numbers[i]);
    }

    //Button to hide numbers and start timer
    btn.click(function(){
        
        //Disabled got it button
        btn.attr('disabled', true);

        // Hide numbers
        box.each(function(){
            $(this).text('*');
        });
        
        // Countdown
        timer.text(seconds + 1);
        var interval = setInterval(function(){

            if (seconds === 0){
                clearInterval(interval);
                timer.text('');
            } else {
                timer.text(seconds);
                seconds--;
            }
        }, 1000);
        
        //Timer
        setTimeout(function(){
            //Show user input
            input.show();
            
            var userNumbers = [];
            
            //Click on check button
            btnUser.click(function() {
                var check = false; 

                //Clear userNumbers
                userNumbers.splice(0, userNumbers.length);
                //Fill userNumbers
                user.each(function() {
                    if(!userNumbers.includes(parseInt($(this).val()))){
                        userNumbers.push(parseInt($(this).val()));
                    }
                    // Check if respect the range
                    if (!this.validity.valid){
                        userNumbers.pop();
                        userNumbers.push(-1);
                    }
                });

                //Check validity of userNumbers
                if(userNumbers.includes(NaN)){ // Check if is empty
                    alert('Please enter all the numbers');
                } else if (userNumbers.length < numOfNumbers){ //Check if is repet
                    alert('Please not enter equal numbers')
                } else if(userNumbers.includes(-1)){ //Check if is out of range
                    alert('Please enter number between 1 and 100')
                } else {
                    check = true;
                    //Disabled input
                    user.each(function() {
                        $(this).attr('disabled', true);
                    });
                }
                
                //Result
                if(check){
                    // Add color class
                    for(var i = 0; i < userNumbers.length; i++){
                        if(numbers.includes(userNumbers[i])){
                            user.eq(i).addClass('correct');
                        } else {
                            user.eq(i).addClass('uncorrect');
                        }
                    }

                    // Show numbers
                    for(var i = 0; i < numbers.length; i++){
                        box.eq(i).text(numbers[i]);
                    }

                    //Disabled check button
                    btnUser.attr('disabled', true);

                    //Check Result
                    var count = 0;
                    
                    for(var i = 0; i < numbers.length; i++){
                        if(numbers.includes(userNumbers[i])){
                            count++;
                        }
                    }
                    // All numbers guessed
                    if(count === numbers.length){
                        cong.show();
                        confetti({
                            particleCount: 2000,
                            spread: 180,
                            gravity: .4,
                            ticks: 500
                        });
                    }
                }
            });
        }, speed);       
    });

    //End Doc Ready
});

/* *************
* FUNCTIONS
************ */
/**
 * Returns a random number between 1 and 100
 * @returns 
 */
function randNum(){
    return Math.floor(Math.random() * 100 + 1);
}

/**
 * Populate an array with random numbers
 * @param {array} numArray array of numbers
 * @param {number} length length of array
 */
function fillArray(numArray, length){
    while(numArray.length < length){
        var num = randNum();

        if(!numArray.includes(num)){
            numArray.push(num);
        }
    }
}

/**
 * Guess numbers from array
 * @param {array} numArray array of numbers
 * @param {number} length length of array
 */
function guessNum(numArray, length){
    alert('Enter the numbers you remember');
        
    var userNumbers = [];
    var guessedNumbers = [];
    
    //Enter Numbers
    while(userNumbers.length < length){
        var num = parseInt(prompt('Enter a number').trim());
        while(isNaN(num)){
            num = parseInt(prompt('This is not a number!\nEnter a number'));
        }

        if(!userNumbers.includes(num)){
            userNumbers.push(num);
        } else {
            alert('Number already entered!')
        }
    }

    //Result
    for(var i = 0; i < userNumbers.length; i++){
        if(numArray.includes(userNumbers[i])){
            guessedNumbers.push(userNumbers[i]);
        }
    }
    alert('You guessed ' + guessedNumbers.length + ' out of ' + length + ' numbers\n' + guessedNumbers);
}