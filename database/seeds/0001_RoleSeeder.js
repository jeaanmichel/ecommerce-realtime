'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Role = use('Role')

class RoleSeeder {
  async run () {
    // Define o cargo de administrador do sistema
    await Role.create({
      name: 'Admin',
      slug: 'admin',
      description: 'System Administrator'
    })
    // Define o cargo de gerente da loja
    await Role.create({
      name: 'Manager',
      slug: 'manager',
      description: 'Store manager'
    })

    // Define o cargo de cliente da loja
    await Role.create({
      name: 'Customer',
      slug: 'customer',
      description: 'Store customer'
    })
  }
}

module.exports = RoleSeeder
