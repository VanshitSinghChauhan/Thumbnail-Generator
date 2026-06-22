require("dotenv/config");
import type { Request, Response } from 'express';
const express = require('express');
const cors = require("cors");

const app = express();

// Middleware
app.use(cors())
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});