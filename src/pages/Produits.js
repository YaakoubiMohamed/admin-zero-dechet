import React, { useEffect, useState } from 'react'
import  axios  from 'axios';
import { Button, Form, Modal } from 'react-bootstrap';
export default function Produits() {

 const [products, setProducts] = useState([]);
 const [categories, setCategories] = useState([]);
 const [showAdd, setShowAdd] = useState(false);
 const [currentItem, setCurrentItem] = useState({});
 const [nom, setNom] = useState('');
 const [prix, setPrix] = useState('');
 const [description, setDescription] = useState('');
 const [photo, setPhoto] = useState('');
 const [categorieId, setCategorieId] = useState('');
 const [quantite, setQuantite] = useState('');
 const [marque, setMarque] = useState('');
 const [condition, setCondition] = useState('');

  const fetchProduits = async () => {
    const data = await axios.get('http://localhost:5000/api/produits');
    console.log(data.data)
    setProducts(data.data.produits);
    console.log(typeof products);
  };

  const fetchCategories = async () => {
    const data = await axios.get('http://localhost:5000/api/categories');
    console.log(data)
    setCategories(data.data);
  };
  
  useEffect(() => {

    fetchProduits();
    fetchCategories();
  }, []);



  const handleClose = (modal) => {
    if (modal === 'add') setShowAdd(false);
  };

  const handleShow = (modal, item) => {
    setCurrentItem(item);
    console.log('Modal', modal)
    if (modal === 'add') setShowAdd(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/produits', { nom,prix, quantite, marque, condition, description, photo, categorieId });

      console.log(response.data);
      setNom('');
      setPrix('');
      setQuantite('');
      setMarque('');
      setCondition('');
      setDescription('');
      setPhoto('');
      setCategorieId('');

      fetchProduits();
      handleClose('add');
    } catch (error) {
      console.error(error);
    }
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  }

  return (
    <div>
      <h1>Producte Produits</h1>
      <Button variant="primary" onClick={() => handleShow('add')}>
        Ajouter
      </Button>{' '}
      <table className='table '>
        <thead>
          <tr>
            <th>Id</th>
            <th>Photo</th>
            <th>Nom</th>
            <th>Marque</th>
            <th>Prix</th>
            <th>Quantité</th>
            <th>Description</th>
            <th> Condition</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {products && products.map(produit =>(
            <tr>
              <td>{produit.id}</td>
              <td><img src={produit.photo} alt="" width={50} height={50} /></td>
              <td>{produit.nom}</td>
              <td>{produit.marque}</td>
              <td>{produit.prix}</td>
              <td>{produit.quantite}</td>
              <td>{produit.description}</td>
              <td>{produit.condition}</td>
              <td>
                <button className='btn btn-primary'>Modifier</button>
                <button className='btn btn-danger'>Supprimer</button>
              </td>
            </tr>
          ))
        }
        </tbody>
      </table>

      <Modal show={showAdd} onHide={() => handleClose('add')}>
        <Modal.Header closeButton>
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} encType='multipart/form-data'>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" placeholder="Enter nom" value={nom} onChange={(e) => setNom(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Marque</Form.Label>
              <Form.Control type="text" placeholder="Enter marque" value={marque} onChange={(e) => setMarque(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Prix</Form.Label>
              <Form.Control type="number" placeholder="Enter prix" value={prix} onChange={(e) => setPrix(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Quantite</Form.Label>
              <Form.Control type="text" placeholder="Enter Quantite" value={quantite} onChange={(e) => setQuantite(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>
              <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Condition</Form.Label>
              <select value={condition} onChange={(e) => setCondition(e.target.value)}>
                <option value="Nouveau">Neuf</option>
                <option value="Utiliser">Occasion</option>
              </select>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Catégories</Form.Label>
              <select value={categorieId} onChange={(e) => setCategorieId(e.target.value)}>
                {
                  categories.map(categorie =>(
                    <option value={categorie.id}>{categorie.nom}</option>
                  ))
                }
              </select>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Photo</Form.Label>
              <input type='file'  onChange={handlePhotoChange}/>
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
    </div>
  )
}
