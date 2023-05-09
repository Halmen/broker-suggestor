/* eslint-disable no-unused-vars */
import { useCallback } from "react";
import Image from "next/image";
import { css } from "@linaria/core";
import { Card, Typography, Button } from "@mui/material";
import { eventType, listType } from "@/common/interfaces";

interface Props {
  id: number;
  stockName: string;
  href: string;
  logoUrl: string;
  list: listType;
  onDispatch: (id: number, event: eventType, list: listType) => void;
}

const BrokerCard = ({
  stockName,
  href,
  logoUrl,
  onDispatch,
  id,
  list,
}: Props) => {
  const onButtonClick = useCallback(() => {
    onDispatch(id, "click", list);
  }, []);
  return (
    <Card className={brokerCardCss}>
      <div className={imageWrapperCss}>
        <Image
          width={60}
          height={60}
          src={logoUrl}
          alt={`${stockName} logo`}
        ></Image>
      </div>
      <Typography component="p" className="content-container">
        {stockName}
      </Typography>
      <Button
        target="_blank"
        href={href}
        variant="contained"
        onClick={onButtonClick}
        endIcon={<p>➪</p>}
      >
        Visit Broker
      </Button>
    </Card>
  );
};

const brokerCardCss = css`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  min-height: 90px;
  height: 90px;
  width: 450px;

  p {
    font-weight: 700;
  }

  @media (min-width: 530px) {
    width: 500px;
  }
`;

const imageWrapperCss = css`
  box-shadow: rgba(0, 0, 0, 0.35) 0px -10px 15px;
  border-radius: 10px;
  height: -webkit-fill-available;
`;
export default BrokerCard;
