export interface AnalysisData {
  likes: number;
  comments: number;
  shares: number;
  platform: string;
  postType: string;
}

export interface ApiResponse {
  data: AnalysisData | null;
  error?: string;
}