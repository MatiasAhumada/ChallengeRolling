import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { Row } from "react-bootstrap";
const { Dragger } = Upload;

const Uploader = () => {
  const [fileList, setFileList] = useState([]);
  const props = {
    name: "file",
    multiple: false,
    accept: ".jpg,.png", //.jpg,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    fileList,
    beforeUpload(file) {
      const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("Solo se permiten archivos JPG o PNG.");
        return Upload.LIST_IGNORE;
      }
      return true;
    },

    onChange(info) {
      let newFileList = [...info.fileList].slice(-1);
      setFileList(newFileList);

      const { status } = info.file;

      if (status === "done") {
        message.success(`${info.file.name} subido correctamente.`);
      } else if (status === "error") {
        message.error(`${info.file.name} fallo al subir.`);
      }
    },
    onDrop(e) {
      console.log("Archivo arrastrado:", e.dataTransfer.files);
    },
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-84 pt-30">
        <Dragger {...props}>
          <div className="mt-3">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Arrastra la foto de la persona aqui</p>
            <p className="ant-upload-hint mt-4">Se utiliza una unica imagen a la vez</p>
          </div>
        </Dragger>
      </div>
    </div>
  );
};
export default Uploader;
