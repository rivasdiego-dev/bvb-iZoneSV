import { addDoc, collection, getDocs } from "firebase/firestore";
import { firebaseDB } from "../app";

export type Role = "user" | "admin" | "ref";
export interface User {
  id: string;
  displayName: string | null;
  email: string | null;
  roles: Role[];
}

export async function GetAllUsers(): Promise<User[] | undefined> {
  try {
    const querySnapshot = await getDocs(collection(firebaseDB, "users"));
    const users: User[] = [];
    querySnapshot.forEach((doc) => {
      const userData = doc.data() as User;
      users.push(userData);
    });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

export async function UserExists(id: string): Promise<boolean> {
  try {
    const users = await GetAllUsers();
    if (users) return users.some((user) => user.id === id);
    else return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function CreateDefaultUser(user: User) {
  try {
    user.roles.push('user');
    await addDoc(collection(firebaseDB, "users"), user);
  } catch (error) {
    console.error(error);
  }
}
