import React from "react";
import { render, fireEvent } from "@testing-library/react";
import FamiliaForm from "../components/FamiliaForm";
import { ArbolProvider } from "../context/ArbolContext";

test("Debe registrar un familiar con éxito", () => {
  const { getByLabelText, getByText } = render(
    <ArbolProvider>
      <FamiliaForm />
    </ArbolProvider>
  );

  fireEvent.change(getByLabelText(/Nombre/i), { target: { value: "Juan" } });
  fireEvent.change(getByLabelText(/Edad/i), { target: { value: "30" } });
  fireEvent.change(getByLabelText(/Grado/i), { target: { value: "1" } });
  fireEvent.click(getByText(/Registrar/i));

  
});
