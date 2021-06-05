export class Globals {
    public static options: string;
    public static starter: string;
    public static exchangeRatesMultiply: string;
    public static foreignExchangeRates: string;
    public static states: string;

    public static url() {
        if (process.env.NODE_ENV === "production") {
            Globals.options = "https://ey-digital-tax-assignment.herokuapp.com/api/exchangeRates/options";
            Globals.starter = "https://ey-digital-tax-assignment.herokuapp.com/api/exchangeRates/starter";
            Globals.exchangeRatesMultiply = "https://ey-digital-tax-assignment.herokuapp.com/api/exchangeRates/multiplyExchange";
            Globals.foreignExchangeRates = "https://ey-digital-tax-assignment.herokuapp.com/api/exchangeRates/foreignExchange";
            Globals.states = "https://ey-digital-tax-assignment.herokuapp.com/api/exchangeRates/states";
        } else {
            Globals.options = "http://localhost:3001/api/exchangeRates/options";
            Globals.starter = "http://localhost:3001/api/exchangeRates/starter";
            Globals.exchangeRatesMultiply = "http://localhost:3001/api/exchangeRates/multiplyExchange";
            Globals.foreignExchangeRates = "http://localhost:3001/api/exchangeRates/foreignExchange";
            Globals.states = "http://localhost:3001/api/exchangeRates/states";
        }
    }
}

Globals.url();