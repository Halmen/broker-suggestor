import { useState, SyntheticEvent } from "react";
import Image from "next/image";
import { Broker } from "@/common/interfaces";
import { Box, Typography, Tab, TableCell, TableRow, Link } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import { css } from "@linaria/core";

interface Props {
  stockList: Broker[];
  forexList: Broker[];
}

export const BrokerTopTable = ({ stockList = [], forexList = [] }: Props) => {
  const [value, setValue] = useState("1");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        typography: "body1",
        backgroundColor: "white",
        height: "fit-content",
        borderRadius: "10px",
        padding: "25px",
      }}
    >
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
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Stock" value="1" />
            <Tab label="Forex" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {stockList.map(({ id, name, logoUrl, linkUrl, score }, index) => (
            <TableRow key={id}>
              <Link
                href={linkUrl}
                target="_blank"
                underline="none"
                color="black"
              >
                <TableCell>{`${index}.`}</TableCell>
                <TableCell>
                  <div className={middleRowCss}>
                    <Image
                      width={30}
                      height={30}
                      src={logoUrl}
                      alt={`${name} logo `}
                    />
                    <Typography component="p" className="content-container">
                      {name}
                    </Typography>
                  </div>
                </TableCell>
                <TableCell> {`${score} > `}</TableCell>
              </Link>
            </TableRow>
          ))}
        </TabPanel>
        <TabPanel value="2">
          {forexList.map(({ id, name, logoUrl, linkUrl, score }, index) => (
            <TableRow key={id}>
              <Link
                href={linkUrl}
                target="_blank"
                underline="none"
                color="black"
              >
                <TableCell>{`${index}.`}</TableCell>
                <TableCell>
                  <div className={middleRowCss}>
                    <Image
                      width={30}
                      height={30}
                      src={logoUrl}
                      alt={`${name} logo `}
                    />
                    <Typography component="p" className="content-container">
                      {name}
                    </Typography>
                  </div>
                </TableCell>
                <TableCell> {`${score} > `}</TableCell>
              </Link>
            </TableRow>
          ))}
        </TabPanel>
      </TabContext>
    </Box>
  );
};

const middleRowCss = css`
  display: flex;
  gap: 7px;
  align-items: center;
  width: 180px;
`;

export default BrokerTopTable;
