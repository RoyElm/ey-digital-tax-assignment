const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const path = require("path");
const { ExchangeCurrencyModel, foreignExchangeRateModel } = require("../models/exchange-currency.model");
const bankIsraelUrl = "https://www.boi.org.il/he/Markets/ExchangeRates/Pages/Default.aspx";

router.get("/options", async (request, response) => {
    try {
        axios.get(bankIsraelUrl).then(res => {
            const $ = cheerio.load(res.data);
            const options = $('#selCurrency').text().split("\n              ");
            response.json(options)
        })
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/starter", async (request, response) => {
    try {
        axios.get(bankIsraelUrl)
            .then(res => {
                const $ = cheerio.load(res.data);
                let marketCurrencyTable = [];
                $("tbody").children().each((index, element) => {
                    const marketCurrency = {};
                    $(element).children().each((i, elem) => {
                        switch (i) {
                            case 0:
                                marketCurrency.currency = $(elem).text();
                                break;
                            case 1:
                                marketCurrency.unit = $(elem).text();
                                break;
                            case 2:
                                marketCurrency.state = $(elem).text();
                                break;
                            case 3:
                                marketCurrency.rate = $(elem).text();
                                break;
                            case 4:
                                marketCurrency.dailyChange = $(elem).text();
                                break;
                        }
                    });
                    marketCurrencyTable[index] = marketCurrency;
                })
                marketCurrencyTable.shift();
                marketCurrencyTable.pop();
                response.json(marketCurrencyTable)
            })
            .catch(err => response.status(500).send(err.message));
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.post("/foreignExchange", async (request, response) => {
    try {
        const exchangeCurrencies = new foreignExchangeRateModel(request.body);
        let tempUrl = "https://www.boi.org.il/he/_layouts/boi/handlers/WebPartHandler.aspx?wp=ExchangeRates&lang=he-IL&Currency=";
        if (exchangeCurrencies.currencies.length === 1) {
            tempUrl += `${exchangeCurrencies.currencies[0]}`;
        } else {
            exchangeCurrencies.currencies.forEach((currency, index) => {
                if (index === 0) tempUrl += currency;
                else tempUrl += `%2C${currency}`;
            });
        }
        tempUrl += `&Date=${exchangeCurrencies.date.day}%2F${exchangeCurrencies.date.month}%2F${exchangeCurrencies.date.year}&Amount=${exchangeCurrencies.amount}&CurrencySourceId=${exchangeCurrencies.chosenCurrency}&graphUrl=%2Fhe%2FMarkets%2FExchangeRates%2FPages%2FChart.aspx&webUrl=%2Fhe%2FMarkets%2FExchangeRates`;

        axios.get(tempUrl)
            .then(res => {
                const $ = cheerio.load(res.data);
                let tr = [];
                $("#BoiForeignExchangeResults").find("tr").each((index, element) => {
                    let foreignExchangeCurrency = {};
                    $(element).each((i, elem) => {
                        let temp = $(elem).text().split("\n                  ");
                        foreignExchangeCurrency.currency = temp[1];
                        foreignExchangeCurrency.currencyValue = temp[2].replace("\n                ", "");
                    });
                    tr[index] = foreignExchangeCurrency
                })
                tr.shift();
                response.json(tr);
            })
            .catch(err => response.status(500).send(err.message));
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/states", async (request, response) => {
    try {
        axios.get(bankIsraelUrl)
            .then(res => {
                const $ = cheerio.load(res.data);
                let selectOptions = [];
                $("#selSingleForeignExchange").children().each((i, elem) => {
                    selectOptions[i] = $(elem).text();
                })
                response.json(selectOptions);
            })
            .catch(err => response.status(500).send(err.message));
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;
