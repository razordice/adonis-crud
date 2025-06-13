/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js';
import ApiProductsController from '#controllers/api/api_products_controller';
import ProductsController from '#controllers/products_controller';
import ApiAuthController from '#controllers/api/api_auth_controller';
import AuthController from '#controllers/auth_controller';


router.group(() => {
    router.resource('products', ProductsController)
}).use([middleware.csrf()])

router.get('/login', [AuthController, 'login'])
router.get('/register', [AuthController, 'register'])

// Protected routes
router.group(() => {
    router.post('/register', [ApiAuthController, 'register'])
    router.post('/login', [ApiAuthController, 'login'])
    
    router.group(() => {
        router.get('/profile', [ApiAuthController, 'profile'])
        router.get('/products', [ApiProductsController, 'index'])
        router.post('/products', [ApiProductsController, 'store'])
        router.get('/products/:id', [ApiProductsController, 'show'])
        router.put('/products/:id', [ApiProductsController, 'update'])
        router.delete('/products/:id', [ApiProductsController, 'destroy'])
    }).use(middleware.auth())
    // Product routes dengan JWT
}).prefix('/api').use(middleware.api())