"use strict";
import Form from "./Form.ts";
import StateComponent from "./StateComponent.ts";
import Table from "./Table.ts"
import EmitListener from "./EmitListener.ts";
import CustomData from "../interfaces/FormData.ts"


export default class App {
    element: HTMLDivElement;
    stateManager: StateComponent["state"];
    emitter: EmitListener;

    constructor(rootId: string) {

        const elementcheck = document.getElementById(rootId);
        if (!elementcheck) {
            throw new Error(`Root element with id '${elementcheck}' not found.`);
        }
        this.emitter=new EmitListener();

        const stateComponent = new StateComponent({
            formData: {
                id:0,
                email: "",
                firstname: "",
                lastname: "",
                phone: "",
                password: "",
                country: "",
                area: "",
                pin: "",
            } ,
            tableData: {
                rows: [],
            },
        }, this.emitter);
        this.element = elementcheck as HTMLDivElement;
        
        this.stateManager=stateComponent.state;
        
        const FormElement = new Form(this.stateManager, this.emitter);
        const TableElement = new Table(this.stateManager, this.emitter);
        this.element.append(FormElement.render());
        this.element.append(TableElement.render());
    
        this.emitter.subscribe("event:submit", (formData:CustomData)=>{
            stateComponent.handleSubmit(formData);
        });
        this.emitter.subscribe("event:data-added", ()=>{
            TableElement.addRow();
        });

        this.emitter.subscribe("event:edit-row", (id)=>{
            FormElement.populateRow(id);
        });
        this.emitter.subscribe("event:update", (formData:CustomData)=>{
            stateComponent.handleUpdate(formData);
        });
        this.emitter.subscribe("event:state-changed", (id:number)=>{
            TableElement.handleUpdate(id);
        });
        FormElement.initializeEvents();
       

    }
   


   


}