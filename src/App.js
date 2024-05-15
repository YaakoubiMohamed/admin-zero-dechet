import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios";

function App() {
  const [categories, setCategories] = useState([]);
  const [nom, setNom] = useState('');

  const getCategories = async () => {
    const data = await axios.get("http://localhost:5000/api/categories");
    console.log(data.data);
    setCategories(data.data);
  }

  const deleteCategories = async (id) => {
    await axios.delete(`http://localhost:5000/api/categories/${id}`);
    getCategories()
  }

  useEffect(() => {
    getCategories();
  }, [])

  const AddCategorie = async () =>{
    await axios.post("http://localhost:5000/api/categories", {
      nom: nom
      })
      .then((response) =>{
        console.log(response.data);
        setNom('');
        getCategories();
      })
      .catch((error) =>{
        console.error(error);
      })
      ;
  }

  return (
    <div>
      <form className='col-md-4'>
        <div className='form-group'>
        <label forName="nom">Nom</label>
        <input id="nom" name='nom' value={nom} onChange={(e) => setNom(e.target.value)} type="text" className='form-control' placeholder="Category Name" />
        <button className='btn btn-primary' type="button" onClick={() => AddCategorie()}>Add Category</button>
        </div>        
      </form>

      <table className='table table-hover table-striped table-responsive'>
        <thead>
          <tr>
            <th>id</th>
            <th>nom</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr>
              <td>{category.id}</td>
              <td>{category.nom}</td>
              <td>
                <a className='btn btn-success'>Modifier</a>
                <a className='btn btn-danger' onClick={() => deleteCategories(category.id)}>Supprimer</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
