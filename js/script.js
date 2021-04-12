$(document).ready(function() {
    /****************************************************************
     * SIMON SAYS
       - Un alert() espone 5 numeri generati casualmente.
       - Da li parte un timer di 30 secondi.
       - Dopo 30 secondi l'utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite il prompt().
       - Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.
    ****************************************************************/

    //End Doc Ready
});
    var numOfNumbers = 5;
    var numbers = [];
    var userNumbers = [];
    var guessedNumbers = [];
    
    //Generate five random numbers
    while(numbers.length < numOfNumbers){
        var num = randNum();

        if(!numbers.includes(num)){
            numbers.push(num);
        }
    }
    //Alert
    alert('Remember these numbers\n' + numbers);

    //Timer
    setTimeout(function(){
        alert('Enter the numbers you remember');
        
        while(userNumbers.length < numOfNumbers){
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
            if(numbers.includes(userNumbers[i])){
                guessedNumbers.push(userNumbers[i]);
            }
        }
        alert('You guessed ' + guessedNumbers.length + ' out of ' + numOfNumbers + ' numbers\n' + guessedNumbers);
    }, 2000);



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