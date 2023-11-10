export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    reviews: Review[];
  }
  
  export interface Review {
    comment: string;
  }