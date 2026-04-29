document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('student-form');
    const studentsList = document.getElementById('students-list');

    // Fetch and display all students on load
    fetchStudents();

    // Handle form submission
    studentForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const course = document.getElementById('course').value;

        const id = document.getElementById('student-id').value;
        const student = { name, email, course };

        const method = id ? 'PUT' : 'POST';
        const url = id ? `/api/students/${id}` : '/api/students';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(student),
            });

            if (response.ok) {
                // Clear form and refresh list
                studentForm.reset();
                document.getElementById('student-id').value = '';
                document.querySelector('#student-form button').textContent = 'Add Student';
                document.querySelector('.form-section h2').textContent = 'Add New Student';
                fetchStudents();
            } else {
                console.error('Failed to add student');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});

async function fetchStudents() {
    const studentsList = document.getElementById('students-list');
    try {
        const response = await fetch('/api/students');
        const students = await response.json();

        // Clear existing rows
        studentsList.innerHTML = '';

        if (students.length === 0) {
            studentsList.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--text-secondary);">No students enrolled yet.</td></tr>';
            return;
        }

        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.course}</td>
                <td>
                    <button class="btn-edit" onclick="editStudent(${student.id}, '${student.name}', '${student.email}', '${student.course}')" style="margin-right: 5px; background: var(--warning); color: var(--text-primary); border: none; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer;">Edit</button>
                    <button class="btn-delete" onclick="deleteStudent(${student.id})">Delete</button>
                </td>
            `;
            studentsList.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching students:', error);
    }
}

async function deleteStudent(id) {
    if (!confirm('Are you sure you want to delete this student?')) return;

    try {
        const response = await fetch(`/api/students/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            fetchStudents();
        } else {
            console.error('Failed to delete student');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function editStudent(id, name, email, course) {
    document.getElementById('student-id').value = id;
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('course').value = course;
    
    document.querySelector('#student-form button').textContent = 'Update Student';
    document.querySelector('.form-section h2').textContent = 'Edit Student';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
