"use client";

import { Provider } from "react-redux";
import { useMemo } from "react";
import { makeStore } from "@/redux/store";
import { exampleBrokerData } from "@/data/brokers";
import Input from "@/components/Input/Input";
import { Broker } from "@/common/interfaces";
import BrokerCard from "@/components/BrokerCard/BrokerCard";
import BrokerTopTable from "@/components/BrokerTopTable/BrokerTopTable";
import { Typography } from "@mui/material";
import { css } from "@linaria/core";

const findTopFive = (condition: "isStock" | "isForex"): Broker[] => {
  let topFiveList = [];
  let index = 0;
  while (topFiveList.length < 5) {
    if (exampleBrokerData[index]?.[condition]) {
      topFiveList.push(exampleBrokerData[index]);
    }
    index++;
  }
  return topFiveList;
};

const Home = () => {
  const store = useMemo(() => {
    return makeStore();
  }, []);

  return (
    <main>
      <Typography variant="h4" align="center" className={headingCss}>
        Find the right broker and invest on your own
      </Typography>
      <div className={container}>
        <div>
          <Input />
          <div className={brokerList}>
            {exampleBrokerData.map(({ id, name, linkUrl, logoUrl }) => (
              <BrokerCard
                id={id}
                href={linkUrl}
                logoUrl={logoUrl}
                stockName={name}
                key={id}
              />
            ))}
          </div>
        </div>
        <BrokerTopTable
          stockList={findTopFive("isStock")}
          forexList={findTopFive("isForex")}
        />
      </div>
    </main>
  );
};

const brokerList = css`
  display: flex;
  flex-direction: column;
  grid-gap: 13px;
  overflow-y: auto;
  width: min-content;
  height: 700px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const headingCss = css`
  margin-bottom: 30px;
  font-size: 1.5rem;

  @media (min-width: 500px) {
    font-size: 2.125rem;
  }
`;

const container = css`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;

  @media (min-width: 1220px) {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: unset;
  }
`;

export default Home;
