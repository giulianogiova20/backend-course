class User {
    constructor(name, lastName, bookName, bookAuthor, pet) {
        this.name = name
        this.lastName = lastName
        this.books = [{bookName: bookName, bookAuthor: bookAuthor}]
        this.pets = [pet]
    }

    getFullName() {
        return `User Full Name: ${this.name} ${this.lastName}`
    }

    addPet(pet){
        this.pets.push(pet)
    }

    countPets(){
        let totalPets = this.pets.length
        return `${this.name} ${this.lastName} has ${totalPets} pets.`
    }

    addBook(name, author){
        this.books.push({ bookName: name, bookAuthor: author})
    }

    getBookNames(){
        let booksNameList = this.books.map((data) => data.bookName)
        return `${this.name} ${this.lastName}'s book collection is: ${booksNameList}`
    }
}

const person = new User("John", "Doe", "The Hobbit" , "J. R. R. Tolkien", "Canary")

console.log(person)
console.log("\n" + person.getFullName())
person.addPet("Hummingbird")
console.log("\n" + person.countPets())
person.addBook("The Hunger Games","Suzanne Collins")
console.log("\n" + person.getBookNames())
person.addBook("The Silmarillion","J. R. R. Tolkien")
console.log("\n" + person.getBookNames())