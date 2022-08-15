import axios from "axios";
import "./App.css";
import logo from "./component/images/data.svg";
import conn from "./component/images/error.svg";
import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import ClipLoader from "react-spinners/ClipLoader";
import { FadeLoader, BeatLoader, RingLoader } from "react-spinners";
function App() {
  const [image, setimage] = useState([]);
  const [search, setsearch] = useState("");
  let [loading, setLoading] = useState(true);
  const [data, setdata] = useState(false);
  const [font, setfont] = useState({
    fontFamily: "cursive",
    color: "#2eb4ff",
  });
  const [connection, setconnection] = useState(false);

  let [pageno, setpageno] = useState(1);
  let [totalpage, settotalpage] = useState(0);

  const serchbutton = async () => {
    setLoading(true);

    console.log("its working");
    setTimeout(() => {
      axios
        .get(
          `https://api.unsplash.com/search/photos?page=${pageno}?&query=${search}&client_id=TsRtHZkDHk5OOl-qyUJLr2NUzJnjgQ5kuLLFdE-393I`
        )
        .then((res) => {
          console.log(res);
          console.log(pageno);
          let g = res.data.results;
          let l = res.data.total_pages;
          settotalpage(l);
          console.log(l);
          setimage(g);

          // setimage(res.data.results);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setconnection(true);
        });
    }, 1000);
  };

  const newpage = () => {
    pageno = pageno + 1;
    setpageno(pageno);
    console.log(pageno);
    serchbutton();
  };

  const previouspage = () => {
    pageno = pageno - 1;
    setpageno(pageno);
    console.log(pageno);
    serchbutton();
  };

  document.body.style.backgroundColor = "#101523";

  return (
    <>
      <nav>
        <div
          className="md:bg-gray-800 md:w-full w-auto h-20 md:flex justify-between items-center px-10"
          style={font}
        >
          <div className="md:flex md:gap-5 ">
            <div className=" text-3xl text-white mt-10 md:mt-0  ">
            <h1 className="">
            <span className="text-sky-500">Annex</span> image gallery
            </h1>            
            </div>

            <div className="">
              <input
                onChange={(e) => {
                  setsearch(e.target.value);
                }}
                value={search}
                type="text"
                placeholder="search images"
                className="md:h-10 md:w-40 rounded-lg bg-gray-400 text-gray-900 hover:ring-2 ring-pink-500 placeholder:text-gray-700 placeholder:text-xm placeholder:ml-2 px-2 "
              />
            </div>
            <div className="">           
             <div className="box px-3 py-2 md:w-14 w-14  bg-green-500 rounded-lg hover:ring-2 ring-pink-500 ">
              <button onClick={serchbutton} className="text-gray-900 ">
                get
              </button>
            </div>
            </div>

          </div>

          <div className="md:flex justify-end hidden">
            <div className=" md:flex gap-10 text-2xl">
              <h1>
                {" "}
                <span className="text-white"> current page :</span>
                {pageno}
              </h1>
              <h2>
                {" "}
                <span className="text-white"> total page :</span>
                {totalpage}
              </h2>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex justify-center mt-5 md:ml-0 ml-7">
        <div className=" md:text-5xl text-5xl font-semibold  " style={font}>
          <h1 className="">
            welcome to{" "}
            <span className="box px-3  bg-pink-500 text-gray-800 rounded-lg ">
              Annex
            </span>{" "}
            gallery webapp
          </h1>
        </div>
      </div>


{connection ? 
  
  
  <div className="flex justify-center mt-5">
  <div>
  <div className="flex justify-center mt-5">
  <img src={conn} alt="" srcset="" className="  "  style={{"width":"70%"}}/>
 
</div>
  </div>
  </div>
 
 
  
  
  
  
  
  
  :<div>

      <div className=" flex justify-center">
        {loading ? (
          <RingLoader color="#ffff" size={200} className="mt-20 " />
        ) : (
          <div>
            {image.length == 0 ? (
              <div>
                <img src={logo} alt="" srcset="" className="mt-16 ml-4 w-60" />
                <h1
                  className="mt-5 text-2xl font-bold text-white "
                  style={font}
                >
                  Sorry, but search is invalid
                </h1>
                <h1 className="mt-5 text-xm font-bold " style={font}>
                  try with another word
                </h1>
              </div>
            ) : (
              <div>
                <div className="grid md:grid-cols-4 gap-10  ">
                  {image.map((value, id) => {
                    return (
                      <div key={id}>
                        <div className="mt-5" style={font}>
                          <div className=" hover:border-4 border-pink-500  bg-gray-800  rounded-lg w-64 overflow-hidden shadow-lg  hover:translate-y-6 duration:500 shadow-white ">
                            <div className="p-2 ">
                              <img
                                src={value.urls.small}
                                alt=""
                                className=" h-64 w-64  rounded-lg"
                              />
                            </div>
                            <div className="p-2">
                              <h1 className="text-xl ml-5 font-bold ">
                                {value.user.first_name}
                              </h1>
                              <h1 className="text-xs ml-5 mt-2 text-pink-500 ">
                                {value.description}
                              </h1>
                              <div className="flex justify-end mt-2 mb-2 ml-5 ">
                                <div className="box px-3 border-2 mt-2 border-green-500 rounded-lg ">
                                  <a
                                    href={value.links.download}
                                    download={value.links.download}
                                  >
                                    {" "}
                                    <button className="text-pink-500 hover:text-sky-500 ">
                                      download
                                    </button>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between mt-5 mb-10" style={font}>
                  {pageno <= 1 ? (
                    <h1></h1>
                  ) : (
                    <div className="box px-3 py-2  bg-green-500 rounded-lg hover:ring-2 ring-pink-500 text-black">
                      <button onClick={previouspage}>previous</button>
                    </div>
                  )}
                  {totalpage == pageno ? (
                    <h1></h1>
                  ) : (
                    <div className="box px-3 py-2  bg-green-500 rounded-lg hover:ring-2 ring-pink-500 text-black">
                      <button onClick={newpage}>next</button>
                    </div>
                  )}
                </div>
               
              </div>
              
            )}
          </div>
        )}
      </div>

      <div className="flex justify-center mt-10 mb-10" style={font}>
                
      <h1 className="text-white text-3xl md:ml-0 ml-7 ">Design by :- <span className="text-pink-500">Vaghela Ajitkumar 👨‍💻</span> </h1>
      
      </div>

      </div>}
    </>
  );
}

export default App;
