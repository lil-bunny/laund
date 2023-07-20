import React from "react";

const Location = () =>{
    return(
        <>
            <section className="delivery-boy-panel">
                <div className="common-table">
                    <div className="table-header">
                        <div className="table-search">
                            <form className="form-inline">
                                <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                                <img src="./assets/images/search.png" alt="sort-img" />
                            </form>
                        </div>
                        <div className="select-dropdown table-select">
                            <img src="./assets/images/sort-down-small.png" alt="sort-img" />
                            <select className="select">
                                <option value="">select DB</option>
                                <option value="1">DB 1</option>
                                <option value="2">DB 2</option>
                                <option value="3">DB 3</option>
                            </select>
                        </div>
                        <div className="select-dropdown table-select">
                            <img src="./assets/images/sort-down-small.png" alt="sort-img" />
                            <select className="select">
                                <option value="">select helper</option>
                                <option value="1">helper 1</option>
                                <option value="2">helper 2</option>
                                <option value="3">helper 3</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Location;