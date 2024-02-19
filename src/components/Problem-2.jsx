import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

const Problem2 = () => {
    const [showAllModal, setShowAllModal] = useState(false);
    const [showUSModal, setShowUSModal] = useState(false);
    const [modalContent, setModalContent] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedContact, setSelectedContact] = useState(null);
    const [onlyEven, setOnlyEven] = useState(false);

    useEffect(() => {
        if (showAllModal) {
            fetchContacts();
        } else if (showUSModal) {
            fetchContacts('us');
        }
    }, [showAllModal, showUSModal, searchTerm, onlyEven]);

    const fetchContacts = async (country = '') => {
        let url = 'https://contact.mediusware.com/api/contacts/';
        if (country) {
           url = `https://contact.mediusware.com/api/country-contacts/UNITED%20STATES/`;
        }
        try {
            const response = await axios.get(url, {
                params: {
                    search: searchTerm,
                    page: 1,
                    page_size: 100
                }
            });
            let filteredContacts = response.data.results;
            if (onlyEven) {
                filteredContacts = filteredContacts.filter(contact => contact.id % 2 === 0);
            }
            setModalContent(filteredContacts);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const handleModalAClick = () => {
        setShowAllModal(true);
        setShowUSModal(false);
    };

    const handleModalBClick = () => {
        setShowAllModal(false);
        setShowUSModal(true);
    };

    const handleModalCClose = () => {
        setShowAllModal(false);
        setShowUSModal(false);
        setSelectedContact(null); // Reset selected contact when closing modal
    };

    const handleContactClick = (contact) => {
        setSelectedContact(contact);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleOnlyEvenChange = (event) => {
        setOnlyEven(event.target.checked);
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>
                <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-lg btn-outline-primary" type="button" style={{ color: '#46139f' }} onClick={handleModalAClick}>All Contacts</button>
                    <button className="btn btn-lg btn-outline-warning" type="button" style={{ color: '#ff7f50' }} onClick={handleModalBClick}>US Contacts</button>
                </div>
            </div>

            {/* Modal A */}
            <Modal
                isOpen={showAllModal}
                onRequestClose={handleModalCClose}
                contentLabel="All Contacts Modal"
            >
                <div className="modal-content">
                    <span className="close" onClick={handleModalCClose}>&times;</span>
                    <h2>All Contacts</h2>
                    <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search contacts..." />
                    <label>
                        <input type="checkbox" checked={onlyEven} onChange={handleOnlyEvenChange} />
                        Only even
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
                        {modalContent.map(contact => (
                            <div key={contact.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleContactClick(contact)}>
                                <p>{contact.country.name}</p>
                                <p>{contact.id}: {contact.phone}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>

            {/* Modal B */}
            <Modal
                isOpen={showUSModal}
                onRequestClose={handleModalCClose}
                contentLabel="US Contacts Modal"
            >
                <div className="modal-content">
                    <span className="close" onClick={handleModalCClose}>&times;</span>
                    <h2>US Contacts</h2>
                    <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search contacts..." />
                    <label>
                        <input type="checkbox" checked={onlyEven} onChange={handleOnlyEvenChange} />
                        Only even
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
                        {modalContent.map(contact => (
                            <div key={contact.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleContactClick(contact)}>
                                <p>{contact.country.name}</p>
                                <p>{contact.id}: {contact.phone}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>

            {/* Modal C */}
            <Modal
                isOpen={selectedContact !== null}
                onRequestClose={handleModalCClose}
                contentLabel="Contact Details Modal"
            >
                <div className="modal-content">
                    <span className="close" onClick={handleModalCClose}>&times;</span>
                    <h2>Contact Details</h2>
                    {selectedContact && (
                        <>
                            <p>ID: {selectedContact.id}</p>
                            <p>Phone: {selectedContact.phone}</p>
                            {/* Add more contact details here */}
                        </>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default Problem2;
