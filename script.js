// Global state
const appState = {
  inProgressMatches: [],
  upcomingMatches: [
    
    // Group B - Round 1 (Aug 5)
    { player1Id: '200005', player2Id: '200006', time: '19:00 IST', group: 'B', round: 1 },
    { player1Id: '200007', player2Id: '200008', time: '19:30 IST', group: 'B', round: 1 },
    
    // Group C - Round 1 (Aug 5)
    { player1Id: '200009', player2Id: '200010', time: '20:00 IST', group: 'C', round: 1 },
    { player1Id: '200011', player2Id: '200012', time: '20:30 IST', group: 'C', round: 1 },
    
    // Group D - Round 1 (Aug 5)
    { player1Id: '200013', player2Id: '200014', time: '21:00 IST', group: 'D', round: 1 },
    { player1Id: '200015', player2Id: '200016', time: '21:30 IST', group: 'D', round: 1 },
    
    // Group E - Round 1 (Aug 5)
    { player1Id: '200017', player2Id: '200018', time: '22:00 IST', group: 'E', round: 1 },
    { player1Id: '200019', player2Id: '200020', time: '22:30 IST', group: 'E', round: 1 }
  ]
};

// Current filter state
let currentGroup = 'all';
let currentRound = 'all';

document.addEventListener('DOMContentLoaded', () => {
  initializeNavigation();
  setupViewMoreButton();
  setupScrollToTop();
  setupGroupNavigation();
  setupRoundNavigation();
  setupStatsTabs();
  setupImageCarousel();
  showInitialNotifications();
});

function initializeNavigation() {
  const navbar = document.querySelector('.navbar');
  const navIndicator = document.querySelector('.nav-indicator');
  const navItems = document.querySelectorAll('.nav-item');
  const contentContainers = document.querySelectorAll('.content-container');
  
  function initializeIndicator() {
    const activeItem = document.querySelector('.nav-item.active');
    if (activeItem && navIndicator) {
      const itemRect = activeItem.getBoundingClientRect();
      const navbarRect = navbar.getBoundingClientRect();
      navIndicator.style.width = `${itemRect.width}px`;
      navIndicator.style.left = `${itemRect.left - navbarRect.left}px`;
      navIndicator.style.opacity = '1';
    }
  }
  
  function moveIndicator(item) {
    if (!item || !navIndicator) return;
    const itemRect = item.getBoundingClientRect();
    const navbarRect = navbar.getBoundingClientRect();
    navIndicator.style.width = `${itemRect.width}px`;
    navIndicator.style.left = `${itemRect.left - navbarRect.left}px`;
  }
  
  function createRipple(e, element) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${e.clientX - element.getBoundingClientRect().left - radius}px`;
    ripple.style.top = `${e.clientY - element.getBoundingClientRect().top - radius}px`;
    element.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }
  
  function loadContent(tab) {
    contentContainers.forEach(container => {
      container.style.display = 'none';
    });
    
    const activeContent = document.querySelector(`.${tab}-content`);
    if (activeContent) {
      activeContent.style.display = 'block';
      
      if (tab === 'fixture') {
        generateFixtureCards();
      } else if (tab === 'table') {
        renderStandings();
      }
    }
  }
  
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      navItems.forEach(i => i.classList.remove('active'));
      this.classList.add('active');
      moveIndicator(this);
      createRipple(e, this);
      loadContent(this.dataset.tab);
    });
  });
  
  window.addEventListener('resize', () => {
    const activeItem = document.querySelector('.nav-item.active');
    moveIndicator(activeItem);
  });
  
  initializeIndicator();
  const initialTab = document.querySelector('.nav-item.active')?.dataset.tab || 'home';
  loadContent(initialTab);
}

function setupViewMoreButton() {
  const viewMoreBtn = document.getElementById('viewMoreBtn');
  if (viewMoreBtn) {
    viewMoreBtn.addEventListener('click', function() {
      const hiddenNews = document.querySelectorAll('.hidden-news');
      let isExpanded = this.classList.contains('expanded');
      
      hiddenNews.forEach(news => {
        news.style.display = isExpanded ? 'none' : 'block';
      });
      
      this.classList.toggle('expanded');
      
      const icon = this.querySelector('i') || document.createElement('i');
      if (!isExpanded) {
        this.innerHTML = 'View Less News <i class="fas fa-chevron-up"></i>';
      } else {
        this.innerHTML = 'View More News <i class="fas fa-chevron-down"></i>';
      }
    });
  }
}

function setupScrollToTop() {
  const scrollToTopBtn = document.getElementById('scrollToTop');
  if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

function setupGroupNavigation() {
  const groupBtns = document.querySelectorAll('.group-btn');
  groupBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      groupBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentGroup = this.dataset.group;
      filterFixtures(currentGroup, currentRound);
    });
  });
}

function setupRoundNavigation() {
  const roundBtns = document.querySelectorAll('.round-btn');
  roundBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      roundBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentRound = this.dataset.round;
      filterFixtures(currentGroup, currentRound);
    });
  });
}

function setupStatsTabs() {
  const statsTabs = document.querySelectorAll('.stats-tab');
  statsTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const tabName = this.dataset.tab;
      statsTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      document.querySelectorAll('.stats-tab-content').forEach(content => {
        content.classList.remove('active');
      });
      document.getElementById(`${tabName}Tab`).classList.add('active');
    });
  });
}

function setupImageCarousel() {
  const scroller = document.getElementById('scroller');
  if (scroller) {
    const images = scroller.querySelectorAll('img');
    let currentIndex = 0;
    let scrollInterval;
    
    function autoScroll() {
      currentIndex = (currentIndex + 1) % images.length;
      scroller.scrollTo({
        left: currentIndex * scroller.offsetWidth,
        behavior: 'smooth'
      });
    }
    
    function startAutoScroll() {
      scrollInterval = setInterval(autoScroll, 3000);
    }
    
    function stopAutoScroll() {
      clearInterval(scrollInterval);
    }
    
    startAutoScroll();
    scroller.addEventListener('mouseenter', stopAutoScroll);
    scroller.addEventListener('touchstart', stopAutoScroll);
    scroller.addEventListener('mouseleave', startAutoScroll);
    scroller.addEventListener('scroll', () => {
      currentIndex = Math.round(scroller.scrollLeft / scroller.offsetWidth);
    });
  }
}

function showInitialNotifications() {
  setTimeout(() => {
    showNotification('info', 'Welcome!', 'The tournament is now live. Good luck to all players!', 5000);
  }, 1000);
}

function renderStandings() {
  const container = document.querySelector('.table-content');
  if (!container) return;
  
  const title = container.querySelector('.section-title');
  container.innerHTML = '';
  if (title) container.appendChild(title);
  
  tournamentStandings.groups.forEach(group => {
    const groupDiv = document.createElement('div');
    groupDiv.className = 'group-standings';
    
    const groupTitle = document.createElement('div');
    groupTitle.className = 'group-title';
    groupTitle.textContent = group.groupName;
    groupDiv.appendChild(groupTitle);
    
    const table = document.createElement('table');
    table.className = 'group-standings-table';
    
    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th>Pos</th>
        <th>Player</th>
        <th>P</th>
        <th>W</th>
        <th>D</th>
        <th>L</th>
        <th>GF</th>
        <th>GA</th>
        <th>GD</th>
        <th>Pts</th>
      </tr>
    `;
    table.appendChild(thead);
    
    const tbody = document.createElement('tbody');
    group.standings.forEach(playerStanding => {
      const row = document.createElement('tr');
      row.className = 'clickable-player';
      row.dataset.playerId = playerStanding.player.id;
      
      row.innerHTML = `
        <td>${playerStanding.position}</td>
        <td class="team-cell">
          <img src="${playerStanding.player.image}" alt="${playerStanding.player.name}">
          <span>${playerStanding.player.name}</span>
        </td>
        <td>${playerStanding.stats.played}</td>
        <td>${playerStanding.stats.won}</td>
        <td>${playerStanding.stats.drawn}</td>
        <td>${playerStanding.stats.lost}</td>
        <td>${playerStanding.stats.goalsFor}</td>
        <td>${playerStanding.stats.goalsAgainst}</td>
        <td>${playerStanding.stats.goalDifference}</td>
        <td>${playerStanding.stats.points}</td>
      `;
      tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    groupDiv.appendChild(table);
    container.appendChild(groupDiv);
  });
  
  addPlayerEventListeners();
}

