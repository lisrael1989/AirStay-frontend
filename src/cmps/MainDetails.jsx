// import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import { useRef, useState } from "react"
import { Amenities } from "./Amenities"
import Avatar from '@mui/material/Avatar';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { utilService } from "../services/util.service";
// import Stack from '@mui/material/Stack';

export function MainDetails({ stay, filterBy, onSetFilter }) {
    // const [startDate, setStartDate] = useState(new Date())
    // const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [isOpen, setIsOpen] = useState(true)

    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setIsOpen(true)
        }
    }

    const { stars, averageRating } = utilService.getStarsWithRating(stay)

    const rate = stay.reviews.reduce((acc, review) => acc + review.rate, 0)
    // const amenities =stay.amenities.slice(0,3)// use it in the future
    return (
        <div className='main-user-host'>
            <div className="little-details">
                <h2 className="second-title-details">Entire rental Unit {stay.loc.country},{stay.loc.city}</h2>
                <div className=" house-details flex">
                    <span>{stay.capacity} guests</span> • <span>{stay.roomType}</span> • <span> {stay.bedrooms} bedrooms</span>•<span> {stay.bathrooms} bathrooms</span>
                </div>
            </div>

            <div className='details-user'>
                {stay.reviews.length > 2 ? (<div className="host-things border">
                    {averageRating > 4.5 && (
                        <section className="guest-favorite">
                            <img src="/img/guest-fav.png"></img>
                        </section>
                    )}


                    <div className="reviews-details-stars">
                        <div className="rate-details">{averageRating}</div>
                        <div className="stars-details">{stars}</div>
                    </div>
                    <span>|</span>
                    <section className="review-usr"><span className="num-reviews">{stay.reviews.length} </span> <span className="reviews-span">Reviews</span> </section>
                </div>) : <a>★ {stay.reviews.length < 1 ? `Not rated yet` : `${stay.reviews.length} reviews`} </a>}

                <section className="host-details">
                    <Avatar alt="Travis Howard" src={stay.host.imgUrl} />
                    <section className="host-short">
                        <h4 className="host-name-details">Hosted by {stay.host.fullname}</h4>
                        <p>{stay.host.isSuperhost ? "Superhost" : ""} • 2 years hosting</p>
                    </section>
                </section>
            </div>
            {/* <hr className="hr-line-details" /> */}

            <div className="more-details">
                <div className="flex"><span><i className="fa-regular fa-calendar"></i></span><p>Free cancellation for 48 hours</p>
                </div>
                <div className="flex"><span><i className="fa-solid fa-paw"></i></span><p>Furry friends welcome</p>
                </div>
                <div className="flex"><span><i className="fa-brands fa-product-hunt"></i></span><p>Park for free</p>
                </div>
            </div>


            <div className="details-description">
                <section></section>
                <p>{stay.summary}</p>
                <section></section>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum rerum, suscipit, nesciunt voluptatibus vero tenetur facere explicabo odio dolorem velit aliquid, exercitationem similique aut corrupti placeat quaerat! Rerum, tenetur ullam?</p>
                <div className="show-more-desc">
                    <span className="text-show-more">show more</span><span> {'>'}</span>
                </div>
            </div>

            <div className="details-amenities">
                <Amenities amenities={stay.amenities} />
            </div>

            {/* <MyDateRangePicker/> */}
            <div className="date-pick-details">
                <h3 className="title-dates-details"> {!utilService.getNumOfDays(filterBy.checkIn, filterBy.checkOut) ? "" : utilService.getNumOfDays(filterBy.checkIn, filterBy.checkOut)} {!utilService.getNumOfDays(filterBy.checkIn, filterBy.checkOut) ? "Add dates" : "Nights in"} {stay.name}  </h3>
                <DatePicker
                    selected={filterBy.checkIn}
                    onChange={(dates) => {
                        const [start, end] = dates
                        onSetFilter.current({
                            ...filterBy,
                            checkIn: start,
                            checkOut: end
                        })
                    }}
                    startDate={filterBy.checkIn}
                    endDate={filterBy.checkOut}
                    selectsRange

                    monthsShown={2}
                    open={isOpen}
                    minDate={new Date()}
                />
            </div>
            <div className="date-pick-details-one-month">
                <h3 className="title-dates-details"> {!utilService.getNumOfDays(filterBy.checkIn, filterBy.checkOut) ? "" : utilService.getNumOfDays(filterBy.checkIn, filterBy.checkOut)} {!utilService.getNumOfDays(filterBy.checkIn, filterBy.checkOut) ? "Add dates" : "Nights in"} {stay.name}  </h3>
                <DatePicker
                    selected={filterBy.checkIn}
                    onChange={(dates) => {
                        const [start, end] = dates
                        onSetFilter.current({
                            ...filterBy,
                            checkIn: start,
                            checkOut: end
                        })
                    }}
                    startDate={filterBy.checkIn}
                    endDate={filterBy.checkOut}
                    selectsRange

                    monthsShown={1}
                    open={isOpen}
                    minDate={new Date()}
                />
            </div>
        </div >
    )
}