const Vocab = require('../models/VocabModel'); // Nhập model Vocab

// List all words
exports.list_all_words = async (req, res) => {
  try {
    const vocabList = await Vocab.find({});
    res.status(200).json(vocabList);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vocab words' });
  }
};

// Create a new word
exports.create_a_word = async (req, res) => {
  try {
    const newWord = new Vocab(req.body);
    await newWord.save();
    res.status(201).json(newWord);
  } catch (error) {
    res.status(500).json({ message: 'Error creating vocab word' });
  }
};

// Read a specific word
exports.read_a_word = async (req, res) => {
  try {
    const word = await Vocab.findById(req.params.wordId);
    if (!word) return res.status(404).json({ message: 'Word not found' });
    res.status(200).json(word);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching word' });
  }
};

// Update a word
exports.update_a_word = async (req, res) => {
  try {
    const updatedWord = await Vocab.findByIdAndUpdate(req.params.wordId, req.body, { new: true });
    if (!updatedWord) return res.status(404).json({ message: 'Word not found' });
    res.status(200).json(updatedWord);
  } catch (error) {
    res.status(500).json({ message: 'Error updating word' });
  }
};

// Delete a word
exports.delete_a_word = async (req, res) => {
  try {
    const wordToDelete = await Vocab.findByIdAndDelete(req.params.wordId);
    if (!wordToDelete) return res.status(404).json({ message: 'Word not found' });
    res.status(200).json({ message: 'Word deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting word' });
  }
};
