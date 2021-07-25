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
    const testMaker=()=>{
    let newBoard= Gameboard.toBeOrNotToBe();
    const gameScreen=document.getElementById('gameScreen');
    let subDivs=gameScreen.getElementsByTagName('div');
    console.log(subDivs);
    for(let i=0;i<newBoard.length;i++){
        if(newBoard[i]==undefined){
            newBoard[i]='';
        }
        
        subDivs[i].addEventListener('click',fillArea);
        subDivs[i].innerHTML=newBoard[i];
    }
    }
    const fillArea=(e)=>{
        e.target.innerHTML='X';
    }
    return{testMaker};
})();

GameFlow.testMaker();