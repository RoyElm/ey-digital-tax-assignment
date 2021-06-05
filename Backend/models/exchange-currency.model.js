class ExchangeCurrencyModel {
    constructor(exchangeCurrency) {
        this.dateStart = getYearAndMonthAndDay(exchangeCurrency.dateStart);
        this.dateEnd = getYearAndMonthAndDay(exchangeCurrency.dateEnd);
        this.currencies = exchangeCurrency.currencies;
    }
}

class foreignExchangeRateModel {
    constructor(exchangeCurrency) {
        this.date = getYearAndMonthAndDay(exchangeCurrency.date);
        this.currencies = exchangeCurrency.currencies;
        this.chosenCurrency = exchangeCurrency.chosenCurrency;
        this.amount = exchangeCurrency.amount;
    }
}

const getYearAndMonthAndDay = desireDate => {
    const tempDate = new Date(desireDate);
    let date = {};
    date.day = ('0' + tempDate.getDate()).slice(-2);
    date.month = ('0' + (tempDate.getMonth() + 1)).slice(-2);
    date.year = tempDate.getFullYear();
    return date;
}

module.exports = {
    ExchangeCurrencyModel,
    foreignExchangeRateModel
};
