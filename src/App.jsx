import { useState, useEffect } from 'react';
import * as petService from './services/petService.js';

import PetList from './components/PetList/PetList'

const App = () => {
  const [pets, setPets] = useState([]);

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
      <PetList pets={pets} />
    </>
  );
};


export default App;
