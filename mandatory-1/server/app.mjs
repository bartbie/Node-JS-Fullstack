import express from 'express';
import { handler as ssrHandler } from '../dist/server/entry.mjs';

const app = express();
const PORT = 3000;

app.use(express.static('dist/client/'))
app.use(ssrHandler);

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
  })

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});