import React, { useEffect } from "react";
import UseCheckMsg from "../hooks/UseCheckMsg";

function RegisterPage() {


    const registerURL = '/api/register/';

    const handleSubmit = (e) => {
        let name = document.getElementById("username").value;
        console.log(name);
        let password = document.getElementById("password").value;
        console.log(password);
        let position = document.getElementById("position").value;
        console.log(position);
        if (!name || name === "") {
            alert("username mustn't be empty.");
            e.preventDefault();
            return false;
        }
        if (!password || password === "") {
            alert("password mustn't be empty.");
            e.preventDefault();
            return false;
        }
        if (!position || position === "") {
            alert("position mustn't be empty.");
            e.preventDefault();
            return false;
        }


        return true;
    };

    UseCheckMsg();

    useEffect(() => {
        document.getElementById("register-form").action = registerURL;
    }, [registerURL]);

    return (
        <>
            <nav>
                <a href="/" id="LogoutAction">
                    back
                </a>
            </nav>
            <header>
                <h1 className="text-center aoe-text pt-5">Register</h1>
            </header>
            <main>
                <div className="container">
                    <div
                        id="Register-row"
                        className="row justify-content-center align-items-center"
                    >
                        <div id="Register-column" className="col-md-6">
                            <div id="Register-box" className="col-md-12">
                                <form
                                    id="register-form"
                                    className="form"
                                    action="/"
                                    method="post"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="form-group">
                                        <label htmlFor="username" className="aoe-text">
                                            Username:
                                        </label>
                                        <br />
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password" className="aoe-text">
                                            Password:
                                        </label>
                                        <br />
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="position" className="aoe-text">
                                            position:
                                        </label>
                                        <select className="form-select" name="position" id="position">
                                            <option value="manager">manager</option>
                                            <option value="employee">employee</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="submit"
                                            className="btn btn-info btn-md aoe-btn-submit"
                                            defaultValue="submit"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

RegisterPage.propTypes = {};

export default RegisterPage;




// import React, { useEffect, useState } from "react";
// import UseCheckMsg from "../hooks/UseCheckMsg";
// import {
//   Stack,
//   Input,
//   FormControl,
//   FormErrorMessage,
//   FormHelperText,
//   Button,
// } from '@chakra-ui/react';

// function RegisterPage() {
//   const registerURL = '/api/register';

//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     position: 'manager',
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { username, password, position } = formData;

//     if (!username || username === "") {
//       alert("Username mustn't be empty.");
//       return;
//     }

//     if (!password || password === "") {
//       alert("Password mustn't be empty.");
//       return;
//     }

//     if (!position || position === "") {
//       alert("Position mustn't be empty.");
//       return;
//     }

//     // Additional logic for handling form submission if needed
//   };

//   UseCheckMsg();

//   useEffect(() => {
//     document.getElementById("register-form").action = registerURL;
//   }, [registerURL]);

//   return (
//     <>
//       <nav>
//         <a href="/" id="LogoutAction">
//           back
//         </a>
//       </nav>
//       <header>
//         <h1 className="text-center aoe-text pt-5">Register</h1>
//       </header>
//       <main>
//         <div className="container">
//           <div id="Register-row" className="row justify-content-center align-items-center">
//             <div id="Register-column" className="col-md-6">
//               <div id="Register-box" className="col-md-12">
//                 <form
//                   id="register-form"
//                   className="form"
//                   action="/"
//                   method="post"
//                   onSubmit={handleSubmit}
//                 >
//                   <Stack spacing={4}>
//                     <FormControl isInvalid={!formData.username}>
//                       <Input
//                         type="text"
//                         name="username"
//                         id="username"
//                         placeholder="Username"
//                         value={formData.username}
//                         onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//                       />
//                       {!formData.username ? (
//                         <FormErrorMessage>Username is required.</FormErrorMessage>
//                       ) : (
//                         <FormHelperText>Please enter the username.</FormHelperText>
//                       )}
//                     </FormControl>
//                     <FormControl isInvalid={!formData.password}>
//                       <Input
//                         type="password"
//                         name="password"
//                         id="password"
//                         placeholder="Password"
//                         value={formData.password}
//                         onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                       />
//                       {!formData.password ? (
//                         <FormErrorMessage>Password is required.</FormErrorMessage>
//                       ) : (
//                         <FormHelperText>Please enter the password.</FormHelperText>
//                       )}
//                     </FormControl>
//                     <FormControl>
//                       <label htmlFor="position" className="aoe-text">Position:</label>
//                       <select
//                         className="form-select"
//                         name="position"
//                         id="position"
//                         value={formData.position}
//                         onChange={(e) => setFormData({ ...formData, position: e.target.value })}
//                       >
//                         <option value="manager">Manager</option>
//                         <option value="employee">Employee</option>
//                       </select>
//                     </FormControl>
//                     <FormControl>
//                       <Button
//                         type="submit"
//                         colorScheme="teal"
//                         size="md"
//                         className="btn btn-info btn-md aoe-btn-submit"
//                         defaultValue="Submit"
//                       >
//                         Submit
//                       </Button>
//                     </FormControl>
//                   </Stack>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }

// export default RegisterPage;
