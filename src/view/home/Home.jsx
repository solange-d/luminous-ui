import React from "react";
import { useContext, useEffect } from "react";
import { getAddressByUser } from "../../api/FetchAddress";
import useToken from "../app/useToken";
import { AddressContext } from "../../states/AddressContext";
import { CurrentAddressContext } from "../../states/CurrentAddressContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAddress from "../utils/useAddress";

import Header from "../utils/Header";
import DefaultItem from "./AddressItem";

export default function Home() {
  const { token, payload } = useToken();
  const { setHasAddress } = useContext(AddressContext);
  const navigate = useNavigate();
  const [addresses, setAddresses] = React.useState([]);
  const { setCurrentAddress } = useContext(CurrentAddressContext);

  useEffect(() => {
    async function requestEnergyBills() {
      const response = await getAddressByUser(token, payload);
      return response;
    }
    requestEnergyBills().then((data) => {
      setAddresses(data);
    });
  }, []);

  function handleClick() {}

  return (
    <div>
      <Header textContent={"Minhas Residências"} />
      <section className="default-item-container">
        {addresses && (
          <nav className="default-item-nav">
            <ul className="default-item-list">
              {addresses.map((address) => (
                <DefaultItem
                  id={address.id}
                  city={address.city}
                  houseNumber={address.houseNumber}
                  inputVoltage={address.inputVoltage}
                  neighborhood={address.neighborhood}
                  state={address.state}
                  street={address.street}
                  handleClick={() => {
                    setCurrentAddress(address);
                    navigate(`/energyBill/?address=${address.id}`);
                  }}
                  key={address.id}
                />
              ))}
            </ul>
          </nav>
        )}
      </section>
    </div>
  );
}
