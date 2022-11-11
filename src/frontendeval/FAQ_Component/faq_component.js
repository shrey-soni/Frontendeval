import React from 'react';
import './style.css';

export default function FaqComponent({item}){
    let[isOpen,setOpen] = React.useState(false);



    return (<div id="faq_component" className="faq_component">
        <div className="faq_component_arrow">{"▶️"}</div>
        <div className="faq_component_description">
            <div className="faq_component_question">{item.question}</div>
            <div className="faq_component_answer">{item.answer}</div>
        </div>
    </div>);
}