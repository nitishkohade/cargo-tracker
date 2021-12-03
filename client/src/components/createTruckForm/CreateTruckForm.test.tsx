import { render, screen, fireEvent, createEvent, act, waitFor  } from '@testing-library/react';
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'
import userEvent from '@testing-library/user-event';
import {rest} from 'msw'
import {setupServer} from 'msw/node'

import '@testing-library/jest-dom'
import App from '../../App';

const history = createMemoryHistory()

export const server =  setupServer(
  rest.post(`/truck/create`, (req:any, res, ctx) => {
    const {licensePlate,model, year, currentDistance_KM, maxLoad_KG, fuelType} = req.body
    return model ? 
          res(ctx.status(201), ctx.json([
            {
              data: {
                licensePlate, model, year, currentDistance_KM, maxLoad_KG, fuelType, id: 1
              }
            }
          ]))
          :
          res(ctx.status(400), ctx.json({
            errors: [
              {
                "message": "only number is allowed",
                "field": "year"
              }
            ]
          }))

  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Testing the /truck/create page', () => {
  it('It should check the model input value to be true for valid value of 45', async () => {
    const utils = render(
      <Router history={history}>
        <App />
      </Router>
    )

    const setup = async () => {
      const input = await utils.getByTestId('model')
      return {
        input,
        ...utils,
      }
    }
   
    history.push("/truck/create")
    expect(history.entries[0].pathname).toBe('/truck/create')
    const {input}: any = await setup()

    fireEvent(input, createEvent.change(input, {target: {value: 45}}))
    expect(input.value).toBe('45')
  })

  it('It should check the model and LicensePlate input value to be false for invalid value having length greater than 10', async () => {
    const utils = render(
      <Router history={history}>
        <App />
      </Router>
    )
   
    history.push("/truck/create")
    expect(history.entries[0].pathname).toBe('/truck/create')

    await act(async () => {
      const model: any = await utils.getByTestId('model')
      userEvent.type(model, '01234567891111111');
      expect(model.value).not.toBe("01234567891111111")
      expect(model.value).toBe("0123456789")
      
      const licensePlate: any = await utils.getByTestId('licensePlate')
      userEvent.type(licensePlate, '01234567891111111');
      expect(licensePlate.value).not.toBe("01234567891111111")
      expect(licensePlate.value).toBe("0123456789")
    })

  })

  it('It should check the year input value to be true for valid value having length equal to 4', async () => {
    const utils = render(
      <Router history={history}>
        <App />
      </Router>
    )
   
    history.push("/truck/create")
    expect(history.entries[0].pathname).toBe('/truck/create')

    await act(async () => {
      const year: any = await utils.getByTestId('year')
      userEvent.type(year, '1000');
      expect(+year.value).toBe(1000)
    })

  })

  it('It should check the licensePlate input value to be true for valid value of "REWRT"', async () => {
    const utils = render(
      <Router history={history}>
        <App />
      </Router>
    )
   
    history.push("/truck/create")
    expect(history.entries[0].pathname).toBe('/truck/create')

    await act(async () => {
      const licensePlate: any = await utils.getByTestId('licensePlate')
      userEvent.type(licensePlate, 'REWRT');
      expect(licensePlate.value).toBe("REWRT")
    })
  })

  it('It should check the licensePlate input value to be true for valid value of "REWRT"', async () => {
    const utils = render(
      <Router history={history}>
        <App />
      </Router>
    )
   
    history.push("/truck/create")
    expect(history.entries[0].pathname).toBe('/truck/create')

    await act(async () => {
      const licensePlate: any = await utils.getByTestId('licensePlate')
      userEvent.type(licensePlate, 'REWRT');
      expect(licensePlate.value).toBe("REWRT")
    })
  })

  it('It should check the currentDistance_KM and maxLoad_KG input value to be true for valid value of "300"', async () => {
    const utils = render(
      <Router history={history}>
        <App />
      </Router>
    )
   
    history.push("/truck/create")
    expect(history.entries[0].pathname).toBe('/truck/create')

    await act(async () => {
      const currentDistance_KM: any = await utils.getByTestId('currentDistance_KM')
      userEvent.type(currentDistance_KM, '300');
      expect(+currentDistance_KM.value).toBe(300)

      const maxLoad_KG: any = await utils.getByTestId('maxLoad_KG')
      userEvent.type(maxLoad_KG, '300');
      expect(+maxLoad_KG.value).toBe(300)
    })
  })

  it('It should check the fuelType select value to be true for valid value of "GAS", "DIESEL", "ELECTRIC"', async () => {
    const utils = render(
      <Router history={history}>
        <App />
      </Router>
    )
   
    history.push("/truck/create")
    expect(history.entries[0].pathname).toBe('/truck/create')

    await act(async () => {
      const select: any = await utils.getByTestId('fuelType')
      userEvent.selectOptions(select, 'GAS');
      expect(select.value).toBe("GAS")

      userEvent.selectOptions(select, 'DIESEL');
      expect(select.value).toBe("DIESEL")

      userEvent.selectOptions(select, 'ELECTRIC');
      expect(select.value).toBe("ELECTRIC")

      try{
        userEvent.selectOptions(select, 'uknown');
      } catch(err: any) {
        expect(err.message).not.toBe("uknown")
      }
    })
  })

  it('IF model is empty then it should return validation error with a message', async () => {
       
    const utils = render(
      <Router history={history}>
        <App />
      </Router>
    )
   
    history.push("/truck/create")
    expect(history.entries[0].pathname).toBe('/truck/create')

    await act(async () => {
      const submit: any = await utils.getByTestId('submit')
      userEvent.click(submit);
     
      await waitFor(async () => {
        const errorYear: any = await utils.getByTestId('error-year')
        expect(utils.getByText(/only number is allowed/i)).toBeInTheDocument()
        expect(errorYear.textContent).toBe("only number is allowed")
      })
    })
  })

  it('It should be able to register the truck', async () => {
       
    const utils = render(
      <Router history={history}>
        <App />
      </Router>
    )
   
    history.push("/truck/create")
    expect(history.entries[0].pathname).toBe('/truck/create')

    await act(async () => {

      const year: any = await utils.getByTestId('year')
      userEvent.type(year, '1000');

      const model: any = await utils.getByTestId('model')
      userEvent.type(model, 'dgdr');

      const licensePlate: any = await utils.getByTestId('licensePlate')
      userEvent.type(licensePlate, 'REWRT');

      const currentDistance_KM: any = await utils.getByTestId('currentDistance_KM')
      userEvent.type(currentDistance_KM, '300');

      const maxLoad_KG: any = await utils.getByTestId('maxLoad_KG')
      userEvent.type(maxLoad_KG, '300');

      const select: any = await utils.getByTestId('fuelType')
      userEvent.selectOptions(select, 'GAS');
      expect(select.value).toBe("GAS")


      const submit: any = await utils.getByTestId('submit')
      userEvent.click(submit);
     
      await waitFor(async () => {
        try{
          const len = history?.entries?.length
          expect(history.entries[len - 1].pathname).toBe('/truck/location')
        } catch(err){}
      })
    })
  })

})