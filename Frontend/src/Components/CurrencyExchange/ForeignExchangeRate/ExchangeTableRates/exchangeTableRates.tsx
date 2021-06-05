import React from "react";
import { foreignExchangeModel, foreignExchangeRatesModel } from "../../../Models/foreignExchange.model";
import "./exchangeTableRates.css";

interface ExchangeTableRatesProps {
    foreignExchangeCurrency: foreignExchangeRatesModel[];
    desireForeignExchange: foreignExchangeModel;
}

function ExchangeTableRates({ foreignExchangeCurrency, desireForeignExchange }: ExchangeTableRatesProps): JSX.Element {

    return (
        <div className="exchangeTableRates">
            <h3>המרת המטבע לתאריך {new Date(desireForeignExchange.date).toLocaleDateString('he', { dateStyle: 'short' })}</h3>
            <table>
                <thead>
                    <tr>
                        <th>כמות</th>
                        <th>מטבע</th>
                    </tr>
                </thead>
                <tbody>
                    {foreignExchangeCurrency.map(f => {
                        return (<tr key={f.currency}>
                            <td>{f.currencyValue.length ? f.currencyValue : "אין מידע"}</td>
                            <td>{f.currency}</td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ExchangeTableRates;
