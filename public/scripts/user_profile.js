
  let input = document.getElementById('b1')
  let button = document.getElementById("mythology");
  let button1 = document.getElementById("current affairs");
  let button2 = document.getElementById("entertainment");
  let button3 = document.getElementById("science");
  let button4 = document.getElementById("Health");
  
  button.disabled = true;
  button1.disabled = true;
  button2.disabled = true;
  button3.disabled = true;
  button4.disabled = true;
  
  input.addEventListener("click", stateHandle);
  function stateHandle() {
          button.disabled = false;
          button1.disabled = false;
          button2.disabled = false;
          button3.disabled = false;
          button4.disabled = false;
  }
  function Score(){
    document.getElementById('Category_wise_score').style.display = "none";
    document.getElementById('Score').style.display = "block";
    document.getElementById('Quiz_wise_performance_graph').style.display = "none";
    document.getElementById('Category_wise_performance_graph').style.display = "none";
    document.getElementById('btn1').style.background = '#cccccc';
    document.getElementById('btn2').style.color = "black";
    document.getElementById('btn3').style.color = "black";
    document.getElementById('btn4').style.color = "black";
  }

  function Category_wise_score(){
    document.getElementById('Category_wise_score').style.display = "block";
    document.getElementById('Score').style.display = "none";
    document.getElementById('Quiz_wise_performance_graph').style.display = "none";
    document.getElementById('Category_wise_performance_graph').style.display = "none";
    document.getElementById('btn1').style.background = "none";
    document.getElementById('btn2').style.background = "gray";
    document.getElementById('btn3').style.background = "none";
    document.getElementById('btn4').style.background = "none";
  }
  function Quiz_wise_performance_graph(){
    document.getElementById('Category_wise_score').style.display = "none";
    document.getElementById('Score').style.display = "none";
    document.getElementById('Quiz_wise_performance_graph').style.display = "block";
    document.getElementById('Category_wise_performance_graph').style.display = "none";
    document.getElementById('btn1').style.background = "none";
    document.getElementById('btn2').style.background = "none";
    document.getElementById('btn3').style.background = "gray";
    document.getElementById('btn4').style.background = "none";
  }
  function Category_wise_performance_graph(){
    document.getElementById('Category_wise_score').style.display = "none";
    document.getElementById('Score').style.display = "none";
    document.getElementById('Quiz_wise_performance_graph').style.display = "none";
    document.getElementById('Category_wise_performance_graph').style.display = "block";
    document.getElementById('btn1').style.background = "none";
    document.getElementById('btn2').style.background = "none";
    document.getElementById('btn3').style.background = "none";
    document.getElementById('btn4').style.background = "gray";
  }



