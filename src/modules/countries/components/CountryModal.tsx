import React from "react";
import { Modal, Typography } from "antd";
import { ICountry } from "../types";

const { Text, Title } = Typography;

interface ICountryModalProps {
  country: ICountry | null;
  onClose: () => void;
}

export const CountryModal = ({ country, onClose }: ICountryModalProps) => {
  const {
    flagUrl,
    flagAlt,
    countryName,
    countryNativeName,
    capitalName,
    region,
    subRegion,
    language,
    currency,
    currencySymbol,
    independent,
    area,
    cca3,
    timezones,
  } = country;

  return (
    <Modal visible={true} onCancel={onClose} footer={null} closable={false}>
      <div className="country-modal__img">
        <img src={flagUrl} alt={flagAlt} />
      </div>
      <Title level={2}>{countryName}</Title>
      <Text strong>Native Name: </Text>
      <Text>{countryNativeName}</Text>
      <br />
      <Text strong>Capital: </Text>
      <Text>{capitalName}</Text>
      <br />
      <Text strong>Region: </Text>
      <Text>{region}</Text>
      <br />
      <Text strong>Subregion: </Text>
      <Text>{subRegion}</Text>
      <br />
      <Text strong>Language: </Text>
      <Text>{language}</Text>
      <br />
      <Text strong>Currency: </Text>
      <Text>
        {currency} ({currencySymbol})
      </Text>
      <br />
      <Text strong>Independent: </Text>
      <Text>{independent ? "Yes" : "No"}</Text>
      <br />
      <Text strong>Area: </Text>
      <Text>{area} km²</Text>
      <br />
      <Text strong>CCA3: </Text>
      <Text>{cca3}</Text>
      <br />
      <Text strong>Timezones: </Text>
      <Text>{timezones.join(", ")}</Text>
    </Modal>
  );
};
