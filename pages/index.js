import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import "../styles/Home.module.css";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Jebena from "./jebena-img.jpg";

export default function Home() {
  const cart = [
    {
      id: 1,
      title: "ጀበና ☕",
      price: 900,
    },
  ];
  const handleChapa = async () => {
    const referenceNumber = uuidv4();
    const header = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {
      amount: cart.reduce((total, item) => total + item.price, 0), //Amount should be integer
      currency: "ETB",
      email: "test@gmail.com",
      first_name: "Eyuel",
      last_name: "Haile",
      phone_number: "0917000000", //the phone number must not include +251
      tx_ref: referenceNumber,
      callback_url: "http://localhost:3000/success",
      return_url:
        "http://localhost:3000/varifyChapa?tnx_ref=" + referenceNumber,
      customization: {
        title: "Item Payment",
        description: "Paying for item in the cart",
      },
    };
    let response = await axios.post(
      `http://localhost:3000/api/chapa`,
      body,
      header
    );
    //console.log(response.data.resp.data.checkout_url);
    window.location.href = response.data.data.checkout_url;
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.grid}>
          <div className={styles.card}>
            <Image
              style={{ width: "200px" }}
              src={Jebena}
              alt="jebena image"
              className=" w-11 ml-7"
            />
            {cart.map((item) => (
              <div
                className={styles.title}
                style={{ justifyContent: "space-between" }}
              >
                <span
                  className=" text-lg font-semibold"
                  style={{ float: "left" }}
                >
                  {item.title}
                </span>
                <span style={{ float: "right" }}>{item.price} ETB</span>
              </div>
            ))}
            <button type="button" className={styles.btn} onClick={handleChapa}>
              Buy with
              <img
                src="/images/chapa.svg"
                alt="chapa image"
                style={{
                  width: "100px",
                  paddingLeft: "15px",
                  paddingTop: "5px",
                }}
              />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
