import { foreignExchangeModel, foreignExchangeRatesModel } from './../Models/foreignExchange.model';
import axios from 'axios';
import { MarketCurrencyTableModel } from '../Models/marketCurrencyTable.model';
import { Globals } from './Globals';
import { CurrencyExchangeByDatesModel } from '../Models/currencyExchangeByDate.model';

//Global functions helper each component can reusable that functions.

//getting options from Backend
export async function getOptionsAsync(): Promise<string[]> {
    const response = await axios.get<string[]>(Globals.options);
    return response.data;
}

//getting daily exchange rates from Backend
export async function getStarterTableAsync(): Promise<MarketCurrencyTableModel[]> {
    const response = await axios.get<MarketCurrencyTableModel[]>(Globals.starter);
    return response.data;
}

//getting currency states from backend
export async function getStatesAsync(): Promise<string[]> {
    const response = await axios.get<string[]>(Globals.states);
    return response.data;
}

//sending the form to backend and receiving the result of exchange rates;
export async function getForeignExchangeAsync(foreignExchange: foreignExchangeModel): Promise<foreignExchangeRatesModel[]> {
    const response = await axios.post<foreignExchangeRatesModel[]>(Globals.foreignExchangeRates, foreignExchange);
    return response.data;
}

//creating excel url to download the desire currencies/currency;
export function createExcelUrlDownload(exchangeCurrencies: CurrencyExchangeByDatesModel) {
    let tempUrl = "https://www.boi.org.il/Boi.ashx?Command=DownloadExcel&Currency=";
    if (exchangeCurrencies.currencies.length === 1) {
        tempUrl += `${exchangeCurrencies.currencies[0]}`;
    } else {
        exchangeCurrencies.currencies.forEach((currency, index) => {
            if (index === 0) tempUrl += currency;
            else tempUrl += `%2C${currency}`;
        });
    }
    const dateStart = getYearAndMonthAndDay(exchangeCurrencies.dateStart);
    const dateEnd = getYearAndMonthAndDay(exchangeCurrencies.dateEnd);

    tempUrl += `&DateStart=${dateStart.day}%2F${dateStart.month}%2F${dateStart.year}&DateEnd=${dateEnd.day}%2F${dateEnd.month}%2F${dateEnd.year}&webUrl=%2Fhe%2FMarkets%2FExchangeRates`;
    return tempUrl;
}

//local function to get day-month-year from specific date.
const getYearAndMonthAndDay = (desireDate: string) => {
    const tempDate = new Date(desireDate);
    let date = {
        day: '',
        month: '',
        year: ''
    };
    date.day = ('0' + tempDate.getDate()).slice(-2);
    date.month = ('0' + (tempDate.getMonth() + 1)).slice(-2);
    date.year = tempDate.getFullYear().toString();
    return date;
}