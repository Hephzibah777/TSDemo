import BaseComponent from "./BaseComponent.ts"
import StateManager from "./StateManager.ts";
import EmitListener from "./EmitListener.ts";



export default class Table extends BaseComponent{
    private static instance: Table;
tablelement:HTMLDivElement;
StateManager: StateManager;
emitter: EmitListener;
updatedrow:HTMLTableRowElement;


 constructor(stateManager: StateManager, emit:EmitListener){
    super();
    this.StateManager=stateManager
    this.tablelement=document.createElement("div");
    this.emitter=emit;
    this.updatedrow=document.createElement("tr");
 }
 static getInstance(stateManager: StateManager, emit:EmitListener){
    this.instance=new Table(stateManager, emit);
    return this.instance;
 }


 addRow(){
    
   const tableData=this.StateManager.getState().tableData.rows;
   const tablebody = document.getElementById("table");
   const tbody=document.querySelector("tbody");
   (tbody as HTMLElement).innerHTML="";

   for(let i=0; i<tableData.length; i++){
    const newRow = document.createElement("tr");
    const emailCell = document.createElement("td");
    const length=this.StateManager.getState().tableData.rows.length;
    emailCell.textContent = this.StateManager.getState().tableData.rows[i].email as string;

    const phoneCell = document.createElement("td");
    phoneCell.textContent = this.StateManager.getState().tableData.rows[i].phone as string;

    const firstnameCell = document.createElement("td");
    firstnameCell.textContent = this.StateManager.getState().tableData.rows[i].firstname as string;

    const lastnameCell = document.createElement("td");
    lastnameCell.textContent = this.StateManager.getState().tableData.rows[i].lastname as string;

    newRow.appendChild(firstnameCell);
    newRow.appendChild(lastnameCell);
    newRow.appendChild(emailCell);
    newRow.appendChild(phoneCell);
  


    //create edit button for each newly added row
    const editbutton = document.createElement("button");
    editbutton.textContent = "Edit";
    editbutton.classList.add("button-edit");

    const id=this.StateManager.getState().tableData.rows[i].id;
    editbutton.addEventListener("click", () =>{
        this.updatedrow=newRow;
        this.emitter.emit('event:edit-row', i);
    });

    //create delete button for each newly added row
    const deletebutton = document.createElement("button");
    deletebutton.textContent = "Delete";
    deletebutton.classList.add("button-delete");
    deletebutton.addEventListener("click", () =>{
        // newRow.remove();
        // let form = document.getElementById("myForm") as HTMLFormElement;
        // form.reset();
        const index=this.StateManager.getState().tableData.rows.findIndex(obj => obj.id==id);
        this.emitter.emit('event:delete', index);
    });

    const commonbutton = document.createElement("td");
    commonbutton.classList.add("buttons");
    commonbutton.append(editbutton, deletebutton);

    newRow.appendChild(commonbutton);
    tbody?.appendChild(newRow);
   }
   tablebody!.append(tbody as HTMLElement);
 }

//  handleUpdate(id:number){
//     const row=this.updatedrow;
//     row.cells[0].innerHTML=this.StateManager.getState().tableData.rows[id].firstname as string;
//     row.cells[1].innerHTML=this.StateManager.getState().tableData.rows[id].lastname as string;
//     row.cells[2].innerHTML=this.StateManager.getState().tableData.rows[id].email as string;
//     row.cells[3].innerHTML=this.StateManager.getState().tableData.rows[id].phone as string;
//     let form = document.getElementById("myForm") as HTMLFormElement;
//     form.reset();
//  }


render(){
   
    this.tablelement.setAttribute("id", "table-container");
    this.tablelement.classList.add("tablediv");
    const table=document.createElement("table");
    const thead=document.createElement("thead");
    table.classList.add("table");
    table.setAttribute("id", "table");
    const newRow=thead.insertRow();
    const firstnamecell=newRow.insertCell();
    firstnamecell.innerHTML="First Name";
    const lastnamecell=newRow.insertCell();
    lastnamecell.innerHTML="Last Name"; 
    const emailcell=newRow.insertCell();
    emailcell.innerHTML="Email"; 
    const phonecell=newRow.insertCell();
    phonecell.innerHTML="Phone Number";
    const actioncell=newRow.insertCell();
    actioncell.innerHTML="Actions";
    const tbody=document.createElement("tbody");
    table.append(thead);
    table.append(tbody);
    this.tablelement.append(table);
    
    return this.tablelement;

}

}