export interface CombinationImpact {
  combination: string;
  combinedPerformance: number;
  baselinePerformance: number;
  impact: number;
}

export const calculateCombinationImpacts = (
  posts: any[]
): CombinationImpact[] => {
  const impacts: CombinationImpact[] = [];

  posts.forEach((post) => {
    const hashtags: string[] = JSON.parse(post.hash_tags.replace(/'/g, '"'));
    const totalEngagement = post.likes_cnt + post.comments_cnt + post.saved_cnt;

    const numTags = hashtags.length;

    // Normalize individual performance using diminishing returns
    const normalizedEngagement = totalEngagement / (1 + 0.5 * (numTags - 1)); // Diminishing returns

    for (let i = 0; i < hashtags.length; i++) {
      for (let j = i + 1; j < hashtags.length; j++) {
        const tag1 = hashtags[i];
        const tag2 = hashtags[j];

        // Combined pair performance baseline
        const baselinePerformance = (2 * normalizedEngagement) / numTags; // Sum of two individual contributions

        // Simulate pair impact using a relatedness factor (adjust if needed)
        const relatednessFactor = Math.random() * (1.2 - 0.8) + 0.8; // Random relatedness factor
        const combinedPerformance = baselinePerformance * relatednessFactor;

        // Calculate the impact (combined - baseline)
        const impact = combinedPerformance - baselinePerformance;

        impacts.push({
          combination: `${tag1}, ${tag2}`,
          combinedPerformance,
          baselinePerformance,
          impact,
        });
      }
    }
  });

  return impacts;
};
