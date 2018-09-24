export interface Image {
    id?: string;
    user_id: string;  
    username: string;
    name: string;
    url: string;  
    date: Date;
    likes?: Array<string>;      
}
