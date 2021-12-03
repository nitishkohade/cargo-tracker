import { render, screen } from '@testing-library/react';
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'

import '@testing-library/jest-dom'
import App from '../../App';

describe('Testing the /truck/create page', () => {
  it('It should check all the input fields', () => {
    const history = createMemoryHistory()
    render(
        <Router history={history}>
            <App />
        </Router>
    )
    
    history.push("/truck/create")

    expect(history.entries[0].pathname).toBe('/truck/create')
    expect(screen.getByText(/Please input your Truck ID If you know./i)).toBeInTheDocument()
  })
})