import React, { useState } from 'react';
import styles from '../styles/home/Home.module.css';
import GridPage from './customers/GridPage';
import 'devextreme/dist/css/dx.greenmist.css';
import { customersdata } from '../app/data/customersdata.js';

function Customers() {
  return (
   <><div className={styles.main_container}>
    <br/>
    <center>
      <h1>Manage the Customers</h1>
      <h3> You have now {customersdata.length} Customers</h3></center>
      
      <GridPage/>
    </div></>
   

  )
}

export default Customers;
