import { useState } from 'react';

const PetForm = (props) => {
  // formData state to control the form.
  const initialState = {
    name: '',
    age: '',
    breed: ''
  }
  const [formData, setFormData] = useState(
    props.selected ? props.selected : initialState
  )

  // handleChange function to update formData state.
  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (props.selected){
        props.handleUpdatePet(formData, props.selected._id)
    } else {
        props.handleAddPet(formData);
    }
    
    // Right now, if you add a pet and submit the form,
    // the data entered will stay on the page. We'll fix this soon.
  };

  // And finally, the form itself.
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name"> Name </label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="age"> Age </label>
        <input
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <label htmlFor="breed"> Breed </label>
        <input
          id="breed"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
        />
        <button type="submit">
          {props.selected ? 'Update Pet' : 'Add New Pet'}
        </button>
      </form>
      
    </div>
  );
};

export default PetForm;
