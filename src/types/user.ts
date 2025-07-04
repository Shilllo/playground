export interface IUser {
    username?: string;
    bio?: string | null;
    avatarUrl?: string | null;
    createdDate?: string;
    socialLinks?: {
        twitter?: string | null;
        instagram?: string | null;
        youtube?: string | null;
        tiktok?: string | null;
    };
}
