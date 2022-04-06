// import { render, screen } from '@testing-library/react';
// import App from './App';

import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

import axios from 'axios';

jest.mock('axios');


// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('<App /> La aplicación funciona bien la primera vez', () => {
    // const wrapper = render(<App />);
    // wrapper.debug();
    render(<App />);

    expect(screen.getByText('Administrador de Pacientes')).toBeInTheDocument();
    expect(screen.getByTestId('nombre-app').textContent).toBe('Administrador de Pacientes')
    expect(screen.getByTestId('nombre-app').tagName).toBe('H1')
    
    expect(screen.getByText('No hay citas')).toBeInTheDocument();
    expect(screen.getByText('Crear Cita')).toBeInTheDocument();
});

test('<App /> Valida agregar cita', () => {
    render(<App />);

    fireEvent.change(screen.getByTestId('mascota'), {
        target: {
            value: 'Hook',
        },
    });
    fireEvent.change(screen.getByTestId('propietario'), {
        target: {
            value: 'Juan',
        },
    });

    
    userEvent.type(screen.getByTestId('sintomas'), 'Fiebre');
    userEvent.type(screen.getByTestId('fecha'), '2022-03-22');
    userEvent.type(screen.getByTestId('hora'), '12:00');


    const btnSubmit = screen.getByTestId('btn-submit');
    // fireEvent.click(btnSubmit);
    userEvent.click(btnSubmit);

    // Revisar la alerta
    const alerta = screen.queryByTestId('alerta'); // queryByTestId: el elemento que consulta puede o no existir
    expect(alerta).not.toBeInTheDocument();


    // Revisar por el titulo dinamico
    expect(screen.getByTestId('titulo-dinamico').textContent).toBe('Administra tus Citas');
    expect(screen.getByTestId('titulo-dinamico').textContent).not.toBe('No hay citas');
});

test('<App /> Verificar las citas en el DOM', async () => {
    render(<App />);

    const citas = await screen.findAllByTestId('cita');
    console.log(citas);


    expect(citas).toMatchSnapshot();
});


test('Simula axios', () => {
    const data = {
        data: {
          hits: [
            {
              objectID: '1',
              title: 'a',
            },
            {
              objectID: '2',
              title: 'b',
            },
          ],
        },
      };
  
    axios.get.mockImplementationOnce(() => Promise.resolve(data));
})