import React from "react";
import LongQA from "../components/formComponents/LongQA";
import ShortQA from "../components/formComponents/ShortQA";
import EmailInput from "../components/formComponents/EmailInput";
import FullNameInput from "../components/formComponents/FullNameInput";

export default function FormsPage(){
    return(
        <div>
            <h1>Rendering Tests</h1>
           <LongQA/>
           <ShortQA/>
           <EmailInput/>
           <FullNameInput/>
        </div>
    )
}