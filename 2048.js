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
    let re = document.getElementById('restart')
    re.style.display = 'none'
    this.init()
    document.onkeydown = function (e) {
      this.checkGame()
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
            this.moveDown()
            break
          default:
            break
        }
        this.newData()
        this.updateView()
      }
    }.bind(this)
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
  moveTop() {
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++) {
        if (this.data[i][j] !== 0) {
          let k = i
          while (k > 0) {
            if (this.data[k][j] === this.data[k - 1][j]) {
              this.data[k - 1][j] += this.data[k][j]
              this.data[k][j] = 0
              k--
            } else if (this.data[k - 1][j] === 0) {
              this.data[k - 1][j] = this.data[k][j]
              this.data[k][j] = 0
              k--
            } else {
              k = 0
            }
          }
        }
      }
  },
  moveDown() {
    for (let i = 3; i >= 0; i--)
      for (let j = 0; j < 4; j++) {
        if (this.data[i][j] !== 0) {
          let k = i
          while (k >= 0 && k < 3) {
            if (this.data[k][j] === this.data[k + 1][j]) {
              this.data[k + 1][j] += this.data[k][j]
              this.data[k][j] = 0
            } else if (this.data[k + 1][j] === 0) {
              this.data[k + 1][j] = this.data[k][j]
              this.data[k][j] = 0
            } else {
              break
            }
            k++
          }
        }
      }
  },
  moveLeft() {
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++) {
        if (this.data[i][j] !== 0) {
          let k = j
          while (k > 0) {
            if (this.data[i][k] === this.data[i][k - 1]) {
              this.data[i][k - 1] += this.data[i][k]
              this.data[i][k] = 0
              k--
            } else if (this.data[i][k - 1] === 0) {
              this.data[i][k - 1] = this.data[i][k]
              this.data[i][k] = 0
              k--
            } else {
              k = 0
            }
          }
        }
      }
  },
  moveRight() {
    for (let i = 0; i < 4; i++)
      for (let j = 3; j >= 0; j--) {
        if (this.data[i][j] !== 0) {
          let k = j
          while (k < 3 && k >= 0) {
            if (this.data[i][k] === this.data[i][k + 1]) {
              this.data[i][k + 1] += this.data[i][k]
              this.data[i][k] = 0
            } else if (this.data[i][k + 1] === 0) {
              this.data[i][k + 1] = this.data[i][k]
              this.data[i][k] = 0
            } else {
              break
            }
            k++
          }
        }
      }
  },
  checkGame() {
    let flag = false
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++) {
        if (this.data[i][j] === 0)
          flag = true
      }
    if (!flag) {
      this.run = false
      let re = document.getElementById('restart')
      re.style.display = 'block'
      alert("游戏结束！")
    } else
      this.run = true
  },
  updateView() {
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++) {
        let div = document.getElementById('cell_' + i + j)
        if (this.data[i][j] === 0) {
          div.innerHTML = '&nbsp'
          div.className = 'blocks'
        } else {
          div.innerHTML = this.data[i][j]
          div.className = 'blocks2'
        }
      }
  },
  newData() {
    let flag = false
    while (!flag) {
      let x = parseInt(Math.random() * 4, 10)
      let y = parseInt(Math.random() * 4, 10)
      if (this.data[x][y] === 0) {
        flag = true
        this.data[x][y] = 2
        console.log("坐标", x + '' + y)
      }
    }
  }
}