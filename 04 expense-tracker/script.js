const balance = document.getElementById('balance')
const income = document.getElementById('income')
const expense = document.getElementById('expense')
const recordContainer = document.querySelector('.record-container')

const text = document.getElementById('text')
const amount = document.getElementById('amount')

const btn = document.getElementById('add')

const recordElements = []
let records = JSON.parse(localStorage.getItem('records')) ? JSON.parse(localStorage.getItem('records')):[]

createRecords(records)

function createRecord(recordText, recordAmount, id) {

  const div = document.createElement('div')
  const border = recordAmount >= 0 ? 'green-border' : 'red-border'
  div.classList.add('record', border )

  div.innerHTML = `<div id=${id} class="delete">×</div>
  <span>${recordText}</span>
  <small>${recordAmount}</small>`

  recordContainer.appendChild(div)

  const deleteBtn = document.getElementById(id)

  deleteBtn.addEventListener('click', (e) => {
    records = records.filter((record) => {return record.id !== Number(e.target.id)})
    localStorage.setItem('records', JSON.stringify(records))
    recordContainer.innerHTML = ''
    createRecords(records)
  })
}

function calculateMoney() {
  const balanceValue = records.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.recordAmount;
  }, 0).toFixed(2)

  const incomeValue = records.filter((record) =>{return record.recordAmount > 0}).reduce((accumulator, currentItem) => {
    return accumulator + currentItem.recordAmount;
  }, 0).toFixed(2)

  balance.innerText = '$' + balanceValue

  income.innerText = '$' + incomeValue

  expense.innerText = '$' + (balanceValue - incomeValue)
}

function createRecords(records){
  records.forEach(record => {
    createRecord(record.recordText, record.recordAmount, record.id)
  })

  calculateMoney()
}

function addRecord(e) {
  e.preventDefault()
  const recordText = text.value
  const recordAmount = Number(amount.value)
  const id = Math.floor(Math.random() * 100000)
  if (recordText && recordAmount){
    createRecord(recordText, recordAmount, id)
    text.value = ''
    amount.value = ''
  } else {
    alert('Enter text or amount')
  }

  
  records.push({id: id, recordText: recordText, recordAmount: recordAmount})
  localStorage.setItem('records', JSON.stringify(records))

  calculateMoney()
}

btn.addEventListener('click', (e) => {addRecord(e)})