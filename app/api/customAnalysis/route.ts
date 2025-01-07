import { NextResponse } from "next/server";
import { fetchAnalysisData } from "@/app/lib/csvUtils";

// In-memory cache
let cache = {
  result: null as any, // Cached result
  lastUpdated: 0, // Timestamp of the last update
};

const CACHE_DURATION = 60 * 60 * 10000; // 1 hour in milliseconds

export async function GET() {
  try {
    // Check if the cache is still valid
    const now = Date.now();
    if (cache.result && now - cache.lastUpdated < CACHE_DURATION) {
      console.log("Serving from cache");
      return NextResponse.json(cache.result);
    }

    console.log("Calculating and caching result...");

    // Fetch and process data
    const posts = await fetchAnalysisData();

    // Totals
    const totals = posts.reduce(
      (acc, post) => {
        acc.likes += parseInt(post.likes_cnt);
        acc.comments += parseInt(post.comments_cnt);
        acc.saves += parseInt(post.saved_cnt);
        return acc;
      },
      { likes: 0, comments: 0, saves: 0 }
    );

    // Genre Analysis
    const genreMap = new Map<string, any>();
    posts.forEach((post) => {
      const genre = genreMap.get(post.genre) || {
        genre: post.genre,
        likes: 0,
        comments: 0,
        saves: 0,
      };
      genre.likes += parseInt(post.likes_cnt);
      genre.comments += parseInt(post.comments_cnt);
      genre.saves += parseInt(post.saved_cnt);
      genreMap.set(post.genre, genre);
    });
    const genreData = Array.from(genreMap.values());

    // Hashtag Analysis
    const hashtagMap = new Map<string, any>();
    posts.forEach((post) => {
      const hashtags = JSON.parse(post.hash_tags.replace(/'/g, '"'));
      hashtags.forEach((hashtag: string) => {
        const tag = hashtagMap.get(hashtag) || {
          hashtag,
          likes: 0,
          comments: 0,
          saves: 0,
        };
        tag.likes += parseInt(post.likes_cnt);
        tag.comments += parseInt(post.comments_cnt);
        tag.saves += parseInt(post.saved_cnt);
        hashtagMap.set(hashtag, tag);
      });
    });
    const hashtagData = Array.from(hashtagMap.values());

    // Combination Impact Analysis
    const combinationImpacts = [];
    posts.forEach((post) => {
      const hashtags = JSON.parse(post.hash_tags.replace(/'/g, '"'));
      for (let i = 0; i < hashtags.length; i++) {
        for (let j = i + 1; j < hashtags.length; j++) {
          const pair = [hashtags[i], hashtags[j]].sort().join(", ");
          const combinedPerformance =
            parseInt(post.likes_cnt) +
            parseInt(post.comments_cnt) +
            parseInt(post.saved_cnt);
          const baselinePerformance = combinedPerformance / 2; // Assume equal contribution
          const impact = combinedPerformance - baselinePerformance;
          combinationImpacts.push({
            combination: pair,
            combinedPerformance,
            baselinePerformance,
            impact,
          });
        }
      }
    });

    // Genre Collaboration Analysis
    const genreCollaborationMap = new Map<string, any>();
    posts.forEach((post) => {
      posts.forEach((otherPost) => {
        if (post.post_id === otherPost.post_id) return;
        const genrePair = [post.genre, otherPost.genre].sort().join(" & ");

        const existing = genreCollaborationMap.get(genrePair) || {
          genre_pair: genrePair,
          combinedPerformance: 0,
          baselinePerformance: 0,
          impact: 0,
        };

        const combinedPerformance =
          parseInt(post.likes_cnt) +
          parseInt(post.comments_cnt) +
          parseInt(post.saved_cnt) +
          parseInt(otherPost.likes_cnt) +
          parseInt(otherPost.comments_cnt) +
          parseInt(otherPost.saved_cnt);

        const baselinePerformance =
          parseInt(post.likes_cnt) +
          parseInt(post.comments_cnt) +
          parseInt(post.saved_cnt) +
          (parseInt(otherPost.likes_cnt) +
            parseInt(otherPost.comments_cnt) +
            parseInt(otherPost.saved_cnt));

        const impact = combinedPerformance - baselinePerformance;

        existing.combinedPerformance += combinedPerformance;
        existing.baselinePerformance += baselinePerformance;
        existing.impact += impact;

        genreCollaborationMap.set(genrePair, existing);
      });
    });
    const genreCollaboration = Array.from(genreCollaborationMap.values());

    // Cache the result
    cache = {
      result: {
        totals,
        genreData,
        hashtagData,
        combinationImpacts,
        genreCollaboration,
      },
      lastUpdated: now,
    };

    return NextResponse.json(cache.result);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "An error occurred",
        data: null,
      },
      { status: 500 }
    );
  }
}
