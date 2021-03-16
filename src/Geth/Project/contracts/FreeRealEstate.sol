pragma solidity 0.5.1;

contract Arenda {

    struct User{ //структура пользователей
        uint id;
        address user_address;
    }

    struct Estate{ //структура квартир
        uint estate_id;
        address owner;
        uint square;
        uint use_age;
    }

    struct Arend{ //структура аренд
        uint estate_id_;
        uint arend_id;
        address payable owner_address;
        address payable arendator;
        uint sale;
        uint time;
        bool finished;
    }

    address payable zero = 0x0000000000000000000000000000000000000000;

    User[] users; //массив пользователей
    Estate[] estatets; //массив квартир
    Arend[] arends;//массив аренд

    mapping(address=>bool) Role;
    mapping(address=>uint[]) Estates_id;
    mapping(address=>uint) address_uint;
    mapping(address=>bool) Rent_take;
    mapping(uint=>bool) Rent_sale;

    constructor () public{
        Role[0x7506Ed6E94ccEe459516796ba9238e451fEe4DA0]= false;
        Role[0xE2A7D77fCEf93B972C80Ee062BC9aC2D73662800] = true;
        Role[0x310721B3d4693D2314f10A1F86F9046b59018151]=true;
        Role[0xE2A7D77fCEf93B972C80Ee062BC9aC2D73662800]=true;
        Role[0x5CCE5eFf16313E8A341c99390043E82F96211541]=false;
        Role[0x60572432E2D40e2a6958Cfe7A70606EFf1B4EC17]=false;
        Role[0x56765eD20D8ED10C4435F816603FA5CEbd7008A5]=false;
        Role[0xF127a5D9F21F3DED2efe63Ed9c6EBE2C0E3f8771]=false;

        estatets.push(Estate(estatets.length, 0x5CCE5eFf16313E8A341c99390043E82F96211541, 70, 5));
        Estates_id[0x5CCE5eFf16313E8A341c99390043E82F96211541].push(estatets.length-1);
        estatets.push(Estate(estatets.length, 0x60572432E2D40e2a6958Cfe7A70606EFf1B4EC17, 60, 8));
        Estates_id[0x60572432E2D40e2a6958Cfe7A70606EFf1B4EC17].push(estatets.length-1);
        estatets.push(Estate(estatets.length, 0x60572432E2D40e2a6958Cfe7A70606EFf1B4EC17, 230, 3));
        Estates_id[0x60572432E2D40e2a6958Cfe7A70606EFf1B4EC17].push(estatets.length-1);


        users.push(User(users.length, 0x7506Ed6E94ccEe459516796ba9238e451fEe4DA0));//адресс на который будет идти майнинг
        users.push(User(users.length, 0xE2A7D77fCEf93B972C80Ee062BC9aC2D73662800));
        users.push(User(users.length, 0x310721B3d4693D2314f10A1F86F9046b59018151));
        users.push(User(users.length, 0xE2A7D77fCEf93B972C80Ee062BC9aC2D73662800));
        users.push(User(users.length, 0x5CCE5eFf16313E8A341c99390043E82F96211541));
        users.push(User(users.length, 0x60572432E2D40e2a6958Cfe7A70606EFf1B4EC17));
        users.push(User(users.length, 0x56765eD20D8ED10C4435F816603FA5CEbd7008A5));
        users.push(User(users.length, 0xF127a5D9F21F3DED2efe63Ed9c6EBE2C0E3f8771));

        address_uint[0x7506Ed6E94ccEe459516796ba9238e451fEe4DA0]=users.length;
        address_uint[0xE2A7D77fCEf93B972C80Ee062BC9aC2D73662800]=users.length;
        address_uint[0x310721B3d4693D2314f10A1F86F9046b59018151]=users.length;
        address_uint[0xE2A7D77fCEf93B972C80Ee062BC9aC2D73662800]=users.length;
        address_uint[0x5CCE5eFf16313E8A341c99390043E82F96211541]=users.length;
        address_uint[0x60572432E2D40e2a6958Cfe7A70606EFf1B4EC17]=users.length;
        address_uint[0x56765eD20D8ED10C4435F816603FA5CEbd7008A5]=users.length;
        address_uint[0xF127a5D9F21F3DED2efe63Ed9c6EBE2C0E3f8771]=users.length;
    }

    //Вывод роли
    function get_role() public view returns(bool){
        return(Role[msg.sender]);
    }

    //смена ролей
    function cmena_role(address adres, bool role) public {
        Role[adres] = role;
    }

    //удаление администратора
    function delete_admin(address adres) public{
        require(Role[msg.sender]==true, "Вы не администратор!");
        Role[adres] = false;
    }

    // просмотр информации об аренде по id
    function get_arend_number(uint id_arend) public view returns(uint, uint, address, address,uint, uint, bool){
        return(arends[id_arend].estate_id_,
        arends[id_arend].arend_id,
        arends[id_arend].owner_address,
        arends[id_arend].arendator,
        arends[id_arend].sale,
        arends[id_arend].time,
        arends[id_arend].finished);
    }


    //просмотр информации о квартире по id
    function get_estates_number(uint estate_id) public view returns(uint, address, uint, uint){
        return(estatets[estate_id].estate_id,
        estatets[estate_id].owner,
        estatets[estate_id].square,
        estatets[estate_id].use_age);
    }

    //вывод количество квартир
    function get_estates() public view returns(uint){
        return(estatets.length);
    }

    //вывод количества аренд
    function get_arends() public view returns(uint){
        return(arends.length);
    }

    //получение id квартир по данному адрессу
    function get_estates_address() public view returns(uint [] memory){
        return(Estates_id[msg.sender]);
    }


    //создание квартиры
    function create_estate(address owner, uint square, uint use_age) public {
        require(Role[msg.sender]==true, "Вы не администратор!");
        estatets.push(Estate(estatets.length, owner, square, use_age));
    }


    //создание аренды
    function create_arend(uint estate_id, uint sale, uint time) public {
        require(Rent_sale[estate_id]==false, "Квартира уже в аренде!");
        require(msg.sender==estatets[estate_id].owner, "Вы не собственник!");
        arends.push(Arend(estate_id, arends.length, msg.sender, zero, sale*1000000000000000000, time, false));
        Rent_sale[estate_id] = true;
    }


    //Подачва заявки на аренду
    function take_arend(uint id_arend) public payable {
        require(arends[id_arend].finished == false, "Предложение не активно!");
        require(msg.sender!=arends[id_arend].owner_address, "Вы не можете взять свою квартиру в аренду!");
        require(msg.value==arends[id_arend].sale, "Недостаточнор средств или некоректная сумма!");
        arends[id_arend].arendator = msg.sender;
        Rent_take[msg.sender]==true;
    }

    //поддтеврждение аренды собственником
    function arend_accept(uint id_arend) public payable{
        require(arends[id_arend].owner_address==msg.sender, "Вы не являетесь владельцем квартиры!");
        arends[id_arend].owner_address.transfer(arends[id_arend].sale);
        arends[id_arend].finished = true;
    }

    //отмена аренды собственником
    function arend_cancel_owner(uint arend_id) public{
        require(arends[arend_id].finished == false, "Предложение не активно!");
        require(arends[arend_id].owner_address == msg.sender, "Вы не хозяин квартиры");
        arends[arend_id].arendator.transfer(arends[arend_id].sale);
        arends[arend_id].arendator = zero;
        arends[arend_id].finished = true;

    }


    //отмена подачи заявки на получение аренды
    function arend_cancel_arendator(uint arend_id) public {
        require(arends[arend_id].finished == false, "Предложение не активно!");
        require(arends[arend_id].arendator == msg.sender, "Вы не арендатор");
        arends[arend_id].arendator.transfer(arends[arend_id].sale);
        arends[arend_id].arendator = zero;
    }

}
