import React, { useState, useEffect} from 'react';

const GetData = () => {
    const [data, setData] = useState([])

    const getData = () => {
      fetch(
        "https://cors-anywhere.herokuapp.com/https://fetch-hiring.s3.amazonaws.com/hiring.json",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((myJson) => {
          console.log(myJson);
          myJson.sort(function (a, b) {
            if (a.listId > b.listId) return 1;
            else if (a.listId < b.listId) return -1;
            else return 0;
          });
          setData(myJson);
        });
    };

    
    useEffect(() => {
      getData();
    }, []);
    return (
      <div className='App'>
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <p>
              {item.listId}
              {item.name}
            </p>
          ))}
      </div>
    );
}
 
export default GetData;