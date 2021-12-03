import { render } from '@testing-library/react';
import App from './App';
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'
import '@testing-library/jest-dom'

describe('Testing router path rendering/navigating', () => {
  it("the empty path should navigate to the /truck/create route", () => {
      const history = createMemoryHistory()
      render(
        <Router history={history}>
          <App />
        </Router>,
      )
      
      history.push("/")

      // check that the content changed to the new page
      expect(history.entries[0].pathname).toBe('/truck/create')
  })

  it("the unknown path should navigate to the /truck/create route", () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <App />
      </Router>,
    )
    
    history.push("/a/b/c")

    // check that the content changed to the new page
    expect(history.entries[0].pathname).toBe('/truck/create')
})

})