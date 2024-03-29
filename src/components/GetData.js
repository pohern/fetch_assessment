import React, { useState, useEffect } from "react";

const GetData = () => {
  const [data, setData] = useState([]);

  const getData = () => {
    fetch(
      "https://cors-anywhere.herokuapp.com/https://fetch-hiring.s3.amazonaws.com/hiring.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        let filteredJson = myJson.filter((item) => {
          if (item.name) return item;
        });
        filteredJson.sort(function (a, b) {
          return a.listId - b.listId || a.id - b.id;
        });
        setData(filteredJson);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div
      style={{ display: "flex", justifyContent: "space-around", width: "100%" }}
    >
      <table style={{ width: "50vw" }}>
        <thead>
          <tr style={{ padding: "10px" }}>
            <th>List Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.length > 0 &&
            data.map((item, idx) => (
              <tr
                style={{ backgroundColor: idx % 2 === 0 ? "#efefef" : "" }}
                key={item.id}
              >
                <td style={{ padding: "10px" }}>{item.listId}</td>
                <td style={{ padding: "10px" }}>{item.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetData;
