import React, { useState, useEffect, useRef } from "react";
import UseCheckMsg from "../hooks/UseCheckMsg";
import { useNavigate } from "react-router-dom";
import "./ManagerPage.css";
import Clock from "../components/Clock";
import View from '../images/view.png';
import Reviewing from '../images/edit.png';
import Pagination from '../components/Pagination';
import { createRoot } from "react-dom/client";
import { Modal } from 'bootstrap'

function ManagerPage() {

    const logoutURL = '/api/logout';
    const loadDataURL = '/api/allReviews';
    const searchURL = '/api/search';
    const loadCheckInDataURL = '/api/getCheckInByName';
    const reviewingURL = '/api/giveReviews';


    const [tableData, setTableData] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalNumber, setTotalNumber] = useState(0);
    const [modalTableData, setModalTableData] = useState([]);
    const [modalRowsPerPage, setModalRowsPerPage] = useState(0);
    const [modalCurrentPage, setModalCurrentPage] = useState(1);
    const [modalTotalNumber, setModalTotalNumber] = useState(0);
    const table = useRef(null);
    const modalTable = useRef(null);
    const reviewingTable = useRef(null);

    const navigate = useNavigate();

    //logout
    const handleLogout = (e) => {
        console.log("fdf");
        fetch(logoutURL).then(
            (res) => {
                if (res.ok) {
                    navigate("/");
                }
            }
        )
        e.preventDefault()
    }

    UseCheckMsg();

    //load data int to table
    const loadData = () => {
        fetch(loadDataURL).then(
            (res) => {
                if (res.redirected) {
                    window.location.href = res.url;
                } else if (!res.ok) {
                    throw new Error();
                } else {
                    return res.json()
                }
            }
        ).then(
            (data) => {
                // console.log(data);
                setTableData(() => data);
                setTotalNumber(data.length);
            }
        ).catch((error) => {
            console.error(error);
        })
    }



    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        // console.log(table.current);
        // console.log(table.current.hasChildNodes());
        table.current.innerHTML = "";
        // console.log("df:" + rowsPerPage);

        let start = rowsPerPage * (currentPage - 1);

        for (let i = start; i < start + rowsPerPage; i++) {
            if (i >= tableData.length) {
                break;
            }
            const row = table.current.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);
            const cell5 = row.insertCell(4);

            cell1.innerHTML = i + 1;
            cell2.innerHTML = tableData[i].name;
            cell3.innerHTML = tableData[i].shift;

            if (tableData[i].reviews) {
                cell4.innerHTML = tableData[i].reviews;
            }

            if (tableData[i].reviews) {
                cell4.innerHTML = tableData[i].reviews;
            }
            let obj = {
                "shift": tableData[i].shift,
                "name": tableData[i].name
            };
            const root = createRoot(cell5);
            root.render(
                <>
                    <img src={View} tabindex="0" alt="view check in records" title="view check in records"
                        className="operation-icon" onClick={() => showCheckIn(obj)} onKeyDown={(e)=>{if(e.key === "Enter")return showCheckIn(obj)}}/>
                    <img src={Reviewing} tabindex="0" alt="Reviewing" title="Reviewing" className="operation-icon"
                        onClick={() => showReviewing(obj)} onKeyDown={(e)=>{if(e.key === "Enter")return showReviewing(obj)}}/>
                </>
            )

        }

    }, [tableData, rowsPerPage, currentPage])

    const onPageChange = (currPage) => {
        setCurrentPage(currPage);
        return;
    }
    const onRowPerPageChange = (rowPerPage) => {
        // console.log("rowPerPage:" + rowPerPage);
        setRowsPerPage(rowPerPage);
    }

    //searce shifts
    const handleSearchShift = (e) => {
        if (e) {
            e.preventDefault();
        }
        let obj = {};
        let shift = document.getElementById("shift").value;
        let name = document.getElementById("name").value;
        if (shift && shift !== "") {
            obj.shift = shift;
        }
        if (name && name !== "") {
            obj.name = name;
        }
        fetch(searchURL, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(
            (response) => {
                if (response.redirected) {
                    window.location.href = response.url;
                } else if (!response.ok) {
                    throw new Error();
                } else {
                    return response.json()
                }
            }
        ).then((data) => {
            setTableData(() => data);
            setTotalNumber(data.length);
        }
        ).catch((error) => {
            console.error(error);
        })
    }
    //show check in records
    const showCheckIn = (obj) => {
        let checkInModal = new Modal(document.getElementById('checkInModal'));
        checkInModal.show();
        loadModalData(obj);
    }

    //load check in data
    const loadModalData = (obj) => {
        fetch(loadCheckInDataURL, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(
            (response) => {
                if (response.redirected) {
                    window.location.href = response.url;
                } else if (!response.ok) {
                    throw new Error();
                } else {
                    return response.json()
                }
            }
        ).then((data) => {
            console.log(data);
            setModalTableData(() => data);
            setModalTotalNumber(data.length);
        }
        ).catch((error) => {
            console.error(error);
        })
    }

    const onModalPageChange = (curr) => {
        setModalCurrentPage(curr);
        return;
    }

    const onModalRowPerPageChange = (curr) => {
        setModalRowsPerPage(curr);
    }

    useEffect(() => {
        modalTable.current.innerHTML = "";

        let start = modalRowsPerPage * (modalCurrentPage - 1);
        for (let i = start; i < start + modalRowsPerPage; i++) {
            if (i >= modalTableData.length) {
                break;
            }
            const row = modalTable.current.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1)
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);

            cell1.innerHTML = i + 1;
            cell2.innerHTML = modalTableData[i].name;
            cell3.innerHTML = modalTableData[i].shift;
            cell4.innerHTML = modalTableData[i].date;
        }

    }, [modalTableData, modalRowsPerPage, modalCurrentPage])


    //show reviewing table
    const showReviewing = (obj) => {
        reviewingTable.current = new Modal(document.getElementById('reviewingModal'));
        reviewingTable.current.show();
        document.getElementById('reviewingShift').innerHTML = "Shift: " + obj.shift;
        document.getElementById('reviewingName').innerHTML = "Name: " + obj.name;
    }

    //submit reviewing
    const submitReviewing = () => {
        let obj = {
            "name": document.getElementById('reviewingName').innerHTML.split(" ")[1],
            "shift": document.getElementById('reviewingShift').innerHTML.split(" ")[1],
            "reviews": document.getElementById('review').value
        }
        console.log(obj);
        if (!obj.name || obj.name === "") {
            alert("Name mustn't be empty");
            return;
        }
        if (!obj.shift || obj.shift === "") {
            alert("Shift mustn't be empty");
            return;
        }
        if (!obj.reviews || obj.reviews === "") {
            alert("Review mustn't be empty");
            return;
        }
        // if (isNaN(obj.reviews) || isNaN(parseFloat(obj.reviews))) {
        //     alert("invalid input");
        //     return;
        // }
        // if (typeof obj.reviews == 'number' || Number.isFinite(obj.reviews)) {
        //     alert("invalid input");
        //     return;
        // }
        
        fetch(reviewingURL, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(
            (response) => {
                if (response.redirected) {
                    window.location.href = response.url;
                } else if (!response.ok) {
                    throw new Error();
                } else {
                    reviewingTable.current.hide();
                    handleSearchShift();
                }
            }
        ).catch((error) => {
            console.error(error);
        })
    }

    return (
        <>
            <nav aria-label="log out">
                <div className="aot-head">
                    <a className="logout" id="LogoutAction" onClick={handleLogout} href="/">
                        Logout
                    </a>
                    <Clock></Clock>
                </div>
            </nav>
            <header>
                <h1 className="centering">
                    <span id="h1-symbol">❙&nbsp;</span>Manager Page
                </h1>
            </header>
            <main>
                <form
                    id="Search-form"
                    className="form-inline aot-form"
                    action="/"
                    method="post"
                    onSubmit={handleSearchShift}
                >
                    <div className="form-group">
                        <label htmlFor="name" className="aoe-text">
                            Name:
                        </label>
                        <br />
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="shift" className="aoe-text">
                            Shift:
                        </label>
                        <br />
                        <input
                            type="text"
                            name="shift"
                            id="shift"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary aoe-btn-submit">Search</button>
                    </div>

                </form>
                <table className="table aot-table table-striped" id="reviewsTable">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">name</th>
                            <th scope="col">shift</th>
                            <th scope="col">review</th>
                            <th scope="col">operation</th>
                        </tr>
                    </thead>
                    <tbody ref={table}></tbody>
                </table>
                <Pagination totalNumber={totalNumber} pageChange={onPageChange} rowPerPageChange={onRowPerPageChange} id="managerMain"/>
                <div className="modal fade" id="checkInModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog aot-modal">
                        <div className="modal-dialog modal-dialog-scrollable aot-modal">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Check in records</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                </div>
                                <div className="modal-body">
                                    <table className="table aot-table table-striped" id="modalTable">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">name</th>
                                                <th scope="col">shift</th>
                                                <th scope="col">date</th>
                                            </tr>
                                        </thead>
                                        <tbody ref={modalTable}></tbody>
                                    </table>
                                </div>
                                <Pagination totalNumber={modalTotalNumber} pageChange={onModalPageChange} rowPerPageChange={onModalRowPerPageChange} id="managerModule"/>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="reviewingModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel2" aria-hidden="true">
                    <div className="modal-dialog aot-modal">
                        <div className="modal-dialog modal-dialog-scrollable aot-modal">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel2">Reviewing</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                </div>
                                <div className="modal-body">
                                    <div className="reviewing-label">
                                        <label className="aoe-text" id="reviewingShift">
                                            shift:
                                        </label>
                                        <label className="aoe-text" id="reviewingName">
                                            name:
                                        </label>
                                    </div>
                                    <div className="form-group reviewing-inputgroup">
                                        <label htmlFor="review" className="aoe-text reviewing-input-label">
                                            Review:
                                        </label>
                                        <input
                                            type="text"
                                            name="review"
                                            id="review"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary aoe-btn-submit" onClick={submitReviewing}>Confirm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </>
    );
}

ManagerPage.propTypes = {};

export default ManagerPage;