import { createContext, useState } from "react";
import FullNameInput from "../components/FullNameInput";
import EmailInput from "../components/EmailInput";
import ShortQA from "../components/ShortQA";
import LongQA from "../components/LongQA";
import FileUpload from "../components/FileUpload/FileUpload";
import DateTimeInput from "../components/DateTimeInput";

export const FormComponentContext = createContext();

export function FormComponentProvider(props) {
  
    const [shortAnswerTitle, setShortAnswerTitle] = useState('')
    const [LongAnswerTitle, setLongAnswerTitle] = useState('')

    const formComponents = {
        'Full Name' : [FullNameInput],
        'Email' : [EmailInput],
        'Short Question and Answer' : [ShortQA, shortAnswerTitle, setShortAnswerTitle], 
        'Long Question and Answer' : [LongQA,  LongAnswerTitle, setLongAnswerTitle],
        'File Upload' : [FileUpload],
        'Date and Time' : [DateTimeInput]
    }

  return (
    <FormComponentContext.Provider value={{formComponents}}>
      {props.children}
    </FormComponentContext.Provider>
  );
}