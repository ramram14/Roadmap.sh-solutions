const fs = require('fs');

/**
 * You can seed the database in this file.
 */

const newData = [
  {
    "title": "The Art of Slow Living",
    "slug": "the-art-of-slow-living",
    "createdAt": "2025-02-24T10:00:00Z",
    "updatedAt": "2025-02-24T10:00:00Z",
    "content": "In a world that moves at breakneck speed, embracing the art of slow living can be a game-changer. Slow living is about being intentional, appreciating the present, and cultivating mindfulness in daily life. It means savoring your morning coffee instead of rushing through it, taking a walk without constantly checking your phone, and genuinely listening to conversations without thinking about the next task. The benefits of slow living extend beyond relaxation – they improve mental well-being, enhance creativity, and strengthen relationships. In this blog, we'll explore ways to incorporate slow living into your routine, from simplifying commitments to practicing gratitude."
  },
  {
    "title": "Finding Joy in Small Moments",
    "slug": "finding-joy-in-small-moments",
    "createdAt": "2025-02-24T11:00:00Z",
    "updatedAt": "2025-02-24T11:00:00Z",
    "content": "Life isn’t always about grand achievements; sometimes, true happiness lies in small, everyday moments. The laughter shared with a friend, the warmth of sunlight through your window, or the aroma of freshly baked bread – these seemingly insignificant experiences hold immense value. By shifting our focus from chasing big milestones to appreciating the present, we can cultivate a more fulfilling life. In this post, we discuss the importance of mindfulness, gratitude, and perspective in recognizing joy in our daily routines."
  },
  {
    "title": "How Hobbies Enrich Your Life",
    "slug": "how-hobbies-enrich-your-life",
    "createdAt": "2025-02-24T12:00:00Z",
    "updatedAt": "2025-02-24T12:00:00Z",
    "content": "Hobbies are more than just pastimes; they are gateways to self-expression, learning, and personal growth. Whether it’s painting, gardening, writing, or playing an instrument, engaging in a hobby helps reduce stress and improve mental well-being. Studies show that hobbies provide a sense of accomplishment and boost creativity, making them essential for a balanced life. This blog explores different hobbies and their impact, along with tips on how to discover the right one for you."
  },
  {
    "title": "The Magic of Handwritten Letters",
    "slug": "the-magic-of-handwritten-letters",
    "createdAt": "2025-02-24T13:00:00Z",
    "updatedAt": "2025-02-24T13:00:00Z",
    "content": "In a digital age where instant messaging dominates, handwritten letters hold a rare charm. There is something deeply personal and nostalgic about putting pen to paper, choosing the right words, and sealing a letter with care. Handwritten notes create a tangible connection between sender and receiver, evoking emotions that typed messages often lack. This blog delves into the lost art of letter writing, why it still matters, and how you can bring it back into your life."
  },
  {
    "title": "Understanding Love Languages",
    "slug": "understanding-love-languages",
    "createdAt": "2025-02-24T14:00:00Z",
    "updatedAt": "2025-02-24T14:00:00Z",
    "content": "Love isn’t just about feelings; it’s also about understanding how we give and receive it. The concept of love languages, introduced by Dr. Gary Chapman, helps individuals identify their primary way of expressing and receiving love. Whether through words of affirmation, acts of service, receiving gifts, quality time, or physical touch, recognizing love languages can strengthen relationships and improve communication. In this post, we explore each love language and provide insights on how to apply them in daily life."
  },
  {
    "title": "Minimalism: Less is More",
    "slug": "minimalism-less-is-more",
    "createdAt": "2025-02-24T15:00:00Z",
    "updatedAt": "2025-02-24T15:00:00Z",
    "content": "Minimalism isn’t just about owning fewer things; it’s a lifestyle focused on what truly matters. By decluttering both physically and mentally, we create space for clarity, purpose, and joy. This blog explores the benefits of minimalism, practical steps to simplify your life, and how embracing 'less' can lead to greater fulfillment."
  },
  {
    "title": "The Power of Journaling",
    "slug": "the-power-of-journaling",
    "createdAt": "2025-02-24T16:00:00Z",
    "updatedAt": "2025-02-24T16:00:00Z",
    "content": "Journaling is more than just putting words on paper—it’s a tool for self-discovery, emotional processing, and creativity. Many successful individuals attribute their clarity of thought and decision-making skills to journaling. Whether you’re jotting down daily reflections, expressing gratitude, or brainstorming ideas, maintaining a journal can significantly improve your mental well-being. In this blog, we discuss different journaling techniques and how to make it a consistent habit."
  },
  {
    "title": "Cooking as a Love Language",
    "slug": "cooking-as-a-love-language",
    "createdAt": "2025-02-24T17:00:00Z",
    "updatedAt": "2025-02-24T17:00:00Z",
    "content": "Food has always been a symbol of love, care, and connection. Cooking for someone isn’t just about nourishment—it’s about showing affection, creating memories, and sharing joy. From preparing a simple home-cooked meal to crafting a special dish for a loved one, cooking can be a powerful way to express emotions. This blog explores the deep connection between food and love and offers simple recipes to share with those you care about."
  },
  {
    "title": "The Beauty of Sunrise and Sunset",
    "slug": "the-beauty-of-sunrise-and-sunset",
    "createdAt": "2025-02-24T18:00:00Z",
    "updatedAt": "2025-02-24T18:00:00Z",
    "content": "Few things in life are as breathtaking as a sunrise or sunset. These daily events remind us of the passage of time, the beauty of nature, and the importance of pausing to appreciate our surroundings. Whether you’re an early riser catching the first light of day or someone who finds solace in the golden hues of dusk, the experience of witnessing these moments can be deeply reflective and inspiring. This post dives into the significance of sunrises and sunsets and how they can be a source of peace."
  },
  {
    "title": "Building Meaningful Friendships",
    "slug": "building-meaningful-friendships",
    "createdAt": "2025-02-24T19:00:00Z",
    "updatedAt": "2025-02-24T19:00:00Z",
    "content": "Friendship is one of the most valuable aspects of life, yet maintaining meaningful connections requires effort and intention. In a world of digital interactions, genuine friendships are built on trust, support, and shared experiences. This blog explores the key ingredients of strong friendships, how to nurture them over time, and ways to be a better friend to those around you."
  }
]



fs.writeFile(__dirname + '/db.json', JSON.stringify(newData), (err) => {
  if (err) throw err;
  console.log('Database created!');
});

