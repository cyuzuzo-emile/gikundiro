// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
    
    // Player Data
    const players = [
        { id: 1, name: "", position: "Goalkeeper", number: 1, filter: "goalkeeper" },
        { id: 2, name: "Jean Claude Ndarusanze", position: "Defender", number: 4, filter: "defender" },
        { id: 3, name: "Emery Bayisenge", position: "Defender", number: 5, filter: "defender" },
        { id: 4, name: "Fitina Omborenga", position: "Defender", number: 12, filter: "defender" },
        { id: 5, name: "Djabel Manishimwe", position: "Defender", number: 15, filter: "defender" },
        { id: 6, name: "Kevin Muhire", position: "Midfielder", number: 6, filter: "midfielder" },
        { id: 7, name: "Bon Fils Caleb", position: "Midfielder", number: 8, filter: "midfielder" },
        { id: 8, name: "Shassir Nahimana", position: "Midfielder", number: 10, filter: "midfielder" },
        { id: 9, name: "Barnabe Mubumbyi", position: "Midfielder", number: 18, filter: "midfielder" },
        { id: 10, name: "Lague Byiringiro", position: "Forward", number: 7, filter: "forward" },
        { id: 11, name: "Yannick Mukunzi", position: "Forward", number: 9, filter: "forward" },
        { id: 12, name: "Patrick Sibomana", position: "Forward", number: 11, filter: "forward" },
        { id: 13, name: "Issa Bigirimana", position: "Goalkeeper", number: 22, filter: "goalkeeper" },
        { id: 14, name: "Amran Nshimiyimana", position: "Defender", number: 3, filter: "defender" },
        { id: 15, name: "Omar Ngandu", position: "Midfielder", number: 17, filter: "midfielder" },
    ];
    
    // Display Players
    const playersContainer = document.getElementById('playersContainer');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    function getPlayerPhotoUrl(player) {
        const data = loadContent();
        const stored = data.playerPhotos && data.playerPhotos[player.id];
        if (stored && stored.trim().length > 0) return stored;
        const pos = (player.filter || '').toLowerCase();
        if (pos === 'forward') return 'fall.jpeg';
        if (pos === 'goalkeeper') return 'olivie.jpeg';
        if (pos === 'defender') return 'basane.jpeg';
        if (pos === 'midfielder') return 'kevin.jpg';
        return `data:image/jpeg;base64,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${player.id}`;
    }

    function displayPlayers(filter = 'all') {
        if (!playersContainer) return;
        
        playersContainer.innerHTML = '';
        
        const filteredPlayers = filter === 'all' 
            ? players 
            : players.filter(player => player.filter === filter);
        
        filteredPlayers.forEach(player => {
            const playerCard = document.createElement('div');
            playerCard.className = 'player-card';
            
            const imageUrl = getPlayerPhotoUrl(player);
            
            playerCard.innerHTML = `
                <div class="player-photo" style="background-image: url('${imageUrl}')"></div>
                <div class="player-info">
                    <div class="player-number">${player.number}</div>
                    <h3 class="player-name">${player.name}</h3>
                    <div class="player-position">${player.position}</div>
                </div>
            `;
            
            playersContainer.appendChild(playerCard);
        });
    }
    
    // Initialize players display if on squad page
    if (playersContainer) {
        displayPlayers();
        
        // Filter players by position
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Display filtered players
                displayPlayers(btn.getAttribute('data-filter'));
            });
        });
    }
    
    // Countdown Timer for Next Match
    function updateCountdown() {
        const countdownElement = document.getElementById('countdown');
        if (!countdownElement) return;
        
        const nextMatchDate = new Date('June 15, 2024 15:00:00').getTime();
        const now = new Date().getTime();
        const timeDifference = nextMatchDate - now;
        
        if (timeDifference > 0) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            // Match has already started
            countdownElement.innerHTML = '<h3 style="color: var(--accent-blue); text-align: center;">Match in Progress!</h3>';
        }
    }
    
    // Update countdown every second if countdown exists
    if (document.getElementById('countdown')) {
        setInterval(updateCountdown, 1000);
        updateCountdown(); // Initial call
    }
    
    // Admin Login Functionality
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const adminSection = document.getElementById('adminSection');
    const logoutBtn = document.getElementById('logoutBtn');
    const addNewsBtn = document.getElementById('addNewsBtn');
    const contentKey = 'rsfcContent';
    function loadContent() {
        try {
            const raw = localStorage.getItem(contentKey);
            if (!raw) return { news: [], features: [], playerPhotos: {} };
            const data = JSON.parse(raw);
            if (!data.news) data.news = [];
            if (!data.features) data.features = [];
            if (!data.playerPhotos) data.playerPhotos = {};
            return data;
        } catch (e) {
            return { news: [], features: [], playerPhotos: {} };
        }
    }
    function saveContent(data) {
        localStorage.setItem(contentKey, JSON.stringify(data));
    }
    
    // Simple admin login (no real authentication for demo)
    let isAdminLoggedIn = false;
    
    if (adminLoginBtn) {
        adminLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (!isAdminLoggedIn) {
                const password = prompt('Enter admin password :');
                if (password === 'rayon2024') {
                    isAdminLoggedIn = true;
                    if (adminSection) adminSection.style.display = 'block';
                    adminLoginBtn.innerHTML = '<i class="fas fa-user-cog"></i> Admin Panel';
                    adminLoginBtn.style.backgroundColor = 'var(--gold)';
                    adminLoginBtn.style.color = 'var(--primary-blue)';
                    
                    // Scroll to admin section if on admin page
                    if (window.location.pathname.includes('admin.html') && adminSection) {
                        adminSection.scrollIntoView({ behavior: 'smooth' });
                    } else {
                        // Redirect to admin page
                        window.location.href = 'admin.html';
                    }
                } else {
                    alert('Incorrect password. Try "rayon2024" for demo purposes.');
                }
            } else {
                if (window.location.pathname.includes('admin.html') && adminSection) {
                    adminSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                    window.location.href = 'admin.html';
                }
            }
        });
    }
    
    // Logout functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            isAdminLoggedIn = false;
            if (adminSection) adminSection.style.display = 'none';
            if (adminLoginBtn) {
                adminLoginBtn.innerHTML = '<i class="fas fa-lock"></i> Admin Login';
                adminLoginBtn.style.backgroundColor = 'var(--primary-blue)';
                adminLoginBtn.style.color = 'var(--white)';
            }
            // Redirect to home page
            window.location.href = 'index.html';
        });
    }
    
    // Add News Article
    if (addNewsBtn) {
        addNewsBtn.addEventListener('click', () => {
            const title = document.getElementById('newsTitle').value;
            const type = document.getElementById('contentType') ? document.getElementById('contentType').value : 'news';
            const date = document.getElementById('newsDate').value;
            const content = document.getElementById('newsContent').value;
            const imageUrl = document.getElementById('newsImageUrl') ? document.getElementById('newsImageUrl').value : '';
            if (title && date && content) {
                const data = loadContent();
                const item = { id: Date.now(), title, date, content, imageUrl };
                if (type === 'feature') {
                    data.features.unshift(item);
                } else {
                    data.news.unshift(item);
                }
                saveContent(data);
                alert('Article saved.');
                document.getElementById('newsTitle').value = '';
                document.getElementById('newsDate').value = '';
                document.getElementById('newsContent').value = '';
                if (document.getElementById('newsImageUrl')) document.getElementById('newsImageUrl').value = '';
                if (document.getElementById('contentType')) document.getElementById('contentType').value = 'news';
            } else {
                alert('Please fill in Title, Date, and Content.');
            }
        });
    }

    const playerSelect = document.getElementById('playerSelect');
    const playerPhotoUrlInput = document.getElementById('playerPhotoUrl');
    const savePlayerPhotoBtn = document.getElementById('savePlayerPhotoBtn');
    if (playerSelect && Array.isArray(players)) {
        playerSelect.innerHTML = players.map(p => `<option value="${p.id}">${p.number} - ${p.name} (${p.position})</option>`).join('');
    }
    if (savePlayerPhotoBtn) {
        savePlayerPhotoBtn.addEventListener('click', () => {
            const id = parseInt(playerSelect.value, 10);
            const url = playerPhotoUrlInput.value;
            if (!id || !url || url.trim().length === 0) {
                alert('Select a player and enter a valid Photo URL.');
                return;
            }
            const data = loadContent();
            data.playerPhotos[id] = url.trim();
            saveContent(data);
            alert('Player photo saved.');
            playerPhotoUrlInput.value = '';
        });
    }

    function createNewsCard(item, typeLabel) {
        const img = item.imageUrl && item.imageUrl.trim().length > 0 ? item.imageUrl : 'https://images.unsplash.com/photo-1594736797933-d1001f7c6e1a?auto=format&fit=crop&w=1200&q=80';
        return `
            <div class="news-card">
                <div class="news-image" style="background-image: url('${img}');"></div>
                <div class="news-content">
                    <div class="news-date">${item.date}</div>
                    <h3 class="news-title">${item.title}</h3>
                    ${typeLabel ? `<div style="color: var(--accent-blue); font-weight: 600; margin-bottom: 8px;">${typeLabel}</div>` : ''}
                    <p>${item.content}</p>
                </div>
            </div>
        `;
    }

    function renderNewsList(filter = 'all') {
        const grid = document.querySelector('.news-grid');
        if (!grid) return;
        const data = loadContent();
        let items = [];
        if (filter === 'news') {
            items = data.news.map(i => ({ item: i, label: 'News' }));
        } else if (filter === 'features') {
            items = data.features.map(i => ({ item: i, label: 'Feature' }));
        } else {
            items = [
                ...data.news.map(i => ({ item: i, label: 'News' })),
                ...data.features.map(i => ({ item: i, label: 'Feature' }))
            ];
        }
        if (items.length > 0) {
            grid.innerHTML = items.map(({ item, label }) => createNewsCard(item, label)).join('');
        }
    }

    const newsFilterBtns = document.querySelectorAll('.news-filter-btn');
    if (newsFilterBtns && newsFilterBtns.length) {
        newsFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                newsFilterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderNewsList(btn.getAttribute('data-filter'));
            });
        });
        renderNewsList('all');
    }

    function renderIndexLatestNews() {
        const isIndex = window.location.pathname.endsWith('index.html') || document.title.includes('Welcome to Rayon Sports FC');
        if (!isIndex) return;
        const grid = document.querySelector('.news-grid');
        if (!grid) return;
        const data = loadContent();
        if (data.news && data.news.length > 0) {
            const latest = data.news.slice(0, 3);
            grid.innerHTML = latest.map(i => createNewsCard(i, 'News')).join('');
        }
    }
    renderIndexLatestNews();
});