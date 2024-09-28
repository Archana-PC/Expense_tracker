//Select elements
const incomeInput = document.getElementById('incomeInput');
const setIncomeBtn = document.getElementById('setIncomeBtn');
const totalIncomeEl = document.getElementById('totalIncome');
const balanceEl = document.getElementById('balance');
const expenseDesc = document.getElementById('expenseDesc');
const expenseAmount = document.getElementById('expenseAmount');
const expenseCategory = document.getElementById('expenseCategory');
const addExpenseBtn = document.getElementById('addExpenseBtn');
const expenseList = document.getElementById('expenseList');

let totalIncome = 0;
let balance = 0;
let expenses = [];

// Set Income
setIncomeBtn.addEventListener('click', () => {
    const income = parseFloat(incomeInput.value);
    if (!isNaN(income) && income > 0) {
        totalIncome = income;
        balance = totalIncome - expenses.reduce((sum, exp) => sum + exp.amount, 0);
        updateUI();
        localStorage.setItem('income', totalIncome);
    }
});

//Add Expense
addExpenseBtn.addEventListener('click', () => {
    const desc = expenseDesc.value.trim();
    const amount = parseFloat(expenseAmount.value);
    const category = expenseCategory.value;

    if (desc !== '' && !isNaN(amount) && amount > 0) {
        const expense = { desc, amount, category, id: Date.now() };
        expenses.push(expense);
        console.log(expenses);
        updateBalance();
        updateUI();
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }
});

//Delete Expense
function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    updateBalance();
    updateUI();
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Update UI
function updateUI() {
    totalIncomeEl.textContent = totalIncome;
    balanceEl.textContent = balance;

    expenseList.innerHTML = '';
    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${expense.desc} - $${expense.amount} (${expense.category})</span>
            <button class="deleteBtn" onclick="deleteExpense(${expense.id})">Delete</button>
        `;
        expenseList.appendChild(li);
    });
}

// Update Balance
function updateBalance() {
    balance = totalIncome - expenses.reduce((sum, exp) => sum + exp.amount, 0);
}

//Load Data from Local Storage on page load
window.onload = () => {
    totalIncome = parseFloat(localStorage.getItem('income')) || 0;
    expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    updateBalance();
    updateUI();
};
