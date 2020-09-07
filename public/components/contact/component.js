class Contact extends HTMLElement {
    constructor() {
        super();

        // Create a shadow root
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        // Fetch the contact object from the attribute
        const contactObj = JSON.parse(this.getAttribute('contact'));

        // Apply external styles to the shadow DOM
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'public/components/contact/component.css');

        // Create Contact card html elements
        const card = document.createElement('li');
        card.setAttribute('class', 'card');

        const headerDiv = card.appendChild(document.createElement('div'));
        headerDiv.setAttribute('class', 'cardHeader');
        const contactName = headerDiv.appendChild(document.createElement('h5'));
        contactName.setAttribute('class', 'contactName');
        contactName.textContent = contactObj.FirstName + ' ' + contactObj.LastName;
        const buttonsDiv = headerDiv.appendChild(document.createElement('div'));
        buttonsDiv.setAttribute('class', 'buttonsDiv');
        const editButton = buttonsDiv.appendChild(document.createElement('div'));
        editButton.setAttribute('class', 'editButton');
        const editIcon = editButton.appendChild(document.createElement('img'));
        editIcon.setAttribute('src', 'public/images/edit.svg');
        const deleteButton = buttonsDiv.appendChild(document.createElement('div'));
        deleteButton.setAttribute('class', 'deleteButton');
        const deleteIcon = deleteButton.appendChild(document.createElement('img'));
        deleteIcon.setAttribute('src', 'public/images/delete.svg');

        const bodyDiv = card.appendChild(document.createElement('div'));
        bodyDiv.setAttribute('class', 'cardBody');
        const phoneInfo = bodyDiv.appendChild(document.createElement('p'));
        phoneInfo.setAttribute('class', 'phoneInfo');
        phoneInfo.innerHTML = 'Phone Number: '.bold() + contactObj.Phone;
        const emailInfo = bodyDiv.appendChild(document.createElement('p'));
        emailInfo.setAttribute('class', 'emailInfo');
        emailInfo.innerHTML = 'Email Address: '.bold() + contactObj.EmailAddress;
        const addressInfo = bodyDiv.appendChild(document.createElement('p'));
        addressInfo.setAttribute('class', 'addressInfo');
        addressInfo.innerHTML = 'Home Address: '.bold() + contactObj.HomeAddress;

        // Attach the created elements to the shadow DOM
        this.shadowRoot.append(linkElem);
        this.shadowRoot.append(card);
    }
}

customElements.define('contact-element', Contact);