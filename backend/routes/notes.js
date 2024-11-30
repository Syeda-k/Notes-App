const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const authenticateToken = require('../middleware/fetchuser');

// Fetch all notes (no authentication required)
router.get('/', async (req, res) => {
  try {
    const notes = await Notes.find(); // Fetch all notes without user-specific filtering
    res.json(notes); // Return all notes as JSON
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Add a new note (requires authentication)
router.post('/', authenticateToken, async (req, res) => {
  const { title, content } = req.body;

  try {
    const note = new Notes({
      title,
      content,
      user: req.user.id, // Add the user ID to the note
    });

    // Save the note to the database
    const savedNote = await note.save();
    res.json(savedNote); // Return the saved note as a response
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Update an existing note by ID (requires authentication)
router.put('/:id', authenticateToken, async (req, res) => {
  const { title, content } = req.body;

  try {
    // Find the note by ID
    let note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).send('Note not found');
    }

    // Ensure the note belongs to the logged-in user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Update the note
    const updatedNote = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: { title, content } },
      { new: true }
    );

    res.json(updatedNote); // Return the updated note
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a note by ID (requires authentication)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    // Find the note by ID
    let note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).send('Note not found');
    }

    // Ensure the note belongs to the logged-in user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Delete the note
    await Notes.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
