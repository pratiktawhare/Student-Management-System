
let students = JSON.parse(localStorage.getItem('students')) || [];

function displayStudents() {
    let studentTable = document.getElementById("studentTable");
    studentTable.innerHTML = "";
    students.forEach((student, index) => {
        studentTable.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.grade}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editStudent(${index})" data-bs-toggle="modal" data-bs-target="#addStudentModal">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function addStudent() {
    let id = document.getElementById("studentID").value;
    let name = document.getElementById("studentName").value;
    let age = document.getElementById("studentAge").value;
    let grade = document.getElementById("studentGrade").value;

    if (id && name && age && grade) {
        students.push({ id, name, age, grade });
        localStorage.setItem('students', JSON.stringify(students));
        displayStudents();
        clearForm();
        document.getElementById("saveStudent").innerText = "Add Student";
        document.getElementById("saveStudent").setAttribute("onclick", "addStudent()");
    } else {
        alert("Please fill all fields!");
    }
}

function editStudent(index) {
    let student = students[index];

    // Prefill the form
    document.getElementById("studentID").value = student.id;
    document.getElementById("studentName").value = student.name;
    document.getElementById("studentAge").value = student.age;
    document.getElementById("studentGrade").value = student.grade;

    // Change the button function
    document.getElementById("saveStudent").innerText = "Update Student";
    document.getElementById("saveStudent").setAttribute("onclick", `updateStudent(${index})`);
}

function updateStudent(index) {
    students[index] = {
        id: document.getElementById("studentID").value,
        name: document.getElementById("studentName").value,
        age: document.getElementById("studentAge").value,
        grade: document.getElementById("studentGrade").value
    };

    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
    clearForm();
    document.getElementById("saveStudent").innerText = "Add Student";
    document.getElementById("saveStudent").setAttribute("onclick", "addStudent()");
}

function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
}

function clearForm() {
    document.getElementById("studentID").value = "";
    document.getElementById("studentName").value = "";
    document.getElementById("studentAge").value = "";
    document.getElementById("studentGrade").value = "";
}

window.onload = displayStudents;
