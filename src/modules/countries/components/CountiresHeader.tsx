import { Button } from "antd";
import React from "react";

import useController from "../../../hooks/useController";

import { CountriesController } from "../CountriesController";

import { CountriesHeaderFilters } from "./CountriesHeaderFilters";

export const CountiresHeader = () => {
  const { onClearAllFiltersButtonClick } = useController(CountriesController);

  return (
    <div className="countries__header">
      <CountriesHeaderFilters />
      <div className="countries__header__clear-btn">
        <Button danger type="primary" onClick={onClearAllFiltersButtonClick}>
          Clear All Filters
        </Button>
      </div>
    </div>
  );
};
