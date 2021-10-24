export class User {
  "user_id": number; //generated upon registration
  "role_id": number; //generated upon registration
  "institution_id": number; //retrieved from instution associated with email used to sign up
  "profile_id": number; //generated upon registration
  "email": string;
  "password": string;
}
