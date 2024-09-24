import express, { Request, Response } from 'express';
import path from 'path';
import fileUploadHandler from './api/handlers/fileuploadHandler';

const app = express();
const port = 3000;

// Use the file upload handler
app.use('/api/upload', fileUploadHandler);

// Serve static files (optional, for testing)
app.use(express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
