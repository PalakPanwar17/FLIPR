import express from 'express';
import { promises as fs } from 'fs';
import { join, resolve } from 'path';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

async function calculateSize(path) {
  try {
    const stats = await fs.stat(path);
    
    if (!stats.isDirectory()) {
      return {
        name: path.split('/').pop(),
        size: stats.size,
        type: 'file'
      };
    }

    const files = await fs.readdir(path);
    const children = await Promise.all(
      files.map(async (file) => {
        const fullPath = join(path, file);
        return calculateSize(fullPath);
      })
    );

    const size = children.reduce((acc, child) => acc + child.size, 0);

    return {
      name: path.split('/').pop(),
      size,
      type: 'folder',
      children
    };
  } catch (error) {
    console.error(`Error processing path ${path}:`, error);
    throw error;
  }
}

app.post('/api/calculate-size', async (req, res) => {
  try {
    const { path } = req.body;
    const absolutePath = resolve(path);
    const result = await calculateSize(absolutePath);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});