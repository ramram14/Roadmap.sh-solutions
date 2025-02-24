/**
 * This is for seeding the database with dummy data.
 */


/**
const Blog = require("../models/blogModel");

const dummyBlogs = [
    {
        title: "The Art of Slow Living: Finding Peace in a Fast World",
        content: "In a world that moves at breakneck speed, embracing slow living can be a radical act. Slow living is about intentionality, mindfulness, and savoring the present moment. It’s about simplifying our schedules, reducing distractions, and making time for the things that truly matter. This approach to life can lead to greater fulfillment, deeper relationships, and improved well-being. In this article, we’ll explore the philosophy behind slow living and practical ways to incorporate it into daily life.",
        category: "Lifestyle",
        tags: ["mindfulness", "simplicity", "self-care", "well-being"]
    },
    {
        title: "Why Reading Fiction Can Make You a Better Person",
        content: "Reading fiction is often seen as a pastime, but it offers profound psychological and emotional benefits. Studies have shown that engaging with fictional stories enhances empathy, improves cognitive abilities, and even reduces stress. By immersing ourselves in different narratives, we gain insight into human nature and develop a broader perspective on life. Whether it’s a classic novel or contemporary storytelling, reading fiction can shape our worldview in unexpected ways.",
        category: "Hobby",
        tags: ["books", "reading", "fiction", "psychology"]
    },
    {
        title: "The Philosophy of Minimalism: More Than Just Decluttering",
        content: "Minimalism is often mistaken for an aesthetic trend, but at its core, it is a philosophy of intentionality. It’s about focusing on what truly adds value to our lives and letting go of excess. This mindset extends beyond material possessions and influences our relationships, commitments, and even the way we consume information. By embracing minimalism, we create space for clarity, purpose, and genuine happiness.",
        category: "Philosophy",
        tags: ["minimalism", "decluttering", "intentionality", "mindset"]
    },
    {
        title: "The Power of Morning Routines: How to Start Your Day Right",
        content: "A well-structured morning routine can set the tone for the rest of the day. Successful individuals often have habits that help them maximize productivity, maintain mental clarity, and sustain their motivation. From journaling to meditation, exercising to reading, designing a personalized morning routine can be a game-changer. In this article, we’ll explore the key elements of an effective morning ritual and how to implement them into your daily life.",
        category: "Lifestyle",
        tags: ["habits", "morning-routine", "productivity", "self-improvement"]
    },
    {
        title: "The Joy of Journaling: How Writing Can Transform Your Life",
        content: "Journaling is more than just putting words on paper—it is a powerful tool for self-reflection, emotional processing, and personal growth. From gratitude journaling to stream-of-consciousness writing, there are many ways to harness the benefits of writing. Keeping a journal can improve mental clarity, reduce stress, and even boost creativity. In this post, we’ll discuss different journaling methods and how to make it a daily habit.",
        category: "Hobby",
        tags: ["journaling", "writing", "self-care", "mental-health"]
    },
    {
        title: "Finding Purpose: The Philosophy of a Meaningful Life",
        content: "What is the meaning of life? Philosophers have debated this question for centuries. While there is no universal answer, many find purpose through relationships, creativity, and self-growth. Existentialism, Stoicism, and other philosophical perspectives offer insights into how we can cultivate a sense of meaning in an often chaotic world. This article explores different philosophies on purpose and how they can apply to modern life.",
        category: "Philosophy",
        tags: ["meaning", "existentialism", "stoicism", "self-discovery"]
    },
    {
        title: "The Digital Detox: Reclaiming Your Time and Attention",
        content: "In an age of constant connectivity, stepping away from screens can feel impossible. However, excessive digital consumption often leads to burnout, anxiety, and decreased focus. A digital detox doesn’t mean completely abandoning technology—it means setting boundaries and using tech mindfully. We’ll discuss practical strategies for reducing screen time, improving digital well-being, and reclaiming time for meaningful offline activities.",
        category: "Lifestyle",
        tags: ["digital-detox", "mindfulness", "well-being", "productivity"]
    },
    {
        title: "The Therapeutic Power of Music: How Sounds Shape Our Emotions",
        content: "Music has the ability to heal, inspire, and connect us to deep emotions. From classical symphonies to modern indie tracks, different genres impact our moods and mental states in unique ways. Studies show that listening to music can reduce stress, boost memory, and even enhance creativity. This post explores the neuroscience behind music’s impact on the brain and how to use it to improve mental well-being.",
        category: "Hobby",
        tags: ["music", "therapy", "emotions", "brain-science"]
    },
    {
        title: "The Art of Doing Nothing: Embracing Rest in a Busy World",
        content: "In a culture that glorifies hustle and productivity, the idea of doing nothing is often dismissed as laziness. However, rest is essential for creativity, mental health, and overall well-being. The concept of ‘Niksen’—the Dutch practice of doing nothing—teaches us to embrace moments of idleness without guilt. This article delves into the science behind rest and how incorporating it into daily life can lead to greater fulfillment.",
        category: "Philosophy",
        tags: ["rest", "Niksen", "self-care", "mindfulness"]
    },
    {
        title: "Hobbies for Mental Health: Finding Joy in the Little Things",
        content: "Engaging in hobbies isn’t just about passing time—it’s a form of self-care. Whether it’s painting, gardening, playing an instrument, or cooking, hobbies offer an escape from stress and a way to express creativity. Studies suggest that dedicating time to enjoyable activities can reduce anxiety, improve mood, and enhance cognitive function. In this post, we’ll explore the connection between hobbies and mental well-being and how to find the right hobby for you.",
        category: "Hobby",
        tags: ["hobbies", "mental health", "creativity", "self-care"]
    }
];


const seedBlogs = async () => {
    try {
        await Blog.insertMany(dummyBlogs);
        // await Blog.deleteMany();
        console.log("Blogs seeded successfully");
    } catch (error) {
        console.error(error);
    }
};

module.exports = seedBlogs;
*/