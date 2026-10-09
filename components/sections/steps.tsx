import React from "react";
import { Card, CardBody, Image } from "@nextui-org/react";

const HowItWorks = () => {
  const list = [
    {
      title: "Присылаете нам заказ",
      alt: "Картинка процесса оформления заказа",
      description:
        "Вы отправляете информацию о заказе для дальнейшей обработки.",
      price: "$5.50",
      img: "/step1.webp",
    },
    {
      title: "Связываемся с продавцом",
      alt: "Картинка связи с продавцом",
      description:
        "Мы подбираем товар или связываемся с продавцом по Вашей ссылке.",
      price: "$3.00",
      img: "/step2.webp",
    },
    {
      title: "Присылаем документы на оплату",
      alt: "Картинка отправки документов на оплату",
      description: "Вы получаете счёт-договор для оплаты заказанных товаров.",
      price: "$10.00",
      img: "/step3.webp",
    },
    {
      title: "Отправляем вам товар",
      alt: "Картинка процесса отправки товара",
      description:
        "После оплаты, товар отправляется удобной транспортной компанией.",
      price: "$5.30",
      img: "/step4.webp",
    },
  ];

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {list.map((item, index) => (
        <Card
          key={index}
          className="border border-[#56bcbe] shadow-[#56bcbe]"
          shadow="sm"
        >
          <CardBody className="overflow-visible p-2">
            <Image
              alt={item.title}
              className="w-full object-cover h-[140px]"
              radius="lg"
              shadow="sm"
              src={item.img}
              width="100%"
            />
            <div className="text-small mt-5">
              <div>
                Шаг {index + 1}: <b>{item.title}</b>
              </div>
              <div className="italic">{item.description}</div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default HowItWorks;