function showPlayerDetails(identifier) {
  const modal = document.getElementById('playerModal');
  modal.style.display = 'block';
  modal.querySelector('.player-modal-content').classList.add('loading');
  
  const playerId = playerNameToIdMap[identifier] || identifier;
  const player = playersData[playerId];
  
  if (!player) {
    closePlayerModal();
    return;
  }
  
  // Basic player info
  document.getElementById('modalPlayerName').textContent = player.name;
  document.getElementById('modalPlayerImg').src = player.img;
  document.getElementById('modalPlayerId').textContent = `ID: ${playerId}`;
  document.getElementById('modalPlayerPosition').textContent = `Position: ${player.position}${getOrdinalSuffix(player.position)}`;
  document.getElementById('modalPlayerPoints').textContent = `Points: ${player.points}`;
  document.getElementById('modalPlayerRank').textContent = `#${player.position}`;
  
  // Stats
  document.getElementById('matchesPlayed').textContent = player.matchesPlayed || 0;
  document.getElementById('matchesWon').textContent = player.matchesWon || 0;
  document.getElementById('winRate').textContent = player.matchesPlayed > 0 ? 
    `${Math.round((player.matchesWon / player.matchesPlayed) * 100)}%` : '0%';
  document.getElementById('goalsScored').textContent = player.goalsScored || 0;
  
  // Tournament stats
  if (player.tournamentStats) {
    document.getElementById('currentGroup').textContent = player.tournamentStats.group;
    document.getElementById('groupPosition').textContent = `${player.tournamentStats.groupPosition}${getOrdinalSuffix(player.tournamentStats.groupPosition)}`;
    document.getElementById('groupPoints').textContent = player.tournamentStats.groupPoints;
    document.getElementById('groupGoals').textContent = player.tournamentStats.groupGoals;
  }
  
  // Next matches
  const nextMatchesContainer = document.querySelector('#overviewTab .detail-section:last-child');
  nextMatchesContainer.innerHTML = '<h3><i class="fas fa-calendar-alt"></i> Next Matches</h3>';
  
  if (player.nextMatches && player.nextMatches.length > 0) {
    const matchesList = document.createElement('div');
    matchesList.className = 'matches-list';
    
    player.nextMatches.forEach(match => {
      const opponent = playersData[match.opponentId];
      const matchElement = document.createElement('div');
      matchElement.className = 'match-item';
      
      matchElement.innerHTML = `
        <div class="match-teams">
          <img src="${player.img}" alt="${player.name}" class="clickable-player" onclick="showPlayerDetails('${playerId}')">
          <span>vs</span>
          <img src="${opponent.img}" alt="${opponent.name}" class="clickable-player" onclick="showPlayerDetails('${match.opponentId}')">
          <span class="clickable-player" onclick="showPlayerDetails('${match.opponentId}')">${opponent.name}</span>
        </div>
        <div class="match-info">
          <span>${match.round}</span>
          <span>${match.date} at ${match.time}</span>
        </div>
      `;
      matchesList.appendChild(matchElement);
    });
    
    nextMatchesContainer.appendChild(matchesList);
  } else {
    nextMatchesContainer.innerHTML += '<p class="no-matches">No upcoming matches</p>';
  }
  
  // Recent matches
  const recentMatchesContainer = document.getElementById('recentMatches');
  recentMatchesContainer.innerHTML = '';
  
  if (player.recentMatches && player.recentMatches.length > 0) {
    player.recentMatches.forEach(match => {
      const opponent = playersData[match.opponentId];
      const matchElement = document.createElement('div');
      matchElement.className = 'match-item';
      
      matchElement.innerHTML = `
        <div class="match-teams">
          <img src="${player.img}" alt="${player.name}" class="clickable-player" onclick="showPlayerDetails('${playerId}')">
          <span class="match-result ${getResultClass(match.result)}">${match.result}</span>
          <img src="${opponent.img}" alt="${opponent.name}" class="clickable-player" onclick="showPlayerDetails('${match.opponentId}')">
          <span class="clickable-player" onclick="showPlayerDetails('${match.opponentId}')">${opponent.name}</span>
        </div>
        <div class="match-info">
          <span>${match.date}</span>
          <span class="goals">${match.goalsScored}-${match.goalsConceded}</span>
        </div>
      `;
      recentMatchesContainer.appendChild(matchElement);
    });
  } else {
    recentMatchesContainer.innerHTML = '<p class="no-matches">No recent matches found</p>';
  }
  
  // WhatsApp button
  const playerHeaderInfo = document.querySelector('.player-header-info');
  const existingWhatsappBtn = document.querySelector('.whatsapp-btn');
  if (existingWhatsappBtn) {
    existingWhatsappBtn.remove();
  }
  
  if (player.phone) {
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = `https://wa.me/${player.phone}`;
    whatsappBtn.className = 'whatsapp-btn';
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Contact on WhatsApp';
    whatsappBtn.target = '_blank';
    playerHeaderInfo.appendChild(whatsappBtn);
  }
  
  setTimeout(() => {
    modal.querySelector('.player-modal-content').classList.remove('loading');
  }, 300);
}

