import React, { useEffect, useState } from "react";
import { MarketCurrencyTableModel } from "../../../Models/marketCurrencyTable.model";
import "./CurrencyExchangeRaw.css";

function CurrencyExchangeRaw(props: MarketCurrencyTableModel): JSX.Element {

    const [positive, setPositive] = useState<boolean>(true);
    const [dailyChange, setDailyChange] = useState<string>(props.dailyChange);

    useEffect(() => {
        if (dailyChange.includes("-")) {
            setPositive(false)
            setDailyChange(`-${dailyChange.slice(0, -1)}`);
        };
    },[])

    return (
        <tr className="CurrencyExchangeRaw">
            <td className={positive ? "positive" : "negative"}>{dailyChange}</td>
            <td>{props.rate}</td>
            <td>{props.state}</td>
            <td>{props.unit}</td>
            <td>{props.currency}</td>
        </tr>
    );
}

export default CurrencyExchangeRaw;
