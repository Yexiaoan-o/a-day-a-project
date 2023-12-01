const wealthList = document.querySelector('.wealth-list')
const checkBtn = document.querySelector('.btn')

// 设置财富值排列顺序，从高到低排列
const wealthArray = ['le', 'mb', 'jb', 'ba', 'csh', 'mz', 'lp', 'ao', 'bg', 'wb']

// 设置富人对象，包括富人的名字和id
const richPeople = [
  {name: 'Michael Bloomberg', id: 'mb'},
  {name: 'Larry Ellison', id: 'le'},
  {name: 'Jeff Bezos', id: 'jb'},
  {name: 'Bernard Arnault', id: 'ba'},
  {name: 'Carlos Slim Helu', id: 'csh'},
  {name: 'Mark Zuckerberg', id: 'mz'},
  {name: 'Larry Page', id: 'lp'},
  {name: 'Amancio Ortega', id: 'ao'},
  {name: 'Bill Gates', id: 'bg'},
  {name: 'Warren Buffett', id: 'wb'},

]


// 网页打开时向页面添加10个富人，排列顺序随机
const loadPeople = (arr) => {
   const initialArray = shuffleArray(arr)
   initialArray.forEach((people,index) => {
    const spot = document.createElement('div')
    spot.classList.add('spot', 'flex')
    spot.innerHTML = `
    <div class="se-num ">${index +1}</div>
    <div id= ${people.id} class="name ${people.id}" draggable="true"><span>${people.name}</span><i class="fa-solid fa-bars"></i></div>
    `
    wealthList.appendChild(spot)
   })


  //  获取每个富人所处的元素，给每个元素绑定拖拽开始、经过和结束事件
   const spots = document.querySelectorAll('.spot')
   spots.forEach(spot => {
    spot.addEventListener('dragstart', handleDragStart )
    spot.addEventListener('dragover', handleDragOver)
    spot.addEventListener('drop', handleDrop)
  })
}


// 随机打乱一个数组的函数
const shuffleArray = (arr) => {
  const newArray = [...arr];

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at i and j
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}


// 拖拽开始事件
const handleDragStart = (e) => {
  // 给触发事件的元素添加active类
  e.target.classList.add('active')

  // 记录触发事件的元素的id
  e.dataTransfer.setData('text/plain', e.target.id)
}


// 拖拽经过事件
const handleDragOver = (e) => {
  // 获取所有富人名字的元素，遍历所有元素，移除active类
  const names = document.querySelectorAll('.name')
  names.forEach(name => {
    name.classList.remove('active')
  })

  // 给经过的元素添加active类
  e.target.classList.add('active')
  e.preventDefault()
}


// 拖拽放下事件
const handleDrop = (e) => {
  // 阻止默认事件，允许在目标位置放下拖拽的元素
  e.preventDefault()
  
  // 获取被拖拽的元素的id
  const draggedElementId = e.dataTransfer.getData('text/plain')
  
  // 获取目标元素
  const targetElement = e.target
 

  // 如果目标元素的类名包含name,则交换被拖拽元素和目标元素的位置
  if(targetElement.classList.contains('name')){
    const draggedElement = document.getElementById(draggedElementId)
    const temp = document.createElement('div')
    targetElement.parentNode.insertBefore(temp, targetElement)
    draggedElement.parentNode.insertBefore(targetElement, draggedElement)
    temp.parentNode.insertBefore(draggedElement, temp);
    temp.parentNode.removeChild(temp);
  }

  
  const names = document.querySelectorAll('.name')
  names.forEach(name => {
    name.classList.remove('active')
  })

}

// 初始化界面
loadPeople(richPeople)

// 点击按钮,核对富人排列顺序是否符合预期,符合名字颜色变绿,不符合名字颜色变红
checkBtn.addEventListener('click', () => {
  const names = document.querySelectorAll('.name')
  names.forEach((name, index) => {
    if (name.classList.contains(wealthArray[index])){
      name.classList.remove('wrong')
      name.classList.add('correct')
    } else {
      name.classList.add('wrong')
    }
  })
  
})



