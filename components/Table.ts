import BaseComponent from "./BaseComponent.ts"
import StateComponent from "./StateComponent.ts";
import EmitListener from "./EmitListener.ts";


export default class Table extends BaseComponent{
tablelement:HTMLDivElement;
StateManager: StateComponent["state"];
emitter: EmitListener;
updatedrow:HTMLTableRowElement;


 constructor(stateManager: StateComponent["state"], emit:EmitListener){
    super();
    this.StateManager=stateManager
    this.tablelement=document.createElement("div");
    this.tablelement.setAttribute("id", "table-container");
    this.tablelement.classList.add("tablediv");
    this.emitter=emit;
    this.updatedrow=document.createElement("tr");
   
    
 }


 addRow(){

    const tablebody = document.getElementById("table");
    
    

    const newRow = document.createElement("tr");
    const emailCell = document.createElement("td");
    const length=this.StateManager.tableData.rows.length;
    emailCell.textContent = this.StateManager.tableData.rows[length-1].email as string;

    const phoneCell = document.createElement("td");
    phoneCell.textContent = this.StateManager.tableData.rows[length-1].phone as string;

    const firstnameCell = document.createElement("td");
    firstnameCell.textContent = this.StateManager.tableData.rows[length-1].firstname as string;

    const lastnameCell = document.createElement("td");
    lastnameCell.textContent = this.StateManager.tableData.rows[length-1].lastname as string;

    newRow.appendChild(firstnameCell);
    newRow.appendChild(lastnameCell);
    newRow.appendChild(emailCell);
    newRow.appendChild(phoneCell);
  


    //create edit button for each newly added row
    const editbutton = document.createElement("button");
    editbutton.textContent = "Edit";
    editbutton.classList.add("button-edit");

    const id=this.StateManager.tableData.rows.length-1;
    editbutton.addEventListener("click", () =>{
        this.updatedrow=newRow;
        this.emitter.emit('event:edit-row', id);
    });

    //create delete button for each newly added row
    const deletebutton = document.createElement("button");
    deletebutton.textContent = "Delete";
    deletebutton.classList.add("button-delete");
    deletebutton.addEventListener("click", () =>{
        newRow.remove();
        let form = document.getElementById("myForm") as HTMLFormElement;
        form.reset();
    });

    const commonbutton = document.createElement("td");
    commonbutton.classList.add("buttons");
    commonbutton.append(editbutton, deletebutton);

    newRow.appendChild(commonbutton);
    tablebody!.append(newRow);

 }

 handleUpdate(id:number){
    const row=this.updatedrow;
    row.cells[0].innerHTML=this.StateManager.tableData.rows[id].firstname as string;
    row.cells[1].innerHTML=this.StateManager.tableData.rows[id].lastname as string;
    row.cells[2].innerHTML=this.StateManager.tableData.rows[id].email as string;
    row.cells[3].innerHTML=this.StateManager.tableData.rows[id].phone as string;
    let form = document.getElementById("myForm") as HTMLFormElement;
    form.reset();
 }


render(){

    const table=document.createElement("table");
    table.classList.add("table");
    table.setAttribute("id", "table");
    const newRow=table.insertRow();
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
    this.tablelement.append(table);
    return this.tablelement;

}

}