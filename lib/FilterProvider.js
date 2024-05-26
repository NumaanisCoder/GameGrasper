function getFilterOptions(Category){
    switch(Category){
        case 'JEE-MAINS':
            return ["Physics","Chemistry","Maths","Phy+Chem+Math", "Question Paper"]
        case 'NEET':
            return ["Physics","Chemistry","Biology","Phy+Chem+Bio", "Question Paper"] 
        case 'XI-Sci':
            return [ 'Physics', 'Maths', 'Chemistry', 'Biology', 'IT', 'English', 'Hindi','Physical Education', "Question Paper"]
        case 'XII-Sci':
            return [ 'Physics', 'Maths', 'Chemistry', 'Biology', 'IT', 'English', 'Hindi','Physical Education', "Question Paper"]
        case 'XI-Comm':
            return ['Physical Education', 'Accountancy', 'Economics', 'Business Studies', 'Fine Arts', 'IT', 'English', 'Hindi', "Question Paper"]
        case 'XII-Comm':
            return ['Physical Education', 'Accountancy', 'Economics', 'Business Studies', 'Fine Arts', 'IT', 'English', 'Hindi', "Question Paper"];
        case 'BTECH-CSE':
            return ['SEM 1', 'SEM 2', 'SEM 3', 'SEM 4', 'SEM 5', 'SEM 6', 'SEM 7', 'SEM 8', "Question Paper"];
        default:
            return ['Science', 'Social Science','Hindi','English','IT','Maths', "Question Paper"];
    }
}

export default getFilterOptions;