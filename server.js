import express, { json } from 'express';
import { readFileSync, writeFileSync } from 'fs';

const app = express();
const PORT = 3000;

app.use(json()); // Middleware to parse JSON requests

app.patch('/posts/updateIDs', (req, res) => {
  const deletedIndex = req.body.deletedIndex; // Get the index of the deleted post from the request body

  // Read the JSON file
  let postsData = JSON.parse(readFileSync('db.json'));

  // Update the IDs of the remaining posts
  postsData.posts.forEach((post, index) => {
    if (index >= deletedIndex) {
      post.id = index + 1;
    }
  });

  // Write the updated data back to the JSON file
  writeFileSync('db.json', JSON.stringify(postsData, null, 2));

  res.status(200).send({ message: 'Post IDs updated successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
