import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Form, Modal, Table } from 'react-bootstrap';

export default function Categories() {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [currentItem, setCurrentItem] = useState({});
  const [nom, setNom] = useState('');

  // Simulez une requête API pour obtenir les categories
  const fetchCategories = async () => {
    const data = await axios.get('http://localhost:5000/api/categories');
    console.log(data)
    setCategories(data.data);
  };
  useEffect(() => {

    fetchCategories();
  }, []);


  const filteredCategories =  categories.filter(categorie =>
    categorie.nom.toLowerCase().includes(search.toLowerCase())
  );

  const handleClose = (modal) => {
    if (modal === 'add') setShowAdd(false);
    if (modal === 'edit') setShowEdit(false);
    if (modal === 'delete') setShowDelete(false);
  };

  const handleShow = (modal, item) => {
    setCurrentItem(item);
    console.log('Modal', modal)
    if (modal === 'add') setShowAdd(true);
    if (modal === 'edit') setShowEdit(true);
    if (modal === 'delete') setShowDelete(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/categories', { nom });

      console.log(response.data);
      setNom('');
      fetchCategories();
      handleClose('add');
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`http://localhost:5000/api/categories/${currentItem.id}`, { nom });

      console.log(response.data);
      fetchCategories();
      handleClose('edit');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (event) => {

    try {
      const response = await axios.delete(`http://localhost:5000/api/categories/${currentItem.id}`);

      console.log(response.data);
      fetchCategories();
      handleClose('delete');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={() => handleShow('add')}>
        Add
      </Button>{' '}
      <input
        className='form-control'
        type="text"
        placeholder="Rechercher..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map(categorie => (
            <tr>
              <td>{categorie.id}</td>
              <td>{categorie.nom}</td>
              <td>

                <Button variant="success" onClick={() => handleShow('edit', categorie)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => handleShow('delete', categorie)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showAdd} onHide={() => handleClose('add')}>
        <Modal.Header closeButton>
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" placeholder="Enter nom" value={nom} onChange={(e) => setNom(e.target.value)} />
            </Form.Group>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showEdit} onHide={() => handleClose('edit')}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" placeholder="Enter nom" value={nom} onChange={(e) => setNom(e.target.value)} />
            </Form.Group>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Modifier
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showDelete} onHide={() => handleClose('delete')}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose('delete')}>
            No
          </Button>
          <Button variant="danger" onClick={() => handleDelete()}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
