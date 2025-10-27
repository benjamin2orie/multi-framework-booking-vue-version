
// const USERS_KEY = 'ticketapp_users';

// export function saveUser(user: { name: string; email: string; password: string }): boolean {
//   const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
//   const normalizedEmail = user.email.trim().toLowerCase();
//   const exists = users.some((u: any) => u.email.trim().toLowerCase() === normalizedEmail);
//   if (exists) return false;
//   users.push({ ...user, email: normalizedEmail });
//   localStorage.setItem(USERS_KEY, JSON.stringify(users));
//   return true;
// }

// export function findUser(email: string, password: string) {
//   const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
//   const normalizedEmail = email.trim().toLowerCase();
//   return users.find((u: any) => u.email.trim().toLowerCase() === normalizedEmail && u.password === password);
// }




const USERS_KEY = import.meta.env.VITE_USERS_KEY as string;

// export function saveUser(user: { email: string; password: string, name:string }) {
//   const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
//   const existuser = users.some((u:any) => u.email === u.email);
//   if(existuser) return false;
//   users.push(user);
//   localStorage.setItem(USERS_KEY, JSON.stringify(users));
// }

export function saveUser(user: { email: string; password: string; name: string }): boolean {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const normalizedEmail = user.email.trim().toLowerCase();

  const exists = users.some((u: any) => u.email.trim().toLowerCase() === normalizedEmail);
  if (exists) return false;

  users.push({ ...user, email: normalizedEmail });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return true;
}


// export function findUser(email: string, password: string, name?:string) {
//   const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
//   return users.find((u: any) => u.email === email && u.password === password && name ===u.name);
// }

export function findUser(email: string, password: string) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const normalizedEmail = email.trim().toLowerCase();

  return users.find((u: any) => u.email.trim().toLowerCase() === normalizedEmail && u.password === password);
}