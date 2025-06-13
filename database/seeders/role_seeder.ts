import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Role.createMany([
      {
        name: 'admin',
      },
      {
        name: 'user',
      },
    ])
    // Write your database queries inside the run method
  }
}