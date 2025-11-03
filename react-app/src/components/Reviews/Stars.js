import Star from "./Star";

const Stars = ({ rating }) => {
    // Handle invalid or missing rating
    if (rating === null || rating === undefined || isNaN(rating) || rating < 0) {
        rating = 0;
    }
    // Ensure rating is within valid range (0-5)
    rating = Math.max(0, Math.min(5, Number(rating)));

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
    starArray = starArray.slice(0, 5);
    return (
        <div className="star-container" style={{
            display: 'flex',
            gap: '2px'
        }}>
            {starArray.map((star, i) => (
                <Star key={i} star={star} />
            ))}
        </div>
    );
};

export default Stars;
