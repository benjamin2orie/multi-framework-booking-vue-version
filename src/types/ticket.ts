
export type TicketStatus = 'open' | 'in_progress' | 'closed';

export interface Ticket {
  id: string;
  title: string;
  description?: string;
  status: TicketStatus;
  priority?: string;
}

export interface UserTypes{
    name:string,
    email:string,
    password:string;
}