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
      <Typography component="p">{stockName}</Typography>
      <Button
        target="_blank"
        href={href}
        variant="contained"
        onClick={onButtonClick}
        className={visitBrokerButtonCss}
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
  width: 306px;

  p {
    font-weight: 700;
    font-size: 0.75rem;

    @media (min-width: 530px) {
      font-size: 1rem;
    }
  }

  @media (min-width: 387px) {
    width: 380px;
  }

  @media (min-width: 440px) {
    width: 400px;
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

const visitBrokerButtonCss = css`
  font-size: 0;
  font-weight: 700;

  .MuiButton-endIcon {
    margin: 0;

    @media (min-width: 390px) {
      margin: 0 -4px 0 8px;
    }
  }

  @media (min-width: 390px) {
    font-size: 0.75rem;
  }

  @media (min-width: 530px) {
    font-size: 1rem;
  }
`;
export default BrokerCard;
