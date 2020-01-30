import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';
import { NavLink } from "react-router-dom";

const sideDrawer = ( props ) => {
    // let attachedClasses = [classes.SideDrawer, classes.Close];
    // if (props.open) {
    //     attachedClasses = [classes.SideDrawer, classes.Open];
    // }
    return (
      <Aux>
        <Backdrop show={props.open} clicked={props.closed} />
        <div className={classes.SideDrawer}>
          <nav>
            <NavigationItems />
          </nav>
        </div>
        <div className="sidenav">
          <NavLink to="/">Simple Grid</NavLink>
          <NavLink to="/cell-formatting">Cell Formatting</NavLink>
          <NavLink to="/slick-grid-ex1">Slick Grid Example 1</NavLink>
          <NavLink to="/sorting">Sorting</NavLink>
        </div>
      </Aux>
    );
};

export default sideDrawer;