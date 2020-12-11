// Get random number between an interval
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// constructor for the log object
function Log(){
    // write in the log
    this.writeLog = function(string){
        let  p = $(".writableZone p");
        if(p.length > 7){
            $(".writableZone p").first().remove();
        }
        let d = new Date();
        let h = d.getHours();
        let m = d.getMinutes();
        let s = d.getSeconds();
        if(h < 10){
            h = "0"+h;
        }
        if(m < 10){
            m = "0"+m;
        }
        if(s < 10){
            s = "0"+s;
        }
        $(".writableZone").append(`
            <p>${h}:${m}.${s}&ensp;&ensp;-&ensp;&ensp;&ensp;INFO:&ensp;&ensp;${string}</p>
        `);
    };
};

// constructor for the player object
function Player(){
    // Load player from local storage
    this.load = function(){
        this.name = localStorage.getItem('name');
        this.weapon = localStorage.getItem('weapon');
        this.classe = localStorage.getItem('classe');
        this.armor = localStorage.getItem('armor');
        this.or = localStorage.getItem('or');
        this.pdv = localStorage.getItem('pdv');
        this.maxpdv = localStorage.getItem('maxpdv');
        this.mana = localStorage.getItem('mana');
        this.maxmana = localStorage.getItem('maxmana');
        this.speed = localStorage.getItem('speed');
        if(this.classe == "Archer"){
            this.src = "src/img/player/archer/PNG-Sequence/idle/Elf_01__IDLE_000.png";
            this.width = 383;
        }else if(this.classe == "Warrior"){
            this.src = "src/img/player/warrior/PNG-Sequence/idle/Warrior_01__IDLE_000.png";
            this.width = 297;
        }else{
            this.src = "src/img/player/wizard/PNG-Sequence/idle/1_IDLE_000.png";
            this.width = 180;
        }
    }
    // Save player in local storage
    this.save = function(){
        localStorage.setItem('name',this.name);
        localStorage.setItem('weapon',this.weapon);
        localStorage.setItem('classe',this.classe);
        localStorage.setItem('armor',this.armor);
        localStorage.setItem('or',this.or);
        localStorage.setItem('pdv',this.pdv);
        localStorage.setItem('maxpdv',this.pdv);
        localStorage.setItem('mana',this.mana);
        localStorage.setItem('maxmana',this.maxmana);
        localStorage.setItem('speed',this.speed);
    }
    this.name;
    this.weapon;
    this.classe;
    this.armor;
    this.or;
    this.pdv;
    this.maxpdv;
    this.mana;
    this.maxmana;
    this.speed;
    this.src;
    this.width;
}

// constructor for the mob object
function Mob(){
    // setup the stat of the monster 10% plus or less the stats of the player
    this.setup = function(){
        this.name = "Gobi";
        if(getRandomInt(2) == 0){
            this.weapon = parseInt(player.weapon) - Math.round(parseInt(player.weapon) * 10 / 100);
        }else{
            this.weapon = parseInt(player.weapon) + Math.round(parseInt(player.weapon) * 10 / 100);
        }
        this.classe = "Goblin";
        if(getRandomInt(2) == 0){
            this.pdv = parseInt(player.maxpdv) - Math.round(parseInt(player.maxpdv) * 10 / 100);
        }else{
            this.pdv = parseInt(player.maxpdv) + Math.round(parseInt(player.maxpdv) * 10 / 100);
        }
        this.maxpdv = this.pdv;
        if(getRandomInt(2) == 0){
            this.armor = parseInt(player.armor) - Math.round(parseInt(player.armor) * 10 / 100);
        }else{
            this.armor = parseInt(player.armor)+ Math.round(parseInt(player.armor) * 10 / 100);
        }
        if(getRandomInt(2) == 0){
            this.speed = parseInt(player.speed)- Math.round(parseInt(player.speed) * 10 / 100);
        }else{
            this.speed =parseInt(player.speed) + Math.round(parseInt(player.speed) * 10 / 100);
        }
        this.or = getRandomInt(200);
        console.log(this.name,this.weapon,this.classe,this.pdv,this.maxpdv,this.armor,this.speed,this.or);
    }
    this.name;
    this.weapon;
    this.classe;
    this.pdv;
    this.maxpdv;
    this.armor;
    this.speed;
    this.or;
}

