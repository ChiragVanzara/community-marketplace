import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './Views/LandingPage'
import SignInPage from './Views/SigInPage/SignInPage'
import SignUpPage from './Views/SignUpPage/SignUpPage'
import HomePage from './Views/HomePage/HomePage'
import { AuthProvider } from './context/AuthProvider'
import ProfilePage from './Views/ProfilePage/ProfilePage'
import ProductManagmentPage from './Views/ProductManagmentPage/ProductManagmentPage'
import SellProductPage from './Views/SellProductPage/SellProductPage'
import { ProductProvider } from './context/ProductProvider'

const App = () => {

  return (
    <div className='h-screen'>
      <ProductProvider>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/sign-in' element={<SignInPage />} />
            <Route path='/sign-up' element={<SignUpPage />} />
            <Route path='/my-profile' element={<ProfilePage />} />
            <Route path='/products' element={<ProductManagmentPage />} />
            <Route path='/sell-product' element={<SellProductPage />} />
          </Routes>
        </AuthProvider>
      </ProductProvider>
    </div>
  )
}

export default App
