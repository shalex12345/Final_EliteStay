import React, { useState } from 'react'
import { assets, facilityIcons, roomsDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import StarRating from '../components/StarRating'


const CheckBox = ({ label, selected = false, onChange = () => { } }) => {
    return (
        <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
            <input type="checkbox" checked={selected} onChange={(e) => onChange(e.target.checked, label)} />
            <span className='font-light select-none'>{label}</span>
        </label>
    )
}
const RadioButton = ({ label, selected = false, onChange = () => { } }) => {
    return (
        <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
            <input type="radio" name='sortOption' checked={selected} onChange={(e) => onChange(label)} />
            <span className='font-light select-none'>{label}</span>
        </label>
    )
}

const AllRooms = () => {
    const navigate = useNavigate()
    const [openFilters, setOpenFilters] = useState(false)
    const roomTypes = [
        "Presidential Suite",
        "Skyline Penthouse",
        "Imperial Suite",
        "The Grand Luxe Room",
    ]
    const priceRange = [
        '0 to 500',
        '500 to 1000',
        '1000 to 5000',
        '5000 to 8000',
    ]
    const sortOptions = [
        "Price Low to High",
        "Price High to Low",
        "Newest First",
    ]
    return (
        <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32 bg-[#e4f6f7]'>
            <div>
                <div className='flex flex-col items-start text-left'>
                    <h1 className='text-4xl md:text-[40px]'>Hotel Rooms</h1>
                    <p className='text-sm md:text-base text-[#5C6B73] mt-2 max-w-174'>Enjoy exclusive limited-time offers and curated packages designed to elevate your stay and create unforgettable memories.</p>
                </div>

                {roomsDummyData.map((room) => (
                    <div key={room._id} className='flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0'>
                        <img src={room.images[0]} alt="hotel-img" title='View Room Details' className='max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer' onClick={() => { navigate(`/rooms/${room._id}`); scrollTo(0, 0) }} />
                        <div>
                            <p className='text-gray-500'>{room.hotel.city}</p>
                            <p onClick={() => { navigate(`/rooms/${room._id}`); scrollTo(0, 0) }} className='text-[#253237] text-3xl font-Cal Sans cursor-pointer'>{room.hotel.name}</p>
                            <div className='flex items-center'>
                                <StarRating />
                                <p className='ml-2'>200+ reviews</p>
                            </div>
                            <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
                                <img src={assets.locationIcon} alt="location Icon" />
                                <span>{room.hotel.address}</span>
                            </div>
                            {/* Room Amenitites */}
                            <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                                {room.amenities.map((item, index) => (
                                    <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-[#C2DFE3]/70'>
                                        <img src={facilityIcons[item]} alt={item} className='w-5 h-5' />
                                        <p className='text-xs text-[#253237]'>{item}</p>
                                    </div>
                                ))}
                            </div>
                            {/* Room Price per night */}
                            <p className='text-xl font-medium text-gray-700'>${room.pricePerNight} /night</p>
                        </div>
                    </div>
                ))}


            </div>
            {/* Filters */}
            <div className='bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16'>
                <div className={`flex items-center justify-between px-5 py-2.5 min-lg:border-b border-gray-300 ${openFilters && "border-b"}`}>
                    <p className='text-base font-medium text-gray-800'>FILTERS</p>
                    <div className='text-xs cursor-pointer'>
                        <span onClick={() => setOpenFilters(!openFilters)} className='lg:hidden'>
                            {openFilters ? 'HIDE' : 'SHOW'}</span>
                        <span className='hidden lg:block'>CLEAR</span>
                        {/* 2 35 32 */}
                    </div>
                </div>
                <div className={`${openFilters ? "h-auto" : "h-0 lg:h-auto"} overflow-hidden transition-all duration-700`}>
                    <div className='px-5 pt-5'>
                        <p className='font-medium text-gray-800 pb-2'>Popular Filters</p>
                        {roomTypes.map((room, index) => (
                            <CheckBox key={index} label={room} />
                        ))}
                    </div>
                    <div className='px-5 pt-5'>
                        <p className='font-medium text-gray-800 pb-2'>Price Range</p>
                        {priceRange.map((range, index) => (
                            <CheckBox key={index} label={`${range}`} />
                        ))}
                    </div>
                    <div className='px-5 pt-5 pb-7'>
                        <p className='font-medium text-gray-800 pb-2'>Sort By</p>
                        {sortOptions.map((option, index) => (
                            <RadioButton key={index} label={option} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllRooms
