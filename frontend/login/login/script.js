document.addEventListener('DOMContentLoaded', () => {

    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    const formOverlay = document.getElementById('form-overlay');
    const formContainer = document.getElementById('form-container');
    const formTitle = document.getElementById('form-title');
    const formContent = document.getElementById('form-content');
    const closeBtn = document.querySelector('.close-btn');

    const formTemplates = {
        join: {
            title: 'Become a Member',
            isForm: true,
            fields: `
                <form id="main-form">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" name="name" required>
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" required>
                    <label for="membership">Membership Tier</label>
                    <input type="text" id="membership" name="membership" placeholder="e.g., Gold, Platinum">
                    <button type="submit">Join Now</button>
                </form>
            `
        },
        contact: {
            title: 'Contact Us',
            isForm: true,
            fields: `
                <form id="main-form">
                    <label for="name">Your Name</label>
                    <input type="text" id="name" name="name" required>
                    <label for="email">Your Email</label>
                    <input type="email" id="email" name="email" required>
                    <label for="message">Message</label>
                    <textarea id="message" name="message" rows="4" required></textarea>
                    <button type="submit">Send Message</button>
                </form>
            `
        },
        about: {
            title: 'About The Club',
            isForm: false,
            fields: `
                <div class="info-content">
                    <p>We are an exclusive club dedicated to providing our members with unparalleled experiences and a community of like-minded individuals.</p>
                    <p>Founded in 2023, our mission is to create a space for growth, networking, and extraordinary moments. We believe in the power of connection and strive to offer the best for our members.</p>
                </div>
            `
        },
        events: {
            title: 'Upcoming Events',
            isForm: false,
            fields: `
                 <div class="info-content">
                    <p>There are currently no upcoming events scheduled. Please check back soon!</p>
                    <p>Members get exclusive access to all our private events, workshops, and gatherings.</p>
                </div>
            `
        }
    };

    function openSidebar() {
        document.body.classList.add('sidebar-open');
    }

    function closeSidebar() {
        document.body.classList.remove('sidebar-open');
    }

    function toggleSidebar() {
        document.body.classList.toggle('sidebar-open');
    }

    function showForm(formType) {
        const template = formTemplates[formType];
        if (!template) return;

        formTitle.textContent = template.title;
        formContent.innerHTML = template.fields;

        if (template.isForm) {
            formContainer.classList.remove('is-info-panel');
            const mainForm = document.getElementById('main-form');
            mainForm.addEventListener('submit', handleFormSubmit);
        } else {
            formContainer.classList.add('is-info-panel');
        }
        
        formOverlay.classList.add('visible');
        closeSidebar(); // Close sidebar when form opens
    }

    function hideForm() {
        formOverlay.classList.remove('visible');
        // Clean up content and remove event listener to avoid memory leaks
        const mainForm = document.getElementById('main-form');
        if (mainForm) {
            mainForm.removeEventListener('submit', handleFormSubmit);
        }
        formContent.innerHTML = '';
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        // Here you would typically send data to a server
        alert('Thank you for your submission!');
        hideForm();
    }

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSidebar();
    });

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const formType = e.target.dataset.form;
            showForm(formType);
        });
    });

    closeBtn.addEventListener('click', hideForm);

    formOverlay.addEventListener('click', (e) => {
        if (e.target === formOverlay) {
            hideForm();
        }
    });

    // Close sidebar if clicking outside of it
    document.addEventListener('click', (e) => {
        if (document.body.classList.contains('sidebar-open') && !sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            closeSidebar();
        }
    });
});