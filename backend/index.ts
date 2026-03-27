import express from "express";
import { signinSchema, signupSchema, todoSchema } from "./schema";
import { users, todos } from "./data";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { authMiddleware } from "./authMiddleware";
import type { AuthRequest } from "./types";
import type { Payload } from "./types";

declare global {
  namespace Express {
    interface Request {
      user?: Payload;
    }
  }
}

const app = express();
app.use(express.json());

const PORT = 8000;
export const SECRET = "123456789"

let userIdCounter = 1;
let todoIdCounter = 1;


app.post("/signup", async (req: Request, res: Response) => {
    const response = signupSchema.safeParse(req.body);
    if (!response.success) {
        return res.status(403).json({
            success: false,
            message: "credentials required"
        })
    }
    
    const data = response.data;

    const existingUser = users.find((elem => elem.email == data.email));

    if(existingUser){
        return res.status(403).json({
            message : "User already exists"
        })
    }
    users.push({
        id: userIdCounter,
        username: data.username,
        email: data.email,
        password: data.password

    });

    userIdCounter++;

    res.status(200).json({
        success: true,
        message: "User created",
        email: data.email,
        username: data.username
    })
})

app.post("/signin", (req : Request, res : Response) => {

    const response = signinSchema.safeParse(req.body);

    if (!response.success) {
        return res.status(403).json({
            success: false,
            message: "Something went wrong"
        })
    }

    const data = response.data;

    const token = jwt.sign({ userId: data.email }, SECRET)

    res.status(200).json({
        success: true,
        token: token
    })

})

app.post("/todo", authMiddleware, (req: Request , res: Response) => {
  const response = todoSchema.safeParse(req.body);

  if (!response.success) {
    return res.status(403).json({
      success: false,
      message: "Invalid input",
    });
  }

  const userId = req.user?.userId;

  if (!userId) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }

  const newTodo = {
    id: todoIdCounter++,
    userId: userId,
    title: response.data.title,
  };

  todos.push(newTodo);

  res.status(200).json({
    success: true,
    todo: newTodo,
  });
});

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});