import { useState, useEffect } from "react";
import "./App.css";
import USER_DATA from "./userData";
import Navbar from "./Navbar";

function App() {
    const [count, setCount] = useState(0);
    const [userData, setUserData] = useState(USER_DATA);
    const [isModal, setIsModal] = useState(false);
    const [apiData, setApiData] = useState([{}]);
    const [url, setUrl] = useState("http://localhost:3000/api/customers");
    const [refresh, setRefresh] = useState(true);
    const [newClient, setNewClient] = useState({
        address: "",
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
    });
    const [isEdit, setIsEdit] = useState(false);
    const [updateId, setUpdateId] = useState("");

    const [address, set_address] = useState("");
    const [email, set_email] = useState("");
    const [first_name, set_first_name] = useState("");
    const [user_id, set_user_id] = useState("");
    const [last_name, set_last_name] = useState("");
    const [phone, set_phone] = useState("");

    useEffect(() => {
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setApiData(data);
                console.log(data);
            });
    }, [refresh]);

    const handleIsModal = () => {
        setIsModal((prev) => !prev);
        setIsEdit(false);
        set_address("");
        set_email("");
        set_first_name("");
        set_last_name("");
        set_phone("");
    };

    const handleNewClient = async (e) => {
        // e.preventDefault();
        setIsEdit(false);
        handleIsModal();
        setNewClient({
            address: address,
            email: email,
            first_name: first_name,
            last_name: last_name,
            phone: phone,
        });

        await saveNewClient();
    };

    const saveNewClient = async (user_id) => {
        console.log(JSON.stringify("Save new Client Ran ", newClient));
        console.log("New Client in state: ", newClient);
        let client = { first_name, last_name, email, phone, address };
        console.log(updateId, first_name, last_name, email, phone, address);
        if (updateId) {
            client.id = updateId;
        }
        const response = await fetch(
            `${url}`,
            // { mode: "no-cors" },
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(client),
            }
        );

        if (response.ok) {
            console.log("respnse is ok");
            setNewClient({
                address: "",
                email: "",
                first_name: "",
                last_name: "",
                phone: "",
            });
        }

        setRefresh(!refresh);
    };

    const handleEditData = (id) => {
        handleIsModal();
        setIsEdit(true);
        setUpdateId(id);
        let client = apiData.filter((client) => client.id === id)[0];
        set_user_id(id);
        set_address(client.address);
        set_email(client.email);
        set_first_name(client.first_name);
        set_last_name(client.last_name);
        set_phone(client.phone);
        console.log(client);
        setNewClient(client);
    };

    const handleUpdateClient = () => {
        handleIsModal();
        setIsEdit(false);
        // setNewClient({ ...newClient, id: updateId, last_name: "Pena" });
        console.log(newClient);
        setRefresh(!refresh);
        saveNewClient();
    };

    const handleDelete = async (id) => {
        confirm("Delete client?");
        console.log(id);
        await fetch(`${url}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        // .then((res) => res.json())
        // .then((data) => {
        //     setApiData(data);
        //     console.log(data);
        // });
        setRefresh(!refresh);
    };
    return (
        <div className=" w-[100%]">
            <Navbar />
            {/* modal */}

            {isModal && (
                <div className="  h-screen w-[100%] fixed bg-gray-400 top-0 left-0 opacity-[.95]">
                    <div className=" bg-white my-[300px] mx-auto h-[40%] w-[40%] text-center flex flex-col content-between">
                        <div className=" flex content-center items-center h-[30%]">
                            <h1 className=" text-5xl flex-1">
                                Client Information
                            </h1>

                            <button
                                onClick={handleIsModal}
                                className=" text-3xl mr-7 hover:text-gray-500 hover:cursor-pointer">
                                X
                            </button>
                        </div>
                        <hr className=" border-slate-100" />
                        <div className=" flex flex-col items-center mt-6 ">
                            {isEdit && (
                                <input
                                    onChange={(e) =>
                                        set_user_id(e.target.value)
                                    }
                                    value={user_id}
                                    className=" border placeholder:pl-3"
                                    type="text"
                                    name="user"
                                    placeholder="Id"
                                />
                            )}
                            <input
                                onChange={(e) => set_address(e.target.value)}
                                value={address}
                                className=" border placeholder:pl-3"
                                type="text"
                                name="user"
                                placeholder="Address"
                            />
                            <input
                                onChange={(e) => set_email(e.target.value)}
                                value={email}
                                className=" border placeholder:pl-3"
                                type="text"
                                name="user"
                                placeholder="Email"
                            />
                            <input
                                onChange={(e) => set_first_name(e.target.value)}
                                value={first_name}
                                className=" border placeholder:pl-3"
                                type="text"
                                name="user"
                                placeholder="Name"
                            />
                            <input
                                onChange={(e) => set_last_name(e.target.value)}
                                value={last_name}
                                className=" border placeholder:pl-3"
                                type="text"
                                name="user"
                                placeholder="Last Name"
                            />
                            <input
                                onChange={(e) => set_phone(e.target.value)}
                                value={phone}
                                className=" border placeholder:pl-3"
                                type="text"
                                name="user"
                                placeholder="Phone"
                            />
                        </div>
                        <div>
                            {isEdit ? (
                                <button
                                    onClick={() => handleUpdateClient()}
                                    className=" bg-blue-300 w-[100px] text-white hover:cursor-pointer hover:bg-blue-500 ">
                                    Update
                                </button>
                            ) : (
                                <button
                                    onClick={async () => handleNewClient()}
                                    className=" bg-blue-300 w-[100px] text-white hover:cursor-pointer hover:bg-blue-500 ">
                                    Save
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <div className="flex content-end my-6 items-center">
                <h1 className=" text-4xl font-semibold">Client Management</h1>
                <button
                    onClick={handleIsModal}
                    className=" bg-green-300 hover:text-white  m-4 ml-auto p-4 hover:bg-green-500 hover:cursor-pointer">
                    Add Client
                </button>
            </div>

            <table className=" w-[100%] border-2 border-stone-100">
                <thead>
                    <tr
                        className="  bg-teal-100 
                ">
                        <th className="border-r-2">ID</th>
                        <th className="border-r-2">Name</th>
                        <th className="border-x-2">Last Name</th>
                        <th className="border-r-2">Address</th>
                        <th className="border-r-2">Email</th>
                        <th className="border-x-2">Phone</th>
                        <th className="border-x-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {apiData.map((data) => (
                        <tr
                            key={data.id}
                            className=" border-x-2 even:bg-gray-100 hover:bg-gray-200 hover:cursor-pointer">
                            <td className=" border-x-2">{data.id}</td>
                            <td className=" border-x-2">{data.first_name}</td>
                            <td className=" border-x-2">{data.last_name}</td>
                            <td className=" border-x-2">{data.address}</td>
                            <td className=" border-x-2">{data.email}</td>
                            <td className=" border-x-2">{data.phone}</td>
                            <td className=" border-x-2">
                                <button
                                    onClick={() => handleEditData(data.id)}
                                    className=" p-2 m-2 bg-orange-100 hover:bg-orange-200">
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(data.id)}
                                    className=" p-2 m-2 bg-red-100 hover:bg-red-300">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
