import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './utils/auth.context';

import './assets/css/global.css';

import Navbar from './components/navbar';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import About from './components/about';
import MyRecipes from './components/my-recipes';
import Settings from './components/settings';
import Recipe from './components/recipe';
import AddRecipe from './components/add-recipe';
import RecipeListExtended from './components/recipe-list-extended';
import NotFound from './components/not-found';

import ProtectedRoute from './components/protected.route.js';

function App() {
  return (
    <div className="container">
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <div className="content">
            <Routes>
              <Route path={'*'} element={<NotFound />} />
              <Route path={'/'} element={<Home />} />
              <Route path={'/login'} element={<Login />} />
              <Route path={'/register'} element={<Register />} />
              <Route path={'/about'} element={<About />} />
              <Route
                path={'/my-recipes'}
                element={
                  <ProtectedRoute>
                    <MyRecipes />
                  </ProtectedRoute>
                }
              />
              <Route
                path={'/my-recipes/list'}
                element={
                  <ProtectedRoute>
                    <RecipeListExtended />
                  </ProtectedRoute>
                }
              />
              <Route
                path={'/recipe/:id'}
                element={
                  <ProtectedRoute>
                    <Recipe />
                  </ProtectedRoute>
                }
              />
              <Route
                path={'/add-recipe'}
                element={
                  <ProtectedRoute>
                    <AddRecipe />
                  </ProtectedRoute>
                }
              />
              <Route path={'/settings'} element={<Settings />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
