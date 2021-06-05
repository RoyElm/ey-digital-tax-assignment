import React, { useEffect, useState } from "react";
import "./CurrencyExchangeForm.css";
import { Button, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { formStyle } from "../../../Services/GlobalStylingMaker";
import { getForeignExchangeAsync, getOptionsAsync, getStatesAsync } from "../../../Services/currencyExchange.service";
import { foreignExchangeModel, foreignExchangeRatesModel } from "../../../Models/foreignExchange.model";
import { useForm } from "react-hook-form";

interface CurrencyExchangeFormProps {
    info: (foreignExchangeCurrency: foreignExchangeRatesModel[], desireForeignExchange: foreignExchangeModel) => void;
}

function CurrencyExchangeForm(props: CurrencyExchangeFormProps): JSX.Element {

    const classes = formStyle();
    const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const [selectedCurrency, setSelectedCurrency] = useState<string>('');
    const [currencyStates, setCurrencyStates] = useState<string[]>([]);

    const { register, handleSubmit, formState: { errors } } = useForm<foreignExchangeModel>();

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 224,
                width: 250,
            },
        },
    };
    
    useEffect(() => {
        (async () => {
            const currencyOptions = await getOptionsAsync();
            const currencyStates = await getStatesAsync();
            setCurrencyOptions(currencyOptions);
            setCurrencyStates(currencyStates);
        })();
    }, [])

    const handleChangeCurrencies = (event: React.ChangeEvent<{ value: unknown }>) => {
        const targets = event.target.value as string[];
        setSelectedOptions(targets);
        //blocking any after the user selected six currencies;
        if (targets.length > 6) {
            targets.pop();
            setSelectedOptions(targets);
        };
    };

    const handleChangeChosenCurrency = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedCurrency(event.target.value as string);
    };

    async function send(foreignExchange: foreignExchangeModel) {
        try {
            const foreignExchangeRates = await getForeignExchangeAsync(foreignExchange);
            props.info(foreignExchangeRates, foreignExchange);
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="CurrencyExchangeForm">
            <h2>המרת מט"ח</h2>
            <form onSubmit={handleSubmit(send)}>
                <TextField
                    id="date"
                    label="שער חליפין לפי תאריך"
                    name="date"
                    inputProps={{ min: "2000-01-01", max: new Date().toISOString().split("T")[0] }}
                    type="date"
                    error={errors.date && true}
                    {...register('date', { required: true })}
                    helperText={errors.date && errors.date?.type === "required" && "תאריך הינו חובה!"}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    name="amount"
                    {...register('amount', { required: true, min: 1 })}
                    variant="outlined"
                    type="number"
                    error={errors.amount && true}
                    inputProps={{ min: 1 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    helperText={errors.amount && errors.amount?.type === "required" && "הכמות חובה!"}
                    label="כמות אותה נרצה להמיר"
                />
                <FormControl className={classes.formControl}>
                    <InputLabel id="ourCurrency">נא לבחור מטבע אשר נרצה להמיר</InputLabel>
                    <Select
                        labelId="ourCurrency"
                        id="demo-mutiple-chip"
                        name="chosenCurrency"
                        error={errors.chosenCurrency && true}
                        {...register('chosenCurrency', { required: true })}
                        value={selectedCurrency}
                        onChange={handleChangeChosenCurrency}
                        input={<Input id="select-multiple-chip" />}
                        MenuProps={MenuProps}
                    >
                        <MenuItem disabled key="default" value="undefined">
                            נא לבחור מטבע אשר נרצה להמיר
                        </MenuItem>
                        {currencyStates.map((currency, index) => (
                            <MenuItem key={currency} value={index === 0 ? index : index + 2}>
                                {currency}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.chosenCurrency && errors.chosenCurrency?.type === "required" &&
                        <FormHelperText>חייב לבחור מטבע שנרצה להמיר!</FormHelperText>
                    }
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="chipLabel">נא לבחור את המטבעות אליהם נרצה להמיר</InputLabel>
                    <Select
                        labelId="chipLabel"
                        id="demo-mutiple-chip"
                        name="currencies"
                        multiple
                        {...register('currencies', { required: true })}
                        error={errors.currencies && true}

                        value={selectedOptions}
                        onChange={handleChangeCurrencies}
                        input={<Input id="select-multiple-chip" />}
                        MenuProps={MenuProps}
                    >
                        {currencyOptions.map((currency, index) => (
                            <MenuItem key={currency} value={index + 2}>
                                {currency}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.currencies &&
                        <FormHelperText>חייב לבחור לפחות מטבע אחד</FormHelperText>
                    }
                </FormControl>
                <Button type="submit" variant="contained" color="primary">המר</Button>
            </form>
        </div>
    );
}

export default CurrencyExchangeForm;

