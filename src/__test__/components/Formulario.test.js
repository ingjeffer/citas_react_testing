import { toBeInTheDocument } from '@testing-library/jest-dom/dist/matchers';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Formulario from '../../components/Formulario';

import * as uuid from 'uuid';


const crearCita = jest.fn();
jest.mock('uuid');
// const uuidMock = jest.mock('uuid', () => '101010');

afterEach(cleanup); // No es necesario para las últimas versiones

xtest('<Formulario /> cargar el formulario y revisar que todo sea correcto', () => {
    // const view = render(<Formulario />);
    // view.debug();

    // const { getByText } = render(<Formulario />);
    render(<Formulario />);
    expect(screen.getByText('Crear Cita')).toBeInTheDocument();
    // console.log(screen.getByTestId('titulo').textContent);
    expect(screen.getByTestId('titulo').tagName).toEqual('H2');
    expect(screen.getByTestId('titulo').tagName).not.toEqual('H1');
    expect(screen.getByTestId('titulo').textContent).toEqual('Crear Cita');


    expect(screen.getByTestId('btn-submit').tagName).toBe('BUTTON');
});

test('<Formulario /> cargar el formulario y revisar que todo sea correcto 2', () => {


    render(<Formulario crearCita={crearCita}/>);
    expect(screen.getByText('Crear Cita')).toBeInTheDocument();
    // console.log(screen.getByTestId('titulo').textContent);
    expect(screen.getByTestId('titulo').tagName).toEqual('H2');
    expect(screen.getByTestId('titulo').tagName).not.toEqual('H1');
    expect(screen.getByTestId('titulo').textContent).toEqual('Crear Cita');


    expect(screen.getByTestId('btn-submit').tagName).toBe('BUTTON');
});

test('<Formulario /> Validación de formulario', () => {
    render(<Formulario crearCita={crearCita}/>);

    const btnSubmit = screen.getByTestId('btn-submit');
    fireEvent.click(btnSubmit);

    expect(screen.getByTestId('alerta')).toBeInTheDocument();
    expect(screen.getByTestId('alerta').textContent).toBe('Todos los campos son obligatorios');
});

test('<Formulario /> Validación de formulario 2', () => {
    render(<Formulario crearCita={crearCita}/>);

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

    jest.spyOn(uuid, 'v4').mockReturnValue('101010');

    const btnSubmit = screen.getByTestId('btn-submit');
    // fireEvent.click(btnSubmit);
    userEvent.click(btnSubmit);

    // Revisar la alerta
    const alerta = screen.queryByTestId('alerta'); // queryByTestId: el elemento que consulta puede o no existir
    expect(alerta).not.toBeInTheDocument();

    // Valida crear Cita
    expect(crearCita).toHaveBeenCalled();
    expect(crearCita).toHaveBeenCalledTimes(1);

    // uuidMock.mockReturnValue('101010');

    const obj = {
        "fecha": "2022-03-22",
        "hora": "12:00",
        "id": "101010",
        "mascota": "Hook",
        "propietario": "Juan",
        "sintomas": "Fiebre",
    }
    expect(crearCita).toHaveBeenCalledWith(obj);
});