import { account } from "~/appwrite/client";
import { OAuthProvider } from "appwrite";

export const loginWithGoogle = async () => {
    try {
        account.createOAuth2Session(OAuthProvider.Google, 
            `${window.location.origin}/`, 
            `${window.location.origin}/404`
        );
    } catch(e) {
        console.error("loginWithGoogle:", e);
    }
}

export default loginWithGoogle;