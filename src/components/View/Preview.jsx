import { Button } from "antd";
import React, { useRef, useEffect } from "react";
import { DownloadOutlined } from "@ant-design/icons";

const Preview = ({ template, uploadedImg, nombre, dia, mes }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    const bg = new Image();
    bg.src = template;
    bg.onload = () => {
      canvasRef.current.width = bg.width;
      canvasRef.current.height = bg.height;
      ctx.drawImage(bg, 0, 0);

      ctx.fillStyle = "#fff"; 
      ctx.font = "bold 35px Courier New"; 
      ctx.textAlign = "left";
      const code = [
        "var i = 0, age = getAge();",
        "while(true) {",
        "  if (i === age) {",
        `    alert('¡Feliz Cumple ${nombre}!');`,
        "  }",
        "  else {",
        "    i++;",
        "  }",
        "}",
      ];

      
      const startX = 300; 
      let startY = 400; 
      const lineHeight = 55;
      code.forEach((line) => {
        ctx.fillText(line, startX, startY);
        startY += lineHeight;
      });
      if (uploadedImg) {
        const userImg = new Image();
        userImg.src = uploadedImg;
        userImg.onload = () => {
          ctx.drawImage(userImg, 694, 980, 576, 409);

          ctx.fillStyle = "#000";
          ctx.font = "90px Arial";
          ctx.fillText(dia, 300, 1230);

          ctx.fillStyle = "#5E5D6B";
          ctx.font = "50px Arial";
          ctx.fillText(`de`, 300, 1310);
          ctx.fillText(`${mes}`, 300, 1360);
        };
      }
    };
  }, [template, uploadedImg, nombre, dia, mes]);
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "felicitacion.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <>
      <canvas ref={canvasRef} className="w-full max-w-[500px] h-auto mx-auto" />
      <div className="flex justify-end mt-4">
        <Button type="primary" icon={<DownloadOutlined />} onClick={handleDownload}>
          Descargar
        </Button>
      </div>
    </>
  );
};

export default Preview;
