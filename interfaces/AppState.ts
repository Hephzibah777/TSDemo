import CustomData from "./FormData";
import TableData from "./TableData";

export default interface StateData{
    formData:{
        [key in keyof CustomData]: string | number;
    }
  
    tableData:TableData,
}


