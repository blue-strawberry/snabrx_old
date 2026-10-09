"use client";

import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Image, 
} from "@nextui-org/react";

import { title } from "@/components/primitives";
import { CameraIcon } from "@/components/icons";

const RemoveIcon = ({ size = 16, color = "#fff" }) => (
  <svg
    fill="none"
    height={size}
    stroke={color}
    strokeWidth="2"
    style={{ cursor: "pointer" }}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="18" x2="6" y1="6" y2="18" />
    <line x1="6" x2="18" y1="6" y2="18" />
  </svg>
);

const initialFormData = {
  name: "",
  link: "",
  article: "",
  quantity: "",
  fio: "",
  company: "",
  address: "",
  telegram: "",
  phone: "",
  email: "",
};

const MyForm = () => {
  const [formData, setFormData] = useState(initialFormData);

  // We'll store each image as { file, previewUrl }
  const [images, setImages] = useState<any[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (!selectedFiles) return;

    const newImages = Array.from(selectedFiles).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== indexToRemove));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const message = `Название товара: ${formData?.name}
Ссылка на товар: ${formData?.link}
Артикул товара: ${formData?.article}
Количество (шт): ${formData?.quantity}
Как обращаться: ${formData?.fio}
Организация/частник: ${formData?.company}
Адрес доставки: ${formData?.address}
Telegram: ${formData?.telegram}
Телефон: ${formData?.phone}
Почта: ${formData?.email}`;

    if (images.length > 0) {
      // Send images via sendMediaGroup
      const formDataToSend = new FormData();

      formDataToSend.append("chat_id", String("1032446520"));

      const media = images.map((imgObj, index) => ({
        type: "photo",
        media: `attach://${imgObj.file.name}`,
        caption: index === 0 ? message : "",
      }));

      formDataToSend.append("media", JSON.stringify(media));
      images.forEach((imgObj) => {
        formDataToSend.append(imgObj.file.name, imgObj.file);
      });

      fetch(`https://snabrx.ru/tgbotapi/sendMediaGroup`, {
        method: "POST",
        body: formDataToSend,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            setIsError(false);
            setModalMessage("Спасибо! Скоро мы свяжемся с вами.");
            setFormData(initialFormData);
            setImages([]);
            setModalOpen(true);
          } else {
            setIsError(true);
            setModalMessage(`Error: ${data.description}`);
            setModalOpen(true);
          }
        })
        .catch(() => {
          setIsError(true);
          setModalMessage(
            "Что-то пошло не так. Попробуйте заново или свяжитесь с нами напрямую. Контакты находятся сверху.",
          );
          setModalOpen(true);
        });
    } else {
      // If no images, just send text
      fetch(
        `https://snabrx.ru/tgbotapi/sendMessage?text=${encodeURIComponent(
          message,
        )}`,
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            setIsError(false);
            setModalMessage("Спасибо! Скоро мы свяжемся с вами.");
            setFormData(initialFormData);
            setModalOpen(true);
          } else {
            setIsError(true);
            setModalMessage(`Error: ${data.description}`);
            setModalOpen(true);
          }
        })
        .catch(() => {
          setIsError(true);
          setModalMessage(
            "Что-то пошло не так. Попробуйте заново или свяжитесь с нами напрямую. Контакты находятся сверху.",
          );
          setModalOpen(true);
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card className="border border-[#56bcbe] shadow-[#56bcbe]" shadow="sm">
          <CardHeader>
            <h1 className={title({ color: "cian" })}>Сделать заказ</h1>
          </CardHeader>

          <CardBody className="overflow-visible p-2">
            {/* Name */}
            <div className="w-full p-2">
              <label
                htmlFor="name"
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: "bold",
                }}
              >
                Название товара *
              </label>
              <Input
                required
                id="name"
                name="name"
                type="text"
                value={formData.name}
                variant="bordered"
                onChange={handleChange}
              />
            </div>

            {/* Link */}
            <div className="w-full p-2">
              <label
                htmlFor="link"
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: "bold",
                }}
              >
                Ссылка на товар
              </label>
              <Input
                id="link"
                name="link"
                type="text"
                value={formData.link}
                variant="bordered"
                onChange={handleChange}
              />
            </div>

            {/* Article */}
            <div className="w-full p-2">
              <label
                htmlFor="article"
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: "bold",
                }}
              >
                Артикул товара
              </label>
              <Input
                id="article"
                name="article"
                type="text"
                value={formData.article}
                variant="bordered"
                onChange={handleChange}
              />
            </div>

            {/* Quantity */}
            <div className="w-full p-2">
              <label
                htmlFor="quantity"
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: "bold",
                }}
              >
                Количество единиц товара (шт) *
              </label>
              <Input
                required
                id="quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                variant="bordered"
                onChange={handleChange}
              />
            </div>

            {/* FIO */}
            <div className="w-full p-2">
              <label
                htmlFor="fio"
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: "bold",
                }}
              >
                Как к Вам обращаться *
              </label>
              <Input
                required
                id="fio"
                name="fio"
                type="text"
                value={formData.fio}
                variant="bordered"
                onChange={handleChange}
              />
            </div>

            {/* Company */}
            <div className="w-full p-2">
              <label
                htmlFor="company"
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: "bold",
                }}
              >
                Из какой Вы организации / частник 
              </label>
              <Input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                variant="bordered"
                onChange={handleChange}
              />
            </div>

            {/* Address */}
            <div className="w-full p-2">
              <label
                htmlFor="address"
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: "bold",
                }}
              >
                Адрес доставки *
              </label>
              <Input
                required
                id="address"
                name="address"
                type="text"
                value={formData.address}
                variant="bordered"
                onChange={handleChange}
              />
            </div>

            {/* Telegram */}
            <div className="w-full p-2">
              <label
                htmlFor="telegram"
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: "bold",
                }}
              >
                Telegram
              </label>
              <Input
                id="telegram"
                name="telegram"
                type="text"
                value={formData.telegram}
                variant="bordered"
                onChange={handleChange}
              />
            </div>

            {/* Phone */}
            <div className="w-full p-2">
              <label
                htmlFor="phone"
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: "bold",
                }}
              >
                Телефон *
              </label>
              <Input
                required
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                variant="bordered"
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="w-full p-2">
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: "bold",
                }}
              >
                Почта
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                variant="bordered"
                onChange={handleChange}
              />
            </div>

            {/* Images */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <div style={{ marginTop: "15px" }}>
                <label
                  htmlFor="file-upload"
                  style={{
                    display: "inline-block",
                    padding: "10px 20px",
                    backgroundColor: "#58bcbc",
                    color: "#fff",
                    borderRadius: "5px",
                    cursor: "pointer",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <CameraIcon />
                    <span style={{ fontSize: "16px", color: "#000" }}>
                      Добавить фото
                    </span>
                  </div>
                  <input
                    multiple
                    accept="image/*"
                    id="file-upload"
                    style={{ display: "none" }}
                    type="file"
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              {/* Preview Thumbnails */}
              {images.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  {images.map((imgObj, index) => (
                    <div
                      key={index}
                      style={{
                        position: "relative",
                        width: "100px",
                        height: "100px",
                      }}
                    >
                      <Image
                        alt={`Фото товара номер ${index}`}
                        src={imgObj.previewUrl}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "6px",
                          border: "2px solid #56bcbe",
                        }}
                      />
                      <button
                        aria-label="Удалить фото"
                        style={{
                          position: "absolute",
                          top: "4px",
                          right: "4px",
                          backgroundColor: "rgba(0,0,0,0.5)",
                          borderRadius: "50%",
                          padding: "2px",
                          border: "none",
                          cursor: "pointer",
                          zIndex: 9999,
                        }}
                        type="button"
                        onClick={() => removeImage(index)}
                      >
                        <RemoveIcon color="#fff" size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardBody>

          <CardFooter className="justify-end">
            <button
              style={{
                display: "inline-block",
                padding: "10px 20px",
                backgroundColor: "#58bcbc",
                color: "#000",
                borderRadius: "5px",
                cursor: "pointer",
                textAlign: "center",
                fontSize: "14px",
              }}
              type="submit"
            >
              Отправить форму
            </button>
          </CardFooter>
        </Card>
      </form>

      {/* Notification Modal */}
      <Modal isOpen={modalOpen} onOpenChange={() => setModalOpen(false)}>
        <ModalContent>
          <ModalHeader>{isError ? "Ошибка" : "Форма отправлена"}</ModalHeader>
          <ModalBody>{modalMessage}</ModalBody>
          <ModalFooter>
            <button
              style={{
                display: "inline-block",
                padding: "10px 20px",
                backgroundColor: "#58bcbc",
                color: "#fff",
                borderRadius: "5px",
                cursor: "pointer",
                textAlign: "center",
                fontSize: "14px",
              }}
              onClick={() => setModalOpen(false)}
            >
              Закрыть
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MyForm;
