import BaseComponent from "./BaseComponent.ts"
import StateComponent from "./StateComponent.ts"
import EmitListener from "./EmitListener.ts"
import FormData from "../interfaces/FormData.ts"
import rowData from "../interfaces/TableRowData.ts"
import validationRules from "../rules/validationRules.ts"


interface formlayout {
    name: string,
    label: string,
    value: String,
}

export default class Form extends BaseComponent {
    formelement: HTMLDivElement;
    formFields: formlayout[] = [
        { name: "email", label: "Email:", value: "" },
        { name: "firstname", label: "First Name:", value: "" },
        { name: "lastname", label: "Last Name:", value: "" },
        { name: "phone", label: "Phone Number:", value: "" },
        { name: "password", label: "Password:", value: "" },
        { name: "country", label: "Country:", value: "" },
        { name: "area", label: "Area:", value: "" },
        { name: "pin", label: "Pin Code:", value: "" },
    ];
    formData: FormData = {
        id: 0,
        email: "",
        firstname: "",
        lastname: "",
        phone: "",
        password: "",
        country: "",
        area: "",
        pin: "",
    }
    StateManager: StateComponent["state"];
    emitter: EmitListener;
    id: number;
    counter: boolean;
    constructor(stateManager: StateComponent["state"], emit: EmitListener) {
        super();
        this.StateManager = stateManager;
        this.emitter = emit;
        this.id = -1;
        this.counter = false;
        this.formelement = document.createElement("div");
    }
    initializeEvents() {
        const submit = document.getElementById("submit-button");
        submit!.addEventListener('click', (event: Event) => {
            event.preventDefault();
            this.handleValidation();
            Object.keys(this.formData).forEach((key) => {
                const value = (document.getElementById(key) as HTMLInputElement | null)?.value;
                (this.formData as any)[key] = value!;
            });
            if (this.counter == false) {
                this.id++;
                this.formData["id"] = this.id;
                this.emitter.emit('event:submit', this.formData);
            }
            else {
                this.formData["id"] = this.id;
                this.emitter.emit('event:update', this.formData);
            }
        });
    }

    handleValidation() {
        this.handleEachFieldValidation(document.getElementById("email") as HTMLInputElement);
    }

    handleEachFieldValidation(input: HTMLInputElement) {
        var validfield = true;
        for(const field of validationRules){
            var attr=input.getAttribute(field.attribute);
            if (typeof attr !== typeof undefined  && (field.isValid(input)==false)) {
                var tempval = "#" + input.getAttribute("id")+ "-error";
                const val=document.getElementById(tempval) as HTMLDivElement;
                // val.textContent=field.errorMessage(input);
                // validfield = false;
                // return false; //works like a break
            }
        }
        }
    


    populateRow(id: number) {

        this.formFields.forEach(field => {
            const eachfield = document.getElementById(field.name) as HTMLInputElement;
            eachfield!.value = this.StateManager.tableData.rows[id][field.name as keyof rowData] as string;
        })
        this.counter = true;
    }



    render() {
        const form = document.createElement("div");
        this.formelement = form;
        this.formelement.setAttribute("id", "form-container");
        this.formelement.style.margin = "0.5rem";
        this.formelement.style.padding = "5rem";
        this.formelement.style.width = "40%";
        const formContent = document.createElement("form");
        formContent.setAttribute("id", "myForm");
        formContent.style.border = "2px solid grey";
        formContent.style.padding = "3rem";
        formContent.style.borderRadius = "1rem";
        this.formFields.forEach(field => {
            const eachfield = document.createElement("div");
            eachfield.classList.add("fieldClass");

            const eachfieldlabel = document.createElement("label");
            const eachfieldinput = document.createElement("input");
            const eachfielderror = document.createElement("span");
            eachfielderror.classList.add("error-field");
            eachfielderror.textContent="hello";
            const temp=field.name + "-error";
            eachfielderror.setAttribute("id", temp);
            eachfieldinput.classList.add("inputcss");
            eachfieldinput.setAttribute("req", "true");
            eachfieldinput.setAttribute("label", field.label);
            eachfieldlabel.innerHTML = field.label;

            eachfieldinput.setAttribute("id", field.name);

            if (eachfieldinput.id == "email") {
                eachfieldinput!.setAttribute("minLength", "10");
                eachfieldinput!.setAttribute("maxLength", "40");
                eachfieldinput!.setAttribute("pattern", "^(.+)@(.+)$");
            }
            if (eachfieldinput.id == "password") {
                eachfieldinput!.setAttribute("minLength", "8");
                eachfieldinput!.setAttribute("maxLength", "10");
                eachfieldinput!.setAttribute("pattern", "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$");
            }
            if (eachfieldinput.id == "phone") {
                eachfieldinput!.setAttribute("minLength", "10");
                eachfieldinput!.setAttribute("maxLength", "10");
                eachfieldinput!.setAttribute("pattern", "^\d{10}$");
            }

            eachfield.appendChild(eachfieldlabel);
            eachfield.appendChild(eachfieldinput);

            formContent.append(eachfield);
        })


        const formsubmitdiv = document.createElement("div");
        formsubmitdiv.style.display = "flex";
        formsubmitdiv.style.justifyContent = "right";

        const formsubmitbutton = document.createElement("button");
        formsubmitbutton.innerHTML = "Submit";
        formsubmitbutton.setAttribute("id", "submit-button");

        formsubmitdiv.append(formsubmitbutton);
        formContent.append(formsubmitdiv);

        this.formelement.appendChild(formContent);
        return this.formelement;

    }

}
