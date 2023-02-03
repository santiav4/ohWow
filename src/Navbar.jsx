import React from "react";

const Navbar = () => {
    let navBarItems = ["Home", "Products", "About", "Services", "Contact Us"];
    return (
        <div className=" bg-blue-100  mb-2 h-10 p-2">
            <ul className=" list-none m-0 flex">
                {navBarItems.map((item, i) => (
                    <li
                        key={i}
                        className=" mr-2 hover:text-white hover:cursor-pointer ">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Navbar;
