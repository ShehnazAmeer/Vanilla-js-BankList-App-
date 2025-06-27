'use strict'
console.log('Stay motivated');

const account1 = {
    owner: 'Shehnaz Ameer',
    movements: [200, 250, -50, 500, -200, 500, -700, 900],
    interestRate: 1.2,
    pin: 111,
    movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2025-03-02T09:15:04.904Z",
    "2025-02-28T10:17:24.185Z",
    "2025-03-03T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2025-02-26T10:51:36.790Z",
  ],
      currency: "EUR",
      locale: "en-GB", // de-DE
};
const account2 = {
    owner: 'Ameer Muhammad',
    movements: [900, 500, -200, 500, 700, -100, 1200, -600],
    interesetRate: 1.5,
    pin: 222,
      movementsDates: [
    "2025-03-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
      currency: "USD",
      locale: "en-US",
};
const account3 = {
    owner: 'Nusrat Begham',
    movements: [900, 500, -200, 500, 700, -100, 1200, -600],
    interesetRate: 1.5,
    pin: 222,
      movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
      currency: "USD",
      locale: "en-US",
};

const accounts = [account1, account2,account3];
//////////////app working\\\\\\\\\\\\\\\\\\\
const lableWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const lableBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.in');
const labelSumOut = document.querySelector('.out');
const lableSumInterest = document.querySelector('.interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.main');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.submit');
const btnTransfer = document.querySelector('.transfer');
const btnLoan = document.querySelector('.btn-loan');
const btnClose = document.querySelector('.btn-close');
const btnSort = document.querySelector('.sort');

const inputLoginUserName = document.querySelector('.username');
const inputLoginPin = document.querySelector('.password');
const transfertoInput = document.querySelector('#transfer-to');
const transferAmountInput = document.querySelector('#transfer-amount');
const loanAmountInput = document.querySelector('#request-loan');
const closeUsernameInput = document.querySelector('#confirm-user');
const closePinInput = document.querySelector('#confirm-pin');
let isRunning = false;
let startTime = 1 * 300;
function startLogoutTimer() {
    //set timer to 5 min
    //calling timer every second
    if (!isRunning) {
        let timer = setInterval(() => {
            let min = String(Math.trunc(startTime / 60)).padStart(2, '0');
            let sec = String(startTime % 60).padStart(2, '0');
           
            //on each call, print remaining timer to UI
            labelTimer.textContent = `${min}:${sec}`;
            
            if (startTime === -1) {
                clearInterval(timer);
                isRunning = false;
                containerApp.classList.add('hide');
            }
            isRunning = true;
            startTime--;
        }, 1000)
    }
    //when timer=0, stop timer and logout from account
}

function formatMovementDate(date,locale) {
    const calcDayPassed = (d1, d2) => Math.round(Math.abs(d2 - d1) / (1000 * 60 * 60 * 24));

    const daysPassed = calcDayPassed(new Date(), date);
    // console.log(daysPassed)

    if (daysPassed === 0) return 'Today';
    if (daysPassed === 1) return 'YesterDay';
    if (daysPassed <= 7) return `${daysPassed} days`
    else {
        // const day = `${date.getDate()}`.padStart(2,0);
        // const month = `${date.getMonth() + 1}`.padStart(2,0);
        // const year = date.getFullYear();
        // return `${day}/${month}/${year}`;

        return new Intl.DateTimeFormat(locale).format(date);
    }

}

function formatedCurrencies(value,locale,currency) {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(value);
}

//function-1
function displayMovements(account,sort=false) {
    containerMovements.innerHTML = '';
    const combineMoveDate = account.movements.map((move, i) => {
        return (
            {
                movement: move,
                movementDate: account.movementsDates.at(i),
            }
        )
            
    });

    if (sort) combineMoveDate.sort((a, b) => a.movement - b.movement);

    // const movs = sort ? account.movements.slice().sort((a, b) => a - b) : account.movements;

    combineMoveDate.forEach((obj, i) => {
        const { movement, movementDate } = obj;
        const type = movement > 0 ? 'deposit' : 'withdraw';
        const formatedMovements = formatedCurrencies(Math.abs(movement), account.locale, account.currency);

        const date = new Date(movementDate);
        const displayDate = formatMovementDate(date, account.locale);

        const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${type}"> ${i + 1} ${type} </div>
            <div class="movements__data"> ${displayDate} </div>
            <div class="movements__value"> ${formatedMovements} </div>
        </div>
        `;
        containerMovements.insertAdjacentHTML('beforeend', html)
    })  
}
// displayMovements(account1.movements) 
 
//function 2
function displayBalance(account) {
    const balance=account.movements.reduce((acc, cur) => acc + cur);
    account.balance = balance;
    const formatedMov = formatedCurrencies(balance, account.locale, account.currency);
    lableBalance.textContent = `${formatedMov}`;
}

//function 3

function calculateSummary(account) {
    
    const deposit = account.movements.filter(mov => mov > 0).reduce((acc, cur) => acc + cur);
    labelSumIn.textContent = `${formatedCurrencies(deposit,account.locale,account.currency)}`;

    const withdraw = account.movements.filter(mov => mov < 0).reduce((acc, cur) => acc + cur);
    labelSumOut.textContent = `${(formatedCurrencies(Math.abs(withdraw),account.locale,account.currency))}`;

    const interest = account.movements.filter(mov => mov > 0).map(mov => mov * account.interestRate / 100).filter(mov=>mov>=1).reduce((acc, cur) => acc + cur);

    lableSumInterest.textContent=`${formatedCurrencies(interest,account.locale,account.currency)}`

}

//function 4
function createUserName(accounts) {

    accounts.forEach(account => {
        account.username = account.owner.toLowerCase().split(' ').map(el => el.slice(0, 1)).join('');
    })

}
createUserName(accounts);
function updateUI(account) {
    //display movements
    displayMovements(account);
    //display balance
    displayBalance(account);
    //display calculated summary
    calculateSummary(account);
    //start timer
    if (isRunning) {
        isRunning = false;
        startTime = 1 * 10;
    } 
    startLogoutTimer();
}

////-----------Event  handler
let currentAccount;

currentAccount = account1;
updateUI(currentAccount);
containerApp.classList.remove('hide');

btnLogin.addEventListener('click', function (e) {
    e.preventDefault();

    currentAccount = accounts.find(account => account.username === inputLoginUserName.value && account.pin === +inputLoginPin.value);

    if (currentAccount) {
        //welcome message
        lableWelcome.textContent = `Welcome Back, ${currentAccount.owner.split(' ')[0]}`;
        //current date
        const now = new Date();
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            weekday:'long'
            
        }
        //automatically set locale
        const locale = navigator.language;

        //manually setting like en-US or getting from API obj
        labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale,options).format(now);

        //day//month/year
        // const day = `${now.getDate()}`.padStart(2,0);
        // const month = `${now.getMonth() + 1}`.padStart(2,0);
        // const year = now.getFullYear();
        // const hour = now.getHours();
        // const min = now.getMinutes();

        // labelDate.textContent = `${day}/${month}/${year},  ${hour}:${min}`;

        inputLoginPin.value = inputLoginUserName.value = '';
        inputLoginPin.blur();

        containerApp.classList.remove('hide');
        //updated UI
        updateUI(currentAccount);
    }
});
//transfer event

btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    const transferamount = +transferAmountInput.value;
    const receiverAccount = accounts.find(account => account.username === transfertoInput.value);
    
    transferAmountInput.value = transfertoInput.value = '';
    if (transferamount > 0 &&
        receiverAccount &&
        transferamount <= currentAccount.balance &&
        currentAccount?.username !== receiverAccount?.username) {
        
        //transfering amount from current user to another user
        currentAccount.movements.push(-transferamount);
        receiverAccount.movements.push(transferamount);

        //add transfer date
        currentAccount.movementsDates.push(new Date().toISOString());
        receiverAccount.movementsDates.push(new Date().toISOString());
        console.log(currentAccount);

        //update UI
        updateUI(currentAccount);
    }
})

//request loan

function setWaitingTime(amount) {
    setTimeout(() => {
        currentAccount.movements.push(amount);
        currentAccount.movementsDates.push(new Date().toISOString());
        updateUI(currentAccount);
        alert('congratulations! Loan Received');
    }, 5000);
}

btnLoan.addEventListener('click', function (e) {
    e.preventDefault();
    const loanAmount = +Math.floor(loanAmountInput.value);

    if (loanAmount > 0 && currentAccount.movements.some(mov => mov >= loanAmount * 0.1)) {
        setWaitingTime(loanAmount)
    }
    loanAmountInput.value=''
})

//close account event

btnClose.addEventListener('click', function (e) {
    e.preventDefault();
    const closeUserName = closeUsernameInput.value;
    const closePin = +closePinInput.value;

    if (currentAccount.username === closeUserName && currentAccount.pin === closePin) {
        const closeAccount = accounts.findIndex(account => account.username === closeUserName);
        accounts.splice(closeAccount, 1);
        
        //hide the main
        containerApp.classList.add('hide');
    }
    closeUsernameInput.value = closePinInput.value = '';
})

///sort event
let sorted = false;
btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    displayMovements(currentAccount, !sorted);
    sorted = !sorted;
})



//splice
// console.log(movements.splice(0, 2));
// console.log(movements);
// console.log(movements.splice(-1));

//reverse
// let up = movements.reverse();
// console.log(up)

//at
// console.log(movements.at(-1));
// console.log(movements);

//forEach
// movements.forEach((el,i,arr) => {
//     if (el > 0) {
//         console.log(`deposit ${i}: ${el}`)
//     } else {
//         console.log(`withdraw ${i}: ${el}`)
//     }
//     console.log(arr)
// })
 
let movements = [900, 500, -200, 500, 700, -100, 1200, -600];

///chanllenge 1

const juliaDog = [3, 5, 2, 12, 7];
const kateDog = [4, 1, 15, 8, 3];

function checkDogs(julia, kate){
    // const copyJulia = [...julia];
    const copyJulia = julia.slice();
    // const up = copyJulia.splice(-2);
    // const updatedJulia = copyJulia.splice(0,1);
    const updatedJulia = copyJulia.slice(1, -2);
    const allData = [...updatedJulia, ...kate];
    const adultDogs = [];
    const puppyDogs = [];

    allData.forEach(dog => {
        if (dog >= 3) {
            adultDogs.push(dog)
        } else {
            puppyDogs.push(dog);
        }
    })

    console.log(adultDogs,puppyDogs);
}
// checkDogs(juliaDog, kateDog);

//example calculate max in array
// const max = account1.movements.reduce((acc, cur) => {
//     if (acc > cur) return acc
//     else return cur
// });
// console.log(max);
// console.log(account1.movements)

//example
//////////////challenge2\\\\\\\\\\\\\\\\
function calcualteHumanAge(ages) {
    //1
    const dogHumanAge = ages.map(age => {
        if (age <= 2) {
            return 2 * age;
        } else return 16 + age * 4;
    })
    //2
    const dogs18max = dogHumanAge.filter(age => age >= 18);

    //3
    const average = dogs18max.reduce((acc, cur,i,arr) => acc + cur/arr.length);
    console.log(average)

}
// calcualteHumanAge([5,2,4, 1,15,8,3])

/////////////challenge3
function calcualteHumanAge2(ages) {
    const average = ages
        .map(age => age <= 2 ? 2 * age : 16 + age * 4)
        .filter(age => age >= 18)
        .reduce((acc, cur, i, arr) => acc + cur / arr.length);
    console.log(average);
}
// calcualteHumanAge2([5,2,4,1,15,8,3])

let arr = [5, 2, 14, 1, 15, 8, 3];
const lastmx = arr.findLastIndex(el => el > 5);
// console.log(lastmx);

// const check = arr.some(el => el > 10);
// console.log(check);
const check2 = arr.every(el => el > 10);
// console.log(check2)


//challenge 4
const breeds = [
    {
        breed: 'green shepherd',
        averageWeight: 32,
        activities:['fetch','swiming'],
    },
     {
        breed: 'Dalmatian',
        averageWeight: 24,
        activities:['running','fetch','agility'],
    },
      {
        breed: 'Beagle',
        averageWeight: 12,
        activities:['fetch','diging'],
    },
       {
        breed: 'Husky',
        averageWeight: 32,
        activities:['fetch','swiming'],
    },
        {
        breed: 'BullDog',
        averageWeight: 36,
        activities:['sleeping'],
    }, {
        breed: 'Poodle',
        averageWeight: 10,
        activities:['agility','swiming'],
    },
     
]

//1
const huskyAverage = breeds.find(dog => dog.breed === 'Husky').averageWeight;

//2
const dogsBreedLikes = breeds.find(dog => {
    return dog.activities.some(activity => {
        return activity === 'running'
    })
}).breed;
// console.log(dogsBreedLikes);
const dogslikes = breeds.find(dog => dog.activities.includes('fetch') === dog.activities.includes('running'));

// console.log(dogslikes);


//3
const activities = breeds.flatMap(dog => dog.activities);
// console.log(activities);

//4Unique
const unique = new Set(activities);
const unquieArr=Array.from(unique)
// console.log(unquieArr);

///////////////sort()\\\\\\\\\\\\\\\
//asending order a-b;
//desending order b-a
const arr1 = ['running', 'fetch', 'agility', 'eating'];
const arr2 = [3, 22, 7, 1, 15, - 13];
const upd = arr2.sort((a, b) => b-a);
// console.log(upd)

const upd1 = Object.groupBy(arr2, el => el > 0 ? 'deposit' : 'withdraw');
// console.log(upd1);     
// console.log(new Array(7).fill(3));
// console.log(Array.from({ length: 5 }, (_, i) => i + 1));

///random number
function calcRandom(max, min) {
    return Math.trunc(Math.random() * (min-max + 1))+max
}
// console.log(calcRandom(5,10));

//////////////////Set timeout and set time interval
const students = ['Shehnaz', 'neelum'];
const timr=setTimeout((s1, s2) => {
    console.log(`hey ${s1} and ${s2} Keep putting effort. you are on the right track`);
}, 5000, ...students);

console.log('waiting');

if (students.includes('neelum')) clearTimeout(timr);
 let i = 1;
setInterval(() => {
    // console.log(`Hey ${i}`);
    // i++; 
}, 1000);