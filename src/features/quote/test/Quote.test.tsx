import { rest } from "msw";
import { setupServer } from "msw/node";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import Cita from "../Cita";
import { API_URL } from "../../../app/constants";
import mockedData from "./mockeddata.json"

const testedQuery = mockedData.map((q) => q.query);

export const handlers = [
    rest.get(API_URL, (req, res, ctx) => {
    const character: string | null = req.url.searchParams.get("character");

    if(testedQuery.includes(character as string)){
      const quote = mockedData.find((q) => q.query === character);
      return res(ctx.json([quote?.result]),  ctx.status(200))
    }
    if(character && !testedQuery.includes(character as string)){
      return res(ctx.json(/Por favor ingrese un nombre válido/i), ctx.delay(150), ctx.status(404))
    }
    if (!character) {
      return res(ctx.json(mockedData[2].result), ctx.delay(150), ctx.status(200));
    } 
    return res(ctx.json([]))
  }),

];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

const renderCitaComponent=()=>{
    render(
        <Provider store={store}>
            <Cita />
        </Provider>  
        
    );
}

describe("Quote component", () => {
  describe("When the component is loaded by default", () => {

    test("Should render correctly", async () => {
      renderCitaComponent()
      expect(screen.getByPlaceholderText(/ingresa el nombre del autor/i)).toBeInTheDocument();
      expect(screen.getByRole('button',{name: /obtener cita aleatoria/i })).toBeInTheDocument();
      expect(screen.getByRole('button',{name: /borrar/i })).toBeInTheDocument();
    });

    test("Should display a 'None quote found' message", async () => {
      renderCitaComponent()
      const input = screen.getByRole('textbox', {name:'Author Cita'}); 
      expect(screen.getByText(/no se encontro ninguna cita/i)).toBeInTheDocument();
      expect(input).toHaveValue("");
    });
  });

  describe("When the query is running", () => {
    test("Should display a LOADING message when the input is complete", async () => {
      renderCitaComponent()
        const button: HTMLElement = screen.getByLabelText("Obtener cita aleatoria")
        userEvent.click(button);
        await waitFor(()=> {
            expect(screen.getByText(/cargando/i)).toBeInTheDocument();
        })
        })
    });

  describe("When the query is executed successfully completing the input", () => {
    test("Should not show a LOADING message", async () => {
        await waitFor(() => {
          expect(screen.queryByText(/cargando/i)).not.toBeInTheDocument();
        });
      });

    test("Show display the name of the author", async () => {
    renderCitaComponent();
    const input = screen.getByRole('textbox', {name:'Author Cita'});
    const buttonSearch = await screen.findByText(/obtener Cita/i);

    fireEvent.change(input, { target: { value: "ralp" }})
  
    fireEvent.click(buttonSearch);
    await waitFor(()=>{
        expect(screen.getByText(mockedData[0].result.character)).toBeInTheDocument()
    })
    
    });

    test("Show display the quote of the author", async () => {
        renderCitaComponent();
        const input = screen.getByRole('textbox', {name:'Author Cita'});
        const buttonSearch = await screen.findByText(/obtener Cita/i);
    
        fireEvent.change(input, { target: { value: "ralp" }})
      
        fireEvent.click(buttonSearch);
        await waitFor(()=>{
            expect(screen.getByText(mockedData[0].result.quote)).toBeInTheDocument()
        })
    });

    test("Should display a 'Please enter a valid name' message when completing in with an invalid name", async() =>{
        renderCitaComponent();
        const input = screen.getByRole('textbox', {name:'Author Cita'});
        const buttonSearch = await screen.findByText(/obtener Cita/i);
        userEvent.click(input);
        userEvent.keyboard('homero')
        userEvent.click(buttonSearch);
        await waitFor(()=>{
            expect(screen.getByText(/Por favor ingrese un nombre válido/i)).toBeInTheDocument()
        })
    })
   })

  });

  describe("When the query executes successfully not completing the input", ()=>{
    test("Should clear the input by clicking the delete button.", async()=>{
        renderCitaComponent();
        const input = screen.getByRole('textbox', {name:'Author Cita'});
        await userEvent.type(input, 'lisa')
        const btn = await screen.findByText(/Obtener cita/i);
        userEvent.click(btn);
        const buttonClear = await screen.findByLabelText(/Borrar/i)
        userEvent.click(buttonClear);
        await waitFor(()=>{
            expect(screen.getByText(/No se encontro ninguna cita/i)).toBeInTheDocument()
        })
    })
});
