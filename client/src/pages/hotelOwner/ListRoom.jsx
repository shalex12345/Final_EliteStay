import React, { useEffect, useState } from 'react'
import Title from '../../components/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const ListRoom = () => {
    const [rooms, setRooms] = useState([])
    const { axios, getToken, user, currency } = useAppContext()

    // Fetch Rooms of the Hotel Owner
    const fetchRooms = async () => {
        try {
            const { data } = await axios.get('/api/rooms/owner', { headers: { Authorization: `Bearer ${await getToken()}` } })

            if (data.success) {
                setRooms(data.rooms)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    // Toggle availability of the room
    const toggleAvailability = async (roomId) => {
        try {
            const { data } = await axios.post('/api/rooms/toggle-availability', { roomId }, {
                headers: { Authorization: `Bearer ${await getToken()}` }
            });

            if (data.message?.toLowerCase().includes('updated')) {
                toast.success(data.message || "Room availability updated");
                fetchRooms();
            } else {
                toast.error(data.message || "Unexpected response from server");
            }
        } catch (error) {
            toast.error(error.message || "Failed to update room availability");
        }
    }




    useEffect(() => {
        if (user) {
            fetchRooms()
        }
    }, [user])

    return (
        <div>
            <Title align='left' font='Cal Sans' title='Room Listings' subTitle="View, edit, and manage all your listed rooms with ease. Keep details updated to ensure the best experience for your guests." />
            <p className='text-gray-800 mt-8'>All Rooms</p>
            <div className='mt-3 w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll'>
                <table className='w-full'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='py-3 px-4 text-gray-800 font-medium'>User Name</th>
                            <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Facility</th>
                            <th className='py-3 px-4 text-gray-800 font-medium'>Price / Night</th>
                            <th className='py-3 px-4 text-gray-800 font-medium text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='text-xs'>
                        {
                            rooms.map((item, index) => (
                                <tr key={index}>
                                    <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                                        {item.roomType}
                                    </td>
                                    <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>
                                        {item.amenities.join(', ')}
                                    </td>
                                    <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                                        {currency} {item.pricePerNight}
                                    </td>
                                    <td className='text-center py-3 px-4 border-t border-gray-300 text-sm text-red-500'>
                                        <label className='relative inline-flex item-center cursor-pointer text-gray-900 gap-3'>
                                            <input onChange={() => toggleAvailability(item._id)} type="checkbox" className='sr-only peer' checked={item.isAvailable} />
                                            <div className='w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200'>

                                            </div>
                                            <span className='dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5'></span>
                                        </label>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListRoom
