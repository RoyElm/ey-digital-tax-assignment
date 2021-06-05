import { foreignExchangeModel, foreignExchangeRatesModel } from './../Models/foreignExchange.model';
import axios from 'axios';
import { MarketCurrencyTableModel } from '../Models/marketCurrencyTable.model';
import { Globals } from './Globals';
import { CurrencyExchangeByDatesModel } from '../Models/currencyExchangeByDate.model';

//Global functions helper each component can reusable that functions.

export async function getOptionsAsync(): Promise<string[]> {
    const response = await axios.get<string[]>(Globals.options);
    return response.data;
}

export async function getStarterTableAsync(): Promise<MarketCurrencyTableModel[]> {
    const response = await axios.get<MarketCurrencyTableModel[]>(Globals.starter);
    return response.data;
}

export async function getSearchedCurrenciesTableAsync(): Promise<string> {
    const response = await axios.get<string>(Globals.exchangeRatesMultiply);
    return response.data;
}

export async function getStatesAsync(): Promise<string[]> {
    const response = await axios.get<string[]>(Globals.states);
    return response.data;
}

export async function getForeignExchangeAsync(foreignExchange: foreignExchangeModel): Promise<foreignExchangeRatesModel[]> {
    const response = await axios.post<foreignExchangeRatesModel[]>(Globals.foreignExchangeRates, foreignExchange);
    return response.data;
}

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