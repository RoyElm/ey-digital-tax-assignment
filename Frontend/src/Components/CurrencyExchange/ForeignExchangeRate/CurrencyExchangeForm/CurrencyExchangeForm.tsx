import React, { useEffect, useState } from "react";
import "./CurrencyExchangeForm.css";
import { Button, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { formStyle } from "../../../Services/GlobalStylingMaker";
import { getForeignExchangeAsync, getOptionsAsync, getStatesAsync } from "../../../Services/currencyExchange.service";
import { foreignExchangeModel, foreignExchangeRatesModel } from "../../../Models/foreignExchange.model";
import { useForm } from "react-hook-form";
import { errorsService } from "../../../Services/GlobalErrorsService";

interface CurrencyExchangeFormProps {
    info: (foreignExchangeCurrency: foreignExchangeRatesModel[], desireForeignExchange: foreignExchangeModel) => void;
}

function CurrencyExchangeForm(props: CurrencyExchangeFormProps): JSX.Element {

    const classes = formStyle();
    const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const [selectedCurrency, setSelectedCurrency] = useState<string>('');
    const [currencyStates, setCurrencyStates] = useState<string[]>([]);

    //setting form handlers using extend library named react-hook-form;
    const { register, handleSubmit, formState: { errors } } = useForm<foreignExchangeModel>();

    //Material Ui props;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 224,
                width: 250,
            },
        },
    };

    //getting currency options and states from backend using services named getOptionsAsync and getStatesAsync and setting local states;
    useEffect(() => {
        (async () => {
            try {
                const currencyOptions = await getOptionsAsync();
                const currencyStates = await getStatesAsync();
                setCurrencyOptions(currencyOptions);
                setCurrencyStates(currencyStates);
            } catch (error) {
                console.log(errorsService.getError(error));
            }
        })();
    }, [])

    //handling currencies changes and blocking it when more then 6 currencies has been click;
    const handleChangeCurrencies = (event: React.ChangeEvent<{ value: unknown }>) => {
        const targets = event.target.value as string[];
        setSelectedOptions(targets);
        //blocking any after the user selected six currencies;
        if (targets.length > 6) {
            targets.pop();
            setSelectedOptions(targets);
        };
    };

    //handling changed desire currency we want to exchange.
    const handleChangeChosenCurrency = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedCurrency(event.target.value as string);
    };

    //sending the form to backend and updating the parent states about the changes.
    async function send(foreignExchange: foreignExchangeModel) {
        try {
            const foreignExchangeRates = await getForeignExchangeAsync(foreignExchange);
            props.info(foreignExchangeRates, foreignExchange);
        } catch (err) {
            console.log(errorsService.getError(err));
        }
    }

    return (
        <div className="CurrencyExchangeForm">
            <h2>???????? ????"??</h2>
            <form onSubmit={handleSubmit(send)}>
                <TextField
                    id="date"
                    label="?????? ???????????? ?????? ??????????"
                    name="date"
                    inputProps={{ min: "2000-01-01", max: new Date().toISOString().split("T")[0] }}
                    type="date"
                    error={errors.date && true}
                    {...register('date', { required: true })}
                    helperText={errors.date && errors.date?.type === "required" && "?????????? ???????? ????????!"}
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
                    helperText={errors.amount && errors.amount?.type === "required" && "?????????? ????????!"}
                    label="???????? ???????? ???????? ??????????"
                />
                <FormControl className={classes.formControl}>
                    <InputLabel id="ourCurrency">???? ?????????? ???????? ?????? ???????? ??????????</InputLabel>
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
                            ???? ?????????? ???????? ?????? ???????? ??????????
                        </MenuItem>
                        {currencyStates.map((currency, index) => (
                            <MenuItem key={currency} value={index === 0 ? index : index + 2}>
                                {currency}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.chosenCurrency && errors.chosenCurrency?.type === "required" &&
                        <FormHelperText>???????? ?????????? ???????? ?????????? ??????????!</FormHelperText>
                    }
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="chipLabel">???? ?????????? ???? ?????????????? ?????????? ???????? ??????????</InputLabel>
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
                        <FormHelperText>???????? ?????????? ?????????? ???????? ??????</FormHelperText>
                    }
                </FormControl>
                <Button type="submit" variant="contained" color="primary">??????</Button>
            </form>
        </div>
    );
}

export default CurrencyExchangeForm;

