const canvas = document.getElementById('cross-zero');
const ctx = canvas.getContext('2d');

const cell_size = 100;

let field = [[0,0,0],
            [0,0,0],
            [0,0,0]]


function draw_field() {
  //Рисуем горизонтальные линии
  ctx.strokeStyle = 'rgb(0, 0, 0)';
  ctx.lineWidth = 1;
  ctx.shadowBlur = 0;
  for (let i = 1; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i * cell_size);
    ctx.lineTo(cell_size * 3, i * cell_size);
    ctx.stroke();
  }
  //Рисуем вертикальные линии
  for (let i = 1; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(i * cell_size, 0);
    ctx.lineTo(i * cell_size, 3 * cell_size);
    ctx.stroke();
  }
}

function cross(x,y) {
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgb(255, 0, 83)';
  ctx.shadowBlur = 10;
  ctx.shadowColor = 'rgb(255, 0, 83)';
  ctx.moveTo(x * cell_size + 15, y * cell_size + 15);
  ctx.lineTo(x * cell_size + cell_size - 15, y * cell_size + cell_size - 15);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x * cell_size + 15, y * cell_size + cell_size - 15);
  ctx.lineTo(x * cell_size + cell_size - 15, y * cell_size + 15);
  ctx.stroke()
}

function zero(x,y) {
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgb(125, 0, 255)';
  ctx.shadowBlur = 10;
  ctx.shadowColor = 'rgb(125, 0, 255)';
	ctx.arc(x * cell_size + cell_size / 2, y * cell_size + cell_size / 2, 35, 0, 2 * Math.PI, false);
	ctx.stroke();
}

function draw() {
  counter = 0
  for (let i = 0; i < field.length;i++) {
    if (field[i].includes(0) == false) {
      counter += 1
    }
  }
  if (counter == 3) {
    return true
  }
}

function check_the_winner(player) {
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.strokeStyle = 'rgb(255, 255, 0)';
  ctx.shadowBlur = 10;
  ctx.shadowColor = 'rgb(255, 255, 0)';
  if (field[0][0] == player && field[0][1] == player && field[0][2] == player) {
    ctx.moveTo(15,50);
    ctx.lineTo(285, 50);
    ctx.stroke()
    return player
  }

  else if (field[1][0] == player && field[1][1] == player && field[1][2] == player) {
    ctx.moveTo(15,150);
    ctx.lineTo(285, 150);
    ctx.stroke()
    return player
  }

  else if (field[2][0] == player && field[2][1] == player && field[2][2] == player) {
    ctx.moveTo(15,250);
    ctx.lineTo(285, 250);
    ctx.stroke()
    return player
  }

  else if (field[0][0] == player && field[1][0] ==player && field[2][0] == player) {
    ctx.moveTo(50,15);
    ctx.lineTo(50, 285);
    ctx.stroke()
    return player
  }

  else if (field[0][1] == player && field[1][1] == player && field[2][1] == player) {
    ctx.moveTo(150,15);
    ctx.lineTo(150, 285);
    ctx.stroke()
    return player
  }

  else if (field[0][2] == player && field[1][2] == player && field[2][2] == player) {
    ctx.moveTo(250,15);
    ctx.lineTo(250, 285);
    ctx.stroke()
    return player
  }

  else if (field[0][0] == player && field[1][1] == player && field[2][2] == player) {
    ctx.moveTo(15,15);
    ctx.lineTo(285, 285);
    ctx.stroke()
    return player
  }

  else if (field[2][0] == player && field[1][1] == player && field[0][2] == player) {
    ctx.moveTo(15,285);
    ctx.lineTo(285, 15);
    ctx.stroke()
    return player
  }
}

let current_player = 'x'
let winner = ''

function again() {
  field = [[0,0,0],
            [0,0,0],
            [0,0,0]]
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  draw_field()
  current_player = 'x'
  winner = document.getElementById('winner')
  winner.innerHTML = ''
  canvas.addEventListener('click', step);
}


function step(event){
  let x = Math.floor(event.offsetX / cell_size);
  let y = Math.floor(event.offsetY / cell_size);
  console.log(x)
  console.log(y)



  if (field[y][x] == 0) {
    field[y][x] = current_player
    console.log(field)
  }
  
  if (field[y][x] == 'x') {
    cross(x,y)
  }
  else {
    zero(x,y)
  }

  if (check_the_winner(current_player) == 'x') {
    winner = document.getElementById('winner')
    winner.innerHTML = 'Победили ' + current_player
    canvas.removeEventListener('click', step)
  }

  else if (check_the_winner(current_player) == 'o') {
    winner = document.getElementById('winner')
    winner.innerHTML = 'Победили ' + current_player 
    canvas.removeEventListener('click', step)
  }

  else if (draw() == true) {
    winner = document.getElementById('winner')
    winner.innerHTML = 'Ничья '
    canvas.removeEventListener('click', step)
  }


  if (current_player == 'x') {
    current_player = 'o'
  }
  else {
    current_player = 'x'
  }
}

draw_field()
canvas.addEventListener('click', step);
