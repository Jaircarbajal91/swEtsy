import EmptyStar from '../images/EmptyStar.svg'
import HalfStar from '../images/HalfStar.svg'
import FullStar from '../images/FullStar.svg'

const Star = ({ star }) => {
    let rating_star = '';
    if (star === 'full') rating_star = (<img src={FullStar} alt='full-star' />)
    else if (star === 'half') rating_star = (<img src={HalfStar} alt='half-star' />)
    else rating_star = (<img src={EmptyStar} alt='empty-star' />)
    return (
        <>
            {rating_star}
        </>
    )
}

export default Star;
