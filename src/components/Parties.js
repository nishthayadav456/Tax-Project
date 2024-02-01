import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import React, { useState, useEffect, useRef, useCallback } from "react";
// import OnClickOutside from 'react-onclickoutside';
import axios from "axios";

import Table from "./Table";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Parties = () => {
  const [isDivClicked, setDivClicked] = useState(false);
  const [showAddPartyModal, setshowAddPartyModal] = useState(false);
  const [showAddGroupModal, setshowAddGroupModal] = useState(false);
  const [viewInputs, setViewInputs] = useState("gst-&-address");
  const [shippingAddress, setShippingAddress] = useState(false);
  const [creditLimit, setCreditLimit] = useState(false);
  const [fields, setFields] = useState([{ name: "", value: "" }]);

  const [partydata, setPartyData] = useState([]);
  const [selectedPartyData, setSelectedPartyData] = useState([]);

  const [partyGroups, setPartyGroups] = useState([]);
  const [firmId, setFirmId] = useState("65b6812c2f4f0b676b773a86");

  const [data1, setData1] = useState({
    partyName: "",
    gstNo: "",
    phoneNumber: "",
    partyGroup: "",
    gstType: "",
    state: "",
    billingAddress: "",
    shippingAddress: "",
    openingBalance: "",
    email: "",
    asOfDate: "",
    additionalField: [{}],
  });

  const divRef = useRef(null);
  const searchRef = useRef(null);

  const changeHandle = (event) => {
    setData1({ ...data1, [event.target.name]: event.target.value });
  };

  // Sample data array
  const rowData = partydata?.map((e, index) => ({
    date: e.asOfDate,
    type: "openingBalance",
    total: e.openingBalance,
    Number: index + 1,
    balance: e.openingBalance,
  }));
  // Column definitions
  const columnDefs = [
    { headerName: "Type", field: "type" },
    { headerName: "Number", field: "Number" },
    { headerName: "Date", field: "date" },
    { headerName: "Total", field: "total" },
    { headerName: "Balance", field: "balance" },
  ];

  const handleClick = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      const requestData = {
        partyName: data1.partyName,
        gstNo: data1.gstNo,
        gstinNumber: data1.gstinNumber,
        phoneNumber: data1.phoneNumber,
        partyGroup: data1.partyGroup,
        gstType: data1.gstType,
        state: data1.state,
        billingAddress: data1.billingAddress,
        shippingAddress: data1.shippingAddress,
        openingBalance: data1.openingBalance,
        email: data1.email,
        asOfDate: data1.asOfDate,
        additionalField: data1.additionalField,
      };
      console.log("token", token);

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        "https://ca-backend-api.onrender.com/65b0d66ab97a739aba4e508f/party",
        requestData,
        { headers }
      );

      console.log("post", requestData, response.data);
      setData1(response.data.party);
      localStorage.setItem("token", response.data.result.token);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleClickOutside = (event) => {
    if (
      divRef.current.contains(event.target) ||
      searchRef.current.contains(event.target)
    ) {
      setDivClicked(true);
    } else {
      setDivClicked(false);
    }
    console.log();
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleViewInputButton = (selectedView) => {
    setViewInputs(selectedView);
  };

  const addField = () => {
    if (fields.length < 4) {
      setFields([...fields, { name: "", value: "" }]);
    }
  };
  const removeField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const handleFieldChange = (index, key, newValue) => {
    const newFields = [...fields];
    newFields[index][key] = newValue;
    setFields(newFields);
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const getDataResponse = await axios.get(
        "https://ca-backend-api.onrender.com/65b0d66ab97a739aba4e508f/party/getAll",
        { headers }
      );

      setPartyData(getDataResponse.data.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchPartyGroups = () => {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Fetch party groups
    axios
      .get(
        `https://ca-backend-api.onrender.com/${firmId}/party/allPartyGroup`,
        {
          headers,
        }
      )
      .then((res) => setPartyGroups(res.data.data))
      .catch((err) => console.log("error in get groups ", err));
  };

  useEffect(() => {
    fetchPartyGroups();
    fetchData();
  }, []);

  const handlePartyGroup = () => {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    axios
      .post(
        `https://ca-backend-api.onrender.com/${firmId}/insertPartyGroup`,
        { partyGroupName: data1.partyGroup },
        { headers }
      )
      .then((res) => {
        console.log("Response from server:", res);
      })
      .catch((error) => {
        console.log("error in Post");
        console.error(error.message);
      });
    console.log("partyGroups", partyGroups);
  };

  return (
    <>
      <div className="" style={{ height: "90vh" }}>
        <div className="w-full text-center border shadow-md m-b-1 h-12">
          <h2 className="text-xl">Name</h2>
        </div>
        <div className="flex h-full">
          <div className="w-1/4 border shadow-lg m-1 overflow-auto">
            <div className="flex items-center justify-around shadow m-2 p-2">
              <div className="p-2 rounded-full bg-red-300">
                <svg
                  class="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 19 18"
                >
                  <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                </svg>
              </div>
              <div>
                <h2 className="font-bold">Import Parties</h2>
                <p className="text-sm text-gray-500">
                  Use Contacts from phone or gmail
                </p>
              </div>
              <div>
                <svg
                  class="w-6 h-6 text-gray-800 text-black"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 8 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    stroke-linejoin="round"
                    strokeWidth="2"
                    d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
                  />
                </svg>
              </div>
            </div>

            <div className="flex items-center justify-between m-2 my-6">
              <div>
                <div
                  ref={divRef}
                  onClick={handleClickOutside}
                  style={{
                    display: isDivClicked ? "none" : "flex",
                  }}
                >
                  <div className="bg-gray-200 duration-200 hover:bg-gray-300 rounded-full p-3">
                    <svg
                      class=" h-4 text-gray-800 dark:text-black"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                </div>
                <div ref={searchRef}>
                  <p>
                    {isDivClicked && (
                      <div>
                        <input
                          type="text"
                          className="border-2 p-1"
                          placeholder="Search"
                        />
                      </div>
                    )}
                  </p>
                </div>
              </div>

              <div
                className="flex text-white"
                style={{ display: isDivClicked ? "none" : "flex" }}
              >
                <div
                  onClick={() => setshowAddPartyModal(!showAddPartyModal)}
                  className="bg-orange-400 flex justify-around items-center rounded-l-lg px-3 py-2 shadow hover:shadow-lg hover:bg-orange-300 duration-100"
                >
                  <h2 className="text-white px-1 font-bold">+</h2>
                  <h2>Add Party</h2>
                </div>

                <Menu
                  as="div"
                  className="relative inline-block text-left bg-orange-500 rounded-r-lg shadow hover:shadow-lg hover:bg-orange-300 duration-100"
                >
                  <div>
                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-gray-900">
                      <svg
                        class="w-4 h-4 text-gray-800 dark:text-white my-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 8"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
                        />
                      </svg>
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Import Parties
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>

            <div className="flex text-gray-500 border border-bottom">
              <div className="flex p-2 hover:bg-gray-300 justify-around w-3/6 items-center">
                <svg
                  class="w-3 h- text-gray-500 dark:text-black"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    strokeWidth="1"
                    d="M5 13V1m0 0L1 5m4-4 4 4"
                  />
                </svg>
                <h2>Party</h2>
                <svg
                  class="w-4 h-4 text-gray-800 dark:text-red-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m2.133 2.6 5.856 6.9L8 14l4 3 .011-7.5 5.856-6.9a1 1 0 0 0-.804-1.6H2.937a1 1 0 0 0-.804 1.6Z"
                  />
                </svg>
              </div>
              <div className="p-2 hover:bg-gray-300 w-full text-end">
                .Amount
              </div>
            </div>
            <div>
              <div>
                {partydata?.map((e) => (
                  <div
                    className="flex p-2 justify-between text-gray-500 hover:bg-gray-200 duration-150"
                    onClick={() => setSelectedPartyData(e)}
                  >
                    <div>{e.partyName}</div>
                    <div>{e.openingBalance}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-3/4 ">
            <div className="border shadow-lg m-1 p-2">
              <div>
                <div>{selectedPartyData?.partyName}</div>
              </div>
              <div className="text-sm">
                <div className="flex justify-between my-2">
                  <h2>
                    Phone: <span>{selectedPartyData?.phoneNumber}</span>
                  </h2>
                  <h2>
                    Address{" "}
                    <span className="text-blue-500">
                      {selectedPartyData?.billingAddress}
                    </span>
                  </h2>
                </div>
                <div className="flex justify-between my-2">
                  <h2>
                    Email:{" "}
                    <span className="text-blue-500">
                      {selectedPartyData?.email}
                    </span>
                  </h2>
                  <h2>
                    GSTIN{" "}
                    <span className="text-blue-500">
                      {selectedPartyData?.gstNo}
                    </span>
                  </h2>
                </div>
                <div className="flex justify-between my-2">
                  <h2>
                    No Credit card Limit Set:{" "}
                    <span className="text-blue-500">Set Creadit card</span>
                  </h2>
                </div>
              </div>
            </div>
            <div className="border shadow-lg m-1 p-2 ">
              <div>
                <Table columnDefs={columnDefs} rowData={rowData} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAddPartyModal ? (
        <>
          <div className="justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-blueGray-200 rounded-t">
                  <div className="flex">
                    <h3 className="text-xl font-semibold mx-2">Add Party</h3>
                  </div>
                  <button
                    className="p-1 ml-auto  border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setshowAddPartyModal(false)}
                  >
                    <span className=" text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

                <div className="relative p-6">
                  <div className="flex">
                    <div class="input_container mx-2 ">
                      <label class="input_label">Party Name</label>
                      <input
                        class="input_field w-full"
                        type="text"
                        name="partyName"
                        title="Inpit title"
                        placeholder="Party Name"
                        value={data1.partyName}
                        onChange={changeHandle}
                      />
                    </div>
                    <div class="input_container mx-2 ">
                      <label class="input_label">GSTIN</label>
                      <input
                        class="input_field w-full"
                        type="number"
                        name="gstNo"
                        title="Inpit title"
                        placeholder="GSTIN"
                        value={data1.gstNo}
                        onChange={changeHandle}
                      />
                    </div>

                    <div class="input_container mx-2 ">
                      <label class="input_label">Phone Number</label>
                      <input
                        class="input_field w-full"
                        type="number"
                        name="phoneNumber"
                        title="Inpit title"
                        placeholder="Phone Number"
                        value={data1.phoneNumber}
                        onChange={changeHandle}
                      />
                    </div>
                  </div>
                  <div className="py-3 flex justify-start items-center">
                    <div class="flex flex-col mx-2 ">
                      <label class="input_label">Party Group</label>
                      <select
                        className="input_field"
                        name="partyGroup"
                        id=""
                        value={data1.partyGroup}
                        onChange={changeHandle}
                      >
                        {partyGroups?.map((e) => (
                          <option value="{e.partyGroupName}">
                            {e.partyGroupName}
                          </option>
                        ))}
                        <option value="General">General</option>
                      </select>
                    </div>
                    <a
                      onClick={() => setshowAddGroupModal(!showAddGroupModal)}
                      className="border text-xs mt-3 text-white bg-blue-500 font-semibold whitespace-nowrap flex items-center px-2 py-1 rounded"
                    >
                      New Group
                    </a>
                  </div>
                </div>

                <div className="p-6">
                  <div className="border-b-2">
                    <button
                      className={`px-3 py-2 text-xl active:bg-gray-200 ${
                        viewInputs === "gst-&-address" &&
                        "border-b-2 border-blue-500 text-blue-500"
                      } `}
                      onClick={() => handleViewInputButton("gst-&-address")}
                    >
                      GST & Address
                    </button>
                    <button
                      className={`px-3 py-2 text-xl active:bg-gray-200 ${
                        viewInputs === "credit-&-balance" &&
                        "border-b-2 border-blue-500 text-blue-500"
                      } `}
                      onClick={() => handleViewInputButton("credit-&-balance")}
                    >
                      Credit & Balance
                    </button>
                    <button
                      className={`px-3 py-2 text-xl active:bg-gray-200 ${
                        viewInputs === "additional-fields" &&
                        "border-b-2 border-blue-500 text-blue-500"
                      } `}
                      onClick={() => handleViewInputButton("additional-fields")}
                    >
                      Additional Fields
                    </button>
                  </div>

                  {viewInputs === "gst-&-address" && (
                    <div>
                      <div className="p-6 flex">
                        <div class="input_container mx-2 ">
                          <label class="input_label">GST Type</label>
                          <select
                            class="input_field"
                            name="gstType"
                            value={data1.gstType}
                            onChange={changeHandle}
                          >
                            <option value="">Unregistered/Consumer</option>
                            <option value="">
                              Registered Business - Regular
                            </option>
                            <option value="">
                              Registered Business - Composition
                            </option>
                          </select>
                        </div>

                        <div class="input_container mx-2">
                          <label class="input_label">State</label>
                          <select
                            id="countries"
                            class="input_field"
                            name="state"
                            value={data1.state}
                            onChange={changeHandle}
                          >
                            <option value="">None</option>
                            <option value="Andhra Pradesh">
                              Andhra Pradesh
                            </option>
                            <option value="Arunachal Pradesh">
                              Arunachal Pradesh
                            </option>
                            <option value="Assam">Assam</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Goa">Goa</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Himachal Pradesh">
                              Himachal Pradesh
                            </option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Madhya Pradesh">
                              Madhya Pradesh
                            </option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Manipur">Manipur</option>
                            <option value="Meghalaya">Meghalaya</option>
                            <option value="Mizoram">Mizoram</option>
                            <option value="Nagaland">Nagaland</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Sikkim">Sikkim</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Tripura">Tripura</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Uttarakhand">Uttarakhand</option>
                            <option value="West Bengal">West Bengal</option>
                            <option value="Andaman and Nicobar Islands">
                              Andaman and Nicobar Islands
                            </option>
                            <option value="Chandigarh">Chandigarh</option>
                            <option value="Dadra and Nagar Haveli and Daman and Diu">
                              Dadra and Nagar Haveli and Daman and Diu
                            </option>
                            <option value="Lakshadweep">Lakshadweep</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Puducherry">Puducherry</option>
                          </select>
                        </div>

                        <div class="input_container mx-2 ">
                          <label class="input_label">Email</label>
                          <input
                            class="input_field w-full"
                            type="email"
                            name="email"
                            title="Input title"
                            placeholder="Email"
                            value={data1.email}
                            onChange={changeHandle}
                          />
                        </div>
                      </div>

                      <div className="p-6 flex ">
                        <div class="input_container mx-2 ">
                          <label class="input_label">Billing Address</label>
                          <textarea
                            className="input_field"
                            cols="30"
                            rows="10"
                            placeholder="Billing Address"
                            name="billingAddress"
                            value={data1.billingAddress}
                            onChange={changeHandle}
                          ></textarea>
                          {/* <input class="input_field w-full" type="email" name="input-name" title="Input title" placeholder="Email" /> */}
                        </div>

                        <div class="input_container mx-2 ">
                          {shippingAddress && (
                            <label class="input_label">Shipping Address</label>
                          )}
                          {shippingAddress && (
                            <textarea
                              className="input_field"
                              cols="30"
                              rows="10"
                              placeholder="Shipping Address"
                              name="shippingAddress"
                              value={data1.shippingAddress}
                              onChange={changeHandle}
                            ></textarea>
                          )}
                        </div>
                      </div>

                      <div className="px-6 ">
                        {shippingAddress ? (
                          <h2
                            className="text-gray-500  cursor-pointer"
                            onClick={() => setShippingAddress(!shippingAddress)}
                          >
                            - Disable Shipping Address
                          </h2>
                        ) : (
                          <h2
                            className="text-blue-500  cursor-pointer"
                            onClick={() => setShippingAddress(!shippingAddress)}
                          >
                            + Enable Shipping Address
                          </h2>
                        )}
                      </div>
                    </div>
                  )}

                  {viewInputs === "credit-&-balance" && (
                    <div>
                      <div className="p-6 flex">
                        <div class="input_container mx-2 ">
                          <label class="input_label">Opening Balance:</label>
                          <input
                            class="input_field w-full"
                            type="text"
                            name="openingBalance"
                            title="Input title"
                            placeholder="Opening Qty"
                            value={data1.openingBalance}
                            onChange={changeHandle}
                          />
                        </div>
                        <div class="input_container mx-2 ">
                          <label class="input_label">As Of Date :</label>
                          <input
                            class="input_field w-full"
                            type="date"
                            name="asOfDate"
                            title="Input title"
                            placeholder="As Of Date :"
                            value={data1.asOfDater}
                            onChange={changeHandle}
                          />
                        </div>
                      </div>

                      <div className="p-6">
                        <h2 className="py-2 text-xl">Credit Limit</h2>
                        <div className="flex">
                          <p
                            className={` font-semibold ${
                              creditLimit ? "text-gray-400" : "text-blue-500"
                            } `}
                          >
                            No Limit
                          </p>
                          <div className="mx-2">
                            <label class="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                value=""
                                class="sr-only peer"
                                checked={creditLimit}
                                onChange={() => setCreditLimit(!creditLimit)}
                              />
                              <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-blue-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          <p
                            className={` font-semibold ${
                              creditLimit ? "text-blue-500" : "text-gray-400"
                            } `}
                          >
                            Custom Limit
                          </p>
                        </div>
                        {creditLimit && (
                          // <div class="input_container mx-2 ">
                          <input
                            class="input_field w-full"
                            type="number"
                            name="input-name"
                            title="Input title"
                            placeholder="Custom Limit"
                          />
                          // </div>
                        )}
                      </div>
                    </div>
                  )}

                  {viewInputs === "additional-fields" && (
                    <div>
                      {fields.map((field, index) => (
                        <div
                          className="flex justify-center items-center"
                          key={index}
                        >
                          <div class="input_container mx-2 ">
                            <label class="input_label">Field Name</label>
                            <input
                              class="input_field w-full"
                              type="text"
                              name={`input-name-${index}`}
                              title={`Input title ${index}`}
                              placeholder="Field Name"
                              value={field.name || ""}
                              onChange={(e) => {
                                handleFieldChange(
                                  index,
                                  "name",
                                  e.target.value
                                );
                              }}
                            />
                          </div>
                          <div class="input_container mx-2 ">
                            <label class="input_label">Field Value</label>
                            <input
                              class="input_field w-full"
                              type="text"
                              name={`input-value-${index}`}
                              title={`Input title ${index}`}
                              placeholder="Field Value"
                              value={field.value || ""}
                              onChange={(e) => {
                                handleFieldChange(
                                  index,
                                  "value",
                                  e.target.value
                                );
                              }}
                            />
                          </div>
                          <button
                            className="text-white bg-red-600 px-2 py-1 rounded"
                            onClick={() => removeField(index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        className="text-white bg-green-600 px-2 py-1 rounded m-2"
                        onClick={addField}
                      >
                        Add Field
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setshowAddPartyModal(false);
                      handleClick();
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {showAddGroupModal ? (
        <>
          <div className="justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-blueGray-200 rounded-t">
                  <div className="flex">
                    <h3 className="text-xl font-semibold mx-2">Add Party</h3>
                  </div>
                  <button
                    className="p-1 ml-auto  border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setshowAddGroupModal(false)}
                  >
                    <span className=" text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

                <div class="input_container p-6">
                  <label class="input_label">Enter Party Group Name</label>
                  <input
                    class="input_field w-full"
                    type="text"
                    name="partyGroup"
                    title="Input title"
                    placeholder="Enter Party Group Name"
                    value={data1.partyGroup}
                    onChange={changeHandle}
                  />
                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      handlePartyGroup();
                      setshowAddGroupModal(false);
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Parties;
