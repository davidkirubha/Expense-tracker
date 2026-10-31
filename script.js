
let trackerform = document.getElementById("trackerform");
let transaction = document.getElementById("transaction");
let date = document.getElementById("date");
let category = document.getElementById("category");
let amount = document.getElementById("amount");
let type = document.getElementById("type");
let transactionlist = document.getElementById("transactionlist");

let totalincome = document.getElementById("totalincome");
let totalexpense = document.getElementById("totalexpense");
let totalbalance = document.getElementById("totalbalance");


let transactions = JSON.parse(localStorage.getItem("transactions")) || [];



function updateTotals() {

    let incomeTransactions = transactions.filter(function(item) {
        return item.type === "Income";
    });

    let totalIncome = incomeTransactions.reduce(function(total, item) {
        return total + item.amount;
    }, 0);

    let expenseTransactions = transactions.filter(function(item) {
        return item.type === "Expense";
    });

    let totalExpense = expenseTransactions.reduce(function(total, item) {
        return total + item.amount;
    }, 0);

    let totalBalance = totalIncome - totalExpense;

    totalincome.innerText = totalIncome;
    totalexpense.innerText = totalExpense;
    totalbalance.innerText = totalBalance;
}


function displayTransactions() {

    transactionlist.innerHTML = "";

    transactions.forEach(function(item) {

        let transactionitem = document.createElement("div");
        transactionitem.classList.add("transaction-item");

        let transactiondetails = document.createElement("span");

        transactiondetails.innerText =
            `${item.type} -> ${item.transaction} / ${item.amount} / ${item.category} / ${item.date}`;

        transactionitem.append(transactiondetails);

        let deletebtn = document.createElement("button");
        deletebtn.innerText = "Delete";
        deletebtn.classList.add("delete-btn");

        transactionitem.append(deletebtn);

        deletebtn.addEventListener("click", function() {

            transactions.splice(transactions.indexOf(item), 1);

            localStorage.setItem("transactions", JSON.stringify(transactions));

            displayTransactions();
            updateTotals();
        });

        transactionlist.append(transactionitem);
    });
}



trackerform.addEventListener("submit", function(event) {

    event.preventDefault();

    let tn = transaction.value.trim();
    let d = date.value;
    let ct = category.value;
    let amt = Number(amount.value);
    let tp = type.value;

    if (tn === "") {
        return;
    }

    if (amt <= 0) {
        return;
    }

    if (d === "") {
        return;
    }

    let transactionData = {
        transaction: tn,
        date: d,
        category: ct,
        amount: amt,
        type: tp
    };

    transactions.push(transactionData);

    localStorage.setItem("transactions", JSON.stringify(transactions));

    displayTransactions();
    updateTotals();

    trackerform.reset();
});



displayTransactions();
updateTotals();
