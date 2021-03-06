export default function makeContactsEndpointHandler({ contactList }) {
    return async function handle(httpRequest) {
        switch (httpRequest.method) {
            case 'POST':
                return postContact(httpRequest);
            case 'GET':
                return getContacts(httpRequest);
            default:
                return makeHttpError({
                    statusCode: 405,
                    errorMessage: `${httpRequest.method} method not allowed.`
                });
        }
    }
}

async function getContacts(httpRequest) {

}

async function postContact(httpRequest) {
    let contactInfo = httpRequest.body;
    if (!contactInfo) {
        return makeHttpError({
            statusCode: 400,
            errorMessage: 'Bad request. No POST body'
        })
    }

    if (typeof httpRequest.body === 'string') {
        try {
            contactInfo = JSON.parse(contactInfo);
        } catch {
            return makeHttpError({
                statusCode: 400,
                errorMessage: 'Bad request. POST body must be valid JSON.'
            })
        }
    }

    try {
        const contact = makeContact(contactInfo);
        const result = await contactList.add(contact);
        return {
            headers: { 'Content-Type': 'application/json' },
            statusCode: 201,
            data: JSON.stringify(result)
        }
    } catch(e) {
        
    }
}