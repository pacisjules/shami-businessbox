import React from 'react'
import styles from '../styles/home/Home.module.css'
import { BsFillPeopleFill } from 'react-icons/bs';
import { MdProductionQuantityLimits, MdPointOfSale } from 'react-icons/md'
import { HiClipboardDocumentList } from 'react-icons/hi2'
import { useRouter } from "next/router";
import { customersdata } from "../app/data/customersdata.js"
function home() {
  const router = useRouter();

  const gotoCustomers = () =>{
    router.push("Customers");
  }
  return (
    <div className={styles.homecont}>

      <div className={styles.up}><h1>Welcome in <br /> Business Shami-SetBox</h1>
        <button>QUICK Actions</button>
      </div>
<br/>
      <div className={styles.middle}>

        <div className={styles.quick}>
          <div className={styles.dicon}>
            <BsFillPeopleFill style={{
              color:"#000D1C",
              fontSize:"18pt"
            }}/>
          </div>
          

          <h1>{customersdata.length}</h1>
          <h2>{customersdata.length>1?"Customers":"Customer"}</h2>
          
          <button onClick={gotoCustomers}>OPEN</button>
          
        </div>



        <div className={styles.quick}>
        <div className={styles.dicon}>
            <MdProductionQuantityLimits style={{
              color:"#000D1C",
              fontSize:"18pt"
            }}/>
          </div>

          <h1>23</h1>
          <h2>Products</h2>
          <button>OPEN</button>
        </div>


        <div className={styles.quick}>
        <div className={styles.dicon}>
            <MdPointOfSale style={{
              color:"#000D1C",
              fontSize:"18pt"
            }}/>
          </div>

          <h1>3</h1>
          <h2>Sales</h2>
          <button>OPEN</button>
        </div>


        <div className={styles.quick}>
        <div className={styles.dicon}>
            <HiClipboardDocumentList style={{
              color:"#000D1C",
              fontSize:"18pt"
            }}/>
          </div>

          <h1>18</h1>
          <h2>Documents</h2>
          <button>OPEN</button>
        </div>

      </div>

    </div>
  )
}

export default home