export default class Notification{
    toastBox:HTMLDivElement;
    
    constructor(){
        const element=document.getElementById("toastBox");
        this.toastBox=element as HTMLDivElement;
    }
    render(msg:string){
        const toast=document.createElement("div");
        this.toastBox.classList.add("toast");
        toast.innerHTML=msg;
        this.toastBox.append(toast);

        if(msg.includes("Invalid")){
            this.toastBox.classList.add("invalid");
        }

        setTimeout(() => {
            this.toastBox.remove();
        }, 2000);


    }
}