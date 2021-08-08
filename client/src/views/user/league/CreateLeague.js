import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createLeague, getLeagues, removeLeague } from '../../../api/league';
import { CreateLeagueForm, LeagueCard, UserNav } from '../../../components';

const CreateLeague = ({ history }) => {
    const initialValues = {
        league_name: '',
        image: ''
    }
    const [values, setValues] = useState(initialValues);
    const [loading, setLoading] = useState(false);
    const [leagues, setLeagues] = useState([]);
    const [keyword, setKeyword] = useState("");
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadLeagues(user._id)
    }, [])

    const loadLeagues = (id) => {
        getLeagues(id)
            .then(res => {
                setLeagues(res.data)
            })
            .catch(err => {
                history.push("/")
                toast.error("Some error in fetching the data");
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createLeague(user.token, values, user._id)
            .then((res) => {
                setLoading(false);
                setValues(initialValues);
                toast.success(`"${res.data.league_name}" is created`);
                loadLeagues(user._id)
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err.response.data);
                console.log(err);
            });
    };

    const handleRemove = (id) => {
        if (window.confirm("Delete?")) {
            removeLeague(user.token, id)
                .then(res => {
                    toast.success(`"${res.data.league_name}" is deleted`);
                    loadLeagues(user._id)
                })
                .catch(err => {
                    toast.error(err.response.data);
                })
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col text-center">
                    <h1>All your leagues </h1>
                    <div className="league-section" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div className='all-leagues' style={{ display: 'flex', justifyContent: 'flex-start', margin: '25px 0' }}>
                            {
                                (leagues && leagues.length) ?
                                    leagues.map(each => {
                                        return <LeagueCard key={each._id} eachLeague={each} handleRemove={handleRemove} />
                                    })
                                    : ''
                            }
                        </div>
                        <div>
                            <h3>Create new league </h3>
                            <CreateLeagueForm handleSubmit={handleSubmit} values={values} setValues={setValues} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateLeague;

// import React, { useState, useEffect } from "react";
// import { AdminNav, CategoryForm, LocalSearch } from "../../../components";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import {
//   createCategory,
//   getCategories,
//   removeCategory,
// } from "../../../api/category";

// const CategoryCreate = () => {
//   const [name, setName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [keyword, setKeyword] = useState("");
//   const { user } = useSelector((state) => ({ ...state }));

//   useEffect(() => {
//     loadCategories();
//   }, []);

//   const loadCategories = () => {
//     getCategories()
//       .then((res) => {
//         setCategories(res.data);
//         // console.log(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     createCategory(user.token, name)
//       .then((res) => {
//         setLoading(false);
//         setName("");
//         toast.success(`"${res.data.name}" is created`);
//         loadCategories();
//         // console.log(res);
//       })
//       .catch((err) => {
//         setLoading(false);
//         if (err.response.status === 400) toast.error(err.response.data);
//         console.log(err);
//       });
//   };

//   const handleDeleteCategory = async (slug) => {
//     if (window.confirm("Delete?")) {
//       setLoading(true);
//       removeCategory(user.token, slug)
//         .then((res) => {
//           setLoading(false);
//           toast.success(`${res.data.name} deleted`);
//           loadCategories();
//         })
//         .catch((err) => {
//           if (err.response.status === 400) {
//             setLoading(false);
//             toast.error(err.response.data);
//             console.log(err);
//           }
//         });
//     }
//   };

//   const filteredItems = categories.filter((item) =>
//     item.name.toLocaleLowerCase().includes(keyword)
//   );

//   const categoriesToDisplay = keyword ? filteredItems : categories;

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-md-2">
//           <AdminNav />
//         </div>
//         <div className="col">
//           {loading ? <h4>...Loading</h4> : <h4>Create Category</h4>}
//           <CategoryForm
//             handleSubmit={handleSubmit}
//             name={name}
//             setName={setName}
//           />
//           <LocalSearch keyword={keyword} setKeyword={setKeyword} />

//           {categoriesToDisplay.map((c) => (
//             <div className="alert alert-secondary" key={c._id}>
//               {c.name}
//               <span
//                 onClick={() => handleDeleteCategory(c.slug)}
//                 className="btn btn-small float-right"
//               >
//                 <DeleteOutlined className="text-danger" />
//               </span>
//               <Link to={`/admin/category/${c.slug}`}>
//                 <span className="btn btn-small float-right">
//                   <EditOutlined className="text-warning" />
//                 </span>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryCreate;
