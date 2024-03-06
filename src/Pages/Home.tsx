import React, { useEffect, useState } from "react";
import Cryptor from "../Components/Cryptor";
import Decryptor from "../Components/Decryptor";
import { morseCode } from "../helper";

const Home = () => {
    const [trigger, setTrigger] = useState(true);
    const handleTrigger = () => {
        setTrigger(!trigger);
    };
    return (
        <div className="min-h-screen flex flex-col justify-center px-3">
            <h1 className="text-2xl font-bold text-center mb-5">
                Шифратор и дешифратор азбуки Морзе
            </h1>
            <div className="mb-5">
                <Cryptor trigger={handleTrigger} />
            </div>
            <div className="mb-5">
                <Decryptor trigger={trigger} />
            </div>
            <div className="mb-5 container mx-auto bg-gray-200 rounded-lg p-5 grid gap-4 relative">
                <div className="overflow-auto">
                    <table className="border-collapse mx-auto">
                        <tr>
                            <th className="p-2 w-20 bg-slate-200 border border-black">
                                Буква
                            </th>
                            {Object.keys(morseCode).map((el) => (
                                <td className="min-w-10 text-center bg-slate-200 border border-black">
                                    {el}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <th className="p-2 w-20 bg-slate-200 border border-black">
                                Морзе
                            </th>
                            {Object.values(morseCode).map((el) => (
                                <td className="min-w-10 text-center bg-slate-200 border border-black">
                                    {el}
                                </td>
                            ))}
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Home;
