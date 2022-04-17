const { Command } = require("commander");
const api = require("./api/contacts");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      api.listContacts();
      break;

    case "get":
      api.getContactById(id);
      break;

    case "search":
      api.searchContact(name);
      break;

    case "add":
      api.addContact({ name, email, phone });
      break;

    case "remove":
      api.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

(async () => {
  await invokeAction(argv);
})();
