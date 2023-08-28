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
        income: 0,
        expense: 0,
        total: 0,
        details: false
    };

    if (!list) return balance

    let detailsAux = {}

    list.forEach(m => {
        if (m.currency === 'ARS') {
            if (m.entryType === 'income') {
                balance.income = balance.income + m.amount

                if (m.paymentType) {
                    if (Object.hasOwn(detailsAux, m.paymentType)) {
                        detailsAux[m.paymentType] += m.amount
                    } else {
                        detailsAux[m.paymentType] = m.amount
                    }
                } else {
                    // regex para checkear metodo de pago (inexacto)
                    const type = detectType(m.description)

                    if (Object.hasOwn(detailsAux, type)) {
                        detailsAux[type] += m.amount
                    } else {
                        detailsAux[type] = m.amount
                    }
                }
            } else {
                balance.expense = balance.expense + m.amount
            }
        }
    });
    balance.total = balance.income - balance.expense
    if (Object.entries(detailsAux).length) {
        console.log(detailsAux);
        balance.details = detailsAux
    }

    return balance;
}