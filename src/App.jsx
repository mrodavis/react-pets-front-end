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

  const handleFormView = (pet) => {
    if (!pet._id) setSelected(null);
    setIsFormOpen(!isFormOpen);
  };

  const handleAddPet = async (formData) => {
    try {
    const newPet = await petService.create(formData);

    if (newPet.err) {
      throw new Error(newPet.err);
    }

    setPets([newPet, ...pets]);
    setIsFormOpen(false);
    } catch (err) {
      // Log the error to the console
      console.log(err);
    }
  };

    const handleUpdatePet = async (formData, petId) => {
    try {
      const updatedPet = await petService.update(formData, petId);
      if (updatedPet?.err) throw new Error(updatedPet.err);

      setPets((prev) => prev.map((p) => (p._id === updatedPet._id ? updatedPet : p)));
      setSelected(updatedPet);     // keep details in sync
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

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
      <PetForm selected={selected} handleAddPet={handleAddPet} handleUpdatePet={handleUpdatePet}/>
      ) : (
      <PetDetail selected={selected} handleFormView={handleFormView}/>
      )}
    </>
  );
};


export default App;
