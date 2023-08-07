import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, styled, Button } from '@mui/material';
import axios from 'axios';

const Desc = styled(TextField)`
  width: 40%;
  height: 50%;
  margin-top: 5%;
`;

function Form() {
  const { control, handleSubmit, register, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('image', data.image[0]); // Assuming only one file is allowed

      const response = await axios.post('http://localhost:5000/blogs', formData);
      <alert >This is a success alert — check it out!</alert>

      console.log(response.data);
      
    } catch (error) {
      <alert >This is an error alert — check it out!</alert>
      console.error(error);

    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="title"
        control={control}
        rules={{ required: 'Title is required' }}
        render={({ field }) => (
          <TextField label="Title" variant="outlined" {...field} error={!!errors.title} helperText={errors.title?.message} />
        )}
      />

      <Controller
        name="description"
        control={control}
        rules={{ required: 'Description is required' }}
        render={({ field }) => (
          <Desc label="Description" variant="outlined" {...field} error={!!errors.description} helperText={errors.description?.message} />
        )}
      />

      <TextField type="file" {...register('image', { required: 'Image is required' })} />
      {errors.image && <span>{errors.image.message}</span>}

      <Button type="submit" disabled={Object.keys(errors).length > 0}>Submit Blog</Button>
    </form>
  );
}

export default Form;
