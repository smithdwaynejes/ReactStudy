import React, {Component} from 'react';
import styled from 'styled-components';

// import './Person.css'
const StyledDiv = styled.div`
        width: 60%;
        margin: 16px auto;
        border: 1px solid #eee;
        box-shadow: 0 2px 3px #ccc;
        padding: 16px;
        text-align: center;


        @media (min-width:500px) {
        width: 450px;
        }
        `;
class Person extends Component {
static getDerivedStateFromProps(props,state) {
    console.log('[Person.js] getDerivedStateFromProps');
    return state;
}
shouldComponentUpdate(nextProps,nextState){
    console.log('Person.js] shouldComponentUpdate...');
    return true;
}

getSnapshotBeforeUpdate(prevProps,prevState){
    console.log('[Person.js] getSnapshotBeforeUpdate...');
    return {message:'fromsnapshot'};

}

componentDidUpdate(props,state,snapshot) {
    console.log('[Person.js] componentDidUpdate');
    console.log(snapshot);
}

    render() {
        console.log('[Person.js] running child render');
        return (
            
            <StyledDiv>
            < p onClick = { this.props.click } > I'm a {this.props.name}. I am {this.props.age} years old</p>
                < p > { this.props.children }</p >
                    <input type='text' value={this.props.name} onChange={this.props.change}></input>
            </StyledDiv>
        )
    }
   
};

export default Person;