export interface User {
   uid: string;
   email: string;
   displayName: string;
   photoURL: string;
   emailVerified: boolean;

   escola: string;
   perfil: string; //Perfil de acesso ex: Admin, Financeiro, ...
   escola_id: string;
   endereco: string;
   provincia: string;
   cidade: string;
}
