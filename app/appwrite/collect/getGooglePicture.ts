export const getGooglePicture = async (accessToken: string) => {
    try {
        const response = await fetch("https://people.googleapis.com/v1/people/me?personFields=photos",
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        if (!response.ok){
            throw new Error("Failed to fetch profile picture");
        }

        const { photos } = await response.json();
        return photos?.[0]?.url || null;
    } catch(e) {
        console.error("getGooglePicture:", e);
        return null;
    }
}

export default getGooglePicture;