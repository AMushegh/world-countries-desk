import React, { useEffect } from "react";

import useController from "../../../hooks/useController";
import useStore from "../../../hooks/useStore";

import { CountriesController } from "../CountriesController";
import { CountriesStore } from "../CountriesStore";

import { CountriesPagination } from "./CountriesPagination";
import { CountriesTable } from "./CountriesTable";
import { CountiresHeader } from "./CountiresHeader";
import { CountryModal } from "./CountryModal";

const Countries = () => {
  const { onCounterMount, onSelectedCountryModalClose } =
    useController(CountriesController);

  const { selectedCountry } = useStore(CountriesStore, ["selectedCountry"]);

  useEffect(() => {
    onCounterMount();
  }, []);

  return (
    <>
      <div className="countries">
        <CountiresHeader />
        <div className="countries__data__container">
          <CountriesTable />
          <CountriesPagination />
        </div>
      </div>
      {selectedCountry ? (
        <CountryModal
          country={selectedCountry}
          onClose={onSelectedCountryModalClose}
        />
      ) : null}
    </>
  );
};

export default Countries;
