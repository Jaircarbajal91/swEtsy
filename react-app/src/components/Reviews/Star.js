import EmptyStar from '../images/EmptyStar.svg'
import HalfStar from '../images/HalfStar.svg'
import FullStar from '../images/FullStar.svg'

const Star = ({ star }) => {
    let rating_star = '';
    if (star === 'full') rating_star = (<img src={FullStar} alt='full-star' style={{ width: '20px', height: '20px' }} />)
    else if (star === 'half') rating_star = (<img src={HalfStar} alt='half-star' style={{ width: '20px', height: '20px' }} />)
    else rating_star = (<img src={EmptyStar} alt='empty-star' style={{ width: '20px', height: '20px' }} />)
    return (
        <>
            {rating_star}
        </>
    )
}

export default Star;
