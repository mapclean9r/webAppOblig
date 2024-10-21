import { UserInfo } from "./types";
import { users } from "./users";

const parseCookie = (cookie: string) => {
  return Object.fromEntries(
    cookie.split(";").map((cookie) => cookie.trim().split("="))
  );
};

export function getUser(request: Request): UserInfo | null {
  const cookies = parseCookie(request.headers.get("Cookie") ?? "");
  
  const id = cookies["Cookie"];
  return users.find((user) => user.id === id) ?? null;
}