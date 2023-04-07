import express from 'express';
import fs from 'fs';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

abstract class BaseError extends Error {
  abstract statusCode: number;

  protected constructor(public message: string = 'An error occurred') {
    super();
  }
}

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(
  fileUpload({
    createParentPath: true,
  }),
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.post('/', limiter, async (req, res) => {
  try {
    if (req.files && req.files.files) {
      [req.files.files].flat().forEach((file) => {
        file.mv(`./uploads/${file.name}`);
      });
    }

    fs.writeFile('./uploads/data.json', JSON.stringify(req.body), 'utf8', () => {
      res.send({
        status: true,
        message: 'Data is uploaded',
      });
    });
  } catch (e: unknown) {
    if (e instanceof BaseError) {
      res.status(e.statusCode).send(e.message);
    }
  }
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
