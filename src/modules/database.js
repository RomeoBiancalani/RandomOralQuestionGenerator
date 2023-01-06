import localforage from "localforage";

export async function getAllClasses() {
    const classes = await localforage.getItem('classes');
    console.log("Classi: ", classes);
    return classes
}

export async function insertClass(name, students) {
    let studentsList = []
    if (students.indexOf("\n") == -1) {
        studentsList.push(students);
    }
    else {
        studentsList = students.split("\n");
    }
    let classes = await localforage.getItem('classes');
    console.log("Classes", classes)
    if (classes === null) {
        // 1 Classe
        classes = []
    }
    else {
        console.log("Classes", classes, classes.length)
        for (let i = 0; i < classes.length; i++) {
            console.log("Class", i, classes[i]);
            if (classes[i].name == name) {
                console.error("Classe gia esistente")
                return -1;
            }
        }
    }
    classes.push({
        name: name,
        students: studentsList,
        studentsNumber: studentsList.lenght,
        questionedNumber: 0,
        questionedStudents: []
    });
    await localforage.setItem('classes', classes);
    return 0;
}