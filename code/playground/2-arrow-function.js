// const square = (x) => {
//     return x*x
// }

// console.log(square(3))

const event = {
    name: "Birthday Party",
    printGuestList() {
        console.log(`Guest list for ${this.name}`)
    }
};

event.printGuestList();