// initialise object
let player = new Player();
let monster = new Mob();
let gameLog = new Log();

// When the player click on new game
$("#NewGame").click(( event ) => {
    event.preventDefault();
    $(".active").remove();
    $(".nav-link")[0].classList.add("active");
    $("#main").append(
        `<div class="container">
        <div class="createMenu">
            <div class="element">
                <input type="text" class="form-control" id="inputPlayerName" placeholder="PlayerName">
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Classe
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a class="dropdown-item" id="classe" href="#">Warrior</a>
                      <a class="dropdown-item" id="classe" href="#">Mage</a>
                      <a class="dropdown-item" id="classe" href="#">Archer</a>
                    </div>
                </div>
            </div>
            <div class="text-center">
                <button class="btn btn-primary" id="btnCreatePlayer">Create</button>
            </div>
        </div>
        </div>`
    );

    $("*#classe").click(function( event ){
        event.preventDefault();
        $("#btnCreatePlayer").text(`Create${" a "+$(this).text()}`);
    });

    $("#btnCreatePlayer").click(function(){
        console.log();
        localStorage.clear();
        localStorage.setItem('name',$(inputPlayerName)[0].value);
        localStorage.setItem('classe',$("#btnCreatePlayer")[0].innerText.split(' ')[2]);
        localStorage.setItem('or',1000);
        localStorage.setItem('pdv',75);
        localStorage.setItem('maxpdv',75);
        localStorage.setItem('mana',200);
        localStorage.setItem('maxmana',200);
        localStorage.setItem('speed',5);
        localStorage.setItem('armor',2);
        localStorage.setItem('weapon',5);
        $(".container").remove();
        gameSetup();
        gameLog.writeLog(`Creation of the ${localStorage.getItem('classe')} ${localStorage.getItem('name')}`);
    });
});

// If the local storage is empty then don't show the button load
if(localStorage.getItem("name") == null){
    $("#LoadGame")[0].classList.add("hidden");
    //$("#ctnLoad").append(`<a class="nav-link" href="" id="LoadGame">Load game</a>`);
    console.log("test")
    //<a class="nav-link" href="" id="LoadGame">Load game</a>
}

// When the player click on load game
$("#LoadGame").click((event)=>{
    event.preventDefault();
    //call gameSetup
    gameSetup();
    gameLog.writeLog(`Loading of the ${localStorage.getItem('classe')} ${localStorage.getItem('name')}`);
});

