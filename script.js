var form = document.getElementById("form1");
var content=document.getElementsByClassName("maincontent")[0];
var btn = document.getElementById("btnform");
btn.addEventListener("click", intialsetting);
document.getElementById("resetbtn").addEventListener("click", reset);
document.getElementById("modalreset").addEventListener("click", reset);
var num1, num2;
document.addEventListener("keydown", key);
var blank;
var moves = 0;
var intialtime=0;
var timeinterval;

var array=[];


/*you can use arrow keys and mouse to operate the game the data is stored in local storage and
 stored according to moves 2x1 is for checking the winning function
if you dont enter your name it will assign you anonyous user  and keys are working fine
on winning tou will see a modal opening a my name */

// My comment
// to prevent scroll on arrow key
window.addEventListener("keydown", function(e) {

  if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
  }
}, false);


// for quick match
document.getElementById("btns1").onclick=()=>{document.getElementById("id1").value=2;document.getElementById("id2").value=1;intialsetting();}
document.getElementById("btns2").onclick=()=>{document.getElementById("id1").value=3;document.getElementById("id2").value=3;intialsetting();}
document.getElementById("btns3").onclick=()=>{document.getElementById("id1").value=4;document.getElementById("id2").value=4;intialsetting();}
document.getElementById("btns4").onclick=()=>{document.getElementById("id1").value=5;document.getElementById("id2").value=5;intialsetting();}

var k1=document.getElementsByClassName("leaderboard")[0];

function leaderboard()
 {  array.sort((a, b) => (a.move1 > b.move1) ? 1 : -1);
  console.log(array.length)
  k1.innerHTML=' <h1 class="leaderhead" style="text-align: center;">Leaderboard</h1><hr><div class="row flex-nowrap"><div class="mtcontent col-1 p-auto"><h3></h3>NO.  </h3></div><div class="mtcontent col-7 p-auto"><h3></h3>NAME : </h3>  </div><div class="mtcontent col-2 p-auto"><h3></h3>TIME  </h3> </div> <div class="mtcontent col-2 p-auto"><h3></h3>MOVE  </h3> </div></div><hr>'
     for(i=0;i<array.length;i++)
      {
     let newele=document.createElement('div')
     newele.className="row flex-nowrap";
     k1.appendChild(newele)
     let k11= newele.id="lead"+i;
     console.log(k11)
     k22=document.getElementById(k11);
     let pp=i+1
     k22.innerHTML='<div class="col-1">'+pp+'</div><div class="col-7 " style="overflow:hidden;">'+array[i].nameperson+'</div><div class="col-2">'+array[i].time+'</div><div class="col-2">'+array[i].move1+'</div>';
     k1.appendChild(document.createElement('hr'))


   }

}

function pushobject()
{
var obj={};  
 if(document.getElementById("username").value!='') obj["nameperson"]=document.getElementById("username").value;
 else  obj["nameperson"]="Anonymoususer"+parseInt(Math.random()*10000);
obj["time"]=intialtime;
obj["move1"]=moves;
array.push(obj);
myJSON1 = JSON.stringify(array);

localStorage.setItem("testJSON1", myJSON1);
text1 = localStorage.getItem("testJSON1");
obj1  = JSON.parse(text1);

console.log(obj1)
}

function onloadbody()
{
  text1 = localStorage.getItem("testJSON1");
 array  = JSON.parse(text1);
  // array.push(obj1)
 if(array==null) array=[{nameperson:"demo",time:40,move1:50}]
  console.log(array)
}


function countmoves() {
  ++moves;
  document.getElementById("moves").innerHTML = "MOVES : "+moves;

}

