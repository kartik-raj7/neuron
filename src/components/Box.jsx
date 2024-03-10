import React, { useState } from "react";
import { Modal, Button, Input } from "antd";
import { axiosPatch, axiosPost } from "../api/apiservice";
import { openNotificationWithIcon } from "../utils/utils";

const ContentBox = ({ itm }) => {
  const [name, setName] = useState("");
  const [data, setData] = useState("");
  const [apiData, setApiData] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

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
        apiResponse = await axiosPatch('/data',updateData);
        if(!apiResponse?.error){
          setApiData(apiResponse.data)
        }
        else{
           console.log('here')
           openNotificationWithIcon("error",'Data Already exists')
        }
        
      } else {
        // Add new data
        const newData = {
          name: name,
          data: data,
        };
        apiResponse = await axiosPost('/data',newData);
        if(!apiResponse?.error){
          setApiData(apiResponse.data)
        }
        else{
           console.log('here')
           openNotificationWithIcon('error','Data Already exists')
        }
      }

      console.log(apiResponse);

      setIsModalVisible(false);
    } else {
      console.log("Something went wrong");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div
      key={itm.i}
      data-grid={itm}
      className="bg-slate-500 flex flex-col items-center justify-center w-full"
      onMouseDown={(e) => e.stopPropagation()}
    >
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
      <div className="w-[80%] py-4">
        <p className="text-white w-full">Name - {apiData?.name}</p>
        <p className="text-white w-full">Data - {apiData?.data}</p>
        </div>
      <Modal
        title="Add or Update Data"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
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