// Setup of the main content for the page
let gameSetup = ()=>{
    player.load();
    $("#main").append(`
    <div class="playerInfo">
    <h2 class="classe">Archer</h2>
    <h2 class="name">Tom</h2>
    <div class="infoList">
        <ul>
            <li>
                <img src="src/img/object/health.png" width="30" height="30" class="d-inline-block align-top" alt="">
                <div class="progressbar">
                    <div class="actualProgress" id="playerPdv" style="width:100%"></div>
                </div>
            </li>
            <li>
                <img src="src/img/object/mana.png" width="30" height="30" class="d-inline-block align-top" alt="">
                <div class="progressbar">
                    <div class="actualProgress" id="playerMana" style="width:100%"></div>
                </div>
            </li>
            <li>
                <img src="src/img/object/or.png" width="30" height="30" class="d-inline-block align-top" alt="">
                <div class="content">
                    <h4>1000</h4>
                </div>
            </li>
        </ul>
    </div>
</div>

<div class="plateau hidden"></div>

<div class="action">
    <div class="preCbt">
        <button type="button" class="btn btn-warning" id="btnFight">Fight</button>
    </div>
</div>

<div class="log">
    <div class="writableZone">

    </div>
</div>

<div class="shop">
    <div class="shopContent">
        <ul id="ulShop">
            <li id="regenHp"><img src="src/img/plus.svg" id='buyRegenHp' width="15px" /> - 500 <img src="src/img/object/or.png" width="15" height="15"> | Regen Hp</li>
            <li id="regenMana"><img src="src/img/plus.svg" id='buyRegenMana' width="15px" /> - 750<img src="src/img/object/mana.png" width="15" height="15"> | Regen Mana</li>

        </ul>
    </div>
</div>
<div class="card hidden">

</div>
    `);
    $("#pName .navbar-brand")[0].innerHTML = `${player.name} <img src="src/img/name.svg" width="30" height="30" class="d-inline-block align-top" alt="">`;
    $(".classe").text(player.classe);
    $(".name").text(player.name);
    $(".nav").remove();
    $("#pName").click((e)=>{
        e.preventDefault();
        gameLog.writeLog(`Show player info`);
        $(".card").append(`
            <div class="closeCard"></div>
            <div class="card-content">
                <h2>${player.classe}</h2>
                <h2>${player.name}</h2>
                <ul>
                    <li>weapon: ${player.weapon}</li>
                    <li>armor: ${player.armor}</li>
                    <li>or: ${player.or}</li>
                    <li>pdv: ${player.pdv}</li>
                    <li>maxpdv: ${player.maxpdv}</li>
                    <li>mana: ${player.mana}</li>
                    <li>maxmana: ${player.maxmana}</li>
                </ul>
            </div>
        `);
        $(".card")[0].classList.remove("hidden");
        $(".closeCard").click((e)=>{
            gameLog.writeLog(`Hide player info`);
            $(".card").empty();
            $(".card")[0].classList.add("hidden");
        });
    });

    

    boucleFight();

    function boucleFight(){
        player.save();
        function updateShop(){
            if(player.or < 500){
                $("#buyRegenHp")[0].src="src/img/close.svg";
                $("#buyRegenMana")[0].src="src/img/close.svg";
            }else if(player.or < 750){
                $("#buyRegenMana")[0].src="src/img/close.svg";
            }
        }
        updateShop();

        $("#buyRegenHp").click((e)=>{
            if(player.or >= 500){
                player.or = player.or - 500;
                $(".content h4").text(player.or);
                player.pdv = player.maxpdv;
                $("#playerPdv").css("width",`${(player.pdv * 100 / player.maxpdv)}%`);
                updateShop();
            }
        });

        $("#buyRegenMana").click((e)=>{
            if(player.or >= 750){
                player.or = player.or - 750;
                $(".content h4").text(player.or);
                player.mana = player.maxmana;
                $("#playerMana").css("width",`${(player.mana * 100 / player.maxmana)}%`);
                updateShop();
            }
        });

        $("#btnFight").click((e)=>{
            $("#buyRegenHp").remove();
            $("#buyRegenMana").remove();
            gameLog.writeLog(`Search for combat`);
            let plt = $(".plateau");
            plt[0].classList.remove("hidden");

            let fight = ()=>{
                plt.append(`
                    <div class="fightzone">
                        <img src="${player.src}" width="${player.width}" id="playerImg" class="d-inline-block align-top" alt="">
                        <img src="src/img/monster/Goblin/PNG Sequences/Idle/0_Goblin_Idle_000.png" id="monsterImg" class="d-inline-block align-top" alt="">
                        <div class="progressbar" id="pdvProgressbar">
                            <div class="actualProgress" style="width:100%"></div>
                        </div>
                    </div>
                `);
            
                $("#btnFight").remove();
            
                uiFight();
            }

            monster.setup();
            fight();

            function uiFight(){
                $(".action").append(`
                <div class="cbt">
                    <button type="button" class="btn btn-danger" id="btnRun">Run away</button>
                    <button type="button" class="btn btn-success" id="btnAtk">Attack</button>
                </div>
                `);
                if(player.mana > 55){
                    $(".cbt").append(`
                        <button type="button" class="btn btn-charge" style="width:166px" id="btnChargedAtk">Charged attack</button>
                    `);
                }

                $("#btnRun").click((e)=>{
                    plt[0].classList.add("hidden");
                    $(".fightzone").remove();
                    $(".cbt").remove();

                    $(".preCbt").append(`<button type="button" class="btn btn-warning" id="btnFight">Fight</button>`);
                    $("#regenHp").prepend(`<img src="src/img/plus.svg" id='buyRegenHp' width="15px" />`);
                    $("#regenMana").prepend(`<img src="src/img/plus.svg" id='buyRegenMana' width="15px" />`);

                    boucleFight();
                });
            
                $("#btnAtk").click((e)=>{
                    atkFu("normal");
                });
                $("#btnChargedAtk").click((e)=>{
                    atkFu("charged");
                })
                function atkFu(type){
                    let atk;
                    switch(type){
                        case "normal":
                            atk = Math.round(player.weapon - monster.armor);
                            gameLog.writeLog(`${player.name} deals the enemy of ${atk}`);
                            break;
                        case "charged":
                            atk = Math.round(player.weapon- monster.armor)+Math.round((player.weapon-monster.armor)*500/100);
                            //[Valeur 1] + ([Valeur 1] x [Pourcentage] / 100)
                            player.mana = player.mana-55;
                            gameLog.writeLog(`${player.name} deals the enemy of ${atk} with a charged attacks`);
                            $("#playerMana").css("width",`${(player.mana * 100 / player.maxmana)}%`);
                            break;
                        default:
                            console.log("Error in atk function. Switch type in top.");
                    }
                    monster.pdv = monster.pdv-atk;
                    if(monster.pdv < 0){
                        monster.pdv = 0;
                    }
                    $("#pdvProgressbar div").css("width",`${(monster.pdv * 100 / monster.maxpdv)}%`)
                    playerAnim("atk");
                    monsterAnim("hurt");                    
                    $(".cbt").remove();
                    setTimeout(suite,1000);

                    function suite(){
                        if(monster.pdv > 0){
                            //monster attaque
                            atk = Math.round(monster.weapon - player.armor);
                            player.pdv = player.pdv-atk;
                            gameLog.writeLog(`${monster.name} deals the player of ${atk}`);
                            $("#playerPdv").css("width",`${(player.pdv * 100 / player.maxpdv)}%`);
                            monsterAnim("atk");
                            playerAnim("hurt");
                            if(player.pdv <= 0){
                                playerAnim("die");
                                gameLog.writeLog(`You lost. Your character will be deleted`);
                                localStorage.clear();
                                document.location.reload();
                            }
                            uiFight();
                        }else{
                            monsterAnim("die");
                            setTimeout(suite2,1000);
                            function suite2(){
                                //gameLog.writeLog(`${monster.name} deals the player of ${atk}`);
                                gameLog.writeLog(`${player.name} won the fight and collects ${monster.or} gold`);
                                player.or = parseInt(player.or) + parseInt(monster.or);
                                $(".content h4").text(player.or);

                                plt[0].classList.add("hidden");
                                $(".fightzone").remove();
                                $(".cbt").remove();
                                $(".preCbt").append(`<button type="button" class="btn btn-warning" id="btnFight">Fight</button>`);

                                $("#regenHp").prepend(`<img src="src/img/plus.svg" id='buyRegenHp' width="15px" />`);
                                $("#regenMana").prepend(`<img src="src/img/plus.svg" id='buyRegenMana' width="15px" />`);
                                
                                boucleFight();
                            }

                        }

                    };
                }
            }

        });
    }
}

