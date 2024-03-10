import React, { useState } from "react";
import { Modal, Button, Input } from "antd";
import { axiosPatch, axiosPost } from "../api/apiservice";
import { openNotificationWithIcon } from "../utils/utils";

// ContentBox component
const ContentBox = ({ itm }) => {
  // State variables
  const [name, setName] = useState(""); // State for storing name input
  const [data, setData] = useState(""); // State for storing data input
  const [apiData, setApiData] = useState(); // State for storing API data
  const [isModalVisible, setIsModalVisible] = useState(false); // State for controlling modal visibility

  // Function to show the modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to handle OK button click
  const handleOk = async () => {
    console.log(apiData);
    console.log(name, data);

    if (name && data) {
      let apiResponse;
      if (apiData?._id) {
        // Update data
        const updateData = {
          name: name,
          data: data,
          id: apiData?._id,
        };
        apiResponse = await axiosPatch('/data', updateData);
        if (!apiResponse?.error) {
          setApiData(apiResponse.data);
        } else {
          // Display error notification if data already exists
          console.log('here');
          openNotificationWithIcon("error", "Data Already exists");
        }
      } else {
        // Add new data
        const newData = {
          name: name,
          data: data,
        };
        apiResponse = await axiosPost('/data', newData);
        if (!apiResponse?.error) {
          setApiData(apiResponse.data);
        } else {
          // Display error notification if data already exists
          console.log('here');
          openNotificationWithIcon('error', 'Data Already exists');
        }
      }

      console.log(apiResponse);

      setIsModalVisible(false);
    } else {
      // Log a message if something went wrong with the input
      console.log("Something went wrong");
    }
  };

  // Function to handle Cancel button click
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // JSX structure for rendering the component
  return (
    <div
      key={itm.i}
      data-grid={itm}
      className="bg-slate-500 flex flex-col items-center justify-center w-full"
      onMouseDown={(e) => e.stopPropagation()}
    >
      {/* Buttons for Add and Update */}
      <div className="flex justify-evenly w-full">
        <Button
          type="primary"
          onClick={(e) => {
            e.stopPropagation();
            setApiData({});
            setName("");
            setData("");
            showModal();
          }}
          className="bg-orange-300"
        >
          Add
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            showModal();
          }}
          className="bg-lime-400 ml-2"
        >
          Update
        </Button>
      </div>
      {/* Displaying Name and Data */}
      <div className="w-[95%] py-1">
        <p className="text-white w-full">Name - {apiData?.name}</p>
        <p className="text-white w-full">Data - {apiData?.data}</p>
      </div>
      {/* Modal for adding or updating data */}
      <Modal
  title="Add or Update Data"
  open={isModalVisible}
  onOk={handleOk}
  onCancel={handleCancel}
  okButtonProps={{ style: { backgroundColor: 'green' } }}
>
  <label>
    Name:
    <Input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  </label>
  <br />
  <label>
    Data:
    <Input
      type="text"
      value={data}
      onChange={(e) => setData(e.target.value)}
    />
  </label>
</Modal>
    </div>
  );
};

export default ContentBox;
