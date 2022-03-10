let game = {
  data: [
    [],
    [],
    [],
    []
  ], //用数组保存游戏数据
  state: true, //判断游戏是否继续
  run: true,
  over: false,

  start() {
    this.init()
  },
  init() {
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++)
        this.data[i][j] = 0
    let flag = false
    while (!flag) {
      let x1 = parseInt(Math.random() * 4, 10)
      let y1 = parseInt(Math.random() * 4, 10)
      let x2 = parseInt(Math.random() * 4, 10)
      let y2 = parseInt(Math.random() * 4, 10)
      if (x1 !== x2 || y1 !== y2) {
        flag = true
        this.data[x1][y1] = 2
        this.data[x2][y2] = 2
      }
    }
    this.updateView()
  },
  moveTop() {

  },
  moveDwon() {

  },
  moveLeft() {

  },
  moveRight() {

  },
  checkGame() {

  },
  updateView() {
    let content = ''
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++) {
        if (this.data[i][j] === 0)
          content += "<div class='blocks'" + "id=cell_" + i + j + ">" + "&nbsp" + "</div>"
        else
          content += "<div class='blocks2'" + "id=cell_" + i + j + ">" + this.data[i][j] + "</div>"
      }
    document.getElementById("box").innerHTML = content
  },
  newData() {
    let flag = false
    while (!flag) {
      let x = parseInt(Math.random() * 4, 10)
      let y = parseInt(Math.random() * 4, 10)
      if (this.data[x][y] === 0) {
        flag = true
        this.data[x][y] = 2
      }
    }
  }
}