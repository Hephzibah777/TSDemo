"use strict";
import Form from "./Form.ts";
import StateManager from "./StateComponent.ts";
import Table from "./Table.ts"
import EmitListener from "./EmitListener.ts";
import CustomData from "../interfaces/FormData.ts"
import BaseComponent from "./BaseComponent.ts";
import Notification from "./Notification.ts";
import History from "./History.ts";
export default class App extends BaseComponent {
    private static instance:App;
    element: HTMLDivElement;
    stateManager: StateManager;
    emitter: EmitListener;
    form:Form;
    table:Table;
    notification:Notification;
    history:History;
    private constructor(rootId: string) {
        super();
        const elementcheck = document.getElementById(rootId);
        if (!elementcheck) {
            throw new Error(`Root element with id '${elementcheck}' not found.`);
        }
        this.emitter=new EmitListener();

        const stateComponent = StateManager.getInstance({
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
       
        this.stateManager=stateComponent;
        
        this.form= Form.getInstance(this.stateManager, this.emitter);
        this.table= Table.getInstance(this.stateManager, this.emitter);

       
        this.history=new History();
        this.render();
        this.notification=new Notification();

        this.emitter.subscribe("event:submit", (formData:CustomData)=>{
            this.notification.render('<i class="fa-solid fa-check"></i> Submitted Successfully');
            stateComponent.setState(formData);
            this.history.setHistory(this.stateManager.getState(),"submit");
        });
        this.emitter.subscribe("event:data-added", ()=>{
            this.table.addRow();
        });
        // this.emitter.subscribe("event:data-restored", (form)=>{
        //     stateComponent.setState(formData);
        // });

        this.emitter.subscribe("event:edit-row", (id)=>{
            this.form.populateRow(id);
        });
        this.emitter.subscribe("event:update", (formData:CustomData)=>{
            stateComponent.updateState(formData);
            this.history.setHistory(this.stateManager.getState(),"update", formData.id);
        });
        this.emitter.subscribe("event:delete", (index:number)=>{
            this.history.setHistory(this.stateManager.getState(), "delete", index);
            stateComponent.deleteState(index);
        });
        this.emitter.subscribe("event:state-changed", ()=>{
            this.table.addRow();
        });
        this.form.initializeEvents();
       

    }
    static getInstance(rootId:string){
          App.instance=new App(rootId);
          return App.instance;
    }
    render(){
        this.element.style.width = "100%";
        this.element.style.height = "100%";
        
        
      const buttondiv=document.createElement("div");
      buttondiv.classList.add("button-div");
      const historyButton=document.createElement("button");
        historyButton.innerHTML="Show History";
        historyButton.classList.add("historybutton")
        historyButton.addEventListener("click", ()=>{
            const tempdiv=document.getElementById("modal-container");
            tempdiv!.style.display="block";
        } )
        buttondiv.append(historyButton);
       const maindiv=document.createElement("div");
       maindiv.style.display="flex"
       maindiv.style.justifyContent="space-between";
        
       maindiv.append(this.form.render());
       maindiv.append(this.table.render());
       this.element.append(this.history.render());
       this.element.append(buttondiv);
       this.element.append(maindiv);

        
        return this.element;
    }
   


   


}