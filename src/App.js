import "./App.css";
import Web3 from "web3";
import React, { useEffect, useState, useCallback } from "react";
import Arenda from "../src/Geth/Project/build/contracts/Arenda.json";

const App = () => {
  const [balance, setBalance] = useState("");
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState("");
  const [esatates, setEstates] = useState("");
  const [Role, setRole] = useState("");
  const [text, setText] = useState(""); //адрес собственника
  const [text1, setText1] = useState(""); //площадь квартиры
  const [text2, setText2] = useState(""); //время эксплуатации
  const [text3, setText3] = useState(""); //id квартиры для вывода информации
  const [infoEstate, setInfoEstate] = useState([]); //массив данных о квартире
  const [text4, setText4] = useState("");
  const [text5, setText5] = useState("");
  const [text6, setText6] = useState("");
  const [text7, setText7] = useState("");
  const [text8, setText8] = useState(0);
  const [text9, setText9] = useState("");
  const [infoArend, setInfoArend] = useState([]); //массив данных об аренде
  const [text10, setText10] = useState("");
  const [text11, setText11] = useState("");
  const [text12, setText12] = useState("");
  const [text13, setText13] = useState("");
  const [text14, setText14] = useState("");
  const [text15, setText15] = useState("");
  const [arend, setArend] = useState("");

  const metaMask = async () => {
    //подключение метамаск
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  };
  const loadData = useCallback(async () => {
    //получение данных аккаунта, баланса и данных о контракте
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const balancee = await web3.eth.getBalance(accounts[0]);
    setBalance(balancee / 1000000000000000000);
    setAccount(accounts[0]);
    const networkId = await new web3.eth.net.getId();
    const networkData = Arenda.networks[networkId];

    if (networkData) {
      const contr = new web3.eth.Contract(Arenda.abi, networkData.address);
      setContract(contr);
    }
  }, []);
  useEffect((event) => {
    metaMask();
    loadData();
  }, []);

  const createEstate = async () => {
    //создание квартиры
    await contract.methods
      .create_estate(text, text1, text2)
      .send({ from: account });
  };

  const get_estates = async () => {
    //просмотр данных о квартирах
    const esatatess = await contract.methods
      .get_estates()
      .call({ from: account });
    setEstates(esatatess);
  };

  const seeEstate = async () => {
    //просмотр количества квартир
    const estat = await contract.methods
      .get_estates_number(text3)
      .call({ from: account });
    setInfoEstate(estat);
  };

  const get_Arends = async () => {
    //просмотр количества аренд
    const aren = await contract.methods.get_arends().call({ from: account });
    setArend(aren);
  };

  const createArend = async () => {
    //создание аренд
    await contract.methods
      .create_arend(text4, text5, text6)
      .send({ from: account });
  };

  const takeArend = async () => {
    //взятие аренды
    await contract.methods
      .take_arend(text7)
      .send({ from: account, value: text8 * 1000000000000000000 });
  };

  const InfoArend = async () => {
    //информация об аренде
    const arend = await contract.methods
      .get_arend_number(text9)
      .call({ from: account });
    setInfoArend(arend);
    console.log(arend);
  };

  const acceptArendOwner = async () => {
    //подтверждение аренды собственником
    await contract.methods.arend_accept(text10).send({ from: account });
  };

  const deleteTakeArend = async () => {
    //удаление заявки на получение аренды
    await contract.methods
      .arend_cancel_arendator(text11)
      .send({ from: account });
  };

  const cancelArend = async () => {
    //отмена аренды собственником
    await contract.methods.arend_cancel_owner(text12).send({ from: account });
  };

  const deleteAdmin = async () => {
    //удаление админа
    await contract.methods.delete_admin(text13).send({ from: account });
  };

  const cmenaRole = async () => {
    //смена ролей
    await contract.methods.cmena_role(text14, text15).send({ from: account });
  };

  return (
    <div className="App">
      <div>Ваш аккаунт: {account}</div>
      <div>Ваш баланс: {balance} ETH</div>
      <div className="get_estates">
        <div>
          <button onClick={get_estates}>Количество квартир</button>
        </div>
        <div>{esatates}</div>
      </div>

      <div className="get_arends">
        <div>
          <button onClick={get_Arends}>Количество аренд</button>
        </div>
        <div>{arend}</div>
      </div>

      <div className="seeEsate">
        <div>
          <input
            placeholder="id-квартиры"
            onChange={(event) => {
              setText3(event.target.value);
            }}
          />
        </div>
        <div>
          <button onClick={seeEstate}>Показать данные о квартире</button>
        </div>
        <div>Собственник: {infoEstate[1]}</div>
        <div>Площадь: {infoEstate[2]}</div>
        <div>Время эксплуатации: {infoEstate[3]} лет</div>
      </div>

      <div className="infoArend">
        <div>
          <input
            placeholder="id-квартиры"
            onChange={(event) => {
              setText9(event.target.value);
            }}
          />
        </div>
        <div>
          <button onClick={InfoArend}>Показать данные об аренде</button>
        </div>
        <div>id-квартиры: {infoArend[0]}</div>
        <div>Собственник: {infoArend[2]}</div>
        <div>Арендатор: {infoArend[3]}</div>
        <div>Цена: {infoArend[4] / 1000000000000000000} ETH</div>
        <div>Время: {infoArend[5]} дней</div>
        <div>В подтверждении: {infoArend[6]}</div>
      </div>
      <fieldset>
        <legend>Функции для арендаторов</legend>
        <div className="takeArend">
          <div>Заявка на аренду</div>
          <div>
            <input
              placeholder="id-аренды"
              onChange={(event) => {
                setText7(event.target.value);
              }}
            />
          </div>
          <div>
            <input
              placeholder="сумма для оплаты "
              onChange={(event) => {
                setText8(event.target.value);
              }}
            />
          </div>
          <div>
            <button onClick={takeArend}>Отправить заявку</button>
          </div>
        </div>

        <div className="deleteTake">
          <div>Отмена заявки на аренду</div>
          <div>
            <input
              placeholder="id-аренды"
              onChange={(event) => {
                setText11(event.target.value);
              }}
            />
          </div>
          <div>
            {" "}
            <button onClick={deleteTakeArend}>Отменить заявку</button>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <div className="create_arend">
          <div>Создать аренду</div>
          <div>
            <input
              placeholder="id-квартиры"
              onChange={(event) => {
                setText4(event.target.value);
              }}
            />
          </div>
          <div>
            <input
              placeholder="цена"
              onChange={(event) => {
                setText5(event.target.value);
              }}
            />
          </div>
          <div>
            <input
              placeholder="время"
              onChange={(event) => {
                setText6(event.target.value);
              }}
            />
          </div>
          <div>
            <button onClick={createArend}>Создать</button>
          </div>
        </div>

        <legend>Функции для собственников</legend>
        <div className="arendAcceptOwner">
          <div>Подтверждение аренды собственником</div>
          <div>
            <input
              placeholder="id-аренды"
              onChange={(event) => {
                setText10(event.target.value);
              }}
            />
          </div>
          <div>
            <button onClick={acceptArendOwner}>Подтвердить аренду</button>
          </div>
        </div>

        <div className="cancelArend">
          <div>Отмена аренды собственником</div>
          <div>
            <input
              placeholder="id-аренды"
              onChange={(event) => {
                setText12(event.target.value);
              }}
            />
          </div>
          <div>
            <button onClick={cancelArend}>Отменить аренду</button>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend>Функции для администраторов</legend>

        <div className="createEstate">
          <div>Создать квартиру</div>
          <div>
            <input
              placeholder="адрес собственника"
              onChange={(event) => {
                setText(event.target.value);
              }}
            />
          </div>
          <div>
            <input
              placeholder="Площадь"
              onChange={(event) => {
                setText1(event.target.value);
              }}
            />
          </div>
          <div>
            <input
              placeholder="Время эксплуатации"
              onChange={(event) => {
                setText2(event.target.value);
              }}
            />
          </div>
          <div>
            <button onClick={createEstate}>Создать</button>
          </div>
        </div>

        <div className="deleteAdmin">
          <div>Удаление администратора</div>
          <div>
            <input
              placeholder="адрес администратора"
              onChange={(event) => {
                setText13(event.target.value);
              }}
            />
          </div>
          <div>
            <button onClick={deleteAdmin}>Удалить администратора</button>
          </div>
        </div>

        <div className="cmenaRole">
          <div>Смена роли</div>
          <div>
            <input
              placeholder="адрес"
              onChange={(event) => {
                setText14(event.target.value);
              }}
            />
          </div>
          <div>
            <input
              placeholder="true-админ false-не админ"
              onChange={(event) => {
                setText15(event.target.value);
              }}
            />
          </div>
          <div>
            <button onClick={cmenaRole}>Изменить</button>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default App;
