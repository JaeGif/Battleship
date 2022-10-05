(()=>{"use strict";function t(){return new Audio("assets/sfx/hit.wav")}function e(){return new Audio("assets/sfx/miss.mp3")}function n(t){const e=s(t),n=document.getElementById("current-opponent-board");for(let s=0;s<t*t;s++){const t=document.createElement("div");t.className="opponent-grid-elements",t.id=`b${e.next().value}`,a(t),n.appendChild(t)}}function*s(t){let e=[0,0];for(;e[0]<=t-1&&e[1]<=t-1;)0===e[0]&&0===e[1]&&(yield e),e[1]++,e[1]===t&&(e[0]++,e[1]=0),yield e}function a(n){n.addEventListener("click",(()=>{let s="";const i=t(),o=e(),l=document.getElementById("turn");if("player"!==y.turn)return void a(n);const c=[...y.players][0],d=[...y.boards][1],p=n.id.slice(1).split(",");c.attack(p,d),d.allShipsSunk()&&(y.gameOver=!0,m()),!0===y.wasHit?(i.play(),n.classList.add("hit"),s="Its a hit!",!0===y.sunkEventFlag&&(s=`You sunk the ${y.justSunk}!`,y.sunkEventFlag=!1),y.wasHit=!1):(o.play(),s="Miss...",n.classList.add("miss")),"PvP"===y.mode?(y.turn="opponent",l.textContent=`${s} It's ${r()}'s Turn!`):"PvC"===y.mode&&(y.turn="computer",l.textContent=`${s} It's ${r()}'s Turn!`,async function(){let n="";const s=document.getElementById("turn");await function(){const t=1500*Math.random();return new Promise((e=>setTimeout(e,t)))}();const a=t(),i=e(),o=[...y.players][1],l=[...y.boards][0];o.cpuAttackPattern(l);let c=[...y.cpuAttacked][0][0]+","+[...y.cpuAttacked][0][1];console.log(c),y.cpuAttacked=[];const d=document.getElementById(`a${c}`);l.allShipsSunk()&&(y.gameOver=!0,m()),!0===y.wasHit?(a.play(),d.classList.remove("reveal"),d.classList.add("hit"),n="Its a hit!",!0===y.sunkEventFlag&&(n=`Computer sunk the ${y.justSunk}!`,y.sunkEventFlag=!1),y.wasHit=!1):(i.play(),n="Miss...",d.classList.add("miss")),y.turn="player",s.textContent=`${n} It's ${r()}'s Turn!`}())}),{once:!0})}function i(n){n.addEventListener("click",(()=>{const s=t(),a=e();let o="";const l=document.getElementById("turn");if("player"===y.turn)return void i(n);const c=[...y.players][1],d=[...y.boards][0],p=n.id.slice(1).split(",");"PvP"===y.mode&&(c.attack(p,d),!0===y.wasHit?(s.play(),n.classList.add("hit"),o="Its a hit!",!0===y.sunkEventFlag&&(o=`You sunk the ${y.justSunk}!`,y.sunkEventFlag=!1),y.wasHit=!1):(a.play(),n.classList.add("miss"),o="Miss...")),d.allShipsSunk()&&(y.gameOver=!0,m()),y.turn="player",l.textContent=`${o} It's ${r()}'s Turn!`}),{once:!0})}function r(){const t=[...y.boards][0],e=[...y.boards][1];switch(y.turn){case"player":return""===t.name?"Player 1":t.name;case"opponent":return""===e.name?"Player 2":e.name;case"computer":return"Computer"}}const o=class{constructor(t,e=null){this.name=e,this.length=t,this.hitCoordinates=[]}getHitCoordinates(){return this.hitCoordinates}hit(t){this.hitCoordinates.push(t)}isSunk(){return this.length===this.hitCoordinates.length}};class l{static axis="x";static currentShip=[];static currentShipIndex=0;static currentPlacementBoard="player"}function c(t){t.addEventListener("dragover",(e=>{e.preventDefault();let n=t.id;if(n=n.split(","),"x"===l.axis)for(let t=0;t<l.currentShip[l.currentShipIndex].shipObj.length;t++){let e=n[0]+","+(parseInt(n[1])+t);document.getElementById(`${e}`)}})),t.addEventListener("dragleave",(e=>{let n=t.id;if(n=n.split(","),"x"===l.axis)for(let t=0;t<l.currentShip[l.currentShipIndex].shipObj.length;t++){let e=n[0]+","+(parseInt(n[1])+t);document.getElementById(`${e}`)}})),t.addEventListener("drop",(e=>{e.preventDefault();let a=t.id;a=a.split(",");let o=[];if("x"===l.axis&&parseInt(a[1])+l.currentShip[l.currentShipIndex].shipObj.length-1>9||"y"===l.axis&&parseInt(a[0])+l.currentShip[l.currentShipIndex].shipObj.length-1>9)return!1;if("x"===l.axis)for(let t=0;t<l.currentShip[l.currentShipIndex].shipObj.length;t++)o.push([parseInt(a[0]),parseInt(a[1])+t]);if("y"===l.axis)for(let t=0;t<l.currentShip[l.currentShipIndex].shipObj.length;t++)o.push([parseInt(a[0])+t,parseInt(a[1])]);if(!function(t){let e;e="player"===l.currentPlacementBoard?[...y.boards][0]:[...y.boards][1];for(let n=0;n<t.length;n++)for(let s=0;s<e.shipCoordinates.length;s++)for(let a=0;a<e.shipCoordinates[s].location.length;a++)if(t[n][0]===e.shipCoordinates[s].location[a][0]&&t[n][1]===e.shipCoordinates[s].location[a][1])return!1;return!0}(o))return!1;const c=e.dataTransfer.getData("text"),h=document.getElementById(c);var m;e.target.appendChild(h),h.setAttribute("draggable",!1),m=o,"player"===l.currentPlacementBoard?[...y.boards][0].addShip([...l.currentShip][l.currentShipIndex].shipObj,m):"opponent"===l.currentPlacementBoard&&[...y.boards][1].addShip([...l.currentShip][l.currentShipIndex].shipObj,m),d(),function(){if(l.currentShipIndex++,l.currentShipIndex>=5){const t=document.getElementById("game"),e=document.getElementById("placement-page-body-container");if("PvC"===y.mode)[...y.boards][1].randomAddShips();else if("PvP"===y.mode&&"player"===l.currentPlacementBoard)return function(){d(),l.currentShip=[],l.currentShipIndex=0,l.currentPlacementBoard="opponent";const t=document.getElementById("placement-board");for(;t.firstChild;)t.removeChild(t.lastChild);const e=document.getElementById("unplaced-ship-container");for(;e.firstChild;)e.lastChild.className="",e.removeChild(e.lastChild)}(),u();e.style.display="none",t.style.display="flex",function(t=10){!async function(){const t=await fetch("https://api.giphy.com/v1/gifs/o0eOCNkn7cSD6?api_key=XQjjxBQQYTlh7yBaVu1JXQ6YbH5dno3B&s=cats",{mode:"cors"}),e=await t.json();document.getElementById("gg-img").src=e.data.images.original.url}();const e=document.getElementById("game");document.body.style.backgroundImage="none",async function(){const t=await fetch("https://api.giphy.com/v1/gifs/XPlcxsFs8BIKk?api_key=XQjjxBQQYTlh7yBaVu1JXQ6YbH5dno3B&s=cats",{mode:"cors"}),e=await t.json();document.body.style.backgroundImage=`url(${e.data.images.original.url})`}();const a=document.getElementById("placement-page-body-container");!function(){const t=[...y.boards][0],e=[...y.boards][1],n=document.getElementById("player-name"),s=document.getElementById("player-2-name");""===t.name?n.textContent="Player 1":n.textContent=`${t.name}`,""===e.name?s.textContent="Player 2":s.textContent=`${e.name}`}(),function(t){const e=s(t),n=document.getElementById("current-player-board");for(let s=0;s<t*t;s++){const t=document.createElement("div");t.className="player-grid-elements",t.id=`a${e.next().value}`,i(t),n.appendChild(t)}}(t),"PvP"===y.mode?n(t):"PvC"===y.mode&&(function(){let t="";const e=[...y.boards][0];for(let n=0;n<e.shipCoordinates.length;n++)for(let s=0;s<e.shipCoordinates[n].location.length;s++)t=e.shipCoordinates[n].location[s][0]+","+e.shipCoordinates[n].location[s][1],document.getElementById(`a${t}`).classList.add("reveal")}(),n(t)),a.style.display="none",e.style.display="flex",document.getElementById("turn").textContent=`${r()} start your offensive!`}()}}(),l.currentShipIndex<5&&p()}))}function d(){l.axis="x",document.getElementById("unplaced-ship-container").style.height="fit-content"}function p(){const t=document.createElement("img");t.className="ship-img";const e=document.getElementById("ship-name"),n=document.getElementById("ship-length");document.getElementById("unplaced-ship-container").appendChild(t),function(){let t;l.currentPlacementBoard,t=document.getElementsByClassName("ship-img")[l.currentShipIndex],t.addEventListener("dragstart",(t=>{t.dataTransfer.clearData(),t.dataTransfer.setData("text/plain",t.target.id)}))}(),t.id=`${[...l.currentShip][l.currentShipIndex].shipObj.name}`,t.src=`${[...l.currentShip][l.currentShipIndex].shipSrcImg}`,e.textContent=`Name: ${[...l.currentShip][l.currentShipIndex].shipObj.name}`,n.textContent=`Length: ${[...l.currentShip][l.currentShipIndex].shipObj.length}`,t.setAttribute("draggable",!0)}function u(){const t=document.getElementById("placement-board-name");let e=[...y.players][1].name;""===e&&(e="Player 2"),t.textContent=`${e}'s board`,document.getElementById("placement-page-body-container").display="flex",function(t=10){const e=s(t),n=document.getElementById("placement-board");for(let s=0;s<t*t;s++){const t=document.createElement("div");t.id=`${e.next().value}`,c(t),n.appendChild(t)}}(),function(){let t=[{shipObj:new o(5,"carrier"),shipSrcImg:"assets/ships/carrier.png"},{shipObj:new o(4,"battleship"),shipSrcImg:"assets/ships/battleship.png"},{shipObj:new o(2,"destroyer"),shipSrcImg:"assets/ships/gamsi.png"},{shipObj:new o(3,"cruiser"),shipSrcImg:"assets/ships/frigate.png"},{shipObj:new o(3,"submarine"),shipSrcImg:"assets/ships/submarine.png"}];l.currentShip=t}(),"player"===l.currentPlacementBoard&&(e=[...y.players][0].name,""===e&&(e="Player 1"),t.textContent=`${e}'s board`,p(),function(){const t=document.getElementById("unplaced-ship-container"),e=6*[...l.currentShip][l.currentShipIndex].shipObj.length;document.getElementById("change-orientation").addEventListener("click",(()=>{let n=document.getElementsByClassName("ship-img");"x"===l.axis?(l.axis="y",n[l.currentShipIndex].classList.add("y"),t.style.height=`${e}vh`):(l.axis="x",n[l.currentShipIndex].classList.remove("y"),t.style.height="fit-content")}))}())}function h(){u()}function m(){!function(){const t=document.getElementById("game-over-modal"),e=document.getElementById("winner-name"),n=document.getElementById("num-remaining"),s=document.getElementsByClassName("replay-btn")[0];let a,i=0;[...y.boards][0].allShipsSunk()?(a=[...y.players][1].name,i=5-[...y.boards][1].sunkShips.length):(a=[...y.players][0].name,i=5-[...y.boards][0].sunkShips.length),e.textContent=`${a} Won!`,n.textContent=`${a} had ${i} left!`,t.style.display="flex",s.addEventListener("click",(()=>{location.reload()}))}()}class y{static turn="player";static players=[];static boards=[];static mode="PvP";static wasHit=!1;static cpuAttacked=[];static gameOver=!1;static justSunk="";static sunkEventFlag=!1}class g{static cpuLastHit=[];static cpuTargetingAid=[];static attempts=0}const f=class{constructor(t="Computer"){this.name=t}previousHit=[];attack(t,e){let n=[parseInt(t[0]),parseInt(t[1])];if(0===e.recordAttack.length)return e.receiveAttack(n),!0;for(let t=0;t<e.recordAttack.length;t++)return(n[0]!=e.recordAttack[t][0]||n[1]!=e.recordAttack[t][1])&&(e.receiveAttack(n),!0)}_cpuAttack(t){let e=Math.floor(10*Math.random()),n=Math.floor(10*Math.random());if(!this._onAvailableSpace([e,n],t))return this._cpuAttack(t);this.attack([e,n],t)}_defineAxis(){return 1===Math.floor(2*Math.random())?"x":"y"}_cpuSmartMove(t){const e=[[...g.cpuLastHit][0][0],[...g.cpuLastHit][0][1]];let n=[],s=e[0],a=e[1];return 0===g.attempts&&(s++,n.push(s),n.push(a)),1===g.attempts&&(a++,n.push(s),n.push(a)),2===g.attempts&&(a--,n.push(s),n.push(a)),3===g.attempts&&(s--,n.push(s),n.push(a)),-1===n[0]||-1===n[1]||10===n[0]||10===n[1]||!this._onAvailableSpace(n,t)&&g.attempts<4?(g.attempts++,this._cpuSmartMove(t)):this._onAvailableSpace(n,t)&&g.attempts<4?(g.attempts=0,this.attack(n,t)):(g.attempts=0,void this._cpuAttack(t))}_onAvailableSpace(t,e){for(let n=0;n<e.recordAttack.length;n++)if(t[0]===e.recordAttack[n][0]&&t[1]===e.recordAttack[n][1])return!1;return!0}cpuAttackPattern(t){0===g.cpuLastHit.length?this._cpuAttack(t):this._cpuSmartMove(t)}},I=class{constructor(t,e=10){this.name=t,this.size=e}shipCoordinates=[];recordAttack=[];sunkShips=[];receiveAttack(t){this.recordAttack.push(t),"computer"===y.turn&&y.cpuAttacked.push(t);for(let e=0;e<this.shipCoordinates.length;e++)for(let n=0;n<this.shipCoordinates[e].location.length;n++)if(t[0]===this.shipCoordinates[e].location[n][0]&&t[1]===this.shipCoordinates[e].location[n][1])return this.shipCoordinates[e].object.hit(t),y.wasHit=!0,"computer"===y.turn&&(g.cpuLastHit.push(t),2===g.cpuLastHit.length&&g.cpuLastHit.shift()),this.shipCoordinates[e].object.isSunk()&&(this.sunkShips.push(this.shipCoordinates[e].object),y.justSunk=this.shipCoordinates[e].object.name,y.sunkEventFlag=!0,"computer"===y.turn&&(g.cpuLastHit=[])),!0;return!1}removeShip(){return this.shipCoordinates.pop()}addShip(t,e){this.shipCoordinates.push({object:t,location:e})}randomAddShips(){let t=new o(5,"Carrier"),e=new o(4,"Battleship"),n=new o(2,"Destroyer"),s=new o(3,"Cruiser"),a=new o(3,"Submarine");this._randomizeShips(t),this._randomizeShips(e),this._randomizeShips(s),this._randomizeShips(n),this._randomizeShips(a)}_isEmptySpace(t){for(let e=0;e<this.shipCoordinates.length;e++)for(let n=0;n<this.shipCoordinates[e].location.length;n++)if(t[0]===this.shipCoordinates[e].location[n][0]&&t[1]===this.shipCoordinates[e].location[n][1])return!1;return!0}_randomizeShips(t,e=10){let n=[];const s=t.length;let a=this._defineAxis(),i=Math.floor(10*Math.random()),r=Math.floor(10*Math.random());if(n.push([i,r]),"x"===a&&i+s<=e)for(let t=0;t<s-1;t++)i++,n.push([i,r]);else if("x"===a&&i+s>e)for(let t=0;t<s-1;t++)i--,n.push([i,r]);if("y"===a&&r+s<=e)for(let t=0;t<s-1;t++)r++,n.push([i,r]);else if("y"===a&&r+s>e)for(let t=0;t<s-1;t++)r--,n.push([i,r]);if(!this._isEmptySpace(n[0]))return this._randomizeShips(t,e);this.addShip(t,n)}_defineAxis(){return 1===Math.floor(2*Math.random())?"x":"y"}getSunkShips(){return this.sunkShips}allShipsSunk(){return 5===this.sunkShips.length}};function S(){const t=document.getElementById("options-menu"),e=document.getElementById("menu");document.getElementById("credits-scroll").style.display="none",t.style.display="none",e.style.display="flex"}!function(){const t=document.getElementById("play"),e=document.getElementById("play-card");t.addEventListener("click",(()=>{e.style.display="none",function(){(function(){const t=new Audio("assets/sfx/we-are-8-bit.mp3");return t.loop=!0,t})().play();const t=document.getElementById("menu");t.style.display="flex";const e=document.getElementById("pvc"),n=document.getElementById("multiplayer"),s=document.getElementById("options"),a=document.getElementById("single-player-name"),i=document.getElementById("multiplayer-name"),r=document.getElementById("return-to-menu");e.addEventListener("click",(()=>{y.mode="PvC",a.style.display="flex",i.style.display="none"})),n.addEventListener("click",(()=>{y.mode="PvP",a.style.display="none",i.style.display="flex"})),s.addEventListener("click",(()=>{const e=document.getElementById("options-menu"),n=document.getElementById("credits"),s=document.getElementById("credits-scroll");n.addEventListener("click",(()=>{s.style.display="flex"})),t.style.display="none",e.style.display="flex",r.addEventListener("click",(()=>{S()})),window.addEventListener("keypress",(function(t){"Enter"===t.key&&S()}))})),function(){const t=document.getElementById("new-game-btn-solo"),e=document.getElementById("new-game-btn-multiplayer"),n=(document.getElementById("single-player-name"),document.getElementById("multiplayer-name"),document.getElementById("menu")),s=document.getElementById("placement-page-body-container"),a=document.getElementById("single-player-input"),i=document.getElementById("player1-input"),r=document.getElementById("player2-input");t.addEventListener("click",(()=>{let t=new f(a.value),e=new f("Computer");y.players.push(t),y.players.push(e);const i=new I(a.value),r=new I("Computer");y.boards.push(i),y.boards.push(r),s.style.display="flex",n.style.display="none",h()})),e.addEventListener("click",(()=>{let t=new f(i.value),e=new f(r.value);y.players.push(t),y.players.push(e);const a=new I(i.value),o=new I(r.value);y.boards.push(a),y.boards.push(o),s.style.display="flex",n.style.display="none",h()}))}()}()}))}()})();