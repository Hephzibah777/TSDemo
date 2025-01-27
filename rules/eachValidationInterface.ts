
export default interface eachValidationRules {
    attribute:string,
    isValid: (input:HTMLInputElement) => boolean,
    errorMessage: (input:HTMLInputElement) => string,
}