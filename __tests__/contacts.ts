const { listContacts, getContactById, searchContact, addContact, removeContact } = require('../api/contacts')

const id = 22626
const contact = 'Allen'

describe('API', () => {
  it(`Should get contacts list`, async () => {
    const list = await listContacts()

    expect(typeof list === 'object').toBe(true)
  })

  it(`Should find contact with id ${id} (Number)`, async () => {
    const list = await getContactById(id)

    expect(typeof list !== 'string').toBe(true)
  })

  it(`Should find ${contact} phone`, async () => {
    const { phone } = await searchContact(contact)

    expect(typeof phone === 'string').toBe(true)
  })

  it(`Add new contact`, async () => {
    const err = await addContact({ id: 'test', name: `${contact} 2` })

    expect(typeof err !== 'string').toBe(true)
  })

  it(`Remove ${contact} 2`, async () => {
    const err = await removeContact('test')

    expect(typeof err !== 'string').toBe(true)
  })
})
