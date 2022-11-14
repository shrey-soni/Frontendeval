import React from 'react';
import './style.css';

function fetchFaqItems() {
    return new Promise((resolve, _) => {
        setTimeout(() => {
            let itemList = [
                {
                    question: "How many bones does a cat have?",
                    answer: "A cat has 230 bones - 6 more than a human",
                },
                {
                    question: "How much do cats sleep?",
                    answer: "The average cat sleeps 12-16 hours per day",
                },
                {
                    question: "How long do cats live",
                    answer: "Outdoor cats live 5 years on average. Indoor cats live 15 years on average.",
                },
            ];
            resolve(itemList);
        }, 1000);
    });
}

export default function FaqComponent() {

    let [isOpenList, setOpenList] = React.useState([]);
    let [itemList, setItemList] = React.useState([]);
    fetchFaqItems().then((newList) => {
        setItemList(newList);
        setOpenList(Array(newList.length).fill(false));
    });

    const toggleAnswerSection=(index,flag)=>{
        const id="faq_component"+index;
        const elem = document.getElementById(id);
        const answers=elem.getElementsByClassName("faq_component_answer");
        answers[0].toggleAttribute("hidden");
    };

    const onDivClick=(index)=>{
        isOpenList[index] = !isOpenList[index];
        setOpenList(isOpenList);
        toggleAnswerSection(index,isOpenList[index]);
    };

    if (itemList.length == 0) {
        return (<div>Loading...</div>);
    }

    return (<div id="faq_component_list" className="faq_component_list">
        {itemList.map((item, index) => {
            return (
                <div id={"faq_component"+index} className="faq_component"
                    key={"" + index} onClick={() => { onDivClick(index) }}>
                    <div className="faq_component_arrow">{"▶️"}</div>
                    <div className="faq_component_description">
                        <div className="faq_component_question">{item.question}</div>
                        <div className="faq_component_answer" hidden onClick={(event)=>{
                            event.stopPropagation();
                        }}>{item.answer}</div>
                    </div>
                </div>);
        })}
    </div>);
}