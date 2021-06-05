import React, { useState } from "react";
import "./Home.css";
import CurrencyExchangeTable from "../../CurrencyExchange/CurrencyExchangeStarter/CurrencyExchangeTable/CurrencyExchangeTable";
import CurrencyExchangeForm from "../../CurrencyExchange/ForeignExchangeRate/CurrencyExchangeForm/CurrencyExchangeForm";
import ExchangeTableRates from "../../CurrencyExchange/ForeignExchangeRate/ExchangeTableRates/exchangeTableRates";
import { foreignExchangeModel, foreignExchangeRatesModel } from "../../Models/foreignExchange.model";
import ExchangeRatesWithDatesForm from "../../CurrencyExchange/ExchangeRatesWithDatesForm/ExchangeRatesWithDatesForm";

function Home(): JSX.Element {

    const [foreignExchangeCurrency, setForeignExchangeCurrency] = useState<foreignExchangeRatesModel[]>([])
    const [desireForeignExchange, setDesireForeignExchange] = useState<foreignExchangeModel>(null)
    
    //handle receive data from child component to update the local state.
    const handleSetInformation = (_foreignExchangeCurrency: foreignExchangeRatesModel[], _desireForeignExchange: foreignExchangeModel) => {
        setForeignExchangeCurrency(_foreignExchangeCurrency);
        setDesireForeignExchange(_desireForeignExchange);
    }

    return (
        <div className="Home">
            <CurrencyExchangeTable />
            <hr />
            <CurrencyExchangeForm info={handleSetInformation} />
            {foreignExchangeCurrency.length !== 0 && desireForeignExchange &&
                <ExchangeTableRates foreignExchangeCurrency={foreignExchangeCurrency} desireForeignExchange={desireForeignExchange} />
            }
            <hr />

            <ExchangeRatesWithDatesForm />
        </div>
    );
}

export default Home;
