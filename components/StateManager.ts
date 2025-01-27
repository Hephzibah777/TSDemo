import StateData from "../interfaces/AppState.ts"
import CustomData from "../interfaces/FormData.ts";
import EmitListener from "./EmitListener.ts";


export default class StateManager {
    private static instance:StateManager;
    state: StateData;
    emitter: EmitListener;

    private constructor(initialState: StateData, emit: EmitListener) {
        this.state = initialState;
        this.emitter = emit;
    }
    static getInstance(initialState: StateData, emit: EmitListener){
        StateManager.instance=new StateManager(initialState, emit);
        return StateManager.instance;
  }
    setState(formData: CustomData) {

            Object.keys(formData).forEach((key) => {
                const typedKey = key as keyof CustomData;
                this.state.formData[typedKey] = formData[typedKey];
            });
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
    updateState(formData: CustomData){
        const id=formData.id;
        Object.keys(formData).forEach((key) => {
            const typedKey = key as keyof CustomData;
            this.state.formData[typedKey] = formData[typedKey];
            this.state.tableData.rows[id][typedKey] = formData[typedKey];
        }); 
        this.emitter.emit('event:state-changed');
    }
   
    deleteState(index:number){
        this.state.tableData.rows.splice(index,1);
        this.emitter.emit('event:state-changed');
    }
    getState(){
        return this.state;
    }
  

}
