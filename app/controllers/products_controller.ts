import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product';
import Role from '#models/role'
import { validationData } from "#validators/post";

export default class ProductsController {
    // Menampilkan semua produk
    public async index({ view }: HttpContext) {
        const products = await Product.all()
        return view.render('product/index', { products });
    }

    public async create({ view }: HttpContext) {
        return view.render('product/create')
    }

    // Menyimpan produk baru

    public async store({ request, response }: HttpContext) {
        const data = request.all()
        const payload = await validationData.validate(data)
        await Product.create(payload) 
        return response.redirect('/products')
    }

    // Menampilkan detail produk
    public async show({ params, view }: HttpContext) {
        const product = await Product.findOrFail(params.id)
        return view.render('product/show', { product })
    }

    public async edit({ params, view }: HttpContext) {
        const product = await Product.findOrFail(params.id)
        return view.render('product/edit', { product })
    }

    // Mengupdate produk
    public async update({ params, request, response }: HttpContext) {
        
        const data = request.all()
        // console.log('1======>',data);
        
        const payload = await validationData.validate(data)
        // console.log('2=====>',payload);
        
        const product = await Product.findOrFail(params.id)
        product.merge(payload)

        await product.save();
        return response.redirect('/products')
    }

    // Menghapus produk
    public async destroy({ params, response }: HttpContext) {
        const product = await Product.findOrFail(params.id)
        await product.delete()
        return response.redirect('/products')
    }
}
