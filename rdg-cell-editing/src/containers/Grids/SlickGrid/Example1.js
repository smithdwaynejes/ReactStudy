import React, {Component} from 'react';
import SlickGrid1 from "../../../components/SlickGrid/GridExamples/Example1_core";


class Example1 extends Component {

    componentDidMount() {
        // SlickGrid1();
    }

    // componentDidUpdate () {
    //     SlickGrid1();
    // }

    render () {

        return <SlickGrid1 />
        // return (
        // //   <div
        // //     id="myGrid"
        // //     style={{ width: "100%", height: "313px" }}
        // //     className="slickgrid-container"
        // //   ></div>
        // );
    }
}

export default Example1;