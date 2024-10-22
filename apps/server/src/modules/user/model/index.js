import { hash, randomUUID } from "crypto";
export function createUser({ password, email, username, }) {
    return {
        password: hash("sha256", password),
        email,
        username,
        id: randomUUID(),
    };
}
export function toClientUser(u) {
    return {
        email: u.email,
        id: u.id,
        username: u.username,
    };
}