function intialsetting() {
  var nameperson=document.getElementById("username").value;
  document.getElementById("namedisplay").innerHTML="NAME : " + nameperson;


  num1 = parseInt(document.getElementById("id1").value);
  num2 = parseInt(document.getElementById("id2").value);
  leaderboard();

  form.setAttribute('style','display:none !important')
  content.style.display="block";

  var cellvalue = new Array(num1 * num2);
  for (var i = 0; i < num2 * num1; ++i) cellvalue[i] = i;
  cellvalue = cellvalue.sort(() => Math.random() - 0.5);
 

  var val1 = 0;

  for (var i = 0; i < num1; ++i) {
    var x = document.createElement("div");

    x.className = "row";
    var val = "idrow" + i;
    x.id = val;
    document.querySelector("#mainbox").appendChild(x);

    for (var j = 0; j < num2; ++j) {
      var x1 = document.createElement("div");
      x1.className = "col-* cell";
      x1.id = "idcell" + val1;
      x1.setAttribute("onclick", "click1(this)");

      if (cellvalue[val1] == 0) {
        x1.innerHTML = "";
        blank = val1;
 
      } else x1.innerHTML = cellvalue[val1];
   

      document.querySelector("#" + val).appendChild(x1);
      ++val1;
    }
  }


  wincheck();
  
  timeinterval= setInterval(time,1000);



}
function click1(x) {
  document.getElementById("bear2").play();
  var cellvalue = x.id;
  document.getElementById(cellvalue).style.animation="shake 0.2s"
  document.getElementById("idcell"+blank).style.animation="shake 0.2s"
  let old=blank;
  setTimeout(function(){
       document.getElementById(cellvalue).style.animation="";
       document.getElementById("idcell"+old).style.animation=""; }, 201);
  var n = cellvalue.length;
  var cellnum;
  if (n == 7) cellnum = parseInt(cellvalue[n - 1]);
  else cellnum = parseInt(cellvalue[n - 2] + cellvalue[n - 1]);

  //  console.log(cellnum)

  // adjacent clicks

  // if (cellnum % num2 == 0)
  //   var cellnumber = [
  //     cellnum - num2,
  //     cellnum + 1,
  //     cellnum + parseInt(num2),
  //     cellnum,
  //   ];
  // else if (cellnum % num2 == num2 - 1)
  //   var cellnumber = [
  //     cellnum - num2,
  //     cellnum,
  //     cellnum + parseInt(num2),
  //     cellnum - 1,
  //   ];
  // else
  //   var cellnumber = [
  //     cellnum - num2,
  //     cellnum + 1,
  //     cellnum + parseInt(num2),
  //     cellnum - 1,
  //   ];
  // // var cellnumbercopy=new Array(4);
  // // for (i in cellnumber) cellnumbercopy[i] = cellnumber[i];
  // for (i in cellnumber) cellnumber[i] = "idcell" + cellnumber[i];
  // //  var avail=[  blank-4,blank+1,blank+4,blank-1 ];
  // //  for(i in avail) avail[i]='idcell'+avail[i];
  // for (i in cellnumber) console.log(cellnumber[i]);

  // for (i in cellnumber)
  //   if (document.getElementById(cellnumber[i]))
  //     if (document.getElementById(cellnumber[i]).innerHTML === "") {
  //       document.getElementById(cellnumber[i]).innerHTML =
  //         document.getElementById(cellvalue).innerHTML;
  //       document.getElementById(cellvalue).innerHTML = "";
  //       blank = parseInt(cellnum);
  //     }

  // multiple swap


  var brow = parseInt(blank / num2);
  var bcol = blank % num2;
  var crow = parseInt(cellnum / num2);
  var ccol = cellnum % num2;
  //  console.log(bcol,brow,ccol,crow)

  if (ccol == bcol && brow > crow) {
    for (var i = brow; i > crow; --i) {
      var index = i * num2 + bcol;
      console.log(index);
      var item1 = document.getElementById("idcell" + index);
      index -= num2;

      var item2 = document.getElementById("idcell" + index);

      console.log(index);

      var temp = item1.innerHTML;
      item1.innerHTML = item2.innerHTML;
      item2.innerHTML = temp;

     
    }
    countmoves();
    blank = crow * num2 + ccol;
  } else if (ccol == bcol && brow < crow) {
    for (var i = brow; i < crow; ++i) {
      var index = i * num2 + bcol;
      console.log(index);
      var item1 = document.getElementById("idcell" + index);
      index += num2;

      var item2 = document.getElementById("idcell" + index);

      console.log(index);

      var temp = item1.innerHTML;
      item1.innerHTML = item2.innerHTML;
      item2.innerHTML = temp;

     
    }
    countmoves();
    blank = crow * num2 + ccol;
  } else if (brow == crow && bcol > ccol) {
    for (var i = bcol; i > ccol; --i) {
      var index = crow * num2 + i;
      console.log(index);
      var item1 = document.getElementById("idcell" + index);
      --index;

      var item2 = document.getElementById("idcell" + index);

      console.log(index);

      var temp = item1.innerHTML;
      item1.innerHTML = item2.innerHTML;
      item2.innerHTML = temp;

     
    }
    blank = crow * num2 + ccol;
    countmoves();
  } else if (brow == crow && bcol < ccol) {
    for (var i = bcol; i < ccol; ++i) {
      var index = crow * num2 + i;
      console.log(index);
      var item1 = document.getElementById("idcell" + index);
      ++index;

      var item2 = document.getElementById("idcell" + index);

      console.log(index);

      var temp = item1.innerHTML;
      item1.innerHTML = item2.innerHTML;
      item2.innerHTML = temp;
    }

    blank = crow * num2 + ccol;


    countmoves();
  }



  wincheck();
}

