"use client";

import { subtitle, title } from "@/components/primitives";
import MainInfo from "@/components/sections/mainInfo";
import HowItWorks from "@/components/sections/steps";
import Return from "@/components/sections/return";
import AdditionalServices from "@/components/sections/additionalServices";
import StorageInfo from "@/components/sections/storageInfo";
import ProhibitedItems from "@/components/sections/prohibitedItems";

const sections = [
  { id: "about-us", title: "Кто мы", component: MainInfo },
  { id: "how-it-works", title: "Как это работает", component: HowItWorks },
  { id: "returns-and-refunds", title: "Возвраты", component: Return },
  {
    id: "additional-services",
    title: "Дополнительные услуги",
    component: AdditionalServices,
  },
  { id: "storage-info", title: "Хранение посылок", component: StorageInfo },
  {
    id: "prohibited-items",
    title: "Товары, которые мы НЕ доставляем",
    component: ProhibitedItems,
  },
];

export default function Home() {
  return (
    <>
      {/*
        1) Use styled-jsx to hide the nav on screens below 768px.
        2) Also reset margin-left for the content on small screens.
      */}
      <style jsx>{`
        @media (max-width: 768px) {
          .navMenu {
            display: none; /* Hide menu on phones */
          }
          .mainContent {
            margin-left: 0 !important; /* Remove the left margin on small screens */
          }
        }
      `}</style>

      <div style={{ display: "flex" }}>
        {/* Меню слева */}
        <nav
          className="navMenu"
          style={{
            width: "200px",
            padding: "10px",
            borderRight: "1px solid #ccc",
            position: "fixed",
            height: "100%",
            overflowY: "auto",
          }}
        >
          <h2
            className={subtitle({ class: "mt-4", color: "cian" })}
            style={{ fontWeight: "bold" }}
          >
            Меню
          </h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {sections.map((section) => (
              <li key={section.id} style={{ margin: "10px 0" }}>
                <a
                  href={`#${section.id}`}
                  style={{
                    textDecoration: "none",
                    display: "block",
                    padding: "5px",
                    transition: "color 0.5s ease",
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#56bcbe")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  {section.title}
                </a>
              </li>
            ))}
            <li key="order" style={{ margin: "10px 0" }}>
              <a
                href="/order-form"
                style={{
                  textDecoration: "none",
                  display: "block",
                  padding: "5px",
                  transition: "color 0.5s ease",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#56bcbe")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                Сделать заказ
              </a>
            </li>
          </ul>
        </nav>

        {/* Контент справа */}
        <div
          className="mainContent"
          style={{ marginLeft: "220px", padding: "20px", flex: 1 }}
        >
          <h1 className={title({ color: "cian" })}>О нас</h1>
          {sections.map((section) => {
            const Content = section.component;

            return (
              <div
                key={section.id}
                id={section.id}
                style={{ marginBottom: "40px", scrollMarginTop: "100px" }}
              >
                <h2
                  className={subtitle({ class: "mt-4", color: "cian" })}
                  style={{ fontWeight: "bold" }}
                >
                  {section.title}
                </h2>
                <Content />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
