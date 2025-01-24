import StateData from "../interfaces/AppState.ts"
import CustomData from "../interfaces/FormData.ts";
import EmitListener from "./EmitListener.ts";


export default class StateComponent {
    state: StateData;
    emitter: EmitListener;

    constructor(initialState: StateData, emit: EmitListener) {
        this.state = initialState;
        this.emitter = emit;
    }
    handleSubmit(formData: CustomData) {
       
            Object.keys(formData).forEach((key) => {
                const typedKey = key as keyof CustomData;
                this.state.formData[typedKey] = formData[typedKey];
            });
            let form = document.getElementById("myForm") as HTMLFormElement;
            form.reset();
            this.handleAddRow();
            alert("Successfully submitted");
        
    }
    handleUpdate(formData: CustomData){
        const id=formData.id;
        Object.keys(formData).forEach((key) => {
            const typedKey = key as keyof CustomData;
            this.state.formData[typedKey] = formData[typedKey];
            this.state.tableData.rows[id][typedKey] = formData[typedKey];
        }); 
        this.emitter.emit('event:state-changed', formData.id);
    }

    handleAddRow() {
        const RowData = {
            email: this.state.formData["email"],
            firstname: this.state.formData["firstname"],
            lastname: this.state.formData["lastname"],
            phone: this.state.formData["phone"],
            country: this.state.formData["country"],
            area: this.state.formData["area"],
            pin: this.state.formData["pin"],
            password: this.state.formData["password"],
            id: this.state.formData["id"],
        }
        this.state.tableData.rows.push(RowData);
        this.emitter.emit('event:data-added');
    }
  

}
