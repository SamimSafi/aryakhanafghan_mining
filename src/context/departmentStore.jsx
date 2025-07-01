import { create } from 'zustand';
import { toast } from 'react-toastify';
import agent from '../api/agent';

const useDepartmentStore = create((set) => ({
  Department: [],
  loading: false,
  error: null,

  fetchDepartment: async () => {
    set({ loading: true, error: null });
    try {
      const Department = await agent.Department.fetchDepartment();
      set({ Department, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to fetch Department.');
    }
  },

  // Create a new Department record
createDepartment: async (DepartmentData) => {
    set({ loading: true, error: null });
    try {
      const newDepartment = await agent.Department.createDepartment(DepartmentData);
      set((state) => ({
        Department: [...state.Department, newDepartment],
        loading: false,
      }));
      return newDepartment;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to create Department.');
      throw error;
    }
  },

  updateDepartment: async (id, DepartmentData) => {
    set({ loading: true, error: null });
    try {
      const updatedDepartment = await agent.Department.updateDepartment(id, DepartmentData);
      set((state) => ({
        Department: state.Department.map((Department) =>
          Department.id === id ? updatedDepartment : Department
        ),
        loading: false,
      }));
      return updatedDepartment;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  deleteDepartment: async (id) => {
    set({ loading: true, error: null });
    try {
      await agent.Department.deleteDepartment(id);
      set((state) => ({
        Department: state.Department.filter((Department) => Department.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  getDepartment: async (id) => {
  set({ loading: true, error: null });
  try {
    const history = await agent.Department.getDepartment(id);
    set({ loading: false });
    return history;
  } catch (error) {
    set({ error: error.message, loading: false });
    toast.error('Failed to fetch history.');
    throw error;
  }
},

  activateDepartment: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedDepartment = await agent.Department.activateDepartment(id);
      set((state) => ({
        Department: state.Department.map((Department) =>
          Department.id === id ? { ...Department, isActive: true } : Department
        ),
        loading: false,
      }));
      toast.success('Department activated successfully.');
      return updatedDepartment;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to activate Department.');
      throw error;
    }
  },

  deactivateDepartment: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedDepartment = await agent.Department.deactivateDepartment(id);
      set((state) => ({
        Department: state.Department.map((Department) =>
          Department.id === id ? { ...Department, isActive: false } : Department
        ),
        loading: false,
      }));
      toast.success('Department deactivated successfully.');
      return updatedDepartment;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to deactivate Department.');
      throw error;
    }
  },
}));

export default useDepartmentStore;