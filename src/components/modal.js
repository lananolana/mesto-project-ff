const handleEscUp = (evt) => {
    if (evt.key === 'Escape') {
        const openedModal = document.querySelector(".popup_is-opened");
        closeModal(openedModal);
    }
}

const openModal = (modalElement) => {
    modalElement.classList.add('popup_is-opened');
    document.addEventListener('keyup', handleEscUp);
}

const closeModal = (modalElement) => {
    modalElement.classList.remove('popup_is-opened');
    document.removeEventListener('keyup', handleEscUp);
}

const setCloseModalEventListeners = (modalElement) => {
    const closeButtonElement = modalElement.querySelector('.popup__close');
    closeButtonElement.addEventListener('click', () => {
        closeModal(modalElement);
    });

    modalElement.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_is-opened')) {
            closeModal(modalElement);
        }
    });
}

export {openModal, closeModal, setCloseModalEventListeners};