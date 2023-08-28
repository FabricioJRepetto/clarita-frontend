const detectType = (string) => {
    let type = ''

    if (/\(Efectivo\)/g.test(string)) {
        type = 'Efectivo*'

    } else if (/\(Tarjeta de crédito\)/g.test(string)) {
        type = 'Tarjeta de crédito*'

    } else if (/\(Tarjeta de débito\)/g.test(string)) {
        type = 'Tarjeta de débito*'

    } else if (/\(Transferencia\)/g.test(string)) {
        type = 'Transferencia*'

    } else if (/\(MercadoPago\)/g.test(string)) {
        type = 'MercadoPago*'

    } else if (/\(Western Union\)/g.test(string)) {
        type = 'Western Union*'

    } else if (/\(Payoneer\)/g.test(string)) {
        type = 'Payoneer*'

    } else {
        type = 'Otro*'
    }

    return type;
}

export const getBalance = (list) => {
    let balance = {
        ARS: {
            income: 0,
            expense: 0,
            total: 0,
            details: false
        },
        USD: {
            income: 0,
            expense: 0,
            total: 0,
            details: false
        }
    };

    if (!list) return balance

    let detailsAux = {

    }

    list.forEach(m => {
        const CUR = m.currency;

        if (CUR === 'ARS' || CUR === 'USD') {
            if (m.entryType === 'income') {
                balance[CUR].income += m.amount;

                if (!Object.hasOwn(detailsAux, CUR)) {
                    detailsAux[CUR] = {};
                }

                if (m.paymentType) {
                    if (Object.hasOwn(detailsAux[CUR], m.paymentType)) {
                        detailsAux[CUR][m.paymentType] += m.amount
                    } else {
                        detailsAux[CUR][m.paymentType] = m.amount
                    }
                } else {
                    // regex para checkear metodo de pago (inexacto)
                    const type = detectType(m.description)

                    if (Object.hasOwn(detailsAux[CUR], type)) {
                        detailsAux[CUR][type] += m.amount
                    } else {
                        detailsAux[CUR][type] = m.amount
                    }
                }
            } else {
                balance[CUR].expense += m.amount
            }
        }
    });

    balance.ARS.total = balance.ARS.income - balance.ARS.expense
    balance.USD.total = balance.USD.income - balance.USD.expense

    if (Object.entries(detailsAux.ARS).length) {
        balance.ARS.details = detailsAux.ARS
    }
    if (Object.entries(detailsAux.USD).length) {
        balance.USD.details = detailsAux.USD
    }

    console.log(balance);

    return balance;
}

// const testList = [
//     {
//         currency: "ARS",
//         entryType: "income",
//         amount: 1500,
//         paymentType: "Payoneer"
//     },
//     {
//         currency: "ARS",
//         entryType: "income",
//         amount: 3500,
//         paymentType: "Payoneer"
//     },
//     {
//         currency: "ARS",
//         entryType: "income",
//         amount: 2100,
//         paymentType: "MercadoPago"
//     },
//     {
//         currency: "ARS",
//         entryType: "expense",
//         amount: 800,
//         paymentType: "Efectivo"
//     },
//     {
//         currency: "USD",
//         entryType: "income",
//         amount: 150,
//         paymentType: "Payoneer"
//     },
//     {
//         currency: "USD",
//         entryType: "income",
//         amount: 300,
//         paymentType: "Payoneer"
//     },
//     {
//         currency: "USD",
//         entryType: "income",
//         amount: 200,
//         paymentType: "Efectivo"
//     },
// ]

// getBalance(testList)