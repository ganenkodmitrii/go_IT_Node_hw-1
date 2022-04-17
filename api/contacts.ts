const fs = require("fs").promises;
const path = require("path");
const generateUniqueId = require("generate-unique-id");

const contactsPath = path.join(__dirname, "../db/contacts.json");

export async function listContacts() {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath));
    console.table(contacts);
    return contacts;
  } catch (err) {
    return err.message;
  }
}

export async function getContactById(contactId) {
  const numberId = Number(contactId);
  try {
    const foundContact = JSON.parse(await fs.readFile(contactsPath)).find(
      (contact) => contact.id === numberId
    );
    console.table(foundContact);
    return foundContact || "Contact not found";
  } catch (err) {
    return err.message;
  }
}

export async function searchContact(value) {
  try {
    const foundContact = JSON.parse(await fs.readFile(contactsPath)).find(
      (contact) => contact.name.includes(value)
    );
    console.table(foundContact);
    return foundContact || "Contact not found";
  } catch (err) {
    return err.message;
  }
}

export async function removeContact(contactId) {
  const numberId = Number(contactId);
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath)).filter(
      (contact) => contact.id !== numberId
    );
    console.table(contacts);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (err) {
    return err.message;
  }
}

export async function addContact({ id: defaultId, name, email, phone }) {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath));
    const id =
      defaultId || Number(generateUniqueId({ length: 5, useLetters: false }));
    contacts.push({ id, name, email, phone });
    console.table(contacts);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (err) {
    return err.message;
  }
}
