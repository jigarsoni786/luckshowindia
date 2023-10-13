import React, {useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'



const Update = () => {

    //   states for using get input fields value

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [lottryNumber, setLottryNumber] = React.useState('');
    const [date, setDate] = React.useState('');
    const [massage, setMassage] = React.useState('');
    const [quiz, setQuiz] = useState('');
    const Navigate = useNavigate('');
    const params= useParams();

    useEffect(()=>{
        getLottryDetails();
    },[])

    const getLottryDetails= async()=>{
        console.warn(params)
        let result = await fetch (`http://luckshowindia.com:5000/lottry-update/${params.id}`);
        result = await result.json();
        console.warn(result)
        setStartTime(result.startTime)
        setEndTime(result.endTime)
        setDate(result.date)
        setLottryNumber(result.lottryNumber)
        setMassage(result.massage)
        setQuiz(result.quiz)


    }

    // const formatDate = (dateString) => {
    //     const options = { year: 'numeric', month: 'numeric', day: 'numeric', };
    //     return new Date(dateString).toLocaleDateString(undefined, options);
    // };


    
    
    

    const updateNumber = async () => {
        console.warn(startTime, endTime, date, lottryNumber, massage, quiz)
        let result = await fetch(`http://luckshowindia.com:5000/lottry-update/${params.id}`, {
            method: "Put",
            body: JSON.stringify({ startTime, endTime, date, lottryNumber, massage, quiz }),
            headers: {
                "content-type": "application/json"
            }
        });
        if (result) {
           Navigate('/AddLottry')
        } else {
            alert('Result Not Submit');
        }
        result = await result.json();
        console.warn(result)
    }
    

 

    return (
        <div>
            <div className='container'>
                <div className='text-center'>
                    <h1 className='text-white mt-5'> Update Result</h1>
                </div>

                <form className="d-flex flex-column gy-3 align-items-center mt-5 justify-content-center gap-4">
                    <div className="col-10 col-md-5">
                        <input type="time" className="form-control" id="autoSizingInput" placeholder="start time"
                            value={startTime} onChange={(e) => { setStartTime(e.target.value) }}
                        />
                    </div>
                    <div className="col-10 col-md-5">
                        <input type="time" className="form-control" id="autoSizingInput" placeholder="End Time"
                            value={endTime} onChange={(e) => { setEndTime(e.target.value) }}
                        />
                    </div>
                    <div className="col-10 col-md-5">
                        <input type="date" className="form-control" placeholder="Lottry Number" 
                            value={date} onChange={(e) => { setDate(e.target.value) }}
                        />
                    </div>
                    <div className="col-10 col-md-5">
                        <input type="text" className="form-control" placeholder="Lottry Number"
                            value={lottryNumber} onChange={(e) => { setLottryNumber(e.target.value) }}
                        />
                    </div>
                    <div className="col-10 col-md-5">
                        <input type="text" className="form-control" placeholder="Thought"
                            value={massage} onChange={(e) => { setMassage(e.target.value) }}
                        />
                    </div>
                    <div className="col-10 col-md-5">
                        <select className="form-select"
                            value={quiz} onChange={(e) => { setQuiz(e.target.value) }}
                        >
                            <option value="" selected>Select Quiz</option>
                            <option value="Fun Quiz">Fun Quiz</option>
                            <option value="Wonder Quiz">Wonder Quiz</option>
                            <option value="Lucky Quiz">Lucky Quiz</option>
                        </select>
                    </div>
                    <div className="col-10 col-md-3 text-center mt-5 mt-md-3 ">
                        <button onClick={updateNumber} type="button" className="button w-100">Submit</button>
                    </div>
                </form>
            </div>
        </div>

    )
}
export default Update