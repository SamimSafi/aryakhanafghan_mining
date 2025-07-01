const departmentService = {
  filterDepartment: (department, searchTerm) => {
    let filtered = department;
    if (searchTerm.length >= 3) {
      filtered = filtered.filter((department) =>
        department.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  },

  sortDepartment: (department, sortOrder) => {
    return [...department].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  },

  paginateDepartment: (department, page, rowsPerPage) => {
    const startIndex = (page - 1) * rowsPerPage;
    return department.slice(startIndex, startIndex + rowsPerPage);
  },
};

export default departmentService;