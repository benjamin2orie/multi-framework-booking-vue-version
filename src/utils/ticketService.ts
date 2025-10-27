

import type { Ticket } from "../types/ticket";

const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY as string;

export const getTickets = (): Ticket[] =>
  JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

export const saveTickets = (tickets: Ticket[]) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));

export const addTicket = (ticket: Ticket) => {
  const tickets = getTickets();
  tickets.push(ticket);
  saveTickets(tickets);
};

export const updateTicket = (id: string, updated: Ticket) => {
  const tickets = getTickets().map(t => (t.id === id ? updated : t));
  saveTickets(tickets);
};

export const deleteTicket = (id: string) => {
  const tickets = getTickets().filter(t => t.id !== id);
  saveTickets(tickets);
};
