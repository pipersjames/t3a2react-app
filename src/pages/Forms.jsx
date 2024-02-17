import React from "react";
import LongQA from "../components/LongQA";
import ShortQA from "../components/ShortQA";
import EmailInput from "../components/EmailInput";
import FullNameInput from "../components/FullNameInput";

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