function getCategoryMetaDescription(category) {
    switch (category) {
        case 'Programming':
            return "Enhance your coding skills with RelaxByte's comprehensive tutorials. Stay updated on the latest software trends and tackle coding challenges effortlessly.";
            
        case 'Video-Games':
            return "Embark on a virtual journey with RelaxByte's Video Games category. Explore gaming tips, insightful reviews, and stay in the loop with the latest game releases.";
            
        case 'Anime':
            return "Indulge in the enchanting world of anime at RelaxByte. Immerse yourself in detailed reviews, discover anime recommendations, and stay informed with the latest industry news.";
            
        case 'News':
            return "Stay connected and informed with RelaxByte's News category. Delve into timely articles covering global events, insightful analyses, and thought-provoking perspectives.";
            
        case 'Gadget-Reviews':
            return "Experience the world of Gadget Reviews with RelaxByte. Dive into in-depth analyses, explore every detail of the latest products, and make informed decisions with our comprehensive reviews.";
            
        case 'Technology':
            return "Uncover the future with RelaxByte's Technology category. Explore the latest advancements, read gadget reviews, and stay ahead in the ever-evolving world of technology.";
            
        case 'Tutorial':
            return "Empower yourself through learning with RelaxByte's Tutorials. Our step-by-step guides cater to learners of all levels, helping you acquire new skills and knowledge effortlessly.";
            
        case 'Education':
            return "Ignite your intellect with RelaxByte's Education category. Dive into insightful articles, tutorials, and resources that foster a passion for learning.";
            
        default:
            return "Explore the diverse content on RelaxByte. From Programming and Video Games to Anime, News, detailed Gadget Reviews, Technology, and Tutorials, there's something for everyone.";
    }
}

export default getCategoryMetaDescription;