// Animation of the player
let playerAnim = (type)=>{
    switch(player.classe){
        case "Archer":
            if(type == "atk"){
                let animArray = ["src/img/player/archer/PNG-Sequence/atk/Elf_01__ATTACK_000.png","src/img/player/archer/PNG-Sequence/atk/Elf_01__ATTACK_001.png","src/img/player/archer/PNG-Sequence/atk/Elf_01__ATTACK_002.png","src/img/player/archer/PNG-Sequence/atk/Elf_01__ATTACK_003.png","src/img/player/archer/PNG-Sequence/atk/Elf_01__ATTACK_004.png","src/img/player/archer/PNG-Sequence/atk/Elf_01__ATTACK_005.png","src/img/player/archer/PNG-Sequence/atk/Elf_01__ATTACK_006.png","src/img/player/archer/PNG-Sequence/atk/Elf_01__ATTACK_007.png","src/img/player/archer/PNG-Sequence/atk/Elf_01__ATTACK_008.png","src/img/player/archer/PNG-Sequence/atk/Elf_01__ATTACK_009.png","src/img/player/archer/PNG-Sequence/idle/Elf_01__IDLE_000.png"];
                let indice = 0;
                let id = setInterval(frame, 50);
                function frame() {
                    if (!(indice < animArray.length)) {
                        clearInterval(id);
                    } else {
                        $("#playerImg")[0].src=animArray[indice];
                        indice++;
                    }
                }
            }
            else if(type == "hurt"){
                let animArray = ["src/img/player/archer/PNG-Sequence/hurt/Elf_01__HURT_000.png","src/img/player/archer/PNG-Sequence/hurt/Elf_01__HURT_002.png","src/img/player/archer/PNG-Sequence/hurt/Elf_01__HURT_001.png","src/img/player/archer/PNG-Sequence/hurt/Elf_01__HURT_003.png","src/img/player/archer/PNG-Sequence/hurt/Elf_01__HURT_004.png","src/img/player/archer/PNG-Sequence/hurt/Elf_01__HURT_005.png","src/img/player/archer/PNG-Sequence/hurt/Elf_01__HURT_006.png","src/img/player/archer/PNG-Sequence/hurt/Elf_01__HURT_007.png","src/img/player/archer/PNG-Sequence/hurt/Elf_01__HURT_008.png","src/img/player/archer/PNG-Sequence/hurt/Elf_01__HURT_009.png","src/img/player/archer/PNG-Sequence/idle/Elf_01__IDLE_000.png"];
                let indice = 0;
                let id = setInterval(frame, 50);
                function frame() {
                    if (!(indice < animArray.length)) {
                        clearInterval(id);
                    } else {
                        $("#playerImg")[0].src=animArray[indice];
                        indice++;
                    }
                }
            }else if(type == "die"){
                let animArray = ["src/img/player/archer/PNG-Sequence/die/Elf_01__DIE_000.png","src/img/player/archer/PNG-Sequence/die/Elf_01__DIE_002.png","src/img/player/archer/PNG-Sequence/die/Elf_01__DIE_001.png","src/img/player/archer/PNG-Sequence/die/Elf_01__DIE_003.png","src/img/player/archer/PNG-Sequence/die/Elf_01__DIE_004.png","src/img/player/archer/PNG-Sequence/die/Elf_01__DIE_005.png","src/img/player/archer/PNG-Sequence/die/Elf_01__DIE_006.png","src/img/player/archer/PNG-Sequence/die/Elf_01__DIE_007.png","src/img/player/archer/PNG-Sequence/die/Elf_01__DIE_008.png","src/img/player/archer/PNG-Sequence/die/Elf_01__DIE_009.png"];
                let indice = 0;
                let id = setInterval(frame, 50);
                function frame() {
                    if (!(indice < animArray.length)) {
                        clearInterval(id);
                    } else {
                        $("#playerImg")[0].src=animArray[indice];
                        indice++;
                    }
                }
            }
            break;
        case "Warrior":
            if(type == "atk"){
                let animArray = ["src/img/player/warrior/PNG-Sequence/atq/Warrior_01__ATTACK_000.png","src/img/player/warrior/PNG-Sequence/atq/Warrior_01__ATTACK_001.png","src/img/player/warrior/PNG-Sequence/atq/Warrior_01__ATTACK_002.png","src/img/player/warrior/PNG-Sequence/atq/Warrior_01__ATTACK_003.png","src/img/player/warrior/PNG-Sequence/atq/Warrior_01__ATTACK_004.png","src/img/player/warrior/PNG-Sequence/atq/Warrior_01__ATTACK_005.png","src/img/player/warrior/PNG-Sequence/atq/Warrior_01__ATTACK_006.png","src/img/player/warrior/PNG-Sequence/atq/Warrior_01__ATTACK_007.png","src/img/player/warrior/PNG-Sequence/atq/Warrior_01__ATTACK_008.png","src/img/player/warrior/PNG-Sequence/atq/Warrior_01__ATTACK_009.png","src/img/player/warrior/PNG-Sequence/idle/Warrior_01__IDLE_000.png"];
                let indice = 0;
                let id = setInterval(frame, 50);
                function frame() {
                    if (!(indice < animArray.length)) {
                        clearInterval(id);
                    } else {
                        $("#playerImg")[0].src=animArray[indice];
                        indice++;
                    }
                }
            }
            else if(type == "hurt"){
                let animArray = ["src/img/player/warrior/PNG-Sequence/hurt/Warrior_01__HURT_000.png","src/img/player/warrior/PNG-Sequence/hurt/Warrior_01__HURT_001.png","src/img/player/warrior/PNG-Sequence/hurt/Warrior_01__HURT_002.png","src/img/player/warrior/PNG-Sequence/hurt/Warrior_01__HURT_003.png","src/img/player/warrior/PNG-Sequence/hurt/Warrior_01__HURT_004.png","src/img/player/warrior/PNG-Sequence/hurt/Warrior_01__HURT_005.png","src/img/player/warrior/PNG-Sequence/hurt/Warrior_01__HURT_006.png","src/img/player/warrior/PNG-Sequence/hurt/Warrior_01__HURT_007.png","src/img/player/warrior/PNG-Sequence/hurt/Warrior_01__HURT_008.png","src/img/player/warrior/PNG-Sequence/hurt/Warrior_01__HURT_009.png","src/img/player/warrior/PNG-Sequence/idle/Warrior_01__IDLE_000.png"];
                let indice = 0;
                let id = setInterval(frame, 50);
                function frame() {
                    if (!(indice < animArray.length)) {
                        clearInterval(id);
                    } else {
                        $("#playerImg")[0].src=animArray[indice];
                        indice++;
                    }
                }
            }else if(type == "die"){
                let animArray = ["src/img/player/warrior/PNG-Sequence/die/Warrior_01__DIE_000.png","src/img/player/warrior/PNG-Sequence/die/Warrior_01__DIE_001.png","src/img/player/warrior/PNG-Sequence/die/Warrior_01__DIE_002.png","src/img/player/warrior/PNG-Sequence/die/Warrior_01__DIE_003.png","src/img/player/warrior/PNG-Sequence/die/Warrior_01__DIE_004.png","src/img/player/warrior/PNG-Sequence/die/Warrior_01__DIE_005.png","src/img/player/warrior/PNG-Sequence/die/Warrior_01__DIE_006.png","src/img/player/warrior/PNG-Sequence/die/Warrior_01__DIE_007.png","src/img/player/warrior/PNG-Sequence/die/Warrior_01__DIE_008.png","src/img/player/warrior/PNG-Sequence/die/Warrior_01__DIE_009.png","src/img/player/warrior/PNG-Sequence/idle/Warrior_01__IDLE_000.png"];
                let indice = 0;
                let id = setInterval(frame, 50);
                function frame() {
                    if (!(indice < animArray.length)) {
                        clearInterval(id);
                    } else {
                        $("#playerImg")[0].src=animArray[indice];
                        indice++;
                    }
                }
            }
            break;
        case "Mage":
            if(type == "atk"){
                let animArray = ["src/img/player/wizard/PNG-Sequence/atk/5_ATTACK_000.png",
                "src/img/player/wizard/PNG-Sequence/atk/5_ATTACK_001.png",
                "src/img/player/wizard/PNG-Sequence/atk/5_ATTACK_002.png",
                "src/img/player/wizard/PNG-Sequence/atk/5_ATTACK_003.png",
                "src/img/player/wizard/PNG-Sequence/atk/5_ATTACK_004.png",
                "src/img/player/wizard/PNG-Sequence/idle/1_IDLE_000.png"];
                let indice = 0;
                let id = setInterval(frame, 50);
                function frame() {
                    if (!(indice < animArray.length)) {
                        clearInterval(id);
                    } else {
                        $("#playerImg")[0].src=animArray[indice];
                        indice++;
                    }
                }
            }
            else if(type == "hurt"){
                let animArray = ["src/img/player/wizard/PNG-Sequence/hurt/6_HURT_000.png",
                "src/img/player/wizard/PNG-Sequence/hurt/6_HURT_001.png",
                "src/img/player/wizard/PNG-Sequence/hurt/6_HURT_002.png",
                "src/img/player/wizard/PNG-Sequence/hurt/6_HURT_003.png",
                "src/img/player/wizard/PNG-Sequence/hurt/6_HURT_004.png",
                "src/img/player/wizard/PNG-Sequence/idle/1_IDLE_000.png"];
                let indice = 0;
                let id = setInterval(frame, 50);
                function frame() {
                    if (!(indice < animArray.length)) {
                        clearInterval(id);
                    } else {
                        $("#playerImg")[0].src=animArray[indice];
                        indice++;
                    }
                }
            }else if(type == "die"){
                let animArray = ["src/img/player/wizard/PNG-Sequence/atk/5_ATTACK_000.png",
                "src/img/player/wizard/PNG-Sequence/atk/5_ATTACK_001.png",
                "src/img/player/wizard/PNG-Sequence/atk/5_ATTACK_002.png",
                "src/img/player/wizard/PNG-Sequence/atk/5_ATTACK_003.png",
                "src/img/player/wizard/PNG-Sequence/atk/5_ATTACK_004.png",
                "src/img/player/wizard/PNG-Sequence/idle/1_IDLE_000.png"];
                let indice = 0;
                let id = setInterval(frame, 50);
                function frame() {
                    if (!(indice < animArray.length)) {
                        clearInterval(id);
                    } else {
                        $("#playerImg")[0].src=animArray[indice];
                        indice++;
                    }
                }
            }
            break;
        default:
            console.log("Error: function animation in switch classe. Wrong classe.");
    }
}

