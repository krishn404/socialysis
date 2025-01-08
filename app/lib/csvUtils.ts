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
  // Create a map for posts by post_id
  const postsMap = new Map<string, Post>();
  posts.forEach((post) => {
    if (!postsMap.has(post.post_id)) {
      postsMap.set(post.post_id, post);
    }
  });

  // Create a map for recommendations by post_id
  const recommendationsMap = new Map<string, Recommendation>();
  recommendations.forEach((rec) => {
    if (!recommendationsMap.has(rec.post_id)) {
      recommendationsMap.set(rec.post_id, rec);
    }
  });

  // Deduplicate engagements and merge data
  const mergedDataMap = new Map<string, UnifiedData>();

  engagements.forEach((eng) => {
    const post = postsMap.get(eng.post_id) || {};
    const rec = recommendationsMap.get(eng.post_id) || {};

    if (!mergedDataMap.has(eng.post_id)) {
      mergedDataMap.set(eng.post_id, {
        ...eng,
        ...post,
        ...rec,
        user_name: post?.user_name ?? "",
        genre: post?.genre ?? "",
        hash_tags: post?.hash_tags ?? "",
        post_type: rec?.post_type ?? "",
        most_related_hashtag: rec?.most_related_hashtag ?? "",
      });
    }
  });

  return Array.from(mergedDataMap.values());
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
