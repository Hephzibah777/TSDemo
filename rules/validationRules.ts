
import eachValidationRules from "./eachValidationInterface";

const validationRules:eachValidationRules[] = [
    {
        attribute: "req",
        isValid: (input: HTMLInputElement) => input.value !== "",
        errorMessage: (input: HTMLInputElement) => {
            return `${input.getAttribute("label")} is required`;
        },
    },
    {
        attribute: "minLength",
        isValid: (input: HTMLInputElement)  => input.value.length >= Number(input.getAttribute("minLength")),
        errorMessage: (input: HTMLInputElement)  => `${input.getAttribute("label")} should atleast be of length ${Number(input.getAttribute("minLength"))}`,
    },
    {
        attribute: "maxLength",
        isValid: (input: HTMLInputElement)  => input.value.length <= Number(input.getAttribute("maxLength")),
        errorMessage: (input: HTMLInputElement)  => `${input.getAttribute("label")}  is more than ${Number(input.getAttribute("maxLength"))}`,
    },
    {
        attribute: "pattern",
        isValid: (input: HTMLInputElement)  => {
            const pattern = new RegExp(input.getAttribute("pattern") as string);
            console.log(input.value);
            return pattern.test(input.value);
        },
        errorMessage: (input: HTMLInputElement)  => `${input.getAttribute("label")}  is not valid `,
    },
]

export default validationRules;