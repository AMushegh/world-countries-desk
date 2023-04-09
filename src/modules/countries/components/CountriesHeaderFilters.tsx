import React from "react";
import { Input, Select, Row, Col, Typography, Checkbox } from "antd";

import { createSelectOptions } from "../../../utils/helpers";

import useController from "../../../hooks/useController";
import useStore from "../../../hooks/useStore";

import { CountriesController } from "../CountriesController";
import { CountriesStore } from "../CountriesStore";

export const CountriesHeaderFilters = () => {
  const {
    regions,
    languages,
    subregions,
    currencies,
    timezones,
    countriesNameFilter,
    countriesRegionFilter,
    countriesLanguageFilter,
    countriesSubRegionFilter,
    countriesCurrencyFilter,
    countriesIndependentFilter,
    countriesTimezoneFilter,
  } = useStore(CountriesStore, [
    "regions",
    "languages",
    "subregions",
    "currencies",
    "timezones",
    "countriesNameFilter",
    "countriesRegionFilter",
    "countriesLanguageFilter",
    "countriesSubRegionFilter",
    "countriesCurrencyFilter",
    "countriesIndependentFilter",
    "countriesTimezoneFilter",
  ]);
  const {
    onNameFilterChange,
    onLangugeFilterChange,
    onRegionFilterChange,
    onSubregionFilterChange,
    onCurrencyFilterChange,
    onIndependentFilterChange,
    onTimezoneFilterChange,
  } = useController(CountriesController);

  return (
    <Row gutter={16} className="countries__header__filter">
      <Col span={6}>
        <Typography.Text>
          Country common/native name and capital name
        </Typography.Text>
        <Input
          value={countriesNameFilter}
          onChange={({ target: { value } }) => onNameFilterChange(value)}
        />
      </Col>
      <Col span={6}>
        <Typography.Text>Language</Typography.Text>
        <Select
          value={countriesLanguageFilter}
          options={createSelectOptions(languages)}
          onChange={onLangugeFilterChange}
          className="countries__header__filter__select"
        />
      </Col>
      <Col span={6}>
        <Typography.Text>Region</Typography.Text>
        <Select
          value={countriesRegionFilter}
          onChange={onRegionFilterChange}
          options={createSelectOptions(regions)}
          className="countries__header__filter__select"
        />
      </Col>
      <Col span={6}>
        {countriesRegionFilter && (
          <>
            <Typography.Text>SubRegion</Typography.Text>
            <Select
              value={countriesSubRegionFilter}
              onChange={onSubregionFilterChange}
              options={createSelectOptions(subregions)}
              className="countries__header__filter__select"
            />
          </>
        )}
      </Col>
      <Col span={6}>
        <Typography.Text>Currency</Typography.Text>
        <Select
          value={countriesCurrencyFilter}
          onChange={onCurrencyFilterChange}
          options={createSelectOptions(currencies)}
          className="countries__header__filter__select"
        />
      </Col>
      <Col span={6}>
        <Typography.Text>Timezone</Typography.Text>
        <Select
          value={countriesTimezoneFilter}
          onChange={onTimezoneFilterChange}
          options={createSelectOptions(timezones)}
          className="countries__header__filter__select"
        />
      </Col>
      <Col span={6} className="countries__header__filter__checkbox-container">
        <Typography.Text>Independent</Typography.Text>
        <Checkbox
          checked={countriesIndependentFilter}
          onChange={(e) => onIndependentFilterChange(e.target.checked)}
        />
      </Col>
    </Row>
  );
};
