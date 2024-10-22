import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import { createError, isSuccess } from "@repo/result";
import { loginInput, registerInput } from "@repo/contracts/auth";
import { register } from "./services/register";
import { login } from "./services/login";
import { validator } from "hono/validator";
export const authController = new Hono()
    .post("/register", validator("json", (input, c) => {
    const i = registerInput.safeParse(input);
    if (!i.success) {
        return c.json(createError({ type: "validation-error", errors: i.error.flatten() }));
    }
    return i.data;
}), async (c) => {
    const input = c.req.valid("json");
    const res = await register(input);
    if (isSuccess(res)) {
        setCookie(c, "access-token", res.success.token.token, {
            maxAge: 12000000,
        });
    }
    return c.json(res);
})
    .post("/login", validator("json", (input, c) => {
    const i = loginInput.safeParse(input);
    if (!i.success) {
        return c.json(createError({ type: "validation-error", errors: i.error.flatten() }));
    }
    return i.data;
}), async (c) => {
    const input = c.req.valid("json");
    const res = await login(input);
    if (isSuccess(res)) {
        setCookie(c, "access-token", res.success.token.token, {
            maxAge: 12000000,
        });
    }
    return c.json(res);
});
