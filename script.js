// Static admin credentials
const ADMIN_CREDENTIALS = {
  email: "admin@example.com",
  password: "admin123"
};

function generateDummyData() {
  const firstNames = ['Ali', 'Fatima', 'Muhammad', 'Aisha', 'Ahmed', 'Zainab', 'Hassan', 'Hussein', 'Sana', 'Bilal', 
                    'Amina', 'Omar', 'Khadija', 'Yusuf', 'Maryam', 'Ibrahim', 'Zara', 'Abdullah', 'Sara', 'Usman'];
  const lastNames = ['Khan', 'Ahmed', 'Hussain', 'Raza', 'Shah', 'Malik', 'Iqbal', 'Akhtar', 'Qureshi', 'Siddiqui'];
  const cities = ['Karachi', 'Lahore', 'Islamabad', 'Faisalabad', 'Rawalpindi', 'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala'];
  const sectors = ['Sector 5', 'Sector F-8', 'Block 2', 'Phase 4', 'Township', 'Gulberg', 'Clifton', 'Defence', 'Bahria Town', 'Model Colony'];

  const dummyData = [];
  for (let i = 1; i <= 20; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      
      dummyData.push({
          name: `${firstName} ${lastName}`,
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example${i % 2 === 0 ? '.pk' : '.com'}`,
          contact: `+92-3${Math.floor(10 + Math.random() * 90)}-${Math.floor(1000000 + Math.random() * 9000000)}`,
          address: `${Math.floor(10 + Math.random() * 90)} ${sectors[Math.floor(Math.random() * sectors.length)]}, ${cities[Math.floor(Math.random() * cities.length)]}`,
          postalCode: `${Math.floor(10000 + Math.random() * 90000)}`
      });
  }
  localStorage.setItem('userData', JSON.stringify(dummyData));
}
generateDummyData()



// Auth functions
function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      document.getElementById('auth-container').style.display = 'none';
      document.getElementById('dashboard').style.display = 'block';
      loadDashboard();
      createCharts();
  } else {
      alert('Invalid admin credentials!');
  }
}

function logout() {
  document.getElementById('auth-container').style.display = 'flex';
  document.getElementById('dashboard').style.display = 'none';
}

// Dashboard functions
function loadDashboard() {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const tbody = document.getElementById('user-data');
  tbody.innerHTML = '';

  userData.forEach(user => {
      tbody.innerHTML += `
          <tr>
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>${user.contact}</td>
              <td>${user.address}</td>
              <td>${user.postalCode}</td>
          </tr>
      `;
  });

  // Search functionality
  document.getElementById('search-input').addEventListener('keyup', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      const rows = document.querySelectorAll('#user-data tr');
      
      rows.forEach(row => {
          const name = row.children[0].textContent.toLowerCase();
          const email = row.children[1].textContent.toLowerCase();
          if (name.includes(searchTerm) || email.includes(searchTerm)) {
              row.style.display = '';
          } else {
              row.style.display = 'none';
          }
      });
  });
}

// Chart functions
function createCharts() {
  // User Statistics Chart
  const userChartCtx = document.getElementById('userChart').getContext('2d');
  new Chart(userChartCtx, {
      type: 'bar',
      data: {
          labels: ['Active Users', 'New Users', 'Inactive Users'],
          datasets: [{
              label: 'User Statistics',
              data: [15, 5, 2],
              backgroundColor: ['#1a73e8', '#4CAF50', '#f44336']
          }]
      }
  });

  // Location Distribution Chart
  const locationChartCtx = document.getElementById('locationChart').getContext('2d');
  new Chart(locationChartCtx, {
      type: 'pie',
      data: {
          labels: ['City 1', 'City 2', 'City 3', 'City 4'],
          datasets: [{
              label: 'Location Distribution',
              data: [8, 6, 4, 2],
              backgroundColor: ['#1a73e8', '#4CAF50', '#f44336', '#FF9800']
          }]
      }
  });
}

