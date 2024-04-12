import { useEffect, useState } from "react"
import { stayService } from "../services/stay.service"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import Swal from 'sweetalert2';
import { MultiSelect } from '../cmps/MultiSelect.jsx';
import { MultiSelectAmenities } from '../cmps/MultiSelectAmenities.jsx';
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { addStay } from "../store/stay.actions"
import { ImgUploader } from "../cmps/ImgUploader.jsx";

export function AddStay() {
    const [stay, setStay] = useState(stayService.getEmptyStay())
    const navigate = useNavigate()
    function onUploaded(img) {
        setStay(prevStay => ({ ...prevStay, imgUrls: [...prevStay.imgUrls, img] }))
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setStay((prevStay) => ({ ...prevStay, [field]: value }))
    }
    function handleLocChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : capitalizeFirstLetter(value)
        setStay((prevStay) => ({ ...prevStay, loc: { ...prevStay.loc, [field]: value } }))
    }

    function onSetLabel(label) {
        const labels = stay.labels.includes(label) ? stay.labels.filter(l => l !== label) : [label, ...stay.labels]
        setStay(prevStay => ({ ...prevStay, labels }))
    }

    function onSetAmenitie(amenitie) {
        const amenities = stay.amenities.includes(amenitie) ? stay.amenities.filter(l => l !== amenitie) : [amenitie, ...stay.amenities]
        setStay(prevStay => ({ ...prevStay, amenities }))
    }


    // async function onSaveStay(ev) {
    //     ev.preventDefault()
    //     try {
    //         await addStay(stay)
    //         showSuccessMsg('Stay Saved!')
    //         navigate('/')
    //     } catch (error) {
    //         console.error('Error saving stay:', error)
    //         showErrorMsg('Had issues in Stay details')
    //     }
    // }

    async function onSaveStay(ev) {
        ev.preventDefault();
        // Show SweetAlert confirmation dialog
        const result = await Swal.fire({
            title: "You sure you want add your home?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Add my home",
            denyButtonText: `Don't Add`,
        });

        if (result.isConfirmed) {
            try {
                await addStay(stay);
                showSuccessMsg('Stay Saved!');
                Swal.fire("Saved!", "", "success");
                navigate('/');
            } catch (error) {
                console.error('Error saving stay:', error);
                showErrorMsg('Had issues in Stay details');

                Swal.fire("Error!", "There was a problem saving your stay.", "error");
            }
        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }
    }

    function capitalizeFirstLetter(string) {
        if (!string) return ''
        return string.charAt(0).toUpperCase() + string.slice(1)
    }


    return (
        <section className="stay-add">
            <h2> Airstay your home</h2>

            <form onSubmit={onSaveStay}>
                <div className="addStay flex column">
                    <label htmlFor="name">name of your stay: </label>
                    <input className="input" type="text" name="name" id="name" placeholder="Enter name..." value={stay.name} onChange={handleChange} />
                    <label htmlFor="summary">Summary: </label>
                    <textarea className="input" type="text" name="summary" id="summary" placeholder="Enter summary..." value={stay.summary} onChange={handleChange} />
                    <label htmlFor="price">Price : </label>
                    <input className="input" type="number" name="price" id="price" placeholder="Enter price" value={stay.price} onChange={handleChange} />
                    <label htmlFor="capacity">capacity : </label>
                    <input className="input" type="number" name="capacity" id="capacity" placeholder="Enter capacity" value={stay.capacity} onChange={handleChange} />

                    <div>
                        <MultiSelect onSetLabel={onSetLabel} stay={stay} />
                    </div>
                    <div>
                        <MultiSelectAmenities onSetAmenitie={onSetAmenitie} stay={stay} />
                    </div>
                    <div className="location-input">
                        <label htmlFor="address">Address: </label>
                        <input className="input" type="text" name="address" id="address" placeholder="Enter address..." value={stay.loc.address} onChange={handleLocChange} />
                        <label htmlFor="city">City: </label>
                        <input className="input" type="text" name="city" id="city" placeholder="Enter city..." value={stay.loc.city} onChange={handleLocChange} />
                        <label htmlFor="country">Country: </label>
                        <input className="input" type="text" name="country" id="country" placeholder="Enter country..." value={stay.loc.country} onChange={handleLocChange} />
                    </div>
                    <div className="radio-sort input">
                        <label htmlFor="type"> Type of the Airstay</label>
                        <select value={stay.type} onChange={handleChange} name="type">
                            <option value="house">House</option>
                            <option value="studio">Studio</option>
                            <option value="room">Room</option>
                        </select>
                    </div>
                    <ImgUploader onUploaded={onUploaded} />
                    <div>
                        <button type="sumbmit">Add</button>
                        {/* <button ><Link className="add-btn" to="/stay">Cancel</Link></button> */}
                    </div>
                </div>
            </form>
        </section>
    );
}