import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import store from './Store/store.jsx'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<App />} />
            <Route exact path="/:hero" element={<App />} />
            <Route path="/:selectedCharacterName/patch/:year/:month/:day" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