function closePlayerModal() {
  document.getElementById('playerModal').style.display = 'none';
}

function getOrdinalSuffix(num) {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) return 'st';
  if (j === 2 && k !== 12) return 'nd';
  if (j === 3 && k !== 13) return 'rd';
  return 'th';
}

function getResultClass(result) {
  if (result.includes('(W)')) return 'win';
  if (result.includes('(L)')) return 'loss';
  if (result.includes('(D)')) return 'draw';
  return '';
}

function generateFixtureCards() {
  const fixtureContainer = document.getElementById('fixtureList');
  fixtureContainer.innerHTML = '';
  
 try {
  const data = {
    fixtures: [
      // Group A Fixtures
      {
        group: "Group A",
        round: "Round 1",
        matches: [
          { player1: "Babbill", player2: "Farhan", player1Id: "200001", player2Id: "200002", time: "Aug 5, 18:00 IST", score: "3-3", winnerId: "draw", status: "Completed" },
          { player1: "Adwaith TM", player2: "Fazil", player1Id: "200003", player2Id: "200004", time: "Aug 5, 18:30 IST", score: "1-4", winnerId: "200004", status: "Completed" }
        ]
      },
      {
        group: "Group A",
        round: "Round 2",
        matches: [
          { player1: "Fazil", player2: "Babbill", player1Id: "200004", player2Id: "200001", time: "Aug 6, 18:00 IST", score: "3-3", winnerId: "draw", status: "Completed" },
          { player1: "Adwaith TM", player2: "Farhan", player1Id: "200003", player2Id: "200002", time: "Aug 6, 18:30 IST", score: "0-5", winnerId: "200002", status: "Completed" }
        ]
      },
      {
        group: "Group A",
        round: "Round 3",
        matches: [
          { player1: "Babbill", player2: "Adwaith TM", player1Id: "200001", player2Id: "200003", time: "Aug 7, 18:00 IST", score: "5-0", winnerId: "200001", status: "Completed" },
          { player1: "Fazil", player2: "Farhan", player1Id: "200004", player2Id: "200002", time: "Aug 7, 18:30 IST", score: "2-7", winnerId: "200002", status: "Completed" }
        ]
      },
      {
        group: "Group A",
        round: "Round 4",
        matches: [
          { player1: "Farhan", player2: "Babbill", player1Id: "200002", player2Id: "200001", time: "Aug 8, 18:00 IST", score: "0-5", winnerId: "200001", status: "Completed" },
          { player1: "Fazil", player2: "Adwaith TM", player1Id: "200004", player2Id: "200003", time: "Aug 8, 18:30 IST", score: "0-2", winnerId: "200003", status: "Completed" }
        ]
      },
      {
        group: "Group A",
        round: "Round 5",
        matches: [
          { player1: "Babbill", player2: "Fazil", player1Id: "200001", player2Id: "200004", time: "Aug 9, 18:00 IST", score: "4-1", winnerId: "200001", status: "Completed" },
          { player1: "Farhan", player2: "Adwaith TM", player1Id: "200002", player2Id: "200003", time: "Aug 9, 18:30 IST", status: "No result" }
        ]
      },
      {
        group: "Group A",
        round: "Round 6",
        matches: [
          { player1: "Adwaith TM", player2: "Babbill", player1Id: "200003", player2Id: "200001", time: "Aug 10, 18:00 IST", status: "No result" },
          { player1: "Farhan", player2: "Fazil", player1Id: "200002", player2Id: "200004", time: "Aug 10, 18:30 IST", score: "0-6", winnerId: "200002", status: "Completed" }
        ]
      },

      // Group B Fixtures
      {
        group: "Group B",
        round: "Round 1",
        matches: [
          { player1: "Midhlaj", player2: "Agraj", player1Id: "200005", player2Id: "200006", time: "Aug 5, 19:00 IST", score: "1-2", winnerId: "200006", status: "Completed" },
          { player1: "Mirsab", player2: "Athul", player1Id: "200007", player2Id: "200008", time: "Aug 5, 19:30 IST", score: "2-2", winnerId: "draw", status: "Completed" }
        ]
      },
      {
        group: "Group B",
        round: "Round 2",
        matches: [
          { player1: "Athul", player2: "Midhlaj", player1Id: "200008", player2Id: "200005", time: "Aug 6, 19:00 IST", score: "1-3", winnerId: "200005", status: "Completed" },
          { player1: "Mirsab", player2: "Agraj", player1Id: "200007", player2Id: "200006", time: "Aug 6, 19:30 IST", score: "1-0", winnerId: "200007", status: "Completed" }
        ]
      },
      {
        group: "Group B",
        round: "Round 3",
        matches: [
          { player1: "Midhlaj", player2: "Mirsab", player1Id: "200005", player2Id: "200007", time: "Aug 7, 19:00 IST", score: "0-0", winnerId: "draw", status: "Completed" },
          { player1: "Athul", player2: "Agraj", player1Id: "200008", player2Id: "200006", time: "Aug 7, 19:30 IST", score: "5-3", winnerId: "200008", status: "Completed" }
        ]
      },
      {
        group: "Group B",
        round: "Round 4",
        matches: [
          { player1: "Agraj", player2: "Midhlaj", player1Id: "200006", player2Id: "200005", time: "Aug 8, 19:00 IST", score: "2-2", winnerId: "draw", status: "Completed" },
          { player1: "Athul", player2: "Mirsab", player1Id: "200008", player2Id: "200007", time: "Aug 8, 19:30 IST", score: "3-1", winnerId: "200008", status: "Completed" }
        ]
      },
      {
        group: "Group B",
        round: "Round 5",
        matches: [
          { player1: "Midhlaj", player2: "Athul", player1Id: "200005", player2Id: "200008", time: "Aug 9, 19:00 IST", score: "3-5", winnerId: "200008", status: "Completed" },
          { player1: "Agraj", player2: "Mirsab", player1Id: "200006", player2Id: "200007", time: "Aug 9, 19:30 IST", score: "2-2", winnerId: "draw", status: "Completed" }
        ]
      },
      {
        group: "Group B",
        round: "Round 6",
        matches: [
          { player1: "Mirsab", player2: "Midhlaj", player1Id: "200007", player2Id: "200005", time: "Aug 10, 19:00 IST", score: "0-2", winnerId: "200007", status: "Completed" },
          { player1: "Agraj", player2: "Athul", player1Id: "200006", player2Id: "200008", time: "Aug 10, 19:30 IST", score: "3-0", winnerId: "200006", status: "Completed"  }
        ]
      },

      // Group C Fixtures
      {
        group: "Group C",
        round: "Round 1",
        matches: [
          { player1: "Shibin", player2: "Vishnu", player1Id: "200009", player2Id: "200010", time: "Aug 5, 20:00 IST", score: "1-2", winnerId: "200010", status: "Completed" },
          { player1: "Razal", player2: "Sreeraj", player1Id: "200011", player2Id: "200012", time: "Aug 5, 20:30 IST", score: "1-0", winnerId: "200011", status: "Completed" }
        ]
      },
      {
        group: "Group C",
        round: "Round 2",
        matches: [
          { player1: "Sreeraj", player2: "Shibin", player1Id: "200012", player2Id: "200009", time: "Aug 6, 20:00 IST", score: "2-3", winnerId: "200009", status: "Completed" },
          { player1: "Razal", player2: "Vishnu", player1Id: "200011", player2Id: "200010", time: "Aug 6, 20:30 IST", score: "2-4", winnerId: "200010", status: "Completed" }
        ]
      },
      {
        group: "Group C",
        round: "Round 3",
        matches: [
          { player1: "Shibin", player2: "Razal", player1Id: "200009", player2Id: "200011", time: "Aug 7, 20:00 IST", score: "4-3", winnerId: "200009", status: "Completed" },
          { player1: "Sreeraj", player2: "Vishnu", player1Id: "200012", player2Id: "200010", time: "Aug 7, 20:30 IST", score: "4-2", winnerId: "200012", status: "Completed" }
        ]
      },
      {
        group: "Group C",
        round: "Round 4",
        matches: [
          { player1: "Vishnu", player2: "Shibin", player1Id: "200010", player2Id: "200009", time: "Aug 8, 20:00 IST", score: "1-1", winnerId: "draw", status: "Completed" },
          { player1: "Sreeraj", player2: "Razal", player1Id: "200012", player2Id: "200011", time: "Aug 8, 20:30 IST", score: "1-2", winnerId: "200011", status: "Completed" }
        ]
      },
      {
        group: "Group C",
        round: "Round 5",
        matches: [
          { player1: "Shibin", player2: "Sreeraj", player1Id: "200009", player2Id: "200012", time: "Aug 9, 20:00 IST", score: "4-0", winnerId: "200009", status: "Completed" },
          { player1: "Vishnu", player2: "Razal", player1Id: "200010", player2Id: "200011", time: "Aug 9, 20:30 IST", score: "0-4", winnerId: "200011", status: "Completed"  }
        ]
      },
      {
        group: "Group C",
        round: "Round 6",
        matches: [
          { player1: "Razal", player2: "Shibin", player1Id: "200011", player2Id: "200009", time: "Aug 10, 20:00 IST", score: "1-3", winnerId: "200009", status: "Completed" },
          { player1: "Vishnu", player2: "Sreeraj", player1Id: "200010", player2Id: "200012", time: "Aug 10, 20:30 IST",score: "2-2", winnerId: "draw", status: "Completed" }
        ]
      },

      // Group D Fixtures
      {
        group: "Group D",
        round: "Round 1",
        matches: [
          { player1: "Arjun", player2: "Anshad", player1Id: "200013", player2Id: "200014", time: "Aug 5, 21:00 IST", score: "1-0", winnerId: "200013", status: "Completed" },
          { player1: "Riswan", player2: "Abhinav", player1Id: "200015", player2Id: "200016", time: "Aug 5, 21:30 IST", score: "1-1", winnerId: "draw", status: "Completed" }
        ]
      },
      {
        group: "Group D",
        round: "Round 2",
        matches: [
          { player1: "Abhinav", player2: "Arjun", player1Id: "200016", player2Id: "200013", time: "Aug 6, 21:00 IST", score: "3-1", winnerId: "200016", status: "Completed" },
          { player1: "Riswan", player2: "Anshad", player1Id: "200015", player2Id: "200014", time: "Aug 6, 21:30 IST", score: "0-2", winnerId: "200014", status: "Completed" }
        ]
      },
      {
        group: "Group D",
        round: "Round 3",
        matches: [
          { player1: "Arjun", player2: "Riswan", player1Id: "200013", player2Id: "200015", time: "Aug 7, 21:00 IST", score: "0-3", winnerId: "200015", status: "Completed" },
          { player1: "Abhinav", player2: "Anshad", player1Id: "200016", player2Id: "200014", time: "Aug 7, 21:30 IST", score: "2-0", winnerId: "200016", status: "Completed" }
        ]
      },
      {
        group: "Group D",
        round: "Round 4",
        matches: [
          { player1: "Anshad", player2: "Arjun", player1Id: "200014", player2Id: "200013", time: "Aug 8, 21:00 IST", score: "5-1", winnerId: "200014", status: "Completed" },
          { player1: "Abhinav", player2: "Riswan", player1Id: "200016", player2Id: "200015", time: "Aug 8, 21:30 IST", score: "1-1", winnerId: "draw", status: "Completed" }
        ]
      },
      {
        group: "Group D",
        round: "Round 5",
        matches: [
          { player1: "Arjun", player2: "Abhinav", player1Id: "200013", player2Id: "200016", time: "Aug 9, 21:00 IST", score: "1-3", winnerId: "200016", status: "Completed" },
          { player1: "Anshad", player2: "Riswan", player1Id: "200014", player2Id: "200015", time: "Aug 9, 21:30 IST", score: "5-0", winnerId: "200014", status: "Completed" }
        ]
      },
      {
        group: "Group D",
        round: "Round 6",
        matches: [
          { player1: "Riswan", player2: "Arjun", player1Id: "200015", player2Id: "200013", time: "Aug 10, 21:00 IST", status: "No result" },
          { player1: "Anshad", player2: "Abhinav", player1Id: "200014", player2Id: "200016", time: "Aug 10, 21:30 IST", score: "1-2", winnerId: "200014", status: "Completed"  }
        ]
      },

      // Group E Fixtures
      {
        group: "Group E",
        round: "Round 1",
        matches: [
          { player1: "Shybin", player2: "Shajeeh", player1Id: "200017", player2Id: "200018", time: "Aug 5, 22:00 IST", score: "1-3", winnerId: "200018", status: "Completed" },
          { player1: "Sayooj", player2: "Muhsin", player1Id: "200019", player2Id: "200020", time: "Aug 5, 22:30 IST", score: "3-3", winnerId: "draw", status: "Completed" }
        ]
      },
      {
        group: "Group E",
        round: "Round 2",
        matches: [
          { player1: "Muhsin", player2: "Shybin", player1Id: "200020", player2Id: "200017", time: "Aug 6, 22:00 IST", score: "6-3", winnerId: "200020", status: "Completed" },
          { player1: "Sayooj", player2: "Shajeeh", player1Id: "200019", player2Id: "200018", time: "Aug 6, 22:30 IST", score: "1-0", winnerId: "200019", status: "Completed" }
        ]
      },
      {
        group: "Group E",
        round: "Round 3",
        matches: [
          { player1: "Shybin", player2: "Sayooj", player1Id: "200017", player2Id: "200019", time: "Aug 7, 22:00 IST", score: "0-2", winnerId: "200019", status: "Completed" },
          { player1: "Muhsin", player2: "Shajeeh", player1Id: "200020", player2Id: "200018", time: "Aug 7, 22:30 IST", score: "0-1", winnerId: "200018", status: "Completed" }
        ]
      },
      {
        group: "Group E",
        round: "Round 4",
        matches: [
          { player1: "Shajeeh", player2: "Shybin", player1Id: "200018", player2Id: "200017", time: "Aug 8, 22:00 IST", score: "3-1", winnerId: "200018", status: "Completed" },
          { player1: "Muhsin", player2: "Sayooj", player1Id: "200020", player2Id: "200019", time: "Aug 8, 22:30 IST", score: "0-4", winnerId: "200019", status: "Completed" }
        ]
      },
      {
        group: "Group E",
        round: "Round 5",
        matches: [
          { player1: "Shybin", player2: "Muhsin", player1Id: "200017", player2Id: "200020", time: "Aug 9, 22:00 IST", score: "2-0", winnerId: "200017", status: "Completed" },
          { player1: "Shajeeh", player2: "Sayooj", player1Id: "200018", player2Id: "200019", time: "Aug 9, 22:30 IST", score: "2-3", winnerId: "200019", status: "Completed" }
        ]
      },
      {
        group: "Group E",
        round: "Round 6",
        matches: [
          { player1: "Sayooj", player2: "Shybin", player1Id: "200019", player2Id: "200017", time: "Aug 10, 22:00 IST", score: "3-2", winnerId: "200019", status: "Completed"  },
          { player1: "Shajeeh", player2: "Muhsin", player1Id: "200018", player2Id: "200020", time: "Aug 10, 22:30 IST", score: "1-0", winnerId: "200018", status: "Completed" }
        ]
      }
    ]
  };

    
    const fixtures = data.fixtures || [];
    
    fixtures.forEach(fixtureGroup => {
      const roundElement = document.createElement('div');
      roundElement.className = 'fixture-round';
      roundElement.dataset.group = fixtureGroup.group.replace('Group ', '');
      roundElement.dataset.round = fixtureGroup.round.replace('Round ', '');
      roundElement.dataset.status = 'upcoming';
      
      roundElement.innerHTML = `
        <h3 class="fixture-date">
          <i class="fas fa-calendar"></i>
          ${fixtureGroup.group} - ${fixtureGroup.round}
        </h3>
      `;
      
      fixtureGroup.matches.forEach(match => {
        const player1Id = match.player1Id || playerNameToIdMap[match.player1];
        const player2Id = match.player2Id || playerNameToIdMap[match.player2];
        const player1 = playersData[player1Id];
        const player2 = playersData[player2Id];
        
        const matchCard = document.createElement('div');
        matchCard.className = `match-card`;
        
        matchCard.innerHTML = `
          <div class="teams">
            <div class="team">
              <img src="${player1 ? player1.img : `https://via.placeholder.com/50x50?text=${player1.name.substring(0,2)}`}" 
              alt="${match.player1}" 
              onclick="showPlayerDetails('${player1Id}')" 
              class="clickable-player">
              <span onclick="showPlayerDetails('${player1Id}')" class="clickable-player">${match.player1}</span>
            </div>
            <div class="vs">
              VS
              ${match.score ? `<div class="match-score ${getScoreClass(match, player1Id)}">${match.score}</div>` : ''}
            </div>
            <div class="team">
              <img src="${player2 ? player2.img : `https://via.placeholder.com/50x50?text=${player2.name.substring(0,2)}`}" 
              alt="${match.player2}" 
              onclick="showPlayerDetails('${player2Id}')" 
              class="clickable-player">
              <span onclick="showPlayerDetails('${player2Id}')" class="clickable-player">${match.player2}</span>
            </div>
          </div>
          <div class="match-info">
            <span class="league">${fixtureGroup.group}</span>
            <span class="match-status status-upcoming">${match.time}</span>
          </div>
        `;
        roundElement.appendChild(matchCard);
      });
      
      fixtureContainer.appendChild(roundElement);
    });
    
    filterFixtures(currentGroup, currentRound);
  } catch (error) {
    console.error('Error loading fixture data:', error);
    fixtureContainer.innerHTML = '<p>Error loading fixtures. Please try again later.</p>';
  }
}

function getScoreClass(match, playerId) {
  if (!match.score || !match.winnerId) return '';
  if (match.winnerId === 'draw') return 'draw';
  return match.winnerId === playerId ? 'win' : 'loss';
}

function filterFixtures(group, round) {
  const fixtures = document.querySelectorAll('.fixture-round');
  
  fixtures.forEach(fixture => {
    const fixtureGroup = fixture.dataset.group;
    const fixtureRound = fixture.dataset.round;
    
    const showFixture = 
      (group === 'all' || fixtureGroup === group) &&
      (round === 'all' || fixtureRound === round);
    
    fixture.style.display = showFixture ? 'block' : 'none';
  });
}

function addPlayerEventListeners() {
  document.querySelectorAll('.clickable-player').forEach(row => {
    row.addEventListener('click', function() {
      const playerId = this.dataset.playerId;
      showPlayerDetails(playerId);
    });
  });
}

function showNotification(type, title, message, duration = 5000) {
  const container = document.getElementById('notificationContainer');
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  
  let icon;
  switch(type) {
    case 'win':
      icon = '<i class="fas fa-trophy notification-icon"></i>';
      break;
    case 'loss':
      icon = '<i class="fas fa-times-circle notification-icon"></i>';
      break;
    case 'draw':
      icon = '<i class="fas fa-equals notification-icon"></i>';
      break;
    default:
      icon = '<i class="fas fa-info-circle notification-icon"></i>';
  }
  
  notification.innerHTML = `
    ${icon}
    <div class="notification-content">
      <div class="notification-title">${title}</div>
      <div class="notification-message">${message}</div>
    </div>
    <div class="notification-close" onclick="this.parentElement.remove()">&times;</div>
    <div class="notification-progress">
      <div class="notification-progress-bar" style="animation-duration: ${duration/1000}s"></div>
    </div>
  `;
  
  container.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  if (duration) {
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, duration);
  }
}

// Rules modal functions
document.getElementById('settingsBtn').addEventListener('click', showRulesModal);

function showRulesModal() {
  document.getElementById('rulesModal').style.display = 'block';
}

function closeRulesModal() {
  document.getElementById('rulesModal').style.display = 'none';
}

window.addEventListener('click', (e) => {
  if (e.target === document.getElementById('rulesModal')) {
    closeRulesModal();
  }
  if (e.target === document.getElementById('playerModal')) {
    closePlayerModal();
  }
});

// ====================== KNOCKOUT STAGE DATA ====================== //
const knockoutData = {
  preQuarters: [
    {
      id: 'pq1',
      homePlayer: 200018, // Group A 1st place
      awayPlayer: 200019, // Group E 2nd place
      homeScore: 1,
      awayScore: 2,
      date: '2025-08-16',
      time: '18:00 IST',
      winner: 200019,
      completed: true
    },
    
    {
      id: 'pq2',
      homePlayer: 200002, // Group E 1st place
      awayPlayer: 200005, // Group C 2nd place
      homeScore: 2,
      awayScore: 6,
      date: '2025-08-16',
      time: '18:00 IST',
      winner: 200005,
      completed: true
    }
  ],
  quarters: [
    {
      id: 'qf1',
      homePlayer: 200008, // Winner of PQ1
      awayPlayer: 200019, // Winner of PQ2
      homeScore: 1,
      awayScore: 3,
      date: '2025-08-18',
      time: '18:00 IST',
      winner:200019,
      completed: true
    },
    {
      id: 'qf2',
      homePlayer: 200016, // Winner of PQ3
      awayPlayer: 200014, // Winner of PQ4
      homeScore: 2,
      awayScore: 3,
      date: '2025-08-18',
      time: '19:00 IST',
      winner:200014,
      completed: true
    },
    {
      id: 'qf3',
      homePlayer: 200009, // Winner of PQ3
      awayPlayer: 200005, // Winner of PQ4
      homeScore: 1,
      awayScore: 5,
      date: '2025-08-18',
      time: '19:00 IST',
      winner:200005,
      completed: true
    },
    {
      id: 'qf4',
      homePlayer: 200001, // Winner of PQ5
      awayPlayer: 200011, // Best 3rd place
      homeScore: 1,
      awayScore: 3,
      date: '2025-08-18',
      time: '18:00 IST',
      winner:200011,
      completed: true
    }
  ],
  semis: [
    {
      id: 'sf1',
      homePlayer: 200019, // Winner of QF1
      awayPlayer: 200014, // Winner of QF2
      homeScore: 1,
      awayScore: 0,
      date: '2025-08-19',
      time: '18:00 IST',
      winner:200019,
      completed: true
    },
    {
      id: 'sf2',
      homePlayer: 200005, // Winner of QF3
      awayPlayer: 200011, // Next best performer
      homeScore: 2,
      awayScore: 1,
      date: '2025-08-19',
      time: '19:00 IST',
      winner:200005,
      completed: true
    }
  ],
  final: {
    id: 'final',
    homePlayer: 200019, // Winner of SF1
    awayPlayer: 200005, // Winner of SF2
    homeScore: null,
    awayScore: null,
    date: '2025-08-20',
    time: '20:00 IST',
    completed: false
  }
};

// ====================== KNOCKOUT RENDERING FUNCTIONS ====================== //
function renderKnockoutStage(round) {
  const bracketContainer = document.getElementById('knockoutBracket');
  bracketContainer.innerHTML = '';

  if (round === 'pre-quarters') {
    renderKnockoutRound('Pre-Quarterfinals', knockoutData.preQuarters);
  } else if (round === 'quarters') {
    renderKnockoutRound('Quarterfinals', knockoutData.quarters);
  } else if (round === 'semis') {
    renderKnockoutRound('Semifinals', knockoutData.semis);
  } else if (round === 'final') {
    renderFinalMatch();
  }
}

function renderKnockoutRound(title, matches) {
  const bracketContainer = document.getElementById('knockoutBracket');
  
  const roundElement = document.createElement('div');
  roundElement.className = 'knockout-round';
  
  const titleElement = document.createElement('div');
  titleElement.className = 'knockout-round-title';
  titleElement.innerHTML = `<i class="fas fa-${title.includes('Pre') ? 'users' : title.includes('Quarter') ? 'star' : 'trophy'}"></i> ${title}`;
  
  const matchesContainer = document.createElement('div');
  matchesContainer.className = 'knockout-matches';
  
  matches.forEach(match => {
    const homePlayer = match.homePlayer ? playersData[match.homePlayer] : null;
    const awayPlayer = match.awayPlayer ? playersData[match.awayPlayer] : null;
    
    const matchElement = document.createElement('div');
    matchElement.className = `knockout-match ${match.completed ? 'completed' : ''}`;
    
    const teamsElement = document.createElement('div');
    teamsElement.className = 'knockout-teams';
    
    // Home team
    const homeTeam = document.createElement('div');
    homeTeam.className = 'knockout-team home';
    homeTeam.innerHTML = homePlayer ? `
      <span class="clickable-player" onclick="showPlayerDetails('${match.homePlayer}')">${homePlayer.name}</span>
      <img src="${homePlayer.img}" alt="${homePlayer.name}" class="clickable-player" onclick="showPlayerDetails('${match.homePlayer}')">
    ` : '<span>TBD</span>';
    
    // VS and score
    const vsElement = document.createElement('div');
    vsElement.className = 'knockout-vs';
    
    if (match.completed) {
      vsElement.innerHTML = `
        <div class="knockout-score ${match.homeScore > match.awayScore ? 'win' : match.homeScore < match.awayScore ? 'loss' : 'draw'}">
          ${match.homeScore}-${match.awayScore}
        </div>
        <small>FT</small>
      `;
    } else {
      vsElement.innerHTML = 'VS';
    }
    
    // Away team
    const awayTeam = document.createElement('div');
    awayTeam.className = 'knockout-team';
    awayTeam.innerHTML = awayPlayer ? `
      <img src="${awayPlayer.img}" alt="${awayPlayer.name}" class="clickable-player" onclick="showPlayerDetails('${match.awayPlayer}')">
      <span class="clickable-player" onclick="showPlayerDetails('${match.awayPlayer}')">${awayPlayer.name}</span>
    ` : '<span>TBD</span>';
    
    // Match info
    const infoElement = document.createElement('div');
    infoElement.className = 'knockout-info';
    infoElement.innerHTML = `
      <span>${match.date}</span>
      <span>${match.time}</span>
    `;
    
    teamsElement.appendChild(homeTeam);
    teamsElement.appendChild(vsElement);
    teamsElement.appendChild(awayTeam);
    
    matchElement.appendChild(teamsElement);
    matchElement.appendChild(infoElement);
    matchesContainer.appendChild(matchElement);
  });
  
  roundElement.appendChild(titleElement);
  roundElement.appendChild(matchesContainer);
  bracketContainer.appendChild(roundElement);
}

function renderFinalMatch() {
  const bracketContainer = document.getElementById('knockoutBracket');
  const match = knockoutData.final;
  
  const roundElement = document.createElement('div');
  roundElement.className = 'knockout-round knockout-final';
  
  const titleElement = document.createElement('div');
  titleElement.className = 'knockout-round-title';
  titleElement.innerHTML = '<i class="fas fa-trophy"></i> FINAL';
  
  const matchContainer = document.createElement('div');
  matchContainer.className = 'knockout-match';
  
  if (match.homePlayer && match.awayPlayer) {
    const homePlayer = playersData[match.homePlayer];
    const awayPlayer = playersData[match.awayPlayer];
    
    matchContainer.innerHTML = `
      <div class="knockout-teams">
        <div class="knockout-team home">
          <span class="clickable-player" onclick="showPlayerDetails('${match.homePlayer}')">${homePlayer.name}</span>
          <img src="${homePlayer.img}" alt="${homePlayer.name}" class="clickable-player" onclick="showPlayerDetails('${match.homePlayer}')">
        </div>
        <div class="knockout-vs">
          ${match.completed ? `
            <div class="knockout-score ${match.homeScore > match.awayScore ? 'win' : match.homeScore < match.awayScore ? 'loss' : 'draw'}">
              ${match.homeScore}-${match.awayScore}
            </div>
            <small>FT</small>
          ` : 'VS'}
        </div>
        <div class="knockout-team">
          <img src="${awayPlayer.img}" alt="${awayPlayer.name}" class="clickable-player" onclick="showPlayerDetails('${match.awayPlayer}')">
          <span class="clickable-player" onclick="showPlayerDetails('${match.awayPlayer}')">${awayPlayer.name}</span>
        </div>
      </div>
      <div class="knockout-info">
        <span>${match.date}</span>
        <span>${match.time}</span>
        ${match.completed ? '<span class="winner-badge">CHAMPION</span>' : ''}
      </div>
    `;
  } else {
    matchContainer.innerHTML = `
      <div class="knockout-teams" style="justify-content: center;">
        <div class="knockout-vs">
          TBD
        </div>
      </div>
      <div class="knockout-info">
        <span>${match.date}</span>
        <span>${match.time}</span>
      </div>
    `;
  }
  
  roundElement.appendChild(titleElement);
  roundElement.appendChild(matchContainer);
  bracketContainer.appendChild(roundElement);
}

// ====================== INITIALIZE KNOCKOUT STAGE ====================== //
document.addEventListener('DOMContentLoaded', function() {
  // Add knockout tab click handler
  document.querySelector('[data-tab="knockout"]').addEventListener('click', function() {
    renderKnockoutStage('pre-quarters');
  });

  // Round navigation buttons
  document.querySelectorAll('.knockout-content .round-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.knockout-content .round-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      renderKnockoutStage(this.dataset.round);
    });
  });
});
