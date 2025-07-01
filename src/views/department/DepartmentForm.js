/* eslint-disable react/prop-types */
import  {  useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  FormControlLabel,
  Switch,
  Grid,
  Card,
} from '@mui/material';
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import usedepartmentStore from '../../context/departmentStore';
import ColorPickerField from '../../components/ColorPickerField';


const DepartmentForm = () => {
  const { id } = useParams(); // Get Department ID from URL for editing
  const navigate = useNavigate();
  const { createDepartment, updateDepartment, getDepartment } = usedepartmentStore();
  const isEdit = !!id;

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      name_pashto: '',
      name_dari: '',
      description: '',
      description_pashto: '',
      description_dari: '',
      color: '',
      isActive: true,
    },
  });

  useEffect(() => {
    if (isEdit) {
      const fetchDepartmentData = async () => {
        try {
          const Department = await getDepartment(id); // Call /Department/{id} via agent
          if (Department) {
            // Populate form fields using setValue
            setValue('name', Department.name || '');
            setValue('name_pashto', Department.name_pashto || '');
            setValue('name_dari', Department.name_dari || '');
            setValue('description', Department.description || '');
            setValue('description_pashto', Department.description_pashto || '');
            setValue('description_dari', Department.description_dari || '');
          } else {
            toast.error('Department not found.');
            navigate('/department');
          }
        } catch (error) {
          toast.error('Failed to fetch Department data.');
          navigate('/department');
        }
      };

      fetchDepartmentData();
    }
  }, [id, isEdit, getDepartment, navigate, setValue]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateDepartment(id, data); // Update Department
      } else {
        await createDepartment(data); // Create new Department
      }
      toast.success(`Department ${isEdit ? 'updated' : 'created'} successfully.`);
      navigate('/department');
    } catch (error) {
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} Department.`);
    }
  };

  return (
    <Card sx={{ p: 3, width: '100%', mx: 'auto' }}>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          {isEdit ? 'Edit Content' : 'Create Content'}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Grid container lg={12} md={12}  sm={12} spacing={3}>
              <Grid item xs={6}>
                <TextField
                  label="Name (English)"
                  {...register('name', { required: 'Name (English) is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Name (Pashto)"
                  {...register('name_pashto', { required: 'Name (Pashto) is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.name_pashto}
                  helperText={errors.name_pashto?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Name (Dari)"
                  {...register('name_dari', { required: 'Name (Dari) is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.name_dari}
                  helperText={errors.name_dari?.message}
                />
              </Grid>
            </Grid>
            <Grid container lg={12} md={12}  sm={12} spacing={2}>
              
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  label="Description (English)"
                  {...register('description', { required: 'Title Description (English) is required' })}
                  fullWidth
                  multiline
                  rows={4}
                  disabled={isSubmitting}
                    error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Description (Pashto)"
                  {...register('description_pashto', { required: 'Title Description (Pashto) is required' })}
                  fullWidth
                  multiline
                  rows={4}
                  disabled={isSubmitting}
                    error={!!errors.description_pashto}
                  helperText={errors.description_pashto?.message}
                />
              </Grid>
               <Grid item xs={6}>
                <TextField
                  label="Description (Dari)"
                  {...register('description_dari' , { required: 'Title Description (Dari) is required' })}
                  fullWidth
                  multiline
                  rows={4}
                  disabled={isSubmitting}
                    error={!!errors.description_dari}
                  helperText={errors.description_dari?.message}
                />
              </Grid>
            </Grid>
            </Grid>
            <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : isEdit ? 'Update Department' : 'Create Department'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/department')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </Card>
  );
};

export default DepartmentForm;