"use client";

import { useCallback, useState } from "react";
import { useAppDispatch } from "@/redux/store";
import { updateTrackingList } from "@/redux/slices/brokerDataSlice";
import { exampleBrokerData } from "@/data/brokers";
import Input from "@/components/Input/Input";
import { Broker } from "@/common/interfaces";
import BrokerCard from "@/components/BrokerCard/BrokerCard";
import ObserverWrapper from "@/components/ObserverWrapper/ObserverWrapper";
import BrokerTopTable from "@/components/BrokerTopTable/BrokerTopTable";
import { eventType, listType } from "@/common/interfaces";
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
  const [filteredBrokerList, setFilteredBrokerList] = useState<Broker[]>([]);
  const dispatch = useAppDispatch();
  const listData = filteredBrokerList.length
    ? filteredBrokerList
    : exampleBrokerData;

  const onKeyDown = useCallback((valueToFilter: string) => {
    const list = exampleBrokerData.filter(
      (broker) => broker.name === valueToFilter
    );
    setFilteredBrokerList(list);
  }, []);

  const updateEvent = useCallback(
    (id: number, event: eventType, list: listType) => {
      dispatch(updateTrackingList({ event, list, id }));
    },
    []
  );

  return (
    <>
      <Typography variant="h4" align="center" className={headingCss}>
        Find the right broker and invest on your own
      </Typography>
      <div className={container}>
        <div>
          <Input onKeyDown={onKeyDown} />
          <div className={brokerList}>
            {listData.map(({ id, name, linkUrl, logoUrl }) => (
              <ObserverWrapper
                key={id}
                id={id}
                list="search"
                onDispatch={updateEvent}
              >
                <BrokerCard
                  id={id}
                  href={linkUrl}
                  logoUrl={logoUrl}
                  stockName={name}
                  list="search"
                  onDispatch={updateEvent}
                />
              </ObserverWrapper>
            ))}
          </div>
        </div>
        <BrokerTopTable
          stockList={findTopFive("isStock")}
          forexList={findTopFive("isForex")}
          onDispatch={updateEvent}
        />
      </div>
    </>
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
    flex-direction: row;
    justify-content: space-around;
    align-items: unset;
  }
`;

export default Home;
