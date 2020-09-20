import { getUserID, fetchContactList } from '../../js/contactList.js';

class ContactList extends HTMLElement {
    constructor() {
        super();

        this.root = document.createElement('div');

        // Create a shadow root
        this.attachShadow({mode: 'open'});
    }

    updateContactList(contacts, error, searchString) {
        while (this.root.childNodes.length > 0) this.root.removeChild(this.root.childNodes[0]);
        if (contacts && contacts.length > 0) {
            for (let i = 0; i < contacts.length; i++) {
                const contact = contacts[i];
                const contactElement = document.createElement('contact-element');
                contactElement.setAttribute('contact', JSON.stringify(contact));
                this.root.append(contactElement);
            }
        } else {
            const emptyCard = document.createElement('empty-card');
            console.log(searchString);
            emptyCard.setAttribute('searchString', searchString);
            this.root.append(emptyCard);
        }
    }

    connectedCallback() {
        // Fetch the user ID
        const userID = getUserID();

        // Initialize the contact list on first load
        const jsonResponse = fetchContactList(getUserID(), '');
        this.updateContactList(jsonResponse.contacts, jsonResponse.error, '');

        // Apply external styles to the shadow DOM
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'public/components/contact/component.css');

        // Attach the created elements to the shadow DOM
        this.shadowRoot.append(linkElem);
        this.shadowRoot.append(this.root);
    }
}

customElements.define('contact-list', ContactList);