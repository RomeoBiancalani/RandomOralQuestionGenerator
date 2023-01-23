import localforage from "localforage";

export async function getAllClasses() {
    const classes = await localforage.getItem('classes');
    console.log("Classi: ", classes);
    return classes
}

export async function saveStudentByClass(className, index, newName) {
    const classes = await localforage.getItem('classes');
    for (let i = 0; i < classes.length; i++) {
        if (classes[i].name === className) {
            classes[i].students[index] = newName;
            await localforage.setItem('classes', classes);
        }
    }
}

export async function addToQuestioned(className, index) {
    const classes = await localforage.getItem('classes');
    for (let i = 0; i < classes.length; i++) {
        if (classes[i].name === className) {
            classes[i].questionedStudents.push(index);
            classes[i].questionedNumber += 1;
            await localforage.setItem('classes', classes);
        }
    }
}

// addToQuestioned


export async function getClassByName(name) {
    const classes = await localforage.getItem('classes');
    for (let i = 0; i < classes.length; i++) {
        if (classes[i].name === name) {
            return classes[i];
        }
    }
    return {}
}

export async function insertClass(name, students) {
    let studentsList = []
    if (students.indexOf("\n") == -1) {
        studentsList.push(students);
    }
    else {
        studentsList = students.split("\n");
    }
    console.log("ClassStudentsList", name, studentsList)
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
        studentsNumber: studentsList.length,
        questionedNumber: 0,
        questionedStudents: []
    });
    await localforage.setItem('classes', classes);
    return 0;
}