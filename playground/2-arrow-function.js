// const square = (x) => {
//     return x*x
// }

// console.log(square(3))

const event = {
    name: "Birthday Party",
  guestList:['Andrea','Lucas','Rafaela'],
    printGuestList() {
      console.log(`Guest list for ${this.name}`)

      this.guestList.forEach((guest) => {
        console.log(`${guest} is attending ${this.name}`)
      })
    },
  bdate:Date('2020-01-30'),
  printBirthDayDate() {
    console.log(`the birthday will be on ${this.bdate}`)
  }
};

event.printGuestList();
event.printBirthDayDate();
