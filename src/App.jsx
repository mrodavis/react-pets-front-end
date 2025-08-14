import { useState, useEffect } from 'react';
import * as petService from './services/petService.js';

import PetList from './components/PetList/PetList';
import PetDetail from './components/PetDetail/PetDetail';
import PetForm from './components/PetForm/PetForm';

const App = () => {
  const [pets, setPets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSelect = (pet) => {
    setSelected(pet);
    setIsFormOpen(false);
  };

  const handleFormView = () => {
    setIsFormOpen(!isFormOpen);
  }

  // Create a new useEffect
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const fetchedPets = await petService.index();
        // Don't forget to pass the error object to the new Error
        if (fetchedPets.err) {
          throw new Error(fetchedPets.err);
        }
        setPets(fetchedPets);
      } catch (err) {
        // Log the error object
        console.log(err);
      }
    };
    fetchPets();
  }, []);



  return (
    <>
      <PetList 
      pets={pets} 
      handleSelect={handleSelect}
      handleFormView={handleFormView}
      isFormOpen={isFormOpen}
      />
      {isFormOpen ? (
      <PetForm />
      ) : (
      <PetDetail selected={selected} />
      )}
    </>
  );
};


export default App;