// Animation of the monster
let monsterAnim = (type)=>{
    switch(monster.classe){
        case "Goblin":
            if(type == "atk"){
                let animArray = ["src/img/monster/Goblin/PNG Sequences/Slashing/0_Goblin_Slashing_000.png","src/img/monster/Goblin/PNG Sequences/Slashing/0_Goblin_Slashing_001.png","src/img/monster/Goblin/PNG Sequences/Slashing/0_Goblin_Slashing_002.png","src/img/monster/Goblin/PNG Sequences/Slashing/0_Goblin_Slashing_003.png","src/img/monster/Goblin/PNG Sequences/Slashing/0_Goblin_Slashing_004.png","src/img/monster/Goblin/PNG Sequences/Slashing/0_Goblin_Slashing_005.png","src/img/monster/Goblin/PNG Sequences/Slashing/0_Goblin_Slashing_006.png","src/img/monster/Goblin/PNG Sequences/Slashing/0_Goblin_Slashing_007.png","src/img/monster/Goblin/PNG Sequences/Slashing/0_Goblin_Slashing_008.png","src/img/monster/Goblin/PNG Sequences/Slashing/0_Goblin_Slashing_009.png","src/img/monster/Goblin/PNG Sequences/Slashing/0_Goblin_Slashing_010.png","src/img/monster/Goblin/PNG Sequences/Slashing/0_Goblin_Slashing_011.png","src/img/monster/Goblin/PNG Sequences/Idle/0_Goblin_Idle_000.png"];
                let indice = 0;
                let id = setInterval(frame, 50);
                function frame() {
                    if (!(indice < animArray.length)) {
                        clearInterval(id);
                    } else {
                        $("#monsterImg")[0].src=animArray[indice];
                        indice++;
                    }
                }
            }else if(type == "hurt"){
                let animArray = ["src/img/monster/Goblin/PNG Sequences/Hurt/0_Goblin_Hurt_000.png","src/img/monster/Goblin/PNG Sequences/Hurt/0_Goblin_Hurt_001.png","src/img/monster/Goblin/PNG Sequences/Hurt/0_Goblin_Hurt_002.png","src/img/monster/Goblin/PNG Sequences/Hurt/0_Goblin_Hurt_003.png","src/img/monster/Goblin/PNG Sequences/Hurt/0_Goblin_Hurt_004.png","src/img/monster/Goblin/PNG Sequences/Hurt/0_Goblin_Hurt_005.png","src/img/monster/Goblin/PNG Sequences/Hurt/0_Goblin_Hurt_006.png","src/img/monster/Goblin/PNG Sequences/Hurt/0_Goblin_Hurt_007.png","src/img/monster/Goblin/PNG Sequences/Hurt/0_Goblin_Hurt_008.png","src/img/monster/Goblin/PNG Sequences/Hurt/0_Goblin_Hurt_009.png","src/img/monster/Goblin/PNG Sequences/Hurt/0_Goblin_Hurt_010.png","src/img/monster/Goblin/PNG Sequences/Hurt/0_Goblin_Hurt_011.png","src/img/monster/Goblin/PNG Sequences/Idle/0_Goblin_Idle_000.png"];
                let indice = 0;
                let id = setInterval(frame, 50);
                function frame() {
                    if (!(indice < animArray.length)) {
                        clearInterval(id);
                    } else {
                        $("#monsterImg")[0].src=animArray[indice];
                        indice++;
                    }
                }
            }else if(type == "die"){
                let animArray = ["src/img/monster/Goblin/PNG Sequences/Dying/0_Goblin_Dying_000.png","src/img/monster/Goblin/PNG Sequences/Dying/0_Goblin_Dying_001.png","src/img/monster/Goblin/PNG Sequences/Dying/0_Goblin_Dying_002.png","src/img/monster/Goblin/PNG Sequences/Dying/0_Goblin_Dying_003.png","src/img/monster/Goblin/PNG Sequences/Dying/0_Goblin_Dying_004.png","src/img/monster/Goblin/PNG Sequences/Dying/0_Goblin_Dying_005.png","src/img/monster/Goblin/PNG Sequences/Dying/0_Goblin_Dying_006.png","src/img/monster/Goblin/PNG Sequences/Dying/0_Goblin_Dying_007.png","src/img/monster/Goblin/PNG Sequences/Dying/0_Goblin_Dying_008.png","src/img/monster/Goblin/PNG Sequences/Dying/0_Goblin_Dying_009.png","src/img/monster/Goblin/PNG Sequences/Dying/0_Goblin_Dying_010.png","src/img/monster/Goblin/PNG Sequences/Dying/0_Goblin_Dying_011.png","src/img/monster/Goblin/PNG Sequences/Dying/0_Goblin_Dying_012.png","src/img/monster/Goblin/PNG Sequences/Dying/0_Goblin_Dying_013.png","src/img/monster/Goblin/PNG Sequences/Dying/0_Goblin_Dying_014.png"];
                let indice = 0;
                let id = setInterval(frame, 50);
                function frame() {
                    if (!(indice < animArray.length)) {
                        clearInterval(id);
                    } else {
                        $("#monsterImg")[0].src=animArray[indice];
                        indice++;
                    }
                }
            }
            break;
        case "Warrior":
            break;
        case "Wizard":
            break;
        default:
            console.log("Error: function animation in switch classe. Wrong classe.");
    }
}

// Cheate code for test. call the function in console when you need to test something that need a change of dps from the monster or player
function cheateCode(cheate){
    switch(cheate){
        case "playerDps":
            player.weapon = 75;
            break;
        case "monsterDps":
            monster.weapon = 75;
            break;
    }
}

/* Todo :
*   - speed : Si le player a plus de speed que le monstre, il peut s'enfuir (Pour le moment il peut s'enfuir dans tout les cas)
*   - Fix animation pour le mage (Trouver un nouveau model pour le mage car la suite il y a des images de taille differente dans la suite de png pour l'anim)
*   - Ajouter plus de monstre (Il n'y a qu'un type de monstre pour le moment. Gobi)
*   - Ajouter des options dans le shop. ( améliorer les pv max, améliorer le mana max, ameliorer les degats d'attaque, améliorer l'armure, améliorer la vitesse)
*   - Ajouter une stats chance qui améliore le drop de l'or
*
*
*
*/