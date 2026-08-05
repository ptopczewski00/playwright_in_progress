export type Credentials = { username: string; password: string };

export const users: Record<string, Credentials> = {
  piotr: { username: 'piotr', password: '2012' },
  pawel: { username: 'pawel', password: 'abc123' },
  kamil: { username: 'kamil', password: '2@26' },
};

export function invalidCredentials(): Credentials {
  return { username: 'nieznany_uzytkownik', password: 'zle_haslo' };
}