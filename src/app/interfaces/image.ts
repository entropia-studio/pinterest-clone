export interface Image {
    id?: string;
    user_id: string;  
    name: string;
    url: string;  
    date: Date;
    likes?: Array<string>;      
}
