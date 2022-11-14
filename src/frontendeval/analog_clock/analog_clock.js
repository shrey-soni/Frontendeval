import React from "react";

class AnalogClock extends React.Component {
    clockInterval = "";
    constructor() {
        super();
        this.state = {
            seconds: 0,
            hours: 0,
            minutes: 0,
        };
        this.updateTime = this.updateTime.bind(this);
    }

    componentDidMount() {
        this.clockInterval = setInterval(this.updateTime, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.clockInterval);
    }

    updateTime() {
        const date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        // if(seconds === 0){
        //     let elms = document.getElementsByClassName("ac_second_hand");
        //     elms[0].style.transition = ""
        // }
        // else {
        //     let elms = document.getElementsByClassName("ac_second_hand");
        //     elms[0].style.transition = "transform 1s linear";
        // }
        this.setState({ seconds, hours, minutes });
    }

    render() {
        const { seconds , hours, minutes } = this.state;
        const secondStyle = {
            transform: `rotate(${(seconds * 6) + 90}deg)`,
        }
        const hourStyle={
            transform: `rotate(${(hours * 30) + 90}deg)`,
        }
        const minuteStyle={
            transform: `rotate(${(minutes * 6) + 90}deg)`,
        }
        return (<div id="analog_clock" className="analog_clock">
            <div className="ac_dial">
                <div className="ac_holder"></div>
                <div className="ac_second_hand" style={secondStyle}></div>
                <div className="ac_minute_hand" style={minuteStyle}></div>
                <div className="ac_hour_hand" style={hourStyle}></div>
            </div>
        </div>);
    }
}

export default AnalogClock