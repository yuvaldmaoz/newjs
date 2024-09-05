const contacts = [ // מערך אובייקטים
    { name: 'Yuval Maoz', phone: '0507518599', email: 'yuval@gmail.com' },
    { name: 'John Doe', phone: '0501234567', email: 'john@gmail.com' },
    { name: 'Jane Doe', phone: '0509876543', email: 'jane@gmail.com' }
];
let editingContactIndex = null; // אוביקט לעריכה
// let contactToDeleteIndex = null; // משתנה לאחסון האינדקס למחיקה

function search_users() {
    let input_value = document.getElementById('search_bar').value.toUpperCase(); // מחליף את הערך בחיפוש לאתיות גדולות
    let li = document.querySelectorAll('ul li'); // בחירת כול האלמנטים li תחת ul (מערך)

    for (let i = 0; i < li.length; i++) {
        let name = li[i].getElementsByClassName('name')[0]; // לקחת את הראשון (name) חיפש לפי שם הקלאסס לפי המילה
        let txtValue = name.textContent || name.innerText; // המרה של משתנה name לקטסט
        if (txtValue.toUpperCase().indexOf(input_value) > -1) { // בודק אם הערך קיים במחרוזת (index of)
            li[i].style.display = "";
        } else {
            li[i].style.display = "none"; // אם לא קיים להסתיר
        }
    }
}

function renderContacts() {
    // פונקציה מרנדרת תוכן
    const contactList = document.getElementById('contactList');
    // MAP נועדה לעבור עליו יוצרת מערך
    // for each אותו דבר לא יוצאת מערך חדש
    // פונקציה שפונה כל פעם לאובייקט ואינדקס מתוך מערך האובייקטים
    // שימוש אינדקס לפנות כל פעם לאתר אחר במערך
    // contact = element

    contactList.innerHTML = contacts.map((contact, index) => `
        <li>
            <div class="contact-info">
                <div class="name">${contact.name}</div>
            </div>
            <div class="buttons">
                <button onclick="showContactDetails(${index})">👁️ Show Details</button>  
                <button class="edit_b" onclick="editContact(${index})">🖋️ Edit </button>
                <button class="delete_b" onclick="deleteContact(${index})">🗑️ Delete </button>
            </div>
        </li>  
    `).join(''); // מחברת את המערך הגדול לטקסט html
}

function showContactDetails(index) {
    const contact = contacts[index];
    const detailsModal = document.getElementById('detailsModal'); // אתחול במשתנה כדי שנוכל להציג את המודל
    const contactDetails = document.getElementById('contactDetails'); // המשתנה שנשתמש כדי לרנדר מקושר עם דף html

    // אתחול בתוכן של אותו איש קשר
    contactDetails.innerHTML = `
        <p><strong>Name:</strong> ${contact.name}</p>
        <p><strong>Phone:</strong> ${contact.phone}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
    `;
    detailsModal.style.display = 'flex'; // הצגה
}

function closeDetailsModal() {
    document.getElementById('detailsModal').style.display = 'none'; // הסתרה של מודל הפרטים הנוספים
}


function openModal() {
    document.getElementById('contactModal').style.display = 'flex'; // הוספת הגדרת עיצוב שמציגה
}

function closeModal() {
    document.getElementById('contactModal').style.display = 'none'; // הגדרת עיצוב שמסתירה
    document.getElementById('contactName').value = ''; // לרוקן מתוכן בכדי שנפתח את החלון היה ריק
    document.getElementById('contactPhone').value = '';
    document.getElementById('contactEmail').value = '';
    editingContactIndex = null; // אתחול משתנה שנועד לעדכן או להוסיף ל null
}

function saveContact() {
    const name = document.getElementById('contactName').value; // יקבל את הערך 
    const phone = document.getElementById('contactPhone').value;
    const email = document.getElementById('contactEmail').value;

    // מונע בעת העריכה הוספה של איש קשר
    if (editingContactIndex !== null) { // פונה לedit
        contacts[editingContactIndex] = { name, phone, email };
    } else { // פונה add
        contacts.push({ name, phone, email });
    }

    closeModal(); // גם כן סגירת המודל
    renderContacts(); // רינדור התוכן הנוסף בגלל שיש עוד אינדקס
}

function editContact(index) {
    const contact = contacts[index]; // פונה לאובייקט ספציפי 
    document.getElementById('contactName').value = contact.name; // (get) קבלת ערכים 
    document.getElementById('contactPhone').value = contact.phone;
    document.getElementById('contactEmail').value = contact.email;
    editingContactIndex = index;
    openModal();
}


function deleteContact(index) {
    contacts.splice(index, 1);
    renderContacts();
}
// function deleteContact(index) {
//     contactToDeleteIndex = index; // אכסן את האינדקס של איש הקשר למחיקה
//     const del_Modal = document.getElementById('del_Modal');
//     del_Modal.style.display = 'flex'; // הצג את מודל אישור המחיקה
// }

// function confirmDeleteContact() {
//     if (contactToDeleteIndex !== null) {
//         contacts.splice(contactToDeleteIndex, 1); // מחיקת איש הקשר מהמערך
//         renderContacts(); // רינדור מחדש של הרשימה
//         contactToDeleteIndex = null; // אתחול משתנה האינדקס למחיקה
//     }
//     closeDeleteModal(); // סגירת מודל אישור המחיקה
// }

// function closeDeleteModal() {
//     document.getElementById('del_Modal').style.display = 'none'; // סגירת מודל אישור המחיקה
//     contactToDeleteIndex = null; // אתחול משתנה האינדקס למחיקה
// }

// document.getElementById('confirmDelete').addEventListener('click', confirmDeleteContact);
// document.getElementById('cancelDelete').addEventListener('click', closeDeleteModal);

document.addEventListener('DOMContentLoaded', renderContacts); // טריגר ראשוני ליצירת הטבלה


/* תוספת של אפקט hover לשינוי צבע */
/* li:hover {
    background-color: #e0e0e0;
    cursor: pointer;
} */