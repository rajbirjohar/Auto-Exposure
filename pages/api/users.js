import nc from "next-connect";
import isEmail from "validator/lib/isEmail";
import normalizeEmail from "validator/lib/normalizeEmail";
import bcrypt from "bcryptjs";
import { all } from "@/middlewares/index";
import { extractUser } from "@/lib/api-helpers";
import { insertUser, findUserByEmail } from "@/db/index";
const handler = nc();

handler.use(all);

handler.post(async (req, res) => {
  const { firstname, lastname, username, password, password2 } = req.body;
  const email = normalizeEmail(req.body.email);
  if (!password || !username || !firstname || !lastname || !email) {
    res.status(400).send("Missing field(s)");
    return;
  }
  if (!isEmail(email)) {
    res.status(401).send("The email you entered is invalid.");
    return;
  }
  if (password != password2) {
    res.status(402).send("Passwords do not match.");
    return;
  }
  if (await findUserByEmail(req.db, email)) {
    res.status(403).send("The email has already been used.");
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await insertUser(req.db, {
    email,
    password: hashedPassword,
    bio: "",
    username,
    firstname,
    lastname,
  });
  req.logIn(user, (err) => {
    if (err) throw err;
    res.status(201).json({
      user: extractUser(req.user),
    });
  });
});

export default handler;
