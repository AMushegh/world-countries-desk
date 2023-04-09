import React from "react";
import { Pagination } from "antd";

import useController from "../../../hooks/useController";
import useStore from "../../../hooks/useStore";

import { CountriesController } from "../CountriesController";
import { CountriesStore } from "../CountriesStore";

export const CountriesPagination = () => {
  const { currentChunkIndex, countriesFilteredData } = useStore(
    CountriesStore,
    ["currentChunkIndex", "countriesFilteredData"]
  );

  const { onPagintaionButtonClick } = useController(CountriesController);

  return countriesFilteredData.length ? (
    <div className="countries__pagination">
      <Pagination
        current={currentChunkIndex + 1}
        onChange={onPagintaionButtonClick}
        total={countriesFilteredData.length}
        showSizeChanger={false}
      />
    </div>
  ) : null;
};
