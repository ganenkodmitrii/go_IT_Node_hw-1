const { Command } = require('commander')
const api = require('./api/contacts')

const program = new Command()
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone')

program.parse(process.argv)

const argv = program.opts()
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await api.listContacts()
      console.table(contacts)
      break

    case 'get':
      const contact = await api.getContactById(id)
      console.table(contact)
      break

    case 'add':
      api.addContact(name, email, phone)
      break

    case 'remove':
      api.removeContact(id)
      break

    default:
      console.warn('\x1B[31m Unknown action type!')
  }
}

invokeAction(argv)
