import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Result from './Result';

function Home() {
  const [latestResults, setLatestResults, userslist] = useState([]);

  useEffect(() => {
    axios.get('http://luckshowindia.com:5000/lottry-data-latest')
      .then((response) => {
        setLatestResults(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

      // axios.get('http://luckshowindia.com:5000/users')
      // .then((response) => {
      //   console.log(response);
      //   userslist(response.data);
      // })
      // .catch((error) => {
      //   console.error('Error fetching data:', error);
      // });

  }, []);


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className='pt-5'>
      <div className='container'>
        <div className='row text-white gap-2 gap-md-5 cards mt-5 pt-5 justify-content-around align-items-center align-items-md-start'>
          {latestResults.map((lottery) => (
            <div
              className={`col-5 col-md-4 bg-${lottery.quiz === 'Fun Quiz' ? 'danger' : 'warning'} py-4 text-center card_c`}
              key={lottery._id}
            >
              {/* Render card content for the latest result of each quiz */}
              <div>
                <h3 className='card_h'>{lottery.quiz}</h3>
              </div>
              <div className='mt-2'>
                <p className="card_t mb-2 mt-3">
                  <strong>
                    From {lottery.startTime} To {lottery.endTime}
                  </strong>
                  <p>{formatDate(lottery.date)}</p>
                </p>
                <h1 className='card_no mb-0'>{lottery.lottryNumber}</h1>
                <p className="card_massage mt-3 fw-semibold">({lottery.massage})</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Result />
    </div>
  );
}

export default Home;
