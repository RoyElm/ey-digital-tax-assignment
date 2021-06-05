import React, { useEffect, useState } from "react";
import { MarketCurrencyTableModel } from "../../../Models/marketCurrencyTable.model";
import { getStarterTableAsync } from "../../../Services/currencyExchange.service";
import CurrencyExchangeRaw from "../CurrencyExchangeRaw/CurrencyExchangeRaw";
import "./CurrencyExchangeTable.css";

function CurrencyExchangeTable(): JSX.Element {

    const [starter, setStarter] = useState<MarketCurrencyTableModel[]>([]);
    useEffect(() => {
        (async () => {
            try {
                const starter = await getStarterTableAsync();
                setStarter(starter);
            } catch (error) {
                alert(error.message);
            }
        })();
    })


    return (
        <div className="currencyExchangeDiv">
            <h3>שיעור המטבעות לתאריך {new Date().toLocaleDateString('he', { dateStyle: 'short' })}</h3>
            <table className="CurrencyExchangeTable">
                <thead>
                    <tr>
                        <th>שינוי יומי</th>
                        <th>השער</th>
                        <th>המדינה</th>
                        <th>היחידה</th>
                        <th>מטבע</th>
                    </tr>
                </thead>
                <tbody>
                    {starter.map((raw, index) => <CurrencyExchangeRaw key={index} {...raw} />)}
                </tbody>
            </table>
        </div>
    );
}

export default CurrencyExchangeTable;
