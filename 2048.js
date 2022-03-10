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
    while (this.state)
      document.onkeydown = function (e) {
        console.log(e.key)
        if (this.state === this.run) {
          switch (e.key) {
            case 'ArrowLeft':
              this.moveLeft()
              break
            case 'ArrowUp':
              this.moveTop()
              break
            case 'ArrowRight':
              this.moveRight()
              break
            case 'ArrowDown':
              this.moveDwon()
              break
            default:
              break
          }
        }
      }
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
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++) {
        if (this.data[i][j] !== 0) {
          let k = i
          while (k > 0) {
            if (this.data[k - 1][j] === 0) {
              this.data[k - 1][j] = this.data[k][j]
              this.data[k][j] = 0
              k--
            }
            if (k > 0)
              if (this.data[k][j] === this.data[k - 1][j]) {
                this.data[k - 1][j] += this.data[k][j]
                this.data[k][j] = 0
              }
          }
        }
      }
    this.newData()
    this.updateView()
    this.checkGame()
  },
  moveDwon() {
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++) {
        if (this.data[i][j] !== 0) {
          let k = i
          while (k < 3) {
            if (this.data[k + 1][j] === 0) {
              this.data[k + 1][j] = this.data[k][j]
              this.data[k][j] = 0
              k++
            }
            if (k < 3)
              if (this.data[k][j] === this.data[k + 1][j]) {
                this.data[k + 1][j] += this.data[k][j]
                this.data[k][j] = 0
              }
          }
        }
      }
    this.newData()
    this.updateView()
    this.checkGame()

  },
  moveLeft() {
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++) {
        if (this.data[i][j] !== 0) {
          let k = j
          while (k > 0) {
            if (this.data[i][k - 1] === 0) {
              this.data[i][k - 1] = this.data[i][k]
              this.data[i][k] = 0
              k--
            }
            if (k > 0)
              if (this.data[i][k] === this.data[i][k - 1]) {
                this.data[i][k - 1] += this.data[i][k]
                this.data[i][k] = 0
              }
          }
        }
      }
    this.newData()
    this.updateView()
    this.checkGame()
  },
  moveRight() {
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++) {
        if (this.data[i][j] !== 0) {
          let k = j
          while (k < 3) {
            if (this.data[i][k + 1] === 0) {
              this.data[i][k + 1] = this.data[i][k]
              this.data[i][k] = 0
              k++
            }
            if (k < 3)
              if (this.data[i][k] === this.data[i][k + 1]) {
                this.data[i][k + 1] += this.data[i][k]
                this.data[i][k] = 0
              }
          }
        }
      }
    this.newData()
    this.updateView()
    this.checkGame()
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