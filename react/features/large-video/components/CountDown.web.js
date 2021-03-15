import moment from "moment";
import React, { Component } from "react";

class CountDown extends Component {
    state = {
        seconds: undefined,
    };

    componentDidMount() {
        this.interval = setInterval(() => {
            var seconds = moment(
                "15/03/2021 05:45:00",
                "DD/MM/YYYY hh:mm:ss"
            ).diff(
                moment(
                    moment().utc().format("DD/MM/YYYY hh:mm:ss"),
                    "DD/MM/YYYY hh:mm:ss"
                ),
                "seconds"
            );
            this.setState({ seconds });
        }, 1000);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render() {
        const { seconds } = this.state;

        // Mapping the date values to radius values
        const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

        if (!seconds) {
            return null;
        }

        if (seconds < 30 && seconds > 0) {
            return (
                <div>
                    <div
                        style={{
                            position: "absolute",
                            top: "25%",
                            left: "49%",
                        }}
                    >
                        {seconds && (
                            <div
                                style={{
                                    color: "white",
                                    fontSize: "40px",
                                    position: "absolute",
                                    zIndex: 100,
                                }}
                            >
                                {seconds}
                            </div>
                        )}
                    </div>
                </div>
            );
        } else {
            return <></>;
        }
    }
}

function mapNumber(number, in_min, in_max, out_min, out_max) {
    return (
        ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
}

export default CountDown;
