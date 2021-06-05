import { Button, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CurrencyExchangeByDatesModel } from "../../Models/currencyExchangeByDate.model";
import { createExcelUrlDownload, getOptionsAsync } from "../../Services/currencyExchange.service";
import { formStyle } from "../../Services/GlobalStylingMaker";
import "./ExchangeRatesWithDatesForm.css";


function ExchangeRatesWithDatesForm(): JSX.Element {

    const classes = formStyle();
    const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const { register, handleSubmit, getValues, formState: { errors } } = useForm<CurrencyExchangeByDatesModel>();

    useEffect(() => {
        (async () => {
            const currencyOptions = await getOptionsAsync();
            setCurrencyOptions(currencyOptions);
        })();
    }, [])

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 224,
                width: 250,
            },
        },
    };

    const handleChangeCurrencies = (event: React.ChangeEvent<{ value: unknown }>) => {
        const targets = event.target.value as string[];
        setSelectedOptions(targets);
        //blocking any after the user selected six currencies;
        if (targets.length > 6) {
            targets.pop();
            setSelectedOptions(targets);
        };
    };

    async function send(exchangeCurrencies: CurrencyExchangeByDatesModel) {
        try {
            const link = document.createElement('a');
            link.href = createExcelUrlDownload(exchangeCurrencies);
            link.click();
        } catch (err) {
            console.log(err.message);
        }
    }



    return (
        <div className="ExchangeRatesWithDatesForm">
            <h2>שערי חליפין של מטבעות לפי תאריכים</h2>
            <form onSubmit={handleSubmit(send)}>
                <TextField
                    label="תאריך התחלה"
                    name="dateStart"
                    inputProps={{ min: "2000-01-01", max: new Date().toISOString().split("T")[0] }}
                    type="date"
                    error={errors.dateStart && true}
                    {...register('dateStart', { required: true })}
                    helperText={errors.dateStart && errors.dateStart?.type === "required" && "תאריך התחלה הינו חובה!"}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label="תאריך סיום"
                    name="dateEnd"
                    inputProps={{ min: new Date(getValues("dateStart") || "2000").toISOString().split("T")[0], max: new Date().toISOString().split("T")[0] }}
                    type="date"
                    error={errors.dateEnd && true}
                    {...register('dateEnd', { required: true })}
                    helperText={errors.dateEnd && errors.dateEnd?.type === "required" && "תאריך סיום הינו חובה!"}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <FormControl className={classes.formControl}>
                    <InputLabel id="chipLabel">נא לבחור את המטבעות </InputLabel>
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
                <Button type="submit" variant="contained" color="primary">הורד</Button>
            </form>
        </div>
    );
}

export default ExchangeRatesWithDatesForm;
