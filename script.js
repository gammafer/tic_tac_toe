const Gameboard=(()=>{
    let toBeOrNotToBe=()=>{

        let _board;

        if(localStorage.getItem('_board')==null){
        _board=new Array(9);

    }
        else{

            _board=localStorage.getItem('_board');

        }

        return _board;

    };
    return {toBeOrNotToBe};
})();

const Player=(playerName,sign)=>{
    return {playerName, sign};
}

const GameFlow=(()=>{

    let player;
    let enemy;
    let filledField=0;
    let x=document.getElementById('signX');
    let o=document.getElementById('signO');
    let restart=document.getElementById('restartBtn');
    const gameScreen=document.getElementById('gameScreen');
    let subDivs=gameScreen.getElementsByTagName('div');
    
    const winningCons=[
        [1,2,3],
        [1,4,7],
        [1,5,9],
        [4,5,6],
        [7,8,9],
        [7,5,3],
        [3,6,9],
        [2,5,8]

    ];

    const chooseSide=()=>{
        
        if(localStorage.getItem('_board')==null){

            x.addEventListener('click',function(){
                player= Player('player', 'X');
                enemy = Player('enemy' , 'O');
                disableBtns();
                startGame();
            });



            o.addEventListener('click',function(){
                player=Player('player','O');
                enemy = Player('enemy', 'X');
                disableBtns();
                startGame();
            });
        }
        else{
            startGame();
        }
    }
        
    
    const disableBtns=()=>{
        x.disabled = "disabled";
        o.disabled = "disabled";
    }

    const startGame=()=>{

        let newBoard= Gameboard.toBeOrNotToBe();
        for(let i=0;i<newBoard.length;i++){
            if(newBoard[i]==undefined){
                newBoard[i]='';
            }
            
            subDivs[i].addEventListener('click',function(e){
                console.log('triggered')
                fillArea(e,player)
                }
                );
            subDivs[i].innerHTML=newBoard[i];
        }
        enemyTurn();
    }


    const fillArea=(e,players)=>{
        console.log(e.target);
        if(e.target.innerHTML===''){
            e.target.innerHTML=player.sign;
            let check=checkWin(players.sign);
            if(!check){
            enemyTurn();
            }
           // localStorage.setItem('_board');
        };     
    }

    const enemyTurn=()=>{
        let i=0;
        while(i<100){
        let enemyTurn=Math.floor( Math.random()*9 );
        console.log(enemyTurn);
            if(subDivs[enemyTurn].innerHTML===''){
            subDivs[enemyTurn].innerHTML=enemy.sign;
            checkWin(enemy.sign);
            break;
            }
            i++;
        }
        
        
    }

    const checkWin=(sign)=>{
        filledField++;
        for(let i=0;i<winningCons.length;i++){
           let winningCon=winningCons[i];
           let a= subDivs[winningCon[0]-1].innerHTML===sign;
           let b= subDivs[winningCon[1]-1].innerHTML===sign;
           let c= subDivs[winningCon[2]-1].innerHTML===sign;
           if(a && b && c){
               console.log(sign ," wins");
               endGame();
               return true;
           }
        }
        if (filledField==9){console.log('draw');
        endGame();
        };
        return false;
    }


    const restartGame=()=>{
        localStorage.removeItem('_board');
        filledField=0;
        startGame();
    }
    
    const endGame=()=>{
        for(let i=0;i<subDivs.length;i++){
            subDivs[i].removeEventListener('click',function(e){
                console.log('triggered')
                fillArea(e,player)
                }
                );
        }
        filledField=0;
        x.disabled=false;
        o.disabled=false;
    }

    restart.addEventListener('click',restartGame);


    return{chooseSide,startGame};

})();

const BtnControl=()=>{
    
}
GameFlow.chooseSide();

