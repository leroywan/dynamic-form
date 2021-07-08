import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { DynamicForm } from "../../components";
import { testData } from "../../testData";

const setup = () => {
  const utils = render(<DynamicForm formFields={testData} />);
  const dateOfBirth = utils.getByLabelText("Date of Birth");
  return {
    dateOfBirth,
    ...utils,
  };
};

test("renders all non-conditional fields", () => {
  setup();
  [
    "First Name",
    "Last Name",
    "Email Address",
    "Phone Number",
    "Job Title",
    "Date of Birth",
  ].forEach((labelName) => {
    const labelElement = screen.getByText(labelName);
    expect(labelElement).toBeInTheDocument();
  });
});

test("does not render conditional fields on load", () => {
  setup();
  const labelElement = screen.queryByText("Parental Consent");
  expect(labelElement).not.toBeInTheDocument();
});

test("renders conditional fields on valid conditional", () => {
  let today = new Date().toISOString().slice(0, 10);
  const { dateOfBirth } = setup();
  fireEvent.change(dateOfBirth, { target: { value: today } });
  const labelElement = screen.queryByText("Parental Consent");
  expect(labelElement).toBeInTheDocument();
});

test("does not render conditional fields on invalid conditional", () => {
  const { dateOfBirth } = setup();
  fireEvent.change(dateOfBirth, { target: { value: "0000-01-01" } });
  const labelElement = screen.queryByText("Parental Consent");
  expect(labelElement).not.toBeInTheDocument();
});
