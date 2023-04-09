// import { render, screen } from "@testing-library/react";
// import React from "react";

// import Countries from "../Countries";

// import { CountiresHeader } from "../CountiresHeader";
// import { CountriesTable } from "../CountriesTable";
// import { CountriesPagination } from "../CountriesPagination";
// import { CountryModal } from "../CountryModal";
// import { CountriesController } from "../../CountriesController";
// import { CountriesStore } from "../../CountriesStore";

// // mock useController hook
// jest.mock("../../../../hooks/useController", () => jest.fn());
// import useController from "../../../../hooks/useController";

// // mock useStore hook
// jest.mock("../../../../hooks/useStore", () => jest.fn());
// import useStore from "../../../../hooks/useStore";

// describe("Countries", () => {
//   let onCounterMount;
//   let onSelectedCountryModalClose;
//   let selectedCountry;

//   beforeEach(() => {
//     // mock hook functions
//     onCounterMount = jest.fn();
//     onSelectedCountryModalClose = jest.fn();
//     selectedCountry = {
//       name: "Test Country",
//       population: 1000000,
//       capital: "Test City",
//       languages: ["English", "Spanish"],
//     };
//     useController.mockReturnValue({
//       onCounterMount,
//       onSelectedCountryModalClose,
//     });
//     useStore.mockReturnValue({ selectedCountry });
//   });

//   afterEach(() => {
//     jest.resetAllMocks();
//   });

//   it("should render the component correctly", () => {
//     render(<Countries />);
//     expect(screen.getByTestId("countries")).toBeInTheDocument();
//     expect(screen.getByTestId("countries-header")).toBeInTheDocument();
//     expect(screen.getByTestId("countries-data-container")).toBeInTheDocument();
//     expect(screen.getByTestId("countries-table")).toBeInTheDocument();
//     expect(screen.getByTestId("countries-pagination")).toBeInTheDocument();
//     expect(screen.getByTestId("country-modal")).toBeInTheDocument();
//   });

//   it("should call onCounterMount function on mount", () => {
//     render(<Countries />);
//     expect(onCounterMount).toHaveBeenCalled();
//   });

//   it("should render CountryModal if selectedCountry is truthy", () => {
//     useStore.mockReturnValue({ selectedCountry: { ...selectedCountry } });
//     render(<Countries />);
//     expect(screen.getByTestId("country-modal")).toBeInTheDocument();
//   });

//   it("should not render CountryModal if selectedCountry is falsy", () => {
//     useStore.mockReturnValue({ selectedCountry: null });
//     render(<Countries />);
//     expect(screen.queryByTestId("country-modal")).not.toBeInTheDocument();
//   });

//   it("should call onSelectedCountryModalClose when CountryModal is closed", () => {
//     render(<Countries />);
//     const closeButton = screen.getByTestId("country-modal-close-button");
//     expect(closeButton).toBeInTheDocument();
//     closeButton.click();
//     expect(onSelectedCountryModalClose).toHaveBeenCalled();
//   });
// });
