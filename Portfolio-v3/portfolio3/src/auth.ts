import { UserInfo } from "./types";
import { users } from "./users";

// Eksempel på en cookie vi mottar
// "user.id=johndoe; expires=Thu, 18 Dec 2025 12:00:00 UTC; path=/; domain=example.com; secure; HttpOnly"

// Transformerer cookien til noe vi kan jobbe med
const parseCookie = (cookie: string) => {
  return Object.fromEntries(
    cookie.split(";").map((cookie) => cookie.trim().split("="))
  );
};

export function getUser(request: Request): UserInfo | null {
  const cookies = parseCookie(request.headers.get("Cookie") ?? "");
  
  // Henter ut user.id cookie verdi
  const id = cookies["Cookie"];
  return users.find((user) => user.id === id) ?? null;
}