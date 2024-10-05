export type User = {
    uuid: string;
    name: string;
    email: string;
    image_url: string;
    created_at: string;
    is_active: boolean;
    is_nsfw: boolean;
}
export type Wallet ={
    balance: number;
    createdAt: Date;
    lastUpdatedAt: Date;
}

export type ModelImage = {
    uuid: string;
    is_nfsw: boolean;
    is_public: boolean;
    created_at: string;
    file_name: string;
    user_id: number;
    image_url: string;
}

export type ModelTraining = {
    uuid: string;      
    object_name: string;   
    created_at: Date;     
    last_updated_at: Date; 
    status: string;  
}
export type ModelTrainingImage = {
    created_at: Date;
    file_name: string;
    original_file_name: string;
    model_training_uuid: string;
}

export type LastModelTraining = {
    model_training: ModelTraining;
    images: ModelTrainingImage[];
}