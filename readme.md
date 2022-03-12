# 2048小游戏

## 个人练手小项目

主要目的是复习三件套知识

## 需求分析及对应方法

- 初始生成 4×4 大小的宫格并随机位置生成两个数据
  对应方法为 init ,具体实现是先随机生成两组坐标，然后向二维数组对应位置填入数据，之后再遍历二维数组生成包含数据的宫格插入到容器中，同时为每个宫格容器分配唯一的一个 id

  ~~~js
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
  ~~~

- 对宫格进行位移和相加，对应方法为 move 开头的方法
具体实现原理是对二维数组进行遍历和数据之间的相加，但是不同方向的位移要注意更改遍历顺序，防止位移不彻底，以 moveDown 方法为例：

  ~~~js
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
  ~~~

  向下位移从视图方面打比方就是要从最下层开始遍历，才能确保所有可以位移的宫格发生位移，而向上移则可看成从最上层遍历，左移和右移也是同理

- 每次位移完成后刷新视图，对应方法为 updateView 
实现方法是再次遍历更新完成后的二维数组，然后通过 init 方法分配的 id 获取对应宫格刷新数据

  ~~~js
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
  ~~~

- 检查游戏是否结束，对应方法为 checkGame 
实现很简单，直接判断二维数组是否被非零数据填满，填满则判负，如果要改进的话则需要在判断填满后再进行遍历并判断每个宫格周围是否还有可以相加的宫格，由于边界判断比较繁琐（一共要判断 9 种情况）所以没做

  ~~~js
  checkGame() {
    let flag = false
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++) {
        if (this.data[i][j] === 0)
          flag = true
      }
    if (!flag) {
      this.state = this.over
      let re = document.getElementById('restart')
      re.style.display = 'block'
      alert("游戏结束！")
    } else
      this.state = this.run
  },
  ~~~

- 生成新数据，对应方法为 newData
  实现很简单，就是生成一组坐标，如果该坐标下对应二维数组数据为 0 则填入数据，否则就重新生成，直到成功填入为止

  ~~~js
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
  ~~~

所有方法都实现完成后，再用一个对象封装好统一调用即完成2048小游戏
