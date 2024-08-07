document.addEventListener('DOMContentLoaded', () => {
    const contactsButton = document.getElementById('contactsButton');
    const aboutUsButton = document.getElementById('aboutUsButton');
    const joinButton = document.getElementById('joinButton');
    const bookAppointmentButton = document.getElementById('bookAppointmentButton');
    const profileLogo = document.getElementById('profileLogo');
    const profileDropdown = document.getElementById('profileDropdown');

    const registrationModal = document.getElementById('registrationModal');
    const profileModal = document.getElementById('profileModal');
    const modalContent = document.getElementById('modalContent');
    const profileContent = document.getElementById('profileContent');

    let isLoggedIn = false; // Placeholder for login status

    function addCloseEvent(modal) {
        const closeModal = modal.querySelector('.close');
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerText = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000); // Remove notification after 3 seconds
    }

    contactsButton.addEventListener('click', () => {
        modalContent.innerHTML = `
            <span class="close">&times;</span>
            <h2>Contact Us</h2>
            <p>Phone: +917024313357</p>
            <p>Email: kushwahadeepraj91@gmail.com</p>
        `;
        registrationModal.style.display = 'block';
        addCloseEvent(registrationModal);
    });

    aboutUsButton.addEventListener('click', () => {
        modalContent.innerHTML = `
            <span class="close">&times;</span>
            <h2>About Us</h2>
            <p>HealthFusion is a portal that connects patients with healthcare professionals, enabling easy appointment bookings and access to medical expertise.</p>
        `;
        registrationModal.style.display = 'block';
        addCloseEvent(registrationModal);
    });

    joinButton.addEventListener('click', () => {
        if (isLoggedIn) {
            profileLogo.style.display = 'block';
            joinButton.style.display = 'none';
        } else {
            modalContent.innerHTML = `
                <span class="close">&times;</span>
                <h2>Join</h2>
                <button id="signUpButton">Sign Up</button>
                <button id="loginButton">Login</button>
            `;
            registrationModal.style.display = 'block';
            addCloseEvent(registrationModal);

            document.getElementById('signUpButton').addEventListener('click', () => {
                modalContent.innerHTML = `
                    <span class="close">&times;</span>
                    <h2>Sign Up</h2>
                    <form id="signUpForm">
                        <label for="name">Name:</label>
                        <input type="text" id="name" name="name" required>
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" required>
                        <label for="password">Password:</label>
                        <input type="password" id="password" name="password" required>
                        <button type="submit">Sign Up</button>
                    </form>
                `;
                addCloseEvent(registrationModal);

                document.getElementById('signUpForm').addEventListener('submit', (e) => {
                    e.preventDefault();
                    // Simulate sign up process
                    isLoggedIn = false; // Reset login status for demonstration
                    modalContent.innerHTML = `
                        <span class="close">&times;</span>
                        <h2>Login</h2>
                        <form id="loginForm">
                            <label for="loginEmail">Email:</label>
                            <input type="email" id="loginEmail" name="email" required>
                            <label for="loginPassword">Password:</label>
                            <input type="password" id="loginPassword" name="password" required>
                            <button type="submit">Login</button>
                        </form>
                    `;
                    addCloseEvent(registrationModal);

                    document.getElementById('loginForm').addEventListener('submit', (e) => {
                        e.preventDefault();
                        // Simulate login process
                        isLoggedIn = true;
                        registrationModal.style.display = 'none';
                        joinButton.style.display = 'none';
                        profileLogo.style.display = 'block';
                    });
                });
            });

            document.getElementById('loginButton').addEventListener('click', () => {
                modalContent.innerHTML = `
                    <span class="close">&times;</span>
                    <h2>Login</h2>
                    <form id="loginForm">
                        <label for="loginEmail">Email:</label>
                        <input type="email" id="loginEmail" name="email" required>
                        <label for="loginPassword">Password:</label>
                        <input type="password" id="loginPassword" name="password" required>
                        <button type="submit">Login</button>
                    </form>
                `;
                addCloseEvent(registrationModal);

                document.getElementById('loginForm').addEventListener('submit', (e) => {
                    e.preventDefault();
                    // Simulate login process
                    isLoggedIn = true;
                    registrationModal.style.display = 'none';
                    joinButton.style.display = 'none';
                    profileLogo.style.display = 'block';
                });
            });
        }
    });

    bookAppointmentButton.addEventListener('click', () => {
        modalContent.innerHTML = `
            <span class="close">&times;</span>
            <h2>Book an Appointment</h2>
            <form id="appointmentForm">
                <label for="patientName">Name:</label>
                <input type="text" id="patientName" name="patientName" required>
                <label for="appointmentDate">Date:</label>
                <input type="date" id="appointmentDate" name="appointmentDate" required>
                <label for="doctor">Doctor:</label>
                <select id="doctor" name="doctor" required>
                    <option value="">Select Doctor</option>
                    <option value="doctor1">Dr. Ram</option>
                    <option value="doctor2">Dr. Ashu</option>
                    <!-- Add more options as needed -->
                </select>
                <button type="submit">Book Appointment</button>
            </form>
        `;
        registrationModal.style.display = 'block';
        addCloseEvent(registrationModal);

        document.getElementById('appointmentForm').addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate form submission and show notification
            showNotification('Your appointment is booked successfully');
            registrationModal.style.display = 'none'; // Hide modal after booking
        });
    });

    profileLogo.addEventListener('click', () => {
        if (profileDropdown.style.display === 'none') {
            profileDropdown.style.display = 'block';
        } else {
            profileDropdown.style.display = 'none';
        }
    });

    window.addEventListener('click', (event) => {
        if (event.target === registrationModal) {
            registrationModal.style.display = 'none';
        }
        if (event.target === profileModal) {
            profileModal.style.display = 'none';
        }
        if (!event.target.matches('#profileLogo') && !event.target.matches('.profile-dropdown') && !event.target.matches('.profile-dropdown *')) {
            profileDropdown.style.display = 'none';
        }
    });
});
