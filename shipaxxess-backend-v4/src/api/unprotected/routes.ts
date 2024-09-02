import { Hono } from "hono";
import { FA } from "./2fa";
import { ForgetPassword } from "./forget";
import { SignInUser } from "./signin";
import { SignUpUser } from "./signup";
import { VerifyUser } from "./verify";

const unprotected = new Hono<App>();

unprotected.post("/signup_user", SignUpUser);
unprotected.post("/signin_user", SignInUser);
unprotected.get("/forget_password", ForgetPassword);
unprotected.post("/verify_email", VerifyUser);
unprotected.post("/two_fa", FA.Post);

export { unprotected };
