var courseApi = "http://localhost:3000/course";

function start() {
  getCourses(renderCourses);
  handleCreateForm();
}

start();

// GET
function getCourses(cb) {
  fetch(courseApi)
    .then(function (response) {
      return response.json();
    })
    .then(cb);
}

// CREATE
function handleCreateForm() {
  var createBtn = document.querySelector("#create");

  createBtn.onclick = function () {
    var name = document.querySelector('input[name="name"]').value;
    var description = document.querySelector('input[name="description"]').value;
    var formData = {
      name: name,
      description: description,
    };
    createCourse(formData, function () {
      getCourses(renderCourses);
    });
  };
}

function createCourse(data) {
  var option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(courseApi, option)
    .then(function (response) {
      response.json();
    })
    .then(cb);
}

// DELETE
function handleDeleteCourse(id) {
  var option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(courseApi + "/" + id, option)
    .then(function (response) {
      response.json();
    })
    .then();
  getCourses(renderCourses);
}

// RENDER
function renderCourses(courses) {
  var courseBlock = document.getElementById("courseList");
  var htmls = courses.map(function (course) {
    return `
        <h3>${course.name}</h3>
        <p>${course.description}</p>
        <button onclick="handleDeleteCourse(${course.id})">DELETE</button>
    `;
  });
  courseBlock.innerHTML = htmls.join("");
}
