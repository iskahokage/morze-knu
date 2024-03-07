import React, {
  ChangeEvent,
  FC,
  useEffect,
  useRef,
  useState,
} from "react";
import { morseCode } from "../helper";

interface decryptorProps {
  trigger: boolean;
}

const Decryptor: FC<decryptorProps> = ({ trigger }) => {
  const [cryptedData, setCryptedData] = useState("");
  const [text, setText] = useState("");
  const [decryptedData, setDecryptedData] = useState("");

  useEffect(() => {
    const crypted = localStorage.getItem("crypted");
    setCryptedData(!!crypted ? JSON.parse(crypted) : "");
  }, [trigger]);

  const ref = useRef<HTMLTextAreaElement>(null);

  const pasteData = () => {
    if (ref.current) {
      ref.current.value = cryptedData;
      setText(cryptedData);
    }
  };

  const textHandler = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const a: string = e.target.value;
    setText(a);
  };

  const decodeFromMorse = () => {
    const morseMap: { [key: string]: string } =
      Object.fromEntries(
        Object.entries(morseCode).map(([key, value]) => [
          value,
          key,
        ])
      );
    const decryptedResult = text
      .split(" ") // Разбиваем код Морзе на отдельные символы
      .map((char: string) => morseMap[char] || char) // Заменяем символы на их эквиваленты в алфавите, если они существуют
      .join(""); // Соединяем буквы
    setDecryptedData(decryptedResult);
  };

  return (
    <div className="container mx-auto bg-gray-200 rounded-lg p-5 grid gap-4">
      <h1 className="text-lg">
        Напишите текст для дешифровки из морзе в текст:
      </h1>
      <textarea
        ref={ref}
        onChange={textHandler}
        className="bg-transparent p-2 border border-gray-500 rounded-lg  outline-none"
      />
      <div className="grid gap-4">
        <div className="grid gap-4 grid-cols-2">
          <button
            onClick={pasteData}
            disabled={!cryptedData}
            className="bg-gray-700 rounded-lg p-3 text-gray-50 hover:bg-gray-500 
            active:bg:gray-700 focus:bg-gray-600 disabled:bg-gray-400 outline-none"
          >
            Вставить результат шифрования
          </button>
          <button
            onClick={decodeFromMorse}
            className="bg-gray-700 rounded-lg p-3 text-gray-50 hover:bg-gray-500
            active:bg:gray-700 focus:bg-gray-600 outline-none"
          >
            Расшифровать
          </button>
        </div>
        <div className="grid gap-4">
          <h2 className="text-lg">
            Результат дешифрования:
          </h2>
          <div className="bg-gray-100 p-5 rounded-lg">
            <p className="text-center">{decryptedData}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Decryptor;
