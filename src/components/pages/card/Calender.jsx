import React from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';

const AgendaCard = ({ agendaItems }) => (
  <Card sx={{
    backdropFilter: 'blur(10px)',
    borderRadius: 4,
    boxShadow: 6,
    border: '1px solid rgba(255, 255, 255, 0.5)',
    background: 'rgba(25, 25, 112, 0.8)',
    mt: 4,
  }}>
    <Box sx={{
      p: 2,
      background: 'transparent',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom color="white">
        Agenda
      </Typography>
    </Box>
    <CardContent>
      <TableContainer sx={{ boxShadow: 0, background: 'transparent' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>fecha</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Descripción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agendaItems.map((item, index) => (
              <TableRow
                key={index}
                sx={{
                  transition: 'background-color 0.3s',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <TableCell sx={{ color: 'white' }}>{item.time}</TableCell>
                <TableCell sx={{ color: 'white' }}>{item.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent>
  </Card>
);

export default AgendaCard;
