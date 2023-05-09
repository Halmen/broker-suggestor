import { useState, SyntheticEvent, useCallback } from "react";
import Image from "next/image";
import { Broker } from "@/common/interfaces";
import { Box, Typography, Tab, Link } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import ObserverWrapper from "@/components/ObserverWrapper/ObserverWrapper";
import { css } from "@linaria/core";
import { eventType, listType } from "@/common/interfaces";

interface ScoreCardProps {
  data: Broker;
  index: number;
  list: listType;
  onDispatch: (id: number, event: eventType, list: listType) => void;
}

const ScoreCard = ({ data, index, list, onDispatch }: ScoreCardProps) => {
  const onLinkClick = useCallback(() => {
    onDispatch(data.id, "click", list);
  }, []);
  return (
    <Link
      href={data.linkUrl}
      target="_blank"
      underline="none"
      className={linkCss}
      onClick={onLinkClick}
    >
      <p>{`${index}.`}</p>
      <div>
        <div className={middleColumnCss}>
          <Image
            width={30}
            height={30}
            src={data.logoUrl}
            alt={`${data.name} logo `}
          />
          <Typography component="p">{data.name}</Typography>
        </div>
      </div>
      <div> {`${data.score} > `}</div>
    </Link>
  );
};

interface Props {
  stockList: Broker[];
  forexList: Broker[];
  onDispatch: (id: number, event: eventType, list: listType) => void;
}

const BrokerTopTable = ({
  stockList = [],
  forexList = [],
  onDispatch,
}: Props) => {
  const [value, setValue] = useState("1");
  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={tableWrapperCss}>
      <Typography variant="h6" align="center">
        Top 5 Broker
      </Typography>
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            width: "fit-content",
            margin: "0 auto",
          }}
        >
          <TabList onChange={handleChange}>
            <Tab label="Stock" value="1" />
            <Tab label="Forex" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {stockList.map((data, index) => (
            <ObserverWrapper
              key={data.id}
              id={data.id}
              onDispatch={onDispatch}
              list="topStock"
            >
              <ScoreCard
                data={data}
                index={index}
                list="topStock"
                onDispatch={onDispatch}
              />
            </ObserverWrapper>
          ))}
        </TabPanel>
        <TabPanel value="2">
          {forexList.map((data, index) => (
            <ObserverWrapper
              key={data.id}
              id={data.id}
              onDispatch={onDispatch}
              list="topForex"
            >
              <ScoreCard
                data={data}
                index={index}
                list="topForex"
                onDispatch={onDispatch}
              />
            </ObserverWrapper>
          ))}
        </TabPanel>
      </TabContext>
    </div>
  );
};

const tableWrapperCss = css`
  background-color: white;
  height: fit-content;
  border-radius: 10px;
  padding: 25px;

  p,
  h6 {
    font-weight: 700;
  }
`;

const linkCss = css`
  display: flex;
  gap: 7px;
  align-items: center;
  padding: 25px;
  margin-bottom: 20px;
  font-weight: 700;
  color: black;
  border-bottom: 1px solid #cbcbcb;
`;

const middleColumnCss = css`
  display: flex;
  gap: 7px;
  align-items: center;
  width: 180px;
`;

export default BrokerTopTable;
