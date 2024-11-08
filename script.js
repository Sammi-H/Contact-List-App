const addContactBtn = document.getElementById("addContactBtn");
const contactName = document.getElementById("contactName");
const contactList = document.getElementById("contactList");


async function addContact() {
    const name = contactName.value;
    if (name) {
        const li = document.createElement("li");

        const response = await fetch(`https://api.genderize.io?name=${name}`);
        const data = await response.json();

        const avatarImg = document.createElement("img");

        if (data.gender === "male") {
            avatarImg.src = "docs/images/male-avatar.png";
        } else if (data.gender === "female") {
            avatarImg.src = "docs/images/female-avatar.png";
        } else {
            avatarImg.src = "docs/images/default-avatar.png";
        }

        avatarImg.alt = "Avatar";
        li.appendChild(avatarImg);

        const nameText = document.createElement("strong");
        nameText.textContent = name;
        li.appendChild(nameText);
        contactName.value="";

        const phone = document.createElement("p");
        phone.innerHTML = `<img src="docs/images/phone.png" alt="phone"> Phone Number: ${generatePhoneNumber()}`;
        li.appendChild(phone);

        const email = document.createElement("p");
        email.innerHTML = `<img src="docs/images/email.png" alt="Email"> Email: ${name.toLowerCase().replace(" ", ".")}@example.com`;
        li.appendChild(email); 

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "&#10006;";
        deleteBtn.style.fontSize = "10px";
        deleteBtn.style.color = "black";
        deleteBtn.style.background = "transparent";
        deleteBtn.style.border = "none";
        deleteBtn.style.cursor = "pointer";
        deleteBtn.addEventListener("click", function() {
            contactList.removeChild(li);
        });
        li.appendChild(deleteBtn);

        contactList.appendChild(li);
    }
}

function generatePhoneNumber() {
    const areaCode = Math.floor(Math.random() * 900 + 100);
    const firstPart = Math.floor(Math.random() * 900 + 100);
    const secondPart = Math.floor(Math.random() * 9000 + 1000);
    return `(${areaCode}) ${firstPart}-${secondPart}`;
}

addContactBtn.addEventListener("click", function() {
    addContact();
});

contactName.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addContact();
    }
});

