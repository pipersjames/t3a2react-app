import { createContext, useState } from "react";
import FullNameInput from "../components/formComponents/FullNameInput";
import EmailInput from "../components/formComponents/EmailInput";
import ShortQA from "../components/formComponents/ShortQA";
import LongQA from "../components/formComponents/LongQA";
import FileUpload from "../components/formComponents/FileUpload";
import DateTimeInput from "../components/formComponents/DateTimeInput";

export const FormComponentContext = createContext();

export function FormComponentProvider(props) {
  
    const [shortAnswerTitle, setShortAnswerTitle] = useState('Short Question Title')
    const [LongAnswerTitle, setLongAnswerTitle] = useState('Long Question Title')

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