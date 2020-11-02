const database = makeDb();
const contactList = makeContactList({ database });
const contactsEndpointHandler = makeContactsEndpointHandler({ contactList });

export default contactsEndpointHandler;