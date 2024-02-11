/* For index.html */

// TODO: If a user clicks to create a chat, create an auth key for them
// and save it. Redirect the user to /chat/<chat_id>
function createChat() {

}

/* For chat.html */

// TODO: Fetch the list of existing chat messages.
// POST to the API when the user posts a new message.
// Automatically poll for new messages on a regular interval.

function postMessage() {
  var room_id = window.location.pathname.split("/").pop();
  let comment = document.getElementById("commentContent").value;
  fetch(`/api/rooms/${room_id}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "comment": comment,
    }),
  })
  return;
}

function getMessages() {
  var room_id = window.location.pathname.split("/").pop();
  let element = document.getElementsByClassName("messages")[0];
  let last_id = '0';
  if (element.hasAttribute("last_id")) {
    last_id = element.getAttribute("last_id");
  }
  fetch(`/api/rooms/${room_id}/messages?last_id=${last_id}`)
    .then(response => response.json())
    .then(messages => {
      

      messages.forEach( m => {
        let author = document.createElement("author");
        author.textContent = m.author;
        let content = document.createElement("content");
        content.textContent = m.body;
        let message = document.createElement("message");
        message.appendChild(author);
        message.appendChild(content);
        
        element.appendChild(message);
        element.setAttribute("last_id", m.id);
      });
      
    })
  return;
}

function changeUsername() {
  let username = document.getElementById("username").value;
  fetch(`/api/user/name`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "new_name": username,
    }),
  })
  return;
}

function changePassword() {
  let password = document.getElementById("password").value;
  fetch(`/api/user/password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "new_password": password,
    }),
  })
  return;
}

function startMessagePolling() {
  return;
}

function hideDisplay() {
  let edit = document.getElementById("edit");
  let display = document.getElementById("display");
  edit.classList.remove("hide");
  display.classList.add("hide");
}

function updateRoomName() {
  var room_id = window.location.pathname.split("/").pop();
  let new_room_name = document.getElementById("roomName").value;
  alert(new_room_name);
  fetch(`/api/rooms/${room_id}/name`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "new_room_name": new_room_name,
    }),
  })

  let edit = document.getElementById("edit");
  let display = document.getElementById("display");
  edit.classList.add("hide");
  display.classList.remove("hide");

  document.getElementById("displayRoomName").innerText = new_room_name;
}