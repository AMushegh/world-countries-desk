import React from "react";
import { Table, TableColumnProps, Space } from "antd";
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";

import useStore from "../../../hooks/useStore";
import useController from "../../../hooks/useController";

import { CountriesStore } from "../CountriesStore";
import { CountriesController } from "../CountriesController";

import { ICountry } from "../types";

import "./Countries.css";

export const CountriesTable = () => {
  const { countriesChunks, currentChunkIndex } = useStore(CountriesStore, [
    "countriesChunks",
    "currentChunkIndex",
  ]);

  const { onCountryTableRowClick, onSortClick } =
    useController(CountriesController);

  const columns: TableColumnProps<ICountry>[] = [
    {
      title: "Flag",
      dataIndex: "flag",
      key: "flag",
      render: (text: string, country: ICountry) => (
        <img src={country.flagUrl} alt={country.flagAlt} width="30" />
      ),
      align: "center",
      width: "5%",
    },
    {
      title: (
        <Space>
          <span>Country</span>
          <SortAscendingOutlined
            onClick={() => onSortClick("countryName", true)}
          />
          <SortDescendingOutlined
            onClick={() => onSortClick("countryName", false)}
          />
        </Space>
      ),
      dataIndex: "countryName",
      key: "countryName",
      align: "center",
      width: "15%",
    },
    {
      title: (
        <Space>
          <span>Capital Name</span>
          <SortAscendingOutlined
            onClick={() => onSortClick("capitalName", true)}
          />
          <SortDescendingOutlined
            onClick={() => onSortClick("capitalName", false)}
          />
        </Space>
      ),
      dataIndex: "capitalName",
      key: "capitalName",
      align: "center",
      width: "15%",
    },
    {
      title: (
        <Space>
          <span>Region</span>
          <SortAscendingOutlined onClick={() => onSortClick("region", true)} />
          <SortDescendingOutlined
            onClick={() => onSortClick("region", false)}
          />
        </Space>
      ),
      dataIndex: "region",
      key: "region",
      align: "center",
      width: "10%",
    },
    {
      title: (
        <Space>
          <span>Subregion</span>
          <SortAscendingOutlined
            onClick={() => onSortClick("subRegion", true)}
          />
          <SortDescendingOutlined
            onClick={() => onSortClick("subRegion", false)}
          />
        </Space>
      ),
      dataIndex: "subRegion",
      key: "subRegion",
      align: "center",
      width: "10%",
    },
    {
      title: (
        <Space>
          <span>Language</span>
          <SortAscendingOutlined
            onClick={() => onSortClick("language", true)}
          />
          <SortDescendingOutlined
            onClick={() => onSortClick("language", false)}
          />
        </Space>
      ),
      dataIndex: "language",
      key: "language",
      align: "center",
      width: "10%",
    },
    {
      title: (
        <Space>
          <span>Currency</span>
          <SortAscendingOutlined
            onClick={() => onSortClick("currency", true)}
          />
          <SortDescendingOutlined
            onClick={() => onSortClick("currency", false)}
          />
        </Space>
      ),
      dataIndex: "currency",
      key: "currency",
      render: (text: string, country: ICountry) => (
        <>
          {country.currency} ({country.currencySymbol})
        </>
      ),
      align: "center",
      width: "10%",
    },
    {
      title: "Independent",
      dataIndex: "independent",
      key: "independent",
      render: (independent: boolean) => (independent ? "Yes" : "No"),
      align: "center",
      width: "10%",
    },
    {
      title: (
        <Space>
          <span>Area</span>
          <SortAscendingOutlined onClick={() => onSortClick("area", true)} />
          <SortDescendingOutlined onClick={() => onSortClick("area", false)} />
        </Space>
      ),
      dataIndex: "area",
      key: "area",
      align: "center",
      width: "10%",
    },
  ];

  return (
    <Table
      dataSource={countriesChunks[currentChunkIndex] ?? []}
      columns={columns}
      pagination={false}
      onRow={(country) => ({
        onClick: () => onCountryTableRowClick(country),
      })}
      rowClassName="countries__table__row"
      rowKey={({ cca3 }) => cca3}
    />
  );
};
