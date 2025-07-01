/* eslint-disable react/prop-types */
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  TableSortLabel,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { DescriptionComponent } from '../utilities/dateUtils';

const DepartmentTable = ({
  Department,
  sortOrder,
  handleSort,
  handleDelete,
  selected,
}) => {
  const navigate = useNavigate();
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active
                direction={sortOrder}
                onClick={handleSort}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell>Name Pashto</TableCell>
            <TableCell>Name Dari</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Description Pashto</TableCell>
            <TableCell>Description Dari</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Department.map((Department) => (
            <TableRow
              key={Department.id}
              selected={selected.includes(Department.id)}
            >
              <TableCell>{Department.name}</TableCell>
              <TableCell>{Department.name_pashto}</TableCell>
              <TableCell>{Department.name_dari}</TableCell>
              <TableCell><DescriptionComponent description={Department.description} maxLength={60} /></TableCell>
              <TableCell><DescriptionComponent description={Department.description_pashto} maxLength={60} /></TableCell>
              <TableCell><DescriptionComponent description={Department.description_dari} maxLength={60} /></TableCell>
  
              <TableCell>
                <IconButton
                  onClick={() => navigate(`/department/edit/${Department.id}`)}
                  color="primary"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(Department.id)}
                  color="error"
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DepartmentTable;