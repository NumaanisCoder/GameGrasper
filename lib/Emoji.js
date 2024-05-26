const getEmoji = (category) => {
    let emoji = "";
  
    if (category === 'Video Games') {
      emoji = "&#127918;";
    } else if (category === 'Programming') {
      emoji = "&#9000;";
    } else if (category === 'Education') {
      emoji = "&#127891;";
    } else if (category === 'Technology') {
      emoji = "&#128187;";
    } else if (category === 'News') {
      emoji = "&#128240;";
    }
  
    return emoji;
  }
  
  export default getEmoji;
  