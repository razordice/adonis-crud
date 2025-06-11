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

router.group(() => {
    router.get('/products', [ApiProductsController, 'index'])
    router.post('/products', [ApiProductsController, 'store'])
    router.get('/products/:id', [ApiProductsController, 'show'])
    router.put('/products/:id', [ApiProductsController, 'update'])
    router.delete('/products/:id', [ApiProductsController, 'destroy'])
}).use(middleware.api()).prefix('/api')

// router.on('/products').render('pages/home')

router.group(() => {
    router.resource('products', ProductsController)
}).use(middleware.csrf())

