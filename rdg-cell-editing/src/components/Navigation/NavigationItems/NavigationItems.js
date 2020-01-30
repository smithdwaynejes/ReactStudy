import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Simple Grid</NavigationItem>
        <NavigationItem link="/orders">Cell Formatting</NavigationItem>
    </ul>
);

export default navigationItems;