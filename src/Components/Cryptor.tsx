import React, { ChangeEvent, useState } from "react";
import { morseCode } from "../helper";
import { FunctionBody } from "typescript";

interface cryptorProps {
  trigger: () => void;
}

const Cryptor: React.FC<cryptorProps> = ({ trigger }) => {
  type EventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => string;

  const [text, setText] = useState("");
  const [crypted, setCrypted] = useState("");

  const textHandler = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const text: string = e.target.value;
    setText(text);
  };

  const encodeToMorse = () => {
    const cryptedResult = text
      .toLowerCase() // Переводим текст в нижний регистр
      .split("") // Разбиваем текст на массив символов
      .map((char: string) => morseCode[char] || char) // Заменяем символы на их эквивалент в азбуке Морзе, если он существует
      .join(" "); // Соединяем символы обратно в строку с пробелами между ними
    setCrypted(cryptedResult);
    localStorage.setItem(
      "crypted",
      JSON.stringify(cryptedResult)
    );
    trigger(); //Триггерим компоненту дешифратора, что бы она поняла, что у нас localStorage не пустой
  };

  return (
    <div className="container mx-auto bg-gray-200 rounded-lg p-5 grid gap-4">
      <h2 className="text-lg">
        Напишите текст для шифровки в морзе:
      </h2>
      <textarea
        onChange={textHandler}
        className="bg-transparent p-2 border border-gray-500 rounded-lg  outline-none"
      />
      <button
        onClick={encodeToMorse}
        className="bg-gray-700 rounded-lg p-3 text-gray-50 hover:bg-gray-500 active:bg:gray-700 focus:bg-gray-600 outline-none"
      >
        Зашифровать
      </button>
      <h2 className="text-lg">Результат шифрования:</h2>
      <div className="bg-gray-100 p-5 rounded-lg">
        <p className="text-center">{crypted}</p>
      </div>
    </div>
  );
};

export default Cryptor;
