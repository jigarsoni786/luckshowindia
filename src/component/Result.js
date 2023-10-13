import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Result() {
  const [resultData, setLotteryData] = useState([]);
  const [date, setDate] = useState('');
  const [error, setError] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState('Fun Quiz'); // Default to 'Fun Quiz'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentDate = new Date().toISOString().slice(0, 10);
        const response = await axios.get(`http://luckshowindia.com:5000/search/${currentDate}`);
        const data = response.data;
  
        // Check if data is available for the current date and set the state accordingly
        if (data === 'No result') {
          setError('No data available for the current date');
          setLotteryData([]); // Clear the data
        } else {
          setLotteryData(data);
          setError(null); // Clear any previous errors
        }
      } catch (error) {
        console.error('Error fetching data for the current date:', error);
        setError('Error fetching data');
      }
    };
  
    // Fetch data for the current date when the component is initially mounted
    fetchData();
  }, []);

  const handleSearch = () => {
    axios.get(`http://luckshowindia.com:5000/search/${date}`)
      .then((result) => {
        if (result.data === 'No result') {
          setError('No data available for the selected date');
          setLotteryData([]); // Clear the data
        } else {
          setLotteryData(result.data);
          setError(null); // Clear any previous errors
        }
      })
      .catch((error) => {
        console.error('Error searching data:', error);
        setError('Error searching data');
      });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const funQuizData = resultData.filter((item) => item.quiz === 'Fun Quiz');
  const wonderQuizData = resultData.filter((item) => item.quiz === 'Wonder Quiz');
  const luckyQuizData = resultData.filter((item) => item.quiz === 'Lucky Quiz');

  let filteredData;
  if (selectedQuiz === 'Fun Quiz') {
    filteredData = funQuizData;
  } else if (selectedQuiz === 'Wonder Quiz') {
    filteredData = wonderQuizData;
  } else if (selectedQuiz === 'Lucky Quiz') {
    filteredData = luckyQuizData;
  }

  return (
    <div>

      <div className='container ltr_result'>
        <div className='mb-5 text-white d-flex justify-content-center'>
          <div className='r_h '><h1 className='mb-0'>Result</h1></div>
        </div>

        <div className='row justify-content-center'>
          <div className='d-flex col-10 col-md-3 gap-3 mb-5'>
            <input
              type='date'
              className='form-control'
              id='searchDateInput'
              placeholder='Search by Date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <button onClick={handleSearch} className='btn btn-primary'>
              Search
            </button>
          </div>
        </div>

        <div className='d-flex flex-column flex-md-row text-white align-items-center align-items-md-start'>
          <div className='col-11 col-md-4 mt-5 mt-md-0'>
            <table className="tb-s">
              <thead className="tr_head bg-danger text-white">
                <tr className='text-center'>
                  <th className="pb-3 pt-4"><h2>Fun Quiz</h2></th>
                </tr>
                <tr className='d-flex text-center mb-3'>
                  <th className='col-5'><h4>Time</h4></th>
                  <th className='col-2'><h4>Lottery No</h4></th>
                  <th className='col-5'><h4>Thought</h4></th>
                </tr>
              </thead>
              {error ? (
                <tbody className='align-items-center'>
                  <tr>
                    <td className='col-12 text-center py-4' colSpan='3'>{error}</td>
                  </tr>
                </tbody>
              ) : (
                <tbody className='align-items-center'>
                  {funQuizData.slice().reverse().map((lottery) => (
                    <tr className="tr-s d-flex text-center" key={lottery._id}>
                      <td className='col-5 py-4'>{lottery.startTime} to {lottery.endTime}
                        <p>{formatDate(lottery.date)}</p>
                      </td>
                      <td className='col-2 py-4'>{lottery.lottryNumber}</td>
                      <td className='col-5 py-4'>({lottery.massage})</td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>


          <div className='col-11 col-md-4 mt-5 mt-md-0'>
            <table className="tb-s">
              <thead className="tr_head bg-danger text-white">
                <tr className='text-center'>
                  <th className="pb-3 pt-4"><h2>Wonder Quiz</h2></th>
                </tr>
                <tr className='d-flex text-center mb-3'>
                  <th className='col-5'><h4>Time</h4></th>
                  <th className='col-2'><h4>Lottery No</h4></th>
                  <th className='col-5'><h4>Thought</h4></th>
                </tr>
              </thead>
              {error ? (
                <div>Error: {error}</div>
              ) : (
                <tbody className='align-items-center'>
                  {wonderQuizData.slice().reverse().map((lottery) => (
                    <tr className="tr-s d-flex text-center" key={lottery._id}>
                      <td className='col-5 py-4'>{lottery.startTime} to {lottery.endTime}
                        <p>{formatDate(lottery.date)}</p>
                      </td>
                      <td className='col-2 py-4'>{lottery.lottryNumber}</td>
                      <td className='col-5 py-4'>({lottery.massage})</td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>




          <div className='col-11 col-md-4 mt-5 mt-md-0'>
            <table className="tb-s">
              <thead className="tr_head bg-danger text-white">
                <tr className='text-center'>
                  <th className="pb-3 pt-4"><h2>Lucky Quiz</h2></th>
                </tr>
                <tr className='d-flex text-center mb-3'>
                  <th className='col-5'><h4>Time</h4></th>
                  <th className='col-2'><h4>Lottery No</h4></th>
                  <th className='col-5'><h4>Thought</h4></th>
                </tr>
              </thead>
              {error ? (
                <div>Error: {error}</div>
              ) : (
                <tbody className='align-items-center'>
                  {luckyQuizData.slice().reverse().map((lottery) => (
                    <tr className="tr-s d-flex text-center" key={lottery._id}>
                      <td className='col-5 py-4'>{lottery.startTime} to {lottery.endTime}
                        <p>{formatDate(lottery.date)}</p>
                      </td>
                      <td className='col-2 py-4'>{lottery.lottryNumber}</td>
                      <td className='col-5 py-4'>({lottery.massage})</td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Result;
