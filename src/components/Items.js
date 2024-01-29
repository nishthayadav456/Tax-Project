import { Fragment } from "react";
import axios from "axios";
import { Menu, Transition } from "@headlessui/react";
import React, { useState, useEffect, useRef, useCallback } from "react";
// import OnClickOutside from 'react-onclickoutside';
import Table from "./Table";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
// Sample data array
const rowData = [
  {
    date: "2022-01-01",
    categoryName: "Category 1",
    type: "Income",
    total: 1000,
    Number: "001",
    balance: 0,
  },
  {
    date: "2022-01-02",
    categoryName: "Category 2",
    type: "Expense",
    total: 500,
    Number: "002",
    balance: 500,
  },
  // Add more sample data as needed
];

// Column definitions
const columnDefs = [
  { headerName: "Type", field: "type" },
  { headerName: "Number", field: "Number" },
  { headerName: "Date", field: "date" },
  { headerName: "Total", field: "total" },
  { headerName: "Balance", field: "balance" },
  { headerName: "Category Name", field: "categoryName" },
];

const Items = () => {
  const [additionalFields, setAdditionalFields] = useState(false);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(1);
  const [isDivClicked, setDivClicked] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [stock, setStock] = useState(false);
  const [viewInputs, setViewInputs] = useState("pricing");
  const [showAdjustItemModal, setshowAdjustItemModal] = useState(false);
  const [showAddItemModal, setshowAddItemModal] = useState(false);
  const [showEditUnitModal, setShowEditUnitModal] = useState(false);
  const [tracking, setTracking] = useState(null);
  const [addRawMaterial, setAddRawMaterial] = useState([
    { name: "", quantity: "", price: "", tax: "", amount: "" },
  ]);
  const [addAdditionalCost, setAddAdditionalCost] = useState([
    { name: "", quantity: "", price: "", tax: "", amount: "" },
  ]);
  const [additionalCostBtn, setAdditionalCostBtn] = useState(false);

  const divRef = useRef(null);
  const searchRef = useRef(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategoryOptions, setSelectedCategoryOptions] = useState([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [itemdata, setitemData] = useState([]);
  const [selectedPartyData, setSelectedPartyData] = useState([]);

  const [data1, setData1] = useState({
  category: "",
  itemName: "",
  itemHsn: "",
  description: "",
  itemCode: "",
  seleteUnit: [{ baseUnit: "", secondaryUnit: "" }],
  batchTracking: "",
  serialTracking: "",
  mrp: [{ mrp:"", disOnMrpForSale: "", disOnMrpForWholesale: "" }],
  salePrice: [{
    salePriceWithTax: "",
    salePriceWithoutTax:"" ,
    disOnSalePriceAmount: "",
    disOnSalePricePerceantage: "",
  }],
  wholessalePrice: [{
    wholesalePriceWithoutTax:"",
    wholesalePriceWithTax: "",
    minimumWholesaleQty: "",
  }],
  purchasePrice: [{ purchasePriceWithTax: "", purchasePriceWitouthTax: "" }],
  taxRate: "",
  stock: [{
    openingQuantity:"",
    atPrice:"",
    asOfDate: "",
    minStockToMaintain: "",
    location: "",
  }],

  });
  const changeHandle = (event) => {
    setData1({ ...data1, [event.target.name]: event.target.value });
  };

  const handleClick = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      const requestData = {
        category: data1.category,
        itemName: data1.itemName,
        itemHsn: data1.itemHsn,
        description: data1.description,
        itemCode: data1.itemCode,
        seleteUnit: {
          baseUnit: data1.seleteUnit[0].baseUnit,
          secondaryUnit: data1.seleteUnit[0].secondaryUnit,
        },
        batchTracking: data1.batchTracking,
        serialTracking: data1.serialTracking,
        mrp: {
          mrp: data1.mrp[0].mrp,
          disOnMrpForSale: data1.mrp[0].disOnMrpForSale,
          disOnMrpForWholesale: data1.mrp[0].disOnMrpForWholesale,
        },
        salePrice: {
          salePriceWithTax: data1.salePrice[0].salePriceWithTax,
          salePriceWithoutTax: data1.salePrice[0].salePriceWithoutTax,
          disOnSalePriceAmount: data1.salePrice[0].disOnSalePriceAmount,
          disOnSalePricePerceantage: data1.salePrice[0].disOnSalePricePerceantage,
        },
        wholessalePrice: {
          wholesalePriceWithoutTax: data1.wholessalePrice[0].wholesalePriceWithoutTax,
          wholesalePriceWithTax: data1. wholessalePrice[0].wholesalePriceWithTax,
          minimumWholesaleQty: data1. wholessalePrice[0].minimumWholesaleQty,
        },
        purchasePrice: {
          purchasePriceWithTax: data1.purchasePrice[0].purchasePriceWithTax,
          purchasePriceWitouthTax: data1.purchasePrice[0].purchasePriceWitouthTax,
        },
        taxRate: data1.taxRate,
        stock: {
          openingQuantity: data1.stock[0].openingQuantity,
          atPrice: data1.stock[0].atPrice,
          asOfDate: data1.stock[0].asOfDate,
          minStockToMaintain: data1.stock[0].minStockToMaintain,
          location: data1.stock[0].location,
        },
      };
      
      console.log(requestData);

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        "https://ca-backend-api.onrender.com/65b6812c2f4f0b676b773a86/insertItem",
        requestData,
        { headers }
      );

      console.log("post", requestData, response.data);
      setData1(response.data.result);
      localStorage.setItem("token", response.data.result.token);
    } catch (error) {
      console.error(error.message);
    }
  };

  //for search bar and logo

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

  //for model

  const handleAdjustModelButtonClick = () => {
    setshowAdjustItemModal(!showAdjustItemModal);
  };

  const handleStockCheckBox = () => {
    setStock(!stock);
  };

  const handleViewInputButton = (selectedView) => {
    setViewInputs(selectedView);
  };
  const addRawMaterialFunc = () => {
    setAddRawMaterial([
      ...addRawMaterial,
      { name: "", quantity: "", price: "", tax: "", amount: "" },
    ]);
  };
  const removeRawMaterial = (index) => {
    const newItems = [...addRawMaterial];
    newItems.splice(index, 1);
    setAddRawMaterial(newItems);
  };

  const handleRawMaterialChange = (index, key, newValue) => {
    const newItems = [...addRawMaterial];
    newItems[index][key] = newValue;
    setAddRawMaterial(newItems);
  };

  const addAditionalCostFunc = () => {
    setAddAdditionalCost([
      ...addAdditionalCost,
      { name: "", quantity: "", price: "", tax: "", amount: "" },
    ]);
  };
  const removeAdditionalCost = (index) => {
    const newItems = [...addAdditionalCost];
    newItems.splice(index, 1);
    setAddAdditionalCost(newItems);
  };

  const handleAdditionalCostChange = (index, key, newValue) => {
    const newItems = [...addAdditionalCost];
    newItems[index][key] = newValue;
    setAddAdditionalCost(newItems);
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
        "https://ca-backend-api.onrender.com/65b76ea37c61605c538a82c5/item/allItem",
        { headers }
      );

      setitemData(getDataResponse.data.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("itemdata", itemdata);
  }, [itemdata, setitemData]);

  const categoryOptions = [
    { id: 1, label: "Option 1" },
    { id: 2, label: "Option 2" },
    { id: 3, label: "Option 3" },
    { id: 4, label: "Option 4" },
    // Add more options as needed
  ];

  const toggleCategoryDropdown = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const handleCategoryCheckboxChange = (option) => {
    const isSelected = selectedCategoryOptions.includes(option.id);
    console.log("vaibhav");
    // console.log(option.id, isSelected)
    if (isSelected) {
      setSelectedCategoryOptions(
        selectedCategoryOptions.filter((id) => id !== option.id)
      );
    } else {
      setSelectedCategoryOptions([...selectedCategoryOptions, option.id]);
    }
  };
  return (
    <>
      <div className="" style={{ height: "90vh" }}>
        <div className="w-full text-center border shadow-md m-b-1 h-12">
          <h2 className="text-xl">Name</h2>
        </div>
        <div className="flex h-full">
          <div className="w-1/4 border shadow-lg m-1">
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
                  onClick={() => setshowAddItemModal(!showAddItemModal)}
                  className="bg-orange-400 flex justify-around items-center rounded-l-lg px-3 py-2 shadow hover:shadow-lg hover:bg-orange-300 duration-100"
                >
                  <h2 className="text-white px-1 font-bold">+</h2>
                  <h2>Add Item</h2>
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
                {itemdata?.map((e) => (
                  <div
                    className="flex p-2 justify-between text-gray-500 hover:bg-gray-200 duration-150"
                    onClick={() => setSelectedPartyData(e)}
                  >
                    <div>{e.itemName}</div>
                    <div>{e.mrp}</div>
                  </div>
                ))}
              </div>
              </div>


          </div>

          <div className="w-3/4 ">
            <div className="border shadow-lg m-1 p-2">
              <div className="flex justify-between my-2">
                <div>{selectedPartyData?.itemName}</div>
                <div
                  className="flex items-center rounded-lg bg-blue-500 text-white font-bold text-sm px-2 py-1 cursor-pointer duration-150 hover:bg-blue-600"
                  onClick={handleAdjustModelButtonClick}
                >
                  <div className="rounded-full p-1 ">
                    <svg
                      class="w-4 h-4 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
                      />
                    </svg>
                  </div>
                  <h2>ADJUST ITEM</h2>
                </div>
              </div>
              <div className="text-xs">
                <div className="flex justify-between my-2">
                  <h2>
                    SALE PRICE:{" "}
                    <span className="text-green-500">
                      {selectedPartyData?.salePrice}{" "}
                    </span>
                    (excl)
                  </h2>
                  <h2>
                    STOCK QUANTITY{" "}
                    <span className="text-blue-500">
                      {itemdata?.selectedPartyData}
                    </span>
                  </h2>
                </div>
                <div className="flex justify-between my-2">
                  <h2>
                    PURCHASE PRICE:{" "}
                    <span className="text-green-500">
                      {" "}
                      {itemdata?.selectedPartyData}{" "}
                    </span>
                    (excl)
                  </h2>
                  <h2>
                    STOCK VALUE:{" "}
                    <span className="text-green-500">
                      {" "}
                      {itemdata?.atPrice}{" "}
                    </span>
                    (excl)
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

      {showAdjustItemModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-blueGray-200 rounded-t">
                  <div className="flex">
                    <h3 className="text-xl font-semibold mx-2">
                      Stock Adjustment
                    </h3>
                    <div className="flex mx-2 ">
                      <p
                        className={` font-semibold ${
                          stock ? "text-gray-400" : "text-blue-500"
                        } `}
                      >
                        Add Stock
                      </p>
                      <div className="mx-2">
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                            checked={stock}
                            onChange={handleStockCheckBox}
                          />
                          <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-blue-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <p
                        className={` font-semibold ${
                          stock ? "text-blue-500" : "text-gray-400"
                        } `}
                      >
                        Reduce Stock
                      </p>
                    </div>
                  </div>
                  <button
                    className="p-1 ml-auto  border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setshowAdjustItemModal(false)}
                  >
                    <span className=" text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="m-6 text-sm border-b py-2">
                  <p>Item Name</p>
                  <div className="flex justify-between items-center  ">
                    <p className="font-bold">Item1</p>
                    <input
                      className="input_field"
                      type="date"
                      name="input-name"
                      title="Inpit title"
                      placeholder="Adjustment Date"
                    />
                  </div>
                </div>
                <div className="relative p-6 flex">
                  <div class="input_container mx-2 ">
                    <label class="input_label">Total Qty</label>
                    <input
                      class="input_field w-full"
                      type="text"
                      name="input-name"
                      title="Inpit title"
                    />
                  </div>
                  <div class="input_container mx-2 ">
                    <label class="input_label">At Price</label>
                    <input
                      class="input_field w-full"
                      type="number"
                      name="input-name"
                      title="Inpit title"
                      placeholder=""
                    />
                  </div>

                  <div class="input_container mx-2 ">
                    <label class="input_label">Details</label>
                    <input
                      class="input_field w-full"
                      style={{ width: "30rem" }}
                      type="number"
                      name="input-name"
                      title="Inpit title"
                      placeholder=""
                    />
                  </div>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      handleClick();
                      setshowAdjustItemModal(false);
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

      {showAddItemModal ? (
        <>
          <div className="justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-blueGray-200 rounded-t">
                  <div className="flex">
                    <h3 className="text-xl font-semibold mx-2">Add Item</h3>
                    <div className="flex mx-2 ">
                      <p
                        className={` font-semibold ${
                          toggle ? "text-gray-400" : "text-blue-500"
                        } `}
                      >
                        Product
                      </p>
                      <div className="mx-2">
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            value=""
                            class="sr-only peer"
                            checked={toggle}
                            onChange={() => setToggle(!toggle)}
                          />
                          <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-blue-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <p
                        className={` font-semibold ${
                          toggle ? "text-blue-500" : "text-gray-400"
                        } `}
                      >
                        Service
                      </p>
                    </div>
                  </div>
                  <button
                    className="p-1 ml-auto  border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setshowAddItemModal(false)}
                  >
                    <span className=" text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

                {!toggle ? (
                  <div>
                    <div className="relative p-6">
                      <div className="flex">
                        <div class="input_container mx-2 ">
                          <label class="input_label">Item Name :</label>
                          <input
                            class="input_field"
                            type="text"
                            name="itemName"
                            title="Input title"
                            placeholder=""
                            value={data1.itemName}
                            onChange={changeHandle}
                          />
                        </div>
                        <div class="input_container mx-2 ">
                          <label class="input_label">Category :</label>
                          {/* <input class="input_field" type="text" name="input-name" title="Input title" /> */}
                          <div className="relative inline-block text-left">
                            <div>
                              <span className="">
                                <button
                                  type="button"
                                  className="input_field text-left"
                                  id="options-menu"
                                  aria-haspopup="true"
                                  aria-expanded="true"
                                  onClick={toggleCategoryDropdown}
                                >
                                  Category
                                </button>
                              </span>
                            </div>

                            {isCategoryOpen && (
                              <div className="z-50  absolute  mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                <button
                                  className="text-blue-500 w-full"
                                  onClick={() =>
                                    setShowAddCategory(!showAddCategory)
                                  }
                                >
                                  + Add New Category
                                </button>
                                <div
                                  className="p-1"
                                  role="menu"
                                  aria-orientation="vertical"
                                  aria-labelledby="options-menu"
                                >
                                  {categoryOptions.map((option) => (
                                    <label
                                      key={option.id}
                                      className="flex items-center py-2 px-4 cursor-pointer"
                                    >
                                      <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-indigo-600"
                                        checked={selectedCategoryOptions.includes(
                                          option.id
                                        )}
                                        onChange={() =>
                                          handleCategoryCheckboxChange(option)
                                        }
                                      />
                                      <span className="ml-2  text-gray-700">
                                        {option.label}
                                      </span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div class="input_container mx-2 ">
                          <label class="input_label">ItemHsn :</label>
                          <input
                            class="input_field"
                            type="number"
                            name="itemHsn"
                            title="Input title"
                            placeholder=""
                            value={data1.itemHsn}
                            onChange={changeHandle}
                          />
                        </div>
                        <div class="input_container mx-2 ">
                          <label class="input_label">Item Code</label>
                          <div className="flex">
                            <input
                              class="input_field"
                              type="text"
                              name="itemCode"
                              title="Input title"
                              placeholder=""
                              value={data1.itemCode}
                              onChange={changeHandle}
                            />
                            <a
                              href=""
                              className="border text-xs text-white bg-blue-500 font-semibold whitespace-nowrap flex items-center px-2 rounded-xl"
                            >
                              Assign Code
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        <div class="input_container mx-2">
                          <label class="input_label">Descriptions</label>
                          <textarea
                            className="input_field"
                            id=""
                            cols="30"
                            rows="10"
                            name="description"
                            value={data1.description}
                            onChange={changeHandle}
                          ></textarea>
                        </div>
                        {/* <div class="input_container mx-2">
                          <label class="input_label">Add Image</label>
                          <input
                            class="input_field"
                            type="file"
                            name="input-name"
                            title="Input title"
                            placeholder=""
                          />
                        </div> */}
                      </div>
                    </div>

                    <div className="relative p-6 flex">
                      <button
                        className="bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowEditUnitModal(!showEditUnitModal)}
                      >
                        Edit Unit
                      </button>
                    </div>

                    <div className="flex items-center mb-4 p-6">
                      <input
                        type="radio"
                        id="option1"
                        name="batchTracking"
                        value="batchTracking"
                        checked={tracking === "batchTracking"}
                        onChange={(e) => {
                          changeHandle(e);
                          setTracking(e.target.value);
                        }}
                        className="mr-2 h-4 w-4"
                      />
                      <label htmlFor="option1" className="mr-4">
                        Batch Tracking
                      </label>

                      <input
                        type="radio"
                        id="option2"
                        name="serialTracking"
                        value="serialTracking"
                        checked={tracking === "serialTracking"}
                        onChange={(e) => {
                          changeHandle(e);
                          setTracking(e.target.value);
                        }}
                        className="mr-2 h-4 w-4"
                      />
                      <label htmlFor="option2">Serial No. Tracking</label>
                      <button
                        onClick={() => setTracking(null)}
                        className="text-blue-500 font-bold py-2 px-4 rounded"
                      >
                        Clear Tracking
                      </button>
                    </div>

                    <div className="p-6">
                      <div className="border-b-2">
                        <button
                          className={`px-3 py-2 text-xl active:bg-gray-200 ${
                            viewInputs === "pricing" &&
                            "border-b-2 border-blue-500 text-blue-500"
                          } `}
                          onClick={() => handleViewInputButton("pricing")}
                        >
                          Pricing
                        </button>
                        <button
                          className={`px-3 py-2 text-xl active:bg-gray-200 ${
                            viewInputs === "stock" &&
                            "border-b-2 border-blue-500 text-blue-500"
                          } `}
                          onClick={() => handleViewInputButton("stock")}
                        >
                          Stock
                        </button>
                        <button
                          className={`px-3 py-2 text-xl active:bg-gray-200 ${
                            viewInputs === "manufacturing" &&
                            "border-b-2 border-blue-500 text-blue-500"
                          } `}
                          onClick={() => handleViewInputButton("manufacturing")}
                        >
                          Manufacturing
                        </button>
                      </div>

                      {viewInputs === "pricing" && (
                        <div>
                          <div className="border my-8 bg-gray-100 p-6">
                            <h2 className=" text-lg font-semibold">MRP</h2>
                            <div className="flex">
                              <div className="p-2 input_container">
                                <input
                                  type="text"
                                  placeholder="MRP"
                                  className="border-2 rounded-l hover:border-black focus:border-blue-500 px-2 py-1 outline-none"
                                  name="mrp"
                                  value={data1.mrp}
                                  onChange={changeHandle}
                                />
                              </div>
                              <div className="p-2 input_container">
                                <input
                                  type="text"
                                  placeholder="Disc. On MRP For Sale(%)"
                                  className="border-2 rounded-l hover:border-black focus:border-blue-500 px-2 py-1 outline-none"
                                  name="disOnMrpForSale"
                                  value={data1.disOnMrpForSale}
                                  onChange={changeHandle}
                                />
                              </div>
                              <div className="p-2 input_container">
                                <input
                                  type="text"
                                  placeholder="Disc. On MRP For Wholesale(%)"
                                  className="border-2 rounded-l hover:border-black focus:border-blue-500 px-2 py-1 outline-none"
                                  name="disOnMrpForWholesale"
                                  value={data1.disOnMrpForWholesale}
                                  onChange={changeHandle}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="border my-8 bg-gray-100">
                            <div className="p-6">
                              <h2 className=" text-lg font-semibold">
                                Sale Price
                              </h2>
                              <div className="flex">
                                <div className="p-2">
                                  <input
                                    type="text"
                                    placeholder="Sale Price"
                                    className="border-2 rounded-l hover:border-black focus:border-blue-500 px-2 py-1 outline-none"
                                    name="salePrice"
                                    value={data1.salePrice}
                                    onChange={changeHandle}
                                  />
                                  <select
                                    id=""
                                    className="border-2 rounded-r hover:border-black focus:border-blue-500 px-2 py-1"
                                    name="disOnMrpForWholesale"
                                    value={data1.disOnMrpForWholesale}
                                    onChange={changeHandle}
                                  >
                                    <option value="With Tax">With Tax</option>
                                    <option value="Without Tax">
                                      Without Tax
                                    </option>
                                  </select>
                                </div>
                                <div className="p-2">
                                  <input
                                    type="text"
                                    placeholder="Disc. on Sales Price"
                                    className="border-2 rounded-l hover:border-black focus:border-blue-500 px-2 py-1 outline-none"
                                    name="disOnSalePriceAmount"
                                    value={data1.disOnSalePriceAmount}
                                    onChange={changeHandle}
                                  />
                                  <select
                                    id=""
                                    className="border-2 rounded-r hover:border-black focus:border-blue-500 px-2 py-1"
                                    name="disOnSalePricePerceantage"
                                    value={data1.disOnSalePricePerceantage}
                                    onChange={changeHandle}
                                  >
                                    <option value="Percentage">
                                      Percentage
                                    </option>
                                    <option value="Amount">Amount</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="p-6">
                              <h2 className="py-6 text-lg font-semibold">
                                Wholesale Price
                              </h2>
                              <div className="flex">
                                <div className="p-2">
                                  <input
                                    type="text"
                                    placeholder="Wholesale Price"
                                    name="wholesalePrice"
                                    className="border-2 rounded-l hover:border-black focus:border-blue-500 px-2 py-1 outline-none"
                                    value={data1.wholesalePrice}
                                    onChange={changeHandle}
                                  />
                                  <select
                                    name=""
                                    id=""
                                    className="border-2 rounded-r hover:border-black focus:border-blue-500 px-2 py-1"
                                  >
                                    <option value="With Tax">With Tax</option>
                                    <option value="Without Tax">
                                      Without Tax
                                    </option>
                                  </select>
                                </div>
                                <div className="p-2">
                                  <input
                                    type="text"
                                    placeholder="Minimum Wholesale Qty"
                                    className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none"
                                    name="minimumWholesaleQty"
                                    value={data1.minimumWholesaleQty}
                                    onChange={changeHandle}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-8 w-full">
                            <div className="border my-8 bg-gray-100 w-6/12">
                              <div className="p-6">
                                <h2 className=" text-lg font-semibold">
                                  Purchase Price
                                </h2>
                                <div className="flex">
                                  <div className="p-2">
                                    <input
                                      type="text"
                                      placeholder="Purchase Price"
                                      className="border-2 rounded-l hover:border-black focus:border-blue-500 px-2 py-1 outline-none"
                                      name="purchasePrice"
                                      value={data1.purchasePrice}
                                      onChange={changeHandle}
                                    />
                                    <select
                                      name=""
                                      id=""
                                      className="border-2 rounded-r hover:border-black focus:border-blue-500 px-2 py-1"
                                    >
                                      <option value="With Tax">With Tax</option>
                                      <option value="Without Tax">
                                        Without Tax
                                      </option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="border my-8 bg-gray-100 w-6/12">
                              <div className="p-6">
                                <h2 className=" text-lg font-semibold">
                                  Taxes
                                </h2>
                                <div className="flex">
                                  <div className="p-2 flex flex-col input_container">
                                    {/* <label className='input_label'>Tax rate</label> */}
                                    <select
                                      id="taxRate"
                                      className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1"
                                      name="taxRate"
                                      value={data1.taxRate}
                                      onChange={changeHandle}
                                    >
                                      <option value="">None</option>
                                      <option value="0">GST@0</option>
                                      <option value="0">IGST@0</option>
                                      <option value="0.25">IGST@0.25%</option>
                                      <option value="0.25">GST@0.25%</option>
                                      <option value="3">IGST@3%</option>
                                      <option value="3">GST@3%</option>
                                      <option value="5">IGST@5%</option>
                                      <option value="5">GST@5%</option>
                                      <option value="12">IGST@12%</option>
                                      <option value="12">GST@12%</option>
                                      <option value="18">IGST@18%</option>
                                      <option value="18">GST@18%</option>
                                      <option value="28">IGST@28%</option>
                                      <option value="28">GST@28%</option>
                                      <option value="exmpt">exmpt</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {viewInputs === "stock" && (
                        <div>
                          <div className="p-6 flex">
                            <div class="input_container mx-2 ">
                              <label class="input_label">Opening Qty:</label>
                              <input
                                class="input_field w-full"
                                type="text"
                                name="openingQuantity"
                                title="Input title"
                                placeholder="Opening Qty"
                                value={data1.openingQuantity}
                                onChange={changeHandle}
                              />
                            </div>
                            <div class="input_container mx-2 ">
                              <label class="input_label">At Price :</label>
                              <input
                                class="input_field w-full"
                                type="number"
                                name="atPrice"
                                title="Input title"
                                placeholder="At Price"
                                value={data1.atPrice}
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
                                value={data1.asOfDate}
                                onChange={changeHandle}
                              />
                            </div>
                          </div>
                          <div className="p-6 flex">
                            <div class="input_container mx-2 ">
                              <label class="input_label">
                                Min.StockMaintain:
                              </label>
                              <input
                                class="input_field w-full"
                                type="text"
                                name="minStockToMaintain"
                                title="Input title"
                                placeholder="Min.StockMaintain"
                                value={data1.minStockToMaintain}
                                onChange={changeHandle}
                              />
                            </div>
                            <div class="input_container mx-2 ">
                              <label class="input_label">Location :</label>
                              <input
                                class="input_field w-full"
                                type="text"
                                name="location"
                                title="Input title"
                                placeholder="Location"
                                value={data1.location}
                                onChange={changeHandle}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {viewInputs === "manufacturing" && (
                        <div>
                          <div className="my-3">
                            <table className="min-w-full bg-white border border-gray-300">
                              <thead className="border">
                                <tr>
                                  <th className=" p-2 border">
                                    <div className="flex justify-between items-center text-xs">
                                      <h2>Raw Material</h2>
                                    </div>
                                  </th>
                                  <th className=" p-2 border">
                                    <div className="flex justify-between items-center text-xs">
                                      <h2>Quantity</h2>
                                    </div>
                                  </th>
                                  <th className=" p-2 border">
                                    <div className="flex justify-between items-center text-xs">
                                      <h2>Price/unit</h2>
                                    </div>
                                  </th>
                                  <th className=" p-2 border">
                                    <div className="flex justify-between items-center text-xs">
                                      <h2>Estimated Cost</h2>
                                    </div>
                                  </th>
                                  <th className=" p-2 border">
                                    <div className="flex justify-between items-center text-xs">
                                      <h2>Action</h2>
                                    </div>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {addRawMaterial.map((item, index) => (
                                  <tr className="">
                                    <td>
                                      <input
                                        className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none "
                                        style={{ width: "100%" }}
                                        type="text"
                                        name="input-name"
                                        title="Input title"
                                        placeholder="Item Name"
                                        value={item.name}
                                        onChange={(e) =>
                                          handleRawMaterialChange(
                                            index,
                                            "name",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </td>

                                    <td>
                                      <input
                                        className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none "
                                        style={{ width: "100%" }}
                                        type="text"
                                        name="input-name"
                                        title="Input title"
                                        placeholder="Quantity"
                                        value={item.quantity}
                                        onChange={(e) =>
                                          handleRawMaterialChange(
                                            index,
                                            "quantity",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </td>
                                    <td>
                                      <input
                                        className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none "
                                        style={{ width: "100%" }}
                                        type="text"
                                        name="input-name"
                                        title="Input title"
                                        placeholder="Price"
                                        value={item.price}
                                        onChange={(e) =>
                                          handleRawMaterialChange(
                                            index,
                                            "price",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </td>
                                    <td>
                                      <input
                                        className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none "
                                        style={{ width: "100%" }}
                                        type="text"
                                        name="input-name"
                                        title="Input title"
                                        placeholder="Estimated Cost"
                                        value={item.estimatedCost}
                                        onChange={(e) =>
                                          handleRawMaterialChange(
                                            index,
                                            "estimatedCost",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </td>
                                    <td>
                                      <button
                                        className="text-white bg-gray-600 p-2 m-2 rounded"
                                        onClick={() => removeRawMaterial(index)}
                                      >
                                        <svg
                                          class="w-4 h-4 font-semibold text-gray-800 dark:text-white"
                                          aria-hidden="true"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                                          />
                                        </svg>
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <div className="flex justify-between items-center">
                              <button
                                className="text-blue-500 px-2 py-1 rounded m-2"
                                onClick={addRawMaterialFunc}
                              >
                                + Add Row
                              </button>
                              <input
                                className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none "
                                type="text"
                                name="input-name"
                                title="Input title"
                                placeholder="Total"
                              />
                            </div>
                          </div>

                          <button
                            className="bg-blue-500 text-white px-2 py-1 rounded "
                            onClick={() =>
                              setAdditionalCostBtn(!additionalCostBtn)
                            }
                          >
                            Additional Costs
                          </button>

                          {additionalCostBtn && (
                            <div className="my-3">
                              <table className="min-w-full bg-white border border-gray-300">
                                <thead className="border">
                                  <tr>
                                    <th className=" p-2 border">
                                      <div className="flex justify-between items-center text-xs">
                                        <h2>Charges</h2>
                                      </div>
                                    </th>
                                    <th className=" p-2 border">
                                      <div className="flex justify-between items-center text-xs">
                                        <h2>Estimated Cost</h2>
                                      </div>
                                    </th>
                                    <th className=" p-2 border">
                                      <div className="flex justify-between items-center text-xs">
                                        <h2>Acton</h2>
                                      </div>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {addAdditionalCost.map((item, index) => (
                                    <tr className="">
                                      <td>
                                        <select
                                          className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none "
                                          style={{ width: "100%" }}
                                          value={item.tax}
                                          onChange={(e) =>
                                            handleAdditionalCostChange(
                                              index,
                                              "tax",
                                              e.target.value
                                            )
                                          }
                                        >
                                          <option value="">None</option>
                                          <option value="Labour Cost">
                                            Labour Cost
                                          </option>
                                          <option value="Electricity Cost">
                                            Electricity Cost
                                          </option>
                                          <option value="Packaging Cost">
                                            Packaging Cost
                                          </option>
                                          <option value="Logistics Cost">
                                            Logistics Cost
                                          </option>
                                          <option value="Other Charges">
                                            Other Charges
                                          </option>
                                        </select>
                                      </td>
                                      <td>
                                        <input
                                          className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none "
                                          style={{ width: "100%" }}
                                          type="text"
                                          name="input-name"
                                          title="Input title"
                                          placeholder="Item Name"
                                          value={item.name}
                                          onChange={(e) =>
                                            handleAdditionalCostChange(
                                              index,
                                              "name",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </td>
                                      <td>
                                        <button
                                          className="text-white bg-gray-600 p-2 m-2 rounded"
                                          onClick={() =>
                                            removeAdditionalCost(index)
                                          }
                                        >
                                          <svg
                                            class="w-4 h-4 font-semibold text-gray-800 dark:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              stroke="currentColor"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              stroke-width="2"
                                              d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                                            />
                                          </svg>
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              <div className="flex justify-between items-center">
                                <button
                                  className="text-blue-500 px-2 py-1 rounded m-2"
                                  onClick={addAditionalCostFunc}
                                >
                                  + Add Row
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="relative p-6">
                      <div className="flex">
                        <div class="input_container mx-2 ">
                          <label class="input_label">Service Name :</label>
                          <input
                            class="input_field"
                            type="number"
                            name="input-name"
                            title="Input title"
                            placeholder=""
                          />
                        </div>
                        <div class="input_container mx-2 ">
                          <label class="input_label">Category :</label>
                          <input
                            class="input_field"
                            type="text"
                            name="input-name"
                            title="Input title"
                          />
                        </div>

                        <div class="input_container mx-2 ">
                          <label class="input_label">Service Hsn :</label>
                          <input
                            class="input_field"
                            type="number"
                            name="input-name"
                            title="Input title"
                            placeholder=""
                          />
                        </div>
                        <div class="input_container mx-2 ">
                          <label class="input_label">Service Code</label>
                          <div className="flex">
                            <input
                              class="input_field"
                              type="number"
                              name="input-name"
                              title="Input title"
                              placeholder=""
                            />
                            <a
                              href=""
                              className="border text-xs text-white bg-blue-500 font-semibold whitespace-nowrap flex items-center px-2 rounded-xl"
                            >
                              Assign Code
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        <div class="input_container mx-2">
                          <label class="input_label">Descriptions</label>
                          <textarea
                            className="input_field"
                            id=""
                            cols="30"
                            rows="10"
                          ></textarea>
                        </div>
                        <div class="input_container mx-2">
                          <label class="input_label">Add Image</label>
                          <input
                            class="input_field"
                            type="file"
                            name="input-name"
                            title="Input title"
                            placeholder=""
                          />
                        </div>
                      </div>
                    </div>

                    <div className="relative p-6 flex">
                      <button
                        className="bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          handleClick();
                          setShowEditUnitModal(!showEditUnitModal);
                        }}
                      >
                        Edit Unit
                      </button>
                    </div>

                    <div className="p-6">
                      <div className="border-b-2">
                        <button
                          className={`px-3 py-2 text-xl active:bg-gray-200 ${
                            viewInputs === "pricing" &&
                            "border-b-2 border-blue-500 text-blue-500"
                          } `}
                          onClick={() => handleViewInputButton("pricing")}
                        >
                          Pricing
                        </button>
                      </div>

                      {viewInputs === "pricing" && (
                        <div>
                          <div className="border my-8 bg-gray-100 p-6">
                            <h2 className=" text-lg font-semibold">MRP</h2>
                            <div className="flex">
                              <div className="p-2 input_container">
                                <input
                                  type="text"
                                  placeholder="MRP"
                                  className="border-2 rounded-l hover:border-black focus:border-blue-500 px-2 py-1 outline-none"
                                />
                              </div>
                              <div className="p-2 input_container">
                                <input
                                  type="text"
                                  placeholder="Disc. On MRP For Sale(%)"
                                  className="border-2 rounded-l hover:border-black focus:border-blue-500 px-2 py-1 outline-none"
                                />
                              </div>
                              <div className="p-2 input_container">
                                <input
                                  type="text"
                                  placeholder="Disc. On MRP For Wholesale(%)"
                                  className="border-2 rounded-l hover:border-black focus:border-blue-500 px-2 py-1 outline-none"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="border my-8 bg-gray-100">
                            <div className="p-6">
                              <h2 className=" text-lg font-semibold">
                                Sale Price
                              </h2>
                              <div className="flex">
                                <div className="p-2">
                                  <input
                                    type="text"
                                    placeholder="Sale Price"
                                    className="border-2 rounded-l hover:border-black focus:border-blue-500 px-2 py-1 outline-none"
                                  />
                                  <select
                                    name=""
                                    id=""
                                    className="border-2 rounded-r hover:border-black focus:border-blue-500 px-2 py-1"
                                  >
                                    <option value="With Tax">With Tax</option>
                                    <option value="Without Tax">
                                      Without Tax
                                    </option>
                                  </select>
                                </div>
                                <div className="p-2">
                                  <input
                                    type="text"
                                    placeholder="Disc. on Sales Price"
                                    className="border-2 rounded-l hover:border-black focus:border-blue-500 px-2 py-1 outline-none"
                                  />
                                  <select
                                    name=""
                                    id=""
                                    className="border-2 rounded-r hover:border-black focus:border-blue-500 px-2 py-1"
                                  >
                                    <option value="Percentage">
                                      Percentage
                                    </option>
                                    <option value="Amount">Amount</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="p-6">
                              <h2 className="py-6 text-lg font-semibold">
                                Wholesale Price
                              </h2>
                              <div className="flex">
                                <div className="p-2">
                                  <input
                                    type="text"
                                    placeholder="Wholesale Price"
                                    className="border-2 rounded-l hover:border-black focus:border-blue-500 px-2 py-1 outline-none"
                                  />
                                  <select
                                    name=""
                                    id=""
                                    className="border-2 rounded-r hover:border-black focus:border-blue-500 px-2 py-1"
                                  >
                                    <option value="With Tax">With Tax</option>
                                    <option value="Without Tax">
                                      Without Tax
                                    </option>
                                  </select>
                                </div>
                                <div className="p-2">
                                  <input
                                    type="text"
                                    placeholder="Minimum Wholesale Qty"
                                    className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="border my-8 bg-gray-100">
                            <div className="p-6">
                              <h2 className=" text-lg font-semibold">Taxes</h2>
                              <div className="flex">
                                <div className="p-2 flex flex-col input_container">
                                  {/* <label className='input_label'>Tax rate</label> */}
                                  <select
                                    name=""
                                    id=""
                                    className="w-1/3 border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1"
                                  >
                                    <option value="">None</option>
                                    <option value="0">GST@0</option>
                                    <option value="0">IGST@0</option>
                                    <option value="0.25">IGST@0.25%</option>
                                    <option value="0.25">GST@0.25%</option>
                                    <option value="3">IGST@3%</option>
                                    <option value="3">GST@3%</option>
                                    <option value="5">IGST@5%</option>
                                    <option value="5">GST@5%</option>
                                    <option value="12">IGST@12%</option>
                                    <option value="12">GST@12%</option>
                                    <option value="18">IGST@18%</option>
                                    <option value="18">GST@18%</option>
                                    <option value="28">IGST@28%</option>
                                    <option value="28">GST@28%</option>
                                    <option value="exmpt">exmpt</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      handleClick();
                      setshowAddItemModal(false);
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

      {showEditUnitModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto">
              {/*content*/}
              <div className="p-3 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-blueGray-200 rounded-t">
                  <div className="flex">
                    <h3 className="text-xl font-semibold mx-2">Edit Unit</h3>
                  </div>
                  <button
                    className="p-1 ml-auto  border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowEditUnitModal(false)}
                  >
                    <span className=" text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="flex">
                  <div className=" px-3">
                    <label
                      for="countries"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
                    >
                      Select Basic Unit
                    </label>
                    <select
                      id="countries"
                      class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="">None</option>
                      <option value="bags">BAGS(Bag)</option>
                      <option value="bottle">BOTTLE(Btl)</option>
                      <option value="box">BOX(Box)</option>
                      <option value="bundles">BUNDLES(Bdl)</option>
                      <option value="cans">CANS(can)</option>
                      <option value="cartons">CARTONS(Ctn)</option>
                      <option value="dogens">DOGENS(Dzn)</option>
                      <option value="grammes">GRAMMES(GM)</option>
                      <option value="kilograms">KILOGRAMS(KG)</option>
                      <option value="litters">LITTERS(Ltr)</option>
                      <option value="meaters">MEATERS(Mtr)</option>
                      <option value="mililiter">MILILITER(Ml)</option>
                      <option value="numbers">NUMBERS(Nos)</option>
                      <option value="packs">PACKS(Pac)</option>
                      <option value="pairs">PAIRS(Prs)</option>
                      <option value="pieces">PIECES(Pcs)</option>
                      <option value="quintals">QUINTALS(Qtl)</option>
                      <option value="rolls">ROLLS(Rol)</option>
                      <option value="squarefeet">SQUARE FEET(Sqf)</option>
                    </select>
                  </div>
                  <div className="px-3">
                    <label
                      for="countries"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
                    >
                      Select Secondary Unit:
                    </label>
                    <select
                      id="countries"
                      class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="">None</option>
                      <option value="bags">BAGS(Bag)</option>
                      <option value="bottle">BOTTLE(Btl)</option>
                      <option value="box">BOX(Box)</option>
                      <option value="bundles">BUNDLES(Bdl)</option>
                      <option value="cans">CANS(can)</option>
                      <option value="cartons">CARTONS(Ctn)</option>
                      <option value="dogens">DOGENS(Dzn)</option>
                      <option value="grammes">GRAMMES(GM)</option>
                      <option value="kilograms">KILOGRAMS(KG)</option>
                      <option value="litters">LITTERS(Ltr)</option>
                      <option value="meaters">MEATERS(Mtr)</option>
                      <option value="mililiter">MILILITER(Ml)</option>
                      <option value="numbers">NUMBERS(Nos)</option>
                      <option value="packs">PACKS(Pac)</option>
                      <option value="pairs">PAIRS(Prs)</option>
                      <option value="pieces">PIECES(Pcs)</option>
                      <option value="quintals">QUINTALS(Qtl)</option>
                      <option value="rolls">ROLLS(Rol)</option>
                      <option value="squarefeet">SQUARE FEET(Sqf)</option>
                    </select>
                  </div>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      handleClick();
                      setShowEditUnitModal(false);
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
       {showAddCategory ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto">
                            {/*content*/}
                            <div className="p-3 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-blueGray-200 rounded-t">
                                    <div className='flex'>
                                        <h3 className="text-xl font-semibold mx-2">
                                            Edit Unit
                                        </h3>

                                    </div>
                                    <button
                                        className="p-1 ml-auto  border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowAddCategory(false)}
                                    >
                                        <span className=" text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                
                                <div>
                                <input className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none " type="text" name="input-name" title="Input title" placeholder="Add Category" />

                                </div>



                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowAddCategory(false)}
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

export default Items;
