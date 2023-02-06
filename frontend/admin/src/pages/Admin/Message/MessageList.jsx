import { DeleteOutlined, EyeFilled } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import client from "../../../apiConfig/api";

export default function MessageList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (email) => {
    setIsModalOpen(false);
    navigator.clipboard.writeText(email);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [viewedMessage, setViewedMessage] = useState({});

  const selectViewedMessage = (message) => {
    setViewedMessage(message);
  };

  const [messages, setMessages] = useState([]);

  const loadData = async () => {
    try {
      const apiCall = await client.get("/message");
      const { data } = apiCall.data;
      if (apiCall.ok) {
        // sort data by createdAt and set Messages
        setMessages(data);
      } else {
        console.log(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  console.log(messages);
  useEffect(() => {
    loadData();
  }, [isModalOpen]);

  return (
    <div className="message__grid px-2">
      <MessageModal
        showModal={showModal}
        handleCancel={handleCancel}
        handleOk={() => {
          handleOk(viewedMessage.mail);
        }}
        isModalOpen={isModalOpen}
        content={viewedMessage}
      />
      {messages.map(function (message, i) {
        return (
          <MessageBox
            nom={message.nom}
            prenom={message.prenom}
            email={message.mail}
            sujet={message.sujet}
            message={message.message}
            nouveau={message.read}
            all={message}
            selectViewedMessage={selectViewedMessage}
            showModal={showModal}
          />
        );
      })}
    </div>
  );
}

function MessageBox({
  nom,
  prenom,
  email,
  sujet,
  message,
  all,
  selectViewedMessage,
  showModal,
  nouveau,
}) {
  const setAsRead = async () => {
    try {
      const apiCall = await client.put(`/message/read/${all._id}`);
      if (apiCall.ok) {
        console.log(apiCall.data);
      } else {
        console.log(apiCall.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const viewClick = () => {
    selectViewedMessage(all);
    setAsRead();
    showModal();
  };

  return (
    <div className="message__box d-flex flex-column p-3">
      <h4>
        {nom} {prenom}
      </h4>
      <h5>{email}</h5>
      <p>
        Sujet : <strong>{sujet}</strong>
      </p>
      <p>{message}</p>
      <div className="d-flex justify-content-end message__btn_container align-items-center">
        {/* view and delete button  */}
        {!nouveau && (
          <span class="badge rounded-pill text-bg-warning mx-2">nouveau</span>
        )}
        <button type="button" className="message__btn mx-2" onClick={viewClick}>
          <EyeFilled
            style={{
              fontSize: "20px",
            }}
          />
        </button>
        <button type="button" className="message__btn mx-2">
          <DeleteOutlined
            style={{
              fontSize: "20px",
            }}
          />
        </button>
      </div>
    </div>
  );
}

function MessageModal({ isModalOpen, handleOk, handleCancel, content }) {
  return (
    <>
      <Modal
        title={`${content.nom} ${content.prenom} - ${content.mail}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Copier l'email"
        cancelText="Fermer"
        className="bg-dark"
      >
        <p clas>
          <strong>{content.sujet}</strong>
        </p>
        <p>{content.message}</p>
      </Modal>
    </>
  );
}
