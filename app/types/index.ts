export interface Engagement {
  post_id: string;
  post_country: string;
  post_language: string;
  likes_cnt: number;
  comments_cnt: number;
  saved_cnt?: number;
}

export interface Post {
  post_id: string;
  user_name: string;
  genre: string;
  hash_tags: string;
}

export interface Recommendation {
  post_id: string;
  post_type: string;
  most_related_hashtag: string;
}

export interface UnifiedData extends Engagement, Post, Recommendation {}

export interface ApiResponse {
  data: UnifiedData[] | null;
  error?: string;
}
