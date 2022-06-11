let state = {
   
    balance: 4000,
    income: 2000,
    expense: 500,
    transactions: [
        /*{name:'Paycheck', amount:1800, type:'income', id:createId()},
        {name:'Rent', amount:1271, type:'expense', id:createId()},
        {name:'Grociers', amount:372, type:'expense', id:createId()}*/
    ]
};

let balanceEl = document.querySelector('#balance');
let incomeEl = document.querySelector('#income');
let expenseEl = document.querySelector('#expense');
let transactionsEl = document.querySelector('#transaction');
let incomeButtonEl = document.querySelector('#income-button');
let expenseButtonEl = document.querySelector('#expense-button');
let nameInputEl = document.querySelector('#name');
let amountInputEl = document.querySelector('#amount');

function init(){
    let localState = JSON.parse(localStorage.getItem('expenseTrackerState'));

    if (localState !== null){
        state = localState;
    };
    updateState();
    initListeners();
    };

function createId(){
    return Math.floor(Math.random() * 100000); 
}

function initListeners(){
    incomeButtonEl.addEventListener('click',onAddIncomeClick);
    expenseButtonEl.onclick = onAddExpenseClick;
}
function onAddIncomeClick(){
    addTransaction(nameInputEl.value, amountInputEl.value, 'income');
    
}
function addTransaction(name, amount, type){
    if (name !== '' && amount !== ''){
        let transaction = {name: name, amount: parseInt(amount), type: type};
        state.transactions.push(transaction);
        updateState();
    }else {
        alert('Please enter valid data');
    }
    nameInputEl.value = '';
    amountInputEl.value = '';
}
function onAddExpenseClick(){
   addTransaction(nameInputEl.value, amountInputEl.value, 'expense')
}
function deleteClick (event){
    let id = parseInt(event.target.getAttribute('data-id'));
    let deleteIndex;
    for (let i = 0; i < state.transactions.length; i++){
        if (state.transactions[i].id === id){
            deleteIndex = i;
            break;
        }
    }
    state.transactions.splice(deleteIndex, 1);
    updateState();
}

function updateState(){
    let balance1 = 0;
    let income1 = 0;
    let expense1 = 0;
    let item1;
    for (let i = 0; i < state.transactions.length; i++){
        item1 = state.transactions[i];;
        if (item1.type === 'income'){
            income1 += item1.amount;
        }
        else if (item1.type === 'expense'){
            expense1 += item1.amount;
        }
    }
    balance1 = income1 - expense1 ;
    state.balance = balance1;
    state.income = income1;
    state.expense = expense1;

    localStorage.setItem('expenseTrackerState', JSON.stringify(state));

    render();
}

function render(){
    balanceEl.innerHTML = `${state.balance}`;
    incomeEl.innerHTML = `${state.income}`;
    expenseEl.innerHTML = `${state.expense}`;

    let transactionEl;
    let containerEl;
    let amountEl;
    let item;
    let buttonEl;

    transactionsEl.innerHTML = '';

    for (let i = 0; i<state.transactions.length; i++){
        item = state.transactions[i];
        transactionEl = document.createElement('li');
        transactionEl.append(item.name);

        transactionsEl.appendChild(transactionEl);

        containerEl = document.createElement('div');
        amountEl = document.createElement('span');
        if (item.type === 'income'){
        amountEl.classList.add('income-amount');
        }else if ( item.type === 'expense'){
            amountEl.classList.add('expense-amount');
        }
        amountEl.innerHTML = `$${item.amount}`;
        containerEl.appendChild(amountEl);
        transactionEl.appendChild(containerEl);

        buttonEl = document.createElement('button');
        buttonEl.setAttribute('data-id',item.id);
        buttonEl.innerHTML = 'X';

        buttonEl.onclick = deleteClick;

        containerEl.appendChild(buttonEl);


    }
}



init();


