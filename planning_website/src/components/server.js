const express = require('express');
const app = express();
const PORT = 3000;

// Middleware za omogućavanje JSON tela zahteva
app.use(express.json());

// Funkcija koja vraća JSON podatke
app.get('/api/data', (req, res) => {
  const data = { message: 'Hello, this is a GET request!' };
  res.json(data);
});

// Funkcija koja prima podatke putem POST metode i vraća JSON odgovor
app.post('/api/data', (req, res) => {
  const receivedData = req.body;
  // Neophodna logika za obradu podataka
  const responseData = { message: 'Data received successfully!', data: receivedData };
  res.json(responseData);
});

// Funkcija koja ažurira podatke putem PUT metode
app.put('/api/data/:id', (req, res) => {
  const itemId = req.params.id;
  // Neophodna logika za ažuriranje podataka
  const responseData = { message: `Data with ID ${itemId} updated successfully!` };
  res.json(responseData);
});

// Funkcija koja briše podatke putem DELETE metode
app.delete('/api/data/:id', (req, res) => {
  const itemId = req.params.id;
  // Neophodna logika za brisanje podataka
  const responseData = { message: `Data with ID ${itemId} deleted successfully!` };
  res.json(responseData);
});

// Startovanje servera
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});