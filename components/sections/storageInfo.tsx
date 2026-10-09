import React from "react";

const StorageInfo = () => {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1200px",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px #56bcbe",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "45%" }}>
          <h3 style={{ color: "#56bcbe", marginBottom: "10px" }}>
            Входящие — 45 дней бесплатно
          </h3>
          <p>Далее 130 ₽ в день, максимальный срок хранения — 75 дней.</p>
          <ProgressBar daysFree={45} price="130 ₽ в день" totalDays={75} />
          <p style={{ marginTop: "10px" }}>
            Хранение входящего грузоместа на складе: 45 дней бесплатно, на следующий
            день и далее 130 ₽ в день за одну посылку. Максимальный срок
            хранения груза — 75 дней. Далее посылка утилизируется.
          </p>
        </div>

        <div
          style={{ width: "1px", backgroundColor: "#ccc", height: "100%" }}
        />

        <div style={{ width: "45%" }}>
          <h3 style={{ color: "#56bcbe", marginBottom: "10px" }}>
            Исходящие — 10 дней бесплатно
          </h3>
          <p>Далее 130 ₽ в день, максимальный срок хранения — 30 дней.</p>
          <ProgressBar daysFree={10} price="130 ₽ в день" totalDays={30} />
          <p style={{ marginTop: "10px" }}>
            Хранение исходящего грузоместа со статусом «ожидает оплаты»: 10 дней
            бесплатно, на следующий день и далее 130 ₽ в день за одну посылку.
            Максимальный срок хранения груза — 30 дней. Далее посылка
            утилизируется.
          </p>
        </div>
      </div>
    </div>
  );
};

const ProgressBar = ({ daysFree, totalDays, price }: { daysFree: number, totalDays: number, price: string }) => {
  return (
    <div>
      <div style={{ display: "flex", height: "8px", margin: "10px 0" }}>
        <div
          style={{
            backgroundColor: "#56bcbe",
            width: `${(daysFree / totalDays) * 100}%`,
          }}
        />
        <div
          style={{
            backgroundColor: "#ccc",
            width: `${((totalDays - daysFree) / totalDays) * 100}%`,
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "12px",
        }}
      >
        <span>0 дн.</span>
        <span>{daysFree} дн.</span>
        <span />
        <span>{totalDays} дн.</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "14px",
          fontWeight: "bold",
          marginTop: "5px",
        }}
      >
        <span>0 ₽</span>
        <span>{price}</span>
      </div>
    </div>
  );
};

export default StorageInfo;
