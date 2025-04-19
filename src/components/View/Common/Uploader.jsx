import React, { useState } from "react";
import { InboxOutlined, EyeFilled } from "@ant-design/icons";
import { Button, Input, Upload, Modal } from "antd";
import template from "../../assets/template_birthday.png";
import Swal from "sweetalert2";
import Preview from "../Preview";

const { Dragger } = Upload;

const Uploader = () => {
  const [fileList, setFileList] = useState([]);
  const [formVisible, setFormvisible] = useState(false);
  const [nombre, setNombre] = useState("");
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const props = {
    name: "file",
    multiple: false,
    accept: ".jpg,.png",
    fileList,

    beforeUpload(file) {
      const isJpgOrPng = file.type === "image/jpg" || file.type === "image/png";
      if (!isJpgOrPng) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Solo se permiten archivos JPG o PNG.",
          showConfirmButton: false,
          timer: 1000,
        });
        return Upload.LIST_IGNORE;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
        setFormvisible(true);
      };
      reader.readAsDataURL(file);

      setFileList([file]);
      return false;
    },

    onRemove() {
      setFileList([]);
      setPreviewImage(null);
      setFormvisible(false);
    },

    onChange(info) {
      console.log(info);
      let newFileList = [...info.fileList].slice(-1);
      setFileList(newFileList);

      if (info.file.originFileObj) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(info.file.originFileObj);
      }
      const { status } = info.file;

      if (status === "done") {
        Swal.fire({
          icon: "success",
          title: "Exito!",
          text: `${info.file.name} subido correctamente.`,
          showConfirmButton: false,
          timer: 1000,
        });
      }
      if (status === "error") {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: `Hubo un problema al subir ${info.file.name}.`,
          showConfirmButton: false,
          timer: 1000,
        });
      }
      if (status === "removed") {
        setFormvisible(false);
      }
    },
    onDrop(e) {
      console.log("Archivo arrastrado:", e.dataTransfer.files);
    },
  };
  const isFormValid = () => {
    const diaNum = parseInt(dia);
    return nombre.trim() !== "" && nombre.length <= 80 && !isNaN(diaNum) && diaNum >= 0 && diaNum <= 31 && mes.trim() !== "" && mes.length <= 15;
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
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
      {formVisible && (
        <>
          <form className="w-84 flex mt-5" id="form">
            <Input placeholder="Nombre" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <Input placeholder="Dia" className="w-auto" name="dia" value={dia} onChange={(e) => setDia(e.target.value)} />
            <Input placeholder="Mes" name="mes" value={mes} onChange={(e) => setMes(e.target.value)} />
          </form>
          <Button onClick={handleClick} disabled={!isFormValid()} type="primary" shape="round" className="p-3 mt-3" icon={<EyeFilled />}>
            Previsualizar
          </Button>

          <Modal title="Preview" open={isModalOpen} onCancel={handleCancel} footer={null}>
            <Preview template={template} uploadedImg={previewImage} nombre={nombre} dia={dia} mes={mes} />
          </Modal>
        </>
      )}
    </div>
  );
};
export default Uploader;
