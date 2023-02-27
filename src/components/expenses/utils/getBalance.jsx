export const getBalance = (list) => {
    let balance = {
        income: 0,
        expense: 0,
        total: 0
    };

    if (!list) return balance
    list.forEach(m => {
        if (m.currency === 'ARS') {
            if (m.entryType === 'income') {
                balance.income = balance.income + m.amount
            } else {
                balance.expense = balance.expense + m.amount
            }
        }
    });
    balance.total = balance.income - balance.expense

    return balance;
}