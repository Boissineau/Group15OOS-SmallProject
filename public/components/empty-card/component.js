class EmptyCard extends HTMLElement {
    constructor() {
        super();

        // Create a shadow root
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        // Apply external styles to the shadow DOM
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'public/components/empty-card/component.css');

        // Create Contact card html elements
        const card = document.createElement('li');
        card.setAttribute('class', 'card');

        const headerDiv = card.appendChild(document.createElement('div'));
        headerDiv.setAttribute('class', 'cardHeader');
        const emptyHeader = headerDiv.appendChild(document.createElement('h5'));
        emptyHeader.setAttribute('class', 'cardHeaderText');
        emptyHeader.textContent = 'No Contacts Found';

        const bodyDiv = card.appendChild(document.createElement('div'));
        bodyDiv.setAttribute('class', 'cardBody');
        const emptyInfo = bodyDiv.appendChild(document.createElement('p'));
        emptyInfo.setAttribute('class', 'cardBodyText');
        const searchString = this.getAttribute('searchString');
        if (searchString) {
            emptyInfo.innerHTML = 'No contacts were found with the following search query: ' + searchString;
        } else {
            emptyInfo.innerHTML = 'You have not added any contacts yet! Click the blue plus sign next to the search bar to add your first contact.';
        }

        // Attach the created elements to the shadow DOM
        this.shadowRoot.append(linkElem);
        this.shadowRoot.append(card);
    }
}

customElements.define('empty-card', EmptyCard);