function wincheck() {
  /* win check*/
  var arr = new Array(num1);
  for (var i = 0; i < num1; ++i) arr[i] = new Array(num2);
  var count = 1;
  for (var i = 0; i < num1; ++i) {
    for (var j = 0; j < num2; ++j) {
      arr[i][j] = count;
      //console.log(arr[i][j])
      ++count;
    }
  }

  var intcount = 0;
  var nums = 0;
  var status = 1;
  for (var i = 0; i < num1; ++i) {
    for (var j = 0; j < num2; ++j) {
      var checker = "idcell" + intcount;
      var check1 = document.getElementById(checker);

      // console.log(doc.innerHTML);
      // console.log(arr[i][j]);
      if (check1) {
        if (check1.innerHTML == arr[i][j]) {
          ++nums;
          check1.style.backgroundColor = "pink";


        }
        else {
          //  break;
          // status = -1;
          check1.style.backgroundColor = "white";


        }
      }

      ++intcount;

      console.log(nums);
    }
    // if (status == -1) break;
  }

  if (nums == num1 * num2 - 1)
   { document.getElementById("result").innerHTML =
      " you woonnnnnnnnnnnnnnnn";
      pushobject();

      document.getElementById("modalbtn").click();
      clearInterval(timeinterval);
      document.getElementById("bear1").play();
      leaderboard();
   
    
     
    

    }


   
}

function key(event) {


  var x11 = document.getElementById("idcell" + blank);
  var x22;

  var newblank;
  if (blank >= 0 && blank < num1 * num2) {
    if (event.keyCode == 39) {
      document.getElementById("bear2").play();   
    //   console.log("ok");
    //   // console.log(blank);
      if (blank % num2 != 0) {
        newblank = blank - 1;
        x22 = document.getElementById("idcell" + newblank);
        x11.innerHTML = x22.innerHTML;
        x22.innerHTML = "";

        --blank;
        // console.log(blank);
        countmoves();
      }
    } else if (event.keyCode == 40) {
         document.getElementById("bear2").play();
      if (blank > num1 - 1) {

        newblank = blank - num2;
        x22 = document.getElementById("idcell" + newblank);
        x11.innerHTML = x22.innerHTML;
        x22.innerHTML = "";
        blank -= num2;
        // console.log(blank);
        countmoves();
      }
    } else if (event.keyCode == 37) {
         document.getElementById("bear2").play();
     
      if (blank % num2 != num2 - 1) {
        newblank = blank + 1;
        x22 = document.getElementById("idcell" + newblank);
        x11.innerHTML = x22.innerHTML;
        x22.innerHTML = "";
        blank += 1;
        // console.log(blank);
        countmoves();
      }
    } else if (event.keyCode == 38) {
        document.getElementById("bear2").play();
    //   console.log("ok");
    //   // console.log(blank);
      if (blank < num2 * (num1 - 1)) {
        newblank = parseInt(blank) + parseInt(num2);
        console.log(newblank);
        x22 = document.getElementById("idcell" + newblank);
        x11.innerHTML = x22.innerHTML;
        x22.innerHTML = "";
        blank += parseInt(num2);
        // console.log(blank);
        countmoves();
      }
    }
  }


  wincheck();
}

function time()
{

document.getElementById("timer").innerHTML= "TIME:" +intialtime +" S";    
++intialtime;
}

function reset()
{
    moves=0;
    intialtime=0;
    document.getElementById("moves").innerHTML=""
    document.getElementById("mainbox").innerHTML=""
    document.getElementById("timer").innerHTML=""
    document.getElementById("result").innerHTML=""
    document.getElementById("id1").value=''
    document.getElementById("id2").value=''
    document.getElementById("username").value=''
    form.setAttribute('style','display:flex !important')
    content.style.display="none";
    clearInterval(timeinterval);  


}





