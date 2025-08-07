import type { Models } from "appwrite";
import type { Document } from "../schema/document";

const filterUsersByRole = (
  users: Models.DocumentList<Models.Document>,
  role: string
) => {
  return users.documents.filter((user: Document) => user.status === role);
};

export default filterUsersByRole;
