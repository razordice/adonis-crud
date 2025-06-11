import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product';
import { validationData } from "#validators/post";

export default class ApiProductsController {
    // Menampilkan semua produk
    public async index({ response }: HttpContext) {
        const products = await Product.all()
        return response.ok(products)
    }

    // Menyimpan produk baru
    public async store({ request, response }: HttpContext) {
        try {
            const data = request.all()
            const payload = await validationData.validate(data)
            const product = await Product.create(payload)
            return response.created(product)
        } catch (error) {
            return response.badRequest(error.messages)
        }
    }

    // Menampilkan detail produk
    public async show({ params, response }: HttpContext) {
        try {
            const product = await Product.findOrFail(params.id)
            return response.ok(product)
        } catch (error) {
            return response.notFound({ message: 'Product not found' })
        }
    }

    // Mengupdate produk
    public async update({ params, request, response }: HttpContext) {
        try {
            const product = await Product.findOrFail(params.id)
            const data = request.all()
            const payload = await validationData.validate(data)
            // const payload = await request.validate({ schema: this.validationData })
            product.merge(payload)
            await product.save()
            return response.ok(product)
        } catch (error) {
            if (error.code === 'E_ROW_NOT_FOUND') {
            return response.notFound({ message: 'Product not found' })
        }
            return response.badRequest(error.messages)
        }
    }

    // Menghapus produk
    public async destroy({ params, response }: HttpContext) {
        try {
            const product = await Product.findOrFail(params.id)
            await product.delete()
            return response.noContent()
        } catch (error) {
            return response.notFound({ message: 'Product not found' })
        }
    }
}
