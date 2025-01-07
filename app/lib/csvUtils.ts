import fs from "fs/promises";
import path from "path";
import Papa from "papaparse";
import { Engagement, Post, Recommendation, UnifiedData } from "@/app/types";

export const getCsvData = async <T>(filePath: string): Promise<T[]> => {
  const fullPath = path.join(process.cwd(), "public/csv", filePath);

  console.log(fullPath);

  try {
    const fileContent = await fs.readFile(fullPath, "utf-8");
    const { data } = Papa.parse<T>(fileContent, {
      header: true,
      skipEmptyLines: true,
    });
    return data;
  } catch (error) {
    console.error(`Error reading CSV file at ${filePath}:`, error);
    throw new Error(`Failed to read ${filePath}`);
  }
};

export const mergeDataByPostId = (
  engagements: Engagement[],
  posts: Post[],
  recommendations: Recommendation[]
): UnifiedData[] => {
  const postsMap = new Map(posts.map((post) => [post.post_id, post]));
  const recommendationsMap = new Map(
    recommendations.map((rec) => [rec.post_id, rec])
  );

  return engagements.map((eng) => {
    const post = postsMap.get(eng.post_id);
    const rec = recommendationsMap.get(eng.post_id);

    return {
      ...eng,
      ...post,
      ...rec,
      user_name: post?.user_name ?? "",
      genre: post?.genre ?? "",
      hash_tags: post?.hash_tags ?? "",
      post_type: rec?.post_type ?? "",
      most_related_hashtag: rec?.most_related_hashtag ?? "",
    };
  });
};

export const fetchAnalysisData = async (): Promise<UnifiedData[]> => {
  const engagements = await getCsvData<Engagement>(
    "Engagement_Dataset__Large.csv"
  );
  const posts = await getCsvData<Post>("Posts_Dataset__Large.csv");
  const recommendations = await getCsvData<Recommendation>(
    "Recommendations_Dataset__Large.csv"
  );

  return mergeDataByPostId(engagements, posts, recommendations);
};
