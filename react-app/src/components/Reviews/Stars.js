import Star from "./Star";

const Stars = ({ rating }) => {

    let starArray = [];
    for (let i = 0; i < Math.floor(rating); i++) {
        starArray.push('full');
    }
    if (rating % 1 !== 0) {
        if (rating % 1 < 0.25) starArray.push('empty');
        else if (rating % 1 >= 0.25 && rating % 1 < 0.75) starArray.push('half')
        else starArray.push('full')
    }
    for (let j = 0; j < (5 - Math.ceil(rating)); j++) {
        starArray.push('empty');
    }
    // console.log(starArray);
    starArray.forEach(star => console.log(star));
    starArray = starArray.slice(0, 5);
    return (
            <>
            {starArray.map((star, i) => (
                <Star key={i} star={star}/>
            ))}
        </>
    );
};

export default Stars;
