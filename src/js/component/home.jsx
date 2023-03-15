import React, { useState, useEffect } from "react";
import "../../styles/index.css";

//include images into your bundle

//create your first component
const Home = () => {
  const [listaPalabra, setlistaPalabra] = useState([]);

  const insertar = (item) => {
    const valorNuevo = { label: item, done: false  };
    const lista = [...listaPalabra, valorNuevo];
    setlistaPalabra(lista)
	serverPut(lista)
  };

  const delet = (nameDelete) => {
	const palabraDelete = (listaPalabra.filter((item) => item.label !== nameDelete));
	setlistaPalabra(palabraDelete);
	serverPut(palabraDelete)
  };

  const serverPut = (item) => {
	fetch('https://assets.breatheco.de/apis/fake/todos/user/danny', {
		method: "PUT",
		body: JSON.stringify(item),
		headers: {
		  "Content-Type": "application/json"
		}
	  })
	  .then(resp => {
		  console.log(resp); 
	  })
	  .catch(error => {
		  console.log(error);
	  });
  };

  useEffect(() => {
	fetch('https://assets.breatheco.de/apis/fake/todos/user/danny', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); 
        console.log(resp.status); 
        return resp.json(); 
    })
    .then(data => {
        console.log(data);
		setlistaPalabra(data)
    })
    .catch(error => {
        console.log(error);
    });
}, []);

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <h1 className="text-center tod">todos</h1>
        <ul className="list-group col-md-5 mt-5">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <input
              type="text"
              onKeyUp={(e) =>
                e.code === "NumpadEnter" || e.code === "Enter" ? insertar(e.target.value) : null
              }
              className="form-control"
              id=""
            />
          </li>
          {listaPalabra.map((listar) => {
            return (
              <li
                key={listar.label}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {listar.label}
                <span
                  className=""
                  onClick={() => delet(listar.label)}
                >
                  <i className="fas fa-times"></i>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;