import HistoryEntry from "../interfaces/HistoryData"
import rowData from "../interfaces/TableRowData";
import StateData from "../interfaces/AppState";
import EmitListener from "./EmitListener";

export default class History{
  historyData:HistoryEntry[];
  id:number;
  historyelement:HTMLDivElement;
  emitter:EmitListener

  constructor(){
    this.historyData=[];
    this.id=-1;
    this.historyelement=document.createElement("div");
    this.historyelement.classList.add("modal-container");
    this.historyelement.setAttribute("id", "modal-container");
    this.emitter=new EmitListener();
  }

  setHistory(state:StateData, action:string, id?:number){
    this.id=this.id+1;
    const tempdata=JSON.parse(JSON.stringify(state.tableData));
    const newHistoryEntry: HistoryEntry={
        id:this.id,
        action,
        timestamp:new Date().toISOString(),
        data: tempdata,
    }
    this.addHistory(newHistoryEntry, action, id!);
    this.historyData.push(newHistoryEntry); 
   
  }

  addHistory(newHistoryEntry: HistoryEntry, action:string, id:number){

    const datatimediv=document.createElement("div");
    datatimediv.classList.add("datatimediv");
    const timediv=document.createElement("div");
    timediv.innerHTML=`Created At: <br> ${newHistoryEntry.timestamp}`;
    const restorebutton=document.createElement("button");
    restorebutton.classList.add("restorebutton");
    restorebutton.innerHTML="Restore Data";


     const eachdiv=document.createElement("div");
     const tableData=newHistoryEntry.data?.rows;
     const tablebody=document.createElement("table");
     for(let i=0; i<tableData!.length; i++){
        const newRow = document.createElement("tr");
        const emailCell = document.createElement("td");
        emailCell.textContent = newHistoryEntry.data!.rows[i].email as string;
    
        const phoneCell = document.createElement("td");
        phoneCell.textContent = newHistoryEntry.data!.rows[i].phone as string;
    
        const firstnameCell = document.createElement("td");
        firstnameCell.textContent = newHistoryEntry.data!.rows[i].firstname as string;
    
        const lastnameCell = document.createElement("td");
        lastnameCell.textContent = newHistoryEntry.data!.rows[i].lastname as string;
    
        newRow.appendChild(firstnameCell);
        newRow.appendChild(lastnameCell);
        newRow.appendChild(emailCell);
        newRow.appendChild(phoneCell); 

        if(action=="update" && newHistoryEntry.data!.rows[i].id==id){
            firstnameCell.style.color="green";
            lastnameCell.style.color="green";
            phoneCell.style.color="green";
            emailCell.style.color="green";
        }
        if(action=="delete" && i==id){
            console.log("hello");
            firstnameCell.style.color="red";
            lastnameCell.style.color="red";
            phoneCell.style.color="red";
            emailCell.style.color="red";

            for(let cells of newRow.cells){
                cells.style.textDecoration="line-through";
            }
        }
        tablebody.append(newRow);
        }
        eachdiv.append(tablebody);
        datatimediv.append(timediv);
        datatimediv.append(eachdiv);
        const historycontent=document.getElementById("modal");
       
        historycontent!.append(datatimediv);  
        // historycontent!.append(restorebutton);  
        // restorebutton.addEventListener("click", ()=>{
        //     this.emitter.emit('event:data-restored', newHistoryEntry.data);
        // })
  }

  getHistory(){
    return this.historyData;
  }

  render(){
    const historycontent=document.createElement("div");
    historycontent.classList.add("modal");
    historycontent.setAttribute("id", "modal");
    const headerdiv=document.createElement("div");
    headerdiv.classList.add("headerdiv");
    const heading=document.createElement("h1");
    heading.innerHTML="Revisions";
    const close=document.createElement("span");
    close.innerText="X";
    close.classList.add("close");
    close.addEventListener("click", ()=>{
            this.historyelement.style.display="none";
        })
   
    headerdiv.append(heading);
    headerdiv.append(close);
    historycontent.append(headerdiv);
    this.historyelement.append(historycontent);
    return this.historyelement;
    
  }
}