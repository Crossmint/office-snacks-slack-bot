import { z } from "zod";

/**
 * Recommended snacks web tool
 * Returns a list of recommended snacks for the office
 */
export const recommendedSnacksTool = {
  name: "get_recommended_snacks",
  description: "Get a list of recommended snacks for the office",
  parameters: z.object({}),
  execute: async () => {
    return [
      {
        name: "RXBAR Protein Bars, Protein Snacks, Snack Bars, Variety Pack, 18.3oz Box (10 Bars)",
        description: "High protein bars made with simple ingredients like nuts and egg. Contains 12g protein, gluten-free, and kosher. Perfect for office snacking or post-workout. Pack includes Peanut Butter, Peanut Butter Chocolate, and Chocolate Sea Salt flavors.",
        url: "https://www.amazon.com/RXBAR-Protein-Snacks-Variety-18-3oz/dp/B0CND6BGC6/ref=sr_1_18?sr=8-18"
      },
      {
        name: "Vita Coco Organic Coconut Water, 11.1 Fl Oz (Pack of 12)",
        description: "Natural hydration drink packed with vitamins, nutrients, and electrolytes. Contains more potassium than a banana, fat-free, gluten-free, and non-GMO. Only 60 calories per bottle, perfect as a healthy alternative to sodas and sports drinks.",
        url: "https://www.amazon.com/Vita-Coco-Organic-Coconut-Water/dp/B07DJ16CD6"
      },
      {
        name: "CELSIUS Sparkling Cola, Functional Essential Energy Drink 12 Fl Oz (Pack of 12)",
        description: "Classic cola taste with 200mg caffeine, 7 essential vitamins, zero sugar, and no artificial ingredients. Gluten-free, kosher, non-GMO and vegan certified fitness drink.",
        url: "https://www.amazon.com/CELSIUS-Sparkling-Fitness-Drink-Sugar/dp/B007R8XGJK"
      },
      {
        name: "Sun-Maid Dried Mangos, Resealable Bag",
        description: "Premium Philippine style dried mango slices, picked fresh and never frozen. Non-GMO Project Verified with zero grams of fat, no artificial flavors, and only 140 calories per serving. Perfect for snacking, trail mix, or adding to recipes.",
        url: "https://www.amazon.com/Sun-Maid-Dried-Mangos-Resealable-Sweeteners/dp/B0CBN8NMS5"
      }
    ];
  },
};
