window.addEventListener("DOMContentLoaded", function() {

    let body = document.querySelector('body');

    function plateau (row, col) {
        for(let r = 0; r < row; r++) {
            for(let c = 0; c < col; c++) {
                let div = document.createElement('div');
                div.className = "row"+r+"-col"+c;
                body.appendChild(div);
            }
        }
    }

    function caseVide(empl) {
        let divContent = document.querySelector('.'+empl).innerHTML;
        if(divContent !== '') {
            return false;
        } else {
            return true;
        }
    }

    function plateauPlein (row, col) {
        let caseLibre = 0;
        for(let r = 0; r < row; r++) {
            for(let c = 0; c < col; c++) {
                let nomCase = ".row"+r+"-col"+c;
                let div = document.querySelector(nomCase);
                if(div.innerHTML === '') {
                    caseLibre++;
                }
            }
        }
        return caseLibre;
    }

    function winOrNot (player, signe, empl) {
        /*let valeur0 = empl.split("-");
        let row = valeur0[0].replace("row", "");
        let col = valeur0[1].replace("col", "");*/
        let test = false;
        let div0 = document.querySelector(".row0-col0");
        let div1 = document.querySelector(".row0-col2");
        let div2 = document.querySelector(".row1-col1");
        let div3 = document.querySelector(".row2-col0");
        let div4 = document.querySelector(".row2-col2");
        let div5 = document.querySelector(".row0-col1");
        let div6 = document.querySelector(".row1-col0");
        let div7 = document.querySelector(".row1-col2");
        let div8 = document.querySelector(".row2-col1");
        //test ligne
        if((div0.innerHTML === signe && div5.innerHTML === signe && div1.innerHTML === signe) || (div6.innerHTML === signe && div2.innerHTML === signe && div7.innerHTML === signe) || (div3.innerHTML === signe && div8.innerHTML === signe && div4.innerHTML === signe)) {
            test = true;
        }
        //test colonne
        if((div0.innerHTML === signe && div6.innerHTML === signe && div3.innerHTML === signe) || (div5.innerHTML === signe && div2.innerHTML === signe && div8.innerHTML === signe) || (div1.innerHTML === signe && div7.innerHTML === signe && div4.innerHTML === signe)) {
            test = true;
        }
        //test diag 1
        if(div0.innerHTML === signe && div2.innerHTML === signe && div4.innerHTML === signe) {
            test = true;
        } 
        //test diag 2
        if(div3.innerHTML === signe && div2.innerHTML === signe && div1.innerHTML === signe) {
            test = true;
        }
        if(test) {
            alert("Le "+player+" a gagné");
        }
        return test;
    }

    function joueur(empl, signe) {
        let div = document.querySelector('.'+empl);
        div.textContent = signe;
        if(!winOrNot("joueur", signe, empl)) { //le joueur n'a pas encore gagné
            //on recup le signe du bot par rapport à celui du joueur
            let signeBot = '';
            if(signe === 'x') {
                signeBot = 'o';
            } else {
                signeBot = 'x';
            }
            let caseDispo = plateauPlein(3,3);
            if(caseDispo > 0) {
                bot(signeBot);
            } else {
                alert("La partie se finie sur un match nul");
            }
        }
    }

    function bot(signe) {
        let valBot = 0;
        //on va prendre une colonne et une ligne via des chiffres aléatoires
        while(valBot < 1) {
            let col = Number(Math.round(Math.random() * (2 - 0) + 0));
            let row = Number(Math.round(Math.random() * (2 - 0) + 0));
            let caseAremplir = "row"+row+"-col"+col;
            let div = document.querySelector("."+caseAremplir);
            //on test si la case est vide ou non
            if(div.innerHTML === '') { //case vide
                div.textContent = signe;
                winOrNot("bot", signe, caseAremplir);
                valBot++;
            }
        }     
    }

    plateau(3,3);

    //Question joueur
    let signe = prompt("x ou o ?");

    body.addEventListener("click", function(e) {    
        if(caseVide(e.target.className)) { //la case est vide donc le joueur peut y jouer
            joueur(e.target.className, signe);
        } else { //la case n'est pas vide
            alert("Vous ne pouvez jouer que dans les cases vides");
        }    
    })

});