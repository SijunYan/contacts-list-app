import { Express, Request, Response } from "express";
import express from "express";
import cors from "cors";
import data from "./db";
import { v4 as uuidv4 } from "uuid";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

interface Data {
  id: number;
  name: string;
  mobile: string;
  email: string;
}

let contacts: Data[] = data;
console.log(contacts);
// get all contacts
app.get("/", (req, res) => {
  res.send(contacts);
});

// add new contact
app.post("/", (req: Request, res: Response) => {
  try {
    const newdata: Data = { id: uuidv4(), ...req.body };
    contacts.push(newdata);
    res.status(200).json(newdata);
  } catch (error) {
    res.status(400).json(error);
  }
});

// delete contact
app.delete("/:id", (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    contacts = contacts.filter((item) => item.id.toString() !== id);
    console.log(contacts);
    res.status(200).json(`Deleted ${id}`);
  } catch (error) {
    res.status(400).json(error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
