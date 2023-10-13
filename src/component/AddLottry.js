import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';



const AddLottry = () => {

    const [lottry, setLottry] = useState([]);
    // const handleUpdate = (itemId) => {

    //   };


    //   states for using get input fields value

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [date, setDate] = useState('');
    const [lottryNumber, setLottryNumber] = React.useState('');
    const [massage, setMassage] = React.useState('');
    const [quiz, setQuiz] = useState('');
    const [error, setError] = useState(false);


    // for check the input field are not empty

    const AddResult = async () => {

        if (!startTime || !endTime || !date || !lottryNumber || !massage || !quiz) {
            setError(true);
            return false
        }

        console.warn(startTime, endTime, date, lottryNumber, massage, quiz)
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        console.warn(userId);
        let result = await fetch("http://luckshowindia.com:5000/lottrys", {
            method: "post",
            body: JSON.stringify({ startTime, endTime, date, lottryNumber, massage, quiz }),
            headers: {
                "content-type": "application/json"
            }
        });
        if (result.status === 200) {
            alert('Result Submited');
            // window.location.reload();
        } else {
            alert('Result Not Submit');
        }
        result = await result.json();
        console.warn(result)
    }


    // define useEffect function and all condition

    useEffect(() => {
        getLottry();
    }, []);
    const getLottry = async () => {
        let result = await fetch('http://luckshowindia.com:5000/admin-lottry-data');
        result = await result.json();
        setLottry(result);
    }
    console.warn(lottry);


    // for format the date string 

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };



    // for delete button function

    const handleDelete = async (itemId) => {

        const response = await fetch(`http://luckshowindia.com:5000/lottrys/${itemId}`, {
            method: 'DELETE',
        });

        if (response.status === 200) {
            alert("Delete Successfully")
            window.location.reload();
        } else {

            console.error('Error deleting item');
        }
    };


    return (
        <div>
            <div className='container'>
                <div className='text-center'>
                    <h1 className='text-white mt-5'> Add Lottry Number</h1>
                </div>

                <form className="row gap-2 align-items-center mt-5 justify-content-center">
                    <div className="col-10 col-md-auto">
                        <input type="time" className="form-control" id="autoSizingInput" placeholder="start time"
                            value={startTime} onChange={(e) => { setStartTime(e.target.value) }}
                        />
                        {error && !startTime && <span className='text-danger'>faild</span>}
                    </div>
                    <div className="col-10 col-md-auto">
                        <input type="time" className="form-control" id="autoSizingInput" placeholder="End Time"
                            value={endTime} onChange={(e) => { setEndTime(e.target.value) }}
                        />
                        {error && !endTime && <span className='text-danger'>faild</span>}
                    </div>
                    <div className="col-10 col-md-auto">
                        <input type="date" className="form-control" id="autoSizingInput" placeholder="Date" 
                            value={date} onChange={(e) => { setDate(e.target.value) }}
                        />
                        {error && !date && <span className='text-danger'>faild</span>}
                    </div>
                    <div className="col-10 col-md-auto">
                        <input type="text" className="form-control" placeholder="Lottry Number"
                            value={lottryNumber} onChange={(e) => { setLottryNumber(e.target.value) }}
                        />
                        {error && !lottryNumber && <span className='text-danger'>faild</span>}
                    </div>
                    <div className="col-10 col-md-auto">
                        <input type="text" className="form-control" placeholder="Thought"
                            value={massage} onChange={(e) => { setMassage(e.target.value) }}
                        />
                        {error && !massage && <span className='text-danger'>faild</span>}
                    </div>
                    <div className="col-10 col-md-auto">
                        <select className="form-select"
                            value={quiz} onChange={(e) => { setQuiz(e.target.value) }}
                        >
                            <option value="" selected>Select Quiz</option>
                            <option value="Fun Quiz">Fun Quiz</option>
                            <option value="Wonder Quiz">Wonder Quiz</option>
                            <option value="Lucky Quiz">Lucky Quiz</option>
                        </select>
                        {error && !quiz && <span className='text-danger'>faild</span>}
                    </div>
                    <div className="col-10 col-md-auto text-center mt-5 mt-md-0 ">
                        <button onClick={AddResult} type="button" className="btn btn-primary w-100">Submit</button>
                    </div>
                </form>
            </div>


            <div className='container add_table'>
                <div className='row'>
                    <div className='col-11 col-md-12 overflow-auto'>
                        <table class="table">
                            <thead>
                                <tr className='text-center'>
                                    <th scope="col-auto">Quiz</th>
                                    <th scope="col-auto">Time/Date</th>
                                    <th scope="col-auto">No</th>
                                    <th scope="col-auto">Thought</th>
                                    <th scope="col-auto">Update/Delete</th>
                                </tr>
                            </thead>
                            <tbody class="table-group-divider align-items-center">
                                {
                                    lottry.slice().reverse().map((item) =>
                                        <tr key={item} className='text-center'>
                                            <th className='add_td' scope="row">{item.quiz}</th>
                                            <td className='add_td'>{item.startTime} To {item.endTime}
                                            <p>{formatDate(item.date)}</p>
                                            </td>
                                            <td className='add_td'>{item.lottryNumber}</td>
                                            <td className='add_td'>{item.massage}</td>
                                            <td className='add_td'><Link to={"/Update/" + item._id} type='button' className="btn btn-success me-0 me-md-3 ">Update</Link> 
                                            <button onClick={() => handleDelete(item._id)} type='button' className="btn btn-danger mt-2 mt-md-0">Delete</button></td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default AddLottry