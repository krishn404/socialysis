import { NextResponse } from "next/server";
import { fetchAnalysisData } from "@/app/lib/csvUtils";

// In-memory cache
let cache = {
  result: null as any,
  lastUpdated: 0,
};

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export async function GET() {
  try {
    const now = Date.now();
    if (cache.result && now - cache.lastUpdated < CACHE_DURATION) {
      console.log("Serving from cache");
      return NextResponse.json(cache.result);
    }

    console.log("Calculating and caching result...");
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

    // Aggregate Hashtag Metrics
    const hashtagMap = new Map<string, any>();
    posts.forEach((post) => {
      const hashtags = JSON.parse(post.hash_tags.replace(/'/g, '"'));
      hashtags.forEach((hashtag: string) => {
        const tag = hashtagMap.get(hashtag) || {
          hashtag,
          likes: 0,
          comments: 0,
          saves: 0,
          count: 0,
        };
        tag.likes += parseInt(post.likes_cnt);
        tag.comments += parseInt(post.comments_cnt);
        tag.saves += parseInt(post.saved_cnt);
        tag.count += 1;
        hashtagMap.set(hashtag, tag);
      });
    });
    const hashtagData = Array.from(hashtagMap.values());

    // Generate Unique Hashtag Pairs and Calculate Impacts
    const combinationImpacts = [];
    const hashtagsArray = Array.from(hashtagMap.values());
    for (let i = 0; i < hashtagsArray.length; i++) {
      for (let j = i + 1; j < hashtagsArray.length; j++) {
        const tag1 = hashtagsArray[i];
        const tag2 = hashtagsArray[j];
        const pair = [tag1.hashtag, tag2.hashtag].sort().join(", ");

        // Calculate Expected Combined Performance
        const expectedLikes =
          (tag1.likes / tag1.count + tag2.likes / tag2.count) / 2;
        const expectedComments =
          (tag1.comments / tag1.count + tag2.comments / tag2.count) / 2;
        const expectedSaves =
          (tag1.saves / tag1.count + tag2.saves / tag2.count) / 2;

        // Calculate Actual Combined Performance
        const overlapLikes = Math.min(tag1.likes, tag2.likes) * 0.3; // Assume 30% overlap
        const overlapComments = Math.min(tag1.comments, tag2.comments) * 0.3;
        const overlapSaves = Math.min(tag1.saves, tag2.saves) * 0.3;

        const actualCombinedLikes = tag1.likes + tag2.likes - overlapLikes;
        const actualCombinedComments =
          tag1.comments + tag2.comments - overlapComments;
        const actualCombinedSaves = tag1.saves + tag2.saves - overlapSaves;

        // Calculate Percentage Impacts
        const likesImpactPercentage =
          (actualCombinedLikes / expectedLikes) * 100;
        const commentsImpactPercentage =
          (actualCombinedComments / expectedComments) * 100;
        const savesImpactPercentage =
          (actualCombinedSaves / expectedSaves) * 100;

        combinationImpacts.push({
          combination: pair,
          likesImpactPercentage: parseFloat(likesImpactPercentage.toFixed(2)),
          commentsImpactPercentage: parseFloat(
            commentsImpactPercentage.toFixed(2)
          ),
          savesImpactPercentage: parseFloat(savesImpactPercentage.toFixed(2)),
        });
      }
    }

    // Genre Collaboration Analysis using related_genres
    const genreCollaborationMap = new Map<string, any>();
    posts.forEach((post) => {
      const relatedGenres = JSON.parse(post.related_genres.replace(/'/g, '"'));
      relatedGenres.forEach((relatedGenre: string) => {
        const genrePair = [post.genre, relatedGenre].sort().join(" & ");

        const existing = genreCollaborationMap.get(genrePair) || {
          genre_pair: genrePair,
          combinedPerformance: 0,
          baselinePerformance: 0,
          impact: 0,
        };

        const combinedPerformance =
          parseInt(post.likes_cnt) +
          parseInt(post.comments_cnt) +
          parseInt(post.saved_cnt);

        const baselinePerformance =
          parseInt(post.likes_cnt) +
          parseInt(post.comments_cnt) +
          parseInt(post.saved_cnt);

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
      { error: error instanceof Error ? error.message : "An error occurred" },
      { status: 500 }
    );
  }
}
